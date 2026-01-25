import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  MessageSquare, 
  Heart, 
  BookOpen, 
  Users 
} from 'lucide-react';
import { getCouncilContent, getFaithIntegrationTips, getCommonChallenges } from '@/data/orgSpecificContent';
import { GREEK_COUNCILS } from '@/data/greekOrganizations';

interface UserProfile {
  greek_council: string | null;
  greek_organization: string | null;
}

// Demo profile for demo mode
const DEMO_PROFILE: UserProfile = {
  greek_council: 'nphc',
  greek_organization: 'Phi Beta Sigma',
};

export const GreekCommunitySection = () => {
  const { user } = useAuth();
  const { isDemoMode } = useDemoMode();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // In demo mode, always show demo data regardless of auth state
    if (isDemoMode) {
      setUserProfile(DEMO_PROFILE);
      setIsDemo(true);
      setLoading(false);
      return;
    }
    
    if (user) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, [user, isDemoMode]);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from('profiles')
        .select('greek_council, greek_organization')
        .eq('id', user.id)
        .maybeSingle();

      if (data) {
        setUserProfile(data);
        setIsDemo(false);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Don't show if user has no Greek council set (and not in demo mode)
  if (loading || !userProfile?.greek_council) {
    return null;
  }

  const councilContent = getCouncilContent(userProfile.greek_council);
  const tips = getFaithIntegrationTips(userProfile.greek_council);
  const challenges = getCommonChallenges(userProfile.greek_council);
  const councilName = GREEK_COUNCILS.find(c => c.id === userProfile.greek_council)?.name || 'Greek';

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={`border-sacred/20 bg-gradient-to-br from-sacred/5 to-warm-blue/5 ${isDemo ? 'relative overflow-hidden' : ''}`}>
        {isDemo && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/20">
              Sample
            </Badge>
          </div>
        )}
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-sacred" />
                <span>{councilName} Community</span>
              </div>
              {isOpen ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0">
            {/* Welcome Message */}
            {councilContent && (
              <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg">
                <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Welcome, {councilContent.name} Member</p>
                  <p className="text-sm text-muted-foreground">{councilContent.welcomeMessage}</p>
                </div>
              </div>
            )}

            {/* Tips & Challenges Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Faith Integration Tips */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Faith Integration Tips</h4>
                <ul className="space-y-2">
                  {tips.slice(0, 3).map((tip, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-sacred">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Challenges */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Common Challenges</h4>
                <ul className="space-y-2">
                  {challenges.slice(0, 3).map((challenge, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-amber-500">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link to="/forum">
                <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
                  <MessageSquare className="h-4 w-4 text-indigo-500" />
                  <span className="text-xs">Forum</span>
                </Button>
              </Link>
              <Link to="/prayer-wall">
                <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-xs">Prayer Wall</span>
                </Button>
              </Link>
              <Link to="/guide">
                <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
                  <BookOpen className="h-4 w-4 text-sacred" />
                  <span className="text-xs">PROOF Guide</span>
                </Button>
              </Link>
              <Link to="/achievements">
                <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span className="text-xs">Achievements</span>
                </Button>
              </Link>
            </div>

            {/* Link to full community */}
            <div className="flex justify-end">
              <Link to="/community">
                <Button variant="link" size="sm" className="text-sacred">
                  View Group Coaching →
                </Button>
              </Link>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
