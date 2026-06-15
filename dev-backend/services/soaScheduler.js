/**
 * Monthly SOA Scheduler — Sprint 4 (Supply Chain Design 4)
 *
 * Aggregates last month's trade invoices (issuer_type='supplier') for every
 * active SupplierContract whose payment_terms.invoice_cycle === 'monthly_soa',
 * and emails a Statement of Account to the buyer side.
 *
 * Runs at 00:30 on the 1st of every month.
 *
 * Idempotency: Buyer recipients are de-duped via sendNotificationBatch; no
 * separate "soa_sent" flag — re-running on the same month would resend.
 * Operators can rerun via processMonthlySoa() if needed.
 */

const cron = require('node-cron');
const { Op } = require('sequelize');
const {
  SupplierContract,
  SupplierCompany,
  Invoice,
  InvoiceItem,
  Brand,
  Foodcourt,
  SchedulerRun
} = require('../models');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const {
  sendNotificationBatch,
  getRestaurantOwnerIds,
  getBrandManagerIds,
  getFoodcourtManagerIds
} = require('../utils/notificationService');
const { monthlySoaEmail } = require('../utils/notificationTemplates');
const { getRestaurantTimezone } = require('../utils/dateTimeHelper');
const Restaurant = require('../models/Restaurant');

const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

/**
 * Compute payer (payer_type, payer_id) for a buyer entity.
 */
async function computePayerForBuyer(entityType, entityId) {
  if (entityType === 'restaurant') {
    return { payer_type: 'restaurant', payer_id: entityId };
  }
  if (entityType === 'brand') {
    const b = await Brand.findByPk(entityId, { attributes: ['id', 'owner_id'] });
    if (!b || !b.owner_id) return null;
    return { payer_type: 'brand_manager', payer_id: b.owner_id };
  }
  if (entityType === 'foodcourt') {
    const f = await Foodcourt.findByPk(entityId, { attributes: ['id', 'owner_id'] });
    if (!f || !f.owner_id) return null;
    return { payer_type: 'foodcourt_manager', payer_id: f.owner_id };
  }
  return null;
}

/** Get buyer recipient user IDs for a buyer entity. */
async function getBuyerRecipientUserIds(entityType, entityId) {
  try {
    const ids = new Set();
    if (entityType === 'restaurant') {
      const admins = await sequelize.query(
        `SELECT id FROM users WHERE restaurant_id = :rid AND role = 'Restaurant Admin' AND email IS NOT NULL`,
        { replacements: { rid: entityId }, type: QueryTypes.SELECT }
      );
      admins.forEach(u => ids.add(u.id));
      const owners = await getRestaurantOwnerIds(entityId);
      owners.forEach(id => ids.add(id));
    } else if (entityType === 'brand') {
      const mgrs = await getBrandManagerIds(entityId);
      mgrs.forEach(id => ids.add(id));
    } else if (entityType === 'foodcourt') {
      const mgrs = await getFoodcourtManagerIds(entityId);
      mgrs.forEach(id => ids.add(id));
    }
    return Array.from(ids);
  } catch (e) {
    console.error('[soaScheduler] getBuyerRecipientUserIds error:', e.message);
    return [];
  }
}

/**
 * Issue one SOA invoice + cascade child trade invoices for a single (seller, buyer) pair.
 * Returns { issued: boolean, reason?: string }.
 *
 * Used for all 3 seller types (supplier / brand / foodcourt) — caller resolves payer,
 * sellerName, sellerCurrency, dueDay, soaPrefix, soaIdSuffix beforehand.
 */
