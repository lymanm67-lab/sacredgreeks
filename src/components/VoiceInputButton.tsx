import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useVoiceToText } from "@/hooks/use-voice-to-text";
import { useEffect, useState, useRef } from "react";
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

// Waveform animation bars component
function WaveformBars({ isActive }: { isActive: boolean }) {
  const [heights, setHeights] = useState([12, 20, 16, 24, 14, 22, 18]);
  
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setHeights(prev => prev.map(() => Math.random() * 20 + 8));
    }, 150);
    
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {heights.map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full transition-all duration-150",
            isActive ? "bg-destructive" : "bg-muted-foreground/30"
          )}
          style={{ height: isActive ? `${height}px` : "4px" }}
        />
      ))}
    </div>
  );
}

// Larger voice recording button with waveform animation and live transcription
interface VoiceRecordingButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
  appendMode?: boolean;
  existingText?: string;
  showLivePreview?: boolean;
  placeholder?: string;
}

export function VoiceRecordingButton({
  onTranscript,
  className,
  appendMode = true,
  existingText = "",
  showLivePreview = true,
  placeholder = "Your words will appear here as you speak...",
}: VoiceRecordingButtonProps) {
  const [liveText, setLiveText] = useState("");
  const liveTextRef = useRef("");
  
  const { isListening, toggleListening, clearTranscript } = useVoiceToText({
    onTranscript: (text) => {
      setLiveText(text);
      liveTextRef.current = text;
      
      if (appendMode && existingText) {
        onTranscript(existingText + (existingText.endsWith(" ") ? "" : " ") + text);
      } else {
        onTranscript(text);
      }
    },
  });

  useEffect(() => {
    if (!isListening) {
      // Keep the text visible briefly after stopping
      setTimeout(() => {
        if (!liveTextRef.current) {
          setLiveText("");
        }
      }, 2000);
      clearTranscript();
    } else {
      setLiveText("");
      liveTextRef.current = "";
    }
  }, [isListening, clearTranscript]);

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Main recording button */}
      <button
        type="button"
        onClick={toggleListening}
        className={cn(
          "relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
          isListening
            ? "bg-destructive text-destructive-foreground scale-110"
            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
        )}
      >
        {/* Outer pulsing rings when recording */}
        {isListening && (
          <>
            <span className="absolute inset-0 rounded-full animate-ping bg-destructive/30" />
            <span className="absolute -inset-3 rounded-full animate-pulse bg-destructive/10" />
            <span className="absolute -inset-6 rounded-full animate-pulse bg-destructive/5" style={{ animationDelay: "150ms" }} />
          </>
        )}
        
        {/* Icon */}
        <span className="relative z-10">
          {isListening ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </span>
        
        {/* Recording indicator */}
        {isListening && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </span>
          </span>
        )}
      </button>
      
      {/* Status text */}
      <span className={cn(
        "text-sm font-medium transition-colors",
        isListening ? "text-destructive" : "text-muted-foreground"
      )}>
        {isListening ? "Listening... tap to stop" : "Tap to speak your prayer"}
      </span>
      
      {/* Waveform animation */}
      <WaveformBars isActive={isListening} />
      
      {/* Live transcription preview */}
      {showLivePreview && (
        <div className={cn(
          "w-full max-w-md min-h-[80px] p-4 rounded-lg border-2 transition-all duration-300",
          isListening 
            ? "border-destructive/50 bg-destructive/5" 
            : "border-border bg-muted/30"
        )}>
          {liveText ? (
            <p className="text-sm leading-relaxed animate-fade-in">
              {liveText}
              {isListening && (
                <span className="inline-block w-0.5 h-4 bg-foreground ml-1 animate-pulse" />
              )}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic text-center">
              {isListening ? "Start speaking..." : placeholder}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
