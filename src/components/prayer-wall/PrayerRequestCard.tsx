import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Heart,
  MessageCircle,
  CheckCircle2,
  Clock,
  MoreVertical,
  Trash2,
  Edit,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useGamification } from '@/hooks/use-gamification';
import { formatDistanceToNow } from 'date-fns';
import { ListenButton } from '@/components/ListenButton';

interface PrayerRequestCardProps {
  request: any;
  currentUserId: string;
  onUpdate: () => void;
}

export function PrayerRequestCard({ request, currentUserId, onUpdate }: PrayerRequestCardProps) {
  const { awardPoints } = useGamification();
  const [praying, setPraying] = useState(false);
  const [encouragementNote, setEncouragementNote] = useState('');
  const [showEncouragementDialog, setShowEncouragementDialog] = useState(false);
  const [markingAnswered, setMarkingAnswered] = useState(false);
  const [answeredTestimony, setAnsweredTestimony] = useState('');
  const [showAnsweredDialog, setShowAnsweredDialog] = useState(false);

  const hasPrayed = request.prayer_support?.some((s: any) => s.user_id === currentUserId);
  const isOwner = request.user_id === currentUserId;

  const requestTypeColors: Record<string, string> = {
    healing: 'bg-red-500/10 text-red-500 border-red-500/20',
    guidance: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    thanksgiving: 'bg-green-500/10 text-green-500 border-green-500/20',
    urgent: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    general: 'bg-primary/10 text-primary border-primary/20',
  };

  const handlePray = async () => {
    if (hasPrayed) {
      setShowEncouragementDialog(true);
      return;
    }

    setPraying(true);
    try {
      const { error } = await supabase
        .from('prayer_support')
        .insert({
          prayer_request_id: request.id,
          user_id: currentUserId,
          encouragement_note: encouragementNote || null,
        });

      if (error) throw error;

      // Award points for praying
      awardPoints({ points: 5, actionType: 'prayer_support' });

      toast.success('Prayed for this request! +5 points');
      setEncouragementNote('');
      setShowEncouragementDialog(false);
      onUpdate();
    } catch (error: any) {
      console.error('Error adding prayer support:', error);
      if (error.code === '23505') {
        toast.error('You already prayed for this request');
      } else {
        toast.error('Failed to add prayer support');
      }
    } finally {
      setPraying(false);
    }
  };

  const handleMarkAnswered = async () => {
    setMarkingAnswered(true);
    try {
      const { error } = await supabase
        .from('prayer_requests')
        .update({
          answered: true,
          answered_at: new Date().toISOString(),
          answered_testimony: answeredTestimony || null,
        })
        .eq('id', request.id);

      if (error) throw error;

      // Award points for answered prayer
      awardPoints({ points: 20, actionType: 'answered_prayer' });

      toast.success('Marked as answered! +20 points');
      setShowAnsweredDialog(false);
      setAnsweredTestimony('');
      onUpdate();
    } catch (error) {
      console.error('Error marking answered:', error);
      toast.error('Failed to update request');
    } finally {
      setMarkingAnswered(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this prayer request?')) return;

    try {
      const { error } = await supabase
        .from('prayer_requests')
        .delete()
        .eq('id', request.id);

      if (error) throw error;

      toast.success('Prayer request deleted');
      onUpdate();
    } catch (error) {
      console.error('Error deleting request:', error);
      toast.error('Failed to delete request');
    }
  };

  return (
    <>
      <Card className={request.answered ? 'bg-green-500/5 border-green-500/20' : ''}>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={requestTypeColors[request.request_type]}>
                  {request.request_type}
                </Badge>
                {request.answered && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Answered
                  </Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold">{request.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{request.profiles?.full_name || 'Anonymous'}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!request.answered && (
                    <DropdownMenuItem onClick={() => setShowAnsweredDialog(true)}>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark as Answered
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {request.description && (
            <div className="flex items-start gap-2">
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {request.description}
              </p>
              <ListenButton
                text={`${request.title}. ${request.description}`}
                itemId={`prayer-request-${request.id}`}
                title={request.title}
                showLabel={false}
                size="sm"
                variant="ghost"
              />
            </div>
          )}

          {request.answered && request.answered_testimony && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">
                Testimony of Answered Prayer:
              </p>
              <p className="text-sm text-muted-foreground">{request.answered_testimony}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {request.prayer_count} {request.prayer_count === 1 ? 'prayer' : 'prayers'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!isOwner && (
                <Button
                  size="sm"
                  variant={hasPrayed ? 'outline' : 'default'}
                  onClick={() => setShowEncouragementDialog(true)}
                  disabled={praying}
                >
                  <Heart className={`h-4 w-4 mr-2 ${hasPrayed ? 'fill-current' : ''}`} />
                  {hasPrayed ? 'Prayed' : 'Pray'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Encouragement Dialog */}
      <Dialog open={showEncouragementDialog} onOpenChange={setShowEncouragementDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pray for this request</DialogTitle>
            <DialogDescription>
              Take a moment to pray. You can also add an encouraging note (optional).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Add an encouraging note (optional)..."
              value={encouragementNote}
              onChange={(e) => setEncouragementNote(e.target.value)}
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowEncouragementDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handlePray} disabled={praying}>
                {praying ? 'Adding...' : 'I Prayed'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mark Answered Dialog */}
      <Dialog open={showAnsweredDialog} onOpenChange={setShowAnsweredDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark as Answered</DialogTitle>
            <DialogDescription>
              Praise God! Share how this prayer was answered (optional).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Share your testimony of how God answered this prayer..."
              value={answeredTestimony}
              onChange={(e) => setAnsweredTestimony(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAnsweredDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleMarkAnswered} disabled={markingAnswered}>
                {markingAnswered ? 'Updating...' : 'Mark as Answered'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}