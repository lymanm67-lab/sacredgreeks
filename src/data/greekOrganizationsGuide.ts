export type OrganizationCategory = 
  | "divine-nine" 
  | "multicultural" 
  | "professional" 
  | "leadership-honor" 
  | "service-band" 
  | "social" 
  | "masonic-fraternal" 
  | "christian" 
  | "lgbtq";

export interface GreekOrganization {
  id: string;
  name: string;
  type: "fraternity" | "sorority" | "co-ed" | "order" | "honor-society";
  council: "NPHC" | "NPC" | "IFC" | "NAPA" | "NALFO" | "MGC" | "Jewish" | "Professional" | "Honor" | "Service" | "Christian" | "LGBTQ" | "Masonic";
  category: OrganizationCategory;
  colors?: string;
  founded?: string;
  motto?: string;
  symbol?: string;
  description: string;
  notableMembers?: string[];
  christianPerspective: string;
  biblicalParallels: string[];
  scriptureReferences: { ref: string; text?: string }[];
}

export const organizationCategories = [
  { id: "all", label: "All" },
  { id: "divine-nine", label: "Divine Nine" },
  { id: "multicultural", label: "Multicultural" },
  { id: "professional", label: "Professional" },
  { id: "leadership-honor", label: "Leadership & Honor" },
  { id: "service-band", label: "Service & Band" },
  { id: "social", label: "Social Fellowships" },
  { id: "masonic-fraternal", label: "Masonic & Fraternal" },
  { id: "christian", label: "Christian" },
  { id: "lgbtq", label: "LGBTQ Councils" },
];

export const divineNineOrganizations: GreekOrganization[] = [
  {
    id: "sigma-pi-phi",
    name: "Sigma Pi Phi Fraternity (The Boulé)",
    type: "fraternity",
    council: "NPHC",
    category: "divine-nine",
    colors: "Blue & White",
    founded: "1904",
    symbol: "Sphinx",
    motto: "Kindred Spirits of Like Attainments",
    description: "The oldest African American Greek-letter organization, founded two years before Alpha Phi Alpha. A professional fraternity for accomplished African American men in business, medicine, law, and academia.",
    notableMembers: ["W.E.B. Du Bois", "Martin Luther King Jr.", "John Lewis", "Barack Obama"],
    christianPerspective: "The Boulé's emphasis on 'kindred spirits of like attainments' reflects the biblical principle of iron sharpening iron and the value of wise counsel among accomplished believers.",
    biblicalParallels: [
      "Iron sharpens iron (Proverbs 27:17)",
      "Walk with the wise and become wise"
    ],
    scriptureReferences: [
      { ref: "Proverbs 27:17", text: "As iron sharpens iron, so one person sharpens another." },
      { ref: "Proverbs 13:20", text: "Walk with the wise and become wise." },
      { ref: "Ecclesiastes 4:9-10" }
    ]
  },
  {
    id: "alpha-phi-alpha",
    name: "Alpha Phi Alpha Fraternity, Inc.",
    type: "fraternity",
    council: "NPHC",
    category: "divine-nine",
    colors: "Black & Old Gold",
    founded: "1906",
    symbol: "Sphinx",
    motto: "First of All, Servants of All, We Shall Transcend All",
    description: "The first intercollegiate Greek-letter fraternity established for African Americans.",
    notableMembers: ["Martin Luther King Jr.", "Thurgood Marshall", "Jesse Owens"],
    christianPerspective: "The servant leadership emphasized by Alpha Phi Alpha reflects Christ's teaching that the greatest among us must be servants. Their commitment to being 'first' in service mirrors the call to humble leadership.",
    biblicalParallels: [
      "Jesus washing disciples' feet as model of servant leadership",
      "The call to serve others before self"
    ],
    scriptureReferences: [
      { ref: "Mark 10:44", text: "Whoever wants to be first must be slave of all." },
      { ref: "Matthew 23:11", text: "The greatest among you will be your servant." },
      { ref: "Philippians 2:3-4" }
    ]
  },
  {
    id: "alpha-kappa-alpha",
    name: "Alpha Kappa Alpha Sorority, Inc.",
    type: "sorority",
    council: "NPHC",
    category: "divine-nine",
    colors: "Salmon Pink & Apple Green",
    founded: "1908",
    symbol: "Ivy Leaf",
    motto: "By Culture and By Merit",
    description: "The first Greek-letter organization established by African American college women.",
    notableMembers: ["Kamala Harris", "Toni Morrison", "Coretta Scott King"],
    christianPerspective: "AKA's focus on 'culture and merit' reflects biblical values of excellence and refinement. The Proverbs 31 woman is praised for her wisdom, work ethic, and noble character.",
    biblicalParallels: [
      "The Proverbs 31 woman of noble character",
      "Excellence as worship unto God"
    ],
    scriptureReferences: [
      { ref: "Proverbs 31:10", text: "A wife of noble character who can find? She is worth far more than rubies." },
      { ref: "Proverbs 31:26", text: "She speaks with wisdom, and faithful instruction is on her tongue." },
      { ref: "Colossians 3:23-24" }
    ]
  },
  {
    id: "kappa-alpha-psi",
    name: "Kappa Alpha Psi Fraternity, Inc.",
    type: "fraternity",
    council: "NPHC",
    category: "divine-nine",
    colors: "Crimson & Cream",
    founded: "1911",
    symbol: "Diamond",
    motto: "Achievement in Every Field of Human Endeavor",
    description: "Founded on the principles of achievement through a strong bond of brotherhood.",
    notableMembers: ["John Singleton", "Cedric the Entertainer", "Bill Russell"],
    christianPerspective: "The pursuit of achievement in every field aligns with the biblical call to do all things as unto the Lord, working with excellence as a form of worship and witness.",
    biblicalParallels: [
      "Colossians 3:23 - Whatever you do, work at it with all your heart",
      "Using God-given talents to their fullest potential"
    ],
    scriptureReferences: [
      { ref: "Colossians 3:23-24", text: "Whatever you do, work at it with all your heart, as working for the Lord." },
      { ref: "Matthew 25:14-30" },
      { ref: "Ecclesiastes 9:10" }
    ]
  },
  {
    id: "omega-psi-phi",
    name: "Omega Psi Phi Fraternity, Inc.",
    type: "fraternity",
    council: "NPHC",
    category: "divine-nine",
    colors: "Royal Purple & Old Gold",
    founded: "1911",
    symbol: "Lamp (Friendship, Courage)",
    motto: "Friendship is Essential to the Soul",
    description: "The first fraternity founded at a historically black university.",
    notableMembers: ["Michael Jordan", "Steve Harvey", "Jesse Jackson", "Rickey Smiley"],
    christianPerspective: "The emphasis on friendship as essential to the soul echoes the biblical importance of fellowship and community. Iron sharpening iron reflects their brotherhood principles.",
    biblicalParallels: [
      "Proverbs 27:17 - Iron sharpens iron",
      "Jonathan and David's covenant friendship"
    ],
    scriptureReferences: [
      { ref: "Proverbs 27:17", text: "As iron sharpens iron, so one person sharpens another." },
      { ref: "Ecclesiastes 4:9-12" },
      { ref: "John 15:13", text: "Greater love has no one than this: to lay down one's life for one's friends." }
    ]
  },
  {
    id: "delta-sigma-theta",
    name: "Delta Sigma Theta Sorority, Inc.",
    type: "sorority",
    council: "NPHC",
    category: "divine-nine",
    colors: "Crimson & Cream",
    founded: "1913",
    symbol: "Pyramid, Fortitude",
    motto: "Intelligence is the Torch of Wisdom",
    description: "Committed to public service with an emphasis on the African American community.",
    notableMembers: ["Mary McLeod Bethune", "Shirley Chisholm", "Ruby Dee"],
    christianPerspective: "Delta's focus on wisdom as a guiding torch reflects Proverbs' celebration of wisdom as 'more precious than rubies.' Their commitment to political and community uplift mirrors prophetic calls for justice.",
    biblicalParallels: [
      "Proverbs celebrates wisdom as life's guiding light",
      "Prophetic tradition of speaking for justice"
    ],
    scriptureReferences: [
      { ref: "Proverbs 3:13-15", text: "Blessed are those who find wisdom... She is more precious than rubies." },
      { ref: "Micah 6:8", text: "Act justly, love mercy, walk humbly with your God." },
      { ref: "Isaiah 1:17" }
    ]
  },
  {
    id: "phi-beta-sigma",
    name: "Phi Beta Sigma Fraternity, Inc.",
    type: "fraternity",
    council: "NPHC",
    category: "divine-nine",
    colors: "Royal Blue & Pure White",
    founded: "1914",
    symbol: "Dove, Crescent",
    motto: "Culture For Service and Service For Humanity",
    description: "The only fraternity to establish a sister sorority, Zeta Phi Beta.",
    notableMembers: ["Huey P. Newton", "George Washington Carver", "James Weldon Johnson"],
    christianPerspective: "The dual focus on culture and service reflects the call to be salt and light in the world, using education and refinement to serve others rather than self.",
    biblicalParallels: [
      "Being salt and light in the world",
      "Using knowledge to serve humanity"
    ],
    scriptureReferences: [
      { ref: "Matthew 5:13-16", text: "You are the light of the world... let your light shine before others." },
      { ref: "Galatians 5:13" },
      { ref: "1 Peter 4:10" }
    ]
  },
  {
    id: "zeta-phi-beta",
    name: "Zeta Phi Beta Sorority, Inc.",
    type: "sorority",
    council: "NPHC",
    category: "divine-nine",
    colors: "Royal Blue & White",
    founded: "1920",
    symbol: "Dove, White Rose",
    motto: "A Community-Conscious, Action-Oriented Organization",
    description: "The first sorority to be constitutionally bound to a fraternity.",
    notableMembers: ["Zora Neale Hurston", "Dionne Warwick", "Sheryl Underwood"],
    christianPerspective: "Zeta's community-conscious, action-oriented focus embodies James 2:17 - faith without works is dead. Their emphasis on deeds over words reflects Christ's teaching to be doers of the Word.",
    biblicalParallels: [
      "Faith demonstrated through action",
      "Being doers of the Word, not hearers only"
    ],
    scriptureReferences: [
      { ref: "James 2:17", text: "Faith by itself, if it is not accompanied by action, is dead." },
      { ref: "James 1:22", text: "Do not merely listen to the word... Do what it says." },
      { ref: "Matthew 25:35-40" }
    ]
  },
  {
    id: "sigma-gamma-rho",
    name: "Sigma Gamma Rho Sorority, Inc.",
    type: "sorority",
    council: "NPHC",
    category: "divine-nine",
    colors: "Royal Blue & Gold",
    founded: "1922",
    symbol: "Poodle",
    motto: "Greater Service, Greater Progress",
    description: "Founded by seven educators at Butler University in Indianapolis.",
    notableMembers: ["Hattie McDaniel", "MC Lyte", "Debbie Allen"],
    christianPerspective: "Founded by educators, Sigma Gamma Rho's mission to enhance life through service reflects the teaching ministry of Christ and the biblical call to train up children in wisdom.",
    biblicalParallels: [
      "The teaching ministry of Christ",
      "Training up children in wisdom"
    ],
    scriptureReferences: [
      { ref: "Proverbs 22:6", text: "Train up a child in the way he should go." },
      { ref: "Matthew 28:19-20", text: "Go and make disciples of all nations, teaching them..." },
      { ref: "2 Timothy 2:2" }
    ]
  },
  {
    id: "iota-phi-theta",
    name: "Iota Phi Theta Fraternity, Inc.",
    type: "fraternity",
    council: "NPHC",
    category: "divine-nine",
    colors: "Charcoal Brown & Gilded Gold",
    founded: "1963",
    symbol: "Centaur",
    motto: "Building a Tradition, Not Resting Upon One",
    description: "The newest member of the Divine Nine, emphasizing scholarship and community service.",
    notableMembers: ["Terrence J", "David Banner"],
    christianPerspective: "The commitment to building rather than resting reflects the biblical call to press forward, not being satisfied with past achievements but continuing to grow in faith and service.",
    biblicalParallels: [
      "Philippians 3:13-14 - Pressing toward the goal",
      "Building on a solid foundation"
    ],
    scriptureReferences: [
      { ref: "Philippians 3:13-14", text: "Forgetting what is behind and straining toward what is ahead, I press on toward the goal." },
      { ref: "1 Corinthians 3:10-11" },
      { ref: "Hebrews 6:1" }
    ]
  }
];

