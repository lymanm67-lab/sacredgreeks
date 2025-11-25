import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Twitter, Instagram, Youtube, MessageCircle, Users } from "lucide-react";
import { useExternalLinks } from "@/hooks/use-external-links";

export function SocialMediaConnect() {
  const { openExternalLink } = useExternalLinks();

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/sacredgreeks",
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/sacredgreeks",
      color: "hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/sacredgreeks",
      color: "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white hover:border-transparent"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@sacredgreeks",
      color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]"
    }
  ];

  const communityLinks = [
    {
      name: "Join Discord Community",
      icon: MessageCircle,
      url: "https://discord.gg/sacredgreeks",
      description: "Connect with brothers in faith",
      color: "hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2]"
    },
    {
      name: "Join Facebook Group",
      icon: Users,
      url: "https://facebook.com/groups/sacredgreeks",
      description: "Engage in daily discussions",
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Connect With Our Community
          </CardTitle>
          <CardDescription>
            Follow us on social media and join our online community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Follow Us</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  onClick={() => openExternalLink(social.url)}
                  className={`gap-2 transition-colors ${social.color}`}
                >
                  <social.icon className="h-4 w-4" />
                  {social.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Join Our Community</h3>
            <div className="grid gap-3">
              {communityLinks.map((community) => (
                <Card key={community.name} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <community.icon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{community.name}</p>
                          <p className="text-xs text-muted-foreground">{community.description}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openExternalLink(community.url)}
                        className={`shrink-0 transition-colors ${community.color}`}
                      >
                        Join
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
