import { useCallback } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationOptions {
  type?: 'confetti' | 'stars' | 'emoji';
  emoji?: string;
  duration?: number;
}

export function useMicroCelebration() {
  const celebrate = useCallback((options: CelebrationOptions = {}) => {
    const { type = 'confetti', emoji, duration = 2000 } = options;

    if (type === 'confetti') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#8B5CF6', '#10B981', '#F59E0B', '#EC4899'],
        disableForReducedMotion: true,
      });
    } else if (type === 'stars') {
      const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['star'] as confetti.Shape[],
        colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
      };

      confetti({
        ...defaults,
        particleCount: 20,
        scalar: 1.2,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: 15,
          scalar: 0.75,
          origin: { y: 0.65 },
        });
      }, 100);
    } else if (type === 'emoji' && emoji) {
      // Create floating emoji elements
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        z-index: 9999;
        pointer-events: none;
        animation: celebrate-pop 0.5s ease-out;
      `;
      container.textContent = emoji;
      document.body.appendChild(container);

      setTimeout(() => {
        container.remove();
      }, duration);
    }
  }, []);

  const celebrateDevotional = useCallback(() => {
    celebrate({ type: 'stars' });
  }, [celebrate]);

  const celebratePrayer = useCallback(() => {
    celebrate({ type: 'emoji', emoji: '🙏' });
  }, [celebrate]);

  const celebrateStreak = useCallback((days: number) => {
    if (days >= 7) {
      celebrate({ type: 'confetti' });
    } else {
      celebrate({ type: 'stars' });
    }
  }, [celebrate]);

  const celebrateAchievement = useCallback(() => {
    celebrate({ type: 'confetti' });
  }, [celebrate]);

  return {
    celebrate,
    celebrateDevotional,
    celebratePrayer,
    celebrateStreak,
    celebrateAchievement,
  };
}
