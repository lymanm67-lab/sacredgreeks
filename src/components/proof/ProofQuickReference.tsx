import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Sparkles, 
  Scale, 
  Eye, 
  Building, 
  Download, 
  Share2, 
  Copy, 
  Check,
  BookOpen
} from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

const proofResponses = [
  {
    letter: "P",
    word: "Pledge Process",
    criticism: "Hazing Concerns",
    response: "Biblical mentorship involves testing character, not abusing it. We reject hazing while embracing accountability and growth through godly community (Hebrews 10:24-25).",
    scripture: "Hebrews 10:24-25",
    icon: Target,
    color: "from-blue-500 to-blue-600",
  },
  {
    letter: "R",
    word: "Rituals",
    criticism: "Demonic Portals",
    response: "Not all ceremonies are worship. Many rituals focus on history, values, and commitment—like weddings or graduations. We discern based on content, not assumption (1 Thessalonians 5:21).",
    scripture: "1 Thessalonians 5:21",
    icon: Sparkles,
    color: "from-purple-500 to-purple-600",
  },
  {
    letter: "O",
    word: "Oaths",
    criticism: "Greek Deity Allegiance",
    response: "Using Greek letters doesn't mean worshiping Greek gods. Paul used Greek language and culture to spread the Gospel without endorsing paganism (Acts 17:22-28).",
    scripture: "Acts 17:22-28",
    icon: Scale,
    color: "from-orange-500 to-orange-600",
  },
  {
    letter: "O",
    word: "Obscurity",
    criticism: "Secret Societies",
    response: "Privacy is not secrecy. Jesus had inner-circle moments with Peter, James, and John. Private ceremonies can simply mean membership-only experiences (Mark 5:37).",
    scripture: "Mark 5:37",
    icon: Eye,
    color: "from-green-500 to-green-600",
  },
  {
    letter: "F",
    word: "Founders",
    criticism: "Masonic Connections",
    response: "An organization's origin doesn't determine its current purpose. Many institutions with complex histories serve godly purposes today. We are new creations in Christ (2 Corinthians 5:17).",
    scripture: "2 Corinthians 5:17",
    icon: Building,
    color: "from-red-500 to-red-600",
  },
];

export function ProofQuickReference() {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const text = proofResponses
      .map(
        (p) =>
          `${p.letter} - ${p.word} (${p.criticism})\n${p.response}\nScripture: ${p.scripture}`
      )
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleShare = async () => {
    const text = `P.R.O.O.F. Framework - Biblical Responses to Greek Life Criticisms\n\n${proofResponses
      .map((p) => `${p.letter} - ${p.word}: ${p.response}`)
      .join("\n\n")}\n\nLearn more at Sacred Greeks`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "P.R.O.O.F. Framework",
          text,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard for sharing!");
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = "PROOF-Quick-Reference.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Image downloaded!");
    } catch {
      toast.error("Failed to download image");
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">P.R.O.O.F. Quick Reference</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Biblical responses to common anti-Greek life criticisms
        </p>
      </CardHeader>

      <CardContent ref={cardRef} className="space-y-3">
        {proofResponses.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.letter + item.word}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-3 p-3 rounded-lg bg-muted/40 border border-border/50"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}
              >
                <span className="text-sm font-bold text-white">{item.letter}</span>
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-foreground text-sm">
                    {item.word}
                  </h4>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {item.criticism}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.response}
                </p>
                <p className="text-[10px] text-primary font-medium">
                  📖 {item.scripture}
                </p>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
