-- Add new columns for event promotion and merchandise
ALTER TABLE public.speaking_requests
ADD COLUMN event_promotion text,
ADD COLUMN merchandise_sales text,
ADD COLUMN book_table_requested boolean DEFAULT false;