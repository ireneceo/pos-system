const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const SiteSettings = sequelize.define('SiteSettings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  site_name: {
    type: DataTypes.STRING(255),
    defaultValue: 'OrderHere POS'
  },
  favicon_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  brand_logo_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  seo_title: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  seo_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  seo_keywords: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  og_image_url: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'site_settings',
  underscored: true,
  timestamps: true
});

module.exports = SiteSettings;
