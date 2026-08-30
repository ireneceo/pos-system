/**
 * Migration: 단위 주문(UoM) 1단계 — 전 역할 공용 기반. **화면 변화 0.**
 *
 * 설계: docs/PURCHASE_ORDER_SYSTEM.md §2 절단면 ②·⑥ (Fable 확정 2026-08-30)
 *
 * 무엇을 하나:
 *   1) supplier_products.order_mode  ENUM('pack','measure') NOT NULL DEFAULT 'pack'  — 신설
 *      'pack'    = 개수로 주문 (팩/박스/포대) — **기존 전 행의 동작 그대로**
 *      'measure' = 무게·부피로 주문 (kg/g/L/ml, 소수) — 이번에 신설되는 모드
 *   2) min_order_quantity  INT → DECIMAL(10,2)  — 2곳
 *      supplier_products / ingredient_seller_products.
 *      measure 모드의 "최소 0.5kg" 을 담으려면 필수. INT 는 0.5 를 못 담는다.
 *
 * 왜 안전한가:
 *   - order_mode 는 **DEFAULT 'pack' = 현행 동작**. 기존 38행이 전부 pack 으로 들어가
 *     읽는 코드가 없어도 동작이 바뀌지 않는다(추가형 변경).
 *   - INT → DECIMAL(10,2) 는 **확폭**이다. 기존 정수값은 1 → 1.00 으로 무손실 보존.
 *     축소(DECIMAL→INT)가 아니므로 값이 잘리지 않는다.
 *   - ENUM 은 `expandEnum` 경유 — 목록 하드코딩 금지([[reference_enum_expand_only]],
 *     2026-08-30 pending_approval 소거 사고).
 *   - 멱등: 이미 반영돼 있으면 전부 skip. 매 배포 재실행 안전.
 *   - 인쇄/주문/KDS 무관. row 데이터 미수정, 컬럼 드롭 없음.
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-po-unit-order-foundation.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

const ORDER_MODES = ['pack', 'measure'];

async function columnMeta(table, column) {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_TYPE t, IS_NULLABLE n, COLUMN_DEFAULT d, DATA_TYPE dt
       FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
    { replacements: { t: table, c: column } }
  );
  return rows.length ? rows[0] : null;
}

async function tableExists(table) {
  const [rows] = await sequelize.query(
    `SELECT 1 FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t`,
    { replacements: { t: table } }
  );
  return rows.length > 0;
}

/** min_order_quantity 를 DECIMAL(10,2) 로 확폭. 이미 decimal 이면 skip. */
async function widenMinOrder(table) {
  if (!(await tableExists(table))) {
    console.log(`  – ${table} 없음 — skip`);
    return;
  }
  const meta = await columnMeta(table, 'min_order_quantity');
  if (!meta) {
    console.log(`  – ${table}.min_order_quantity 없음 — skip`);
    return;
  }
  if (String(meta.dt).toLowerCase() === 'decimal') {
    console.log(`  ✓ ${table}.min_order_quantity already ${meta.t} — skip`);
    return;
  }

  // 확폭 전 값 보존 증명용 스냅샷 (합계·건수)
  const [[before]] = await sequelize.query(
    `SELECT COUNT(*) c, COALESCE(SUM(min_order_quantity),0) s FROM \`${table}\``
  );

  const nullClause = meta.n === 'YES' ? 'NULL' : 'NOT NULL';
  const dfltClause = meta.d == null ? '' : ` DEFAULT '${String(meta.d).replace(/'/g, "''")}'`;
  await sequelize.query(
    `ALTER TABLE \`${table}\` MODIFY COLUMN \`min_order_quantity\` DECIMAL(10,2) ${nullClause}${dfltClause}`
  );

  const after = await columnMeta(table, 'min_order_quantity');
  if (String(after.dt).toLowerCase() !== 'decimal') {
    throw new Error(`${table}.min_order_quantity ALTER ran but type is still ${after.t}`);
  }
  // 무손실 확폭 증명 — 건수·합계가 동일해야 한다
  const [[post]] = await sequelize.query(
    `SELECT COUNT(*) c, COALESCE(SUM(min_order_quantity),0) s FROM \`${table}\``
  );
  if (Number(post.c) !== Number(before.c) || Number(post.s) !== Number(before.s)) {
    throw new Error(
      `${table}.min_order_quantity 확폭에서 값이 변했다: ` +
      `건수 ${before.c}→${post.c}, 합계 ${before.s}→${post.s}`
    );
  }
  console.log(`  ✓ ${table}.min_order_quantity ${meta.t} → ${after.t} (${post.c}행 · 합계 ${post.s} 불변)`);
}

(async () => {
  try {
    console.log('[migrate-po-unit-order-foundation] Starting...');

    // ── 1) supplier_products.order_mode 신설 ────────────────────────────────
    if (!(await tableExists('supplier_products'))) {
      console.log('  – supplier_products 없음 — order_mode skip');
    } else {
      const existing = await columnMeta('supplier_products', 'order_mode');
      if (!existing) {
        await sequelize.query(
          `ALTER TABLE \`supplier_products\`
             ADD COLUMN \`order_mode\` ENUM('pack','measure') NOT NULL DEFAULT 'pack'
             AFTER \`base_quantity\``
        );
        const [[cnt]] = await sequelize.query(
          `SELECT COUNT(*) c, SUM(order_mode='pack') p FROM \`supplier_products\``
        );
        if (Number(cnt.c) !== Number(cnt.p)) {
          throw new Error(`order_mode 신설 후 기존 행이 전부 'pack' 이 아니다: ${cnt.p}/${cnt.c}`);
        }
        console.log(`  ✓ supplier_products.order_mode 신설 — 기존 ${cnt.c}행 전부 'pack'(현행 동작 보존)`);
      } else {
        console.log(`  ✓ supplier_products.order_mode already exists (${existing.t}) — skip 신설`);
      }
      // 값 보장은 항상 expand-only 로 (컬럼이 이미 있고 값이 부족한 경우까지 커버)
      const { added, current } = await expandEnum(sequelize, 'supplier_products', 'order_mode', ORDER_MODES);
      console.log(added.length
        ? `  ✓ order_mode ENUM 값 추가: ${added.join(', ')} (현재 ${current.join(', ')})`
        : `  ✓ order_mode ENUM 값 이상 없음 (${current.join(', ')})`);
    }

    // ── 2) min_order_quantity INT → DECIMAL(10,2) · 2곳 ────────────────────
    await widenMinOrder('supplier_products');
    await widenMinOrder('ingredient_seller_products');

    console.log('[migrate-po-unit-order-foundation] Done.');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
