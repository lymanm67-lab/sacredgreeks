import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoModeControl } from '@/components/GlobalDemoIndicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Home, Eye, EyeOff, RefreshCw, AlertTriangle, BookOpen, Heart, Shield, Quote, Star, Users, ChevronRight, ChevronDown, ChevronUp, Sparkles, Play, User, Moon, Zap, Video, UserCheck } from 'lucide-react';
import logo from '@/assets/sacred-greeks-logo.png';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';
import { usePasswordBreachCheck } from '@/hooks/use-password-breach-check';
import { useDisposableEmailCheck } from '@/hooks/use-disposable-email-check';
import { cn } from '@/lib/utils';

const FEATURED_TOOLS = [
  {
    icon: Zap,
    title: "MythBusters",
    subtitle: "Debunk Greek Life Misconceptions",
    description: "Get biblical answers to common objections about Greek life and faith compatibility.",
    tags: ["50+ Myths Debunked", "Scripture-Based", "Shareable Cards"],
    link: "/mythbusters",
    bgColor: "bg-orange-500/20",
    hoverBgColor: "bg-orange-500/30",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/70",
    topBorderColor: "bg-orange-500"
  },
  {
    icon: Shield,
    title: "Symbols & Rituals Guide",
    subtitle: "Understand Hidden Meanings",
    description: "Explore the biblical and historical context behind Greek letters, rituals, and traditions.",
    tags: ["100+ Symbols", "Historical Context", "Faith Connections"],
    link: "/symbols",
    bgColor: "bg-fuchsia-500/20",
    hoverBgColor: "bg-fuchsia-500/30",
    iconColor: "text-fuchsia-400",
    borderColor: "border-fuchsia-500/70",
    topBorderColor: "bg-fuchsia-500"
  },
  {
    icon: AlertTriangle,
    title: "Anti-Hazing Resources",
    subtitle: "Protect & Educate Your Chapter",
    description: "Access vital hazing prevention tools, success stories, and memorial resources to keep your organization safe.",
    tags: ["Prevention Tools", "Success Stories", "Memorial Wall"],
    link: "/anti-hazing",
    bgColor: "bg-red-500/20",
    hoverBgColor: "bg-red-500/30",
    iconColor: "text-red-400",
    borderColor: "border-red-500/70",
    topBorderColor: "bg-red-500"
  }
];

const SECONDARY_TOOLS = [
  {
    icon: BookOpen,
    title: "Greek Life Bible Study",
    subtitle: "Faith Foundations for Greeks",
    description: "Dive deep into scripture with studies designed specifically for the Greek experience.",
    tags: ["12-Week Journey", "Group Guides", "Interactive Flashcards"],
    link: "/bible-study",
    bgColor: "bg-blue-500/20",
    hoverBgColor: "bg-blue-500/30",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/70",
    topBorderColor: "bg-blue-500"
  },
  {
    icon: Video,
    title: "Video Library",
    subtitle: "Learn Through Powerful Stories",
    description: "Watch testimonies, teachings, and discussions from Greeks who've navigated faith and fraternity life.",
    tags: ["50+ Videos", "Testimonies", "Teaching Series"],
    link: "/video-library",
    bgColor: "bg-pink-500/20",
    hoverBgColor: "bg-pink-500/30",
    iconColor: "text-pink-400",
    borderColor: "border-pink-500/70",
    topBorderColor: "bg-pink-500"
  },
  {
    icon: UserCheck,
    title: "Church Leaders",
    subtitle: "Guidance From Trusted Voices",
    description: "Connect with pastors and ministry leaders who understand the unique challenges of Greek life.",
    tags: ["Expert Insights", "Ministry Resources", "Leadership Tips"],
    link: "/church-leaders",
    bgColor: "bg-purple-500/20",
    hoverBgColor: "bg-purple-500/30",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/70",
    topBorderColor: "bg-purple-500"
  }
];

