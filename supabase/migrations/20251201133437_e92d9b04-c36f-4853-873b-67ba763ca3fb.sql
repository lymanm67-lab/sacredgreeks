-- Add streak tracking fields to user_gamification table
ALTER TABLE public.user_gamification 
ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_engagement_date DATE,
ADD COLUMN IF NOT EXISTS streak_updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create table for morning notification preferences
CREATE TABLE IF NOT EXISTS public.morning_notification_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT true,
  notification_time TIME DEFAULT '07:00:00',
  include_verse_preview BOOLEAN DEFAULT true,
  include_streak_reminder BOOLEAN DEFAULT true,
  timezone TEXT DEFAULT 'America/New_York',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.morning_notification_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for morning_notification_settings
CREATE POLICY "Users can view their own morning settings"
ON public.morning_notification_settings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own morning settings"
ON public.morning_notification_settings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own morning settings"
ON public.morning_notification_settings FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to update streak
CREATE OR REPLACE FUNCTION public.update_user_streak(_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _last_date DATE;
  _current_streak INTEGER;
  _longest_streak INTEGER;
  _today DATE := CURRENT_DATE;
  _streak_broken BOOLEAN := false;
  _new_streak INTEGER;
BEGIN
  -- Get or create gamification record
  INSERT INTO public.user_gamification (user_id, total_points, current_level, current_streak, longest_streak)
  VALUES (_user_id, 0, 1, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;

  -- Get current streak data
  SELECT last_engagement_date, current_streak, longest_streak 
  INTO _last_date, _current_streak, _longest_streak
  FROM public.user_gamification
  WHERE user_id = _user_id;

  -- Calculate new streak
  IF _last_date IS NULL OR _last_date < _today - INTERVAL '1 day' THEN
    -- Streak broken or first engagement
    _new_streak := 1;
    _streak_broken := _last_date IS NOT NULL AND _last_date < _today - INTERVAL '1 day';
  ELSIF _last_date = _today - INTERVAL '1 day' THEN
    -- Consecutive day
    _new_streak := COALESCE(_current_streak, 0) + 1;
  ELSIF _last_date = _today THEN
    -- Already engaged today
    _new_streak := COALESCE(_current_streak, 1);
  ELSE
    _new_streak := 1;
  END IF;

  -- Update longest streak if needed
  IF _new_streak > COALESCE(_longest_streak, 0) THEN
    _longest_streak := _new_streak;
  END IF;

  -- Update the record
  UPDATE public.user_gamification
  SET current_streak = _new_streak,
      longest_streak = _longest_streak,
      last_engagement_date = _today,
      streak_updated_at = now()
  WHERE user_id = _user_id;

  RETURN jsonb_build_object(
    'current_streak', _new_streak,
    'longest_streak', _longest_streak,
    'streak_broken', _streak_broken,
    'last_engagement_date', _today
  );
END;
$$;

-- Create trigger for updated_at on morning_notification_settings
CREATE TRIGGER update_morning_notification_settings_updated_at
BEFORE UPDATE ON public.morning_notification_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();