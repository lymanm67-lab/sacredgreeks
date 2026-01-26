import jsPDF from "jspdf";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1780s",
    title: "Free African Society Founded",
    description: "Richard Allen and Absalom Jones establish one of the first African American mutual aid societies in Philadelphia, providing burial assistance and support for widows."
  },
  {
    year: "1787",
    title: "Prince Hall Freemasonry Established",
    description: "African Lodge No. 459 receives its charter from the Grand Lodge of England, providing Black men with fraternal benefits denied by white lodges."
  },
  {
    year: "1808",
    title: "African Benevolent Societies Grow",
    description: "Multiple mutual aid societies form across Northern cities, offering sick benefits, burial insurance, and emergency loans to African American communities."
  },
  {
    year: "1830s",
    title: "Burial Associations Formalize",
    description: "African American burial associations become widespread, ensuring dignified burials when white funeral homes and cemeteries refused service."
  },
  {
    year: "1843",
    title: "Grand United Order of Odd Fellows",
    description: "Peter Ogden establishes the first African American Odd Fellows lodge, providing insurance benefits and fraternal support."
  },
  {
    year: "1864",
    title: "Knights of Pythias (Colored)",
    description: "Separate Black chapters form when white lodges exclude African Americans, continuing the tradition of fraternal mutual aid."
  },
  {
    year: "1868",
    title: "Grand United Order of True Reformers",
    description: "William Washington Browne establishes one of the most successful African American fraternal benefit societies in Richmond, VA."
  },
  {
    year: "1898",
    title: "North Carolina Mutual Life",
    description: "John Merrick and associates found what would become the largest Black-owned insurance company, growing from fraternal society roots."
  },
  {
    year: "1900",
    title: "2 Million+ Members in Black Fraternal Orders",
    description: "African American fraternal organizations reach peak membership, providing essential financial services denied by mainstream institutions."
  },
  {
    year: "1906",
    title: "Alpha Phi Alpha Founded",
    description: "The first African American intercollegiate Greek-letter fraternity is established at Cornell University, adapting fraternal traditions for the academic setting."
  },
  {
    year: "1908",
    title: "Alpha Kappa Alpha Founded",
    description: "The first African American sorority is established at Howard University, extending Greek-letter organization traditions to women."
  },
  {
    year: "1911",
    title: "Kappa Alpha Psi & Omega Psi Phi Founded",
    description: "Two more fraternities emerge, continuing the adaptation of fraternal mutual aid traditions into Greek-letter organizations."
  },
  {
    year: "1913",
    title: "Delta Sigma Theta Founded",
    description: "Delta Sigma Theta Sorority is established at Howard University with a focus on public service and social action."
  },
  {
    year: "1914",
    title: "Phi Beta Sigma Founded",
    description: "Phi Beta Sigma Fraternity emphasizes 'Culture for Service, Service for Humanity' at Howard University."
  },
  {
    year: "1920",
    title: "Zeta Phi Beta Founded",
    description: "Zeta Phi Beta becomes the first sorority to be constitutionally bound to a fraternity (Phi Beta Sigma)."
  },
  {
    year: "1922",
    title: "Sigma Gamma Rho Founded",
    description: "The only NPHC sorority founded at a predominantly white institution (Butler University) is established."
  },
  {
    year: "1930",
    title: "National Pan-Hellenic Council Formed",
    description: "The NPHC unifies the nine largest historically African American Greek-letter organizations."
  },
  {
    year: "1963",
    title: "Iota Phi Theta Founded",
    description: "Iota Phi Theta completes the Divine Nine at Morgan State University, emphasizing community service and scholarship."
  }
];

