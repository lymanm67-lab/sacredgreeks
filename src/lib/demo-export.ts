import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ExportOptions {
  filename?: string;
  title?: string;
  format?: 'pdf' | 'png' | 'jpeg';
  quality?: number;
}

export async function captureElementAsImage(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<string> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
  });
  
  const format = options.format === 'jpeg' ? 'image/jpeg' : 'image/png';
  return canvas.toDataURL(format, options.quality || 0.95);
}

export async function exportToPDF(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const { filename = 'demo-comparison', title = 'Demo Scenario Comparison' } = options;
  
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
  });
  
  const imgData = canvas.toDataURL('image/png');
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  
  // Calculate PDF dimensions (A4 landscape or portrait based on aspect ratio)
  const aspectRatio = imgWidth / imgHeight;
  let pdfWidth: number;
  let pdfHeight: number;
  let orientation: 'l' | 'p';
  
  if (aspectRatio > 1) {
    orientation = 'l';
    pdfWidth = 297; // A4 landscape width in mm
    pdfHeight = pdfWidth / aspectRatio;
  } else {
    orientation = 'p';
    pdfHeight = 297; // A4 portrait height in mm
    pdfWidth = pdfHeight * aspectRatio;
  }
  
  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: 'a4',
  });
  
  // Add title
  pdf.setFontSize(20);
  pdf.setTextColor(40, 40, 40);
  pdf.text(title, 14, 20);
  
  // Add timestamp
  pdf.setFontSize(10);
  pdf.setTextColor(128, 128, 128);
  pdf.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
  
  // Add the captured image
  const yOffset = 35;
  const maxWidth = orientation === 'l' ? 270 : 180;
  const maxHeight = orientation === 'l' ? 160 : 230;
  
  let finalWidth = maxWidth;
  let finalHeight = finalWidth / aspectRatio;
  
  if (finalHeight > maxHeight) {
    finalHeight = maxHeight;
    finalWidth = finalHeight * aspectRatio;
  }
  
  pdf.addImage(imgData, 'PNG', 14, yOffset, finalWidth, finalHeight);
  
  pdf.save(`${filename}.pdf`);
}

export async function exportToImage(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const { filename = 'demo-comparison', format = 'png' } = options;
  
  const dataUrl = await captureElementAsImage(element, options);
  
  // Create download link
  const link = document.createElement('a');
  link.download = `${filename}.${format}`;
  link.href = dataUrl;
  link.click();
}

export function copyImageToClipboard(dataUrl: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function generateShareableImageUrl(dataUrl: string): string {
  // In a real app, you'd upload to a storage service
  // For now, we'll return the data URL (limited use case)
  return dataUrl;
}
