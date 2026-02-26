
-- Marketing agent run tracking
CREATE TABLE public.marketing_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  run_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'pending',
  topic TEXT,
  blog_draft_id UUID REFERENCES public.content_drafts(id),
  email_sent_count INTEGER DEFAULT 0,
  email_campaign_subject TEXT,
  social_linkedin TEXT,
  social_twitter TEXT,
  social_facebook TEXT,
  error_message TEXT,
  run_metadata JSONB DEFAULT '{}'::jsonb,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: only admins can view
ALTER TABLE public.marketing_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage marketing runs"
  ON public.marketing_runs
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Index for quick lookups
CREATE INDEX idx_marketing_runs_date ON public.marketing_runs(run_date DESC);
CREATE INDEX idx_marketing_runs_status ON public.marketing_runs(status);
