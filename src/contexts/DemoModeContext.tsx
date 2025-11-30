import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

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

export interface DemoSettings {
  preSurveyMode: boolean;
  compareScenarios: boolean;
  analyticsEnabled: boolean;
}

// Preloaded demo data cache
export interface DemoDataCache {
  [key: string]: {
    loaded: boolean;
    timestamp: number;
    data: any;
  };
}

export type DemoScenario = 'new-user' | 'power-user' | 'greek-leader' | 'custom';

export interface DemoScenarioConfig {
  id: DemoScenario;
  name: string;
  description: string;
  icon: string;
  features: DemoFeatures;
  dataLevel: 'minimal' | 'moderate' | 'full';
}

export const DEMO_SCENARIOS: DemoScenarioConfig[] = [
  {
    id: 'new-user',
    name: 'New User',
    description: 'Fresh start with minimal data, perfect for onboarding demos',
    icon: '🌱',
    features: {
      dashboard: true,
      prayerWall: false,
      forum: false,
      bibleStudy: true,
      serviceTracker: false,
      journey: true,
      achievements: false,
      progress: false,
      devotional: true,
      prayerJournal: false,
    },
    dataLevel: 'minimal',
  },
  {
    id: 'power-user',
    name: 'Power User',
    description: 'Active user with rich history and achievements',
    icon: '⚡',
    features: {
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
    },
    dataLevel: 'full',
  },
  {
    id: 'greek-leader',
    name: 'Greek Leader',
    description: 'Chapter leader with community management features',
    icon: '👑',
    features: {
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
    },
    dataLevel: 'full',
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Customize your own demo experience',
    icon: '⚙️',
    features: {
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
    },
    dataLevel: 'moderate',
  },
];

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
  demoSettings: DemoSettings;
  setDemoSetting: (setting: keyof DemoSettings, enabled: boolean) => void;
  refreshDemoData: () => void;
  currentScenario: DemoScenario;
  setScenario: (scenario: DemoScenario) => void;
  startWalkthrough: () => void;
  generateShareLink: () => string;
  preloadScenarioData: (scenario: DemoScenario) => void;
  isDataPreloaded: (scenario: DemoScenario) => boolean;
  dataCache: DemoDataCache;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

const DEMO_MODE_KEY = 'sacred-greeks-demo-mode';
const DEMO_FEATURES_KEY = 'sacred-greeks-demo-features';
const DEMO_TOUR_KEY = 'sacred-greeks-demo-tour-seen';
const DEMO_SETTINGS_KEY = 'sacred-greeks-demo-settings';
const DEMO_SCENARIO_KEY = 'sacred-greeks-demo-scenario';
const DEMO_CACHE_KEY = 'sacred-greeks-demo-cache';

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

const DEFAULT_SETTINGS: DemoSettings = {
  preSurveyMode: false,
  compareScenarios: false,
  analyticsEnabled: true,
};

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('demo') === 'true') {
        return true;
      }
    }
    const stored = localStorage.getItem(DEMO_MODE_KEY);
    return stored === 'true';
  });

  const [currentScenario, setCurrentScenario] = useState<DemoScenario>(() => {
    const stored = localStorage.getItem(DEMO_SCENARIO_KEY);
    return (stored as DemoScenario) || 'power-user';
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

  const [demoSettings, setDemoSettings] = useState<DemoSettings>(() => {
    const stored = localStorage.getItem(DEMO_SETTINGS_KEY);
    if (stored) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  // Data cache for preloaded scenario data
  const [dataCache, setDataCache] = useState<DemoDataCache>(() => {
    const stored = localStorage.getItem(DEMO_CACHE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'true' && !isDemoMode) {
      setIsDemoMode(true);
    }
    // Also check for scenario in URL
    const scenarioParam = urlParams.get('scenario') as DemoScenario | null;
    if (scenarioParam && DEMO_SCENARIOS.some(s => s.id === scenarioParam)) {
      setCurrentScenario(scenarioParam);
      const scenarioConfig = DEMO_SCENARIOS.find(s => s.id === scenarioParam);
      if (scenarioConfig) {
        setDemoFeatures(scenarioConfig.features);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(DEMO_MODE_KEY, String(isDemoMode));
  }, [isDemoMode]);

  useEffect(() => {
    localStorage.setItem(DEMO_SETTINGS_KEY, JSON.stringify(demoSettings));
  }, [demoSettings]);

  useEffect(() => {
    localStorage.setItem(DEMO_FEATURES_KEY, JSON.stringify(demoFeatures));
  }, [demoFeatures]);

  useEffect(() => {
    localStorage.setItem(DEMO_SCENARIO_KEY, currentScenario);
  }, [currentScenario]);

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
    setCurrentScenario('custom');
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

  const setDemoSetting = (setting: keyof DemoSettings, enabled: boolean) => {
    setDemoSettings(prev => ({
      ...prev,
      [setting]: enabled,
    }));
  };

  const refreshDemoData = () => {
    const refreshKey = 'sacred-greeks-demo-refresh';
    localStorage.setItem(refreshKey, String(Date.now()));
    window.dispatchEvent(new CustomEvent('demo-data-refresh'));
  };

  const setScenario = (scenario: DemoScenario) => {
    setCurrentScenario(scenario);
    const scenarioConfig = DEMO_SCENARIOS.find(s => s.id === scenario);
    if (scenarioConfig) {
      setDemoFeatures(scenarioConfig.features);
    }
  };

  const startWalkthrough = () => {
    setHasSeenTour(false);
  };

  // Generate shareable link with current demo configuration
  const generateShareLink = useCallback(() => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    params.set('demo', 'true');
    params.set('scenario', currentScenario);
    return `${baseUrl}?${params.toString()}`;
  }, [currentScenario]);

  // Preload demo data for a specific scenario
  const preloadScenarioData = useCallback((scenario: DemoScenario) => {
    const scenarioConfig = DEMO_SCENARIOS.find(s => s.id === scenario);
    if (!scenarioConfig) return;

    // Generate demo data based on scenario
    const demoData = {
      scenario,
      features: scenarioConfig.features,
      dataLevel: scenarioConfig.dataLevel,
      generatedAt: Date.now(),
    };

    setDataCache(prev => {
      const updated = {
        ...prev,
        [scenario]: {
          loaded: true,
          timestamp: Date.now(),
          data: demoData,
        },
      };
      localStorage.setItem(DEMO_CACHE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if scenario data is preloaded
  const isDataPreloaded = useCallback((scenario: DemoScenario) => {
    const cached = dataCache[scenario];
    if (!cached) return false;
    // Consider data stale after 1 hour
    const isStale = Date.now() - cached.timestamp > 3600000;
    return cached.loaded && !isStale;
  }, [dataCache]);

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
      demoSettings,
      setDemoSetting,
      refreshDemoData,
      currentScenario,
      setScenario,
      startWalkthrough,
      generateShareLink,
      preloadScenarioData,
      isDataPreloaded,
      dataCache,
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
