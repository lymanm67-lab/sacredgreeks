import type React from 'react';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

// Temporarily disabled analytics tracking to avoid hook issues
export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  return <>{children}</>;
};
