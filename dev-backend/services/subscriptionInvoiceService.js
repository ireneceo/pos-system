/**
 * Subscription Invoice Service — Unified helper for creating and syncing
 * subscription invoices across Restaurant / User (Brand General / Foodcourt General / Restaurant Owner).
 *
 * Used by:
 *   - routes/restaurants-crud.js POST (initial invoice)
 *   - routes/restaurants-crud.js PUT  (sync pending invoice on subscription edit)
 *   - routes/users.js POST            (initial invoice for Brand/FC General, Restaurant Owner)
 *   - routes/users.js PUT             (sync pending invoice on subscription edit)
 *
 * Design rules:
 *   1. Invoice is always created on POST (even during trial) — billing_period_start = subscription_start.
 *   2. On PUT, only UNPAID invoices get updated (status IN ('draft','pending_payment','overdue')).
 *      Paid/cancelled invoices are never touched.
 *   3. modification_history JSON tracks all changes for audit.
 *   4. ActivityLog is written by the caller (this service just returns metadata).
 *
 * Date rule (per product spec):
 *   Monthly: billing_period_end = subscription_start + 1 month - 1 day
 *   Annual:  billing_period_end = subscription_start + 1 year - 1 day
 */

const { Op } = require('sequelize');
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const PlanTemplate = require('../models/PlanTemplate');
const PlanPrice = require('../models/PlanPrice');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const Restaurant = require('../models/Restaurant');
const CompanySettings = require('../models/CompanySettings');
const SystemSettings = require('../models/SystemSettings');

const DEFAULT_DUE_DAYS = 7;

/**
 * Fetch additional charges (tax, service charge, etc.) from admin payment settings
 * for the given currency. Returns an array of { name, rate, enabled } or [] if none.
 *
 * Settings structure (from admin-payment-settings.js):
 *   { additionalCharges: { "MYR": [{enabled, name, rate}, ...], "KRW": [...] } }
 *
 * Only returns enabled charges.
 */
async function getAdditionalChargesForCurrency(currency) {
  try {
    const row = await SystemSettings.findOne({ where: { setting_key: 'payment_settings' } });
    if (!row) return [];
    let settings = row.setting_value;
    if (typeof settings === 'string') {
      try { settings = JSON.parse(settings); } catch (e) { return []; }
    }
    if (!settings || !settings.additionalCharges) return [];
    const charges = settings.additionalCharges[currency];
    if (!Array.isArray(charges)) return [];
    return charges.filter(c => c && c.enabled && parseFloat(c.rate) > 0).map(c => ({
      name: c.name || 'Charge',
      rate: parseFloat(c.rate) || 0 // rate is in percent (e.g., 6 means 6%)
    }));
  } catch (e) {
    console.error('[SubInvoice] getAdditionalChargesForCurrency error:', e.message);
    return [];
  }
}

/**
 * Apply additional charges to a base amount.
 * Returns { charges: [{name, rate, amount}], totalChargeAmount, total }
 */
function applyAdditionalCharges(baseAmount, additionalCharges) {
  const charges = [];
  let totalChargeAmount = 0;
  for (const c of additionalCharges) {
    const amount = Math.round(baseAmount * (c.rate / 100) * 100) / 100;
    charges.push({ name: c.name, rate: c.rate, amount });
    totalChargeAmount += amount;
  }
  return {
    charges,
    totalChargeAmount: Math.round(totalChargeAmount * 100) / 100,
    total: Math.round((baseAmount + totalChargeAmount) * 100) / 100
  };
}

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

function calcBillingEnd(startDate, cycle) {
  const end = new Date(startDate);
  if (cycle === 'annual') {
    end.setFullYear(end.getFullYear() + 1);
  } else {
    end.setMonth(end.getMonth() + 1);
  }
  end.setDate(end.getDate() - 1);
  return end;
}

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function generateInvoiceNumber() {
  const now = new Date();
  const dateStr = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const lastInv = await Invoice.findOne({
    where: { invoice_number: { [Op.like]: `INV-${dateStr}%` } },
    order: [['invoice_number', 'DESC']],
    attributes: ['invoice_number']
  });
  let nextNum = 1;
  if (lastInv && lastInv.invoice_number) {
    const match = lastInv.invoice_number.match(/(\d{3})$/);
    if (match) nextNum = parseInt(match[1], 10) + 1;
  }
  return `INV-${dateStr}${String(nextNum).padStart(3, '0')}`;
}

