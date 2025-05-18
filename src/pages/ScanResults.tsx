
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Shield, ArrowLeft, AlertTriangle, CheckCircle, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/context/UserContext';

interface Vulnerability {
  id: string;
  name: string;
  severity: string;
  description: string | null;
  status: string | null;
  cvss_score: number | null;
}

interface ScanResult {
  id: string;
  target: string;
  scan_type: string;
  scan_date: string;
  status: string;
  summary: string | null;
  vulnerabilities: Vulnerability[];
}

const ScanResults: React.FC = () => {
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchScans = async () => {
      if (!user) return;
      
      try {
        const { data: scanData, error: scanError } = await supabase
          .from('scan_results')
          .select('*')
          .eq('user_id', user.id)
          .order('scan_date', { ascending: false });
          
        if (scanError) throw scanError;
        
        const scansWithVulnerabilities = await Promise.all(
          scanData.map(async (scan) => {
            const { data: vulnData, error: vulnError } = await supabase
              .from('vulnerabilities')
              .select('*')
              .eq('scan_id', scan.id);
              
            if (vulnError) throw vulnError;
            
            return {
              ...scan,
              vulnerabilities: vulnData || []
            };
          })
        );
        
        setScans(scansWithVulnerabilities);
      } catch (error) {
        console.error('Error fetching scan data:', error);
        toast({
          title: "Error",
          description: "Failed to load scan results",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchScans();
  }, [user, toast]);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const filteredScans = activeTab === 'all' 
    ? scans 
    : scans.filter(scan => scan.scan_type.toLowerCase() === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-hacker-green/30 py-4 px-4 bg-card">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
              className="text-hacker-green hover:bg-hacker-green/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-hacker-green" />
              <h1 className="text-xl font-bold text-hacker-green">Scan Results</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Scans</TabsTrigger>
            <TabsTrigger value="network scan">Network</TabsTrigger>
            <TabsTrigger value="web application test">Web App</TabsTrigger>
            <TabsTrigger value="vulnerability assessment">Vulnerability</TabsTrigger>
            <TabsTrigger value="password audit">Password</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hacker-green"></div>
              <p className="text-muted-foreground">Loading scan results...</p>
            </div>
          </div>
        ) : filteredScans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredScans.map((scan) => (
              <Card key={scan.id} className="border-hacker-green/30 hover:shadow-md hover:shadow-hacker-green/10 transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {scan.target}
                        <Badge variant="outline" className="ml-2 text-xs font-normal">
                          <div className="flex items-center gap-1">
                            {getStatusIcon(scan.status)}
                            <span>{scan.status}</span>
                          </div>
                        </Badge>
                      </CardTitle>
                      <CardDescription>{scan.scan_type}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {formatDate(scan.scan_date)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scan.summary && (
                      <div className="text-sm">
                        <strong className="text-xs uppercase text-muted-foreground flex items-center gap-1 mb-1">
                          <FileText className="h-3 w-3" /> Summary
                        </strong>
                        <p>{scan.summary}</p>
                      </div>
                    )}
                    
                    {scan.vulnerabilities.length > 0 && (
                      <div>
                        <strong className="text-xs uppercase text-muted-foreground flex items-center gap-1 mb-2">
                          <AlertTriangle className="h-3 w-3" /> Vulnerabilities ({scan.vulnerabilities.length})
                        </strong>
                        <div className="space-y-2">
                          {scan.vulnerabilities.slice(0, 3).map((vuln) => (
                            <div key={vuln.id} className="bg-card border border-hacker-green/20 rounded-md p-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{vuln.name}</span>
                                <div 
                                  className={`${getSeverityColor(vuln.severity)} rounded-full px-2 py-0.5 text-xs text-white`}
                                >
                                  {vuln.severity}
                                </div>
                              </div>
                              {vuln.description && (
                                <p className="text-xs text-muted-foreground mt-1">{vuln.description}</p>
                              )}
                            </div>
                          ))}
                          {scan.vulnerabilities.length > 3 && (
                            <div className="text-center text-xs text-muted-foreground mt-1">
                              + {scan.vulnerabilities.length - 3} more vulnerabilities
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
                      >
                        View Complete Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="flex justify-center">
              <FileText className="h-16 w-16 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-medium">No scan results found</h3>
            <p className="text-muted-foreground">
              Run a scan using the terminal and save it to see results here.
            </p>
            <Button 
              variant="outline" 
              className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
              onClick={() => navigate('/')}
            >
              Go to Terminal
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ScanResults;
