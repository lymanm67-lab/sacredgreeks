
-- =============================================
-- FIX PERMISSIVE RLS POLICIES (WITH CHECK true)
-- =============================================

-- 1. ANALYTICS_EVENTS: require auth (not anonymous)
DROP POLICY IF EXISTS "Authenticated users can insert analytics events" ON public.analytics_events;
CREATE POLICY "Authenticated users can insert analytics events"
  ON public.analytics_events FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- 2. COACHING_WAITLIST: require auth + user_id match
DROP POLICY IF EXISTS "Authenticated users can join coaching waitlist" ON public.coaching_waitlist;
CREATE POLICY "Authenticated users can join coaching waitlist"
  ON public.coaching_waitlist FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 3. EMAIL_CLICKS: tracking pixel - keep open but restrict to service role via function
-- These are called from edge functions, keep as-is (legitimate system use)

-- 4. EMAIL_OPENS: same as clicks - legitimate tracking pixel
-- Keep as-is

-- 5. EMAIL_SENDS: restrict to admin only
DROP POLICY IF EXISTS "System can insert email sends" ON public.email_sends;
CREATE POLICY "Admin can insert email sends"
  ON public.email_sends FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. GREEK_CHAPTERS: require auth + submitted_by match
DROP POLICY IF EXISTS "Authenticated users can submit chapters" ON public.greek_chapters;
CREATE POLICY "Authenticated users can submit chapters"
  ON public.greek_chapters FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = submitted_by);

-- 7. GREEK_EVENTS: require auth + submitted_by match
DROP POLICY IF EXISTS "Authenticated users can submit events" ON public.greek_events;
CREATE POLICY "Authenticated users can submit events"
  ON public.greek_events FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = submitted_by);

-- 8. HEALING_STORIES: require auth
DROP POLICY IF EXISTS "Authenticated users can submit healing stories" ON public.healing_stories;
CREATE POLICY "Authenticated users can submit healing stories"
  ON public.healing_stories FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- 9. LANDING_PAGE_CONVERSIONS: anonymous tracking - keep as-is (legitimate)

-- 10. LANDING_PAGE_VISITS: anonymous tracking - keep as-is (legitimate)

-- 11. MEDIA_INQUIRIES: remove duplicate, keep one with auth
DROP POLICY IF EXISTS "Anyone can submit media inquiries" ON public.media_inquiries;
DROP POLICY IF EXISTS "Authenticated users can submit media inquiries" ON public.media_inquiries;
CREATE POLICY "Anyone can submit media inquiries"
  ON public.media_inquiries FOR INSERT
  WITH CHECK (true);
-- Note: media inquiries are a public contact form, keeping open is intentional

-- 12. PODCAST_GUEST_APPLICATIONS: remove duplicate, require auth
DROP POLICY IF EXISTS "Anyone can submit podcast guest applications" ON public.podcast_guest_applications;
DROP POLICY IF EXISTS "Authenticated users can apply to be podcast guest" ON public.podcast_guest_applications;
CREATE POLICY "Authenticated users can apply to be podcast guest"
  ON public.podcast_guest_applications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- 13. QA_SUBMISSIONS: require auth + user_id match
DROP POLICY IF EXISTS "Authenticated users can submit questions" ON public.qa_submissions;
CREATE POLICY "Authenticated users can submit questions"
  ON public.qa_submissions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 14. SPEAKING_REQUESTS: remove duplicate, keep public (contact form)
DROP POLICY IF EXISTS "Anyone can submit speaking requests" ON public.speaking_requests;
DROP POLICY IF EXISTS "Authenticated users can submit speaking requests" ON public.speaking_requests;
CREATE POLICY "Anyone can submit speaking requests"
  ON public.speaking_requests FOR INSERT
  WITH CHECK (true);
-- Note: speaking requests are a public contact form, keeping open is intentional

-- 15. WEBINAR_REGISTRATIONS: public form - keep open (intentional)
-- Already correct for public webinar registration
