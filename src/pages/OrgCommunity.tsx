import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Users, Heart, BookOpen, MessageSquare, Filter, Sparkles, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { GREEK_COUNCILS, getOrganizationsByCouncil } from '@/data/greekOrganizations';
import { getCouncilContent, getFaithIntegrationTips, getCommonChallenges } from '@/data/orgSpecificContent';
import { getAffiliationLabel } from '@/data/affiliationTypes';

interface CommunityMember {
  id: string;
  full_name: string | null;
  greek_council: string | null;
  greek_organization: string | null;
  chapter_name: string | null;
  affiliation_type: string | null;
}

interface CommunityStats {
  totalMembers: number;
  councilCounts: Record<string, number>;
  orgCounts: Record<string, number>;
}

const OrgCommunity = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<CommunityMember | null>(null);
  const [communityMembers, setCommunityMembers] = useState<CommunityMember[]>([]);
  const [stats, setStats] = useState<CommunityStats>({ totalMembers: 0, councilCounts: {}, orgCounts: {} });
  const [loading, setLoading] = useState(true);
  const [filterCouncil, setFilterCouncil] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    try {
      // Load user's own profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, full_name, greek_council, greek_organization, chapter_name, affiliation_type')
        .eq('id', user.id)
        .maybeSingle();

      if (profile) {
        setUserProfile(profile);
      }

      // Load community members (only those who have set a Greek council)
      const { data: members } = await supabase
        .from('profiles')
        .select('id, full_name, greek_council, greek_organization, chapter_name, affiliation_type')
        .not('greek_council', 'is', null);

      if (members) {
        setCommunityMembers(members);
        
        // Calculate stats
        const councilCounts: Record<string, number> = {};
        const orgCounts: Record<string, number> = {};
        
        members.forEach(m => {
          if (m.greek_council) {
            councilCounts[m.greek_council] = (councilCounts[m.greek_council] || 0) + 1;
          }
          if (m.greek_organization) {
            orgCounts[m.greek_organization] = (orgCounts[m.greek_organization] || 0) + 1;
          }
        });

        setStats({
          totalMembers: members.length,
          councilCounts,
          orgCounts
        });
      }
    } catch (error) {
      console.error('Error loading community data:', error);
      toast.error('Failed to load community data');
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = communityMembers.filter(m => {
    if (filterCouncil === 'all') return true;
    if (filterCouncil === 'my-org') return m.greek_organization === userProfile?.greek_organization;
    if (filterCouncil === 'my-council') return m.greek_council === userProfile?.greek_council;
    return m.greek_council === filterCouncil;
  });

  const councilContent = userProfile?.greek_council 
    ? getCouncilContent(userProfile.greek_council) 
    : null;

  const tips = userProfile?.greek_council 
    ? getFaithIntegrationTips(userProfile.greek_council) 
    : [];

  const challenges = userProfile?.greek_council 
    ? getCommonChallenges(userProfile.greek_council) 
    : [];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Organization Community</h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Sign In Required</h2>
              <p className="text-muted-foreground mb-4">
                Please sign in to connect with your Greek community.
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

  const selectedOrg = userProfile?.greek_organization 
    ? getOrganizationsByCouncil(userProfile.greek_council || '').find(o => o.name === userProfile.greek_organization)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="h-6 w-6 text-sacred" />
                  Organization Community
                </h1>
                <p className="text-sm text-muted-foreground">Connect with Greeks who share your faith</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* User's Org Info */}
          {userProfile?.greek_council && (
            <Card className="border-sacred/20 bg-gradient-to-br from-sacred/5 to-warm-blue/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sacred to-warm-blue flex items-center justify-center">
                      {selectedOrg ? (
                        <span className="text-white font-bold text-xl">{selectedOrg.greekLetters}</span>
                      ) : (
                        <Users className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {selectedOrg?.name || userProfile.greek_organization || 'Your Organization'}
                      </CardTitle>
                      <CardDescription>
                        {userProfile.chapter_name && `${userProfile.chapter_name} Chapter • `}
                        {GREEK_COUNCILS.find(c => c.id === userProfile.greek_council)?.fullName}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {getAffiliationLabel(userProfile.affiliation_type || 'member')}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-sacred">{stats.totalMembers}</p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-blue-500">
                  {Object.keys(stats.councilCounts).length}
                </p>
                <p className="text-sm text-muted-foreground">Councils</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-purple-500">
                  {Object.keys(stats.orgCounts).length}
                </p>
                <p className="text-sm text-muted-foreground">Organizations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-green-500">
                  {userProfile?.greek_organization 
                    ? stats.orgCounts[userProfile.greek_organization] || 0 
                    : 0}
                </p>
                <p className="text-sm text-muted-foreground">Your Org</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {councilContent && (
                <>
                  {/* Welcome Message */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500" />
                        Welcome, {councilContent.name} Member
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{councilContent.welcomeMessage}</p>
                    </CardContent>
                  </Card>

                  {/* Two Column: Tips & Challenges */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Faith Integration Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {tips.map((tip, i) => (
                            <li key={i} className="flex gap-2 text-sm">
                              <span className="text-sacred">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Common Challenges</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {challenges.map((challenge, i) => (
                            <li key={i} className="flex gap-2 text-sm">
                              <span className="text-amber-500">•</span>
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}

              {/* Quick Links */}
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/prayer-wall">
                  <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <Heart className="h-8 w-8 text-red-500" />
                      <div>
                        <h3 className="font-semibold">Prayer Wall</h3>
                        <p className="text-sm text-muted-foreground">Pray for your community</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/guide">
                  <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <BookOpen className="h-8 w-8 text-sacred" />
                      <div>
                        <h3 className="font-semibold">PROOF Guide</h3>
                        <p className="text-sm text-muted-foreground">Navigate challenges</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/ask-dr-lyman">
                  <Card className="hover:border-sacred/50 transition-colors cursor-pointer h-full">
                    <CardContent className="pt-6 flex items-center gap-4">
                      <MessageSquare className="h-8 w-8 text-purple-500" />
                      <div>
                        <h3 className="font-semibold">Ask Dr. Lyman</h3>
                        <p className="text-sm text-muted-foreground">Get expert answers</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-4 mt-6">
              {/* Filter */}
              <div className="flex items-center gap-4">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterCouncil} onValueChange={setFilterCouncil}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by council" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    {userProfile?.greek_council && (
                      <SelectItem value="my-council">My Council</SelectItem>
                    )}
                    {userProfile?.greek_organization && (
                      <SelectItem value="my-org">My Organization</SelectItem>
                    )}
                    {GREEK_COUNCILS.filter(c => c.id !== 'other').map(council => (
                      <SelectItem key={council.id} value={council.id}>
                        {council.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                  {filteredMembers.length} members
                </span>
              </div>

              {/* Members List */}
              {loading ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Loading members...</p>
                  </CardContent>
                </Card>
              ) : filteredMembers.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No members found</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMembers.slice(0, 30).map(member => {
                    const org = member.greek_organization 
                      ? getOrganizationsByCouncil(member.greek_council || '').find(o => o.name === member.greek_organization)
                      : null;
                    const council = GREEK_COUNCILS.find(c => c.id === member.greek_council);
                    
                    return (
                      <Card key={member.id} className={member.id === user?.id ? 'border-sacred' : ''}>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sacred/20 to-warm-blue/20 flex items-center justify-center">
                              {org ? (
                                <span className="font-bold text-sacred">{org.greekLetters}</span>
                              ) : (
                                <Users className="h-5 w-5 text-sacred" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {member.full_name || 'Sacred Greek Member'}
                                {member.id === user?.id && ' (You)'}
                              </p>
                              <p className="text-sm text-muted-foreground truncate">
                                {org?.name || member.greek_organization || council?.name || 'Greek Life'}
                              </p>
                              {member.chapter_name && (
                                <p className="text-xs text-muted-foreground">
                                  {member.chapter_name} Chapter
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
              {filteredMembers.length > 30 && (
                <p className="text-center text-sm text-muted-foreground">
                  Showing 30 of {filteredMembers.length} members
                </p>
              )}
            </TabsContent>

            <TabsContent value="resources" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Council-Specific Resources</CardTitle>
                  <CardDescription>
                    Resources tailored for your Greek council
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {councilContent ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-sacred/5 border border-sacred/20">
                        <h4 className="font-semibold mb-2">Key Values of {councilContent.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {councilContent.keyValues.map((value, i) => (
                            <Badge key={i} variant="secondary">{value}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Link to="/guide" className="block">
                          <Button variant="outline" className="w-full justify-between">
                            Handle BGLO Objections Guide
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to="/resources" className="block">
                          <Button variant="outline" className="w-full justify-between">
                            Resource Library
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to="/myth-buster" className="block">
                          <Button variant="outline" className="w-full justify-between">
                            Myth Buster
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Set your Greek affiliation to see council-specific resources
                      </p>
                      <Link to="/profile">
                        <Button>Update Profile</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default OrgCommunity;
