import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Pastor Demetrius Logwood',
    org: 'Charity Missionary Baptist Church',
    initials: 'DL',
    text: 'This rigorous research bridges the gap between Black Greek Letter Organizations and the church community. Sacred Greeks reminds us that spreading the gospel takes on many forms.',
  },
  {
    name: 'Alexis Allen',
    org: 'Zeta Phi Beta Sorority, Inc.',
    initials: 'AA',
    text: 'Ignorance has had the mic too long, and Sacred Greeks finally cuts it off. You get biblical guidance, clarity, and confidence to walk boldly in your calling without apology.',
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Others Are Saying…
            </h2>
            <p className="text-xl text-muted-foreground">
              Real people finding biblical clarity and peace
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Video Testimonial */}
            <Card className="overflow-hidden border-2 border-sacred/20 animate-fade-in">
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
                <div className="p-4 bg-card">
                  <p className="font-semibold">Chris Reed</p>
                  <p className="text-sm text-muted-foreground">Video Testimonial</p>
                </div>
              </CardContent>
            </Card>

            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="relative hover:shadow-xl transition-all duration-300 border-2 hover:border-sacred/30 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 0.15}s` }}
              >
                <CardContent className="pt-4 pb-4">
                  <Quote className="w-8 h-8 text-sacred/20 mb-3 transition-transform duration-300 hover:scale-110" />
                  <p className="text-base mb-4 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 bg-sacred/10 transition-transform duration-300 hover:scale-110">
                      <AvatarFallback className="bg-sacred/20 text-sacred font-semibold text-sm">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
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