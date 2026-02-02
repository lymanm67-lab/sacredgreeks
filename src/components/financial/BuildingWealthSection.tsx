import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  TrendingUp, 
  Home, 
  Landmark, 
  GraduationCap, 
  Heart,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Calculator,
  FileText,
  Users,
  Building,
  Briefcase,
  Shield
} from "lucide-react";
import { ListenButton } from "@/components/ListenButton";
import { useExternalLinks } from "@/hooks/use-external-links";

// External Resources Data
// First-Time Homebuyer Programs
const firstTimeHomebuyerResources = [
  { name: "HUD Housing Counseling", url: "https://www.hud.gov/counseling", description: "Free HUD-approved housing counselors" },
  { name: "NACA (Neighborhood Assistance Corporation)", url: "https://www.naca.com", description: "No down payment, no closing costs mortgages" },
  { name: "Down Payment Resource", url: "https://downpaymentresource.com", description: "Find down payment assistance programs in your area" },
  { name: "Fannie Mae HomeReady", url: "https://singlefamily.fanniemae.com/originating-underwriting/mortgage-products/homeready-mortgage", description: "3% down payment for low-income buyers" },
  { name: "Freddie Mac Home Possible", url: "https://sf.freddiemac.com/working-with-us/origination-underwriting/mortgage-products/home-possible", description: "3% down with flexible credit requirements" },
  { name: "FHA Loans", url: "https://www.hud.gov/buying/loans", description: "3.5% down with credit scores as low as 580" },
  { name: "Good Neighbor Next Door", url: "https://www.hud.gov/program_offices/housing/sfh/reo/goodn/gnndabot", description: "50% discount for teachers, police, firefighters, EMTs" },
  { name: "State Housing Finance Agencies", url: "https://www.ncsha.org/housing-help/", description: "Find your state's first-time buyer programs" },
];

// Veterans & Military Programs
const veteranResources = [
  { name: "VA Home Loans", url: "https://www.va.gov/housing-assistance/home-loans/", description: "0% down, no PMI for eligible veterans" },
  { name: "VA Loan Eligibility", url: "https://www.va.gov/housing-assistance/home-loans/eligibility/", description: "Check your Certificate of Eligibility (COE)" },
  { name: "VA-Backed Purchase Loan", url: "https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/", description: "Buy a home with no down payment" },
  { name: "Native American Direct Loan (NADL)", url: "https://www.va.gov/housing-assistance/home-loans/loan-types/native-american-direct-loan/", description: "For Native American veterans on federal trust land" },
  { name: "Adapted Housing Grants", url: "https://www.va.gov/housing-assistance/disability-housing-grants/", description: "Grants for veterans with disabilities" },
  { name: "Veterans United", url: "https://www.veteransunited.com", description: "Top VA loan lender with educational resources" },
  { name: "Military OneSource", url: "https://www.militaryonesource.mil/financial-legal/personal-finance/housing/", description: "Free financial counseling for military families" },
];

// General Homeownership Resources
const homeownershipResources = [
  { name: "Consumer Financial Protection Bureau", url: "https://www.consumerfinance.gov/owning-a-home/", description: "Homebuying tools and mortgage guides" },
  { name: "USDA Rural Housing", url: "https://www.rd.usda.gov/programs-services/single-family-housing-programs", description: "0% down loans for rural areas" },
  { name: "Habitat for Humanity", url: "https://www.habitat.org/housing-help/apply", description: "Affordable homeownership program" },
  { name: "NeighborWorks America", url: "https://www.neighborworks.org/homes", description: "Homeownership counseling nationwide" },
  { name: "National Fair Housing Alliance", url: "https://nationalfairhousing.org/", description: "Know your housing rights" },
];

const investingResources = [
  { name: "I Will Teach You To Be Rich", url: "https://www.iwillteachyoutoberich.com", description: "Ramit Sethi's comprehensive money education" },
  { name: "Investopedia Academy", url: "https://academy.investopedia.com", description: "Free investing courses and tutorials" },
  { name: "Khan Academy Finance", url: "https://www.khanacademy.org/economics-finance-domain", description: "Free financial literacy courses" },
  { name: "NerdWallet Investing Guide", url: "https://www.nerdwallet.com/article/investing/how-to-start-investing", description: "Beginner investing basics" },
  { name: "Bogleheads Wiki", url: "https://www.bogleheads.org/wiki/Main_Page", description: "Index fund investing community knowledge" },
];

