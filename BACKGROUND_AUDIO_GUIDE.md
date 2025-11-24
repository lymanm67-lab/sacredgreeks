# Background Audio Playback Guide

## Overview
Sacred Greeks now supports background audio playback, allowing devotionals and other audio content to continue playing when the app is minimized or the screen is locked on mobile devices.

## Features

### 1. Media Session API Integration
- **Lock Screen Controls**: Play, pause, and stop controls appear on the device lock screen
- **Notification Controls**: Media controls in the notification shade (Android) or Control Center (iOS)
- **Metadata Display**: Shows title, artist (Sacred Greeks), and app icon during playback

### 2. Supported Actions
- **Play/Pause**: Control playback from lock screen or notification
- **Stop**: Completely stop audio playback
- **Seek Forward**: Skip ahead 10 seconds
- **Seek Backward**: Go back 10 seconds
- **Position Tracking**: Shows current position and duration in media controls

### 3. Device Compatibility
- **iOS**: Full support with Control Center integration
- **Android**: Full support with notification controls
- **Progressive Web App (PWA)**: Works when installed to home screen
- **Desktop**: Media controls in browser toolbar (Chrome, Edge, Safari)

## How It Works

### For Users
1. **Start Audio**: Tap the speaker icon on any content (devotionals, Did You Know items, etc.)
2. **Minimize App**: Press home button or switch to another app
3. **Control Playback**: Use lock screen or notification controls to manage playback
4. **Resume**: Open the app again to see current playback status

### For Developers
The `useBackgroundAudio` hook handles all Media Session API integration:
```typescript
const { setAudioRef, updatePlaybackState, updatePositionState } = useBackgroundAudio({
  title: "Content Title",
  artist: "Sacred Greeks",
  onPlay: () => { /* handle play */ },
  onPause: () => { /* handle pause */ },
  onStop: () => { /* handle stop */ },
  onSeekBackward: () => { /* seek -10s */ },
  onSeekForward: () => { /* seek +10s */ },
});
```

## Platform-Specific Notes

### iOS
- **Requirements**: iOS 13.4+ for full Media Session API support
- **Background Mode**: Configured in `capacitor.config.ts` with `audio` background mode
- **Controls**: Appear in Control Center and lock screen
- **Note**: First playback requires user interaction due to iOS autoplay policies

### Android
- **Requirements**: Android 5.0+ (API level 21+)
- **Notifications**: Media controls appear in notification shade
- **Background**: Audio continues even with app in background
- **Battery**: Optimized to minimize battery usage

### PWA (Web)
- **Installation**: Must be installed to home screen for best results
- **Browser Support**: Chrome, Edge, Safari (with limitations)
- **Offline**: Works with cached audio content

## Technical Implementation

### Audio Element Configuration
```typescript
const audio = new Audio(audioUrl);
audio.onended = () => {
  updatePlaybackState("none");
  // Cleanup
};

const playPromise = audio.play();
if (playPromise !== undefined) {
  await playPromise;
  updatePlaybackState("playing");
}
```

### Position State Updates
Position is automatically tracked and updated in media controls:
```typescript
navigator.mediaSession.setPositionState({
  duration: audio.duration,
  position: audio.currentTime,
  playbackRate: 1.0,
});
```

### Metadata Configuration
```typescript
navigator.mediaSession.metadata = new MediaMetadata({
  title: "Devotional Title",
  artist: "Sacred Greeks",
  artwork: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
});
```

## Troubleshooting

### Audio Won't Play in Background
1. **iOS**: Ensure app is installed as PWA or using Capacitor native app
2. **Android**: Check battery optimization settings aren't killing the app
3. **Web**: Install app to home screen for PWA capabilities

### Controls Not Appearing
1. **Check Support**: Verify device supports Media Session API
2. **Browser**: Update to latest version (Chrome 73+, Safari 13.1+)
3. **Permissions**: Ensure audio permissions are granted

### Audio Stops When Screen Locks
1. **iOS**: Verify background audio mode is enabled in `capacitor.config.ts`
2. **Android**: Check "Background app refresh" is enabled
3. **PWA**: Reinstall app from browser to ensure proper configuration

## Best Practices

### For Content Creators
- Keep audio segments under 15 minutes for optimal background performance
- Provide clear titles for better media control display
- Test on both iOS and Android devices

### For Developers
- Always handle play promises to catch autoplay failures
- Clean up audio resources when component unmounts
- Update playback state for accurate media control display
- Test with screen locked and app backgrounded

## Future Enhancements
- [ ] Queue multiple audio items for continuous playback
- [ ] Download audio for offline background playback
- [ ] Playlist management with skip next/previous
- [ ] Variable playback speed controls
- [ ] Sleep timer functionality

## Resources
- [Media Session API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API)
- [iOS Background Audio Guidelines](https://developer.apple.com/documentation/avfoundation/media_playback/configuring_your_app_for_background_audio)
- [Android Media Controls](https://developer.android.com/guide/topics/media-apps/audio-app/building-a-mediabrowser-client)
