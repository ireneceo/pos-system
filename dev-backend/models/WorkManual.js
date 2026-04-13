const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class WorkManual extends Model {}

WorkManual.init({
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
    type: DataTypes.ENUM('System Admin', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner', 'Restaurant Admin', 'Staff'),
    allowNull: false
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'restaurants',
      key: 'id'
    },
    comment: 'Scope: Restaurant Admin/Staff/Owner write here'
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'brands',
      key: 'id'
    },
    comment: 'Scope: Brand General/Manager'
  },
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'foodcourts',
      key: 'id'
    },
    comment: 'Scope: Foodcourt General/Manager'
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'work_manual_categories',
      key: 'id'
    }
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
  source_notice_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'If copied from a notice guide'
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'published'
  }
}, {
  sequelize,
  modelName: 'WorkManual',
  tableName: 'work_manuals',
  timestamps: true,
  indexes: [
    { fields: ['author_id'] },
    { fields: ['author_role'] },
    { fields: ['restaurant_id'] },
    { fields: ['brand_id'] },
    { fields: ['foodcourt_id'] },
    { fields: ['category_id'] },
    { fields: ['status'] }
  ]
});

module.exports = WorkManual;