async function issueSoaForPair({
  issuerType,           // 'supplier' | 'brand' | 'foodcourt'
  issuerId,             // supplier_company_id | brand_id | foodcourt_id
  payer,                // { payer_type, payer_id }
  buyerEntityType,      // 'restaurant' | 'brand' | 'foodcourt' (for tz resolution)
  buyerEntityId,
  sellerName,
  sellerCurrency,
  dueDay,
  referenceDate,
  lastMonthStart,
  lastMonthEnd,
  soaInvoiceNumber
}) {
  const invoices = await Invoice.findAll({
    where: {
      invoice_category: 'trade',
      issuer_type: issuerType,
      issuer_id: issuerId,
      payer_type: payer.payer_type,
      payer_id: payer.payer_id,
      parent_soa_invoice_id: null,
      createdAt: { [Op.between]: [lastMonthStart, lastMonthEnd] }
    },
    include: [{ model: InvoiceItem, as: 'items' }],
    order: [['createdAt', 'ASC']]
  });

  if (invoices.length === 0) return { issued: false, reason: 'no_invoices' };

  let totalDue = 0;
  for (const inv of invoices) totalDue += Number(inv.total_amount || 0);
  totalDue = Math.round(totalDue * 100) / 100;

  const dueDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), dueDay);
  const currency = invoices[0]?.currency || sellerCurrency || 'MYR';

  const recipients = await getBuyerRecipientUserIds(buyerEntityType, buyerEntityId);
  if (recipients.length === 0) return { issued: false, reason: 'no_recipients' };

  // Resolve issued_by (Invoice.issued_by is NOT NULL) — 발행자 entity 의 owner_id.
  // createTradeInvoice(purchaseOrderService) 와 동일 규칙. 누락 시 monthly SOA 생성이
  // notNull 위반으로 매월 전부 실패하던 버그 수정 (2026-06-15, 런타임 검증으로 발견).
  let issuedBy = 1;
  try {
    if (issuerType === 'supplier') { const sc = await SupplierCompany.findByPk(issuerId, { attributes: ['owner_id'] }); if (sc?.owner_id) issuedBy = sc.owner_id; }
    else if (issuerType === 'brand') { const b = await Brand.findByPk(issuerId, { attributes: ['owner_id'] }); if (b?.owner_id) issuedBy = b.owner_id; }
    else if (issuerType === 'foodcourt') { const fc = await Foodcourt.findByPk(issuerId, { attributes: ['owner_id'] }); if (fc?.owner_id) issuedBy = fc.owner_id; }
  } catch (_) { /* fallback 1 유지 */ }

  const soaInvoice = await sequelize.transaction(async (t) => {
    const newSoa = await Invoice.create({
      invoice_number: soaInvoiceNumber,
      invoice_category: 'soa',
      issued_by: issuedBy,
      issuer_type: issuerType,
      issuer_id: issuerId,
      payer_type: payer.payer_type,
      payer_id: payer.payer_id,
      currency,
      subtotal: totalDue,
      total_amount: totalDue,
      tax_amount: 0,
      paid_amount: 0,
      status: 'pending_payment',
      issued_at: referenceDate,
      due_date: dueDate,
      service_description: `Monthly Statement of Account — ${invoices.length} invoices`,
      notes: `Bundled SOA for ${invoices.length} trade invoices in ${lastMonthStart.toISOString().slice(0, 7)}`
    }, { transaction: t });

    await Invoice.update(
      { parent_soa_invoice_id: newSoa.id },
      { where: { id: invoices.map(i => i.id) }, transaction: t }
    );

    return newSoa;
  });

  console.log(`[soaScheduler] SOA #${soaInvoice.id} (${soaInvoiceNumber}) — ${issuerType} → ${buyerEntityType} #${buyerEntityId}, ${invoices.length} invoices, ${currency} ${totalDue}`);

  // Resolve buyer timezone (per-buyer)
  let buyerTz = 'Asia/Kuala_Lumpur';
  try {
    let buyerEntity = null;
    if (buyerEntityType === 'restaurant') {
      buyerEntity = await Restaurant.findByPk(buyerEntityId, { attributes: ['operation_settings'] });
    } else if (buyerEntityType === 'brand') {
      buyerEntity = await Brand.findByPk(buyerEntityId, { attributes: ['operation_settings'] });
    } else if (buyerEntityType === 'foodcourt') {
      buyerEntity = await Foodcourt.findByPk(buyerEntityId, { attributes: ['operation_settings'] });
    }
    if (buyerEntity) buyerTz = getRestaurantTimezone(buyerEntity);
  } catch (e) { /* fallback default */ }
  const monthLabel = lastMonthStart.toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: buyerTz });

  const mail = monthlySoaEmail({
    sellerName,
    month: monthLabel,
    invoices: invoices.map(i => i.toJSON()),
    totalDue,
    currency,
    dueDate,
    link: `${FRONTEND_URL}/pos/purchase-invoices/soa`,
    timezone: buyerTz
  });

  await sendNotificationBatch(recipients, 'monthly_soa', mail);
  return { issued: true, soaId: soaInvoice.id, totalDue, currency, invoiceCount: invoices.length };
}

