import React from 'react';
import { Loader2, RefreshCw, AlertCircle, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DataLoadingStateProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  loadingText?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function DataLoadingState({
  isLoading = false,
  isEmpty = false,
  error = null,
  onRetry,
  loadingText = 'Loading...',
  emptyTitle = 'No data yet',
  emptyDescription = 'Get started by creating your first item.',
  emptyAction,
  className,
  children,
}: DataLoadingStateProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12', className)}>
        <Loader2 className="w-8 h-8 animate-spin text-sacred mb-4" />
        <p className="text-muted-foreground text-sm">{loadingText}</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className={cn('border-destructive/20', className)}>
        <CardContent className="py-8 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Unable to Load Data</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              {error.message || 'Something went wrong while loading. Please try again.'}
            </p>
          </div>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (isEmpty) {
    return (
      <Card className={cn('border-dashed', className)}>
        <CardContent className="py-12 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Inbox className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">{emptyTitle}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              {emptyDescription}
            </p>
          </div>
          {emptyAction}
        </CardContent>
      </Card>
    );
  }

  // Render children when we have data
  return <>{children}</>;
}

// Inline loading spinner for buttons and small areas
export function InlineLoader({ className }: { className?: string }) {
  return (
    <Loader2 className={cn('w-4 h-4 animate-spin', className)} />
  );
}

// Skeleton loader for lists
export function ListSkeleton({ 
  count = 3, 
  className 
}: { 
  count?: number; 
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-4 rounded-lg border">
          <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Grid skeleton for cards
export function GridSkeleton({ 
  count = 6, 
  columns = 3,
  className 
}: { 
  count?: number; 
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn(
      'grid gap-4',
      columns === 2 && 'grid-cols-1 md:grid-cols-2',
      columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      columns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      className
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 rounded-lg border space-y-3">
          <div className="h-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          <div className="h-3 w-full bg-muted rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}