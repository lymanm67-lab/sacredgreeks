import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Home, Eye, EyeOff, RefreshCw, AlertTriangle, ArrowLeft } from 'lucide-react';
import logo from '@/assets/sacred-greeks-logo.png';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';
import { usePasswordBreachCheck } from '@/hooks/use-password-breach-check';
import { useDisposableEmailCheck } from '@/hooks/use-disposable-email-check';
import { cn } from '@/lib/utils';
import { DemoModeControl } from '@/components/GlobalDemoIndicator';
import { lovable } from '@/integrations/lovable';

const authSchema = z.object({
  email: z.string().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password must be less than 100 characters'),
  fullName: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').optional()
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [signupPassword, setSignupPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');
  const [pendingVerification, setPendingVerification] = useState<string | null>(null);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('signin');
  const { signUp, signIn, user } = useAuth();
  const { isDemoMode } = useDemoMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkPassword, isChecking: isCheckingBreach, breachCount, reset: resetBreachCheck } = usePasswordBreachCheck();
  const { checkEmail, isDisposable, checkedDomain, reset: resetDisposableCheck } = useDisposableEmailCheck();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      
      if (error) {
        toast({
          title: 'Error signing in with Google',
          description: error.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirectUrl = searchParams.get('redirect') || '/dashboard';
      navigate(redirectUrl, { replace: true });
    }
  }, [user, navigate, searchParams]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
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

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address first.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?mode=reset`,
      });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Password reset email sent',
          description: 'Check your email for a password reset link.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send password reset email',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("min-h-screen bg-[hsl(225,50%,8%)] flex flex-col", isDemoMode && "pt-11")}>
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Sacred Greeks" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-bold text-xl text-white">Sacred Greeks</span>
          </Link>
          <div className="flex items-center gap-4">
            <DemoModeControl />
            <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white hover:bg-slate-700">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <Link 
            to="/auth" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to options</span>
          </Link>

          {pendingVerification ? (
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
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
              
              <div className="p-8">
                <div className="text-center mb-6">
                  <img src={logo} alt="Sacred Greeks" className="w-16 h-16 mx-auto mb-3 rounded-full" />
                  <h1 className="text-2xl font-bold text-white">Welcome to Sacred Greeks</h1>
                  <p className="text-slate-400 text-sm mt-1">Sign in or create your account</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-700/50">
                    <TabsTrigger value="signin" className="data-[state=active]:bg-slate-600 text-slate-300 data-[state=active]:text-white">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-slate-600 text-slate-300 data-[state=active]:text-white">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin">
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
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
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
                            minLength={8}
                            autoComplete="current-password"
                            required
                            className="pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="remember" 
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                            className="border-slate-600 data-[state=checked]:bg-blue-500"
                          />
                          <label htmlFor="remember" className="text-sm text-slate-400 cursor-pointer">
                            Remember me
                          </label>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const emailInput = document.getElementById('signin-email') as HTMLInputElement;
                            handleForgotPassword(emailInput?.value || '');
                          }}
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-600" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-800/50 px-2 text-slate-400">Or continue with</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-slate-600 text-white hover:bg-slate-700 flex items-center justify-center gap-2"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Your name"
                          required
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-slate-300">Email</Label>
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                          onChange={(e) => {
                            resetDisposableCheck();
                            checkEmail(e.target.value);
                          }}
                        />
                        {isDisposable && (
                          <div className="flex items-start gap-2 p-2 bg-destructive/20 border border-destructive/30 rounded-md">
                            <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-destructive">
                              Disposable emails ({checkedDomain}) are not allowed
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
                            minLength={8}
                            required
                            className="pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
                            value={signupPassword}
                            onChange={(e) => {
                              setSignupPassword(e.target.value);
                              resetBreachCheck();
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
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
                        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
                        disabled={isLoading || isCheckingBreach || isDisposable}
                      >
                        {isLoading ? 'Creating account...' : isCheckingBreach ? 'Checking password...' : 'Create Account'}
                      </Button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-600" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-800/50 px-2 text-slate-400">Or continue with</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-slate-600 text-white hover:bg-slate-700 flex items-center justify-center gap-2"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
