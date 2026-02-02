import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award, 
  ArrowRight, 
  DollarSign,
  GraduationCap,
  Heart,
  Shield,
  CheckCircle2,
  Play
} from "lucide-react";
import { ListenButton } from "@/components/ListenButton";

// D9 Financial Literacy Programs
const d9Programs = [
  {
    org: "Phi Beta Sigma",
    program: "John Hope Franklin Financial Literacy Program",
    description: "Named after the renowned historian and Sigma brother, this program empowers communities with financial education rooted in economic justice.",
    focus: ["Youth financial education", "Credit building", "Homeownership"],
    color: "from-blue-600 to-blue-800"
  },
  {
    org: "Alpha Kappa Alpha",
    program: "Economic Advancement Foundation (EAF)",
    description: "AKA's signature initiative promoting economic security through financial literacy workshops and entrepreneurship support.",
    focus: ["Wealth building", "Business ownership", "Financial planning"],
    color: "from-pink-500 to-pink-700"
  },
  {
    org: "Delta Sigma Theta",
    program: "Financial Fortitude Initiative",
    description: "Comprehensive financial wellness programming addressing debt, savings, and generational wealth in African American communities.",
    focus: ["Debt elimination", "Emergency savings", "Investing basics"],
    color: "from-red-600 to-red-800"
  },
  {
    org: "Alpha Phi Alpha",
    program: "Go-to-High-School, Go-to-College",
    description: "While education-focused, includes financial aid navigation and scholarship guidance for college-bound students.",
    focus: ["Scholarship access", "FAFSA completion", "Education financing"],
    color: "from-yellow-500 to-amber-600"
  },
  {
    org: "Omega Psi Phi",
    program: "Uplift Program",
    description: "Community uplift through mentorship and financial literacy targeting young men and families.",
    focus: ["Male mentorship", "Family finances", "Career development"],
    color: "from-purple-600 to-purple-800"
  },
  {
    org: "Kappa Alpha Psi",
    program: "Kappa League",
    description: "Youth development including financial responsibility and career preparation for young achievers.",
    focus: ["Youth development", "Career prep", "Financial responsibility"],
    color: "from-red-500 to-red-700"
  },
  {
    org: "Zeta Phi Beta",
    program: "Z-HOPE (Zetas Helping Other People Excel)",
    description: "Holistic community service including financial wellness education and resource distribution.",
    focus: ["Community wellness", "Resource access", "Economic empowerment"],
    color: "from-blue-500 to-sky-600"
  },
  {
    org: "Sigma Gamma Rho",
    program: "Project Reassurance",
    description: "Supporting families through practical assistance including financial counseling and resource connection.",
    focus: ["Family support", "Financial counseling", "Crisis assistance"],
    color: "from-yellow-400 to-amber-500"
  },
  {
    org: "Iota Phi Theta",
    program: "Iota Youth Alliance",
    description: "Mentoring programs that include financial literacy and career pathway development.",
    focus: ["Youth mentorship", "Career pathways", "Life skills"],
    color: "from-amber-600 to-yellow-700"
  }
];

const biblicalPrinciples = [
  {
    scripture: "Proverbs 21:5",
    text: "The plans of the diligent lead surely to abundance...",
    principle: "Strategic Planning",
    application: "Good stewards plan chapter budgets and personal finances with intentionality."
  },
  {
    scripture: "Luke 16:10",
    text: "One who is faithful in a very little is also faithful in much...",
    principle: "Faithful Stewardship",
    application: "Managing dues wisely prepares you to manage greater resources."
  },
  {
    scripture: "Proverbs 13:22",
    text: "A good man leaves an inheritance to his children's children...",
    principle: "Generational Wealth",
    application: "Build wealth that extends beyond your lifetime—legacy over lifestyle."
  },
  {
    scripture: "Romans 13:8",
    text: "Owe no one anything, except to love each other...",
    principle: "Debt Freedom",
    application: "Pursue financial independence so you can give freely without bondage."
  }
];

const overviewText = `Welcome to Greek Financial Leadership—where your fraternal values meet biblical stewardship. 
As Greeks, we pledge to lead not just socially, but as responsible stewards of every resource entrusted to us. 
From Phi Beta Sigma's John Hope Franklin Financial Literacy Program to Alpha Kappa Alpha's Economic Advancement Foundation, 
our organizations have always championed economic empowerment. Sacred Greeks takes this further by grounding financial wisdom 
in biblical principles. Proverbs 21:5 teaches us that the plans of the diligent lead to abundance. 
This isn't just about managing dues—it's about building generational wealth while honoring God with your finances. 
Explore tools for budgeting, credit repair, debt freedom, and investment strategies designed specifically for Greek life. 
Your chapter taught you discipline. Now apply that same excellence to your financial future.`;

