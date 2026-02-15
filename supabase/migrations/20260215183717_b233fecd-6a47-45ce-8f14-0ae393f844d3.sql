
-- Create founding_members table for the beta program
CREATE TABLE public.founding_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  organization TEXT,
  referral_code TEXT NOT NULL UNIQUE,
  referred_by_code TEXT,
  referral_count INTEGER DEFAULT 0,
  tier TEXT DEFAULT 'founding' CHECK (tier IN ('founding', 'founding_plus', 'founding_elite')),
  is_active BOOLEAN DEFAULT true,
  signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.founding_members ENABLE ROW LEVEL SECURITY;

-- Anyone can see the count (for live counter)
CREATE POLICY "Anyone can count founding members"
  ON public.founding_members FOR SELECT
  USING (true);

-- Users can insert their own record
CREATE POLICY "Users can create their own founding member record"
  ON public.founding_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own record
CREATE POLICY "Users can update their own founding member record"
  ON public.founding_members FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_founding_members_updated_at
  BEFORE UPDATE ON public.founding_members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for referral lookups
CREATE INDEX idx_founding_members_referral_code ON public.founding_members (referral_code);
CREATE INDEX idx_founding_members_user_id ON public.founding_members (user_id);
