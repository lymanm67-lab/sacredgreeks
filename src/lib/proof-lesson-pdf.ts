import jsPDF from "jspdf";

interface LessonData {
  letter: string;
  title: string;
  criticism: string;
  biblicalResponse: string[];
  keyPrinciples: string[];
  sampleResponse: string;
  reflectionQuestions: string[];
}

const PROOF_COLORS: Record<string, [number, number, number]> = {
  P: [59, 130, 246],  // Blue
  R: [168, 85, 247],  // Purple
  O1: [249, 115, 22], // Orange
  O2: [34, 197, 94],  // Green
  F: [239, 68, 68],   // Red
};

const lessonData: LessonData[] = [
  {
    letter: 'P',
    title: 'Pledge Process: Responding to Hazing Accusations',
    criticism: '"Greek organizations promote hazing. Christians shouldn\'t participate in abusive intake processes."',
    biblicalResponse: [
      'Count the Cost (Luke 14:28-30) - Research actual intake practices before joining',
      'Set Non-Negotiable Boundaries - Refuse activities that demean or harm others',
      'Be a Reformer, Not a Participant - Actively work to eliminate hazing',
      'Guard Your Heart (Proverbs 4:23) - If intake compromises faith, it\'s a red flag',
      'Mentor with Christ-like Servant Leadership - Model processes that build up'
    ],
    keyPrinciples: [
      'Hazing is real, harmful, and unbiblical',
      '"Do to others as you would have them do to you" (Luke 6:31)',
      '"Do nothing out of selfish ambition" (Philippians 2:3)',
      'Christians should reform from within',
      'Set boundaries before joining, not after'
    ],
    sampleResponse: '"You\'re right that hazing is sinful, and I oppose it completely. That\'s exactly why Christians should be in these organizations—to reform them from within. I set firm boundaries during my intake, and I\'m committed to ensuring future members have a dignified experience that reflects Christ\'s love."',
    reflectionQuestions: [
      'What specific boundaries will I maintain during any intake process?',
      'Am I willing to walk away if those boundaries are violated?',
      'How can I actively work to eliminate hazing in my organization?'
    ]
  },
  {
    letter: 'R',
    title: 'Rituals: Addressing "Demonic Portal" Accusations',
    criticism: '"Greek rituals are demonic portals. You\'re opening yourself to spiritual attack by participating in pagan ceremonies."',
    biblicalResponse: [
      'What is the ritual\'s origin and purpose? - Research your organization\'s history',
      'What am I being asked to invoke or affirm? - Be specific about what\'s happening',
      'Does participation constitute worship? - Worship involves heart devotion',
      'Test the Spirits (1 John 4:1) - Develop discernment, not fear',
      'Freedom with Wisdom (1 Cor 10:23-33) - Some permissible but not beneficial'
    ],
    keyPrinciples: [
      'Ritual itself is not evil - Scripture contains God-ordained rituals',
      '"An idol is nothing at all in the world" (1 Corinthians 8:4)',
      'Christians are sealed by the Holy Spirit (1 John 4:4)',
      'Rituals only hold power when the participant believes in their authority',
      'Fear is a form of belief - don\'t grant rituals power through fear'
    ],
    sampleResponse: '"I\'ve carefully examined my organization\'s rituals. They don\'t invoke demons or worship false gods—they\'re ceremonial traditions similar to graduation ceremonies. The candles represent enlightenment through education, not occult practices. I participate with a clear conscience, asking \'Can I do this for God\'s glory?\'"',
    reflectionQuestions: [
      'Have I personally examined my organization\'s rituals?',
      'Can I articulate what each ritual element represents?',
      'Is there anything I cannot do in good conscience?',
      'Am I giving power to rituals through my fear?',
      'Can I explain the "power of belief" principle?'
    ]
  },
  {
    letter: 'O',
    title: 'Oaths: Answering Greek Deity Allegiance Claims',
    criticism: '"Greek organizations require you to swear allegiance to Greek gods like Apollo, Athena, or Zeus. You\'re committing idolatry."',
    biblicalResponse: [
      'Am I swearing to worship a false god? - Read your actual oath carefully',
      'Does this oath place anything above God? - Evaluate hierarchy of commitments',
      'Am I promising anything I cannot biblically do? - Avoid unconditional obedience',
      'Can I keep this oath with integrity? - Let your yes be yes (James 5:12)',
      'Apply 1 Corinthians 8:4 - Greek letters are organizational identifiers, not prayers'
    ],
    keyPrinciples: [
      'Greek letters were chosen for academic prestige, not religious worship',
      'Greek was the language of scholarship and the New Testament',
      'The issue is content, not the concept of oath-taking',
      'Marriage vows, military oaths, courtroom oaths are taken by Christians',
      'Greek letters on paraphernalia are not prayers to Zeus'
    ],
    sampleResponse: '"Wearing Greek letters isn\'t worshipping Greek gods any more than driving a Mercury car worships the Roman deity. My organization\'s oath commits me to scholarship, service, and brotherhood—values that align with my faith. There\'s no invocation of pagan deities or pledge of worship to anyone but God."',
    reflectionQuestions: [
      'Have I actually read my organization\'s oath?',
      'Can I articulate what my oath commits me to?',
      'Is there conflict between organizational and baptismal vows?',
      'Would I be comfortable reciting my oath before my pastor?',
      'Does my oath require unconditional loyalty conflicting with God?'
    ]
  },
  {
    letter: 'O',
    title: 'Obscurity: Countering "Secret Society" Fears',
    criticism: '"Greek organizations are secret societies. Christians should have nothing to do with hidden darkness—\'what fellowship has light with darkness?\'"',
    biblicalResponse: [
      'Walk in the Light (1 John 1:7) - Living transparently with God, not broadcasting all',
      'Nothing Hidden That Won\'t Be Revealed (Luke 12:2) - Warning about hypocrisy',
      'Accountability (Hebrews 10:24-25) - Maintain relationships for godly counsel',
      'Wisdom in Speech (Proverbs 11:13) - A trustworthy person keeps a secret',
      'Maintain accountability with spiritual mentors'
    ],
    keyPrinciples: [
      'Confidentiality isn\'t inherently sinful - even Jesus had private teaching',
      'Scripture condemns "fruitless deeds of darkness" - sinful actions, not privacy',
      'Churches have private meetings, families have confidential conversations',
      'The question: What is being kept confidential, and why?',
      'Have at least one spiritually mature person who knows about your involvement'
    ],
    sampleResponse: '"There\'s a difference between \'secret society\' conspiracies and organizational confidentiality. I don\'t broadcast my family\'s private conversations either. I maintain full accountability with my pastor about my Greek involvement. What I keep confidential are traditions meaningful to my organization, not sinful practices."',
    reflectionQuestions: [
      'Can I honestly discuss my Greek involvement with spiritual mentors?',
      'Is anything secret because it\'s shameful rather than confidential?',
      'Do I have adequate spiritual accountability?',
      'Would I be comfortable if practices were made public?',
      'Am I secretive to protect wrongdoing or maintain confidentiality?'
    ]
  },
  {
    letter: 'F',
    title: 'Founders: Examining Masonic Connection Claims',
    criticism: '"Greek organizations were founded by Freemasons. You\'re participating in Masonic traditions and joining a pathway to the lodge."',
    biblicalResponse: [
      'What was borrowed vs. essential? - Structure is common; purposes stand independently',
      'Does the organization require Freemasonry? - Most BGLOs have no formal connection',
      'What do the rituals actually teach? - Focus on what YOUR organization teaches today',
      'By their fruits you shall know them - Judge by actual impact and service',
      'Is redemption and reformation evident? - Organizations can evolve'
    ],
    keyPrinciples: [
      'Many founders were Masons - this is historical fact, not conspiracy',
      'African Americans joined lodges for economic survival, not ritual',
      'White insurance companies refused to sell death benefits to Black men',
      'Fraternal organizations provided burial insurance, sick benefits, loans',
      'Having Masonic founders doesn\'t make an organization Masonic'
    ],
    sampleResponse: '"Some of my organization\'s founders were Masons—that\'s documented history. But context matters: African American men joined lodges because white insurance companies wouldn\'t sell them death benefits. Having Masonic founders doesn\'t make us Masonic any more than having Baptist founders makes an organization a church."',
    reflectionQuestions: [
      'Have I honestly researched my organization\'s history?',
      'Can I articulate a biblical response to each criticism?',
      'Am I committed to honoring Christ whether I remain Greek or not?'
    ]
  }
];

