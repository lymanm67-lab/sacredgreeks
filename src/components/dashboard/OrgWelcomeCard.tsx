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

interface UserOrgInfo {
  greekCouncil: string | null;
  greekOrganization: string | null;
  chapterName: string | null;
}

export function OrgWelcomeCard() {
  const { user } = useAuth();
  const [orgInfo, setOrgInfo] = useState<UserOrgInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrgInfo();
    }
  }, [user]);

  const loadOrgInfo = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('greek_council, greek_organization, chapter_name')
        .eq('id', user.id)
        .maybeSingle();

      if (data) {
        setOrgInfo({
          greekCouncil: data.greek_council,
          greekOrganization: data.greek_organization,
          chapterName: data.chapter_name,
        });
      }
    } catch (error) {
      console.error('Error loading org info:', error);
    } finally {
      setLoading(false);
    }
  };

  // Don't show if no org info
  if (loading || !orgInfo?.greekCouncil) {
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
    <Card className="border-sacred/20 bg-gradient-to-br from-sacred/5 to-warm-blue/5">
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
          <Badge variant="outline" className="text-xs border-sacred/30 text-sacred">
            {councilData?.name || 'Greek'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {welcomeMessage}
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
          <Link to="/guide">
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Explore Scenarios
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Update Affiliation
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
