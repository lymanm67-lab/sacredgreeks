-- Create video_suggestions table for user-submitted videos
CREATE TABLE public.video_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  video_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  suggested_tags TEXT[] DEFAULT '{}',
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_suggestions ENABLE ROW LEVEL SECURITY;

-- Users can submit video suggestions
CREATE POLICY "Users can submit video suggestions"
ON public.video_suggestions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can view their own suggestions
CREATE POLICY "Users can view their own suggestions"
ON public.video_suggestions
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all suggestions
CREATE POLICY "Admins can view all video suggestions"
ON public.video_suggestions
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update suggestions
CREATE POLICY "Admins can update video suggestions"
ON public.video_suggestions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete suggestions
CREATE POLICY "Admins can delete video suggestions"
ON public.video_suggestions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger
CREATE TRIGGER update_video_suggestions_updated_at
BEFORE UPDATE ON public.video_suggestions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();