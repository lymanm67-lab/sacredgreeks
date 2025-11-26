import { jsPDF } from "jspdf";

export type CertificateTheme = 'classic' | 'modern' | 'elegant';

interface CertificateData {
  userName: string;
  assessmentType: string;
  scenario: string;
  completionDate: string;
  theme?: CertificateTheme;
}

export const generateCertificatePDF = (data: CertificateData): jsPDF => {
  const theme = data.theme || 'classic';
  
  if (theme === 'modern') {
    return generateModernCertificate(data);
  } else if (theme === 'elegant') {
    return generateElegantCertificate(data);
  }
  
  return generateClassicCertificate(data);
};

const generateClassicCertificate = (data: CertificateData): jsPDF => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  // Set background gradient (simulated with rectangles)
  doc.setFillColor(139, 92, 246); // Sacred purple
  doc.rect(0, 0, 297, 210, "F");
  
  // Add decorative border
  doc.setLineWidth(2);
  doc.setDrawColor(255, 255, 255);
  doc.rect(10, 10, 277, 190);
  
  // Inner white certificate area
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 20, 257, 170, 5, 5, "F");
  
  // Add decorative elements
  doc.setFillColor(139, 92, 246, 0.1);
  doc.circle(50, 50, 30, "F");
  doc.circle(247, 50, 30, "F");
  doc.circle(50, 160, 30, "F");
  doc.circle(247, 160, 30, "F");
  
  // Title
  doc.setTextColor(139, 92, 246);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("Certificate of Completion", 148.5, 50, { align: "center" });
  
  // Decorative line
  doc.setLineWidth(0.5);
  doc.setDrawColor(139, 92, 246);
  doc.line(108.5, 55, 188.5, 55);
  
  // Body text
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("This certifies that", 148.5, 70, { align: "center" });
  
  // User name
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(data.userName, 148.5, 85, { align: "center" });
  
  // Achievement text
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("has successfully completed the", 148.5, 100, { align: "center" });
  
  // Program name
  doc.setTextColor(99, 102, 241); // Purple-ish
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Sacred Greeks Decision Guide", 148.5, 115, { align: "center" });
  
  // Assessment details
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Assessment Type:", 148.5, 130, { align: "center" });
  
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.assessmentType} - ${data.scenario}`, 148.5, 140, { align: "center" });
  
  // Date
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.text(`Completed on ${data.completionDate}`, 148.5, 165, { align: "center" });
  
  // Footer
  doc.setTextColor(139, 92, 246);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Sacred Greeks Life | sacredgreeks.com", 148.5, 180, { align: "center" });

  return doc;
};

const generateModernCertificate = (data: CertificateData): jsPDF => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  // Bold geometric background
  doc.setFillColor(15, 23, 42); // Slate-900
  doc.rect(0, 0, 297, 210, "F");
  
  // Accent stripe
  doc.setFillColor(99, 102, 241); // Indigo
  doc.rect(0, 0, 297, 40, "F");
  
  // White content area
  doc.setFillColor(255, 255, 255);
  doc.rect(30, 50, 237, 140, "F");
  
  // Geometric corner accents
  doc.setFillColor(139, 92, 246);
  doc.triangle(30, 50, 50, 50, 30, 70, "F");
  doc.triangle(267, 50, 267, 70, 247, 50, "F");
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICATE", 148.5, 25, { align: "center" });
  
  // Body
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text("This certifies that", 148.5, 75, { align: "center" });
  
  // Name
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(99, 102, 241);
  doc.text(data.userName, 148.5, 95, { align: "center" });
  
  // Achievement
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  doc.text("has successfully completed", 148.5, 110, { align: "center" });
  
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text("Sacred Greeks Decision Guide", 148.5, 125, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`${data.assessmentType} - ${data.scenario}`, 148.5, 140, { align: "center" });
  
  // Date bar
  doc.setFillColor(99, 102, 241);
  doc.rect(108.5, 155, 80, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(data.completionDate, 148.5, 164, { align: "center" });
  
  // Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("sacredgreeks.com", 148.5, 180, { align: "center" });

  return doc;
};

const generateElegantCertificate = (data: CertificateData): jsPDF => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  // Cream background
  doc.setFillColor(250, 248, 246);
  doc.rect(0, 0, 297, 210, "F");
  
  // Decorative gold border
  doc.setLineWidth(3);
  doc.setDrawColor(194, 163, 104); // Gold
  doc.rect(15, 15, 267, 180);
  
  doc.setLineWidth(0.5);
  doc.setDrawColor(194, 163, 104);
  doc.rect(20, 20, 257, 170);
  
  // Corner ornaments
  doc.setFillColor(194, 163, 104);
  doc.circle(20, 20, 3, "F");
  doc.circle(277, 20, 3, "F");
  doc.circle(20, 190, 3, "F");
  doc.circle(277, 190, 3, "F");
  
  // Decorative line art
  doc.setLineWidth(0.3);
  doc.setDrawColor(194, 163, 104);
  for (let i = 0; i < 5; i++) {
    doc.line(148.5 - 40 + i * 5, 65, 148.5 - 35 + i * 5, 65);
    doc.line(148.5 - 40 + i * 5, 145, 148.5 - 35 + i * 5, 145);
  }
  
  // Title
  doc.setTextColor(139, 92, 246);
  doc.setFontSize(40);
  doc.setFont("times", "italic");
  doc.text("Certificate of Completion", 148.5, 50, { align: "center" });
  
  // Decorative divider
  doc.setLineWidth(0.5);
  doc.setDrawColor(194, 163, 104);
  doc.line(98.5, 55, 198.5, 55);
  
  // Body
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(14);
  doc.setFont("times", "normal");
  doc.text("This is to certify that", 148.5, 75, { align: "center" });
  
  // Name (elegant script style)
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(30);
  doc.setFont("times", "italic");
  doc.text(data.userName, 148.5, 92, { align: "center" });
  
  // Underline for name
  doc.setLineWidth(0.5);
  doc.setDrawColor(194, 163, 104);
  const nameWidth = doc.getTextWidth(data.userName);
  doc.line(148.5 - nameWidth/2, 95, 148.5 + nameWidth/2, 95);
  
  // Achievement text
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(13);
  doc.setFont("times", "normal");
  doc.text("has honorably completed the", 148.5, 108, { align: "center" });
  
  // Program name
  doc.setTextColor(139, 92, 246);
  doc.setFontSize(22);
  doc.setFont("times", "bold");
  doc.text("Sacred Greeks Decision Guide", 148.5, 123, { align: "center" });
  
  // Assessment details
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(11);
  doc.setFont("times", "italic");
  doc.text(`${data.assessmentType} - ${data.scenario}`, 148.5, 135, { align: "center" });
  
  // Date
  doc.setTextColor(120, 120, 120);
  doc.setFontSize(12);
  doc.setFont("times", "normal");
  doc.text(`Given this ${data.completionDate}`, 148.5, 160, { align: "center" });
  
  // Footer with flourish
  doc.setTextColor(194, 163, 104);
  doc.setFontSize(10);
  doc.setFont("times", "italic");
  doc.text("Sacred Greeks Life | sacredgreeks.com", 148.5, 178, { align: "center" });

  return doc;
};

export const downloadCertificatePDF = (data: CertificateData) => {
  const doc = generateCertificatePDF(data);
  const fileName = `Sacred-Greeks-Certificate-${data.assessmentType.replace(/\s+/g, '-')}.pdf`;
  doc.save(fileName);
};

export const getCertificateDataURL = (data: CertificateData): string => {
  const doc = generateCertificatePDF(data);
  return doc.output('dataurlstring');
};
