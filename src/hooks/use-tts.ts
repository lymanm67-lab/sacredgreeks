import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UseTTSOptions {
  voice?: string;
}

// Browser Speech Synthesis fallback
function speakWithBrowserTTS(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Browser does not support text-to-speech'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google'))
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(new Error(`Speech error: ${event.error}`));

    window.speechSynthesis.speak(utterance);
  });
}

export function useTTS(options: UseTTSOptions = {}) {
  const { voice = 'nicole' } = options; // Default to Nicole - warm African-American female voice
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    // Stop ElevenLabs audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    // Stop browser speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!text.trim()) {
      toast.error('No text to speak');
      return;
    }

    // Stop any current playback
    stop();
    
    setIsLoading(true);
    setError(null);
    setUsingFallback(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Please log in to use text-to-speech');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ text, voice }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Failed to generate speech';
        
        // Check for quota exceeded error - use browser fallback
        if (errorMessage.includes('quota_exceeded') || errorMessage.includes('credits remaining')) {
          console.log('ElevenLabs quota exceeded, falling back to browser TTS');
          setUsingFallback(true);
          setIsLoading(false);
          setIsPlaying(true);
          
          toast.info('Using browser voice (premium voice unavailable)');
          
          try {
            await speakWithBrowserTTS(text);
            setIsPlaying(false);
            return;
          } catch (fallbackErr) {
            setIsPlaying(false);
            throw new Error('Voice unavailable. Please read the content instead.');
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (!data.audioContent) {
        throw new Error('No audio content received');
      }

      // Use data URI for base64 audio
      const audioUrl = `data:audio/mpeg;base64,${data.audioContent}`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsPlaying(false);
        setError('Failed to play audio');
        audioRef.current = null;
      };

      await audio.play();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate speech';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [voice, stop]);

  return {
    speak,
    stop,
    isLoading,
    isPlaying,
    error,
    usingFallback,
  };
}
