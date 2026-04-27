const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PurchaseOrder = sequelize.define('PurchaseOrder', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  po_number: { type: DataTypes.STRING(50), allowNull: true, unique: true },

  // Buyer (polymorphic)
  entity_type: { type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt'), allowNull: false },
  entity_id: { type: DataTypes.INTEGER, allowNull: false },

  // Seller (polymorphic)
  seller_type: { type: DataTypes.ENUM('system_admin', 'brand', 'foodcourt', 'supplier'), allowNull: false },
  seller_entity_id: { type: DataTypes.INTEGER, allowNull: true },

  contract_id: { type: DataTypes.INTEGER, allowNull: true },

  status: {
    type: DataTypes.ENUM('draft', 'submitted', 'confirmed', 'shipped', 'delivered', 'partial_received', 'received', 'cancelled', 'closed'),
    allowNull: false, defaultValue: 'draft'
  },

  subtotal: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  tax_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  total_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  currency: { type: DataTypes.STRING(10), defaultValue: 'MYR' },

  expected_delivery_date: { type: DataTypes.DATEONLY, allowNull: true },
  actual_delivery_date: { type: DataTypes.DATEONLY, allowNull: true },
  delivery_address: { type: DataTypes.TEXT, allowNull: true },
  notes: { type: DataTypes.TEXT, allowNull: true },

  created_by_user_id: { type: DataTypes.INTEGER, allowNull: false },

  submitted_at: { type: DataTypes.DATE, allowNull: true },
  confirmed_at: { type: DataTypes.DATE, allowNull: true },
  shipped_at: { type: DataTypes.DATE, allowNull: true },
  received_at: { type: DataTypes.DATE, allowNull: true },
  cancelled_at: { type: DataTypes.DATE, allowNull: true },
  cancelled_reason: { type: DataTypes.TEXT, allowNull: true },

  // Sprint 4
  tracking_info: {
    type: DataTypes.JSON, allowNull: true,
    comment: 'Shipping carrier/tracking info (Sprint 4)'
  },
  trade_invoice_id: {
    type: DataTypes.INTEGER, allowNull: true,
    comment: 'FK to invoices.id (auto-issued on receive)'
  }
}, {
  tableName: 'purchase_orders',
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  indexes: [
    { fields: ['entity_type', 'entity_id'] },
    { fields: ['seller_type', 'seller_entity_id'] },
    { fields: ['status'] },
    { fields: ['entity_type', 'entity_id', 'status'] }
  ]
});

module.exports = PurchaseOrder;
