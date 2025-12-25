import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Book, 
  Users, 
  Calendar, 
  Palette, 
  Star, 
  Quote, 
  ExternalLink,
  Share2,
  Bookmark,
  Shield,
  Heart,
  Target,
  Crown,
  Sparkles
} from 'lucide-react';
import { allGreekOrganizations, councilLabels, organizationCategories } from '@/data/greekOrganizationsGuide';
import { SEOHead } from '@/components/SEOHead';

const OrganizationDetail = () => {
  const { orgId } = useParams<{ orgId: string }>();

  const organization = useMemo(() => {
    return allGreekOrganizations.find(org => org.id === orgId);
  }, [orgId]);

  const relatedOrganizations = useMemo(() => {
    if (!organization) return [];
    return allGreekOrganizations
      .filter(org => org.category === organization.category && org.id !== organization.id)
      .slice(0, 4);
  }, [organization]);

  if (!organization) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-gradient-to-r from-sacred/10 to-warm-blue/10 py-8 border-b">
          <div className="container max-w-4xl">
            <Link to="/symbol-guide?tab=organizations" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Organizations
            </Link>
            <h1 className="text-3xl font-bold">Organization Not Found</h1>
            <p className="text-muted-foreground mt-2">The organization you're looking for doesn't exist.</p>
          </div>
        </header>
      </div>
    );
  }

  const categoryLabel = organizationCategories.find(c => c.id === organization.category)?.label || organization.category;
  const councilLabel = councilLabels[organization.council] || organization.council;

  const handleShare = async () => {
    const shareData = {
      title: organization.name,
      text: `Learn about ${organization.name} and its Christian perspective on Sacred Greeks`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${organization.name} | Christian Perspective | Sacred Greeks`}
        description={`Explore ${organization.name}'s values and how they align with biblical teachings. ${organization.motto || ''}`}
      />

      {/* Hero Header */}
      <header className="bg-gradient-to-r from-sacred/10 via-warm-blue/5 to-sacred/10 py-8 md:py-12 border-b">
        <div className="container max-w-4xl">
          <Link to="/symbol-guide?tab=organizations" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Organizations
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-sacred/20 text-sacred border-sacred/30">{categoryLabel}</Badge>
                <Badge variant="outline" className="capitalize">{organization.type}</Badge>
                <Badge variant="secondary">{organization.council}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{organization.name}</h1>
              
              {organization.motto && (
                <p className="text-lg text-muted-foreground italic flex items-center gap-2">
                  <Quote className="w-4 h-4 text-sacred shrink-0" />
                  "{organization.motto}"
                </p>
              )}
            </div>
            
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl py-8 space-y-8">
        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {organization.founded && (
            <Card className="bg-gradient-to-br from-muted/50 to-transparent">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium">Founded</span>
                </div>
                <p className="font-semibold">{organization.founded}</p>
              </CardContent>
            </Card>
          )}
          
          {organization.colors && (
            <Card className="bg-gradient-to-br from-muted/50 to-transparent">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Palette className="w-4 h-4" />
                  <span className="text-xs font-medium">Colors</span>
                </div>
                <p className="font-semibold">{organization.colors}</p>
              </CardContent>
            </Card>
          )}
          
          {organization.symbol && (
            <Card className="bg-gradient-to-br from-muted/50 to-transparent">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-medium">Symbol</span>
                </div>
                <p className="font-semibold">{organization.symbol}</p>
              </CardContent>
            </Card>
          )}
          
          <Card className="bg-gradient-to-br from-muted/50 to-transparent">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium">Council</span>
              </div>
              <p className="font-semibold text-sm">{organization.council}</p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-sacred" />
              About This Organization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{organization.description}</p>
          </CardContent>
        </Card>

        {/* Notable Members */}
        {organization.notableMembers && organization.notableMembers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" />
                Notable Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {organization.notableMembers.map((member, i) => (
                  <Badge key={i} variant="secondary" className="py-1.5 px-3">
                    {member}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Christian Perspective */}
        <Card className="border-sacred/30 bg-gradient-to-br from-sacred/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-sacred" />
              Christian Perspective
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{organization.christianPerspective}</p>
            
            <Separator />
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-sacred" />
                Biblical Parallels
              </h4>
              <ul className="space-y-2">
                {organization.biblicalParallels.map((parallel, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-sacred shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{parallel}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Scripture References */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-sacred" />
              Scripture References
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {organization.scriptureReferences.map((ref, i) => (
                <Link 
                  key={i} 
                  to={`/bible-study?search=${encodeURIComponent(ref.ref)}`}
                  className="block p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-sacred/20"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-sacred">{ref.ref}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                  {ref.text && (
                    <p className="text-sm text-muted-foreground italic">"{ref.text}"</p>
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Resources */}
        <Card className="bg-gradient-to-br from-warm-blue/5 to-transparent">
          <CardHeader>
            <CardTitle>Related Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link to="/the-book" className="block p-4 rounded-lg border bg-background hover:border-sacred/30 transition-colors">
                <h4 className="font-semibold mb-1">Sacred, Not Sinful</h4>
                <p className="text-sm text-muted-foreground">Read Dr. Lyman's book on faith and Greek life</p>
              </Link>
              <Link to="/anti-hazing" className="block p-4 rounded-lg border bg-background hover:border-sacred/30 transition-colors">
                <h4 className="font-semibold mb-1">Anti-Hazing Resources</h4>
                <p className="text-sm text-muted-foreground">Prevention resources and support</p>
              </Link>
              <Link to="/myth-buster" className="block p-4 rounded-lg border bg-background hover:border-sacred/30 transition-colors">
                <h4 className="font-semibold mb-1">Myth Buster</h4>
                <p className="text-sm text-muted-foreground">Address common misconceptions</p>
              </Link>
              <Link to="/biblical-guides" className="block p-4 rounded-lg border bg-background hover:border-sacred/30 transition-colors">
                <h4 className="font-semibold mb-1">Biblical Guides</h4>
                <p className="text-sm text-muted-foreground">Scripture-based resources for Greek life</p>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Related Organizations */}
        {relatedOrganizations.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Other {categoryLabel} Organizations</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedOrganizations.map(org => (
                <Link key={org.id} to={`/organization/${org.id}`}>
                  <Card className="h-full hover:border-sacred/30 transition-colors">
                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-1">{org.name}</h3>
                      {org.motto && (
                        <p className="text-xs text-muted-foreground italic mb-2">"{org.motto}"</p>
                      )}
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs capitalize">{org.type}</Badge>
                        {org.founded && (
                          <Badge variant="secondary" className="text-xs">{org.founded}</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Card className="bg-gradient-to-r from-sacred/10 to-warm-blue/10 border-sacred/20">
          <CardContent className="py-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Explore More Organizations</h3>
            <p className="text-muted-foreground mb-4">
              Discover Christian perspectives on Greek organizations across all councils
            </p>
            <Link to="/symbol-guide?tab=organizations">
              <Button className="bg-sacred hover:bg-sacred/90">
                <Users className="w-4 h-4 mr-2" />
                View All Organizations
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OrganizationDetail;
