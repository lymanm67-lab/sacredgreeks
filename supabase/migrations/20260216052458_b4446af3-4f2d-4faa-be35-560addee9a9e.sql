
-- Content drafts table for AI Content Agent
CREATE TABLE public.content_drafts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('blog_post', 'pr_release', 'social_media')),
  title TEXT NOT NULL,
  slug TEXT,
  content TEXT NOT NULL,
  excerpt TEXT,
  meta_description TEXT,
  keywords TEXT[],
  seo_title TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'published', 'rejected')),
  ai_model TEXT,
  generation_prompt TEXT,
  editor_notes TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_drafts ENABLE ROW LEVEL SECURITY;

-- Only admins can manage content
CREATE POLICY "Admins can do everything with content_drafts"
  ON public.content_drafts
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Anyone can read published content (for the blog)
CREATE POLICY "Anyone can read published content"
  ON public.content_drafts
  FOR SELECT
  USING (status = 'published');

-- Unique slug for published content
CREATE UNIQUE INDEX idx_content_drafts_slug ON public.content_drafts (slug) WHERE slug IS NOT NULL;

-- Index for blog listing
CREATE INDEX idx_content_drafts_published ON public.content_drafts (status, published_at DESC) WHERE status = 'published';

-- Auto-update updated_at
CREATE TRIGGER update_content_drafts_updated_at
  BEFORE UPDATE ON public.content_drafts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
