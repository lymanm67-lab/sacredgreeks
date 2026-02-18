
-- Slide decks table for user-created and template-based presentations
CREATE TABLE public.slide_decks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_template BOOLEAN NOT NULL DEFAULT false,
  template_category TEXT, -- 'proof', 'devotional', 'chapter', 'custom'
  slides_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  thumbnail_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.slide_decks ENABLE ROW LEVEL SECURITY;

-- Users can view their own decks + public templates
CREATE POLICY "Users can view own decks and public templates"
  ON public.slide_decks FOR SELECT
  USING (auth.uid() = user_id OR is_public = true);

-- Users can create their own decks
CREATE POLICY "Users can create own decks"
  ON public.slide_decks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own decks
CREATE POLICY "Users can update own decks"
  ON public.slide_decks FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own decks
CREATE POLICY "Users can delete own decks"
  ON public.slide_decks FOR DELETE
  USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE TRIGGER update_slide_decks_updated_at
  BEFORE UPDATE ON public.slide_decks
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
