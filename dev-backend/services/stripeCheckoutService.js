/**
 * Stripe Checkout / Subscription / Customer Portal — issuer 별 hosted 결제 흐름.
 *
 * 핵심 위임:
 *   - 구독 결제: Stripe Subscriptions API (매월 자동 charge / Smart Retries / Card Updater / Dunning email)
 *   - 일반 결제: Stripe Checkout mode=payment (3DS / SCA 자동)
 *   - 사용자 셀프서비스: Customer Portal (카드 변경 / 구독 취소 / invoice history)
 *
 * 카드번호는 PurpleHere 가 절대 보지 않는다 — Stripe Hosted Page 가 처리.
 */

const { getStripeForIssuer, normalizeIssuerType } = require('../utils/stripeService');
const PaymentCustomer = require('../models/PaymentCustomer');
const Subscription = require('../models/Subscription');
const Plan = require('../models/PlanTemplate');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const Restaurant = require('../models/Restaurant');

async function getPayerEmailAndName(payerType, payerId) {
  if (payerType === 'restaurant') {
    const r = await Restaurant.findByPk(payerId);
    return { email: r?.email || null, name: r?.name || `Restaurant ${payerId}` };
  }
  if (payerType === 'brand') {
    const b = await Brand.findByPk(payerId);
    return { email: b?.email || null, name: b?.name || `Brand ${payerId}` };
  }
  if (payerType === 'foodcourt') {
    const f = await Foodcourt.findByPk(payerId);
    return { email: f?.email || null, name: f?.name || `Foodcourt ${payerId}` };
  }
  return { email: null, name: `${payerType} ${payerId}` };
}

/**
 * Get or create Stripe Customer for (issuer × payer) pair.
 * Cached in PaymentCustomer table.
 */
async function getOrCreateStripeCustomer({ stripe, issuer_type, issuer_id, payer_type, payer_id }) {
  const issuerNorm = normalizeIssuerType(issuer_type);
  const where = {
    gateway: 'stripe',
    issuer_type: issuerNorm,
    issuer_id: issuer_id || null,
    payer_type,
    payer_id
  };

  const cached = await PaymentCustomer.findOne({ where });
  if (cached) {
    try {
      const cust = await stripe.customers.retrieve(cached.gateway_customer_id);
      if (cust && !cust.deleted) return cust;
    } catch (e) {
      // not found on Stripe side — recreate
    }
  }

  const { email, name } = await getPayerEmailAndName(payer_type, payer_id);
  const customer = await stripe.customers.create({
    email: email || undefined,
    name,
    metadata: {
      payer_type,
      payer_id: String(payer_id),
      issuer_type: issuerNorm,
      issuer_id: issuer_id ? String(issuer_id) : ''
    }
  });

  if (cached) {
    await cached.update({ gateway_customer_id: customer.id });
  } else {
    await PaymentCustomer.create({ ...where, gateway_customer_id: customer.id });
  }
  return customer;
}

/**
 * Get or create Stripe Product+Price for a Plan.
 * Cached in PlanTemplate.metadata.stripe_price_id (per issuer key).
 *
 * Stripe accounts are issuer-scoped, so a Plan needs a Price per issuer.
 */
async function getOrCreatePriceForPlan({ stripe, plan, issuer_type, issuer_id, currency }) {
  const issuerNorm = normalizeIssuerType(issuer_type);
  const cacheKey = `stripe_price_${issuerNorm}_${issuer_id || 'sys'}_${currency.toLowerCase()}`;

  const meta = plan.metadata && typeof plan.metadata === 'object' ? { ...plan.metadata } : {};
  if (meta[cacheKey]) {
    try {
      const price = await stripe.prices.retrieve(meta[cacheKey]);
      if (price && price.active) return price;
    } catch (e) { /* recreate */ }
  }

  const product = await stripe.products.create({
    name: plan.name || `Plan ${plan.id}`,
    description: plan.description || undefined,
    metadata: { plan_id: String(plan.id), issuer_type: issuerNorm }
  });

  const amount = Math.round(Number(plan.monthly_price || plan.price || 0) * 100);
  const price = await stripe.prices.create({
    unit_amount: amount,
    currency: currency.toLowerCase(),
    recurring: { interval: 'month' },
    product: product.id,
    metadata: { plan_id: String(plan.id) }
  });

  meta[cacheKey] = price.id;
  await plan.update({ metadata: meta });
  return price;
}

/**
 * Create Stripe Checkout Session (subscription mode).
 */
