import { useState, useEffect, useCallback } from 'react';

export interface DemoSession {
  id: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  scenario: string;
}

export interface ScenarioSwitch {
  from: string;
  to: string;
  timestamp: number;
}

export interface FeatureInteraction {
  feature: string;
  action: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export interface DemoAnalytics {
  sessions: DemoSession[];
  scenarioSwitches: ScenarioSwitch[];
  featureInteractions: FeatureInteraction[];
  lastUpdated: number;
}

const DEMO_ANALYTICS_KEY = 'sacred-greeks-demo-analytics';

const DEFAULT_ANALYTICS: DemoAnalytics = {
  sessions: [],
  scenarioSwitches: [],
  featureInteractions: [],
  lastUpdated: Date.now(),
};

export function useDemoAnalytics() {
  const [analytics, setAnalytics] = useState<DemoAnalytics>(() => {
    const stored = localStorage.getItem(DEMO_ANALYTICS_KEY);
    if (stored) {
      try {
        return { ...DEFAULT_ANALYTICS, ...JSON.parse(stored) };
      } catch {
        return DEFAULT_ANALYTICS;
      }
    }
    return DEFAULT_ANALYTICS;
  });

  const [currentSession, setCurrentSession] = useState<DemoSession | null>(null);

  // Persist analytics to localStorage
  useEffect(() => {
    localStorage.setItem(DEMO_ANALYTICS_KEY, JSON.stringify(analytics));
  }, [analytics]);

  // Start a new demo session
  const startSession = useCallback((scenario: string) => {
    const session: DemoSession = {
      id: `session-${Date.now()}`,
      startTime: Date.now(),
      scenario,
    };
    setCurrentSession(session);
    return session;
  }, []);

  // End the current session
  const endSession = useCallback(() => {
    if (!currentSession) return;

    const endedSession: DemoSession = {
      ...currentSession,
      endTime: Date.now(),
      duration: Date.now() - currentSession.startTime,
    };

    setAnalytics(prev => ({
      ...prev,
      sessions: [...prev.sessions, endedSession],
      lastUpdated: Date.now(),
    }));

    setCurrentSession(null);
  }, [currentSession]);

  // Track scenario switch
  const trackScenarioSwitch = useCallback((from: string, to: string) => {
    const switchEvent: ScenarioSwitch = {
      from,
      to,
      timestamp: Date.now(),
    };

    setAnalytics(prev => ({
      ...prev,
      scenarioSwitches: [...prev.scenarioSwitches, switchEvent],
      lastUpdated: Date.now(),
    }));
  }, []);

  // Track feature interaction
  const trackFeatureInteraction = useCallback((
    feature: string, 
    action: string, 
    data?: Record<string, unknown>
  ) => {
    const interaction: FeatureInteraction = {
      feature,
      action,
      timestamp: Date.now(),
      data,
    };

    setAnalytics(prev => ({
      ...prev,
      featureInteractions: [...prev.featureInteractions, interaction],
      lastUpdated: Date.now(),
    }));
  }, []);

  // Clear all analytics
  const clearAnalytics = useCallback(() => {
    setAnalytics(DEFAULT_ANALYTICS);
    localStorage.removeItem(DEMO_ANALYTICS_KEY);
  }, []);

  // Export analytics as JSON
  const exportAnalytics = useCallback(() => {
    const dataStr = JSON.stringify(analytics, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `demo-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, [analytics]);

  // Get summary stats
  const getStats = useCallback(() => {
    const totalSessions = analytics.sessions.length;
    const totalTime = analytics.sessions.reduce((acc, s) => acc + (s.duration || 0), 0);
    const avgSessionTime = totalSessions > 0 ? totalTime / totalSessions : 0;
    const totalInteractions = analytics.featureInteractions.length;
    const totalSwitches = analytics.scenarioSwitches.length;

    return {
      totalSessions,
      totalTime,
      avgSessionTime,
      totalInteractions,
      totalSwitches,
    };
  }, [analytics]);

  return {
    analytics,
    currentSession,
    startSession,
    endSession,
    trackScenarioSwitch,
    trackFeatureInteraction,
    clearAnalytics,
    exportAnalytics,
    getStats,
  };
}
