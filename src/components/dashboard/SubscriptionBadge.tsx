import { Link } from "react-router-dom";
import { useSubscription } from "@/hooks/use-subscription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles } from "lucide-react";

export function SubscriptionBadge() {
  const { subscribed, tier, loading } = useSubscription();

  if (loading) {
    return null;
  }

  if (subscribed) {
    return (
      <Link to="/subscription">
        <Badge className="bg-gradient-to-r from-amber-500/20 to-sacred/20 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:from-amber-500/30 hover:to-sacred/30 cursor-pointer transition-colors">
          <Crown className="w-3 h-3 mr-1" />
          {tier === 'ministry' ? 'Ministry' : 'Pro'} Member
        </Badge>
      </Link>
    );
  }

  return (
    <Link to="/subscription">
      <Button size="sm" variant="outline" className="gap-2 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50">
        <Sparkles className="w-3 h-3" />
        Upgrade to Pro
      </Button>
    </Link>
  );
}
