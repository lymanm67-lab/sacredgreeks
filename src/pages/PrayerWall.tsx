import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Heart, Plus, Filter, Users, FlaskConical } from 'lucide-react';
import { toast } from 'sonner';
import { PrayerRequestCard } from '@/components/prayer-wall/PrayerRequestCard';
import { CreatePrayerRequestDialog } from '@/components/prayer-wall/CreatePrayerRequestDialog';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { PullToRefreshIndicator } from '@/components/ui/PullToRefreshIndicator';
import { BreadcrumbNav } from '@/components/ui/breadcrumb-nav';
import { OrgPrayerFilter } from '@/components/prayer-wall/OrgPrayerFilter';
import { GREEK_COUNCILS } from '@/data/greekOrganizations';
import { useDemoMode } from '@/contexts/DemoModeContext';

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
    greek_council: string | null;
    greek_organization: string | null;
  };
  prayer_support?: Array<{
    user_id: string;
  }>;
}

interface UserOrgInfo {
  greekCouncil: string | null;
  greekOrganization: string | null;
}

// Demo prayer requests for demo mode
const DEMO_PRAYER_REQUESTS: PrayerRequest[] = [
  {
    id: 'demo-1',
    user_id: 'demo-user-1',
    title: 'Guidance for Chapter Leadership',
    description: 'Please pray for wisdom as I step into my new role as chapter president. I want to lead with integrity and faith.',
    request_type: 'guidance',
    privacy_level: 'public',
    answered: false,
    answered_at: null,
    answered_testimony: null,
    prayer_count: 12,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    profiles: {
      full_name: 'Marcus Johnson',
      email: null,
      greek_council: 'nphc',
      greek_organization: 'Phi Beta Sigma',
    },
    prayer_support: [],
  },
  {
    id: 'demo-2',
    user_id: 'demo-user-2',
    title: 'Balancing Faith and Greek Commitments',
    description: 'Struggling to maintain my devotional time with a busy chapter schedule. Prayers for time management and priorities appreciated.',
    request_type: 'personal',
    privacy_level: 'public',
    answered: false,
    answered_at: null,
    answered_testimony: null,
    prayer_count: 8,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    profiles: {
      full_name: 'Jasmine Williams',
      email: null,
      greek_council: 'nphc',
      greek_organization: 'Delta Sigma Theta',
    },
    prayer_support: [],
  },
  {
    id: 'demo-3',
    user_id: 'demo-user-3',
    title: 'Healing from Family Conflict',
    description: 'My family has been struggling with my decision to join Greek life. Praying for reconciliation and understanding.',
    request_type: 'family',
    privacy_level: 'public',
    answered: true,
    answered_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    answered_testimony: 'God answered! Had a breakthrough conversation with my parents. They now understand my commitment to service and brotherhood.',
    prayer_count: 25,
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    profiles: {
      full_name: 'David Thompson',
      email: null,
      greek_council: 'nphc',
      greek_organization: 'Kappa Alpha Psi',
    },
    prayer_support: [],
  },
  {
    id: 'demo-4',
    user_id: 'demo-user-4',
    title: 'Starting a Bible Study in My Chapter',
    description: 'I feel called to start a weekly Bible study for interested members. Please pray for courage and the right words to share.',
    request_type: 'ministry',
    privacy_level: 'public',
    answered: false,
    answered_at: null,
    answered_testimony: null,
    prayer_count: 15,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    profiles: {
      full_name: 'Angela Davis',
      email: null,
      greek_council: 'nphc',
      greek_organization: 'Zeta Phi Beta',
    },
    prayer_support: [],
  },
];

const PrayerWall = () => {
  const { user } = useAuth();
  const { isDemoMode } = useDemoMode();
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [orgFilter, setOrgFilter] = useState('all');
  const [userOrg, setUserOrg] = useState<UserOrgInfo | null>(null);

  // Pull to refresh
  const handleRefresh = async () => {
    await loadPrayerRequests();
    toast.success('Prayer wall refreshed');
  };

  const { isPulling, isRefreshing, pullDistance, canRefresh } = usePullToRefresh({
    onRefresh: handleRefresh
  });

  useEffect(() => {
    if (user) {
      loadUserOrg();
    }
    loadPrayerRequests();

    // Set up realtime subscription (only if not in demo mode)
    if (!isDemoMode) {
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
    }
  }, [user, isDemoMode]);

  const loadUserOrg = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('greek_council, greek_organization')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setUserOrg({
        greekCouncil: data.greek_council,
        greekOrganization: data.greek_organization,
      });
    }
  };

  const loadPrayerRequests = async () => {
    // If demo mode is enabled, show demo data
    if (isDemoMode) {
      setRequests(DEMO_PRAYER_REQUESTS);
      setLoading(false);
      return;
    }
    
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

      // Fetch profiles separately for each request (including Greek org info)
      const requestsWithProfiles = await Promise.all(
        (data || []).map(async (request) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email, greek_council, greek_organization')
            .eq('id', request.user_id)
            .maybeSingle();

          return {
            ...request,
            profiles: profile,
          };
        })
      );

      // If no requests exist and not in demo mode, show demo data
      if (requestsWithProfiles.length === 0) {
        setRequests(DEMO_PRAYER_REQUESTS);
      } else {
        setRequests(requestsWithProfiles as PrayerRequest[]);
      }
    } catch (error) {
      console.error('Error loading prayer requests:', error);
      toast.error('Failed to load prayer requests');
      // Show demo data on error
      setRequests(DEMO_PRAYER_REQUESTS);
    } finally {
      setLoading(false);
    }
  };

  const handlePrayerAdded = () => {
    loadPrayerRequests();
    setCreateDialogOpen(false);
    toast.success('Prayer request shared with the community');
  };

  // Apply both tab and org filters
  const filteredRequests = requests.filter(request => {
    // Tab filter
    let passesTabFilter = true;
    if (activeTab === 'mine') passesTabFilter = request.user_id === user?.id;
    else if (activeTab === 'answered') passesTabFilter = request.answered;
    else if (activeTab === 'active') passesTabFilter = !request.answered;

    // Org filter
    let passesOrgFilter = true;
    if (orgFilter === 'my-org' && userOrg?.greekOrganization) {
      passesOrgFilter = request.profiles?.greek_organization === userOrg.greekOrganization;
    } else if (orgFilter === 'my-council' && userOrg?.greekCouncil) {
      passesOrgFilter = request.profiles?.greek_council === userOrg.greekCouncil;
    }

    return passesTabFilter && passesOrgFilter;
  });

  const isShowingDemoData = isDemoMode || requests.some(r => r.id.startsWith('demo-'));
  
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
                  {isShowingDemoData && (
                    <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/20">
                      <FlaskConical className="w-3 h-3 mr-1" />
                      Demo
                    </Badge>
                  )}
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-4">
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
              
              {/* Organization Filter */}
              {userOrg?.greekCouncil && (
                <OrgPrayerFilter value={orgFilter} onChange={setOrgFilter} />
              )}
            </div>

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