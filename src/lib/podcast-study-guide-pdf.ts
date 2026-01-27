import jsPDF from "jspdf";

export interface PodcastStudyGuide {
  episodeNumber: number;
  episodeTitle: string;
  theme: string;
  keyScriptures: string[];
  summary: string;
  discussionQuestions: string[];
  actionStep: string;
  reflectionPrompt: string;
}

// Generate study guides based on episode titles/themes
export const getPodcastStudyGuide = (episodeTitle: string, episodeNumber: number): PodcastStudyGuide => {
  // Default template - can be customized based on episode content
  const defaultGuide: PodcastStudyGuide = {
    episodeNumber,
    episodeTitle,
    theme: "Exploring faith and Greek life through biblical wisdom",
    keyScriptures: [
      "Romans 12:2 - Be transformed by the renewing of your mind",
      "Proverbs 27:17 - Iron sharpens iron",
      "1 Corinthians 10:31 - Do everything for the glory of God"
    ],
    summary: `In this episode, we explore important themes related to navigating faith while being part of Greek life. The discussion covers practical wisdom for maintaining your Christian walk while honoring your organizational commitments.`,
    discussionQuestions: [
      "What stood out most to you in this episode?",
      "How does this episode's message apply to your current situation?",
      "What Scripture references resonated with you and why?",
      "How can you apply these principles in your chapter or organization?",
      "What questions do you still have after listening?"
    ],
    actionStep: "This week, identify one practical way to apply what you learned from this episode. Write it down and share it with an accountability partner.",
    reflectionPrompt: "Take a moment to journal about how this episode has challenged or encouraged your faith journey as a Greek."
  };

  // Customize based on common episode themes
  const titleLower = episodeTitle.toLowerCase();
  
  if (titleLower.includes("ritual") || titleLower.includes("ceremony")) {
    return {
      ...defaultGuide,
      theme: "Understanding rituals and ceremonies through a biblical lens",
      keyScriptures: [
        "1 Corinthians 8:4-6 - An idol is nothing in the world",
        "Romans 14:5-6 - Let each be fully convinced in their own mind",
        "Colossians 2:16-17 - Do not let anyone judge you"
      ],
      discussionQuestions: [
        "How does Scripture help us evaluate rituals and ceremonies?",
        "What is the difference between ritual and worship?",
        "How can we participate in organizational traditions while keeping Christ first?",
        "What boundaries should Christians set around ceremonial participation?",
        "How do you respond to those who criticize Greek rituals?"
      ],
      actionStep: "Examine one ritual or ceremony in your organization. Prayerfully consider: Does this honor God, conflict with Scripture, or fall into a neutral category?"
    };
  }
  
  if (titleLower.includes("symbol") || titleLower.includes("letters") || titleLower.includes("greek")) {
    return {
      ...defaultGuide,
      theme: "Symbols, letters, and their meaning in Christian context",
      keyScriptures: [
        "1 Corinthians 8:4 - We know that an idol is nothing",
        "Acts 17:22-23 - Paul engaging Greek culture",
        "Romans 14:14 - Nothing is unclean in itself"
      ],
      discussionQuestions: [
        "What power do symbols actually have according to Scripture?",
        "How did Paul engage with Greek culture and symbols?",
        "What everyday symbols with pagan origins do Christians use without concern?",
        "How do you explain your letters to fellow Christians?",
        "What does wearing your letters mean to you spiritually?"
      ],
      actionStep: "Make a list of symbols you encounter daily that have historical pagan connections. Reflect on how intent and context determine meaning."
    };
  }
  
  if (titleLower.includes("secret") || titleLower.includes("privacy") || titleLower.includes("confidential")) {
    return {
      ...defaultGuide,
      theme: "Understanding secrecy and confidentiality biblically",
      keyScriptures: [
        "Mark 1:43-44 - Jesus instructing secrecy after healing",
        "Matthew 16:20 - Jesus warning disciples not to tell",
        "Proverbs 11:13 - A trustworthy person keeps a secret"
      ],
      discussionQuestions: [
        "Did Jesus practice secrecy? Why or why not?",
        "What is the difference between sinful secrecy and appropriate confidentiality?",
        "What forms of acceptable secrecy exist in Christian life?",
        "How do you evaluate what should be kept private vs. public?",
        "How does understanding Jesus's 'Messianic Secret' change your view?"
      ],
      actionStep: "Identify one aspect of your organization's confidentiality. Ask: Does this hide sin or protect something valuable?"
    };
  }
  
  if (titleLower.includes("oath") || titleLower.includes("vow") || titleLower.includes("pledge")) {
    return {
      ...defaultGuide,
      theme: "Oaths, vows, and commitments in light of Scripture",
      keyScriptures: [
        "Matthew 5:33-37 - Let your yes be yes",
        "James 5:12 - Do not swear by heaven or earth",
        "Ecclesiastes 5:4-5 - Better not to vow than to break it"
      ],
      discussionQuestions: [
        "What does Jesus teach about making oaths and vows?",
        "How do we evaluate commitments we've already made?",
        "What is the difference between sinful oaths and honorable commitments?",
        "How do you handle conflicts between organizational and Christian commitments?",
        "What promises from your organization align with biblical values?"
      ],
      actionStep: "Review any commitments or pledges you made during your Greek journey. Identify which align with Scripture and which need prayerful reconsideration."
    };
  }
  
  if (titleLower.includes("history") || titleLower.includes("founder") || titleLower.includes("legacy")) {
    return {
      ...defaultGuide,
      theme: "Understanding history and legacy through faith",
      keyScriptures: [
        "John 7:24 - Judge with right judgment",
        "Proverbs 11:1 - A false balance is an abomination",
        "Romans 14:1-4 - Do not judge disputable matters"
      ],
      discussionQuestions: [
        "What is the 'genetic fallacy' and how does it apply to Greek life criticism?",
        "How do we honor founders while keeping Christ first?",
        "What Christian traditions have 'problematic' historical origins?",
        "How does understanding history help us engage critics wisely?",
        "What legacy do you want to leave in your organization?"
      ],
      actionStep: "Research the founding mission of your organization. Identify how the original values align with or challenge your Christian faith."
    };
  }
  
  if (titleLower.includes("service") || titleLower.includes("community") || titleLower.includes("mission")) {
    return {
      ...defaultGuide,
      theme: "Service, community, and Christian witness",
      keyScriptures: [
        "Matthew 7:16-20 - By their fruit you will know them",
        "Galatians 5:22-23 - The fruit of the Spirit",
        "James 2:17 - Faith without works is dead"
      ],
      discussionQuestions: [
        "How do you see the fruit of the Spirit manifest in your organization?",
        "What service projects has your chapter done that reflect Christ's love?",
        "How can Greek life be a platform for Christian witness?",
        "What tensions exist between organizational service and Christian calling?",
        "How do you integrate your faith into chapter activities?"
      ],
      actionStep: "Plan or participate in a service project this month. Intentionally use it as an opportunity to demonstrate Christ's love."
    };
  }

  return defaultGuide;
};

