import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGamification } from "@/hooks/use-gamification";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Flame,
  Award,
  GraduationCap,
  Trophy,
  Target,
  Brain,
  Heart,
  Shield,
  Star,
  Crown,
  Lock,
  Users,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { GREEK_COUNCILS } from "@/data/greekOrganizations";

const iconMap: Record<string, any> = {
  BookOpen,
  Flame,
  Award,
  GraduationCap,
  Trophy,
  Target,
  Brain,
  Heart,
  Shield,
  Star,
  Crown,
  Users,
};

interface OrgAchievement {
  id: string;
  achievement_key: string;
  title: string;
  description: string;
  icon: string;
  points_required: number;
  achievement_type: string;
  greek_council: string | null;
}

export const OrgAchievementsList = () => {
  const { user } = useAuth();
  const { achievements } = useGamification();

  const { data: userProfile } = useQuery({
    queryKey: ["user-profile-council", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("greek_council, greek_organization")
        .eq("id", user.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const { data: orgAchievements = [], isLoading } = useQuery({
    queryKey: ["org-achievements", userProfile?.greek_council],
    queryFn: async () => {
      const query = supabase
        .from("achievements")
        .select("*")
        .order("points_required");

      if (userProfile?.greek_council) {
        const { data } = await query.or(`greek_council.eq.${userProfile.greek_council},greek_council.is.null`);
        return (data || []) as OrgAchievement[];
      }
      
      const { data } = await query.is("greek_council", null);
      return (data || []) as OrgAchievement[];
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const earnedIds = new Set(achievements.map((a) => a.achievement_id));
  const councilName = userProfile?.greek_council
    ? GREEK_COUNCILS.find((c) => c.id === userProfile.greek_council)?.name || userProfile.greek_council.toUpperCase()
    : null;

  const councilAchievements = orgAchievements.filter((a) => a.greek_council === userProfile?.greek_council);
  const universalAchievements = orgAchievements.filter((a) => !a.greek_council);

  return (
    <div className="space-y-8">
      {councilName && councilAchievements.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">{councilName} Achievements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {councilAchievements.map((achievement) => {
              const Icon = iconMap[achievement.icon] || Award;
              const isEarned = earnedIds.has(achievement.id);
              return (
                <Card
                  key={achievement.id}
                  className={`p-4 transition-all ${
                    isEarned
                      ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
                      : "opacity-60 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center relative ${
                          isEarned ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            isEarned ? "text-primary-foreground" : "text-muted-foreground"
                          }`}
                        />
                        {!isEarned && (
                          <Lock className="w-3 h-3 absolute -bottom-1 -right-1 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={isEarned ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {achievement.achievement_type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {achievement.points_required} pts
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Community Achievements</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {universalAchievements.map((achievement) => {
            const Icon = iconMap[achievement.icon] || Award;
            const isEarned = earnedIds.has(achievement.id);
            return (
              <Card
                key={achievement.id}
                className={`p-4 transition-all ${
                  isEarned
                    ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
                    : "opacity-60 hover:opacity-80"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center relative ${
                        isEarned ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isEarned ? "text-primary-foreground" : "text-muted-foreground"
                        }`}
                      />
                      {!isEarned && (
                        <Lock className="w-3 h-3 absolute -bottom-1 -right-1 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={isEarned ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {achievement.achievement_type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {achievement.points_required} pts
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
