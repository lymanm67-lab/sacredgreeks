-- Create table for shared assessment results
CREATE TABLE public.shared_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.assessment_submissions(id) ON DELETE CASCADE,
  share_token TEXT NOT NULL UNIQUE,
  shared_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER NOT NULL DEFAULT 0,
  last_viewed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.shared_results ENABLE ROW LEVEL SECURITY;

-- Users can manage their own shared links
CREATE POLICY "Users can manage their own shared results"
  ON public.shared_results
  FOR ALL
  USING (auth.uid() = shared_by);

-- Anyone can view shared results using the token (we'll verify in app logic)
CREATE POLICY "Anyone can view shared results with valid token"
  ON public.shared_results
  FOR SELECT
  USING (true);

-- Create index for faster token lookups
CREATE INDEX idx_shared_results_token ON public.shared_results(share_token);

-- Create trigger for updated_at
CREATE TRIGGER update_shared_results_updated_at
  BEFORE UPDATE ON public.shared_results
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();