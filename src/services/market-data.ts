import type { CurrencyPair, HistoricalDataPoint, MarketMode } from '@/types';

/**
 * Asynchronously retrieves market data for a given set of currency pairs based on the mode.
 * Uses mock data for demonstration.
 * @param mode The market mode ('crypto' or 'forex').
 * @returns A promise that resolves to an array of CurrencyPair objects.
 */
export async function getMarketData(mode: MarketMode): Promise<CurrencyPair[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (mode === 'crypto') {
    return [
      { symbol: 'BTCUSD', price: 67500.50, percentageChange: 2.15 },
      { symbol: 'ETHUSD', price: 3450.75, percentageChange: -0.80 },
      { symbol: 'SOLUSD', price: 150.20, percentageChange: 5.30 },
      { symbol: 'DOGEUSD', price: 0.15, percentageChange: 1.50 },
    ];
  } else { // mode === 'forex'
    return [
      { symbol: 'EURUSD', price: 1.0850, percentageChange: 0.10 },
      { symbol: 'GBPUSD', price: 1.2730, percentageChange: -0.05 },
      { symbol: 'USDJPY', price: 155.80, percentageChange: 0.25 },
      { symbol: 'AUDUSD', price: 0.6650, percentageChange: -0.15 },
    ];
  }
}

/**
 * Asynchronously retrieves historical market data for a given currency pair.
 * Uses mock data for demonstration.
 * @param symbol The symbol of the currency pair.
 * @returns A promise that resolves to an array of HistoricalDataPoint objects.
 */
export async function getHistoricalData(symbol: string): Promise<HistoricalDataPoint[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 700));

    const now = Date.now();
    const data: HistoricalDataPoint[] = [];
    let startPrice: number;

    // Determine start price based on symbol (simple mock logic)
    if (symbol.includes('BTC')) startPrice = 67000;
    else if (symbol.includes('ETH')) startPrice = 3400;
    else if (symbol.includes('SOL')) startPrice = 145;
    else if (symbol.includes('DOGE')) startPrice = 0.145;
    else if (symbol.includes('EUR')) startPrice = 1.0830;
    else if (symbol.includes('GBP')) startPrice = 1.2720;
    else if (symbol.includes('JPY')) startPrice = 155.50;
    else if (symbol.includes('AUD')) startPrice = 0.6640;
    else startPrice = 100; // Default fallback

    // Generate 24 hourly data points for the last day
    for (let i = 23; i >= 0; i--) {
        const timestamp = now - i * 60 * 60 * 1000; // i hours ago
        // Simulate price fluctuation - simple random walk
        const priceChange = (Math.random() - 0.49) * (startPrice * 0.005); // Smaller fluctuation
        const price = parseFloat((startPrice + priceChange * (24 - i)).toFixed(symbol.length > 6 ? 4 : 2)); // Adjust precision
        data.push({ timestamp, price });
    }

    return data;
}
