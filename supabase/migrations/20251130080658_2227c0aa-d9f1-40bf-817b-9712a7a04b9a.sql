-- Enable realtime for prayer_requests table
ALTER PUBLICATION supabase_realtime ADD TABLE public.prayer_requests;

-- Enable realtime for prayer_support table  
ALTER PUBLICATION supabase_realtime ADD TABLE public.prayer_support;

-- Enable realtime for forum_discussions table
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_discussions;

-- Enable realtime for forum_replies table
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_replies;

-- Set REPLICA IDENTITY FULL for complete row data
ALTER TABLE public.prayer_requests REPLICA IDENTITY FULL;
ALTER TABLE public.prayer_support REPLICA IDENTITY FULL;
ALTER TABLE public.forum_discussions REPLICA IDENTITY FULL;
ALTER TABLE public.forum_replies REPLICA IDENTITY FULL;