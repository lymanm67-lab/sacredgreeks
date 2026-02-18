import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Sparkles } from "lucide-react";

interface MinistryGateProps {
  children: React.ReactNode;
  featureName?: string;
}

export function MinistryGate({ children, featureName = "this feature" }: MinistryGateProps) {
  const { user, loading: authLoading } = useAuth();
  const { subscribed, tier, loading: subLoading } = useSubscription();

  if (authLoading || subLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!subscribed || tier !== 'ministry') {
    return (
      <div className="flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-primary/20">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
              <Crown className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Ministry Tier Required</CardTitle>
            <CardDescription className="text-base">
              {featureName} is available exclusively on the Ministry plan ($29.99/mo).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Sacred Studio Agent — AI video scripting</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Full leadership & chapter resources</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Everything in Pro, plus Ministry tools</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/subscription" className="w-full">
                <Button className="w-full gap-2">
                  <Crown className="w-4 h-4" /> Upgrade to Ministry
                </Button>
              </Link>
              <Link to="/dashboard" className="w-full">
                <Button variant="ghost" className="w-full">Back to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
