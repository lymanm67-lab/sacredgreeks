-- Create table for Dr. Lyman Q&A submissions
CREATE TABLE public.qa_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'pending',
  answer TEXT,
  answered_at TIMESTAMP WITH TIME ZONE,
  answered_by UUID,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_public BOOLEAN NOT NULL DEFAULT false,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.qa_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can submit questions" 
ON public.qa_submissions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view their own questions" 
ON public.qa_submissions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public answered questions" 
ON public.qa_submissions 
FOR SELECT 
USING (is_public = true AND status = 'answered');

CREATE POLICY "Admins can manage all questions" 
ON public.qa_submissions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create table for 30-day journey progress
CREATE TABLE public.journey_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  reflection_notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, day_number)
);

-- Enable RLS
ALTER TABLE public.journey_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for journey progress
CREATE POLICY "Users can manage their own journey progress" 
ON public.journey_progress 
FOR ALL 
USING (auth.uid() = user_id);

-- Create update timestamp trigger for qa_submissions
CREATE TRIGGER update_qa_submissions_updated_at
BEFORE UPDATE ON public.qa_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create update timestamp trigger for journey_progress
CREATE TRIGGER update_journey_progress_updated_at
BEFORE UPDATE ON public.journey_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();