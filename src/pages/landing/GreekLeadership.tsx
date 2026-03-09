import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
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
  Star,
  GraduationCap,
  Compass,
  UserPlus,
  CheckCircle2,
  Layers,
  MessageSquare
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

const academyFeatures = [
  {
    icon: Layers,
    title: "11 Training Tracks",
    description: "From Servant Leadership to Financial Stewardship — structured courses with progress tracking."
  },
  {
    icon: Users,
    title: "Private Ministry Groups",
    description: "Create invite-only groups for your youth ministry, Bible study, or chapter members."
  },
  {
    icon: Award,
    title: "4-Tier Leadership Progression",
    description: "Explorer → Mentor → Shepherd → Kingdom Builder. Earn recognition as you grow."
  },
  {
    icon: MessageSquare,
    title: "Mentor Dashboard",
    description: "Track student engagement, manage groups, and share resources from one hub."
  }
];

const overviewText = `Welcome to Greek Leadership through a biblical lens. When you crossed those burning sands 
or walked through those ivy doors, you committed to more than social connection—you committed to servant leadership. 
Mark chapter 10 verse 43 reminds us: whoever wants to become great must first become a servant. 
The Sacred Leaders Academy is our platform built for pastors, youth leaders, and chapter mentors 
to train the next generation of faith-driven leaders. With 11 training tracks, private ministry groups, 
and a 4-tier leadership progression, you have everything you need to equip your people. 
Whether you're a chapter president, youth pastor, or campus ministry leader, 
Sacred Greeks helps you lead with excellence by grounding your service in Scripture.`;

export default function GreekLeadership() {
  return (
    <>
      <SEOHead 
        title="Greek Leadership & Sacred Leaders Academy | Train Faith-Driven Leaders"
        description="Equip pastors, youth leaders, and chapter mentors with the Sacred Leaders Academy. 11 training tracks, private ministry groups, 4-tier leadership progression, and mentor dashboard — all free. Built for Divine Nine and Greek organizations."
        keywords="Greek leadership, Sacred Leaders Academy, youth leader training, pastor resources, Divine Nine leadership, servant leadership, Christian Greek life, mentor dashboard, ministry groups, faith-based leadership training"
        type="website"
        structuredDataType="WebPage"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Greek Leadership', url: '/greek-leadership' }
        ]}
      />
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
                <Link to="/leadership-academy">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Enter Sacred Leaders Academy
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

      {/* Sacred Leaders Academy Feature Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-sacred/20 text-sacred border-sacred/30">
              <GraduationCap className="w-3 h-3 mr-1" />
              Sacred Leaders Academy
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Train the Next Generation of Leaders
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built for pastors, youth leaders, and chapter mentors — a complete platform 
              to equip, track, and grow faith-driven leaders.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {academyFeatures.map((feature) => (
              <Card key={feature.title} className="bg-slate-800/50 border-slate-700 hover:border-sacred/50 transition-all text-center">
                <CardContent className="pt-6 pb-6">
                  <div className="p-3 rounded-xl bg-sacred/20 w-fit mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-sacred" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Leadership Tiers */}
          <Card className="max-w-4xl mx-auto bg-slate-800/30 border-slate-700">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Leadership Progression System</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Explorer", icon: Compass, points: "0+", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                  { name: "Mentor", icon: Users, points: "200+", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
                  { name: "Shepherd", icon: Heart, points: "500+", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
                  { name: "Kingdom Builder", icon: Crown, points: "1000+", color: "text-sacred", bg: "bg-sacred/10 border-sacred/20" },
                ].map((tier) => (
                  <div key={tier.name} className={`p-4 rounded-xl border text-center ${tier.bg}`}>
                    <tier.icon className={`w-8 h-8 mx-auto mb-2 ${tier.color}`} />
                    <p className="font-semibold text-white text-sm">{tier.name}</p>
                    <p className="text-xs text-slate-400">{tier.points} pts</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For Pastors & Youth Leaders CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-purple-500/15 to-slate-800/50 border-purple-500/30">
              <CardContent className="p-6 md:p-8">
                <div className="p-3 rounded-xl bg-purple-500/20 w-fit mb-4">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">For Pastors & Chaplains</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Create private ministry groups for your congregation. Assign training tracks, 
                  monitor progress, and mentor leaders — all from your dashboard.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Create private invite-only groups", "Track member engagement", "Share curated training paths", "Built-in accountability tools"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Link to="/mentor-dashboard">
                    Open Mentor Dashboard
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-sacred/15 to-slate-800/50 border-sacred/30">
              <CardContent className="p-6 md:p-8">
                <div className="p-3 rounded-xl bg-sacred/20 w-fit mb-4">
                  <UserPlus className="w-6 h-6 text-sacred" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">For Youth Leaders</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Equip young Greek leaders with structured faith-based training. 
                  Share an invite code and your group is ready in seconds.
                </p>
                <ul className="space-y-2 mb-6">
                  {["11 structured training courses", "Mobile-first — works on any device", "Gamified progression keeps students engaged", "Free — no cost for you or your members"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-sacred shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild size="sm" className="bg-sacred hover:bg-sacred/90 text-white">
                  <Link to="/leadership-academy">
                    Explore the Academy
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
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
              <GraduationCap className="w-12 h-12 text-sacred mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Equip Your Leaders?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                The Sacred Leaders Academy gives you everything you need to train, track, and 
                grow faith-driven leaders in your chapter, church, or youth group.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  <Link to="/leadership-academy">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Enter the Academy
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/mentor-dashboard">
                    Open Mentor Dashboard
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
            <Link to="/leadership-academy" className="hover:text-sacred transition-colors">
              Sacred Leaders Academy
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
