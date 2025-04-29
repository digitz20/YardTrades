
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, ShieldCheck, BarChart2, Users, Award, LifeBuoy } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    icon: TrendingUp,
    title: 'Investment Management',
    description: 'Active portfolio management to maximize returns based on your risk tolerance and financial goals.',
  },
  {
    icon: BarChart2,
    title: 'Financial Planning',
    description: 'Comprehensive financial planning services to help you map out your financial future effectively.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Assessment',
    description: 'Thorough analysis of potential risks associated with investments to ensure informed decisions.',
  },
  {
    icon: Users,
    title: 'Retirement Planning',
    description: 'Strategies and plans designed to help you achieve a comfortable and secure retirement.',
  },
    {
    icon: Award,
    title: 'Wealth Management',
    description: 'Holistic approach to managing the financial affairs of high-net-worth individuals and families.',
  },
   {
    icon: LifeBuoy,
    title: 'Client Support',
    description: 'Dedicated 24/7 customer support to assist you with any queries or issues you may encounter.',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Page Header */}
      <section className="bg-secondary/30 py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the comprehensive range of financial services Yard Trades offers to help you achieve your investment objectives.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-card border border-border/50 shadow-lg text-center hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader className="flex flex-col items-center">
                   <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                     <service.icon className="h-8 w-8 text-primary" />
                   </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       {/* Why Choose Us Section */}
       <section className="py-16 md:py-24 bg-secondary/30">
         <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h3 className="text-primary font-semibold mb-2">Why Choose Yard Trades?</h3>
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Expertise, Security, and Results</h2>
               <p className="text-muted-foreground mb-6">
                 We combine market expertise with robust security measures to deliver exceptional investment results. Our client-centric approach ensures your financial goals are always our top priority.
               </p>
               <ul className="space-y-4 mb-8 text-sm">
                   <li className="flex items-center gap-3">
                       <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0"/>
                       <span>Proven track record of success</span>
                   </li>
                   <li className="flex items-center gap-3">
                       <TrendingUp className="h-5 w-5 text-primary flex-shrink-0"/>
                       <span>Transparent processes and reporting</span>
                   </li>
                    <li className="flex items-center gap-3">
                       <Users className="h-5 w-5 text-primary flex-shrink-0"/>
                       <span>Dedicated team of financial experts</span>
                   </li>
                    <li className="flex items-center gap-3">
                       <LifeBuoy className="h-5 w-5 text-primary flex-shrink-0"/>
                       <span>Unparalleled customer support</span>
                   </li>
               </ul>
                 <Button asChild><Link href="/#plans">View Investment Plans</Link></Button>
             </div>
             <div>
                 <Image
                   src="https://picsum.photos/seed/chooseus/600/400" // Placeholder image
                   alt="Why Choose Yard Trades"
                   width={600}
                   height={400}
                   className="rounded-lg shadow-xl object-cover"
                 />
             </div>
           </div>
         </div>
       </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-background">
           <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Take Control of Your Financial Future</h2>
               <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                   Ready to experience the Yard Trades difference? Partner with us and let our services pave the way for your financial success.
               </p>
               <Button size="lg" asChild><Link href="/signup">Get Started Today</Link></Button>
           </div>
       </section>
    </div>
  );
}