async function startSubscriptionCheckout({
  issuer_type, issuer_id, payer_type, payer_id, plan_id,
  currency = 'MYR', success_url, cancel_url
}) {
  const stripe = await getStripeForIssuer(issuer_type, issuer_id);
  const plan = await Plan.findByPk(plan_id);
  if (!plan) throw new Error(`Plan ${plan_id} not found`);

  const customer = await getOrCreateStripeCustomer({ stripe, issuer_type, issuer_id, payer_type, payer_id });
  const price = await getOrCreatePriceForPlan({ stripe, plan, issuer_type, issuer_id, currency });

  // Pre-create local Subscription row in 'incomplete' state
  const subRow = await Subscription.create({
    gateway: 'stripe',
    issuer_type: normalizeIssuerType(issuer_type),
    issuer_id: issuer_id || null,
    payer_type, payer_id,
    plan_id,
    gateway_subscription_id: `pending_${Date.now()}`, // placeholder, replaced by webhook
    gateway_customer_id: customer.id,
    status: 'incomplete'
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customer.id,
    line_items: [{ price: price.id, quantity: 1 }],
    success_url,
    cancel_url,
    subscription_data: {
      metadata: {
        local_subscription_id: String(subRow.id),
        plan_id: String(plan_id),
        payer_type, payer_id: String(payer_id),
        issuer_type: normalizeIssuerType(issuer_type),
        issuer_id: issuer_id ? String(issuer_id) : ''
      }
    },
    metadata: {
      local_subscription_id: String(subRow.id),
      kind: 'subscription'
    }
  });

  return { url: session.url, session_id: session.id, subscription_id: subRow.id };
}

/**
 * Create Stripe Checkout Session (one-time payment for an Invoice).
 */
async function startInvoiceCheckout({
  invoice, issuer_type, issuer_id, payer_type, payer_id,
  success_url, cancel_url
}) {
  const stripe = await getStripeForIssuer(issuer_type, issuer_id);

  // P1-3 (2026-06-08): reuse an existing OPEN checkout session for this invoice
  // instead of opening a second one. Two concurrent open sessions can each
  // produce a successful payment_intent (double charge at the gateway) while the
  // invoice only credits once — the second webhook sees status='paid' and skips.
  // A still-open prior session is returned as-is; expired/complete ones fall
  // through to a fresh session. (Stripe returns url=null once not open.)
  if (invoice.gateway_session_id) {
    try {
      const existing = await stripe.checkout.sessions.retrieve(invoice.gateway_session_id);
      if (existing && existing.status === 'open' && existing.url) {
        return { url: existing.url, session_id: existing.id, reused: true };
      }
    } catch (e) {
      // unknown/stale session id — create a new one below
    }
  }

  const customer = await getOrCreateStripeCustomer({ stripe, issuer_type, issuer_id, payer_type, payer_id });

  const currency = (invoice.currency || 'MYR').toLowerCase();
  const amount = Math.round(Number(invoice.total_amount || invoice.total || 0) * 100);
  if (amount <= 0) throw new Error('Invoice total must be > 0');

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer: customer.id,
    line_items: [{
      price_data: {
        currency,
        product_data: {
          name: `Invoice ${invoice.invoice_number || invoice.id}`,
          description: invoice.description || undefined
        },
        unit_amount: amount
      },
      quantity: 1
    }],
    success_url,
    cancel_url,
    payment_intent_data: {
      metadata: {
        invoice_id: String(invoice.id),
        payer_type, payer_id: String(payer_id),
        issuer_type: normalizeIssuerType(issuer_type),
        issuer_id: issuer_id ? String(issuer_id) : ''
      }
    },
    metadata: {
      invoice_id: String(invoice.id),
      kind: 'invoice'
    }
  });

  await invoice.update({
    gateway: 'stripe',
    gateway_session_id: session.id,
    payment_provider: 'stripe'
  });

  return { url: session.url, session_id: session.id };
}

/**
 * Create a Customer Portal session — redirect URL for self-service.
 */
async function startCustomerPortal({ issuer_type, issuer_id, payer_type, payer_id, return_url }) {
  const stripe = await getStripeForIssuer(issuer_type, issuer_id);
  const issuerNorm = normalizeIssuerType(issuer_type);

  const cust = await PaymentCustomer.findOne({
    where: {
      gateway: 'stripe',
      issuer_type: issuerNorm,
      issuer_id: issuer_id || null,
      payer_type, payer_id
    }
  });
  if (!cust) {
    const e = new Error('No Stripe customer yet — start a subscription or pay first');
    e.code = 'NO_CUSTOMER';
    throw e;
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: cust.gateway_customer_id,
    return_url
  });
  return { url: portal.url };
}

/**
 * Cancel a subscription (at period end by default).
 */
async function cancelSubscription({ subscription_id, at_period_end = true }) {
  const sub = await Subscription.findByPk(subscription_id);
  if (!sub) throw new Error('Subscription not found');
  if (sub.gateway !== 'stripe') throw new Error('Use PayPal cancel for PayPal subscriptions');

  const stripe = await getStripeForIssuer(sub.issuer_type, sub.issuer_id);

  if (at_period_end) {
    await stripe.subscriptions.update(sub.gateway_subscription_id, {
      cancel_at_period_end: true
    });
    await sub.update({ cancel_at_period_end: true });
  } else {
    await stripe.subscriptions.cancel(sub.gateway_subscription_id);
    await sub.update({ status: 'canceled', canceled_at: new Date() });
  }
  return sub;
}

module.exports = {
  getOrCreateStripeCustomer,
  getOrCreatePriceForPlan,
  startSubscriptionCheckout,
  startInvoiceCheckout,
  startCustomerPortal,
  cancelSubscription
};
