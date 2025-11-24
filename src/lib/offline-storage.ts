// IndexedDB wrapper for offline storage
const DB_NAME = 'sacred-greeks-offline';
const DB_VERSION = 1;

export interface CachedDevotional {
  id: string;
  date: string;
  title: string;
  scripture_ref: string;
  scripture_text: string;
  reflection: string;
  proof_focus: string;
  application: string;
  prayer: string;
  cached_at: string;
}

export interface CachedPrayer {
  id: string;
  title: string;
  content: string;
  prayer_type: string;
  answered: boolean;
  answered_at: string | null;
  created_at: string;
  cached_at: string;
}

export interface CachedBibleVerse {
  reference: string;
  text: string;
  translation: string;
  cached_at: string;
}

class OfflineStorage {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Devotionals store
        if (!db.objectStoreNames.contains('devotionals')) {
          const devotionalStore = db.createObjectStore('devotionals', { keyPath: 'id' });
          devotionalStore.createIndex('date', 'date', { unique: false });
          devotionalStore.createIndex('cached_at', 'cached_at', { unique: false });
        }

        // Prayers store
        if (!db.objectStoreNames.contains('prayers')) {
          const prayerStore = db.createObjectStore('prayers', { keyPath: 'id' });
          prayerStore.createIndex('cached_at', 'cached_at', { unique: false });
        }

        // Bible verses store
        if (!db.objectStoreNames.contains('bible_verses')) {
          const verseStore = db.createObjectStore('bible_verses', { keyPath: 'reference' });
          verseStore.createIndex('cached_at', 'cached_at', { unique: false });
        }

        // Study materials store (generic storage)
        if (!db.objectStoreNames.contains('study_materials')) {
          const studyStore = db.createObjectStore('study_materials', { keyPath: 'id' });
          studyStore.createIndex('type', 'type', { unique: false });
          studyStore.createIndex('cached_at', 'cached_at', { unique: false });
        }
      };
    });
  }

  private async getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): Promise<IDBObjectStore> {
    if (!this.db) await this.init();
    const transaction = this.db!.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // Devotionals
  async cacheDevotional(devotional: Omit<CachedDevotional, 'cached_at'>): Promise<void> {
    const store = await this.getStore('devotionals', 'readwrite');
    const data: CachedDevotional = {
      ...devotional,
      cached_at: new Date().toISOString()
    };
    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getDevotional(date: string): Promise<CachedDevotional | null> {
    const store = await this.getStore('devotionals');
    const index = store.index('date');
    return new Promise((resolve, reject) => {
      const request = index.get(date);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getRecentDevotionals(limit: number = 7): Promise<CachedDevotional[]> {
    const store = await this.getStore('devotionals');
    const index = store.index('cached_at');
    return new Promise((resolve, reject) => {
      const request = index.openCursor(null, 'prev');
      const results: CachedDevotional[] = [];
      
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor && results.length < limit) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  // Prayers
  async cachePrayers(prayers: Omit<CachedPrayer, 'cached_at'>[]): Promise<void> {
    const store = await this.getStore('prayers', 'readwrite');
    const cached_at = new Date().toISOString();
    
    return Promise.all(
      prayers.map(prayer => {
        const data: CachedPrayer = { ...prayer, cached_at };
        return new Promise<void>((resolve, reject) => {
          const request = store.put(data);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      })
    ).then(() => {});
  }

  async getAllPrayers(): Promise<CachedPrayer[]> {
    const store = await this.getStore('prayers');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deletePrayer(id: string): Promise<void> {
    const store = await this.getStore('prayers', 'readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Bible Verses
  async cacheBibleVerse(verse: Omit<CachedBibleVerse, 'cached_at'>): Promise<void> {
    const store = await this.getStore('bible_verses', 'readwrite');
    const data: CachedBibleVerse = {
      ...verse,
      cached_at: new Date().toISOString()
    };
    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getBibleVerse(reference: string): Promise<CachedBibleVerse | null> {
    const store = await this.getStore('bible_verses');
    return new Promise((resolve, reject) => {
      const request = store.get(reference);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  // Study Materials (generic storage for reading plans, guides, etc.)
  async cacheStudyMaterial(id: string, type: string, data: any): Promise<void> {
    const store = await this.getStore('study_materials', 'readwrite');
    const material = {
      id,
      type,
      data,
      cached_at: new Date().toISOString()
    };
    return new Promise((resolve, reject) => {
      const request = store.put(material);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getStudyMaterial(id: string): Promise<any | null> {
    const store = await this.getStore('study_materials');
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result?.data || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getStudyMaterialsByType(type: string): Promise<any[]> {
    const store = await this.getStore('study_materials');
    const index = store.index('type');
    return new Promise((resolve, reject) => {
      const request = index.getAll(type);
      request.onsuccess = () => resolve(request.result.map(r => r.data));
      request.onerror = () => reject(request.error);
    });
  }

  // Cleanup old cached data (keep last 30 days)
  async cleanupOldCache(): Promise<void> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffDate = thirtyDaysAgo.toISOString();

    const stores = ['devotionals', 'bible_verses', 'study_materials'];
    
    for (const storeName of stores) {
      const store = await this.getStore(storeName, 'readwrite');
      const index = store.index('cached_at');
      const request = index.openCursor(IDBKeyRange.upperBound(cutoffDate));
      
      await new Promise<void>((resolve) => {
        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor) {
            cursor.delete();
            cursor.continue();
          } else {
            resolve();
          }
        };
      });
    }
  }

  // Get storage stats
  async getStorageStats(): Promise<{
    devotionals: number;
    prayers: number;
    verses: number;
    materials: number;
  }> {
    const [devotionals, prayers, verses, materials] = await Promise.all([
      this.getStore('devotionals').then(s => new Promise<number>(resolve => {
        const request = s.count();
        request.onsuccess = () => resolve(request.result);
      })),
      this.getStore('prayers').then(s => new Promise<number>(resolve => {
        const request = s.count();
        request.onsuccess = () => resolve(request.result);
      })),
      this.getStore('bible_verses').then(s => new Promise<number>(resolve => {
        const request = s.count();
        request.onsuccess = () => resolve(request.result);
      })),
      this.getStore('study_materials').then(s => new Promise<number>(resolve => {
        const request = s.count();
        request.onsuccess = () => resolve(request.result);
      }))
    ]);

    return { devotionals, prayers, verses, materials };
  }
}

export const offlineStorage = new OfflineStorage();
