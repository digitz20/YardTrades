
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, DollarSign, BarChart, Users, Bitcoin, TrendingUp, Loader2 } from 'lucide-react';
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

export default function Home() {
  const [cryptoData, setCryptoData] = useState<CurrencyPair[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMarketData() {
      setIsLoading(true);
      try {
        // In a real app, fetch live data here from an API
        // For now, we use the mock service
        const data = await getMarketData('crypto');
        setCryptoData(data);
      } catch (error) {
        console.error("Failed to load market data:", error);
        // Handle error state if needed
      } finally {
        setIsLoading(false);
      }
    }
    loadMarketData();
    // Optional: Set up an interval to refresh data periodically
    // const intervalId = setInterval(loadMarketData, 30000); // Refresh every 30 seconds
    // return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-background py-20 md:py-32 text-foreground overflow-hidden">
        {/* High-quality Crypto Background Image Suggestion */}
        <Image
          src="https://picsum.photos/seed/cryptohero/1920/1080" // Placeholder - Replace with actual high-quality crypto background
          alt="Cryptocurrency background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-20 blur-sm"
          priority // Load image early
        />
        <div className="absolute inset-0 bg-black/50 z-0"></div> {/* Dark overlay for text contrast */}
         <div className="container mx-auto px-4 relative z-10">
           {/* Removed grid layout, content centered or takes full width */}
           <div className="max-w-3xl mx-auto text-center md:text-left"> {/* Centered content for single column */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight text-white shadow-lg">
                Secure & Profitable <span className="text-primary">Investments</span> Platform
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                Invest with confidence. YardTrades offers secure, high-yield investment plans tailored for your financial growth. Start building your future today.
              </p>
              {/* Updated Button Container: Using flex and centering */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                {/* Button: "Start Trading" links to signup */}
                <Button size="lg" asChild>
                  <Link href="/signup">Start Trading</Link>
                </Button>
                {/* Button: "View Trading Plans" links to plans section */}
                <Button size="lg" variant="outline" asChild className="border-gray-300 text-gray-100 hover:bg-white/10 hover:text-white">
                   <Link href="/#plans">View Trading Plans</Link>
                </Button>
                {/* Button: Functional Invest in Crypto button */}
                <Button size="lg" variant="secondary" asChild>
                    <Link href="/crypto-invest">
                         <Bitcoin className="mr-2 h-5 w-5" /> Invest in Crypto
                    </Link>
                </Button>
              </div>
            </div>
             {/* Image div removed */}
         </div>
      </section>

       {/* Live Market Data Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Live Cryptocurrency Market</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Track the latest prices and trends in the crypto market. (Data is illustrative)
          </p>
          <Card className="overflow-hidden shadow-lg">
            <CardHeader className="bg-card border-b border-border/50 px-4 py-3">
              <CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary"/> Market Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading market data...</span>
                </div>
              ) : cryptoData.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/60">
                      <TableHead className="pl-4">Name</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="text-right">Price (USD)</TableHead>
                      <TableHead className="text-right pr-4">Change (24h)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cryptoData.map((pair) => (
                      <TableRow key={pair.symbol} className="hover:bg-card/50">
                        <TableCell className="font-medium pl-4">{pair.name || pair.symbol}</TableCell>
                        <TableCell className="text-muted-foreground">{pair.symbol}</TableCell>
                        <TableCell className="text-right font-mono">${pair.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className={cn(
                          "text-right pr-4 font-medium",
                          pair.percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
                        )}>
                          {pair.percentageChange >= 0 ? '+' : ''}{pair.percentageChange.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  Market data currently unavailable.
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
            {investmentPlans.map((plan) => (
              <Card key={plan.id} className="bg-card border border-border/50 shadow-lg flex flex-col hover:shadow-primary/20 transition-shadow duration-300">
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
                           <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                           <span>{feature}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                   <Button className="w-full mt-auto" asChild>
                       {/* Updated Button: Links to signup with plan pre-selection if needed */}
                       <Link href={`/signup?plan=${plan.id}`}>Invest Now</Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Snippet Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1">
               <h3 className="text-primary font-semibold mb-2">About YardTrades</h3>
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Trusted Partner in Financial Growth</h2>
               <p className="text-muted-foreground mb-6">
                 YardTrades is a leading investment company committed to providing transparent and profitable opportunities. Our team of experts utilizes cutting-edge strategies to maximize your returns while ensuring the security of your funds.
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
             <div className="order-1 md:order-2 relative h-80 md:h-96">
                {/* Replace with a relevant company or team image */}
                <Image
                   src="https://picsum.photos/seed/teamwork/600/450" // Placeholder image
                   alt="YardTrades Team"
                   layout="fill"
                   objectFit="cover"
                   className="rounded-lg shadow-xl"
                />
             </div>
          </div>
        </div>
      </section>

       {/* Call to Action Section */}
       <section className="py-16 md:py-24 bg-primary/10 relative overflow-hidden">
            {/* Optional subtle background texture */}
            <div className="absolute inset-0 opacity-5 bg-[url('/path/to/texture.svg')]"></div>
           <div className="container mx-auto px-4 text-center relative z-10">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Earning?</h2>
               <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                   Join thousands of satisfied investors who trust YardTrades. Create your account today.
               </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <Button size="lg" asChild>
                       <Link href="/signup">Create Free Account</Link>
                   </Button>
                   {/* Invest in Crypto button was MOVED to Hero section */}
               </div>
           </div>
       </section>

    </div>
  );
}
