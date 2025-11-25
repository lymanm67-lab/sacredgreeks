export interface PrayerMethod {
  id: string;
  name: string;
  description: string;
  steps: string[];
  example: string;
  scripture: string;
  tips: string[];
}

export const prayerMethods: PrayerMethod[] = [
  {
    id: 'acts',
    name: 'ACTS Prayer Method',
    description: 'A simple and structured approach to prayer that helps you cover all aspects of communication with God.',
    steps: [
      'Adoration - Begin by praising God for who He is. Focus on His character, attributes, and greatness.',
      'Confession - Acknowledge your sins and shortcomings. Ask for forgiveness and cleansing.',
      'Thanksgiving - Express gratitude for what God has done. Thank Him for specific blessings and answered prayers.',
      'Supplication - Make your requests known to God. Pray for yourself, others, and specific needs.'
    ],
    example: `"Father God, You are mighty and compassionate, the Creator of all things. (Adoration)

I confess that I have been impatient and spoken harshly this week. Please forgive me and help me to grow. (Confession)

Thank You for Your provision, for my health, and for the friends You've placed in my life. (Thanksgiving)

I ask that You would guide me in my decisions this week and provide healing for my friend who is sick. (Supplication)

In Jesus' name, Amen."`,
    scripture: 'Philippians 4:6 - "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."',
    tips: [
      'Spend equal time on each part - don\'t rush through adoration to get to supplication',
      'Write out your prayers using ACTS to help you stay focused',
      'Use this structure during your daily quiet time',
      'As you grow, the structure will become natural and you can pray more freely'
    ]
  },
  {
    id: 'lectio',
    name: 'Lectio Divina (Divine Reading)',
    description: 'An ancient practice of praying Scripture, allowing God to speak to you through His Word.',
    steps: [
      'Lectio (Read) - Read a passage of Scripture slowly and attentively. Listen for a word or phrase that stands out.',
      'Meditatio (Meditate) - Reflect deeply on the word or phrase. What does it mean? Why did it catch your attention?',
      'Oratio (Pray) - Respond to God based on what you\'ve read. Share your thoughts, feelings, and questions with Him.',
      'Contemplatio (Contemplate) - Rest in God\'s presence. Simply be with Him without words, letting the truth sink in.',
      'Actio (Action) - Consider how this Scripture should impact your life. What will you do differently?'
    ],
    example: `Reading Psalm 23:1 - "The Lord is my shepherd, I shall not want."

The word "shepherd" stands out to me. (Lectio)

I meditate on what a shepherd does - guides, protects, provides, cares for sheep personally. God does this for me. (Meditatio)

"Lord, thank You for being my shepherd. I need Your guidance today in this decision I'm facing." (Oratio)

I sit quietly, feeling His presence and care for me. (Contemplatio)

I will trust God's guidance today instead of worrying. (Actio)`,
    scripture: 'Psalm 119:105 - "Your word is a lamp for my feet, a light on my path."',
    tips: [
      'Choose a short passage (5-10 verses) to start',
      'Don\'t rush - this is meant to be slow and contemplative',
      'It\'s okay to spend multiple days on the same passage',
      'Journal your insights from each step',
      'Some days you may spend more time in one step than others'
    ]
  },
  {
    id: 'conversational',
    name: 'Conversational Prayer',
    description: 'Praying as if you\'re having a conversation with a close friend, making prayer more natural and personal.',
    steps: [
      'Start simply - Begin with "Good morning, God" or "Father, I want to talk with You."',
      'Share your day - Tell God about what\'s happening in your life, both big and small.',
      'Be honest - Express your true feelings: frustrations, joys, confusions, fears.',
      'Listen - Pause and pay attention to thoughts, impressions, or Scripture that comes to mind.',
      'Respond - Continue the conversation based on what you sense God is saying.'
    ],
    example: `"Good morning, Lord. I'm sitting here with my coffee, and honestly, I'm feeling anxious about that presentation today.

I know You're with me, but I just keep thinking about all the things that could go wrong. Can You help me with this?

(Pause) I remember You said 'Do not be anxious about anything.' You're right - I need to trust You with this.

Thank You for reminding me. I'm going to prepare well and then trust You with the results. Help me to honor You in how I present.

Thanks for listening, Lord. I love You."`,
    scripture: 'Philippians 4:6-7 - "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."',
    tips: [
      'Prayer doesn\'t have to be formal or use special language',
      'Talk to God throughout your day, not just in set prayer times',
      'Write out prayers like you\'re texting a friend',
      'Remember that God cares about every detail of your life',
      'Practice listening - prayer is two-way communication'
    ]
  },
  {
    id: 'breath',
    name: 'Breath Prayer',
    description: 'A short, simple prayer that can be repeated with your breathing, keeping you aware of God\'s presence throughout the day.',
    steps: [
      'Choose a short phrase - Select a 6-12 word prayer that addresses your current need.',
      'Split the phrase - Divide it into two parts: one for breathing in, one for breathing out.',
      'Breathe in - As you inhale, pray the first part silently.',
      'Breathe out - As you exhale, pray the second part silently.',
      'Repeat - Continue this pattern, letting the prayer become natural with your breathing.'
    ],
    example: `Common breath prayers:

(Breathe in) "Lord Jesus Christ" 
(Breathe out) "Have mercy on me"

(Breathe in) "Be still"
(Breathe out) "And know that I am God"

(Breathe in) "Your presence"
(Breathe out) "My peace"

(Breathe in) "I can do all things"
(Breathe out) "Through Christ who strengthens me"`,
    scripture: '1 Thessalonians 5:17 - "Pray continually."',
    tips: [
      'Use this during stressful moments to quickly center yourself on God',
      'Practice while driving, waiting in line, or before sleep',
      'Choose a prayer that addresses your current spiritual need',
      'Don\'t overthink it - let it become as natural as breathing',
      'Change your breath prayer as your needs change'
    ]
  },
  {
    id: 'fasting',
    name: 'Prayer with Fasting',
    description: 'Combining prayer with fasting from food or other activities to seek God more intensely and demonstrate dependence on Him.',
    steps: [
      'Choose your fast - Decide what you\'ll abstain from (food, social media, TV) and for how long.',
      'Set your intention - Be clear about why you\'re fasting and what you\'re seeking from God.',
      'Replace the activity - When you would normally eat or do the activity, pray instead.',
      'Stay in Scripture - Read God\'s Word to nourish your spirit while your body fasts.',
      'Break the fast mindfully - End with thanksgiving and reflection on what God revealed.'
    ],
    example: `"Lord, I'm beginning this day of fasting to seek Your will about [specific situation]. 

Every time I feel hungry today, I'll remember that I need You more than food. I'm setting aside this time to focus on You.

(Throughout the day, during meal times) Father, I'm here seeking Your face. Speak to me about this decision. Give me clarity and wisdom.

(End of fast) Thank You for this time with You. I feel You leading me toward [specific direction]. Help me to walk in obedience."`,
    scripture: 'Matthew 6:16-18 - "When you fast, do not look somber as the hypocrites do... But when you fast, put oil on your head and wash your face, so that it will not be obvious to others that you are fasting, except to your Father."',
    tips: [
      'Start with partial fasts (one meal) before attempting longer fasts',
      'Stay hydrated - water is important even during food fasts',
      'Consult a doctor if you have health conditions',
      'Fast for the right reasons - to draw closer to God, not to manipulate Him',
      'Keep your fast between you and God',
      'Journal what God reveals to you during your fast'
    ]
  },
  {
    id: 'intercessory',
    name: 'Intercessory Prayer',
    description: 'Praying on behalf of others, standing in the gap and bringing their needs before God.',
    steps: [
      'List those to pray for - Write down specific people and their needs.',
      'Pray specifically - Don\'t just say "bless them" - pray for particular situations and outcomes.',
      'Claim promises - Use Scripture to support your prayers for others.',
      'Pray with faith - Believe that God hears and will act according to His will.',
      'Follow up - Check in with those you\'ve prayed for and continue praying.'
    ],
    example: `"Father, I lift up my friend Sarah to You today. She's struggling with anxiety about her job situation.

I pray that You would give her Your peace that surpasses understanding (Philippians 4:7). Open doors of opportunity for her and give her wisdom to recognize Your leading.

I ask that You would provide for her needs according to Your glorious riches (Philippians 4:19). Surround her with people who will encourage her faith.

Help her to trust You in this uncertain time. Let her feel Your presence and know that You have not forgotten her.

In Jesus' name, Amen."`,
    scripture: '1 Timothy 2:1 - "I urge, then, first of all, that petitions, prayers, intercession and thanksgiving be made for all people."',
    tips: [
      'Keep a prayer list or journal to track requests',
      'Ask people specifically how you can pray for them',
      'Pray Scripture over people\'s situations',
      'Set aside specific times for intercessory prayer',
      'Celebrate answered prayers together',
      'Don\'t give up - some prayers require persistence'
    ]
  }
];
