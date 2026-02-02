import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Globe, 
  Mail, 
  Heart,
  Building,
  Users,
  Filter,
  ExternalLink,
  Cross,
  GraduationCap,
  Plus,
  ChevronLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/ui/page-header";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Organization colors for badges
const orgColors: Record<string, string> = {
  "Alpha Phi Alpha": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Alpha Kappa Alpha": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Kappa Alpha Psi": "bg-red-500/20 text-red-400 border-red-500/30",
  "Omega Psi Phi": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Delta Sigma Theta": "bg-red-600/20 text-red-400 border-red-600/30",
  "Phi Beta Sigma": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Zeta Phi Beta": "bg-blue-600/20 text-blue-400 border-blue-600/30",
  "Sigma Gamma Rho": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Iota Phi Theta": "bg-amber-600/20 text-amber-400 border-amber-600/30",
};

const d9Organizations = [
  "All Organizations",
  "Alpha Phi Alpha",
  "Alpha Kappa Alpha", 
  "Kappa Alpha Psi",
  "Omega Psi Phi",
  "Delta Sigma Theta",
  "Phi Beta Sigma",
  "Zeta Phi Beta",
  "Sigma Gamma Rho",
  "Iota Phi Theta"
];

const states = [
  "All States",
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
];

// Sample chapters for display
const sampleChapters = [
  {
    id: "1",
    organization: "Alpha Phi Alpha",
    chapter_name: "Alpha Lambda",
    school_name: "Howard University",
    city: "Washington",
    state: "DC",
    is_faith_focused: true,
    website_url: "https://example.com",
    contact_email: "alpha@example.com",
    description: "Active chapter with weekly Bible study and strong chaplain program."
  },
  {
    id: "2",
    organization: "Delta Sigma Theta",
    chapter_name: "Gamma Tau",
    school_name: "Spelman College",
    city: "Atlanta",
    state: "GA",
    is_faith_focused: true,
    website_url: null,
    contact_email: "delta@example.com",
    description: "Faith-forward chapter known for community service and prayer initiatives."
  },
  {
    id: "3",
    organization: "Omega Psi Phi",
    chapter_name: "Chi Psi",
    school_name: "Morehouse College",
    city: "Atlanta",
    state: "GA",
    is_faith_focused: true,
    website_url: "https://example.com",
    contact_email: null,
    description: "Chapter with dedicated chaplain and monthly faith discussions."
  },
  {
    id: "4",
    organization: "Alpha Kappa Alpha",
    chapter_name: "Beta Xi",
    school_name: "Hampton University",
    city: "Hampton",
    state: "VA",
    is_faith_focused: false,
    website_url: "https://example.com",
    contact_email: "aka@example.com",
    description: "Strong sisterhood focused on scholarship and service."
  },
  {
    id: "5",
    organization: "Phi Beta Sigma",
    chapter_name: "Delta Epsilon",
    school_name: "Florida A&M University",
    city: "Tallahassee",
    state: "FL",
    is_faith_focused: true,
    website_url: null,
    contact_email: "sigma@example.com",
    description: "Brotherhood centered on faith, education, and community development."
  },
  {
    id: "6",
    organization: "Zeta Phi Beta",
    chapter_name: "Alpha Upsilon",
    school_name: "Tennessee State University",
    city: "Nashville",
    state: "TN",
    is_faith_focused: true,
    website_url: "https://example.com",
    contact_email: null,
    description: "Sisterhood with active prayer partnership program."
  },
];

interface Chapter {
  id: string;
  organization: string;
  chapter_name: string;
  school_name: string | null;
  city: string;
  state: string;
  is_faith_focused: boolean;
  website_url: string | null;
  contact_email: string | null;
  description: string | null;
}

