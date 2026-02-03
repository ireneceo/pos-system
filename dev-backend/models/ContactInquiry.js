const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class ContactInquiry extends Model {}

ContactInquiry.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  inquiry_type: {
    type: DataTypes.ENUM('free_trial', 'pricing', 'demo', 'support', 'partnership', 'other'),
    defaultValue: 'other',
    comment: 'Type of inquiry: free_trial, pricing, demo, support, partnership, other'
  },
  interested_plan: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  preferred_username: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Preferred username for free trial signup'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('new', 'in_progress', 'resolved', 'closed'),
    defaultValue: 'new'
  },
  assigned_to: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Admin user ID who is handling this inquiry'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Internal notes by admin'
  },
  resolved_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // Reply fields
  reply_message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  replied_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Admin user ID who replied'
  },
  replied_by_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  replied_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  email_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  email_sent_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'ContactInquiry',
  tableName: 'contact_inquiries',
  timestamps: true
});

module.exports = ContactInquiry;
