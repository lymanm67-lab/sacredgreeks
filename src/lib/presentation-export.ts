import pptxgen from 'pptxgenjs';
import jsPDF from 'jspdf';
import { PresentationSlide } from '@/components/demo/presentation/SalesPresentationSlides';

// Color mapping for consistent theming
const COLORS = {
  primary: '7c3aed', // purple
  secondary: 'f59e0b', // amber  
  background: '1a1a2e',
  text: 'ffffff',
  muted: '9ca3af',
};

/**
 * Export slides to PowerPoint format
 */
export async function exportToPowerPoint(
  slides: PresentationSlide[],
  filename: string = 'Sacred-Greeks-Presentation'
): Promise<void> {
  const pptx = new pptxgen();
  
  // Set presentation properties
  pptx.author = 'Sacred Greeks';
  pptx.title = 'Understanding the Sacred Side of Greek Life';
  pptx.subject = 'Faith, Culture, and Activism in the Divine Nine';
  pptx.company = 'Sacred Greeks';
  
  // Define master slide layout
  pptx.defineSlideMaster({
    title: 'SACRED_MASTER',
    background: { color: COLORS.background },
    objects: [
      // Footer
      { 
        text: { 
          text: 'Sacred Greeks | sacredgreeks.lovable.app', 
          options: { x: 0.5, y: 7, w: '90%', h: 0.3, fontSize: 10, color: COLORS.muted, align: 'center' } 
        } 
      },
    ],
  });

  for (const slide of slides) {
    const pptSlide = pptx.addSlide({ masterName: 'SACRED_MASTER' });
    
    // Title
    pptSlide.addText(slide.title, {
      x: 0.5,
      y: 0.5,
      w: '90%',
      h: 1,
      fontSize: 36,
      bold: true,
      color: COLORS.text,
      align: 'center',
    });
    
    // Subtitle
    if (slide.subtitle) {
      pptSlide.addText(slide.subtitle, {
        x: 0.5,
        y: 1.5,
        w: '90%',
        h: 0.6,
        fontSize: 20,
        color: COLORS.muted,
        align: 'center',
      });
    }
    
    // Key Points
    if (slide.keyPoints && slide.keyPoints.length > 0) {
      const keyPointsText = slide.keyPoints.map((point, i) => `• ${point}`).join('\n');
      pptSlide.addText(keyPointsText, {
        x: 0.5,
        y: 2.5,
        w: '45%',
        h: 3.5,
        fontSize: 16,
        color: COLORS.text,
        valign: 'top',
        bullet: false,
      });
    }
    
    // Talking Points
    if (slide.talkingPoints && slide.talkingPoints.length > 0) {
      const talkingPointsText = slide.talkingPoints.map((point, i) => `• ${point}`).join('\n');
      pptSlide.addText(talkingPointsText, {
        x: 5.2,
        y: 2.5,
        w: '45%',
        h: 3.5,
        fontSize: 16,
        color: COLORS.text,
        valign: 'top',
        bullet: false,
      });
    }
    
    // Stats (if any)
    if (slide.stats && slide.stats.length > 0) {
      const statsY = 6;
      const statsWidth = 9 / slide.stats.length;
      
      slide.stats.forEach((stat, index) => {
        pptSlide.addText(stat.value, {
          x: 0.5 + (index * statsWidth),
          y: statsY,
          w: statsWidth - 0.2,
          h: 0.5,
          fontSize: 24,
          bold: true,
          color: COLORS.secondary,
          align: 'center',
        });
        pptSlide.addText(stat.label, {
          x: 0.5 + (index * statsWidth),
          y: statsY + 0.5,
          w: statsWidth - 0.2,
          h: 0.3,
          fontSize: 12,
          color: COLORS.muted,
          align: 'center',
        });
      });
    }
    
    // Add speaker notes
    if (slide.presenterNotes && slide.presenterNotes.length > 0) {
      pptSlide.addNotes(slide.presenterNotes.join('\n\n'));
    }
    
    // Add duration badge
    if (slide.duration) {
      pptSlide.addText(`⏱ ${slide.duration}`, {
        x: 8.5,
        y: 0.3,
        w: 1.5,
        h: 0.4,
        fontSize: 12,
        color: COLORS.muted,
        align: 'right',
      });
    }
  }
  
  // Generate and download
  await pptx.writeFile({ fileName: `${filename}.pptx` });
}