function ChapterCard({ chapter }: { chapter: Chapter }) {
  const orgColor = orgColors[chapter.organization] || "bg-muted text-muted-foreground";
  
  return (
    <Card className={`border-border/50 hover:border-sacred/50 transition-all ${chapter.is_faith_focused ? 'ring-1 ring-sacred/30' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="outline" className={orgColor}>
                {chapter.organization}
              </Badge>
              {chapter.is_faith_focused && (
                <Badge className="bg-sacred/20 text-sacred border-sacred/30">
                  <Cross className="w-3 h-3 mr-1" />
                  Faith-Focused
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{chapter.chapter_name}</CardTitle>
            {chapter.school_name && (
              <CardDescription className="flex items-center gap-1 mt-1">
                <GraduationCap className="w-3 h-3" />
                {chapter.school_name}
              </CardDescription>
            )}
          </div>
          <div className="w-12 h-12 rounded-lg bg-sacred/10 flex items-center justify-center flex-shrink-0">
            <Building className="w-6 h-6 text-sacred" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {chapter.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{chapter.description}</p>
        )}
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          {chapter.city}, {chapter.state}
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {chapter.website_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={chapter.website_url} target="_blank" rel="noopener noreferrer">
                <Globe className="w-3 h-3 mr-1" />
                Website
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          )}
          {chapter.contact_email && (
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${chapter.contact_email}`}>
                <Mail className="w-3 h-3 mr-1" />
                Contact
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ChapterFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("All Organizations");
  const [selectedState, setSelectedState] = useState("All States");
  const [faithFocusedOnly, setFaithFocusedOnly] = useState(false);

  // Fetch chapters from database
  const { data: dbChapters } = useQuery({
    queryKey: ['greek-chapters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('greek_chapters')
        .select('*')
        .order('organization', { ascending: true });
      
      if (error) throw error;
      return data as Chapter[];
    }
  });

  // Use DB data if available, otherwise use sample data
  const chapters = dbChapters && dbChapters.length > 0 ? dbChapters : sampleChapters;

  // Filter chapters
  const filteredChapters = chapters.filter(chapter => {
    const matchesSearch = 
      chapter.chapter_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chapter.school_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      chapter.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesOrg = selectedOrg === "All Organizations" || chapter.organization === selectedOrg;
    const matchesState = selectedState === "All States" || chapter.state === selectedState;
    const matchesFaith = !faithFocusedOnly || chapter.is_faith_focused;
    
    return matchesSearch && matchesOrg && matchesState && matchesFaith;
  });

  const faithFocusedCount = chapters.filter(c => c.is_faith_focused).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/dashboard">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>
        <PageHeader
          title="Chapter Finder"
          description="Find Greek chapters and connect with faith-focused organizations near you or your school."
          badge={{ text: "Directory", variant: "default" }}
        />

        {/* Value Prop */}
        <Card className="mb-8 bg-gradient-to-r from-sacred/10 to-purple-500/10 border-sacred/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center">
                <Cross className="w-6 h-6 text-sacred" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Faith-Focused Chapters</h3>
                <p className="text-sm text-muted-foreground">
                  We highlight chapters with active chaplain programs, Bible studies, or faith initiatives. 
                  <span className="text-sacred font-medium ml-1">{faithFocusedCount} faith-focused chapters</span> currently listed.
                </p>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Plus className="w-4 h-4 mr-1" />
                Add Chapter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search chapters, schools, cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                  <SelectTrigger className="w-[180px]">
                    <Users className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {d9Organizations.map(org => (
                      <SelectItem key={org} value={org}>{org}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-[140px]">
                    <MapPin className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant={faithFocusedOnly ? "default" : "outline"} 
                  onClick={() => setFaithFocusedOnly(!faithFocusedOnly)}
                  className={faithFocusedOnly ? "bg-sacred hover:bg-sacred/90" : ""}
                >
                  <Cross className="w-4 h-4 mr-2" />
                  Faith-Focused Only
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredChapters.length} {filteredChapters.length === 1 ? 'chapter' : 'chapters'}
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChapters.map(chapter => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>

        {filteredChapters.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No chapters found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters. Know of a chapter? Help us grow the directory!
              </p>
              <Button variant="outline" className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Submit a Chapter
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Submit CTA */}
        <Card className="mt-8 border-sacred/30">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Help Build the Directory
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Know of a chapter with faith-focused programs? Submit their info to help other believers find like-minded Greeks.
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:chapters@sacredgreeks.com">
                <Mail className="w-4 h-4 mr-2" />
                Submit Chapter Info
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
