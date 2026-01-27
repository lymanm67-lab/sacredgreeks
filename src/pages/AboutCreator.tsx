import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, BookOpen, Headphones, Heart, GraduationCap, Church, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCreator = () => {
  return (
    <div className="container max-w-4xl py-8 px-4 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-sacred to-sacred/70 rounded-full flex items-center justify-center">
          <User className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Dr. Lyman Montgomery
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">Scholar</Badge>
          <Badge variant="secondary">Minister</Badge>
          <Badge variant="secondary">Author</Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Founder of Sacred Greeks & Author of "Sacred Not Sinful"
        </p>
      </div>

      {/* Mission Card */}
      <Card className="bg-gradient-to-br from-sacred/10 to-transparent border-sacred/20">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Heart className="h-8 w-8 text-sacred shrink-0" />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">The Mission</h2>
              <p className="text-muted-foreground">
                To provide biblical clarity and healing for Greek-affiliated believers navigating the intersection of faith and fraternal membership. Dr. Montgomery's work bridges the gap between theological understanding and the lived experience of Christian Greeks.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-sacred" />
            The Story Behind Sacred Greeks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Dr. Lyman Montgomery is a devoted scholar and minister who understands the unique challenges Christians face when navigating Black Greek Letter Organization membership. After years of witnessing the pain, confusion, and division caused by the faith versus fraternity debate, he set out to provide biblical clarity and healing for Greek-affiliated believers.
          </p>
          <p className="text-muted-foreground">
            Through extensive research, pastoral counseling, and personal experience, Dr. Montgomery developed a comprehensive theological framework that addresses the concerns many Christians have about Greek life. His approach is rooted in Scripture while remaining sensitive to the rich history and positive contributions of BGLOs.
          </p>
          <p className="text-muted-foreground">
            Sacred Greeks is the culmination of this work—a platform designed to equip believers with sound theology, historical context, and practical tools to live confidently in both their faith and their Greek identity.
          </p>
        </CardContent>
      </Card>

      {/* Ministry Focus */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Church className="h-5 w-5 text-sacred" />
            Ministry Focus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sacred mt-2 shrink-0" />
              <span className="text-muted-foreground">
                Providing biblical responses to common objections about Greek membership
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sacred mt-2 shrink-0" />
              <span className="text-muted-foreground">
                Equipping Greek Christians with tools for spiritual growth
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sacred mt-2 shrink-0" />
              <span className="text-muted-foreground">
                Healing division within families and churches over this issue
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sacred mt-2 shrink-0" />
              <span className="text-muted-foreground">
                Training church leaders to minister effectively to Greek members
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Resources CTA */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="hover:border-sacred/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-sacred/10">
                <BookOpen className="h-6 w-6 text-sacred" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">Get the Book</h3>
                <p className="text-sm text-muted-foreground">
                  Sacred Not Sinful: A Biblical Response to the BGLO Debate
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/order-book">
                    Order Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-sacred/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-sacred/10">
                <Headphones className="h-6 w-6 text-sacred" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">Listen to the Podcast</h3>
                <p className="text-sm text-muted-foreground">
                  Sacred Greeks Podcast with Dr. Montgomery
                </p>
                <Button variant="outline" size="sm" asChild>
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
  );
};

export default AboutCreator;
