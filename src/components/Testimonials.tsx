import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Marcus Johnson',
    org: 'Omega Psi Phi',
    initials: 'MJ',
    text: 'Sacred Greeks helped me process difficult conversations about faith and Greek life. The P.R.O.O.F. framework gave me biblical clarity when I needed it most.',
  },
  {
    name: 'Tiffany Williams',
    org: 'Delta Sigma Theta',
    initials: 'TW',
    text: 'I was torn between my faith and my letters. This guide helped me see I don\'t have to choose - I can honor both when I put Christ first.',
  },
  {
    name: 'David Anderson',
    org: 'Alpha Phi Alpha',
    initials: 'DA',
    text: 'The daily devotionals keep me grounded. It\'s refreshing to have Christian content specifically for Greek life that doesn\'t condemn but guides.',
  },
  {
    name: 'Jasmine Carter',
    org: 'Zeta Phi Beta',
    initials: 'JC',
    text: 'When pressure came to denounce my org, Sacred Greeks gave me a biblical framework to respond with grace and wisdom. Forever grateful!',
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