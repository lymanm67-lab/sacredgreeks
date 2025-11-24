import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'L.L.',
    org: 'Sigma Gamma Rho Sorority, Inc.',
    initials: 'LL',
    text: 'This book reassures us that our membership does not make us less Christian, but can actually strengthen our witness as salt and light in spaces the church often overlooks.',
  },
  {
    name: 'Dr. L.H.',
    org: 'Delta Sigma Theta Sorority Inc.',
    initials: 'LH',
    text: 'Sacred, Not Sinful is a powerful and much-needed contribution to the ongoing dialogue about faith, culture, and Black Greek Letter Organizations. Dr. Montgomery writes with both theological depth and heartfelt conviction, offering clarity where there has often been confusion.',
  },
  {
    name: 'A.A.',
    org: 'Zeta Phi Beta Sorority, Inc.',
    initials: 'AA',
    text: 'Ignorance has had the mic too long, and this book finally cuts it off. Sacred, Not Sinful gives you receipts, clarity, and confidence to walk boldly in your calling without apology.',
  },
  {
    name: 'Rev. Dr. D.F.',
    org: 'Phi Beta Sigma Fraternity, Inc.',
    initials: 'DF',
    text: 'Sacred, Not Sinful is a scholarly examination of the cultural significance and theological implications of Black Greek Letters Organizations (BGLOs), advocating for a balanced understanding that reconciles cultural heritage with Christian faith.',
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stories from Christians in Greek Life
            </h2>
            <p className="text-xl text-muted-foreground">
              Real people finding biblical clarity and peace
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="relative hover:shadow-xl transition-all border-2 hover:border-sacred/30"
              >
                <CardContent className="pt-6">
                  <Quote className="w-10 h-10 text-sacred/20 mb-4" />
                  <p className="text-lg mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 bg-sacred/10">
                      <AvatarFallback className="bg-sacred/20 text-sacred font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.org}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};