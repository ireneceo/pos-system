'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orders', 'pager_number', {
      type: Sequelize.STRING(10),
      allowNull: true,
      comment: 'Pager device number for order notification',
      after: 'table_number'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('orders', 'pager_number');
  }
};
