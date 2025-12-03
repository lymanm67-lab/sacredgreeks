import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Home, Eye, EyeOff, CheckCircle2, Mail, RefreshCw, AlertTriangle, Ban, Info, ExternalLink } from 'lucide-react';
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
    
    // Load saved email from localStorage
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

      // Check for disposable email
      const { isDisposable: isDisposableEmail } = checkEmail(validated.email);
      if (isDisposableEmail) {
        toast({
          title: 'Disposable email not allowed',
          description: 'Please use a permanent email address to create your account. Temporary or disposable emails are not accepted.',
          variant: 'destructive',
          duration: 8000,
        });
        setIsLoading(false);
        return;
      }

      // Check password against HaveIBeenPwned database
      const { isBreached, count } = await checkPassword(validated.password);
      
      if (isBreached) {
        toast({
          title: 'Password has been exposed',
          description: `This password has appeared in ${count.toLocaleString()} data breaches. Please choose a different password for your security.`,
          variant: 'destructive',
          duration: 10000,
        });
        setIsLoading(false);
        return;
      }

      const { error } = await signUp(validated.email, validated.password, validated.fullName);

      if (error) {
        // Handle specific error cases
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
          description: 'We sent you a verification link. Please check your inbox to confirm your account.',
          duration: 8000,
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
          description: 'We sent a new verification link to your email.',
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

      // Save or remove email based on "Remember me" checkbox
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

      // Check password against HaveIBeenPwned database
      const { isBreached, count } = await checkPassword(validated.password);
      
      if (isBreached) {
        toast({
          title: 'Password has been exposed',
          description: `This password has appeared in ${count.toLocaleString()} data breaches. Please choose a different password for your security.`,
          variant: 'destructive',
          duration: 10000,
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
          <div className="container mx-auto px-4 py-4">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home</span>
            </Link>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred/10 mb-4">
                <Heart className="w-8 h-8 text-sacred" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-muted-foreground">Enter your new password</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Set New Password</CardTitle>
                <CardDescription>Choose a strong password for your account</CardDescription>
              </CardHeader>
              <CardContent>
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
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                          <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-destructive space-y-1">
                            <p className="font-medium">Password exposed in {breachCount.toLocaleString()} data breaches</p>
                            <p className="text-destructive/80">This password has been leaked and could be used in credential stuffing attacks.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-3 bg-muted/50 border border-border rounded-md">
                          <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div className="text-xs text-muted-foreground space-y-1">
                            <p className="font-medium">Why can't we show which breaches?</p>
                            <p>For security, password checks use k-anonymity—only a partial hash is sent to the breach database, never your actual password. This means we can detect IF a password was leaked, but not WHERE or WHEN.</p>
                            <a 
                              href="https://haveibeenpwned.com/Passwords" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline"
                            >
                              Check your email for breach details
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
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
                        minLength={6}
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
                    {isCheckingBreach ? 'Checking password security...' : isLoading ? 'Updating...' : 'Update Password'}
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
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Benefits */}
            <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
              <div className="inline-flex lg:flex items-center justify-center lg:justify-start w-16 h-16 rounded-full bg-sacred/10 mb-4">
                <Heart className="w-8 h-8 text-sacred" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Join Sacred Greeks</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Navigate faith and Greek life with daily devotionals, prayer tools, and biblical guidance
                </p>
              </div>
              
              <div className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Daily Devotionals</p>
                    <p className="text-sm text-muted-foreground">Scripture-based guidance grounded in P.R.O.O.F. framework</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Track Your Journey</p>
                    <p className="text-sm text-muted-foreground">Monitor prayers, progress, and spiritual growth</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sacred flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">100% Free Forever</p>
                    <p className="text-sm text-muted-foreground">No credit card required, full access to all features</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="order-1 lg:order-2">

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Sign in to continue your spiritual journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        defaultValue={savedEmail}
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
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label
                        htmlFor="remember-me"
                        className="text-sm font-normal cursor-pointer"
                      >
                        Remember my email
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-sacred hover:bg-sacred/90"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <div className="text-center">
                      <Link
                        to="/reset-password"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>{pendingVerification ? 'Check your email' : 'Create account'}</CardTitle>
                  <CardDescription>
                    {pendingVerification 
                      ? 'We sent you a verification link' 
                      : 'Start your journey with Sacred Greeks'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingVerification ? (
                    <div className="space-y-6 text-center py-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sacred/10">
                        <Mail className="w-8 h-8 text-sacred" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-foreground font-medium">
                          Verification email sent to:
                        </p>
                        <p className="text-sacred font-semibold">
                          {pendingVerification}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        Click the link in your email to verify your account. 
                        Check your spam folder if you don't see it.
                      </p>
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          onClick={handleResendVerification}
                          disabled={resendingEmail}
                          className="w-full"
                        >
                          {resendingEmail ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Resend verification email
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setPendingVerification(null)}
                          className="w-full text-muted-foreground"
                        >
                          Use a different email
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
                          <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                            <Ban className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-destructive">
                              <p className="font-medium">Disposable email not allowed</p>
                              <p className="text-destructive/80">Please use a permanent email address. Domains like {checkedDomain} are not accepted.</p>
                            </div>
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
                          <div className="space-y-2">
                            <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                              <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                              <div className="text-sm text-destructive space-y-1">
                                <p className="font-medium">Password exposed in {breachCount.toLocaleString()} data breaches</p>
                                <p className="text-destructive/80">This password has been leaked and could be used in credential stuffing attacks. Please choose a different password.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 p-3 bg-muted/50 border border-border rounded-md">
                              <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                              <div className="text-xs text-muted-foreground space-y-1">
                                <p className="font-medium">Why can't we show which breaches?</p>
                                <p>For security, password checks use k-anonymity—only a partial hash is sent to the breach database, never your actual password. This means we can detect IF a password was leaked, but not WHERE or WHEN.</p>
                                <a 
                                  href="https://haveibeenpwned.com/Passwords" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-primary hover:underline"
                                >
                                  Check your email for breach details
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-sacred hover:bg-sacred/90"
                        disabled={isLoading || isCheckingBreach || isDisposable === true}
                      >
                        {isCheckingBreach ? 'Checking password security...' : isLoading ? 'Creating account...' : 'Sign Up'}
                      </Button>
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
    </div>
  );
};

export default Auth;