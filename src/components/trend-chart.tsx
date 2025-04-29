"use client"

import type { HistoricalDataPoint } from '@/types';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip as ShadTooltip, // Renamed to avoid conflict
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getHistoricalData } from '@/services/market-data';

interface TrendChartProps {
  symbol: string | null;
}

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--accent))", // Use accent color from theme
  },
} satisfies ChartConfig;

export function TrendChart({ symbol }: TrendChartProps) {
  const [data, setData] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistoricalData() {
      if (!symbol) {
        setLoading(false);
        setData([]);
        setError(null);
        return;
      };

      setLoading(true);
      setError(null);
      try {
        const historicalData = await getHistoricalData(symbol);
        setData(historicalData);
      } catch (err) {
        console.error("Failed to fetch historical data:", err);
        setError(`Failed to load chart data for ${symbol}.`);
      } finally {
        setLoading(false);
      }
    }

    fetchHistoricalData();
  }, [symbol]);

  const formatTimestamp = (timestamp: number) => {
    return format(new Date(timestamp), 'HH:mm'); // Format as HH:mm for hourly data
  };

  const formatTooltipLabel = (value: number) => {
      return format(new Date(value), 'MMM d, HH:mm');
  }

  const formatPrice = (price: number) => {
     if (!symbol) return price.toFixed(2);
    // Adjust formatting based on typical crypto/forex price scales
    if (symbol.includes('USD') && price > 1000) { // Likely Crypto like BTC/ETH
        return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (symbol.includes('USD') && price < 10) { // Likely Forex or low-value crypto
         return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 4 });
    } else if (symbol.includes('JPY')) { // Yen pairs often have no decimals
        return price.toLocaleString('en-US', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    else { // Default Forex
        return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 4 });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {symbol ? `${symbol} Price Trend (Last 24 Hours)` : 'Select a Pair'}
        </CardTitle>
        <CardDescription>
          {symbol ? 'Hourly price movement over the past day.' : 'Click on a symbol in the table to view its trend.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : error ? (
            <div className="h-[300px] flex items-center justify-center text-destructive">{error}</div>
        ): !symbol ? (
             <div className="h-[300px] flex items-center justify-center text-muted-foreground">No currency pair selected.</div>
        ) : data.length === 0 ? (
             <div className="h-[300px] flex items-center justify-center text-muted-foreground">No historical data available for {symbol}.</div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                 <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatTimestamp}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval="preserveStartEnd" // Show first and last tick clearly
                  minTickGap={50} // Adjust gap between ticks
                   style={{ fontSize: '0.75rem', fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                   domain={['auto', 'auto']}
                   tickFormatter={formatPrice}
                   tickLine={false}
                   axisLine={false}
                   tickMargin={8}
                   width={80} // Adjust width for longer price labels
                   style={{ fontSize: '0.75rem', fill: 'hsl(var(--muted-foreground))' }}
                 />
                <ShadTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="dot"
                        labelFormatter={formatTooltipLabel}
                        formatter={(value) => formatPrice(value as number)}
                        />
                      }
                 />
                <Area
                  dataKey="price"
                  type="monotone"
                  fill="url(#fillPrice)"
                  fillOpacity={0.4}
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
