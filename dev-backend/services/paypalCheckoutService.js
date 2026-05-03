/**
 * PayPal Subscriptions + Orders — issuer 별 hosted 결제 흐름.
 *
 * - 구독: PayPal Subscriptions API (v1/billing) — Plan + Subscription, 매월 자동 charge
 * - 일반: Orders v2 (v2/checkout/orders) — intent=CAPTURE
 * - Vault 가 카드/계정 vault 자동 (PayPal 가 card-on-file 처리)
 *
 * 카드/계정 정보는 PurpleHere 가 절대 보지 않는다 — PayPal Hosted Approval Page 가 처리.
 */

const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));
const { getPayPalConfigForIssuer, normalizeIssuerType } = require('../utils/paypalService');
const PaymentCustomer = require('../models/PaymentCustomer');
const Subscription = require('../models/Subscription');
const Plan = require('../models/PlanTemplate');

function baseUrl(config) {
  // sandbox default true; payment_settings 의 mode='live' 또는 sandbox=false 면 live
  const isLive = config.mode === 'live' || config.sandbox === false;
  return isLive ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
}

async function getAccessToken(config) {
  const auth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
  const res = await fetch(`${baseUrl(config)}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal OAuth failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function paypalFetch(config, path, { method = 'GET', body, accessToken } = {}) {
  const token = accessToken || await getAccessToken(config);
  const res = await fetch(`${baseUrl(config)}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'PayPal-Request-Id': `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* non-json */ }
  if (!res.ok) {
    const msg = json?.message || json?.error_description || text || `HTTP ${res.status}`;
    const e = new Error(`PayPal ${method} ${path} failed: ${res.status} ${msg}`);
    e.paypalResponse = json;
    e.paypalStatus = res.status;
    throw e;
  }
  return json;
}

/**
 * Get or create PayPal Plan id for a Plan (per issuer × currency cache).
 * Uses Plan.metadata.paypal_plan_<issuer>_<id>_<currency>.
 */
async function getOrCreatePayPalPlan({ config, plan, issuer_type, issuer_id, currency }) {
  const issuerNorm = normalizeIssuerType(issuer_type);
  const cacheKey = `paypal_plan_${issuerNorm}_${issuer_id || 'sys'}_${currency.toUpperCase()}`;
  const meta = plan.metadata && typeof plan.metadata === 'object' ? { ...plan.metadata } : {};
  if (meta[cacheKey]) {
    try {
      const fetched = await paypalFetch(config, `/v1/billing/plans/${meta[cacheKey]}`);
      if (fetched?.id && fetched.status === 'ACTIVE') return fetched.id;
    } catch (e) { /* recreate */ }
  }

  // 1. Product
  const productId = meta[`paypal_product_${issuerNorm}_${issuer_id || 'sys'}`]
    || (await paypalFetch(config, '/v1/catalogs/products', {
      method: 'POST',
      body: {
        name: plan.name || `Plan ${plan.id}`,
        description: plan.description || `Subscription plan ${plan.id}`,
        type: 'SERVICE',
        category: 'SOFTWARE'
      }
    })).id;
  meta[`paypal_product_${issuerNorm}_${issuer_id || 'sys'}`] = productId;

  // 2. Plan
  const amount = String(Number(plan.monthly_price || plan.price || 0).toFixed(2));
  const planRes = await paypalFetch(config, '/v1/billing/plans', {
    method: 'POST',
    body: {
      product_id: productId,
      name: `${plan.name || `Plan ${plan.id}`} (${currency})`,
      description: plan.description || undefined,
      status: 'ACTIVE',
      billing_cycles: [{
        frequency: { interval_unit: 'MONTH', interval_count: 1 },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 0,
        pricing_scheme: { fixed_price: { value: amount, currency_code: currency.toUpperCase() } }
      }],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 3
      }
    }
  });
  meta[cacheKey] = planRes.id;
  await plan.update({ metadata: meta });
  return planRes.id;
}

/**
 * Create PayPal Subscription (hosted approval flow).
 */
async function startSubscriptionCheckout({
  issuer_type, issuer_id, payer_type, payer_id, plan_id,
  currency = 'MYR', success_url, cancel_url
}) {
  const config = await getPayPalConfigForIssuer(issuer_type, issuer_id);
  const plan = await Plan.findByPk(plan_id);
  if (!plan) throw new Error(`Plan ${plan_id} not found`);

  const paypalPlanId = await getOrCreatePayPalPlan({
    config, plan, issuer_type, issuer_id, currency
  });

  // Pre-create local Subscription row in 'incomplete' state
  const subRow = await Subscription.create({
    gateway: 'paypal',
    issuer_type: normalizeIssuerType(issuer_type),
    issuer_id: issuer_id || null,
    payer_type, payer_id,
    plan_id,
    gateway_subscription_id: `pending_${Date.now()}`, // placeholder, replaced by webhook
    gateway_customer_id: '', // PayPal subscriber.payer_id filled by webhook
    status: 'incomplete'
  });

  const sub = await paypalFetch(config, '/v1/billing/subscriptions', {
    method: 'POST',
    body: {
      plan_id: paypalPlanId,
      application_context: {
        brand_name: 'PurpleHere',
        return_url: success_url,
        cancel_url,
        user_action: 'SUBSCRIBE_NOW',
        payment_method: {
          payer_selected: 'PAYPAL',
          payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
        }
      },
      custom_id: String(subRow.id)
    }
  });

  await subRow.update({ gateway_subscription_id: sub.id });
  const approval = (sub.links || []).find(l => l.rel === 'approve');
  if (!approval) throw new Error('PayPal did not return an approval URL');

  return { url: approval.href, subscription_id: subRow.id, gateway_subscription_id: sub.id };
}

/**
 * Create PayPal Order (one-time payment for an Invoice).
 */
async function startInvoiceCheckout({
  invoice, issuer_type, issuer_id, payer_type, payer_id,
  success_url, cancel_url
}) {
  const config = await getPayPalConfigForIssuer(issuer_type, issuer_id);
  const currency = (invoice.currency || 'MYR').toUpperCase();
  const amount = String(Number(invoice.total_amount || invoice.total || 0).toFixed(2));
  if (Number(amount) <= 0) throw new Error('Invoice total must be > 0');

  const order = await paypalFetch(config, '/v2/checkout/orders', {
    method: 'POST',
    body: {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: String(invoice.id),
        description: `Invoice ${invoice.invoice_number || invoice.id}`,
        custom_id: String(invoice.id),
        amount: { currency_code: currency, value: amount }
      }],
      application_context: {
        brand_name: 'PurpleHere',
        return_url: success_url,
        cancel_url,
        user_action: 'PAY_NOW'
      }
    }
  });

  await invoice.update({
    gateway: 'paypal',
    gateway_session_id: order.id,
    payment_provider: 'paypal'
  });

  const approval = (order.links || []).find(l => l.rel === 'approve');
  if (!approval) throw new Error('PayPal did not return an approval URL');
  return { url: approval.href, order_id: order.id };
}

/**
 * Capture an approved PayPal order (called from return_url handler or webhook).
 */
async function captureOrder(orderId, { issuer_type, issuer_id }) {
  const config = await getPayPalConfigForIssuer(issuer_type, issuer_id);
  return paypalFetch(config, `/v2/checkout/orders/${orderId}/capture`, { method: 'POST' });
}

/**
 * Cancel a PayPal Subscription.
 */
async function cancelSubscription({ subscription_id, reason = 'Cancellation requested by user' }) {
  const sub = await Subscription.findByPk(subscription_id);
  if (!sub) throw new Error('Subscription not found');
  if (sub.gateway !== 'paypal') throw new Error('Use Stripe cancel for Stripe subscriptions');
  const config = await getPayPalConfigForIssuer(sub.issuer_type, sub.issuer_id);
  await paypalFetch(config, `/v1/billing/subscriptions/${sub.gateway_subscription_id}/cancel`, {
    method: 'POST',
    body: { reason }
  });
  await sub.update({ status: 'canceled', canceled_at: new Date() });
  return sub;
}

module.exports = {
  startSubscriptionCheckout,
  startInvoiceCheckout,
  captureOrder,
  cancelSubscription,
  getAccessToken,
  paypalFetch
};
