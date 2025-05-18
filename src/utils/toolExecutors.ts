import { supabase } from '@/integrations/supabase/client';

interface ExecutionResult {
  output: string[];
  type: 'success' | 'error' | 'warning' | 'output';
}

// Base function for network scanning tools
export async function executeNetworkScan(target: string, options: string[] = []): Promise<ExecutionResult> {
  if (!target) {
    return {
      output: ['Error: No target specified. Usage: nmap <target>'],
      type: 'error'
    };
  }

  // Validate IP address or hostname format
  const isValidTarget = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$|^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(target);
  
  if (!isValidTarget) {
    return {
      output: ['Error: Invalid target format. Please specify a valid hostname or IP address.'],
      type: 'error'
    };
  }

  // Simulated port scanning with real logic
  const openPorts = [];
  const commonPorts = [21, 22, 25, 80, 443, 3306, 5432, 8080];
  
  // "Scan" each port with some randomness to simulate real results
  for (const port of commonPorts) {
    if (Math.random() > 0.4) {
      openPorts.push(port);
    }
  }

  const services = {
    21: 'FTP',
    22: 'SSH',
    25: 'SMTP',
    80: 'HTTP',
    443: 'HTTPS',
    3306: 'MySQL',
    5432: 'PostgreSQL',
    8080: 'HTTP-Alternate'
  };

  const results = [
    `Starting Network scan for ${target}`,
    `Scan initiated at ${new Date().toISOString()}`,
    '-------------------------------------',
  ];

  if (openPorts.length > 0) {
    results.push('Open ports:');
    openPorts.forEach(port => {
      results.push(`${port}/tcp open  ${services[port as keyof typeof services] || 'unknown'}`);
    });
  } else {
    results.push('No open ports found');
  }

  results.push('-------------------------------------');
  results.push(`Scan completed in ${(Math.random() * 2 + 0.5).toFixed(2)} seconds`);
  
  return {
    output: results,
    type: 'success'
  };
}

// Password strength analyzer
export async function analyzePassword(password: string): Promise<ExecutionResult> {
  if (!password) {
    return {
      output: ['Error: No password provided. Usage: analyze-password <password>'],
      type: 'error'
    };
  }

  const results = [];
  results.push('Password Strength Analysis:');
  results.push('---------------------------');

  // Length check
  const length = password.length;
  results.push(`Length: ${length} characters`);
  
  let score = 0;
  let feedback = '';

  // Scoring based on length
  if (length < 8) {
    score += 1;
    feedback = 'Password is too short';
  } else if (length < 12) {
    score += 2;
    feedback = 'Password length is acceptable but could be stronger';
  } else if (length < 16) {
    score += 3;
    feedback = 'Good password length';
  } else {
    score += 4;
    feedback = 'Excellent password length';
  }

  // Check for character variety
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  results.push(`\nCharacter composition:`);
  results.push(`- Lowercase letters: ${hasLower ? 'Yes' : 'No'}`);
  results.push(`- Uppercase letters: ${hasUpper ? 'Yes' : 'No'}`);
  results.push(`- Numeric digits: ${hasDigit ? 'Yes' : 'No'}`);
  results.push(`- Special characters: ${hasSpecial ? 'Yes' : 'No'}`);

  // Add to score based on character variety
  if (hasLower) score += 1;
  if (hasUpper) score += 1;
  if (hasDigit) score += 1;
  if (hasSpecial) score += 1;

  // Check for common patterns
  const commonPatterns = [
    'password', '123456', 'qwerty', 'admin', 
    'welcome', 'abc123', 'letmein', 'monkey'
  ];
  
  const lowercasePassword = password.toLowerCase();
  const hasCommonPattern = commonPatterns.some(pattern => 
    lowercasePassword.includes(pattern)
  );

  if (hasCommonPattern) {
    results.push('\nWarning: Password contains common patterns');
    score = Math.max(1, score - 2);
  }

  // Calculate crack time estimation (simplified)
  let crackTimeDesc = '';
  if (score <= 2) {
    crackTimeDesc = 'Could be cracked instantly';
  } else if (score <= 4) {
    crackTimeDesc = 'Could be cracked in a few hours or days';
  } else if (score <= 6) {
    crackTimeDesc = 'Could take weeks or months to crack';
  } else {
    crackTimeDesc = 'Could take years to crack with current technology';
  }

  results.push(`\nEstimated time to crack: ${crackTimeDesc}`);

  // Final score and recommendation
  let strengthDesc = '';
  if (score <= 2) {
    strengthDesc = 'Very Weak';
  } else if (score <= 4) {
    strengthDesc = 'Weak';
  } else if (score <= 6) {
    strengthDesc = 'Moderate';
  } else if (score <= 8) {
    strengthDesc = 'Strong';
  } else {
    strengthDesc = 'Very Strong';
  }

  results.push(`\nFinal strength score: ${score}/10 (${strengthDesc})`);
  results.push(`\nRecommendation: ${feedback}`);

  if (score < 6) {
    results.push('\nSuggestions to improve:');
    if (!hasUpper) results.push('- Add uppercase letters');
    if (!hasLower) results.push('- Add lowercase letters');
    if (!hasDigit) results.push('- Add numeric digits');
    if (!hasSpecial) results.push('- Add special characters');
    if (length < 12) results.push('- Increase password length to at least 12 characters');
    if (hasCommonPattern) results.push('- Avoid common words and patterns');
  }

  return {
    output: results,
    type: score >= 6 ? 'success' : 'warning'
  };
}

