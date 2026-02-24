const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class RestaurantManager extends Model {}

RestaurantManager.init({
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
  manager_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  is_primary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Indicates if this is the primary manager for backward compatibility'
  },
  relationship_type: {
    type: DataTypes.ENUM('oversight', 'ownership'),
    defaultValue: 'oversight',
    comment: 'oversight: Brand/Foodcourt 감독 관계, ownership: Restaurant Owner 소유 관계'
  },
  assigned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize: database.sequelize,
  modelName: 'RestaurantManager',
  tableName: 'restaurant_managers',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['restaurant_id', 'manager_id']
    }
  ]
});

module.exports = RestaurantManager;
