export interface SymbolEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  christianPerspective: string;
  cautionLevel: "low" | "medium" | "high";
  cautionNote?: string;
  scripturalContext?: string;
}

export interface RitualEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  christianApproach: string;
  cautionLevel: "low" | "medium" | "high";
  cautionNote?: string;
  alternatives?: string;
  scripturalContext?: string;
}

export const symbolGuideContent: SymbolEntry[] = [
  {
    id: "greek-letters",
    name: "Greek Letters",
    category: "organizational",
    description: "The Greek alphabet letters that form organization names (Alpha, Beta, Delta, Phi, Kappa, Sigma, etc.)",
    christianPerspective: "Greek letters are simply a writing system adopted for organizational naming, similar to how God Himself is called 'Alpha and Omega' in Scripture. Using Greek letters doesn't constitute worship or invoke spiritual powers.",
    cautionLevel: "low",
    scripturalContext: "Revelation 1:8 - \"I am the Alpha and the Omega,' says the Lord God.\""
  },
  {
    id: "organizational-colors",
    name: "Organizational Colors",
    category: "organizational",
    description: "The distinctive colors associated with each organization (crimson and cream, blue and white, etc.)",
    christianPerspective: "Colors are simply identifying marks, similar to how the Israelite tribes had distinctive banners and colors. They represent organizational unity and pride, not spiritual allegiance.",
    cautionLevel: "low",
    scripturalContext: "Numbers 2 describes how each Israelite tribe had its own standard/banner with distinctive symbols."
  },
  {
    id: "hand-signs",
    name: "Hand Signs and Calls",
    category: "cultural",
    description: "Distinctive hand gestures and verbal calls used for recognition and celebration",
    christianPerspective: "These are cultural identifiers and celebratory expressions, similar to sports team chants or military salutes. They function as community recognition, not spiritual invocation.",
    cautionLevel: "low"
  },
  {
    id: "organizational-symbols",
    name: "Organizational Symbols (Mascots, Objects)",
    category: "organizational",
    description: "Symbolic animals, objects, or images associated with organizations (elephants, doves, pearls, pyramids, etc.)",
    christianPerspective: "Symbols represent qualities like strength, wisdom, or beauty—much like how Scripture uses animal symbolism (lions, doves, eagles). The meaning comes from what members assign, not inherent spiritual power.",
    cautionLevel: "low",
    scripturalContext: "Scripture frequently uses symbolic imagery: lion of Judah, dove of the Spirit, etc."
  },
  {
    id: "crossing-ceremony",
    name: "Crossing/Initiation Ceremony",
    category: "ritual",
    description: "The formal process of becoming a full member of the organization",
    christianPerspective: "Initiation ceremonies mark transitions and commitments, similar to baptism marking Christian conversion or wedding ceremonies marking marriage. The key is whether the ceremony requires anything that violates Scripture or conscience.",
    cautionLevel: "medium",
    cautionNote: "Christians should evaluate specific elements. If any part requires declarations, oaths, or actions that conflict with faith, discuss modifications or opt out of those specific elements."
  },
  {
    id: "stepping-strolling",
    name: "Stepping and Strolling",
    category: "cultural",
    description: "Synchronized movement performances rooted in African American traditions",
    christianPerspective: "These are cultural performance arts, similar to dance in many cultures including biblical dance (David danced before the Lord). They celebrate unity and heritage, not invoke spiritual powers.",
    cautionLevel: "low",
    scripturalContext: "2 Samuel 6:14 - David 'danced before the LORD with all his might.'"
  },
  {
    id: "probate-show",
    name: "Probate/Presentation Show",
    category: "cultural",
    description: "Public presentation introducing new members to the community",
    christianPerspective: "This is a celebration and public introduction, similar to how churches publicly welcome new members or how families announce important life events. It's community celebration, not spiritual ritual.",
    cautionLevel: "low"
  },
  {
    id: "neophyte-period",
    name: "New Member Period",
    category: "ritual",
    description: "The period of learning and integration before full membership",
    christianPerspective: "Learning periods exist in many contexts—discipleship in faith, apprenticeship in trades, training in professions. The question is whether the activities during this period are ethical and honoring to God.",
    cautionLevel: "medium",
    cautionNote: "Christians should refuse participation in hazing, degrading treatment, or activities that violate conscience. Advocate for dignified, educational processes."
  },
  {
    id: "oath-pledges",
    name: "Oaths and Pledges",
    category: "ritual",
    description: "Formal commitments made during membership processes",
    christianPerspective: "Jesus taught letting your 'yes be yes' (Matthew 5:37). Christians can make honest commitments to organizations while maintaining that ultimate allegiance belongs to Christ alone. Avoid oaths that bind you to anything against Scripture.",
    cautionLevel: "medium",
    cautionNote: "Review specific wording. If oaths require absolute allegiance, secrecy about wrongdoing, or anything contradicting Christian faith, discuss modifications.",
    scripturalContext: "Matthew 5:37 - 'All you need to say is simply Yes or No; anything beyond this comes from the evil one.'"
  },
  {
    id: "chapter-meetings",
    name: "Chapter Meetings and Rituals",
    category: "organizational",
    description: "Regular organizational meetings that may include ceremonial elements",
    christianPerspective: "Organizational meetings with ceremonial elements exist in churches, civic groups, and professional organizations. Opening rituals often establish focus and unity. Evaluate whether specific elements require compromise.",
    cautionLevel: "low"
  },
  {
    id: "memorial-services",
    name: "Memorial and Omega Services",
    category: "ritual",
    description: "Services honoring deceased members",
    christianPerspective: "Honoring the deceased is biblical and appropriate. Christians can participate while maintaining Christian hope and avoiding practices that conflict with biblical teaching about death and afterlife.",
    cautionLevel: "low",
    scripturalContext: "1 Thessalonians 4:13 - mourning with hope, not as those without hope"
  },
  {
    id: "founders-day",
    name: "Founders Day Celebrations",
    category: "organizational",
    description: "Annual celebrations honoring organizational founding and founders",
    christianPerspective: "Honoring founders and celebrating history is appropriate—churches do this too. The key is celebration and gratitude, not worship or veneration that belongs to God alone.",
    cautionLevel: "low"
  },
  {
    id: "sacred-objects",
    name: "Sacred or Special Objects",
    category: "ritual",
    description: "Objects given special significance in organizational practice",
    christianPerspective: "Many traditions have meaningful objects (wedding rings, graduation caps, military medals). Objects have the meaning we assign them. No physical object has inherent spiritual power apart from what we give it.",
    cautionLevel: "low",
    scripturalContext: "1 Corinthians 8:4 - 'We know that an idol is nothing at all in the world.'"
  },
  {
    id: "greek-unity",
    name: "Pan-Hellenic Unity Events",
    category: "cultural",
    description: "Events bringing multiple Greek organizations together",
    christianPerspective: "Unity events celebrate shared values and community. Christians can participate while maintaining their distinct witness and using these as opportunities for relationship-building and testimony.",
    cautionLevel: "low"
  }
];

