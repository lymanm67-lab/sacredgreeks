import jsPDF from 'jspdf';
import { 
  GUILD_OATHS, 
  GUILD_HANDSHAKES, 
  GUILD_PHRASES, 
  GUILD_RITUALS,
  WORKSHEET_QUESTIONS 
} from '@/data/guildPracticesContent';

export const generateGuildWorksheetPDF = (): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = margin;

  const addNewPageIfNeeded = (requiredSpace: number = 30) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  const drawLine = (y: number) => {
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
  };

  const addWritingLines = (count: number) => {
    for (let i = 0; i < count; i++) {
      yPos += 12;
      addNewPageIfNeeded(15);
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.3);
      doc.line(margin, yPos, pageWidth - margin, yPos);
    }
    yPos += 8;
  };

  // Title Page
  doc.setFillColor(139, 69, 19);
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('ANCIENT GUILD PRACTICES', pageWidth / 2, 25, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Study Worksheet: Oaths, Handshakes, Phrases & Rituals', pageWidth / 2, 40, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text('SacredGreeks.com | Chapter Education Resource', pageWidth / 2, 52, { align: 'center' });

  yPos = 75;
  doc.setTextColor(0, 0, 0);
  
  // Introduction
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Purpose of This Worksheet', margin, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const introText = 'This worksheet explores historical guild practices to provide context for modern fraternal organizations. Ancient trade guilds used oaths, secret handshakes, passwords, and rituals for practical purposes—not occult worship. Understanding this history helps Christians evaluate organizational practices with wisdom and discernment.';
  const introLines = doc.splitTextToSize(introText, contentWidth);
  doc.text(introLines, margin, yPos);
  yPos += introLines.length * 5 + 10;

  // Key Principle Box
  doc.setFillColor(245, 245, 220);
  doc.rect(margin, yPos, contentWidth, 25, 'F');
  doc.setDrawColor(139, 69, 19);
  doc.setLineWidth(1);
  doc.rect(margin, yPos, contentWidth, 25, 'S');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('KEY PRINCIPLE', margin + 5, yPos + 8);
  doc.setFont('helvetica', 'normal');
  const keyPrinciple = 'Jesus condemned idolatry, not organization. He confronted misplaced worship, not structure. There is no Gospel account of Jesus condemning trade guilds or structured communities—He lived inside them for 18 years.';
  const principleLines = doc.splitTextToSize(keyPrinciple, contentWidth - 10);
  doc.text(principleLines, margin + 5, yPos + 15);
  yPos += 35;

  // Section 1: Sample Oaths
  doc.addPage();
  yPos = margin;
  
  doc.setFillColor(70, 130, 180);
  doc.rect(margin, yPos, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION 1: SAMPLE GUILD OATHS', margin + 5, yPos + 8);
  yPos += 20;
  doc.setTextColor(0, 0, 0);

  GUILD_OATHS.forEach((oath, index) => {
    addNewPageIfNeeded(60);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${oath.title}`, margin, yPos);
    yPos += 7;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    const contextLines = doc.splitTextToSize(oath.historicalContext, contentWidth);
    doc.text(contextLines, margin, yPos);
    yPos += contextLines.length * 4 + 4;
    
    doc.setFont('helvetica', 'normal');
    doc.setFillColor(250, 250, 250);
    const exampleLines = doc.splitTextToSize(oath.example, contentWidth - 10);
    const boxHeight = exampleLines.length * 4 + 8;
    doc.rect(margin, yPos, contentWidth, boxHeight, 'F');
    doc.text(exampleLines, margin + 5, yPos + 6);
    yPos += boxHeight + 5;
    
    if (oath.biblicalConnection) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text(`Scripture: ${oath.biblicalConnection}`, margin, yPos);
      yPos += 10;
      doc.setTextColor(0, 0, 0);
    }
  });

  // Section 2: Secret Handshakes
  doc.addPage();
  yPos = margin;
  
  doc.setFillColor(34, 139, 34);
  doc.rect(margin, yPos, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION 2: SECRET HANDSHAKES & GRIPS', margin + 5, yPos + 8);
  yPos += 20;
  doc.setTextColor(0, 0, 0);

  GUILD_HANDSHAKES.forEach((handshake, index) => {
    addNewPageIfNeeded(55);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${handshake.title}`, margin, yPos);
    yPos += 7;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    const contextLines = doc.splitTextToSize(handshake.historicalContext, contentWidth);
    doc.text(contextLines, margin, yPos);
    yPos += contextLines.length * 4 + 4;
    
    doc.setFont('helvetica', 'normal');
    doc.setFillColor(250, 250, 250);
    const exampleLines = doc.splitTextToSize(handshake.example, contentWidth - 10);
    const boxHeight = exampleLines.length * 4 + 8;
    doc.rect(margin, yPos, contentWidth, boxHeight, 'F');
    doc.text(exampleLines, margin + 5, yPos + 6);
    yPos += boxHeight + 5;
    
    if (handshake.modernParallel) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text(`Modern Parallel: ${handshake.modernParallel}`, margin, yPos);
      yPos += 10;
      doc.setTextColor(0, 0, 0);
    }
  });

  // Section 3: Secret Phrases
  doc.addPage();
  yPos = margin;
  
  doc.setFillColor(148, 0, 211);
  doc.rect(margin, yPos, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION 3: SECRET PHRASES & PASSWORDS', margin + 5, yPos + 8);
  yPos += 20;
  doc.setTextColor(0, 0, 0);

  GUILD_PHRASES.forEach((phrase, index) => {
    addNewPageIfNeeded(55);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${phrase.title}`, margin, yPos);
    yPos += 7;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    const contextLines = doc.splitTextToSize(phrase.historicalContext, contentWidth);
    doc.text(contextLines, margin, yPos);
    yPos += contextLines.length * 4 + 4;
    
    doc.setFont('helvetica', 'normal');
    doc.setFillColor(250, 250, 250);
    const exampleLines = doc.splitTextToSize(phrase.example, contentWidth - 10);
    const boxHeight = exampleLines.length * 4 + 8;
    doc.rect(margin, yPos, contentWidth, boxHeight, 'F');
    doc.text(exampleLines, margin + 5, yPos + 6);
    yPos += boxHeight + 5;
    
    if (phrase.biblicalConnection) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text(`Scripture: ${phrase.biblicalConnection}`, margin, yPos);
      yPos += 10;
      doc.setTextColor(0, 0, 0);
    }
  });

  // Section 4: Rituals
  doc.addPage();
  yPos = margin;
  
  doc.setFillColor(255, 140, 0);
  doc.rect(margin, yPos, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION 4: GUILD RITUALS & CEREMONIES', margin + 5, yPos + 8);
  yPos += 20;
  doc.setTextColor(0, 0, 0);

  GUILD_RITUALS.forEach((ritual, index) => {
    addNewPageIfNeeded(70);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${ritual.title}`, margin, yPos);
    yPos += 7;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    const contextLines = doc.splitTextToSize(ritual.historicalContext, contentWidth);
    doc.text(contextLines, margin, yPos);
    yPos += contextLines.length * 4 + 4;
    
    doc.setFont('helvetica', 'normal');
    doc.setFillColor(250, 250, 250);
    const exampleLines = doc.splitTextToSize(ritual.example, contentWidth - 10);
    const boxHeight = exampleLines.length * 4 + 8;
    doc.rect(margin, yPos, contentWidth, boxHeight, 'F');
    doc.text(exampleLines, margin + 5, yPos + 6);
    yPos += boxHeight + 5;
    
    if (ritual.biblicalConnection) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      const bcLines = doc.splitTextToSize(`Biblical Parallel: ${ritual.biblicalConnection}`, contentWidth);
      doc.text(bcLines, margin, yPos);
      yPos += bcLines.length * 4 + 5;
      doc.setTextColor(0, 0, 0);
    }
    
    if (ritual.modernParallel) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text(`Modern Parallel: ${ritual.modernParallel}`, margin, yPos);
      yPos += 10;
      doc.setTextColor(0, 0, 0);
    }
  });

  // Worksheet Section
  doc.addPage();
  yPos = margin;
  
  doc.setFillColor(139, 69, 19);
  doc.rect(margin, yPos, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('REFLECTION QUESTIONS', margin + 5, yPos + 8);
  yPos += 20;
  doc.setTextColor(0, 0, 0);

  WORKSHEET_QUESTIONS.reflection.forEach((question, index) => {
    addNewPageIfNeeded(45);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${question}`, margin, yPos, { maxWidth: contentWidth });
    const questionLines = doc.splitTextToSize(`${index + 1}. ${question}`, contentWidth);
    yPos += questionLines.length * 5 + 3;
    
    addWritingLines(3);
  });

  // Application Questions
  doc.addPage();
  yPos = margin;
  
  doc.setFillColor(34, 139, 34);
  doc.rect(margin, yPos, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('APPLICATION QUESTIONS', margin + 5, yPos + 8);
  yPos += 20;
  doc.setTextColor(0, 0, 0);

  WORKSHEET_QUESTIONS.application.forEach((question, index) => {
    addNewPageIfNeeded(45);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${question}`, margin, yPos, { maxWidth: contentWidth });
    const questionLines = doc.splitTextToSize(`${index + 1}. ${question}`, contentWidth);
    yPos += questionLines.length * 5 + 3;
    
    addWritingLines(3);
  });

  // Group Discussion
  doc.addPage();
  yPos = margin;
  
  doc.setFillColor(70, 130, 180);
  doc.rect(margin, yPos, contentWidth, 12, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('GROUP DISCUSSION QUESTIONS', margin + 5, yPos + 8);
  yPos += 20;
  doc.setTextColor(0, 0, 0);

  WORKSHEET_QUESTIONS.groupDiscussion.forEach((question, index) => {
    addNewPageIfNeeded(35);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${question}`, margin, yPos, { maxWidth: contentWidth });
    const questionLines = doc.splitTextToSize(`${index + 1}. ${question}`, contentWidth);
    yPos += questionLines.length * 5 + 8;
  });

  // Footer on last page
  yPos = pageHeight - 30;
  drawLine(yPos);
  yPos += 10;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Sacred Greeks | Faith-Based Greek Life Resources', pageWidth / 2, yPos, { align: 'center' });
  doc.text('SacredGreeks.com', pageWidth / 2, yPos + 5, { align: 'center' });

  doc.save('Ancient-Guild-Practices-Worksheet.pdf');
};
