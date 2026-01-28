import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Heart, 
  Target, 
  GraduationCap, 
  Scale,
  Crown,
  Eye,
  CheckCircle2, 
  Circle,
  ChevronRight,
  Sparkles,
  Trophy,
  Volume2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useTTS } from "@/hooks/use-tts";
import { useNavigationProgress } from "@/hooks/use-navigation-progress";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ElementType;
  color: string;
  link: string;
  completedKey: string;
  isTraining?: boolean;
  progressKey?: string;
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: "devotional",
    title: "Daily Devotional",
    description: "Start your spiritual journey with today's devotional reading",
    points: 10,
    icon: BookOpen,
    color: "blue",
    link: "/devotional",
    completedKey: "devotionals"
  },
  {
    id: "prayer",
    title: "Prayer Journal",
    description: "Write your first prayer and connect with God",
    points: 10,
    icon: Heart,
    color: "teal",
    link: "/prayer-journal",
    completedKey: "prayers"
  },
  {
    id: "assessment",
    title: "Complete Assessment",
    description: "Take the P.R.O.O.F. assessment to discover your spiritual gifts",
    points: 20,
    icon: Target,
    color: "amber",
    link: "/assessment",
    completedKey: "assessments"
  },
  {
    id: "proof-course",
    title: "P.R.O.O.F. Course",
    description: "Complete all 5 lessons in the biblical framework course",
    points: 50,
    icon: GraduationCap,
    color: "purple",
    link: "/proof-course",
    completedKey: "proofCourse",
    isTraining: true,
    progressKey: "proofCourse"
  },
  {
    id: "greek-life-training",
    title: "Greek Life & Guild Training",
    description: "Complete all 14 modules on trade associations",
    points: 50,
    icon: GraduationCap,
    color: "blue",
    link: "/greek-life-training",
    completedKey: "greekLifeTraining",
    isTraining: true,
    progressKey: "greekLifeTraining"
  },
  {
    id: "faith-authority",
    title: "Faith & Authority",
    description: "Complete all 6 teaching modules",
    points: 70,
    icon: GraduationCap,
    color: "teal",
    link: "/faith-authority",
    completedKey: "faithAuthority",
    isTraining: true,
    progressKey: "faithAuthority"
  },
  {
    id: "stay-or-leave",
    title: "Stay or Leave?",
    description: "Complete all 6 modules in the discernment course",
    points: 60,
    icon: Scale,
    color: "teal",
    link: "/should-you-stay-or-leave",
    completedKey: "stayOrLeave",
    isTraining: true,
    progressKey: "stayOrLeave"
  },
  {
    id: "saints-or-sellouts",
    title: "Saints or Sellouts?",
    description: "Complete all 6 modules in the Saints or Sellouts course",
    points: 60,
    icon: Crown,
    color: "purple",
    link: "/saints-or-sellouts",
    completedKey: "saintsOrSellouts",
    isTraining: true,
    progressKey: "saintsOrSellouts"
  },
  {
    id: "hidden-in-plain-sight",
    title: "Hidden in Plain Sight",
    description: "Complete all 9 modules exploring pagan roots in modern customs",
    points: 200,
    icon: Eye,
    color: "amber",
    link: "/hidden-in-plain-sight",
    completedKey: "hiddenInPlainSight",
    isTraining: true,
    progressKey: "hiddenInPlainSight"
  }
];

const colorClasses: Record<string, { bg: string; border: string; text: string; icon: string; line: string }> = {
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/40", text: "text-blue-500", icon: "bg-blue-500", line: "bg-blue-500" },
  teal: { bg: "bg-teal-500/10", border: "border-teal-500/40", text: "text-teal-500", icon: "bg-teal-500", line: "bg-teal-500" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/40", text: "text-amber-500", icon: "bg-amber-500", line: "bg-amber-500" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/40", text: "text-purple-500", icon: "bg-purple-500", line: "bg-purple-500" },
};

