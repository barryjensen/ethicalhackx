
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  command: string;
  onRun: (command: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  title, 
  description, 
  icon, 
  command,
  onRun
}) => {
  return (
    <Card className="bg-card text-card-foreground hover:shadow-md hover:shadow-hacker-green/10 transition-shadow border-hacker-green/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-hacker-darkgreen rounded-md text-hacker-green">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full border-hacker-green text-hacker-green hover:bg-hacker-green hover:text-black"
          onClick={() => onRun(command)}
        >
          Run Tool
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
