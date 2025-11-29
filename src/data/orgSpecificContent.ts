// Organization-specific content and scenarios tailored for different Greek councils

export interface OrgScenario {
  id: string;
  title: string;
  description: string;
  councils: string[]; // Which councils this applies to
  proofFocus: 'purpose' | 'relationships' | 'obedience' | 'opportunity' | 'freedom';
}

export interface CouncilContent {
  id: string;
  name: string;
  welcomeMessage: string;
  keyValues: string[];
  commonChallenges: string[];
  faithIntegrationTips: string[];
}

// Council-specific content
export const COUNCIL_CONTENT: Record<string, CouncilContent> = {
  nphc: {
    id: 'nphc',
    name: 'National Pan-Hellenic Council',
    welcomeMessage: 'Welcome, Divine Nine family! Your organization has a rich legacy of service, scholarship, and leadership rooted in the Black church tradition.',
    keyValues: [
      'Service to humanity',
      'Academic excellence',
      'Brotherhood/Sisterhood',
      'Community uplift',
      'Legacy and tradition'
    ],
    commonChallenges: [
      'Balancing organizational traditions with personal faith convictions',
      'Navigating questions about rituals and their spiritual significance',
      'Maintaining Christian witness during probate/intake processes',
      'Addressing criticisms from church members about Greek affiliation'
    ],
    faithIntegrationTips: [
      'Many NPHC founders were deeply rooted in Christian faith and church leadership',
      'Your organization\'s service projects align with biblical mandates to serve others',
      'Use your platform to be a witness for Christ among your chapter members',
      'Connect with other Christian Greeks in your org for mutual encouragement'
    ]
  },
  npc: {
    id: 'npc',
    name: 'National Panhellenic Conference',
    welcomeMessage: 'Welcome, sister! NPC sororities offer wonderful opportunities for friendship, leadership, and service.',
    keyValues: [
      'Sisterhood and friendship',
      'Personal development',
      'Academic achievement',
      'Philanthropic service',
      'Leadership opportunities'
    ],
    commonChallenges: [
      'Party culture and social expectations',
      'Maintaining modest standards in some chapter activities',
      'Finding Christian community within your chapter',
      'Balancing Greek social life with church involvement'
    ],
    faithIntegrationTips: [
      'Start or join a Bible study within your chapter',
      'Be intentional about inviting sisters to church events',
      'Use philanthropy events as opportunities to serve like Christ',
      'Set boundaries around social activities that conflict with your values'
    ]
  },
  nic: {
    id: 'nic',
    name: 'North American Interfraternity Conference',
    welcomeMessage: 'Welcome, brother! IFC fraternities can be places of genuine brotherhood and character development.',
    keyValues: [
      'Brotherhood and loyalty',
      'Leadership development',
      'Academic success',
      'Community service',
      'Personal integrity'
    ],
    commonChallenges: [
      'Navigating party and drinking culture',
      'Peer pressure around hazing or questionable traditions',
      'Maintaining Christian witness in a secular environment',
      'Finding accountability partners within the chapter'
    ],
    faithIntegrationTips: [
      'Be the brother who leads by example in character and integrity',
      'Connect with campus ministry groups like Greek IV or Chi Alpha',
      'Start a men\'s Bible study or prayer group in your chapter',
      'Use your influence to push back against harmful traditions'
    ]
  },
  nalfo: {
    id: 'nalfo',
    name: 'National Association of Latino Fraternal Organizations',
    welcomeMessage: '¡Bienvenido! Your Latino/a Greek organization celebrates cultural heritage while fostering academic and professional excellence.',
    keyValues: [
      'Cultural pride and heritage',
      'Academic excellence',
      'Community service',
      'Professional development',
      'Familia (Brotherhood/Sisterhood)'
    ],
    commonChallenges: [
      'Integrating cultural traditions with Christian faith',
      'Navigating family expectations around religious involvement',
      'Finding ways to honor heritage while maintaining biblical convictions',
      'Balancing organizational and church community involvement'
    ],
    faithIntegrationTips: [
      'Your faith can inform and enrich your cultural identity',
      'Many Latino communities have deep Christian roots - embrace both',
      'Use cultural events as opportunities to share your testimony',
      'Connect with Hispanic/Latino Christian campus ministries'
    ]
  },
  napa: {
    id: 'napa',
    name: 'National APIA Panhellenic Association',
    welcomeMessage: 'Welcome! Your Asian/Pacific Islander Greek organization bridges cultural heritage with American collegiate life.',
    keyValues: [
      'Cultural awareness and pride',
      'Academic achievement',
      'Community service',
      'Professional networking',
      'Brotherhood/Sisterhood'
    ],
    commonChallenges: [
      'Family expectations around faith and religious involvement',
      'Navigating cultural vs. Christian identity',
      'Finding community where both identities are celebrated',
      'Addressing misconceptions about Christianity in Asian cultures'
    ],
    faithIntegrationTips: [
      'Christianity has a rich history in many Asian cultures',
      'Your unique perspective can be a bridge for the Gospel',
      'Connect with Asian American Christian fellowships on campus',
      'Honor your parents while also honoring God in your decisions'
    ]
  },
  nmgc: {
    id: 'nmgc',
    name: 'National Multicultural Greek Council',
    welcomeMessage: 'Welcome! Your multicultural organization celebrates diversity and brings together students from all backgrounds.',
    keyValues: [
      'Diversity and inclusion',
      'Cultural celebration',
      'Academic success',
      'Community service',
      'Unity across differences'
    ],
    commonChallenges: [
      'Navigating diverse religious viewpoints within the chapter',
      'Being a Christian witness in a pluralistic environment',
      'Finding common ground while maintaining convictions',
      'Addressing questions about religious exclusivity'
    ],
    faithIntegrationTips: [
      'Your diverse community is an opportunity to share Christ\'s love with many',
      'Respect others\' backgrounds while being confident in your faith',
      'Look for ways to serve that demonstrate Christ\'s character',
      'Build genuine friendships as a foundation for spiritual conversations'
    ]
  },
  professional: {
    id: 'professional',
    name: 'Professional Greek Organizations',
    welcomeMessage: 'Welcome! Your professional fraternity or sorority focuses on career development and industry excellence.',
    keyValues: [
      'Professional excellence',
      'Networking and mentorship',
      'Academic achievement',
      'Industry advancement',
      'Career preparation'
    ],
    commonChallenges: [
      'Integrating faith in professional contexts',
      'Maintaining integrity in competitive environments',
      'Finding work-life-faith balance',
      'Being a witness in secular professional settings'
    ],
    faithIntegrationTips: [
      'Your career is a platform for Kingdom impact',
      'Excellence in your field honors God and opens doors',
      'Use networking opportunities to build meaningful relationships',
      'Seek mentors who integrate faith and professional success'
    ]
  },
  honor: {
    id: 'honor',
    name: 'Honor Societies',
    welcomeMessage: 'Welcome! Your honor society recognizes academic achievement and leadership potential.',
    keyValues: [
      'Academic excellence',
      'Scholarly achievement',
      'Leadership',
      'Service',
      'Character'
    ],
    commonChallenges: [
      'Pride and academic arrogance',
      'Finding purpose beyond achievements',
      'Using intelligence for Kingdom purposes',
      'Remaining humble in success'
    ],
    faithIntegrationTips: [
      'All wisdom ultimately comes from God',
      'Use your academic gifts to serve others and glorify God',
      'Academic success is a stewardship responsibility',
      'Mentor others and share what you\'ve learned'
    ]
  },
  other: {
    id: 'other',
    name: 'Greek Letter Organizations',
    welcomeMessage: 'Welcome! Whatever your Greek affiliation, Sacred Greeks is here to help you integrate faith with your organizational experience.',
    keyValues: [
      'Brotherhood/Sisterhood',
      'Service',
      'Leadership',
      'Personal development',
      'Community'
    ],
    commonChallenges: [
      'Finding Christian community within your organization',
      'Navigating traditions and rituals',
      'Maintaining faith convictions in Greek culture',
      'Being a witness to fellow members'
    ],
    faithIntegrationTips: [
      'Your Greek experience can be an opportunity for spiritual growth',
      'Look for other Christians in your organization',
      'Use your influence to promote positive change',
      'Stay connected to your church and faith community'
    ]
  }
};

