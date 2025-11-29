-- Add Greek organization fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS greek_council text,
ADD COLUMN IF NOT EXISTS greek_organization text,
ADD COLUMN IF NOT EXISTS chapter_name text,
ADD COLUMN IF NOT EXISTS initiation_year integer,
ADD COLUMN IF NOT EXISTS member_status text DEFAULT 'active';

-- Add comment for clarity
COMMENT ON COLUMN public.profiles.greek_council IS 'Council affiliation: NPHC, NPC, IFC, NALFO, NAPA, MGC, Professional, Honor, Local, Other';
COMMENT ON COLUMN public.profiles.greek_organization IS 'Specific fraternity or sorority name';
COMMENT ON COLUMN public.profiles.chapter_name IS 'Chapter designation (e.g., Alpha, Beta Gamma, etc.)';
COMMENT ON COLUMN public.profiles.initiation_year IS 'Year of initiation/crossing';
COMMENT ON COLUMN public.profiles.member_status IS 'active, alumni, associate, honorary';