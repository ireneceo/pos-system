const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class WorkManualCategory extends Model {}

WorkManualCategory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  owner_type: {
    type: DataTypes.ENUM('system', 'brand', 'foodcourt', 'restaurant'),
    allowNull: false,
    comment: 'system=System Admin, brand=Brand scope, foodcourt=Foodcourt scope, restaurant=Restaurant scope'
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'brand_id / foodcourt_id / restaurant_id (null for system)'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'WorkManualCategory',
  tableName: 'work_manual_categories',
  timestamps: true,
  indexes: [
    { fields: ['owner_type', 'owner_id'] }
  ]
});

module.exports = WorkManualCategory;
