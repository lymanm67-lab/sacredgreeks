-- Drop the existing policy that only checks approved status
DROP POLICY IF EXISTS "Anyone can view approved stories" ON public.healing_stories;

-- Create new policy that requires BOTH approved AND consent_to_publish
-- This policy returns all columns but only for stories with proper consent
CREATE POLICY "Anyone can view approved and consented stories"
ON public.healing_stories
FOR SELECT
USING (approved = true AND consent_to_publish = true);

-- Create a secure view for public access that excludes email
-- This provides an extra layer of protection
CREATE OR REPLACE VIEW public.healing_stories_public AS
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

-- Grant select on the view to authenticated and anon users
GRANT SELECT ON public.healing_stories_public TO authenticated;
GRANT SELECT ON public.healing_stories_public TO anon;

-- Add a comment explaining the security model
COMMENT ON VIEW public.healing_stories_public IS 'Public view of healing stories that excludes email addresses. Only shows stories that are both approved AND have consent_to_publish=true.';