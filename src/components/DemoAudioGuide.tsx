import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface DemoAudioGuideProps {
  pageId: string;
  title: string;
  description: string;
}

// Page-specific welcome scripts
const PAGE_SCRIPTS: Record<string, string> = {
  "myth-buster": `Welcome to MythBusters! This powerful tool helps you debunk common misconceptions about Greek life using research-backed facts and the FIST framework. Explore myth cards, learn the truth, and become an advocate for your community.`,
  
  "symbols": `Welcome to the Symbols and Rituals Guide! Discover the rich symbolism and sacred traditions of Greek lettered organizations. Each symbol carries deep meaning rooted in faith, scholarship, and brotherhood or sisterhood.`,
  
  "anti-hazing": `Welcome to the Anti-Hazing Resource Center. This section provides critical information about hazing prevention, legal consequences, and building positive chapter cultures. Your safety and dignity matter.`,
  
  "content-hub": `Welcome to the Video Library! Browse curated content covering Greek life history, leadership development, and spiritual growth. Filter by category and save your favorites.`,
  
  "church-leaders": `Welcome to the Church Leaders section! Find resources designed specifically for pastors and ministry leaders to engage with Greek lettered organizations in meaningful, faith-affirming ways.`,
  
  "bible-study": `Welcome to Bible Study! Explore scripture together with study guides designed for Greek life members. Each session connects biblical principles to the values of your organization.`,
};

export const DemoAudioGuide = ({ pageId, title, description }: DemoAudioGuideProps) => {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const script = PAGE_SCRIPTS[pageId] || description;

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
  };

  const playAudio = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/demo-text-to-speech`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: script, pageId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate audio");
      }

      const data = await response.json();

      if (!data?.audioContent) {
        throw new Error("No audio content received");
      }

      // Use data URI for playback
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setHasPlayed(true);
      };

      audio.onerror = () => {
        toast.error("Failed to play audio");
        setIsPlaying(false);
      };

      await audio.play();
      setIsPlaying(true);
      setHasPlayed(true);
    } catch (error) {
      console.error("Demo audio error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to play audio guide"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Don't render for authenticated users
  if (user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="fixed bottom-20 right-4 z-40 md:bottom-6"
      >
        <Button
          onClick={playAudio}
          disabled={isLoading}
          size="lg"
          className={`
            rounded-full shadow-lg gap-2 px-4 transition-all duration-300
            ${isPlaying 
              ? "bg-sacred text-white hover:bg-sacred/90" 
              : hasPlayed 
                ? "bg-muted text-muted-foreground hover:bg-muted/80"
                : "bg-gradient-to-r from-sacred to-purple-600 text-white hover:from-sacred/90 hover:to-purple-600/90 animate-pulse"
            }
          `}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : isPlaying ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Headphones className="h-5 w-5" />
          )}
          <span className="hidden sm:inline">
            {isLoading
              ? "Loading..."
              : isPlaying
              ? "Stop Guide"
              : hasPlayed
              ? "Replay Guide"
              : "Audio Guide"}
          </span>
        </Button>

        {/* Tooltip for first-time visitors */}
        {!hasPlayed && !isPlaying && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            className="absolute bottom-full right-0 mb-2 p-2 bg-popover border rounded-lg shadow-lg text-xs max-w-[200px]"
          >
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Volume2 className="h-3 w-3 text-sacred shrink-0" />
              <span>Tap for an audio introduction!</span>
            </div>
            <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-popover border-r border-b" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