export const serviceBandOrganizations: GreekOrganization[] = [
  {
    id: "alpha-phi-omega",
    name: "Alpha Phi Omega (APO)",
    type: "co-ed",
    council: "Service",
    category: "service-band",
    colors: "Blue & Gold",
    founded: "1925",
    symbol: "Torch",
    motto: "Be a Leader, Be a Friend, Be of Service",
    description: "The largest co-ed service fraternity in the nation, based on the principles of leadership, friendship, and service. Open to all genders.",
    notableMembers: ["Bill Clinton", "Walter Cronkite", "Elena Kagan"],
    christianPerspective: "APO's three pillars of leadership, friendship, and service directly align with Christ's model of servant leadership and the call to love one another.",
    biblicalParallels: [
      "Servant leadership exemplified by Christ",
      "Greater love has no one than to lay down life for friends"
    ],
    scriptureReferences: [
      { ref: "Mark 10:43-45", text: "Whoever wants to become great among you must be your servant." },
      { ref: "John 15:13" },
      { ref: "Galatians 5:13" }
    ]
  },
  {
    id: "kappa-kappa-psi",
    name: "Kappa Kappa Psi (ΚΚΨ)",
    type: "fraternity",
    council: "Service",
    category: "service-band",
    colors: "Blue & White",
    founded: "1919",
    symbol: "Lyre",
    motto: "Strive for the Highest",
    description: "The national honorary fraternity for college band members, dedicated to the advancement of college and university bands.",
    notableMembers: ["College band directors nationwide"],
    christianPerspective: "The call to 'strive for the highest' reflects the Christian pursuit of excellence in all things as worship unto God.",
    biblicalParallels: [
      "Do everything as unto the Lord",
      "Make music to the Lord"
    ],
    scriptureReferences: [
      { ref: "Colossians 3:23-24" },
      { ref: "Psalm 150:3-5", text: "Praise him with the trumpet... with harp and lyre." },
      { ref: "Ephesians 5:19" }
    ]
  },
  {
    id: "tau-beta-sigma",
    name: "Tau Beta Sigma (TBΣ)",
    type: "sorority",
    council: "Service",
    category: "service-band",
    colors: "Blue & White",
    founded: "1946",
    symbol: "Lyre",
    motto: "For Greater Bands",
    description: "The national honorary sorority for college band members, committed to serving collegiate bands and promoting women in music.",
    notableMembers: ["Distinguished band directors and musicians"],
    christianPerspective: "The commitment to serving others through music reflects the biblical call to use our gifts for the edification of the community.",
    biblicalParallels: [
      "Using gifts for the body of Christ",
      "Serving one another in love"
    ],
    scriptureReferences: [
      { ref: "1 Peter 4:10" },
      { ref: "1 Corinthians 12:7" },
      { ref: "Psalm 33:3" }
    ]
  },
  {
    id: "phi-mu-alpha-sinfonia",
    name: "Phi Mu Alpha Sinfonia",
    type: "fraternity",
    council: "Service",
    category: "service-band",
    colors: "Red & Black",
    founded: "1898",
    symbol: "Sinfonian Seal",
    motto: "For the development of the best and truest fraternal spirit",
    description: "The oldest and largest secret national fraternal society in music. Dedicated to advancing music in America.",
    notableMembers: ["Sam Cooke", "Duke Ellington", "Leonard Bernstein"],
    christianPerspective: "The dedication to advancing music reflects the biblical tradition of worship through song and the power of music to glorify God.",
    biblicalParallels: [
      "David's Psalms as worship",
      "Sing to the Lord a new song"
    ],
    scriptureReferences: [
      { ref: "Psalm 96:1", text: "Sing to the Lord a new song." },
      { ref: "Colossians 3:16" },
      { ref: "2 Chronicles 5:13" }
    ]
  },
  {
    id: "sigma-alpha-iota",
    name: "Sigma Alpha Iota (ΣΑΙ)",
    type: "sorority",
    council: "Service",
    category: "service-band",
    colors: "Crimson & White",
    founded: "1903",
    symbol: "Pansy, Red Rose",
    motto: "Vita brevis, ars longa (Life is short, art is long)",
    description: "An international music fraternity for women, dedicated to encouraging, nurturing, and supporting the art of music.",
    notableMembers: ["Leontyne Price", "Sarah Vaughan"],
    christianPerspective: "The motto 'Life is short, art is long' reflects the eternal nature of beauty and creativity that comes from God, the ultimate Creator.",
    biblicalParallels: [
      "Created in the image of the Creator",
      "Beauty that endures"
    ],
    scriptureReferences: [
      { ref: "Genesis 1:27" },
      { ref: "Ecclesiastes 3:11", text: "He has made everything beautiful in its time." },
      { ref: "Psalm 27:4" }
    ]
  },
  {
    id: "gamma-sigma-sigma",
    name: "Gamma Sigma Sigma (ΓΣΣ)",
    type: "sorority",
    council: "Service",
    category: "service-band",
    colors: "Maroon & White",
    founded: "1952",
    symbol: "Sailboat",
    motto: "Unity in Service",
    description: "A national service sorority dedicated to developing friendship through service.",
    notableMembers: ["Community leaders nationwide"],
    christianPerspective: "The emphasis on unity in service reflects the biblical model of the church working together as one body for the common good.",
    biblicalParallels: [
      "One body, many members",
      "United in purpose"
    ],
    scriptureReferences: [
      { ref: "1 Corinthians 12:12" },
      { ref: "Ephesians 4:3", text: "Make every effort to keep the unity of the Spirit through the bond of peace." },
      { ref: "Philippians 2:2" }
    ]
  }
];

