import jsPDF from "jspdf";

interface WorksheetData {
  letter: string;
  title: string;
  description: string;
  keyQuestions: string[];
  applicationExercises: string[];
  reflectionPrompts: string[];
  scriptureMemory: { ref: string; text: string };
  actionPlan: string[];
}

const PROOF_COLORS: Record<string, [number, number, number]> = {
  P: [59, 130, 246],  // Blue
  R: [168, 85, 247],  // Purple
  O1: [249, 115, 22], // Orange
  O2: [34, 197, 94],  // Green
  F: [239, 68, 68],   // Red
};

const worksheetData: WorksheetData[] = [
  {
    letter: 'P',
    title: 'Pledge Process: Responding to Hazing Accusations',
    description: 'Biblical guidance on navigating intake with integrity',
    keyQuestions: [
      'What specific boundaries will I maintain during any intake process?',
      'Am I willing to walk away if those boundaries are violated?',
      'How can I actively work to eliminate hazing in my organization?',
      'What does "servant leadership" look like in a Greek context?',
      'How would Jesus handle witnessing hazing?'
    ],
    applicationExercises: [
      'Write out 5 non-negotiable boundaries you will maintain during intake.',
      'Research your organization\'s anti-hazing policies. Summarize them below.',
      'Identify 3 ways you can model Christ-like mentorship to new members.',
      'Draft a conversation you would have with a line brother/sister who wants to haze.',
      'Create an accountability plan with a spiritual mentor for your intake process.'
    ],
    reflectionPrompts: [
      'How does Luke 6:31 ("Do to others as you would have them do to you") apply to intake?',
      'What is the difference between challenging someone to grow and degrading them?',
      'If hazing is so prevalent, is it possible to be Greek and maintain integrity?',
      'What would reformation look like in my specific chapter?',
      'How do I respond to "that\'s just how it\'s always been done"?'
    ],
    scriptureMemory: {
      ref: 'Philippians 2:3',
      text: 'Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves.'
    },
    actionPlan: [
      'Before joining: Research actual intake practices (not just written policies)',
      'During intake: Document any violations; maintain your boundaries',
      'After intake: Commit to being part of the solution, not the problem',
      'As a leader: Model the change you want to see; reform traditions',
      'Always: Maintain accountability with a spiritual mentor'
    ]
  },
  {
    letter: 'R',
    title: 'Rituals: Addressing "Demonic Portal" Accusations',
    description: 'Discerning ceremonial practices through Scripture',
    keyQuestions: [
      'Have I personally examined my organization\'s rituals?',
      'Can I articulate what each ritual element represents?',
      'Is there anything I cannot do in good conscience?',
      'Am I giving power to rituals through my fear?',
      'Can I explain the "power of belief" principle?'
    ],
    applicationExercises: [
      'List your organization\'s major ritual elements and their stated purpose.',
      'Compare these to church rituals (communion, baptism). What are the similarities?',
      'Identify any "red flags" vs. "yellow flags" in your rituals.',
      'Write out how you would explain 1 Corinthians 8:4 to a concerned family member.',
      'Practice explaining the difference between ritual and worship.'
    ],
    reflectionPrompts: [
      'Why do people assume Greek rituals are demonic but church rituals are holy?',
      'How does fear grant spiritual power to things that have none?',
      'What is the difference between caution and paranoia regarding rituals?',
      'If candles and robes are "occult," why do churches use them?',
      'How do I maintain spiritual authority in Christ during ceremonies?'
    ],
    scriptureMemory: {
      ref: '1 Corinthians 8:4',
      text: 'We know that "an idol is nothing at all in the world" and that "there is no God but one."'
    },
    actionPlan: [
      'Research: Study your organization\'s ritual origins and meanings',
      'Evaluate: Identify anything that truly conflicts with Scripture',
      'Decide: Draw clear lines about what you will/won\'t participate in',
      'Communicate: Know how to explain your position to critics',
      'Stand: Participate with a clear conscience, or abstain with conviction'
    ]
  },
  {
    letter: 'O',
    title: 'Oaths: Answering Greek Deity Allegiance Claims',
    description: 'Understanding vows in light of Scripture',
    keyQuestions: [
      'Have I actually read my organization\'s oath?',
      'Can I articulate what my oath commits me to?',
      'Is there conflict between organizational and baptismal vows?',
      'Would I be comfortable reciting my oath before my pastor?',
      'Does my oath require unconditional loyalty conflicting with God?'
    ],
    applicationExercises: [
      'Write out your organization\'s oath (or as much as you remember).',
      'Identify each commitment made in the oath. Does any conflict with Scripture?',
      'Compare your oath to wedding vows, military oaths, or courtroom oaths.',
      'Research why Greek letters were chosen (hint: academic prestige).',
      'Prepare a response to someone who says wearing letters = worshipping gods.'
    ],
    reflectionPrompts: [
      'Is oath-taking inherently sinful, or is it the content that matters?',
      'Why did Greek organizations choose Greek letters in the early 1900s?',
      'How is wearing Greek letters different from worshipping Greek gods?',
      'What would make an oath unacceptable for a Christian?',
      'How do I honor my organizational commitments while keeping God first?'
    ],
    scriptureMemory: {
      ref: 'James 5:12',
      text: 'Above all, my brothers and sisters, do not swear—not by heaven or by earth or by anything else. All you need to say is a simple "Yes" or "No."'
    },
    actionPlan: [
      'Read: Actually read your organization\'s oath and founding documents',
      'Analyze: Identify what you\'re committing to and why',
      'Compare: Look at other oaths Christians take without controversy',
      'Clarify: Understand the difference between commitment and worship',
      'Articulate: Be ready to explain why Greek letters ≠ Greek gods'
    ]
  },
  {
    letter: 'O',
    title: 'Obscurity: Countering "Secret Society" Fears',
    description: 'Walking in the light while honoring confidentiality',
    keyQuestions: [
      'Can I honestly discuss my Greek involvement with spiritual mentors?',
      'Is anything secret because it\'s shameful rather than confidential?',
      'Do I have adequate spiritual accountability?',
      'Would I be comfortable if practices were made public?',
      'Am I secretive to protect wrongdoing or maintain confidentiality?'
    ],
    applicationExercises: [
      'Identify one person outside your organization you can be fully transparent with.',
      'List what is "confidential" in your organization vs. what would be shameful.',
      'Write out what "walking in the light" means practically for Greek involvement.',
      'Research: Did Jesus have private teachings? (Mark 4:34) What does this tell us?',
      'Create an accountability structure with a pastor or mentor.'
    ],
    reflectionPrompts: [
      'What is the difference between "secret" and "confidential"?',
      'Why do organizations maintain confidentiality? Is this inherently sinful?',
      'Does "walking in the light" mean broadcasting everything publicly?',
      'How did the early church balance community privacy with public witness?',
      'What makes something "darkness" versus simply "private"?'
    ],
    scriptureMemory: {
      ref: '1 John 1:7',
      text: 'But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus, his Son, purifies us from all sin.'
    },
    actionPlan: [
      'Establish: Create accountability with at least one spiritual mentor',
      'Examine: Ensure nothing is hidden because it\'s shameful',
      'Distinguish: Know the difference between confidentiality and concealment',
      'Maintain: Keep lines of communication open with your pastor/mentor',
      'Witness: Let your character testify even when specifics are private'
    ]
  },
  {
    letter: 'F',
    title: 'Founders: Examining Masonic Connection Claims',
    description: 'Researching organizational history biblically',
    keyQuestions: [
      'Have I honestly researched my organization\'s history?',
      'Can I articulate a biblical response to each criticism?',
      'Am I committed to honoring Christ whether I remain Greek or not?',
      'Do I understand the historical context of Black fraternal organizations?',
      'Can I separate founder characteristics from organizational identity?'
    ],
    applicationExercises: [
      'Research your organization\'s founders. List their affiliations and professions.',
      'Study why African Americans joined fraternal lodges in the 1800s-1900s.',
      'Write out the difference between "founded by Masons" and "being Masonic."',
      'Research: What economic services did Black lodges provide?',
      'Prepare a response to the "Masonic connection" criticism.'
    ],
    reflectionPrompts: [
      'Does having Masonic founders make an organization Masonic?',
      'Why did Black men join lodges when churches were available?',
      'How do we evaluate organizations that have evolved over time?',
      'What does "by their fruits you shall know them" mean for Greek organizations?',
      'Can organizations founded in one context serve different purposes today?'
    ],
    scriptureMemory: {
      ref: 'Matthew 7:16-17',
      text: 'By their fruit you will recognize them... every good tree bears good fruit, but a bad tree bears bad fruit.'
    },
    actionPlan: [
      'Research: Study your organization\'s actual history, not conspiracy theories',
      'Context: Understand the economic necessity of Black fraternal organizations',
      'Evaluate: Judge your organization by its current fruits and purposes',
      'Distinguish: Separate structural borrowing from spiritual allegiance',
      'Decide: Make an informed decision based on Scripture and research'
    ]
  }
];

