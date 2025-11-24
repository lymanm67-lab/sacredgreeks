import { useState, useEffect } from 'react';

const SETTINGS_KEY = 'dashboard-settings';

export interface DashboardSettings {
  showHeroSection: boolean;
  showGamificationBar: boolean;
  showStatsCards: boolean;
  showStudyGuide: boolean;
  showRecommendations: boolean;
  showQuickActions: boolean;
  showProgressLink: boolean;
  showResources: boolean;
  showChapterResources: boolean;
  showVideos: boolean;
  showCommunityService: boolean;
  showMeetingNotes: boolean;
  showRecentAssessments: boolean;
}

const defaultSettings: DashboardSettings = {
  showHeroSection: true,
  showGamificationBar: true,
  showStatsCards: true,
  showStudyGuide: true,
  showRecommendations: true,
  showQuickActions: true,
  showProgressLink: true,
  showResources: true,
  showChapterResources: true,
  showVideos: true,
  showCommunityService: true,
  showMeetingNotes: true,
  showRecentAssessments: true,
};

export const useDashboardSettings = () => {
  const [settings, setSettings] = useState<DashboardSettings>(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error loading dashboard settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<DashboardSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};
