import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  Heart,
  Building2,
  Star,
  Users,
  Filter,
  ExternalLink,
  ArrowLeft,
  QrCode,
  Smartphone,
  Download
} from "lucide-react";
import QRCode from 'react-qr-code';
import { PageHeader } from "@/components/ui/page-header";
import { AppLayout } from "@/components/layout/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Organization colors for badges
const orgColors: Record<string, string> = {
  "Alpha Phi Alpha": "bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30",
  "Alpha Kappa Alpha": "bg-pink-500/20 text-pink-700 dark:text-pink-400 border-pink-500/30",
  "Kappa Alpha Psi": "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30",
  "Omega Psi Phi": "bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/30",
  "Delta Sigma Theta": "bg-red-600/20 text-red-700 dark:text-red-400 border-red-600/30",
  "Phi Beta Sigma": "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30",
  "Zeta Phi Beta": "bg-blue-600/20 text-blue-700 dark:text-blue-400 border-blue-600/30",
  "Sigma Gamma Rho": "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  "Iota Phi Theta": "bg-amber-600/20 text-amber-700 dark:text-amber-400 border-amber-600/30",
};

const businessCategories = [
  "All Categories",
  "Professional Services",
  "Health & Wellness",
  "Education & Coaching",
  "Food & Hospitality",
  "Technology",
  "Finance & Insurance",
  "Real Estate",
  "Creative Services",
  "Non-Profit",
  "Retail",
  "Other"
];

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

// Sample curated businesses (will be replaced with DB data)
const sampleBusinesses = [
  {
    id: "1",
    business_name: "Grace & Growth Counseling",
    owner_name: "Dr. Michelle Williams",
    greek_organization: "Delta Sigma Theta",
    business_category: "Health & Wellness",
    description: "Faith-based mental health counseling for professionals and families. Specializing in anxiety, depression, and life transitions.",
    website_url: "https://example.com",
    phone: "(555) 123-4567",
    email: "info@example.com",
    location_city: "Atlanta",
    location_state: "GA",
    faith_statement: "Integrating biblical principles with evidence-based therapy",
    featured: true,
    logo_url: null
  },
  {
    id: "2", 
    business_name: "Kingdom Financial Group",
    owner_name: "Marcus Johnson, CFP",
    greek_organization: "Alpha Phi Alpha",
    business_category: "Finance & Insurance",
    description: "Wealth management and financial planning for families seeking to build generational wealth with biblical stewardship principles.",
    website_url: "https://example.com",
    phone: "(555) 234-5678",
    email: "info@example.com",
    location_city: "Houston",
    location_state: "TX",
    faith_statement: "Managing God's resources with wisdom and integrity",
    featured: true,
    logo_url: null
  },
  {
    id: "3",
    business_name: "Virtue Tech Solutions",
    owner_name: "Jasmine Carter",
    greek_organization: "Zeta Phi Beta",
    business_category: "Technology",
    description: "Web development and digital marketing for faith-based organizations, churches, and Christian entrepreneurs.",
    website_url: "https://example.com",
    phone: "(555) 345-6789",
    email: "info@example.com",
    location_city: "Dallas",
    location_state: "TX",
    faith_statement: "Using technology to advance the Kingdom",
    featured: false,
    logo_url: null
  },
  {
    id: "4",
    business_name: "Legacy Leadership Academy",
    owner_name: "Rev. David Thompson",
    greek_organization: "Omega Psi Phi",
    business_category: "Education & Coaching",
    description: "Executive coaching and leadership development for professionals who want to lead with faith and excellence.",
    website_url: "https://example.com",
    phone: "(555) 456-7890",
    email: "info@example.com",
    location_city: "Washington",
    location_state: "DC",
    faith_statement: "Developing leaders who transform communities",
    featured: false,
    logo_url: null
  },
  {
    id: "5",
    business_name: "Covenant Catering Co.",
    owner_name: "Angela & Robert Davis",
    greek_organization: "Sigma Gamma Rho",
    business_category: "Food & Hospitality",
    description: "Premium catering for church events, Greek functions, and corporate gatherings. Southern cuisine with a healthy twist.",
    website_url: "https://example.com",
    phone: "(555) 567-8901",
    email: "info@example.com",
    location_city: "Memphis",
    location_state: "TN",
    faith_statement: "Serving others as unto the Lord",
    featured: false,
    logo_url: null
  },
  {
    id: "6",
    business_name: "Promised Land Realty",
    owner_name: "Kevin Mitchell, Broker",
    greek_organization: "Phi Beta Sigma",
    business_category: "Real Estate",
    description: "Helping families find their promised land. Specializing in first-time homebuyers and investment properties.",
    website_url: "https://example.com",
    phone: "(555) 678-9012",
    email: "info@example.com",
    location_city: "Charlotte",
    location_state: "NC",
    faith_statement: "Building generational wealth through homeownership",
    featured: true,
    logo_url: null
  }
];

