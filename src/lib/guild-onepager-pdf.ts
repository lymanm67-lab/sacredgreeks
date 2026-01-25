import jsPDF from 'jspdf';

interface ComparisonRow {
  feature: string;
  ancientGuild: string;
  modernGreek: string;
  scripture: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: "Membership",
    ancientGuild: "Apprenticeship under master; demonstrated skill; acceptance by members",
    modernGreek: "Rush/recruitment; character assessment; member recommendation",
    scripture: "Mark 1:17 • 1 Sam 16:7"
  },
  {
    feature: "Initiation",
    ancientGuild: "Progression: Apprentice → Journeyman → Master",
    modernGreek: "New Member → Active → Alumni; officer advancement",
    scripture: "Mark 4:33-34 • Luke 10:1"
  },
  {
    feature: "Mentorship",
    ancientGuild: "Master craftsman trains apprentice over years",
    modernGreek: "Big/Little relationships; progressive education",
    scripture: "Proverbs 27:17 • 2 Tim 2:2"
  },
  {
    feature: "Oaths",
    ancientGuild: "Professional integrity pledges; trade standards",
    modernGreek: "Values pledges; standards of conduct",
    scripture: "Matthew 5:37 • Col 3:23"
  },
  {
    feature: "Recognition",
    ancientGuild: "Secret handgrips; passwords; trade marks",
    modernGreek: "Handshakes; passwords; hand signs",
    scripture: "Judges 12:6 • John 20:19"
  },
  {
    feature: "Brotherhood",
    ancientGuild: "Members called 'brothers'; mutual aid; shared meals",
    modernGreek: "Brothers/Sisters; mutual support; social events",
    scripture: "John 13:34-35 • Acts 2:44-45"
  },
  {
    feature: "Service",
    ancientGuild: "Built public infrastructure; served community",
    modernGreek: "Philanthropy requirements; community service",
    scripture: "James 2:17 • Matt 25:40"
  },
  {
    feature: "Symbols",
    ancientGuild: "Guild emblems; ceremonial tools; distinctive dress",
    modernGreek: "Letters; crests; colors; pins and badges",
    scripture: "Exodus 28 • Eph 6:11-17"
  }
];

