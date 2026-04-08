const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  entity_type: {
    type: DataTypes.ENUM('notice', 'operation_ticket', 'support_ticket', 'hardware_quote', 'contract'),
    allowNull: false,
    comment: 'Polymorphic type: which table this comment belongs to'
  },
  entity_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'ID of the parent entity (notice/ticket)'
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
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
  },
  is_internal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Internal note: visible only to same role group or higher'
  }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  timestamps: true,
  indexes: [
    {
      fields: ['entity_type', 'entity_id']
    },
    {
      fields: ['author_id']
    }
  ]
});

module.exports = Comment;
