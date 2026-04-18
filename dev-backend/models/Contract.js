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
  applicant_business_registration: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  applicant_website: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  applicant_bank_info: {
    type: DataTypes.JSON,
    allowNull: true
  },
  applicant_representatives: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },

  // Issuer (Brand/Foodcourt snapshot at contract time)
  issuer_company_name: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  issuer_business_registration: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  issuer_website: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  issuer_bank_info: {
    type: DataTypes.JSON,
    allowNull: true
  },
  issuer_representatives: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  issuer_sync_with_master: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: 'When true, issuer_* fields auto-sync with Brand/Foodcourt master on update'
  },

  // Contract clauses (Phase 3)
  special_conditions: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  renewal_policy: {
    type: DataTypes.JSON,
    allowNull: true
  },
  exclusivity_terms: {
    type: DataTypes.JSON,
    allowNull: true
  },
  support_services: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  legal_terms: {
    type: DataTypes.JSON,
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
  underscored: true,
  validate: {
    bankInfoShape() {
      const validate = (val, label) => {
        if (val == null) return;
        if (typeof val !== 'object' || Array.isArray(val)) {
          throw new Error(`${label} must be an object`);
        }
      };
      validate(this.applicant_bank_info, 'applicant_bank_info');
      validate(this.issuer_bank_info, 'issuer_bank_info');
    },
    representativesShape() {
      const validate = (val, label) => {
        if (val == null) return;
        if (!Array.isArray(val)) throw new Error(`${label} must be an array`);
      };
      validate(this.applicant_representatives, 'applicant_representatives');
      validate(this.issuer_representatives, 'issuer_representatives');
    },
    financialTermsSchema() {
      const ft = this.financial_terms;
      if (ft == null) return;
      if (typeof ft !== 'object' || Array.isArray(ft)) {
        throw new Error('financial_terms must be an object');
      }

      // rent_schedule: array of {year, base_rent?, service_charge_psf?, cleaning?}
      if (ft.rent_schedule != null) {
        if (!Array.isArray(ft.rent_schedule)) {
          throw new Error('financial_terms.rent_schedule must be an array');
        }
        ft.rent_schedule.forEach((row, i) => {
          if (row == null || typeof row !== 'object' || Array.isArray(row)) {
            throw new Error(`rent_schedule[${i}] must be an object`);
          }
          if (row.year != null) {
            const y = Number(row.year);
            if (!Number.isFinite(y) || y < 1 || y > 50) {
              throw new Error(`rent_schedule[${i}].year out of range (1-50)`);
            }
          }
          ['base_rent', 'service_charge_psf', 'cleaning'].forEach(k => {
            if (row[k] != null && row[k] !== '' && !Number.isFinite(Number(row[k]))) {
              throw new Error(`rent_schedule[${i}].${k} must be numeric`);
            }
          });
        });
      }

      // percentage_rent: {rate, compare_against, higher_applies}
      if (ft.percentage_rent != null) {
        const pr = ft.percentage_rent;
        if (typeof pr !== 'object' || Array.isArray(pr)) {
          throw new Error('percentage_rent must be an object');
        }
        if (pr.rate != null && pr.rate !== '') {
          const r = Number(pr.rate);
          if (!Number.isFinite(r) || r < 0 || r > 100) {
            throw new Error('percentage_rent.rate must be between 0 and 100');
          }
        }
        if (pr.compare_against != null && pr.compare_against !== '' &&
            !['gross', 'base'].includes(pr.compare_against)) {
          throw new Error('percentage_rent.compare_against must be "gross" or "base"');
        }
      }

      // royalty_payment: {due_day 1-31, grace_days 0+, late_interest_pct 0-100}
      if (ft.royalty_payment != null) {
        const rp = ft.royalty_payment;
        if (typeof rp !== 'object' || Array.isArray(rp)) {
          throw new Error('royalty_payment must be an object');
        }
        if (rp.due_day != null && rp.due_day !== '') {
          const d = Number(rp.due_day);
          if (!Number.isInteger(d) || d < 1 || d > 31) {
            throw new Error('royalty_payment.due_day must be integer 1-31');
          }
        }
        if (rp.grace_days != null && rp.grace_days !== '') {
          const g = Number(rp.grace_days);
          if (!Number.isFinite(g) || g < 0) {
            throw new Error('royalty_payment.grace_days must be >= 0');
          }
        }
        if (rp.late_interest_pct != null && rp.late_interest_pct !== '') {
          const i = Number(rp.late_interest_pct);
          if (!Number.isFinite(i) || i < 0 || i > 100) {
            throw new Error('royalty_payment.late_interest_pct must be between 0 and 100');
          }
        }
      }

      // Numeric top-level fields
      const numericFields = ['unit_size_sqft', 'fit_out_period_days',
                             'franchise_fee', 'franchise_fee_original',
                             'system_setup_fee', 'system_monthly_fee',
                             'base_rent', 'security_deposit', 'min_guarantee',
                             'maintenance_fee'];
      numericFields.forEach(k => {
        if (ft[k] != null && ft[k] !== '' && !Number.isFinite(Number(ft[k]))) {
          throw new Error(`financial_terms.${k} must be numeric`);
        }
      });
    },
    clauseShapes() {
      if (this.special_conditions != null && !Array.isArray(this.special_conditions)) {
        throw new Error('special_conditions must be an array');
      }
      if (this.support_services != null && !Array.isArray(this.support_services)) {
        throw new Error('support_services must be an array');
      }
      const validateObj = (v, label) => {
        if (v == null) return;
        if (typeof v !== 'object' || Array.isArray(v)) throw new Error(`${label} must be an object`);
      };
      validateObj(this.renewal_policy, 'renewal_policy');
      validateObj(this.exclusivity_terms, 'exclusivity_terms');
      validateObj(this.legal_terms, 'legal_terms');

      if (this.legal_terms) {
        const lt = this.legal_terms;
        if (lt.dispute_resolution != null && lt.dispute_resolution !== '' &&
            !['arbitration', 'court', 'mediation'].includes(lt.dispute_resolution)) {
          throw new Error('legal_terms.dispute_resolution must be arbitration|court|mediation');
        }
      }
      if (this.renewal_policy) {
        const rp = this.renewal_policy;
        if (rp.notice_months != null && rp.notice_months !== '') {
          const n = Number(rp.notice_months);
          if (!Number.isFinite(n) || n < 0) throw new Error('renewal_policy.notice_months must be >= 0');
        }
      }
    }
  }
});

module.exports = Contract;
