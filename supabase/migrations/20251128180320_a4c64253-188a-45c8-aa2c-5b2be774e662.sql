-- Create healing_stories table for anonymous testimonial submissions
CREATE TABLE public.healing_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT, -- Optional, can be anonymous
  organization TEXT,
  story_title TEXT NOT NULL,
  story_content TEXT NOT NULL,
  healing_type TEXT NOT NULL DEFAULT 'church_hurt',
  email TEXT, -- Optional for follow-up
  consent_to_publish BOOLEAN NOT NULL DEFAULT false,
  approved BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.healing_stories ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a healing story (anonymous submissions allowed)
CREATE POLICY "Anyone can submit healing stories"
ON public.healing_stories
FOR INSERT
WITH CHECK (true);

-- Only approved stories are publicly viewable
CREATE POLICY "Anyone can view approved stories"
ON public.healing_stories
FOR SELECT
USING (approved = true);

-- Admins can manage all stories
CREATE POLICY "Admins can manage all healing stories"
ON public.healing_stories
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_healing_stories_updated_at
BEFORE UPDATE ON public.healing_stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();