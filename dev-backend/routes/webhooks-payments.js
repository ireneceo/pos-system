/**
 * Payment Gateway Webhooks (v3.24+)
 *
 * Stripe (4):
 *   - checkout.session.completed           (Checkout 완료 → Subscription/Invoice 매핑)
 *   - customer.subscription.created/updated/deleted  (Subscription.status mirror)
 *   - invoice.paid                          (구독 invoice 결제 성공 → PurpleHere Invoice paid)
 *   - invoice.payment_failed                (구독 invoice 실패)
 *   - payment_intent.succeeded / .payment_failed  (일회성 invoice — legacy)
 *
 * PayPal (4):
 *   - BILLING.SUBSCRIPTION.ACTIVATED        (구독 active)
 *   - BILLING.SUBSCRIPTION.UPDATED          (mirror)
 *   - BILLING.SUBSCRIPTION.CANCELLED        (취소됨)
 *   - PAYMENT.SALE.COMPLETED                (구독 monthly payment 성공)
 *   - PAYMENT.CAPTURE.COMPLETED             (일회성 invoice 성공)
 *   - PAYMENT.CAPTURE.DENIED / .DECLINED    (실패)
 *   - BILLING.SUBSCRIPTION.PAYMENT.FAILED   (구독 실패)
 *
 * 모든 webhook: signature 검증 → WebhookEvent dedupe → 처리.
 */

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Stripe = require('stripe');

const { getWebhookSecretForIssuer } = require('../utils/stripeService');
const { getWebhookIdForIssuer, getPayPalConfigForIssuer } = require('../utils/paypalService');
const Invoice = require('../models/Invoice');
const Subscription = require('../models/Subscription');
const WebhookEvent = require('../models/WebhookEvent');
const PaymentCustomer = require('../models/PaymentCustomer');
const systemLogger = require('../utils/systemLogger');
const { markInvoicePaidFromGateway, passesAmountCrossCheck } = require('../services/invoiceLifecycle');

