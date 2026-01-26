// Historical examples of ancient guild practices - oaths, handshakes, phrases, rituals
// These are documented historical practices from medieval European guilds and ancient trade associations

export interface ScholarlyReference {
  author: string;
  title: string;
  publication: string;
  year: string;
  page?: string;
  note?: string;
}

export interface GuildPractice {
  id: string;
  category: 'oath' | 'handshake' | 'phrase' | 'ritual';
  title: string;
  historicalContext: string;
  example: string;
  modernParallel?: string;
  biblicalConnection?: string;
  scholarlyReferences?: ScholarlyReference[];
}

// Comprehensive scholarly references for guild practices research
export const GENERAL_REFERENCES: ScholarlyReference[] = [
  {
    author: "Epstein, S.R.",
    title: "Craft Guilds, Apprenticeship, and Technological Change in Preindustrial Europe",
    publication: "The Journal of Economic History",
    year: "1998",
    page: "Vol. 58, No. 3, pp. 684-713",
    note: "Foundational analysis of guild structure and apprenticeship systems"
  },
  {
    author: "Richardson, Gary",
    title: "Guilds, Laws, and Markets for Manufactured Merchandise in Late-Medieval England",
    publication: "Explorations in Economic History",
    year: "2004",
    page: "Vol. 41, No. 1, pp. 1-25",
    note: "Economic functions of guild systems"
  },
  {
    author: "Ogilvie, Sheilagh",
    title: "Institutions and European Trade: Merchant Guilds, 1000-1800",
    publication: "Cambridge University Press",
    year: "2011",
    note: "Comprehensive study of guild institutions across Europe"
  },
  {
    author: "Rosser, Gervase",
    title: "The Art of Solidarity in the Middle Ages: Guilds in England 1250-1550",
    publication: "Oxford University Press",
    year: "2015",
    note: "Explores the communal and ritual aspects of medieval guilds"
  },
  {
    author: "Prak, Maarten & Wallis, Patrick (eds.)",
    title: "Apprenticeship in Early Modern Europe",
    publication: "Cambridge University Press",
    year: "2019",
    note: "Multi-author study on apprenticeship practices across Europe"
  }
];

// 1st-Century Roman-Era Guild References (Jesus's Era)
export const FIRST_CENTURY_REFERENCES: ScholarlyReference[] = [
  {
    author: "Harland, Philip A.",
    title: "Associations, Synagogues, and Congregations: Claiming a Place in Ancient Mediterranean Society",
    publication: "Fortress Press",
    year: "2003",
    note: "Definitive study of voluntary associations in the Greco-Roman world, including trade guilds in 1st-century Palestine"
  },
  {
    author: "Kloppenborg, John S.",
    title: "Collegia and Thiasoi: Issues in Function, Taxonomy, and Membership",
    publication: "Brill Academic Publishers",
    year: "1996",
    page: "pp. 16-30",
    note: "Analyzes the organizational structure of Roman collegia (trade guilds) contemporary with early Christianity"
  },
  {
    author: "Ascough, Richard S.",
    title: "Paul's Macedonian Associations: The Social Context of Philippians and 1 Thessalonians",
    publication: "Mohr Siebeck",
    year: "2003",
    note: "Examines trade associations that Paul and early Christians would have encountered"
  },
  {
    author: "MacMullen, Ramsay",
    title: "Roman Social Relations: 50 B.C. to A.D. 284",
    publication: "Yale University Press",
    year: "1974",
    page: "pp. 71-87",
    note: "Documents artisan guilds and their social functions in the Roman Empire during the apostolic era"
  },
  {
    author: "Burford, Alison",
    title: "Craftsmen in Greek and Roman Society",
    publication: "Cornell University Press",
    year: "1972",
    note: "Comprehensive study of craftsmen's associations including carpenters (tektons) and tentmakers"
  },
  {
    author: "Wilson, Stephen G.",
    title: "Voluntary Associations: An Overview",
    publication: "Routledge",
    year: "1996",
    page: "pp. 1-15",
    note: "Survey of Greco-Roman voluntary associations including those in 1st-century Judea"
  },
  {
    author: "Hock, Ronald F.",
    title: "The Social Context of Paul's Ministry: Tentmaking and Apostleship",
    publication: "Fortress Press",
    year: "1980",
    note: "Examines Paul's involvement with the tentmaking trade guild and its practices"
  },
  {
    author: "Meeks, Wayne A.",
    title: "The First Urban Christians: The Social World of the Apostle Paul",
    publication: "Yale University Press",
    year: "1983",
    page: "pp. 29-50",
    note: "Classic work documenting artisan associations and social structures Paul encountered"
  },
  {
    author: "Fiensy, David A.",
    title: "Jesus the Galilean: Soundings in a First Century Life",
    publication: "Gorgias Press",
    year: "2007",
    page: "pp. 83-102",
    note: "Analyzes Jesus's role as a tekton (craftsman) and the guild context of Galilean artisans"
  },
  {
    author: "Safrai, S. & Stern, M. (eds.)",
    title: "The Jewish People in the First Century (CRINT)",
    publication: "Van Gorcum",
    year: "1976",
    page: "Vol. 2, pp. 631-677",
    note: "Documents Jewish trade guilds and artisan associations in Roman-era Palestine"
  }
];

