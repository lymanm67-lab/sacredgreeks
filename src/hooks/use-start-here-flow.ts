import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const START_HERE_SHOWN_KEY = "sacred_greeks_start_here_shown";

export function useStartHereFlow() {
  const [showStartHere, setShowStartHere] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setShowStartHere(false);
      return;
    }

    // Check if we've already shown this to the user
    const hasShown = localStorage.getItem(`${START_HERE_SHOWN_KEY}_${user.id}`);
    
    if (!hasShown) {
      // Small delay to let dashboard load first
      const timer = setTimeout(() => {
        setShowStartHere(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const completeStartHere = () => {
    if (user) {
      localStorage.setItem(`${START_HERE_SHOWN_KEY}_${user.id}`, "true");
    }
    setShowStartHere(false);
  };

  const skipStartHere = () => {
    if (user) {
      localStorage.setItem(`${START_HERE_SHOWN_KEY}_${user.id}`, "skipped");
    }
    setShowStartHere(false);
  };

  const resetStartHere = () => {
    if (user) {
      localStorage.removeItem(`${START_HERE_SHOWN_KEY}_${user.id}`);
    }
  };

  return {
    showStartHere,
    completeStartHere,
    skipStartHere,
    resetStartHere,
  };
}