export const generateEconomicHistoryPDF = (): void => {
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

  // Cover Page
  doc.setFillColor(139, 69, 19); // Brown
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(255, 215, 0); // Gold
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('The Economic History', pageWidth / 2, 60, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('of African American', pageWidth / 2, 75, { align: 'center' });
  doc.text('Fraternal Organizations', pageWidth / 2, 88, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('From Mutual Aid Societies', pageWidth / 2, 115, { align: 'center' });
  doc.text('to Modern Greek Life', pageWidth / 2, 128, { align: 'center' });

  // Key Stats Box
  doc.setFillColor(255, 215, 0);
  doc.rect(margin + 20, 150, contentWidth - 40, 45, 'F');
  
  doc.setTextColor(139, 69, 19);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('WHY DID AFRICAN AMERICANS JOIN FRATERNAL LODGES?', pageWidth / 2, 160, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const reasons = [
    '• White insurance companies refused to sell life insurance to Black Americans',
    '• When policies were offered, premiums were 30-50% higher with reduced benefits',
    '• Fraternal orders provided burial insurance, sick pay, and emergency loans',
    '• These organizations offered the only path to financial security for many families'
  ];
  let reasonY = 170;
  reasons.forEach(reason => {
    doc.text(reason, pageWidth / 2, reasonY, { align: 'center' });
    reasonY += 6;
  });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('Understanding this history is essential to understanding', pageWidth / 2, 210, { align: 'center' });
  doc.text('why Black Greek Letter Organizations exist today.', pageWidth / 2, 220, { align: 'center' });

  doc.setFontSize(9);
  doc.text('Sacred Greeks™', pageWidth / 2, pageHeight - 25, { align: 'center' });
  doc.text('sacredgreeks.lovable.app', pageWidth / 2, pageHeight - 17, { align: 'center' });

  // Timeline Pages
  doc.addPage();
  yPos = margin;

  // Page Header
  doc.setFillColor(139, 69, 19);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setTextColor(255, 215, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Historical Timeline: Mutual Aid to Greek Life', pageWidth / 2, 15, { align: 'center' });
  
  yPos = 35;

  // Timeline entries
  timelineEvents.forEach((event, index) => {
    // Check if we need a new page
    if (yPos > pageHeight - 40) {
      doc.addPage();
      
      // Page header for continuation
      doc.setFillColor(139, 69, 19);
      doc.rect(0, 0, pageWidth, 25, 'F');
      doc.setTextColor(255, 215, 0);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Historical Timeline (continued)', pageWidth / 2, 15, { align: 'center' });
      
      yPos = 35;
    }

    // Year badge
    doc.setFillColor(139, 69, 19);
    doc.rect(margin, yPos, 25, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(event.year, margin + 12.5, yPos + 5.5, { align: 'center' });

    // Title
    doc.setTextColor(139, 69, 19);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(event.title, margin + 28, yPos + 5.5);

    yPos += 10;

    // Description
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(event.description, contentWidth - 30);
    doc.text(descLines, margin + 5, yPos);
    yPos += descLines.length * 3.5 + 6;

    // Timeline line
    if (index < timelineEvents.length - 1) {
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(margin + 12.5, yPos - 4, margin + 12.5, yPos + 2);
    }
  });

  // Summary Page
  doc.addPage();
  yPos = margin;

  doc.setFillColor(139, 69, 19);
  doc.rect(0, 0, pageWidth, pageHeight * 0.4, 'F');

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Takeaways', pageWidth / 2, 30, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  const takeaways = [
    '1. African Americans joined fraternal lodges primarily for economic survival,\n   not ritual or secrecy.',
    '2. Mutual aid societies provided essential services denied by white institutions:\n   burial insurance, sick benefits, widow funds, and emergency loans.',
    '3. By 1900, over 2 million African Americans were members of fraternal orders.',
    '4. Black Greek Letter Organizations adapted these fraternal traditions\n   for the collegiate setting.',
    '5. The Divine Nine continue this legacy through scholarship programs,\n   community service, and mutual support.'
  ];

  yPos = 50;
  takeaways.forEach(takeaway => {
    doc.text(takeaway, margin + 10, yPos);
    yPos += 18;
  });

  // Quote section
  yPos = pageHeight * 0.45;
  doc.setTextColor(139, 69, 19);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.text('"Having Masonic founders doesn\'t make us Masonic', pageWidth / 2, yPos, { align: 'center' });
  doc.text('any more than having Baptist founders makes an', pageWidth / 2, yPos + 8, { align: 'center' });
  doc.text('organization a church."', pageWidth / 2, yPos + 16, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('— P.R.O.O.F. Framework', pageWidth / 2, yPos + 28, { align: 'center' });

  // Call to action
  yPos = pageHeight - 60;
  doc.setFillColor(255, 215, 0);
  doc.rect(margin, yPos, contentWidth, 35, 'F');
  
  doc.setTextColor(139, 69, 19);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Use This Information', pageWidth / 2, yPos + 10, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('When critics claim Greek organizations are "Masonic" or have suspicious origins,', pageWidth / 2, yPos + 20, { align: 'center' });
  doc.text('remind them of the economic context that made these organizations necessary.', pageWidth / 2, yPos + 28, { align: 'center' });

  // Footer
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text('Sacred Greeks™ | sacredgreeks.lovable.app | Reclaiming Greek Life for Christ', pageWidth / 2, pageHeight - 12, { align: 'center' });

  doc.save('economic-history-african-american-fraternal-organizations.pdf');
};
