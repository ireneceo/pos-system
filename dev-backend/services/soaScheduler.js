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
const {
  sendNotificationBatch,
  getRestaurantAdminAndOwnerIds,
  getBrandManagerIds,
  getFoodcourtManagerIds
} = require('../utils/notificationService');
const { monthlySoaEmail } = require('../utils/notificationTemplates');
const { getRestaurantTimezone, getDateBounds, getCurrentLocalDate } = require('../utils/dateTimeHelper');
const Restaurant = require('../models/Restaurant');

const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

/**
 * 청구 기간을 사람이 읽는 한 줄로. 달력 한 달에 딱 맞으면 «September 2026», 아니면 날짜 범위.
 * 메일 제목·본문·notes 가 **같은 함수**를 쓴다 — 자리마다 다른 문자열이 나오면 그게 곧 「January 2000」 류의 사고다.
 */
function periodLabelOf(startDay, endDay, locale = 'en-US') {
  // ⚠ **날짜 문자열(YYYY-MM-DD)을 받는다 — Date 를 받아 타임존으로 다시 찍지 않는다.**
  //   그게 하루 밀림의 원인이었다: 기간 끝을 서버 UTC 로 23:59:59.999 로 만든 뒤 매장 tz(+8)로
  //   표시하면 다음 날이 된다(Aug 5–20 선택 → 라벨 «Aug 5 – Aug 21»). 2026-09-24 Fable 게이트 적록.
  const [sy, sm, sd] = String(startDay).split('-').map(Number);
  const [ey, em, ed] = String(endDay).split('-').map(Number);
  const lastDayOf = (y, m) => new Date(Date.UTC(y, m, 0)).getUTCDate();
  // 「달력 한 달을 꽉 채웠나」 판정도 그 달력(매장 날짜)으로 한다.
  if (sy === ey && sm === em && sd === 1 && ed === lastDayOf(sy, sm)) {
    return new Date(Date.UTC(sy, sm - 1, 1)).toLocaleDateString(locale, {
      year: 'numeric', month: 'long', timeZone: 'UTC'
    });
  }
  const fmt = (y, m, d) => new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(locale, {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
  });
  return `${fmt(sy, sm, sd)} – ${fmt(ey, em, ed)}`;
}

/**
 * 결제 마감일 — 발행일 **이후** 처음 오는 「매월 며칠」.
 * cron 과 수동 발행이 같은 함수를 쓴다(전에는 각자 계산해 수동 쪽만 미래 발행일이 됐다).
 * 31일 계약인데 그 달이 짧으면 그 달 말일로 내린다.
 */
function nextDueDate(issuedAt, dueDay) {
  const base = issuedAt instanceof Date ? issuedAt : new Date(issuedAt);
  const day = Math.min(Math.max(parseInt(dueDay, 10) || 15, 1), 31);
  const clamp = (y, m) => new Date(y, m, Math.min(day, new Date(y, m + 1, 0).getDate()));
  const thisMonth = clamp(base.getFullYear(), base.getMonth());
  if (thisMonth > base) return thisMonth;
  return clamp(base.getFullYear(), base.getMonth() + 1);
}

/**
 * 정산서 번호가 이미 있으면 접미사를 붙여 비어 있는 번호를 돌려준다.
 *
 * 왜 필요한가 (2026-09-24 실측): 번호가 시각 도장이라, **취소하고 바로 다시 발행**하면
 * 같은 초 안에 같은 번호가 나와 `invoice_number` UNIQUE 에 걸려 500 이 났다.
 * 그런데 「취소 → 재발행」은 잘못 나간 정산서를 바로잡는 정규 절차다 — 막히면 안 된다.
 */
