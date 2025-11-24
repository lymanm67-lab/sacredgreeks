import { useEffect, useState, useRef, useCallback } from 'react';
import { useIsMobile } from './use-mobile';

interface PullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  maxPullDistance?: number;
  enabled?: boolean;
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  maxPullDistance = 150,
  enabled = true
}: PullToRefreshOptions) {
  const isMobile = useIsMobile();
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartRef = useRef<number>(0);
  const pullStartedRef = useRef<boolean>(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Only start if scrolled to top
    if (window.scrollY === 0) {
      touchStartRef.current = e.touches[0].clientY;
      pullStartedRef.current = false;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!enabled || !isMobile || isRefreshing) return;
    
    const touchY = e.touches[0].clientY;
    const distance = touchY - touchStartRef.current;

    // Only track if pulling down and at top of page
    if (distance > 0 && window.scrollY === 0) {
      pullStartedRef.current = true;
      setIsPulling(true);
      
      // Apply resistance to pull distance
      const resistedDistance = Math.min(
        distance * 0.5,
        maxPullDistance
      );
      setPullDistance(resistedDistance);
      
      // Prevent default scroll behavior when pulling
      if (resistedDistance > 10) {
        e.preventDefault();
      }
    }
  }, [enabled, isMobile, isRefreshing, maxPullDistance]);

  const handleTouchEnd = useCallback(async () => {
    if (!pullStartedRef.current) return;

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh error:', error);
      } finally {
        setIsRefreshing(false);
      }
    }

    setIsPulling(false);
    setPullDistance(0);
    pullStartedRef.current = false;
  }, [pullDistance, threshold, isRefreshing, onRefresh]);

  useEffect(() => {
    if (!enabled || !isMobile) return;

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, isMobile, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    isPulling,
    isRefreshing,
    pullDistance,
    canRefresh: pullDistance >= threshold
  };
}
