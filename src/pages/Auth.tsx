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
import { Home, Eye, EyeOff, RefreshCw, AlertTriangle, ChevronRight } from 'lucide-react';
import logo from '@/assets/sacred-greeks-logo.png';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';
import { usePasswordBreachCheck } from '@/hooks/use-password-breach-check';
import { useDisposableEmailCheck } from '@/hooks/use-disposable-email-check';
import { cn } from '@/lib/utils';

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
              <div className="relative w-16 h-16 mx-auto mb-3">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                <img src={logo} alt="Sacred Greeks" className="relative w-full h-full rounded-full object-cover ring-2 ring-primary/30" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
            </div>

            <Card className="border shadow-lg">
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
    <div className={cn("min-h-screen bg-gradient-to-b from-background to-muted flex flex-col", isDemoMode && "pt-11")}>
      {/* Header */}
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

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Hero Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <img 
                src={logo} 
                alt="Sacred Greeks" 
                className="relative w-full h-full rounded-full object-cover ring-4 ring-primary/30" 
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Sacred Greeks
            </h1>
            <p className="text-muted-foreground mt-2">
              Navigate faith and Greek life
            </p>
          </div>

          {/* Pending Verification State */}
          {pendingVerification ? (
            <Card className="border shadow-lg animate-fade-in">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Check Your Email</h3>
                  <p className="text-muted-foreground text-sm mt-2">
                    We sent a verification link to <span className="text-primary font-medium">{pendingVerification}</span>
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
            /* Auth Tabs */
            <Tabs defaultValue="signin" className="w-full animate-fade-in" style={{ animationDelay: '100ms' }}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="mt-0">
                <Card className="border shadow-lg">
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
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="remember"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                          />
                          <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                            Remember me
                          </Label>
                        </div>
                        <Link 
                          to="/forgot-password" 
                          className="text-sm text-primary hover:text-primary/80 transition-colors"
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
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="mt-0">
                <Card className="border shadow-lg">
                  <CardContent className="pt-6">
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
                          <div className="flex items-start gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
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
                          <div className="flex items-start gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
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
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">Terms</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
