-- Fix Security Definer View issues by using SECURITY INVOKER

-- 1. Drop and recreate healing_stories_public view with SECURITY INVOKER
DROP VIEW IF EXISTS public.healing_stories_public;

CREATE VIEW public.healing_stories_public 
WITH (security_invoker = on) AS
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

COMMENT ON VIEW public.healing_stories_public IS 'Public view of approved healing stories - email intentionally excluded for privacy';

-- 2. Drop and recreate qa_public_answers view with SECURITY INVOKER
DROP VIEW IF EXISTS public.qa_public_answers;

CREATE VIEW public.qa_public_answers 
WITH (security_invoker = on) AS
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

COMMENT ON VIEW public.qa_public_answers IS 'Public view of answered Q&A - email and user_id intentionally excluded for privacy';

-- 3. Add RLS policy to healing_stories for public viewing of approved stories
CREATE POLICY "Anyone can view approved published stories" 
ON public.healing_stories 
FOR SELECT 
USING (approved = true AND consent_to_publish = true);

-- 4. Add RLS policy to qa_submissions for public viewing of answered public questions
CREATE POLICY "Anyone can view public answered questions" 
ON public.qa_submissions 
FOR SELECT 
USING (status = 'answered' AND is_public = true);

-- Re-grant permissions
GRANT SELECT ON public.healing_stories_public TO anon, authenticated;
GRANT SELECT ON public.qa_public_answers TO anon, authenticated;