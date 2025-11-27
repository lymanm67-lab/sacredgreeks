import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LockedContentCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  previewText?: string;
  isTeaser?: boolean;
  onUnlockHint?: string;
}

export function LockedContentCard({ 
  title, 
  description, 
  icon, 
  previewText,
  isTeaser = false,
  onUnlockHint 
}: LockedContentCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden",
      isTeaser ? "border-sacred/30 bg-gradient-to-br from-sacred/5 to-background" : "border-dashed border-muted-foreground/30"
    )}>
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground">{icon}</div>
          <CardTitle className="text-xl text-muted-foreground">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="relative">
        {previewText && (
          <p className="text-sm text-muted-foreground/70 line-clamp-2 blur-[2px]">
            {previewText}
          </p>
        )}
        
        {/* Lock indicator overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="bg-background/90 rounded-full p-3 shadow-lg border border-border">
            {isTeaser ? (
              <Sparkles className="w-6 h-6 text-sacred" />
            ) : (
              <Lock className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          {onUnlockHint && (
            <p className="text-xs text-muted-foreground mt-2 text-center px-4">
              {onUnlockHint}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
