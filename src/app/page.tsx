
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, DollarSign, BarChart, Users, Bitcoin, TrendingUp, Loader2, Zap } from 'lucide-react'; // Added Zap
import Image from 'next/image';
import { getMarketData } from '@/services/market-data'; // Import service
import type { CurrencyPair } from '@/types'; // Import type
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

// Mock investment plan data
const investmentPlans = [
  {
    title: 'Starter Plan',
    minDeposit: '$100',
    maxDeposit: '$999',
    duration: '24 Hours',
    roi: '10%',
    features: ['Instant Withdrawal', '24/7 Support'],
    id: 'starter',
  },
  {
    title: 'Silver Plan',
    minDeposit: '$1000',
    maxDeposit: '$4999',
    duration: '48 Hours',
    roi: '25%',
    features: ['Instant Withdrawal', '24/7 Support', 'Dedicated Manager'],
    id: 'silver',
  },
  {
    title: 'Gold Plan',
    minDeposit: '$5000',
    maxDeposit: '$100000',
    duration: '72 Hours',
    roi: '60%',
    features: ['Instant Withdrawal', '24/7 Support', 'Dedicated Manager', 'Premium Signals'],
    id: 'gold',
  },
];

// Simple Bitcoin animation component
const FloatingBitcoin = ({ className, delay = 0, duration = 5000 }: { className?: string; delay?: number; duration?: number }) => (
    <div
        className={cn(
            'absolute opacity-10 text-yellow-400/40 animate-float',
            className
        )}
        style={{
            animationDelay: `${delay}ms`,
            animationDuration: `${duration}ms`,
        }}
    >
        <Bitcoin className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
    </div>
);


