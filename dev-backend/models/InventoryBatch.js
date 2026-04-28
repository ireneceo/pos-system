const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class InventoryBatch extends Model {}

InventoryBatch.init({
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
    comment: 'Sprint 7: polymorphic entity. Hook으로 자동 채움'
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Sprint 7: entity_type 별 PK'
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Batch info
  batch_number: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Batch or lot number from supplier'
  },
  // Quantity
  initial_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Original quantity received'
  },
  remaining_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Current remaining quantity'
  },
  unit: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  // Cost
  unit_cost: {
    type: DataTypes.DECIMAL(10, 4),
    defaultValue: 0,
    comment: 'Cost per unit at time of purchase'
  },
  // Dates
  manufacture_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Manufacturing/production date'
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Expiration date'
  },
  received_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Date received in inventory'
  },
  // Status
  status: {
    type: DataTypes.ENUM('active', 'depleted', 'expired', 'disposed'),
    defaultValue: 'active',
    comment: 'Batch status'
  },
  // Tracking
  supplier_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Supplier FK'
  },
  purchase_order_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Purchase order FK'
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
  modelName: 'InventoryBatch',
  tableName: 'inventory_batches',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    // Sprint 7: backward-compat for restaurant_id ↔ entity_type/entity_id
    beforeCreate(row) {
      if (row.entity_type === 'restaurant' && row.entity_id && !row.restaurant_id) {
        row.restaurant_id = row.entity_id;
      }
      if (!row.entity_type && row.restaurant_id) {
        row.entity_type = 'restaurant';
        row.entity_id = row.restaurant_id;
      }
    }
  }
});

module.exports = InventoryBatch;