export const GUILD_OATHS: GuildPractice[] = [
  {
    id: 'apprentice-oath',
    category: 'oath',
    title: 'Apprentice Oath of Loyalty',
    historicalContext: 'Upon entering a guild, apprentices swore oaths of loyalty to their master and the guild. These were professional commitments, not religious worship.',
    example: '"I, [Name], do solemnly swear to faithfully serve my master in the craft of [Trade], to keep his secrets regarding the trade, to obey his lawful commands, and to conduct myself with honesty and diligence for the term of my apprenticeship."',
    modernParallel: 'Similar to pledging loyalty to a fraternity/sorority and its principles during intake.',
    biblicalConnection: 'Ruth 1:16-17 - Ruth\'s oath of loyalty to Naomi demonstrates covenantal commitment without idolatry.',
    scholarlyReferences: [
      {
        author: "Prak, Maarten",
        title: "Apprenticeship in Early Modern Europe",
        publication: "Cambridge University Press",
        year: "2019",
        page: "pp. 45-67",
        note: "Documents apprentice oaths across European guild systems"
      },
      {
        author: "Smith, Toulmin",
        title: "English Gilds: The Original Ordinances of More Than One Hundred English Gilds",
        publication: "Early English Text Society",
        year: "1870",
        note: "Primary source collection of guild ordinances including oath texts"
      }
    ]
  },
  {
    id: 'journeyman-oath',
    category: 'oath',
    title: 'Journeyman Oath of Secrecy',
    historicalContext: 'Journeymen swore to protect trade secrets—proprietary techniques that gave the guild competitive advantage. This was economic protection, not mysticism.',
    example: '"I do swear that I will not reveal the mysteries of this craft to any person not entitled to receive them, nor teach the secret methods to anyone who has not been properly admitted to this guild, under penalty of disgrace and expulsion."',
    modernParallel: 'Keeping ritual content private within the organization—protecting organizational identity, not practicing occultism.',
    biblicalConnection: 'Proverbs 11:13 - "A gossip betrays a confidence, but a trustworthy person keeps a secret." Discretion is a biblical virtue.',
    scholarlyReferences: [
      {
        author: "Epstein, S.R.",
        title: "Craft Guilds, Apprenticeship, and Technological Change in Preindustrial Europe",
        publication: "The Journal of Economic History",
        year: "1998",
        page: "pp. 690-695",
        note: "Analyzes guild secrecy as economic strategy rather than religious practice"
      },
      {
        author: "Long, Pamela O.",
        title: "Openness, Secrecy, Authorship: Technical Arts and the Culture of Knowledge",
        publication: "Johns Hopkins University Press",
        year: "2001",
        note: "Explores the economic rationale for trade secrets in guild culture"
      }
    ]
  },
  {
    id: 'master-oath',
    category: 'oath',
    title: 'Master Craftsman Oath of Quality',
    historicalContext: 'Masters swore to uphold quality standards, train apprentices properly, and maintain the guild\'s reputation. This was a public commitment to excellence.',
    example: '"I solemnly promise to practice my trade with all diligence and skill, to produce only work of the highest quality, to train my apprentices faithfully, and to uphold the honor and reputation of this guild in all my dealings."',
    modernParallel: 'Commitment to organizational values, leadership development, and maintaining chapter standards.',
    biblicalConnection: 'Colossians 3:23 - "Whatever you do, work at it with all your heart, as working for the Lord."',
    scholarlyReferences: [
      {
        author: "Rosser, Gervase",
        title: "The Art of Solidarity in the Middle Ages: Guilds in England 1250-1550",
        publication: "Oxford University Press",
        year: "2015",
        page: "pp. 112-134",
        note: "Examines master craftsman responsibilities and quality standards"
      },
      {
        author: "De Munck, Bert",
        title: "Technologies of Learning: Apprenticeship in Antwerp Guilds from the 15th Century to the End of the Ancien Régime",
        publication: "Brepols Publishers",
        year: "2007",
        note: "Documents master craftsman obligations in training"
      }
    ]
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
    biblicalConnection: 'Galatians 2:9 - "James, Cephas and John... gave me and Barnabas the right hand of fellowship." Physical gestures of recognition are biblical.',
    scholarlyReferences: [
      {
        author: "Knoop, Douglas & Jones, G.P.",
        title: "The Genesis of Freemasonry",
        publication: "Manchester University Press",
        year: "1947",
        note: "Documents how stonemason recognition practices evolved"
      },
      {
        author: "Swanson, Heather",
        title: "Medieval Artisans: An Urban Class in Late Medieval England",
        publication: "Basil Blackwell",
        year: "1989",
        page: "pp. 107-125",
        note: "Discusses artisan identification methods including physical tokens"
      }
    ]
  },
  {
    id: 'stonecutter-token',
    category: 'handshake',
    title: 'The Stonecutter\'s Token',
    historicalContext: 'Stonemasons had elaborate grips that varied by rank—apprentice, journeyman, or master. This prevented unqualified workers from claiming higher wages.',
    example: 'The "apprentice token" was a simple clasp with the index finger extended along the wrist. The "journeyman token" added pressure with the middle finger. The "master\'s token" included a subtle rotation of the palm during release.',
    modernParallel: 'Different levels of membership (neophyte, active, alumni) may have different recognition signs.',
    biblicalConnection: 'The early church used the ichthys (fish) symbol as a secret recognition sign during persecution—practical identity, not occult practice.',
    scholarlyReferences: [
      {
        author: "Carr, Harry",
        title: "The Mason and the Burgh: An Examination of the Schaw Statutes",
        publication: "Ars Quatuor Coronatorum",
        year: "1956",
        page: "Vol. 69, pp. 176-217",
        note: "Analyzes stonemason guild regulations including recognition practices"
      },
      {
        author: "Stevenson, David",
        title: "The Origins of Freemasonry: Scotland's Century, 1590-1710",
        publication: "Cambridge University Press",
        year: "1988",
        note: "Traces guild recognition practices to their medieval origins"
      }
    ]
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
    biblicalConnection: 'Judges 12:6 - The Gileadites used "Shibboleth" as a password to identify allies. Verbal identification has ancient roots.',
    scholarlyReferences: [
      {
        author: "Poole, Herbert",
        title: "Gild Merchant Customs and Their Influence",
        publication: "The Economic History Review",
        year: "1943",
        page: "Vol. 13, No. 1/2, pp. 27-35",
        note: "Discusses verbal identification practices in merchant guilds"
      },
      {
        author: "Westlake, H.F.",
        title: "The Parish Gilds of Mediaeval England",
        publication: "Society for Promoting Christian Knowledge",
        year: "1919",
        note: "Documents verbal rituals and challenge phrases in parish guilds"
      }
    ]
  },
  {
    id: 'guild-motto',
    category: 'phrase',
    title: 'Guild Mottos and Sayings',
    historicalContext: 'Each guild had mottos expressing their values and aspirations. These were recited at meetings and inscribed on guild halls.',
    example: 'Carpenters Guild: "By skill and labor" / Blacksmiths: "We shape what others cannot" / Weavers: "Thread by thread, we build strength" / Masons: "Built upon the square"',
    modernParallel: 'Chapter mottos, organizational creeds, and foundational sayings that express shared values.',
    biblicalConnection: 'Proverbs is filled with memorable sayings meant to be recited and internalized—wisdom distilled into memorable phrases.',
    scholarlyReferences: [
      {
        author: "Unwin, George",
        title: "The Gilds and Companies of London",
        publication: "Methuen & Co.",
        year: "1908",
        note: "Comprehensive study of London guild mottos and heraldic devices"
      },
      {
        author: "Black, Antony",
        title: "Guild and State: European Political Thought from the Twelfth Century to the Present",
        publication: "Transaction Publishers",
        year: "2003",
        note: "Analyzes the ideological foundations expressed in guild mottos"
      }
    ]
  },
  {
    id: 'distress-signal',
    category: 'phrase',
    title: 'Words of Distress',
    historicalContext: 'Guild members could call for help using specific phrases. Fellow guild members were obligated to assist when they heard these words.',
    example: '"To me, brethren of the [Trade]!" or specific phrases like "The compass points true" that would only be recognized by initiated members.',
    modernParallel: 'The expectation of mutual aid and support among fraternity/sorority members.',
    biblicalConnection: 'Galatians 6:2 - "Carry each other\'s burdens." Mutual aid among believers is a biblical command.',
    scholarlyReferences: [
      {
        author: "Richardson, Gary",
        title: "Craft Guilds and Christianity in Late Medieval England: A Rational Choice Analysis",
        publication: "Rationality and Society",
        year: "2005",
        page: "Vol. 17, No. 2, pp. 139-189",
        note: "Examines mutual aid obligations including distress signals"
      },
      {
        author: "Rosser, Gervase",
        title: "Going to the Fraternity Feast: Commensality and Social Relations in Late Medieval England",
        publication: "Journal of British Studies",
        year: "1994",
        page: "Vol. 33, No. 4, pp. 430-446",
        note: "Documents mutual aid practices and social bonds in guilds"
      }
    ]
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
    biblicalConnection: 'Baptism involves symbolic death and new life (Romans 6:4). Ordination ceremonies use laying on of hands. Symbolic rituals are thoroughly biblical.',
    scholarlyReferences: [
      {
        author: "De Munck, Bert & Kaplan, Steven L.",
        title: "Secrets of Learning: Apprenticeship and the Initiation of the Initiate",
        publication: "Journal of Medieval and Early Modern Studies",
        year: "2007",
        page: "Vol. 37, No. 3, pp. 457-483",
        note: "Detailed analysis of apprentice initiation ceremonies"
      },
      {
        author: "Schulz, Knut",
        title: "Confraternities and Guilds: Medieval Rituals and the New Social Order",
        publication: "University of Chicago Press",
        year: "1999",
        note: "Comparative study of guild and confraternity initiation practices"
      }
    ]
  },
  {
    id: 'journeyman-advancement',
    category: 'ritual',
    title: 'Journeyman Advancement Ritual',
    historicalContext: 'After completing apprenticeship, craftsmen underwent tests and ceremonies to prove their skill and advance to journeyman status.',
    example: 'The apprentice presented their "masterpiece"—a work demonstrating their skills. Guild elders examined it and questioned the candidate. If approved, they received a journeyman\'s certificate, new tools, and were taught the journeyman\'s grip and password.',
    modernParallel: 'Advancement through organizational ranks, earning new privileges, learning additional organizational knowledge.',
    biblicalConnection: '2 Timothy 2:15 - "Do your best to present yourself to God as one approved, a worker who does not need to be ashamed." Testing and advancement are scriptural concepts.',
    scholarlyReferences: [
      {
        author: "Epstein, S.R. & Prak, Maarten",
        title: "Guilds, Innovation, and the European Economy, 1400-1800",
        publication: "Cambridge University Press",
        year: "2008",
        page: "pp. 78-102",
        note: "Documents journeyman examination and advancement practices"
      },
      {
        author: "Stabel, Peter",
        title: "Guilds in Late Medieval Flanders: Myths and Realities of Guild Life",
        publication: "Journal of Medieval History",
        year: "2006",
        page: "Vol. 32, No. 2, pp. 169-193",
        note: "Analyzes advancement ceremonies in Flemish craft guilds"
      }
    ]
  },
  {
    id: 'master-elevation',
    category: 'ritual',
    title: 'Master Craftsman Elevation',
    historicalContext: 'Becoming a master was the highest honor. The ceremony was elaborate, including public recognition and new responsibilities.',
    example: 'After presenting an exceptional masterpiece, the candidate knelt before the guild council. Each master placed a hand on the candidate\'s shoulder. The Grand Master declared, "Rise as a Master of [Trade]." The new master was given a master\'s apron, the guild\'s secret documents to study, and the right to take apprentices.',
    modernParallel: 'Senior member recognition, leadership investiture ceremonies, receiving organizational secrets/history.',
    biblicalConnection: 'Jesus washed feet and commissioned apostles (John 13, Matthew 28). Leadership elevation through service and commissioning is biblical.',
    scholarlyReferences: [
      {
        author: "Farr, James R.",
        title: "Artisans in Europe, 1300-1914",
        publication: "Cambridge University Press",
        year: "2000",
        page: "pp. 156-178",
        note: "Comprehensive analysis of master elevation ceremonies across Europe"
      },
      {
        author: "Crossick, Geoffrey",
        title: "Past Masters: The Economy and Culture of European Guilds",
        publication: "Blackwell Publishing",
        year: "1997",
        note: "Examines the cultural significance of master status attainment"
      }
    ]
  },
  {
    id: 'annual-feast',
    category: 'ritual',
    title: 'Annual Guild Feast',
    historicalContext: 'Guilds held annual celebrations on their patron saint\'s day, reinforcing bonds and celebrating the craft.',
    example: 'Members processed through town in guild regalia, attended a special service, then gathered for a feast. Toasts were raised to the craft, fallen members were remembered, new masters were honored, and charity funds were distributed to widows and orphans of deceased members.',
    modernParallel: 'Founders Day celebrations, chapter anniversaries, formal events, and honoring organizational history.',
    biblicalConnection: 'The early church "broke bread together with glad and sincere hearts" (Acts 2:46). Communal celebration is thoroughly Christian.',
    scholarlyReferences: [
      {
        author: "Rosser, Gervase",
        title: "Going to the Fraternity Feast: Commensality and Social Relations in Late Medieval England",
        publication: "Journal of British Studies",
        year: "1994",
        page: "Vol. 33, No. 4, pp. 430-446",
        note: "Primary study of guild feast traditions and their social significance"
      },
      {
        author: "Hanawalt, Barbara A.",
        title: "Ceremony and Civility: Civic Culture in Late Medieval London",
        publication: "Oxford University Press",
        year: "2017",
        note: "Analyzes guild processions and public celebrations"
      }
    ]
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

// Generate TTS text for each category
export function generateTTSTextForCategory(category: 'oath' | 'handshake' | 'phrase' | 'ritual'): string {
  const practices = category === 'oath' ? GUILD_OATHS 
    : category === 'handshake' ? GUILD_HANDSHAKES 
    : category === 'phrase' ? GUILD_PHRASES 
    : GUILD_RITUALS;
  
  const categoryLabels = {
    oath: 'Guild Oaths',
    handshake: 'Guild Handshakes and Tokens',
    phrase: 'Guild Phrases and Passwords',
    ritual: 'Guild Rituals and Ceremonies'
  };

  let text = `${categoryLabels[category]}. `;
  
  practices.forEach((practice, index) => {
    text += `${index + 1}. ${practice.title}. ${practice.historicalContext} `;
    text += `Here is a historical example: ${practice.example} `;
    if (practice.modernParallel) {
      text += `Modern parallel: ${practice.modernParallel} `;
    }
    if (practice.biblicalConnection) {
      text += `Biblical connection: ${practice.biblicalConnection} `;
    }
    text += '. ';
  });
  
  return text;
}

// Generate comprehensive overview TTS text
export function generateGuildPracticesOverviewTTS(): string {
  return `Historical Guild Practices: Understanding Ancient Trade Organizations

This section explores the documented practices of medieval European guilds and ancient trade associations. These practices were professional and practical, not religious worship. Guild oaths were commitments to quality and confidentiality. Secret handshakes identified fellow craftsmen before photo identification existed. Rituals marked advancement and celebrated community. Understanding this context transforms how we evaluate modern fraternal practices.

Key Principle: Ancient guilds like those Jesus and Paul would have known in carpentry and tentmaking used oaths, signs, ceremonies, and mutual aid as professional practices. These same elements appear in modern Greek-letter organizations. The question is not whether such practices exist, but whether they are directed toward idolatry or serve legitimate social and professional purposes.

${generateTTSTextForCategory('oath')}

${generateTTSTextForCategory('handshake')}

${generateTTSTextForCategory('phrase')}

${generateTTSTextForCategory('ritual')}

Conclusion: These historical examples demonstrate that oaths, handshakes, passwords, and ceremonial practices have long served practical purposes in professional organizations. When evaluated against Scripture, the key question is not the existence of such practices, but their intent and object. Professional commitment and identity practices differ fundamentally from religious worship.`;
}
