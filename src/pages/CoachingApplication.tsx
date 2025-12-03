import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Send, UsersRound, UserCog, CheckCircle } from 'lucide-react';
import { useLandingSurvey } from '@/hooks/use-landing-survey';
import { cn } from '@/lib/utils';

export default function CoachingApplication() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { surveyAnswers } = useLandingSurvey();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coachingType: surveyAnswers?.coachingType || 'group',
    greekOrganization: '',
    currentSituation: '',
    goals: '',
    availability: '',
    howHeard: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.currentSituation || !formData.goals) {
      toast({
        title: 'Please fill in required fields',
        description: 'Name, email, current situation, and goals are required.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission - in production, this would send to your backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: 'Application submitted!',
      description: 'We\'ll review your application and get back to you within 48 hours.',
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Application Received!</CardTitle>
            <CardDescription className="text-base">
              Thank you for your interest in our coaching program. We'll review your application and contact you within 48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="bg-sacred hover:bg-sacred/90">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl bg-gradient-to-r from-sacred to-sacred/70 bg-clip-text text-transparent">
              Coaching Application
            </CardTitle>
            <CardDescription className="text-base">
              Take the next step in your faith journey with personalized guidance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Coaching Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Type of Coaching *</Label>
                <RadioGroup
                  value={formData.coachingType}
                  onValueChange={(value) => handleChange('coachingType', value)}
                  className="grid gap-3"
                >
                  <div
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      formData.coachingType === 'group'
                        ? "border-sacred bg-sacred/5"
                        : "border-border hover:border-sacred/50"
                    )}
                    onClick={() => handleChange('coachingType', 'group')}
                  >
                    <RadioGroupItem value="group" id="group" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <UsersRound className="w-5 h-5 text-sacred" />
                        <Label htmlFor="group" className="font-medium cursor-pointer">Group Coaching</Label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Learn alongside others in a supportive community setting. Weekly sessions with 4-8 participants.
                      </p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                      formData.coachingType === 'personalized'
                        ? "border-sacred bg-sacred/5"
                        : "border-border hover:border-sacred/50"
                    )}
                    onClick={() => handleChange('coachingType', 'personalized')}
                  >
                    <RadioGroupItem value="personalized" id="personalized" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <UserCog className="w-5 h-5 text-sacred" />
                        <Label htmlFor="personalized" className="font-medium cursor-pointer">Personalized Coaching</Label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        One-on-one guidance tailored to your specific situation. Flexible scheduling with dedicated support.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Contact Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="greekOrganization">Greek Organization (optional)</Label>
                  <Input
                    id="greekOrganization"
                    value={formData.greekOrganization}
                    onChange={(e) => handleChange('greekOrganization', e.target.value)}
                    placeholder="e.g., Alpha Phi Alpha"
                  />
                </div>
              </div>

              {/* Situation and Goals */}
              <div className="space-y-2">
                <Label htmlFor="currentSituation">Current Situation *</Label>
                <Textarea
                  id="currentSituation"
                  value={formData.currentSituation}
                  onChange={(e) => handleChange('currentSituation', e.target.value)}
                  placeholder="Briefly describe your current situation and what challenges you're facing..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Goals for Coaching *</Label>
                <Textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => handleChange('goals', e.target.value)}
                  placeholder="What do you hope to achieve through coaching?"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability (optional)</Label>
                <Input
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => handleChange('availability', e.target.value)}
                  placeholder="e.g., Weekday evenings, Saturday mornings"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="howHeard">How did you hear about us? (optional)</Label>
                <Input
                  id="howHeard"
                  value={formData.howHeard}
                  onChange={(e) => handleChange('howHeard', e.target.value)}
                  placeholder="e.g., Social media, friend referral, church"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sacred hover:bg-sacred/90 text-sacred-foreground gap-2"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    Submit Application
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting this form, you agree to be contacted regarding coaching opportunities.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