/**
 * Process monthly SOA for all eligible (supplier + brand + foodcourt) sellers.
 * Returns { processed, success, errors, skipped }.
 */
async function processMonthlySoa(referenceDate = new Date()) {
  const startTime = Date.now();
  const startedAt = new Date();

  // Open SchedulerRun row up-front
  let run = null;
  try {
    run = await SchedulerRun.create({ job_name: 'monthly_soa', started_at: startedAt });
  } catch (e) {
    console.error('[soaScheduler] SchedulerRun.create failed:', e.message);
  }

  try {
    // Compute last month's date range
    const lastMonthStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - 1, 1, 0, 0, 0, 0);
    const lastMonthEnd = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 0, 23, 59, 59, 999);

    console.log(`[soaScheduler] Processing monthly SOA (${lastMonthStart.toISOString()} → ${lastMonthEnd.toISOString()})`);

    let processed = 0, success = 0, errors = 0, skipped = 0;

    // ────────────────────────────────────────────────────────────────────
    // 1. SUPPLIER SOA — SupplierContract.payment_terms.invoice_cycle='monthly_soa'
    // ────────────────────────────────────────────────────────────────────
    const contracts = await SupplierContract.findAll({
      where: { status: 'active' },
      include: [{ model: SupplierCompany, as: 'supplierCompany', attributes: ['id', 'name', 'company_name', 'currency'] }]
    });
    const monthlyContracts = contracts.filter(c => c.payment_terms?.invoice_cycle === 'monthly_soa');
    processed += monthlyContracts.length;

    for (const contract of monthlyContracts) {
      try {
        const payer = await computePayerForBuyer(contract.entity_type, contract.entity_id);
        if (!payer) { skipped++; continue; }

        const dueDay = parseInt(contract.payment_terms?.payment_due_day, 10) || 15;
        const supplierName = contract.supplierCompany?.company_name || contract.supplierCompany?.name || 'Supplier';
        const soaInvoiceNumber = `SOA-${contract.supplier_company_id}-${lastMonthStart.toISOString().slice(0, 7)}-${contract.id}`;

        const result = await issueSoaForPair({
          issuerType: 'supplier',
          issuerId: contract.supplier_company_id,
          payer,
          buyerEntityType: contract.entity_type,
          buyerEntityId: contract.entity_id,
          sellerName: supplierName,
          sellerCurrency: contract.supplierCompany?.currency,
          dueDay,
          referenceDate,
          lastMonthStart,
          lastMonthEnd,
          soaInvoiceNumber
        });
        if (result.issued) success++; else skipped++;
      } catch (e) {
        errors++;
        console.error(`[soaScheduler] Error processing supplier contract #${contract.id}:`, e.message);
      }
    }

    // ────────────────────────────────────────────────────────────────────
    // 2. BRAND SOA — Restaurant.brand_billing_terms.invoice_cycle='monthly_soa'
    // ────────────────────────────────────────────────────────────────────
    const brandRestaurants = await Restaurant.findAll({
      where: { brand_id: { [Op.ne]: null } },
      attributes: ['id', 'name', 'brand_id', 'brand_billing_terms']
    });
    const brandMonthly = brandRestaurants.filter(r =>
      r.brand_billing_terms?.invoice_cycle === 'monthly_soa'
    );
    processed += brandMonthly.length;

    for (const restaurant of brandMonthly) {
      try {
        const brand = await Brand.findByPk(restaurant.brand_id, { attributes: ['id', 'name'] });
        if (!brand) { skipped++; continue; }

        const dueDay = parseInt(restaurant.brand_billing_terms?.payment_due_day, 10) || 15;
        const sellerName = brand.name || 'Brand';
        const soaInvoiceNumber = `SOA-BRD${brand.id}-${lastMonthStart.toISOString().slice(0, 7)}-R${restaurant.id}`;

        const result = await issueSoaForPair({
          issuerType: 'brand',
          issuerId: brand.id,
          payer: { payer_type: 'restaurant', payer_id: restaurant.id },
          buyerEntityType: 'restaurant',
          buyerEntityId: restaurant.id,
          sellerName,
          sellerCurrency: restaurant.brand_billing_terms?.currency,
          dueDay,
          referenceDate,
          lastMonthStart,
          lastMonthEnd,
          soaInvoiceNumber
        });
        if (result.issued) success++; else skipped++;
      } catch (e) {
        errors++;
        console.error(`[soaScheduler] Error processing brand SOA for restaurant #${restaurant.id}:`, e.message);
      }
    }

    // ────────────────────────────────────────────────────────────────────
    // 3. FOODCOURT SOA — Restaurant.foodcourt_billing_terms.invoice_cycle='monthly_soa'
    // ────────────────────────────────────────────────────────────────────
    const fcRestaurants = await Restaurant.findAll({
      where: { foodcourt_id: { [Op.ne]: null } },
      attributes: ['id', 'name', 'foodcourt_id', 'foodcourt_billing_terms']
    });
    const fcMonthly = fcRestaurants.filter(r =>
      r.foodcourt_billing_terms?.invoice_cycle === 'monthly_soa'
    );
    processed += fcMonthly.length;

    for (const restaurant of fcMonthly) {
      try {
        const fc = await Foodcourt.findByPk(restaurant.foodcourt_id, { attributes: ['id', 'name'] });
        if (!fc) { skipped++; continue; }

        const dueDay = parseInt(restaurant.foodcourt_billing_terms?.payment_due_day, 10) || 15;
        const sellerName = fc.name || 'Foodcourt';
        const soaInvoiceNumber = `SOA-FC${fc.id}-${lastMonthStart.toISOString().slice(0, 7)}-R${restaurant.id}`;

        const result = await issueSoaForPair({
          issuerType: 'foodcourt',
          issuerId: fc.id,
          payer: { payer_type: 'restaurant', payer_id: restaurant.id },
          buyerEntityType: 'restaurant',
          buyerEntityId: restaurant.id,
          sellerName,
          sellerCurrency: restaurant.foodcourt_billing_terms?.currency,
          dueDay,
          referenceDate,
          lastMonthStart,
          lastMonthEnd,
          soaInvoiceNumber
        });
        if (result.issued) success++; else skipped++;
      } catch (e) {
        errors++;
        console.error(`[soaScheduler] Error processing foodcourt SOA for restaurant #${restaurant.id}:`, e.message);
      }
    }

    const elapsedMs = Date.now() - startTime;
    const results = {
      processed,
      success,
      errors,
      skipped,
      month: lastMonthStart.toISOString().slice(0, 7)
    };
    console.log(`[soaScheduler] Done in ${(elapsedMs / 1000).toFixed(2)}s`, results);

    if (run) {
      try {
        await run.update({
          finished_at: new Date(),
          duration_ms: elapsedMs,
          status: errors > 0 ? 'partial' : 'success',
          results
        });
      } catch (e) { console.error('[soaScheduler] SchedulerRun.update failed:', e.message); }
    }

    return { success: true, ...results };
  } catch (error) {
    console.error('[soaScheduler] Fatal error:', error);
    if (run) {
      try {
        await run.update({
          finished_at: new Date(),
          duration_ms: Date.now() - startTime,
          status: 'error',
          error_message: String(error?.stack || error?.message || error)
        });
      } catch (e) { console.error('[soaScheduler] SchedulerRun.update (error) failed:', e.message); }
    }
    return { success: false, error: error.message };
  }
}