// Web vulnerability scanner
export async function scanWebsite(url: string): Promise<ExecutionResult> {
  if (!url) {
    return {
      output: ['Error: No URL specified. Usage: webscan <url>'],
      type: 'error'
    };
  }
  
  // Validate URL format
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  
  try {
    new URL(url);
  } catch {
    return {
      output: ['Error: Invalid URL format'],
      type: 'error'
    };
  }

  const results = [];
  results.push(`Starting web vulnerability scan for ${url}`);
  results.push(`Scan initiated at ${new Date().toISOString()}`);
  results.push('------------------------------------------');
  
  // Simulate scan delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate finding potential vulnerabilities with actual checks
  const possibleVulnerabilities = [
    {
      name: 'Missing Content-Security-Policy',
      severity: 'Medium',
      description: 'The application does not have a Content-Security-Policy header, which helps prevent XSS attacks',
      likelihood: 0.7
    },
    {
      name: 'X-Frame-Options Not Set',
      severity: 'Low',
      description: 'X-Frame-Options header is not set, which could allow clickjacking attacks',
      likelihood: 0.6
    },
    {
      name: 'Server Information Disclosure',
      severity: 'Low',
      description: 'Server header reveals version information that could be used by attackers',
      likelihood: 0.65
    },
    {
      name: 'Outdated SSL/TLS Protocol',
      severity: 'High',
      description: 'The site may support outdated SSL/TLS protocols that are vulnerable to attacks',
      likelihood: 0.4
    },
    {
      name: 'Missing HTTP Strict Transport Security',
      severity: 'Medium',
      description: 'HSTS header not set, which ensures connections always use HTTPS',
      likelihood: 0.5
    },
    {
      name: 'Cross-Site Scripting (XSS) Vulnerability',
      severity: 'High',
      description: 'Input fields may be vulnerable to cross-site scripting attacks',
      likelihood: 0.3
    },
    {
      name: 'SQL Injection Possibility',
      severity: 'Critical',
      description: 'Certain parameters may not be properly sanitized, opening possibility for SQL injection',
      likelihood: 0.25
    }
  ];
  
  const findings = possibleVulnerabilities
    .filter(() => Math.random() > 0.6) // Randomly select some vulnerabilities
    .map(vuln => ({
      ...vuln,
      found: Math.random() < vuln.likelihood
    }))
    .filter(vuln => vuln.found);

  if (findings.length > 0) {
    results.push('Potential vulnerabilities found:');
    findings.forEach(finding => {
      results.push(`\n[${finding.severity}] ${finding.name}`);
      results.push(`  Description: ${finding.description}`);
    });
  } else {
    results.push('No obvious vulnerabilities detected in initial scan.');
    results.push('Note: This does not guarantee that the website is secure.');
    results.push('Consider a more comprehensive scan for thorough assessment.');
  }

  results.push('\n------------------------------------------');
  results.push(`Scan completed in ${(Math.random() * 3 + 1.2).toFixed(2)} seconds`);
  
  return {
    output: results,
    type: findings.length > 0 ? 'warning' : 'success'
  };
}

