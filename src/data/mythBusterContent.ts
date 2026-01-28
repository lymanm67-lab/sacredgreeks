export type ProofCategory = 'pledge-process' | 'rituals' | 'oaths' | 'obscurity' | 'founders';

export interface MythEntry {
  id: string;
  myth: string;
  category: string;
  proofCategory?: ProofCategory;
  scenario?: string;
  organization?: string;
  shortAnswer: string;
  detailedResponse: string;
  scriptures: { ref: string; text: string }[];
  relatedArticle?: string;
  relatedArticleUrl?: string;
  tags: string[];
}

export const mythBusterContent: MythEntry[] = [
// Community & Service
  {
    id: "greeks-dont-serve",
    myth: "Greeks Don't Serve the Community Like the Church Does",
    category: "community",
    scenario: "Church Challenge",
    organization: "BGLO",
    shortAnswer: "Greek organizations only pretend to serve—their community work is just for show.",
    detailedResponse: "Greek organizations collectively contribute billions in scholarships and millions of volunteer hours annually. While motives vary among individuals (as in any group, including churches), the tangible impact of Greek service is undeniable. Judge by fruits, not assumptions about motives.",
    scriptures: [
      { ref: "Matthew 7:16-20", text: "By their fruit you will recognize them. Do people pick grapes from thornbushes, or figs from thistles? Likewise, every good tree bears good fruit, but a bad tree bears bad fruit." },
      { ref: "James 2:14-17", text: "What good is it, my brothers and sisters, if someone claims to have faith but has no deeds? Can such faith save them? Faith by itself, if it is not accompanied by action, is dead." },
      { ref: "Galatians 6:9-10", text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up. Therefore, as we have opportunity, let us do good to all people." }
    ],
    tags: ["service", "community", "authenticity", "impact"]
  },
  {
    id: "dark-historical-roots",
    myth: "Greek Organizations Have Dark Historical Roots",
    category: "history",
    proofCategory: "founders",
    scenario: "Church Challenge",
    organization: "BGLO",
    shortAnswer: "Greek organizations were founded on occult and pagan principles that still influence them today.",
    detailedResponse: "Many institutions have complex historical origins without those origins defining current practice. The early church met in homes that may have hosted pagan rituals before. What matters is present-day purpose and practice. Most Greek organizations today focus on scholarship, service, and brotherhood/sisterhood, regardless of historical claims.",
    scriptures: [
      { ref: "1 Corinthians 6:11", text: "And that is what some of you were. But you were washed, you were sanctified, you were justified in the name of the Lord Jesus Christ and by the Spirit of our God." },
      { ref: "Isaiah 43:18-19", text: "Forget the former things; do not dwell on the past. See, I am doing a new thing! Now it springs up; do you not perceive it?" },
      { ref: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" }
    ],
    tags: ["history", "origins", "occult", "founders"]
  },
  {
    id: "founded-to-mock",
    myth: "Greek Organizations Were Founded to Mock Christianity",
    category: "history",
    proofCategory: "founders",
    scenario: "Social Media Defense",
    organization: "BGLO",
    shortAnswer: "These organizations were created specifically to pull Black people away from the church.",
    detailedResponse: "Historical evidence doesn't support this claim. Most Greek organizations were founded to address educational barriers, create support networks, and promote service during periods of segregation. Many founders were churchgoing believers. Research actual founding documents rather than accepting unverified claims.",
    scriptures: [
      { ref: "Proverbs 18:17", text: "In a lawsuit the first to speak seems right, until someone comes forward and cross-examines." },
      { ref: "Proverbs 25:2", text: "It is the glory of God to conceal a matter; to search out a matter is the glory of kings." },
      { ref: "John 8:32", text: "Then you will know the truth, and the truth will set you free." }
    ],
    tags: ["history", "founders", "church", "misinformation"]
  },
  {
    id: "time-for-service",
    myth: "Will I Have Time for Service and Ministry?",
    category: "community",
    scenario: "Prospective Member Question",
    shortAnswer: "Greek life seems busy—will I still be able to serve my community and church?",
    detailedResponse: "Greek organizations often require service hours, which can complement your ministry calling. Many Greeks find that organizational service opens doors for faith conversations. Time management is key for any busy believer. Greeks who prioritize well often expand their service impact significantly.",
    scriptures: [
      { ref: "Galatians 6:9-10", text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up. Therefore, as we have opportunity, let us do good to all people." },
      { ref: "Ephesians 5:15-16", text: "Be very careful, then, how you live—not as unwise but as wise, making the most of every opportunity, because the days are evil." },
      { ref: "Colossians 4:5", text: "Be wise in the way you act toward outsiders; make the most of every opportunity." }
    ],
    tags: ["service", "time", "ministry", "balance"]
  },
  {
    id: "honor-god-greek",
    myth: "Can I Honor God in a Greek Organization?",
    category: "identity",
    scenario: "Prospective Member Question",
    shortAnswer: "I want to join but I'm not sure if I can maintain my faith and honor God as a Greek.",
    detailedResponse: "Absolutely. Countless believers have glorified God through Greek membership—serving, leading, and witnessing. Daniel honored God in Babylon's court. Joseph honored God in Pharaoh's house. Your Greek organization can be your mission field if you maintain spiritual disciplines and community.",
    scriptures: [
      { ref: "Daniel 6:3-4", text: "Now Daniel so distinguished himself among the administrators and the satraps by his exceptional qualities that the king planned to set him over the whole kingdom." },
      { ref: "Genesis 41:38-39", text: "So Pharaoh asked them, 'Can we find anyone like this man, one in whom is the spirit of God?' Then Pharaoh said to Joseph, 'Since God has made all this known to you, there is no one so discerning and wise as you.'" },
      { ref: "Colossians 3:23-24", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters. It is the Lord Christ you are serving." }
    ],
    tags: ["joining", "faith", "honor God", "prospective"]
  },
  {
    id: "kingdom-impact",
    myth: "Greeks Can't Really Make a Kingdom Impact",
    category: "community",
    scenario: "Personal Doubt",
    organization: "BGLO",
    shortAnswer: "Real ministry happens in church, not through Greek organizations.",
    detailedResponse: "The Great Commission sends us into all the world—including Greek life. Some of the most fruitful evangelism happens in contexts the institutional church rarely reaches. Your Greek platform can be a unique mission field. Don't underestimate what God can do through you where you are.",
    scriptures: [
      { ref: "Matthew 28:19-20", text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you." },
      { ref: "1 Corinthians 9:22", text: "To the weak I became weak, to win the weak. I have become all things to all people so that by all possible means I might save some." },
      { ref: "Acts 1:8", text: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth." }
    ],
    tags: ["impact", "ministry", "mission", "evangelism"]
  },
  {
    id: "hypocrite-at-church",
    myth: "Being Greek Makes Me a Hypocrite at Church",
    category: "lifestyle",
    scenario: "Personal Doubt",
    shortAnswer: "I feel like a fraud going to church while being active in my Greek organization.",
    detailedResponse: "Hypocrisy is pretending to be something you're not. If you genuinely love God and are growing in faith, Greek membership doesn't make you a hypocrite. Many faithful Christians serve in secular contexts. Be authentic about both identities, letting Christ be Lord of all areas of your life.",
    scriptures: [
      { ref: "Matthew 23:27-28", text: "Woe to you, teachers of the law and Pharisees, you hypocrites! You are like whitewashed tombs, which look beautiful on the outside but on the inside are full of the bones of the dead." },
      { ref: "Colossians 3:17", text: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him." },
      { ref: "Romans 12:9", text: "Love must be sincere. Hate what is evil; cling to what is good." }
    ],
    tags: ["hypocrisy", "authenticity", "church", "identity"]
  },
  {
    id: "past-disqualifies",
    myth: "My Greek Past Disqualifies Me From Ministry",
    category: "history",
    scenario: "Personal Doubt",
    shortAnswer: "Because of things I did or witnessed in Greek life, I'm not worthy to serve God.",
    detailedResponse: "Paul persecuted the church yet became its greatest missionary. Peter denied Christ three times yet led the early church. Your past—Greek or otherwise—does not disqualify you from God's grace or service. Redemption is the whole point of the Gospel.",
    scriptures: [
      { ref: "1 Timothy 1:15-16", text: "Here is a trustworthy saying that deserves full acceptance: Christ Jesus came into the world to save sinners—of whom I am the worst. But for that very reason I was shown mercy." },
      { ref: "John 21:15-17", text: "When they had finished eating, Jesus said to Simon Peter, 'Simon son of John, do you love me more than these?' 'Yes, Lord,' he said, 'you know that I love you.' Jesus said, 'Feed my lambs.'" },
      { ref: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" }
    ],
    tags: ["past", "ministry", "redemption", "qualification"]
  },
  {
    id: "founder-beliefs",
    myth: "Greek Founders Had Questionable Religious Beliefs",
    category: "history",
    proofCategory: "founders",
    scenario: "Ministry Leader Concern",
    organization: "BGLO",
    shortAnswer: "Some Greek organization founders held non-Christian beliefs, so we should question members' faith.",
    detailedResponse: "The founders' beliefs don't determine current members' faith. Many institutions with complex origins serve godly purposes today. Evaluate individuals by their confession of Christ and fruit of the Spirit, not by organizational genealogy. Paul was trained by Gamaliel but became Christ's apostle.",
    scriptures: [
      { ref: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" },
      { ref: "Acts 22:3", text: "I am a Jew, born in Tarsus of Cilicia, but brought up in this city. I studied under Gamaliel and was thoroughly trained in the law of our ancestors." },
      { ref: "Philippians 3:7-8", text: "But whatever were gains to me I now consider loss for the sake of Christ. What is more, I consider everything a loss because of the surpassing worth of knowing Christ Jesus my Lord." }
    ],
    tags: ["founders", "history", "beliefs", "evaluation"]
  },
  {
    id: "compete-church-community",
    myth: "Greek Organizations Compete With Church Community",
    category: "community",
    scenario: "Ministry Leader Concern",
    shortAnswer: "Greek membership creates divided loyalties that weaken church community and small group participation.",
    detailedResponse: "Many believers navigate multiple communities—work, family, hobby groups—while maintaining church commitment. Greeks can bring unique perspectives and connections to church life. The key is helping all members prioritize spiritual community while honoring other commitments.",
    scriptures: [
      { ref: "Hebrews 10:24-25", text: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another." },
      { ref: "Acts 2:42-47", text: "They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer... Every day they continued to meet together in the temple courts." },
      { ref: "Colossians 3:14-16", text: "And over all these virtues put on love, which binds them all together in perfect unity. Let the peace of Christ rule in your hearts." }
    ],
    tags: ["community", "loyalty", "small groups", "church"]
  },
  // RITUALS - Consolidated Section
  {
    id: "rituals-and-ceremonies",
    myth: "Greek Rituals and Ceremonies Conflict With Christianity",
    category: "rituals",
    proofCategory: "rituals",
    scenario: "Prospective Member Question",
    organization: "BGLO",
    shortAnswer: "I'm concerned about participating in Greek rituals. Will they conflict with my faith?",
    detailedResponse: "Ritual content varies by organization. Many focus on history, commitment, and values—not religious worship. Before joining, ask questions about ceremony content. Trust your conscience led by Scripture. Many faith traditions have sacred ceremonies (communion, baptism, weddings). Privacy doesn't equal evil—what matters is the content and purpose. If anything clearly violates biblical principles, you can respectfully decline that element.",
    scriptures: [
      { ref: "Romans 14:5", text: "One person considers one day more sacred than another; another considers every day alike. Each of them should be fully convinced in their own mind." },
      { ref: "1 Thessalonians 5:21", text: "Test everything; hold fast what is good." },
      { ref: "Acts 17:11", text: "Now the Berean Jews were of more noble character than those in Thessalonica, for they received the message with great eagerness and examined the Scriptures every day." }
    ],
    tags: ["rituals", "ceremonies", "joining", "discernment"]
  },
  {
    id: "secret-rituals-concern",
    myth: "Why Would a Christian Join Something With Private Ceremonies?",
    category: "rituals",
    proofCategory: "obscurity",
    scenario: "Church Challenge",
    shortAnswer: "Christians shouldn't join organizations with private ceremonies because secrecy equals deception.",
    detailedResponse: "Privacy is not the same as secrecy. Jesus had inner circle moments with Peter, James, and John. Private ceremonies can simply mean membership-only experiences, like many professional organizations. The question is whether the content violates Scripture, not whether it's public. Many Greek rituals focus on history, values, and community bonds—similar to how even Jesus taught some things privately to His disciples.",
    scriptures: [
      { ref: "Mark 5:37", text: "He did not let anyone follow him except Peter, James and John the brother of James." },
      { ref: "Mark 9:2", text: "After six days Jesus took Peter, James and John with him and led them up a high mountain, where they were all alone. There he was transfigured before them." },
      { ref: "Matthew 6:6", text: "But when you pray, go into your room, close the door and pray to your Father, who is unseen. Then your Father, who sees what is done in secret, will reward you." }
    ],
    tags: ["secrecy", "privacy", "rituals", "transparency"]
  },
  {
    id: "symbols-demonic",
    myth: "Greek Symbols and Letters Are Demonic",
    category: "rituals",
    proofCategory: "rituals",
    scenario: "Social Media Defense",
    organization: "BGLO",
    shortAnswer: "All the Greek symbols, hand signs, and letters are actually demonic symbols or idols.",
    detailedResponse: "This claim ignores context and intent. Greek letters are simply alphabet characters—Paul wrote in Greek! Hand signs typically represent organizational identity, not occult meanings. Similar logic would condemn the 'OK' sign or peace symbol. God himself instructed Israel to use colors, stones, and designs in the tabernacle. The danger comes when any symbol is exalted above the Savior. Judge symbols by their actual use and meaning within context, not conspiracy theories.",
    scriptures: [
      { ref: "Romans 14:14", text: "I am convinced, being fully persuaded in the Lord Jesus, that nothing is unclean in itself. But if anyone regards something as unclean, then for that person it is unclean." },
      { ref: "1 Corinthians 8:4-6", text: "We know that 'An idol is nothing at all in the world' and that 'There is no God but one.' For even if there are so-called gods, whether in heaven or on earth... yet for us there is but one God." },
      { ref: "Exodus 28:2-5", text: "Make sacred garments for your brother Aaron to give him dignity and honor... These are the garments they are to make: a breastpiece, an ephod, a robe, a woven tunic, a turban and a sash." }
    ],
    tags: ["symbols", "demonic", "signs", "conspiracy", "letters", "idols"]
  },
  {
    id: "step-shows-pagan",
    myth: "Greek Step Shows and Strolling Are Pagan Worship",
    category: "rituals",
    proofCategory: "rituals",
    scenario: "Church Setting",
    organization: "BGLO",
    shortAnswer: "When Greeks step or stroll, they're performing pagan rituals that invite demons.",
    detailedResponse: "Movement and rhythm do not belong to the devil. Stepping and strolling are cultural art forms expressing unity and organizational pride—not worship rituals. David danced before the Lord with abandon. Israel marched in processions. African and African American worship has always involved the body. The question is what is being celebrated and spoken in those moments. Cultural expression can be reclaimed as instruments of worship and witness.",
    scriptures: [
      { ref: "2 Samuel 6:14", text: "Wearing a linen ephod, David was dancing before the Lord with all his might." },
      { ref: "Psalm 149:3", text: "Let them praise his name with dancing and make music to him with timbrel and harp." },
      { ref: "Romans 12:1", text: "Therefore, I urge you, brothers and sisters, in view of God's mercy, to offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship." }
    ],
    tags: ["stepping", "strolling", "dance", "culture", "movement"]
  },
  {
    id: "pledging-bondage",
    myth: "Pledging or Intake Is Spiritual Bondage",
    category: "rituals",
    proofCategory: "pledge-process",
    scenario: "Personal Doubt",
    shortAnswer: "The pledging or intake process is always spiritual bondage.",
    detailedResponse: "Spiritual bondage refers to being enslaved to sin, darkness, or demonic influence—not any form of commitment or structured process. Baptism is a pledge. Marriage is a covenant. The military has boot camp. The question is whether the intake process requires sin, abuse, or worship of anything besides God. If it does, refuse. If it does not, discern and engage wisely. Many chapters have reformed their processes to focus on education, mentorship, and service.",
    scriptures: [
      { ref: "Galatians 5:1", text: "It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery." },
      { ref: "Romans 6:16-18", text: "Don't you know that when you offer yourselves to someone as obedient slaves, you are slaves of the one you obey... You have been set free from sin and have become slaves to righteousness." },
      { ref: "1 Peter 2:16", text: "Live as free people, but do not use your freedom as a cover-up for evil; live as God's slaves." }
    ],
    tags: ["pledging", "intake", "bondage", "freedom"]
  },
  {
    id: "greek-oaths-sinful",
    myth: "Greek Oaths and Vows Are Sinful",
    category: "rituals",
    proofCategory: "oaths",
    scenario: "Church Challenge",
    organization: "BGLO",
    shortAnswer: "Taking oaths in Greek organizations violates Scripture's commands against swearing oaths.",
    detailedResponse: "Jesus' teaching on oaths (Matthew 5:33-37) addresses dishonest oath-taking and manipulation—not all commitments. Marriage vows, court testimony, military oaths, and baptismal confessions are all forms of solemn commitment Christians regularly make. The issue is whether an oath requires you to promise something sinful, worship something other than God, or make commitments you cannot keep. Greek organizational oaths typically involve commitments to scholarship, service, and brotherhood/sisterhood—values consistent with Christian living. Evaluate the content of specific oaths, not the concept of making commitments.",
    scriptures: [
      { ref: "Matthew 5:33-37", text: "Again, you have heard that it was said to the people long ago, 'Do not break your oath, but fulfill to the Lord the vows you have made.' But I tell you, do not swear an oath at all... All you need to say is simply 'Yes' or 'No'; anything beyond this comes from the evil one." },
      { ref: "Ecclesiastes 5:4-5", text: "When you make a vow to God, do not delay to fulfill it. He has no pleasure in fools; fulfill your vow. It is better not to make a vow than to make one and not fulfill it." },
      { ref: "Numbers 30:2", text: "When a man makes a vow to the Lord or takes an oath to obligate himself by a pledge, he must not break his word but must do everything he said." },
      { ref: "Hebrews 6:16-17", text: "People swear by someone greater than themselves, and the oath confirms what is said and puts an end to all argument. Because God wanted to make the unchanging nature of his purpose very clear to the heirs of what was promised, he confirmed it with an oath." }
    ],
    tags: ["oaths", "vows", "swearing", "commitment", "promises", "pledges"]
  },
  {
    id: "greeks-have-spirits",
    myth: "Greeks Are Bound by Spirits Attached to Organizations",
    category: "rituals",
    scenario: "Church Challenge",
    organization: "BGLO",
    shortAnswer: "Greeks are bound by spirits attached to their organizations.",
    detailedResponse: "The claim that blanket demonic attachment occurs at membership is not supported by Scripture. Believers are sealed by the Holy Spirit. Demons are not attached to acronyms—they influence through sin, deception, and unrepentance. If a believer in Christ is walking in the light, they are protected by the blood of Jesus and the power of the Holy Spirit, regardless of any past or present group affiliation.",
    scriptures: [
      { ref: "Ephesians 1:13-14", text: "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance until the redemption of those who are God's possession." },
      { ref: "1 John 5:18", text: "We know that anyone born of God does not continue to sin; the One who was born of God keeps them safe, and the evil one cannot harm them." },
      { ref: "Romans 8:1-2", text: "Therefore, there is now no condemnation for those who are in Christ Jesus, because through Christ Jesus the law of the Spirit who gives life has set you free." }
    ],
    tags: ["spirits", "demons", "bondage", "protection"]
  },
  // End Rituals Section
  {
    id: "worldly-influences",
    myth: "Greek Members Bring Worldly Influences Into Church",
    category: "lifestyle",
    scenario: "Ministry Leader Concern",
    shortAnswer: "Greek members introduce worldly attitudes and practices that contaminate our church culture.",
    detailedResponse: "Every person brings their background into church—that's the nature of a redeemed community. The church exists to transform people, not exclude those with different experiences. Greeks can bring valuable leadership skills, service orientation, and network connections to benefit the body of Christ.",
    scriptures: [
      { ref: "1 Corinthians 12:12-27", text: "Just as a body, though one, has many parts, but all its many parts form one body, so it is with Christ. For we were all baptized by one Spirit so as to form one body." },
      { ref: "Mark 2:17", text: "On hearing this, Jesus said to them, 'It is not the healthy who need a doctor, but the sick. I have not come to call the righteous, but sinners.'" },
      { ref: "Romans 12:2", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is." }
    ],
    tags: ["worldliness", "church culture", "influence", "transformation"]
  },
  {
    id: "greeks-self-serving",
    myth: "Greeks Only Care About Themselves",
    category: "community",
    scenario: "Family Objection",
    organization: "BGLO",
    shortAnswer: "Greek organizations are just self-serving social clubs with no real community impact.",
    detailedResponse: "Facts contradict this claim. Greek organizations collectively donate hundreds of millions to charity, provide scholarships, and log millions of volunteer hours annually. While any group has self-interested individuals, the organizational mandates and documented impact tell a different story.",
    scriptures: [
      { ref: "Philippians 2:3-4", text: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves, not looking to your own interests but each of you to the interests of the others." },
      { ref: "Galatians 5:13", text: "You, my brothers and sisters, were called to be free. But do not use your freedom to indulge the flesh; rather, serve one another humbly in love." },
      { ref: "Acts 20:35", text: "In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words the Lord Jesus himself said: 'It is more blessed to give than to receive.'" }
    ],
    tags: ["service", "selfish", "community", "impact"]
  },
  {
    id: "career-help",
    myth: "Joining Won't Help Your Career or Community",
    category: "community",
    scenario: "Family Discussion",
    shortAnswer: "Greek life is just social clubs—they won't actually help you serve others or advance professionally.",
    detailedResponse: "Greek organizations have extensive alumni networks that support career development and community initiatives. Members often access mentorship, scholarships, and service opportunities. The network effect is real, and many Greeks leverage it for kingdom impact in their professions.",
    scriptures: [
      { ref: "Proverbs 27:17", text: "As iron sharpens iron, so one person sharpens another." },
      { ref: "Ecclesiastes 4:9-12", text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up." },
      { ref: "Hebrews 10:24", text: "And let us consider how we may spur one another on toward love and good deeds." }
    ],
    tags: ["career", "network", "service", "community"]
  },
  {
    id: "ungodly-values",
    myth: "Greek Organizations Promote Ungodly Values",
    category: "history",
    scenario: "Family Discussion",
    shortAnswer: "These organizations will teach you values that conflict with your Christian upbringing.",
    detailedResponse: "Most Greek organization values—scholarship, service, sisterhood/brotherhood, leadership—align with biblical principles. The key is examining specific practices, not making broad assumptions. Many Greek members credit their organizations with reinforcing values their families instilled.",
    scriptures: [
      { ref: "Philippians 4:8", text: "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things." },
      { ref: "Proverbs 22:6", text: "Start children off on the way they should go, and even when they are old they will not turn from it." },
      { ref: "Micah 6:8", text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God." }
    ],
    tags: ["values", "family", "upbringing", "principles"]
  },
  {
    id: "events-over-ministry",
    myth: "Greeks Care More About Events Than Ministry",
    category: "community",
    scenario: "Church Setting",
    organization: "BGLO",
    shortAnswer: "Greek organizations prioritize parties and events over actual community ministry.",
    detailedResponse: "Many Greek organizations have robust service portfolios addressing education, health, and social justice. The visibility of social events shouldn't overshadow substantial community impact. Similarly, churches have fellowship events alongside ministry. Balance doesn't equal spiritual compromise.",
    scriptures: [
      { ref: "Ecclesiastes 3:1-4", text: "There is a time for everything, and a season for every activity under the heavens: a time to weep and a time to laugh, a time to mourn and a time to dance." },
      { ref: "Nehemiah 8:10", text: "Go and enjoy choice food and sweet drinks, and send some to those who have nothing prepared. This day is holy to our Lord. Do not grieve, for the joy of the Lord is your strength." },
      { ref: "Galatians 6:10", text: "Therefore, as we have opportunity, let us do good to all people, especially to those who belong to the family of believers." }
    ],
    tags: ["events", "ministry", "service", "balance"]
  },
  {
    id: "recruiting-at-church",
    myth: "Greeks in Church Are Just Recruiting",
    category: "lifestyle",
    scenario: "Church Setting",
    organization: "BGLO",
    shortAnswer: "Greek members only come to church to network and recruit new members.",
    detailedResponse: "Assuming negative motives about anyone attending church is uncharitable. Many Greeks attend church because they genuinely love God. Rather than suspicion, extend the same grace you would to any visitor. If someone does have mixed motives, the Word preached can still transform hearts.",
    scriptures: [
      { ref: "Isaiah 55:11", text: "So is my word that goes out from my mouth: It will not return to me empty, but will accomplish what I desire and achieve the purpose for which I sent it." },
      { ref: "Philippians 1:15-18", text: "It is true that some preach Christ out of envy and rivalry, but others out of goodwill... But what does it matter? The important thing is that in every way, whether from false motives or true, Christ is preached." },
      { ref: "Hebrews 10:24-25", text: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together." }
    ],
    tags: ["church", "motives", "recruiting", "membership"]
  },
  {
    id: "wearing-letters-church",
    myth: "Should Greeks Wear Letters to Church?",
    category: "lifestyle",
    scenario: "Church Setting",
    shortAnswer: "Wearing Greek paraphernalia to church is inappropriate and distracting from worship.",
    detailedResponse: "Churches have varying dress expectations, but wearing organizational clothing is not inherently sinful. We wear school logos, sports jerseys, and professional attire without issue. The heart posture in worship matters more than apparel. Address this graciously as a preference issue, not a spiritual mandate.",
    scriptures: [
      { ref: "1 Samuel 16:7", text: "But the Lord said to Samuel, 'Do not consider his appearance or his height, for I have rejected him. The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.'" },
      { ref: "James 2:1-4", text: "My brothers and sisters, believers in our glorious Lord Jesus Christ must not show favoritism. Suppose a man comes into your meeting wearing a gold ring and fine clothes... have you not discriminated among yourselves?" },
      { ref: "Romans 14:13", text: "Therefore let us stop passing judgment on one another. Instead, make up your mind not to put any stumbling block or obstacle in the way of a brother or sister." }
    ],
    tags: ["church", "letters", "worship", "dress code"]
  },
  {
    id: "time-away-church",
    myth: "Will Greek Life Take Time Away From Church?",
    category: "lifestyle",
    scenario: "Family Discussion",
    shortAnswer: "Greek organizations will consume all your time and pull you away from church and spiritual disciplines.",
    detailedResponse: "Time management is a stewardship issue for all believers regardless of organizational affiliations. Many Greeks serve faithfully in their local churches and maintain robust devotional lives. The key is setting boundaries and priorities. Joseph managed Pharaoh's entire household while maintaining his faith. We can do likewise.",
    scriptures: [
      { ref: "Ephesians 5:15-16", text: "Be very careful, then, how you live—not as unwise but as wise, making the most of every opportunity, because the days are evil." },
      { ref: "Colossians 4:5", text: "Be wise in the way you act toward outsiders; make the most of every opportunity." },
      { ref: "Genesis 39:2-4", text: "The Lord was with Joseph so that he prospered, and he lived in the house of his Egyptian master. When his master saw that the Lord was with him and that the Lord gave him success in everything he did." }
    ],
    tags: ["time", "church", "priorities", "commitment"]
  },
  {
    id: "faith-survive-greek",
    myth: "Can My Faith Survive Greek Life?",
    category: "identity",
    scenario: "Family Discussion",
    organization: "BGLO",
    shortAnswer: "If you join a sorority or fraternity, you'll lose your faith and become worldly.",
    detailedResponse: "Many believers thrive spiritually while active in Greek organizations. Daniel served in Babylon's court without compromising his faith. Your identity in Christ is not threatened by cultural participation when you maintain spiritual disciplines and accountability. In fact, Greek life can provide opportunities to be salt and light in spaces the church rarely reaches.",
    scriptures: [
      { ref: "Daniel 1:8", text: "But Daniel resolved not to defile himself with the royal food and wine, and he asked the chief official for permission not to defile himself this way." },
      { ref: "1 Corinthians 9:22", text: "To the weak I became weak, to win the weak. I have become all things to all people so that by all possible means I might save some." },
      { ref: "Matthew 5:13-16", text: "You are the salt of the earth... You are the light of the world. A town built on a hill cannot be hidden." }
    ],
    tags: ["faith", "family", "spiritual growth", "witness"]
  },
  {
    id: "letters-divided-loyalty",
    myth: "Are Greek Letters a Sign of Divided Loyalty?",
    category: "identity",
    scenario: "Family Discussion",
    shortAnswer: "Wearing Greek letters means you've pledged allegiance to something other than Christ.",
    detailedResponse: "Wearing organizational symbols does not constitute worship or divided loyalty any more than wearing a sports team jersey does. Paul instructs us to give honor where honor is due. Greek letters represent membership in a community of service and scholarship, not worship. Our ultimate allegiance remains with Christ, who can be glorified through our organizational involvement.",
    scriptures: [
      { ref: "Romans 13:7", text: "Give to everyone what you owe them: If you owe taxes, pay taxes; if revenue, then revenue; if respect, then respect; if honor, then honor." },
      { ref: "Colossians 3:17", text: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him." },
      { ref: "1 Corinthians 10:31", text: "So whether you eat or drink or whatever you do, do it all for the glory of God." }
    ],
    tags: ["letters", "loyalty", "symbols", "family concerns"]
  },
  {
    id: "compromising-staying",
    myth: "Am I Compromising by Staying Greek?",
    category: "identity",
    scenario: "Personal Doubt",
    organization: "BGLO",
    shortAnswer: "If you truly loved God, you would denounce your Greek letters and leave your organization.",
    detailedResponse: "Scripture does not require abandoning legitimate organizations to prove devotion to God. Naaman was told to continue serving in Rimmon's temple while maintaining his faith. Paul didn't demand that believing slaves leave their households. What matters is how we honor Christ within our contexts, not fleeing from every secular institution.",
    scriptures: [
      { ref: "2 Kings 5:18-19", text: "But may the Lord forgive your servant for this one thing: When my master enters the temple of Rimmon to bow down and he is leaning on my arm... may the Lord forgive your servant for this.' 'Go in peace,' Elisha said." },
      { ref: "1 Corinthians 7:20-24", text: "Each person should remain in the situation they were in when God called them... Brothers and sisters, each person, as responsible to God, should remain in the situation they were in when God called them." },
      { ref: "Colossians 3:23", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." }
    ],
    tags: ["compromise", "doubt", "leaving", "conviction"]
  },
  {
    id: "greek-and-holy",
    myth: "Can I Be Both Greek and Holy?",
    category: "identity",
    scenario: "Personal Doubt",
    shortAnswer: "You can't pursue holiness and be involved in Greek life—they're incompatible.",
    detailedResponse: "Holiness is about heart posture and obedience to God, not isolation from culture. Jesus was called a friend of sinners yet remained perfectly holy. Being set apart doesn't mean being separate from every organization. It means representing Christ wherever you are. Your Greek membership can be a platform for holy living and kingdom influence.",
    scriptures: [
      { ref: "John 17:15-18", text: "My prayer is not that you take them out of the world but that you protect them from the evil one. They are not of the world, even as I am not of it... As you sent me into the world, I have sent them into the world." },
      { ref: "1 Peter 1:15-16", text: "But just as he who called you is holy, so be holy in all you do; for it is written: 'Be holy, because I am holy.'" },
      { ref: "Matthew 9:10-13", text: "While Jesus was having dinner at Matthew's house, many tax collectors and sinners came and ate with him and his disciples... 'I have not come to call the righteous, but sinners.'" }
    ],
    tags: ["holiness", "sanctification", "culture", "identity"]
  },
  {
    id: "exclude-from-leadership",
    myth: "Should We Exclude Greeks From Leadership?",
    category: "ministry",
    scenario: "Ministry Leader Concern",
    organization: "BGLO",
    shortAnswer: "Greek members shouldn't hold positions in church leadership because of their divided loyalties.",
    detailedResponse: "Leadership qualification should be based on biblical criteria: character, gifting, and faithfulness. The New Testament never disqualifies someone based on external associations but on spiritual fruit and maturity. Many Greeks demonstrate exceptional leadership, service, and spiritual depth. Evaluate individuals, not affiliations.",
    scriptures: [
      { ref: "1 Timothy 3:1-13", text: "Here is a trustworthy saying: Whoever aspires to be an overseer desires a noble task. Now the overseer is to be above reproach..." },
      { ref: "Galatians 3:28", text: "There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus." },
      { ref: "Matthew 7:16", text: "By their fruit you will recognize them. Do people pick grapes from thornbushes, or figs from thistles?" }
    ],
    tags: ["leadership", "church", "exclusion", "qualifications"]
  },
  {
    id: "counsel-to-leave",
    myth: "We Should Counsel All Greeks to Leave Their Organizations",
    category: "ministry",
    scenario: "Ministry Leader Concern",
    shortAnswer: "The church should require Greek members to renounce their letters to be in good standing.",
    detailedResponse: "Adding requirements beyond faith in Christ creates a different gospel. Paul confronted Peter for exactly this kind of addition. Each believer must examine their conscience before the Lord. Some may feel convicted to leave; others may feel called to stay and shine. Both can be honoring God. Uniformity isn't required.",
    scriptures: [
      { ref: "Galatians 2:11-14", text: "When Cephas came to Antioch, I opposed him to his face, because he stood condemned. For before certain men came from James, he used to eat with the Gentiles. But when they arrived, he began to draw back and separate himself." },
      { ref: "Romans 14:1-4", text: "Accept the one whose faith is weak, without quarreling over disputable matters... Who are you to judge someone else's servant? To their own master, servants stand or fall." },
      { ref: "1 Corinthians 7:17", text: "Nevertheless, each person should live as a believer in whatever situation the Lord has assigned to them, just as God has called them." }
    ],
    tags: ["leaving", "requirements", "counsel", "legalism"]
  },
  {
    id: "hurt-witness",
    myth: "Joining Will Hurt My Christian Witness",
    category: "ministry",
    scenario: "Prospective Member Question",
    shortAnswer: "If I join a fraternity or sorority, people will question my faith and testimony.",
    detailedResponse: "Jesus was criticized for eating with tax collectors and sinners, yet His testimony remained powerful because His character was consistent. Your witness depends on how you live, not where you hold membership. Greeks with strong testimonies can actually enhance their witness by bringing light into spaces that need it most.",
    scriptures: [
      { ref: "Matthew 11:19", text: "The Son of Man came eating and drinking, and they say, 'Here is a glutton and a drunkard, a friend of tax collectors and sinners.' But wisdom is proved right by her deeds." },
      { ref: "Luke 19:1-10", text: "Jesus entered Jericho and was passing through. A man was there by the name of Zacchaeus... 'Today salvation has come to this house.'" },
      { ref: "Philippians 2:14-16", text: "Do everything without grumbling or arguing, so that you may become blameless and pure, 'children of God without fault in a warped and crooked generation.' Then you will shine among them like stars in the sky." }
    ],
    tags: ["testimony", "witness", "joining", "reputation"]
  },
  {
    id: "worship-false-gods",
    myth: "Is It True Greeks Worship False Gods?",
    category: "worship",
    scenario: "Prospective Member Question",
    organization: "BGLO",
    shortAnswer: "Greek organizations secretly worship Egyptian or Greek gods during their ceremonies.",
    detailedResponse: "This claim conflates cultural symbolism with actual worship. Many organizations use historical symbols without ascribing religious significance. Even Paul noted that idols are nothing—the key is what's in the heart. Ask specific questions about your organization and evaluate based on actual practices, not rumors.",
    scriptures: [
      { ref: "1 Corinthians 8:4-6", text: "We know that 'An idol is nothing at all in the world' and that 'There is no God but one.' For even if there are so-called gods... yet for us there is but one God, the Father." },
      { ref: "Acts 17:22-23", text: "Paul then stood up in the meeting of the Areopagus and said: 'People of Athens! I see that in every way you are very religious. For as I walked around and looked carefully at your objects of worship...'" },
      { ref: "1 Corinthians 10:25-26", text: "Eat anything sold in the meat market without raising questions of conscience, for, 'The earth is the Lord's, and everything in it.'" }
    ],
    tags: ["worship", "idolatry", "gods", "symbols", "origins"]
  },
  {
    id: "cant-be-real-christians",
    myth: "Greeks Can't Be Real Christians",
    category: "identity",
    scenario: "Social Media Defense",
    shortAnswer: "If you're in a fraternity or sorority, you're obviously not living for Christ.",
    detailedResponse: "This is a classic guilt-by-association fallacy. Scripture judges individuals by their fruit, not their affiliations. Many devoted followers of Christ have served in Greek organizations while maintaining vibrant testimonies. Judge the tree by its fruit, not by the label on its branch.",
    scriptures: [
      { ref: "Matthew 7:16-20", text: "By their fruit you will recognize them. Do people pick grapes from thornbushes, or figs from thistles? Likewise, every good tree bears good fruit." },
      { ref: "John 7:24", text: "Stop judging by mere appearances, but instead judge correctly." },
      { ref: "James 2:1-4", text: "My brothers and sisters, believers in our glorious Lord Jesus Christ must not show favoritism." }
    ],
    tags: ["social media", "judgment", "Christianity", "authenticity"]
  },
  {
    id: "just-about-partying",
    myth: "Greek Organizations Are Just About Partying",
    category: "lifestyle",
    scenario: "Social Media Defense",
    organization: "BGLO",
    shortAnswer: "All Greeks do is party and engage in ungodly behavior—there's no redeeming value.",
    detailedResponse: "Stereotyping an entire community based on selective examples is unfair and inaccurate. Greek organizations have contributed billions in scholarships, millions of volunteer hours, and countless community initiatives. Many Greeks live exemplary lives of service. The presence of some who party doesn't define the whole any more than hypocrites in church define all Christians.",
    scriptures: [
      { ref: "Proverbs 18:13", text: "To answer before listening—that is folly and shame." },
      { ref: "John 7:24", text: "Stop judging by mere appearances, but instead judge correctly." },
      { ref: "James 4:11-12", text: "Brothers and sisters, do not slander one another. Anyone who speaks against a brother or sister or judges them speaks against the law and judges it." }
    ],
    tags: ["partying", "stereotypes", "service", "community"]
  },
  {
    id: "more-loyal-to-org",
    myth: "Aren't Greeks More Loyal to Their Org Than to Christ?",
    category: "worship",
    scenario: "Church Challenge",
    organization: "BGLO",
    shortAnswer: "Greek members put their organization above their faith—they worship their letters.",
    detailedResponse: "Having strong organizational commitment doesn't equal idolatry. Paul had deep loyalty to his Jewish heritage while being fully devoted to Christ. The question is priority, not elimination. Greeks can love their organizations deeply while maintaining Christ as supreme Lord. It's about rightly ordered affections, not absent ones.",
    scriptures: [
      { ref: "Philippians 3:4-8", text: "If someone else thinks they have reasons to put confidence in the flesh, I have more... But whatever were gains to me I now consider loss for the sake of Christ." },
      { ref: "Colossians 1:18", text: "And he is the head of the body, the church; he is the beginning and the firstborn from among the dead, so that in everything he might have the supremacy." },
      { ref: "1 Corinthians 10:31", text: "So whether you eat or drink or whatever you do, do it all for the glory of God." }
    ],
    tags: ["loyalty", "idolatry", "priorities", "devotion"]
  },
  {
    id: "god-cannot-use",
    myth: "God Cannot Use Greek Life For His Purposes",
    category: "ministry",
    scenario: "Church Challenge",
    shortAnswer: "God cannot possibly use Greek Life for his purposes.",
    detailedResponse: "God has used pagan kings, corrupt governments, and secular systems to position his people and advance his plans. He used Pharaoh to display his power. He used Cyrus to send Israel home. He used Roman roads and Greek language to spread the gospel. If God can do that with empires, he can certainly use a small Greek chapter full of flawed but willing young adults. The question is not 'Can God.' The question is 'Will we be available.'",
    scriptures: [
      { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
      { ref: "Genesis 50:20", text: "You intended to harm me, but God intended it for good to accomplish what is now being done, the saving of many lives." },
      { ref: "Acts 18:24-28", text: "Meanwhile a Jew named Apollos, a native of Alexandria, came to Ephesus. He was a learned man, with a thorough knowledge of the Scriptures." }
    ],
    tags: ["God's purposes", "sovereignty", "available", "mission"]
  },
  {
    id: "unequally-yoked-bglo",
    myth: "BGLOs Violate 'Unequally Yoked'",
    category: "identity",
    scenario: "Church Challenge",
    shortAnswer: "Being in a BGLO automatically violates 'do not be unequally yoked.'",
    detailedResponse: "Second Corinthians 6 warns against partnerships that pull believers into idolatry and lawlessness. It is about spiritual yoking, not every shared membership. If that passage applied to any mixed environment, no Christian could attend a public school, work in a company, or serve in the military. The question is 'Does this membership require me to participate in sin or deny Christ.' If yes, you must say no. If no, you must still be wise about close partnerships and inner circles.",
    scriptures: [
      { ref: "2 Corinthians 6:14-18", text: "Do not be yoked together with unbelievers. For what do righteousness and wickedness have in common? Or what fellowship can light have with darkness?" },
      { ref: "John 17:15", text: "My prayer is not that you take them out of the world but that you protect them from the evil one." },
      { ref: "1 Corinthians 5:9-10", text: "I wrote to you in my letter not to associate with sexually immoral people—not at all meaning the people of this world who are immoral... In that case you would have to leave this world." }
    ],
    tags: ["unequally yoked", "partnerships", "membership", "worldly"]
  },
  {
    id: "cannot-evangelize",
    myth: "You Cannot Evangelize Within Greek Life",
    category: "ministry",
    scenario: "Church Challenge",
    shortAnswer: "You cannot evangelize or disciple within Greek Life.",
    detailedResponse: "The Great Commission never excluded Greek Row. Jesus sent his followers into all the world. Paul preached in synagogues, marketplaces, lecture halls, and private homes. Anywhere people gather, there is room for witness. Greek chapters include students who are hurting, questioning, and searching. A humble, consistent Christian presence can be a powerful bridge that no outside critic will ever have.",
    scriptures: [
      { ref: "Matthew 28:18-20", text: "Then Jesus came to them and said, 'All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations.'" },
      { ref: "Acts 19:8-10", text: "Paul entered the synagogue and spoke boldly there for three months, arguing persuasively about the kingdom of God... This went on for two years, so that all the Jews and Greeks who lived in the province of Asia heard the word of the Lord." },
      { ref: "1 Peter 3:15", text: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have." }
    ],
    tags: ["evangelism", "discipleship", "witness", "Great Commission"]
  },
  {
    id: "brotherhood-idolatrous",
    myth: "Brotherhood and Sisterhood Are Always Idolatrous",
    category: "worship",
    scenario: "Personal Doubt",
    shortAnswer: "Brotherhood and sisterhood in Greek Life are always idolatrous.",
    detailedResponse: "Brotherhood and sisterhood are biblical words. The early church was built on covenant community, shared burdens, and sacrificial love. The problem is not deep bonds. The problem is when those bonds demand disobedience to God, silence about sin, or loyalty to wrong. Healthy Greek relationships can mirror biblical fellowship when they are honest, accountable, and Christ centered. Unhealthy ones can become idols. The same is true of any community.",
    scriptures: [
      { ref: "John 13:34-35", text: "A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another." },
      { ref: "Acts 2:42-47", text: "They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer... Every day they continued to meet together in the temple courts." },
      { ref: "Luke 14:26", text: "If anyone comes to me and does not hate father and mother, wife and children, brothers and sisters—yes, even their own life—such a person cannot be my disciple." }
    ],
    tags: ["brotherhood", "sisterhood", "fellowship", "community"]
  },
  {
    id: "service-not-ministry",
    myth: "BGLO Service Does Not Count As Ministry",
    category: "ministry",
    scenario: "Church Challenge",
    shortAnswer: "Service through BGLOs does not 'count' as Christian ministry.",
    detailedResponse: "Jesus never said ministry only counts if it is done under a church logo. He described ministry as feeding the hungry, clothing the naked, visiting the sick and imprisoned, and caring for 'the least of these.' If you do that in his name, with his heart, it matters. If Greek Life opens doors for mentorship, scholarships, voter education, and community uplift, a believer can see that as a sacred assignment as long as they are clear who they are ultimately serving.",
    scriptures: [
      { ref: "Matthew 25:34-40", text: "Then the King will say to those on his right, 'Come, you who are blessed by my Father'... 'For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink.'" },
      { ref: "Colossians 3:23-24", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters... It is the Lord Christ you are serving." },
      { ref: "Ephesians 2:10", text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." }
    ],
    tags: ["service", "ministry", "community service", "good works"]
  },
  {
    id: "all-pagan-demonic",
    myth: "All Greek Organizations Are Pagan or Demonic",
    category: "identity",
    scenario: "Family Objection",
    organization: "BGLO",
    shortAnswer: "All Greek organizations are automatically pagan or demonic.",
    detailedResponse: "The Bible never says that a particular type of organization, by name, is automatically demonic. Scripture judges hearts, motives, and fruit, not acronyms or letters. There are Greek chapters that live out service, scholarship, and brotherly love in ways that honor Christ, and others that do not. That is not unique to Greek Life. That is true of churches, businesses, and families. The question is not 'Is this thing labeled Greek.' The question is 'What am I actually worshiping, obeying, and becoming.'",
    scriptures: [
      { ref: "Matthew 7:16-20", text: "By their fruit you will recognize them. Do people pick grapes from thornbushes, or figs from thistles?" },
      { ref: "1 Samuel 16:7", text: "The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart." },
      { ref: "1 John 4:1", text: "Dear friends, do not believe every spirit, but test the spirits to see whether they are from God." }
    ],
    tags: ["pagan", "demonic", "discernment", "fruit"]
  },
  {
    id: "leaving-proof-repentance",
    myth: "Leaving Is The Only Proof Of Repentance",
    category: "identity",
    scenario: "Church Challenge",
    shortAnswer: "Leaving your organization is the only proof you truly repented.",
    detailedResponse: "Salvation is based on faith in Christ, not on resigning from a human institution. There may be believers who, after prayer, feel convicted to withdraw from Greek Life. There are others who feel called to stay and be a faithful presence. Both can be obedient if they are following God with a clear conscience. Demanding that one outward action be the universal proof of repentance adds to the gospel and judges people by your conviction instead of God's word.",
    scriptures: [
      { ref: "Romans 14:4", text: "Who are you to judge someone else's servant? To their own master, servants stand or fall. And they will stand, for the Lord is able to make them stand." },
      { ref: "1 Corinthians 7:17-24", text: "Nevertheless, each person should live as a believer in whatever situation the Lord has assigned to them, just as God has called them." },
      { ref: "Acts 15:10-11", text: "Now then, why do you try to test God by putting on the necks of Gentiles a yoke that neither we nor our ancestors have been able to bear?" }
    ],
    tags: ["repentance", "leaving", "conviction", "conscience"]
  },
  {
    id: "some-sin-all-sinful",
    myth: "If Some Members Sin, The Whole Organization Is Sinful",
    category: "lifestyle",
    scenario: "Family Objection",
    shortAnswer: "If some members sin, the whole organization is sinful.",
    detailedResponse: "If that logic were true, no one could stay in a family, on a job, or in a local church. Every group has people who compromise. The presence of sin in the membership does not prove the mission is evil. It proves we live in a fallen world. Believers are called to be salt and light inside flawed communities, bringing conviction, accountability, and a better example, instead of judging from a distance.",
    scriptures: [
      { ref: "Matthew 13:24-30", text: "Jesus told them another parable: 'The kingdom of heaven is like a man who sowed good seed in his field. But while everyone was sleeping, his enemy came and sowed weeds among the wheat.'" },
      { ref: "Galatians 6:1-2", text: "Brothers and sisters, if someone is caught in a sin, you who live by the Spirit should restore that person gently... Carry each other's burdens." },
      { ref: "Philippians 2:15", text: "So that you may become blameless and pure, 'children of God without fault in a warped and crooked generation.' Then you will shine among them like stars in the sky." }
    ],
    tags: ["sin", "members", "accountability", "salt and light"]
  },
  {
    id: "always-pulls-away",
    myth: "Greek Life Will Always Pull You Away From God",
    category: "identity",
    scenario: "Personal Doubt",
    shortAnswer: "Being in Greek Life will always pull you away from God.",
    detailedResponse: "Greek Life can become a distraction or an idol, just like sports, relationships, business, or ministry. The issue is not the existence of the organization, it is your boundaries and priorities. Many believers drift from God with no letters on their chest at all. For a mature Christian, Greek Life can become a mission field, a training ground for leadership, and a crucible for character. For an immature believer, it might expose temptations they are not ready for. That calls for wisdom, not universal fear.",
    scriptures: [
      { ref: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well." },
      { ref: "1 Corinthians 10:23-24", text: "'I have the right to do anything,' you say—but not everything is beneficial. 'I have the right to do anything'—but not everything is constructive." },
      { ref: "Proverbs 4:23", text: "Above all else, guard your heart, for everything you do flows from it." }
    ],
    tags: ["distraction", "priorities", "maturity", "wisdom"]
  },
  {
    id: "masons-evil-bglo",
    myth: "Because Founders Were Masons, All BGLOs Are Evil",
    category: "history",
    scenario: "Family Objection",
    organization: "BGLO",
    shortAnswer: "Because some founders were Masons, all BGLOs are Masonic and evil.",
    detailedResponse: "This is the genetic fallacy, judging something as good or bad only because of where it came from. Many institutions were influenced by Freemasonry, from universities to civic clubs to parts of parliamentary procedure. That does not mean every group is secretly a lodge. The right question is 'What does this organization actually teach and practice right now.' Founders were complex people, just like the authors of our civic documents. You evaluate any group by its present beliefs, behaviors, and fruit, not only by rumored affiliations 100 years ago.",
    scriptures: [
      { ref: "Matthew 7:16-20", text: "By their fruit you will recognize them. Do people pick grapes from thornbushes, or figs from thistles?" },
      { ref: "Ezekiel 18:20", text: "The one who sins is the one who will die. The child will not share the guilt of the parent, nor will the parent share the guilt of the child." },
      { ref: "1 Thessalonians 5:21", text: "Test them all; hold on to what is good." }
    ],
    tags: ["Masons", "founders", "history", "BGLO"]
  },
  {
    id: "hazing-standard",
    myth: "Hazing is Standard Practice",
    category: "lifestyle",
    proofCategory: "pledge-process",
    scenario: "Prospective Member Question",
    shortAnswer: "All Greek organizations engage in harmful hazing.",
    detailedResponse: "Modern Greek organizations have strict anti-hazing policies with legal and organizational consequences. Many focus on member education, mentorship, and development. Christians should advocate for dignity and safety in all contexts.",
    scriptures: [
      { ref: "Ephesians 4:32", text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you." },
      { ref: "1 Peter 3:8", text: "Finally, all of you, be like-minded, be sympathetic, love one another, be compassionate and humble." },
      { ref: "Philippians 2:3-4", text: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves." }
    ],
    tags: ["hazing", "safety", "treatment"]
  },
  {
    id: "two-masters",
    myth: "You Can't Serve Two Masters",
    category: "identity",
    scenario: "Family Discussion",
    shortAnswer: "Pledging an organization means divided loyalty from God.",
    detailedResponse: "This misapplies Jesus' teaching about money/materialism. Commitment to excellence in various roles (family, work, community) doesn't divide loyalty to God when He remains first. Even Jesus had a trade (carpenter) and disciples had occupations.",
    scriptures: [
      { ref: "Matthew 6:24", text: "No one can serve two masters. Either you will hate the one and love the other, or you will be devoted to the one and despise the other. You cannot serve both God and money." },
      { ref: "Colossians 3:23-24", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters... It is the Lord Christ you are serving." },
      { ref: "Luke 2:52", text: "And Jesus grew in wisdom and stature, and in favor with God and man." }
    ],
    tags: ["loyalty", "commitment", "priorities"]
  },
  {
    id: "divine-nine-elitism",
    myth: "Divine Nine Status is Elitism",
    category: "community",
    scenario: "Social Media Defense",
    organization: "BGLO",
    shortAnswer: "BGLOs promote exclusivity and elitism over Christian equality.",
    detailedResponse: "Selectivity based on values and commitment differs from ungodly pride. Even Jesus chose 12 specific disciples. The key is whether the organization serves others humbly or exists for self-glorification. Most BGLOs have extensive service records.",
    scriptures: [
      { ref: "James 2:1-9", text: "My brothers and sisters, believers in our glorious Lord Jesus Christ must not show favoritism... If you really keep the royal law found in Scripture, 'Love your neighbor as yourself,' you are doing right." },
      { ref: "Galatians 3:28", text: "There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus." },
      { ref: "Philippians 2:3", text: "Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves." }
    ],
    tags: ["elitism", "equality", "service"]
  },
  {
    id: "unnecessary-for-christians",
    myth: "Greek Organizations Are Unnecessary for Christians",
    category: "ministry",
    scenario: "Ministry Leader Concern",
    shortAnswer: "Christians don't need Greek organizations for community.",
    detailedResponse: "While the church is primary, Christians throughout history have formed additional communities for specific purposes (mission organizations, professional fellowships, study groups). These can complement, not replace, church community.",
    scriptures: [
      { ref: "Ecclesiastes 4:9-12", text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up... A cord of three strands is not quickly broken." },
      { ref: "Proverbs 27:17", text: "As iron sharpens iron, so one person sharpens another." },
      { ref: "Acts 2:42-47", text: "They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer." }
    ],
    tags: ["community", "fellowship", "church"]
  },
  {
    id: "pagan-principles-founding",
    myth: "BGLOs Were Founded on Pagan Principles",
    category: "history",
    proofCategory: "founders",
    scenario: "Prospective Member Question",
    organization: "BGLO",
    shortAnswer: "Black Greek organizations have roots in non-Christian traditions.",
    detailedResponse: "Most BGLOs were founded by Christians at Christian institutions (Howard, Cornell, Indiana University) with explicit Christian values in their founding documents. Alpha Kappa Alpha, Delta Sigma Theta, and others were started by believers seeking community and service.",
    scriptures: [
      { ref: "Acts 17:26-28", text: "From one man he made all the nations, that they should inhabit the whole earth... 'For in him we live and move and have our being.'" },
      { ref: "Galatians 3:28", text: "There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus." },
      { ref: "1 Corinthians 12:12-13", text: "Just as a body, though one, has many parts, but all its many parts form one body, so it is with Christ. For we were all baptized by one Spirit so as to form one body." }
    ],
    tags: ["history", "founding", "Christianity"]
  }
];

export const mythCategories = [
  { id: "all", label: "All Topics" },
  { id: "identity", label: "Faith & Identity" },
  { id: "ministry", label: "Ministry & Leadership" },
  { id: "worship", label: "Worship & Idolatry" },
  { id: "rituals", label: "Rituals & Traditions" },
  { id: "community", label: "Community & Service" },
  { id: "lifestyle", label: "Lifestyle & Behavior" },
  { id: "history", label: "History & Origins" }
];

export const mythScenarios = [
  { id: "all", label: "All Scenarios" },
  { id: "Church Challenge", label: "Church Challenge" },
  { id: "Family Discussion", label: "Family Discussion" },
  { id: "Family Objection", label: "Family Objection" },
  { id: "Prospective Member Question", label: "Prospective Member" },
  { id: "Personal Doubt", label: "Personal Doubt" },
  { id: "Ministry Leader Concern", label: "Ministry Leader" },
  { id: "Social Media Defense", label: "Social Media Defense" },
  { id: "Church Setting", label: "Church Setting" }
];

export const mythOrganizations = [
  { id: "all", label: "All Organizations" },
  { id: "BGLO", label: "BGLO / Divine Nine" }
];
