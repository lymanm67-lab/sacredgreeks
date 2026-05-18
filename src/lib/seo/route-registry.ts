// Dynamic route registry for automatic sitemap generation and SEO
// When adding new pages, add them here and SEO will be handled automatically

export interface RouteConfig {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  isProtected: boolean;
  noindex?: boolean;
  structuredDataType?: 'WebPage' | 'Article' | 'FAQPage' | 'AboutPage' | 'Organization' | 'WebApplication' | 'BreadcrumbList';
}

// Central route registry - add new pages here
export const routeRegistry: RouteConfig[] = [
  // Public high-priority pages
  {
    path: '/',
    title: 'Sacred Greeks Life | Christian Greek Life App',
    description: 'Faith-based app for Christians in Greek life. Daily devotionals, P.R.O.O.F. framework, prayer tools & Bible study for Divine Nine, NPHC & all Greek organizations.',
    keywords: 'Christian Greek life app, faith and fraternity, Christian sorority resources, Divine Nine faith, BGLO Christian, NPHC spiritual growth, P.R.O.O.F. framework, Greek life biblical guidance, faith-based Greek organization, Sacred Not Sinful, Dr Lyman Montgomery',
    changefreq: 'weekly',
    priority: 1.0,
    isProtected: false,
    structuredDataType: 'WebApplication',
  },
  {
    path: '/auth',
    title: 'Sign In',
    description: 'Sign in to Sacred Greeks Life to access your personal dashboard, devotionals, prayer journal, and community features.',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    description: 'Your personal Sacred Greeks dashboard. Track spiritual growth, access daily devotionals, and manage your faith journey in Greek life.',
    keywords: 'dashboard, spiritual growth tracker, faith journey',
    changefreq: 'weekly',
    priority: 0.9,
    isProtected: true,
    structuredDataType: 'WebPage',
  },
  {
    path: '/guide',
    title: 'Getting Started Guide',
    description: 'Complete guide to using Sacred Greeks Life. Learn how to make the most of devotionals, prayer tools, and community features.',
    keywords: 'guide, how to use, getting started, tutorial',
    changefreq: 'monthly',
    priority: 0.9,
    isProtected: false,
    structuredDataType: 'WebPage',
  },
  {
    path: '/user-guide',
    title: 'User Guide',
    description: 'Comprehensive user guide for Sacred Greeks Life app features and functionality.',
    changefreq: 'monthly',
    priority: 0.8,
    isProtected: false,
  },

  // Daily/Weekly content pages
  {
    path: '/devotional',
    title: 'Daily Devotionals for Greek Life Christians | Scripture Reflections',
    description: 'Daily faith-building devotionals for fraternity and sorority members. Scripture-based reflections and spiritual growth for Christians in Greek life.',
    keywords: 'daily devotional Greek life, Christian devotional fraternity, sorority scripture reflection, college devotional, BGLO daily devotion, Divine Nine spiritual growth, faith reflection Greek',
    changefreq: 'daily',
    priority: 0.9,
    isProtected: true,
    structuredDataType: 'Article',
  },
  {
    path: '/prayer-wall',
    title: 'Prayer Wall | Greek Life Christian Prayer Community',
    description: 'Prayer community for Christians in fraternities and sororities. Share requests anonymously, pray for brothers and sisters, and celebrate answered prayers.',
    keywords: 'Greek life prayer wall, Christian fraternity prayer, sorority prayer requests, BGLO prayer community, Divine Nine prayer support, faith community Greek life',
    changefreq: 'daily',
    priority: 0.85,
    isProtected: true,
    structuredDataType: 'WebPage',
  },
  {
    path: '/prayer-journal',
    title: 'Prayer Journal',
    description: 'Personal prayer journal to record, track, and organize your prayers. Mark answered prayers and grow in your prayer life.',
    keywords: 'prayer journal, prayer tracker, Christian prayer app, prayer diary',
    changefreq: 'weekly',
    priority: 0.85,
    isProtected: true,
    structuredDataType: 'WebPage',
  },
  {
    path: '/prayer-guide',
    title: 'Prayer Guide',
    description: 'Learn to pray effectively with guided prayer templates and resources for different life situations.',
    keywords: 'prayer guide, how to pray, prayer templates, guided prayer',
    changefreq: 'monthly',
    priority: 0.8,
    isProtected: true,
  },
  {
    path: '/bible-study',
    title: 'Bible Study',
    description: 'AI-powered Bible study tools. Search scriptures by topic, save meaningful verses, and deepen your understanding of God\'s Word.',
    keywords: 'Bible study, scripture search, Bible app, verse finder, topical Bible',
    changefreq: 'weekly',
    priority: 0.85,
    isProtected: true,
    structuredDataType: 'WebPage',
  },
  {
    path: '/study',
    title: 'Study Guide',
    description: 'Comprehensive study guides for understanding Scripture in the context of Greek life and faith.',
    keywords: 'study guide, Bible study guide, faith study',
    changefreq: 'weekly',
    priority: 0.8,
    isProtected: false,
  },
  {
    path: '/forum',
    title: 'Community Forum',
    description: 'Connect with other Christians in Greek life. Discuss faith, share experiences, and support one another in your spiritual journey.',
    keywords: 'Christian forum, Greek life community, faith discussion, BGLO forum',
    changefreq: 'daily',
    priority: 0.8,
    isProtected: true,
    structuredDataType: 'WebPage',
  },
  {
    path: '/community',
    title: 'Organization Community',
    description: 'Connect with members of your Greek organization. Share resources, discuss faith, and build community.',
    changefreq: 'daily',
    priority: 0.75,
    isProtected: true,
  },

  // Tools and features
  {
    path: '/journey',
    title: '7-Day Faith Journey for Greek Life | Spiritual Growth Challenge',
    description: 'Start your transformative 7-day faith journey designed for Christians in Greek organizations. Daily guided devotions, prayer prompts, and biblical reflections to strengthen your walk with God.',
    keywords: '7 day faith challenge, Greek life spiritual growth, Christian fraternity journey, sorority faith challenge, BGLO devotional series, Divine Nine spiritual journey',
    changefreq: 'weekly',
    priority: 0.8,
    isProtected: false,
  },
  {
    path: '/myth-buster',
    title: 'Greek Life Myth Buster | Facts vs Fiction About Faith & Fraternities',
    description: 'Separate fact from fiction about Greek life and Christianity. Biblical perspectives on hazing, oaths, rituals, and common misconceptions about fraternities, sororities, and Divine Nine organizations.',
    keywords: 'Greek life myths debunked, fraternity hazing facts, sorority Christian misconceptions, BGLO myths, Divine Nine truth, Greek ritual facts, oaths vows biblical, anti-hazing Christian',
    changefreq: 'monthly',
    priority: 0.75,
    isProtected: false,
    structuredDataType: 'FAQPage',
  },
  {
    path: '/symbol-guide',
    title: 'Greek Symbol Guide | Biblical Analysis of Fraternity & Sorority Symbols',
    description: 'Comprehensive guide to Greek life symbols with biblical perspectives. Understand the meaning behind fraternity and sorority symbols, rituals, and traditions from a Christian worldview.',
    keywords: 'Greek symbols meaning, fraternity symbol biblical, sorority symbols Christian, BGLO symbols explained, Divine Nine hand signs, Greek ritual symbols, Greek life traditions meaning',
    changefreq: 'monthly',
    priority: 0.75,
    isProtected: false,
  },
  {
    path: '/ask-dr-lyman',
    title: 'Ask Dr. Lyman Montgomery | Expert Greek Life Faith Guidance',
    description: 'Get expert answers from Dr. Lyman Montgomery, author of Sacred Not Sinful. Submit questions about faith and Greek life, browse answered topics, and receive biblical guidance for your situation.',
    keywords: 'Dr Lyman Montgomery, Sacred Not Sinful author, Greek life faith expert, Christian Greek advisor, BGLO faith questions, Divine Nine Christian guidance, fraternity faith help',
    changefreq: 'weekly',
    priority: 0.8,
    isProtected: false,
    structuredDataType: 'FAQPage',
  },
  {
    path: '/shattered-masks',
    title: 'Shattered Masks Assessment',
    description: 'Discover your authentic self with the Shattered Masks assessment. Understand your spiritual archetype.',
    keywords: 'shattered masks, personality assessment, spiritual archetype',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
  },
  {
    path: '/service-tracker',
    title: 'Service Tracker',
    description: 'Track community service hours and activities. Document your impact and growth in serving others.',
    keywords: 'service tracker, community service, volunteer hours',
    changefreq: 'weekly',
    priority: 0.7,
    isProtected: true,
  },

  // Progress and achievements
  {
    path: '/achievements',
    title: 'Achievements',
    description: 'Track your spiritual growth milestones. Earn badges for devotional completion, prayers, and community engagement.',
    keywords: 'achievements, spiritual growth badges, faith milestones, gamification',
    changefreq: 'weekly',
    priority: 0.75,
    isProtected: true,
  },
  {
    path: '/progress',
    title: 'Progress Tracker',
    description: 'View your spiritual growth progress. Track streaks, completed devotionals, and overall engagement.',
    keywords: 'progress tracker, spiritual growth, streak tracker',
    changefreq: 'weekly',
    priority: 0.7,
    isProtected: true,
  },

  // Content and resources
  {
    path: '/resources',
    title: 'Resources',
    description: 'Faith resources for Christians in Greek life. Articles, guides, PDFs, and tools for spiritual growth.',
    keywords: 'Christian resources, Greek life resources, faith guides, spiritual tools',
    changefreq: 'weekly',
    priority: 0.8,
    isProtected: false,
  },
  {
    path: '/articles',
    title: 'Article Library',
    description: 'Browse our collection of articles on faith, Greek life, and spiritual growth.',
    keywords: 'articles, Christian articles, Greek life blog',
    changefreq: 'weekly',
    priority: 0.75,
    isProtected: false,
    structuredDataType: 'WebPage',
  },
  {
    path: '/video-library',
    title: 'Video Library',
    description: 'Watch videos on faith and Greek life. Teachings, testimonies, and educational content.',
    keywords: 'video library, Christian videos, Greek life videos',
    changefreq: 'weekly',
    priority: 0.75,
    isProtected: false,
  },
  {
    path: '/content-hub',
    title: 'Content Hub',
    description: 'Central hub for all Sacred Greeks content. Find articles, videos, and resources.',
    changefreq: 'weekly',
    priority: 0.7,
    isProtected: false,
  },
  {
    path: '/podcast',
    title: 'Podcast',
    description: 'Listen to the Sacred Greeks podcast. Discussions on faith, Greek life, and spiritual growth.',
    keywords: 'podcast, Christian podcast, Greek life podcast',
    changefreq: 'weekly',
    priority: 0.75,
    isProtected: false,
  },
  {
    path: '/podcast-appearances',
    title: 'Podcast Appearances',
    description: 'Dr. Lyman Montgomery\'s guest appearances on podcasts discussing faith and Greek life.',
    changefreq: 'monthly',
    priority: 0.6,
    isProtected: false,
  },
  {
    path: '/did-you-know',
    title: 'Did You Know?',
    description: 'Interesting facts and insights about Greek life and faith. Learn something new every day.',
    changefreq: 'weekly',
    priority: 0.6,
    isProtected: false,
  },
  {
    path: '/changelog',
    title: 'Changelog',
    description: 'See what\'s new in Sacred Greeks Life. Latest updates, features, and improvements to the app.',
    keywords: 'changelog, updates, new features, release notes',
    changefreq: 'weekly',
    priority: 0.5,
    isProtected: false,
  },

  // About and info pages
  {
    path: '/about',
    title: 'About Sacred Greeks',
    description: 'Learn about Sacred Greeks Life and Dr. Lyman Montgomery. Our mission to help Christians navigate Greek life with faith.',
    keywords: 'about Sacred Greeks, Dr. Lyman Montgomery, mission, about us',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
    structuredDataType: 'AboutPage',
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions',
    description: 'Get answers to common questions about Sacred Greeks Life. Learn about features, Greek life, and faith topics.',
    keywords: 'FAQ, frequently asked questions, help, support',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
    structuredDataType: 'FAQPage',
  },
  {
    path: '/family-ministry-fallout',
    title: 'Family Ministry Fallout',
    description: 'Resources and support for those dealing with family ministry challenges. Find healing and restoration.',
    keywords: 'family ministry, church hurt, healing, restoration',
    changefreq: 'monthly',
    priority: 0.65,
    isProtected: false,
  },
  {
    path: '/church-hurt-healing',
    title: 'Church Hurt Healing',
    description: 'Resources for healing from church hurt. Find restoration, support, and a path forward.',
    keywords: 'church hurt, healing, restoration, spiritual recovery',
    changefreq: 'monthly',
    priority: 0.65,
    isProtected: false,
    noindex: true, // Duplicate content with family-ministry-fallout
  },

  // Subscription and signup
  {
    path: '/subscription',
    title: 'Premium Subscription',
    description: 'Unlock premium features with Sacred Greeks Life subscription. Access exclusive content and advanced tools.',
    keywords: 'subscription, premium, pricing, upgrade',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description: 'View Sacred Greeks Life pricing and subscription options. Find the plan that fits your needs.',
    changefreq: 'monthly',
    priority: 0.7,
    isProtected: false,
    noindex: true, // Duplicate content with subscription
  },
  {
    path: '/beta-signup',
    title: 'Beta Signup',
    description: 'Join the Sacred Greeks Life beta program. Get early access to new features and help shape the app.',
    keywords: 'beta signup, early access, beta program',
    changefreq: 'monthly',
    priority: 0.65,
    isProtected: false,
  },
  {
    path: '/install',
    title: 'Install App',
    description: 'Install Sacred Greeks Life on your device. Get quick access from your home screen.',
    keywords: 'install app, PWA, mobile app',
    changefreq: 'monthly',
    priority: 0.6,
    isProtected: false,
  },
  {
    path: '/qr-code',
    title: 'QR Code',
    description: 'Scan or share the Sacred Greeks Life QR code. Easy way to share the app with others.',
    changefreq: 'monthly',
    priority: 0.4,
    isProtected: false,
  },
  // /install-guide redirects to /install
  {
    path: '/share-toolkit',
    title: 'Share Toolkit',
    description: 'Ready-to-use templates for sharing Sacred Greeks Life. Text messages, emails, and social media posts.',
    keywords: 'share app, invite friends, share templates, outreach',
    changefreq: 'monthly',
    priority: 0.6,
    isProtected: false,
  },

  // User account pages
  {
    path: '/profile',
    title: 'My Profile',
    description: 'Manage your Sacred Greeks Life profile. Update settings, preferences, and account information.',
    changefreq: 'monthly',
    priority: 0.6,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/bookmarks',
    title: 'Bookmarks',
    description: 'Access your saved content. View bookmarked devotionals, verses, and resources.',
    changefreq: 'weekly',
    priority: 0.6,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/assessment-history',
    title: 'Assessment History',
    description: 'View your past assessments and track your spiritual growth over time.',
    changefreq: 'weekly',
    priority: 0.5,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/offline-settings',
    title: 'Offline Settings',
    description: 'Configure offline access for Sacred Greeks Life. Download content for offline use.',
    changefreq: 'monthly',
    priority: 0.4,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/notification-preferences',
    title: 'Notification Preferences',
    description: 'Manage your notification settings. Control how and when you receive updates.',
    changefreq: 'monthly',
    priority: 0.4,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/analytics',
    title: 'Analytics Dashboard',
    description: 'View app analytics and usage statistics.',
    changefreq: 'daily',
    priority: 0.5,
    isProtected: true,
    noindex: true,
  },

  // D9 Business Directory
  {
    path: '/business-directory',
    title: 'D9 Business Directory | Divine Nine Black-Owned Businesses',
    description: 'Discover and support Black-owned businesses by Divine Nine members. Find faith-centered D9 entrepreneurs in professional services, health, tech, real estate, and more. Shop D9!',
    keywords: 'D9 business directory, Divine Nine businesses, Black owned business directory, NPHC entrepreneurs, BGLO business owners, support Black business, D9 network, Greek business directory, faith-centered business',
    changefreq: 'weekly',
    priority: 0.85,
    isProtected: false,
    structuredDataType: 'WebPage',
  },
  {
    path: '/submit-business',
    title: 'List Your D9 Business Free | Divine Nine Business Directory',
    description: 'List your Divine Nine-owned business for FREE in the Sacred Greeks D9 Business Directory. Connect with D9 brothers and sisters who want to support Black excellence and faith-centered entrepreneurs.',
    keywords: 'list D9 business free, Divine Nine business listing, add Black owned business, NPHC business directory submission, BGLO entrepreneur network, free business listing D9',
    changefreq: 'monthly',
    priority: 0.75,
    isProtected: false,
    structuredDataType: 'WebPage',
  },

  // Legal pages
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'Sacred Greeks Life privacy policy. Learn how we collect, use, and protect your data.',
    changefreq: 'monthly',
    priority: 0.4,
    isProtected: false,
  },
  {
    path: '/terms',
    title: 'Terms of Service',
    description: 'Sacred Greeks Life terms of service. Read our terms and conditions for using the app.',
    changefreq: 'monthly',
    priority: 0.4,
    isProtected: false,
  },
  {
    path: '/legal',
    title: 'Legal Information',
    description: 'Legal information and documentation for Sacred Greeks Life.',
    changefreq: 'monthly',
    priority: 0.3,
    isProtected: false,
  },
  {
    path: '/ip-documentation',
    title: 'IP Documentation',
    description: 'Intellectual property documentation for Sacred Greeks Life.',
    changefreq: 'monthly',
    priority: 0.3,
    isProtected: false,
    noindex: true,
  },
  {
    path: '/trademark-tracking',
    title: 'Trademark Tracking',
    description: 'Trademark tracking and documentation.',
    changefreq: 'monthly',
    priority: 0.3,
    isProtected: false,
    noindex: true,
  },
  {
    path: '/trademark-usage-guide',
    title: 'Trademark Usage Guide',
    description: 'Guidelines for using Sacred Greeks trademarks.',
    changefreq: 'monthly',
    priority: 0.3,
    isProtected: false,
    noindex: true,
  },

  // Admin pages (noindex)
  {
    path: '/admin',
    title: 'Admin Dashboard',
    description: 'Admin dashboard for Sacred Greeks Life.',
    changefreq: 'weekly',
    priority: 0.3,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/beta-dashboard',
    title: 'Beta Dashboard',
    description: 'Beta program dashboard.',
    changefreq: 'weekly',
    priority: 0.3,
    isProtected: true,
    noindex: true,
  },
  {
    path: '/beta-checklist',
    title: 'Beta Launch Checklist',
    description: 'Beta launch checklist for administrators.',
    changefreq: 'weekly',
    priority: 0.3,
    isProtected: true,
    noindex: true,
  },

  // Misc
  {
    path: '/reset-password',
    title: 'Reset Password',
    description: 'Reset your Sacred Greeks Life password.',
    changefreq: 'monthly',
    priority: 0.3,
    isProtected: false,
    noindex: true,
  },

  // SEO Landing Pages - Keyword Targeted
  {
    path: '/christian-greek-life',
    title: 'Christian Greek Life App | Faith-Based Fraternity & Sorority Resources',
    description: 'The #1 app for Christians in Greek life. Daily devotionals, biblical guidance on rituals and oaths, P.R.O.O.F. framework, and community support for Christian fraternity and sorority members.',
    keywords: 'Christian Greek life, Christian fraternity, Christian sorority, faith-based Greek organization, Christians in fraternities, Christians in sororities, Greek life and Christianity, Christian BGLO, faith fraternity sorority',
    changefreq: 'weekly',
    priority: 0.95,
    isProtected: false,
    structuredDataType: 'WebPage',
  },
  {
    path: '/divine-nine-faith',
    title: 'Divine Nine Faith Resources | Christian BGLO & NPHC Spiritual Guide',
    description: 'Faith-based resources for Divine Nine members. Christian guidance for BGLO organizations, NPHC spiritual growth, D9 biblical perspectives, and community support for believers in historically Black Greek-letter organizations.',
    keywords: 'Divine Nine faith, BGLO Christian, NPHC spiritual growth, D9 faith resources, Black Greek Christian, Divine Nine Christianity, NPHC Bible study, BGLO devotional, Christian Greek letter organization',
    changefreq: 'weekly',
    priority: 0.95,
    isProtected: false,
    structuredDataType: 'WebPage',
  },
  {
    path: '/greek-life-biblical-guidance',
    title: 'Greek Life Biblical Guidance | P.R.O.O.F. Framework for Christian Discernment',
    description: 'Biblical guidance for Greek life decisions. Use the P.R.O.O.F. framework to evaluate fraternity and sorority membership through Scripture. Christian perspective on Greek rituals, oaths, pledging, and traditions.',
    keywords: 'Greek life biblical guidance, P.R.O.O.F. framework, Christian perspective Greek rituals, biblical view fraternity, sorority Christian guidance, Greek oaths Bible, fraternity rituals Scripture',
    changefreq: 'weekly',
    priority: 0.95,
    isProtected: false,
    structuredDataType: 'WebPage',
  },
  {
    path: '/anti-hazing-christian',
    title: 'Anti-Hazing Christian Resources | Biblical Alternatives to Greek Hazing',
    description: 'Christian anti-hazing resources for Greek life. Biblical alternatives to harmful traditions, hazing warning signs, and faith-based guidance for ethical fraternity and sorority membership.',
    keywords: 'anti-hazing Christian, Greek hazing alternatives, biblical response to hazing, Christian fraternity hazing, sorority hazing prevention, ethical Greek life, stop Greek hazing',
    changefreq: 'weekly',
    priority: 0.9,
    isProtected: false,
    structuredDataType: 'WebPage',
  },
  {
    path: '/spiritual-growth-greek-life',
    title: 'Spiritual Growth for Greek Life | Christian Devotionals & Prayer for Fraternities & Sororities',
    description: 'Grow spiritually as a Christian in Greek life. Daily devotionals, prayer tools, Bible study, and faith journey resources designed for fraternity and sorority members.',
    keywords: 'spiritual growth Greek life, Christian devotional fraternity, sorority spiritual growth, NPHC spiritual development, Greek life prayer, Christian Greek Bible study',
    changefreq: 'weekly',
    priority: 0.9,
    isProtected: false,
    structuredDataType: 'WebPage',
  },

  // Blog
  {
    path: '/blog',
    title: 'Blog | Sacred Greeks Life - Faith & Greek Life Articles',
    description: 'Faith-centered articles for Christians in Greek life. Biblical perspectives, spiritual growth guides, and community insights.',
    keywords: 'Sacred Greeks blog, Christian Greek life articles, faith fraternity blog, BGLO articles',
    changefreq: 'weekly',
    priority: 0.85,
    isProtected: false,
    structuredDataType: 'WebPage',
  },

  // Growth Agent (admin, noindex)
  {
    path: '/content-agent',
    title: 'Growth Agent',
    description: 'Generate and manage AI-drafted content for Sacred Greeks Life.',
    changefreq: 'weekly',
    priority: 0.4,
    isProtected: true,
    noindex: true,
  },
];

// Get route config by path
export function getRouteConfig(path: string): RouteConfig | undefined {
  return routeRegistry.find(route => route.path === path);
}

// Get all public routes for sitemap
export function getPublicRoutes(): RouteConfig[] {
  return routeRegistry.filter(route => !route.noindex);
}

// Get route count
export function getTotalRoutes(): number {
  return routeRegistry.length;
}

// Validate all routes are registered (call during development)
export function validateRouteRegistry(appRoutes: string[]): string[] {
  const registeredPaths = routeRegistry.map(r => r.path);
  return appRoutes.filter(route => !registeredPaths.includes(route));
}
