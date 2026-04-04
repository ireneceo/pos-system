const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SystemProductOption = sequelize.define('SystemProductOption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  option_group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'system_product_option_groups',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  price_adjustment: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Additional price for this option'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'system_product_options',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = SystemProductOption;
