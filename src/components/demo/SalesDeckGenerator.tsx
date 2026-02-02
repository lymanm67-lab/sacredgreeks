import { useState } from 'react';
import { jsPDF } from 'jspdf';
import pptxgen from 'pptxgenjs';
import { Download, Loader2, FileText, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface SalesDeckGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

const DECK_SECTIONS = [
  {
    id: 'intro',
    title: 'Introduction',
    content: [
      'Sacred Greeks: Where Faith Meets Greek Life',
      '',
      'The only platform positioned at the intersection of Christian faith and Divine Nine Greek life.',
      '',
      'Target Audience:',
      '• Active D9 members navigating faith questions',
      '• Chapter Chaplains seeking resources',
      '• Greek leaders addressing hazing & ritual concerns',
      '• Alumni reconnecting with purpose',
    ],
  },
  {
    id: 'problem',
    title: 'The Problem',
    content: [
      'Greek Life Challenges Today:',
      '',
      '• 75% of D9 members report faith conflicts',
      '• Limited theological resources for Greek rituals',
      '• Financial predation targeting college students',
      '• Hazing concerns with no faith-based framework',
      '• Isolation between chapter and church life',
    ],
  },
  {
    id: 'solution',
    title: 'Our Solution',
    content: [
      'P.R.O.O.F. Framework:',
      '',
      '• Paganism - Examining historical origins',
      '• Rituals - Biblical evaluation of practices',
      '• Oaths - Scripture on vows & commitments',
      '• Occultism - Discernment tools',
      '• Freemasonry - Historical connections explored',
      '',
      'Faith Snapshot Assessment: 6-question diagnostic',
      'providing personalized guidance in under 5 minutes.',
    ],
  },
  {
    id: 'financial',
    title: 'Financial Stewardship',
    content: [
      '10/15/10/65 Biblical Budget Model:',
      '',
      '• 10% Kingdom Giving (Tithe)',
      '• 15% Savings (Emergency Fund)',
      '• 10% Investing (Wealth Building)',
      '• 65% Living Expenses',
      '',
      'Unique Features:',
      '• D9 Lifetime Cost Calculator',
      '• FCRA-Compliant Dispute Letter Generator',
      '• Student Financial Defense Tools',
      '• Credit Repair Hub with direct bureau links',
    ],
  },
  {
    id: 'community',
    title: 'Community Features',
    content: [
      'Chapter Chaplain Toolkit:',
      '• Auto-generated PDF devotionals',
      '• Meeting note templates',
      '• Prayer request management',
      '',
      'D9 Business Directory:',
      '• Faith-focused businesses',
      '• Member networking',
      '• Economic empowerment',
      '',
      'Chapter Finder: 750+ chapters mapped',
    ],
  },
  {
    id: 'engagement',
    title: 'Gamification & Retention',
    content: [
      'Engagement Features:',
      '',
      '• Badge system with 5-tier progression',
      '• Daily streak tracking',
      '• Points for course completion',
      '• Achievement celebrations with confetti',
      '• Leaderboards (coming soon)',
      '',
      'Average session: 12+ minutes',
      'Return rate: 68% weekly',
    ],
  },
  {
    id: 'cta',
    title: 'Call to Action',
    content: [
      'Next Steps:',
      '',
      '1. Schedule a chapter demo',
      '2. Pilot with your Chaplain committee',
      '3. Roll out to full chapter',
      '',
      'Contact:',
      '• Website: sacredgreeks.lovable.app',
      '• Speaking Requests: /speaking-request',
      '',
      '"Bridge the gap between brotherhood and belief."',
    ],
  },
];

type ExportFormat = 'pptx' | 'pdf';

export function SalesDeckGenerator({ isOpen, onClose }: SalesDeckGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('');

  const generatePowerPoint = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      const pptx = new pptxgen();
      pptx.layout = 'LAYOUT_16x9';
      pptx.title = 'Sacred Greeks Sales Deck';
      pptx.author = 'Sacred Greeks';
      pptx.subject = 'Faith Meets Greek Life';

      for (let i = 0; i < DECK_SECTIONS.length; i++) {
        const section = DECK_SECTIONS[i];
        setCurrentSection(section.title);
        setProgress(((i + 1) / DECK_SECTIONS.length) * 100);

        const slide = pptx.addSlide();
        
        // Dark background
        slide.background = { color: '0F172A' };

        // Accent bar on left
        slide.addShape(pptx.ShapeType.rect, {
          x: 0,
          y: 0,
          w: 0.3,
          h: '100%',
          fill: { color: 'D97706' },
        });

        // Slide number
        slide.addText(`${i + 1} / ${DECK_SECTIONS.length}`, {
          x: 8.5,
          y: 5,
          w: 1,
          h: 0.3,
          fontSize: 10,
          color: '94A3B8',
          align: 'right',
        });

        // Title
        slide.addText(section.title, {
          x: 0.6,
          y: 0.3,
          w: 9,
          h: 0.8,
          fontSize: 32,
          bold: true,
          color: 'FFFFFF',
        });

        // Content - build formatted text
        const contentItems: pptxgen.TextProps[] = [];
        section.content.forEach((line) => {
          if (line === '') {
            contentItems.push({ text: '\n', options: { fontSize: 14 } });
          } else if (line.startsWith('•')) {
            contentItems.push({
              text: '• ',
              options: { fontSize: 14, color: 'FBBf24', bold: true },
            });
            contentItems.push({
              text: line.substring(2) + '\n',
              options: { fontSize: 14, color: 'E2E8F0' },
            });
          } else if (line.endsWith(':')) {
            contentItems.push({
              text: line + '\n',
              options: { fontSize: 14, color: 'FBBf24', bold: true },
            });
          } else if (line.startsWith('"')) {
            contentItems.push({
              text: line + '\n',
              options: { fontSize: 14, color: 'FBBf24', italic: true },
            });
          } else {
            contentItems.push({
              text: line + '\n',
              options: { fontSize: 14, color: 'E2E8F0' },
            });
          }
        });

        slide.addText(contentItems, {
          x: 0.6,
          y: 1.2,
          w: 9,
          h: 4,
          valign: 'top',
        });

        // Footer branding
        slide.addText('Sacred Greeks | Faith Meets Greek Life', {
          x: 0.6,
          y: 5,
          w: 5,
          h: 0.3,
          fontSize: 8,
          color: '64748B',
        });

        await new Promise(resolve => setTimeout(resolve, 100));
      }

      await pptx.writeFile({ fileName: 'Sacred-Greeks-Sales-Deck.pptx' });
      
      toast.success('PowerPoint Generated!', {
        description: 'Your .pptx file has been downloaded.',
      });
    } catch (error) {
      console.error('PowerPoint generation error:', error);
      toast.error('Failed to generate PowerPoint', {
        description: 'Please try again.',
      });
    } finally {
      setIsGenerating(false);
      setProgress(0);
      setCurrentSection('');
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;

      for (let i = 0; i < DECK_SECTIONS.length; i++) {
        const section = DECK_SECTIONS[i];
        setCurrentSection(section.title);
        setProgress(((i + 1) / DECK_SECTIONS.length) * 100);

        if (i > 0) {
          doc.addPage();
        }

        // Background gradient effect (simulated with rectangles)
        doc.setFillColor(15, 23, 42); // slate-900
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        
        // Accent bar
        doc.setFillColor(217, 119, 6); // amber-600
        doc.rect(0, 0, 8, pageHeight, 'F');

        // Slide number
        doc.setTextColor(148, 163, 184); // slate-400
        doc.setFontSize(10);
        doc.text(`${i + 1} / ${DECK_SECTIONS.length}`, pageWidth - margin, pageHeight - 10, { align: 'right' });

        // Title
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.text(section.title, margin + 10, 30);

        // Content
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(226, 232, 240); // slate-200

        let yPos = 50;
        const lineHeight = 8;

        section.content.forEach((line) => {
          if (line.startsWith('•')) {
            doc.setTextColor(251, 191, 36); // amber-400
            doc.text('•', margin + 15, yPos);
            doc.setTextColor(226, 232, 240);
            doc.text(line.substring(2), margin + 22, yPos);
          } else if (line.endsWith(':')) {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(251, 191, 36); // amber-400
            doc.text(line, margin + 10, yPos);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(226, 232, 240);
          } else if (line.startsWith('"')) {
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(251, 191, 36);
            doc.text(line, margin + 10, yPos);
            doc.setFont('helvetica', 'normal');
          } else {
            doc.text(line, margin + 10, yPos);
          }
          yPos += lineHeight;
        });

        // Footer branding
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139); // slate-500
        doc.text('Sacred Greeks | Faith Meets Greek Life', margin + 10, pageHeight - 10);

        // Simulate processing time for visual feedback
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Save the PDF
      doc.save('Sacred-Greeks-Sales-Deck.pdf');
      
      toast.success('PDF Generated!', {
        description: 'Your PDF has been downloaded.',
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF', {
        description: 'Please try again.',
      });
    } finally {
      setIsGenerating(false);
      setProgress(0);
      setCurrentSection('');
    }
  };

  const handleGenerate = async (format: ExportFormat) => {
    if (format === 'pptx') {
      await generatePowerPoint();
    } else {
      await generatePDF();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-sacred" />
            Sales Deck Generator
          </DialogTitle>
          <DialogDescription>
            Generate a professional presentation for Greek Life leaders.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Deck Includes ({DECK_SECTIONS.length} slides):</p>
            <ul className="space-y-1">
              {DECK_SECTIONS.map((section, index) => (
                <li key={section.id} className="flex items-center gap-2">
                  {isGenerating && currentSection === section.title ? (
                    <Loader2 className="w-3 h-3 animate-spin text-sacred" />
                  ) : progress > ((index + 1) / DECK_SECTIONS.length) * 100 ? (
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  ) : (
                    <span className="w-3 h-3 rounded-full border border-muted-foreground/30" />
                  )}
                  <span>{section.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {isGenerating && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                Generating: {currentSection}...
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleGenerate('pptx')}
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  PowerPoint
                </>
              )}
            </Button>
            <Button
              onClick={() => handleGenerate('pdf')}
              disabled={isGenerating}
              variant="outline"
              className="w-full"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
