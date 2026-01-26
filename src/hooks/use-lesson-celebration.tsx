import { useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useCelebration } from '@/contexts/CelebrationContext';

interface UseLessonCelebrationProps {
  lessonId: number;
  lessonTitle: string;
}

const LESSON_COLORS: Record<number, string[]> = {
  1: ['#3B82F6', '#60A5FA', '#93C5FD'], // Blue for Pledge
  2: ['#8B5CF6', '#A78BFA', '#C4B5FD'], // Purple for Rituals
  3: ['#F97316', '#FB923C', '#FDBA74'], // Orange for Oaths
  4: ['#22C55E', '#4ADE80', '#86EFAC'], // Green for Obscurity
  5: ['#EF4444', '#F87171', '#FCA5A5'], // Red for Founders
};

const MILESTONE_POINTS: Record<number, number> = {
  1: 10,  // First lesson
  2: 15,
  3: 20,  // Halfway
  4: 25,
  5: 50,  // Course complete
};

export function useLessonCelebration() {
  const { celebrate } = useCelebration();

  const triggerLessonComplete = useCallback((lessonId: number, lessonTitle: string) => {
    const colors = LESSON_COLORS[lessonId] || ['#FFD700', '#FFA500', '#FF6347'];
    const points = MILESTONE_POINTS[lessonId] || 10;

    // Burst from the sides
    confetti({
      particleCount: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.6 },
      colors,
      startVelocity: 35,
    });

    confetti({
      particleCount: 60,
      spread: 55,
      origin: { x: 0.9, y: 0.6 },
      colors,
      startVelocity: 35,
    });

    // Center star burst
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        shapes: ['star'],
        colors: ['#FFD700', '#FFA500'],
        scalar: 1.3,
      });
    }, 200);

    // Trigger the celebration overlay
    celebrate({
      points,
      title: `${lessonTitle} Complete!`,
    });
  }, [celebrate]);

  const triggerMilestone = useCallback((milestone: 'first' | 'halfway' | 'complete') => {
    const config = {
      first: { points: 15, title: 'First Lesson Complete!' },
      halfway: { points: 25, title: 'Halfway There!' },
      complete: { points: 100, title: 'Course Complete! 🎓' },
    }[milestone];

    // Grand celebration for course completion
    if (milestone === 'complete') {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFA500', '#FF6347', '#9333EA', '#3B82F6'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFA500', '#FF6347', '#9333EA', '#3B82F6'],
        });
      }, 250);
    }

    celebrate(config);
  }, [celebrate]);

  return {
    triggerLessonComplete,
    triggerMilestone,
  };
}
