import { useEffect, useRef } from "react";

interface BackgroundAudioOptions {
  title: string;
  artist?: string;
  artwork?: { src: string; sizes: string; type: string }[];
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onSeekBackward?: () => void;
  onSeekForward?: () => void;
}

export const useBackgroundAudio = (options: BackgroundAudioOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!("mediaSession" in navigator)) {
      console.log("Media Session API not supported");
      return;
    }

    // Set metadata for background playback controls
    navigator.mediaSession.metadata = new MediaMetadata({
      title: options.title,
      artist: options.artist || "Sacred Greeks",
      artwork: options.artwork || [
        {
          src: "/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });

    // Set action handlers for media controls
    navigator.mediaSession.setActionHandler("play", () => {
      console.log("Background: Play action");
      options.onPlay?.();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      console.log("Background: Pause action");
      options.onPause?.();
    });

    navigator.mediaSession.setActionHandler("stop", () => {
      console.log("Background: Stop action");
      options.onStop?.();
    });

    navigator.mediaSession.setActionHandler("seekbackward", () => {
      console.log("Background: Seek backward action");
      options.onSeekBackward?.();
    });

    navigator.mediaSession.setActionHandler("seekforward", () => {
      console.log("Background: Seek forward action");
      options.onSeekForward?.();
    });

    // Cleanup
    return () => {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("stop", null);
      navigator.mediaSession.setActionHandler("seekbackward", null);
      navigator.mediaSession.setActionHandler("seekforward", null);
    };
  }, [options.title, options.artist]);

  const setAudioRef = (audio: HTMLAudioElement | null) => {
    audioRef.current = audio;
  };

  const updatePlaybackState = (state: "playing" | "paused" | "none") => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.playbackState = state;
    }
  };

  const updatePositionState = (duration: number, position: number) => {
    if ("mediaSession" in navigator && "setPositionState" in navigator.mediaSession) {
      try {
        navigator.mediaSession.setPositionState({
          duration,
          position,
          playbackRate: 1.0,
        });
      } catch (error) {
        console.error("Error updating position state:", error);
      }
    }
  };

  return {
    setAudioRef,
    updatePlaybackState,
    updatePositionState,
  };
};
