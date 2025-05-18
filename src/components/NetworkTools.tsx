
import React from 'react';
import ToolCard from './ToolCard';
import { Wifi, Search, Signal, Network, Radar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NetworkToolsProps {
  onRunTool: (command: string) => void;
  className?: string;
}

const NetworkTools: React.FC<NetworkToolsProps> = ({ onRunTool, className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-hacker-green">Network Reconnaissance</h2>
        <Button 
          variant="outline"
          size="sm"
          className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
          onClick={() => onRunTool("network-recon")}
        >
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolCard
          title="Nmap"
          description="Powerful network scanning and host discovery tool for mapping networks and finding open ports."
          icon={<Search className="h-6 w-6" />}
          command="network-recon 1"
          onRun={onRunTool}
        />
        
        <ToolCard
          title="Masscan"
          description="High-speed TCP port scanner that can scan the entire internet in under 6 minutes."
          icon={<Radar className="h-6 w-6" />}
          command="network-recon 2" 
          onRun={onRunTool}
        />
        
        <ToolCard
          title="ARP Scanner"
          description="Send ARP requests to discover devices on local network segments quickly and efficiently."
          icon={<Wifi className="h-6 w-6" />}
          command="network-recon 4"
          onRun={onRunTool}
        />
      </div>
    </div>
  );
};

export default NetworkTools;
