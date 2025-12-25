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
  },
  // Fraternity-Specific Symbols
  {
    id: "sphinx-symbol",
    name: "Sphinx",
    category: "organizational",
    description: "A mythological creature with a lion's body and human head, used by Alpha Phi Alpha and Sigma Pi Phi (The Boulé)",
    christianPerspective: "The sphinx represents wisdom and strength in organizational context—qualities celebrated in Proverbs. Churches in Egypt used sphinx imagery for centuries. The symbol represents virtue, not worship.",
    cautionLevel: "low",
    scripturalContext: "Proverbs 24:5 - 'The wise prevail through great power, and those who have knowledge muster their strength.'"
  },
  {
    id: "pyramid-symbol",
    name: "Pyramid",
    category: "organizational",
    description: "Ancient architectural form used by Delta Sigma Theta and other organizations to represent strength and endurance",
    christianPerspective: "Pyramids represent lasting foundations and progressive building. Scripture celebrates building on solid foundations. The Israelites themselves worked on Egyptian structures before the Exodus.",
    cautionLevel: "low",
    scripturalContext: "Matthew 7:24-25 - Building on rock so the structure withstands storms."
  },
  {
    id: "dove-symbol",
    name: "Dove",
    category: "organizational",
    description: "Symbol of peace and purity used by Phi Beta Sigma, Zeta Phi Beta, and other organizations",
    christianPerspective: "The dove is deeply biblical—representing the Holy Spirit at Jesus' baptism and Noah's hope after the flood. This is perhaps the most biblically affirmed symbol in Greek life.",
    cautionLevel: "low",
    scripturalContext: "Matthew 3:16 - 'The Spirit of God descending like a dove and alighting on him.'"
  },
  {
    id: "lamp-symbol",
    name: "Lamp/Torch",
    category: "organizational",
    description: "Symbol of enlightenment and guidance used by Omega Psi Phi and many academic organizations",
    christianPerspective: "The lamp is a biblical symbol of God's Word and guidance. 'Your word is a lamp for my feet.' Using this symbol connects to Scriptural imagery of light overcoming darkness.",
    cautionLevel: "low",
    scripturalContext: "Psalm 119:105 - 'Your word is a lamp for my feet, a light on my path.'"
  },
  {
    id: "diamond-symbol",
    name: "Diamond",
    category: "organizational",
    description: "Symbol of strength and value used by Kappa Alpha Psi to represent achievement and unbreakable bonds",
    christianPerspective: "Diamonds represent refinement through pressure—a process Scripture uses to describe how God develops character. 'Consider it pure joy... trials develop perseverance.'",
    cautionLevel: "low",
    scripturalContext: "James 1:2-4 - Trials produce perseverance, character, and completeness."
  },
  {
    id: "ivy-leaf-symbol",
    name: "Ivy Leaf",
    category: "organizational",
    description: "Symbol of Alpha Kappa Alpha representing endurance, growth, and scholastic achievement",
    christianPerspective: "Ivy represents growth and flourishing. Scripture celebrates those who are 'planted by streams of water' and produce fruit in season—symbols of spiritual vitality.",
    cautionLevel: "low",
    scripturalContext: "Psalm 1:3 - 'Like a tree planted by streams of water, which yields its fruit in season.'"
  },
  {
    id: "pearl-symbol",
    name: "Pearl",
    category: "organizational",
    description: "Symbol of value and beauty used by several NPC sororities including Alpha Delta Pi and others",
    christianPerspective: "Jesus compared the kingdom of heaven to a pearl of great price. Pearls represent something precious worth sacrificing for—a deeply biblical concept.",
    cautionLevel: "low",
    scripturalContext: "Matthew 13:45-46 - 'The kingdom of heaven is like a merchant looking for fine pearls.'"
  },
  {
    id: "anchor-symbol",
    name: "Anchor",
    category: "organizational",
    description: "Symbol of hope and stability used by Delta Gamma and other organizations",
    christianPerspective: "The anchor is explicitly used in Hebrews as a symbol of Christian hope. 'We have this hope as an anchor for the soul, firm and secure.'",
    cautionLevel: "low",
    scripturalContext: "Hebrews 6:19 - 'We have this hope as an anchor for the soul, firm and secure.'"
  },
  {
    id: "arrow-symbol",
    name: "Arrow",
    category: "organizational",
    description: "Symbol of direction and purpose used by Pi Beta Phi and other organizations",
    christianPerspective: "Arrows in Scripture represent purpose, direction, and children as blessings. 'Like arrows in the hands of a warrior are children born in one's youth.'",
    cautionLevel: "low",
    scripturalContext: "Psalm 127:4 - 'Like arrows in the hands of a warrior are children born in one's youth.'"
  },
  {
    id: "owl-symbol",
    name: "Owl",
    category: "organizational",
    description: "Symbol of wisdom used by Chi Omega and Phi Gamma Delta, representing knowledge and scholarship",
    christianPerspective: "While associated with Athena in Greek mythology, owls in organizational context simply represent wisdom—a virtue highly praised in Proverbs and throughout Scripture.",
    cautionLevel: "low",
    scripturalContext: "Proverbs 4:7 - 'The beginning of wisdom is this: Get wisdom. Though it cost all you have, get understanding.'"
  },
  {
    id: "crescent-symbol",
    name: "Crescent Moon",
    category: "organizational",
    description: "Symbol used by Phi Beta Sigma, Kappa Alpha Order, and others representing cycles and renewal",
    christianPerspective: "God created the moon and appointed it for seasons (Psalm 104:19). The crescent represents cycles of growth and renewal, not lunar worship.",
    cautionLevel: "low",
    scripturalContext: "Psalm 104:19 - 'He made the moon to mark the seasons.'"
  },
  {
    id: "rose-symbol",
    name: "Rose",
    category: "organizational",
    description: "Symbol of beauty and love used by Zeta Phi Beta (white rose), Sigma Alpha Iota (red rose), and many NPC sororities",
    christianPerspective: "The rose appears in Song of Solomon as the 'rose of Sharon'—a symbol of beauty and love. Flowers represent the beauty of God's creation.",
    cautionLevel: "low",
    scripturalContext: "Song of Solomon 2:1 - 'I am a rose of Sharon, a lily of the valleys.'"
  },
  {
    id: "lion-symbol",
    name: "Lion",
    category: "organizational",
    description: "Symbol of strength and courage used by Tau Kappa Epsilon, Lambda Chi Alpha, and other organizations",
    christianPerspective: "The lion is one of the most prominent biblical symbols—Jesus is called the 'Lion of Judah.' This symbol connects directly to Scriptural imagery.",
    cautionLevel: "low",
    scripturalContext: "Revelation 5:5 - 'The Lion of the tribe of Judah, the Root of David, has triumphed.'"
  },
  {
    id: "skull-symbol",
    name: "Skull and Crossbones",
    category: "organizational",
    description: "Symbol used by Skull and Bones society and some fraternity chapters representing mortality and the equalizing nature of death",
    christianPerspective: "Memento mori ('remember death') is an ancient Christian practice. Monasteries often displayed skulls to remind believers of life's brevity and eternal perspective.",
    cautionLevel: "medium",
    cautionNote: "While historically Christian in meaning, some find this imagery unsettling. Context and personal conscience matter."
  },
  {
    id: "crossed-keys",
    name: "Crossed Keys",
    category: "organizational",
    description: "Symbol of access, responsibility, and stewardship used by Kappa Kappa Gamma and other organizations",
    christianPerspective: "Keys represent authority and access—Jesus gave Peter 'keys to the kingdom.' This symbol connects to themes of stewardship and responsibility.",
    cautionLevel: "low",
    scripturalContext: "Matthew 16:19 - 'I will give you the keys of the kingdom of heaven.'"
  },
  {
    id: "star-symbol",
    name: "Star",
    category: "organizational",
    description: "Symbol of guidance and aspiration used by Sigma Kappa (five-pointed), Order of the Eastern Star, and many organizations",
    christianPerspective: "The Star of Bethlehem guided the Magi to Christ. Stars represent God's faithful promises and guidance throughout Scripture.",
    cautionLevel: "low",
    scripturalContext: "Matthew 2:2 - 'We saw his star when it rose and have come to worship him.'"
  },
  {
    id: "centaur-symbol",
    name: "Centaur",
    category: "organizational",
    description: "Symbol of Iota Phi Theta representing the duality of mind and body, intellectual and physical strength",
    christianPerspective: "While mythological in origin, the centaur in Greek life represents the integration of mind and body—a concept Paul explores when he calls us to present our bodies as living sacrifices.",
    cautionLevel: "low",
    scripturalContext: "Romans 12:1-2 - 'Offer your bodies as a living sacrifice... be transformed by the renewing of your mind.'"
  },
  {
    id: "poodle-symbol",
    name: "Poodle",
    category: "organizational",
    description: "Mascot of Sigma Gamma Rho Sorority representing elegance, intelligence, and distinction",
    christianPerspective: "Animals as mascots represent valued qualities. Dogs in Scripture are sometimes loyal companions. The poodle represents intelligence and elegance—qualities valued in Proverbs.",
    cautionLevel: "low"
  },
  {
    id: "elephant-symbol",
    name: "Elephant",
    category: "organizational",
    description: "Symbol of strength, memory, and loyalty used by Delta Sigma Theta and Alpha Kappa Alpha",
    christianPerspective: "Elephants represent strength, wisdom, and community loyalty. While not mentioned in Scripture, these qualities are celebrated throughout the Bible.",
    cautionLevel: "low"
  },
  // Published Ritual Elements
  {
    id: "candle-lighting",
    name: "Candle Lighting Ceremonies",
    category: "ritual",
    description: "Use of candles in formal ceremonies to represent light, knowledge, or transitions",
    christianPerspective: "Churches use candles extensively—in Advent, vigils, and worship. Candles represent Christ as the light of the world. This practice has deep Christian roots.",
    cautionLevel: "low",
    scripturalContext: "John 8:12 - 'I am the light of the world. Whoever follows me will never walk in darkness.'"
  },
  {
    id: "formal-processions",
    name: "Formal Processions",
    category: "ritual",
    description: "Organized walking in ceremonies, often with specific order and regalia",
    christianPerspective: "Processions are deeply biblical—from priestly processions in the Temple to Jesus' entry into Jerusalem. Churches use processionals in worship regularly.",
    cautionLevel: "low",
    scripturalContext: "2 Samuel 6:12-15 - David leading the procession with the Ark of the Covenant."
  },
  {
    id: "recitation-creed",
    name: "Creed and Oath Recitation",
    category: "ritual",
    description: "Group recitation of organizational creeds, principles, or commitments",
    christianPerspective: "Churches recite creeds (Apostles' Creed, Nicene Creed) as statements of belief and unity. Reciting organizational values follows this same pattern.",
    cautionLevel: "low",
    scripturalContext: "Deuteronomy 6:4-9 - The Shema, recited as a creed by Israel."
  },
  {
    id: "ritual-clothing",
    name: "Special Garments and Regalia",
    category: "ritual",
    description: "Distinctive clothing worn during ceremonies (robes, sashes, pins, stoles)",
    christianPerspective: "God prescribed detailed priestly garments in Exodus. Churches use robes, stoles, and vestments. Special clothing for special occasions is biblical.",
    cautionLevel: "low",
    scripturalContext: "Exodus 28:2 - 'Make sacred garments for your brother Aaron, to give him dignity and honor.'"
  },
  {
    id: "password-handshake",
    name: "Grips, Passwords, and Secret Signs",
    category: "ritual",
    description: "Private recognition signals shared among members",
    christianPerspective: "Early Christians used the ichthus (fish) as a secret recognition sign during persecution. Privacy for member recognition differs from harmful secrecy.",
    cautionLevel: "low",
    cautionNote: "Secret signs for recognition are different from secrecy that covers wrongdoing. The former is acceptable; the latter is not."
  },
  {
    id: "altar-ceremonies",
    name: "Altar and Sacred Space",
    category: "ritual",
    description: "Designated areas or objects treated with special reverence during ceremonies",
    christianPerspective: "Churches have altars, communion tables, and sacred spaces. The question is what happens at these spaces. Reverence for a space where important commitments occur differs from worship.",
    cautionLevel: "medium",
    cautionNote: "Evaluate what occurs at these spaces. Reverence is not worship; meaningful ceremony is not idolatry."
  },
  {
    id: "formal-dining",
    name: "Formal Dinners and Banquets",
    category: "organizational",
    description: "Ceremonial meals with specific protocols, toasts, and traditions",
    christianPerspective: "Jesus instituted the Lord's Supper as a ceremonial meal. Jewish Passover is a ritual meal. Formal meals with tradition are deeply biblical.",
    cautionLevel: "low",
    scripturalContext: "Luke 22:19-20 - 'Do this in remembrance of me.'"
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
  },
  // Published Ritual Elements from Various Organizations
  {
    id: "opening-prayer",
    name: "Opening and Closing Prayers",
    category: "ritual",
    description: "Many organizations include prayer in their published rituals and meeting openings",
    christianApproach: "Many Greek organizations, especially those founded at Christian institutions, include prayer in their rituals. Christians can lead these prayers authentically, directing them to the God of the Bible.",
    cautionLevel: "low",
    scripturalContext: "1 Timothy 2:1-2 - 'I urge that petitions, prayers, intercession and thanksgiving be made for all people.'"
  },
  {
    id: "scripture-readings",
    name: "Scripture Readings in Ritual",
    category: "ritual",
    description: "Several organizations include specific Bible passages in their formal ceremonies",
    christianApproach: "Organizations like Alpha Kappa Alpha, Delta Sigma Theta, and many NPC sororities include Scripture readings. This is an opportunity for authentic faith expression.",
    cautionLevel: "low",
    scripturalContext: "2 Timothy 3:16 - 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.'"
  },
  {
    id: "virtue-recitation",
    name: "Virtue and Principle Recitation",
    category: "ritual",
    description: "Formal statement of organizational virtues like scholarship, service, sisterhood/brotherhood",
    christianApproach: "Virtues like wisdom, integrity, service, and community are deeply biblical. Reciting commitments to these values aligns with Christian character development.",
    cautionLevel: "low",
    scripturalContext: "Philippians 4:8 - 'Whatever is true, noble, right, pure, lovely, admirable—think about such things.'"
  },
  {
    id: "silence-reflection",
    name: "Moments of Silence and Reflection",
    category: "ritual",
    description: "Periods of quiet contemplation during ceremonies",
    christianApproach: "Silent reflection is a Christian spiritual discipline. Use these moments for genuine prayer and meditation on God's Word.",
    cautionLevel: "low",
    scripturalContext: "Psalm 46:10 - 'Be still, and know that I am God.'"
  },
  {
    id: "symbolic-covenant",
    name: "Symbolic Covenant Acts",
    category: "ritual",
    description: "Actions representing commitment to the organization and its members (signing, processing, etc.)",
    christianApproach: "Covenants are biblical. God made covenants with signs (rainbow, circumcision). The question is whether the covenant content is compatible with faith, not whether making covenants is acceptable.",
    cautionLevel: "medium",
    cautionNote: "Review the content of what you're committing to. Covenants to uphold good values are positive; covenants requiring absolute obedience to humans are not.",
    scripturalContext: "Genesis 9:12-13 - God establishes covenant with signs and symbols."
  },
  {
    id: "formal-address",
    name: "Formal Titles and Address",
    category: "organizational",
    description: "Using official titles (Worthy, Basileus, Polemarch, etc.) in formal settings",
    christianApproach: "Formal titles exist in churches (Reverend, Deacon, Elder), government, and military. Using organizational titles for structure and respect is appropriate.",
    cautionLevel: "low",
    scripturalContext: "Romans 13:7 - 'Give to everyone what you owe them... if respect, then respect; if honor, then honor.'"
  },
  {
    id: "gavel-ceremony",
    name: "Gavel and Parliamentary Procedure",
    category: "organizational",
    description: "Use of gavel and formal meeting procedures from Robert's Rules of Order",
    christianApproach: "Parliamentary procedure creates orderly meetings. 'God is not a God of disorder but of peace.' Structured meetings are biblical principles in action.",
    cautionLevel: "low",
    scripturalContext: "1 Corinthians 14:40 - 'Everything should be done in a fitting and orderly way.'"
  },
  {
    id: "installation-ceremony",
    name: "Officer Installation Ceremonies",
    category: "ritual",
    description: "Formal ceremonies installing new chapter officers",
    christianApproach: "Churches install deacons, elders, and ministers through ceremony. Installing leaders with dignity and public commitment is biblical practice.",
    cautionLevel: "low",
    scripturalContext: "Acts 6:6 - 'They presented them to the apostles, who prayed and laid their hands on them.'"
  },
  {
    id: "pinning-ceremony",
    name: "Pinning and Badge Ceremonies",
    category: "ritual",
    description: "Formal presentation of organizational pins, badges, or other symbols of membership",
    christianApproach: "Badges and pins mark achievement and belonging. Military medals, graduation regalia, and even wedding rings serve similar purposes. The pin represents commitment to values, not worship.",
    cautionLevel: "low"
  },
  {
    id: "founder-tribute",
    name: "Founder Tribute and History",
    category: "organizational",
    description: "Honoring founders through recitation of history and acknowledgment of their vision",
    christianApproach: "Hebrews 13:7 instructs us to remember leaders. Honoring founders' sacrifice and vision is appropriate; it becomes problematic only if it crosses into veneration that belongs to God.",
    cautionLevel: "low",
    scripturalContext: "Hebrews 13:7 - 'Remember your leaders, who spoke the word of God to you. Consider the outcome of their way of life and imitate their faith.'"
  },
  {
    id: "public-vs-private",
    name: "Public vs. Private Ceremonies",
    category: "organizational",
    description: "Distinction between ceremonies open to all and those restricted to members",
    christianApproach: "Jesus had public ministry and private moments with disciples. Churches have public services and members-only meetings. Privacy for meaningful moments is appropriate.",
    cautionLevel: "low",
    scripturalContext: "Mark 4:34 - 'When he was alone with his own disciples, he explained everything.'"
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
  { id: "seals", label: "Seals & Imagery" },
  { id: "weddings", label: "Weddings & Family" },
  { id: "beauty", label: "Body & Beauty" },
  { id: "brands", label: "Brands & Logos" },
  { id: "civic", label: "Civic & Legal" },
  { id: "church", label: "Church Architecture" },
  { id: "death", label: "Death & Memorials" },
  { id: "medicine", label: "Medicine & Oaths" }
];

