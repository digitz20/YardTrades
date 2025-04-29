import type { CurrencyPair } from '@/types';

// Mock data for potential future use, but not currently displayed
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
 * Currently not used in the main page, but kept for potential future use.
 * @param type The type of market data ('crypto' or 'forex'). Defaults to 'crypto'.
 * @returns A promise that resolves to an array of CurrencyPair objects.
 */
export async function getMarketData(type: 'crypto' | 'forex' = 'crypto'): Promise<CurrencyPair[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (type === 'forex') return forexPairs;
  return cryptoPairs; // Default to crypto
}

// Removed getHistoricalData as it's not used in the current UI.
