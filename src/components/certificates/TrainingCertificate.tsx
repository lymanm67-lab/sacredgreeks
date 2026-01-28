import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Award, 
  Download, 
  Printer, 
  Building2, 
  Target, 
  Shield, 
  Flame,
  Trophy
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

interface TrainingCertificateProps {
  title: string;
  certificateType: string;
  earnedAt: string;
  description?: string;
  userName?: string;
  certificateData?: {
    icon?: string;
    color?: string;
    completedSections?: number;
    totalSections?: number;
  };
}

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Target,
  Shield,
  Flame,
  Trophy,
  Award,
};

const colorMap: Record<string, string> = {
  violet: '#8B5CF6',
  amber: '#F59E0B',
  orange: '#F97316',
  rose: '#F43F5E',
  green: '#10B981',
  gold: '#D4AF37',
};

export function TrainingCertificate({
  title,
  certificateType,
  earnedAt,
  description,
  userName,
  certificateData,
}: TrainingCertificateProps) {
  const { user } = useAuth();
  const certificateRef = useRef<HTMLDivElement>(null);
  
  const displayName = userName || user?.user_metadata?.full_name || 'Sacred Greeks Member';
  const IconComponent = iconMap[certificateData?.icon || 'Award'] || Award;
  const accentColor = colorMap[certificateData?.color || 'gold'] || colorMap.gold;
  const formattedDate = format(new Date(earnedAt), 'MMMM d, yyyy');
  const certificateId = `SG-${certificateType.toUpperCase().replace(/_/g, '')}-${new Date(earnedAt).getTime().toString(36).toUpperCase()}`;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to print');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title} Certificate - Sacred Greeks</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          @page {
            size: landscape;
            margin: 0;
          }
          
          body {
            font-family: 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f5f5f5;
            padding: 20px;
          }
          
          .certificate {
            width: 11in;
            height: 8.5in;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
            border: 8px double ${accentColor};
            padding: 40px;
            position: relative;
            overflow: hidden;
          }
          
          .certificate::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 2px solid ${accentColor}40;
            pointer-events: none;
          }
          
          .corner-ornament {
            position: absolute;
            width: 60px;
            height: 60px;
            border: 3px solid ${accentColor};
          }
          
          .corner-ornament.top-left { top: 30px; left: 30px; border-right: none; border-bottom: none; }
          .corner-ornament.top-right { top: 30px; right: 30px; border-left: none; border-bottom: none; }
          .corner-ornament.bottom-left { bottom: 30px; left: 30px; border-right: none; border-top: none; }
          .corner-ornament.bottom-right { bottom: 30px; right: 30px; border-left: none; border-top: none; }
          
          .content {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            z-index: 1;
          }
          
          .header {
            color: ${accentColor};
            font-family: 'Playfair Display', serif;
            font-size: 14px;
            letter-spacing: 4px;
            text-transform: uppercase;
            margin-bottom: 10px;
          }
          
          .title {
            font-family: 'Playfair Display', serif;
            font-size: 42px;
            font-weight: 700;
            color: white;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }
          
          .icon-container {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, ${accentColor}, ${accentColor}cc);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
            box-shadow: 0 8px 32px ${accentColor}40;
          }
          
          .icon-container svg {
            width: 40px;
            height: 40px;
            color: white;
          }
          
          .awarded-to {
            color: #9ca3af;
            font-size: 14px;
            margin-bottom: 8px;
          }
          
          .name {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            font-weight: 600;
            color: white;
            margin-bottom: 20px;
          }
          
          .description {
            color: #d1d5db;
            font-size: 14px;
            max-width: 500px;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          
          .date-section {
            display: flex;
            align-items: center;
            gap: 40px;
            margin-top: 20px;
          }
          
          .date-item {
            text-align: center;
          }
          
          .date-label {
            color: #9ca3af;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .date-value {
            color: white;
            font-size: 14px;
            margin-top: 4px;
          }
          
          .footer {
            position: absolute;
            bottom: 50px;
            left: 0;
            right: 0;
            text-align: center;
          }
          
          .org-name {
            color: ${accentColor};
            font-family: 'Playfair Display', serif;
            font-size: 18px;
            font-weight: 600;
          }
          
          .org-tagline {
            color: #6b7280;
            font-size: 11px;
            margin-top: 4px;
          }
          
          @media print {
            body { background: white; padding: 0; }
            .certificate { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="corner-ornament top-left"></div>
          <div class="corner-ornament top-right"></div>
          <div class="corner-ornament bottom-left"></div>
          <div class="corner-ornament bottom-right"></div>
          
          <div class="content">
            <div class="header">Certificate of Achievement</div>
            <h1 class="title">${title}</h1>
            
            <div class="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="6"/>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
              </svg>
            </div>
            
            <p class="awarded-to">This certificate is awarded to</p>
            <h2 class="name">${displayName}</h2>
            
            <p class="description">${description || 'For successfully completing all training requirements and demonstrating mastery of the course material.'}</p>
            
            <div class="date-section">
              <div class="date-item">
                <div class="date-label">Date Earned</div>
                <div class="date-value">${formattedDate}</div>
              </div>
              <div class="date-item">
                <div class="date-label">Certificate ID</div>
                <div class="date-value">${certificateId}</div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="org-name">Sacred Greeks Ministry</div>
            <div class="org-tagline">sacredgreeks.org</div>
          </div>
        </div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: 'letter',
    });

    const width = 11;
    const height = 8.5;

    // Background
    pdf.setFillColor(26, 26, 46);
    pdf.rect(0, 0, width, height, 'F');

    // Border
    pdf.setDrawColor(212, 175, 55);
    pdf.setLineWidth(0.05);
    pdf.rect(0.3, 0.3, width - 0.6, height - 0.6, 'S');
    pdf.rect(0.4, 0.4, width - 0.8, height - 0.8, 'S');

    // Header
    pdf.setTextColor(212, 175, 55);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('CERTIFICATE OF ACHIEVEMENT', width / 2, 1.2, { align: 'center' });

    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, width / 2, 2, { align: 'center' });

    // Award icon circle
    pdf.setFillColor(212, 175, 55);
    pdf.circle(width / 2, 3, 0.5, 'F');

    // Awarded to
    pdf.setTextColor(156, 163, 175);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('This certificate is awarded to', width / 2, 4, { align: 'center' });

    // Name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(displayName, width / 2, 4.5, { align: 'center' });

    // Description
    pdf.setTextColor(209, 213, 219);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const descText = description || 'For successfully completing all training requirements and demonstrating mastery of the course material.';
    const splitDesc = pdf.splitTextToSize(descText, 5);
    pdf.text(splitDesc, width / 2, 5.2, { align: 'center' });

    // Date and ID
    pdf.setTextColor(156, 163, 175);
    pdf.setFontSize(9);
    pdf.text('Date Earned', width / 2 - 1.5, 6.3, { align: 'center' });
    pdf.text('Certificate ID', width / 2 + 1.5, 6.3, { align: 'center' });
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text(formattedDate, width / 2 - 1.5, 6.6, { align: 'center' });
    pdf.text(certificateId, width / 2 + 1.5, 6.6, { align: 'center' });

    // Footer
    pdf.setTextColor(212, 175, 55);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Sacred Greeks Ministry', width / 2, 7.5, { align: 'center' });
    
    pdf.setTextColor(107, 114, 128);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('sacredgreeks.org', width / 2, 7.8, { align: 'center' });

    pdf.save(`${title.replace(/\s+/g, '-')}-Certificate.pdf`);
    toast.success('Certificate downloaded!');
  };

  return (
    <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-background to-muted/30">
      <CardContent className="p-0">
        {/* Certificate Preview */}
        <div 
          ref={certificateRef}
          className="relative aspect-[11/8.5] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] p-6 sm:p-8"
          style={{ borderColor: accentColor }}
        >
          {/* Decorative border */}
          <div 
            className="absolute inset-3 border-2 opacity-30 pointer-events-none"
            style={{ borderColor: accentColor }}
          />
          
          {/* Corner ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: accentColor }} />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: accentColor }} />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: accentColor }} />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: accentColor }} />

          {/* Content */}
          <div className="h-full flex flex-col items-center justify-center text-center relative z-10">
            <p 
              className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2"
              style={{ color: accentColor }}
            >
              Certificate of Achievement
            </p>
            
            <h2 className="text-lg sm:text-2xl font-bold text-white mb-3 font-serif">
              {title}
            </h2>
            
            <div 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}
            >
              <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            
            <p className="text-gray-400 text-[10px] sm:text-xs mb-1">Awarded to</p>
            <p className="text-white text-sm sm:text-xl font-semibold font-serif mb-2">
              {displayName}
            </p>
            
            <p className="text-gray-300 text-[8px] sm:text-xs max-w-[200px] sm:max-w-xs mb-3">
              {description || 'For completing all training requirements'}
            </p>
            
            <div className="flex items-center gap-4 sm:gap-8 text-[8px] sm:text-xs">
              <div>
                <p className="text-gray-500 uppercase tracking-wider">Date</p>
                <p className="text-white">{formattedDate}</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-wider">ID</p>
                <p className="text-white">{certificateId}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center">
            <p style={{ color: accentColor }} className="font-semibold text-xs sm:text-sm">
              Sacred Greeks Ministry
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-muted/30 flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button size="sm" onClick={handleDownloadPDF} className="gap-2 bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
