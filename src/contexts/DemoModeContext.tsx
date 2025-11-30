import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface DemoFeatures {
  dashboard: boolean;
  prayerWall: boolean;
  forum: boolean;
  bibleStudy: boolean;
  serviceTracker: boolean;
  journey: boolean;
  achievements: boolean;
  progress: boolean;
  devotional: boolean;
  prayerJournal: boolean;
}

interface DemoModeContextType {
  isDemoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
  toggleDemoMode: () => void;
  demoFeatures: DemoFeatures;
  setDemoFeature: (feature: keyof DemoFeatures, enabled: boolean) => void;
  resetDemoFeatures: () => void;
  enableAllFeatures: () => void;
  disableAllFeatures: () => void;
  hasSeenTour: boolean;
  setHasSeenTour: (seen: boolean) => void;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

const DEMO_MODE_KEY = 'sacred-greeks-demo-mode';
const DEMO_FEATURES_KEY = 'sacred-greeks-demo-features';
const DEMO_TOUR_KEY = 'sacred-greeks-demo-tour-seen';

const DEFAULT_FEATURES: DemoFeatures = {
  dashboard: true,
  prayerWall: true,
  forum: true,
  bibleStudy: true,
  serviceTracker: true,
  journey: true,
  achievements: true,
  progress: true,
  devotional: true,
  prayerJournal: true,
};

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    const stored = localStorage.getItem(DEMO_MODE_KEY);
    return stored === 'true';
  });

  const [demoFeatures, setDemoFeatures] = useState<DemoFeatures>(() => {
    const stored = localStorage.getItem(DEMO_FEATURES_KEY);
    if (stored) {
      try {
        return { ...DEFAULT_FEATURES, ...JSON.parse(stored) };
      } catch {
        return DEFAULT_FEATURES;
      }
    }
    return DEFAULT_FEATURES;
  });

  const [hasSeenTour, setHasSeenTourState] = useState(() => {
    return localStorage.getItem(DEMO_TOUR_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(DEMO_MODE_KEY, String(isDemoMode));
  }, [isDemoMode]);

  useEffect(() => {
    localStorage.setItem(DEMO_FEATURES_KEY, JSON.stringify(demoFeatures));
  }, [demoFeatures]);

  const setDemoMode = (enabled: boolean) => {
    setIsDemoMode(enabled);
  };

  const toggleDemoMode = () => {
    setIsDemoMode(prev => !prev);
  };

  const setDemoFeature = (feature: keyof DemoFeatures, enabled: boolean) => {
    setDemoFeatures(prev => ({
      ...prev,
      [feature]: enabled,
    }));
  };

  const resetDemoFeatures = () => {
    setDemoFeatures(DEFAULT_FEATURES);
  };

  const enableAllFeatures = () => {
    const allEnabled = Object.keys(DEFAULT_FEATURES).reduce((acc, key) => ({
      ...acc,
      [key]: true,
    }), {} as DemoFeatures);
    setDemoFeatures(allEnabled);
  };

  const disableAllFeatures = () => {
    const allDisabled = Object.keys(DEFAULT_FEATURES).reduce((acc, key) => ({
      ...acc,
      [key]: false,
    }), {} as DemoFeatures);
    setDemoFeatures(allDisabled);
  };

  const setHasSeenTour = (seen: boolean) => {
    setHasSeenTourState(seen);
    localStorage.setItem(DEMO_TOUR_KEY, String(seen));
  };

  return (
    <DemoModeContext.Provider value={{ 
      isDemoMode, 
      setDemoMode, 
      toggleDemoMode,
      demoFeatures,
      setDemoFeature,
      resetDemoFeatures,
      enableAllFeatures,
      disableAllFeatures,
      hasSeenTour,
      setHasSeenTour,
    }}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoModeContext);
  if (context === undefined) {
    throw new Error('useDemoMode must be used within a DemoModeProvider');
  }
  return context;
}
