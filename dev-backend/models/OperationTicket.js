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
    allowNull: true,
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
    allowNull: true,
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
    allowNull: true,
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
    type: DataTypes.ENUM('foodcourt', 'brand', 'owner'),
    allowNull: true,
    comment: 'Type of inquiry: foodcourt, brand, or owner'
  },
  attachments: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const v = this.getDataValue('attachments');
      return v ? JSON.parse(v) : [];
    },
    set(v) {
      this.setDataValue('attachments', v && v.length > 0 ? JSON.stringify(v) : null);
    }
  }
}, {
  sequelize: database.sequelize,
  modelName: 'OperationTicket',
  tableName: 'operation_tickets',
  timestamps: true
});

module.exports = OperationTicket;
