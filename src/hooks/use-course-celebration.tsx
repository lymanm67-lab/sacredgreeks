import { useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface UseCourseCompletionProps {
  completedLessons: number;
  totalLessons: number;
}

export function useCourseCompletion({ completedLessons, totalLessons }: UseCourseCompletionProps) {
  const hasCompletedRef = useRef(false);
  const previousCompletedRef = useRef(completedLessons);

  const triggerCelebration = useCallback(() => {
    // Grand celebration with multiple bursts
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // First burst - confetti from both sides
    confetti({
      ...defaults,
      particleCount: 100,
      origin: { x: 0.1, y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF6347', '#9333EA', '#3B82F6'],
    });

    confetti({
      ...defaults,
      particleCount: 100,
      origin: { x: 0.9, y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF6347', '#9333EA', '#3B82F6'],
    });

    // Continuous celebration
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Random bursts from different positions
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#FFA500', '#FF6347'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 },
        colors: ['#9333EA', '#3B82F6', '#10B981'],
      });
    }, 250);

    // Stars burst in the center
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        shapes: ['star'],
        colors: ['#FFD700', '#FFA500', '#FFCA6C'],
        scalar: 1.5,
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if we just completed the course (transition from not complete to complete)
    const justCompleted = 
      completedLessons === totalLessons && 
      previousCompletedRef.current < totalLessons &&
      !hasCompletedRef.current;

    if (justCompleted) {
      hasCompletedRef.current = true;
      triggerCelebration();
    }

    previousCompletedRef.current = completedLessons;
  }, [completedLessons, totalLessons, triggerCelebration]);

  // Manual trigger for testing or replay
  const celebrate = useCallback(() => {
    triggerCelebration();
  }, [triggerCelebration]);

  return {
    celebrate,
    isComplete: completedLessons === totalLessons,
  };
}
