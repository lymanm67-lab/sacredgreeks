-- Create webinar registrations table
CREATE TABLE public.webinar_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  webinar_id TEXT NOT NULL,
  webinar_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  greek_organization TEXT,
  how_heard TEXT,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration)
CREATE POLICY "Anyone can register for webinars" 
ON public.webinar_registrations 
FOR INSERT 
WITH CHECK (true);

-- Users can view their own registrations
CREATE POLICY "Users can view their own registrations" 
ON public.webinar_registrations 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Admins can view all registrations
CREATE POLICY "Admins can view all registrations"
ON public.webinar_registrations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create index for faster lookups
CREATE INDEX idx_webinar_registrations_webinar_id ON public.webinar_registrations(webinar_id);
CREATE INDEX idx_webinar_registrations_email ON public.webinar_registrations(email);

-- Create trigger for updated_at
CREATE TRIGGER update_webinar_registrations_updated_at
BEFORE UPDATE ON public.webinar_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();