/**
 * Resolve plan amount.
 *
 * Priority: plan_prices table lookup (authoritative), fallback to stored plan_amount.
 * This ensures invoices always reflect the current plan catalog price, not stale
 * values stored on the restaurant/user record.
 *
 * Note: The previous implementation preferred stored plan_amount, which caused
 * Enterprise Plan restaurants with legacy plan_amount=99 (stale Basic price) to
 * keep issuing invoices at the wrong amount even after plan_type was updated.
 */
async function resolvePlanAmount(planType, planAmount, currency, billingCycle) {
  // 1. Try plan_prices table first (authoritative)
  if (planType) {
    let template = await PlanTemplate.findOne({ where: { display_name: planType } });
    if (!template) {
      const nameKey = planType.toLowerCase().replace(/\s+/g, '_');
      template = await PlanTemplate.findOne({ where: { name: nameKey } });
    }
    if (template) {
      const planPrice = await PlanPrice.findOne({
        where: { plan_id: template.id, currency, is_active: true }
      });
      if (planPrice) {
        const catalogPrice = billingCycle === 'annual'
          ? parseFloat(planPrice.annual_price)
          : parseFloat(planPrice.monthly_price);
        if (catalogPrice > 0) return catalogPrice;
      }
    }
  }

  // 2. Fallback: stored plan_amount (for custom pricing / legacy records)
  const stored = parseFloat(planAmount) || 0;
  return stored > 0 ? stored : 0;
}

/**
 * Resolve payer (who pays this invoice).
 *
 * For restaurants: depends on payment_model:
 *   - 'brand_manager'    → brand.owner_id
 *   - 'foodcourt_manager'→ foodcourt.owner_id
 *   - 'restaurant_owner' → restaurant.owner_id (if exists) or admin user
 *   - default            → restaurant (self)
 *
 * For users (Brand/FC General, Restaurant Owner subscribing for themselves):
 *   - payer_type = {brand_manager, foodcourt_manager, restaurant_owner}
 *   - payer_id = user.id
 */
async function resolvePayer(subject) {
  if (subject.kind === 'user') {
    const roleMap = {
      'Brand General': 'brand_manager',
      'Foodcourt General': 'foodcourt_manager',
      'Restaurant Owner': 'restaurant_owner'
    };
    return {
      payer_type: roleMap[subject.role] || 'restaurant_owner',
      payer_id: subject.id
    };
  }

  // kind === 'restaurant'
  const r = subject.restaurant;
  if (r.payment_model === 'brand_manager' && r.brand_id) {
    const brand = await Brand.findByPk(r.brand_id);
    if (brand && brand.owner_id) return { payer_type: 'brand_manager', payer_id: brand.owner_id };
  }
  if (r.payment_model === 'foodcourt_manager' && r.foodcourt_id) {
    const foodcourt = await Foodcourt.findByPk(r.foodcourt_id);
    if (foodcourt && foodcourt.owner_id) return { payer_type: 'foodcourt_manager', payer_id: foodcourt.owner_id };
  }
  return { payer_type: 'restaurant', payer_id: null };
}

/**
 * Build invoice data object shared between create and sync.
 */
/**
 * 구독 할인 금액 — subject.discount_type/value/reason (매장·사용자 행의 값).
 * percentage 는 100% 를 넘지 않게, fixed 는 정가를 넘지 않게 자른다(invoiceScheduler 와 같은 식).
 */
function computeSubscriptionDiscount(subject, planAmount) {
  const type = ['percentage', 'fixed'].includes(subject.discount_type) ? subject.discount_type : 'none';
  const value = parseFloat(subject.discount_value) || 0;
  let discountAmount = 0;
  if (type === 'percentage' && value > 0) {
    discountAmount = Math.round(planAmount * Math.min(value, 100) / 100 * 100) / 100;
  } else if (type === 'fixed' && value > 0) {
    discountAmount = Math.min(value, planAmount);
  }
  discountAmount = Math.max(0, Math.min(discountAmount, planAmount));
  if (discountAmount <= 0) return { type: 'none', value: 0, discountAmount: 0, reason: null };
  return { type, value, discountAmount, reason: subject.discount_reason || null };
}

/**
 * 받을 돈이 0 인 구독 청구서를 «낼 것 없음(paid · 0)» 으로 닫는다 — 새로 만든 직후와 구독 수정 동기화(sync) 뒤에 부른다.
 *   brands-plans·foodcourts-plans·invoiceScheduler(엔티티 플랜)이 이미 쓰는 규칙과 같다.
 *   열어 두면 마감일 뒤 subscriptionScheduler 가 연체 → 매장 정지로 끌고 간다.
 * 반환: 닫았으면 true.
 */
