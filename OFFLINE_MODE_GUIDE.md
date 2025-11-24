# Offline Mode Guide

## Overview

Sacred Greeks now supports comprehensive offline functionality, allowing users to access devotionals, prayers, Bible verses, and study materials even without an internet connection.

## What Works Offline

### ✅ Fully Supported
- **Devotionals**: Last 7 days automatically cached
- **Prayer Journal**: All prayers synced and available offline
- **Bible Verses**: Previously searched verses cached
- **Daily Verse**: Today's verse cached for offline access
- **Navigation**: All cached pages accessible
- **UI**: Full interface available

### ⚠️ Limited Support
- **New Prayers**: Can be created offline, synced when back online
- **Prayer Updates**: Can be marked as answered offline
- **Bible Search**: Only previously searched verses available

### ❌ Requires Connection
- **New Bible Search**: Requires API connection
- **Assessment Submissions**: Needs server connection
- **User Authentication**: Sign in/sign up requires connection
- **Profile Updates**: Needs server sync

## How It Works

### Automatic Caching
1. **Devotionals**: When you visit the devotional page, the last 7 days are automatically cached
2. **Prayers**: All your prayers are cached whenever you load the prayer journal
3. **Bible Verses**: Every verse you search is saved for offline access
4. **Popular Verses**: Common verses pre-cached on first load

### Offline Indicators
- **Amber Badge**: "Offline Mode - Using Cached Data" appears at top when offline
- **Green Badge**: "Back Online - Syncing Data" appears when reconnecting
- **Auto-hide**: Indicators disappear after 3 seconds when back online

### Data Synchronization
- **Automatic**: Happens when you reconnect to the internet
- **Background**: Syncs without interrupting your use
- **Smart**: Only syncs changes made while offline
- **Toast Notifications**: Confirms when sync completes

## Storage Management

### View Statistics
Visit **Profile → Offline Settings** to see:
- Number of cached devotionals
- Number of cached prayers  
- Number of cached Bible verses
- Number of cached study materials

### Cleanup
- **Automatic**: Data older than 30 days removed automatically
- **Manual**: Clean up old data anytime from Offline Settings
- **Smart**: Recent content always kept

### Storage Limits
- **Browser IndexedDB**: Typically 50MB+ available
- **Efficient**: Text-based content uses minimal space
- **Typical Usage**: ~1-2MB for 30 days of content

## User Experience

### When You Go Offline
1. Amber indicator appears at top
2. Cached content loads instantly
3. Can read devotionals, view prayers, access verses
4. Can create new prayers (saved locally)
5. Cannot search new Bible verses
6. Cannot submit assessments

### When You Come Back Online
1. Green indicator shows "Back Online"
2. All offline changes sync automatically
3. New prayers uploaded to server
4. Prayer updates synced
5. Fresh content cached for next offline session
6. Toast notification confirms sync complete

## Technical Details

### Storage Technology
- **IndexedDB**: Browser's built-in database
- **Service Worker**: Caches pages and assets
- **Persistent**: Data survives browser restarts
- **Secure**: Stored locally on your device only

### Data Stores
```
sacred-greeks-offline/
├── devotionals (7 days rolling)
├── prayers (all)
├── bible_verses (searched)
└── study_materials (guides/plans)
```

### Sync Strategy
- **Network-first**: Always tries server first
- **Cache-fallback**: Uses cache if offline
- **Background-sync**: Queues offline changes
- **Conflict-free**: Server always wins on conflicts

## Troubleshooting

### "No cached content available"
- **Solution**: Visit pages while online first to cache them
- **Devotionals**: Visit /devotional once while online
- **Prayers**: Open prayer journal once while online
- **Verses**: Search verses while online to cache them

### Sync not working
- **Check connection**: Ensure you're actually online
- **Refresh page**: Force reload to trigger sync
- **Check settings**: Visit Offline Settings to see status
- **Clear cache**: Use cleanup if data seems corrupted

### Storage full
- **Clean old data**: Use "Clean Up Old Data" in Offline Settings
- **Browser storage**: Check browser storage settings
- **Clear other data**: Remove browser cache/cookies if needed

### Content not updating
- **Pull to refresh**: Swipe down on mobile to refresh
- **Check online status**: Ensure connection is stable
- **Wait for sync**: Give it a few seconds after connecting
- **Manual refresh**: Click browser refresh button

## Best Practices

### For Regular Use
1. Open devotional page daily while online (auto-caches)
2. Check prayer journal occasionally while online (syncs all)
3. Search important verses while online (caches them)
4. Let app sync fully when reconnecting

### For Travel/Commute
1. Open app while on WiFi before leaving
2. Visit devotional page to cache latest
3. Check prayer journal to sync prayers
4. Search any verses you might need

### For Low-Data Usage
1. Enable offline mode by visiting key pages
2. Use cached content instead of reloading
3. Make offline changes, sync later
4. Clean up old cache monthly to save space

## Privacy & Security

- **Local Only**: Cached data stored only on your device
- **Encrypted**: IndexedDB uses browser encryption
- **No Cloud**: Offline data never sent to third parties
- **Clearable**: Can delete all cached data anytime
- **Isolated**: Each browser/device has separate cache

## Future Enhancements

Planned features:
- [ ] Download specific date ranges
- [ ] Export offline data as backup
- [ ] Selective caching (choose what to cache)
- [ ] Offline mode for assessments
- [ ] Background sync for larger content
- [ ] Progressive image loading

## Support

Having issues with offline mode?
1. Visit **/offline-settings** to check status
2. Try manual cleanup and refresh
3. Check browser console for errors
4. Contact support with device/browser details
