
import React from 'react';
import ToolCard from './ToolCard';
import { Globe, Search, Database, FolderSearch, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WebToolsProps {
  onRunTool: (command: string) => void;
  className?: string;
}

const WebTools: React.FC<WebToolsProps> = ({ onRunTool, className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-hacker-green">Web Application Testing</h2>
        <Button 
          variant="outline"
          size="sm"
          className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
          onClick={() => onRunTool("webapp-test")}
        >
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolCard
          title="SQLMap"
          description="Automates detection and exploitation of SQL injection vulnerabilities in database systems."
          icon={<Database className="h-6 w-6" />}
          command="webapp-test 1"
          onRun={onRunTool}
        />
        
        <ToolCard
          title="OWASP ZAP"
          description="Integrated web application security scanner for finding vulnerabilities automatically."
          icon={<Shield className="h-6 w-6" />}
          command="webapp-test 3" 
          onRun={onRunTool}
        />
        
        <ToolCard
          title="Gobuster"
          description="Directory/file and DNS busting tool written in Go for discovering hidden content."
          icon={<FolderSearch className="h-6 w-6" />}
          command="webapp-test 4"
          onRun={onRunTool}
        />
      </div>
    </div>
  );
};

export default WebTools;
