import React from 'react';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoComparisonView } from './DemoComparisonView';

export function DemoComparisonWrapper() {
  const { isDemoMode, demoSettings } = useDemoMode();

  if (!isDemoMode || !demoSettings.compareScenarios) {
    return null;
  }

  return <DemoComparisonView />;
}
