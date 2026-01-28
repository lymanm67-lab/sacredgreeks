import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MythSubGroupProps {
  title: string;
  subtitle?: string;
  groupIndex: number;
  totalGroups: number;
  mythCount: number;
  reviewedCount: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const MythSubGroup: React.FC<MythSubGroupProps> = ({
  title,
  subtitle,
  groupIndex,
  totalGroups,
  mythCount,
  reviewedCount,
  isOpen,
  onToggle,
  children
}) => {
  const progress = mythCount > 0 ? Math.round((reviewedCount / mythCount) * 100) : 0;
  const isComplete = reviewedCount === mythCount && mythCount > 0;

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <div className={cn(
        "border rounded-lg transition-all",
        isComplete ? "border-primary/30 bg-primary/5" : "border-border bg-muted/20"
      )}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-3 hover:bg-muted/30 transition-colors rounded-lg">
            <div className="flex items-center gap-3">
              {/* Group indicator */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                isComplete 
                  ? "bg-primary/20 text-primary" 
                  : "bg-sacred/10 text-sacred"
              )}>
                {isComplete ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span>{groupIndex + 1}</span>
                )}
              </div>
              
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{title}</span>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-[10px]",
                      isComplete && "bg-primary/20 text-primary border-primary/30"
                    )}
                  >
                    {reviewedCount}/{mythCount}
                  </Badge>
                </div>
                {subtitle && (
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Mini progress bar */}
              <div className="hidden sm:flex items-center gap-2">
                <Progress value={progress} className="w-16 h-1.5" />
                <span className="text-xs text-muted-foreground w-8">{progress}%</span>
              </div>
              
              <ChevronDown className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                isOpen && "rotate-180"
              )} />
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-3 pb-3 space-y-2">
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

// Helper to chunk an array into smaller groups
export const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

// Generate descriptive titles for myth sub-groups based on content
export const generateSubGroupTitle = (myths: { myth: string; scenario?: string }[], index: number): { title: string; subtitle: string } => {
  // Group by scenario if available
  const scenarios = [...new Set(myths.map(m => m.scenario).filter(Boolean))];
  
  if (scenarios.length === 1 && scenarios[0]) {
    return {
      title: scenarios[0],
      subtitle: `${myths.length} topic${myths.length > 1 ? 's' : ''}`
    };
  }
  
  // Generic numbered group
  return {
    title: `Part ${index + 1}`,
    subtitle: `${myths.length} topic${myths.length > 1 ? 's' : ''} to review`
  };
};

export default MythSubGroup;
