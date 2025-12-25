import jsPDF from "jspdf";
import { studyGuideSessions } from "@/sacredGreeksContent";

export const generateStudyGuidePDF = () => {
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

  const addText = (text: string, fontSize: number, isBold: boolean = false, color: [number, number, number] = [0, 0, 0]) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setTextColor(color[0], color[1], color[2]);
    
    const lines = doc.splitTextToSize(text, contentWidth);
    const lineHeight = fontSize * 0.5;
    
    addNewPageIfNeeded(lines.length * lineHeight + 5);
    
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * lineHeight + 3;
  };

  const addSectionHeader = (text: string) => {
    addNewPageIfNeeded(15);
    doc.setFillColor(139, 92, 246); // Sacred purple color
    doc.rect(margin - 5, yPosition - 5, contentWidth + 10, 12, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(text, margin, yPosition + 3);
    yPosition += 15;
  };

  // Cover Page
  doc.setFillColor(139, 92, 246);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("Sacred, Not Sinful", pageWidth / 2, 80, { align: "center" });
  
  doc.setFontSize(24);
  doc.setFont("helvetica", "normal");
  doc.text("Study Guide", pageWidth / 2, 100, { align: "center" });
  
  doc.setFontSize(14);
  doc.text("A 5-Session Guide for Christians", pageWidth / 2, 130, { align: "center" });
  doc.text("Navigating Faith & Greek Life", pageWidth / 2, 145, { align: "center" });
  
  doc.setFontSize(12);
  doc.text("By Dr. Lyman A. Montgomery III", pageWidth / 2, 180, { align: "center" });
  
  doc.setFontSize(10);
  doc.text("Sacred Greeks™", pageWidth / 2, 250, { align: "center" });
  doc.text("www.sacredgreeks.com", pageWidth / 2, 260, { align: "center" });

  // Table of Contents
  doc.addPage();
  yPosition = margin;
  
  doc.setTextColor(139, 92, 246);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Table of Contents", margin, yPosition);
  yPosition += 20;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  
  studyGuideSessions.forEach((session, index) => {
    doc.text(`Session ${session.id}: ${session.title.replace(`Session ${session.id}: `, "")}`, margin, yPosition);
    doc.text(`Page ${index + 3}`, pageWidth - margin - 20, yPosition);
    yPosition += 10;
  });

  yPosition += 10;
  doc.text("How to Use This Guide", margin, yPosition);
  yPosition += 20;

  doc.setFontSize(11);
  const howToUse = [
    "• Personal Study: Work through one session per week, journaling your answers.",
    "• Small Groups: Discuss questions together and share insights.",
    "• Chapter Discussions: Use during chapter meetings or retreats.",
    "• One-on-One: Go through with a mentor or accountability partner."
  ];
  
  howToUse.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 8;
  });

  // Sessions
  studyGuideSessions.forEach((session) => {
    doc.addPage();
    yPosition = margin;

    // Session Title
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 0, pageWidth, 50, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    const titleLines = doc.splitTextToSize(session.title, contentWidth);
    doc.text(titleLines, margin, 25);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.text(`Theme: ${session.theme}`, margin, 42);
    
    yPosition = 60;

    // Key Scriptures
    doc.setTextColor(139, 92, 246);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Key Scriptures: " + session.scriptures.join(" | "), margin, yPosition);
    yPosition += 15;

    // Teaching Content
    addSectionHeader("Teaching Content");
    doc.setTextColor(60, 60, 60);
    
    const teachingParagraphs = session.teaching.split("\n\n");
    teachingParagraphs.forEach(paragraph => {
      addText(paragraph, 10, false, [60, 60, 60]);
      yPosition += 3;
    });
    
    yPosition += 5;

    // Discussion Questions
    addSectionHeader("Discussion Questions");
    
    session.questions.forEach((question, qIndex) => {
      addNewPageIfNeeded(35);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      
      const questionText = `${qIndex + 1}. ${question}?`;
      const questionLines = doc.splitTextToSize(questionText, contentWidth);
      doc.text(questionLines, margin, yPosition);
      yPosition += questionLines.length * 5 + 3;
      
      // Answer box
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, yPosition, contentWidth, 20, "FD");
      
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(150, 150, 150);
      doc.text("Your answer:", margin + 3, yPosition + 5);
      
      yPosition += 25;
    });

    // Action Step
    addNewPageIfNeeded(40);
    addSectionHeader("Action Step");
    
    doc.setFillColor(139, 92, 246, 0.1);
    doc.setDrawColor(139, 92, 246);
    
    const actionLines = doc.splitTextToSize(session.actionStep, contentWidth - 10);
    const actionBoxHeight = actionLines.length * 5 + 15;
    
    doc.setFillColor(245, 240, 255);
    doc.rect(margin, yPosition, contentWidth, actionBoxHeight, "FD");
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(139, 92, 246);
    doc.text("This Week's Challenge:", margin + 5, yPosition + 8);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(actionLines, margin + 5, yPosition + 16);
    
    yPosition += actionBoxHeight + 10;

    // Notes Section
    addNewPageIfNeeded(50);
    addSectionHeader("Personal Notes");
    
    doc.setDrawColor(200, 200, 200);
    for (let i = 0; i < 6; i++) {
      doc.line(margin, yPosition + i * 10, pageWidth - margin, yPosition + i * 10);
    }
    yPosition += 60;

    // Read More Note
    if (yPosition < pageHeight - 30) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(139, 92, 246);
      doc.text(session.readMoreNote.replace("tap here to explore coaching with Dr. Lyman.", "visit sacredgreeks.com for coaching."), margin, pageHeight - 15);
    }
  });

  // Final Page
  doc.addPage();
  yPosition = margin;

  doc.setFillColor(139, 92, 246);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Continue Your Journey", pageWidth / 2, 60, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  const closingLines = [
    "Thank you for completing this study guide!",
    "",
    "For more resources, coaching, and community:",
    "",
    "Visit: www.sacredgreeks.com",
    "",
    "Get the Book: Sacred, Not Sinful on Amazon",
    "",
    "Listen: Sacred Greeks Podcast",
    "",
    "Connect: @sacredgreeks on social media"
  ];
  
  let closingY = 100;
  closingLines.forEach(line => {
    doc.text(line, pageWidth / 2, closingY, { align: "center" });
    closingY += 12;
  });
  
  doc.setFontSize(10);
  doc.text("© Sacred Greeks™. All Rights Reserved.", pageWidth / 2, 250, { align: "center" });

  // Save the PDF
  doc.save("Sacred-Not-Sinful-Study-Guide.pdf");
};
