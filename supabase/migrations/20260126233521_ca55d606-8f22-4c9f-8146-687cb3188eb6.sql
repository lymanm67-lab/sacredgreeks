-- Email campaigns table
CREATE TABLE public.email_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  template_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Email subject line variants for A/B testing
CREATE TABLE public.email_subject_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  variant_type TEXT NOT NULL CHECK (variant_type IN ('control', 'urgency_curiosity', 'benefit_social')),
  subject_line TEXT NOT NULL,
  preview_text TEXT,
  weight INTEGER NOT NULL DEFAULT 33,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Individual email sends
CREATE TABLE public.email_sends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  variant_id UUID NOT NULL REFERENCES public.email_subject_variants(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  user_id UUID,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tracking_token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex')
);

-- Email opens tracking
CREATE TABLE public.email_opens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  send_id UUID NOT NULL REFERENCES public.email_sends(id) ON DELETE CASCADE,
  opened_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  ip_address TEXT
);

-- Email link clicks tracking
CREATE TABLE public.email_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  send_id UUID NOT NULL REFERENCES public.email_sends(id) ON DELETE CASCADE,
  link_url TEXT NOT NULL,
  link_label TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  ip_address TEXT
);

-- Enable RLS
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subject_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_opens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_clicks ENABLE ROW LEVEL SECURITY;

-- Admin-only policies for campaigns
CREATE POLICY "Admins can manage email campaigns"
ON public.email_campaigns
FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage email variants"
ON public.email_subject_variants
FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view email sends"
ON public.email_sends
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert email sends"
ON public.email_sends
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view email opens"
ON public.email_opens
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert email opens"
ON public.email_opens
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view email clicks"
ON public.email_clicks
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert email clicks"
ON public.email_clicks
FOR INSERT
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_email_sends_campaign ON public.email_sends(campaign_id);
CREATE INDEX idx_email_sends_variant ON public.email_sends(variant_id);
CREATE INDEX idx_email_sends_tracking_token ON public.email_sends(tracking_token);
CREATE INDEX idx_email_opens_send ON public.email_opens(send_id);
CREATE INDEX idx_email_opens_date ON public.email_opens(opened_at);
CREATE INDEX idx_email_clicks_send ON public.email_clicks(send_id);

-- Trigger for updated_at
CREATE TRIGGER update_email_campaigns_updated_at
BEFORE UPDATE ON public.email_campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();