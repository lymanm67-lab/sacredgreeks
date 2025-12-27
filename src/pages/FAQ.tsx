import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Home, HelpCircle, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'What is Sacred Greeks?',
          a: 'Sacred Greeks is a decision-making guide for Christians in Black Greek Letter Organizations. It helps you process difficult questions and decisions using the P.R.O.O.F. framework from the book "Sacred, Not Sinful."',
        },
        {
          q: 'Do I need to be a member of a BGLO to use this?',
          a: 'While the content is designed specifically for Christians in BGLOs, anyone interested in the intersection of faith and Greek life can benefit from the assessments and resources.',
        },
        {
          q: 'Is this app free to use?',
          a: 'Yes! Sacred Greeks is completely free to use. Simply create an account to access all features including assessments, daily devotionals, and prayer journaling.',
        },
      ],
    },
    {
      category: 'Using the Assessment',
      questions: [
        {
          q: 'What is the P.R.O.O.F. framework?',
          a: 'P.R.O.O.F. stands for Purpose, Relationships, Obedience, Opportunity, and Freedom. It\'s a biblical decision-making framework that helps you evaluate situations from multiple spiritual perspectives.',
        },
        {
          q: 'How long does an assessment take?',
          a: 'Most assessments take 5-10 minutes to complete. Take your time to thoughtfully answer each question for the most helpful guidance.',
        },
        {
          q: 'Can I retake an assessment?',
          a: 'Yes! You can take assessments as many times as you need. Your assessment history is saved so you can track your spiritual journey over time.',
        },
        {
          q: 'What happens with my assessment results?',
          a: 'Your results are private and only visible to you. You can view your history anytime and optionally share results with trusted mentors or counselors.',
        },
      ],
    },
    {
      category: 'Features',
      questions: [
        {
          q: 'What is the Daily Devotional?',
          a: 'Each day features a new devotional focused on faith and Greek life. Complete them to build your streak and deepen your spiritual practice.',
        },
        {
          q: 'How does the Prayer Journal work?',
          a: 'The Prayer Journal lets you record prayer requests, track answered prayers, and reflect on your spiritual journey. All entries are private and secure.',
        },
        {
          q: 'Can I use this app offline?',
          a: 'Yes! This is a Progressive Web App (PWA) that works offline once installed. You can access previously loaded content even without internet.',
        },
        {
          q: 'How do I install the app on my phone?',
          a: 'On iPhone: Tap the Share button in Safari and select "Add to Home Screen." On Android: Tap the menu and select "Install App" or "Add to Home Screen."',
        },
      ],
    },
    {
      category: 'Account & Privacy',
      questions: [
        {
          q: 'Is my data secure?',
          a: 'Yes. All data is encrypted and stored securely. Your assessments, prayers, and personal information are private and never shared without your permission.',
        },
        {
          q: 'Can I delete my account?',
          a: 'Yes. Contact us through the support links and we\'ll help you delete your account and all associated data.',
        },
        {
          q: 'I forgot my password. What do I do?',
          a: 'Click "Forgot Password?" on the sign-in page, or visit the Reset Password page from your profile settings. We\'ll send you a reset link via email.',
        },
      ],
    },
    {
      category: 'Support',
      questions: [
        {
          q: 'Where can I learn more about Sacred Greeks?',
          a: 'Visit SacredGreeks.com for more resources, read the book "Sacred, Not Sinful," or listen to our podcast. All links are in the footer.',
        },
        {
          q: 'How do I report a bug or suggest a feature?',
          a: 'We\'d love to hear from you! Visit SacredGreeks.com and use the contact form to reach our team.',
        },
        {
          q: 'Is there a community I can join?',
          a: 'Yes! Connect with other Christians in Greek life through our social media channels and community events. Links available at SacredGreeks.com.',
        },
      ],
    },
  ];

  // Generate all accordion values for expand/collapse all
  const allAccordionValues = faqs.flatMap((category, catIdx) => 
    category.questions.map((_, qIdx) => `${catIdx}-${qIdx}`)
  );

  // Accordion state with localStorage persistence
  const [accordionValues, setAccordionValues] = useState<string[]>(() => {
    const saved = localStorage.getItem('faq-accordion-state');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist accordion state
  useEffect(() => {
    localStorage.setItem('faq-accordion-state', JSON.stringify(accordionValues));
  }, [accordionValues]);

  const expandAll = () => setAccordionValues(allAccordionValues);
  const collapseAll = () => setAccordionValues([]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sacred/10 flex items-center justify-center mx-auto">
              <HelpCircle className="w-8 h-8 text-sacred" />
            </div>
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about Sacred Greeks
            </p>
          </div>

          {/* Expand/Collapse Controls */}
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={expandAll}
              className="text-xs"
            >
              <ChevronsDownUp className="w-4 h-4 mr-1" />
              Expand All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAll}
              className="text-xs"
            >
              <ChevronsUpDown className="w-4 h-4 mr-1" />
              Collapse All
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8 last:mb-0">
                  <h2 className="text-2xl font-bold mb-4 text-sacred">{category.category}</h2>
                  <Accordion 
                    type="multiple" 
                    value={accordionValues.filter(v => v.startsWith(`${categoryIndex}-`))}
                    onValueChange={(values) => {
                      // Update only this category's values
                      const otherValues = accordionValues.filter(v => !v.startsWith(`${categoryIndex}-`));
                      setAccordionValues([...otherValues, ...values]);
                    }}
                    className="w-full"
                  >
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FAQ;