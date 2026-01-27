import { motion } from "framer-motion";
import { Flame, Target, Sparkles, ChevronRight, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useGamification } from "@/hooks/use-gamification";
import {
  BookOpen,
  Award,
  GraduationCap,
  Trophy,
  Brain,
  Heart,
  Shield,
  Star,
  Crown,
} from "lucide-react";

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

const MOTIVATIONAL_MESSAGES = [
  { threshold: 0, message: "Every journey begins with a single step. Start yours today!", emoji: "🌱" },
  { threshold: 20, message: "You're building momentum! Keep going!", emoji: "🔥" },
  { threshold: 40, message: "Halfway there! Your dedication is inspiring!", emoji: "⭐" },
  { threshold: 60, message: "Almost there! The finish line is in sight!", emoji: "🏃" },
  { threshold: 80, message: "So close! One more push to level up!", emoji: "🚀" },
  { threshold: 95, message: "You're about to level up! Just a bit more!", emoji: "🎉" },
];

export const NextLevelMotivation = () => {
  const { stats, achievements, allAchievements, levelProgress, pointsToNextLevel } = useGamification();

  if (!stats) return null;

  // Get unlocked achievement IDs
  const earnedIds = new Set(achievements.map((a) => a.achievement_id));

  // Find achievements close to being unlocked (within 50 points of user's total)
  const nearbyAchievements = allAchievements
    .filter((a) => !earnedIds.has(a.id))
    .filter((a) => a.points_required <= stats.total_points + 50)
    .sort((a, b) => a.points_required - b.points_required)
    .slice(0, 3);

  // Get motivational message based on level progress
  const motivationalMessage = [...MOTIVATIONAL_MESSAGES]
    .reverse()
    .find((m) => levelProgress >= m.threshold) || MOTIVATIONAL_MESSAGES[0];

  // Calculate next level number
  const nextLevel = stats.current_level + 1;

  return (
    <div className="space-y-4">
      {/* Motivational Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/30">
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 text-primary" />
            </motion.div>
            <h3 className="text-lg font-bold text-primary">Level Up Challenge</h3>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-6 h-6 text-primary" />
            </motion.div>
          </div>
          
          <p className="text-2xl mb-2">
            <span className="mr-2">{motivationalMessage.emoji}</span>
            {motivationalMessage.message}
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.current_level}</div>
              <div className="text-xs text-muted-foreground">Current Level</div>
            </div>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ChevronRight className="w-8 h-8 text-muted-foreground" />
            </motion.div>
            <div className="text-center">
              <motion.div 
                className="text-3xl font-bold text-secondary"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {nextLevel}
              </motion.div>
              <div className="text-xs text-muted-foreground">Next Level</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Progress to Level {nextLevel}</span>
              <span className="font-semibold text-primary">{pointsToNextLevel} pts to go</span>
            </div>
            <Progress value={levelProgress} className="h-3 bg-muted" />
          </div>
        </Card>
      </motion.div>

      {/* Nearby Achievements */}
      {nearbyAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Achievements Within Reach</h4>
            </div>
            
            <div className="space-y-3">
              {nearbyAchievements.map((achievement, index) => {
                const Icon = iconMap[achievement.icon] || Award;
                const pointsNeeded = Math.max(0, achievement.points_required - stats.total_points);
                const progress = pointsNeeded === 0 ? 100 : Math.min(100, ((stats.total_points / achievement.points_required) * 100));
                
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-sm truncate">{achievement.title}</h5>
                        <Badge variant="outline" className="text-xs ml-2 shrink-0">
                          {pointsNeeded === 0 ? "Ready!" : `${pointsNeeded} pts away`}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{achievement.description}</p>
                      <Progress value={progress} className="h-1.5 mt-2" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions to Earn Points */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4 bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-secondary" />
            <h4 className="font-semibold text-secondary">Ways to Earn Points</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {[
              { action: "Daily Devotional", points: "+10 pts", icon: BookOpen },
              { action: "Prayer Journal", points: "+10 pts", icon: Heart },
              { action: "Complete Assessment", points: "+20 pts", icon: Target },
              { action: "Study Session", points: "+25 pts", icon: GraduationCap },
            ].map((item, index) => (
              <motion.div
                key={item.action}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="flex items-center gap-2 p-2 rounded-lg bg-background/50"
              >
                <item.icon className="w-4 h-4 text-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{item.action}</p>
                  <p className="text-xs text-secondary font-bold">{item.points}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
