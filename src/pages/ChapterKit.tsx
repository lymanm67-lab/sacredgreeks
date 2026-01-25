import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { 
  FileDown, 
  BookOpen, 
  Users, 
  Shield, 
  Scroll, 
  Building, 
  ArrowLeft,
  Printer,
  GraduationCap,
  Heart,
  Scale,
  Sparkles
} from 'lucide-react';
import { generateGuildOnePagerPDF } from '@/lib/guild-onepager-pdf';
import { generateGuildComparisonPDF } from '@/lib/guild-comparison-pdf';
import { generateJesusMasterCarpenterPDF } from '@/lib/jesus-master-carpenter-pdf';
import { toast } from 'sonner';

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'pdf' | 'study-guide' | 'printable';
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  tags: string[];
  action: () => void;
  actionLabel: string;
}

const resources: ResourceItem[] = [
  // PDFs
  {
    id: 'guild-onepager',
    title: 'Ancient Guilds vs. Greek Orgs',
    description: 'One-page comparison of ancient trade guild features to modern Greek organizations with scripture references.',
    category: 'pdf',
    icon: Scale,
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    tags: ['Quick Reference', 'Comparison', 'Scripture'],
    action: () => {
      generateGuildOnePagerPDF();
      toast.success('One-Pager PDF downloaded!');
    },
    actionLabel: 'Download PDF'
  },
  {
    id: 'guild-comparison',
    title: 'Full Guild Comparison Guide',
    description: 'Comprehensive guide exploring the parallels between 1st-century Mediterranean guilds and modern Greek life structures.',
    category: 'pdf',
    icon: Building,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    tags: ['Historical', 'Detailed', '4+ Pages'],
    action: () => {
      generateGuildComparisonPDF();
      toast.success('Comparison Guide downloaded!');
    },
    actionLabel: 'Download PDF'
  },
  {
    id: 'jesus-carpenter',
    title: 'Jesus the Master Carpenter',
    description: 'Explores Jesus as a τέκτων (tekton/carpenter) in the context of ancient trade guilds with theological implications.',
    category: 'pdf',
    icon: GraduationCap,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    tags: ['Christology', 'Guild History', 'Scripture'],
    action: () => {
      generateJesusMasterCarpenterPDF();
      toast.success('Jesus Master Carpenter PDF downloaded!');
    },
    actionLabel: 'Download PDF'
  },
  // Study Guides
  {
    id: 'proof-framework',
    title: 'P.R.O.O.F. Framework Study Guide',
    description: 'Complete study guide for the biblical framework addressing common Greek life criticisms with scripture references.',
    category: 'study-guide',
    icon: Shield,
    iconColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
    tags: ['5 Lessons', 'Discussion Questions', 'Scripture'],
    action: () => {
      window.open('/proof-course', '_blank');
    },
    actionLabel: 'Open Course'
  },
  {
    id: 'bible-study',
    title: 'Greek Life Bible Study',
    description: '12-week journey through scripture specifically designed for the Greek experience with group discussion guides.',
    category: 'study-guide',
    icon: BookOpen,
    iconColor: 'text-green-400',
    bgColor: 'bg-green-500/20',
    tags: ['12 Weeks', 'Group Format', 'Flashcards'],
    action: () => {
      window.open('/bible-study', '_blank');
    },
    actionLabel: 'Start Study'
  },
  {
    id: 'faith-authority',
    title: 'Faith & Authority Teaching',
    description: 'Deep-dive into the power of belief and how faith operates as the channel of spiritual effect.',
    category: 'study-guide',
    icon: Sparkles,
    iconColor: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    tags: ['Advanced', 'Theological', 'Audio'],
    action: () => {
      window.open('/faith-authority', '_blank');
    },
    actionLabel: 'Open Teaching'
  },
  // Printables
  {
    id: 'symbols-guide',
    title: 'Symbols & Rituals Quick Reference',
    description: 'Printable reference for understanding Greek symbols, rituals, and their biblical/historical context.',
    category: 'printable',
    icon: Scroll,
    iconColor: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-500/20',
    tags: ['100+ Symbols', 'Historical', 'Printable'],
    action: () => {
      window.open('/symbols', '_blank');
    },
    actionLabel: 'View Guide'
  },
  {
    id: 'mythbusters',
    title: 'MythBusters Cards',
    description: 'Printable cards addressing 50+ common misconceptions about Greek life with biblical responses.',
    category: 'printable',
    icon: Shield,
    iconColor: 'text-red-400',
    bgColor: 'bg-red-500/20',
    tags: ['50+ Myths', 'Shareable', 'Quick Answers'],
    action: () => {
      window.open('/mythbusters', '_blank');
    },
    actionLabel: 'View Cards'
  },
  {
    id: 'anti-hazing',
    title: 'Anti-Hazing Resources',
    description: 'Prevention tools, success stories, and memorial resources for chapter education and safety.',
    category: 'printable',
    icon: Heart,
    iconColor: 'text-rose-400',
    bgColor: 'bg-rose-500/20',
    tags: ['Prevention', 'Education', 'Memorial'],
    action: () => {
      window.open('/anti-hazing', '_blank');
    },
    actionLabel: 'View Resources'
  }
];

