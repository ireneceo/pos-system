'use strict';

/**
 * Currency normalization — mirrors dev-frontend/src/utils/currency.ts.
 *
 * Stores/compares ISO 4217 codes. Legacy/display symbols (e.g. "RM") map to the
 * ISO code ("MYR"). RM is the Malaysian Ringgit symbol, MYR is its ISO code —
 * the same currency. Without this, a strict string compare treats RM != MYR and
 * wrongly blocks purchase orders between a restaurant saved as "RM" and a brand
 * saved as "MYR" (with MIN Cafe production report, 2026-06-18).
 */

const SYMBOL_TO_CODE = {
  RM: 'MYR'
};

/** Normalize a currency value to its ISO code. Returns input unchanged if already ISO/unknown. */
function normalizeCurrencyCode(currency) {
  if (currency == null) return currency;
  const c = String(currency).trim();
  return SYMBOL_TO_CODE[c] || c;
}

/** True when two currency values represent the same currency (symbol-insensitive). */
function sameCurrency(a, b) {
  return normalizeCurrencyCode(a) === normalizeCurrencyCode(b);
}

module.exports = { normalizeCurrencyCode, sameCurrency, SYMBOL_TO_CODE };
