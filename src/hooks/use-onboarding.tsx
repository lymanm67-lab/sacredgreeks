import React, { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'sacred_greeks_onboarding_completed';

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      // Small delay to ensure smooth transition after login
      setTimeout(() => {
        setShowOnboarding(true);
        setIsChecking(false);
      }, 500);
    } else {
      setIsChecking(false);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setShowOnboarding(false);
  };

  return { showOnboarding, completeOnboarding, isChecking };
}
