import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { 
  Cross, BookOpen, Users, Heart, Shield, ArrowRight, 
  CheckCircle2, Sparkles, Calendar
} from "lucide-react";

const d9Organizations = [
  { name: "Alpha Phi Alpha", founded: "1906", type: "Fraternity" },
  { name: "Alpha Kappa Alpha", founded: "1908", type: "Sorority" },
  { name: "Kappa Alpha Psi", founded: "1911", type: "Fraternity" },
  { name: "Omega Psi Phi", founded: "1911", type: "Fraternity" },
  { name: "Delta Sigma Theta", founded: "1913", type: "Sorority" },
  { name: "Phi Beta Sigma", founded: "1914", type: "Fraternity" },
  { name: "Zeta Phi Beta", founded: "1920", type: "Sorority" },
  { name: "Sigma Gamma Rho", founded: "1922", type: "Sorority" },
  { name: "Iota Phi Theta", founded: "1963", type: "Fraternity" },
];

const faithResources = [
  {
    title: "Daily Devotionals for D9 Members",
    description: "Scripture-based reflections addressing the unique experiences of Divine Nine members.",
    icon: BookOpen,
  },
  {
    title: "P.R.O.O.F. Framework Analysis",
    description: "Biblical evaluation of BGLO pledging, rituals, oaths, and organizational structures.",
    icon: Shield,
  },
  {
    title: "Christian NPHC Community",
    description: "Connect with fellow believers across all nine National Pan-Hellenic Council organizations.",
    icon: Users,
  },
  {
    title: "Spiritual Growth Tools",
    description: "Prayer journals, Bible study guides, and milestone tracking for your faith journey.",
    icon: Heart,
  },
];

export default function DivineNineFaith() {
  return (
    <>
      <SEOHead
        title="Divine Nine Faith Resources | Christian BGLO & NPHC Spiritual Guide"
        description="Faith-based resources for Divine Nine members. Christian guidance for BGLO organizations, NPHC spiritual growth, D9 biblical perspectives, and community support for believers in historically Black Greek-letter organizations."
        keywords="Divine Nine faith, BGLO Christian, NPHC spiritual growth, D9 faith resources, Black Greek Christian, Divine Nine Christianity, NPHC Bible study, BGLO devotional, Christian Greek letter organization, Black fraternity Christian, Black sorority faith"
        structuredDataType="WebPage"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-b from-purple-500/10 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Divine Nine Faith Resources</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Faith Resources for{' '}
                <span className="text-purple-600 dark:text-purple-400">Divine Nine</span> Members
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Biblical guidance, spiritual growth tools, and Christian community for members of 
                Black Greek-letter organizations (BGLOs) and the National Pan-Hellenic Council (NPHC).
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                    Join Our D9 Faith Community
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/proof-course">
                  <Button size="lg" variant="outline" className="px-8">
                    Learn the P.R.O.O.F. Framework
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* D9 Organizations Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              Resources for All Nine NPHC Organizations
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-9 gap-4 max-w-4xl mx-auto">
              {d9Organizations.map((org, index) => (
                <div 
                  key={index} 
                  className="text-center p-3 rounded-lg bg-background border hover:border-purple-500/50 transition-colors"
                  title={`${org.name} - Founded ${org.founded}`}
                >
                  <div className="text-xs text-muted-foreground">{org.founded}</div>
                  <div className="text-[10px] text-muted-foreground/70 mt-1">{org.type}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Serving all Divine Nine organizations since their founding dates (1906-1963)
            </p>
          </div>
        </section>

        {/* Faith Resources */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Christian Resources for BGLO Members
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive faith-based support designed specifically for the Divine Nine experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faithResources.map((resource, index) => (
                <Card key={index} className="border-2 hover:border-purple-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                        <resource.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
                        <p className="text-muted-foreground">{resource.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Topics for D9 Christians */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Key Topics for Divine Nine Christians
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Biblical perspective on BGLO membership",
                  "NPHC rituals through a Christian lens",
                  "Faith-affirming approach to D9 traditions",
                  "Christian fellowship in Black Greek life",
                  "Honoring God as a Divine Nine member",
                  "Prayer support for NPHC Christians",
                  "Biblical guidance on Greek oaths",
                  "Spiritual growth in BGLO organizations",
                ].map((topic, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                    <span className="text-foreground">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
              <CardContent className="p-8 text-center">
                <Cross className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <blockquote className="text-xl italic text-foreground mb-4">
                  "As a proud member of the Divine Nine, I struggled to reconcile my faith with 
                  my fraternity. Sacred Greeks showed me how to honor both my commitment to Christ 
                  and my BGLO brotherhood."
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
            <h2 className="text-3xl font-bold mb-4">
              Join the Christian Divine Nine Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Connect with believers across all nine NPHC organizations. Get daily devotionals, 
              biblical guidance, and community support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/snapshot">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Take Faith Snapshot Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/devotional">
                <Button size="lg" variant="outline">
                  Read Today's Devotional
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
