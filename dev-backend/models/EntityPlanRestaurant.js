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
  },
  // Discount per restaurant for this entity plan
  discount_type: {
    type: DataTypes.ENUM('none', 'percentage', 'fixed'),
    defaultValue: 'none',
    comment: 'Discount type for this restaurant on this plan'
  },
  discount_value: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Discount value (percentage rate or fixed amount)'
  },
  discount_reason: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Reason for discount'
  },
  pending_plan_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Next plan to apply on activation date (scheduled change)'
  },
  pending_activation_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: 'Date when pending_plan_id takes effect'
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
