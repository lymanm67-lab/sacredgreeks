-- Create shared certificates table for social sharing
CREATE TABLE IF NOT EXISTS public.shared_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  share_token TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL,
  certificate_type TEXT NOT NULL,
  assessment_type TEXT NOT NULL,
  scenario TEXT NOT NULL,
  theme TEXT NOT NULL DEFAULT 'classic',
  og_image_url TEXT,
  completion_date TEXT NOT NULL,
  user_name TEXT NOT NULL,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  last_viewed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.shared_certificates ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view shared certificates (public sharing)
CREATE POLICY "Shared certificates are viewable by anyone"
ON public.shared_certificates
FOR SELECT
USING (true);

-- Users can create their own shared certificates
CREATE POLICY "Users can create their own shared certificates"
ON public.shared_certificates
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own shared certificates
CREATE POLICY "Users can update their own shared certificates"
ON public.shared_certificates
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own shared certificates
CREATE POLICY "Users can delete their own shared certificates"
ON public.shared_certificates
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster share token lookups
CREATE INDEX IF NOT EXISTS idx_shared_certificates_share_token 
ON public.shared_certificates(share_token);

-- Create index for user lookups
CREATE INDEX IF NOT EXISTS idx_shared_certificates_user_id 
ON public.shared_certificates(user_id);