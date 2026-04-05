const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OptionIngredient = sequelize.define('OptionIngredient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  option_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'options',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ingredients',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
    defaultValue: 1,
    comment: 'Amount of ingredient consumed per option selection'
  }
}, {
  tableName: 'option_ingredients',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = OptionIngredient;
