import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share2, 
  Copy, 
  Check,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Quote,
  AlertTriangle,
  Heart,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PROOF_FRAMEWORK_DATA, generateShareableText, type ProofItem } from "@/lib/proofFrameworkData";

export function ProofQuickReference() {
  const [copied, setCopied] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [allExpanded, setAllExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleItem = (key: string) => {
    if (allExpanded) {
      setAllExpanded(false);
      setExpandedItems([key]);
    } else {
      setExpandedItems(prev => 
        prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
      );
    }
  };

  const toggleAll = () => {
    if (allExpanded) {
      setAllExpanded(false);
      setExpandedItems([]);
    } else {
      setAllExpanded(true);
      setExpandedItems(PROOF_FRAMEWORK_DATA.map(p => p.letter + p.title));
    }
  };

  const handleCopy = async () => {
    const text = PROOF_FRAMEWORK_DATA
      .map(
        (p) =>
          `${p.letter} - ${p.title} (${p.criticism})\n${p.response}\nScripture: ${p.scripture}`
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
    const text = `P.R.O.O.F. Framework - Biblical Responses to Greek Life Criticisms\n\n${PROOF_FRAMEWORK_DATA
      .map((p) => `${p.letter} - ${p.title}: ${p.response}`)
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

  const handleShareItem = async (item: ProofItem) => {
    const text = generateShareableText(item);

    if (navigator.share) {
      try {
        await navigator.share({
          title: `P.R.O.O.F. - ${item.letter}: ${item.title}`,
          text,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Response copied for sharing!");
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
              variant="ghost"
              size="sm"
              onClick={toggleAll}
              className="gap-1.5"
            >
              {allExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{allExpanded ? "Collapse" : "Expand All"}</span>
            </Button>
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
        <div className="mt-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-start gap-2">
            <Heart className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-purple-400 mb-1">About the Conscience Principle</p>
              <p className="text-xs text-muted-foreground">
                Scripture teaches that believers may hold different convictions on secondary matters while remaining faithful (Romans 14). What defiles one person's conscience may be permissible for another—but both must act from faith, not against their convictions.
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent ref={cardRef} className="space-y-3">
        {PROOF_FRAMEWORK_DATA.map((item, index) => {
          const Icon = item.icon;
          const itemKey = item.letter + item.title;
          const isExpanded = allExpanded || expandedItems.includes(itemKey);
          
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
                          {item.title}
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
                        {/* Criticism Example */}
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[10px] font-medium text-destructive uppercase tracking-wide mb-1">Common Criticism:</p>
                              <p className="text-xs text-muted-foreground italic">{item.criticismExample}</p>
                            </div>
                          </div>
                        </div>

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

                        {/* Conscience Principle */}
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <div className="flex items-start gap-2">
                            <Heart className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[10px] font-medium text-purple-400 uppercase tracking-wide mb-1">Conscience Principle:</p>
                              <p className="text-xs text-foreground font-medium">{item.supportingScripture}</p>
                              <p className="text-xs text-muted-foreground italic mt-1">"{item.supportingText}"</p>
                            </div>
                          </div>
                        </div>

                        {/* Core Principle - Only for Rituals */}
                        {item.corePrinciple && (
                          <div className="p-3 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                            <div className="flex items-start gap-2">
                              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-[10px] font-medium text-amber-400 uppercase tracking-wide mb-1">{item.corePrinciple.title}:</p>
                                <p className="text-xs text-foreground leading-relaxed mb-2">{item.corePrinciple.text}</p>
                                <div className="bg-background/30 rounded p-2 border-l-2 border-amber-400/50">
                                  <p className="text-xs text-white/90 italic">"{item.corePrinciple.scriptureText}"</p>
                                  <p className="text-[10px] text-amber-400/80 mt-1 font-medium">— {item.corePrinciple.scripture}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

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

                        {/* Share Button */}
                        <div className="flex justify-end pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShareItem(item);
                            }}
                            className="gap-1.5 text-xs"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            Share This Response
                          </Button>
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
