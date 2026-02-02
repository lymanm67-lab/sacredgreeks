import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { 
  BookOpen, Cross, Users, Heart, Shield, ArrowRight, 
  CheckCircle2, Star, Calendar, MessageCircle 
} from "lucide-react";

const features = [
  {
    icon: Cross,
    title: "Faith-Centered Resources",
    description: "Daily devotionals and Bible studies designed specifically for Christians navigating Greek life membership.",
  },
  {
    icon: BookOpen,
    title: "P.R.O.O.F. Framework",
    description: "Our proprietary framework helps evaluate pledging, rituals, oaths, obscurity, and founders through a biblical lens.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with other Christians in fraternities and sororities who understand your unique journey.",
  },
  {
    icon: Shield,
    title: "Biblical Guidance",
    description: "Expert guidance on navigating Greek traditions while honoring your faith commitments.",
  },
];

const testimonials = [
  {
    quote: "Sacred Greeks helped me see that my faith and fraternity membership can coexist when approached biblically.",
    author: "Marcus T.",
    org: "Kappa Alpha Psi",
  },
  {
    quote: "The P.R.O.O.F. framework gave me the clarity I needed to make an informed decision about joining.",
    author: "Ashley R.",
    org: "Delta Sigma Theta",
  },
];

const stats = [
  { value: "10,000+", label: "Christians in Greek Life Served" },
  { value: "30+", label: "Daily Devotionals" },
  { value: "9", label: "Divine Nine Organizations Covered" },
  { value: "100%", label: "Free Core Features" },
];

export default function ChristianGreekLife() {
  return (
    <>
      <SEOHead
        title="Christian Greek Life App | Faith-Based Fraternity & Sorority Resources"
        description="The #1 app for Christians in Greek life. Daily devotionals, biblical guidance on rituals and oaths, P.R.O.O.F. framework, and community support for Christian fraternity and sorority members."
        keywords="Christian Greek life, Christian fraternity, Christian sorority, faith-based Greek organization, Christians in fraternities, Christians in sororities, Greek life and Christianity, Christian BGLO, faith fraternity sorority"
        structuredDataType="WebPage"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-b from-sacred/10 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sacred/10 text-sacred border border-sacred/20">
                <Cross className="w-4 h-4" />
                <span className="text-sm font-medium">Faith-Based Greek Life Resources</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Christian Greek Life:{' '}
                <span className="text-sacred">Faith & Fraternity United</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Navigate your Greek organization membership with confidence. Get biblical guidance, 
                daily devotionals, and connect with a community of Christians in fraternities and sororities.
              </p>
              
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

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-sacred">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Everything Christian Greeks Need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Purpose-built resources for Christians in fraternities and sororities who want to 
                honor God while participating in Greek life.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-sacred/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-sacred/10 flex items-center justify-center shrink-0">
                        <feature.icon className="w-6 h-6 text-sacred" />
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

        {/* What You'll Get Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                What Christian Greek Life Members Get
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Daily devotionals for Christian Greeks",
                  "P.R.O.O.F. framework evaluation tool",
                  "Biblical perspective on Greek rituals",
                  "Prayer journal & community prayer wall",
                  "Guidance on oaths and vows",
                  "Connect with Christian fraternity brothers",
                  "Resources for Christian sorority sisters",
                  "Anti-hazing biblical alternatives",
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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Christians in Greek Life Share Their Experience
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-muted/50">
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
            <h2 className="text-3xl font-bold mb-4">
              Ready to Honor God in Greek Life?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of Christians in fraternities and sororities who are navigating 
              Greek life with biblical wisdom.
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
