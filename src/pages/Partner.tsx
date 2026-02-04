import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/sacred-greeks-logo.png";
import { 
  Building2, 
  CheckCircle, 
  Users, 
  BookOpen, 
  Trophy, 
  Shield, 
  ArrowRight, 
  Star,
  Sparkles,
  GraduationCap,
  Church,
  HeartHandshake
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const benefits = [
  {
    icon: BookOpen,
    title: "Custom Training Modules",
    description: "Position-specific E-Board training tailored to your chapter's needs"
  },
  {
    icon: Users,
    title: "Bulk Member Access",
    description: "Discounted Pro subscriptions for all chapter members"
  },
  {
    icon: Trophy,
    title: "Gamification Dashboard",
    description: "Track chapter-wide spiritual growth and engagement"
  },
  {
    icon: Shield,
    title: "Anti-Hazing Resources",
    description: "Comprehensive biblical approach to member development"
  },
  {
    icon: GraduationCap,
    title: "Chaplain Toolkit",
    description: "Ready-to-use devotionals, prayers, and meeting guides"
  },
  {
    icon: HeartHandshake,
    title: "Priority Support",
    description: "Direct access to Dr. Montgomery for chapter consultations"
  }
];

const pilotTiers = [
  {
    name: "Chapter Pilot",
    price: "Free",
    duration: "90 days",
    features: [
      "Up to 50 member accounts",
      "Full E-Board training access",
      "Chaplain Toolkit",
      "Basic analytics dashboard",
      "Email support"
    ],
    cta: "Apply for Pilot",
    highlighted: true
  },
  {
    name: "Regional Partnership",
    price: "Custom",
    duration: "Annual",
    features: [
      "Unlimited member accounts",
      "Custom branding options",
      "Advanced analytics",
      "Quarterly consultations",
      "Priority phone support"
    ],
    cta: "Contact Us",
    highlighted: false
  },
  {
    name: "National Partnership",
    price: "Enterprise",
    duration: "Multi-year",
    features: [
      "Organization-wide rollout",
      "API integrations",
      "White-label options",
      "Dedicated account manager",
      "Custom content development"
    ],
    cta: "Schedule Call",
    highlighted: false
  }
];

const organizations = [
  "Alpha Phi Alpha Fraternity, Inc.",
  "Alpha Kappa Alpha Sorority, Inc.",
  "Kappa Alpha Psi Fraternity, Inc.",
  "Omega Psi Phi Fraternity, Inc.",
  "Delta Sigma Theta Sorority, Inc.",
  "Phi Beta Sigma Fraternity, Inc.",
  "Zeta Phi Beta Sorority, Inc.",
  "Sigma Gamma Rho Sorority, Inc.",
  "Iota Phi Theta Fraternity, Inc.",
  "Other NPHC Organization",
  "Church/Ministry",
  "Campus Organization",
  "Other"
];

export default function Partner() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    chapterName: "",
    contactName: "",
    email: "",
    phone: "",
    role: "",
    memberCount: "",
    goals: "",
    agreeToTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the pilot program terms");
      return;
    }

    setIsSubmitting(true);

    try {
      // Store in media_inquiries table (reusing existing table)
      const { error } = await supabase.from("media_inquiries").insert({
        name: formData.contactName,
        email: formData.email,
        organization: `${formData.organizationName} - ${formData.chapterName}`,
        inquiry_type: "chapter_partnership",
        message: `Role: ${formData.role}\nMembers: ${formData.memberCount}\nPhone: ${formData.phone}\nGoals: ${formData.goals}`,
        status: "pending"
      });

      if (error) throw error;

      toast.success("Application submitted! We'll be in touch within 48 hours.");
      setFormData({
        organizationName: "",
        chapterName: "",
        contactName: "",
        email: "",
        phone: "",
        role: "",
        memberCount: "",
        goals: "",
        agreeToTerms: false
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Chapter Partnership Program | Sacred Greeks"
        description="Partner with Sacred Greeks to bring faith-based training and spiritual development resources to your Greek organization chapter."
        keywords="Greek chapter partnership, D9 chapter training, BGLO spiritual resources, fraternity faith program, sorority Christian training"
      />
      
      <div className="min-h-screen bg-[hsl(225,50%,8%)]">
        {/* Header */}
        <header className="border-b border-slate-700/50 bg-[hsl(225,50%,8%)]/95 backdrop-blur-sm sticky top-0 z-50">
          <nav className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
                <img
                  src={logo}
                  alt="Sacred Greeks"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="font-semibold text-white hidden sm:inline">Sacred Greeks</span>
              </button>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/auth")}
                  className="text-slate-300 hover:text-white"
                >
                  Sign In
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-sacred/20 text-sacred border-sacred/30 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Chapter Pilot Program
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Partner with Sacred Greeks
            </h1>
            <p className="text-lg text-slate-400 mb-6">
              Bring faith-based spiritual development to your entire chapter. 
              Join our pilot program and transform how your organization approaches faith and Greek life.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>90-Day Free Pilot</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Full Feature Access</span>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="bg-slate-800/30 border-slate-700/30 hover:border-sacred/30 transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-sacred/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-sacred" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-400">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Tiers */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Partnership Options</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pilotTiers.map((tier, idx) => (
                <Card 
                  key={idx} 
                  className={`bg-slate-800/30 border-slate-700/30 ${
                    tier.highlighted ? "ring-2 ring-sacred border-sacred/50" : ""
                  }`}
                >
                  <CardHeader>
                    {tier.highlighted && (
                      <Badge className="w-fit bg-sacred text-white mb-2">Most Popular</Badge>
                    )}
                    <CardTitle className="text-white">{tier.name}</CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold text-white">{tier.price}</span>
                      <span className="text-slate-400"> / {tier.duration}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${tier.highlighted ? "bg-sacred hover:bg-sacred/90" : ""}`}
                      variant={tier.highlighted ? "default" : "outline"}
                      onClick={() => {
                        if (tier.name === "Chapter Pilot") {
                          document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          navigate("/contact");
                        }
                      }}
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div id="application-form" className="max-w-2xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Apply for Chapter Pilot</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will reach out within 48 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organization" className="text-slate-300">Organization *</Label>
                      <Select 
                        value={formData.organizationName}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, organizationName: value }))}
                      >
                        <SelectTrigger className="bg-slate-900/50 border-slate-600">
                          <SelectValue placeholder="Select organization" />
                        </SelectTrigger>
                        <SelectContent>
                          {organizations.map(org => (
                            <SelectItem key={org} value={org}>{org}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chapter" className="text-slate-300">Chapter Name *</Label>
                      <Input
                        id="chapter"
                        placeholder="e.g., Beta Epsilon"
                        value={formData.chapterName}
                        onChange={(e) => setFormData(prev => ({ ...prev, chapterName: e.target.value }))}
                        className="bg-slate-900/50 border-slate-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300">Your Name *</Label>
                      <Input
                        id="name"
                        placeholder="Full name"
                        value={formData.contactName}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                        className="bg-slate-900/50 border-slate-600"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-slate-300">Your Role *</Label>
                      <Select 
                        value={formData.role}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                      >
                        <SelectTrigger className="bg-slate-900/50 border-slate-600">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="president">President</SelectItem>
                          <SelectItem value="chaplain">Chaplain</SelectItem>
                          <SelectItem value="advisor">Chapter Advisor</SelectItem>
                          <SelectItem value="dean">Dean of Pledges</SelectItem>
                          <SelectItem value="member">General Member</SelectItem>
                          <SelectItem value="other">Other Leadership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-slate-900/50 border-slate-600"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-300">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-slate-900/50 border-slate-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="members" className="text-slate-300">Estimated Active Members *</Label>
                    <Select 
                      value={formData.memberCount}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, memberCount: value }))}
                    >
                      <SelectTrigger className="bg-slate-900/50 border-slate-600">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-25">1-25 members</SelectItem>
                        <SelectItem value="26-50">26-50 members</SelectItem>
                        <SelectItem value="51-100">51-100 members</SelectItem>
                        <SelectItem value="100+">100+ members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals" className="text-slate-300">What are your chapter's spiritual goals?</Label>
                    <Textarea
                      id="goals"
                      placeholder="Tell us about your chapter's needs and what you hope to achieve..."
                      value={formData.goals}
                      onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                      className="bg-slate-900/50 border-slate-600 min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                    />
                    <Label htmlFor="terms" className="text-sm text-slate-400 leading-tight">
                      I agree to participate in the pilot program and provide feedback to help improve Sacred Greeks for the Greek community.
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-sacred hover:bg-sacred/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Trust Badges */}
          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm mb-4">Trusted by members of</p>
            <div className="flex flex-wrap justify-center gap-4 text-slate-600">
              {["Alpha", "AKA", "Kappa", "Omega", "Delta", "Sigma", "Zeta", "SGRho", "Iota"].map(org => (
                <Badge key={org} variant="outline" className="border-slate-700 text-slate-500">
                  {org}
                </Badge>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