export const generateProofLessonPDF = (lessonIndex: number): void => {
  const lesson = lessonData[lessonIndex];
  if (!lesson) return;

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

  const colorKey = lesson.letter === 'O' && lessonIndex === 3 ? 'O2' : 
                   lesson.letter === 'O' && lessonIndex === 2 ? 'O1' : 
                   lesson.letter;
  const color = PROOF_COLORS[colorKey] || PROOF_COLORS.P;

  // Header Banner
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Letter badge
  doc.setFillColor(255, 255, 255);
  doc.circle(25, 20, 12, 'F');
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(lesson.letter, 25, 25, { align: 'center' });

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(lesson.title, contentWidth - 40);
  doc.text(titleLines, 45, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('P.R.O.O.F. Framework Lesson Summary', 45, 32);

  yPos = 50;

  // The Criticism Section
  doc.setFillColor(254, 226, 226);
  doc.rect(margin, yPos, contentWidth, 25, 'F');
  doc.setTextColor(153, 27, 27);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('THE CRITICISM:', margin + 5, yPos + 7);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  const criticismLines = doc.splitTextToSize(lesson.criticism, contentWidth - 10);
  doc.text(criticismLines, margin + 5, yPos + 14);
  yPos += 32;

  // Biblical Response Section
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('BIBLICAL RESPONSE:', margin, yPos);
  yPos += 8;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  lesson.biblicalResponse.forEach((item, i) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${i + 1}.`, margin + 2, yPos);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(item, contentWidth - 12);
    doc.text(lines, margin + 8, yPos);
    yPos += lines.length * 4 + 3;
  });
  yPos += 5;

  // Key Principles Section
  doc.setFillColor(color[0], color[1], color[2]);
  doc.setFillColor(Math.min(color[0] + 180, 255), Math.min(color[1] + 180, 255), Math.min(color[2] + 180, 255));
  doc.rect(margin, yPos, contentWidth, 5 + lesson.keyPrinciples.length * 5, 'F');
  
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('KEY PRINCIPLES:', margin + 3, yPos + 5);
  yPos += 10;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  lesson.keyPrinciples.forEach((principle) => {
    doc.text(`• ${principle}`, margin + 5, yPos);
    yPos += 5;
  });
  yPos += 8;

  // Sample Response Section
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('SAMPLE RESPONSE TO CRITICS:', margin, yPos);
  yPos += 6;

  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, margin, yPos + 25);

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  const responseLines = doc.splitTextToSize(lesson.sampleResponse, contentWidth - 8);
  doc.text(responseLines, margin + 4, yPos + 4);
  yPos += Math.max(responseLines.length * 4 + 10, 30);

  // Reflection Questions Section
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = margin;
  }

  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('REFLECTION QUESTIONS:', margin + 5, yPos + 5.5);
  yPos += 12;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  lesson.reflectionQuestions.forEach((question, i) => {
    doc.text(`${i + 1}. ${question}`, margin + 3, yPos);
    yPos += 8;
    // Add space for writing
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin + 5, yPos, pageWidth - margin, yPos);
    yPos += 6;
  });

  // Footer
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('P.R.O.O.F. Framework — Pledge • Rituals • Oaths • Obscurity • Founders', pageWidth / 2, pageHeight - 18, { align: 'center' });

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Sacred Greeks™ | sacredgreeks.lovable.app | Reclaiming Greek Life for Christ', pageWidth / 2, pageHeight - 12, { align: 'center' });

  const letterName = ['Pledge', 'Rituals', 'Oaths', 'Obscurity', 'Founders'][lessonIndex];
  doc.save(`proof-lesson-${lesson.letter.toLowerCase()}-${letterName.toLowerCase()}.pdf`);
};

export const generateAllProofLessonsPDF = (): void => {
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
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.text('P.R.O.O.F.', pageWidth / 2, 70, { align: 'center' });

  doc.setFontSize(18);
  doc.text('Framework', pageWidth / 2, 85, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Complete Lesson Summary Guide', pageWidth / 2, 110, { align: 'center' });

  // PROOF Letters
  const letters = ['P', 'R', 'O', 'O', 'F'];
  const meanings = ['Pledge Process', 'Rituals', 'Oaths', 'Obscurity', 'Founders'];
  let letterY = 140;
  
  doc.setFontSize(12);
  letters.forEach((letter, i) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${letter}`, pageWidth / 2 - 40, letterY);
    doc.setFont('helvetica', 'normal');
    doc.text(`— ${meanings[i]}`, pageWidth / 2 - 32, letterY);
    letterY += 12;
  });

  doc.setFontSize(10);
  doc.text('Sacred Greeks™', pageWidth / 2, pageHeight - 30, { align: 'center' });
  doc.text('sacredgreeks.lovable.app', pageWidth / 2, pageHeight - 22, { align: 'center' });

  // Generate each lesson
  lessonData.forEach((lesson, lessonIndex) => {
    doc.addPage();
    let yPos = 0;

    const colorKey = lesson.letter === 'O' && lessonIndex === 3 ? 'O2' : 
                     lesson.letter === 'O' && lessonIndex === 2 ? 'O1' : 
                     lesson.letter;
    const color = PROOF_COLORS[colorKey] || PROOF_COLORS.P;

    // Header
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(0, 0, pageWidth, 35, 'F');

    doc.setFillColor(255, 255, 255);
    doc.circle(22, 17.5, 10, 'F');
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(lesson.letter, 22, 22, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    const titleLines = doc.splitTextToSize(lesson.title, contentWidth - 35);
    doc.text(titleLines, 38, 15);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Lesson ${lessonIndex + 1} of 5`, 38, 28);

    yPos = 45;

    // Criticism
    doc.setFillColor(254, 226, 226);
    doc.rect(margin, yPos, contentWidth, 20, 'F');
    doc.setTextColor(153, 27, 27);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('THE CRITICISM:', margin + 3, yPos + 6);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    const criticismLines = doc.splitTextToSize(lesson.criticism, contentWidth - 8);
    doc.text(criticismLines, margin + 3, yPos + 12);
    yPos += 26;

    // Biblical Response
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('BIBLICAL RESPONSE:', margin, yPos);
    yPos += 6;

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);
    lesson.biblicalResponse.forEach((item, i) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${i + 1}.`, margin + 2, yPos);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(item, contentWidth - 10);
      doc.text(lines, margin + 7, yPos);
      yPos += lines.length * 3.5 + 2;
    });
    yPos += 4;

    // Key Principles
    doc.setFillColor(Math.min(color[0] + 180, 255), Math.min(color[1] + 180, 255), Math.min(color[2] + 180, 255));
    const principlesHeight = 6 + lesson.keyPrinciples.length * 4;
    doc.rect(margin, yPos, contentWidth, principlesHeight, 'F');
    
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('KEY PRINCIPLES:', margin + 3, yPos + 5);
    yPos += 8;

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    lesson.keyPrinciples.forEach((principle) => {
      doc.text(`• ${principle}`, margin + 4, yPos);
      yPos += 4;
    });
    yPos += 6;

    // Sample Response
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('SAMPLE RESPONSE:', margin, yPos);
    yPos += 5;

    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin, yPos + 18);

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    const responseLines = doc.splitTextToSize(lesson.sampleResponse, contentWidth - 6);
    doc.text(responseLines, margin + 3, yPos + 3);
    yPos += Math.max(responseLines.length * 3 + 5, 22);

    // Reflection Questions
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(margin, yPos, contentWidth, 6, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('REFLECTION QUESTIONS:', margin + 3, yPos + 4.5);
    yPos += 10;

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    lesson.reflectionQuestions.forEach((question, i) => {
      doc.text(`${i + 1}. ${question}`, margin + 2, yPos);
      yPos += 5;
    });
  });

  doc.save('proof-framework-complete-lessons.pdf');
};
