CREATE POLICY "Users can delete their own video requests"
  ON public.video_requests FOR DELETE
  USING (auth.uid() = user_id);