import jsPDF from 'jspdf';

interface ComparisonItem {
  category: string;
  ancientPractice: string;
  modernGreek: string;
  biblicalConnection: string;
}

const comparisonData: ComparisonItem[] = [
  {
    category: "MEMBERSHIP SELECTION",
    ancientPractice: "Candidates recommended by existing guild members; family connections often required; demonstrated skill assessed",
    modernGreek: "Potential new members recommended by actives; rush/recruitment process; character and values assessed",
    biblicalConnection: "Jesus personally called disciples (Mark 1:17); selected based on heart, not status (1 Samuel 16:7)"
  },
  {
    category: "INITIATION PERIOD",
    ancientPractice: "Apprenticeship lasting 3-7 years; progressive skill development; mentorship under master craftsman",
    modernGreek: "New member period (typically 6-10 weeks); progressive learning of history/values; Big/Little mentorship",
    biblicalConnection: "Jesus trained disciples over 3 years; progressive revelation of teachings (Mark 4:33-34)"
  },
  {
    category: "SECRET KNOWLEDGE",
    ancientPractice: "Trade secrets, tool techniques, material formulas revealed gradually as trust built",
    modernGreek: "Ritual, passwords, grips revealed at initiation; organizational secrets protected",
    biblicalConnection: "\"Mysteries of the kingdom\" revealed to disciples (Matthew 13:11); Shibboleth password (Judges 12:6)"
  },
  {
    category: "RECOGNITION SIGNS",
    ancientPractice: "Secret handgrips, passwords, tool marks; Collegia had recognition methods for traveling craftsmen",
    modernGreek: "Handshakes, passwords, hand signs; recognition across chapters nationwide",
    biblicalConnection: "Early Christians used the Ichthys fish symbol; \"peace be with you\" as greeting (John 20:19)"
  },
  {
    category: "HIERARCHY STRUCTURE",
    ancientPractice: "Apprentice → Journeyman → Master; each level had specific responsibilities and privileges",
    modernGreek: "New Member → Active → Alumni; officer positions; executive leadership",
    biblicalConnection: "Jesus established order: Apostles, then 70 disciples, then followers (Luke 10:1)"
  },
  {
    category: "MORAL STANDARDS",
    ancientPractice: "Oath of ethical conduct; quality standards; protection of guild reputation",
    modernGreek: "Oaths/pledges to uphold values; standards of conduct; organizational reputation",
    biblicalConnection: "\"Let your 'Yes' be 'Yes'\" (Matthew 5:37); integrity in work (Colossians 3:23)"
  },
  {
    category: "COMMUNITY SERVICE",
    ancientPractice: "Guilds built public infrastructure; maintained temples and civic buildings; served community needs",
    modernGreek: "Philanthropy requirements; community service hours; supporting charitable causes",
    biblicalConnection: "\"Faith without works is dead\" (James 2:17); serving \"the least of these\" (Matthew 25:40)"
  },
  {
    category: "BROTHERHOOD/SISTERHOOD",
    ancientPractice: "Members called \"brothers\"; mutual aid in sickness/death; shared meals and festivals",
    modernGreek: "Brothers/Sisters terminology; supporting members through challenges; social events and rituals",
    biblicalConnection: "\"Love one another\" (John 13:34-35); early church shared everything (Acts 2:44-45)"
  },
  {
    category: "DUES & FINANCES",
    ancientPractice: "Regular contributions to guild treasury; funds for member welfare and funerals",
    modernGreek: "Chapter dues; national fees; funds for operations and scholarships",
    biblicalConnection: "Tithing principle (Malachi 3:10); early church collections (1 Corinthians 16:2)"
  },
  {
    category: "DISCIPLINE PROCESS",
    ancientPractice: "Fines for poor work; expulsion for serious violations; reputation crucial for employment",
    modernGreek: "Standards boards; probation for violations; suspension/expulsion for serious issues",
    biblicalConnection: "\"If your brother sins, go to him privately\" (Matthew 18:15-17); restoration focus"
  },
  {
    category: "RITUALS & CEREMONIES",
    ancientPractice: "Initiation ceremonies; annual festivals; patron deity observances; funeral rites",
    modernGreek: "Initiation rituals; Founders Day; formal ceremonies; memorial services",
    biblicalConnection: "Passover observance (Luke 22:15); Lord's Supper instituted (1 Corinthians 11:23-26)"
  },
  {
    category: "SYMBOLS & REGALIA",
    ancientPractice: "Guild emblems; ceremonial tools; distinctive dress for masters; branded tool marks",
    modernGreek: "Letters, crests, colors; ceremonial attire; pins and badges; organizational symbols",
    biblicalConnection: "Priestly garments (Exodus 28); armor of God symbolism (Ephesians 6:11-17)"
  }
];

