import { SEOHead } from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Award, 
  ArrowLeft, 
  Home,
  Sparkles,
  Lock,
  Building2,
  Target,
  Shield,
  Flame
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useEarnedCertificates, CERTIFICATE_TYPES } from '@/hooks/use-earned-certificates';
import { TrainingCertificate } from '@/components/certificates/TrainingCertificate';
import { useNavigationProgress } from '@/hooks/use-navigation-progress';

const AVAILABLE_CERTIFICATES = [
  {
    type: CERTIFICATE_TYPES.PROOF_COURSE,
    title: 'P.R.O.O.F. Framework Master',
    description: 'Complete all 5 P.R.O.O.F. framework modules',
    icon: 'Target',
    color: 'amber',
    progressKey: 'proofCourse' as const,
    link: '/proof-course',
  },
  {
    type: CERTIFICATE_TYPES.GREEK_LIFE_TRAINING,
    title: 'Greek Life & Guild Training',
    description: 'Complete all 14 training sections (Part 1 & Part 2)',
    icon: 'Building2',
    color: 'violet',
    progressKey: 'greekLifeTraining' as const,
    link: '/greek-life-training',
  },
  {
    type: CERTIFICATE_TYPES.MYTH_BUSTER,
    title: 'Myth Buster Elite',
    description: 'Review all myths in Myth Busters training',
    icon: 'Shield',
    color: 'orange',
    progressKey: 'mythBuster' as const,
    link: '/myth-buster',
  },
  {
    type: CERTIFICATE_TYPES.FAITH_AUTHORITY,
    title: 'Faith & Authority Champion',
    description: 'Complete Faith & Authority training',
    icon: 'Flame',
    color: 'rose',
    progressKey: 'faithAuthority' as const,
    link: '/faith-authority',
  },
];

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Target,
  Shield,
  Flame,
  Trophy,
  Award,
};

export default function TrainingSuccessVault() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { certificates, isLoading } = useEarnedCertificates();
  const { progressData } = useNavigationProgress();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Sign In Required</h2>
            <p className="text-muted-foreground mb-4">
              Please sign in to view your Training Success Vault
            </p>
            <Button onClick={() => navigate('/auth')}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const earnedCount = certificates?.length || 0;
  const totalAvailable = AVAILABLE_CERTIFICATES.length;

  return (
    <>
      <SEOHead 
        title="Training Success Vault | Sacred Greeks"
        description="View and download your earned training certificates"
        type="website"
      />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                to="/dashboard" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Training Success Vault</h1>
                  <p className="text-muted-foreground">Your earned certificates & achievements</p>
                </div>
              </div>
              
              <Badge 
                variant="secondary" 
                className="self-start sm:self-center bg-amber-500/20 text-amber-500 border-amber-500/30 text-sm px-4 py-2"
              >
                <Award className="w-4 h-4 mr-2" />
                {earnedCount}/{totalAvailable} Certificates Earned
              </Badge>
            </div>
          </div>

          {/* Earned Certificates */}
          {earnedCount > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Your Earned Certificates
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {certificates?.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TrainingCertificate
                      title={cert.title}
                      certificateType={cert.certificate_type}
                      earnedAt={cert.earned_at}
                      description={cert.description || undefined}
                      certificateData={cert.certificate_data}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Available Certificates */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {earnedCount > 0 ? 'Continue Earning' : 'Available Certificates'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AVAILABLE_CERTIFICATES.map((cert) => {
                const isEarned = certificates?.some(c => c.certificate_type === cert.type);
                const progress = progressData?.[cert.progressKey] || 0;
                const IconComponent = iconMap[cert.icon] || Award;

                return (
                  <motion.div
                    key={cert.type}
                    whileHover={!isEarned ? { scale: 1.02 } : {}}
                    className="relative"
                  >
                    <Card 
                      className={`h-full transition-all ${
                        isEarned 
                          ? 'border-green-500/50 bg-green-500/5' 
                          : 'border-border hover:border-primary/50 cursor-pointer'
                      }`}
                      onClick={() => !isEarned && navigate(cert.link)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div 
                            className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                              isEarned 
                                ? 'bg-green-500/20' 
                                : `bg-${cert.color}-500/20`
                            }`}
                          >
                            {isEarned ? (
                              <Trophy className="w-6 h-6 text-green-500" />
                            ) : (
                              <IconComponent className={`w-6 h-6 text-${cert.color}-500`} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">{cert.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {cert.description}
                            </p>
                            {!isEarned && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-medium">{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            {isEarned && (
                              <Badge variant="secondary" className="mt-2 text-xs bg-green-500/20 text-green-500 border-0">
                                ✓ Earned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Empty State */}
          {earnedCount === 0 && !isLoading && (
            <Card className="mt-8 border-dashed">
              <CardContent className="p-8 text-center">
                <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Complete training courses to earn certificates that you can print and download!
                </p>
                <Button onClick={() => navigate('/proof-course')} className="gap-2">
                  <Target className="w-4 h-4" />
                  Start P.R.O.O.F. Course
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