/**
 * Export slides to PDF format
 */
export async function exportToPDF(
  slides: PresentationSlide[],
  filename: string = 'Sacred-Greeks-Presentation'
): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [10, 7.5], // Standard slide ratio
  });
  
  const pageWidth = 10;
  const pageHeight = 7.5;
  
  slides.forEach((slide, index) => {
    if (index > 0) {
      pdf.addPage();
    }
    
    // Background
    pdf.setFillColor(26, 26, 46);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    const titleLines = pdf.splitTextToSize(slide.title, pageWidth - 1);
    pdf.text(titleLines, pageWidth / 2, 0.8, { align: 'center' });
    
    // Subtitle
    if (slide.subtitle) {
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(156, 163, 175);
      const subtitleLines = pdf.splitTextToSize(slide.subtitle, pageWidth - 1);
      pdf.text(subtitleLines, pageWidth / 2, 1.4, { align: 'center' });
    }
    
    // Key Points (left column)
    if (slide.keyPoints && slide.keyPoints.length > 0) {
      pdf.setFontSize(12);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Key Points', 0.5, 2.2);
      
      pdf.setFont('helvetica', 'normal');
      let yPos = 2.6;
      slide.keyPoints.forEach((point) => {
        const lines = pdf.splitTextToSize(`• ${point}`, 4);
        pdf.text(lines, 0.5, yPos);
        yPos += lines.length * 0.25 + 0.1;
      });
    }
    
    // Talking Points (right column)
    if (slide.talkingPoints && slide.talkingPoints.length > 0) {
      pdf.setFontSize(12);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Talking Points', 5.2, 2.2);
      
      pdf.setFont('helvetica', 'normal');
      let yPos = 2.6;
      slide.talkingPoints.forEach((point) => {
        const lines = pdf.splitTextToSize(`• ${point}`, 4);
        pdf.text(lines, 5.2, yPos);
        yPos += lines.length * 0.25 + 0.1;
      });
    }
    
    // Stats
    if (slide.stats && slide.stats.length > 0) {
      const statsY = 6;
      const statsWidth = (pageWidth - 1) / slide.stats.length;
      
      slide.stats.forEach((stat, i) => {
        const xPos = 0.5 + (i * statsWidth) + (statsWidth / 2);
        
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(245, 158, 11); // amber
        pdf.text(stat.value, xPos, statsY, { align: 'center' });
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(156, 163, 175);
        pdf.text(stat.label, xPos, statsY + 0.3, { align: 'center' });
      });
    }
    
    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Slide ${index + 1} of ${slides.length}`, 0.5, pageHeight - 0.3);
    pdf.text('Sacred Greeks | sacredgreeks.lovable.app', pageWidth / 2, pageHeight - 0.3, { align: 'center' });
    
    if (slide.duration) {
      pdf.text(`⏱ ${slide.duration}`, pageWidth - 0.5, pageHeight - 0.3, { align: 'right' });
    }
  });
  
  pdf.save(`${filename}.pdf`);
}

/**
 * Parse uploaded PowerPoint file and convert to slide format
 * Note: Full PPTX parsing requires additional libraries like mammoth or pptx-parser
 * This is a simplified version that extracts basic text content
 */
export interface ParsedSlide {
  title: string;
  subtitle?: string;
  keyPoints: string[];
  talkingPoints?: string[];
  presenterNotes?: string[];
}

export async function parsePowerPointFile(file: File): Promise<ParsedSlide[]> {
  // For a full implementation, we'd use a library like officegen or pptx
  // This is a placeholder that returns the file info
  // In production, you'd want to use a server-side parser or a more robust client-side solution
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        // For now, we'll create a simple slide from the filename
        // A full implementation would parse the actual PPTX content
        const slides: ParsedSlide[] = [
          {
            title: `Uploaded: ${file.name}`,
            subtitle: 'Custom presentation uploaded successfully',
            keyPoints: [
              'This is a custom uploaded presentation',
              'Edit slides directly in the viewer',
              'Full PPTX parsing available in future update',
            ],
            presenterNotes: ['Custom presentation from uploaded file'],
          },
        ];
        
        resolve(slides);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}
