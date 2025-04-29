"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, DollarSign, BarChart, Users } from 'lucide-react';
import Image from 'next/image';

// Mock investment plan data
const investmentPlans = [
  {
    title: 'Starter Plan',
    minDeposit: '$100',
    maxDeposit: '$999',
    duration: '24 Hours',
    roi: '10%',
    features: ['Instant Withdrawal', '24/7 Support'],
  },
  {
    title: 'Silver Plan',
    minDeposit: '$1000',
    maxDeposit: '$4999',
    duration: '48 Hours',
    roi: '25%',
    features: ['Instant Withdrawal', '24/7 Support', 'Dedicated Manager'],
  },
  {
    title: 'Gold Plan',
    minDeposit: '$5000',
    maxDeposit: '$100000',
    duration: '72 Hours',
    roi: '60%',
    features: ['Instant Withdrawal', '24/7 Support', 'Dedicated Manager', 'Premium Signals'],
  },
];

export default function Home() {
  return (
    <div className="flex flex-col"> {/* Removed min-h-screen as Footer handles height */}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-background to-background py-20 md:py-32 text-foreground">
        {/* Optional: Add a subtle background image or pattern here */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div> {/* Dark overlay */}
         <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
                Secure & Profitable <span className="text-primary">Investments</span> Platform
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Invest with confidence. Yard Trades offers secure, high-yield investment plans tailored for your financial growth. Start building your future today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                   <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
             <div className="hidden md:block">
                {/* Replace with a relevant illustration or image */}
                <Image
                    src="https://picsum.photos/seed/invest/600/400" // Placeholder image
                    alt="Investment illustration"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl object-cover"
                 />
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans Section */}
      <section id="plans" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Investment Plans</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the plan that best suits your investment goals and start earning returns quickly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentPlans.map((plan, index) => (
              <Card key={index} className="bg-card border border-border/50 shadow-lg flex flex-col">
                <CardHeader className="bg-muted/30 p-6">
                  <CardTitle className="text-2xl font-semibold text-primary">{plan.title}</CardTitle>
                   <CardDescription>Min: {plan.minDeposit} | Max: {plan.maxDeposit}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col justify-between">
                   <div>
                     <div className="text-4xl font-bold mb-4">{plan.roi} <span className="text-lg font-normal text-muted-foreground">ROI</span></div>
                     <p className="text-muted-foreground mb-6">Duration: {plan.duration}</p>
                     <ul className="space-y-2 mb-8">
                       {plan.features.map((feature, fIndex) => (
                         <li key={fIndex} className="flex items-center gap-2">
                           <CheckCircle className="h-5 w-5 text-green-500" />
                           <span>{feature}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                   <Button className="w-full mt-auto" asChild>
                       <Link href="/signup">Invest Now</Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Snippet Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1">
               <h3 className="text-primary font-semibold mb-2">About Yard Trades</h3>
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Trusted Partner in Financial Growth</h2>
               <p className="text-muted-foreground mb-6">
                 Yard Trades is a leading investment company committed to providing transparent and profitable opportunities. Our team of experts utilizes cutting-edge strategies to maximize your returns while ensuring the security of your funds.
               </p>
               <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                      <DollarSign className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                         <h4 className="font-semibold">Competitive Returns</h4>
                         <p className="text-sm text-muted-foreground">Benefit from our high-yield plans designed for optimal profitability.</p>
                     </div>
                  </li>
                   <li className="flex items-start gap-3">
                      <BarChart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                       <div>
                          <h4 className="font-semibold">Expert Management</h4>
                          <p className="text-sm text-muted-foreground">Our experienced professionals manage your investments effectively.</p>
                      </div>
                   </li>
                   <li className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                       <div>
                          <h4 className="font-semibold">Client-Focused</h4>
                          <p className="text-sm text-muted-foreground">We prioritize your financial success and provide dedicated support.</p>
                       </div>
                   </li>
               </ul>
               <Button variant="outline" asChild>
                 <Link href="/about">More About Us</Link>
               </Button>
             </div>
             <div className="order-1 md:order-2">
                {/* Replace with a relevant company or team image */}
                <Image
                   src="https://picsum.photos/seed/teamwork/600/450" // Placeholder image
                   alt="Yard Trades Team"
                   width={600}
                   height={450}
                   className="rounded-lg shadow-xl object-cover"
                />
             </div>
          </div>
        </div>
      </section>

       {/* Call to Action Section */}
       <section className="py-16 md:py-24 bg-primary/10">
           <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Earning?</h2>
               <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                   Join thousands of satisfied investors who trust Yard Trades. Create your account today and take the first step towards financial freedom.
               </p>
               <Button size="lg" asChild>
                   <Link href="/signup">Create Free Account</Link>
               </Button>
           </div>
       </section>


       {/* Removed Chart Cards and Hero Text Sections */}
       {/* Removed Chat Widget Placeholder */}
       {/* Footer is now handled in layout.tsx */}
    </div>
  );
}
