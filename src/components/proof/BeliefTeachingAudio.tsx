import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, Pause, Play, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const BELIEF_TEACHING_TEXT = `The Power of Belief in Scripture.

Here's a truth many overlook: faith is the operating system of the spiritual realm.

In Mark chapter 6, Jesus returned to His hometown. The Bible tells us He could do no mighty work there, except heal a few sick people. Why? Because of their unbelief. 

This wasn't a limitation of Jesus' power. It was a limitation of their access. Power was present, but unbelief blocked the connection.

Matthew 9 verse 29 records Jesus saying, "According to your faith be it done to you." He consistently tied spiritual outcomes to belief. Not His ability. Their faith.

So what does this mean for you?

If you mentioned a deity's name during a ritual, but you did not know it was a deity, and you do not believe it to be a deity... it holds no authority over you.

Paul addressed this directly. In First Corinthians chapter 8, he wrote that an idol is nothing in the world. The false god has no real existence. 

In Colossians chapter 2, Paul asked: "Why do you submit to regulations according to human precepts and teachings?" He was saying: rules and spiritual threats lose control when they are not believed and are not rooted in Christ.

Even fear requires belief. Job 3 verse 25 says, "The thing that I fear comes upon me." Fear operates like faith in reverse. It still requires belief.

Here's the principle: If you do not believe something has authority, power, or truth over you... it cannot govern you spiritually.

Romans 14 verse 14 says, "Nothing is unclean in itself, but it is unclean for anyone who thinks it unclean."

Your conscience and your faith determine spiritual effect. This doesn't mean truth is relative. It means faith is the channel through which spiritual realities operate.

Walk in confidence. You belong to Christ. And in Him, no weapon formed against you shall prosper.`;

interface BeliefTeachingAudioProps {
  className?: string;
}

export function BeliefTeachingAudio({ className }: BeliefTeachingAudioProps) {
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
            text: BELIEF_TEACHING_TEXT, 
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
      <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Volume2 className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-amber-300 text-sm mb-1">
              🎧 The Power of Belief
            </h4>
            <p className="text-white/70 text-xs mb-3">
              Listen to a teaching on how faith operates as the channel of spiritual authority—and why what you don't believe cannot hold power over you.
            </p>
            <Button
              onClick={handlePlay}
              disabled={isLoading}
              size="sm"
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  {audioUrl ? "Resume" : "Listen Now"}
                </>
              )}
            </Button>
          </div>
        </div>
        
        {!user && (
          <p className="text-amber-400/60 text-[10px] mt-2 pl-13">
            Sign in to access audio teachings
          </p>
        )}
      </div>
    </motion.div>
  );
}
