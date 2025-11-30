import { useState, useEffect, useCallback } from 'react';

export interface SidebarPreferences {
  position: 'left' | 'right';
  showMain: boolean;
  showCommunity: boolean;
  showResources: boolean;
}

const DEFAULT_PREFERENCES: SidebarPreferences = {
  position: 'left',
  showMain: true,
  showCommunity: true,
  showResources: true,
};

const STORAGE_KEY = 'sidebar-preferences';

export function useSidebarPreferences() {
  const [preferences, setPreferences] = useState<SidebarPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Error loading sidebar preferences:', e);
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.error('Error saving sidebar preferences:', e);
    }
  }, [preferences]);

  const updatePreference = useCallback(<K extends keyof SidebarPreferences>(
    key: K,
    value: SidebarPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
  }, []);

  return {
    preferences,
    updatePreference,
    resetPreferences,
  };
}
