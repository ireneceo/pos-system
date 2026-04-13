const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const ContentCategory = require('../models/ContentCategory');
const Content = require('../models/Content');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Helper: Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// ============================================
// PUBLIC ROUTES (No auth required)
// ============================================

// GET /api/contents/public/faq - Get all published FAQ items
router.get('/public/faq', async (req, res) => {
  try {
    const { category } = req.query;

    const where = {
      type: 'faq',
      status: 'published'
    };

    // Get categories first
    const categories = await ContentCategory.findAll({
      where: { type: 'faq', is_active: true },
      order: [['sort_order', 'ASC']]
    });

    // If category filter provided
    if (category && category !== 'all') {
      const cat = categories.find(c => c.slug === category);
      if (cat) {
        where.category_id = cat.id;
      }
    }

    const faqs = await Content.findAll({
      where,
      order: [['sort_order', 'ASC'], ['created_at', 'DESC']],
      include: [{
        model: ContentCategory,
        as: 'category',
        attributes: ['id', 'name', 'slug', 'icon']
      }]
    });

    res.json({
      categories,
      items: faqs
    });
  } catch (error) {
    console.error('Error fetching public FAQ:', error);
    res.status(500).json({ error: 'Failed to fetch FAQ' });
  }
});

// News category slugs — shown on /news page, excluded from /blog
const NEWS_CATEGORY_SLUGS = ['product-news', 'updates'];

