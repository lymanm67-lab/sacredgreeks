-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to send referral reward email
CREATE OR REPLACE FUNCTION public.send_referral_reward_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  referrer_email TEXT;
  referrer_name TEXT;
  referred_name TEXT;
  function_url TEXT;
  supabase_url TEXT;
  anon_key TEXT;
BEGIN
  -- Only proceed if status changed to 'converted'
  IF NEW.status = 'converted' AND (OLD.status IS NULL OR OLD.status != 'converted') THEN
    
    -- Get referrer information
    SELECT p.email, COALESCE(p.full_name, 'Member') 
    INTO referrer_email, referrer_name
    FROM public.profiles p
    WHERE p.id = NEW.referrer_id;
    
    -- Get referred user information
    SELECT COALESCE(p.full_name, 'New Member')
    INTO referred_name
    FROM public.profiles p
    WHERE p.id = NEW.referred_user_id;
    
    -- Only send if we have the referrer's email
    IF referrer_email IS NOT NULL THEN
      -- Get Supabase configuration from vault
      supabase_url := current_setting('app.settings.api_external_url', true);
      anon_key := current_setting('app.settings.service_role_key', true);
      
      -- Construct the edge function URL
      function_url := supabase_url || '/functions/v1/send-referral-reward-email';
      
      -- Make async HTTP request to edge function
      PERFORM net.http_post(
        url := function_url,
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || anon_key
        ),
        body := jsonb_build_object(
          'referrerEmail', referrer_email,
          'referrerName', referrer_name,
          'referredName', referred_name,
          'rewardPoints', NEW.reward_earned
        )
      );
      
      RAISE LOG 'Referral reward email queued for %', referrer_email;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on referrals table
DROP TRIGGER IF EXISTS on_referral_converted ON public.referrals;
CREATE TRIGGER on_referral_converted
  AFTER UPDATE ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.send_referral_reward_notification();