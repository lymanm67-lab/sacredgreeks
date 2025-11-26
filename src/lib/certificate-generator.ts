import { jsPDF } from "jspdf";

interface CertificateData {
  userName: string;
  assessmentType: string;
  scenario: string;
  completionDate: string;
}

export const generateCertificatePDF = (data: CertificateData): jsPDF => {
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

export const downloadCertificatePDF = (data: CertificateData) => {
  const doc = generateCertificatePDF(data);
  const fileName = `Sacred-Greeks-Certificate-${data.assessmentType.replace(/\s+/g, '-')}.pdf`;
  doc.save(fileName);
};

export const getCertificateDataURL = (data: CertificateData): string => {
  const doc = generateCertificatePDF(data);
  return doc.output('dataurlstring');
};
