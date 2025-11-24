import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ExternalLink, Download } from 'lucide-react';

const resources = [
  {
    title: "Christian Greek Life Study Guide",
    description: "Comprehensive biblical framework for navigating faith and fraternity by Dr. Lyman Montgomery",
    url: "https://gamma.app/docs/Christian-Greek-Life-Study-Guide-ihr8fq0g089n32t",
    icon: BookOpen,
    type: "Study Guide"
  },
  {
    title: "Sacred Greeks Biblical Guide",
    description: "FREE guide with insights to thrive as a Christian in your Divine Nine journey",
    url: "https://sacredgreeks.com/#card-r83oyur3vnn26i6",
    icon: Download,
    type: "Free Download"
  }
];

export const ResourcesSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sacred" />
          <CardTitle>Essential Resources</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-sacred/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-sacred" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{resource.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-sacred/10 text-sacred">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {resource.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="w-full"
                    >
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Access Resource
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};