const PROOF_FRAMEWORK = [
  { 
    letter: "P", 
    title: "Pledge Process", 
    description: "How does the intake and pledging process align with biblical values?", 
    color: "bg-blue-500",
    criticism: "Hazing Concerns",
    criticismExample: '"Greeks brutalize new members through hazing rituals that are dangerous and sinful."',
    response: "Biblical mentorship involves testing character, not abusing it. We reject hazing while embracing accountability and growth through godly community.",
    scripture: "Hebrews 10:24-25",
    scriptureText: "And let us consider how to stir up one another to love and good works, not neglecting to meet together...",
    supportingScripture: "Romans 14:5",
    supportingText: "Each one should be fully convinced in his own mind."
  },
  { 
    letter: "R", 
    title: "Rituals", 
    description: "What rituals are involved and do they honor God?", 
    color: "bg-purple-500",
    criticism: "Demonic Portals",
    criticismExample: '"Greek rituals open demonic portals and invite evil spirits through occult practices."',
    response: "Not all ceremonies are worship. Many rituals focus on history, values, and commitment—like weddings or graduations. We discern based on content, not assumption.",
    scripture: "1 Thessalonians 5:21",
    scriptureText: "Test everything; hold fast what is good.",
    supportingScripture: "Romans 14:14",
    supportingText: "Nothing is unclean in itself, but it is unclean for anyone who thinks it unclean."
  },
  { 
    letter: "O", 
    title: "Oaths", 
    description: "What oaths and vows are required of members?", 
    color: "bg-orange-500",
    criticism: "Greek Deity Allegiance",
    criticismExample: '"Using Greek letters means you\'re worshiping Zeus, Apollo, and other pagan gods."',
    response: "Using Greek letters doesn't mean worshiping Greek gods. Paul used Greek language and culture to spread the Gospel without endorsing paganism.",
    scripture: "Acts 17:22-28",
    scriptureText: "For as I passed along and observed the objects of your worship, I found also an altar with this inscription: 'To the unknown god.'...",
    supportingScripture: "1 Corinthians 8:7",
    supportingText: "Not all possess this knowledge. Some, through former association with idols, eat food as really offered to an idol, and their conscience, being weak, is defiled."
  },
  { 
    letter: "O", 
    title: "Obscurity", 
    description: "What is kept secret and does it conflict with walking in the light?", 
    color: "bg-green-500",
    criticism: "Secret Societies",
    criticismExample: '"Greeks are secret societies that hide evil practices from the public. If it\'s good, why hide it?"',
    response: "Privacy is not secrecy. Jesus had inner-circle moments with Peter, James, and John. Private ceremonies can simply mean membership-only experiences.",
    scripture: "Mark 5:37",
    scriptureText: "And he allowed no one to follow him except Peter and James and John the brother of James.",
    supportingScripture: "Romans 14:23",
    supportingText: "Whatever does not proceed from faith is sin."
  },
  { 
    letter: "F", 
    title: "Founders", 
    description: "What is the foundation and history of the organization?", 
    color: "bg-red-500",
    criticism: "Masonic Connections",
    criticismExample: '"Greek organizations were founded by Freemasons, so they\'re all connected to the Illuminati."',
    response: "An organization's origin doesn't determine its current purpose. Many institutions with complex histories serve godly purposes today. We are new creations in Christ.",
    scripture: "2 Corinthians 5:17",
    scriptureText: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.",
    supportingScripture: "Romans 14:5",
    supportingText: "One person esteems one day as better than another, while another esteems all days alike. Each one should be fully convinced in his own mind."
  }
];

const D9_ORGS = ["ΑΦΑ", "ΔΣΘ", "ΚΑΨ", "ΑΚΑ"];

