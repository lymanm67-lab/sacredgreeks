import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, MessageSquare, Mail, Share2, QrCode, Smartphone, Users, Church, GraduationCap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/SEOHead';
import QRCode from 'react-qr-code';

interface Template {
  id: string;
  name: string;
  audience: string;
  icon: React.ReactNode;
  message: string;
}

const textTemplates: Template[] = [
  {
    id: 'general',
    name: 'General Share',
    audience: 'Anyone',
    icon: <Users className="h-4 w-4" />,
    message: `Check out Sacred Greeks Life – a free app for Christians navigating Greek life. Daily devotionals, prayer tools, and biblical guidance. Get it here: sacredgreekslife.com`
  },
  {
    id: 'greek-member',
    name: 'Greek Member',
    audience: 'Fraternity/Sorority Members',
    icon: <GraduationCap className="h-4 w-4" />,
    message: `Hey! Found this app that's been helping me balance my faith and Greek life. It has devotionals specifically for us, prayer tools, and real talk about the challenges we face. It's free: sacredgreekslife.com`
  },
  {
    id: 'divine-nine',
    name: 'Divine Nine / BGLO',
    audience: 'NPHC Members',
    icon: <Heart className="h-4 w-4" />,
    message: `Wanted to share this with you – Sacred Greeks Life app addresses the questions we have about faith and BGLO membership. Dr. Lyman Montgomery created it. The BGLO Objection Guide is really helpful. Free at: sacredgreekslife.com`
  },
  {
    id: 'church-leader',
    name: 'Church Leader',
    audience: 'Pastors/Ministers',
    icon: <Church className="h-4 w-4" />,
    message: `Thought of you – there's a new resource for Christians in Greek life called Sacred Greeks Life. It uses biblical frameworks to help young people navigate faith and fraternity/sorority membership. Great for campus ministry: sacredgreekslife.com`
  },
  {
    id: 'parent',
    name: 'Parent Share',
    audience: 'Parents of Greek Members',
    icon: <Users className="h-4 w-4" />,
    message: `Found a great resource for your son/daughter in Greek life – Sacred Greeks Life app helps them stay grounded in faith while in their organization. Daily devotionals and prayer support. It's free: sacredgreekslife.com`
  },
  {
    id: 'install-help',
    name: 'Installation Help',
    audience: 'Someone having trouble',
    icon: <Smartphone className="h-4 w-4" />,
    message: `Here's how to install Sacred Greeks on your iPhone:
1. Open Safari (must be Safari!)
2. Go to sacredgreekslife.com
3. Tap the Share button (square with arrow)
4. Tap "Add to Home Screen"

If you tried before and it didn't work, clear Safari history first: Settings → Safari → Clear History`
  }
];

const emailTemplates: Template[] = [
  {
    id: 'email-intro',
    name: 'Introduction Email',
    audience: 'New contacts',
    icon: <Mail className="h-4 w-4" />,
    message: `Subject: Free Resource for Christians in Greek Life

Hi [Name],

I wanted to share a resource that's been meaningful to me – the Sacred Greeks Life app.

It's a free app created by Dr. Lyman Montgomery (author of "Sacred, Not Sinful") designed specifically for Christians navigating Greek life. It includes:

• Daily devotionals tailored to our unique challenges
• Prayer journal and community prayer wall
• Bible study tools with AI-powered search
• The P.R.O.O.F. framework for biblical discernment
• Progress tracking and spiritual growth tools

You can access it at sacredgreekslife.com – it works on any phone and can be installed like a regular app.

Let me know what you think!

[Your name]`
  },
  {
    id: 'email-chapter',
    name: 'Chapter Announcement',
    audience: 'Greek chapter members',
    icon: <Users className="h-4 w-4" />,
    message: `Subject: Faith Resource for Our Chapter

Hey everyone,

Wanted to share a resource for those of us balancing our faith with Greek life – it's called Sacred Greeks Life.

It's a free app with daily devotionals, prayer tools, and guidance specifically for Christians in Greek organizations. No judgment, just support.

Check it out: sacredgreekslife.com

The app can be added to your phone's home screen for easy access.

Let me know if you have questions!

[Your name]`
  }
];

