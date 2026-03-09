import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReadingPlan } from '@/data/bibleReadingPlans';

interface ReadingPlanCardProps {
  plan: ReadingPlan;
  progress?: { currentDay: number; completedDays: number[] };
  onStart?: (planId: string) => void;
  onContinue?: (planId: string, day: number) => void;
  icon?: React.ComponentType<{ className?: string }>;
}

const CATEGORY_STYLES: Record<string, string> = {
  apologetics: 'from-orange-500/10 to-red-500/10 border-orange-500/20',
  identity: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20',
  leadership: 'from-amber-500/10 to-yellow-500/10 border-amber-500/20',
  community: 'from-pink-500/10 to-rose-500/10 border-pink-500/20',
  faith: 'from-sacred/10 to-warm-blue/10 border-sacred/20',
};

export function ReadingPlanCard({ plan, progress, onStart, onContinue, icon: Icon = BookOpen }: ReadingPlanCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isStarted = !!progress;
  const percentComplete = progress ? Math.round((progress.completedDays.length / plan.durationDays) * 100) : 0;
  const isComplete = percentComplete === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "overflow-hidden transition-all hover:shadow-lg bg-gradient-to-br cursor-pointer",
        CATEGORY_STYLES[plan.category] || '',
        isComplete && 'ring-2 ring-green-500/30'
      )} onClick={() => setExpanded(!expanded)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-sacred/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-sacred" />
              </div>
              <Badge variant="outline" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {plan.duration}
              </Badge>
            </div>
            <Badge variant="secondary" className="text-xs capitalize">
              {plan.category}
            </Badge>
          </div>
          <CardTitle className="text-lg leading-tight">{plan.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">{plan.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Progress bar */}
          {isStarted && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Day {progress.currentDay} of {plan.durationDays}</span>
                <span>{percentComplete}%</span>
              </div>
              <Progress value={percentComplete} className="h-2" />
            </div>
          )}

          {/* Key themes */}
          <div className="flex flex-wrap gap-1">
            {plan.keyThemes.slice(0, 3).map((theme, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {theme}
              </Badge>
            ))}
            {plan.keyThemes.length > 3 && (
              <Badge variant="secondary" className="text-xs text-muted-foreground">
                +{plan.keyThemes.length - 3}
              </Badge>
            )}
          </div>

          {/* Expanded readings */}
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 pt-2 border-t border-border/50"
            >
              <p className="text-sm font-medium">Daily Readings:</p>
              <div className="max-h-48 overflow-y-auto space-y-1.5">
                {plan.dailyReadings.map((reading) => {
                  const isDone = progress?.completedDays.includes(reading.day);
                  return (
                    <div key={reading.day} className={cn(
                      "flex items-center gap-2 text-xs p-2 rounded-md",
                      isDone ? "bg-green-500/10" : "bg-muted/50"
                    )}>
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      ) : (
                        <span className="w-3.5 h-3.5 text-center text-muted-foreground shrink-0">{reading.day}</span>
                      )}
                      <span className="font-medium text-foreground">{reading.scripture}</span>
                      <span className="text-muted-foreground truncate">{reading.title}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <Button
            className={cn(
              "w-full gap-2",
              isStarted && !isComplete ? "bg-sacred hover:bg-sacred/90" : ""
            )}
            variant={isStarted ? "default" : "outline"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (isStarted && onContinue) {
                onContinue(plan.id, progress.currentDay);
              } else if (onStart) {
                onStart(plan.id);
              }
            }}
          >
            {isComplete ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Completed! Read Again
              </>
            ) : isStarted ? (
              <>
                <Play className="w-4 h-4" />
                Continue Day {progress.currentDay}
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                Start {plan.durationDays}-Day Plan
                <ChevronRight className="w-3 h-3" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
