const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 모바일 크로스셀(#11c) — BG 브랜드 차원 추천(브랜드메뉴 → 추천 브랜드메뉴).
// 저장 시 가맹점으로 동기화(syncBrandRecommendationsToRestaurant).
// 설계: docs/MOBILE_ADDON_CROSS_SELL.md §2.3
const BrandMenuRecommendation = sequelize.define('BrandMenuRecommendation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  brand_id: { type: DataTypes.INTEGER, allowNull: false, comment: '소유 브랜드(가드)' },
  brand_menu_id: { type: DataTypes.INTEGER, allowNull: false, comment: '기준 브랜드메뉴' },
  recommended_brand_menu_id: { type: DataTypes.INTEGER, allowNull: false, comment: '추천 브랜드메뉴' },
  sort_order: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  is_locked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, comment: '가맹점 잠금(수정 불가)로 내려보낼지' },
}, {
  tableName: 'brand_menu_recommendations',
  timestamps: true,
  indexes: [
    { unique: true, name: 'uniq_bmr_menu_rec', fields: ['brand_menu_id', 'recommended_brand_menu_id'] },
    { name: 'idx_bmr_brand', fields: ['brand_id'] },
  ],
});

module.exports = BrandMenuRecommendation;
