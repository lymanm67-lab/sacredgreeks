import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Upload, 
  Download, 
  Play, 
  Check,
  FileJson,
  AlertCircle
} from 'lucide-react';
import { 
  ONBOARDING_TEMPLATES, 
  OnboardingTemplate, 
  OnboardingTemplateType,
  validateImportedConfig 
} from '@/data/demoOnboardingTemplates';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { toast } from '@/hooks/use-toast';

interface DemoTemplateSelectorProps {
  onClose: () => void;
  onSelectTemplate: (template: OnboardingTemplate) => void;
}

export function DemoTemplateSelector({ onClose, onSelectTemplate }: DemoTemplateSelectorProps) {
  const { setScenario, setDemoMode } = useDemoMode();
  const [selectedTemplate, setSelectedTemplate] = useState<OnboardingTemplateType | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectTemplate = (template: OnboardingTemplate) => {
    setSelectedTemplate(template.id);
  };

  const handleStartTemplate = () => {
    const template = ONBOARDING_TEMPLATES.find(t => t.id === selectedTemplate);
    if (template) {
      setScenario(template.scenario);
      setDemoMode(true);
      onSelectTemplate(template);
      onClose();
      toast({
        title: `${template.name} Started`,
        description: `Following the ${template.name.toLowerCase()} walkthrough.`,
      });
    }
  };

  const handleExportTemplate = () => {
    const template = ONBOARDING_TEMPLATES.find(t => t.id === selectedTemplate);
    if (template) {
      const dataStr = JSON.stringify(template, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `demo-template-${template.id}.json`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      toast({
        title: 'Template Exported',
        description: `${template.name} has been downloaded.`,
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        
        if (validateImportedConfig(parsed)) {
          setImportError(null);
          onSelectTemplate(parsed);
          onClose();
          toast({
            title: 'Template Imported',
            description: `${parsed.name} has been loaded.`,
          });
        } else {
          setImportError('Invalid template format. Please check the file structure.');
        }
      } catch (err) {
        setImportError('Failed to parse JSON file. Please check the format.');
      }
    };
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Demo Templates</h2>
            <p className="text-muted-foreground">
              Choose an onboarding template for your demo experience
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Import/Export Actions */}
        <div className="flex gap-2 mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileImport}
          />
          <Button variant="outline" size="sm" onClick={handleImportClick} className="gap-2">
            <Upload className="h-4 w-4" />
            Import Template
          </Button>
          {selectedTemplate && (
            <Button variant="outline" size="sm" onClick={handleExportTemplate} className="gap-2">
              <Download className="h-4 w-4" />
              Export Selected
            </Button>
          )}
        </div>

        {importError && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="text-sm text-destructive">{importError}</span>
          </div>
        )}

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {ONBOARDING_TEMPLATES.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-primary border-primary' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => handleSelectTemplate(template)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{template.icon}</span>
                  {selectedTemplate === template.id && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {template.description}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="secondary">{template.tourSteps.length} steps</Badge>
                  <Badge variant="outline">{template.scenario}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Template Preview */}
        {selectedTemplate && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Tour Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-3">
                  {ONBOARDING_TEMPLATES.find(t => t.id === selectedTemplate)?.tourSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{step.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{step.description}</p>
                        <Badge variant="outline" className="mt-1 text-[10px]">
                          {step.route}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleStartTemplate}
            disabled={!selectedTemplate}
            className="gap-2"
          >
            <Play className="h-4 w-4" />
            Start Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
