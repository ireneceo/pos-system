const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 공급업체 전용 상품을 볼 수 있는 손님 (2026-11-28 · docs/TRADE_STRUCTURE.md §2-6).
//   supplier_products.audience_mode='selected' 일 때만 쓴다. 손님 = 발주서의 구매자 칸(entity_type/entity_id) 과 같은 뜻.
//   brand_product_restaurants(«특정 매장에만»)와 대칭. 판정은 utils/supplierProductAudience.js 하나.
//   표는 scripts/migrate-supplier-product-kind-audience.js 가 만든다(FK ON DELETE CASCADE).
const SupplierProductBuyer = sequelize.define('SupplierProductBuyer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  supplier_product_id: { type: DataTypes.INTEGER, allowNull: false },
  entity_type: { type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt'), allowNull: false },
  entity_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'supplier_product_buyers',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { unique: true, fields: ['supplier_product_id', 'entity_type', 'entity_id'], name: 'uq_spb_product_buyer' },
    { fields: ['entity_type', 'entity_id'], name: 'idx_spb_buyer' }
  ]
});

module.exports = SupplierProductBuyer;
