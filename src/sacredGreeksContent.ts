export type Scenario = "clip" | "pressure" | "event";

export type ResultType = "steady_language" | "high_pressure" | "ministry_idea";

export interface ScriptureItem {
  ref: string;
  summary: string;
  whenToUse: string;
}

export interface SampleResponse {
  label: string;
  objection: string;
  youCanSay: string;
}

export interface ProofPoint {
  label: string;
  text: string;
}

export interface VideoItem {
  title: string;
  url: string;
  description: string;
}

export interface DidYouKnowItem {
  id: string;
  title: string;
  origin: string;
  today: string;
  reflection: string;
}

export interface DidYouKnowCategory {
  id: string;
  title: string;
  description: string;
  items: DidYouKnowItem[];
  videos?: VideoItem[];
}

export interface ResultContent {
  headline: string;
  intro: string;
  scriptureToolkit: ScriptureItem[];
  sampleResponses: SampleResponse[];
  proofPoints: ProofPoint[];
  prayer: string;
  videos?: VideoItem[];
}

export const sacredGreeksResults: Record<
  Scenario,
  Record<ResultType, ResultContent>
> = {
  clip: {
    steady_language: {
      headline: "You are not crazy for asking these questions",
      intro:
        "You care about Jesus. You care about your letters. You are not trying to play with darkness, you are trying to walk in the light and make sense of what you have heard. That desire for clarity is a sign of spiritual maturity, not rebellion. Before you accept anyone's sound bite, walk your situation through this reflection.",

      scriptureToolkit: [
        {
          ref: "Exodus 20:3",
          summary: "No other gods before God.",
          whenToUse:
            "Use when you want to affirm that God alone sits on the throne of your heart, not your letters or your org.",
        },
        {
          ref: "1 Corinthians 8:4, 9-13",
          summary:
            "Idols have no real power, but love and conscience still matter.",
          whenToUse:
            "Use when someone treats every symbol as a demon and you want to talk about love, conscience, and how your actions affect others.",
        },
        {
          ref: "Romans 14:1-4, 13",
          summary:
            "Do not despise or judge each other over disputable matters.",
          whenToUse:
            "Use when people make blanket rules about Greek life without knowing your heart, your chapter culture, or your actual behavior.",
        },
        {
          ref: "John 7:24",
          summary: "Judge with right judgment, not by appearances.",
          whenToUse:
            "Use when you want to gently challenge surface level assumptions about symbols, letters, or terms.",
        },
        {
          ref: "Romans 12:2",
          summary:
            "Be transformed by renewing your mind so you can test what is good.",
          whenToUse:
            "Use when you want to show that you are willing to examine your organization and your role in it before God.",
        },
        {
          ref: "Proverbs 11:1",
          summary: "God hates a false balance and loves a just weight.",
          whenToUse:
            "Use when you want to point out double standards, for example when people ignore pagan roots in other traditions but only call BGLOs demonic.",
        },
      ],

      sampleResponses: [
        {
          label: "Calm response",
          objection: "You cannot be saved and Greek.",
          youCanSay:
            "I agree that salvation is only through Jesus, not through any organization. My letters did not save me, Christ did. The real question is whether my membership is helping or hindering my witness, and that is what I keep bringing before God in prayer and Scripture.",
        },
        {
          label: "Clarifying response",
          objection: "That shield and those letters are idols.",
          youCanSay:
            "Idolatry is when we give worship that belongs to God to something else. I honor my founders and my letters, but I worship the Lord only. If you ever see me treat my organization like a god, please call me on it, because that would be sin.",
        },
        {
          label: "Firm response",
          objection: "Any oath you made was a covenant with demons.",
          youCanSay:
            "Scripture is clear that we should not play games with vows. Jesus taught us to let our yes be yes and our no be no. I have examined what I agreed to. Where it lines up with biblical values like honesty, service, and brotherhood, I stand by it. If anything ever contradicts the authority of Christ, that has to go, period.",
        },
        {
          label: "Perspective response",
          objection: "All secrecy is demonic.",
          youCanSay:
            "The Bible does warn about works of darkness, but my letters are not a secret religion. In life we already accept confidential things that are not demonic, like counseling sessions or job interviews. What matters is whether I am walking in the light of Christ in how I live and serve, both inside and outside my organization.",
        },
      ],

      proofPoints: [
        {
          label: "Process",
          text:
            "Ask how your journey in Greek life has formed you. Has it pushed you toward discipline, service, and community, or toward pride, fear, and secrecy that you regret?",
        },
        {
          label: "Rituals",
          text:
            "See rituals and symbols as parables in action. Ask what story they tell now in your life. If a ritual pulls you away from Christ, it needs to be challenged or changed.",
        },
        {
          label: "Oaths",
          text:
            "Examine the promises you made. Where they affirm truth, service, and integrity, live them out. Where any wording conflicts with Scripture, bring that to God and align your loyalty with Christ first.",
        },
        {
          label: "Obscurity",
          text:
            "Ask if you are hiding your faith to keep the peace. Obscurity becomes holy when you refuse to dim your light just to fit in.",
        },
        {
          label: "Founding",
          text:
            "You stand in a long story that includes both brokenness and beauty. You cannot rewrite the founding, but you can help write the next chapter by how you live as a Christian Greek today.",
        },
      ],

      prayer:
        "Lord Jesus, you see my heart, my letters, and my story. I do not want to live in fear or pride. Show me any place where my identity in Greek life has risen above my identity in You. Give me courage to change what needs to change and peace to stand where You have placed me. Amen.",

      videos: [
        {
          title: "Sacred, Not Sinful: Can Faith and Greek Life Coexist?",
          url: "https://youtu.be/_3C9q8ZmLnk",
          description:
            "Short Sacred Greeks teaching that helps you think clearly about Greek life and faith when you see denouncement content.",
        },
        {
          title: "Top 10 Faith Questions About Greek Life Answered!",
          url: "https://youtu.be/PLQG1lOu-48",
          description:
            "Follow up teaching that reinforces how to respond to clips and sermons without panic.",
        },
      ],
    },

    high_pressure: {
      headline: "God is not trying to trap you",
      intro:
        "You are carrying a lot. Someone you love or respect is telling you that God will not be pleased with you until you denounce or walk away. That kind of pressure does not come from the Holy Spirit. God is patient. He invites. He convicts. But He does not manipulate or rush you into fear-based decisions. Before you make any vow under pressure, slow down and process this with Scripture and a wise counselor who knows both you and the Word.",

      scriptureToolkit: [
        {
          ref: "1 John 4:18",
          summary: "Perfect love casts out fear.",
          whenToUse:
            "Use when someone is using fear tactics to push you into a decision and you need to remember that God's love does not operate through manipulation.",
        },
        {
          ref: "Galatians 5:1",
          summary: "Christ set us free. Do not submit again to a yoke of slavery.",
          whenToUse:
            "Use when pressure feels legalistic or when someone is adding rules to the gospel that Scripture does not require.",
        },
        {
          ref: "Romans 8:1",
          summary: "There is no condemnation for those in Christ Jesus.",
          whenToUse:
            "Use when you are being told you are not saved or not right with God because of your membership.",
        },
        {
          ref: "Matthew 11:28-30",
          summary: "Jesus' yoke is easy and His burden is light.",
          whenToUse:
            "Use when the pressure feels heavy and crushing, and you need to be reminded that Jesus does not lead like that.",
        },
        {
          ref: "Proverbs 15:22",
          summary: "Plans fail without counsel, but succeed with many advisers.",
          whenToUse:
            "Use when you are being pressured to decide quickly without getting input from multiple wise people.",
        },
      ],

      sampleResponses: [
        {
          label: "To a pastor",
          objection: "God told me to tell you that you need to denounce.",
          youCanSay:
            "I respect you deeply and I know you care about my soul. I am not dismissing what you are saying. I want to take time to pray, study Scripture, and talk to other mature believers before I make a vow. If God is truly calling me to leave, He will make that clear without rushing me.",
        },
        {
          label: "To family",
          objection: "You are embarrassing us and grieving the Holy Spirit.",
          youCanSay:
            "I love you and I hear your concern. I am not trying to grieve God or dishonor you. I need to work this out between me and Jesus with prayer and Scripture. I am asking you to trust that I take my faith seriously and give me space to process this well.",
        },
        {
          label: "To a friend",
          objection: "If you really loved Jesus you would just leave.",
          youCanSay:
            "I do love Jesus. That is exactly why I am not making a rushed decision. Loving Jesus means submitting everything to Him, including my letters. But I am not going to make a vow out of fear or peer pressure. I am going to seek God and wise counsel.",
        },
      ],

      proofPoints: [
        {
          label: "Process",
          text:
            "Do not make new vows under pressure. God is not in a hurry. Take time to pray, study, and talk to multiple wise counselors who know Scripture and know you.",
        },
        {
          label: "Rituals",
          text:
            "If symbols or rituals have become unclear or uncomfortable, it is okay to step back and examine them without making a permanent decision right now.",
        },
        {
          label: "Oaths",
          text:
            "Jesus warned against manipulative vows. Do not break an old vow out of fear, and do not make a new vow (like a public denouncement) just to satisfy someone else.",
        },
        {
          label: "Obscurity",
          text:
            "Your salvation is not tied to resigning from anything. Your salvation is in Christ alone. Let your life shine for Jesus, wherever you are.",
        },
        {
          label: "Founding",
          text:
            "You can honor your history and still follow Jesus. The question is not whether you can be saved and Greek. The question is how you can live faithfully as a Christian in every area of life.",
        },
      ],

      prayer:
        "Father, I feel the weight of other people's expectations and I do not know what to do. Protect my heart from fear and manipulation. Show me if there is sin I need to repent of, but do not let me make vows out of pressure. Give me discernment, courage, and peace. In Jesus' name, Amen.",

      videos: [
        {
          title: "When Pressure Feels Like Prophecy",
          url: "https://youtu.be/PLQG1lOu-48",
          description:
            "How to tell the difference between godly conviction and human manipulation.",
        },
      ],
    },

    ministry_idea: {
      headline: "Your heart to bring Christ into your org is a gift",
      intro:
        "You want to honor Jesus in Greek spaces. That is beautiful. But you are also navigating real tension: how do you plan something faith-based without making people feel ambushed, and without compromising the gospel? This is not about being perfect. It is about being faithful, wise, and prayerful as you create space for Jesus to be seen.",

      scriptureToolkit: [
        {
          ref: "Matthew 5:16",
          summary: "Let your light shine before others.",
          whenToUse:
            "Use when you want to affirm that your goal is not to hide your faith but to let Jesus be seen clearly.",
        },
        {
          ref: "Colossians 3:17",
          summary: "Whatever you do, do it all in the name of the Lord Jesus.",
          whenToUse:
            "Use when planning an event and you want to make sure Christ is central, not just an add-on.",
        },
        {
          ref: "1 Peter 3:15",
          summary: "Always be ready to give a reason for your hope, with gentleness and respect.",
          whenToUse:
            "Use when you want to share Jesus in a way that is clear but not preachy or condescending.",
        },
      ],

      sampleResponses: [
        {
          label: "Proposing to leadership",
          objection: "We do not do religious stuff.",
          youCanSay:
            "I respect that we are not a religious organization. I am not trying to turn us into a church. But I do believe we can create space to reflect on faith, service, and purpose in a way that honors our values and respects everyone's beliefs.",
        },
        {
          label: "Inviting chapter members",
          objection: "This sounds too churchy.",
          youCanSay:
            "I get that. My goal is not to make anyone uncomfortable. This is an optional space for anyone who wants to talk about faith and Greek life. No pressure, just an honest conversation.",
        },
      ],

      proofPoints: [
        {
          label: "Process",
          text:
            "Frame your event as a discipleship moment. What would it look like to help people grow spiritually, not just complete a program?",
        },
        {
          label: "Rituals",
          text:
            "Be mindful of symbols. If you use Greek imagery, make sure it points people to Christ, not away from Him.",
        },
        {
          label: "Oaths",
          text:
            "Do not water down the gospel to fit in. Be clear about who Jesus is and what He has done.",
        },
        {
          label: "Obscurity",
          text:
            "This is your chance to let your light shine. Do not be preachy, but do not be vague either. Speak truth with love.",
        },
        {
          label: "Founding",
          text:
            "Even if you are the only one planning this, you are starting something. Trust God to use your faithfulness.",
        },
      ],

      prayer:
        "Lord, give me wisdom as I plan this. Help me honor You without being obnoxious. Let people see Jesus clearly. Use this event to draw someone closer to You. Amen.",

      videos: [
        {
          title: "Planning Faith-Based Greek Events",
          url: "https://youtu.be/_3C9q8ZmLnk",
          description:
            "Practical guidance on how to bring Christ into Greek spaces with integrity.",
        },
      ],
    },
  },

  pressure: {
    steady_language: {
      headline: "You need words, not just feelings",
      intro:
        "You are being asked hard questions and you want to respond well. You are not trying to dodge accountability or defend sin. You are trying to honor Christ and explain your position with clarity and respect. That is wisdom, not compromise. Here are some tools to help you think and speak clearly.",

      scriptureToolkit: [
        {
          ref: "1 Peter 3:15",
          summary: "Give a reason for your hope with gentleness and respect.",
          whenToUse:
            "Use when you want to explain your faith and your decisions without being defensive or dismissive.",
        },
        {
          ref: "Colossians 4:6",
          summary: "Let your speech be gracious, seasoned with salt.",
          whenToUse:
            "Use when you want to respond with both truth and kindness.",
        },
        {
          ref: "Romans 14:22",
          summary: "The faith you have, keep between yourself and God.",
          whenToUse:
            "Use when someone is trying to impose their conscience on you and you want to affirm that you answer to God, not to them.",
        },
      ],

      sampleResponses: [
        {
          label: "Clear response",
          objection: "Why have you not denounced?",
          youCanSay:
            "I have not denounced because I do not believe my membership is sinful in itself. I believe I can honor Christ and serve my community through my organization. If that ever changes, I will act. But I am not making that decision based on someone else's conviction.",
        },
        {
          label: "Respectful pushback",
          objection: "You are being defensive.",
          youCanSay:
            "I am not trying to be defensive. I am trying to be faithful. I respect your concern, but I also need you to respect that I am seeking God on this and not just reacting out of fear or pride.",
        },
      ],

      proofPoints: [
        {
          label: "Process",
          text:
            "Examine how your Greek experience has shaped you spiritually. Be honest about growth and blind spots.",
        },
        {
          label: "Rituals",
          text:
            "If symbols feel unclear, it is okay to ask questions and set boundaries without leaving.",
        },
        {
          label: "Oaths",
          text: "Stand by promises that align with Christ. Release any that do not.",
        },
        {
          label: "Obscurity",
          text:
            "Do not hide your faith. But also do not hide your letters out of shame. Walk in the light.",
        },
        {
          label: "Founding",
          text:
            "You did not create the organization, but you can shape how you live in it today.",
        },
      ],

      prayer:
        "Lord, give me clarity and courage to speak well. Help me honor You and respect others. Let my words be full of grace and truth. Amen.",

      videos: [
        {
          title: "How to Respond to Hard Questions",
          url: "https://youtu.be/_3C9q8ZmLnk",
          description:
            "Practical language for navigating tough conversations about faith and Greek life.",
        },
      ],
    },

    high_pressure: {
      headline: "Pressure does not equal prophecy",
      intro:
        "You are being told that your salvation or spiritual health depends on walking away right now. That is not how God works. Conviction from the Holy Spirit leads to repentance, not panic. If there is sin to confess, do that. But do not let anyone rush you into making a vow you are not ready to make.",

      scriptureToolkit: [
        {
          ref: "1 Thessalonians 5:21",
          summary: "Test everything. Hold on to what is good.",
          whenToUse: "Use when you are being pressured to accept something without testing it first.",
        },
        {
          ref: "James 1:5",
          summary: "If any of you lacks wisdom, ask God.",
          whenToUse:
            "Use when you need to remind yourself and others that you are seeking God's wisdom, not just responding to human pressure.",
        },
        {
          ref: "Psalm 46:10",
          summary: "Be still and know that I am God.",
          whenToUse:
            "Use when you need to slow down and center yourself in God's presence instead of reacting to someone else's timeline.",
        },
      ],

      sampleResponses: [
        {
          label: "To a pastor or leader",
          objection: "You are in rebellion if you do not denounce.",
          youCanSay:
            "I am not in rebellion. I am trying to be obedient to God's leading in my life. I will not make a vow out of fear or pressure. If God is calling me to leave, He will make that clear in His time, not yours.",
        },
        {
          label: "To family or friends",
          objection: "We are all praying that you will just obey.",
          youCanSay:
            "I appreciate your prayers. I want to obey God too. But obedience does not mean rushing into a decision I am not convinced of. I am asking you to pray for wisdom and clarity, not just that I will do what you think is right.",
        },
      ],

      proofPoints: [
        {
          label: "Process",
          text:
            "Take time to process. Fast, pray, and seek wise counsel from multiple mature believers.",
        },
        {
          label: "Rituals",
          text:
            "Do not make decisions about symbols and rituals under pressure. Examine them in peace.",
        },
        {
          label: "Oaths",
          text:
            "Do not break one vow out of fear, and do not make a new vow out of pressure.",
        },
        {
          label: "Obscurity",
          text:
            "You do not have to broadcast your decision to satisfy others. Walk in the light before God.",
        },
        {
          label: "Founding",
          text:
            "Your story is your story. Do not let someone else rewrite it for you.",
        },
      ],

      prayer:
        "Father, I feel overwhelmed. Protect me from fear and manipulation. Show me Your will clearly. Give me peace and courage to follow You, not human pressure. In Jesus' name, Amen.",

      videos: [
        {
          title: "When Pressure Feels Like Prophecy",
          url: "https://youtu.be/PLQG1lOu-48",
          description:
            "How to discern between godly conviction and human manipulation.",
        },
      ],
    },

    ministry_idea: {
      headline: "You can honor Christ without compromising",
      intro:
        "You want to create space for faith in your organization. That is a beautiful desire. But you also want to do it well. This is not about being perfect or getting everyone's approval. It is about being faithful, prayerful, and wise as you create opportunities for Jesus to be seen.",

      scriptureToolkit: [
        {
          ref: "1 Corinthians 10:31",
          summary: "Whatever you do, do it all for the glory of God.",
          whenToUse:
            "Use when you want to frame your event as an act of worship, not just a program.",
        },
        {
          ref: "Philippians 2:14-15",
          summary: "Do everything without grumbling so you shine like stars.",
          whenToUse:
            "Use when you want to model a joyful, faithful witness in how you serve and lead.",
        },
        {
          ref: "2 Timothy 2:24-25",
          summary: "The Lord's servant must not be quarrelsome but kind to everyone.",
          whenToUse:
            "Use when you want to lead with grace, even when people push back.",
        },
      ],

      sampleResponses: [
        {
          label: "Proposing to leadership",
          objection: "We do not want this to feel like church.",
          youCanSay:
            "I understand. I am not trying to turn us into a church. I just want to create a space where people can explore faith and purpose in a way that is honest and respectful.",
        },
        {
          label: "Inviting chapter members",
          objection: "This is too serious.",
          youCanSay:
            "I get that. My goal is not to make it heavy or awkward. I just think it would be meaningful to talk about the things that really matter. It is optional, and I hope it can be a good experience for anyone who wants to come.",
        },
      ],

      proofPoints: [
        {
          label: "Process",
          text: "Make discipleship the goal. How can this event help people grow in their faith?",
        },
        {
          label: "Rituals",
          text:
            "Use symbols wisely. Make sure they point to Jesus, not away from Him.",
        },
        {
          label: "Oaths",
          text: "Be clear about the gospel. Do not water it down to fit in.",
        },
        {
          label: "Obscurity",
          text:
            "Shine your light. Do not be vague about who Jesus is or what He has done.",
        },
        {
          label: "Founding",
          text: "You are starting something. Trust God to use it for His glory.",
        },
      ],

      prayer:
        "Lord, help me plan this event for Your glory. Give me wisdom, boldness, and grace. Let people see Jesus clearly. Amen.",

      videos: [
        {
          title: "Planning Faith-Based Greek Events",
          url: "https://youtu.be/_3C9q8ZmLnk",
          description:
            "Practical tips for creating meaningful, Christ-centered events in Greek organizations.",
        },
      ],
    },
  },

  event: {
    steady_language: {
      headline: "You can honor God in this moment",
      intro:
        "You are in a situation where Greek life and your faith feel like they are colliding. Maybe it is a ritual, a symbol, or a conversation that feels spiritually unclear. You do not have to panic, and you do not have to pretend everything is fine. You can ask questions, set boundaries, and walk in wisdom. Here is how to think through it.",

      scriptureToolkit: [
        {
          ref: "1 Corinthians 10:31",
          summary: "Do everything for God's glory.",
          whenToUse:
            "Use when you want to evaluate whether your actions in this moment honor God or distract from Him.",
        },
        {
          ref: "Colossians 3:23",
          summary: "Work as if working for the Lord.",
          whenToUse:
            "Use when you want to focus on serving with excellence and integrity, even in Greek life.",
        },
        {
          ref: "Romans 14:23",
          summary: "Everything that does not come from faith is sin.",
          whenToUse:
            "Use when you are unsure about something and need to check your conscience before moving forward.",
        },
      ],

      sampleResponses: [
        {
          label: "In a ritual",
          objection: "This feels spiritually unclear.",
          youCanSay:
            "I want to honor this moment, but I also want to honor God. Can you help me understand what we are doing and why, so I can participate with a clear conscience?",
        },
        {
          label: "In a conversation",
          objection: "Why do you keep bringing up Jesus?",
          youCanSay:
            "Because Jesus is the most important part of my life. I am not trying to be preachy, but I also cannot pretend He does not matter to me. He shapes how I think about everything, including Greek life.",
        },
      ],

      proofPoints: [
        {
          label: "Process",
          text: "Ask yourself: Is this moment helping me grow closer to Christ, or pulling me away?",
        },
        {
          label: "Rituals",
          text:
            "Examine the symbols and rituals. If something feels unclear, it is okay to ask questions or set boundaries.",
        },
        {
          label: "Oaths",
          text:
            "Do not make promises you cannot keep with a clear conscience. Let your yes be yes and your no be no.",
        },
        {
          label: "Obscurity",
          text:
            "Do not hide your faith to fit in. Let your light shine, even in Greek spaces.",
        },
        {
          label: "Founding",
          text:
            "You are part of a story. How you live today matters for the next chapter.",
        },
      ],

      prayer:
        "Lord, help me honor You in this moment. Give me wisdom, courage, and grace. Let my actions and words reflect Your love. Amen.",

      videos: [
        {
          title: "Navigating Greek Life as a Christian",
          url: "https://youtu.be/_3C9q8ZmLnk",
          description:
            "Practical guidance for honoring Christ in Greek life situations.",
        },
      ],
    },

    high_pressure: {
      headline: "You do not have to decide right now",
      intro:
        "Something is happening right now, and you feel pressure to respond immediately. Maybe someone is asking you to make a vow, participate in something that feels spiritually unclear, or publicly take a side. You do not have to decide right now. It is okay to pause, pray, and seek wisdom. Rushing into a decision out of fear or pressure is not faithfulness.",

      scriptureToolkit: [
        {
          ref: "Proverbs 29:25",
          summary: "Fear of man is a trap, but trust in the Lord brings safety.",
          whenToUse:
            "Use when you feel pressure to conform or decide quickly to satisfy others.",
        },
        {
          ref: "James 1:19",
          summary: "Be quick to listen, slow to speak, slow to anger.",
          whenToUse:
            "Use when you need to slow down and think before responding.",
        },
        {
          ref: "Psalm 27:14",
          summary: "Wait for the Lord. Be strong and take heart.",
          whenToUse:
            "Use when you need to remind yourself that waiting is not weakness, it is wisdom.",
        },
      ],

      sampleResponses: [
        {
          label: "In the moment",
          objection: "You need to decide right now.",
          youCanSay:
            "I respect the urgency, but I do not want to make a decision I am not ready to make. I need time to pray and think this through. I will get back to you.",
        },
        {
          label: "To peers",
          objection: "Everyone else is doing it.",
          youCanSay:
            "I understand that, but I need to make sure I am following God, not just following the crowd. I am going to take time to process this before I decide.",
        },
      ],

      proofPoints: [
        {
          label: "Process",
          text:
            "Do not rush. Take time to pray, think, and talk to a trusted believer before you act.",
        },
        {
          label: "Rituals",
          text:
            "If a ritual or symbol feels unclear, it is okay to step back and ask questions before participating.",
        },
        {
          label: "Oaths",
          text: "Do not make vows under pressure. Let your yes be yes and your no be no.",
        },
        {
          label: "Obscurity",
          text:
            "You do not have to announce your decision to everyone. Walk in the light before God.",
        },
        {
          label: "Founding",
          text:
            "Your story matters. Do not let someone else write this chapter for you.",
        },
      ],

      prayer:
        "Father, I feel pressure to decide right now. Help me slow down and seek Your wisdom. Protect me from fear and manipulation. Give me courage to wait on You. In Jesus' name, Amen.",

      videos: [
        {
          title: "When Pressure Feels Like Prophecy",
          url: "https://youtu.be/PLQG1lOu-48",
          description:
            "How to tell the difference between godly conviction and human manipulation.",
        },
      ],
    },

    ministry_idea: {
      headline: "This is your moment to shine for Christ",
      intro:
        "You have an opportunity to bring Jesus into a Greek space. That is exciting and a little scary. You want to do it well, without being preachy or compromising the gospel. The key is to be prayerful, intentional, and faithful. Here is how to think through it.",

      scriptureToolkit: [
        {
          ref: "Matthew 5:14-16",
          summary: "You are the light of the world. Let your light shine.",
          whenToUse:
            "Use when you want to focus on lifting up Jesus, not defending Greek life.",
        },
      ],

      sampleResponses: [],

      proofPoints: [
        {
          label: "Process",
          text:
            "Use Bible study, prayer, and testimony as core elements. Make discipleship the goal.",
        },
        {
          label: "Rituals",
          text:
            "Respect your org's symbols, but make sure they serve the gospel, not distract from it.",
        },
        {
          label: "Oaths",
          text: "Do not water down the message. Be faithful to Scripture.",
        },
        {
          label: "Obscurity",
          text:
            "Be clear about who Jesus is. People need to see Him, not just hear nice ideas.",
        },
        {
          label: "Founding",
          text:
            "You are creating a legacy of faith. Even if it is small, it matters to God.",
        },
      ],

      prayer:
        "Father, use this event to draw people to Jesus. Give me wisdom, clarity, and boldness. Let Your name be lifted high. Amen.",

      videos: [
        {
          title: "Ministry in Greek Spaces",
          url: "https://youtu.be/_3C9q8ZmLnk",
          description:
            "Practical tips for leading faith-based events in Greek organizations.",
        },
      ],
    },
  },
};

