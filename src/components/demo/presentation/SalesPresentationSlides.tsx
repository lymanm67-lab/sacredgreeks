import { ReactNode } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  Shield, 
  DollarSign, 
  BookOpen, 
  Users, 
  Rocket,
  CheckCircle2,
  Target,
  Heart,
  FileText,
  Building2,
  Smartphone,
  Trophy,
  TrendingUp
} from 'lucide-react';

// Import slide images
import slideIntro from '@/assets/presentation/slide-intro.jpg';
import slideProblem from '@/assets/presentation/slide-problem.jpg';
import slideSnapshot from '@/assets/presentation/slide-snapshot.jpg';
import slideProof from '@/assets/presentation/slide-proof.jpg';
import slideFinancial from '@/assets/presentation/slide-financial.jpg';
import slideChaplain from '@/assets/presentation/slide-chaplain.jpg';
import slideCommunity from '@/assets/presentation/slide-community.jpg';
import slideGamification from '@/assets/presentation/slide-gamification.jpg';
import slideClose from '@/assets/presentation/slide-close.jpg';

export interface PresentationSlide {
  id: string;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  image?: string; // Background or hero image for the slide
  presenterNotes: string[];
  keyPoints: string[];
  talkingPoints?: string[];
  stats?: { label: string; value: string }[];
  actionItems?: string[];
  route?: string; // Optional route to navigate to for live demo
  duration?: string; // Suggested time for this slide
}

