/**
 * 외부(앱 안 쓰는) 공급업체 월별 정산서 — 대조·총액 (2026-10-07 Fable 판정 ⑩ · docs/TRADE_STRUCTURE.md ⑩)
 *
 * > Irene (10-04): 「외부공급업체 중에 1달 기준으로 SOA 보내는 곳이 있어. … SOA 결제 인보이스 뜨게 하고
 * >  최종 받은 SOA랑 대조해서 결제정리할 수 있게 해줄 수 있어?」
 *
 * 정산서 총액 = Σ묶인 청구서 총액(취소 제외) + 차액 줄(«Supplier statement difference»).
 * ⚠ `finalizeInvoice` 를 쓰지 않는다 — 정산서 행에는 줄 항목(invoice_items)이 없어 그 함수는 소계를 0 으로 만든다.
 *
 * 대조는 두 겹:
 *   ① 건별 — 묶인 청구서의 «총액 수정»(§8-7, reconcileInvoiceSync) → followChildToSoa 가 정산서 합계를 따라가게 한다.
 *   ② 정산서 — reconcileSoa: 공급업체가 보낸 SOA 총액으로 확정 → 차액 한 줄 교체·수정 이력.
 * 결제된·취소된 정산서는 건드리지 않는다.
 */
const { Op } = require('sequelize');

const DIFF_LINE = 'Supplier statement difference';
const LOCKED = ['paid', 'cancelled'];
const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

function readArray(v) {
  if (Array.isArray(v)) return [...v];
  if (typeof v === 'string' && v.trim()) {
    try { const a = JSON.parse(v); return Array.isArray(a) ? a : []; } catch (_) { return []; }
  }
  return [];
}

/** 묶인 청구서 합(취소 제외) */
async function soaChildSum(soaId, transaction) {
  const Invoice = require('../models/Invoice');
  const rows = await Invoice.findAll({
    where: { parent_soa_invoice_id: soaId, status: { [Op.ne]: 'cancelled' } },
    attributes: ['id', 'total_amount'], transaction
  });
  return round2(rows.reduce((a, r) => a + num(r.total_amount), 0));
}

/** 차액 줄 금액(없으면 0) */
function diffLineAmount(charges) {
  const line = readArray(charges).find((c) => c && c.name === DIFF_LINE);
  return line ? round2(num(line.amount)) : 0;
}

/** 소계·총액을 다시 쓴다. 반환 { prevTotal, newTotal, subtotal } */
async function recomputeSoaTotal(soa, { charges, transaction } = {}) {
  const subtotal = await soaChildSum(soa.id, transaction);
  const ch = charges !== undefined ? charges : readArray(soa.additional_charges);
  const chargesTotal = round2(ch.reduce((a, c) => a + num(c && c.amount), 0));
  const prevTotal = round2(num(soa.total_amount));
  const newTotal = Math.max(0, round2(subtotal + chargesTotal));
  await soa.update({ subtotal, additional_charges: ch, total_amount: newTotal }, { transaction });
  return { prevTotal, newTotal, subtotal };
}

function pushHistory(soa, entry) {
  const history = readArray(soa.modification_history);
  history.push({ modified_at: new Date().toISOString(), ...entry });
  return history;
}

/**
 * 정산서가 «외부 공급업체 정산서»인가 — 대조 라우트·화면 판정 단일 소스.
 * @returns {Promise<{ok:true}|{ok:false, code:string, message:string}>}
 */
async function checkExternalSoa(soa) {
  if (!soa || soa.invoice_category !== 'soa') return { ok: false, code: 'NOT_SOA', message: 'This is not a statement of account.' };
  const { isExternalIssuer } = require('../utils/externalIssuer');
  if (!(await isExternalIssuer(soa.issuer_type, soa.issuer_id))) {
    return { ok: false, code: 'NOT_EXTERNAL', message: 'Only statements for suppliers that don\'t use the app can be reconciled here.' };
  }
  if (LOCKED.includes(soa.status)) return { ok: false, code: 'SOA_LOCKED', message: 'This statement is already paid or cancelled.' };
  return { ok: true };
}

/**
 * ② 공급업체 SOA 붙이기·총액 확정.
 * @param {number} soaId
 * @param {{document:{url,filename,number,date,total}, note?:string, actorId?:number, actorName?:string}} input
 */
