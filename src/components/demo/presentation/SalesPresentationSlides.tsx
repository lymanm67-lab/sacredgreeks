import { ReactNode } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  Rocket,
  Trophy,
  GraduationCap,
  HandHeart,
  History,
  Mic2,
  UserCircle,
  Heart,
  MessageCircle,
  Lightbulb,
  ClipboardList,
  Star,
  Award,
  Quote,
  CheckCircle2,
  Building2,
  Compass,
  BookMarked,
  Flame,
  Church,
  Scale,
  Globe,
  Crown,
  Landmark,
  HandshakeIcon,
  GraduationCapIcon,
  Megaphone,
  Flag,
  Footprints,
  Layers,
  Network,
  Link2,
  Shield,
  Feather,
  Sunrise,
  Medal,
  Smartphone,
  Monitor,
  Zap,
  Brain,
  Target,
  BarChart3,
  BookOpenCheck,
  Headphones,
  FileText,
  Users2
} from 'lucide-react';

// Import slide images
import slideIntro from '@/assets/presentation/slide-intro.jpg';
import slideProblem from '@/assets/presentation/slide-problem.jpg';
import slideSnapshot from '@/assets/presentation/slide-snapshot.jpg';
import slideProof from '@/assets/presentation/slide-proof.jpg';
import slideFinancial from '@/assets/presentation/slide-financial.jpg';
import slideChaplain from '@/assets/presentation/slide-chaplain.jpg';

// Import new keynote images
import slideGreekCeremony from '@/assets/slides/greek-stepping-ceremony.jpg';
import slideCivilRights from '@/assets/slides/civil-rights-march.jpg';
import slideCommunityService from '@/assets/slides/greek-community-service.jpg';
import slideFaithWorship from '@/assets/slides/faith-worship-hands.jpg';
import slideHBCUCampus from '@/assets/slides/hbcu-campus.jpg';
import slideBuildingBridges from '@/assets/slides/building-bridges.jpg';
import slideAppShowcase from '@/assets/slides/app-showcase.jpg';
import slideBibleGreek from '@/assets/slides/bible-greek-letters.jpg';
import slideCommunity from '@/assets/presentation/slide-community.jpg';
import slideGamification from '@/assets/presentation/slide-gamification.jpg';
import slideClose from '@/assets/presentation/slide-close.jpg';
import slideQA from '@/assets/presentation/slide-qa.jpg';
import slideSpeaker from '@/assets/presentation/dr-lyman-montgomery.jpeg';
import slideJourneyPath from '@/assets/slides/journey-path.jpg';
import slideReceivingGift from '@/assets/slides/receiving-gift.jpg';

export interface PresentationSlide {
  id: string;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  image?: string;
  secondaryImage?: string;
  showQRCode?: boolean;
  showLivePreview?: boolean;
  presenterNotes: string[];
  keyPoints: string[];
  talkingPoints?: string[];
  stats?: { label: string; value: string }[];
  actionItems?: string[];
  route?: string;
  duration?: string;
}

