import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoModeControl } from '@/components/GlobalDemoIndicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Home, Eye, EyeOff, Mail, RefreshCw, AlertTriangle, Ban, Info, ExternalLink, BookOpen, Heart, Shield, Sparkles, CheckCircle2, MessageCircle, Users, Star, Zap } from 'lucide-react';
import logo from '@/assets/sacred-greeks-logo.png';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';
import { usePasswordBreachCheck } from '@/hooks/use-password-breach-check';
import { useDisposableEmailCheck } from '@/hooks/use-disposable-email-check';
import { cn } from '@/lib/utils';

const VALUE_PROPOSITIONS = [
  {
    icon: BookOpen,
    title: "Daily Devotionals",
    description: "Scripture-based guidance for Greeks navigating faith",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Biblical Responses",
    description: "Answers to common objections about Greek life",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Heart,
    title: "Prayer Journal",
    description: "Track your prayers and celebrate answered ones",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    icon: MessageCircle,
    title: "Community Support",
    description: "Connect with fellow believers in Greek life",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    icon: Sparkles,
    title: "Spiritual Growth",
    description: "Tools to deepen your faith journey",
    gradient: "from-amber-500 to-orange-500"
  }
];

const SOCIAL_PROOF = [
  { label: "Active Members", value: "500+", icon: Users },
  { label: "Daily Devotionals", value: "365", icon: BookOpen },
  { label: "Prayers Shared", value: "2K+", icon: Heart }
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

  if (isResetMode) {
    return (
      <div className={cn("min-h-screen bg-gradient-to-b from-background to-muted flex flex-col", isDemoMode && "pt-11")}>
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
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
              <img src={logo} alt="Sacred Greeks" className="w-16 h-16 mx-auto mb-3" />
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
                      <div className="flex items-start gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
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
    <div className={cn("min-h-screen bg-gradient-to-b from-background to-muted flex flex-col", isDemoMode && "pt-11")}>
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left side - Hero/Value Proposition (Desktop/Tablet) */}
        <div className="hidden md:flex md:w-1/2 lg:w-[55%] relative overflow-hidden">
          {/* Navy gradient background */}
          <div className="absolute inset-0 bg-[hsl(225,50%,12%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(225,60%,18%)] via-[hsl(225,50%,12%)] to-[hsl(220,60%,8%)]" />
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-[hsl(210,100%,50%)]/10 rounded-full blur-xl" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center p-8 lg:p-12 xl:p-16 text-white">
            <div className="animate-fade-in">
              {/* Logo with glow */}
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 mb-6">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl" />
                <img 
                  src={logo} 
                  alt="Sacred Greeks" 
                  className="relative w-full h-full rounded-full object-cover ring-4 ring-primary/40" 
                />
              </div>
              
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
                Where Faith Meets<br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Greek Excellence</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/70 mb-8 max-w-md">
                Join a community of Greeks who are unapologetically pursuing Christ while honoring their letters.
              </p>
            </div>

            {/* Features with glass-style icons */}
            <div className="space-y-4 mb-8">
              {VALUE_PROPOSITIONS.slice(0, 4).map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 animate-fade-in group"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10 group-hover:bg-white/15 transition-colors">
                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-white/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div 
              className="flex gap-6 lg:gap-8 pt-6 border-t border-white/10 animate-fade-in"
              style={{ animationDelay: '800ms' }}
            >
              {SOCIAL_PROOF.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <stat.icon className="w-4 h-4 text-primary" />
                    <span className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-xs lg:text-sm text-white/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="w-full md:w-1/2 lg:w-[45%] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-background">
          <div className="w-full max-w-sm animate-fade-in">
            {/* Mobile-only header */}
            <div className="text-center mb-6 md:hidden">
              <div className="relative w-16 h-16 mx-auto mb-3">
                <div className="absolute inset-0 bg-[hsl(225,60%,15%)]/80 rounded-full blur-lg" />
                <img 
                  src={logo} 
                  alt="Sacred Greeks" 
                  className="relative w-full h-full rounded-full object-cover ring-2 ring-[hsl(225,60%,25%)]" 
                />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Sacred Greeks
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Faith + Greek Life, United
              </p>
            </div>

            {/* Mobile-only condensed features */}
            <div className="flex flex-wrap justify-center gap-2 mb-6 md:hidden">
              {VALUE_PROPOSITIONS.slice(0, 4).map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[hsl(225,60%,15%)] text-white shadow-sm animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <item.icon className="w-3 h-3 text-primary" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>

            {/* Desktop form header */}
            <div className="hidden md:block mb-6">
              <h2 className="text-2xl font-bold text-foreground">Get Started</h2>
              <p className="text-muted-foreground mt-1">
                Create your account or sign in to continue
              </p>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/50">
                <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-0">
                <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
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
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember-me"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <Label htmlFor="remember-me" className="text-xs font-normal cursor-pointer">
                          Remember me
                        </Label>
                      </div>
                      <Link
                        to="/reset-password"
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  {pendingVerification ? (
                    <div className="space-y-4 text-center py-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sacred/10">
                        <Mail className="w-6 h-6 text-sacred" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Verification sent to:</p>
                        <p className="text-sacred font-semibold text-sm">{pendingVerification}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Check your inbox or spam folder.
                      </p>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleResendVerification}
                          disabled={resendingEmail}
                          className="w-full"
                        >
                          {resendingEmail ? (
                            <>
                              <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-3 w-3 mr-2" />
                              Resend email
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setPendingVerification(null)}
                          className="w-full text-muted-foreground"
                        >
                          Use different email
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input
                          id="signup-name"
                          name="fullName"
                          type="text"
                          placeholder="Your name"
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
                          required
                          value={signupEmail}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSignupEmail(value);
                            if (value.includes('@') && value.indexOf('@') < value.length - 1) {
                              checkEmail(value);
                            } else {
                              resetDisposableCheck();
                            }
                          }}
                          className={isDisposable === true ? 'border-destructive focus-visible:ring-destructive' : ''}
                        />
                        {isDisposable === true && (
                          <div className="flex items-start gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
                            <Ban className="h-3 w-3 text-destructive flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-destructive">
                              Disposable emails not allowed
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
                            minLength={8}
                            required
                            className="pr-10"
                            value={signupPassword}
                            onChange={(e) => {
                              setSignupPassword(e.target.value);
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
                        <PasswordStrengthIndicator password={signupPassword} />
                        {breachCount !== null && breachCount > 0 && (
                          <div className="flex items-start gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
                            <AlertTriangle className="h-3 w-3 text-destructive flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-destructive">
                              Password exposed in {breachCount.toLocaleString()} breaches
                            </p>
                          </div>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
                        disabled={isLoading || isCheckingBreach || isDisposable === true}
                      >
                        {isCheckingBreach ? 'Checking...' : isLoading ? 'Creating...' : 'Create Account'}
                      </Button>
                      
                      {/* Trust indicator */}
                      <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-status-low" />
                        Free forever. No credit card required.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
