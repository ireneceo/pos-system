const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SupplierContract = sequelize.define('SupplierContract', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  supplier_company_id: { type: DataTypes.INTEGER, allowNull: false },
  entity_type: { type: DataTypes.ENUM('restaurant', 'brand', 'foodcourt'), allowNull: false },
  entity_id: { type: DataTypes.INTEGER, allowNull: false },

  status: {
    type: DataTypes.ENUM('requested', 'active', 'rejected', 'terminated'),
    allowNull: false, defaultValue: 'requested'
  },

  // Request
  requested_by_user_id: { type: DataTypes.INTEGER, allowNull: false },
  request_message: { type: DataTypes.TEXT, allowNull: true },
  requested_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

  // Approval
  approved_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  approved_at: { type: DataTypes.DATE, allowNull: true },
  payment_terms: {
    type: DataTypes.JSON, allowNull: true,
    comment: 'Set on approval, editable later. { terms, invoice_cycle, payment_due_day, credit_limit, currency, notes }'
  },

  // Reject
  rejected_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  rejected_at: { type: DataTypes.DATE, allowNull: true },
  rejection_reason: { type: DataTypes.TEXT, allowNull: true },

  // Terminate
  terminated_by: { type: DataTypes.ENUM('buyer', 'supplier', 'system'), allowNull: true },
  terminated_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  terminated_at: { type: DataTypes.DATE, allowNull: true },
  termination_reason: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'supplier_contracts',
  timestamps: true,
  underscored: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  indexes: [
    { fields: ['supplier_company_id'] },
    { fields: ['supplier_company_id', 'status'] },
    { fields: ['entity_type', 'entity_id'] },
    { fields: ['entity_type', 'entity_id', 'status'] },
    { fields: ['status'] }
  ]
});

module.exports = SupplierContract;
