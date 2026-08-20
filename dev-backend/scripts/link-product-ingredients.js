#!/usr/bin/env node
'use strict';
/**
 * 매입 자재 ↔ 판매 재료 연결 도구 (소프트 링크 채우기).
 * docs/BRAND_STOCK_SHARING_DESIGN.md 2026-08-20 절(P2-구조).
 *
 * ── 규율: 기계가 확신해도 사람이 확인한다 ──────────────────────────────────
 * `--dry-run`(기본)이 **사람이 검토할 표**를 내고, 확인 후에만 `--apply` 로 채운다.
 * 연결은 "이 자재의 실재고가 얼마인가"와 "발주 담기 대상이 무엇인가"를 결정하므로
 * 재고·발주에 직접 영향을 준다 — 이름이 같다고 자동 적용하지 않는다.
 *
 * 매칭 규칙(결정적·설명 가능):
 *   정규화(소문자·영숫자/한글 외 제거) 이름이 **정확히 일치**하는 것만. 유사도 점수·퍼지 매칭
 *   금지(비결정적이라 왜 이어졌는지 설명할 수 없다).
 *   후보가 2개 이상이면 **연결하지 않고 '모호'로 보고**한다(조용히 하나 고르지 않는다).
 *
 * 멱등: 이미 `linked_ingredient_id` 가 있는 행은 건너뛴다(덮어쓰지 않는다).
 *
 * Usage:
 *   node scripts/link-product-ingredients.js            # dry-run (표만 출력)
 *   node scripts/link-product-ingredients.js --apply    # 실제 연결
 */
require('dotenv/config');
const { sequelize } = require('../config/database');

const APPLY = process.argv.includes('--apply');
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9가-힣]/g, '');

(async () => {
  try {
    const [pis] = await sequelize.query(
      `SELECT id, name, owner_user_id, linked_ingredient_id
         FROM product_ingredients
        WHERE (is_active = 1 OR is_active IS NULL)`
    );
    const [igs] = await sequelize.query(
      `SELECT id, name, brand_id, current_stock
         FROM ingredients
        WHERE brand_id IS NOT NULL AND (is_active = 1 OR is_active IS NULL)`
    );

    // 정규화 이름 → 판매 재료 후보들
    const byName = new Map();
    igs.forEach((g) => {
      const k = norm(g.name);
      if (!k) return;
      if (!byName.has(k)) byName.set(k, []);
      byName.get(k).push(g);
    });

    const matched = [];
    const ambiguous = [];
    let already = 0;
    let unmatched = 0;

    for (const p of pis) {
      if (p.linked_ingredient_id) { already++; continue; }
      const cands = byName.get(norm(p.name)) || [];
      if (cands.length === 1) matched.push({ p, g: cands[0] });
      else if (cands.length > 1) ambiguous.push({ p, cands });
      else unmatched++;
    }

    console.log(`매입 자재 ${pis.length}건 검토`);
    console.log(`  이미 연결됨 : ${already}`);
    console.log(`  연결 가능   : ${matched.length}   (이름 정확 일치, 후보 1개)`);
    console.log(`  모호(후보 2+): ${ambiguous.length}  ← 연결하지 않음, 사람이 판단`);
    console.log(`  짝 없음     : ${unmatched}`);
    console.log('');

    if (matched.length) {
      console.log('── 연결 예정 ──────────────────────────────────────────────');
      matched.forEach(({ p, g }) => {
        console.log(`  매입#${p.id} → 판매#${g.id} (재고 ${g.current_stock}) | ${String(p.name).slice(0, 44)}`);
      });
    }
    if (ambiguous.length) {
      console.log('');
      console.log('── 모호 (후보가 여럿 — 수동 결정 필요) ───────────────────');
      ambiguous.forEach(({ p, cands }) => {
        console.log(`  매입#${p.id} | ${String(p.name).slice(0, 40)}`);
        cands.forEach((c) => console.log(`      후보 판매#${c.id} (재고 ${c.current_stock})`));
      });
    }

    if (!APPLY) {
      console.log('');
      console.log('- dry-run: 아무것도 바꾸지 않았습니다. 표를 확인한 뒤 --apply 로 적용하세요.');
      console.log('✓ done');
      process.exit(0);
    }

    for (const { p, g } of matched) {
      await sequelize.query(
        'UPDATE product_ingredients SET linked_ingredient_id = :g WHERE id = :p AND linked_ingredient_id IS NULL',
        { replacements: { g: g.id, p: p.id } }
      );
    }
    console.log('');
    console.log(`- 연결 완료 ${matched.length}건 (모호 ${ambiguous.length}건은 그대로 두었습니다)`);
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
