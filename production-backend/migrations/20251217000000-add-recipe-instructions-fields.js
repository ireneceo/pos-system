'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add instructions_summary field
    await queryInterface.addColumn('recipes', 'instructions_summary', {
      type: Sequelize.STRING(500),
      allowNull: true,
      comment: '레시피 요약 (리스트 표시용)',
      after: 'instructions'
    });

    // Add instructions_detail field
    await queryInterface.addColumn('recipes', 'instructions_detail', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: '상세 레시피 (Step-by-step)',
      after: 'instructions_summary'
    });

    // Migrate existing data: copy instructions to instructions_detail
    await queryInterface.sequelize.query(`
      UPDATE recipes
      SET instructions_detail = instructions
      WHERE instructions IS NOT NULL AND instructions != ''
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('recipes', 'instructions_summary');
    await queryInterface.removeColumn('recipes', 'instructions_detail');
  }
};