const testimonials = [
  {
    name: "Pastor Demetrius Logwood",
    org: "Charity Missionary Baptist Church",
    initials: "DL",
    text: "This rigorous research bridges the gap between Black Greek Letter Organizations and the church community. Sacred Greeks reminds us that spreading the gospel takes on many forms.",
  },
  {
    name: "Alexis Allen",
    org: "Zeta Phi Beta Sorority, Inc.",
    initials: "AA",
    text: "Ignorance has had the mic too long, and Sacred Greeks finally cuts it off. You get biblical guidance, clarity, and confidence to walk boldly in your calling without apology.",
  },
];

const authSchema = z.object({
  email: z.string().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password must be less than 100 characters'),
  fullName: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').optional()
});

const passwordResetSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password must be less than 100 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password must be less than 100 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [isResetMode, setIsResetMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [expandedProof, setExpandedProof] = useState<number | null>(null);
  const [allProofExpanded, setAllProofExpanded] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupPassword, setSignupPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');
  const [pendingVerification, setPendingVerification] = useState<string | null>(null);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState<'signin' | 'signup' | null>(null);
  const { signUp, signIn } = useAuth();
  const { isDemoMode } = useDemoMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkPassword, isChecking: isCheckingBreach, breachCount, reset: resetBreachCheck } = usePasswordBreachCheck();
  const { checkEmail, isDisposable, checkedDomain, reset: resetDisposableCheck } = useDisposableEmailCheck();

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'reset') {
      setIsResetMode(true);
    }
    
    const savedEmailValue = localStorage.getItem('rememberedEmail');
    if (savedEmailValue) {
      setSavedEmail(savedEmailValue);
      setRememberMe(true);
    }
  }, [searchParams]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const redirectUrl = searchParams.get('redirect') || '/dashboard';

    try {
      const validated = authSchema.parse({ email, password, fullName });

      const { isDisposable: isDisposableEmail } = checkEmail(validated.email);
      if (isDisposableEmail) {
        toast({
          title: 'Disposable email not allowed',
          description: 'Please use a permanent email address.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      const { isBreached, count } = await checkPassword(validated.password);
      
      if (isBreached) {
        toast({
          title: 'Password has been exposed',
          description: `This password appeared in ${count.toLocaleString()} data breaches. Please choose a different one.`,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      const { error } = await signUp(validated.email, validated.password, validated.fullName);

      if (error) {
        if (error.message?.includes('already registered')) {
          toast({
            title: 'Account exists',
            description: 'This email is already registered. Please sign in instead.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error signing up',
            description: error.message,
            variant: 'destructive',
          });
        }
      } else {
        setPendingVerification(validated.email);
        toast({
          title: 'Check your email!',
          description: 'We sent you a verification link.',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    }

    setIsLoading(false);
  };

  const handleResendVerification = async () => {
    if (!pendingVerification) return;
    
    setResendingEmail(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: pendingVerification,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Email sent!',
          description: 'We sent a new verification link.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resend verification email',
        variant: 'destructive',
      });
    } finally {
      setResendingEmail(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const redirectUrl = searchParams.get('redirect') || '/dashboard';

    try {
      const validated = authSchema.parse({ email, password });

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', validated.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      const { error } = await signIn(validated.email, validated.password);

      if (error) {
        toast({
          title: 'Error signing in',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You have been signed in successfully.',
        });
        navigate(redirectUrl);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    }

    setIsLoading(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    try {
      const validated = passwordResetSchema.parse({ password, confirmPassword });

      const { isBreached, count } = await checkPassword(validated.password);
      
      if (isBreached) {
        toast({
          title: 'Password has been exposed',
          description: `This password appeared in ${count.toLocaleString()} data breaches. Please choose a different one.`,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: validated.password });

      if (error) {
        toast({
          title: 'Error updating password',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Password updated!',
          description: 'Your password has been updated successfully.',
        });
        setIsResetMode(false);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    }

    setIsLoading(false);
  };

  // Password Reset Mode
  if (isResetMode) {
    return (
      <div className={cn("min-h-screen bg-background flex flex-col", isDemoMode && "pt-11")}>
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Sacred Greeks" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-bold text-xl">Sacred Greeks</span>
            </Link>
            <div className="flex items-center gap-4">
              <DemoModeControl />
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <img src={logo} alt="Sacred Greeks" className="w-16 h-16 mx-auto mb-3 rounded-full" />
              <h1 className="text-2xl font-bold">Reset Password</h1>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        minLength={8}
                        required
                        className="pr-10"
                        value={resetPassword}
                        onChange={(e) => {
                          setResetPassword(e.target.value);
                          resetBreachCheck();
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <PasswordStrengthIndicator password={resetPassword} />
                    {breachCount !== null && breachCount > 0 && (
                      <div className="flex items-start gap-2 p-2 bg-destructive/20 border border-destructive/30 rounded-md">
                        <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-destructive">
                          Password exposed in {breachCount.toLocaleString()} breaches
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        minLength={8}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || isCheckingBreach}
                  >
                    {isCheckingBreach ? 'Checking...' : isLoading ? 'Updating...' : 'Update Password'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-[hsl(225,50%,8%)]", isDemoMode && "pt-11")}>
      {/* Navigation */}
      <header className="border-b border-slate-700/50 bg-[hsl(225,50%,8%)] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Sacred Greeks" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-bold text-xl text-white">Sacred Greeks</span>
          </Link>
          <div className="flex items-center gap-4">
            <DemoModeControl />
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800" onClick={() => setShowAuthForm('signin')}>
              Sign In
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
              <Moon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Centered Card */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-lg mx-auto">
          {/* Main Hero Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            {/* Blue-cyan gradient top border accent */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
            
            <div className="p-8 text-center space-y-6">
              {/* Logo Badge */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
                  <img src={logo} alt="Sacred" className="w-12 h-12 rounded-full object-cover" />
                </div>
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Faith + Greek Life, <span className="gradient-shimmer">United</span>
                </h1>
                <p className="text-slate-400 text-base">
                  Daily devotionals, biblical guidance, and practical tools<br />
                  to help you <span className="gradient-shimmer font-medium">thrive</span> in faith and fraternity
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Faith-First</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Heart className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Community</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">Daily Growth</span>
                </div>
              </div>

              {/* Action Buttons as Cards */}
              <div className="space-y-3 pt-4">
                {/* Try Demo First */}
                <Link to="/demo" className="block">
                  <div className="flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                      <Play className="w-5 h-5 text-slate-300" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-white">Try Demo First</p>
                      <p className="text-sm text-slate-400">Explore all features with sample data</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  </div>
                </Link>

                {/* Create Your Account - Highlighted */}
                <button onClick={() => setShowAuthForm('signup')} className="w-full">
                  <div className="flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700 border border-teal-500/50 rounded-lg transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-white">Create Your Account</p>
                      <p className="text-sm text-slate-400">Start your personalized faith journey today</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-teal-400 transition-colors" />
                  </div>
                </button>

                {/* Sign In */}
                <button onClick={() => setShowAuthForm('signin')} className="w-full">
                  <div className="flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-300" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-white">Sign In</p>
                      <p className="text-sm text-slate-400">Already have an account? Continue here</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Forms Section */}
      {showAuthForm && (
        <section className="py-12 bg-[hsl(225,50%,8%)]" id="auth-form">
          <div className="container mx-auto px-4">
            {pendingVerification ? (
              <div className="max-w-md mx-auto">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
                  <div className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
                      <RefreshCw className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Check Your Email</h3>
                      <p className="text-slate-400 text-sm mt-2">
                        We sent a verification link to <span className="text-blue-400">{pendingVerification}</span>
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleResendVerification}
                      disabled={resendingEmail}
                      className="w-full border-slate-600 text-white hover:bg-slate-700"
                    >
                      {resendingEmail ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Resend Verification Email'
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-slate-400 hover:text-white hover:bg-slate-700"
                      onClick={() => setPendingVerification(null)}
                    >
                      Use a different email
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                  {/* Blue-cyan gradient top border */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
                  
                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center mb-4">
                        <img src={logo} alt="Sacred Greeks" className="w-10 h-10 rounded-full object-cover" />
                      </div>
                      <h2 className="text-xl font-bold text-white">
                        {showAuthForm === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        {showAuthForm === 'signup' 
                          ? 'Start your personalized faith journey today' 
                          : 'Sign in to continue your journey'}
                      </p>
                    </div>

                    {/* Tabs */}
                    <Tabs value={showAuthForm} onValueChange={(v) => setShowAuthForm(v as 'signin' | 'signup')}>
                      <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-700/50 border border-slate-600 p-1 rounded-lg">
                        <TabsTrigger 
                          value="signin" 
                          className="text-slate-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-all"
                        >
                          Sign In
                        </TabsTrigger>
                        <TabsTrigger 
                          value="signup" 
                          className="text-slate-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md transition-all"
                        >
                          Sign Up
                        </TabsTrigger>
                      </TabsList>
                      
                      {/* Sign In Tab */}
                      <TabsContent value="signin" className="mt-0">
                        <form onSubmit={handleSignIn} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="signin-email" className="text-slate-300">Email</Label>
                            <Input
                              id="signin-email"
                              name="email"
                              type="email"
                              placeholder="you@example.com"
                              defaultValue={savedEmail}
                              autoComplete="email"
                              required
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signin-password" className="text-slate-300">Password</Label>
                            <div className="relative">
                              <Input
                                id="signin-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                                className="pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                className="border-slate-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                              />
                              <Label htmlFor="remember" className="text-sm cursor-pointer text-slate-400">
                                Remember me
                              </Label>
                            </div>
                            <Link 
                              to="/forgot-password" 
                              className="text-sm text-cyan-400 hover:underline"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </form>
                      </TabsContent>
                      
                      {/* Sign Up Tab */}
                      <TabsContent value="signup" className="mt-0">
                        <form onSubmit={handleSignUp} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="signup-name" className="text-slate-300">Full Name</Label>
                            <Input
                              id="signup-name"
                              name="fullName"
                              type="text"
                              placeholder="John Smith"
                              autoComplete="name"
                              required
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-email" className="text-slate-300">Email</Label>
                            <Input
                              id="signup-email"
                              name="email"
                              type="email"
                              placeholder="you@example.com"
                              autoComplete="email"
                              required
                              value={signupEmail}
                              onChange={(e) => {
                                setSignupEmail(e.target.value);
                                resetDisposableCheck();
                              }}
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                            />
                            {isDisposable && checkedDomain && (
                              <div className="flex items-start gap-2 p-2 bg-red-500/20 border border-red-500/30 rounded-md">
                                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-red-400">
                                  Disposable emails are not allowed
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-password" className="text-slate-300">Password</Label>
                            <div className="relative">
                              <Input
                                id="signup-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                value={signupPassword}
                                onChange={(e) => {
                                  setSignupPassword(e.target.value);
                                  resetBreachCheck();
                                }}
                                className="pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                            <PasswordStrengthIndicator password={signupPassword} />
                            {breachCount !== null && breachCount > 0 && (
                              <div className="flex items-start gap-2 p-2 bg-red-500/20 border border-red-500/30 rounded-md">
                                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-red-400">
                                  Password exposed in {breachCount.toLocaleString()} breaches
                                </p>
                              </div>
                            )}
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                            disabled={isLoading || isCheckingBreach}
                          >
                            {isCheckingBreach ? 'Checking...' : isLoading ? 'Creating account...' : 'Create Account'}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="mt-6 text-center">
                      <Button variant="link" className="text-slate-400 hover:text-white" onClick={() => setShowAuthForm(null)}>
                        ← Back to options
                      </Button>
                    </div>
                    
                    <div className="mt-4 text-center text-sm text-slate-500">
                      <p>
                        By continuing, you agree to our{' '}
                        <Link to="/terms" className="text-cyan-400 hover:underline">Terms</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Tools Section */}
      <section className="py-16 md:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {/* Featured Tools Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Featured Tools</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Everything You Need to <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Thrive</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Powerful resources built by Greeks, for Greeks — grounded in faith and designed for your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FEATURED_TOOLS.map((tool, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 bg-slate-800/80 border-2 ${tool.borderColor} hover:bg-slate-800 relative overflow-hidden`}>
                {/* Colored top border - bolder */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${tool.topBorderColor}`} />
                <CardHeader className="pt-6">
                  <div className={`w-14 h-14 rounded-xl ${tool.bgColor} flex items-center justify-center mb-4 group-hover:${tool.hoverBgColor} transition-colors shadow-lg ring-1 ring-white/10`}>
                    <tool.icon className={`w-7 h-7 ${tool.iconColor} drop-shadow-[0_0_8px_currentColor]`} strokeWidth={2.5} />
                  </div>
                  <CardTitle className="text-lg text-white">{tool.title}</CardTitle>
                  <CardDescription className={`font-medium ${tool.iconColor}`}>{tool.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-400">{tool.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-slate-600 text-white hover:bg-slate-700" asChild>
                    <Link to={tool.link}>Explore Demo</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Expand More Tools Button */}
          <div className="text-center mt-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowMoreTools(!showMoreTools)}
              className="gap-2 text-white/60 hover:text-white hover:bg-white/10"
            >
              {showMoreTools ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showMoreTools ? 'Show Less' : 'Explore More Tools'}
            </Button>
          </div>

          {/* Secondary Tools - shown when expanded */}
          {showMoreTools && (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
              {SECONDARY_TOOLS.map((tool, index) => (
                <Card key={index} className={`group hover:shadow-xl transition-all duration-300 bg-slate-800/80 border-2 ${tool.borderColor} hover:bg-slate-800 relative overflow-hidden`}>
                  {/* Colored top border - bolder */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${tool.topBorderColor}`} />
                  <CardHeader className="pt-6">
                    <div className={`w-14 h-14 rounded-xl ${tool.bgColor} flex items-center justify-center mb-4 group-hover:${tool.hoverBgColor} transition-colors shadow-lg ring-1 ring-white/10`}>
                      <tool.icon className={`w-7 h-7 ${tool.iconColor} drop-shadow-[0_0_8px_currentColor]`} strokeWidth={2.5} />
                    </div>
                    <CardTitle className="text-lg text-white">{tool.title}</CardTitle>
                    <CardDescription className={`font-medium ${tool.iconColor}`}>{tool.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-400">{tool.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full border-slate-600 text-white hover:bg-slate-700" asChild>
                      <Link to={tool.link}>Explore Demo</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* D9 Orgs Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
            {D9_ORGS.map((org, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold text-sm border border-amber-500/30">
                {org}
              </span>
            ))}
            <span className="text-sm text-white/60">500+ Greeks growing in faith</span>
          </div>
        </div>
      </section>

      {/* P.R.O.O.F. Framework Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <p className="text-purple-400 font-medium mb-2">Our Framework</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">The P.R.O.O.F. Framework</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A biblical approach to evaluating Greek life membership while maintaining your Christian faith and values.
            </p>
          </div>

          {/* Expand All Button */}
          <div className="max-w-3xl mx-auto mb-4 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAllProofExpanded(!allProofExpanded)}
              className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
            >
              {allProofExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Expand All
                </>
              )}
            </Button>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {PROOF_FRAMEWORK.map((item, index) => {
              const isExpanded = allProofExpanded || expandedProof === index;
              return (
                <div 
                  key={index}
                  className={cn(
                    "rounded-xl bg-white/5 border border-white/10 transition-all duration-300 overflow-hidden",
                    isExpanded ? "bg-white/10 border-white/20" : "hover:bg-white/10"
                  )}
                >
                  <button
                    onClick={() => {
                      if (allProofExpanded) {
                        setAllProofExpanded(false);
                        setExpandedProof(index);
                      } else {
                        setExpandedProof(expandedProof === index ? null : index);
                      }
                    }}
                    className="w-full flex items-center gap-4 p-4 text-left"
                  >
                    <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <span className="text-xl font-bold text-white">{item.letter}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                          Criticism: {item.criticism}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                    <ChevronDown className={cn(
                      "w-5 h-5 text-white/60 transition-transform duration-300 flex-shrink-0",
                      isExpanded && "rotate-180"
                    )} />
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0 border-t border-white/10 mt-0 animate-fade-in">
                      <div className="pl-16 space-y-4 pt-4">
                        {/* Criticism Example */}
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-red-300 font-medium text-sm mb-1">Common Criticism:</p>
                              <p className="text-white/80 italic text-sm">{item.criticismExample}</p>
                            </div>
                          </div>
                        </div>

                        {/* Biblical Response */}
                        <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                          <p className="text-white/90 font-medium mb-3">
                            <span className="text-cyan-400">Biblical Response:</span> {item.response}
                          </p>
                          
                          {/* Primary Scripture Reference */}
                          <div className="flex items-start gap-3 p-3 rounded-md bg-white/5 mb-3">
                            <BookOpen className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-amber-400 font-semibold text-sm">{item.scripture}</p>
                              <p className="text-white/70 text-sm italic mt-1">"{item.scriptureText}"</p>
                            </div>
                          </div>

                          {/* Supporting Scripture - Romans 14 / 1 Cor 8 */}
                          <div className="p-3 rounded-md bg-purple-500/10 border border-purple-500/20">
                            <div className="flex items-start gap-3">
                              <Heart className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-purple-300 text-xs font-medium mb-1">Conscience Principle</p>
                                <p className="text-purple-400 font-semibold text-sm">{item.supportingScripture}</p>
                                <p className="text-white/70 text-sm italic mt-1">"{item.supportingText}"</p>
                              </div>
                            </div>
                            <p className="text-white/50 text-xs mt-3 pl-8 border-t border-purple-500/20 pt-2">
                              💡 <span className="text-purple-300/80">Believers may hold different convictions on secondary matters while remaining faithful.</span> What defiles one person's conscience may be permissible for another—but both must act from faith.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" asChild>
              <Link to="/proof">Learn More About P.R.O.O.F.</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Others Are Saying…</h2>
            <p className="text-white/60">Real people finding biblical clarity and peace</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* First Testimonial */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-white/5 border-white/10 hover:border-amber-500/30 hover:bg-white/10">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-amber-500/30 mb-4" />
                <p className="text-sm mb-6 leading-relaxed italic text-white/80">"{testimonials[0].text}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-amber-500/20 text-amber-400 font-semibold">
                      {testimonials[0].initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-white">{testimonials[0].name}</p>
                    <p className="text-xs text-white/60">{testimonials[0].org}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Testimonial */}
            <Card className="overflow-hidden bg-white/5 border-amber-500/30">
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/EoE-zwi0Mgw?rel=0"
                    title="Chris Reed Testimonial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 bg-white/5">
                  <p className="font-semibold text-white">Chris Reed</p>
                  <p className="text-sm text-white/60">Video Testimonial</p>
                </div>
              </CardContent>
            </Card>

            {/* Second Testimonial */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-white/5 border-white/10 hover:border-amber-500/30 hover:bg-white/10">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-amber-500/30 mb-4" />
                <p className="text-sm mb-6 leading-relaxed italic text-white/80">"{testimonials[1].text}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-amber-500/20 text-amber-400 font-semibold">
                      {testimonials[1].initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-white">{testimonials[1].name}</p>
                    <p className="text-xs text-white/60">{testimonials[1].org}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Start Your Journey?</h2>
          <p className="mb-6 text-white/90">Join 500+ Greeks growing in faith and community</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-emerald-600 hover:bg-white/90"
              onClick={() => {
                setShowAuthForm('signup');
                document.getElementById('auth-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Create Free Account
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link to="/demo">Try Demo First</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