export const salesPresentationSlides: PresentationSlide[] = [
  // ============ SECTION 1: OPENING & CONTEXT (10 min) ============
  {
    id: 'intro',
    title: 'Understanding the Sacred Side of Greek Life',
    subtitle: 'Faith, Culture, and Activism in the Divine Nine',
    icon: <Sparkles className="w-12 h-12 text-sacred" />,
    image: slideGreekCeremony,
    duration: '2-3 min',
    presenterNotes: [
      'Welcome warmly — acknowledge both Greek and non-Greek attendees',
      'Set the tone: This is about understanding, not recruitment',
      'Hook: "What if everything you\'ve heard about Greek Life missed the point?"',
      'Promise: You\'ll leave with a renewed respect for this legacy'
    ],
    keyPoints: [
      'A journey through faith, history, and purpose',
      'Beyond the stereotypes and misconceptions',
      'Greek Life as engines of justice, scholarship, and service',
      'Where faith, culture, and activism intersect'
    ],
    stats: [
      { label: 'D9 Organizations', value: '9' },
      { label: 'Years of History', value: '100+' },
      { label: 'Members Worldwide', value: '2.5M+' }
    ]
  },
  {
    id: 'speaker-intro',
    title: 'Dr. Lyman Montgomery',
    subtitle: 'Ordained Elder • Initiated Member of Phi Beta Sigma Fraternity, Inc.',
    icon: <UserCircle className="w-12 h-12 text-blue-500" />,
    image: slideSpeaker,
    secondaryImage: slideReceivingGift,
    duration: '3-4 min',
    presenterNotes: [
      'Brief personal introduction — ordained minister AND Delta member',
      'Share your own journey: The tension you once felt between faith and letters',
      'Mention the book: "Sacred Not Sinful" — years of research',
      'Establish credibility: You\'ve lived both worlds'
    ],
    keyPoints: [
      'Former Alumni Chapter President',
      'Creator of Sacred Greeks App',
      'Author of "Sacred Not Sinful"',
      'Sacred Greeks Podcast Host',
      'Introduction to Sacred Greeks App (Free Gift for Attending)'
    ],
    talkingPoints: [
      'Walked the same journey many Greek members walk',
      'Faced the same questions from family and church',
      'Spent years researching the historical and biblical truth',
      'Mission: To tell the untold story of Greek Life\'s sacred roots'
    ],
    stats: [
      { label: 'Years in Ministry', value: '20+' },
      { label: 'Research Invested', value: 'Extensive' },
      { label: 'Speaking Engagements', value: 'Nationwide' }
    ]
  },
  {
    id: 'case-study-stay-leave',
    title: 'Case Study: Should You Stay or Leave?',
    subtitle: 'An Interactive Decision-Making Tool',
    icon: <Scale className="w-12 h-12 text-amber-500" />,
    showLivePreview: true,
    route: '/should-you-stay-or-leave',
    duration: '5-7 min',
    presenterNotes: [
      'Walk through the interactive assessment live',
      'Explain how faith-based decision making works',
      'Show how the tool guides members through difficult choices',
      'Emphasize: This is about discernment, not judgment'
    ],
    keyPoints: [
      'Biblical framework for making difficult decisions',
      'Interactive self-assessment for Greek members',
      'Guidance rooted in faith and wisdom',
      'Real scenarios members face today'
    ],
    talkingPoints: [
      'Many members struggle with the question: Should I stay or leave?',
      'This tool provides a faith-based framework for that decision',
      'Based on biblical principles of discernment',
      'Helps members align their Greek journey with their faith'
    ]
  },
  {
    id: 'agenda',
    title: 'Our Journey Today',
    subtitle: '90 Minutes of Story, History, and Insight',
    icon: <ClipboardList className="w-12 h-12 text-amber-500" />,
    image: slideJourneyPath,
    duration: '1-2 min',
    presenterNotes: [
      'Set expectations for the session',
      'Emphasize: This is storytelling + education, not lecture',
      'Encourage reflection and questions',
      'Learning objectives preview'
    ],
    keyPoints: [
      '1. The Untold Story: What outsiders miss about Greek Life',
      '2. Engines of Justice: How BGLOs transformed America',
      '3. Faith in Action: The sacred mission embedded in traditions',
      '4. Building Bridges: Partnership between Greek and non-Greek communities'
    ],
    stats: [
      { label: 'Historical Context', value: '25 min' },
      { label: 'Stories & Insight', value: '35 min' },
      { label: 'Sacred Mission', value: '20 min' },
      { label: 'Q&A', value: '10 min' }
    ]
  },
  {
    id: 'learning-objectives',
    title: 'What You\'ll Walk Away With',
    subtitle: 'Three Learning Objectives',
    icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
    duration: '2 min',
    presenterNotes: [
      'Read each objective slowly for emphasis',
      'Explain WHY each matters',
      'Preview: We\'ll return to these at the end',
      'Invite attendees to hold you accountable to delivering'
    ],
    keyPoints: [
      '1. Deeper understanding of the sacred mission embedded in Greek Life traditions and the transformative power of these organizations throughout history',
      '2. Enhanced community understanding that opens pathways for partnership between Greek and non-Greek students in pursuit of shared campus goals',
      '3. Clear recognition of BGLOs as incubators for leadership development and faith in action, producing generations of changemakers'
    ],
    talkingPoints: [
      'This isn\'t about convincing you to join',
      'It\'s about understanding a powerful American institution',
      'Knowledge builds bridges, ignorance builds walls',
      'Let\'s tear down some walls today'
    ]
  },

  // ============ SECTION 2: THE UNTOLD STORY (20 min) ============
  {
    id: 'misconceptions',
    title: 'What Outsiders Get Wrong',
    subtitle: 'Challenging Old Assumptions',
    icon: <MessageCircle className="w-12 h-12 text-red-400" />,
    image: slideProblem,
    duration: '3-4 min',
    presenterNotes: [
      'Acknowledge the stereotypes exist — don\'t dismiss them',
      'List common misconceptions without defensiveness',
      'Promise: The truth is more inspiring than the stereotypes',
      'Transition: "Let me tell you what they don\'t see..."'
    ],
    keyPoints: [
      '"They\'re just paying for friends" — The party stereotype',
      '"It\'s all hazing and secrecy" — The danger narrative',
      '"Greek letters divide campus" — The exclusivity myth',
      '"It has nothing to do with faith" — The secular assumption'
    ],
    talkingPoints: [
      'Every stereotype has a grain of truth and a mountain of misunderstanding',
      'Media focuses on scandals, not scholarship',
      'The real story is written in service hours, not headlines',
      'Today we reframe the narrative with facts and stories'
    ]
  },
  {
    id: 'origins-necessity',
    title: 'Born Out of Necessity',
    subtitle: 'Why Greek Life Had to Exist',
    icon: <History className="w-12 h-12 text-amber-600" />,
    image: slideHBCUCampus,
    duration: '4-5 min',
    presenterNotes: [
      'Set the historical stage: Early 1900s, Black students on white campuses',
      'Paint the picture: Isolation, discrimination, exclusion',
      'The need for mutual aid, community, survival',
      'Story: Share a specific founding story (Alpha Phi Alpha, 1906)'
    ],
    keyPoints: [
      'Black students excluded from white fraternities and campus life',
      'No support systems, no social outlets, no mentorship',
      'Insurance companies refused coverage or charged 3-4x rates',
      'Greek organizations filled the void with purpose and power'
    ],
    talkingPoints: [
      'Cornell, 1906: Seven young men chose brotherhood over isolation',
      'Howard, Indiana, Butler — similar stories across the nation',
      'These weren\'t social clubs — they were survival networks',
      'From exclusion came excellence'
    ],
    stats: [
      { label: 'First D9 Org', value: '1906' },
      { label: 'Founding Era', value: 'Jim Crow' },
      { label: 'Chapters Today', value: '1,500+' }
    ]
  },
  {
    id: 'mutual-aid-legacy',
    title: 'Engines of Economic Justice',
    subtitle: 'When Greek Letters Meant Survival',
    icon: <Building2 className="w-12 h-12 text-slate-600" />,
    duration: '4-5 min',
    presenterNotes: [
      'Explain race-rated insurance premiums',
      'Tell the story of burial societies and mutual aid',
      'Connect: Greek organizations carried this legacy forward',
      'Emphasize: This is why D9 orgs still have economic programs today'
    ],
    keyPoints: [
      'Insurance companies charged Black Americans 3-4x higher premiums',
      'Many were denied coverage entirely — no death benefits',
      'Burial societies provided what mainstream institutions refused',
      'Greek organizations became engines of economic empowerment'
    ],
    talkingPoints: [
      'Before Social Security, fraternal organizations were the safety net',
      'Burial funds, emergency loans, scholarship programs',
      'This isn\'t ancient history — the mission continues today',
      'Sigma\'s JHF, AKA\'s EAF — direct descendants of this legacy'
    ],
    stats: [
      { label: 'Scholarships Awarded', value: 'Millions $' },
      { label: 'Economic Programs', value: '9 Orgs' },
      { label: 'Years of Service', value: '100+' }
    ]
  },
  {
    id: 'founders-faith',
    title: 'Founders of Faith',
    subtitle: 'The Christian Roots of Greek Leadership',
    icon: <Church className="w-12 h-12 text-purple-600" />,
    image: slideFaithWorship,
    duration: '4-5 min',
    presenterNotes: [
      'Many D9 founders were ministers, church leaders, Christians',
      'Share specific examples: Names, churches, ministries',
      'Challenge: How can organizations founded by Christians be "un-Christian"?',
      'Transition: Faith wasn\'t incidental — it was foundational'
    ],
    keyPoints: [
      'D9 founders included ordained ministers and church leaders',
      'Faith informed the values: Service, scholarship, uplift',
      'Campus ministry and Greek life often intertwined',
      'The sacred mission was baked in from day one'
    ],
    talkingPoints: [
      'Many founders met in church before they met in chapter',
      'Hymns influenced organization songs',
      'Service projects modeled after church outreach',
      'The letters carried the faith forward'
    ]
  },

  // ============ SECTION 3: ENGINES OF JUSTICE (25 min) ============
  {
    id: 'civil-rights-connection',
    title: 'Marching for Justice',
    subtitle: 'Greek Life and the Civil Rights Movement',
    icon: <Megaphone className="w-12 h-12 text-red-500" />,
    image: slideCivilRights,
    duration: '5-6 min',
    presenterNotes: [
      'This is the climactic section — bring energy',
      'Name names: MLK (Alpha), Thurgood Marshall (Alpha), John Lewis (Phi Beta Sigma)',
      'Paint the picture: Marches, sit-ins, voter registration',
      'Greek letters were on the front lines of justice'
    ],
    keyPoints: [
      'Dr. Martin Luther King Jr. — Alpha Phi Alpha',
      'Thurgood Marshall — Alpha Phi Alpha',
      'John Lewis — Phi Beta Sigma',
      'The Divine Nine produced the architects of change'
    ],
    talkingPoints: [
      'Look at any civil rights photograph — spot the letters',
      'Chapter houses became organizing headquarters',
      'Sororities registered voters, fraternities led marches',
      'Greek Life wasn\'t on the sidelines — it was on the front lines'
    ],
    stats: [
      { label: 'Civil Rights Leaders', value: '100s' },
      { label: 'Voting Drives', value: 'Thousands' },
      { label: 'Impact', value: 'Transformative' }
    ]
  },
  {
    id: 'campus-transformation',
    title: 'Transforming Campuses',
    subtitle: 'From Isolation to Influence',
    icon: <GraduationCap className="w-12 h-12 text-blue-500" />,
    duration: '4-5 min',
    presenterNotes: [
      'Shift from national to campus level',
      'Story: A specific campus transformation (HBCU or PWI)',
      'Greek organizations created Black student centers, mentorship programs',
      'Today\'s DEI offices owe a debt to Greek pioneers'
    ],
    keyPoints: [
      'Greek organizations created the first Black student communities',
      'Mentorship programs that became institutional models',
      'Cultural events that educated entire campuses',
      'Leadership training that produced university presidents'
    ],
    talkingPoints: [
      'Before DEI offices, there were Greek chapters',
      'Before Black student unions, there were step shows',
      'Before diversity training, there was Greek fellowship',
      'The pioneers paved the way for everyone who followed'
    ]
  },
  {
    id: 'community-service',
    title: 'Service as Sacred Work',
    subtitle: 'Millions of Hours, Countless Lives Changed',
    icon: <HandHeart className="w-12 h-12 text-pink-500" />,
    image: slideCommunityService,
    duration: '4-5 min',
    presenterNotes: [
      'Transition from history to ongoing impact',
      'Share specific service statistics',
      'Story: A particular service project that changed lives',
      'Connect: Service is the living expression of sacred mission'
    ],
    keyPoints: [
      'Millions of volunteer hours annually across all nine organizations',
      'Health fairs, book drives, mentorship programs',
      'Disaster relief, voter registration, educational initiatives',
      'Service isn\'t a requirement — it\'s a calling'
    ],
    talkingPoints: [
      'Every D9 organization has signature service programs',
      'Go Red initiatives, March of Dimes, Project ENRICH',
      'Greeks show up when communities need them most',
      'This is faith in action, letters in service'
    ],
    stats: [
      { label: 'Annual Service Hours', value: 'Millions' },
      { label: 'Scholarships Given', value: '$Billions' },
      { label: 'Communities Served', value: 'Nationwide' }
    ]
  },
  {
    id: 'leadership-incubator',
    title: 'Incubators for Leaders',
    subtitle: 'Producing Generations of Changemakers',
    icon: <Crown className="w-12 h-12 text-amber-500" />,
    duration: '4-5 min',
    presenterNotes: [
      'Learning objective #3 connection',
      'Name prominent Greek leaders: Politicians, CEOs, educators',
      'The pattern: Greek organizations develop leadership capacity',
      'Story: Someone who credits their chapter for their success'
    ],
    keyPoints: [
      'Vice President Kamala Harris — Alpha Kappa Alpha',
      'Countless mayors, senators, CEOs, and university presidents',
      'Greek organizations teach leadership by doing',
      'Chapter roles become career preparation'
    ],
    talkingPoints: [
      'Treasurer of a chapter → CFO of a corporation',
      'Program chair → Event director',
      'Chapter president → Company president',
      'The skills transfer because the training is real'
    ],
    stats: [
      { label: 'Fortune 500 Leaders', value: '100s' },
      { label: 'Elected Officials', value: '1000s' },
      { label: 'Educators', value: '10,000s' }
    ]
  },
  {
    id: 'story-moment-1',
    title: 'Story: The Bridge',
    subtitle: 'A Personal Moment of Transformation',
    icon: <Quote className="w-12 h-12 text-sacred" />,
    duration: '3-4 min',
    presenterNotes: [
      'Tell a vivid personal story',
      'A moment when you saw Greek life bridge faith and identity',
      'Make it emotional, specific, and visual',
      'Pause for impact before moving on'
    ],
    keyPoints: [
      '[Share a personal story of transformation]',
      'The moment faith and Greek identity aligned',
      'How community created belonging',
      'The bridge between who you were and who you became'
    ],
    talkingPoints: [
      'Greek organizations create spaces for belonging',
      'Identity formation happens in community',
      'Faith is strengthened, not threatened, by authentic fellowship',
      'This is what outsiders never see'
    ]
  },

  // ============ SECTION 4: THE SACRED MISSION (20 min) ============
  {
    id: 'sacred-mission',
    title: 'The Sacred Mission',
    subtitle: 'Faith Embedded in Every Tradition',
    icon: <Flame className="w-12 h-12 text-sacred" />,
    image: slideProof,
    duration: '4-5 min',
    presenterNotes: [
      'Learning objective #1 deep dive',
      'Explain what "sacred" means in this context',
      'Not worship — but consecrated purpose',
      'Transition to specific examples of faith in traditions'
    ],
    keyPoints: [
      'Sacred = Set apart for a holy purpose',
      'Greek organizations were consecrated for service and uplift',
      'Traditions carry meaning beyond the surface',
      'Faith is woven into the fabric of Greek life'
    ],
    talkingPoints: [
      'Every ritual has a reason',
      'Every symbol tells a story',
      'Every tradition points to something greater',
      'The sacred is hidden in plain sight'
    ]
  },
  {
    id: 'rituals-meaning',
    title: 'Rituals with Meaning',
    subtitle: 'What the Critics Don\'t Understand',
    icon: <Layers className="w-12 h-12 text-purple-500" />,
    duration: '4-5 min',
    presenterNotes: [
      'Address the "rituals are pagan" misconception',
      'Explain: The church itself has rituals (baptism, communion)',
      'Intent and object determine meaning, not form',
      'Greek rituals emphasize brotherhood and service, not deity worship'
    ],
    keyPoints: [
      'The church practices rituals: baptism, communion, ordination',
      'Every organization has rituals: graduations, weddings, court oaths',
      'Intent determines meaning — not the form itself',
      'Greek rituals consecrate members for service, not worship'
    ],
    talkingPoints: [
      'A candle can be worship or decoration — intent matters',
      'Kneeling can be prayer or proposal — context matters',
      'Greek rituals are about commitment to mission',
      'Critics mistake form for function'
    ]
  },
  {
    id: 'symbols-purpose',
    title: 'Symbols That Speak',
    subtitle: 'Greek Letters as Identity Markers',
    icon: <Feather className="w-12 h-12 text-indigo-500" />,
    image: slideBibleGreek,
    duration: '3-4 min',
    presenterNotes: [
      'Explain the power of symbols in community',
      'Compare to other identity markers: flags, crosses, wedding rings',
      'Greek letters represent commitment to shared values',
      'Wearing letters is a public declaration of purpose'
    ],
    keyPoints: [
      'Symbols create shared identity and accountability',
      'Letters represent commitment to service and excellence',
      'Public display invites scrutiny — members must live the values',
      'The symbol is a promise made visible'
    ],
    talkingPoints: [
      'A wedding ring is a symbol of commitment',
      'A uniform is a symbol of belonging',
      'Greek letters are a symbol of consecration to mission',
      'When you see the letters, you know what they stand for'
    ]
  },
  {
    id: 'faith-culture-activism',
    title: 'Where Faith Meets Culture Meets Activism',
    subtitle: 'The Intersection That Defines Greek Life',
    icon: <Network className="w-12 h-12 text-teal-500" />,
    duration: '4-5 min',
    presenterNotes: [
      'This is the heart of the keynote',
      'Draw the three circles: Faith, Culture, Activism',
      'Greek life sits at the intersection of all three',
      'This is what makes it unique and powerful'
    ],
    keyPoints: [
      'Faith: The spiritual foundation that motivates service',
      'Culture: The celebration of identity and heritage',
      'Activism: The commitment to justice and change',
      'Greek Life weaves all three into a unified purpose'
    ],
    talkingPoints: [
      'You can\'t separate faith from culture in the Black experience',
      'You can\'t separate culture from activism in the American experience',
      'Greek life holds all three together',
      'This is why it\'s so powerful — and so misunderstood'
    ]
  },
  {
    id: 'story-moment-2',
    title: 'Story: The Call',
    subtitle: 'When Service Becomes Sacred',
    icon: <Quote className="w-12 h-12 text-sacred" />,
    duration: '3-4 min',
    presenterNotes: [
      'Tell a story of service becoming a spiritual experience',
      'A moment when Greek service felt like ministry',
      'Specific, vivid, emotional',
      'Let the story make the point'
    ],
    keyPoints: [
      '[Share a story of service that felt like calling]',
      'The line between service and ministry blurred',
      'Greek letters as tools for kingdom work',
      'When purpose meets passion'
    ],
    talkingPoints: [
      'Sometimes service feels like worship',
      'Sometimes community feels like church',
      'Sometimes the letters feel like a calling',
      'This is the sacred side of Greek life'
    ]
  },

  // ============ SECTION 5: BUILDING BRIDGES (10 min) ============
  {
    id: 'partnership-potential',
    title: 'Building Bridges',
    subtitle: 'Partnership Between Greek and Non-Greek Communities',
    icon: <Link2 className="w-12 h-12 text-blue-500" />,
    image: slideBuildingBridges,
    duration: '3-4 min',
    presenterNotes: [
      'Learning objective #2 deep dive',
      'Shift from education to application',
      'What can non-Greek students and Greek organizations do together?',
      'Examples of successful partnerships'
    ],
    keyPoints: [
      'Shared campus goals unite Greek and non-Greek students',
      'Service projects benefit from broader participation',
      'Mentorship programs can cross Greek lines',
      'Understanding creates collaboration opportunities'
    ],
    talkingPoints: [
      'Greek organizations have infrastructure for change',
      'Non-Greek students have fresh perspectives and energy',
      'Together, the impact multiplies',
      'Division weakens; partnership empowers'
    ]
  },
  {
    id: 'collaboration-examples',
    title: 'Collaboration in Action',
    subtitle: 'What Partnership Looks Like',
    icon: <HandshakeIcon className="w-12 h-12 text-green-500" />,
    duration: '3-4 min',
    presenterNotes: [
      'Give 3-4 concrete examples of Greek/non-Greek collaboration',
      'Campus service days, voter registration drives, mentorship',
      'Challenge: What could YOUR campus do?',
      'Invite them to imagine possibilities'
    ],
    keyPoints: [
      'Joint service projects with campus organizations',
      'Mentorship programs crossing Greek lines',
      'Voter registration drives for entire campus',
      'Cultural events that educate and celebrate'
    ],
    talkingPoints: [
      'The best campus change happens together',
      'Greek organizations have the structure',
      'Non-Greek partners bring new energy',
      'Collaboration is the key to campus transformation'
    ]
  },
  {
    id: 'invitation',
    title: 'An Invitation to Understand',
    subtitle: 'Not Recruitment — Relationship',
    icon: <Heart className="w-12 h-12 text-red-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Clarify: This keynote isn\'t about joining',
      'It\'s about understanding and respecting',
      'Non-Greek students: See Greek life differently now',
      'Greek students: Share this understanding with others'
    ],
    keyPoints: [
      'This isn\'t recruitment — it\'s relationship building',
      'Understanding doesn\'t require joining',
      'Respect comes from knowledge, not membership',
      'We can be partners without wearing the same letters'
    ],
    talkingPoints: [
      'You don\'t have to be Greek to appreciate Greek life',
      'You don\'t have to join to partner',
      'Understanding creates respect',
      'Respect creates collaboration'
    ]
  },

  // ============ SECTION 6: CLOSING & INSPIRATION (15 min) ============
  {
    id: 'legacy-review',
    title: 'The Legacy We\'ve Explored',
    subtitle: 'Recap: What Makes Greek Life Sacred',
    icon: <Medal className="w-12 h-12 text-amber-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Quick recap of the journey',
      'Touch each major theme briefly',
      'Prepare for the inspiring close',
      'Review learning objectives — did we deliver?'
    ],
    keyPoints: [
      'Born out of necessity, built on faith',
      'Engines of justice that changed America',
      'Service as sacred work, letters as calling',
      'Bridges between faith, culture, and activism'
    ],
    talkingPoints: [
      'We\'ve covered 100+ years of history',
      'We\'ve met founders, leaders, changemakers',
      'We\'ve seen the sacred in the supposed secular',
      'Now the question is: What will you do with this knowledge?'
    ]
  },
  {
    id: 'learning-objectives-review',
    title: 'Did We Deliver?',
    subtitle: 'Checking Our Learning Objectives',
    icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Return to the three learning objectives',
      'Ask the audience: Did you gain this understanding?',
      'Celebrate the journey together',
      'Transition to inspiration'
    ],
    keyPoints: [
      '✓ Deeper understanding of the sacred mission and transformative power',
      '✓ Enhanced community understanding for partnership',
      '✓ Recognition of BGLOs as leadership incubators',
      'Three objectives — three deliveries'
    ],
    actionItems: [
      'Take this understanding back to your communities',
      'Share with someone who misunderstands Greek life',
      'Look for partnership opportunities on your campus',
      'Let knowledge build bridges, not walls'
    ]
  },

  // ============ SECTION 6: THE APP COMPANION (15 min) ============
  {
    id: 'app-intro',
    title: 'Sacred Greeks',
    subtitle: 'Faith-First Digital Ministry for Greek Life',
    icon: <Smartphone className="w-12 h-12 text-sacred" />,
    image: slideAppShowcase,
    route: '/',
    showLivePreview: true,
    duration: '2-3 min',
    presenterNotes: [
      'Transition: "Everything we\'ve discussed today... in your pocket"',
      'Introduce the Sacred Greeks app as the practical tool',
      'Emphasize: Built by a Greek, for Greeks, rooted in faith',
      'Show the landing page and explain the mission'
    ],
    keyPoints: [
      'A faith-first platform built specifically for Greek life',
      'The ONLY app addressing the faith-Greek intersection',
      'Daily devotionals tailored to the Greek experience',
      'AI-powered tools for biblical discernment'
    ],
    stats: [
      { label: 'Focus', value: 'D9 + All Greeks' },
      { label: 'Mission', value: 'Faith First' },
      { label: 'Platform', value: 'PWA' }
    ]
  },
  {
    id: 'app-problem',
    title: 'The Faith-Greek Tension',
    subtitle: 'Why This App Exists',
    icon: <Target className="w-12 h-12 text-red-500" />,
    route: '/snapshot',
    showLivePreview: true,
    duration: '2-3 min',
    presenterNotes: [
      'Address the core tension: Family criticism, church concerns, ritual questions',
      'Add the financial crisis: Student debt + Greek dues = danger zone',
      'Show the Faith Snapshot as the diagnostic tool',
      'This creates urgency for the solution'
    ],
    keyPoints: [
      '"Is Greek life sinful?" — The question members face daily',
      'Family criticism vs. personal conviction',
      'Financial pressure: $2K-$10K+ in dues meets student debt crisis',
      'Greeks need tools to navigate faith AND finances'
    ],
    talkingPoints: [
      'Members are left alone to figure this out',
      'No biblical framework exists... until now',
      'Financial literacy is almost non-existent'
    ]
  },
  {
    id: 'app-faith-snapshot',
    title: 'Faith Snapshot Assessment',
    subtitle: 'Quick Engagement — Discover Where You Stand',
    icon: <Target className="w-12 h-12 text-blue-500" />,
    route: '/assessment/faith-snapshot',
    showLivePreview: true,
    duration: '3-4 min',
    presenterNotes: [
      'Interactive 6-question assessment for prospective and current members',
      'Personalized "Faith Confidence Score" and archetype',
      'Walk through a sample assessment LIVE',
      'Highlight: Quick, engaging, shareable results'
    ],
    keyPoints: [
      '6 targeted questions evaluating faith-Greek alignment',
      'Personalized archetypes: "Apologetics Ready", "Seeking Clarity", etc.',
      'Addresses specific struggles: family criticism, ritual concerns',
      'Perfect lead magnet for ministry outreach'
    ],
    stats: [
      { label: 'Questions', value: '6' },
      { label: 'Time', value: '2 min' },
      { label: 'Results', value: 'Instant' }
    ]
  },
  {
    id: 'app-proof-framework',
    title: 'The P.R.O.O.F. Framework',
    subtitle: 'Biblical Responses to 5 Core Criticisms',
    icon: <Shield className="w-12 h-12 text-amber-500" />,
    route: '/proof-course',
    showLivePreview: true,
    duration: '3-4 min',
    presenterNotes: [
      'Explain P.R.O.O.F.: Pledge, Rituals, Oaths, Obscurity, Founders',
      'Each pillar addresses a common criticism with scripture',
      'Show the interactive course in the live preview',
      'Emphasize: Faith-centered framework, not judgment'
    ],
    keyPoints: [
      'P — Pledge Process: Biblical commitment principles',
      'R — Rituals: Worship vs. cultural tradition',
      'O — Oaths: What promises are being made?',
      'O — Obscurity: Secrecy vs. privacy distinction',
      'F — Founders: The Christian heritage of D9'
    ],
    talkingPoints: [
      'Not about condemning — about discerning',
      'Helps members articulate their faith position',
      'Interactive lessons with gamification'
    ]
  },
  {
    id: 'app-financial-tools',
    title: 'Financial Stewardship Tools',
    subtitle: '10/15/10/65 Plan, Cost Calculator, Dispute Letters',
    icon: <BarChart3 className="w-12 h-12 text-green-500" />,
    route: '/financial-stewardship',
    showLivePreview: true,
    duration: '3-4 min',
    presenterNotes: [
      'Introduce the Sacred Money Spending Plan: 10/15/10/65',
      'Show the True Cost Calculator for Greek life expenses',
      'Demo the FCRA-compliant dispute letter generator',
      'Emphasize biblical stewardship meets practical tools'
    ],
    keyPoints: [
      'Sacred Money Spending Plan: 10% tithe, 15% savings, 10% giving, 65% living',
      'True Cost Calculator: 4-year and 20-year Greek life costs',
      'Credit Repair Hub with dispute letter generator',
      'Debt Freedom Calculator: Snowball, Avalanche, Snowflake methods'
    ],
    stats: [
      { label: 'Budget Categories', value: '7' },
      { label: 'Debt Strategies', value: '3' },
      { label: 'Templates', value: 'FCRA' }
    ]
  },
  {
    id: 'app-chaplain-toolkit',
    title: 'Chapter Chaplain Toolkit',
    subtitle: 'On-Demand PDF Resources',
    icon: <FileText className="w-12 h-12 text-purple-500" />,
    route: '/chaplain-toolkit',
    showLivePreview: true,
    duration: '2-3 min',
    presenterNotes: [
      'PDF generator for chapter devotionals and resources',
      'Theology deep-dives on Greek-specific topics',
      'Ready-made meeting agendas and prayer guides',
      'Perfect for chapter chaplains and campus ministers'
    ],
    keyPoints: [
      'Generate devotionals for chapter meetings on-the-fly',
      'Theology resources on Greek-specific faith questions',
      'Meeting agendas, prayer guides, and study materials',
      'Download as PDF for offline use'
    ],
    talkingPoints: [
      'Chaplains often have no resources — we fix that',
      'Everything is biblical, practical, and culturally relevant',
      'Save hours of preparation time'
    ]
  },
  {
    id: 'app-community',
    title: 'Faith-Centered Community',
    subtitle: 'D9 Business Directory & Prayer Wall',
    icon: <Users2 className="w-12 h-12 text-pink-500" />,
    route: '/d9-directory',
    showLivePreview: true,
    duration: '2-3 min',
    presenterNotes: [
      'D9 Business Directory: Support Black Greek-owned businesses',
      'Prayer Wall: Community prayer support',
      'Member Network: Connect with faith-centered Greeks nationwide',
      'Forum discussions on faith + Greek topics'
    ],
    keyPoints: [
      'D9 Business Directory: 30+ featured Black Greek-owned businesses',
      'Prayer Wall: Share requests, receive encouragement',
      'Member Network: Connect across chapters and organizations',
      'Submit your own business for free listing'
    ],
    stats: [
      { label: 'Businesses', value: '30+' },
      { label: 'Prayer Wall', value: 'Active' },
      { label: 'Network', value: 'Nationwide' }
    ]
  },
  {
    id: 'app-gamification',
    title: 'Gamification & Engagement',
    subtitle: 'Badges, Streaks, Certificates',
    icon: <Award className="w-12 h-12 text-yellow-500" />,
    route: '/dashboard',
    showLivePreview: true,
    duration: '2-3 min',
    presenterNotes: [
      'Points system with leveling (100 pts per level)',
      'Achievement badges for completing courses and milestones',
      'Daily streaks encourage consistent engagement',
      'Master certificates upon curriculum completion'
    ],
    keyPoints: [
      'Points Roadmap: ~900 points across 5 learning paths',
      'Achievement badges: P.R.O.O.F. Master, Myth Buster, Faith Authority',
      'Daily streaks: Build consistent spiritual habits',
      'Printable certificates: Share your accomplishments'
    ],
    stats: [
      { label: 'Total Points', value: '~900' },
      { label: 'Learning Paths', value: '5' },
      { label: 'Certificates', value: 'Printable' }
    ]
  },
  {
    id: 'app-close',
    title: '100% Free to Start',
    subtitle: 'Progressive Web App — Install Now',
    icon: <Zap className="w-12 h-12 text-sacred" />,
    showQRCode: true,
    duration: '2-3 min',
    presenterNotes: [
      'All core features are FREE — no paywall',
      'PWA: Install on any device with one click',
      'Works offline for devotionals and resources',
      'QR code for instant installation'
    ],
    keyPoints: [
      '✓ All education content: FREE',
      '✓ Daily devotionals: FREE',
      '✓ Financial tools: FREE',
      '✓ Community features: FREE',
      'PWA: Install like a native app on any device'
    ],
    actionItems: [
      'Scan QR code to install immediately',
      'Share with your chapter and Greek community',
      'Start with Faith Snapshot — 2 minutes',
      'Begin your P.R.O.O.F. journey today'
    ],
    stats: [
      { label: 'Price', value: 'FREE' },
      { label: 'Platform', value: 'PWA' },
      { label: 'Install', value: '1 Click' }
    ]
  },

  // ============ SECTION 7: CLOSING & INSPIRATION (15 min) ============
  {
    id: 'call-to-understanding',
    title: 'A Call to Understanding',
    subtitle: 'What You Can Do Next',
    icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'Give them actionable next steps',
      'Non-Greek: Look at Greek organizations differently',
      'Greek: Share this perspective with skeptics',
      'Everyone: Be bridge builders, not wall builders'
    ],
    keyPoints: [
      'Non-Greek students: See Greek life with new eyes',
      'Greek students: Articulate your sacred mission',
      'Educators: Include Greek history in diversity curriculum',
      'Everyone: Be a bridge builder'
    ],
    actionItems: [
      'Have a conversation with someone from "the other side"',
      'Attend a Greek service event as a volunteer',
      'Read "Sacred Not Sinful" for deeper understanding',
      'Download the Sacred Greeks app today'
    ]
  },
  {
    id: 'vision',
    title: 'The Vision Forward',
    subtitle: 'Unity, Character, and Cultural Pride',
    icon: <Compass className="w-12 h-12 text-sacred" />,
    image: slideClose,
    duration: '3-4 min',
    presenterNotes: [
      'Paint the picture of a better future',
      'Campuses where Greek and non-Greek collaborate seamlessly',
      'Communities where Greek service is celebrated, not suspected',
      'A legacy that continues for another 100 years'
    ],
    keyPoints: [
      'Greek life as a living force for unity',
      'Character development that transcends letters',
      'Cultural pride that celebrates heritage',
      'A legacy worth understanding and continuing'
    ],
    talkingPoints: [
      'Imagine campuses united in purpose',
      'Imagine communities embracing Greek service',
      'Imagine the next 100 years of impact',
      'It starts with understanding'
    ]
  },
  {
    id: 'inspiration',
    title: 'Go Forth and Build Bridges',
    subtitle: 'From Understanding to Action',
    icon: <Sunrise className="w-12 h-12 text-amber-500" />,
    duration: '2-3 min',
    presenterNotes: [
      'This is the emotional peak — bring full energy',
      'Challenge them to be agents of understanding',
      'Quote or scripture if appropriate',
      'Leave them inspired to act'
    ],
    keyPoints: [
      'You now see what others miss',
      'You understand what others misinterpret',
      'You can bridge what others divide',
      'Go forth and tell the sacred story'
    ],
    talkingPoints: [
      'Knowledge is power — use it to build, not divide',
      'Understanding creates respect',
      'Respect creates partnership',
      'Partnership creates change'
    ]
  },
  {
    id: 'qa',
    title: 'Questions & Discussion',
    subtitle: 'Let\'s Continue the Conversation',
    icon: <Mic2 className="w-12 h-12 text-blue-500" />,
    image: slideQA,
    duration: '10-15 min',
    showQRCode: true,
    presenterNotes: [
      'Open the floor for questions',
      'Welcome challenges — they deepen understanding',
      'Point to resources: Book, podcast, website',
      'Collect contact info for follow-up'
    ],
    keyPoints: [
      'What questions do you have?',
      'What challenged your assumptions today?',
      'What will you do differently now?',
      'How can we continue this conversation?'
    ],
    talkingPoints: [
      'No question is off-limits',
      'Challenge leads to clarity',
      'Dialogue builds understanding',
      'This conversation doesn\'t end today'
    ]
  },
  {
    id: 'resources',
    title: 'Resources for Deeper Learning',
    subtitle: 'Continue the Journey',
    icon: <BookOpen className="w-12 h-12 text-teal-500" />,
    duration: '1-2 min',
    showQRCode: true,
    presenterNotes: [
      'Point to available resources',
      'Book: Sacred Not Sinful',
      'Podcast: Sacred Greeks Podcast',
      'Website: SacredGreeks.com'
    ],
    keyPoints: [
      'Book: "Sacred Not Sinful: A Biblical Response"',
      'Podcast: Sacred Greeks Podcast (all platforms)',
      'Website: SacredGreeks.com — Free resources',
      'Speaking: Invite Dr. Montgomery to your event'
    ],
    stats: [
      { label: 'Book', value: 'Amazon' },
      { label: 'Podcast', value: 'All Platforms' },
      { label: 'Website', value: 'SacredGreeks.com' }
    ],
    actionItems: [
      'Order the book for your library',
      'Subscribe to the podcast',
      'Explore the website\'s free resources',
      'Share with someone who needs to hear this message'
    ]
  },
  {
    id: 'thank-you',
    title: 'Thank You',
    subtitle: 'Understanding the Sacred Side of Greek Life',
    icon: <Flame className="w-12 h-12 text-sacred" />,
    duration: '1 min',
    presenterNotes: [
      'Express genuine gratitude',
      'Remind them of the journey we took together',
      'Close with a blessing or inspiring word if appropriate',
      'Make yourself available for one-on-one conversations'
    ],
    keyPoints: [
      'Thank you for investing 90 minutes',
      'Thank you for opening your minds',
      'Thank you for being bridge builders',
      'Go forth with understanding and purpose'
    ],
    talkingPoints: [
      'The sacred side of Greek life is now visible to you',
      'Share what you\'ve learned',
      'Build the bridges only you can build',
      'The legacy continues through you'
    ]
  }
];

export const getPresentationDuration = () => {
  return '~90 minutes';
};
