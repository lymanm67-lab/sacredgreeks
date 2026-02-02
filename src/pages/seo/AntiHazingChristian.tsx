import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { 
  Shield, Heart, Users, Cross, ArrowRight, 
  CheckCircle2, AlertTriangle, Phone, HandHeart, Trophy, Sparkles, Zap
} from "lucide-react";
import { BlueOceanBadge, FreeForeverBadge } from "@/components/seo/BlueOceanBadge";

const uniqueApproach = [
  { stat: "Only", label: "Anti-hazing app", detail: "With biblical alternatives" },
  { stat: "50+", label: "Resources", detail: "Scripture-based guidance" },
  { stat: "$0", label: "Forever", detail: "Free safety resources" },
  { stat: "24/7", label: "Support", detail: "AI assistant available" },
];

const hazingAlternatives = [
  {
    traditional: "Physical punishment or abuse",
    biblical: "Mentorship through encouragement (1 Thessalonians 5:11)",
    icon: Heart,
  },
  {
    traditional: "Humiliation rituals",
    biblical: "Building up with dignity (Romans 12:10)",
    icon: Users,
  },
  {
    traditional: "Sleep deprivation",
    biblical: "Reasonable requirements respecting well-being (3 John 1:2)",
    icon: Shield,
  },
  {
    traditional: "Forced isolation",
    biblical: "Community and fellowship (Hebrews 10:24-25)",
    icon: HandHeart,
  },
];

const warningSignsList = [
  "Being asked to keep activities secret from family or authorities",
  "Physical activities causing pain, exhaustion, or injury",
  "Verbal abuse, humiliation, or degradation",
  "Being forced to consume alcohol or other substances",
  "Sleep deprivation or extreme fatigue requirements",
  "Activities that violate your personal values or faith",
  "Threats or intimidation if you question activities",
  "Isolation from friends, family, or support systems",
];

export default function AntiHazingChristian() {
  return (
    <>
      <SEOHead
        title="Anti-Hazing Christian Resources | Only Biblical Alternative Guide | Sacred Greeks"
        description="The ONLY anti-hazing resource with biblical alternatives. Unlike generic safety sites, Sacred Greeks offers Scripture-based responses, faith-centered prevention strategies, and Christian community support—100% FREE."
        keywords="anti-hazing Christian, Greek hazing alternatives biblical, Christian fraternity hazing prevention, sorority hazing Bible response, ethical Greek life Christian, hazing warning signs, stop Greek hazing faith, Christian greek safety, biblical anti-hazing resources"
        structuredDataType="WebPage"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-b from-red-500/10 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                <BlueOceanBadge variant="default" />
                <FreeForeverBadge />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                The <span className="text-red-600 dark:text-red-400">Only</span> Anti-Hazing Resource with{' '}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Biblical Alternatives
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                <span className="line-through text-muted-foreground/60">StopHazing.org</span> is secular only.{' '}
                <span className="line-through text-muted-foreground/60">Greek management apps</span> ignore safety.{' '}
                <strong className="text-foreground">Sacred Greeks</strong> is the only resource offering{' '}
                <span className="text-red-600 dark:text-red-400 font-semibold">Scripture-based hazing prevention</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/anti-hazing">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                    Full Anti-Hazing Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/proof-assessment">
                  <Button size="lg" variant="outline" className="px-8">
                    Evaluate Your Organization
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Emergency Banner */}
        <section className="py-6 bg-red-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <Phone className="w-6 h-6 animate-pulse" />
              <div>
                <p className="font-semibold">If you're experiencing hazing or are in danger:</p>
                <p className="text-sm">Call 911 for emergencies or the Hazing Hotline: 1-888-NOT-HAZE</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {uniqueApproach.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400">{item.stat}</div>
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Approach Notice */}
        <section className="py-8 bg-red-500/10 border-y border-red-500/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 text-center">
              <Trophy className="w-6 h-6 text-red-600 dark:text-red-400" />
              <p className="text-red-700 dark:text-red-300 font-medium">
                Only Sacred Greeks offers hazing alternatives with Scripture references for each situation.
              </p>
            </div>
          </div>
        </section>

        {/* Biblical Alternatives */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Sparkles className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Biblical Alternatives to Hazing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Scripture provides a better way to build brotherhood and sisterhood—without harm. 
                <span className="text-red-600 dark:text-red-400 font-medium"> Only available here.</span>
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {hazingAlternatives.map((item, index) => (
                <Card key={index} className="border-2 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-red-500/10 p-3 border-b border-red-500/20">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-600 dark:text-red-400 font-medium">INSTEAD OF</span>
                        <span className="text-sm text-muted-foreground line-through">{item.traditional}</span>
                      </div>
                    </div>
                    <div className="bg-emerald-500/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium">TRY THIS</span>
                          <p className="text-foreground mt-2">{item.biblical}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 justify-center mb-8">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
                <h2 className="text-3xl font-bold text-center">
                  Warning Signs of Hazing
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {warningSignsList.map((sign, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background border">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scripture Foundation */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
              <CardContent className="p-8 text-center">
                <Cross className="w-10 h-10 text-sacred mx-auto mb-4" />
                <blockquote className="text-xl italic text-foreground mb-4">
                  "Do nothing out of selfish ambition or vain conceit. Rather, in humility value 
                  others above yourselves, not looking to your own interests but each of you to 
                  the interests of the others."
                </blockquote>
                <div className="text-muted-foreground font-semibold">
                  Philippians 2:3-4
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  True brotherhood and sisterhood is built through mutual respect, not degradation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What To Do */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              If You Witness or Experience Hazing
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                { step: "1", action: "Remove yourself from the situation if safe to do so" },
                { step: "2", action: "Document what happened (dates, times, witnesses)" },
                { step: "3", action: "Report to campus authorities or Greek affairs office" },
                { step: "4", action: "Seek support from trusted friends, family, or counselors" },
                { step: "5", action: "Pray for wisdom and guidance in your response" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-background border">
                  <div className="w-10 h-10 rounded-full bg-sacred/10 flex items-center justify-center text-sacred font-bold">
                    {item.step}
                  </div>
                  <span className="text-foreground">{item.action}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-red-500/5">
          <div className="container mx-auto px-4 text-center">
            <Zap className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Build Brotherhood Without Harm
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Get complete biblical alternatives for every hazing scenario. Only on Sacred Greeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/proof-course">
                <Button size="lg" className="bg-sacred hover:bg-sacred/90">
                  Learn P.R.O.O.F. Framework
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/chapter-kit">
                <Button size="lg" variant="outline">
                  Chapter Resource Kit
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <footer className="py-12 border-t">
          <div className="container mx-auto px-4">
            <h3 className="text-lg font-semibold mb-6 text-center">Related Resources</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/christian-greek-life" className="text-sacred hover:underline">Christian Greek Life</Link>
              <Link to="/greek-life-biblical-guidance" className="text-sacred hover:underline">Biblical Guidance</Link>
              <Link to="/healing-resources" className="text-sacred hover:underline">Healing Resources</Link>
              <Link to="/parents-family" className="text-sacred hover:underline">For Parents & Family</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
