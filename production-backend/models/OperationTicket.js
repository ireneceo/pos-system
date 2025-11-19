const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class OperationTicket extends Model {}

OperationTicket.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ticketNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  managerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  managerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  requesterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  requesterName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  requesterEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  requesterRole: {
    type: DataTypes.STRING,
    allowNull: false
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'restaurants',
      key: 'id'
    }
  },
  restaurantName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'in-progress', 'resolved', 'closed'),
    defaultValue: 'open'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  category: {
    type: DataTypes.ENUM('schedule', 'inventory', 'staff', 'menu', 'customer', 'other'),
    defaultValue: 'other'
  },
  inquiryType: {
    type: DataTypes.ENUM('foodcourt', 'brand'),
    allowNull: true,
    comment: 'Type of inquiry: foodcourt or brand'
  },
  response: {
    type: DataTypes.TEXT
  },
  internalNotes: {
    type: DataTypes.TEXT,
    comment: 'Manager internal notes not visible to requester'
  },
  responseTime: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Response time in minutes'
  },
  resolutionTime: {
    type: DataTypes.INTEGER,
    comment: 'Resolution time in minutes'
  },
  resolvedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize: database.sequelize,
  modelName: 'OperationTicket',
  tableName: 'operation_tickets',
  timestamps: true
});

module.exports = OperationTicket;