async function closeIfNothingToCollect(invoiceId) {
  const inv = await Invoice.findByPk(invoiceId);
  if (!inv) return false;
  if (!['draft', 'pending_payment', 'overdue'].includes(inv.status)) return false;
  if (parseFloat(inv.total_amount) > 0) return false;
  await inv.update({
    status: 'paid',
    paid_amount: 0,
    paid_at: new Date(),
    payment_notes: 'Fully discounted — nothing to collect'
  });
  return true;
}

async function buildInvoiceData(subject) {
  const { kind } = subject;
  const currency = (subject.currency || 'MYR').replace(/^RM$/, 'MYR');

  const subStart = new Date(subject.subscription_start);
  const billingCycle = subject.billing_cycle || 'monthly';
  const billingEnd = calcBillingEnd(subStart, billingCycle);

  // Due date: 7 days after subscription start (not after creation)
  // Reason: during trial, customer shouldn't be "overdue" immediately
  const dueDate = new Date(subStart);
  dueDate.setDate(dueDate.getDate() + DEFAULT_DUE_DAYS);

  const planAmount = await resolvePlanAmount(subject.plan_type, subject.plan_amount, currency, billingCycle);

  // 구독 할인(매장 restaurants.discount_* · 브랜드/푸드코트/오너 users.discount_*) — 2026-11-08 Irene
  //   «K-DINE 브랜드들은 100% 할인처리 해야 하는데 계속 적용해도 안돼»: 구독을 고쳐 저장하면 열린 청구서를
  //   여기서 다시 맞추는데 할인을 빼고 정가로 덮어썼다. 월 청구(invoiceScheduler.createSubscriptionInvoice)와 같은 식.
  const discount = computeSubscriptionDiscount(subject, planAmount);
  const discountedAmount = Math.round((planAmount - discount.discountAmount) * 100) / 100;

  // Apply additional charges from admin payment settings (tax, service charge, etc.)
  // These are configured per-currency in SystemSettings.payment_settings.additionalCharges
  // 세금 등은 할인 뒤 금액에 붙는다(utils/invoiceCalculation 과 같은 규칙).
  const additionalCharges = await getAdditionalChargesForCurrency(currency);
  const { charges, totalChargeAmount, total: totalAmount } = applyAdditionalCharges(discountedAmount, additionalCharges);

  const cycleText = billingCycle === 'annual' ? 'Annual' : 'Monthly';
  const periodText = `${formatDate(subStart)} ~ ${formatDate(billingEnd)}`;

  const companyInfo = await CompanySettings.findOne({ where: { id: 1 }, attributes: ['site_name'] });
  const siteName = companyInfo?.site_name || 'POS';

  const { payer_type, payer_id } = await resolvePayer(subject);

  const displayName = `${siteName} - ${subject.plan_type} (${cycleText})`;

  return {
    billingCycle, billingEnd, dueDate, planAmount, discount,
    charges, totalChargeAmount, totalAmount,
    currency, periodText, siteName, payer_type, payer_id, subStart,
    cycleText, displayName, planType: subject.plan_type
  };
}

// ────────────────────────────────────────────────────────────────
// Public: Create initial invoice
// ────────────────────────────────────────────────────────────────

/**
 * Create an initial subscription invoice for a new restaurant or user subscription.
 *
 * subject: {
 *   kind: 'restaurant' | 'user',
 *   id: number,                      // restaurant.id or user.id
 *   plan_type: string,
 *   plan_amount: number,
 *   billing_cycle: 'monthly' | 'annual',
 *   currency: string,
 *   subscription_start: Date,
 *   // For kind='restaurant':
 *   restaurant?: { id, payment_model, brand_id, foodcourt_id },
 *   // For kind='user':
 *   role?: 'Brand General' | 'Foodcourt General' | 'Restaurant Owner'
 * }
 *
 * Returns: { invoice, item } or throws.
 */
