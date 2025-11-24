import { Settings, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useDashboardSettings, type DashboardSettings } from '@/hooks/use-dashboard-settings';
import { toast } from 'sonner';

export const DashboardSettingsDialog = () => {
  const { settings, updateSettings, resetSettings } = useDashboardSettings();

  const sections: Array<{ key: keyof DashboardSettings; label: string; description: string }> = [
    { key: 'showHeroSection', label: 'Hero & Welcome Video', description: 'Display welcome message and intro video' },
    { key: 'showGamificationBar', label: 'Gamification Bar', description: 'Show your level and points progress' },
    { key: 'showStatsCards', label: 'Statistics Cards', description: 'Display assessment, prayer, devotional, and streak stats' },
    { key: 'showStudyGuide', label: 'Study Guide Widget', description: 'Quick access to study sessions' },
    { key: 'showRecommendations', label: 'AI Recommendations', description: 'Personalized study suggestions' },
    { key: 'showQuickActions', label: 'Quick Actions', description: 'Fast access to main app features' },
    { key: 'showProgressLink', label: 'Progress Tracker Link', description: 'Link to detailed progress charts' },
    { key: 'showResources', label: 'Essential Resources', description: 'Important links and materials' },
    { key: 'showChapterResources', label: 'Chapter Resources', description: 'Chapter-specific materials' },
    { key: 'showVideos', label: 'Video Section', description: 'Educational and spiritual videos' },
    { key: 'showCommunityService', label: 'Community Service', description: 'Service hours checklist' },
    { key: 'showMeetingNotes', label: 'Meeting Notes', description: 'Chapter meeting notes and action items' },
    { key: 'showRecentAssessments', label: 'Recent Assessments', description: 'Your latest assessment results' },
  ];

  const handleToggle = (key: keyof DashboardSettings, value: boolean) => {
    updateSettings({ [key]: value });
  };

  const handleReset = () => {
    resetSettings();
    toast.success('Dashboard settings reset to default');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hover:bg-sacred/10 hover:text-sacred hover:border-sacred">
          <Settings className="w-4 h-4 mr-2" />
          Customize
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-sacred" />
            Dashboard Settings
          </DialogTitle>
          <DialogDescription>
            Customize which sections appear on your dashboard. Changes are saved automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {sections.map((section) => (
            <div key={section.key}>
              <div className="flex items-center justify-between space-x-4 py-3">
                <div className="flex-1 space-y-1">
                  <Label htmlFor={section.key} className="text-sm font-medium cursor-pointer">
                    {section.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {section.description}
                  </p>
                </div>
                <Switch
                  id={section.key}
                  checked={settings[section.key]}
                  onCheckedChange={(value) => handleToggle(section.key, value)}
                />
              </div>
              <Separator />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleReset}
            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
