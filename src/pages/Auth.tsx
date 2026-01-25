import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoModeControl } from '@/components/GlobalDemoIndicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Home, Eye, EyeOff, RefreshCw, AlertTriangle, BookOpen, Heart, Shield, Search, Quote, Star, Users, ChevronRight, Sparkles, Play } from 'lucide-react';
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
    icon: Search,
    title: "MythBusters",
    description: "Scripture-based answers to every objection",
    stats: "50+ Myths"
  },
  {
    icon: BookOpen,
    title: "Symbols & Rituals",
    description: "Biblical & historical context for traditions",
    stats: "100+ Symbols"
  },
  {
    icon: Shield,
    title: "Anti-Hazing",
    description: "Prevention tools & memorial wall",
    stats: "Prevention Tools"
  },
  {
    icon: Heart,
    title: "Prayer Journal",
    description: "Track prayers & celebrate answered ones",
    stats: "Daily Growth"
  }
];

const PROOF_LETTERS = [
  { letter: "P", word: "Pledge", description: "How does the intake process align with biblical values?" },
  { letter: "R", word: "Rituals", description: "What rituals are involved and do they honor God?" },
  { letter: "O", word: "Oaths", description: "What oaths and vows are required of members?" },
  { letter: "O", word: "Obscurity", description: "What is kept secret and does it conflict with walking in light?" },
  { letter: "F", word: "Founders", description: "What is the foundation and history of the organization?" }
];

