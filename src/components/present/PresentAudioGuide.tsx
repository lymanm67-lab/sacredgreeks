import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";
import { getDemoNarration } from "@/data/demoNarrationScripts";

interface PresentAudioGuideProps {
  tabKey: string;
}

const TAB_NARRATION_KEYS: Record<string, string> = {
  library: "present-library",
  polls: "present-polls",
  deck: "present-deck",
  present: "present-present",
  preview: "present-preview",
};

export function PresentAudioGuide({ tabKey }: PresentAudioGuideProps) {
  const { speak, stop, isPlaying, isLoading } = useTextToSpeech();

  const narrationKey = TAB_NARRATION_KEYS[tabKey];
  const narration = narrationKey ? getDemoNarration(narrationKey) : null;
  if (!narration) return null;

  const ttsItemId = `present-guide-${tabKey}`;
  const isThisPlaying = isPlaying === ttsItemId;
  const isThisLoading = isLoading === ttsItemId;

  const handleToggle = () => {
    if (isThisPlaying || isThisLoading) {
      stop();
    } else {
      speak(narration.script, ttsItemId, narration.voice || "onyx", narration.title);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className={`h-8 px-3 gap-1.5 text-xs ${
        isThisPlaying
          ? "text-sacred bg-sacred/10 hover:bg-sacred/20"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {isThisLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : isThisPlaying ? (
        <VolumeX className="w-3.5 h-3.5" />
      ) : (
        <Volume2 className="w-3.5 h-3.5" />
      )}
      {isThisPlaying ? "Stop Guide" : "Audio Guide"}
    </Button>
  );
}
