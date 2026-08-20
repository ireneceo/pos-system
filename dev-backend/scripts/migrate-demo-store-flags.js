#!/usr/bin/env node
'use strict';
/**
 * 데모 브랜드/푸드코트 산하 쇼케이스 지점에 **데모 라벨을 붙인다**(is_demo=1).
 *
 * ── 왜 필요한가 ────────────────────────────────────────────────────────────
 * 공개 quick-login 가드(services/authService.js)는 "닿는 매장이 데모가 아니면 거부"다.
 * 판정 기준이 계정 꼬리표가 아니라 **매장 is_demo** 이기 때문에, 데모 브랜드 밑에 있는
 * 쇼케이스 지점인데 라벨만 안 붙은 매장이 있으면 **랜딩 데모 체험 카드가 죽는다.**
 * 운영 실측(2026-08-20): rid19·20·21·22(데모 브랜드 산하)·27(데모 푸드코트 산하)이
 * 전부 `is_test=1, is_demo=0, orders=0` 이었다 — 실체는 데모인데 라벨이 틀린 것.
 * 가드를 느슨하게 푸는 대신 **라벨을 진실에 맞춘다.**
 *
 * ── 안전조건 (셋 다 만족해야 건드린다) ────────────────────────────────────
 *   ① 부모가 데모다 — 소속 브랜드 또는 푸드코트가 is_demo=1
 *   ② 주문이 0건이다 — 한 건이라도 영업했으면 실매장으로 보고 손대지 않는다
 *   ③ is_test=1 이다 — 운영자가 이미 "실서비스 아님"으로 표시해 둔 것
 * 실매장을 데모로 잘못 바꾸면 그 매장이 공개 카드로 열리므로, 조건은 좁게 잡는다.
 *
 * 멱등: 이미 is_demo=1 이면 대상에서 빠진다. 매 배포 재실행돼도 안전(no-op).
 * 되돌리기: 아래 출력의 대상 id 에 is_demo=0 을 넣으면 원상복구된다.
 *
 * Usage: node scripts/migrate-demo-store-flags.js
 */
require('dotenv/config');
const { sequelize } = require('../config/database');

(async () => {
  try {
    const targets = await sequelize.query(
      `SELECT r.id, r.name, r.is_test,
              COALESCE(b.name, f.name) parent_name
         FROM restaurants r
         LEFT JOIN brands b ON b.id = r.brand_id
         LEFT JOIN foodcourts f ON f.id = r.foodcourt_id
        WHERE (r.is_demo = 0 OR r.is_demo IS NULL)
          AND r.is_test = 1
          AND (b.is_demo = 1 OR f.is_demo = 1)
          AND (SELECT COUNT(*) FROM orders o WHERE o.restaurant_id = r.id) = 0`,
      { type: sequelize.QueryTypes.SELECT }
    );

    if (!targets.length) {
      console.log('- 대상 0건 — no-op');
      console.log('✓ done');
      process.exit(0);
    }

    targets.forEach((t) => console.log(`  rid${t.id} ${String(t.name).slice(0, 34)} ← ${t.parent_name} (is_test=${t.is_test})`));
    await sequelize.query('UPDATE restaurants SET is_demo = 1 WHERE id IN (:ids)', {
      replacements: { ids: targets.map((t) => t.id) }
    });
    console.log(`- 데모 라벨 부여 ${targets.length}건 (되돌리려면 같은 id 에 is_demo=0)`);
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
