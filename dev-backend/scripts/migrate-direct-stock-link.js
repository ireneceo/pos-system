/**
 * scripts/migrate-direct-stock-link.js — "프로덕트 = 재고아이템" 직결 (docs/TRADE_STRUCTURE.md §2-1).
 *
 * 배경 (2026-09-04 Irene 확정 · Fable 판정):
 *   `Ingredients (direct)` 는 이름만 다이렉트였고, 실체는 재료를 여러 줄·수량까지 받아
 *   `"<이름> (auto)"` 레시피를 몰래 만들어 붙이는 것이었다. "둘 중 하나"에 없는 세 번째 길이다.
 *   이 스크립트가 그 세 번째 길을 정리한다.
 *
 * 하는 일 (멱등):
 *   ① 컬럼 신설 — `brand_products.product_ingredient_id`, `products.ingredient_id`
 *   ② 기존 ` (auto)` 레시피 정리:
 *      - 재료 정확히 1개 **and** quantity == 1 → 프로덕트에 직결 FK 세팅, 레시피 연결 해제 + 비활성
 *      - 그 외(재료 ≥2 또는 수량 ≠1) → **진짜 레시피**다. 이름에서 ` (auto)` 만 떼고 연결 유지
 *      - 프로덕트가 안 물린 고아 → 이름만 정리
 *
 * ⛔ 하지 않는 것: 재고아이템 자동 생성 · `current_stock`(프로덕트 자체 재고) 접촉 · 연결 자동 추측.
 *    연결은 사람이 화면에서 한다.
 *
 * 단위 주의: 다이렉트는 **1:1 그대로**다. 수량·단위 환산을 넣지 않는다 — 그래서 quantity==1 만 옮긴다.
 *
 * 사용: node scripts/migrate-direct-stock-link.js [--dry-run]
 *
 * ⚠ **기본이 적용이다.** 배포 루프(`deploy-to-production.sh`)는 레지스트리 `deploy` 목록을
 *   `node <파일>` 로 **인자 없이** 실행한다. 기본을 드라이런으로 두면 운영에서 컬럼이 안 생기고,
 *   그런데 모델에는 `ingredient_id`/`product_ingredient_id` 가 있어 **모든 Product/BrandProduct 조회가
 *   Unknown column 으로 죽는다**(= POS·모바일 메뉴 전면 장애). 미리보기는 `--dry-run` 으로 뒤집는다.
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const APPLY = !process.argv.includes('--dry-run');
const q = (sql, opts = {}) => sequelize.query(sql, { type: QueryTypes.SELECT, ...opts });

const COLUMNS = [
  { table: 'brand_products', column: 'product_ingredient_id',
    ddl: 'ADD COLUMN product_ingredient_id INT NULL COMMENT "재고아이템 다이렉트 — 레시피와 둘 중 하나만"' },
  { table: 'products', column: 'ingredient_id',
    ddl: 'ADD COLUMN ingredient_id INT NULL COMMENT "재고아이템 다이렉트 — 레시피와 둘 중 하나만"' },
];

async function ensureColumns() {
  let added = 0;
  for (const c of COLUMNS) {
    const [row] = await q(
      `SELECT COUNT(*) n FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = :c`,
      { replacements: { t: c.table, c: c.column } });
    if (Number(row.n) > 0) { console.log(`  = ${c.table}.${c.column} 이미 있음`); continue; }
    if (!APPLY) { console.log(`  + ${c.table}.${c.column} 신설 예정`); added += 1; continue; }
    await sequelize.query(`ALTER TABLE ${c.table} ${c.ddl}`);
    // 인덱스도 함께 — 목록 조회가 이 컬럼으로 조인한다.
    await sequelize.query(`CREATE INDEX idx_${c.table}_${c.column} ON ${c.table}(${c.column})`).catch(() => {});
    console.log(`  + ${c.table}.${c.column} 신설`);
    added += 1;
  }
  return added;
}

/** ` (auto)` 레시피 한 계통을 정리한다. 두 계통(매장 Recipe · 브랜드 ProductRecipe)이 대칭이라 한 함수로. */
async function cleanAutoRecipes({ label, recipeTable, lineTable, ownerTable, ownerFk, directFk }, t) {
  const rows = await q(
    `SELECT r.id recipe_id, r.name,
            (SELECT COUNT(*) FROM ${lineTable} l WHERE l.recipe_id = r.id) n_lines,
            (SELECT MIN(l.ingredient_id) FROM ${lineTable} l WHERE l.recipe_id = r.id) ing_id,
            (SELECT MIN(l.quantity) FROM ${lineTable} l WHERE l.recipe_id = r.id) qty,
            (SELECT GROUP_CONCAT(o.id) FROM ${ownerTable} o WHERE o.${ownerFk} = r.id) owners
       FROM ${recipeTable} r
      WHERE r.name LIKE '% (auto)'`,
    t ? { transaction: t } : {});

  const plan = { toDirect: [], toRealRecipe: [], orphanRenamed: [] };
  for (const r of rows) {
    const owners = r.owners ? String(r.owners).split(',').map(Number) : [];
    const single = Number(r.n_lines) === 1 && Number(r.qty) === 1;
    if (!owners.length) { plan.orphanRenamed.push(r); continue; }
    if (single) plan.toDirect.push({ ...r, owners });
    else plan.toRealRecipe.push({ ...r, owners });
  }

  console.log(`\n[${label}] ' (auto)' 레시피 ${rows.length}건`);
  console.log(`  → 재고아이템 다이렉트로 옮김 (재료 1개·수량 1): ${plan.toDirect.length}건`);
  plan.toDirect.forEach(r => console.log(`      "${r.name}" → 재고아이템 ${r.ing_id} · 프로덕트 ${r.owners.join(',')}`));
  console.log(`  → 진짜 레시피라 이름만 정리 (재료 ${'>='}2 또는 수량 ≠1): ${plan.toRealRecipe.length}건`);
  plan.toRealRecipe.forEach(r => console.log(`      "${r.name}" — 재료 ${r.n_lines}줄`));
  // ⚠ 재료 0줄짜리 껍데기가 이 통에 섞여 들어온다. Fable 절단면은 "그 외 = 이름만 정리, 연결 유지"라
  //    그대로 따르되, 껍데기는 **연결돼 보이면서 아무것도 차감하지 않으므로** 따로 세어 보고한다.
  //    (처리 방식 변경은 Fable 판정 사항 — 여기서 임의로 끊지 않는다.)
  const shells = plan.toRealRecipe.filter(r => Number(r.n_lines) === 0);
  if (shells.length) {
    console.log(`      ⚠ 그중 재료 0줄 껍데기 ${shells.length}건 — 연결돼 보이지만 차감은 0이다: ` +
      shells.map(r => `"${r.name}"(프로덕트 ${r.owners.join(',')})`).join(', '));
  }
  console.log(`  → 프로덕트가 안 물린 고아, 이름만 정리: ${plan.orphanRenamed.length}건`);

  if (!APPLY) return plan;

  for (const r of plan.toDirect) {
    for (const ownerId of r.owners) {
      await sequelize.query(
        `UPDATE ${ownerTable} SET ${directFk} = :ing, ${ownerFk} = NULL WHERE id = :id`,
        { replacements: { ing: r.ing_id, id: ownerId }, transaction: t });
    }
    // 레시피는 지우지 않고 비활성 — 원장·이력이 붙어 있을 수 있다(삭제 대신 비활성, 거울 규칙과 동일).
    // 이름의 ` (auto)` 도 함께 뗀다 — 안 떼면 증명 B(' (auto)' 0건)가 자기 잔재에 걸린다.
    await sequelize.query(`UPDATE ${recipeTable} SET is_active = 0, name = :n WHERE id = :id`,
      { replacements: { n: r.name.replace(/ \(auto\)$/, ''), id: r.recipe_id }, transaction: t });
  }
  for (const r of [...plan.toRealRecipe, ...plan.orphanRenamed]) {
    await sequelize.query(`UPDATE ${recipeTable} SET name = :n WHERE id = :id`,
      { replacements: { n: r.name.replace(/ \(auto\)$/, ''), id: r.recipe_id }, transaction: t });
  }
  return plan;
}

