-- Create saved_contacts table for Sacred Connections
CREATE TABLE public.saved_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  organization TEXT,
  title TEXT,
  website TEXT,
  notes TEXT,
  source TEXT DEFAULT 'qr_scan', -- 'qr_scan', 'business_card', 'manual'
  reminder_at TIMESTAMPTZ,
  reminder_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.saved_contacts ENABLE ROW LEVEL SECURITY;

-- Users can only see their own contacts
CREATE POLICY "Users can view their own saved contacts"
ON public.saved_contacts FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own contacts
CREATE POLICY "Users can create their own saved contacts"
ON public.saved_contacts FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own contacts
CREATE POLICY "Users can update their own saved contacts"
ON public.saved_contacts FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own contacts
CREATE POLICY "Users can delete their own saved contacts"
ON public.saved_contacts FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_saved_contacts_updated_at
BEFORE UPDATE ON public.saved_contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();