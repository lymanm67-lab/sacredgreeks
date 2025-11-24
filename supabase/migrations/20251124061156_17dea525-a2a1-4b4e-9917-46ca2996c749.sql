-- Add devotional_notes column to user_progress table
ALTER TABLE public.user_progress 
ADD COLUMN devotional_notes TEXT;