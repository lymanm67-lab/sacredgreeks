import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Heart, 
  BookOpen, 
  Award, 
  ArrowRight, 
  Crown,
  HandHeart,
  Lightbulb,
  Shield,
  Star
} from "lucide-react";
import { ListenButton } from "@/components/ListenButton";

const leadershipPillars = [
  {
    icon: Crown,
    title: "Servant Leadership",
    scripture: "Mark 10:43-44",
    quote: "Whoever wants to become great among you must be your servant.",
    greekConnection: "Chapter presidents, committee chairs, and line brothers/sisters are called to lead by serving—not by title alone.",
    practices: ["Mentoring new members", "Supporting struggling brothers/sisters", "Leading community service"]
  },
  {
    icon: HandHeart,
    title: "Community Impact",
    scripture: "Galatians 6:10",
    quote: "Let us do good to all people, especially to those who belong to the family of believers.",
    greekConnection: "Our national programs exist to uplift communities. From voter registration to feeding the hungry, we embody service.",
    practices: ["Chapter philanthropy", "Voter registration drives", "Youth mentorship programs"]
  },
  {
    icon: Lightbulb,
    title: "Scholarship & Wisdom",
    scripture: "Proverbs 4:7",
    quote: "The beginning of wisdom is this: Get wisdom. Though it cost all you have, get understanding.",
    greekConnection: "Academic excellence isn't just a requirement—it's a calling. We pursue knowledge to serve better.",
    practices: ["Study groups", "Academic accountability", "Continuing education"]
  },
  {
    icon: Shield,
    title: "Moral Courage",
    scripture: "Joshua 1:9",
    quote: "Be strong and courageous. Do not be afraid... for the Lord your God will be with you.",
    greekConnection: "Standing for what's right—even when unpopular. Addressing hazing, misconduct, and injustice with conviction.",
    practices: ["Anti-hazing advocacy", "Accountability conversations", "Ethical decision-making"]
  }
];

const d9ServicePrograms = [
  { org: "Alpha Phi Alpha", program: "Go-to-High-School, Go-to-College", impact: "Millions of students mentored" },
  { org: "Alpha Kappa Alpha", program: "AKA HBCU Impact Day", impact: "HBCU support and scholarships" },
  { org: "Kappa Alpha Psi", program: "Kappa League", impact: "Youth leadership development" },
  { org: "Omega Psi Phi", program: "Talent Hunt", impact: "Discovering and nurturing talent" },
  { org: "Delta Sigma Theta", program: "Delta Days at the Capitol", impact: "Policy advocacy and civic engagement" },
  { org: "Phi Beta Sigma", program: "Sigma Beta Club", impact: "Mentoring young men of color" },
  { org: "Zeta Phi Beta", program: "Z-HOPE", impact: "Holistic community wellness" },
  { org: "Sigma Gamma Rho", program: "Project Mwanamugimu", impact: "Global maternal health" },
  { org: "Iota Phi Theta", program: "NAACP ACT-SO", impact: "Academic and artistic excellence" }
];

const overviewText = `Welcome to Greek Leadership through a biblical lens. When you crossed those burning sands 
or walked through those ivy doors, you committed to more than social connection—you committed to servant leadership. 
Mark chapter 10 verse 43 reminds us: whoever wants to become great must first become a servant. 
This is the heart of Greek leadership. Our Divine Nine organizations have centuries of combined service—
from Alpha Phi Alpha's Go-to-High-School program to Delta Sigma Theta's days at the Capitol. 
Sacred Greeks helps you lead with excellence by grounding your service in Scripture. 
Whether you're a chapter president, committee chair, or simply a dedicated member, 
your leadership matters. Let faith be the foundation of your fraternal journey.`;

export default function GreekLeadership() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-sacred/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Crown className="w-3 h-3 mr-1" />
              Leadership & Service
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Lead Like{" "}
              <span className="bg-gradient-to-r from-purple-400 via-sacred to-purple-400 bg-clip-text text-transparent">
                Christ
              </span>
              , Serve Like a{" "}
              <span className="bg-gradient-to-r from-sacred via-amber-400 to-sacred bg-clip-text text-transparent">
                Greek
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              You pledged to lead. But true leadership isn't about titles—it's about service. 
              Ground your Greek leadership in the ultimate servant leader: Jesus Christ.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ListenButton 
                text={overviewText}
                itemId="greek-leadership-overview"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-sacred hover:bg-sacred/90 text-white">
                <Link to="/proof-course">
                  Start P.R.O.O.F. Course
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Link to="/auth">
                  Join Sacred Greeks
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Pillars */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sacred/20 text-sacred border-sacred/30">
              <Star className="w-3 h-3 mr-1" />
              Four Pillars of Greek Leadership
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Biblical Foundations for Fraternal Excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {leadershipPillars.map((pillar) => (
              <Card key={pillar.title} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-500/20">
                      <pillar.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{pillar.title}</CardTitle>
                      <CardDescription className="text-sacred">{pillar.scripture}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 italic">"{pillar.quote}"</p>
                  <p className="text-slate-400 text-sm">{pillar.greekConnection}</p>
                  <div className="flex flex-wrap gap-2">
                    {pillar.practices.map((practice) => (
                      <Badge key={practice} variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {practice}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* D9 Service Programs */}
      <section className="py-16 lg:py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              <Heart className="w-3 h-3 mr-1" />
              Legacy of Service
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Divine Nine National Service Programs
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our organizations have served communities for over a century. 
              These signature programs represent our collective commitment to uplift.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {d9ServicePrograms.map((item) => (
              <Card key={item.org} className="bg-slate-800/30 border-slate-700">
                <CardContent className="p-4">
                  <p className="font-semibold text-white text-sm mb-1">{item.org}</p>
                  <p className="text-sacred text-sm mb-2">{item.program}</p>
                  <p className="text-slate-400 text-xs">{item.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-purple-500/20 to-sacred/20 border-purple-500/30">
            <CardContent className="p-8 md:p-12 text-center">
              <Crown className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Lead With Purpose?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Discover how to integrate your faith with your fraternal calling. 
                The P.R.O.O.F. framework will transform how you lead.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  <Link to="/auth">
                    Join Sacred Greeks
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/snapshot">
                    Take Faith Assessment
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-8 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <Link to="/greek-financial-leadership" className="hover:text-sacred transition-colors">
              Financial Stewardship
            </Link>
            <Link to="/faith-and-greek-life" className="hover:text-sacred transition-colors">
              Faith & Greek Identity
            </Link>
            <Link to="/proof-course" className="hover:text-sacred transition-colors">
              P.R.O.O.F. Course
            </Link>
            <Link to="/auth" className="hover:text-sacred transition-colors">
              Join Sacred Greeks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
