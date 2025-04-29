/**
 * Represents a currency pair with its market data.
 * Used for displaying live market prices (e.g., on the homepage).
 */
export interface CurrencyPair {
  /**
   * The trading symbol of the currency pair (e.g., BTCUSDT, ETHUSDT, EURUSD).
   * This is typically used as a unique identifier.
   */
  symbol: string;
  /**
   * The current trading price of the currency pair.
   */
  price: number;
  /**
   * The percentage change in price over a defined period (e.g., the last 24 hours).
   * Positive values indicate an increase, negative values indicate a decrease.
   */
  percentageChange: number;
   /**
   * Optional user-friendly name of the pair (e.g., Bitcoin / TetherUS, Euro / US Dollar).
   * Provides more context than just the symbol.
   */
   name?: string;
}

// Removed HistoricalDataPoint interface as it's no longer used.
// Removed MarketMode type as it's no longer used.
