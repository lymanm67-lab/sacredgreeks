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
import { Home, Eye, EyeOff, RefreshCw, AlertTriangle, BookOpen, Heart, Shield, Search, Quote, Star, Users, ChevronRight, ChevronDown, ChevronUp, Sparkles, Play, Compass } from 'lucide-react';
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
    subtitle: "Debunk Greek Life Misconceptions",
    description: "Get biblical answers to common objections about Greek life and faith compatibility.",
    tags: ["50+ Myths Debunked", "Scripture-Based", "Shareable Cards"],
    link: "/mythbusters"
  },
  {
    icon: Compass,
    title: "Symbols & Rituals Guide",
    subtitle: "Understand Hidden Meanings",
    description: "Explore the biblical and historical context behind Greek letters, rituals, and traditions.",
    tags: ["100+ Symbols", "Historical Context", "Faith Connections"],
    link: "/symbols"
  },
  {
    icon: Shield,
    title: "Anti-Hazing Resources",
    subtitle: "Protect & Educate Your Chapter",
    description: "Access vital hazing prevention tools, success stories, and memorial resources to keep your organization safe.",
    tags: ["Prevention Tools", "Success Stories", "Memorial Wall"],
    link: "/anti-hazing"
  }
];

const PROOF_FRAMEWORK = [
  { letter: "P", title: "Pledge Process", description: "How does the intake and pledging process align with biblical values?" },
  { letter: "R", title: "Rituals", description: "What rituals are involved and do they honor God?" },
  { letter: "O", title: "Oaths", description: "What oaths and vows are required of members?" },
  { letter: "O", title: "Obscurity", description: "What is kept secret and does it conflict with walking in the light?" },
  { letter: "F", title: "Founders", description: "What is the foundation and history of the organization?" }
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
    <div className={cn("min-h-screen bg-background", isDemoMode && "pt-11")}>
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Faith + Greek Life, <span className="text-primary">United</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Daily devotionals, biblical guidance, and practical tools to help you thrive in faith and fraternity
            </p>
            
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Faith-First</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Community</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Daily Growth</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <Link to="/demo">
                  <Play className="w-4 h-4" />
                  Try Demo First
                </Link>
              </Button>
              <Button size="lg" onClick={() => setShowAuthForm('signup')}>
                Create Your Account
              </Button>
              <Button variant="ghost" size="lg" onClick={() => setShowAuthForm('signin')}>
                Sign In
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Explore all features with sample data • Start your personalized faith journey today
            </p>
          </div>
        </div>
      </section>

      {/* Auth Forms Section */}
      {showAuthForm && (
        <section className="py-12 bg-muted/30" id="auth-form">
          <div className="container mx-auto px-4">
            {pendingVerification ? (
              <Card className="max-w-md mx-auto">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Check Your Email</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      We sent a verification link to <span className="text-primary">{pendingVerification}</span>
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleResendVerification}
                    disabled={resendingEmail}
                    className="w-full"
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
                    className="w-full"
                  >
                    Use a different email
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <img src={logo} alt="Sacred Greeks" className="w-16 h-16 mx-auto rounded-full object-cover mb-4" />
                  <CardTitle>{showAuthForm === 'signup' ? 'Create Your Account' : 'Welcome Back'}</CardTitle>
                  <CardDescription>
                    {showAuthForm === 'signup' 
                      ? 'Start your personalized faith journey today' 
                      : 'Sign in to continue your journey'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={showAuthForm} onValueChange={(v) => setShowAuthForm(v as 'signin' | 'signup')}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="signin">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    
                    {/* Sign In Tab */}
                    <TabsContent value="signin" className="mt-0">
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signin-email">Email</Label>
                          <Input
                            id="signin-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            defaultValue={savedEmail}
                            autoComplete="email"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signin-password">Password</Label>
                          <div className="relative">
                            <Input
                              id="signin-password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              autoComplete="current-password"
                              required
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                            />
                            <Label htmlFor="remember" className="text-sm cursor-pointer">
                              Remember me
                            </Label>
                          </div>
                          <Link 
                            to="/forgot-password" 
                            className="text-sm text-primary hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
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
                          <Label htmlFor="signup-name">Full Name</Label>
                          <Input
                            id="signup-name"
                            name="fullName"
                            type="text"
                            placeholder="John Smith"
                            autoComplete="name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
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
                          <Label htmlFor="signup-password">Password</Label>
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
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                          className="w-full"
                          disabled={isLoading || isCheckingBreach}
                        >
                          {isCheckingBreach ? 'Checking...' : isLoading ? 'Creating account...' : 'Create Account'}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6 text-center">
                    <Button variant="link" onClick={() => setShowAuthForm(null)}>
                      ← Back to options
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <p>
                      By continuing, you agree to our{' '}
                      <Link to="/terms" className="text-primary hover:underline">Terms</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Featured Tools Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-2">Featured Tools</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Thrive</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful resources built by Greeks, for Greeks — grounded in faith and designed for your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FEATURED_TOOLS.map((tool, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:border-primary/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <tool.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription className="font-medium text-foreground/80">{tool.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
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
              className="gap-2"
            >
              {showMoreTools ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showMoreTools ? 'Show Less' : 'Explore More Tools'}
            </Button>
          </div>

          {/* D9 Orgs Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
            {D9_ORGS.map((org, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                {org}
              </span>
            ))}
            <span className="text-sm text-muted-foreground">500+ Greeks growing in faith</span>
          </div>
        </div>
      </section>

      {/* P.R.O.O.F. Framework Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-2">Our Framework</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The P.R.O.O.F. Framework</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A biblical approach to evaluating Greek life membership while maintaining your Christian faith and values.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {PROOF_FRAMEWORK.map((item, index) => (
              <div 
                key={index}
                className="flex gap-4 p-4 rounded-xl bg-card border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary-foreground">{item.letter}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/proof">Learn More About P.R.O.O.F.</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Others Are Saying…</h2>
            <p className="text-muted-foreground">Real people finding biblical clarity and peace</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* First Testimonial */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:border-primary/30">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-sm mb-6 leading-relaxed italic">"{testimonials[0].text}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {testimonials[0].initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonials[0].name}</p>
                    <p className="text-xs text-muted-foreground">{testimonials[0].org}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Testimonial */}
            <Card className="overflow-hidden border-primary/20">
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
                <div className="p-4 bg-card">
                  <p className="font-semibold">Chris Reed</p>
                  <p className="text-sm text-muted-foreground">Video Testimonial</p>
                </div>
              </CardContent>
            </Card>

            {/* Second Testimonial */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:border-primary/30">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-sm mb-6 leading-relaxed italic">"{testimonials[1].text}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {testimonials[1].initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonials[1].name}</p>
                    <p className="text-xs text-muted-foreground">{testimonials[1].org}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-6 opacity-90">Join 500+ Greeks growing in faith and community</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg"
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
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
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
