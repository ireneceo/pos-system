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
      if (!rawValue) return null;
      // If already parsed by driver (object/array) or plain string, return as-is
      // Only parse if it looks like JSON string (starts with { or [)
      if (typeof rawValue === 'string') {
        if (rawValue.startsWith('{') || rawValue.startsWith('[') || rawValue.startsWith('"')) {
          try {
            return JSON.parse(rawValue);
          } catch (e) {
            return rawValue;
          }
        }
        return rawValue;
      }
      return rawValue;
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
