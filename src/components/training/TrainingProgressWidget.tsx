import { motion } from "framer-motion";
import { CheckCircle2, Clock, Trophy, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TrainingProgressWidgetProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  totalModules: number;
  completedModules: number;
  href: string;
  accentColor?: string;
  className?: string;
}

export function TrainingProgressWidget({
  title,
  description,
  icon,
  progress,
  totalModules,
  completedModules,
  href,
  accentColor = "amber",
  className,
}: TrainingProgressWidgetProps) {
  const isComplete = progress >= 100;
  const hasStarted = completedModules > 0;

  const colorVariants: Record<string, { gradient: string; border: string; glow: string; text: string }> = {
    amber: {
      gradient: "from-amber-500 to-orange-500",
      border: "border-amber-500/30 hover:border-amber-500/50",
      glow: "shadow-amber-500/20",
      text: "text-amber-400",
    },
    purple: {
      gradient: "from-purple-500 to-pink-500",
      border: "border-purple-500/30 hover:border-purple-500/50",
      glow: "shadow-purple-500/20",
      text: "text-purple-400",
    },
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      border: "border-blue-500/30 hover:border-blue-500/50",
      glow: "shadow-blue-500/20",
      text: "text-blue-400",
    },
    green: {
      gradient: "from-green-500 to-emerald-500",
      border: "border-green-500/30 hover:border-green-500/50",
      glow: "shadow-green-500/20",
      text: "text-green-400",
    },
    rose: {
      gradient: "from-rose-500 to-pink-500",
      border: "border-rose-500/30 hover:border-rose-500/50",
      glow: "shadow-rose-500/20",
      text: "text-rose-400",
    },
  };

  const colors = colorVariants[accentColor] || colorVariants.amber;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          colors.border,
          isComplete && `shadow-lg ${colors.glow}`,
          className
        )}
      >
        {/* Subtle gradient background */}
        <div className={cn(
          "absolute inset-0 opacity-5 bg-gradient-to-br",
          colors.gradient
        )} />

        {/* Completion badge */}
        {isComplete && (
          <div className="absolute top-3 right-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cn(
                "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center",
                colors.gradient
              )}
            >
              <Trophy className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        )}

        <CardContent className="relative p-5">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
              "bg-gradient-to-br",
              colors.gradient
            )}>
              {icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate pr-8">{title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>

              {/* Progress section */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={cn("font-medium", colors.text)}>
                    {isComplete ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Complete!
                      </span>
                    ) : hasStarted ? (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        In Progress
                      </span>
                    ) : (
                      "Not Started"
                    )}
                  </span>
                  <span className="text-muted-foreground">
                    {completedModules}/{totalModules} modules
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Progress 
                    value={progress} 
                    className="h-2 flex-1"
                  />
                  <span className="text-xs font-medium text-muted-foreground w-10 text-right">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                  "mt-3 p-0 h-auto font-medium",
                  colors.text,
                  "hover:bg-transparent hover:underline"
                )}
              >
                <Link to={href} className="flex items-center gap-1">
                  {isComplete ? "Review" : hasStarted ? "Continue" : "Start"} Training
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
