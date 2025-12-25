-- Create table for group coaching waitlist
CREATE TABLE public.coaching_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  goals TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.coaching_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to submit to waitlist
CREATE POLICY "Users can submit to coaching waitlist"
ON public.coaching_waitlist
FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can view their own submissions
CREATE POLICY "Users can view their own waitlist submissions"
ON public.coaching_waitlist
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all waitlist submissions
CREATE POLICY "Admins can manage all waitlist submissions"
ON public.coaching_waitlist
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_coaching_waitlist_updated_at
BEFORE UPDATE ON public.coaching_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();