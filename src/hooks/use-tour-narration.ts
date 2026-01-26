import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface TourNarrationOptions {
  voice?: string;
  onLoadingChange?: (isLoading: boolean) => void;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export function useTourNarration(options: TourNarrationOptions = {}) {
  const { voice = "ancient", onLoadingChange, onPlayingChange } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTextRef = useRef<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  // Notify parent of state changes
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  useEffect(() => {
    onPlayingChange?.(isPlaying);
  }, [isPlaying, onPlayingChange]);

  const stopNarration = useCallback(() => {
    // Abort any pending fetch
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    
    setIsPlaying(false);
    setIsLoading(false);
    currentTextRef.current = "";
  }, []);

  const speakText = useCallback(async (text: string): Promise<void> => {
    if (!isEnabled || !text.trim()) return;

    // If same text is already playing, don't restart
    if (currentTextRef.current === text && isPlaying) return;

    // Stop any current narration
    stopNarration();
    
    currentTextRef.current = text;
    setIsLoading(true);

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: { text, voice },
      });

      // Check if we were aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

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

      audio.onended = () => {
        setIsPlaying(false);
        currentTextRef.current = "";
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        currentTextRef.current = "";
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      // Don't show error if it was an abort
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error("Tour narration error:", error);
      // Silently fail to not interrupt tour experience
    } finally {
      setIsLoading(false);
    }
  }, [isEnabled, isPlaying, stopNarration, voice]);

  const toggleNarration = useCallback(() => {
    if (isEnabled) {
      stopNarration();
    }
    setIsEnabled((prev) => !prev);
  }, [isEnabled, stopNarration]);

  const pauseNarration = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const resumeNarration = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, []);

  return {
    speakText,
    stopNarration,
    pauseNarration,
    resumeNarration,
    toggleNarration,
    isLoading,
    isPlaying,
    isEnabled,
    setIsEnabled,
  };
}