const socialTemplates: Template[] = [
  {
    id: 'social-short',
    name: 'Short Post',
    audience: 'Twitter/X',
    icon: <Share2 className="h-4 w-4" />,
    message: `Christians in Greek life – check out Sacred Greeks Life app 🙏✝️ Free daily devotionals, prayer tools, and biblical guidance. sacredgreekslife.com #GreekLife #Faith #BGLO`
  },
  {
    id: 'social-story',
    name: 'Personal Story',
    audience: 'Instagram/Facebook',
    icon: <Share2 className="h-4 w-4" />,
    message: `Navigating faith and Greek life isn't always easy. That's why I love the Sacred Greeks Life app – it's helped me stay grounded spiritually while honoring my commitment to my organization.

If you're looking for daily devotionals, prayer support, and biblical guidance specifically for Greeks, check it out. It's free!

🔗 sacredgreekslife.com

#SacredGreeks #GreekLife #Faith #Christian #NPHC #Divine9`
  }
];

function TemplateCard({ template, onCopy }: { template: Template; onCopy: (text: string) => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(template.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              {template.icon}
            </div>
            <CardTitle className="text-base">{template.name}</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            {template.audience}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans bg-muted/50 p-3 rounded-lg mb-3 max-h-48 overflow-y-auto">
          {template.message}
        </pre>
        <Button 
          onClick={handleCopy} 
          variant={copied ? "default" : "outline"}
          className="w-full"
          size="sm"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Message
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ShareToolkit() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const appUrl = 'https://sacredgreekslife.com';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Message copied to clipboard',
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    toast({
      title: 'Link Copied!',
      description: 'App link copied to clipboard',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Share Toolkit - Sacred Greeks Life"
        description="Ready-to-use templates for sharing Sacred Greeks Life with friends, family, and Greek organizations."
      />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Share Toolkit</h1>
          <p className="text-muted-foreground">
            Ready-to-use templates to share Sacred Greeks Life with others
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={handleCopyLink}>
            <Copy className="h-5 w-5" />
            <span className="text-xs">Copy Link</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
            <Link to="/install-guide">
              <Smartphone className="h-5 w-5" />
              <span className="text-xs">Install Guide</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
            <Link to="/qr-code">
              <QrCode className="h-5 w-5" />
              <span className="text-xs">QR Code</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
            <Link to="/install">
              <Share2 className="h-5 w-5" />
              <span className="text-xs">Full Install Page</span>
            </Link>
          </Button>
        </div>

        {/* QR Code Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Quick Share QR Code
            </CardTitle>
            <CardDescription>
              Screenshot this QR code and send via text for easy sharing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCode value={appUrl} size={150} />
              </div>
              <div className="text-center md:text-left">
                <p className="font-medium mb-2">sacredgreekslife.com</p>
                <p className="text-sm text-muted-foreground mb-4">
                  People can scan this with their phone camera to open the app
                </p>
                <Button variant="outline" size="sm" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates */}
        <Tabs defaultValue="text" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Text Messages</span>
              <span className="sm:hidden">Text</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Emails</span>
              <span className="sm:hidden">Email</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Social Media</span>
              <span className="sm:hidden">Social</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text">
            <div className="grid md:grid-cols-2 gap-4">
              {textTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} onCopy={handleCopy} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="email">
            <div className="grid md:grid-cols-2 gap-4">
              {emailTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} onCopy={handleCopy} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="grid md:grid-cols-2 gap-4">
              {socialTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} onCopy={handleCopy} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Tips */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Sharing Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Personal touch:</strong> Add your own experience to make messages more authentic</p>
            <p>• <strong>iPhone users:</strong> Remind them to use Safari (not Chrome) to install</p>
            <p>• <strong>Older recipients:</strong> Send the Install Guide link or screenshot for step-by-step help</p>
            <p>• <strong>Group chats:</strong> The QR code works great for in-person chapter meetings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
