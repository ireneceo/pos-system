#!/usr/bin/env node
/**
 * Migration — 외부(미가입) 공급업체 거래 청구서의 **마감일을 비운다(NULL)**.
 *
 * 배경 (2026-09-10 Fable 판정 · 실측 근거는 `docs/FABLE_REVIEW_2026-09-08.md` §4-1 및 정정 절):
 *   `payment_terms` 는 `supplier_contracts` — 우리 솔루션에 **가입한** 공급업체의 계약 — 에만 있다.
 *   외부 공급업체는 계약 행이 없어 결제조건을 넣을 자리가 구조적으로 없고,
 *   `purchaseOrderService.resolvePaymentTerms` 의 폴백 `NET_15` 를 탔다.
 *   그건 **합의한 적 없는 지어낸 값**이고, 그 값 때문에 운영 청구서 15장이 2026-09-23 에
 *   한꺼번에 Overdue 로 뒤집히고 매장 관리자에게 근거 없는 연체 메일이 나갈 예정이었다.
 *
 *   외부 공급업체 청구서는 받을 쪽이 시스템 안에 없는 **매입채무 기록**이다 → 마감일을 비운다.
 *   ⛔ 브랜드·푸드코트 판매자는 대상이 아니다 — `brand_billing_terms` 가 비었을 때의 NET_15 는
 *      **내부 판매자 정책**이라 그대로 둔다(운영 1장 해당, 손대지 않는다).
 *
 * 하는 일 (둘 다 멱등):
 *   1. `invoices.due_date` 를 NULL 허용으로 ALTER. (이미 YES 면 skip)
 *   2. 이미 발행된 «외부 공급업체 · trade · 미결제 · 마감일 = 발행일+15일» 청구서의 마감일을 NULL 로.
 *      — 조건을 만족하는 행만 고른다. 사람이 손으로 넣은 마감일(gap ≠ 15)은 건드리지 않는다.
 *      — 이미 NULL 이면 대상에서 빠지므로 재실행이 아무 일도 하지 않는다.
 *
 * 🔴 하지 않는 일 — `issued_at` 소급 (BACKDATE_ISSUED_AT = false):
 *   Fable 2026-09-10 판정은 «백필 14장의 발행일 09-08 은 사실과 다르므로 수령일로 소급» 이었다.
 *   그런데 그 백필을 만든 `scripts/backfill-trade-invoices.js` 머리에는 **정반대의 확정 기록**이 있다:
 *     「🔴 발행일은 실행하는 날이다. 소급하지 않는다 — 오늘 만드는 문서에 지난 달 날짜를 찍는 것이
 *       오히려 조작이다.」 (2026-09-07 Fable 판정 · Irene 승인)
 *   같은 자리에 상반된 판정이 둘 있고 **운영 회계 문서를 되돌리기 어렵게 바꾸는 일**이라,
 *   팀원이 어느 쪽을 고를 자리가 아니다. 아래 코드는 준비만 해 두고 **끄고 둔다.**
 *   판정이 서면 이 상수만 true 로 바꾸면 된다.
 *
 * Usage:
 *   node scripts/migrate-external-supplier-invoice-due-null.js --dry-run
 *   node scripts/migrate-external-supplier-invoice-due-null.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const BACKDATE_ISSUED_AT = false;          // ↑ 위 주석 참조 — 판정 대기
const log = (m) => console.log(`[migrate-external-supplier-invoice-due-null]${DRY ? ' [DRY]' : ''} ${m}`);

/** 대상 청구서 — 외부 공급업체 발주에서 나온 미결제 거래 청구서 중 NET_15 폴백을 탄 것. */
const TARGET_SQL = `
  SELECT i.id, i.invoice_number, i.status, i.issued_at, i.due_date,
         i.total_amount, i.currency, po.id po_id, po.po_number, po.received_at,
         sc.name seller_name,
         DATEDIFF(i.due_date, i.issued_at) due_gap
    FROM invoices i
    JOIN purchase_orders po ON po.trade_invoice_id = i.id
    JOIN supplier_companies sc
      ON sc.id = po.seller_entity_id AND po.seller_type = 'supplier'
   WHERE i.invoice_category = 'trade'
     AND sc.is_system_registered = 0            -- 외부(미가입) 공급업체만
     AND i.status = 'pending_payment'           -- 이미 결제·취소된 문서는 건드리지 않는다
     AND i.due_date IS NOT NULL
     AND DATEDIFF(i.due_date, i.issued_at) = 15 -- NET_15 폴백이 찍은 값만 (손으로 넣은 값 제외)
   ORDER BY i.id`;

