const { DataTypes, Model } = require('sequelize');
const database = require('../config/database');

class Content extends Model {}

Content.init({
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
    }
  },
  type: {
    type: DataTypes.ENUM('blog', 'faq'),
    allowNull: false,
    comment: 'Content type: blog or faq'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'URL-friendly identifier for blog posts'
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    comment: 'Main content (HTML for blog, plain text for FAQ answer)'
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Short summary for blog cards'
  },
  thumbnail_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Thumbnail image URL for blog posts'
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft'
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Display order within category'
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'User ID of the author'
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
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize: database.sequelize,
  modelName: 'Content',
  tableName: 'contents',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['type', 'status']
    },
    {
      fields: ['category_id']
    },
    {
      unique: true,
      fields: ['type', 'slug'],
      where: {
        slug: {
          [require('sequelize').Op.ne]: null
        }
      }
    }
  ]
});

module.exports = Content;
