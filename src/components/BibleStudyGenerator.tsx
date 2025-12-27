import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Download, Printer, Clock, Users, CheckCircle2, MessageSquare } from "lucide-react";

interface StudyPlan {
  week: number;
  theme: string;
  proofLetter: string;
  title: string;
  openingPrayer: string;
  scriptures: { ref: string; text: string }[];
  discussion: string[];
  application: string;
  closingChallenge: string;
  homework: string;
}

const studyPlans: StudyPlan[] = [
  {
    week: 1,
    theme: "P - Pledge Process",
    proofLetter: "P",
    title: "Discipleship & Initiation",
    openingPrayer: "Lord, help us understand that true discipleship requires commitment, sacrifice, and transformation. Open our hearts to Your Word.",
    scriptures: [
      { ref: "Matthew 28:19-20", text: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you." },
      { ref: "Luke 9:23", text: "If anyone would come after me, let him deny himself and take up his cross daily and follow me." },
      { ref: "2 Timothy 2:2", text: "And what you have heard from me in the presence of many witnesses entrust to faithful men, who will be able to teach others also." }
    ],
    discussion: [
      "How does Jesus's method of making disciples compare to intake processes?",
      "What elements of 'dying to self' appear in both Christian discipleship and Greek initiation?",
      "How can we ensure our pledge processes honor God rather than contradict His commands?",
      "What distinguishes healthy accountability from harmful hazing?"
    ],
    application: "This week, evaluate any initiation or membership process you've participated in. Identify elements that align with biblical discipleship and areas that might need reform.",
    closingChallenge: "Write a prayer dedicating your Greek membership to God's purposes.",
    homework: "Read Chapter 1 of 'Sacred, Not Sinful' and journal about how discipleship appears in your organization."
  },
  {
    week: 2,
    theme: "R - Rituals",
    proofLetter: "R",
    title: "Sacred Ceremonies & Meaning",
    openingPrayer: "Father, You established rituals throughout Scripture to remind us of Your faithfulness. Help us discern what honors You.",
    scriptures: [
      { ref: "Luke 22:19", text: "And he took bread, and when he had given thanks, he broke it and gave it to them, saying, 'This is my body, which is given for you. Do this in remembrance of me.'" },
      { ref: "Exodus 12:14", text: "This day shall be for you a memorial day, and you shall keep it as a feast to the Lord; throughout your generations, as a statute forever." },
      { ref: "Colossians 2:17", text: "These are a shadow of the things to come, but the substance belongs to Christ." }
    ],
    discussion: [
      "What rituals did God institute for Israel? For the Church?",
      "How does meaning and intention affect whether a ritual is honoring to God?",
      "Can rituals with pagan origins be redeemed? What biblical examples support your answer?",
      "How should we evaluate the rituals in our organizations?"
    ],
    application: "Identify one ritual in your organization. Research its origin and current meaning. Determine if it conflicts with Scripture.",
    closingChallenge: "Lead a discussion in your chapter about the spiritual meaning behind your organization's key ceremony.",
    homework: "Study how the early church adopted and transformed cultural practices (church architecture, feast days, etc.)."
  },
  {
    week: 3,
    theme: "O - Oaths",
    proofLetter: "O",
    title: "Vows, Commitments & Integrity",
    openingPrayer: "Lord, You are a covenant-keeping God. Teach us the weight of our words and the sacredness of commitments.",
    scriptures: [
      { ref: "Psalm 119:106", text: "I have taken an oath and confirmed it, that I will follow your righteous laws." },
      { ref: "Matthew 5:33-37", text: "Again you have heard that it was said to those of old, 'You shall not swear falsely, but shall perform to the Lord what you have sworn.' But I say to you, Do not take an oath at all..." },
      { ref: "Ecclesiastes 5:4-5", text: "When you vow a vow to God, do not delay paying it, for he has no pleasure in fools. Pay what you vow." }
    ],
    discussion: [
      "What is Jesus actually condemning in Matthew 5:33-37? Is it all oaths or careless oaths?",
      "How do marriage vows, military oaths, and courtroom oaths fit with Jesus's teaching?",
      "What distinguishes a godly commitment from a sinful oath?",
      "Should Christians evaluate their organization's oath for conflicting loyalties?"
    ],
    application: "Review any oaths or pledges you've made. Do any conflict with your commitment to Christ? How might you address this?",
    closingChallenge: "Write a personal covenant that places Christ above all other loyalties while honoring your organizational commitments.",
    homework: "Study Nehemiah 10 where the people make a formal oath. Note the content and context."
  },
  {
    week: 4,
    theme: "O - Obscurity (Secrecy)",
    proofLetter: "O",
    title: "Transparency, Privacy & Sacred Knowledge",
    openingPrayer: "Jesus, You are the Light of the world, yet even You practiced strategic confidentiality. Give us wisdom to know the difference between deception and discretion.",
    scriptures: [
      { ref: "Matthew 17:9", text: "And as they were coming down the mountain, Jesus commanded them, 'Tell no one the vision, until the Son of Man is raised from the dead.'" },
      { ref: "Matthew 7:6", text: "Do not give dogs what is holy, and do not throw your pearls before pigs, lest they trample them underfoot and turn to attack you." },
      { ref: "Mark 4:11", text: "And he said to them, 'To you has been given the secret of the kingdom of God, but for those outside everything is in parables.'" }
    ],
    discussion: [
      "Why did Jesus sometimes command secrecy? What purpose did it serve?",
      "What is the difference between hiding evil and protecting sacred knowledge?",
      "How did the early church practice 'Disciplina Arcani' (discipline of the secret)?",
      "When does organizational secrecy become problematic from a biblical standpoint?"
    ],
    application: "Evaluate your organization's secrets. Are they protecting something sacred or hiding something shameful?",
    closingChallenge: "If your organization has practices that must be hidden because they're wrong, begin prayerfully considering how to address this.",
    homework: "Research the catechumenate process in the early church and note its elements of progressive revelation."
  },
  {
    week: 5,
    theme: "F - Founding",
    proofLetter: "F",
    title: "Redemption, Transformation & Legacy",
    openingPrayer: "God of redemption, You make all things new. Show us how to transform our organizations for Your glory.",
    scriptures: [
      { ref: "Romans 12:2", text: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect." },
      { ref: "Daniel 6:3", text: "Then this Daniel became distinguished above all the other high officials and satraps, because an excellent spirit was in him." },
      { ref: "1 Corinthians 7:17", text: "Only let each person lead the life that the Lord has assigned to him, and to which God has called him." }
    ],
    discussion: [
      "How did Daniel, Esther, and Joseph serve in secular systems while maintaining their faith?",
      "What is the difference between participating in culture and being conformed to it?",
      "How can Christians transform their organizations from within?",
      "What legacy do you want to leave in your chapter?"
    ],
    application: "Identify one specific way you can bring positive transformation to your organization this semester.",
    closingChallenge: "Develop a vision statement for what a Christ-centered chapter would look like.",
    homework: "Complete the full P.R.O.O.F. assessment and reflect on your results."
  }
];

export const BibleStudyGenerator = () => {
  const [selectedWeek, setSelectedWeek] = useState<string>("1");
  const [format, setFormat] = useState<"individual" | "group">("group");

  const currentPlan = studyPlans.find(p => p.week === parseInt(selectedWeek)) || studyPlans[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(`Week ${currentPlan.week}: ${currentPlan.title}`, 20, 20);
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Theme: ${currentPlan.theme}`, 20, 30);
      
      let y = 45;
      
      doc.setFont("helvetica", "bold");
      doc.text("Opening Prayer:", 20, y);
      doc.setFont("helvetica", "normal");
      y += 7;
      const prayerLines = doc.splitTextToSize(currentPlan.openingPrayer, 170);
      doc.text(prayerLines, 20, y);
      y += prayerLines.length * 5 + 10;
      
      doc.setFont("helvetica", "bold");
      doc.text("Scriptures:", 20, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      currentPlan.scriptures.forEach(s => {
        doc.setFont("helvetica", "bold");
        doc.text(s.ref, 20, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        const textLines = doc.splitTextToSize(s.text, 170);
        doc.text(textLines, 20, y);
        y += textLines.length * 5 + 5;
      });
      
      if (y > 220) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFont("helvetica", "bold");
      doc.text("Discussion Questions:", 20, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      currentPlan.discussion.forEach((q, i) => {
        const qLines = doc.splitTextToSize(`${i + 1}. ${q}`, 170);
        doc.text(qLines, 20, y);
        y += qLines.length * 5 + 3;
      });
      
      doc.save(`bible-study-week-${currentPlan.week}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
    }
  };

  return (
    <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-xl">P.R.O.O.F. Bible Study Generator</CardTitle>
              <CardDescription>5-week curriculum based on Sacred, Not Sinful</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Select Week</label>
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {studyPlans.map(plan => (
                  <SelectItem key={plan.week} value={plan.week.toString()}>
                    Week {plan.week}: {plan.proofLetter} - {plan.title.split(':')[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Format</label>
            <Tabs value={format} onValueChange={(v) => setFormat(v as "individual" | "group")}>
              <TabsList>
                <TabsTrigger value="group" className="gap-2">
                  <Users className="w-4 h-4" />
                  Group Study
                </TabsTrigger>
                <TabsTrigger value="individual" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Personal
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Week Progress */}
        <div className="flex gap-2">
          {studyPlans.map(plan => (
            <button
              key={plan.week}
              onClick={() => setSelectedWeek(plan.week.toString())}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                parseInt(selectedWeek) === plan.week
                  ? "bg-emerald-500 text-white scale-110"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {plan.proofLetter}
            </button>
          ))}
        </div>

        {/* Study Content */}
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
              <Badge className="bg-emerald-500 text-white mb-2">Week {currentPlan.week}</Badge>
              <h3 className="text-xl font-bold text-foreground">{currentPlan.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                P.R.O.O.F. Framework: {currentPlan.theme}
              </p>
            </div>

            {/* Opening Prayer */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sacred/20 text-sacred flex items-center justify-center text-xs">1</span>
                Opening Prayer
              </h4>
              <p className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-lg">
                "{currentPlan.openingPrayer}"
              </p>
            </div>

            {/* Scriptures */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sacred/20 text-sacred flex items-center justify-center text-xs">2</span>
                Key Scriptures
              </h4>
              {currentPlan.scriptures.map((scripture, idx) => (
                <div key={idx} className="bg-sacred/5 border-l-4 border-sacred p-3 rounded-r-lg">
                  <p className="text-sm italic text-foreground">"{scripture.text}"</p>
                  <p className="text-xs font-semibold text-sacred mt-1">— {scripture.ref}</p>
                </div>
              ))}
            </div>

            {/* Discussion */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sacred/20 text-sacred flex items-center justify-center text-xs">3</span>
                <MessageSquare className="w-4 h-4" />
                Discussion Questions
              </h4>
              <ol className="space-y-2">
                {currentPlan.discussion.map((question, idx) => (
                  <li key={idx} className="flex gap-3 text-sm">
                    <span className="text-sacred font-bold">{idx + 1}.</span>
                    <span className="text-muted-foreground">{question}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Application */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sacred/20 text-sacred flex items-center justify-center text-xs">4</span>
                <CheckCircle2 className="w-4 h-4" />
                Application
              </h4>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                {currentPlan.application}
              </p>
            </div>

            {/* Closing Challenge */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sacred/20 text-sacred flex items-center justify-center text-xs">5</span>
                Closing Challenge
              </h4>
              <p className="text-sm font-medium text-foreground bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                {currentPlan.closingChallenge}
              </p>
            </div>

            {/* Homework */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sacred/20 text-sacred flex items-center justify-center text-xs">6</span>
                Homework
              </h4>
              <p className="text-sm text-muted-foreground">
                {currentPlan.homework}
              </p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
