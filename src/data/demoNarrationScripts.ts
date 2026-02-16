/**
 * Centralized demo narration scripts for all key pages.
 * Each script provides a full guided walkthrough (~60 seconds) of the page's features,
 * demo data, and how to use the page.
 */

export interface DemoNarrationScript {
  title: string;
  script: string;
  voice?: string;
}

const narrationScripts: Record<string, DemoNarrationScript> = {
  dashboard: {
    title: 'Dashboard Tour',
    voice: 'onyx',
    script: `Welcome to your Sacred Greeks Dashboard. This is your command center for faith-driven Greek life. 
    In demo mode, you're seeing sample data to explore every feature. 
    At the top, you'll find your personalized greeting and quick stats — assessments completed, prayers offered, devotional streaks, and more. 
    Below that, the Featured Actions section highlights your most important next steps, like starting a P.R.O.O.F. assessment or exploring the daily devotional. 
    The Quick Links section gives you one-tap access to tools like the Prayer Wall, Business Directory, Chapter Finance, and Community Forum. 
    Scroll down to discover Learning Paths — guided journeys through courses like Should You Stay or Leave, Saints or Sellouts, and Hidden in Plain Sight. 
    Each path tracks your progress and awards achievements along the way. 
    To turn off demo mode, tap the Demo button in the sidebar or navigation menu. Your real data will appear once you start creating content.`,
  },

  'prayer-wall': {
    title: 'Prayer Wall Tour',
    voice: 'onyx',
    script: `Welcome to the Prayer Wall — a sacred space for the Divine Nine community to share and support prayer requests. 
    In demo mode, you're seeing sample prayer requests from fellow Greek believers. 
    You can browse requests by type — personal, family, academic, career, and more — using the filter tabs at the top. 
    Each request shows the prayer type, how many people have prayed, and encouraging comments from the community. 
    Tap the heart icon to add your prayer support, or click a request to read the full details and leave an encouragement note. 
    The Share Request button lets you submit your own prayer needs. You can choose privacy levels — public for the community, or private for just you and God. 
    Filter by Greek council to see requests from your specific organization. 
    When prayers are answered, members can mark them as answered and share their testimony. 
    This wall is built on real community — every prayer counts.`,
  },

  forum: {
    title: 'Community Forum Tour',
    voice: 'onyx',
    script: `Welcome to the Community Forum — your space for meaningful discussions with fellow Greek believers. 
    In demo mode, you're seeing sample discussions covering topics like maintaining devotions during pledge season, starting chapter prayer calls, and sharing testimonies. 
    Use the category filter to browse discussions by topic — Faith and Greek Life, Leadership, Community Service, Accountability, and Testimonies. 
    You can also filter by Greek council to see conversations from your specific organization. 
    Click any discussion to expand it and read replies. Best answers are highlighted with a special badge. 
    The New Discussion button lets you start a conversation on any topic. 
    Engage with the community by replying, asking follow-up questions, and sharing your experiences. 
    In demo mode, you'll see realistic sample conversations. Turn off demo mode to see real community discussions and contribute your own.`,
  },

  journey: {
    title: '40-Day Journey Tour',
    voice: 'onyx',
    script: `Welcome to the 40-Day Faith and Greek Life Journey — a guided devotional experience designed for Greek-affiliated believers. 
    In demo mode, you can see the first eight days marked as completed with sample reflection notes. 
    Each day includes a scripture reading, reflection prompts, and space for your personal notes. 
    The progress bar at the top tracks how far you've come. Days are unlocked sequentially — complete one to unlock the next. 
    Some days include special challenges and action items to apply what you've learned in your chapter life. 
    Tap any completed day to review your notes, or click the next available day to continue your journey. 
    You can also listen to each day's content using the audio button. 
    This journey covers topics like leading with integrity, building authentic brotherhood and sisterhood, managing peer pressure, and growing your faith within Greek life. 
    Start your own journey by turning off demo mode and completing Day 1.`,
  },

  progress: {
    title: 'Progress Tracker Tour',
    voice: 'onyx',
    script: `Welcome to your Progress Tracker — a visual dashboard of your faith journey across the Sacred Greeks platform. 
    In demo mode, you're seeing 30 days of sample activity data including devotional completions, assessments taken, and journal entries. 
    The line chart at the top shows your daily engagement over time. Look for patterns — are you more consistent on certain days? 
    Below that, the assessment breakdown pie chart shows your results distribution across low, medium, and high risk categories. 
    The activity summary cards give you quick stats — total devotionals completed, assessments taken, and your current streak. 
    Use the date range filter to focus on specific time periods. 
    This page helps you stay accountable and see your spiritual growth over time. 
    Turn off demo mode to start tracking your real progress as you engage with devotionals, assessments, and prayer.`,
  },

  'business-directory': {
    title: 'Business Directory Tour',
    voice: 'onyx',
    script: `Welcome to the Divine Nine Business Directory — connecting you with faith-driven Greek entrepreneurs across the country. 
    In demo mode, you're browsing sample businesses from all nine organizations — counseling practices, financial groups, tech companies, and more. 
    Use the search bar to find businesses by name, category, or location. Filter by organization to support your specific Greek family. 
    Each business card shows the owner's name, organization, category, location, and their faith statement. 
    Featured businesses are highlighted with a star badge at the top. 
    Click any business card to see full details including contact information, website, and their approach to faith-driven business. 
    The Submit Your Business button lets you add your own business to the directory. 
    You can also generate a QR code for any business to share it easily. 
    This directory is about building economic power within the Divine Nine through faith and mutual support.`,
  },

  'events-calendar': {
    title: 'Events Calendar Tour',
    voice: 'onyx',
    script: `Welcome to the Events Calendar — your hub for faith-centered Greek events across the nation. 
    In demo mode, you're seeing sample events including conferences, prayer breakfasts, workshops, service projects, and retreats. 
    Use the tabs to switch between Upcoming, Past, and All events. Filter by event type or search for specific events. 
    Each event card shows the date, location, cost, and whether it's virtual or in-person. 
    Virtual events display a video icon and can be joined directly through the provided link. 
    Click RSVP to mark your attendance — you'll receive reminders as the event approaches. 
    The Submit Event button lets chapter leaders and organizers add new events to the calendar. 
    From annual conferences to weekly prayer calls, this calendar keeps you connected to what matters in the faith-driven Greek community.`,
  },

  'member-network': {
    title: 'Member Network Tour',
    voice: 'onyx',
    script: `Welcome to the Member Network — your sacred space for connecting with fellow Greek believers across all nine organizations. 
    In demo mode, you're seeing sample member profiles showcasing the diversity of our community. 
    Browse members by organization using the filter dropdown, or search by name. 
    Each member card shows their name, Greek organization, chapter, and how long they've been part of Sacred Greeks. 
    Click Connect to send a connection request with a personal message. 
    The My Connections tab shows people you've already connected with and pending requests. 
    This network is built on mutual faith and respect — every connection is an opportunity for mentorship, prayer partnership, and fellowship. 
    Turn off demo mode and complete your profile to appear in the network and start building authentic connections.`,
  },

  podcast: {
    title: 'Audio Study Guide Tour',
    voice: 'onyx',
    script: `Welcome to the Audio Study Guide — your on-the-go resource for faith and Greek life education. 
    This page features curated audio content covering P.R.O.O.F. framework principles, Greek history through a biblical lens, and leadership development. 
    Browse episodes by category — Faith Foundations, Greek Heritage, Leadership, and Community. 
    Each episode includes a description, estimated duration, and play controls. 
    You can adjust playback speed from half speed to double speed using the speed control. 
    Your listening progress is automatically saved, so you can pick up right where you left off. 
    The study guide format pairs audio content with reflection questions and action steps. 
    Perfect for commutes, workouts, or quiet study time. 
    Explore the full library to deepen your understanding of how faith intersects with Greek life.`,
  },

  'proof-course': {
    title: 'P.R.O.O.F. Course Tour',
    voice: 'onyx',
    script: `Welcome to the P.R.O.O.F. Course — the flagship educational experience of Sacred Greeks. 
    P.R.O.O.F. stands for Practice, Rituals, Oaths, Origins, and Fruits — the five categories for evaluating Greek life through a biblical lens. 
    In demo mode, you can preview the course structure including modules, quizzes, and reflection exercises. 
    Each module combines video content, scripture references, historical research, and practical application. 
    The course progresses from foundational concepts to deeper analysis of specific Greek practices. 
    Track your completion percentage with the progress bar, and earn certificates as you finish each module. 
    Interactive elements include self-assessment checkpoints and discussion prompts for group study. 
    This course equips you with biblical knowledge and practical wisdom for navigating faith within Greek organizations. 
    Start the course to unlock the full experience and earn your P.R.O.O.F. completion certificate.`,
  },

  'sacred-money-course': {
    title: 'Sacred Money Course Tour',
    voice: 'onyx',
    script: `Welcome to the Sacred Money Mastery Course — biblical financial stewardship designed for the Greek community. 
    This course teaches the ten-fifteen-ten-sixty-five principle: ten percent for Kingdom giving, fifteen percent for savings, ten percent for investing, and sixty-five percent for living expenses. 
    In demo mode, you can preview lessons on budgeting, debt elimination, generational wealth building, and tithing with purpose. 
    Each module includes practical tools like budget calculators, savings trackers, and accountability worksheets. 
    The course combines biblical principles from Proverbs, Malachi, and Matthew with modern financial strategies. 
    Track your progress through each module and earn your Sacred Money certification upon completion. 
    Whether you're a college student managing dues or a professional building wealth, this course meets you where you are. 
    Start your journey to financial freedom through faithful stewardship.`,
  },

  'saints-or-sellouts': {
    title: 'Saints or Sellouts Tour',
    voice: 'onyx',
    script: `Welcome to Saints or Sellouts — an interactive course exploring what it means to maintain Christian integrity within Greek organizations. 
    This course presents real-world scenarios and asks you to evaluate them through a biblical lens. 
    In demo mode, you can preview case studies, discussion prompts, and the interactive scoring system. 
    Each module presents a situation — like navigating party culture, hazing pressure, or conflicting loyalties — and guides you through a faith-based analysis. 
    The interactive elements include scenario-based quizzes, peer discussion forums, and personal reflection journals. 
    Your responses are scored to help you understand where you stand on key issues. 
    This isn't about judging — it's about equipping you with clarity and confidence to live out your faith authentically. 
    Complete the course to earn your certificate and join the community of believers committed to walking the talk.`,
  },

  'should-you-stay-or-leave': {
    title: 'Should You Stay or Leave Tour',
    voice: 'onyx',
    script: `Welcome to Should You Stay or Leave — an interactive decision-making module for Greek members wrestling with their faith and Greek commitment. 
    This module walks you through a structured biblical framework for evaluating your Greek involvement. 
    In demo mode, you can explore the interactive scenarios, see how the scoring system works, and preview the personalized recommendations. 
    Each section examines a different dimension: spiritual impact, relational health, organizational alignment with biblical values, and personal calling. 
    The module uses real testimonies and case studies from believers who've faced this decision. 
    Interactive checkpoints help you assess your own situation without pressure or judgment. 
    Whether the answer is stay and transform from within, or leave and redirect your service — this module helps you find clarity through prayer and scripture. 
    Complete the full module to receive your personalized assessment and next steps.`,
  },

  devotional: {
    title: 'Daily Devotional Tour',
    voice: 'onyx',
    script: `Welcome to the Daily Devotional — your daily encounter with God's Word, tailored for the Greek believer. 
    Each day features a fresh scripture, a reflection connecting faith to Greek life, a practical application, and a closing prayer. 
    In demo mode, you're seeing today's sample devotional with a P.R.O.O.F. focus area highlighted. 
    The devotional rotates through all five P.R.O.O.F. categories throughout the week, keeping your study comprehensive. 
    Use the Listen button to hear the devotional read aloud — perfect for your morning routine. 
    Mark the devotional as completed to maintain your streak and earn consistency achievements. 
    You can also save devotionals to your bookmarks for future reference. 
    The reflection space lets you journal your thoughts and track spiritual insights over time. 
    Make this devotional part of your daily rhythm and watch your faith grow alongside your Greek commitment.`,
  },

  'faith-snapshot': {
    title: 'Faith Snapshot Assessment Tour',
    voice: 'onyx',
    script: `Welcome to the Faith Snapshot Assessment — a quick but powerful tool to evaluate your spiritual health within Greek life. 
    This assessment asks targeted questions across multiple dimensions: prayer life, scripture engagement, community involvement, and how your faith intersects with your Greek commitments. 
    In demo mode, you can preview the question format and see how results are visualized. 
    The assessment takes about five to ten minutes and generates a personalized faith profile with your archetype, confidence score, and tailored recommendations. 
    Your results include a radar chart showing strengths and growth areas across all P.R.O.O.F. categories. 
    You can retake the assessment periodically to track your spiritual growth over time. 
    Results can be shared with accountability partners or kept private. 
    Take the assessment to discover your faith archetype and receive personalized next steps for your spiritual journey.`,
  },

  'chapter-finance': {
    title: 'Chapter Finance Tour',
    voice: 'onyx',
    script: `Welcome to Chapter Finance — your chapter's financial management toolkit built on biblical stewardship principles. 
    In demo mode, you're seeing sample budget categories, expense entries, and financial reports. 
    Track chapter expenses by category — events, philanthropy, operations, and more. Submit expenses with receipt photos for easy reimbursement. 
    The budget overview shows spending against planned budgets with visual progress bars. 
    Chapter treasurers can approve or reject expense submissions with notes. 
    Generate financial reports for chapter meetings or national organization requirements. 
    The system supports multiple payment methods and tracks reimbursement status. 
    This tool helps your chapter practice faithful financial stewardship while staying organized and accountable.`,
  },

  'hidden-in-plain-sight': {
    title: 'Hidden in Plain Sight Tour',
    voice: 'onyx',
    script: `Welcome to Hidden in Plain Sight — an eye-opening course examining the symbols, rituals, and historical origins of Greek letter organizations. 
    This course reveals what's hidden in the handshakes, calls, symbols, and ceremonies that many members participate in without full understanding. 
    In demo mode, you can preview the research modules, symbol analysis tools, and historical timelines. 
    Each module presents documented evidence from organizational histories, founder statements, and scholarly research. 
    The interactive symbol guide lets you explore specific symbols and their biblical or non-biblical origins. 
    This course is not about condemnation — it's about education and empowering you to make informed decisions. 
    Complete the course to earn your research certificate and access the full symbol reference library.`,
  },

  achievements: {
    title: 'Achievements Tour',
    voice: 'onyx',
    script: `Welcome to Achievements — your gamified journey tracker for the Sacred Greeks platform. 
    In demo mode, you're seeing sample achievements including completion badges, streak milestones, and community impact awards. 
    Earn points by completing devotionals, finishing course modules, supporting prayers, and engaging with the community. 
    Daily challenges offer bonus points for specific activities. 
    Your achievement level progresses through tiers as you accumulate points and complete key milestones. 
    Certificates are awarded for completing major courses and reaching significant streaks. 
    Share your achievements with your chapter or on social media to inspire others. 
    This system is designed to make your spiritual growth journey engaging and rewarding.`,
  },

  'study-guide': {
    title: 'Study Guide Tour',
    voice: 'onyx',
    script: `Welcome to the Study Guide — your comprehensive resource hub for all Sacred Greeks educational content. 
    Browse courses, reading materials, and study plans organized by topic and difficulty level. 
    In demo mode, you can see the full catalog of available content including the P.R.O.O.F. framework, Sacred Money mastery, historical research, and leadership modules. 
    Each study resource includes estimated completion time, difficulty level, and prerequisite recommendations. 
    Create custom study plans that fit your schedule — daily, weekly, or intensive tracks are available. 
    Track your progress across all materials from this central hub. 
    The AI study assistant can recommend personalized learning paths based on your assessment results and interests. 
    Start exploring to find the resources that match your spiritual growth goals.`,
  },

  'symbol-guide': {
    title: 'Symbol Guide Tour',
    voice: 'onyx',
    script: `Welcome to the Symbol Guide — a visual reference library documenting the symbols, signs, and iconography used across Divine Nine organizations. 
    In demo mode, you can browse sample entries showing symbol imagery, historical origins, and biblical analysis. 
    Each entry provides the symbol name, which organization uses it, its stated meaning, and a biblical perspective on its significance. 
    Use the search and filter tools to explore symbols by organization or category. 
    Bookmark symbols you want to study further or discuss with your accountability group. 
    This guide is a companion to the Hidden in Plain Sight course and provides quick reference during group studies. 
    The goal is informed faith — understanding what you're representing and making conscious decisions about your participation.`,
  },

  'video-studio': {
    title: 'Studio Agent Tour',
    voice: 'onyx',
    script: `Welcome to the Studio Agent — your AI-powered video creation hub inside Sacred Greeks. 
    This studio lets you turn any idea into a polished video, thumbnail, or animation in just a few steps. 
    Start by choosing a creation mode at the top: Text to Video generates a video from a written prompt. Image to Video animates a still image with AI-driven motion. AI Thumbnails creates photorealistic images for your content. And Upload lets you save existing videos to your library. 
    In demo mode, you're seeing sample videos including a P.R.O.O.F. Objection Short, a Mini Teaching, and a Conversation Prep — all generated from approved library content. 
    Here's how the process works. First, type or select a prompt describing your video. The AI generates a full script with scenes, narration, captions, and visual direction — all citation-grounded in the P.R.O.O.F. framework. 
    Next, review and edit the script in the Scene Editor. Each scene shows its visual description, narration text, and duration. You can adjust anything before rendering. 
    Then choose your rendering provider in Settings — Runway Gen-4 for AI-generated video, Replicate for alternative models like MiniMax or Luma Ray, or ShotStack for timeline-based composition with text overlays and transitions. 
    Hit Generate and the system submits the job. You can leave the page and come back — your video will be waiting in your library. 
    Every generated video includes automated SRT captions and a full transcript. 
    Admins can access Custom Content Mode to create videos beyond the P.R.O.O.F. framework. 
    Explore the demo library below to see what's possible, then create your own.`,
  },
};

export function getDemoNarration(pageKey: string): DemoNarrationScript | null {
  return narrationScripts[pageKey] || null;
}

export function getAllDemoNarrationKeys(): string[] {
  return Object.keys(narrationScripts);
}
