// Centralized app knowledge - used by AI Assistant and ChatGPT GPT action
// Update this file when adding new features to auto-update all AI systems

export const APP_INFO = {
  name: "Sacred Greeks Life",
  tagline: "Your daily companion for navigating faith and Greek life",
  description: "A faith-based app designed to help Christians in Greek life navigate the tension between their faith and fraternity or sorority membership using the P.R.O.O.F. framework.",
  author: "Dr. Lyman Montgomery",
  book: "Sacred, Not Sinful: A Christian's Guide to Navigating Greek Life",
  website: "https://sacredgreekslife.com",
  documentary: "Unmasking Hope",
  pricing: "Free - No credit card required",
  platform: "Progressive Web App (PWA) - Works on iOS, Android, and Web",
};

export const PROOF_FRAMEWORK = {
  name: "P.R.O.O.F. Framework",
  description: "A biblical approach to evaluating and navigating Greek life membership while maintaining your Christian faith and values.",
  components: [
    { letter: "P", name: "Purpose", description: "What is the organization's purpose?" },
    { letter: "R", name: "Rituals", description: "What rituals are involved?" },
    { letter: "O", name: "Obligations", description: "What commitments are required?" },
    { letter: "O", name: "Outcomes", description: "What are the spiritual outcomes?" },
    { letter: "F", name: "Fellowship", description: "How does it affect Christian fellowship?" },
  ],
};

export const FEATURES = [
  {
    name: "Dashboard",
    path: "/dashboard",
    description: "Your central hub showing current streak, verse of the day, study progress, quick check-in, and quick access to all features.",
  },
  {
    name: "Daily Devotional",
    path: "/devotional",
    description: "Scripture readings with reflections based on P.R.O.O.F. framework, application points, prayer prompts, and text-to-speech listening.",
  },
  {
    name: "Study Guide",
    path: "/study",
    description: "5-session structured program with note-taking, completion certificates, and social sharing of achievements.",
  },
  {
    name: "Sacred Greeks Assessment",
    path: "/",
    description: "5 Persona Types ethical decision-making tool with scenario-based assessments, personalized guidance, and shareable badges.",
  },
  {
    name: "Prayer Journal",
    path: "/prayer-journal",
    description: "Personal prayer tracking with categorization, answered prayer marking, voice input, and prayer history review.",
  },
  {
    name: "Prayer Wall",
    path: "/prayer-wall",
    description: "Community prayer requests with support features, encouragement notes, testimonies, and privacy controls.",
  },
  {
    name: "Prayer Guide",
    path: "/prayer-guide",
    description: "Guided prayer experience with templates, ambient sounds, pray-along karaoke, and timer for structured sessions.",
  },
  {
    name: "Bible Study",
    path: "/bible-study",
    description: "Scripture exploration with AI-powered verse search, saved searches, bookmarks, and study notes.",
  },
  {
    name: "Service Tracker",
    path: "/service-tracker",
    description: "Community service logging with hour tracking, event dates, descriptions, and completion status.",
  },
  {
    name: "Progress Tracking",
    path: "/progress",
    description: "Track spiritual growth including devotional completion stats, journal entries, assessments, and streaks.",
  },
  {
    name: "Achievements",
    path: "/achievements",
    description: "Gamification with badges for completing activities, leveling up with points, and social sharing.",
  },
  {
    name: "Resources Hub",
    path: "/resources",
    description: "Comprehensive library with articles, testimonials, documentary, PDF downloads, and external resources.",
  },
  {
    name: "Article Library",
    path: "/articles",
    description: "Featured articles by category with text-to-speech and offline reading capabilities.",
  },
  {
    name: "Podcast",
    path: "/podcast",
    description: "Sacred Greeks podcast episodes and study guide audio sessions.",
  },
  {
    name: "BGLO Objection Guide",
    path: "/guide",
    description: "Biblical responses to common objections about faith and Greek life with scripture references.",
  },
  {
    name: "Bookmarks",
    path: "/bookmarks",
    description: "Save articles, verses, and resources for later with personal notes.",
  },
  {
    name: "Offline Mode",
    path: "/offline-settings",
    description: "Save content for offline reading with storage management.",
  },
  {
    name: "AI Assistant",
    path: "Available on all pages",
    description: "Get help anytime via the chat icon - ask about features or get navigation guidance.",
  },
  {
    name: "Listen Feature",
    path: "Throughout app",
    description: "Text-to-speech on devotionals, articles, and content with speed controls (0.5x-2x).",
  },
];

