import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  BookOpen,
  ChevronDown,
  Quote
} from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const proofResponses = [
  {
    letter: "P",
    word: "Pledge Process",
    criticism: "Hazing Concerns",
    response: "Biblical mentorship involves testing character, not abusing it. We reject hazing while embracing accountability and growth through godly community.",
    scripture: "Hebrews 10:24-25",
    scriptureText: "And let us consider how to stir up one another to love and good works, not neglecting to meet together...",
    icon: Target,
    color: "bg-blue-500",
    gradientColor: "from-blue-500 to-blue-600",
    examples: [
      {
        myth: "Pledging always involves hazing and abuse",
        truth: "True discipleship involves mentorship, not abuse. Jesus tested His disciples through teaching and experience, never through degradation.",
        additionalScripture: "Proverbs 27:17"
      },
      {
        myth: "You must endure suffering to prove loyalty",
        truth: "Loyalty is proven through commitment and character over time, not through inflicted pain. Christ calls us to serve one another in love.",
        additionalScripture: "Galatians 5:13"
      }
    ]
  },
  {
    letter: "R",
    word: "Rituals",
    criticism: "Demonic Portals",
    response: "Not all ceremonies are worship. Many rituals focus on history, values, and commitment—like weddings or graduations. We discern based on content, not assumption.",
    scripture: "1 Thessalonians 5:21",
    scriptureText: "Test everything; hold fast what is good.",
    icon: Sparkles,
    color: "bg-purple-500",
    gradientColor: "from-purple-500 to-purple-600",
    examples: [
      {
        myth: "All Greek rituals are demonic or occult",
        truth: "Many rituals simply commemorate history and values. Even the early church had ceremonies. We must examine content, not just form.",
        additionalScripture: "1 Corinthians 11:23-26"
      },
      {
        myth: "Candles and robes indicate pagan worship",
        truth: "Candles symbolize light and knowledge in many contexts. Churches use candles, robes, and ceremonies without issue. Context determines meaning.",
        additionalScripture: "Matthew 5:14-16"
      }
    ]
  },
  {
    letter: "O",
    word: "Oaths",
    criticism: "Greek Deity Allegiance",
    response: "Using Greek letters doesn't mean worshiping Greek gods. Paul used Greek language and culture to spread the Gospel without endorsing paganism.",
    scripture: "Acts 17:22-28",
    scriptureText: "For as I passed along and observed the objects of your worship, I found also an altar with this inscription: 'To the unknown god.'...",
    icon: Scale,
    color: "bg-orange-500",
    gradientColor: "from-orange-500 to-orange-600",
    examples: [
      {
        myth: "Greek letters represent worship of Greek gods",
        truth: "Greek letters are simply an alphabet. Using them is no different from using Roman numerals or Latin phrases. Paul wrote in Greek!",
        additionalScripture: "1 Corinthians 9:22"
      },
      {
        myth: "Oaths violate Jesus' teaching against swearing",
        truth: "Jesus warned against flippant oaths and lying. Solemn commitments made in integrity are different—even God made covenant oaths.",
        additionalScripture: "Hebrews 6:13-17"
      }
    ]
  },
  {
    letter: "O",
    word: "Obscurity",
    criticism: "Secret Societies",
    response: "Privacy is not secrecy. Jesus had inner-circle moments with Peter, James, and John. Private ceremonies can simply mean membership-only experiences.",
    scripture: "Mark 5:37",
    scriptureText: "And he allowed no one to follow him except Peter and James and John the brother of James.",
    icon: Eye,
    color: "bg-green-500",
    gradientColor: "from-green-500 to-green-600",
    examples: [
      {
        myth: "Secret rituals mean there's something evil to hide",
        truth: "Even Jesus taught some things privately to His disciples. Privacy can protect sacred moments, not hide wickedness.",
        additionalScripture: "Matthew 13:10-11"
      },
      {
        myth: "Christians should have no secrets",
        truth: "The Bible distinguishes between evil done in darkness and wisdom about when and how to share. Not everything private is sinful.",
        additionalScripture: "Proverbs 11:13"
      }
    ]
  },
  {
    letter: "F",
    word: "Founders",
    criticism: "Masonic Connections",
    response: "An organization's origin doesn't determine its current purpose. Many institutions with complex histories serve godly purposes today. We are new creations in Christ.",
    scripture: "2 Corinthians 5:17",
    scriptureText: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.",
    icon: Building,
    color: "bg-red-500",
    gradientColor: "from-red-500 to-red-600",
    examples: [
      {
        myth: "Founders' beliefs forever define the organization",
        truth: "Many universities, hospitals, and even denominations have evolved beyond their founders' original beliefs. Transformation is biblical.",
        additionalScripture: "Romans 12:2"
      },
      {
        myth: "Any Masonic connection makes the organization evil",
        truth: "Many influential Christians throughout history had Masonic ties. We judge fruit, not ancestry. What does the organization do NOW?",
        additionalScripture: "Matthew 7:16-20"
      }
    ]
  },
];

export function ProofQuickReference() {
  const [copied, setCopied] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleItem = (key: string) => {
    setExpandedItems(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

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
          Biblical responses to common anti-Greek life criticisms. Tap each card to see examples.
        </p>
      </CardHeader>

      <CardContent ref={cardRef} className="space-y-3">
        {proofResponses.map((item, index) => {
          const Icon = item.icon;
          const itemKey = item.letter + item.word;
          const isExpanded = expandedItems.includes(itemKey);
          
          return (
            <Collapsible key={itemKey} open={isExpanded} onOpenChange={() => toggleItem(itemKey)}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg bg-muted/40 border border-border/50 overflow-hidden"
              >
                <CollapsibleTrigger asChild>
                  <button className="w-full flex gap-3 p-3 hover:bg-muted/60 transition-colors text-left">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg ${item.color} flex items-center justify-center shadow-sm`}
                    >
                      <span className="text-sm font-bold text-white">{item.letter}</span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-foreground text-sm">
                          {item.word}
                        </h4>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {item.criticism}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {item.response}
                      </p>
                      <p className="text-[10px] text-primary font-medium">
                        📖 {item.scripture}
                      </p>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 self-center"
                    >
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 pb-3 space-y-3"
                      >
                        {/* Scripture Quote */}
                        <div className={`bg-gradient-to-r ${item.gradientColor} bg-opacity-10 rounded-lg p-3 border-l-4`} style={{ borderLeftColor: `var(--${item.color.replace('bg-', '')})` }}>
                          <div className="flex gap-2">
                            <Quote className="w-4 h-4 text-white/80 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs text-white/90 italic leading-relaxed">
                                "{item.scriptureText}"
                              </p>
                              <p className="text-[10px] text-white/70 mt-1 font-medium">
                                — {item.scripture}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Examples */}
                        <div className="space-y-2">
                          <h5 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                            Common Myths & Biblical Truth
                          </h5>
                          {item.examples.map((example, i) => (
                            <div key={i} className="bg-background/50 rounded-lg p-2.5 border border-border/30 space-y-2">
                              <div>
                                <span className="text-[10px] font-medium text-destructive uppercase tracking-wide">Myth:</span>
                                <p className="text-xs text-muted-foreground italic">"{example.myth}"</p>
                              </div>
                              <div>
                                <span className="text-[10px] font-medium text-primary uppercase tracking-wide">Truth:</span>
                                <p className="text-xs text-foreground">{example.truth}</p>
                              </div>
                              <p className="text-[10px] text-muted-foreground">
                                📖 See also: <span className="text-primary font-medium">{example.additionalScripture}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CollapsibleContent>
              </motion.div>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
}
