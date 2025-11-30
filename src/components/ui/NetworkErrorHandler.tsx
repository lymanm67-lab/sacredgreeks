import React from 'react';
import { WifiOff, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface NetworkErrorHandlerProps {
  error?: Error | null;
  onRetry?: () => void;
  isRetrying?: boolean;
  compact?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function NetworkErrorHandler({
  error,
  onRetry,
  isRetrying = false,
  compact = false,
  className,
  children,
}: NetworkErrorHandlerProps) {
  const isOffline = !navigator.onLine;
  const isNetworkError = error?.message?.toLowerCase().includes('fetch') ||
                        error?.message?.toLowerCase().includes('network') ||
                        isOffline;

  if (!error && !isOffline) {
    return <>{children}</>;
  }

  if (compact) {
    return (
      <div className={cn(
        'flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20',
        className
      )}>
        {isNetworkError ? (
          <WifiOff className="w-5 h-5 text-amber-500 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">
            {isNetworkError ? 'Connection issue' : 'Something went wrong'}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {isNetworkError 
              ? 'Check your internet connection' 
              : error?.message || 'Please try again'}
          </p>
        </div>
        {onRetry && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onRetry}
            disabled={isRetrying}
            className="flex-shrink-0"
          >
            <RefreshCw className={cn('w-4 h-4', isRetrying && 'animate-spin')} />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className={cn('border-amber-500/20', className)}>
      <CardContent className="py-8 text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
          {isNetworkError ? (
            <WifiOff className="w-6 h-6 text-amber-500" />
          ) : (
            <AlertCircle className="w-6 h-6 text-destructive" />
          )}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">
            {isNetworkError ? 'Connection Issue' : 'Something Went Wrong'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {isNetworkError
              ? 'Unable to connect. Please check your internet connection and try again.'
              : error?.message || 'An unexpected error occurred. Please try again.'}
          </p>
        </div>
        {onRetry && (
          <Button
            onClick={onRetry}
            disabled={isRetrying}
            className="gap-2"
          >
            <RefreshCw className={cn('w-4 h-4', isRetrying && 'animate-spin')} />
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Hook for network status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, isOffline: !isOnline };
}