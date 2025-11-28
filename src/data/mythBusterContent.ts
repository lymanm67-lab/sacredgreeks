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
  }
];

export const mythCategories = [
  { id: "all", label: "All Topics" },
  { id: "theology", label: "Theology" },
  { id: "practical", label: "Practical" },
  { id: "history", label: "History" },
  { id: "culture", label: "Culture" }
];
