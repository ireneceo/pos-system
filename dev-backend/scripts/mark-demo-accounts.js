#!/usr/bin/env node
/**
 * mark-demo-accounts.js
 *
 * 계정 분류: REAL / DEMO / TEST
 * - REAL: 실제 고객 (is_demo=false, is_test=false)
 * - DEMO: DemoPage 전용 계정 (is_demo=true, is_test=false) — 매일 리셋, 구독탭 숨김
 * - TEST: 테스트 계정 (is_demo=false, is_test=true) — 통계 제외, 구독탭 보임
 *
 * 배포 시 sync-database.js 후 자동 실행됩니다.
 *
 * 사용법:
 *   node scripts/mark-demo-accounts.js
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

// ========================================
// 실제 계정 화이트리스트 (is_demo=false, is_test=false)
// 새 실제 고객이 추가되면 여기에 추가할 것
// ========================================
const REAL_USERNAMES = [
  'systemadmin',       // System Admin (Irene)
  'gitconsulting',     // Brand General (GIT Consulting)
  // kdine_admin / kdine_staff는 demo-login (test_restaurant_admin / test_staff) 용으로 사용되므로
  // REAL 에서 제외. is_test=true 유지되어야 demo-login 가드 통과 (services/authService.loginAsDemo).
  // Login 카드 라벨 "300+ orders for testing" 참조.
  'kdineipc1',         // Restaurant Admin (K-DINE IPC Branch)
  'withmin1',          // Restaurant Admin (with MIN Cafe)
  'Moon',              // Staff (K-DINE IPC Branch)
  'worpro',            // Restaurant Admin (WOR-PRO FOOD)
];

// 데모 계정 (DemoPage 전용, is_demo=true)
const DEMO_USERNAMES = [
  'demo-brand',        // Brand General Demo
  'demo-restaurant',   // Restaurant Admin Demo
];

// ========================================
// 실브랜드·실매장 판정 = DB 컬럼 `is_real_customer` (2026-08-31, Fable 판정 T1-a v2)
// ========================================
// 예전엔 여기에 REAL_BRAND_NAMES / REAL_RESTAURANT_NAMES / REAL_RESTAURANT_IDS 를
// **하드코딩**했다. 그게 이 계열 사고의 병인이다 — 목록에 없는 실고객은 매 배포마다
// test 로 재마킹돼 알림·공지에서 조용히 빠졌다(2026-06-28 thefire 매장 / 2026-08-31 브랜드 축).
//
// 🔴 이 스크립트는 `is_real_customer` 를 **읽기만 하고 절대 쓰지 않는다.** 그것이 지속성의 근거다.
//    자기가 쓰는 플래그(is_demo/is_test)를 판정 근거로 삼으면 자기 근거를 스스로 지운다 —
//    실제로 그렇게 만들었다가 "1회차는 유지, 2회차에 다시 뒤집힘"을 리허설에서 관측했다.
//    → 새 실고객이 생기면 **DB 에서 is_real_customer 를 1 로 세우면 되고, 이 파일은 고치지 않는다.**
//
// deny-by-default(목록 밖은 test) 정책 자체는 유지한다 — 뒤집으면 정크 계정에 실메일이 나가는
// 역방향 사고라 이 방향이 안전하다. 바뀐 것은 정책이 아니라 화이트리스트의 **저장 위치**다.
// 시드·컬럼 = scripts/migrate-real-customer-flag.js (registry deploy 분류, mark 보다 먼저 실행됨).
const REAL_BRANDS_SQL = `SELECT id FROM brands WHERE is_real_customer = 1`;
const REAL_RESTAURANTS_SQL = `SELECT id FROM restaurants WHERE is_real_customer = 1`;

async function main() {
  const seq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  });

  try {
    await seq.authenticate();
    console.log('🔄 Marking demo/test accounts...');

    const realList = REAL_USERNAMES.map(u => `'${u}'`).join(',');
    const demoList = DEMO_USERNAMES.map(u => `'${u}'`).join(',');

    // 실고객 판정은 DB 컬럼에서 읽는다(하드코딩 목록 대체). 이 스크립트는 이 컬럼을 쓰지 않는다.
    // 컬럼이 아직 없는 DB(마이그 미실행)에서도 죽지 않도록 존재를 먼저 확인한다 —
    // 없으면 빈 집합으로 취급해 **예전과 동일한 동작**으로 안전하게 떨어진다(배포는 마이그가 먼저라 정상 경로는 아님).
    const [colRows] = await seq.query(
      `SELECT table_name AS t FROM information_schema.columns
       WHERE table_schema = DATABASE() AND column_name = 'is_real_customer' AND table_name IN ('brands','restaurants')`
    );
    const haveBrandCol = colRows.some(r => (r.t || r.TABLE_NAME) === 'brands');
    const haveRestCol = colRows.some(r => (r.t || r.TABLE_NAME) === 'restaurants');
    if (!haveBrandCol || !haveRestCol) {
      console.warn('  ⚠ is_real_customer 컬럼 없음 — migrate-real-customer-flag.js 미실행. 실고객 보호 없이 진행합니다.');
    }
    // NOT IN (빈 집합) = TRUE 이므로 컬럼 부재 시에도 SQL 이 성립한다. 매칭 방지용으로 0 을 넣는다.
    const realBrandIdsSql = haveBrandCol ? REAL_BRANDS_SQL : 'SELECT 0';
    const realRestIdsSql = haveRestCol ? REAL_RESTAURANTS_SQL : 'SELECT 0';
    // 🔴 MySQL 은 UPDATE 의 대상 테이블을 그 문장의 서브쿼리에서 직접 참조하지 못한다
    //    ("You can't specify target table 'X' for update in FROM clause").
    //    brands·restaurants 절은 자기 테이블을 읽으므로 **파생 테이블로 한 겹 감싸야** 한다.
    //    (users 절은 대상이 users 라 brands/restaurants 서브쿼리를 그냥 써도 된다.)
    //    2026-08-31 리허설 ⑤번 기준이 이 결함을 잡았다 — 감싸지 않은 판이 restaurants 절에서
    //    통째로 죽어 brands·restaurants·foodcourts 분류가 전부 실행되지 않았다.
    const derived = (sql, alias) => `SELECT id FROM (${sql}) AS ${alias}`;
    const realBrandIdsDerived = derived(realBrandIdsSql, '_rb');
    const realRestIdsDerived = derived(realRestIdsSql, '_rr');

    // 1. Users
    // REAL accounts — username 화이트리스트 OR 실매장 소속 직원 OR **실브랜드 운영자**
    //
    // 2026-08-31 Irene: "배포할 때 운영서버가 알아서 해?"
    //   그때까지 두 축이 **비대칭**이었다 — 매장 축은 여기(REAL 절)에 있어 이미 찍힌 is_test 를
    //   배포 때 자동으로 풀어 줬는데(실증: 오늘 배포에서 K-DINE IPC 직원 r8:Wai·r8:James 가 저절로 복구),
    //   브랜드 축은 아래 TEST 절의 **제외 조건에만** 있어서 "새로 안 찍는다"까지였고
    //   **이미 찍힌 것을 푸는 경로가 없었다.** 그래서 K-DINE Brand·thefire 는 사람이 손으로 고쳐야 했다.
    //   → 두 축을 대칭으로 맞춘다. 이제 배포가 알아서 복구한다(수동 DB 쓰기 불필요).
    //
    // 안전 근거: 판정 기준이 `is_real_customer` 뿐이고 **이 스크립트는 그 컬럼을 절대 쓰지 않는다**.
    //   값은 마이그레이션(migrate-real-customer-flag.js)의 큐레이트된 시드로만 세워진다 —
    //   즉 폭발 반경 = "사람이 실고객이라고 명시한 브랜드에 배정되었거나 그 브랜드를 소유한 계정"뿐이고,
    //   이미 자동 복구되고 있는 매장 축과 **신뢰 근거가 동일**하다.
    // ⛔ 그래서 여기에 "test 인 것을 전부 real 로" 같은 넓은 복원은 절대 넣지 않는다 —
    //    그건 진짜 시험 계정에 실메일이 나가는 역방향 사고다.
    const realBrandMemberSql = haveBrandCol
      ? `(brand_id IS NOT NULL AND brand_id IN (${REAL_BRANDS_SQL}))
         OR id IN (SELECT owner_id FROM brands WHERE owner_id IS NOT NULL AND is_real_customer = 1)`
      : '0';
    await seq.query(`UPDATE users SET is_demo = false, is_test = false
      WHERE username IN (${realList})
         OR restaurant_id IN (${realRestIdsSql})
         OR (${realBrandMemberSql})`);
    // DEMO accounts
    await seq.query(`UPDATE users SET is_demo = true, is_test = false WHERE username IN (${demoList})`);
    // 브랜드 축 제외 조건 (2026-08-31 신설) — 실브랜드를 운영하는 사람을 test 로 뒤집지 않는다.
    //
    // 근본 원인: 이 절의 제외 축이 username 목록과 restaurant_id(실매장 ID) **둘뿐**이었다.
    // 브랜드 운영자는 매장에 소속되지 않아 restaurant_id 가 NULL 이므로, username 이 목록에
    // 없으면 **매 배포마다** is_test=true 로 재마킹됐다. 알림 관문(notificationService 1-a2)이
    // is_test 를 보므로 실주소를 가진 브랜드 운영자가 조용히 알림에서 빠진다.
    // 실측(2026-08-31 dev): user 11 `K-DINE Brand`(irene@gitconsulting.group, 실주소) is_test=1 /
    //                       user 6 `brand_general`(실브랜드 `with MIN` 소유) is_test=1.
    // :44-48 주석의 thefire 공지 미수신 사고와 같은 계열 — 그때는 매장 축만 막고 브랜드 축을 열어뒀다.
    //
    // ⛔ username·id 를 새로 하드코딩하지 않는다. 하드코딩 목록이 이 계열 사고의 병인이다.
    // 축은 둘 — ① users.brand_id 가 실브랜드를 가리킴(배정된 담당자) ② 실브랜드의 owner_id(소유자).
    //    ②가 따로 필요한 이유: 소유자가 brand_id 를 안 갖는 경우가 실재한다(dev brand 33 소유자 = brand_id NULL).
    // 🔴 판정 근거가 `is_real_customer`(이 스크립트가 안 쓰는 컬럼)이므로 **절 실행 순서와 무관**하다.
    //    is_demo/is_test 를 근거로 삼았던 1차 시도는 아래 brands 절이 그 근거를 지워 2회차에 깨졌다.
    const realBrandOwnersSql = haveBrandCol
      ? `SELECT owner_id FROM brands WHERE owner_id IS NOT NULL AND is_real_customer = 1`
      : 'SELECT 0';
    const realBrandExclusion = `
      AND (brand_id IS NULL OR brand_id NOT IN (${realBrandIdsSql}))
      AND id NOT IN (${realBrandOwnersSql})`;

    // TEST accounts (not REAL and not DEMO) — 실매장 소속 직원·실브랜드 운영자는 제외(restaurant_id NULL 은 영향 없음)
    await seq.query(`UPDATE users SET is_demo = false, is_test = true WHERE username NOT IN (${realList},${demoList}) AND (restaurant_id IS NULL OR restaurant_id NOT IN (${realRestIdsSql}))${realBrandExclusion} AND is_demo = false AND is_test = false`);
    // Also fix any that were wrongly marked as demo but should be test
    await seq.query(`UPDATE users SET is_demo = false, is_test = true WHERE username NOT IN (${realList},${demoList}) AND (restaurant_id IS NULL OR restaurant_id NOT IN (${realRestIdsSql}))${realBrandExclusion} AND is_demo = true`);

    const [userCounts] = await seq.query(`
      SELECT
        SUM(CASE WHEN is_demo = false AND is_test = false THEN 1 ELSE 0 END) as real_count,
        SUM(CASE WHEN is_demo = true THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN is_test = true THEN 1 ELSE 0 END) as test_count
      FROM users
    `);
    console.log(`  Users: ${userCounts[0].real_count} real, ${userCounts[0].demo_count} demo, ${userCounts[0].test_count} test`);

    // 2. Restaurants — 실고객 판정은 is_real_customer 컬럼(이 스크립트가 안 쓰는 자리)
    await seq.query(`UPDATE restaurants SET is_demo = false, is_test = false WHERE id IN (${realRestIdsDerived})`);
    // Demo restaurants: owned by demo users (실고객 매장은 제외 — 데모 소유자가 잘못 걸려도 실매장을 데모로 만들지 않는다)
    await seq.query(`UPDATE restaurants SET is_demo = true, is_test = false WHERE admin_id IN (SELECT id FROM users WHERE is_demo = true) AND id NOT IN (${realRestIdsDerived})`);
    // Test restaurants: 실고객 아님 and not demo
    await seq.query(`UPDATE restaurants SET is_test = true WHERE id NOT IN (${realRestIdsDerived}) AND is_demo = false AND is_test = false`);

    const [restCounts] = await seq.query(`
      SELECT
        SUM(CASE WHEN is_demo = false AND is_test = false THEN 1 ELSE 0 END) as real_count,
        SUM(CASE WHEN is_demo = true THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN is_test = true THEN 1 ELSE 0 END) as test_count
      FROM restaurants
    `);
    console.log(`  Restaurants: ${restCounts[0].real_count} real, ${restCounts[0].demo_count} demo, ${restCounts[0].test_count} test`);

    // 3. Brands — 실고객 판정은 is_real_customer 컬럼
    await seq.query(`UPDATE brands SET is_demo = false, is_test = false WHERE id IN (${realBrandIdsDerived})`);
    await seq.query(`UPDATE brands SET is_demo = true, is_test = false WHERE owner_id IN (SELECT id FROM users WHERE is_demo = true) AND id NOT IN (${realBrandIdsDerived})`);
    await seq.query(`UPDATE brands SET is_test = true WHERE id NOT IN (${realBrandIdsDerived}) AND is_demo = false AND is_test = false`);

    const [brandCounts] = await seq.query(`
      SELECT
        SUM(CASE WHEN is_demo = false AND is_test = false THEN 1 ELSE 0 END) as real_count,
        SUM(CASE WHEN is_demo = true THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN is_test = true THEN 1 ELSE 0 END) as test_count
      FROM brands
    `);
    console.log(`  Brands: ${brandCounts[0].real_count} real, ${brandCounts[0].demo_count} demo, ${brandCounts[0].test_count} test`);

    // 4. Foodcourts: 현재 실제 푸드코트 없음
    await seq.query(`UPDATE foodcourts SET is_demo = true, is_test = false WHERE owner_id IN (SELECT id FROM users WHERE is_demo = true)`);
    await seq.query(`UPDATE foodcourts SET is_test = true WHERE is_demo = false AND is_test = false`);

    const [fcCounts] = await seq.query(`
      SELECT
        SUM(CASE WHEN is_demo = false AND is_test = false THEN 1 ELSE 0 END) as real_count,
        SUM(CASE WHEN is_demo = true THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN is_test = true THEN 1 ELSE 0 END) as test_count
      FROM foodcourts
    `);
    console.log(`  Foodcourts: ${fcCounts[0].real_count || 0} real, ${fcCounts[0].demo_count || 0} demo, ${fcCounts[0].test_count || 0} test`);

    console.log('\n✓ Demo marking complete');
    await seq.close();
    process.exit(0);
  } catch (err) {
    console.error('✗ Demo marking failed:', err.message);
    await seq.close();
    process.exit(1);
  }
}

main();