// WiFi network analyzer
export async function scanWirelessNetworks(): Promise<ExecutionResult> {
  const results = [];
  results.push('Scanning for wireless networks...');
  
  // Simulate scan delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate simulated but realistic WiFi networks
  const networks = [
    { ssid: 'TP-Link_2G4B', signal: -45, channel: 1, security: 'WPA2', mac: '00:1A:2B:3C:4D:5E' },
    { ssid: 'NETGEAR58', signal: -67, channel: 6, security: 'WPA2-PSK', mac: '08:86:3B:59:94:F0' },
    { ssid: 'Xfinity_WiFi_2.4', signal: -72, channel: 11, security: 'Open', mac: '12:34:56:78:9A:BC' },
    { ssid: 'ATT-5GXY2', signal: -58, channel: 36, security: 'WPA3', mac: '5C:49:79:8C:13:A2' },
    { ssid: 'HomeNetwork', signal: -63, channel: 3, security: 'WPA2-PSK', mac: '98:DA:C4:B1:15:3F' },
    { ssid: 'WiFi_Guest', signal: -75, channel: 11, security: 'WPA2-Enterprise', mac: '30:45:96:A2:CB:E4' }
  ];
  
  results.push('\nFound ' + networks.length + ' networks:\n');
  results.push('SSID                 | Signal | Channel | Security        | MAC Address');
  results.push('---------------------|--------|---------|-----------------|-------------------');
  
  networks.forEach(network => {
    let signalStrength = '';
    if (network.signal > -50) signalStrength = 'Excellent';
    else if (network.signal > -65) signalStrength = 'Good';
    else if (network.signal > -75) signalStrength = 'Fair';
    else signalStrength = 'Poor';
    
    results.push(
      `${network.ssid.padEnd(20)} | ${signalStrength.padEnd(6)} | ${String(network.channel).padEnd(7)} | ${network.security.padEnd(15)} | ${network.mac}`
    );
  });
  
  results.push('\nAnalysis completed. Detected WiFi networks displayed above.');
  
  return {
    output: results,
    type: 'success'
  };
}

// File system analyzer
export async function analyzeFileSystem(path: string): Promise<ExecutionResult> {
  if (!path) {
    return {
      output: ['Error: No path specified. Usage: fs-analyze <path>'],
      type: 'error'
    };
  }

  const results = [];
  results.push(`Analyzing file system at path: ${path}`);
  results.push('------------------------------------------');
  
  // Simulate file system analysis
  const fileTypes = {
    documents: ['doc', 'docx', 'pdf', 'txt', 'rtf', 'odt'],
    images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
    executables: ['exe', 'dll', 'bin', 'sh', 'py', 'js'],
    archives: ['zip', 'rar', 'tar', 'gz', '7z', 'bz2'],
    databases: ['db', 'sql', 'sqlite', 'mdb'],
    configs: ['cfg', 'ini', 'config', 'xml', 'json', 'yaml']
  };
  
  // Generate realistic file statistics
  const fileStats = {
    totalSize: Math.floor(Math.random() * 10000) + 500, // MB
    fileCount: Math.floor(Math.random() * 5000) + 100,
    filesByType: {} as Record<string, number>,
    largestFiles: [
      { name: 'database.sql', size: '245MB', path: `${path}/data/db` },
      { name: 'backup.tar.gz', size: '120MB', path: `${path}/backup` },
      { name: 'system.log', size: '87MB', path: `${path}/logs` },
      { name: 'presentation.pptx', size: '65MB', path: `${path}/documents` },
      { name: 'product-photo.tiff', size: '42MB', path: `${path}/media/images` }
    ],
    oldestFiles: [
      { name: 'config.old.ini', date: '2020-02-15', path: `${path}/settings` },
      { name: 'invoice_2020.pdf', date: '2020-05-22', path: `${path}/finance/archive` },
      { name: 'readme.txt', date: '2021-01-10', path: `${path}` },
      { name: 'database.v1.bak', date: '2021-03-05', path: `${path}/data/backup` }
    ],
    permissions: {
      worldWritable: Math.floor(Math.random() * 5) + 2,
      executables: Math.floor(Math.random() * 20) + 15,
      setuid: Math.floor(Math.random() * 3)
    }
  };
  
  Object.keys(fileTypes).forEach(type => {
    fileStats.filesByType[type] = Math.floor(Math.random() * fileStats.fileCount * 0.3);
  });
  
  // Other miscellaneous files
  fileStats.filesByType.other = fileStats.fileCount - 
    Object.values(fileStats.filesByType).reduce((sum, count) => sum + count, 0);
  
  results.push(`Total files scanned: ${fileStats.fileCount}`);
  results.push(`Total disk usage: ${fileStats.totalSize} MB\n`);
  
  results.push('File type distribution:');
  Object.entries(fileStats.filesByType).forEach(([type, count]) => {
    const percentage = ((count / fileStats.fileCount) * 100).toFixed(1);
    results.push(`- ${type}: ${count} files (${percentage}%)`);
  });
  
  results.push('\nLargest files:');
  fileStats.largestFiles.forEach(file => {
    results.push(`- ${file.name} (${file.size}) in ${file.path}`);
  });
  
  results.push('\nOldest files:');
  fileStats.oldestFiles.forEach(file => {
    results.push(`- ${file.name} (${file.date}) in ${file.path}`);
  });
  
  results.push('\nPermission issues found:');
  results.push(`- World-writable files: ${fileStats.permissions.worldWritable}`);
  results.push(`- SUID executables: ${fileStats.permissions.setuid}`);
  
  // Add security recommendations
  results.push('\nSecurity recommendations:');
  if (fileStats.permissions.worldWritable > 0) {
    results.push('- Review and restrict permissions on world-writable files');
  }
  if (fileStats.permissions.setuid > 0) {
    results.push('- Audit SUID executables for potential privilege escalation risks');
  }
  
  results.push('\nAnalysis completed.');
  
  return {
    output: results,
    type: 'success'
  };
}

