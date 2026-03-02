/**
 * Currency formatting utility
 * Centralized currency display logic for the entire application
 */

export interface CurrencyConfig {
  symbol: string;
  name: string;
  decimals: number;
}

export interface CurrencyData {
  code: string;
  symbol: string;
  name: string;
  decimals: number;
}

// Complete currency configurations
// Both MYR (ISO code) and RM (local convention) are supported for Malaysian Ringgit
export const CURRENCY_CONFIG: Record<string, CurrencyConfig> = {
  MYR: { symbol: 'RM', name: 'Malaysian Ringgit', decimals: 2 },
  RM: { symbol: 'RM', name: 'Malaysian Ringgit', decimals: 2 },
  USD: { symbol: '$', name: 'US Dollar', decimals: 2 },
  KRW: { symbol: '₩', name: 'Korean Won', decimals: 0 },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', decimals: 2 },
  THB: { symbol: '฿', name: 'Thai Baht', decimals: 2 },
  JPY: { symbol: '¥', name: 'Japanese Yen', decimals: 0 },
  EUR: { symbol: '€', name: 'Euro', decimals: 2 },
  GBP: { symbol: '£', name: 'British Pound', decimals: 2 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', decimals: 2 },
  CNY: { symbol: '¥', name: 'Chinese Yuan', decimals: 2 },
  INR: { symbol: '₹', name: 'Indian Rupee', decimals: 2 },
  PHP: { symbol: '₱', name: 'Philippine Peso', decimals: 2 },
  VND: { symbol: '₫', name: 'Vietnamese Dong', decimals: 0 },
  IDR: { symbol: 'Rp', name: 'Indonesian Rupiah', decimals: 0 },
  TWD: { symbol: 'NT$', name: 'Taiwan Dollar', decimals: 0 },
  HKD: { symbol: 'HK$', name: 'Hong Kong Dollar', decimals: 2 }
};

/**
 * Get currency decimals
 * @param currencyCode - Currency code
 * @returns Number of decimal places
 */
export function getCurrencyDecimals(currencyCode: string): number {
  return CURRENCY_CONFIG[currencyCode]?.decimals ?? 2;
}

/**
 * Get currency name
 * @param currencyCode - Currency code
 * @returns Currency name
 */
export function getCurrencyName(currencyCode: string): string {
  return CURRENCY_CONFIG[currencyCode]?.name || currencyCode;
}

/**
 * Get all available currencies as array
 * @returns Array of currency data
 */
export function getAllCurrencies(): CurrencyData[] {
  return Object.entries(CURRENCY_CONFIG).map(([code, config]) => ({
    code,
    ...config
  }));
}

/**
 * Format a number as currency with the specified currency code
 * @param amount - The amount to format
 * @param currencyCode - Currency code (RM, USD, KRW, etc.)
 * @param showDecimals - Whether to show decimal places (default: based on currency config)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | string,
  currencyCode: string = 'RM',
  showDecimals?: boolean
): string {
  const config = CURRENCY_CONFIG[currencyCode];
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    const symbol = config?.symbol || currencyCode;
    return `${symbol} 0`;
  }

  // Determine if we should show decimals
  const decimals = showDecimals !== undefined
    ? (showDecimals ? 2 : 0)
    : (config?.decimals ?? 2);

  // Format the number
  const formattedAmount = numAmount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  // Use symbol if available
  const symbol = config?.symbol || currencyCode;
  return `${symbol} ${formattedAmount}`;
}

/**
 * Apply cash rounding to an amount
 * @param amount - The amount to round
 * @param precision - Rounding precision (0.05, 0.10, 0.50, 1.00)
 * @returns Rounded amount
 */
export function applyCashRounding(amount: number, precision: number): number {
  if (precision <= 0) return amount;
  return Math.round(amount / precision) * precision;
}

/**
 * Format currency with rounding applied
 * @param amount - The amount to format
 * @param currencyCode - Currency code
 * @param cashRounding - Cash rounding precision (0 = no rounding)
 * @param applyRounding - Whether to apply rounding
 * @returns Formatted currency string with rounding applied
 */
export function formatCurrencyWithRounding(
  amount: number,
  currencyCode: string = 'RM',
  cashRounding: number = 0,
  applyRounding: boolean = false
): string {
  const finalAmount = applyRounding && cashRounding > 0
    ? applyCashRounding(amount, cashRounding)
    : amount;

  return formatCurrency(finalAmount, currencyCode);
}

/**
 * Get currency symbol for display
 * @param currencyCode - Currency code
 * @returns Currency symbol
 */
export function getCurrencySymbol(currencyCode: string): string {
  return CURRENCY_CONFIG[currencyCode]?.symbol || currencyCode;
}

// Map legacy/local currency symbols to ISO codes
const SYMBOL_TO_CODE: Record<string, string> = {
  RM: 'MYR',
};

/**
 * Normalize a currency value to its ISO code.
 * Converts legacy symbols (e.g., 'RM') to ISO codes ('MYR').
 */
export function normalizeCurrencyCode(currency: string): string {
  return SYMBOL_TO_CODE[currency] || currency;
}

/**
 * Parse amount for currency (respecting decimals)
 * @param amount - Amount to parse
 * @param currencyCode - Currency code
 * @returns Parsed number
 */
export function parseAmount(amount: string | number, currencyCode: string = 'USD'): number {
  const decimals = getCurrencyDecimals(currencyCode);
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) return 0;

  return Number(numAmount.toFixed(decimals));
}
