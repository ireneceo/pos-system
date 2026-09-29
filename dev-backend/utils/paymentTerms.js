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
 *     notes: string (sanitized),
 *     soa_issue_day: 1-28 (monthly_soa only, default 1 — 정산서 자동 발행일),
 *     invoice_trigger: 'on_received'(default)|'on_confirmed' — 청구서 발행 시점 }
 *
 * NULL/undefined value at storage layer = "immediate, default" (no terms recorded).
 */
const { sanitizeString } = require('../middleware/validation');

const VALID_PAYMENT_TERMS = ['COD', 'NET_15', 'NET_30', 'NET_60'];
const VALID_INVOICE_CYCLES = ['immediate', 'monthly_soa'];
const VALID_INVOICE_TRIGGERS = ['on_received', 'on_confirmed'];

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
  // 정산서 발행일 — 월결제에서만 의미. 1~28(모든 달에 있는 날), 없으면 1 (2026-09-29 soa2 §5-D)
  if (pt.soa_issue_day !== undefined && pt.soa_issue_day !== null && pt.soa_issue_day !== '') {
    const d = Number(pt.soa_issue_day);
    if (!Number.isInteger(d) || d < 1 || d > 28) {
      return 'payment_terms.soa_issue_day must be an integer 1-28';
    }
  }
  // 청구서 발행 시점 — 입고 완료 시(기본) / 판매자 주문 확정 시 (2026-09-29 soa §추가 판정)
  if (pt.invoice_trigger !== undefined && pt.invoice_trigger !== null && pt.invoice_trigger !== '') {
    if (!VALID_INVOICE_TRIGGERS.includes(pt.invoice_trigger)) {
      return `payment_terms.invoice_trigger must be one of ${VALID_INVOICE_TRIGGERS.join(', ')}`;
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
    notes: pt.notes ? sanitizeString(String(pt.notes)) : null,
    soa_issue_day: pt.invoice_cycle === 'monthly_soa' && pt.soa_issue_day !== undefined && pt.soa_issue_day !== null && pt.soa_issue_day !== ''
      ? Number(pt.soa_issue_day) : null,
    invoice_trigger: pt.invoice_trigger === 'on_confirmed' ? 'on_confirmed' : 'on_received'
  };
}

module.exports = {
  VALID_PAYMENT_TERMS,
  VALID_INVOICE_CYCLES,
  VALID_INVOICE_TRIGGERS,
  validatePaymentTerms,
  buildPaymentTerms
};
