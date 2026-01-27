import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Mic2, 
  CheckCircle2,
  Mail,
  User,
  Phone,
  MessageSquare,
  Sparkles
} from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  greekOrganization: z.string().min(1, "Please select your organization"),
  chapterName: z.string().optional(),
  topicExpertise: z.string().min(10, "Please describe your expertise (at least 10 characters)"),
  whyGuest: z.string().min(20, "Please tell us why you'd be a great panelist (at least 20 characters)"),
  previousSpeaking: z.string().optional(),
  linkedIn: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms")
});

type FormValues = z.infer<typeof formSchema>;

const greekOrganizations = [
  // Divine Nine
  "Alpha Phi Alpha",
  "Alpha Kappa Alpha",
  "Kappa Alpha Psi",
  "Omega Psi Phi",
  "Delta Sigma Theta",
  "Phi Beta Sigma",
  "Zeta Phi Beta",
  "Sigma Gamma Rho",
  "Iota Phi Theta",
  // Other Greek
  "Alpha Phi Omega",
  "Other NPHC Organization",
  "Other Greek Organization",
  "Greek Life Advisor/Professional",
  // Non-Greek & Former Members
  "Non-Greek (Never Joined)",
  "Renounced Membership (Left Organization)",
  "Denounced Greek Life (Publicly Opposed)",
  "Anti-Greek Life Advocate",
  "Former Member (Inactive/Expelled)"
];

const GuestPanelistApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      greekOrganization: "",
      chapterName: "",
      topicExpertise: "",
      whyGuest: "",
      previousSpeaking: "",
      linkedIn: "",
      agreeToTerms: false
    }
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // Store in dedicated podcast_guest_applications table
      const { error } = await supabase.from("podcast_guest_applications").insert({
        full_name: values.fullName,
        email: values.email,
        phone: values.phone || null,
        greek_organization: values.greekOrganization,
        chapter_name: values.chapterName || null,
        topic_expertise: values.topicExpertise,
        why_guest: values.whyGuest,
        previous_speaking: values.previousSpeaking || null,
        linkedin_url: values.linkedIn || null,
        application_type: 'panelist'
      });

      if (error) throw error;

      // Send admin notification
      supabase.functions.invoke('notify-webinar-registration', {
        body: {
          webinarTitle: "🎤 GUEST PANELIST APPLICATION",
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          greekOrganization: values.greekOrganization + (values.chapterName ? ` - ${values.chapterName}` : ''),
          howHeard: `Expertise: ${values.topicExpertise.substring(0, 100)}...`
        }
      }).catch(err => console.error('Failed to send admin notification:', err));

      setIsSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(220,60%,6%)] via-[hsl(225,55%,10%)] to-[hsl(230,50%,8%)] flex items-center justify-center p-4">
        <Card className="bg-slate-900/80 border-green-500/30 max-w-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Application Received!</h2>
            <p className="text-sky-200/70 mb-2">
              Thank you for your interest in being a guest panelist.
            </p>
            <p className="text-sky-200/60 text-sm mb-6">
              We'll review your application and reach out if you're selected for an upcoming session.
            </p>
            
            <div className="space-y-3">
              <Link to="/snapshot">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Take Your Faith Snapshot
                </Button>
              </Link>
              <Link to="/land">
                <Button variant="ghost" className="w-full text-sky-300 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(220,60%,6%)] via-[hsl(225,55%,10%)] to-[hsl(230,50%,8%)]">
      {/* Header */}
      <header className="border-b border-blue-500/10 bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/land" className="inline-flex items-center text-sky-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4">
              <Mic2 className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Guest Panelist Application
            </h1>
            <p className="text-sky-200/70 max-w-lg mx-auto">
              Share your expertise and testimony with the Sacred Greeks community. We're looking for passionate voices to join our upcoming training sessions.
            </p>
          </div>

          {/* Application Form */}
          <Card className="bg-slate-900/80 border border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                Tell Us About Yourself
              </CardTitle>
              <CardDescription className="text-sky-200/70">
                Fill out the form below to apply as a guest panelist for our training sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sky-200">Full Name *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
                              <Input 
                                {...field} 
                                placeholder="Your name"
                                className="pl-10 bg-slate-800/50 border-amber-500/30 text-white placeholder:text-sky-300/40"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sky-200">Email *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
                              <Input 
                                {...field} 
                                type="email"
                                placeholder="you@email.com"
                                className="pl-10 bg-slate-800/50 border-amber-500/30 text-white placeholder:text-sky-300/40"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Phone & Organization Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sky-200">Phone (optional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
                              <Input 
                                {...field} 
                                type="tel"
                                placeholder="(555) 123-4567"
                                className="pl-10 bg-slate-800/50 border-amber-500/30 text-white placeholder:text-sky-300/40"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="greekOrganization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sky-200">Greek Organization *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/50 border-amber-500/30 text-white">
                                <SelectValue placeholder="Select organization" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-800 border-amber-500/30">
                              {greekOrganizations.map((org) => (
                                <SelectItem key={org} value={org} className="text-white hover:bg-slate-700">
                                  {org}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="chapterName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sky-200">Chapter Name (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g., Beta Gamma Chapter"
                            className="bg-slate-800/50 border-amber-500/30 text-white placeholder:text-sky-300/40"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="topicExpertise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sky-200">Topic Expertise *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="What topics are you passionate about? (e.g., faith integration in Greek life, leadership, service, etc.)"
                            className="bg-slate-800/50 border-amber-500/30 text-white placeholder:text-sky-300/40 min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whyGuest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sky-200">Why Would You Be a Great Panelist? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Share your testimony, experience, or unique perspective that would benefit our community..."
                            className="bg-slate-800/50 border-amber-500/30 text-white placeholder:text-sky-300/40 min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="previousSpeaking"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sky-200">Previous Speaking Experience (optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Any past speaking engagements, workshops, or presentations..."
                            className="bg-slate-800/50 border-amber-500/30 text-white placeholder:text-sky-300/40"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="linkedIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sky-200">LinkedIn Profile (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="bg-slate-800/50 border-amber-500/30 text-white placeholder:text-sky-300/40"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-amber-500/20 p-4 bg-slate-800/30">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-amber-500/50 data-[state=checked]:bg-amber-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sky-200 text-sm">
                            I agree to be contacted about panelist opportunities and understand that submitting this application does not guarantee selection. *
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6"
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Mic2 className="w-4 h-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GuestPanelistApplication;