export default function GreekFinancialLeadership() {
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sacred/20 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-sacred/20 text-sacred border-sacred/30">
              <DollarSign className="w-3 h-3 mr-1" />
              Financial Stewardship for Greek Life
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Lead With Your{" "}
              <span className="bg-gradient-to-r from-sacred via-amber-400 to-sacred bg-clip-text text-transparent">
                Finances
              </span>
              {" "}Like You Lead Your Chapter
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              You pledged to be a leader. True leadership includes being a faithful steward of every resource—
              from chapter funds to your personal wealth. Ground your financial journey in biblical wisdom.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <ListenButton 
                text={overviewText}
                itemId="greek-financial-leadership-overview"
                variant="outline"
                className="border-sacred/50 text-sacred hover:bg-sacred/10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-sacred hover:bg-sacred/90 text-white">
                <Link to="/financial-stewardship">
                  Start Your Financial Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Link to="/auth">
                  Join Sacred Greeks Free
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-sacred">$1.3T</p>
              <p className="text-slate-400 text-sm">US Student Debt</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-emerald-400">9</p>
              <p className="text-slate-400 text-sm">D9 Financial Programs</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-amber-400">$50K+</p>
              <p className="text-slate-400 text-sm">Avg Lifetime Greek Costs</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-blue-400">10%</p>
              <p className="text-slate-400 text-sm">Biblical Tithe Priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* D9 Programs Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Users className="w-3 h-3 mr-1" />
              Divine Nine Financial Programs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Organization's Legacy of Economic Empowerment
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From Sigma's John Hope Franklin program to AKA's Economic Advancement Foundation—
              our organizations have always championed financial literacy. We build on that foundation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {d9Programs.map((program, index) => (
              <Card 
                key={program.org}
                className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all cursor-pointer ${
                  expandedProgram === index ? 'ring-2 ring-sacred' : ''
                }`}
                onClick={() => setExpandedProgram(expandedProgram === index ? null : index)}
              >
                <CardHeader className="pb-3">
                  <div className={`w-full h-2 rounded-full bg-gradient-to-r ${program.color} mb-3`} />
                  <CardTitle className="text-white text-lg">{program.org}</CardTitle>
                  <CardDescription className="text-sacred font-medium">
                    {program.program}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm mb-4">{program.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {program.focus.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Biblical Foundation */}
      <section className="py-16 lg:py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
              <BookOpen className="w-3 h-3 mr-1" />
              Biblical Foundation
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Scripture-Grounded Financial Wisdom
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              God's Word provides the ultimate framework for managing resources. 
              These principles transform how Greeks approach money.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {biblicalPrinciples.map((principle) => (
              <Card key={principle.scripture} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sacred/20">
                      <BookOpen className="w-5 h-5 text-sacred" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{principle.principle}</CardTitle>
                      <CardDescription className="text-sacred">{principle.scripture}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 italic mb-3">"{principle.text}"</p>
                  <p className="text-slate-400 text-sm">
                    <strong className="text-slate-300">For Greeks:</strong> {principle.application}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              Exclusive Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Financial Tools Built for Greek Life
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Credit Repair Hub", desc: "Dispute letters, bureau links, score tracking" },
              { icon: GraduationCap, title: "Student Defense Guide", desc: "Avoid debt traps targeting students" },
              { icon: DollarSign, title: "SISP Calculator", desc: "Sacred Greeks budgeting spreadsheet" },
              { icon: Award, title: "Debt Freedom Plan", desc: "Gazelle-intensity payoff strategies" }
            ].map((tool) => (
              <Card key={tool.title} className="bg-slate-800/50 border-slate-700 hover:border-sacred/50 transition-all">
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center mb-4">
                    <tool.icon className="w-6 h-6 text-sacred" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{tool.title}</h3>
                  <p className="text-slate-400 text-sm">{tool.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-sacred hover:bg-sacred/90">
              <Link to="/financial-stewardship">
                Access All Financial Tools
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-sacred/20 to-purple-500/20 border-sacred/30">
            <CardContent className="p-8 md:p-12 text-center">
              <Heart className="w-12 h-12 text-sacred mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Lead With Financial Excellence?
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Join thousands of Greeks who are transforming their financial future while 
                honoring God as faithful stewards. Your chapter taught you discipline—
                now apply it to your wealth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  <Link to="/auth">
                    Create Free Account
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/snapshot">
                    Take Faith Assessment First
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
            <Link to="/greek-leadership" className="hover:text-sacred transition-colors">
              Leadership & Service
            </Link>
            <Link to="/faith-and-greek-life" className="hover:text-sacred transition-colors">
              Faith & Greek Identity
            </Link>
            <Link to="/financial-stewardship" className="hover:text-sacred transition-colors">
              Financial Tools
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
