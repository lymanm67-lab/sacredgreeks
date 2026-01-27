import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useDemoMode } from '@/contexts/DemoModeContext';
import { DemoModeControl } from '@/components/GlobalDemoIndicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Home, Eye, EyeOff, RefreshCw, AlertTriangle, BookOpen, Heart, Shield, Quote, Star, Users, ChevronRight, ChevronDown, ChevronUp, Sparkles, Play, User, Moon, Zap, Video, UserCheck, FileDown, Headphones } from 'lucide-react';
import logo from '@/assets/sacred-greeks-logo.png';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';
import { usePasswordBreachCheck } from '@/hooks/use-password-breach-check';
import { cn } from '@/lib/utils';

import { ProofLetterAudio } from '@/components/proof/ProofLetterAudio';
import { PROOF_FRAMEWORK_DATA } from '@/lib/proofFrameworkData';
import { generateGuildOnePagerPDF } from '@/lib/guild-onepager-pdf';
import { generateGuildComparisonPDF } from '@/lib/guild-comparison-pdf';
import { ProofAudioPlayer } from '@/components/proof/ProofAudioPlayer';

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
    icon: Headphones,
    title: "Sacred Greeks Podcast",
    subtitle: "Listen & Learn On The Go",
    description: "Stream audio study sessions, teachings, and discussions perfect for commutes and workouts.",
    tags: ["Audio Episodes", "RSS Feed", "Live Sessions"],
    link: "/podcast",
    bgColor: "bg-purple-500/20",
    hoverBgColor: "bg-purple-500/30",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/70",
    topBorderColor: "bg-purple-500"
  },
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
    bgColor: "bg-teal-500/20",
    hoverBgColor: "bg-teal-500/30",
    iconColor: "text-teal-400",
    borderColor: "border-teal-500/70",
    topBorderColor: "bg-teal-500"
  }
];

// Using PROOF_FRAMEWORK_DATA from lib instead of local constant

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
  const [resetPassword, setResetPassword] = useState('');
  const [showMoreTools, setShowMoreTools] = useState(false);
  const { isDemoMode, setDemoMode } = useDemoMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkPassword, isChecking: isCheckingBreach, breachCount, reset: resetBreachCheck } = usePasswordBreachCheck();

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'reset') {
      setIsResetMode(true);
    }
  }, [searchParams]);


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
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800" asChild>
              <Link to="/signin">Sign In</Link>
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

              {/* Podcast CTA */}
              <Link 
                to="/podcast"
                className="flex items-center justify-center gap-2 mt-6 py-2 px-4 rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-fuchsia-500/30 transition-all group"
              >
                <Headphones className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-purple-300">Listen to our Podcast</span>
                <ChevronRight className="w-4 h-4 text-purple-400/60 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Action Buttons as Cards */}
              <div className="space-y-3 pt-4">
                {/* Try Demo First */}
                <button 
                  onClick={() => {
                    setDemoMode(true);
                    navigate('/dashboard');
                  }}
                  className="w-full"
                >
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
                </button>

                {/* Create Your Account - Highlighted */}
                <Link to="/signin?tab=signup" className="block">
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
                </Link>

                {/* Sign In */}
                <Link to="/signin" className="block">
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


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
      <section className="py-16 md:py-24 relative overflow-hidden bg-slate-900/50">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

          {/* Audio Player */}
          <ProofAudioPlayer className="max-w-2xl mx-auto mb-8" />

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
            {PROOF_FRAMEWORK_DATA.map((item, index) => {
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

                        {/* Core Principle - For all letters with corePrinciple */}
                        {item.corePrinciple && (
                          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border border-amber-500/30">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <Zap className="w-5 h-5 text-amber-400" />
                              </div>
                              <div>
                                <h4 className="text-amber-300 font-semibold text-sm mb-2">{item.corePrinciple.title}</h4>
                                <p className="text-white/80 text-sm leading-relaxed">
                                  {item.corePrinciple.text}
                                </p>
                                <div className="mt-3 p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
                                  <p className="text-amber-400 font-semibold text-xs">{item.corePrinciple.scripture}</p>
                                  <p className="text-white/70 text-xs italic mt-1">"{item.corePrinciple.scriptureText}"</p>
                                </div>
                                {item.letter === "R" && (
                                  <Link 
                                    to="/faith-authority" 
                                    className="inline-flex items-center gap-1 mt-3 text-amber-400 hover:text-amber-300 text-xs font-medium transition-colors"
                                  >
                                    Learn more about Faith & Authority
                                    <ChevronRight className="w-3 h-3" />
                                  </Link>
                                )}
                                {item.letter === "P" && (
                                  <div className="mt-4 space-y-4">
                                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                      <p className="text-blue-300 text-sm">
                                        <strong>Ancient Guild Context:</strong> Jesus as a τέκτων (tekton/carpenter) and Paul as a tentmaker participated in guild-organized trades with structured apprenticeship, mentorship, and brotherhood.
                                      </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => generateGuildOnePagerPDF()}
                                        className="text-amber-300 border-amber-500/30 hover:bg-amber-500/10 text-xs"
                                      >
                                        <FileDown className="w-3 h-3 mr-1" />
                                        Download One-Pager PDF
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => generateGuildComparisonPDF()}
                                        className="text-amber-300 border-amber-500/30 hover:bg-amber-500/10 text-xs"
                                      >
                                        <FileDown className="w-3 h-3 mr-1" />
                                        Full Comparison Guide
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Listen Button for this section */}
                        <div className="flex justify-end pt-2 border-t border-white/10">
                          <ProofLetterAudio 
                            letter={item.letter}
                            title={item.title}
                            criticism={item.criticism}
                            criticismExample={item.criticismExample}
                            response={item.response}
                            scripture={item.scripture}
                            scriptureText={item.scriptureText}
                            supportingScripture={item.supportingScripture}
                            supportingText={item.supportingText}
                            corePrinciple={item.corePrinciple ? `Core Principle - ${item.corePrinciple.title}: ${item.corePrinciple.text} Scripture says in ${item.corePrinciple.scripture}: "${item.corePrinciple.scriptureText}"` : undefined}
                            className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8 flex flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" asChild>
              <Link to="/proof-course">Learn More About P.R.O.O.F.</Link>
            </Button>
            <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10" asChild>
              <Link to="/faith-authority">Faith & Authority Teaching</Link>
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
              asChild
            >
              <Link to="/signin?tab=signup">Create Free Account</Link>
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