export default function Home() {
  const [cryptoData, setCryptoData] = useState<CurrencyPair[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMarketData() {
      setIsLoading(true);
      try {
        // Fetch live data using the updated service
        const data = await getMarketData('crypto');
        setCryptoData(data);
      } catch (error) {
        console.error("Failed to load market data:", error);
        // Fallback to empty or mock data handled within getMarketData
      } finally {
        setIsLoading(false);
      }
    }
    loadMarketData();
    // Optional: Set up an interval to refresh data periodically
    const intervalId = setInterval(loadMarketData, 60000); // Refresh every 60 seconds
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-24 md:py-40 text-foreground overflow-hidden isolate"> {/* Use isolate to contain absolute elements */}
         {/* Animated Icons Background Layer */}
         <div className="absolute inset-0 z-[-1] opacity-70"> {/* z-[-1] places it behind content */}
            {/* More floating icons */}
            <FloatingBitcoin className="top-1/4 left-5 sm:left-10" delay={0} duration={6000} />
            <FloatingBitcoin className="bottom-1/4 right-5 sm:right-10" delay={500} duration={7000} />
            <FloatingBitcoin className="top-1/3 right-1/4" delay={1000} duration={5500} />
            <FloatingBitcoin className="bottom-1/3 left-1/4" delay={1500} duration={6500} />
             <FloatingBitcoin className="top-1/2 left-1/3" delay={800} duration={7200} />
             <FloatingBitcoin className="bottom-1/5 right-1/3" delay={300} duration={6800} />
              {/* Add other animated elements like lines or shapes if desired */}
               <div className="absolute top-10 right-10 opacity-10 animate-pulse delay-1200 duration-[4000ms]">
                  <TrendingUp className="h-12 w-12 text-green-400/30" />
              </div>
              <div className="absolute bottom-10 left-10 opacity-10 animate-bounce delay-700 duration-[4500ms]">
                  <DollarSign className="h-10 w-10 text-blue-400/30" />
              </div>
         </div>
         {/* Subtle pattern overlay */}
         <div className="absolute inset-0 bg-[radial-gradient(theme(colors.primary/0.03)_1px,transparent_1px)] [background-size:16px_16px] z-[-1] opacity-30"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[-1]"></div> {/* Gradient overlay */}
         {/* Background Image */}
         <Image
            src="https://picsum.photos/seed/crypto_bg/1920/1080" // Placeholder image - replace with a high-quality, relevant one
            alt="Cryptocurrency background"
            layout="fill"
            objectFit="cover"
            quality={85}
            className="absolute inset-0 z-[-2] opacity-20 pointer-events-none" // Place behind other elements, low opacity
          />

         <div className="container mx-auto px-4 relative z-10">
           <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-white drop-shadow-lg animate-fade-in-up"> {/* Added animation */}
                Secure & Profitable <span className="text-primary">Investments</span> Platform
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 animate-fade-in-up animation-delay-200"> {/* Added animation */}
                Invest with confidence. YardTrades offers secure, high-yield investment plans tailored for your financial growth. Start building your future today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400"> {/* Added animation */}
                 <Button size="lg" variant="secondary" asChild className="hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-primary/40">
                     <Link href="/crypto-invest">
                         <Bitcoin className="mr-2 h-5 w-5 animate-pulse" /> Invest in Crypto
                    </Link>
                 </Button>
                <Button size="lg" asChild className="hover:scale-105 transition-transform duration-300 shadow-lg">
                    <Link href="/signup">Start Trading</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-gray-400 text-gray-100 hover:bg-white/10 hover:text-white hover:scale-105 transition-transform duration-300 shadow-lg">
                    <Link href="/#plans">View Trading Plans</Link>
                </Button>
              </div>
            </div>
         </div>
      </section>

       {/* Live Market Data Section */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Live Cryptocurrency Market</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Track the latest prices and trends in the crypto market. (Data updates periodically)
          </p>
          <Card className="overflow-hidden shadow-xl border border-border/60">
            <CardHeader className="bg-card/80 border-b border-border/50 px-4 py-3">
              <CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary"/> Market Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Loading market data...</span>
                </div>
              ) : cryptoData.length > 0 ? (
                <div className="overflow-x-auto"> {/* Ensure table is responsive */}
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/60 transition-colors">
                          <TableHead className="pl-4 py-3 font-semibold">Name</TableHead>
                          <TableHead className="py-3 font-semibold">Symbol</TableHead>
                          <TableHead className="text-right py-3 font-semibold">Price (USD)</TableHead>
                          <TableHead className="text-right pr-4 py-3 font-semibold">Change (24h)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cryptoData.map((pair) => (
                          <TableRow key={pair.symbol} className="hover:bg-card/50 transition-colors border-b border-border/30 last:border-b-0">
                            <TableCell className="font-medium pl-4 py-4">{pair.name || pair.symbol}</TableCell>
                            <TableCell className="text-muted-foreground py-4">{pair.symbol}</TableCell>
                            <TableCell className="text-right font-mono py-4">${pair.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            <TableCell className={cn(
                              "text-right pr-4 font-medium py-4",
                              pair.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
                            )}>
                              {pair.percentageChange >= 0 ? '+' : ''}{pair.percentageChange.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  Market data currently unavailable. Please try again later.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Investment Plans Section */}
      <section id="plans" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Investment Plans</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the plan that best suits your investment goals and start earning returns quickly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentPlans.map((plan, index) => (
              <Card
                key={plan.id}
                className="bg-card border border-border/50 shadow-lg flex flex-col hover:shadow-primary/20 transition-all duration-300 group hover:-translate-y-2 transform" // Added hover effect
                style={{ animationDelay: `${index * 100}ms` }} // Staggered animation
               >
                <CardHeader className="bg-muted/30 p-6 border-b border-border/40">
                  <CardTitle className="text-2xl font-semibold text-primary">{plan.title}</CardTitle>
                   <CardDescription>Min: {plan.minDeposit} | Max: {plan.maxDeposit}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col justify-between">
                   <div>
                     <div className="text-4xl font-bold mb-4 text-foreground">{plan.roi} <span className="text-lg font-normal text-muted-foreground">ROI</span></div>
                     <p className="text-muted-foreground mb-6">Duration: {plan.duration}</p>
                     <ul className="space-y-3 mb-8">
                       {plan.features.map((feature, fIndex) => (
                         <li key={fIndex} className="flex items-center gap-2 text-sm">
                           <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                           <span>{feature}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                   <Button className="w-full mt-auto group-hover:bg-primary/90 transition-colors duration-300" asChild>
                       <Link href="/crypto-invest">Invest Now</Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Snippet Section */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1">
               <h3 className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">About YardTrades</h3>
               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Your Trusted Partner in Financial Growth</h2>
               <p className="text-muted-foreground mb-6 leading-relaxed">
                 YardTrades is a leading investment company committed to providing transparent and profitable opportunities. Our team of experts utilizes cutting-edge strategies to maximize your returns while ensuring the security of your funds.
               </p>
               <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-4 group">
                      <div className="p-2 bg-primary/10 rounded-full mt-1 group-hover:scale-110 transition-transform">
                          <DollarSign className="h-5 w-5 text-primary flex-shrink-0" />
                      </div>
                      <div>
                         <h4 className="font-semibold text-foreground">Competitive Returns</h4>
                         <p className="text-sm text-muted-foreground">Benefit from our high-yield plans designed for optimal profitability.</p>
                     </div>
                  </li>
                   <li className="flex items-start gap-4 group">
                       <div className="p-2 bg-primary/10 rounded-full mt-1 group-hover:scale-110 transition-transform">
                          <BarChart className="h-5 w-5 text-primary flex-shrink-0" />
                       </div>
                       <div>
                          <h4 className="font-semibold text-foreground">Expert Management</h4>
                          <p className="text-sm text-muted-foreground">Our experienced professionals manage your investments effectively.</p>
                      </div>
                   </li>
                   <li className="flex items-start gap-4 group">
                       <div className="p-2 bg-primary/10 rounded-full mt-1 group-hover:scale-110 transition-transform">
                          <Users className="h-5 w-5 text-primary flex-shrink-0" />
                       </div>
                       <div>
                          <h4 className="font-semibold text-foreground">Client-Focused</h4>
                          <p className="text-sm text-muted-foreground">We prioritize your financial success and provide dedicated support.</p>
                       </div>
                   </li>
               </ul>
               <Button variant="outline" asChild className="hover:scale-105 transition-transform duration-300 hover:bg-primary/5">
                    <Link href="/about">More About Us</Link>
               </Button>
             </div>
             <div className="order-1 md:order-2 relative h-80 md:h-96 group">
                <Image
                   src="https://picsum.photos/seed/teamwork/800/600" // High-quality placeholder
                   alt="YardTrades Team Collaboration"
                   layout="fill"
                   objectFit="cover"
                   className="rounded-lg shadow-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg opacity-50 group-hover:opacity-70 transition-opacity"></div> {/* Subtle overlay */}
             </div>
          </div>
        </div>
      </section>

       {/* Call to Action Section */}
       <section className="py-20 md:py-32 bg-gradient-to-tr from-primary/20 via-primary/5 to-background relative overflow-hidden">
             {/* More Background Elements */}
             <div className="absolute -bottom-1/4 -left-10 opacity-5 animate-spin-slow pointer-events-none">
                  <Zap className="h-64 w-64 text-blue-500/30" />
              </div>
               <div className="absolute -top-1/4 -right-10 opacity-5 animate-pulse duration-[6000ms] pointer-events-none">
                  <Bitcoin className="h-72 w-72 text-yellow-400/20" />
              </div>
           <div className="container mx-auto px-4 text-center relative z-10">
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-md">Ready to Start Earning?</h2>
               <p className="text-lg text-gray-200 mb-10 max-w-xl mx-auto">
                   Join thousands of satisfied investors who trust YardTrades. Create your account today and unlock your financial potential.
               </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <Button size="lg" asChild className="hover:scale-105 transition-transform duration-300 shadow-lg bg-white text-primary hover:bg-gray-100">
                        <Link href="/signup">Create Free Account</Link>
                   </Button>
                    <Button size="lg" variant="outline" asChild className="border-gray-400 text-gray-100 hover:bg-white/10 hover:text-white hover:scale-105 transition-transform duration-300 shadow-lg">
                       <Link href="/contact">Contact Support</Link>
                   </Button>
               </div>
           </div>
       </section>

    </div>
  );
}
