'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add PAR Level calculation fields to ingredients table
    await queryInterface.addColumn('ingredients', 'lead_time_days', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      comment: 'Supplier lead time in days'
    });

    await queryInterface.addColumn('ingredients', 'safety_stock_percent', {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 20.00,
      comment: 'Safety stock as percentage of lead time usage'
    });

    await queryInterface.addColumn('ingredients', 'manual_daily_usage', {
      type: Sequelize.DECIMAL(10, 4),
      allowNull: true,
      comment: 'Manually set daily usage when prediction is not available'
    });

    await queryInterface.addColumn('ingredients', 'avg_daily_usage', {
      type: Sequelize.DECIMAL(10, 4),
      defaultValue: 0,
      comment: 'Calculated average daily usage from history'
    });

    await queryInterface.addColumn('ingredients', 'prediction_confidence', {
      type: Sequelize.ENUM('high', 'medium', 'low', 'none'),
      defaultValue: 'none',
      comment: 'Confidence level of usage prediction'
    });

    await queryInterface.addColumn('ingredients', 'last_actual_stock', {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
      comment: 'Last confirmed stock from stock take'
    });

    await queryInterface.addColumn('ingredients', 'last_stock_take_at', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'Last stock take date'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ingredients', 'lead_time_days');
    await queryInterface.removeColumn('ingredients', 'safety_stock_percent');
    await queryInterface.removeColumn('ingredients', 'manual_daily_usage');
    await queryInterface.removeColumn('ingredients', 'avg_daily_usage');
    await queryInterface.removeColumn('ingredients', 'prediction_confidence');
    await queryInterface.removeColumn('ingredients', 'last_actual_stock');
    await queryInterface.removeColumn('ingredients', 'last_stock_take_at');
  }
};
