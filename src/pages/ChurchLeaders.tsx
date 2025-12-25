import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Video, 
  Download, 
  ExternalLink, 
  Clock, 
  Church, 
  Heart,
  Users,
  FileText,
  Briefcase
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const essentialArticles = [
  {
    title: "Are BGLOs Sinful? A Biblical Response for Christians",
    description: "Dr. Montgomery's foundational article addressing the core question many Christians have about Black Greek Letter Organizations.",
    readTime: "10 min",
    icon: BookOpen
  },
  {
    title: "Should Christians Denounce BGLOs? Truth, Trauma, and Theology",
    description: "Explores whether Christians should denounce BGLOs, offering a nuanced, biblically-grounded perspective.",
    readTime: "8 min",
    icon: Heart
  },
  {
    title: "Why Some Call Black Greek Letter Organizations Demonic",
    description: "Examines claims that BGLOs are demonic, providing a theological analysis to discern truth from misinformation.",
    readTime: "12 min",
    icon: Church
  }
];

const videoResources = [
  {
    title: "Understanding BGLO History: A Pastor's Guide",
    description: "Explore the rich history, founding principles, and cultural significance of Black Greek Letter Organizations.",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=225&fit=crop"
  },
  {
    title: "How to Pastor BGLO Members: Grace and Truth",
    description: "Learn effective, biblically sound strategies for mentoring and counseling BGLO members in your congregation.",
    thumbnail: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=225&fit=crop"
  },
  {
    title: "From Welcome to Belonging: Creating Community",
    description: "Discover practical ways to foster a welcoming and supportive church atmosphere for all members, including those in BGLOs.",
    thumbnail: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=225&fit=crop"
  }
];

const guideResources = [
  {
    title: 'Order Book: "Sacred, Not Sinful"',
    description: "Essential reading for church leaders, providing deep insights into Greek life from a Christian perspective.",
    action: "Order Now",
    icon: BookOpen,
    link: "/the-book"
  },
  {
    title: "Practical Frameworks & Checklists",
    description: "Guidance on how to sensitively and effectively address common questions and concerns.",
    action: "Download Resources",
    icon: FileText,
    link: "/resources"
  },
  {
    title: "Inclusive Environment Toolkit",
    description: "Strategies for fostering a welcoming and supportive church atmosphere for all members.",
    action: "Access Toolkit",
    icon: Briefcase,
    link: "/tools-resources"
  }
];

const ChurchLeaders = () => {
  return (
    <>
      <SEOHead 
        title="For Church Leaders | Sacred Greeks"
        description="Biblical guidance for pastors and church leaders shepherding Divine Nine members with wisdom and grace."
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              <Church className="w-3 h-3 mr-1" />
              For Pastors & Church Leaders
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Understanding Greek Life in Your Congregation
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Biblical Guidance for Shepherding Divine Nine Members with Wisdom and Grace
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardContent className="p-6 md:p-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As a pastor or church leader, you may have congregants who are members of Black Greek Letter Organizations (BGLOs). 
                  This specialized resource section equips you with biblical frameworks, theological insights, and practical guidance 
                  to shepherd these members effectively while addressing common concerns with grace and truth.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Essential Reading Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-3">
                <BookOpen className="w-3 h-3 mr-1" />
                Essential Reading
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Essential Reading for Church Leaders</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Dive into key articles offering a pastoral perspective on BGLOs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {essentialArticles.map((article, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <article.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        Read Time: {article.readTime}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Read Article
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Resources Section */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-3">
                <Video className="w-3 h-3 mr-1" />
                Video Resources
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Video Resources for Pastoral Understanding</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Watch insightful video content to deepen your understanding of Greek life from a pastoral perspective
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {videoResources.map((video, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                        <Video className="w-8 h-8 text-primary-foreground ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {video.title}
                    </CardTitle>
                    <CardDescription>
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pastor's Guide Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-3">
                <Users className="w-3 h-3 mr-1" />
                Pastor's Guide
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Pastor's Guide to Greek Life Ministry</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Your comprehensive resource library for effective ministry to Greek life members
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {guideResources.map((resource, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <resource.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button asChild className="w-full">
                      <a href={resource.link}>
                        {resource.action}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <Church className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need Personalized Guidance?
                </h2>
                <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                  Dr. Lyman is available for pastoral consultations, church workshops, and speaking engagements 
                  to help your congregation navigate these important conversations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a href="/contact">
                      Schedule Consultation
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/meet-dr-lyman">
                      Learn About Dr. Lyman
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChurchLeaders;
