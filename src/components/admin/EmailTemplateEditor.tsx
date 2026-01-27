import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  Eye,
  Code,
  Copy,
  Download,
  Save,
  Palette,
  Type,
  Image,
  Link,
  Mail,
  Smartphone,
  Monitor,
  Sparkles,
  CheckCircle2
} from "lucide-react";

interface EmailSection {
  type: 'header' | 'text' | 'button' | 'image' | 'divider' | 'footer';
  content: string;
  styles?: Record<string, string>;
}

interface EmailTemplate {
  name: string;
  subject: string;
  preheader: string;
  sections: EmailSection[];
  brandColors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

const defaultTemplate: EmailTemplate = {
  name: "Welcome Email",
  subject: "Welcome to Sacred Greeks! 🎉",
  preheader: "Your faith journey in Greek life starts here",
  sections: [
    {
      type: 'header',
      content: 'Welcome to Sacred Greeks!',
      styles: { fontSize: '28px', fontWeight: 'bold' }
    },
    {
      type: 'text',
      content: 'Hey {{first_name}},\n\nWelcome to a community of Greeks who are serious about their faith journey. You\'ve taken a bold step, and we\'re honored to have you here.',
    },
    {
      type: 'text',
      content: 'Here\'s what you can do right now:\n• 📖 Read today\'s devotional\n• 🙏 Join our prayer community\n• 📚 Start the PROOF Framework course',
    },
    {
      type: 'button',
      content: 'Go to Your Dashboard',
      styles: { backgroundColor: '#3b82f6', color: '#ffffff' }
    },
    {
      type: 'footer',
      content: 'Sacred Greeks • Faith + Greek Life, United\n{{unsubscribe_link}}',
    }
  ],
  brandColors: {
    primary: '#3b82f6',
    secondary: '#06b6d4',
    background: '#f5f5f5',
    text: '#1a1a1a'
  }
};

const presetTemplates = [
  { name: "Welcome", icon: "🎉" },
  { name: "Devotional Reminder", icon: "📖" },
  { name: "Streak Lost", icon: "💛" },
  { name: "Weekly Digest", icon: "📊" },
  { name: "Prayer Request", icon: "🙏" },
  { name: "Re-engagement", icon: "👋" },
];

export const EmailTemplateEditor = () => {
  const [template, setTemplate] = useState<EmailTemplate>(defaultTemplate);
  const [activeTab, setActiveTab] = useState<'edit' | 'code' | 'preview'>('edit');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const generateHtml = (): string => {
    const { brandColors, sections, preheader } = template;
    
    let sectionsHtml = sections.map(section => {
      switch (section.type) {
        case 'header':
          return `
            <tr>
              <td style="background: linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%); color: white; padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; font-size: ${section.styles?.fontSize || '28px'}; font-weight: ${section.styles?.fontWeight || 'bold'};">${section.content}</h1>
              </td>
            </tr>`;
        case 'text':
          return `
            <tr>
              <td style="padding: 20px 30px; color: ${brandColors.text};">
                <p style="margin: 0; line-height: 1.6; white-space: pre-line;">${section.content}</p>
              </td>
            </tr>`;
        case 'button':
          return `
            <tr>
              <td style="padding: 20px 30px; text-align: center;">
                <a href="{{button_url}}" style="display: inline-block; background: linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%); color: ${section.styles?.color || 'white'}; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">${section.content}</a>
              </td>
            </tr>`;
        case 'divider':
          return `
            <tr>
              <td style="padding: 10px 30px;">
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0;" />
              </td>
            </tr>`;
        case 'image':
          return `
            <tr>
              <td style="padding: 20px 30px; text-align: center;">
                <img src="{{image_url}}" alt="${section.content}" style="max-width: 100%; border-radius: 8px;" />
              </td>
            </tr>`;
        case 'footer':
          return `
            <tr>
              <td style="padding: 20px 30px; text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; white-space: pre-line;">${section.content}</p>
              </td>
            </tr>`;
        default:
          return '';
      }
    }).join('');

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.subject}</title>
  <!--[if mso]>
  <style type="text/css">
    table { border-collapse: collapse; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: ${brandColors.background};">
  <div style="display: none; max-height: 0; overflow: hidden;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${brandColors.background}; padding: 20px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          ${sectionsHtml}
        </table>
      </td>
    </tr>
  </table>
  {{tracking_pixel}}
</body>
</html>`;
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generateHtml());
    toast.success("HTML copied to clipboard!");
  };

  const handleDownloadHtml = () => {
    const html = generateHtml();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Template downloaded!");
  };

  const updateSection = (index: number, updates: Partial<EmailSection>) => {
    const newSections = [...template.sections];
    newSections[index] = { ...newSections[index], ...updates };
    setTemplate({ ...template, sections: newSections });
  };

  const addSection = (type: EmailSection['type']) => {
    const newSection: EmailSection = {
      type,
      content: type === 'button' ? 'Click Here' : type === 'divider' ? '' : 'New content...',
    };
    setTemplate({ ...template, sections: [...template.sections, newSection] });
  };

  const removeSection = (index: number) => {
    setTemplate({
      ...template,
      sections: template.sections.filter((_, i) => i !== index)
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= template.sections.length) return;
    
    const newSections = [...template.sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setTemplate({ ...template, sections: newSections });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Email Template Editor</h2>
          <p className="text-muted-foreground">Design beautiful email templates with live preview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyHtml}>
            <Copy className="w-4 h-4 mr-2" />
            Copy HTML
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadHtml}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      {/* Preset Templates */}
      <div className="flex gap-2 flex-wrap">
        {presetTemplates.map((preset) => (
          <Badge 
            key={preset.name}
            variant="outline" 
            className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1.5"
          >
            {preset.icon} {preset.name}
          </Badge>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="edit" className="flex-1">
                  <Type className="w-4 h-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="code" className="flex-1">
                  <Code className="w-4 h-4 mr-2" />
                  HTML
                </TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="space-y-4">
                {/* Email Basics */}
                <div className="space-y-3">
                  <div>
                    <Label>Template Name</Label>
                    <Input 
                      value={template.name}
                      onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Subject Line</Label>
                    <Input 
                      value={template.subject}
                      onChange={(e) => setTemplate({ ...template, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Preheader Text</Label>
                    <Input 
                      value={template.preheader}
                      onChange={(e) => setTemplate({ ...template, preheader: e.target.value })}
                      placeholder="Preview text shown in inbox"
                    />
                  </div>
                </div>

                {/* Brand Colors */}
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4" />
                    <span className="font-medium text-sm">Brand Colors</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={template.brandColors.primary}
                        onChange={(e) => setTemplate({
                          ...template,
                          brandColors: { ...template.brandColors, primary: e.target.value }
                        })}
                        className="w-8 h-8 rounded cursor-pointer"
                      />
                      <span className="text-xs text-muted-foreground">Primary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={template.brandColors.secondary}
                        onChange={(e) => setTemplate({
                          ...template,
                          brandColors: { ...template.brandColors, secondary: e.target.value }
                        })}
                        className="w-8 h-8 rounded cursor-pointer"
                      />
                      <span className="text-xs text-muted-foreground">Secondary</span>
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {template.sections.map((section, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs capitalize">
                            {section.type}
                          </Badge>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => moveSection(index, 'up')}
                              disabled={index === 0}
                            >
                              ↑
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => moveSection(index, 'down')}
                              disabled={index === template.sections.length - 1}
                            >
                              ↓
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-destructive"
                              onClick={() => removeSection(index)}
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                        {section.type !== 'divider' && (
                          <Textarea
                            value={section.content}
                            onChange={(e) => updateSection(index, { content: e.target.value })}
                            className="min-h-[60px] text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Add Section Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" onClick={() => addSection('header')}>
                    + Header
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addSection('text')}>
                    + Text
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addSection('button')}>
                    + Button
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addSection('image')}>
                    + Image
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addSection('divider')}>
                    + Divider
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="code">
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-slate-950 text-slate-100 text-xs overflow-auto max-h-[600px]">
                    <code>{generateHtml()}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={handleCopyHtml}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Preview</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant={previewMode === 'desktop' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={previewMode === 'mobile' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              {/* Email client mockup */}
              <div className={`w-full ${previewMode === 'mobile' ? 'max-w-[375px]' : ''} border rounded-lg overflow-hidden bg-white`}>
                {/* Email header mockup */}
                <div className="p-3 border-b bg-slate-50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">Sacred Greeks</div>
                      <div className="text-xs text-muted-foreground truncate">{template.subject}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{template.preheader}</div>
                </div>
                
                {/* Email content */}
                <iframe 
                  srcDoc={generateHtml()
                    .replace(/{{first_name}}/g, 'Marcus')
                    .replace(/{{button_url}}/g, '#')
                    .replace(/{{tracking_pixel}}/g, '')
                    .replace(/{{unsubscribe_link}}/g, 'Unsubscribe')
                  }
                  className="w-full h-[500px]"
                  title="Email Preview"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Variables Reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Available Variables</CardTitle>
          <CardDescription>Use these placeholders in your template - they'll be replaced with real data when sent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              '{{first_name}}',
              '{{email}}',
              '{{dashboard_url}}',
              '{{devotional_url}}',
              '{{streak_days}}',
              '{{verse_text}}',
              '{{verse_ref}}',
              '{{unsubscribe_link}}',
              '{{tracking_pixel}}'
            ].map((variable) => (
              <Badge 
                key={variable}
                variant="secondary"
                className="cursor-pointer hover:bg-primary/20 transition-colors font-mono text-xs"
                onClick={() => {
                  navigator.clipboard.writeText(variable);
                  toast.success(`Copied ${variable}`);
                }}
              >
                {variable}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
