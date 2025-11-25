import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UsePrayerAudioOptions {
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
}

export const usePrayerAudio = (options: UsePrayerAudioOptions = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrayerId, setCurrentPrayerId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const playPrayer = async (text: string, prayerId: string) => {
    try {
      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      if (currentPrayerId === prayerId && isPlaying) {
        setIsPlaying(false);
        setCurrentPrayerId(null);
        return;
      }

      setIsLoading(true);
      setCurrentPrayerId(prayerId);

      console.log('Generating audio for prayer...');
      
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { 
          text,
          voice: options.voice || 'alloy'
        }
      });

      if (error) throw error;

      if (!data?.audioContent) {
        throw new Error('No audio content received');
      }

      // Convert base64 to blob
      const audioBlob = base64ToBlob(data.audioContent, 'audio/mpeg');
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create and play audio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentPrayerId(null);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setIsLoading(false);
        setCurrentPrayerId(null);
        toast({
          title: 'Playback error',
          description: 'Failed to play audio',
          variant: 'destructive',
        });
      };

      await audio.play();
    } catch (error) {
      console.error('Prayer audio error:', error);
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentPrayerId(null);
      
      toast({
        title: 'Audio generation failed',
        description: error instanceof Error ? error.message : 'Unable to generate audio',
        variant: 'destructive',
      });
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentPrayerId(null);
  };

  return {
    playPrayer,
    stopAudio,
    isPlaying,
    isLoading,
    currentPrayerId,
  };
};

// Helper function to convert base64 to Blob
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};
