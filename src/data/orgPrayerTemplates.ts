export interface OrgPrayerTemplate {
  id: string;
  councilId: string;
  category: string;
  title: string;
  prayer: string;
  scripture: string;
  tags: string[];
}

export const orgPrayerTemplates: OrgPrayerTemplate[] = [
  // NPHC Prayers
  {
    id: 'nphc-chapter',
    councilId: 'nphc',
    category: 'chapter',
    title: 'Prayer for Divine Nine Chapter',
    prayer: `Heavenly Father,

We lift up our chapter to You today. Thank You for the legacy of service, scholarship, and uplift that our founders established. Help us honor their vision while keeping You at the center.

Lord, guide our line brothers/sisters in faith and fellowship. May our stepping, strolling, and celebrations bring glory to Your name. Help us use our platform to serve our community and point others to Your love.

Protect us from pride and division. Unite us in purpose and keep us accountable to one another and to You. May our organization be a testimony of what redeemed Greek life looks like.

In Jesus' name, Amen.`,
    scripture: 'Micah 6:8',
    tags: ['chapter', 'divine nine', 'service', 'unity']
  },
  {
    id: 'nphc-probate',
    councilId: 'nphc',
    category: 'events',
    title: 'Prayer Before Probate/Reveal',
    prayer: `Lord Jesus,

As we prepare to present new members to our community, we ask for Your blessing over this celebration. Help us remember that our true identity is found in You, not in our letters.

May this probate bring honor to our founders, our organization, and most importantly, to You. Help our new members walk in the legacy of service while keeping their eyes fixed on You.

Guard our hearts from pride and our celebration from excess. Let this be a moment that points others to the transformation You bring.

In Your name, Amen.`,
    scripture: 'Colossians 3:23-24',
    tags: ['probate', 'new members', 'celebration', 'witness']
  },
  {
    id: 'nphc-stepping',
    councilId: 'nphc',
    category: 'events',
    title: 'Prayer for Step Shows',
    prayer: `Creator God,

You have given us creativity, rhythm, and the ability to express ourselves through movement. As we prepare to step, help us use this gift for Your glory.

May our performance inspire excellence, unity, and joy. Protect us from injury and help us support one another. Let our stepping be a celebration of the talents You've given us.

Help us represent our organization and our faith well in all we do.

In Jesus' name, Amen.`,
    scripture: 'Psalm 149:3',
    tags: ['stepping', 'performance', 'creativity', 'excellence']
  },

  // NPC Prayers
  {
    id: 'npc-sisterhood',
    councilId: 'npc',
    category: 'sisterhood',
    title: 'Prayer for Panhellenic Sisterhood',
    prayer: `Gracious God,

Thank You for the gift of sisterhood in our sorority. Help us to love one another deeply, as You have loved us. May our bonds reflect the unity we have in Christ.

Guide us to encourage, support, and challenge one another toward growth. Help us navigate the pressures of sorority life with grace and integrity.

When conflict arises, give us wisdom to resolve it with love. May our sisterhood be a testimony of Christian community to those who are watching.

In Jesus' name, Amen.`,
    scripture: 'Romans 12:10',
    tags: ['sisterhood', 'love', 'community', 'support']
  },
  {
    id: 'npc-recruitment',
    councilId: 'npc',
    category: 'events',
    title: 'Prayer for Recruitment',
    prayer: `Lord of All,

As we enter recruitment season, help us to see each potential new member as You see them - valuable, loved, and full of potential.

Guard us from superficial judgments and help us look for genuine character and shared values. Give us wisdom to know who would thrive in our sisterhood.

Help us to be authentic and welcoming, representing both our sorority and our faith well. May this process honor You in every way.

In Your name, Amen.`,
    scripture: '1 Samuel 16:7',
    tags: ['recruitment', 'welcoming', 'discernment', 'authenticity']
  },
  {
    id: 'npc-philanthropy',
    councilId: 'npc',
    category: 'service',
    title: 'Prayer for Philanthropy Events',
    prayer: `Compassionate Father,

As we prepare for our philanthropy event, help us remember why we serve. May this not be about recognition or competition, but about genuinely helping those in need.

Bless our efforts and multiply our impact. Help us to serve with joy and humility, reflecting Christ's heart for the vulnerable.

May those we serve feel Your love through our actions. Use this work to draw others to Your Kingdom.

In Jesus' name, Amen.`,
    scripture: 'Matthew 25:40',
    tags: ['philanthropy', 'service', 'compassion', 'impact']
  },

  // IFC/NIC Prayers
  {
    id: 'nic-brotherhood',
    councilId: 'nic',
    category: 'brotherhood',
    title: 'Prayer for Fraternity Brotherhood',
    prayer: `Mighty God,

Thank You for the brotherhood You've given me in this fraternity. Help us to sharpen one another as iron sharpens iron.

Guard our brotherhood from toxic masculinity and unhealthy competition. Help us to be vulnerable, accountable, and supportive of one another.

May our house be known for integrity, not just for parties. Help us challenge each other to become the men You created us to be.

In Jesus' name, Amen.`,
    scripture: 'Proverbs 27:17',
    tags: ['brotherhood', 'accountability', 'integrity', 'growth']
  },
  {
    id: 'nic-social',
    councilId: 'nic',
    category: 'events',
    title: 'Prayer Before Social Events',
    prayer: `Lord Jesus,

As we gather for this social event, help me to be a light in whatever environment I find myself. Guard my heart and mind from temptation.

Give me wisdom to know my limits and courage to maintain them. Help me to look out for my brothers and for others who may need help.

May my conduct tonight honor You and reflect well on my faith. Use me to be a positive influence, even in social settings.

In Your name, Amen.`,
    scripture: 'Matthew 5:16',
    tags: ['social events', 'light', 'wisdom', 'influence']
  },
  {
    id: 'nic-pledgeship',
    councilId: 'nic',
    category: 'membership',
    title: 'Prayer for New Members/Pledges',
    prayer: `Heavenly Father,

We lift up our new members as they go through this formative time. Protect them from harm and help us to develop them with integrity.

Guide us to build up rather than tear down, to challenge without hazing, and to create bonds that honor You. May this process produce men of character.

Help our new members to integrate their faith into their Greek experience from the very beginning. May they find brothers who will support their spiritual journey.

In Jesus' name, Amen.`,
    scripture: '1 Thessalonians 5:11',
    tags: ['pledges', 'new members', 'development', 'integrity']
  },

  // NALFO Prayers
  {
    id: 'nalfo-heritage',
    councilId: 'nalfo',
    category: 'identity',
    title: 'Prayer for Cultural & Faith Integration',
    prayer: `Dios Padre,

Thank You for the rich heritage You've given me - both my cultura and my faith. Help me to honor both as I navigate Greek life.

Guide me to be a bridge between my community, my organization, and Your Kingdom. May my faith strengthen my cultural pride, not compete with it.

Help me share the Gospel in ways that resonate with my hermanos and hermanas. Use my unique position to reach those who might not otherwise hear Your message.

En el nombre de Jesús, Amén.`,
    scripture: 'Revelation 7:9',
    tags: ['culture', 'heritage', 'bridge-building', 'identity']
  },
  {
    id: 'nalfo-familia',
    councilId: 'nalfo',
    category: 'chapter',
    title: 'Prayer for Organizational Familia',
    prayer: `Loving Father,

You have placed us in familia - both by blood and by letters. Help us to honor both while keeping You first in our hearts.

Bless our organization with unity and purpose. Help us uplift our communities with the same passion our founders had, guided by Your wisdom.

May our bonds reflect the love of Christ. Help us support one another in faith as we navigate the unique intersection of Latino/a identity and Greek life.

In Jesus' name, Amen.`,
    scripture: 'Galatians 6:10',
    tags: ['familia', 'community', 'support', 'unity']
  },

  // NAPA Prayers
  {
    id: 'napa-excellence',
    councilId: 'napa',
    category: 'academics',
    title: 'Prayer for Academic Excellence',
    prayer: `All-Wise God,

Thank You for the gift of intellect and the opportunity to pursue education. Help me to use my academic abilities for Your glory, not just for personal success.

Balance my drive for excellence with rest and relationship. Help me remember that my worth is not in my grades or achievements, but in being Your child.

May my academic success open doors to serve others and advance Your Kingdom.

In Jesus' name, Amen.`,
    scripture: 'Colossians 3:23',
    tags: ['academics', 'excellence', 'balance', 'stewardship']
  },
  {
    id: 'napa-honor',
    councilId: 'napa',
    category: 'identity',
    title: 'Prayer for Honoring Family & Faith',
    prayer: `Heavenly Father,

I want to honor my family while honoring You. Sometimes these feel like competing loyalties. Give me wisdom to navigate expectations with grace.

Help my family see that my faith enhances rather than diminishes our cultural values. Use me to share Your love in ways that resonate with my heritage.

May I be a faithful son/daughter to my parents and a faithful child to You.

In Jesus' name, Amen.`,
    scripture: 'Exodus 20:12',
    tags: ['family', 'honor', 'faith', 'culture']
  },

  // NMGC Prayers
  {
    id: 'nmgc-diversity',
    councilId: 'nmgc',
    category: 'community',
    title: 'Prayer for Multicultural Unity',
    prayer: `God of All Nations,

Thank You for the beautiful diversity in our organization. Help us to see our differences as strength and our unity as testimony to Your Kingdom.

Guide us to celebrate each other's backgrounds while uniting around shared values. May our multicultural community reflect the diversity that will one day worship together in heaven.

Use our unique position to break barriers and build bridges for Your glory.

In Jesus' name, Amen.`,
    scripture: 'Galatians 3:28',
    tags: ['diversity', 'unity', 'inclusion', 'kingdom']
  },
  {
    id: 'nmgc-identity',
    councilId: 'nmgc',
    category: 'identity',
    title: 'Prayer for Identity in Christ',
    prayer: `Creator God,

With multiple cultural influences and identities, I sometimes feel pulled in many directions. Help me find my anchor in You.

You made me exactly as I am - with my background, my experiences, and my unique perspective. Help me embrace all of who I am while finding my ultimate identity in Christ.

May I use my diverse background to connect with others and share Your love across boundaries.

In Jesus' name, Amen.`,
    scripture: 'Psalm 139:14',
    tags: ['identity', 'diversity', 'purpose', 'belonging']
  },

  // Professional Greek Prayers
  {
    id: 'professional-career',
    councilId: 'professional',
    category: 'career',
    title: 'Prayer for Professional Integrity',
    prayer: `Sovereign Lord,

As I pursue professional success, help me to maintain integrity in all my dealings. Guard me from compromising my values for advancement.

Use my career for Your purposes. Open doors that align with Your will and close those that would lead me astray. Help me to be a witness in my workplace.

May my professional success bring glory to You and benefit to others.

In Jesus' name, Amen.`,
    scripture: 'Proverbs 11:3',
    tags: ['career', 'integrity', 'success', 'witness']
  },
  {
    id: 'professional-networking',
    councilId: 'professional',
    category: 'events',
    title: 'Prayer for Networking Events',
    prayer: `God of Connections,

As I network professionally, help me to see each person as someone made in Your image. Guard me from using people solely for advancement.

Give me opportunities to make genuine connections that can become Kingdom relationships. Help me to be generous with my connections and to lift others up.

May my networking honor You and serve others well.

In Jesus' name, Amen.`,
    scripture: 'Proverbs 18:24',
    tags: ['networking', 'relationships', 'generosity', 'connections']
  },

  // Honor Society Prayers
  {
    id: 'honor-humility',
    councilId: 'honor',
    category: 'character',
    title: 'Prayer for Humble Achievement',
    prayer: `All-Knowing God,

You have blessed me with academic gifts and opened doors of recognition. Help me to remain humble, knowing that every good gift comes from You.

Guard my heart from pride and arrogance. Help me to use my knowledge to serve others, not to elevate myself above them.

May my achievements point others to You, the source of all wisdom.

In Jesus' name, Amen.`,
    scripture: 'James 1:17',
    tags: ['humility', 'achievement', 'wisdom', 'gratitude']
  },
  {
    id: 'honor-service',
    councilId: 'honor',
    category: 'service',
    title: 'Prayer for Using Knowledge to Serve',
    prayer: `Lord of All Wisdom,

You have given me knowledge - help me to use it for good. Show me how my academic gifts can address real needs in my community.

Connect me with opportunities to use my expertise for Kingdom purposes. Help me to be generous with my knowledge, teaching and mentoring others.

May my intellectual pursuits always be in service of Your greater purposes.

In Jesus' name, Amen.`,
    scripture: 'Luke 12:48',
    tags: ['service', 'knowledge', 'mentoring', 'stewardship']
  },

  // Universal Prayers (all councils)
  {
    id: 'universal-initiation',
    councilId: 'all',
    category: 'membership',
    title: 'Prayer Before Initiation Ceremonies',
    prayer: `Holy God,

As I participate in initiation ceremonies, help me to honor my organization while maintaining my allegiance to You.

Give me discernment to know what honors You and what does not. Help me to find ways to participate authentically without compromising my faith.

Use this experience to deepen my understanding of commitment, brotherhood/sisterhood, and transformation - all themes that connect to my relationship with You.

In Jesus' name, Amen.`,
    scripture: 'Romans 12:2',
    tags: ['initiation', 'discernment', 'commitment', 'transformation']
  },
  {
    id: 'universal-leadership',
    councilId: 'all',
    category: 'leadership',
    title: 'Prayer for Greek Leadership',
    prayer: `Lord Jesus,

You modeled servant leadership perfectly. Help me to lead my organization with that same humility and purpose.

Guard me from using leadership for ego or status. Help me to serve those I lead, developing them and putting their needs above my own recognition.

May my leadership point others to You, the ultimate servant leader.

In Your name, Amen.`,
    scripture: 'Mark 10:45',
    tags: ['leadership', 'servant', 'humility', 'influence']
  },
  {
    id: 'universal-witness',
    councilId: 'all',
    category: 'faith',
    title: 'Prayer for Being a Witness in Greek Life',
    prayer: `God of Grace,

Help me to be a faithful witness in my Greek community. Give me courage to share my faith and wisdom to do so with love.

Open doors for spiritual conversations with my brothers/sisters. Help me to answer questions with grace and truth.

May my life be a living testimony that faith and Greek life can coexist beautifully.

In Jesus' name, Amen.`,
    scripture: '1 Peter 3:15',
    tags: ['witness', 'evangelism', 'faith', 'testimony']
  }
];

