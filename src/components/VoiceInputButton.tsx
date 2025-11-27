import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useVoiceToText } from "@/hooks/use-voice-to-text";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
  appendMode?: boolean;
  existingText?: string;
  showLabel?: boolean;
}

export function VoiceInputButton({
  onTranscript,
  className,
  appendMode = true,
  existingText = "",
  showLabel = false,
}: VoiceInputButtonProps) {
  const { isListening, transcript, toggleListening, clearTranscript } = useVoiceToText({
    onTranscript: (text) => {
      if (appendMode && existingText) {
        onTranscript(existingText + (existingText.endsWith(" ") ? "" : " ") + text);
      } else {
        onTranscript(text);
      }
    },
  });

  // Clear transcript when starting a new session
  useEffect(() => {
    if (!isListening) {
      clearTranscript();
    }
  }, [isListening, clearTranscript]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant={isListening ? "default" : "outline"}
            size={showLabel ? "sm" : "icon"}
            onClick={toggleListening}
            className={cn(
              "transition-all relative overflow-hidden",
              isListening && "bg-destructive hover:bg-destructive/90",
              className
            )}
          >
            {/* Animated rings when recording */}
            {isListening && (
              <>
                <span className="absolute inset-0 rounded-md animate-ping bg-destructive/30" />
                <span className="absolute inset-1 rounded-md animate-pulse bg-destructive/20" />
              </>
            )}
            
            <span className="relative flex items-center gap-2">
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  {showLabel && <span>Stop</span>}
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  {showLabel && <span>Speak</span>}
                </>
              )}
            </span>
            
            {/* Recording indicator dots */}
            {isListening && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isListening ? "Stop dictation" : "Start voice dictation"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Larger voice recording button with waveform animation for prominent use
export function VoiceRecordingButton({
  onTranscript,
  className,
  appendMode = true,
  existingText = "",
}: VoiceInputButtonProps) {
  const { isListening, transcript, toggleListening, clearTranscript } = useVoiceToText({
    onTranscript: (text) => {
      if (appendMode && existingText) {
        onTranscript(existingText + (existingText.endsWith(" ") ? "" : " ") + text);
      } else {
        onTranscript(text);
      }
    },
  });

  useEffect(() => {
    if (!isListening) {
      clearTranscript();
    }
  }, [isListening, clearTranscript]);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <button
        type="button"
        onClick={toggleListening}
        className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
          isListening
            ? "bg-destructive text-destructive-foreground scale-110"
            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
        )}
      >
        {/* Outer pulsing rings when recording */}
        {isListening && (
          <>
            <span className="absolute inset-0 rounded-full animate-ping bg-destructive/30" />
            <span className="absolute -inset-2 rounded-full animate-pulse bg-destructive/10" />
            <span className="absolute -inset-4 rounded-full animate-pulse bg-destructive/5" style={{ animationDelay: "150ms" }} />
          </>
        )}
        
        {/* Icon */}
        <span className="relative z-10">
          {isListening ? (
            <MicOff className="w-7 h-7" />
          ) : (
            <Mic className="w-7 h-7" />
          )}
        </span>
        
        {/* Recording indicator */}
        {isListening && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500" />
          </span>
        )}
      </button>
      
      {/* Status text */}
      <span className={cn(
        "text-sm font-medium transition-colors",
        isListening ? "text-destructive" : "text-muted-foreground"
      )}>
        {isListening ? "Listening... tap to stop" : "Tap to speak"}
      </span>
      
      {/* Waveform animation when recording */}
      {isListening && (
        <div className="flex items-center gap-1 h-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-destructive rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 16 + 8}px`,
                animationDelay: `${i * 100}ms`,
                animationDuration: "500ms",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
