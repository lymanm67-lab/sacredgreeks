-- Fix email exposure in shared assessment results
-- Create a safe view for assessment submissions that excludes email

DROP VIEW IF EXISTS public.assessment_submissions_safe;

CREATE VIEW public.assessment_submissions_safe
WITH (security_invoker=on)
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
    -- Explicitly excludes: email
  FROM public.assessment_submissions;

-- Grant access to the view
GRANT SELECT ON public.assessment_submissions_safe TO anon, authenticated;

-- Add comment for documentation
COMMENT ON VIEW public.assessment_submissions_safe IS 'Public-safe view of assessment submissions. Excludes email addresses to prevent exposure via shared results.';