export const ritualGuideContent: RitualEntry[] = [
  {
    id: "initiation",
    name: "Initiation Processes",
    category: "membership",
    description: "The overall process of becoming a member, including education, activities, and ceremonies",
    christianApproach: "Approach as a learning opportunity about the organization's history and values. Refuse any activities that violate Scripture, dignity, or conscience. Remember that membership is a privilege you can decline if requirements conflict with faith.",
    cautionLevel: "medium",
    cautionNote: "Be prepared to discuss modifications or opt out of specific elements that conflict with your faith.",
    alternatives: "If elements are problematic, speak with leadership about alternatives that honor both organizational tradition and your faith.",
    scripturalContext: "Romans 12:2 - 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.'"
  },
  {
    id: "pledge-education",
    name: "New Member Education",
    category: "membership",
    description: "Learning organizational history, values, songs, and traditions",
    christianApproach: "Learning is valuable. Engage fully with educational content. If any material promotes values contrary to Christianity, you can learn about it without endorsing it—similar to studying world religions academically.",
    cautionLevel: "low",
    scripturalContext: "Proverbs 18:15 - 'The heart of the discerning acquires knowledge, for the ears of the wise seek it out.'"
  },
  {
    id: "service-requirements",
    name: "Service Requirements",
    category: "membership",
    description: "Community service expectations for new and ongoing members",
    christianApproach: "Embrace these wholeheartedly! Service is deeply biblical. Use service opportunities as expressions of Christ's love and as witness to your faith motivation.",
    cautionLevel: "low",
    scripturalContext: "Galatians 5:13 - 'Serve one another humbly in love.'"
  },
  {
    id: "ceremony-participation",
    name: "Ceremonial Participation",
    category: "ritual",
    description: "Active participation in organizational ceremonies",
    christianApproach: "Participate with integrity. If asked to make statements, understand what you're saying. If ceremonial elements conflict with faith, discuss beforehand with leadership. Most organizations accommodate sincere religious concerns.",
    cautionLevel: "medium",
    cautionNote: "Know what you're agreeing to. Ask questions beforehand. Maintain your freedom to abstain from specific elements.",
    scripturalContext: "Colossians 3:17 - 'Whatever you do, whether in word or deed, do it all in the name of the Lord Jesus.'"
  },
  {
    id: "secrecy-expectations",
    name: "Confidentiality Expectations",
    category: "organizational",
    description: "Expectations to keep certain organizational matters private",
    christianApproach: "Organizations legitimately protect private matters—as do churches, businesses, and families. Distinguish between appropriate privacy and covering up wrongdoing. Never agree to hide unethical behavior.",
    cautionLevel: "medium",
    cautionNote: "Confidentiality about internal business is fine. Secrecy that covers abuse or illegality is not. Know the difference.",
    scripturalContext: "Ephesians 5:11 - 'Have nothing to do with the fruitless deeds of darkness, but rather expose them.'"
  },
  {
    id: "financial-commitment",
    name: "Financial Obligations",
    category: "practical",
    description: "Dues, fees, and financial expectations of membership",
    christianApproach: "Budget for organizational costs as you would any meaningful commitment. Ensure dues don't compromise tithing or essential obligations. View financial contributions as supporting service, scholarship, and community.",
    cautionLevel: "low",
    scripturalContext: "Proverbs 21:5 - 'The plans of the diligent lead to profit as surely as haste leads to poverty.'"
  }
];

