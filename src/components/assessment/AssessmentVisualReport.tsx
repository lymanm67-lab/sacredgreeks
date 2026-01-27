import { useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Printer,
  Share2,
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import jsPDF from "jspdf";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

interface ChartDataItem {
  name: string;
  value: number;
  fullMark?: number;
  color?: string;
}

interface AssessmentVisualReportProps {
  assessmentTitle: string;
  assessmentType: string;
  resultTitle: string;
  resultSubtitle?: string;
  archetype?: string;
  score?: number;
  scoreLabel?: string;
  completedAt: string;
  chartData?: ChartDataItem[];
  chartType?: "pie" | "radar" | "bar";
  sections?: { title: string; content: string; items?: string[] }[];
  recommendations?: string[];
  colorScheme?: "purple" | "amber" | "fuchsia" | "blue" | "green";
}

const CHART_COLORS = [
  "hsl(270, 70%, 60%)",
  "hsl(45, 90%, 55%)",
  "hsl(180, 60%, 50%)",
  "hsl(330, 70%, 55%)",
  "hsl(200, 70%, 55%)",
  "hsl(120, 50%, 50%)",
];

const colorSchemes = {
  purple: {
    gradient: "from-purple-500 to-violet-600",
    bg: "from-purple-500/10 to-violet-500/10",
    border: "border-purple-500/30",
    text: "text-purple-500",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    accent: "hsl(270, 70%, 60%)"
  },
  amber: {
    gradient: "from-amber-500 to-orange-600",
    bg: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-500/30",
    text: "text-amber-500",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    accent: "hsl(45, 90%, 55%)"
  },
  fuchsia: {
    gradient: "from-fuchsia-500 to-pink-600",
    bg: "from-fuchsia-500/10 to-pink-500/10",
    border: "border-fuchsia-500/30",
    text: "text-fuchsia-500",
    badge: "bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30",
    accent: "hsl(330, 70%, 55%)"
  },
  blue: {
    gradient: "from-blue-500 to-indigo-600",
    bg: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-500/30",
    text: "text-blue-500",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    accent: "hsl(200, 70%, 55%)"
  },
  green: {
    gradient: "from-emerald-500 to-teal-600",
    bg: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-500",
    badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    accent: "hsl(160, 60%, 50%)"
  }
};

export function AssessmentVisualReport({
  assessmentTitle,
  assessmentType,
  resultTitle,
  resultSubtitle,
  archetype,
  score,
  scoreLabel = "Score",
  completedAt,
  chartData = [],
  chartType = "radar",
  sections = [],
  recommendations = [],
  colorScheme = "purple"
}: AssessmentVisualReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const colors = colorSchemes[colorScheme];

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

    // Header with gradient bar simulation
    doc.setFillColor(138, 43, 226);
    doc.rect(0, 0, pageWidth, 15, "F");

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 60, 60);
    yPos = 30;
    doc.text(assessmentTitle, margin, yPos);
    yPos += 8;

    // Completion date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(`Completed: ${format(new Date(completedAt), "MMMM d, yyyy 'at' h:mm a")}`, margin, yPos);
    yPos += 15;

    // Result box
    doc.setFillColor(245, 240, 255);
    doc.roundedRect(margin, yPos - 5, pageWidth - margin * 2, 35, 5, 5, "F");

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 40, 160);
    doc.text(resultTitle, margin + 10, yPos + 8);

    if (archetype) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(120, 80, 180);
      doc.text(`Archetype: ${archetype}`, margin + 10, yPos + 18);
    }

    if (score !== undefined) {
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(218, 165, 32);
      doc.text(`${score}%`, pageWidth - margin - 30, yPos + 15);
    }

    yPos += 45;

    // Sections
    doc.setTextColor(60, 60, 60);
    sections.forEach((section) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text(section.title, margin, yPos);
      yPos += 7;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const contentLines = doc.splitTextToSize(section.content, pageWidth - margin * 2);
      doc.text(contentLines, margin, yPos);
      yPos += contentLines.length * 5 + 6;

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
    if (recommendations.length > 0) {
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFillColor(230, 250, 240);
      doc.roundedRect(margin, yPos - 5, pageWidth - margin * 2, 10 + recommendations.length * 8, 5, 5, "F");

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 120, 80);
      doc.text("Recommended Next Steps", margin + 5, yPos + 5);
      yPos += 12;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      recommendations.forEach((rec) => {
        const recLines = doc.splitTextToSize(`✓ ${rec}`, pageWidth - margin * 2 - 10);
        doc.text(recLines, margin + 8, yPos);
        yPos += recLines.length * 5 + 3;
      });
    }

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.text("Sacred Greeks - Faith & Greek Life Resources | sacredgreeks.com", margin, 285);

    doc.save(`${assessmentType}-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
    toast.success("Report downloaded!");
  };

  const handleShare = async () => {
    const shareText = `My ${assessmentTitle} Results: ${resultTitle}${score ? ` (${score}%)` : ""}. Take the assessment at Sacred Greeks!`;

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
        <title>${assessmentTitle} - Visual Report</title>
        <style>
          * { box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', system-ui, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 40px; 
            background: linear-gradient(135deg, #faf5ff 0%, #fef3f2 100%);
          }
          .header { 
            background: linear-gradient(135deg, #8b5cf6, #d946ef);
            color: white;
            padding: 30px;
            border-radius: 16px;
            margin-bottom: 24px;
            text-align: center;
          }
          h1 { margin: 0 0 8px 0; font-size: 28px; }
          .date { opacity: 0.9; font-size: 14px; }
          .result-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          }
          .result-title { 
            font-size: 24px; 
            font-weight: bold; 
            background: linear-gradient(135deg, #8b5cf6, #d946ef);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
          }
          .archetype {
            display: inline-block;
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            color: #92400e;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
          }
          .score-display {
            text-align: center;
            padding: 20px;
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            border-radius: 12px;
            margin: 16px 0;
          }
          .score-number {
            font-size: 48px;
            font-weight: bold;
            color: #b45309;
          }
          .score-label { color: #92400e; font-size: 14px; }
          .section {
            background: #f9fafb;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
          }
          .section-title {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .section-title::before {
            content: "✓";
            color: #8b5cf6;
          }
          .section-content { color: #6b7280; font-size: 14px; line-height: 1.6; }
          ul { margin: 8px 0; padding-left: 20px; }
          li { margin-bottom: 6px; color: #6b7280; }
          .recommendations {
            background: linear-gradient(135deg, #d1fae5, #a7f3d0);
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
          }
          .recommendations h3 {
            color: #065f46;
            margin: 0 0 12px 0;
          }
          .recommendations li { color: #047857; }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            color: #9ca3af;
            font-size: 12px;
          }
          @media print {
            body { background: white; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${assessmentTitle}</h1>
          <p class="date">Completed on ${format(new Date(completedAt), "MMMM d, yyyy 'at' h:mm a")}</p>
        </div>

        <div class="result-card">
          <div class="result-title">${resultTitle}</div>
          ${resultSubtitle ? `<p style="color: #6b7280; margin: 8px 0;">${resultSubtitle}</p>` : ""}
          ${archetype ? `<span class="archetype">${archetype}</span>` : ""}
          
          ${score !== undefined ? `
            <div class="score-display">
              <div class="score-number">${score}%</div>
              <div class="score-label">${scoreLabel}</div>
            </div>
          ` : ""}
        </div>

        ${sections.map(section => `
          <div class="section">
            <div class="section-title">${section.title}</div>
            <div class="section-content">${section.content}</div>
            ${section.items ? `<ul>${section.items.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}
          </div>
        `).join("")}

        ${recommendations.length > 0 ? `
          <div class="recommendations">
            <h3>🎯 Recommended Next Steps</h3>
            <ul>
              ${recommendations.map(rec => `<li>${rec}</li>`).join("")}
            </ul>
          </div>
        ` : ""}

        <div class="footer">
          <p><strong>Sacred Greeks</strong> - Faith & Greek Life Resources</p>
          <p>Visit sacredgreeks.com for more assessments and learning resources</p>
        </div>
      </body>
      </html>
    `;
  };

  const renderChart = () => {
    if (chartData.length === 0) return null;

    switch (chartType) {
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartData[index].color || CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartData[index].color || CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );

      case "radar":
      default:
        return (
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={chartData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Score"
                dataKey="value"
                stroke={colors.accent}
                fill={colors.accent}
                fillOpacity={0.4}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <motion.div
      ref={reportRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header Card */}
      <Card className={`${colors.border} bg-gradient-to-br ${colors.bg} overflow-hidden`}>
        <div className={`h-2 bg-gradient-to-r ${colors.gradient}`} />
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="w-4 h-4" />
            Completed {format(new Date(completedAt), "MMMM d, yyyy")}
          </div>

          {archetype && (
            <Badge className={`w-fit mx-auto mb-3 ${colors.badge}`}>
              <Trophy className="w-3 h-3 mr-1" />
              {archetype}
            </Badge>
          )}

          <CardTitle className="text-2xl">{resultTitle}</CardTitle>
          {resultSubtitle && (
            <p className="text-muted-foreground">{resultSubtitle}</p>
          )}

          {/* Score Display */}
          {score !== undefined && (
            <div className="mt-4 p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
              <div className="flex items-center justify-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-muted-foreground">{scoreLabel}</span>
              </div>
              <div className={`text-5xl font-bold ${colors.text}`}>{score}%</div>
              <div className="mt-3 h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${colors.gradient}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Chart Card */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              {chartType === "pie" ? <PieChartIcon className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
              Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderChart()}
          </CardContent>
        </Card>
      )}

      {/* Sections */}
      {sections.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Detailed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50 border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${colors.text}`} />
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground">{section.content}</p>
                {section.items && section.items.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.gradient} flex-shrink-0`} />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-emerald-600">
              <Target className="w-5 h-5" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-emerald-500/10 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 font-medium text-xs">
                    {index + 1}
                  </div>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" onClick={handlePrint} className="gap-2">
          <Printer className="w-4 h-4" />
          Print
        </Button>
        <Button variant="outline" onClick={handleDownloadPDF} className="gap-2">
          <Download className="w-4 h-4" />
          PDF
        </Button>
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </motion.div>
  );
}
