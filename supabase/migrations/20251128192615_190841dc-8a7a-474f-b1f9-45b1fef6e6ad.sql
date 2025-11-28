-- Fix security issues: Add explicit policies to deny unauthenticated access

-- Profiles table - ensure only owners can read
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Assessment submissions - add explicit deny for unauthenticated
CREATE POLICY "Deny unauthenticated access to assessment submissions" 
ON public.assessment_submissions FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Beta testers - add explicit deny for unauthenticated
CREATE POLICY "Deny unauthenticated access to beta testers" 
ON public.beta_testers FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- QA submissions - fix to require auth for non-public questions
DROP POLICY IF EXISTS "Anyone can view public answered questions" ON public.qa_submissions;
CREATE POLICY "Authenticated users can view public answered questions" 
ON public.qa_submissions FOR SELECT 
USING ((is_public = true AND status = 'answered'::text) OR auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- Analytics events - ensure only admins can read
DROP POLICY IF EXISTS "Admins can view all analytics events" ON public.analytics_events;
CREATE POLICY "Only admins can view analytics events" 
ON public.analytics_events FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Rate limits - add explicit auth requirement
DROP POLICY IF EXISTS "Users can view their own rate limits" ON public.rate_limits;
CREATE POLICY "Authenticated users can view their own rate limits" 
ON public.rate_limits FOR SELECT 
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Referrals - add explicit auth requirement  
DROP POLICY IF EXISTS "Users can view their own referrals" ON public.referrals;
CREATE POLICY "Authenticated users can view their own referrals" 
ON public.referrals FOR SELECT 
USING (auth.uid() IS NOT NULL AND (auth.uid() = referrer_id OR auth.uid() = referred_user_id));