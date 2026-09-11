#!/usr/bin/env node
/**
 * Migration — 거래 청구서의 «기간» 을 **발주일 → 수령일** 로 (2026-09-11 · docs/PURCHASE_ORDER_SYSTEM.md §8-3 C-2).
 *
 * > Irene: 「여기 발주한 날자랑 받은 날짜 등으로 해야지 구입한 건. 왜 구독기간처럼 표시해?」
 *
 * `createTradeInvoice` 가 `billing_period_start = billing_period_end = 발행 시각` 으로 찍어서, 구입 청구서가
 * 구독 청구서처럼 «기간» 으로 보이고 그 두 날짜가 발주·수령과 아무 관계가 없었다. 새 발행분은 C-1 로 고쳤고,
 * 이 스크립트는 **이미 나간 청구서**를 같은 규칙으로 맞춘다:
 *   start = COALESCE(po.submitted_at, po.approved_at, po.created_at)   — 발주가 나간 날
 *   end   = COALESCE(po.received_at, i.issued_at)                      — 받은 날
 *
 * - 대상: `invoice_category='trade'` 이고 연결 발주(`purchase_orders.trade_invoice_id`)가 살아 있는 행.
 * - 돈 컬럼·상태·`issued_at`(발행일 = 기록을 만든 시각, 소급 금지) 무접촉.
 * - 멱등: 같은 입력이면 같은 값. 재실행하면 바뀌는 행 0 → registry `deploy`.
 * - 이 하나로 Owner/Brand/Foodcourt/Admin 인보이스 페이지의 Period 도 프론트 변경 없이 바르게 뜬다.
 * - process.exit 필수.
 *
 * 사용: node scripts/migrate-trade-invoice-period.js [--dry-run]
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const START = 'COALESCE(po.submitted_at, po.approved_at, po.created_at)';
const END = 'COALESCE(po.received_at, i.issued_at)';

(async () => {
  try {
    const [pending] = await sequelize.query(
      `SELECT COUNT(*) n FROM invoices i
         JOIN purchase_orders po ON po.trade_invoice_id = i.id AND po.deleted_at IS NULL
        WHERE i.invoice_category = 'trade'
          AND (NOT (i.billing_period_start <=> ${START}) OR NOT (i.billing_period_end <=> ${END}))`,
      { type: QueryTypes.SELECT });
    console.log(`[migrate-trade-invoice-period] 맞출 대상 ${pending.n}건${DRY ? ' (dry-run — 쓰지 않음)' : ''}`);
    if (DRY || Number(pending.n) === 0) process.exit(0);

    const [, meta] = await sequelize.query(
      `UPDATE invoices i
         JOIN purchase_orders po ON po.trade_invoice_id = i.id AND po.deleted_at IS NULL
          SET i.billing_period_start = ${START},
              i.billing_period_end = ${END}
        WHERE i.invoice_category = 'trade'`);
    const changed = meta && (meta.changedRows ?? meta.affectedRows);
    console.log(`[migrate-trade-invoice-period] 갱신 ${changed ?? '?'}건`);

    const [remain] = await sequelize.query(
      `SELECT COUNT(*) n FROM invoices i
         JOIN purchase_orders po ON po.trade_invoice_id = i.id AND po.deleted_at IS NULL
        WHERE i.invoice_category = 'trade'
          AND (NOT (i.billing_period_start <=> ${START}) OR NOT (i.billing_period_end <=> ${END}))`,
      { type: QueryTypes.SELECT });
    console.log(`[migrate-trade-invoice-period] 남은 대상 ${remain.n}건`);
    process.exit(0);
  } catch (e) {
    console.error('[migrate-trade-invoice-period] 실패:', e.message);
    process.exit(1);
  }
})();
