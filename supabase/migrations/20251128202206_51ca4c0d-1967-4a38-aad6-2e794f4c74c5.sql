-- Create table for Shattered Masks Assessment results
CREATE TABLE public.shattered_masks_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  archetype TEXT NOT NULL,
  archetype_description TEXT,
  strengths TEXT[],
  growth_areas TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.shattered_masks_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own results"
ON public.shattered_masks_results
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
ON public.shattered_masks_results
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own results"
ON public.shattered_masks_results
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own results"
ON public.shattered_masks_results
FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_shattered_masks_results_updated_at
BEFORE UPDATE ON public.shattered_masks_results
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();