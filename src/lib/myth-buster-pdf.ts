import jsPDF from 'jspdf';
import { mythBusterContent, mythCategories } from '@/data/mythBusterContent';

export const generateMythBusterPDF = () => {
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

  const wrapText = (text: string, maxWidth: number, fontSize: number): string[] => {
    doc.setFontSize(fontSize);
    return doc.splitTextToSize(text, maxWidth);
  };

  // Title Page
  doc.setFillColor(139, 69, 19); // Sacred brown color
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('MYTH BUSTER', pageWidth / 2, 30, { align: 'center' });
  doc.setFontSize(16);
  doc.text('Complete Response Guide', pageWidth / 2, 45, { align: 'center' });

  yPosition = 80;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  
  const introText = 'A comprehensive guide for church leaders, parents, and believers navigating conversations about faith and Greek life. Each myth includes the common accusation, a biblical response, and supporting scriptures.';
  const introLines = wrapText(introText, contentWidth, 14);
  introLines.forEach(line => {
    doc.text(line, margin, yPosition);
    yPosition += 7;
  });

  yPosition += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.text('Sacred Greeks Ministry', margin, yPosition);
  yPosition += 6;
  doc.text('www.sacredgreeks.com', margin, yPosition);
  
  yPosition += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Contents:', margin, yPosition);
  yPosition += 10;

  // Table of Contents
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  const categories = mythCategories.filter(c => c.id !== 'all');
  categories.forEach(cat => {
    const count = mythBusterContent.filter(m => m.category === cat.id).length;
    if (count > 0) {
      doc.text(`• ${cat.label} (${count} topics)`, margin + 5, yPosition);
      yPosition += 6;
    }
  });

  // Add myths by category
  categories.forEach(category => {
    const categoryMyths = mythBusterContent.filter(m => m.category === category.id);
    if (categoryMyths.length === 0) return;

    doc.addPage();
    yPosition = margin;

    // Category Header
    doc.setFillColor(139, 69, 19);
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(category.label.toUpperCase(), pageWidth / 2, 16, { align: 'center' });

    yPosition = 40;
    doc.setTextColor(0, 0, 0);

    categoryMyths.forEach((myth, index) => {
      addNewPageIfNeeded(80);

      // Myth number and title
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(139, 69, 19);
      const titleLines = wrapText(`${index + 1}. ${myth.myth}`, contentWidth, 12);
      titleLines.forEach(line => {
        addNewPageIfNeeded(8);
        doc.text(line, margin, yPosition);
        yPosition += 6;
      });

      yPosition += 3;
      doc.setTextColor(0, 0, 0);

      // What They Say
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bolditalic');
      doc.setTextColor(180, 50, 50);
      doc.text('What They Say:', margin, yPosition);
      yPosition += 5;
      
      doc.setFont('helvetica', 'italic');
      const accusationLines = wrapText(`"${myth.shortAnswer}"`, contentWidth - 5, 10);
      accusationLines.forEach(line => {
        addNewPageIfNeeded(6);
        doc.text(line, margin + 5, yPosition);
        yPosition += 5;
      });

      yPosition += 3;

      // Your Response
      doc.setTextColor(34, 139, 34);
      doc.setFont('helvetica', 'bold');
      doc.text('Your Response:', margin, yPosition);
      yPosition += 5;
      
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      const responseLines = wrapText(myth.detailedResponse, contentWidth - 5, 10);
      responseLines.forEach(line => {
        addNewPageIfNeeded(6);
        doc.text(line, margin + 5, yPosition);
        yPosition += 5;
      });

      yPosition += 3;

      // Scriptures
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(139, 69, 19);
      doc.text('Scripture Support:', margin, yPosition);
      yPosition += 5;
      
      doc.setTextColor(0, 0, 0);
      myth.scriptures.forEach(scripture => {
        addNewPageIfNeeded(15);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(scripture.ref, margin + 5, yPosition);
        yPosition += 4;
        
        doc.setFont('helvetica', 'italic');
        const scriptureLines = wrapText(`"${scripture.text}"`, contentWidth - 10, 9);
        scriptureLines.forEach(line => {
          addNewPageIfNeeded(5);
          doc.text(line, margin + 10, yPosition);
          yPosition += 4;
        });
        yPosition += 2;
      });

      yPosition += 8;

      // Divider line
      if (index < categoryMyths.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition - 3, pageWidth - margin, yPosition - 3);
      }
    });
  });

  // Final page
  doc.addPage();
  yPosition = pageHeight / 2 - 30;
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(139, 69, 19);
  doc.text('Sacred Greeks Ministry', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('Equipping believers to navigate Greek life with faith and wisdom.', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  doc.setFontSize(11);
  doc.text('www.sacredgreeks.com', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('For more resources, visit our website or order "Sacred, Not Sinful"', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 30;
  doc.setFontSize(9);
  doc.setTextColor(128, 128, 128);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
  doc.text(`Total: ${mythBusterContent.length} myths covered`, pageWidth / 2, yPosition + 5, { align: 'center' });

  return doc;
};

export const downloadMythBusterPDF = () => {
  const doc = generateMythBusterPDF();
  doc.save('Sacred-Greeks-Myth-Buster-Guide.pdf');
};
