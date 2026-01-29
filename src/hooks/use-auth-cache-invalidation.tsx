import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to invalidate React Query cache when auth state changes
 * This ensures users see fresh data after login/logout
 */
export function useAuthCacheInvalidation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const previousUserRef = useRef<string | null>(null);

  useEffect(() => {
    const currentUserId = user?.id ?? null;
    const previousUserId = previousUserRef.current;

    // If user changed (login or logout), clear the cache
    if (previousUserId !== currentUserId) {
      // Clear all cached queries to force fresh data
      queryClient.invalidateQueries();
      queryClient.clear();
      
      previousUserRef.current = currentUserId;
    }
  }, [user, queryClient]);
}
