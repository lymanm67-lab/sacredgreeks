import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Pause, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProofLetterAudioProps {
  letter: string;
  title: string;
  criticism: string;
  criticismExample: string;
  response: string;
  scripture: string;
  scriptureText: string;
  supportingScripture: string;
  supportingText: string;
  corePrinciple?: string;
  className?: string;
}

export function ProofLetterAudio({
  letter,
  title,
  criticism,
  criticismExample,
  response,
  scripture,
  scriptureText,
  supportingScripture,
  supportingText,
  corePrinciple,
  className,
}: ProofLetterAudioProps) {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateText = () => {
    let text = `${letter} stands for ${title}. 
    
Critics say: ${criticismExample}

But the biblical response is: ${response}

Scripture says in ${scripture}: "${scriptureText}"

The conscience principle from ${supportingScripture} reminds us: "${supportingText}"`;

    if (corePrinciple) {
      text += `\n\n${corePrinciple}`;
    }

    return text;
  };

  const handlePlay = async () => {
    if (!user) {
      toast.error("Please sign in to listen to audio teachings");
      return;
    }

    // If we already have audio loaded, just play/pause
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    // Generate new audio
    setIsLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${sessionData?.session?.access_token}`,
          },
          body: JSON.stringify({ 
            text: generateText(), 
            voice: "narrator2" // George - deep, authoritative narrator
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate audio");
      }

      const data = await response.json();
      const url = `data:audio/mpeg;base64,${data.audioContent}`;
      setAudioUrl(url);

      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        toast.error("Error playing audio");
        setIsPlaying(false);
      };

      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("TTS error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate audio");
    } finally {
      setIsLoading(false);
    }
  };

  // Stop audio when component unmounts
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handlePlay}
      disabled={isLoading}
      className={`gap-1.5 text-xs ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Loading...
        </>
      ) : isPlaying ? (
        <>
          <Pause className="w-3.5 h-3.5" />
          Pause
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5" />
          Listen
        </>
      )}
    </Button>
  );
}
