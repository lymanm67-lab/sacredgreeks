import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, ArrowRight } from "lucide-react";

interface SubscriptionBannerProps {
  user: any;
  subscribed: boolean;
}

export function SubscriptionBanner({ user, subscribed }: SubscriptionBannerProps) {
  if (user && !subscribed) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-sacred/10 via-purple-500/10 to-sacred/10 border-sacred/30 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sacred/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 relative">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sacred to-purple-600 flex items-center justify-center shadow-lg shadow-sacred/30">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Unlock Premium Features</h3>
                  <p className="text-muted-foreground text-sm">AI Bible Study, Response Coach, and more with a free trial</p>
                </div>
              </div>
              <Link to="/subscription">
                <Button className="bg-sacred hover:bg-sacred/90 text-sacred-foreground shadow-lg hover:shadow-xl transition-all">
                  <Crown className="w-4 h-4 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-sacred/5 via-purple-500/5 to-sacred/5 border-border/50">
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-6">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-foreground">Ready for Premium Features?</h3>
                <p className="text-muted-foreground text-sm">Sign up free, then unlock AI tools with a trial</p>
              </div>
              <Link to="/auth">
                <Button variant="outline" className="border-sacred/50 hover:bg-sacred/10">
                  Sign Up Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
