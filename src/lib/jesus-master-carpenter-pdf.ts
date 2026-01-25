import jsPDF from 'jspdf';

interface JourneyStage {
  title: string;
  years: string;
  guildFeatures: string[];
  biblicalParallels: string[];
  jesusConnection: string;
}

const journeyStages: JourneyStage[] = [
  {
    title: "APPRENTICE",
    years: "Years 1-3 (Age 12-15)",
    guildFeatures: [
      "Long-term apprenticeship under authority",
      "Submission to instruction and correction",
      "Periods of silence and observation",
      "Living and working closely with others",
      "Learning through repetition and discipline",
      "Accountability to the master craftsman"
    ],
    biblicalParallels: [
      "Luke 2:51-52 - Jesus was obedient and grew in wisdom",
      "Matthew 4:19-20 - Disciples left everything to follow their Master"
    ],
    jesusConnection: "As an apprentice carpenter, Jesus would have experienced years of silent observation, repetitive practice, and correction—preparing Him for His later ministry."
  },
  {
    title: "JOURNEYMAN",
    years: "Years 4-7 (Age 16-22)",
    guildFeatures: [
      "Demonstrating mastery through tested skill",
      "Traveling to learn from multiple masters",
      "Building reputation through quality work",
      "Teaching younger apprentices",
      "Networking within the guild system",
      "Developing signature techniques"
    ],
    biblicalParallels: [
      "Luke 10:1 - The 70 were sent to practice their skills",
      "Galatians 1:17-18 - Paul spent years in development"
    ],
    jesusConnection: "By His late teens/early twenties, Jesus would have been a journeyman craftsman—capable, respected locally, and building His reputation."
  },
  {
    title: "MASTER",
    years: "Year 7+ (Age 23-30)",
    guildFeatures: [
      "Full recognition by the guild",
      "Ability to train apprentices",
      "Upholding the reputation of the trade",
      "Community evaluation of readiness",
      "Responsibility for quality standards",
      "Leadership within the guild structure"
    ],
    biblicalParallels: [
      "Luke 3:23 - Jesus began ministry at 30",
      "Matthew 28:19-20 - Jesus commissioned disciples to train others"
    ],
    jesusConnection: "Jesus the Master Craftsman spent ~18 years in the guild system before beginning His public ministry at 30—the age of full maturity."
  }
];

const guildComparison = [
  {
    feature: "Membership Requirements",
    ancient: "Completion of apprenticeship, demonstrated skill, acceptance by existing members",
    modern: "Intake process, demonstrated character, acceptance by chapter",
    biblical: "Jesus trained the Twelve for three years before commissioning them"
  },
  {
    feature: "Initiation & Advancement",
    ancient: "Formal entry after training, progression from apprentice to master",
    modern: "Crossing ceremony, progression from neo to active to grad",
    biblical: "Spiritual growth from 'babes in Christ' to mature believers (Hebrews 5:12-14)"
  },
  {
    feature: "Ethical Standards",
    ancient: "Expectations for honesty, accountability to fellow members",
    modern: "Chapter standards, accountability structures, codes of conduct",
    biblical: "The 'one another' commands in Scripture (love, serve, encourage)"
  },
  {
    feature: "Oaths & Pledges",
    ancient: "Commitments to uphold trade standards and loyalty to fellow craftsmen",
    modern: "Pledges to organizational values and brotherhood/sisterhood",
    biblical: "Professional oaths, not worship acts—integrity commitments (Matthew 5:37)"
  },
  {
    feature: "Rituals & Symbolism",
    ancient: "Ceremonies marking advancement, tools/symbols of the craft",
    modern: "Initiation ceremonies, Greek letters, organizational symbols",
    biblical: "Baptism, communion, ordination—ceremonial milestones"
  },
  {
    feature: "Signs of Recognition",
    ancient: "Trade-specific terminology, gestures identifying membership",
    modern: "Handshakes, calls, hand signs, paraphernalia",
    biblical: "Practical identification, not mystical—early church used Ichthys fish"
  },
  {
    feature: "Mutual Support",
    ancient: "Assistance during illness, burial support, collective advocacy",
    modern: "Supporting members through challenges, scholarship funds",
    biblical: "Early church shared everything (Acts 2:44-45)"
  }
];