export const socialFellowships: GreekOrganization[] = [
  {
    id: "groove-phi-groove",
    name: "Groove Phi Groove Social Fellowship, Inc.",
    type: "fraternity",
    council: "MGC",
    category: "social",
    colors: "Black & White",
    founded: "1962",
    symbol: "Afro Pick, Fist",
    motto: "Dedicated to Our Culture and the Community",
    description: "A social fellowship organization founded at Morgan State University, emphasizing African American culture, brotherhood, and community service.",
    notableMembers: ["Community activists and leaders"],
    christianPerspective: "The dedication to culture and community reflects the biblical call to love your neighbor and preserve the heritage and identity given by God.",
    biblicalParallels: [
      "Love your neighbor as yourself",
      "Honoring cultural heritage"
    ],
    scriptureReferences: [
      { ref: "Mark 12:31" },
      { ref: "Proverbs 22:28" },
      { ref: "Acts 17:26" }
    ]
  },
  {
    id: "swing-phi-swing",
    name: "Swing Phi Swing Social Fellowship, Inc.",
    type: "sorority",
    council: "MGC",
    category: "social",
    colors: "Black & White",
    founded: "1969",
    symbol: "Swan",
    motto: "Dedicated to the Finer Womanhood",
    description: "The sister organization to Groove Phi Groove, founded at Winston-Salem State University, emphasizing sisterhood, culture, and community service.",
    notableMembers: ["Community leaders and activists"],
    christianPerspective: "The pursuit of 'finer womanhood' aligns with the Proverbs 31 ideal of a woman of noble character.",
    biblicalParallels: [
      "The Proverbs 31 woman",
      "Excellence in character"
    ],
    scriptureReferences: [
      { ref: "Proverbs 31:10-31" },
      { ref: "1 Peter 3:3-4" },
      { ref: "Titus 2:3-5" }
    ]
  },
  {
    id: "malik-fraternity",
    name: "Malik Fraternity, Inc.",
    type: "fraternity",
    council: "MGC",
    category: "social",
    colors: "Black & Gold",
    founded: "1977",
    symbol: "Sphinx",
    motto: "Making A Life-Long Impression of Knowledge",
    description: "A social fellowship founded at Barber-Scotia College, dedicated to brotherhood, scholarship, and community involvement.",
    notableMembers: ["Community leaders"],
    christianPerspective: "The emphasis on lifelong knowledge reflects the biblical call to grow in wisdom and understanding throughout life.",
    biblicalParallels: [
      "Growing in wisdom and stature",
      "Knowledge as a lifelong pursuit"
    ],
    scriptureReferences: [
      { ref: "Proverbs 4:7", text: "The beginning of wisdom is this: Get wisdom." },
      { ref: "Luke 2:52" },
      { ref: "2 Peter 3:18" }
    ]
  },
  {
    id: "pershing-rifles",
    name: "Pershing Rifles",
    type: "co-ed",
    council: "Service",
    category: "social",
    colors: "Blue & White",
    founded: "1894",
    symbol: "Rifle, Shield",
    motto: "Let us be ready and exert ourselves",
    description: "A national military fraternity and sorority for college ROTC students, founded by General John J. Pershing at the University of Nebraska.",
    notableMembers: ["Colin Powell", "General John J. Pershing"],
    christianPerspective: "The call to readiness and exertion reflects the biblical call to be vigilant and prepared for spiritual battle.",
    biblicalParallels: [
      "Put on the full armor of God",
      "Be sober, be vigilant"
    ],
    scriptureReferences: [
      { ref: "Ephesians 6:11-18" },
      { ref: "1 Peter 5:8" },
      { ref: "2 Timothy 2:3-4" }
    ]
  }
];

export const christianGreekOrganizations: GreekOrganization[] = [
  {
    id: "beta-upsilon-chi",
    name: "Beta Upsilon Chi (BYX)",
    type: "fraternity",
    council: "Christian",
    category: "christian",
    colors: "Maroon & Gold",
    founded: "1985",
    symbol: "Cross, Shield",
    motto: "Brothers Under Christ",
    description: "A national Christian fraternity focused on developing men of faith, integrity, and character through brotherhood.",
    notableMembers: ["Christian leaders across campuses"],
    christianPerspective: "BYX explicitly centers on Christ, developing men to be brothers under Christ's lordship, reflecting the biblical model of Christian brotherhood.",
    biblicalParallels: [
      "Brothers in Christ",
      "Iron sharpening iron"
    ],
    scriptureReferences: [
      { ref: "Hebrews 2:11", text: "He is not ashamed to call them brothers and sisters." },
      { ref: "Proverbs 27:17" },
      { ref: "1 John 1:7" }
    ]
  },
  {
    id: "alpha-delta-chi",
    name: "Alpha Delta Chi (ADX)",
    type: "sorority",
    council: "Christian",
    category: "christian",
    colors: "Purple & Gold",
    founded: "1925",
    symbol: "Cross",
    motto: "Seeking His Kingdom First",
    description: "A Christian sorority focused on developing women of faith and encouraging Christian sisterhood on college campuses.",
    notableMembers: ["Christian women leaders"],
    christianPerspective: "ADX's motto directly quotes Matthew 6:33, centering on seeking God's kingdom as the primary pursuit of life.",
    biblicalParallels: [
      "Seek first the kingdom of God",
      "Sisterhood in Christ"
    ],
    scriptureReferences: [
      { ref: "Matthew 6:33", text: "But seek first his kingdom and his righteousness." },
      { ref: "Colossians 3:1-2" },
      { ref: "Philippians 3:14" }
    ]
  },
  {
    id: "sigma-phi-lambda",
    name: "Sigma Phi Lambda (ΣΦΛ)",
    type: "sorority",
    council: "Christian",
    category: "christian",
    colors: "Navy Blue & Gold",
    founded: "1988",
    symbol: "Cross, Heart",
    motto: "Sisters for the Lord",
    description: "A Christian sorority committed to developing godly women and promoting Christian sisterhood.",
    notableMembers: ["Christian women on campuses nationwide"],
    christianPerspective: "Sigma Phi Lambda's explicit focus on being 'Sisters for the Lord' reflects the New Testament model of women supporting one another in faith.",
    biblicalParallels: [
      "Older women teaching younger women",
      "United in Christ"
    ],
    scriptureReferences: [
      { ref: "Titus 2:3-5" },
      { ref: "Romans 16:1-2" },
      { ref: "Philippians 4:3" }
    ]
  },
  {
    id: "kappa-phi",
    name: "Kappa Phi (ΚΦ)",
    type: "sorority",
    council: "Christian",
    category: "christian",
    colors: "Blue & Gold",
    founded: "1916",
    symbol: "Cross",
    motto: "Faith, Fellowship, Service",
    description: "One of the oldest Christian sororities, focused on developing women of faith through Methodist traditions.",
    notableMembers: ["Christian women leaders"],
    christianPerspective: "Kappa Phi's three-fold focus on faith, fellowship, and service reflects the essence of Christian community life.",
    biblicalParallels: [
      "Faith, hope, and love",
      "Fellowship of believers"
    ],
    scriptureReferences: [
      { ref: "1 Corinthians 13:13" },
      { ref: "Acts 2:42", text: "They devoted themselves to the apostles' teaching and to fellowship." },
      { ref: "Galatians 5:13" }
    ]
  }
];

