'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add 'served' to the status enum
    await queryInterface.sequelize.query(`
      ALTER TABLE orders
      MODIFY COLUMN status ENUM('awaiting_payment', 'pending', 'preparing', 'ready', 'served', 'completed', 'cancelled')
      DEFAULT 'awaiting_payment'
    `);
  },

  async down (queryInterface, Sequelize) {
    // Remove 'served' from the status enum
    await queryInterface.sequelize.query(`
      ALTER TABLE orders
      MODIFY COLUMN status ENUM('awaiting_payment', 'pending', 'preparing', 'ready', 'completed', 'cancelled')
      DEFAULT 'awaiting_payment'
    `);
  }
};
