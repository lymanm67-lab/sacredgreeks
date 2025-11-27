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
  appendMode?: boolean; // If true, appends to existing text instead of replacing
  existingText?: string;
}

export function VoiceInputButton({
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
            size="icon"
            onClick={toggleListening}
            className={cn(
              "transition-all",
              isListening && "bg-destructive hover:bg-destructive/90 animate-pulse",
              className
            )}
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
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
