const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class NoticeRecipient extends Model {}

NoticeRecipient.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  notice_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'notices',
      key: 'id'
    }
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'restaurants',
      key: 'id'
    },
    comment: 'Target restaurant (null when target is a role-based user without restaurant)'
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    },
    comment: 'Target user (for role-based notices to Brand General, Foodcourt General, etc.)'
  },
  read_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  read_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'NoticeRecipient',
  tableName: 'notice_recipients',
  timestamps: true,
  indexes: [
    {
      fields: ['notice_id']
    },
    {
      fields: ['restaurant_id']
    },
    {
      fields: ['user_id']
    },
    {
      fields: ['notice_id', 'restaurant_id'],
      unique: true,
      where: {
        restaurant_id: { [require('sequelize').Op.ne]: null }
      }
    }
  ]
});

module.exports = NoticeRecipient;
