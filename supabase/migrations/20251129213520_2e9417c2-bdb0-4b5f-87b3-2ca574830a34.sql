-- Fix Security Definer View warnings by using security_invoker
-- This ensures views respect RLS policies of the querying user

-- Fix assessment_submissions_safe view
ALTER VIEW public.assessment_submissions_safe SET (security_invoker = on);

-- Fix qa_submissions_safe view
ALTER VIEW public.qa_submissions_safe SET (security_invoker = on);

-- Fix existing healing_stories_public view
ALTER VIEW public.healing_stories_public SET (security_invoker = on);

-- Fix existing qa_public_answers view
ALTER VIEW public.qa_public_answers SET (security_invoker = on);