async function createInitialInvoice(subject) {
  if (!subject.subscription_start || !subject.plan_type) {
    throw new Error('subscription_start and plan_type are required');
  }

  const data = await buildInvoiceData(subject);
  if (data.planAmount <= 0) {
    console.warn(`[SubInvoice] Skipping initial invoice — plan amount is 0 for ${subject.kind} ${subject.id}`);
    return null;
  }

  const invoiceNumber = await generateInvoiceNumber();

  // Invoice-level tax info is carried in `additional_charges` JSON.
  // The invoices table does not have a dedicated tax_amount column —
  // total_amount already reflects base + all charges.
  // Line-item tax tracking is on InvoiceItem (for display).
  const taxAmount = data.totalChargeAmount;
  const taxRate = data.charges.reduce((sum, c) => sum + c.rate, 0);

  const invoicePayload = {
    restaurant_id: subject.kind === 'restaurant' ? subject.id : null,
    invoice_number: invoiceNumber,
    type: 'automatic',
    invoice_category: 'subscription',
    category_display_name: data.displayName,
    billing_period_start: data.subStart,
    billing_period_end: data.billingEnd,
    due_date: data.dueDate,
    subtotal: data.planAmount,
    discount_type: data.discount.type,
    discount_value: data.discount.value,
    discount_amount: data.discount.discountAmount,
    discount_reason: data.discount.reason,
    total_amount: data.totalAmount,
    currency: data.currency,
    status: 'pending_payment',
    notes: `${data.cycleText} subscription invoice for ${data.planType}. Service period: ${data.periodText}. Due within ${DEFAULT_DUE_DAYS} days of start.`,
    issued_by: 0,
    issued_at: new Date(),
    issuer_type: 'system_admin',
    payer_type: data.payer_type,
    payer_id: data.payer_id,
    additional_charges: data.charges // [{name, rate, amount}, ...]
  };

  const invoice = await Invoice.create(invoicePayload);

  await InvoiceItem.create({
    invoice_id: invoice.id,
    item_type: 'subscription',
    description: `${data.planType} - ${data.cycleText} Subscription (${data.periodText})`,
    calculation_method: 'fixed',
    fixed_amount: data.planAmount,
    calculated_amount: data.planAmount,
    tax_rate: taxRate,
    tax_amount: taxAmount,
    total_amount: data.totalAmount
  });

  const { finalizeInvoice } = require('../utils/invoiceCalculation');
  await finalizeInvoice(invoice.id);
  await closeIfNothingToCollect(invoice.id);

  console.log(`[SubInvoice] Created ${invoiceNumber} for ${subject.kind} ${subject.id} (${data.currency} ${data.totalAmount.toFixed(2)})`);
  return { invoice, invoiceNumber };
}

// ────────────────────────────────────────────────────────────────
// Public: Sync pending invoice on subscription update
// ────────────────────────────────────────────────────────────────

/**
 * Sync the pending (unpaid) subscription invoice for a subject whose subscription info changed.
 *
 * Finds the most recent UNPAID subscription invoice for this entity and updates
 * its amount/billing period/notes to match the new subscription info.
 *
 * Never touches paid/cancelled invoices. Never touches invoices from other categories.
 *
 * Returns:
 *   { updated: invoice }  — if a pending invoice was found and updated
 *   { updated: null, reason: 'no_pending' | 'no_change' | 'already_closed_free' } — if nothing was done
 */
