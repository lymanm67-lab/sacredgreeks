-- Add prayer reminder schedule column to push_subscriptions
ALTER TABLE public.push_subscriptions 
ADD COLUMN prayer_reminder_schedule text DEFAULT 'none' CHECK (prayer_reminder_schedule IN ('none', 'daily', 'weekly'));

-- Update existing records to set schedule based on prayer_reminders flag
UPDATE public.push_subscriptions 
SET prayer_reminder_schedule = CASE 
  WHEN prayer_reminders = true THEN 'daily'
  ELSE 'none'
END;