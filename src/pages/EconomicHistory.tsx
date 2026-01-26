import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileDown, Calendar, Users, DollarSign, Home, Shield, Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';
import { generateEconomicHistoryPDF } from '@/lib/economic-history-pdf';
import { useToast } from '@/hooks/use-toast';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'mutual-aid' | 'fraternal' | 'greek';
  icon: React.ReactNode;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1780s",
    title: "Free African Society Founded",
    description: "Richard Allen and Absalom Jones establish one of the first African American mutual aid societies in Philadelphia, providing burial assistance and support for widows and orphans.",
    category: 'mutual-aid',
    icon: <Heart className="w-5 h-5" />
  },
  {
    year: "1787",
    title: "Prince Hall Freemasonry Established",
    description: "African Lodge No. 459 receives its charter from the Grand Lodge of England, providing Black men with fraternal benefits, networking, and financial services denied by white lodges.",
    category: 'fraternal',
    icon: <Shield className="w-5 h-5" />
  },
  {
    year: "1808",
    title: "African Benevolent Societies Grow",
    description: "Multiple mutual aid societies form across Northern cities, offering sick benefits, burial insurance, and emergency loans to African American communities facing systematic discrimination.",
    category: 'mutual-aid',
    icon: <Users className="w-5 h-5" />
  },
  {
    year: "1830s",
    title: "Burial Associations Formalize",
    description: "African American burial associations become widespread, ensuring dignified burials when white funeral homes and cemeteries refused service to Black families.",
    category: 'mutual-aid',
    icon: <Home className="w-5 h-5" />
  },
  {
    year: "1843",
    title: "Grand United Order of Odd Fellows",
    description: "Peter Ogden establishes the first African American Odd Fellows lodge in New York City, providing insurance benefits, sick pay, and fraternal support to members.",
    category: 'fraternal',
    icon: <Shield className="w-5 h-5" />
  },
  {
    year: "1864",
    title: "Knights of Pythias (Colored)",
    description: "Separate Black chapters form when white lodges exclude African Americans, continuing the vital tradition of fraternal mutual aid and economic support.",
    category: 'fraternal',
    icon: <Shield className="w-5 h-5" />
  },
  {
    year: "1868",
    title: "Grand United Order of True Reformers",
    description: "William Washington Browne establishes one of the most successful African American fraternal benefit societies in Richmond, VA, eventually operating a bank, newspaper, and real estate company.",
    category: 'fraternal',
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    year: "1898",
    title: "North Carolina Mutual Life Insurance",
    description: "John Merrick and associates found what would become the largest Black-owned insurance company in America, growing directly from fraternal society roots and mutual aid traditions.",
    category: 'mutual-aid',
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    year: "1900",
    title: "2 Million+ Members in Black Fraternal Orders",
    description: "African American fraternal organizations reach peak membership, providing essential financial services—burial insurance, sick benefits, loans—denied by mainstream white institutions.",
    category: 'fraternal',
    icon: <Users className="w-5 h-5" />
  },
  {
    year: "1906",
    title: "Alpha Phi Alpha Founded",
    description: "The first African American intercollegiate Greek-letter fraternity is established at Cornell University by seven visionary students, adapting fraternal traditions for the academic collegiate setting.",
    category: 'greek',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    year: "1908",
    title: "Alpha Kappa Alpha Founded",
    description: "The first African American sorority is established at Howard University, extending Greek-letter organization traditions to women and creating a new model of sisterhood and service.",
    category: 'greek',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    year: "1911",
    title: "Kappa Alpha Psi & Omega Psi Phi Founded",
    description: "Two more fraternities emerge at Indiana University and Howard University respectively, continuing the adaptation of fraternal mutual aid traditions into Greek-letter organizations.",
    category: 'greek',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    year: "1913",
    title: "Delta Sigma Theta Founded",
    description: "Delta Sigma Theta Sorority is established at Howard University by 22 collegiate women, with a founding focus on public service and social action that continues today.",
    category: 'greek',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    year: "1914",
    title: "Phi Beta Sigma Founded",
    description: "Phi Beta Sigma Fraternity is established at Howard University, emphasizing 'Culture for Service, Service for Humanity' and creating a unique constitutional bond with a sorority.",
    category: 'greek',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    year: "1920",
    title: "Zeta Phi Beta Founded",
    description: "Zeta Phi Beta becomes the first sorority to be constitutionally bound to a fraternity (Phi Beta Sigma) and the first to establish chapters in Africa.",
    category: 'greek',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    year: "1922",
    title: "Sigma Gamma Rho Founded",
    description: "The only NPHC sorority founded at a predominantly white institution (Butler University) is established by seven educators committed to community service.",
    category: 'greek',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    year: "1930",
    title: "National Pan-Hellenic Council Formed",
    description: "The NPHC unifies the historically African American Greek-letter organizations, coordinating efforts and establishing a collective voice for Black Greek life.",
    category: 'greek',
    icon: <Users className="w-5 h-5" />
  },
  {
    year: "1963",
    title: "Iota Phi Theta Founded",
    description: "Iota Phi Theta completes the Divine Nine at Morgan State University, founded by twelve students emphasizing scholarship, leadership, citizenship, fidelity, and brotherhood.",
    category: 'greek',
    icon: <BookOpen className="w-5 h-5" />
  }
];

