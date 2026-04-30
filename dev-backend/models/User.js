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
  address_line_2: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  country: {
    type: DataTypes.CHAR(2),
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
  supplier_company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Supplier Staff only — supplier company assignment (Advanced module supplier_admin_staff)'
  },
  branch_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Foodcourt Manager only — branch assignment within the foodcourt'
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
  plan_type: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Subscription plan type for Restaurant Owner (matches PlanTemplate.display_name)'
  },
  plan_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Subscription plan amount for Restaurant Owner'
  },
  billing_cycle: {
    type: DataTypes.ENUM('monthly', 'annual'),
    allowNull: true,
    comment: 'Billing cycle for Restaurant Owner'
  },
  currency: {
    type: DataTypes.STRING(10),
    allowNull: true,
    defaultValue: 'MYR',
    comment: 'Currency for Restaurant Owner subscription'
  },
  subscription_status: {
    type: DataTypes.ENUM('active', 'trial', 'overdue', 'expired', 'suspended', 'cancelled'),
    allowNull: true,
    comment: 'Subscription status for Restaurant Owner'
  },
  subscription_start: {
    type: DataTypes.DATE,
    allowNull: true
  },
  subscription_end: {
    type: DataTypes.DATE,
    allowNull: true
  },
  trial_end_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Trial period end date for Owner'
  },
  grace_period_start: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Grace period start date for Owner'
  },
  last_trial_reminder_day: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Last threshold (3/0/-1) at which trial-expiry reminder was sent.'
  },
  pending_plan_type: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Scheduled plan change - new plan name'
  },
  pending_plan_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Scheduled plan change - new plan amount'
  },
  pending_billing_cycle: {
    type: DataTypes.ENUM('monthly', 'annual'),
    allowNull: true,
    comment: 'Scheduled plan change - new billing cycle'
  },
  plan_change_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Date when pending plan change takes effect'
  },
  plan_change_type: {
    type: DataTypes.ENUM('downgrade', 'cycle_change'),
    allowNull: true,
    comment: 'Type of scheduled plan change'
  },
  is_demo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Demo account flag - prevents modification, enables daily reset'
  },
  is_test: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Test account flag - excluded from statistics, visible in admin with TEST badge'
  },
  reset_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Password reset token (hashed)'
  },
  reset_token_expires: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Password reset token expiry'
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether user email has been verified'
  },
  email_verification_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Email verification token (hashed)'
  },
  email_verification_expires: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Email verification token expiry'
  },
  email_bounce_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Number of email delivery failures'
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
  },
  preferred_language: {
    type: DataTypes.STRING(5),
    allowNull: false,
    defaultValue: 'en',
    validate: {
      isIn: [['en', 'ko', 'zh', 'ms']]
    },
    comment: 'UI language preference (en, ko, zh, ms)'
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
