import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Heart, Plus, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { PrayerRequestCard } from '@/components/prayer-wall/PrayerRequestCard';
import { CreatePrayerRequestDialog } from '@/components/prayer-wall/CreatePrayerRequestDialog';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefreshIndicator';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';

interface PrayerRequest {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  request_type: string;
  privacy_level: string;
  answered: boolean;
  answered_at: string | null;
  answered_testimony: string | null;
  prayer_count: number;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string | null;
    email: string | null;
  };
  prayer_support?: Array<{
    user_id: string;
  }>;
}

const PrayerWall = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Pull to refresh
  const handleRefresh = async () => {
    await loadPrayerRequests();
    toast.success('Prayer wall refreshed');
  };

  const { isPulling, isRefreshing, pullDistance, canRefresh } = usePullToRefresh({
    onRefresh: handleRefresh
  });

  useEffect(() => {
    loadPrayerRequests();

    // Set up realtime subscription
    const channel = supabase
      .channel('prayer-requests-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'prayer_requests'
        },
        () => {
          loadPrayerRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loadPrayerRequests = async () => {
    try {
      // Load prayer requests with user's prayer support
      const { data, error } = await supabase
        .from('prayer_requests')
        .select(`
          *,
          prayer_support!left (user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch profiles separately for each request
      const requestsWithProfiles = await Promise.all(
        (data || []).map(async (request) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', request.user_id)
            .maybeSingle();

          return {
            ...request,
            profiles: profile,
          };
        })
      );

      setRequests(requestsWithProfiles as PrayerRequest[]);
    } catch (error) {
      console.error('Error loading prayer requests:', error);
      toast.error('Failed to load prayer requests');
    } finally {
      setLoading(false);
    }
  };

  const handlePrayerAdded = () => {
    loadPrayerRequests();
    setCreateDialogOpen(false);
    toast.success('Prayer request shared with the community');
  };

  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true;
    if (activeTab === 'mine') return request.user_id === user?.id;
    if (activeTab === 'answered') return request.answered;
    if (activeTab === 'active') return !request.answered;
    return true;
  });

  const stats = {
    total: requests.length,
    mine: requests.filter(r => r.user_id === user?.id).length,
    answered: requests.filter(r => r.answered).length,
    active: requests.filter(r => !r.answered).length,
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
        <PullToRefreshIndicator
          isPulling={isPulling}
          isRefreshing={isRefreshing}
          pullDistance={pullDistance}
          canRefresh={canRefresh}
        />
        
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold">Prayer Wall</h1>
                  <p className="text-sm text-muted-foreground">Community prayer support</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Sign In Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Please sign in to view and share prayer requests with your chapter.
              </p>
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <PullToRefreshIndicator
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        canRefresh={canRefresh}
      />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  Prayer Wall
                </h1>
                <p className="text-sm text-muted-foreground">Share and support prayer requests</p>
              </div>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Share Request
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-500">{stats.mine}</p>
                  <p className="text-sm text-muted-foreground">Your Requests</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-500">{stats.answered}</p>
                  <p className="text-sm text-muted-foreground">Answered</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-500">{stats.active}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for filtering */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                All ({stats.total})
              </TabsTrigger>
              <TabsTrigger value="active">
                Active ({stats.active})
              </TabsTrigger>
              <TabsTrigger value="answered">
                Answered ({stats.answered})
              </TabsTrigger>
              <TabsTrigger value="mine">
                Mine ({stats.mine})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4 mt-6">
              {loading ? (
                <Card>
                  <CardContent className="py-12">
                    <p className="text-center text-muted-foreground">Loading prayer requests...</p>
                  </CardContent>
                </Card>
              ) : filteredRequests.length === 0 ? (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center space-y-4">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-medium">No prayer requests yet</p>
                        <p className="text-sm text-muted-foreground">
                          {activeTab === 'mine' 
                            ? 'Share your first prayer request with the community'
                            : 'Be the first to share a prayer request'}
                        </p>
                      </div>
                      <Button onClick={() => setCreateDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Share Prayer Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredRequests.map((request) => (
                  <PrayerRequestCard
                    key={request.id}
                    request={request}
                    currentUserId={user.id}
                    onUpdate={loadPrayerRequests}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Create Dialog */}
      <CreatePrayerRequestDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={handlePrayerAdded}
      />
    </div>
  );
};

export default PrayerWall;