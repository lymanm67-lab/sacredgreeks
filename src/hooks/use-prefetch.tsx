import { useCallback, useEffect, useRef } from 'react';

interface PrefetchOptions {
  delay?: number;
  priority?: 'high' | 'low';
}

// Cache for prefetched routes
const prefetchedRoutes = new Set<string>();

// Dynamic imports map for route prefetching
const routeImports: Record<string, () => Promise<unknown>> = {
  '/dashboard': () => import('@/pages/Dashboard'),
  '/devotional': () => import('@/pages/Devotional'),
  '/prayer-journal': () => import('@/pages/PrayerJournal'),
  '/prayer-wall': () => import('@/pages/PrayerWall'),
  '/bible-study': () => import('@/pages/BibleStudy'),
  '/profile': () => import('@/pages/Profile'),
  '/bookmarks': () => import('@/pages/Bookmarks'),
  '/achievements': () => import('@/pages/Achievements'),
  '/journey': () => import('@/pages/Journey'),
  '/myth-buster': () => import('@/pages/MythBuster'),
  '/symbol-guide': () => import('@/pages/SymbolGuide'),
  '/ask-dr-lyman': () => import('@/pages/AskDrLyman'),
  '/content-hub': () => import('@/pages/ContentHub'),
  '/service-tracker': () => import('@/pages/ServiceTracker'),
  '/study-guide': () => import('@/pages/StudyGuide'),
  '/prayer-guide': () => import('@/pages/PrayerGuide'),
  '/forum': () => import('@/pages/Forum'),
  '/community': () => import('@/pages/OrgCommunity'),
};

export function usePrefetch() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const prefetchRoute = useCallback((route: string, options: PrefetchOptions = {}) => {
    const { delay = 150, priority = 'low' } = options;

    // Skip if already prefetched
    if (prefetchedRoutes.has(route)) return;

    // Skip if route doesn't exist in our map
    const importFn = routeImports[route];
    if (!importFn) return;

    const doPrefetch = () => {
      // Use requestIdleCallback for low priority, immediate for high priority
      if (priority === 'low' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          importFn()
            .then(() => prefetchedRoutes.add(route))
            .catch(() => {}); // Silently fail
        });
      } else {
        importFn()
          .then(() => prefetchedRoutes.add(route))
          .catch(() => {});
      }
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(doPrefetch, delay);
    } else {
      doPrefetch();
    }
  }, []);

  const cancelPrefetch = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    prefetchRoute,
    cancelPrefetch,
    isPrefetched: (route: string) => prefetchedRoutes.has(route),
  };
}

// Hook for prefetching on link hover
export function useLinkPrefetch(route: string, options: PrefetchOptions = {}) {
  const { prefetchRoute, cancelPrefetch } = usePrefetch();

  const onMouseEnter = useCallback(() => {
    prefetchRoute(route, options);
  }, [route, options, prefetchRoute]);

  const onMouseLeave = useCallback(() => {
    cancelPrefetch();
  }, [cancelPrefetch]);

  return {
    onMouseEnter,
    onMouseLeave,
  };
}

// Prefetch multiple routes at once (for dashboard, etc.)
export function prefetchCommonRoutes() {
  const commonRoutes = ['/dashboard', '/devotional', '/prayer-journal', '/bible-study'];
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      commonRoutes.forEach(route => {
        const importFn = routeImports[route];
        if (importFn && !prefetchedRoutes.has(route)) {
          importFn()
            .then(() => prefetchedRoutes.add(route))
            .catch(() => {});
        }
      });
    });
  }
}