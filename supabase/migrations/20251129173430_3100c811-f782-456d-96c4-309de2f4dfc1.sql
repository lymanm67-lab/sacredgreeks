-- Add affiliation type column to profiles for non-members
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS affiliation_type text DEFAULT 'member';

-- Add comment explaining the column
COMMENT ON COLUMN public.profiles.affiliation_type IS 'Type of affiliation: member, interested, supporter, cautious, parent_pastor';