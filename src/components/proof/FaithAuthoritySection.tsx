import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Sparkles, 
  Share2, 
  Download, 
  Check, 
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Heart
} from "lucide-react";
import { BELIEF_SCRIPTURES } from "@/lib/proofFrameworkData";
import { toast } from "sonner";
import { captureElementAsImage } from "@/lib/demo-export";

interface ScriptureCardProps {
  reference: string;
  text: string;
  principle: string;
  categoryColor: string;
  categoryIcon: React.ReactNode;
  onShare: () => void;
  onDownload: () => void;
  cardRef: React.RefObject<HTMLDivElement>;
}

function ScriptureCard({ 
  reference, 
  text, 
  principle, 
  categoryColor, 
  categoryIcon,
  onShare,
  onDownload,
  cardRef
}: ScriptureCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `${reference}\n\n"${text}"\n\n💡 ${principle}\n\n— Sacred Greeks`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Faith & Authority: ${reference}`,
          text: shareText,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
    onShare();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card 
        ref={cardRef}
        className={`relative overflow-hidden bg-gradient-to-br ${categoryColor} border-white/20 hover:border-white/40 transition-all duration-300 group`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400" />
        <CardContent className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              {categoryIcon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-amber-400 font-bold text-lg">{reference}</p>
            </div>
          </div>
          
          <blockquote className="text-white/90 italic text-sm mb-4 pl-4 border-l-2 border-amber-400/50">
            "{text}"
          </blockquote>
          
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-white/70 text-xs">
              <span className="text-amber-300 font-medium">💡 Principle:</span> {principle}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 text-xs bg-white/5 hover:bg-white/10 text-white/70"
              onClick={handleShare}
            >
              {copied ? <Check className="w-3 h-3 mr-1" /> : <Share2 className="w-3 h-3 mr-1" />}
              {copied ? "Copied!" : "Share"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 text-xs bg-white/5 hover:bg-white/10 text-white/70"
              onClick={onDownload}
            >
              <Download className="w-3 h-3 mr-1" />
              Save Image
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface FaithAuthoritySectionProps {
  className?: string;
}

export function FaithAuthoritySection({ className }: FaithAuthoritySectionProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("jesusLimitedByUnbelief");
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const categories = [
    {
      id: "jesusLimitedByUnbelief",
      title: "Jesus Limited by Unbelief",
      subtitle: "Power was present, but access was blocked",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      color: "from-yellow-500/10 to-orange-500/10",
      scriptures: BELIEF_SCRIPTURES.jesusLimitedByUnbelief
    },
    {
      id: "faithAsChannel",
      title: "Faith as the Channel",
      subtitle: "The operating system of the kingdom",
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      color: "from-cyan-500/10 to-blue-500/10",
      scriptures: BELIEF_SCRIPTURES.faithAsChannel
    },
    {
      id: "beliefAndAuthority",
      title: "Belief & Authority",
      subtitle: "What you don't believe cannot govern you",
      icon: <Shield className="w-5 h-5 text-purple-400" />,
      color: "from-purple-500/10 to-pink-500/10",
      scriptures: BELIEF_SCRIPTURES.beliefAndAuthority
    },
    {
      id: "fearRequiresBelief",
      title: "Fear Requires Belief",
      subtitle: "Fear operates like faith in reverse",
      icon: <Heart className="w-5 h-5 text-red-400" />,
      color: "from-red-500/10 to-orange-500/10",
      scriptures: BELIEF_SCRIPTURES.fearRequiresBelief
    }
  ];

  const handleDownloadCard = async (reference: string) => {
    const cardElement = cardRefs.current.get(reference);
    if (!cardElement) return;

    try {
      const dataUrl = await captureElementAsImage(cardElement, {
        includeWatermark: true,
        quality: 0.95
      });

      const link = document.createElement('a');
      link.download = `faith-authority-${reference.replace(/[:\s]/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success("Image saved!");
    } catch (error) {
      toast.error("Failed to save image");
    }
  };

  const setCardRef = (reference: string, element: HTMLDivElement | null) => {
    if (element) {
      cardRefs.current.set(reference, element);
    } else {
      cardRefs.current.delete(reference);
    }
  };

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">Faith & Authority</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            How Faith Unlocks Spiritual Access
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm">
            Scripture reveals a powerful truth: faith is the operating system of the spiritual realm. 
            What you don't believe cannot hold power over you.
          </p>
        </div>

        {/* Key Principle Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border border-amber-500/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-amber-300 font-semibold mb-2">The Core Principle</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  If you mentioned a deity's name during a ritual but <strong className="text-amber-300">did not know it was a deity</strong> and 
                  <strong className="text-amber-300"> do not believe it to be a deity</strong>... it holds no authority over you. 
                  Paul wrote that an idol is "nothing in the world" (1 Cor 8:4). The false god has no real existence.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Accordions with Scripture Cards */}
        <div className="max-w-4xl mx-auto space-y-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white">{category.title}</h3>
                  <p className="text-white/50 text-sm">{category.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40 hidden sm:inline">
                    {category.scriptures.length} scripture{category.scriptures.length > 1 ? 's' : ''}
                  </span>
                  {expandedCategory === category.id ? (
                    <ChevronUp className="w-5 h-5 text-white/50" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {expandedCategory === category.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 grid md:grid-cols-2 gap-4">
                      {category.scriptures.map((scripture, idx) => (
                        <ScriptureCard
                          key={idx}
                          reference={scripture.reference}
                          text={scripture.text}
                          principle={scripture.principle}
                          categoryColor={category.color}
                          categoryIcon={category.icon}
                          onShare={() => {}}
                          onDownload={() => handleDownloadCard(scripture.reference)}
                          cardRef={{ current: null } as React.RefObject<HTMLDivElement>}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Summary Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-8 text-center"
        >
          <p className="text-white/50 text-sm italic">
            "Your conscience and your faith determine spiritual effect. This doesn't mean truth is relative—
            it means faith is the channel through which spiritual realities operate."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
