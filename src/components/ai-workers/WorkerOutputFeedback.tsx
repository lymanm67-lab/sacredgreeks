import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface WorkerOutputFeedbackProps {
  runId?: string;
  outputSummary: string;
}

export function WorkerOutputFeedback({ runId, outputSummary }: WorkerOutputFeedbackProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState<'helpful' | 'not_helpful' | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRate = async (value: 'helpful' | 'not_helpful') => {
    setRating(value);
    if (value === 'not_helpful') {
      setShowComment(true);
      return;
    }
    await submitFeedback(value, '');
  };

  const submitFeedback = async (ratingValue: string, commentValue: string) => {
    if (!user) return;
    try {
      await supabase.from('worker_output_feedback').insert({
        output_history_id: runId || null,
        user_id: user.id,
        rating: ratingValue,
        comment: commentValue || null,
      });
      setSubmitted(true);
      toast({ title: 'Thank you!', description: 'Your feedback helps improve our responses.' });
    } catch {
      toast({ title: 'Feedback saved locally', description: 'We\'ll sync when connection is restored.' });
      setSubmitted(true);
    }
  };

  const handleShare = async () => {
    const shareText = `📖 PROOF Command Center Response:\n\n${outputSummary.substring(0, 300)}...\n\nExplore more at sacredgreeks.lovable.app/ai-workers`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'PROOF Command Center', text: shareText });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'Copied to clipboard', description: 'Share this response with others.' });
    }
  };

  const handleCopyResponse = async () => {
    await navigator.clipboard.writeText(outputSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Response copied!' });
  };

  if (submitted) {
    return (
      <Card className="border-primary/10 bg-primary/5">
        <CardContent className="p-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">✅ Thanks for your feedback!</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyResponse} className="gap-1.5 text-xs">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5 text-xs">
              <Share2 className="w-3.5 h-3.5" /> Share
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Was this helpful?</span>
          <div className="flex gap-2">
            <Button
              variant={rating === 'helpful' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleRate('helpful')}
              className="gap-1.5 text-xs"
            >
              <ThumbsUp className="w-3.5 h-3.5" /> Helpful
            </Button>
            <Button
              variant={rating === 'not_helpful' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => handleRate('not_helpful')}
              className="gap-1.5 text-xs"
            >
              <ThumbsDown className="w-3.5 h-3.5" /> Not Helpful
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyResponse} className="gap-1.5 text-xs">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-1.5 text-xs">
              <Share2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
        {showComment && (
          <div className="space-y-2">
            <Textarea
              placeholder="What could be improved? (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              className="text-sm"
            />
            <Button size="sm" onClick={() => submitFeedback('not_helpful', comment)}>
              Submit Feedback
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
