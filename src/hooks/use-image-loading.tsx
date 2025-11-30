import { useState, useEffect, useRef, useCallback } from 'react';

interface UseImageLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  lazy?: boolean;
}

interface ImageLoadState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  isInView: boolean;
}

export function useImageLoading(
  src: string,
  options: UseImageLoadingOptions = {}
) {
  const { threshold = 0.1, rootMargin = '50px', lazy = true } = options;
  
  const [state, setState] = useState<ImageLoadState>({
    isLoading: false,
    isLoaded: false,
    hasError: false,
    isInView: !lazy, // If not lazy, consider always in view
  });
  
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection observer for lazy loading
  useEffect(() => {
    if (!lazy || !elementRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState(prev => ({ ...prev, isInView: true }));
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(elementRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, threshold, rootMargin]);

  // Load image when in view
  useEffect(() => {
    if (!state.isInView || !src) return;

    setState(prev => ({ ...prev, isLoading: true }));

    const img = new Image();
    
    img.onload = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isLoaded: true,
        hasError: false,
      }));
    };

    img.onerror = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isLoaded: false,
        hasError: true,
      }));
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, state.isInView]);

  const setRef = useCallback((node: HTMLElement | null) => {
    elementRef.current = node;
  }, []);

  const retry = useCallback(() => {
    setState({
      isLoading: false,
      isLoaded: false,
      hasError: false,
      isInView: true,
    });
  }, []);

  return {
    ...state,
    ref: setRef,
    retry,
  };
}

// Optimized image component props generator
export function useOptimizedImageProps(
  src: string,
  alt: string,
  options: UseImageLoadingOptions & { width?: number; height?: number } = {}
) {
  const { width, height, ...loadingOptions } = options;
  const { isLoading, isLoaded, hasError, ref } = useImageLoading(src, loadingOptions);

  return {
    ref,
    src: isLoaded ? src : undefined,
    alt,
    loading: 'lazy' as const,
    decoding: 'async' as const,
    width,
    height,
    style: {
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
    },
    className: hasError ? 'bg-muted' : '',
    'data-loading': isLoading,
    'data-loaded': isLoaded,
    'data-error': hasError,
  };
}

// Blur placeholder generator
export function generateBlurPlaceholder(width = 10, height = 10): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL();
}