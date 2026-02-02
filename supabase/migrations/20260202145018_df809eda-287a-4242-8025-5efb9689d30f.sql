-- =====================================================
-- SECURITY HARDENING MIGRATION - Part 2 (Remaining)
-- =====================================================

-- Drop ALL existing policies on affected tables first
DROP POLICY IF EXISTS "Admins can view all speaking requests" ON public.speaking_requests;
DROP POLICY IF EXISTS "Authenticated users can submit speaking requests" ON public.speaking_requests;

DROP POLICY IF EXISTS "Authenticated users can submit media inquiries" ON public.media_inquiries;
DROP POLICY IF EXISTS "Users can view their own media inquiries" ON public.media_inquiries;

DROP POLICY IF EXISTS "Authenticated users can apply to be podcast guest" ON public.podcast_guest_applications;
DROP POLICY IF EXISTS "Admins can view podcast applications" ON public.podcast_guest_applications;

DROP POLICY IF EXISTS "Authenticated users can join coaching waitlist" ON public.coaching_waitlist;
DROP POLICY IF EXISTS "Users can view their own waitlist entry" ON public.coaching_waitlist;

DROP POLICY IF EXISTS "Authenticated users can submit chapters" ON public.greek_chapters;
DROP POLICY IF EXISTS "Public can view chapters" ON public.greek_chapters;

DROP POLICY IF EXISTS "Authenticated users can submit events" ON public.greek_events;
DROP POLICY IF EXISTS "Public can view approved events" ON public.greek_events;

DROP POLICY IF EXISTS "Authenticated users can submit questions" ON public.qa_submissions;
DROP POLICY IF EXISTS "Public can view public answered questions" ON public.qa_submissions;

DROP POLICY IF EXISTS "Authenticated users can insert analytics events" ON public.analytics_events;
DROP POLICY IF EXISTS "Anonymous analytics allowed" ON public.analytics_events;
DROP POLICY IF EXISTS "Admins can view analytics" ON public.analytics_events;

DROP POLICY IF EXISTS "Authenticated users can submit healing stories" ON public.healing_stories;
DROP POLICY IF EXISTS "Public can view approved stories without email" ON public.healing_stories;

-- Now recreate all policies with proper auth requirements

-- Speaking Requests
CREATE POLICY "Authenticated users can submit speaking requests"
ON public.speaking_requests FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view all speaking requests"
ON public.speaking_requests FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Media Inquiries
CREATE POLICY "Authenticated users can submit media inquiries"
ON public.media_inquiries FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can view their own media inquiries"
ON public.media_inquiries FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Podcast Guest Applications
CREATE POLICY "Authenticated users can apply to be podcast guest"
ON public.podcast_guest_applications FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view podcast applications"
ON public.podcast_guest_applications FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Coaching Waitlist
CREATE POLICY "Authenticated users can join coaching waitlist"
ON public.coaching_waitlist FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can view their own waitlist entry"
ON public.coaching_waitlist FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Greek Chapters
CREATE POLICY "Authenticated users can submit chapters"
ON public.greek_chapters FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Public can view chapters"
ON public.greek_chapters FOR SELECT
USING (true);

-- Greek Events
CREATE POLICY "Authenticated users can submit events"
ON public.greek_events FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Public can view approved events"
ON public.greek_events FOR SELECT
USING (is_approved = true);

-- QA Submissions
CREATE POLICY "Authenticated users can submit questions"
ON public.qa_submissions FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Public can view public answered questions"
ON public.qa_submissions FOR SELECT
USING (
  (is_public = true AND status = 'answered') 
  OR user_id = auth.uid() 
  OR public.has_role(auth.uid(), 'admin')
);

-- Analytics Events
CREATE POLICY "Authenticated users can insert analytics events"
ON public.analytics_events FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Anonymous analytics allowed"
ON public.analytics_events FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

CREATE POLICY "Admins can view analytics"
ON public.analytics_events FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Healing Stories
CREATE POLICY "Authenticated users can submit healing stories"
ON public.healing_stories FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Public can view approved stories without email"
ON public.healing_stories FOR SELECT
USING (approved = true);

-- 3. GATE D9 BUSINESS DIRECTORY - Secure contact function
CREATE OR REPLACE FUNCTION public.get_business_contact_details(business_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create secure view for business directory
DROP VIEW IF EXISTS public.d9_business_directory_public;
CREATE VIEW public.d9_business_directory_public AS
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

GRANT SELECT ON public.d9_business_directory_public TO anon, authenticated;

-- 4. FIX QA_SUBMISSIONS_SAFE VIEW
DROP VIEW IF EXISTS public.qa_submissions_safe;
CREATE VIEW public.qa_submissions_safe AS
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

GRANT SELECT ON public.qa_submissions_safe TO anon, authenticated;