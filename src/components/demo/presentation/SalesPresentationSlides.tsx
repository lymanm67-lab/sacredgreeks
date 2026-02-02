import { ReactNode } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  Shield, 
  DollarSign, 
  BookOpen, 
  Users, 
  Rocket,
  Target,
  Trophy,
  GraduationCap,
  HandHeart,
  ScrollText,
  Lock,
  History,
  Mic2,
  UserCircle
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
import slideQA from '@/assets/presentation/slide-qa.jpg';

export interface PresentationSlide {
  id: string;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  image?: string; // Background or hero image for the slide
  showQRCode?: boolean; // Show QR code for mobile download
  presenterNotes: string[];
  keyPoints: string[];
  talkingPoints?: string[];
  stats?: { label: string; value: string }[];
  actionItems?: string[];
  route?: string; // Optional route to navigate to for live demo
  duration?: string; // Suggested time for this slide
}

export const salesPresentationSlides: PresentationSlide[] = [
  // ============ INTRODUCTION (10 min) ============
  {
    id: 'intro',
    title: 'Sacred Greeks',
    subtitle: 'Faith-First Resources for All Greek Life Members',
    icon: <Sparkles className="w-12 h-12 text-sacred" />,
    image: slideIntro,
    duration: '3-4 min',
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
    id: 'creator',
    title: 'Meet the Creator',
    subtitle: 'Dr. Lyman Montgomery — Scholar, Minister, Delta',
    icon: <UserCircle className="w-12 h-12 text-blue-500" />,
    duration: '5-6 min',
    presenterNotes: [
      'Introduce Dr. Lyman Montgomery — ordained minister AND Delta member',
      'Mention his book: "Sacred Not Sinful: A Biblical Response to the Black Greek Letter Organization Debate"',
      'Podcast: Sacred Greeks Podcast available on all platforms',
      'Emphasize: He understands BOTH the church critique AND the Greek experience'
    ],
    keyPoints: [
      'Ordained minister with theological training',
      'Initiated member of Delta Sigma Theta Sorority, Inc.',
      'Author of "Sacred Not Sinful" — the definitive biblical response',
      'Host of the Sacred Greeks Podcast'
    ],
    talkingPoints: [
      'Decades of ministry experience',
      'Walked the same journey as many of your members',
      'Created this platform because resources didn\'t exist',
      'Mission: Biblical clarity without condemnation'
    ],
    stats: [
      { label: 'Years in Ministry', value: '20+' },
      { label: 'Podcast Episodes', value: '50+' },
      { label: 'Speaking Engagements', value: 'Nationwide' }
    ],
    actionItems: [
      'Follow the Sacred Greeks Podcast',
      'Order "Sacred Not Sinful" for your chapter library',
      'Invite Dr. Montgomery to speak at your event'
    ]
  },

  // ============ THE PROBLEM (15 min) ============
  {
    id: 'problem',
    title: 'The Problem We Solve',
    subtitle: 'Why Greek Life Members Need This',
    icon: <AlertTriangle className="w-12 h-12 text-amber-500" />,
    image: slideProblem,
    duration: '4-5 min',
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

  // ============ P.R.O.O.F. DEEP DIVE (30 min) ============
  {
    id: 'proof-overview',
    title: 'P.R.O.O.F. Framework',
    subtitle: 'Biblical Responses to the 5 Most Common Criticisms',
    icon: <Shield className="w-12 h-12 text-purple-500" />,
    image: slideProof,
    duration: '3-4 min',
    route: '/proof-course',
    presenterNotes: [
      'This is the CORE differentiator of Sacred Greeks',
      'Each letter addresses a specific criticism members face',
      'Leaders can finally equip members with answers',
      'We\'ll dive into each letter in the next slides'
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
    id: 'proof-pledge',
    title: 'P — Pledge Process',
    subtitle: 'Addressing Hazing & Initiation Concerns',
    icon: <GraduationCap className="w-12 h-12 text-blue-500" />,
    duration: '5-6 min',
    presenterNotes: [
      'The most common criticism: "Pledging is hazing"',
      'Biblical parallel: 1st-century guilds had apprenticeship periods',
      'Jesus Himself was a "tekton" (craftsman) — likely guild member',
      'Differentiate: Structured formation ≠ abusive hazing'
    ],
    keyPoints: [
      '"Is pledging the same as hazing?" — Common church question',
      'Biblical model: Apprenticeship existed in early Christianity',
      'Jesus (tekton) and Paul (tentmaker) operated in guild systems',
      'Formation through discipline is biblical (Proverbs 22:6)'
    ],
    talkingPoints: [
      '1st-century trade guilds had structured initiation',
      'Apprentice → Journeyman → Master progression',
      'The church has catechumenates and discipleship processes',
      'The issue is abuse, not the concept of formation itself'
    ],
    stats: [
      { label: 'Biblical References', value: '12+' },
      { label: 'Historical Parallels', value: '5 Eras' },
      { label: 'Study Time', value: '~20 min' }
    ]
  },
  {
    id: 'proof-rituals',
    title: 'R — Rituals',
    subtitle: 'Responding to "Those Rituals Are Pagan" Criticism',
    icon: <HandHeart className="w-12 h-12 text-purple-500" />,
    duration: '5-6 min',
    presenterNotes: [
      'Address the "paganism" accusation directly',
      'Key point: The church itself has rituals (baptism, communion)',
      'Historical context: Medieval guilds had Christian rituals',
      'Ask: What makes a ritual sacred vs. secular?'
    ],
    keyPoints: [
      '"Those rituals look like worship" — Church criticism',
      'Biblical truth: Ritual ≠ worship automatically',
      'The church has rituals: baptism, communion, ordination',
      'Question: Is the ritual glorifying God or replacing Him?'
    ],
    talkingPoints: [
      'Ritual comes from Latin "ritus" — a practice or custom',
      'Every organization has rituals: government, military, sports',
      'The intent and object of devotion matters',
      'Greek rituals often emphasize brotherhood, not deity worship'
    ],
    stats: [
      { label: 'Common Rituals Analyzed', value: '8+' },
      { label: 'Biblical Comparisons', value: '10+' },
      { label: 'Historical Sources', value: '15+' }
    ]
  },
  {
    id: 'proof-oaths',
    title: 'O — Oaths',
    subtitle: 'What Does the Bible Actually Say About Oaths?',
    icon: <ScrollText className="w-12 h-12 text-orange-500" />,
    duration: '5-6 min',
    presenterNotes: [
      'Address Matthew 5:34 — "Do not swear at all"',
      'Context: Jesus was condemning flippant, deceptive oaths',
      'Biblical examples: Paul made vows (Acts 18:18), God swears (Hebrews 6:13)',
      'The issue is deception, not commitment itself'
    ],
    keyPoints: [
      '"The Bible says not to swear oaths" — Common objection',
      'Context: Jesus condemned manipulative, deceptive oaths',
      'Paul took vows (Acts 18:18, 21:23-24)',
      'God Himself swears by His own name (Hebrews 6:13-17)'
    ],
    talkingPoints: [
      'Jewish oath tradition included loopholes for deception',
      'Jesus condemned the system of evasive swearing',
      'Marriage vows, court oaths, citizenship oaths are common',
      'A commitment to service and brotherhood aligns with Scripture'
    ],
    stats: [
      { label: 'Scripture References', value: '15+' },
      { label: 'Historical Context Docs', value: '8+' },
      { label: 'Theological Sources', value: '10+' }
    ]
  },
  {
    id: 'proof-obscurity',
    title: 'O — Obscurity/Secrecy',
    subtitle: 'Addressing "Secret Society" Accusations',
    icon: <Lock className="w-12 h-12 text-emerald-500" />,
    duration: '5-6 min',
    presenterNotes: [
      'The "secret society" label is the most dramatic criticism',
      'Key distinction: Confidentiality ≠ Conspiracy',
      'Biblical parallel: Jesus had "mystery" teachings for disciples',
      'Every organization has private information (your job, family)'
    ],
    keyPoints: [
      '"Greek organizations are secret societies" — Accusation',
      'Truth: Confidentiality is normal (medical, legal, family)',
      'Jesus had teachings for disciples vs. crowds (Mark 4:10-12)',
      'Early church met in secret due to persecution'
    ],
    talkingPoints: [
      'The word "mystery" (mysterion) is used 27x in the NT',
      'Secret ≠ evil; some things are sacred and protected',
      'Organizational grips/signs are no different than security clearances',
      'The real question: Is the organization hiding sin?'
    ],
    stats: [
      { label: 'Biblical "Mystery" References', value: '27' },
      { label: 'Historical Parallels', value: '6 Eras' },
      { label: 'Case Studies', value: '5+' }
    ]
  },
  {
    id: 'proof-founders',
    title: 'F — Founders',
    subtitle: 'Historical Context & Christian Heritage',
    icon: <History className="w-12 h-12 text-red-500" />,
    duration: '5-6 min',
    presenterNotes: [
      'Many D9 founders were active Christians',
      'Organizations were born out of necessity: mutual aid, survival',
      'Insurance companies refused to cover Black Americans',
      'Fraternities provided burial benefits, financial support, community'
    ],
    keyPoints: [
      'Many D9 founders were ministers, church leaders, Christians',
      'Mutual aid societies arose from discriminatory practices',
      'Organizations provided insurance, burial funds, education',
      'The mission was survival and uplift, not occultism'
    ],
    talkingPoints: [
      'Race-rated insurance premiums made coverage unaffordable',
      'Burial societies and mutual aid organizations filled the gap',
      'Greek-letter organizations carried on this legacy of service',
      'Understanding history reframes the narrative'
    ],
    stats: [
      { label: 'D9 Organizations', value: '9' },
      { label: 'Years of History', value: '100+' },
      { label: 'Members Worldwide', value: '2.5M+' }
    ],
    actionItems: [
      'Download the Economic History PDF',
      'Share founder stories with your chapter',
      'Host a history education session'
    ]
  },

  // ============ FEATURES (20 min) ============
  {
    id: 'faith-snapshot',
    title: 'Faith Snapshot Assessment',
    subtitle: 'Quick Engagement — Immediate Value',
    icon: <Target className="w-12 h-12 text-amber-500" />,
    image: slideSnapshot,
    duration: '4-5 min',
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
      'The Sacred Money Spending Plan is sticky content'
    ],
    keyPoints: [
      'Sacred Money Spending Plan (SMSP) budgeting system',
      'D9 Lifetime Cost Calculator with real data',
      'FCRA-compliant credit dispute letter generator',
      'Student Financial Defense against predatory tactics'
    ],
    stats: [
      { label: 'Average D9 Lifetime Cost', value: '$50,000+' },
      { label: 'Budget Categories', value: '7' },
      { label: 'Debt Strategies', value: '3 Methods' }
    ]
  },
  {
    id: 'chaplain-toolkit',
    title: 'Chapter Chaplain Toolkit',
    subtitle: 'On-Demand Resources for Spiritual Leaders',
    icon: <BookOpen className="w-12 h-12 text-blue-500" />,
    image: slideChaplain,
    duration: '4-5 min',
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
    duration: '3-4 min',
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
    duration: '3-4 min',
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

  // ============ CLOSING (15 min) ============
  {
    id: 'close',
    title: 'Why Partner With Sacred Greeks?',
    subtitle: 'Next Steps for Your Organization',
    icon: <Rocket className="w-12 h-12 text-sacred" />,
    image: slideClose,
    duration: '4-5 min',
    presenterNotes: [
      'Summarize the value proposition',
      'Emphasize: 100% FREE — no budget approval needed',
      'PWA works on any device — no app store friction',
      'Transition to Q&A slide for questions'
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
      'Connect with us for speaking opportunities'
    ]
  },
  {
    id: 'qa',
    title: 'Questions & Answers',
    subtitle: 'Let\'s Discuss How Sacred Greeks Can Serve Your Organization',
    icon: <Mic2 className="w-12 h-12 text-blue-500" />,
    image: slideQA,
    duration: '10-15 min',
    showQRCode: true,
    presenterNotes: [
      'Open the floor for questions',
      'Have attendees scan QR code while you answer',
      'Common questions: "Is this really free?", "How do we get started?"',
      'Collect contact info for follow-up'
    ],
    keyPoints: [
      'What questions do you have?',
      'How can we support your chapter?',
      'Scan the QR code to get started now',
      'Connect with us for speaking opportunities'
    ],
    talkingPoints: [
      'Every feature is 100% free',
      'No app store download required — works instantly',
      'Resources work offline via PWA',
      'We\'re here to support your chapter\'s faith journey'
    ]
  }
];

export const getPresentationDuration = () => {
  // Fixed 90-minute presentation
  return '~90 minutes';
};
