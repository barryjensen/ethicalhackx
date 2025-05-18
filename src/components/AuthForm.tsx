
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

type AuthMode = 'login' | 'signup';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        toast({
          title: "Login successful",
          description: "Welcome to EthicalHackX",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split('@')[0],
            }
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Sign up successful",
          description: "Please check your email for verification instructions",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-hacker-green/30">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-hacker-green" />
        </div>
        <CardTitle className="text-2xl font-bold text-hacker-green">
          {mode === 'login' ? 'Login to EthicalHackX' : 'Create an Account'}
        </CardTitle>
        <CardDescription>
          {mode === 'login' 
            ? 'Access your secure penetration testing toolkit' 
            : 'Join the ethical hacking community'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background border-hacker-green/30 focus:border-hacker-green"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background border-hacker-green/30 focus:border-hacker-green"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-hacker-green hover:bg-hacker-green/90 text-black font-medium"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">◌</span> Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {mode === 'login' ? (
                  <>
                    <LogIn className="h-4 w-4" /> Login
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" /> Sign Up
                  </>
                )}
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center flex-col gap-4 pt-2">
        <div className="text-sm text-center">
          {mode === 'login' ? (
            <p>
              Don't have an account?{" "}
              <button 
                type="button" 
                onClick={() => setMode('signup')}
                className="text-hacker-green hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button 
                type="button" 
                onClick={() => setMode('login')}
                className="text-hacker-green hover:underline font-medium"
              >
                Login
              </button>
            </p>
          )}
        </div>
        <div className="text-center text-xs text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            <AlertCircle className="h-3 w-3" />
            For educational and professional use only
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
