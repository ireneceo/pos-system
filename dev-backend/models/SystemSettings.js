const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class SystemSettings extends Model {}

SystemSettings.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  setting_key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  setting_value: {
    type: DataTypes.JSON,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('setting_value');
      return rawValue ? (typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue) : null;
    }
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  modelName: 'SystemSettings',
  tableName: 'system_settings',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = SystemSettings;
