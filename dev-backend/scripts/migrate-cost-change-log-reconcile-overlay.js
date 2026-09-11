#!/usr/bin/env node
/**
 * Migration — `cost_change_logs.source` 에 'reconcile_overlay' 를 더한다 (2026-09-11 · docs/PURCHASE_ORDER_SYSTEM.md §8-4 D-1).
 *
 * 대조 저장이 매장 원가행(restaurant_ingredient_costs)을 청구가로 덮을 때 그 변경을 원가 이력에 남긴다.
 * 이 값이 ENUM 에 없으면 `logCostChange` 의 INSERT 가 실패하고(원가 갱신은 유지하지만) 이력이 조용히 빠진다.
 *
 * - expand-only: 현재 정의를 읽어 **부족한 값만** 더한다(`expandEnum`). 목록 하드코딩 금지(메모리 reference_enum_expand_only).
 * - 멱등: 이미 있으면 아무것도 안 한다. 매 배포 재실행 안전 → registry `deploy`.
 * - 행 데이터 무접촉. process.exit 필수(메모리 reference_deploy_migration_must_exit).
 *
 * 사용: node scripts/migrate-cost-change-log-reconcile-overlay.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

(async () => {
  try {
    const r = await expandEnum(sequelize, 'cost_change_logs', 'source', ['reconcile_overlay']);
    console.log('[migrate-cost-change-log-reconcile-overlay] 완료:', JSON.stringify(r));
    process.exit(0);
  } catch (e) {
    console.error('[migrate-cost-change-log-reconcile-overlay] 실패:', e.message);
    process.exit(1);
  }
})();
