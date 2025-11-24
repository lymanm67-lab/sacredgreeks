import { useOffline } from './use-offline';
import { offlineStorage, CachedBibleVerse } from '@/lib/offline-storage';

export function useOfflineBible() {
  const { isOffline } = useOffline();

  // Cache a Bible verse
  const cacheVerse = async (reference: string, text: string, translation: string = 'KJV') => {
    try {
      await offlineStorage.cacheBibleVerse({
        reference,
        text,
        translation
      });
    } catch (error) {
      console.error('Failed to cache verse:', error);
    }
  };

  // Search for a verse (check cache first if offline)
  const searchVerse = async (query: string): Promise<any> => {
    if (isOffline) {
      // Try to find in cache
      const cached = await offlineStorage.getBibleVerse(query);
      if (cached) {
        return {
          reference: cached.reference,
          text: cached.text,
          translation_name: cached.translation,
          fromCache: true
        };
      }
      throw new Error('Verse not available offline. Please search while online to cache it.');
    }

    // Fetch from API
    try {
      const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=kjv`);
      
      if (response.ok) {
        const data = await response.json();
        
        // Cache the result
        await cacheVerse(data.reference, data.text, data.translation_name);
        
        return { ...data, fromCache: false };
      }
      
      throw new Error('Verse not found');
    } catch (error) {
      // If offline during fetch, try cache as fallback
      if (!navigator.onLine) {
        const cached = await offlineStorage.getBibleVerse(query);
        if (cached) {
          return {
            reference: cached.reference,
            text: cached.text,
            translation_name: cached.translation,
            fromCache: true
          };
        }
      }
      throw error;
    }
  };

  // Pre-cache popular verses
  const preCachePopularVerses = async () => {
    if (isOffline) return;

    const popularVerses = [
      'john 3:16',
      'romans 8:28',
      'philippians 4:13',
      'psalm 23:1-6',
      'proverbs 3:5-6',
      'jeremiah 29:11',
      'matthew 6:33',
      'isaiah 41:10'
    ];

    for (const verse of popularVerses) {
      try {
        await searchVerse(verse);
      } catch (error) {
        console.error(`Failed to cache ${verse}:`, error);
      }
    }
  };

  return {
    searchVerse,
    cacheVerse,
    preCachePopularVerses,
    isOffline
  };
}
