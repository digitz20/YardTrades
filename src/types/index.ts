/**
 * Represents a currency pair.
 * (Currently not used in the main page, but kept for potential future use)
 */
export interface CurrencyPair {
  /**
   * The symbol of the currency pair (e.g., BTCUSD, EURUSD).
   */
  symbol: string;
  /**
   * The current price of the currency pair.
   */
  price: number;
  /**
   * The percentage change in price over a certain period (e.g., 24h).
   */
  percentageChange: number;
   /**
   * Optional full name of the pair (e.g., Bitcoin / US Dollar).
   */
   name?: string;
}

// Removed HistoricalDataPoint interface as it's no longer used.
// Removed MarketMode type as it's no longer used.
