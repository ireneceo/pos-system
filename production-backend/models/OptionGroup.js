const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OptionGroup = sequelize.define('OptionGroup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  multiple: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'restaurants',
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'option_groups',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define association
OptionGroup.associate = (models) => {
  OptionGroup.hasMany(models.Option, {
    foreignKey: 'option_group_id',
    as: 'options'
  });
};

module.exports = OptionGroup;
