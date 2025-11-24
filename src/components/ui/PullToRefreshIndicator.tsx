import { Loader2, RefreshCw } from 'lucide-react';

interface PullToRefreshIndicatorProps {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  canRefresh: boolean;
}

export function PullToRefreshIndicator({
  isPulling,
  isRefreshing,
  pullDistance,
  canRefresh
}: PullToRefreshIndicatorProps) {
  if (!isPulling && !isRefreshing) return null;

  const opacity = Math.min(pullDistance / 80, 1);
  const rotation = (pullDistance / 80) * 360;

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{
        transform: `translateY(${isRefreshing ? '16px' : Math.max(0, pullDistance - 40)}px)`,
        transition: isRefreshing || !isPulling ? 'transform 0.3s ease' : 'none'
      }}
    >
      <div 
        className="bg-background/95 backdrop-blur-sm border border-border rounded-full p-3 shadow-lg"
        style={{ opacity }}
      >
        {isRefreshing ? (
          <Loader2 className="w-6 h-6 animate-spin text-sacred" />
        ) : (
          <RefreshCw 
            className={`w-6 h-6 transition-colors ${canRefresh ? 'text-sacred' : 'text-muted-foreground'}`}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.1s linear'
            }}
          />
        )}
      </div>
    </div>
  );
}
