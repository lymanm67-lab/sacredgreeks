import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Minus, Sparkles, Trophy, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";

const comparisonData = [
  {
    feature: "Listen Button (Text-to-Speech)",
    sacredGreeks: true,
    glorify: false,
    hallow: false,
    blackGreeks: false,
    highlight: true,
  },
  {
    feature: "Interactive Demo Mode",
    sacredGreeks: true,
    glorify: false,
    hallow: false,
    blackGreeks: false,
    highlight: true,
  },
  {
    feature: "BGLO/Divine Nine Specific Content",
    sacredGreeks: true,
    glorify: false,
    hallow: false,
    blackGreeks: "partial",
    highlight: true,
  },
  {
    feature: "Symbol & Ritual Biblical Guide",
    sacredGreeks: true,
    glorify: false,
    hallow: false,
    blackGreeks: false,
    highlight: true,
  },
  {
    feature: "Myth Buster Library",
    sacredGreeks: true,
    glorify: false,
    hallow: false,
    blackGreeks: false,
    highlight: true,
  },
  {
    feature: "Daily Devotionals",
    sacredGreeks: true,
    glorify: true,
    hallow: true,
    blackGreeks: false,
  },
  {
    feature: "Prayer Journal",
    sacredGreeks: true,
    glorify: true,
    hallow: true,
    blackGreeks: false,
  },
  {
    feature: "Community Prayer Wall",
    sacredGreeks: true,
    glorify: "partial",
    hallow: true,
    blackGreeks: false,
  },
  {
    feature: "100% Free (No Premium)",
    sacredGreeks: true,
    glorify: false,
    hallow: false,
    blackGreeks: true,
    highlight: true,
  },
  {
    feature: "PWA (No App Store Required)",
    sacredGreeks: true,
    glorify: false,
    hallow: false,
    blackGreeks: false,
    highlight: true,
  },
  {
    feature: "Response Coach (AI)",
    sacredGreeks: true,
    glorify: false,
    hallow: false,
    blackGreeks: false,
  },
  {
    feature: "Progress Tracking & Achievements",
    sacredGreeks: true,
    glorify: true,
    hallow: true,
    blackGreeks: false,
  },
];

const competitors = [
  { name: "Sacred Greeks", color: "sacred", isUs: true },
  { name: "Glorify", color: "orange-500", isUs: false },
  { name: "Hallow", color: "purple-600", isUs: false },
  { name: "Black Greeks", color: "neutral-600", isUs: false },
];

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-green-500" />
        </div>
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Minus className="w-4 h-4 text-amber-500" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center">
        <X className="w-4 h-4 text-red-400/60" />
      </div>
    </div>
  );
}

export function ComparisonSection() {
  const uniqueFeatures = comparisonData.filter(d => d.highlight).length;

  return (
    <section className="py-20 relative overflow-hidden" id="comparison">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sacred/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20 mb-4">
            <Trophy className="w-3 h-3 mr-1" />
            Market Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Sacred Greeks{" "}
            <span className="bg-gradient-to-r from-sacred to-purple-500 bg-clip-text text-transparent">
              Compares
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how we stack up against popular faith and Greek life apps. 
            We offer <span className="text-sacred font-semibold">{uniqueFeatures} unique features</span> you will not find anywhere else.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-sacred/10 to-sacred/5 border-sacred/20 text-center">
              <CardContent className="p-4">
                <Sparkles className="w-8 h-8 text-sacred mx-auto mb-2" />
                <div className="text-2xl font-bold text-sacred">{uniqueFeatures}</div>
                <div className="text-xs text-muted-foreground">Unique Features</div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 text-center">
              <CardContent className="p-4">
                <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-500">100%</div>
                <div className="text-xs text-muted-foreground">Free Forever</div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 text-center">
              <CardContent className="p-4">
                <Heart className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-500">Only</div>
                <div className="text-xs text-muted-foreground">Faith + BGLO App</div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 text-center">
              <CardContent className="p-4">
                <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-500">96/100</div>
                <div className="text-xs text-muted-foreground">Launch Score</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden border-border/50 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground min-w-[200px]">
                      Feature
                    </th>
                    {competitors.map((comp) => (
                      <th
                        key={comp.name}
                        className={`p-4 text-center min-w-[100px] ${
                          comp.isUs
                            ? "bg-sacred/10 border-x border-sacred/20"
                            : ""
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {comp.isUs && (
                            <Badge className="bg-sacred text-white text-[10px] px-1.5 py-0 mb-1">
                              US
                            </Badge>
                          )}
                          <span
                            className={`text-sm font-semibold ${
                              comp.isUs ? "text-sacred" : "text-muted-foreground"
                            }`}
                          >
                            {comp.name}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-border/50 transition-colors hover:bg-muted/30 ${
                        row.highlight ? "bg-sacred/5" : ""
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {row.highlight && (
                            <Sparkles className="w-4 h-4 text-sacred flex-shrink-0" />
                          )}
                          <span
                            className={`text-sm ${
                              row.highlight
                                ? "font-semibold text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {row.feature}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 bg-sacred/5 border-x border-sacred/10">
                        <StatusIcon value={row.sacredGreeks} />
                      </td>
                      <td className="p-4">
                        <StatusIcon value={row.glorify} />
                      </td>
                      <td className="p-4">
                        <StatusIcon value={row.hallow} />
                      </td>
                      <td className="p-4">
                        <StatusIcon value={row.blackGreeks} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-green-500" />
            </div>
            <span>Full Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Minus className="w-3 h-3 text-amber-500" />
            </div>
            <span>Partial Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
              <X className="w-3 h-3 text-red-400/60" />
            </div>
            <span>Not Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sacred" />
            <span>Unique to Sacred Greeks</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            No direct competitor combines <span className="text-sacred font-semibold">Christian faith</span> + <span className="text-sacred font-semibold">Greek life guidance</span>
          </p>
          <Badge className="bg-gradient-to-r from-sacred to-purple-500 text-white border-0 px-4 py-1.5 text-sm">
            You Own This Niche
          </Badge>
        </div>
      </div>
    </section>
  );
}
