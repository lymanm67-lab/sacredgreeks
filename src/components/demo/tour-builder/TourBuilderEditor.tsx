import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  X, 
  Save,
  Download,
  Eye,
  Upload
} from 'lucide-react';
import { 
  OnboardingTemplate, 
  TourStep,
  OnboardingTemplateType,
  ONBOARDING_TEMPLATES,
  validateImportedConfig
} from '@/data/demoOnboardingTemplates';
import { DemoScenario } from '@/contexts/DemoModeContext';
import { DragDropStepList } from './DragDropStepList';
import { VisualRoutePreview } from './VisualRoutePreview';
import { toast } from '@/hooks/use-toast';

interface TourBuilderEditorProps {
  initialTemplate?: OnboardingTemplate | null;
  onClose: () => void;
  onSave: (template: OnboardingTemplate) => void;
  onPreview: (template: OnboardingTemplate) => void;
}

const AVAILABLE_ROUTES = [
  '/',
  '/dashboard',
  '/devotional',
  '/prayer-journal',
  '/prayer-wall',
  '/bible-study',
  '/journey',
  '/achievements',
  '/progress',
  '/service-tracker',
  '/forum',
  '/resources',
];

const SCENARIO_OPTIONS: { value: DemoScenario; label: string }[] = [
  { value: 'new-user', label: 'New User' },
  { value: 'power-user', label: 'Power User' },
  { value: 'greek-leader', label: 'Greek Leader' },
  { value: 'custom', label: 'Custom' },
];

export function TourBuilderEditor({ 
  initialTemplate, 
  onClose, 
  onSave,
  onPreview 
}: TourBuilderEditorProps) {
  const baseTemplate = initialTemplate || ONBOARDING_TEMPLATES.find(t => t.id === 'custom')!;
  
  const [template, setTemplate] = useState<OnboardingTemplate>({
    ...baseTemplate,
    id: initialTemplate?.id || ('custom-' + Date.now()) as OnboardingTemplateType,
    tourSteps: [...baseTemplate.tourSteps],
  });

  const updateTemplate = (updates: Partial<OnboardingTemplate>) => {
    setTemplate(prev => ({ ...prev, ...updates }));
  };

  const handleStepsChange = (steps: TourStep[]) => {
    setTemplate(prev => ({ ...prev, tourSteps: steps }));
  };

  const handleSave = () => {
    if (!template.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Template name is required.',
        variant: 'destructive',
      });
      return;
    }
    onSave(template);
    toast({
      title: 'Template Saved',
      description: `${template.name} has been saved.`,
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(template, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `template-${template.id}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Template Exported',
      description: 'Template has been downloaded.',
    });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        
        if (validateImportedConfig(data)) {
          setTemplate({
            ...data,
            id: ('custom-' + Date.now()) as OnboardingTemplateType,
          });
          toast({
            title: 'Template Imported',
            description: `Loaded "${data.name}" template.`,
          });
        } else {
          toast({
            title: 'Invalid Template',
            description: 'The file does not contain a valid template.',
            variant: 'destructive',
          });
        }
      } catch {
        toast({
          title: 'Import Failed',
          description: 'Could not read the file.',
          variant: 'destructive',
        });
      }
    };
    input.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
      <div className="container max-w-6xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Demo Tour Builder</h2>
            <p className="text-muted-foreground">
              Create and customize your onboarding tour with drag-and-drop
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Template Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Template Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="template-name">Name</Label>
                <Input
                  id="template-name"
                  value={template.name}
                  onChange={(e) => updateTemplate({ name: e.target.value })}
                  placeholder="Template name"
                />
              </div>

              <div>
                <Label htmlFor="template-desc">Description</Label>
                <Textarea
                  id="template-desc"
                  value={template.description}
                  onChange={(e) => updateTemplate({ description: e.target.value })}
                  placeholder="Describe the template purpose"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="template-icon">Icon (emoji)</Label>
                <Input
                  id="template-icon"
                  value={template.icon}
                  onChange={(e) => updateTemplate({ icon: e.target.value })}
                  placeholder="📚"
                  maxLength={4}
                  className="w-20"
                />
              </div>

              <div>
                <Label htmlFor="template-scenario">Scenario</Label>
                <Select
                  value={template.scenario}
                  onValueChange={(value: DemoScenario) => updateTemplate({ scenario: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SCENARIO_OPTIONS.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-banner">Show Banner</Label>
                  <Switch
                    id="show-banner"
                    checked={template.settings.showBanner}
                    onCheckedChange={(checked) => 
                      updateTemplate({ 
                        settings: { ...template.settings, showBanner: checked } 
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-progress">Show Progress</Label>
                  <Switch
                    id="show-progress"
                    checked={template.settings.showProgress}
                    onCheckedChange={(checked) => 
                      updateTemplate({ 
                        settings: { ...template.settings, showProgress: checked } 
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-advance">Auto Advance</Label>
                  <Switch
                    id="auto-advance"
                    checked={template.settings.autoAdvance}
                    onCheckedChange={(checked) => 
                      updateTemplate({ 
                        settings: { ...template.settings, autoAdvance: checked } 
                      })
                    }
                  />
                </div>
              </div>

              {/* Import Button */}
              <Button variant="outline" onClick={handleImport} className="w-full gap-2">
                <Upload className="h-4 w-4" />
                Import Template
              </Button>
            </CardContent>
          </Card>

          {/* Middle Column - Tour Steps */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Tour Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <DragDropStepList
                  steps={template.tourSteps}
                  onStepsChange={handleStepsChange}
                  availableRoutes={AVAILABLE_ROUTES}
                />
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Column - Visual Preview */}
          <div className="space-y-4">
            <VisualRoutePreview steps={template.tourSteps} />
            
            {/* Quick Stats */}
            <Card>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{template.tourSteps.length}</p>
                    <p className="text-xs text-muted-foreground">Total Steps</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {new Set(template.tourSteps.map(s => s.route)).size}
                    </p>
                    <p className="text-xs text-muted-foreground">Unique Routes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" onClick={() => onPreview(template)} className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
