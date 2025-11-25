export interface PrayerTemplate {
  id: string;
  category: string;
  title: string;
  prayer: string;
  scripture: string;
  tags: string[];
}

export const prayerTemplates: PrayerTemplate[] = [
  // Thanksgiving & Gratitude
  {
    id: 'thanksgiving-1',
    category: 'thanksgiving',
    title: 'Morning Gratitude',
    prayer: `Heavenly Father,

As we begin this new day, our hearts overflow with gratitude for Your faithfulness. Thank You for the gift of life, for the breath in our lungs, and for Your mercies that are new every morning.

We thank You for the opportunities ahead, for the people You've placed in our lives, and for Your constant presence. Help us to walk in gratitude throughout this day, recognizing Your hand in all things.

May our lives be a testimony of thanksgiving, reflecting Your goodness to everyone we encounter.

In Jesus' name, Amen.`,
    scripture: 'Lamentations 3:22-23',
    tags: ['morning', 'gratitude', 'daily']
  },
  {
    id: 'thanksgiving-2',
    category: 'thanksgiving',
    title: 'Blessing & Provision',
    prayer: `Gracious God,

We come before You with hearts full of thanksgiving for Your abundant provision. You have blessed us beyond measure, meeting our needs and pouring out Your goodness upon us.

Thank You for Your faithfulness in both seasons of plenty and times of need. We recognize that every good gift comes from Your hand, and we are grateful for Your care.

Help us to be generous with what You've given us, sharing Your blessings with others and always remembering that You are our ultimate Provider.

In Jesus' name, Amen.`,
    scripture: 'Philippians 4:19',
    tags: ['provision', 'blessings', 'thankfulness']
  },

  // Protection & Safety
  {
    id: 'protection-1',
    category: 'protection',
    title: 'Daily Protection',
    prayer: `Lord God, our Refuge and Strength,

We place ourselves under Your divine protection today. Guard our hearts, minds, and bodies as we navigate the challenges ahead. Surround us with Your angels and keep us safe from all harm.

Protect our families, our homes, and our loved ones. Shield us from the schemes of the enemy and guide our steps along Your righteous path.

We trust in Your unfailing protection, knowing that You are our fortress and our defender. Under the shadow of Your wings, we find safety and peace.

In Jesus' name, Amen.`,
    scripture: 'Psalm 91:1-2',
    tags: ['protection', 'safety', 'daily', 'angels']
  },
  {
    id: 'protection-2',
    category: 'protection',
    title: 'Travel Protection',
    prayer: `Heavenly Father,

As we prepare to travel, we ask for Your hand of protection over our journey. Keep us safe on the roads, in the air, or wherever our path may lead.

Guide the hands of those who drive or pilot our means of travel. Alert us to dangers and give us wisdom to make safe decisions. Protect us from accidents, delays, and any harm.

Bring us safely to our destination and back home again, and may Your presence be with us every mile of the way.

In Jesus' name, Amen.`,
    scripture: 'Psalm 121:8',
    tags: ['travel', 'journey', 'safety', 'protection']
  },

  // Healing
  {
    id: 'healing-1',
    category: 'healing',
    title: 'Physical Healing',
    prayer: `Great Physician,

We come before You seeking Your healing touch. You are the God who heals, and we believe in Your power to restore and renew our bodies.

Touch the areas of sickness and pain. Bring healing to every cell, every organ, and every system in our bodies. Give wisdom to doctors and medical professionals treating us.

Strengthen our faith during this time of physical weakness. Help us to trust in Your perfect will and timing, knowing that Your grace is sufficient for us.

In Jesus' name, Amen.`,
    scripture: 'Jeremiah 17:14',
    tags: ['healing', 'physical', 'health', 'restoration']
  },
  {
    id: 'healing-2',
    category: 'healing',
    title: 'Emotional Healing',
    prayer: `Compassionate Father,

Our hearts are wounded and we need Your healing touch on our emotions. You are close to the brokenhearted and save those who are crushed in spirit.

Heal the deep wounds of our past. Remove the pain of disappointment, rejection, and trauma. Replace our sorrow with Your joy, our anxiety with Your peace.

Help us to forgive those who have hurt us and to receive Your forgiveness for our own failures. Restore our emotional wholeness and renew our spirits.

In Jesus' name, Amen.`,
    scripture: 'Psalm 147:3',
    tags: ['healing', 'emotional', 'heart', 'restoration', 'wholeness']
  },

  // Overcoming Fear & Anxiety
  {
    id: 'fear-1',
    category: 'fear',
    title: 'Peace Over Anxiety',
    prayer: `Prince of Peace,

Our hearts are troubled and anxious, but we turn to You for the peace that surpasses all understanding. You have not given us a spirit of fear, but of power, love, and a sound mind.

We cast all our anxieties on You because we know You care for us. Replace our worries with Your perfect peace. Calm the storms in our minds and hearts.

Help us to fix our thoughts on what is true, noble, right, and pure. Give us the strength to take every thought captive and make it obedient to Christ.

In Jesus' name, Amen.`,
    scripture: 'Philippians 4:6-7',
    tags: ['anxiety', 'peace', 'worry', 'fear', 'calm']
  },
  {
    id: 'fear-2',
    category: 'fear',
    title: 'Courage in Fear',
    prayer: `Mighty God,

Fear is trying to grip our hearts, but we choose to trust in Your strength. You have commanded us to be strong and courageous, to not be afraid or discouraged, for You are with us wherever we go.

Give us courage to face what lies ahead. Replace our fear with faith, our doubt with confidence in Your promises. Remind us that You have not abandoned us and never will.

When we feel weak, be our strength. When we feel afraid, be our courage. Help us to walk boldly in the path You've set before us.

In Jesus' name, Amen.`,
    scripture: 'Joshua 1:9',
    tags: ['fear', 'courage', 'strength', 'boldness', 'faith']
  },

  // Strength & Courage
  {
    id: 'strength-1',
    category: 'strength',
    title: 'Strength in Weakness',
    prayer: `Almighty God,

We feel weak and inadequate for the challenges before us. But we know that Your power is made perfect in our weakness, and Your grace is sufficient for us.

Strengthen us with might from Your Spirit in our inner being. When we are weary, renew our strength. When we stumble, help us to rise again with Your power.

May we run and not grow weary, walk and not be faint, because we trust in You, the source of all strength.

In Jesus' name, Amen.`,
    scripture: '2 Corinthians 12:9-10',
    tags: ['strength', 'weakness', 'power', 'endurance']
  },

  // Wisdom & Guidance
  {
    id: 'wisdom-1',
    category: 'wisdom',
    title: 'Decision Making',
    prayer: `All-Knowing God,

We stand at a crossroads and need Your wisdom to guide us. You promise to give wisdom generously to all who ask, so we come before You with open hearts.

Give us clarity of mind to discern Your will. Illuminate the path You want us to take. Close the doors that should remain closed and open the ones You've prepared for us.

Help us to trust in You with all our hearts and not lean on our own understanding. In all our ways, we acknowledge You, and we trust that You will make our paths straight.

In Jesus' name, Amen.`,
    scripture: 'James 1:5',
    tags: ['wisdom', 'guidance', 'decisions', 'discernment', 'direction']
  },

  // Forgiveness & Peace
  {
    id: 'forgiveness-1',
    category: 'forgiveness',
    title: 'Seeking Forgiveness',
    prayer: `Merciful Father,

We come before You with humble hearts, acknowledging our sins and failures. We have fallen short of Your glory and need Your forgiveness.

Thank You for Your promise that if we confess our sins, You are faithful and just to forgive us and cleanse us from all unrighteousness. We receive Your forgiveness with grateful hearts.

Help us to forgive ourselves as You have forgiven us. Remove the weight of guilt and shame, and help us to walk in the freedom of Your grace.

In Jesus' name, Amen.`,
    scripture: '1 John 1:9',
    tags: ['forgiveness', 'repentance', 'grace', 'mercy']
  },
  {
    id: 'forgiveness-2',
    category: 'forgiveness',
    title: 'Forgiving Others',
    prayer: `God of Grace,

Someone has hurt us deeply, and we struggle to forgive. But Your Word calls us to forgive as we have been forgiven.

Give us the strength and willingness to release this hurt and extend forgiveness. Help us to see the person who hurt us through Your eyes of compassion.

We choose to let go of bitterness and resentment. Free us from the prison of unforgiveness, and restore peace to our hearts.

In Jesus' name, Amen.`,
    scripture: 'Colossians 3:13',
    tags: ['forgiveness', 'reconciliation', 'peace', 'healing', 'grace']
  },

  // Relationships & Community
  {
    id: 'relationships-1',
    category: 'relationships',
    title: 'Family Unity',
    prayer: `Loving Father,

We pray for unity and love within our families. You have placed us together for Your purposes, and we ask for Your blessing on our relationships.

Help us to love one another deeply, to be patient and kind, to forgive quickly and communicate honestly. Heal any divisions and restore broken relationships.

Make our homes places of peace, joy, and godliness. May Your love be the foundation of all our family interactions.

In Jesus' name, Amen.`,
    scripture: 'Colossians 3:12-14',
    tags: ['family', 'unity', 'relationships', 'love', 'home']
  },
  {
    id: 'relationships-2',
    category: 'relationships',
    title: 'Community & Fellowship',
    prayer: `God of Community,

Thank You for placing us in a community of believers. We pray for our church, our chapter, and our fellowship groups.

Bind us together in love and unity. Help us to encourage one another, bear one another's burdens, and spur one another on toward love and good deeds.

Give us wisdom to serve each other well, to resolve conflicts in grace, and to reflect Your love to the world around us.

In Jesus' name, Amen.`,
    scripture: 'Hebrews 10:24-25',
    tags: ['community', 'fellowship', 'church', 'brotherhood', 'unity']
  }
];

export const prayerCategories = [
  { id: 'thanksgiving', name: 'Thanksgiving & Gratitude', icon: '🙏', color: 'from-amber-500 to-orange-600' },
  { id: 'protection', name: 'Protection & Safety', icon: '🛡️', color: 'from-blue-500 to-indigo-600' },
  { id: 'healing', name: 'Healing', icon: '❤️‍🩹', color: 'from-green-500 to-emerald-600' },
  { id: 'fear', name: 'Overcoming Fear', icon: '💪', color: 'from-purple-500 to-violet-600' },
  { id: 'strength', name: 'Strength & Courage', icon: '⚡', color: 'from-red-500 to-pink-600' },
  { id: 'wisdom', name: 'Wisdom & Guidance', icon: '🧭', color: 'from-cyan-500 to-blue-600' },
  { id: 'forgiveness', name: 'Forgiveness & Peace', icon: '🕊️', color: 'from-teal-500 to-cyan-600' },
  { id: 'relationships', name: 'Relationships', icon: '👥', color: 'from-rose-500 to-pink-600' }
];