export const masonicFraternalOrganizations: GreekOrganization[] = [
  {
    id: "freemasonry",
    name: "Freemasonry (Blue Lodge)",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Blue & Gold",
    founded: "1717",
    symbol: "Square and Compass",
    motto: "Brotherly Love, Relief, and Truth",
    description: "The foundational degrees of Masonry (Entered Apprentice, Fellowcraft, Master Mason). The Blue Lodge is the core of all Masonic organizations worldwide.",
    notableMembers: ["George Washington", "Benjamin Franklin", "Duke Ellington"],
    christianPerspective: "While Freemasonry contains moral teachings, Christians should carefully examine its religious syncretism and secret oaths against biblical standards of exclusive devotion to Christ.",
    biblicalParallels: [
      "Test all things, hold fast what is good",
      "You shall have no other gods before Me"
    ],
    scriptureReferences: [
      { ref: "1 Thessalonians 5:21" },
      { ref: "Exodus 20:3" },
      { ref: "James 5:12" }
    ]
  },
  {
    id: "prince-hall-freemasonry",
    name: "Prince Hall Freemasonry",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Blue & Gold",
    founded: "1784",
    symbol: "Square and Compass",
    motto: "Brotherly Love, Relief, and Truth",
    description: "The oldest and largest primarily African American Masonic organization, founded by Prince Hall. Emphasizes moral development, charity, and brotherhood.",
    notableMembers: ["Thurgood Marshall", "Booker T. Washington", "W.E.B. Du Bois", "Jesse Jackson"],
    christianPerspective: "Prince Hall Masonry emerged from the African American struggle for dignity and equality, reflecting themes of liberation found in Scripture, though its religious practices require discernment.",
    biblicalParallels: [
      "Let my people go",
      "Justice and righteousness"
    ],
    scriptureReferences: [
      { ref: "Exodus 5:1" },
      { ref: "Amos 5:24" },
      { ref: "Micah 6:8" }
    ]
  },
  {
    id: "scottish-rite",
    name: "Scottish Rite (Ancient and Accepted)",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Black, White, Red & Gold",
    founded: "1801",
    symbol: "Double-Headed Eagle",
    motto: "Ordo Ab Chao (Order Out of Chaos)",
    description: "An appendant body of Freemasonry conferring degrees 4° through 32°, plus the honorary 33°. Emphasizes philosophical and moral teachings through dramatic degree work.",
    notableMembers: ["J. Edgar Hoover", "Harry S. Truman", "John Wayne"],
    christianPerspective: "The Scottish Rite's complex degree system and philosophical teachings require careful examination against Scripture's call for simple devotion to Christ.",
    biblicalParallels: [
      "Simplicity of devotion to Christ",
      "Beware of philosophy and empty deceit"
    ],
    scriptureReferences: [
      { ref: "2 Corinthians 11:3" },
      { ref: "Colossians 2:8" },
      { ref: "1 Corinthians 1:18-25" }
    ]
  },
  {
    id: "prince-hall-scottish-rite",
    name: "Prince Hall Scottish Rite",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Black, White, Red & Gold",
    founded: "1820",
    symbol: "Double-Headed Eagle",
    motto: "Ordo Ab Chao (Order Out of Chaos)",
    description: "The Scottish Rite degrees under Prince Hall affiliation, providing advanced Masonic education and philanthropy within the African American community.",
    notableMembers: ["African American Masonic scholars and leaders"],
    christianPerspective: "Like its counterpart, the Prince Hall Scottish Rite requires discernment, balancing appreciation for its charitable work with examination of its spiritual teachings.",
    biblicalParallels: [
      "Test the spirits",
      "By their fruits you shall know them"
    ],
    scriptureReferences: [
      { ref: "1 John 4:1" },
      { ref: "Matthew 7:16" },
      { ref: "Acts 17:11" }
    ]
  },
  {
    id: "york-rite",
    name: "York Rite",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Red, Purple & White",
    founded: "1797",
    symbol: "Triple Tau, Cross and Crown",
    motto: "Holiness to the Lord",
    description: "A collection of Masonic degrees including Royal Arch, Cryptic Council, and Knights Templar. Culminates in the Christian-focused Knights Templar orders.",
    notableMembers: ["Various national leaders and philanthropists"],
    christianPerspective: "The York Rite's Knights Templar requires Christian faith for membership, but Christians should examine whether its rituals align with biblical worship.",
    biblicalParallels: [
      "Worship in spirit and truth",
      "One Lord, one faith, one baptism"
    ],
    scriptureReferences: [
      { ref: "John 4:24" },
      { ref: "Ephesians 4:5" },
      { ref: "Deuteronomy 6:4-5" }
    ]
  },
  {
    id: "shriners",
    name: "Shriners International",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Red & Gold",
    founded: "1870",
    symbol: "Crescent, Scimitar, Star",
    motto: "Shriners Having Fun and Helping Kids",
    description: "Known for the red fez and philanthropy, Shriners operate 22 Shriners Hospitals for Children providing free medical care.",
    notableMembers: ["Gerald Ford", "Arnold Palmer", "John Wayne"],
    christianPerspective: "While Shriners' charitable work for children reflects Christ's love for the least of these, the organization's Islamic imagery and Masonic foundation require discernment.",
    biblicalParallels: [
      "Let the little children come to me",
      "Pure religion is caring for orphans"
    ],
    scriptureReferences: [
      { ref: "Matthew 19:14" },
      { ref: "James 1:27" },
      { ref: "Matthew 25:40" }
    ]
  },
  {
    id: "order-eastern-star",
    name: "Order of the Eastern Star",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Blue, Yellow, White, Green & Red",
    founded: "1850",
    symbol: "Five-Pointed Star",
    motto: "Fairest Among Thousands, Altogether Lovely",
    description: "A fraternal organization open to both men and women, associated with Freemasonry. Members must be related to a Master Mason.",
    notableMembers: ["Rosa Parks", "Coretta Scott King"],
    christianPerspective: "The Eastern Star uses biblical heroines but within a Masonic framework. Christians should examine whether its teachings align with Scripture's exclusive claims.",
    biblicalParallels: [
      "Women of faith in Scripture",
      "Testing teachings against the Word"
    ],
    scriptureReferences: [
      { ref: "Acts 17:11" },
      { ref: "Hebrews 11:31-35" },
      { ref: "2 Timothy 3:16-17" }
    ]
  },
  {
    id: "heroines-of-jericho",
    name: "The Heroines of Jericho",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "White & Purple",
    founded: "1874",
    symbol: "Crown, Sword",
    motto: "Faith, Hope, and Charity",
    description: "An auxiliary order to Prince Hall Masonry for wives and daughters of Prince Hall Masons, emphasizing Christian values and community service.",
    notableMembers: ["Community and church leaders"],
    christianPerspective: "The Heroines of Jericho draws on Rahab's story, a woman of faith mentioned in Hebrews 11. Christians can appreciate the charitable focus while examining the Masonic context.",
    biblicalParallels: [
      "Rahab's faith and courage",
      "Faith, hope, and love"
    ],
    scriptureReferences: [
      { ref: "Joshua 2:1-21" },
      { ref: "Hebrews 11:31" },
      { ref: "1 Corinthians 13:13" }
    ]
  },
  {
    id: "aeaonms",
    name: "Ancient Egyptian Arabic Order Nobles Mystic Shrine (AEAONMS)",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Red & Gold",
    founded: "1893",
    symbol: "Crescent and Star, Scimitar",
    motto: "We Never Sleep",
    description: "The Shriners affiliated with Prince Hall Masonry, known for philanthropy and their support of Shriners Hospitals for Children.",
    notableMembers: ["Prominent African American business and community leaders"],
    christianPerspective: "Like their mainstream counterpart, the AEAONMS demonstrates commendable charitable work while using Islamic imagery that requires Christian discernment.",
    biblicalParallels: [
      "Watch and pray",
      "Works of mercy and compassion"
    ],
    scriptureReferences: [
      { ref: "Mark 13:33" },
      { ref: "Matthew 25:35-40" },
      { ref: "James 2:15-17" }
    ]
  },
  {
    id: "daughters-of-isis",
    name: "Daughters of Isis",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Green & Gold",
    founded: "1910",
    symbol: "Sphinx, Pyramid",
    motto: "Charity, Truth, and Love",
    description: "The women's auxiliary to the AEAONMS (Shriners), dedicated to charitable work and supporting the Shriners' mission.",
    notableMembers: ["Community leaders and philanthropists"],
    christianPerspective: "While dedicated to charity, the Egyptian goddess imagery requires discernment. Christians can appreciate the charitable focus while examining spiritual foundations.",
    biblicalParallels: [
      "Love, truth, and charity",
      "No other gods before Me"
    ],
    scriptureReferences: [
      { ref: "1 Corinthians 13:13" },
      { ref: "Exodus 20:3" },
      { ref: "1 John 4:1" }
    ]
  },
  {
    id: "knights-of-pythias",
    name: "Knights of Pythias",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Blue, Yellow & Red",
    founded: "1864",
    symbol: "Shield, Sword, Helmet",
    motto: "Friendship, Charity, and Benevolence",
    description: "A fraternal organization founded on the principles of friendship, emphasizing brotherhood and charitable giving.",
    notableMembers: ["Nelson Mandela (Honorary)", "Louis Armstrong"],
    christianPerspective: "The Knights of Pythias' emphasis on friendship and charity reflects biblical values, though its ritual elements require examination.",
    biblicalParallels: [
      "A friend loves at all times",
      "Friendship of David and Jonathan"
    ],
    scriptureReferences: [
      { ref: "Proverbs 17:17" },
      { ref: "1 Samuel 18:1-4" },
      { ref: "John 15:13" }
    ]
  },
  {
    id: "ibpoew",
    name: "Improved Benevolent and Protective Order of Elks of the World (IBPOEW)",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Purple & White",
    founded: "1898",
    symbol: "Elk",
    motto: "The Best People on Earth",
    description: "An African American fraternal organization focused on charity, justice, and community service throughout the diaspora.",
    notableMembers: ["W.C. Handy", "Community leaders nationwide"],
    christianPerspective: "The Elks' commitment to charity and justice reflects prophetic biblical values of caring for the community.",
    biblicalParallels: [
      "Do justice, love mercy",
      "Care for the community"
    ],
    scriptureReferences: [
      { ref: "Micah 6:8" },
      { ref: "Isaiah 1:17" },
      { ref: "Amos 5:24" }
    ]
  },
  {
    id: "order-of-calanthe",
    name: "Order of Calanthe",
    type: "order",
    council: "Masonic",
    category: "masonic-fraternal",
    colors: "Red, White & Green",
    founded: "1883",
    symbol: "Heart, Shield",
    motto: "Fidelity, Harmony, and Love",
    description: "The women's auxiliary to the Knights of Pythias, dedicated to sisterhood and community service.",
    notableMembers: ["Women community leaders"],
    christianPerspective: "The focus on fidelity, harmony, and love reflects core Christian virtues of faithfulness and love for one another.",
    biblicalParallels: [
      "Be faithful unto death",
      "Live in harmony with one another"
    ],
    scriptureReferences: [
      { ref: "Revelation 2:10" },
      { ref: "Romans 12:16" },
      { ref: "1 John 4:7" }
    ]
  }
];

