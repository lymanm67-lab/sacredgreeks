import { useAnalytics } from '@/hooks/use-analytics';
import { useEnhancedAnalytics } from '@/hooks/use-enhanced-analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  // Use both legacy and enhanced analytics
  useAnalytics();
  useEnhancedAnalytics();
  return <>{children}</>;
};
