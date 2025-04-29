"use client";

import type { CurrencyPair, MarketMode } from '@/types';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { getMarketData } from '@/services/market-data';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketDataTableProps {
  mode: MarketMode;
  onSelectPair: (symbol: string) => void;
  selectedPair: string | null;
}

export function MarketDataTable({ mode, onSelectPair, selectedPair }: MarketDataTableProps) {
  const [data, setData] = useState<CurrencyPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const marketData = await getMarketData(mode);
        setData(marketData);
      } catch (err) {
        console.error("Failed to fetch market data:", err);
        setError("Failed to load market data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // Set interval for auto-refresh (e.g., every 30 seconds)
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId); // Cleanup interval on component unmount

  }, [mode]);

  const formatPrice = (price: number) => {
    // Adjust formatting based on typical crypto/forex price scales
    if (price > 1000) {
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (price < 1 && price > 0) {
         return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    }
    else {
        return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 }); // Forex typical precision
    }
  }

  const formatPercentageChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  }

  const renderSkeleton = () => (
    Array.from({ length: 4 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-5 w-16" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-5 w-12" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <Table>
      <TableCaption>
        {error ? (
           <span className="text-destructive">{error}</span>
        ) : (
          `Live ${mode === 'crypto' ? 'Cryptocurrency' : 'Forex'} Market Data. Click a row to see the chart.`
        )}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Change (24h)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? renderSkeleton() : (
          data.map((pair) => (
            <TableRow
              key={pair.symbol}
              onClick={() => onSelectPair(pair.symbol)}
              className={cn(
                "cursor-pointer hover:bg-secondary/80 transition-colors",
                 selectedPair === pair.symbol ? 'bg-secondary' : ''
               )}
              aria-selected={selectedPair === pair.symbol}
             >
              <TableCell className="font-medium flex items-center gap-2">
                 {/* Placeholder Icon - Replace with actual icons later if needed */}
                 <div className="w-4 h-4 bg-muted rounded-full flex items-center justify-center text-xs font-bold">
                    {pair.symbol.charAt(0)}
                 </div>
                {pair.symbol}
              </TableCell>
              <TableCell className="text-right">{formatPrice(pair.price)}</TableCell>
              <TableCell
                className={cn(
                  "text-right flex items-center justify-end gap-1",
                  pair.percentageChange >= 0 ? "text-green-600" : "text-red-600" // Direct Tailwind colors for positive/negative
                )}
              >
                {pair.percentageChange >= 0 ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                {formatPercentageChange(pair.percentageChange)}
              </TableCell>
            </TableRow>
          ))
        )}
        {!loading && data.length === 0 && !error && (
            <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No data available for this market.
                </TableCell>
            </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
