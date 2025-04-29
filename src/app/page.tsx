"use client";

import React from 'react';
import { Header } from '@/components/header';
import { ChartCard } from '@/components/chart-card';
import { ChatWidgetPlaceholder } from '@/components/chat-widget-placeholder';

// Define the pairs to display based on the screenshot
const displayPairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Chart Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {displayPairs.map((symbol) => (
            <ChartCard key={symbol} symbol={symbol} />
          ))}
        </div>

        {/* Hero Text Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Built By Traders
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary">
            For Traders
          </h2>
        </section>
      </main>

      <ChatWidgetPlaceholder />

      <footer className="py-6 text-center text-muted-foreground text-xs border-t border-border mt-auto">
        <p>&copy; {new Date().getFullYear()} NovaxTrades Clone. All rights reserved.</p>
        <p className="mt-1">Data is mocked for demonstration purposes. Not financial advice.</p>
      </footer>
    </div>
  );
}
