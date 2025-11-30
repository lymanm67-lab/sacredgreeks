import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
  Plus,
  Trash2,
  GripVertical,
  Save,
  Download,
  Eye,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { 
  OnboardingTemplate, 
  TourStep,
  OnboardingTemplateType,
  ONBOARDING_TEMPLATES 
} from '@/data/demoOnboardingTemplates';
import { DemoScenario } from '@/contexts/DemoModeContext';
import { toast } from '@/hooks/use-toast';

interface DemoTemplateEditorProps {
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

const POSITION_OPTIONS = ['center', 'top', 'bottom', 'left', 'right'] as const;

const SCENARIO_OPTIONS: { value: DemoScenario; label: string }[] = [
  { value: 'new-user', label: 'New User' },
  { value: 'power-user', label: 'Power User' },
  { value: 'greek-leader', label: 'Greek Leader' },
  { value: 'custom', label: 'Custom' },
];

export function DemoTemplateEditor({ 
  initialTemplate, 
  onClose, 
  onSave,
  onPreview 
}: DemoTemplateEditorProps) {
  const baseTemplate = initialTemplate || ONBOARDING_TEMPLATES.find(t => t.id === 'custom')!;
  
  const [template, setTemplate] = useState<OnboardingTemplate>({
    ...baseTemplate,
    id: initialTemplate?.id || ('custom-' + Date.now()) as OnboardingTemplateType,
    tourSteps: [...baseTemplate.tourSteps],
  });

  const updateTemplate = (updates: Partial<OnboardingTemplate>) => {
    setTemplate(prev => ({ ...prev, ...updates }));
  };

  const updateStep = (index: number, updates: Partial<TourStep>) => {
    setTemplate(prev => ({
      ...prev,
      tourSteps: prev.tourSteps.map((step, i) => 
        i === index ? { ...step, ...updates } : step
      ),
    }));
  };

  const addStep = () => {
    const newStep: TourStep = {
      id: `step-${Date.now()}`,
      title: 'New Step',
      description: 'Describe what users will see here.',
      route: '/dashboard',
      position: 'center',
    };
    setTemplate(prev => ({
      ...prev,
      tourSteps: [...prev.tourSteps, newStep],
    }));
  };

  const removeStep = (index: number) => {
    if (template.tourSteps.length <= 1) {
      toast({
        title: 'Cannot Remove',
        description: 'Template must have at least one step.',
        variant: 'destructive',
      });
      return;
    }
    setTemplate(prev => ({
      ...prev,
      tourSteps: prev.tourSteps.filter((_, i) => i !== index),
    }));
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= template.tourSteps.length) return;
    
    setTemplate(prev => {
      const steps = [...prev.tourSteps];
      [steps[index], steps[newIndex]] = [steps[newIndex], steps[index]];
      return { ...prev, tourSteps: steps };
    });
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

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Template Editor</h2>
            <p className="text-muted-foreground">
              Create or customize your onboarding template
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Template Settings */}
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
            </CardContent>
          </Card>

          {/* Tour Steps Editor */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-lg">Tour Steps</CardTitle>
              <Button size="sm" onClick={addStep} className="gap-1">
                <Plus className="h-4 w-4" />
                Add Step
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {template.tourSteps.map((step, index) => (
                    <Card key={step.id} className="p-3">
                      <div className="flex items-start gap-2">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => moveStep(index, 'up')}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => moveStep(index, 'down')}
                            disabled={index === template.tourSteps.length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Step {index + 1}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-auto text-destructive hover:text-destructive"
                              onClick={() => removeStep(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <Input
                            value={step.title}
                            onChange={(e) => updateStep(index, { title: e.target.value })}
                            placeholder="Step title"
                            className="text-sm"
                          />

                          <Textarea
                            value={step.description}
                            onChange={(e) => updateStep(index, { description: e.target.value })}
                            placeholder="Step description"
                            rows={2}
                            className="text-sm"
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label className="text-xs">Route</Label>
                              <Select
                                value={step.route}
                                onValueChange={(value) => updateStep(index, { route: value })}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {AVAILABLE_ROUTES.map(route => (
                                    <SelectItem key={route} value={route}>
                                      {route}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">Position</Label>
                              <Select
                                value={step.position}
                                onValueChange={(value: TourStep['position']) => 
                                  updateStep(index, { position: value })
                                }
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {POSITION_OPTIONS.map(pos => (
                                    <SelectItem key={pos} value={pos}>
                                      {pos.charAt(0).toUpperCase() + pos.slice(1)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
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
