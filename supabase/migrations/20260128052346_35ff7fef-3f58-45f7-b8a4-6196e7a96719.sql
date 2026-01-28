-- Drop the restrictive check constraint
ALTER TABLE public.study_session_progress DROP CONSTRAINT study_session_progress_session_id_check;

-- Add a new constraint that allows all valid session ranges
-- 1-5: PROOF Course, 6-15: Guild Training, 16-20: Faith & Authority, 21-24: Foundation, 100+: Myth Buster
ALTER TABLE public.study_session_progress ADD CONSTRAINT study_session_progress_session_id_check 
CHECK (session_id >= 1);