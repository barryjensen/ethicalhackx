
import React from 'react';
import ToolCard from './ToolCard';
import { Key, Lock, Fingerprint, FileText, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PasswordToolsProps {
  onRunTool: (command: string) => void;
  className?: string;
}

const PasswordTools: React.FC<PasswordToolsProps> = ({ onRunTool, className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-hacker-green">Password Auditing</h2>
        <Button 
          variant="outline"
          size="sm"
          className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
          onClick={() => onRunTool("password-audit")}
        >
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolCard
          title="Hashcat"
          description="World's fastest and most advanced password recovery utility with GPU acceleration."
          icon={<Hash className="h-6 w-6" />}
          command="password-audit 1"
          onRun={onRunTool}
        />
        
        <ToolCard
          title="John the Ripper"
          description="Free password cracking software tool originally developed for Unix systems."
          icon={<Key className="h-6 w-6" />}
          command="password-audit 2" 
          onRun={onRunTool}
        />
        
        <ToolCard
          title="Hydra"
          description="Parallelized login cracker that supports many protocols and services."
          icon={<Lock className="h-6 w-6" />}
          command="password-audit 3"
          onRun={onRunTool}
        />
      </div>
    </div>
  );
};

export default PasswordTools;
