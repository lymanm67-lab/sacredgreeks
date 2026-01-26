import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Landmark, BookOpen, Calendar, CheckCircle2, Circle, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { useNavigationProgress } from '@/hooks/use-navigation-progress';
import { cn } from '@/lib/utils';

interface JourneyStep {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  progressKey: 'proofCourse' | 'guildTraining' | 'faithAuthority' | 'journey';
  totalModules: number;
  color: string;
  glowColor: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'proof',
    title: 'P.R.O.O.F. Course',
    shortTitle: 'PROOF',
    description: 'Biblical framework for Greek life',
    href: '/proof-course',
    icon: <Target className="w-5 h-5" />,
    progressKey: 'proofCourse',
    totalModules: 5,
    color: 'from-amber-500 to-orange-500',
    glowColor: 'shadow-amber-500/30',
  },
  {
    id: 'guild',
    title: 'Ancient Guild Training',
    shortTitle: 'Guild',
    description: "Jesus & Paul's trade associations",
    href: '/ancient-guild-training',
    icon: <Landmark className="w-5 h-5" />,
    progressKey: 'guildTraining',
    totalModules: 10,
    color: 'from-orange-500 to-red-500',
    glowColor: 'shadow-orange-500/30',
  },
  {
    id: 'faith',
    title: 'Faith & Authority',
    shortTitle: 'Faith',
    description: 'Power of belief teaching',
    href: '/faith-authority',
    icon: <BookOpen className="w-5 h-5" />,
    progressKey: 'faithAuthority',
    totalModules: 5,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'shadow-purple-500/30',
  },
  {
    id: 'journey',
    title: '30-Day Journey',
    shortTitle: '30 Days',
    description: 'Daily spiritual growth',
    href: '/journey',
    icon: <Calendar className="w-5 h-5" />,
    progressKey: 'journey',
    totalModules: 30,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'shadow-blue-500/30',
  },
];

export function LearningJourneyTimeline() {
  const { progressData, isLoading } = useNavigationProgress();

  if (isLoading) {
    return (
      <Card className="border border-border bg-background/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading progress...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getProgress = (step: JourneyStep) => {
    if (!progressData) return 0;
    return progressData[step.progressKey] || 0;
  };

  const getCompletedModules = (step: JourneyStep) => {
    const progress = getProgress(step);
    return Math.round((progress / 100) * step.totalModules);
  };

  const isComplete = (step: JourneyStep) => getProgress(step) >= 100;
  const isStarted = (step: JourneyStep) => getProgress(step) > 0;

  const totalProgress = JOURNEY_STEPS.reduce((acc, step) => acc + getProgress(step), 0) / JOURNEY_STEPS.length;
  const allComplete = JOURNEY_STEPS.every(isComplete);

  return (
    <Card className="relative overflow-hidden border border-border bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Learning Journey
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {Math.round(totalProgress)}% Complete
            </span>
            {allComplete && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center"
              >
                <Trophy className="w-3.5 h-3.5 text-white" />
              </motion.div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall Progress Bar */}
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 via-purple-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted hidden md:block" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {JOURNEY_STEPS.map((step, index) => {
              const progress = getProgress(step);
              const completed = isComplete(step);
              const started = isStarted(step);
              const completedModules = getCompletedModules(step);

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={step.href} className="block group">
                    <div 
                      className={cn(
                        "relative p-3 rounded-xl border transition-all duration-300",
                        completed 
                          ? "bg-green-500/10 border-green-500/30 hover:border-green-500/50" 
                          : started
                            ? "bg-primary/5 border-primary/20 hover:border-primary/40"
                            : "bg-muted/30 border-border hover:border-primary/30"
                      )}
                    >
                      {/* Status Icon */}
                      <div className="flex items-center justify-between mb-2">
                        <div 
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                            completed
                              ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                              : started
                                ? `bg-gradient-to-br ${step.color} text-white shadow-lg ${step.glowColor}`
                                : "bg-muted text-muted-foreground"
                          )}
                        >
                          {completed ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            step.icon
                          )}
                        </div>
                        
                        {!completed && started && (
                          <span className="text-xs font-medium text-primary">
                            {progress}%
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold text-sm text-foreground mb-1 truncate">
                        {step.shortTitle}
                      </h4>

                      {/* Progress Indicator */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(step.totalModules, 5) }).map((_, i) => {
                          const moduleIndex = step.totalModules > 5 
                            ? Math.floor(i * (step.totalModules / 5))
                            : i;
                          const isModuleComplete = completedModules > moduleIndex;
                          
                          return (
                            <div
                              key={i}
                              className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                isModuleComplete
                                  ? completed ? "bg-green-500" : "bg-primary"
                                  : "bg-muted"
                              )}
                            />
                          );
                        })}
                        {step.totalModules > 5 && (
                          <span className="text-[10px] text-muted-foreground ml-1">
                            +{step.totalModules - 5}
                          </span>
                        )}
                      </div>

                      {/* Modules Count */}
                      <p className="text-xs text-muted-foreground mt-1">
                        {completedModules}/{step.totalModules} modules
                      </p>

                      {/* Hover Arrow */}
                      <ArrowRight 
                        className="absolute bottom-3 right-3 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Start Hint */}
        {totalProgress === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-2"
          >
            <p className="text-sm text-muted-foreground">
              Start with the <Link to="/proof-course" className="text-primary hover:underline font-medium">P.R.O.O.F. Course</Link> to begin your journey
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
