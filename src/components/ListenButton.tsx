import { Button } from "@/components/ui/button";
import { Volume2, Pause, Play, Loader2, Square } from "lucide-react";
import { useTextToSpeech, PlaybackSpeed } from "@/hooks/use-text-to-speech";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const SPEED_OPTIONS: { value: PlaybackSpeed; label: string }[] = [
  { value: 0.5, label: "0.5x" },
  { value: 0.75, label: "0.75x" },
  { value: 1, label: "1x" },
  { value: 1.25, label: "1.25x" },
  { value: 1.5, label: "1.5x" },
  { value: 2, label: "2x" },
];

export function ListenButton({
  text,
  itemId,
  title,
  voice = "onyx",
  variant = "outline",
  size = "sm",
  className,
  showLabel = true,
}: ListenButtonProps) {
  const { speak, pause, resume, stop, isPlaying, isPaused, isLoading, playbackSpeed, changeSpeed } = useTextToSpeech();
  
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
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-2 text-xs font-medium"
              >
                {playbackSpeed}x
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {SPEED_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => changeSpeed(option.value)}
                  className={cn(
                    "cursor-pointer",
                    playbackSpeed === option.value && "bg-accent"
                  )}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleStop}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Square className="w-3 h-3 fill-current" />
          </Button>
        </>
      )}
    </div>
  );
}
