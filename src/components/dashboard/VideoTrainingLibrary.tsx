import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Play, Clock } from 'lucide-react';
import { ExternalContentModal } from '@/components/ui/ExternalContentModal';

interface VideoTraining {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'leadership' | 'faith' | 'service' | 'brotherhood';
  videoUrl: string;
  thumbnail?: string;
}

const trainings: VideoTraining[] = [
  {
    id: '1',
    title: 'Leading with Integrity: The P.R.O.O.F. Framework',
    description: 'Learn how to apply biblical principles of Purpose, Reverence, Obedience, Others, and Faith in chapter leadership.',
    duration: '12 min',
    category: 'leadership',
    videoUrl: 'https://www.youtube.com/embed/qtDlvE0a9Ok',
  },
  {
    id: '2',
    title: 'Balancing Greek Life and Christian Values',
    description: 'Practical strategies for maintaining your faith while being an active member of your organization.',
    duration: '15 min',
    category: 'faith',
    videoUrl: 'https://www.youtube.com/embed/ICyKY7z7E5M',
  },
  {
    id: '3',
    title: 'Service as Worship: Community Impact',
    description: 'Transform your chapter\'s service projects into opportunities for ministry and witness.',
    duration: '10 min',
    category: 'service',
    videoUrl: 'https://www.youtube.com/embed/PLQG1lOu-48',
  },
  {
    id: '4',
    title: 'Building Biblical Brotherhood/Sisterhood',
    description: 'Create deeper, more meaningful connections with your line brothers/sisters through Christ.',
    duration: '14 min',
    category: 'brotherhood',
    videoUrl: 'https://www.youtube.com/embed/qtDlvE0a9Ok',
  },
  {
    id: '5',
    title: 'Ethical Decision Making on Campus',
    description: 'Navigate challenging situations with wisdom and biblical discernment.',
    duration: '11 min',
    category: 'leadership',
    videoUrl: 'https://www.youtube.com/embed/ICyKY7z7E5M',
  },
  {
    id: '6',
    title: 'Prayer & Devotional Life for Greeks',
    description: 'Develop a consistent spiritual practice that fits your busy Greek life schedule.',
    duration: '9 min',
    category: 'faith',
    videoUrl: 'https://www.youtube.com/embed/PLQG1lOu-48',
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    leadership: 'bg-purple-100 text-purple-800 border-purple-200',
    faith: 'bg-sacred/10 text-sacred border-sacred/20',
    service: 'bg-green-100 text-green-800 border-green-200',
    brotherhood: 'bg-blue-100 text-blue-800 border-blue-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    leadership: 'Leadership',
    faith: 'Faith',
    service: 'Service',
    brotherhood: 'Brotherhood',
  };
  return labels[category] || category;
};

export const VideoTrainingLibrary = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-5 h-5 text-sacred" />
          <CardTitle>Video Training Library</CardTitle>
        </div>
        <CardDescription>
          Essential teachings for Christian Greeks navigating faith and fraternity/sorority life
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trainings.map((training) => (
            <ExternalContentModal
              key={training.id}
              url={training.videoUrl}
              title={training.title}
              description={training.description}
              category="Training Video"
              trigger={
                <div className="group cursor-pointer">
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border-2 border-border group-hover:border-sacred/50 transition-all">
                      <div className="absolute inset-0 bg-gradient-to-br from-sacred/20 to-warm-blue/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-sacred ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getCategoryColor(training.category)}>
                          {getCategoryLabel(training.category)}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {training.duration}
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm group-hover:text-sacred transition-colors line-clamp-2 text-left">
                        {training.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 text-left">
                        {training.description}
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
