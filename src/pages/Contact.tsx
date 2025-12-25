import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Mail, MessageSquare, Youtube, ExternalLink, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "For general inquiries",
      link: "mailto:info@sacredgreeks.com",
      linkText: "info@sacredgreeks.com"
    },
    {
      icon: Youtube,
      title: "YouTube",
      description: "Watch teachings & testimonies",
      link: "https://www.youtube.com/@sacredgreeks",
      linkText: "@sacredgreeks"
    },
    {
      icon: ExternalLink,
      title: "SacredGreeksLife.com",
      description: "Main ministry website",
      link: "https://sacredgreekslife.com",
      linkText: "Visit Website"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Contact</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        {/* Hero */}
        <div className="text-center space-y-4">
          <Badge className="bg-sacred/10 text-sacred border-sacred/20">
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Contact Sacred Greeks
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-sacred" />
                Send a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <h3 className="text-lg font-semibold">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="speaking">Speaking Request</SelectItem>
                        <SelectItem value="coaching">Coaching Inquiry</SelectItem>
                        <SelectItem value="media">Media Inquiry</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Greek Organization (Optional)</Label>
                    <Input id="organization" placeholder="e.g., Alpha Kappa Alpha Sorority, Inc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="How can we help you?"
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-sacred hover:bg-sacred/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Other Ways to Connect</h3>
            
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-sacred/10 flex-shrink-0">
                      <method.icon className="w-5 h-5 text-sacred" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium">{method.title}</h4>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <a 
                        href={method.link}
                        target={method.link.startsWith("http") ? "_blank" : undefined}
                        rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-sacred hover:underline inline-flex items-center gap-1"
                      >
                        {method.linkText}
                        {method.link.startsWith("http") && <ExternalLink className="w-3 h-3" />}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Speaking/Coaching Card */}
            <Card className="bg-gradient-to-br from-sacred/5 to-sacred/10 border-sacred/20">
              <CardContent className="pt-6 space-y-3">
                <h4 className="font-semibold">Interested in Coaching or Speaking?</h4>
                <p className="text-sm text-muted-foreground">
                  Dr. Montgomery is available for speaking engagements, workshops, and personal coaching sessions.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/coaching-application">
                    Apply for Coaching
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
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

export default Contact;
