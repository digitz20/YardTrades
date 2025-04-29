/**
 * Represents a currency pair.
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

/**
 * Represents historical market data for a currency pair.
 */
export interface HistoricalDataPoint {
  /**
   * The timestamp of the data point (in milliseconds).
   */
  timestamp: number;
  /**
   * The price at the timestamp.
   */
  price: number;
}

/**
 * Represents the mode of the application (crypto or forex).
 * (Currently less relevant with the new design but kept for potential future use)
 */
export type MarketMode = 'crypto' | 'forex';
