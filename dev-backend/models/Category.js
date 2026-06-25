const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  emoji: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  kitchen_station_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Kitchen station assignment (category mode)'
  },
  // #11c 모바일 크로스셀: NULL=이름 자동감지 / true=강제 추천 카테고리 / false=강제 제외
  is_recommendation_source: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null,
    comment: 'Cross-sell recommendation source override (null=auto by name)'
  }
}, {
  tableName: 'categories',
  timestamps: true,
  indexes: [
    { fields: ['name'] },
    { fields: ['displayOrder'] }
  ]
});

module.exports = Category;
