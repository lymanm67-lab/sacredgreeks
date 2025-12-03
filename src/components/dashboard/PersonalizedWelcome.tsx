import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Target } from 'lucide-react';
import { PersonalizedContent } from '@/hooks/use-personalization';

interface PersonalizedWelcomeProps {
  personalization: PersonalizedContent;
  userName?: string;
}

export function PersonalizedWelcome({ personalization, userName }: PersonalizedWelcomeProps) {
  return (
    <Card className="bg-gradient-to-br from-sacred/10 via-background to-warm-blue/10 border-sacred/20">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-sacred/20">
            <Sparkles className="w-6 h-6 text-sacred" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {userName ? `Hey ${userName.split(' ')[0]}!` : 'Welcome!'}
              </h2>
              <p className="text-muted-foreground mt-1">
                {personalization.welcomeMessage}
              </p>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-sacred/20 text-sacred border-0">
                <Target className="w-3 h-3 mr-1" />
                {personalization.focusArea}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