export const multiculturalOrganizations: GreekOrganization[] = [
  {
    id: "lambda-theta-alpha",
    name: "Lambda Theta Alpha Latin Sorority, Inc.",
    type: "sorority",
    council: "NALFO",
    category: "multicultural",
    colors: "Burgundy & Gray",
    founded: "1975",
    symbol: "Lady of the Lambda",
    motto: "Soy una mujer de tu temple (I am a woman of your strength)",
    description: "The first Latina sorority founded in the United States, at Kean University. Committed to cultural awareness and community service.",
    notableMembers: ["Latina leaders in politics, education, and business"],
    christianPerspective: "The emphasis on unity, love, and respect reflects the New Testament call for believers to love one another and maintain unity in the bond of peace.",
    biblicalParallels: [
      "Unity in sisterhood",
      "Love as foundation"
    ],
    scriptureReferences: [
      { ref: "Ephesians 4:3" },
      { ref: "John 13:34-35" },
      { ref: "1 Peter 3:8" }
    ]
  },
  {
    id: "lambda-theta-phi",
    name: "Lambda Theta Phi Latin Fraternity, Inc.",
    type: "fraternity",
    council: "NALFO",
    category: "multicultural",
    colors: "Brown & White",
    founded: "1975",
    symbol: "Conquistador",
    motto: "Chivalry Above Self",
    description: "The first Latino fraternity founded in the United States, at Kean University. Emphasizes Latino unity, cultural awareness, and academic excellence.",
    notableMembers: ["Latino community leaders"],
    christianPerspective: "The motto 'Chivalry Above Self' reflects Christ's teaching to put others first and serve with honor and integrity.",
    biblicalParallels: [
      "Serving others before self",
      "Defending the weak and vulnerable"
    ],
    scriptureReferences: [
      { ref: "Philippians 2:3-4" },
      { ref: "Micah 6:8" },
      { ref: "Proverbs 31:8-9" }
    ]
  },
  {
    id: "sigma-lambda-beta",
    name: "Sigma Lambda Beta International Fraternity, Inc.",
    type: "fraternity",
    council: "NALFO",
    category: "multicultural",
    colors: "Royal Purple & Pure White",
    founded: "1986",
    symbol: "Aztec Warrior",
    motto: "Opportunity for Wisdom, Wisdom for Culture",
    description: "A multicultural fraternity founded at the University of Iowa, emphasizing cultural diversity and brotherhood.",
    notableMembers: ["Latino and multicultural leaders"],
    christianPerspective: "The pursuit of wisdom for cultural benefit reflects the biblical call to use God-given wisdom to bless others.",
    biblicalParallels: [
      "Wisdom that benefits the community",
      "Cultural stewardship"
    ],
    scriptureReferences: [
      { ref: "Proverbs 4:7" },
      { ref: "James 3:17" },
      { ref: "Daniel 1:17" }
    ]
  },
  {
    id: "sigma-lambda-gamma",
    name: "Sigma Lambda Gamma National Sorority, Inc.",
    type: "sorority",
    council: "NALFO",
    category: "multicultural",
    colors: "Shocking Pink & Purple",
    founded: "1990",
    symbol: "Pretty Poodle",
    motto: "Culture is Pride and Pride is Success",
    description: "A multicultural sorority founded at the University of Iowa, promoting academics, community service, and cultural awareness.",
    notableMembers: ["Latina and multicultural women leaders"],
    christianPerspective: "Taking pride in cultural heritage reflects appreciation for how God created diverse peoples and cultures.",
    biblicalParallels: [
      "Every nation and tribe before God's throne",
      "Cultural diversity as God's design"
    ],
    scriptureReferences: [
      { ref: "Revelation 7:9" },
      { ref: "Acts 17:26" },
      { ref: "Genesis 12:3" }
    ]
  },
  {
    id: "lambda-phi-epsilon",
    name: "Lambda Phi Epsilon International Fraternity, Inc.",
    type: "fraternity",
    council: "NAPA",
    category: "multicultural",
    colors: "Royal Blue & White",
    founded: "1981",
    symbol: "Lion",
    motto: "Leaders Among Men",
    description: "The largest Asian-interest fraternity in North America, founded at UCLA. Promotes Asian-American awareness and community involvement.",
    notableMembers: ["Grant Imahara", "Asian-American leaders in tech and entertainment"],
    christianPerspective: "The lifelong commitment mirrors the Christian call to faithful discipleship, not just a momentary decision but a lifetime of walking in purpose.",
    biblicalParallels: [
      "Faithful unto the end",
      "Lifelong commitment to values"
    ],
    scriptureReferences: [
      { ref: "Matthew 24:13" },
      { ref: "Revelation 2:10" },
      { ref: "2 Timothy 4:7" }
    ]
  },
  {
    id: "alpha-kappa-delta-phi",
    name: "alpha Kappa Delta Phi International Sorority, Inc.",
    type: "sorority",
    council: "NAPA",
    category: "multicultural",
    colors: "Violet & White",
    founded: "1990",
    symbol: "Butterfly",
    motto: "Timeless Friendship Through Sisterhood",
    description: "The largest Asian-interest sorority, founded at UC Berkeley. Promotes sisterhood, scholarship, and Asian awareness.",
    notableMembers: ["Asian-American women leaders"],
    christianPerspective: "The four pillars of sisterhood, scholarship, leadership, and service align with the biblical model of developing godly character while serving others.",
    biblicalParallels: [
      "Developing godly character",
      "Servant leadership"
    ],
    scriptureReferences: [
      { ref: "Proverbs 31:26-27" },
      { ref: "Mark 10:45" },
      { ref: "1 Timothy 4:12" }
    ]
  },
  {
    id: "kappa-phi-lambda",
    name: "Kappa Phi Lambda Sorority, Inc.",
    type: "sorority",
    council: "NAPA",
    category: "multicultural",
    colors: "Red & Gold",
    founded: "1995",
    symbol: "Phoenix",
    motto: "Friendship, Sisterhood, Loyalty",
    description: "An Asian-interest sorority founded at Binghamton University, promoting Asian-American awareness and empowerment.",
    notableMembers: ["Asian-American community leaders"],
    christianPerspective: "The phoenix symbolizes rebirth and renewal, reflecting the Christian experience of new life in Christ.",
    biblicalParallels: [
      "New creation in Christ",
      "Rising from ashes to glory"
    ],
    scriptureReferences: [
      { ref: "2 Corinthians 5:17" },
      { ref: "Isaiah 61:3" },
      { ref: "Romans 6:4" }
    ]
  },
  {
    id: "delta-epsilon-psi",
    name: "Delta Epsilon Psi Fraternity, Inc.",
    type: "fraternity",
    council: "MGC",
    category: "multicultural",
    colors: "Orange & Black",
    founded: "1998",
    symbol: "Tiger",
    motto: "Brotherhood, Discipline, Commitment",
    description: "A South Asian-interest fraternity founded at the University of Texas at Austin, promoting South Asian culture and brotherhood.",
    notableMembers: ["South Asian-American professionals"],
    christianPerspective: "The emphasis on discipline and commitment reflects the biblical call to self-control and perseverance in faith.",
    biblicalParallels: [
      "Self-discipline in the faith",
      "Running the race with perseverance"
    ],
    scriptureReferences: [
      { ref: "1 Corinthians 9:24-27" },
      { ref: "Hebrews 12:1-2" },
      { ref: "2 Timothy 1:7" }
    ]
  },
  {
    id: "sigma-beta-rho",
    name: "Sigma Beta Rho Fraternity, Inc.",
    type: "fraternity",
    council: "MGC",
    category: "multicultural",
    colors: "Purple & White",
    founded: "1996",
    symbol: "Rhino",
    motto: "Culture, Service, Brotherhood",
    description: "A South Asian-interest fraternity founded at Penn State, emphasizing cultural awareness and service.",
    notableMembers: ["South Asian-American leaders"],
    christianPerspective: "The integration of culture, service, and brotherhood reflects the holistic Christian life of community, mission, and fellowship.",
    biblicalParallels: [
      "Fellowship, worship, and service",
      "One body, many members"
    ],
    scriptureReferences: [
      { ref: "Acts 2:42-47" },
      { ref: "1 Corinthians 12:12-27" },
      { ref: "Romans 12:4-5" }
    ]
  },
  {
    id: "kappa-delta-chi",
    name: "Kappa Delta Chi Sorority, Inc.",
    type: "sorority",
    council: "NALFO",
    category: "multicultural",
    colors: "Orange & White",
    founded: "1987",
    symbol: "Butterfly",
    motto: "Uniting Through Our Diversity",
    description: "A Latina-founded sorority at Texas Tech University, promoting unity, leadership, and cultural awareness.",
    notableMembers: ["Latina leaders in education and business"],
    christianPerspective: "Unity through diversity reflects God's design for the church, where many different people become one in Christ.",
    biblicalParallels: [
      "Neither Jew nor Greek, slave nor free",
      "Many parts, one body"
    ],
    scriptureReferences: [
      { ref: "Galatians 3:28" },
      { ref: "1 Corinthians 12:12" },
      { ref: "Ephesians 2:14" }
    ]
  },
  {
    id: "lambda-upsilon-lambda",
    name: "Lambda Upsilon Lambda Fraternity, Inc.",
    type: "fraternity",
    council: "NALFO",
    category: "multicultural",
    colors: "Red, Black & Green",
    founded: "1982",
    symbol: "Rising Sun, Spear",
    motto: "La Unidad Para Siempre (Unity Forever)",
    description: "A Latino fraternity founded at Cornell University, emphasizing Latino unity and social activism.",
    notableMembers: ["Latino activists and professionals"],
    christianPerspective: "The call for eternal unity reflects the biblical vision of the church united forever in Christ.",
    biblicalParallels: [
      "Unity in the body of Christ",
      "Love that never ends"
    ],
    scriptureReferences: [
      { ref: "John 17:21", text: "That all of them may be one, Father, just as you are in me and I am in you." },
      { ref: "1 Corinthians 13:8" },
      { ref: "Ephesians 4:3" }
    ]
  },
  {
    id: "alpha-epsilon-pi",
    name: "Alpha Epsilon Pi",
    type: "fraternity",
    council: "Jewish",
    category: "multicultural",
    founded: "1913 at New York University",
    description: "World's Jewish fraternity. Focuses on developing Jewish leaders through commitment to Jewish values.",
    christianPerspective: "AEPi's foundation in Jewish values connects directly to the Hebrew Scriptures shared by Christians. Their emphasis on community and charity aligns with biblical principles.",
    biblicalParallels: [
      "Love your neighbor as yourself (Leviticus 19:18)",
      "Act justly, love mercy, walk humbly"
    ],
    scriptureReferences: [
      { ref: "Leviticus 19:18" },
      { ref: "Micah 6:8" },
      { ref: "Proverbs 22:6" }
    ]
  }
];

