import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles, Shield, Zap, Users, ArrowRight, CheckCircle2,
  Heart, BookOpen, MessageCircle, Target, Crown, Gift, Copy,
  Star, Flame, Trophy
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FOUNDING_BENEFITS = [
  { icon: Crown, title: "Free for Life", desc: "Founding Members never pay. Ever." },
  { icon: Star, title: "Exclusive Badge", desc: "Permanent 'Founding Member' badge on your profile." },
  { icon: Zap, title: "Early Access", desc: "First to try new features before anyone else." },
  { icon: Trophy, title: "Founders Wall", desc: "Your name permanently displayed on our Founders Wall." },
  { icon: Gift, title: "AI Tools Unlocked", desc: "Full access to AI coaching and premium audio." },
  { icon: Heart, title: "Shape the Product", desc: "Direct input on features we build next." },
];

const FEATURES = [
  { icon: BookOpen, title: "Daily Devotionals", desc: "Scripture-based guidance through the P.R.O.O.F. framework" },
  { icon: Heart, title: "Prayer Journal & Wall", desc: "Track prayers, support your community" },
  { icon: MessageCircle, title: "AI Response Coach", desc: "Practice biblical responses to tough questions" },
  { icon: Target, title: "P.R.O.O.F. Course", desc: "5-lesson framework for evaluating membership" },
];

