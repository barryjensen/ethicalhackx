
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Terminal as TerminalIcon, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showDisclaimer: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, showDisclaimer }) => {
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
            <Button 
              variant="outline" 
              size="sm"
              className="ml-2 border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
            >
              <TerminalIcon className="h-4 w-4 mr-1" />
              VM Setup
            </Button>
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