export const culturalComparisons: CulturalComparisonEntry[] = [
  // Federal Seals with Greek/Roman Imagery
  {
    id: "great-seal-us",
    category: "seals",
    symbol: "Great Seal of the United States",
    ancientConnection: "Features an eagle (Jupiter's bird in Roman mythology), an unfinished pyramid with the Eye of Providence, and Latin mottos. The design incorporates classical imagery from Rome and Egypt.",
    modernUsage: "The Great Seal appears on every U.S. dollar bill, passport, and official government document. Christians use money and carry passports without concern.",
    appUsage: "Demonstrates that Americans, including devout Christians, daily use symbols with ancient pagan connections without worshiping those deities."
  },
  {
    id: "statue-of-freedom",
    category: "seals",
    symbol: "Statue of Freedom (U.S. Capitol Dome)",
    ancientConnection: "The bronze statue atop the Capitol dome resembles classical depictions of Roman goddesses like Libertas (Liberty) and Minerva (wisdom/war).",
    modernUsage: "The statue crowns the center of American democracy. Tourists, including Christians, visit and photograph it regularly.",
    appUsage: "Shows that classical Roman imagery in government buildings doesn't constitute worship or spiritual danger."
  },
  {
    id: "supreme-court-frieze",
    category: "seals",
    symbol: "Supreme Court Building Frieze",
    ancientConnection: "The eastern pediment features classical figures including 'Liberty Enthroned' flanked by 'Order' and 'Authority.' Interior friezes depict Moses alongside Hammurabi, Confucius, and other lawgivers.",
    modernUsage: "The highest court in the land operates under these images. Christian justices have served without objection to the imagery.",
    appUsage: "Illustrates how symbols can represent virtues and history without requiring worship."
  },
  {
    id: "library-of-congress",
    category: "seals",
    symbol: "Library of Congress - Minerva Mosaic",
    ancientConnection: "A large mosaic of Minerva (Roman goddess of wisdom) dominates the Great Hall entrance, representing wisdom and learning.",
    modernUsage: "The nation's library and research center, used by scholars, legislators, and visitors of all faiths.",
    appUsage: "Demonstrates that a Roman goddess image in a learning institution doesn't compromise one's faith when using the library."
  },
  // State Seals with Greek/Roman Deities
  {
    id: "virginia-seal",
    category: "seals",
    symbol: "Great Seal of Virginia",
    ancientConnection: "Features Virtus (Roman goddess of virtue/bravery) standing over a defeated tyrant. Virtus wears the dress of an Amazon warrior and holds a spear.",
    modernUsage: "Virginia's official state seal, used on all state documents, driver's licenses, and government correspondence. The state motto 'Sic Semper Tyrannis' accompanies the goddess.",
    appUsage: "Shows that a state founded by Christians chose a Roman goddess to represent their values—symbolism, not worship."
  },
  {
    id: "california-seal",
    category: "seals",
    symbol: "Great Seal of California",
    ancientConnection: "Features Minerva (Roman goddess of wisdom and war), the Greek goddess Athena's Roman equivalent, fully armed with spear and shield.",
    modernUsage: "California's official seal since 1849. Used on all state documents and buildings.",
    appUsage: "Demonstrates that even 'Christian nation' advocates use and accept Roman deity imagery in official government contexts."
  },
  {
    id: "new-york-seal",
    category: "seals",
    symbol: "Great Seal of New York",
    ancientConnection: "Features Liberty and Justice as classical female figures, with Liberty holding a liberty cap on a pole (Roman symbol of freed slaves).",
    modernUsage: "New York's official state symbol, used in courts, government offices, and official documents.",
    appUsage: "Classical personifications of virtues accepted in government without spiritual concern."
  },
  {
    id: "arkansas-seal",
    category: "seals",
    symbol: "Great Seal of Arkansas",
    ancientConnection: "Features a goddess of Liberty (similar to Roman Libertas) at the center with classical robes and imagery.",
    modernUsage: "Arkansas's official state seal since 1864, used on all official state documents.",
    appUsage: "Another example of Roman-inspired imagery in American government symbols."
  },
  {
    id: "north-carolina-seal",
    category: "seals",
    symbol: "Great Seal of North Carolina",
    ancientConnection: "Features Liberty standing with her pole and cap, alongside Plenty (Ceres/Demeter imagery) with horn of plenty.",
    modernUsage: "North Carolina's official seal, representing constitutional liberty since 1871.",
    appUsage: "Shows goddess imagery representing abstract virtues rather than objects of worship."
  },
  // Colleges and Universities with Greek/Roman Deities
  {
    id: "columbia-university",
    category: "seals",
    symbol: "Columbia University - Alma Mater Statue",
    ancientConnection: "The iconic bronze statue depicts Alma Mater as a classical goddess figure seated on a throne, wearing Greek robes, with her arms outstretched in welcome. She resembles Athena/Minerva.",
    modernUsage: "Columbia's most recognizable symbol. Students, including Christians, rub her toe for good luck before exams. Graduation photos feature the statue prominently.",
    appUsage: "Shows how Christians attend and graduate from universities featuring goddess imagery without spiritual compromise."
  },
  {
    id: "yale-minerva",
    category: "seals",
    symbol: "Yale University - Minerva in Branford College",
    ancientConnection: "A relief of Minerva, Roman goddess of wisdom, adorns Branford College. Yale's architecture includes numerous classical deity references.",
    modernUsage: "Yale, founded by Congregationalist ministers, continues to display this imagery. Christian scholars have studied there for centuries.",
    appUsage: "Demonstrates that even institutions founded for Christian education incorporated classical imagery."
  },
  {
    id: "unc-old-well",
    category: "seals",
    symbol: "UNC Chapel Hill - Old Well (Classical Temple)",
    ancientConnection: "Designed as a small neoclassical rotunda based on the Temple of Love at Versailles, which itself references Roman temple architecture.",
    modernUsage: "UNC's most iconic symbol. Students drink from the well on the first day of class for good luck.",
    appUsage: "Temple-style architecture used as a beloved university symbol by students of all faiths."
  },
  {
    id: "penn-seal",
    category: "seals",
    symbol: "University of Pennsylvania Seal",
    ancientConnection: "Features classical book imagery and traditional academic symbols derived from medieval European universities which incorporated classical motifs.",
    modernUsage: "An Ivy League institution using traditional academic imagery rooted in classical traditions.",
    appUsage: "Academic symbolism with classical roots accepted in higher education."
  },
  {
    id: "duke-chapel",
    category: "seals",
    symbol: "Duke University - Classical Elements",
    ancientConnection: "While Duke Chapel is Gothic, campus features classical columns, Roman-style architecture, and the famous Duke Gardens with classical statuary.",
    modernUsage: "Duke, originally Trinity College (Methodist), incorporates classical elements throughout campus design.",
    appUsage: "Shows how Christian institutions freely use classical architectural vocabulary."
  },
  {
    id: "emory-seal",
    category: "seals",
    symbol: "Emory University",
    ancientConnection: "Campus features classical columns, Roman-style architecture, and traditional academic imagery common to American universities.",
    modernUsage: "A Methodist-founded university with classical architectural elements throughout.",
    appUsage: "Christian universities regularly incorporate classical symbols without spiritual concern."
  },
  {
    id: "uga-arch",
    category: "seals",
    symbol: "University of Georgia - The Arch",
    ancientConnection: "The famous iron arch entrance is based on the Great Seal of Georgia and classical Roman triumphal arch design.",
    modernUsage: "UGA's most iconic symbol. Tradition says students shouldn't walk through until graduation.",
    appUsage: "Roman-style architecture serving as beloved university tradition."
  },
  {
    id: "stanford-gates",
    category: "seals",
    symbol: "Stanford University - Memorial Court & Classical Gates",
    ancientConnection: "Features classical columns, Roman arches, and Mediterranean architecture reminiscent of ancient academic settings.",
    modernUsage: "Stanford's iconic imagery includes extensive classical architectural elements.",
    appUsage: "Elite universities embrace classical design as representing academic tradition and excellence."
  },
  {
    id: "mit-great-dome",
    category: "seals",
    symbol: "MIT - Great Dome (Building 10)",
    ancientConnection: "Designed after the Roman Pantheon, the Great Dome is MIT's most recognizable structure.",
    modernUsage: "MIT's symbol of academic excellence, based directly on an ancient Roman temple.",
    appUsage: "Shows that even a temple design can be repurposed for education without spiritual implications."
  },
  {
    id: "howard-university",
    category: "seals",
    symbol: "Howard University - Classical Campus Design",
    ancientConnection: "Campus features neoclassical architecture, columns, and design elements from Greek and Roman traditions.",
    modernUsage: "An HBCU founded to educate African Americans incorporates classical architectural traditions.",
    appUsage: "Demonstrates that historically Black institutions, many with religious foundations, embraced classical symbolism."
  },
  {
    id: "morehouse-seal",
    category: "seals",
    symbol: "Morehouse College",
    ancientConnection: "Founded by Baptists, Morehouse features classical columns and architectural elements common to American higher education.",
    modernUsage: "An HBCU producing influential leaders uses classical academic imagery.",
    appUsage: "Christian-founded HBCUs embrace classical architectural traditions without conflict."
  },
  {
    id: "spelman-seal",
    category: "seals",
    symbol: "Spelman College",
    ancientConnection: "Baptist-founded women's college with traditional academic architecture including classical elements.",
    modernUsage: "Premier HBCU for women embracing academic architectural traditions.",
    appUsage: "Shows women's Christian education institutions also incorporate classical symbolism."
  },
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
