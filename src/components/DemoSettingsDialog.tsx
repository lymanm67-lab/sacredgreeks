import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Settings,
  Play,
  Map,
  GitCompare,
  BarChart3,
  ClipboardList,
  Download,
  RefreshCw,
  ToggleLeft,
} from 'lucide-react';
import { useDemoMode, DemoFeatures } from '@/contexts/DemoModeContext';
import { useToast } from '@/hooks/use-toast';

const featureLabels: Record<keyof DemoFeatures, string> = {
  dashboard: 'Dashboard',
  prayerWall: 'Prayer Wall',
  forum: 'Forum',
  bibleStudy: 'Bible Study',
  serviceTracker: 'Service Tracker',
  journey: 'Journey',
  achievements: 'Achievements',
  progress: 'Progress',
  devotional: 'Devotional',
  prayerJournal: 'Prayer Journal',
};

interface DemoSettingsDialogProps {
  trigger?: React.ReactNode;
}

export function DemoSettingsDialog({ trigger }: DemoSettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const {
    demoFeatures,
    setDemoFeature,
    enableAllFeatures,
    disableAllFeatures,
    setHasSeenTour,
    demoSettings,
    setDemoSetting,
    refreshDemoData,
  } = useDemoMode();
  const { toast } = useToast();

  const handleStartTour = () => {
    setHasSeenTour(false);
    setOpen(false);
    toast({
      title: 'Demo Tour Started',
      description: 'Follow the guided tour to explore features.',
    });
  };

  const handleExportData = () => {
    const exportData = {
      features: demoFeatures,
      settings: demoSettings,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sacred-greeks-demo-data.json';
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Demo Data Exported',
      description: 'Your demo configuration has been downloaded.',
    });
  };

  const handleRefreshData = () => {
    refreshDemoData();
    toast({
      title: 'Demo Data Refreshed',
      description: 'All demo data has been regenerated.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-sacred" />
            Demo Settings
          </DialogTitle>
          <DialogDescription>
            Configure your demo experience and explore features.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 py-4">
            {/* Tour Actions */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">Tours & Guides</Label>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={handleStartTour}
                >
                  <Play className="h-4 w-4 mr-2 text-green-500" />
                  Start Interactive Tour
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={handleStartTour}
                >
                  <Map className="h-4 w-4 mr-2 text-blue-500" />
                  Start Demo Tour
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    setOpen(false);
                    toast({
                      title: 'Demo Started',
                      description: 'Explore the app with sample data.',
                    });
                  }}
                >
                  <Play className="h-4 w-4 mr-2 text-sacred" />
                  Start Demo
                </Button>
              </div>
            </div>

            <Separator />

            {/* Advanced Options */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">Advanced Options</Label>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    setDemoSetting('compareScenarios', !demoSettings.compareScenarios);
                    toast({
                      title: demoSettings.compareScenarios ? 'Compare Mode Disabled' : 'Compare Mode Enabled',
                      description: 'Toggle side-by-side scenario comparison.',
                    });
                  }}
                >
                  <GitCompare className="h-4 w-4 mr-2 text-purple-500" />
                  Compare Scenarios
                  {demoSettings.compareScenarios && (
                    <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Active</span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    setDemoSetting('analyticsEnabled', !demoSettings.analyticsEnabled);
                  }}
                >
                  <BarChart3 className="h-4 w-4 mr-2 text-emerald-500" />
                  Demo Analytics
                  {demoSettings.analyticsEnabled && (
                    <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">On</span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    setDemoSetting('preSurveyMode', !demoSettings.preSurveyMode);
                    toast({
                      title: demoSettings.preSurveyMode ? 'Pre-Survey Mode Disabled' : 'Pre-Survey Mode Enabled',
                      description: 'Show survey prompts before demo actions.',
                    });
                  }}
                >
                  <ClipboardList className="h-4 w-4 mr-2 text-orange-500" />
                  Pre-Survey Mode
                  {demoSettings.preSurveyMode && (
                    <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">On</span>
                  )}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Data Management */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">Data Management</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={handleExportData}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={handleRefreshData}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh All
                </Button>
              </div>
            </div>

            <Separator />

            {/* Data Categories */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ToggleLeft className="h-4 w-4" />
                  Data Categories
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={enableAllFeatures}
                  >
                    All On
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={disableAllFeatures}
                  >
                    All Off
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(demoFeatures) as Array<keyof DemoFeatures>).map((feature) => (
                  <div key={feature} className="flex items-center justify-between">
                    <Label htmlFor={feature} className="text-sm cursor-pointer">
                      {featureLabels[feature]}
                    </Label>
                    <Switch
                      id={feature}
                      checked={demoFeatures[feature]}
                      onCheckedChange={(checked) => setDemoFeature(feature, checked)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
