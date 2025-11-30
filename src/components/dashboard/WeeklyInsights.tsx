import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, Heart, BookOpen, Trophy, Flame } from 'lucide-react';

interface WeeklyStats {
  devotionalsCompleted: number;
  prayersLogged: number;
  studySessionsCompleted: number;
  checkInDays: number;
  totalPoints: number;
  currentStreak: number;
}

// Demo stats for new users
const DEMO_STATS: WeeklyStats = {
  devotionalsCompleted: 3,
  prayersLogged: 5,
  studySessionsCompleted: 2,
  checkInDays: 4,
  totalPoints: 150,
  currentStreak: 3,
};

export function WeeklyInsights() {
  const { user } = useAuth();
  const [stats, setStats] = useState<WeeklyStats>({
    devotionalsCompleted: 0,
    prayersLogged: 0,
    studySessionsCompleted: 0,
    checkInDays: 0,
    totalPoints: 0,
    currentStreak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (user) {
      loadWeeklyStats();
    }
  }, [user]);

  const loadWeeklyStats = async () => {
    try {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

      // Devotionals completed this week
      const { count: devotionalCount } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user!.id)
        .eq('devotional_completed', true)
        .gte('date', sevenDaysAgoStr);

      // Prayers logged this week
      const { count: prayerCount } = await supabase
        .from('prayer_journal')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user!.id)
        .gte('created_at', sevenDaysAgo.toISOString());

      // Study sessions this week
      const { count: studyCount } = await supabase
        .from('study_session_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user!.id)
        .gte('completed_at', sevenDaysAgo.toISOString());

      // Check-in days this week
      const { count: checkInCount } = await supabase
        .from('user_daily_check_ins')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user!.id)
        .gte('date', sevenDaysAgoStr);

      // Get gamification stats
      const { data: gamificationData } = await supabase
        .from('user_gamification')
        .select('total_points')
        .eq('user_id', user!.id)
        .maybeSingle();

      // Calculate current streak
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('date, devotional_completed')
        .eq('user_id', user!.id)
        .order('date', { ascending: false })
        .limit(30);

      let streak = 0;
      if (progressData) {
        const sortedProgress = [...progressData].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        for (let i = 0; i < sortedProgress.length; i++) {
          const progressDate = new Date(sortedProgress[i].date);
          const expectedDate = new Date(today);
          expectedDate.setDate(today.getDate() - i);
          
          if (
            progressDate.toDateString() === expectedDate.toDateString() &&
            sortedProgress[i].devotional_completed
          ) {
            streak++;
          } else {
            break;
          }
        }
      }

      setStats({
        devotionalsCompleted: devotionalCount || 0,
        prayersLogged: prayerCount || 0,
        studySessionsCompleted: studyCount || 0,
        checkInDays: checkInCount || 0,
        totalPoints: gamificationData?.total_points || 0,
        currentStreak: streak,
      });
      
      // Check if user has no activity - show demo data
      const hasNoActivity = 
        (devotionalCount || 0) === 0 && 
        (prayerCount || 0) === 0 && 
        (studyCount || 0) === 0 && 
        (checkInCount || 0) === 0;
      
      if (hasNoActivity) {
        setStats(DEMO_STATS);
        setIsDemo(true);
      }
    } catch (error) {
      console.error('Error loading weekly stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Sign in to see your weekly spiritual growth!</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading your insights...</p>
        </CardContent>
      </Card>
    );
  }

  const insights = [
    {
      label: 'Devotionals',
      value: stats.devotionalsCompleted,
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Prayers Logged',
      value: stats.prayersLogged,
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      label: 'Check-In Days',
      value: stats.checkInDays,
      icon: Calendar,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Current Streak',
      value: stats.currentStreak,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      suffix: ' days',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Insights
          </CardTitle>
          <Badge variant="secondary">
            {isDemo ? 'Sample Data' : 'Last 7 Days'}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {isDemo ? 'Here\'s what your progress could look like' : 'Your spiritual growth summary'}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                    <Icon className={`h-4 w-4 ${insight.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-2xl font-bold">
                      {insight.value}{insight.suffix || ''}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {insight.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Encouragement message */}
        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-center">
            {isDemo ? (
              <span className="text-muted-foreground">
                📊 This is sample data. Complete activities to see your real progress!
              </span>
            ) : stats.devotionalsCompleted >= 5 ? (
              <span className="font-medium text-primary">
                🎉 Amazing consistency this week! Keep it up!
              </span>
            ) : stats.devotionalsCompleted >= 3 ? (
              <span className="font-medium">
                📈 Great progress! You're building strong habits.
              </span>
            ) : (
              <span className="text-muted-foreground">
                Start small, stay consistent. You've got this! 💪
              </span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}