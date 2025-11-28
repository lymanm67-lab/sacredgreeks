import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Crown, Users, Sparkles, Shield, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/use-subscription';
import { toast } from 'sonner';

// Pricing tiers configuration
const PRICING_TIERS = {
  pro: {
    name: 'Pro',
    description: 'Perfect for individual Christians in Greek Life',
    icon: Crown,
    trialDays: 15,
    features: [
      'Full P.R.O.O.F. Framework Access',
      'AI-Powered Bible Study Tools',
      'Personal Prayer Journal',
      'Response Coach Training',
      'Progress Tracking & Achievements',
      'Daily Devotionals',
      'Offline Access',
    ],
    monthly: {
      price: 9.99,
      priceId: 'price_1SYXjdLMtnFcNpvTGb2LX4v7',
    },
    annual: {
      price: 79.99,
      monthlyEquivalent: 6.67,
      priceId: 'price_1SYXoDLMtnFcNpvTunTis7BN',
      savings: '33%',
    },
  },
  ministry: {
    name: 'Ministry',
    description: 'For chapter leaders & campus ministries',
    icon: Users,
    trialDays: 30,
    features: [
      'Everything in Pro, plus:',
      'Chapter Resource Library',
      'Meeting Notes & Planning Tools',
      'Community Service Tracker',
      'Team Member Management',
      'Priority Support',
      'Custom Branding Options',
      'Tax-Exempt Billing Available',
    ],
    monthly: {
      price: 29.99,
      priceId: 'price_1SYXoTLMtnFcNpvTBRlVp0HI',
    },
    annual: {
      price: 239.99,
      monthlyEquivalent: 20.00,
      priceId: 'price_1SYXosLMtnFcNpvTf5tDidEW',
      savings: '33%',
    },
  },
};

export default function Subscription() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    subscribed, 
    tier, 
    subscriptionEnd, 
    isTrialing, 
    loading, 
    checkSubscription,
    createCheckout,
    openCustomerPortal 
  } = useSubscription();
  
  const [isAnnual, setIsAnnual] = useState(true);
  const [processingTier, setProcessingTier] = useState<string | null>(null);

  // Handle success/cancel from Stripe
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('Subscription activated! Welcome to Sacred Greeks.');
      checkSubscription();
    } else if (searchParams.get('canceled') === 'true') {
      toast.info('Subscription checkout was canceled.');
    }
  }, [searchParams, checkSubscription]);

  const handleSubscribe = async (tierKey: 'pro' | 'ministry') => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      navigate('/auth');
      return;
    }

    const tierConfig = PRICING_TIERS[tierKey];
    const priceId = isAnnual ? tierConfig.annual.priceId : tierConfig.monthly.priceId;
    
    setProcessingTier(tierKey);
    try {
      await createCheckout(priceId, tierConfig.trialDays);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setProcessingTier(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      await openCustomerPortal();
    } catch (error) {
      console.error('Portal error:', error);
      toast.error('Failed to open subscription management.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Sacred Greeks Premium
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Path
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Navigate Greek Life with Biblical wisdom. Start your free trial today.
          </p>
        </motion.div>

        {/* Current Subscription Status */}
        {subscribed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="border-primary bg-primary/5 max-w-xl mx-auto">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold capitalize">{tier} Plan</span>
                    {isTrialing && (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        Trial
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isTrialing ? 'Trial ends' : 'Renews'}: {subscriptionEnd ? new Date(subscriptionEnd).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <Button variant="outline" onClick={handleManageSubscription}>
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Billing Toggle */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="billing-toggle" className={!isAnnual ? 'font-semibold' : 'text-muted-foreground'}>
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <Label htmlFor="billing-toggle" className={isAnnual ? 'font-semibold' : 'text-muted-foreground'}>
            Annual
            <Badge variant="secondary" className="ml-2 text-xs">Save 33%</Badge>
          </Label>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {Object.entries(PRICING_TIERS).map(([key, tierConfig], index) => {
            const isCurrentTier = tier === key;
            const Icon = tierConfig.icon;
            const pricing = isAnnual ? tierConfig.annual : tierConfig.monthly;
            const displayPrice = isAnnual ? tierConfig.annual.monthlyEquivalent : tierConfig.monthly.price;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Card className={`relative h-full ${isCurrentTier ? 'border-primary border-2 shadow-lg' : ''} ${key === 'ministry' ? 'bg-gradient-to-br from-card to-primary/5' : ''}`}>
                  {isCurrentTier && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Your Plan
                      </Badge>
                    </div>
                  )}
                  {key === 'ministry' && !isCurrentTier && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="secondary">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{tierConfig.name}</CardTitle>
                    <CardDescription>{tierConfig.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Pricing */}
                    <div className="text-center">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold">${displayPrice.toFixed(2)}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      {isAnnual && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Billed ${pricing.price}/year
                          <Badge variant="outline" className="ml-2 text-xs text-green-600">
                            Save {tierConfig.annual.savings}
                          </Badge>
                        </p>
                      )}
                      <p className="text-sm text-primary mt-2 font-medium">
                        {tierConfig.trialDays}-day free trial
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3">
                      {tierConfig.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      className="w-full"
                      size="lg"
                      variant={key === 'ministry' ? 'default' : 'outline'}
                      onClick={() => handleSubscribe(key as 'pro' | 'ministry')}
                      disabled={loading || processingTier !== null || isCurrentTier}
                    >
                      {processingTier === key ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : isCurrentTier ? (
                        'Current Plan'
                      ) : (
                        `Start ${tierConfig.trialDays}-Day Trial`
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ/Trust Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground mb-4">
            Questions? <a href="/faq" className="text-primary hover:underline">Read our FAQ</a> or{' '}
            <a href="mailto:support@sacredgreeks.com" className="text-primary hover:underline">contact us</a>
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" />
              No commitment
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
