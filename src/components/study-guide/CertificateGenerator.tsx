import { jsPDF } from "jspdf";
import { format } from "date-fns";

interface CertificateData {
  userName: string;
  completionDate: string;
}

export const generateCertificate = ({ userName, completionDate }: CertificateData) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background and border
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  
  // Outer border
  doc.setDrawColor(139, 92, 246); // Sacred purple
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Inner border
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Decorative corner elements
  const cornerSize = 15;
  doc.setFillColor(139, 92, 246);
  // Top left corner
  doc.circle(15, 15, 3, "F");
  // Top right corner
  doc.circle(pageWidth - 15, 15, 3, "F");
  // Bottom left corner
  doc.circle(15, pageHeight - 15, 3, "F");
  // Bottom right corner
  doc.circle(pageWidth - 15, pageHeight - 15, 3, "F");

  // Title
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(139, 92, 246);
  doc.text("Certificate of Completion", pageWidth / 2, 40, { align: "center" });

  // Subtitle
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("This certifies that", pageWidth / 2, 55, { align: "center" });

  // User name
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(userName, pageWidth / 2, 75, { align: "center" });

  // Achievement text
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("has successfully completed all five sessions of the", pageWidth / 2, 90, { align: "center" });

  // Program name
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(139, 92, 246);
  doc.text("Sacred, Not Sinful Study Guide", pageWidth / 2, 105, { align: "center" });

  // Description
  doc.setFontSize(12);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(80, 80, 80);
  doc.text("A comprehensive biblical journey exploring faith and Greek life", pageWidth / 2, 115, { align: "center" });

  // Sessions completed box
  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(pageWidth / 2 - 50, 125, 100, 20, 3, 3, "FD");
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  doc.text("Sessions Completed: 5/5", pageWidth / 2, 133, { align: "center" });
  doc.text("Study Hours: 10+ hours", pageWidth / 2, 140, { align: "center" });

  // Date section
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  const formattedDate = format(new Date(completionDate), "MMMM dd, yyyy");
  doc.text(`Completion Date: ${formattedDate}`, pageWidth / 2, 160, { align: "center" });

  // Signature section
  const signatureY = pageHeight - 50;
  
  // Signature line and label (left side)
  doc.setLineWidth(0.5);
  doc.setDrawColor(100, 100, 100);
  doc.line(40, signatureY, 100, signatureY);
  
  // Digital signature text
  doc.setFontSize(18);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(139, 92, 246);
  doc.text("Dr. Lyman", 70, signatureY - 5, { align: "center" });
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("Dr. Lyman, Author", 70, signatureY + 5, { align: "center" });
  doc.text("Sacred, Not Sinful", 70, signatureY + 10, { align: "center" });

  // Date line and label (right side)
  doc.line(pageWidth - 100, signatureY, pageWidth - 40, signatureY);
  doc.text(formattedDate, pageWidth - 70, signatureY - 5, { align: "center" });
  doc.text("Date", pageWidth - 70, signatureY + 5, { align: "center" });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("SacredGreeks.com | Based on Sacred, Not Sinful by Dr. Lyman", pageWidth / 2, pageHeight - 15, { align: "center" });

  // Certificate ID (for authenticity)
  const certificateId = `SG-${Date.now().toString(36).toUpperCase()}`;
  doc.setFontSize(7);
  doc.text(`Certificate ID: ${certificateId}`, pageWidth / 2, pageHeight - 10, { align: "center" });

  return doc;
};

export const downloadCertificate = (userName: string, completionDate: string) => {
  const doc = generateCertificate({ userName, completionDate });
  const fileName = `Sacred-Greeks-Certificate-${userName.replace(/\s+/g, "-")}.pdf`;
  doc.save(fileName);
};
