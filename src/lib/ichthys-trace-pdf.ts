import jsPDF from 'jspdf';

interface TraceStep {
  step: number;
  title: string;
  description: string;
  instruction: string;
}

const traceSteps: TraceStep[] = [
  {
    step: 1,
    title: 'The Approach',
    description: 'Two strangers meet and extend hands for a normal greeting.',
    instruction: 'Christian A approaches someone they suspect may be a fellow believer. They extend their hand for what appears to be an ordinary handshake. To outsiders, nothing seems unusual.'
  },
  {
    step: 2,
    title: 'First Arc Traced',
    description: 'Person A subtly traces the first curved line in Person B\'s palm.',
    instruction: 'During the handshake, Christian A uses their finger to trace a single curved arc in the other person\'s palm—this represents one half of the ichthys (fish) symbol. The motion is subtle enough to be unnoticed by observers.'
  },
  {
    step: 3,
    title: 'Recognition Test',
    description: 'Person B must recognize the signal and respond correctly.',
    instruction: 'If Person B is a fellow Christian, they recognize the arc as half of the ichthys. They respond by tracing the second curved arc, completing the fish shape in Person A\'s palm. If Person B is not a believer, the arc means nothing and the handshake ends normally.'
  },
  {
    step: 4,
    title: 'The Complete Ichthys',
    description: 'Both arcs together form the complete fish symbol.',
    instruction: 'The two arcs together form the complete ichthys fish. ΙΧΘΥΣ (Ichthys) is a Greek acrostic meaning: Ἰησοῦς (Iesous/Jesus) Χριστός (Christos/Christ) Θεοῦ (Theou/God\'s) Υἱός (Yios/Son) Σωτήρ (Soter/Savior).'
  },
  {
    step: 5,
    title: 'Brotherhood Confirmed',
    description: 'Both parties now know they share the faith.',
    instruction: 'Having confirmed each other as believers through this silent exchange, they could safely share dangerous information: the location of hidden gatherings, the names of church leaders, or the hiding places of sacred texts—information that could mean death if revealed to Roman authorities.'
  }
];

const historicalContext = [
  'During Roman persecution of Christians (1st-3rd centuries AD), believers faced execution for their faith. Public confession was dangerous, requiring covert recognition methods.',
  'The ichthys (fish) became a secret symbol because of its Greek acrostic meaning. Christians could identify each other without verbal disclosure that could endanger both parties.',
  'Church fathers like Tertullian and Clement of Alexandria documented various recognition signals used in the catacombs and secret meetings.',
  'The "tickle palm grip" was particularly ingenious—to outsiders, it appeared as nothing more than an ordinary handshake.'
];

const modernParallels = [
  'Greek organizations use distinctive grips with subtle pressure points, finger positions, or movements that only initiated members recognize.',
  'The structure is identical: a covert physical gesture during a handshake that confirms shared membership.',
  'Both systems serve the purpose of identifying genuine members and authenticating community belonging.',
  'The key insight: Christians who criticize fraternal grips ignore their own historical precedent of the same practice.'
];

