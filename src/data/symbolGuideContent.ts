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
  // Greek Deities
  {
    id: "zeus-deity",
    name: "Zeus (Jupiter)",
    category: "deity",
    description: "King of the Greek gods, god of sky, thunder, and justice. Roman equivalent: Jupiter.",
    christianPerspective: "Zeus appears on government buildings, university seals, and civic imagery worldwide. In organizational contexts, references to Zeus typically represent power, justice, or authority—not worship. The Apostle Paul engaged with Greek religious culture at the Areopagus without condemning all Greek imagery.",
    cautionLevel: "medium",
    cautionNote: "Context matters. Imagery representing authority differs from invocation for spiritual power.",
    scripturalContext: "Acts 17:22-28 - Paul at the Areopagus, engaging Greek religious thought."
  },
  {
    id: "athena-deity",
    name: "Athena (Minerva)",
    category: "deity",
    description: "Goddess of wisdom, craft, and strategic warfare. Roman equivalent: Minerva. Appears on countless university seals.",
    christianPerspective: "Athena represents wisdom and learning in academic contexts. The seal of California, many Ivy League universities, and countless academic institutions feature Athena without religious intent. She symbolizes the pursuit of knowledge.",
    cautionLevel: "low",
    scripturalContext: "Proverbs 4:7 - 'Wisdom is the principal thing; therefore get wisdom.'"
  },
  {
    id: "apollo-deity",
    name: "Apollo",
    category: "deity",
    description: "God of music, poetry, art, sun, light, and knowledge. Patron of the arts and healing.",
    christianPerspective: "Apollo imagery appears on government buildings, arts institutions, and medical symbols worldwide. In organizational contexts, Apollo represents artistic excellence, enlightenment, and healing—values celebrated in Scripture.",
    cautionLevel: "low",
    scripturalContext: "Psalm 33:3 - 'Sing to him a new song; play skillfully, and shout for joy.'"
  },
  {
    id: "hermes-deity",
    name: "Hermes (Mercury)",
    category: "deity",
    description: "Messenger god, god of commerce, eloquence, and travelers. Roman equivalent: Mercury.",
    christianPerspective: "Hermes/Mercury appears in business logos, communication symbols, and the caduceus used in medicine. These represent commerce and communication, not worship. Paul was mistakenly called Hermes because of his eloquent speaking (Acts 14:12).",
    cautionLevel: "low",
    scripturalContext: "Acts 14:12 - Reference to Hermes in the context of Paul's ministry."
  },
  {
    id: "ares-deity",
    name: "Ares (Mars)",
    category: "deity",
    description: "God of war, courage, and civil order. Roman equivalent: Mars.",
    christianPerspective: "Mars gives us 'March' and military terminology. Military academies and organizations reference Mars for valor and courage. The concept of spiritual warfare in Scripture shows combat imagery can serve righteous purposes.",
    cautionLevel: "medium",
    cautionNote: "War imagery should emphasize just causes and protection, not violence for its own sake.",
    scripturalContext: "Ephesians 6:10-18 - The armor of God and spiritual warfare."
  },
  {
    id: "aphrodite-deity",
    name: "Aphrodite (Venus)",
    category: "deity",
    description: "Goddess of love, beauty, and desire. Roman equivalent: Venus.",
    christianPerspective: "Venus gives us 'venerate' and Friday (Freitag). Beauty and love are celebrated in Scripture—the Song of Solomon is essentially a love poem. Artistic representations of beauty have Christian heritage in Renaissance art.",
    cautionLevel: "low",
    scripturalContext: "Song of Solomon 4:7 - 'You are altogether beautiful, my darling.'"
  },
  {
    id: "poseidon-deity",
    name: "Poseidon (Neptune)",
    category: "deity",
    description: "God of the sea, earthquakes, and horses. Roman equivalent: Neptune.",
    christianPerspective: "Neptune imagery appears in coastal cities, naval traditions, and maritime organizations. God Himself 'divided the sea' and controls the waters. Imagery of sea mastery reflects creation's grandeur.",
    cautionLevel: "low",
    scripturalContext: "Psalm 89:9 - 'You rule over the surging sea.'"
  },
  {
    id: "hades-deity",
    name: "Hades (Pluto)",
    category: "deity",
    description: "God of the underworld and the dead. Roman equivalent: Pluto.",
    christianPerspective: "The Greek word 'Hades' is used in the New Testament itself to describe the realm of the dead. Jesus said the gates of Hades would not prevail against His church. The term has biblical usage.",
    cautionLevel: "medium",
    cautionNote: "While the term is biblical, imagery celebrating death or darkness should be evaluated carefully.",
    scripturalContext: "Matthew 16:18 - 'The gates of Hades will not overcome it.'"
  },
  {
    id: "demeter-deity",
    name: "Demeter (Ceres)",
    category: "deity",
    description: "Goddess of harvest, agriculture, and fertility. Roman equivalent: Ceres (hence 'cereal').",
    christianPerspective: "Harvest imagery is deeply biblical. God provides the harvest, and thanksgiving for abundance is scriptural. Agricultural symbolism represents God's provision, not pagan worship.",
    cautionLevel: "low",
    scripturalContext: "Psalm 65:9-13 - God crowning the year with bounty."
  },
  {
    id: "hera-deity",
    name: "Hera (Juno)",
    category: "deity",
    description: "Queen of the gods, goddess of marriage and family. Roman equivalent: Juno (hence 'June' for weddings).",
    christianPerspective: "June remains the most popular month for Christian weddings. Marriage and family are celebrated throughout Scripture. The imagery represents commitment and family values.",
    cautionLevel: "low",
    scripturalContext: "Ephesians 5:31-32 - Marriage as a sacred covenant."
  },
  {
    id: "dionysus-deity",
    name: "Dionysus (Bacchus)",
    category: "deity",
    description: "God of wine, festivity, and ecstasy. Roman equivalent: Bacchus.",
    christianPerspective: "While Dionysus represented excess, Jesus Himself turned water into wine at a wedding feast. Celebration in moderation is biblical. The imagery of vine and wine appears throughout Scripture.",
    cautionLevel: "medium",
    cautionNote: "Celebrate joyfully but avoid imagery promoting excess or drunkenness.",
    scripturalContext: "John 2:1-11 - Jesus at the wedding in Cana; John 15:5 - 'I am the vine.'"
  },
  {
    id: "hephaestus-deity",
    name: "Hephaestus (Vulcan)",
    category: "deity",
    description: "God of fire, metalworking, and craftsmanship. Roman equivalent: Vulcan.",
    christianPerspective: "Craftsmanship is celebrated in Scripture—Bezalel was filled with the Spirit for skilled work on the tabernacle. Blacksmithing and metalwork imagery represents creative skill and labor.",
    cautionLevel: "low",
    scripturalContext: "Exodus 31:1-5 - Bezalel filled with skill, ability, and knowledge."
  },
  {
    id: "artemis-deity",
    name: "Artemis (Diana)",
    category: "deity",
    description: "Goddess of the hunt, wilderness, and the moon. Roman equivalent: Diana.",
    christianPerspective: "Paul confronted the worship of Artemis at Ephesus (Acts 19). However, nature imagery and wilderness appreciation are biblical. The distinction is worship vs. aesthetic appreciation.",
    cautionLevel: "medium",
    cautionNote: "Paul's confrontation was about actual worship, not all nature imagery.",
    scripturalContext: "Acts 19:24-35 - Paul at Ephesus regarding Artemis worship."
  },
  // Egyptian Deities
  {
    id: "isis-deity",
    name: "Isis",
    category: "deity",
    description: "Egyptian goddess of magic, motherhood, and wisdom. One of the most widely worshiped deities in ancient Mediterranean world.",
    christianPerspective: "Isis imagery appears in organizations like the Daughters of Isis (Shriner auxiliary). In organizational contexts, she represents wisdom and feminine strength. Early Christians in Egypt adapted some Isis imagery to honor Mary.",
    cautionLevel: "medium",
    cautionNote: "Context matters. Organizational usage differs from worship.",
    scripturalContext: "Proverbs 31:25-26 - The virtuous woman described with strength and wisdom."
  },
  {
    id: "osiris-deity",
    name: "Osiris",
    category: "deity",
    description: "Egyptian god of the afterlife, death, resurrection, and agriculture. Often depicted with green skin.",
    christianPerspective: "The Osiris myth of death and resurrection influenced ancient world concepts that Paul engaged. The Christian doctrine of resurrection fulfilled what pagans glimpsed dimly.",
    cautionLevel: "medium",
    cautionNote: "The resurrection theme can open discussions about Christ's true resurrection.",
    scripturalContext: "1 Corinthians 15:20-22 - Christ's resurrection as firstfruits."
  },
  {
    id: "horus-deity",
    name: "Horus",
    category: "deity",
    description: "Egyptian sky god, often depicted as a falcon. The Eye of Horus is a common symbol of protection.",
    christianPerspective: "The Eye of Horus appears in some fraternal imagery. Ancient symbols of protection and watchfulness echo biblical themes of God's watchful care over His people.",
    cautionLevel: "medium",
    cautionNote: "Protection symbolism can point to God as true protector.",
    scripturalContext: "Psalm 121:4 - 'He who watches over Israel will neither slumber nor sleep.'"
  },
  {
    id: "ra-deity",
    name: "Ra (Re)",
    category: "deity",
    description: "Egyptian sun god, king of the gods. Often depicted with a sun disk.",
    christianPerspective: "Sun imagery appears throughout Scripture positively. Jesus is called the 'Sun of Righteousness.' Light and sun symbolism can point to Christ, the true light of the world.",
    cautionLevel: "low",
    scripturalContext: "Malachi 4:2 - 'The Sun of Righteousness will rise with healing in his wings.'"
  },
  {
    id: "anubis-deity",
    name: "Anubis",
    category: "deity",
    description: "Egyptian god of mummification and the afterlife, depicted with a jackal head.",
    christianPerspective: "Anubis guided souls in Egyptian belief. Christians have the Holy Spirit as guide. Death-related imagery can be redeemed to point to Christian hope of resurrection.",
    cautionLevel: "medium",
    cautionNote: "Death imagery should point to resurrection hope, not darkness.",
    scripturalContext: "1 Thessalonians 4:13-14 - Hope in death through Christ."
  },
  {
    id: "thoth-deity",
    name: "Thoth",
    category: "deity",
    description: "Egyptian god of wisdom, writing, and knowledge. Depicted with an ibis head.",
    christianPerspective: "Thoth as patron of writing and wisdom represents intellectual pursuit. God Himself gave humanity language and the capacity to write Scripture. Wisdom pursuit is biblical.",
    cautionLevel: "low",
    scripturalContext: "Proverbs 2:6 - 'The LORD gives wisdom; from his mouth come knowledge and understanding.'"
  },
  {
    id: "maat-deity",
    name: "Maat",
    category: "deity",
    description: "Egyptian goddess of truth, justice, and cosmic order. Often depicted with an ostrich feather.",
    christianPerspective: "Maat represented truth and justice—values central to Scripture. God is a God of justice and truth. The concept of moral order reflects God's design.",
    cautionLevel: "low",
    scripturalContext: "Micah 6:8 - 'Act justly and to love mercy and to walk humbly with your God.'"
  },
  {
    id: "sekhmet-deity",
    name: "Sekhmet",
    category: "deity",
    description: "Egyptian warrior goddess with a lioness head. Associated with healing and protection.",
    christianPerspective: "Lion imagery is biblical—Jesus is the Lion of Judah. Warrior and protector themes echo God as our refuge and fortress. Strength imagery can point to divine protection.",
    cautionLevel: "low",
    scripturalContext: "Psalm 91:1-2 - 'Whoever dwells in the shelter of the Most High.'"
  },
  {
    id: "bastet-deity",
    name: "Bastet",
    category: "deity",
    description: "Egyptian goddess depicted as a cat, associated with home, fertility, and protection.",
    christianPerspective: "Bastet represented domestic protection and care. God's care for His people, especially families and homes, is a major biblical theme.",
    cautionLevel: "low",
    scripturalContext: "Psalm 127:1 - 'Unless the LORD watches over the city, the guards stand watch in vain.'"
  },
  // Additional Greek Deities
  {
    id: "persephone-deity",
    name: "Persephone (Proserpina)",
    category: "deity",
    description: "Greek goddess of spring and queen of the underworld. Her myth explains the seasons. Roman equivalent: Proserpina.",
    christianPerspective: "The Persephone myth of descent and return echoes themes of death and resurrection. Spring as renewal is a Christian theme—Easter celebrates resurrection in spring. The imagery of life conquering death is biblical.",
    cautionLevel: "low",
    scripturalContext: "Romans 6:9 - 'Christ, being raised from the dead, will never die again; death no longer has dominion over him.'"
  },
  {
    id: "pan-deity",
    name: "Pan (Faunus)",
    category: "deity",
    description: "Greek god of nature, shepherds, and rustic music. Depicted with goat legs and horns. Roman equivalent: Faunus.",
    christianPerspective: "While Pan's imagery has been misused, the pastoral shepherd theme is deeply biblical. Jesus is the Good Shepherd. Pan represents nature and wilderness—God's creation that declares His glory.",
    cautionLevel: "medium",
    cautionNote: "Distinguish pastoral imagery from darker misappropriations. Shepherding is deeply biblical.",
    scripturalContext: "John 10:11 - 'I am the good shepherd. The good shepherd lays down his life for the sheep.'"
  },
  {
    id: "hecate-deity",
    name: "Hecate (Trivia)",
    category: "deity",
    description: "Greek goddess of crossroads, magic, and the moon. Often depicted with three faces. Roman equivalent: Trivia.",
    christianPerspective: "Hecate represents choices and transitions. Christians face crossroads decisions guided by Scripture and the Holy Spirit. The imagery of choosing the right path is biblical.",
    cautionLevel: "medium",
    cautionNote: "Focus on the decision-making symbolism rather than magical associations.",
    scripturalContext: "Proverbs 3:5-6 - 'Trust in the LORD with all your heart... and he will make your paths straight.'"
  },
  {
    id: "helios-deity",
    name: "Helios (Sol)",
    category: "deity",
    description: "Greek titan god of the sun who drove his chariot across the sky. Roman equivalent: Sol.",
    christianPerspective: "Sun imagery is extensively biblical. Jesus is called the 'Sun of Righteousness.' The concept of light overcoming darkness is central to Christian faith.",
    cautionLevel: "low",
    scripturalContext: "Malachi 4:2 - 'The sun of righteousness will rise with healing in its rays.'"
  },
  {
    id: "eros-deity",
    name: "Eros (Cupid)",
    category: "deity",
    description: "Greek god of love and desire. Son of Aphrodite. Roman equivalent: Cupid, familiar in Valentine's imagery.",
    christianPerspective: "Love is central to Christian faith—God is love. Eros represents romantic love, which is celebrated in Song of Solomon. Cupid imagery appears in countless churches and Christian weddings.",
    cautionLevel: "low",
    scripturalContext: "1 John 4:8 - 'Whoever does not love does not know God, because God is love.'"
  },
  {
    id: "nike-deity",
    name: "Nike",
    category: "deity",
    description: "Greek goddess of victory, often depicted with wings. The famous Nike swoosh represents her wing.",
    christianPerspective: "Victory through Christ is a major New Testament theme. 'Thanks be to God who gives us the victory through our Lord Jesus Christ.' Christians wear Nike products without spiritual concern.",
    cautionLevel: "low",
    scripturalContext: "1 Corinthians 15:57 - 'Thanks be to God! He gives us the victory through our Lord Jesus Christ.'"
  },
  {
    id: "tyche-deity",
    name: "Tyche",
    category: "deity",
    description: "Greek goddess of fortune, chance, and prosperity of a city. Often depicted with a crown of city walls.",
    christianPerspective: "While we trust in God's providence rather than chance, the concept of city blessing and prosperity is biblical. Jeremiah urged prayers for the prosperity of the city.",
    cautionLevel: "low",
    scripturalContext: "Jeremiah 29:7 - 'Seek the peace and prosperity of the city to which I have carried you.'"
  },
  {
    id: "nemesis-deity",
    name: "Nemesis",
    category: "deity",
    description: "Greek goddess of divine retribution against those who succumb to hubris. Represents balance and justice.",
    christianPerspective: "Divine justice is thoroughly biblical. God opposes the proud and gives grace to the humble. The concept of consequences for arrogance appears throughout Scripture.",
    cautionLevel: "low",
    scripturalContext: "Proverbs 16:18 - 'Pride goes before destruction, a haughty spirit before a fall.'"
  },
  {
    id: "asclepius-deity",
    name: "Asclepius",
    category: "deity",
    description: "Greek god of medicine and healing. His rod with a serpent is the symbol of medicine worldwide.",
    christianPerspective: "The Rod of Asclepius appears on ambulances, hospitals, and medical schools globally. Moses lifted a bronze serpent for healing (Numbers 21). Healing is a biblical ministry.",
    cautionLevel: "low",
    scripturalContext: "Numbers 21:8-9 - The bronze serpent lifted up for healing, prefiguring Christ (John 3:14)."
  },
  {
    id: "hypnos-deity",
    name: "Hypnos (Somnus)",
    category: "deity",
    description: "Greek god of sleep. Twin brother of Thanatos (death). Roman equivalent: Somnus.",
    christianPerspective: "Sleep is God's gift to His beloved (Psalm 127:2). Rest is a biblical principle established at creation. The concept of peaceful rest under God's protection is thoroughly scriptural.",
    cautionLevel: "low",
    scripturalContext: "Psalm 4:8 - 'In peace I will lie down and sleep, for you alone, LORD, make me dwell in safety.'"
  },
  {
    id: "thanatos-deity",
    name: "Thanatos (Mors)",
    category: "deity",
    description: "Greek personification of death. Roman equivalent: Mors.",
    christianPerspective: "Death is an enemy that Christ has conquered. Paul asks, 'O death, where is your sting?' Understanding mortality leads to wisdom and points to the need for resurrection hope.",
    cautionLevel: "medium",
    cautionNote: "Death imagery should point to Christ's victory, not glorify death itself.",
    scripturalContext: "1 Corinthians 15:55 - 'Where, O death, is your victory? Where, O death, is your sting?'"
  },
  {
    id: "prometheus-deity",
    name: "Prometheus",
    category: "deity",
    description: "Greek titan who brought fire to humanity and was punished by Zeus. Symbol of human progress and sacrifice.",
    christianPerspective: "Prometheus's sacrifice for humanity echoes, however imperfectly, Christ's sacrifice. The theme of suffering for others' benefit is deeply Christian. Fire represents enlightenment and the Spirit.",
    cautionLevel: "low",
    scripturalContext: "Acts 2:3 - Tongues of fire at Pentecost; Matthew 5:14 - 'You are the light of the world.'"
  },
  {
    id: "the-muses",
    name: "The Nine Muses",
    category: "deity",
    description: "Greek goddesses of arts and sciences—Calliope, Clio, Euterpe, Thalia, Melpomene, Terpsichore, Erato, Polyhymnia, Urania.",
    christianPerspective: "Creativity and the arts are gifts from God. 'Music' comes from the Muses. Christians throughout history have excelled in arts for God's glory. The creative impulse reflects the Creator.",
    cautionLevel: "low",
    scripturalContext: "Exodus 35:31-35 - God filling craftsmen with skill, ability, and knowledge in all kinds of crafts."
  },
  {
    id: "the-fates",
    name: "The Fates (Moirai/Parcae)",
    category: "deity",
    description: "Three goddesses who controlled human destiny—Clotho, Lachesis, Atropos. Roman equivalent: Parcae.",
    christianPerspective: "Christians believe in God's sovereignty, not fate. However, the concept of life having purpose and meaning is biblical. Our times are in God's hands, not random chance.",
    cautionLevel: "medium",
    cautionNote: "Redirect from fatalism to God's sovereign care and plan.",
    scripturalContext: "Psalm 31:15 - 'My times are in your hands.'"
  },
  // Additional Egyptian Deities
  {
    id: "nephthys-deity",
    name: "Nephthys",
    category: "deity",
    description: "Egyptian goddess of mourning, night, and service. Sister of Isis and Osiris. Protector of the dead.",
    christianPerspective: "Mourning is biblical—Jesus wept. Nephthys as a comforter of the bereaved echoes the Holy Spirit as Comforter. Caring for the grieving is a Christian calling.",
    cautionLevel: "low",
    scripturalContext: "Matthew 5:4 - 'Blessed are those who mourn, for they will be comforted.'"
  },
  {
    id: "sobek-deity",
    name: "Sobek",
    category: "deity",
    description: "Egyptian crocodile god associated with the Nile, fertility, and military prowess. Symbol of pharaonic power.",
    christianPerspective: "Sobek represented the life-giving Nile. Water as life is deeply biblical—Jesus is living water. Strength and protection themes echo God as our fortress.",
    cautionLevel: "low",
    scripturalContext: "John 4:14 - 'The water I give them will become in them a spring of water welling up to eternal life.'"
  },
  {
    id: "hathor-deity",
    name: "Hathor",
    category: "deity",
    description: "Egyptian goddess of love, beauty, music, and motherhood. Often depicted with cow horns holding a sun disk.",
    christianPerspective: "Hathor represented joy, music, and maternal care—all biblical themes. Music in worship is extensively biblical. God's motherly care is expressed in Scripture.",
    cautionLevel: "low",
    scripturalContext: "Isaiah 66:13 - 'As a mother comforts her child, so will I comfort you.'"
  },
  {
    id: "khnum-deity",
    name: "Khnum",
    category: "deity",
    description: "Egyptian creator god depicted as a ram, believed to create humans on a potter's wheel.",
    christianPerspective: "The potter and clay imagery is thoroughly biblical. God as potter forming humanity appears in Genesis and throughout Scripture. This imagery points to the true Creator.",
    cautionLevel: "low",
    scripturalContext: "Isaiah 64:8 - 'We are the clay, you are the potter; we are all the work of your hand.'"
  },
  {
    id: "ptah-deity",
    name: "Ptah",
    category: "deity",
    description: "Egyptian god of craftsmen, architects, and creation. Patron of builders and artisans.",
    christianPerspective: "Craftsmanship as divine calling is biblical. Bezalel was Spirit-filled for building the tabernacle. Work and creativity honor God when done with excellence.",
    cautionLevel: "low",
    scripturalContext: "Colossians 3:23 - 'Whatever you do, work at it with all your heart, as working for the Lord.'"
  },
  {
    id: "nut-deity",
    name: "Nut",
    category: "deity",
    description: "Egyptian sky goddess often depicted arching over the earth. Mother of Osiris, Isis, Set, and Nephthys.",
    christianPerspective: "The heavens declare God's glory. Sky imagery representing divine covering and protection is biblical. God stretches out the heavens like a tent.",
    cautionLevel: "low",
    scripturalContext: "Psalm 19:1 - 'The heavens declare the glory of God; the skies proclaim the work of his hands.'"
  },
  {
    id: "geb-deity",
    name: "Geb",
    category: "deity",
    description: "Egyptian god of the earth, vegetation, and fertility. Depicted with green skin.",
    christianPerspective: "Earth and its fertility are God's creation and gift. The concept of the earth producing abundantly for humanity is thoroughly biblical.",
    cautionLevel: "low",
    scripturalContext: "Genesis 1:11 - 'Let the land produce vegetation: seed-bearing plants and trees.'"
  },
  {
    id: "set-deity",
    name: "Set (Seth)",
    category: "deity",
    description: "Egyptian god of chaos, storms, and the desert. Complex figure representing both destruction and protection.",
    christianPerspective: "Storms and chaos are under God's control. Jesus calmed the storm. God uses even chaos for His purposes. Order from chaos is the creation narrative.",
    cautionLevel: "medium",
    cautionNote: "Emphasize God's sovereignty over chaos rather than celebrating disorder.",
    scripturalContext: "Mark 4:39 - 'He got up, rebuked the wind and said to the waves, \"Quiet! Be still!\"'"
  },
  {
    id: "bes-deity",
    name: "Bes",
    category: "deity",
    description: "Egyptian dwarf god protector of households, children, and mothers. Associated with joy and music.",
    christianPerspective: "Protection of the vulnerable—especially children and mothers—is deeply biblical. Joy and celebration in the home honor God. Domestic protection is a godly concern.",
    cautionLevel: "low",
    scripturalContext: "Psalm 127:3 - 'Children are a heritage from the LORD, offspring a reward from him.'"
  },
  {
    id: "atum-deity",
    name: "Atum",
    category: "deity",
    description: "Egyptian creator god of Heliopolis. Self-created and father of the gods. Associated with the setting sun.",
    christianPerspective: "Atum as self-existent creator echoes, imperfectly, the true Creator who is self-existent and eternal. 'I AM WHO I AM' declares God's self-existence.",
    cautionLevel: "medium",
    cautionNote: "Use as a conversation starter about the true eternal Creator.",
    scripturalContext: "Exodus 3:14 - 'God said to Moses, \"I AM WHO I AM.\"'"
  },
  // Roman Additions (distinct from Greek equivalents)
  {
    id: "janus-deity",
    name: "Janus",
    category: "deity",
    description: "Roman god of beginnings, transitions, doorways, and endings. Two-faced, looking forward and backward. January is named for him.",
    christianPerspective: "January, our calendar month, comes from Janus. Christians use this calendar without issue. Transitions and new beginnings are celebrated throughout Scripture.",
    cautionLevel: "low",
    scripturalContext: "Lamentations 3:22-23 - 'His mercies are new every morning.'"
  },
  {
    id: "vesta-deity",
    name: "Vesta",
    category: "deity",
    description: "Roman goddess of hearth, home, and family. The Vestal Virgins kept her eternal flame.",
    christianPerspective: "Hearth and home are central to biblical family values. The concept of an eternal flame was adopted by Christians (sanctuary lamps). Home as sanctuary is deeply biblical.",
    cautionLevel: "low",
    scripturalContext: "Deuteronomy 6:6-7 - Teaching faith in the home."
  },
  {
    id: "fortuna-deity",
    name: "Fortuna",
    category: "deity",
    description: "Roman goddess of fortune and luck. Often depicted with a wheel and cornucopia.",
    christianPerspective: "While Christians don't believe in luck but in God's providence, the concept of blessing and provision is biblical. Fortune imagery often represents success and blessing.",
    cautionLevel: "medium",
    cautionNote: "Redirect discussions of 'luck' to God's providence and blessing.",
    scripturalContext: "Jeremiah 29:11 - 'Plans to prosper you and not to harm you.'"
  },
  {
    id: "victoria-deity",
    name: "Victoria (Nike)",
    category: "deity",
    description: "Roman goddess of victory. Greek equivalent: Nike. The Nike swoosh comes from her wing.",
    christianPerspective: "Victory is a major biblical theme. 'In all these things we are more than conquerors.' Christians wear Nike shoes without spiritual concern. Victory imagery points to Christ's triumph.",
    cautionLevel: "low",
    scripturalContext: "Romans 8:37 - 'We are more than conquerors through him who loved us.'"
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
