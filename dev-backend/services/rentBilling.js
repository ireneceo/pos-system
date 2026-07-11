/**
 * 임차인 임대료 청구 (Tenant Rent Billing) — 발행 로직 단일 소스.
 * 설계: docs/TENANT_RENT_BILLING.md
 *
 * 계약(stage='active' + financial_terms.base_rent > 0)에서 매월 임대료 인보이스를 만든다.
 * 스케줄러와 수동 발행(POST /api/rent/generate)이 **이 함수 하나**를 공유한다 — 두 경로가
 * 각자 인보이스를 만들면 곧 금액/멱등 규칙이 갈라진다.
 */
const { Op } = require('sequelize');
const Contract = require('../models/Contract');
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const Restaurant = require('../models/Restaurant');

const CATEGORY = 'rent';
const DEFAULT_BILLING_DAY = 1;
const DEFAULT_GRACE_DAYS = 5;

/** 계약의 임대 조건 정규화. 청구 대상이 아니면 null. */
function rentTermsOf(contract) {
  const ft = contract.financial_terms || {};
  const base = Number(ft.base_rent);
  if (!Number.isFinite(base) || base <= 0) return null;   // 임대료 미입력 = 청구 안 함

  const maintenance = Number(ft.maintenance_fee);
  const day = Number(ft.billing_day);
  const grace = Number(ft.grace_days);

  return {
    baseRent: base,
    maintenanceFee: Number.isFinite(maintenance) && maintenance > 0 ? maintenance : 0,
    // 29~31 은 모델 검증이 막지만, 옛 데이터 방어로 여기서도 clamp (그런 날 없는 달 = 발행 누락)
    billingDay: Number.isInteger(day) && day >= 1 && day <= 28 ? day : DEFAULT_BILLING_DAY,
    graceDays: Number.isInteger(grace) && grace >= 0 && grace <= 60 ? grace : DEFAULT_GRACE_DAYS,
  };
}

/** 'YYYY-MM' → 그 달의 [시작, 끝] (UTC 기준 날짜 경계) */
function monthBounds(monthStr) {
  const [y, m] = monthStr.split('-').map(Number);
  const start = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0));
  const end = new Date(Date.UTC(y, m, 0, 23, 59, 59));   // 그 달 마지막 날
  return { start, end };
}

function currentMonth(now = new Date()) {
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
}

/** 임대료 청구 대상 계약 (운영자 스코프 적용 가능) */
async function activeRentContracts({ entityType, entityId, contractId } = {}) {
  const where = { stage: 'active' };
  if (entityType) { where.entity_type = entityType; where.entity_id = entityId; }
  if (contractId) where.id = contractId;

  const contracts = await Contract.findAll({ where });
  return contracts.filter((c) => rentTermsOf(c) !== null);
}

/** 그 달의 임대료 인보이스 (없으면 null) — 멱등의 단일 기준 */
async function findRentInvoice(contractId, monthStart) {
  return Invoice.findOne({
    where: { contract_id: contractId, invoice_category: CATEGORY, billing_period_start: monthStart },
  });
}

async function nextInvoiceNumber(monthStr) {
  const prefix = `RENT-${monthStr.replace('-', '')}`;
  const last = await Invoice.findOne({
    where: { invoice_number: { [Op.like]: `${prefix}-%` } },
    order: [['invoice_number', 'DESC']],
  });
  const seq = last ? Number(String(last.invoice_number).split('-').pop()) + 1 : 1;
  return `${prefix}-${String(seq).padStart(3, '0')}`;
}

/**
 * 한 계약의 해당 월 임대료 인보이스를 만든다.
 * 이미 있으면 만들지 않는다(멱등) → { created: false }.
 */
async function generateForContract(contract, monthStr) {
  const terms = rentTermsOf(contract);
  if (!terms) return { created: false, reason: 'no_rent_terms' };
  if (!contract.restaurant_id) return { created: false, reason: 'no_tenant_restaurant' };

  const { start, end } = monthBounds(monthStr);
  const existing = await findRentInvoice(contract.id, start);
  if (existing) return { created: false, reason: 'already_exists', invoiceId: existing.id };

  const total = terms.baseRent + terms.maintenanceFee;
  const [y, m] = monthStr.split('-').map(Number);
  const dueDate = new Date(Date.UTC(y, m - 1, terms.billingDay + terms.graceDays, 0, 0, 0));

  const restaurant = await Restaurant.findByPk(contract.restaurant_id);
  const currency = contract.currency || restaurant?.currency || 'MYR';

  const invoice = await Invoice.create({
    restaurant_id: contract.restaurant_id,
    contract_id: contract.id,
    invoice_number: await nextInvoiceNumber(monthStr),
    type: 'automatic',
    invoice_category: CATEGORY,
    billing_period_start: start,
    billing_period_end: end,
    due_date: dueDate,
    subtotal: total,
    total_amount: total,
    currency,
    status: 'pending_payment',
    notes: `Monthly rent for ${monthStr}. Auto-generated from contract #${contract.id}.`,
    issued_by: 0,
    issued_at: new Date(),
    issuer_type: contract.entity_type,        // 임대사업자 = 계약 발행 엔티티(푸드코트 등)
    issuer_id: contract.entity_id,
    payer_type: 'restaurant',                 // 임차인 = 입점 매장
    payer_id: contract.restaurant_id,
  });

  await InvoiceItem.create({
    invoice_id: invoice.id,
    item_type: 'rent',
    description: `Base rent - ${monthStr}`,
    calculation_method: 'fixed',
    fixed_amount: terms.baseRent,
    calculated_amount: terms.baseRent,
    total_amount: terms.baseRent,
  });

  if (terms.maintenanceFee > 0) {
    await InvoiceItem.create({
      invoice_id: invoice.id,
      item_type: 'rent',
      description: `Maintenance fee - ${monthStr}`,
      calculation_method: 'fixed',
      fixed_amount: terms.maintenanceFee,
      calculated_amount: terms.maintenanceFee,
      total_amount: terms.maintenanceFee,
    });
  }

  return { created: true, invoiceId: invoice.id, amount: total };
}

/** 여러 계약 일괄 발행 (스케줄러 + 수동 발행 공용) */
async function generateRentInvoices({ month, contractId, entityType, entityId } = {}) {
  const monthStr = month || currentMonth();
  if (!/^\d{4}-\d{2}$/.test(monthStr)) {
    const err = new Error('month must be in YYYY-MM format');
    err.code = 'INVALID_MONTH';
    throw err;
  }

  const contracts = await activeRentContracts({ entityType, entityId, contractId });
  const result = { month: monthStr, generated: 0, skipped: 0, errors: 0, invoices: [] };

  for (const c of contracts) {
    try {
      const r = await generateForContract(c, monthStr);
      if (r.created) {
        result.generated += 1;
        result.invoices.push({ contractId: c.id, invoiceId: r.invoiceId, amount: r.amount });
      } else {
        result.skipped += 1;
      }
    } catch (e) {
      console.error(`[rent-billing] 계약 #${c.id} 발행 실패:`, e.message);
      result.errors += 1;
    }
  }

  return result;
}

module.exports = {
  CATEGORY,
  rentTermsOf,
  monthBounds,
  currentMonth,
  activeRentContracts,
  findRentInvoice,
  generateForContract,
  generateRentInvoices,
};
