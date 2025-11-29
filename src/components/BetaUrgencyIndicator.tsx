import { useState, useEffect } from 'react';
import { Users, Flame, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BetaUrgencyIndicatorProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export const BetaUrgencyIndicator = ({ variant = 'full', className }: BetaUrgencyIndicatorProps) => {
  const [spotsRemaining, setSpotsRemaining] = useState(47);
  const [recentSignups, setRecentSignups] = useState(3);
  const totalSpots = 100;
  const percentageFilled = ((totalSpots - spotsRemaining) / totalSpots) * 100;

  // Simulate occasional spot decreases for urgency (visual effect only)
  useEffect(() => {
    const interval = setInterval(() => {
      // Small chance to show a "spot taken" animation
      if (Math.random() > 0.85 && spotsRemaining > 20) {
        setSpotsRemaining(prev => Math.max(20, prev - 1));
        setRecentSignups(prev => prev + 1);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [spotsRemaining]);

  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center gap-2 text-xs", className)}>
        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 animate-pulse">
          <Flame className="w-3 h-3" />
          <span className="font-semibold">{spotsRemaining} spots left</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Main urgency card */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border border-amber-500/30 p-4">
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
        
        <div className="relative space-y-3">
          {/* Header with flame */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
                <div className="absolute inset-0 bg-amber-500/30 blur-md animate-pulse" />
              </div>
              <span className="font-bold text-foreground">Limited Beta Access</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Closing soon</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${percentageFilled}%` }}
              >
                {/* Animated glow on progress */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{totalSpots - spotsRemaining} testers joined</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 animate-pulse">
                Only {spotsRemaining} spots remaining!
              </span>
            </div>
          </div>

          {/* Recent activity */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-sacred to-purple-600 border-2 border-background flex items-center justify-center"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <Users className="w-3 h-3 text-white" />
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{recentSignups} people</span> signed up in the last hour
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
