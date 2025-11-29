-- Fix: Remove public-facing policies from tables with emails
-- Public access should ONLY be through views that exclude emails

-- 1. Drop the public-facing policies we added (these expose email columns)
DROP POLICY IF EXISTS "Anyone can view approved published stories" ON public.healing_stories;
DROP POLICY IF EXISTS "Anyone can view public answered questions" ON public.qa_submissions;

-- 2. Recreate views as SECURITY DEFINER to provide controlled public access
-- These views intentionally exclude email columns and are the ONLY public access point

DROP VIEW IF EXISTS public.healing_stories_public;

CREATE VIEW public.healing_stories_public 
WITH (security_barrier = true) AS
SELECT 
  id,
  story_title,
  story_content,
  healing_type,
  name,
  organization,
  featured,
  created_at,
  updated_at
FROM public.healing_stories
WHERE approved = true 
  AND consent_to_publish = true;

-- Grant access to the view (not the underlying table)
GRANT SELECT ON public.healing_stories_public TO anon, authenticated;

DROP VIEW IF EXISTS public.qa_public_answers;

CREATE VIEW public.qa_public_answers 
WITH (security_barrier = true) AS
SELECT 
  id,
  question,
  answer,
  category,
  is_featured,
  answered_at,
  created_at
FROM public.qa_submissions
WHERE status = 'answered' 
  AND is_public = true;

-- Grant access to the view (not the underlying table)
GRANT SELECT ON public.qa_public_answers TO anon, authenticated;

-- Add comments explaining the security design
COMMENT ON VIEW public.healing_stories_public IS 'SECURITY: Public view of approved healing stories. Email intentionally excluded. This is the ONLY public access point - underlying table has no public SELECT policy.';
COMMENT ON VIEW public.qa_public_answers IS 'SECURITY: Public view of answered Q&A. Email and user_id intentionally excluded. This is the ONLY public access point - underlying table has no public SELECT policy.';