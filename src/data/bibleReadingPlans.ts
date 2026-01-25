// Greek Life Bible Reading Plans - Tailored for unique challenges faced by Christians in BGLOs

export interface DailyReading {
  day: number;
  scripture: string;
  title: string;
  focus: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  durationDays: number;
  category: 'faith' | 'identity' | 'leadership' | 'apologetics' | 'community';
  icon: string;
  keyThemes: string[];
  dailyReadings: DailyReading[];
}

export const GREEK_LIFE_READING_PLANS: ReadingPlan[] = [
  {
    id: 'faith-under-fire',
    title: 'Faith Under Fire',
    description: 'Stand firm when your membership is questioned by family, church, or community. Learn to respond with grace and biblical wisdom.',
    duration: '14 days',
    durationDays: 14,
    category: 'apologetics',
    icon: 'Flame',
    keyThemes: ['Persecution', 'Courage', 'Standing Firm', 'Grace Under Pressure'],
    dailyReadings: [
      { day: 1, scripture: '1 Peter 3:15-16', title: 'Ready to Give an Answer', focus: 'Prepare a gentle, respectful defense of your faith choices' },
      { day: 2, scripture: 'Romans 14:1-12', title: 'Disputable Matters', focus: 'Understanding conscience and Christian liberty' },
      { day: 3, scripture: 'Matthew 10:16-20', title: 'Wise as Serpents', focus: 'Navigating opposition with wisdom and innocence' },
      { day: 4, scripture: '2 Timothy 1:7-8', title: 'Spirit of Power', focus: 'Overcoming fear of judgment and rejection' },
      { day: 5, scripture: 'Acts 17:16-34', title: 'Paul in Athens', focus: 'Engaging culture without compromising truth' },
      { day: 6, scripture: 'Galatians 1:10', title: 'Pleasing God or Man?', focus: 'Finding your ultimate audience' },
      { day: 7, scripture: '1 Corinthians 8:1-13', title: 'Knowledge and Love', focus: 'The "idol is nothing" principle applied' },
      { day: 8, scripture: 'James 1:2-8', title: 'Trials Produce Wisdom', focus: 'Growing through criticism and questioning' },
      { day: 9, scripture: 'Colossians 2:16-23', title: 'Freedom from Judgment', focus: 'Not letting others judge your conscience matters' },
      { day: 10, scripture: 'Philippians 1:27-30', title: 'Conduct Worthy', focus: 'Living above reproach while under scrutiny' },
      { day: 11, scripture: 'Romans 12:17-21', title: 'Overcoming Evil with Good', focus: 'Responding to accusers with grace' },
      { day: 12, scripture: 'Hebrews 10:32-39', title: 'Do Not Shrink Back', focus: 'Persevering through criticism' },
      { day: 13, scripture: '1 Peter 4:12-19', title: 'Fiery Trials', focus: 'Rejoicing in suffering for righteousness' },
      { day: 14, scripture: 'Romans 8:31-39', title: 'More Than Conquerors', focus: 'Nothing separates us from God\'s love' },
    ],
  },
  {
    id: 'walking-in-dual-identity',
    title: 'Walking in Dual Identity',
    description: 'Integrate your Christian faith with your Greek identity. Discover how Paul navigated multiple identities for the Gospel.',
    duration: '21 days',
    durationDays: 21,
    category: 'identity',
    icon: 'Users',
    keyThemes: ['Identity in Christ', 'Cultural Engagement', 'Being All Things', 'Integration'],
    dailyReadings: [
      { day: 1, scripture: '1 Corinthians 9:19-23', title: 'All Things to All People', focus: 'Paul\'s model of cultural flexibility' },
      { day: 2, scripture: 'Galatians 3:26-29', title: 'One in Christ', focus: 'Your primary identity transcends all others' },
      { day: 3, scripture: 'Acts 16:1-3', title: 'Timothy\'s Circumcision', focus: 'Cultural accommodation for mission' },
      { day: 4, scripture: 'Philippians 3:4-11', title: 'Credentials Laid Down', focus: 'What we count as gain vs. knowing Christ' },
      { day: 5, scripture: '2 Corinthians 5:17-21', title: 'New Creation Ambassador', focus: 'Your identity as reconciler' },
      { day: 6, scripture: 'Colossians 3:1-11', title: 'Putting On the New Self', focus: 'Living from your renewed identity' },
      { day: 7, scripture: 'Romans 1:16', title: 'Unashamed', focus: 'Boldness in both identities' },
      { day: 8, scripture: '1 Peter 2:9-12', title: 'A Chosen People', focus: 'Living as royal priesthood in your chapter' },
      { day: 9, scripture: 'Acts 22:1-21', title: 'Paul\'s Testimony', focus: 'Using your background for witness' },
      { day: 10, scripture: 'John 17:14-19', title: 'In the World, Not Of It', focus: 'Sanctified for mission, not isolation' },
      { day: 11, scripture: 'Matthew 5:13-16', title: 'Salt and Light', focus: 'Preserving and illuminating your community' },
      { day: 12, scripture: 'Ephesians 2:10', title: 'Created for Good Works', focus: 'Your Greek membership as prepared path' },
      { day: 13, scripture: 'Daniel 1:1-21', title: 'Daniel in Babylon', focus: 'Excellence while maintaining convictions' },
      { day: 14, scripture: 'Esther 4:12-17', title: 'For Such a Time', focus: 'Positioned for kingdom purpose' },
      { day: 15, scripture: 'Romans 12:1-2', title: 'Living Sacrifice', focus: 'Transformation, not isolation' },
      { day: 16, scripture: 'Jeremiah 29:4-7', title: 'Seek the Welfare', focus: 'Blessing your organization from within' },
      { day: 17, scripture: '1 Corinthians 10:31-33', title: 'Do All for Glory', focus: 'Greek life activities as worship' },
      { day: 18, scripture: 'Nehemiah 1-2 (selections)', title: 'Strategic Positioning', focus: 'Using influence for God\'s purposes' },
      { day: 19, scripture: 'Acts 17:22-31', title: 'Finding Common Ground', focus: 'Connecting Greek values to the Gospel' },
      { day: 20, scripture: 'Philemon 1:1-25', title: 'Transformed Relationships', focus: 'Brotherhood/sisterhood redeemed' },
      { day: 21, scripture: 'Revelation 7:9-10', title: 'Every Tribe and Tongue', focus: 'Cultural diversity in eternal worship' },
    ],
  },
  {
    id: 'servant-leadership-greek-style',
    title: 'Servant Leadership: Greek Style',
    description: 'Lead your chapter with biblical principles. Transform your officer role into kingdom influence.',
    duration: '14 days',
    durationDays: 14,
    category: 'leadership',
    icon: 'Crown',
    keyThemes: ['Servant Leadership', 'Integrity', 'Influence', 'Accountability'],
    dailyReadings: [
      { day: 1, scripture: 'Mark 10:42-45', title: 'Not So Among You', focus: 'Jesus\' model of servant leadership' },
      { day: 2, scripture: 'John 13:1-17', title: 'Washing Feet', focus: 'Humility in chapter leadership' },
      { day: 3, scripture: '1 Timothy 3:1-7', title: 'Qualifications', focus: 'Character standards for leaders' },
      { day: 4, scripture: 'Nehemiah 2:11-18', title: 'Inspecting the Walls', focus: 'Understanding before acting' },
      { day: 5, scripture: 'Proverbs 11:14', title: 'Many Counselors', focus: 'Wisdom in collective leadership' },
      { day: 6, scripture: 'Acts 6:1-7', title: 'Delegation', focus: 'Empowering others to serve' },
      { day: 7, scripture: 'Titus 2:7-8', title: 'Example in Everything', focus: 'Leading by modeling' },
      { day: 8, scripture: '1 Peter 5:1-4', title: 'Shepherding the Flock', focus: 'Caring for chapter members' },
      { day: 9, scripture: 'Proverbs 16:18-19', title: 'Pride and Humility', focus: 'Staying grounded in leadership' },
      { day: 10, scripture: 'Exodus 18:13-26', title: 'Moses\' Organization', focus: 'Structuring for effectiveness' },
      { day: 11, scripture: 'James 3:1-12', title: 'Taming the Tongue', focus: 'Speaking as a leader' },
      { day: 12, scripture: '2 Timothy 2:2', title: 'Entrust to Faithful', focus: 'Developing next-generation leaders' },
      { day: 13, scripture: 'Matthew 25:14-30', title: 'Faithful with Little', focus: 'Stewardship of your position' },
      { day: 14, scripture: 'Philippians 2:1-11', title: 'Mind of Christ', focus: 'Ultimate model of servant leadership' },
    ],
  },
  {
    id: 'brotherhood-sisterhood-gods-way',
    title: 'Brotherhood & Sisterhood: God\'s Way',
    description: 'Deepen authentic relationships in your chapter through biblical principles of community and love.',
    duration: '10 days',
    durationDays: 10,
    category: 'community',
    icon: 'Heart',
    keyThemes: ['Authentic Community', 'Accountability', 'Bearing Burdens', 'Unity'],
    dailyReadings: [
      { day: 1, scripture: 'Proverbs 27:17', title: 'Iron Sharpens Iron', focus: 'The gift of mutual sharpening' },
      { day: 2, scripture: 'Ecclesiastes 4:9-12', title: 'Two Are Better', focus: 'The strength of partnership' },
      { day: 3, scripture: 'Galatians 6:1-5', title: 'Bear One Another\'s Burdens', focus: 'Supporting struggling brothers/sisters' },
      { day: 4, scripture: 'Hebrews 10:24-25', title: 'Spur One Another On', focus: 'Active encouragement in chapter' },
      { day: 5, scripture: '1 John 3:16-18', title: 'Love in Action', focus: 'Sacrificial love, not just words' },
      { day: 6, scripture: 'Romans 12:9-16', title: 'Genuine Love', focus: 'Marks of authentic community' },
      { day: 7, scripture: 'Colossians 3:12-17', title: 'Clothed with Compassion', focus: 'Character in community' },
      { day: 8, scripture: 'James 5:16', title: 'Confess and Pray', focus: 'Vulnerability and healing' },
      { day: 9, scripture: 'Ephesians 4:1-6', title: 'Unity of the Spirit', focus: 'Maintaining oneness amid diversity' },
      { day: 10, scripture: 'John 15:12-17', title: 'Greater Love', focus: 'Jesus\' command for friendship' },
    ],
  },
  {
    id: 'proof-scripture-deep-dive',
    title: 'P.R.O.O.F. Scripture Deep Dive',
    description: 'Study every key passage behind the P.R.O.O.F. Framework. Build unshakeable biblical foundations for your position.',
    duration: '21 days',
    durationDays: 21,
    category: 'apologetics',
    icon: 'BookOpen',
    keyThemes: ['Biblical Authority', 'Conscience', 'Discernment', 'Freedom in Christ'],
    dailyReadings: [
      // Pledge Process Foundations
      { day: 1, scripture: 'Hebrews 10:24-25', title: 'Stirring to Good Works', focus: 'Biblical mentorship vs. hazing' },
      { day: 2, scripture: 'Proverbs 27:17', title: 'Iron Sharpens Iron', focus: 'Character formation through relationship' },
      { day: 3, scripture: 'Luke 6:40', title: 'Like the Teacher', focus: 'Discipleship and training' },
      // Rituals Foundations
      { day: 4, scripture: '1 Corinthians 8:1-13', title: 'Idols Are Nothing', focus: 'Core truth: belief determines power' },
      { day: 5, scripture: 'Romans 14:14', title: 'Nothing Unclean in Itself', focus: 'Conscience and neutrality' },
      { day: 6, scripture: '1 Thessalonians 5:21-22', title: 'Test Everything', focus: 'Discernment, not blanket rejection' },
      { day: 7, scripture: 'Colossians 2:20-23', title: 'Human Regulations', focus: 'Freedom from legalism' },
      // Oaths Foundations
      { day: 8, scripture: 'Acts 17:16-34', title: 'Paul Uses Greek Culture', focus: 'Cultural engagement precedent' },
      { day: 9, scripture: '1 Corinthians 9:19-23', title: 'Becoming All Things', focus: 'Flexibility for the Gospel' },
      { day: 10, scripture: 'Titus 1:12-13', title: 'Quoting Pagan Poets', focus: 'Using culture for truth' },
      // Obscurity Foundations
      { day: 11, scripture: 'Matthew 13:10-17', title: 'Jesus Speaks in Parables', focus: 'Private teaching precedent' },
      { day: 12, scripture: 'Mark 4:33-34', title: 'Privately He Explained', focus: 'Inner circle instruction' },
      { day: 13, scripture: 'Matthew 7:6', title: 'Pearls Before Swine', focus: 'Wisdom in what we share' },
      // Founders Foundations
      { day: 14, scripture: 'Matthew 7:16-20', title: 'Known by Their Fruits', focus: 'Judging by current reality' },
      { day: 15, scripture: '2 Corinthians 5:17', title: 'New Creation', focus: 'Transformation principle' },
      { day: 16, scripture: '1 Corinthians 3:11', title: 'Foundation of Christ', focus: 'What foundation you build on' },
      // Applied Conscience
      { day: 17, scripture: 'Romans 14:22-23', title: 'Faith and Conscience', focus: 'Operating from conviction' },
      { day: 18, scripture: '1 Corinthians 10:23-33', title: 'All Things Lawful', focus: 'Freedom balanced with love' },
      { day: 19, scripture: 'Galatians 5:1', title: 'Freedom in Christ', focus: 'Standing firm against legalism' },
      // Integration
      { day: 20, scripture: 'James 1:5-8', title: 'Ask for Wisdom', focus: 'Seeking God\'s guidance in gray areas' },
      { day: 21, scripture: 'Philippians 4:8-9', title: 'Think on These Things', focus: 'Framework for evaluation' },
    ],
  },
];

// Helper to get plan by ID
export function getReadingPlanById(id: string): ReadingPlan | undefined {
  return GREEK_LIFE_READING_PLANS.find(plan => plan.id === id);
}

// Helper to get plans by category
export function getReadingPlansByCategory(category: ReadingPlan['category']): ReadingPlan[] {
  return GREEK_LIFE_READING_PLANS.filter(plan => plan.category === category);
}
