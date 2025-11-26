import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Database, Download, Trash2, WifiOff } from 'lucide-react';
import { offlineStorage } from '@/lib/offline-storage';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useOffline } from '@/hooks/use-offline';

const OfflineSettings = () => {
  const { toast } = useToast();
  const { isOffline } = useOffline();
  const [stats, setStats] = useState({
    devotionals: 0,
    prayers: 0,
    verses: 0,
    materials: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const storageStats = await offlineStorage.getStorageStats();
      setStats(storageStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCleanup = async () => {
    try {
      await offlineStorage.cleanupOldCache();
      await loadStats();
      toast({
        title: 'Cleanup complete',
        description: 'Old cached data has been removed',
      });
    } catch (error) {
      toast({
        title: 'Cleanup failed',
        description: 'Could not clean up cached data',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/profile" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Profile</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred/10 mb-4">
              <WifiOff className="w-8 h-8 text-sacred" />
            </div>
            <h1 className="text-4xl font-bold">Offline Settings</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Manage your offline data and see what's cached for offline access
            </p>
          </div>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Connection Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isOffline ? 'bg-amber-500' : 'bg-green-500'}`} />
                <span className="font-medium">
                  {isOffline ? 'Offline Mode' : 'Online'}
                </span>
                <Badge variant={isOffline ? 'secondary' : 'default'}>
                  {isOffline ? 'Using cached data' : 'Connected'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Storage Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-sacred" />
                Cached Content
              </CardTitle>
              <CardDescription>
                Content available for offline access
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading statistics...
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-sacred">{stats.devotionals}</div>
                    <div className="text-sm text-muted-foreground">Devotionals</div>
                  </div>
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-sacred">{stats.prayers}</div>
                    <div className="text-sm text-muted-foreground">Prayers</div>
                  </div>
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-sacred">{stats.verses}</div>
                    <div className="text-sm text-muted-foreground">Bible Verses</div>
                  </div>
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold text-sacred">{stats.materials}</div>
                    <div className="text-sm text-muted-foreground">Study Materials</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
              <CardDescription>
                Manage your offline storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleCleanup}
                variant="outline"
                className="w-full justify-start"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clean Up Old Data (30+ days)
              </Button>
              <p className="text-xs text-muted-foreground">
                This will remove cached content older than 30 days to free up space.
                Recent devotionals, prayers, and verses will be kept.
              </p>
            </CardContent>
          </Card>

          {/* Info */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">How Offline Mode Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Automatic Caching:</strong> When you're online, 
                Sacred Greeks automatically saves devotionals, prayers, and Bible verses to your device.
              </p>
              <p>
                <strong className="text-foreground">Offline Access:</strong> When you lose connection, 
                you can still read cached devotionals, view your prayers, and access saved Bible verses.
              </p>
              <p>
                <strong className="text-foreground">Auto-Sync:</strong> When you reconnect, 
                your data automatically syncs with the server.
              </p>
              <p>
                <strong className="text-foreground">Storage:</strong> Cached data is stored locally 
                in your browser's IndexedDB. It persists between sessions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OfflineSettings;
