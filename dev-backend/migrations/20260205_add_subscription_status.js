/**
 * Migration: Add subscription status fields to restaurants table
 *
 * Adds new status values: trial, overdue, suspended
 * Adds grace_period_start field to track when overdue status began
 */

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Modify status ENUM to include new values
    await queryInterface.sequelize.query(`
      ALTER TABLE restaurants
      MODIFY COLUMN status ENUM('active', 'inactive', 'trial', 'overdue', 'suspended', 'expired', 'cancelled')
      DEFAULT 'active'
    `);

    // 2. Add grace_period_start column
    const tableInfo = await queryInterface.describeTable('restaurants');

    if (!tableInfo.grace_period_start) {
      await queryInterface.addColumn('restaurants', 'grace_period_start', {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'When the grace period started (for overdue status tracking)'
      });
    }

    // 3. Add trial_end_date column for explicit trial tracking
    if (!tableInfo.trial_end_date) {
      await queryInterface.addColumn('restaurants', 'trial_end_date', {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'When the trial period ends'
      });
    }

    // 4. Add last_payment_date column
    if (!tableInfo.last_payment_date) {
      await queryInterface.addColumn('restaurants', 'last_payment_date', {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Last successful payment date'
      });
    }

    console.log('Migration completed: Added subscription status fields');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert status ENUM to original values
    await queryInterface.sequelize.query(`
      ALTER TABLE restaurants
      MODIFY COLUMN status ENUM('active', 'inactive')
      DEFAULT 'active'
    `);

    // Remove added columns
    await queryInterface.removeColumn('restaurants', 'grace_period_start');
    await queryInterface.removeColumn('restaurants', 'trial_end_date');
    await queryInterface.removeColumn('restaurants', 'last_payment_date');

    console.log('Migration reverted: Removed subscription status fields');
  }
};
