// Historical examples of ancient guild practices - oaths, handshakes, phrases, rituals
// These are documented historical practices from medieval European guilds and ancient trade associations

export interface GuildPractice {
  id: string;
  category: 'oath' | 'handshake' | 'phrase' | 'ritual';
  title: string;
  historicalContext: string;
  example: string;
  modernParallel?: string;
  biblicalConnection?: string;
}

export const GUILD_OATHS: GuildPractice[] = [
  {
    id: 'apprentice-oath',
    category: 'oath',
    title: 'Apprentice Oath of Loyalty',
    historicalContext: 'Upon entering a guild, apprentices swore oaths of loyalty to their master and the guild. These were professional commitments, not religious worship.',
    example: '"I, [Name], do solemnly swear to faithfully serve my master in the craft of [Trade], to keep his secrets regarding the trade, to obey his lawful commands, and to conduct myself with honesty and diligence for the term of my apprenticeship."',
    modernParallel: 'Similar to pledging loyalty to a fraternity/sorority and its principles during intake.',
    biblicalConnection: 'Ruth 1:16-17 - Ruth\'s oath of loyalty to Naomi demonstrates covenantal commitment without idolatry.'
  },
  {
    id: 'journeyman-oath',
    category: 'oath',
    title: 'Journeyman Oath of Secrecy',
    historicalContext: 'Journeymen swore to protect trade secrets—proprietary techniques that gave the guild competitive advantage. This was economic protection, not mysticism.',
    example: '"I do swear that I will not reveal the mysteries of this craft to any person not entitled to receive them, nor teach the secret methods to anyone who has not been properly admitted to this guild, under penalty of disgrace and expulsion."',
    modernParallel: 'Keeping ritual content private within the organization—protecting organizational identity, not practicing occultism.',
    biblicalConnection: 'Proverbs 11:13 - "A gossip betrays a confidence, but a trustworthy person keeps a secret." Discretion is a biblical virtue.'
  },
  {
    id: 'master-oath',
    category: 'oath',
    title: 'Master Craftsman Oath of Quality',
    historicalContext: 'Masters swore to uphold quality standards, train apprentices properly, and maintain the guild\'s reputation. This was a public commitment to excellence.',
    example: '"I solemnly promise to practice my trade with all diligence and skill, to produce only work of the highest quality, to train my apprentices faithfully, and to uphold the honor and reputation of this guild in all my dealings."',
    modernParallel: 'Commitment to organizational values, leadership development, and maintaining chapter standards.',
    biblicalConnection: 'Colossians 3:23 - "Whatever you do, work at it with all your heart, as working for the Lord."'
  }
];

export const GUILD_HANDSHAKES: GuildPractice[] = [
  {
    id: 'grip-of-recognition',
    category: 'handshake',
    title: 'The Grip of Recognition',
    historicalContext: 'Guild members used distinctive handshakes to identify fellow craftsmen when traveling. This was practical identification before photo IDs existed.',
    example: 'The "carpenter\'s grip" involved pressing the thumb into a specific location on the back of the hand while shaking, combined with a particular finger position. This allowed traveling craftsmen to prove their training without documentation.',
    modernParallel: 'Greek organizations use handshakes/grips as identity markers and to foster a sense of belonging.',
    biblicalConnection: 'Galatians 2:9 - "James, Cephas and John... gave me and Barnabas the right hand of fellowship." Physical gestures of recognition are biblical.'
  },
  {
    id: 'stonecutter-token',
    category: 'handshake',
    title: 'The Stonecutter\'s Token',
    historicalContext: 'Stonemasons had elaborate grips that varied by rank—apprentice, journeyman, or master. This prevented unqualified workers from claiming higher wages.',
    example: 'The "apprentice token" was a simple clasp with the index finger extended along the wrist. The "journeyman token" added pressure with the middle finger. The "master\'s token" included a subtle rotation of the palm during release.',
    modernParallel: 'Different levels of membership (neophyte, active, alumni) may have different recognition signs.',
    biblicalConnection: 'The early church used the ichthys (fish) symbol as a secret recognition sign during persecution—practical identity, not occult practice.'
  }
];

export const GUILD_PHRASES: GuildPractice[] = [
  {
    id: 'password-challenge',
    category: 'phrase',
    title: 'Challenge and Response Passwords',
    historicalContext: 'Guilds used verbal passwords to verify membership. These changed periodically and were only shared with initiated members.',
    example: 'Challenge: "From whence do you come?" Response: "From the lodge of the Master." Counter: "What do you bring?" Response: "Greetings from the brethren and proof of my work."',
    modernParallel: 'Call-and-response traditions, chapter greetings, and identifying phrases within Greek organizations.',
    biblicalConnection: 'Judges 12:6 - The Gileadites used "Shibboleth" as a password to identify allies. Verbal identification has ancient roots.'
  },
  {
    id: 'guild-motto',
    category: 'phrase',
    title: 'Guild Mottos and Sayings',
    historicalContext: 'Each guild had mottos expressing their values and aspirations. These were recited at meetings and inscribed on guild halls.',
    example: 'Carpenters Guild: "By skill and labor" / Blacksmiths: "We shape what others cannot" / Weavers: "Thread by thread, we build strength" / Masons: "Built upon the square"',
    modernParallel: 'Chapter mottos, organizational creeds, and foundational sayings that express shared values.',
    biblicalConnection: 'Proverbs is filled with memorable sayings meant to be recited and internalized—wisdom distilled into memorable phrases.'
  },
  {
    id: 'distress-signal',
    category: 'phrase',
    title: 'Words of Distress',
    historicalContext: 'Guild members could call for help using specific phrases. Fellow guild members were obligated to assist when they heard these words.',
    example: '"To me, brethren of the [Trade]!" or specific phrases like "The compass points true" that would only be recognized by initiated members.',
    modernParallel: 'The expectation of mutual aid and support among fraternity/sorority members.',
    biblicalConnection: 'Galatians 6:2 - "Carry each other\'s burdens." Mutual aid among believers is a biblical command.'
  }
];

