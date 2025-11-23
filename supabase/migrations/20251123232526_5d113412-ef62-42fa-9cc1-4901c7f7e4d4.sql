-- Create assessment_submissions table
CREATE TABLE public.assessment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  track TEXT NOT NULL CHECK (track IN ('compliance', 'sacred_greeks')),
  scenario TEXT NOT NULL,
  answers_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  scores_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  result_type TEXT NOT NULL,
  email TEXT,
  consent_to_contact BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.assessment_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for admin page)
CREATE POLICY "Public can view all submissions"
ON public.assessment_submissions
FOR SELECT
USING (true);

-- Create policy for public insert access (no auth required for V1)
CREATE POLICY "Public can insert submissions"
ON public.assessment_submissions
FOR INSERT
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_assessment_submissions_updated_at
BEFORE UPDATE ON public.assessment_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries by track and created_at
CREATE INDEX idx_assessment_submissions_track_created 
ON public.assessment_submissions(track, created_at DESC);

-- Create index for email lookups
CREATE INDEX idx_assessment_submissions_email 
ON public.assessment_submissions(email) 
WHERE email IS NOT NULL;