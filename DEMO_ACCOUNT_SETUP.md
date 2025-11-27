# Demo Account Setup Guide

This guide walks you through setting up a fully populated demo account for Sacred Greeks.

## Step 1: Create the Demo User Account

1. Go to your Lovable Cloud backend (Database → Authentication)
2. Create a new user with these credentials:
   - **Email**: `demo@sacredgreeks.com`
   - **Password**: `Demo123!`
   - Make sure to confirm the email automatically

3. Copy the User ID (UUID) of the created demo user
4. Replace `DEMO_USER_ID` in the SQL below with the actual UUID

## Step 2: Populate Demo Data

Run the following SQL in your Lovable Cloud backend to populate the demo account with realistic data:

```sql
-- Replace this with the actual demo user UUID
-- Example: '12345678-1234-1234-1234-123456789012'
DO $$
DECLARE
  demo_user_id uuid := 'DEMO_USER_ID'; -- REPLACE THIS
BEGIN

-- Create profile
INSERT INTO public.profiles (id, email, full_name, created_at)
VALUES (demo_user_id, 'demo@sacredgreeks.com', 'Demo User', NOW() - INTERVAL '30 days')
ON CONFLICT (id) DO UPDATE SET full_name = 'Demo User';

-- Initialize gamification stats (Level 8 with good progress)
INSERT INTO public.user_gamification (user_id, total_points, current_level, created_at)
VALUES (demo_user_id, 750, 8, NOW() - INTERVAL '30 days')
ON CONFLICT (user_id) DO UPDATE 
SET total_points = 750, current_level = 8;

-- Add prayer journal entries
INSERT INTO public.prayer_journal (user_id, title, content, prayer_type, answered, created_at) VALUES
(demo_user_id, 'Guidance for Chapter Leadership', 'Praying for wisdom and discernment as I lead our chapter through this semester.', 'guidance', false, NOW() - INTERVAL '2 days'),
(demo_user_id, 'Strength During Finals', 'Lord, grant me focus and peace during final exams.', 'personal', true, NOW() - INTERVAL '15 days'),
(demo_user_id, 'Brotherhood Unity', 'Praying for stronger bonds and authentic relationships within our fraternity.', 'relationships', false, NOW() - INTERVAL '5 days'),
(demo_user_id, 'Service Project Success', 'Thank you for the successful food drive. Praying for continued servant hearts.', 'thanksgiving', true, NOW() - INTERVAL '20 days'),
(demo_user_id, 'Family Health', 'Praying for my father''s recovery from surgery.', 'healing', false, NOW() - INTERVAL '7 days');

-- Add devotional completion records
INSERT INTO public.user_progress (user_id, date, devotional_completed, devotional_notes) VALUES
(demo_user_id, CURRENT_DATE, true, 'Powerful reminder about integrity'),
(demo_user_id, CURRENT_DATE - 1, true, 'Need to work on being more patient'),
(demo_user_id, CURRENT_DATE - 2, true, NULL),
(demo_user_id, CURRENT_DATE - 3, false, NULL),
(demo_user_id, CURRENT_DATE - 4, true, 'This scripture really spoke to me'),
(demo_user_id, CURRENT_DATE - 5, true, NULL),
(demo_user_id, CURRENT_DATE - 6, true, NULL),
(demo_user_id, CURRENT_DATE - 8, true, 'Great application to Greek life'),
(demo_user_id, CURRENT_DATE - 9, true, NULL),
(demo_user_id, CURRENT_DATE - 10, true, NULL);

-- Add daily check-ins
INSERT INTO public.user_daily_check_ins (user_id, date, prayed_today, read_bible, served_others, grateful_for, quick_reflection) VALUES
(demo_user_id, CURRENT_DATE, true, true, false, 'Good friends and supportive brothers', 'Felt closer to God today'),
(demo_user_id, CURRENT_DATE - 1, true, true, true, 'Opportunity to serve at the food bank', 'Service brings joy'),
(demo_user_id, CURRENT_DATE - 2, true, false, false, 'Health and family', NULL),
(demo_user_id, CURRENT_DATE - 4, true, true, false, 'Academic success', 'Need to prioritize prayer more'),
(demo_user_id, CURRENT_DATE - 5, true, true, true, 'Chapter unity', 'Brotherhood is growing stronger');

-- Add community service items
INSERT INTO public.community_service_items (user_id, title, description, hours, event_date, completed, completed_at) VALUES
(demo_user_id, 'Campus Food Drive', 'Organized and led food collection drive for local shelter', 8, CURRENT_DATE - 20, true, NOW() - INTERVAL '20 days'),
(demo_user_id, 'Habitat for Humanity Build', 'Participated in weekend home building project', 12, CURRENT_DATE - 15, true, NOW() - INTERVAL '15 days'),
(demo_user_id, 'Youth Mentoring Program', 'Weekly mentoring sessions with at-risk youth', 6, CURRENT_DATE - 7, true, NOW() - INTERVAL '7 days'),
(demo_user_id, 'Campus Cleanup Day', 'Led chapter in campus beautification project', 4, CURRENT_DATE - 3, true, NOW() - INTERVAL '3 days'),
(demo_user_id, 'Hospital Volunteer', 'Upcoming volunteer shift at children''s hospital', 5, CURRENT_DATE + 3, false, NULL);

-- Add study session completions
INSERT INTO public.study_session_progress (user_id, session_id, completed, notes) VALUES
(demo_user_id, 1, true, 'Great foundation on faith and Greek life'),
(demo_user_id, 2, true, 'The PROOF framework is really helpful'),
(demo_user_id, 3, true, NULL),
(demo_user_id, 4, true, 'Need to practice these scenarios more'),
(demo_user_id, 5, true, 'Learned practical ways to share faith'),
(demo_user_id, 6, true, NULL),
(demo_user_id, 7, true, 'Excellent leadership principles');

-- Add prayer wall requests
INSERT INTO public.prayer_requests (user_id, title, description, request_type, privacy_level, prayer_count) VALUES
(demo_user_id, 'Upcoming Chapter Elections', 'Praying for God''s will in our leadership selection process', 'guidance', 'chapter', 8),
(demo_user_id, 'Mission Trip Planning', 'Our chapter is planning a spring break mission trip. Praying for logistics and funds.', 'general', 'public', 15);

-- Add achievements (assuming these achievement IDs exist)
INSERT INTO public.user_achievements (user_id, achievement_id, earned_at)
SELECT demo_user_id, id, NOW() - INTERVAL '10 days'
FROM public.achievements 
WHERE achievement_key IN ('first_prayer', 'devotional_streak_7', 'service_hours_10')
LIMIT 3
ON CONFLICT DO NOTHING;

-- Add some bookmarks
INSERT INTO public.bookmarks (user_id, bookmark_type, content_json, notes) VALUES
(demo_user_id, 'verse', '{"reference": "Proverbs 3:5-6", "text": "Trust in the Lord with all your heart..."}', 'Perfect for leadership decisions'),
(demo_user_id, 'devotional', '{"title": "Living with Integrity", "date": "2024-01-15"}', 'Want to review this one again');

END $$;
```

