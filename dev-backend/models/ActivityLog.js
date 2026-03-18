const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ActivityLog = sequelize.define('ActivityLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'restaurants',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  action_type: {
    type: DataTypes.ENUM('create', 'update', 'delete'),
    allowNull: false
  },
  entity_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'menu_item, settings, payment, staff, table, promotion, etc.'
  },
  entity_id: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'ID of the affected entity'
  },
  entity_name: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Name of the affected entity for display'
  },
  changes: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'JSON object containing before/after values'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Human-readable description of the change'
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  }
}, {
  tableName: 'activity_logs',
  timestamps: false, // We're using created_at manually
  indexes: [
    { fields: ['restaurant_id'] },
    { fields: ['user_id'] },
    { fields: ['created_at'] },
    { fields: ['entity_type'] },
    { fields: ['action_type'] }
  ]
});

// Helper method to create activity log
ActivityLog.createLog = async function(logData) {
  try {
    return await this.create(logData);
  } catch (error) {
    console.error('Error creating activity log:', error);
    // Don't throw error - logging should not break main functionality
    return null;
  }
};

module.exports = ActivityLog;
