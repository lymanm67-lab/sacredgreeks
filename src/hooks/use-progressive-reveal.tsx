import { useState, useEffect, useCallback } from 'react';

export interface RevealStage {
  id: number;
  label: string;
  unlocked: boolean;
}

const STAGES = [
  { id: 1, label: 'Introduction' },
  { id: 2, label: 'Scripture Toolkit' },
  { id: 3, label: 'Sample Response' },
  { id: 4, label: 'P.R.O.O.F. Preview' },
  { id: 5, label: 'Full Access' }, // Requires signup
];

export function useProgressiveReveal(limitedAccess: boolean) {
  const [currentStage, setCurrentStage] = useState(1);
  const [engagementScore, setEngagementScore] = useState(0);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  // Track time spent on page
  useEffect(() => {
    if (!limitedAccess) return;

    const interval = setInterval(() => {
      setEngagementScore(prev => {
        const newScore = prev + 1;
        // Auto-unlock stage 2 after 5 seconds
        if (newScore >= 5 && currentStage < 2) {
          setCurrentStage(2);
        }
        return newScore;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [limitedAccess, currentStage]);

  // Track scroll position
  useEffect(() => {
    if (!limitedAccess) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Unlock stage 3 at 30% scroll
      if (scrollPercent >= 30 && currentStage < 3) {
        setCurrentStage(3);
      }

      // Unlock stage 4 at 60% scroll
      if (scrollPercent >= 60 && currentStage < 4) {
        setCurrentStage(4);
      }

      // Track if scrolled near bottom
      if (scrollPercent >= 90) {
        setHasScrolledToBottom(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [limitedAccess, currentStage]);

  const unlockNextStage = useCallback(() => {
    setCurrentStage(prev => Math.min(prev + 1, 4));
  }, []);

  const stages: RevealStage[] = STAGES.map(stage => ({
    ...stage,
    unlocked: !limitedAccess || stage.id <= currentStage,
  }));

  return {
    currentStage,
    stages,
    engagementScore,
    hasScrolledToBottom,
    unlockNextStage,
    isFullyUnlocked: !limitedAccess || currentStage >= 5,
  };
}
