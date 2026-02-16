-- Add social snippet columns to content_drafts
ALTER TABLE public.content_drafts
ADD COLUMN IF NOT EXISTS twitter_caption text,
ADD COLUMN IF NOT EXISTS instagram_caption text,
ADD COLUMN IF NOT EXISTS hashtags text[],
ADD COLUMN IF NOT EXISTS internal_links text[];