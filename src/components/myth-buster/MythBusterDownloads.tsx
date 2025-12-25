import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DownloadableResource {
  id: string;
  resourceId: string;
  title: string;
  description: string;
  downloadCount: number;
}

const resourcesData: Omit<DownloadableResource, 'downloadCount'>[] = [
  {
    id: '1',
    resourceId: 'greek-life-idolatry',
    title: 'Myth Busters: Greek Life is Idolatry',
    description: 'Discover the truth about Greek life and faith. This guide addresses the common misconception that joining a fraternity or sorority means putting Greek letters before God.',
  },
  {
    id: '2',
    resourceId: 'secret-rituals',
    title: 'Myth Busters: Secret Rituals Explained',
    description: 'A biblical perspective on Greek organization rituals. Learn how to discern between cultural traditions and spiritual concerns.',
  },
  {
    id: '3',
    resourceId: 'bglo-origins',
    title: 'Myth Busters: BGLO Origins & Christianity',
    description: "Explore the actual Christian foundations of many Black Greek Letter Organizations and their founders' faith backgrounds.",
  },
  {
    id: '4',
    resourceId: 'serving-two-masters',
    title: 'Myth Busters: Serving Two Masters?',
    description: 'Can you be fully devoted to Christ while being Greek? This resource addresses the divided loyalty concern with scriptural guidance.',
  },
  {
    id: '5',
    resourceId: 'party-culture',
    title: 'Myth Busters: Party Culture Truth',
    description: 'Addressing misconceptions about Greek social life. Learn how Christians navigate social settings while honoring God.',
  },
];

