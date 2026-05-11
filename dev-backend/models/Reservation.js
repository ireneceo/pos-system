const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Reservation = sequelize.define('Reservation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  restaurant_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'restaurants', key: 'id' } },
  customer_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'restaurant_customers', key: 'id' } },
  guest_name: { type: DataTypes.STRING(100), allowNull: false },
  guest_phone: { type: DataTypes.STRING(30), allowNull: false },
  guest_email: { type: DataTypes.STRING(255), allowNull: true },
  reserved_at: { type: DataTypes.DATE, allowNull: false },
  party_size: { type: DataTypes.INTEGER, allowNull: false },
  turn_minutes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 90 },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'arrived', 'seated', 'completed', 'cancelled', 'no_show'),
    allowNull: false,
    defaultValue: 'pending'
  },
  table_number: { type: DataTypes.STRING(20), allowNull: true },
  notes: { type: DataTypes.TEXT, allowNull: true, comment: 'Customer-supplied notes (allergies, birthday, requests)' },
  deposit_order_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'orders', key: 'id' }, comment: 'FK to Order when deposit was prepaid' },
  source: {
    type: DataTypes.ENUM('customer_mobile', 'staff_phone', 'walk_in'),
    allowNull: false,
    defaultValue: 'customer_mobile'
  },
  confirmation_sent_at: { type: DataTypes.DATE, allowNull: true },
  reminder_24h_sent_at: { type: DataTypes.DATE, allowNull: true },
  reminder_2h_sent_at: { type: DataTypes.DATE, allowNull: true },
  arrived_at: { type: DataTypes.DATE, allowNull: true },
  seated_at: { type: DataTypes.DATE, allowNull: true },
  completed_at: { type: DataTypes.DATE, allowNull: true },
  cancelled_at: { type: DataTypes.DATE, allowNull: true },
  cancelled_by: { type: DataTypes.ENUM('customer', 'staff', 'system'), allowNull: true },
  cancel_reason: { type: DataTypes.TEXT, allowNull: true },
  no_show_at: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'reservations',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['restaurant_id', 'reserved_at'], name: 'reservation_restaurant_date' },
    { fields: ['restaurant_id', 'status', 'reserved_at'], name: 'reservation_restaurant_status_date' },
    { fields: ['customer_id', 'reserved_at'], name: 'reservation_customer_date' }
  ]
});

module.exports = Reservation;
