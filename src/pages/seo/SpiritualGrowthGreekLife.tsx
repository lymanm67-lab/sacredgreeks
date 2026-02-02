import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { 
  Sun, BookOpen, Heart, Users, Cross, ArrowRight, 
  CheckCircle2, Calendar, Sparkles, Target, TrendingUp
} from "lucide-react";

const spiritualTools = [
  {
    title: "Daily Devotionals",
    description: "Scripture-based reflections designed for Christians in fraternities and sororities.",
    icon: Sun,
    link: "/devotional",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "30-Day Faith Journey",
    description: "Walk through the P.R.O.O.F. framework with daily guided spiritual exercises.",
    icon: Calendar,
    link: "/journey",
    color: "from-sacred to-blue-500",
  },
  {
    title: "Prayer Journal",
    description: "Track your prayers, mark answered prayers, and grow in your prayer life.",
    icon: Heart,
    link: "/prayer-journal",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Community Prayer Wall",
    description: "Share requests and pray for fellow Christians in Greek organizations.",
    icon: Users,
    link: "/prayer-wall",
    color: "from-purple-500 to-violet-500",
  },
];

const growthAreas = [
  {
    area: "Biblical Knowledge",
    description: "Deepen understanding of Scripture related to Greek life issues",
    progress: "Bible study tools, symbol analysis, oath evaluation",
  },
  {
    area: "Prayer Life",
    description: "Develop consistent, meaningful communication with God",
    progress: "Prayer journal, community prayer, guided prayers",
  },
  {
    area: "Faith Integration",
    description: "Learn to honor God in all aspects of Greek membership",
    progress: "Daily devotionals, P.R.O.O.F. framework, practical guides",
  },
  {
    area: "Community Connection",
    description: "Build relationships with like-minded believers",
    progress: "Prayer wall, forums, organization communities",
  },
];

const milestones = [
  { days: 7, achievement: "First Week Faithful", description: "Complete 7 daily devotionals" },
  { days: 30, achievement: "Journey Complete", description: "Finish the 30-Day P.R.O.O.F. Journey" },
  { days: 100, achievement: "Centurion", description: "100 days of spiritual engagement" },
  { days: 365, achievement: "Year of Faith", description: "One year of consistent growth" },
];

export default function SpiritualGrowthGreekLife() {
  return (
    <>
      <SEOHead
        title="Spiritual Growth for Greek Life | Christian Devotionals & Prayer for Fraternities & Sororities"
        description="Grow spiritually as a Christian in Greek life. Daily devotionals, prayer tools, Bible study, and faith journey resources designed for fraternity and sorority members. Track your spiritual growth milestones."
        keywords="spiritual growth Greek life, Christian devotional fraternity, sorority spiritual growth, NPHC spiritual development, Greek life prayer, Christian Greek Bible study, faith growth fraternity sorority, spiritual journey Greek organization, Christian growth BGLO"
        structuredDataType="WebPage"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-b from-green-500/10 via-background to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Spiritual Growth Resources</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Grow Your Faith in{' '}
                <span className="text-green-600 dark:text-green-400">Greek Life</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Daily devotionals, prayer tools, and spiritual growth tracking designed 
                specifically for Christians in fraternities and sororities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/journey">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
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

        {/* Spiritual Tools Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Spiritual Growth Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to maintain and deepen your faith while participating in Greek life.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {spiritualTools.map((tool, index) => (
                <Link key={index} to={tool.link}>
                  <Card className="h-full border-2 hover:border-green-500/50 transition-all hover:scale-[1.02] cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0 shadow-lg`}>
                          <tool.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{tool.title}</h3>
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

        {/* Growth Areas */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Four Pillars of Spiritual Growth
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {growthAreas.map((item, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Target className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.area}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <p className="text-xs text-green-600 dark:text-green-400">{item.progress}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Spiritual Growth Milestones
            </h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <Card key={index} className="w-full sm:w-auto sm:min-w-[200px]">
                  <CardContent className="p-4 text-center">
                    <Sparkles className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{milestone.days}</div>
                    <div className="text-xs text-muted-foreground mb-1">days</div>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">{milestone.achievement}</div>
                    <div className="text-xs text-muted-foreground mt-1">{milestone.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Rhythm */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Suggested Daily Spiritual Rhythm
              </h2>
              <div className="space-y-4">
                {[
                  { time: "Morning", activity: "Read daily devotional", duration: "5-10 min" },
                  { time: "Midday", activity: "Quick prayer for organization", duration: "2 min" },
                  { time: "Evening", activity: "Journal reflection", duration: "5 min" },
                  { time: "Weekly", activity: "Prayer wall participation", duration: "10 min" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-background border">
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400 w-20">{item.time}</div>
                    <div className="flex-1 text-foreground">{item.activity}</div>
                    <div className="text-sm text-muted-foreground">{item.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scripture */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
              <CardContent className="p-8 text-center">
                <Cross className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-4" />
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
        <section className="py-16 bg-green-500/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Begin Your Spiritual Growth Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of Christians in Greek life who are intentionally growing their faith.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
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
              <Link to="/christian-greek-life" className="text-green-600 dark:text-green-400 hover:underline">Christian Greek Life</Link>
              <Link to="/divine-nine-faith" className="text-green-600 dark:text-green-400 hover:underline">Divine Nine Faith</Link>
              <Link to="/proof-course" className="text-green-600 dark:text-green-400 hover:underline">P.R.O.O.F. Course</Link>
              <Link to="/achievements" className="text-green-600 dark:text-green-400 hover:underline">Achievements</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
