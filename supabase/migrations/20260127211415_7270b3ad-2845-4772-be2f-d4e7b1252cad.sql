-- Create speaking_requests table
CREATE TABLE public.speaking_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_name TEXT NOT NULL,
  organizer_email TEXT NOT NULL,
  organizer_phone TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_location TEXT NOT NULL,
  expected_attendees TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  topic_requested TEXT NOT NULL,
  additional_details TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.speaking_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit speaking requests"
ON public.speaking_requests
FOR INSERT
WITH CHECK (true);

-- Only admins can view speaking requests
CREATE POLICY "Admins can view all speaking requests"
ON public.speaking_requests
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update speaking requests
CREATE POLICY "Admins can update speaking requests"
ON public.speaking_requests
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_speaking_requests_updated_at
BEFORE UPDATE ON public.speaking_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();