interface Business {
  id: string;
  business_name: string;
  owner_name: string;
  greek_organization: string;
  business_category: string;
  description: string;
  website_url: string | null;
  phone: string | null;
  email: string | null;
  location_city: string | null;
  location_state: string | null;
  faith_statement: string | null;
  featured: boolean;
  logo_url: string | null;
}

function BusinessCard({ business }: { business: Business }) {
  const orgColor = orgColors[business.greek_organization] || "bg-muted text-muted-foreground";
  
  return (
    <Card className={`border-border/50 hover:border-sacred/50 transition-all ${business.featured ? 'ring-2 ring-sacred/30' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {business.featured && (
                <Badge className="bg-sacred/20 text-sacred border-sacred/30">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
              <Badge variant="outline" className={orgColor}>
                {business.greek_organization}
              </Badge>
            </div>
            <CardTitle className="text-lg">{business.business_name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Users className="w-3 h-3" />
              {business.owner_name}
            </CardDescription>
          </div>
          <div className="w-12 h-12 rounded-lg bg-sacred/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-sacred" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{business.description}</p>
        
        {business.faith_statement && (
          <div className="flex items-start gap-2 p-3 bg-sacred/5 rounded-lg border border-sacred/20">
            <Heart className="w-4 h-4 text-sacred flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground italic">"{business.faith_statement}"</p>
          </div>
        )}
        
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {business.location_city && business.location_state && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {business.location_city}, {business.location_state}
            </span>
          )}
          <Badge variant="outline" className="text-xs">
            {business.business_category}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {business.website_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={business.website_url} target="_blank" rel="noopener noreferrer">
                <Globe className="w-3 h-3 mr-1" />
                Website
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          )}
          {business.phone && (
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${business.phone}`}>
                <Phone className="w-3 h-3 mr-1" />
                Call
              </a>
            </Button>
          )}
          {business.email && (
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${business.email}`}>
                <Mail className="w-3 h-3 mr-1" />
                Email
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function D9BusinessDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedOrg, setSelectedOrg] = useState("All Organizations");

  // Fetch businesses from database
  const { data: dbBusinesses } = useQuery({
    queryKey: ['d9-businesses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('d9_business_directory')
        .select('*')
        .eq('is_active', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Business[];
    }
  });

  // Use DB data if available, otherwise use sample data
  const businesses = dbBusinesses && dbBusinesses.length > 0 ? dbBusinesses : sampleBusinesses;

  // Filter businesses
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = 
      business.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.owner_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || business.business_category === selectedCategory;
    const matchesOrg = selectedOrg === "All Organizations" || business.greek_organization === selectedOrg;
    
    return matchesSearch && matchesCategory && matchesOrg;
  });

  const featuredBusinesses = filteredBusinesses.filter(b => b.featured);
  const regularBusinesses = filteredBusinesses.filter(b => !b.featured);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back to Dashboard */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <PageHeader
          title="D9 Business Directory"
          description="Support Divine Nine entrepreneurs who operate with faith-based values. Every business here is owned by a D9 member committed to Kingdom principles."
          badge={{ text: "Faith + Business", variant: "default" }}
        />

        {/* Value Prop */}
        <Card className="mb-8 bg-gradient-to-r from-sacred/10 to-purple-500/10 border-sacred/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-sacred" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Faith-Focused Networking</h3>
                <p className="text-sm text-muted-foreground">
                  Unlike other D9 directories, every business here operates on biblical principles.
                  Support entrepreneurs who share your values.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search businesses, owners, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'}
          </p>
        </div>

        {/* Featured Businesses */}
        {featuredBusinesses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-sacred fill-sacred" />
              Featured Businesses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredBusinesses.map(business => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </div>
        )}

        {/* All Businesses */}
        <div>
          {regularBusinesses.length > 0 && (
            <h2 className="text-lg font-semibold text-foreground mb-4">
              All Businesses
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularBusinesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>

        {filteredBusinesses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No businesses found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}

        {/* QR Code & Submit CTA */}
        <Card className="mt-8 border-sacred/30 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* QR Code Section */}
              <div className="bg-gradient-to-br from-sacred/10 to-purple-500/10 p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-border/50">
                <div className="w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center mb-4">
                  <QrCode className="w-6 h-6 text-sacred" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Scan to Add Your Business
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick scan at events, meetings, or share with fellow Greeks
                </p>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <QRCode 
                    value={`${window.location.origin}/submit-business`}
                    size={160}
                    level="H"
                  />
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <Smartphone className="w-4 h-4" />
                  <span>Open camera app & scan</span>
                </div>
              </div>

              {/* Text CTA Section */}
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-sacred/20 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-sacred" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Own a Faith-Based Business?
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  List your D9-owned business for FREE and connect with brothers and sisters who want to support Black excellence.
                </p>
                <div className="space-y-3 w-full max-w-xs">
                  <Button className="w-full" asChild>
                    <Link to="/submit-business">
                      <Mail className="w-4 h-4 mr-2" />
                      Submit Your Business Free
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Takes only 2 minutes • No payment required
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
