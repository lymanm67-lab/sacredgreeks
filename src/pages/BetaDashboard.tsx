import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Sparkles, 
  Copy, 
  Users, 
  MessageSquare, 
  Gift, 
  Trophy,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  Share2,
  Star,
  Bug,
  Lightbulb
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface BetaTesterData {
  id: string;
  beta_code: string;
  status: string;
  signup_date: string;
  onboarding_completed: boolean;
  feedback_count: number;
}

interface ReferralData {
  id: string;
  referral_code: string;
  status: string;
  reward_earned: number;
  created_at: string;
}

interface FeedbackItem {
  id: string;
  feedback_type: string;
  title: string;
  status: string;
  created_at: string;
  rating: number | null;
}

export default function BetaDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [betaData, setBetaData] = useState<BetaTesterData | null>(null);
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [referralStats, setReferralStats] = useState({ total: 0, converted: 0, points: 0 });

  useEffect(() => {
    if (user) {
      loadBetaData();
    }
  }, [user]);

  const loadBetaData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load beta tester data
      const { data: testerData } = await supabase
        .from('beta_testers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setBetaData(testerData);

      // Load referrals
      const { data: referralsData } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });

      setReferrals(referralsData || []);

      // Calculate referral stats
      if (referralsData) {
        setReferralStats({
          total: referralsData.length,
          converted: referralsData.filter(r => r.status === 'converted').length,
          points: referralsData.reduce((sum, r) => sum + (r.reward_earned || 0), 0)
        });
      }

      // Load feedback
      const { data: feedbackData } = await supabase
        .from('beta_feedback')
        .select('id, feedback_type, title, status, created_at, rating')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      setFeedback(feedbackData || []);
    } catch (error) {
      console.error('Error loading beta data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (betaData?.beta_code) {
      navigator.clipboard.writeText(betaData.beta_code);
      toast.success('Referral code copied!');
    }
  };

  const copyReferralLink = () => {
    if (betaData?.beta_code) {
      const link = `${window.location.origin}/beta-signup?ref=${betaData.beta_code}`;
      navigator.clipboard.writeText(link);
      toast.success('Referral link copied!');
    }
  };

  const shareReferral = async () => {
    if (!betaData?.beta_code) return;
    
    const link = `${window.location.origin}/beta-signup?ref=${betaData.beta_code}`;
    const text = `Join me on Sacred Greeks! Use my referral code ${betaData.beta_code} to sign up for the beta.`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Join Sacred Greeks Beta', text, url: link });
      } catch (err) {
        copyReferralLink();
      }
    } else {
      copyReferralLink();
    }
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'bug': return <Bug className="h-4 w-4 text-red-500" />;
      case 'feature': return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      default: return <MessageSquare className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-500/10 text-green-500">Resolved</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500/10 text-blue-500">In Progress</Badge>;
      case 'reviewed':
        return <Badge className="bg-purple-500/10 text-purple-500">Reviewed</Badge>;
      default:
        return <Badge variant="secondary">New</Badge>;
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your beta dashboard</h1>
        <Button onClick={() => navigate('/auth')}>Sign In</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-sacred border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!betaData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Sparkles className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-4">You're not enrolled in the beta program</h1>
        <p className="text-muted-foreground mb-6">Join our beta to get early access and help shape Sacred Greeks!</p>
        <Button onClick={() => navigate('/beta-signup')}>
          Join Beta Program
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-gradient-to-r from-sacred to-primary text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              Beta Tester
            </Badge>
            {betaData.status === 'active' && (
              <Badge className="bg-green-500/10 text-green-500">Active</Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">Beta Dashboard</h1>
          <p className="text-muted-foreground">
            Track your contributions, referrals, and exclusive beta perks
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sacred/10">
                  <MessageSquare className="h-5 w-5 text-sacred" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{betaData.feedback_count}</p>
                  <p className="text-xs text-muted-foreground">Feedback Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{referralStats.total}</p>
                  <p className="text-xs text-muted-foreground">Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{referralStats.converted}</p>
                  <p className="text-xs text-muted-foreground">Converted</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{referralStats.points}</p>
                  <p className="text-xs text-muted-foreground">Points Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="referrals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="feedback">My Feedback</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-sacred" />
                  Invite Friends & Earn Rewards
                </CardTitle>
                <CardDescription>
                  Share your unique referral code and earn 50 points for each friend who joins!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
                  <Label className="text-sm text-muted-foreground mb-2 block">Your Referral Code</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={betaData.beta_code || ''} 
                      readOnly 
                      className="font-mono text-lg font-bold"
                    />
                    <Button variant="outline" onClick={copyReferralCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={copyReferralLink} variant="outline" className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button onClick={shareReferral} className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Referral Progress */}
                <div className="pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Referral Progress</span>
                    <span className="text-muted-foreground">{referralStats.converted}/5 for bonus</span>
                  </div>
                  <Progress value={(referralStats.converted / 5) * 100} />
                  <p className="text-xs text-muted-foreground mt-2">
                    Refer 5 friends who sign up to earn a bonus 100 points!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Referral List */}
            {referrals.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Referrals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {referrals.map((ref) => (
                      <div key={ref.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            ref.status === 'converted' ? 'bg-green-500/10' : 'bg-yellow-500/10'
                          }`}>
                            {ref.status === 'converted' ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {ref.status === 'converted' ? 'Converted' : 'Pending'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(ref.created_at), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        {ref.reward_earned > 0 && (
                          <Badge className="bg-yellow-500/10 text-yellow-600">
                            +{ref.reward_earned} pts
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Feedback History</CardTitle>
                <CardDescription>
                  Track the status of your bug reports, feature requests, and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                {feedback.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No feedback submitted yet</p>
                    <p className="text-sm mt-2">Use the feedback button to share your thoughts!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {feedback.map((item) => (
                      <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          {getFeedbackIcon(item.feedback_type)}
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(item.created_at), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Beta Tester Rewards
                </CardTitle>
                <CardDescription>
                  Exclusive perks and rewards for our beta testers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="p-3 rounded-full bg-gradient-to-br from-sacred to-primary">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Founding Member Badge</h4>
                      <p className="text-sm text-muted-foreground">
                        Exclusive badge shown on your profile forever
                      </p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500">Earned</Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="p-3 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
                      <Gift className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Early Access to Features</h4>
                      <p className="text-sm text-muted-foreground">
                        Be first to try new features before public release
                      </p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500">Active</Badge>
                  </div>

                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="p-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-500">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">5 Referral Bonus</h4>
                      <p className="text-sm text-muted-foreground">
                        Refer 5 friends to earn 100 bonus points
                      </p>
                    </div>
                    {referralStats.converted >= 5 ? (
                      <Badge className="bg-green-500/10 text-green-500">Earned</Badge>
                    ) : (
                      <Badge variant="secondary">{referralStats.converted}/5</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 p-4 border rounded-lg opacity-60">
                    <div className="p-3 rounded-full bg-muted">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Premium Features Discount</h4>
                      <p className="text-sm text-muted-foreground">
                        20% off premium subscription at launch
                      </p>
                    </div>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                </div>

                {/* Points Summary */}
                <div className="p-4 bg-gradient-to-br from-sacred/10 to-primary/10 rounded-lg mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Points Earned</p>
                      <p className="text-3xl font-bold">{referralStats.points}</p>
                    </div>
                    <Trophy className="h-12 w-12 text-yellow-500 opacity-50" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`text-sm font-medium ${className}`} {...props}>{children}</label>;
}
