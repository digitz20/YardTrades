import type { CurrencyPair } from '@/types';

// Keep mock data as a fallback
const cryptoPairs: CurrencyPair[] = [
  { symbol: 'BTCUSDT', price: 68543.21, percentageChange: 1.85, name: 'Bitcoin / TetherUS' },
  { symbol: 'ETHUSDT', price: 3789.50, percentageChange: 0.92, name: 'Ethereum / TetherUS' },
  { symbol: 'BNBUSDT', price: 615.30, percentageChange: -0.45, name: 'Binance Coin / TetherUS' },
  { symbol: 'SOLUSDT', price: 165.75, percentageChange: 4.10, name: 'Solana / TetherUS' },
  { symbol: 'DOGEUSDT', price: 0.163, percentageChange: 2.30, name: 'Dogecoin / TetherUS' },
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
 * Attempts to fetch live data from CoinAPI, falling back to mock data on error.
 *
 * @param type The type of market data to retrieve ('crypto' or 'forex'). Defaults to 'crypto'.
 * @returns A promise that resolves to an array of CurrencyPair objects.
 */
export async function getMarketData(type: 'crypto' | 'forex' = 'crypto'): Promise<CurrencyPair[]> {
  // Only fetch live data for crypto
  if (type === 'crypto') {
    console.log(`Attempting to fetch live ${type} market data...`);
    try {
      const apiKey = process.env.COINAPI_API_KEY; // Ensure this is set in your .env file
      if (!apiKey) {
        console.warn("COINAPI_API_KEY not found in environment variables. Falling back to mock data.");
        return cryptoPairs;
      }

      // Example API endpoint (adjust based on your chosen API and desired data)
      // This example fetches data for specific assets, you might want a different endpoint
      const assetsToFetch = ['BTC', 'ETH', 'BNB', 'SOL', 'DOGE']; // Example assets
      const apiUrl = `https://rest.coinapi.io/v1/assets?filter_asset_id=${assetsToFetch.join(',')}`;

      const response = await fetch(apiUrl, {
        headers: {
          'X-CoinAPI-Key': apiKey,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        // Log specific error from API if available
        const errorBody = await response.text();
        console.error(`CoinAPI HTTP error! status: ${response.status}, body: ${errorBody}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Process the data to match the CurrencyPair interface
      // Note: CoinAPI free tier might not provide percentage change directly.
      // Using volume_1day as a placeholder for percentageChange here. Adjust as needed.
      const processedData: CurrencyPair[] = data
        .filter((item: any) => item.price_usd !== undefined && item.type_is_crypto === 1) // Filter for crypto assets with USD price
        .map((item: any) => ({
          symbol: item.asset_id + 'USD', // Assume price is in USD, create symbol like BTCUSD
          price: item.price_usd,
          // Free CoinAPI likely won't give % change easily. Use volume or a fixed value.
          // Using volume_1day as a placeholder - NOT accurate percentage change.
          percentageChange: item.volume_1day_usd ? (item.volume_1day_usd / 1000000) % 5 : Math.random() * 5 - 2.5, // Placeholder calculation
          name: item.name,
        }))
        // Limit to a reasonable number, e.g., the first 5 results
        .slice(0, 5);

        // If API returns fewer than expected assets, supplement with mock data? (Optional)
        // if (processedData.length < cryptoPairs.length) { ... }

        console.log("Successfully fetched and processed live crypto data.");
        return processedData;

    } catch (error) {
      console.error("Error fetching or processing live market data:", error);
      console.log("Falling back to mock crypto data.");
      return cryptoPairs; // Fallback to mock data on any error
    }
  } else if (type === 'forex') {
    console.log("Returning mock Forex data.");
    // Forex data fetching not implemented, return mock data
    return forexPairs;
  }

  // Default fallback if type is somehow neither crypto nor forex
  console.log("Unknown type requested, returning mock crypto data.");
  return cryptoPairs;
}
