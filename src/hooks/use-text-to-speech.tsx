import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useBackgroundAudio } from "./use-background-audio";

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { setAudioRef, updatePlaybackState, updatePositionState } = useBackgroundAudio({
    title: currentTitle || "Sacred Greeks Audio",
    artist: "Sacred Greeks",
    onPlay: () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
      }
    },
    onPause: () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    },
    onStop: () => {
      stop();
    },
    onSeekBackward: () => {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
      }
    },
    onSeekForward: () => {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.min(
          audioRef.current.duration,
          audioRef.current.currentTime + 10
        );
      }
    },
  });

  // Update position state periodically
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) return;

    const updatePosition = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        updatePositionState(audio.duration, audio.currentTime);
      }
    };

    audio.addEventListener("timeupdate", updatePosition);
    audio.addEventListener("durationchange", updatePosition);

    return () => {
      audio.removeEventListener("timeupdate", updatePosition);
      audio.removeEventListener("durationchange", updatePosition);
    };
  }, [isPlaying, updatePositionState]);

  const speak = async (text: string, itemId: string, voice: string = "alloy", title?: string) => {
    // Set title for media session
    if (title) {
      setCurrentTitle(title);
    }
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // If clicking the same item that's playing, just stop
    if (isPlaying === itemId) {
      setIsPlaying(null);
      return;
    }

    setIsLoading(itemId);

    try {
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: { text, voice },
      });

      if (error) throw error;

      if (!data?.audioContent) {
        throw new Error("No audio content received");
      }

      // Convert base64 to audio
      const binaryString = atob(data.audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setAudioRef(audio);

      audio.onended = () => {
        setIsPlaying(null);
        updatePlaybackState("none");
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(null);
        toast.error("Failed to play audio. Please check your device settings.");
        URL.revokeObjectURL(audioUrl);
      };

      // Mobile browser compatibility: ensure audio can play
      try {
        // Attempt to play - this requires user gesture on mobile
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(itemId);
          updatePlaybackState("playing");
        }
      } catch (playError) {
        console.error("Play error:", playError);
        // iOS/Mobile Safari often blocks autoplay
        if (playError.name === "NotAllowedError") {
          toast.error("Audio blocked. Please tap again to play.");
        } else {
          toast.error("Cannot play audio on this device.");
        }
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
        throw playError;
      }
    } catch (error) {
      console.error("Text-to-speech error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate speech"
      );
      setIsPlaying(null);
    } finally {
      setIsLoading(null);
    }
  };

  const pause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPaused(true);
      updatePlaybackState("paused");
    }
  };

  const resume = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.error("Resume error:", error);
        toast.error("Failed to resume playback");
      });
      setIsPaused(false);
      updatePlaybackState("playing");
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(null);
    setIsPaused(false);
    updatePlaybackState("none");
  };

  return {
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    isLoading,
  };
};
