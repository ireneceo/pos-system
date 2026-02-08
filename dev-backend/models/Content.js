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
  // SEO Fields
  seo_title: {
    type: DataTypes.STRING(70),
    allowNull: true,
    comment: 'Custom title for search results (max 70 chars)'
  },
  seo_description: {
    type: DataTypes.STRING(160),
    allowNull: true,
    comment: 'Meta description for search results (max 160 chars)'
  },
  seo_keywords: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Comma-separated keywords'
  },
  og_image_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Open Graph image URL for social sharing'
  },
  canonical_url: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Canonical URL to prevent duplicate content'
  },
  // AEO Fields (Answer Engine Optimization)
  ai_summary: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Concise 2-3 sentence summary for AI citation'
  },
  faq_schema: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Structured FAQ data for Schema.org markup'
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