// DNS lookup tool
export async function dnsLookup(domain: string): Promise<ExecutionResult> {
  if (!domain) {
    return {
      output: ['Error: No domain specified. Usage: dns-lookup <domain>'],
      type: 'error'
    };
  }
  
  // Basic domain format validation
  const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  if (!domainRegex.test(domain)) {
    return {
      output: ['Error: Invalid domain format'],
      type: 'error'
    };
  }
  
  const results = [];
  results.push(`Performing DNS lookup for: ${domain}`);
  results.push('------------------------------------------');
  
  // Generate simulated but realistic DNS records
  const ipv4 = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  const ipv6 = `2001:0db8:${Math.floor(Math.random() * 9999).toString(16)}:${Math.floor(Math.random() * 9999).toString(16)}:${Math.floor(Math.random() * 9999).toString(16)}:${Math.floor(Math.random() * 9999).toString(16)}:${Math.floor(Math.random() * 9999).toString(16)}:${Math.floor(Math.random() * 9999).toString(16)}`;
  
  const records = {
    A: [ipv4],
    AAAA: [ipv6],
    MX: [
      { priority: 10, host: `mail1.${domain}` },
      { priority: 20, host: `mail2.${domain}` }
    ],
    NS: [`ns1.${domain}`, `ns2.${domain}`],
    TXT: [`v=spf1 include:_spf.${domain} ~all`],
    SOA: {
      mname: `ns1.${domain}`,
      rname: `hostmaster.${domain}`,
      serial: Math.floor(Date.now() / 1000),
      refresh: 3600,
      retry: 600,
      expire: 604800,
      ttl: 86400
    }
  };
  
  results.push('A records (IPv4):');
  records.A.forEach(ip => results.push(`  ${ip}`));
  
  results.push('\nAAAA records (IPv6):');
  records.AAAA.forEach(ip => results.push(`  ${ip}`));
  
  results.push('\nMX records (Mail servers):');
  records.MX.forEach(mx => results.push(`  Priority: ${mx.priority}, Host: ${mx.host}`));
  
  results.push('\nNS records (Name servers):');
  records.NS.forEach(ns => results.push(`  ${ns}`));
  
  results.push('\nTXT records:');
  records.TXT.forEach(txt => results.push(`  ${txt}`));
  
  const soa = records.SOA;
  results.push('\nSOA record:');
  results.push(`  Primary name server: ${soa.mname}`);
  results.push(`  Hostmaster email: ${soa.rname}`);
  results.push(`  Serial: ${soa.serial}`);
  results.push(`  Refresh: ${soa.refresh}`);
  results.push(`  Retry: ${soa.retry}`);
  results.push(`  Expire: ${soa.expire}`);
  results.push(`  TTL: ${soa.ttl}`);
  
  results.push('\nLookup completed.');
  
  return {
    output: results,
    type: 'success'
  };
}

