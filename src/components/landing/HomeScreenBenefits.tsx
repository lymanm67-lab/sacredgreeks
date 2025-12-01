import { Smartphone, Wifi, WifiOff, Bell, Zap, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Zap,
    title: "One-Tap Access",
    description: "Launch instantly from your home screen—no browser needed"
  },
  {
    icon: WifiOff,
    title: "Works Offline",
    description: "Access devotionals, prayers, and tools even without internet"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Gentle reminders for devotionals, prayer times, and milestones"
  },
  {
    icon: Download,
    title: "No App Store",
    description: "Install directly from your browser—always up to date"
  }
];

export function HomeScreenBenefits() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="border-sacred/20 bg-gradient-to-br from-sacred/5 to-purple-500/5 overflow-hidden">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left - Phone visual */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <div className="absolute inset-0 bg-sacred/20 rounded-3xl blur-2xl" />
                    <div className="relative bg-gradient-to-br from-background to-muted rounded-3xl p-6 border border-border/50 shadow-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-sacred flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-sacred-foreground" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">Sacred Greeks</p>
                          <p className="text-xs text-muted-foreground">On your home screen</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {["Devotional", "Prayer", "Journey"].map((item) => (
                          <div key={item} className="text-center p-2 rounded-lg bg-muted/50">
                            <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-sacred/20" />
                            <p className="text-[10px] text-muted-foreground">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Benefits */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Install Like an App,{" "}
                      <span className="text-sacred">No Store Required</span>
                    </h3>
                    <p className="text-muted-foreground">
                      Sacred Greeks is a Progressive Web App—all the benefits of a native app without the download hassle.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {benefits.map((benefit) => (
                      <div key={benefit.title} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                        <benefit.icon className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm text-foreground">{benefit.title}</p>
                          <p className="text-xs text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link to="/install">
                    <Button variant="outline" className="border-sacred/30 hover:bg-sacred/10 hover:text-sacred">
                      <Download className="w-4 h-4 mr-2" />
                      Learn How to Install
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
