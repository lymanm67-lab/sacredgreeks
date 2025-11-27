import { Progress } from "@/components/ui/progress";
import { Lock, Unlock, ChevronDown } from "lucide-react";
import { RevealStage } from "@/hooks/use-progressive-reveal";
import { cn } from "@/lib/utils";

interface ProgressiveRevealIndicatorProps {
  stages: RevealStage[];
  currentStage: number;
}

export function ProgressiveRevealIndicator({ stages, currentStage }: ProgressiveRevealIndicatorProps) {
  const progress = (currentStage / 4) * 100;
  const visibleStages = stages.slice(0, 4); // Don't show "Full Access" in indicator

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border py-3 px-4 -mx-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">
          Content Preview
        </span>
        <span className="text-xs text-muted-foreground">
          {currentStage}/4 sections unlocked
        </span>
      </div>
      <Progress value={progress} className="h-2 mb-3" />
      <div className="flex justify-between gap-1">
        {visibleStages.map((stage) => (
          <div
            key={stage.id}
            className={cn(
              "flex items-center gap-1 text-xs transition-colors",
              stage.unlocked ? "text-sacred" : "text-muted-foreground"
            )}
          >
            {stage.unlocked ? (
              <Unlock className="w-3 h-3" />
            ) : (
              <Lock className="w-3 h-3" />
            )}
            <span className="hidden sm:inline">{stage.label}</span>
          </div>
        ))}
      </div>
      {currentStage < 4 && (
        <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground animate-bounce">
          <ChevronDown className="w-4 h-4 mr-1" />
          Scroll to reveal more
        </div>
      )}
    </div>
  );
}
