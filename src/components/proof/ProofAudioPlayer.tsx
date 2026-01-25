import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, Pause, Loader2, Play, RotateCcw, Crown, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/use-subscription";
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
  const { subscribed, tier, loading: subLoading } = useSubscription();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check if user has Pro or Ministry tier
  const hasPremiumAccess = subscribed && (tier === 'pro' || tier === 'ministry');

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

    if (!hasPremiumAccess) {
      toast.error("Upgrade to Pro for the full audio player with progress controls");
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

  // Show locked state for non-Pro users
  if (!hasPremiumAccess && !subLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={className}
      >
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
              <Crown className="w-3 h-3" />
              Pro
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-amber-300 font-semibold text-sm">P.R.O.O.F. Audio Premium</h4>
              <p className="text-white/50 text-xs">Full audio player with progress & speed controls</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Fake progress bar (disabled) */}
            <div className="space-y-1 opacity-50">
              <div className="h-2 bg-white/10 rounded-full" />
              <div className="flex justify-between text-xs text-white/30">
                <span>0:00</span>
                <span>3:24</span>
              </div>
            </div>

            {/* Upgrade CTA */}
            <div className="flex items-center gap-2">
              <Link to="/subscribe" className="flex-1">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </Link>
            </div>

            <p className="text-xs text-white/40 text-center">
              Unlock progress tracking, playback speed (0.75x-2x), and seamless audio experience
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

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
            <h4 className="text-purple-300 font-semibold text-sm flex items-center gap-2">
              Listen to P.R.O.O.F. Framework
              <span className="px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-300 text-[10px] font-medium">PRO</span>
            </h4>
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
