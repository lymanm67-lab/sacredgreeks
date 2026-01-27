import { Volume2, VolumeX, Loader2, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextToSpeech } from "@/hooks/use-text-to-speech";

interface AssessmentTTSProps {
  text: string;
  itemId: string;
  title?: string;
  variant?: "icon" | "button";
  label?: string;
}

export function AssessmentTTS({ 
  text, 
  itemId, 
  title,
  variant = "icon",
  label = "Listen"
}: AssessmentTTSProps) {
  const { speak, pause, resume, stop, isPlaying, isPaused, isLoading } = useTextToSpeech();

  const handleClick = () => {
    if (isPlaying === itemId) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(text, itemId, "onwK4e9ZLuTAKqWW03F9", title); // Daniel voice - authoritative, clear
    }
  };

  const isActive = isPlaying === itemId;
  const loading = isLoading === itemId;

  if (variant === "button") {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={loading}
        className={`gap-2 ${
          isActive 
            ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-400" 
            : "border-purple-500/50 text-purple-300 hover:bg-purple-900/50"
        }`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isActive && !isPaused ? (
          <Pause className="w-4 h-4" />
        ) : isActive && isPaused ? (
          <Play className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
        {loading ? "Loading..." : isActive && !isPaused ? "Pause" : isActive && isPaused ? "Resume" : label}
      </Button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`p-2 rounded-full transition-all ${
        isActive 
          ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400" 
          : "text-purple-400 hover:text-amber-400 hover:bg-purple-900/50"
      }`}
      title={isActive ? (isPaused ? "Resume audio" : "Pause audio") : "Listen to explanation"}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isActive && !isPaused ? (
        <Pause className="w-5 h-5" />
      ) : isActive && isPaused ? (
        <Play className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
}