export const GUILD_RITUALS: GuildPractice[] = [
  {
    id: 'apprentice-induction',
    category: 'ritual',
    title: 'Apprentice Induction Ceremony',
    historicalContext: 'New apprentices underwent formal ceremonies marking their entry into the guild. These included symbolic elements teaching craft values.',
    example: 'The apprentice would be blindfolded and led into the guild hall by their sponsor. They would be presented with tools of the trade—a hammer for the carpenter, a trowel for the mason. The blindfold was removed as the master said, "Now you see the light of our craft." They then took their oath while holding the guild\'s charter.',
    modernParallel: 'New member induction ceremonies with symbolic elements, sponsors/big brothers/sisters, and formal oath-taking.',
    biblicalConnection: 'Baptism involves symbolic death and new life (Romans 6:4). Ordination ceremonies use laying on of hands. Symbolic rituals are thoroughly biblical.'
  },
  {
    id: 'journeyman-advancement',
    category: 'ritual',
    title: 'Journeyman Advancement Ritual',
    historicalContext: 'After completing apprenticeship, craftsmen underwent tests and ceremonies to prove their skill and advance to journeyman status.',
    example: 'The apprentice presented their "masterpiece"—a work demonstrating their skills. Guild elders examined it and questioned the candidate. If approved, they received a journeyman\'s certificate, new tools, and were taught the journeyman\'s grip and password.',
    modernParallel: 'Advancement through organizational ranks, earning new privileges, learning additional organizational knowledge.',
    biblicalConnection: '2 Timothy 2:15 - "Do your best to present yourself to God as one approved, a worker who does not need to be ashamed." Testing and advancement are scriptural concepts.'
  },
  {
    id: 'master-elevation',
    category: 'ritual',
    title: 'Master Craftsman Elevation',
    historicalContext: 'Becoming a master was the highest honor. The ceremony was elaborate, including public recognition and new responsibilities.',
    example: 'After presenting an exceptional masterpiece, the candidate knelt before the guild council. Each master placed a hand on the candidate\'s shoulder. The Grand Master declared, "Rise as a Master of [Trade]." The new master was given a master\'s apron, the guild\'s secret documents to study, and the right to take apprentices.',
    modernParallel: 'Senior member recognition, leadership investiture ceremonies, receiving organizational secrets/history.',
    biblicalConnection: 'Jesus washed feet and commissioned apostles (John 13, Matthew 28). Leadership elevation through service and commissioning is biblical.'
  },
  {
    id: 'annual-feast',
    category: 'ritual',
    title: 'Annual Guild Feast',
    historicalContext: 'Guilds held annual celebrations on their patron saint\'s day, reinforcing bonds and celebrating the craft.',
    example: 'Members processed through town in guild regalia, attended a special service, then gathered for a feast. Toasts were raised to the craft, fallen members were remembered, new masters were honored, and charity funds were distributed to widows and orphans of deceased members.',
    modernParallel: 'Founders Day celebrations, chapter anniversaries, formal events, and honoring organizational history.',
    biblicalConnection: 'The early church "broke bread together with glad and sincere hearts" (Acts 2:46). Communal celebration is thoroughly Christian.'
  }
];

export const WORKSHEET_QUESTIONS = {
  reflection: [
    "How do the oath examples differ from religious worship? What makes a commitment 'professional' vs. 'idolatrous'?",
    "Why would traveling craftsmen need ways to identify each other? How does this relate to organizational identity today?",
    "What purpose did secrecy serve in protecting trade skills? Is protecting organizational distinctives the same as occultism?",
    "How do guild advancement rituals compare to church practices like baptism, confirmation, or ordination?",
    "What mutual aid practices from guilds are reflected in modern fraternal organizations?"
  ],
  application: [
    "Identify one practice from your organization that parallels ancient guild practices. How does this historical context change your understanding?",
    "What is the difference between a professional oath of conduct and an oath of worship? Write your own definition.",
    "How might understanding guild history help you respond to critics who say Greek organizations are 'occult'?",
    "What boundaries should a Christian maintain regarding organizational rituals? How do you distinguish acceptable from unacceptable?",
    "How can you use the guild history argument in a conversation with a concerned family member or church leader?"
  ],
  groupDiscussion: [
    "As a chapter, discuss: What aspects of our rituals serve practical purposes (identity, bonding, teaching values) vs. what might need evaluation?",
    "How can we better communicate the historical context of fraternal practices to critics?",
    "What does it mean to 'participate without worshiping'? Can you think of other areas of life where this applies?",
    "How do mutual aid traditions in our organization reflect biblical community (Acts 2:44-45)?",
    "What would you say to a prospective member who is concerned about organizational rituals?"
  ]
};

export const ALL_GUILD_PRACTICES = [
  ...GUILD_OATHS,
  ...GUILD_HANDSHAKES,
  ...GUILD_PHRASES,
  ...GUILD_RITUALS
];
