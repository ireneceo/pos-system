#!/usr/bin/env node
'use strict';
/**
 * 개발서버 전용 — 상황판 «시험 계정으로 열기»(dev-login) 시험 계정 중 데모 5개에 없는 역할 3개를 만든다 (2026-10-11).
 *   브랜드 매니저 · 푸드코트 매니저 · 공급업체 직원 — 전부 데모 묶음(브랜드 10 · 푸드코트 44 · 매장 38 · 공급업체 20)에만 닿는다.
 * 멱등: 이미 있으면 소속·표시만 맞춘다. 비밀번호는 무작위(아무도 모름) — 들어가는 길은 dev-login 하나.
 * 메일 주소는 @example.com(실제 발송·반송 없음), email_verified=0.
 * 운영(NODE_ENV=production)에서는 실행하지 않는다. 마이그 레지스트리 대상 아님(개발 DB 시험 데이터).
 *
 *   node scripts/seed-dev-login-test-accounts.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env'), quiet: true });

if (process.env.NODE_ENV !== 'development') {
  console.error('개발서버(NODE_ENV=development)에서만 실행합니다.');
  process.exit(1);
}

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sequelize } = require('../db');
const { findReachableRealRestaurant } = require('../utils/demoReachableRestaurants');

const DEMO_BRAND_ID = 10;          // K-Taste Group (demo-brand 소유) — 매장 39
const DEMO_FOODCOURT_ID = 44;      // Demo Hawker Center (demo-foodcourt 소유) — 매장 38·39
const DEMO_BRANCH_RESTAURANT_ID = 38;
const DEMO_SUPPLIER_COMPANY_ID = 20; // Demo Supplier Co. (demo-supplier 소유)

const ACCOUNTS = [
  {
    email: 'test-brand-manager@example.com',
    username: 'test_brand_manager',
    full_name: 'Test Brand Manager',
    role: 'Brand Manager',
    cols: { brand_id: DEMO_BRAND_ID, brand_scope_all: 0 },
    permissions: ['dashboard', 'management', 'products', 'operations', 'reports', 'communication', 'plans_payments'],
    brandRows: [DEMO_BRAND_ID]
  },
  {
    email: 'test-foodcourt-manager@example.com',
    username: 'test_foodcourt_manager',
    full_name: 'Test Foodcourt Manager',
    role: 'Foodcourt Manager',
    cols: { foodcourt_id: DEMO_FOODCOURT_ID, branch_id: DEMO_BRANCH_RESTAURANT_ID },
    permissions: ['dashboard', 'management', 'operations', 'plans_payments', 'communication']
  },
  {
    email: 'test-supplier-staff@example.com',
    username: 'test_supplier_staff',
    full_name: 'Test Supplier Staff',
    role: 'Supplier Staff',
    cols: { supplier_company_id: DEMO_SUPPLIER_COMPANY_ID },
    permissions: []
  }
];

async function main() {
  const q = (sql, replacements) => sequelize.query(sql, { replacements, type: sequelize.QueryTypes.SELECT });
  // 소속 대상이 데모인지 먼저 확인 — 아니면 아무것도 만들지 않는다.
  const [brand] = await q('SELECT b.id, b.owner_id FROM brands b WHERE b.id = :id', { id: DEMO_BRAND_ID });
  const [fc] = await q('SELECT id FROM foodcourts WHERE id = :id', { id: DEMO_FOODCOURT_ID });
  const [branch] = await q('SELECT id, is_demo, foodcourt_id FROM restaurants WHERE id = :id', { id: DEMO_BRANCH_RESTAURANT_ID });
  const [sc] = await q('SELECT id FROM supplier_companies WHERE id = :id', { id: DEMO_SUPPLIER_COMPANY_ID });
  if (!brand || !fc || !branch || !sc || !branch.is_demo || Number(branch.foodcourt_id) !== DEMO_FOODCOURT_ID) {
    throw new Error('데모 소속(브랜드 10 · 푸드코트 44 · 매장 38 · 공급업체 20)이 예상과 다릅니다 — 중단');
  }

  for (const a of ACCOUNTS) {
    const t = await sequelize.transaction();
    try {
      const [existing] = await sequelize.query('SELECT id FROM users WHERE LOWER(email) = :e', {
        replacements: { e: a.email }, type: sequelize.QueryTypes.SELECT, transaction: t
      });
      const set = {
        role: a.role, full_name: a.full_name, is_test: 1, is_demo: 0, is_active: 1, email_verified: 0,
        permissions: JSON.stringify(a.permissions),
        restaurant_id: null, brand_id: null, foodcourt_id: null, branch_id: null, supplier_company_id: null,
        ...a.cols
      };
      let id;
      if (existing) {
        id = existing.id;
        const cols = Object.keys(set);
        await sequelize.query(`UPDATE users SET ${cols.map((c) => `${c} = :${c}`).join(', ')}, updatedAt = NOW() WHERE id = :id`, {
          replacements: { ...set, id }, transaction: t
        });
      } else {
        const password = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);
        const row = { ...set, email: a.email, username: a.username, password };
        const cols = Object.keys(row);
        const [insertId] = await sequelize.query(
          `INSERT INTO users (${cols.join(', ')}, createdAt, updatedAt) VALUES (${cols.map((c) => `:${c}`).join(', ')}, NOW(), NOW())`,
          { replacements: row, transaction: t }
        );
        id = insertId;
      }
      if (a.brandRows) {
        await sequelize.query('DELETE FROM brand_manager_brands WHERE user_id = :id', { replacements: { id }, transaction: t });
        for (const b of a.brandRows) {
          await sequelize.query('INSERT INTO brand_manager_brands (user_id, brand_id) VALUES (:id, :b)', { replacements: { id, b }, transaction: t });
        }
      }
      // 닿는 매장에 실매장이 있으면 되돌린다(로그인 가드와 같은 판정).
      const [u] = await sequelize.query('SELECT id, restaurant_id, brand_id, foodcourt_id FROM users WHERE id = :id', {
        replacements: { id }, type: sequelize.QueryTypes.SELECT, transaction: t
      });
      const real = await findReachableRealRestaurant({
        query: (sql, opts) => sequelize.query(sql, { ...opts, transaction: t }),
        QueryTypes: sequelize.QueryTypes
      }, u);
      if (real) throw new Error(`${a.email} 이 실매장 ${real.id} 에 닿음 — 되돌림`);
      await t.commit();
      console.log(`${existing ? '맞춤' : '만듦'} ${a.role.padEnd(18)} id=${id} ${a.email}`);
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e.message); process.exit(1); });