async function run() {
  try {
    log(`DB: ${sequelize.config.database}@${sequelize.config.host}`);

    // ── 1. 스키마: due_date NULL 허용 ────────────────────────────────────
    const [col] = await sequelize.query(
      `SELECT IS_NULLABLE n, COLUMN_TYPE t FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'invoices' AND COLUMN_NAME = 'due_date'`,
      { type: QueryTypes.SELECT });
    if (!col) { log('✗ invoices.due_date 컬럼이 없다 — 중단'); process.exit(1); }

    if (col.n === 'YES') {
      log('스키마: due_date 이미 NULL 허용 — skip');
    } else if (DRY) {
      log(`스키마: ALTER 예정 — due_date ${col.t} NOT NULL → NULL 허용`);
    } else {
      await sequelize.query(`ALTER TABLE invoices MODIFY COLUMN due_date DATETIME NULL`);
      log(`스키마: due_date NULL 허용으로 변경 완료`);
    }

    // ── 2. 이미 발행된 것 소급 ──────────────────────────────────────────
    const targets = await sequelize.query(TARGET_SQL, { type: QueryTypes.SELECT });
    log(`소급 대상: ${targets.length}장`);
    for (const t of targets) {
      const iss = t.issued_at ? new Date(t.issued_at).toISOString().slice(0, 10) : '-';
      const due = t.due_date ? new Date(t.due_date).toISOString().slice(0, 10) : '-';
      const rcv = t.received_at ? new Date(t.received_at).toISOString().slice(0, 10) : '-';
      log(`  #${t.id} ${t.invoice_number} ${t.currency} ${t.total_amount} · 발행 ${iss} · 마감 ${due} → NULL · PO ${t.po_number} 수령 ${rcv} · ${t.seller_name}`);
    }

    if (targets.length && !DRY) {
      const [, meta] = await sequelize.query(
        `UPDATE invoices SET due_date = NULL WHERE id IN (:ids)`,
        { replacements: { ids: targets.map((t) => t.id) } });
      log(`마감일 비움: ${meta?.affectedRows ?? targets.length}행`);
    }

    if (BACKDATE_ISSUED_AT) {
      log('⚠ issued_at 소급이 켜져 있다 — 판정 확인 후에만 켤 것');
      // 준비된 조치: 발행일이 수령일보다 뒤인 백필 문서의 issued_at 을 수령일로 되돌린다.
      //   UPDATE invoices i JOIN purchase_orders po ON po.trade_invoice_id = i.id
      //      SET i.issued_at = po.received_at
      //    WHERE i.invoice_category='trade' AND po.received_at IS NOT NULL
      //      AND DATE(i.issued_at) > DATE(po.received_at);
    } else {
      log('issued_at 소급: 꺼짐 (상반된 판정 2건 — 스크립트 머리 주석 참조)');
    }

    // ── 3. 자가검증 ────────────────────────────────────────────────────
    const [after] = await sequelize.query(
      `SELECT IS_NULLABLE n FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME='invoices' AND COLUMN_NAME='due_date'`,
      { type: QueryTypes.SELECT });
    const remain = await sequelize.query(TARGET_SQL, { type: QueryTypes.SELECT });
    const nulls = await sequelize.query(
      `SELECT COUNT(*) n FROM invoices WHERE invoice_category='trade' AND due_date IS NULL`,
      { type: QueryTypes.SELECT });
    log(`검증: due_date NULL 허용=${after?.n} · 남은 대상=${remain.length}장 · 마감일 없는 거래 청구서=${nulls[0].n}장`);
    if (!DRY && remain.length > 0) { log('✗ 소급 후에도 대상이 남아 있다 — 확인 필요'); process.exit(1); }

    log('✓ done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-external-supplier-invoice-due-null] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();
