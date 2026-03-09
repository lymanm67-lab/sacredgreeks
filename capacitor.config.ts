import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sacredgreeks.app',
  appName: 'Sacred Greeks Life',
  webDir: 'dist',
  server: {
    url: 'https://18c6b720-8ab3-4377-aee9-d6e25c399d20.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Browser: {
      presentationStyle: 'popover'
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a2e',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1a1a2e',
    },
  },
  ios: {
    scheme: 'Sacred Greeks Life',
    contentInset: 'automatic',
    backgroundColor: '#1a1a2e',
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#1a1a2e',
  }
};

export default config;