async function reconcileSoa(soaId, { document = {}, note = null, actorId = null, actorName = null } = {}) {
  const { sequelize } = require('../config/database');
  const Invoice = require('../models/Invoice');
  return sequelize.transaction(async (transaction) => {
    const soa = await Invoice.findByPk(soaId, { lock: transaction.LOCK.UPDATE, transaction });
    if (!soa) return { ok: false, status: 404, code: 'NOT_FOUND', message: 'Invoice not found' };
    const chk = await checkExternalSoa(soa);
    if (!chk.ok) return { ok: false, status: 400, code: chk.code, message: chk.message };

    const prevDoc = (soa.external_document && typeof soa.external_document === 'object') ? soa.external_document : {};
    const hasTotal = document.total !== undefined && document.total !== null && document.total !== '';
    const doc = {
      ...prevDoc,
      ...(document.url ? { url: document.url, filename: document.filename || String(document.url).split('/').pop() } : {}),
      ...(document.number !== undefined ? { number: document.number || null } : {}),
      ...(document.date !== undefined ? { date: document.date || null } : {}),
      ...(hasTotal ? { total: round2(document.total) } : {}),
      uploaded_at: new Date().toISOString(),
      uploaded_by: actorId,
    };
    await soa.update({ external_document: doc }, { transaction });

    let changed = false; let prevTotal = round2(num(soa.total_amount)); let newTotal = prevTotal;
    if (hasTotal) {
      const subtotal = await soaChildSum(soa.id, transaction);
      const others = readArray(soa.additional_charges).filter((c) => c && c.name !== DIFF_LINE);
      const othersTotal = round2(others.reduce((a, c) => a + num(c.amount), 0));
      const diff = round2(round2(document.total) - (subtotal + othersTotal));
      const charges = diff !== 0 ? [...others, { name: DIFF_LINE, amount: diff }] : others;
      const r = await recomputeSoaTotal(soa, { charges, transaction });
      prevTotal = r.prevTotal; newTotal = r.newTotal;
      if (newTotal !== prevTotal) {
        changed = true;
        const reason = [`Supplier SOA${doc.number ? ` ${doc.number}` : ''}`, 'total only', note || null].filter(Boolean).join(' · ');
        await soa.update({
          modification_history: pushHistory(soa, {
            modified_by: actorId, modified_by_name: actorName,
            changes: { total_amount: { from: prevTotal, to: newTotal } }, reason, source: 'soa_reconcile'
          }),
          is_modified: true
        }, { transaction });
      }
    }
    await soa.reload({ transaction });
    return {
      ok: true, soa, changed, prev_total: prevTotal, total: newTotal,
      our_total: await soaChildSum(soa.id, transaction), difference: diffLineAmount(soa.additional_charges)
    };
  });
}

/**
 * ① 묶인 청구서 총액이 바뀌었을 때 정산서가 따라간다. 정산서가 아니거나 잠겨 있으면 무접촉.
 * @returns {Promise<{followed:boolean, soa_locked?:boolean, soa_id?:number, total?:number}>}
 */
async function followChildToSoa(child, { prevChildTotal, actorId = null, actorName = null } = {}) {
  if (!child || !child.parent_soa_invoice_id) return { followed: false };
  const Invoice = require('../models/Invoice');
  const { sequelize } = require('../config/database');
  return sequelize.transaction(async (transaction) => {
    const soa = await Invoice.findByPk(child.parent_soa_invoice_id, { lock: transaction.LOCK.UPDATE, transaction });
    if (!soa || soa.invoice_category !== 'soa') return { followed: false };
    if (LOCKED.includes(soa.status)) return { followed: false, soa_locked: true, soa_id: soa.id };
    const r = await recomputeSoaTotal(soa, { transaction });
    if (r.newTotal !== r.prevTotal) {
      await soa.update({
        modification_history: pushHistory(soa, {
          modified_by: actorId, modified_by_name: actorName,
          changes: { total_amount: { from: r.prevTotal, to: r.newTotal } },
          reason: `child ${child.invoice_number} total ${round2(prevChildTotal)} → ${round2(child.total_amount)}`,
          source: 'soa_child_sync'
        }),
        is_modified: true
      }, { transaction });
    }
    return { followed: true, soa_id: soa.id, total: r.newTotal };
  });
}

module.exports = { reconcileSoa, followChildToSoa, checkExternalSoa, soaChildSum, recomputeSoaTotal, DIFF_LINE };
