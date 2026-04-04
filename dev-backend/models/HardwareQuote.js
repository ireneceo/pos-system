const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const HardwareQuote = sequelize.define('HardwareQuote', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quote_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: 'Auto-generated QUO-YYMMDDNNN'
  },
  // Customer info (for non-logged-in users)
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    },
    comment: 'Linked user (if logged in or linked later by admin)'
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'restaurants',
      key: 'id'
    }
  },
  contact_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  contact_email: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  contact_phone: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  company_address: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Company address for invoice'
  },
  tax_id: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Tax registration number for invoice'
  },
  wants_invoice: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Customer requested formal invoice'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Customer note/message'
  },
  // Location
  country_code: {
    type: DataTypes.STRING(2),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: true
  },
  // Selected package
  package_product_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'system_products',
      key: 'id'
    },
    comment: 'Selected set product'
  },
  package_snapshot: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON snapshot of package config at quote time',
    get() {
      const rawValue = this.getDataValue('package_snapshot');
      if (!rawValue) return null;
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return null;
      }
    },
    set(value) {
      this.setDataValue('package_snapshot', value ? JSON.stringify(value) : null);
    }
  },
  addon_items: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON: [{product_id, name, quantity, unit_price, subtotal}]',
    get() {
      const rawValue = this.getDataValue('addon_items');
      if (!rawValue) return [];
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        return [];
      }
    },
    set(value) {
      this.setDataValue('addon_items', value ? JSON.stringify(value) : null);
    }
  },
  // Pricing
  package_price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  addon_total: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    defaultValue: 0
  },
  total_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  // Status management (ContactInquiry pattern)
  status: {
    type: DataTypes.ENUM('new', 'contacted', 'confirmed', 'invoiced', 'cancelled'),
    defaultValue: 'new'
  },
  assigned_to: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Admin user ID handling this quote'
  },
  admin_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'invoices',
      key: 'id'
    },
    comment: 'Linked invoice after issuance'
  },
  replied_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  confirmed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  invoiced_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'hardware_quotes',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = HardwareQuote;
