-- Create forum notifications table
CREATE TABLE IF NOT EXISTS public.forum_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  discussion_id uuid REFERENCES public.forum_discussions(id) ON DELETE CASCADE,
  reply_id uuid REFERENCES public.forum_replies(id) ON DELETE CASCADE,
  notification_type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.forum_notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for forum_notifications
CREATE POLICY "Users can view their own notifications" ON public.forum_notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.forum_notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" ON public.forum_notifications
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" ON public.forum_notifications
  FOR INSERT WITH CHECK (true);

-- Update forum_discussions policies to allow admins to pin
DROP POLICY IF EXISTS "Users can update their own discussions" ON public.forum_discussions;
CREATE POLICY "Users and admins can update discussions" ON public.forum_discussions
  FOR UPDATE USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

-- Update forum_replies policies to allow marking best answers
DROP POLICY IF EXISTS "Users can update their own replies" ON public.forum_replies;
CREATE POLICY "Users and discussion owners can update replies" ON public.forum_replies
  FOR UPDATE USING (
    auth.uid() = user_id 
    OR has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1 FROM public.forum_discussions d 
      WHERE d.id = forum_replies.discussion_id AND d.user_id = auth.uid()
    )
  );

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.forum_notifications;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_forum_notifications_user ON public.forum_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_notifications_unread ON public.forum_notifications(user_id, is_read) WHERE is_read = false;

-- Function to create notification when someone replies
CREATE OR REPLACE FUNCTION public.notify_forum_reply()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _discussion_owner uuid;
  _discussion_title text;
  _replier_name text;
BEGIN
  SELECT user_id, title INTO _discussion_owner, _discussion_title
  FROM public.forum_discussions
  WHERE id = NEW.discussion_id;

  SELECT COALESCE(full_name, 'A member') INTO _replier_name
  FROM public.profiles
  WHERE id = NEW.user_id;

  IF _discussion_owner != NEW.user_id THEN
    INSERT INTO public.forum_notifications (user_id, discussion_id, reply_id, notification_type, title, message)
    VALUES (
      _discussion_owner,
      NEW.discussion_id,
      NEW.id,
      'reply',
      'New reply to your discussion',
      _replier_name || ' replied to "' || _discussion_title || '"'
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for reply notifications
DROP TRIGGER IF EXISTS on_forum_reply_created ON public.forum_replies;
CREATE TRIGGER on_forum_reply_created
  AFTER INSERT ON public.forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_forum_reply();