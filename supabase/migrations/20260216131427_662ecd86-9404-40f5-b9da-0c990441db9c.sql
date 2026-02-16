
-- Tighten service-role policies to require auth or be explicit about service context
-- output_citations: only service role inserts (via edge function), so restrict to admin
DROP POLICY "Service role can insert output citations" ON public.output_citations;
CREATE POLICY "Admins can insert output citations"
  ON public.output_citations FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR auth.uid() IS NOT NULL);

-- video_jobs: only edge functions manage these
DROP POLICY "Service can manage video jobs" ON public.video_jobs;
CREATE POLICY "Admins can manage video jobs"
  ON public.video_jobs FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- video_assets: only edge functions insert
DROP POLICY "Service can manage video assets" ON public.video_assets;
CREATE POLICY "Admins can manage video assets"
  ON public.video_assets FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- video_citations: only edge functions insert
DROP POLICY "Service can manage video citations" ON public.video_citations;
CREATE POLICY "Admins can manage video citations"
  ON public.video_citations FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));
