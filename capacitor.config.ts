import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.18c6b7208ab34377aee9d6e25c399d20',
  appName: 'sacredgreeks',
  webDir: 'dist',
  server: {
    url: 'https://18c6b720-8ab3-4377-aee9-d6e25c399d20.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Browser: {
      // Configure in-app browser for external links
      presentationStyle: 'popover'
    }
  }
};

export default config;
