import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useBackgroundAudio } from "./use-background-audio";

export type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;

// Browser Speech Synthesis fallback
const speakWithBrowserTTS = (text: string, itemId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Browser does not support text-to-speech'));
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Male') || v.name.includes('Daniel') || v.name.includes('Google'))
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
    
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(new Error(`Speech error: ${event.error}`));

    toast.info('Using browser voice (premium voice unavailable)');
    window.speechSynthesis.speak(utterance);
  });
};

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1);
  const [usingBrowserTTS, setUsingBrowserTTS] = useState<boolean>(false);
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
    setIsPaused(false);
    setUsingBrowserTTS(false);

    try {
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: { text, voice },
      });

      // Robust quota detection without relying on instanceof (can break with duplicate bundles)
      const anyErr = error as any;
      let errorJson: any = null;
      if (anyErr?.context?.json) {
        errorJson = await anyErr.context.json().catch(() => null);
      }

      const isQuotaError =
        anyErr?.context?.status === 402 ||
        anyErr?.message?.includes("quota_exceeded") ||
        anyErr?.message?.includes("Edge function returned 402") ||
        errorJson?.code === "quota_exceeded" ||
        (typeof errorJson?.error === "string" && errorJson.error.includes("quota_exceeded")) ||
        data?.code === "quota_exceeded" ||
        (typeof data?.error === "string" && data.error.includes("quota_exceeded"));
      
      if (isQuotaError) {
        console.log('ElevenLabs quota exceeded, using browser TTS fallback');
        setIsLoading(null);
        setIsPlaying(itemId);
        setUsingBrowserTTS(true);
        try {
          await speakWithBrowserTTS(text, itemId);
        } finally {
          setUsingBrowserTTS(false);
          setIsPlaying(null);
          setIsPaused(false);
        }
        return;
      }

      if (error) {
        throw error;
      }

      if (!data?.audioContent) {
        throw new Error("No audio content received");
      }

      // Use data URI for base64 audio (avoids atob() corruption issues)
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;

      const audio = new Audio(audioUrl);
      audio.playbackRate = playbackSpeed;
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
          setIsPaused(false);
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

      // If invoke threw (rare), try same quota fallback detection via duck-typing
      const anyErr = error as any;
      const status = anyErr?.context?.status;
      let body: any = null;
      if (anyErr?.context?.json) {
        body = await anyErr.context.json().catch(() => null);
      }
      const isQuota =
        status === 402 ||
        anyErr?.message?.includes("quota_exceeded") ||
        body?.code === "quota_exceeded" ||
        (typeof body?.error === "string" && body.error.includes("quota_exceeded"));
      if (isQuota) {
        toast.info("Using browser voice (premium voice unavailable)");
        setUsingBrowserTTS(true);
        try {
          setIsPlaying(itemId);
          await speakWithBrowserTTS(text, itemId);
        } finally {
          setUsingBrowserTTS(false);
          setIsPlaying(null);
          setIsPaused(false);
          setIsLoading(null);
        }
        return;
      }

      toast.error(
        error instanceof Error ? error.message : "Failed to generate speech"
      );
      setIsPlaying(null);
    } finally {
      setIsLoading(null);
    }
  };

  const pause = () => {
    if (usingBrowserTTS && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      updatePlaybackState("paused");
      return;
    }

    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPaused(true);
      updatePlaybackState("paused");
    }
  };

  const resume = () => {
    if (usingBrowserTTS && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      updatePlaybackState("playing");
      return;
    }

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

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setIsPlaying(null);
    setIsPaused(false);
    setUsingBrowserTTS(false);
    updatePlaybackState("none");
  };

  const changeSpeed = useCallback((speed: PlaybackSpeed) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, []);

  return {
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    isLoading,
    playbackSpeed,
    changeSpeed,
  };
};
