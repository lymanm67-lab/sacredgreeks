/**
 * PROOF Command Center — Demo Showcase Data
 * Rich scenario-based demo outputs for AI Workers in Demo/Presentation mode.
 * Includes: scenarios, examples, pitfalls, and tools for each worker.
 */

import type { WorkerType, AudienceType, ClaimCategory, WorkerResult } from '@/pages/AIWorkers';

export interface DemoScenario {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  workerType: WorkerType;
  audience: AudienceType;
  claim: ClaimCategory;
  description: string;
  pitfalls: string[];
  tools: string[];
  result: WorkerResult;
}

// ─── DEMO HISTORY ───────────────────────────────────────────
export const DEMO_HISTORY = [
  { id: 'demo-1', worker_type: 'ritual_oath_coach', title: 'Ritual & Oath Clarity: portals (Pastor)', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'demo-2', worker_type: 'founders_guide', title: 'Founders & History: founders masonry', created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: 'demo-3', worker_type: 'conversation_coach', title: 'Conversation Script: parent (oaths)', created_at: new Date(Date.now() - 259200000).toISOString() },
  { id: 'demo-4', worker_type: 'study_navigator', title: 'Study Plan Navigator', created_at: new Date(Date.now() - 345600000).toISOString() },
  { id: 'demo-5', worker_type: 'ritual_oath_coach', title: 'Ritual & Oath Clarity: deity names (Friend)', created_at: new Date(Date.now() - 432000000).toISOString() },
];