// Study Guide Content - 5 Session Starter Guide
export interface StudySession {
  id: number;
  title: string;
  theme: string;
  scriptures: string[];
  teaching: string;
  questions: string[];
  actionStep: string;
  readMoreNote: string;
}

export const studyGuideSessions: StudySession[] = [
  {
    id: 1,
    title: "Session 1: I Love Jesus And I Love My Letters",
    theme: "Naming the real tension without shame.",
    scriptures: ["Matthew 22:37", "Colossians 3:17"],
    teaching:
      "This session helps believers admit the real tension many have never been allowed to say out loud. You love Jesus, and you also love your letters. For some, Greek life opened doors to leadership, scholarship, and service. For others, certain moments in the process were confusing, painful, or spiritually unclear. Many Christians have been told that the only faithful answer is to pretend the tension does not exist or to cut off part of their story and never speak of it again. In this study, we start with honesty instead of hiding.\n\nMatthew 22:37 calls us to love the Lord our God with all our heart, soul, and mind. That means God is not asking for part time loyalty. At the same time, Colossians 3:17 invites us to do everything in the name of the Lord Jesus. That includes how we wear your letters, how we show up in chapter life, and how we respond when people question our involvement. The point is not to pretend Greek life does not matter to you. The point is to bring your whole story, including your org, under the Lordship of Christ.\n\nIn this session, you will name both your gratitude and your grief. You will thank God for the ways He has used your organization to bless you or others. You will also give yourself permission to admit where your conscience still feels unsettled. This is not about performing for other Christians. This is about telling the truth in the presence of God so that He can lead you forward with a clean heart.",
    questions: [
      "When you first think about your letters, what words or memories come to mind",
      "In what ways has your organization helped you grow, serve, or find community",
      "Are there moments in your Greek life story that still feel confusing, painful, or hard to talk about",
      "How have churches or Christian voices spoken about BGLOs in your life so far",
      "What do Matthew 22:37 and Colossians 3:17 say to you personally about loving God and living as a Christian Greek",
    ],
    actionStep:
      "Share a short version of your Greek life story with one trusted believer this week. Include both what you are grateful for and what still troubles you.",
    readMoreNote:
      "Want to go deeper, read Chapter 1 in Sacred, Not Sinful. Need personal guidance, tap here to explore coaching with Dr. Lyman.",
  },
  {
    id: 2,
    title: "Session 2: Myths, Trauma, And Truth About BGLOs",
    theme: "Separate internet panic from actual theology.",
    scriptures: ["John 8:32", "Proverbs 18:13"],
    teaching:
      "This session focuses on the stories and sound bites that shape how people talk about BGLOs. Many believers have heard phrases like All Greek life is demonic or You cannot be saved and Greek. Some have watched dramatic denouncement videos online that stir fear and confusion without context. Others carry real church hurt or trauma from things that happened on campus or in ministry.\n\nJohn 8:32 tells us that the truth will make us free. That means freedom comes from Christ and from a clear understanding of what God has actually said, not from panic or pressure. Proverbs 18:13 warns against answering a matter before hearing it. When people condemn every Greek letter, color, and symbol without listening to real stories or learning the history, they are violating this wisdom.\n\nIn this study, you will take one common myth at a time and test it against Scripture. You will also begin to separate three things that often get tangled together: myths spread online, trauma from how people behaved, and what the Bible actually teaches about idolatry, vows, and Christian freedom. The aim is not to defend everything that has ever been done in Greek life. The goal is to tell the truth with a clear head and a tender heart so that you can follow Jesus without being ruled by fear.",
    questions: [
      "What are some things you heard growing up or online about BGLOs and Christians",
      "Which messages created the most fear or confusion in your heart",
      "How does John 8:32 challenge the way you have seen people use fear to control decisions",
      "Where have you seen people, on either side of the debate, answer before truly listening, like Proverbs 18:13 warns",
      "Make two columns. In one, list messages you have heard about Greek life. In the other, write what you actually see in Scripture about idolatry, vows, conscience, and Christian freedom.",
    ],
    actionStep:
      "Make a simple chart with two lists: What I heard about BGLOs and What I see in Scripture. Bring that chart to prayer this week and ask God to show you where myth, trauma, and truth have been mixed together.",
    readMoreNote:
      "Want to go deeper, read Chapter 2 in Sacred, Not Sinful. Need personal guidance, tap here to explore coaching with Dr. Lyman.",
  },
  {
    id: 3,
    title: "Session 3: Trauma, Tradition, And Theology",
    theme: "Sorting your story, your church background, and what the Bible truly teaches.",
    scriptures: ["Psalm 34:18", "Mark 7:8"],
    teaching:
      "In this session, you begin to untangle three powerful forces in your story: trauma, tradition, and theology. Trauma includes painful experiences, harsh words, spiritual abuse, hazing, or betrayal that still echo in your body and memory. Tradition includes the habits and church cultures you grew up in, some healthy and some not. Theology is what Scripture actually teaches when read in context.\n\nPsalm 34:18 promises that the Lord is close to the brokenhearted and saves those who are crushed in spirit. If your experience with Greek life or with church leaders around this topic has left you feeling crushed, God is not standing far off with folded arms. He draws near. At the same time, Mark 7:8 warns about letting human traditions replace the commands of God. Some people grew up in churches where certain rules about clothes, music, or organizations were treated as if they were straight from Scripture, even when they were not.\n\nThis study invites you to ask three simple but searching questions: Is this memory trauma Is this just tradition Is this truly what Jesus and the apostles taught If something is trauma, it needs healing and possibly boundaries, not denial. If something is only tradition, it can be honored, revised, or released, but it should not be confused with the gospel. If something is clear theology from Scripture, then all of us, Greek or not, are called to respond in obedience. Naming which category something belongs in will help you walk in truth instead of staying stuck in a swirl of emotion and confusion.",
    questions: [
      "When you think about Greek life and church conversations about it, what painful memories come up first",
      "How have church traditions in your life shaped the way you think about what is holy or unholy",
      "Can you name one example where a tradition was treated like Scripture in your background",
      "Where do you sense there is real trauma that needs healing, apart from the Greek life debate itself",
      "What helps you tell the difference between tradition and clear biblical teaching",
      "How does knowing that God is close to the brokenhearted shape the way you want to move forward",
    ],
    actionStep:
      "Choose one memory that still feels heavy. Write it out as honestly as you can. Then ask: Is this trauma Is this tradition Is this theology Bring that written memory to God in prayer and, if needed, to a trusted counselor or mentor.",
    readMoreNote:
      "Want to go deeper, read Chapter 3 in Sacred, Not Sinful. Need personal guidance, tap here to explore coaching with Dr. Lyman.",
  },
  {
    id: 4,
    title: "Session 4: The P.R.O.O.F. Framework",
    theme: "Using Process, Rituals, Oaths, Obscurity, and Founding to examine your story.",
    scriptures: ["1 Thessalonians 5:21-22"],
    teaching:
      "This session walks you step by step through the P.R.O.O.F. framework so you can examine your Greek life involvement with honesty and hope. First, Process. Ask how your pledging and initiation shaped you. Did the process form Christlike discipline, humility, and service, or did it normalize cruelty, secrecy, and fear Some stories may hold both, and God can meet you in that tension.\n\nSecond, Rituals. Every community has rituals, from communion and baptism to graduation ceremonies and national holidays. The question is not whether a ritual exists, but what story it tells. Do your Greek rituals point you toward virtues like scholarship, service, and unity, or do they praise the flesh and mock what is holy If any ritual crosses a line in your conscience, you are free in Christ to step back, speak up, or refuse.\n\nThird, Oaths. Words matter. Jesus taught us to let our yes be yes and our no be no. P.R.O.O.F. invites you to review what you pledged. Where your words affirm truth, integrity, and service, live them out fully. Where any wording seems to elevate your org above Christ or ask for a loyalty that belongs only to God, bring that to Him in repentance and realignment.\n\nFourth, Obscurity. This asks whether you are hiding your faith to keep your letters or if you are willing to let your light shine as a Christian Greek. Finally, Founding. Every organization has a story that includes both beauty and brokenness. You cannot rewrite the past, but you can decide whether you will stay to influence the future or leave to walk in peace. P.R.O.O.F. does not assume you must stay or you must go. It gives you language and questions so that, whatever you decide, you move with a clean conscience before God.",
    questions: [
      "Looking back, how did your process form you for better or for worse",
      "Which Greek rituals feel most meaningful to you, and what story do they tell",
      "Are there any parts of your pledge or oaths that trouble your conscience today",
      "Where have you been tempted to hide your faith in order to avoid conflict in your organization",
      "When you think about the founding story of your org, what parts feel aligned with Christlike values and what parts do not",
      "What does it mean to you to test everything and hold fast to what is good, like 1 Thessalonians 5:21-22 teaches",
    ],
    actionStep:
      "Pick one letter from P.R.O.O.F. this week and act on it. That could mean having one honest conversation about your process, choosing to skip a ritual that violates your conscience, rewording an old vow in prayer before God, speaking more openly about your faith, or serving in a way that reflects the best of your founding values.",
    readMoreNote:
      "Want to go deeper, read Chapter 4 in Sacred, Not Sinful. Need personal guidance, tap here to explore coaching with Dr. Lyman.",
  },
  {
    id: 5,
    title: "Session 5: Lordship, Next Steps, And Living In Peace",
    theme: "Letting Jesus lead your next move with a clean conscience.",
    scriptures: ["Romans 12:1-2", "Colossians 1:18"],
    teaching:
      "This final session brings everything back to the Lordship of Jesus. Romans 12:1-2 calls us to present our bodies as a living sacrifice and to be transformed by the renewing of our minds. Colossians 1:18 declares that Christ must have the first place in everything. That includes your identity as a Christian, your connection to your organization, and the way you respond to pressure from church, family, or social media.\n\nThe goal of this journey is not simply to defend Greek life or to attack it. The goal is to follow Jesus with a clear conscience and a steady heart. For some believers, that may mean staying in their organization with new boundaries, a clearer witness, and a commitment to be salt and light. For others, it may mean leaving or denouncing membership in a way that is healthy, prayed through, and not driven by public stunts or fear of being exposed online.\n\nIn this session, you will ask: What is Jesus asking me to do right now Is He calling me to rededicate my life to Him Is He inviting me to have a calm talk with my pastor, parents, or spouse Is He asking me to set new boundaries inside my chapter about what I will and will not participate in Or is He leading me to step away from my letters as an act of obedience, not as a performance for people watching As you answer, remember that the same Christ who saves you is the Christ who walks with you into every next step. His goal is not to trap you but to lead you into peace.",
    questions: [
      "As you look back over the last four sessions, what has God highlighted most clearly to you",
      "Where do you sense you have been living more to please people than to please Christ",
      "What would it look like for Jesus to have first place in how you wear or do not wear your letters",
      "Which next step feels most in line with faith and peace, even if it is also scary",
      "Who do you need to talk to in order to move forward wisely, not in isolation",
      "How would you explain your current conviction to someone who loves you but disagrees",
    ],
    actionStep:
      "Write a simple prayer that answers this question: Lord Jesus, based on what You have shown me, this is the next step I believe You are asking me to take. Then share that step with one trusted believer who will pray with you and walk with you.",
    readMoreNote:
      "Want to go deeper, read Chapter 5 in Sacred, Not Sinful. Need personal guidance, tap here to explore coaching with Dr. Lyman.",
  },
];

