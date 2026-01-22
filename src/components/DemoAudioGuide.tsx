import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2, Headphones, ChevronDown, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface DemoAudioGuideProps {
  pageId: string;
  title: string;
  description: string;
  contentRef?: React.RefObject<HTMLElement>;
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

// Audio cache key prefix
const AUDIO_CACHE_PREFIX = "demo_audio_cache_";

// Waveform animation component
const AudioWaveform = ({ isPlaying }: { isPlaying: boolean }) => {
  const bars = [1, 2, 3, 4, 5];
  
  return (
    <div className="flex items-center gap-0.5 h-5">
      {bars.map((bar) => (
        <motion.div
          key={bar}
          className="w-1 bg-white rounded-full"
          animate={isPlaying ? {
            height: ["8px", "20px", "12px", "18px", "8px"],
          } : { height: "8px" }}
          transition={{
            duration: 0.8,
            repeat: isPlaying ? Infinity : 0,
            delay: bar * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Format time as MM:SS
const formatTime = (seconds: number): string => {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const DemoAudioGuide = ({ pageId, title, description, contentRef }: DemoAudioGuideProps) => {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [autoPlayAttempted, setAutoPlayAttempted] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const script = PAGE_SCRIPTS[pageId] || description;
  const cacheKey = `${AUDIO_CACHE_PREFIX}${pageId}`;
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remainingTime = duration - currentTime;

  // Seek to a specific position based on click/drag position
  const seekToPosition = useCallback((clientX: number) => {
    if (!progressBarRef.current || !audioRef.current || duration <= 0) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = clickPosition / rect.width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  // Handle click on progress bar
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    seekToPosition(e.clientX);
  }, [seekToPosition]);

  // Handle drag start
  const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    seekToPosition(e.clientX);
  }, [seekToPosition]);

  // Handle drag move
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      seekToPosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, seekToPosition]);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seekToPosition(e.touches[0].clientX);
  }, [seekToPosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      seekToPosition(e.touches[0].clientX);
    }
  }, [isDragging, seekToPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Get cached audio from localStorage
  const getCachedAudio = useCallback((): string | null => {
    try {
      return localStorage.getItem(cacheKey);
    } catch {
      return null;
    }
  }, [cacheKey]);

  // Cache audio to localStorage
  const cacheAudio = useCallback((audioContent: string) => {
    try {
      localStorage.setItem(cacheKey, audioContent);
    } catch (e) {
      console.warn("Failed to cache audio:", e);
    }
  }, [cacheKey]);

  const scrollToContent = useCallback(() => {
    if (contentRef?.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollBy({ top: window.innerHeight * 0.6, behavior: "smooth" });
    }
  }, [contentRef]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setShowSkip(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const pauseAudio = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const resumeAudio = useCallback(() => {
    if (audioRef.current && isPaused) {
      audioRef.current.play();
      setIsPaused(false);
      setIsPlaying(true);
    }
  }, [isPaused]);

  const playAudio = useCallback(async (autoPlay = false) => {
    if (isPlaying) {
      pauseAudio();
      return;
    }

    if (isPaused) {
      resumeAudio();
      return;
    }

    setIsLoading(true);
    setShowSkip(true);

    try {
      // Check cache first
      let audioContent = getCachedAudio();

      if (!audioContent) {
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

        audioContent = data.audioContent;
        cacheAudio(audioContent);
      }

      const audioUrl = `data:audio/mpeg;base64,${audioContent}`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Set up time tracking
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setHasStarted(true);
        setShowSkip(false);
        setCurrentTime(0);
      };

      audio.onerror = () => {
        toast.error("Failed to play audio");
        setIsPlaying(false);
        setShowSkip(false);
      };

      await audio.play();
      setIsPlaying(true);
      setHasStarted(true);
    } catch (error) {
      console.error("Demo audio error:", error);
      if (!autoPlay) {
        toast.error(
          error instanceof Error ? error.message : "Failed to play audio guide"
        );
      }
      setShowSkip(false);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, isPaused, pauseAudio, resumeAudio, getCachedAudio, cacheAudio, script, pageId]);

  // Auto-play on mount for demo users
  useEffect(() => {
    if (!user && !autoPlayAttempted && !hasStarted) {
      setAutoPlayAttempted(true);
      // Small delay to allow page to render
      const timer = setTimeout(() => {
        playAudio(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user, autoPlayAttempted, hasStarted, playAudio]);

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
        className="fixed bottom-20 right-4 z-40 md:bottom-6 flex flex-col items-end gap-2"
      >
        {/* Skip to content button */}
        {showSkip && (isPlaying || isPaused) && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <Button
              onClick={scrollToContent}
              variant="outline"
              size="sm"
              className="rounded-full shadow-lg gap-1.5 bg-background/95 backdrop-blur-sm"
            >
              <ChevronDown className="h-4 w-4" />
              <span className="hidden sm:inline">Skip to Content</span>
            </Button>
          </motion.div>
        )}

        <div className="flex items-center gap-2">
          {/* Stop button when playing or paused */}
          {(isPlaying || isPaused) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button
                onClick={stopAudio}
                variant="outline"
                size="icon"
                className="rounded-full shadow-lg h-10 w-10 bg-background/95 backdrop-blur-sm"
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Main audio control with progress */}
          <div className="flex flex-col items-end gap-1">
            {/* Seekable Progress bar - visible when playing or paused */}
            {(isPlaying || isPaused) && duration > 0 && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                className="flex items-center gap-2 bg-background/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border"
              >
                <span className="text-xs text-muted-foreground font-mono w-10">
                  {formatTime(currentTime)}
                </span>
                <div 
                  ref={progressBarRef}
                  className="w-24 sm:w-32 h-2.5 bg-muted rounded-full overflow-hidden cursor-pointer relative group"
                  onClick={handleProgressClick}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Progress fill */}
                  <motion.div
                    className="h-full bg-sacred rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: isDragging ? 0 : 0.1 }}
                  />
                  {/* Seek handle */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-sacred rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${progress}% - 7px)` }}
                    animate={{ scale: isDragging ? 1.2 : 1 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-mono w-10">
                  -{formatTime(remainingTime)}
                </span>
              </motion.div>
            )}

            {/* Main audio control button */}
            <Button
              onClick={() => playAudio(false)}
              disabled={isLoading}
              size="lg"
              className={`
                rounded-full shadow-lg gap-2 px-4 transition-all duration-300
                ${isPlaying 
                  ? "bg-sacred text-white hover:bg-sacred/90" 
                  : isPaused
                    ? "bg-amber-500 text-white hover:bg-amber-500/90"
                    : hasStarted 
                      ? "bg-muted text-muted-foreground hover:bg-muted/80"
                      : "bg-gradient-to-r from-sacred to-purple-600 text-white hover:from-sacred/90 hover:to-purple-600/90 animate-pulse"
                }
              `}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isPlaying ? (
                <AudioWaveform isPlaying={true} />
              ) : isPaused ? (
                <Play className="h-5 w-5" />
              ) : (
                <Headphones className="h-5 w-5" />
              )}
              <span className="hidden sm:inline">
                {isLoading
                  ? "Loading..."
                  : isPlaying
                  ? "Playing..."
                  : isPaused
                  ? "Resume"
                  : hasStarted
                  ? "Replay Guide"
                  : "Audio Guide"}
              </span>
            </Button>
          </div>
        </div>

        {/* Tooltip for first-time visitors - only show if not auto-playing */}
        {!hasStarted && !isPlaying && !isLoading && !autoPlayAttempted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            className="absolute bottom-full right-0 mb-2 p-2 bg-popover border rounded-lg shadow-lg text-xs max-w-[200px]"
          >
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Volume2 className="h-3 w-3 text-sacred shrink-0" />
              <span>Audio guide starting automatically!</span>
            </div>
            <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-popover border-r border-b" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