const retirementResources = [
  { name: "IWT Retirement Calculator", url: "https://www.iwillteachyoutoberich.com/retirement-calculator", description: "Calculate your retirement number" },
  { name: "NerdWallet Retirement Calculator", url: "https://www.nerdwallet.com/investing/retirement-calculator", description: "Free retirement planning tool" },
  { name: "Vanguard Retirement Nest Egg", url: "https://retirementplans.vanguard.com/VGApp/pe/pubeducation/calculators/RetirementNestEggCalc.jsf", description: "How long will your savings last?" },
  { name: "Social Security Estimator", url: "https://www.ssa.gov/benefits/retirement/estimator.html", description: "Estimate your Social Security benefits" },
  { name: "401(k) Calculator", url: "https://www.bankrate.com/retirement/401-k-calculator", description: "Project your 401(k) growth" },
];

const legacyResources = [
  { name: "FreeWill", url: "https://www.freewill.com", description: "Create a free legal will online" },
  { name: "Trust & Will", url: "https://trustandwill.com", description: "Affordable estate planning documents" },
  { name: "LegalZoom Wills", url: "https://www.legalzoom.com/personal/estate-planning/last-will-and-testament-overview.html", description: "Will and trust creation service" },
  { name: "Nolo Estate Planning", url: "https://www.nolo.com/legal-encyclopedia/estate-planning", description: "Free estate planning education" },
  { name: "AARP Estate Planning", url: "https://www.aarp.org/money/investing/info-2020/estate-planning-guide.html", description: "Comprehensive estate planning guide" },
];

// Scenarios Data
const wealthScenarios = [
  {
    id: "first-home",
    title: "First-Time Homebuyer Journey",
    icon: Home,
    color: "blue",
    scenario: "Marcus, 28, Kappa Alpha Psi member, earns $65,000/year and pays $1,400/month rent. He wants to buy his first home.",
    steps: [
      "Check credit score (free at AnnualCreditReport.com) - Target: 680+",
      "Calculate affordable mortgage: $65K income → ~$270K home max",
      "Save for down payment: $15,000-54,000 (3.5%-20%)",
      "Research first-time buyer programs (NACA, FHA, state programs)",
      "Get pre-approved before house hunting",
      "Budget for closing costs (2-5% of home price)"
    ],
    outcome: "After 2 years of saving $800/month, Marcus bought a $245K home with 10% down using a state first-time buyer program, saving $150/month compared to rent while building equity."
  },
  {
    id: "retirement-start",
    title: "Starting Retirement Investing at 25",
    icon: Landmark,
    color: "amber",
    scenario: "Jasmine, 25, Delta Sigma Theta member, just started her career earning $55,000. She's overwhelmed by retirement options.",
    steps: [
      "Enroll in employer 401(k) immediately - get full match (free money!)",
      "Start with 6% contribution (employer matches 3%)",
      "Choose target-date fund for simplicity (2060 fund)",
      "Open Roth IRA for additional tax-free growth",
      "Automate contributions - 'pay yourself first'",
      "Increase contribution 1% each year until maxed"
    ],
    outcome: "Starting at 25 with $300/month, Jasmine will have over $1.2M by 65 assuming 8% returns. Waiting until 35 would result in only $540K - a $660K difference!"
  },
  {
    id: "legacy-planning",
    title: "Creating a Legacy Plan",
    icon: Heart,
    color: "rose",
    scenario: "The Williams family (Alpha Phi Alpha & AKA) want to ensure their assets pass to their children without probate complications.",
    steps: [
      "Inventory all assets (property, accounts, insurance, heirlooms)",
      "Create a will designating beneficiaries",
      "Consider a living trust to avoid probate",
      "Update beneficiaries on all accounts (401k, life insurance)",
      "Get term life insurance (10-12x annual income)",
      "Create healthcare directive and power of attorney"
    ],
    outcome: "With proper planning, the Williams family ensured their $500K in assets will transfer directly to their children without the 6-12 month probate process, saving $15K+ in legal fees."
  }
];

