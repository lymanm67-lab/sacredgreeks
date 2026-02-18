
-- Live polls table
CREATE TABLE public.live_polls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  poll_type TEXT NOT NULL DEFAULT 'poll', -- 'poll' or 'qa'
  options_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT false,
  is_anonymous BOOLEAN NOT NULL DEFAULT true,
  allow_multiple BOOLEAN NOT NULL DEFAULT false,
  share_code TEXT UNIQUE DEFAULT encode(gen_random_bytes(4), 'hex'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Poll votes / Q&A submissions
CREATE TABLE public.live_poll_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID NOT NULL REFERENCES public.live_polls(id) ON DELETE CASCADE,
  user_id UUID,
  option_index INTEGER, -- for poll votes
  question_text TEXT, -- for Q&A submissions
  upvotes INTEGER NOT NULL DEFAULT 0,
  is_answered BOOLEAN NOT NULL DEFAULT false,
  is_moderated BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.live_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_poll_responses ENABLE ROW LEVEL SECURITY;

-- Polls: owners can CRUD, anyone can read active polls
CREATE POLICY "Users can manage own polls" ON public.live_polls
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view active polls" ON public.live_polls
  FOR SELECT USING (is_active = true);

-- Responses: anyone authenticated can submit, owners can read all for their polls
CREATE POLICY "Authenticated users can submit responses" ON public.live_poll_responses
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Poll owners can view responses" ON public.live_poll_responses
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.live_polls WHERE id = poll_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can view own responses" ON public.live_poll_responses
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Poll owners can update responses" ON public.live_poll_responses
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.live_polls WHERE id = poll_id AND user_id = auth.uid())
  );

CREATE POLICY "Poll owners can delete responses" ON public.live_poll_responses
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.live_polls WHERE id = poll_id AND user_id = auth.uid())
  );

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_poll_responses;

-- Updated_at trigger
CREATE TRIGGER update_live_polls_updated_at
  BEFORE UPDATE ON public.live_polls
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
