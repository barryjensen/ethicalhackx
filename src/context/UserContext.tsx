
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("UserProvider: Setting up auth state listener");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(`Auth event: ${event}`, session ? "Session exists" : "No session");
        
        // Only perform synchronous state updates here
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle specific auth events
        if (event === 'SIGNED_IN' && session) {
          // If needed, fetch additional user data with timeout to prevent deadlocks
          setTimeout(() => {
            console.log("User signed in:", session.user.email);
            // Additional data fetching could happen here
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
        }
      }
    );

    // THEN check for existing session
    const getInitialSession = async () => {
      try {
        console.log("UserProvider: Getting initial session");
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        console.log("Initial session:", session ? "exists" : "none");
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      console.log("UserProvider: Unsubscribing from auth state changes");
      subscription.unsubscribe();
    };
  }, []);

  // Enhanced sign out function to prevent auth limbo
  const signOut = async () => {
    console.log("Signing out user");
    
    // Clean up auth state before signing out
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
    
    // Perform global sign out
    await supabase.auth.signOut({ scope: 'global' });
    
    // Force page reload for a clean state
    window.location.href = '/auth';
  };

  const value = {
    session,
    user,
    loading,
    signOut,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