async function uniqueSoaNumber(base) {
  for (let i = 0; i < 20; i += 1) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`;
    const taken = await Invoice.findOne({ where: { invoice_number: candidate }, attributes: ['id'], paranoid: false });
    if (!taken) return candidate;
  }
  // 20개가 전부 차는 일은 사실상 없지만, 조용히 중복을 만들지 않는다.
  return `${base}-${Date.now().toString().slice(-5)}`;
}

/** 구매자 엔티티의 타임존. 기간 경계·라벨이 전부 이 값을 기준으로 한다. */
async function resolveBuyerTimezone(entityType, entityId) {
  try {
    let e = null;
    if (entityType === 'restaurant') e = await Restaurant.findByPk(entityId, { attributes: ['operation_settings'] });
    else if (entityType === 'brand') e = await Brand.findByPk(entityId, { attributes: ['operation_settings'] });
    else if (entityType === 'foodcourt') e = await Foodcourt.findByPk(entityId, { attributes: ['operation_settings'] });
    if (e) return getRestaurantTimezone(e);
  } catch (_) { /* 기본값으로 */ }
  return 'Asia/Kuala_Lumpur';
}

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
      (await getRestaurantAdminAndOwnerIds(entityId)).forEach(id => ids.add(id));
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
/**
 * ⚠ 2026-09-24 — 값의 «뜻» 을 분리했다 (Fable 판정).
 *
 * 전에는 하나의 값이 두 자리에 쓰여 운영에 두 가지 결함을 냈다:
 *   ① `lastMonthStart` 가 «모으는 범위의 시작» 이면서 동시에 «메일에 찍는 기간 라벨» 이었다.
 *      수동 발행이 범위를 넓히려고 2000-01-01 을 넣자 메일 제목이 «January 2000» 으로 나갔다.
 *   ② `referenceDate` 가 «마감일 계산 기준» 이면서 동시에 «발행일» 이었다.
 *      수동 발행이 미래(다음달 1일)를 넣자 발행일이 미래가 됐다.
 * 그래서 이제 넷을 따로 받는다 — periodStart/periodEnd(무엇을 모으나·라벨), issuedAt(언제 만들었나), dueDate(언제까지).
 */
async function issueSoaForPair({
  issuerType,           // 'supplier' | 'brand' | 'foodcourt'
  issuerId,             // supplier_company_id | brand_id | foodcourt_id
  payer,                // { payer_type, payer_id }
  buyerEntityType,      // 'restaurant' | 'brand' | 'foodcourt' (for tz resolution)
  buyerEntityId,
  sellerName,
  sellerCurrency,
  periodStartDay,       // 청구 기간 시작 — **구매 매장 달력의 YYYY-MM-DD**
  periodEndDay,         // 청구 기간 끝   — 같은 형식
  issuedAt,             // 발행일 = 만든 날 (소급 금지)
  dueDate,              // 결제 마감일
  includeOlderUnbundled = true, // 기간 이전의 «아직 안 묶인» 미납분도 넣는다(기본)
  soaInvoiceNumber
}) {
  // ⚠ 기간은 **구매 매장의 달력 날짜**다. 문자열로 받아 여기서 딱 한 번 시각으로 바꾼다.
  //   서버(UTC) 로 경계를 만들면 매장(+8)에서 하루 밀린다 — 화면 Period 칸과 메일 라벨이
  //   실제로 틀리게 나왔다(2026-09-24 Fable 게이트 적록). DST 안전한 기존 유틸을 쓴다.
  const buyerTz = await resolveBuyerTimezone(buyerEntityType, buyerEntityId);
  const { startOfDay: periodStart } = getDateBounds(periodStartDay, buyerTz);
  const { endOfDay: periodEnd } = getDateBounds(periodEndDay, buyerTz);

  // 수집 상한은 항상 periodEnd. 하한은 규칙에 따른다:
  //   includeOlderUnbundled=true  → 하한 없음. 지난달 cron 이 놓친 그 전 달 잔여분이 영구 누락되지 않는다.
  //   includeOlderUnbundled=false → 기간 안의 것만(엄격). 누락분은 사람이 기간을 직접 잡아 따로 발행해야 한다.
  const createdAtWhere = includeOlderUnbundled
    ? { [Op.lte]: periodEnd }
    : { [Op.between]: [periodStart, periodEnd] };

  const invoices = await Invoice.findAll({
    where: {
      invoice_category: 'trade',
      issuer_type: issuerType,
      issuer_id: issuerId,
      payer_type: payer.payer_type,
      payer_id: payer.payer_id,
      parent_soa_invoice_id: null,
      // 🔴 이미 낸 것·취소된 것은 묶지 않는다 (2026-09-07 Fable).
      //   종전엔 status 를 안 봐서, `receive-and-pay` 로 그 자리에서 현금 낸 건이
      //   **다음 달 정산서에 또 실렸다**. 정산서는 "아직 안 낸 것의 묶음"이다.
      status: { [Op.notIn]: ['paid', 'cancelled'] },
      createdAt: createdAtWhere
    },
    include: [{ model: InvoiceItem, as: 'items' }],
    order: [['createdAt', 'ASC']]
  });

  if (invoices.length === 0) return { issued: false, reason: 'no_invoices' };

  let totalDue = 0;
  for (const inv of invoices) totalDue += Number(inv.total_amount || 0);
  totalDue = Math.round(totalDue * 100) / 100;

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
      issued_at: issuedAt,
      due_date: dueDate,
      // 기간을 **행에 저장**한다 — 화면 Period 칸·메일이 이 값을 읽는다.
      //   전에는 안 채워서 화면에 「-」 가 나왔다(거래·임대료·구독은 이미 채우고 있었다).
      billing_period_start: periodStart,
      billing_period_end: periodEnd,
      service_description: `Monthly Statement of Account — ${invoices.length} invoices`,
      notes: `Bundled SOA for ${invoices.length} trade invoices (${periodLabelOf(periodStartDay, periodEndDay)})`
    }, { transaction: t });

    await Invoice.update(
      { parent_soa_invoice_id: newSoa.id },
      { where: { id: invoices.map(i => i.id) }, transaction: t }
    );

    return newSoa;
  });

  console.log(`[soaScheduler] SOA #${soaInvoice.id} (${soaInvoiceNumber}) — ${issuerType} → ${buyerEntityType} #${buyerEntityId}, ${invoices.length} invoices, ${currency} ${totalDue}`);

  // 라벨은 **저장된 기간(매장 달력 날짜)** 으로 만든다 — 수집 범위 값이 라벨로 새어 나가던 자리다.
  const monthLabel = periodLabelOf(periodStartDay, periodEndDay);
  // 「며칠 안에 내야 하나」 — 새 설정 칸을 만들지 않고 발행일과 마감일의 차로 낸다.
  const dueInDays = Math.max(0, Math.ceil((dueDate - issuedAt) / 86400000));

  const mail = monthlySoaEmail({
    sellerName,
    month: monthLabel,
    dueInDays,
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

    // 발행일 = 만든 날. 기간과 섞지 않는다(전에는 referenceDate 하나가 둘 다였다).
    const issuedAt = new Date();
    // 기간은 **날짜 문자열**로 넘긴다 — instant 화는 issueSoaForPair 가 구매 매장 tz 로 한 번만 한다.
    const p2d = (n) => String(n).padStart(2, '0');
    const lastMonthStartDay = `${lastMonthStart.getFullYear()}-${p2d(lastMonthStart.getMonth() + 1)}-01`;
    const lastMonthEndDay = `${lastMonthEnd.getFullYear()}-${p2d(lastMonthEnd.getMonth() + 1)}-${p2d(lastMonthEnd.getDate())}`;
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
        const soaInvoiceNumber = await uniqueSoaNumber(`SOA-${contract.supplier_company_id}-${lastMonthStart.toISOString().slice(0, 7)}-${contract.id}`);

        const result = await issueSoaForPair({
          issuerType: 'supplier',
          issuerId: contract.supplier_company_id,
          payer,
          buyerEntityType: contract.entity_type,
          buyerEntityId: contract.entity_id,
          sellerName: supplierName,
          sellerCurrency: contract.supplierCompany?.currency,
          periodStartDay: lastMonthStartDay,
          periodEndDay: lastMonthEndDay,
          issuedAt,
          dueDate: nextDueDate(issuedAt, dueDay),
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
        const soaInvoiceNumber = await uniqueSoaNumber(`SOA-BRD${brand.id}-${lastMonthStart.toISOString().slice(0, 7)}-R${restaurant.id}`);

        const result = await issueSoaForPair({
          issuerType: 'brand',
          issuerId: brand.id,
          payer: { payer_type: 'restaurant', payer_id: restaurant.id },
          buyerEntityType: 'restaurant',
          buyerEntityId: restaurant.id,
          sellerName,
          sellerCurrency: restaurant.brand_billing_terms?.currency,
          periodStartDay: lastMonthStartDay,
          periodEndDay: lastMonthEndDay,
          issuedAt,
          dueDate: nextDueDate(issuedAt, dueDay),
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
        const soaInvoiceNumber = await uniqueSoaNumber(`SOA-FC${fc.id}-${lastMonthStart.toISOString().slice(0, 7)}-R${restaurant.id}`);

        const result = await issueSoaForPair({
          issuerType: 'foodcourt',
          issuerId: fc.id,
          payer: { payer_type: 'restaurant', payer_id: restaurant.id },
          buyerEntityType: 'restaurant',
          buyerEntityId: restaurant.id,
          sellerName,
          sellerCurrency: restaurant.foodcourt_billing_terms?.currency,
          periodStartDay: lastMonthStartDay,
          periodEndDay: lastMonthEndDay,
          issuedAt,
          dueDate: nextDueDate(issuedAt, dueDay),
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
async function generateSoaNow({
  issuerType, issuerId, restaurantId,
  periodStartDay: periodStartIn = null,   // 'YYYY-MM-DD' (구매 매장 달력)
  periodEndDay: periodEndIn = null,
  includeOlderUnbundled = true
}) {
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

  // 기간 — 사람이 고른 값이 있으면 그것, 없으면 «지난달 1일~말일». **전부 매장 달력의 날짜 문자열.**
  //   ⛔ 옛 코드는 여기서 2000-01-01 을 넣어 수집 범위를 넓혔고, 그 값이 메일 라벨로 새어
  //      「January 2026」 대신 「January 2000」 이 나갔다. 이제 범위(하한)와 라벨을 분리한다 —
  //      «기간 이전의 안 묶인 미납분» 은 includeOlderUnbundled 로 들어오지, 라벨을 왜곡하지 않는다.
  const buyerTz = await resolveBuyerTimezone('restaurant', restaurantId);
  const todayDay = getCurrentLocalDate(buyerTz);          // 매장 달력의 오늘
  let periodStartDay = periodStartIn || null;
  let periodEndDay = periodEndIn || null;
  if (!periodStartDay || !periodEndDay) {
    const [ty, tm] = todayDay.split('-').map(Number);
    const prevY = tm === 1 ? ty - 1 : ty;
    const prevM = tm === 1 ? 12 : tm - 1;
    const lastDay = new Date(Date.UTC(prevY, prevM, 0)).getUTCDate();
    const p2 = (n) => String(n).padStart(2, '0');
    periodStartDay = `${prevY}-${p2(prevM)}-01`;
    periodEndDay = `${prevY}-${p2(prevM)}-${p2(lastDay)}`;
  }
  // 미래 판정은 **날짜 문자열 비교**다. 끝을 시각(23:59:59.999)으로 만들어 지금과 비교하면
  // 「오늘까지」가 언제 눌러도 미래로 읽혀 항상 400 이었다(2026-09-24 Fable 게이트 적록).
  if (periodEndDay > todayDay) return { issued: false, reason: 'period_end_in_future' };
  if (periodStartDay > periodEndDay) return { issued: false, reason: 'period_out_of_order' };

  // 발행일 = 만든 날. 마감일 기준점과 같은 값을 쓰지 않는다(그게 미래 발행일의 원인이었다).
  const issuedAt = now;
  const dueDate = nextDueDate(issuedAt, dueDay);

  // 번호에 **초**까지 넣는다. 분 단위였을 때는 «취소하고 바로 다시 발행» 을 같은 분에 하면
  // invoice_number UNIQUE 에 걸려 500 이 났다 — 그런데 그게 잘못된 정산서를 바로잡는 정규 절차다.
  // (2026-09-24 검증 중 실측: 같은 분에 재발행 → Duplicate entry.)
  const p2 = (n) => String(n).padStart(2, '0');
  const stamp = `${now.getFullYear()}${p2(now.getMonth() + 1)}${p2(now.getDate())}${p2(now.getHours())}${p2(now.getMinutes())}${p2(now.getSeconds())}`;
  const prefix = issuerType === 'brand' ? 'BRD' : 'FC';
  const soaInvoiceNumber = await uniqueSoaNumber(`SOA-${prefix}${issuerId}-R${restaurantId}-M${stamp}`);

  const result = await issueSoaForPair({
    issuerType, issuerId,
    payer: { payer_type: 'restaurant', payer_id: restaurantId },
    buyerEntityType: 'restaurant', buyerEntityId: restaurantId,
    sellerName: seller.name || (issuerType === 'brand' ? 'Brand' : 'Foodcourt'),
    sellerCurrency: terms?.currency,
    periodStartDay, periodEndDay, issuedAt, dueDate,
    includeOlderUnbundled,
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
  computePayerForBuyer,
  // 라벨·마감일 규칙은 테스트와 다른 호출부가 **같은 함수**를 보게 내보낸다.
  periodLabelOf,
  nextDueDate
};
