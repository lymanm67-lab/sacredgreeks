import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Mic, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import drLymanImage from "@/assets/dr-lyman-montgomery.png";

const speakingRequestSchema = z.object({
  organizerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  organizerEmail: z.string().email("Invalid email address").max(255),
  organizerPhone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  organizationName: z.string().min(2, "Organization name is required").max(200),
  eventName: z.string().min(2, "Event name is required").max(200),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().min(1, "Event date is required"),
  eventLocation: z.string().min(2, "Event location is required").max(300),
  expectedAttendees: z.string().min(1, "Please select expected attendance"),
  topicRequested: z.string().min(10, "Please describe the topic (at least 10 characters)").max(1000),
  additionalDetails: z.string().max(2000).optional(),
});

type SpeakingRequestForm = z.infer<typeof speakingRequestSchema>;

const SpeakingRequest = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SpeakingRequestForm>({
    resolver: zodResolver(speakingRequestSchema),
  });

  const onSubmit = async (data: SpeakingRequestForm) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("coaching_waitlist").insert({
        full_name: data.organizerName,
        email: data.organizerEmail,
        organization: data.organizationName,
        goals: `SPEAKING REQUEST: ${data.eventName} | Type: ${data.eventType} | Date: ${data.eventDate} | Location: ${data.eventLocation} | Attendees: ${data.expectedAttendees} | Topic: ${data.topicRequested} | Phone: ${data.organizerPhone} | Additional: ${data.additionalDetails || "N/A"}`,
        status: "pending",
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Speaking request submitted successfully!");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        </div>
        <div className="container max-w-2xl py-16 px-4">
          <Card className="bg-gradient-to-br from-blue-900/60 to-indigo-900/40 border-blue-500/30 backdrop-blur-sm text-center">
            <CardContent className="p-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Request Submitted!</h2>
              <p className="text-sky-200">
                Thank you for your interest in having Dr. Lyman Montgomery speak at your event. 
                We will review your request and get back to you within 3-5 business days.
              </p>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Link to="/about-creator">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to About Creator
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container max-w-3xl py-8 px-4 space-y-6 relative">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild className="text-sky-300 hover:text-white hover:bg-blue-800/30">
            <Link to="/about-creator">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Hero Card */}
        <Card className="bg-gradient-to-br from-blue-900/60 to-indigo-900/40 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-60" />
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/20">
                  <img src={drLymanImage} alt="Dr. Lyman Montgomery" className="w-full h-full object-cover object-top" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-sky-200 to-cyan-300 bg-clip-text text-transparent">
                  Invite Dr. Lyman Montgomery
                </h1>
                <p className="text-sky-200 mt-2">
                  Request Dr. Montgomery to speak at your conference, church, chapter event, or organizational gathering.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Form */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-blue-400" />
              Speaking Engagement Request
            </CardTitle>
            <CardDescription className="text-gray-400">
              Please complete all fields so we can properly evaluate your request.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Organizer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-sky-300 border-b border-sky-800/50 pb-2">
                  Contact Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizerName" className="text-gray-300">Your Name *</Label>
                    <Input
                      id="organizerName"
                      {...register("organizerName")}
                      placeholder="Full name"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    />
                    {errors.organizerName && <p className="text-red-400 text-sm">{errors.organizerName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizerEmail" className="text-gray-300">Email Address *</Label>
                    <Input
                      id="organizerEmail"
                      type="email"
                      {...register("organizerEmail")}
                      placeholder="your@email.com"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    />
                    {errors.organizerEmail && <p className="text-red-400 text-sm">{errors.organizerEmail.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organizerPhone" className="text-gray-300">Phone Number *</Label>
                    <Input
                      id="organizerPhone"
                      {...register("organizerPhone")}
                      placeholder="(555) 123-4567"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    />
                    {errors.organizerPhone && <p className="text-red-400 text-sm">{errors.organizerPhone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizationName" className="text-gray-300">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      {...register("organizationName")}
                      placeholder="Church, Chapter, or Organization"
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    />
                    {errors.organizationName && <p className="text-red-400 text-sm">{errors.organizationName.message}</p>}
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-sky-300 border-b border-sky-800/50 pb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Event Details
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventName" className="text-gray-300">Event Name *</Label>
                    <Input
                      id="eventName"
                      {...register("eventName")}
                      placeholder="Annual Conference, Workshop, etc."
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                    />
                    {errors.eventName && <p className="text-red-400 text-sm">{errors.eventName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventType" className="text-gray-300">Event Type *</Label>
                    <Select onValueChange={(value) => setValue("eventType", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conference">Conference / Convention</SelectItem>
                        <SelectItem value="church">Church Service / Revival</SelectItem>
                        <SelectItem value="chapter">Chapter Meeting / Event</SelectItem>
                        <SelectItem value="workshop">Workshop / Training</SelectItem>
                        <SelectItem value="seminar">Seminar / Lecture</SelectItem>
                        <SelectItem value="retreat">Retreat</SelectItem>
                        <SelectItem value="virtual">Virtual Event / Webinar</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.eventType && <p className="text-red-400 text-sm">{errors.eventType.message}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate" className="text-gray-300">Event Date *</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      {...register("eventDate")}
                      className="bg-white/5 border-white/20 text-white"
                    />
                    {errors.eventDate && <p className="text-red-400 text-sm">{errors.eventDate.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expectedAttendees" className="text-gray-300">Expected Attendance *</Label>
                    <Select onValueChange={(value) => setValue("expectedAttendees", value)}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1-50 attendees</SelectItem>
                        <SelectItem value="51-100">51-100 attendees</SelectItem>
                        <SelectItem value="101-250">101-250 attendees</SelectItem>
                        <SelectItem value="251-500">251-500 attendees</SelectItem>
                        <SelectItem value="500+">500+ attendees</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.expectedAttendees && <p className="text-red-400 text-sm">{errors.expectedAttendees.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventLocation" className="text-gray-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Event Location *
                  </Label>
                  <Input
                    id="eventLocation"
                    {...register("eventLocation")}
                    placeholder="City, State or 'Virtual'"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                  />
                  {errors.eventLocation && <p className="text-red-400 text-sm">{errors.eventLocation.message}</p>}
                </div>
              </div>

              {/* Topic & Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-sky-300 border-b border-sky-800/50 pb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Topic & Details
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="topicRequested" className="text-gray-300">Requested Topic / Theme *</Label>
                  <Textarea
                    id="topicRequested"
                    {...register("topicRequested")}
                    placeholder="What topic would you like Dr. Montgomery to address? (e.g., Faith & Greek Life, Sacred Not Sinful, Biblical Response to Critics, etc.)"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 min-h-[100px]"
                  />
                  {errors.topicRequested && <p className="text-red-400 text-sm">{errors.topicRequested.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalDetails" className="text-gray-300">Additional Information (Optional)</Label>
                  <Textarea
                    id="additionalDetails"
                    {...register("additionalDetails")}
                    placeholder="Any additional details about your event, audience, or specific needs..."
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 min-h-[80px]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Speaking Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpeakingRequest;