export const generatePodcastStudyGuidePDF = (
  episodeTitle: string,
  episodeNumber: number = 1,
  episodeDate?: string
) => {
  const guide = getPodcastStudyGuide(episodeTitle, episodeNumber);
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPosition = margin;

  const addNewPageIfNeeded = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  const addSectionHeader = (text: string) => {
    addNewPageIfNeeded(15);
    doc.setFillColor(139, 92, 246); // Purple color
    doc.rect(margin - 5, yPosition - 5, contentWidth + 10, 12, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(text, margin, yPosition + 3);
    yPosition += 15;
  };

  // Cover Section
  doc.setFillColor(139, 92, 246);
  doc.rect(0, 0, pageWidth, 60, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("SACRED GREEKS PODCAST", pageWidth / 2, 15, { align: "center" });
  
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Study Guide Companion", pageWidth / 2, 30, { align: "center" });
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const titleLines = doc.splitTextToSize(episodeTitle, contentWidth - 20);
  doc.text(titleLines, pageWidth / 2, 45, { align: "center" });

  yPosition = 75;

  // Episode Info
  doc.setTextColor(139, 92, 246);
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  if (episodeDate) {
    doc.text(`Episode ${episodeNumber} • ${episodeDate}`, margin, yPosition);
  } else {
    doc.text(`Episode ${episodeNumber}`, margin, yPosition);
  }
  yPosition += 8;
  
  doc.setTextColor(100, 100, 100);
  doc.text(`Theme: ${guide.theme}`, margin, yPosition);
  yPosition += 15;

  // Key Scriptures
  addSectionHeader("Key Scriptures");
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  guide.keyScriptures.forEach((scripture) => {
    addNewPageIfNeeded(10);
    const lines = doc.splitTextToSize(`• ${scripture}`, contentWidth);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * 5 + 3;
  });
  yPosition += 5;

  // Episode Summary
  addSectionHeader("Episode Summary");
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const summaryLines = doc.splitTextToSize(guide.summary, contentWidth);
  addNewPageIfNeeded(summaryLines.length * 5 + 10);
  doc.text(summaryLines, margin, yPosition);
  yPosition += summaryLines.length * 5 + 10;

  // Discussion Questions
  addSectionHeader("Discussion Questions");
  
  guide.discussionQuestions.forEach((question, index) => {
    addNewPageIfNeeded(30);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    
    const questionText = `${index + 1}. ${question}`;
    const questionLines = doc.splitTextToSize(questionText, contentWidth);
    doc.text(questionLines, margin, yPosition);
    yPosition += questionLines.length * 5 + 3;
    
    // Answer box
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(250, 250, 250);
    doc.rect(margin, yPosition, contentWidth, 18, "FD");
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.text("Your thoughts:", margin + 3, yPosition + 5);
    
    yPosition += 23;
  });

  // Action Step
  addNewPageIfNeeded(45);
  addSectionHeader("Action Step");
  
  doc.setFillColor(245, 240, 255);
  doc.setDrawColor(139, 92, 246);
  
  const actionLines = doc.splitTextToSize(guide.actionStep, contentWidth - 10);
  const actionBoxHeight = actionLines.length * 5 + 15;
  
  doc.rect(margin, yPosition, contentWidth, actionBoxHeight, "FD");
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(139, 92, 246);
  doc.text("This Week's Challenge:", margin + 5, yPosition + 8);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  doc.text(actionLines, margin + 5, yPosition + 16);
  
  yPosition += actionBoxHeight + 10;

  // Reflection Prompt
  addNewPageIfNeeded(40);
  addSectionHeader("Personal Reflection");
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  const reflectionLines = doc.splitTextToSize(guide.reflectionPrompt, contentWidth);
  doc.text(reflectionLines, margin, yPosition);
  yPosition += reflectionLines.length * 5 + 8;
  
  // Reflection writing lines
  doc.setDrawColor(200, 200, 200);
  for (let i = 0; i < 5; i++) {
    addNewPageIfNeeded(12);
    doc.line(margin, yPosition + i * 10, pageWidth - margin, yPosition + i * 10);
  }
  yPosition += 55;

  // Footer
  addNewPageIfNeeded(30);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(139, 92, 246);
  doc.text("Want to go deeper? Get the book 'Sacred, Not Sinful' on Amazon", margin, pageHeight - 25);
  doc.text("Visit sacredgreeks.com for more resources", margin, pageHeight - 18);
  
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("© Sacred Greeks™. All Rights Reserved.", margin, pageHeight - 10);

  // Generate filename
  const safeTitle = episodeTitle
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  doc.save(`Sacred-Greeks-Podcast-StudyGuide-${safeTitle}.pdf`);
};
