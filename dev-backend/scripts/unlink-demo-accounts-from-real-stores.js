#!/usr/bin/env node
'use strict';
/**
 * 데모/테스트 계정에 남아 있는 **실매장(is_demo=0) 부여를 끊는다.**
 *
 * ── 왜 ────────────────────────────────────────────────────────────────────
 * 공개 quick-login 카드가 실매장 권한을 열어 주던 사고의 뿌리는 가드가 아니라 **데이터**다:
 * 데모 계정에 실매장 oversight/브랜드 소속이 남아 있으면, 가드를 아무리 조여도
 * "그 계정으로는 못 들어간다"가 될 뿐 부여 자체는 계속 살아 있다.
 * 가드를 느슨하게 푸는 대신 링크를 끊는다.
 *
 * 끊는 것: ①데모 계정의 `restaurant_managers` 행 중 대상이 실매장인 것
 *          ②데모 브랜드/푸드코트 산하에 들어가 있는 실매장의 소속(brand_id/foodcourt_id → NULL)
 * 건드리지 않는 것: 매장 자체(주문·설정·상태), 데모 매장 부여, 실계정의 부여.
 *
 * dry-run 이 기본. 표를 확인한 뒤 --apply. 롤백용 이전값을 파일로 남긴다.
 *
 * Usage:
 *   node scripts/unlink-demo-accounts-from-real-stores.js
 *   node scripts/unlink-demo-accounts-from-real-stores.js --apply           # 관리행만 끊음(안전)
 *   node scripts/unlink-demo-accounts-from-real-stores.js --apply --apply-detach  # 브랜드/푸드코트 소속까지(파괴적)
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const { DEMO_KEY_TO_EMAIL } = require('../services/authService');

const APPLY = process.argv.includes('--apply');
// 브랜드/푸드코트 소속 해제는 **매장 쪽을 건드리는 파괴적 변경**이라 별도 플래그다.
// 실측(dev): 이 범주에 주문 790건짜리 실매장(rid5)이 들어온다 — 소속을 끊으면 그 매장의
// 브랜드 메뉴·정산 연결이 끊긴다. 데모 계정의 접근을 끊자고 남의 매장을 부수면 안 된다.
const APPLY_DETACH = process.argv.includes('--apply-detach');
const q = (sql, r) => sequelize.query(sql, { replacements: r || {}, type: sequelize.QueryTypes.SELECT });

(async () => {
  try {
    const emails = Object.values(DEMO_KEY_TO_EMAIL).map((e) => e.toLowerCase());
    const users = await q(
      'SELECT id, email, brand_id, foodcourt_id FROM users WHERE LOWER(email) IN (:emails)',
      { emails }
    );
    const ids = users.map((u) => u.id);
    if (!ids.length) { console.log('- 대상 계정 없음'); process.exit(0); }

    // ① 실매장을 가리키는 restaurant_managers 행
    const rmRows = await q(
      `SELECT rm.id, rm.manager_id, rm.restaurant_id, rm.relationship_type, r.name, r.is_demo,
              (SELECT COUNT(*) FROM orders o WHERE o.restaurant_id = r.id) orders
         FROM restaurant_managers rm JOIN restaurants r ON r.id = rm.restaurant_id
        WHERE rm.manager_id IN (:ids) AND (r.is_demo = 0 OR r.is_demo IS NULL)`,
      { ids }
    );

    // ② 데모 계정이 소유한 브랜드/푸드코트 산하의 실매장
    const brandRows = await q(
      `SELECT r.id, r.name, r.brand_id, b.name brand_name,
              (SELECT COUNT(*) FROM orders o WHERE o.restaurant_id = r.id) orders
         FROM restaurants r JOIN brands b ON b.id = r.brand_id
        WHERE b.owner_id IN (:ids) AND (r.is_demo = 0 OR r.is_demo IS NULL)`,
      { ids }
    );
    const fcRows = await q(
      `SELECT r.id, r.name, r.foodcourt_id, f.name fc_name,
              (SELECT COUNT(*) FROM orders o WHERE o.restaurant_id = r.id) orders
         FROM restaurants r JOIN foodcourts f ON f.id = r.foodcourt_id
        WHERE f.owner_id IN (:ids) AND (r.is_demo = 0 OR r.is_demo IS NULL)`,
      { ids }
    );

    console.log(`데모/테스트 계정 ${users.length}개 검사`);
    console.log(`  ① 실매장 관리행(restaurant_managers) : ${rmRows.length}`);
    rmRows.forEach((r) => console.log(`     rm#${r.id} user${r.manager_id} → rid${r.restaurant_id} ${String(r.name).slice(0, 30)} (${r.relationship_type}, orders=${r.orders})`));
    console.log(`  ② 데모 브랜드 산하 실매장            : ${brandRows.length}`);
    brandRows.forEach((r) => console.log(`     rid${r.id} ${String(r.name).slice(0, 30)} ← brand#${r.brand_id} ${r.brand_name} (orders=${r.orders})`));
    console.log(`  ③ 데모 푸드코트 산하 실매장          : ${fcRows.length}`);
    fcRows.forEach((r) => console.log(`     rid${r.id} ${String(r.name).slice(0, 30)} ← foodcourt#${r.foodcourt_id} ${r.fc_name} (orders=${r.orders})`));

    if (!APPLY) {
      console.log('\n- dry-run: 아무것도 바꾸지 않았습니다. --apply 로 적용하세요.');
      process.exit(0);
    }

    const rollback = { at: new Date().toISOString(), rm: rmRows, brand: brandRows, foodcourt: fcRows };
    const out = path.join(__dirname, '..', `unlink-demo-rollback-${Date.now()}.json`);
    fs.writeFileSync(out, JSON.stringify(rollback, null, 1));

    if (rmRows.length) {
      await sequelize.query('DELETE FROM restaurant_managers WHERE id IN (:ids)', { replacements: { ids: rmRows.map((r) => r.id) } });
    }
    if (!APPLY_DETACH) {
      console.log(`\n- 관리행 ${rmRows.length}건만 끊었습니다.`);
      console.log(`- 브랜드소속 ${brandRows.length}건 / 푸드코트소속 ${fcRows.length}건은 **건드리지 않았습니다**`);
      console.log('  (매장 쪽을 바꾸는 파괴적 변경 — 필요하면 --apply-detach 로 별도 결정)');
      console.log(`- 롤백값: ${out}`);
      console.log('✓ done');
      process.exit(0);
    }
    // 소속 해제는 **주문이 0건인 매장에만**. 주문이 있으면 그건 영업한 실매장이고,
    // 브랜드 소속을 끊으면 그 매장의 브랜드 메뉴·정산 연결이 끊긴다. 데모 계정 접근을
    // 끊자고 남의 매장을 부수지 않는다 — 그런 매장은 사람이 따로 판단한다.
    const brandDetach = brandRows.filter((r) => Number(r.orders) === 0);
    const fcDetach = fcRows.filter((r) => Number(r.orders) === 0);
    const skipped = [...brandRows, ...fcRows].filter((r) => Number(r.orders) > 0);
    if (brandDetach.length) {
      await sequelize.query('UPDATE restaurants SET brand_id = NULL WHERE id IN (:ids)', { replacements: { ids: brandDetach.map((r) => r.id) } });
    }
    if (fcDetach.length) {
      await sequelize.query('UPDATE restaurants SET foodcourt_id = NULL WHERE id IN (:ids)', { replacements: { ids: fcDetach.map((r) => r.id) } });
    }
    console.log(`\n- 끊음: 관리행 ${rmRows.length} / 브랜드소속 ${brandDetach.length} / 푸드코트소속 ${fcDetach.length}`);
    if (skipped.length) {
      console.log(`- 주문 있는 매장 ${skipped.length}건은 **손대지 않았습니다** (사람 판단 필요):`);
      skipped.forEach((r) => console.log(`     rid${r.id} ${String(r.name).slice(0, 30)} orders=${r.orders}`));
    }
    console.log(`- 롤백값: ${out}`);
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