export const symbolCategories = [
  { id: "all", label: "All" },
  { id: "organizational", label: "Organizational" },
  { id: "cultural", label: "Cultural" },
  { id: "ritual", label: "Ritual" }
];

export interface CulturalComparisonEntry {
  id: string;
  category: string;
  symbol: string;
  ancientConnection: string;
  modernUsage: string;
  appUsage: string;
}

export const culturalComparisonCategories = [
  { id: "all", label: "All Categories" },
  { id: "weddings", label: "Weddings & Family" },
  { id: "beauty", label: "Body & Beauty" },
  { id: "brands", label: "Brands & Logos" },
  { id: "civic", label: "Civic & Legal" },
  { id: "church", label: "Church Architecture" },
  { id: "death", label: "Death & Memorials" },
  { id: "medicine", label: "Medicine & Oaths" }
];

export const culturalComparisons: CulturalComparisonEntry[] = [
  // Weddings and Family Rituals
  {
    id: "wedding-rings",
    category: "weddings",
    symbol: "Wedding Rings",
    ancientConnection: "Rings used in Roman and other ancient cultures as legal or covenant markers, often linked to the idea of an unbroken circle and household authority.",
    modernUsage: "Christians exchange rings in church as a sign of covenant and lifelong commitment.",
    appUsage: "Show that believers freely use a symbol with pre-Christian roots while focusing on the meaning they give it before God."
  },
  {
    id: "wedding-party",
    category: "weddings",
    symbol: "Bridesmaids, Groomsmen, Best Man",
    ancientConnection: "In some European customs, attendants and a strong 'best man' guarded the bride and sometimes even helped 'steal' her from her family. Bridesmaids and veils were said to confuse spirits or rivals.",
    modernUsage: "Modern wedding parties are about honor, friendship, and photo moments, not kidnapping or spirit magic.",
    appUsage: "Help users see that practices can shift meaning over time, so origin alone is not the whole story."
  },
  // Body and Beauty Practices
  {
    id: "wigs",
    category: "beauty",
    symbol: "Wigs and Hair Pieces",
    ancientConnection: "Ancient Egypt, Greece, and Rome used wigs and elaborate hair as signs of status, beauty, and sometimes ritual.",
    modernUsage: "Wigs, extensions, locs, and protective styles are standard parts of modern grooming and fashion, including in church.",
    appUsage: "Reinforce that Christians already use beauty practices with complex roots while keeping their worship of God."
  },
  {
    id: "cosmetics",
    category: "beauty",
    symbol: "Eye Shadow and Cosmetics",
    ancientConnection: "Eye paints and kohl-lined eyes were ordinary in Egypt and the Mediterranean, associated with beauty, rank, and, at times, spiritual ideas.",
    modernUsage: "Makeup is everyday for interviews, worship teams, media, and daily life.",
    appUsage: "Invite users to ask, 'If we can use ancient cosmetic practices with wisdom, why single out Greek letters alone?'"
  },
  // Brands and Logos
  {
    id: "nike",
    category: "brands",
    symbol: "Nike",
    ancientConnection: "Named after the Greek goddess of victory. The swoosh suggests movement and speed.",
    modernUsage: "Sports culture, sneaker culture, and Christian athletes all use and wear Nike without worshipping a goddess.",
    appUsage: "Perfect example when people say, 'Anything named after a Greek god is automatically demonic.'"
  },
  {
    id: "car-brands",
    category: "brands",
    symbol: "Mercedes-Benz, Volkswagen, Volvo, Adidas",
    ancientConnection: "Logos draw on symbols like stars, circles, shields, and stylized initials. Some have historic links to industry, nobility, or mythic ideas of power and safety.",
    modernUsage: "Many believers drive these cars, wear these clothes, and never think of them as spiritual covenants.",
    appUsage: "Show that nobody demands public repentance videos for driving a car with a star, but some require them for Greek letters."
  },
  {
    id: "starbucks",
    category: "brands",
    symbol: "Starbucks Siren",
    ancientConnection: "Based on a mythic sea figure from maritime lore, used to signal 'alluring' coffee and travel.",
    modernUsage: "Christians meet for Bible study at Starbucks under a sea woman logo.",
    appUsage: "Used to expose inconsistent logic when symbols with ancient stories are treated as neutral in one space and 'demonic' in another."
  },
  // Civic and Legal Symbols
  {
    id: "lady-justice",
    category: "civic",
    symbol: "Lady Justice",
    ancientConnection: "Rooted in the Roman goddess Justitia and earlier Greek ideas of Dike and Themis. Scales and a blindfold carry that symbolism.",
    modernUsage: "Courtrooms use her image to stand for fairness, not to invite prayer to a goddess.",
    appUsage: "Great example to talk about 'respecting the virtue, not worshiping the statue.'"
  },
  {
    id: "lady-liberty",
    category: "civic",
    symbol: "Lady Liberty",
    ancientConnection: "Inspired by the Roman goddess Libertas, holding a torch and a tablet.",
    modernUsage: "The Statue of Liberty is seen as a symbol of freedom and welcome, not as a deity.",
    appUsage: "Shows that Greek and Roman names and forms are used symbolically in a nation many call 'Christian' without constant panic."
  },
  // Church Space and Architecture
  {
    id: "church-architecture",
    category: "church",
    symbol: "Domes, Columns, Basilica Layout",
    ancientConnection: "Many church buildings echo Roman basilicas, Greek temples, and imperial halls in their shapes and designs.",
    modernUsage: "Christians worship Jesus in buildings shaped by Greco-Roman architecture.",
    appUsage: "Helps users see that architecture with classical roots is accepted as usual, while Greek letters are targeted."
  },
  {
    id: "pulpits",
    category: "church",
    symbol: "Pulpits and Elevated Platforms",
    ancientConnection: "Raised speaking platforms and central 'bema' style spaces existed in ancient courts and assemblies.",
    modernUsage: "Modern pulpits function as teaching platforms that people respect, not altars to a new god.",
    appUsage: "Shows that Christians adapt cultural forms but direct worship to Christ."
  },
  // Death, Grief, and Memorials
  {
    id: "funerals-repass",
    category: "death",
    symbol: "Funerals and Repass",
    ancientConnection: "The pattern of gathering, speaking, and then sharing a meal after burial parallels ancient feasts of remembrance.",
    modernUsage: "Black church culture treats the repass as sacred hospitality and community care.",
    appUsage: "Use this to show how practices can be baptized and reshaped in Christ without denying their long history."
  },
  {
    id: "eulogies",
    category: "death",
    symbol: "Eulogies",
    ancientConnection: "From the Greek 'eulogia' or 'good words,' rooted in the practice of publicly praising someone.",
    modernUsage: "Almost every Christian funeral includes a eulogy or reflections.",
    appUsage: "Makes the point that a direct Greek term is embraced in church life without fear."
  },
  {
    id: "memorial-day",
    category: "death",
    symbol: "Memorial Day and Grave Decoration",
    ancientConnection: "Modern Memorial Day grew from Decoration Day after the Civil War, and some customs echo older practices, such as the Roman Rosalia, in which wreaths and flowers were placed at graves.",
    modernUsage: "Churches and families decorate graves and hold remembrance services.",
    appUsage: "Connect to Romans 14 and remind users that meaning and conscience matter more than origin alone."
  },
  {
    id: "burial-wreaths",
    category: "death",
    symbol: "Burial Wreaths",
    ancientConnection: "Wreaths and garlands for the dead were common in Roman festivals such as Rosalia.",
    modernUsage: "Wreaths are used on caskets, doors, and grave sites as signs of honor and remembrance.",
    appUsage: "Another example that helps Christians see how they already live with classical symbols without worshiping them."
  },
  // Medicine and Oaths
  {
    id: "hippocratic-oath",
    category: "medicine",
    symbol: "Hippocratic Oath (Original)",
    ancientConnection: "The original Greek oath invoked Apollo, Asclepius, Hygieia, and Panacea as witnesses.",
    modernUsage: "Modern medical oaths have been revised, and most no longer call on Greek gods, but the tradition keeps the Hippocratic name.",
    appUsage: "Shows how a practice with explicit Greek deity language has been adapted, while BGLOs are often denied that same possibility."
  }
];