// Universal scenarios that apply to all councils
export const UNIVERSAL_SCENARIOS: OrgScenario[] = [
  {
    id: 'ritual-concerns',
    title: 'Ritual and Tradition Concerns',
    description: 'How to approach organizational rituals with faith integrity',
    councils: ['all'],
    proofFocus: 'obedience'
  },
  {
    id: 'party-culture',
    title: 'Navigating Party Culture',
    description: 'Maintaining Christian values in social environments',
    councils: ['all'],
    proofFocus: 'freedom'
  },
  {
    id: 'family-criticism',
    title: 'Church & Family Criticism',
    description: 'Responding to criticism about your Greek involvement',
    councils: ['all'],
    proofFocus: 'relationships'
  },
  {
    id: 'leadership-opportunity',
    title: 'Leadership as Ministry',
    description: 'Using your leadership position for Kingdom impact',
    councils: ['all'],
    proofFocus: 'opportunity'
  },
  {
    id: 'finding-purpose',
    title: 'Finding Purpose in Membership',
    description: 'Discovering God\'s purpose for your Greek experience',
    councils: ['all'],
    proofFocus: 'purpose'
  }
];

// Council-specific scenarios
export const COUNCIL_SCENARIOS: OrgScenario[] = [
  // NPHC-specific
  {
    id: 'nphc-church-roots',
    title: 'Honoring Our Church Roots',
    description: 'Connecting your org\'s history to its Christian founders',
    councils: ['nphc'],
    proofFocus: 'purpose'
  },
  {
    id: 'nphc-stepping-faith',
    title: 'Stepping & Faith Expression',
    description: 'Using step shows and strolls for positive expression',
    councils: ['nphc'],
    proofFocus: 'freedom'
  },
  {
    id: 'nphc-probate-witness',
    title: 'Witness During New Member Process',
    description: 'Maintaining your testimony during intake',
    councils: ['nphc'],
    proofFocus: 'obedience'
  },
  // NPC/NIC-specific
  {
    id: 'greek-week-boundaries',
    title: 'Greek Week & Social Events',
    description: 'Setting boundaries during major Greek events',
    councils: ['npc', 'nic'],
    proofFocus: 'freedom'
  },
  {
    id: 'recruitment-integrity',
    title: 'Recruitment with Integrity',
    description: 'Being authentic during rush and recruitment',
    councils: ['npc', 'nic'],
    proofFocus: 'relationships'
  },
  // Cultural org-specific
  {
    id: 'cultural-faith-bridge',
    title: 'Bridging Culture & Faith',
    description: 'Integrating cultural heritage with Christian identity',
    councils: ['nalfo', 'napa', 'nmgc'],
    proofFocus: 'purpose'
  },
  {
    id: 'cultural-events-witness',
    title: 'Cultural Events as Witness',
    description: 'Using cultural celebrations for Gospel conversations',
    councils: ['nalfo', 'napa', 'nmgc'],
    proofFocus: 'opportunity'
  }
];

// Get content for a specific council
export function getCouncilContent(councilId: string): CouncilContent {
  return COUNCIL_CONTENT[councilId] || COUNCIL_CONTENT['other'];
}

// Get scenarios for a specific council
export function getScenariosForCouncil(councilId: string): OrgScenario[] {
  const universalScenarios = UNIVERSAL_SCENARIOS;
  const councilSpecific = COUNCIL_SCENARIOS.filter(
    s => s.councils.includes(councilId) || s.councils.includes('all')
  );
  return [...universalScenarios, ...councilSpecific];
}

// Get welcome message based on user's council
export function getWelcomeMessage(councilId: string, orgName?: string): string {
  const content = getCouncilContent(councilId);
  if (orgName) {
    return `${content.welcomeMessage} As a member of ${orgName}, you're part of a special community.`;
  }
  return content.welcomeMessage;
}

// Get personalized tips based on council
export function getFaithIntegrationTips(councilId: string): string[] {
  const content = getCouncilContent(councilId);
  return content.faithIntegrationTips;
}

// Get common challenges for a council
export function getCommonChallenges(councilId: string): string[] {
  const content = getCouncilContent(councilId);
  return content.commonChallenges;
}
