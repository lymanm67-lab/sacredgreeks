export interface DemoPrayer {
  id: string;
  title: string;
  content: string;
  prayer_type: string;
  answered: boolean;
  answered_at: string | null;
  created_at: string;
}

export const DEMO_PRAYERS: DemoPrayer[] = [
  {
    id: 'demo-prayer-1',
    title: 'Guidance for Finals Week',
    content: 'Lord, I come before You asking for wisdom and clarity as I prepare for my finals. Help me to study diligently, retain what I learn, and trust in Your plan for my academic journey. Give me peace when anxiety tries to take over, and remind me that my worth is not defined by grades but by Your love for me.',
    prayer_type: 'request',
    answered: false,
    answered_at: null,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-prayer-2',
    title: 'Thanksgiving for Brotherhood',
    content: 'Father, I am so grateful for the brothers and sisters You have placed in my life through this organization. Thank You for the late-night conversations, the accountability, and the genuine love we share. Help us continue to build each other up and point one another to Christ.',
    prayer_type: 'thanksgiving',
    answered: false,
    answered_at: null,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-prayer-3',
    title: 'Healing for My Grandmother',
    content: 'Dear Lord, I lift up my grandmother who is currently in the hospital. Please surround her with Your healing presence and comfort. Give the doctors wisdom and skill. Help our family trust in Your sovereignty even when we don\'t understand. May Your will be done.',
    prayer_type: 'request',
    answered: true,
    answered_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-prayer-4',
    title: 'Confession - Pride in Leadership',
    content: 'Lord, I confess that I\'ve let pride creep into my heart as I\'ve taken on leadership roles. I\'ve been more focused on recognition than on serving others. Forgive me for seeking my own glory instead of Yours. Help me lead with humility, always remembering that any good work is only possible through You.',
    prayer_type: 'confession',
    answered: false,
    answered_at: null,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-prayer-5',
    title: 'Praise for Answered Prayer',
    content: 'Hallelujah! Lord, I praise You for answering my prayer about the internship. When I didn\'t get the first one I applied for, I was discouraged, but You had something better in store. This opportunity aligns perfectly with my calling. You are faithful and Your timing is perfect!',
    prayer_type: 'praise',
    answered: false,
    answered_at: null,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-prayer-6',
    title: 'Strength to Share My Faith',
    content: 'God, give me boldness to share my faith with my roommate. I know You\'ve placed us together for a reason. Help me to be a light without being pushy, to show Your love through my actions, and to be ready to give an answer for the hope that I have when the opportunity arises.',
    prayer_type: 'request',
    answered: true,
    answered_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-prayer-7',
    title: 'Gratitude for Provision',
    content: 'Thank You, Father, for Your continued provision. When I worried about tuition, You provided through an unexpected scholarship. When I stressed about rent, a job opportunity appeared. You are Jehovah Jireh, my Provider. Help me to always trust in Your provision and not lean on my own understanding.',
    prayer_type: 'thanksgiving',
    answered: false,
    answered_at: null,
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-prayer-8',
    title: 'Protection Over My Chapter',
    content: 'Lord, I pray for protection over our chapter. Guard us from division, gossip, and anything that would harm our unity. Help us to be a light on this campus and to represent You well in all we do. May our organization be known for our love, integrity, and commitment to excellence.',
    prayer_type: 'request',
    answered: false,
    answered_at: null,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const DEMO_PRAYER_STATS = {
  total: DEMO_PRAYERS.length,
  answered: DEMO_PRAYERS.filter(p => p.answered).length,
  unanswered: DEMO_PRAYERS.filter(p => !p.answered).length,
  byType: {
    request: DEMO_PRAYERS.filter(p => p.prayer_type === 'request').length,
    thanksgiving: DEMO_PRAYERS.filter(p => p.prayer_type === 'thanksgiving').length,
    confession: DEMO_PRAYERS.filter(p => p.prayer_type === 'confession').length,
    praise: DEMO_PRAYERS.filter(p => p.prayer_type === 'praise').length,
  },
};
