# Mobile App Setup with Capacitor

This project is configured for native mobile app development using Capacitor. External links will automatically open in an in-app browser on mobile devices.

## Quick Start (Testing in Browser)

Your app already works as a PWA in browsers! No additional setup needed.

## Native Mobile App Setup

If you want to build a true native mobile app for iOS/Android:

### Prerequisites
- **For iOS**: Mac with Xcode installed
- **For Android**: Android Studio installed
- Node.js and npm installed

### Setup Steps

1. **Export to GitHub**
   - Click "Export to Github" button in Lovable
   - Clone your repository locally:
   ```bash
   git clone <your-repo-url>
   cd <your-repo>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize Capacitor** (already configured in `capacitor.config.ts`)
   ```bash
   npx cap init
   ```

4. **Add Platforms**
   ```bash
   # For iOS (Mac only)
   npx cap add ios
   
   # For Android
   npx cap add android
   ```

5. **Update Native Dependencies**
   ```bash
   # For iOS
   npx cap update ios
   
   # For Android
   npx cap update android
   ```

6. **Build Your App**
   ```bash
   npm run build
   ```

7. **Sync to Native Platform**
   ```bash
   npx cap sync
   ```

8. **Run on Device/Emulator**
   ```bash
   # For iOS
   npx cap run ios
   
   # For Android
   npx cap run android
   ```

## Features

### In-App Browser
External links automatically open in an in-app browser on mobile:
- Bible Gateway, YouVersion, and other Bible resources
- YouTube videos
- External resources and assessments

### PWA Features
- Installable from browser
- Offline support
- Push notifications
- Home screen icon

## Development

During development, the app is configured to hot-reload from:
```
https://18c6b720-8ab3-4377-aee9-d6e25c399d20.lovableproject.com
```

This allows you to see changes immediately without rebuilding the native app.

## After Making Changes

1. Push changes to your GitHub repository
2. Pull latest changes locally
3. Run `npx cap sync` to update native platforms
4. Rebuild if needed: `npm run build && npx cap sync`

## Troubleshooting

**Q: Links not opening in in-app browser?**
- Make sure `@capacitor/browser` is installed: `npm install @capacitor/browser`
- Run `npx cap sync` after installation

**Q: App not updating on device?**
- Clear app data/cache on device
- Rebuild: `npm run build && npx cap sync`
- Restart the app

**Q: Cannot run iOS?**
- iOS development requires a Mac with Xcode
- Ensure you have the latest Xcode installed

## Learn More

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capacitor Browser Plugin](https://capacitorjs.com/docs/apis/browser)
- [Lovable Capacitor Guide](https://docs.lovable.dev/tips-tricks/capacitor)
