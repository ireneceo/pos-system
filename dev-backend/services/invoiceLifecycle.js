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

  // 0. 발주 원장 거울 (2026-09-11 §8-3 A-4) — 청구서가 **어느 경로로** paid 가 됐든
  //    (판매자 이체 확인·PayPal·웹훅·무료확인) 그 청구서가 나온 발주도 결제로 따라간다.
  //    전에는 `POST /invoices/:id/payment` 한 곳만 거울을 불러, 나머지 경로의 발주는 영원히 unpaid 였다.
  //    멱등(unpaid 인 발주만) · 드로어 이동 없음(가입 판매자 결제는 카드·이체다).
  try {
    const { mirrorPaidToPurchaseOrders, paidInvoiceIdsFor } = require('./purchaseOrderPayment');
    const ids = await paidInvoiceIdsFor(fresh);
    await mirrorPaidToPurchaseOrders(ids, fresh.paid_at || new Date());
  } catch (e) {
    console.error('[handleInvoicePaid] purchase order mirror failed:', e.message);
  }

  // 1. Subscription restore. Two independent lifts (both may fire for a
  //    per-branch invoice billed to a brand): the BRANCH (restaurant.status) and
  //    the ENTITY owner (user.subscription_status for BG/FG/Owner).
  //
  //    P0-1 (2026-06-08): entity-level subscriptions used to be left suspended.
  //    The comment here said they were "restored elsewhere via subscription_status"
  //    but no such path existed — processEntitySubscriptions() never reloads a
  //    SUSPENDED entity, so once suspended, paying did nothing. We now restore the
  //    entity on payment too. Category set matches hasEntityPaidInvoice
  //    ('subscription' ∪ 'pos_subscription') for consistency with the suspend side.
  const SUBSCRIPTION_CATEGORIES = ['subscription', 'pos_subscription'];
  if (SUBSCRIPTION_CATEGORIES.includes(fresh.invoice_category)) {
    // 1a. Branch (restaurant) restore — invoices tied to a specific restaurant.
    if (fresh.restaurant_id) {
      try {
        const result = await subscriptionScheduler.restoreSubscription(fresh.restaurant_id);
        if (result?.success) {
          console.log(`[handleInvoicePaid] subscription restored for restaurant ${fresh.restaurant_id}`);
        }
      } catch (e) {
        console.error('[handleInvoicePaid] subscription restore failed:', e.message);
      }
    }

    // 1b. Entity (BG/FG/Owner) restore — payer_id is the owner User's id.
    const ENTITY_PAYERS = ['brand_manager', 'foodcourt_manager', 'restaurant_owner'];
    if (ENTITY_PAYERS.includes(fresh.payer_type) && fresh.payer_id) {
      try {
        const result = await subscriptionScheduler.restoreEntitySubscription(fresh.payer_type, fresh.payer_id);
        if (result?.success && result.previousStatus) {
          console.log(`[handleInvoicePaid] entity subscription restored for ${fresh.payer_type} ${fresh.payer_id} (${result.previousStatus} → active)`);
        }
      } catch (e) {
        console.error('[handleInvoicePaid] entity subscription restore failed:', e.message);
      }
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

// ──────────────────────────────────────────────────────────────────────────
// 게이트웨이 입금 → 청구서 paid — 단일 함수 (2026-10-11 Fable 판정 F4)
// 모든 «paid 웹훅» 분기(Stripe checkout.session.completed · async_payment_succeeded ·
// payment_intent.succeeded · PayPal capture)가 이것만 부른다. 전에는 분기마다 «paid 가 아니면 paid» 를
// 따로 적어 취소·초안 청구서도 paid 로 바꿀 수 있었고, 발행자별 서명을 붙일 자리도 없었다.
// ──────────────────────────────────────────────────────────────────────────
const systemLogger = require('../utils/systemLogger');
const { GATEWAY_PAID_FROM } = require('../utils/invoicePayable');
const { sameIssuerAccount } = require('../utils/issuerAccount');

// P1-2 (2026-06-08): webhook amount cross-check. The mark-paid sites used to
// trust the event blindly and write paid_amount = invoice.total_amount. If a
// gateway reports a captured amount that is LESS than the invoice total
// (underpayment / partial capture / forged-but-cheaper event), we must NOT mark
// the invoice fully paid. Conservative by design — we only HOLD on a clear
// underpayment or a currency mismatch; when the gateway amount is unreadable we
// proceed (best-effort) so legitimate payments are never blocked by a parsing gap.
const AMOUNT_TOLERANCE = 0.01;
async function passesAmountCrossCheck(invoice, gatewayAmount, gatewayCurrency, ctx) {
  const amt = Number(gatewayAmount);
  if (!Number.isFinite(amt) || amt <= 0) return true; // can't read amount → don't block

  const expected = Number(invoice.total_amount) || 0;

  if (gatewayCurrency && invoice.currency &&
      String(gatewayCurrency).toUpperCase() !== String(invoice.currency).toUpperCase()) {
    await systemLogger.warn('payment', `${ctx.gateway}-webhook`, 'Currency mismatch on paid webhook — holding', {
      invoice: invoice.invoice_number, gateway_currency: gatewayCurrency, invoice_currency: invoice.currency,
      gateway_amount: amt, invoice_total: expected, event_id: ctx.eventId
    });
    await invoice.update({ payment_notes: `Held: gateway currency ${gatewayCurrency} ≠ invoice ${invoice.currency} (gateway amount ${amt})` });
    return false;
  }

  if (amt + AMOUNT_TOLERANCE < expected) {
    await systemLogger.error('security', `${ctx.gateway}-webhook`, 'Underpayment on paid webhook — NOT marking paid', {
      invoice: invoice.invoice_number, gateway_amount: amt, invoice_total: expected, event_id: ctx.eventId
    });
    await invoice.update({ payment_notes: `Held: gateway reported ${amt} < invoice total ${expected}` });
    return false;
  }
  return true;
}

/**
 * 게이트웨이가 확인한 입금을 청구서에 적는다.
 * @param {object} invoice  Invoice 행
 * @param {{gateway:'stripe'|'paypal', gatewayAmount:number|null, gatewayCurrency:string|null,
 *          paymentIntentId:string|null, eventId:string, verifiedIssuer:{type:string,id:number|null}}} ctx
 * @returns {Promise<'paid'|'skipped_already_paid'|'held_status'|'held_issuer'|'held_amount'>}
 */
async function markInvoicePaidFromGateway(invoice, ctx) {
  const { gateway, gatewayAmount, gatewayCurrency, paymentIntentId, eventId, verifiedIssuer } = ctx;
  if (invoice.status === 'paid') return 'skipped_already_paid';

  if (!GATEWAY_PAID_FROM.includes(invoice.status)) {
    await systemLogger.error('security', `${gateway}-webhook`, 'Paid webhook on a non-payable invoice — NOT marking paid', {
      invoice: invoice.invoice_number, status: invoice.status, event_id: eventId
    });
    await invoice.update({ payment_notes: `Held: paid webhook on ${invoice.status} invoice (event ${eventId})` });
    return 'held_status';
  }

  if (!(await sameIssuerAccount(verifiedIssuer, invoice))) {
    const v = `${verifiedIssuer?.type}${verifiedIssuer?.id ? '#' + verifiedIssuer.id : ''}`;
    const i = `${invoice.issuer_type}${invoice.issuer_id ? '#' + invoice.issuer_id : ''}`;
    await systemLogger.error('security', `${gateway}-webhook`, 'Webhook issuer does not own this invoice — NOT marking paid', {
      invoice: invoice.invoice_number, webhook_issuer: v, invoice_issuer: i, event_id: eventId
    });
    await invoice.update({ payment_notes: `Held: webhook issuer ${v} ≠ invoice issuer ${i} (event ${eventId})` });
    return 'held_issuer';
  }

  if (!(await passesAmountCrossCheck(invoice, gatewayAmount, gatewayCurrency, { gateway, eventId }))) return 'held_amount';

  await invoice.update({
    status: 'paid',
    paid_at: new Date(),
    paid_amount: invoice.total_amount,
    payment_method: gateway,
    payment_provider: gateway,
    gateway,
    payment_intent_id: paymentIntentId || invoice.payment_intent_id,
    confirmed_at: new Date(),
    confirmed_by: 0
  });
  handleInvoicePaid(invoice.id).catch(err =>
    systemLogger.warn('payment', `${gateway}-webhook`, 'invoiceLifecycle hook failed', { error: err.message }));
  await systemLogger.info('payment', `${gateway}-webhook`, `Invoice ${invoice.invoice_number} paid via ${gateway}`, { event_id: eventId });
  return 'paid';
}

module.exports = { handleInvoicePaid, handleInvoiceCancelled, markInvoicePaidFromGateway, passesAmountCrossCheck };
