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
    title: "The Truth About Being Christian in a Greek Organization",
    description: "Sacred Greeks TV explores the reality of maintaining your Christian faith while being an active member of a Greek letter organization.",
    videoId: "GmMQisNNZjI",
    youtubeUrl: "https://www.youtube.com/watch?v=GmMQisNNZjI"
  },
  {
    title: "Should Christians Join BGLOs? How to Balance Faith and Greek Life",
    description: "A comprehensive discussion on whether Christians should join Black Greek Letter Organizations and practical guidance for balancing faith.",
    videoId: "25gQ4qXxXi0",
    youtubeUrl: "https://www.youtube.com/watch?v=25gQ4qXxXi0"
  },
  {
    title: "Top 10 Faith Questions About Greek Life Answered!",
    description: "The most common questions church leaders and Christians have about Greek life, answered with biblical wisdom and practical insight.",
    videoId: "PLQG1lOu-48",
    youtubeUrl: "https://www.youtube.com/watch?v=PLQG1lOu-48"
  },
  {
    title: "Understanding Greek Letter Organization Rituals",
    description: "A deep dive into the spiritual aspects of Greek rituals and how Christians can navigate them with biblical discernment.",
    videoId: "48I-fdTNg8c",
    youtubeUrl: "https://www.youtube.com/watch?v=48I-fdTNg8c"
  },
  {
    title: "Faith, Family & Fraternity: Finding Balance",
    description: "Practical wisdom for maintaining priorities while honoring your Greek organization commitments.",
    videoId: "FTeOlOv2cDM",
    youtubeUrl: "https://www.youtube.com/watch?v=FTeOlOv2cDM"
  },
  {
    title: "The History of Faith in Black Greek Organizations",
    description: "Exploring the Christian roots and faith heritage within Divine Nine organizations.",
    videoId: "f8WECW23fSg",
    youtubeUrl: "https://www.youtube.com/watch?v=f8WECW23fSg"
  },
  {
    title: "Responding to Critics of Greek Life",
    description: "How to gracefully respond when others question your involvement in Greek letter organizations.",
    videoId: "-q3FNrUe8YY",
    youtubeUrl: "https://www.youtube.com/watch?v=-q3FNrUe8YY"
  },
  {
    title: "Greek Life and Church Leadership",
    description: "Can you serve in church leadership while being an active Greek member? Biblical perspectives explored.",
    videoId: "ZJ-sDBR2mCU",
    youtubeUrl: "https://www.youtube.com/watch?v=ZJ-sDBR2mCU"
  },
  {
    title: "Addressing Hazing from a Christian Perspective",
    description: "Understanding hazing, its impact, and how Christians should respond to this serious issue.",
    videoId: "GbaqBExsqbs",
    youtubeUrl: "https://www.youtube.com/watch?v=GbaqBExsqbs"
  },
  {
    title: "Christian Unity Across Greek Organizations",
    description: "Building bridges of faith across different fraternities and sororities.",
    videoId: "rr639o9Gev0",
    youtubeUrl: "https://www.youtube.com/watch?v=rr639o9Gev0"
  },
  {
    title: "Prayer and Greek Life: A Guide for Members",
    description: "Developing and maintaining a strong prayer life while active in Greek organizations.",
    videoId: "ICyKY7z7E5M",
    youtubeUrl: "https://www.youtube.com/watch?v=ICyKY7z7E5M"
  },
  {
    title: "Biblical Foundations for Community and Brotherhood",
    description: "Exploring scriptural principles that align with the ideals of Greek letter organizations.",
    videoId: "Y6N089RVnBU",
    youtubeUrl: "https://www.youtube.com/watch?v=Y6N089RVnBU"
  },
  {
    title: "Navigating Greek Events as a Christian",
    description: "Practical advice for attending Greek events while maintaining your Christian witness.",
    videoId: "oN_DDjKjVCo",
    youtubeUrl: "https://www.youtube.com/watch?v=oN_DDjKjVCo"
  },
  {
    title: "Mentorship in Greek Organizations",
    description: "Using your platform as a Greek member to mentor and disciple others in faith.",
    videoId: "dUU9zT-YjB0",
    youtubeUrl: "https://www.youtube.com/watch?v=dUU9zT-YjB0"
  },
  {
    title: "Serving Your Community Through Greek Life",
    description: "How Greek service projects align with Christian values of serving others.",
    videoId: "DBlNzNlVUKI",
    youtubeUrl: "https://www.youtube.com/watch?v=DBlNzNlVUKI"
  },
  {
    title: "The Divine Nine and the Church: Building Bridges",
    description: "Creating stronger relationships between Greek organizations and local churches.",
    videoId: "NYGoQuUt6QM",
    youtubeUrl: "https://www.youtube.com/watch?v=NYGoQuUt6QM"
  },
  {
    title: "Testimony: My Journey as a Christian Greek",
    description: "Personal testimonies from Christians who have navigated Greek life with their faith intact.",
    videoId: "CN11FQ7tanU",
    youtubeUrl: "https://www.youtube.com/watch?v=CN11FQ7tanU"
  },
  {
    title: "What the Bible Says About Secret Societies",
    description: "A biblical examination of secrecy, oaths, and membership organizations.",
    videoId: "QsvD9LDmUEU",
    youtubeUrl: "https://www.youtube.com/watch?v=QsvD9LDmUEU"
  },
  {
    title: "Greek Life and Spiritual Warfare",
    description: "Understanding spiritual dynamics and maintaining spiritual health as a Greek member.",
    videoId: "9qLofoqskHk",
    youtubeUrl: "https://www.youtube.com/watch?v=9qLofoqskHk"
  },
  {
    title: "Answering Tough Questions About Greek Symbolism",
    description: "Addressing concerns about symbols, colors, and imagery in Greek organizations.",
    videoId: "G14XXWLKq5Q",
    youtubeUrl: "https://www.youtube.com/watch?v=G14XXWLKq5Q"
  },
  {
    title: "Christian Accountability in Greek Life",
    description: "Building accountability structures to support your faith journey in Greek organizations.",
    videoId: "kvRDvnBq43w",
    youtubeUrl: "https://www.youtube.com/watch?v=kvRDvnBq43w"
  },
  {
    title: "Legacy and Leadership: Christian Greeks Making Impact",
    description: "Stories of Christian Greeks who have made significant positive impacts in their communities.",
    videoId: "6jMIu-7_KIE",
    youtubeUrl: "https://www.youtube.com/watch?v=6jMIu-7_KIE"
  },
  {
    title: "Renounce, Retreat, or Redeem Greek Life?",
    description: "Should Christians renounce, retreat, or redeem their Greek Letter Organizations?",
    videoId: "ZK9HfHf3mLc",
    youtubeUrl: "https://www.youtube.com/watch?v=ZK9HfHf3mLc"
  },
  {
    title: "The Future of Faith in Greek Organizations",
    description: "Vision for how Christians can shape the future of Greek life for generations to come.",
    videoId: "XKVZ_1sOd7w",
    youtubeUrl: "https://www.youtube.com/watch?v=XKVZ_1sOd7w"
  },
  {
    title: "Sacred Greeks: Living Out Your Faith",
    description: "Practical daily practices for living out your Christian faith within Greek life.",
    videoId: "rF8LEzWwW5Q",
    youtubeUrl: "https://www.youtube.com/watch?v=rF8LEzWwW5Q"
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
                <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-primary/50">
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {video.title}
                    </CardTitle>
                    <CardDescription>
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild variant="outline" className="w-full">
                      <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Watch on YouTube
                      </a>
                    </Button>
                  </CardContent>
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
