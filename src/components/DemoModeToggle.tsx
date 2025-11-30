import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, FlaskConical, RotateCcw, CheckSquare, Square, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { useDemoMode, DemoFeatures } from '@/contexts/DemoModeContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const FEATURE_LABELS: Record<keyof DemoFeatures, string> = {
  dashboard: 'Dashboard',
  prayerWall: 'Prayer Wall',
  forum: 'Forum',
  bibleStudy: 'Bible Study',
  serviceTracker: 'Service Tracker',
  journey: '21-Day Journey',
  achievements: 'Achievements',
  progress: 'Progress',
  devotional: 'Daily Devotional',
  prayerJournal: 'Prayer Journal',
};

export function DemoModeToggle() {
  const { 
    isDemoMode, 
    toggleDemoMode, 
    demoFeatures, 
    setDemoFeature, 
    resetDemoFeatures,
    enableAllFeatures,
    disableAllFeatures,
    setHasSeenTour,
  } = useDemoMode();
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const enabledCount = Object.values(demoFeatures).filter(Boolean).length;
  const totalCount = Object.keys(demoFeatures).length;

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
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <div>
              <Label htmlFor="demo-mode" className="text-sm font-medium cursor-pointer">
                Show Demo Data
              </Label>
              <p className="text-xs text-muted-foreground">
                {isDemoMode 
                  ? `Viewing sample data (${enabledCount}/${totalCount} features)` 
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
          <>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Demo mode is active. Dashboard widgets will display sample content to help you explore app features.
              </p>
            </div>

            <Collapsible open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <span>Customize Demo Features</span>
                  {isCustomizeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={enableAllFeatures}
                    className="flex-1"
                  >
                    <CheckSquare className="h-3 w-3 mr-1" />
                    All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={disableAllFeatures}
                    className="flex-1"
                  >
                    <Square className="h-3 w-3 mr-1" />
                    None
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetDemoFeatures}
                    className="flex-1"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(FEATURE_LABELS) as [keyof DemoFeatures, string][]).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                      <Label htmlFor={`demo-${key}`} className="text-xs cursor-pointer">
                        {label}
                      </Label>
                      <Switch
                        id={`demo-${key}`}
                        checked={demoFeatures[key]}
                        onCheckedChange={(checked) => setDemoFeature(key, checked)}
                        className="scale-75"
                      />
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setHasSeenTour(false)}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              Restart Demo Tour
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
