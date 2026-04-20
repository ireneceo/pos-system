const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FoodcourtFloorPlan = sequelize.define('FoodcourtFloorPlan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  branch_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'foodcourt_branches', key: 'id' }
  },
  floor_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Level 1, Ground Floor, Basement 등'
  },
  image_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  notes: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  canvas_width: {
    type: DataTypes.INTEGER,
    defaultValue: 1200,
    allowNull: false
  },
  canvas_height: {
    type: DataTypes.INTEGER,
    defaultValue: 800,
    allowNull: false
  },
  grid_size: {
    type: DataTypes.INTEGER,
    defaultValue: 20,
    allowNull: false
  },
  show_grid: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  tableName: 'foodcourt_floor_plans',
  timestamps: true,
  underscored: true,
  indexes: [{ fields: ['branch_id'] }]
});

module.exports = FoodcourtFloorPlan;
