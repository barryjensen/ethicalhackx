
import React from 'react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Shield, AlertTriangle } from 'lucide-react';

interface EthicsDisclaimerProps {
  open: boolean;
  onAccept: () => void;
}

const EthicsDisclaimer: React.FC<EthicsDisclaimerProps> = ({ open, onAccept }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="border-2 border-hacker-green/50 bg-card">
        <AlertDialogHeader className="space-y-4">
          <div className="flex items-center justify-center">
            <Shield className="h-10 w-10 text-hacker-green" />
          </div>
          <AlertDialogTitle className="text-center text-hacker-green text-xl">Ethical Usage Agreement</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground font-medium">
            <AlertTriangle className="h-5 w-5 text-destructive inline mr-1" />
            For educational and authorized testing only
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="bg-muted p-4 rounded-md space-y-2 text-foreground">
          <p className="font-medium">By using this toolkit, you agree to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Only use these tools on systems you own or have explicit permission to test</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect privacy and confidentiality</li>
            <li>Report vulnerabilities responsibly</li>
            <li>Not use these tools for unauthorized or malicious purposes</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Misuse of security testing tools may violate laws including the Computer Fraud and Abuse Act (CFAA), 
            the Computer Misuse Act, GDPR, and similar legislation worldwide.
          </p>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={onAccept} 
            className="bg-hacker-green text-black hover:bg-hacker-green/90 w-full"
          >
            I Understand and Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EthicsDisclaimer;