## Step 3: Verify Demo Data

After running the SQL:
1. Log in with `demo@sacredgreeks.com` / `Demo123!`
2. Check that all sections have data:
   - Dashboard shows weekly stats
   - Prayer Journal has entries
   - Community Service shows hours
   - Achievements are visible
   - Study progress is tracked

## Demo Account Features

The demo account includes:
- ✅ **30 days of history** - Realistic usage patterns
- ✅ **Level 8** with 750 points - Shows progression
- ✅ **10 completed devotionals** - Active engagement
- ✅ **5 prayer journal entries** - Mix of answered/unanswered
- ✅ **35 service hours** - Across 5 projects
- ✅ **7 study sessions completed** - Significant progress
- ✅ **Daily check-ins** - Shows consistency
- ✅ **3 achievements unlocked** - Gamification visible
- ✅ **2 prayer requests** - Community engagement
- ✅ **Bookmarks saved** - Content curation

## Demo Login Button

A "Try Demo" button has been added to the login page for easy access. Users can click it to automatically fill in the demo credentials.

## Maintenance

To refresh demo data:
1. Delete existing demo user data (but keep the auth account)
2. Re-run the population SQL with the same user_id
3. Demo account resets to initial state

## Security Note

⚠️ **Important**: Change the demo password periodically and monitor for abuse. Consider rate-limiting demo account actions in production.
