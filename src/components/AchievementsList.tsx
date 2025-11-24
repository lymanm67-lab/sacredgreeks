import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGamification } from "@/hooks/use-gamification";
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
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
};

export const AchievementsList = () => {
  const { allAchievements, achievements, achievementsLoading } = useGamification();

  if (achievementsLoading) {
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Unlocked Achievements ({achievements.length})
        </h3>
        {achievements.length === 0 ? (
          <Card className="p-8 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">
              Complete activities to unlock your first achievement!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((userAchievement) => {
              const achievement = userAchievement.achievements;
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <Card
                  key={userAchievement.id}
                  className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {achievement.achievement_type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(userAchievement.earned_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Locked Achievements ({allAchievements.length - achievements.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAchievements
            .filter((a) => !earnedIds.has(a.id))
            .map((achievement) => {
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <Card
                  key={achievement.id}
                  className="p-4 opacity-60 hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center relative">
                        <Icon className="w-6 h-6 text-muted-foreground" />
                        <Lock className="w-3 h-3 absolute -bottom-1 -right-1 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {achievement.achievement_type}
                      </Badge>
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
