#!/usr/bin/env node
/**
 * 발주 ← 청구서 결제 거울 백필 (2026-10-29 Fable 설계 invoice-pay-flow R-4) · 멱등 · 매 배포 재실행
 *
 * 연결 청구서는 paid 인데 발주는 unpaid 인 행을 발주 paid 로 맞춘다 — services/purchaseOrderPayment.mirrorPaidToPurchaseOrders
 * 와 같은 의미. 거울이 모든 결제 경로로 옮겨진 2026-09-11(§8-3 A-4) 이전에 청구서 쪽에서 결제된 건이 남아 있었다
 * (운영 PO-R10-20260904-001). 그 발주에 Pay 를 누르면 409 가 났다.
 *   - refunded 는 건드리지 않는다(되돌린 결제를 되살리면 안 됨).
 *   - 드로어 이동은 만들지 않는다(거울 규칙과 같음 — 그때 낸 수단을 알 수 없다).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const WHERE = `po.payment_status = 'unpaid' AND i.status = 'paid' AND po.deleted_at IS NULL AND po.status <> 'cancelled'`;

(async () => {
  const t = await sequelize.transaction();
  try {
    const rows = await sequelize.query(
      `SELECT po.id, po.po_number FROM purchase_orders po JOIN invoices i ON i.id = po.trade_invoice_id WHERE ${WHERE} FOR UPDATE`,
      { type: QueryTypes.SELECT, transaction: t });
    if (!rows.length) {
      await t.commit();
      console.log('[migrate-po-payment-mirror-backfill] 맞출 발주 0 — 건너뜀');
    } else {
      const [, meta] = await sequelize.query(
        `UPDATE purchase_orders po JOIN invoices i ON i.id = po.trade_invoice_id
            SET po.payment_status = 'paid',
                po.paid_at = COALESCE(i.paid_at, po.paid_at, NOW()),
                po.payment_method = COALESCE(po.payment_method, i.payment_method)
          WHERE ${WHERE}`,
        { transaction: t });
      const affected = meta && typeof meta.affectedRows === 'number' ? meta.affectedRows : (typeof meta === 'number' ? meta : null);
      if (affected !== rows.length) throw new Error(`바뀐 행 ${affected} ≠ 대상 ${rows.length} — 되돌림`);
      await t.commit();
      console.log(`[migrate-po-payment-mirror-backfill] 발주 ${rows.length}건 결제됨으로 맞춤: ${rows.map((r) => r.po_number).join(', ')}`);
    }
    await sequelize.close(); process.exit(0);
  } catch (e) {
    try { await t.rollback(); } catch {}
    console.error('[migrate-po-payment-mirror-backfill] 실패:', e.message);
    try { await sequelize.close(); } catch {}
    process.exit(1);
  }
})();
