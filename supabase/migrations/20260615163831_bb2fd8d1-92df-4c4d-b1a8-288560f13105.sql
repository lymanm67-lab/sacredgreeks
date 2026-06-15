
DROP VIEW IF EXISTS public.d9_business_directory_public;

CREATE VIEW public.d9_business_directory_public
WITH (security_invoker = true) AS
SELECT
  id, business_name, owner_name, greek_organization, business_category,
  description, website_url, location_city, location_state, faith_statement,
  logo_url, featured, is_active, created_at, updated_at
FROM public.d9_business_directory
WHERE is_active = true;

GRANT SELECT ON public.d9_business_directory_public TO authenticated, anon;
