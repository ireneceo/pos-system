const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RestaurantDailyStats = sequelize.define('RestaurantDailyStats', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  revenue: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
  order_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  average_order_value: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
  currency: { type: DataTypes.STRING(3) },
  timezone_snapshot: { type: DataTypes.STRING(50) },
  computed_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'restaurant_daily_stats',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['restaurant_id', 'date'], name: 'uniq_daily_stats_restaurant_date' },
    { fields: ['restaurant_id', 'date'], name: 'idx_daily_stats_restaurant_date' }
  ]
});

module.exports = RestaurantDailyStats;
