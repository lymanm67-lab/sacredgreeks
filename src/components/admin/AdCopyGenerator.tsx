import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, ExternalLink, Facebook, Linkedin, Target, Sparkles } from "lucide-react";

interface AdCopy {
  platform: string;
  headline: string;
  primaryText: string;
  description?: string;
  callToAction: string;
  utmParams: string;
}

const adCopyTemplates: Record<string, AdCopy[]> = {
  google: [
    {
      platform: "Google Ads",
      headline: "Faith & Greek Life United | Sacred Greeks",
      primaryText: "Daily devotionals, biblical guidance, and community for Greeks serious about their faith. Take the free Faith Snapshot assessment.",
      description: "Join 1,000+ Greeks growing spiritually",
      callToAction: "Take Free Assessment",
      utmParams: "utm_source=google&utm_medium=cpc&utm_campaign=faith_snapshot",
    },
    {
      platform: "Google Ads",
      headline: "Defend Your Faith in Greek Life",
      primaryText: "Tired of criticism from family and church? Get biblical responses to the toughest questions about Greek organizations.",
      description: "PROOF Framework Course - Free Access",
      callToAction: "Get Started Free",
      utmParams: "utm_source=google&utm_medium=cpc&utm_campaign=proof_course",
    },
    {
      platform: "Google Ads",
      headline: "Greek Life + Christianity | Sacred Greeks",
      primaryText: "Navigate fraternity life with faith. Daily devotionals written by Greeks, for Greeks. Start your 3-min Faith Snapshot today.",
      description: "No credit card required",
      callToAction: "Start Free Snapshot",
      utmParams: "utm_source=google&utm_medium=cpc&utm_campaign=devotionals",
    },
  ],
  facebook: [
    {
      platform: "Facebook/Instagram",
      headline: "Your Faith Doesn't Have to Take a Backseat to Greek Life",
      primaryText: `🙏 Being Greek AND Christian isn't always easy.

The party pressure. The chapter events on Sundays. Family members who don't understand.

But here's the thing: 1,000+ Greeks are proving you CAN thrive in both.

Sacred Greeks gives you:
✅ Daily devotionals written for Greek life
✅ Biblical responses to tough questions
✅ A community that gets it

Take the free Faith Snapshot assessment and get your personalized growth path.`,
      callToAction: "Take Assessment",
      utmParams: "utm_source=facebook&utm_medium=paid&utm_campaign=faith_snapshot",
    },
    {
      platform: "Facebook/Instagram",
      headline: "The Question Every Christian Greek Faces",
      primaryText: `"How do you balance your faith with being in a fraternity/sorority?"

I used to dread this question. From pastors. From family. Even from myself.

Then I found a community of Greeks who:
→ Read Scripture daily
→ Support each other's spiritual growth
→ Navigate the same challenges I face

Take the 3-minute Faith Snapshot. See where you stand. Get a plan to grow.

It's free. It's private. And it might change everything.`,
      callToAction: "Start Snapshot",
      utmParams: "utm_source=facebook&utm_medium=paid&utm_campaign=community",
    },
  ],
  linkedin: [
    {
      platform: "LinkedIn",
      headline: "For Greek Life Professionals: Faith-Based Member Development",
      primaryText: `Fraternity and sorority members face unique spiritual challenges during college.

Sacred Greeks provides:
• Daily devotional content tailored to Greek life
• The PROOF Framework for addressing organizational criticism
• Community support for faith-based Greeks

We've helped members from Alpha Phi Alpha, Delta Sigma Theta, Kappa Alpha Psi, and 50+ other organizations.

Encourage your members to take the free Faith Snapshot assessment.`,
      callToAction: "Learn More",
      utmParams: "utm_source=linkedin&utm_medium=paid&utm_campaign=b2b_chapter",
    },
    {
      platform: "LinkedIn",
      headline: "Alumni: Help Your Chapter Members Grow in Faith",
      primaryText: `As Greek alumni, we remember the challenges of balancing chapter life with our values.

Sacred Greeks is a digital platform that helps active members:
✓ Develop consistent spiritual practices
✓ Respond confidently to faith-based criticism
✓ Connect with a community of like-minded Greeks

Gift your chapter access or share with active members you mentor.`,
      callToAction: "Explore Resources",
      utmParams: "utm_source=linkedin&utm_medium=paid&utm_campaign=alumni",
    },
  ],
};

export const AdCopyGenerator = () => {
  const [baseUrl, setBaseUrl] = useState("https://sacredgreeks.lovable.app/land");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const getFullUrl = (utmParams: string) => {
    return `${baseUrl}?${utmParams}`;
  };

  const PlatformIcon = ({ platform }: { platform: string }) => {
    if (platform.includes("Facebook")) return <Facebook className="w-4 h-4" />;
    if (platform.includes("LinkedIn")) return <Linkedin className="w-4 h-4" />;
    return <Target className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Ad Copy Generator
        </h2>
        <p className="text-muted-foreground">Ready-to-use ad copy with UTM tracking for all platforms</p>
      </div>

      {/* Base URL Configuration */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium whitespace-nowrap">Landing Page URL:</label>
            <Input 
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="google">
        <TabsList>
          <TabsTrigger value="google" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Google Ads
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center gap-2">
            <Facebook className="w-4 h-4" />
            Facebook/Instagram
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </TabsTrigger>
        </TabsList>

        {Object.entries(adCopyTemplates).map(([platform, ads]) => (
          <TabsContent key={platform} value={platform} className="mt-4 space-y-4">
            {ads.map((ad, index) => (
              <Card key={index} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform={ad.platform} />
                      <CardTitle className="text-lg">{ad.platform}</CardTitle>
                    </div>
                    <Badge variant="outline">Variant {index + 1}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Headline */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase">Headline</label>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(ad.headline, "Headline")}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="font-semibold">{ad.headline}</p>
                  </div>

                  {/* Primary Text */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase">Primary Text</label>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(ad.primaryText, "Primary text")}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-sm whitespace-pre-line p-3 rounded-lg bg-muted/50">{ad.primaryText}</p>
                  </div>

                  {/* Description (if exists) */}
                  {ad.description && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-muted-foreground uppercase">Description</label>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(ad.description!, "Description")}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm">{ad.description}</p>
                    </div>
                  )}

                  {/* CTA & URL */}
                  <div className="flex flex-wrap gap-4 pt-2 border-t">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase block mb-1">CTA Button</label>
                      <Badge>{ad.callToAction}</Badge>
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-medium text-muted-foreground uppercase block mb-1">Tracking URL</label>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                          {getFullUrl(ad.utmParams)}
                        </code>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(getFullUrl(ad.utmParams), "URL")}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(getFullUrl(ad.utmParams), '_blank')}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* UTM Parameter Reference */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-sm">UTM Parameter Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">utm_source</p>
              <p className="text-muted-foreground">google, facebook, linkedin</p>
            </div>
            <div>
              <p className="font-medium">utm_medium</p>
              <p className="text-muted-foreground">cpc, paid, organic</p>
            </div>
            <div>
              <p className="font-medium">utm_campaign</p>
              <p className="text-muted-foreground">faith_snapshot, proof_course, etc.</p>
            </div>
            <div>
              <p className="font-medium">Tracking</p>
              <p className="text-muted-foreground">Auto-captured in analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
