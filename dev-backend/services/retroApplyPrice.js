/**
 * 과거 발주 소급 반영 — 설계 §4 (2026-09-08)
 *
 * 대조에서 확정한 청구가를, **아직 확정되지 않은 과거 발주 라인**에도 적용한다.
 *
 * ## 왜 기본이 «안 함» 인가
 * 과거 라인의 `unit_price` 는 그 시점 합의가격이고 **이미 결제·마감 기대금액·SOA 에 쓰였다.**
 * 그걸 나중에 바꾸면 결제된 발주 금액이 달라져 원장이 깨진다.
 * 그래서 소급은 **사람이 켤 때만** 돌고, 대상도 좁게 자른다.
 *
 * ## 대상 (넷 다 만족해야 한다)
 *   ① 같은 판매자 상품(같은 매핑)을 가리키는 라인
 *   ② 같은 구매자의 발주
 *   ③ **미결제 · 미수령** — `payment_status <> 'paid'` 그리고 `status` 가 수령 이전
 *   ④ **아직 대조되지 않은 라인** (`invoiced_unit_price IS NULL`)
 *
 * ## 되돌리기
 * 한 번의 소급은 `batch_id` 하나로 묶인다. 되돌릴 때는 그 묶음의 이력을 **역순으로** 읽어
 * `old_value` 를 도로 쓴다. 이력이 없으면 되돌리지 않는다(추측으로 값을 만들지 않는다).
 */
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { logCostChange } = require('./costSync');

const RECEIVED_STATUSES = ['received', 'partial_received', 'delivered', 'closed'];

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

/**
 * 소급 대상 미리보기 — 쓰지 않는다.
 * @param {{mappingId:number, buyer:{type:string,id:number}, excludePoId?:number}} args
 */
async function previewRetroTargets({ mappingId, buyer, excludePoId }) {
  return sequelize.query(
    `SELECT poi.id, poi.purchase_order_id, poi.unit_price, poi.quantity_ordered, poi.unit,
            po.po_number, po.status, po.payment_status
       FROM purchase_order_items poi
       JOIN purchase_orders po ON po.id = poi.purchase_order_id
      WHERE poi.ingredient_seller_product_id = :map
        AND po.deleted_at IS NULL
        AND po.entity_type = :et AND po.entity_id = :ei
        AND po.payment_status <> 'paid'
        AND po.status NOT IN (:received)
        AND poi.invoiced_unit_price IS NULL
        ${excludePoId ? 'AND po.id <> :exclude' : ''}
      ORDER BY po.id`,
    {
      type: QueryTypes.SELECT,
      replacements: {
        map: mappingId, et: buyer.type, ei: buyer.id,
        received: RECEIVED_STATUSES, ...(excludePoId ? { exclude: excludePoId } : {})
      }
    });
}

/**
 * 소급 적용. 라인 단가와 금액을 새 가격으로 바꾸고, 발주 헤더 금액을 다시 맞춘다.
 * @returns {Promise<{batch_id:string, applied:number, orders:number, skipped:number}>}
 */
