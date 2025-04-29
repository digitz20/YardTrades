import type { CurrencyPair } from '@/types';

// Enhanced Mock data for demonstration - Prices updated slightly for realism
const cryptoPairs: CurrencyPair[] = [
  { symbol: 'BTCUSDT', price: 68543.21, percentageChange: 1.85, name: 'Bitcoin / TetherUS' },
  { symbol: 'ETHUSDT', price: 3789.50, percentageChange: 0.92, name: 'Ethereum / TetherUS' },
  { symbol: 'BNBUSDT', price: 615.30, percentageChange: -0.45, name: 'Binance Coin / TetherUS' },
  { symbol: 'SOLUSDT', price: 165.75, percentageChange: 4.10, name: 'Solana / TetherUS' }, // Changed SOL to USDT pair
  { symbol: 'DOGEUSDT', price: 0.163, percentageChange: 2.30, name: 'Dogecoin / TetherUS' }, // Changed DOGE to USDT pair
];

// Forex data kept for potential future expansion, but not currently used
const forexPairs: CurrencyPair[] = [
  { symbol: 'EURUSD', price: 1.0850, percentageChange: 0.10, name: 'Euro / US Dollar' },
  { symbol: 'GBPUSD', price: 1.2730, percentageChange: -0.05, name: 'British Pound / US Dollar' },
  { symbol: 'USDJPY', price: 155.80, percentageChange: 0.25, name: 'US Dollar / Japanese Yen' },
  { symbol: 'AUDUSD', price: 0.6650, percentageChange: -0.15, name: 'Australian Dollar / US Dollar' },
];


/**
 * Asynchronously retrieves market data.
 * Currently uses mock data for demonstration purposes.
 * In a real application, this function would fetch live data from a market data API.
 *
 * @param type The type of market data to retrieve ('crypto' or 'forex'). Defaults to 'crypto'.
 * @returns A promise that resolves to an array of CurrencyPair objects.
 */
export async function getMarketData(type: 'crypto' | 'forex' = 'crypto'): Promise<CurrencyPair[]> {
  console.log(`Fetching ${type} market data... (Using mock data)`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500)); // Increased delay slightly

  // In a real application, replace this with an actual API call
  // Example using fetch (pseudo-code):
  // try {
  //   const response = await fetch(`https://api.example.com/marketdata?type=${type}`);
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const data = await response.json();
  //   return data.pairs; // Adjust based on actual API response structure
  // } catch (error) {
  //   console.error("Error fetching market data:", error);
  //   return []; // Return empty array or throw error based on requirements
  // }

  if (type === 'forex') {
      console.log("Returning mock Forex data.");
      return forexPairs;
  }

  console.log("Returning mock Crypto data.");
  return cryptoPairs; // Default to crypto
}

// Removed getHistoricalData as it's not used in the current UI.