// Pitfalls Data
const wealthPitfalls = [
  {
    title: "Waiting to Start Investing",
    description: "Every year you delay costs you significantly in compound growth",
    consequence: "Waiting from 25 to 35 to start investing can cost you $500K+ by retirement",
    solution: "Start now with whatever amount you can, even $50/month"
  },
  {
    title: "Not Getting Employer Match",
    description: "Leaving 401(k) match on the table is leaving free money",
    consequence: "Missing a 3% match on $55K salary = $1,650/year lost forever",
    solution: "Always contribute at least enough to get full employer match"
  },
  {
    title: "Renting Forever",
    description: "Long-term renting means building someone else's wealth",
    consequence: "30 years of rent at $1,400/month = $504,000 with zero equity",
    solution: "Create a 2-5 year plan to purchase, even if starting with a condo"
  },
  {
    title: "No Estate Plan",
    description: "Without a will, the state decides who gets your assets",
    consequence: "Probate can consume 3-7% of estate value and take 6-12 months",
    solution: "Create a basic will for free using FreeWill.com or similar services"
  },
  {
    title: "Lifestyle Inflation",
    description: "Increasing spending with every raise prevents wealth building",
    consequence: "A $10K raise spent on lifestyle = $0 additional wealth built",
    solution: "Save at least 50% of every raise - celebrate wisely"
  },
  {
    title: "No Life Insurance",
    description: "Leaving family financially vulnerable if something happens",
    consequence: "Average funeral costs $7K-12K, plus lost income for family",
    solution: "Get term life insurance - often under $30/month for young, healthy adults"
  }
];

// TTS Content
const sectionOverviewText = `
Building generational wealth is about making strategic financial decisions today that benefit your family for generations to come.
As Proverbs 13:22 says, "A good person leaves an inheritance for their children's children."

This section covers four key areas: Homeownership, which helps you build equity instead of paying rent forever.
Investing Education, including retirement accounts like 401k and Roth IRA. 
Retirement Planning with calculators to project your future wealth.
And Legacy Planning to ensure your assets transfer smoothly to your loved ones.

We've included real scenarios from Greek community members, common pitfalls to avoid, and free tools and resources to help you get started on your wealth building journey today.
`;

