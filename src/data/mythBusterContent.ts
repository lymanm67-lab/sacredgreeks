export interface MythEntry {
  id: string;
  myth: string;
  category: string;
  shortAnswer: string;
  detailedResponse: string;
  scriptures: { ref: string; text: string }[];
  relatedArticle?: string;
  relatedArticleUrl?: string;
  tags: string[];
}

export const mythBusterContent: MythEntry[] = [
  {
    id: "bglo-sinful",
    myth: "Are BGLOs sinful?",
    category: "theology",
    shortAnswer: "Scripture doesn't prohibit membership in cultural organizations. The P.R.O.O.F. framework helps Christians evaluate their participation biblically.",
    detailedResponse: "The claim that Black Greek Letter Organizations are inherently sinful lacks direct biblical support. Scripture addresses idolatry, false worship, and ungodly partnerships—but belonging to a cultural organization doesn't automatically fall into these categories. Paul's teaching in 1 Corinthians 8-10 about meat sacrificed to idols provides a helpful framework: what matters is heart posture, conscience, and the impact on others. Christians can participate in Greek life while maintaining their allegiance to Christ alone. The key questions are: Does this participation cause you to compromise your faith? Does it lead you into actual sin? Does your conscience bear witness? These questions help determine personal conviction, not blanket condemnation.",
    scriptures: [
      { ref: "1 Corinthians 8:4-6", text: "So then, about eating food sacrificed to idols: We know that 'An idol is nothing at all in the world' and that 'There is no God but one.'" },
      { ref: "Romans 14:5-6", text: "One person considers one day more sacred than another; another considers every day alike. Each of them should be fully convinced in their own mind." },
      { ref: "1 Thessalonians 5:21", text: "But test them all; hold on to what is good." }
    ],
    relatedArticle: "Sacred, Not Sinful: A Biblical Framework for Greek Life",
    relatedArticleUrl: "/articles",
    tags: ["sinful", "bglo", "greek life", "christianity", "theology"]
  },
  {
    id: "denounce-membership",
    myth: "Should Christians denounce their Greek membership?",
    category: "practical",
    shortAnswer: "Denouncing is a personal decision that should come from Spirit-led conviction, not external pressure or fear-based teaching.",
    detailedResponse: "The decision to denounce Greek membership should be based on genuine conviction from the Holy Spirit after careful study—not on viral videos, social pressure, or fear. Romans 14 teaches that in 'disputable matters,' each person should be 'fully convinced in their own mind.' Some Christians may feel led to step away from Greek life; others may feel called to remain as witnesses. Neither decision is universally 'right' for everyone. The danger of pressure-based denouncing is twofold: it may not represent genuine conviction, and it can create unnecessary division. If you feel peace about your membership after biblical study and prayer, that peace is significant. If you feel convicted to leave, that conviction matters too. The key is following YOUR conscience before God, not others' expectations.",
    scriptures: [
      { ref: "Romans 14:22-23", text: "So whatever you believe about these things keep between yourself and God. Blessed is the one who does not condemn himself by what he approves." },
      { ref: "Galatians 5:1", text: "It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery." },
      { ref: "Romans 14:4", text: "Who are you to judge someone else's servant? To their own master, servants stand or fall." }
    ],
    relatedArticle: "When Denouncing Makes Sense (And When It Doesn't)",
    tags: ["denounce", "leaving", "decision", "conviction", "pressure"]
  },
  {
    id: "greek-incompatible",
    myth: "Is Greek Life incompatible with Christian faith?",
    category: "theology",
    shortAnswer: "No. Christians can participate in cultural organizations while maintaining their faith, just as they participate in other cultural institutions.",
    detailedResponse: "The argument that Greek life is inherently incompatible with Christianity applies a standard that would eliminate most cultural participation. By this logic, Christians couldn't use days named after Norse gods, get married with rings (pagan origin), celebrate birthdays, or participate in countless other traditions with historical connections to non-Christian practices. Scripture teaches that Christians can engage culture without compromise. Jesus ate with sinners. Paul quoted pagan poets. The early church transformed cultural practices rather than fleeing all cultural engagement. What matters is: Are you worshiping false gods? Are you compromising your faith? Are you maintaining your witness? If you can answer no, no, and yes—Greek life can coexist with vibrant Christian faith.",
    scriptures: [
      { ref: "1 Corinthians 9:19-23", text: "I have become all things to all people so that by all possible means I might save some." },
      { ref: "John 17:15-16", text: "My prayer is not that you take them out of the world but that you protect them from the evil one." },
      { ref: "Acts 17:28", text: "For in him we live and move and have our being.' As some of your own poets have said, 'We are his offspring.'" }
    ],
    relatedArticle: "Being in the World but Not of It: A Greek Perspective",
    tags: ["compatible", "faith", "cultural", "engagement", "christianity"]
  },
  {
    id: "pagan-roots",
    myth: "Don't BGLOs have pagan or occult roots?",
    category: "history",
    shortAnswer: "Many cultural practices have historical connections to ancient religions. Origins alone don't make something sinful—current meaning and use matter.",
    detailedResponse: "The 'pagan roots' argument commits what's called the genetic fallacy—rejecting something solely based on its origin rather than its current meaning. By this logic, we'd have to eliminate: wedding rings (pagan), the names of days and months (named after gods), Christmas trees (Germanic paganism), Easter eggs (fertility symbols), wedding veils (Roman tradition), and countless medical practices (ancient religious origins). BGLOs draw symbolism from various sources, including ancient cultures. But symbolism takes on the meaning we assign it. The Greek letters, organizational traditions, and rituals mean what current members make them mean. The question isn't 'What did this mean 100 years ago?' but 'What does this mean to you today, and does it compromise your faith?'",
    scriptures: [
      { ref: "1 Corinthians 10:25-26", text: "Eat anything sold in the meat market without raising questions of conscience, for, 'The earth is the Lord's, and everything in it.'" },
      { ref: "Colossians 2:16-17", text: "Therefore do not let anyone judge you by what you eat or drink, or with regard to a religious festival..." },
      { ref: "Romans 14:14", text: "I am convinced, being fully persuaded in the Lord Jesus, that nothing is unclean in itself." }
    ],
    relatedArticle: "Understanding the Genetic Fallacy in Greek Life Criticism",
    tags: ["pagan", "occult", "roots", "origins", "history", "symbols"]
  },
  {
    id: "unequally-yoked",
    myth: "Doesn't joining mean being 'unequally yoked' with unbelievers?",
    category: "theology",
    shortAnswer: "2 Corinthians 6:14 addresses spiritual partnerships that compromise faith—not all associations with non-Christians.",
    detailedResponse: "The 'unequally yoked' verse (2 Corinthians 6:14) is frequently misapplied. In context, Paul is warning against spiritual partnerships that would compromise believers' faith and witness—likely referring to participation in idol worship or ungodly covenants. He's not prohibiting all contact with non-Christians. Jesus Himself was accused of spending too much time with sinners. He sent His disciples INTO the world as witnesses. We work at secular jobs, attend secular schools, and participate in countless organizations alongside non-believers. The question is whether the partnership requires us to compromise our faith or endorses actual sin. Organizational membership—where you maintain your Christian identity and witness—is categorically different from the spiritual yoking Paul warns against.",
    scriptures: [
      { ref: "2 Corinthians 6:14", text: "Do not be yoked together with unbelievers. For what do righteousness and wickedness have in common?" },
      { ref: "1 Corinthians 5:9-10", text: "I wrote to you in my letter not to associate with sexually immoral people—not at all meaning the people of this world..." },
      { ref: "Matthew 9:10-13", text: "While Jesus was having dinner at Matthew's house, many tax collectors and sinners came and ate with him and his disciples." }
    ],
    relatedArticle: "Rethinking 'Unequally Yoked' in Modern Context",
    tags: ["unequally yoked", "2 corinthians", "association", "unbelievers"]
  },
  {
    id: "secret-rituals",
    myth: "What about the secret rituals and oaths?",
    category: "practical",
    shortAnswer: "Christians should evaluate specific activities against Scripture. Having private organizational practices isn't the same as anti-Christian secrecy.",
    detailedResponse: "Many organizations—including churches, businesses, and civic groups—have private practices, initiations, or confidential procedures. 'Secret' doesn't automatically mean 'evil.' The relevant questions are: Do these rituals require you to worship false gods? Do they ask you to make commitments that violate Scripture? Do they compromise your Christian witness? If specific activities violate your conscience or Scripture, you can often abstain or modify participation. If the overall organization requires genuine anti-Christian practice, that's a different issue. But most BGLO rituals, while private, don't require abandoning Christian faith. They involve organizational traditions, not occult practices. Christians participate with their allegiance to Christ intact.",
    scriptures: [
      { ref: "Matthew 5:33-37", text: "But I tell you, do not swear an oath at all... All you need to say is simply 'Yes' or 'No'; anything beyond this comes from the evil one." },
      { ref: "James 5:12", text: "Above all, my brothers and sisters, do not swear—not by heaven or by earth or by anything else." },
      { ref: "1 Corinthians 10:31", text: "So whether you eat or drink or whatever you do, do it all for the glory of God." }
    ],
    tags: ["secrets", "rituals", "oaths", "ceremonies", "pledging"]
  },
  {
    id: "greek-gods",
    myth: "The letters come from Greek gods—isn't that worship?",
    category: "history",
    shortAnswer: "Using Greek letters doesn't constitute worship any more than using days named after gods constitutes deity worship.",
    detailedResponse: "The Greek alphabet predates Christianity and has been adopted universally in science, mathematics, and organizations. Using Greek letters (Alpha, Beta, Delta, Phi, etc.) isn't an act of worship—it's using a writing system. By the logic that using Greek letters equals worship, every scientist using π (pi) or Ω (omega), every physicist discussing alpha particles, and every astronomer naming stars would be engaging in pagan worship. Worship requires intent, devotion, and religious practice. Spelling your organization's name with Greek letters is no more worship than writing 'Thursday' (named after Thor) or 'January' (named after Janus). The letters are symbols we've assigned meaning to—and the meaning Christian Greeks assign is brotherhood/sisterhood, service, and excellence, not deity worship.",
    scriptures: [
      { ref: "Revelation 1:8", text: "I am the Alpha and the Omega,' says the Lord God, 'who is, and who was, and who is to come, the Almighty.'" },
      { ref: "1 Corinthians 8:4", text: "We know that 'An idol is nothing at all in the world' and that 'There is no God but one.'" }
    ],
    tags: ["greek letters", "alphabet", "gods", "worship", "symbols"]
  },
  {
    id: "stepping-shows",
    myth: "Aren't stepping and strolling forms of spiritual warfare?",
    category: "culture",
    shortAnswer: "Stepping is a performance art with African American cultural roots—not spiritual warfare or occult practice.",
    detailedResponse: "Stepping evolved from African American traditions including African dance, military drill, and ring shouts. It's a form of synchronized movement and percussion that celebrates culture, unity, and organizational pride. Calling stepping 'spiritual warfare' misunderstands both stepping and spiritual warfare. Stepping involves no invocation of spirits, no worship of deities, and no occult practices. It's rhythmic movement—similar to dance teams, marching bands, or drill teams. The spiritual warfare described in Ephesians 6 involves prayer, truth, righteousness, and faith—not dance styles. Critics who label stepping as demonic typically do so based on aesthetic discomfort or unfamiliarity, not biblical analysis.",
    scriptures: [
      { ref: "2 Samuel 6:14", text: "Wearing a linen ephod, David was dancing before the LORD with all his might." },
      { ref: "Psalm 149:3", text: "Let them praise his name with dancing and make music to him with timbrel and harp." },
      { ref: "Exodus 15:20", text: "Then Miriam the prophet, Aaron's sister, took a timbrel in her hand, and all the women followed her, with timbrels and dancing." }
    ],
    tags: ["stepping", "strolling", "dance", "performance", "culture"]
  },
  {
    id: "founders-beliefs",
    myth: "The founders weren't Christian, so the organization can't be Christian",
    category: "history",
    shortAnswer: "An organization's spiritual nature isn't determined solely by founders' personal beliefs but by what participants bring to it.",
    detailedResponse: "Many institutions we engage with daily weren't founded by Christians or for Christian purposes. This includes universities, businesses, professional associations, and government agencies. We don't typically investigate every founder's personal faith before participating. What matters more is: What is the organization NOW? What do current members bring to it? How do YOU engage with it as a Christian? The founders of BGLOs had various religious backgrounds and beliefs. But the organizations today include thousands of committed Christians who serve Christ through their membership. YOU determine whether your participation honors God—not the personal faith of someone from a century ago.",
    scriptures: [
      { ref: "1 Corinthians 3:11", text: "For no one can lay any foundation other than the one already laid, which is Jesus Christ." },
      { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him." }
    ],
    tags: ["founders", "history", "christian", "origins", "beliefs"]
  },
  {
    id: "hazing-unchristian",
    myth: "Doesn't hazing prove Greek life is unchristian?",
    category: "practical",
    shortAnswer: "Hazing is wrong and should be opposed—but it's not inherent to Greek life, and many Christians work to eliminate it.",
    detailedResponse: "Hazing is absolutely wrong and should be condemned. It violates human dignity and contradicts Christian principles. However, hazing isn't unique to Greek organizations—it occurs in sports teams, military units, and other groups. Many BGLOs officially prohibit hazing and discipline members who engage in it. Christian Greeks can and should: (1) Refuse to participate in hazing, (2) Report hazing when they see it, (3) Work to change organizational culture, and (4) Model Christ-like treatment of new members. The presence of hazing in some chapters doesn't make all Greek participation unchristian—it means Christians should work to eliminate this practice while being salt and light.",
    scriptures: [
      { ref: "Philippians 2:3-4", text: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves." },
      { ref: "1 Peter 4:8", text: "Above all, love each other deeply, because love covers over a multitude of sins." },
      { ref: "Galatians 5:13", text: "Serve one another humbly in love." }
    ],
    tags: ["hazing", "abuse", "pledging", "ethics", "conduct"]
  },
  {
    id: "tithing-dues",
    myth: "Paying dues takes money from tithing to God",
    category: "practical",
    shortAnswer: "Financial stewardship includes both giving to God and responsible spending on meaningful activities. These aren't mutually exclusive.",
    detailedResponse: "This argument assumes that all money not tithed is somehow taken from God—which would eliminate any spending on anything beyond bare necessities. Christians practice financial stewardship, which includes: giving generously to God's work, providing for family, and making wise spending decisions. Organizational dues support scholarship programs, community service, professional development, and brotherhood/sisterhood—all legitimate uses of resources. The question isn't 'Can I pay dues?' but 'Am I being a good steward overall?' If you're tithing faithfully and managing money wisely, paying organizational dues is a legitimate expense like any other membership, activity, or enrichment cost.",
    scriptures: [
      { ref: "Malachi 3:10", text: "Bring the whole tithe into the storehouse, that there may be food in my house." },
      { ref: "2 Corinthians 9:7", text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion." },
      { ref: "Luke 16:11", text: "So if you have not been trustworthy in handling worldly wealth, who will trust you with true riches?" }
    ],
    tags: ["money", "dues", "tithing", "stewardship", "finances"]
  },
  {
    id: "greek-identity",
    myth: "Your identity should be in Christ, not your letters",
    category: "theology",
    shortAnswer: "Agreed! But having meaningful affiliations doesn't replace Christ as your identity—just as family, career, or nationality don't.",
    detailedResponse: "This is actually a point of agreement! Every Christian's primary identity should be in Christ. But this critique applies to anything that could become an idol—family, career, nationality, sports teams, political party, or hobbies. The question isn't whether Greek membership exists but whether it has become ultimate. Christians can be parents, employees, citizens, fans, and Greeks—all while maintaining Christ as their ultimate identity. The solution to potential idolatry isn't avoiding all affiliations but properly ordering them under Christ. If your letters have become more important than Jesus, that's a problem. If they're a meaningful but subordinate part of your life, that's healthy integration.",
    scriptures: [
      { ref: "Galatians 2:20", text: "I have been crucified with Christ and I no longer live, but Christ lives in me." },
      { ref: "Colossians 3:3", text: "For you died, and your life is now hidden with Christ in God." },
      { ref: "1 Corinthians 6:19-20", text: "You are not your own; you were bought at a price." }
    ],
    tags: ["identity", "christ", "idolatry", "priorities", "belonging"]
  },
  // Additional myths from comprehensive library
  {
    id: "greek-symbols-demonic",
    myth: "Greek Symbols Are Demonic",
    category: "theology",
    shortAnswer: "Greek letters are simply alphabet characters. Hand signs typically represent organizational identity, not occult meanings.",
    detailedResponse: "This claim ignores context and intent. Greek letters are simply alphabet characters. Hand signs typically represent organizational identity, not occult meanings. Similar logic would condemn the 'OK' sign or peace symbol. Judge symbols by their actual use and meaning within context, not conspiracy theories. The letters Alpha through Omega are used throughout Scripture—even God calls Himself 'the Alpha and the Omega.'",
    scriptures: [
      { ref: "Romans 14:14", text: "I am convinced, being fully persuaded in the Lord Jesus, that nothing is unclean in itself." },
      { ref: "1 Corinthians 8:4-6", text: "We know that 'An idol is nothing at all in the world' and that 'There is no God but one.'" },
      { ref: "Titus 1:15", text: "To the pure, all things are pure, but to those who are corrupted and do not believe, nothing is pure." }
    ],
    tags: ["symbols", "demonic", "signs", "conspiracy", "letters"]
  },
  {
    id: "greek-rituals-satanic",
    myth: "Greek Rituals Are Satanic",
    category: "theology",
    shortAnswer: "This accusation is typically based on rumor, not evidence. Closed ceremonies are not evidence of satanic activity.",
    detailedResponse: "Many organizations—including churches, businesses, and civic groups—have private practices. 'Secret' doesn't automatically mean 'evil.' Many professional organizations have private meetings. Instead of believing sensational claims, evaluate based on the actual lives of members you know. Do they bear fruit of the Spirit? Most Greek rituals focus on values like scholarship, service, and brotherhood/sisterhood.",
    scriptures: [
      { ref: "Matthew 7:15-20", text: "By their fruit you will recognize them. Do people pick grapes from thornbushes, or figs from thistles?" },
      { ref: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control." },
      { ref: "Proverbs 14:15", text: "The simple believe anything, but the prudent give thought to their steps." }
    ],
    tags: ["satanic", "rituals", "rumors", "discernment", "closed"]
  },
  {
    id: "stepping-demonic",
    myth: "Stepping and Strolling Invite Demons",
    category: "culture",
    shortAnswer: "Movement and rhythm do not belong to the devil. David danced before the Lord. The content matters, not the form.",
    detailedResponse: "Movement and rhythm do not belong to the devil. David danced before the Lord. Israel marched in processions. African and African American worship has always involved the body. The question is what is being celebrated, glorified, and spoken in those moments. If the content is degrading, sexually explicit, or violently prideful, then believers need to step back and change the script. If the content highlights unity, history, and positive values, believers can reclaim their bodies and movements as instruments of worship and witness.",
    scriptures: [
      { ref: "2 Samuel 6:14", text: "Wearing a linen ephod, David was dancing before the LORD with all his might." },
      { ref: "Psalm 149:3", text: "Let them praise his name with dancing and make music to him with timbrel and harp." },
      { ref: "Romans 12:1", text: "Therefore, I urge you, brothers and sisters, in view of God's mercy, to offer your bodies as a living sacrifice." }
    ],
    tags: ["stepping", "strolling", "dance", "movement", "demons"]
  },
  {
    id: "masons-connection",
    myth: "Because Founders Were Masons, All BGLOs Are Evil",
    category: "history",
    shortAnswer: "This is the genetic fallacy—judging something solely by where it came from. Evaluate by present beliefs and fruit.",
    detailedResponse: "Many institutions were influenced by Freemasonry, from universities to civic clubs to parts of parliamentary procedure. That does not mean every group is secretly a lodge. The right question is 'What does this organization actually teach and practice right now.' Founders were complex people, just like the authors of our civic documents. You evaluate any group by its present beliefs, behaviors, and fruit, not only by rumored affiliations 100 years ago.",
    scriptures: [
      { ref: "Matthew 7:16-20", text: "By their fruit you will recognize them." },
      { ref: "Ezekiel 18:20", text: "The one who sins is the one who will die. The child will not share the guilt of the parent." },
      { ref: "1 Thessalonians 5:21", text: "But test them all; hold on to what is good." }
    ],
    tags: ["Masons", "founders", "history", "BGLO", "origins"]
  },
  {
    id: "greeks-worldly-influence",
    myth: "Greek Members Bring Worldly Influences Into Church",
    category: "practical",
    shortAnswer: "Every person brings their background into church. Greeks can bring valuable leadership skills and service orientation.",
    detailedResponse: "Every person brings their background into church—that's the nature of a redeemed community. The church exists to transform people, not exclude those with different experiences. Greeks can bring valuable leadership skills, service orientation, and network connections to benefit the body of Christ. Jesus Himself was criticized for associating with tax collectors and sinners.",
    scriptures: [
      { ref: "1 Corinthians 12:12-27", text: "For we were all baptized by one Spirit so as to form one body—whether Jews or Gentiles, slave or free." },
      { ref: "Mark 2:17", text: "It is not the healthy who need a doctor, but the sick. I have not come to call the righteous, but sinners." },
      { ref: "Romans 12:2", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind." }
    ],
    tags: ["worldliness", "church", "influence", "transformation"]
  },
  {
    id: "greek-kingdom-impact",
    myth: "Greeks Can't Really Make a Kingdom Impact",
    category: "theology",
    shortAnswer: "The Great Commission sends us into all the world—including Greek life. Your platform can be a unique mission field.",
    detailedResponse: "The Great Commission sends us into all the world—including Greek life. Some of the most fruitful evangelism happens in contexts the institutional church rarely reaches. Your Greek platform can be a unique mission field. Don't underestimate what God can do through you where you are. Daniel honored God in Babylon's court. Joseph honored God in Pharaoh's house.",
    scriptures: [
      { ref: "Matthew 28:19-20", text: "Therefore go and make disciples of all nations..." },
      { ref: "1 Corinthians 9:22", text: "I have become all things to all people so that by all possible means I might save some." },
      { ref: "Acts 1:8", text: "You will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth." }
    ],
    tags: ["impact", "ministry", "mission", "evangelism", "kingdom"]
  },
  {
    id: "greek-past-disqualifies",
    myth: "My Greek Past Disqualifies Me From Ministry",
    category: "practical",
    shortAnswer: "Paul persecuted the church yet became its greatest missionary. Your past does not disqualify you from God's grace or service.",
    detailedResponse: "Paul persecuted the church yet became its greatest missionary. Peter denied Christ three times yet led the early church. Your past—Greek or otherwise—does not disqualify you from God's grace or service. Redemption is the whole point of the Gospel. What matters is not where you've been but where Christ is leading you now.",
    scriptures: [
      { ref: "1 Timothy 1:15-16", text: "Christ Jesus came into the world to save sinners—of whom I am the worst." },
      { ref: "John 21:15-17", text: "Jesus said to Simon Peter, 'Simon son of John, do you love me?' ... 'Feed my sheep.'" },
      { ref: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" }
    ],
    tags: ["past", "ministry", "redemption", "qualification", "grace"]
  },
  {
    id: "greeks-only-care-themselves",
    myth: "Greeks Only Care About Themselves",
    category: "practical",
    shortAnswer: "Greek organizations collectively donate hundreds of millions to charity and log millions of volunteer hours annually.",
    detailedResponse: "Facts contradict this claim. Greek organizations collectively donate hundreds of millions to charity, provide scholarships, and log millions of volunteer hours annually. While any group has self-interested individuals, the organizational mandates and documented impact tell a different story. Judge by the actual fruit and impact, not assumptions.",
    scriptures: [
      { ref: "Philippians 2:3-4", text: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves." },
      { ref: "Galatians 5:13", text: "Serve one another humbly in love." },
      { ref: "Acts 20:35", text: "It is more blessed to give than to receive." }
    ],
    tags: ["service", "selfish", "community", "impact", "charity"]
  },
  {
    id: "greek-life-always-pulls-away",
    myth: "Greek Life Will Always Pull You Away From God",
    category: "theology",
    shortAnswer: "Any activity can become a distraction. For a mature Christian, Greek Life can become a mission field and training ground.",
    detailedResponse: "Greek Life can become a distraction or an idol, just like sports, relationships, business, or ministry. The issue is not the existence of the organization—it is your boundaries and priorities. Many believers drift from God with no letters on their chest at all. For a mature Christian, Greek Life can become a mission field, a training ground for leadership, and a crucible for character. For an immature believer, it might expose temptations they are not ready for. That calls for wisdom, not universal fear.",
    scriptures: [
      { ref: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well." },
      { ref: "1 Corinthians 10:23-24", text: "'I have the right to do anything,' you say—but not everything is beneficial." },
      { ref: "Proverbs 4:23", text: "Above all else, guard your heart, for everything you do flows from it." }
    ],
    tags: ["distraction", "priorities", "maturity", "wisdom", "boundaries"]
  },
  {
    id: "exclude-greeks-leadership",
    myth: "Should We Exclude Greeks From Church Leadership?",
    category: "practical",
    shortAnswer: "Church leadership qualifications focus on character and doctrine, not organizational affiliations.",
    detailedResponse: "Church leadership qualifications in Scripture focus on character, doctrine, and conduct—not organizational affiliations. Many Greek members demonstrate the fruit of the Spirit and sound doctrine. Excluding them based on membership alone creates an unbiblical standard. Evaluate each person based on biblical criteria, not categorical assumptions.",
    scriptures: [
      { ref: "1 Timothy 3:1-7", text: "Now the overseer is to be above reproach, faithful to his wife, temperate, self-controlled, respectable..." },
      { ref: "Titus 1:6-9", text: "An elder must be blameless, faithful to his wife, a man whose children believe..." },
      { ref: "Galatians 3:28", text: "There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus." }
    ],
    tags: ["leadership", "church", "ministry", "qualifications", "exclusion"]
  }
];

export const mythCategories = [
  { id: "all", label: "All Topics" },
  { id: "theology", label: "Theology" },
  { id: "practical", label: "Practical" },
  { id: "history", label: "History" },
  { id: "culture", label: "Culture" }
];