const FAQ_ITEMS = [
  { q: "What does 'Free for Life' actually mean?", a: "Founding Members will never be charged for any tier of Sacred Greeks. As we grow and add premium features, your access is grandfathered in permanently." },
  { q: "How does the referral program work?", a: "After signing up, you get a unique invite link. Share it with friends — when 3 people join using your link, you earn the Founding Member badge and Founders Wall placement." },
  { q: "Is this only for Divine Nine members?", a: "No! While our content focuses on Black Greek Letter Organizations (BGLOs), any Christian in any Greek organization is welcome." },
  { q: "When does the beta end?", a: "We're accepting the first 100 Founding Members. After that, the app moves to paid tiers. Sign up now to lock in your free access." },
];

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SG-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function Beta() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    organization: "",
    referralCode: searchParams.get("ref") || "",
    agreeToTerms: false,
  });

  useEffect(() => {
    loadMemberCount();
  }, []);

  const loadMemberCount = async () => {
    const { data } = await supabase.rpc("get_founding_member_count");
    setMemberCount((data as number) || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms");
      return;
    }
    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: crypto.randomUUID().slice(0, 16) + "A1!",
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: { full_name: formData.fullName.trim() },
        },
      });
      if (authError) throw authError;

      const newCode = generateReferralCode();
      if (authData.user) {
        await supabase.from("founding_members").insert({
          user_id: authData.user.id,
          email: formData.email.trim(),
          full_name: formData.fullName.trim(),
          organization: formData.organization.trim() || null,
          referral_code: newCode,
          referred_by_code: formData.referralCode.trim().toUpperCase() || null,
        });

        // Increment referrer's count
        if (formData.referralCode.trim()) {
          try {
            await supabase
              .from("founding_members")
              .update({ referral_count: memberCount })
              .eq("referral_code", formData.referralCode.trim().toUpperCase());
          } catch {}
        }

        // Also create beta_testers record for compatibility
        try {
          await supabase.from("beta_testers").insert({
            user_id: authData.user.id,
            referred_by: formData.referralCode.trim() || null,
            status: "active",
            beta_code: newCode,
          });
        } catch {}
      }

      setReferralCode(newCode);
      setSubmitted(true);
      setMemberCount((c) => c + 1);
      toast.success("Welcome, Founding Member! 🎉");
    } catch (error: any) {
      if (error.message?.includes("already registered")) {
        toast.error("This email is already registered. Try signing in.");
      } else {
        toast.error(error.message || "Sign up failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/beta?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success("Invite link copied!");
  };

  const spotsLeft = Math.max(0, 100 - memberCount);
  const progress = Math.min(100, (memberCount / 100) * 100);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <SEOHead
          title="Welcome, Founding Member!"
          description="You're in! Share your invite link to unlock badges."
          noindex
        />
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto shadow-2xl">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              You're a Founding Member! 🎉
            </h1>
            <p className="text-lg text-muted-foreground">
              Check your email to verify your account. Your <strong>Free for Life</strong> access is locked in.
            </p>

            {/* Referral Card */}
            <Card className="border-2 border-amber-500/30 bg-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-500" />
                  Share & Earn Rewards
                </h3>
                <p className="text-sm text-muted-foreground">
                  Invite 3 friends → Founding Member Badge • Invite 5 → Founders Wall
                </p>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={`${window.location.origin}/beta?ref=${referralCode}`}
                    className="text-sm"
                  />
                  <Button onClick={copyReferralLink} size="icon" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Your code: <strong>{referralCode}</strong></p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate("/auth")} size="lg">
                Sign In to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={() => navigate("/snapshot")} size="lg">
                Take Faith Snapshot
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <SEOHead
        title="Join the First 100 Founding Members — Free for Life"
        description="Be among the first 100 to join Sacred Greeks and get Founding Member status with free lifetime access. The #1 faith app for Christians in Greek life."
        keywords="Sacred Greeks beta, founding member, free Christian Greek life app, Divine Nine faith app"
        structuredDataType="FAQPage"
        faqItems={FAQ_ITEMS.map((f) => ({ question: f.q, answer: f.a }))}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(225,50%,8%)] via-[hsl(225,60%,14%)] to-[hsl(210,80%,20%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 right-10 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-sm px-4 py-1">
                <Flame className="w-3 h-3 mr-1" />
                {spotsLeft} of 100 spots remaining
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Join the First 100{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Founding Members
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Get <strong className="text-white">free lifetime access</strong> to the #1 faith app for Christians in Greek life. No credit card. No catch.
            </motion.p>

            {/* Live Counter */}
            <motion.div
              className="max-w-md mx-auto space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-white/60">
                <strong className="text-amber-400">{memberCount}</strong> of 100 Founding Members joined
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left: Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">What Founding Members Get</h2>
              <p className="text-muted-foreground">Exclusive perks that never expire.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {FOUNDING_BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="h-full border-border/50 hover:border-amber-500/30 transition-colors">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                        <b.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{b.title}</h3>
                        <p className="text-xs text-muted-foreground">{b.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Core Features */}
            <div>
              <h3 className="text-lg font-bold mb-4">Platform Features</h3>
              <div className="space-y-3">
                {FEATURES.map((f) => (
                  <div key={f.title} className="flex items-center gap-3">
                    <div className="p-1.5 rounded bg-primary/10 text-primary">
                      <f.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-sm">{f.title}</span>
                      <span className="text-xs text-muted-foreground ml-2">— {f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-blue-500" />
                <span>By Dr. Lyman Montgomery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Built for Divine Nine</span>
              </div>
            </div>
          </div>

          {/* Right: Signup Form */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-xl border-2 border-amber-500/20">
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <Crown className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <h3 className="text-xl font-bold">Claim Your Founding Spot</h3>
                  <p className="text-sm text-muted-foreground">Only {spotsLeft} spots left</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      maxLength={255}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization / Chapter</Label>
                    <Input
                      id="organization"
                      placeholder="e.g., Phi Beta Sigma"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      maxLength={200}
                    />
                  </div>

                  {searchParams.get("ref") && (
                    <div className="space-y-2">
                      <Label>Referred by</Label>
                      <Input readOnly value={formData.referralCode} className="bg-muted" />
                    </div>
                  )}

                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(c) => setFormData({ ...formData, agreeToTerms: c as boolean })}
                    />
                    <Label htmlFor="terms" className="text-xs leading-relaxed cursor-pointer">
                      I agree to the <Link to="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Joining..." : (
                      <>
                        <Crown className="w-4 h-4 mr-2" />
                        Become a Founding Member
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Already a member? <Link to="/signin" className="text-primary hover:underline">Sign in</Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-[hsl(225,50%,12%)] to-[hsl(210,80%,20%)] py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">Don't Miss Your Spot</h2>
          <p className="text-white/70 max-w-lg mx-auto">
            Only {spotsLeft} founding member spots remain. Once they're gone, the app moves to paid tiers.
          </p>
          <Button
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Crown className="w-4 h-4 mr-2" />
            Claim Your Free Spot
          </Button>
        </div>
      </section>
    </div>
  );
}