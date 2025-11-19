'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('site_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      site_name: {
        type: Sequelize.STRING(255),
        defaultValue: 'OrderHere POS'
      },
      favicon_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      brand_logo_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      seo_title: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      seo_description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      seo_keywords: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      og_image_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Insert default settings
    await queryInterface.bulkInsert('site_settings', [{
      site_name: 'OrderHere POS',
      seo_title: 'OrderHere - Restaurant POS System',
      seo_description: 'Complete restaurant management solution with POS, ordering, and analytics',
      seo_keywords: 'restaurant pos, food ordering, restaurant management, pos system',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('site_settings');
  }
};
