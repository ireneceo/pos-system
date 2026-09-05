/**
 * scripts/migrate-package-unit.js — 단위 모델 다섯 칸 (docs/TRADE_STRUCTURE.md §2-2).
 *
 * 배경 (2026-09-05 Irene 확정 · Fable 판정):
 *   > "2kg가 1 pack인데 발주하는 기본 단위랑 레시피에 사용하는 단위랑 다르면 어떻게 해?"
 *   > "취급 기준숫자(Base Qty), 취급단위(unit), 기준양, 기준단위, 가격 이렇게 있어야 하는 거야."
 *   > "포장단위가 우리가 말하는 기준단위야. … 취급단위라고 하는 unit이 우리 내부 사용단위 맞지?"
 *   > "취급단위에 있던 숫자랑 단위 그대로 기준양과 기준단위에도 넣어줘.
 *      만약 아이템명에 기준수량과 단위가 기재되어 있으면 그대로 적용 좀 해주고"
 *
 *   병의 이름: **취급단위 칸(`unit`)에 기준단위 값(pack)이 앉아 있다.**
 *   운영 실측 2026-09-05 — 브랜드 재고아이템 254/310 · 매장 재료 301/404.
 *
 * 하는 일 (멱등):
 *   ① 컬럼 신설 — `product_ingredients` · `ingredients` 에 `package_unit`(ENUM, NULL) ·
 *      `package_quantity`(DECIMAL(10,2) NOT NULL DEFAULT 1)
 *   ② 수렴 — 우선순위 **이름 규격 > 거울이 가진 값 > 판매자 상품 규격 > 취급 값 복사**
 *      · 복사: `package_unit := unit`, `package_quantity := base_quantity` (Irene 지시 ①)
 *      · 규격 채택 시: `unit := 규격 단위`, `base_quantity := 규격 양` 으로 **바꾸고**,
 *        같은 트랜잭션에서 재고 · 매핑 환산 · 레시피 줄을 **함께 환산**한다.
 *        (환산 없이 단위만 바꾸면 `20 g` 이 `20 pack` 이 된다 — 그래서 409 잠금이 있다)
 *
 * 단위 주의: 이 스크립트가 곱하는 계수는 **`ratio = 새 base_quantity ÷ 옛 base_quantity`** 하나뿐이다.
 *   옛 base_quantity 는 전부 1(포장단위 행)이라 실질 ratio = 규격 양.
 *   kg→g · L→ml 정규화는 `utils/specFromName.js` 가 이미 한 뒤의 값이 들어온다.
 *
 * ⛔ 하지 않는 것: 가격(`unit_cost`) 재계산 · 재고 없는 값 추측 · 애매한 이름 자동 적용.
 *   애매한 것은 복사 상태로 두고 목록으로 보고한다(사람이 화면에서 정한다).
 *
 * 사용: node scripts/migrate-package-unit.js [--dry-run]
 *
 * ⚠ **기본이 적용이다.** 배포 루프는 레지스트리 목록을 인자 없이 실행한다.
 *   기본을 드라이런으로 두면 운영에 컬럼이 안 생기고, 모델에는 있어 전 조회가 죽는다.
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { specFromName } = require('../utils/specFromName');

const APPLY = !process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');
const q = (sql, opts = {}) => sequelize.query(sql, { type: QueryTypes.SELECT, ...opts });

const TABLES = ['product_ingredients', 'ingredients'];

/**
 * @param {{apply?: boolean}} opts  apply=false 면 만들지 않고 목록만 알린다(CLI 드라이런용).
 *   ⚠ 수렴 스크립트는 **항상 apply=true** 로 부른다 — 컬럼이 없으면 드라이런조차 못 읽는다.
 *     컬럼 추가는 NULL 허용 가산이라 드라이런에서 만들어도 데이터에 영향이 없다.
 */
async function ensureColumns({ apply = true } = {}) {
  let added = 0;
  for (const table of TABLES) {
    for (const [column, ddl] of [
      ['package_unit', `ADD COLUMN package_unit ENUM('kg','g','L','ml','piece','pack','can','bottle') NULL COMMENT '기준단위(포장) — 포장·발주 단위. 비면 취급단위와 같다'`],
      ['package_quantity', `ADD COLUMN package_quantity DECIMAL(10,2) NOT NULL DEFAULT 1 COMMENT '기준양 — 가격이 가리키는 포장 수(보통 1)'`],
    ]) {
      const [row] = await q(
        `SELECT COUNT(*) n FROM information_schema.COLUMNS
          WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
        { replacements: { t: table, c: column } }
      );
      if (Number(row.n) > 0) continue;
      if (apply) await sequelize.query(`ALTER TABLE ${table} ${ddl}`);
      console.log(`  ${apply ? '+' : '(dry)'} ${table}.${column}`);
      added += 1;
    }
  }
  if (!added) console.log('  컬럼 이미 있음 — 건너뜀');
  return added;
}

module.exports = { ensureColumns };

if (require.main === module) {
  (async () => {
    console.log(`\n단위 모델 다섯 칸 — ${APPLY ? '적용' : '드라이런'}\n`);
    console.log('① 컬럼');
    await ensureColumns({ apply: APPLY });
    console.log('\n② 수렴은 scripts/converge-unit-model.js 가 한다 (dry-run 표 → 판정 → apply).');
    console.log('   이 마이그는 **스키마만** 만든다 — 배포마다 다시 도는 것이 데이터를 건드리면 안 된다.\n');
    process.exit(0);
  })().catch((e) => { console.error('❌', e.message); process.exit(1); });
}