// Shared handler for blog/news listing
async function listPublishedPosts(req, res, { isNews }) {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      type: 'blog',
      status: 'published'
    };

    // Get all blog categories
    const allCategories = await ContentCategory.findAll({
      where: { type: 'blog', is_active: true },
      order: [['sort_order', 'ASC']]
    });

    // Split into news vs. non-news
    const newsCategoryIds = allCategories.filter(c => NEWS_CATEGORY_SLUGS.includes(c.slug)).map(c => c.id);
    const scopedCategories = isNews
      ? allCategories.filter(c => NEWS_CATEGORY_SLUGS.includes(c.slug))
      : allCategories.filter(c => !NEWS_CATEGORY_SLUGS.includes(c.slug));

    // Restrict post listing to scope (news vs non-news)
    if (isNews) {
      if (newsCategoryIds.length === 0) {
        return res.json({ categories: [], items: [], pagination: { total: 0, page: parseInt(page), limit: parseInt(limit), totalPages: 0 } });
      }
      where.category_id = { [Op.in]: newsCategoryIds };
    } else {
      // Blog: exclude news categories (but include null category_id)
      if (newsCategoryIds.length > 0) {
        where[Op.and] = [
          { [Op.or]: [{ category_id: null }, { category_id: { [Op.notIn]: newsCategoryIds } }] }
        ];
      }
    }

    // Get category_ids that actually have published posts within this scope
    const categoryIdsWithPosts = await Content.findAll({
      where: { ...where, category_id: { [Op.ne]: null } },
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('category_id')), 'category_id']],
      raw: true
    });
    const activeIdSet = new Set(categoryIdsWithPosts.map(c => c.category_id));
    const categories = scopedCategories.filter(c => activeIdSet.has(c.id));

    // If specific category filter provided, narrow down
    if (category && category !== 'all') {
      const cat = scopedCategories.find(c => c.slug === category);
      if (cat) {
        where.category_id = cat.id;
        // Remove the Op.and exclusion since we're picking a specific one
        if (where[Op.and]) delete where[Op.and];
      }
    }

    const { count, rows: posts } = await Content.findAndCountAll({
      where,
      order: [['published_at', 'DESC'], ['created_at', 'DESC']],
      limit: parseInt(limit),
      offset,
      include: [{
        model: ContentCategory,
        as: 'category',
        attributes: ['id', 'name', 'slug', 'icon']
      }]
    });

    res.json({
      categories,
      items: posts,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching public posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

// GET /api/contents/public/blog - Blog posts (excluding news categories)
router.get('/public/blog', (req, res) => listPublishedPosts(req, res, { isNews: false }));

// GET /api/contents/public/news - News posts (product-news + updates only)
router.get('/public/news', (req, res) => listPublishedPosts(req, res, { isNews: true }));

// GET /api/contents/public/blog/:slug - Get single blog post by slug
router.get('/public/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await Content.findOne({
      where: {
        type: 'blog',
        slug,
        status: 'published'
      },
      include: [{
        model: ContentCategory,
        as: 'category',
        attributes: ['id', 'name', 'slug', 'icon']
      }]
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment view count
    await post.increment('view_count');

    // Get related posts
    const relatedPosts = await Content.findAll({
      where: {
        type: 'blog',
        status: 'published',
        category_id: post.category_id,
        id: { [Op.ne]: post.id }
      },
      limit: 3,
      order: [['published_at', 'DESC']],
      attributes: ['id', 'title', 'slug', 'excerpt', 'thumbnail_url', 'published_at']
    });

    res.json({
      post,
      relatedPosts
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// ============================================
// ADMIN ROUTES (Auth required)
// ============================================

// GET /api/contents/categories - Get all categories
router.get('/categories', authenticateToken, async (req, res) => {
  try {
    const { type } = req.query;

    const where = {};
    if (type) {
      where.type = type;
    }

    const categories = await ContentCategory.findAll({
      where,
      order: [['type', 'ASC'], ['sort_order', 'ASC']],
      include: [{
        model: Content,
        as: 'contents',
        attributes: ['id']
      }]
    });

    // Add content count
    const result = categories.map(cat => ({
      ...cat.toJSON(),
      content_count: cat.contents ? cat.contents.length : 0
    }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST /api/contents/categories - Create category
router.post('/categories', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { type, name, description, icon } = req.body;

    if (!type || !name) {
      return res.status(400).json({ error: 'Type and name are required' });
    }

    // Generate slug
    const slug = generateSlug(name);

    // Check for duplicate
    const existing = await ContentCategory.findOne({
      where: { type, slug }
    });

    if (existing) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }

    // Get max sort order
    const maxOrder = await ContentCategory.max('sort_order', { where: { type } }) || 0;

    const category = await ContentCategory.create({
      type,
      name,
      slug,
      description,
      icon,
      sort_order: maxOrder + 1
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// PUT /api/contents/categories/:id - Update category
router.put('/categories/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, is_active, sort_order } = req.body;

    const category = await ContentCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const updates = {};
    if (name !== undefined) {
      updates.name = name;
      updates.slug = generateSlug(name);
    }
    if (description !== undefined) updates.description = description;
    if (icon !== undefined) updates.icon = icon;
    if (is_active !== undefined) updates.is_active = is_active;
    if (sort_order !== undefined) updates.sort_order = sort_order;

    await category.update(updates);
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// DELETE /api/contents/categories/:id - Delete category
router.delete('/categories/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const category = await ContentCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if category has contents
    const contentCount = await Content.count({ where: { category_id: id } });
    if (contentCount > 0) {
      return res.status(400).json({
        error: 'Cannot delete category with existing contents. Move or delete contents first.'
      });
    }

    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// PUT /api/contents/categories/reorder - Reorder categories
router.put('/categories/reorder', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { orders } = req.body; // [{ id: 1, sort_order: 0 }, ...]

    for (const item of orders) {
      await ContentCategory.update(
        { sort_order: item.sort_order },
        { where: { id: item.id } }
      );
    }

    res.json({ message: 'Categories reordered successfully' });
  } catch (error) {
    console.error('Error reordering categories:', error);
    res.status(500).json({ error: 'Failed to reorder categories' });
  }
});

// GET /api/contents - Get all contents (admin)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { type, category_id, status, search, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (type) where.type = type;
    if (category_id) where.category_id = category_id;
    if (status) where.status = status;
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Content.findAndCountAll({
      where,
      order: [['updated_at', 'DESC']],
      limit: parseInt(limit),
      offset,
      include: [{
        model: ContentCategory,
        as: 'category',
        attributes: ['id', 'name', 'slug', 'icon']
      }]
    });

    res.json({
      items: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching contents:', error);
    res.status(500).json({ error: 'Failed to fetch contents' });
  }
});

// GET /api/contents/:id - Get single content
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findByPk(id, {
      include: [{
        model: ContentCategory,
        as: 'category',
        attributes: ['id', 'name', 'slug', 'icon', 'type']
      }]
    });

    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// POST /api/contents - Create content
router.post('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { type, category_id, title, content, excerpt, thumbnail_url, status,
            seo_title, seo_description, seo_keywords, og_image_url, ai_summary } = req.body;

    if (!type || !category_id || !title || !content) {
      return res.status(400).json({ error: 'Type, category, title, and content are required' });
    }

    // Verify category exists and matches type
    const category = await ContentCategory.findByPk(category_id);
    if (!category || category.type !== type) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Generate slug for blog posts
    let slug = null;
    if (type === 'blog') {
      slug = generateSlug(title);
      // Ensure unique slug
      const existing = await Content.findOne({ where: { type: 'blog', slug } });
      if (existing) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    // Get max sort order in category
    const maxOrder = await Content.max('sort_order', { where: { category_id } }) || 0;

    const newContent = await Content.create({
      type,
      category_id,
      title,
      slug,
      content,
      excerpt,
      thumbnail_url,
      status: status || 'draft',
      sort_order: maxOrder + 1,
      author_id: req.user.id,
      author_name: req.user.full_name || req.user.email,
      published_at: status === 'published' ? new Date() : null,
      // SEO/AEO fields
      seo_title,
      seo_description,
      seo_keywords,
      og_image_url,
      ai_summary
    });

    res.status(201).json(newContent);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
});

// PUT /api/contents/:id - Update content
router.put('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, title, content, excerpt, thumbnail_url, status, sort_order,
            seo_title, seo_description, seo_keywords, og_image_url, ai_summary } = req.body;

    const existingContent = await Content.findByPk(id);
    if (!existingContent) {
      return res.status(404).json({ error: 'Content not found' });
    }

    const updates = {};
    if (category_id !== undefined) updates.category_id = category_id;
    if (title !== undefined) {
      updates.title = title;
      if (existingContent.type === 'blog') {
        updates.slug = generateSlug(title);
      }
    }
    if (content !== undefined) updates.content = content;
    if (excerpt !== undefined) updates.excerpt = excerpt;
    if (thumbnail_url !== undefined) updates.thumbnail_url = thumbnail_url;
    if (sort_order !== undefined) updates.sort_order = sort_order;

    // SEO/AEO fields
    if (seo_title !== undefined) updates.seo_title = seo_title;
    if (seo_description !== undefined) updates.seo_description = seo_description;
    if (seo_keywords !== undefined) updates.seo_keywords = seo_keywords;
    if (og_image_url !== undefined) updates.og_image_url = og_image_url;
    if (ai_summary !== undefined) updates.ai_summary = ai_summary;

    if (status !== undefined) {
      updates.status = status;
      if (status === 'published' && !existingContent.published_at) {
        updates.published_at = new Date();
      }
    }

    await existingContent.update(updates);

    // Reload with category
    await existingContent.reload({
      include: [{
        model: ContentCategory,
        as: 'category',
        attributes: ['id', 'name', 'slug', 'icon']
      }]
    });

    res.json(existingContent);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// DELETE /api/contents/:id - Delete content
router.delete('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    await content.destroy();
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ error: 'Failed to delete content' });
  }
});

// PUT /api/contents/:id/publish - Publish content
router.put('/:id/publish', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    await content.update({
      status: 'published',
      published_at: content.published_at || new Date()
    });

    res.json(content);
  } catch (error) {
    console.error('Error publishing content:', error);
    res.status(500).json({ error: 'Failed to publish content' });
  }
});

// PUT /api/contents/:id/unpublish - Unpublish content
router.put('/:id/unpublish', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    await content.update({ status: 'draft' });
    res.json(content);
  } catch (error) {
    console.error('Error unpublishing content:', error);
    res.status(500).json({ error: 'Failed to unpublish content' });
  }
});

// Set up model associations
Content.belongsTo(ContentCategory, { as: 'category', foreignKey: 'category_id' });
ContentCategory.hasMany(Content, { as: 'contents', foreignKey: 'category_id' });

module.exports = router;