// ─── SCENARIO LIBRARY ───────────────────────────────────────
export const DEMO_SCENARIOS: DemoScenario[] = [
  // ━━━ Scenario 1: Pastor says rituals open portals ━━━
  {
    id: 'pastor-portals',
    title: '"My Pastor Says Our Rituals Open Demonic Portals"',
    subtitle: 'The most common confrontation — handled with grace',
    emoji: '⛪',
    workerType: 'ritual_oath_coach',
    audience: 'pastor',
    claim: 'portals',
    description: 'A member\'s pastor has declared that Greek rituals are demonic doorways. The member needs a thoughtful, non-combative response grounded in the PROOF framework.',
    pitfalls: [
      'Arguing that the pastor is wrong — creates defensiveness',
      'Claiming spiritual certainty about what rituals "actually do"',
      'Dismissing the pastor\'s genuine concern for their flock',
      'Using secular arguments when the audience expects biblical grounding',
    ],
    tools: [
      'PROOF Breakdown Card — shows the 5 lenses for examining rituals',
      'Boundary Statement Generator — "I hear your concern and I respect your role…"',
      'Scripture Cross-Reference — relevant passages on discernment',
      'Next Steps Planner — suggest a follow-up Bible study together',
    ],
    result: {
      output: {
        sixtySecondResponse: "I really appreciate you caring enough to bring this up, Pastor. I've been studying the PROOF framework to examine my Greek life through a biblical lens. The rituals in my organization are primarily ceremonial traditions — similar to how many churches use candles, robes, and responsive readings. They don't invoke spiritual entities or require spiritual allegiance. I'd love to sit down with you and walk through what I've found, because your guidance matters to me.",
        fiveMinuteResponse: "Thank you for raising this, Pastor. I know it comes from a place of genuine care, and I want to honor that.\n\nThe concern about \"portals\" often comes from associating ceremony with occult practice. But let me share what I've learned through the PROOF framework:\n\n**Context matters.** Many Greek rituals involve candle-lighting, recitations, and symbolic gestures — much like liturgical church traditions. The presence of ceremony does not equal the presence of occult intent.\n\n**Language matters.** Terms like \"secret\" or \"sacred\" can sound alarming, but secrecy in fraternal organizations often protects membership experiences, not spiritual doctrine. It's comparable to a church's confirmation class materials being reserved for participants.\n\n**History matters.** Most D9 organizations were founded during an era when Black Americans were excluded from civic institutions. These organizations provided mutual aid, burial insurance, and networking — practical survival tools wrapped in dignifying ceremony.\n\n**My personal conviction:** I have examined my organization's rituals and found nothing that asks me to worship, invoke, or pledge allegiance to any entity other than the values of scholarship, service, and community. My faith in Christ remains first.\n\nI would welcome the chance to study this together with you. Your pastoral wisdom combined with what I've researched could be a powerful testimony for others wrestling with this same question.",
        proofBreakdown: {
          P: "**Pledge Process**: Greek intake processes involve commitment to organizational values (service, scholarship, community). These are character commitments, not spiritual covenants. Similar to church membership vows where you commit to support the body, attend worship, and give generously.",
          R: "**Rituals**: Ceremonial practices in Greek organizations typically include symbolic gestures, candle lighting, and recitations of organizational history. These are not liturgical in the religious sense — they don't invoke spiritual powers or require spiritual submission. Compare: a graduation ceremony has robes, processions, and solemn oaths but is not a religious ritual.",
          O_oaths: "**Oaths**: Organizational pledges typically involve commitments to uphold values, maintain confidentiality of membership traditions, and support fellow members. These do not replace or compete with baptismal vows or covenant with Christ. Scripture addresses reckless oaths (James 5:12) but also honors covenant-keeping (Psalm 15:4).",
          O_obscurity: "**Obscurity**: Confidentiality in Greek organizations protects membership experiences and organizational heritage. This is distinct from occult secrecy which hides doctrine. Many churches also have confidential processes (elder meetings, counseling records, membership committees).",
          F: "**Founders**: Many D9 founders were active churchgoers, AME and Baptist leaders, and educators at historically Black colleges. Their motivation was community uplift during Jim Crow, not spiritual subversion."
        },
        dialogueQuestions: [
          "Pastor, what specific aspect of Greek rituals concerns you most — and have you had a chance to review any primary source materials from the organization itself?",
          "How do you distinguish between ceremony (like what we see in church traditions) and occult practice? I'd love to understand your framework for that distinction.",
          "Would you be open to studying this together — perhaps a Bible study series where we examine fraternal practices through Scripture?"
        ],
        boundaryStatement: "I deeply respect your pastoral authority in my spiritual life, and I want you to know that my Greek membership has never been asked to compete with my faith. I'm committed to examining everything through Scripture. At the same time, I'd appreciate the chance to share what I've actually experienced rather than what's been assumed.",
        prayer: "Lord, grant me wisdom and humility in this conversation. Help me honor my pastor's concern while speaking truth about my experience. Let Your peace guard this relationship, and let Your Word be the final authority for both of us. Help us seek understanding together rather than division. In Jesus' name, Amen.",
        nextSteps: [
          "Take the PROOF Course — complete the Rituals module for deeper grounding",
          "Share the 'Myth Busters: Rituals' resource with your pastor",
          "Schedule a follow-up conversation after both of you have reviewed the materials",
          "Journal your reflections in the Prayer Journal"
        ],
        citationsUsed: ["PROOF Framework: Rituals Module", "Objection Card: Portals", "Scripture: James 5:12, Psalm 15:4, 1 Thessalonians 5:21"]
      },
      citations: [
        { title: "PROOF Framework: Rituals Module", section: "Ceremonial vs. Spiritual Practice", lastUpdated: "2026-01-15", type: "lesson", tier: 1 },
        { title: "Objection Card: Portals & Rituals", section: "PROOF Framework", lastUpdated: "2026-02-01", type: "objection_card", tier: 1 },
        { title: "Historical Context: D9 Founding Era", section: "Founders & Mutual Aid", lastUpdated: "2026-01-20", type: "article", tier: 1 },
        { title: "Scripture Reference Guide", section: "Discernment Passages", lastUpdated: "2026-02-10", type: "scripture", tier: 1 },
      ],
      escalated: false,
      runId: 'demo-run-001',
    },
  },

  // ━━━ Scenario 2: Parent worried about oaths ━━━
  {
    id: 'parent-oaths',
    title: '"Your Oaths Replace Your Baptism"',
    subtitle: 'When family fears compete with fellowship',
    emoji: '👨‍👩‍👧',
    workerType: 'ritual_oath_coach',
    audience: 'parent',
    claim: 'oaths',
    description: 'A parent (often deeply devout) believes their child\'s Greek oaths are replacing their baptismal covenant with Christ.',
    pitfalls: [
      'Being dismissive of parental concern — "You don\'t understand"',
      'Comparing church to a fraternity in a way that trivializes faith',
      'Getting defensive instead of curious about what specifically concerns them',
      'Quoting Scripture AT your parent rather than studying WITH them',
    ],
    tools: [
      'Audience Tone Adapter — softens language for family conversations',
      'Oath Comparison Chart — baptismal vs. organizational commitments',
      'PROOF "O" Deep Dive — Oaths lens analysis',
      'Family Conversation Prep Guide',
    ],
    result: {
      output: {
        sixtySecondResponse: "Mom/Dad, I hear you, and I want you to know — nothing replaces my baptism. The commitment I made at my baptism is to Christ, and that's eternal. The pledge I made to my organization is a commitment to serve, to excel in school, and to uplift my community. They operate in completely different categories. I'd love to show you exactly what I committed to.",
        fiveMinuteResponse: "I really appreciate you bringing this up because it shows how much you care about my faith — and I want you to know I care about it just as deeply.\n\nLet me explain the difference as I've come to understand it:\n\n**Baptismal covenant** is a spiritual commitment to Christ — it's about salvation, surrender, and eternal relationship with God. Nothing in my Greek life touches that.\n\n**Organizational commitment** is a civic/social pledge to uphold values like academic excellence, community service, and brotherhood/sisterhood. Think of it like the Pledge of Allegiance — it's a commitment to shared values, not a spiritual covenant.\n\n**What the oath actually says:** Most D9 organizational pledges involve committing to uphold the organization's ideals, supporting fellow members, and maintaining confidentiality about membership traditions. These are character commitments, not creedal statements.\n\n**What Scripture says about oaths:** James 5:12 cautions against reckless swearing. But Psalm 15:4 honors the person who \"keeps an oath even when it hurts.\" The issue isn't making commitments — it's making commitments that contradict God's word. My Greek commitment does not.\n\nI'd love for us to pray about this together and even look at the actual materials side by side.",
        proofBreakdown: {
          P: "The pledge process involves a commitment period focused on learning organizational history, values, and traditions — similar to a new member class at church.",
          R: "Rituals mark transitions (initiation, graduation of process) — parallel to how churches mark baptism, communion, and confirmation.",
          O_oaths: "Oaths in Greek life are commitments to uphold values and support the community. They do not invoke spiritual entities, replace baptism, or require spiritual allegiance. The content is civic, not creedal.",
          O_obscurity: "Some traditions are kept confidential to preserve the membership experience, not to hide theological content.",
          F: "Founders created these organizations with service and uplift as core missions during times of extreme social exclusion."
        },
        dialogueQuestions: [
          "What specifically about the oath concerns you most — is it the concept of making a pledge, or something specific you've heard about what the pledge contains?",
          "Would it help if I showed you the values I committed to? I think you'd find they align with what you raised me to believe.",
          "Can we study James 5:12 and Psalm 15:4 together to understand what Scripture says about making commitments?"
        ],
        boundaryStatement: "I love you and I value your faith perspective deeply. I want you to know that I've examined my Greek commitments through Scripture and found nothing that contradicts my walk with Christ. I'm always open to studying this together, and I'll never stop valuing your input in my spiritual journey.",
        prayer: "Father, thank You for parents who care this deeply about my faith. Give me the words to honor their concern while sharing my truth. Let this conversation strengthen our family bond rather than strain it. Guide us both into deeper understanding of Your word. In Jesus' name, Amen.",
        nextSteps: [
          "Complete the PROOF 'Oaths' module and share your certificate",
          "Download the Family Conversation Guide PDF",
          "Invite your parent to review the PROOF course overview together",
          "Bookmark the Oath Comparison resource for follow-up"
        ],
        citationsUsed: ["PROOF Framework: Oaths Module", "Objection Card: Oaths", "Scripture: James 5:12, Psalm 15:4"]
      },
      citations: [
        { title: "PROOF Framework: Oaths Module", section: "Civic vs. Spiritual Commitments", lastUpdated: "2026-01-15", type: "lesson", tier: 1 },
        { title: "Objection Card: Oaths & Allegiance", section: "PROOF Framework", lastUpdated: "2026-02-01", type: "objection_card", tier: 1 },
        { title: "Scripture Reference Guide", section: "Oaths & Commitments", lastUpdated: "2026-02-10", type: "scripture", tier: 1 },
      ],
      escalated: false,
      runId: 'demo-run-002',
    },
  },

  // ━━━ Scenario 3: Founders & Masonry ━━━
  {
    id: 'founders-masonry',
    title: '"The Founders Were All Masons — It\'s a Pipeline"',
    subtitle: 'The most historically complex claim — handled with nuance',
    emoji: '🧱',
    workerType: 'founders_guide',
    audience: 'friend',
    claim: 'founders_masonry',
    description: 'A peer claims that all D9 founders were Freemasons and that Greek organizations are feeder systems into Masonry.',
    pitfalls: [
      'Outright denying any historical connections without evidence',
      'Conflating membership overlap with organizational conspiracy',
      'Ignoring the genuine historical context of Black fraternal networks',
      'Making claims about Masonry\'s spiritual nature without approved sources',
    ],
    tools: [
      'Historical Context Engine — curated facts about the founding era',
      'Mutual Aid Timeline — why fraternal networks existed',
      'Citation Validator — flags unsourced claims automatically',
      'Nuance Meter — helps distinguish fact from speculation',
    ],
    result: {
      output: {
        historicalContext: "The early 1900s was a period of extreme racial exclusion in America. Black Americans were denied access to mainstream insurance, banking, professional networks, and civic institutions. Fraternal organizations — including Masonic lodges, Elks, Odd Fellows, and eventually Greek-letter organizations — provided critical mutual aid infrastructure: burial insurance, emergency funds, professional networking, and community organizing.\n\nIn this context, some founders of D9 organizations were indeed members of fraternal lodges, including Masonic lodges. However, this reflects the reality of the era's limited options for Black civic participation, not evidence of an organizational conspiracy or spiritual pipeline.",
        foundersAnalysis: "Based on approved historical sources:\n\n- **Some founders** of certain D9 organizations had documented Masonic affiliations. This is historical fact, not hidden information.\n- **Membership overlap** between civic organizations was common and expected in early 20th century Black communities. Many of the same leaders were also active in churches, the NAACP, and professional associations.\n- **Organizational charters** of D9 organizations do not reference Masonic ritual, doctrine, or hierarchy. They were independently chartered with distinct missions focused on scholarship, service, and community uplift.\n- **The \"pipeline\" claim** requires evidence of systematic institutional connection. No approved source supports this claim. Individual dual membership ≠ organizational conspiracy.",
        masonryConnection: "**What we know (sourced):**\n- Some founders held Masonic membership — documented in historical records\n- Masonic lodges were among the few civic institutions available to Black men in the Jim Crow era\n- There are symbolic similarities (Greek letters, handshakes, secrecy) that reflect shared fraternal culture of the era, not direct lineage\n\n**What we cannot confirm (unsourced — flagged for admin review):**\n- Claims that specific rituals were \"borrowed from\" Masonic practice\n- Assertions that current organizational leadership maintains Masonic ties\n- Statements about the spiritual nature of Masonic practice itself",
        mutualAidContext: "In an era when Black families could not purchase life insurance from mainstream companies, fraternal organizations provided:\n- **Burial insurance** — ensuring dignified funeral services\n- **Emergency mutual aid** — funds for families facing crisis\n- **Professional networking** — connections for employment in a segregated economy\n- **Community organizing** — platforms for civil rights advocacy\n\nThis context doesn't justify or condemn any organization — it explains *why* fraternal networks were essential survival infrastructure for Black communities.",
        proofBreakdown: {
          P: "Pledge processes in D9 organizations are independently structured and do not reference Masonic intake processes.",
          R: "While some symbolic parallels exist (ceremony, regalia), these reflect shared fraternal culture rather than direct borrowing.",
          O_oaths: "D9 organizational oaths focus on values and community commitment, distinct from Masonic obligations.",
          O_obscurity: "Confidentiality practices are common across all fraternal organizations and are not unique to Masonic influence.",
          F: "Founders operated in a context where Masonic lodges were among the most accessible civic institutions. Dual membership reflects era-appropriate civic engagement, not conspiracy."
        },
        dialogueQuestions: [
          "When you say 'pipeline,' what specific evidence are you drawing from? I'd like to understand the claim fully before responding.",
          "Did you know that many of these same founders were also church deacons, NAACP leaders, and educators? How do we account for all of their affiliations, not just one?",
          "What would it take for you to distinguish between 'some founders were also Masons' and 'the organization IS Masonic'?"
        ],
        boundaryStatement: "I think it's important to distinguish between historical fact and conspiratorial narrative. I'm happy to examine documented history together, but I'm not willing to accept unsourced claims as fact — regardless of how widely they're shared.",
        prayer: "Lord, grant me wisdom to handle historical complexity with honesty. Help me honor the legacy of those who built these institutions while keeping my eyes fixed on You. Give me the courage to say 'I don't know' when I truly don't, and the discernment to distinguish fact from speculation. Amen.",
        unsourcedClaims: [
          "Specific ritual borrowing from Masonic practice — needs admin review for primary sources",
          "Current organizational leadership Masonic ties — no approved source available",
        ],
        nextSteps: [
          "Explore the 'Founders & History' section of the PROOF Course",
          "Read the 'Economic History of Black Fraternal Networks' article",
          "Review the Historical Mutual Aid timeline",
          "Bookmark the Citation Guide for future conversations"
        ],
        citationsUsed: ["Historical Context: D9 Founding Era", "Objection Card: Founders & Masonry", "PROOF Framework: Founders Module"]
      },
      citations: [
        { title: "Historical Context: D9 Founding Era", section: "Fraternal Networks & Mutual Aid", lastUpdated: "2026-01-20", type: "article", tier: 1 },
        { title: "Objection Card: Founders & Masonry", section: "PROOF Framework", lastUpdated: "2026-02-01", type: "objection_card", tier: 1 },
        { title: "PROOF Framework: Founders Module", section: "Historical Context", lastUpdated: "2026-01-15", type: "lesson", tier: 1 },
        { title: "Mutual Aid Networks in Jim Crow America", section: "Fraternal Organizations", lastUpdated: "2026-01-10", type: "curated_external", tier: 4 },
      ],
      escalated: false,
      runId: 'demo-run-003',
    },
  },

  // ━━━ Scenario 4: Conversation Coach — Spouse ━━━
  {
    id: 'spouse-secrecy',
    title: '"Why Can\'t You Tell Me What Happens?" — Spouse',
    subtitle: 'When secrecy strains the most intimate relationship',
    emoji: '💍',
    workerType: 'conversation_coach',
    audience: 'spouse',
    claim: 'secrecy',
    description: 'A spouse feels excluded and concerned about the confidential aspects of Greek membership. They want transparency but feel shut out.',
    pitfalls: [
      'Dismissing their feelings with "you wouldn\'t understand"',
      'Breaking organizational confidentiality to prove a point',
      'Making it about the organization instead of the relationship',
      'Failing to acknowledge that their concern comes from love',
    ],
    tools: [
      'Spouse Tone Calibrator — prioritizes emotional safety',
      'Transparency Spectrum — what you CAN share vs. what\'s confidential',
      'Relationship-First Framework — lead with connection, not information',
      'Follow-Up Prompt Generator — continue the conversation later',
    ],
    result: {
      output: {
        openingApproach: "Start by acknowledging their feelings FIRST, before explaining anything about the organization. Something like: 'I hear you, and your feelings are completely valid. I never want you to feel shut out of my life. Let me share what I can, and more importantly, let me show you why this matters to me.'",
        keyTalkingPoints: [
          "Your feelings matter more to me than any organizational tradition — I want you to know that.",
          "There are things I can share: our values, our service projects, our community impact, and why I'm passionate about my membership.",
          "The confidential parts are mostly about the membership experience itself — similar to how a surprise party loses its magic if you describe it beforehand.",
          "My Greek life has never asked me to keep secrets FROM you — it's asked me to preserve shared experiences FOR the community.",
          "I want us to be a team on this. Can I show you the parts of my Greek life that you CAN be part of?"
        ],
        responsesToExpect: [
          "'But if it's not bad, why can't you just tell me?' — Response: 'It's not about it being bad. It's about preserving a shared experience that means something to the people in it. But I never want that to create distance between us.'",
          "'I've read online that these organizations do terrible things.' — Response: 'I understand that some things online can be alarming. I'd love to look at those sources together and I'll be honest about what I know from my actual experience.'",
          "'It feels like you're choosing them over me.' — Response: 'I never want you to feel that way. You are my priority. Let me think about how I can include you more in the parts of my Greek life that are open.'"
        ],
        questionsToAsk: [
          "What specifically worries you most — the secrecy itself, or something you've heard about what might be hidden?",
          "Would it help if you came to some of our public events so you can see the community firsthand?",
          "What would 'enough transparency' look like for you? I want to find a middle ground that honors both of us."
        ],
        boundaryStatements: [
          "I love you and I'm committed to being as transparent as I can. There are a few traditions I've committed to keeping within the organization, and I'd like you to trust me that they don't involve anything that contradicts our faith or our marriage.",
          "I won't let any organization come between us. If at any point you feel that's happening, I want you to tell me and we'll address it together."
        ],
        closingPrayer: "Lord, protect this marriage and this conversation. Help me show my spouse that they are first in my life after You. Give me wisdom to be transparent where I can and gracious where I can't. Let our love be strengthened, not strained, by this conversation. In Jesus' name, Amen.",
        toneGuidance: "**Lead with warmth, not defense.** Your spouse isn't attacking your organization — they're expressing a need for closeness. Every response should communicate: 'You matter more to me than any tradition.' Avoid organizational jargon. Speak in relationship language.",
        whatToAvoid: [
          "Don't say: 'You just don't understand Greek life' — this is dismissive",
          "Don't compare their concern to jealousy — this trivializes real feelings",
          "Don't make promises you can't keep about sharing everything",
          "Don't get defensive about the organization instead of focusing on the relationship",
          "Don't bring up what they 'should have known before we got married'"
        ],
        citationsUsed: ["Conversation Script: Spouse + Secrecy", "PROOF Framework: Obscurity Module"]
      },
      citations: [
        { title: "Conversation Script: Spouse + Secrecy", section: "Relationship-First Approach", lastUpdated: "2026-02-01", type: "conversation_script", tier: 1 },
        { title: "PROOF Framework: Obscurity Module", section: "Confidentiality vs. Secrecy", lastUpdated: "2026-01-15", type: "lesson", tier: 1 },
      ],
      escalated: false,
      runId: 'demo-run-004',
    },
  },

  // ━━━ Scenario 5: Deity Names — Friend ━━━
  {
    id: 'friend-deity-names',
    title: '"You\'re Invoking Greek Gods — That\'s Idolatry"',
    subtitle: 'Naming confusion: symbols vs. worship',
    emoji: '🏛️',
    workerType: 'ritual_oath_coach',
    audience: 'friend',
    claim: 'deity_names',
    description: 'A friend points to deity names (Athena, Apollo, Minerva) used in Greek organizations and concludes the members are worshipping pagan gods.',
    pitfalls: [
      'Laughing off the concern — "nobody actually worships Athena"',
      'Not acknowledging that naming DOES carry symbolic weight',
      'Failing to distinguish between reference and reverence',
      'Getting into a debate about mythology instead of staying grounded in Scripture',
    ],
    tools: [
      'Symbol vs. Worship Explainer — key distinction framework',
      'Name Origin Guide — why organizations chose their names',
      'Scripture on Idolatry — 1 Corinthians 8 context',
      'Analogies Library — everyday examples of symbolic naming',
    ],
    result: {
      output: {
        sixtySecondResponse: "That's a fair question, and I'm glad you asked. Using a name as a symbol is very different from worshipping what that name represents. We don't invoke Athena any more than someone driving a Mercury car invokes a Roman god, or a company named Nike worships the Greek goddess of victory. Paul actually addressed this in 1 Corinthians 8 — he acknowledged that 'an idol is nothing at all in the world' while still respecting the conscience of those who see it differently.",
        fiveMinuteResponse: "I really appreciate you raising this — it shows you care about guarding against idolatry, and that's a good instinct.\n\nLet me offer some perspective:\n\n**Naming ≠ Worshipping.** Our culture is full of references to ancient mythology that carry zero spiritual content: Nike shoes (Greek goddess of victory), Amazon (Greek warrior women), Mercury cars, Apollo space missions, Athena health systems. Nobody worships these entities — the names reference qualities like strength, wisdom, or victory.\n\n**Greek organizations chose names** to represent ideals: wisdom, light, excellence. The name points to the VALUE, not the deity.\n\n**What Scripture says:** In 1 Corinthians 8:4-6, Paul writes: 'We know that an idol is nothing at all in the world and that there is no God but one.' Paul lived in a city FULL of temples to Greek gods, and he didn't tell believers to avoid all cultural references — he told them to guard their hearts and not participate in actual worship.\n\n**My personal practice:** I've examined my organization's use of symbolic names and I'm confident that no worship, invocation, or spiritual allegiance to any deity takes place. The names are cultural references to ideals, not objects of devotion.\n\n**That said:** If this is a stumbling block for your conscience (as Paul discusses in the same chapter), that's worth respecting. We can disagree on the significance of naming while still walking together in faith.",
        proofBreakdown: {
          P: "The pledge process does not involve invoking deities or pledging allegiance to mythological figures.",
          R: "Rituals reference organizational symbols and history, not mythological worship practices.",
          O_oaths: "Oaths are made to organizational values and community, not to named deities.",
          O_obscurity: "Symbolic naming is part of organizational identity, not hidden spiritual practice.",
          F: "Founders chose names that symbolized aspirational qualities valued in academic and civic life — wisdom, light, perseverance."
        },
        dialogueQuestions: [
          "When you see a Nike swoosh, do you think the person wearing it is worshipping a Greek goddess? What makes organizational naming different?",
          "Have you read 1 Corinthians 8 recently? Paul's nuanced view on cultural symbols might surprise you — can we look at it together?",
          "What would help you feel more comfortable — learning about what actually happens in our meetings, or studying what Scripture says about cultural naming?"
        ],
        boundaryStatement: "I respect your concern about idolatry — it's a serious topic. I've examined my Greek life through Scripture and I'm confident no worship of any deity takes place. I'm happy to explore this together, but I won't accept the premise that using a name automatically means worshipping what it originally represented.",
        prayer: "Father, thank You for friends who care about holiness. Help me explain the difference between symbol and worship with clarity and grace. Guard my own heart against any form of idolatry, and help my friend and me grow closer to You through this conversation. Amen.",
        nextSteps: [
          "Study 1 Corinthians 8 in the Bible Study section",
          "Review the Symbol Guide for deeper context",
          "Take the PROOF 'Rituals' module to strengthen your understanding",
          "Share the 'Myth Busters: Deity Names' card with your friend"
        ],
        citationsUsed: ["PROOF Framework: Rituals Module", "Objection Card: Deity Names", "Scripture: 1 Corinthians 8:4-6"]
      },
      citations: [
        { title: "PROOF Framework: Rituals Module", section: "Symbols vs. Worship", lastUpdated: "2026-01-15", type: "lesson", tier: 1 },
        { title: "Objection Card: Deity Names", section: "PROOF Framework", lastUpdated: "2026-02-01", type: "objection_card", tier: 1 },
        { title: "Scripture Reference Guide", section: "1 Corinthians 8:4-6", lastUpdated: "2026-02-10", type: "scripture", tier: 1 },
      ],
      escalated: false,
      runId: 'demo-run-005',
    },
  },

  // ━━━ Scenario 6: Study Navigator ━━━
  {
    id: 'study-navigator-demo',
    title: '"I Want to Understand PROOF but Don\'t Know Where to Start"',
    subtitle: 'Guided learning with daily accountability',
    emoji: '📚',
    workerType: 'study_navigator',
    audience: 'friend',
    claim: 'portals',
    description: 'A new user wants to deeply understand the PROOF framework but feels overwhelmed. The Study Navigator creates a personalized plan.',
    pitfalls: [
      'Overwhelming new learners with too much content at once',
      'Not connecting study content to real-life application',
      'Ignoring different learning speeds and styles',
      'Failing to celebrate progress milestones',
    ],
    tools: [
      '7-Day Quick Start Plan — bite-sized daily modules',
      '30-Day Deep Dive Plan — comprehensive framework mastery',
      'Streak Tracker — daily check-in motivation',
      'Milestone Certificates — celebrate completion',
    ],
    result: {
      output: {
        recommendedPlan: "Based on your starting point, I recommend the **7-Day PROOF Foundation Plan**. This gives you one focused topic per day, building from basic understanding to confident application. After completing it, you can graduate to the 30-Day Deep Dive for mastery.",
        todaysContent: {
          title: "Day 1: What is PROOF?",
          description: "An introduction to the five lenses for examining Greek life through faith: Pledge Process, Rituals, Oaths, Obscurity, and Founders. Today's goal: understand the framework and why it matters.",
          proofCategory: "Overview"
        },
        motivationalNote: "🌟 You're taking the first step that most people never take — actually examining the intersection of faith and Greek life with intentionality. That takes courage. By the end of this week, you'll have a framework that serves you for life.",
        nextMilestone: "Complete Day 1 to unlock your first streak badge! 🔥 After 7 consecutive days, you'll earn the 'PROOF Foundation' certificate.",
        citationsUsed: ["PROOF Framework Overview", "7-Day Study Plan Guide"]
      },
      citations: [
        { title: "PROOF Framework Overview", section: "Introduction", lastUpdated: "2026-01-15", type: "lesson", tier: 1 },
        { title: "7-Day PROOF Study Plan", section: "Curriculum Design", lastUpdated: "2026-02-01", type: "study_plan", tier: 1 },
      ],
      escalated: false,
      runId: 'demo-run-006',
    },
  },
];

/**
 * Get a demo result for a specific worker type + audience + claim combination.
 * Falls back to the closest matching scenario.
 */
export function getDemoResult(workerType: WorkerType, audience?: AudienceType | null, claim?: ClaimCategory | null): WorkerResult {
  // Try exact match first
  const exact = DEMO_SCENARIOS.find(s => 
    s.workerType === workerType && 
    (audience ? s.audience === audience : true) && 
    (claim ? s.claim === claim : true)
  );
  if (exact) return exact.result;

  // Fallback to same worker type
  const byWorker = DEMO_SCENARIOS.find(s => s.workerType === workerType);
  if (byWorker) return byWorker.result;

  // Ultimate fallback
  return DEMO_SCENARIOS[0].result;
}