// Helper function to get prayers for a specific council
export function getOrgPrayerTemplates(councilId: string): OrgPrayerTemplate[] {
  return orgPrayerTemplates.filter(
    template => template.councilId === councilId || template.councilId === 'all'
  );
}

// Get all unique categories for org prayers
export function getOrgPrayerCategories(councilId: string): string[] {
  const prayers = getOrgPrayerTemplates(councilId);
  const categories = [...new Set(prayers.map(p => p.category))];
  return categories;
}

// Prayer category metadata
export const orgPrayerCategories = [
  { id: 'chapter', name: 'Chapter & Organization', icon: '🏛️', color: 'from-blue-500 to-indigo-600' },
  { id: 'brotherhood', name: 'Brotherhood', icon: '👊', color: 'from-slate-500 to-gray-600' },
  { id: 'sisterhood', name: 'Sisterhood', icon: '💕', color: 'from-pink-500 to-rose-600' },
  { id: 'events', name: 'Events & Gatherings', icon: '🎉', color: 'from-purple-500 to-violet-600' },
  { id: 'service', name: 'Service & Philanthropy', icon: '🤝', color: 'from-green-500 to-emerald-600' },
  { id: 'membership', name: 'Membership & Initiation', icon: '🎓', color: 'from-amber-500 to-orange-600' },
  { id: 'leadership', name: 'Leadership', icon: '👑', color: 'from-yellow-500 to-amber-600' },
  { id: 'identity', name: 'Identity & Culture', icon: '🌍', color: 'from-teal-500 to-cyan-600' },
  { id: 'academics', name: 'Academics', icon: '📚', color: 'from-indigo-500 to-blue-600' },
  { id: 'career', name: 'Career & Professional', icon: '💼', color: 'from-gray-500 to-slate-600' },
  { id: 'character', name: 'Character & Growth', icon: '🌱', color: 'from-lime-500 to-green-600' },
  { id: 'faith', name: 'Faith & Witness', icon: '✝️', color: 'from-sacred to-warm-blue' }
];