export const PointsRoadmap = () => {
  const { user } = useAuth();
  const { speak, isLoading: ttsLoading, isPlaying, stop } = useTTS();
  const { progressData } = useNavigationProgress();
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const { data: activityCounts } = useQuery({
    queryKey: ['roadmap-activity-counts', user?.id],
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

  const getCompletionStatus = (step: RoadmapStep): boolean => {
    // For training courses, check progress data for 100% completion
    if (step.isTraining && step.progressKey && progressData) {
      const progress = progressData[step.progressKey as keyof typeof progressData];
      return typeof progress === 'number' && progress >= 100;
    }
    // For non-training activities, check activity counts
    if (!activityCounts) return false;
    return (activityCounts[step.completedKey as keyof typeof activityCounts] || 0) > 0;
  };

  const getTrainingProgress = (step: RoadmapStep): number => {
    if (!step.isTraining || !step.progressKey || !progressData) return 0;
    const progress = progressData[step.progressKey as keyof typeof progressData];
    return typeof progress === 'number' ? progress : 0;
  };

  const completedCount = ROADMAP_STEPS.filter(step => getCompletionStatus(step)).length;
  const allCompleted = completedCount === ROADMAP_STEPS.length;

  const generateRoadmapScript = () => {
    const completed = ROADMAP_STEPS.filter(step => getCompletionStatus(step));
    const pending = ROADMAP_STEPS.filter(step => !getCompletionStatus(step));
    
    let script = "Welcome to your Points Roadmap! Let me guide you through earning points and leveling up. ";
    
    if (completed.length > 0) {
      script += `Great job! You've already completed ${completed.length} of ${ROADMAP_STEPS.length} steps. `;
    }
    
    if (pending.length > 0) {
      script += `Here's what you can do next: `;
      pending.forEach((step, index) => {
        script += `Step ${completed.length + index + 1}: ${step.title}. ${step.description}. You'll earn ${step.points} points. `;
      });
    }
    
    if (allCompleted) {
      script += "Congratulations! You've completed all roadmap steps! Keep earning points by repeating these activities daily. ";
    }
    
    script += "Each 100 points earned moves you to the next level. Reach new levels to unlock badges and achievements. Good luck on your spiritual journey!";
    
    return script;
  };

  const handlePlayInstructions = () => {
    if (isPlaying) {
      stop();
    } else {
      speak(generateRoadmapScript());
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
          </motion.div>
          <h4 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Points Roadmap
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            {completedCount}/{ROADMAP_STEPS.length} Complete
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayInstructions}
            disabled={ttsLoading}
            className="gap-1"
          >
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-primary' : ''}`} />
            {isPlaying ? 'Stop' : 'Listen'}
          </Button>
        </div>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-muted" />
        <motion.div 
          className="absolute left-5 top-0 w-0.5 bg-gradient-to-b from-primary to-secondary"
          initial={{ height: 0 }}
          animate={{ height: `${(completedCount / ROADMAP_STEPS.length) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <div className="space-y-3">
          {ROADMAP_STEPS.map((step, index) => {
            const isCompleted = getCompletionStatus(step);
            const colors = colorClasses[step.color];
            const isExpanded = expandedStep === step.id;
            const Icon = step.icon;
            const trainingProgress = getTrainingProgress(step);

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12"
              >
                {/* Step Indicator */}
                <motion.div
                  className={`absolute left-2 w-7 h-7 rounded-full flex items-center justify-center z-10 ${
                    isCompleted ? colors.icon : 'bg-muted'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={isCompleted ? { 
                    boxShadow: ['0 0 0 0 rgba(var(--primary), 0)', '0 0 0 8px rgba(var(--primary), 0.2)', '0 0 0 0 rgba(var(--primary), 0)']
                  } : {}}
                  transition={isCompleted ? { duration: 2, repeat: Infinity } : {}}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground">{index + 1}</span>
                  )}
                </motion.div>

                {/* Step Card */}
                <motion.div
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isCompleted 
                      ? `${colors.bg} ${colors.border}` 
                      : 'bg-background/80 border-border/50 hover:border-primary/30'
                  }`}
                  onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${isCompleted ? colors.icon : 'bg-muted'} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <h5 className={`font-semibold ${isCompleted ? colors.text : 'text-foreground'}`}>
                          {step.title}
                        </h5>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                        {/* Progress bar for training courses */}
                        {step.isTraining && trainingProgress > 0 && !isCompleted && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <motion.div 
                                className={`h-full ${colors.icon} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${trainingProgress}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground font-medium">{trainingProgress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <Badge className={`${colors.bg} ${colors.text} border-0 gap-1`}>
                          <CheckCircle2 className="w-3 h-3" />
                          {step.points} pts earned
                        </Badge>
                      ) : (
                        <Badge className="bg-muted text-muted-foreground">
                          +{step.points} pts
                        </Badge>
                      )}
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-border/50">
                          <a href={step.link}>
                            <Button 
                              size="sm" 
                              className={`w-full ${isCompleted ? '' : 'bg-gradient-to-r from-primary to-secondary'}`}
                              variant={isCompleted ? "outline" : "default"}
                            >
                              {isCompleted ? 'Do Again' : 'Start Now'}
                            </Button>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Trophy */}
        <AnimatePresence>
          {allCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-500/40 text-center"
            >
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-12 h-12 mx-auto text-amber-500 mb-2" />
              </motion.div>
              <h5 className="font-bold text-amber-600">Roadmap Complete!</h5>
              <p className="text-xs text-muted-foreground">You've completed all steps. Keep going to earn more points!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};