export const generateIchthysTracePDF = (): void => {
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

  // Cover/Header Section
  doc.setFillColor(34, 102, 102); // Teal
  doc.rect(0, 0, pageWidth, 50, 'F');

  // Fish symbol illustration (simple)
  doc.setDrawColor(255, 215, 0);
  doc.setLineWidth(2);
  // First arc
  doc.setDrawColor(144, 238, 144); // Light green
  const centerX = pageWidth - 40;
  doc.line(centerX - 15, 25, centerX, 18);
  doc.line(centerX, 18, centerX + 15, 25);
  // Second arc
  doc.setDrawColor(135, 206, 250); // Light blue
  doc.line(centerX - 15, 25, centerX, 32);
  doc.line(centerX, 32, centerX + 15, 25);
  // Eye
  doc.setFillColor(255, 215, 0);
  doc.circle(centerX - 8, 25, 2, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('The Ichthys Fish Trace', margin, 22);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Early Christian Covert Recognition Guide', margin, 32);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('"They gave the right hand of fellowship" — Galatians 2:9', margin, 44);

  // Introduction
  yPos = 60;
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const introText = 'During Roman persecution, early Christians developed covert methods to identify one another. The ichthys trace—a secret handshake using the fish symbol—allowed believers to confirm shared faith without verbal disclosure.';
  const introLines = doc.splitTextToSize(introText, contentWidth);
  doc.text(introLines, margin, yPos);
  yPos += introLines.length * 5 + 10;

  // Step-by-Step Section
  doc.setFillColor(34, 102, 102);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('STEP-BY-STEP TECHNIQUE', margin + 3, yPos + 5.5);
  yPos += 12;

  traceSteps.forEach((step) => {
    // Step number circle
    doc.setFillColor(34, 102, 102);
    doc.circle(margin + 5, yPos + 3, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(step.step.toString(), margin + 3.5, yPos + 4.5);

    // Step title
    doc.setTextColor(34, 102, 102);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(step.title, margin + 12, yPos + 4);

    // Description
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text(step.description, margin + 12, yPos + 9);

    // Instruction
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const instrLines = doc.splitTextToSize(step.instruction, contentWidth - 15);
    doc.text(instrLines, margin + 12, yPos + 14);

    yPos += 14 + (instrLines.length * 4) + 6;
  });

  // Visual Diagram Box
  yPos += 5;
  doc.setFillColor(240, 255, 255);
  doc.rect(margin, yPos, contentWidth, 35, 'F');
  doc.setDrawColor(34, 102, 102);
  doc.rect(margin, yPos, contentWidth, 35, 'S');

  doc.setTextColor(34, 102, 102);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('VISUAL: THE COMPLETED ICHTHYS', margin + 3, yPos + 7);

  // Draw larger fish symbol
  const fishCenterX = pageWidth / 2;
  const fishCenterY = yPos + 22;
  
  doc.setLineWidth(1.5);
  doc.setDrawColor(144, 238, 144); // Green for first arc
  // First arc (curved line)
  doc.line(fishCenterX - 25, fishCenterY, fishCenterX, fishCenterY - 12);
  doc.line(fishCenterX, fishCenterY - 12, fishCenterX + 25, fishCenterY);
  
  doc.setDrawColor(135, 206, 250); // Blue for second arc
  // Second arc
  doc.line(fishCenterX - 25, fishCenterY, fishCenterX, fishCenterY + 12);
  doc.line(fishCenterX, fishCenterY + 12, fishCenterX + 25, fishCenterY);
  
  // Eye
  doc.setFillColor(34, 102, 102);
  doc.circle(fishCenterX - 15, fishCenterY, 3, 'F');

  // Labels
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('First arc (Person A)', fishCenterX - 45, fishCenterY - 8);
  doc.text('Second arc (Person B)', fishCenterX - 45, fishCenterY + 12);
  doc.text('ΙΧΘΥΣ', fishCenterX + 30, fishCenterY);

  // Page 2 - Historical Context & Modern Parallels
  doc.addPage();
  yPos = margin;

  // Historical Context Header
  doc.setFillColor(139, 69, 19);
  doc.rect(0, 0, pageWidth, 25, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Historical Context', margin, 17);

  yPos = 35;

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  historicalContext.forEach((paragraph) => {
    const lines = doc.splitTextToSize(`• ${paragraph}`, contentWidth - 5);
    doc.text(lines, margin, yPos);
    yPos += lines.length * 5 + 4;
  });

  // The Ichthys Acrostic Box
  yPos += 8;
  doc.setFillColor(255, 248, 230);
  doc.rect(margin, yPos, contentWidth, 40, 'F');
  doc.setDrawColor(205, 133, 63);
  doc.rect(margin, yPos, contentWidth, 40, 'S');

  doc.setTextColor(139, 69, 19);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('THE ICHTHYS (ΙΧΘΥΣ) ACROSTIC', margin + 3, yPos + 8);

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const acrostic = [
    'Ι (Iota) = Ἰησοῦς (Iesous) = Jesus',
    'Χ (Chi) = Χριστός (Christos) = Christ',
    'Θ (Theta) = Θεοῦ (Theou) = God\'s',
    'Υ (Upsilon) = Υἱός (Yios) = Son',
    'Σ (Sigma) = Σωτήρ (Soter) = Savior'
  ];
  acrostic.forEach((line, i) => {
    doc.text(line, margin + 5, yPos + 16 + (i * 5));
  });

  // Modern Parallels Section
  yPos += 50;
  doc.setFillColor(34, 102, 102);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('MODERN PARALLELS: GREEK ORGANIZATION GRIPS', margin + 3, yPos + 5.5);
  yPos += 14;

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  modernParallels.forEach((point) => {
    const lines = doc.splitTextToSize(`• ${point}`, contentWidth - 5);
    doc.text(lines, margin, yPos);
    yPos += lines.length * 4.5 + 3;
  });

  // Key Insight Box
  yPos += 10;
  doc.setFillColor(34, 102, 102);
  doc.rect(margin, yPos, contentWidth, 25, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('KEY INSIGHT', margin + 5, yPos + 8);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const keyInsight = 'The structure of recognition practices—physical gesture + symbolic meaning—was established in the earliest Christian communities. Greek organizations using similar structures employ a pattern with biblical precedent.';
  const insightLines = doc.splitTextToSize(keyInsight, contentWidth - 10);
  doc.text(insightLines, margin + 5, yPos + 14);

  // Scripture References
  yPos += 35;
  doc.setTextColor(139, 69, 19);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('SCRIPTURE REFERENCES', margin, yPos);
  yPos += 6;

  doc.setTextColor(80, 80, 80);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('• Galatians 2:9 — "They gave the right hand of fellowship to Barnabas and me."', margin, yPos);
  yPos += 5;
  doc.text('• Acts 2:44-46 — Believers met secretly in homes for fellowship and breaking of bread.', margin, yPos);
  yPos += 5;
  doc.text('• Hebrews 10:25 — "Not neglecting to meet together, as is the habit of some."', margin, yPos);

  // Footer
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text('PROOF Ministries | sacredgreeks.lovable.app | Reclaiming Greek Life for Christ', pageWidth / 2, pageHeight - 10, { align: 'center' });

  doc.save('ichthys-fish-trace-guide.pdf');
};
