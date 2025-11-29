import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  FileText, 
  Presentation,
  Home,
  Calendar,
  BookOpen,
  PenLine,
  Search,
  Trophy,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

// Import AI-generated screenshots
import dashboardScreenshot from "@/assets/guide/dashboard-screenshot.png";
import prayerJournalScreenshot from "@/assets/guide/prayer-journal-screenshot.png";
import devotionalScreenshot from "@/assets/guide/devotional-screenshot.png";
import journeyScreenshot from "@/assets/guide/journey-screenshot.png";
import bibleStudyScreenshot from "@/assets/guide/bible-study-screenshot.png";
import achievementsScreenshot from "@/assets/guide/achievements-screenshot.png";

const guideContent = [
  {
    id: "dashboard",
    title: "Dashboard Overview",
    icon: Home,
    screenshot: dashboardScreenshot,
    description: "Your central hub for all Sacred Greeks features",
    steps: [
      "After signing in, you'll land on your personalized dashboard",
      "View your daily verse and devotional at the top",
      "Quick access cards show your progress and upcoming tasks",
      "Navigate to any feature using the cards or menu",
      "Track your streaks and achievements from the stats bar"
    ],
    tips: [
      "Check your dashboard daily for new content",
      "Use the quick actions for common tasks",
      "Your progress is automatically saved"
    ]
  },
  {
    id: "devotional",
    title: "Daily Devotionals",
    icon: Calendar,
    screenshot: devotionalScreenshot,
    description: "Start each day with Scripture-based reflections",
    steps: [
      "Access daily devotionals from the dashboard or menu",
      "Read the Scripture passage for the day",
      "Reflect on the P.R.O.O.F. framework application",
      "Write your personal notes and thoughts",
      "Mark as complete to track your progress"
    ],
    tips: [
      "Set a reminder to read devotionals at the same time each day",
      "Use the audio feature to listen while commuting",
      "Share meaningful devotionals with friends"
    ]
  },
  {
    id: "prayer-journal",
    title: "Prayer Journal",
    icon: PenLine,
    screenshot: prayerJournalScreenshot,
    description: "Track your prayers and see God's faithfulness",
    steps: [
      "Create new prayer entries with title and description",
      "Categorize prayers by type (personal, family, chapter, etc.)",
      "Mark prayers as answered when God responds",
      "Add thanksgiving notes to answered prayers",
      "Review your prayer history and patterns"
    ],
    tips: [
      "Be specific in your prayer requests",
      "Regularly review answered prayers for encouragement",
      "Use voice input for quick entries"
    ]
  },
  {
    id: "journey",
    title: "30-Day Journey",
    icon: BookOpen,
    screenshot: journeyScreenshot,
    description: "A structured path through the P.R.O.O.F. framework",
    steps: [
      "Start day 1 to begin your journey",
      "Complete daily readings and reflections",
      "Answer reflection questions thoughtfully",
      "Track your progress with the journey map",
      "Earn achievements as you complete milestones"
    ],
    tips: [
      "Don't rush - take time to absorb each day's content",
      "Write personal notes for future reference",
      "Share your journey with accountability partners"
    ]
  },
  {
    id: "bible-study",
    title: "AI Bible Study Tools",
    icon: Search,
    screenshot: bibleStudyScreenshot,
    description: "Get AI-powered verse searches and study recommendations",
    steps: [
      "Enter a topic, question, or theme to search",
      "Browse AI-suggested relevant verses",
      "Save verses to your personal collection",
      "Get study recommendations based on your interests",
      "Explore cross-references and deeper insights"
    ],
    tips: [
      "Search for topics related to Greek life challenges",
      "Save searches for quick reference later",
      "Use the study recommendations feature"
    ]
  },
  {
    id: "achievements",
    title: "Achievements & Progress",
    icon: Trophy,
    screenshot: achievementsScreenshot,
    description: "Track your spiritual growth with gamification",
    steps: [
      "View all available achievements in the trophy room",
      "Complete actions to unlock new badges",
      "Track your points and current level",
      "Compare progress with your chapter or friends",
      "Celebrate milestones with special animations"
    ],
    tips: [
      "Focus on consistency over quantity",
      "Check the daily challenges for bonus points",
      "Share achievements to encourage others"
    ]
  }
];