async function syncPendingInvoice(subject) {
  if (!subject.subscription_start || !subject.plan_type) {
    return { updated: null, reason: 'missing_fields' };
  }

  const { payer_type, payer_id } = await resolvePayer(subject);

  // Find most recent unpaid subscription invoice for this entity
  const where = {
    type: 'automatic',
    invoice_category: 'subscription',
    status: { [Op.in]: ['draft', 'pending_payment', 'overdue'] }
  };

  if (subject.kind === 'restaurant') {
    where.restaurant_id = subject.id;
  } else {
    // For user-based subscriptions: match by payer
    where.payer_type = payer_type;
    where.payer_id = payer_id;
    where.restaurant_id = null; // Exclude restaurant invoices that happen to be paid by this user
  }

  const data = await buildInvoiceData(subject);

  // 받을 돈 0(100% 할인)인 이번 기간이 이미 0원 결제완료로 닫혀 있으면 아무것도 안 한다 —
  // 같은 저장을 다시 하면 지난 열린 청구서를 덮어 닫거나 새 0원 청구서를 만들던 것 막음(Fable 게이트 S1, 2026-11-10).
  if (data.totalAmount <= 0) {
    const { status: _ignored, ...scope } = where;
    const closedFree = await Invoice.findAll({
      where: { ...scope, status: 'paid', total_amount: 0 },
      attributes: ['id', 'billing_period_start'],
      order: [['id', 'DESC']]
    });
    const startStrFree = formatDate(data.subStart);
    if (closedFree.some(inv => inv.billing_period_start && formatDate(new Date(inv.billing_period_start)) === startStrFree)) {
      return { updated: null, reason: 'already_closed_free' };
    }
  }

  const existing = await Invoice.findOne({
    where,
    order: [['id', 'DESC']]
  });

  if (!existing) {
    return { updated: null, reason: 'no_pending' };
  }

  if (data.planAmount <= 0) {
    return { updated: null, reason: 'zero_amount' };
  }

  // Check if anything actually changed
  const before = {
    total_amount: parseFloat(existing.total_amount),
    billing_period_start: existing.billing_period_start,
    billing_period_end: existing.billing_period_end,
    subtotal: parseFloat(existing.subtotal || 0),
    discount_type: existing.discount_type || 'none',
    discount_value: parseFloat(existing.discount_value) || 0,
    discount_amount: parseFloat(existing.discount_amount) || 0,
    additional_charges: existing.additional_charges
  };

  const startStr = formatDate(data.subStart);
  const endStr = formatDate(data.billingEnd);
  const existingStartStr = existing.billing_period_start ? formatDate(new Date(existing.billing_period_start)) : '';
  const existingEndStr = existing.billing_period_end ? formatDate(new Date(existing.billing_period_end)) : '';

  // Detect additional_charges mismatch — normalize both sides to JSON for comparison
  const existingChargesJson = JSON.stringify(existing.additional_charges || []);
  const newChargesJson = JSON.stringify(data.charges || []);

  const discountChanged =
    (existing.discount_type || 'none') !== data.discount.type ||
    (parseFloat(existing.discount_value) || 0) !== data.discount.value ||
    (parseFloat(existing.discount_amount) || 0) !== data.discount.discountAmount;

  const changed =
    discountChanged ||
    before.total_amount !== data.totalAmount ||
    existingStartStr !== startStr ||
    existingEndStr !== endStr ||
    existingChargesJson !== newChargesJson;

  if (!changed) {
    return { updated: null, reason: 'no_change' };
  }

  // Append to modification_history
  let history = [];
  try {
    if (existing.modification_history) {
      history = typeof existing.modification_history === 'string'
        ? JSON.parse(existing.modification_history)
        : existing.modification_history;
      // 복사본으로 — 같은 배열을 push 해 update 하면 Sequelize 가 바뀐 줄 몰라 이력이 저장 안 됐다(Fable 게이트 R3)
      history = Array.isArray(history) ? [...history] : [];
    }
  } catch (e) { history = []; }

  // Legacy tax_amount/tax_rate columns: sum of all additional charges
  const taxAmount = data.totalChargeAmount;
  const taxRate = data.charges.reduce((sum, c) => sum + c.rate, 0);

  history.push({
    timestamp: new Date().toISOString(),
    reason: 'subscription_updated',
    before,
    after: {
      total_amount: data.totalAmount,
      billing_period_start: data.subStart,
      billing_period_end: data.billingEnd,
      subtotal: data.planAmount,
      discount_type: data.discount.type,
      discount_value: data.discount.value,
      discount_amount: data.discount.discountAmount,
      tax_amount: taxAmount,
      additional_charges: data.charges
    }
  });

  await existing.update({
    billing_period_start: data.subStart,
    billing_period_end: data.billingEnd,
    due_date: data.dueDate,
    subtotal: data.planAmount,
    discount_type: data.discount.type,
    discount_value: data.discount.value,
    discount_amount: data.discount.discountAmount,
    discount_reason: data.discount.reason,
    total_amount: data.totalAmount,
    currency: data.currency,
    additional_charges: data.charges,
    notes: `${data.cycleText} subscription invoice for ${data.planType}. Service period: ${data.periodText}. Due within ${DEFAULT_DUE_DAYS} days of start. [Auto-synced on subscription update]`,
    modification_history: history,
    is_modified: true
  });

  // Also update the invoice item
  // 품목이 하나뿐인데 종류가 subscription 이 아니면(옛 «수정» 저장이 service 로 바꿔 둔 것 — 2026-11-08)
  //   그 한 줄이 구독 줄이다 — 종류를 되돌리며 같이 맞춘다. 줄이 여럿이면 subscription 줄만 만진다.
  let existingItem = await InvoiceItem.findOne({ where: { invoice_id: existing.id, item_type: 'subscription' } });
  if (!existingItem) {
    const allItems = await InvoiceItem.findAll({ where: { invoice_id: existing.id } });
    if (allItems.length === 1) existingItem = allItems[0];
  }
  if (existingItem) {
    await existingItem.update({
      item_type: 'subscription',
      description: `${data.planType} - ${data.cycleText} Subscription (${data.periodText})`,
      fixed_amount: data.planAmount,
      calculated_amount: data.planAmount,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total_amount: data.totalAmount
    });
  }

  // 할인으로 받을 돈이 0 이 됐으면 닫는다 — 열어 두면 마감일 뒤 연체 → 매장 정지(2026-11-08 Fable 게이트 R2)
  await closeIfNothingToCollect(existing.id);

  console.log(`[SubInvoice] Synced ${existing.invoice_number} for ${subject.kind} ${subject.id} (${data.currency} ${data.totalAmount.toFixed(2)})`);
  return { updated: existing, invoiceNumber: existing.invoice_number };
}

