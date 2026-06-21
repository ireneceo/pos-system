const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class InventoryTransaction extends Model {}

InventoryTransaction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Sprint 7: nullable (brand/foodcourt buyer는 null). Hook으로 entity_type=restaurant 시 자동 동기화'
  },
  entity_type: {
    type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt'),
    allowNull: true,
    comment: 'Sprint 7: polymorphic entity. Hook으로 자동 채움 (구 코드는 restaurant_id만 set)'
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Sprint 7: entity_type 별 PK'
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  product_ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'BG 재고아이템(ProductIngredient) 거래. ingredient_id 와 둘 중 하나만'
  },
  transaction_type: {
    type: DataTypes.ENUM(
      'initial', 'purchase', 'order_deduct', 'stock_take', 'waste', 'adjustment',
      'return_in', 'return_out'
    ),
    allowNull: false
  },
  quantity_change: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '양수: 증가, 음수: 감소'
  },
  unit: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  stock_after: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '거래 후 재고'
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  stock_take_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  purchase_order_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Sprint 7: PO 참조 (FK to purchase_orders)'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'InventoryTransaction',
  tableName: 'inventory_transactions',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: false,
  hooks: {
    // Sprint 7: backward-compat between restaurant_id (legacy) and entity_type/entity_id (new)
    beforeCreate(row) {
      // 신규 코드: entity_type='restaurant' 만 set → restaurant_id 보완
      if (row.entity_type === 'restaurant' && row.entity_id && !row.restaurant_id) {
        row.restaurant_id = row.entity_id;
      }
      // 구 코드: restaurant_id 만 set → entity_type/entity_id 자동 채움
      if (!row.entity_type && row.restaurant_id) {
        row.entity_type = 'restaurant';
        row.entity_id = row.restaurant_id;
      }
    }
  }
});

module.exports = InventoryTransaction;
