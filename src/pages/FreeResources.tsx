import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import {
  FileDown,
  Sparkles,
  BookOpen,
  Shield,
  HeartHandshake,
  Scroll,
  Users,
  GraduationCap,
  Flame,
  ArrowRight,
  Compass,
  PenTool,
} from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  icon: React.ElementType;
  tint: string;
  href: string;
  external?: boolean;
  badge?: string;
}

const startHere: Resource[] = [
  {
    title: 'Faith Snapshot Assessment',
    description: '5-minute spiritual diagnostic that maps your faith + Greek life tension. Get a personalized PROOF plan.',
    icon: Compass,
    tint: 'amber',
    href: '/snapshot',
    badge: 'Most Popular',
  },
  {
    title: 'P.R.O.O.F. Framework Guide',
    description: 'The 5-step framework Christians use to evaluate oaths, rituals, and chapter activities biblically.',
    icon: Shield,
    tint: 'emerald',
    href: '/proof-framework',
    badge: 'Flagship',
  },
  {
    title: 'Chapter Chaplain Toolkit',
    description: 'Free starter kit for chaplains: prayer templates, devotion outlines, crisis-care scripts.',
    icon: HeartHandshake,
    tint: 'rose',
    href: '/chapter-kit',
  },
];

const guides: Resource[] = [
  {
    title: 'Ancient Guilds vs. Greek Orgs (PDF)',
    description: 'One-page biblical comparison of 1st-century guilds to modern fraternities & sororities.',
    icon: Scroll,
    tint: 'amber',
    href: '/chapter-kit',
  },
  {
    title: 'Oaths & Rituals Discernment Guide',
    description: 'How to read your ritual through scripture without panic or compromise.',
    icon: BookOpen,
    tint: 'blue',
    href: '/oaths',
  },
  {
    title: 'Anti-Hazing Christian Resource',
    description: 'Biblical case against hazing + practical scripts to push back in your chapter.',
    icon: Shield,
    tint: 'rose',
    href: '/anti-hazing',
  },
  {
    title: 'Biblical Guides Library',
    description: 'Scripture-backed mini-guides on identity, leadership, accountability, and sexual integrity.',
    icon: BookOpen,
    tint: 'emerald',
    href: '/biblical-guides',
  },
  {
    title: 'Should I Leave My Fraternity?',
    description: 'Decision framework for Christians wrestling with whether to stay, reform, or walk away.',
    icon: PenTool,
    tint: 'blue',
    href: '/should-i-leave-my-fraternity',
  },
  {
    title: 'Is Greek Life a Sin?',
    description: 'Honest, pastoral answer to the question every Christian Greek eventually asks.',
    icon: Flame,
    tint: 'amber',
    href: '/is-greek-life-a-sin',
  },
];

const community: Resource[] = [
  {
    title: 'Daily Devotionals',
    description: 'Free daily Scripture reflections written for Greek life Christians.',
    icon: BookOpen,
    tint: 'emerald',
    href: '/devotional',
  },
  {
    title: 'Prayer Wall',
    description: 'Anonymous prayer community for fraternity & sorority members.',
    icon: HeartHandshake,
    tint: 'rose',
    href: '/prayer-wall',
  },
  {
    title: 'Ask Dr. Lyman',
    description: 'Submit a question and get a pastoral, scripture-grounded response.',
    icon: GraduationCap,
    tint: 'blue',
    href: '/ask-dr-lyman',
  },
  {
    title: 'Healing Resources',
    description: 'For members carrying hazing trauma, ritual confusion, or church hurt.',
    icon: HeartHandshake,
    tint: 'rose',
    href: '/healing-resources',
  },
];

const tintMap: Record<string, { bg: string; text: string; border: string }> = {
  amber: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  emerald: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  rose: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30' },
  blue: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
};

function ResourceCard({ resource }: { resource: Resource }) {
  const tint = tintMap[resource.tint] ?? tintMap.amber;
  const Icon = resource.icon;
  const card = (
    <Card className="group h-full bg-slate-900/60 border-slate-800 hover:border-amber-500/40 transition-all hover:-translate-y-0.5">
      <CardContent className="p-5 flex flex-col h-full min-w-0">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-11 h-11 rounded-xl ${tint.bg} ${tint.border} border flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${tint.text}`} strokeWidth={2.5} />
          </div>
          {resource.badge && (
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 ml-auto">{resource.badge}</Badge>
          )}
        </div>
        <h3 className="font-semibold text-white mb-1.5 break-words">{resource.title}</h3>
        <p className="text-sm text-slate-400 break-words flex-1">{resource.description}</p>
        <div className="flex items-center gap-1.5 mt-4 text-amber-400 text-sm font-medium group-hover:gap-2.5 transition-all">
          Open <ArrowRight className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
  return resource.external ? (
    <a href={resource.href} target="_blank" rel="noreferrer" className="block h-full">{card}</a>
  ) : (
    <Link to={resource.href} className="block h-full">{card}</Link>
  );
}

function Section({ title, eyebrow, resources }: { title: string; eyebrow?: string; resources: Resource[] }) {
  return (
    <section className="mb-14">
      {eyebrow && (
        <p className="text-amber-400 font-semibold uppercase tracking-wider text-xs mb-2">{eyebrow}</p>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 break-words">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => <ResourceCard key={r.title} resource={r} />)}
      </div>
    </section>
  );
}

export default function FreeResources() {
  return (
    <div className="min-h-screen bg-[hsl(220,60%,6%)] text-white overflow-x-hidden">
      <SEOHead
        title="Free Christian Greek Life Resources | Sacred Greeks"
        description="Free downloads, guides, and tools for Christians in fraternities and sororities. PROOF framework, chaplain toolkit, oath discernment, devotionals — 100% free."
      />

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-blue-500/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> 100% Free Forever
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 break-words">
            Free Christian Resources for <span className="text-amber-400">Fraternities &amp; Sororities</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mb-6 break-words">
            Every guide, framework, and tool we've built for Christians navigating Greek life — gathered in one place.
            Downloadable. Shareable. No catch.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/snapshot">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold">
                Start with the Faith Snapshot <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/proof-framework">
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                Explore the P.R.O.O.F. Framework
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Start Here */}
        <div className="mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <Flame className="w-5 h-5 text-amber-400" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-amber-400 font-semibold uppercase tracking-wider text-xs">Start Here</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Our most-shared, most-recommended tools</h2>
          </div>
        </div>
        <p className="text-slate-400 mb-6 max-w-3xl">
          Designed to meet you exactly where you are — whether you're discerning your ritual, leading a chapter
          devotion, or carrying questions you can't ask out loud.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {startHere.map((r) => <ResourceCard key={r.title} resource={r} />)}
        </div>

        <Section eyebrow="Guides & PDFs" title="Biblical Guides &amp; Downloads" resources={guides} />
        <Section eyebrow="Community" title="Live Tools &amp; Community" resources={community} />

        {/* Footer CTA */}
        <Card className="bg-gradient-to-br from-amber-500/10 via-slate-900/80 to-blue-500/10 border-amber-500/30 mt-8">
          <CardContent className="p-8 md:p-10 text-center">
            <Users className="w-10 h-10 text-amber-400 mx-auto mb-4" strokeWidth={2.5} />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 break-words">
              Bring Sacred Greeks to your chapter
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto break-words">
              Want chaplain training, an advisor council, or a full PROOF rollout for your members? Partner with us — pilot is free.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/partner">
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold">
                  See Partnership Options <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/chaplain-council">
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                  Join the Chaplain Council
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