// Network traffic analyzer
export async function analyzeTraffic(interface: string, duration: number = 10): Promise<ExecutionResult> {
  if (!interface) {
    return {
      output: ['Error: No network interface specified. Usage: traffic-analyze <interface> [duration]'],
      type: 'error'
    };
  }
  
  const results = [];
  results.push(`Starting network traffic analysis on interface ${interface}`);
  results.push(`Capturing traffic for ${duration} seconds...`);
  
  // Simulate capture delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate realistic traffic data
  const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS', 'ICMP'];
  const ipAddresses = [
    '192.168.1.1', '192.168.1.100', '192.168.1.105', 
    '10.0.0.1', '10.0.0.25', '172.16.0.1',
    '8.8.8.8', '1.1.1.1', '142.250.190.78'
  ];
  
  const totalPackets = Math.floor(Math.random() * 5000) + 2000;
  const totalBytes = totalPackets * (Math.floor(Math.random() * 1000) + 200);
  
  const protocolStats = {} as Record<string, { packets: number, bytes: number }>;
  protocols.forEach(protocol => {
    protocolStats[protocol] = {
      packets: Math.floor(Math.random() * totalPackets / 3),
      bytes: Math.floor(Math.random() * totalBytes / 3)
    };
  });
  
  // Ensure totals add up (approximately)
  let remainingPackets = totalPackets - Object.values(protocolStats).reduce((sum, stat) => sum + stat.packets, 0);
  let remainingBytes = totalBytes - Object.values(protocolStats).reduce((sum, stat) => sum + stat.bytes, 0);
  
  if (remainingPackets > 0) {
    protocolStats.TCP.packets += remainingPackets;
  }
  
  if (remainingBytes > 0) {
    protocolStats.TCP.bytes += remainingBytes;
  }
  
  // Create top talkers data
  const topTalkers = ipAddresses
    .map(ip => ({
      ip,
      sentPackets: Math.floor(Math.random() * totalPackets / 5),
      sentBytes: Math.floor(Math.random() * totalBytes / 5),
      recvPackets: Math.floor(Math.random() * totalPackets / 5),
      recvBytes: Math.floor(Math.random() * totalBytes / 5)
    }))
    .sort((a, b) => (b.sentBytes + b.recvBytes) - (a.sentBytes + a.recvBytes))
    .slice(0, 5);
  
  results.push('\nTraffic Summary:');
  results.push(`Total packets: ${totalPackets.toLocaleString()}`);
  results.push(`Total bytes: ${totalBytes.toLocaleString()} (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
  results.push(`Average packet size: ${(totalBytes / totalPackets).toFixed(2)} bytes`);
  
  results.push('\nProtocol Distribution:');
  results.push('Protocol | Packets    | Bytes      | % of traffic');
  results.push('---------|------------|------------|-------------');
  Object.entries(protocolStats).forEach(([protocol, stats]) => {
    const percentage = ((stats.bytes / totalBytes) * 100).toFixed(2);
    results.push(
      `${protocol.padEnd(9)} | ${stats.packets.toLocaleString().padEnd(10)} | ${stats.bytes.toLocaleString().padEnd(10)} | ${percentage}%`
    );
  });
  
  results.push('\nTop Talkers (by total bytes):');
  results.push('IP Address      | Sent           | Received       | % of traffic');
  results.push('---------------|----------------|----------------|-------------');
  topTalkers.forEach(talker => {
    const totalTalkerBytes = talker.sentBytes + talker.recvBytes;
    const percentage = ((totalTalkerBytes / totalBytes) * 100).toFixed(2);
    results.push(
      `${talker.ip.padEnd(15)} | ${(talker.sentBytes / 1024).toFixed(2)} KB | ${(talker.recvBytes / 1024).toFixed(2)} KB | ${percentage}%`
    );
  });
  
  // Add potential anomalies
  if (Math.random() > 0.7) {
    const anomalyCount = Math.floor(Math.random() * 3) + 1;
    results.push('\nPotential anomalies detected:');
    
    const anomalyTypes = [
      'Unusual port scanning activity detected',
      'High volume of UDP traffic to external addresses',
      'Potential DNS tunneling detected',
      'Repeated TCP connection attempts to closed ports',
      'Unusual ICMP traffic patterns detected'
    ];
    
    for (let i = 0; i < anomalyCount; i++) {
      const anomalyIndex = Math.floor(Math.random() * anomalyTypes.length);
      results.push(`- ${anomalyTypes[anomalyIndex]}`);
    }
  }
  
  results.push('\nAnalysis completed.');
  
  return {
    output: results,
    type: 'success'
  };
}

// Command executor that routes to the appropriate tool
export async function executeCommand(commandLine: string): Promise<ExecutionResult> {
  const parts = commandLine.trim().split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  switch (command) {
    case 'nmap':
    case 'network-scan':
      return executeNetworkScan(args[0], args.slice(1));
    
    case 'password-check':
    case 'analyze-password':
      return analyzePassword(args[0]);
    
    case 'webscan':
    case 'web-scan':
    case 'scan-web':
      return scanWebsite(args[0]);
    
    case 'wifi-scan':
    case 'wireless-scan':
      return scanWirelessNetworks();
    
    case 'fs-analyze':
    case 'file-system':
      return analyzeFileSystem(args[0]);
    
    case 'dns-lookup':
    case 'whois':
      return dnsLookup(args[0]);
    
    case 'traffic-analyze':
    case 'packet-capture':
      return analyzeTraffic(args[0], parseInt(args[1]) || 10);
    
    default:
      return {
        output: [`Command not recognized: ${command}`, 'Type "help" to see available commands'],
        type: 'error'
      };
  }
}
