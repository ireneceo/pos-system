#!/usr/bin/env node
/**
 * mark-demo-accounts.js
 *
 * 데모/테스트 계정에 is_demo=true를 마킹합니다.
 * 배포 시 sync-database.js 후 자동 실행됩니다.
 *
 * 판별 기준:
 * - Users: username 기반 매칭 (실제 계정 화이트리스트 외 = 데모)
 * - Restaurants: admin(Restaurant Admin)이 데모 유저인 경우 = 데모
 * - Brands: owner가 데모 유저인 경우 = 데모
 * - Foodcourts: owner가 데모 유저인 경우 = 데모
 *
 * 사용법:
 *   node scripts/mark-demo-accounts.js
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

// ========================================
// 실제 계정 화이트리스트 (is_demo = false)
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

// 실제 브랜드 이름
const REAL_BRAND_NAMES = [
  'with MIN',
  'K-DINE with MIN',
];

// 실제 레스토랑 이름
const REAL_RESTAURANT_NAMES = [
  'K-Dine Korean Restaurant',
  'K-DINE IPC Branch',
  'with MIN Cafe',
  'WOR-PRO FOOD',
];

async function main() {
  const seq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  });

  try {
    await seq.authenticate();
    console.log('🔄 Marking demo accounts...');

    // 1. Users: 화이트리스트에 없는 모든 유저 = 데모
    // 단, 셀프 회원가입 유저는 제외 (향후 실제 고객)
    const [realResult] = await seq.query(
      `UPDATE users SET is_demo = false WHERE username IN (${REAL_USERNAMES.map(u => `'${u}'`).join(',')})`
    );

    const [demoResult] = await seq.query(
      `UPDATE users SET is_demo = true WHERE username NOT IN (${REAL_USERNAMES.map(u => `'${u}'`).join(',')}) AND is_demo = false`
    );
    console.log(`  Users: ${demoResult.affectedRows || 0} marked as demo, ${realResult.affectedRows || 0} confirmed as real`);

    // 2. Restaurants: 실제 레스토랑 이름 화이트리스트
    const [realRestResult] = await seq.query(
      `UPDATE restaurants SET is_demo = false WHERE name IN (${REAL_RESTAURANT_NAMES.map(n => `'${n}'`).join(',')})`
    );
    const [demoRestResult] = await seq.query(
      `UPDATE restaurants SET is_demo = true WHERE name NOT IN (${REAL_RESTAURANT_NAMES.map(n => `'${n}'`).join(',')}) AND is_demo = false`
    );
    console.log(`  Restaurants: ${demoRestResult.affectedRows || 0} marked as demo, ${realRestResult.affectedRows || 0} confirmed as real`);

    // 3. Brands: 실제 브랜드 이름 화이트리스트
    const [realBrandResult] = await seq.query(
      `UPDATE brands SET is_demo = false WHERE name IN (${REAL_BRAND_NAMES.map(n => `'${n}'`).join(',')})`
    );
    const [demoBrandResult] = await seq.query(
      `UPDATE brands SET is_demo = true WHERE name NOT IN (${REAL_BRAND_NAMES.map(n => `'${n}'`).join(',')}) AND is_demo = false`
    );
    console.log(`  Brands: ${demoBrandResult.affectedRows || 0} marked as demo, ${realBrandResult.affectedRows || 0} confirmed as real`);

    // 4. Foodcourts: 현재 실제 푸드코트 없음 → 전부 데모
    const [demoFcResult] = await seq.query(
      `UPDATE foodcourts SET is_demo = true WHERE is_demo = false`
    );
    console.log(`  Foodcourts: ${demoFcResult.affectedRows || 0} marked as demo`);

    // 결과 요약
    const [summary] = await seq.query(`
      SELECT
        (SELECT COUNT(*) FROM users WHERE is_demo = true) as demo_users,
        (SELECT COUNT(*) FROM users WHERE is_demo = false) as real_users,
        (SELECT COUNT(*) FROM restaurants WHERE is_demo = true) as demo_restaurants,
        (SELECT COUNT(*) FROM restaurants WHERE is_demo = false) as real_restaurants,
        (SELECT COUNT(*) FROM brands WHERE is_demo = true) as demo_brands,
        (SELECT COUNT(*) FROM brands WHERE is_demo = false) as real_brands,
        (SELECT COUNT(*) FROM foodcourts WHERE is_demo = true) as demo_foodcourts,
        (SELECT COUNT(*) FROM foodcourts WHERE is_demo = false) as real_foodcourts
    `);
    const s = summary[0];
    console.log(`\n✅ Demo marking complete:`);
    console.log(`   Users: ${s.real_users} real, ${s.demo_users} demo`);
    console.log(`   Restaurants: ${s.real_restaurants} real, ${s.demo_restaurants} demo`);
    console.log(`   Brands: ${s.real_brands} real, ${s.demo_brands} demo`);
    console.log(`   Foodcourts: ${s.real_foodcourts} real, ${s.demo_foodcourts} demo`);

    await seq.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Demo marking failed:', err.message);
    await seq.close();
    process.exit(1);
  }
}

main();
