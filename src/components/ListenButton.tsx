import { Button } from "@/components/ui/button";
import { Volume2, Pause, Play, Loader2, Square } from "lucide-react";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { cn } from "@/lib/utils";

interface ListenButtonProps {
  text: string;
  itemId: string;
  title?: string;
  voice?: "alloy" | "echo" | "fable" | "nova" | "onyx" | "shimmer";
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showLabel?: boolean;
}

export function ListenButton({
  text,
  itemId,
  title,
  voice = "onyx", // Deep, warm male voice - good for educational content
  variant = "outline",
  size = "sm",
  className,
  showLabel = true,
}: ListenButtonProps) {
  const { speak, pause, resume, stop, isPlaying, isPaused, isLoading } = useTextToSpeech();
  
  const isThisPlaying = isPlaying === itemId;
  const isThisLoading = isLoading === itemId;

  const handleClick = async () => {
    if (isThisLoading) return;
    
    if (isThisPlaying && !isPaused) {
      pause();
    } else if (isThisPlaying && isPaused) {
      resume();
    } else {
      await speak(text, itemId, voice, title);
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    stop();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={isThisLoading}
        className={cn(
          "transition-all",
          isThisPlaying && "bg-sacred/10 border-sacred text-sacred hover:bg-sacred/20",
          className
        )}
      >
        {isThisLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {showLabel && <span className="ml-2">Loading...</span>}
          </>
        ) : isThisPlaying && !isPaused ? (
          <>
            <Pause className="w-4 h-4" />
            {showLabel && <span className="ml-2">Pause</span>}
          </>
        ) : isThisPlaying && isPaused ? (
          <>
            <Play className="w-4 h-4" />
            {showLabel && <span className="ml-2">Resume</span>}
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            {showLabel && <span className="ml-2">Listen</span>}
          </>
        )}
      </Button>
      
      {isThisPlaying && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleStop}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Square className="w-3 h-3 fill-current" />
        </Button>
      )}
    </div>
  );
}
