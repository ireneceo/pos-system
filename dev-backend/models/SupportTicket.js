const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class SupportTicket extends Model {}

SupportTicket.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => `ticket-${Date.now()}`
  },
  ticketNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  customerRole: {
    type: DataTypes.STRING,
    defaultValue: 'restaurant'
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  restaurantName: {
    type: DataTypes.STRING,
    allowNull: true
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
    // 'diagnostic' = QZ Tray printing diagnostics. Admin-only channel — hidden from
    // the merchant support inbox so it doesn't clutter shops that don't use QZ.
    type: DataTypes.ENUM('general', 'technical', 'billing', 'feature-request', 'bug-report', 'diagnostic'),
    defaultValue: 'general'
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
  sequelize,
  modelName: 'SupportTicket',
  tableName: 'support_tickets',
  timestamps: true
});

module.exports = SupportTicket;
