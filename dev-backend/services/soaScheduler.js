/**
 * Monthly SOA Scheduler — Sprint 4 (Supply Chain Design 4)
 *
 * Aggregates last month's trade invoices (issuer_type='supplier') for every
 * active SupplierContract whose payment_terms.invoice_cycle === 'monthly_soa',
 * and emails a Statement of Account to the buyer side.
 *
 * Runs daily at 00:30; each pair issues only on its statement issue day (soa_issue_day, default 1). 2026-09-29
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
  SchedulerRun,
  PurchaseOrder
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

  // 받는 사람이 없어도 정산서는 만든다 — 정산서는 청구 기록이고 메일은 알림일 뿐이다(2026-09-29 soa2 §5-A).
  //   전에는 여기서 멈춰 K-DINE IPC(관리자 이메일 없음) 정산서가 «No recipients to notify» 로 아예 안 만들어졌다.
  const recipients = await getBuyerRecipientUserIds(buyerEntityType, buyerEntityId);

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
      // 거래 청구서·크레딧노트와 같은 규칙 — 매장이 내는 정산서는 매장 칸을 채운다 (2026-10-05 Fable).
      //   비워 두면 판매자 화면이 결제자 번호를 사람 번호로 읽어 다른 매장 이름을 붙였다.
      restaurant_id: payer.payer_type === 'restaurant' ? payer.payer_id : null,
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
    link: soaLinkFor(buyerEntityType, buyerEntityId),
    timezone: buyerTz
  });

  if (recipients.length === 0) {
    console.warn(`[soaScheduler] SOA #${soaInvoice.id} created without email — no recipient at ${buyerEntityType} #${buyerEntityId}`);
    return { issued: true, mailed: false, reason: 'no_recipients', soaId: soaInvoice.id, totalDue, currency, invoiceCount: invoices.length };
  }
  await sendNotificationBatch(recipients, 'monthly_soa', mail);
  return { issued: true, mailed: true, soaId: soaInvoice.id, totalDue, currency, invoiceCount: invoices.length };
}

// ────────────────────────────────────────────────────────────────────────────
// 정산서에는 **확정된 주문 전부**가 들어간다 (2026-09-30 Irene)
//   > Irene: "왜 배송됨인데도 빠진 거야? 모든 인보이스 합칠건데" / "내가 수동으로 만들어도 포함되어야지"
//   청구서는 매장 입고(또는 «주문 확정 시» 설정의 확정) 때만 생겨서, 판매자가 확정·출고·배송완료했는데
//   매장이 입고를 안 누른 주문은 정산서에서 조용히 빠졌다(운영 K-DINE IPC PO-R8-20260929-004·007).
//   정산서를 만들기 직전에 그런 주문의 청구서를 **같은 발행 함수**(createTradeInvoice, 멱등)로 먼저 낸다.
//   확정 전(submitted·pending_approval)은 취소·거절될 수 있어 넣지 않는다. 배송 실패·취소도 제외.
// ────────────────────────────────────────────────────────────────────────────
const BILLABLE_PO_STATUSES = ['confirmed', 'shipped', 'in_transit', 'delivered', 'partial_received', 'received', 'closed'];

/**
 * 판매자→구매 매장 쌍에서 확정 이후인데 청구서가 없는 발주에 청구서를 낸다. 기간 끝(upTo) 이전에 만든 발주만.
 * @returns {Promise<number>} 새로 낸 청구서 수
 */
async function issueMissingTradeInvoices({ sellerType, sellerId, restaurantId, upTo }) {
  if (!['brand', 'foodcourt'].includes(sellerType)) return 0;
  const pos = await PurchaseOrder.findAll({
    where: {
      seller_type: sellerType,
      seller_entity_id: sellerId,
      entity_type: 'restaurant',
      entity_id: restaurantId,
      trade_invoice_id: null,
      status: { [Op.in]: BILLABLE_PO_STATUSES },
      ...(upTo ? { created_at: { [Op.lte]: upTo } } : {})
    },
    order: [['id', 'ASC']]
  });
  const { createTradeInvoice } = require('./purchaseOrderService');
  let n = 0;
  for (const po of pos) {
    try {
      const inv = await createTradeInvoice(po);
      if (inv) n += 1;
    } catch (e) {
      console.error(`[soaScheduler] 청구서 발행 실패 ${po.po_number}:`, e.message);
    }
  }
  if (n) console.log(`[soaScheduler] ${sellerType} #${sellerId} → restaurant #${restaurantId}: 청구서 없던 확정 주문 ${n}건 청구서 발행`);
  return n;
}

