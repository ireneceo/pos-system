const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class FoodcourtBranch extends Model {
  /**
   * Compose a "full code" prefix for units under this branch.
   * Usage: `${branch.code}-${unit.unit_number}` e.g. "SUNWAY-A01"
   */
  get displayCode() { return this.code; }
}

FoodcourtBranch.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Branch display name, e.g. "Sunway Pyramid"'
  },
  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Branch code, manually entered. Used as prefix for unit full_code. Unique per foodcourt.'
  },
  is_primary: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'True for the auto-created "main" branch per foodcourt on migration'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active'
  },
  address: { type: DataTypes.TEXT, allowNull: true },
  address_line_2: { type: DataTypes.STRING(255), allowNull: true },
  city: { type: DataTypes.STRING(100), allowNull: true },
  state: { type: DataTypes.STRING(100), allowNull: true },
  postal_code: { type: DataTypes.STRING(20), allowNull: true },
  country: { type: DataTypes.CHAR(2), allowNull: true },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  email: { type: DataTypes.STRING(100), allowNull: true },
  latitude: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
  longitude: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
  operating_hours: { type: DataTypes.JSON, allowNull: true },
  notes: { type: DataTypes.TEXT, allowNull: true },
  unit_config: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '{ enabled: bool, zones: [{ prefix, count, padding }] } — auto-numbering config for units'
  }
}, {
  sequelize: database.sequelize,
  modelName: 'FoodcourtBranch',
  tableName: 'foodcourt_branches',
  timestamps: true,
  underscored: true
});

module.exports = FoodcourtBranch;
