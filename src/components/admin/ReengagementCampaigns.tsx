import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  RefreshCw, 
  Plus, 
  Trash2,
  Play,
  Pause,
  Settings,
  UserMinus,
  Mail,
  Bell
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ReengagementTemplate {
  id: string;
  name: string;
  trigger_type: string;
  days_inactive: number;
  target_segment: string;
  message_title: string;
  message_body: string;
  is_active: boolean;
  last_run_at: string | null;
  created_at: string;
}

const TRIGGER_TYPES = [
  { id: 'inactivity', label: 'Inactivity', description: 'User hasn\'t logged in for X days' },
  { id: 'engagement_drop', label: 'Engagement Drop', description: 'User\'s engagement score decreased' },
  { id: 'milestone_reminder', label: 'Milestone Reminder', description: 'User close to achievement' },
];

const TARGET_SEGMENTS = [
  { id: 'at-risk', label: 'At-Risk Users', color: 'bg-orange-500' },
  { id: 'inactive', label: 'Inactive Users', color: 'bg-red-500' },
  { id: 'casual', label: 'Casual Users', color: 'bg-gray-500' },
];

const PRESET_TEMPLATES = [
  {
    name: 'Week 1 Check-in',
    trigger_type: 'inactivity',
    days_inactive: 7,
    target_segment: 'at-risk',
    message_title: 'We miss you! 🙏',
    message_body: 'It\'s been a week since your last visit. Your daily devotional is waiting for you.',
  },
  {
    name: 'Two Week Wake-up',
    trigger_type: 'inactivity',
    days_inactive: 14,
    target_segment: 'inactive',
    message_title: 'Your faith journey awaits',
    message_body: 'Don\'t let your spiritual growth pause. Come back and continue where you left off.',
  },
  {
    name: 'Monthly Reconnect',
    trigger_type: 'inactivity',
    days_inactive: 30,
    target_segment: 'inactive',
    message_title: 'A new month, a fresh start',
    message_body: 'It\'s never too late to reconnect with your faith community. We\'re here for you.',
  },
];

export function ReengagementCampaigns() {
  const [templates, setTemplates] = useState<ReengagementTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [running, setRunning] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [triggerType, setTriggerType] = useState('inactivity');
  const [daysInactive, setDaysInactive] = useState(7);
  const [targetSegment, setTargetSegment] = useState('at-risk');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('reengagement_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to load re-engagement templates');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!name || !messageTitle || !messageBody) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('reengagement_templates')
        .insert({
          name,
          trigger_type: triggerType,
          days_inactive: daysInactive,
          target_segment: targetSegment,
          message_title: messageTitle,
          message_body: messageBody,
          is_active: true,
        });

      if (error) throw error;

      toast.success('Re-engagement template created');
      setDialogOpen(false);
      resetForm();
      fetchTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
      toast.error('Failed to create template');
    }
  };

  const toggleTemplateActive = async (templateId: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from('reengagement_templates')
        .update({ is_active: !currentState })
        .eq('id', templateId);

      if (error) throw error;

      toast.success(`Template ${!currentState ? 'activated' : 'paused'}`);
      fetchTemplates();
    } catch (error) {
      console.error('Error toggling template:', error);
      toast.error('Failed to update template');
    }
  };

  const runTemplate = async (template: ReengagementTemplate) => {
    setRunning(template.id);
    try {
      const response = await supabase.functions.invoke('send-targeted-notification', {
        body: {
          targetSegments: [template.target_segment],
          title: template.message_title,
          body: template.message_body,
          daysInactive: template.days_inactive,
        },
      });

      if (response.error) throw response.error;

      // Update last_run_at
      await supabase
        .from('reengagement_templates')
        .update({ last_run_at: new Date().toISOString() })
        .eq('id', template.id);

      toast.success(`Campaign sent! ${response.data.sent} notifications delivered.`);
      fetchTemplates();
    } catch (error) {
      console.error('Error running template:', error);
      toast.error('Failed to run campaign');
    } finally {
      setRunning(null);
    }
  };

  const deleteTemplate = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('reengagement_templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      toast.success('Template deleted');
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    }
  };

  const applyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    setName(preset.name);
    setTriggerType(preset.trigger_type);
    setDaysInactive(preset.days_inactive);
    setTargetSegment(preset.target_segment);
    setMessageTitle(preset.message_title);
    setMessageBody(preset.message_body);
  };

  const resetForm = () => {
    setName('');
    setTriggerType('inactivity');
    setDaysInactive(7);
    setTargetSegment('at-risk');
    setMessageTitle('');
    setMessageBody('');
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading templates...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Re-engagement Campaigns</h2>
          <p className="text-muted-foreground">Automated campaigns to bring back inactive users</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Re-engagement Template</DialogTitle>
              <DialogDescription>
                Set up automated campaigns to re-engage users
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {/* Preset Templates */}
              <div className="space-y-2">
                <Label>Quick Start Templates</Label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_TEMPLATES.map((preset, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => applyPreset(preset)}
                      className="text-xs h-auto py-2"
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Template Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Week 1 Check-in"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Trigger Type</Label>
                  <Select value={triggerType} onValueChange={setTriggerType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TRIGGER_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="daysInactive">Days Inactive</Label>
                  <Input
                    id="daysInactive"
                    type="number"
                    min={1}
                    max={365}
                    value={daysInactive}
                    onChange={(e) => setDaysInactive(parseInt(e.target.value) || 7)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Target Segment</Label>
                <Select value={targetSegment} onValueChange={setTargetSegment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TARGET_SEGMENTS.map((segment) => (
                      <SelectItem key={segment.id} value={segment.id}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${segment.color}`} />
                          {segment.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="messageTitle">Notification Title *</Label>
                <Input
                  id="messageTitle"
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  placeholder="e.g., We miss you! 🙏"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="messageBody">Notification Message *</Label>
                <Textarea
                  id="messageBody"
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="e.g., It's been a while! Your daily devotional awaits..."
                  rows={3}
                />
              </div>

              <Button onClick={handleCreateTemplate} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {templates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Re-engagement Templates</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create templates to automatically reach out to inactive users
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {templates.map((template) => {
            const segmentInfo = TARGET_SEGMENTS.find(s => s.id === template.target_segment);
            const triggerInfo = TRIGGER_TYPES.find(t => t.id === template.trigger_type);
            
            return (
              <Card key={template.id} className={!template.is_active ? 'opacity-60' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${template.is_active ? 'bg-green-500/10' : 'bg-muted'}`}>
                        {template.is_active ? (
                          <Play className="w-5 h-5 text-green-500" />
                        ) : (
                          <Pause className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <div className={`w-2 h-2 rounded-full ${segmentInfo?.color || 'bg-gray-500'} mr-1`} />
                            {segmentInfo?.label}
                          </Badge>
                          <span className="text-xs">•</span>
                          <span className="text-xs">{template.days_inactive} days inactive</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={template.is_active}
                        onCheckedChange={() => toggleTemplateActive(template.id, template.is_active)}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => runTemplate(template)}
                        disabled={running === template.id}
                      >
                        {running === template.id ? 'Running...' : 'Run Now'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteTemplate(template.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      <p className="font-medium text-sm">{template.message_title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">{template.message_body}</p>
                  </div>
                  {template.last_run_at && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Last run: {new Date(template.last_run_at).toLocaleString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
