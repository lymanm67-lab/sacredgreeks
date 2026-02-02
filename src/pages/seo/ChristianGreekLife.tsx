import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { 
  BookOpen, Cross, Users, Heart, Shield, ArrowRight, 
  CheckCircle2, Star, Trophy, Zap, Target, Sparkles
} from "lucide-react";
import { BlueOceanBadge, FreeForeverBadge, CompetitorGapBadge } from "@/components/seo/BlueOceanBadge";
import { CompetitorCompare, CompetitorHighlight } from "@/components/seo/CompetitorCompare";

const uniqueFeatures = [
  {
    icon: Shield,
    title: "P.R.O.O.F. Framework™",
    description: "The only biblical evaluation tool for Greek life. Assess Pledging, Rituals, Oaths, Obscurity & Founders through Scripture.",
    unique: true,
  },
  {
    icon: Zap,
    title: "Response Coach AI",
    description: "Get AI-powered guidance on defending your faith while honoring your Greek commitments. No competitor offers this.",
    unique: true,
  },
  {
    icon: BookOpen,
    title: "Daily Devotionals for Greeks",
    description: "Scripture-based reflections addressing the unique experiences of Christians in fraternities and sororities.",
    unique: false,
  },
  {
    icon: Users,
    title: "Community Prayer Wall",
    description: "Connect with fellow believers across all Greek organizations who understand your unique journey.",
    unique: false,
  },
];

const whyDifferent = [
  { stat: "17+", label: "Competitors analyzed", detail: "None combine faith + Greek" },
  { stat: "6", label: "Unique features", detail: "You won't find elsewhere" },
  { stat: "$0", label: "Forever", detail: "Glorify charges $79/year" },
  { stat: "Only", label: "Faith + Greek app", detail: "True blue ocean" },
];

const testimonials = [
  {
    quote: "I searched everywhere for an app that understood both my faith AND my Greek life. Sacred Greeks is the only one that gets it.",
    author: "Marcus T.",
    org: "Kappa Alpha Psi",
  },
  {
    quote: "Glorify is great for devotionals, but it knows nothing about Greek life. Sacred Greeks bridges that gap perfectly.",
    author: "Ashley R.",
    org: "Delta Sigma Theta",
  },
];

export default function ChristianGreekLife() {
  return (
    <>
      <SEOHead
        title="Christian Greek Life App | Only Faith + Fraternity Resource | Sacred Greeks"
        description="The ONLY app combining Christian faith with Greek life guidance. Unlike Glorify (faith only) or OmegaFi (operations only), Sacred Greeks offers P.R.O.O.F. framework, daily devotionals, AI coaching & more—100% FREE."
        keywords="Christian Greek life, Christian fraternity app, Christian sorority app, faith-based Greek organization, Glorify alternative for Greeks, OmegaFi alternative, P.R.O.O.F. framework, Greek life biblical guidance, BGLO Christian app, Divine Nine faith"
        structuredDataType="WebPage"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-b from-sacred/10 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Blue Ocean Badge */}
              <div className="flex flex-wrap gap-2 justify-center">
                <BlueOceanBadge variant="gradient" />
                <FreeForeverBadge />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                The <span className="text-sacred">Only App</span> Where{' '}
                <span className="bg-gradient-to-r from-sacred to-purple-500 bg-clip-text text-transparent">
                  Faith Meets Greek Life
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Not a chapter management tool like <span className="line-through text-muted-foreground/60">OmegaFi</span>. 
                Not a generic faith app like <span className="line-through text-muted-foreground/60">Glorify</span>. 
                The <strong className="text-foreground">only resource</strong> purpose-built for Christians in Greek organizations.
              </p>
              
              <CompetitorHighlight />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-sacred hover:bg-sacred/90 text-sacred-foreground px-8">
                    Start Free Today
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/proof-course">
                  <Button size="lg" variant="outline" className="px-8">
                    Explore P.R.O.O.F. Framework
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Why Different Stats */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {whyDifferent.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-sacred">{item.stat}</div>
                  <div className="text-sm font-medium text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competitor Comparison */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <CompetitorGapBadge />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-4">
                See Why No One Else Compares
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We analyzed 17+ competitors. <span className="text-sacred font-semibold">None</span> combine faith resources with Greek life guidance.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <CompetitorCompare compact={false} />
            </div>
          </div>
        </section>

        {/* Unique Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Features You Won't Find Anywhere Else
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Purpose-built for the intersection of faith and Greek membership.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {uniqueFeatures.map((feature, index) => (
                <Card key={index} className={`border-2 transition-colors ${feature.unique ? 'border-sacred/30 bg-sacred/5' : 'hover:border-sacred/50'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${feature.unique ? 'bg-sacred/20' : 'bg-muted'}`}>
                        <feature.icon className={`w-6 h-6 ${feature.unique ? 'text-sacred' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                          {feature.unique && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-sacred text-white font-medium">UNIQUE</span>
                          )}
                        </div>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Everything Christian Greeks Need—For Free
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Daily devotionals for Christian Greeks",
                  "P.R.O.O.F.™ framework evaluation tool",
                  "Biblical perspective on Greek rituals",
                  "Prayer journal & community prayer wall",
                  "AI Response Coach for tough conversations",
                  "Symbol & ritual biblical guide",
                  "Anti-hazing Christian alternatives",
                  "30-day faith journey program",
                  "Myth Buster library (50+ topics)",
                  "Ask Dr. Lyman AI assistant",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-sacred shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Christians Choose Sacred Greeks
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-sacred text-sacred" />
                      ))}
                    </div>
                    <p className="text-foreground italic mb-4">"{testimonial.quote}"</p>
                    <div className="text-sm">
                      <span className="font-semibold">{testimonial.author}</span>
                      <span className="text-muted-foreground"> • {testimonial.org}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sacred/5">
          <div className="container mx-auto px-4 text-center">
            <Trophy className="w-12 h-12 text-sacred mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Own Your Niche: Faith + Greek Life
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join the only community purpose-built for Christians navigating Greek organizations.
              No other app serves this space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/snapshot">
                <Button size="lg" className="bg-sacred hover:bg-sacred/90">
                  Take the Faith Snapshot Quiz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/journey">
                <Button size="lg" variant="outline">
                  Start 30-Day Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <footer className="py-12 border-t">
          <div className="container mx-auto px-4">
            <h3 className="text-lg font-semibold mb-6 text-center">Explore More Resources</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/divine-nine-faith" className="text-sacred hover:underline">Divine Nine Faith Resources</Link>
              <Link to="/greek-life-biblical-guidance" className="text-sacred hover:underline">Biblical Guidance</Link>
              <Link to="/anti-hazing-christian" className="text-sacred hover:underline">Anti-Hazing Resources</Link>
              <Link to="/spiritual-growth-greek-life" className="text-sacred hover:underline">Spiritual Growth</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
