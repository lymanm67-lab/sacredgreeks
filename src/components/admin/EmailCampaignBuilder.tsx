import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { emailSubjectTemplates, type SubjectVariant } from "@/lib/email-tracking";
import {
  Plus,
  Mail,
  Eye,
  Send,
  Copy,
  Loader2,
  FileText,
  Sparkles,
  AlertCircle
} from "lucide-react";

interface EmailTemplate {
  key: string;
  name: string;
  variants: SubjectVariant[];
  htmlTemplate: string;
}

// Convert email tracking templates to full templates with HTML
const emailTemplates: EmailTemplate[] = Object.entries(emailSubjectTemplates).map(([key, template]) => ({
  key,
  name: key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  variants: template.variants,
  htmlTemplate: getDefaultHtmlTemplate(key),
}));

function getDefaultHtmlTemplate(templateKey: string): string {
  const templates: Record<string, string> = {
    welcome: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px; }
    .button { display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Sacred Greeks! 🎉</h1>
    </div>
    <div class="content">
      <p>Hey {{first_name}},</p>
      <p>Welcome to a community of Greeks who are serious about their faith journey. You've taken a bold step, and we're honored to have you here.</p>
      <p>Here's what you can do right now:</p>
      <ul>
        <li>📖 Read today's devotional written just for Greeks</li>
        <li>🙏 Join our prayer community</li>
        <li>📚 Start the PROOF Framework course</li>
      </ul>
      <p style="text-align: center;">
        <a href="{{dashboard_url}}" class="button">Go to Your Dashboard</a>
      </p>
      <p>God's got big plans for you in Greek life. Let's discover them together.</p>
      <p>In brotherhood,<br><strong>The Sacred Greeks Team</strong></p>
    </div>
    <div class="footer">
      <p>Sacred Greeks • Faith + Greek Life, United</p>
      {{tracking_pixel}}
    </div>
  </div>
</body>
</html>`,
    devotional_reminder: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; }
    .verse-box { background: #f8f5ff; border-left: 4px solid #8b5cf6; padding: 20px; margin: 20px 0; }
    .content { padding: 30px; }
    .button { display: inline-block; background: #8b5cf6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .streak { background: #fef3c7; border-radius: 8px; padding: 15px; text-align: center; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📖 Your Daily Devotional</h1>
    </div>
    <div class="content">
      <p>Good morning, {{first_name}}! ☀️</p>
      <div class="verse-box">
        <p style="font-style: italic; margin: 0;">"{{verse_text}}"</p>
        <p style="margin: 10px 0 0; font-weight: 600;">— {{verse_ref}}</p>
      </div>
      <div class="streak">
        🔥 Current Streak: <strong>{{streak_days}} days</strong>
      </div>
      <p style="text-align: center;">
        <a href="{{devotional_url}}" class="button">Read Full Devotional</a>
      </p>
    </div>
    <div class="footer">
      <p>Sacred Greeks • Grow in faith, thrive in Greek life</p>
      {{tracking_pixel}}
    </div>
  </div>
</body>
</html>`,
    streak_lost: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; }
    .encourage-box { background: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
    .button { display: inline-block; background: #f59e0b; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>We Missed You Yesterday 💛</h1>
    </div>
    <div class="content">
      <p>Hey {{first_name}},</p>
      <p>Life gets busy — we get it. Chapter meetings, classes, work, and everything in between. Your streak may have reset, but your journey hasn't.</p>
      <div class="encourage-box">
        <p style="font-size: 18px; margin: 0;">Every day is a fresh start.</p>
        <p style="margin: 10px 0 0; color: #78716c;">Your {{previous_streak}}-day streak shows what you're capable of. Let's rebuild it together.</p>
      </div>
      <p style="text-align: center;">
        <a href="{{dashboard_url}}" class="button">Start Fresh Today</a>
      </p>
      <p>Remember: It's not about being perfect. It's about showing up.</p>
    </div>
    <div class="footer">
      <p>Sacred Greeks • We're rooting for you</p>
      {{tracking_pixel}}
    </div>
  </div>
</body>
</html>`,
  };
  
  return templates[templateKey] || templates.welcome;
}

interface Campaign {
  id: string;
  name: string;
  template_key: string;
  status: string;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}

export const EmailCampaignBuilder = () => {
  const queryClient = useQueryClient();
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [campaignName, setCampaignName] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<string>("control");
  const [isCreating, setIsCreating] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["email-campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_campaigns")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Campaign[];
    },
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (data: { name: string; templateKey: string }) => {
      const { data: campaign, error } = await supabase
        .from("email_campaigns")
        .insert({
          name: data.name,
          template_key: data.templateKey,
          status: "draft",
        })
        .select()
        .single();
      
      if (error) throw error;

      // Create subject variants for this campaign
      const template = emailTemplates.find(t => t.key === data.templateKey);
      if (template) {
        const variants = template.variants.map(v => ({
          campaign_id: campaign.id,
          subject_line: v.subject,
          preview_text: v.previewText,
          variant_type: v.type,
          weight: v.type === 'control' ? 34 : 33,
        }));

        const { error: variantError } = await supabase
          .from("email_subject_variants")
          .insert(variants);

        if (variantError) throw variantError;
      }

      return campaign;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-campaigns"] });
      toast.success("Campaign created successfully!");
      setCampaignName("");
      setSelectedTemplate(null);
      setIsCreating(false);
    },
    onError: (error) => {
      toast.error("Failed to create campaign");
      console.error(error);
    },
  });

  const handleCreateCampaign = () => {
    if (!campaignName || !selectedTemplate) {
      toast.error("Please enter a campaign name and select a template");
      return;
    }
    createCampaignMutation.mutate({
      name: campaignName,
      templateKey: selectedTemplate.key,
    });
  };

  const handlePreview = (template: EmailTemplate, variantType: string) => {
    const variant = template.variants.find(v => v.type === variantType);
    // Replace placeholders with sample data
    let html = template.htmlTemplate
      .replace(/{{first_name}}/g, "Marcus")
      .replace(/{{verse_text}}/g, "For I know the plans I have for you...")
      .replace(/{{verse_ref}}/g, "Jeremiah 29:11")
      .replace(/{{streak_days}}/g, "7")
      .replace(/{{previous_streak}}/g, "14")
      .replace(/{{dashboard_url}}/g, "#")
      .replace(/{{devotional_url}}/g, "#")
      .replace(/{{tracking_pixel}}/g, '<img src="#" width="1" height="1" style="display:none" />');
    
    setPreviewHtml(html);
  };

  const copyHtml = (html: string) => {
    navigator.clipboard.writeText(html);
    toast.success("HTML copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Campaign Builder</h2>
          <p className="text-muted-foreground">Create and manage email campaigns with A/B testing</p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Campaign Name</Label>
                <Input
                  placeholder="e.g., January Welcome Series"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
              <div>
                <Label>Email Template</Label>
                <Select 
                  value={selectedTemplate?.key || ""} 
                  onValueChange={(key) => setSelectedTemplate(emailTemplates.find(t => t.key === key) || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.key} value={template.key}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedTemplate && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Subject Line Variants (A/B Test)</h4>
                  <div className="space-y-2">
                    {selectedTemplate.variants.map((variant) => (
                      <div key={variant.type} className="flex items-center gap-2">
                        <Badge variant="outline" className="w-24 justify-center">
                          {variant.type === 'control' ? 'Control' : 
                           variant.type === 'urgency_curiosity' ? 'Urgency' : 'Benefit'}
                        </Badge>
                        <span className="text-sm">{variant.subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <Button 
                onClick={handleCreateCampaign} 
                disabled={createCampaignMutation.isPending}
                className="w-full"
              >
                {createCampaignMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Create Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Email Templates */}
      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="campaigns">
            <Mail className="w-4 h-4 mr-2" />
            Campaigns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emailTemplates.map((template) => (
              <Card key={template.key} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>3 A/B variants available</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {template.variants.map((variant) => (
                      <div 
                        key={variant.type}
                        className="p-2 rounded bg-muted/50 text-xs"
                      >
                        <Badge variant="outline" className="mb-1 text-[10px]">
                          {variant.type === 'control' ? 'Control' : 
                           variant.type === 'urgency_curiosity' ? 'Urgency/Curiosity' : 'Benefit/Social'}
                        </Badge>
                        <p className="font-medium truncate">{variant.subject}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handlePreview(template, 'control')}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>{template.name} - Preview</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <Tabs defaultValue="control">
                            <TabsList className="mb-4">
                              <TabsTrigger value="control" onClick={() => handlePreview(template, 'control')}>
                                Control
                              </TabsTrigger>
                              <TabsTrigger value="urgency_curiosity" onClick={() => handlePreview(template, 'urgency_curiosity')}>
                                Urgency
                              </TabsTrigger>
                              <TabsTrigger value="benefit_social" onClick={() => handlePreview(template, 'benefit_social')}>
                                Benefit
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
                          <div className="border rounded-lg overflow-hidden">
                            <iframe 
                              srcDoc={previewHtml || template.htmlTemplate}
                              className="w-full h-[500px]"
                              title="Email Preview"
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => copyHtml(template.htmlTemplate)}
                            >
                              <Copy className="w-3 h-3 mr-1" />
                              Copy HTML
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setIsCreating(true);
                      }}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Use
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : campaigns?.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No campaigns yet</h3>
                <p className="text-muted-foreground mb-4">Create your first email campaign to get started</p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {campaigns?.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Template: {campaign.template_key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          campaign.status === 'completed' ? 'default' :
                          campaign.status === 'sending' ? 'secondary' : 'outline'
                        }>
                          {campaign.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {campaign.status === 'draft' && (
                          <Button size="sm">
                            <Send className="w-4 h-4 mr-1" />
                            Send
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
