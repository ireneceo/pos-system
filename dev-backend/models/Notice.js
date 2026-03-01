const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Notice extends Model {}

Notice.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  author_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author_role: {
    type: DataTypes.ENUM('System Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner'),
    allowNull: false
  },
  target_type: {
    type: DataTypes.ENUM('all', 'role', 'brand', 'foodcourt', 'restaurant', 'select_restaurants', 'individual'),
    allowNull: false,
    comment: 'all=전체, role=역할별, brand=브랜드 단위, foodcourt=푸드코트 단위, restaurant/select_restaurants=레스토랑 선택'
  },
  target_roles: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of target roles when target_type=role',
    get() {
      const value = this.getDataValue('target_roles');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('target_roles', value ? JSON.stringify(value) : null);
    }
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'brands',
      key: 'id'
    },
    comment: 'When target_type=brand, the specific brand'
  },
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'foodcourts',
      key: 'id'
    },
    comment: 'When target_type=foodcourt, the specific foodcourt'
  },
  attachments: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of file attachments [{url, name, size, type}]',
    get() {
      const v = this.getDataValue('attachments');
      return v ? JSON.parse(v) : [];
    },
    set(v) {
      this.setDataValue('attachments', v && v.length > 0 ? JSON.stringify(v) : null);
    }
  },
  category: {
    type: DataTypes.ENUM('general', 'guide'),
    defaultValue: 'general',
    comment: 'general=일반 공지, guide=가이드/참고 자료'
  },
  priority: {
    type: DataTypes.ENUM('normal', 'important', 'urgent'),
    defaultValue: 'normal'
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'published'
  }
}, {
  sequelize,
  modelName: 'Notice',
  tableName: 'notices',
  timestamps: true,
  indexes: [
    {
      fields: ['author_id']
    },
    {
      fields: ['author_role']
    },
    {
      fields: ['target_type']
    },
    {
      fields: ['brand_id']
    },
    {
      fields: ['foodcourt_id']
    },
    {
      fields: ['status']
    }
  ]
});

module.exports = Notice;
