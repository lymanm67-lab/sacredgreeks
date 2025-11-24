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
          title: "Sacred Greeks Video 2",
          url: "https://youtu.be/_3C9q8ZmLnk",
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
          text:
            "You can honor commitments that align with Scripture and renegotiate those that do not.",
        },
        {
          label: "Obscurity",
          text:
            "Make sure your faith is visible. If people only see your letters and never see Jesus, something is off.",
        },
        {
          label: "Founding",
          text:
            "You do not have to defend everything your founders did. You can create a new legacy of faithfulness.",
        },
      ],

      prayer:
        "God, give me the right words. Help me speak truth in love. Protect me from pride and from fear. Let my life point to You. Amen.",

      videos: [
        {
          title: "How to Respond to Hard Questions",
          url: "https://youtu.be/PLQG1lOu-48",
          description:
            "Practical examples of responding to common objections about BGLOs and faith.",
        },
      ],
    },

    high_pressure: {
      headline: "Pressure is not prophecy",
      intro:
        "Someone is telling you that God has spoken and you must denounce immediately. But the Holy Spirit leads with peace, not panic. True conviction invites repentance. Manipulation demands compliance. Before you make any vow, slow down. Pray. Get wise counsel. God will not condemn you for taking time to seek Him well.",

      scriptureToolkit: [
        {
          ref: "1 John 4:1",
          summary: "Test the spirits to see if they are from God.",
          whenToUse:
            "Use when you are being told 'God said' but something feels off.",
        },
        {
          ref: "Isaiah 30:21",
          summary: "Your ears will hear a voice behind you saying, 'This is the way, walk in it.'",
          whenToUse:
            "Use when you need reassurance that God's leading is clear and patient, not rushed and chaotic.",
        },
        {
          ref: "James 1:5",
          summary: "If you lack wisdom, ask God, who gives generously.",
          whenToUse:
            "Use when you need to make a decision and you do not have clarity yet.",
        },
      ],

      sampleResponses: [
        {
          label: "To someone claiming prophecy",
          objection: "God told me you have to leave.",
          youCanSay:
            "I respect that you believe God spoke to you. I am going to pray and seek God for myself. If He is truly calling me to leave, He will make that clear to me too.",
        },
        {
          label: "Setting a boundary",
          objection: "You need to decide now.",
          youCanSay:
            "I will not make a vow under pressure. If this is truly from God, He will give me peace and clarity without rushing me.",
        },
      ],

      proofPoints: [
        {
          label: "Process",
          text:
            "Do not let fear drive your decisions. God does not lead through manipulation.",
        },
        {
          label: "Rituals",
          text:
            "If you need to step back from certain activities while you process, that is okay. You do not have to resign to take a break.",
        },
        {
          label: "Oaths",
          text:
            "Do not make new vows out of fear. And do not break old ones without deep prayer and counsel.",
        },
        {
          label: "Obscurity",
          text:
            "Your salvation is secure in Christ, not in resigning from anything. Walk in that freedom.",
        },
        {
          label: "Founding",
          text:
            "You are not responsible for every decision your founders made. You are responsible for how you follow Jesus today.",
        },
      ],

      prayer:
        "Jesus, I am scared and confused. Protect my heart from fear and manipulation. If I need to leave, show me. If I need to stay and be a witness, give me courage. I trust You. Amen.",

      videos: [
        {
          title: "When Pressure Feels Prophetic",
          url: "https://youtu.be/PLQG1lOu-48",
          description:
            "How to discern between godly conviction and human control.",
        },
      ],
    },

    ministry_idea: {
      headline: "This is not pressure on you, this is you offering Christ to others",
      intro:
        "You are feeling pressure from others to denounce, but instead of reacting, you want to create a space where people can wrestle with faith and Greek life honestly. That is pastoral leadership. Focus on being faithful, not perfect. Trust God with the outcomes.",

      scriptureToolkit: [
        {
          ref: "2 Timothy 2:24-25",
          summary: "The Lord's servant must not be quarrelsome but kind, able to teach, patiently enduring evil, correcting with gentleness.",
          whenToUse:
            "Use when you want to lead conversations about faith without being combative.",
        },
      ],

      sampleResponses: [],

      proofPoints: [
        {
          label: "Process",
          text:
            "Your event is a discipleship opportunity. Make it about Jesus, not about defending Greek life.",
        },
        {
          label: "Rituals",
          text:
            "Be thoughtful about symbols. Point to Christ clearly.",
        },
        {
          label: "Oaths",
          text:
            "Do not water down the gospel to keep the peace.",
        },
        {
          label: "Obscurity",
          text:
            "Let your light shine. This is your chance to show Christ in Greek spaces.",
        },
        {
          label: "Founding",
          text:
            "You are creating a new legacy. Even if no one else joins you, be faithful.",
        },
      ],

      prayer:
        "Lord, use me. Give me wisdom, humility, and courage. Let this event point people to You. Amen.",

      videos: [],
    },
  },

  event: {
    steady_language: {
      headline: "You can plan something beautiful and faithful",
      intro:
        "You want to create space for Jesus in your organization. You are not trying to turn your chapter into a church, but you also do not want to hide your faith. That balance is possible. Here is how to plan an event that honors Christ, respects your org, and blesses your people.",

      scriptureToolkit: [
        {
          ref: "1 Corinthians 10:31",
          summary: "Whatever you do, do it all for the glory of God.",
          whenToUse:
            "Use when you want to frame your event as an act of worship and service.",
        },
        {
          ref: "Colossians 3:17",
          summary: "Do everything in the name of the Lord Jesus.",
          whenToUse:
            "Use when you want to make sure Christ is central to the event, not just mentioned.",
        },
      ],

      sampleResponses: [
        {
          label: "Pitching to leadership",
          objection: "This might be too religious.",
          youCanSay:
            "I understand the concern. My goal is not to make anyone uncomfortable. I want to create an optional space where people can reflect on faith, purpose, and service. It is open to everyone, but no one is required to come.",
        },
      ],

      proofPoints: [
        {
          label: "Process",
          text:
            "Design the event as a discipleship moment. What spiritual growth do you want to see?",
        },
        {
          label: "Rituals",
          text:
            "If you use Greek symbols, make sure they point to Christ, not compete with Him.",
        },
        {
          label: "Oaths",
          text:
            "Be clear about the gospel. Do not dilute Jesus to make people comfortable.",
        },
        {
          label: "Obscurity",
          text:
            "This is your opportunity to shine for Christ. Be bold but not obnoxious.",
        },
        {
          label: "Founding",
          text:
            "You are starting a new chapter of faithfulness. Trust God with the results.",
        },
      ],

      prayer:
        "God, guide me as I plan. Help me honor You and serve my people. Let someone see Jesus through this. Amen.",

      videos: [
        {
          title: "Faith-Based Event Planning",
          url: "https://youtu.be/_3C9q8ZmLnk",
          description:
            "How to plan Greek events that center Christ with wisdom and respect.",
        },
      ],
    },

    high_pressure: {
      headline: "Do not let fear stop you from serving",
      intro:
        "You are facing criticism or skepticism about your event idea. Some people think you are being too churchy. Others think you are compromising. Do not let fear paralyze you. If God has called you to create this space, be faithful. Trust Him with the responses.",

      scriptureToolkit: [
        {
          ref: "2 Timothy 1:7",
          summary: "God gave us a spirit not of fear but of power and love and self-control.",
          whenToUse:
            "Use when fear of judgment is keeping you from moving forward.",
        },
      ],

      sampleResponses: [],

      proofPoints: [
        {
          label: "Process",
          text:
            "Focus on faithfulness, not outcomes. Plant seeds and trust God with the harvest.",
        },
        {
          label: "Rituals",
          text:
            "Keep Christ central. Do not let symbols overshadow the gospel.",
        },
        {
          label: "Oaths",
          text:
            "Be clear and unapologetic about Jesus. Speak truth in love.",
        },
        {
          label: "Obscurity",
          text:
            "Do not hide your light to avoid criticism. Let Jesus be seen.",
        },
        {
          label: "Founding",
          text:
            "You may be the first, but you will not be the last. Your faithfulness will inspire others.",
        },
      ],

      prayer:
        "Lord, I am afraid of being judged. Give me courage. Use this event for Your glory. Amen.",

      videos: [],
    },

    ministry_idea: {
      headline: "Design your event to point people to Jesus",
      intro:
        "You are planning something faith-centered for your organization. This is your chance to create a moment where people can encounter Christ. Here is how to do it well: be clear, be gracious, be prayerful, and trust the Holy Spirit to do the work.",

      scriptureToolkit: [
        {
          ref: "Matthew 5:16",
          summary: "Let your light shine before others.",
          whenToUse:
            "Use as your guiding principle for the event. Make Jesus visible.",
        },
        {
          ref: "John 12:32",
          summary: "If I am lifted up, I will draw all people to myself.",
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
          text:
            "Do not water down the message. Be faithful to Scripture.",
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
