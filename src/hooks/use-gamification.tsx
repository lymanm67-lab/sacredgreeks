import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useDemoMode } from "@/contexts/DemoModeContext";

// Demo gamification stats
const DEMO_STATS: GamificationStats = {
  id: 'demo-stats',
  user_id: 'demo-user',
  total_points: 450,
  current_level: 5,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// Demo achievements data
const DEMO_ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach-1', achievement_key: 'first_devotional', title: 'First Steps', description: 'Complete your first daily devotional', icon: 'BookOpen', points_required: 10, achievement_type: 'devotional' },
  { id: 'ach-2', achievement_key: 'week_streak', title: 'Faithful Week', description: 'Complete 7 days of devotionals', icon: 'Flame', points_required: 70, achievement_type: 'devotional' },
  { id: 'ach-3', achievement_key: 'first_prayer', title: 'Prayer Warrior', description: 'Add your first prayer to the journal', icon: 'Heart', points_required: 10, achievement_type: 'prayer' },
  { id: 'ach-4', achievement_key: 'assessment_complete', title: 'Self-Aware', description: 'Complete your first P.R.O.O.F. assessment', icon: 'Target', points_required: 20, achievement_type: 'assessment' },
  { id: 'ach-5', achievement_key: 'study_complete', title: 'Scholar', description: 'Complete a study guide session', icon: 'GraduationCap', points_required: 25, achievement_type: 'study' },
  { id: 'ach-6', achievement_key: 'service_logged', title: 'Servant Heart', description: 'Log your first service hours', icon: 'Award', points_required: 15, achievement_type: 'service' },
  { id: 'ach-7', achievement_key: 'bible_search', title: 'Scripture Seeker', description: 'Search for verses in Bible Study', icon: 'Brain', points_required: 10, achievement_type: 'bible' },
  { id: 'ach-8', achievement_key: 'month_streak', title: 'Dedicated Disciple', description: 'Complete 30 days of devotionals', icon: 'Crown', points_required: 300, achievement_type: 'devotional' },
];

const DEMO_USER_ACHIEVEMENTS: UserAchievement[] = [
  { id: 'ua-1', user_id: 'demo-user', achievement_id: 'ach-1', earned_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), achievements: DEMO_ALL_ACHIEVEMENTS[0] },
  { id: 'ua-2', user_id: 'demo-user', achievement_id: 'ach-3', earned_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), achievements: DEMO_ALL_ACHIEVEMENTS[2] },
  { id: 'ua-3', user_id: 'demo-user', achievement_id: 'ach-4', earned_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), achievements: DEMO_ALL_ACHIEVEMENTS[3] },
  { id: 'ua-4', user_id: 'demo-user', achievement_id: 'ach-6', earned_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), achievements: DEMO_ALL_ACHIEVEMENTS[5] },
];

interface GamificationStats {
  id: string;
  user_id: string;
  total_points: number;
  current_level: number;
  created_at: string;
  updated_at: string;
}

interface Achievement {
  id: string;
  achievement_key: string;
  title: string;
  description: string;
  icon: string;
  points_required: number;
  achievement_type: string;
}

interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  achievements: Achievement;
}

export const useGamification = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { isDemoMode } = useDemoMode();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["gamification-stats", user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("user_gamification")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      // Create initial record if doesn't exist
      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from("user_gamification")
          .insert({ user_id: user.id, total_points: 0, current_level: 1 })
          .select()
          .single();

        if (insertError) throw insertError;
        return newData as GamificationStats;
      }

      return data as GamificationStats;
    },
    enabled: !!user,
  });

  const { data: achievements = [], isLoading: achievementsLoading } = useQuery({
    queryKey: ["user-achievements", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("user_achievements")
        .select("*, achievements(*)")
        .eq("user_id", user.id)
        .order("earned_at", { ascending: false });

      if (error) throw error;
      return data as UserAchievement[];
    },
    enabled: !!user,
  });

  const { data: allAchievements = [] } = useQuery({
    queryKey: ["all-achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("points_required");

      if (error) throw error;
      return data as Achievement[];
    },
  });

  const awardPointsMutation = useMutation({
    mutationFn: async ({
      points,
      actionType,
    }: {
      points: number;
      actionType: string;
    }) => {
      if (!user) throw new Error("Must be logged in");

      const { data, error } = await supabase.rpc("award_points", {
        _user_id: user.id,
        _points: points,
        _action_type: actionType,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["gamification-stats"] });
      queryClient.invalidateQueries({ queryKey: ["user-achievements"] });

      // Show notifications
      if (data.level_up) {
        toast.success(`Level Up! You reached level ${data.new_level}!`, {
          duration: 5000,
        });
      }

      if (data.new_achievements && data.new_achievements.length > 0) {
        data.new_achievements.forEach((achievement: any) => {
          toast.success(`Achievement Unlocked: ${achievement.title}!`, {
            description: achievement.description,
            duration: 5000,
          });
        });
      }

      if (data.points_awarded > 0) {
        toast.success(`+${data.points_awarded} points earned!`);
      }
    },
    onError: (error) => {
      console.error("Failed to award points:", error);
    },
  });

  // Use demo data when demo mode is enabled or no real data
  const displayStats = isDemoMode ? DEMO_STATS : (stats || DEMO_STATS);
  const displayAchievements = isDemoMode ? DEMO_USER_ACHIEVEMENTS : (achievements.length > 0 ? achievements : DEMO_USER_ACHIEVEMENTS);
  const displayAllAchievements = allAchievements.length > 0 ? allAchievements : DEMO_ALL_ACHIEVEMENTS;
  const isShowingDemo = isDemoMode || !stats || achievements.length === 0;

  const pointsToNextLevel = displayStats
    ? Math.max(0, (displayStats.current_level * 100) - displayStats.total_points)
    : 0;

  const levelProgress = displayStats
    ? ((displayStats.total_points % 100) / 100) * 100
    : 0;

  return {
    stats: displayStats,
    achievements: displayAchievements,
    allAchievements: displayAllAchievements,
    statsLoading: statsLoading && !isDemoMode,
    achievementsLoading: achievementsLoading && !isDemoMode,
    awardPoints: awardPointsMutation.mutate,
    pointsToNextLevel,
    levelProgress,
    isAuthenticated: !!user,
    isShowingDemo,
  };
};