/**
 * On-demand SOA generation — BG/FG operator triggers a statement NOW instead of
 * waiting for the 1st-of-month cron. Bundles ALL currently-unbundled trade invoices
 * for one issuer↔restaurant pair (any month), into a single SOA. Idempotent
 * (issueSoaForPair only picks parent_soa_invoice_id=null rows). (2026-06-15)
 *
 * @param {('brand'|'foodcourt')} issuerType
 * @param {number} issuerId  — brand_id | foodcourt_id
 * @param {number} restaurantId
 * @returns {Promise<{issued:boolean, soaId?:number, reason?:string}>}
 */
async function generateSoaNow({ issuerType, issuerId, restaurantId }) {
  if (!['brand', 'foodcourt'].includes(issuerType)) return { issued: false, reason: 'bad_issuer_type' };
  const restaurant = await Restaurant.findByPk(restaurantId, {
    attributes: ['id', 'name', 'brand_id', 'foodcourt_id', 'brand_billing_terms', 'foodcourt_billing_terms']
  });
  if (!restaurant) return { issued: false, reason: 'restaurant_not_found' };

  const terms = issuerType === 'brand' ? restaurant.brand_billing_terms : restaurant.foodcourt_billing_terms;
  const ownerField = issuerType === 'brand' ? restaurant.brand_id : restaurant.foodcourt_id;
  if (parseInt(ownerField, 10) !== parseInt(issuerId, 10)) return { issued: false, reason: 'not_owned' };

  const Model = issuerType === 'brand' ? Brand : Foodcourt;
  const seller = await Model.findByPk(issuerId, { attributes: ['id', 'name'] });
  if (!seller) return { issued: false, reason: 'seller_not_found' };

  const now = new Date();
  const dueDay = parseInt(terms?.payment_due_day, 10) || 15;
  // dueDate = 이번달 dueDay (이미 지났으면 다음달) — 수동 발행이라 미래 마감일 보장
  let dueRef = new Date(now.getFullYear(), now.getMonth(), 1);
  if (now.getDate() > dueDay) dueRef = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  // 안 묶인 거래인보이스 전부 포함 (월 무관) — 넓은 범위
  const rangeStart = new Date(2000, 0, 1);
  const rangeEnd = now;
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  const prefix = issuerType === 'brand' ? 'BRD' : 'FC';
  const soaInvoiceNumber = `SOA-${prefix}${issuerId}-R${restaurantId}-M${stamp}`;

  const result = await issueSoaForPair({
    issuerType, issuerId,
    payer: { payer_type: 'restaurant', payer_id: restaurantId },
    buyerEntityType: 'restaurant', buyerEntityId: restaurantId,
    sellerName: seller.name || (issuerType === 'brand' ? 'Brand' : 'Foodcourt'),
    sellerCurrency: terms?.currency,
    dueDay,
    referenceDate: dueRef,
    lastMonthStart: rangeStart,
    lastMonthEnd: rangeEnd,
    soaInvoiceNumber
  });
  return { issued: !!result.issued, soaId: result.soaId, reason: result.reason };
}

/**
 * Register the cron schedule. Runs at 00:30 on the 1st of each month.
 */
function startSoaCron() {
  cron.schedule('30 0 1 * *', async () => {
    console.log('[soaScheduler] Cron tick — running monthly SOA');
    await processMonthlySoa();
  });
  console.log('✓ Monthly SOA scheduler started — runs at 00:30 on the 1st of each month');
}

module.exports = {
  processMonthlySoa,
  generateSoaNow,
  startSoaCron,
  computePayerForBuyer
};