const categoryColors = {
  'mutual-aid': { bg: 'bg-amber-500', border: 'border-amber-500/30', text: 'text-amber-600 dark:text-amber-400', bgLight: 'bg-amber-500/10' },
  'fraternal': { bg: 'bg-purple-500', border: 'border-purple-500/30', text: 'text-purple-600 dark:text-purple-400', bgLight: 'bg-purple-500/10' },
  'greek': { bg: 'bg-sacred', border: 'border-sacred/30', text: 'text-sacred', bgLight: 'bg-sacred/10' }
};

const categoryLabels = {
  'mutual-aid': 'Mutual Aid Society',
  'fraternal': 'Fraternal Order',
  'greek': 'Greek Letter Organization'
};

const EconomicHistory = () => {
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    generateEconomicHistoryPDF();
    toast({
      title: "PDF Downloaded",
      description: "Economic History timeline has been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Economic History of African American Fraternal Organizations | Sacred Greeks"
        description="Explore the timeline from mutual aid societies to modern Greek life. Understand why African Americans joined fraternal lodges for economic survival."
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/proof-course" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to P.R.O.O.F. Course
          </Link>
          <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
            <FileDown className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
            Historical Context
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Economic History of African American Fraternal Organizations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From mutual aid societies to the Divine Nine—understanding why African Americans 
            joined fraternal lodges for economic survival, not ritual.
          </p>
        </div>

        {/* Key Context Card */}
        <Card className="mb-10 border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-amber-600/5">
          <CardHeader>
            <CardTitle className="text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Why Did African Americans Join Fraternal Lodges?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Insurance Discrimination</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    White insurance companies refused to sell life insurance to African Americans
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    When policies were offered, premiums were 30-50% higher with reduced benefits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    "Race-rated" actuarial tables assumed Black lives were worth less
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">The Fraternal Solution</h4>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <strong>Death Benefits:</strong> Guaranteed burial expenses and survivor payments
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <strong>Sick Benefits:</strong> Weekly payments during illness or injury
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <strong>Widow & Orphan Funds:</strong> Ongoing support for families
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <strong>Emergency Loans:</strong> Low-interest loans unavailable from banks
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <p className="text-sm text-foreground font-medium text-center">
                By 1900, over <strong>2 million</strong> African Americans were members of fraternal orders—
                not for ritual or secrecy, but for <strong>economic survival</strong>.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Legend */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const colors = categoryColors[key as keyof typeof categoryColors];
            return (
              <Badge key={key} variant="outline" className={`${colors.bgLight} ${colors.text} ${colors.border}`}>
                {label}
              </Badge>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-purple-500 to-sacred transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const colors = categoryColors[event.category];
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={index} 
                  className={`relative flex items-start gap-4 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${colors.bg} border-4 border-background z-10`} />

                  {/* Content card */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className={`${colors.border} border-2 hover:shadow-lg transition-shadow`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${colors.bg} text-white`}>
                            <Calendar className="w-3 h-3 mr-1" />
                            {event.year}
                          </Badge>
                          <div className={`p-1.5 rounded-full ${colors.bgLight} ${colors.text}`}>
                            {event.icon}
                          </div>
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <Badge variant="outline" className={`mt-3 text-xs ${colors.text} ${colors.border}`}>
                          {categoryLabels[event.category]}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Takeaway */}
        <Card className="mt-12 border-2 border-sacred/30 bg-gradient-to-br from-sacred/5 to-sacred/10">
          <CardContent className="pt-6">
            <blockquote className="text-center">
              <p className="text-lg md:text-xl font-medium text-foreground mb-4 italic">
                "Having Masonic founders doesn't make us Masonic any more than having Baptist founders makes an organization a church."
              </p>
              <footer className="text-sm text-muted-foreground">
                — P.R.O.O.F. Framework
              </footer>
            </blockquote>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-10 text-center space-y-4">
          <p className="text-muted-foreground">
            Use this historical context when responding to critics who question the origins of Black Greek organizations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild>
              <Link to="/proof-course">
                Return to P.R.O.O.F. Course
              </Link>
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF} className="gap-2">
              <FileDown className="w-4 h-4" />
              Download Full Timeline PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicHistory;
