import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ExternalLink, RefreshCw } from "lucide-react";
import { SacredGreeksAnswers, SacredGreeksScores, ResultType } from "@/types/assessment";

interface SacredGreeksResultsProps {
  resultType: ResultType;
  scores: SacredGreeksScores;
  answers: SacredGreeksAnswers;
  onRestart: () => void;
}

export function SacredGreeksResults({ resultType, scores, answers, onRestart }: SacredGreeksResultsProps) {
  const getIntro = () => {
    switch (resultType) {
      case 'high_pressure':
        return "You're carrying a lot right now. Let's slow down and process this together using the P.R.O.O.F. framework.";
      case 'ministry_idea':
        return "You want to honor Christ in your organization. Let's explore how to design faith-based events that keep Him central.";
      default:
        return "You're not alone in navigating this. Let's work through biblical clarity using the P.R.O.O.F. framework.";
    }
  };

  const proofSections = [
    {
      title: "Process: Transform Pledging into Discipleship",
      content: resultType === 'high_pressure'
        ? "Before making any vows under pressure, pause. God isn't rushing you. True discipleship means following Christ first, not following fear. If someone is pressuring you to denounce, ask yourself: Am I being discipled or manipulated? Healthy spiritual guidance invites questions, not demands."
        : resultType === 'ministry_idea'
        ? "Your event can be a discipleship moment. Frame activities around spiritual growth, not just tradition. What would it look like to make this event about becoming more like Christ? Consider using Bible study, prayer, and testimony as core elements."
        : "You've heard harsh claims about BGLOs. Instead of reacting, let's process biblically. What does Scripture say about community, tradition, and conscience? Don't let fear-based messages rush you into decisions. Take time to study, pray, and ask wise advisors—not just people who already agree with you."
    },
    {
      title: "Rituals: View Symbols as Parables in Action",
      content: resultType === 'ministry_idea'
        ? "Symbols can point to Christ without becoming idols. If you're planning an event with Greek imagery, ask: Does this symbol help people see Jesus clearer, or does it compete with Him? You can respect your letters while making Christ unmistakably central."
        : "Rituals and symbols aren't automatically sinful. Jesus used bread and wine to point to His body and blood. The question is: Does the ritual point to Christ or away from Him? Examine your org's rituals honestly. If something feels unclear or uncomfortable, it's okay to step back and pray about it."
    },
    {
      title: "Oaths: Focus Vows on Biblical Principles",
      content: resultType === 'high_pressure'
        ? "If you're being told all oaths are sinful, remember: Jesus didn't forbid commitment. He warned against empty, manipulative vows. The real question is—does your vow contradict Scripture, or can it align with biblical values? Don't make new vows out of fear. And don't break old ones without deep prayer and counsel."
        : "Oaths should align with God's Word, not compete with it. Before committing to anything—whether staying in your org or leaving—ask: Does this vow honor God, or does it divide my heart? You can love your letters and love Jesus, as long as Christ remains first."
    },
    {
      title: "Obscurity: Let Your Light Shine Through BGLOs",
      content: resultType === 'ministry_idea'
        ? "Your event is an opportunity to let your light shine. Be clear about who Jesus is and what He's done for you. Don't water down the gospel to fit in. At the same time, don't be preachy or condescending. Speak truth with love, and trust the Holy Spirit to do the work."
        : resultType === 'high_pressure'
        ? "If someone says you can't be saved and be Greek, that's not biblical. Your salvation is in Christ alone—not in resigning from anything. But also ask: Is my membership helping me shine for Jesus, or is it hiding my light? Let Christ be seen clearly in your life, wherever you are."
        : "Jesus said, 'Let your light shine before others.' That includes Greek spaces. If you're in a BGLO, people are watching how you live. Are they seeing Christ in you? If you're considering joining, ask: Will this help me shine brighter for Jesus, or will it dim my light?"
    },
    {
      title: "Founding: Create a New Christ-Honoring Legacy",
      content: resultType === 'ministry_idea'
        ? "You have a chance to start something new in your chapter—a legacy of faith. Even if others aren't interested, you can be the one who prays, serves, and points people to Jesus. Don't underestimate what God can do through one faithful person."
        : "You don't have to repeat old patterns. Whether you stay or go, you can create a new legacy—one that honors Christ. If you stay, be a faithful witness. If you leave, do it with grace and love, not bitterness. Either way, your legacy is about who you're following: Jesus."
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-sacred/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-sacred/10 flex items-center justify-center">
              <Heart className="w-8 h-8 text-sacred" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">Your P.R.O.O.F. Guidance</CardTitle>
              <CardDescription className="text-base">{getIntro()}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {proofSections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-xl">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{section.content}</p>
          </CardContent>
        </Card>
      ))}

      {/* 5 Persona Types Integration - Show for high_pressure or all results */}
      {(resultType === 'high_pressure' || true) && (
        <Card className="bg-muted/50 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Understand how you show up under pressure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Want to better understand how you naturally respond in conflict and pressure situations? 
              Take the 5 Persona Types Architecture Assessment.
            </p>
            <Button
              className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground"
              asChild
            >
              <a href="https://drlymanmontgomery.involve.me/fmmpa" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Take the 5 Persona Types Assessment
              </a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* CTAs */}
      <Card className="bg-sacred/5">
        <CardHeader>
          <CardTitle>Continue Your Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Button
              variant="outline"
              className="justify-start"
              asChild
            >
              <a href="https://sacredgreeks.com/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Sacred Greeks
              </a>
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              asChild
            >
              <a href="https://sacredgreeks.com/#card-mwywcoy7nqn2if3" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Start Here
              </a>
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              asChild
            >
              <a href="https://sacredgreeks.com/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Read "Sacred, Not Sinful"
              </a>
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              asChild
            >
              <a href="https://gamma.app/docs/Christian-Greek-Life-Study-Guide-ihr8fq0g089n32t" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Use the Christian Greek Life Study Guide
              </a>
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              asChild
            >
              <a href="https://sacredgreeks.com/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Listen to the Sacred Greeks Podcast
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Capture */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Send this reflection to my email</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={(e) => {
            e.preventDefault();
            const email = (e.target as any).email.value;
            // TODO: Implement email sending and update submission
            console.log('Email capture:', email);
          }}>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-sacred"
              required
            />
            <Button type="submit" className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground">
              Send me a copy
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Restart */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={onRestart}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
