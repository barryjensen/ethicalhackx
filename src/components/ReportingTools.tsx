
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PieChart, FileBarChart, CheckCircle, AlertTriangle } from 'lucide-react';

interface ReportingToolsProps {
  onRunTool: (command: string) => void;
}

const ReportingTools: React.FC<ReportingToolsProps> = ({ onRunTool }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-hacker-green">Security Report Generation</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card text-card-foreground border-hacker-green/30">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-hacker-green flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              Available Report Types
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileBarChart className="h-4 w-4 text-blue-400" />
                  <span>Executive Summary</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
                  onClick={() => onRunTool("report 1")}
                >
                  Generate
                </Button>
              </li>
              
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <span>Technical Detail Report</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
                  onClick={() => onRunTool("report 2")}
                >
                  Generate
                </Button>
              </li>
              
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Remediation Plan</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
                  onClick={() => onRunTool("report 3")}
                >
                  Generate
                </Button>
              </li>
              
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-purple-400" />
                  <span>Compliance Status</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
                  onClick={() => onRunTool("report 4")}
                >
                  Generate
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-card text-card-foreground border-hacker-green/30">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-hacker-green flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5" />
              Recent Findings Overview
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Critical Vulnerabilities</span>
                <span className="text-red-500 font-semibold">2</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>High Vulnerabilities</span>
                <span className="text-orange-500 font-semibold">5</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Medium Vulnerabilities</span>
                <span className="text-yellow-500 font-semibold">8</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Low Vulnerabilities</span>
                <span className="text-green-500 font-semibold">12</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4 border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
                onClick={() => onRunTool("report")}
              >
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportingTools;
