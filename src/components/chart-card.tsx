"use client";

import type { CurrencyPair, HistoricalDataPoint } from '@/types';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip as ShadTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getMarketData, getHistoricalData } from '@/services/market-data';
import { ArrowUpRight, ArrowDownRight, Bitcoin, Coins /* other icons */ } from 'lucide-react'; // Import necessary icons
import { cn } from '@/lib/utils';

interface ChartCardProps {
  symbol: string;
}

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))", // Using chart-1 color from theme
  },
} satisfies ChartConfig;

// Map symbols to icons (add more as needed)
const symbolIconMap: Record<string, React.ElementType> = {
    BTC: Bitcoin,
    ETH: Coins, // Using Coins as a placeholder for ETH
    BNB: Coins, // Using Coins as a placeholder for BNB
    // Add Forex icons if needed, e.g. EUR: Euro, GBP: PoundSterling etc.
};

// Helper to get the base currency for icon lookup
const getBaseCurrency = (symbol: string): string => {
    if (symbol.endsWith('USDT') || symbol.endsWith('USD')) {
        return symbol.replace(/USDT$|USD$/, '');
    }
     if (symbol.endsWith('JPY')) {
        return symbol.replace(/JPY$/, '');
    }
     if (symbol.startsWith('USD')) {
        return symbol.substring(3); // e.g., USDJPY -> JPY
    }
    // Add more specific logic if needed
    return symbol.substring(0, 3); // Default guess
};

export function ChartCard({ symbol }: ChartCardProps) {
  const [pairData, setPairData] = useState<CurrencyPair | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch current pair data (adjust getMarketData if needed, or fetch single)
        const marketData = await getMarketData('crypto'); // Assuming crypto for now
        const currentPair = marketData.find(p => p.symbol === symbol);
        setPairData(currentPair || null);

        // Fetch historical data
        const histData = await getHistoricalData(symbol);
        setHistoricalData(histData);

      } catch (err) {
        console.error(`Failed to fetch data for ${symbol}:`, err);
        setError(`Failed to load data for ${symbol}.`);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // Optional: Add refresh interval if needed
    // const intervalId = setInterval(fetchData, 60000); // Refresh every minute
    // return () => clearInterval(intervalId);

  }, [symbol]);

  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return <Skeleton className="h-6 w-24" />;
    // Adjust formatting based on typical crypto/forex price scales
    if (price > 100) {
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (price < 10 && price > 0) {
         return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    } else { // Default
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }

   const formatPercentageChange = (change: number | undefined) => {
    if (change === undefined) return <Skeleton className="h-5 w-16" />;
    const sign = change >= 0 ? '+' : '';
    const value = `(${Math.abs(change * (pairData?.price ?? 0) / 100).toFixed(2)})`; // Calculate absolute change
    return (
        <span className={cn(change >= 0 ? "text-green-500" : "text-red-500")}>
             {sign}{change.toFixed(2)}% {value}
        </span>
    );
   }

    const formatTooltipLabel = (value: number) => {
      return format(new Date(value), 'MMM d, HH:mm');
    }

     const formatXAxisTick = (timestamp: number) => {
        // Show month for first/last tick? Or specific intervals. Simplified for now.
         const date = new Date(timestamp);
         const month = format(date, 'MMM');
         // Simple logic: Show month roughly quarterly based on timestamp relative to data range
         // This is a basic heuristic and might need refinement based on actual data span
         if (historicalData.length > 0) {
             const firstTimestamp = historicalData[0].timestamp;
             const lastTimestamp = historicalData[historicalData.length - 1].timestamp;
             const range = lastTimestamp - firstTimestamp;
             const position = timestamp - firstTimestamp;

             // Show month at start, end, and roughly middle points
            if (position < range * 0.1 || position > range * 0.9 || (position > range * 0.45 && position < range * 0.55)) {
                 // Show year if data spans across years
                if (format(new Date(firstTimestamp), 'yyyy') !== format(new Date(lastTimestamp), 'yyyy')) {
                    return format(date, 'MMM yyyy');
                }
                 return month;
            }
         }

         return ''; // Don't show tick label otherwise to avoid clutter
    };

    const IconComponent = symbolIconMap[getBaseCurrency(symbol)] || Activity; // Fallback icon

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border/30 shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
         {loading ? (
             <>
                 <Skeleton className="h-6 w-2/5 mb-1" />
                 <Skeleton className="h-4 w-1/3" />
             </>
         ) : pairData ? (
             <>
                <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg font-semibold">{pairData.symbol}</CardTitle>
                    </div>
                    {/* Placeholder for TradingView-like icon */}
                    <div className="h-5 w-5 bg-muted rounded-sm flex items-center justify-center text-xs font-mono text-muted-foreground">
                        TV
                    </div>
                </div>
                <CardDescription className="text-xs text-muted-foreground">
                    {getBaseCurrency(symbol)} / TetherUS {/* Adjust logic for non-USDT pairs */}
                </CardDescription>
            </>
         ) : (
             <CardTitle className="text-lg font-semibold text-destructive">{symbol} Data Unavailable</CardTitle>
         )}
      </CardHeader>
      <CardContent>
        <div className="mb-4">
            <div className="text-2xl font-bold tracking-tight">
                {formatPrice(pairData?.price)}
            </div>
            <div className="text-sm font-medium">
                {formatPercentageChange(pairData?.percentageChange)}
            </div>
        </div>

        {/* Chart */}
        <div className="h-[120px] w-full -ml-4 -mr-4"> {/* Adjusted height and negative margins */}
            {loading ? (
                <Skeleton className="h-full w-full" />
            ) : error ? (
                 <div className="h-full flex items-center justify-center text-destructive text-sm">{error}</div>
            ) : historicalData.length === 0 ? (
                 <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No chart data.</div>
            ) : (
              <ChartContainer config={chartConfig} className="h-full w-full p-0">
                <ResponsiveContainer>
                   <AreaChart data={historicalData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                     <defs>
                       <linearGradient id={`fillPrice-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
                         <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                       </linearGradient>
                     </defs>
                     <XAxis
                        dataKey="timestamp"
                        tickFormatter={formatXAxisTick}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        interval="preserveStartEnd"
                        minTickGap={60} // Adjust gap
                        style={{ fontSize: '0.65rem', fill: 'hsl(var(--muted-foreground))' }}
                     />
                     <ShadTooltip
                        cursor={false}
                        content={
                           <ChartTooltipContent
                            hideIndicator // Hide default indicator
                            labelFormatter={formatTooltipLabel}
                             formatter={(value) => (
                                <div className="text-sm font-semibold">{formatPrice(value as number)}</div>
                             )}
                             />
                        }
                     />
                     <Area
                        dataKey="price"
                        type="monotone"
                        fill={`url(#fillPrice-${symbol})`}
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        dot={false}
                     />
                   </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
