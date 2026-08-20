#!/usr/bin/env node
'use strict';
/**
 * 메뉴 ↔ 레시피 일괄 연결 도구.
 * docs/BRAND_STOCK_SHARING_DESIGN.md 2026-08-20 절(P3 ①층).
 *
 * ── 왜 필요한가 ────────────────────────────────────────────────────────────
 * 재고 자동 차감은 "이 메뉴에 어떤 재료가 들어가는가"(레시피 연결)가 있어야 작동한다.
 * 운영 실측(2026-08-20): **레시피는 173개나 만들어져 있는데 연결된 상품은 1개뿐**이라
 * 차감 대상 목록이 매번 비었고, 판매로 인한 재고 차감이 전 기간 0건이었다.
 * 즉 만들 게 아니라 **잇는 일**이 남아 있다.
 *
 * ── 규율: 자동 적용 금지 ───────────────────────────────────────────────────
 * `--dry-run`(기본)이 사람이 검토할 표를 내고, 확인 후 `--apply`.
 * **연결 = 차감 개시**이므로 재고·원가에 직접 영향을 준다. 이름이 같다고 기계가 적용하지 않는다.
 *
 * 매칭 규칙(결정적):
 *   같은 매장(restaurant_id) 안에서 정규화 이름이 **정확히 일치**하는 것만.
 *   후보가 2개 이상이면 연결하지 않고 '모호'로 보고. 이미 연결된 상품은 건너뛴다(덮어쓰지 않음).
 *
 * Usage:
 *   node scripts/link-product-recipes.js              # 표만 출력
 *   node scripts/link-product-recipes.js --apply      # 실제 연결
 *   node scripts/link-product-recipes.js --restaurant 10   # 특정 매장만
 */
require('dotenv/config');
const { sequelize } = require('../config/database');

const APPLY = process.argv.includes('--apply');
const ridIdx = process.argv.indexOf('--restaurant');
const ONLY_RID = ridIdx >= 0 ? parseInt(process.argv[ridIdx + 1], 10) : null;

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9가-힣]/g, '');

(async () => {
  try {
    const ridWhere = ONLY_RID ? ` AND restaurant_id = ${ONLY_RID}` : '';
    const [products] = await sequelize.query(
      `SELECT id, name, restaurant_id, recipe_id FROM products
        WHERE (is_active = 1 OR is_active IS NULL)${ridWhere} ORDER BY restaurant_id, name`
    );
    const [recipes] = await sequelize.query(
      `SELECT id, name, restaurant_id FROM recipes${ONLY_RID ? ` WHERE restaurant_id = ${ONLY_RID}` : ''}`
    );

    // (매장, 정규화이름) → 레시피 후보들
    const byKey = new Map();
    recipes.forEach((r) => {
      const k = `${r.restaurant_id}|${norm(r.name)}`;
      if (!byKey.has(k)) byKey.set(k, []);
      byKey.get(k).push(r);
    });

    const matched = [];
    const ambiguous = [];
    let already = 0;
    let unmatched = 0;

    for (const p of products) {
      if (p.recipe_id) { already++; continue; }
      const cands = byKey.get(`${p.restaurant_id}|${norm(p.name)}`) || [];
      if (cands.length === 1) matched.push({ p, r: cands[0] });
      else if (cands.length > 1) ambiguous.push({ p, cands });
      else unmatched++;
    }

    console.log(`상품 ${products.length}건 / 레시피 ${recipes.length}건 검토`);
    console.log(`  이미 연결됨 : ${already}`);
    console.log(`  연결 가능   : ${matched.length}`);
    console.log(`  모호(후보 2+): ${ambiguous.length}  ← 연결하지 않음`);
    console.log(`  짝 없음     : ${unmatched}`);
    console.log('');
    console.log('※ 연결하면 그 메뉴가 팔릴 때부터 재고가 자동으로 줄기 시작합니다.');
    console.log('');

    if (matched.length) {
      console.log('── 연결 예정 ──────────────────────────────────────────────');
      matched.forEach(({ p, r }) => {
        console.log(`  매장${p.restaurant_id} 상품#${p.id} "${String(p.name).slice(0, 30)}" → 레시피#${r.id}`);
      });
    }
    if (ambiguous.length) {
      console.log('');
      console.log('── 모호 (수동 결정 필요) ─────────────────────────────────');
      ambiguous.forEach(({ p, cands }) => {
        console.log(`  매장${p.restaurant_id} 상품#${p.id} "${String(p.name).slice(0, 30)}"`);
        cands.forEach((c) => console.log(`      후보 레시피#${c.id} "${String(c.name).slice(0, 30)}"`));
      });
    }

    if (!APPLY) {
      console.log('');
      console.log('- dry-run: 아무것도 바꾸지 않았습니다. 표를 확인한 뒤 --apply 로 적용하세요.');
      console.log('✓ done');
      process.exit(0);
    }

    for (const { p, r } of matched) {
      await sequelize.query(
        'UPDATE products SET recipe_id = :r WHERE id = :p AND recipe_id IS NULL',
        { replacements: { r: r.id, p: p.id } }
      );
    }
    console.log('');
    console.log(`- 연결 완료 ${matched.length}건 (모호 ${ambiguous.length}건은 그대로)`);
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
