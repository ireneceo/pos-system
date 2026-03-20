const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const KitchenStation = sequelize.define('KitchenStation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  alert_sound: {
    type: DataTypes.STRING(20),
    defaultValue: 'bell',
    comment: 'Sound preset: bell, beep, triple, urgent, melody, deep'
  }
}, {
  tableName: 'kitchen_stations',
  timestamps: true
});

module.exports = KitchenStation;
