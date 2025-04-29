"use client";

import React, { useState, useCallback } from 'react';
import type { MarketMode } from '@/types';
import { ModeSwitcher } from '@/components/mode-switcher';
import { MarketDataTable } from '@/components/market-data-table';
import { TrendChart } from '@/components/trend-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [mode, setMode] = useState<MarketMode>('crypto');
  const [selectedPair, setSelectedPair] = useState<string | null>(null); // Default to first crypto pair on initial load

  // Set initial selected pair when mode changes or on first load
  React.useEffect(() => {
    setSelectedPair(null); // Reset selection when mode changes
    // You could automatically select the first item here if desired
    // e.g., based on the default data fetched in MarketDataTable
  }, [mode]);

  const handleModeChange = useCallback((newMode: MarketMode) => {
    setMode(newMode);
  }, []);

 const handleSelectPair = useCallback((symbol: string) => {
    setSelectedPair(symbol);
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 lg:p-12 bg-secondary/30">
      <div className="z-10 w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-primary mb-4 lg:mb-0">
          Trade Insights Dashboard
        </h1>
        <ModeSwitcher currentMode={mode} onModeChange={handleModeChange} />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-md rounded-lg overflow-hidden">
           <CardHeader>
             <CardTitle className="text-xl">{mode === 'crypto' ? 'Crypto Markets' : 'Forex Markets'}</CardTitle>
          </CardHeader>
           <CardContent className="p-0">
            <MarketDataTable mode={mode} onSelectPair={handleSelectPair} selectedPair={selectedPair} />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 shadow-md rounded-lg bg-card">
           <TrendChart symbol={selectedPair} />
        </div>
      </div>

        <footer className="mt-12 text-center text-muted-foreground text-xs">
            <Separator className="my-4 w-1/2 mx-auto" />
            Data is mocked for demonstration purposes. Not financial advice.
            <p>&copy; {new Date().getFullYear()} Trade Insights. All rights reserved.</p>
        </footer>
    </main>
  );
}