export const FAQ_DATA = [
  {
    question: "What is Sacred Greeks Life?",
    answer: "Sacred Greeks Life is a faith-based app designed to help Christians in Greek life navigate the tension between their faith and fraternity or sorority membership using the P.R.O.O.F. framework.",
  },
  {
    question: "Is Sacred Greeks Life free to use?",
    answer: "Yes, Sacred Greeks Life is completely free. No credit card required. Access daily devotionals, prayer tools, Bible study resources, and community features at no cost.",
  },
  {
    question: "What is the P.R.O.O.F. framework?",
    answer: "The P.R.O.O.F. framework is a biblical approach to evaluating and navigating Greek life membership. It stands for Purpose, Rituals, Obligations, Outcomes, and Fellowship.",
  },
  {
    question: "Who created Sacred Greeks Life?",
    answer: "Sacred Greeks Life was created by Dr. Lyman Montgomery, author of 'Sacred, Not Sinful: A Christian's Guide to Navigating Greek Life.'",
  },
  {
    question: "Can I use Sacred Greeks Life offline?",
    answer: "Yes! Sacred Greeks Life is a Progressive Web App (PWA) that works offline. You can save articles and devotionals for offline reading and install it on your phone like a native app.",
  },
  {
    question: "What are the 5 Persona Types in the assessment?",
    answer: "The Sacred Greeks Assessment identifies 5 Persona Types based on how you handle ethical dilemmas in Greek life situations. Each persona receives personalized biblical guidance and recommendations.",
  },
  {
    question: "How do I track my spiritual growth?",
    answer: "Use the Progress page to view devotional completion stats, prayer journal entries, assessment history, and your daily streaks. The Achievements page shows badges earned for various activities.",
  },
  {
    question: "What is the Prayer Wall?",
    answer: "The Prayer Wall is a community feature where you can share prayer requests, pray for others, add encouragement notes, and share testimonies when prayers are answered. Privacy controls let you choose who sees your requests.",
  },
  {
    question: "How do I install Sacred Greeks Life on my phone?",
    answer: "Visit sacredgreekslife.com on your phone, then use the 'Add to Home Screen' option in your browser. On iPhone, tap the Share button and select 'Add to Home Screen.' The app will work like a native app.",
  },
  {
    question: "What is the Unmasking Hope documentary?",
    answer: "Unmasking Hope is a documentary about faith and Greek life, available in the Resources section of Sacred Greeks Life. It explores the experiences of Christians navigating fraternity and sorority membership.",
  },
  {
    question: "Does Sacred Greeks Life have Bible study tools?",
    answer: "Yes! The Bible Study feature includes AI-powered verse search, the ability to save searches, bookmark verses, and take study notes. Perfect for personal devotions or group study.",
  },
  {
    question: "Can I listen to content instead of reading?",
    answer: "Absolutely! The Listen feature (text-to-speech) is available throughout the app. Look for the Listen button on devotionals, articles, and other content. You can adjust playback speed from 0.5x to 2x.",
  },
  {
    question: "What is the Study Guide?",
    answer: "The Study Guide is a 5-session structured program based on Dr. Lyman Montgomery's teachings. Complete sessions, take notes, earn completion certificates, and share your achievements.",
  },
  {
    question: "How do I get help using the app?",
    answer: "The AI Assistant is available on every page via the chat icon in the bottom corner. Ask any question about features, navigation, or how to use Sacred Greeks Life.",
  },
  {
    question: "Is Sacred Greeks Life for Divine Nine (BGLO) members?",
    answer: "Yes! Sacred Greeks Life is especially designed for Christians in Divine Nine (BGLO) organizations, as well as all Greek-letter organizations. The BGLO Objection Guide addresses common questions specific to historically Black fraternities and sororities.",
  },
];

export const TARGET_AUDIENCE = [
  "Christians in college fraternities and sororities",
  "Members of Divine Nine (BGLO) organizations",
  "Alumni of Greek-letter organizations",
  "Students considering Greek life membership",
  "Faith leaders and campus ministers",
  "Parents of students in Greek life",
];

export const generateSystemPrompt = () => {
  const featuresText = FEATURES.map(
    (f) => `- **${f.name}** (${f.path}): ${f.description}`
  ).join("\n");

  const faqText = FAQ_DATA.map(
    (f) => `- "${f.question}" → ${f.answer}`
  ).join("\n");

  const proofText = PROOF_FRAMEWORK.components.map(
    (c) => `  - ${c.letter}: ${c.name} - ${c.description}`
  ).join("\n");

  return `You are a helpful AI assistant for ${APP_INFO.name}, ${APP_INFO.tagline}. Created by ${APP_INFO.author}, author of "${APP_INFO.book}".

**ABOUT THE APP:**
${APP_INFO.description}
- Documentary: "${APP_INFO.documentary}"
- Pricing: ${APP_INFO.pricing}
- Platform: ${APP_INFO.platform}

**P.R.O.O.F. FRAMEWORK:**
${PROOF_FRAMEWORK.description}
${proofText}

**APP FEATURES:**
${featuresText}

**COMMON QUESTIONS:**
${faqText}

**TARGET AUDIENCE:**
${TARGET_AUDIENCE.map((a) => `- ${a}`).join("\n")}

Be friendly, helpful, and guide users to the right features. If asked about something outside the app, politely redirect to relevant features. Always mention the P.R.O.O.F. framework when discussing faith and Greek life decisions.`;
};
