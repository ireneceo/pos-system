const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Contract extends Model {}

Contract.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  entity_type: {
    type: DataTypes.ENUM('brand', 'foodcourt'),
    allowNull: false
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  stage: {
    type: DataTypes.ENUM('proposal', 'contracting', 'setup', 'active', 'terminated', 'renewed', 'expired'),
    defaultValue: 'proposal'
  },

  // Applicant
  applicant_company_name: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  applicant_contact_person: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  applicant_email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  applicant_phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  applicant_business_type: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  applicant_location: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  applicant_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  // Contract info
  contract_number: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  contract_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Brand: franchise/license/master/direct, Foodcourt: standard/revenue_share/popup'
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  duration_months: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  signing_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },

  // Financial terms (JSON)
  financial_terms: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
    comment: 'Brand: {franchise_fee, royalty_type, royalty_value, marketing_fund_type, marketing_fund_value, security_deposit, territory} / Foodcourt: {base_rent, revenue_share_percent, min_guarantee, maintenance_fee, security_deposit, security_deposit_months, fitout_responsibility, operating_hours, restoration_required}'
  },

  // Renewal
  renewal_type: {
    type: DataTypes.ENUM('auto', 'manual', 'none'),
    defaultValue: 'manual'
  },
  renewal_alert_months: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  termination_notice_months: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  early_termination_fee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },

  // Foodcourt only
  unit_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  // Setup
  target_open_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  person_in_charge: {
    type: DataTypes.STRING(200),
    allowNull: true
  },

  // Termination
  terminated_at: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  termination_reason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  terminated_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  // Renewal linking
  renewed_from_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  renewed_to_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  // Notes
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  // Meta
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize: database.sequelize,
  tableName: 'contracts',
  timestamps: true,
  underscored: true
});

module.exports = Contract;