function payloadHash(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

/**
 * Try to record event into WebhookEvent (dedupe by gateway+event_id).
 * Returns { event, isNew, dbRow }.
 */
async function recordWebhookEvent({ gateway, event_id, event_type, payload, payloadBuf }) {
  const hash = payloadHash(payloadBuf || Buffer.from(JSON.stringify(payload)));
  const [row, created] = await WebhookEvent.findOrCreate({
    where: { gateway, event_id },
    defaults: {
      gateway, event_id, event_type,
      payload_hash: hash,
      payload,
      status: 'received',
      received_at: new Date()
    }
  });
  return { isNew: created, dbRow: row };
}

async function markProcessed(row) {
  await row.update({ status: 'processed', processed_at: new Date() });
}
async function markFailed(row, err) {
  await row.update({ status: 'failed', error: String(err?.message || err).slice(0, 1000) });
}

/* ──────────────────── STRIPE ──────────────────── */

// 주소 2개, 처리 1개 (2026-10-11 Fable 판정 F3)
//   /api/webhooks/stripe                              → 발행자 system (우리 회사 Stripe — 지금 주소 그대로)
//   /api/webhooks/stripe/:issuer_type/:issuer_id      → 그 발행자(브랜드·푸드코트·공급업체)의 Stripe 계정 비밀로 검증
// 전에는 system 비밀로만 검증해, 브랜드 Stripe 에서 낸 청구서는 웹훅이 전부 서명 실패 → 돈은 빠지고 청구서는 미결제로 남았다.
// 서명이 맞아도 «그 계정이 이 청구서의 발행자인가» 는 markInvoicePaidFromGateway 가 다시 본다(발행자 일치 가드).
const ISSUER_PATH_TYPES = ['brand', 'foodcourt', 'supplier'];

router.post('/stripe', express.raw({ type: 'application/json' }), (req, res) =>
  handleStripeWebhook(req, res, { type: 'system', id: null }));

router.post('/stripe/:issuer_type/:issuer_id', express.raw({ type: 'application/json' }), (req, res) => {
  const type = req.params.issuer_type;
  const id = Number(req.params.issuer_id);
  if (!ISSUER_PATH_TYPES.includes(type) || !Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid issuer' });
  }
  return handleStripeWebhook(req, res, { type, id });
});

async function handleStripeWebhook(req, res, issuer) {
  let event;
  try {
    const sig = req.headers['stripe-signature'];
    if (!sig) return res.status(400).json({ error: 'Missing stripe-signature header' });

    let webhookSecret = null;
    try {
      webhookSecret = await getWebhookSecretForIssuer(issuer.type, issuer.id);
    } catch (e) {
      webhookSecret = null; // 없는 발행자·설정 없음 → 아래 400
    }
    if (!webhookSecret) {
      await systemLogger.warn('payment', 'stripe-webhook', 'No webhook secret configured', { issuer: `${issuer.type}${issuer.id ? '#' + issuer.id : ''}` });
      return res.status(400).json({ error: 'Webhook secret not configured' });
    }

    try {
      event = Stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      await systemLogger.error('security', 'stripe-webhook', 'Signature verification failed', { error: err.message, issuer: `${issuer.type}${issuer.id ? '#' + issuer.id : ''}` });
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }

  // dedupe
  let { isNew, dbRow } = await recordWebhookEvent({
    gateway: 'stripe',
    event_id: event.id,
    event_type: event.type,
    payload: event,
    payloadBuf: req.body
  });
  if (!isNew && dbRow.status === 'processed') {
    return res.json({ received: true, dedupe: true });
  }

  try {
    await processStripeEvent(event, issuer);
    await markProcessed(dbRow);
    res.json({ received: true });
  } catch (e) {
    await markFailed(dbRow, e);
    await systemLogger.error('payment', 'stripe-webhook', 'Event handler error', { event_type: event.type, error: e.message });
    // 200 OK 반환 — Stripe 에 retry 요청하면 dedupe 가 처리. 또는 5xx 로 retry 유도. 5xx 가 표준.
    res.status(500).json({ error: e.message });
  }
}

// 금액 대조(P1-2)와 paid 전환은 services/invoiceLifecycle.js 한 곳에 있다 (2026-10-11 F4).

/** Checkout 세션(결제 모드) → 청구서. 돈이 실제로 들어온 세션(payment_status 'paid')만 paid 로 간다.
 *  지연 결제수단은 completed 때 'unpaid' 로 오고, 입금되면 async_payment_succeeded 가 따로 온다. */
async function markSessionInvoicePaid(session, event, verifiedIssuer) {
  const invoiceId = session.metadata?.invoice_id;
  if (!invoiceId) return;
  if (session.payment_status !== 'paid') {
    await systemLogger.info('payment', 'stripe-webhook', 'Checkout completed — awaiting async payment', {
      session_id: session.id, payment_status: session.payment_status, invoice_id: invoiceId
    });
    return;
  }
  const invoice = await Invoice.findByPk(parseInt(invoiceId, 10));
  if (!invoice) return;
  const gwAmount = typeof session.amount_total === 'number' ? session.amount_total / 100 : null;
  await markInvoicePaidFromGateway(invoice, {
    gateway: 'stripe', gatewayAmount: gwAmount, gatewayCurrency: session.currency,
    paymentIntentId: session.payment_intent, eventId: event.id, verifiedIssuer
  });
}

async function processStripeEvent(event, verifiedIssuer) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      // 두 종류: subscription / payment
      if (session.mode === 'subscription') {
        const localSubId = session.metadata?.local_subscription_id || session.subscription_data?.metadata?.local_subscription_id;
        if (!localSubId) break;
        const sub = await Subscription.findByPk(parseInt(localSubId, 10));
        if (!sub) break;
        await sub.update({
          gateway_subscription_id: session.subscription || sub.gateway_subscription_id,
          gateway_customer_id: session.customer || sub.gateway_customer_id
        });
        // session 완료 시점에서는 status='active' 일 수도, 'incomplete' 일 수도. customer.subscription.created 가 정확한 status 동기화.
      } else if (session.mode === 'payment') {
        await markSessionInvoicePaid(session, event, verifiedIssuer);
      }
      break;
    }
    case 'checkout.session.async_payment_succeeded': {
      // 지연 결제수단(입금 확인이 나중에 오는 것) — 돈이 실제로 들어온 시점
      const session = event.data.object;
      if (session.mode === 'payment') await markSessionInvoicePaid(session, event, verifiedIssuer);
      break;
    }
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      const invoiceId = session.metadata?.invoice_id || session.payment_intent_data?.metadata?.invoice_id;
      if (!invoiceId) break;
      const invoice = await Invoice.findByPk(parseInt(invoiceId, 10));
      if (invoice) await invoice.update({ payment_notes: 'Stripe async payment failed' });
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const s = event.data.object;
      const sub = await Subscription.findOne({ where: { gateway: 'stripe', gateway_subscription_id: s.id } });
      if (!sub) break;
      const map = {
        active: 'active', trialing: 'trialing', past_due: 'past_due',
        canceled: 'canceled', incomplete: 'incomplete', incomplete_expired: 'canceled',
        unpaid: 'past_due', paused: 'paused'
      };
      await sub.update({
        status: map[s.status] || 'incomplete',
        current_period_start: s.current_period_start ? new Date(s.current_period_start * 1000) : sub.current_period_start,
        current_period_end: s.current_period_end ? new Date(s.current_period_end * 1000) : sub.current_period_end,
        cancel_at_period_end: !!s.cancel_at_period_end,
        canceled_at: s.canceled_at ? new Date(s.canceled_at * 1000) : sub.canceled_at
      });
      break;
    }
    case 'invoice.paid': {
      const inv = event.data.object;
      const subId = inv.subscription;
      if (!subId) break;
      const sub = await Subscription.findOne({ where: { gateway: 'stripe', gateway_subscription_id: subId } });
      if (!sub) break;
      // 새 PurpleHere Invoice 행 생성 또는 mirror — 단순화 위해 systemLogger 만 (구체 흐름은 invoiceScheduler 또는 별도 처리)
      await systemLogger.info('payment', 'stripe-webhook', `Subscription ${sub.id} cycle paid`, {
        amount: inv.amount_paid, period_end: inv.period_end
      });
      break;
    }
    case 'invoice.payment_failed': {
      const inv = event.data.object;
      const subId = inv.subscription;
      if (!subId) break;
      await systemLogger.warn('payment', 'stripe-webhook', `Subscription cycle payment failed`, {
        subId, attempt_count: inv.attempt_count
      });
      // Stripe Smart Retries 가 자동 진행 — 여기선 알림용 로그만
      break;
    }
    case 'payment_intent.succeeded': {
      // legacy invoice flow — payment_intent.metadata.invoice_id
      const pi = event.data.object;
      const invoiceId = pi.metadata?.invoice_id;
      if (!invoiceId) break;
      const invoice = await Invoice.findByPk(invoiceId);
      if (invoice) {
        const gwAmount = typeof pi.amount_received === 'number' ? pi.amount_received / 100
          : (typeof pi.amount === 'number' ? pi.amount / 100 : null);
        await markInvoicePaidFromGateway(invoice, {
          gateway: 'stripe', gatewayAmount: gwAmount, gatewayCurrency: pi.currency,
          paymentIntentId: pi.id, eventId: event.id, verifiedIssuer
        });
      }
      break;
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object;
      const invoiceId = pi.metadata?.invoice_id;
      if (!invoiceId) break;
      const invoice = await Invoice.findByPk(invoiceId);
      if (invoice) {
        await invoice.update({
          payment_notes: `Stripe payment failed: ${pi.last_payment_error?.message || 'Unknown error'}`
        });
      }
      break;
    }
  }
}

