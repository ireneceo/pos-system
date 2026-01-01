/**
 * Migration: Add stock management fields to products table
 *
 * This allows products to be tracked in inventory directly,
 * not just through recipe ingredients.
 */

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    const tableInfo = await queryInterface.describeTable('products');

    // Add track_stock if not exists
    if (!tableInfo.track_stock) {
      await queryInterface.addColumn('products', 'track_stock', {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Whether to track stock for this product'
      });
    }

    // Add current_stock if not exists
    if (!tableInfo.current_stock) {
      await queryInterface.addColumn('products', 'current_stock', {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        comment: 'Current stock quantity'
      });
    }

    // Add min_stock if not exists
    if (!tableInfo.min_stock) {
      await queryInterface.addColumn('products', 'min_stock', {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        comment: 'Minimum stock level for alerts'
      });
    }

    // Add stock_unit if not exists
    if (!tableInfo.stock_unit) {
      await queryInterface.addColumn('products', 'stock_unit', {
        type: DataTypes.STRING(20),
        defaultValue: 'piece',
        comment: 'Stock unit (piece, box, pack, etc)'
      });
    }

    // Add supplier_id if not exists
    if (!tableInfo.supplier_id) {
      await queryInterface.addColumn('products', 'supplier_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Supplier FK'
      });
    }

    // Add unit_cost if not exists
    if (!tableInfo.unit_cost) {
      await queryInterface.addColumn('products', 'unit_cost', {
        type: DataTypes.DECIMAL(10, 4),
        defaultValue: 0,
        comment: 'Cost per unit for inventory valuation'
      });
    }

    // Add last_stock_take_at if not exists
    if (!tableInfo.last_stock_take_at) {
      await queryInterface.addColumn('products', 'last_stock_take_at', {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Last stock take date'
      });
    }

    console.log('✅ Product stock fields migration completed');
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('products', 'track_stock');
    await queryInterface.removeColumn('products', 'current_stock');
    await queryInterface.removeColumn('products', 'min_stock');
    await queryInterface.removeColumn('products', 'stock_unit');
    await queryInterface.removeColumn('products', 'supplier_id');
    await queryInterface.removeColumn('products', 'unit_cost');
    await queryInterface.removeColumn('products', 'last_stock_take_at');
  }
};
