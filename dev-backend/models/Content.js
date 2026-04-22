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
  // Multilingual
  language: {
    type: DataTypes.STRING(5),
    allowNull: false,
    defaultValue: 'en',
    comment: 'ISO 639-1 2-letter code (en/ms/zh/ko)'
  },
  translation_group_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Links translated versions of the same article'
  },
  // Marketing metadata
  target_persona: {
    type: DataTypes.STRING(30),
    allowNull: true,
    comment: 'restaurant_owner / brand_general / foodcourt_operator / owner'
  },
  funnel_stage: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: 'TOFU / MOFU / BOFU'
  },
  content_tier: {
    type: DataTypes.STRING(15),
    allowNull: true,
    comment: 'pillar / cluster / tactical / case_study / news_jack'
  },
  // Tag taxonomy (filterable on public blog/FAQ pages)
  problem_category: {
    type: DataTypes.STRING(30),
    allowNull: true,
    comment: 'operations / customer_experience / data_decisions / management / organization / automation'
  },
  // Multi-format fields (one content row = multi-channel rollout)
  video_script: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Short-form video (15-30s) script: hook/problem/solution/cta sections'
  },
  thumbnail_copy: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Punchy copy for SNS thumbnails'
  },
  social_captions: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '[DEPRECATED] Per-platform captions. Replaced by social_post.',
    get() {
      const raw = this.getDataValue('social_captions');
      return raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : null;
    }
  },
  // NEW — simplified distribution fields (replaces video_script + thumbnail_copy + social_captions)
  video_prompt: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
    comment: 'Full AI video production prompt — scene descriptions, VO script, overlays, thumbnail spec, visual style'
  },
  social_post: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Unified social post for all platforms: { title, body, hashtags[] }',
    get() {
      const raw = this.getDataValue('social_post');
      return raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : null;
    }
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