export const professionalOrganizations: GreekOrganization[] = [
  {
    id: "chi-eta-phi",
    name: "Chi Eta Phi Sorority, Inc.",
    type: "sorority",
    council: "Professional",
    category: "professional",
    colors: "Red & White",
    founded: "1932",
    symbol: "Dove, Caduceus",
    motto: "Service for Humanity",
    description: "A professional sorority for registered nurses and nursing students, founded in Washington D.C. The first African American nursing sorority.",
    notableMembers: ["African American nursing leaders"],
    christianPerspective: "Nursing as 'service for humanity' reflects Christ's healing ministry and compassion for the sick.",
    biblicalParallels: [
      "Healing the sick as Christ did",
      "Bearing one another's burdens"
    ],
    scriptureReferences: [
      { ref: "Matthew 25:36", text: "I was sick and you looked after me." },
      { ref: "Galatians 6:2" },
      { ref: "Luke 10:33-34" }
    ]
  },
  {
    id: "eta-phi-beta",
    name: "Eta Phi Beta Sorority, Inc.",
    type: "sorority",
    council: "Professional",
    category: "professional",
    colors: "Hunter Green & Gold",
    founded: "1942",
    symbol: "Gazelle",
    motto: "Business is our Business",
    description: "A professional sorority for African American businesswomen, founded in Detroit. Promotes business education and entrepreneurship.",
    notableMembers: ["African American businesswomen leaders"],
    christianPerspective: "Excellence in business reflects the Proverbs 31 woman who conducts profitable business with wisdom and integrity.",
    biblicalParallels: [
      "The Proverbs 31 businesswoman",
      "Faithful stewardship of resources"
    ],
    scriptureReferences: [
      { ref: "Proverbs 31:16-18" },
      { ref: "Matthew 25:14-30" },
      { ref: "Proverbs 22:29" }
    ]
  },
  {
    id: "alpha-kappa-psi",
    name: "Alpha Kappa Psi",
    type: "co-ed",
    council: "Professional",
    category: "professional",
    colors: "Navy Blue & Gold",
    founded: "1904",
    symbol: "Key",
    motto: "Shaping People, Shaping Business",
    description: "The oldest and largest professional business fraternity, co-ed. Develops principled business leaders.",
    notableMembers: ["Ronald Reagan", "Business executives nationwide"],
    christianPerspective: "The focus on shaping principled leaders aligns with biblical values of integrity and ethical business practices.",
    biblicalParallels: [
      "Integrity in business dealings",
      "The righteous man walks in integrity"
    ],
    scriptureReferences: [
      { ref: "Proverbs 11:1" },
      { ref: "Proverbs 20:7" },
      { ref: "Micah 6:8" }
    ]
  },
  {
    id: "delta-sigma-pi",
    name: "Delta Sigma Pi",
    type: "co-ed",
    council: "Professional",
    category: "professional",
    colors: "Royal Purple & Gold",
    founded: "1907",
    symbol: "Sphinx",
    motto: "Through Commerce and Fraternity to a Greater World",
    description: "A professional co-ed business fraternity founded at NYU, promoting commerce and professional development.",
    notableMembers: ["Business leaders and entrepreneurs"],
    christianPerspective: "The vision of commerce creating a greater world reflects the biblical call to be a blessing to all nations through ethical enterprise.",
    biblicalParallels: [
      "Being a blessing to all nations",
      "Honest commerce as service"
    ],
    scriptureReferences: [
      { ref: "Genesis 12:2-3" },
      { ref: "Proverbs 31:16" },
      { ref: "1 Thessalonians 4:11-12" }
    ]
  },
  {
    id: "phi-beta-lambda",
    name: "Phi Beta Lambda (FBLA-PBL)",
    type: "co-ed",
    council: "Professional",
    category: "professional",
    colors: "Blue & Gold",
    founded: "1942",
    symbol: "Torch",
    motto: "Service, Education, Progress",
    description: "A collegiate division of Future Business Leaders of America, developing business leaders through education and competition.",
    notableMembers: ["Business and educational leaders"],
    christianPerspective: "The pillars of service, education, and progress align with Christian values of serving others and growing in knowledge.",
    biblicalParallels: [
      "Growing in wisdom and knowledge",
      "Serving others with excellence"
    ],
    scriptureReferences: [
      { ref: "2 Peter 3:18" },
      { ref: "Proverbs 1:5" },
      { ref: "Colossians 3:23-24" }
    ]
  },
  {
    id: "phi-delta-epsilon",
    name: "Phi Delta Epsilon International Medical Fraternity",
    type: "co-ed",
    council: "Professional",
    category: "professional",
    colors: "Green & White",
    founded: "1904",
    symbol: "Staff of Asclepius",
    motto: "Facta Non Verba (Deeds Not Words)",
    description: "A co-ed international medical fraternity promoting scholarship, charity, and fellowship in medical education.",
    notableMembers: ["Physicians and medical researchers"],
    christianPerspective: "The motto 'Deeds Not Words' echoes James' teaching that faith without works is dead—living out medical calling through action.",
    biblicalParallels: [
      "Faith demonstrated through deeds",
      "Healing as Christ's ministry"
    ],
    scriptureReferences: [
      { ref: "James 2:17" },
      { ref: "Luke 9:2" },
      { ref: "Matthew 10:8" }
    ]
  },
  {
    id: "alpha-epsilon-delta",
    name: "Alpha Epsilon Delta",
    type: "honor-society",
    council: "Professional",
    category: "professional",
    colors: "Scarlet & White",
    founded: "1926",
    symbol: "Serpent Staff",
    motto: "A Scholarship Society for Pre-Medical Students",
    description: "The national pre-medical honor society, promoting excellence and leadership in pre-health professions.",
    notableMembers: ["Pre-medical students and physicians"],
    christianPerspective: "Excellence in medical preparation reflects the call to develop God-given abilities to serve others through healthcare.",
    biblicalParallels: [
      "Using talents to serve others",
      "Excellence as worship"
    ],
    scriptureReferences: [
      { ref: "Matthew 25:14-30" },
      { ref: "Colossians 3:23" },
      { ref: "Romans 12:6-8" }
    ]
  }
];

export const lgbtqOrganizations: GreekOrganization[] = [
  {
    id: "delta-lambda-phi",
    name: "Delta Lambda Phi National Social Fraternity",
    type: "fraternity",
    council: "LGBTQ",
    category: "lgbtq",
    colors: "Royal Purple & Kelly Green",
    founded: "1986",
    symbol: "Dual Triangle",
    motto: "To Lead by Example",
    description: "A national fraternity for gay, bisexual, transgender, and progressive men, founded in Washington D.C. Promotes dignity and respect.",
    notableMembers: ["LGBTQ+ leaders and activists"],
    christianPerspective: "While Christians hold diverse views on LGBTQ+ issues, all can agree on treating every person with dignity as image-bearers of God, regardless of orientation.",
    biblicalParallels: [
      "All created in God's image",
      "Love your neighbor as yourself"
    ],
    scriptureReferences: [
      { ref: "Genesis 1:27" },
      { ref: "Mark 12:31" },
      { ref: "1 Peter 2:17" }
    ]
  },
  {
    id: "gamma-rho-lambda",
    name: "Gamma Rho Lambda National Sorority",
    type: "sorority",
    council: "LGBTQ",
    category: "lgbtq",
    colors: "Royal Blue & White",
    founded: "2003",
    symbol: "Peacock",
    motto: "Unity Through Diversity",
    description: "A national sorority for LGBTQ+ women and allies, founded at Arizona State University. Promotes unity, acceptance, and community.",
    notableMembers: ["LGBTQ+ women leaders"],
    christianPerspective: "The call for unity through diversity reflects the biblical vision of diverse people coming together, though Christians differ on how this applies to LGBTQ+ identity.",
    biblicalParallels: [
      "Many parts, one body",
      "Treating all with dignity"
    ],
    scriptureReferences: [
      { ref: "1 Corinthians 12:12" },
      { ref: "Romans 12:10" },
      { ref: "James 2:1" }
    ]
  },
  {
    id: "sigma-phi-beta",
    name: "Sigma Phi Beta Fraternity",
    type: "fraternity",
    council: "LGBTQ",
    category: "lgbtq",
    colors: "Blue, White & Silver",
    founded: "2003",
    symbol: "Phoenix",
    motto: "Pride, Unity, Brotherhood",
    description: "A national fraternity for gay, bisexual, and progressive men, promoting brotherhood and community service.",
    notableMembers: ["LGBTQ+ community leaders"],
    christianPerspective: "The phoenix symbol of rebirth and the focus on service reflect values Christians can appreciate while navigating different perspectives on sexuality.",
    biblicalParallels: [
      "New life and transformation",
      "Serving the community"
    ],
    scriptureReferences: [
      { ref: "2 Corinthians 5:17" },
      { ref: "Galatians 5:13" },
      { ref: "Romans 13:10" }
    ]
  }
];

