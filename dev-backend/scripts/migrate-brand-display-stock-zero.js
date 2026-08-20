#!/usr/bin/env node
'use strict';
/**
 * 브랜드 "표시용 재고 사본" 정리 — P2 코드 수정과 **같은 배포에서** 자동 실행된다.
 * docs/BRAND_STOCK_SHARING_DESIGN.md 2026-08-20 절 / 운영 인계서 P2.
 *
 * ── 왜 필요한가 ────────────────────────────────────────────────────────────
 * 브랜드 재고 화면이 중앙 재고(`ingredients.current_stock`)만 읽었기 때문에, 매장 실재고를
 * 화면에 띄우려고 **같은 수량을 중앙 칸에도 복사해 넣어** 두었다(운영 실측 2026-08-20:
 * 18행 전부 중앙 == 오버레이). 화면이 매장 보유분을 읽도록 고치는 순간, 그 사본이 남아 있으면
 * **정확히 2배로 보인다.** 그래서 코드 수정과 사본 정리는 한 배포 안에서 함께 일어나야 한다.
 *
 * ── 안전 설계 (전면 0화 금지) ──────────────────────────────────────────────
 * ⛔ `current_stock` 을 무조건 0으로 미는 것은 **금지**다. 그 칸은 원래 "브랜드 중앙창고 재고"라는
 *    정당한 의미가 있고, 다른 브랜드는 실제로 중앙 재고를 담아 쓸 수 있다. 전면 0화는 P2 가
 *    표시하려는 "중앙" 개념 자체를 파괴한다.
 * ✅ 대신 **"표시용 사본이라는 증거"가 있는 행만** 외과적으로 정리한다:
 *      ① 브랜드 소유 재료이고(`brand_id` 있음)
 *      ② 그 재료의 매장 오버레이가 존재하며
 *      ③ **중앙값과 오버레이값이 정확히 일치**하고 (= 복사해 넣은 흔적)
 *      ④ 값이 0 보다 크다
 *    네 조건을 모두 만족하는 행만 0 으로 만든다.
 *
 * ── 멱등 ───────────────────────────────────────────────────────────────────
 * 0 으로 만들면 조건 ④가 깨져 재실행 시 대상이 0건이 된다(자연 멱등). 매번 실행돼도 안전하다.
 *
 * Usage: node scripts/migrate-brand-display-stock-zero.js [--dry-run]
 */
require('dotenv/config');
const { sequelize } = require('../config/database');

const DRY = process.argv.includes('--dry-run');

// 표시용 사본 판별 술어 — 위 ①~④. 이 SELECT 와 UPDATE 는 반드시 같은 조건을 써야 한다.
const MATCH = `
  FROM ingredients i
  JOIN restaurant_ingredient_stocks ris ON ris.ingredient_id = i.id
 WHERE i.brand_id IS NOT NULL
   AND i.current_stock > 0
   AND ris.current_stock > 0
   AND i.current_stock = ris.current_stock
`;

(async () => {
  try {
    const [targets] = await sequelize.query(
      `SELECT i.id, i.name, i.unit, i.current_stock AS central, ris.current_stock AS overlay,
              ris.restaurant_id ${MATCH} ORDER BY i.name`
    );

    if (!targets.length) {
      console.log('- 정리 대상 0건 (이미 정리됐거나 사본이 없음) — no-op');
      console.log('✓ done');
      process.exit(0);
    }

    console.log(`- 표시용 사본으로 판정된 행 ${targets.length}건:`);
    targets.forEach((t) => {
      console.log(`    재료#${t.id} 매장${t.restaurant_id} | 중앙 ${t.central} = 오버레이 ${t.overlay} ${t.unit || ''} | ${String(t.name).slice(0, 40)}`);
    });

    if (DRY) {
      console.log('- --dry-run: 변경하지 않고 종료');
      console.log('✓ done');
      process.exit(0);
    }

    // 매장 오버레이(정본)는 건드리지 않는다 — 중앙 사본만 0으로.
    const ids = targets.map((t) => t.id);
    const [result] = await sequelize.query(
      `UPDATE ingredients i
          JOIN restaurant_ingredient_stocks ris ON ris.ingredient_id = i.id
          SET i.current_stock = 0
        WHERE i.brand_id IS NOT NULL
          AND i.current_stock > 0
          AND ris.current_stock > 0
          AND i.current_stock = ris.current_stock`
    );

    const [after] = await sequelize.query(`SELECT COUNT(*) c ${MATCH}`);
    console.log(`- 정리 완료 (남은 대상 ${after[0].c}건 — 0 이어야 정상)`);
    console.log(`- 대상 재료 id: ${ids.join(', ')}`);
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
