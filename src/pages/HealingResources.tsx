import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Home, Heart, Brain, User, Users, BookOpen, Phone, MessageSquare,
  ArrowRight, Shield, Sparkles, FileText, Cross
} from "lucide-react";

const HealingResources = () => {
  const healingArticles = [
    {
      icon: Heart,
      category: "Faith Development",
      type: "article",
      title: "Breaking Free from Guilt",
      description: "Guidance for members struggling with guilt about their Greek membership and how to find peace in Christ.",
      content: "Many Christians in BGLOs struggle with overwhelming guilt about their membership. This guilt can paralyze spiritual growth and damage mental health. Scripture reminds us that \"there is now no condemnation for those who are in Christ Jesus\" (Romans 8:1). If you have genuinely repented and sought God's guidance, release the burden of guilt. Walk in freedom, knowing that God's grace is sufficient. Focus on using your position to glorify Him and serve others.",
      tags: ["Struggling with guilt", "Recently joined", "Considering denouncement"],
      color: "from-rose-500/20"
    },
    {
      icon: Brain,
      category: "Faith Development",
      type: "article",
      title: "Overcoming Spiritual Doubt",
      description: "Help for members questioning their faith due to conflicts between Christianity and Greek life.",
      content: "Doubt is not the opposite of faith; it can be a pathway to deeper faith. If Greek life has caused you to question Christianity, you're not alone. Use this as an opportunity to examine what you believe and why. Study the Bible with fresh eyes. Ask hard questions. Seek answers from mature Christians who understand your context. God is not threatened by your doubts. He can handle your questions and will meet you in your seeking (Jeremiah 29:13).",
      tags: ["Doubting faith", "Questioning beliefs", "Spiritual crisis"],
      color: "from-purple-500/20"
    },
    {
      icon: User,
      category: "Identity & Purpose",
      type: "article",
      title: "Finding Your Identity in Christ",
      description: "Discovering who you are beyond your Greek letters and organizational affiliation.",
      content: "Your Greek letters do not define you. Your organization does not complete you. Your identity is rooted in Christ alone. You are chosen, holy, and dearly loved (Colossians 3:12). You are a child of God (1 John 3:1). You are a new creation (2 Corinthians 5:17). Let these truths anchor your sense of self. Your organization can be a meaningful part of your life, but it should never replace your primary identity in Christ.",
      tags: ["Identity issues", "Self-worth", "Purpose searching"],
      color: "from-blue-500/20"
    },
    {
      icon: Brain,
      category: "Mental Health",
      type: "resource",
      title: "Professional Help and Counseling",
      description: "When and how to seek professional Christian counseling for Greek-related struggles.",
      content: "Sometimes healing requires professional help. There is no shame in seeking Christian counseling. Consider professional help if you experience: persistent anxiety or depression, PTSD symptoms from hazing, inability to function normally, suicidal thoughts, or prolonged spiritual crisis. Look for licensed counselors who understand both Christian faith and Greek culture. Many offer sliding-scale fees or accept insurance. Your mental health matters to God.",
      tags: ["Mental health", "Depression", "Anxiety", "Trauma"],
      color: "from-teal-500/20"
    },
    {
      icon: Cross,
      category: "Post-Denouncement",
      type: "article",
      title: "Restoration After Denouncement",
      description: "Guidance for those who have left their organization and are seeking spiritual restoration.",
      content: "If you have denounced your membership, you may feel relief, grief, or both. This transition requires spiritual and emotional processing. First, know that God honors decisions made in obedience to Him. Second, give yourself grace to grieve what you've lost—friendships, community, tradition. Third, seek healthy Christian community to fill the void. Fourth, focus on your spiritual growth and relationship with Christ. Restoration is a journey, and God will guide each step.",
      tags: ["Post-denouncement", "Grieving loss", "Finding new community"],
      color: "from-indigo-500/20"
    },
    {
      icon: Users,
      category: "Reconciliation",
      type: "article",
      title: "Rebuilding Relationships",
      description: "How to restore relationships damaged by denouncement or faith conflicts.",
      content: "Denouncement or taking a stand for your faith may strain relationships. Some friendships will survive; others may not. Practice forgiveness—of others and yourself. Don't try to force reconciliation, but remain open to it. Pray for those who have distanced themselves. Focus on building relationships with people who support your spiritual journey. Remember that Jesus experienced rejection from those He loved (John 1:11), and He understands your pain.",
      tags: ["Broken relationships", "Lost friendships", "Family tension"],
      color: "from-amber-500/20"
    },
    {
      icon: Users,
      category: "Relationships",
      type: "article",
      title: "Navigating Family Expectations",
      description: "Help for members facing pressure from family legacy and expectations around Greek membership.",
      content: "Greek legacy can create intense family pressure. Parents, grandparents, and relatives may have strong expectations about membership. Remember: your primary identity is in Christ, not in your organization or family tradition. Honor your family, but make decisions based on your convictions and God's leading. Have honest, loving conversations. Set healthy boundaries. Your relationship with God comes first (Matthew 10:37).",
      tags: ["Family legacy", "Parental pressure", "Multi-generational Greeks"],
      color: "from-orange-500/20"
    },
    {
      icon: BookOpen,
      category: "Spiritual Discipline",
      type: "resource",
      title: "Scripture Memory for Healing",
      description: "Key verses to memorize and meditate on during your healing journey.",
      content: "Memorizing Scripture plants truth deep in your heart. Key verses for healing: Psalm 147:3 (God heals the brokenhearted), Isaiah 41:10 (do not fear, God is with you), 2 Corinthians 1:3-4 (God comforts us in troubles), Philippians 4:6-7 (peace through prayer), 1 Peter 5:7 (cast your anxiety on Him), Romans 8:28 (God works all things for good), and Jeremiah 29:11 (God has plans for your welfare). Write these out. Post them where you'll see them daily. Let truth renew your mind.",
      tags: ["All seekers", "Emotional healing", "Spiritual growth"],
      color: "from-green-500/20"
    },
    {
      icon: Sparkles,
      category: "Spiritual Growth",
      type: "article",
      title: "Addressing Spiritual Confusion",
      description: "Resources for members confused about integrating faith practices with organizational traditions.",
      content: "Spiritual confusion is common when navigating Greek life and Christianity. Some rituals may feel uncomfortable. Some symbolism may seem conflicting. Start with Scripture as your foundation. Pray for wisdom (James 1:5). Seek godly counsel from mature believers. Study what your organization truly stands for. Many symbols and rituals can be understood through a Christian lens. Focus on the clear commands of Scripture and let the Holy Spirit guide you in gray areas.",
      tags: ["Spiritual confusion", "Ritual concerns", "New Christians"],
      color: "from-cyan-500/20"
    },
    {
      icon: Shield,
      category: "Trauma & Recovery",
      type: "article",
      title: "Healing from Toxic Experiences",
      description: "Support for those who experienced hazing, abuse, or manipulation during the membership process.",
      content: "If you experienced hazing, abuse, or manipulation, know that this is NOT what Greek organizations are meant to be about. These experiences can cause deep trauma. First, prioritize your safety and mental health. Seek professional counseling. Trauma is real and requires proper care. Remember that God sees your pain and is close to the brokenhearted (Psalm 34:18). Your worth is not determined by how others treated you. Healing takes time, but wholeness is possible through Christ's healing power.",
      tags: ["Hazing survivors", "Emotional trauma", "Considering leaving"],
      color: "from-red-500/20"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/tools-resources"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Tools & Resources</span>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Healing Resources</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-6xl space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20">
            <Heart className="w-3 h-3 mr-1" />
            Hope & Healing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Healing Resources
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Resources for those seeking healing from hazing trauma, spiritual confusion, guilt, or difficult Greek life experiences. You're not alone on this journey.
          </p>
        </div>

        {/* Featured Resource */}
        <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-background overflow-hidden">
          <CardContent className="p-8">
            <div className="md:flex items-start gap-8">
              <div className="md:w-2/3 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20">Featured</Badge>
                  <Badge variant="outline">Faith Development</Badge>
                </div>
                <h3 className="text-2xl font-bold">Breaking Free from Guilt</h3>
                <p className="text-muted-foreground">
                  Guidance for members struggling with guilt about their Greek membership and how to find peace in Christ.
                </p>
                <p className="text-foreground leading-relaxed">
                  Many Christians in BGLOs struggle with overwhelming guilt about their membership. This guilt can paralyze spiritual growth and damage mental health. Scripture reminds us that <span className="italic">"there is now no condemnation for those who are in Christ Jesus"</span> (Romans 8:1). If you have genuinely repented and sought God's guidance, release the burden of guilt. Walk in freedom, knowing that God's grace is sufficient. Focus on using your position to glorify Him and serve others.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">Struggling with guilt</Badge>
                  <Badge variant="secondary">Recently joined</Badge>
                  <Badge variant="secondary">Considering denouncement</Badge>
                </div>
              </div>
              <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
                <div className="p-8 rounded-full bg-gradient-to-br from-rose-500/20 to-sacred/10">
                  <Heart className="w-16 h-16 text-sacred" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Healing Articles Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">All Healing Resources</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {healingArticles.slice(1).map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className={`h-2 bg-gradient-to-r ${article.color} to-sacred/10`} />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{article.category}</Badge>
                      <Badge className="text-xs bg-muted">{article.type}</Badge>
                    </div>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${article.color} to-sacred/5`}>
                      <article.icon className="w-5 h-5 text-sacred" />
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {article.content}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-xs text-muted-foreground">Recommended for:</span>
                    {article.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="text-sacred p-0 h-auto group-hover:underline">
                    Read More <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Crisis Support */}
        <Card className="border-destructive/30 bg-gradient-to-br from-destructive/5 to-background">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-destructive">
              <Phone className="w-5 h-5" />
              Need Immediate Support?
            </CardTitle>
            <CardDescription>
              If you're experiencing a mental health crisis or need immediate help
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="bg-background">
                <CardContent className="pt-6 text-center space-y-2">
                  <h4 className="font-semibold">National Suicide Prevention Lifeline</h4>
                  <a href="tel:988" className="text-3xl font-bold text-sacred hover:underline block">
                    988
                  </a>
                  <p className="text-sm text-muted-foreground">24/7 Crisis Support</p>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="pt-6 text-center space-y-2">
                  <h4 className="font-semibold">Crisis Text Line</h4>
                  <p className="text-xl font-bold text-sacred">
                    Text HOME to 741741
                  </p>
                  <p className="text-sm text-muted-foreground">Free, 24/7 Text Support</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Related Resources */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center">Related Resources</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="h-auto py-4 flex-col">
              <Link to="/anti-hazing">
                <Shield className="w-6 h-6 text-sacred mb-2" />
                <span className="font-medium">Anti-Hazing Resources</span>
                <span className="text-xs text-muted-foreground">Prevention & support</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col">
              <Link to="/prayer-wall">
                <Heart className="w-6 h-6 text-sacred mb-2" />
                <span className="font-medium">Prayer Wall</span>
                <span className="text-xs text-muted-foreground">Community support</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4 flex-col">
              <Link to="/ask-dr-lyman">
                <MessageSquare className="w-6 h-6 text-sacred mb-2" />
                <span className="font-medium">Ask Dr. Lyman</span>
                <span className="text-xs text-muted-foreground">Get guidance</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Remember: Healing is a journey, not a destination. God is with you every step of the way.
          </p>
          <Button asChild className="bg-sacred hover:bg-sacred/90">
            <Link to="/prayer-journal">Start Your Healing Journal</Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sacred Greeks™. All Rights Reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HealingResources;