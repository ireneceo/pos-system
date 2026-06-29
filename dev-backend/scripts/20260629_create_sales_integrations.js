/**
 * 2026-06-29: restaurant_sales_integrations 테이블 생성 (입점몰 매출보고 API 연동).
 * 신규 테이블. 멱등(테이블 존재 시 skip). 운영은 sync --alter 안 돎 → 전용 마이그(배포 목록 등록).
 * process.exit() 필수 (sequelize 핸들 잔류로 배포 정지 방지 — reference_deploy_migration_must_exit).
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const RestaurantSalesIntegration = require('../models/RestaurantSalesIntegration');

async function tableExists(table) {
  const r = await sequelize.query(
    `SELECT 1 x FROM information_schema.tables WHERE table_schema=DATABASE() AND table_name=:table`,
    { type: QueryTypes.SELECT, replacements: { table } });
  return r.length > 0;
}

(async () => {
  try {
    if (await tableExists('restaurant_sales_integrations')) {
      console.log('[migrate-sales-integrations] restaurant_sales_integrations 이미 존재 — skip');
    } else {
      // 모델 정의로 테이블 생성 (sync --alter 아님: 신규 테이블만 create).
      await RestaurantSalesIntegration.sync();
      console.log('[migrate-sales-integrations] restaurant_sales_integrations 생성 완료');
    }
    process.exit(0);
  } catch (e) {
    console.error('[migrate-sales-integrations] ERROR', e.message);
    process.exit(1);
  }
})();
