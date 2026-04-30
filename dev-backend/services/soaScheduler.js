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
 * Process monthly SOA for all eligible contracts.
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

    // Find all active SupplierContracts with monthly_soa payment cycle
    const contracts = await SupplierContract.findAll({
      where: { status: 'active' },
      include: [{ model: SupplierCompany, as: 'supplierCompany', attributes: ['id', 'name', 'company_name', 'currency'] }]
    });
    const monthlyContracts = contracts.filter(c => c.payment_terms?.invoice_cycle === 'monthly_soa');

    let success = 0, errors = 0, skipped = 0;

    for (const contract of monthlyContracts) {
      try {
        const payer = await computePayerForBuyer(contract.entity_type, contract.entity_id);
        if (!payer) { skipped++; continue; }

        // Find trade invoices issued by this supplier to this buyer in last month
        // Skip invoices already bundled in a SOA (idempotency — rerun safe)
        const invoices = await Invoice.findAll({
          where: {
            invoice_category: 'trade',
            issuer_type: 'supplier',
            issuer_id: contract.supplier_company_id,
            payer_type: payer.payer_type,
            payer_id: payer.payer_id,
            parent_soa_invoice_id: null,
            createdAt: { [Op.between]: [lastMonthStart, lastMonthEnd] }
          },
          include: [{ model: InvoiceItem, as: 'items' }],
          order: [['createdAt', 'ASC']]
        });

        if (invoices.length === 0) { skipped++; continue; }

        // Aggregate totals
        let totalDue = 0;
        for (const inv of invoices) totalDue += Number(inv.total_amount || 0);
        totalDue = Math.round(totalDue * 100) / 100;

        // Compute due date based on payment_due_day
        const dueDay = parseInt(contract.payment_terms?.payment_due_day, 10) || 15;
        const dueDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), dueDay);

        const supplierName = contract.supplierCompany?.company_name || contract.supplierCompany?.name || 'Supplier';
        const currency = invoices[0]?.currency || contract.supplierCompany?.currency || 'MYR';

        const recipients = await getBuyerRecipientUserIds(contract.entity_type, contract.entity_id);
        if (recipients.length === 0) { skipped++; continue; }

        // === SOA Invoice 발행 (B1 재설계) — invoice_category='soa' ===
        // 트랜잭션으로 SOA 생성 + 모든 child invoices 에 parent_soa_invoice_id 설정.
        const soaInvoiceNumber = `SOA-${contract.supplier_company_id}-${lastMonthStart.toISOString().slice(0, 7)}-${contract.id}`;
        const soaInvoice = await sequelize.transaction(async (t) => {
          const newSoa = await Invoice.create({
            invoice_number: soaInvoiceNumber,
            invoice_category: 'soa',
            issuer_type: 'supplier',
            issuer_id: contract.supplier_company_id,
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

          // 각 child invoice 에 parent_soa_invoice_id 설정 + status 잠금 (pending → SOA 결제로 일괄)
          await Invoice.update(
            { parent_soa_invoice_id: newSoa.id },
            { where: { id: invoices.map(i => i.id) }, transaction: t }
          );

          return newSoa;
        });
        console.log(`[soaScheduler] SOA invoice #${soaInvoice.id} (${soaInvoiceNumber}) created with ${invoices.length} children, total ${currency} ${totalDue}`);

        // Resolve buyer timezone (per-buyer for accurate SOA dates)
        let buyerTz = 'Asia/Kuala_Lumpur';
        try {
          let buyerEntity = null;
          if (contract.entity_type === 'restaurant') {
            buyerEntity = await Restaurant.findByPk(contract.entity_id, { attributes: ['operation_settings'] });
          } else if (contract.entity_type === 'brand') {
            buyerEntity = await Brand.findByPk(contract.entity_id, { attributes: ['operation_settings'] });
          } else if (contract.entity_type === 'foodcourt') {
            buyerEntity = await Foodcourt.findByPk(contract.entity_id, { attributes: ['operation_settings'] });
          }
          if (buyerEntity) buyerTz = getRestaurantTimezone(buyerEntity);
        } catch (e) { /* fallback default */ }
        const monthLabel = lastMonthStart.toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: buyerTz });

        const mail = monthlySoaEmail({
          sellerName: supplierName,
          month: monthLabel,
          invoices: invoices.map(i => i.toJSON()),
          totalDue,
          currency,
          dueDate,
          link: `${FRONTEND_URL}/pos/purchase-invoices/soa`,
          timezone: buyerTz
        });

        await sendNotificationBatch(recipients, 'monthly_soa', mail);
        success++;
        console.log(`[soaScheduler] SOA sent: ${supplierName} → ${contract.entity_type} #${contract.entity_id} (${invoices.length} invoices, ${currency} ${totalDue})`);
      } catch (e) {
        errors++;
        console.error(`[soaScheduler] Error processing contract #${contract.id}:`, e.message);
      }
    }

    const elapsedMs = Date.now() - startTime;
    const results = {
      processed: monthlyContracts.length,
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
  startSoaCron,
  computePayerForBuyer
};
