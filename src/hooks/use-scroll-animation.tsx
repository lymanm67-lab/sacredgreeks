import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from './use-mobile';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = false,
  } = options;

  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Only apply on mobile devices
    if (!isMobile) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = entry.isIntersecting;
        
        if (shouldShow) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce || !hasTriggered) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isMobile, threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref, isVisible };
};