export const generateLessonWorksheetPDF = (lessonIndex: number): void => {
  const worksheet = worksheetData[lessonIndex];
  if (!worksheet) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = 0;

  const colorKey = worksheet.letter === 'O' && lessonIndex === 3 ? 'O2' : 
                   worksheet.letter === 'O' && lessonIndex === 2 ? 'O1' : 
                   worksheet.letter;
  const color = PROOF_COLORS[colorKey] || PROOF_COLORS.P;

  const addNewPageIfNeeded = (requiredSpace: number = 30) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  const addWritingLines = (count: number) => {
    for (let i = 0; i < count; i++) {
      yPos += 10;
      addNewPageIfNeeded(12);
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.3);
      doc.line(margin + 5, yPos, pageWidth - margin, yPos);
    }
    yPos += 5;
  };

  // Header Banner
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Letter badge
  doc.setFillColor(255, 255, 255);
  doc.circle(28, 22, 14, 'F');
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(worksheet.letter, 28, 28, { align: 'center' });

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(worksheet.title, contentWidth - 50);
  doc.text(titleLines, 50, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('P.R.O.O.F. Framework Worksheet', 50, 32);
  doc.setFontSize(8);
  doc.text('Print & Complete • SacredGreeks.com', 50, 38);

  yPos = 55;

  // Instructions Box
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPos, contentWidth, 18, 'F');
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Instructions: Complete this worksheet as you work through the lesson. Write your answers on the lines provided.', margin + 5, yPos + 7);
  doc.text('For group study, discuss your answers with your chapter or small group.', margin + 5, yPos + 13);
  yPos += 25;

  // Key Questions Section
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION 1: KEY QUESTIONS', margin + 5, yPos + 5.5);
  yPos += 14;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  worksheet.keyQuestions.forEach((question, i) => {
    addNewPageIfNeeded(35);
    doc.setFont('helvetica', 'bold');
    doc.text(`${i + 1}. ${question}`, margin, yPos);
    yPos += 5;
    addWritingLines(2);
  });

  // Application Exercises Section
  addNewPageIfNeeded(50);
  yPos += 5;
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION 2: APPLICATION EXERCISES', margin + 5, yPos + 5.5);
  yPos += 14;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  worksheet.applicationExercises.forEach((exercise, i) => {
    addNewPageIfNeeded(40);
    doc.setFont('helvetica', 'bold');
    const exLines = doc.splitTextToSize(`${i + 1}. ${exercise}`, contentWidth - 5);
    doc.text(exLines, margin, yPos);
    yPos += exLines.length * 4 + 2;
    addWritingLines(3);
  });

  // Reflection Prompts Section
  doc.addPage();
  yPos = margin;
  
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION 3: DEEPER REFLECTION', margin + 5, yPos + 5.5);
  yPos += 14;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  worksheet.reflectionPrompts.forEach((prompt, i) => {
    addNewPageIfNeeded(40);
    doc.setFont('helvetica', 'bold');
    const promptLines = doc.splitTextToSize(`${i + 1}. ${prompt}`, contentWidth - 5);
    doc.text(promptLines, margin, yPos);
    yPos += promptLines.length * 4 + 2;
    addWritingLines(3);
  });

  // Scripture Memory Section
  addNewPageIfNeeded(50);
  yPos += 5;
  doc.setFillColor(255, 245, 220);
  doc.rect(margin, yPos, contentWidth, 30, 'F');
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(1);
  doc.rect(margin, yPos, contentWidth, 30, 'S');

  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SCRIPTURE TO MEMORIZE', margin + 5, yPos + 8);
  
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(worksheet.scriptureMemory.ref, margin + 5, yPos + 15);
  
  doc.setFont('helvetica', 'italic');
  const verseLines = doc.splitTextToSize(`"${worksheet.scriptureMemory.text}"`, contentWidth - 10);
  doc.text(verseLines, margin + 5, yPos + 21);
  yPos += 40;

  // Action Plan Section
  addNewPageIfNeeded(60);
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('MY ACTION PLAN', margin + 5, yPos + 5.5);
  yPos += 14;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  worksheet.actionPlan.forEach((step, i) => {
    addNewPageIfNeeded(20);
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.rect(margin, yPos - 3, 4, 4, 'S');
    const stepLines = doc.splitTextToSize(step, contentWidth - 10);
    doc.text(stepLines, margin + 8, yPos);
    yPos += stepLines.length * 4 + 6;
  });

  // Commitment Section
  addNewPageIfNeeded(40);
  yPos += 5;
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPos, contentWidth, 30, 'F');
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('MY COMMITMENT:', margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  doc.text('Based on this lesson, I commit to:', margin + 5, yPos + 14);
  doc.setDrawColor(180, 180, 180);
  doc.line(margin + 5, yPos + 22, pageWidth - margin - 5, yPos + 22);
  yPos += 35;

  doc.setFontSize(8);
  doc.text('Signature: ____________________________    Date: ______________', margin + 5, yPos);

  // Footer
  const footerY = pageHeight - 15;
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('P.R.O.O.F. Framework — Pledge • Rituals • Oaths • Obscurity • Founders', pageWidth / 2, footerY, { align: 'center' });
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(7);
  doc.text('Sacred Greeks™ | sacredgreeks.lovable.app', pageWidth / 2, footerY + 5, { align: 'center' });

  const lessonNames = ['Pledge', 'Rituals', 'Oaths', 'Obscurity', 'Founders'];
  doc.save(`proof-worksheet-${worksheet.letter.toLowerCase()}-${lessonNames[lessonIndex].toLowerCase()}.pdf`);
};

