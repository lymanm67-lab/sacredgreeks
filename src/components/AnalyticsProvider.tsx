import { useAnalytics } from '@/hooks/use-analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  useAnalytics();
  return <>{children}</>;
};
