
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Terminal as TerminalIcon, 
  Info, 
  User,
  LogOut,
  Github
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showDisclaimer: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, showDisclaimer }) => {
  const { user, signOut } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of EthicalHackX",
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out",
        variant: "destructive",
      });
    }
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github'
      });
      
      if (error) throw error;
      
      toast({
        title: "GitHub authentication initiated",
        description: "Redirecting to GitHub for authentication",
      });
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="border-b border-hacker-green/30 py-2 px-4 bg-card">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-hacker-green" />
            <h1 className="text-xl font-bold text-hacker-green">EthicalHackX</h1>
          </div>
          
          <div className="hidden md:block">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
              <TabsList className="bg-muted">
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="terminal">Terminal</TabsTrigger>
                <TabsTrigger value="reporting">Reporting</TabsTrigger>
                <TabsTrigger value="docs">Documentation</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={showDisclaimer}
              className="text-hacker-green hover:bg-hacker-green hover:text-black rounded-full"
            >
              <Info className="h-5 w-5" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-full border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                className="ml-2 border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
                onClick={handleLoginClick}
              >
                <User className="h-4 w-4 mr-1" />
                Login
              </Button>
            )}
            
            {!user && (
              <Button 
                variant="outline" 
                size="sm"
                className="ml-2 border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
                onClick={handleGithubLogin}
              >
                <Github className="h-4 w-4 mr-1" />
                GitHub Login
              </Button>
            )}
          </div>
        </div>
        
        <div className="md:hidden mt-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-muted">
              <TabsTrigger value="tools" className="flex-1">Tools</TabsTrigger>
              <TabsTrigger value="terminal" className="flex-1">Terminal</TabsTrigger>
              <TabsTrigger value="reporting" className="flex-1">Reporting</TabsTrigger>
              <TabsTrigger value="docs" className="flex-1">Docs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </header>
  );
};

export default Header;
