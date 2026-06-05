
DROP POLICY IF EXISTS "Authenticated users can create OG cards" ON public.og_share_cards;

CREATE POLICY "Authenticated users can create valid OG cards"
ON public.og_share_cards
FOR INSERT
TO authenticated
WITH CHECK (
  content_type IN ('certificate','assessment','prayer','devotional','symbol','article','testimony','share')
  AND length(content_id) BETWEEN 1 AND 200
  AND length(title) BETWEEN 1 AND 300
  AND (description IS NULL OR length(description) <= 1000)
  AND (image_url IS NULL OR length(image_url) <= 2000)
  AND (share_url IS NULL OR length(share_url) <= 2000)
);
