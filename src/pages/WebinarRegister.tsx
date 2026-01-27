import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Video, 
  CalendarDays, 
  Clock, 
  Users, 
  CheckCircle2,
  Sparkles,
  Mail,
  User,
  Phone
} from "lucide-react";

// Webinar data
const webinars: Record<string, {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  longDescription: string;
  benefits: string[];
  spots: string;
}> = {
  "faith-and-frat": {
    id: "faith-and-frat",
    title: "Faith & Frat: Biblical Clarity on Greek Life",
    date: "Every Tuesday",
    time: "7:00 PM EST",
    description: "Live Q&A with campus ministers and Greek alumni on navigating faith in fraternity/sorority life.",
    longDescription: "Join our weekly live session where we tackle the tough questions about faith and Greek life. Whether you're considering joining, already a member, or facing criticism from family and church, this is your space to get real answers from people who understand both worlds.",
    benefits: [
      "Live Q&A with experienced campus ministers",
      "Connect with Greek alumni who share your faith",
      "Get biblical perspectives on common concerns",
      "Access to replay recordings",
      "Private community group access"
    ],
    spots: "Limited Spots Available"
  },
  "handling-hard-questions": {
    id: "handling-hard-questions",
    title: "Handling the Hard Questions",
    date: "February 8, 2026",
    time: "8:00 PM EST",
    description: "How to respond when family, church, or friends challenge your Greek membership.",
    longDescription: "This special session focuses on equipping you with thoughtful, scripture-based responses to the most common objections about Greek life. Learn how to have productive conversations that honor your faith, your family, and your fraternity/sorority.",
    benefits: [
      "Script templates for common objections",
      "Role-play scenarios with live feedback",
      "Biblical framework for respectful dialogue",
      "Downloadable response guide",
      "Follow-up coaching opportunity"
    ],
    spots: "Free to Join"
  }
};

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  greekOrganization: z.string().optional(),
  howHeard: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function WebinarRegister() {
  const { webinarId } = useParams<{ webinarId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const webinar = webinarId ? webinars[webinarId] : null;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      greekOrganization: "",
      howHeard: ""
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (!webinar) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("webinar_registrations").insert({
        webinar_id: webinar.id,
        webinar_title: webinar.title,
        full_name: values.fullName,
        email: values.email,
        phone: values.phone || null,
        greek_organization: values.greekOrganization || null,
        how_heard: values.howHeard || null
      });

      if (error) throw error;

      // Send admin notification email (fire and forget - don't block on this)
      supabase.functions.invoke('notify-webinar-registration', {
        body: {
          webinarTitle: webinar.title,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          greekOrganization: values.greekOrganization,
          howHeard: values.howHeard
        }
      }).catch(err => console.error('Failed to send admin notification:', err));

      setIsRegistered(true);
      toast.success("You're registered! Check your email for details.");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!webinar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(220,60%,6%)] via-[hsl(225,55%,10%)] to-[hsl(230,50%,8%)] flex items-center justify-center p-4">
        <Card className="bg-slate-900/80 border-red-500/30 max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Webinar Not Found</h2>
            <p className="text-sky-200/70 mb-4">This webinar doesn't exist or has ended.</p>
            <Link to="/land">
              <Button variant="outline" className="border-blue-500/30 text-blue-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(220,60%,6%)] via-[hsl(225,55%,10%)] to-[hsl(230,50%,8%)] flex items-center justify-center p-4">
        <Card className="bg-slate-900/80 border-green-500/30 max-w-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">You're Registered!</h2>
            <p className="text-sky-200/70 mb-2">
              We've saved your spot for <span className="text-blue-300">{webinar.title}</span>
            </p>
            <p className="text-sky-200/60 text-sm mb-6">
              Check your email for joining details and calendar invite.
            </p>
            
            <div className="space-y-3">
              <Link to="/snapshot">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Take Your Faith Snapshot While You Wait
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
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Webinar Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30">
                <Video className="w-3 h-3 mr-1" />
                Free Live Webinar
              </Badge>
              <h1 className="text-3xl font-bold text-white mb-3">{webinar.title}</h1>
              <p className="text-sky-200/80">{webinar.longDescription}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-blue-300">
                <CalendarDays className="w-4 h-4" />
                {webinar.date}
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <Clock className="w-4 h-4" />
                {webinar.time}
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <Users className="w-4 h-4" />
                {webinar.spots}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                What You'll Get
              </h3>
              <ul className="space-y-3">
                {webinar.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sky-200/80 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="bg-slate-900/80 border border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Reserve Your Spot</CardTitle>
              <CardDescription className="text-sky-200/70">
                Fill out the form below to register for this free webinar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                              className="pl-10 bg-slate-800/50 border-blue-500/30 text-white placeholder:text-sky-300/40"
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
                              className="pl-10 bg-slate-800/50 border-blue-500/30 text-white placeholder:text-sky-300/40"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                              className="pl-10 bg-slate-800/50 border-blue-500/30 text-white placeholder:text-sky-300/40"
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
                        <FormLabel className="text-sky-200">Greek Organization (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="e.g., Alpha Phi Alpha, Delta Sigma Theta"
                            className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-sky-300/40"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="howHeard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sky-200">How did you hear about us?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-800/50 border-blue-500/30 text-white">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-900 border-blue-500/30">
                            <SelectItem value="social-media">Social Media</SelectItem>
                            <SelectItem value="friend">Friend/Word of Mouth</SelectItem>
                            <SelectItem value="search">Google Search</SelectItem>
                            <SelectItem value="campus">Campus Ministry</SelectItem>
                            <SelectItem value="chapter">My Chapter</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-6"
                  >
                    {isSubmitting ? "Registering..." : "Reserve My Spot"}
                  </Button>

                  <p className="text-xs text-center text-sky-300/50">
                    100% free. We'll send you a reminder before the session.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
