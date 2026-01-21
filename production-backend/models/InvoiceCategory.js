const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const InvoiceCategory = sequelize.define('InvoiceCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '카테고리 이름 (예: Subscription, Service, Consulting)'
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: '카테고리 코드 (예: subscription, service, consulting)'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '카테고리 설명'
  },
  display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '정렬 순서'
  },
  is_system: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '시스템 기본 카테고리 여부 (삭제 불가)'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: '활성화 여부'
  }
}, {
  tableName: 'invoice_categories',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { fields: ['code'], unique: true },
    { fields: ['display_order'] },
    { fields: ['is_active'] }
  ]
});

module.exports = InvoiceCategory;
