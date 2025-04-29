import type { CurrencyPair, HistoricalDataPoint, MarketMode } from '@/types';

// Keep existing mock data for getMarketData
const cryptoPairs: CurrencyPair[] = [
  { symbol: 'BTCUSDT', price: 94968.88, percentageChange: 1.30, name: 'Bitcoin / TetherUS' },
  { symbol: 'ETHUSDT', price: 1798.10, percentageChange: 0.38, name: 'Ethereum / TetherUS' },
  { symbol: 'BNBUSDT', price: 605.81, percentageChange: 0.39, name: 'Binance Coin / TetherUS' },
  { symbol: 'SOLUSD', price: 150.20, percentageChange: 5.30, name: 'Solana / US Dollar' },
  { symbol: 'DOGEUSD', price: 0.15, percentageChange: 1.50, name: 'Dogecoin / US Dollar' },
];

const forexPairs: CurrencyPair[] = [
  { symbol: 'EURUSD', price: 1.0850, percentageChange: 0.10, name: 'Euro / US Dollar' },
  { symbol: 'GBPUSD', price: 1.2730, percentageChange: -0.05, name: 'British Pound / US Dollar' },
  { symbol: 'USDJPY', price: 155.80, percentageChange: 0.25, name: 'US Dollar / Japanese Yen' },
  { symbol: 'AUDUSD', price: 0.6650, percentageChange: -0.15, name: 'Australian Dollar / US Dollar' },
];


/**
 * Asynchronously retrieves market data.
 * Uses mock data for demonstration.
 * @param mode The market mode ('crypto' or 'forex'). Can be omitted if only one type is needed.
 * @returns A promise that resolves to an array of CurrencyPair objects.
 */
export async function getMarketData(mode?: MarketMode): Promise<CurrencyPair[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (mode === 'crypto') return cryptoPairs;
  if (mode === 'forex') return forexPairs;
  // Default: return crypto if mode is not specified or invalid
  return cryptoPairs;
}

/**
 * Asynchronously retrieves historical market data for a given currency pair.
 * Uses mock data styled after the screenshot charts.
 * @param symbol The symbol of the currency pair (e.g., BTCUSDT).
 * @returns A promise that resolves to an array of HistoricalDataPoint objects.
 */
export async function getHistoricalData(symbol: string): Promise<HistoricalDataPoint[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const now = Date.now();
    const data: HistoricalDataPoint[] = [];
    // Find the starting price from our mock current data for consistency
    const currentPair = cryptoPairs.find(p => p.symbol === symbol) || forexPairs.find(p => p.symbol === symbol);
    let startPrice = currentPair ? currentPair.price / (1 + currentPair.percentageChange / 100) : 100; // Estimate a start price based on current and change

    // Adjust start price slightly for visual variety if needed
     if (symbol.includes('BTC')) startPrice *= 0.98;
     else if (symbol.includes('ETH')) startPrice *= 0.99;
     else if (symbol.includes('BNB')) startPrice *= 0.985;


    const points = 60; // Generate more points for a smoother-looking chart (approx 2 months if daily)
    const timeSpan = 60 * 24 * 60 * 60 * 1000; // Approx 60 days in ms

    // More realistic fluctuation simulation
    let price = startPrice;
    for (let i = points -1 ; i >= 0; i--) {
        const timestamp = now - (i * timeSpan / points);
        // Simulate volatility - random walk with slight upward bias for gainers
        const volatility = 0.015; // Base volatility percentage
        const bias = currentPair && currentPair.percentageChange > 0 ? 0.001 : -0.0005; // Slight drift up/down
        const randomFactor = (Math.random() - 0.5 + bias) * 2; // More centered random number with bias
        const priceChange = price * volatility * randomFactor;

        price += priceChange;
        // Ensure price doesn't go negative (unlikely for these values but good practice)
        price = Math.max(price, 0);

        // Determine precision based on symbol/price magnitude
        let precision = 2;
        if (symbol.includes('JPY')) precision = 0;
        else if (price < 10) precision = 4;
        else if (price < 1000) precision = 2;


        data.push({ timestamp, price: parseFloat(price.toFixed(precision)) });
    }

    return data;
}
