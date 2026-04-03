const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SystemProductPrice = sequelize.define('SystemProductPrice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'system_products',
      key: 'id'
    }
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    comment: 'Currency code: MYR, KRW, SGD, etc.'
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'system_product_prices',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['product_id', 'currency']
    }
  ]
});

module.exports = SystemProductPrice;
