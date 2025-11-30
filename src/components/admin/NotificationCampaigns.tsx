import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { 
  Bell, 
  Send, 
  Users, 
  Calendar, 
  Plus, 
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Target
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

interface Campaign {
  id: string;
  name: string;
  description: string | null;
  message_title: string;
  message_body: string;
  target_segments: string[];
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  recipients_count: number;
  sent_count: number;
  created_at: string;
}

const ENGAGEMENT_SEGMENTS = [
  { id: 'champion', label: 'Champions', description: 'Most active users (score 80+)', color: 'bg-yellow-500' },
  { id: 'active', label: 'Active', description: 'Regularly engaged (score 60-79)', color: 'bg-green-500' },
  { id: 'engaged', label: 'Engaged', description: 'Moderately active (score 40-59)', color: 'bg-blue-500' },
  { id: 'casual', label: 'Casual', description: 'Light users (score <40)', color: 'bg-gray-500' },
  { id: 'at-risk', label: 'At-Risk', description: 'No activity 7-14 days', color: 'bg-orange-500' },
  { id: 'inactive', label: 'Inactive', description: 'No activity 14+ days', color: 'bg-red-500' },
];

export function NotificationCampaigns() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [targetSegments, setTargetSegments] = useState<string[]>([]);
  const [scheduleType, setScheduleType] = useState<'now' | 'scheduled'>('now');
  const [scheduledAt, setScheduledAt] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleSegmentToggle = (segmentId: string) => {
    setTargetSegments(prev => 
      prev.includes(segmentId) 
        ? prev.filter(s => s !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleCreateCampaign = async () => {
    if (!name || !messageTitle || !messageBody || targetSegments.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('notification_campaigns')
        .insert({
          name,
          description,
          message_title: messageTitle,
          message_body: messageBody,
          target_segments: targetSegments,
          status: scheduleType === 'scheduled' ? 'scheduled' : 'draft',
          scheduled_at: scheduleType === 'scheduled' ? scheduledAt : null,
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Campaign created successfully');
      setDialogOpen(false);
      resetForm();
      fetchCampaigns();

      // If sending now, trigger the send
      if (scheduleType === 'now' && data) {
        await sendCampaign(data.id, data.target_segments, data.message_title, data.message_body);
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign');
    }
  };

  const sendCampaign = async (campaignId: string, segments: string[], title: string, body: string) => {
    setSending(campaignId);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke('send-targeted-notification', {
        body: {
          campaignId,
          targetSegments: segments,
          title,
          body,
        },
      });

      if (response.error) throw response.error;

      toast.success(`Campaign sent! ${response.data.sent} notifications delivered.`);
      fetchCampaigns();
    } catch (error) {
      console.error('Error sending campaign:', error);
      toast.error('Failed to send campaign');
    } finally {
      setSending(null);
    }
  };

  const deleteCampaign = async (campaignId: string) => {
    try {
      const { error } = await supabase
        .from('notification_campaigns')
        .delete()
        .eq('id', campaignId);

      if (error) throw error;

      toast.success('Campaign deleted');
      fetchCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast.error('Failed to delete campaign');
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setMessageTitle('');
    setMessageBody('');
    setTargetSegments([]);
    setScheduleType('now');
    setScheduledAt('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Sent</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500"><Clock className="w-3 h-3 mr-1" /> Scheduled</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Notification Campaigns</h2>
          <p className="text-muted-foreground">Send targeted push notifications based on user engagement</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Notification Campaign</DialogTitle>
              <DialogDescription>
                Target specific user segments with personalized notifications
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Weekly Engagement Boost"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Internal notes about this campaign..."
                />
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
                  placeholder="e.g., It's been a while! Check out today's devotional..."
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <Label>Target Segments *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {ENGAGEMENT_SEGMENTS.map((segment) => (
                    <div
                      key={segment.id}
                      className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        targetSegments.includes(segment.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      }`}
                      onClick={() => handleSegmentToggle(segment.id)}
                    >
                      <Checkbox
                        checked={targetSegments.includes(segment.id)}
                        onCheckedChange={() => handleSegmentToggle(segment.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${segment.color}`} />
                          <span className="font-medium text-sm">{segment.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{segment.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Send Timing</Label>
                <Select value={scheduleType} onValueChange={(v: 'now' | 'scheduled') => setScheduleType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Send Immediately</SelectItem>
                    <SelectItem value="scheduled">Schedule for Later</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {scheduleType === 'scheduled' && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledAt">Scheduled Date & Time</Label>
                  <Input
                    id="scheduledAt"
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                  />
                </div>
              )}

              <Button onClick={handleCreateCampaign} className="w-full">
                {scheduleType === 'now' ? (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Create & Send Now
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Campaign
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {campaigns.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Campaigns Yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first notification campaign to engage users
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {campaign.name}
                      {getStatusBadge(campaign.status)}
                    </CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {campaign.status === 'draft' && (
                      <Button 
                        size="sm" 
                        onClick={() => sendCampaign(
                          campaign.id, 
                          campaign.target_segments, 
                          campaign.message_title, 
                          campaign.message_body
                        )}
                        disabled={sending === campaign.id}
                      >
                        {sending === campaign.id ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-1" />
                            Send
                          </>
                        )}
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteCampaign(campaign.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Target className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Segments</p>
                    <p className="font-semibold">{campaign.target_segments.length}</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Recipients</p>
                    <p className="font-semibold">{campaign.recipients_count}</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <CheckCircle className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Sent</p>
                    <p className="font-semibold">{campaign.sent_count}</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="font-semibold text-xs">
                      {new Date(campaign.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {campaign.target_segments.map((segment) => {
                      const segmentInfo = ENGAGEMENT_SEGMENTS.find(s => s.id === segment);
                      return (
                        <Badge key={segment} variant="outline" className="text-xs">
                          <div className={`w-2 h-2 rounded-full ${segmentInfo?.color || 'bg-gray-500'} mr-1`} />
                          {segmentInfo?.label || segment}
                        </Badge>
                      );
                    })}
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 mt-2">
                    <p className="font-medium text-sm">{campaign.message_title}</p>
                    <p className="text-sm text-muted-foreground">{campaign.message_body}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