const ChapterKit: React.FC = () => {
  const pdfResources = resources.filter(r => r.category === 'pdf');
  const studyGuides = resources.filter(r => r.category === 'study-guide');
  const printables = resources.filter(r => r.category === 'printable');

  const handleDownloadAll = () => {
    generateGuildOnePagerPDF();
    setTimeout(() => generateGuildComparisonPDF(), 500);
    setTimeout(() => generateJesusMasterCarpenterPDF(), 1000);
    toast.success('All PDFs downloading...');
  };

  return (
    <>
      <SEOHead 
        title="Chapter Education Kit | Sacred Greeks"
        description="Downloadable PDFs, study guides, and printable resources for chapter leaders. Equip your organization with biblical tools for Greek life."
        keywords="chapter resources, Greek life education, PDF downloads, study guides, chapter leaders"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
              <Button 
                onClick={handleDownloadAll}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Download All PDFs
              </Button>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Chapter Education Kit
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Everything your chapter needs for faith-based Greek life education. 
              PDFs, study guides, and printable resources for offline use.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="border-amber-500/50 text-amber-300 px-4 py-2">
                <FileDown className="w-3 h-3 mr-1" /> {pdfResources.length} PDFs
              </Badge>
              <Badge variant="outline" className="border-green-500/50 text-green-300 px-4 py-2">
                <BookOpen className="w-3 h-3 mr-1" /> {studyGuides.length} Study Guides
              </Badge>
              <Badge variant="outline" className="border-fuchsia-500/50 text-fuchsia-300 px-4 py-2">
                <Printer className="w-3 h-3 mr-1" /> {printables.length} Printables
              </Badge>
            </div>
          </div>
        </section>

        {/* PDF Downloads */}
        <section className="py-12 bg-slate-800/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <FileDown className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">PDF Downloads</h2>
                <p className="text-white/60 text-sm">Print-ready resources for offline study</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pdfResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </section>

        {/* Study Guides */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Study Guides</h2>
                <p className="text-white/60 text-sm">In-depth biblical studies for chapter meetings</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGuides.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </section>

        {/* Printables */}
        <section className="py-12 bg-slate-800/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-fuchsia-500/20 flex items-center justify-center">
                <Printer className="w-5 h-5 text-fuchsia-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Printables & Quick References</h2>
                <p className="text-white/60 text-sm">Resources for chapter education and outreach</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {printables.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 max-w-3xl mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Need Custom Resources?</h3>
                <p className="text-white/70 mb-6">
                  Contact us for personalized chapter education materials, speaking engagements, or bulk downloads.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
                    <Link to="/coaching-application">Request Coaching</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

interface ResourceCardProps {
  resource: ResourceItem;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const Icon = resource.icon;
  
  return (
    <Card className="bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl ${resource.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 ${resource.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-white text-lg mb-1">{resource.title}</CardTitle>
            <div className="flex flex-wrap gap-1">
              {resource.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-[10px] border-white/20 text-white/60 px-1.5 py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-white/60 mb-4 text-sm">
          {resource.description}
        </CardDescription>
        <Button 
          onClick={resource.action}
          variant="outline" 
          className="w-full border-white/20 text-white hover:bg-white/10"
        >
          <FileDown className="w-4 h-4 mr-2" />
          {resource.actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChapterKit;
