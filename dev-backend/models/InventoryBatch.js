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
    allowNull: false
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
  updatedAt: 'updated_at'
});

module.exports = InventoryBatch;
