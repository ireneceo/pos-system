const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SupplierProduct = sequelize.define('SupplierProduct', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  supplier_company_id: { type: DataTypes.INTEGER, allowNull: false },
  category_id: { type: DataTypes.INTEGER, allowNull: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  sku: { type: DataTypes.STRING(100), allowNull: true, comment: 'Product code' },
  unit: { type: DataTypes.STRING(50), allowNull: true, comment: 'kg, L, piece, etc.' },
  base_quantity: { type: DataTypes.DECIMAL(10, 2), defaultValue: 1, comment: '규격 — 1 주문단위에 담긴 양 (예: 5 = 5kg 들이 한 포대)' },
  // 주문 방식. 'pack' = 개수로 주문(팩/박스/포대, 정수) = 기존 전 행의 동작.
  // 'measure' = 무게·부피로 주문(kg/g/L/ml, 소수 허용). 가격은 단위당.
  // ⚠ 기본값 'pack' 은 현행 동작이다 — 바꾸면 기존 판매상품의 주문 방식이 통째로 변한다.
  order_mode: {
    type: DataTypes.ENUM('pack', 'measure'), allowNull: false, defaultValue: 'pack',
    comment: 'pack=개수로 주문(정수) / measure=무게·부피로 주문(소수)'
  },
  unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  // measure 모드의 "최소 0.5kg" 을 담으려면 DECIMAL 이어야 한다 (INT 는 0.5 를 못 담음)
  min_order_quantity: { type: DataTypes.DECIMAL(10, 2), defaultValue: 1 },
  image_url: { type: DataTypes.TEXT('medium'), allowNull: true },
  image_thumbnail: { type: DataTypes.TEXT, allowNull: true },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
  // Inventory fields (own stock tracking — Sprint 1; PO-driven in Sprint 3)
  current_stock: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0, comment: 'Owned stock quantity' },
  low_stock_threshold: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  lead_time_days: { type: DataTypes.INTEGER, defaultValue: 0 },
  emoji: { type: DataTypes.STRING(10), allowNull: true }
}, {
  tableName: 'supplier_products',
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  indexes: [
    { fields: ['supplier_company_id'] },
    { fields: ['supplier_company_id', 'is_active'] },
    { fields: ['category_id'] }
  ]
});

module.exports = SupplierProduct;