export const salesPresentationSlides: PresentationSlide[] = [
  {
    id: 'intro',
    title: 'Sacred Greeks',
    subtitle: 'Faith-First Resources for All Greek Life Members',
    icon: <Sparkles className="w-12 h-12 text-sacred" />,
    image: slideIntro,
    duration: '2-3 min',
    presenterNotes: [
      'Welcome and thank them for their time',
      'Establish credibility: Built by a Delta and ordained minister',
      'Key hook: The ONLY platform addressing faith + Greek life intersection',
      'Clarify: D9 focus, but resources apply to ALL Greek organizations'
    ],
    keyPoints: [
      'First-of-its-kind platform for Greek life',
      'D9 focused — but open to ALL Greek organizations',
      'Addresses the faith-Greek life tension directly',
      'Built by someone who understands both worlds'
    ],
    stats: [
      { label: 'D9 Chapters in Database', value: '750+' },
      { label: 'Unique Focus Area', value: 'Faith + Greek Life' },
      { label: 'Cost to Organizations', value: '100% Free' }
    ]
  },
  {
    id: 'problem',
    title: 'The Problem We Solve',
    subtitle: 'Why Greek Life Members Need This',
    icon: <AlertTriangle className="w-12 h-12 text-amber-500" />,
    image: slideProblem,
    duration: '3-4 min',
    presenterNotes: [
      'Paint the pain: Members face criticism from family, church, peers',
      'Financial crisis: Average D9 member spends $50K+ lifetime',
      'Chaplains are overwhelmed with no resources',
      'Ask: "How many of you have faced these questions?"'
    ],
    keyPoints: [
      '"Those rituals seem un-Christian" — Family criticism',
      '"You\'re paying for friends" — Church judgment',
      '$50,000+ lifetime costs — Financial burden',
      'Chaplains have no theological resources'
    ],
    talkingPoints: [
      'Members feel torn between faith and fraternity',
      'No biblical framework exists to address concerns',
      'Predatory credit targeting young Greeks',
      'Chapter chaplains struggle without support'
    ]
  },
  {
    id: 'faith-snapshot',
    title: 'Faith Snapshot Assessment',
    subtitle: 'Quick Engagement — Immediate Value',
    icon: <Target className="w-12 h-12 text-amber-500" />,
    image: slideSnapshot,
    duration: '3-4 min',
    route: '/snapshot',
    presenterNotes: [
      'DEMO: Walk through the 6-question assessment',
      'Show how it generates personalized archetypes',
      'Emphasize: Shareable results drive viral growth',
      'Perfect for chapter intake or orientation events'
    ],
    keyPoints: [
      '6 questions, 2-3 minutes to complete',
      'Generates personalized Faith Confidence Score',
      'Identifies archetype (e.g., "Apologetics Ready")',
      'Creates custom resource recommendations'
    ],
    actionItems: [
      'Consider using at new member intake',
      'Share link with chapter chaplains',
      'Use as conversation starter at events'
    ]
  },
  {
    id: 'proof-framework',
    title: 'P.R.O.O.F. Framework',
    subtitle: 'Biblical Responses to the 5 Most Common Criticisms',
    icon: <Shield className="w-12 h-12 text-purple-500" />,
    image: slideProof,
    duration: '5-6 min',
    route: '/proof-course',
    presenterNotes: [
      'This is the CORE differentiator',
      'Each letter addresses a specific criticism',
      'Leaders can finally equip members with answers',
      'DEMO: Show one lesson in detail'
    ],
    keyPoints: [
      'P — Pledge Process (Hazing concerns)',
      'R — Rituals (Religious objections)',
      'O — Oaths (Spiritual concerns)',
      'O — Obscurity/Secrecy (Transparency questions)',
      'F — Founders (Historical context)'
    ],
    talkingPoints: [
      'Each module has biblical backing + historical context',
      'Printable worksheets for personal study',
      'TTS audio for accessibility',
      'Progress tracking with gamification'
    ]
  },
  {
    id: 'financial-tools',
    title: 'Financial Stewardship Suite',
    subtitle: 'Addressing the $50K+ Lifetime Cost Reality',
    icon: <DollarSign className="w-12 h-12 text-emerald-500" />,
    image: slideFinancial,
    duration: '4-5 min',
    route: '/financial-stewardship',
    presenterNotes: [
      'Financial literacy gap is HUGE in young Greeks',
      'DEMO: Show the D9 Lifetime Cost Calculator',
      'Highlight: FCRA-compliant dispute letter generator',
      'The 10/15/10/65 plan is sticky content'
    ],
    keyPoints: [
      '10/15/10/65 Sacred Money Spending Plan',
      'D9 Lifetime Cost Calculator with real data',
      'FCRA-compliant credit dispute letter generator',
      'Student Financial Defense against predatory tactics'
    ],
    stats: [
      { label: 'Average D9 Lifetime Cost', value: '$50,000+' },
      { label: 'Spending Plan Categories', value: '4' },
      { label: 'Debt Strategies', value: '3 Methods' }
    ]
  },
  {
    id: 'chaplain-toolkit',
    title: 'Chapter Chaplain Toolkit',
    subtitle: 'On-Demand Resources for Spiritual Leaders',
    icon: <BookOpen className="w-12 h-12 text-blue-500" />,
    image: slideChaplain,
    duration: '3-4 min',
    route: '/chaplain-toolkit',
    presenterNotes: [
      'Chaplains are often untrained and overwhelmed',
      'DEMO: Generate a devotional PDF on-the-fly',
      'Meeting guides, theological resources, prayer materials',
      'Reduces chaplain workload INSTANTLY'
    ],
    keyPoints: [
      'PDF generation for devotionals & meeting guides',
      'Pre-written prayers for chapter meetings',
      'Theological resources for tough questions',
      'Works offline via PWA'
    ],
    actionItems: [
      'Share with your chapter chaplain today',
      'Use devotionals at next chapter meeting',
      'Generate resources for special events'
    ]
  },
  {
    id: 'community',
    title: 'Community & Retention Features',
    subtitle: 'Building Cross-Chapter Fellowship',
    icon: <Users className="w-12 h-12 text-fuchsia-500" />,
    image: slideCommunity,
    duration: '4-5 min',
    route: '/d9-business-directory',
    presenterNotes: [
      'D9 Business Directory showcases faith-first entrepreneurs',
      'Prayer Wall builds cross-chapter accountability',
      'Member Network for authentic connections',
      'DEMO: Show the business directory and submission form'
    ],
    keyPoints: [
      'D9 Business Directory — Faith-first entrepreneurs',
      'Free submission portal for organic growth',
      'Prayer Wall for community support',
      'Member Network for cross-chapter fellowship'
    ],
    stats: [
      { label: 'Featured Businesses', value: '30+' },
      { label: 'Prayer Requests Supported', value: 'Unlimited' },
      { label: 'Member Connections', value: 'Growing Daily' }
    ]
  },
  {
    id: 'engagement',
    title: 'Gamification & Engagement',
    subtitle: 'Driving Consistent Usage',
    icon: <Trophy className="w-12 h-12 text-amber-500" />,
    image: slideGamification,
    duration: '2-3 min',
    route: '/dashboard',
    presenterNotes: [
      'Badges, streaks, and certificates drive engagement',
      'Points system with level progression',
      'Shareable certificates for social proof',
      'Daily challenges keep users coming back'
    ],
    keyPoints: [
      'Achievement badges for course completion',
      'Daily streaks and challenges',
      'Printable certificates for milestones',
      'Leaderboard and points system'
    ],
    talkingPoints: [
      '100-point level intervals',
      '880+ total points available',
      'Master Certificate at 100% completion',
      'Social sharing built-in'
    ]
  },
  {
    id: 'close',
    title: 'Why Partner With Sacred Greeks?',
    subtitle: 'Next Steps for Your Organization',
    icon: <Rocket className="w-12 h-12 text-sacred" />,
    image: slideClose,
    duration: '3-4 min',
    presenterNotes: [
      'Summarize the value proposition',
      'Emphasize: 100% FREE — no budget approval needed',
      'PWA works on any device — no app store friction',
      'Ask for specific next steps'
    ],
    keyPoints: [
      '100% Free — No budget approval needed',
      'PWA — Works on any device, no app store',
      'Instant access — Members can start today',
      'Growing community of 750+ chapters'
    ],
    stats: [
      { label: 'Cost', value: '$0' },
      { label: 'Chapters in Database', value: '750+' },
      { label: 'Time to Start', value: 'Instant' }
    ],
    actionItems: [
      'Share link with your chapter leaders',
      'Add to new member orientation',
      'Include in chaplain training',
      'Connect with us for speaking opportunities'
    ]
  }
];

export const getPresentationDuration = () => {
  const slides = salesPresentationSlides;
  const durations = slides.map(s => {
    if (!s.duration) return 3;
    const match = s.duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 3;
  });
  const total = durations.reduce((a, b) => a + b, 0);
  return `${total}-${total + slides.length * 2} minutes`;
};
