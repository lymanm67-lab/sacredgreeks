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
  UserCircle,
  Heart,
  MessageCircle,
  Lightbulb,
  Map,
  ClipboardList,
  Calendar,
  Star,
  Award,
  Zap,
  Quote,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Building2,
  Compass,
  BookMarked,
  Headphones,
  FileText,
  Flame,
  Church,
  Scale,
  Brain,
  Puzzle,
  Globe
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
  // ============ SECTION 1: OPENING & ICEBREAKER (10 min) ============
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
    id: 'icebreaker',
    title: 'Quick Poll',
    subtitle: 'Raise Your Hand If...',
    icon: <MessageCircle className="w-12 h-12 text-blue-400" />,
    duration: '2-3 min',
    presenterNotes: [
      'This builds rapport and reveals the room\'s experiences',
      'Ask each question and pause for hands',
      'Acknowledge responses warmly — "I\'ve been there too"',
      'Transition: "Every hand up is why this platform exists"'
    ],
    keyPoints: [
      '...you\'ve ever been questioned by family about Greek life?',
      '...a pastor or church member criticized your organization?',
      '...you struggled to explain WHY you joined?',
      '...you wish you had better answers for critics?'
    ],
    talkingPoints: [
      'These experiences are almost universal in Greek life',
      'The tension between faith and fraternity is real',
      'You\'re not alone — and you\'re not wrong',
      'Sacred Greeks exists to give you those answers'
    ]
  },
  {
    id: 'agenda',
    title: 'What We\'ll Cover Today',
    subtitle: '90-Minute Deep Dive',
    icon: <ClipboardList className="w-12 h-12 text-amber-500" />,
    duration: '1-2 min',
    presenterNotes: [
      'Set expectations for the session',
      'Mention there will be live demos and interactive exercises',
      'Encourage questions throughout or save for Q&A',
      'Mention breaks if needed for longer sessions'
    ],
    keyPoints: [
      '1. The Problem: Why Greek members need this',
      '2. P.R.O.O.F. Framework: Biblical responses to critics',
      '3. Platform Features: Live demos and tools',
      '4. Implementation: Getting your chapter started'
    ],
    stats: [
      { label: 'The Problem', value: '15 min' },
      { label: 'P.R.O.O.F. Deep Dive', value: '35 min' },
      { label: 'Features & Demo', value: '25 min' },
      { label: 'Q&A', value: '15 min' }
    ]
  },
  {
    id: 'creator',
    title: 'Meet the Creator',
    subtitle: 'Dr. Lyman Montgomery — Scholar, Minister, Delta',
    icon: <UserCircle className="w-12 h-12 text-blue-500" />,
    duration: '3-4 min',
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

  // ============ SECTION 2: THE PROBLEM (15 min) ============
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
    id: 'faith-crisis',
    title: 'The Faith Crisis',
    subtitle: 'When Church and Chapter Collide',
    icon: <Church className="w-12 h-12 text-red-500" />,
    duration: '3-4 min',
    presenterNotes: [
      'Share a story: A member who was told to renounce their letters',
      'Highlight: This happens in predominantly Black churches too',
      'The pain is real — people lose relationships over this',
      'Ask: Has anyone here witnessed this kind of pressure?'
    ],
    keyPoints: [
      'Members told to "renounce your letters" to remain in church',
      'Pastors preach against Greek organizations from the pulpit',
      'Family relationships strained over Greek membership',
      'Members hide their affiliation in church settings'
    ],
    talkingPoints: [
      'YouTube is full of anti-Greek preaching',
      'Viral videos claiming Greeks worship false gods',
      'Members feel attacked but lack the knowledge to respond',
      'Silence often equals agreement in critics\' minds'
    ],
    stats: [
      { label: 'Anti-BGLO Videos', value: '1000+' },
      { label: 'Combined Views', value: 'Millions' },
      { label: 'Equipped Responses', value: 'Almost None' }
    ]
  },
  {
    id: 'financial-crisis',
    title: 'The Financial Crisis',
    subtitle: 'Predatory Targeting of Greek Members',
    icon: <DollarSign className="w-12 h-12 text-red-500" />,
    duration: '3-4 min',
    presenterNotes: [
      'Credit card companies literally set up tables at Greek events',
      'Average D9 member: $50K+ lifetime in Greek-related expenses',
      'High interest rates + young members = debt spiral',
      'This is a stewardship issue as much as a financial one'
    ],
    keyPoints: [
      'Credit card companies target Greek events',
      'Average lifetime Greek expenses exceed $50,000',
      'High-interest debt traps young professionals',
      'Financial literacy is rarely part of membership education'
    ],
    talkingPoints: [
      'Dues, donations, travel, regalia, events — it adds up',
      'Many members finance Greek life on credit cards',
      '22% average APR on credit card debt',
      'The Bible calls us to be good stewards (Luke 16:10-12)'
    ],
    stats: [
      { label: 'Avg Lifetime Cost', value: '$50K+' },
      { label: 'Credit Card APR', value: '22%+' },
      { label: 'Members in Debt', value: 'Too Many' }
    ]
  },
  {
    id: 'chaplain-crisis',
    title: 'The Chaplain Crisis',
    subtitle: 'Untrained, Under-resourced, Overwhelmed',
    icon: <BookOpen className="w-12 h-12 text-purple-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Chapter chaplains are often assigned the role — not trained for it',
      'They have no curriculum, no resources, no support',
      'Devotions become shallow or non-existent',
      'Sacred Greeks gives them a complete toolkit'
    ],
    keyPoints: [
      'Chaplains are often volunteers with no theological training',
      'No curriculum exists for Greek spiritual formation',
      'Devotionals default to generic content or nothing',
      'Hard questions go unanswered or avoided'
    ],
    talkingPoints: [
      'The chaplain role is critical but under-supported',
      'Members look to chaplains for spiritual guidance',
      'Without resources, chaplains feel inadequate',
      'Sacred Greeks solves this with a complete toolkit'
    ]
  },

  // ============ SECTION 3: P.R.O.O.F. FRAMEWORK DEEP DIVE (35 min) ============
  {
    id: 'proof-overview',
    title: 'P.R.O.O.F. Framework',
    subtitle: 'Biblical Responses to the 5 Most Common Criticisms',
    icon: <Shield className="w-12 h-12 text-purple-500" />,
    image: slideProof,
    duration: '2-3 min',
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
    duration: '4-5 min',
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
    id: 'pledge-exercise',
    title: 'Interactive Exercise',
    subtitle: 'Responding to Pledge Criticism',
    icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
    duration: '3-4 min',
    presenterNotes: [
      'Pair up with someone near you',
      'One person plays the critic, one defends pledging biblically',
      'Switch roles after 2 minutes',
      'Debrief: What arguments were strongest?'
    ],
    keyPoints: [
      'Scenario: A family member says "pledging is hazing"',
      'Use biblical and historical examples',
      'Focus on formation, not abuse',
      'Practice makes the response natural'
    ],
    talkingPoints: [
      'Having a rehearsed response builds confidence',
      'Acknowledge the criticism before responding',
      'Point to Jesus and Paul as examples',
      'Distinguish between process and abuse'
    ]
  },
  {
    id: 'proof-rituals',
    title: 'R — Rituals',
    subtitle: 'Responding to "Those Rituals Are Pagan" Criticism',
    icon: <HandHeart className="w-12 h-12 text-purple-500" />,
    duration: '4-5 min',
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
    id: 'ritual-theology',
    title: 'Theology of Ritual',
    subtitle: 'Understanding What Makes Something "Worship"',
    icon: <Scale className="w-12 h-12 text-indigo-500" />,
    duration: '3-4 min',
    presenterNotes: [
      'Define worship biblically: heart posture toward deity',
      'Ritual can be sacred, secular, or neutral',
      'The object of devotion determines the nature',
      'Application: Evaluate rituals by their object, not their form'
    ],
    keyPoints: [
      'Worship = Heart posture of devotion toward a deity',
      'Ritual = Repeated symbolic action (neutral term)',
      'Church rituals: baptism, communion, laying on of hands',
      'Secular rituals: saluting flag, graduations, weddings'
    ],
    talkingPoints: [
      'Form doesn\'t determine worship — heart does',
      'A candle can be worship or decoration',
      'Kneeling can be prayer or proposal',
      'Evaluate Greek rituals by this same standard'
    ]
  },
  {
    id: 'proof-oaths',
    title: 'O — Oaths',
    subtitle: 'What Does the Bible Actually Say About Oaths?',
    icon: <ScrollText className="w-12 h-12 text-orange-500" />,
    duration: '4-5 min',
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
    id: 'oath-scripture',
    title: 'Scripture Deep Dive',
    subtitle: 'Matthew 5:34 in Context',
    icon: <BookMarked className="w-12 h-12 text-teal-500" />,
    duration: '3-4 min',
    presenterNotes: [
      'Read Matthew 5:33-37 aloud with the group',
      'Explain the Pharisaic oath system Jesus was addressing',
      'Show how James 5:12 echoes the same teaching',
      'Conclusion: Jesus opposed deception, not commitment'
    ],
    keyPoints: [
      'Matthew 5:33-37: Context of the Sermon on the Mount',
      'Pharisees created oath loopholes to avoid keeping promises',
      'James 5:12: "Let your yes be yes and your no be no"',
      'Both passages condemn deception, not all promises'
    ],
    talkingPoints: [
      'Oath by temple vs. oath by gold of temple (Matt 23:16-22)',
      'The problem was the intent to deceive, not the oath itself',
      'Courtroom oaths, marriage vows — still practiced by Christians',
      'Fraternal commitments to service are not deceptive'
    ]
  },
  {
    id: 'proof-obscurity',
    title: 'O — Obscurity/Secrecy',
    subtitle: 'Addressing "Secret Society" Accusations',
    icon: <Lock className="w-12 h-12 text-emerald-500" />,
    duration: '4-5 min',
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
    id: 'secrecy-vs-privacy',
    title: 'Secrecy vs. Privacy',
    subtitle: 'A Critical Distinction',
    icon: <Puzzle className="w-12 h-12 text-pink-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Make the distinction clear: privacy protects, secrecy hides',
      'Examples from everyday life: medical records, salary, passwords',
      'Biblical example: Jesus told some to "tell no one" (Mark 7:36)',
      'Application: Greek organizations practice privacy, not conspiracy'
    ],
    keyPoints: [
      'Privacy: Protecting appropriate boundaries',
      'Secrecy: Hiding wrongdoing or shame',
      'Your medical records are private — not secret',
      'Greek grips and signs are private — not sinister'
    ],
    talkingPoints: [
      'Jesus practiced strategic privacy (Mark 1:44)',
      'Early Christians used the fish symbol covertly',
      'Companies have trade secrets — perfectly ethical',
      'The accusation assumes malicious intent without evidence'
    ]
  },
  {
    id: 'proof-founders',
    title: 'F — Founders',
    subtitle: 'Historical Context & Christian Heritage',
    icon: <History className="w-12 h-12 text-red-500" />,
    duration: '4-5 min',
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
  {
    id: 'mutual-aid-history',
    title: 'Mutual Aid History',
    subtitle: 'Why Greek Organizations Were Necessary',
    icon: <Building2 className="w-12 h-12 text-slate-600" />,
    duration: '3-4 min',
    presenterNotes: [
      'Tell the story of discriminatory insurance practices',
      'Explain race-rated premiums and denial of coverage',
      'Show how mutual aid societies filled the gap',
      'Connect: This is the legacy D9 organizations inherit'
    ],
    keyPoints: [
      'Insurance companies charged Black Americans 3-4x more',
      'Many were denied coverage entirely',
      'Burial societies provided death benefits',
      'Greek organizations continued this mutual aid tradition'
    ],
    talkingPoints: [
      'Before Social Security, Greek orgs were social safety nets',
      'Founders created networks of support and opportunity',
      'Scholarships, business networks, emergency funds',
      'This history is often unknown to critics'
    ]
  },
  {
    id: 'proof-summary',
    title: 'P.R.O.O.F. Summary',
    subtitle: 'Biblical Responses at a Glance',
    icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Quick recap of all five letters',
      'Emphasize: These are STARTING points for conversation',
      'The full course goes much deeper on each topic',
      'Transition to features and tools section'
    ],
    keyPoints: [
      'P — Pledge Process: Formation ≠ Hazing (biblical apprenticeship)',
      'R — Rituals: Ritual ≠ Worship (intent matters)',
      'O — Oaths: Jesus condemned deception, not commitment',
      'O — Obscurity: Privacy ≠ Conspiracy (Jesus practiced privacy)',
      'F — Founders: Mutual aid legacy, Christian heritage'
    ],
    talkingPoints: [
      'Members now have a framework for responding to critics',
      'Each topic has hours of additional study material',
      'Audio versions available for on-the-go learning',
      'Certificates available upon course completion'
    ]
  },

  // ============ SECTION 4: FEATURES & TOOLS (25 min) ============
  {
    id: 'platform-overview',
    title: 'Platform Overview',
    subtitle: 'Everything Sacred Greeks Offers',
    icon: <Globe className="w-12 h-12 text-blue-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'High-level overview before diving into demos',
      'Emphasize the breadth of resources available',
      'Mention PWA capability — works offline',
      'Set up the demo section'
    ],
    keyPoints: [
      'P.R.O.O.F. Course — Complete theological education',
      'Faith Snapshot — Quick engagement assessment',
      'Financial Tools — Stewardship and debt management',
      'Chaplain Toolkit — Ready-made devotional resources'
    ],
    talkingPoints: [
      'AI-powered features for personalized content',
      'Gamification to drive engagement',
      'Community features for cross-chapter connection',
      'All features work offline via PWA'
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
    id: 'snapshot-demo',
    title: 'Live Demo: Faith Snapshot',
    subtitle: 'Let\'s Take the Assessment Together',
    icon: <Zap className="w-12 h-12 text-yellow-500" />,
    duration: '4-5 min',
    route: '/snapshot',
    presenterNotes: [
      'Have everyone pull out their phones',
      'Walk through the assessment as a group',
      'Pause at results — let people react to their archetype',
      'Show the sharing feature and resource recommendations'
    ],
    keyPoints: [
      'Pull out your phone — scan the QR or visit the link',
      'Answer 6 quick questions honestly',
      'View your personalized results',
      'Share your archetype with the group!'
    ],
    talkingPoints: [
      'This is perfect for new member orientation',
      'Creates immediate engagement and discussion',
      'Results are shareable on social media',
      'Drives organic growth for your chapter'
    ]
  },
  {
    id: 'financial-tools',
    title: 'Financial Stewardship Suite',
    subtitle: 'Addressing the $50K+ Lifetime Cost Reality',
    icon: <DollarSign className="w-12 h-12 text-emerald-500" />,
    image: slideFinancial,
    duration: '3-4 min',
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
    id: 'cost-calculator-demo',
    title: 'Live Demo: Cost Calculator',
    subtitle: 'See Your True Greek Investment',
    icon: <Brain className="w-12 h-12 text-pink-500" />,
    duration: '3-4 min',
    route: '/financial-stewardship',
    presenterNotes: [
      'Open the D9 Lifetime Cost Calculator on screen',
      'Input realistic numbers together',
      'Show the chart projections over time',
      'Discuss: "Are you on track or behind?"'
    ],
    keyPoints: [
      'Input your dues, donations, travel, regalia',
      'See 5, 10, 20-year projections',
      'Compare to investment alternatives',
      'Create a personal financial plan'
    ],
    talkingPoints: [
      'This isn\'t anti-Greek — it\'s pro-stewardship',
      'Knowledge is power when it comes to finances',
      'Plan ahead to avoid debt spirals',
      'Tithe, save, then spend — biblical priority'
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
    id: 'devotional-demo',
    title: 'Live Demo: Devotional Generator',
    subtitle: 'Create Chapter Resources in Seconds',
    icon: <FileText className="w-12 h-12 text-teal-500" />,
    duration: '3-4 min',
    route: '/chaplain-toolkit',
    presenterNotes: [
      'Show the devotional generator interface',
      'Select a theme and generate content',
      'Download the PDF — show how polished it looks',
      'Emphasize: This would take hours to create manually'
    ],
    keyPoints: [
      'Select a theme (leadership, service, sisterhood, etc.)',
      'AI generates scripture-based content',
      'Download as print-ready PDF',
      'Use immediately at chapter meetings'
    ],
    talkingPoints: [
      'Chaplains save hours of preparation time',
      'Content is theologically sound',
      'Customizable to your chapter\'s needs',
      'Works offline once generated'
    ]
  },
  {
    id: 'community',
    title: 'Community & Connection',
    subtitle: 'Building Cross-Chapter Fellowship',
    icon: <Users className="w-12 h-12 text-fuchsia-500" />,
    image: slideCommunity,
    duration: '2-3 min',
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
    id: 'podcast-integration',
    title: 'Sacred Greeks Podcast',
    subtitle: 'On-the-Go Faith Formation',
    icon: <Headphones className="w-12 h-12 text-purple-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Podcast episodes integrated directly in the app',
      'Available on all major platforms',
      '50+ episodes covering Greek life and faith topics',
      'Perfect for commutes and workouts'
    ],
    keyPoints: [
      '50+ episodes on faith and Greek life',
      'Available on Apple, Spotify, YouTube',
      'Integrated player in the app',
      'Listen offline via PWA'
    ],
    stats: [
      { label: 'Episodes', value: '50+' },
      { label: 'Platforms', value: '5+' },
      { label: 'Hours of Content', value: '40+' }
    ]
  },

  // ============ SECTION 5: IMPLEMENTATION & OBJECTIONS (10 min) ============
  {
    id: 'implementation',
    title: 'Implementation Roadmap',
    subtitle: 'Getting Your Chapter Started',
    icon: <Map className="w-12 h-12 text-blue-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Make it easy for them to say yes',
      'Step 1: Share link with chaplain and officers',
      'Step 2: Use Faith Snapshot at next event',
      'Step 3: Incorporate devotionals into meetings'
    ],
    keyPoints: [
      'Step 1: Share with chapter leadership (5 min)',
      'Step 2: Take Faith Snapshot at next meeting (15 min)',
      'Step 3: Use Chaplain Toolkit for devotionals (ongoing)',
      'Step 4: Recommend P.R.O.O.F. course to all members'
    ],
    actionItems: [
      'Text the link to your chapter president right now',
      'Add Faith Snapshot to next meeting agenda',
      'Schedule a chaplain training session',
      'Announce Sacred Greeks at your next chapter meeting'
    ]
  },
  {
    id: 'objection-cost',
    title: 'Objection: "What\'s the Catch?"',
    subtitle: 'Why Is This Free?',
    icon: <HelpCircle className="w-12 h-12 text-orange-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Address the natural skepticism about free products',
      'Mission-driven: Dr. Montgomery\'s calling',
      'Premium features coming, but core content stays free',
      'Speaking engagements and book sales support the mission'
    ],
    keyPoints: [
      'Mission-driven, not profit-driven',
      'Dr. Montgomery\'s personal calling',
      'Premium features coming (coaching, advanced courses)',
      'Core content will ALWAYS be free'
    ],
    talkingPoints: [
      'The resources didn\'t exist — someone had to create them',
      'Speaking fees and book sales support the platform',
      'Future premium features for those who want more',
      'D9 members deserve these resources regardless of budget'
    ]
  },
  {
    id: 'objection-time',
    title: 'Objection: "We\'re Too Busy"',
    subtitle: 'Making Time for What Matters',
    icon: <Calendar className="w-12 h-12 text-red-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Acknowledge the reality: Greeks ARE busy',
      'Counter: This SAVES time (chaplain toolkit)',
      'Faith Snapshot takes 2-3 minutes',
      'Devotionals are pre-written — no prep needed'
    ],
    keyPoints: [
      'Faith Snapshot: 2-3 minutes',
      'Devotional prep: ZERO (pre-written)',
      'P.R.O.O.F. modules: 15-20 min each',
      'Mobile-first: use during commute'
    ],
    talkingPoints: [
      'This replaces hours of chaplain prep time',
      'Members can learn during commutes',
      'Better to invest 20 minutes now than regret later',
      'Spiritual formation is worth prioritizing'
    ]
  },

  // ============ SECTION 6: CLOSING & Q&A (15 min) ============
  {
    id: 'testimonials',
    title: 'What Members Are Saying',
    subtitle: 'Real Impact, Real Stories',
    icon: <Quote className="w-12 h-12 text-sacred" />,
    duration: '2-3 min',
    presenterNotes: [
      'Share 2-3 brief testimonials',
      'Focus on transformation stories',
      'Mention specific features that helped',
      'Invite attendees to add their own stories'
    ],
    keyPoints: [
      '"Finally, I can explain my membership to my pastor"',
      '"The FCRA letter saved me $500 in collections"',
      '"Our chaplain uses the toolkit every meeting"',
      '"I feel confident defending my letters now"'
    ],
    talkingPoints: [
      'These are real members, real stories',
      'The impact is measurable and meaningful',
      'You could be the next success story',
      'Share your own experience after using the platform'
    ]
  },
  {
    id: 'vision',
    title: 'The Vision',
    subtitle: 'Where We\'re Going',
    icon: <Compass className="w-12 h-12 text-sacred" />,
    duration: '2-3 min',
    presenterNotes: [
      'Paint the picture of the future',
      'Coaching programs coming soon',
      'Chapter partnerships and bulk access',
      'Annual conference or retreat possibilities'
    ],
    keyPoints: [
      'Expanded P.R.O.O.F. course with video content',
      'One-on-one coaching programs',
      'Chapter partnership program',
      'Annual Sacred Greeks retreat or conference'
    ],
    talkingPoints: [
      'Your feedback shapes the roadmap',
      'Premium features support the free mission',
      'We\'re building the resource we wish existed',
      'This is just the beginning'
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
    id: 'call-to-action',
    title: 'Your Next Step',
    subtitle: 'Do This Right Now',
    icon: <ArrowRight className="w-12 h-12 text-green-500" />,
    duration: '2-3 min',
    showQRCode: true,
    presenterNotes: [
      'Create urgency — have them act NOW',
      'Scan QR code to open the platform',
      'Take the Faith Snapshot before leaving',
      'Share results with someone in the room'
    ],
    keyPoints: [
      '1. Scan the QR code (or visit SacredGreeks.com)',
      '2. Take the Faith Snapshot (2-3 min)',
      '3. Share your results with someone here',
      '4. Text the link to your chapter group chat'
    ],
    actionItems: [
      'DO IT NOW — Don\'t wait until later',
      'Screenshot your results for social media',
      'Tag us when you share',
      'Invite your chapter to join'
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
  },
  {
    id: 'contact',
    title: 'Stay Connected',
    subtitle: 'Let\'s Continue the Conversation',
    icon: <Heart className="w-12 h-12 text-red-500" />,
    duration: '1-2 min',
    showQRCode: true,
    presenterNotes: [
      'Share contact information',
      'Mention social media handles',
      'Invite them to subscribe to podcast',
      'Thank them for their time'
    ],
    keyPoints: [
      'Website: SacredGreeks.com',
      'Podcast: Sacred Greeks Podcast (all platforms)',
      'Book: "Sacred Not Sinful" (Amazon)',
      'Speaking: Contact through the platform'
    ],
    stats: [
      { label: 'Website', value: 'SacredGreeks.com' },
      { label: 'Podcast', value: 'All Platforms' },
      { label: 'Book', value: 'Amazon' }
    ],
    actionItems: [
      'Follow the podcast',
      'Order the book for your chapter',
      'Invite Dr. Montgomery to speak',
      'Share today\'s presentation with your chapter'
    ]
  },
  {
    id: 'thank-you',
    title: 'Thank You',
    subtitle: 'Go Forth and Be Sacred Greeks',
    icon: <Flame className="w-12 h-12 text-sacred" />,
    duration: '1 min',
    presenterNotes: [
      'Express genuine gratitude',
      'Remind them of the mission',
      'Close with a blessing or prayer if appropriate',
      'Make yourself available for one-on-one questions'
    ],
    keyPoints: [
      'Thank you for investing 90 minutes',
      'You are NOT alone in this journey',
      'Your faith and your letters can coexist',
      'Go forth equipped to respond with grace and truth'
    ],
    talkingPoints: [
      'This is just the beginning of your journey',
      'Share what you learned with your chapter',
      'The resources are here whenever you need them',
      'God bless your chapter\'s mission and ministry'
    ]
  }
];

export const getPresentationDuration = () => {
  // Fixed 90-minute presentation
  return '~90 minutes';
};