export function MythBusterDownloads() {
  const { toast } = useToast();
  const [resources, setResources] = useState<DownloadableResource[]>([]);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloadCounts();
  }, []);

  const fetchDownloadCounts = async () => {
    try {
      const { data, error } = await supabase
        .from('myth_buster_downloads')
        .select('resource_id, download_count');

      if (error) throw error;

      const countsMap = new Map(data?.map(d => [d.resource_id, d.download_count]) || []);
      
      const resourcesWithCounts = resourcesData.map(r => ({
        ...r,
        downloadCount: countsMap.get(r.resourceId) || 0,
      }));

      setResources(resourcesWithCounts);
    } catch (error) {
      console.error('Error fetching download counts:', error);
      // Use default counts if error
      setResources(resourcesData.map(r => ({ ...r, downloadCount: 0 })));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (resource: DownloadableResource) => {
    setDownloading(resource.resourceId);

    try {
      // Increment download count
      const { data, error } = await supabase.rpc('increment_download_count', {
        resource_id_param: resource.resourceId,
      });

      if (error) throw error;

      // Update local state
      setResources(prev =>
        prev.map(r =>
          r.resourceId === resource.resourceId
            ? { ...r, downloadCount: data || r.downloadCount + 1 }
            : r
        )
      );

      // Generate and download PDF content
      const content = generatePDFContent(resource);
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resource.resourceId}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Download Started',
        description: `${resource.title} is being downloaded.`,
      });
    } catch (error) {
      console.error('Error downloading:', error);
      toast({
        title: 'Download Error',
        description: 'Failed to download the resource. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDownloading(null);
    }
  };

  const generatePDFContent = (resource: DownloadableResource) => {
    // Generate text content for the downloadable resource
    const contents: Record<string, string> = {
      'greek-life-idolatry': `MYTH BUSTERS: GREEK LIFE IS IDOLATRY
Sacred Greeks Ministry

${resource.description}

THE MYTH:
"Joining a Greek organization means you're putting Greek letters before God."

THE TRUTH:
This misconception stems from a misunderstanding of what Greek membership entails. Being part of a fraternity or sorority is about community, service, and brotherhood/sisterhood—values that can actually align with Christian principles when approached correctly.

BIBLICAL PERSPECTIVE:
The Bible calls us to fellowship (Hebrews 10:24-25), service (Galatians 5:13), and community (Acts 2:42-47). Greek organizations, at their best, embody these same values.

KEY SCRIPTURES:
• "And let us consider how to stir up one another to love and good works" - Hebrews 10:24
• "For you were called to freedom, brothers. Only do not use your freedom as an opportunity for the flesh, but through love serve one another." - Galatians 5:13

PRACTICAL APPLICATION:
1. Keep Christ first in all things
2. Use your Greek platform to share your faith
3. Lead by example in ethical behavior
4. Be a light in your chapter

Remember: Your identity is in Christ first, then everything else follows.

© Sacred Greeks Ministry
www.sacredgreeks.com`,

      'secret-rituals': `MYTH BUSTERS: SECRET RITUALS EXPLAINED
Sacred Greeks Ministry

${resource.description}

THE MYTH:
"Greek rituals are occult practices that violate Christian faith."

THE TRUTH:
While rituals vary between organizations, most Greek rituals are ceremonial traditions focused on values like integrity, scholarship, and service—not spiritual worship of any deity other than God.

BIBLICAL DISCERNMENT:
The key is discernment. Scripture tells us to "test everything; hold fast what is good" (1 Thessalonians 5:21).

QUESTIONS TO ASK:
1. Does this ritual ask me to worship anyone/anything other than God?
2. Does this contradict clear biblical teaching?
3. Can I participate with a clear conscience?
4. Would I be comfortable if my pastor knew the details?

KEY SCRIPTURES:
• "Test everything; hold fast what is good." - 1 Thessalonians 5:21
• "Whatever you do, in word or deed, do everything in the name of the Lord Jesus" - Colossians 3:17

PRACTICAL GUIDANCE:
If a specific element concerns you, respectfully discuss it with chapter leadership. Many organizations allow modifications for religious convictions.

© Sacred Greeks Ministry
www.sacredgreeks.com`,

      'bglo-origins': `MYTH BUSTERS: BGLO ORIGINS & CHRISTIANITY
Sacred Greeks Ministry

${resource.description}

THE MYTH:
"BGLOs were founded on non-Christian principles."

THE TRUTH:
Many Black Greek Letter Organizations were founded by devout Christians on college campuses, often with explicit Christian values woven into their founding principles.

HISTORICAL FACTS:
• Alpha Phi Alpha (1906) - Founded by Christian men at Cornell
• Alpha Kappa Alpha (1908) - Founded by Christian women at Howard
• Kappa Alpha Psi (1911) - Founded with principles rooted in Christian ethics
• Many founders were ministers or deeply religious individuals

THE CHRISTIAN FOUNDATION:
The founders of many BGLOs saw their organizations as vehicles for:
• Uplifting the Black community
• Promoting education and scholarship
• Living out Christian service
• Building brotherhood/sisterhood in Christ

KEY SCRIPTURE:
"For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them." - Ephesians 2:10

CALL TO ACTION:
Honor the Christian legacy of your founders by living out your faith within your organization.

© Sacred Greeks Ministry
www.sacredgreeks.com`,

      'serving-two-masters': `MYTH BUSTERS: SERVING TWO MASTERS?
Sacred Greeks Ministry

${resource.description}

THE MYTH:
"You can't be fully devoted to Christ AND be Greek."

THE TRUTH:
The "two masters" passage (Matthew 6:24) refers specifically to money and God, not to membership in organizations. The real question is: What or who has your ultimate allegiance?

BIBLICAL ANALYSIS:
Jesus said, "No one can serve two masters" in the context of wealth and materialism. The principle applies to anything that competes with God for our worship and devotion.

THE KEY QUESTION:
Is your Greek organization an idol, or is it a platform for your faith?

SIGNS OF HEALTHY BALANCE:
• Christ remains your first priority
• You use your Greek platform to serve others
• You maintain your spiritual disciplines
• You're willing to step back if it conflicts with faith

SIGNS OF IMBALANCE:
• Greek activities consistently override church/faith commitments
• You compromise your values for acceptance
• Your identity is more "Greek" than "Christian"

KEY SCRIPTURES:
• "But seek first the kingdom of God and his righteousness, and all these things will be added to you." - Matthew 6:33
• "And whatever you do, in word or deed, do everything in the name of the Lord Jesus" - Colossians 3:17

© Sacred Greeks Ministry
www.sacredgreeks.com`,

      'party-culture': `MYTH BUSTERS: PARTY CULTURE TRUTH
Sacred Greeks Ministry

${resource.description}

THE MYTH:
"Greeks just party all the time—you can't be Greek and live a godly lifestyle."

THE TRUTH:
While Greek organizations have social events, the majority of Greek life involves academics, service, leadership development, and community building. The "party" stereotype is an exaggeration.

REALITY CHECK:
• Most chapters require GPA minimums
• Community service is mandatory
• Leadership development is a core focus
• Many Greeks are active in campus ministry

BIBLICAL WISDOM FOR SOCIAL SETTINGS:
You can attend social events while honoring God:
1. Set boundaries before you arrive
2. Be a positive influence, not just present
3. Know when to leave
4. Find accountability partners

KEY SCRIPTURES:
• "Do not be conformed to this world, but be transformed by the renewal of your mind" - Romans 12:2
• "So, whether you eat or drink, or whatever you do, do all to the glory of God." - 1 Corinthians 10:31

PRACTICAL TIPS:
• You don't have to drink to socialize
• Leave events that cross your boundaries
• Host alternative social events
• Be known for your character, not your drinking

Remember: You can be social AND sacred.

© Sacred Greeks Ministry
www.sacredgreeks.com`,
    };

    return contents[resource.resourceId] || `${resource.title}\n\n${resource.description}`;
  };

  if (loading) {
    return (
      <Card className="mb-8">
        <CardContent className="py-8 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-sacred" />
        <h2 className="text-xl font-semibold">Downloadable Resources</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {resources.map(resource => (
          <Card key={resource.id} className="hover:border-sacred/30 transition-colors">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <Badge variant="secondary" className="w-fit mb-2">Myth Busters</Badge>
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {resource.downloadCount} downloads
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(resource)}
                    disabled={downloading === resource.resourceId}
                    className="gap-2"
                  >
                    {downloading === resource.resourceId ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
