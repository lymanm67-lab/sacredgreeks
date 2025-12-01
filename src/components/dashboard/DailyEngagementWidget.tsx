import { useState } from "react";
import { Flame, Sun, ChevronRight, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StreakDisplay } from "./StreakDisplay";
import { QuickMorningMode } from "./QuickMorningMode";
import { MorningNotificationSettings } from "./MorningNotificationSettings";
import { useStreaks } from "@/hooks/use-streaks";
import { cn } from "@/lib/utils";

interface DailyEngagementWidgetProps {
  className?: string;
}

export function DailyEngagementWidget({ className }: DailyEngagementWidgetProps) {
  const { streakData, hasEngagedToday, streakAtRisk } = useStreaks();
  const [showQuickMorning, setShowQuickMorning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <Card className={cn(
      "overflow-hidden",
      streakAtRisk && "ring-2 ring-amber-500/50",
      className
    )}>
      <CardHeader className="pb-2 bg-gradient-to-r from-sacred/5 to-purple-500/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            {getGreeting()}
          </CardTitle>
          <div className="flex items-center gap-2">
            <StreakDisplay compact />
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Notification Settings</DialogTitle>
                </DialogHeader>
                <MorningNotificationSettings />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Streak info */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              streakData.currentStreak > 0 
                ? "bg-gradient-to-br from-orange-500 to-red-500" 
                : "bg-muted"
            )}>
              <Flame className={cn(
                "w-5 h-5",
                streakData.currentStreak > 0 ? "text-white" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <p className="font-semibold">
                {streakData.currentStreak} Day Streak
              </p>
              <p className="text-xs text-muted-foreground">
                {hasEngagedToday 
                  ? "You've engaged today!" 
                  : streakAtRisk 
                    ? "Don't break your streak!" 
                    : "Start your day with God"}
              </p>
            </div>
          </div>
          {!hasEngagedToday && (
            <Button 
              size="sm" 
              onClick={() => setShowQuickMorning(true)}
              className={cn(
                streakAtRisk && "animate-pulse bg-amber-500 hover:bg-amber-600"
              )}
            >
              Start
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>

        {/* Quick Morning Dialog */}
        <Dialog open={showQuickMorning} onOpenChange={setShowQuickMorning}>
          <DialogContent className="max-w-md p-0">
            <QuickMorningMode 
              onComplete={() => {
                setTimeout(() => setShowQuickMorning(false), 2000);
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-muted/30">
            <p className="text-lg font-bold">{streakData.currentStreak}</p>
            <p className="text-[10px] text-muted-foreground">Current</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/30">
            <p className="text-lg font-bold">{streakData.longestStreak}</p>
            <p className="text-[10px] text-muted-foreground">Best</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/30">
            <p className="text-lg font-bold">{hasEngagedToday ? "✓" : "—"}</p>
            <p className="text-[10px] text-muted-foreground">Today</p>
          </div>
        </div>

        {/* Motivation message */}
        {streakData.currentStreak > 0 && (
          <p className="text-xs text-center text-muted-foreground">
            {streakData.currentStreak >= 30 
              ? "🏆 Incredible consistency! You're in the top tier!"
              : streakData.currentStreak >= 7 
                ? "🔥 One week strong! Keep the momentum!"
                : `${7 - streakData.currentStreak} more days to your first week streak!`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
