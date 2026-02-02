import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft,
  Building2,
  Heart,
  Users,
  Star,
  CheckCircle,
  Briefcase,
  Globe,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Shield,
  Cross,
  TrendingUp
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const businessCategories = [
  "Professional Services",
  "Health & Wellness",
  "Education & Coaching",
  "Food & Hospitality",
  "Technology",
  "Finance & Insurance",
  "Real Estate",
  "Creative Services",
  "Non-Profit",
  "Retail",
  "Other"
];

const d9Organizations = [
  "Alpha Phi Alpha Fraternity, Inc.",
  "Alpha Kappa Alpha Sorority, Inc.",
  "Kappa Alpha Psi Fraternity, Inc.",
  "Omega Psi Phi Fraternity, Inc.",
  "Delta Sigma Theta Sorority, Inc.",
  "Phi Beta Sigma Fraternity, Inc.",
  "Zeta Phi Beta Sorority, Inc.",
  "Sigma Gamma Rho Sorority, Inc.",
  "Iota Phi Theta Fraternity, Inc."
];

const benefits = [
  {
    icon: Users,
    title: "Connect with D9 Community",
    description: "Get discovered by thousands of Divine Nine members seeking faith-centered businesses"
  },
  {
    icon: Heart,
    title: "Faith-First Platform",
    description: "Join a directory that celebrates Kingdom principles alongside Greek excellence"
  },
  {
    icon: TrendingUp,
    title: "Grow Your Network",
    description: "Build relationships with fellow D9 entrepreneurs and potential customers"
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description: "Stand out with verified D9 membership and faith commitment badges"
  }
];

const stats = [
  { value: "9", label: "Organizations Represented" },
  { value: "Free", label: "Listing Cost" },
  { value: "1000+", label: "Monthly Visitors" },
  { value: "100%", label: "Faith-Focused" }
];

export default function SubmitBusiness() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    organization: "",
    category: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    city: "",
    state: "",
    faithStatement: "",
    agreeToTerms: false
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('d9_business_directory')
        .insert({
          business_name: data.businessName,
          owner_name: data.ownerName,
          greek_organization: data.organization,
          business_category: data.category,
          description: data.description,
          email: data.email,
          phone: data.phone || null,
          website_url: data.website || null,
          location_city: data.city || null,
          location_state: data.state || null,
          faith_statement: data.faithStatement || null,
          is_active: true,
          featured: false
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Business submitted successfully! Your listing will be reviewed shortly.");
      navigate('/business-directory');
    },
    onError: (error) => {
      console.error('Error submitting business:', error);
      toast.error("Failed to submit business. Please try again.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms to submit your business.");
      return;
    }

    submitMutation.mutate(formData);
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AppLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-sacred/20 via-background to-purple-900/20 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/business-directory" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Directory
                </Link>
              </Button>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-sacred/20 text-sacred border-sacred/30">
                <Sparkles className="w-3 h-3 mr-1" />
                100% Free Listing
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sacred to-purple-400 bg-clip-text text-transparent">
                List Your D9 Business for Free
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Join the premier faith-centered directory for Divine Nine entrepreneurs. 
                Connect with brothers and sisters who share your values and want to support Black excellence.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-background/50 backdrop-blur border-border/50 text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-sacred mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Why List Your Business With Us?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-background border-border/50 hover:border-sacred/50 transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-sacred/20 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-sacred" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card className="border-sacred/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-sacred/20 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-sacred" />
                </div>
                <CardTitle className="text-2xl">Submit Your Business</CardTitle>
                <CardDescription>
                  Fill out the form below to get your business listed. All fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-sacred" />
                      Business Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          placeholder="Your Business Name"
                          value={formData.businessName}
                          onChange={(e) => updateField('businessName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ownerName">Owner Name *</Label>
                        <Input
                          id="ownerName"
                          placeholder="Your Full Name"
                          value={formData.ownerName}
                          onChange={(e) => updateField('ownerName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organization">D9 Organization *</Label>
                        <Select
                          value={formData.organization}
                          onValueChange={(value) => updateField('organization', value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your organization" />
                          </SelectTrigger>
                          <SelectContent>
                            {d9Organizations.map((org) => (
                              <SelectItem key={org} value={org}>{org}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Business Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => updateField('category', value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Business Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell us about your business, services offered, and what makes you unique..."
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        rows={4}
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Mail className="w-5 h-5 text-sacred" />
                      Contact Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="business@example.com"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website URL</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://www.yourbusiness.com"
                        value={formData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Atlanta"
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="GA"
                          value={formData.state}
                          onChange={(e) => updateField('state', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Faith Statement */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Cross className="w-5 h-5 text-sacred" />
                      Faith Commitment (Optional)
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="faithStatement">How does your faith influence your business?</Label>
                      <Textarea
                        id="faithStatement"
                        placeholder="Share how your Christian faith guides your business practices and values..."
                        value={formData.faithStatement}
                        onChange={(e) => updateField('faithStatement', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => updateField('agreeToTerms', checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        I confirm that I am a member of a Divine Nine organization and agree to have my 
                        business listed in the Sacred Greeks D9 Business Directory. I understand that 
                        listings are subject to review and approval.
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? (
                      "Submitting..."
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Submit My Business for Free
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by Divine Nine entrepreneurs nationwide
              </p>
              <div className="flex justify-center gap-8 opacity-60">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span className="text-sm">Verified Listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Faith-Centered</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-sacred/20 to-purple-900/20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Already Listed? Browse the Directory
            </h2>
            <p className="text-muted-foreground mb-6">
              Discover and support other D9-owned businesses in our growing community.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link to="/business-directory">
                <Building2 className="w-5 h-5 mr-2" />
                View Business Directory
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
