
-- =============================================
-- AI WORKER SYSTEM: Golden Library + Worker Engine
-- =============================================

-- Tier 1-4: Golden Library Sources (curated content with citations)
CREATE TABLE public.golden_library_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tier INTEGER NOT NULL DEFAULT 1 CHECK (tier BETWEEN 1 AND 4),
  source_type TEXT NOT NULL, -- 'objection_card', 'scripture', 'proof_lesson', 'devotional', 'article', 'conversation_script', 'study_guide', 'external_reference'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  proof_category TEXT, -- 'P', 'R', 'O_oaths', 'O_obscurity', 'F' or NULL
  tags TEXT[] DEFAULT '{}',
  author TEXT,
  source_url TEXT,
  citation_ref TEXT, -- e.g. "PROOF Framework, Chapter 3"
  version INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  metadata_json JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Objection Cards (structured quick answers to common claims)
CREATE TABLE public.objection_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  claim_category TEXT NOT NULL, -- 'portals', 'oaths', 'deity_names', 'secrecy', 'founders_masonry', 'general'
  claim_text TEXT NOT NULL, -- The objection being addressed
  sixty_second_response TEXT NOT NULL,
  five_minute_response TEXT NOT NULL,
  proof_breakdown_json JSONB NOT NULL DEFAULT '{}', -- { P: "...", R: "...", O_oaths: "...", O_obscurity: "...", F: "..." }
  dialogue_questions TEXT[] NOT NULL DEFAULT '{}', -- 3 questions
  boundary_statement TEXT NOT NULL,
  prayer TEXT NOT NULL,
  scripture_refs TEXT[] NOT NULL DEFAULT '{}',
  source_ids UUID[] DEFAULT '{}', -- references to golden_library_sources
  audience_notes_json JSONB DEFAULT '{}', -- { pastor: "...", parent: "...", chapter: "...", friend: "..." }
  is_active BOOLEAN NOT NULL DEFAULT true,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Conversation Scripts (for Worker 03)
CREATE TABLE public.conversation_scripts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  audience_type TEXT NOT NULL, -- 'pastor', 'parent', 'chapter', 'spouse', 'friend'
  scenario TEXT NOT NULL,
  opening_lines TEXT NOT NULL,
  key_points TEXT[] NOT NULL DEFAULT '{}',
  boundary_statements TEXT[] NOT NULL DEFAULT '{}',
  questions_to_ask TEXT[] NOT NULL DEFAULT '{}',
  closing_prayer TEXT,
  source_ids UUID[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Study Plans (for Worker 04)
CREATE TABLE public.ai_study_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_type TEXT NOT NULL, -- '7_day', '30_day'
  title TEXT NOT NULL,
  description TEXT,
  days_json JSONB NOT NULL DEFAULT '[]', -- Array of { day: 1, title: "...", content_source_ids: [...], activities: [...] }
  proof_categories TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User Study Plan Progress (for Worker 04)
CREATE TABLE public.ai_study_plan_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plan_id UUID NOT NULL REFERENCES public.ai_study_plans(id) ON DELETE CASCADE,
  current_day INTEGER NOT NULL DEFAULT 1,
  completed_days INTEGER[] DEFAULT '{}',
  streak_count INTEGER NOT NULL DEFAULT 0,
  last_activity_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, plan_id)
);

-- Worker Runs (execution log)
CREATE TABLE public.worker_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  worker_type TEXT NOT NULL, -- 'ritual_oath_coach', 'founders_guide', 'conversation_coach', 'study_navigator'
  trigger_type TEXT NOT NULL DEFAULT 'user_tap', -- 'user_tap', 'daily_checkin', 'weekly_reset', 'new_content'
  intake_json JSONB NOT NULL DEFAULT '{}', -- { audience: "pastor", claim: "portals", role: "student" }
  output_json JSONB DEFAULT '{}', -- The structured response
  citations_json JSONB DEFAULT '[]', -- Array of citation objects
  confidence_score NUMERIC(3,2), -- 0.00 to 1.00
  escalated BOOLEAN NOT NULL DEFAULT false,
  escalation_reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'escalated', 'failed'
  duration_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Worker Output History (saved for user)
CREATE TABLE public.worker_output_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  worker_run_id UUID REFERENCES public.worker_runs(id) ON DELETE SET NULL,
  worker_type TEXT NOT NULL,
  title TEXT NOT NULL,
  output_json JSONB NOT NULL DEFAULT '{}',
  is_bookmarked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Event Log (append-only, redacted)
CREATE TABLE public.worker_event_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  worker_run_id UUID REFERENCES public.worker_runs(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- 'trigger', 'intake', 'retrieve', 'draft', 'personalize', 'deliver', 'escalate', 'safety'
  event_data_json JSONB DEFAULT '{}', -- Redacted, no sensitive text
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.golden_library_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.objection_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_study_plan_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_output_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_event_log ENABLE ROW LEVEL SECURITY;

-- Golden Library: readable by all authenticated users
CREATE POLICY "Anyone can read active library sources" ON public.golden_library_sources
  FOR SELECT USING (is_active = true);

-- Objection Cards: readable by all
CREATE POLICY "Anyone can read active objection cards" ON public.objection_cards
  FOR SELECT USING (is_active = true);

-- Conversation Scripts: readable by all
CREATE POLICY "Anyone can read active scripts" ON public.conversation_scripts
  FOR SELECT USING (is_active = true);

-- Study Plans: readable by all
CREATE POLICY "Anyone can read active study plans" ON public.ai_study_plans
  FOR SELECT USING (is_active = true);

-- Study Plan Progress: user owns their progress
CREATE POLICY "Users can read own progress" ON public.ai_study_plan_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.ai_study_plan_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.ai_study_plan_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Worker Runs: user can see own runs
CREATE POLICY "Users can read own runs" ON public.worker_runs
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own runs" ON public.worker_runs
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own runs" ON public.worker_runs
  FOR UPDATE USING (auth.uid() = user_id);

-- Worker Output History: user owns their history
CREATE POLICY "Users can read own output history" ON public.worker_output_history
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own output history" ON public.worker_output_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own output history" ON public.worker_output_history
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own output history" ON public.worker_output_history
  FOR DELETE USING (auth.uid() = user_id);

-- Event Log: insert only via service role (edge function), no direct user access
CREATE POLICY "No direct user access to event log" ON public.worker_event_log
  FOR SELECT USING (false);

-- Indexes
CREATE INDEX idx_golden_library_tier ON public.golden_library_sources(tier);
CREATE INDEX idx_golden_library_proof ON public.golden_library_sources(proof_category);
CREATE INDEX idx_golden_library_type ON public.golden_library_sources(source_type);
CREATE INDEX idx_objection_cards_category ON public.objection_cards(claim_category);
CREATE INDEX idx_worker_runs_user ON public.worker_runs(user_id);
CREATE INDEX idx_worker_runs_type ON public.worker_runs(worker_type);
CREATE INDEX idx_worker_output_user ON public.worker_output_history(user_id);
CREATE INDEX idx_study_progress_user ON public.ai_study_plan_progress(user_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_golden_library_sources_updated_at BEFORE UPDATE ON public.golden_library_sources FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_objection_cards_updated_at BEFORE UPDATE ON public.objection_cards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_conversation_scripts_updated_at BEFORE UPDATE ON public.conversation_scripts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ai_study_plans_updated_at BEFORE UPDATE ON public.ai_study_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ai_study_plan_progress_updated_at BEFORE UPDATE ON public.ai_study_plan_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_worker_runs_updated_at BEFORE UPDATE ON public.worker_runs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
