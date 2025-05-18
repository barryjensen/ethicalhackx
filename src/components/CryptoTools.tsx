
import React from 'react';
import ToolCard from './ToolCard';
import { KeySquare, Lock, FileDigit, Shield, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CryptoToolsProps {
  onRunTool: (command: string) => void;
  className?: string;
}

const CryptoTools: React.FC<CryptoToolsProps> = ({ onRunTool, className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-hacker-green">Cryptographic Utilities</h2>
        <Button 
          variant="outline"
          size="sm"
          className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
          onClick={() => onRunTool("crypto-tools")}
        >
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolCard
          title="Hash Generator"
          description="Generate secure hashes using various algorithms including MD5, SHA-1, SHA-256, and more."
          icon={<FileDigit className="h-6 w-6" />}
          command="hash-gen"
          onRun={onRunTool}
        />
        
        <ToolCard
          title="Cipher Tools"
          description="Encrypt and decrypt data using symmetric and asymmetric ciphers like AES, RSA, and more."
          icon={<KeySquare className="h-6 w-6" />}
          command="cipher" 
          onRun={onRunTool}
        />
        
        <ToolCard
          title="Certificate Analyzer"
          description="Analyze SSL/TLS certificates for security vulnerabilities and configuration issues."
          icon={<ShieldAlert className="h-6 w-6" />}
          command="cert-analyze"
          onRun={onRunTool}
        />
      </div>
    </div>
  );
};

export default CryptoTools;
