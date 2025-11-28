-- Drop the view and recreate with SECURITY INVOKER (safer)
DROP VIEW IF EXISTS public.healing_stories_public;

-- Recreate the view with explicit SECURITY INVOKER
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
WHERE approved = true AND consent_to_publish = true;

-- Re-grant select on the view
GRANT SELECT ON public.healing_stories_public TO authenticated;
GRANT SELECT ON public.healing_stories_public TO anon;

COMMENT ON VIEW public.healing_stories_public IS 'Public view of healing stories that excludes email addresses. Uses SECURITY INVOKER so RLS is enforced based on the querying user.';