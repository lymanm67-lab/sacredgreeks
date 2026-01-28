import { motion } from "framer-motion";
import { 
  BookOpen, 
  Heart, 
  Target, 
  GraduationCap, 
  ArrowRight,
  Sparkles,
  Play,
  Trophy,
  Star,
  Landmark,
  Calendar,
  Shield
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/use-gamification";
import { useNavigationProgress } from "@/hooks/use-navigation-progress";
import { useNavigate } from "react-router-dom";

interface NextStepInfo {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  link: string;
  ctaText: string;
  completedKey: string;
  order: number;
  isTraining?: boolean;
  progressKey?: string;
}

const STEPS: NextStepInfo[] = [
  {
    id: "devotional",
    title: "Daily Devotional",
    description: "Start your day with spiritual wisdom and reflection",
    points: 10,
    icon: BookOpen,
    color: "text-blue-500",
    bgGradient: "from-blue-500 to-cyan-500",
    link: "/devotional",
    ctaText: "Read Devotional",
    completedKey: "devotionals",
    order: 1
  },
  {
    id: "prayer",
    title: "Prayer Journal",
    description: "Connect with God through prayer and reflection",
    points: 10,
    icon: Heart,
    color: "text-teal-500",
    bgGradient: "from-teal-500 to-emerald-500",
    link: "/prayer-journal",
    ctaText: "Write Prayer",
    completedKey: "prayers",
    order: 2
  },
  {
    id: "assessment",
    title: "Complete Assessment",
    description: "Discover your spiritual gifts with the P.R.O.O.F. assessment",
    points: 20,
    icon: Target,
    color: "text-amber-500",
    bgGradient: "from-amber-500 to-orange-500",
    link: "/assessment",
    ctaText: "Take Assessment",
    completedKey: "assessments",
    order: 3
  },
  {
    id: "proof-course",
    title: "P.R.O.O.F. Course",
    description: "Biblical framework for Greek life - 5 core modules",
    points: 50,
    icon: Target,
    color: "text-emerald-700",
    bgGradient: "from-emerald-700 to-emerald-800",
    link: "/proof-course",
    ctaText: "Continue Course",
    completedKey: "proofCourse",
    order: 4,
    isTraining: true,
    progressKey: "proofCourse"
  },
  {
    id: "greek-life-training",
    title: "Greek Life & Guild Training",
    description: "Jesus & Paul's trade associations - 14 modules",
    points: 50,
    icon: Landmark,
    color: "text-violet-500",
    bgGradient: "from-violet-500 to-purple-500",
    link: "/greek-life-training",
    ctaText: "Continue Training",
    completedKey: "greekLifeTraining",
    order: 5,
    isTraining: true,
    progressKey: "greekLifeTraining"
  },
  {
    id: "faith-authority",
    title: "Faith & Authority",
    description: "Power of belief teaching - 5 modules",
    points: 50,
    icon: Shield,
    color: "text-purple-500",
    bgGradient: "from-purple-500 to-pink-500",
    link: "/faith-authority",
    ctaText: "Continue Training",
    completedKey: "faithAuthority",
    order: 6,
    isTraining: true,
    progressKey: "faithAuthority"
  },
  {
    id: "journey",
    title: "30-Day Journey",
    description: "Daily spiritual growth challenge",
    points: 30,
    icon: Calendar,
    color: "text-blue-500",
    bgGradient: "from-blue-500 to-indigo-500",
    link: "/journey",
    ctaText: "Continue Journey",
    completedKey: "journey",
    order: 7,
    isTraining: true,
    progressKey: "journey"
  }
];

export const NextStepCard = () => {
  const { user } = useAuth();
  const { stats, levelProgress, pointsToNextLevel } = useGamification();
  const { progressData } = useNavigationProgress();
  const navigate = useNavigate();

  const { data: activityCounts } = useQuery({
    queryKey: ['next-step-activity-counts', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const [assessments, devotionals, prayers, studySessions] = await Promise.all([
        supabase.from('assessment_submissions').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('user_progress').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('devotional_completed', true),
        supabase.from('prayer_journal').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('study_session_progress').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      ]);
      
      return {
        assessments: assessments.count || 0,
        devotionals: devotionals.count || 0,
        prayers: prayers.count || 0,
        studySessions: studySessions.count || 0,
      };
    },
    enabled: !!user,
  });

  const getCompletionStatus = (step: NextStepInfo): boolean => {
    // For training courses, check progress data
    if (step.isTraining && step.progressKey && progressData) {
      const progress = progressData[step.progressKey as keyof typeof progressData];
      return progress >= 100;
    }
    // For non-training activities, check activity counts
    if (!activityCounts) return false;
    return (activityCounts[step.completedKey as keyof typeof activityCounts] || 0) > 0;
  };

  const getTrainingProgress = (step: NextStepInfo): number => {
    if (!step.isTraining || !step.progressKey || !progressData) return 0;
    return progressData[step.progressKey as keyof typeof progressData] || 0;
  };

  // Find the next incomplete step (in order)
  const nextStep = STEPS.sort((a, b) => a.order - b.order).find(step => !getCompletionStatus(step));
  
  // If all complete, suggest the highest-point repeatable action (non-training)
  const allComplete = STEPS.every(step => getCompletionStatus(step));
  const repeatableSteps = STEPS.filter(s => !s.isTraining);
  const displayStep = nextStep || repeatableSteps.sort((a, b) => b.points - a.points)[0];
  
  // Get progress for training items
  const displayProgress = displayStep.isTraining ? getTrainingProgress(displayStep) : 0;
  
  const Icon = displayStep.icon;
  const currentLevel = stats?.current_level || 1;
  const nextLevel = currentLevel + 1;

  const handleStart = () => {
    navigate(displayStep.link);
  };

  return (
    <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-2xl" />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {allComplete ? "Keep Earning Points!" : "Your Next Step"}
          </h3>
          {allComplete && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <Trophy className="w-3 h-3 mr-1" />
              All Complete!
            </Badge>
          )}
        </div>

        {/* Level Progress Mini-Bar */}
        <div className="mb-6 p-3 rounded-lg bg-muted/50 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold">Level {currentLevel}</span>
                <span className="text-xs text-muted-foreground ml-2">→ Level {nextLevel}</span>
              </div>
            </div>
            <Badge variant="outline" className="text-primary border-primary/30">
              {pointsToNextLevel} pts to go
            </Badge>
          </div>
          <Progress value={levelProgress} className="h-2" />
        </div>

        {/* Main Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative p-5 rounded-2xl bg-gradient-to-br ${displayStep.bgGradient} shadow-lg`}
        >
          {/* Animated Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-white/20"
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-white">{displayStep.title}</h4>
                  <p className="text-white/80 text-sm">{displayStep.description}</p>
                  {displayStep.isTraining && displayProgress > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-white rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${displayProgress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <span className="text-xs text-white font-medium">{displayProgress}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm text-base px-4 py-1">
                <Sparkles className="w-4 h-4 mr-1" />
                +{displayStep.points} points
              </Badge>
              
              <Button 
                size="lg"
                onClick={handleStart}
                className="bg-white text-foreground hover:bg-white/90 font-bold shadow-lg gap-2 group"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {displayStep.ctaText}
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {STEPS.map((step, index) => {
            const isCompleted = getCompletionStatus(step);
            const isCurrent = step.id === displayStep.id;
            return (
              <motion.div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-all ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-primary to-secondary' 
                    : isCurrent 
                      ? 'bg-primary/50 ring-2 ring-primary ring-offset-2 ring-offset-background'
                      : 'bg-muted'
                }`}
                whileHover={{ scale: 1.3 }}
                title={step.title}
              />
            );
          })}
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-2">
          {STEPS.filter(step => getCompletionStatus(step)).length} of {STEPS.length} steps complete
        </p>
      </div>
    </Card>
  );
};
