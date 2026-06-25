/**
 * Migration (#11c 모바일 크로스셀): product_recommendations + brand_menu_recommendations 테이블 생성.
 * 설계: docs/MOBILE_ADDON_CROSS_SELL.md §2.1/2.3/2.4
 *
 * 안전:
 *   - Model.sync({alter:false}) = 없으면 CREATE, 있으면 무변경(기존 데이터 보존). 멱등.
 *   - 신규 테이블만. 기존 테이블/데이터 미수정. 인쇄 무관.
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 * 사용: node scripts/migrate-product-recommendations.js
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-product-recommendations] Starting...');
    const ProductRecommendation = require('../models/ProductRecommendation');
    const BrandMenuRecommendation = require('../models/BrandMenuRecommendation');
    await ProductRecommendation.sync({ alter: false });
    console.log('  ✓ product_recommendations table ready');
    await BrandMenuRecommendation.sync({ alter: false });
    console.log('  ✓ brand_menu_recommendations table ready');
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
