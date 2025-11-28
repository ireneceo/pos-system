const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Option = sequelize.define('Option', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  option_group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'option_groups',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'options',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define association
Option.associate = (models) => {
  Option.belongsTo(models.OptionGroup, {
    foreignKey: 'option_group_id',
    as: 'optionGroup'
  });
};

module.exports = Option;
