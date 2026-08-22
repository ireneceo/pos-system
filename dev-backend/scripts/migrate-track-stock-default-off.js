#!/usr/bin/env node
'use strict';
/**
 * `ingredients.track_stock` / `product_ingredients.track_stock` 컬럼 **기본값을 꺼짐으로** 바꾼다.
 *
 * ── 왜 ────────────────────────────────────────────────────────────────────
 * 예전 기본값은 켜짐이었고, 아무도 끄지 않아 **만들어진 것이 전부 재고 관리 대상**이 됐다.
 * 운영 실측(2026-08-22): 매입자재 289개가 전부 켜져 있는데 실제로 수량이 들어 있는 건 3개,
 * 매장 재료도 365개 중 364개가 켜짐인데 수량은 28개뿐이었다. 그 결과 목록은 수백 줄인데
 * 관리되는 건 몇 개고, 수량 0인 항목들이 부족·품절 알림을 채워 **진짜 부족이 묻혔다.**
 * 재고를 세겠다고 사람이 정한 것만 켠다.
 *
 * **기존 행은 건드리지 않는다.** 이미 켜 둔 것을 기계가 끄면, 실제로 관리 중인 재료까지
 * 조용히 목록에서 사라진다 — 어느 것이 "아직 입력 안 함"이고 어느 것이 "안 쓸 것"인지는
 * 매장만 안다. 정리는 화면의 켜기/끄기 스위치로 사람이 한다.
 *
 * 멱등: 이미 기본값이 0 이면 아무것도 하지 않는다.
 *
 * Usage: node scripts/migrate-track-stock-default-off.js
 */
require('dotenv/config');
const { sequelize } = require('../config/database');

const TARGETS = ['ingredients', 'product_ingredients'];

(async () => {
  try {
    for (const table of TARGETS) {
      const rows = await sequelize.query(
        `SELECT COLUMN_DEFAULT AS def FROM information_schema.columns
          WHERE table_schema = DATABASE() AND table_name = :t AND column_name = 'track_stock'`,
        { replacements: { t: table }, type: sequelize.QueryTypes.SELECT }
      );
      if (!rows.length) { console.log(`- ${table}.track_stock 없음 — 건너뜀`); continue; }
      const def = String(rows[0].def);
      if (def === '0') { console.log(`- ${table}.track_stock 기본값 이미 0 — no-op`); continue; }
      await sequelize.query(`ALTER TABLE \`${table}\` ALTER COLUMN track_stock SET DEFAULT 0`);
      console.log(`- ${table}.track_stock 기본값 ${def} → 0 (기존 행 무변경)`);
    }
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
