const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class PlanPrice extends Model {}

PlanPrice.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false
  },
  monthly_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  annual_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'PlanPrice',
  tableName: 'plan_prices',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['plan_id', 'currency'],
      name: 'plan_prices_plan_id_currency_unique'
    }
  ]
});

module.exports = PlanPrice;
