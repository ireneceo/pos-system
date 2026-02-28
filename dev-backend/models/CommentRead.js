const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class CommentRead extends Model {}

CommentRead.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  entity_type: {
    type: DataTypes.ENUM('notice', 'operation_ticket', 'support_ticket'),
    allowNull: false
  },
  entity_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_read_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'CommentRead',
  tableName: 'comment_reads',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'entity_type', 'entity_id']
    },
    {
      fields: ['user_id', 'entity_type']
    }
  ]
});

module.exports = CommentRead;
