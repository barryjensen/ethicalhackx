
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Info, FileText, BookOpen, AlertTriangle } from 'lucide-react';

const Documentation: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-hacker-green flex items-center gap-2">
        <BookOpen className="h-6 w-6" />
        Documentation & Resources
      </h2>
      
      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="grid grid-cols-4 bg-muted">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="tools">Tool Guides</TabsTrigger>
          <TabsTrigger value="legal">Legal Framework</TabsTrigger>
          <TabsTrigger value="reference">Reference</TabsTrigger>
        </TabsList>
        
        <TabsContent value="getting-started" className="mt-4">
          <Card className="border-hacker-green/30">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Setting Up Your Environment</h3>
                <p className="text-muted-foreground">
                  EthicalHackX works best with a properly configured Kali Linux virtual machine.
                  Follow these steps to get started:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Run the VM Setup utility from the terminal with <code className="bg-muted px-1 rounded">setup-vm</code></li>
                  <li>Select your preferred virtualization platform</li>
                  <li>Configure system resources (or use recommended defaults)</li>
                  <li>Wait for the automated installation to complete</li>
                </ul>
              </div>
              
              <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
                <p className="font-semibold mb-1">System Requirements:</p>
                <p>Host: 8GB RAM, 4 cores, 50GB free disk space</p>
                <p>VM: 4GB RAM, 2 cores, 30GB disk (minimum)</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Using the Toolkit</h3>
                <p className="text-muted-foreground">
                  EthicalHackX provides both a terminal interface and GUI components:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Terminal: Full access to all tools with command-line flexibility</li>
                  <li>GUI: Categorized tools with simplified interfaces</li>
                  <li>Type <code className="bg-muted px-1 rounded">help</code> in the terminal for available commands</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tools" className="mt-4">
          <Card className="border-hacker-green/30">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Tool Categories</h3>
              
              <div className="space-y-2">
                <h4 className="font-medium">Network Reconnaissance</h4>
                <p className="text-muted-foreground">
                  Tools for discovering hosts, services, and networks. Use these to map your target infrastructure
                  securely and efficiently. Always ensure proper scope definition before scanning.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Web Application Testing</h4>
                <p className="text-muted-foreground">
                  Comprehensive suite for discovering vulnerabilities in web applications, including SQL injection,
                  XSS, CSRF, and other OWASP Top 10 issues. Use responsibly and only on authorized targets.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Password Auditing</h4>
                <p className="text-muted-foreground">
                  Tools to verify password strength and compliance with security requirements. Can be used to 
                  test passwords against common patterns, dictionary attacks, and bruteforce attempts.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Wireless & Bluetooth</h4>
                <p className="text-muted-foreground">
                  For testing wireless network security and Bluetooth implementations. Requires appropriate 
                  hardware and may be subject to legal restrictions in many jurisdictions.
                </p>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-muted rounded-md text-sm mt-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <p>Detailed usage guides for each tool available in the terminal with <code className="bg-hacker-black px-1 rounded">help [tool-name]</code></p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="legal" className="mt-4">
          <Card className="border-hacker-green/30">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Legal Considerations
                </h3>
                <p className="text-muted-foreground">
                  Security testing without explicit permission is illegal in most jurisdictions worldwide.
                  Before testing, ensure you have:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Written permission from the system owner</li>
                  <li>Clear scope definition</li>
                  <li>Testing timeline agreement</li>
                  <li>Rules of engagement document</li>
                  <li>Emergency contacts for critical findings</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Policy Frameworks</h3>
                <p className="text-muted-foreground">
                  Consider following these established frameworks:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>NIST SP 800-115 (Technical Guide to Information Security Testing)</li>
                  <li>OSSTMM (Open Source Security Testing Methodology Manual)</li>
                  <li>PTES (Penetration Testing Execution Standard)</li>
                  <li>OWASP Testing Guide</li>
                </ul>
              </div>
              
              <div className="p-3 border border-destructive/30 bg-destructive/10 rounded-md text-sm">
                <p className="font-semibold mb-1">Relevant Legislation:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Computer Fraud and Abuse Act (US)</li>
                  <li>Computer Misuse Act (UK)</li>
                  <li>GDPR (EU) - for data access</li>
                  <li>Local cybercrime legislation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reference" className="mt-4">
          <Card className="border-hacker-green/30">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Command Reference</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-hacker-green/30">
                      <th className="text-left py-2 px-3">Command</th>
                      <th className="text-left py-2 px-3">Description</th>
                      <th className="text-left py-2 px-3">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hacker-green/30">
                    <tr>
                      <td className="py-2 px-3 font-mono">help</td>
                      <td className="py-2 px-3">Display help menu</td>
                      <td className="py-2 px-3 font-mono">help</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono">setup-vm</td>
                      <td className="py-2 px-3">Start VM setup wizard</td>
                      <td className="py-2 px-3 font-mono">setup-vm</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono">network-recon</td>
                      <td className="py-2 px-3">Network reconnaissance tools</td>
                      <td className="py-2 px-3 font-mono">network-recon [tool-num]</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono">webapp-test</td>
                      <td className="py-2 px-3">Web app testing tools</td>
                      <td className="py-2 px-3 font-mono">webapp-test [tool-num]</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono">password-audit</td>
                      <td className="py-2 px-3">Password tools</td>
                      <td className="py-2 px-3 font-mono">password-audit [tool-num]</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono">wireless</td>
                      <td className="py-2 px-3">Wireless attack tools</td>
                      <td className="py-2 px-3 font-mono">wireless [tool-num]</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono">report</td>
                      <td className="py-2 px-3">Generate reports</td>
                      <td className="py-2 px-3 font-mono">report [type-num]</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="space-y-2 mt-4">
                <h3 className="text-lg font-semibold">Additional Resources</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Kali Linux Documentation: <span className="text-hacker-green">https://www.kali.org/docs/</span></li>
                  <li>OWASP: <span className="text-hacker-green">https://owasp.org/</span></li>
                  <li>HackTricks: <span className="text-hacker-green">https://book.hacktricks.xyz/</span></li>
                  <li>PortSwigger Web Security Academy: <span className="text-hacker-green">https://portswigger.net/web-security</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;
