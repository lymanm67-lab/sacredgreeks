import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Printer, 
  Save, 
  Share2, 
  CheckCircle2, 
  Loader2,
  Volume2,
  FileText,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { AssessmentTTS } from "./AssessmentTTS";
import jsPDF from "jspdf";

interface ResultSection {
  title: string;
  content: string;
  items?: string[];
}

interface AssessmentResultsPanelProps {
  assessmentType: string;
  assessmentTitle: string;
  resultTitle: string;
  resultSubtitle?: string;
  score?: number;
  scoreLabel?: string;
  archetype?: string;
  sections: ResultSection[];
  recommendations?: string[];
  ttsText: string;
  icon?: React.ReactNode;
  colorScheme?: "purple" | "amber" | "fuchsia" | "blue" | "green";
  onSave?: () => Promise<void>;
  customSaveHandler?: boolean;
  additionalData?: Record<string, unknown>;
}

const colorSchemes = {
  purple: {
    gradient: "from-purple-500 to-violet-600",
    bg: "from-purple-500/10 to-violet-500/10",
    border: "border-purple-500/30",
    text: "text-purple-500",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  amber: {
    gradient: "from-amber-500 to-orange-600",
    bg: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-500/30",
    text: "text-amber-500",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  },
  fuchsia: {
    gradient: "from-fuchsia-500 to-pink-600",
    bg: "from-fuchsia-500/10 to-pink-500/10",
    border: "border-fuchsia-500/30",
    text: "text-fuchsia-500",
    badge: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30"
  },
  blue: {
    gradient: "from-blue-500 to-indigo-600",
    bg: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-500/30",
    text: "text-blue-500",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  },
  green: {
    gradient: "from-emerald-500 to-teal-600",
    bg: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-500",
    badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  }
};

export function AssessmentResultsPanel({
  assessmentType,
  assessmentTitle,
  resultTitle,
  resultSubtitle,
  score,
  scoreLabel = "Score",
  archetype,
  sections,
  recommendations,
  ttsText,
  icon,
  colorScheme = "purple",
  onSave,
  customSaveHandler = false,
  additionalData
}: AssessmentResultsPanelProps) {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const colors = colorSchemes[colorScheme];

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to save your results");
      return;
    }

    if (customSaveHandler && onSave) {
      await onSave();
      return;
    }

    setIsSaving(true);
    try {
      // Build scores_json with all relevant data for visual reports
      const scoresData = {
        score,
        sections: sections.map(s => ({ title: s.title, content: s.content, items: s.items })),
        archetype,
        recommendations,
        ...(additionalData?.topCategory && { topCategory: additionalData.topCategory })
      };

      const { error } = await supabase.from("assessment_submissions").insert([{
        user_id: user.id,
        track: assessmentType,
        scenario: resultTitle,
        result_type: archetype || resultTitle,
        scores_json: JSON.parse(JSON.stringify(scoresData)),
        answers_json: JSON.parse(JSON.stringify(additionalData || {})),
        consent_to_contact: false
      }]);

      if (error) throw error;

      setIsSaved(true);
      toast.success("Results saved successfully!");
    } catch (error) {
      console.error("Error saving results:", error);
      toast.error("Failed to save results. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    const printContent = generatePrintContent();
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(assessmentTitle, margin, yPos);
    yPos += 10;

    // Date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${format(new Date(), "MMMM d, yyyy")}`, margin, yPos);
    yPos += 15;

    // Result Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(resultTitle, margin, yPos);
    yPos += 8;

    if (resultSubtitle) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(resultSubtitle, margin, yPos);
      yPos += 8;
    }

    if (archetype) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.text(`Archetype: ${archetype}`, margin, yPos);
      yPos += 8;
    }

    if (score !== undefined) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`${scoreLabel}: ${score}%`, margin, yPos);
      yPos += 12;
    }

    // Sections
    sections.forEach((section) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(section.title, margin, yPos);
      yPos += 6;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const contentLines = doc.splitTextToSize(section.content, pageWidth - margin * 2);
      doc.text(contentLines, margin, yPos);
      yPos += contentLines.length * 5 + 4;

      if (section.items) {
        section.items.forEach((item) => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          const itemLines = doc.splitTextToSize(`• ${item}`, pageWidth - margin * 2 - 5);
          doc.text(itemLines, margin + 5, yPos);
          yPos += itemLines.length * 5 + 2;
        });
        yPos += 4;
      }
    });

    // Recommendations
    if (recommendations && recommendations.length > 0) {
      if (yPos > 240) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Recommendations", margin, yPos);
      yPos += 8;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      recommendations.forEach((rec) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        const recLines = doc.splitTextToSize(`✓ ${rec}`, pageWidth - margin * 2 - 5);
        doc.text(recLines, margin + 5, yPos);
        yPos += recLines.length * 5 + 3;
      });
    }

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("Sacred Greeks - Faith & Greek Life Resources", margin, 285);

    doc.save(`${assessmentType}-results-${format(new Date(), "yyyy-MM-dd")}.pdf`);
    toast.success("PDF downloaded!");
  };

  const handleShare = async () => {
    const shareText = `I completed the ${assessmentTitle} on Sacred Greeks! My result: ${resultTitle}${score ? ` (${score}%)` : ""}. Take the assessment to discover yours!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `My ${assessmentTitle} Results`,
          text: shareText,
          url: window.location.href
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success("Copied to clipboard!");
    }
  };

  const generatePrintContent = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${assessmentTitle} - Results</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; }
          h1 { color: #6b21a8; margin-bottom: 8px; }
          h2 { color: #374151; margin-top: 24px; }
          .meta { color: #6b7280; margin-bottom: 24px; }
          .result-header { background: linear-gradient(135deg, #f3e8ff, #fce7f3); padding: 24px; border-radius: 12px; margin-bottom: 24px; }
          .result-title { font-size: 24px; font-weight: bold; color: #6b21a8; }
          .archetype { color: #9333ea; font-style: italic; }
          .score { font-size: 32px; font-weight: bold; color: #d97706; }
          .section { margin-bottom: 20px; padding: 16px; background: #f9fafb; border-radius: 8px; }
          .section-title { font-weight: bold; color: #374151; margin-bottom: 8px; }
          ul { margin: 8px 0; padding-left: 20px; }
          li { margin-bottom: 4px; }
          .recommendations { background: #ecfdf5; padding: 16px; border-radius: 8px; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>${assessmentTitle}</h1>
        <p class="meta">Generated on ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")}</p>
        
        <div class="result-header">
          <div class="result-title">${resultTitle}</div>
          ${resultSubtitle ? `<p>${resultSubtitle}</p>` : ""}
          ${archetype ? `<p class="archetype">Archetype: ${archetype}</p>` : ""}
          ${score !== undefined ? `<p class="score">${scoreLabel}: ${score}%</p>` : ""}
        </div>

        ${sections.map(section => `
          <div class="section">
            <div class="section-title">${section.title}</div>
            <p>${section.content}</p>
            ${section.items ? `<ul>${section.items.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
          </div>
        `).join("")}

        ${recommendations && recommendations.length > 0 ? `
          <div class="recommendations">
            <h2>Recommended Next Steps</h2>
            <ul>
              ${recommendations.map(rec => `<li>${rec}</li>`).join("")}
            </ul>
          </div>
        ` : ""}

        <div class="footer">
          <p>Sacred Greeks - Faith & Greek Life Resources</p>
          <p>Visit sacredgreeks.com for more assessments and learning resources.</p>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <motion.div
      ref={reportRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`${colors.border} bg-gradient-to-br ${colors.bg}`}>
        <CardHeader className="text-center pb-4">
          {/* Icon */}
          {icon && (
            <div className="flex justify-center mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                {icon}
              </div>
            </div>
          )}

          {/* TTS Button */}
          <div className="flex justify-center mb-3">
            <AssessmentTTS 
              text={ttsText} 
              itemId="results-summary" 
              title="Assessment Results"
              variant="button"
              label="Listen to Results"
            />
          </div>

          {/* Archetype Badge */}
          {archetype && (
            <Badge className={`w-fit mx-auto mb-2 ${colors.badge}`}>
              {archetype}
            </Badge>
          )}

          <CardTitle className="text-2xl">{resultTitle}</CardTitle>
          {resultSubtitle && (
            <CardDescription className="text-base">{resultSubtitle}</CardDescription>
          )}

          {/* Score Display */}
          {score !== undefined && (
            <div className="mt-4 p-4 rounded-lg bg-background/50 border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">{scoreLabel}</span>
                <span className={`text-2xl font-bold ${colors.text}`}>{score}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full bg-gradient-to-r ${colors.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Sections */}
          {sections.map((section, index) => (
            <div key={index} className="p-4 rounded-lg bg-background/50 border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                {section.title}
              </h3>
              <p className="text-sm text-muted-foreground">{section.content}</p>
              {section.items && section.items.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <Sparkles className="w-3 h-3 mt-1 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Recommendations */}
          {recommendations && recommendations.length > 0 && (
            <div className={`p-4 rounded-lg bg-gradient-to-r ${colors.bg} border ${colors.border}`}>
              <h3 className="font-semibold mb-3">Recommended Next Steps</h3>
              <div className="space-y-2">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving || isSaved || !user}
              className="gap-2"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isSaved ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaved ? "Saved" : "Save Results"}
            </Button>

            <Button
              variant="outline"
              onClick={handlePrint}
              className="gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </Button>

            <Button
              variant="outline"
              onClick={handleDownloadPDF}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>

            <Button
              variant="outline"
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {!user && (
            <p className="text-center text-sm text-muted-foreground">
              Sign in to save your results to your profile
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
