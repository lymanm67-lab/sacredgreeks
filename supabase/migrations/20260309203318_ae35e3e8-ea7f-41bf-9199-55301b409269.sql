
-- Add user_type to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_type text DEFAULT 'member';

-- Create ministry_groups table
CREATE TABLE public.ministry_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  leader_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invite_code text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(6), 'hex'),
  is_active boolean DEFAULT true,
  max_members integer DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ministry_group_members table
CREATE TABLE public.ministry_group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.ministry_groups(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'student',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Enable RLS
ALTER TABLE public.ministry_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministry_group_members ENABLE ROW LEVEL SECURITY;

-- Ministry groups policies
CREATE POLICY "Leaders can manage their groups" ON public.ministry_groups
  FOR ALL TO authenticated
  USING (leader_id = auth.uid())
  WITH CHECK (leader_id = auth.uid());

CREATE POLICY "Members can view groups they belong to" ON public.ministry_groups
  FOR SELECT TO authenticated
  USING (
    id IN (SELECT group_id FROM public.ministry_group_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Anyone authenticated can view groups by invite code" ON public.ministry_groups
  FOR SELECT TO authenticated
  USING (is_active = true);

-- Ministry group members policies
CREATE POLICY "Leaders can manage group members" ON public.ministry_group_members
  FOR ALL TO authenticated
  USING (
    group_id IN (SELECT id FROM public.ministry_groups WHERE leader_id = auth.uid())
  )
  WITH CHECK (
    group_id IN (SELECT id FROM public.ministry_groups WHERE leader_id = auth.uid())
  );

CREATE POLICY "Members can view their own membership" ON public.ministry_group_members
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can join groups" ON public.ministry_group_members
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave groups" ON public.ministry_group_members
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Auto-update updated_at
CREATE TRIGGER ministry_groups_updated_at
  BEFORE UPDATE ON public.ministry_groups
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
