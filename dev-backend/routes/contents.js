const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const ContentCategory = require('../models/ContentCategory');
const Content = require('../models/Content');
const { authenticateToken, requireRole, optionalAuthenticateToken } = require('../middleware/auth');

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

// Supported languages and default fallback
const SUPPORTED_LANGS = ['en', 'ms', 'zh', 'ko'];
const DEFAULT_LANG = 'en';

function normalizeLang(lang) {
  const l = (lang || '').toLowerCase().trim();
  return SUPPORTED_LANGS.includes(l) ? l : DEFAULT_LANG;
}

// Admin-only marketing assets — never expose to public API responses.
// Frontend gates rendering behind `isSystemAdmin`, but the JSON payload itself
// must not carry these fields to anonymous visitors (DevTools / crawlers).
// When a System Admin is the requester (token present + role check), we keep them
// so the Distribution Kit can render on the public blog page.
const ADMIN_ONLY_FIELDS = ['video_prompt', 'social_post', 'thumbnail_copy', 'video_script', 'social_captions'];

function isSystemAdmin(req) {
  return !!(req.user && req.user.role === 'System Admin');
}

function stripAdminFields(post, req) {
  if (!post) return post;
  const obj = typeof post.toJSON === 'function' ? post.toJSON() : { ...post };
  if (req && isSystemAdmin(req)) return obj;  // Admin sees everything
  for (const f of ADMIN_ONLY_FIELDS) delete obj[f];
  return obj;
}

