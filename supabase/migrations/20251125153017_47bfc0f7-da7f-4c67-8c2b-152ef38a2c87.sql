-- Create table for saved Bible searches
CREATE TABLE IF NOT EXISTS public.saved_bible_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  search_query TEXT NOT NULL,
  search_type TEXT NOT NULL DEFAULT 'ai',
  results_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.saved_bible_searches ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own saved searches" 
ON public.saved_bible_searches 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved searches" 
ON public.saved_bible_searches 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved searches" 
ON public.saved_bible_searches 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved searches" 
ON public.saved_bible_searches 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_saved_bible_searches_updated_at
BEFORE UPDATE ON public.saved_bible_searches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_saved_bible_searches_user_id ON public.saved_bible_searches(user_id);
CREATE INDEX idx_saved_bible_searches_created_at ON public.saved_bible_searches(created_at DESC);