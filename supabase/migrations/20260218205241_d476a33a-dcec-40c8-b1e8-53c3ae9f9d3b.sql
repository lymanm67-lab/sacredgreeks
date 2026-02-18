
-- Fix 1: Recreate healing_stories_public view WITH security_invoker to ensure RLS applies
-- The view already excludes email, which is correct
DROP VIEW IF EXISTS public.healing_stories_public;

CREATE VIEW public.healing_stories_public
WITH (security_invoker=on) AS
  SELECT id, name, organization, story_title, story_content, healing_type, featured, created_at
  FROM public.healing_stories
  WHERE approved = true AND consent_to_publish = true;

-- We need a SELECT policy that allows reading approved+consented stories (for the view)
-- The current "Block direct public read" policy returns false for all.
-- We need to allow SELECT only for approved & consented stories (used by the view with security_invoker)
DROP POLICY IF EXISTS "Block direct public read of healing stories" ON public.healing_stories;

CREATE POLICY "Public can read approved consented stories only"
  ON public.healing_stories FOR SELECT
  USING (approved = true AND consent_to_publish = true);

-- Fix 2: Create a function to hash session IDs for analytics_events
-- This anonymizes session tracking while preserving grouping capability
CREATE OR REPLACE FUNCTION public.hash_session_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.session_id IS NOT NULL THEN
    NEW.session_id := encode(digest(NEW.session_id || 'sacred-salt-2024', 'sha256'), 'hex');
  END IF;
  RETURN NEW;
END;
$$;

-- Need pgcrypto for digest function
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TRIGGER hash_analytics_session_id
  BEFORE INSERT ON public.analytics_events
  FOR EACH ROW
  EXECUTE FUNCTION public.hash_session_id();
