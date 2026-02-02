import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Download, 
  FileText, 
  Calendar, 
  Users, 
  Heart, 
  BookOpen, 
  Sparkles,
  CheckCircle,
  Clock,
  Target,
  Shield
} from "lucide-react";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui/page-header";

const toolkitResources = [
  {
    id: "meeting-guide",
    title: "Chapter Meeting Prayer Guide",
    description: "Open and close your chapter meetings with meaningful prayer. Includes seasonal prayers and prayers for specific occasions.",
    icon: Users,
    category: "Meetings",
    items: [
      "Opening Prayer Templates (5 variations)",
      "Closing Benedictions",
      "Prayers for New Members",
      "Prayers for Graduates",
      "Emergency/Crisis Prayers"
    ]
  },
  {
    id: "devotional-calendar",
    title: "52-Week Devotional Calendar",
    description: "A year-long devotional plan aligned with the Greek calendar—recruitment, initiation season, Greek Week, and more.",
    icon: Calendar,
    category: "Planning",
    items: [
      "Weekly Scripture Focus",
      "Chapter Discussion Questions",
      "Personal Reflection Prompts",
      "Service Project Tie-ins",
      "Brotherhood/Sisterhood Activities"
    ]
  },
  {
    id: "one-on-one",
    title: "1-on-1 Spiritual Check-in Guide",
    description: "Framework for meaningful conversations with chapter members about faith, struggles, and growth.",
    icon: Heart,
    category: "Discipleship",
    items: [
      "Conversation Starters",
      "Active Listening Tips",
      "When to Refer to Professionals",
      "Follow-up Templates",
      "Confidentiality Guidelines"
    ]
  },
  {
    id: "bible-study",
    title: "Chapter Bible Study Curriculum",
    description: "6-week Bible study series designed specifically for Greek life contexts and challenges.",
    icon: BookOpen,
    category: "Education",
    items: [
      "Week 1: Identity in Christ vs. Letters",
      "Week 2: Servant Leadership",
      "Week 3: Brotherhood/Sisterhood Redefined",
      "Week 4: Excellence Without Compromise",
      "Week 5: Standing Firm Under Pressure",
      "Week 6: Legacy That Lasts"
    ]
  },
  {
    id: "crisis-response",
    title: "Crisis Response Playbook",
    description: "How to provide spiritual support during chapter crises, loss, or difficult situations.",
    icon: Shield,
    category: "Support",
    items: [
      "Initial Response Protocols",
      "Comfort Scriptures Card",
      "When to Involve Leadership",
      "Memorial Service Planning",
      "Long-term Support Strategies"
    ]
  }
];

const quickWins = [
  {
    title: "Start with Prayer",
    description: "Open your next chapter meeting with a 60-second prayer",
    time: "1 min"
  },
  {
    title: "Scripture of the Week",
    description: "Share one verse in your group chat every Monday",
    time: "2 min"
  },
  {
    title: "Gratitude Circle",
    description: "End exec meetings by sharing one thing you're grateful for",
    time: "5 min"
  },
  {
    title: "Service + Faith",
    description: "Connect your next community service to a biblical principle",
    time: "10 min"
  }
];

function generatePDF(resource: typeof toolkitResources[0]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(139, 92, 246);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(resource.title, 20, 25);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Sacred Greeks - Chapter Chaplain Toolkit", 20, 35);
  
  // Description
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(12);
  const descLines = doc.splitTextToSize(resource.description, pageWidth - 40);
  doc.text(descLines, 20, 55);
  
  // Contents
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Contents:", 20, 80);
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  resource.items.forEach((item, index) => {
    doc.text(`• ${item}`, 25, 95 + (index * 10));
  });
  
  // Footer
  const footerY = 270;
  doc.setFontSize(9);
  doc.setTextColor(128, 128, 128);
  doc.text("© Sacred Greeks | sacredgreeks.com", 20, footerY);
  doc.text("For internal chapter use only", pageWidth - 60, footerY);
  
  doc.save(`${resource.id}-sacred-greeks.pdf`);
  toast.success(`Downloaded: ${resource.title}`);
}

function generateFullToolkit() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Cover page
  doc.setFillColor(139, 92, 246);
  doc.rect(0, 0, pageWidth, 297, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.text("Chapter Chaplain", pageWidth / 2, 100, { align: "center" });
  doc.text("Toolkit", pageWidth / 2, 120, { align: "center" });
  
  doc.setFontSize(18);
  doc.setFont("helvetica", "normal");
  doc.text("Complete Resource Guide", pageWidth / 2, 150, { align: "center" });
  
  doc.setFontSize(14);
  doc.text("Sacred Greeks Ministry", pageWidth / 2, 200, { align: "center" });
  doc.text("sacredgreeks.com", pageWidth / 2, 215, { align: "center" });
  
  // Table of contents
  doc.addPage();
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Table of Contents", 20, 30);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  toolkitResources.forEach((resource, index) => {
    doc.text(`${index + 1}. ${resource.title}`, 25, 50 + (index * 12));
  });
  
  // Each resource section
  toolkitResources.forEach((resource, index) => {
    doc.addPage();
    
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${resource.title}`, 20, 23);
    
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(resource.description, pageWidth - 40);
    doc.text(descLines, 20, 50);
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Included Resources:", 20, 75);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    resource.items.forEach((item, i) => {
      doc.text(`• ${item}`, 25, 90 + (i * 10));
    });
  });
  
  doc.save("chapter-chaplain-toolkit-complete.pdf");
  toast.success("Downloaded: Complete Chaplain Toolkit");
}

export default function ChapterChaplainToolkit() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Chapter Chaplain Toolkit"
          description="Everything you need to lead your chapter spiritually—meeting guides, devotionals, and crisis support resources."
          badge={{ text: "Ministry Resource", variant: "default" }}
        />

        {/* Value Proposition */}
        <Card className="mb-8 bg-gradient-to-r from-sacred/10 to-purple-500/10 border-sacred/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-sacred" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">What OmegaFi Can't Offer</h3>
                  <p className="text-sm text-muted-foreground">
                    Chapter management software handles dues—we handle souls.
                  </p>
                </div>
              </div>
              <Button onClick={generateFullToolkit} className="bg-sacred hover:bg-sacred/90">
                <Download className="w-4 h-4 mr-2" />
                Download Complete Toolkit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Wins */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-sacred" />
            Quick Wins (Start Today)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickWins.map((win, index) => (
              <Card key={index} className="border-border/50 hover:border-sacred/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{win.time}</span>
                  </div>
                  <h4 className="font-medium text-foreground text-sm mb-1">{win.title}</h4>
                  <p className="text-xs text-muted-foreground">{win.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Resources */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-sacred" />
            Chaplain Resources
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            {toolkitResources.map((resource) => (
              <AccordionItem 
                key={resource.id} 
                value={resource.id}
                className="border border-border/50 rounded-lg px-4 data-[state=open]:border-sacred/50"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-lg bg-sacred/10 flex items-center justify-center flex-shrink-0">
                      <resource.icon className="w-5 h-5 text-sacred" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{resource.title}</span>
                        <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{resource.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="ml-14 space-y-4">
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">What's Included:</h4>
                      <ul className="space-y-1">
                        {resource.items.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={() => generatePDF(resource)} 
                      variant="outline"
                      className="border-sacred/50 text-sacred hover:bg-sacred/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Call to Action */}
        <Card className="mt-8 border-sacred/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Want More Resources?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              We're building chapter-specific curriculum and live chaplain training. 
              Join our waitlist to be the first to know.
            </p>
            <Button variant="outline">
              Join Chaplain Network Waitlist
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
