import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Users,
  GraduationCap,
  MessageCircle,
  BookOpen,
  Shield,
  HelpCircle,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  HandHeart,
  Clock,
  Target,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ParentsFamily = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const parentCategories = [
    {
      id: "greek",
      title: "Greek Parents",
      subtitle: "Active or Alumni Members",
      icon: GraduationCap,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      description: "You understand the Greek experience firsthand. Learn how to share your journey while respecting your child's unique path.",
      challenges: [
        "Wanting your child to join your organization",
        "Sharing too much about your experience",
        "Comparing their journey to yours",
        "Navigating if they choose a different organization",
      ],
      tips: [
        "Share your positive experiences without pressure",
        "Acknowledge that their journey will be different",
        "Be open if they choose a different organization or none at all",
        "Discuss both the benefits and responsibilities honestly",
        "Help them understand the time and financial commitments",
      ],
      conversation: "I loved my Greek experience, and I want you to have the opportunity to explore it too. But this is YOUR decision. I'll support whatever path you choose.",
    },
    {
      id: "nongreek",
      title: "Non-Greek Parents",
      subtitle: "Never Joined Greek Life",
      icon: Users,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/30",
      description: "Greek life may seem unfamiliar or concerning. Get informed so you can have meaningful conversations with your child.",
      challenges: [
        "Feeling uncertain about what Greek life involves",
        "Concerns about hazing, finances, or time commitment",
        "Not understanding the cultural significance",
        "Feeling left out of their experience",
      ],
      tips: [
        "Ask questions with genuine curiosity, not judgment",
        "Research the specific organization they're interested in",
        "Attend family events when invited",
        "Learn about the history and values of their organization",
        "Focus on their personal growth and happiness",
      ],
      conversation: "I don't have personal experience with Greek life, but I want to understand what draws you to it. Can you help me learn more about this organization?",
    },
    {
      id: "inactive",
      title: "Inactive/Distant Parents",
      subtitle: "Former Members, Now Distant",
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      description: "You may have mixed feelings about your own Greek experience. Learn to support your child while processing your own journey.",
      challenges: [
        "Processing negative experiences from your time",
        "Worrying they'll have similar issues",
        "Feeling conflicted about encouraging or discouraging",
        "Balancing honesty with not projecting your experience",
      ],
      tips: [
        "Separate your experience from their potential one",
        "Organizations change over time—research current culture",
        "Share concerns constructively without fear-mongering",
        "Acknowledge that their chapter and era may differ",
        "Consider if your concerns are about them or about you",
      ],
      conversation: "My experience wasn't perfect, and I want to be honest with you about that. But I also want you to make your own informed decision based on what the organization is today.",
    },
  ];

  const faithConcerns = [
    {
      concern: "Are Greek organizations compatible with Christianity?",
      answer: "Many Greek organizations have deep roots in Christian traditions and values. The key is understanding the specific practices of each organization and how they align with your family's faith. Our PROOF Framework helps evaluate this thoughtfully.",
      resource: "/proof-course",
    },
    {
      concern: "What about rituals and secret ceremonies?",
      answer: "Understanding the historical context of fraternal rituals can ease concerns. Many practices have parallels in early church traditions. We provide educational resources to help families navigate these conversations.",
      resource: "/symbol-guide",
    },
    {
      concern: "How can we maintain family values during this transition?",
      answer: "Open communication is key. Establish expectations together, maintain regular check-ins, and remember that Greek life can actually reinforce values like service, scholarship, and brotherhood/sisterhood.",
      resource: "/faith-authority",
    },
    {
      concern: "What if our faith community disapproves?",
      answer: "This is a common challenge. We offer resources to help families have informed conversations with church leaders and navigate these situations with grace.",
      resource: "/church-leaders",
    },
  ];

  const practicalResources = [
    {
      title: "Financial Planning Guide",
      description: "Understand dues, fees, and hidden costs of Greek membership",
      icon: Target,
    },
    {
      title: "Hazing Prevention",
      description: "Know the signs and how to have protective conversations",
      icon: Shield,
      link: "/anti-hazing",
    },
    {
      title: "Time Management Support",
      description: "Help your student balance academics, Greek life, and family",
      icon: Clock,
    },
    {
      title: "Communication Templates",
      description: "Sample conversations for difficult topics",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-rose-500" />
              Parents & Family Resources
            </h1>
            <p className="text-muted-foreground">
              Supporting families through the Greek life journey
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-purple-500/10 border-rose-500/30">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shrink-0">
                  <HandHeart className="w-10 h-10 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">Your Role Matters</h2>
                  <p className="text-muted-foreground max-w-2xl">
                    Whether your child is considering Greek life, going through intake, or already a member, 
                    your support and understanding can make all the difference. This resource is designed to 
                    help you navigate this journey together, regardless of your own Greek life background.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Parent Categories */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Find Your Path
          </h2>
          
          <Tabs defaultValue="greek" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              {parentCategories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
                  <cat.icon className={`h-4 w-4 ${cat.color}`} />
                  <span className="hidden sm:inline">{cat.title}</span>
                  <span className="sm:hidden">{cat.title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {parentCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`${category.bgColor} ${category.borderColor} border-2`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                          <category.icon className={`w-6 h-6 ${category.color}`} />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {category.title}
                            <Badge variant="secondary" className="text-xs">
                              {category.subtitle}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Common Challenges */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          Common Challenges
                        </h4>
                        <ul className="space-y-2">
                          {category.challenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tips */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          Helpful Tips
                        </h4>
                        <ul className="space-y-2">
                          {category.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Conversation Starter */}
                      <div className="bg-background/50 rounded-lg p-4 border">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-secondary" />
                          Conversation Starter
                        </h4>
                        <p className="text-sm italic text-muted-foreground">
                          "{category.conversation}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Faith & Greek Life Concerns */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Faith & Greek Life Questions
          </h2>
          
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faithConcerns.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left">
                      <span className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                        {item.concern}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground mb-3">{item.answer}</p>
                      <Link to={item.resource}>
                        <Button variant="outline" size="sm">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Learn More
                        </Button>
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Practical Resources */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Practical Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practicalResources.map((resource, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {resource.link ? (
                  <Link to={resource.link}>
                    <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <resource.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="h-full">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <resource.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          {resource.title}
                          <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                        </h4>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Need More Support?</h3>
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                Every family's situation is unique. If you have specific concerns or questions, 
                we're here to help you navigate this journey with faith and wisdom.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/proof-course">
                  <Button>
                    <Target className="h-4 w-4 mr-2" />
                    Explore PROOF Framework
                  </Button>
                </Link>
                <Link to="/church-leaders">
                  <Button variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Resources for Church Leaders
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ParentsFamily;
