import React from 'react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoAnalyticsDashboard } from './DemoAnalyticsDashboard';

export function DemoAnalyticsDashboardWrapper() {
  const { isDemoMode, demoSettings, setDemoSetting } = useDemoMode();

  if (!isDemoMode || !demoSettings.showAnalytics) {
    return null;
  }

  return (
    <DemoAnalyticsDashboard 
      onClose={() => setDemoSetting('showAnalytics', false)} 
    />
  );
}
