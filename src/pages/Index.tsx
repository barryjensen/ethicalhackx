
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Terminal from '@/components/Terminal';
import NetworkTools from '@/components/NetworkTools';
import WebTools from '@/components/WebTools';
import PasswordTools from '@/components/PasswordTools';
import ReportingTools from '@/components/ReportingTools';
import Documentation from '@/components/Documentation';
import EthicsDisclaimer from '@/components/EthicsDisclaimer';
import { TabsContent, Tabs } from '@/components/ui/tabs';
import { Shield, FileBarChart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import CryptoTools from '@/components/CryptoTools';
import ForensicTools from '@/components/ForensicTools';

const Index = () => {
  const [activeTab, setActiveTab] = useState("tools");
  const [showTerminalCommand, setShowTerminalCommand] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRunTool = (command: string) => {
    setActiveTab("terminal");
    setShowTerminalCommand(command);
    
    toast({
      title: "Tool Selected",
      description: `Running command: ${command}`,
      duration: 3000,
    });
  };

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
    
    toast({
      title: "Disclaimer Accepted",
      description: "Welcome to EthicalHackX Toolkit",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        showDisclaimer={() => setShowDisclaimer(true)}
      />
      
      <EthicsDisclaimer 
        open={showDisclaimer} 
        onAccept={handleAcceptDisclaimer} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="tools" className="mt-0">
            <div className="mb-6 p-4 bg-card rounded-lg border border-hacker-green/30">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-6 w-6 text-hacker-green" />
                <h1 className="text-2xl font-bold text-hacker-green">EthicalHackX Toolkit v1.1.0</h1>
              </div>
              <p className="text-muted-foreground">
                Professional-grade penetration testing and security assessment toolkit.
                Select a tool category below or use the terminal interface for advanced control.
              </p>
              <div className="flex mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
                  onClick={() => navigate('/scan-results')}
                >
                  <FileBarChart className="h-4 w-4 mr-2" /> View Scan History
                </Button>
              </div>
            </div>
            
            <div className="space-y-10">
              <NetworkTools onRunTool={handleRunTool} />
              <WebTools onRunTool={handleRunTool} />
              <PasswordTools onRunTool={handleRunTool} />
              <CryptoTools onRunTool={handleRunTool} />
              <ForensicTools onRunTool={handleRunTool} />
            </div>
          </TabsContent>
          
          <TabsContent value="terminal" className="mt-0">
            <div className="h-[calc(100vh-12rem)]">
              <Terminal initialCommand={showTerminalCommand} className="h-full" />
            </div>
          </TabsContent>
          
          <TabsContent value="reporting" className="mt-0">
            <ReportingTools onRunTool={handleRunTool} />
          </TabsContent>
          
          <TabsContent value="docs" className="mt-0">
            <Documentation />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t border-hacker-green/30 py-2 px-4 text-center text-muted-foreground text-xs">
        <p>EthicalHackX v1.1.0 | Educational and professional use only | © 2025</p>
      </footer>
    </div>
  );
};

export default Index;
