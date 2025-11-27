import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Copy, MessageSquare, Share2, Gift, Trophy } from 'lucide-react';
import { useReferral } from '@/hooks/use-referral';
import { Skeleton } from '@/components/ui/skeleton';

export function ReferralCard() {
  const { 
    referralCode, 
    stats, 
    loading, 
    copyReferralLink, 
    textReferral,
    shareReferral,
    getReferralLink 
  } = useReferral();

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-amber-500" />
          Invite & Earn
        </CardTitle>
        <CardDescription>
          Share your referral link and earn points when friends join
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-background/50 rounded-lg p-2">
            <div className="text-lg font-bold text-amber-500">{stats.totalInvites}</div>
            <div className="text-xs text-muted-foreground">Invited</div>
          </div>
          <div className="bg-background/50 rounded-lg p-2">
            <div className="text-lg font-bold text-green-500">{stats.successfulInvites}</div>
            <div className="text-xs text-muted-foreground">Joined</div>
          </div>
          <div className="bg-background/50 rounded-lg p-2">
            <div className="text-lg font-bold text-sacred">{stats.totalPoints}</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </div>
        </div>

        {/* Referral Code */}
        {referralCode && (
          <div className="bg-muted/50 p-3 rounded-lg flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Your Code</div>
              <code className="text-sm font-mono font-bold">{referralCode}</code>
            </div>
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">
              <Trophy className="w-3 h-3 mr-1" />
              +50 pts/invite
            </Badge>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={textReferral}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Text Invite Link
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              onClick={copyReferralLink}
              className="border-amber-500/30 hover:bg-amber-500/10"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button 
              variant="outline" 
              onClick={shareReferral}
              className="border-amber-500/30 hover:bg-amber-500/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* How it works */}
        <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
          <p className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            Earn 50 points for each friend who signs up with your link
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
