const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const IngredientSellerProduct = sequelize.define('IngredientSellerProduct', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ingredient_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'RA/brand Ingredient. BG ProductIngredient 매핑이면 null' },
  product_ingredient_id: { type: DataTypes.INTEGER, allowNull: true, comment: 'BG 재고아이템(ProductIngredient) ↔ 공급업체상품. ingredient_id 와 둘 중 하나만' },

  seller_type: {
    type: DataTypes.ENUM('system_admin', 'brand', 'foodcourt', 'supplier'),
    allowNull: false
  },
  seller_entity_id: {
    type: DataTypes.INTEGER, allowNull: true,
    comment: 'brand_id / foodcourt_id / supplier_company_id (null for system_admin)'
  },
  seller_product_id: {
    type: DataTypes.INTEGER, allowNull: false,
    comment: 'SystemProduct/BrandProduct/FoodcourtProduct/SupplierProduct id'
  },

  unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  unit_conversion: {
    type: DataTypes.DECIMAL(10, 4), defaultValue: 1,
    comment: 'recipe unit -> seller product unit ratio'
  },
  // measure 모드의 "최소 0.5kg" 을 담으려면 DECIMAL 이어야 한다 (INT 는 0.5 를 못 담음)
  min_order_quantity: { type: DataTypes.DECIMAL(10, 2), defaultValue: 1 },
  lead_time_days: { type: DataTypes.INTEGER, defaultValue: 0 },
  is_preferred: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  notes: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: 'ingredient_seller_products',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['ingredient_id'] },
    { fields: ['seller_type', 'seller_entity_id'] },
    { fields: ['ingredient_id', 'is_preferred'] }
  ]
});

module.exports = IngredientSellerProduct;