export const leadershipHonorOrganizations: GreekOrganization[] = [
  {
    id: "omicron-delta-kappa",
    name: "Omicron Delta Kappa (ODK)",
    type: "honor-society",
    council: "Honor",
    category: "leadership-honor",
    colors: "Light Blue, White & Black",
    founded: "1914",
    symbol: "Circle, Key",
    motto: "To Recognize and Develop Leaders",
    description: "The National Leadership Honor Society, recognizing exemplary character and leadership in five areas: scholarship, athletics, campus activities, journalism, and creative arts.",
    notableMembers: ["Bill Clinton", "Jimmy Carter", "Sandra Day O'Connor", "Colin Powell"],
    christianPerspective: "Developing leaders of character reflects the biblical model of raising up faithful leaders who serve with integrity.",
    biblicalParallels: [
      "Raising up leaders of character",
      "Leadership through service"
    ],
    scriptureReferences: [
      { ref: "1 Timothy 3:1-7" },
      { ref: "Exodus 18:21" },
      { ref: "2 Timothy 2:2" }
    ]
  },
  {
    id: "mortar-board",
    name: "Mortar Board National College Senior Honor Society",
    type: "honor-society",
    council: "Honor",
    category: "leadership-honor",
    colors: "Silver & Gold",
    founded: "1918",
    symbol: "Mortarboard Cap, Torch",
    motto: "Scholarship, Leadership, and Service",
    description: "A national honor society recognizing college seniors for distinguished ability and achievement in scholarship, leadership, and service.",
    notableMembers: ["Hillary Clinton", "Katie Couric", "Stephen Breyer"],
    christianPerspective: "The three pillars of scholarship, leadership, and service reflect the Christian call to love God with our minds and serve our neighbors.",
    biblicalParallels: [
      "Love God with all your mind",
      "Leading to serve"
    ],
    scriptureReferences: [
      { ref: "Matthew 22:37" },
      { ref: "Mark 10:43-45" },
      { ref: "Philippians 2:3-4" }
    ]
  },
  {
    id: "blue-key",
    name: "Blue Key Honor Society",
    type: "honor-society",
    council: "Honor",
    category: "leadership-honor",
    colors: "Blue & Gold",
    founded: "1924",
    symbol: "Key",
    motto: "Serving I Live",
    description: "A national honor fraternity recognizing students who combine scholarship with leadership and service to their campus and community.",
    notableMembers: ["University leaders and administrators"],
    christianPerspective: "The motto 'Serving I Live' echoes Christ's teaching that those who lose their lives in service find true life.",
    biblicalParallels: [
      "Whoever loses their life will find it",
      "Living to serve"
    ],
    scriptureReferences: [
      { ref: "Matthew 16:25" },
      { ref: "Galatians 2:20" },
      { ref: "John 12:24-26" }
    ]
  },
  {
    id: "order-of-omega",
    name: "Order of Omega",
    type: "honor-society",
    council: "Honor",
    category: "leadership-honor",
    colors: "Pearl White & Gold",
    founded: "1959",
    symbol: "Omega Symbol, Laurel",
    motto: "Recognizing Excellence in Greek Leadership",
    description: "A Greek honor society recognizing men and women who exemplify high standards in scholarship, leadership, and service within the Greek community.",
    notableMembers: ["Greek life leaders nationwide"],
    christianPerspective: "Excellence in Greek leadership can be a platform for Christian witness through exemplary character and service.",
    biblicalParallels: [
      "Being an example to believers",
      "Excellence in all things"
    ],
    scriptureReferences: [
      { ref: "1 Timothy 4:12" },
      { ref: "1 Corinthians 10:31" },
      { ref: "Colossians 3:17" }
    ]
  },
  {
    id: "gamma-sigma-alpha",
    name: "Gamma Sigma Alpha National Greek Academic Honor Society",
    type: "honor-society",
    council: "Honor",
    category: "leadership-honor",
    colors: "Maroon & Gold",
    founded: "1989",
    symbol: "Greek Letters",
    motto: "Academic Excellence in Greek Life",
    description: "An honor society recognizing academic excellence among fraternity and sorority members with a GPA of 3.5 or higher.",
    notableMembers: ["High-achieving Greek members"],
    christianPerspective: "Academic excellence honors God as we develop the minds He has given us to His glory.",
    biblicalParallels: [
      "Love God with all your mind",
      "Excellence as worship"
    ],
    scriptureReferences: [
      { ref: "Matthew 22:37" },
      { ref: "Proverbs 4:7" },
      { ref: "Romans 12:2" }
    ]
  },
  {
    id: "rho-lambda",
    name: "Rho Lambda National Sorority Leadership Recognition Society",
    type: "honor-society",
    council: "Honor",
    category: "leadership-honor",
    colors: "Black & Gold",
    founded: "1974",
    symbol: "Torch",
    motto: "Leadership Through Service",
    description: "A sorority leadership recognition society honoring women who have exhibited outstanding leadership and service in their sorority.",
    notableMembers: ["Sorority leaders nationwide"],
    christianPerspective: "Leadership through service reflects Christ's model of servant leadership, leading by serving others.",
    biblicalParallels: [
      "The greatest shall be servant of all",
      "Women of noble character"
    ],
    scriptureReferences: [
      { ref: "Matthew 23:11" },
      { ref: "Proverbs 31:10-31" },
      { ref: "Mark 10:44" }
    ]
  },
  {
    id: "phi-sigma-pi",
    name: "Phi Sigma Pi National Honor Fraternity",
    type: "co-ed",
    council: "Honor",
    category: "leadership-honor",
    colors: "Purple & Gold",
    founded: "1916",
    symbol: "Tripod",
    motto: "The Tripod: Scholarship, Leadership, Fellowship",
    description: "A co-ed national honor fraternity promoting scholarship, leadership, and fellowship through a unique brotherhood experience.",
    notableMembers: ["Campus leaders and scholars"],
    christianPerspective: "The tripod of scholarship, leadership, and fellowship reflects the Christian call to develop mind, character, and community.",
    biblicalParallels: [
      "Developing mind, character, and community",
      "Three-fold cord not easily broken"
    ],
    scriptureReferences: [
      { ref: "Ecclesiastes 4:12" },
      { ref: "2 Peter 1:5-7" },
      { ref: "Acts 2:42" }
    ]
  },
  {
    id: "alpha-phi-sigma",
    name: "Alpha Phi Sigma (Criminal Justice)",
    type: "honor-society",
    council: "Honor",
    category: "leadership-honor",
    colors: "Blue & Gold",
    founded: "1942",
    symbol: "Shield, Scales of Justice",
    motto: "To Act, To Lead, To Unite",
    description: "The national criminal justice honor society recognizes academic excellence in criminal justice and criminology programs.",
    notableMembers: ["Law enforcement and legal professionals"],
    christianPerspective: "The pursuit of justice in criminal justice reflects the biblical call to do justice and love mercy.",
    biblicalParallels: [
      "Do justice, love mercy",
      "Upholding righteousness"
    ],
    scriptureReferences: [
      { ref: "Micah 6:8" },
      { ref: "Isaiah 1:17" },
      { ref: "Amos 5:24" }
    ]
  },
  {
    id: "golden-key",
    name: "Golden Key International Honour Society",
    type: "honor-society",
    council: "Honor",
    category: "leadership-honor",
    colors: "Black & Gold",
    founded: "1977",
    symbol: "Key",
    motto: "Excellence, Innovation, Leadership",
    description: "An international collegiate honor society recognizing the top 15% of students in all fields of study.",
    notableMembers: ["Elon Musk", "Bill Clinton", "Academic achievers worldwide"],
    christianPerspective: "Excellence, innovation, and leadership can all be expressions of faithful stewardship of God-given abilities.",
    biblicalParallels: [
      "Faithful stewardship of talents",
      "Working with excellence"
    ],
    scriptureReferences: [
      { ref: "Matthew 25:14-30" },
      { ref: "Colossians 3:23-24" },
      { ref: "Daniel 6:3" }
    ]
  }
];

