import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ExternalLink, RefreshCw, BookOpen, MessageSquare, Video, Share2, Check, Download, Facebook, Linkedin, Twitter } from "lucide-react";
import { SacredGreeksAnswers, SacredGreeksScores, ResultType } from "@/types/assessment";
import { sacredGreeksResults, type Scenario } from "@/sacredGreeksContent";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { SocialShareDialog } from "@/components/SocialShareDialog";
import { AchievementBadgeDialog } from "@/components/AchievementBadgeDialog";
import { ExternalContentModal } from "@/components/ui/ExternalContentModal";
import { useExternalLinks } from "@/hooks/use-external-links";
import { downloadCertificatePDF } from "@/lib/certificate-generator";
import { useCertificateMeta } from "@/hooks/use-certificate-meta";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SacredGreeksResultsProps {
  resultType: ResultType;
  scores: SacredGreeksScores;
  answers: SacredGreeksAnswers;
  onRestart?: () => void;
  isSharedView?: boolean;
}

export function SacredGreeksResults({ resultType, scores, answers, onRestart, isSharedView = false }: SacredGreeksResultsProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const { openExternalLink } = useExternalLinks();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const scenario = answers.scenario as Scenario;
  const content = sacredGreeksResults[scenario]?.[resultType];

  // Set certificate meta tags for social sharing
  useCertificateMeta(!isSharedView ? {
    assessmentType: resultType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    scenario: scenario,
    userName: user?.user_metadata?.full_name || user?.email
  } : null);

  const handleDownloadPDF = () => {
    const userName = user?.user_metadata?.full_name || user?.email || "Sacred Greeks Member";
    downloadCertificatePDF({
      userName,
      assessmentType: resultType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      scenario: scenario,
      completionDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
    toast({
      title: "Certificate Downloaded!",
      description: "Your PDF certificate has been saved to your downloads.",
    });
  };

  const shareToSocial = (platform: 'facebook' | 'linkedin' | 'twitter') => {
    const text = `I just completed the Sacred Greeks Decision Guide! 🎓 Assessment: ${resultType.replace(/_/g, ' ')} - ${scenario}`;
    const url = shareUrl || window.location.href;
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
    toast({
      title: "Sharing Certificate",
      description: `Opening ${platform} to share your achievement!`,
    });
  };

  if (!content) {
    return <div>Error: Content not found for this scenario and result type.</div>;
  }

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      // Save email to database
      const { error: dbError } = await supabase
        .from("assessment_submissions")
        .update({ email, consent_to_contact: true })
        .eq("answers_json", answers as any)
        .eq("result_type", resultType);

      if (dbError) throw dbError;

      // Send email with results
      const { error: emailError } = await supabase.functions.invoke("send-results-email", {
        body: {
          email,
          resultType,
          scenario,
          content,
        },
      });

      if (emailError) throw emailError;

      toast({
        title: "Email sent!",
        description: "Check your inbox for your assessment results.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to share your results.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Find the assessment ID by matching answers
      const { data: assessment } = await supabase
        .from('assessment_submissions')
        .select('id')
        .eq('user_id', user.id)
        .eq('result_type', resultType)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!assessment) {
        toast({
          title: "Error",
          description: "Could not find assessment to share.",
          variant: "destructive",
        });
        return;
      }

      // Generate unique token
      const token = crypto.randomUUID();

      // Create share record
      const { error } = await supabase
        .from('shared_results')
        .insert({
          assessment_id: assessment.id,
          share_token: token,
          shared_by: user.id,
        });

      if (error) throw error;

      const url = `${window.location.origin}/shared/${token}`;
      setShareUrl(url);

      // Copy to clipboard
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);

      toast({
        title: "Link copied!",
        description: "Share this link with your mentor or accountability partner.",
      });
    } catch (error) {
      console.error('Share error:', error);
      toast({
        title: "Error",
        description: "Failed to create share link.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Certificate of Completion */}
      {!isSharedView && (
        <Card className="border-2 border-sacred bg-gradient-to-br from-sacred via-purple-600 to-blue-600 text-white overflow-hidden">
          <CardContent className="p-8">
            <div className="bg-white/95 backdrop-blur rounded-lg p-8 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred/10 mb-2">
                  <Heart className="w-8 h-8 text-sacred" />
                </div>
                <h2 className="text-3xl font-bold text-sacred">Certificate of Completion</h2>
                <div className="h-1 w-20 bg-sacred mx-auto rounded-full"></div>
                <p className="text-muted-foreground text-lg">This certifies that you have completed the</p>
                <h3 className="text-2xl font-semibold text-purple-600">Sacred Greeks Decision Guide</h3>
                <div className="pt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Assessment Type:</p>
                  <p className="text-lg font-semibold text-foreground">{resultType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - {scenario}</p>
                </div>
                <p className="text-sm text-muted-foreground pt-6">
                  Completed on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleDownloadPDF}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => shareToSocial('linkedin')}>
                        <Linkedin className="w-4 h-4 mr-2" />
                        Share on LinkedIn
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => shareToSocial('facebook')}>
                        <Facebook className="w-4 h-4 mr-2" />
                        Share on Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => shareToSocial('twitter')}>
                        <Twitter className="w-4 h-4 mr-2" />
                        Share on Twitter
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {user?.email && (
                  <Button
                    onClick={async () => {
                      try {
                        const { error } = await supabase.functions.invoke("send-results-email", {
                          body: {
                            email: user.email,
                            resultType,
                            scenario,
                            content,
                          },
                        });
                        if (error) throw error;
                        toast({
                          title: "Certificate Sent!",
                          description: "Your certificate and results have been emailed to you.",
                        });
                      } catch (error) {
                        console.error("Error sending email:", error);
                        toast({
                          title: "Error",
                          description: "Failed to send email. Please try again.",
                          variant: "destructive",
                        });
                      }
                    }}
                    className="w-full"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Email Certificate & Results
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Headline and Intro */}
      <Card className="border-2 border-sacred/20 bg-gradient-to-br from-sacred/5 to-background">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-sacred/10 flex items-center justify-center flex-shrink-0">
              <Heart className="w-7 h-7 text-sacred" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl mb-3">{content.headline}</CardTitle>
              <CardDescription className="text-base leading-relaxed">{content.intro}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Scripture Toolkit */}
      {content.scriptureToolkit.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sacred" />
              <CardTitle className="text-xl">Scripture Toolkit</CardTitle>
            </div>
            <CardDescription>
              Use these passages to ground your thinking and conversations in God's Word.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.scriptureToolkit.map((scripture, index) => (
              <div key={index} className="border-l-4 border-sacred/30 pl-4 space-y-1">
                <p className="font-semibold text-foreground">{scripture.ref}</p>
                <p className="text-sm text-muted-foreground">{scripture.summary}</p>
                <p className="text-sm italic text-muted-foreground">When to use: {scripture.whenToUse}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Sample Responses */}
      {content.sampleResponses.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sacred" />
              <CardTitle className="text-xl">Sample Responses</CardTitle>
            </div>
            <CardDescription>
              Use these examples to help you respond with clarity, grace, and conviction.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {content.sampleResponses.map((response, index) => (
              <div key={index} className="space-y-3 p-4 bg-muted/30 rounded-lg">
                <p className="font-semibold text-sacred">{response.label}</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Objection:</span> "{response.objection}"
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">You can say:</span> "{response.youCanSay}"
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* P.R.O.O.F. Framework */}
      <Card className="border-2 border-sacred/20">
        <CardHeader>
          <CardTitle className="text-xl">P.R.O.O.F. Framework</CardTitle>
          <CardDescription>
            Five lenses to help you examine your situation biblically and wisely.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.proofPoints.map((point, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-semibold text-foreground">{point.label}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Prayer */}
      <Card className="bg-sacred/5 border-sacred/20">
        <CardHeader>
          <CardTitle className="text-lg">A Prayer for You</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed italic">{content.prayer}</p>
        </CardContent>
      </Card>

      {/* Videos */}
      {content.videos && content.videos.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-sacred" />
              <CardTitle className="text-xl">Recommended Videos</CardTitle>
            </div>
            <CardDescription>
              Watch these videos to deepen your understanding. Click to view in-app or open in YouTube.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {content.videos.map((video, index) => {
              // Convert YouTube URL to embed format
              const videoId = video.url.includes('youtu.be') 
                ? video.url.split('/').pop() 
                : video.url.split('v=')[1]?.split('&')[0];
              const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : video.url;
              
              return (
                <ExternalContentModal
                  key={index}
                  url={embedUrl}
                  title={video.title}
                  description={video.description}
                  trigger={
                    <Button
                      variant="outline"
                      className="w-full justify-start h-auto py-3 px-4"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Video className="w-5 h-5 text-sacred flex-shrink-0" />
                        <div className="flex flex-col items-start gap-1 text-left flex-1">
                          <span className="font-medium">{video.title}</span>
                          <span className="text-xs text-muted-foreground font-normal">
                            {video.description}
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                      </div>
                    </Button>
                  }
                />
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* 5 Persona Types Integration */}
      {resultType === 'high_pressure' && (
        <Card className="bg-muted/50 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Understand how you show up under pressure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Want to better understand how you naturally respond in conflict and pressure situations? 
              Take the 5 Persona Types Architecture Assessment.
            </p>
            <Button
              className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground"
              onClick={() => openExternalLink('https://drlymanmontgomery.involve.me/fmmpa')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Take the 5 Persona Types Assessment
            </Button>
          </CardContent>
        </Card>
      )}

      {/* CTAs */}
      <Card className="bg-sacred/5">
        <CardHeader>
          <CardTitle>Continue Your Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => openExternalLink('https://sacredgreeks.com/')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Sacred Greeks
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => openExternalLink('https://sacredgreeks.com/#card-xr13vgv4m5slqey')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Start Here
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => openExternalLink('https://a.co/d/5a6Yt9t')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Read "Sacred, Not Sinful"
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => openExternalLink('https://gamma.app/docs/Christian-Greek-Life-Study-Guide-ihr8fq0g089n32t')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Use the Christian Greek Life Study Guide
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => openExternalLink('https://sacredgreeks.jellypod.ai/')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Listen to the Sacred Greeks Podcast
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Capture */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Send this reflection to my email</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={handleEmailSubmit}>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-sacred bg-background"
              required
            />
            <Button type="submit" className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground">
              Send me a copy
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Social Share & Private Link */}
      {!isSharedView && (
        <div className="grid md:grid-cols-3 gap-4">
          {/* Social Media Share */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Share2 className="w-5 h-5 text-sacred" />
                Share on Social
              </CardTitle>
              <CardDescription>
                Inspire your community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SocialShareDialog
                title="I just completed the Sacred Greeks Guide! 🙏"
                description={`Received biblical guidance for ${scenario}. Growing in wisdom and faith through Christian Greek life.`}
                hashtags={["SacredGreeks", "GreekLife", "Faith", "ChristianLeadership"]}
                trigger={
                  <Button className="w-full bg-sacred hover:bg-sacred/90">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Journey
                  </Button>
                }
              />
            </CardContent>
          </Card>

          {/* Achievement Badge */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Share2 className="w-5 h-5 text-sacred" />
                Get Badge
              </CardTitle>
              <CardDescription>
                Download achievement badge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AchievementBadgeDialog
                type="assessment"
                title="Sacred Greeks Assessment"
                subtitle={`${scenario} - ${resultType}`}
                trigger={
                  <Button className="w-full" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Get Badge
                  </Button>
                }
              />
            </CardContent>
          </Card>

          {/* Private Share Link */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Share2 className="w-5 h-5 text-sacred" />
                Share with Mentor
              </CardTitle>
              <CardDescription>
                Private link for accountability
              </CardDescription>
            </CardHeader>
            <CardContent>
              {shareUrl ? (
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-md break-all text-sm">
                    {shareUrl}
                  </div>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 mr-2" />
                        Copy Again
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleShare}
                  className="w-full bg-sacred hover:bg-sacred/90"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Generate Link
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Restart */}
      {!isSharedView && onRestart && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={onRestart}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </div>
      )}
    </div>
  );
}