/**
 * 정산서 메일 버튼이 여는 화면 — 구매자가 자기 청구서를 보는 곳.
 * 옛 `/pos/purchase-invoices/soa` 는 라우트가 없어진 주소였다(2026-09-29 soa2 §5-A).
 */
function soaLinkFor(buyerEntityType, buyerEntityId) {
  if (buyerEntityType === 'restaurant') return `${FRONTEND_URL}/restaurant/${buyerEntityId}/invoices`;
  if (buyerEntityType === 'brand') return `${FRONTEND_URL}/pos/brand/invoices`;
  if (buyerEntityType === 'foodcourt') return `${FRONTEND_URL}/pos/foodcourt/invoices`;
  return `${FRONTEND_URL}/login`;
}

// ────────────────────────────────────────────────────────────────────────────
// 자동 발행 주기 (2026-09-29 soa2 §5-D)
//   > Irene: "원래 지정한 발행일에 자동발행이야. 수동발행하고 날짜 바꾸고 싶으면 바꾸는 거야.
//   >         그러고 나면 자동발행 안되어야 해"
//   청구 조건의 `soa_issue_day`(1~28, 없으면 1) 날에만 발행한다. cron 은 매일 돌고, 날짜 판정은
//   **구매자 달력**으로 한다. 기간 = 지난 정산서 다음 날 ~ 어제. 그 주기(직전 발행일 다음 날부터)에
//   취소 안 된 정산서가 이미 있으면(= 수동 발행) 건너뛴다.
// ────────────────────────────────────────────────────────────────────────────
const p2d = (n) => String(n).padStart(2, '0');
/** 시각 → 그 타임존 달력의 YYYY-MM-DD */
function localDayOf(date, tz) {
  return new Date(date).toLocaleDateString('en-CA', { timeZone: tz });
}
/** YYYY-MM-DD 에 n 일 더하기 (달력 계산, 타임존 무관) */
function addDays(day, n) {
  const [y, m, d] = String(day).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}
/** 청구 조건의 발행일. 1~28 이 아니면 1(= 종전 «매월 1일» 과 같은 동작). */
function soaIssueDayOf(terms) {
  const d = parseInt(terms?.soa_issue_day, 10);
  return Number.isFinite(d) && d >= 1 && d <= 28 ? d : 1;
}

/**
 * 이 쌍을 오늘 자동 발행해야 하나. 발행일이 28 이하라 «지난달 같은 날» 은 항상 존재한다.
 * @returns {Promise<{due:false, reason:string} | {due:true, periodStartDay:string, periodEndDay:string}>}
 */
async function planAutoCycle({ issuerType, issuerId, payer, buyerEntityType, buyerEntityId, terms, referenceDate }) {
  const tz = await resolveBuyerTimezone(buyerEntityType, buyerEntityId);
  const today = localDayOf(referenceDate, tz);
  const issueDay = soaIssueDayOf(terms);
  if (Number(today.slice(8, 10)) !== issueDay) return { due: false, reason: 'not_issue_day' };

  const [ty, tm] = today.split('-').map(Number);
  const prevIssueDay = `${tm === 1 ? ty - 1 : ty}-${p2d(tm === 1 ? 12 : tm - 1)}-${p2d(issueDay)}`;
  const pair = {
    invoice_category: 'soa',
    issuer_type: issuerType,
    issuer_id: issuerId,
    payer_type: payer.payer_type,
    payer_id: payer.payer_id,
    status: { [Op.ne]: 'cancelled' }
  };

  // 이 주기 = 직전 발행일 **다음 날** 00:00 부터. 직전 발행일 당일의 자동 정산서는 지난 주기 것이다.
  //   (직전 발행일 00:00 부터로 잡으면 지난달 자동 정산서가 걸려 영원히 건너뛴다.)
  const { startOfDay: cycleStart } = getDateBounds(addDays(prevIssueDay, 1), tz);
  const already = await Invoice.findOne({ where: { ...pair, issued_at: { [Op.gte]: cycleStart } }, attributes: ['id'] });
  if (already) return { due: false, reason: 'manual_issued_this_cycle' };

  const last = await Invoice.findOne({
    where: { ...pair, billing_period_end: { [Op.ne]: null } },
    attributes: ['id', 'billing_period_end'],
    order: [['billing_period_end', 'DESC']]
  });
  const periodEndDay = addDays(today, -1);
  let periodStartDay = last ? addDays(localDayOf(last.billing_period_end, tz), 1) : prevIssueDay;
  if (periodStartDay > periodEndDay) periodStartDay = periodEndDay;
  return { due: true, periodStartDay, periodEndDay };
}

