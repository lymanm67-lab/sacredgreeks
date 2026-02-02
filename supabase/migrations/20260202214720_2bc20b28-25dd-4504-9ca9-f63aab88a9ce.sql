-- Fix Security Definer View issues by recreating with explicit SECURITY INVOKER
-- Fix get_business_contact_details function to use SECURITY INVOKER

-- 1. Recreate assessment_submissions_safe view with SECURITY INVOKER
DROP VIEW IF EXISTS public.assessment_submissions_safe;

CREATE VIEW public.assessment_submissions_safe
WITH (security_invoker=true)
AS
  SELECT 
    id,
    track,
    scenario,
    answers_json,
    scores_json,
    result_type,
    user_id,
    created_at,
    updated_at,
    consent_to_contact
  FROM public.assessment_submissions;

GRANT SELECT ON public.assessment_submissions_safe TO anon, authenticated;
COMMENT ON VIEW public.assessment_submissions_safe IS 'Public-safe view of assessment submissions. Excludes email addresses. Uses SECURITY INVOKER.';

-- 2. Recreate healing_stories_public view with SECURITY INVOKER
DROP VIEW IF EXISTS public.healing_stories_public;

CREATE VIEW public.healing_stories_public
WITH (security_invoker=true)
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

GRANT SELECT ON public.healing_stories_public TO anon, authenticated;
COMMENT ON VIEW public.healing_stories_public IS 'Public-safe view of approved healing stories. Excludes email. Uses SECURITY INVOKER.';

-- 3. Convert get_business_contact_details to SECURITY INVOKER
-- This function returns contact details only for authenticated users
CREATE OR REPLACE FUNCTION public.get_business_contact_details(business_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  _email text;
  _phone text;
BEGIN
  IF auth.uid() IS NOT NULL THEN
    SELECT email, phone INTO _email, _phone
    FROM public.d9_business_directory
    WHERE id = business_id;
    RETURN jsonb_build_object('email', _email, 'phone', _phone);
  ELSE
    RETURN jsonb_build_object('email', NULL, 'phone', NULL);
  END IF;
END;
$$;