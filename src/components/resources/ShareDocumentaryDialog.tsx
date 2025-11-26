import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Facebook, Twitter, Linkedin, Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareDocumentaryDialogProps {
  trigger?: React.ReactNode;
}

export const ShareDocumentaryDialog = ({ trigger }: ShareDocumentaryDialogProps) => {
  const [embedCopied, setEmbedCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const documentaryUrl = "https://www.unmaskinghopethemovie.com/";
  const documentaryTitle = "Unmasking Hope - A Documentary on Faith and Greek Life";
  const documentaryDescription = "Watch this powerful documentary exploring faith, identity, and redemption in Greek life by Dr. Lyman Montgomery";

  const embedCode = `<iframe width="560" height="315" src="https://www.unmaskinghopethemovie.com/" title="Unmasking Hope Documentary" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(documentaryUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(documentaryUrl)}&text=${encodeURIComponent(documentaryTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(documentaryUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(documentaryTitle)}&body=${encodeURIComponent(documentaryDescription + "\n\n" + documentaryUrl)}`,
  };

  const copyToClipboard = async (text: string, type: "embed" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "embed") {
        setEmbedCopied(true);
        setTimeout(() => setEmbedCopied(false), 2000);
      } else {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      }
      toast.success(`${type === "embed" ? "Embed code" : "Link"} copied to clipboard!`);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleSocialShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Unmasking Hope</DialogTitle>
          <DialogDescription>
            Share this powerful documentary with your community or embed it on your website
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="social" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="embed">Embed Code</TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="space-y-4 mt-4">
            <div className="space-y-3">
              <Label>Share on social media</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleSocialShare("facebook")}
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleSocialShare("twitter")}
                >
                  <Twitter className="w-5 h-5 text-sky-500" />
                  Twitter/X
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleSocialShare("linkedin")}
                >
                  <Linkedin className="w-5 h-5 text-blue-700" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleSocialShare("email")}
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                  Email
                </Button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Label htmlFor="share-link">Copy link</Label>
              <div className="flex gap-2">
                <Input
                  id="share-link"
                  value={documentaryUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(documentaryUrl, "link")}
                  className="flex-shrink-0"
                >
                  {linkCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="embed" className="space-y-4 mt-4">
            <div className="space-y-3">
              <Label htmlFor="embed-code">Embed code</Label>
              <p className="text-sm text-muted-foreground">
                Copy this code to embed the documentary on your website
              </p>
              <div className="relative">
                <textarea
                  id="embed-code"
                  value={embedCode}
                  readOnly
                  className="w-full min-h-[120px] p-3 text-sm font-mono bg-muted rounded-lg border border-border resize-none"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(embedCode, "embed")}
                  className="absolute top-2 right-2 gap-2"
                >
                  {embedCopied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold">How to use:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Copy the embed code above</li>
                <li>Paste it into your website's HTML where you want the documentary to appear</li>
                <li>The documentary will display as an embedded player on your page</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
