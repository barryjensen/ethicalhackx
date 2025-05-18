
import React from 'react';
import ToolCard from './ToolCard';
import { FileSearch, HardDrive, Monitor, Microscope, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ForensicToolsProps {
  onRunTool: (command: string) => void;
  className?: string;
}

const ForensicTools: React.FC<ForensicToolsProps> = ({ onRunTool, className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-hacker-green">Digital Forensics</h2>
        <Button 
          variant="outline"
          size="sm"
          className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
          onClick={() => onRunTool("forensic-tools")}
        >
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolCard
          title="Disk Analyzer"
          description="Recover deleted files and analyze storage devices for evidence in investigations."
          icon={<HardDrive className="h-6 w-6" />}
          command="disk-forensics"
          onRun={onRunTool}
        />
        
        <ToolCard
          title="Memory Forensics"
          description="Extract and analyze volatile memory to discover malware and hidden processes."
          icon={<Server className="h-6 w-6" />}
          command="memory-forensics" 
          onRun={onRunTool}
        />
        
        <ToolCard
          title="Log Analyzer"
          description="Parse and analyze system logs to detect intrusions and reconstruct events."
          icon={<FileSearch className="h-6 w-6" />}
          command="log-analyzer"
          onRun={onRunTool}
        />
      </div>
    </div>
  );
};

export default ForensicTools;
