-- =====================================================
-- FINAL SECURITY FIXES - Remove public access to base tables with emails
-- =====================================================

-- 1. FIX: healing_stories - Remove public SELECT from base table
-- Public access should ONLY be through the view (which excludes email)
DROP POLICY IF EXISTS "Anyone can view approved and consented stories" ON public.healing_stories;

-- Only allow: admins full access, others must use the view
-- The view (healing_stories_public) already exists and excludes email

-- 2. FIX: qa_submissions - Remove direct public SELECT that could expose emails
DROP POLICY IF EXISTS "Users view own questions or public answers without email" ON public.qa_submissions;

-- Recreate with stricter access - public should use the view
CREATE POLICY "Users view own or admins view all"
ON public.qa_submissions
FOR SELECT
USING (
  (auth.uid() = user_id) 
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Public access to answered questions should use qa_public_answers view (which excludes email)

-- 3. FIX: profiles - The scan says it lacks policies but it has them
-- Let's ensure the policies are correct and add admin access
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));