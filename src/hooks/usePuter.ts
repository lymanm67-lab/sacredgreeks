import { useState, useEffect, useCallback, useRef } from 'react';

declare global {
  interface Window {
    puter: any;
  }
}

let sdkLoaded = false;
let sdkLoadPromise: Promise<void> | null = null;

function loadPuterSDK(): Promise<void> {
  if (sdkLoaded && window.puter) return Promise.resolve();
  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;
    script.onload = () => { sdkLoaded = true; resolve(); };
    script.onerror = () => reject(new Error('Failed to load Puter.js SDK'));
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

export interface PuterVideoResult {
  blob: Blob;
  objectUrl: string;
}

export function usePuter() {
  const [isReady, setIsReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  useEffect(() => {
    loadPuterSDK()
      .then(() => setIsReady(true))
      .catch(err => setError(err.message));
  }, []);

  const generateVideo = useCallback(async (prompt: string): Promise<PuterVideoResult> => {
    if (!window.puter) throw new Error('Puter SDK not loaded');
    
    setIsGenerating(true);
    setError(null);
    setProgress('Generating video with Wan AI... This may take 1-3 minutes.');

    try {
      // puter.ai.txt2vid returns an HTMLVideoElement
      const videoElement = await window.puter.ai.txt2vid(prompt, {
        model: 'Wan-AI/Wan2.2-T2V-14B',
      });

      setProgress('Video generated! Extracting...');

      // Extract the video blob from the video element's src
      const videoSrc = videoElement.src;
      let blob: Blob;

      if (videoSrc.startsWith('blob:')) {
        const response = await fetch(videoSrc);
        blob = await response.blob();
      } else if (videoSrc.startsWith('data:')) {
        const response = await fetch(videoSrc);
        blob = await response.blob();
      } else {
        // It's a URL — fetch it
        const response = await fetch(videoSrc);
        blob = await response.blob();
      }

      const objectUrl = URL.createObjectURL(blob);
      setProgress('');
      return { blob, objectUrl };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Puter video generation failed';
      setError(msg);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const generateImageToVideo = useCallback(async (imageUrl: string, prompt: string): Promise<PuterVideoResult> => {
    if (!window.puter) throw new Error('Puter SDK not loaded');
    
    setIsGenerating(true);
    setError(null);
    setProgress('Generating video from image with Wan AI...');

    try {
      const videoElement = await window.puter.ai.img2vid(imageUrl, prompt, {
        model: 'Wan-AI/Wan2.2-I2V-14B',
      });

      setProgress('Video generated! Extracting...');

      const videoSrc = videoElement.src;
      const response = await fetch(videoSrc);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      setProgress('');
      return { blob, objectUrl };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Puter image-to-video failed';
      setError(msg);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    isReady,
    isGenerating,
    error,
    progress,
    generateVideo,
    generateImageToVideo,
  };
}
