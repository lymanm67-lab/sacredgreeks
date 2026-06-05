import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import {
  HeartHandshake,
  Users,
  BookOpen,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Calendar,
  Award,
} from 'lucide-react';

const benefits = [
  {
    icon: BookOpen,
    title: 'Shared Liturgy & Devotion Library',
    description: 'Vetted prayer templates, devotion outlines, and ritual readings used by chaplains across NPHC, IFC, Panhellenic, and MGC.',
  },
  {
    icon: MessageCircle,
    title: 'Private Peer Cohort',
    description: 'Encrypted chaplain-only channel for case consults, prayer requests, and "how would you handle this?" moments.',
  },
  {
    icon: Calendar,
    title: 'Monthly Council Calls',
    description: 'Live calls with Dr. Lyman + guest pastors. Office hours for the hardest pastoral situations chapter chaplains face.',
  },
  {
    icon: Shield,
    title: 'Crisis Care Protocols',
    description: 'Step-by-step playbooks for hazing reports, mental-health crises, ritual concerns, and member discipline — biblical and trauma-informed.',
  },
  {
    icon: Award,
    title: 'Chaplain Certification Track',
    description: 'Complete the 6-module PROOF Chaplain training and earn a verifiable certificate to present to your chapter and nationals.',
  },
  {
    icon: Users,
    title: 'Cross-Chapter Network',
    description: 'A directory of vetted chaplains across organizations and campuses. Refer, collaborate, and learn from peers carrying the same load.',
  },
];

const whoFor = [
  'Active chapter chaplains (any Greek org, any campus)',
  'Members called to start a chaplain role where none exists',
  'Advisors, alumni, and pastors mentoring Greek members',
  'Campus ministers serving fraternities & sororities',
];

export default function ChaplainCouncil() {
  return (
    <div className="min-h-screen bg-[hsl(220,60%,6%)] text-white overflow-x-hidden">
      <SEOHead
        title="Chaplain Council | Sacred Greeks Spiritual Advisor Network"
        description="A free network for fraternity and sorority chaplains. Shared liturgy, peer cohort, monthly calls with Dr. Lyman, crisis care protocols, and chaplain certification."
        canonicalUrl="https://sacredgreekslife.com/chaplain-council"
      />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-amber-500/10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> New — Founding Cohort Open
          </Badge>
          <div className="w-20 h-20 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
            <HeartHandshake className="w-10 h-10 text-amber-400" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 break-words">
            The <span className="text-amber-400">Chaplain Council</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-3 break-words">
            A spiritual advisor network for fraternity &amp; sorority chaplains who refuse to lead alone.
          </p>
          <p className="text-base text-slate-400 max-w-2xl mx-auto mb-8 break-words">
            Shared liturgy, peer cohort, monthly council calls with Dr. Lyman, crisis-care protocols, and a
            verifiable chaplain certification. Free for the founding cohort.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/beta-signup">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold">
                Apply to the Council <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/chapter-kit">
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                See the Chaplain Toolkit
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-14 md:py-20">
        {/* Why */}
        <section className="mb-16 max-w-3xl mx-auto text-center">
          <p className="text-amber-400 font-semibold uppercase tracking-wider text-xs mb-2">Why a Council</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 break-words">
            Chapter chaplains carry weight nobody trained them for.
          </h2>
          <p className="text-slate-300 text-lg break-words">
            Mental-health calls at 2 AM. Members questioning the ritual. Hazing concerns nobody else will name.
            Pledges asking if they can stay Christian and stay in. Chaplains need brothers and sisters of their
            own — and a framework strong enough to lean on.
          </p>
        </section>

        {/* Benefits grid */}
        <section className="mb-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <Card key={b.title} className="bg-slate-900/60 border-slate-800 hover:border-amber-500/40 transition-all">
                  <CardContent className="p-6 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-amber-400" strokeWidth={2.5} />
                    </div>
                    <h3 className="font-semibold text-white mb-2 break-words">{b.title}</h3>
                    <p className="text-sm text-slate-400 break-words">{b.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Who it's for */}
        <section className="mb-16 grid gap-8 md:grid-cols-2 items-center">
          <div className="min-w-0">
            <p className="text-amber-400 font-semibold uppercase tracking-wider text-xs mb-2">Who It's For</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 break-words">
              Built for the people doing the spiritual work in Greek life.
            </h2>
            <p className="text-slate-300 mb-6 break-words">
              The Council is intentionally cross-organizational. We don't care what letters you wear — we care
              that you're carrying souls.
            </p>
          </div>
          <Card className="bg-slate-900/60 border-slate-800">
            <CardContent className="p-6 space-y-3">
              {whoFor.map((item) => (
                <div key={item} className="flex items-start gap-3 min-w-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-slate-200 break-words">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Distinction callout */}
        <Card className="bg-slate-900/60 border-slate-800 mb-16">
          <CardContent className="p-8 md:p-10">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-3">How we're different</Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 break-words">
              Not a recruitment council. Not an advisory board. A pastoral network.
            </h3>
            <p className="text-slate-300 break-words">
              Other Greek life advisor councils exist to grow chapters, run rush, and protect risk management.
              The Chaplain Council exists for one reason: to make sure no chapter chaplain has to shepherd
              their members alone, under-resourced, or off-script.
            </p>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <Card className="bg-gradient-to-br from-amber-500/15 via-slate-900/80 to-rose-500/10 border-amber-500/30">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 break-words">
              Founding cohort closes when we reach 50 chaplains.
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto break-words">
              Founding members get lifetime free access, vote on the council's direction, and shape the
              certification track. Apply in 2 minutes.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/beta-signup">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold">
                  Apply to the Founding Cohort <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                  Ask Dr. Lyman a Question
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
