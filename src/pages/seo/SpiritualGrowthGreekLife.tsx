import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { 
  Sun, BookOpen, Heart, Users, Cross, ArrowRight, 
  CheckCircle2, Calendar, Sparkles, Target, TrendingUp, Trophy, Zap, Star
} from "lucide-react";
import { BlueOceanBadge, FreeForeverBadge } from "@/components/seo/BlueOceanBadge";

const competitorGaps = [
  { app: "Glorify", cost: "$79/yr", missing: "No Greek content" },
  { app: "Hallow", cost: "$99/yr", missing: "No Greek content" },
  { app: "OmegaFi", cost: "B2B", missing: "No devotionals" },
  { app: "Black Greeks", cost: "Free", missing: "No faith tools" },
];

const spiritualTools = [
  {
    title: "Daily Devotionals for Greeks",
    description: "Scripture-based reflections for your unique Greek + faith journey. Not generic devotionals.",
    icon: Sun,
    link: "/devotional",
    color: "from-amber-500 to-orange-500",
    unique: true,
  },
  {
    title: "30-Day P.R.O.O.F. Journey",
    description: "Walk through biblical evaluation with daily guided exercises. Only here.",
    icon: Calendar,
    link: "/journey",
    color: "from-sacred to-blue-500",
    unique: true,
  },
  {
    title: "Prayer Journal + Tracking",
    description: "Track prayers, mark answers, and grow with Greek-specific prompts.",
    icon: Heart,
    link: "/prayer-journal",
    color: "from-pink-500 to-rose-500",
    unique: false,
  },
  {
    title: "Community Prayer Wall",
    description: "Pray for fellow Christians in Greek organizations who understand your journey.",
    icon: Users,
    link: "/prayer-wall",
    color: "from-purple-500 to-violet-500",
    unique: true,
  },
];

const milestones = [
  { days: 7, achievement: "First Week Faithful", description: "Complete 7 daily devotionals" },
  { days: 30, achievement: "Journey Complete", description: "Finish the 30-Day Journey" },
  { days: 100, achievement: "Centurion", description: "100 days of engagement" },
  { days: 365, achievement: "Year of Faith", description: "One year of growth" },
];

export default function SpiritualGrowthGreekLife() {
  return (
    <>
      <SEOHead
        title="Spiritual Growth for Greek Life | Only Faith Journey for Fraternities & Sororities"
        description="The ONLY spiritual growth platform for Greek life. Unlike Glorify ($79/yr) or Hallow ($99/yr), Sacred Greeks offers Greek-specific devotionals, prayer tools, and faith tracking—100% FREE."
        keywords="spiritual growth Greek life, Christian devotional fraternity free, sorority spiritual growth app, NPHC spiritual development, Greek life prayer tools, Christian Greek Bible study free, faith growth fraternity sorority, Glorify alternative free, Christian growth BGLO"
        structuredDataType="WebPage"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-b from-emerald-500/10 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                <BlueOceanBadge variant="default" />
                <FreeForeverBadge />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                The <span className="text-emerald-600 dark:text-emerald-400">Only</span> Spiritual Growth Platform for{' '}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Greek Life
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                <span className="line-through text-muted-foreground/60">Glorify</span> charges $79/year with no Greek content.{' '}
                <span className="line-through text-muted-foreground/60">Hallow</span> charges $99/year with no Greek content.{' '}
                <strong className="text-foreground">Sacred Greeks</strong> gives you{' '}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Greek-specific spiritual growth—FREE</span>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/journey">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                    Start 30-Day Journey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/devotional">
                  <Button size="lg" variant="outline" className="px-8">
                    Today's Devotional
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Competitor Comparison Banner */}
        <section className="py-8 bg-emerald-500/10 border-y border-emerald-500/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {competitorGaps.map((comp, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border">
                  <span className="text-sm line-through text-muted-foreground">{comp.app}</span>
                  <span className="text-xs text-red-500">{comp.cost}</span>
                  <span className="text-xs text-muted-foreground">• {comp.missing}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <Trophy className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Sacred Greeks</span>
                <span className="text-xs text-emerald-500">FREE + Greek-specific</span>
              </div>
            </div>
          </div>
        </section>

        {/* Spiritual Tools Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Sparkles className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Spiritual Growth Tools Built for Greeks
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Not generic faith apps. <span className="text-emerald-600 dark:text-emerald-400 font-medium">Purpose-built</span> for Christians in fraternities and sororities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {spiritualTools.map((tool, index) => (
                <Link key={index} to={tool.link}>
                  <Card className={`h-full border-2 transition-all hover:scale-[1.02] cursor-pointer ${tool.unique ? 'border-emerald-500/30 bg-emerald-500/5' : 'hover:border-emerald-500/50'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0 shadow-lg`}>
                          <tool.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{tool.title}</h3>
                            {tool.unique && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-white font-medium">UNIQUE</span>
                            )}
                          </div>
                          <p className="text-muted-foreground">{tool.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Spiritual Growth Milestones & Achievements
            </h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <Card key={index} className="w-full sm:w-auto sm:min-w-[200px]">
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{milestone.days}</div>
                    <div className="text-xs text-muted-foreground mb-1">days</div>
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{milestone.achievement}</div>
                    <div className="text-xs text-muted-foreground mt-1">{milestone.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Rhythm */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Suggested Daily Spiritual Rhythm
              </h2>
              <div className="space-y-4">
                {[
                  { time: "Morning", activity: "Read daily devotional for Greeks", duration: "5-10 min" },
                  { time: "Midday", activity: "Quick prayer for your organization", duration: "2 min" },
                  { time: "Evening", activity: "Journal reflection", duration: "5 min" },
                  { time: "Weekly", activity: "Community prayer wall participation", duration: "10 min" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border">
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 w-20">{item.time}</div>
                    <div className="flex-1 text-foreground">{item.activity}</div>
                    <div className="text-sm text-muted-foreground">{item.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scripture */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
              <CardContent className="p-8 text-center">
                <Cross className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <blockquote className="text-xl italic text-foreground mb-4">
                  "But grow in the grace and knowledge of our Lord and Savior Jesus Christ. 
                  To him be glory both now and forever!"
                </blockquote>
                <div className="text-muted-foreground font-semibold">
                  2 Peter 3:18
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-emerald-500/5">
          <div className="container mx-auto px-4 text-center">
            <Zap className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Grow Your Faith. For Free. Forever.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Why pay $79-99/year for generic faith apps? Get Greek-specific spiritual growth at no cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/snapshot">
                <Button size="lg" variant="outline">
                  Take Faith Snapshot
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <footer className="py-12 border-t">
          <div className="container mx-auto px-4">
            <h3 className="text-lg font-semibold mb-6 text-center">Related Resources</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/christian-greek-life" className="text-emerald-600 dark:text-emerald-400 hover:underline">Christian Greek Life</Link>
              <Link to="/divine-nine-faith" className="text-emerald-600 dark:text-emerald-400 hover:underline">Divine Nine Faith</Link>
              <Link to="/proof-course" className="text-emerald-600 dark:text-emerald-400 hover:underline">P.R.O.O.F. Course</Link>
              <Link to="/achievements" className="text-emerald-600 dark:text-emerald-400 hover:underline">Achievements</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
