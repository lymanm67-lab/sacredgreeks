import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { 
  Cross, BookOpen, Users, Heart, Shield, ArrowRight, 
  CheckCircle2, Sparkles, Trophy, Zap, Star
} from "lucide-react";
import { BlueOceanBadge, FreeForeverBadge } from "@/components/seo/BlueOceanBadge";

const d9Organizations = [
  { name: "Alpha Phi Alpha", founded: "1906", type: "Fraternity", color: "bg-yellow-600" },
  { name: "Alpha Kappa Alpha", founded: "1908", type: "Sorority", color: "bg-pink-500" },
  { name: "Kappa Alpha Psi", founded: "1911", type: "Fraternity", color: "bg-red-600" },
  { name: "Omega Psi Phi", founded: "1911", type: "Fraternity", color: "bg-purple-600" },
  { name: "Delta Sigma Theta", founded: "1913", type: "Sorority", color: "bg-red-500" },
  { name: "Phi Beta Sigma", founded: "1914", type: "Fraternity", color: "bg-blue-600" },
  { name: "Zeta Phi Beta", founded: "1920", type: "Sorority", color: "bg-blue-500" },
  { name: "Sigma Gamma Rho", founded: "1922", type: "Sorority", color: "bg-yellow-500" },
  { name: "Iota Phi Theta", founded: "1963", type: "Fraternity", color: "bg-amber-700" },
];

const competitorGaps = [
  {
    competitor: "Black Greeks App",
    focus: "Dating & networking",
    missing: "Zero faith resources or biblical guidance",
    icon: Users,
  },
  {
    competitor: "Prophytes",
    focus: "Business networking",
    missing: "No spiritual growth tools or devotionals",
    icon: Zap,
  },
  {
    competitor: "Glorify/Hallow",
    focus: "General Christian faith",
    missing: "Completely ignores Black Greek culture",
    icon: Cross,
  },
];

const uniqueForD9 = [
  {
    title: "D9-Specific Daily Devotionals",
    description: "Reflections that understand stepping, strolling, and the unique BGLO experience.",
    icon: BookOpen,
  },
  {
    title: "P.R.O.O.F. for NPHC",
    description: "Biblical evaluation of Divine Nine pledging, rituals, and traditions.",
    icon: Shield,
  },
  {
    title: "Christian D9 Community",
    description: "Connect with believers across all nine organizations who share your faith journey.",
    icon: Users,
  },
  {
    title: "BGLO Myth Buster",
    description: "Address misconceptions about D9 membership from both faith and secular perspectives.",
    icon: Sparkles,
  },
];

export default function DivineNineFaith() {
  return (
    <>
      <SEOHead
        title="Divine Nine Faith Resources | Only Christian BGLO & NPHC App | Sacred Greeks"
        description="The ONLY faith app for Divine Nine members. Unlike Black Greeks (dating) or Glorify (no Greek content), Sacred Greeks offers D9-specific devotionals, P.R.O.O.F. framework, and BGLO community—100% FREE."
        keywords="Divine Nine faith, BGLO Christian app, NPHC spiritual growth, D9 faith resources, Black Greek Christian, Divine Nine Christianity, NPHC Bible study, Alpha Phi Alpha Christian, Delta Sigma Theta faith, Kappa Alpha Psi spiritual"
        structuredDataType="WebPage"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-b from-purple-500/10 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                <BlueOceanBadge variant="purple" />
                <FreeForeverBadge />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                The <span className="text-purple-600 dark:text-purple-400">Only Faith App</span> for{' '}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Divine Nine Members
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                <span className="line-through text-muted-foreground/60">Black Greeks</span> is for dating.{' '}
                <span className="line-through text-muted-foreground/60">Glorify</span> ignores D9 culture.{' '}
                <strong className="text-foreground">Sacred Greeks</strong> is the only app serving 
                Christians in all <span className="text-purple-600 dark:text-purple-400 font-semibold">9 NPHC organizations</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                    Join D9 Faith Community
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/proof-course">
                  <Button size="lg" variant="outline" className="px-8">
                    Learn P.R.O.O.F. Framework
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* D9 Organizations Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-2">
              Faith Resources for All 9 NPHC Organizations
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              From 1906 to today—we serve the entire Divine Nine community
            </p>
            <div className="grid grid-cols-3 md:grid-cols-9 gap-3 max-w-4xl mx-auto">
              {d9Organizations.map((org, index) => (
                <div 
                  key={index} 
                  className="text-center p-3 rounded-lg bg-background border hover:border-purple-500/50 transition-colors group"
                  title={`${org.name} - Founded ${org.founded}`}
                >
                  <div className={`w-8 h-8 mx-auto rounded-full ${org.color} mb-2 group-hover:scale-110 transition-transform`} />
                  <div className="text-xs font-medium text-foreground">{org.founded}</div>
                  <div className="text-[10px] text-muted-foreground">{org.type}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competitor Gaps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Trophy className="w-10 h-10 text-purple-500 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Other Apps Fail Divine Nine Members
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We analyzed every D9 and faith app. Here's what they're missing.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {competitorGaps.map((item, index) => (
                <Card key={index} className="border-2 border-red-500/20 bg-red-500/5">
                  <CardContent className="p-6 text-center">
                    <item.icon className="w-8 h-8 text-red-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">{item.competitor}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Focus: {item.focus}</p>
                    <p className="text-sm text-red-400 font-medium">{item.missing}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Unique D9 Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Built Exclusively for Christian D9 Members
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Features designed by someone who understands both BGLO culture and biblical faith.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {uniqueForD9.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-purple-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                        <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What D9 Christians Get */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Everything Divine Nine Christians Need
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Daily devotionals that understand D9 culture",
                  "P.R.O.O.F. framework for NPHC evaluation",
                  "Biblical perspective on stepping & strolling",
                  "Christian D9 prayer community",
                  "AI coach for faith + Greek questions",
                  "Symbol guide for all 9 organizations",
                  "Anti-hazing Christian alternatives",
                  "Spiritual growth tracking & achievements",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-purple-500 text-purple-500" />
                  ))}
                </div>
                <blockquote className="text-xl italic text-foreground mb-4">
                  "As a proud member of the Divine Nine, I struggled to reconcile my faith with 
                  my fraternity. Sacred Greeks showed me how to honor both my commitment to Christ 
                  and my BGLO brotherhood. <strong>No other app even comes close.</strong>"
                </blockquote>
                <div className="text-muted-foreground">
                  <span className="font-semibold">James W.</span> • Phi Beta Sigma Member
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-500/5">
          <div className="container mx-auto px-4 text-center">
            <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              4 Million D9 Members. Only 1 Faith App.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join the only community that truly serves Christian Divine Nine members. 
              Free forever. No premium tiers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/snapshot">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Take Faith Snapshot
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/devotional">
                <Button size="lg" variant="outline">
                  Today's Devotional
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
              <Link to="/christian-greek-life" className="text-purple-600 dark:text-purple-400 hover:underline">Christian Greek Life</Link>
              <Link to="/greek-life-biblical-guidance" className="text-purple-600 dark:text-purple-400 hover:underline">Biblical Guidance</Link>
              <Link to="/spiritual-growth-greek-life" className="text-purple-600 dark:text-purple-400 hover:underline">Spiritual Growth</Link>
              <Link to="/symbol-guide" className="text-purple-600 dark:text-purple-400 hover:underline">Symbol Guide</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
