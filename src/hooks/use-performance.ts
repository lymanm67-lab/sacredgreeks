import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to help with React.memo optimization
 * Returns true if any dependency has changed
 */
export function useHasChanged(dependencies: any[]): boolean {
  const prevRef = useRef<any[]>();
  const prev = prevRef.current;
  
  useEffect(() => {
    prevRef.current = dependencies;
  });

  if (!prev) return true;
  
  return dependencies.some((dep, i) => !Object.is(dep, prev[i]));
}

/**
 * Custom hook for debouncing values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for throttling function calls
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout>();

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      callback(...args);
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        lastRun.current = Date.now();
        callback(...args);
      }, delay - (now - lastRun.current));
    }
  }) as T;
}
