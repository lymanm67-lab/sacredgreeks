export interface SymbolEntry {
  id: string;
  name: string;
  category: string;
  organizationType?: string; // e.g., "Medical Societies", "Arts & Music Organizations"
  description: string;
  doubleStandard?: string; // "The Double Standard" section
  christianPerspective: string;
  biblicalParallels?: string[]; // Array of biblical parallel points
  scriptureReferences?: string[]; // List of scripture references
  cautionLevel: "low" | "medium" | "high";
  cautionNote?: string;
  scripturalContext?: string;
  imageUrl?: string; // AI-generated image for visual reference
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
  // =====================================================
  // DEITIES - Comprehensive Guide with Biblical Parallels
  // =====================================================
  {
    id: "ahura-mazda",
    name: "Ahura Mazda (Persian Supreme God)",
    category: "deity",
    organizationType: "Religious/Historical",
    imageUrl: "/src/assets/symbols/ahura-mazda.jpg",
    description: "Ahura Mazda—\"Lord of Wisdom\"—was Persia's supreme deity representing light, truth, and righteousness. His winged symbol (Faravahar) appears on Iranian architecture and influenced angelology. Zoroastrian concepts of heaven, hell, angels, and final judgment entered Jewish thought during the Persian period and influenced Christian theology.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "God used the Persian period to develop Jewish understanding of angels, resurrection, and apocalyptic hope. Cyrus the Great, who worshipped Ahura Mazda, is called God's \"anointed\" (Isaiah 45:1). God works through various cultures to accomplish His purposes. Truth about light overcoming darkness transcends any single culture.",
    biblicalParallels: [
      "Cyrus called God's anointed/messiah (Isaiah 45:1)",
      "God is light, in Him is no darkness (1 John 1:5)",
      "The Lord is my light and salvation (Psalm 27:1)",
      "Light shines in darkness (John 1:5)"
    ],
    scriptureReferences: ["Isaiah 45:1", "1 John 1:5", "Psalm 27:1", "John 1:5"],
    cautionLevel: "low"
  },
  {
    id: "anubis-deity",
    name: "Anubis (Egyptian God)",
    category: "deity",
    organizationType: "Funeral/Memorial",
    description: "Anubis—jackal-headed guardian of the dead—appears in funeral home logos, cemetery art, and mortuary science programs. His role guiding souls to judgment parallels concepts Christians hold. Funeral industry professionals work within imagery descended from Anubis without religious objection from Christians.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Christians believe in life after death and the soul's journey to judgment. Angels escort believers to Abraham's bosom (Luke 16:22). The concept of a guide through death to new life resonates with Christian hope. Funeral practices honoring the deceased reflect belief in resurrection and eternal life.",
    biblicalParallels: [
      "Angels carried Lazarus to Abraham's side (Luke 16:22)",
      "To be absent from the body is to be present with the Lord (2 Corinthians 5:8)",
      "Death is swallowed up in victory (1 Corinthians 15:54)",
      "Precious in the sight of the Lord is the death of His saints (Psalm 116:15)"
    ],
    scriptureReferences: ["Luke 16:22", "2 Corinthians 5:8", "1 Corinthians 15:54", "Psalm 116:15"],
    cautionLevel: "low"
  },
  {
    id: "apollo-deity",
    name: "Apollo (God of Light, Music, Arts)",
    category: "deity",
    organizationType: "Arts & Music Organizations",
    description: "Apollo represents light, truth, music, poetry, and healing. His imagery appears at the Kennedy Center, on music conservatory logos, and arts institutions. Christians who enjoy classical music, attend symphony orchestras, or study at arts schools regularly encounter Apollo's legacy without objection.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "God is described as Light (1 John 1:5) and the source of all creativity and beauty. Music and arts are forms of worship—David was a musician, and heaven is filled with song. Apollo's association with light and truth echoes biblical themes of Christ as the Light of the World and the Truth.",
    biblicalParallels: [
      "God is Light (1 John 1:5)",
      "Jesus is the Light of the World (John 8:12)",
      "Make music to the Lord (Ephesians 5:19)",
      "Every good gift comes from the Father of Lights (James 1:17)"
    ],
    scriptureReferences: ["John 8:12", "1 John 1:5", "Ephesians 5:19", "James 1:17"],
    cautionLevel: "low"
  },
  {
    id: "asclepius-deity",
    name: "Asclepius (Rod of Asclepius)",
    category: "deity",
    organizationType: "Medical Societies",
    description: "The Rod of Asclepius—a serpent-wrapped staff—is the universal symbol of medicine. Used by the American Medical Association, World Health Organization, and medical schools worldwide. Christians wear this on their white coats and hospital badges without objection, yet similar mythological imagery in Greek organizations is condemned.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "The serpent in medicine represents healing and renewal (shedding skin symbolizes rebirth). Moses lifted a bronze serpent for healing (Numbers 21:8-9), which Jesus referenced as a symbol of His own salvific work (John 3:14-15). Medical professionals bearing this symbol participate in God's healing ministry.",
    biblicalParallels: [
      "Bronze serpent brought healing to Israel (Numbers 21:8-9)",
      "Jesus compared Himself to the lifted serpent (John 3:14-15)",
      "Gifts of healing given by the Spirit (1 Corinthians 12:9)",
      "Jesus healed all who came to Him (Matthew 4:23-24)"
    ],
    scriptureReferences: ["Numbers 21:8-9", "John 3:14-15", "1 Corinthians 12:9", "James 5:14-16"],
    cautionLevel: "low"
  },
  {
    id: "athena-deity",
    name: "Athena/Minerva (Goddess of Wisdom)",
    category: "deity",
    organizationType: "Multiple Organizations",
    description: "Athena/Minerva represents wisdom, courage, and strategic thinking. She appears on countless university seals, state seals (California, Virginia), military insignia, and corporate logos. Christians proudly attend schools and serve states displaying Minerva, yet condemn her presence in Greek organizations.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Wisdom is extolled throughout Scripture as a divine gift to be pursued. James tells us to ask God for wisdom (James 1:5). Athena's association with strategic thinking parallels biblical wisdom that guides our decisions. The pursuit of wisdom honors God who is the source of all wisdom.",
    biblicalParallels: [
      "Wisdom is more precious than rubies (Proverbs 8:11)",
      "Ask God for wisdom and He will give it (James 1:5)",
      "Christ is the wisdom of God (1 Corinthians 1:24)",
      "Wisdom from above is pure and peaceable (James 3:17)"
    ],
    scriptureReferences: ["Proverbs 4:7", "James 1:5", "1 Corinthians 1:24", "Proverbs 8:11"],
    cautionLevel: "low"
  },
  {
    id: "el-deity",
    name: "El (Canaanite Supreme God)",
    category: "deity",
    organizationType: "Biblical/Religious",
    description: "El was the supreme deity of Canaanite religion, meaning \"God\" or \"Mighty One.\" The Hebrew word for God—Elohim, El Shaddai, El Elyon—derives directly from this Canaanite term. Christians use \"El\" names for God constantly: Emmanuel, Israel, Daniel, Michael, Gabriel. The very name we use for God has Canaanite linguistic roots.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "God revealed Himself using cultural language people understood. The Hebrew patriarchs used \"El\" terminology to describe the One True God. This demonstrates that God redeems language and symbols rather than requiring entirely new vocabulary. Names like \"Israel\" (wrestles with El/God) show God working within cultural contexts.",
    biblicalParallels: [
      "God revealed as El Shaddai to Abraham (Genesis 17:1)",
      "El Elyon - God Most High (Genesis 14:18-20)",
      "Emmanuel - God with us (Isaiah 7:14, Matthew 1:23)",
      "Israel means \"struggles with God/El\" (Genesis 32:28)"
    ],
    scriptureReferences: ["Genesis 17:1", "Genesis 14:18-20", "Isaiah 7:14", "Psalm 91:1"],
    cautionLevel: "low"
  },
  {
    id: "hermes-deity",
    name: "Hermes/Mercury (Messenger God)",
    category: "deity",
    organizationType: "Business & Commerce",
    description: "Hermes/Mercury—the winged messenger—appears on the FTD florist logo, medical caduceus (incorrectly), postal services, and countless business logos. His winged sandals and staff are ubiquitous in commerce. Christians engage in business under these symbols without hesitation.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Messengers carry vital communications—angels are God's messengers (the word \"angel\" means messenger). Commerce and trade are biblical (Proverbs 31 woman was a merchant). The speed and reliability symbolized by Hermes parallel the swift delivery of the Gospel message to all nations.",
    biblicalParallels: [
      "Angels are ministering spirits/messengers (Hebrews 1:14)",
      "Beautiful feet of those who bring good news (Romans 10:15)",
      "The Proverbs 31 woman engaged in trade (Proverbs 31:18)",
      "Go into all the world with the message (Mark 16:15)"
    ],
    scriptureReferences: ["Hebrews 1:14", "Romans 10:15", "Proverbs 31:18", "Mark 16:15"],
    cautionLevel: "low"
  },
  {
    id: "horus-eye-deity",
    name: "Horus/Eye of Horus",
    category: "deity",
    organizationType: "Multiple Organizations",
    description: "The Eye of Horus appears on the U.S. one-dollar bill (Eye of Providence), pharmaceutical prescriptions (Rx symbol), and corporate logos. Christians use currency with this symbol daily and take prescriptions marked \"Rx\" (derived from the Eye of Horus) without moral objection.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "The \"All-Seeing Eye\" on currency was adopted to represent God's providence watching over America. Christians redeemed this ancient symbol to point to the One True God who sees all. Similarly, Greek organizations can use ancient symbols while giving them new, Christ-honoring meaning.",
    biblicalParallels: [
      "The eyes of the Lord are everywhere (Proverbs 15:3)",
      "God watches over the righteous (Psalm 34:15)",
      "Nothing is hidden from God's sight (Hebrews 4:13)",
      "God's providence guides nations (Proverbs 21:1)"
    ],
    scriptureReferences: ["Proverbs 15:3", "Psalm 34:15", "Hebrews 4:13", "Daniel 2:21"],
    cautionLevel: "low"
  },
  {
    id: "hygieia-deity",
    name: "Hygieia (Bowl of Hygieia)",
    category: "deity",
    organizationType: "Pharmacy/Medical",
    description: "The Bowl of Hygieia—a serpent drinking from a chalice—is the international symbol of pharmacy. Displayed in every pharmacy, on pharmacist licenses, and pharmaceutical company logos. Christians who condemn Greek mythology freely accept prescriptions marked with this goddess imagery.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Hygieia represents preventive care and wellness—values Christians embrace. The cup/chalice is also a powerful Christian symbol (communion cup). Prevention of disease honors our bodies as temples of the Holy Spirit. Pharmacists participating in healing continue Christ's ministry of restoration.",
    biblicalParallels: [
      "Our bodies are temples of the Holy Spirit (1 Corinthians 6:19-20)",
      "The cup of communion represents Christ's blood (Matthew 26:27-28)",
      "Divine wisdom includes health principles (Proverbs 3:7-8)",
      "Caring for the sick is ministry to Christ (Matthew 25:36)"
    ],
    scriptureReferences: ["1 Corinthians 6:19-20", "Proverbs 3:7-8", "Matthew 25:36", "3 John 1:2"],
    cautionLevel: "low"
  },
  {
    id: "ishtar-gate",
    name: "Ishtar Gate (Babylonian)",
    category: "deity",
    organizationType: "Art/Architecture",
    description: "The Ishtar Gate—dedicated to the Babylonian goddess of love and war—is displayed in the Pergamon Museum and reproduced worldwide. Its iconic blue-glazed bricks and dragon/bull imagery influence modern architecture. Christians visit museums displaying this goddess's temple entrance without religious objection.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Beauty in architecture glorifies the Creator who gave humans artistic ability. Christians can appreciate ancient craftsmanship while worshipping the true God. Daniel served in Babylon without compromising his faith—engaging culture while maintaining devotion. We can learn from ancient wisdom without worshipping ancient gods.",
    biblicalParallels: [
      "Daniel excelled in Babylon while maintaining faith (Daniel 6:3)",
      "Skilled craftsmen given by God (Exodus 31:1-6)",
      "Whatever is beautiful, think on these things (Philippians 4:8)",
      "The earth is the Lord's and everything in it (Psalm 24:1)"
    ],
    scriptureReferences: ["Daniel 6:3", "Exodus 31:1-6", "Philippians 4:8", "Psalm 24:1"],
    cautionLevel: "low"
  },
  {
    id: "isis-deity",
    name: "Isis (Egyptian Goddess)",
    category: "deity",
    organizationType: "Cultural/Religious",
    description: "Isis—goddess of motherhood, magic, and healing—influenced early Christian iconography. Some scholars note parallels between Isis nursing Horus and Madonna and Child imagery. Her name appears in pharmaceutical terms (Isidis). Christians unknowingly encounter Isis's cultural legacy in religious art and medical terminology.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Motherhood and nurturing are blessed by God. The image of mother and child is universal and beautiful. God chose to enter the world through Mary—a human mother. Rather than fearing cultural parallels, Christians can recognize God's truth echoing across cultures, pointing to ultimate fulfillment in Christ.",
    biblicalParallels: [
      "A mother comforts her child, so God comforts us (Isaiah 66:13)",
      "Mary treasured these things in her heart (Luke 2:19)",
      "Honor your mother (Exodus 20:12)",
      "The church as nurturing mother (Galatians 4:26)"
    ],
    scriptureReferences: ["Isaiah 66:13", "Luke 2:19", "Galatians 4:26", "Proverbs 31:28"],
    cautionLevel: "low"
  },
  {
    id: "lady-justice-deity",
    name: "Lady Justice (Themis/Justitia)",
    category: "deity",
    organizationType: "Legal Societies",
    description: "Themis/Lady Justice—blindfolded, holding scales and sword—stands atop courthouses across America. Every lawyer, judge, and court officer works under her image. Christians serve as attorneys, judges, and jurors beneath this goddess imagery without moral objection, yet criticize similar symbols in Greek organizations.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Justice is a divine attribute that humans are called to pursue. The blindfold represents impartiality (no favoritism), scales represent fair judgment, and the sword represents authority to execute justice. These align perfectly with biblical principles of righteousness and fairness.",
    biblicalParallels: [
      "God loves justice and righteousness (Psalm 33:5)",
      "Do not show partiality in judgment (Deuteronomy 1:17)",
      "The Lord weighs the heart (Proverbs 21:2)",
      "Rulers bear the sword for justice (Romans 13:4)"
    ],
    scriptureReferences: ["Micah 6:8", "Deuteronomy 1:17", "Proverbs 21:2", "Romans 13:1-4"],
    cautionLevel: "low"
  },
  {
    id: "lamp-knowledge-deity",
    name: "Lamp of Knowledge",
    category: "deity",
    organizationType: "Academic Societies",
    description: "The Lamp of Knowledge—often depicted as an oil lamp with eternal flame—represents education, enlightenment, and the pursuit of truth. It appears on school logos, library emblems, and academic honor societies. This ancient symbol bridges Greek philosophy and Christian tradition seamlessly.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Jesus declared Himself the Light of the World (John 8:12). Christians are called to be lights (Matthew 5:14-16). The parable of the wise virgins (Matthew 25) emphasizes keeping our lamps lit with oil (the Holy Spirit). Education and knowledge pursued rightly glorify God who is the source of all truth.",
    biblicalParallels: [
      "Your word is a lamp to my feet (Psalm 119:105)",
      "Let your light shine before others (Matthew 5:14-16)",
      "Wise virgins kept oil in their lamps (Matthew 25:1-13)",
      "The Spirit leads us into all truth (John 16:13)"
    ],
    scriptureReferences: ["Psalm 119:105", "Matthew 5:14-16", "John 8:12", "Proverbs 4:18"],
    cautionLevel: "low"
  },
  {
    id: "maat-deity",
    name: "Maat (Egyptian Goddess of Truth)",
    category: "deity",
    organizationType: "Legal/Justice Systems",
    description: "Maat—representing truth, justice, and cosmic order—appears in courtroom imagery worldwide. The scales of justice derive from Maat weighing hearts against her feather. Lady Justice's scales directly descend from Maat iconography. Christians serve on juries and in courts decorated with this Egyptian goddess's symbolism.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Truth and justice are divine attributes God calls His people to uphold. The concept of cosmic order (Maat) parallels biblical understanding of God's created order. Christians pursuing justice participate in God's character regardless of the symbol's ancient origins. The heart being weighed echoes Proverbs 21:2.",
    biblicalParallels: [
      "The Lord weighs the heart (Proverbs 21:2)",
      "Justice and righteousness are God's throne foundation (Psalm 89:14)",
      "Do justice, love mercy (Micah 6:8)",
      "Speak truth to one another (Zechariah 8:16)"
    ],
    scriptureReferences: ["Proverbs 21:2", "Psalm 89:14", "Micah 6:8", "Proverbs 16:11"],
    cautionLevel: "low"
  },
  {
    id: "marduk-deity",
    name: "Marduk (Babylonian Chief God)",
    category: "deity",
    organizationType: "Academic/Theology",
    description: "Marduk—Babylon's chief deity—represented order triumphing over chaos. His symbol, the spade/hoe, represented civilization and agriculture. Babylonian creation mythology influenced how scholars understand Genesis. Christians studying ancient Near Eastern literature encounter Marduk's narratives regularly in biblical studies programs.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Genesis presents the true account of creation, but God used literary forms familiar to ancient audiences. Understanding Babylonian myths helps us see how Genesis corrects and transcends them. The Bible doesn't fear engagement with other narratives—it presents the truth that fulfills and corrects cultural stories.",
    biblicalParallels: [
      "In the beginning God created (Genesis 1:1)",
      "By the word of the Lord the heavens were made (Psalm 33:6)",
      "God brings order from chaos (Genesis 1:2)",
      "Christ holds all things together (Colossians 1:17)"
    ],
    scriptureReferences: ["Genesis 1:1-2", "Psalm 33:6", "Isaiah 45:18", "Colossians 1:17"],
    cautionLevel: "low"
  },
  {
    id: "mithra-deity",
    name: "Mithra (Persian God)",
    category: "deity",
    organizationType: "Religious/Cultural",
    description: "Mithra—god of light, contracts, and friendship—was widely worshipped in the Roman Empire. December 25th was Mithra's birthday before becoming Christmas. Mithraic temples existed beneath Christian churches in Rome. Christians celebrate Christmas on a date originally honoring Mithra without considering it pagan compromise.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "The early church intentionally replaced pagan festivals with Christian ones—redeeming time rather than abandoning it. Christmas celebrates Christ's incarnation regardless of date origins. This demonstrates how Christians have always transformed cultural practices rather than fleeing them. Greek organizations can similarly redeem symbols.",
    biblicalParallels: [
      "The light shines in the darkness (John 1:5)",
      "To us a child is born (Isaiah 9:6)",
      "The Word became flesh (John 1:14)",
      "Redeeming the time (Ephesians 5:16)"
    ],
    scriptureReferences: ["John 1:5", "Isaiah 9:6", "John 1:14", "Colossians 2:16-17"],
    cautionLevel: "low"
  },
  {
    id: "omega-symbol-deity",
    name: "Omega Symbol (Ω)",
    category: "deity",
    organizationType: "Omega Psi Phi",
    description: "Omega—the final letter of the Greek alphabet—represents completion, finality, and ultimate achievement. It appears in physics (Ohm's law), watchmaker Omega, and numerous scientific contexts. Omega Psi Phi Fraternity prominently features this symbol. Christians use \"Alpha and Omega\" to describe Christ Himself.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Jesus declared, \"I am the Alpha and the Omega\" (Revelation 22:13)—the beginning and the end. Christians who object to Greek letters in fraternity names freely quote this verse using the same Greek letters! The Omega symbol points directly to Christ's eternal nature and ultimate authority.",
    biblicalParallels: [
      "Jesus is the Alpha and Omega (Revelation 22:13)",
      "He is the First and the Last (Isaiah 44:6)",
      "In Him all things hold together (Colossians 1:17)",
      "Jesus is the same yesterday, today, and forever (Hebrews 13:8)"
    ],
    scriptureReferences: ["Revelation 22:13", "Isaiah 44:6", "Colossians 1:17", "Hebrews 13:8"],
    cautionLevel: "low"
  },
  {
    id: "phoenix-deity",
    name: "Phoenix (Rising from Ashes)",
    category: "deity",
    organizationType: "Multiple Organizations",
    description: "The Phoenix—rising from flames—symbolizes rebirth and resurrection. It appears on city seals (Atlanta, Phoenix AZ), university logos, insurance companies, and sports teams. Christians cheer for the Phoenix Suns and live in Phoenix without religious objection to this resurrection symbol.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "The Phoenix powerfully prefigures Christ's resurrection! Rising from death to new life is the central Christian message. Early church fathers used the Phoenix as a symbol of resurrection. This imagery reinforces rather than contradicts the Gospel message of new life in Christ.",
    biblicalParallels: [
      "Christ rose from the dead on the third day (1 Corinthians 15:4)",
      "We are raised to new life in Christ (Romans 6:4)",
      "Old things pass away, all things become new (2 Corinthians 5:17)",
      "We will be resurrected (1 Thessalonians 4:16-17)"
    ],
    scriptureReferences: ["1 Corinthians 15:4", "Romans 6:4", "2 Corinthians 5:17", "Job 29:18"],
    cautionLevel: "low"
  },
  {
    id: "ra-deity",
    name: "Ra/Amon-Ra (Egyptian Sun God)",
    category: "deity",
    organizationType: "Religious/Cultural",
    description: "Ra—the sun god and king of Egyptian deities—influenced sun symbolism worldwide. Halos in Christian art derive from solar imagery. The sun rising represents resurrection and hope. Christians use sunrise service at Easter without concern for solar worship origins. \"Son/Sun of Righteousness\" wordplay appears in Malachi 4:2.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "God created the sun and rules over it (Genesis 1:16). Christ is called the \"Sun of Righteousness\" with healing in His wings (Malachi 4:2). Light symbolism permeates Scripture. Christians can appreciate solar imagery pointing to Christ the Light without worshipping creation. Easter sunrise services celebrate resurrection, not Ra.",
    biblicalParallels: [
      "The Sun of Righteousness shall arise with healing (Malachi 4:2)",
      "God made the greater light to rule the day (Genesis 1:16)",
      "The Lord God is a sun and shield (Psalm 84:11)",
      "His face was like the sun shining (Revelation 1:16)"
    ],
    scriptureReferences: ["Malachi 4:2", "Genesis 1:16", "Psalm 84:11", "Revelation 1:16"],
    cautionLevel: "low"
  },
  {
    id: "scarab-deity",
    name: "Scarab (Egyptian Sacred Beetle)",
    category: "deity",
    organizationType: "Art/Jewelry",
    description: "The scarab beetle—symbol of Ra and resurrection—appears in jewelry, museum pieces, and decorative arts worldwide. Its rolling of dung balls symbolized the sun's daily rebirth. Christians wear scarab jewelry and decorate with Egyptian motifs without religious objection, yet similar rebirth symbolism in Greek organizations is criticized.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Resurrection and rebirth are central Christian themes. The scarab's symbolism of new life each day echoes Lamentations 3:22-23—God's mercies are new every morning. Christians need not fear symbols of rebirth; rather, we can see them pointing to the ultimate resurrection in Christ.",
    biblicalParallels: [
      "His mercies are new every morning (Lamentations 3:22-23)",
      "We are raised to walk in newness of life (Romans 6:4)",
      "Behold, I make all things new (Revelation 21:5)",
      "The dead in Christ shall rise (1 Thessalonians 4:16)"
    ],
    scriptureReferences: ["Lamentations 3:22-23", "Romans 6:4", "Revelation 21:5", "2 Corinthians 5:17"],
    cautionLevel: "low"
  },
  {
    id: "shamash-deity",
    name: "Shamash (Babylonian Sun God)",
    category: "deity",
    organizationType: "Legal/Government",
    description: "Shamash—the sun god of justice—is depicted giving the law code to Hammurabi on the famous stele. This image of divine lawgiving influenced all Western legal tradition. Law schools teach Hammurabi's Code as foundational. Christians studying law encounter this Babylonian deity's legacy without moral concern.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "God is the ultimate Lawgiver (James 4:12). The concept of divinely-ordained law is biblical. Moses received the Law from God on Sinai. That other cultures understood law as divinely given demonstrates common grace—God's truth echoing in human conscience. Legal systems pursuing justice reflect God's character.",
    biblicalParallels: [
      "There is one Lawgiver (James 4:12)",
      "Moses received the Law from God (Exodus 31:18)",
      "The law is written on hearts (Romans 2:15)",
      "By Me kings reign and rulers decree justice (Proverbs 8:15)"
    ],
    scriptureReferences: ["James 4:12", "Exodus 31:18", "Romans 2:15", "Proverbs 8:15"],
    cautionLevel: "low"
  },
  {
    id: "sphinx-deity",
    name: "Sphinx (Guardian Symbol)",
    category: "deity",
    organizationType: "Multiple Organizations",
    description: "The Sphinx—lion-bodied with a human head—guards many fraternity and sorority rituals as a symbol of mystery and wisdom. It also guards the entrance to Egyptian exhibits in major museums, appears on Masonic lodges, and adorns government buildings. Christians visit these spaces without concern.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "The Sphinx represents the guarding of sacred knowledge—a concept present in Scripture. Jesus spoke in parables to reveal truth to seekers while concealing it from the dismissive. Cherubim (hybrid creatures) guarded Eden's entrance. The protective symbolism parallels God's guarding of sacred things.",
    biblicalParallels: [
      "Cherubim guarded the way to the Tree of Life (Genesis 3:24)",
      "Parables revealed and concealed truth (Matthew 13:10-17)",
      "Mysteries revealed to believers (1 Corinthians 2:7)",
      "Guardians of sacred space in the Temple (Exodus 25:18-22)"
    ],
    scriptureReferences: ["Genesis 3:24", "Matthew 13:10-17", "Exodus 25:18-22", "1 Corinthians 2:7"],
    cautionLevel: "low"
  },
  {
    id: "thoth-deity",
    name: "Thoth (Egyptian God of Wisdom)",
    category: "deity",
    organizationType: "Academic/Libraries",
    description: "Thoth—ibis-headed god of wisdom, writing, and knowledge—is the patron of scribes and scholars. His imagery influences library and university symbolism. The concept of divine wisdom being recorded in books echoes throughout academic institutions. Christians who pursue higher education engage with Thoth's legacy in scholarship.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "God values wisdom, knowledge, and the written word. Scripture itself is God's written revelation. The pursuit of learning and literacy honors God who gave humans the ability to read and write. Academic institutions preserving and transmitting knowledge continue a tradition God ordained when He commanded Moses to write.",
    biblicalParallels: [
      "Write these words (Exodus 34:27)",
      "Wisdom cries out in the streets (Proverbs 1:20)",
      "The fear of the Lord is the beginning of wisdom (Proverbs 9:10)",
      "Study to show yourself approved (2 Timothy 2:15)"
    ],
    scriptureReferences: ["Exodus 34:27", "Proverbs 9:10", "2 Timothy 2:15", "Ecclesiastes 12:12"],
    cautionLevel: "low"
  },
  {
    id: "zeus-deity",
    name: "Zeus/Jupiter (King of the Gods)",
    category: "deity",
    organizationType: "Government/Academia",
    description: "Zeus—king of the Greek gods, god of sky, thunder, and justice—appears on government buildings, university seals, and civic imagery worldwide. Jupiter gives us Thursday (Jove's day). Christians work in buildings adorned with Zeus imagery and use Jupiter-derived day names without spiritual concern.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "The Apostle Paul engaged with Greek religious culture at the Areopagus without condemning all Greek imagery (Acts 17). Zeus imagery in civic contexts represents justice and authority—values that reflect God's character. Cultural imagery can be understood symbolically without worship.",
    biblicalParallels: [
      "Paul engaged Greek thought at the Areopagus (Acts 17:22-28)",
      "The Lord is a God of justice (Isaiah 30:18)",
      "Every authority has been established by God (Romans 13:1)",
      "God thunders marvelously with His voice (Job 37:5)"
    ],
    scriptureReferences: ["Acts 17:22-28", "Isaiah 30:18", "Romans 13:1", "Job 37:5"],
    cautionLevel: "low"
  },
  {
    id: "poseidon-deity",
    name: "Poseidon/Neptune (God of the Sea)",
    category: "deity",
    organizationType: "Naval/Maritime",
    description: "Poseidon/Neptune—god of the sea—appears in coastal cities, naval traditions, and maritime organizations. His trident is iconic in oceanographic institutions. Christians serve in the Navy and engage with maritime culture that is saturated with Neptune imagery without moral objection.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "God Himself rules over the sea (Psalm 89:9). Jesus calmed the storm and walked on water. Maritime imagery of mastery over the deep reflects creation's grandeur and God's sovereignty over all elements. Coastal communities rightfully celebrate their connection to the sea.",
    biblicalParallels: [
      "God rules over the surging sea (Psalm 89:9)",
      "Jesus calmed the wind and waves (Mark 4:39)",
      "The sea is His, for He made it (Psalm 95:5)",
      "Jesus walked on water (Matthew 14:25)"
    ],
    scriptureReferences: ["Psalm 89:9", "Mark 4:39", "Psalm 95:5", "Matthew 14:25"],
    cautionLevel: "low"
  },
  {
    id: "demeter-deity",
    name: "Demeter/Ceres (Goddess of Harvest)",
    category: "deity",
    organizationType: "Agricultural",
    description: "Demeter/Ceres—goddess of harvest and agriculture—gives us the word \"cereal.\" Her imagery appears on agricultural seals, farming organizations, and food company logos. Christians thank God for the harvest while using terminology and imagery derived from Demeter/Ceres without objection.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Harvest imagery is deeply biblical. God provides the harvest, and thanksgiving for abundance is thoroughly scriptural. Agricultural symbolism represents God's provision, not pagan worship. Farmers and agricultural workers participate in God's creative order.",
    biblicalParallels: [
      "God crowns the year with bounty (Psalm 65:11)",
      "While the earth remains, seedtime and harvest shall not cease (Genesis 8:22)",
      "The land yields its harvest (Psalm 67:6)",
      "The harvest is plentiful (Matthew 9:37)"
    ],
    scriptureReferences: ["Psalm 65:9-13", "Genesis 8:22", "Psalm 67:6", "Matthew 9:37"],
    cautionLevel: "low"
  },
  {
    id: "hera-deity",
    name: "Hera/Juno (Queen of the Gods)",
    category: "deity",
    organizationType: "Marriage/Family",
    description: "Hera/Juno—queen of the gods, goddess of marriage and family—gives us June, the most popular wedding month. Christians get married in June without considering it pagan. The very word for wedding month honors this goddess, yet this is accepted while Greek organization symbolism is criticized.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Marriage and family are celebrated throughout Scripture. The month June remains the most popular for Christian weddings. The imagery represents commitment and family values—core biblical themes. Language and calendar conventions carry ancient roots without requiring worship.",
    biblicalParallels: [
      "Marriage is honorable in all (Hebrews 13:4)",
      "The two shall become one flesh (Genesis 2:24)",
      "Love your wife as Christ loved the church (Ephesians 5:25)",
      "Marriage as sacred covenant (Ephesians 5:31-32)"
    ],
    scriptureReferences: ["Hebrews 13:4", "Genesis 2:24", "Ephesians 5:25", "Ephesians 5:31-32"],
    cautionLevel: "low"
  },
  // Norse Deities
  {
    id: "odin-deity",
    name: "Odin/Woden (Norse King of Gods)",
    category: "deity",
    organizationType: "Days of the Week",
    description: "Odin—Norse king of the gods, god of wisdom, poetry, and war—gives us Wednesday (Woden's day). Christians use this day name without spiritual concern. Odin's pursuit of wisdom through sacrifice echoes, imperfectly, divine wisdom themes.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Our calendar days come from Norse gods—Wednesday (Odin), Thursday (Thor), Friday (Freya), Tuesday (Tyr). Christians use these names daily without worship. The day name is cultural linguistic heritage, not religious observance. This demonstrates how we already live with ancient deity references.",
    biblicalParallels: [
      "The Lord gives wisdom (Proverbs 2:6)",
      "Wisdom is more precious than rubies (Proverbs 8:11)",
      "The fear of the Lord is the beginning of wisdom (Proverbs 9:10)",
      "If any lacks wisdom, let him ask God (James 1:5)"
    ],
    scriptureReferences: ["Proverbs 2:6", "Proverbs 8:11", "Proverbs 9:10", "James 1:5"],
    cautionLevel: "low"
  },
  {
    id: "thor-deity",
    name: "Thor (Norse God of Thunder)",
    category: "deity",
    organizationType: "Days of the Week",
    description: "Thor—Norse god of thunder and protection—gives us Thursday (Thor's day). His hammer Mjolnir represents protection against chaos. Christians use Thursday without spiritual concern and enjoy Thor movies without considering it worship.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "God controls thunder and storms (Psalm 29). The concept of divine protection against chaos is biblical. Thursday is simply a day name derived from cultural history, not an act of worship. Christians engage with Thor in entertainment without spiritual compromise.",
    biblicalParallels: [
      "The voice of the Lord is over the waters; the God of glory thunders (Psalm 29:3)",
      "God thunders marvelously with His voice (Job 37:5)",
      "He makes lightning for the rain (Psalm 135:7)",
      "The Lord is my shield and fortress (Psalm 18:2)"
    ],
    scriptureReferences: ["Psalm 29:3", "Job 37:5", "Psalm 135:7", "Psalm 18:2"],
    cautionLevel: "low"
  },
  {
    id: "freya-deity",
    name: "Freya (Norse Goddess of Love)",
    category: "deity",
    organizationType: "Days of the Week",
    description: "Freya—Norse goddess of love, beauty, and fertility—gives us Friday (Freya's day). Christians observe Good Friday—the most sacred day in Christianity—using a name derived from this goddess without concern.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Good Friday commemorates Christ's crucifixion using a day name from Norse tradition. Love and beauty are God's gifts celebrated in Scripture. The day name is linguistic heritage, not worship. Christians observe the holiest day of the year on \"Freya's day\" without spiritual compromise.",
    biblicalParallels: [
      "God is love (1 John 4:8)",
      "Greater love has no one than this (John 15:13)",
      "The beauty of the Lord our God be upon us (Psalm 90:17)",
      "Christ died for us while we were still sinners (Romans 5:8)"
    ],
    scriptureReferences: ["1 John 4:8", "John 15:13", "Psalm 90:17", "Romans 5:8"],
    cautionLevel: "low"
  },
  // =====================================================
  // SEALS - Federal, State, and College
  // =====================================================
  {
    id: "great-seal-us",
    name: "Great Seal of the United States",
    category: "seals",
    organizationType: "Federal",
    description: "The Great Seal features an eagle (Jupiter's bird in Roman mythology), an unfinished pyramid with the Eye of Providence, and Latin mottos. The design incorporates classical imagery from Rome and Egypt. It appears on every U.S. dollar bill, passport, and official government document.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Christians use money and carry passports bearing this seal daily without spiritual concern. The Eye of Providence was adopted to represent God's watchful care over the nation. Americans, including devout Christians, use symbols with ancient pagan connections without worshipping those deities.",
    biblicalParallels: [
      "The eyes of the Lord are everywhere (Proverbs 15:3)",
      "God watches over the nations (Psalm 33:13-14)",
      "In God we trust (Psalm 56:11)",
      "Blessed is the nation whose God is the Lord (Psalm 33:12)"
    ],
    scriptureReferences: ["Proverbs 15:3", "Psalm 33:13-14", "Psalm 56:11", "Psalm 33:12"],
    cautionLevel: "low"
  },
  {
    id: "statue-of-freedom",
    name: "Statue of Freedom (U.S. Capitol)",
    category: "seals",
    organizationType: "Federal",
    description: "The bronze statue atop the Capitol dome resembles classical depictions of Roman goddesses like Libertas (Liberty) and Minerva (wisdom/war). It crowns the center of American democracy.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Tourists, including Christians, visit and photograph this statue regularly. The statue represents freedom and democracy—values compatible with biblical human dignity. Classical Roman imagery in government buildings doesn't constitute worship or spiritual danger.",
    biblicalParallels: [
      "Where the Spirit of the Lord is, there is freedom (2 Corinthians 3:17)",
      "You shall know the truth and the truth shall make you free (John 8:32)",
      "Stand fast in the liberty wherewith Christ has made us free (Galatians 5:1)",
      "Proclaim liberty throughout the land (Leviticus 25:10)"
    ],
    scriptureReferences: ["2 Corinthians 3:17", "John 8:32", "Galatians 5:1", "Leviticus 25:10"],
    cautionLevel: "low"
  },
  {
    id: "supreme-court-frieze",
    name: "Supreme Court Building Frieze",
    category: "seals",
    organizationType: "Federal",
    description: "The eastern pediment features classical figures including 'Liberty Enthroned' flanked by 'Order' and 'Authority.' Interior friezes depict Moses alongside Hammurabi, Confucius, and other lawgivers from various traditions.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "The highest court in the land operates under these images. Christian justices have served without objection to the imagery. Symbols can represent virtues and history without requiring worship. Moses appears prominently among the lawgivers, acknowledging biblical influence on Western law.",
    biblicalParallels: [
      "Justice and righteousness are the foundation of God's throne (Psalm 89:14)",
      "Moses received the Law from God (Exodus 31:18)",
      "The authorities that exist have been established by God (Romans 13:1)",
      "Act justly, love mercy, walk humbly (Micah 6:8)"
    ],
    scriptureReferences: ["Psalm 89:14", "Exodus 31:18", "Romans 13:1", "Micah 6:8"],
    cautionLevel: "low"
  },
  {
    id: "library-congress-minerva",
    name: "Library of Congress - Minerva Mosaic",
    category: "seals",
    organizationType: "Federal",
    description: "A large mosaic of Minerva (Roman goddess of wisdom) dominates the Great Hall entrance of the Library of Congress, representing wisdom and learning. This is the nation's primary library and research center.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Scholars, legislators, and visitors of all faiths use this library. A Roman goddess image in a learning institution doesn't compromise one's faith when using the library. The pursuit of wisdom and knowledge honors God who is the source of all truth.",
    biblicalParallels: [
      "Wisdom is the principal thing; therefore get wisdom (Proverbs 4:7)",
      "The Lord gives wisdom (Proverbs 2:6)",
      "Study to show yourself approved (2 Timothy 2:15)",
      "Whatever is true, noble, right, pure, lovely—think on these things (Philippians 4:8)"
    ],
    scriptureReferences: ["Proverbs 4:7", "Proverbs 2:6", "2 Timothy 2:15", "Philippians 4:8"],
    cautionLevel: "low"
  },
  {
    id: "virginia-seal",
    name: "Great Seal of Virginia",
    category: "seals",
    organizationType: "State",
    description: "Features Virtus (Roman goddess of virtue/bravery) standing over a defeated tyrant. Virtus wears the dress of an Amazon warrior and holds a spear. The motto 'Sic Semper Tyrannis' (Thus Always to Tyrants) accompanies the image.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Virginia—home to many Christians and historic churches—proudly displays this Roman goddess on its official seal. The imagery represents virtue triumphing over tyranny—a concept compatible with biblical justice. Virginians identify with this seal without worshipping Virtus.",
    biblicalParallels: [
      "Righteousness exalts a nation (Proverbs 14:34)",
      "Let justice roll down like waters (Amos 5:24)",
      "Resist the devil and he will flee (James 4:7)",
      "Overcome evil with good (Romans 12:21)"
    ],
    scriptureReferences: ["Proverbs 14:34", "Amos 5:24", "James 4:7", "Romans 12:21"],
    cautionLevel: "low"
  },
  {
    id: "california-seal",
    name: "Great Seal of California",
    category: "seals",
    organizationType: "State",
    description: "Features Minerva (Roman goddess of wisdom) fully armored, representing California's admission to statehood without going through territorial status. She was 'born fully grown' like the state itself.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "California—with the largest Christian population of any U.S. state—uses Minerva on its official seal. Christians in California identify with this state symbol without spiritual compromise. The goddess represents wisdom and the state's unique history, not religious worship.",
    biblicalParallels: [
      "If any of you lacks wisdom, let him ask God (James 1:5)",
      "The wise are mightier than the strong (Proverbs 24:5)",
      "Wisdom is better than weapons of war (Ecclesiastes 9:18)",
      "Wisdom builds her house (Proverbs 9:1)"
    ],
    scriptureReferences: ["James 1:5", "Proverbs 24:5", "Ecclesiastes 9:18", "Proverbs 9:1"],
    cautionLevel: "low"
  },
  {
    id: "new-york-seal",
    name: "Great Seal of New York",
    category: "seals",
    organizationType: "State",
    description: "Features Liberty and Justice as female figures flanking the state shield. Liberty tramples a crown (rejecting monarchy) while Justice holds scales and sword. These classical personifications appear on official New York State documents.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "New York—with thousands of churches and one of America's largest Christian populations—uses classical goddess imagery on its seal. Liberty and Justice represent values compatible with biblical teaching. New Yorkers engage with this imagery without worship.",
    biblicalParallels: [
      "Where the Spirit of the Lord is, there is liberty (2 Corinthians 3:17)",
      "Do justice, love mercy (Micah 6:8)",
      "Justice and righteousness uphold God's throne (Psalm 97:2)",
      "The Lord loves righteousness and justice (Psalm 33:5)"
    ],
    scriptureReferences: ["2 Corinthians 3:17", "Micah 6:8", "Psalm 97:2", "Psalm 33:5"],
    cautionLevel: "low"
  },
  {
    id: "columbia-university-seal",
    name: "Columbia University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Alma Mater seated on a throne, holding a scepter. Originally King's College (founded by Anglicans), Columbia uses classical imagery of a goddess-like figure representing knowledge and nurturing of students.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Columbia was founded as a Christian institution. Its classical imagery represents learning and intellectual nurturing—values compatible with faith. Christian students and faculty serve at Columbia without spiritual compromise from the seal's imagery.",
    biblicalParallels: [
      "As a mother comforts her child, so will I comfort you (Isaiah 66:13)",
      "Wisdom calls aloud in the public square (Proverbs 1:20)",
      "The Lord gives wisdom; from His mouth come knowledge and understanding (Proverbs 2:6)",
      "Train up a child in the way he should go (Proverbs 22:6)"
    ],
    scriptureReferences: ["Isaiah 66:13", "Proverbs 1:20", "Proverbs 2:6", "Proverbs 22:6"],
    cautionLevel: "low"
  },
  {
    id: "yale-university-seal",
    name: "Yale University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Hebrew text 'Urim and Thummim' (Light and Truth) and the Latin motto 'Lux et Veritas.' Founded by Congregationalist ministers, Yale combines biblical Hebrew with classical Latin traditions.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Yale was founded explicitly as a Christian institution. Its seal uses biblical Hebrew (Urim and Thummim from the high priest's breastplate). This demonstrates how Christian institutions have always blended biblical and classical traditions without spiritual compromise.",
    biblicalParallels: [
      "Urim and Thummim on the high priest's breastplate (Exodus 28:30)",
      "Your word is a lamp to my feet and a light to my path (Psalm 119:105)",
      "You shall know the truth and the truth shall make you free (John 8:32)",
      "Jesus is the light of the world (John 8:12)"
    ],
    scriptureReferences: ["Exodus 28:30", "Psalm 119:105", "John 8:32", "John 8:12"],
    cautionLevel: "low"
  },
  {
    id: "princeton-university-seal",
    name: "Princeton University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features an open Bible with the motto 'Dei Sub Numine Viget' (Under God's Power She Flourishes). Founded by Presbyterians, Princeton's seal combines classical Latin with explicit Christian imagery.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Princeton was founded by Presbyterian ministers to train clergy. Its seal explicitly acknowledges God's sovereignty. The use of Latin—the classical language—alongside Christian imagery demonstrates the compatibility of classical education with Christian faith.",
    biblicalParallels: [
      "Unless the Lord builds the house, the builders labor in vain (Psalm 127:1)",
      "In Him we live and move and have our being (Acts 17:28)",
      "The fear of the Lord is the beginning of wisdom (Proverbs 9:10)",
      "Blessed is the nation whose God is the Lord (Psalm 33:12)"
    ],
    scriptureReferences: ["Psalm 127:1", "Acts 17:28", "Proverbs 9:10", "Psalm 33:12"],
    cautionLevel: "low"
  },
  {
    id: "harvard-university-seal",
    name: "Harvard University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features the Latin motto 'Veritas' (Truth) on three open books. Founded by Puritans to train ministers, Harvard's shield uses classical Latin to express Christian educational values.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Harvard was founded explicitly 'for Christ and the Church.' The use of Latin—the language of classical learning—demonstrates how Christian education has always engaged with classical traditions. Truth-seeking in education honors God who is Truth itself.",
    biblicalParallels: [
      "You shall know the truth and the truth shall make you free (John 8:32)",
      "Jesus is the way, the truth, and the life (John 14:6)",
      "Guide me in Your truth and teach me (Psalm 25:5)",
      "The sum of Your word is truth (Psalm 119:160)"
    ],
    scriptureReferences: ["John 8:32", "John 14:6", "Psalm 25:5", "Psalm 119:160"],
    cautionLevel: "low"
  },
  {
    id: "howard-university-seal",
    name: "Howard University Seal",
    category: "seals",
    organizationType: "College (HBCU)",
    description: "Features the motto 'Veritas et Utilitas' (Truth and Service) with an open Bible and torch. Founded to educate freed slaves after the Civil War, Howard combines Christian values with classical educational traditions.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Howard was founded by Christians committed to racial justice and education. Its seal combines biblical imagery (open Bible) with classical elements (Latin motto, torch). HBCU seals demonstrate how Black Christian institutions embraced classical education while maintaining biblical faith.",
    biblicalParallels: [
      "You shall know the truth and the truth shall make you free (John 8:32)",
      "Faith without works is dead (James 2:17)",
      "Let your light shine before others (Matthew 5:16)",
      "Whatever you do, do it heartily as to the Lord (Colossians 3:23)"
    ],
    scriptureReferences: ["John 8:32", "James 2:17", "Matthew 5:16", "Colossians 3:23"],
    cautionLevel: "low"
  },
  {
    id: "spelman-college-seal",
    name: "Spelman College Seal",
    category: "seals",
    organizationType: "College (HBCU)",
    description: "Features Gaines Hall with the torch of learning and the motto 'Our Whole School for Christ.' Founded by Baptist missionaries, Spelman explicitly combines Christian mission with classical educational imagery.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Spelman's motto is explicitly Christian: 'Our Whole School for Christ.' Yet it uses the classical torch of learning without contradiction. This HBCU demonstrates that Black Christian institutions have always integrated faith with classical educational traditions.",
    biblicalParallels: [
      "Whatever you do, do all to the glory of God (1 Corinthians 10:31)",
      "Your word is a lamp to my feet (Psalm 119:105)",
      "Train up a child in the way she should go (Proverbs 22:6)",
      "Seek first the kingdom of God (Matthew 6:33)"
    ],
    scriptureReferences: ["1 Corinthians 10:31", "Psalm 119:105", "Proverbs 22:6", "Matthew 6:33"],
    cautionLevel: "low"
  },
  {
    id: "morehouse-college-seal",
    name: "Morehouse College Seal",
    category: "seals",
    organizationType: "College (HBCU)",
    description: "Features a torch and the motto 'Et Facta Est Lux' (And There Was Light). Founded by Baptist minister William Jefferson White, Morehouse's seal uses Genesis 1:3 in classical Latin.",
    doubleStandard: "Some condemn this Greek symbolism, yet similar imagery appears on state seals and college crests worn without objection.",
    christianPerspective: "Morehouse's Latin motto directly quotes Scripture: 'And there was light' (Genesis 1:3). This HBCU demonstrates how classical language enhances rather than undermines biblical truth. Martin Luther King Jr. graduated from Morehouse, showing how faith and classical learning produce transformative leaders.",
    biblicalParallels: [
      "And God said, Let there be light: and there was light (Genesis 1:3)",
      "Jesus is the light of the world (John 8:12)",
      "Arise, shine; for your light has come (Isaiah 60:1)",
      "The people who walked in darkness have seen a great light (Isaiah 9:2)"
    ],
    scriptureReferences: ["Genesis 1:3", "John 8:12", "Isaiah 60:1", "Isaiah 9:2"],
    cautionLevel: "low"
  },
  // =====================================================
  // ADDITIONAL UNIVERSITY SEALS WITH DEITIES
  // =====================================================
  {
    id: "uc-system-seal",
    name: "University of California System Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Minerva (Roman goddess of wisdom) as a central figure representing scholarship and learning. Used by all UC campuses including Berkeley, UCLA, and others.",
    doubleStandard: "The entire UC system—one of the world's most prestigious public university systems—uses a Roman goddess on its seal. Christians attend these schools without objection.",
    christianPerspective: "Minerva represents the pursuit of wisdom, which Scripture commands: 'Get wisdom, get understanding' (Proverbs 4:5). The symbol represents academic values, not religious worship.",
    biblicalParallels: ["Get wisdom, get understanding (Proverbs 4:5)", "The fear of the Lord is the beginning of wisdom (Proverbs 9:10)"],
    scriptureReferences: ["Proverbs 4:5", "Proverbs 9:10"],
    cautionLevel: "low"
  },
  {
    id: "university-michigan-seal",
    name: "University of Michigan Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena (Greek goddess of wisdom) imagery representing reason and enlightenment. Michigan is one of the nation's premier public universities.",
    doubleStandard: "Christians proudly attend Michigan without concern about its classical deity imagery, yet condemn similar symbolism in Greek organizations.",
    christianPerspective: "Athena represents wisdom and strategic thinking—qualities Scripture celebrates. The seal honors academic excellence, not pagan worship.",
    biblicalParallels: ["Wisdom is more precious than rubies (Proverbs 8:11)", "The wise in heart accept commands (Proverbs 10:8)"],
    scriptureReferences: ["Proverbs 8:11", "Proverbs 10:8"],
    cautionLevel: "low"
  },
  {
    id: "indiana-university-seal",
    name: "Indiana University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing enlightenment and scholarly pursuit. Founded in 1820, IU is Indiana's flagship public university.",
    doubleStandard: "IU graduates wear degrees displaying Greek goddess imagery. This same imagery on a Greek letter jacket is criticized.",
    christianPerspective: "The pursuit of enlightenment through education is biblical: 'The unfolding of your words gives light' (Psalm 119:130).",
    biblicalParallels: ["The unfolding of your words gives light (Psalm 119:130)", "Light shines in the darkness (John 1:5)"],
    scriptureReferences: ["Psalm 119:130", "John 1:5"],
    cautionLevel: "low"
  },
  {
    id: "purdue-university-seal",
    name: "Purdue University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Minerva representing science and industry. Purdue is renowned for engineering and astronaut graduates including Neil Armstrong.",
    doubleStandard: "Purdue engineers who walked on the moon studied under a Roman goddess seal. Greek organizations using similar imagery face condemnation.",
    christianPerspective: "Minerva represents excellence in science and practical arts—pursuits that honor God: 'Whatever you do, work at it with all your heart' (Colossians 3:23).",
    biblicalParallels: ["Whatever you do, work at it with all your heart (Colossians 3:23)", "The heavens declare the glory of God (Psalm 19:1)"],
    scriptureReferences: ["Colossians 3:23", "Psalm 19:1"],
    cautionLevel: "low"
  },
  {
    id: "ohio-state-seal",
    name: "The Ohio State University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing knowledge and scholarship. OSU is one of the nation's largest universities with over 60,000 students.",
    doubleStandard: "Ohio State's massive alumni base proudly displays Athena imagery on diplomas, but Greek organizations using Greek deity references are called demonic.",
    christianPerspective: "Knowledge and scholarship are biblical values. 'An intelligent heart acquires knowledge' (Proverbs 18:15).",
    biblicalParallels: ["An intelligent heart acquires knowledge (Proverbs 18:15)", "Apply your heart to instruction (Proverbs 23:12)"],
    scriptureReferences: ["Proverbs 18:15", "Proverbs 23:12"],
    cautionLevel: "low"
  },
  {
    id: "ohio-university-seal",
    name: "Ohio University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing scholarship and civic virtue. OU is the oldest university in Ohio, founded in 1804.",
    doubleStandard: "Ohio's oldest university uses Greek goddess imagery without controversy. Black Greek organizations using Greek letters face scrutiny.",
    christianPerspective: "Civic virtue is biblical: 'Seek the welfare of the city' (Jeremiah 29:7). Classical symbols of virtue align with Scripture.",
    biblicalParallels: ["Seek the welfare of the city (Jeremiah 29:7)", "Let your light shine before others (Matthew 5:16)"],
    scriptureReferences: ["Jeremiah 29:7", "Matthew 5:16"],
    cautionLevel: "low"
  },
  {
    id: "uva-seal",
    name: "University of Virginia Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing learning. Founded by Thomas Jefferson in 1819, UVA is considered one of the original 'Public Ivies.'",
    doubleStandard: "Thomas Jefferson's university uses Greek goddess imagery. Christians attend UVA without moral concern, but judge Greek organizations harshly.",
    christianPerspective: "Jefferson's vision of educated citizens serving democracy aligns with biblical principles of wisdom benefiting community.",
    biblicalParallels: ["Where there is no vision, the people perish (Proverbs 29:18)", "Wisdom is better than weapons of war (Ecclesiastes 9:18)"],
    scriptureReferences: ["Proverbs 29:18", "Ecclesiastes 9:18"],
    cautionLevel: "low"
  },
  {
    id: "miami-ohio-seal",
    name: "Miami University (Ohio) Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Minerva representing scholarship. Known as a 'Public Ivy,' Miami has produced many Greek organization founders.",
    doubleStandard: "Miami University—birthplace of several major fraternities—uses a Roman goddess on its seal. The irony is striking.",
    christianPerspective: "Miami's tradition of scholarship under Minerva has produced generations of Christian leaders who saw no conflict with their faith.",
    biblicalParallels: ["Get wisdom, though it cost all you have (Proverbs 4:7)", "Instruct the wise and they will be wiser still (Proverbs 9:9)"],
    scriptureReferences: ["Proverbs 4:7", "Proverbs 9:9"],
    cautionLevel: "low"
  },
  {
    id: "uga-seal",
    name: "University of Georgia Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing wisdom. UGA is America's oldest state-chartered university (1785).",
    doubleStandard: "Georgia—a Bible Belt state—has a Greek goddess on its flagship university seal. Christians graduate proudly under this symbol.",
    christianPerspective: "Georgia's first graduates were often ministers. They saw no conflict between classical education and Christian faith.",
    biblicalParallels: ["The fear of the Lord is the beginning of knowledge (Proverbs 1:7)", "Study to show yourself approved (2 Timothy 2:15)"],
    scriptureReferences: ["Proverbs 1:7", "2 Timothy 2:15"],
    cautionLevel: "low"
  },
  {
    id: "uiuc-seal",
    name: "University of Illinois Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Minerva representing education. UIUC is one of the original land-grant universities.",
    doubleStandard: "Illinois' flagship university uses Roman deity imagery on official documents. Greek organizations using Greek letters face different standards.",
    christianPerspective: "Land-grant universities were created to serve communities through education—a mission aligned with biblical principles of service.",
    biblicalParallels: ["Train a child in the way he should go (Proverbs 22:6)", "Go and make disciples of all nations, teaching them (Matthew 28:19-20)"],
    scriptureReferences: ["Proverbs 22:6", "Matthew 28:19-20"],
    cautionLevel: "low"
  },
  {
    id: "uw-seal",
    name: "University of Washington Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing scholarship. UW is the flagship university of Washington state.",
    doubleStandard: "The Pacific Northwest's premier university displays Greek goddess imagery. No one questions students' faith for attending.",
    christianPerspective: "Athena as a symbol of wisdom aligns with Solomon's prayer: 'Give your servant a discerning heart' (1 Kings 3:9).",
    biblicalParallels: ["Give your servant a discerning heart (1 Kings 3:9)", "Blessed is the one who finds wisdom (Proverbs 3:13)"],
    scriptureReferences: ["1 Kings 3:9", "Proverbs 3:13"],
    cautionLevel: "low"
  },
  {
    id: "ut-austin-seal",
    name: "University of Texas at Austin Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Minerva representing education and wisdom. UT Austin is Texas' flagship university and one of the largest in the nation.",
    doubleStandard: "In conservative Texas, the flagship university uses a Roman goddess. Christian Texans graduate under this symbol without concern.",
    christianPerspective: "Texas values education as a pathway to opportunity—a principle Scripture supports: 'Wisdom brings success' (Ecclesiastes 10:10).",
    biblicalParallels: ["Wisdom brings success (Ecclesiastes 10:10)", "The wise store up knowledge (Proverbs 10:14)"],
    scriptureReferences: ["Ecclesiastes 10:10", "Proverbs 10:14"],
    cautionLevel: "low"
  },
  {
    id: "unc-seal",
    name: "University of North Carolina Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing scholarship. UNC Chapel Hill is the nation's first public university (1789).",
    doubleStandard: "America's oldest public university uses Greek goddess imagery. Its Christian graduates have never been accused of paganism.",
    christianPerspective: "UNC's founders—including many ministers—chose classical imagery to represent the noble pursuit of knowledge.",
    biblicalParallels: ["Wisdom is supreme; therefore get wisdom (Proverbs 4:7)", "The wise inherit honor (Proverbs 3:35)"],
    scriptureReferences: ["Proverbs 4:7", "Proverbs 3:35"],
    cautionLevel: "low"
  },
  {
    id: "uw-madison-seal",
    name: "University of Wisconsin-Madison Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing wisdom and learning. UW-Madison is Wisconsin's flagship research university.",
    doubleStandard: "Wisconsin Christians display diplomas featuring Greek goddess imagery proudly. Greek paraphernalia with letters receives criticism.",
    christianPerspective: "The Wisconsin Idea—that the university should benefit all citizens—reflects biblical principles of using knowledge for community good.",
    biblicalParallels: ["Do not withhold good from those to whom it is due (Proverbs 3:27)", "Let your light shine before others (Matthew 5:16)"],
    scriptureReferences: ["Proverbs 3:27", "Matthew 5:16"],
    cautionLevel: "low"
  },
  {
    id: "umn-seal",
    name: "University of Minnesota Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing scholarship. Minnesota's flagship university serves the Land of 10,000 Lakes.",
    doubleStandard: "Minnesota's largest university uses Greek deity imagery. Christian alumni display their degrees without concern.",
    christianPerspective: "Higher education's mission to prepare students for service aligns with biblical calling to use gifts for others' benefit.",
    biblicalParallels: ["Each of you should use whatever gift you have received to serve others (1 Peter 4:10)"],
    scriptureReferences: ["1 Peter 4:10"],
    cautionLevel: "low"
  },
  {
    id: "bu-seal",
    name: "Boston University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing wisdom. Founded by Methodists in 1839, BU is one of the largest private universities.",
    doubleStandard: "A Methodist-founded university uses Greek goddess imagery. Martin Luther King Jr. earned his doctorate here under this seal.",
    christianPerspective: "Methodist founders saw no conflict between Christian faith and classical educational symbols. MLK studied theology under Athena's image.",
    biblicalParallels: ["Learn to do right; seek justice (Isaiah 1:17)", "I have fought the good fight (2 Timothy 4:7)"],
    scriptureReferences: ["Isaiah 1:17", "2 Timothy 4:7"],
    cautionLevel: "low"
  },
  {
    id: "american-university-seal",
    name: "American University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing wisdom. Located in Washington D.C., AU was founded by Methodists in 1893.",
    doubleStandard: "Another Methodist university using Greek deity imagery. Christian students study government and ministry under this seal.",
    christianPerspective: "AU's location in the nation's capital reflects the integration of classical values with American governance.",
    biblicalParallels: ["Submit yourselves for the Lord's sake to every human authority (1 Peter 2:13)"],
    scriptureReferences: ["1 Peter 2:13"],
    cautionLevel: "low"
  },
  {
    id: "hunter-college-seal",
    name: "Hunter College Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing scholarship. Part of CUNY, Hunter serves diverse New York City students.",
    doubleStandard: "An urban public college in New York uses Greek goddess imagery for all graduates, including Christians.",
    christianPerspective: "Hunter's mission to provide accessible education to all reflects biblical concern for equitable opportunity.",
    biblicalParallels: ["Learn to do right; seek justice; defend the oppressed (Isaiah 1:17)"],
    scriptureReferences: ["Isaiah 1:17"],
    cautionLevel: "low"
  },
  {
    id: "temple-university-seal",
    name: "Temple University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing wisdom. Founded by Baptist minister Russell Conwell in 1884 to provide education for working-class students.",
    doubleStandard: "A Baptist-founded university uses Greek goddess imagery. Its Christian origins didn't prevent classical symbolism.",
    christianPerspective: "Temple's founder believed every person deserved access to education—a principle rooted in human dignity Scripture affirms.",
    biblicalParallels: ["There is neither Jew nor Gentile, neither slave nor free (Galatians 3:28)", "God shows no favoritism (Romans 2:11)"],
    scriptureReferences: ["Galatians 3:28", "Romans 2:11"],
    cautionLevel: "low"
  },
  {
    id: "uf-seal",
    name: "University of Florida Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Minerva representing scholarship. UF is Florida's flagship university and a major research institution.",
    doubleStandard: "Florida's largest university uses Roman deity imagery. Christian Gators display their degrees proudly.",
    christianPerspective: "Florida's sunny symbol of scholarship represents the pursuit of knowledge that benefits society.",
    biblicalParallels: ["The wise in heart are called discerning (Proverbs 16:21)"],
    scriptureReferences: ["Proverbs 16:21"],
    cautionLevel: "low"
  },
  {
    id: "uiowa-seal",
    name: "University of Iowa Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing scholarship. Iowa was the first public university to admit men and women equally.",
    doubleStandard: "A pioneer in equality uses Greek goddess imagery. Christian graduates celebrate their degrees without concern.",
    christianPerspective: "Iowa's commitment to equal access reflects Galatians 3:28: 'There is neither male nor female... you are all one.'",
    biblicalParallels: ["There is neither male nor female, for you are all one in Christ Jesus (Galatians 3:28)"],
    scriptureReferences: ["Galatians 3:28"],
    cautionLevel: "low"
  },
  {
    id: "uchicago-seal",
    name: "University of Chicago Seal",
    category: "seals",
    organizationType: "College",
    description: "Features classical imagery representing scholarly pursuit. Founded by John D. Rockefeller with Baptist support in 1890.",
    doubleStandard: "A Baptist-funded university uses classical imagery. Its world-renowned Divinity School operates under these symbols.",
    christianPerspective: "Chicago's motto 'Crescat scientia; vita excolatur' (Let knowledge grow; let life be enriched) aligns with biblical values.",
    biblicalParallels: ["The fruit of the righteous is a tree of life (Proverbs 11:30)", "But grow in the grace and knowledge of our Lord (2 Peter 3:18)"],
    scriptureReferences: ["Proverbs 11:30", "2 Peter 3:18"],
    cautionLevel: "low"
  },
  {
    id: "northwestern-seal",
    name: "Northwestern University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing scholarship. Founded by Methodists in 1851, Northwestern is a leading research university.",
    doubleStandard: "Methodist-founded Northwestern uses Greek goddess imagery. Its graduates include ministers, missionaries, and Christian leaders.",
    christianPerspective: "Northwestern's founders integrated faith and learning, seeing no conflict between Christian mission and classical education.",
    biblicalParallels: ["Whatever you have learned or received or heard from me—put into practice (Philippians 4:9)"],
    scriptureReferences: ["Philippians 4:9"],
    cautionLevel: "low"
  },
  {
    id: "msu-seal",
    name: "Michigan State University Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing wisdom. MSU was America's first land-grant university (1855).",
    doubleStandard: "The nation's pioneer land-grant university uses Greek goddess imagery. Spartans graduate proudly under this symbol.",
    christianPerspective: "Land-grant universities were created to serve communities through practical education—a mission aligned with biblical service.",
    biblicalParallels: ["Serve one another humbly in love (Galatians 5:13)"],
    scriptureReferences: ["Galatians 5:13"],
    cautionLevel: "low"
  },
  {
    id: "uk-seal",
    name: "University of Kansas Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing scholarship. KU is Kansas' flagship university.",
    doubleStandard: "Kansas Christians attend and graduate under Greek goddess imagery without spiritual concern.",
    christianPerspective: "The sunflower state's university uses classical symbols of wisdom to represent academic excellence.",
    biblicalParallels: ["Wisdom is more precious than rubies (Proverbs 8:11)"],
    scriptureReferences: ["Proverbs 8:11"],
    cautionLevel: "low"
  },
  {
    id: "ou-seal",
    name: "University of Oklahoma Seal",
    category: "seals",
    organizationType: "College",
    description: "Features Athena representing wisdom. OU is Oklahoma's flagship university in the heart of the Bible Belt.",
    doubleStandard: "In one of America's most religious states, the flagship university uses Greek goddess imagery without controversy.",
    christianPerspective: "Oklahoma's strong Christian culture sees no conflict with classical educational symbols representing wisdom.",
    biblicalParallels: ["The beginning of wisdom is this: Get wisdom (Proverbs 4:7)"],
    scriptureReferences: ["Proverbs 4:7"],
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
  },
  // =====================================================
  // OATHS - Ancient Origins and Modern Translations
  // =====================================================
  {
    id: "hippocratic-oath",
    name: "Hippocratic Oath",
    category: "oaths",
    organizationType: "Medical Profession",
    description: "The foundational oath of medical ethics, originating in ancient Greece around 400 BCE. Originally invoked Greek gods Apollo, Asclepius, Hygieia, and Panacea as divine witnesses. Modern versions have been adapted to remove pagan religious references while preserving ethical principles.",
    doubleStandard: "Medical professionals take oaths with Greek deity origins without condemnation, yet similar cultural connections in Greek organizations are labeled as demonic.",
    christianPerspective: "The Church has historically adapted and Christianized professional oaths. The ethical principles of the Hippocratic Oath—do no harm, maintain confidentiality, respect life—align beautifully with Christian values. Christians take modern versions of this oath without moral conflict.",
    biblicalParallels: [
      "Do unto others as you would have them do unto you (Luke 6:31)",
      "Love your neighbor as yourself (Mark 12:31)",
      "Heal the sick (Matthew 10:8)",
      "Let your yes be yes (Matthew 5:37)"
    ],
    scriptureReferences: ["Matthew 5:37", "Luke 6:31", "Mark 12:31", "James 5:14-16"],
    cautionLevel: "low",
    cautionNote: "ORIGINAL GREEK TEXT (c. 400 BCE):\n\n'Ὄμνυμι Ἀπόλλωνα ἰητρὸν καὶ Ἀσκληπιὸν καὶ Ὑγείαν καὶ Πανάκειαν καὶ θεοὺς πάντας τε καὶ πάσας, ἵστορας ποιεύμενος, ἐπιτελέα ποιήσειν κατὰ δύναμιν καὶ κρίσιν ἐμὴν ὅρκον τόνδε καὶ συγγραφὴν τήνδε...'\n\nORIGINAL ENGLISH TRANSLATION:\n\n'I swear by Apollo Physician, by Asclepius, by Hygieia, by Panacea, and by all the gods and goddesses, making them my witnesses, that I will carry out, according to my ability and judgment, this oath and this indenture...'\n\nI will use those dietary regimens which will benefit my patients according to my greatest ability and judgment, and I will do no harm or injustice to them. I will not give a lethal drug to anyone if I am asked, nor will I advise such a plan... Into whatever homes I go, I will enter them for the benefit of the sick, avoiding any voluntary act of impropriety or corruption.\n\nMODERN VERSION (Declaration of Geneva, 1948):\n\n'I solemnly pledge to dedicate my life to the service of humanity... The health of my patient will be my first consideration... I will maintain the utmost respect for human life... I will not permit considerations of age, disease or disability, creed, ethnic origin, gender, nationality, political affiliation, race, sexual orientation, social standing, or any other factor to intervene between my duty and my patient.'"
  },
  {
    id: "military-oath-roman",
    name: "Roman Military Oath (Sacramentum)",
    category: "oaths",
    organizationType: "Military Service",
    description: "The Roman sacramentum militare was a sacred oath taken by soldiers, binding them to their commander and the Roman state. It invoked Jupiter and Mars as divine witnesses and included promises of loyalty unto death. This oath tradition directly influenced modern military oaths worldwide.",
    doubleStandard: "Military personnel take oaths descended from Roman traditions invoking pagan gods, yet are not required to renounce this heritage. Similar Greek organizational connections are condemned.",
    christianPerspective: "Early Christians served in the Roman military while maintaining faith in Christ. The concept of binding commitment to service is honored in Scripture. Modern military oaths have been adapted to invoke God or simply affirm allegiance, demonstrating how oaths can be redeemed.",
    biblicalParallels: [
      "The centurion's great faith (Matthew 8:5-13)",
      "Cornelius the devout centurion (Acts 10)",
      "Soldiers who believed (Luke 3:14)",
      "No greater love than laying down one's life (John 15:13)"
    ],
    scriptureReferences: ["Matthew 8:10", "Acts 10:1-2", "Romans 13:1-7", "John 15:13"],
    cautionLevel: "low",
    cautionNote: "ORIGINAL LATIN (c. 100 BCE):\n\n'Iuro per Iovem Optimum Maximum et genium imperatoris et Lares et Penates et Martem Patrem et Quirinum, me fidelem futurum Romae et imperatori, neque mortem fugiturum neque quicquam praepositorum ordinum imperatori...'\n\nORIGINAL ENGLISH TRANSLATION:\n\n'I swear by Jupiter the Best and Greatest, and by the genius of the Emperor, by the household gods, by Mars the Father and Quirinus, that I will be faithful to Rome and to the Emperor, that I will not flee from death nor put anything before the Emperor's commands...'\n\nMODERN U.S. MILITARY OATH OF ENLISTMENT:\n\n'I, (name), do solemnly swear that I will support and defend the Constitution of the United States against all enemies, foreign and domestic; that I will bear true faith and allegiance to the same; and that I will obey the orders of the President of the United States and the orders of the officers appointed over me, according to regulations and the Uniform Code of Military Justice. So help me God.'"
  },
  {
    id: "judicial-oath-roman",
    name: "Roman Judicial Oath",
    category: "oaths",
    organizationType: "Legal/Judicial System",
    description: "Roman judicial oaths (iusiurandum) invoked Jupiter, Dius Fidius (god of oaths), and other deities to witness truthful testimony and fair judgment. These oaths formed the foundation of Western legal traditions, including modern courtroom oaths.",
    doubleStandard: "Every witness and juror in American courts takes oaths descended from Roman traditions, yet no one demands they renounce this classical heritage. Greek organizations face different standards.",
    christianPerspective: "Christians are called to speak truth and pursue justice. The solemnity of oath-taking reflects the seriousness of our words before God. Modern judicial oaths have been adapted to invoke God or allow affirmations, showing how traditions can be Christianized.",
    biblicalParallels: [
      "Speak truth to one another (Zechariah 8:16)",
      "Do not bear false witness (Exodus 20:16)",
      "The Lord hates a lying tongue (Proverbs 6:16-17)",
      "Let your yes be yes (Matthew 5:37)"
    ],
    scriptureReferences: ["Exodus 20:16", "Zechariah 8:16", "Proverbs 12:17", "Matthew 5:33-37"],
    cautionLevel: "low",
    cautionNote: "ORIGINAL LATIN (c. 200 BCE):\n\n'Iuro per Iovem lapidem, per Dium Fidium, per genios maiorum, me verum dicturum esse et nihil celatorum, ita me Iuppiter iuvet...'\n\nORIGINAL ENGLISH TRANSLATION:\n\n'I swear by Jupiter's stone, by Dius Fidius, by the spirits of my ancestors, that I will speak the truth and conceal nothing, so help me Jupiter...'\n\nMODERN COURTROOM OATH:\n\n'Do you solemnly swear that you will tell the truth, the whole truth, and nothing but the truth, so help you God?'\n\nAFFIRMATION OPTION (for those with religious objections):\n\n'Do you solemnly, sincerely, and truly declare and affirm that the evidence you shall give will be the truth, the whole truth, and nothing but the truth?'"
  },
  {
    id: "senator-oath-roman",
    name: "Roman Senate Oath",
    category: "oaths",
    organizationType: "Government/Legislative",
    description: "Roman senators took sacred oaths upon entering office, invoking Jupiter Capitolinus and the Penates (household gods) to witness their commitment to the Republic. These oaths bound senators to uphold Roman law, protect the state, and serve with integrity.",
    doubleStandard: "U.S. Senators take oaths with clear lineage to Roman senatorial traditions, yet this classical heritage is celebrated rather than condemned. Greek organizations are held to different standards.",
    christianPerspective: "Christians are called to pray for those in authority (1 Timothy 2:1-2) and respect governing institutions (Romans 13). The concept of sacred commitment to public service aligns with biblical principles of stewardship and accountability before God.",
    biblicalParallels: [
      "Pray for those in authority (1 Timothy 2:1-2)",
      "Submit to governing authorities (Romans 13:1)",
      "Seek the welfare of the city (Jeremiah 29:7)",
      "Do justice, love mercy (Micah 6:8)"
    ],
    scriptureReferences: ["1 Timothy 2:1-2", "Romans 13:1-7", "Jeremiah 29:7", "Micah 6:8"],
    cautionLevel: "low",
    cautionNote: "ORIGINAL LATIN (c. 100 BCE):\n\n'Iuro per Iovem Capitolinum et Penates publicos populi Romani, me rem publicam fideliter gesturum, neque pecunia neque gratia neque metu neque spe neque studio partium ductum iri, sed quod e re publica esse censebo, id semper acturum...'\n\nORIGINAL ENGLISH TRANSLATION:\n\n'I swear by Jupiter of the Capitol and by the public Penates of the Roman people, that I will faithfully conduct public affairs, that I will not be led by money, favor, fear, hope, or partisan zeal, but that I will always do what I judge to be in the public interest...'\n\nMODERN U.S. SENATE OATH:\n\n'I do solemnly swear (or affirm) that I will support and defend the Constitution of the United States against all enemies, foreign and domestic; that I will bear true faith and allegiance to the same; that I take this obligation freely, without any mental reservation or purpose of evasion; and that I will well and faithfully discharge the duties of the office on which I am about to enter: So help me God.'"
  },
  {
    id: "oath-presidential",
    name: "Presidential Oath of Office",
    category: "oaths",
    organizationType: "Executive Government",
    description: "The U.S. Presidential Oath, prescribed by the Constitution, follows traditions of executive oaths dating to ancient Rome. While not invoking pagan deities, the structure and solemnity echo Roman inaugurations where new leaders swore before Jupiter Optimus Maximus.",
    doubleStandard: "The most powerful oath in America has classical roots, yet is considered sacred. Greek organizational oaths with similar heritage are labeled as spiritually dangerous.",
    christianPerspective: "Presidential oaths invoke God's help, demonstrating how ancient oath traditions have been Christianized. Leaders throughout Scripture took binding commitments. The oath represents accountability before God and nation.",
    biblicalParallels: [
      "Let your yes be yes (Matthew 5:37)",
      "Pray for leaders (1 Timothy 2:1-2)",
      "By faith Moses refused Pharaoh's palace (Hebrews 11:24-26)",
      "Render to Caesar what is Caesar's (Matthew 22:21)"
    ],
    scriptureReferences: ["Matthew 5:37", "1 Timothy 2:1-2", "Romans 13:1", "Proverbs 29:2"],
    cautionLevel: "low",
    cautionNote: "CONSTITUTIONAL TEXT (Article II, Section 1):\n\n'I do solemnly swear (or affirm) that I will faithfully execute the Office of President of the United States, and will to the best of my Ability, preserve, protect and defend the Constitution of the United States.'\n\nTRADITIONAL ADDITION:\n\n'So help me God' (added by George Washington, continued by tradition)"
  },
  {
    id: "oath-attorney",
    name: "Attorney's Oath",
    category: "oaths",
    organizationType: "Legal Profession",
    description: "Attorney oaths trace to Roman advocatus traditions where legal representatives swore before the gods to serve justice. The modern oath binds lawyers to uphold the Constitution, maintain client confidentiality, and pursue justice.",
    doubleStandard: "Every practicing attorney takes an oath with Roman legal heritage without condemnation. Greek organizations face stricter scrutiny for similar cultural connections.",
    christianPerspective: "Christians are called to defend the defenseless (Proverbs 31:8-9) and pursue justice. Legal advocacy can be a ministry of reconciliation and protection. The ethical commitments in attorney oaths align with biblical values.",
    biblicalParallels: [
      "Defend the rights of the poor (Proverbs 31:8-9)",
      "Do justice and righteousness (Jeremiah 22:3)",
      "The Lord loves justice (Psalm 37:28)",
      "Act justly, love mercy (Micah 6:8)"
    ],
    scriptureReferences: ["Proverbs 31:8-9", "Micah 6:8", "Isaiah 1:17", "Amos 5:24"],
    cautionLevel: "low",
    cautionNote: "ORIGINAL LATIN (Roman Advocatus Oath, c. 100 CE):\n\n'Iuro per Iovem et deos Penates me bonam fidem praestaturum, causam clientis mei fideliter defensurum, neque pecuniam neque gratiam praeposituram veritati et iustitiae...'\n\nORIGINAL ENGLISH TRANSLATION:\n\n'I swear by Jupiter and the household gods that I will act in good faith, faithfully defend the cause of my client, and not place money or favor before truth and justice...'\n\nMODERN ATTORNEY OATH (varies by state):\n\n'I do solemnly swear that I will support the Constitution of the United States and the Constitution of this State; that I will maintain the respect due to courts of justice and judicial officers; that I will not counsel or maintain any suit or proceeding which shall appear to me to be unjust, nor any defense except such as I believe to be honestly debatable under the law; that I will employ such means only as are consistent with truth and honor; and that I will never seek to mislead the judge or jury by any artifice or false statement of fact or law. So help me God.'"
  },
  {
    id: "oath-trade-union",
    name: "Trade Union Oath",
    category: "oaths",
    organizationType: "Labor Organizations",
    description: "Trade union oaths trace to medieval guild traditions where craftsmen swore before patron saints and God to uphold quality standards, protect trade secrets, and support fellow workers. These oaths created binding fraternal obligations similar to Greek organizations.",
    doubleStandard: "Union members take oaths of solidarity and mutual support rooted in medieval guild traditions without religious scrutiny. Yet Greek organizations face criticism for similar fraternal commitments.",
    christianPerspective: "The early church practiced mutual support and shared resources (Acts 2:44-45). Trade unions embody biblical principles of fair wages (James 5:4), protecting workers from exploitation, and collective care for one another.",
    biblicalParallels: [
      "The worker deserves his wages (Luke 10:7)",
      "Do not hold back wages of a hired worker (Leviticus 19:13)",
      "All the believers had everything in common (Acts 2:44)",
      "Bear one another's burdens (Galatians 6:2)"
    ],
    scriptureReferences: ["Luke 10:7", "James 5:4", "Leviticus 19:13", "Galatians 6:2"],
    cautionLevel: "low",
    cautionNote: "ORIGINAL MEDIEVAL GUILD OATH (c. 1200 CE):\n\n'In nomine Patris et Filii et Spiritus Sancti, ego iuro per Sanctum [Patronum] me artem meam fideliter exerciturum, secreta gildae servaturum, fratres meos adiuturum...'\n\nORIGINAL ENGLISH TRANSLATION:\n\n'In the name of the Father, Son, and Holy Spirit, I swear by Saint [Patron] that I will faithfully practice my craft, keep the secrets of the guild, help my brothers in need, and uphold the standards of our trade...'\n\nMODERN UNION PLEDGE (AFL-CIO example):\n\n'I pledge my honor to faithfully observe the Constitution and laws of the [Union], to comply with all the rules and regulations for the government thereof, not to discriminate against a fellow worker on account of creed, color, or nationality, to defend freedom of thought and the right of all to organize, and to support the principles of trade unionism.'"
  },
  {
    id: "oath-funeral-director",
    name: "Funeral Director's Oath",
    category: "oaths",
    organizationType: "Mortuary Profession",
    description: "Funeral directors take professional oaths rooted in ancient traditions of honoring the dead. From Egyptian embalmers who served Anubis to Roman funeratores who invoked the Manes (spirits of ancestors), caring for the deceased has always carried sacred obligations.",
    doubleStandard: "Funeral professionals serve in a field with deep pagan roots—Egyptian embalming invoked Anubis and Osiris—yet face no religious criticism. Greek organizations using far less religious imagery receive disproportionate scrutiny.",
    christianPerspective: "Caring for the dead is a biblical virtue. Joseph of Arimathea honored Christ by preparing his body for burial. Treating the deceased with dignity reflects the Christian belief that our bodies are temples of the Holy Spirit.",
    biblicalParallels: [
      "Joseph of Arimathea cared for Jesus' body (Matthew 27:57-60)",
      "Tobit buried the dead as righteous service (Tobit 1:17-18)",
      "Your body is a temple of the Holy Spirit (1 Corinthians 6:19)",
      "Blessed are those who mourn (Matthew 5:4)"
    ],
    scriptureReferences: ["Matthew 27:57-60", "1 Corinthians 6:19", "Matthew 5:4", "Ecclesiastes 7:2"],
    cautionLevel: "low",
    cautionNote: "ORIGINAL EGYPTIAN EMBALMER'S PRAYER (c. 1500 BCE):\n\n'O Anubis, Guardian of the Dead, guide my hands as I prepare this body for the journey to the West. O Osiris, Lord of the Underworld, receive this one who comes to you...'\n\nORIGINAL ENGLISH TRANSLATION:\n\n'The Egyptian embalmers invoked Anubis (jackal-headed god of mummification) and Osiris (god of the afterlife) during the 70-day embalming process. These religious rituals were inseparable from the technical practice.'\n\nMODERN FUNERAL DIRECTOR'S PLEDGE (NFDA Code of Ethics):\n\n'As a funeral director, I pledge to serve the public in a manner that is caring, competent, and ethical. I will treat the deceased and their families with dignity, respect, and compassion. I will maintain the highest professional standards, uphold the trust placed in me, and conduct myself with integrity in all professional matters.'"
  },
  {
    id: "oath-physician-modern",
    name: "Declaration of Geneva",
    category: "oaths",
    organizationType: "Medical Profession",
    description: "Adopted by the World Medical Association in 1948 as a modern reformation of the Hippocratic Oath. It removes all references to Greek deities while preserving ethical medical principles, demonstrating how ancient oaths can be successfully adapted.",
    doubleStandard: "The medical profession successfully adapted an oath that originally invoked Apollo and Asclepius. This proves cultural traditions can be reformed—a courtesy often denied to Greek organizations.",
    christianPerspective: "The Declaration of Geneva exemplifies redemption of cultural practices. Just as this oath was purified of pagan elements while preserving its ethical core, Greek organizations can maintain traditions while centering them on Christ.",
    biblicalParallels: [
      "First do no harm aligns with love your neighbor (Mark 12:31)",
      "Confidentiality reflects trustworthiness (Proverbs 11:13)",
      "Respecting life honors God's creation (Genesis 1:27)",
      "Service to humanity reflects Christ's example (Mark 10:45)"
    ],
    scriptureReferences: ["Mark 12:31", "Proverbs 11:13", "Genesis 1:27", "Philippians 2:3-4"],
    cautionLevel: "low",
    cautionNote: "DECLARATION OF GENEVA (2017 revision):\n\n'As a member of the medical profession:\n\nI SOLEMNLY PLEDGE to dedicate my life to the service of humanity;\nThe health and well-being of my patient will be my first consideration;\nI WILL RESPECT the autonomy and dignity of my patient;\nI WILL MAINTAIN the utmost respect for human life;\nI WILL NOT PERMIT considerations of age, disease or disability, creed, ethnic origin, gender, nationality, political affiliation, race, sexual orientation, social standing, or any other factor to intervene between my duty and my patient;\nI WILL RESPECT the secrets that are confided in me;\nI WILL PRACTICE my profession with conscience and dignity;\nI WILL MAKE the health of my patient my first consideration;\nI MAKE THESE PROMISES solemnly, freely, and upon my honour.'"
  },
  {
    id: "oath-fraternity-sorority",
    name: "Fraternity & Sorority Oaths",
    category: "oaths",
    organizationType: "Greek Letter Organizations",
    description: "Greek letter organizations maintain oath traditions that mirror professional oaths in structure and purpose. Like medical, legal, and military oaths, fraternity and sorority pledges create binding commitments to ethical conduct, mutual support, and organizational values. These oaths trace to ancient Greek and Roman traditions of sworn brotherhood.",
    doubleStandard: "Professional oaths with identical structures—binding members to secrecy, mutual aid, and organizational loyalty—are celebrated in medicine, law, and military. Yet Greek organizational oaths using the same format are labeled 'demonic covenants.'",
    christianPerspective: "The structure of fraternal oaths mirrors biblical covenants of friendship (Jonathan and David, 1 Samuel 18:3) and Christian vows of mutual support. What matters is the content—whether the oath contradicts Scripture—not the form. Most Greek oaths emphasize virtues Scripture celebrates.",
    biblicalParallels: [
      "Jonathan and David made a covenant of friendship (1 Samuel 18:3)",
      "Bear one another's burdens (Galatians 6:2)",
      "A friend loves at all times (Proverbs 17:17)",
      "Iron sharpens iron (Proverbs 27:17)"
    ],
    scriptureReferences: ["1 Samuel 18:3", "Galatians 6:2", "Proverbs 17:17", "Proverbs 27:17"],
    cautionLevel: "low",
    cautionNote: "EXAMPLE FRATERNITY OATH STRUCTURE (generalized):\n\n'I solemnly pledge to uphold the principles and ideals of [Organization], to support my brothers/sisters in times of need, to pursue excellence in scholarship and character, to serve my community, and to maintain the honor of our bond throughout my life.'\n\nCOMPARISON TO PROFESSIONAL OATHS:\n\n• Medical Oath: 'I will apply...all measures required for the benefit of the sick' → Fraternal: 'I will support my brothers in times of need'\n• Legal Oath: 'I will maintain client confidentiality' → Fraternal: 'I will protect the sacred bonds of our brotherhood'\n• Military Oath: 'I will bear true faith and allegiance' → Fraternal: 'I pledge my loyalty to this organization'\n\nThe structural parallels are unmistakable. The key question for Christians is whether specific content contradicts Scripture, not whether the oath form resembles ancient traditions."
  },
  {
    id: "oath-marriage-ancient",
    name: "Ancient Marriage Oaths",
    category: "oaths",
    organizationType: "Marriage/Family",
    description: "Marriage vows are among humanity's oldest oaths. Ancient Roman, Greek, Hebrew, and Egyptian cultures all formalized marriage through sacred oaths invoking divine witnesses. Modern wedding vows descend directly from these ancient traditions, demonstrating how oath-taking transcends any single religious tradition.",
    doubleStandard: "Christian wedding vows follow structures identical to ancient Roman confarreatio ceremonies, yet no one demands couples 'renounce' this pagan heritage. Meanwhile, Greek organizations using similar oath structures face condemnation.",
    christianPerspective: "God instituted marriage before any culture or religion existed (Genesis 2:24). Wedding vows, regardless of their cultural evolution, reflect the divine pattern of covenant faithfulness. The solemnity of 'till death do us part' echoes the permanence God intended.",
    biblicalParallels: [
      "A man shall leave his father and mother and hold fast to his wife (Genesis 2:24)",
      "What God has joined together, let no man separate (Matthew 19:6)",
      "Love your wife as Christ loved the church (Ephesians 5:25)",
      "Husbands and wives submit to one another (Ephesians 5:21)"
    ],
    scriptureReferences: ["Genesis 2:24", "Matthew 19:6", "Ephesians 5:25-33", "Malachi 2:14"],
    cautionLevel: "low",
    cautionNote: "ANCIENT ROMAN MARRIAGE VOW (Confarreatio, c. 200 BCE):\n\n'Quando tu Gaius, ego Gaia. Ubi tu Gaius, ibi ego Gaia.'\n\nORIGINAL ENGLISH TRANSLATION:\n\n'Where you are Gaius, I am Gaia. Wherever you are, there I will be.' This formula bound husband and wife as one, invoking Jupiter and Juno as witnesses.\n\nANCIENT HEBREW MARRIAGE BLESSING:\n\n'Harei at mekudeshet li, b'taba'at zo, k'dat Moshe v'Yisrael.'\n\n'Behold, you are consecrated to me with this ring, according to the laws of Moses and Israel.'\n\nMODERN CHRISTIAN WEDDING VOWS:\n\n'I, [name], take you, [name], to be my lawfully wedded [spouse], to have and to hold, from this day forward, for better, for worse, for richer, for poorer, in sickness and in health, to love and to cherish, till death do us part, according to God's holy ordinance; and thereto I pledge you my faith.'\n\nThe structure—solemn promise before divine witness—remains unchanged across millennia."
  },
  {
    id: "oath-new-year-resolution",
    name: "New Year's Resolutions & Vows",
    category: "oaths",
    organizationType: "Cultural/Personal",
    description: "New Year's resolutions trace to ancient Babylonian and Roman traditions. Babylonians made promises to their gods at the start of each year, while Romans made vows to Janus (god of beginnings). This tradition continued through Christian history as 'watchnight' covenant renewals.",
    doubleStandard: "Millions of Christians make New Year's resolutions—a practice rooted in Babylonian and Roman pagan traditions—without spiritual concern. Yet other cultural practices with similar origins face harsh criticism.",
    christianPerspective: "The impulse to mark new beginnings with renewed commitment reflects humanity's God-given desire for transformation. John Wesley's Methodist watchnight services Christianized this tradition, demonstrating how the Church redeems cultural practices.",
    biblicalParallels: [
      "Behold, I am doing a new thing (Isaiah 43:19)",
      "If anyone is in Christ, he is a new creation (2 Corinthians 5:17)",
      "Forgetting what lies behind, I press on (Philippians 3:13-14)",
      "Today, if you hear his voice, do not harden your hearts (Hebrews 3:15)"
    ],
    scriptureReferences: ["Isaiah 43:19", "2 Corinthians 5:17", "Philippians 3:13-14", "Lamentations 3:22-23"],
    cautionLevel: "low",
    cautionNote: "ANCIENT BABYLONIAN NEW YEAR VOW (Akitu Festival, c. 2000 BCE):\n\n'Before Marduk, I vow to repay my debts, return borrowed goods, and renew my loyalty to the king in the coming year.'\n\nANCIENT ROMAN VOW TO JANUS (c. 100 BCE):\n\n'Iane pater, te hoc ture ommovendo bonas preces precor, uti sies volens propitius...'\n\n'Father Janus, with this incense I beseech you with good prayers, that you may be willing and propitious to me, my home, and my household...'\n\nMETHODIST WATCHNIGHT COVENANT (John Wesley, 1755):\n\n'I am no longer my own, but thine. Put me to what thou wilt, rank me with whom thou wilt. Put me to doing, put me to suffering. Let me be employed for thee or laid aside for thee... I freely and heartily yield all things to thy pleasure and disposal.'\n\nCONTEMPORARY NEW YEAR'S RESOLUTION:\n\n'In the coming year, I resolve to [goal], trusting in God's strength to help me grow in [virtue].'\n\nThe tradition of marking new beginnings with renewed commitments spans all cultures and has been embraced by the Church."
  },
  {
    id: "oath-norse-sacred-objects",
    name: "Norse Ring Oath & Sacred Object Swearing",
    category: "oaths",
    organizationType: "Historical/Legal",
    description: "Germanic and Norse cultures swore oaths upon sacred rings, swords, and later Bibles. The practice of swearing on the Bible, still used in courtrooms today, evolved directly from Norse/Germanic traditions of swearing on sacred arm-rings dedicated to Thor or Freyr.",
    doubleStandard: "Swearing on the Bible—a practice derived from Norse pagan oath-rings—is considered sacred and Christian. Yet Greek organizational practices with less direct pagan connections face condemnation.",
    christianPerspective: "The Church transformed pagan oath-ring traditions by substituting the Bible or relics of saints. This demonstrates Christianity's power to redeem cultural practices. Swearing on sacred objects acknowledges that our words are witnessed by a higher power.",
    biblicalParallels: [
      "The Lord is witness between you and me (1 Samuel 20:42)",
      "I call God as my witness (2 Corinthians 1:23)",
      "Abraham swore by the Lord (Genesis 24:3)",
      "Jacob took an oath by the Fear of his father Isaac (Genesis 31:53)"
    ],
    scriptureReferences: ["Genesis 24:3", "Genesis 31:53", "1 Samuel 20:42", "Hebrews 6:16"],
    cautionLevel: "low",
    cautionNote: "NORSE RING OATH (Landnámabók, c. 900 CE):\n\n'Ek sver eið at baugi, at ek skal vera þér trúr ok hollr, ok halda allt þat, er ek hef nú heitit, svá hjálpi mér Freyr ok Njǫrðr ok inn almáttki áss.'\n\nORIGINAL ENGLISH TRANSLATION:\n\n'I swear an oath upon the ring, that I shall be faithful and loyal to you, and keep all that I have now promised, so help me Freyr and Njord and the almighty god [Thor/Odin].'\n\nNorse law required oath-rings of at least two ounces of silver, reddened with sacrificial blood, kept in temples. Oath-breakers faced exile or death.\n\nCHRISTIANIZED BIBLE OATH (English Common Law, c. 1200 CE):\n\n'I do swear by Almighty God that the evidence I shall give shall be the truth, the whole truth, and nothing but the truth.'\n\nThe structure is identical—swearing on a sacred object before divine witness. The Church simply substituted the Bible for the oath-ring.\n\nMODERN COURTROOM OATH:\n\n'Do you swear to tell the truth, the whole truth, and nothing but the truth, so help you God?' [Hand placed on Bible]\n\nThis practice—completely accepted by Christians—derives directly from Norse pagan traditions of swearing upon sacred objects. The transformation demonstrates Christianity's redemptive approach to culture."
  },
  // =====================================================
  // FRATERNITIES - NPHC, IFC Organizations
  // =====================================================
  {
    id: "alpha-phi-alpha",
    name: "Alpha Phi Alpha Fraternity, Inc.",
    category: "fraternities",
    organizationType: "NPHC - Divine Nine",
    description: "Founded December 4, 1906 at Cornell University, Alpha Phi Alpha is the first intercollegiate Greek-letter fraternity established for African Americans. Known for the sphinx symbol, gold and black colors, and producing leaders like Martin Luther King Jr., Thurgood Marshall, and W.E.B. Du Bois.",
    doubleStandard: "Critics condemn the sphinx symbol as 'Egyptian idolatry' while ignoring that this ancient symbol represents wisdom and strength—qualities celebrated in Proverbs.",
    christianPerspective: "Alpha Phi Alpha has produced countless Christian leaders who integrated faith with fraternal service. The organization's motto 'First of All, Servants of All, We Shall Transcend All' echoes Christ's teaching on servant leadership.",
    biblicalParallels: [
      "The greatest among you shall be your servant (Matthew 23:11)",
      "Wisdom is more precious than rubies (Proverbs 8:11)",
      "Train up a child in the way he should go (Proverbs 22:6)",
      "Let your light shine before others (Matthew 5:16)"
    ],
    scriptureReferences: ["Matthew 23:11", "Proverbs 8:11", "Matthew 5:16", "Philippians 2:3-4"],
    cautionLevel: "low"
  },
  {
    id: "kappa-alpha-psi",
    name: "Kappa Alpha Psi Fraternity, Inc.",
    category: "fraternities",
    organizationType: "NPHC - Divine Nine",
    description: "Founded January 5, 1911 at Indiana University, Kappa Alpha Psi is known for the diamond symbol representing 'achievement in every field of human endeavor.' Colors are crimson and cream. Notable members include Colin Powell, Cedric the Entertainer, and Arthur Ashe.",
    doubleStandard: "The diamond symbol represents refinement through pressure—exactly what Scripture teaches about character development through trials (James 1:2-4).",
    christianPerspective: "Kappa Alpha Psi's emphasis on achievement aligns with the biblical call to excellence and using God-given talents. Many Kappas serve in ministry and Christian leadership while maintaining fraternal bonds.",
    biblicalParallels: [
      "Whatever you do, work at it with all your heart (Colossians 3:23)",
      "Consider it pure joy when you face trials (James 1:2-4)",
      "Diamonds formed under pressure parallel character refinement",
      "Be diligent in these matters (1 Timothy 4:15)"
    ],
    scriptureReferences: ["Colossians 3:23", "James 1:2-4", "1 Timothy 4:15", "Proverbs 22:29"],
    cautionLevel: "low"
  },
  {
    id: "omega-psi-phi",
    name: "Omega Psi Phi Fraternity, Inc.",
    category: "fraternities",
    organizationType: "NPHC - Divine Nine",
    description: "Founded November 17, 1911 at Howard University, Omega Psi Phi was the first Black Greek-letter organization founded at an HBCU. Known for the lamp symbol, purple and gold colors, and cardinal principles: Manhood, Scholarship, Perseverance, and Uplift.",
    doubleStandard: "The lamp symbol directly echoes Scripture—'Your word is a lamp for my feet' (Psalm 119:105). Critics ignore this biblical connection.",
    christianPerspective: "The Omega lamp represents enlightenment and guidance, themes central to Christian faith. The cardinal principle of 'Uplift' parallels the biblical mandate to lift up the downtrodden and serve others.",
    biblicalParallels: [
      "Your word is a lamp for my feet (Psalm 119:105)",
      "Let your light shine before others (Matthew 5:14-16)",
      "Perseverance produces character (Romans 5:3-4)",
      "Lift up the weak (1 Thessalonians 5:14)"
    ],
    scriptureReferences: ["Psalm 119:105", "Matthew 5:14-16", "Romans 5:3-4", "Isaiah 58:10"],
    cautionLevel: "low"
  },
  {
    id: "phi-beta-sigma",
    name: "Phi Beta Sigma Fraternity, Inc.",
    category: "fraternities",
    organizationType: "NPHC - Divine Nine",
    description: "Founded January 9, 1914 at Howard University. Known for the dove and crescent moon symbols, blue and white colors. The only NPHC fraternity constitutionally bound to a sorority (Zeta Phi Beta). Motto: 'Culture for Service and Service for Humanity.'",
    doubleStandard: "The dove is perhaps the most biblical symbol in Greek life—representing the Holy Spirit at Christ's baptism (Matthew 3:16). Critics ignore this connection.",
    christianPerspective: "The dove symbol directly connects to Christian faith. Phi Beta Sigma's emphasis on service and humanity aligns with Christ's command to love and serve others. The crescent represents cycles of growth and renewal.",
    biblicalParallels: [
      "The Spirit descended like a dove (Matthew 3:16)",
      "Be wise as serpents, innocent as doves (Matthew 10:16)",
      "Serve one another in love (Galatians 5:13)",
      "Pure religion is caring for orphans and widows (James 1:27)"
    ],
    scriptureReferences: ["Matthew 3:16", "Galatians 5:13", "James 1:27", "Micah 6:8"],
    cautionLevel: "low"
  },
  {
    id: "iota-phi-theta",
    name: "Iota Phi Theta Fraternity, Inc.",
    category: "fraternities",
    organizationType: "NPHC - Divine Nine",
    description: "Founded September 19, 1963 at Morgan State University, making it the youngest NPHC fraternity. Known for the centaur symbol, brown and gold colors. Founded during the Civil Rights Movement, emphasizing the balance of mind and body.",
    doubleStandard: "The centaur represents integration of intellect and physical strength—concepts Paul addresses when calling us to offer our bodies as living sacrifices while renewing our minds (Romans 12:1-2).",
    christianPerspective: "Iota Phi Theta's emphasis on complete development—mental and physical—echoes biblical teaching on honoring God with our whole being. Founded during the Civil Rights era, the organization embodies the fight for justice.",
    biblicalParallels: [
      "Present your bodies as living sacrifices (Romans 12:1-2)",
      "Love the Lord with all your heart, soul, mind, and strength (Mark 12:30)",
      "Physical training has some value (1 Timothy 4:8)",
      "Do justice, love mercy (Micah 6:8)"
    ],
    scriptureReferences: ["Romans 12:1-2", "Mark 12:30", "1 Timothy 4:8", "Micah 6:8"],
    cautionLevel: "low"
  },
  {
    id: "sigma-phi-epsilon",
    name: "Sigma Phi Epsilon",
    category: "fraternities",
    organizationType: "IFC - Interfraternity Council",
    description: "Founded November 1, 1901 at Richmond College (now University of Richmond). One of the largest fraternities in North America. Known for the heart symbol, purple and red colors. Cardinal Principles: Virtue, Diligence, and Brotherly Love.",
    doubleStandard: "The heart symbol represents love—the greatest commandment according to Jesus. The Cardinal Principle of 'Virtue' aligns with biblical calls to moral excellence.",
    christianPerspective: "Sigma Phi Epsilon's emphasis on virtue and brotherly love directly parallels biblical teaching. The organization's Balanced Man Program focuses on character development consistent with Christian values.",
    biblicalParallels: [
      "Love one another as I have loved you (John 15:12)",
      "Add to your faith virtue (2 Peter 1:5)",
      "Whatever is pure, whatever is lovely, think on these things (Philippians 4:8)",
      "Be diligent (2 Peter 3:14)"
    ],
    scriptureReferences: ["John 15:12", "2 Peter 1:5", "Philippians 4:8", "1 Peter 3:8"],
    cautionLevel: "low"
  },
  {
    id: "kappa-sigma",
    name: "Kappa Sigma",
    category: "fraternities",
    organizationType: "IFC - Interfraternity Council",
    description: "Claims origins in Bologna, Italy in 1400, formally founded in the U.S. December 10, 1869 at the University of Virginia. Known for the star and crescent symbols, scarlet, white, and emerald green colors. One of the largest fraternities globally.",
    doubleStandard: "The star guided the Magi to Christ (Matthew 2:2). Stars represent God's promises and guidance throughout Scripture—yet in Greek organizations, stars are somehow suspicious.",
    christianPerspective: "Kappa Sigma's Four Pillars—Fellowship, Leadership, Scholarship, and Service—align with Christian values. The star symbol connects to biblical themes of divine guidance and promise.",
    biblicalParallels: [
      "We saw his star when it rose (Matthew 2:2)",
      "Those who lead many to righteousness will shine like stars (Daniel 12:3)",
      "He determines the number of stars (Psalm 147:4)",
      "Serve one another in love (Galatians 5:13)"
    ],
    scriptureReferences: ["Matthew 2:2", "Daniel 12:3", "Psalm 147:4", "Galatians 5:13"],
    cautionLevel: "low"
  },
  {
    id: "phi-gamma-delta",
    name: "Phi Gamma Delta (FIJI)",
    category: "fraternities",
    organizationType: "IFC - Interfraternity Council",
    description: "Founded May 1, 1848 at Jefferson College in Pennsylvania. Known as FIJI, with royal purple as the primary color. The owl symbol represents wisdom. Values include friendship, knowledge, service, morality, and excellence.",
    doubleStandard: "The owl represents wisdom—a virtue Proverbs repeatedly commands us to pursue. 'Get wisdom, get understanding' (Proverbs 4:5).",
    christianPerspective: "FIJI's emphasis on morality and service aligns with Christian teaching. The pursuit of wisdom is a biblical mandate, and the organization's values of friendship and excellence reflect scriptural principles.",
    biblicalParallels: [
      "Get wisdom, get understanding (Proverbs 4:5)",
      "The fear of the Lord is the beginning of wisdom (Proverbs 9:10)",
      "A friend loves at all times (Proverbs 17:17)",
      "Whatever is excellent, think on these things (Philippians 4:8)"
    ],
    scriptureReferences: ["Proverbs 4:5", "Proverbs 9:10", "Proverbs 17:17", "Ecclesiastes 4:9-10"],
    cautionLevel: "low"
  },
  // =====================================================
  // SORORITIES - NPHC, NPC Organizations
  // =====================================================
  {
    id: "alpha-kappa-alpha",
    name: "Alpha Kappa Alpha Sorority, Inc.",
    category: "sororities",
    organizationType: "NPHC - Divine Nine",
    description: "Founded January 15, 1908 at Howard University, Alpha Kappa Alpha is the first Greek-letter sorority established for African American women. Known for the ivy leaf symbol, salmon pink and apple green colors. Notable members include Vice President Kamala Harris, Maya Angelou, and Coretta Scott King.",
    doubleStandard: "The ivy leaf represents growth and flourishing—exactly what Psalm 1 describes for the righteous who are 'like a tree planted by streams of water.'",
    christianPerspective: "AKA's emphasis on service to all mankind aligns with Christ's command to love our neighbors. The ivy leaf symbolizes continuous growth and connection, reflecting spiritual growth and Christian community.",
    biblicalParallels: [
      "Like a tree planted by streams of water (Psalm 1:3)",
      "I am the vine, you are the branches (John 15:5)",
      "Grow in grace and knowledge (2 Peter 3:18)",
      "Bear fruit in every good work (Colossians 1:10)"
    ],
    scriptureReferences: ["Psalm 1:3", "John 15:5", "2 Peter 3:18", "Colossians 1:10"],
    cautionLevel: "low"
  },
  {
    id: "delta-sigma-theta",
    name: "Delta Sigma Theta Sorority, Inc.",
    category: "sororities",
    organizationType: "NPHC - Divine Nine",
    description: "Founded January 13, 1913 at Howard University. Known for the pyramid and elephant symbols, crimson and cream colors. The largest NPHC organization with 350,000+ members. Participated in the Women's Suffrage March of 1913 just weeks after founding.",
    doubleStandard: "The pyramid represents building on solid foundations—Jesus used this exact imagery when teaching about the wise builder (Matthew 7:24-25).",
    christianPerspective: "Delta's commitment to public service and social action reflects prophetic biblical tradition. The pyramid symbolizes building lasting legacies and foundations, echoing Christ's teaching about building on rock.",
    biblicalParallels: [
      "Build your house on the rock (Matthew 7:24-25)",
      "Unless the Lord builds the house (Psalm 127:1)",
      "Speak up for those who cannot speak for themselves (Proverbs 31:8)",
      "Faith without works is dead (James 2:17)"
    ],
    scriptureReferences: ["Matthew 7:24-25", "Psalm 127:1", "Proverbs 31:8-9", "James 2:17"],
    cautionLevel: "low"
  },
  {
    id: "zeta-phi-beta",
    name: "Zeta Phi Beta Sorority, Inc.",
    category: "sororities",
    organizationType: "NPHC - Divine Nine",
    description: "Founded January 16, 1920 at Howard University. Known for the dove symbol, royal blue and white colors. Constitutionally bound to Phi Beta Sigma Fraternity. Principles: Scholarship, Service, Sisterly Love, and Finer Womanhood.",
    doubleStandard: "The dove is the symbol of the Holy Spirit in Christian tradition (Matthew 3:16). How can critics condemn this most biblical of symbols?",
    christianPerspective: "Zeta's dove symbol directly connects to Christian faith, representing peace and the Holy Spirit. The principle of 'Finer Womanhood' echoes Proverbs 31's description of the virtuous woman.",
    biblicalParallels: [
      "The Spirit descended like a dove (Matthew 3:16)",
      "Blessed are the peacemakers (Matthew 5:9)",
      "A woman who fears the Lord is to be praised (Proverbs 31:30)",
      "Encourage one another (1 Thessalonians 5:11)"
    ],
    scriptureReferences: ["Matthew 3:16", "Matthew 5:9", "Proverbs 31:10-31", "Titus 2:3-5"],
    cautionLevel: "low"
  },
  {
    id: "sigma-gamma-rho",
    name: "Sigma Gamma Rho Sorority, Inc.",
    category: "sororities",
    organizationType: "NPHC - Divine Nine",
    description: "Founded November 12, 1922 at Butler University in Indianapolis—the only NPHC sorority founded at a predominantly white institution. Known for the poodle mascot, royal blue and gold colors. Focus on community service and education.",
    doubleStandard: "The poodle represents elegance, intelligence, and loyalty—qualities celebrated throughout Proverbs and in descriptions of virtuous women.",
    christianPerspective: "Sigma Gamma Rho's emphasis on community service and uplifting underserved communities aligns with biblical mandates to care for the vulnerable. The organization's educational focus honors the scriptural value of wisdom.",
    biblicalParallels: [
      "Wisdom is more precious than rubies (Proverbs 3:15)",
      "Care for orphans and widows (James 1:27)",
      "Do good to all people (Galatians 6:10)",
      "Train up a child (Proverbs 22:6)"
    ],
    scriptureReferences: ["Proverbs 3:15", "James 1:27", "Galatians 6:10", "Proverbs 22:6"],
    cautionLevel: "low"
  },
  {
    id: "chi-omega",
    name: "Chi Omega",
    category: "sororities",
    organizationType: "NPC - National Panhellenic Conference",
    description: "Founded April 5, 1895 at the University of Arkansas. The largest women's fraternal organization with 400,000+ members. Known for the owl and skull symbols, cardinal and straw colors. Six Cardinal Virtues include Hellenic Culture, Integrity, and Community Service.",
    doubleStandard: "The owl represents wisdom—Scripture repeatedly commands pursuing wisdom (Proverbs 4:7). The skull (memento mori) was a Christian practice reminding believers of life's brevity.",
    christianPerspective: "Chi Omega's emphasis on integrity and community service reflects Christian values. The owl's connection to wisdom aligns with biblical teaching, and memento mori has deep Christian roots in monastic tradition.",
    biblicalParallels: [
      "Wisdom is supreme; therefore get wisdom (Proverbs 4:7)",
      "Teach us to number our days (Psalm 90:12)",
      "Walk in integrity (Proverbs 10:9)",
      "Serve one another in love (Galatians 5:13)"
    ],
    scriptureReferences: ["Proverbs 4:7", "Psalm 90:12", "Proverbs 10:9", "Galatians 5:13"],
    cautionLevel: "low"
  },
  {
    id: "kappa-kappa-gamma",
    name: "Kappa Kappa Gamma",
    category: "sororities",
    organizationType: "NPC - National Panhellenic Conference",
    description: "Founded October 13, 1870 at Monmouth College in Illinois. Known for the key and fleur-de-lis symbols, dark blue and light blue colors. One of the oldest NPC sororities with emphasis on women's advancement and education.",
    doubleStandard: "The key symbol directly echoes Christ's words—'I will give you the keys of the kingdom' (Matthew 16:19). Keys represent authority and access in biblical imagery.",
    christianPerspective: "Kappa's key symbol connects to Jesus giving Peter the keys of the kingdom. The emphasis on women's education and advancement aligns with biblical examples of wise, influential women like Deborah, Esther, and Priscilla.",
    biblicalParallels: [
      "I will give you the keys of the kingdom (Matthew 16:19)",
      "The key of knowledge (Luke 11:52)",
      "Women of wisdom and influence (Proverbs 31)",
      "Teach what is good (Titus 2:3)"
    ],
    scriptureReferences: ["Matthew 16:19", "Luke 11:52", "Proverbs 31:26", "Titus 2:3-5"],
    cautionLevel: "low"
  },
  {
    id: "delta-delta-delta",
    name: "Delta Delta Delta (Tri Delta)",
    category: "sororities",
    organizationType: "NPC - National Panhellenic Conference",
    description: "Founded Thanksgiving Eve, 1888 at Boston University. Known as Tri Delta, with the trident/dolphin symbols and silver, gold, and cerulean blue colors. Motto: 'Let us steadfastly love one another.'",
    doubleStandard: "The trident in Greek life represents strength and stability—not Poseidon worship. The motto directly echoes the greatest commandment to love one another.",
    christianPerspective: "Tri Delta's motto 'Let us steadfastly love one another' is essentially a paraphrase of 1 John 4:7. The organization's emphasis on sincere friendship and philanthropic service reflects Christian love in action.",
    biblicalParallels: [
      "Let us love one another (1 John 4:7)",
      "Love one another as I have loved you (John 15:12)",
      "A friend loves at all times (Proverbs 17:17)",
      "Be devoted to one another in love (Romans 12:10)"
    ],
    scriptureReferences: ["1 John 4:7", "John 15:12", "Proverbs 17:17", "Romans 12:10"],
    cautionLevel: "low"
  },
  {
    id: "alpha-delta-pi",
    name: "Alpha Delta Pi",
    category: "sororities",
    organizationType: "NPC - National Panhellenic Conference",
    description: "Founded May 15, 1851 at Wesleyan Female College in Macon, Georgia—the first secret society for college women in the world. Known for the diamond and lion symbols, azure blue and white colors. Founded at a Methodist institution.",
    doubleStandard: "Founded at a Methodist college by Christian women. The lion is the symbol of Christ—'the Lion of the tribe of Judah' (Revelation 5:5). The diamond represents refinement through pressure.",
    christianPerspective: "Alpha Delta Pi was founded at a Christian institution by women of faith. The lion symbol connects directly to Christ as the Lion of Judah. The organization's long history demonstrates how Christian women can lead in fraternal spaces.",
    biblicalParallels: [
      "The Lion of the tribe of Judah has triumphed (Revelation 5:5)",
      "Be strong and courageous (Joshua 1:9)",
      "Refined like gold (1 Peter 1:7)",
      "Women of noble character (Proverbs 31:10)"
    ],
    scriptureReferences: ["Revelation 5:5", "Joshua 1:9", "1 Peter 1:7", "Proverbs 31:10"],
    cautionLevel: "low"
  },

  // =====================================================
  // SYMBOLS - Common Symbols with Christian Parallels
  // =====================================================
  {
    id: "alpha-omega-symbol",
    name: "Alpha and Omega (Α Ω)",
    category: "symbols",
    description: "The first and last letters of the Greek alphabet, used universally in Christian tradition to represent Christ as the beginning and end. These Greek letters appear in churches, religious art, and Christian jewelry worldwide.",
    christianPerspective: "These Greek letters are explicitly biblical—Christ calls Himself 'the Alpha and the Omega' in Revelation. Christians use Greek letters to express their deepest theological truths. The same alphabet used in Greek organizations is used to describe our Lord.",
    cautionLevel: "low",
    scriptureReferences: ["Revelation 1:8", "Revelation 21:6", "Revelation 22:13"],
    doubleStandard: "Christians proudly display Alpha and Omega in churches and on jewelry, yet condemn other Greek letters used by organizations. If Greek letters were inherently pagan, Alpha and Omega would be problematic."
  },
  {
    id: "chi-rho-symbol",
    name: "Chi Rho (☧)",
    category: "symbols",
    description: "An ancient Christian symbol combining the Greek letters Chi (Χ) and Rho (Ρ), the first two letters of 'Christ' (Χριστός) in Greek. Used by Emperor Constantine and throughout church history.",
    christianPerspective: "This symbol represents Christ Himself using Greek letters. It has been used by Christians for nearly 2,000 years and appears on vestments, altars, and religious art. Greek letters have a sacred history in Christianity.",
    cautionLevel: "low",
    scriptureReferences: ["Colossians 3:17", "Philippians 2:10-11"],
    doubleStandard: "The Chi Rho uses the same Greek alphabet as fraternities and sororities. If Greek letters were 'of the devil,' this sacred Christian symbol would be too."
  },
  {
    id: "ichthys-fish-symbol",
    name: "ΙΧΘΥΣ (Ichthys Fish)",
    category: "symbols",
    description: "The fish symbol spelled with Greek letters: Ι (Iota), Χ (Chi), Θ (Theta), Υ (Upsilon), Σ (Sigma) - an acronym for 'Jesus Christ, Son of God, Savior.' Used by early Christians as a secret identifier.",
    christianPerspective: "Early persecuted Christians used this Greek acronym to identify one another. The Greek language and its letters were essential to spreading the Gospel and preserving Scripture.",
    cautionLevel: "low",
    scriptureReferences: ["Matthew 4:19", "Luke 5:10", "John 21:6"],
    doubleStandard: "Christians display the fish symbol with Greek letters on their cars, but object to Greek letters on a blazer. This inconsistency reveals bias, not biblical conviction."
  },
  {
    id: "delta-triangle-symbol",
    name: "Delta/Triangle (Δ)",
    category: "symbols",
    description: "The Greek letter Delta, shaped like a triangle, represents change and transformation in mathematics and science. In Christianity, the triangle often represents the Trinity.",
    christianPerspective: "The triangle has represented the Father, Son, and Holy Spirit for centuries in Christian iconography. Delta Sigma Theta's use of the triangle no more invokes paganism than a church using triangular Trinity symbols.",
    cautionLevel: "low",
    scriptureReferences: ["Matthew 28:19", "2 Corinthians 13:14"],
    doubleStandard: "Trinitarian triangles adorn churches worldwide. Criticizing Greek organizations for using triangles while accepting them in church architecture is inconsistent."
  },
  {
    id: "torch-flame-symbol",
    name: "Torch/Flame",
    category: "symbols",
    description: "Torches and flames appear in countless organizational logos, including the Statue of Liberty, universities, and Greek organizations. They universally represent enlightenment, knowledge, and guidance.",
    christianPerspective: "Scripture uses fire and light extensively as positive symbols: the pillar of fire guiding Israel, tongues of fire at Pentecost, and Christ as the 'light of the world.' Fire represents God's presence and guidance.",
    cautionLevel: "low",
    scriptureReferences: ["Exodus 13:21", "Acts 2:3", "John 8:12", "Matthew 5:14-16"],
    doubleStandard: "The Olympic torch, Statue of Liberty's torch, and countless Christian symbols use flames. Condemning a Greek organization's torch while accepting these is arbitrary."
  },
  {
    id: "pyramid-symbol",
    name: "Pyramid/Step Pyramid",
    category: "symbols",
    description: "Pyramids appear in architecture, corporate logos, and organizational imagery worldwide. They represent stability, achievement, and reaching toward higher goals.",
    christianPerspective: "While pyramids are associated with Egypt, Joseph served as second-in-command over Egypt. God used Egyptian civilization to preserve His people. The shape itself has no inherent spiritual meaning.",
    cautionLevel: "low",
    scriptureReferences: ["Genesis 41:41-43", "Genesis 50:26"],
    doubleStandard: "The U.S. dollar bill features a pyramid. Christians use this currency daily without objection, yet criticize the same imagery in Greek organizations."
  },
  {
    id: "sphinx-symbol",
    name: "Sphinx",
    category: "symbols",
    description: "The sphinx—a mythological creature with a human head and lion's body—appears in Alpha Phi Alpha and other organizations. It represents wisdom, mystery, and guardianship.",
    christianPerspective: "Cherubim in Scripture are composite creatures combining human and animal features (Ezekiel 1:10). God chose to represent heavenly beings with similar imagery. The sphinx represents noble qualities of wisdom and strength.",
    cautionLevel: "low",
    scriptureReferences: ["Ezekiel 1:10", "Ezekiel 10:14", "Revelation 4:7"],
    doubleStandard: "Christians accept cherubim (lion-faced, human-faced creatures) in Scripture but condemn the sphinx. Both are composite creatures representing virtuous qualities."
  },
  {
    id: "laurel-wreath-symbol",
    name: "Laurel Wreath",
    category: "symbols",
    description: "The laurel wreath symbolizes victory, achievement, and honor. Used in Greek and Roman culture, it now appears in military insignia, university seals, and organizational logos worldwide.",
    christianPerspective: "Paul uses the victor's wreath as a metaphor for Christian perseverance: 'an incorruptible crown.' Olympic athletes, scholars, and soldiers receive wreaths—Christians included. Scripture redeems this symbol.",
    cautionLevel: "low",
    scriptureReferences: ["1 Corinthians 9:25", "2 Timothy 4:8", "James 1:12", "1 Peter 5:4"],
    doubleStandard: "Military officers wear laurel wreaths on their caps. Universities award laurels. Christians participate without objection, yet criticize the same symbol on Greek paraphernalia."
  },
  {
    id: "handshake-grip-symbol",
    name: "Handshake/Grip",
    category: "symbols",
    description: "Secret handshakes and grips are used by Greek organizations, Masonic lodges, and countless other fraternal groups. They signify belonging, trust, and brotherhood.",
    christianPerspective: "The early church had signs of recognition. Paul speaks of the 'right hand of fellowship' (Galatians 2:9). Handshakes as symbols of covenant and trust are biblical—consider Jacob and Laban's covenant or business agreements sealed with a handshake.",
    cautionLevel: "low",
    scriptureReferences: ["Galatians 2:9", "Genesis 31:44-54", "Proverbs 6:1"],
    doubleStandard: "Business deals, peace treaties, and church covenants are sealed with handshakes. A fraternity's handshake is no different in principle."
  },
  {
    id: "dove-symbol",
    name: "Dove",
    category: "symbols",
    description: "The dove represents peace, purity, and the Holy Spirit. Used by religious organizations, peace movements, and Greek organizations alike.",
    christianPerspective: "The dove is deeply biblical—appearing at Jesus's baptism, after Noah's flood, and throughout Scripture as a symbol of God's Spirit and peace. Organizations using the dove align with Christian imagery.",
    cautionLevel: "low",
    scriptureReferences: ["Matthew 3:16", "Genesis 8:11", "Song of Solomon 2:14"],
    doubleStandard: "Some sororities use dove imagery. Rather than criticism, this should be seen as alignment with Christian symbolism."
  },
  {
    id: "lamp-light-symbol",
    name: "Lamp/Lantern",
    category: "symbols",
    description: "Lamps and lanterns represent knowledge, guidance, and enlightenment. They appear in educational institutions, libraries, and Greek organizations as symbols of learning.",
    christianPerspective: "Scripture repeatedly uses lamp imagery: 'Your word is a lamp to my feet' (Psalm 119:105). The parable of the ten virgins features lamps. Light versus darkness is a central biblical theme. Organizations promoting knowledge through lamp imagery echo Scripture.",
    cautionLevel: "low",
    scriptureReferences: ["Psalm 119:105", "Matthew 25:1-13", "Proverbs 6:23", "Matthew 5:15"],
    doubleStandard: "Churches display lamps and candles. Universities use lamp imagery. Greek organizations doing the same are criticized—inconsistently."
  },
  // =====================================================
  // CUSTOMS - Roots of Modern Traditions
  // =====================================================
  {
    id: "custom-memorial-day",
    name: "Memorial Day",
    category: "customs",
    organizationType: "National Holiday",
    description: "Memorial Day descends from ancient Roman Parentalia (February 13-21), a nine-day festival honoring deceased ancestors with food offerings, flowers, and grave decorations. The Romans believed spirits of the dead required annual appeasement to prevent them from haunting the living. Similar practices existed in Greek Anthesteria and Celtic Samhain.",
    doubleStandard: "Christians decorate graves with flowers on Memorial Day—a practice directly from Roman ancestor worship festivals—without spiritual concern. Yet Greek organizations honoring founders are labeled as practicing 'ancestor worship.'",
    christianPerspective: "Honoring the deceased is biblical (Joseph buried Jacob with great ceremony, Genesis 50). The Church transformed pagan memorial practices into All Saints Day and All Souls Day. Memorial Day continues this tradition of honoring sacrifice and remembering the departed.",
    biblicalParallels: [
      "Honor your father and mother (Exodus 20:12)",
      "Remember your leaders who spoke the word of God (Hebrews 13:7)",
      "Precious in the sight of the Lord is the death of his saints (Psalm 116:15)",
      "Joseph mourned his father forty days (Genesis 50:3)"
    ],
    scriptureReferences: ["Genesis 50:1-14", "Hebrews 13:7", "Psalm 116:15", "1 Thessalonians 4:13"],
    cautionLevel: "low"
  },
  {
    id: "custom-eulogy",
    name: "Eulogy (Funeral Oration)",
    category: "customs",
    organizationType: "Funeral Tradition",
    description: "The eulogy comes from Greek 'eulogia' (praise/blessing) and Roman 'laudatio funebris.' Romans believed that properly praising the dead ensured their spirits would rest peacefully and not return as malevolent lemures (ghosts). Professional mourners were hired to wail and praise the deceased to appease the Manes (ancestor spirits).",
    doubleStandard: "Every Christian funeral includes eulogies—a practice designed to appease Roman ancestor spirits—yet no one questions this pagan origin. Greek organizations receive criticism for far less spiritually-rooted practices.",
    christianPerspective: "The Church redeemed the eulogy tradition, transforming it from spirit appeasement into celebration of a life lived in faith. Christians can give and receive eulogies as testimony to God's faithfulness, not as pagan ritual.",
    biblicalParallels: [
      "David's eulogy for Saul and Jonathan (2 Samuel 1:17-27)",
      "Stephen's final testimony (Acts 7)",
      "Let the memory of the righteous be blessed (Proverbs 10:7)",
      "We do not grieve as those without hope (1 Thessalonians 4:13)"
    ],
    scriptureReferences: ["2 Samuel 1:17-27", "Proverbs 10:7", "1 Thessalonians 4:13", "Revelation 14:13"],
    cautionLevel: "low"
  },
  {
    id: "custom-repass",
    name: "Repass (Funeral Meal)",
    category: "customs",
    organizationType: "Funeral Tradition",
    description: "The funeral repass descends from Roman silicernium (funeral feast) and Greek perideipnon. Romans believed sharing a meal near the deceased would satisfy their spirit and prevent haunting. Food was often left on graves for the dead to consume. The meal also protected the living from death contamination.",
    doubleStandard: "Churches routinely host repass meals after funerals—a practice rooted in feeding ancestral spirits—without any spiritual concern. Yet Greek organizational meals with ceremonial elements face scrutiny.",
    christianPerspective: "Jesus ate with his disciples after resurrection, transforming the funeral meal from spirit appeasement to celebration of eternal life. The Church converted pagan funeral feasts into agape meals and wakes that honor the deceased while affirming resurrection hope.",
    biblicalParallels: [
      "Jesus ate with disciples after resurrection (Luke 24:41-43)",
      "Breaking bread together in Christian community (Acts 2:46)",
      "The Lord prepares a table (Psalm 23:5)",
      "Funeral meal mentioned in Jeremiah (Jeremiah 16:7)"
    ],
    scriptureReferences: ["Luke 24:41-43", "Acts 2:46", "Jeremiah 16:7", "John 21:12-13"],
    cautionLevel: "low"
  },
  {
    id: "custom-wedding-ceremony",
    name: "Wedding Ceremony",
    category: "customs",
    organizationType: "Marriage Tradition",
    description: "Modern weddings combine Roman, Greek, and medieval traditions. The Roman bride wore a flame-colored veil (flammeum) to ward off evil spirits. Greeks sacrificed to Hera before the ceremony. Medieval Christians believed demons would attack the bride on her wedding day, requiring protective rituals, attendants, and prayers.",
    doubleStandard: "Christian weddings incorporate dozens of practices designed to ward off demons and pagan deities—all without spiritual concern. Yet Greek organizations using protective symbolism are labeled as practicing witchcraft.",
    christianPerspective: "God instituted marriage before any culture (Genesis 2:24). The Church has always adapted cultural wedding practices, infusing them with Christian meaning. The ceremony celebrates God's design for covenant love, regardless of its cultural packaging.",
    biblicalParallels: [
      "Marriage instituted by God (Genesis 2:24)",
      "Wedding at Cana blessed by Jesus (John 2:1-11)",
      "Marriage represents Christ and the Church (Ephesians 5:31-32)",
      "What God has joined, let no one separate (Matthew 19:6)"
    ],
    scriptureReferences: ["Genesis 2:24", "John 2:1-11", "Ephesians 5:31-32", "Matthew 19:6"],
    cautionLevel: "low"
  },
  {
    id: "custom-wedding-ring",
    name: "Wedding Rings",
    category: "customs",
    organizationType: "Marriage Tradition",
    description: "Wedding rings originated in ancient Egypt and Rome. Romans believed the 'vena amoris' (vein of love) ran directly from the ring finger to the heart. The unbroken circle represented eternal binding—originally a property claim, then a magical ward against spirits trying to separate the couple. Medieval Christians adopted the practice, blessing rings with holy water.",
    doubleStandard: "Christians wear wedding rings—originally Egyptian amulets and Roman property markers—on the 'magical' vein of love without spiritual qualms. Yet Greek organizations using symbolic jewelry face accusations of occult practice.",
    christianPerspective: "The wedding ring has become a universal symbol of marital covenant. Its pagan origins have been completely transformed into a Christian symbol of faithfulness and unending love. The Church blessed and redeemed this practice centuries ago.",
    biblicalParallels: [
      "Rings as symbols of authority and covenant (Genesis 41:42)",
      "The prodigal son received a ring of restoration (Luke 15:22)",
      "Signet rings sealed important covenants (Esther 8:8)",
      "Eternal love that never ends (1 Corinthians 13:8)"
    ],
    scriptureReferences: ["Genesis 41:42", "Luke 15:22", "Esther 8:8", "Song of Solomon 8:6"],
    cautionLevel: "low"
  },
  {
    id: "custom-wedding-party",
    name: "Bridesmaids & Groomsmen",
    category: "customs",
    organizationType: "Marriage Tradition",
    description: "Bridesmaids and groomsmen originated as spirit decoys. Romans and medieval Europeans believed evil spirits and jealous demons would try to steal the bride or curse the marriage. Attendants dressed identically to the bride and groom to confuse these malevolent spirits about who was actually getting married.",
    doubleStandard: "Every Christian wedding includes bridesmaids dressed alike—originally to confuse demons trying to kidnap the bride—yet this overtly superstitious practice raises no concern. Greek organizations receive harsher scrutiny for less explicitly spirit-related traditions.",
    christianPerspective: "The wedding party has been completely reinterpreted as a celebration of friendship and support. No modern Christian believes they are confusing demons. This demonstrates how cultural practices can be fully transformed in meaning while retaining their form.",
    biblicalParallels: [
      "The ten virgins attending the wedding (Matthew 25:1-13)",
      "Friends who support and rejoice together (Ecclesiastes 4:9-10)",
      "Bear one another's burdens (Galatians 6:2)",
      "Rejoice with those who rejoice (Romans 12:15)"
    ],
    scriptureReferences: ["Matthew 25:1-13", "Ecclesiastes 4:9-10", "Galatians 6:2", "Romans 12:15"],
    cautionLevel: "low"
  },
  {
    id: "custom-wedding-veil",
    name: "Bridal Veil",
    category: "customs",
    organizationType: "Marriage Tradition",
    description: "The bridal veil comes from Roman flammeum (flame-colored veil) worn to hide the bride from evil spirits and jealous gods. Greeks veiled brides to prevent the 'evil eye' from cursing them. Medieval Europeans believed demons could possess an unveiled bride, so the face remained covered until safely married.",
    doubleStandard: "Christian brides wear veils—explicitly designed to hide from demons—as a cherished tradition. Yet Greek organizational regalia with no spirit-related origin is condemned as occultic.",
    christianPerspective: "Paul mentions head coverings in worship (1 Corinthians 11), and the veil has been reinterpreted as modesty, mystery, and reverence. Its protective-magic origins are forgotten, replaced with Christian symbolism of purity and the unveiling of intimacy in marriage.",
    biblicalParallels: [
      "Rebekah veiled herself before meeting Isaac (Genesis 24:65)",
      "Moses veiled his face after encountering God (Exodus 34:33-35)",
      "The veil between humanity and God (Hebrews 10:20)",
      "Head coverings in worship (1 Corinthians 11:5-6)"
    ],
    scriptureReferences: ["Genesis 24:65", "Exodus 34:33-35", "1 Corinthians 11:5-6", "2 Corinthians 3:16"],
    cautionLevel: "low"
  },
  {
    id: "custom-birthday-cake",
    name: "Birthday Cake & Candles",
    category: "customs",
    organizationType: "Birthday Tradition",
    description: "Birthday cakes with candles trace to Greek worship of Artemis, goddess of the moon. Round cakes with lit candles represented the glowing moon, offered at her temple. Blowing out candles sent prayers to the gods on rising smoke. Germans added the modern tradition, believing candles protected the birthday child from evil spirits for the coming year.",
    doubleStandard: "Christians celebrate birthdays with moon-shaped cakes, candles for Artemis, and wish-magic without any spiritual concern. Yet Greek organizations using symbolic candles in ceremonies are accused of pagan worship.",
    christianPerspective: "Birthday celebrations acknowledge the gift of life from God. The Church has never forbidden birthday observances, and blowing out candles has no spiritual power—it is simply a fun tradition. Christians can celebrate Gods gift of another year of life.",
    biblicalParallels: [
      "Pharaoh celebrated his birthday (Genesis 40:20)",
      "Jobs children held birthday feasts (Job 1:4)",
      "Every good gift comes from above (James 1:17)",
      "Celebrate and be glad, for this day the Lord has made (Psalm 118:24)"
    ],
    scriptureReferences: ["Genesis 40:20", "Job 1:4", "James 1:17", "Psalm 139:13-16"],
    cautionLevel: "low"
  },
  {
    id: "custom-christmas",
    name: "Christmas Traditions",
    category: "customs",
    organizationType: "Religious Holiday",
    description: "Christmas combines Roman Saturnalia (December 17-23) and Sol Invictus (December 25, 'Birthday of the Unconquered Sun') with Norse Yule traditions. Gift-giving, feasting, decorating trees, and holly/mistletoe all derive from pagan winter solstice festivals. The date December 25 was chosen to Christianize existing Roman celebrations.",
    doubleStandard: "Christians enthusiastically celebrate Christmas—a holiday built on Saturnalia, sun worship, and Norse paganism—while condemning Greek organizations for far more tenuous pagan connections.",
    christianPerspective: "The Church deliberately placed Christmas on December 25 to transform pagan celebrations into Christ-centered worship. This is the textbook example of Christian redemption of culture. The practice demonstrates that origins do not determine current meaning.",
    biblicalParallels: [
      "The true Light that gives light to everyone (John 1:9)",
      "Christ the Sun of Righteousness (Malachi 4:2)",
      "For unto us a child is born (Isaiah 9:6)",
      "The gift of God is eternal life (Romans 6:23)"
    ],
    scriptureReferences: ["John 1:9", "Malachi 4:2", "Isaiah 9:6", "Luke 2:10-11"],
    cautionLevel: "low"
  },
  {
    id: "custom-new-years",
    name: "New Years Celebrations",
    category: "customs",
    organizationType: "Cultural Holiday",
    description: "New Years celebrations descend from Babylonian Akitu festival and Roman Janus worship. January is named for Janus, the two-faced god of beginnings and transitions. Romans exchanged gifts, made resolutions to Janus, and held wild parties. Noisemaking was believed to scare away evil spirits from the new year.",
    doubleStandard: "Christians ring in the New Year on a date named for a Roman god, making resolutions (vows to Janus), and noisemaking to scare demons—all without spiritual concern. Greek organizations face stricter scrutiny for less pagan-connected practices.",
    christianPerspective: "The Church created Watchnight services to redeem New Years Eve, turning it into a time of prayer, gratitude, and covenant renewal with God. Christians can mark new beginnings while acknowledging that all time belongs to the Lord.",
    biblicalParallels: [
      "Behold, I am doing a new thing (Isaiah 43:19)",
      "His mercies are new every morning (Lamentations 3:22-23)",
      "Forgetting what is behind, pressing forward (Philippians 3:13-14)",
      "Now is the acceptable time (2 Corinthians 6:2)"
    ],
    scriptureReferences: ["Isaiah 43:19", "Lamentations 3:22-23", "Philippians 3:13-14", "Revelation 21:5"],
    cautionLevel: "low"
  },
  {
    id: "custom-valentines-day",
    name: "Valentines Day",
    category: "customs",
    organizationType: "Cultural Holiday",
    description: "Valentines Day derives from Roman Lupercalia (February 13-15), a fertility festival where priests sacrificed goats and dogs, then ran through streets whipping women with bloody hides to ensure fertility. Young men drew names of young women from a jar for temporary sexual pairings. The Church replaced this with St. Valentines feast day.",
    doubleStandard: "Christians celebrate Valentines Day—a Christianized version of a Roman fertility cult involving ritual whipping and sexual lottery—without moral concern. Yet Greek organizations with no fertility cult connections face spiritual condemnation.",
    christianPerspective: "The Church successfully transformed Lupercalia from a pagan fertility rite into a celebration of Christian love and martyrdom. St. Valentine reportedly performed secret Christian marriages. This transformation demonstrates the power of Christian redemption over pagan practices.",
    biblicalParallels: [
      "Love one another as I have loved you (John 15:12)",
      "Greater love has no one than this (John 15:13)",
      "Love is patient, love is kind (1 Corinthians 13:4)",
      "Above all, put on love (Colossians 3:14)"
    ],
    scriptureReferences: ["John 15:12-13", "1 Corinthians 13:4-7", "Colossians 3:14", "1 John 4:7-8"],
    cautionLevel: "low"
  },
  {
    id: "custom-throwing-rice",
    name: "Throwing Rice at Weddings",
    category: "customs",
    organizationType: "Marriage Tradition",
    description: "Throwing rice (or grain) at newlyweds comes from Roman fertility rites invoking Ceres, goddess of agriculture. Romans threw wheat to ensure the bride would bear many children. The practice was also believed to distract evil spirits who would stop to count the grains instead of attacking the couple.",
    doubleStandard: "Christians throw rice at weddings—invoking Ceres for fertility and distracting demons—as a joyful tradition. Greek organizations using any symbolic throwing or scattering ritual face accusations of pagan practice.",
    christianPerspective: "Throwing rice has been completely separated from its pagan origins. Modern participants see it as celebration and blessing, not fertility magic. This illustrates how practices can be entirely transformed in meaning over time.",
    biblicalParallels: [
      "Be fruitful and multiply (Genesis 1:28)",
      "Children are a heritage from the Lord (Psalm 127:3)",
      "The blessing of the Lord makes rich (Proverbs 10:22)",
      "Scatter seeds of blessing (2 Corinthians 9:6)"
    ],
    scriptureReferences: ["Genesis 1:28", "Psalm 127:3", "Proverbs 10:22", "2 Corinthians 9:6"],
    cautionLevel: "low"
  },
  {
    id: "custom-something-borrowed",
    name: "Something Old, New, Borrowed, Blue",
    category: "customs",
    organizationType: "Marriage Tradition",
    description: "This Victorian rhyme combines ancient protective magic: Old connects to ancestors protective spirits; New represents hope for the future; Borrowed transfers luck from a happily married woman; Blue wards off the evil eye (blue was sacred to Roman goddess Juno, protector of women). A sixpence in the shoe invoked prosperity magic.",
    doubleStandard: "Christian brides eagerly collect these items—each one rooted in spirit invocation, luck transfer, and goddess worship—as sweet tradition. Greek organizations using symbolic objects for any reason face harsher judgment.",
    christianPerspective: "Modern brides follow this rhyme as fun tradition, not believing in its magical origins. The practice has been completely drained of spiritual content and repurposed as sentimental preparation. This demonstrates how form can persist while meaning transforms entirely.",
    biblicalParallels: [
      "The old has gone, the new has come (2 Corinthians 5:17)",
      "Give, and it will be given to you (Luke 6:38)",
      "Blue in priestly garments represented heaven (Exodus 28:31)",
      "The Lord gives wisdom and prosperity (Proverbs 2:6-7)"
    ],
    scriptureReferences: ["2 Corinthians 5:17", "Luke 6:38", "Exodus 28:31", "Proverbs 2:6-7"],
    cautionLevel: "low"
  },
  {
    id: "custom-easter",
    name: "Easter Traditions",
    category: "customs",
    organizationType: "Religious Holiday",
    description: "Easter incorporates symbols from Germanic goddess Eostre (or Ostara), celebrating spring fertility. Easter eggs derive from ancient Persian, Egyptian, and Roman spring festivals symbolizing new life and rebirth. The Easter bunny comes from Germanic fertility symbols associated with Eostre. Even the timing follows the pagan lunar calendar (first Sunday after the first full moon after the spring equinox).",
    doubleStandard: "Christians celebrate Easter with eggs from pagan fertility rites, bunnies from Germanic goddess worship, and timing based on pagan lunar calculations—all while condemning Greek organizations for far less pagan-connected practices.",
    christianPerspective: "The Church brilliantly transformed pagan spring festivals into celebration of Christs resurrection—the ultimate new life and rebirth. Eggs and symbols of new life now point to the empty tomb. This is perhaps the greatest example of Christian cultural redemption.",
    biblicalParallels: [
      "Christ has been raised from the dead (1 Corinthians 15:20)",
      "I am the resurrection and the life (John 11:25)",
      "If anyone is in Christ, new creation (2 Corinthians 5:17)",
      "He is not here; he has risen (Matthew 28:6)"
    ],
    scriptureReferences: ["1 Corinthians 15:20", "John 11:25", "2 Corinthians 5:17", "Matthew 28:6"],
    cautionLevel: "low"
  },
  {
    id: "custom-church-steeple",
    name: "Church Steeples",
    category: "customs",
    organizationType: "Church Architecture",
    description: "Church steeples evolved from ancient Egyptian obelisks (symbols of the sun god Ra), Babylonian ziggurats, and Roman temple spires. Early Christians adopted tall spires to point toward heaven, but the architectural form derives directly from pagan temple architecture. Many European cathedrals were built on former pagan temple sites.",
    doubleStandard: "Christians worship in buildings with steeples derived from Egyptian sun worship and Babylonian temple architecture without any spiritual concern. Yet Greek organizations using symbolic architecture face accusations of paganism.",
    christianPerspective: "Church steeples have been completely transformed into symbols pointing toward heaven and Gods transcendence. The architectural form has been redeemed to serve Christian worship. No one worships Ra when entering a steepled church.",
    biblicalParallels: [
      "I lift up my eyes to the mountains (Psalm 121:1)",
      "The heavens declare the glory of God (Psalm 19:1)",
      "Build a house for my Name (1 Kings 8:17)",
      "Where two or three gather, I am there (Matthew 18:20)"
    ],
    scriptureReferences: ["Psalm 121:1", "Psalm 19:1", "1 Kings 8:17-20", "Matthew 18:20"],
    cautionLevel: "low"
  },
  {
    id: "custom-church-dome",
    name: "Church Domes",
    category: "customs",
    organizationType: "Church Architecture",
    description: "Church domes derive from Roman Pantheon architecture (a temple to all gods) and Byzantine adaptations of Roman imperial architecture. The dome represented the vault of heaven in Roman temples. St. Peters Basilica, Hagia Sophia, and countless churches feature this pagan architectural element.",
    doubleStandard: "Christians worship under domes copied from the Roman Pantheon—literally a temple to all pagan gods—without spiritual hesitation. Yet Greek organizations using any Roman architectural elements face condemnation.",
    christianPerspective: "The Church conquered the Roman Empire and converted its architecture to Christian worship. Domes that once honored Jupiter now glorify Christ. This architectural redemption demonstrates Christianitys transformative power over pagan culture.",
    biblicalParallels: [
      "The heavens are telling of the glory of God (Psalm 19:1)",
      "Heaven is my throne (Isaiah 66:1)",
      "I saw heaven opened (Revelation 19:11)",
      "Gods temple in heaven was opened (Revelation 11:19)"
    ],
    scriptureReferences: ["Psalm 19:1", "Isaiah 66:1", "Revelation 19:11", "Revelation 11:19"],
    cautionLevel: "low"
  },
  {
    id: "custom-pulpit",
    name: "Pulpit & Lectern",
    category: "customs",
    organizationType: "Church Architecture",
    description: "The raised pulpit derives from the Greek bema (judgment seat) and Roman rostra (speaking platforms). Roman orators addressed crowds from elevated platforms in forums. Early Christians adopted this pagan civic architecture for preaching, placing the speaker in a position of authority borrowed from Roman courts.",
    doubleStandard: "Preachers speak from pulpits—Roman judgment seats and Greek civic platforms—every Sunday without concern. Yet Greek organizations using elevated positions or platforms face criticism for pagan influence.",
    christianPerspective: "The pulpit has been transformed into a place for proclaiming Gods Word. What was once used for Roman imperial pronouncements now serves the King of Kings. The form serves Christian proclamation, regardless of its origin.",
    biblicalParallels: [
      "Ezra read from a wooden platform (Nehemiah 8:4)",
      "Preach the word in season and out (2 Timothy 4:2)",
      "How can they hear without a preacher (Romans 10:14)",
      "He went up on a mountainside and taught (Matthew 5:1)"
    ],
    scriptureReferences: ["Nehemiah 8:4", "2 Timothy 4:2", "Romans 10:14", "Matthew 5:1-2"],
    cautionLevel: "low"
  },
  {
    id: "custom-basilica-layout",
    name: "Basilica Floor Plan",
    category: "customs",
    organizationType: "Church Architecture",
    description: "The basilica church layout—central nave, side aisles, raised apse—comes directly from Roman basilicas, which were civic buildings for law courts and commerce, not religious structures. Romans named them after the Greek word basileus (king). Early Christians simply converted these pagan civic buildings into churches.",
    doubleStandard: "Every traditional church follows the floor plan of Roman pagan civic buildings. Christians worship in architectural forms designed for Roman law courts without any concern. Greek organizations using Roman-influenced gathering spaces face different standards.",
    christianPerspective: "Constantine gave Christians basilicas, and the Church transformed secular Roman architecture into sacred space. The form that once served emperors now serves the King of Kings. This demonstrates how any space can be consecrated to God.",
    biblicalParallels: [
      "The temple was built with dressed stone (1 Kings 6:7)",
      "My house shall be called a house of prayer (Isaiah 56:7)",
      "Do not forsake assembling together (Hebrews 10:25)",
      "The church that meets at their house (Romans 16:5)"
    ],
    scriptureReferences: ["1 Kings 6:7", "Isaiah 56:7", "Hebrews 10:25", "Romans 16:5"],
    cautionLevel: "low"
  },
  {
    id: "custom-altar",
    name: "Church Altar",
    category: "customs",
    organizationType: "Church Architecture",
    description: "Church altars derive from pagan sacrificial altars used in Greek, Roman, and ancient Near Eastern temples. The raised table for offerings was central to pagan worship. Early Christians adapted this form for the Eucharist, transforming the sacrifice table into the Lords Table.",
    doubleStandard: "Christians receive communion at altars—structures borrowed from pagan sacrificial worship—every week without concern. Greek organizations using any altar-like structures face accusations of pagan sacrifice.",
    christianPerspective: "Christ is the final sacrifice, and the Christian altar commemorates rather than repeats sacrifice. The Lords Table transforms the pagan altar into a place of remembrance and thanksgiving. The form serves the gospel.",
    biblicalParallels: [
      "This is my body given for you (Luke 22:19)",
      "We have an altar (Hebrews 13:10)",
      "Present your bodies as living sacrifices (Romans 12:1)",
      "Do this in remembrance of me (1 Corinthians 11:24)"
    ],
    scriptureReferences: ["Luke 22:19", "Hebrews 13:10", "Romans 12:1", "1 Corinthians 11:24-25"],
    cautionLevel: "low"
  },
  {
    id: "custom-columns-porticos",
    name: "Columns & Porticos",
    category: "customs",
    organizationType: "Church Architecture",
    description: "The grand columns and porticos of churches—Corinthian, Ionic, Doric—come directly from Greek temple architecture. These styles were developed for temples to Zeus, Athena, and Apollo. The columned entrance became standard for Christian churches, government buildings, and banks worldwide.",
    doubleStandard: "Christians enter churches through Greek temple porticos designed for Zeus and Athena without spiritual concern. Government buildings, universities, and banks use identical pagan temple architecture. Greek organizations face different standards.",
    christianPerspective: "Classical architecture represents humanitys best efforts at beauty and grandeur. Christians appropriated these forms to glorify God rather than pagan deities. The columns that once framed idols now frame the Cross.",
    biblicalParallels: [
      "The pillars Jachin and Boaz in Solomons temple (1 Kings 7:21)",
      "Him who overcomes I will make a pillar (Revelation 3:12)",
      "The pillar and foundation of truth (1 Timothy 3:15)",
      "Beautiful for situation, the joy of the whole earth (Psalm 48:2)"
    ],
    scriptureReferences: ["1 Kings 7:21", "Revelation 3:12", "1 Timothy 3:15", "Psalm 48:2"],
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
  },
  // Deities Section
  {
    id: "athena-deity",
    name: "Athena (Minerva)",
    category: "deities",
    description: "Greek goddess of wisdom, warfare, and crafts. Roman equivalent: Minerva. Appears on university seals, state seals, and library architecture worldwide.",
    christianApproach: "Athena imagery on university seals represents the pursuit of wisdom and knowledge—values Christians share (Proverbs 4:7). The symbol honors learning, not the deity. Christians attend Harvard, Yale, and Columbia without worshipping Athena.",
    cautionLevel: "low",
    scripturalContext: "Proverbs 4:7 - 'The beginning of wisdom is this: Get wisdom. Though it cost all you have, get understanding.'"
  },
  {
    id: "apollo-deity",
    name: "Apollo",
    category: "deities",
    description: "Greek god of music, arts, light, and prophecy. His imagery appears on government buildings, arts institutions, and medical facilities (Apollo was also associated with healing).",
    christianApproach: "Apollo represents light, arts, and healing in cultural symbolism. Christians participate in arts programs, visit museums, and receive medical care at institutions bearing his imagery without spiritual compromise.",
    cautionLevel: "low",
    scripturalContext: "Philippians 4:8 - 'Whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely... think about such things.'"
  },
  {
    id: "hermes-deity",
    name: "Hermes (Mercury)",
    category: "deities",
    description: "Greek messenger god of commerce, travelers, and thieves. Roman equivalent: Mercury. His caduceus-like imagery appears in commerce and communication symbols.",
    christianApproach: "The FTD flower delivery logo, postal services, and many business symbols use Mercury/Hermes imagery to represent swift commerce and communication. Christians use these services daily.",
    cautionLevel: "low"
  },
  {
    id: "nike-deity",
    name: "Nike (Victoria)",
    category: "deities",
    description: "Greek goddess of victory. Roman equivalent: Victoria. Her winged image appears on trophies, medals, and the famous Nike brand logo (the 'swoosh' represents her wing).",
    christianApproach: "Christian athletes wear Nike shoes, receive victory trophies, and celebrate wins without worshipping Nike. The imagery represents achievement and excellence, values Scripture celebrates.",
    cautionLevel: "low",
    scripturalContext: "1 Corinthians 9:24 - 'Run in such a way as to get the prize.'"
  },
  {
    id: "themis-deity",
    name: "Themis (Lady Justice)",
    category: "deities",
    description: "Greek titaness of divine law and order. Her blindfolded image holding scales appears in courthouses, law schools, and legal institutions worldwide.",
    christianApproach: "Christians serve as lawyers, judges, and jurors in courts adorned with Themis imagery. The symbol represents justice—a deeply biblical concept. God Himself is called the 'righteous judge.'",
    cautionLevel: "low",
    scripturalContext: "Micah 6:8 - 'Act justly and to love mercy and to walk humbly with your God.'"
  },
  {
    id: "poseidon-deity",
    name: "Poseidon (Neptune)",
    category: "deities",
    description: "Greek god of the sea. Roman equivalent: Neptune. His trident imagery appears on naval vessels, coastal cities' seals, and maritime institutions.",
    christianApproach: "Naval personnel, including Christian chaplains, serve on ships with Neptune imagery. Coastal cities with Christian populations use his imagery in their seals. The symbol represents maritime power and heritage.",
    cautionLevel: "low"
  },
  {
    id: "zeus-deity",
    name: "Zeus (Jupiter)",
    category: "deities",
    description: "Chief Greek god. Roman equivalent: Jupiter. His eagle was adopted as a Roman imperial symbol and later by the United States government.",
    christianApproach: "The American eagle (derived from Jupiter's eagle) appears on U.S. currency, passports, and military insignia. Christians serve in the military, use money, and pledge allegiance without worshipping Zeus.",
    cautionLevel: "low",
    scripturalContext: "Romans 13:1 - 'Let everyone be subject to the governing authorities, for there is no authority except that which God has established.'"
  },
  {
    id: "demeter-deity",
    name: "Demeter (Ceres)",
    category: "deities",
    description: "Greek goddess of harvest and agriculture. Roman equivalent: Ceres (origin of 'cereal'). Her imagery appears on state seals, agricultural departments, and food industry symbols.",
    christianApproach: "Many state seals feature Ceres representing agriculture. Farmers, including Christian farmers, work under agricultural departments using this imagery. The symbol represents harvest and provision.",
    cautionLevel: "low",
    scripturalContext: "Psalm 67:6 - 'The land yields its harvest; God, our God, blesses us.'"
  },
  {
    id: "ares-deity",
    name: "Ares (Mars)",
    category: "deities",
    description: "Greek god of war. Roman equivalent: Mars. Military imagery, the planet Mars, and the month of March all derive from his name.",
    christianApproach: "Christians in the military use martial terminology and serve in March without spiritual compromise. The Pentagon and military installations use classical war imagery as cultural heritage, not worship.",
    cautionLevel: "low"
  },
  {
    id: "hephaestus-deity",
    name: "Hephaestus (Vulcan)",
    category: "deities",
    description: "Greek god of fire, forge, and craftsmanship. Roman equivalent: Vulcan. His imagery appears in engineering, metallurgy, and manufacturing symbols.",
    christianApproach: "Engineering schools, manufacturing facilities, and craft guilds use forge and anvil imagery derived from Vulcan. Christians work in these fields without worshipping the deity—they honor the value of skilled craftsmanship.",
    cautionLevel: "low",
    scripturalContext: "Exodus 31:3-5 - God filled Bezalel with 'skill, ability and knowledge in all kinds of crafts.'"
  },
  // Federal Seals Section
  {
    id: "us-great-seal",
    name: "Great Seal of the United States",
    category: "seals",
    description: "Features Jupiter's eagle, the Eye of Providence in an Egyptian pyramid, and Latin mottos. Used on currency, passports, and all official federal documents.",
    christianApproach: "Christians daily use money bearing this seal, carry passports, and respect government documents. The founding fathers, many devout Christians, designed and approved this seal combining classical and Masonic imagery.",
    cautionLevel: "low",
    scripturalContext: "Matthew 22:21 - 'Give back to Caesar what is Caesar's, and to God what is God's.'"
  },
  {
    id: "doj-seal",
    name: "Department of Justice Seal",
    category: "seals",
    description: "Features Lady Justice (Themis) with scales and sword, surrounded by Latin inscriptions emphasizing law and justice.",
    christianApproach: "Christian lawyers, judges, and law enforcement officers serve under this seal daily. The imagery represents the pursuit of justice—a profoundly biblical calling.",
    cautionLevel: "low",
    scripturalContext: "Amos 5:24 - 'Let justice roll on like a river, righteousness like a never-failing stream!'"
  },
  {
    id: "us-senate-seal",
    name: "United States Senate Seal",
    category: "seals",
    description: "Features the Roman fasces (bundle of rods with an axe), symbolizing strength through unity and judicial authority from ancient Rome.",
    christianApproach: "Christian senators, staff, and visitors to the Capitol work under this seal. The fasces represents democratic governance, derived from Roman republican traditions.",
    cautionLevel: "low"
  },
  {
    id: "supreme-court-imagery",
    name: "Supreme Court Building Imagery",
    category: "seals",
    description: "The building features Moses holding the Ten Commandments alongside Solon (Greek), Confucius, and other lawgivers. Greek architectural style with Corinthian columns.",
    christianApproach: "The Supreme Court building includes Moses prominently, showing how classical architecture and biblical imagery coexist. Christians argue cases, serve as justices, and visit this building regularly.",
    cautionLevel: "low",
    scripturalContext: "The building literally depicts Moses and the Ten Commandments, demonstrating biblical influence alongside classical elements."
  },
  {
    id: "treasury-seal",
    name: "Department of Treasury Seal",
    category: "seals",
    description: "Features scales of justice, a key, and classical imagery representing financial stewardship and security.",
    christianApproach: "Christians use currency, pay taxes, and work in financial institutions under Treasury oversight. The classical imagery represents careful stewardship—a biblical value.",
    cautionLevel: "low",
    scripturalContext: "Matthew 25:21 - 'Well done, good and faithful servant! You have been faithful with a few things; I will put you in charge of many things.'"
  },
  // State Seals Section
  {
    id: "virginia-seal",
    name: "Virginia State Seal",
    category: "seals",
    description: "Features Virtus (Roman goddess of virtue) standing over a defeated tyrant with 'Sic Semper Tyrannis' (Thus Always to Tyrants).",
    christianApproach: "Christians in Virginia use state documents, vote, and serve in government under this seal. The imagery represents liberty and virtue—values Christians embrace.",
    cautionLevel: "low"
  },
  {
    id: "california-seal",
    name: "California State Seal",
    category: "seals",
    description: "Features Minerva (Athena), goddess of wisdom, who sprang fully grown from Jupiter's head. Includes a grizzly bear and the state motto 'Eureka.'",
    christianApproach: "Millions of Christians live, work, and worship freely in California under this seal. Minerva represents the Gold Rush-era value placed on wisdom and quick thinking.",
    cautionLevel: "low"
  },
  {
    id: "new-york-seal",
    name: "New York State Seal",
    category: "seals",
    description: "Features Liberty and Justice flanking a shield, with a sun, mountains, and ships. 'Excelsior' (Ever Upward) as the motto.",
    christianApproach: "Christians in New York participate fully in civic life under this seal. Liberty and Justice are personified in classical style but represent American values rooted in Judeo-Christian tradition.",
    cautionLevel: "low"
  },
  {
    id: "oklahoma-seal",
    name: "Oklahoma State Seal",
    category: "seals",
    description: "Features a five-pointed star containing symbols of the Five Civilized Tribes, surrounded by 45 smaller stars representing the states.",
    christianApproach: "This seal uniquely honors Native American heritage. Christians in Oklahoma, including many Native American Christians, embrace this multicultural symbol of their state's history.",
    cautionLevel: "low"
  },
  // College Seals Section
  {
    id: "harvard-seal",
    name: "Harvard University Seal",
    category: "seals",
    description: "Features 'VERITAS' (Truth) on three books. Founded as a Christian institution to train ministers, the motto 'Truth for Christ and the Church' was later shortened.",
    christianApproach: "Harvard was founded by Puritans for Christian education. The pursuit of truth—VERITAS—remains a Christian calling. Many faithful Christians have graduated from and taught at Harvard.",
    cautionLevel: "low",
    scripturalContext: "John 8:32 - 'Then you will know the truth, and the truth will set you free.'"
  },
  {
    id: "yale-seal",
    name: "Yale University Seal",
    category: "seals",
    description: "Features 'LUX ET VERITAS' (Light and Truth) with Hebrew text 'Urim and Thummim' referencing the Old Testament priestly breastplate.",
    christianApproach: "Yale's seal explicitly includes Hebrew Scripture references. Founded to train Congregational ministers, the university's Christian heritage is embedded in its imagery.",
    cautionLevel: "low",
    scripturalContext: "Exodus 28:30 - The Urim and Thummim on the priestly breastplate for divine guidance."
  },
  {
    id: "columbia-seal",
    name: "Columbia University Seal",
    category: "seals",
    description: "Features Alma Mater (nurturing mother) enthroned with a scepter, open book, and 'IN LUMINE TUO VIDEBIMUS LUMEN' (In Thy Light We Shall See Light).",
    christianApproach: "Columbia's motto is from Psalm 36:9—explicitly biblical. The personified Alma Mater represents the university as a nurturing institution, not a goddess to worship.",
    cautionLevel: "low",
    scripturalContext: "Psalm 36:9 - 'For with you is the fountain of life; in your light we see light.'"
  },
  {
    id: "princeton-seal",
    name: "Princeton University Seal",
    category: "seals",
    description: "Features 'DEI SUB NUMINE VIGET' (Under God's Power She Flourishes) with an open Bible. Founded as a Presbyterian seminary.",
    christianApproach: "Princeton's seal explicitly acknowledges God's sovereignty. The open Bible on the seal reflects the university's Christian founding. Christians can embrace this heritage with confidence.",
    cautionLevel: "low",
    scripturalContext: "Proverbs 3:5-6 - 'Trust in the LORD with all your heart... and he will make your paths straight.'"
  },
  {
    id: "dartmouth-seal",
    name: "Dartmouth College Seal",
    category: "seals",
    description: "Features 'VOX CLAMANTIS IN DESERTO' (A Voice Crying in the Wilderness) referencing John the Baptist. Founded to educate Native Americans and colonists in Christianity.",
    christianApproach: "Dartmouth's motto is directly from Scripture—John the Baptist's declaration. The seal reflects the college's Christian missionary origins.",
    cautionLevel: "low",
    scripturalContext: "Matthew 3:3 - 'A voice of one calling in the wilderness, Prepare the way for the Lord.'"
  },
  {
    id: "unc-seal",
    name: "University of North Carolina Seal",
    category: "seals",
    description: "Features 'LUX LIBERTAS' (Light and Liberty) with classical imagery including a book and rays of light.",
    christianApproach: "Light and liberty are deeply biblical concepts. The first public university in America uses imagery that resonates with Christian values of truth and freedom.",
    cautionLevel: "low",
    scripturalContext: "2 Corinthians 3:17 - 'Where the Spirit of the Lord is, there is freedom.'"
  },
  {
    id: "mit-seal",
    name: "MIT Seal",
    category: "seals",
    description: "Features 'MENS ET MANUS' (Mind and Hand) with a classical figure, books, and industrial imagery representing the union of science and practical arts.",
    christianApproach: "The combination of intellectual pursuit and practical application reflects biblical wisdom. Christians in STEM fields honor God through scientific discovery and technological innovation.",
    cautionLevel: "low",
    scripturalContext: "Colossians 3:23 - 'Whatever you do, work at it with all your heart, as working for the Lord.'"
  },
  {
    id: "usc-seal",
    name: "University of Southern California Seal",
    category: "seals",
    description: "Features Tommy Trojan, a classical warrior figure, with a torch and USC's motto. Founded by Methodists in 1880.",
    christianApproach: "USC was founded by Methodist Christians. The Trojan warrior represents courage and strength—qualities Scripture celebrates. Many Christian athletes, scholars, and ministers have studied there.",
    cautionLevel: "low"
  },
  {
    id: "stanford-seal",
    name: "Stanford University Seal",
    category: "seals",
    description: "Features 'DIE LUFT DER FREIHEIT WEHT' (The Wind of Freedom Blows) with a tree, representing growth and intellectual freedom.",
    christianApproach: "Founded by Christians Leland and Jane Stanford in memory of their son. The tree imagery connects to biblical metaphors of growth, fruit-bearing, and flourishing.",
    cautionLevel: "low",
    scripturalContext: "Psalm 1:3 - 'That person is like a tree planted by streams of water, which yields its fruit in season.'"
  }
];

export const symbolCategories = [
  { id: "all", label: "All" },
  { id: "organizational", label: "Organizational" },
  { id: "ritual", label: "Ritual" },
  { id: "symbols", label: "Symbols" },
  { id: "oaths", label: "Oaths" },
  { id: "customs", label: "Customs" },
  { id: "deity", label: "Deities" },
  { id: "seals", label: "Seals" }
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
