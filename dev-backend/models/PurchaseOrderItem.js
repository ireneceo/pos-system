const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PurchaseOrderItem = sequelize.define('PurchaseOrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  purchase_order_id: { type: DataTypes.INTEGER, allowNull: false },
  ingredient_id: { type: DataTypes.INTEGER, allowNull: false },
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
  notes: { type: DataTypes.STRING(255), allowNull: true }
}, {
  tableName: 'purchase_order_items',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['purchase_order_id'] },
    { fields: ['ingredient_id'] }
  ]
});

module.exports = PurchaseOrderItem;
