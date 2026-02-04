-- Drop existing view first
DROP VIEW IF EXISTS public.d9_business_directory_public;

-- Create public view without sensitive contact fields
CREATE VIEW public.d9_business_directory_public
WITH (security_invoker = true) AS
SELECT 
  id,
  business_name,
  business_category,
  description,
  owner_name,
  greek_organization,
  location_city,
  location_state,
  website_url,
  logo_url,
  faith_statement,
  featured,
  is_active,
  created_at,
  updated_at
  -- email and phone intentionally excluded for privacy
FROM public.d9_business_directory;

-- Drop existing public SELECT policy
DROP POLICY IF EXISTS "Anyone can view active business listings" ON public.d9_business_directory;

-- Create new policy: Only authenticated users can SELECT directly
CREATE POLICY "Authenticated users can view business listings"
ON public.d9_business_directory FOR SELECT
TO authenticated
USING (is_active = true);

-- Add comment documenting the security pattern
COMMENT ON VIEW public.d9_business_directory_public IS 'Public view of business directory without sensitive contact info (email, phone). Use get_business_contact_details() function for authenticated access to contact info.';