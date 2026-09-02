/**
 * Migration: P4-1 발주 결제·현금관리 기반. **화면 변화 0 · 기존 행 값 변경 0.**
 *
 * 설계: docs/PURCHASE_ORDER_SYSTEM.md §5-3 (Fable 확정) · 착수 순서 표 P4-1
 *
 * 무엇을 하나:
 *   1) purchase_orders 결제 컬럼 5개 신설
 *      payment_status  ENUM('unpaid','paid','refunded') NOT NULL DEFAULT 'unpaid'
 *      payment_method  ENUM('cash','bank_transfer','card') NULL   ← "외상"은 별도 방법이 아니라 unpaid 상태다
 *      paid_at         DATETIME NULL
 *      paid_by_user_id INT NULL
 *      cash_movement_id INT NULL   ← 되돌리기(취소·환불) 때 어느 드로어 이동을 뒤집을지 찾는 자리
 *   2) cash_movements.purchase_order_id INT NULL 신설
 *      실측(2026-09-02): 이 테이블에는 범용 reference_id 계열 컬럼이 **아예 없다**
 *      (있는 id 는 shift_id·restaurant_id·created_by_id 뿐) → 명시 FK 신설이 유일한 길이다.
 *   3) cash_movements.source 에 'purchase_order' **추가만**
 *      현재 값은 ('manual','settlement'). expandEnum 경유 — 목록 하드코딩 금지
 *      ([[reference_enum_expand_only]], 2026-08-30 pending_approval 소거 사고).
 *
 * 왜 안전한가:
 *   - 전부 **추가형**. 컬럼 드롭 0, 기존 행 값 수정 0, 타입 축소 0.
 *   - payment_status 기본값 'unpaid' = **지금의 진실**이다. 기존 수령 발주를 'paid' 로 백필하지 않는다 —
 *     결제 사실을 모르는데 기록하면 그게 거짓이 된다(Fable 확정).
 *   - 읽는 코드가 아직 없어도 동작이 안 바뀐다(P4-3 에서 쓰기 시작).
 *   - 마감 기대금액 공식(routes/cash-management.js:258)은 shift_id 로만 묶고 source 를 보지 않으므로,
 *     나중에 생길 purchase_order 출금·되돌리기 입금이 **자동으로** 그 공식에 잡힌다. 공식 무접촉.
 *   - 멱등: 이미 반영돼 있으면 전부 skip. 매 배포 재실행 안전.
 *   - 인쇄/주문/KDS 무관. process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-po-payment.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

async function tableExists(table) {
  const [rows] = await sequelize.query(
    `SELECT 1 FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t`,
    { replacements: { t: table } }
  );
  return rows.length > 0;
}

async function columnMeta(table, column) {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_TYPE t, IS_NULLABLE n, COLUMN_DEFAULT d
       FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
    { replacements: { t: table, c: column } }
  );
  return rows.length ? rows[0] : null;
}

/** 컬럼이 없을 때만 추가한다. 있으면 정의를 건드리지 않는다(남의 변경을 덮지 않기 위해). */
async function addColumnIfMissing(table, column, ddl, after) {
  const existing = await columnMeta(table, column);
  if (existing) {
    console.log(`  ✓ ${table}.${column} already exists (${existing.t}) — skip`);
    return false;
  }
  await sequelize.query(
    `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${ddl}${after ? ` AFTER \`${after}\`` : ''}`
  );
  console.log(`  ✓ ${table}.${column} 신설 (${ddl})`);
  return true;
}

(async () => {
  try {
    console.log('[migrate-po-payment] Start');

    // ── 1) purchase_orders 결제 컬럼 ────────────────────────────────────────
    if (!(await tableExists('purchase_orders'))) {
      console.log('  – purchase_orders 없음 — skip');
    } else {
      const added = await addColumnIfMissing(
        'purchase_orders', 'payment_status',
        `ENUM('unpaid','paid','refunded') NOT NULL DEFAULT 'unpaid'`, 'status'
      );
      if (added) {
        // 신설 직후 기존 행이 전부 기본값인지 증명 — 하나라도 다르면 백필이 섞인 것이다
        const [[cnt]] = await sequelize.query(
          `SELECT COUNT(*) c, SUM(payment_status='unpaid') u FROM \`purchase_orders\``
        );
        if (Number(cnt.c) !== Number(cnt.u)) {
          throw new Error(`payment_status 신설 후 기존 행이 전부 'unpaid' 가 아니다: ${cnt.u}/${cnt.c}`);
        }
        console.log(`    ↳ 기존 ${cnt.c}행 전부 'unpaid'(결제 사실을 모르므로 백필하지 않는다)`);
      }
      // 값 보장은 항상 expand-only (컬럼이 이미 있고 값이 부족한 경우까지 커버)
      const st = await expandEnum(sequelize, 'purchase_orders', 'payment_status', ['unpaid', 'paid', 'refunded']);
      console.log(st.added.length
        ? `  ✓ payment_status ENUM 값 추가: ${st.added.join(', ')} (현재 ${st.current.join(', ')})`
        : `  ✓ payment_status ENUM 값 이상 없음 (${st.current.join(', ')})`);

      await addColumnIfMissing('purchase_orders', 'payment_method',
        `ENUM('cash','bank_transfer','card') NULL`, 'payment_status');
      const pm = await expandEnum(sequelize, 'purchase_orders', 'payment_method', ['cash', 'bank_transfer', 'card']);
      console.log(pm.added.length
        ? `  ✓ payment_method ENUM 값 추가: ${pm.added.join(', ')} (현재 ${pm.current.join(', ')})`
        : `  ✓ payment_method ENUM 값 이상 없음 (${pm.current.join(', ')})`);

      await addColumnIfMissing('purchase_orders', 'paid_at', 'DATETIME NULL', 'payment_method');
      await addColumnIfMissing('purchase_orders', 'paid_by_user_id', 'INT NULL', 'paid_at');
      await addColumnIfMissing('purchase_orders', 'cash_movement_id', 'INT NULL', 'paid_by_user_id');
    }

    // ── 2) cash_movements 참조 컬럼 + source 값 ──────────────────────────────
    if (!(await tableExists('cash_movements'))) {
      console.log('  – cash_movements 없음 — skip');
    } else {
      const addedRef = await addColumnIfMissing('cash_movements', 'purchase_order_id', 'INT NULL', 'source');
      if (addedRef) {
        // 조회는 항상 (shift_id) 또는 (purchase_order_id) 로 들어온다 — 되돌리기가 원본을 찾을 때 쓴다
        await sequelize.query(
          'CREATE INDEX `idx_cash_movements_po` ON `cash_movements` (`purchase_order_id`)'
        ).catch((e) => console.log(`    ↳ 인덱스 생성 skip: ${e.message.slice(0, 80)}`));
      }
      const src = await expandEnum(sequelize, 'cash_movements', 'source', ['purchase_order']);
      console.log(src.added.length
        ? `  ✓ cash_movements.source 값 추가: ${src.added.join(', ')} (현재 ${src.current.join(', ')})`
        : `  ✓ cash_movements.source 값 이상 없음 (${src.current.join(', ')})`);
    }

    console.log('[migrate-po-payment] Done.');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
