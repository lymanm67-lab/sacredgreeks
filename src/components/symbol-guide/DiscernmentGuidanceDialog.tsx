import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, MessageCircle, Heart, Shield, Copy, Check, Download, Printer } from 'lucide-react';
import { toast } from 'sonner';

interface ResponseTemplate {
  id: string;
  situation: string;
  response: string;
  tone: string;
  tips: string[];
}

const responseTemplates: ResponseTemplate[] = [
  {
    id: '1',
    situation: 'Being invited to a ritual or ceremony that conflicts with your faith',
    response: "I really appreciate you including me, and I value our friendship. I've been thinking about this, and I've decided to sit this one out. It's not a judgment on anyone—it's just something I need to do to stay true to my personal convictions. I'd love to catch up with everyone afterward though!",
    tone: 'Warm & Appreciative',
    tips: [
      'Lead with gratitude for the invitation',
      'Make it about your personal journey, not criticism of the activity',
      'Offer an alternative way to connect'
    ]
  },
  {
    id: '2',
    situation: 'Declining participation in activities with spiritual undertones',
    response: "Hey, I wanted to talk to you about [activity]. I've been doing some reflection on my faith lately, and I've realized I need to step back from some things. It's nothing personal—I still want to be part of the chapter and support everyone. I just need to honor this conviction. Can we talk more about it if you have questions?",
    tone: 'Open & Vulnerable',
    tips: [
      'Be proactive rather than reactive',
      'Show vulnerability about your faith journey',
      'Invite dialogue rather than shutting it down'
    ]
  },
  {
    id: '3',
    situation: 'When asked to explain why you\'re not participating',
    response: "I've been growing in my faith, and I've been learning to be more intentional about what I participate in. Some things that might seem harmless to others carry different weight for me spiritually. I'm not trying to impose my views on anyone—I just need to be authentic to who I am. I hope you can understand that.",
    tone: 'Honest & Non-judgmental',
    tips: [
      'Focus on your growth, not their choices',
      'Acknowledge that others may see things differently',
      'Express hope for understanding, not demand for agreement'
    ]
  },
  {
    id: '4',
    situation: 'When you feel pressured to conform',
    response: "I hear you, and I understand this is important to the group. I've thought about it a lot, and this is something I can't compromise on. I know that might be frustrating, but I'd rather be honest with you than pretend to be someone I'm not. I'm still committed to our brotherhood/sisterhood in every other way.",
    tone: 'Firm but Loving',
    tips: [
      'Acknowledge their perspective first',
      'Be clear this is non-negotiable for you',
      'Reaffirm your commitment to the relationship'
    ]
  },
  {
    id: '5',
    situation: 'Gracefully exiting an ongoing activity',
    response: "I've been participating in [activity], but I've come to realize it doesn't align with where I am spiritually right now. I wanted to let you know I'll be stepping back, not because I think less of anyone who continues, but because I need to be true to my own convictions. Thank you for understanding.",
    tone: 'Respectful & Clear',
    tips: [
      'Give notice rather than disappearing',
      'Explicitly state you\'re not judging others',
      'Express gratitude for their understanding'
    ]
  }
];

const principles = [
  {
    icon: Heart,
    title: 'Lead with Love',
    description: 'Your tone matters as much as your words. People can feel judgment even when you don\'t say it directly. Approach every conversation assuming the best about the other person.'
  },
  {
    icon: MessageCircle,
    title: 'Speak Your Truth, Not Their Error',
    description: 'Focus on what you believe and why, not on why others are wrong. "I feel called to..." is better than "You shouldn\'t..." This keeps the conversation personal rather than preachy.'
  },
  {
    icon: Shield,
    title: 'Stand Firm Without Being Rigid',
    description: 'Having convictions doesn\'t mean being inflexible in how you communicate them. You can be firm about your boundaries while being flexible about how you maintain relationships.'
  },
  {
    icon: Lightbulb,
    title: 'Offer Alternatives',
    description: 'When you say no to something, try to say yes to something else. "I can\'t do that, but I\'d love to..." shows you\'re not withdrawing from the friendship, just from the specific activity.'
  }
];

interface DiscernmentGuidanceDialogProps {
  trigger?: React.ReactNode;
  itemName?: string;
}

