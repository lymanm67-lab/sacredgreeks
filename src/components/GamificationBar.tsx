import { Trophy, Star, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGamification } from "@/hooks/use-gamification";
import { Skeleton } from "@/components/ui/skeleton";

export const GamificationBar = () => {
  const { stats, achievements, statsLoading, levelProgress, pointsToNextLevel } =
    useGamification();

  if (statsLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-2 w-full" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
      <div className="flex items-center gap-4">
        {/* Level Badge */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-background rounded-full px-2 py-0.5 border-2 border-primary">
              <span className="text-xs font-bold text-primary">
                {stats.current_level}
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-foreground">
              Level {stats.current_level}
            </span>
            <span className="text-xs text-muted-foreground">
              {pointsToNextLevel} points to next level
            </span>
          </div>
          <Progress value={levelProgress} className="h-2" />
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                {stats.total_points} pts
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4 text-secondary" />
              <span className="text-xs font-medium text-muted-foreground">
                {achievements.length} achievements
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
