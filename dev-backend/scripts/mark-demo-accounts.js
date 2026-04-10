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
  'kdine_admin',       // Restaurant Admin (K-Dine Korean Restaurant)
  'kdine_staff',       // Staff (K-Dine)
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

// 실제 브랜드/레스토랑 이름
const REAL_BRAND_NAMES = ['with MIN', 'K-DINE with MIN'];
const REAL_RESTAURANT_NAMES = ['K-Dine Korean Restaurant', 'K-DINE IPC Branch', 'with MIN Cafe', 'WOR-PRO FOOD'];

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

    // 1. Users
    // REAL accounts
    await seq.query(`UPDATE users SET is_demo = false, is_test = false WHERE username IN (${realList})`);
    // DEMO accounts
    await seq.query(`UPDATE users SET is_demo = true, is_test = false WHERE username IN (${demoList})`);
    // TEST accounts (not REAL and not DEMO)
    await seq.query(`UPDATE users SET is_demo = false, is_test = true WHERE username NOT IN (${realList},${demoList}) AND is_demo = false AND is_test = false`);
    // Also fix any that were wrongly marked as demo but should be test
    await seq.query(`UPDATE users SET is_demo = false, is_test = true WHERE username NOT IN (${realList},${demoList}) AND is_demo = true`);

    const [userCounts] = await seq.query(`
      SELECT
        SUM(CASE WHEN is_demo = false AND is_test = false THEN 1 ELSE 0 END) as real_count,
        SUM(CASE WHEN is_demo = true THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN is_test = true THEN 1 ELSE 0 END) as test_count
      FROM users
    `);
    console.log(`  Users: ${userCounts[0].real_count} real, ${userCounts[0].demo_count} demo, ${userCounts[0].test_count} test`);

    // 2. Restaurants
    const realRestList = REAL_RESTAURANT_NAMES.map(n => `'${n}'`).join(',');
    await seq.query(`UPDATE restaurants SET is_demo = false, is_test = false WHERE name IN (${realRestList})`);
    // Demo restaurants: owned by demo users
    await seq.query(`UPDATE restaurants SET is_demo = true, is_test = false WHERE admin_id IN (SELECT id FROM users WHERE is_demo = true)`);
    // Test restaurants: not real and not demo
    await seq.query(`UPDATE restaurants SET is_test = true WHERE name NOT IN (${realRestList}) AND is_demo = false AND is_test = false`);

    const [restCounts] = await seq.query(`
      SELECT
        SUM(CASE WHEN is_demo = false AND is_test = false THEN 1 ELSE 0 END) as real_count,
        SUM(CASE WHEN is_demo = true THEN 1 ELSE 0 END) as demo_count,
        SUM(CASE WHEN is_test = true THEN 1 ELSE 0 END) as test_count
      FROM restaurants
    `);
    console.log(`  Restaurants: ${restCounts[0].real_count} real, ${restCounts[0].demo_count} demo, ${restCounts[0].test_count} test`);

    // 3. Brands
    const realBrandList = REAL_BRAND_NAMES.map(n => `'${n}'`).join(',');
    await seq.query(`UPDATE brands SET is_demo = false, is_test = false WHERE name IN (${realBrandList})`);
    await seq.query(`UPDATE brands SET is_demo = true, is_test = false WHERE owner_id IN (SELECT id FROM users WHERE is_demo = true)`);
    await seq.query(`UPDATE brands SET is_test = true WHERE name NOT IN (${realBrandList}) AND is_demo = false AND is_test = false`);

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
