-- Create table for podcast/panelist guest applications
CREATE TABLE public.podcast_guest_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  greek_organization text NOT NULL,
  chapter_name text,
  topic_expertise text NOT NULL,
  why_guest text NOT NULL,
  previous_speaking text,
  linkedin_url text,
  application_type text NOT NULL DEFAULT 'panelist', -- panelist, podcast_guest
  status text NOT NULL DEFAULT 'pending', -- pending, reviewed, accepted, declined
  admin_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create table for media inquiries
CREATE TABLE public.media_inquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  inquiry_type text NOT NULL, -- speaking, press, partnership, podcast, other
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new', -- new, in_progress, responded, closed
  admin_notes text,
  user_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.podcast_guest_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_inquiries ENABLE ROW LEVEL SECURITY;

-- Policies for podcast_guest_applications (public form submissions)
CREATE POLICY "Anyone can submit podcast guest applications"
  ON public.podcast_guest_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all podcast guest applications"
  ON public.podcast_guest_applications FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update podcast guest applications"
  ON public.podcast_guest_applications FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Policies for media_inquiries
CREATE POLICY "Anyone can submit media inquiries"
  ON public.media_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all media inquiries"
  ON public.media_inquiries FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update media inquiries"
  ON public.media_inquiries FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view their own media inquiries"
  ON public.media_inquiries FOR SELECT
  USING (auth.uid() = user_id);

-- Create updated_at triggers
CREATE TRIGGER update_podcast_guest_applications_updated_at
  BEFORE UPDATE ON public.podcast_guest_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_media_inquiries_updated_at
  BEFORE UPDATE ON public.media_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();