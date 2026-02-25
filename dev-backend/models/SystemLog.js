const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SystemLog = sequelize.define('SystemLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  level: {
    type: DataTypes.ENUM('debug', 'info', 'warning', 'error', 'critical'),
    defaultValue: 'info',
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('system', 'database', 'auth', 'payment', 'api', 'security', 'backup'),
    defaultValue: 'system',
    allowNull: false
  },
  service: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  details: {
    type: DataTypes.JSON,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  user_name: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  request_id: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Duration in milliseconds'
  },
  status_code: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'system_logs',
  timestamps: false,
  indexes: [
    { fields: ['timestamp'] },
    { fields: ['level'] },
    { fields: ['category'] },
    { fields: ['service'] }
  ]
});

// Helper method - never throws
SystemLog.createLog = async function(logData) {
  try {
    return await this.create({
      ...logData,
      timestamp: logData.timestamp || new Date()
    });
  } catch (error) {
    console.error('Error creating system log:', error.message);
    return null;
  }
};

module.exports = SystemLog;
