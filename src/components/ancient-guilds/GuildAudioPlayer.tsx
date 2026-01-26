import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Volume2, Pause, Loader2, Play, RotateCcw, Hammer, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const GUILD_AUDIO_TEXT = `
Ancient Trade Guilds: Jesus and Paul's Structural Context

In the first century Mediterranean world, skilled trades were commonly organized through craft guilds—associations that functioned socially and economically much like modern fraternities.

Scripture identifies Jesus of Nazareth as a tekton, a skilled craftsman—not a casual laborer. That implies formal training, likely beginning as an apprentice under Joseph. As a master carpenter, Jesus would have been trained within a structured trade environment that emphasized apprenticeship, mastery, reputation, and mutual support.

The apprenticeship process in Jesus's time would have included: long-term training under authority, submission to instruction and correction, periods of silence and observation, living and working closely with others, demonstrating mastery through tested skill, and upholding the reputation of the trade. These were not optional—they were expected.

Jesus would have faced challenges typical of any apprentice: enduring years without independent recognition, obedience before leadership, learning through repetition and discipline, patience in unseen labor, accountability to a master craftsman, and community evaluation of readiness. None of these contradict the character of Christ. In fact, they align with Philippians 2, where Christ submits, learns obedience, and grows.

Apprentices did not train alone. They formed brotherhoods of shared labor, accountability, and identity. They shared meals, workspaces, instruction, and responsibility for quality. This is structurally similar to fraternal development—without worship.

Likewise, Paul the Apostle, identified in Acts as a tentmaker, worked within a recognized artisan trade that was typically guild-organized in Greco-Roman cities. Acts 18:3 tells us that Paul stayed with Aquila and Priscilla because they were of the same trade. This guild connection provided Paul with networking, financial support, and credibility in cities throughout his missionary journeys.

These guilds were not merely economic units. They provided identity, networking, protection, and ethical standards—operating with shared symbols, expectations, and rituals that bound members together.

Common features of ancient trade guilds included: membership requirements such as completion of an apprenticeship under a recognized master, initiation and advancement ceremonies, ethical and behavioral standards, oaths or pledges to uphold trade standards, rituals and symbolism marking advancement, signs of recognition among members, and mutual support during illness or hardship.

While Christians later rejected idolatrous worship tied to some guilds, the organizational structure itself was familiar, neutral, and widely accepted.

The theological anchor point is this: Jesus condemned idolatry, not organization. He confronted misplaced worship, not structure. He opposed false devotion, not disciplined brotherhood.

There is no Gospel account of Jesus condemning trade guilds, apprenticeship systems, or structured communities. He lived inside them for approximately eighteen years before beginning His public ministry at age thirty.

The bottom line: Pagan cults are religious systems and were rightly rejected. But Black Greek-letter organizations are voluntary, cultural organizations. Ancient guilds prove that structure, ritual, and brotherhood are not sinful. Jesus understood discipline, silence, testing, and communal formation. What Scripture judges is worship, not membership.
`;

interface GuildAudioPlayerProps {
  className?: string;
  defaultOpen?: boolean; // Accepted for consistency but this component is always expanded
}

export function GuildAudioPlayer({ className }: GuildAudioPlayerProps) {
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
            text: GUILD_AUDIO_TEXT, 
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
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Hammer className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-amber-600 dark:text-amber-400 font-semibold text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Ancient Trade Guilds: Jesus & Paul
            </h4>
            <p className="text-muted-foreground text-xs">Historical context audio • ~5 min</p>
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
              <div className="flex justify-between text-xs text-muted-foreground">
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
              className="flex-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-600 dark:text-amber-400 border border-amber-500/30"
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
                  <Volume2 className="w-4 h-4 mr-2" />
                  Listen to Guild History
                </>
              )}
            </Button>

            {audioUrl && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRestart}
                  className="text-muted-foreground hover:text-foreground hover:bg-amber-500/10"
                  title="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleSpeedChange}
                  className="text-muted-foreground hover:text-foreground hover:bg-amber-500/10 min-w-[50px]"
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