export const generateGuildComparisonPDF = (): void => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  // Title Page
  doc.setFillColor(139, 69, 19);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('Ancient Guild Practices vs.', pageWidth / 2, 50, { align: 'center' });
  doc.text('Modern Greek Organizations', pageWidth / 2, 65, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('A Side-by-Side Comparison for Chapter Education', pageWidth / 2, 85, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('Connecting Historical Traditions to Biblical Foundations', pageWidth / 2, 105, { align: 'center' });

  doc.setFontSize(10);
  doc.text('PROOF Ministries | Reclaiming Greek Life for Christ', pageWidth / 2, pageHeight - 30, { align: 'center' });
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 22, { align: 'center' });

  // Introduction Page
  doc.addPage();
  doc.setFillColor(255, 250, 240);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(139, 69, 19);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Understanding the Connection', margin, 25);

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const introText = [
    'This comparison chart reveals the remarkable parallels between ancient guild practices from',
    'Jesus\'s era and modern Greek-letter organizations. Understanding these connections helps us:',
    '',
    '• Recognize that structured brotherhood/sisterhood has deep historical roots',
    '• See how Jesus and early Christians operated within similar organizational frameworks',
    '• Appreciate that many Greek traditions have precedents in biblical and ancient culture',
    '• Find opportunities to redeem and transform Greek life for Kingdom purposes',
    '',
    'The Roman Collegia (craftsmen guilds) active during Jesus\'s ministry provide the clearest',
    'historical parallel. Jesus himself, trained as a tekton (craftsman/carpenter), would have',
    'been familiar with these guild structures and practices.',
    '',
    'Key Insight: Many practices that seem "secular" in Greek life have spiritual origins or',
    'parallels. This presents an opportunity for redemption rather than rejection.'
  ];

  let yPos = 40;
  introText.forEach(line => {
    doc.text(line, margin, yPos);
    yPos += 7;
  });

  // Column headers setup
  const colWidth = contentWidth / 4;
  const col1X = margin;
  const col2X = margin + colWidth;
  const col3X = margin + (colWidth * 2);
  const col4X = margin + (colWidth * 3);

  // Comparison Pages
  let currentY = 35;
  const rowHeight = 45;
  let itemsOnPage = 0;

  comparisonData.forEach((item, index) => {
    if (itemsOnPage === 0 || currentY + rowHeight > pageHeight - 20) {
      doc.addPage();
      doc.setFillColor(255, 250, 240);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Header
      doc.setFillColor(139, 69, 19);
      doc.rect(margin, 10, contentWidth, 18, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('CATEGORY', col1X + 2, 21);
      doc.text('ANCIENT GUILD PRACTICE', col2X + 2, 21);
      doc.text('MODERN GREEK PRACTICE', col3X + 2, 21);
      doc.text('BIBLICAL CONNECTION', col4X + 2, 21);

      currentY = 35;
      itemsOnPage = 0;
    }

    // Alternating row background
    if (itemsOnPage % 2 === 0) {
      doc.setFillColor(255, 248, 230);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(margin, currentY - 5, contentWidth, rowHeight, 'F');

    // Category column
    doc.setFillColor(205, 133, 63);
    doc.rect(col1X, currentY - 5, colWidth - 2, rowHeight, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    const categoryLines = doc.splitTextToSize(item.category, colWidth - 6);
    doc.text(categoryLines, col1X + 3, currentY + 5);

    // Ancient Practice column
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const ancientLines = doc.splitTextToSize(item.ancientPractice, colWidth - 6);
    doc.text(ancientLines, col2X + 3, currentY + 2);

    // Modern Greek column
    const modernLines = doc.splitTextToSize(item.modernGreek, colWidth - 6);
    doc.text(modernLines, col3X + 3, currentY + 2);

    // Biblical Connection column
    doc.setTextColor(139, 69, 19);
    doc.setFont('helvetica', 'italic');
    const biblicalLines = doc.splitTextToSize(item.biblicalConnection, colWidth - 6);
    doc.text(biblicalLines, col4X + 3, currentY + 2);

    currentY += rowHeight;
    itemsOnPage++;
  });

  // Key Takeaways Page
  doc.addPage();
  doc.setFillColor(139, 69, 19);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Takeaways for Chapter Education', pageWidth / 2, 25, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const takeaways = [
    '1. HISTORICAL LEGITIMACY: Greek organization practices aren\'t modern inventions—they have',
    '   roots stretching back thousands of years to ancient guilds that Jesus himself knew.',
    '',
    '2. BIBLICAL PARALLELS: Many Greek traditions have direct parallels in Scripture, from',
    '   secret passwords (Shibboleth) to hierarchical structures (disciples/apostles).',
    '',
    '3. REDEMPTION OPPORTUNITY: Rather than rejecting Greek life, we can reclaim these ancient',
    '   patterns for their original purpose: building genuine community and serving others.',
    '',
    '4. MENTORSHIP MANDATE: The master-apprentice model was how Jesus trained disciples. Modern',
    '   Big/Little relationships echo this sacred teaching method.',
    '',
    '5. SERVICE CALLING: Ancient guilds built temples and served communities. Greek organizations',
    '   can fulfill the same calling through Christ-centered philanthropy.',
    '',
    '6. BROTHERHOOD REDEFINED: True brotherhood/sisterhood means mutual sacrifice and support—',
    '   exactly what Jesus modeled with his disciples.',
    '',
    '',
    '"There is nothing new under the sun" (Ecclesiastes 1:9)',
    '',
    'What we do with these ancient patterns determines whether they build',
    'the Kingdom of God or simply perpetuate worldly systems.'
  ];

  yPos = 45;
  takeaways.forEach(line => {
    doc.text(line, margin + 10, yPos);
    yPos += 8;
  });

  // Discussion Questions Page
  doc.addPage();
  doc.setFillColor(255, 250, 240);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(139, 69, 19);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Discussion Questions for Chapter Study', margin, 25);

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const questions = [
    '1. Which ancient guild practice surprises you most with its similarity to modern Greek life?',
    '',
    '2. How does knowing Jesus was familiar with guild structures change your perspective on',
    '   Greek organizations?',
    '',
    '3. In what ways has your chapter\'s new member education reflected the master-apprentice',
    '   model? How could it better reflect Jesus\'s discipleship approach?',
    '',
    '4. The ancient guilds used secret knowledge to protect trade skills. What "secrets" do we',
    '   protect, and are they worth protecting for the right reasons?',
    '',
    '5. How can your chapter\'s community service better reflect the ancient guild tradition of',
    '   building infrastructure that serves everyone?',
    '',
    '6. What would it look like if your chapter operated like Jesus\'s band of disciples—with',
    '   the same intimacy, accountability, and mission focus?',
    '',
    '7. How can understanding these historical connections help explain Greek life to skeptics',
    '   (especially Christian skeptics)?',
    '',
    '8. Which modern Greek practice needs the most "redemption" to align with its biblical',
    '   parallel?'
  ];

  yPos = 40;
  questions.forEach(line => {
    doc.text(line, margin, yPos);
    yPos += 8;
  });

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(139, 69, 19);
  doc.text('PROOF Ministries | proofministries.org | Reclaiming Greek Life for Christ', pageWidth / 2, pageHeight - 15, { align: 'center' });

  doc.save('ancient-guild-vs-modern-greek-comparison.pdf');
};
