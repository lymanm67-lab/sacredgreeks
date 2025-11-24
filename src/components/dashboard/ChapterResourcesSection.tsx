import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Heart, BookOpen, ExternalLink } from 'lucide-react';

const chapterResources = [
  {
    title: "Roberts Rules of Order Guide",
    description: "Parliamentary procedure guide for conducting effective and orderly chapter meetings",
    url: "https://www.boardeffect.com/blog/roberts-rules-of-order-cheat-sheet/",
    icon: Users,
    type: "Meeting Guide"
  },
  {
    title: "How to Witness to Your Chapter",
    description: "Practical guidance for sharing your faith with brothers and sisters in your organization",
    url: "https://www.cru.org/us/en/train-and-grow/share-the-gospel/how-to-share-your-faith.html",
    icon: Heart,
    type: "Faith Guide"
  },
  {
    title: "Prayers for Life Events",
    description: "A collection of prayers for important moments in Greek life and personal milestones",
    url: "https://www.lords-prayer-words.com/times_of_need/prayer_for_friends.html",
    icon: BookOpen,
    type: "Prayer Resource"
  }
];

export const ChapterResourcesSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-warm-blue" />
          <CardTitle>Chapter Resources</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {chapterResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-warm-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-warm-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{resource.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-warm-blue/10 text-warm-blue">
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
                        View Resource
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
