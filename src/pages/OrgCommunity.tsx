import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Users, Heart, BookOpen, MessageSquare, Filter, Sparkles, ChevronRight, Video, Users2, HelpCircle, Award, Clock, GraduationCap, Quote, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { GREEK_COUNCILS, getOrganizationsByCouncil } from '@/data/greekOrganizations';
import { getCouncilContent, getFaithIntegrationTips, getCommonChallenges } from '@/data/orgSpecificContent';
import { getAffiliationLabel } from '@/data/affiliationTypes';
import bookCover from '@/assets/sacred-not-sinful-cover.jpg';

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
  const [activeTab, setActiveTab] = useState('coaching');
  const [waitlistForm, setWaitlistForm] = useState({
    fullName: '',
    email: '',
    organization: '',
    goals: ''
  });
  const [submittingWaitlist, setSubmittingWaitlist] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistForm.fullName.trim() || !waitlistForm.email.trim()) {
      toast.error('Please fill in required fields');
      return;
    }
    setSubmittingWaitlist(true);
    try {
      const { error } = await supabase
        .from('coaching_waitlist')
        .insert({
          user_id: user?.id || null,
          full_name: waitlistForm.fullName.trim(),
          email: waitlistForm.email.trim(),
          organization: waitlistForm.organization.trim() || null,
          goals: waitlistForm.goals.trim() || null
        });

      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke('notify-coaching-waitlist', {
          body: {
            fullName: waitlistForm.fullName.trim(),
            email: waitlistForm.email.trim(),
            organization: waitlistForm.organization.trim() || undefined,
            goals: waitlistForm.goals.trim() || undefined
          }
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the whole submission if email fails
      }
      
      toast.success('You have been added to the waitlist! Check your email for confirmation.');
      setWaitlistForm({ fullName: '', email: '', organization: '', goals: '' });
    } catch (error) {
      console.error('Error submitting waitlist:', error);
      toast.error('Failed to join waitlist. Please try again.');
    } finally {
      setSubmittingWaitlist(false);
    }
  };

  const curriculumChapters = [
    { num: 1, title: 'Reclaiming Biblical Clarity' },
    { num: 2, title: 'Rethinking D9 Secrecy' },
    { num: 3, title: 'Freemasonry & D9 Legacy' },
    { num: 4, title: 'Institutions of Resistance' },
    { num: 5, title: 'Renounce or Denounce' },
    { num: 6, title: 'The P.R.O.O.F. Framework' },
    { num: 7, title: "Christian's Response to Culture" },
    { num: 8, title: 'Living as Light & Salt' }
  ];

  const coachingFeatures = [
    { icon: Video, title: 'Live Sessions', desc: 'Weekly video calls with Dr. Lyman' },
    { icon: Users2, title: 'Small Groups', desc: 'Intimate cohorts of 15-20 members' },
    { icon: BookOpen, title: 'Book Study', desc: 'Deep dive into Sacred Not Sinful' },
    { icon: HelpCircle, title: 'Q&A Access', desc: 'Direct questions answered' },
    { icon: Award, title: 'Certificate', desc: 'Completion recognition' },
    { icon: Clock, title: '8 Weeks', desc: 'Comprehensive curriculum' }
  ];

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
                  {activeTab === 'coaching' ? (
                    <GraduationCap className="h-6 w-6 text-sacred" />
                  ) : (
                    <Users className="h-6 w-6 text-sacred" />
                  )}
                  {activeTab === 'coaching' ? 'Group Coaching' : 'Organization Community'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {activeTab === 'coaching' 
                    ? 'Go deeper with Dr. Lyman Montgomery' 
                    : 'Connect with Greeks who share your faith'}
                </p>
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
              <TabsTrigger value="coaching">Group Coaching</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* Group Coaching Tab */}
            <TabsContent value="coaching" className="space-y-8 mt-6">
              {/* Hero Section */}
              <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 via-background to-warm-blue/5 overflow-hidden">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center mb-6">
                    <Badge className="bg-sacred/20 text-sacred border-sacred/30 mb-4">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      Group Coaching Experience
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Sacred Not Sinful</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Go deeper with Dr. Lyman Montgomery in an 8-week guided journey through the book and biblical framework for navigating faith and Greek life.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Book + Curriculum Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Book Info */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <img 
                        src={bookCover} 
                        alt="Sacred, Not Sinful Book Cover" 
                        className="w-32 h-44 rounded-lg shadow-lg flex-shrink-0 object-cover mx-auto sm:mx-0"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold mb-1">Sacred, Not Sinful</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          A Biblical Response to the Black Greek Letter Organizations Debate
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          By <span className="font-medium text-foreground">Dr. Lyman A. Montgomery, III</span>
                        </p>
                        <Link to="/the-book">
                          <Button variant="outline" size="sm">
                            Preview Book
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Curriculum Chapters */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Curriculum Chapters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {curriculumChapters.map((chapter) => (
                        <div 
                          key={chapter.num} 
                          className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <span className="w-6 h-6 rounded-full bg-sacred/20 text-sacred text-sm font-bold flex items-center justify-center flex-shrink-0">
                            {chapter.num}
                          </span>
                          <span className="text-sm font-medium truncate">{chapter.title}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {coachingFeatures.map((feature, i) => (
                  <Card key={i} className="text-center">
                    <CardContent className="pt-6 pb-4">
                      <feature.icon className="w-8 h-8 mx-auto mb-2 text-sacred" />
                      <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Zoom Session Info */}
              <Card className="border-blue-500/30 bg-gradient-to-r from-blue-500/5 to-indigo-500/5">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Video className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Weekly Zoom Sessions</h3>
                        <p className="text-sm text-muted-foreground">
                          Live group coaching calls every Thursday at 7:00 PM EST
                        </p>
                      </div>
                    </div>
                    <a 
                      href="https://zoom.us/j/sacredgreeks" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                        <Video className="w-4 h-4" />
                        Join Zoom Call
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center md:text-left">
                    Meeting ID will be provided to enrolled members. Sessions are recorded for those who cannot attend live.
                  </p>
                </CardContent>
              </Card>

              {/* Waitlist Form */}
              <Card className="border-sacred/20">
                <CardHeader className="text-center">
                  <CardTitle>Join the Waitlist</CardTitle>
                  <CardDescription>
                    Be notified when the next cohort opens. Limited to 20 spots per session.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="waitlist-name">Full Name *</Label>
                      <Input
                        id="waitlist-name"
                        placeholder="Your name"
                        value={waitlistForm.fullName}
                        onChange={(e) => setWaitlistForm(prev => ({ ...prev, fullName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waitlist-email">Email Address *</Label>
                      <Input
                        id="waitlist-email"
                        type="email"
                        placeholder="you@example.com"
                        value={waitlistForm.email}
                        onChange={(e) => setWaitlistForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waitlist-org">Greek Organization (Optional)</Label>
                      <Input
                        id="waitlist-org"
                        placeholder="e.g., Alpha Phi Alpha"
                        value={waitlistForm.organization}
                        onChange={(e) => setWaitlistForm(prev => ({ ...prev, organization: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waitlist-goals">What do you hope to gain? (Optional)</Label>
                      <Textarea
                        id="waitlist-goals"
                        placeholder="Share your goals for this coaching experience..."
                        value={waitlistForm.goals}
                        onChange={(e) => setWaitlistForm(prev => ({ ...prev, goals: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={submittingWaitlist}>
                      {submittingWaitlist ? 'Submitting...' : 'Join the Waitlist'}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      By signing up, you agree to receive email updates about the group coaching program.
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card className="bg-gradient-to-br from-sacred/5 to-warm-blue/5 border-sacred/20">
                <CardContent className="py-8">
                  <div className="max-w-2xl mx-auto text-center">
                    <Quote className="w-10 h-10 text-sacred/30 mx-auto mb-4" />
                    <blockquote className="text-lg italic text-foreground mb-4">
                      "Dr. Montgomery's teaching transformed how I view my membership. This isn't about choosing between faith and Greek life—it's about living authentically in both."
                    </blockquote>
                    <p className="text-sm text-muted-foreground">
                      — Marcus J., BGLO Chapter President
                    </p>
                  </div>
                </CardContent>
              </Card>
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
