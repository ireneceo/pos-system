const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TableQRSession = sequelize.define('TableQRSession', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'restaurants',
      key: 'id'
    }
  },
  table_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  token: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true,
    comment: 'UUID v4 token for QR validation'
  },
  status: {
    type: DataTypes.ENUM('active', 'expired'),
    defaultValue: 'active'
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Auto-expiration timestamp'
  },
  expired_by: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: 'new_qr / time / manual'
  }
}, {
  tableName: 'table_qr_sessions',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['restaurant_id', 'table_number', 'status'] },
    { fields: ['token'] }
  ]
});

module.exports = TableQRSession;