export const generateJesusMasterCarpenterPDF = (): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  // ============ TITLE PAGE ============
  doc.setFillColor(139, 90, 43); // Warm brown
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('Jesus the Master Carpenter', pageWidth / 2, 50, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('Historical & Cultural Context of Guild Membership', pageWidth / 2, 65, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('How Jesus and Paul Navigated Structured Organizations', pageWidth / 2, 85, { align: 'center' });

  // Guild Journey Visual
  doc.setFontSize(10);
  doc.text('THE APPRENTICESHIP JOURNEY', pageWidth / 2, 110, { align: 'center' });
  
  // Simple journey diagram
  const boxWidth = 50;
  const boxHeight = 25;
  const startX = margin + 10;
  const boxY = 120;
  
  // Apprentice box
  doc.setFillColor(100, 149, 237); // Blue
  doc.roundedRect(startX, boxY, boxWidth, boxHeight, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('APPRENTICE', startX + boxWidth/2, boxY + 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Years 1-3', startX + boxWidth/2, boxY + 18, { align: 'center' });

  // Arrow
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(1);
  doc.line(startX + boxWidth + 5, boxY + boxHeight/2, startX + boxWidth + 15, boxY + boxHeight/2);
  
  // Journeyman box
  doc.setFillColor(218, 165, 32); // Gold
  doc.roundedRect(startX + boxWidth + 20, boxY, boxWidth, boxHeight, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('JOURNEYMAN', startX + boxWidth + 20 + boxWidth/2, boxY + 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Years 4-7', startX + boxWidth + 20 + boxWidth/2, boxY + 18, { align: 'center' });

  // Arrow
  doc.line(startX + boxWidth*2 + 25, boxY + boxHeight/2, startX + boxWidth*2 + 35, boxY + boxHeight/2);
  
  // Master box
  doc.setFillColor(128, 0, 128); // Purple
  doc.roundedRect(startX + boxWidth*2 + 40, boxY, boxWidth, boxHeight, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('MASTER', startX + boxWidth*2 + 40 + boxWidth/2, boxY + 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Year 7+', startX + boxWidth*2 + 40 + boxWidth/2, boxY + 18, { align: 'center' });

  // Key Scripture
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('"Is not this the carpenter?" — Mark 6:3', pageWidth / 2, 165, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('Sacred Greeks Ministry', pageWidth / 2, pageHeight - 30, { align: 'center' });
  doc.setFontSize(8);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 22, { align: 'center' });

  // ============ PAGE 2: HISTORICAL CONTEXT ============
  doc.addPage();
  doc.setFillColor(255, 250, 240);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(139, 69, 19);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Jesus as a Tekton (τέκτων)', margin, 25);

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const introLines = [
    'Scripture identifies Jesus as a tekton—a skilled craftsman, not a casual laborer. That implies',
    'formal training, likely beginning as an apprentice under Joseph around age 12.',
    '',
    'In the ancient world, this process would have included:',
  ];

  let yPos = 40;
  introLines.forEach(line => {
    doc.text(line, margin, yPos);
    yPos += 6;
  });

  // Apprentice requirements
  const requirements = [
    '• Long-term apprenticeship under authority',
    '• Submission to instruction and correction',
    '• Periods of silence and observation',
    '• Living and working closely with others',
    '• Demonstrating mastery through tested skill',
    '• Upholding the reputation of the trade'
  ];

  yPos += 2;
  doc.setFontSize(9);
  requirements.forEach(req => {
    doc.text(req, margin + 5, yPos);
    yPos += 5;
  });

  yPos += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Challenges Jesus Would Have Faced as an Apprentice', margin, yPos);
  
  yPos += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const challenges = [
    '• Enduring years without independent recognition',
    '• Obedience before leadership',
    '• Learning through repetition and discipline',
    '• Patience in unseen labor',
    '• Accountability to a master craftsman',
    '• Community evaluation of readiness'
  ];
  
  challenges.forEach(challenge => {
    doc.text(challenge, margin + 5, yPos);
    yPos += 5;
  });

  yPos += 5;
  doc.setFillColor(139, 69, 19);
  doc.setDrawColor(139, 69, 19);
  doc.rect(margin, yPos, contentWidth, 0.5, 'F');
  
  yPos += 8;
  doc.setTextColor(139, 69, 19);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('None of these contradict the character of Christ. In fact, they align with Philippians 2,', margin, yPos);
  yPos += 5;
  doc.text('where Christ "made himself nothing," submits, learns obedience, and grows.', margin, yPos);

  // Brotherhood section
  yPos += 15;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Brotherhood Formation in Apprenticeship', margin, yPos);
  
  yPos += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const brotherhood = [
    'Apprentices did not train alone. They formed brotherhoods of:',
    '   • Shared meals and workspaces',
    '   • Shared instruction under masters',
    '   • Shared responsibility for quality',
    '   • Mutual accountability and support',
    '',
    'This is structurally similar to fraternal development—without worship.'
  ];
  
  brotherhood.forEach(line => {
    doc.text(line, margin, yPos);
    yPos += 5;
  });

  // ============ PAGE 3: GUILD COMPARISON ============
  doc.addPage();
  doc.setFillColor(255, 250, 240);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(139, 69, 19);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Ancient Guilds vs. Modern Greek Organizations', margin, 20);

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.text('A Side-by-Side Comparison with Biblical Connections', margin, 28);

  yPos = 38;
  const colWidth = contentWidth / 3 - 2;

  guildComparison.forEach((item, index) => {
    if (yPos > pageHeight - 50) {
      doc.addPage();
      doc.setFillColor(255, 250, 240);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      yPos = 25;
    }

    // Feature header
    doc.setFillColor(139, 90, 43);
    doc.roundedRect(margin, yPos, contentWidth, 8, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(item.feature, margin + 3, yPos + 5.5);

    yPos += 12;
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    // Three columns
    const col1X = margin;
    const col2X = margin + colWidth + 4;
    const col3X = margin + (colWidth + 4) * 2;

    // Column headers
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 149, 237);
    doc.text('Ancient Guild', col1X, yPos);
    doc.setTextColor(218, 165, 32);
    doc.text('Modern Greek', col2X, yPos);
    doc.setTextColor(128, 0, 128);
    doc.text('Biblical Connection', col3X, yPos);

    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(7);

    // Wrap text for each column
    const wrapText = (text: string, maxWidth: number): string[] => {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      words.forEach(word => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (doc.getTextWidth(testLine) > maxWidth) {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
      return lines;
    };

    const ancientLines = wrapText(item.ancient, colWidth - 5);
    const modernLines = wrapText(item.modern, colWidth - 5);
    const biblicalLines = wrapText(item.biblical, colWidth - 5);

    const maxLines = Math.max(ancientLines.length, modernLines.length, biblicalLines.length);
    
    for (let i = 0; i < maxLines; i++) {
      if (ancientLines[i]) doc.text(ancientLines[i], col1X, yPos);
      if (modernLines[i]) doc.text(modernLines[i], col2X, yPos);
      if (biblicalLines[i]) doc.text(biblicalLines[i], col3X, yPos);
      yPos += 4;
    }

    yPos += 6;
  });

  // ============ PAGE 4: THEOLOGICAL ANCHOR ============
  doc.addPage();
  doc.setFillColor(139, 90, 43);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Theological Anchor Point', pageWidth / 2, 40, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  const anchorPoints = [
    { text: 'Jesus condemned idolatry,', bold: 'not organization.' },
    { text: 'He confronted misplaced worship,', bold: 'not structure.' },
    { text: 'He opposed false devotion,', bold: 'not disciplined brotherhood.' }
  ];

  yPos = 70;
  anchorPoints.forEach(point => {
    doc.setFont('helvetica', 'normal');
    doc.text(point.text, pageWidth / 2 - 50, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text(point.bold, pageWidth / 2 + 30, yPos);
    yPos += 12;
  });

  yPos += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'italic');
  const conclusion = [
    'There is no Gospel account of Jesus condemning trade guilds,',
    'apprenticeship systems, or structured communities.',
    '',
    'He lived inside them.'
  ];
  
  conclusion.forEach(line => {
    doc.text(line, pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;
  });

  // Bottom line box
  yPos += 20;
  doc.setFillColor(255, 215, 0);
  doc.roundedRect(margin, yPos, contentWidth, 50, 5, 5, 'F');
  
  doc.setTextColor(139, 69, 19);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('THE BOTTOM LINE', pageWidth / 2, yPos + 12, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const bottomLine = [
    'Pagan cults are religious systems and were rightly rejected.',
    'BGLOs are voluntary, cultural organizations.',
    'Ancient guilds prove that structure, ritual, and brotherhood are not sinful.',
    'What Scripture judges is worship, not membership.'
  ];
  
  let blY = yPos + 22;
  bottomLine.forEach(line => {
    doc.text(line, pageWidth / 2, blY, { align: 'center' });
    blY += 6;
  });

  // Scripture footer
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('"And because he was of the same trade, he stayed and worked with them"', pageWidth / 2, pageHeight - 35, { align: 'center' });
  doc.text('— Acts 18:3 (Paul the Tentmaker)', pageWidth / 2, pageHeight - 28, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Sacred Greeks Ministry | sacredgreeks.lovable.app', pageWidth / 2, pageHeight - 15, { align: 'center' });

  doc.save('Jesus-Master-Carpenter-Guild-Guide.pdf');
};
