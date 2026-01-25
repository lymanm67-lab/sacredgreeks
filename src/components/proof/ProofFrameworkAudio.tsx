import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, Pause, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PROOF_FRAMEWORK_TEXT = `
The P.R.O.O.F. Framework: A Biblical Response to Greek Life Criticism

P stands for Pledge Process. Critics say Greeks brutalize new members through hazing. But the Bible shows us that biblical mentorship involves testing character, not abusing it. Hebrews 10:24-25 says "Let us consider how to stir up one another to love and good works." True discipleship involves mentorship, not abuse. Jesus tested His disciples through teaching and experience, never through degradation.

R stands for Rituals. Critics claim Greek rituals open demonic portals. But not all ceremonies are worship. Many rituals focus on history, values, and commitment—like weddings or graduations. First Thessalonians 5:21 instructs us to "test everything; hold fast what is good." We discern based on content, not assumption.

Here's a powerful truth: If you mentioned a deity's name during a ritual but did not know it was a deity and do not believe it to be a deity, it holds no authority over you. Paul wrote in First Corinthians 8:4 that an idol is "nothing in the world." The false god has no real existence. Your conscience and your faith determine spiritual effect.

O stands for Oaths. Critics say using Greek letters means worshiping Greek gods. But Paul himself used Greek language and culture to spread the Gospel without endorsing paganism. In Acts 17, Paul quoted Greek poets to preach the true God.

The second O stands for Obscurity. Critics claim secrecy proves guilt. But not all privacy is secrecy. Jesus had private moments with the Twelve for teaching, not conspiracy. Mark 4:34 tells us "privately to his own disciples he explained everything."

F stands for Founders. Critics say founders had ungodly beliefs. But the Founders' original intent matters less than how organizations operate today. First Corinthians 3:11 reminds us "no one can lay a foundation other than that which is laid, which is Jesus Christ."

Remember: Faith is the operating system of the kingdom. What you don't believe cannot hold power over you. Walk in faith, not fear.
`;

interface ProofFrameworkAudioProps {
  className?: string;
}

export function ProofFrameworkAudio({ className }: ProofFrameworkAudioProps) {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
            text: PROOF_FRAMEWORK_TEXT, 
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <Volume2 className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-purple-300 font-semibold text-sm">Listen to P.R.O.O.F. Framework</h4>
            <p className="text-white/50 text-xs">Audio explanation of each framework element</p>
          </div>
          <Button
            size="sm"
            onClick={handlePlay}
            disabled={isLoading}
            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                Loading...
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 mr-1" />
                Listen
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
