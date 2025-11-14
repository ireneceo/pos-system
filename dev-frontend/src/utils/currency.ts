/**
 * Currency formatting utility
 * Centralized currency display logic for the entire application
 */

/**
 * Format a number as currency with the specified currency code
 * @param amount - The amount to format
 * @param currencyCode - Currency code (RM, USD, SGD, JPY, THB)
 * @param showDecimals - Whether to show decimal places (default: true, false for JPY)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = 'RM',
  showDecimals?: boolean
): string {
  // Determine if we should show decimals
  const useDecimals = showDecimals !== undefined
    ? showDecimals
    : currencyCode !== 'JPY'; // JPY doesn't use decimal places

  // Format the number
  const formattedAmount = useDecimals
    ? amount.toFixed(2)
    : Math.round(amount).toString();

  // Return with currency code
  return `${currencyCode} ${formattedAmount}`;
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
  const symbols: Record<string, string> = {
    'RM': 'RM',
    'USD': '$',
    'SGD': 'S$',
    'JPY': '¥',
    'THB': '฿'
  };
  return symbols[currencyCode] || currencyCode;
}
