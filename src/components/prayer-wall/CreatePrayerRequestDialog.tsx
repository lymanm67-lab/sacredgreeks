import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useGamification } from '@/hooks/use-gamification';
import { useAutoCompleteChallenge } from '@/hooks/use-auto-complete-challenge';

interface CreatePrayerRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreatePrayerRequestDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreatePrayerRequestDialogProps) {
  const { user } = useAuth();
  const { awardPoints } = useGamification();
  const { completeChallenge } = useAutoCompleteChallenge();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requestType, setRequestType] = useState('general');
  const [privacyLevel, setPrivacyLevel] = useState('chapter');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be signed in to share prayer requests');
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter a title for your prayer request');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('prayer_requests')
        .insert({
          user_id: user.id,
          title: title.trim(),
          description: description.trim() || null,
          request_type: requestType,
          privacy_level: privacyLevel,
        });

      if (error) throw error;

      // Award points for sharing
      awardPoints({ points: 10, actionType: 'share_prayer_request' });

      // Auto-complete prayer wall challenge
      await completeChallenge('prayer_wall');

      // Reset form
      setTitle('');
      setDescription('');
      setRequestType('general');
      setPrivacyLevel('chapter');

      onSuccess();
    } catch (error) {
      console.error('Error creating prayer request:', error);
      toast.error('Failed to share prayer request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Prayer Request</DialogTitle>
          <DialogDescription>
            Share your prayer needs with the community. Your brothers and sisters are here to support you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Prayer Request Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Guidance in Career Decision"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Details (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Share more details about your prayer request..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Request Type</Label>
              <Select value={requestType} onValueChange={setRequestType}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="healing">Healing</SelectItem>
                  <SelectItem value="guidance">Guidance</SelectItem>
                  <SelectItem value="thanksgiving">Thanksgiving</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="privacy">Who Can See</Label>
              <Select value={privacyLevel} onValueChange={setPrivacyLevel}>
                <SelectTrigger id="privacy">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chapter">Chapter Only</SelectItem>
                  <SelectItem value="public">Everyone</SelectItem>
                  <SelectItem value="private">Just Me</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Specific requests help others pray more effectively. 
              Consider sharing timeframes or specific needs when comfortable.
            </p>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Sharing...' : 'Share Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}