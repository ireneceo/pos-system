/**
 * Payment Terms — shared validator/builder for trade billing.
 *
 * Used by both:
 *  - SupplierContract.payment_terms (supplier ↔ buyer trade)
 *  - Restaurant.brand_billing_terms / foodcourt_billing_terms (BG/FG → restaurant trade)
 *
 * Schema:
 *   { terms: 'COD'|'NET_15'|'NET_30'|'NET_60',
 *     invoice_cycle: 'immediate'|'monthly_soa',
 *     payment_due_day: 1-31 (required when monthly_soa),
 *     credit_limit: number >= 0 (optional),
 *     currency: 3-8 char string,
 *     notes: string (sanitized) }
 *
 * NULL/undefined value at storage layer = "immediate, default" (no terms recorded).
 */
const { sanitizeString } = require('../middleware/validation');

const VALID_PAYMENT_TERMS = ['COD', 'NET_15', 'NET_30', 'NET_60'];
const VALID_INVOICE_CYCLES = ['immediate', 'monthly_soa'];

/**
 * Validate a payment_terms object.
 * Returns null on success, or a string error message on failure.
 */
function validatePaymentTerms(pt) {
  if (!pt || typeof pt !== 'object') return 'payment_terms is required';
  if (!VALID_PAYMENT_TERMS.includes(pt.terms)) {
    return `payment_terms.terms must be one of ${VALID_PAYMENT_TERMS.join(', ')}`;
  }
  if (!VALID_INVOICE_CYCLES.includes(pt.invoice_cycle)) {
    return `payment_terms.invoice_cycle must be one of ${VALID_INVOICE_CYCLES.join(', ')}`;
  }
  if (pt.invoice_cycle === 'monthly_soa') {
    const d = parseInt(pt.payment_due_day, 10);
    if (!Number.isFinite(d) || d < 1 || d > 31) {
      return 'payment_terms.payment_due_day must be 1-31 when invoice_cycle=monthly_soa';
    }
  } else if (pt.payment_due_day !== undefined && pt.payment_due_day !== null) {
    const d = parseInt(pt.payment_due_day, 10);
    if (!Number.isFinite(d) || d < 0 || d > 31) {
      return 'payment_terms.payment_due_day must be 0-31';
    }
  }
  if (pt.credit_limit !== undefined && pt.credit_limit !== null) {
    const cl = parseFloat(pt.credit_limit);
    if (!Number.isFinite(cl) || cl < 0) {
      return 'payment_terms.credit_limit must be a non-negative number';
    }
  }
  if (pt.currency !== undefined && pt.currency !== null) {
    if (typeof pt.currency !== 'string' || pt.currency.length < 3 || pt.currency.length > 8) {
      return 'payment_terms.currency must be a 3-8 character string';
    }
  }
  return null;
}

/**
 * Normalize a payment_terms object for storage. Casts numbers, uppercases currency,
 * sanitizes notes. Caller must validate first via validatePaymentTerms().
 */
function buildPaymentTerms(pt) {
  return {
    terms: pt.terms,
    invoice_cycle: pt.invoice_cycle,
    payment_due_day: pt.payment_due_day !== undefined && pt.payment_due_day !== null
      ? parseInt(pt.payment_due_day, 10) : null,
    credit_limit: pt.credit_limit !== undefined && pt.credit_limit !== null
      ? parseFloat(pt.credit_limit) : null,
    currency: pt.currency ? String(pt.currency).toUpperCase() : null,
    notes: pt.notes ? sanitizeString(String(pt.notes)) : null
  };
}

module.exports = {
  VALID_PAYMENT_TERMS,
  VALID_INVOICE_CYCLES,
  validatePaymentTerms,
  buildPaymentTerms
};