export const npcSororities: GreekOrganization[] = [
  {
    id: "chi-omega",
    name: "Chi Omega",
    type: "sorority",
    council: "NPC",
    category: "social",
    founded: "1895 at University of Arkansas",
    description: "Largest women's fraternal organization. Emphasizes sisterhood, high standards, scholarship, community service, and career development.",
    christianPerspective: "Chi Omega's stand against hazing reflects moral courage. Christian women can model the Titus 2 woman - teaching, mentoring, and building up younger sisters in love.",
    biblicalParallels: [
      "Older women teach younger women (Titus 2:3-5)",
      "Iron sharpens iron (Proverbs 27:17)"
    ],
    scriptureReferences: [
      { ref: "Titus 2:3-5" },
      { ref: "Proverbs 27:17" },
      { ref: "Proverbs 31:26" }
    ]
  },
  {
    id: "delta-delta-delta",
    name: "Delta Delta Delta (Tri Delta)",
    type: "sorority",
    council: "NPC",
    category: "social",
    founded: "1888 at Boston University",
    motto: "Let Us Steadfastly Love One Another",
    description: "The trident symbol represents the three founders and commitment to sisterhood.",
    christianPerspective: "Tri Delta's motto is essentially 1 John 4:7 - 'Let us love one another.' Christian Tri Deltas can see their sisterhood as living out this biblical command.",
    biblicalParallels: [
      "Let us love one another, for love comes from God",
      "Love never fails"
    ],
    scriptureReferences: [
      { ref: "1 John 4:7", text: "Let us love one another, for love comes from God." },
      { ref: "1 Peter 1:22" },
      { ref: "1 Corinthians 13:8" }
    ]
  },
  {
    id: "gamma-phi-beta",
    name: "Gamma Phi Beta",
    type: "sorority",
    council: "NPC",
    category: "social",
    founded: "1874 at Syracuse University",
    motto: "Founded on a Rock",
    description: "First organization to be called a 'sorority.' Emphasizes lasting friendship built on solid principles.",
    christianPerspective: "Gamma Phi's motto 'Founded on a Rock' directly echoes Matthew 7:24 - the wise builder who built on the rock. Christian members can see their sisterhood built on Christ's foundation.",
    biblicalParallels: [
      "Build your house on the rock (Matthew 7:24-25)",
      "The Lord is my rock and fortress"
    ],
    scriptureReferences: [
      { ref: "Matthew 7:24-25" },
      { ref: "1 Corinthians 3:11", text: "No one can lay any foundation other than the one already laid, which is Jesus Christ." },
      { ref: "Psalm 18:2" }
    ]
  },
  {
    id: "kappa-kappa-gamma",
    name: "Kappa Kappa Gamma",
    type: "sorority",
    council: "NPC",
    category: "social",
    founded: "1870 at Monmouth College",
    description: "Emphasizes intellectual, social, and moral development. The key symbol represents friendship and unlocking potential.",
    christianPerspective: "Kappa's key symbol parallels the keys given to Peter (Matthew 16:19). Christian Kappas can see their sisterhood as a key that unlocks potential and opens doors for service.",
    biblicalParallels: [
      "Keys of the kingdom (Matthew 16:19)",
      "We are God's handiwork, created for good works"
    ],
    scriptureReferences: [
      { ref: "Matthew 16:19" },
      { ref: "Ephesians 2:10" },
      { ref: "Philippians 4:13" }
    ]
  },
  {
    id: "pi-beta-phi",
    name: "Pi Beta Phi",
    type: "sorority",
    council: "NPC",
    category: "social",
    founded: "1867 at Monmouth College",
    description: "First national secret college society for women. The arrow symbol represents aiming for higher ideals.",
    christianPerspective: "Pi Phi's arrow symbolizes direction and purpose. Scripture speaks of children as arrows in a warrior's hand (Psalm 127:4). Christian Pi Phis can see themselves aimed toward God's purposes.",
    biblicalParallels: [
      "Like arrows in the hand of a warrior",
      "I press on toward the goal"
    ],
    scriptureReferences: [
      { ref: "Psalm 127:4" },
      { ref: "Philippians 3:14" },
      { ref: "Proverbs 3:5-6" }
    ]
  },
  {
    id: "alpha-chi-omega",
    name: "Alpha Chi Omega",
    type: "sorority",
    council: "NPC",
    category: "social",
    founded: "1885 at DePauw University",
    motto: "Together Let Us Seek the Heights",
    description: "The lyre symbol represents harmony and the arts.",
    christianPerspective: "Alpha Chi's call to 'seek the heights together' mirrors the Christian journey upward toward Christ. The lyre recalls David's worship.",
    biblicalParallels: [
      "Set your minds on things above (Colossians 3:2)",
      "David played the lyre before the Lord"
    ],
    scriptureReferences: [
      { ref: "Colossians 3:2" },
      { ref: "1 Samuel 16:23" },
      { ref: "Hebrews 3:13" }
    ]
  },
  {
    id: "alpha-phi",
    name: "Alpha Phi",
    type: "sorority",
    council: "NPC",
    category: "social",
    founded: "1872 at Syracuse University",
    description: "Emphasizes sisterhood, service, scholarship, and character development. The ivy leaf symbolizes enduring friendship.",
    christianPerspective: "Alpha Phi's 'Union Hand in Hand' reflects the unity Christ prayed for (John 17:21). The ivy leaf, like John 15, represents abiding connection.",
    biblicalParallels: [
      "May they be brought to complete unity",
      "Abide in me and bear much fruit"
    ],
    scriptureReferences: [
      { ref: "John 17:23" },
      { ref: "1 John 1:7" },
      { ref: "John 15:5" }
    ]
  }
];

export const ifcFraternities: GreekOrganization[] = [
  {
    id: "beta-theta-pi",
    name: "Beta Theta Pi",
    type: "fraternity",
    council: "IFC",
    category: "social",
    founded: "1839 at Miami University",
    description: "One of the oldest fraternities. 'Men of Principle' initiative focuses on integrity, intellectual growth, responsible conduct, and mutual assistance.",
    christianPerspective: "Beta's Men of Principle aligns with the call to be men of integrity. Scripture emphasizes character and principle-centered living.",
    biblicalParallels: [
      "The righteous man walks in his integrity (Proverbs 20:7)",
      "Be an example in speech, conduct, love, faith, purity"
    ],
    scriptureReferences: [
      { ref: "Proverbs 20:7" },
      { ref: "Philippians 4:8" },
      { ref: "1 Timothy 4:12" }
    ]
  },
  {
    id: "phi-delta-theta",
    name: "Phi Delta Theta",
    type: "fraternity",
    council: "IFC",
    category: "social",
    founded: "1848 at Miami University",
    description: "Cardinal principles: Friendship, Sound Learning, and Rectitude. Became alcohol-free in 2000.",
    christianPerspective: "Phi Delt's three principles directly reflect biblical values - friendship mirrors David and Jonathan, sound learning honors God with our minds, and rectitude embodies moral integrity.",
    biblicalParallels: [
      "A friend loves at all times (Proverbs 17:17)",
      "Blessed are the pure in heart"
    ],
    scriptureReferences: [
      { ref: "Proverbs 17:17" },
      { ref: "Proverbs 4:5" },
      { ref: "Matthew 5:8" }
    ]
  },
  {
    id: "pi-kappa-alpha",
    name: "Pi Kappa Alpha (PIKE)",
    type: "fraternity",
    council: "IFC",
    category: "social",
    founded: "1868 at University of Virginia",
    description: "Emphasizes being Scholars, Leaders, Athletes, and Gentlemen (SLAG). Focuses on academic achievement and community service.",
    christianPerspective: "PIKE's SLAG principles align with holistic development - growth in mind, leadership, body, and character. Christians can pursue excellence while giving glory to God.",
    biblicalParallels: [
      "Whatever you do, do it all for the glory of God",
      "Daniel excelled because of his excellent spirit"
    ],
    scriptureReferences: [
      { ref: "1 Corinthians 10:31" },
      { ref: "1 Timothy 4:7-8" },
      { ref: "Daniel 6:3" }
    ]
  },
  {
    id: "sigma-alpha-epsilon",
    name: "Sigma Alpha Epsilon",
    type: "fraternity",
    council: "IFC",
    category: "social",
    founded: "1856 at University of Alabama",
    description: "Promotes the True Gentleman ideal - nobility of character, integrity, and respect for others.",
    christianPerspective: "The True Gentleman creed emphasizes character traits that align with Scripture - kindness, self-control, and respect. Christians can embody Christ-like character.",
    biblicalParallels: [
      "Let your gentleness be evident to all",
      "The fruit of the Spirit includes gentleness"
    ],
    scriptureReferences: [
      { ref: "Philippians 4:5" },
      { ref: "Proverbs 15:1" },
      { ref: "Galatians 5:22-23" }
    ]
  },
  {
    id: "kappa-sigma",
    name: "Kappa Sigma",
    type: "fraternity",
    council: "IFC",
    category: "social",
    founded: "1869 at University of Virginia",
    description: "Traces heritage to medieval Bologna. Four Pillars: Fellowship, Leadership, Scholarship, and Service.",
    christianPerspective: "Kappa Sigma's Four Pillars reflect biblical values - fellowship mirrors Christian community, leadership reflects servant leadership, scholarship honors God with our minds.",
    biblicalParallels: [
      "By this all will know you are my disciples - by your love",
      "Love the Lord with all your mind"
    ],
    scriptureReferences: [
      { ref: "John 13:35" },
      { ref: "Mark 10:43-44" },
      { ref: "Matthew 22:37" }
    ]
  }
];

export const allGreekOrganizations = [
  ...divineNineOrganizations,
  ...serviceBandOrganizations,
  ...socialFellowships,
  ...christianGreekOrganizations,
  ...masonicFraternalOrganizations,
  ...multiculturalOrganizations,
  ...professionalOrganizations,
  ...lgbtqOrganizations,
  ...leadershipHonorOrganizations,
  ...npcSororities,
  ...ifcFraternities
];

export const councilLabels: Record<string, string> = {
  NPHC: "National Pan-Hellenic Council (Divine Nine)",
  NPC: "National Panhellenic Conference",
  IFC: "Interfraternity Council",
  NAPA: "National APIDA Panhellenic Association",
  NALFO: "National Association of Latino Fraternal Organizations",
  MGC: "Multicultural Greek Council",
  Jewish: "Jewish Greek Organizations",
  Professional: "Professional Greek Organizations",
  Honor: "Honor Societies",
  Service: "Service Organizations",
  Christian: "Christian Greek Organizations",
  LGBTQ: "LGBTQ+ Greek Organizations",
  Masonic: "Masonic & Fraternal Orders"
};
