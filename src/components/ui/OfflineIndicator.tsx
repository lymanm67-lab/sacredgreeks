import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useOffline } from '@/hooks/use-offline';

export function OfflineIndicator() {
  const { isOffline, wasOffline, isOnline } = useOffline();
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowBackOnline(true);
      const timer = setTimeout(() => setShowBackOnline(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!isOffline && !showBackOnline) return null;

  return (
    <div 
      className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-300 ${
        isOffline 
          ? 'bg-amber-500/90 text-white border-amber-600' 
          : 'bg-green-500/90 text-white border-green-600'
      }`}
      style={{
        animation: showBackOnline ? 'slideDown 0.3s ease-out' : undefined
      }}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        {isOffline ? (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Offline Mode - Using Cached Data</span>
          </>
        ) : (
          <>
            <Wifi className="w-4 h-4" />
            <span>Back Online - Syncing Data</span>
          </>
        )}
      </div>
    </div>
  );
}
