// stripeCustomerService — Stripe Customer + saved PaymentMethod 관리.
//
// Why: 자동 정기결제 (subscription auto-charge) 를 위해 식당/브랜드/푸드코트별
//   Stripe Customer 를 1번 생성하고 default PaymentMethod 를 저장.
//   이후 매월 결제일에 off_session 으로 자동 charge.
//
// 외부 의존: stripeService.getStripeForIssuer(issuer_type, issuer_id)
//   — System Admin (또는 issuer) 의 Stripe API key 사용.
// 인보이스를 발행한 issuer 의 Stripe 계정에 customer/PM 생성.
// (식당이 SA 인보이스 결제 → SA Stripe 계정에 customer 생성)
//
// 보안: 카드 번호 / CVC 는 절대 PurpleHere 에 저장하지 않음. Stripe Elements 가
//   직접 Stripe 로 전송. PurpleHere DB 는 stripe_customer_id (cus_...) +
//   stripe_default_payment_method (pm_...) 토큰만 저장.

require('../models');
const { Restaurant, Brand, Foodcourt } = require('../models');
const { getStripeForIssuer } = require('../utils/stripeService');
const logger = require('../utils/logger');

const ENTITY_MODELS = {
  restaurant: Restaurant,
  brand: Brand,
  foodcourt: Foodcourt
};

function getEntityModel(entityType) {
  const m = ENTITY_MODELS[entityType];
  if (!m) throw new Error(`Unknown entity type: ${entityType}`);
  return m;
}

/**
 * 해당 entity 의 Stripe Customer 가져오거나 새로 생성.
 * issuer = 인보이스 발행자 (보통 'system_admin'). 자동 결제 시 그 계정에 charge.
 */
async function getOrCreateCustomer(entityType, entityId, issuerType = 'system_admin', issuerId = null) {
  const Model = getEntityModel(entityType);
  const entity = await Model.findByPk(entityId);
  if (!entity) throw new Error(`${entityType} ${entityId} not found`);

  if (entity.stripe_customer_id) {
    return { customer_id: entity.stripe_customer_id, created: false };
  }

  const stripe = await getStripeForIssuer(issuerType, issuerId);
  if (!stripe) throw new Error('Stripe not configured for this issuer — cannot create Customer');

  const name = entity.name || entity.business_name || `${entityType}-${entityId}`;
  const email = entity.email || entity.admin_email || null;

  const customer = await stripe.customers.create({
    name,
    email,
    metadata: {
      entity_type: entityType,
      entity_id: String(entityId),
      purplehere_app: 'pos'
    }
  });

  await entity.update({ stripe_customer_id: customer.id });
  logger.info(`[stripeCustomerService] Created Customer ${customer.id} for ${entityType} ${entityId}`);
  return { customer_id: customer.id, created: true };
}

/**
 * SetupIntent 생성 — frontend Stripe Elements 가 카드 등록 시 사용.
 * Returns { client_secret, customer_id } — frontend 가 confirmCardSetup 으로 처리.
 */
async function createSetupIntent(entityType, entityId, issuerType = 'system_admin', issuerId = null) {
  const { customer_id } = await getOrCreateCustomer(entityType, entityId, issuerType, issuerId);
  const stripe = await getStripeForIssuer(issuerType, issuerId);
  const setupIntent = await stripe.setupIntents.create({
    customer: customer_id,
    payment_method_types: ['card'],
    usage: 'off_session', // future off-session charges
    metadata: { entity_type: entityType, entity_id: String(entityId) }
  });
  return {
    client_secret: setupIntent.client_secret,
    setup_intent_id: setupIntent.id,
    customer_id
  };
}

/**
 * 카드 등록 후 호출 — payment_method_id 를 default 로 저장.
 * consent: true 일 때만 auto_charge_enabled = true 로 설정 + consent_at 기록.
 */
async function savePaymentMethod(entityType, entityId, paymentMethodId, opts = {}) {
  const { setDefault = true, consent = false, issuerType = 'system_admin', issuerId = null } = opts;
  const Model = getEntityModel(entityType);
  const entity = await Model.findByPk(entityId);
  if (!entity) throw new Error(`${entityType} ${entityId} not found`);
  if (!entity.stripe_customer_id) throw new Error('Customer not created — call createSetupIntent first');

  const stripe = await getStripeForIssuer(issuerType, issuerId);
  // PaymentMethod 가 customer 에 attach 됐는지 확인 + default 로 설정
  const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
  if (pm.customer !== entity.stripe_customer_id) {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: entity.stripe_customer_id });
  }

  if (setDefault) {
    await stripe.customers.update(entity.stripe_customer_id, {
      invoice_settings: { default_payment_method: paymentMethodId }
    });
  }

  const updateData = {
    stripe_default_payment_method: paymentMethodId
  };
  if (consent) {
    updateData.auto_charge_enabled = true;
    updateData.auto_charge_consent_at = new Date();
  }
  await entity.update(updateData);

  return {
    payment_method_id: paymentMethodId,
    last4: pm.card?.last4,
    brand: pm.card?.brand,
    exp_month: pm.card?.exp_month,
    exp_year: pm.card?.exp_year,
    auto_charge_enabled: !!updateData.auto_charge_enabled
  };
}

/**
 * 저장된 카드 목록 조회 — Stripe API 에서 customer 의 모든 PaymentMethod 가져옴.
 */
