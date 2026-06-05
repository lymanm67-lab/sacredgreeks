
-- 1. healing_stories: drop public select policy (email leak)
DROP POLICY IF EXISTS "Public can read approved consented stories only" ON public.healing_stories;

-- Ensure public view used for anonymous reads
GRANT SELECT ON public.healing_stories_public TO anon, authenticated;

-- 2. forum_notifications: drop broad insert policy
DROP POLICY IF EXISTS "Authenticated users can receive notifications" ON public.forum_notifications;

-- 3. founding_members: drop public select policy
DROP POLICY IF EXISTS "Anyone can count founding members" ON public.founding_members;

-- Allow members to read their own row
CREATE POLICY "Users can view their own founding member record"
  ON public.founding_members FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all founding members"
  ON public.founding_members FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Public count via security-definer RPC (aggregate only)
CREATE OR REPLACE FUNCTION public.get_founding_member_count()
RETURNS integer
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::int FROM public.founding_members;
$$;

REVOKE ALL ON FUNCTION public.get_founding_member_count() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_founding_member_count() TO anon, authenticated;

-- 4. beta_testers: drop overly-broad authenticated select
DROP POLICY IF EXISTS "Deny unauthenticated access to beta testers" ON public.beta_testers;

-- 5. security_scan_results: drop policy satisfiable by anon
DROP POLICY IF EXISTS "Only service role can insert scan results" ON public.security_scan_results;
-- service_role bypasses RLS, so no replacement policy needed
