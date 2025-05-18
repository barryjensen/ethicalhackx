import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';

interface TerminalProps {
  className?: string;
  initialCommand?: string;
}

interface TerminalLine {
  content: string;
  type: 'input' | 'output' | 'error' | 'warning' | 'success';
}

const Terminal: React.FC<TerminalProps> = ({ className, initialCommand }) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { toast } = useToast();
  const [currentScanId, setCurrentScanId] = useState<string | null>(null);

  useEffect(() => {
    if (initialCommand) {
      handleCommand(initialCommand);
    }
    
    // Add welcome message
    setHistory([
      { content: 'EthicalHackX Toolkit v1.0.0', type: 'success' },
      { content: 'Type "help" for available commands', type: 'output' },
    ]);
  }, [initialCommand]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  useEffect(() => {
    // Focus input when terminal is clicked
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    if (terminalRef.current) {
      terminalRef.current.addEventListener('click', handleClick);
    }

    return () => {
      if (terminalRef.current) {
        terminalRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);

  const saveScanResult = async (type: string, target: string, summary: string) => {
    if (!user) {
      setHistory(prev => [
        ...prev,
        { content: 'Login required to save scan results', type: 'warning' },
      ]);
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('scan_results')
        .insert([
          { 
            user_id: user.id, 
            scan_type: type, 
            target: target,
            summary: summary,
            raw_output: JSON.stringify(history)
          }
        ])
        .select('id')
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Scan saved",
        description: "Scan results have been saved to your account",
      });
      
      return data.id;
    } catch (error) {
      console.error("Error saving scan:", error);
      toast({
        title: "Error saving scan",
        description: "There was a problem saving your scan results",
        variant: "destructive",
      });
      return null;
    }
  };

  const saveVulnerability = async (scanId: string, name: string, severity: string, description?: string) => {
    if (!user || !scanId) return;
    
    try {
      const { error } = await supabase
        .from('vulnerabilities')
        .insert([
          { 
            scan_id: scanId, 
            name: name, 
            severity: severity,
            description: description || ''
          }
        ]);
      
      if (error) throw error;
    } catch (error) {
      console.error("Error saving vulnerability:", error);
    }
  };

  const handleCommand = async (cmd: string) => {
    // Add command to history
    setHistory(prev => [...prev, { content: `$ ${cmd}`, type: 'input' }]);
    setCommandHistory(prev => [...prev, cmd]);
    
    // Process command
    const trimmedCmd = cmd.trim().toLowerCase();
    const cmdParts = trimmedCmd.split(' ');
    
    if (trimmedCmd === 'help') {
      setHistory(prev => [
        ...prev, 
        { content: 'Available Commands:', type: 'output' },
        { content: '  help              - Display this help menu', type: 'output' },
        { content: '  clear             - Clear terminal', type: 'output' },
        { content: '  setup-vm          - Start VM setup wizard', type: 'output' },
        { content: '  network-recon     - Network reconnaissance tools', type: 'output' },
        { content: '  webapp-test       - Web application testing tools', type: 'output' },
        { content: '  wireless          - Wireless attack tools', type: 'output' },
        { content: '  password-audit    - Password auditing tools', type: 'output' },
        { content: '  phishing          - Phishing simulation tools (educational only)', type: 'output' },
        { content: '  social-eng        - Social engineering awareness tools', type: 'output' },
        { content: '  report            - Generate reports from collected data', type: 'output' },
        { content: '  update            - Update toolkit and tools', type: 'output' },
        { content: '  version           - Display version information', type: 'output' },
        { content: '  save-scan         - Save current scan results to your account', type: 'output' },
        { content: '  exit              - Exit toolkit', type: 'output' },
      ]);
    } else if (trimmedCmd === 'clear') {
      setHistory([]);
    } else if (trimmedCmd === 'version') {
      setHistory(prev => [
        ...prev, 
        { content: 'EthicalHackX Toolkit v1.0.0', type: 'success' },
        { content: 'Build: 2025-05-18 (stable)', type: 'output' },
        { content: 'Kali Linux Compatibility: 2023.1+', type: 'output' },
      ]);
    } else if (trimmedCmd === 'exit') {
      setHistory(prev => [
        ...prev, 
        { content: 'Exiting EthicalHackX Toolkit...', type: 'warning' },
        { content: 'Thank you for using our ethical hacking tools.', type: 'success' },
      ]);
    } else if (trimmedCmd === 'setup-vm') {
      setHistory(prev => [
        ...prev, 
        { content: 'Starting VM Setup Wizard...', type: 'success' },
        { content: 'Please select virtualization platform:', type: 'output' },
        { content: '1. VirtualBox', type: 'output' },
        { content: '2. QEMU/KVM', type: 'output' },
        { content: '3. VMware Workstation/Player', type: 'output' },
        { content: 'Enter selection (1-3):', type: 'output' },
      ]);
    } else if (trimmedCmd === 'save-scan') {
      if (!user) {
        setHistory(prev => [
          ...prev,
          { content: 'You must be logged in to save scan results', type: 'error' },
          { content: 'Please login using the account button in the top right', type: 'output' },
        ]);
      } else if (commandHistory.length <= 1) {
        setHistory(prev => [
          ...prev,
          { content: 'No scan to save. Run a scan first.', type: 'warning' },
        ]);
      } else {
        setHistory(prev => [
          ...prev,
          { content: 'Please enter scan type:', type: 'output' },
          { content: '1. Network Scan', type: 'output' },
          { content: '2. Web Application Test', type: 'output' },
          { content: '3. Vulnerability Assessment', type: 'output' },
          { content: '4. Password Audit', type: 'output' },
        ]);
      }
    } else if (['1', '2', '3', '4'].includes(trimmedCmd) && history[history.length - 1]?.content === '4. Password Audit') {
      const scanTypes = {
        '1': 'Network Scan',
        '2': 'Web Application Test',
        '3': 'Vulnerability Assessment',
        '4': 'Password Audit'
      };
      const selectedType = scanTypes[trimmedCmd as keyof typeof scanTypes];
      
      setHistory(prev => [
        ...prev,
        { content: `Selected: ${selectedType}`, type: 'success' },
        { content: 'Enter target (hostname, URL, or description):', type: 'output' },
      ]);
    } else if (history[history.length - 1]?.content === 'Enter target (hostname, URL, or description):') {
      const target = cmd;
      const scanType = history[history.length - 2]?.content.replace('Selected: ', '');
      
      setHistory(prev => [
        ...prev,
        { content: `Saving scan for target: ${target}`, type: 'output' },
        { content: 'Preparing scan summary...', type: 'output' },
      ]);
      
      // Generate a summary based on command history
      const summary = `${scanType} performed on ${target} with ${commandHistory.length} commands executed.`;
      
      // Save to Supabase
      const scanId = await saveScanResult(scanType, target, summary);
      setCurrentScanId(scanId);
      
      if (scanId) {
        setHistory(prev => [
          ...prev,
          { content: 'Scan saved successfully!', type: 'success' },
          { content: 'Would you like to add vulnerability findings? (y/n)', type: 'output' },
        ]);
      } else {
        setHistory(prev => [
          ...prev,
          { content: 'Failed to save scan.', type: 'error' },
        ]);
      }
    } else if (['y', 'n'].includes(trimmedCmd) && history[history.length - 1]?.content === 'Would you like to add vulnerability findings? (y/n)') {
      if (trimmedCmd === 'y') {
        setHistory(prev => [
          ...prev,
          { content: 'Enter vulnerability information', type: 'output' },
          { content: 'Format: <vulnerability name> | <severity: high/medium/low> | <description (optional)>', type: 'output' },
          { content: 'Example: SQL Injection | high | Found in login form', type: 'output' },
        ]);
      } else {
        setHistory(prev => [
          ...prev,
          { content: 'Scan saved without vulnerability details.', type: 'success' },
        ]);
      }
    } else if (history[history.length - 1]?.content === 'Example: SQL Injection | high | Found in login form') {
      const parts = cmd.split('|').map(p => p.trim());
      if (parts.length >= 2 && currentScanId) {
        const name = parts[0];
        const severity = parts[1].toLowerCase();
        const description = parts[2] || '';
        
        if (!['high', 'medium', 'low'].includes(severity)) {
          setHistory(prev => [
            ...prev,
            { content: 'Invalid severity level. Use high, medium, or low.', type: 'error' },
          ]);
        } else {
          await saveVulnerability(currentScanId, name, severity, description);
          
          setHistory(prev => [
            ...prev,
            { content: 'Vulnerability recorded.', type: 'success' },
            { content: 'Add another vulnerability? (y/n)', type: 'output' },
          ]);
        }
      } else {
        setHistory(prev => [
          ...prev,
          { content: 'Invalid format. Use: name | severity | description', type: 'error' },
        ]);
      }
    } else if (['y', 'n'].includes(trimmedCmd) && history[history.length - 1]?.content === 'Add another vulnerability? (y/n)') {
      if (trimmedCmd === 'y') {
        setHistory(prev => [
          ...prev,
          { content: 'Enter vulnerability information', type: 'output' },
          { content: 'Format: <vulnerability name> | <severity: high/medium/low> | <description (optional)>', type: 'output' },
          { content: 'Example: SQL Injection | high | Found in login form', type: 'output' },
        ]);
      } else {
        setHistory(prev => [
          ...prev,
          { content: 'All vulnerabilities saved.', type: 'success' },
        ]);
      }
    } else if (['1', '2', '3'].includes(trimmedCmd) && history[history.length - 1]?.content === 'Enter selection (1-3):') {
      const platforms = {
        '1': 'VirtualBox',
        '2': 'QEMU/KVM',
        '3': 'VMware Workstation/Player'
      };
      const selected = platforms[trimmedCmd as keyof typeof platforms];
      
      setHistory(prev => [
        ...prev, 
        { content: `Selected platform: ${selected}`, type: 'success' },
        { content: 'Configuring VM settings...', type: 'output' },
        { content: '- RAM: 4GB', type: 'output' },
        { content: '- CPU: 2 cores', type: 'output' },
        { content: '- Disk: 30GB', type: 'output' },
        { content: '- Network: Bridged', type: 'output' },
        { content: 'Would you like to customize these settings? (y/n)', type: 'output' },
      ]);
    } else if (['y', 'n'].includes(trimmedCmd) && history[history.length - 1]?.content === 'Would you like to customize these settings? (y/n)') {
      if (trimmedCmd === 'y') {
        setHistory(prev => [
          ...prev, 
          { content: 'Custom configuration - Not implemented in this demo', type: 'warning' },
          { content: 'Using default settings...', type: 'output' },
          { content: 'Downloading latest Kali Linux ISO...', type: 'output' },
          { content: 'Setting up VM (this would take several minutes in a real system)...', type: 'output' },
          { content: 'VM setup complete! You can now access your Kali Linux VM.', type: 'success' },
        ]);
      } else {
        setHistory(prev => [
          ...prev, 
          { content: 'Using default settings...', type: 'output' },
          { content: 'Downloading latest Kali Linux ISO...', type: 'output' },
          { content: 'Setting up VM (this would take several minutes in a real system)...', type: 'output' },
          { content: 'VM setup complete! You can now access your Kali Linux VM.', type: 'success' },
        ]);
      }
    } else if (trimmedCmd === 'network-recon') {
      setHistory(prev => [
        ...prev, 
        { content: 'Network Reconnaissance & Scanning Tools', type: 'success' },
        { content: 'Available tools:', type: 'output' },
        { content: '1. Nmap - Network discovery and security auditing', type: 'output' },
        { content: '2. Masscan - TCP port scanner', type: 'output' },
        { content: '3. Scapy - Packet manipulation tool', type: 'output' },
        { content: '4. ARP-Scan - Send ARP packets to discover hosts', type: 'output' },
        { content: '5. Recon-ng - Web reconnaissance framework', type: 'output' },
        { content: 'Enter tool number or "back" to return:', type: 'output' },
      ]);
    } else if (trimmedCmd === 'webapp-test') {
      setHistory(prev => [
        ...prev, 
        { content: 'Web Application Testing Tools', type: 'success' },
        { content: 'Available tools:', type: 'output' },
        { content: '1. SQLMap - SQL injection and database takeover tool', type: 'output' },
        { content: '2. Nikto - Web server scanner', type: 'output' },
        { content: '3. OWASP ZAP - Web app scanner', type: 'output' },
        { content: '4. Gobuster - Directory/file & DNS busting tool', type: 'output' },
        { content: '5. Burp Suite - Web vulnerability scanner', type: 'output' },
        { content: 'Enter tool number or "back" to return:', type: 'output' },
      ]);
    } else if (trimmedCmd === 'wireless') {
      setHistory(prev => [
        ...prev, 
        { content: 'Wireless & Bluetooth Attack Tools', type: 'success' },
        { content: 'Available tools:', type: 'output' },
        { content: '1. Aircrack-ng - Complete suite for 802.11 WEP/WPA/WPA2 cracking', type: 'output' },
        { content: '2. Kismet - Wireless network detector and sniffer', type: 'output' },
        { content: '3. Wifite - Automated wireless attack tool', type: 'output' },
        { content: '4. Bettercap - Swiss army knife for WiFi, Bluetooth, etc.', type: 'output' },
        { content: '5. Bluetooth Tools - Scanning and exploitation tools', type: 'output' },
        { content: 'Enter tool number or "back" to return:', type: 'output' },
      ]);
    } else if (trimmedCmd === 'password-audit') {
      setHistory(prev => [
        ...prev, 
        { content: 'Password Auditing & Cracking Tools', type: 'success' },
        { content: 'Available tools:', type: 'output' },
        { content: '1. Hashcat - Advanced password recovery', type: 'output' },
        { content: '2. John the Ripper - Password cracker', type: 'output' },
        { content: '3. Hydra - Login cracker for many protocols', type: 'output' },
        { content: '4. Wordlist Tools - Password dictionary management', type: 'output' },
        { content: '5. Hash-Identifier - Identify different hash types', type: 'output' },
        { content: 'Enter tool number or "back" to return:', type: 'output' },
      ]);
    } else if (trimmedCmd === 'phishing') {
      setHistory(prev => [
        ...prev, 
        { content: '⚠️ ETHICAL NOTICE ⚠️', type: 'warning' },
        { content: 'These tools are for EDUCATIONAL and AWARENESS purposes ONLY.', type: 'warning' },
        { content: 'Only use within authorized environments with proper permissions.', type: 'warning' },
        { content: '', type: 'output' },
        { content: 'Do you acknowledge these terms? (yes/no)', type: 'output' },
      ]);
    } else if (trimmedCmd === 'yes' && history[history.length - 1]?.content === 'Do you acknowledge these terms? (yes/no)') {
      setHistory(prev => [
        ...prev, 
        { content: 'Phishing Simulation Tools (Educational Only)', type: 'success' },
        { content: 'Available tools:', type: 'output' },
        { content: '1. GoPhish - Open-source phishing toolkit', type: 'output' },
        { content: '2. Social-Engineer Toolkit (SET)', type: 'output' },
        { content: '3. SPhish - Simple phishing email templates', type: 'output' },
        { content: '4. Awareness Training - Educational materials', type: 'output' },
        { content: 'Enter tool number or "back" to return:', type: 'output' },
      ]);
    } else if (trimmedCmd === 'social-eng') {
      setHistory(prev => [
        ...prev, 
        { content: 'Social Engineering Awareness Tools', type: 'success' },
        { content: 'Available tools:', type: 'output' },
        { content: '1. Email Header Analyzer - Detect spoofed emails', type: 'output' },
        { content: '2. Phishing Quiz - Test phishing identification skills', type: 'output' },
        { content: '3. Social Media OSINT - Information gathering awareness', type: 'output' },
        { content: '4. Attack Simulation - Safe simulated attacks', type: 'output' },
        { content: 'Enter tool number or "back" to return:', type: 'output' },
      ]);
    } else if (trimmedCmd === 'report') {
      setHistory(prev => [
        ...prev, 
        { content: 'Reporting Engine', type: 'success' },
        { content: 'Generate professional security reports from your findings.', type: 'output' },
        { content: 'Available report types:', type: 'output' },
        { content: '1. Executive Summary', type: 'output' },
        { content: '2. Technical Detail Report', type: 'output' },
        { content: '3. Remediation Plan', type: 'output' },
        { content: '4. Compliance Status', type: 'output' },
        { content: 'Enter report type or "back" to return:', type: 'output' },
      ]);
    } else if (trimmedCmd === 'update') {
      setHistory(prev => [
        ...prev, 
        { content: 'Update System', type: 'success' },
        { content: 'Checking for updates...', type: 'output' },
        { content: 'Toolkit version is current.', type: 'success' },
        { content: 'Would you like to update all tools to latest versions? (y/n)', type: 'output' },
      ]);
    } else if (['y', 'n'].includes(trimmedCmd) && history[history.length - 1]?.content === 'Would you like to update all tools to latest versions? (y/n)') {
      if (trimmedCmd === 'y') {
        setHistory(prev => [
          ...prev, 
          { content: 'Updating all tools...', type: 'output' },
          { content: 'Updating system packages...', type: 'output' },
          { content: 'Updating Python packages...', type: 'output' },
          { content: 'Updating GitHub repositories...', type: 'output' },
          { content: 'Validating tool integrity...', type: 'output' },
          { content: 'All tools updated successfully!', type: 'success' },
        ]);
      } else {
        setHistory(prev => [
          ...prev, 
          { content: 'Update canceled.', type: 'warning' },
        ]);
      }
    } else if (trimmedCmd === 'back' || ['1', '2', '3', '4', '5'].includes(trimmedCmd)) {
      // Tool selection handling
      if (['1', '2', '3', '4', '5'].includes(trimmedCmd)) {
        // Get the parent command context
        const contextLine = history.slice().reverse().find(line => 
          line.content.includes('Available tools:') || 
          line.content.includes('Available report types:')
        );
        
        const context = contextLine ? 
          contextLine.content.includes('Network') ? 'Network Reconnaissance' :
          contextLine.content.includes('Web') ? 'Web Application Testing' :
          contextLine.content.includes('Wireless') ? 'Wireless Tools' :
          contextLine.content.includes('Password') ? 'Password Auditing' :
          contextLine.content.includes('Phishing') ? 'Phishing Simulation' :
          contextLine.content.includes('Social') ? 'Social Engineering' :
          contextLine.content.includes('report types') ? 'Reporting' : 'Tool' : 'Tool';
        
        setHistory(prev => [
          ...prev, 
          { content: `Selected ${context} tool #${trimmedCmd}`, type: 'success' },
          { content: 'Launching tool interface...', type: 'output' },
          { content: '(Tool functionality is simulated in this demo)', type: 'warning' },
          { content: 'Type "back" to return to main menu', type: 'output' },
        ]);
      } else {
        setHistory(prev => [
          ...prev, 
          { content: 'Returning to main menu...', type: 'output' },
        ]);
      }
    } else {
      setHistory(prev => [
        ...prev, 
        { content: `Command not found: ${cmd}`, type: 'error' },
        { content: 'Type "help" for available commands', type: 'output' },
      ]);
    }
    
    setCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim()) {
      handleCommand(command);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input':
        return 'text-foreground';
      case 'output':
        return 'text-white';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'success':
        return 'text-green-500';
      default:
        return 'text-white';
    }
  };

  return (
    <div 
      ref={terminalRef}
      className={cn(
        'terminal bg-hacker-black text-hacker-green p-4 rounded-md overflow-y-auto w-full h-full',
        'border-2 border-hacker-green shadow-lg shadow-hacker-green/20',
        'font-mono text-sm', 
        className
      )}
    >
      <div className="pb-2 flex justify-between items-center border-b border-hacker-green/30 mb-2">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-hacker-green font-bold">EthicalHackX Terminal</div>
        <div className="text-xs opacity-50">v1.0.0</div>
      </div>
      
      <div className="min-h-[calc(100%-2rem)]">
        {history.map((line, index) => (
          <div key={index} className={cn("py-1", getLineColor(line.type))}>
            {line.content}
          </div>
        ))}
        
        <div className="flex items-center py-1">
          <span className="text-hacker-green mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-hacker-green flex-grow"
            autoFocus
          />
          <span className="terminal-cursor"></span>
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default Terminal;
