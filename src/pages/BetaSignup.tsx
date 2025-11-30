import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Heart,
  BookOpen,
  MessageCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BetaOnboarding } from "@/components/BetaOnboarding";

const BETA_FEATURES = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Daily Devotionals",
    description: "Scripture-based guidance grounded in P.R.O.O.F. framework"
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Prayer Journal",
    description: "Track your prayers and celebrate answered ones"
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: "Community Prayer Wall",
    description: "Support and be supported by fellow believers"
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Sacred Greeks Assessment",
    description: "Discover your spiritual alignment profile"
  }
];

export default function BetaSignup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    organization: "",
    referralCode: searchParams.get('ref') || "",
    agreeToTerms: false,
    agreeToEmails: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: Math.random().toString(36).slice(-12) + "A1!", // Temporary password
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            full_name: formData.fullName
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        setUserId(authData.user.id);
        
        // Create beta tester record
        const { error: betaError } = await supabase
          .from("beta_testers")
          .insert({
            user_id: authData.user.id,
            referred_by: formData.referralCode || null,
            status: "pending"
          });

        if (betaError) {
          console.error("Beta tester record error:", betaError);
        }

        // If referred, create referral record and reward referrer
        if (formData.referralCode) {
          // Find the referrer by beta code
          const { data: referrerData } = await supabase
            .from("beta_testers")
            .select("user_id")
            .eq("beta_code", formData.referralCode.toUpperCase())
            .single();
          
          if (referrerData) {
            // Create referral record
            await supabase.from("referrals").insert({
              referrer_id: referrerData.user_id,
              referred_user_id: authData.user.id,
              referral_code: formData.referralCode.toUpperCase(),
              status: "converted",
              reward_earned: 50,
              converted_at: new Date().toISOString()
            });
          }
        }

        // Send notification emails (non-blocking)
        supabase.functions.invoke("notify-beta-signup", {
          body: {
            testerName: formData.fullName,
            testerEmail: formData.email,
            organization: formData.organization || undefined,
            referredBy: formData.referralCode || undefined
          }
        }).catch(err => console.error("Notification error:", err));
      }

      setSubmitted(true);
      setShowOnboarding(true);
      toast.success("Welcome to the beta program!");
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.message?.includes("already registered")) {
        toast.error("This email is already registered. Try signing in instead.");
      } else {
        toast.error(error.message || "Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    navigate("/dashboard");
  };

  if (submitted) {
    return (
      <>
        <BetaOnboarding 
          open={showOnboarding} 
          onComplete={handleOnboardingComplete}
          userId={userId}
        />
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full text-center">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-3">You're on the List! 🎉</h2>
              <p className="text-muted-foreground mb-6">
                Check your email for a confirmation link. Once confirmed, you'll have full access to the Sacred Greeks beta.
              </p>
              <div className="space-y-3">
                <Button onClick={() => setShowOnboarding(true)} className="w-full">
                  Continue Onboarding
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={() => navigate("/auth")}>
                  Sign In Instead
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sacred/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Beta Access
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-sacred to-primary bg-clip-text text-transparent">
              Join the Sacred Greeks Beta
            </h1>
            <p className="text-lg text-muted-foreground">
              Be among the first to experience faith-centered tools designed to help you navigate Greek life with integrity and purpose.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Features */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">What You'll Get Access To</h2>
              <div className="grid gap-4">
                {BETA_FEATURES.map((feature, index) => (
                  <Card key={index} className="border-l-4 border-l-sacred">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-sacred/10 text-sacred shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Community Driven</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Early Access</span>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Request Beta Access</CardTitle>
                <CardDescription>
                  Fill out the form below to join our exclusive beta program
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization / Chapter (Optional)</Label>
                    <Input
                      id="organization"
                      placeholder="e.g., Phi Beta Sigma - Beta Chapter"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                    <Input
                      id="referralCode"
                      placeholder="Enter if you have one"
                      value={formData.referralCode}
                      onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, agreeToTerms: checked as boolean })
                        }
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        I agree to the{" "}
                        <a href="/terms" className="text-sacred hover:underline">Terms of Service</a>
                        {" "}and{" "}
                        <a href="/privacy" className="text-sacred hover:underline">Privacy Policy</a> *
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="emails"
                        checked={formData.agreeToEmails}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, agreeToEmails: checked as boolean })
                        }
                      />
                      <Label htmlFor="emails" className="text-sm leading-relaxed cursor-pointer">
                        Send me updates about new features and beta news
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Joining...
                      </>
                    ) : (
                      <>
                        Join Beta Program
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground pt-2">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/auth")}
                      className="text-sacred hover:underline"
                    >
                      Sign in here
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