async function listSavedCards(entityType, entityId, opts = {}) {
  const { issuerType = 'system_admin', issuerId = null } = opts;
  const Model = getEntityModel(entityType);
  const entity = await Model.findByPk(entityId);
  if (!entity) throw new Error(`${entityType} ${entityId} not found`);
  if (!entity.stripe_customer_id) {
    return { cards: [], customer_id: null, auto_charge_enabled: false, default_payment_method: null };
  }

  const stripe = await getStripeForIssuer(issuerType, issuerId);
  const list = await stripe.paymentMethods.list({
    customer: entity.stripe_customer_id,
    type: 'card',
    limit: 10
  });

  const cards = list.data.map(pm => ({
    id: pm.id,
    brand: pm.card?.brand,
    last4: pm.card?.last4,
    exp_month: pm.card?.exp_month,
    exp_year: pm.card?.exp_year,
    is_default: pm.id === entity.stripe_default_payment_method
  }));

  return {
    cards,
    customer_id: entity.stripe_customer_id,
    auto_charge_enabled: entity.auto_charge_enabled,
    default_payment_method: entity.stripe_default_payment_method,
    consent_at: entity.auto_charge_consent_at
  };
}

/**
 * PaymentMethod detach + DB 정리. default 카드 삭제 시 auto_charge_enabled 자동 OFF.
 */
async function deletePaymentMethod(entityType, entityId, paymentMethodId, opts = {}) {
  const { issuerType = 'system_admin', issuerId = null } = opts;
  const Model = getEntityModel(entityType);
  const entity = await Model.findByPk(entityId);
  if (!entity) throw new Error(`${entityType} ${entityId} not found`);

  const stripe = await getStripeForIssuer(issuerType, issuerId);
  try {
    await stripe.paymentMethods.detach(paymentMethodId);
  } catch (e) {
    logger.warn(`[stripeCustomerService] detach failed: ${e.message}`);
  }

  if (entity.stripe_default_payment_method === paymentMethodId) {
    await entity.update({
      stripe_default_payment_method: null,
      auto_charge_enabled: false
    });
  }
  return { detached: true, was_default: entity.stripe_default_payment_method === paymentMethodId };
}

/**
 * Auto-charge 토글 변경 — 사용자가 카드는 유지하되 자동 결제만 끔/켬.
 * 켤 때 consent 가 true 여야 함.
 */
async function setAutoCharge(entityType, entityId, enabled, opts = {}) {
  const { consent = false } = opts;
  const Model = getEntityModel(entityType);
  const entity = await Model.findByPk(entityId);
  if (!entity) throw new Error(`${entityType} ${entityId} not found`);

  if (enabled) {
    if (!entity.stripe_default_payment_method) {
      throw new Error('No default payment method on file — save a card first');
    }
    if (!consent && !entity.auto_charge_consent_at) {
      throw new Error('Explicit consent required to enable auto-charge');
    }
    const updateData = { auto_charge_enabled: true };
    if (consent) updateData.auto_charge_consent_at = new Date();
    await entity.update(updateData);
  } else {
    await entity.update({ auto_charge_enabled: false });
  }
  return { auto_charge_enabled: enabled };
}

/**
 * 인보이스에 대해 off_session 자동 결제 시도.
 * 결과 status 별 — 'paid' (즉시 성공) / 'requires_action' (SCA) / 'failed' / 'no_pm'.
 */
async function chargeInvoiceAutomatic(invoice, entityType = 'restaurant', opts = {}) {
  const Model = getEntityModel(entityType);
  const entity = await Model.findByPk(invoice.restaurant_id || invoice.entity_id);
  if (!entity) return { status: 'no_entity' };
  if (!entity.auto_charge_enabled) return { status: 'disabled' };
  if (!entity.stripe_customer_id || !entity.stripe_default_payment_method) {
    return { status: 'no_pm' };
  }

  const issuerType = invoice.issuer_type || 'system_admin';
  const issuerId = invoice.issuer_id || null;
  const stripe = await getStripeForIssuer(issuerType, issuerId);

  const ZERO_DECIMAL = ['JPY', 'KRW', 'VND'];
  const multiplier = ZERO_DECIMAL.includes(invoice.currency?.toUpperCase()) ? 1 : 100;
  const amount = Math.round(parseFloat(invoice.total_amount) * multiplier);

  try {
    const pi = await stripe.paymentIntents.create({
      amount,
      currency: (invoice.currency || 'MYR').toLowerCase(),
      customer: entity.stripe_customer_id,
      payment_method: entity.stripe_default_payment_method,
      off_session: true,
      confirm: true,
      metadata: {
        invoice_id: String(invoice.id),
        invoice_number: invoice.invoice_number || '',
        entity_type: entityType,
        entity_id: String(entity.id),
        auto_charge: 'true'
      }
    });
    return { status: 'paid', payment_intent_id: pi.id };
  } catch (err) {
    if (err.code === 'authentication_required') {
      return { status: 'requires_action', error: err.message, payment_intent_id: err.raw?.payment_intent?.id };
    }
    return { status: 'failed', code: err.code, message: err.message };
  }
}

module.exports = {
  getOrCreateCustomer,
  createSetupIntent,
  savePaymentMethod,
  listSavedCards,
  deletePaymentMethod,
  setAutoCharge,
  chargeInvoiceAutomatic
};
