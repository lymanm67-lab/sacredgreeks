import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Users, TrendingUp, Award, Share2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface ReferralStats {
  totalReferrals: number;
  signedUp: number;
  active: number;
  converted: number;
  totalRewards: number;
  referralCode: string;
}

interface Referral {
  id: string;
  status: string;
  reward_earned: number;
  created_at: string;
  converted_at: string | null;
}

interface LeaderboardEntry {
  user_id: string;
  email: string;
  referral_count: number;
  total_rewards: number;
}

export default function ReferralDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    signedUp: 0,
    active: 0,
    converted: 0,
    totalRewards: 0,
    referralCode: ''
  });
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadReferralData();
    }
  }, [user]);

  const loadReferralData = async () => {
    if (!user) return;

    try {
      // Get beta tester info with referral code
      const { data: betaTester } = await supabase
        .from('beta_testers')
        .select('beta_code')
        .eq('user_id', user.id)
        .maybeSingle();

      // Get referrals
      const { data: referralsData } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      // Calculate stats
      const totalReferrals = referralsData?.length || 0;
      const signedUp = referralsData?.filter(r => ['signed_up', 'active', 'converted'].includes(r.status)).length || 0;
      const active = referralsData?.filter(r => ['active', 'converted'].includes(r.status)).length || 0;
      const converted = referralsData?.filter(r => r.status === 'converted').length || 0;
      const totalRewards = referralsData?.reduce((sum, r) => sum + (r.reward_earned || 0), 0) || 0;

      setStats({
        totalReferrals,
        signedUp,
        active,
        converted,
        totalRewards,
        referralCode: betaTester?.beta_code || ''
      });

      setReferrals(referralsData || []);

      // Load leaderboard
      const { data: leaderboardData } = await supabase
        .from('referrals')
        .select(`
          referrer_id,
          reward_earned,
          profiles!referrals_referrer_id_fkey(email)
        `);

      // Aggregate leaderboard data
      const leaderboardMap = new Map<string, LeaderboardEntry>();
      leaderboardData?.forEach((ref: any) => {
        const existing = leaderboardMap.get(ref.referrer_id);
        if (existing) {
          existing.referral_count++;
          existing.total_rewards += ref.reward_earned || 0;
        } else {
          leaderboardMap.set(ref.referrer_id, {
            user_id: ref.referrer_id,
            email: ref.profiles?.email || 'Unknown',
            referral_count: 1,
            total_rewards: ref.reward_earned || 0
          });
        }
      });

      const sortedLeaderboard = Array.from(leaderboardMap.values())
        .sort((a, b) => b.referral_count - a.referral_count)
        .slice(0, 10);

      setLeaderboard(sortedLeaderboard);
    } catch (error) {
      console.error('Error loading referral data:', error);
      toast.error('Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (stats.referralCode) {
      navigator.clipboard.writeText(stats.referralCode);
      toast.success('Referral code copied to clipboard!');
    }
  };

  const shareReferralLink = async () => {
    const link = `${window.location.origin}/auth?ref=${stats.referralCode}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Sacred Greeks Life',
          text: 'Join me on Sacred Greeks Life - integrating faith and Greek life!',
          url: link
        });
      } catch (error) {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(link);
      toast.success('Referral link copied to clipboard!');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Pending', variant: 'outline' },
      signed_up: { label: 'Signed Up', variant: 'secondary' },
      active: { label: 'Active', variant: 'default' },
      converted: { label: 'Converted', variant: 'default' }
    };

    const { label, variant } = variants[status] || variants.pending;
    return <Badge variant={variant}>{label}</Badge>;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
        <p className="text-muted-foreground">
          Share Sacred Greeks Life with friends and earn rewards!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReferrals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              {stats.signedUp} signed up
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.converted}</div>
            <p className="text-xs text-muted-foreground">
              Completed onboarding
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRewards}</div>
            <p className="text-xs text-muted-foreground">
              Points earned
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>
            Share this code with friends to earn rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={stats.referralCode}
              readOnly
              className="font-mono text-lg font-bold bg-background"
            />
            <Button onClick={copyReferralCode} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button onClick={shareReferralLink} className="bg-primary hover:bg-primary/90">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="bg-background/50 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold">How It Works:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Share your code with friends joining Sacred Greeks Life</li>
              <li>• Earn 50 points when they sign up</li>
              <li>• Earn 100 points when they complete onboarding</li>
              <li>• Earn 200 points when they stay active for 1 week</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Referrals and Leaderboard */}
      <Tabs defaultValue="referrals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="referrals">My Referrals</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="referrals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
              <CardDescription>
                Track your referrals and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {referrals.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No referrals yet. Start sharing your code to earn rewards!
                </div>
              ) : (
                <div className="space-y-3">
                  {referrals.map((referral) => (
                    <div
                      key={referral.id}
                      className="flex items-center justify-between p-4 bg-background rounded-lg border"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(referral.status)}
                          <span className="text-sm text-muted-foreground">
                            {new Date(referral.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {referral.converted_at && (
                          <p className="text-xs text-muted-foreground">
                            Converted on {new Date(referral.converted_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          +{referral.reward_earned} pts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
              <CardDescription>
                See who's leading the referral challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              {leaderboard.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Be the first to make referrals!
                </div>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.user_id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        entry.user_id === user?.id ? 'bg-primary/10 border-primary/30' : 'bg-background'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">
                            {entry.user_id === user?.id ? 'You' : entry.email.split('@')[0]}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {entry.referral_count} referrals
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          {entry.total_rewards} pts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