async function applyRetro({ mappingId, buyer, newPrice, excludePoId, actor, note }) {
  const price = num(newPrice);
  if (!(price > 0)) return { batch_id: null, applied: 0, orders: 0, skipped: 0 };

  const targets = await previewRetroTargets({ mappingId, buyer, excludePoId });
  if (!targets.length) return { batch_id: null, applied: 0, orders: 0, skipped: 0 };

  const batchId = `retro-${Date.now()}-${mappingId}`;
  const touchedOrders = new Set();
  let applied = 0;

  const t = await sequelize.transaction();
  try {
    for (const line of targets) {
      const from = num(line.unit_price);
      if (Math.abs(from - price) < 0.0001) continue;   // 값이 같으면 건너뛴다
      const qty = num(line.quantity_ordered);
      const lineTotal = Math.round(price * qty * 100) / 100;
      await sequelize.query(
        'UPDATE purchase_order_items SET unit_price = :p, line_total = :lt WHERE id = :id',
        { replacements: { p: price, lt: lineTotal, id: line.id }, transaction: t });
      applied += 1;
      touchedOrders.add(line.purchase_order_id);

      // 되돌릴 수 있으려면 **바꾸기 전 값**이 남아야 한다 — 이력이 유일한 근거다.
      await logCostChange(sequelize, t, {
        subject_type: 'po_item', subject_id: line.id,
        old_value: from, new_value: price, unit: line.unit,
        source: 'retro_apply', batch_id: batchId,
        entity_type: buyer.type, entity_id: buyer.id,
        changed_by_user_id: actor?.changed_by_user_id ?? null,
        changed_by_name: actor?.changed_by_name ?? null,
        note: note || `소급 반영 — ${line.po_number}`
      });
    }

    // 발주 헤더 금액을 라인 합으로 다시 맞춘다. 안 하면 목록 금액과 라인이 갈린다.
    for (const poId of touchedOrders) {
      await sequelize.query(
        `UPDATE purchase_orders po
            SET subtotal = (SELECT COALESCE(SUM(line_total),0) FROM purchase_order_items WHERE purchase_order_id = po.id),
                total_amount = (SELECT COALESCE(SUM(line_total),0) FROM purchase_order_items WHERE purchase_order_id = po.id)
                               + COALESCE(po.tax_amount, 0)
          WHERE po.id = :id`,
        { replacements: { id: poId }, transaction: t });
    }
    await t.commit();
  } catch (e) {
    await t.rollback();
    throw e;
  }
  return { batch_id: applied ? batchId : null, applied, orders: touchedOrders.size, skipped: targets.length - applied };
}

/**
 * 소급 되돌리기 — 그 묶음의 이력을 역순으로 읽어 `old_value` 를 도로 쓴다.
 * ⛔ 이력이 없으면 되돌리지 않는다. 값을 추측해 만들지 않는다.
 */
async function revertRetro({ batchId, actor }) {
  const rows = await sequelize.query(
    `SELECT subject_id, old_value, new_value, unit, entity_type, entity_id
       FROM cost_change_logs
      WHERE batch_id = :b AND subject_type = 'po_item' AND source = 'retro_apply'
      ORDER BY id DESC`,
    { type: QueryTypes.SELECT, replacements: { b: batchId } });
  if (!rows.length) return { reverted: 0, orders: 0, reason: '되돌릴 이력이 없습니다' };

  const touchedOrders = new Set();
  let reverted = 0;
  const t = await sequelize.transaction();
  try {
    for (const r of rows) {
      if (r.old_value == null) continue;
      const [line] = await sequelize.query(
        'SELECT id, purchase_order_id, quantity_ordered FROM purchase_order_items WHERE id = :id',
        { type: QueryTypes.SELECT, replacements: { id: r.subject_id }, transaction: t });
      if (!line) continue;
      const back = num(r.old_value);
      const lineTotal = Math.round(back * num(line.quantity_ordered) * 100) / 100;
      await sequelize.query(
        'UPDATE purchase_order_items SET unit_price = :p, line_total = :lt WHERE id = :id',
        { replacements: { p: back, lt: lineTotal, id: line.id }, transaction: t });
      reverted += 1;
      touchedOrders.add(line.purchase_order_id);

      await logCostChange(sequelize, t, {
        subject_type: 'po_item', subject_id: line.id,
        old_value: num(r.new_value), new_value: back, unit: r.unit,
        source: 'retro_apply', batch_id: `${batchId}-revert`,
        entity_type: r.entity_type, entity_id: r.entity_id,
        changed_by_user_id: actor?.changed_by_user_id ?? null,
        changed_by_name: actor?.changed_by_name ?? null,
        note: `소급 되돌리기 — ${batchId}`
      });
    }
    for (const poId of touchedOrders) {
      await sequelize.query(
        `UPDATE purchase_orders po
            SET subtotal = (SELECT COALESCE(SUM(line_total),0) FROM purchase_order_items WHERE purchase_order_id = po.id),
                total_amount = (SELECT COALESCE(SUM(line_total),0) FROM purchase_order_items WHERE purchase_order_id = po.id)
                               + COALESCE(po.tax_amount, 0)
          WHERE po.id = :id`,
        { replacements: { id: poId }, transaction: t });
    }
    await t.commit();
  } catch (e) {
    await t.rollback();
    throw e;
  }
  return { reverted, orders: touchedOrders.size };
}

module.exports = { previewRetroTargets, applyRetro, revertRetro };