const DiscernmentGuidanceDialog = ({ trigger, itemName }: DiscernmentGuidanceDialogProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Response copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportPDF = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Discernment Guidance - Navigating with Grace & Conviction</title>
        <style>
          body { font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6; color: #333; }
          h1 { text-align: center; color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px; }
          h2 { color: #1e40af; margin-top: 30px; }
          h3 { color: #374151; margin-top: 20px; }
          .template { background: #f9fafb; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #1e40af; }
          .template-situation { font-weight: bold; color: #1e40af; margin-bottom: 10px; }
          .template-response { font-style: italic; background: white; padding: 15px; border-radius: 4px; margin: 10px 0; }
          .template-tone { display: inline-block; background: #e5e7eb; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
          .tips { margin-top: 10px; }
          .tips li { margin: 5px 0; color: #059669; }
          .principle { margin: 15px 0; padding: 15px; background: #f0f9ff; border-radius: 8px; }
          .principle-title { font-weight: bold; color: #1e40af; }
          .scripture { text-align: center; font-style: italic; margin: 30px 0; padding: 20px; background: #fef3c7; border-radius: 8px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
          @media print { body { padding: 20px; } .template { break-inside: avoid; } }
        </style>
      </head>
      <body>
        <h1>Navigating with Grace & Conviction</h1>
        <p style="text-align: center; color: #6b7280;">A guide for standing firm in your faith while honoring relationships</p>
        
        <h2>Response Templates</h2>
        <p>Adapt these templates to your situation and relationship. The goal is to communicate your convictions with grace.</p>
        
        ${responseTemplates.map(t => `
          <div class="template">
            <div class="template-situation">${t.situation}</div>
            <span class="template-tone">${t.tone}</span>
            <div class="template-response">"${t.response}"</div>
            <div class="tips">
              <strong>Tips:</strong>
              <ul>${t.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
            </div>
          </div>
        `).join('')}
        
        <h2>Guiding Principles</h2>
        
        ${principles.map(p => `
          <div class="principle">
            <div class="principle-title">${p.title}</div>
            <p>${p.description}</p>
          </div>
        `).join('')}
        
        <div class="scripture">
          <p>"If it is possible, as far as it depends on you, live at peace with everyone."</p>
          <p>— Romans 12:18</p>
        </div>
        
        <p><strong>Remember:</strong> Your goal isn't to win an argument or prove you're right. It's to honor God with your choices while honoring others with your words. Sometimes people won't understand, and that's okay. Your job is to be faithful and loving—the rest is between them and God.</p>
        
        <div class="footer">
          Sacred Greeks - Symbol & Ritual Guide<br/>
          Exported ${new Date().toLocaleDateString()}
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
      toast.success('PDF export ready - use Save as PDF in print dialog');
    } else {
      toast.error('Please allow popups to export PDF');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Lightbulb className="w-4 h-4" />
            Guidance for Discernment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-badge-warning" />
              Navigating with Grace & Conviction
              {itemName && <Badge variant="outline" className="ml-2">{itemName}</Badge>}
            </DialogTitle>
            <Button variant="outline" size="sm" onClick={handleExportPDF} className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="templates" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates">Response Templates</TabsTrigger>
            <TabsTrigger value="principles">Guiding Principles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="mt-4">
            <ScrollArea className="h-[55vh] pr-4">
              <div className="space-y-4" ref={printRef}>
                <p className="text-sm text-muted-foreground mb-4">
                  These templates help you communicate your convictions with grace. Adapt them to your situation and relationship.
                </p>
                
                {responseTemplates.map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="pb-2 bg-muted/30">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-medium">{template.situation}</CardTitle>
                        <Badge variant="secondary" className="shrink-0">{template.tone}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3">
                      <div className="bg-background border rounded-lg p-3 relative">
                        <p className="text-sm italic text-foreground pr-8">"{template.response}"</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => copyToClipboard(template.response, template.id)}
                        >
                          {copiedId === template.id ? (
                            <Check className="w-4 h-4 text-badge-success" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      
                      <div className="space-y-1">
                        <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tips</h5>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {template.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-badge-success mt-0.5">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="principles" className="mt-4">
            <ScrollArea className="h-[55vh] pr-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Keep these principles in mind when navigating situations that require discernment.
                </p>
                
                {principles.map((principle, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-4">
                      <div className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-full bg-sacred/10 flex items-center justify-center">
                          <principle.icon className="w-5 h-5 text-sacred" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{principle.title}</h4>
                          <p className="text-sm text-muted-foreground">{principle.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-2">Remember</h4>
                    <p className="text-sm text-muted-foreground">
                      Your goal isn't to win an argument or prove you're right. It's to honor God with your choices while 
                      honoring others with your words. Sometimes people won't understand, and that's okay. Your job is to 
                      be faithful and loving—the rest is between them and God.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      "If it is possible, as far as it depends on you, live at peace with everyone." — Romans 12:18
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DiscernmentGuidanceDialog;
