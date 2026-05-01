/**
 * Centralised "an invoice just became paid" hook.
 *
 * Background: v3.20 added SOA cascade *inside* each paid endpoint's transaction
 * (PUT/:id, /:id/payment, /:id/confirm-payment, /:id/capture-paypal-order), but
 * the *external* side-effects of a paid invoice — restoring the suspended
 * subscription and (Phase 1B+) crediting the referrer's wallet — were copy-pasted
 * unevenly across paths and missing entirely on the PayPal capture and
 * confirm-payment endpoints. This helper consolidates them into one call so
 * adding a new side-effect later only touches one file.
 *
 * Caller contract:
 *   - The invoice row has already been persisted with status='paid' and the
 *     enclosing transaction (with any SOA cascade) has COMMITTED.
 *   - This is fire-and-forget at the call site: each side-effect is
 *     individually try/catched so a downstream failure (mail server, etc.)
 *     does not surface as a 500 to the payer.
 *
 * NOT designed for: in-flight (uncommitted) invoices. Call this AFTER commit.
 */

const subscriptionScheduler = require('./subscriptionScheduler');
const referralService = require('./referralService');
const Invoice = require('../models/Invoice');
const { sequelize } = require('../config/database');

async function handleInvoicePaid(invoiceOrId) {
  if (!invoiceOrId) return;
  const id = typeof invoiceOrId === 'object' ? (invoiceOrId.id ?? invoiceOrId.get?.('id')) : invoiceOrId;
  if (!id) return;

  // Re-fetch to see the post-cascade row. Callers often pass the pre-update
  // instance and we want to honour the actual persisted state.
  const fresh = await Invoice.findByPk(id);
  if (!fresh || fresh.status !== 'paid') return;

  // 1. Subscription restore — POS subscription invoices tied to a restaurant.
  //    BG/FG/Owner self subscriptions are restored elsewhere via subscription_status.
  if (fresh.invoice_category === 'subscription' && fresh.restaurant_id) {
    try {
      const result = await subscriptionScheduler.restoreSubscription(fresh.restaurant_id);
      if (result?.success) {
        console.log(`[handleInvoicePaid] subscription restored for restaurant ${fresh.restaurant_id}`);
      }
    } catch (e) {
      console.error('[handleInvoicePaid] subscription restore failed:', e.message);
    }
  }

  // 2. Referral commission. Self-guarded — processCommission internally checks
  //    issuer_type, invoice_category, parent_soa_invoice_id, payer.referred_by,
  //    and the unique (invoice_id, referrer_id) constraint for idempotency.
  try {
    await sequelize.transaction(async (t) => {
      await referralService.processCommission(fresh, { transaction: t });
    });
  } catch (e) {
    console.error('[handleInvoicePaid] referral commission failed:', e.message);
  }
}

/**
 * Counterpart to handleInvoicePaid: an invoice that was previously 'paid' has
 * been moved out of that state (refund, status reset, deletion). Reverses the
 * referral commission tied to that invoice so the referrer's wallet stays in
 * sync with actual paid revenue.
 *
 * Caller contract:
 *   - Pass either an invoice instance/id. The id is the only thing the
 *     reversal needs (commission rows store invoice_id as a value, not a live FK),
 *     so it is safe to call BEFORE or AFTER deleting the invoice row.
 *   - Fire-and-forget; failures are logged but do not surface to the caller.
 */
async function handleInvoiceCancelled(invoiceOrId, reason) {
  if (!invoiceOrId) return;
  const id = typeof invoiceOrId === 'object' ? (invoiceOrId.id ?? invoiceOrId.get?.('id')) : invoiceOrId;
  if (!id) return;

  try {
    await sequelize.transaction(async (t) => {
      await referralService.cancelCommissionsForInvoice(id, reason || 'Invoice no longer paid', { transaction: t });
    });
  } catch (e) {
    console.error('[handleInvoiceCancelled] referral cancellation failed:', e.message);
  }
}

module.exports = { handleInvoicePaid, handleInvoiceCancelled };
