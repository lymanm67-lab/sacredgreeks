import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ExportOptions {
  filename?: string;
  title?: string;
  format?: 'pdf' | 'png' | 'jpeg';
  quality?: number;
  includeWatermark?: boolean;
}

const WATERMARK_TEXT = "Sacred Greeks™ - Proprietary & Confidential";
const WATERMARK_SUBTEXT = "© " + new Date().getFullYear() + " Dr. Lyman Montgomery. All Rights Reserved.";

function addWatermarkToCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Save current state
  ctx.save();

  // Semi-transparent watermark
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';

  // Diagonal watermark pattern
  const text = WATERMARK_TEXT;
  const diagonalSpacing = 300;
  
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-Math.PI / 6); // 30 degrees

  for (let y = -canvas.height; y < canvas.height * 2; y += diagonalSpacing) {
    for (let x = -canvas.width; x < canvas.width * 2; x += diagonalSpacing) {
      ctx.fillText(text, x, y);
    }
  }

  ctx.restore();

  // Add corner watermark (more visible)
  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = '#666666';
  ctx.font = '12px Arial';
  ctx.textAlign = 'right';
  ctx.fillText(WATERMARK_TEXT, canvas.width - 20, canvas.height - 40);
  ctx.fillText(WATERMARK_SUBTEXT, canvas.width - 20, canvas.height - 20);
  ctx.restore();

  return canvas;
}

export async function captureElementAsImage(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<string> {
  let canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
  });
  
  // Add watermark by default
  if (options.includeWatermark !== false) {
    canvas = addWatermarkToCanvas(canvas);
  }
  
  const format = options.format === 'jpeg' ? 'image/jpeg' : 'image/png';
  return canvas.toDataURL(format, options.quality || 0.95);
}

export async function exportToPDF(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const { filename = 'demo-comparison', title = 'Demo Scenario Comparison' } = options;
  
  let canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
  });
  
  // Add watermark by default
  if (options.includeWatermark !== false) {
    canvas = addWatermarkToCanvas(canvas);
  }
  
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
  
  // Add proprietary header
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text('PROPRIETARY & CONFIDENTIAL - Sacred Greeks™', 14, 10);
  
  // Add title
  pdf.setFontSize(20);
  pdf.setTextColor(40, 40, 40);
  pdf.text(title, 14, 22);
  
  // Add timestamp
  pdf.setFontSize(10);
  pdf.setTextColor(128, 128, 128);
  pdf.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
  
  // Add the captured image
  const yOffset = 38;
  const maxWidth = orientation === 'l' ? 270 : 180;
  const maxHeight = orientation === 'l' ? 150 : 220;
  
  let finalWidth = maxWidth;
  let finalHeight = finalWidth / aspectRatio;
  
  if (finalHeight > maxHeight) {
    finalHeight = maxHeight;
    finalWidth = finalHeight * aspectRatio;
  }
  
  pdf.addImage(imgData, 'PNG', 14, yOffset, finalWidth, finalHeight);
  
  // Add footer watermark
  const pageHeight = orientation === 'l' ? 210 : 297;
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text(
    `© ${new Date().getFullYear()} Sacred Greeks™ - Dr. Lyman Montgomery. All Rights Reserved. Patent Pending.`,
    14,
    pageHeight - 10
  );
  pdf.text(
    'Unauthorized reproduction or distribution is strictly prohibited.',
    14,
    pageHeight - 5
  );
  
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
