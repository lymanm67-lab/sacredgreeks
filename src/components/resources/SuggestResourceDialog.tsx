import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb } from 'lucide-react';

const suggestionSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().trim().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  url: z.string().trim().url('Must be a valid URL'),
  resourceType: z.enum(['essential', 'chapter'], { required_error: 'Please select a resource type' }),
  category: z.enum(['Faith', 'Leadership', 'Prayer', 'Service'], { required_error: 'Please select a category' }),
});

interface SuggestResourceDialogProps {
  defaultType?: 'essential' | 'chapter';
}

export const SuggestResourceDialog = ({ defaultType }: SuggestResourceDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    resourceType: defaultType || 'essential',
    category: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to submit a resource suggestion',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = suggestionSchema.parse(formData);

      // Insert suggestion
      const { error } = await supabase
        .from('resource_suggestions')
        .insert({
          user_id: user.id,
          title: validatedData.title,
          description: validatedData.description,
          url: validatedData.url,
          resource_type: validatedData.resourceType,
          category: validatedData.category,
        });

      if (error) throw error;

      toast({
        title: 'Suggestion submitted!',
        description: 'Thank you for your suggestion. An admin will review it soon.',
      });

      // Reset form and close dialog
      setFormData({
        title: '',
        description: '',
        url: '',
        resourceType: defaultType || 'essential',
        category: '',
      });
      setOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error submitting suggestion:', error);
        toast({
          title: 'Error',
          description: 'Failed to submit suggestion. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Lightbulb className="w-4 h-4" />
          Suggest Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Suggest a Resource</DialogTitle>
          <DialogDescription>
            Share a helpful resource with the community. Admins will review your suggestion.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Resource title"
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of what this resource offers"
              rows={3}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
          </div>

          <div>
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://example.com"
              className={errors.url ? 'border-destructive' : ''}
            />
            {errors.url && <p className="text-xs text-destructive mt-1">{errors.url}</p>}
          </div>

          <div>
            <Label htmlFor="resourceType">Resource Type *</Label>
            <Select
              value={formData.resourceType}
              onValueChange={(value: 'essential' | 'chapter') => 
                setFormData({ ...formData, resourceType: value })
              }
            >
              <SelectTrigger className={errors.resourceType ? 'border-destructive' : ''}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="essential">Essential Resources</SelectItem>
                <SelectItem value="chapter">Chapter Resources</SelectItem>
              </SelectContent>
            </Select>
            {errors.resourceType && <p className="text-xs text-destructive mt-1">{errors.resourceType}</p>}
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="Faith">Faith</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
                <SelectItem value="Prayer">Prayer</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Suggestion'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
