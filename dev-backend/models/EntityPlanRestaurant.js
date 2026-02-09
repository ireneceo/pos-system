const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class EntityPlanRestaurant extends Model {}

EntityPlanRestaurant.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  entity_plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'EntityPlan ID'
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Restaurant ID'
  },
  activation_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    comment: 'When this plan assignment became active'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'EntityPlanRestaurant',
  tableName: 'entity_plan_restaurants',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['entity_plan_id', 'restaurant_id'],
      name: 'unique_plan_restaurant'
    }
  ]
});

module.exports = EntityPlanRestaurant;
