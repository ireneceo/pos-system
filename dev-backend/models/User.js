const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('System Admin', 'Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager', 'Restaurant Owner', 'Restaurant Admin', 'Staff'),
    defaultValue: 'Staff'
  },
  full_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  manager_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  foodcourt_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  pin_code: {
    type: DataTypes.STRING(4),
    allowNull: true,
    comment: 'POS cashier PIN (4 digits) for quick switch'
  },
  permissions: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('permissions');
      if (!rawValue) return [];
      try {
        let parsed = rawValue;
        // Unwrap nested JSON strings (protection against double-stringify)
        for (let i = 0; i < 5 && typeof parsed === 'string'; i++) {
          parsed = JSON.parse(parsed);
        }
        return Array.isArray(parsed) ? parsed.filter(x => typeof x === 'string' && x.length > 1) : [];
      } catch { return []; }
    },
    set(value) {
      // If already a JSON string, parse first to avoid double-stringify
      let arr = value || [];
      if (typeof arr === 'string') {
        try { arr = JSON.parse(arr); } catch { arr = []; }
      }
      this.setDataValue('permissions', JSON.stringify(Array.isArray(arr) ? arr : []));
    }
  },
  notification_preferences: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    comment: 'JSON: per-category notification on/off. null = all enabled (opt-out model)',
    get() {
      const raw = this.getDataValue('notification_preferences');
      if (!raw) return null;
      try { return JSON.parse(raw); } catch { return null; }
    },
    set(value) {
      this.setDataValue('notification_preferences', value ? JSON.stringify(value) : null);
    }
  }
}, {
  sequelize: database.sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['username'],
      name: 'username'
    },
    {
      unique: true,
      fields: ['email'],
      name: 'email'
    }
  ]
});

module.exports = User;
