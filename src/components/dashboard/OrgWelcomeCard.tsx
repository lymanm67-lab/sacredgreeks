import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Lightbulb, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getCouncilContent, getFaithIntegrationTips, getWelcomeMessage } from '@/data/orgSpecificContent';
import { GREEK_COUNCILS, getOrganizationsByCouncil } from '@/data/greekOrganizations';
import { useDemoMode } from '@/contexts/DemoModeContext';

interface UserOrgInfo {
  greekCouncil: string | null;
  greekOrganization: string | null;
  chapterName: string | null;
}

// Demo org info for users without org setup
const DEMO_ORG_INFO: UserOrgInfo = {
  greekCouncil: 'nphc',
  greekOrganization: 'Alpha Phi Alpha',
  chapterName: 'Beta',
};

export function OrgWelcomeCard() {
  const { user } = useAuth();
  const { isDemoMode } = useDemoMode();
  const [orgInfo, setOrgInfo] = useState<UserOrgInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (user) {
      loadOrgInfo();
    }
  }, [user, isDemoMode]);

  const loadOrgInfo = async () => {
    if (!user) return;
    
    // If demo mode is enabled, show demo data
    if (isDemoMode) {
      setOrgInfo(DEMO_ORG_INFO);
      setIsDemo(true);
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('greek_council, greek_organization, chapter_name')
        .eq('id', user.id)
        .maybeSingle();

      if (data && data.greek_council) {
        setOrgInfo({
          greekCouncil: data.greek_council,
          greekOrganization: data.greek_organization,
          chapterName: data.chapter_name,
        });
        setIsDemo(false);
      } else {
        // Show demo data if no org is set
        setOrgInfo(DEMO_ORG_INFO);
        setIsDemo(true);
      }
    } catch (error) {
      console.error('Error loading org info:', error);
      // Show demo on error
      setOrgInfo(DEMO_ORG_INFO);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  };

  // Show loading skeleton
  if (loading) {
    return null;
  }

  // Don't show if still no org info
  if (!orgInfo?.greekCouncil) {
    return null;
  }

  const councilContent = getCouncilContent(orgInfo.greekCouncil);
  const tips = getFaithIntegrationTips(orgInfo.greekCouncil);
  const welcomeMessage = getWelcomeMessage(orgInfo.greekCouncil, orgInfo.greekOrganization || undefined);

  // Find org details
  const organizations = getOrganizationsByCouncil(orgInfo.greekCouncil);
  const selectedOrg = organizations.find(o => o.name === orgInfo.greekOrganization);
  const councilData = GREEK_COUNCILS.find(c => c.id === orgInfo.greekCouncil);

  // Get a random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <Card className={`border-sacred/20 bg-gradient-to-br from-sacred/5 to-warm-blue/5 ${isDemo ? 'relative overflow-hidden' : ''}`}>
      {isDemo && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/20">
            Sample
          </Badge>
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sacred to-warm-blue flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {selectedOrg ? (
                  <>
                    <span className="font-bold">{selectedOrg.greekLetters}</span>
                    {orgInfo.chapterName && (
                      <span className="text-muted-foreground font-normal">
                        {orgInfo.chapterName} Chapter
                      </span>
                    )}
                  </>
                ) : (
                  <span>{orgInfo.greekOrganization || councilData?.name}</span>
                )}
              </CardTitle>
              <CardDescription>
                {councilData?.fullName || 'Greek Letter Organization'}
              </CardDescription>
            </div>
          </div>
          {!isDemo && (
            <Badge variant="outline" className="text-xs border-sacred/30 text-sacred">
              {councilData?.name || 'Greek'}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {isDemo ? 'This is a preview of organization-specific content. Set up your profile to see personalized guidance!' : welcomeMessage}
        </p>
        
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
              Faith Integration Tip
            </p>
            <p className="text-sm text-foreground">
              {randomTip}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {isDemo ? (
            <Link to="/profile">
              <Button size="sm" className="gap-2 bg-sacred hover:bg-sacred/90">
                <Users className="w-4 h-4" />
                Set Up Your Profile
              </Button>
            </Link>
          ) : (
            <Link to="/guide">
              <Button variant="outline" size="sm" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Explore Scenarios
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              {isDemo ? 'Skip for now' : 'Update Affiliation'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
