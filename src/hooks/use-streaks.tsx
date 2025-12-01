import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastEngagementDate: string | null;
  streakUpdatedAt: string | null;
}

interface UseStreaksReturn {
  streakData: StreakData;
  isLoading: boolean;
  updateStreak: () => Promise<void>;
  hasEngagedToday: boolean;
  streakAtRisk: boolean;
}

export function useStreaks(): UseStreaksReturn {
  const { user } = useAuth();
  const { toast } = useToast();
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastEngagementDate: null,
    streakUpdatedAt: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStreak = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_gamification')
        .select('current_streak, longest_streak, last_engagement_date, streak_updated_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setStreakData({
          currentStreak: data.current_streak || 0,
          longestStreak: data.longest_streak || 0,
          lastEngagementDate: data.last_engagement_date,
          streakUpdatedAt: data.streak_updated_at,
        });
      }
    } catch (error) {
      console.error('Error fetching streak:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  const updateStreak = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('update_user_streak', {
        _user_id: user.id,
      });

      if (error) throw error;

      if (data && typeof data === 'object' && !Array.isArray(data)) {
        const result = data as { 
          current_streak: number; 
          longest_streak: number; 
          streak_broken: boolean; 
          last_engagement_date: string;
        };
        const newStreak = result.current_streak;
        const wasStreakBroken = result.streak_broken;
        const oldStreak = streakData.currentStreak;

        setStreakData({
          currentStreak: newStreak,
          longestStreak: result.longest_streak,
          lastEngagementDate: result.last_engagement_date,
          streakUpdatedAt: new Date().toISOString(),
        });

        // Show celebration toast for milestones
        if (newStreak > oldStreak && newStreak > 0) {
          if (newStreak === 7) {
            toast({
              title: "🔥 1 Week Streak!",
              description: "You've engaged for 7 days straight! Keep it up!",
            });
          } else if (newStreak === 30) {
            toast({
              title: "🔥🔥 30 Day Streak!",
              description: "Incredible! A full month of daily engagement!",
            });
          } else if (newStreak % 10 === 0) {
            toast({
              title: `🔥 ${newStreak} Day Streak!`,
              description: "Amazing consistency! You're building great habits!",
            });
          }
        }

        if (wasStreakBroken) {
          toast({
            title: "New streak started!",
            description: "Welcome back! Let's build a new streak together.",
          });
        }
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  }, [user, streakData.currentStreak, toast]);

  // Check if user has engaged today
  const hasEngagedToday = streakData.lastEngagementDate === new Date().toISOString().split('T')[0];

  // Check if streak is at risk (last engagement was yesterday)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  const streakAtRisk = streakData.lastEngagementDate === yesterdayStr && !hasEngagedToday;

  return {
    streakData,
    isLoading,
    updateStreak,
    hasEngagedToday,
    streakAtRisk,
  };
}