const D9_ORGS = ["ΑΦΑ", "ΔΣΘ", "ΚΑΨ", "ΑΚΑ", "ΩΨΦ", "ΖΦΒ", "ΦΒΣ", "ΣΓΡ", "ΙΦΘ"];

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupPassword, setSignupPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');
  const [pendingVerification, setPendingVerification] = useState<string | null>(null);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
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
      <div className={cn("min-h-screen bg-gradient-to-br from-[hsl(225,60%,18%)] via-[hsl(225,50%,12%)] to-[hsl(220,60%,8%)] flex flex-col", isDemoMode && "pt-11")}>
        <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <Home className="w-4 h-4" />
                <span className="text-sm">Home</span>
              </Link>
              <DemoModeControl />
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <img src={logo} alt="Sacred Greeks" className="w-16 h-16 mx-auto mb-3 rounded-full" />
              <h1 className="text-2xl font-bold text-white">Reset Password</h1>
            </div>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="pt-6">
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        minLength={8}
                        required
                        className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        value={resetPassword}
                        onChange={(e) => {
                          setResetPassword(e.target.value);
                          resetBreachCheck();
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
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
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        minLength={8}
                        required
                        className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-sacred hover:bg-sacred/90"
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
    <div className={cn("min-h-screen bg-gradient-to-br from-[hsl(225,60%,18%)] via-[hsl(225,50%,12%)] to-[hsl(220,60%,8%)]", isDemoMode && "pt-11")}>
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Home className="w-4 h-4" />
              <span className="text-sm">Home</span>
            </Link>
            <DemoModeControl />
          </div>
        </div>
      </header>

      <div className="min-h-[calc(100vh-57px)] grid lg:grid-cols-2">
        {/* Left Panel - Value Proposition */}
        <div className="hidden lg:flex flex-col justify-center p-8 xl:p-12">
          <div className="max-w-xl mx-auto space-y-8">
            {/* Hero */}
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-sacred/30 rounded-full blur-xl" />
                  <img 
                    src={logo} 
                    alt="Sacred Greeks" 
                    className="relative w-16 h-16 rounded-full ring-2 ring-white/20"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Faith + Greek Life, United</h1>
                  <p className="text-white/60">Daily devotionals, biblical guidance, and practical tools</p>
                </div>
              </div>

              {/* Value Props */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium">
                  Faith-First
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                  Community
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium">
                  Daily Growth
                </span>
              </div>
            </div>

            {/* Featured Tools */}
            <div className="space-y-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Featured Tools</h3>
              <div className="grid grid-cols-2 gap-3">
                {FEATURED_TOOLS.map((tool, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all group"
                  >
                    <tool.icon className="w-5 h-5 text-sacred mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-white font-medium text-sm">{tool.title}</h4>
                    <p className="text-white/50 text-xs mt-1">{tool.description}</p>
                    <span className="inline-block mt-2 text-xs text-sacred/80">{tool.stats}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* D9 Organizations */}
            <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex -space-x-1">
                {D9_ORGS.slice(0, 4).map((org, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white/80 font-medium"
                  >
                    {org.slice(0, 2)}
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-sm">
                <span className="text-white font-semibold">500+</span> Greeks growing in faith
              </p>
            </div>

            {/* Testimonial */}
            <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Quote className="w-8 h-8 text-sacred/40 mb-3" />
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                "This rigorous research bridges the gap between Black Greek Letter Organizations and the church community. Sacred Greeks reminds us that spreading the gospel takes on many forms."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sacred/20 flex items-center justify-center text-sacred font-bold text-sm">
                  DL
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Pastor Demetrius Logwood</p>
                  <p className="text-white/50 text-xs">Charity Missionary Baptist Church</p>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex flex-col justify-center p-4 sm:p-8 lg:bg-white/5 lg:backdrop-blur-sm">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Hero */}
            <div className="lg:hidden text-center mb-6 animate-fade-in">
              <div className="relative w-16 h-16 mx-auto mb-3">
                <div className="absolute inset-0 bg-sacred/30 rounded-full blur-xl" />
                <img 
                  src={logo} 
                  alt="Sacred Greeks" 
                  className="relative w-full h-full rounded-full ring-2 ring-white/20"
                />
              </div>
              <h1 className="text-xl font-bold text-white">Faith + Greek Life, United</h1>
              <p className="text-white/60 text-sm">Daily devotionals & biblical guidance</p>
              
              {/* Mobile Value Props */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full text-xs">Faith-First</span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs">Community</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-xs">Daily Growth</span>
              </div>
            </div>

            {/* Pending Verification State */}
            {pendingVerification ? (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-fade-in">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-sacred/20 rounded-full flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-sacred" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Check Your Email</h3>
                    <p className="text-white/60 text-sm mt-2">
                      We sent a verification link to <span className="text-sacred">{pendingVerification}</span>
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleResendVerification}
                    disabled={resendingEmail}
                    className="w-full border-white/20 text-white hover:bg-white/10"
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
                    onClick={() => setPendingVerification(null)}
                    className="w-full text-white/60 hover:text-white hover:bg-white/10"
                  >
                    Use a different email
                  </Button>
                </CardContent>
              </Card>
            ) : (
              /* Auth Tabs */
              <Tabs defaultValue="signin" className="w-full animate-fade-in">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-white/10">
                  <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Sign In Tab */}
                <TabsContent value="signin" className="mt-0">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="pt-6">
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signin-email" className="text-white">Email</Label>
                          <Input
                            id="signin-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            defaultValue={savedEmail}
                            autoComplete="email"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signin-password" className="text-white">Password</Label>
                          <div className="relative">
                            <Input
                              id="signin-password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              autoComplete="current-password"
                              required
                              className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
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
                              className="border-white/30 data-[state=checked]:bg-sacred"
                            />
                            <Label htmlFor="remember" className="text-sm text-white/70 cursor-pointer">
                              Remember me
                            </Label>
                          </div>
                          <Link 
                            to="/forgot-password" 
                            className="text-sm text-sacred hover:text-sacred/80 transition-colors"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-sacred hover:bg-sacred/90"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Signing in...' : 'Sign In'}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Sign Up Tab */}
                <TabsContent value="signup" className="mt-0">
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="pt-6">
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-name" className="text-white">Full Name</Label>
                          <Input
                            id="signup-name"
                            name="fullName"
                            type="text"
                            placeholder="John Smith"
                            autoComplete="name"
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="text-white">Email</Label>
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
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                          {isDisposable && checkedDomain && (
                            <div className="flex items-start gap-2 p-2 bg-destructive/20 border border-destructive/30 rounded-md">
                              <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-destructive">
                                Disposable emails are not allowed
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="text-white">Password</Label>
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
                              className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          <PasswordStrengthIndicator password={signupPassword} />
                          {breachCount !== null && breachCount > 0 && (
                            <div className="flex items-start gap-2 p-2 bg-destructive/20 border border-destructive/30 rounded-md">
                              <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-destructive">
                                Password exposed in {breachCount.toLocaleString()} breaches
                              </p>
                            </div>
                          )}
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-sacred hover:bg-sacred/90"
                          disabled={isLoading || isCheckingBreach}
                        >
                          {isCheckingBreach ? 'Checking...' : isLoading ? 'Creating account...' : 'Create Account'}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-white/50">
              <p>
                By continuing, you agree to our{' '}
                <Link to="/terms" className="text-sacred hover:underline">Terms</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-sacred hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
