import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Headphones, Heart, GraduationCap, Church, ArrowRight, Mic, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import drLymanImage from "@/assets/dr-lyman-montgomery.png";

const AboutCreator = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sacred/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-fuchsia-500/15 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container max-w-4xl py-8 px-4 space-y-8 relative">
        {/* Hero Section with Photo */}
        <div className="text-center space-y-6">
          {/* Profile Image */}
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-sacred via-purple-500 to-fuchsia-500 rounded-full blur-md opacity-75 animate-pulse" />
            <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img 
                src={drLymanImage} 
                alt="Dr. Lyman Montgomery" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-sacred bg-clip-text text-transparent">
              Dr. Lyman Montgomery
            </h1>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-gradient-to-r from-sacred to-amber-500 text-white border-0">Scholar</Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white border-0">Minister</Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">Author</Badge>
            </div>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Founder of Sacred Greeks & Author of "Sacred Not Sinful"
            </p>
          </div>
        </div>

        {/* Mission Card */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/30 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 shrink-0">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-white">The Mission</h2>
                <p className="text-purple-200">
                  To provide biblical clarity and healing for Greek-affiliated believers navigating the intersection of faith and fraternal membership. Dr. Montgomery's work bridges the gap between theological understanding and the lived experience of Christian Greeks.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Story Section */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              The Story Behind Sacred Greeks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Dr. Lyman Montgomery is a devoted scholar and minister who understands the unique challenges Christians face when navigating Black Greek Letter Organization membership. After years of witnessing the pain, confusion, and division caused by the faith versus fraternity debate, he set out to provide biblical clarity and healing for Greek-affiliated believers.
            </p>
            <p className="text-gray-300">
              Through extensive research, pastoral counseling, and personal experience, Dr. Montgomery developed a comprehensive theological framework that addresses the concerns many Christians have about Greek life. His approach is rooted in Scripture while remaining sensitive to the rich history and positive contributions of BGLOs.
            </p>
            <p className="text-gray-300">
              Sacred Greeks is the culmination of this work—a platform designed to equip believers with sound theology, historical context, and practical tools to live confidently in both their faith and their Greek identity.
            </p>
          </CardContent>
        </Card>

        {/* Ministry Focus */}
        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border-blue-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Church className="h-5 w-5 text-white" />
              </div>
              Ministry Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Providing biblical responses to common objections about Greek membership",
                "Equipping Greek Christians with tools for spiritual growth",
                "Healing division within families and churches over this issue",
                "Training church leaders to minister effectively to Greek members",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 mt-2 shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Get Involved CTAs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-sacred via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Get Involved
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-purple-600/30 to-fuchsia-600/20 border-purple-400/30 hover:border-purple-400/60 transition-all backdrop-blur-sm group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 group-hover:scale-110 transition-transform">
                    <Mic className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-white">Be on the Podcast</h3>
                    <p className="text-sm text-purple-200">
                      Share your story on the Sacred Greeks Podcast
                    </p>
                    <Button variant="outline" size="sm" asChild className="border-purple-400 text-purple-300 hover:bg-purple-500/20">
                      <Link to="/guest-panelist-application">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-sacred/30 to-amber-600/20 border-amber-400/30 hover:border-amber-400/60 transition-all backdrop-blur-sm group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-sacred to-amber-500 group-hover:scale-110 transition-transform">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-white">Speak at Next Event</h3>
                    <p className="text-sm text-amber-200">
                      Request to speak at our next training event
                    </p>
                    <Button variant="outline" size="sm" asChild className="border-amber-400 text-amber-300 hover:bg-amber-500/20">
                      <Link to="/guest-panelist-application">
                        Request Invite <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resources CTA */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-emerald-900/40 to-teal-900/30 border-emerald-500/30 hover:border-emerald-400/60 transition-all backdrop-blur-sm group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-white">Get the Book</h3>
                  <p className="text-sm text-emerald-200">
                    Sacred Not Sinful: A Biblical Response to the BGLO Debate
                  </p>
                  <Button variant="outline" size="sm" asChild className="border-emerald-400 text-emerald-300 hover:bg-emerald-500/20">
                    <Link to="/order-book">
                      Order Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-sky-900/40 to-indigo-900/30 border-sky-500/30 hover:border-sky-400/60 transition-all backdrop-blur-sm group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 group-hover:scale-110 transition-transform">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-white">Listen to the Podcast</h3>
                  <p className="text-sm text-sky-200">
                    Sacred Greeks Podcast with Dr. Montgomery
                  </p>
                  <Button variant="outline" size="sm" asChild className="border-sky-400 text-sky-300 hover:bg-sky-500/20">
                    <Link to="/podcast">
                      Listen Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutCreator;
