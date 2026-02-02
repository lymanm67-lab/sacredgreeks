-- Fix healing_stories email exposure by blocking direct table access
-- The healing_stories_public view already excludes email and should be the only public access point

-- Step 1: Drop the problematic policy that allows direct SELECT with email exposure
DROP POLICY IF EXISTS "Public can view approved stories without email" ON public.healing_stories;

-- Step 2: Drop and recreate the view with SECURITY DEFINER to allow access while base table is protected
DROP VIEW IF EXISTS public.healing_stories_public;

CREATE VIEW public.healing_stories_public
WITH (security_barrier=true)
AS
  SELECT 
    id,
    name,
    organization,
    story_title,
    story_content,
    healing_type,
    featured,
    created_at
  FROM public.healing_stories
  WHERE approved = true AND consent_to_publish = true;

-- Step 3: Grant SELECT on the view to public (both anon and authenticated)
GRANT SELECT ON public.healing_stories_public TO anon, authenticated;

-- Step 4: Add a comment for documentation
COMMENT ON VIEW public.healing_stories_public IS 'Public-safe view of approved healing stories. Excludes email addresses and only shows stories with both approved=true AND consent_to_publish=true.';