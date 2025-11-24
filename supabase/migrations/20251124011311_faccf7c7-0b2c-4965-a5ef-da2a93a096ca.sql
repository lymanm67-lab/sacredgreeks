-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update assessment_submissions to link to users
ALTER TABLE public.assessment_submissions
  ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update RLS for assessment_submissions to be user-specific
DROP POLICY IF EXISTS "Public can insert submissions" ON public.assessment_submissions;
DROP POLICY IF EXISTS "Public can view all submissions" ON public.assessment_submissions;

CREATE POLICY "Users can insert their own submissions"
  ON public.assessment_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own submissions"
  ON public.assessment_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions"
  ON public.assessment_submissions FOR UPDATE
  USING (auth.uid() = user_id);

-- Create prayer journal table
CREATE TABLE public.prayer_journal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  prayer_type TEXT, -- 'request', 'thanksgiving', 'confession', 'praise'
  answered BOOLEAN DEFAULT FALSE,
  answered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.prayer_journal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own prayers"
  ON public.prayer_journal FOR ALL
  USING (auth.uid() = user_id);

-- Create daily devotionals table
CREATE TABLE public.daily_devotionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  title TEXT NOT NULL,
  scripture_ref TEXT NOT NULL,
  scripture_text TEXT NOT NULL,
  reflection TEXT NOT NULL,
  proof_focus TEXT NOT NULL, -- 'Process', 'Rituals', 'Oaths', 'Obscurity', 'Founding'
  application TEXT NOT NULL,
  prayer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.daily_devotionals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view devotionals"
  ON public.daily_devotionals FOR SELECT
  USING (true);

-- Create user progress tracking table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  devotional_completed BOOLEAN DEFAULT FALSE,
  journal_entries_count INTEGER DEFAULT 0,
  assessments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own progress"
  ON public.user_progress FOR ALL
  USING (auth.uid() = user_id);

-- Create bookmarks table for favorite scriptures/videos
CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bookmark_type TEXT NOT NULL, -- 'scripture', 'video', 'response'
  content_json JSONB NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own bookmarks"
  ON public.bookmarks FOR ALL
  USING (auth.uid() = user_id);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prayer_journal_updated_at
  BEFORE UPDATE ON public.prayer_journal
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample daily devotional for today
INSERT INTO public.daily_devotionals (date, title, scripture_ref, scripture_text, proof_focus, reflection, application, prayer)
VALUES (
  CURRENT_DATE,
  'Walking in the Light',
  '1 John 1:7',
  'But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus, his Son, purifies us from all sin.',
  'Obscurity',
  'Greek life can sometimes feel like living in two worlds—your faith community and your Greek community. But God calls us to walk in the light everywhere we go. This doesn''t mean we abandon our letters; it means we refuse to hide our faith to keep the peace. Walking in the light means being authentic about who we are in Christ, whether we''re at chapter meeting or Bible study.',
  'Today, identify one place where you''ve been hiding your faith in your Greek life. Ask yourself: What would it look like to let my light shine there? It might be as simple as praying before a meal at a chapter event, or speaking up when a conversation needs Christ''s perspective. Walking in the light isn''t about being preachy—it''s about being present as a follower of Jesus.',
  'Lord, give me courage to walk in Your light today. Show me where I''ve been hiding my faith to fit in. Help me be authentic in every space—whether Greek, church, or anywhere else. Let my life point others to You. Amen.'
);