import { Flame, Trophy, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useStreaks } from "@/hooks/use-streaks";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  compact?: boolean;
  className?: string;
}

export function StreakDisplay({ compact = false, className }: StreakDisplayProps) {
  const { streakData, isLoading, hasEngagedToday, streakAtRisk } = useStreaks();

  if (isLoading) {
    return compact ? (
      <Skeleton className="h-8 w-24" />
    ) : (
      <Card className={className}>
        <CardContent className="p-4">
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full",
        streakAtRisk 
          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse" 
          : hasEngagedToday 
            ? "bg-sacred/10 text-sacred"
            : "bg-muted text-muted-foreground",
        className
      )}>
        <Flame className={cn(
          "w-4 h-4",
          streakData.currentStreak > 0 && "text-orange-500"
        )} />
        <span className="font-bold text-sm">{streakData.currentStreak}</span>
        {streakAtRisk && <AlertTriangle className="w-3 h-3 text-amber-500" />}
      </div>
    );
  }

  return (
    <Card className={cn(
      "overflow-hidden",
      streakAtRisk && "border-amber-500/50",
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <div className="flex items-center gap-2">
              <Flame className={cn(
                "w-6 h-6",
                streakData.currentStreak >= 7 ? "text-orange-500" : "text-muted-foreground"
              )} />
              <span className="text-3xl font-bold">{streakData.currentStreak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            {streakAtRisk && (
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Don't break your streak! Engage today.
              </p>
            )}
            {hasEngagedToday && (
              <p className="text-xs text-sacred">
                ✓ You've engaged today!
              </p>
            )}
          </div>
          <div className="text-right space-y-1">
            <p className="text-xs text-muted-foreground">Best Streak</p>
            <div className="flex items-center gap-1 justify-end">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-lg font-semibold">{streakData.longestStreak}</span>
            </div>
          </div>
        </div>

        {/* Streak visualization */}
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 7 }).map((_, i) => {
            const isActive = i < Math.min(streakData.currentStreak, 7);
            return (
              <div
                key={i}
                className={cn(
                  "flex-1 h-2 rounded-full transition-colors",
                  isActive 
                    ? "bg-gradient-to-r from-orange-500 to-red-500" 
                    : "bg-muted"
                )}
              />
            );
          })}
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
          {streakData.currentStreak >= 7 
            ? "🔥 You're on fire! Keep the momentum!" 
            : `${7 - streakData.currentStreak} more days to your first week!`}
        </p>
      </CardContent>
    </Card>
  );
}
