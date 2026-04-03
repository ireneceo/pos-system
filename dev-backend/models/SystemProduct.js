const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SystemProduct = sequelize.define('SystemProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'system_product_categories',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sku: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Auto-generated SYS-001, SYS-002...'
  },
  image_url: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  emoji: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  // Set fields (menu pattern)
  is_set: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether this is a set/package product'
  },
  set_items: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON: [{productId, name, quantity, role_label}]',
    get() {
      const rawValue = this.getDataValue('set_items');
      if (!rawValue) return null;
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return null;
      }
    },
    set(value) {
      this.setDataValue('set_items', value ? JSON.stringify(value) : null);
    }
  },
  set_display_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  // Set-specific meta
  set_group: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'tablet / monitor'
  },
  set_tier: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'standard / hybrid / premium'
  },
  set_use_case: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'One-line use case description'
  },
  set_setup_items: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of included setup items',
    get() {
      const rawValue = this.getDataValue('set_setup_items');
      if (!rawValue) return null;
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return null;
      }
    },
    set(value) {
      this.setDataValue('set_setup_items', value ? JSON.stringify(value) : null);
    }
  },
  is_recommended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Show RECOMMENDED badge on PackagesPage'
  },
  // Shipping settings
  shipping_countries: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of country codes: ["MY","SG"]',
    get() {
      const rawValue = this.getDataValue('shipping_countries');
      if (!rawValue) return [];
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return [];
      }
    },
    set(value) {
      this.setDataValue('shipping_countries', value ? JSON.stringify(value) : null);
    }
  },
  shipping_settings: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON object of per-country shipping settings',
    get() {
      const rawValue = this.getDataValue('shipping_settings');
      if (!rawValue) return {};
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return {};
      }
    },
    set(value) {
      this.setDataValue('shipping_settings', value ? JSON.stringify(value) : null);
    }
  }
}, {
  tableName: 'system_products',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = SystemProduct;
