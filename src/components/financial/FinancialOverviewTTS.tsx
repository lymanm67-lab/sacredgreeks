import { Card, CardContent } from "@/components/ui/card";
import { ListenButton } from "@/components/ListenButton";
import { Volume2 } from "lucide-react";

const financialOverviewText = `Welcome to the Sacred Greeks Financial Stewardship Center. This comprehensive resource is designed to help you achieve financial freedom through biblical principles.

Too many of our brothers and sisters in Greek life are burdened by debt, struggling with credit issues, and lacking the budgeting skills needed for long-term success. But it doesn't have to be this way. The Bible provides timeless wisdom for managing money that still works today.

In this section, you'll find several powerful tools and teachings:

First, the Biblical Foundation tab covers key scriptures about money management. Proverbs tells us that the borrower is slave to the lender, and that the wise store up resources for the future. Jesus himself taught us to count the cost before building.

Second, our Credit Repair Hub gives you free access to your credit reports and a professional dispute letter generator. Good credit isn't just about numbers - it's about honoring your commitments and maintaining a good name, which Proverbs 22 says is more valuable than great riches.

Third, the Student Financial Guide helps young Greeks avoid the credit card traps specifically targeting college students. Companies spend over a billion dollars each year marketing to students. We'll show you how to recognize and avoid these traps.

Fourth, the Sacred Money Spending Plan, or S-M-S-P, is our signature budgeting tool. It implements a biblical model: tithe first, save second, invest third, and spend what remains. This is the path to generational wealth.

Finally, you'll find real-world scenarios, practical examples, and tools for calculating debt payoff, emergency funds, and Greek-specific expenses like convention costs and dues.

Remember: financial stewardship isn't about restriction - it's about freedom. When you manage God's resources well, you position yourself to be a blessing to others and leave a legacy for generations to come.

Let's begin your journey to financial freedom.`;

export function FinancialOverviewTTS() {
  return (
    <Card className="bg-gradient-to-r from-sacred/5 to-emerald-500/5 border-sacred/20">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sacred/10">
              <Volume2 className="w-5 h-5 text-sacred" />
            </div>
            <div>
              <h3 className="font-semibold">Audio Introduction</h3>
              <p className="text-sm text-muted-foreground">
                Listen to an overview of Financial Stewardship
              </p>
            </div>
          </div>
          <ListenButton
            text={financialOverviewText}
            itemId="financial-stewardship-overview"
            title="Financial Stewardship Overview"
            voice="onyx"
            variant="default"
            size="default"
            className="bg-sacred hover:bg-sacred/90"
          />
        </div>
      </CardContent>
    </Card>
  );
}
