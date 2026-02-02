-- Fix Security Definer Views - Convert to SECURITY INVOKER
DROP VIEW IF EXISTS public.d9_business_directory_public;
DROP VIEW IF EXISTS public.qa_submissions_safe;

-- Recreate with SECURITY INVOKER (default, but explicit)
CREATE VIEW public.d9_business_directory_public 
WITH (security_invoker = on) AS
SELECT 
  id,
  business_name,
  owner_name,
  greek_organization,
  business_category,
  description,
  website_url,
  location_city,
  location_state,
  logo_url,
  faith_statement,
  featured,
  is_active,
  created_at,
  updated_at,
  CASE WHEN auth.uid() IS NOT NULL THEN email ELSE NULL END as email,
  CASE WHEN auth.uid() IS NOT NULL THEN phone ELSE NULL END as phone
FROM public.d9_business_directory
WHERE is_active = true;

CREATE VIEW public.qa_submissions_safe 
WITH (security_invoker = on) AS
SELECT 
  id,
  question,
  answer,
  category,
  status,
  is_featured,
  is_public,
  created_at,
  updated_at,
  answered_at,
  CASE 
    WHEN public.has_role(auth.uid(), 'admin') THEN email
    WHEN user_id = auth.uid() THEN email
    ELSE NULL 
  END as email,
  user_id
FROM public.qa_submissions
WHERE is_public = true AND status = 'answered';

GRANT SELECT ON public.d9_business_directory_public TO anon, authenticated;
GRANT SELECT ON public.qa_submissions_safe TO anon, authenticated;