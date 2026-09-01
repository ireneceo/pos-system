const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PurchaseOrderItem = sequelize.define('PurchaseOrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  purchase_order_id: { type: DataTypes.INTEGER, allowNull: false },
  ingredient_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'RA/brand Ingredient. BG ProductIngredient 주문이면 null' },
  product_ingredient_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'BG 재고아이템(ProductIngredient) 주문. ingredient_id 와 둘 중 하나만' },
  // 2026-09-01: 레시피 없는 프로덕트는 그 자체가 재고아이템인데(수량이 프로덕트에 산다)
  // 발주 라인이 재료만 가리킬 수 있어서 사온 물건이 프로덕트로 들어올 길이 없었다.
  // 그래서 같은 물건이 "프로덕트"와 "따로 만든 재고아이템" 둘로 갈라졌다(GIT 포장재).
  // 아래 4개(ingredient/product_ingredient/product/brand_product)는 **정확히 하나만** 채운다 — utils/stockTarget.js
  product_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'RA 레시피 없는 프로덕트 = 재고아이템 자체. 넷 중 하나만' },
  brand_product_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'BG 레시피 없는 브랜드 프로덕트. 넷 중 하나만' },
  ingredient_seller_product_id: {
    type: DataTypes.INTEGER, allowNull: true,
    comment: 'snapshot of which seller product was used'
  },

  description: { type: DataTypes.STRING(255), allowNull: true },
  quantity_ordered: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  quantity_received: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  unit: { type: DataTypes.STRING(50), allowNull: true },
  unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  line_total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  unit_conversion: { type: DataTypes.DECIMAL(10, 4), defaultValue: 1 },
  notes: { type: DataTypes.STRING(255), allowNull: true },

  // Sprint 7
  discrepancy_reason: {
    type: DataTypes.ENUM('short', 'damaged', 'wrong_item', 'pending'),
    allowNull: true,
    comment: 'Sprint 7: receive 시 차이 사유'
  },
  discrepancy_note: { type: DataTypes.STRING(500), allowNull: true },
  discrepancy_reported_at: { type: DataTypes.DATE, allowNull: true },
  discrepancy_reported_by_user_id: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'purchase_order_items',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['purchase_order_id'] },
    { fields: ['ingredient_id'] },
    { fields: ['product_id'] },
    { fields: ['brand_product_id'] }
  ]
});

module.exports = PurchaseOrderItem;