const UserGuide = () => {
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Pop-up Blocked",
        description: "Please allow pop-ups to print the guide.",
        variant: "destructive"
      });
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Sacred Greeks Life App - User Guide</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px 20px;
              color: #333;
            }
            h1 {
              color: #3b82f6;
              border-bottom: 2px solid #3b82f6;
              padding-bottom: 10px;
            }
            h2 {
              color: #1e40af;
              margin-top: 30px;
            }
            .section {
              page-break-inside: avoid;
              margin-bottom: 40px;
            }
            .screenshot {
              max-width: 300px;
              border: 1px solid #ddd;
              border-radius: 8px;
              margin: 20px 0;
            }
            .steps {
              background: #f8fafc;
              padding: 15px 20px;
              border-radius: 8px;
              margin: 15px 0;
            }
            .tips {
              background: #fef3c7;
              padding: 15px 20px;
              border-radius: 8px;
              margin: 15px 0;
            }
            ul {
              padding-left: 20px;
            }
            li {
              margin-bottom: 8px;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              text-align: center;
              color: #666;
            }
            @media print {
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <h1>📖 Sacred Greeks Life App - User Guide</h1>
          <p>Your complete guide to navigating faith and Greek life with the Sacred Greeks Life App.</p>
          
          ${guideContent.map(section => `
            <div class="section">
              <h2>${section.title}</h2>
              <p><strong>${section.description}</strong></p>
              <img src="${section.screenshot}" alt="${section.title}" class="screenshot" />
              
              <div class="steps">
                <h3>How to Use:</h3>
                <ul>
                  ${section.steps.map(step => `<li>${step}</li>`).join('')}
                </ul>
              </div>
              
              <div class="tips">
                <h3>💡 Pro Tips:</h3>
                <ul>
                  ${section.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
          
          <div class="footer">
            <p>Sacred Greeks Life App &copy; ${new Date().getFullYear()}</p>
            <p>Visit sacredgreeks.com for more resources</p>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
    };
    
    toast({
      title: "Print Dialog Opened",
      description: "Your guide is ready to print!"
    });
  };

  const handleDownloadPDF = () => {
    // Use browser print to PDF functionality
    handlePrint();
    toast({
      title: "Save as PDF",
      description: "In the print dialog, select 'Save as PDF' as the destination."
    });
  };

  const handleDownloadPowerPoint = () => {
    // Generate a simple HTML that can be imported to PowerPoint
    const pptxContent = `
Sacred Greeks Life App - User Guide Presentation

${guideContent.map((section, index) => `
=== Slide ${index + 1}: ${section.title} ===

${section.description}

Steps:
${section.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

Tips:
${section.tips.map(tip => `• ${tip}`).join('\n')}

---
`).join('\n')}

=== Final Slide ===
Thank you for using Sacred Greeks Life App!
Visit sacredgreeks.com for more resources.
    `.trim();

    const blob = new Blob([pptxContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sacred-Greeks-User-Guide-Slides.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Presentation Outline Downloaded",
      description: "Import this outline into PowerPoint or Google Slides to create your presentation."
    });
  };

  const activeContent = guideContent.find(c => c.id === activeSection) || guideContent[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">User Guide</h1>
                <p className="text-sm text-muted-foreground">Learn how to use Sacred Greeks Life App</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Export Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-sacred" />
              Export Options
            </CardTitle>
            <CardDescription>
              Download or print this guide for offline reference
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleDownloadPDF} className="bg-sacred hover:bg-sacred/90">
                <Download className="h-4 w-4 mr-2" />
                View as PDF
              </Button>
              <Button onClick={handleDownloadPowerPoint} variant="outline">
                <Presentation className="h-4 w-4 mr-2" />
                PowerPoint Outline
              </Button>
              <Button onClick={handlePrint} variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print Guide
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6" ref={printRef}>
          {/* Navigation Sidebar */}
          <Card className="lg:col-span-1 h-fit lg:sticky lg:top-24">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Guide Sections</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] lg:h-auto">
                <div className="space-y-1 p-4 pt-0">
                  {guideContent.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                        activeSection === section.id
                          ? "bg-sacred text-white"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <section.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{section.title}</span>
                      {activeSection === section.id && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-sacred/10 rounded-lg">
                      <activeContent.icon className="h-6 w-6 text-sacred" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{activeContent.title}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {activeContent.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Section {guideContent.findIndex(c => c.id === activeSection) + 1} of {guideContent.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Screenshot */}
                <div className="flex justify-center">
                  <div className="relative max-w-xs">
                    <div className="absolute inset-0 bg-gradient-to-br from-sacred/20 to-purple-500/20 rounded-3xl blur-xl" />
                    <img
                      src={activeContent.screenshot}
                      alt={`${activeContent.title} screenshot`}
                      className="relative rounded-2xl border border-border shadow-2xl max-h-[400px] object-contain"
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-sacred" />
                    How to Use
                  </h3>
                  <ol className="space-y-3">
                    {activeContent.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sacred text-white text-sm flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <span className="text-foreground pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tips */}
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <CheckCircle2 className="h-5 w-5" />
                    Pro Tips
                  </h3>
                  <ul className="space-y-2">
                    {activeContent.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-amber-900 dark:text-amber-100">
                        <span className="text-amber-500">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const currentIndex = guideContent.findIndex(c => c.id === activeSection);
                      if (currentIndex > 0) {
                        setActiveSection(guideContent[currentIndex - 1].id);
                      }
                    }}
                    disabled={guideContent.findIndex(c => c.id === activeSection) === 0}
                  >
                    Previous Section
                  </Button>
                  <Button
                    onClick={() => {
                      const currentIndex = guideContent.findIndex(c => c.id === activeSection);
                      if (currentIndex < guideContent.length - 1) {
                        setActiveSection(guideContent[currentIndex + 1].id);
                      }
                    }}
                    disabled={guideContent.findIndex(c => c.id === activeSection) === guideContent.length - 1}
                    className="bg-sacred hover:bg-sacred/90"
                  >
                    Next Section
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ready to Get Started?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link to="/auth">
                    <Button variant="outline" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-2" />
                      Create Account
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="outline" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-2" />
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Link to="/journey">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start 30-Day Journey
                    </Button>
                  </Link>
                  <Link to="/faq">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