export const didYouKnowCategories: DidYouKnowCategory[] = [
  {
    id: "medicine-pharmacy",
    title: "Medicine & Pharmacy",
    description: "Modern healthcare practices rooted in Greek mythology and pagan symbolism",
    items: [
      {
        id: "caduceus",
        title: "The Caduceus Medical Symbol",
        origin: "The caduceus (staff with two snakes) is the symbol of Hermes, Greek god of commerce and thieves. The similar Rod of Asclepius (one snake) represents Asclepius, Greek god of healing. Both are pagan religious symbols still used in modern medicine.",
        today: "Major medical organizations, hospitals, pharmacies, and healthcare institutions worldwide use these symbols. The American Medical Association, U.S. military medical corps, and countless healthcare brands display them prominently.",
        reflection: "If Christians can work in hospitals displaying pagan god symbols, prescribe medications from pharmacies with Greek god imagery, and attend medical schools using these emblems, why is wearing Greek letters different?"
      },
      {
        id: "pharmacy-bowl",
        title: "Bowl of Hygieia",
        origin: "Hygieia was the Greek goddess of health and cleanliness, daughter of Asclepius. The Bowl of Hygieia (snake wrapped around a chalice) is her symbol and represents pharmaceutical practice.",
        today: "The American Pharmacists Association and pharmacy schools worldwide use this as their official symbol. It appears on pharmacy signs, diplomas, and professional materials.",
        reflection: "Christians trust pharmacists who operate under a goddess symbol. They take medications from buildings marked with pagan imagery. Yet BGLOs face scrutiny for far less obvious mythological connections."
      },
      {
        id: "hippocratic-oath",
        title: "The Hippocratic Oath",
        origin: "The original oath begins: 'I swear by Apollo the physician, and Asclepius, and Hygieia, and Panacea, and all the gods and goddesses...' It was literally a vow sworn to pagan deities.",
        today: "Modern medical students still take versions of this oath, though the god references are usually removed. The tradition and name remain tied to its pagan origins.",
        reflection: "Christian doctors take an oath named after pagan practices without controversy. The medical field's foundation in Greek paganism is accepted as history, not demonic. Why different standards for BGLOs?"
      }
    ]
  },
  {
    id: "calendar-holidays",
    title: "Calendar & Holidays",
    description: "Times and seasons we observe with clear pagan origins",
    videos: [
      {
        title: "From Pagan feasts to Holidays",
        url: "https://youtu.be/ZJ-sDBR2mCU",
        description: "Tracing the journey from ancient pagan celebrations to modern holiday traditions"
      }
    ],
    items: [
      {
        id: "days-of-week",
        title: "Days of the Week",
        origin: "Monday (Moon's day), Tuesday (Tiw/Mars), Wednesday (Woden/Mercury), Thursday (Thor/Jupiter), Friday (Frigg/Venus), Saturday (Saturn), Sunday (Sun). Each day is named after Roman or Norse deities.",
        today: "Christians use these pagan names every single day. Church services happen on 'Sunday' (Sun worship day). Businesses, schools, and calendars universally use these terms.",
        reflection: "We don't rename the weekdays to avoid pagan associations. We understand they're just names now. Why can't Greek letters be understood the same way—historical references that don't determine our worship?"
      },
      {
        id: "months",
        title: "Months of the Year",
        origin: "January (Janus, god of beginnings), March (Mars, god of war), May (Maia, goddess of spring), June (Juno, queen of gods). These are direct references to Roman deities.",
        today: "Birth certificates, legal documents, and church bulletins all use these pagan month names. Christians celebrate birthdays and anniversaries using deity-named months without concern.",
        reflection: "If naming something after a god automatically makes it demonic, our entire calendar system would be problematic. Context and intent matter."
      },
      {
        id: "christmas-tree",
        title: "Christmas Trees & Yule Traditions",
        origin: "Evergreen trees were sacred in pagan winter solstice celebrations. Yule logs, wreaths, and decorating trees were Germanic and Celtic pagan practices to honor nature spirits and ensure spring's return.",
        today: "Churches proudly display Christmas trees. Christian families decorate them, exchange gifts under them, and post photos. This is seen as celebrating Christ, despite pagan roots.",
        reflection: "Christians redeemed pagan winter traditions for Christ's birth celebration. The church said intent matters more than origin. Why isn't that grace extended to Greek organizations with historical ties?"
      },
      {
        id: "easter-traditions",
        title: "Easter Eggs & Spring Symbols",
        origin: "Eggs and rabbits were fertility symbols in pagan spring festivals honoring Eostre (Germanic goddess) and similar deities. These predated Christian Easter celebrations.",
        today: "Churches hold Easter egg hunts. Christian families dye eggs, buy chocolate bunnies, and celebrate with these symbols. Few question the pagan origins because the focus is on resurrection.",
        reflection: "The church transformed pagan spring symbols to point to new life in Christ. If we can Christianize eggs and bunnies, why can't individuals redeem their membership in service organizations?"
      }
    ]
  },
  {
    id: "architecture-symbols",
    title: "Architecture & Church Symbols",
    description: "Building designs and imagery with pagan heritage",
    videos: [
      {
        title: "Pagan Architecture in Churches",
        url: "https://youtu.be/G14XXWLKq5Q",
        description: "How Greek and Roman temple designs became standard for Christian buildings"
      }
    ],
    items: [
      {
        id: "greek-columns",
        title: "Greek & Roman Architecture",
        origin: "Columns, domes, and classical architecture were designed for pagan temples dedicated to Zeus, Jupiter, Athena, and other gods. These styles emerged from idol worship contexts.",
        today: "Countless church buildings use Greek columns, Roman domes, and classical architecture. The U.S. Supreme Court, Capitol Building, and many churches feature these 'pagan temple' designs.",
        reflection: "If building style with pagan origins is acceptable for churches and government, why are Greek letters—also historical references—considered uniquely problematic?"
      },
      {
        id: "steeples",
        title: "Church Steeples",
        origin: "Scholars trace steeples to ancient obelisks used in sun worship and fertility cults. The spire pointing to the sky has roots in pagan symbolism for connecting earth and heavens.",
        today: "Most traditional churches have steeples. They're seen as Christian symbols pointing to God, despite questionable origins.",
        reflection: "Intent and current use transformed pagan architectural elements into Christian symbols. Why isn't the same grace given to those who wear letters with service and community in mind?"
      },
      {
        id: "wedding-rings",
        title: "Wedding Rings",
        origin: "Ancient Egyptians, Romans, and Greeks exchanged rings in pagan marriage ceremonies, believing circles held magical protective powers. The ring tradition predates Christianity.",
        today: "Christian weddings universally include ring exchanges. Pastors bless them. Couples treasure them as symbols of covenant before God.",
        reflection: "We don't reject wedding rings because pagans used them first. We understand symbols can be redeemed and repurposed. Greek letters can represent service and sisterhood/brotherhood without occult meaning."
      }
    ]
  },
  {
    id: "education-institutions",
    title: "Education & Institutions",
    description: "Academic traditions with Greek and pagan roots",
    videos: [
      {
        title: "Greek Influence in Modern Education",
        url: "https://youtu.be/9qLofoqskHk",
        description: "Exploring how pagan traditions shaped academic ceremonies and symbols"
      },
      {
        title: "The Surprising History of Black Fraternities and Sororities!",
        url: "https://youtu.be/Y6N089RVnBU",
        description: "Discover the rich history and foundations of Black Greek Letter Organizations"
      }
    ],
    items: [
      {
        id: "university-names",
        title: "College & University Names",
        origin: "Harvard's motto 'Veritas' and seal originally included 'Christo et Ecclesiae' but also used Latin and classical references. Many Christian colleges are named after saints—a practice with Catholic/pagan saint veneration roots.",
        today: "Christian students attend universities with Latin mottos, Greek letters in math and science, and classical references everywhere. No one calls these schools demonic.",
        reflection: "Education is full of Greek language, mythology references, and classical traditions. We distinguish between using something historically and worshiping it. BGLOs deserve the same nuance."
      },
      {
        id: "academic-regalia",
        title: "Caps & Gowns",
        origin: "Academic robes and mortarboards trace back to medieval clergy and ancient scholarly traditions that included pagan influences. The graduation ceremony itself has ritualistic elements.",
        today: "Christian colleges hold graduation ceremonies with robes, processionals, and ceremonial traditions. Churches celebrate these 'rituals' as rites of passage.",
        reflection: "Academic ceremonies are full of tradition and symbolism, yet we see them as honoring achievement. Greek probates and traditions can similarly honor service and community."
      },
      {
        id: "greek-alphabet",
        title: "Greek Alphabet in Academics",
        origin: "The Greek alphabet itself comes from ancient Greece where these letters were used in pagan texts, mythology, and idol worship contexts.",
        today: "Math, science, and theology all use Greek letters (Alpha, Beta, Delta, Pi, Omega). Christian scholars study Greek to read the New Testament. Seminaries require it.",
        reflection: "If Greek letters are acceptable for Bible study and calculus, why are they demonic when used for fraternity/sorority identity? It's the same alphabet, different context."
      }
    ]
  },
  {
    id: "language-names",
    title: "Language & Common Names",
    description: "Everyday words and names with mythological origins",
    videos: [
      {
        title: "Mythology in Everyday Language",
        url: "https://youtu.be/oN_DDjKjVCo",
        description: "How mythological references permeate our daily vocabulary and names"
      },
      {
        title: "The Secret Power Behind Famous Logos!",
        url: "https://youtu.be/QsvD9LDmUEU",
        description: "Exploring the mythological symbols hidden in corporate logos and brand names"
      }
    ],
    items: [
      {
        id: "planet-names",
        title: "Planets & Space",
        origin: "Mercury, Venus, Mars, Jupiter, Saturn, Neptune, Uranus—all named after Roman gods. Pluto is the god of the underworld. We teach these to children.",
        today: "Christians study astronomy, NASA missions, and space science using these pagan god names. Churches hold VBS programs teaching kids about planets without renaming them.",
        reflection: "We accept that planet names don't promote worship of Roman gods. They're just names. Greek organization names can be understood the same way."
      },
      {
        id: "common-names",
        title: "Popular Christian Names",
        origin: "Diana (Roman moon goddess), Alexander (means 'defender of man'—Greek), Jason (Greek hero from mythology), Daphne (Greek nymph), Iris (Greek goddess), Penelope (Odysseus's wife).",
        today: "Christian parents name children these names, knowing the origins but choosing them for beauty or family significance. The pagan connection doesn't transfer.",
        reflection: "If we can name our children after mythological figures because we like the sound or meaning, why can't Greek organizations be joined for service and community despite mythological names?"
      },
      {
        id: "brand-names",
        title: "Corporate & Brand Names",
        origin: "Nike (Greek goddess of victory), Amazon (warrior women of mythology), Pandora (first woman in Greek mythology who released evil), Muse (Greek goddesses of arts).",
        today: "Christians buy from these companies, wear their products, and work for them without spiritual concern. We separate the mythology from the modern business.",
        reflection: "Commerce freely uses mythological names and imagery. Christians don't avoid these brands. Why are BGLOs held to a different standard?"
      }
    ]
  },
  {
    id: "civic-patriotic",
    title: "Civic & Patriotic Symbols",
    description: "Government and national imagery with pagan roots",
    videos: [
      {
        title: "Pagan Symbols in American Patriotism",
        url: "https://youtu.be/031_jOt2Vmw",
        description: "Understanding the goddess imagery in American civic symbols"
      },
      {
        title: "History of Oaths and Allegiance",
        url: "https://youtu.be/GbaqBExsqbs",
        description: "Exploring the ancient roots of oaths, pledges, and civic allegiance ceremonies"
      }
    ],
    items: [
      {
        id: "lady-liberty",
        title: "Statue of Liberty",
        origin: "Lady Liberty's design is based on Libertas, the Roman goddess of freedom. The torch, crown, and overall imagery echo pagan goddess worship.",
        today: "Christians celebrate the Statue of Liberty as an American symbol. Churches display it in patriotic services. It's on currency and government documents.",
        reflection: "America's most iconic symbol is literally modeled after a pagan goddess, yet Christians embrace it as representing freedom. Context and intent matter."
      },
      {
        id: "lady-justice",
        title: "Lady Justice",
        origin: "The blindfolded woman with scales is Themis/Justitia, Greco-Roman goddess of justice. She appears on courthouses worldwide.",
        today: "Christians serve as judges and lawyers under this imagery. The legal system operates with a goddess symbol, and believers participate without spiritual conflict.",
        reflection: "If legal professionals can work under goddess imagery, using it to represent justice rather than worship, Greek organizations can use historical symbols for service."
      },
      {
        id: "olympic-torch",
        title: "Olympic Flame",
        origin: "The Olympic torch ceremony comes from ancient Greek Olympic games held to honor Zeus. The flame was lit on an altar to him. The modern ceremony intentionally recreates this pagan ritual.",
        today: "Christian athletes compete in Olympics. Churches celebrate Olympic medalists. The opening ceremony literally recreates a Greek pagan religious ritual on global TV.",
        reflection: "The Olympics are openly rooted in Greek religious practices, yet participation is celebrated. Why aren't BGLOs, with far less direct religious ties, given the same grace?"
      }
    ]
  },
  {
    id: "american-traditions",
    title: "American Traditions",
    description: "Everyday American customs and celebrations with surprising origins",
    videos: [
      {
        title: "Story of Birthday Cakes",
        url: "https://youtu.be/rr639o9Gev0",
        description: "The ancient pagan origins of birthday celebrations and cake traditions"
      },
      {
        title: "The Circle of Promise: Origins of the Wedding Ring",
        url: "https://youtu.be/CN11FQ7tanU",
        description: "Exploring the pagan origins of wedding rings and how Christians embrace this tradition"
      },
      {
        title: "The Strange Secrets Behind Old Wedding Traditions",
        url: "https://youtu.be/9qLofoqskHk",
        description: "Uncovering the surprising pagan and cultural origins of modern wedding customs"
      },
      {
        title: "Baby Podcast Reveals Family Secrets! | Fraternities, Greek Gods & Birthday Candles",
        url: "https://youtu.be/031_jOt2Vmw",
        description: "Exploring the hidden connections between everyday traditions, Greek mythology, and fraternities"
      },
      {
        title: "From Pagan feasts to Holidays",
        url: "https://youtu.be/ZJ-sDBR2mCU",
        description: "Tracing the journey from ancient pagan celebrations to modern holiday traditions"
      }
    ],
    items: [
      {
        id: "birthday-celebrations",
        title: "Birthday Celebrations",
        origin: "Birthday celebrations originated in ancient pagan cultures. Greeks offered moon-shaped cakes to Artemis, and Romans celebrated birthdays with candles believing smoke carried prayers to the gods.",
        today: "Christians celebrate birthdays with cakes, candles, and parties. Churches host birthday celebrations and pastors pray for birthday blessings without concern for pagan origins.",
        reflection: "If birthday traditions rooted in pagan moon goddess worship are acceptable for Christian celebration, why are Greek organizations with historical references held to a different standard?"
      }
    ]
  },
  {
    id: "memorials-funerals",
    title: "Memorials & Funerals",
    description: "Death rituals and memorial traditions with ancient roots",
    videos: [
      {
        title: "What Do Wreaths at Funerals Really Mean?",
        url: "https://youtu.be/oN_DDjKjVCo",
        description: "Uncovering the ancient pagan origins of funeral wreaths and memorial traditions"
      },
      {
        title: "This Will Change How You See Funerals Forever",
        url: "https://youtu.be/G14XXWLKq5Q",
        description: "Exploring the surprising history and symbolism of modern funeral practices"
      }
    ],
    items: [
      {
        id: "funeral-wreaths",
        title: "Funeral Wreaths",
        origin: "Wreaths originated in ancient Greek and Roman cultures as symbols of victory and eternal life. They were placed on graves and used in pagan funeral rites to honor the dead and gods of the underworld.",
        today: "Christians place wreaths at funerals, cemeteries, and memorial services. Churches display them during services without concern for pagan origins.",
        reflection: "If funeral wreaths rooted in pagan death rituals can be redeemed for Christian memorial purposes, why can't Greek organization symbols be understood in their current context?"
      }
    ]
  },
  {
    id: "logos-symbols",
    title: "Logos & Symbols",
    description: "Corporate and brand symbols with mythological origins",
    videos: [
      {
        title: "The Secret Power Behind Famous Logos!",
        url: "https://youtu.be/QsvD9LDmUEU",
        description: "Exploring the mythological symbols hidden in corporate logos and brand names"
      }
    ],
    items: [
      {
        id: "corporate-mythology",
        title: "Mythological Brand Symbols",
        origin: "Major corporations use mythological symbols: Nike (goddess of victory), Starbucks (Greek siren), Versace (Medusa), Amazon (warrior women), and countless others draw from pagan mythology.",
        today: "Christians work for these companies, buy their products, and wear their logos daily. We understand these are just brand identities, not religious worship.",
        reflection: "If we can wear Nike shoes and drink Starbucks coffee without spiritual concern despite their mythological symbols, Greek letters deserve the same contextual understanding."
      }
    ]
  },
  {
    id: "fashion-cosmetics",
    title: "Fashion & Cosmetics",
    description: "Beauty practices and fashion with Egyptian origins and deity connections",
    items: [
      {
        id: "eye-makeup",
        title: "Eyeliner & Eye Makeup",
        origin: "Ancient Egyptians created kohl eyeliner to honor and invoke the protection of the Eye of Horus (Wadjet) and the Eye of Ra. The almond-shaped eye design was meant to channel the power of these solar deities. The goddess Iris was also associated with eye beauty and the rainbow, connecting vision to divine favor.",
        today: "Christians wear eyeliner, mascara, and eyeshadow daily. Makeup tutorials and beauty brands celebrate 'Egyptian eye' looks. False eyelashes and dramatic eye makeup are standard in church services, weddings, and everyday life.",
        reflection: "If we can enhance our eyes with makeup techniques rooted in Egyptian deity worship—literally drawing symbols meant to invoke Horus and Ra—why are Greek letters problematic? Both have ancient religious origins but modern secular use."
      },
      {
        id: "eyeshadow",
        title: "Eyeshadow & Eye Color",
        origin: "Egyptians used green eyeshadow (malachite) to represent fertility and rebirth, associated with Horus and Osiris. Blue eyeshadow (lapis lazuli) symbolized the heavens and was connected to Ra and Nut, the sky goddess. Eye makeup was spiritual armor and a way to become 'god-like.'",
        today: "Modern cosmetic companies sell eyeshadow palettes in these same colors. Christians apply them for beauty without any thought of Egyptian gods or spiritual transformation rituals.",
        reflection: "Eyeshadow colors were literally chosen to embody specific Egyptian deities and spiritual powers. Yet no one suggests makeup is demonic. Context changed; so can Greek letters."
      },
      {
        id: "wigs",
        title: "Wigs & Hair Extensions",
        origin: "Ancient Egyptians wore elaborate wigs as status symbols and religious expressions. The wigs represented the Nile River's life-giving flow—straight, dark hair symbolized the river itself. High priests and pharaohs wore wigs in temple ceremonies to embody divine authority and connection to the gods.",
        today: "Christians—especially in Black churches—embrace wigs, weaves, and hair extensions as expressions of beauty and style. Pastors preach in them, choir members sing in them, and church fashion celebrates them.",
        reflection: "If wigs that literally symbolized the Nile River and priestly connection to Egyptian gods can be worn in church without spiritual concern, why are Greek organizations—also using symbols in new contexts—treated as dangerous?"
      }
    ]
  },
  {
    id: "oaths-allegiances",
    title: "Oaths & Allegiances",
    description: "Ceremonial pledges and vows with ancient origins",
    videos: [
      {
        title: "History of Oaths and Allegiance",
        url: "https://youtu.be/GbaqBExsqbs",
        description: "Exploring the ancient roots of oaths, pledges, and civic allegiance ceremonies"
      }
    ],
    items: [
      {
        id: "pledge-allegiance",
        title: "Pledge of Allegiance",
        origin: "The concept of pledging allegiance traces back to ancient oath-taking ceremonies in Greek and Roman societies, where citizens would swear loyalty to gods and state.",
        today: "Americans recite the Pledge of Allegiance in schools, government ceremonies, and public events. Christians participate in this civic ritual without spiritual concern.",
        reflection: "If Christians can pledge allegiance to a flag and nation using ceremonial language rooted in ancient practices, why are Greek organization pledges treated differently?"
      }
    ]
  }
];