(async () => {
  console.log(`=== 재고아이템 다이렉트 이관 ${APPLY ? '(적용)' : '(드라이런 — 쓰기 없음)'} ===\n`);
  console.log('① 컬럼');
  await ensureColumns();

  if (!APPLY) {
    // 드라이런은 컬럼이 아직 없을 수 있으므로 레시피 정리만 미리 보여준다.
    await cleanAutoRecipes({ label: '매장 메뉴', recipeTable: 'recipes', lineTable: 'recipe_ingredients',
      ownerTable: 'products', ownerFk: 'recipe_id', directFk: 'ingredient_id' }, null);
    await cleanAutoRecipes({ label: '브랜드 프로덕트', recipeTable: 'product_recipes', lineTable: 'product_recipe_ingredients',
      ownerTable: 'brand_products', ownerFk: 'product_recipe_id', directFk: 'product_ingredient_id' }, null);
    console.log('\n드라이런 끝 — 적용하려면 --dry-run 없이 실행');
    process.exit(0);
  }

  const t = await sequelize.transaction();
  try {
    console.log('\n② ` (auto)` 레시피 정리');
    await cleanAutoRecipes({ label: '매장 메뉴', recipeTable: 'recipes', lineTable: 'recipe_ingredients',
      ownerTable: 'products', ownerFk: 'recipe_id', directFk: 'ingredient_id' }, t);
    await cleanAutoRecipes({ label: '브랜드 프로덕트', recipeTable: 'product_recipes', lineTable: 'product_recipe_ingredients',
      ownerTable: 'brand_products', ownerFk: 'product_recipe_id', directFk: 'product_ingredient_id' }, t);

    // 증명 A — 양쪽 FK 를 동시에 가진 행이 없어야 한다.
    const [a1] = await q(`SELECT COUNT(*) n FROM products WHERE recipe_id IS NOT NULL AND ingredient_id IS NOT NULL`, { transaction: t });
    const [a2] = await q(`SELECT COUNT(*) n FROM brand_products WHERE product_recipe_id IS NOT NULL AND product_ingredient_id IS NOT NULL`, { transaction: t });
    // 증명 B — ` (auto)` 이름이 남아 있지 않아야 한다.
    const [b1] = await q(`SELECT COUNT(*) n FROM recipes WHERE name LIKE '% (auto)'`, { transaction: t });
    const [b2] = await q(`SELECT COUNT(*) n FROM product_recipes WHERE name LIKE '% (auto)'`, { transaction: t });
    console.log(`\n증명 A 양쪽 FK 동시 보유: 매장 ${a1.n} · 브랜드 ${a2.n} (기대 0)`);
    console.log(`증명 B ' (auto)' 남은 레시피: 매장 ${b1.n} · 브랜드 ${b2.n} (기대 0)`);
    if (Number(a1.n) || Number(a2.n) || Number(b1.n) || Number(b2.n)) {
      throw new Error('증명 실패 — 되돌린다');
    }

    await t.commit();
    console.log('\n✅ 적용 완료');
    process.exit(0);
  } catch (e) {
    await t.rollback();
    console.error('❌ 실패 — 롤백:', e.message);
    process.exit(1);
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
