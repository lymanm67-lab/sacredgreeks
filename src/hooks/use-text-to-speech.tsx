import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useBackgroundAudio } from "./use-background-audio";

export type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;

// Simple number to words converter for TTS
const numberToWords = (num: string): string => {
  const n = parseInt(num, 10);
  const words: Record<number, string> = {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
    11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
    16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty',
    30: 'thirty', 40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy',
    80: 'eighty', 90: 'ninety', 100: 'one hundred'
  };
  if (words[n]) return words[n];
  if (n < 100) {
    const tens = Math.floor(n / 10) * 10;
    const ones = n % 10;
    return `${words[tens]}-${words[ones]}`;
  }
  return num; // fallback to number string
};

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
    // Preprocess text for better TTS pronunciation
    let processedText = text
      // Convert 10/15/10/65 pattern to spoken form with explanation
      .replace(/10\/15\/10\/65/g, "ten-fifteen-ten-sixty-five, which means ten percent for Kingdom giving, fifteen percent for savings, ten percent for investing, and sixty-five percent for living expenses")
      .replace(/(\d+)\/(\d+)\/(\d+)\/(\d+)/g, (_, a, b, c, d) => 
        `${numberToWords(a)}, ${numberToWords(b)}, ${numberToWords(c)}, ${numberToWords(d)}`
      );
    
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
        body: { text: processedText, voice },
      });

      // Helper to check if any string contains quota-related keywords
      const containsQuotaError = (str: unknown): boolean => {
        if (typeof str !== 'string') return false;
        const lower = str.toLowerCase();
        return lower.includes('quota_exceeded') || 
               lower.includes('quota exceeded') ||
               lower.includes('402') ||
               lower.includes('credits remaining') ||
               lower.includes('credits are required');
      };

      // Robust quota detection - check multiple patterns
      const errorMessage = error?.message || '';
      const errorStr = JSON.stringify(error || {});
      const dataStr = JSON.stringify(data || {});
      
      const isQuotaError =
        containsQuotaError(errorMessage) ||
        containsQuotaError(errorStr) ||
        containsQuotaError(dataStr) ||
        data?.code === "quota_exceeded" ||
        error?.name === "FunctionsHttpError";
      
      if (isQuotaError) {
        console.log('ElevenLabs quota exceeded, using browser TTS fallback');
        setIsLoading(null);
        setIsPlaying(itemId);
        setUsingBrowserTTS(true);
        try {
          await speakWithBrowserTTS(processedText, itemId);
        } catch (browserErr) {
          console.error('Browser TTS also failed:', browserErr);
          toast.error('Voice playback unavailable');
        } finally {
          setUsingBrowserTTS(false);
          setIsPlaying(null);
          setIsPaused(false);
        }
        return;
      }

      if (error) {
        // Check if error message contains quota info before throwing
        const errMsg = typeof error === 'object' && error !== null && 'message' in error 
          ? (error as any).message 
          : String(error);
        if (errMsg.includes('402') || errMsg.includes('quota')) {
          console.log('Quota error detected in error message, falling back to browser TTS');
          setIsLoading(null);
          setIsPlaying(itemId);
          setUsingBrowserTTS(true);
          try {
            await speakWithBrowserTTS(processedText, itemId);
          } catch (browserErr) {
            console.error('Browser TTS also failed:', browserErr);
            toast.error('Voice playback unavailable');
          } finally {
            setUsingBrowserTTS(false);
            setIsPlaying(null);
            setIsPaused(false);
          }
          return;
        }
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

      // Final fallback - try browser TTS for any error
      const errStr = String(error);
      const isQuota = errStr.includes('402') || 
                      errStr.includes('quota') || 
                      errStr.includes('credits');
      
      if (isQuota) {
        console.log('Quota error in catch block, falling back to browser TTS');
        toast.info("Using browser voice (premium voice unavailable)");
        setUsingBrowserTTS(true);
        try {
          setIsPlaying(itemId);
          await speakWithBrowserTTS(processedText, itemId);
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