/**
 * Recalculate additional_charges on all PENDING invoices when admin payment_settings change.
 *
 * Iterates over every unpaid invoice (status: draft / pending_payment / overdue),
 * fetches the current charges for the invoice's currency, recomputes
 * baseAfterDiscount + new charges, and updates the invoice if anything changed.
 *
 * Skips legacy invoices that have no `subtotal` (we cannot infer the base from total_amount
 * without knowing what charges were applied before — those need manual fix).
 *
 * Appends a modification_history entry on each update.
 *
 * Returns: { updated: number, skipped: number, total: number }
 */
async function recalcPendingInvoiceCharges() {
  const pending = await Invoice.findAll({
    where: {
      status: { [Op.in]: ['draft', 'pending_payment', 'overdue'] }
    }
  });

  let updated = 0;
  let skipped = 0;

  for (const inv of pending) {
    try {
      const subtotal = parseFloat(inv.subtotal);
      if (!Number.isFinite(subtotal) || subtotal <= 0) {
        skipped++;
        continue;
      }
      const discount = parseFloat(inv.discount_amount) || 0;
      const baseAfterDiscount = Math.round((subtotal - discount) * 100) / 100;
      if (baseAfterDiscount <= 0) {
        skipped++;
        continue;
      }

      const currency = (inv.currency || 'MYR').replace(/^RM$/, 'MYR');
      const charges = await getAdditionalChargesForCurrency(currency);
      const { charges: newCharges, totalChargeAmount, total: newTotal } = applyAdditionalCharges(baseAfterDiscount, charges);

      const existingChargesJson = JSON.stringify(inv.additional_charges || []);
      const newChargesJson = JSON.stringify(newCharges);
      const oldTotal = parseFloat(inv.total_amount);

      if (existingChargesJson === newChargesJson && Math.abs(oldTotal - newTotal) < 0.005) {
        continue; // no change
      }

      // Append modification history
      let history = [];
      try {
        if (inv.modification_history) {
          history = typeof inv.modification_history === 'string'
            ? JSON.parse(inv.modification_history)
            : inv.modification_history;
          // 복사본으로 — 같은 배열을 push 해 update 하면 Sequelize 가 바뀐 줄 몰라 이력이 저장 안 됐다(Fable 게이트 R3)
      history = Array.isArray(history) ? [...history] : [];
        }
      } catch (e) { history = []; }

      history.push({
        timestamp: new Date().toISOString(),
        reason: 'payment_settings_updated',
        before: {
          additional_charges: inv.additional_charges,
          total_amount: oldTotal
        },
        after: {
          additional_charges: newCharges,
          total_amount: newTotal
        }
      });

      await inv.update({
        additional_charges: newCharges,
        total_amount: newTotal,
        modification_history: history,
        is_modified: true
      });

      // Sync subscription line item if present (legacy tax_amount/tax_rate columns)
      const item = await InvoiceItem.findOne({ where: { invoice_id: inv.id, item_type: 'subscription' } });
      if (item) {
        const taxRate = newCharges.reduce((sum, c) => sum + c.rate, 0);
        await item.update({
          tax_rate: taxRate,
          tax_amount: totalChargeAmount,
          total_amount: newTotal
        });
      }

      updated++;
    } catch (err) {
      console.error(`[SubInvoice] recalcPendingInvoiceCharges: failed for invoice ${inv.id}:`, err.message);
      skipped++;
    }
  }

  console.log(`[SubInvoice] recalcPendingInvoiceCharges: updated=${updated} skipped=${skipped} total=${pending.length}`);
  return { updated, skipped, total: pending.length };
}

module.exports = {
  createInitialInvoice,
  syncPendingInvoice,
  recalcPendingInvoiceCharges,
  calcBillingEnd,
  computeSubscriptionDiscount,
  closeIfNothingToCollect
};