export const generateGuildOnePagerPDF = (): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const contentWidth = pageWidth - (margin * 2);

  // Header Banner
  doc.setFillColor(139, 69, 19);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Ancient Guilds vs. Modern Greek Organizations', pageWidth / 2, 15, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('A One-Page Comparison with Scripture References', pageWidth / 2, 24, { align: 'center' });

  doc.setFontSize(8);
  doc.text('Jesus (τέκτων/carpenter) and Paul (tentmaker) participated in guild-organized trades', pageWidth / 2, 31, { align: 'center' });

  // Introduction Box
  let yPos = 42;
  doc.setFillColor(255, 248, 230);
  doc.rect(margin, yPos, contentWidth, 22, 'F');
  doc.setDrawColor(205, 133, 63);
  doc.rect(margin, yPos, contentWidth, 22, 'S');

  doc.setTextColor(139, 69, 19);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('KEY INSIGHT', margin + 3, yPos + 6);

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const introText = 'In the first century Mediterranean world, skilled trades were organized through craft guilds—associations that functioned much like modern fraternities. These structures were familiar, neutral, and widely accepted. While Christians rejected idolatrous worship tied to some guilds, the organizational structure itself was embraced.';
  const introLines = doc.splitTextToSize(introText, contentWidth - 6);
  doc.text(introLines, margin + 3, yPos + 12);

  // Table Header
  yPos = 68;
  const colWidths = [28, 50, 50, 55];
  const col1X = margin;
  const col2X = margin + colWidths[0];
  const col3X = col2X + colWidths[1];
  const col4X = col3X + colWidths[2];

  doc.setFillColor(139, 69, 19);
  doc.rect(margin, yPos, contentWidth, 8, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('FEATURE', col1X + 2, yPos + 5.5);
  doc.text('ANCIENT GUILD', col2X + 2, yPos + 5.5);
  doc.text('MODERN GREEK', col3X + 2, yPos + 5.5);
  doc.text('SCRIPTURE', col4X + 2, yPos + 5.5);

  // Table Rows
  yPos = 76;
  const rowHeight = 16;

  comparisonRows.forEach((row, index) => {
    // Alternating background
    if (index % 2 === 0) {
      doc.setFillColor(255, 250, 240);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.rect(margin, yPos, contentWidth, rowHeight, 'F');

    // Feature column (highlighted)
    doc.setFillColor(205, 133, 63);
    doc.rect(col1X, yPos, colWidths[0] - 1, rowHeight, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(row.feature.toUpperCase(), col1X + 2, yPos + 5);

    // Ancient Guild column
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    const ancientLines = doc.splitTextToSize(row.ancientGuild, colWidths[1] - 4);
    doc.text(ancientLines, col2X + 2, yPos + 4);

    // Modern Greek column
    const modernLines = doc.splitTextToSize(row.modernGreek, colWidths[2] - 4);
    doc.text(modernLines, col3X + 2, yPos + 4);

    // Scripture column
    doc.setTextColor(139, 69, 19);
    doc.setFont('helvetica', 'italic');
    const scriptureLines = doc.splitTextToSize(row.scripture, colWidths[3] - 4);
    doc.text(scriptureLines, col4X + 2, yPos + 4);

    yPos += rowHeight;
  });

  // Theological Anchor Box
  yPos += 5;
  doc.setFillColor(139, 69, 19);
  doc.rect(margin, yPos, contentWidth, 28, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('THEOLOGICAL ANCHOR POINT', margin + 3, yPos + 7);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const anchorText = [
    '• Jesus condemned idolatry, not organization. He confronted misplaced worship, not structure.',
    '• There is no Gospel account of Jesus condemning trade guilds, apprenticeship systems, or structured communities.',
    '• What Scripture judges is worship, not membership. Pagan cults are religious systems; BGLOs are voluntary cultural organizations.'
  ];
  anchorText.forEach((line, i) => {
    doc.text(line, margin + 3, yPos + 13 + (i * 5));
  });

  // Bottom Section - Two Columns
  yPos += 33;
  const halfWidth = (contentWidth - 4) / 2;

  // Left: Jesus as Master Carpenter
  doc.setFillColor(255, 248, 230);
  doc.rect(margin, yPos, halfWidth, 38, 'F');
  doc.setDrawColor(205, 133, 63);
  doc.rect(margin, yPos, halfWidth, 38, 'S');

  doc.setTextColor(139, 69, 19);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('JESUS AS MASTER CARPENTER', margin + 3, yPos + 6);

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  const jesusText = [
    '• Identified as τέκτων (tekton) - skilled craftsman',
    '• Trained under Joseph through apprenticeship',
    '• Endured years of submission before ministry',
    '• Learned obedience through discipline (Heb 5:8)',
    '• Formed brotherhood with fellow apprentices',
    '• Tested on precision, reliability, integrity'
  ];
  jesusText.forEach((line, i) => {
    doc.text(line, margin + 3, yPos + 12 + (i * 4.5));
  });

  // Right: Application for Today
  doc.setFillColor(255, 248, 230);
  doc.rect(margin + halfWidth + 4, yPos, halfWidth, 38, 'F');
  doc.setDrawColor(205, 133, 63);
  doc.rect(margin + halfWidth + 4, yPos, halfWidth, 38, 'S');

  doc.setTextColor(139, 69, 19);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('APPLICATION FOR TODAY', margin + halfWidth + 7, yPos + 6);

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  const applicationText = [
    '• Structure & ritual are not inherently sinful',
    '• Brotherhood formation predates Greek letters',
    '• Mentorship echoes Jesus\'s discipleship model',
    '• Oaths of integrity align with biblical values',
    '• Community service fulfills faith-in-action',
    '• Redemption, not rejection, is the goal'
  ];
  applicationText.forEach((line, i) => {
    doc.text(line, margin + halfWidth + 7, yPos + 12 + (i * 4.5));
  });

  // Footer
  doc.setTextColor(139, 69, 19);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('"There is nothing new under the sun" — Ecclesiastes 1:9', pageWidth / 2, pageHeight - 18, { align: 'center' });

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('PROOF Ministries | sacredgreeks.lovable.app | Reclaiming Greek Life for Christ', pageWidth / 2, pageHeight - 12, { align: 'center' });

  doc.save('ancient-guilds-modern-greek-one-pager.pdf');
};
