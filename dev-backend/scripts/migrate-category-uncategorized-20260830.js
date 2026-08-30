/**
 * 일회성: 미분류 항목을 "Uncategorized" 카테고리에 담는다.
 * Irene 지시 2026-08-30: "새 카테고리를 미분류를 만들어서 안들어있는 건 미분류 되어야지"
 *
 * 자동 분류가 확실하지 않아 비워 둔 것들이 목록에서 사라져 보이지 않으면 안 된다 —
 * 소유자마다 "Uncategorized" 를 하나 만들고 그 소유자의 미분류 항목을 전부 담는다.
 * 나중에 Irene 이 화면에서 옮기면 이 카테고리는 자연히 비어 간다.
 *
 * 안전: 카테고리가 NULL 인 행만 건드린다(채워진 것 무접촉). 멱등. 되돌림은 백업 참조.
 * 사용: node scripts/migrate-category-uncategorized-20260830.js [--apply]
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const APPLY = process.argv.includes('--apply');
const NAME = 'Uncategorized';

const q = (s, r) => sequelize.query(s, { replacements: r, type: sequelize.QueryTypes.SELECT });
const run = (s, r) => sequelize.query(s, { replacements: r });

(async () => {
  try {
    console.log(`[uncategorized] ${APPLY ? 'APPLY' : 'DRY-RUN'}`);
    let created = 0, moved = 0;

    // ── 재료 (소유자 = 매장 또는 브랜드) ─────────────────────────────────
    const ingScopes = await q(
      `SELECT restaurant_id, brand_id, COUNT(*) c FROM ingredients
        WHERE ingredient_category_id IS NULL GROUP BY restaurant_id, brand_id`
    );
    for (const s of ingScopes) {
      // 매장 값이 있으면 소유자는 매장이다(브랜드 공유가 매장에 복사된 행 포함).
      const isRest = s.restaurant_id != null;
      const where = isRest
        ? `owner_type = 'restaurant' AND restaurant_id = :r`
        : `owner_type = 'brand' AND brand_id = :b`;
      const repl = { r: s.restaurant_id, b: s.brand_id };
      let [cat] = await q(`SELECT id FROM ingredient_categories WHERE ${where} AND name = :n`, { ...repl, n: NAME });
      console.log(`  · [재료] ${isRest ? `매장 ${s.restaurant_id}` : `브랜드 ${s.brand_id}`} — ${s.c}건${cat ? '' : ' (카테고리 신설)'}`);
      if (!APPLY) { if (!cat) created++; moved += Number(s.c); continue; }
      if (!cat) {
        await run(
          `INSERT INTO ingredient_categories (owner_type, restaurant_id, brand_id, name, display_order, is_active, created_at, updated_at)
           VALUES (:ot, :r, :b, :n, 999, 1, NOW(), NOW())`,
          { ot: isRest ? 'restaurant' : 'brand', r: isRest ? s.restaurant_id : null, b: isRest ? null : s.brand_id, n: NAME }
        );
        created++;
        [cat] = await q(`SELECT id FROM ingredient_categories WHERE ${where} AND name = :n`, { ...repl, n: NAME });
      }
      const [res] = await run(
        `UPDATE ingredients SET ingredient_category_id = :c
          WHERE ingredient_category_id IS NULL AND ${isRest ? 'restaurant_id = :r' : 'brand_id = :b AND restaurant_id IS NULL'}`,
        { c: cat.id, ...repl }
      );
      moved += Number(s.c);
    }

    // ── BG 프로덕트 (소유자 = owner_user_id) ─────────────────────────────
    const bpScopes = await q(
      `SELECT owner_user_id, COUNT(*) c FROM brand_products WHERE category_id IS NULL GROUP BY owner_user_id`
    );
    for (const s of bpScopes) {
      let [cat] = await q(`SELECT id FROM brand_product_categories WHERE owner_user_id = :u AND name = :n`,
        { u: s.owner_user_id, n: NAME });
      console.log(`  · [프로덕트] owner ${s.owner_user_id} — ${s.c}건${cat ? '' : ' (카테고리 신설)'}`);
      if (!APPLY) { if (!cat) created++; moved += Number(s.c); continue; }
      if (!cat) {
        await run(
          `INSERT INTO brand_product_categories (owner_user_id, name, sort_order, is_active, created_at, updated_at)
           VALUES (:u, :n, 999, 1, NOW(), NOW())`, { u: s.owner_user_id, n: NAME });
        created++;
        [cat] = await q(`SELECT id FROM brand_product_categories WHERE owner_user_id = :u AND name = :n`,
          { u: s.owner_user_id, n: NAME });
      }
      await run(`UPDATE brand_products SET category_id = :c WHERE category_id IS NULL AND owner_user_id = :u`,
        { c: cat.id, u: s.owner_user_id });
      moved += Number(s.c);
    }

    console.log(`\n  카테고리 신설 ${created} · 담은 항목 ${moved}`);
    if (APPLY) {
      const [{ c: leftIng }] = await q(`SELECT COUNT(*) c FROM ingredients WHERE ingredient_category_id IS NULL`);
      const [{ c: leftBp }] = await q(`SELECT COUNT(*) c FROM brand_products WHERE category_id IS NULL`);
      console.log(`  ✓ 남은 미분류 — 재료 ${leftIng} · 프로덕트 ${leftBp}`);
      if (Number(leftIng) + Number(leftBp) !== 0) throw new Error('아직 카테고리 없는 행이 남았다');
    }
    process.exit(0);
  } catch (e) {
    console.error('  ✗ 실패:', e.message);
    process.exit(1);
  }
})();
