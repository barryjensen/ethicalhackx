
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Get redirect path from location state or default to home
        const from = location.state?.from || '/';
        navigate(from);
      }
    };
    
    checkSession();
    
    // Handle hash fragment from implicit OAuth flow
    if (window.location.hash) {
      // The presence of a hash usually indicates a redirect from OAuth
      const handleHashChange = async () => {
        try {
          // Let Supabase Auth handle the hash fragment
          const { data, error } = await supabase.auth.getUser();
          
          if (error) {
            console.error("Error parsing auth redirect:", error);
            toast({
              title: "Authentication error",
              description: error.message,
              variant: "destructive",
            });
          } else if (data?.user) {
            toast({
              title: "Login successful",
              description: "You have been successfully authenticated",
            });
            navigate('/');
          }
        } catch (err) {
          console.error("Failed to process authentication response", err);
        }
      };
      
      handleHashChange();
    }
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get redirect path from location state or default to home
          const from = location.state?.from || '/';
          navigate(from);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.state, toast, location]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
