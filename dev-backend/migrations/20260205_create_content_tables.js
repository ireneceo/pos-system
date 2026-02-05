/**
 * Migration: Create content management tables
 *
 * Tables:
 * - content_categories: Categories for blog posts and FAQ items
 * - contents: Blog posts and FAQ items
 */

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Create content_categories table
    await queryInterface.createTable('content_categories', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: DataTypes.ENUM('blog', 'faq'),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      icon: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Add unique index on type + slug
    await queryInterface.addIndex('content_categories', ['type', 'slug'], {
      unique: true,
      name: 'idx_category_type_slug'
    });

    // 2. Create contents table
    await queryInterface.createTable('contents', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'content_categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      type: {
        type: DataTypes.ENUM('blog', 'faq'),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      excerpt: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      thumbnail_url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: {
        type: DataTypes.ENUM('draft', 'published'),
        defaultValue: 'draft'
      },
      sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      author_name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Add indexes
    await queryInterface.addIndex('contents', ['type', 'status'], {
      name: 'idx_content_type_status'
    });
    await queryInterface.addIndex('contents', ['category_id'], {
      name: 'idx_content_category'
    });

    // 3. Insert default categories
    await queryInterface.bulkInsert('content_categories', [
      // FAQ categories
      { type: 'faq', name: 'Subscription', slug: 'subscription', icon: '💳', sort_order: 1, is_active: true, created_at: new Date(), updated_at: new Date() },
      { type: 'faq', name: 'Payment', slug: 'payment', icon: '💰', sort_order: 2, is_active: true, created_at: new Date(), updated_at: new Date() },
      { type: 'faq', name: 'Features', slug: 'features', icon: '✨', sort_order: 3, is_active: true, created_at: new Date(), updated_at: new Date() },
      { type: 'faq', name: 'Technical', slug: 'technical', icon: '🔧', sort_order: 4, is_active: true, created_at: new Date(), updated_at: new Date() },
      // Blog categories
      { type: 'blog', name: 'Announcements', slug: 'announcements', icon: '📢', sort_order: 1, is_active: true, created_at: new Date(), updated_at: new Date() },
      { type: 'blog', name: 'Guides', slug: 'guides', icon: '📚', sort_order: 2, is_active: true, created_at: new Date(), updated_at: new Date() },
      { type: 'blog', name: 'Tips & Tricks', slug: 'tips', icon: '💡', sort_order: 3, is_active: true, created_at: new Date(), updated_at: new Date() },
      { type: 'blog', name: 'Updates', slug: 'updates', icon: '🚀', sort_order: 4, is_active: true, created_at: new Date(), updated_at: new Date() }
    ]);

    console.log('Migration completed: Created content management tables');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contents');
    await queryInterface.dropTable('content_categories');
    console.log('Migration reverted: Dropped content management tables');
  }
};
