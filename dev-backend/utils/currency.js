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

/**
 * 사람에게 보여줄 기호 (2026-09-17 Irene 「MYR을 안써. 다 RM으로 표시해」).
 *
 * 저장·비교는 ISO 코드(MYR)로 한다 — Stripe 가 `myr` 만 받고 플랜 가격표도 코드로 찾는다.
 * **사람이 보는 자리(인보이스 품목 설명·PDF·메일)에는 코드가 아니라 기호를 쓴다.**
 * 표는 `routes/currencies.js` 의 것과 같아야 한다(그쪽이 화면에 내려주는 목록이다).
 */
const CODE_TO_SYMBOL = {
  MYR: 'RM', RM: 'RM', USD: '$', KRW: '₩', SGD: 'S$', THB: '฿', JPY: '¥',
  EUR: '€', GBP: '£', AUD: 'A$', CNY: '¥', INR: '₹', PHP: '₱', VND: '₫',
  IDR: 'Rp', TWD: 'NT$', HKD: 'HK$', AED: 'د.إ', SAR: 'ر.س'
};

/** 코드 → 기호. 모르는 코드는 그대로 돌려준다(빈 칸보다 코드가 낫다). */
function currencySymbol(currency) {
  const c = String(currency || '').trim().toUpperCase();
  return CODE_TO_SYMBOL[c] || c;
}

module.exports = { normalizeCurrencyCode, sameCurrency, SYMBOL_TO_CODE, currencySymbol, CODE_TO_SYMBOL };
