/**
 * Migration: 단위 주문(UoM) — 브랜드 축. **화면 변화 0.**
 *
 * 설계: docs/PURCHASE_ORDER_SYSTEM.md §2 (Fable D5, 2026-08-30)
 * 공급업체 축(`migrate-po-unit-order-foundation.js`)의 브랜드 대칭편이다.
 *
 * 무엇을 하나:
 *   1) brand_products.order_mode  ENUM('pack','measure') NOT NULL DEFAULT 'pack'  — 신설
 *      'pack'    = 개수로 주문 (팩/박스/포대) — **기존 전 행의 동작 그대로**
 *      'measure' = 무게·부피로 주문 (kg/g/L/ml, 소수)
 *   2) brand_products.min_order_quantity  INT → DECIMAL(10,2)  — 확폭
 *      measure 의 "최소 0.5kg" 을 담으려면 필수. INT 는 0.5 를 못 담는다.
 *   (base_quantity 는 brand_products 에 이미 DECIMAL(10,2) 로 있다 — 신설 불필요)
 *
 * 왜 지금 필요한가 (실측):
 *   `routes/ingredients.js` 두 곳이 이미 `BrandProduct` 를 `attributes: [... 'order_mode']`
 *   로 조회한다. 컬럼이 없어 **브랜드 재료에 브랜드 판매자를 연결하는 순간 그 화면이 500**
 *   으로 죽는다(실측: Unknown column 'order_mode' in 'field list'). 지금은 dev·운영 모두
 *   그런 연결이 0건이라 안 터졌을 뿐이다. 이 마이그가 그 지뢰를 함께 없앤다.
 *
 * 왜 안전한가:
 *   - order_mode 는 **DEFAULT 'pack' = 현행 동작**. 기존 행이 전부 pack 으로 들어가
 *     읽는 코드가 없어도 동작이 바뀌지 않는다(추가형 변경).
 *   - INT → DECIMAL(10,2) 는 **확폭**. 기존 정수값은 무손실 보존(건수·합계 자가검증).
 *   - ENUM 은 `expandEnum` 경유 — 목록 하드코딩 금지([[reference_enum_expand_only]]).
 *   - 멱등: 이미 반영돼 있으면 전부 skip. 매 배포 재실행 안전.
 *   - 인쇄/주문/KDS 무관. row 데이터 미수정, 컬럼 드롭 없음.
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-brand-unit-order.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

const TABLE = 'brand_products';
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

(async () => {
  try {
    console.log('[migrate-brand-unit-order] Starting...');

    const [rows] = await sequelize.query(
      `SELECT 1 FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t`,
      { replacements: { t: TABLE } }
    );
    if (!rows.length) {
      console.log(`  – ${TABLE} 없음 — 전부 skip`);
      process.exit(0);
    }

    // ── 1) order_mode 신설 ───────────────────────────────────────────────
    const existing = await columnMeta(TABLE, 'order_mode');
    if (!existing) {
      await sequelize.query(
        `ALTER TABLE \`${TABLE}\`
           ADD COLUMN \`order_mode\` ENUM('pack','measure') NOT NULL DEFAULT 'pack'
           AFTER \`base_quantity\``
      );
      const [[cnt]] = await sequelize.query(
        `SELECT COUNT(*) c, SUM(order_mode='pack') p FROM \`${TABLE}\``
      );
      if (Number(cnt.c) !== Number(cnt.p)) {
        throw new Error(`order_mode 신설 후 기존 행이 전부 'pack' 이 아니다: ${cnt.p}/${cnt.c}`);
      }
      console.log(`  ✓ ${TABLE}.order_mode 신설 — 기존 ${cnt.c}행 전부 'pack'(현행 동작 보존)`);
    } else {
      console.log(`  ✓ ${TABLE}.order_mode already exists (${existing.t}) — skip 신설`);
    }
    // 값 보장은 항상 expand-only 로 (컬럼이 이미 있고 값이 부족한 경우까지 커버)
    const { added, current } = await expandEnum(sequelize, TABLE, 'order_mode', ORDER_MODES);
    console.log(added.length
      ? `  ✓ order_mode ENUM 값 추가: ${added.join(', ')} (현재 ${current.join(', ')})`
      : `  ✓ order_mode ENUM 값 이상 없음 (${current.join(', ')})`);

    // ── 2) min_order_quantity INT → DECIMAL(10,2) ────────────────────────
    const meta = await columnMeta(TABLE, 'min_order_quantity');
    if (!meta) {
      console.log(`  – ${TABLE}.min_order_quantity 없음 — skip`);
    } else if (String(meta.dt).toLowerCase() === 'decimal') {
      console.log(`  ✓ ${TABLE}.min_order_quantity already ${meta.t} — skip`);
    } else {
      const [[before]] = await sequelize.query(
        `SELECT COUNT(*) c, COALESCE(SUM(min_order_quantity),0) s FROM \`${TABLE}\``
      );
      const nullClause = meta.n === 'YES' ? 'NULL' : 'NOT NULL';
      const dfltClause = meta.d == null ? '' : ` DEFAULT '${String(meta.d).replace(/'/g, "''")}'`;
      await sequelize.query(
        `ALTER TABLE \`${TABLE}\` MODIFY COLUMN \`min_order_quantity\` DECIMAL(10,2) ${nullClause}${dfltClause}`
      );
      const after = await columnMeta(TABLE, 'min_order_quantity');
      if (String(after.dt).toLowerCase() !== 'decimal') {
        throw new Error(`min_order_quantity ALTER ran but type is still ${after.t}`);
      }
      const [[post]] = await sequelize.query(
        `SELECT COUNT(*) c, COALESCE(SUM(min_order_quantity),0) s FROM \`${TABLE}\``
      );
      if (Number(post.c) !== Number(before.c) || Number(post.s) !== Number(before.s)) {
        throw new Error(
          `min_order_quantity 확폭에서 값이 변했다: 건수 ${before.c}→${post.c}, 합계 ${before.s}→${post.s}`
        );
      }
      console.log(`  ✓ ${TABLE}.min_order_quantity ${meta.t} → ${after.t} (${post.c}행 · 합계 ${post.s} 불변)`);
    }

    console.log('[migrate-brand-unit-order] Done.');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