/* ──────────────────── PAYPAL ──────────────────── */

router.post('/paypal', express.raw({ type: 'application/json' }), async (req, res) => {
  let event;
  try {
    const rawBody = req.body.toString();
    event = JSON.parse(rawBody);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // signature 검증 (issuer=system 의 webhookId 기준)
  // P0-4 (2026-06-08): fail-closed. An unverified PayPal webhook must NEVER
  // mutate invoices/subscriptions — a forged PAYMENT.CAPTURE.COMPLETED carrying a
  // known invoice_id would otherwise mark it paid (and restore the subscription)
  // without any real payment. This mirrors the Stripe handler above, which already
  // rejects when no webhook secret is configured. The previous "graceful degrade"
  // branch processed the event unverified — that was the fail-open gap.
  // Operational requirement: the system PayPal webhookId MUST be configured in prod
  // (payment_settings) or every PayPal webhook is rejected here.
  const webhookId = await getWebhookIdForIssuer('system', null);
  if (!webhookId) {
    // Same 400 rejection either way (fail-closed, nothing mutated) — but split the LOG LEVEL by
    // cause so a normal, expected state doesn't page an hourly alert email:
    //   • PayPal DISABLED (no store uses it for live payments) → unverifiable POSTs to this public
    //     URL are internet probes/noise → WARN (audit trail w/ source, no alert).
    //   • PayPal ENABLED but webhookId missing → a genuine setup mistake → ERROR (alert).
    // getPayPalConfigForIssuer THROWS when PayPal is not configured, so treat a throw as "disabled".
    let paypalEnabled = false;
    try { paypalEnabled = !!(await getPayPalConfigForIssuer('system', null)); } catch (_) { paypalEnabled = false; }
    const meta = {
      ip: req.headers['x-forwarded-for'] || req.ip || (req.connection && req.connection.remoteAddress) || null,
      ua: req.headers['user-agent'] || null,
      event_type: (event && event.event_type) || null,
      event_id: (event && event.id) || null
    };
    if (paypalEnabled) {
      await systemLogger.error('security', 'paypal-webhook', 'PayPal enabled but webhookId not configured — rejecting (fail-closed, setup error)', meta);
    } else {
      await systemLogger.warn('security', 'paypal-webhook', 'Unverified webhook rejected — PayPal disabled (probe/noise)', meta);
    }
    return res.status(400).json({ error: 'PayPal webhookId not configured' });
  }
  const ok = await verifyPayPalSignature(req, event, webhookId);
  if (!ok) {
    // PayPal isn't used for live payments here (no active stores), so unverifiable POSTs to this
    // public URL are internet noise / endpoint probes. The request is correctly rejected (fail-closed,
    // nothing mutated). Log at WARNING — not ERROR — so it no longer pages an hourly alert email, while
    // keeping an audit trail with source so a genuine misconfiguration stays diagnosable.
    await systemLogger.warn('security', 'paypal-webhook', 'Signature verification failed (rejected)', {
      ip: req.headers['x-forwarded-for'] || req.ip || (req.connection && req.connection.remoteAddress) || null,
      ua: req.headers['user-agent'] || null,
      event_type: (event && event.event_type) || null,
      event_id: (event && event.id) || null
    });
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  let { isNew, dbRow } = await recordWebhookEvent({
    gateway: 'paypal',
    event_id: event.id,
    event_type: event.event_type,
    payload: event,
    payloadBuf: req.body
  });
  if (!isNew && dbRow.status === 'processed') {
    return res.json({ received: true, dedupe: true });
  }

  try {
    await processPayPalEvent(event);
    await markProcessed(dbRow);
    res.json({ received: true });
  } catch (e) {
    await markFailed(dbRow, e);
    await systemLogger.error('payment', 'paypal-webhook', 'Event handler error', { event_type: event.event_type, error: e.message });
    res.status(500).json({ error: e.message });
  }
});

async function verifyPayPalSignature(req, event, webhookId) {
  try {
    const config = await getPayPalConfigForIssuer('system', null);
    const baseUrl = (config.mode === 'live' || config.sandbox === false)
      ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
    const auth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
    const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials'
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) return false;
    const verifyRes = await fetch(`${baseUrl}/v1/notifications/verify-webhook-signature`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${tokenData.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_algo: req.headers['paypal-auth-algo'],
        cert_url: req.headers['paypal-cert-url'],
        transmission_id: req.headers['paypal-transmission-id'],
        transmission_sig: req.headers['paypal-transmission-sig'],
        transmission_time: req.headers['paypal-transmission-time'],
        webhook_id: webhookId,
        webhook_event: event
      })
    });
    const verifyData = await verifyRes.json();
    return verifyData.verification_status === 'SUCCESS';
  } catch (e) {
    return false;
  }
}

