const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SupplierInvitation = sequelize.define('SupplierInvitation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  token: { type: DataTypes.STRING(64), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(255), allowNull: false },
  supplier_name: { type: DataTypes.STRING(255), allowNull: true },
  plan_id: { type: DataTypes.INTEGER, allowNull: true },
  message: { type: DataTypes.TEXT, allowNull: true },
  invited_by: { type: DataTypes.INTEGER, allowNull: false, comment: 'SA user id' },
  expires_at: { type: DataTypes.DATE, allowNull: false },
  used_at: { type: DataTypes.DATE, allowNull: true },
  used_by_user_id: { type: DataTypes.INTEGER, allowNull: true },
  status: {
    type: DataTypes.ENUM('pending', 'used', 'expired', 'revoked'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'supplier_invitations',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { unique: true, fields: ['token'] },
    { fields: ['email'] },
    { fields: ['status'] }
  ]
});

module.exports = SupplierInvitation;
