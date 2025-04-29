
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
 * Attempts to fetch live data from CoinGecko (free tier), falling back to mock data on error.
 *
 * @param type The type of market data to retrieve ('crypto' or 'forex'). Defaults to 'crypto'.
 * @returns A promise that resolves to an array of CurrencyPair objects.
 */
export async function getMarketData(type: 'crypto' | 'forex' = 'crypto'): Promise<CurrencyPair[]> {
 if (type === 'crypto') {
    console.log(`Attempting to fetch live ${type} market data from CoinGecko...`);
    try {
      // Using CoinGecko API as it has free public endpoints suitable for basic display
      const assetsToFetch = ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'dogecoin'];
      // Fetch top 5 coins by market cap, getting current price and 24h change vs USD
      const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetsToFetch.join(',')}&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h&locale=en`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'accept': 'application/json' // Required header for CoinGecko API
        }
        // No API key needed for this public CoinGecko endpoint
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`CoinGecko HTTP error! status: ${response.status}, body: ${errorBody}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("CoinGecko API Response Data:", data); // Reduced logging verbosity

      if (!Array.isArray(data)) {
          console.error("CoinGecko API response is not an array:", data);
          throw new Error("Invalid API response format from CoinGecko.");
      }

      const processedData: CurrencyPair[] = data.map((item: any) => {
        // console.log("Mapping CoinGecko item:", item); // Uncomment for detailed item logging if needed
        const symbol = (item.symbol + 'USD').toUpperCase(); // e.g., BTCUSD
        const name = item.name + " / US Dollar"; // e.g., Bitcoin / US Dollar
        const price = item.current_price;
        // Make sure to use the correct field name for 24h percentage change
        const percentageChange = item.price_change_percentage_24h;

        // Basic validation
        if (typeof item.symbol !== 'string' || typeof name !== 'string' || typeof price !== 'number' || typeof percentageChange !== 'number') {
          console.warn(`Invalid data types for item ${item.id}: symbol=${item.symbol}, name=${name}, price=${price}, change=${percentageChange}. Skipping.`);
          return null; // Skip this item if data is invalid
        }

        return {
          symbol: symbol,
          price: price,
          percentageChange: percentageChange,
          name: name,
        };
      })
      .filter((item: CurrencyPair | null): item is CurrencyPair => item !== null); // Filter out any null items


        if (processedData.length === 0){
           console.warn("CoinGecko returned no valid data for the requested assets. Using fallback crypto data.");
           return [...cryptoPairs]; // Return a copy of mock data
        }

        console.log("Successfully fetched and processed live crypto data from CoinGecko."); // Reduced logging verbosity
        return processedData;

    } catch (error) {
      console.error("Error fetching or processing live market data from CoinGecko:", error);
      console.log("Falling back to mock crypto data.");
      return [...cryptoPairs]; // Fallback to a copy of mock data on any error
    }
  } else if (type === 'forex') {
    console.log("Returning mock Forex data. (Live fetching not implemented)");
    // Forex data fetching not implemented, return mock data
    return [...forexPairs]; // Return a copy
  }

  // Default fallback if type is somehow neither crypto nor forex
  console.log("Unknown type requested, returning mock crypto data.");
  return [...cryptoPairs]; // Return a copy
}
