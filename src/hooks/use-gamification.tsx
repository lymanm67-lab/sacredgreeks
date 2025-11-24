import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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

  const pointsToNextLevel = stats
    ? Math.max(0, (stats.current_level * 100) - stats.total_points)
    : 0;

  const levelProgress = stats
    ? ((stats.total_points % 100) / 100) * 100
    : 0;

  return {
    stats,
    achievements,
    allAchievements,
    statsLoading,
    achievementsLoading,
    awardPoints: awardPointsMutation.mutate,
    pointsToNextLevel,
    levelProgress,
    isAuthenticated: !!user,
  };
};
