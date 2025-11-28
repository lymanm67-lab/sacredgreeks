-- Create table for saved response coach results
CREATE TABLE public.saved_response_coach_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  scenario TEXT NOT NULL,
  context TEXT,
  original_response TEXT NOT NULL,
  feedback_json JSONB NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.saved_response_coach_results ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own saved results" 
ON public.saved_response_coach_results 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved results" 
ON public.saved_response_coach_results 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved results" 
ON public.saved_response_coach_results 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved results" 
ON public.saved_response_coach_results 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_saved_response_coach_results_updated_at
BEFORE UPDATE ON public.saved_response_coach_results
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();