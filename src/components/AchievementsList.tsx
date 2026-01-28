import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGamification } from "@/hooks/use-gamification";
import { useMicroCelebration } from "@/hooks/use-micro-celebration";
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
  Sparkles,
  Share2,
  X,
  Landmark,
  Scroll,
  Church,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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
  Landmark,
  Scroll,
  Church,
};

const achievementColors: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
  milestone: { bg: "from-amber-500/20 to-yellow-500/20", border: "border-amber-500/40", icon: "bg-gradient-to-br from-amber-500 to-yellow-500", glow: "shadow-amber-500/30" },
  streak: { bg: "from-orange-500/20 to-red-500/20", border: "border-orange-500/40", icon: "bg-gradient-to-br from-orange-500 to-red-500", glow: "shadow-orange-500/30" },
  learning: { bg: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/40", icon: "bg-gradient-to-br from-blue-500 to-cyan-500", glow: "shadow-blue-500/30" },
  community: { bg: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/40", icon: "bg-gradient-to-br from-purple-500 to-pink-500", glow: "shadow-purple-500/30" },
  special: { bg: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/40", icon: "bg-gradient-to-br from-emerald-500 to-teal-500", glow: "shadow-emerald-500/30" },
  assessment: { bg: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/40", icon: "bg-gradient-to-br from-amber-500 to-orange-500", glow: "shadow-amber-500/30" },
  devotional: { bg: "from-indigo-500/20 to-blue-500/20", border: "border-indigo-500/40", icon: "bg-gradient-to-br from-indigo-500 to-blue-500", glow: "shadow-indigo-500/30" },
  prayer: { bg: "from-teal-500/20 to-emerald-500/20", border: "border-teal-500/40", icon: "bg-gradient-to-br from-teal-500 to-emerald-500", glow: "shadow-teal-500/30" },
  study: { bg: "from-purple-500/20 to-violet-500/20", border: "border-purple-500/40", icon: "bg-gradient-to-br from-purple-500 to-violet-500", glow: "shadow-purple-500/30" },
  service: { bg: "from-rose-500/20 to-pink-500/20", border: "border-rose-500/40", icon: "bg-gradient-to-br from-rose-500 to-pink-500", glow: "shadow-rose-500/30" },
  bible: { bg: "from-cyan-500/20 to-sky-500/20", border: "border-cyan-500/40", icon: "bg-gradient-to-br from-cyan-500 to-sky-500", glow: "shadow-cyan-500/30" },
  training: { bg: "from-green-500/20 to-emerald-500/20", border: "border-green-500/40", icon: "bg-gradient-to-br from-green-500 to-emerald-500", glow: "shadow-green-500/30" },
  default: { bg: "from-primary/20 to-secondary/20", border: "border-primary/40", icon: "bg-gradient-to-br from-primary to-secondary", glow: "shadow-primary/30" },
};

export const AchievementsList = () => {
  const { allAchievements, achievements, achievementsLoading } = useGamification();
  const { celebrateAchievement } = useMicroCelebration();
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);

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

  const handleAchievementClick = (achievementId: string) => {
    setSelectedAchievement(selectedAchievement === achievementId ? null : achievementId);
    celebrateAchievement();
  };

  const handleShare = (achievement: { title: string; description: string }) => {
    const text = `🏆 I earned the "${achievement.title}" achievement! ${achievement.description}`;
    if (navigator.share) {
      navigator.share({ title: "Achievement Unlocked!", text });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Achievement copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">
            Unlocked Achievements ({achievements.length})
          </h3>
        </div>
        {achievements.length === 0 ? (
          <Card className="p-8 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground">
              Complete activities to unlock your first achievement!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((userAchievement, index) => {
              const achievement = userAchievement.achievements;
              const Icon = iconMap[achievement.icon] || Award;
              const colors = achievementColors[achievement.achievement_type] || achievementColors.default;
              const isSelected = selectedAchievement === userAchievement.id;
              
              return (
                <motion.div
                  key={userAchievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <Card
                    onClick={() => handleAchievementClick(userAchievement.id)}
                    className={`p-4 cursor-pointer transition-all duration-300 bg-gradient-to-br ${colors.bg} ${colors.border} hover:scale-[1.02] ${isSelected ? `shadow-lg ${colors.glow}` : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div 
                        className="flex-shrink-0"
                        animate={isSelected ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={`w-12 h-12 rounded-lg ${colors.icon} flex items-center justify-center shadow-lg ${colors.glow}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {achievement.achievement_type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(userAchievement.earned_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Actions */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-border/50"
                        >
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(achievement);
                              }}
                            >
                              <Share2 className="w-4 h-4" />
                              Share
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAchievement(null);
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-center text-muted-foreground mt-2">
                            🎉 Earned on {new Date(userAchievement.earned_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">
            Locked Achievements ({allAchievements.length - achievements.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAchievements
            .filter((a) => !earnedIds.has(a.id))
            .map((achievement, index) => {
              const Icon = iconMap[achievement.icon] || Award;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className="p-4 opacity-60 hover:opacity-80 transition-all duration-300 hover:scale-[1.01]"
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
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs capitalize">
                            {achievement.achievement_type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {achievement.points_required} pts
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
