import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speak = async (text: string, itemId: string, voice: string = "alloy") => {
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

      audio.onended = () => {
        setIsPlaying(null);
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

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(null);
  };

  return {
    speak,
    stop,
    isPlaying,
    isLoading,
  };
};
