
-- Chapter leaderboard table for engagement tracking
CREATE TABLE public.chapter_leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID REFERENCES public.greek_chapters(id) ON DELETE CASCADE,
  chapter_name TEXT NOT NULL,
  organization TEXT NOT NULL,
  total_points INTEGER DEFAULT 0,
  member_count INTEGER DEFAULT 0,
  devotionals_completed INTEGER DEFAULT 0,
  prayers_submitted INTEGER DEFAULT 0,
  study_plans_completed INTEGER DEFAULT 0,
  service_hours NUMERIC(10,2) DEFAULT 0,
  week_start DATE NOT NULL DEFAULT date_trunc('week', CURRENT_DATE)::date,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(chapter_id, week_start)
);

-- Enable RLS
ALTER TABLE public.chapter_leaderboard ENABLE ROW LEVEL SECURITY;

-- Public read access for leaderboard
CREATE POLICY "Anyone can view leaderboard" ON public.chapter_leaderboard
  FOR SELECT TO authenticated USING (true);

-- Weekly email digest preferences
CREATE TABLE public.email_digest_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  digest_enabled BOOLEAN DEFAULT true,
  frequency TEXT DEFAULT 'weekly' CHECK (frequency IN ('weekly', 'biweekly', 'monthly')),
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.email_digest_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own digest prefs" ON public.email_digest_preferences
  FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- OG share card metadata cache
CREATE TABLE public.og_share_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  share_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(content_type, content_id)
);

ALTER TABLE public.og_share_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read OG cards" ON public.og_share_cards
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create OG cards" ON public.og_share_cards
  FOR INSERT TO authenticated WITH CHECK (true);
