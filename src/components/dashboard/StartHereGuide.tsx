import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Shield,
  Library,
  MessageCircle,
  Heart,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  Compass,
  X,
  RotateCcw,
  Sparkles,
  Map,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const START_GUIDE_KEY = "sacred_greeks_start_guide";

interface GuideStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  gradient: string;
  timeEstimate: string;
}

const guideSteps: GuideStep[] = [
  {
    id: "devotional",
    number: 1,
    title: "Read Today's Devotional",
    description: "Start with a daily scripture and reflection written for Greek life.",
    icon: BookOpen,
    href: "/devotional",
    gradient: "from-blue-500 to-indigo-600",
    timeEstimate: "3 min",
  },
  {
    id: "proof",
    number: 2,
    title: "Take the Faith Snapshot",
    description: "A quick assessment to understand where you are in your journey.",
    icon: Shield,
    href: "/snapshot",
    gradient: "from-purple-500 to-violet-600",
    timeEstimate: "5 min",
  },
  {
    id: "mythbuster",
    number: 3,
    title: "Explore Myth Buster",
    description: "Biblical responses to the most common Greek life accusations.",
    icon: Library,
    href: "/myth-buster",
    gradient: "from-amber-500 to-orange-600",
    timeEstimate: "5 min",
  },
  {
    id: "guide",
    number: 4,
    title: "Handle Objections",
    description: "Learn how to respond when family or church challenges your membership.",
    icon: MessageCircle,
    href: "/guide",
    gradient: "from-emerald-500 to-teal-600",
    timeEstimate: "5 min",
  },
  {
    id: "prayer",
    number: 5,
    title: "Visit the Prayer Wall",
    description: "Share a prayer request or support someone in the community.",
    icon: Heart,
    href: "/prayer-wall",
    gradient: "from-rose-500 to-pink-600",
    timeEstimate: "2 min",
  },
  {
    id: "course",
    number: 6,
    title: "Start the P.R.O.O.F. Course",
    description: "Deep-dive training on the biblical framework for Greek life.",
    icon: GraduationCap,
    href: "/proof-course",
    gradient: "from-cyan-500 to-blue-600",
    timeEstimate: "10 min",
  },
];

export function StartHereGuide() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(START_GUIDE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setCompletedSteps(data.completed || []);
        setDismissed(data.dismissed || false);
      } catch {
        // ignore
      }
    }
  }, []);

  const saveState = (completed: string[], isDismissed: boolean) => {
    localStorage.setItem(START_GUIDE_KEY, JSON.stringify({ completed, dismissed: isDismissed }));
  };

  const toggleStep = (stepId: string) => {
    const updated = completedSteps.includes(stepId)
      ? completedSteps.filter((s) => s !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(updated);
    saveState(updated, dismissed);
  };

  const handleDismiss = () => {
    setDismissed(true);
    saveState(completedSteps, true);
  };

  const handleReset = () => {
    setCompletedSteps([]);
    setDismissed(false);
    saveState([], false);
  };

  const progress = (completedSteps.length / guideSteps.length) * 100;
  const allDone = completedSteps.length === guideSteps.length;

  // If dismissed and not all done, show a minimal "re-open" button
  if (dismissed && !allDone) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="gap-2 border-primary/30 hover:border-primary/60"
        >
          <Compass className="w-4 h-4" />
          Show Start Here Guide
        </Button>
      </motion.div>
    );
  }

  // If all done, show completion card
  if (allDone) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">🎉 You've Explored Everything!</h3>
                <p className="text-sm text-muted-foreground">
                  Great job! Keep growing with the P.R.O.O.F. Course and daily devotionals.
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleDismiss} aria-label="Dismiss completion card">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/10 overflow-hidden shadow-lg">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

        <CardContent className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Map className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">Start Here</h2>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                    {completedSteps.length}/{guideSteps.length}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your guided path through the app — tap each step to explore
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8"
                aria-label={isExpanded ? "Collapse guide" : "Expand guide"}
              >
                <motion.div animate={{ rotate: isExpanded ? 0 : -90 }}>
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </motion.div>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleDismiss} className="h-8 w-8" aria-label="Dismiss guide">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completedSteps.length === 0
                ? "Tap a step below to get started"
                : `${completedSteps.length} of ${guideSteps.length} explored`}
            </p>
          </div>

          {/* Steps */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid gap-2 sm:gap-3">
                  {guideSteps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id);
                    const isNext = !isCompleted && completedSteps.length === index;
                    const Icon = step.icon;

                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div
                          className={cn(
                            "group relative rounded-xl border transition-all",
                            isCompleted
                              ? "border-primary/30 bg-primary/5"
                              : isNext
                              ? "border-primary/50 bg-primary/10 shadow-md ring-1 ring-primary/20"
                              : "border-border bg-card hover:border-primary/30"
                          )}
                        >
                          <div className="flex items-center gap-3 p-3 sm:p-4">
                            {/* Step number / check */}
                            <button
                              onClick={() => toggleStep(step.id)}
                              className={cn(
                                "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                                isCompleted
                                  ? "bg-primary text-primary-foreground"
                                  : isNext
                                  ? "bg-gradient-to-br text-white shadow-lg " + step.gradient
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <span className="text-sm font-bold">{step.number}</span>
                              )}
                            </button>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4
                                  className={cn(
                                    "font-semibold text-sm sm:text-base",
                                    isCompleted
                                      ? "text-muted-foreground line-through"
                                      : "text-foreground"
                                  )}
                                >
                                  {step.title}
                                </h4>
                                <span className="text-xs text-muted-foreground hidden sm:inline">
                                  ~{step.timeEstimate}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                                {step.description}
                              </p>
                            </div>

                            {/* Action */}
                            <Link to={step.href} onClick={() => !isCompleted && toggleStep(step.id)}>
                              <Button
                                variant={isNext ? "default" : "ghost"}
                                size="sm"
                                className={cn(
                                  "gap-1 flex-shrink-0",
                                  isNext && "bg-primary hover:bg-primary/90 shadow"
                                )}
                              >
                                {isCompleted ? "Revisit" : isNext ? "Start" : "Go"}
                                <ChevronRight className="w-3 h-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer tip */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Check off steps as you explore — your progress is saved
                  </p>
                  {completedSteps.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs gap-1 h-7">
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
