import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Eye, FlaskConical } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoModeContext';

export function DemoModeToggle() {
  const { isDemoMode, toggleDemoMode } = useDemoMode();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-sacred" />
          Demo Mode
        </CardTitle>
        <CardDescription>
          Toggle between viewing sample data and your real data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <div>
              <Label htmlFor="demo-mode" className="text-sm font-medium cursor-pointer">
                Show Demo Data
              </Label>
              <p className="text-xs text-muted-foreground">
                {isDemoMode 
                  ? 'Viewing sample data across the app' 
                  : 'Viewing your actual data'}
              </p>
            </div>
          </div>
          <Switch
            id="demo-mode"
            checked={isDemoMode}
            onCheckedChange={toggleDemoMode}
          />
        </div>
        {isDemoMode && (
          <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-xs text-amber-700 dark:text-amber-400">
              Demo mode is active. Dashboard widgets will display sample content to help you explore app features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
