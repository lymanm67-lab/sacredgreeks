import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface PremiumGateProps {
  children: React.ReactNode;
  featureName?: string;
}

export function PremiumGate({ children, featureName = "this feature" }: PremiumGateProps) {
  const { user, loading: authLoading } = useAuth();
  const { subscribed, loading: subLoading } = useSubscription();

  // Show loading state
  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sacred border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Show upgrade prompt if not subscribed
  if (!subscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-sacred/20 bg-gradient-to-br from-card to-card/80">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-sacred/20 mb-4 mx-auto">
              <Crown className="w-8 h-8 text-amber-500" />
            </div>
            <CardTitle className="text-2xl">Premium Feature</CardTitle>
            <CardDescription className="text-base">
              Upgrade to Pro to unlock {featureName} and more exclusive content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Sparkles className="w-4 h-4 text-sacred" />
                <span>AI-powered Bible study tools</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Sparkles className="w-4 h-4 text-sacred" />
                <span>Response coach for tough questions</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Sparkles className="w-4 h-4 text-sacred" />
                <span>Priority support & new features</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Link to="/subscription" className="w-full">
                <Button className="w-full bg-gradient-to-r from-sacred to-amber-500 hover:from-sacred/90 hover:to-amber-500/90 text-white">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </Link>
              <Link to="/dashboard" className="w-full">
                <Button variant="ghost" className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is subscribed, show the content
  return <>{children}</>;
}
