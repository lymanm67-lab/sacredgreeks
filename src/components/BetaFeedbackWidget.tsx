import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageSquarePlus, Bug, Lightbulb, MessageCircle, Star, Send, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const FEEDBACK_TYPES = [
  { value: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-500' },
  { value: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-yellow-500' },
  { value: 'general', label: 'General Feedback', icon: MessageCircle, color: 'text-blue-500' },
];

export function BetaFeedbackWidget() {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
  });

  // Only show for authenticated users
  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('beta_feedback').insert({
        user_id: user.id,
        feedback_type: formData.type,
        title: formData.title,
        description: formData.description,
        rating: rating || null,
        page_context: location.pathname,
      });

      if (error) throw error;

      // Update feedback count for beta tester (fire and forget)
      const updateFeedbackCount = async () => {
        try {
          const { data } = await supabase
            .from('beta_testers')
            .select('feedback_count')
            .eq('user_id', user.id)
            .single();
          
          if (data) {
            await supabase
              .from('beta_testers')
              .update({ feedback_count: (data.feedback_count || 0) + 1 })
              .eq('user_id', user.id);
          }
        } catch (e) {
          // Silent fail - not critical
        }
      };
      updateFeedbackCount();

      toast.success('Thank you for your feedback!');
      setOpen(false);
      setFormData({ type: '', title: '', description: '' });
      setRating(0);
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedType = FEEDBACK_TYPES.find(t => t.value === formData.type);

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-sacred to-primary hover:scale-105 transition-transform"
        size="icon"
      >
        <MessageSquarePlus className="h-6 w-6" />
      </Button>

      {/* Feedback Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-sacred/10 text-sacred">
                Beta
              </Badge>
              <DialogTitle>Share Your Feedback</DialogTitle>
            </div>
            <DialogDescription>
              Help us improve Sacred Greeks by sharing your thoughts, reporting bugs, or suggesting features.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Feedback Type */}
            <div className="space-y-2">
              <Label>What type of feedback? *</Label>
              <div className="grid grid-cols-3 gap-2">
                {FEEDBACK_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.type === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value })}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        isSelected 
                          ? 'border-sacred bg-sacred/10' 
                          : 'border-border hover:border-sacred/50'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mx-auto mb-1 ${type.color}`} />
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder={
                  formData.type === 'bug' 
                    ? "e.g., Button doesn't work on mobile" 
                    : formData.type === 'feature'
                    ? "e.g., Add dark mode toggle"
                    : "Brief summary of your feedback"
                }
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder={
                  formData.type === 'bug'
                    ? "Steps to reproduce the issue..."
                    : formData.type === 'feature'
                    ? "Describe how this feature would help..."
                    : "Share your thoughts..."
                }
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label>Overall Experience (Optional)</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Page Context */}
            <p className="text-xs text-muted-foreground">
              Feedback submitted from: <code className="bg-muted px-1 rounded">{location.pathname}</code>
            </p>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Submitting...' : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
