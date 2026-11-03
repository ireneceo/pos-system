const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ImportHistory = sequelize.define('ImportHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  batch_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: 'Unique batch identifier for grouping imported records'
  },
  // 브랜드 배치(레시피 CSV, 2026-11-03)도 담는다 — 옛 행은 owner_type 기본값 restaurant.
  owner_type: {
    type: DataTypes.ENUM('restaurant', 'brand'),
    allowNull: false,
    defaultValue: 'restaurant'
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  import_type: {
    type: DataTypes.ENUM('categories', 'menu', 'options', 'orders', 'recipes'),
    allowNull: false
  },
  file_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  total_rows: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  success_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  skipped_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  failed_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  imported_ids: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of imported record IDs for undo'
  },
  undo_snapshot: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
    comment: 'JSON — 수정한 레시피의 이전 모습 (레시피 CSV 되돌리기)'
  },
  status: {
    type: DataTypes.ENUM('completed', 'undone'),
    defaultValue: 'completed'
  }
}, {
  tableName: 'import_history',
  timestamps: true
});

module.exports = ImportHistory;
