import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Download, Loader2, FileText, CheckCircle2 } from 'lucide-react';
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

export function SalesDeckGenerator({ isOpen, onClose }: SalesDeckGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('');

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
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Save the PDF
      doc.save('Sacred-Greeks-Sales-Deck.pdf');
      
      toast.success('Sales Deck Generated!', {
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
      onClose();
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
            Generate a professional PDF presentation for Greek Life leaders.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Deck Includes:</p>
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

          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Generate & Download PDF
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
