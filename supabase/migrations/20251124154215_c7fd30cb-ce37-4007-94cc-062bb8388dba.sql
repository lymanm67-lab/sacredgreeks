-- Fix search_path for calculate_level function
CREATE OR REPLACE FUNCTION public.calculate_level(points INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Level = floor(points / 100) + 1, capped at 50
  RETURN LEAST(FLOOR(points / 100.0) + 1, 50);
END;
$$;