async function processPayPalEvent(event) {
  switch (event.event_type) {
    case 'BILLING.SUBSCRIPTION.ACTIVATED':
    case 'BILLING.SUBSCRIPTION.UPDATED':
    case 'BILLING.SUBSCRIPTION.SUSPENDED':
    case 'BILLING.SUBSCRIPTION.CANCELLED':
    case 'BILLING.SUBSCRIPTION.EXPIRED': {
      const r = event.resource || {};
      const sub = await Subscription.findOne({ where: { gateway: 'paypal', gateway_subscription_id: r.id } });
      if (!sub) break;
      const map = {
        ACTIVE: 'active', SUSPENDED: 'paused',
        CANCELLED: 'canceled', EXPIRED: 'canceled', APPROVAL_PENDING: 'incomplete', APPROVED: 'incomplete'
      };
      await sub.update({
        status: map[r.status] || sub.status,
        canceled_at: ['CANCELLED', 'EXPIRED'].includes(r.status) ? new Date() : sub.canceled_at,
        current_period_start: r.billing_info?.last_payment?.time ? new Date(r.billing_info.last_payment.time) : sub.current_period_start,
        current_period_end: r.billing_info?.next_billing_time ? new Date(r.billing_info.next_billing_time) : sub.current_period_end,
        gateway_customer_id: r.subscriber?.payer_id || sub.gateway_customer_id
      });
      break;
    }
    case 'PAYMENT.SALE.COMPLETED': {
      // 구독 monthly payment
      const r = event.resource || {};
      const subId = r.billing_agreement_id;
      if (!subId) break;
      const sub = await Subscription.findOne({ where: { gateway: 'paypal', gateway_subscription_id: subId } });
      if (sub) {
        await systemLogger.info('payment', 'paypal-webhook', `Subscription ${sub.id} cycle paid`, {
          amount: r.amount?.total
        });
      }
      break;
    }
    case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED': {
      const r = event.resource || {};
      await systemLogger.warn('payment', 'paypal-webhook', 'Subscription payment failed', {
        subId: r.id, status_change_note: r.status_change_note
      });
      break;
    }
    case 'PAYMENT.CAPTURE.COMPLETED':
    case 'CHECKOUT.ORDER.APPROVED': {
      const r = event.resource || {};
      const invoiceId = r.custom_id || r.purchase_units?.[0]?.custom_id;
      if (!invoiceId) break;
      const invoice = await Invoice.findByPk(parseInt(invoiceId, 10));
      if (invoice) {
        const amtObj = r.amount || r.purchase_units?.[0]?.amount || {};
        const gwAmount = amtObj.value != null ? parseFloat(amtObj.value) : null;
        // PayPal 웹훅은 system 의 webhookId 로만 검증한다(발행자별 검증은 운영 미사용이라 보류 — 판정 §3)
        await markInvoicePaidFromGateway(invoice, {
          gateway: 'paypal', gatewayAmount: gwAmount, gatewayCurrency: amtObj.currency_code,
          paymentIntentId: r.id, eventId: event.id, verifiedIssuer: { type: 'system', id: null }
        });
      }
      break;
    }
    case 'PAYMENT.CAPTURE.DENIED':
    case 'PAYMENT.CAPTURE.DECLINED': {
      const r = event.resource || {};
      const invoiceId = r.custom_id;
      if (invoiceId) {
        const invoice = await Invoice.findByPk(parseInt(invoiceId, 10));
        if (invoice) {
          await invoice.update({
            payment_notes: `PayPal payment denied: ${r.status_details?.reason || 'Unknown'}`
          });
        }
      }
      break;
    }
  }
}

module.exports = router;
// Exposed for unit testing the P1-2 amount cross-check decision in isolation (함수 본체는 services/invoiceLifecycle.js).
module.exports.passesAmountCrossCheck = passesAmountCrossCheck;
