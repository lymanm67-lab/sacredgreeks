export interface GreekOrganization {
  id: string;
  name: string;
  type: "fraternity" | "sorority";
  council: "NPHC" | "NPC" | "IFC" | "NAPA" | "NALFO" | "MGC" | "Jewish";
  colors?: string;
  founded?: string;
  motto?: string;
  description: string;
  christianPerspective: string;
  biblicalParallels: string[];
  scriptureReferences: { ref: string; text?: string }[];
}

export const divineNineOrganizations: GreekOrganization[] = [
  {
    id: "alpha-phi-alpha",
    name: "Alpha Phi Alpha",
    type: "fraternity",
    council: "NPHC",
    colors: "Black & Gold",
    founded: "1906 at Cornell University",
    motto: "First of All, Servants of All, We Shall Transcend All",
    description: "First intercollegiate Greek-letter fraternity for African Americans. Known for their commitment to service and leadership.",
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
    name: "Alpha Kappa Alpha",
    type: "sorority",
    council: "NPHC",
    colors: "Salmon Pink & Apple Green",
    founded: "1908 at Howard University",
    motto: "By Culture and By Merit",
    description: "First Greek-letter sorority for African American women. Committed to service, scholarship, and empowerment.",
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
    name: "Kappa Alpha Psi",
    type: "fraternity",
    council: "NPHC",
    colors: "Crimson & Cream",
    founded: "1911 at Indiana University",
    motto: "Achievement in Every Field of Human Endeavor",
    description: "Known for their commitment to excellence and distinction. Emphasizes achievement and leadership.",
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
    name: "Omega Psi Phi",
    type: "fraternity",
    council: "NPHC",
    colors: "Purple & Gold",
    founded: "1911 at Howard University",
    motto: "Friendship is Essential to the Soul",
    description: "Cardinal principles: Manhood, Scholarship, Perseverance, and Uplift. Known for strong brotherhood bonds.",
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
    name: "Delta Sigma Theta",
    type: "sorority",
    council: "NPHC",
    colors: "Crimson & Cream",
    founded: "1913 at Howard University",
    motto: "Intelligence is the Torch of Wisdom",
    description: "Public service organization focused on educational, economic, and political empowerment.",
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
    name: "Phi Beta Sigma",
    type: "fraternity",
    council: "NPHC",
    colors: "Blue & White",
    founded: "1914 at Howard University",
    motto: "Culture For Service and Service For Humanity",
    description: "Constitutionally bound to Zeta Phi Beta Sorority. Focused on culture and service.",
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
    name: "Zeta Phi Beta",
    type: "sorority",
    council: "NPHC",
    colors: "Royal Blue & White",
    founded: "1920 at Howard University",
    motto: "A Community Conscious, Action-Oriented Organization",
    description: "Constitutionally bound to Phi Beta Sigma Fraternity. Known for community service focus.",
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
    name: "Sigma Gamma Rho",
    type: "sorority",
    council: "NPHC",
    colors: "Royal Blue & Gold",
    founded: "1922 at Butler University",
    motto: "Greater Service, Greater Progress",
    description: "Founded by seven educators. Focus on enhancing quality of life through service.",
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
    name: "Iota Phi Theta",
    type: "fraternity",
    council: "NPHC",
    colors: "Brown & Gold",
    founded: "1963 at Morgan State University",
    motto: "Building a Tradition, Not Resting Upon One",
    description: "Youngest of the Divine Nine fraternities. Focuses on forward progress and development.",
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

export const npcSororities: GreekOrganization[] = [
  {
    id: "chi-omega",
    name: "Chi Omega",
    type: "sorority",
    council: "NPC",
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

export const culturalGreekOrganizations: GreekOrganization[] = [
  {
    id: "lambda-phi-epsilon",
    name: "Lambda Phi Epsilon",
    type: "fraternity",
    council: "NAPA",
    founded: "1981 at UCLA",
    motto: "To Be a Lambda is Not For a Day, But For Life",
    description: "Largest Asian-interest fraternity.",
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
    id: "lambda-theta-phi",
    name: "Lambda Theta Phi",
    type: "fraternity",
    council: "NALFO",
    founded: "1975 at Kean University",
    motto: "Chivalry Above Self",
    description: "First Latino fraternity in the nation. Committed to Latino unity and cultural awareness.",
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
    id: "alpha-kappa-delta-phi",
    name: "alpha Kappa Delta Phi",
    type: "sorority",
    council: "NAPA",
    founded: "1990 at UC Berkeley",
    description: "Largest Asian-interest sorority. Promotes sisterhood, scholarship, leadership, and service.",
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
    id: "lambda-theta-alpha",
    name: "Lambda Theta Alpha",
    type: "sorority",
    council: "NALFO",
    founded: "1975 at Kean University",
    description: "First Latina sorority in the nation. Focuses on unity, love, and respect among Latin women.",
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
    id: "alpha-epsilon-pi",
    name: "Alpha Epsilon Pi",
    type: "fraternity",
    council: "Jewish",
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

export const allGreekOrganizations = [
  ...divineNineOrganizations,
  ...npcSororities,
  ...ifcFraternities,
  ...culturalGreekOrganizations
];

export const councilLabels: Record<string, string> = {
  NPHC: "National Pan-Hellenic Council (Divine Nine)",
  NPC: "National Panhellenic Conference",
  IFC: "Interfraternity Council",
  NAPA: "National APIDA Panhellenic Association",
  NALFO: "National Association of Latino Fraternal Organizations",
  MGC: "Multicultural Greek Council",
  Jewish: "Jewish Greek Organizations"
};
