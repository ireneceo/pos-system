#!/usr/bin/env node
/**
 * Migration — 요금제 «발주 전용 (무료)» 1줄 추가 (2026-09-12 · docs/BUYER_FREE_TIER_DESIGN.md).
 *
 * 왜: 우리 POS 를 안 쓰는 매장도 **무료로 가입해 발주만** 하게 하고, 재고·원가·레시피가 자동으로
 * 맞물리는 것을 보여 유료 매장으로 전환시킨다(Irene 2026-09-12). 발주·공급업체 라우트에는
 * 요금제 문(`requireModule`)이 없어 이 등급에서도 그대로 열리고, 재고·레시피·상품은 문이 이미
 * 지키므로 **모듈 목록에서 빼는 것만으로 닫힌다** — 새 차단 코드 0.
 *
 * - 멱등: `name='buyer_free'` 가 이미 있으면 모듈 목록만 최신으로 맞추고 끝낸다.
 * - 행 데이터 무접촉(기존 요금제·구독 건드리지 않음). process.exit 필수(메모리 reference_deploy_migration_must_exit).
 * - 한도 없음(Irene: 「한도를 왜 줘. 결제 많이 하게 해야지」) → limit 계열은 NULL.
 *
 * 사용: node scripts/migrate-buyer-free-plan.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

// 발주 전후로 이어지는 것만. 재고·레시피·POS·리포트는 넣지 않는다(들어가면 전환 유인이 사라진다).
const MODULES = [
  'dashboard',
  'notices',
  'buyer_supplier_directory',
  'buyer_supplier_contracts',
  'buyer_purchase_orders',
  'buyer_purchase_invoices'
];

(async () => {
  try {
    const [rows] = await sequelize.query(
      "SELECT id, included_modules FROM plan_templates WHERE name = 'buyer_free' LIMIT 1"
    );
    const modulesJson = JSON.stringify(MODULES);

    // 한도 «없음» 은 이 프로젝트에서 **-1**(무제한)이다 — NULL 은 NOT NULL 제약에 걸린다.
    //   선례: owner_* · enterprise 요금제가 order_limit/menu_item_limit/staff_limit = -1.
    //   restaurant_limit 만 1 — 매장 1곳 = 가입 1건(Irene 2026-09-12, §6-1).
    const LIMITS = 'order_limit = -1, menu_item_limit = -1, staff_limit = -1, restaurant_limit = 1, manager_limit = -1';

    if (rows.length) {
      await sequelize.query(
        `UPDATE plan_templates SET included_modules = :m, display_name = :d,
           base_price_monthly = 0, base_price_annual = 0, is_active = 1, ${LIMITS} WHERE id = :id`,
        { replacements: { m: modulesJson, d: 'Ordering (Free)', id: rows[0].id } }
      );
      console.log(`  ✓ buyer_free 이미 있음 → 모듈 ${MODULES.length}개·한도 무제한으로 맞춤 (id ${rows[0].id})`);
    } else {
      // sort_order 는 목록 맨 위(무료가 먼저 보여야 고른다). 같은 값이 있어도 순서만 겹칠 뿐 문제 없다.
      await sequelize.query(
        `INSERT INTO plan_templates
           (name, display_name, base_price_monthly, base_price_annual, category, plan_target,
            features, included_modules, is_active, sort_order,
            order_limit, menu_item_limit, staff_limit, restaurant_limit, manager_limit,
            createdAt, updatedAt)
         VALUES ('buyer_free', 'Ordering (Free)', 0, 0, 'basic', 'restaurant',
            '[]', :m, 1, 0,
            -1, -1, -1, 1, -1,
            NOW(), NOW())`,
        { replacements: { m: modulesJson } }
      );
      console.log(`  ✓ buyer_free 추가 (모듈 ${MODULES.length}개 · 0원 · 한도 무제한 · 매장 1곳)`);
    }
    process.exit(0);
  } catch (err) {
    console.error('✗ migrate-buyer-free-plan 실패:', err.message);
    process.exit(1);
  }
})();