export const generateAllWorksheetsPDF = (): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  // Cover Page
  doc.setFillColor(139, 92, 246);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('P.R.O.O.F.', pageWidth / 2, 60, { align: 'center' });

  doc.setFontSize(18);
  doc.text('Framework Worksheets', pageWidth / 2, 80, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Complete Study Guide with Exercises', pageWidth / 2, 100, { align: 'center' });

  // Letters
  const letters = [
    { letter: 'P', name: 'Pledge Process', color: PROOF_COLORS.P },
    { letter: 'R', name: 'Rituals', color: PROOF_COLORS.R },
    { letter: 'O', name: 'Oaths', color: PROOF_COLORS.O1 },
    { letter: 'O', name: 'Obscurity', color: PROOF_COLORS.O2 },
    { letter: 'F', name: 'Founders', color: PROOF_COLORS.F }
  ];

  let letterY = 130;
  letters.forEach((item) => {
    doc.setFillColor(item.color[0], item.color[1], item.color[2]);
    doc.circle(pageWidth / 2 - 35, letterY - 3, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(item.letter, pageWidth / 2 - 35, letterY, { align: 'center' });
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(item.name, pageWidth / 2 - 20, letterY);
    letterY += 18;
  });

  doc.setFontSize(10);
  doc.text('Sacred Greeks™ | sacredgreeks.lovable.app', pageWidth / 2, pageHeight - 25, { align: 'center' });

  // Generate each worksheet as separate pages
  worksheetData.forEach((worksheet, lessonIndex) => {
    doc.addPage();
    let yPos = 0;

    const colorKey = worksheet.letter === 'O' && lessonIndex === 3 ? 'O2' : 
                     worksheet.letter === 'O' && lessonIndex === 2 ? 'O1' : 
                     worksheet.letter;
    const color = PROOF_COLORS[colorKey] || PROOF_COLORS.P;

    const addNewPageIfNeeded = (requiredSpace: number = 30) => {
      if (yPos + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
        return true;
      }
      return false;
    };

    const addWritingLines = (count: number) => {
      for (let i = 0; i < count; i++) {
        yPos += 8;
        addNewPageIfNeeded(10);
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.3);
        doc.line(margin + 5, yPos, pageWidth - margin, yPos);
      }
      yPos += 4;
    };

    // Header
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(0, 0, pageWidth, 35, 'F');

    doc.setFillColor(255, 255, 255);
    doc.circle(22, 17.5, 10, 'F');
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(worksheet.letter, 22, 22, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    const titleLines = doc.splitTextToSize(worksheet.title, contentWidth - 35);
    doc.text(titleLines, 38, 14);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Worksheet ${lessonIndex + 1} of 5`, 38, 28);

    yPos = 45;

    // Key Questions
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(margin, yPos, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('KEY QUESTIONS', margin + 4, yPos + 5);
    yPos += 12;

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);
    worksheet.keyQuestions.forEach((q, i) => {
      addNewPageIfNeeded(25);
      doc.setFont('helvetica', 'bold');
      doc.text(`${i + 1}. ${q}`, margin, yPos);
      yPos += 4;
      addWritingLines(2);
    });

    // Scripture Memory
    addNewPageIfNeeded(25);
    yPos += 3;
    doc.setFillColor(255, 250, 230);
    doc.rect(margin, yPos, contentWidth, 18, 'F');
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(0.5);
    doc.rect(margin, yPos, contentWidth, 18, 'S');
    
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`MEMORIZE: ${worksheet.scriptureMemory.ref}`, margin + 3, yPos + 6);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    const verseLines = doc.splitTextToSize(`"${worksheet.scriptureMemory.text}"`, contentWidth - 8);
    doc.text(verseLines, margin + 3, yPos + 12);
    yPos += 25;

    // Action Items
    addNewPageIfNeeded(40);
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(margin, yPos, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('ACTION STEPS', margin + 4, yPos + 5);
    yPos += 12;

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    worksheet.actionPlan.forEach((step) => {
      addNewPageIfNeeded(12);
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.rect(margin, yPos - 2, 3, 3, 'S');
      const stepLines = doc.splitTextToSize(step, contentWidth - 8);
      doc.text(stepLines, margin + 6, yPos);
      yPos += stepLines.length * 3 + 4;
    });

    // Footer
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(6);
    doc.text('Sacred Greeks™ | P.R.O.O.F. Framework', pageWidth / 2, pageHeight - 10, { align: 'center' });
  });

  doc.save('proof-all-worksheets.pdf');
};
