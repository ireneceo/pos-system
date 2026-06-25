const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 모바일 크로스셀(#11c) — 상품 A 를 담으면 추천할 상품 연결.
// 설계: docs/MOBILE_ADDON_CROSS_SELL.md §2.1
const ProductRecommendation = sequelize.define('ProductRecommendation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false, comment: '소유 매장(가드)' },
  product_id: { type: DataTypes.INTEGER, allowNull: false, comment: '기준 상품(이걸 담으면)' },
  recommended_product_id: { type: DataTypes.INTEGER, allowNull: false, comment: '추천 상품' },
  sort_order: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  origin: { type: DataTypes.ENUM('restaurant', 'brand'), allowNull: false, defaultValue: 'restaurant', comment: '출처 — brand 동기화분 구분' },
  brand_menu_recommendation_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'brand 동기화분의 원본 링크 id' },
  is_locked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, comment: 'brand 잠금분(가맹점 수정 불가)' },
}, {
  tableName: 'product_recommendations',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['product_id', 'recommended_product_id'] },
    { fields: ['restaurant_id'] },
    { fields: ['origin', 'brand_menu_recommendation_id'] },
  ],
});

module.exports = ProductRecommendation;
