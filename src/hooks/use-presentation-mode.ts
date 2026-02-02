import { useDemoMode } from '@/contexts/DemoModeContext';

/**
 * Hook to check if the app is in Presentation Mode
 * Use this to conditionally hide real user data and show sample content
 */
export function usePresentationMode() {
  const { isDemoMode, demoSettings } = useDemoMode();
  
  const isPresentationMode = isDemoMode && demoSettings.presentationMode;
  
  return {
    isPresentationMode,
    // Helper to get the appropriate data based on mode
    getData: <T>(realData: T, sampleData: T): T => {
      return isPresentationMode ? sampleData : realData;
    },
    // Helper to anonymize names in presentation mode
    anonymizeName: (name: string, fallback: string = 'Demo User'): string => {
      return isPresentationMode ? fallback : name;
    },
    // Helper to hide email addresses
    anonymizeEmail: (email: string): string => {
      if (!isPresentationMode) return email;
      const [, domain] = email.split('@');
      return `demo@${domain || 'example.com'}`;
    },
  };
}
