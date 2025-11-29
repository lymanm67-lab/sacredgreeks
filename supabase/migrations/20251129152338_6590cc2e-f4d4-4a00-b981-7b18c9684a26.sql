-- =====================================================
-- FIX SECURITY DEFINER VIEWS - Use SECURITY INVOKER instead
-- =====================================================

-- Drop and recreate views with SECURITY INVOKER (the default, but explicit is better)
DROP VIEW IF EXISTS public.healing_stories_public;
DROP VIEW IF EXISTS public.qa_public_answers;

-- Recreate healing_stories_public with explicit SECURITY INVOKER
CREATE VIEW public.healing_stories_public 
WITH (security_invoker = true)
AS
SELECT 
  id,
  story_title,
  story_content,
  name,
  organization,
  healing_type,
  featured,
  created_at,
  updated_at
FROM public.healing_stories
WHERE approved = true 
  AND consent_to_publish = true;

-- Grant access to the view
GRANT SELECT ON public.healing_stories_public TO anon, authenticated;

-- Recreate qa_public_answers with explicit SECURITY INVOKER
CREATE VIEW public.qa_public_answers 
WITH (security_invoker = true)
AS
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

-- Grant access to the view
GRANT SELECT ON public.qa_public_answers TO anon, authenticated;