import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { differenceInDays, subDays } from 'date-fns';

export interface EngagementMetrics {
  totalPageViews: number;
  uniqueDays: number;
  avgSessionDuration: number;
  featuresUsed: number;
  prayersCreated: number;
  journeyDaysCompleted: number;
  devotionalsCompleted: number;
  forumActivity: number;
}

export interface EngagementScore {
  score: number; // 0-100
  level: 'champion' | 'active' | 'engaged' | 'casual' | 'at-risk' | 'inactive';
  metrics: EngagementMetrics;
  lastActive: Date | null;
  daysSinceLastActive: number;
  trend: 'improving' | 'stable' | 'declining';
}

const SCORE_WEIGHTS = {
  pageViews: 0.15,
  uniqueDays: 0.20,
  sessionDuration: 0.10,
  featuresUsed: 0.15,
  prayers: 0.10,
  journey: 0.15,
  devotionals: 0.10,
  forum: 0.05,
};

export function useEngagementScore(userId?: string) {
  const { user } = useAuth();
  const targetUserId = userId || user?.id;
  const [engagementScore, setEngagementScore] = useState<EngagementScore | null>(null);
  const [loading, setLoading] = useState(true);

  const calculateScore = useCallback(async () => {
    if (!targetUserId) {
      setLoading(false);
      return;
    }

    try {
      const thirtyDaysAgo = subDays(new Date(), 30);
      
      // Fetch analytics events
      const { data: analyticsEvents } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('user_id', targetUserId)
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Fetch prayer journal entries
      const { data: prayers } = await supabase
        .from('prayer_journal')
        .select('created_at')
        .eq('user_id', targetUserId)
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Fetch journey progress
      const { data: journeyProgress } = await supabase
        .from('journey_progress')
        .select('*')
        .eq('user_id', targetUserId)
        .eq('completed', true);

      // Fetch user progress (devotionals)
      const { data: userProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', targetUserId)
        .gte('date', thirtyDaysAgo.toISOString().split('T')[0]);

      // Fetch forum activity
      const { data: forumDiscussions } = await supabase
        .from('forum_discussions')
        .select('created_at')
        .eq('user_id', targetUserId)
        .gte('created_at', thirtyDaysAgo.toISOString());

      const { data: forumReplies } = await supabase
        .from('forum_replies')
        .select('created_at')
        .eq('user_id', targetUserId)
        .gte('created_at', thirtyDaysAgo.toISOString());

      const events = analyticsEvents || [];
      const pageViews = events.filter(e => e.event_type === 'page_view').length;
      
      // Calculate unique active days
      const uniqueDates = new Set(
        events.map(e => new Date(e.created_at!).toDateString())
      );
      const uniqueDays = uniqueDates.size;

      // Calculate average session duration
      const timeEvents = events.filter(e => e.event_type === 'time_on_page');
      const avgSessionDuration = timeEvents.length > 0
        ? timeEvents.reduce((sum, e) => sum + ((e.event_data as { seconds?: number })?.seconds || 0), 0) / timeEvents.length
        : 0;

      // Count unique features used
      const featureEvents = events.filter(e => e.event_type === 'feature_use');
      const uniqueFeatures = new Set(featureEvents.map(e => (e.event_data as { feature?: string })?.feature));
      const featuresUsed = uniqueFeatures.size;

      // Get counts
      const prayersCreated = prayers?.length || 0;
      const journeyDaysCompleted = journeyProgress?.length || 0;
      const devotionalsCompleted = userProgress?.filter(p => p.devotional_completed)?.length || 0;
      const forumActivity = (forumDiscussions?.length || 0) + (forumReplies?.length || 0);

      // Calculate metrics
      const metrics: EngagementMetrics = {
        totalPageViews: pageViews,
        uniqueDays,
        avgSessionDuration: Math.round(avgSessionDuration),
        featuresUsed,
        prayersCreated,
        journeyDaysCompleted,
        devotionalsCompleted,
        forumActivity,
      };

      // Normalize metrics to 0-100 scale
      const normalizedScores = {
        pageViews: Math.min(pageViews / 100, 1) * 100,
        uniqueDays: Math.min(uniqueDays / 20, 1) * 100,
        sessionDuration: Math.min(avgSessionDuration / 120, 1) * 100,
        featuresUsed: Math.min(featuresUsed / 10, 1) * 100,
        prayers: Math.min(prayersCreated / 10, 1) * 100,
        journey: Math.min(journeyDaysCompleted / 7, 1) * 100,
        devotionals: Math.min(devotionalsCompleted / 20, 1) * 100,
        forum: Math.min(forumActivity / 5, 1) * 100,
      };

      // Calculate weighted score
      const totalScore = 
        normalizedScores.pageViews * SCORE_WEIGHTS.pageViews +
        normalizedScores.uniqueDays * SCORE_WEIGHTS.uniqueDays +
        normalizedScores.sessionDuration * SCORE_WEIGHTS.sessionDuration +
        normalizedScores.featuresUsed * SCORE_WEIGHTS.featuresUsed +
        normalizedScores.prayers * SCORE_WEIGHTS.prayers +
        normalizedScores.journey * SCORE_WEIGHTS.journey +
        normalizedScores.devotionals * SCORE_WEIGHTS.devotionals +
        normalizedScores.forum * SCORE_WEIGHTS.forum;

      // Determine last active
      const allDates = events.map(e => new Date(e.created_at!));
      const lastActive = allDates.length > 0 ? new Date(Math.max(...allDates.map(d => d.getTime()))) : null;
      const daysSinceLastActive = lastActive ? differenceInDays(new Date(), lastActive) : 999;

      // Determine level
      let level: EngagementScore['level'];
      if (daysSinceLastActive > 14) {
        level = 'inactive';
      } else if (daysSinceLastActive > 7) {
        level = 'at-risk';
      } else if (totalScore >= 80) {
        level = 'champion';
      } else if (totalScore >= 60) {
        level = 'active';
      } else if (totalScore >= 40) {
        level = 'engaged';
      } else {
        level = 'casual';
      }

      // Determine trend (compare last 15 days vs previous 15 days)
      const fifteenDaysAgo = subDays(new Date(), 15);
      const recentEvents = events.filter(e => new Date(e.created_at!) >= fifteenDaysAgo);
      const olderEvents = events.filter(e => new Date(e.created_at!) < fifteenDaysAgo);
      
      let trend: EngagementScore['trend'];
      if (recentEvents.length > olderEvents.length * 1.2) {
        trend = 'improving';
      } else if (recentEvents.length < olderEvents.length * 0.8) {
        trend = 'declining';
      } else {
        trend = 'stable';
      }

      setEngagementScore({
        score: Math.round(totalScore),
        level,
        metrics,
        lastActive,
        daysSinceLastActive,
        trend,
      });
    } catch (error) {
      console.error('Error calculating engagement score:', error);
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  useEffect(() => {
    calculateScore();
  }, [calculateScore]);

  return { engagementScore, loading, refresh: calculateScore };
}

// Hook for admin to get all user engagement scores
export function useAllEngagementScores() {
  const [scores, setScores] = useState<Array<{
    userId: string;
    email: string;
    fullName: string;
    score: number;
    level: EngagementScore['level'];
    lastActive: Date | null;
    daysSinceLastActive: number;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllScores = async () => {
      try {
        // Get all profiles
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, email, full_name');

        if (!profiles) {
          setLoading(false);
          return;
        }

        const thirtyDaysAgo = subDays(new Date(), 30);

        // Get analytics for all users
        const { data: allAnalytics } = await supabase
          .from('analytics_events')
          .select('user_id, created_at, event_type')
          .gte('created_at', thirtyDaysAgo.toISOString());

        const userScores = profiles.map(profile => {
          const userEvents = (allAnalytics || []).filter(e => e.user_id === profile.id);
          const pageViews = userEvents.filter(e => e.event_type === 'page_view').length;
          const uniqueDays = new Set(userEvents.map(e => new Date(e.created_at!).toDateString())).size;
          
          const allDates = userEvents.map(e => new Date(e.created_at!));
          const lastActive = allDates.length > 0 ? new Date(Math.max(...allDates.map(d => d.getTime()))) : null;
          const daysSinceLastActive = lastActive ? differenceInDays(new Date(), lastActive) : 999;

          // Simple score calculation
          const score = Math.min(100, Math.round((pageViews / 50 + uniqueDays / 15) * 50));

          let level: EngagementScore['level'];
          if (daysSinceLastActive > 14) level = 'inactive';
          else if (daysSinceLastActive > 7) level = 'at-risk';
          else if (score >= 80) level = 'champion';
          else if (score >= 60) level = 'active';
          else if (score >= 40) level = 'engaged';
          else level = 'casual';

          return {
            userId: profile.id,
            email: profile.email || '',
            fullName: profile.full_name || '',
            score,
            level,
            lastActive,
            daysSinceLastActive,
          };
        });

        setScores(userScores.sort((a, b) => b.score - a.score));
      } catch (error) {
        console.error('Error fetching engagement scores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllScores();
  }, []);

  return { scores, loading };
}