// GET /api/contents/public/faq - Get all published FAQ items (multilingual)
router.get('/public/faq', async (req, res) => {
  try {
    const { category } = req.query;
    const lang = normalizeLang(req.query.lang);

    const categories = await ContentCategory.findAll({
      where: { type: 'faq', is_active: true },
      order: [['sort_order', 'ASC']]
    });

    // Strategy: fetch target language items + fallback to EN for items without translation
    const where = { type: 'faq', status: 'published' };
    if (category && category !== 'all') {
      const cat = categories.find(c => c.slug === category);
      if (cat) where.category_id = cat.id;
    }

    // 1) Fetch items in target language
    const targetItems = await Content.findAll({
      where: { ...where, language: lang },
      order: [['sort_order', 'ASC'], ['created_at', 'DESC']],
      include: [{ model: ContentCategory, as: 'category', attributes: ['id', 'name', 'slug', 'icon'] }]
    });

    // 2) Identify translation_group_ids already covered in target language
    const coveredGroups = new Set(targetItems.filter(i => i.translation_group_id).map(i => i.translation_group_id));

    // 3) If requested lang != en, fetch EN items NOT covered by target lang (fallback)
    let fallbackItems = [];
    if (lang !== DEFAULT_LANG) {
      fallbackItems = await Content.findAll({
        where: {
          ...where,
          language: DEFAULT_LANG,
          [Op.or]: [
            { translation_group_id: null },
            { translation_group_id: { [Op.notIn]: Array.from(coveredGroups).length ? Array.from(coveredGroups) : [0] } }
          ]
        },
        order: [['sort_order', 'ASC'], ['created_at', 'DESC']],
        include: [{ model: ContentCategory, as: 'category', attributes: ['id', 'name', 'slug', 'icon'] }]
      });
      // Mark fallback items
      fallbackItems = fallbackItems.map(i => { const j = i.toJSON(); j._is_fallback = true; return j; });
    }

    res.json({
      categories,
      items: [...targetItems.map(i => i.toJSON()), ...fallbackItems],
      language: lang,
      supported_languages: SUPPORTED_LANGS
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
    const lang = normalizeLang(req.query.lang);
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Multi-select support: personas=a,b / problems=c,d (comma-separated)
    // Backward-compat: still accepts singular persona/problem params.
    const personaRaw = req.query.personas || req.query.persona || '';
    const problemRaw = req.query.problems || req.query.problem || '';
    const personaVals = personaRaw.split(',').map(s => s.trim()).filter(Boolean);
    const problemVals = problemRaw.split(',').map(s => s.trim()).filter(Boolean);

    // Strategy: fetch target language + fallback to EN for translation_groups without target-lang version
    const baseWhere = {
      type: 'blog',
      status: 'published'
    };
    if (personaVals.length === 1) baseWhere.target_persona = personaVals[0];
    else if (personaVals.length > 1) baseWhere.target_persona = { [Op.in]: personaVals };
    if (problemVals.length === 1) baseWhere.problem_category = problemVals[0];
    else if (problemVals.length > 1) baseWhere.problem_category = { [Op.in]: problemVals };

    const where = { ...baseWhere, language: lang };

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

    // 1) Fetch posts in requested language
    const targetPosts = await Content.findAll({
      where,
      order: [['published_at', 'DESC'], ['created_at', 'DESC']],
      include: [{ model: ContentCategory, as: 'category', attributes: ['id', 'name', 'slug', 'icon'] }]
    });

    // 2) If lang != en, add EN-fallback posts whose translation_group is NOT covered in target
    //    Must inherit the same news/non-news + category filters as the main query.
    let fallbackPosts = [];
    if (lang !== DEFAULT_LANG) {
      const coveredGroups = new Set(targetPosts.filter(p => p.translation_group_id).map(p => p.translation_group_id));
      const coveredOrphanIds = new Set(targetPosts.filter(p => !p.translation_group_id).map(p => p.id));
      // Start from the SAME scope as main query (news/non-news + category) but swap language to EN
      const fallbackWhere = { ...where, language: DEFAULT_LANG };
      // Merge translation-coverage exclusion with existing Op.and (news exclusion may already set one)
      const coverageClause = {
        [Op.or]: [
          { translation_group_id: null, id: { [Op.notIn]: Array.from(coveredOrphanIds).length ? Array.from(coveredOrphanIds) : [0] } },
          { translation_group_id: { [Op.notIn]: Array.from(coveredGroups).length ? Array.from(coveredGroups) : [0] } }
        ]
      };
      if (fallbackWhere[Op.and]) {
        fallbackWhere[Op.and] = [...fallbackWhere[Op.and], coverageClause];
      } else {
        fallbackWhere[Op.and] = [coverageClause];
      }
      fallbackPosts = await Content.findAll({
        where: fallbackWhere,
        order: [['published_at', 'DESC'], ['created_at', 'DESC']],
        include: [{ model: ContentCategory, as: 'category', attributes: ['id', 'name', 'slug', 'icon'] }]
      });
      fallbackPosts = fallbackPosts.map(p => { const j = p.toJSON(); j._is_fallback = true; return j; });
    }

    // 3) Combine + manual pagination
    const allItems = [...targetPosts.map(p => p.toJSON()), ...fallbackPosts];
    const count = allItems.length;
    const posts = allItems.slice(offset, offset + parseInt(limit)).map(p => stripAdminFields(p, req));

    // Aggregate available tags (persona + problem) for filter UI — within current scope
    const tagWhere = { ...where };
    delete tagWhere.target_persona;
    delete tagWhere.problem_category;
    const personaCounts = await Content.findAll({
      where: { ...tagWhere, target_persona: { [Op.ne]: null } },
      attributes: ['target_persona', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['target_persona'],
      raw: true
    });
    const problemCounts = await Content.findAll({
      where: { ...tagWhere, problem_category: { [Op.ne]: null } },
      attributes: ['problem_category', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['problem_category'],
      raw: true
    });

    res.json({
      categories,
      items: posts,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / parseInt(limit))
      },
      available_tags: {
        persona: personaCounts,
        problem: problemCounts
      }
    });
  } catch (error) {
    console.error('Error fetching public posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

// GET /api/contents/public/blog - Blog posts (excluding news categories)
router.get('/public/blog', optionalAuthenticateToken, (req, res) => listPublishedPosts(req, res, { isNews: false }));

// GET /api/contents/public/news - News posts (product-news + updates only)
router.get('/public/news', optionalAuthenticateToken, (req, res) => listPublishedPosts(req, res, { isNews: true }));

// GET /api/contents/public/blog/:slug - Get single blog post by slug (multilingual)
router.get('/public/blog/:slug', optionalAuthenticateToken, async (req, res) => {
  try {
    const { slug } = req.params;
    const lang = normalizeLang(req.query.lang);

    // 1) Try exact (slug, language) match
    let post = await Content.findOne({
      where: { type: 'blog', slug, status: 'published', language: lang },
      include: [{ model: ContentCategory, as: 'category', attributes: ['id', 'name', 'slug', 'icon'] }]
    });

    let isFallback = false;

    // 2) Slug→group resolution (runs for ALL languages including EN)
    //    Handles: user landed on MS/ZH slug but switched UI to EN — still return the correct post
    //    via translation_group. Frontend will then navigate to the matching slug.
    if (!post) {
      const anyLangPost = await Content.findOne({
        where: { type: 'blog', slug, status: 'published' }
      });
      if (anyLangPost && anyLangPost.translation_group_id) {
        // Try requested language within the same translation group
        const targetInGroup = await Content.findOne({
          where: {
            type: 'blog',
            status: 'published',
            language: lang,
            translation_group_id: anyLangPost.translation_group_id
          },
          include: [{ model: ContentCategory, as: 'category', attributes: ['id', 'name', 'slug', 'icon'] }]
        });
        if (targetInGroup) {
          // Not a fallback — user got their requested language, just on a different slug.
          post = targetInGroup;
        } else if (lang !== DEFAULT_LANG) {
          // Requested lang not available → fallback to EN within group
          post = await Content.findOne({
            where: {
              type: 'blog',
              status: 'published',
              language: DEFAULT_LANG,
              translation_group_id: anyLangPost.translation_group_id
            },
            include: [{ model: ContentCategory, as: 'category', attributes: ['id', 'name', 'slug', 'icon'] }]
          });
          if (post) isFallback = true;
        }
      }
      // Last resort: exact slug + EN match (handles legacy orphan posts without translation_group)
      if (!post && lang !== DEFAULT_LANG) {
        post = await Content.findOne({
          where: { type: 'blog', slug, status: 'published', language: DEFAULT_LANG },
          include: [{ model: ContentCategory, as: 'category', attributes: ['id', 'name', 'slug', 'icon'] }]
        });
        if (post) isFallback = true;
      }
    }

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment view count
    await post.increment('view_count');

    // Find all available languages for this translation group
    let availableLanguages = [post.language];
    let translations = [];
    if (post.translation_group_id) {
      const siblings = await Content.findAll({
        where: {
          translation_group_id: post.translation_group_id,
          status: 'published',
          type: 'blog'
        },
        attributes: ['id', 'language', 'slug', 'title']
      });
      availableLanguages = siblings.map(s => s.language);
      translations = siblings.map(s => ({ language: s.language, slug: s.slug, title: s.title }));
    }

    // Related posts (same category + same language)
    const relatedPosts = await Content.findAll({
      where: {
        type: 'blog',
        status: 'published',
        language: post.language,
        category_id: post.category_id,
        id: { [Op.ne]: post.id }
      },
      limit: 3,
      order: [['published_at', 'DESC']],
      attributes: ['id', 'title', 'slug', 'excerpt', 'thumbnail_url', 'published_at']
    });

    res.json({
      post: stripAdminFields(post, req),
      relatedPosts,
      requested_language: lang,
      is_fallback: isFallback,
      available_languages: availableLanguages,
      translations
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
            seo_title, seo_description, seo_keywords, og_image_url, ai_summary,
            language, translation_group_id, target_persona, funnel_stage, content_tier,
            problem_category, video_script, thumbnail_copy, social_captions,
            video_prompt, social_post,
            slug: providedSlug } = req.body;

    if (!type || !category_id || !title || !content) {
      return res.status(400).json({ error: 'Type, category, title, and content are required' });
    }

    const lang = normalizeLang(language);

    // Verify category exists and matches type
    const category = await ContentCategory.findByPk(category_id);
    if (!category || category.type !== type) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Slug handling (unique per language)
    let slug = providedSlug || null;
    if (type === 'blog') {
      slug = slug || generateSlug(title);
      // Ensure (slug, language) is unique
      const existing = await Content.findOne({ where: { type: 'blog', slug, language: lang } });
      if (existing) {
        slug = `${slug}-${Date.now()}`;
      }
    }

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
      seo_title,
      seo_description,
      seo_keywords,
      og_image_url,
      ai_summary,
      language: lang,
      translation_group_id: translation_group_id || null,
      target_persona: target_persona || null,
      funnel_stage: funnel_stage || null,
      content_tier: content_tier || null,
      problem_category: problem_category || null,
      video_script: video_script || null,
      thumbnail_copy: thumbnail_copy || null,
      social_captions: social_captions || null,
      video_prompt: video_prompt || null,
      social_post: social_post || null
    });

    res.status(201).json(newContent);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
});

// POST /api/contents/bulk - Create translation group (multiple languages in one shot)
// Body: { type, category_id, target_persona, funnel_stage, content_tier, problem_category, status,
//         translations: { en: {...}, ms: {...}, zh: {...} } }
// Each translation has: title, content, slug, excerpt, thumbnail_url, seo_title, seo_description,
//   seo_keywords, ai_summary, video_script, thumbnail_copy, social_captions
router.post('/bulk', authenticateToken, requireRole('System Admin'), async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { type, category_id, target_persona, funnel_stage, content_tier, problem_category, status = 'draft', translations } = req.body;

    if (!type || !category_id || !translations || typeof translations !== 'object') {
      await t.rollback();
      return res.status(400).json({ error: 'type, category_id, translations required' });
    }

    const langKeys = Object.keys(translations).filter(l => SUPPORTED_LANGS.includes(l));
    if (langKeys.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: 'No valid languages in translations' });
    }

    // Category check
    const category = await ContentCategory.findByPk(category_id);
    if (!category || category.type !== type) {
      await t.rollback();
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Generate translation_group_id: use next available integer (max + 1)
    const maxGroupId = await Content.max('translation_group_id') || 0;
    const groupId = maxGroupId + 1;

    const maxOrder = await Content.max('sort_order', { where: { category_id } }) || 0;
    const publishedAt = status === 'published' ? new Date() : null;

    const createdRows = [];
    for (const lang of langKeys) {
      const tr = translations[lang];
      if (!tr.title || !tr.content) {
        await t.rollback();
        return res.status(400).json({ error: `Language ${lang}: title and content required` });
      }

      // Slug unique per language
      let slug = tr.slug || (type === 'blog' ? generateSlug(tr.title) : null);
      if (type === 'blog') {
        const existing = await Content.findOne({
          where: { type: 'blog', slug, language: lang },
          transaction: t
        });
        if (existing) slug = `${slug}-${Date.now()}`;
      }

      const row = await Content.create({
        type,
        category_id,
        title: tr.title,
        slug,
        content: tr.content,
        excerpt: tr.excerpt || null,
        thumbnail_url: tr.thumbnail_url || null,
        status,
        sort_order: maxOrder + 1,
        author_id: req.user.id,
        author_name: req.user.full_name || req.user.email,
        published_at: publishedAt,
        seo_title: tr.seo_title || null,
        seo_description: tr.seo_description || null,
        seo_keywords: tr.seo_keywords || null,
        ai_summary: tr.ai_summary || null,
        og_image_url: tr.og_image_url || null,
        language: lang,
        translation_group_id: groupId,
        target_persona: target_persona || null,
        funnel_stage: funnel_stage || null,
        content_tier: content_tier || null,
        problem_category: problem_category || null,
        video_script: tr.video_script || null,
        thumbnail_copy: tr.thumbnail_copy || null,
        social_captions: tr.social_captions || null,
        video_prompt: tr.video_prompt || null,
        social_post: tr.social_post || null
      }, { transaction: t });

      createdRows.push(row);
    }

    await t.commit();
    res.status(201).json({
      translation_group_id: groupId,
      rows: createdRows,
      languages: langKeys
    });
  } catch (error) {
    await t.rollback();
    console.error('Error creating bulk content:', error);
    res.status(500).json({ error: 'Failed to create bulk content: ' + error.message });
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

    // Multilingual + marketing fields
    const { language, translation_group_id, target_persona, funnel_stage, content_tier,
            problem_category, video_script, thumbnail_copy, social_captions,
            video_prompt, social_post } = req.body;
    if (language !== undefined) updates.language = normalizeLang(language);
    if (translation_group_id !== undefined) updates.translation_group_id = translation_group_id;
    if (target_persona !== undefined) updates.target_persona = target_persona;
    if (funnel_stage !== undefined) updates.funnel_stage = funnel_stage;
    if (content_tier !== undefined) updates.content_tier = content_tier;
    if (problem_category !== undefined) updates.problem_category = problem_category;
    if (video_script !== undefined) updates.video_script = video_script;
    if (thumbnail_copy !== undefined) updates.thumbnail_copy = thumbnail_copy;
    if (social_captions !== undefined) updates.social_captions = social_captions;
    if (video_prompt !== undefined) updates.video_prompt = video_prompt;
    if (social_post !== undefined) updates.social_post = social_post;

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
