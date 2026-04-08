const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class FoodcourtUnit extends Model {}

FoodcourtUnit.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  size_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  size_unit: {
    type: DataTypes.ENUM('sqft', 'sqm'),
    defaultValue: 'sqft'
  },
  location_description: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('vacant', 'reserved', 'preparing', 'occupied'),
    defaultValue: 'vacant'
  },
  current_contract_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  tableName: 'foodcourt_units',
  timestamps: true,
  underscored: true
});

module.exports = FoodcourtUnit;
