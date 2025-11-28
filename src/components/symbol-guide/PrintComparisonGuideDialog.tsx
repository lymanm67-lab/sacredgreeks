import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Printer, Download, History, Sparkles, Scale } from 'lucide-react';
import { culturalComparisons, culturalComparisonCategories, CulturalComparisonEntry } from '@/data/symbolGuideContent';
import { toast } from 'sonner';

interface PrintComparisonGuideDialogProps {
  trigger: React.ReactNode;
  selectedCategory?: string;
}

const PrintComparisonGuideDialog = ({ trigger, selectedCategory = 'all' }: PrintComparisonGuideDialogProps) => {
  const [open, setOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const comparisonsToShow = selectedCategory === 'all' 
    ? culturalComparisons 
    : culturalComparisons.filter(c => c.category === selectedCategory);

  const categoryGroups = comparisonsToShow.reduce((acc, comparison) => {
    const cat = culturalComparisonCategories.find(c => c.id === comparison.category)?.label || comparison.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(comparison);
    return acc;
  }, {} as Record<string, CulturalComparisonEntry[]>);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to print');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cultural Comparisons Discussion Guide - Sacred Greeks</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            
            .header {
              text-align: center;
              margin-bottom: 32px;
              padding-bottom: 24px;
              border-bottom: 3px solid #8B5CF6;
            }
            
            .header h1 {
              font-size: 28px;
              font-weight: 700;
              color: #8B5CF6;
              margin-bottom: 8px;
            }
            
            .header p {
              font-size: 14px;
              color: #666;
            }
            
            .intro {
              background: linear-gradient(135deg, #FEF3C7 0%, #F3E8FF 100%);
              padding: 20px;
              border-radius: 12px;
              margin-bottom: 32px;
            }
            
            .intro h2 {
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 12px;
              color: #7C3AED;
            }
            
            .intro p {
              font-size: 13px;
              color: #4B5563;
            }
            
            .category {
              margin-bottom: 32px;
            }
            
            .category-title {
              font-size: 18px;
              font-weight: 700;
              color: #8B5CF6;
              padding: 8px 16px;
              background: #F3E8FF;
              border-radius: 8px;
              margin-bottom: 16px;
            }
            
            .comparison {
              background: #FAFAFA;
              border: 1px solid #E5E7EB;
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 16px;
              page-break-inside: avoid;
            }
            
            .comparison-title {
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 16px;
              color: #1F2937;
            }
            
            .comparison-section {
              margin-bottom: 12px;
            }
            
            .comparison-section:last-child {
              margin-bottom: 0;
            }
            
            .section-label {
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 4px;
            }
            
            .section-label.ancient { color: #D97706; }
            .section-label.modern { color: #059669; }
            .section-label.helps { color: #8B5CF6; }
            
            .section-content {
              font-size: 13px;
              color: #4B5563;
            }
            
            .discussion {
              background: #F3E8FF;
              border: 2px solid #8B5CF6;
              border-radius: 12px;
              padding: 24px;
              margin-top: 32px;
              page-break-inside: avoid;
            }
            
            .discussion h2 {
              font-size: 18px;
              font-weight: 700;
              color: #7C3AED;
              margin-bottom: 16px;
            }
            
            .discussion ol {
              padding-left: 20px;
            }
            
            .discussion li {
              font-size: 13px;
              color: #4B5563;
              margin-bottom: 12px;
            }
            
            .footer {
              text-align: center;
              margin-top: 32px;
              padding-top: 24px;
              border-top: 2px solid #E5E7EB;
              font-size: 12px;
              color: #6B7280;
            }
            
            .footer strong {
              color: #8B5CF6;
            }
            
            @media print {
              body { padding: 20px; }
              .comparison { break-inside: avoid; }
              .discussion { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleDownload = () => {
    const content: string[] = [
      '═'.repeat(60),
      '',
      '        CULTURAL COMPARISONS DISCUSSION GUIDE',
      '        Sacred Greeks - Faith & Greek Life Together',
      '',
      '═'.repeat(60),
      '',
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      '─'.repeat(60),
      '',
      'PURPOSE OF THIS GUIDE',
      '',
      'Christians already use many symbols and practices with pre-Christian',
      'or pagan origins—from wedding rings to church architecture to brand',
      'logos. These comparisons help expose inconsistent logic when Greek',
      'letters are singled out as "demonic" while other ancient symbols',
      'are freely embraced.',
      '',
      '═'.repeat(60),
      '',
    ];

    Object.entries(categoryGroups).forEach(([category, items]) => {
      content.push(`▸ ${category.toUpperCase()}`);
      content.push('─'.repeat(60));
      content.push('');

      items.forEach((comparison, index) => {
        content.push(`${index + 1}. ${comparison.symbol}`);
        content.push('');
        content.push('   ANCIENT CONNECTION:');
        content.push(`   ${comparison.ancientConnection}`);
        content.push('');
        content.push('   HOW IT SHOWS UP TODAY:');
        content.push(`   ${comparison.modernUsage}`);
        content.push('');
        content.push('   HOW THIS HELPS YOU:');
        content.push(`   ${comparison.appUsage}`);
        content.push('');
        content.push('   ┄'.repeat(30));
        content.push('');
      });

      content.push('');
    });

    content.push('═'.repeat(60));
    content.push('');
    content.push('DISCUSSION QUESTIONS FOR YOUR GROUP');
    content.push('');
    content.push('1. Which comparison surprised you the most? Why?');
    content.push('');
    content.push('2. Have you ever been challenged about Greek letters but not');
    content.push('   about wedding rings or Nike shoes? How did you respond?');
    content.push('');
    content.push('3. Read Romans 14:5-6. How does this passage apply to symbols');
    content.push('   and practices that have changed meaning over time?');
    content.push('');
    content.push('4. What is the difference between using a symbol and');
    content.push('   worshipping what it originally represented?');
    content.push('');
    content.push('5. How can you graciously share these insights with someone');
    content.push('   who believes all Greek letters are inherently sinful?');
    content.push('');
    content.push('═'.repeat(60));
    content.push('');
    content.push('Learn more at: www.sacredgreeks.org');
    content.push('Book: "Sacred, Not Sinful" by Dr. Lyman Montgomery');
    content.push('');

    const blob = new Blob([content.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sacred-greeks-cultural-comparisons-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Guide downloaded successfully!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Print Preview - Cultural Comparisons Guide</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button size="sm" onClick={handlePrint} className="gap-2 bg-sacred hover:bg-sacred/90">
                <Printer className="w-4 h-4" />
                Print
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div ref={printRef} className="bg-white text-foreground p-6 rounded-lg">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b-4 border-sacred">
              <h1 className="text-2xl font-bold text-sacred mb-2">Cultural Comparisons Discussion Guide</h1>
              <p className="text-sm text-muted-foreground">Sacred Greeks - Faith & Greek Life Together</p>
              <p className="text-xs text-muted-foreground mt-1">Generated: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Intro */}
            <div className="bg-gradient-to-r from-amber-100/50 to-sacred/10 p-5 rounded-xl mb-8 border border-sacred/20">
              <h2 className="font-semibold text-sacred mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Purpose of This Guide
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Christians already use many symbols and practices with pre-Christian or pagan origins—from wedding rings 
                to church architecture to brand logos. These comparisons help expose inconsistent logic when Greek letters 
                are singled out as "demonic" while other ancient symbols are freely embraced.
              </p>
            </div>

            {/* Comparisons by Category */}
            {Object.entries(categoryGroups).map(([category, items]) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-bold text-sacred bg-sacred/10 px-4 py-2 rounded-lg mb-4">
                  {category}
                </h3>
                <div className="space-y-4">
                  {items.map((comparison) => (
                    <div key={comparison.id} className="bg-muted/30 border border-border rounded-xl p-5">
                      <h4 className="font-semibold text-foreground mb-4">{comparison.symbol}</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <History className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                              Ancient Connection
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">{comparison.ancientConnection}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                              How It Shows Up Today
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">{comparison.modernUsage}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Scale className="w-4 h-4 text-sacred" />
                            <span className="text-xs font-semibold uppercase tracking-wide text-sacred">
                              How This Helps You
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground pl-6">{comparison.appUsage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Discussion Questions */}
            <div className="bg-sacred/10 border-2 border-sacred rounded-xl p-6 mt-8">
              <h2 className="text-lg font-bold text-sacred mb-4">Discussion Questions for Your Group</h2>
              <ol className="space-y-3 list-decimal list-inside">
                <li className="text-sm text-muted-foreground">Which comparison surprised you the most? Why?</li>
                <li className="text-sm text-muted-foreground">
                  Have you ever been challenged about Greek letters but not about wedding rings or Nike shoes? How did you respond?
                </li>
                <li className="text-sm text-muted-foreground">
                  Read Romans 14:5-6. How does this passage apply to symbols and practices that have changed meaning over time?
                </li>
                <li className="text-sm text-muted-foreground">
                  What is the difference between using a symbol and worshipping what it originally represented?
                </li>
                <li className="text-sm text-muted-foreground">
                  How can you graciously share these insights with someone who believes all Greek letters are inherently sinful?
                </li>
              </ol>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t-2 border-border">
              <p className="text-sm text-muted-foreground">
                Learn more at: <strong className="text-sacred">www.sacredgreeks.org</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Book: "Sacred, Not Sinful" by Dr. Lyman Montgomery
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrintComparisonGuideDialog;
