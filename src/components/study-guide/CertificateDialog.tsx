import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Printer } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type CertificateTheme = 'classic' | 'modern' | 'elegant';

interface CertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  completionDate: string;
}

export const CertificateDialog = ({ open, onOpenChange, completionDate }: CertificateDialogProps) => {
  const { user } = useAuth();
  const [customName, setCustomName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<CertificateTheme>('classic');

  // Fetch user's full name from profile
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const displayName = customName || profile?.full_name || user?.email?.split("@")[0] || "Student";

  const handlePrint = () => {
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error("Please allow pop-ups to print your certificate");
        return;
      }

      const formattedDate = format(new Date(completionDate), "MMMM dd, yyyy");
      const certificateId = `SG-${Date.now().toString(36).toUpperCase()}`;

      const styles = getThemeStyles(selectedTheme);

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Certificate of Completion - ${displayName}</title>
            <style>
              ${styles}
            </style>
          </head>
          <body>
            <div class="certificate">
              <div class="corner tl"></div>
              <div class="corner tr"></div>
              <div class="corner bl"></div>
              <div class="corner br"></div>
              
              <div class="content">
                <h1>Certificate of Completion</h1>
                <p class="subtitle">This certifies that</p>
                <div class="name">${displayName}</div>
                <p class="achievement">has successfully completed all five sessions of the</p>
                <div class="program">Sacred, Not Sinful Study Guide</div>
                <p class="description">A comprehensive biblical journey exploring faith and Greek life</p>
                
                <div class="stats">
                  <p class="stats-title">Achievement Summary</p>
                  <div class="stats-list">
                    ✓ Sessions Completed: 5/5<br>
                    ✓ Study Hours: 10+ hours<br>
                    ✓ Completion Date: ${formattedDate}
                  </div>
                </div>
              </div>
              
              <div class="signature-section">
                <div class="signature">
                  <div class="signature-line">
                    <div class="signature-name">Dr. Lyman</div>
                  </div>
                  <div class="signature-title">Dr. Lyman, Author</div>
                  <div class="signature-title">Sacred, Not Sinful</div>
                </div>
                <div class="signature">
                  <div class="signature-line">
                    <div class="signature-name">${formattedDate}</div>
                  </div>
                  <div class="signature-title">Date</div>
                </div>
              </div>
              
              <div class="footer">
                SacredGreeks.com | Based on Sacred, Not Sinful by Dr. Lyman<br>
                Certificate ID: ${certificateId}
              </div>
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        toast.success("Certificate ready to print! 🎉");
      }, 250);
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast.error("Failed to generate certificate");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-sacred" />
            Download Your Certificate
          </DialogTitle>
          <DialogDescription>
            Congratulations on completing all 5 sessions! Download your personalized certificate of completion.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Certificate Preview */}
          <div className="bg-gradient-to-br from-sacred/10 to-sacred/5 border-2 border-sacred/20 rounded-lg p-6 text-center">
            <Award className="w-12 h-12 text-sacred mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground mb-1">
              Certificate of Completion
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Sacred, Not Sinful Study Guide
            </p>
            <div className="bg-background/50 rounded px-3 py-2">
              <p className="text-xs text-muted-foreground">This certifies that</p>
              <p className="text-base font-bold text-sacred">{displayName}</p>
              <p className="text-xs text-muted-foreground mt-1">has completed all 5 sessions</p>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Certificate Theme</Label>
            <RadioGroup value={selectedTheme} onValueChange={(value) => setSelectedTheme(value as CertificateTheme)}>
              <div className="grid grid-cols-3 gap-3">
                <Label
                  htmlFor="theme-classic"
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTheme === 'classic' 
                      ? 'border-sacred bg-sacred/5' 
                      : 'border-border hover:border-sacred/50'
                  }`}
                >
                  <RadioGroupItem value="classic" id="theme-classic" className="sr-only" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold">Classic</p>
                    <p className="text-[10px] text-muted-foreground">Traditional</p>
                  </div>
                </Label>

                <Label
                  htmlFor="theme-modern"
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTheme === 'modern' 
                      ? 'border-sacred bg-sacred/5' 
                      : 'border-border hover:border-sacred/50'
                  }`}
                >
                  <RadioGroupItem value="modern" id="theme-modern" className="sr-only" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-slate-900 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold">Modern</p>
                    <p className="text-[10px] text-muted-foreground">Minimalist</p>
                  </div>
                </Label>

                <Label
                  htmlFor="theme-elegant"
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTheme === 'elegant' 
                      ? 'border-sacred bg-sacred/5' 
                      : 'border-border hover:border-sacred/50'
                  }`}
                >
                  <RadioGroupItem value="elegant" id="theme-elegant" className="sr-only" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold">Elegant</p>
                    <p className="text-[10px] text-muted-foreground">Refined</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="certificate-name">Name on Certificate (optional)</Label>
            <Input
              id="certificate-name"
              placeholder={profile?.full_name || "Enter your full name"}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to use: {profile?.full_name || user?.email?.split("@")[0] || "your account name"}
            </p>
          </div>

          {/* Certificate Features */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium">Your certificate includes:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ Your name and completion date</li>
              <li>✓ Digital signature from Dr. Lyman</li>
              <li>✓ 5 sessions completed (10+ study hours)</li>
              <li>✓ Unique certificate ID for authenticity</li>
              <li>✓ Professional PDF format</li>
            </ul>
          </div>

          {/* Print Button */}
          <Button
            onClick={handlePrint}
            className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Certificate
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your certificate will open in a new window ready to print or save as PDF.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Theme style generators
const getThemeStyles = (theme: CertificateTheme): string => {
  const baseStyles = `
    @page { size: landscape; margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: white;
    }
    .certificate {
      width: 297mm;
      height: 210mm;
      padding: 40px;
      position: relative;
      background: white;
    }
    @media print {
      body { background: white; }
      .no-print { display: none; }
    }
  `;

  if (theme === 'modern') {
    return baseStyles + `
      body { font-family: 'Helvetica', 'Arial', sans-serif; }
      .certificate { background: #0f172a; }
      .certificate::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: #6366f1;
      }
      .content-box {
        background: white;
        margin-top: 10px;
        padding: 60px 80px;
        border-radius: 8px;
      }
      h1 { font-size: 48px; color: #0f172a; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; }
      .name { font-size: 42px; color: #6366f1; font-weight: bold; margin: 30px 0; }
      .achievement { font-size: 18px; color: #1e293b; line-height: 1.6; }
      .program { font-size: 28px; color: #0f172a; font-weight: bold; margin: 20px 0; }
      .date-bar {
        background: #6366f1;
        color: white;
        padding: 15px 40px;
        margin: 30px auto;
        display: inline-block;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
      }
      .footer { color: #64748b; font-size: 11px; margin-top: 40px; text-align: center; }
    `;
  }

  if (theme === 'elegant') {
    return baseStyles + `
      body { font-family: 'Georgia', 'Times New Roman', serif; }
      .certificate { background: #faf8f6; border: 3px solid #c2a368; border-radius: 8px; }
      .certificate::before {
        content: '';
        position: absolute;
        top: 20px;
        left: 20px;
        right: 20px;
        bottom: 20px;
        border: 1px solid #c2a368;
        border-radius: 4px;
      }
      .corner { position: absolute; width: 12px; height: 12px; background: #c2a368; border-radius: 50%; }
      .corner.tl { top: 20px; left: 20px; }
      .corner.tr { top: 20px; right: 20px; }
      .corner.bl { bottom: 20px; left: 20px; }
      .corner.br { bottom: 20px; right: 20px; }
      .content {
        position: relative;
        z-index: 1;
        text-align: center;
        padding: 60px 80px;
      }
      h1 { font-size: 48px; color: #8B5CF6; font-style: italic; margin-bottom: 20px; }
      .divider { width: 100px; height: 1px; background: #c2a368; margin: 15px auto; }
      .name {
        font-size: 38px;
        color: #1e293b;
        font-style: italic;
        margin: 30px 0;
        border-bottom: 1px solid #c2a368;
        display: inline-block;
        padding-bottom: 10px;
      }
      .achievement { font-size: 16px; color: #505050; margin: 20px 0; line-height: 1.6; }
      .program { font-size: 26px; color: #8B5CF6; font-weight: bold; margin: 20px 0; }
      .date { font-size: 14px; color: #787878; font-style: italic; margin-top: 30px; }
      .footer { color: #c2a368; font-size: 11px; font-style: italic; margin-top: 40px; text-align: center; }
    `;
  }

  // Classic theme (default)
  return baseStyles + `
    body { font-family: 'Georgia', serif; }
    .certificate {
      border: 8px solid #8B5CF6;
      border-radius: 8px;
    }
    .certificate::before {
      content: '';
      position: absolute;
      top: 50px;
      left: 50px;
      right: 50px;
      bottom: 50px;
      border: 2px solid #8B5CF6;
      border-radius: 4px;
    }
    .corner { position: absolute; width: 12px; height: 12px; background: #8B5CF6; border-radius: 50%; }
    .corner.tl { top: 50px; left: 50px; }
    .corner.tr { top: 50px; right: 50px; }
    .corner.bl { bottom: 50px; left: 50px; }
    .corner.br { bottom: 50px; right: 50px; }
    .content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 60px 80px;
    }
    h1 { font-size: 48px; color: #8B5CF6; margin-bottom: 20px; }
    .subtitle { font-size: 18px; color: #666; margin-bottom: 30px; }
    .name {
      font-size: 42px;
      color: #000;
      font-weight: bold;
      margin: 30px 0;
      border-bottom: 2px solid #8B5CF6;
      display: inline-block;
      padding-bottom: 10px;
    }
    .achievement {
      font-size: 18px;
      color: #666;
      margin: 20px 0;
      line-height: 1.6;
    }
    .program { font-size: 28px; color: #8B5CF6; font-weight: bold; margin: 20px 0; }
    .description { font-size: 16px; color: #666; font-style: italic; margin-bottom: 30px; }
    .stats {
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 20px;
      margin: 30px auto;
      max-width: 400px;
    }
    .stats-title { font-size: 14px; font-weight: 600; margin-bottom: 10px; }
    .stats-list { font-size: 13px; color: #666; line-height: 1.8; text-align: left; }
    .signature-section {
      display: flex;
      justify-content: space-around;
      margin-top: 60px;
      padding: 0 80px;
    }
    .signature {
      text-align: center;
    }
    .signature-line {
      border-top: 1px solid #666;
      width: 200px;
      margin: 0 auto 10px;
      padding-top: 30px;
    }
    .signature-name {
      font-size: 24px;
      font-style: italic;
      color: #8B5CF6;
      margin-bottom: 5px;
    }
    .signature-title {
      font-size: 11px;
      color: #666;
    }
    .footer {
      position: absolute;
      bottom: 30px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 10px;
      color: #999;
    }
  `;
};
