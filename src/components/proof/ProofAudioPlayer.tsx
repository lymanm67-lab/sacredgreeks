import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, Pause, Loader2, Play, RotateCcw } from "lucide-react";
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

interface ProofAudioPlayerProps {
  className?: string;
}

export function ProofAudioPlayer({ className }: ProofAudioPlayerProps) {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            text: PROOF_FRAMEWORK_TEXT, 
            voice: "narrator2"
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
      audio.playbackRate = playbackRate;
      
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      };
      
      audio.onended = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      };

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

  const handleSeek = (value: number[]) => {
    if (audioRef.current && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(value[0]);
    }
  };

  const handleSpeedChange = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newRate = speeds[nextIndex];
    setPlaybackRate(newRate);
    
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
            <Volume2 className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-purple-300 font-semibold text-sm">Listen to P.R.O.O.F. Framework</h4>
            <p className="text-white/50 text-xs">Complete audio explanation • ~3 min</p>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="space-y-3">
          {/* Progress Bar */}
          {audioUrl && (
            <div className="space-y-1">
              <Slider
                value={[progress]}
                onValueChange={handleSeek}
                max={100}
                step={0.1}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/40">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handlePlay}
              disabled={isLoading}
              className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : audioUrl ? (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Resume
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </>
              )}
            </Button>

            {audioUrl && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRestart}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                  title="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSpeedChange}
                  className="text-white/60 hover:text-white hover:bg-white/10 min-w-[50px]"
                  title="Change speed"
                >
                  {playbackRate}x
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
