
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Added CardDescription
import { TrendingUp, ShieldCheck, BarChart2, Users, Award, LifeBuoy, Target, Zap } from 'lucide-react'; // Added Target, Zap
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator'; // Import Separator

const services = [
  {
    icon: TrendingUp,
    title: 'Investment Management',
    description: 'Active portfolio management strategies tailored to maximize returns based on your risk tolerance and specific financial goals.',
  },
  {
    icon: BarChart2,
    title: 'Financial Planning',
    description: 'Comprehensive financial advisory and planning services to help you map out a clear path towards your financial future.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Assessment & Mitigation',
    description: 'Thorough analysis of potential investment risks, coupled with strategies designed to protect your capital and ensure informed decisions.',
  },
  {
    icon: Users, // Consider UserCheck or Briefcase?
    title: 'Retirement Planning',
    description: 'Personalized retirement strategies and investment plans designed to help you achieve a comfortable and financially secure retirement.',
  },
    {
    icon: Award, // Consider Gem or Crown?
    title: 'Wealth Management',
    description: 'A holistic, high-touch approach to managing the complex financial affairs of high-net-worth individuals, families, and institutions.',
  },
   {
    icon: LifeBuoy,
    title: 'Dedicated Client Support',
    description: 'Access to dedicated 24/7 customer support to promptly assist you with any queries, issues, or guidance you may encounter.',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-secondary/20 via-background to-background py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(hsl(var(--primary-foreground))_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <Zap className="absolute top-1/3 right-16 h-16 w-16 text-primary/15 opacity-40 animate-pulse duration-4000" />
         <BarChart2 className="absolute bottom-1/4 left-16 h-20 w-20 text-primary/15 opacity-40 animate-bounce delay-700" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Financial Services</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the comprehensive suite of financial services Yard Trades provides to empower your investment journey and secure your financial objectives.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-card border border-border/50 shadow-lg text-center transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1.5 flex flex-col">
                <CardHeader className="flex flex-col items-center pt-6 pb-4">
                   <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block border border-primary/20 transform transition-transform hover:scale-110">
                     <service.icon className="h-8 w-8 text-primary" />
                   </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 flex-grow"> {/* Ensure content pushes footer down */}
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </CardContent>
                 {/* Optional: Add a Learn More button per service */}
                 {/* <CardFooter className="p-6 pt-0 mt-auto">
                    <Button variant="link" className="text-primary p-0 h-auto">Learn More</Button>
                 </CardFooter> */}
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Why Choose Us Section */}
       <section className="py-16 md:py-24 bg-secondary/40">
         <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-1 md:order-1"> {/* Text first */}
               <h3 className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">Why Choose Yard Trades?</h3>
               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Expertise, Security, and Tangible Results</h2>
               <p className="text-muted-foreground mb-6 leading-relaxed">
                 At Yard Trades, we blend deep market expertise with stringent security protocols to deliver exceptional, consistent investment results. Our client-centric philosophy ensures your unique financial goals remain our paramount priority at every step.
               </p>
               <ul className="space-y-4 mb-8 text-sm">
                   <li className="flex items-center gap-3 group">
                       <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 group-hover:animate-pulse"/>
                       <span className="text-foreground">Robust Security & Fund Safety Measures</span>
                   </li>
                   <li className="flex items-center gap-3 group">
                       <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 group-hover:animate-pulse"/>
                       <span className="text-foreground">Proven Track Record of Profitable Returns</span>
                   </li>
                    <li className="flex items-center gap-3 group">
                       <Users className="h-5 w-5 text-primary flex-shrink-0 group-hover:animate-pulse"/>
                       <span className="text-foreground">Dedicated Team of Experienced Financial Experts</span>
                   </li>
                    <li className="flex items-center gap-3 group">
                       <LifeBuoy className="h-5 w-5 text-primary flex-shrink-0 group-hover:animate-pulse"/>
                       <span className="text-foreground">Transparent Processes & Reporting</span>
                   </li>
                   <li className="flex items-center gap-3 group">
                       <Target className="h-5 w-5 text-primary flex-shrink-0 group-hover:animate-pulse"/>
                       <span className="text-foreground">Personalized Strategies Aligned With Your Goals</span>
                   </li>
               </ul>
                 <Button asChild className="hover:scale-105 transition-transform shadow-md"><Link href="/#plans">View Investment Plans</Link></Button>
             </div>
             <div className="order-2 md:order-2 relative h-80 md:h-96 group"> {/* Image second */}
                 <Image
                   src="https://picsum.photos/seed/whychoose_services/800/600" // High-quality placeholder
                   alt="Team discussing financial charts"
                   layout="fill"
                   objectFit="cover"
                   className="rounded-lg shadow-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-60 group-hover:opacity-40 transition-opacity"></div>
             </div>
           </div>
         </div>
       </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
           <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Take Control of Your Financial Future</h2>
               <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                   Ready to experience the Yard Trades difference? Partner with us today and let our comprehensive services pave the way for your lasting financial success and security.
               </p>
               <Button size="lg" asChild className="hover:scale-105 transition-transform shadow-lg"><Link href="/signup">Get Started Today</Link></Button>
           </div>
       </section>
    </div>
  );
}
