-- Landing page A/B testing tables
CREATE TABLE public.landing_page_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  variant_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  headline TEXT NOT NULL,
  subheadline TEXT,
  cta_text TEXT NOT NULL DEFAULT 'Start Free Snapshot',
  is_control BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  weight INTEGER NOT NULL DEFAULT 33,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Landing page visits tracking
CREATE TABLE public.landing_page_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  variant_id UUID NOT NULL REFERENCES public.landing_page_variants(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Landing page conversions (CTA clicks, signups)
CREATE TABLE public.landing_page_conversions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visit_id UUID NOT NULL REFERENCES public.landing_page_visits(id) ON DELETE CASCADE,
  variant_id UUID NOT NULL REFERENCES public.landing_page_variants(id) ON DELETE CASCADE,
  conversion_type TEXT NOT NULL CHECK (conversion_type IN ('cta_click', 'signup_started', 'signup_completed', 'demo_started')),
  user_id UUID,
  converted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Lead segments for email automation
CREATE TABLE public.lead_segments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  user_id UUID,
  segment_type TEXT NOT NULL CHECK (segment_type IN ('opened_no_click', 'clicked_no_convert', 'converted', 'inactive')),
  source_campaign_id UUID REFERENCES public.email_campaigns(id),
  last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Email automation workflows
CREATE TABLE public.email_automation_workflows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  trigger_segment TEXT NOT NULL,
  delay_hours INTEGER NOT NULL DEFAULT 24,
  email_template_key TEXT NOT NULL,
  subject_variant_type TEXT NOT NULL DEFAULT 'control',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.landing_page_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_automation_workflows ENABLE ROW LEVEL SECURITY;

-- Admin policies
CREATE POLICY "Admins can manage landing variants"
ON public.landing_page_variants FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read active variants"
ON public.landing_page_variants FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can insert visits"
ON public.landing_page_visits FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view visits"
ON public.landing_page_visits FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert conversions"
ON public.landing_page_conversions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view conversions"
ON public.landing_page_conversions FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage lead segments"
ON public.lead_segments FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage workflows"
ON public.email_automation_workflows FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Indexes
CREATE INDEX idx_landing_visits_variant ON public.landing_page_visits(variant_id);
CREATE INDEX idx_landing_visits_session ON public.landing_page_visits(session_id);
CREATE INDEX idx_landing_conversions_variant ON public.landing_page_conversions(variant_id);
CREATE INDEX idx_lead_segments_type ON public.lead_segments(segment_type);
CREATE INDEX idx_lead_segments_email ON public.lead_segments(email);

-- Insert default A/B test variants
INSERT INTO public.landing_page_variants (variant_key, name, headline, subheadline, cta_text, is_control, weight) VALUES
('control', 'Control', 'Faith + Greek Life, United', 'Daily devotionals, biblical guidance, and practical tools to help you thrive in faith and fraternity', 'Start Free Snapshot', true, 34),
('urgency', 'Urgency/Curiosity', 'Most Greeks Never Find This Balance...', 'Discover the framework that 1,000+ fraternity members use to stay grounded in faith while thriving in Greek life', 'Get Your Free Snapshot Now', false, 33),
('benefit', 'Benefit/Social', 'Join 1,000+ Greeks Living Their Faith', 'The #1 app for Christian fraternity and sorority members. See how your chapter stacks up spiritually.', 'Start Free Snapshot', false, 33);

-- Trigger for updated_at
CREATE TRIGGER update_landing_variants_updated_at
BEFORE UPDATE ON public.landing_page_variants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lead_segments_updated_at
BEFORE UPDATE ON public.lead_segments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at
BEFORE UPDATE ON public.email_automation_workflows
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();