/**
 * Process SOA auto-issue for all eligible (supplier + brand + foodcourt) seller↔buyer pairs.
 * cron 이 매일 부르고, 각 쌍은 자기 발행일에만 발행된다.
 * Returns { processed, success, errors, skipped, skipped_manual, not_due, no_email }.
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
    // 발행일 = 만든 날. 기간과 섞지 않는다.
    const issuedAt = new Date();
    let processed = 0, success = 0, errors = 0, skipped = 0, skippedManual = 0, notDue = 0, noEmail = 0;

    /** 한 쌍 처리 — 세 판매자 종류가 같은 길을 탄다. */
    const runPair = async ({ label, issuerType, issuerId, payer, buyerEntityType, buyerEntityId, terms, sellerName, sellerCurrency, numberBase }) => {
      processed++;
      try {
        const plan = await planAutoCycle({ issuerType, issuerId, payer, buyerEntityType, buyerEntityId, terms, referenceDate });
        if (!plan.due) {
          if (plan.reason === 'manual_issued_this_cycle') {
            skippedManual++;
            console.log(`[soaScheduler] ${label} — skip: manual SOA already issued this cycle`);
          } else notDue++;
          return;
        }
        // 확정된 주문은 청구서가 없어도 정산서에 들어간다 — 수동 발행과 같은 규칙 (2026-09-30)
        if (buyerEntityType === 'restaurant') {
          const tz = await resolveBuyerTimezone(buyerEntityType, buyerEntityId);
          await issueMissingTradeInvoices({
            sellerType: issuerType, sellerId: issuerId, restaurantId: buyerEntityId,
            upTo: getDateBounds(plan.periodEndDay, tz).endOfDay
          });
        }
        const dueDay = parseInt(terms?.payment_due_day, 10) || 15;
        const soaInvoiceNumber = await uniqueSoaNumber(`${numberBase(plan.periodEndDay.slice(0, 7))}`);
        const result = await issueSoaForPair({
          issuerType, issuerId, payer, buyerEntityType, buyerEntityId,
          sellerName, sellerCurrency,
          periodStartDay: plan.periodStartDay,
          periodEndDay: plan.periodEndDay,
          issuedAt,
          dueDate: nextDueDate(issuedAt, dueDay),
          soaInvoiceNumber
        });
        if (result.issued) {
          success++;
          if (result.mailed === false) noEmail++;
        } else skipped++;
      } catch (e) {
        errors++;
        console.error(`[soaScheduler] Error processing ${label}:`, e.message);
      }
    };

    // ────────────────────────────────────────────────────────────────────
    // 1. SUPPLIER SOA — SupplierContract.payment_terms.invoice_cycle='monthly_soa'
    // ────────────────────────────────────────────────────────────────────
    const contracts = await SupplierContract.findAll({
      where: { status: 'active' },
      include: [{ model: SupplierCompany, as: 'supplierCompany', attributes: ['id', 'name', 'company_name', 'currency'] }]
    });
    for (const contract of contracts.filter(c => c.payment_terms?.invoice_cycle === 'monthly_soa')) {
      const payer = await computePayerForBuyer(contract.entity_type, contract.entity_id);
      if (!payer) { processed++; skipped++; continue; }
      await runPair({
        label: `supplier contract #${contract.id}`,
        issuerType: 'supplier',
        issuerId: contract.supplier_company_id,
        payer,
        buyerEntityType: contract.entity_type,
        buyerEntityId: contract.entity_id,
        terms: contract.payment_terms,
        sellerName: contract.supplierCompany?.company_name || contract.supplierCompany?.name || 'Supplier',
        sellerCurrency: contract.supplierCompany?.currency,
        numberBase: (ym) => `SOA-${contract.supplier_company_id}-${ym}-${contract.id}`
      });
    }

    // ────────────────────────────────────────────────────────────────────
    // 2. BRAND SOA — Restaurant.brand_billing_terms.invoice_cycle='monthly_soa'
    // ────────────────────────────────────────────────────────────────────
    const brandRestaurants = await Restaurant.findAll({
      where: { brand_id: { [Op.ne]: null } },
      attributes: ['id', 'name', 'brand_id', 'brand_billing_terms']
    });
    for (const restaurant of brandRestaurants.filter(r => r.brand_billing_terms?.invoice_cycle === 'monthly_soa')) {
      const brand = await Brand.findByPk(restaurant.brand_id, { attributes: ['id', 'name', 'company_name'] });
      if (!brand) { processed++; skipped++; continue; }
      await runPair({
        label: `brand SOA for restaurant #${restaurant.id}`,
        issuerType: 'brand',
        issuerId: brand.id,
        payer: { payer_type: 'restaurant', payer_id: restaurant.id },
        buyerEntityType: 'restaurant',
        buyerEntityId: restaurant.id,
        terms: restaurant.brand_billing_terms,
        // 2026-09-28 R8 — 메일 머리글과 같은 규칙: 회사명 먼저, 없으면 브랜드명(utils/emailBranding.js brand 분기)
        sellerName: brand.company_name || brand.name || 'Brand',
        sellerCurrency: restaurant.brand_billing_terms?.currency,
        numberBase: (ym) => `SOA-BRD${brand.id}-${ym}-R${restaurant.id}`
      });
    }

    // ────────────────────────────────────────────────────────────────────
    // 3. FOODCOURT SOA — Restaurant.foodcourt_billing_terms.invoice_cycle='monthly_soa'
    // ────────────────────────────────────────────────────────────────────
    const fcRestaurants = await Restaurant.findAll({
      where: { foodcourt_id: { [Op.ne]: null } },
      attributes: ['id', 'name', 'foodcourt_id', 'foodcourt_billing_terms']
    });
    for (const restaurant of fcRestaurants.filter(r => r.foodcourt_billing_terms?.invoice_cycle === 'monthly_soa')) {
      const fc = await Foodcourt.findByPk(restaurant.foodcourt_id, { attributes: ['id', 'name'] });
      if (!fc) { processed++; skipped++; continue; }
      await runPair({
        label: `foodcourt SOA for restaurant #${restaurant.id}`,
        issuerType: 'foodcourt',
        issuerId: fc.id,
        payer: { payer_type: 'restaurant', payer_id: restaurant.id },
        buyerEntityType: 'restaurant',
        buyerEntityId: restaurant.id,
        terms: restaurant.foodcourt_billing_terms,
        sellerName: fc.name || 'Foodcourt',
        sellerCurrency: restaurant.foodcourt_billing_terms?.currency,
        numberBase: (ym) => `SOA-FC${fc.id}-${ym}-R${restaurant.id}`
      });
    }

    const elapsedMs = Date.now() - startTime;
    const results = {
      processed,
      success,
      errors,
      skipped,
      skipped_manual: skippedManual,
      not_due: notDue,
      no_email: noEmail,
      date: new Date(referenceDate).toISOString().slice(0, 10)
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
  const seller = await Model.findByPk(issuerId, { attributes: issuerType === 'brand' ? ['id', 'name', 'company_name'] : ['id', 'name'] });
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

  // 확정된 주문은 청구서가 없어도 이 정산서에 들어가야 한다 — 먼저 청구서를 낸다 (2026-09-30)
  await issueMissingTradeInvoices({
    sellerType: issuerType, sellerId: issuerId, restaurantId,
    upTo: getDateBounds(periodEndDay, buyerTz).endOfDay
  });

  const result = await issueSoaForPair({
    issuerType, issuerId,
    payer: { payer_type: 'restaurant', payer_id: restaurantId },
    buyerEntityType: 'restaurant', buyerEntityId: restaurantId,
    // 2026-09-28 R8 — 월 자동 발행(위)과 같은 규칙: 브랜드는 회사명 먼저
    sellerName: (issuerType === 'brand' && seller.company_name) || seller.name || (issuerType === 'brand' ? 'Brand' : 'Foodcourt'),
    sellerCurrency: terms?.currency,
    periodStartDay, periodEndDay, issuedAt, dueDate,
    includeOlderUnbundled,
    soaInvoiceNumber
  });
  return { issued: !!result.issued, mailed: result.mailed, soaId: result.soaId, reason: result.reason };
}

/**
 * Register the cron schedule. 매일 00:30 — 각 쌍은 자기 발행일(soa_issue_day)에만 발행된다 (2026-09-29 soa2 §5-D).
 */
function startSoaCron() {
  cron.schedule('30 0 * * *', async () => {
    console.log('[soaScheduler] Cron tick — checking SOA issue days');
    await processMonthlySoa();
  });
  console.log('✓ SOA scheduler started — runs daily at 00:30, issues on each pair\'s statement issue day');
}

module.exports = {
  processMonthlySoa,
  generateSoaNow,
  startSoaCron,
  computePayerForBuyer,
  // 라벨·마감일 규칙은 테스트와 다른 호출부가 **같은 함수**를 보게 내보낸다.
  periodLabelOf,
  nextDueDate,
  soaIssueDayOf,
  planAutoCycle,
  issueMissingTradeInvoices,
  BILLABLE_PO_STATUSES
};
