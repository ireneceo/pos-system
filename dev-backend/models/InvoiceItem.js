const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class InvoiceItem extends Model {}

InvoiceItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  item_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Item type code from invoice_categories table'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    // 2026-08-31: INTEGER → DECIMAL. kg·g·L 단위 발주(2.5kg 등)가 인보이스로 넘어올 때
    // 정수로 조용히 깎이던 것을 막는다. 금액은 calculated_amount 로 계산되므로(utils/invoiceCalculation)
    // 타입 확장이 합계에 영향을 주지 않는다. 마이그: scripts/migrate-invoice-item-unit.js
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1
  },
  unit: {
    // 수량을 따라다니는 단위(kg/g/L/piece…). 발주 라인(purchase_order_items.unit)에서 옮겨온다.
    // 발주 유래가 아닌 인보이스(구독료 등)는 NULL — 화면은 단위 없이 숫자만 낸다.
    type: DataTypes.STRING(50),
    allowNull: true
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  calculation_method: {
    type: DataTypes.ENUM('fixed', 'percentage', 'combined'),
    defaultValue: 'fixed'
  },
  fixed_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  percentage_rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  base_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'For percentage calculation (e.g., monthly sales)'
  },
  minimum_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'For combined calculation (fixed minimum or percentage, whichever is higher)'
  },
  calculated_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tax_rate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  tax_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  sequelize: database.sequelize,
  modelName: 'InvoiceItem',
  tableName: 'invoice_items',
  timestamps: true
});

module.exports = InvoiceItem;