export function BuildingWealthSection() {
  const { openExternalLink } = useExternalLinks();
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);

  const ResourceLinks = ({ resources, title }: { resources: typeof firstTimeHomebuyerResources; title: string }) => (
    <div className="space-y-2">
      {title && (
        <h5 className="font-semibold text-sm flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          {title}
        </h5>
      )}
      <div className="grid gap-2 max-h-80 overflow-y-auto pr-1">
        {resources.map((resource, idx) => (
          <Button
            key={idx}
            variant="outline"
            size="sm"
            className="justify-start h-auto py-2 px-3 text-left"
            onClick={() => openExternalLink(resource.url)}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium text-xs">{resource.name}</span>
              <span className="text-xs text-muted-foreground">{resource.description}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overview with TTS */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Building Generational Wealth
              </CardTitle>
              <CardDescription>
                "A good person leaves an inheritance for their children's children" — Proverbs 13:22
              </CardDescription>
            </div>
            <ListenButton
              text={sectionOverviewText}
              itemId="wealth-overview"
              title="Building Wealth Overview"
              voice="onyx"
              variant="outline"
              size="sm"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Homeownership - Full Width with Multiple Categories */}
      <Card className="border-blue-500/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-500" />
                Homeownership Programs
              </CardTitle>
              <CardDescription>
                Multiple pathways to homeownership with low or no down payment options
              </CardDescription>
            </div>
            <ListenButton
              text="Homeownership is one of the most powerful wealth-building tools available. There are many programs designed to help you buy your first home. First-time buyer programs like NACA, FHA loans, and Fannie Mae HomeReady offer low or zero down payment options. Veterans and military members have access to VA loans with zero down payment and no private mortgage insurance. USDA loans provide zero down payment options for rural areas. Always work with a HUD-approved housing counselor who can guide you through the process for free."
              itemId="homeownership-tips"
              title="Homeownership Programs"
              voice="onyx"
              size="sm"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="text-sm text-muted-foreground space-y-1 grid md:grid-cols-2 gap-x-4">
            <li>• Build equity instead of paying rent</li>
            <li>• 0% down options for veterans (VA loans)</li>
            <li>• 3% down for first-time buyers (FHA)</li>
            <li>• 0% down for rural areas (USDA)</li>
            <li>• Free housing counseling available</li>
            <li>• State programs with down payment assistance</li>
          </ul>

          <div className="grid gap-4 md:grid-cols-3">
            {/* First-Time Buyers */}
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-3 text-blue-600">
                <Users className="w-4 h-4" />
                First-Time Buyers
              </h4>
              <ResourceLinks resources={firstTimeHomebuyerResources} title="" />
            </div>

            {/* Veterans & Military */}
            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-3 text-emerald-600">
                <Shield className="w-4 h-4" />
                Veterans & Military
              </h4>
              <ResourceLinks resources={veteranResources} title="" />
            </div>

            {/* General Resources */}
            <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-3 text-amber-600">
                <Building className="w-4 h-4" />
                General Resources
              </h4>
              <ResourceLinks resources={homeownershipResources} title="" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Resource Cards */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* Investing Education */}
        <Card className="border-purple-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-500" />
              Investing Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Invest in certifications that increase income</li>
              <li>• Learn about index funds and ETFs</li>
              <li>• Understand compound interest power</li>
              <li>• Use Greek network for opportunities</li>
            </ul>
            <ListenButton
              text="Investing education is essential for building long-term wealth. Start by learning about low-cost index funds, which are recommended by experts like Warren Buffett. Ramit Sethi's I Will Teach You To Be Rich is an excellent resource for automating your finances. Khan Academy offers free courses on investing basics. Remember: the best investment you can make is in your own financial education."
              itemId="investing-education"
              title="Investing Education"
              voice="onyx"
              size="sm"
              showLabel={false}
            />
            <ResourceLinks resources={investingResources} title="Free Investing Education" />
          </CardContent>
        </Card>

        {/* Retirement Planning */}
        <Card className="border-amber-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-500" />
              Retirement Planning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Start now—compound interest is powerful</li>
              <li>• Max employer 401(k) match (free money!)</li>
              <li>• Open a Roth IRA ($7,000/year limit)</li>
              <li>• Target-date funds for simplicity</li>
            </ul>
            <ListenButton
              text="Retirement planning should start as early as possible. The power of compound interest means every year you delay can cost you hundreds of thousands of dollars. Always contribute enough to your 401k to get your full employer match - that's free money! A Roth IRA allows your investments to grow tax-free. Use the calculators linked below to see exactly how much you need to save to retire comfortably."
              itemId="retirement-planning"
              title="Retirement Planning"
              voice="onyx"
              size="sm"
              showLabel={false}
            />
            <ResourceLinks resources={retirementResources} title="Retirement Calculators & Tools" />
          </CardContent>
        </Card>

        {/* Legacy Planning */}
        <Card className="border-rose-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              Legacy Planning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Life insurance (term life is affordable)</li>
              <li>• Create a will and trust</li>
              <li>• Teach children about money early</li>
              <li>• Support Black-owned businesses</li>
            </ul>
            <ListenButton
              text="Legacy planning ensures your hard-earned wealth transfers to your loved ones smoothly. Without a will, the state decides who gets your assets through probate, which can be expensive and time-consuming. Services like FreeWill dot com allow you to create a legal will for free. Consider term life insurance while you're young and healthy - it's often under 30 dollars per month and provides essential protection for your family."
              itemId="legacy-planning"
              title="Legacy Planning"
              voice="onyx"
              size="sm"
              showLabel={false}
            />
            <ResourceLinks resources={legacyResources} title="Estate Planning Resources" />
          </CardContent>
        </Card>
      </div>

      {/* Real Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Real-World Scenarios
          </CardTitle>
          <CardDescription>
            Learn from these examples of Greek community members building wealth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible value={expandedScenario || undefined} onValueChange={(val) => setExpandedScenario(val || null)}>
            {wealthScenarios.map((scenario) => {
              const IconComponent = scenario.icon;
              const colorClasses = {
                blue: "text-blue-500 bg-blue-500/10",
                amber: "text-amber-500 bg-amber-500/10",
                rose: "text-rose-500 bg-rose-500/10"
              };
              return (
                <AccordionItem key={scenario.id} value={scenario.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${colorClasses[scenario.color as keyof typeof colorClasses]}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-left">{scenario.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-lg flex-1">
                        "{scenario.scenario}"
                      </p>
                      <ListenButton
                        text={`${scenario.title}. ${scenario.scenario} Here are the steps: ${scenario.steps.join('. ')}. The outcome: ${scenario.outcome}`}
                        itemId={`scenario-${scenario.id}`}
                        title={scenario.title}
                        voice="onyx"
                        size="sm"
                        showLabel={false}
                      />
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-sm">Steps Taken:</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        {scenario.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <h5 className="font-semibold text-sm text-emerald-600 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Outcome
                      </h5>
                      <p className="text-sm mt-1">{scenario.outcome}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Pitfalls to Avoid */}
      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
                Common Wealth-Building Pitfalls
              </CardTitle>
              <CardDescription>
                Avoid these mistakes that can cost you hundreds of thousands over time
              </CardDescription>
            </div>
            <ListenButton
              text={`Common wealth building pitfalls to avoid: ${wealthPitfalls.map(p => `${p.title}: ${p.description}. The consequence is ${p.consequence}. The solution: ${p.solution}.`).join(' ')}`}
              itemId="wealth-pitfalls"
              title="Wealth Building Pitfalls"
              voice="onyx"
              size="sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wealthPitfalls.map((pitfall, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-background border">
                <h4 className="font-semibold text-sm text-amber-600 mb-1">{pitfall.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{pitfall.description}</p>
                <div className="text-xs space-y-1">
                  <p className="text-destructive font-medium">⚠️ {pitfall.consequence}</p>
                  <p className="text-emerald-600">✓ {pitfall.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compound Interest Visual */}
      <Card className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <h3 className="text-xl font-bold">The Power of Compound Interest</h3>
              <ListenButton
                text="The power of compound interest: If you invest 200 dollars per month starting at age 25 with 8 percent average returns, you will have $58,902 at age 35, $176,023 at age 45, and $559,562 at age 65. As Proverbs 13:11 says, whoever gathers money little by little makes it grow."
                itemId="compound-interest"
                title="Compound Interest"
                voice="onyx"
                size="sm"
                showLabel={false}
              />
            </div>
            <p className="text-muted-foreground">
              If you invest $200/month starting at age 25 with 8% average returns:
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-2xl font-bold text-emerald-600">$58,902</p>
                <p className="text-sm text-muted-foreground">At age 35</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">$176,023</p>
                <p className="text-sm text-muted-foreground">At age 45</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">$559,562</p>
                <p className="text-sm text-muted-foreground">At age 65</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic pt-4">
              "Whoever gathers money little by little makes it grow" — Proverbs 13:11
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-sacred" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => openExternalLink("https://www.annualcreditreport.com")}>
              <FileText className="w-4 h-4 mr-2" />
              Check Credit (Free)
            </Button>
            <Button variant="outline" onClick={() => openExternalLink("https://www.iwillteachyoutoberich.com/retirement-calculator")}>
              <Calculator className="w-4 h-4 mr-2" />
              Retirement Calculator
            </Button>
            <Button variant="outline" onClick={() => openExternalLink("https://www.freewill.com")}>
              <Shield className="w-4 h-4 mr-2" />
              Create Free Will
            </Button>
            <Button variant="outline" onClick={() => openExternalLink("https://www.naca.com")}>
              <Home className="w-4 h-4 mr-2" />
              NACA Home Program
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
