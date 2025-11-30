import React, { useState } from 'react';
import { CheckCircle, Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FeatureCompleteFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  onSubmit?: (rating: number, feedback: string) => void;
}

export function FeatureCompleteFeedback({
  isOpen,
  onClose,
  featureName,
  onSubmit,
}: FeatureCompleteFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit?.(rating, feedback);
      toast.success('Thank you for your feedback!');
      onClose();
      setRating(0);
      setFeedback('');
    } catch (error) {
      toast.error('Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onClose();
    setRating(0);
    setFeedback('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleSkip}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <DialogTitle className="text-center">
            Great job completing {featureName}!
          </DialogTitle>
          <DialogDescription className="text-center">
            How was your experience? Your feedback helps us improve.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Star rating */}
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sacred rounded"
              >
                <Star
                  className={cn(
                    'w-8 h-8 transition-colors',
                    (hoveredRating || rating) >= star
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  )}
                />
              </button>
            ))}
          </div>

          {/* Rating labels */}
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>Poor</span>
            <span>Excellent</span>
          </div>

          {/* Optional feedback */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Additional feedback (optional)
            </label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What could we improve?"
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSkip} className="flex-1">
            Skip
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="flex-1 gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Hook for triggering feedback after feature completion
export function useFeatureFeedback() {
  const [feedbackState, setFeedbackState] = useState<{
    isOpen: boolean;
    featureName: string;
  }>({
    isOpen: false,
    featureName: '',
  });

  const requestFeedback = (featureName: string) => {
    // Check if user has already given feedback for this feature recently
    const feedbackKey = `feedback_${featureName}`;
    const lastFeedback = localStorage.getItem(feedbackKey);
    const now = Date.now();
    
    // Only show feedback prompt once per week per feature
    if (lastFeedback && now - parseInt(lastFeedback) < 7 * 24 * 60 * 60 * 1000) {
      return;
    }

    setFeedbackState({ isOpen: true, featureName });
  };

  const closeFeedback = () => {
    // Mark as shown even if skipped
    const feedbackKey = `feedback_${feedbackState.featureName}`;
    localStorage.setItem(feedbackKey, Date.now().toString());
    setFeedbackState({ isOpen: false, featureName: '' });
  };

  const handleSubmit = async (rating: number, feedback: string) => {
    // Store feedback locally and mark as submitted
    const feedbackKey = `feedback_${feedbackState.featureName}`;
    localStorage.setItem(feedbackKey, Date.now().toString());
    
    // Could send to analytics or database here
    console.log('Feedback submitted:', {
      feature: feedbackState.featureName,
      rating,
      feedback,
    });
  };

  return {
    ...feedbackState,
    requestFeedback,
    closeFeedback,
    handleSubmit,
  };
}