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
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  import_type: {
    type: DataTypes.ENUM('categories', 'menu', 'options', 'orders'),
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
  status: {
    type: DataTypes.ENUM('completed', 'undone'),
    defaultValue: 'completed'
  }
}, {
  tableName: 'import_history',
  timestamps: true
});

module.exports = ImportHistory;
