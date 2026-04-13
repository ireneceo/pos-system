#!/usr/bin/env node
/**
 * Create release content for both landing blog and admin notice.
 *
 * Usage:
 *   node scripts/create-release-post.js --input=/path/to/release.json
 *   cat release.json | node scripts/create-release-post.js --stdin [--sync-prod]
 *
 * Input JSON format:
 * {
 *   "version": "3.13",
 *   "date": "2026-04-12",
 *   "landing": {
 *     "title": "PurpleHere POS v3.13 Update",
 *     "content": "## What's New\n- Feature 1\n- Feature 2"
 *   },
 *   "notice": {
 *     "title": "PurpleHere POS Update v3.13",
 *     "content_en": "1️⃣ Feature A\n\nDetails...\n\n2️⃣ Feature B\n...",
 *     "content_ko": "1️⃣ 기능 A\n\n설명...\n\n2️⃣ 기능 B\n..."
 *   }
 * }
 *
 * What it does:
 * 1. Landing blog post (English only):
 *    - Ensures ContentCategory slug='updates' exists
 *    - Creates/updates Content with slug=`release-v{version}`, type='blog'
 * 2. Admin notice (bilingual):
 *    - Creates Notice with category='updates', target_type='all', author_role='System Admin'
 *    - Content format: English + ━━━━━━━━━━━━━━━━━━ + Korean
 *    - Also creates NoticeRecipient rows so all users see it
 * 3. Optionally syncs to production via SSH (--sync-prod)
 */

require('dotenv').config();
const fs = require('fs');
const { execSync } = require('child_process');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const ContentCategory = require('../models/ContentCategory');
const Content = require('../models/Content');
const Notice = require('../models/Notice');
const NoticeRecipient = require('../models/NoticeRecipient');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

const SEPARATOR = '━━━━━━━━━━━━━━━━━━';

const args = process.argv.slice(2);
const useStdin = args.includes('--stdin');
const inputArg = args.find(a => a.startsWith('--input='));
const syncProd = args.includes('--sync-prod');

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMd(s) {
  let r = escapeHtml(s);
  r = r.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  r = r.replace(/`([^`]+)`/g, '<code>$1</code>');
  return r;
}

function markdownToHtml(md) {
  if (!md) return '';
  if (/<[a-z][\s\S]*>/i.test(md) && !md.trim().startsWith('#') && !md.trim().startsWith('-')) {
    return md;
  }
  const lines = md.split('\n');
  const out = [];
  let inList = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push('');
      continue;
    }
    if (trimmed.startsWith('### ')) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<h3>${escapeHtml(trimmed.substring(4))}</h3>`);
    } else if (trimmed.startsWith('## ')) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<h2>${escapeHtml(trimmed.substring(3))}</h2>`);
    } else if (trimmed.startsWith('# ')) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<h1>${escapeHtml(trimmed.substring(2))}</h1>`);
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inlineMd(trimmed.substring(2))}</li>`);
    } else {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<p>${inlineMd(trimmed)}</p>`);
    }
  }
  if (inList) out.push('</ul>');
  return out.join('\n');
}

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/**
 * Format current wall time in the site's configured timezone as a MySQL DATETIME string.
 * This is the "local time in site TZ" approach used throughout the codebase per CLAUDE.md
 * rule: all date/time displays use the restaurant/site configured timezone.
 *
 * Example: if site TZ = Asia/Kuala_Lumpur and current UTC = 2026-04-12 20:03:04,
 * returns "2026-04-13 04:03:04" (wall clock in MYT).
 */
async function getSiteLocalNow() {
  const CompanySettings = require('../models/CompanySettings');
  let tz = 'Asia/Kuala_Lumpur';
  try {
    const s = await CompanySettings.findOne({ where: { id: 1 }, attributes: ['timezone'] });
    if (s?.timezone) tz = s.timezone;
  } catch (e) { /* use default */ }

  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
  const parts = formatter.formatToParts(now);
  const get = (type) => parts.find(p => p.type === type)?.value || '00';
  const hour = get('hour') === '24' ? '00' : get('hour');
  return new Date(`${get('year')}-${get('month')}-${get('day')}T${hour}:${get('minute')}:${get('second')}`);
}

async function main() {
  let raw;
  if (useStdin) {
    raw = fs.readFileSync(0, 'utf-8');
  } else if (inputArg) {
    raw = fs.readFileSync(inputArg.split('=')[1], 'utf-8');
  } else {
    console.error('Usage: create-release-post.js --input=<file> | --stdin [--sync-prod]');
    process.exit(1);
  }

  let data;
  try { data = JSON.parse(raw); }
  catch (e) { console.error('✗ Invalid JSON:', e.message); process.exit(1); }

  const { version, landing, notice } = data;
  if (!version || !landing || !notice) {
    console.error('✗ Missing required fields: version, landing, notice');
    process.exit(1);
  }

  // Always use current server time expressed as wall clock in site timezone.
  // Do NOT accept a hardcoded date from JSON — causes off-by-one-day issues when
  // server UTC is ahead of admin's timezone.
  const publishedAt = await getSiteLocalNow();

  // ========== 1. Landing blog post (English only) ==========
  console.log('→ Creating landing blog post...');

  let category = await ContentCategory.findOne({ where: { type: 'blog', slug: 'updates' } });
  if (!category) {
    category = await ContentCategory.create({
      type: 'blog',
      name: 'Updates',
      slug: 'updates',
      description: 'Product release notes and updates',
      icon: '📢',
      sort_order: 0,
      is_active: true
    });
    console.log(`✓ Created "updates" blog category (id=${category.id})`);
  } else {
    console.log(`✓ Category exists: ${category.name} (id=${category.id})`);
  }

  const blogSlug = `release-v${version}`;
  const htmlContent = markdownToHtml(landing.content);
  const excerpt = landing.excerpt || stripHtml(htmlContent).substring(0, 200);

  const existingBlog = await Content.findOne({ where: { slug: blogSlug, type: 'blog' } });
  let blogId;
  if (existingBlog) {
    await existingBlog.update({
      category_id: category.id,
      title: landing.title,
      content: htmlContent,
      excerpt,
      status: 'published',
      published_at: publishedAt
    });
    blogId = existingBlog.id;
    console.log(`✓ Updated blog post: ${blogSlug} (id=${blogId})`);
  } else {
    const newPost = await Content.create({
      category_id: category.id,
      type: 'blog',
      status: 'published',
      title: landing.title,
      slug: blogSlug,
      content: htmlContent,
      excerpt,
      published_at: publishedAt,
      author_name: 'PurpleHere Team',
      sort_order: 0
    });
    blogId = newPost.id;
    console.log(`✓ Created blog post: ${blogSlug} (id=${blogId})`);
  }

  // ========== 2. Admin notice (bilingual EN + KO) ==========
  console.log('\n→ Creating admin notice...');

  if (!notice.content_en || !notice.content_ko) {
    console.error('✗ notice.content_en and notice.content_ko are required');
    process.exit(1);
  }

  const noticeContent = `${notice.content_en}\n\n${SEPARATOR}\n\n${notice.content_ko}`;

  // Find system admin user
  const admin = await User.findOne({ where: { role: 'System Admin' } });
  if (!admin) {
    console.error('✗ No System Admin user found');
    process.exit(1);
  }

  // Check if notice for this version already exists (by title)
  const noticeTitle = notice.title;
  const existingNotice = await Notice.findOne({ where: { title: noticeTitle, author_id: admin.id } });
  let noticeId;
  if (existingNotice) {
    await existingNotice.update({
      content: noticeContent,
      category: 'updates',
      priority: 'normal',
      status: 'published'
    });
    noticeId = existingNotice.id;
    console.log(`✓ Updated notice: "${noticeTitle}" (id=${noticeId})`);
  } else {
    const newNotice = await Notice.create({
      title: noticeTitle,
      content: noticeContent,
      author_id: admin.id,
      author_name: admin.full_name || admin.email,
      author_role: 'System Admin',
      target_type: 'all',
      category: 'updates',
      priority: 'normal',
      status: 'published'
    });
    noticeId = newNotice.id;
    console.log(`✓ Created notice: "${noticeTitle}" (id=${noticeId})`);

    // Create recipients for all restaurants + all user roles
    const recipients = [];
    const allRestaurants = await Restaurant.findAll({ where: { is_demo: false, is_test: false }, attributes: ['id'] });
    allRestaurants.forEach(r => recipients.push({ notice_id: newNotice.id, restaurant_id: r.id }));

    const allRoleUsers = await User.findAll({
      where: { role: { [Op.in]: ['System Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner'] }, is_demo: false, is_test: false },
      attributes: ['id']
    });
    allRoleUsers.forEach(u => recipients.push({ notice_id: newNotice.id, user_id: u.id }));

    if (recipients.length > 0) {
      await NoticeRecipient.bulkCreate(recipients);
      console.log(`✓ Created ${recipients.length} notice recipients`);
    }
  }

  console.log(`\n✓ Release content ready (dev DB):`);
  console.log(`  - Blog post: /blog/${blogSlug}`);
  console.log(`  - Notice id: ${noticeId}`);

  // ========== 3. Sync to production ==========
  if (syncProd) {
    console.log('\n→ Syncing to production DB via SSH...');
    try {
      await syncToProd({ category, blogId, noticeId, version });
      console.log('✓ Production sync complete');
    } catch (e) {
      console.error('✗ Production sync failed:', e.message);
      process.exit(2);
    }
  }

  process.exit(0);
}

async function syncToProd({ category, blogId, noticeId, version }) {
  const blog = await Content.findByPk(blogId);
  const noticeRow = await Notice.findByPk(noticeId);

  // Convert Date objects to MySQL DATETIME strings (YYYY-MM-DD HH:MM:SS)
  // MySQL strict mode rejects ISO 8601 with 'T' separator.
  const toMysqlDatetime = (d) => {
    if (!d) return null;
    const dt = d instanceof Date ? d : new Date(d);
    if (isNaN(dt.getTime())) return null;
    const pad = (n) => String(n).padStart(2, '0');
    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(dt.getMinutes())}:${pad(dt.getSeconds())}`;
  };

  const payload = {
    category: {
      name: category.name, slug: category.slug, type: category.type,
      icon: category.icon, description: category.description,
      is_active: category.is_active, sort_order: category.sort_order
    },
    blog: {
      title: blog.title, slug: blog.slug, type: blog.type, status: blog.status,
      content: blog.content, excerpt: blog.excerpt,
      author_name: blog.author_name, published_at: toMysqlDatetime(blog.published_at), sort_order: blog.sort_order
    },
    notice: {
      title: noticeRow.title, content: noticeRow.content,
      author_name: noticeRow.author_name, author_role: noticeRow.author_role,
      target_type: noticeRow.target_type, category: noticeRow.category,
      priority: noticeRow.priority, status: noticeRow.status
    }
  };

  const tmpFile = `/tmp/release-sync-${Date.now()}.json`;
  fs.writeFileSync(tmpFile, JSON.stringify(payload));

  const PROD_SERVER = 'irene@87.106.78.146';
  execSync(`scp -q ${tmpFile} ${PROD_SERVER}:${tmpFile}`, { stdio: 'inherit' });

  // Remote script MUST run from inside /var/www/production-backend so that
  // require('dotenv') and models resolve via local node_modules. Placing the
  // script file inside that directory ensures correct module resolution.
  const localRemoteScriptPath = `/tmp/release-sync-remote-${Date.now()}.js`;
  const remoteScriptPath = `/var/www/production-backend/release-sync-remote-${Date.now()}.js`;
  const remoteCode = `
require('dotenv').config();
const fs = require('fs');
const { Op } = require('sequelize');
const { sequelize } = require('./config/database');
const Notice = require('./models/Notice');
const NoticeRecipient = require('./models/NoticeRecipient');
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');

(async () => {
  const data = JSON.parse(fs.readFileSync('${tmpFile}', 'utf8'));

  // Ensure ENUM supports 'updates' category (idempotent)
  try {
    await sequelize.query("ALTER TABLE notices MODIFY COLUMN category ENUM('general','guide','updates') DEFAULT 'general'");
    console.log('Notice category ENUM updated');
  } catch (e) { console.log('ENUM update skipped:', e.message); }

  // Upsert blog category
  const [catRows] = await sequelize.query('SELECT id FROM content_categories WHERE slug=? AND type=?', { replacements: [data.category.slug, data.category.type] });
  let catId;
  if (catRows.length > 0) {
    catId = catRows[0].id;
    await sequelize.query('UPDATE content_categories SET name=?, icon=?, description=?, is_active=?, sort_order=?, updated_at=NOW() WHERE id=?',
      { replacements: [data.category.name, data.category.icon, data.category.description, data.category.is_active, data.category.sort_order, catId] });
  } else {
    const [,result] = await sequelize.query('INSERT INTO content_categories (name, slug, type, icon, description, is_active, sort_order, created_at, updated_at) VALUES (?,?,?,?,?,?,?,NOW(),NOW())',
      { replacements: [data.category.name, data.category.slug, data.category.type, data.category.icon, data.category.description, data.category.is_active, data.category.sort_order] });
    const [rows2] = await sequelize.query('SELECT id FROM content_categories WHERE slug=? AND type=?', { replacements: [data.category.slug, data.category.type] });
    catId = rows2[0].id;
  }
  console.log('Blog category id on prod:', catId);

  // Upsert blog post
  const b = data.blog;
  const [existing] = await sequelize.query('SELECT id FROM contents WHERE slug=? AND type=?', { replacements: [b.slug, b.type] });
  if (existing.length > 0) {
    await sequelize.query('UPDATE contents SET category_id=?, title=?, content=?, excerpt=?, status=?, author_name=?, published_at=?, sort_order=?, updated_at=NOW() WHERE slug=? AND type=?',
      { replacements: [catId, b.title, b.content, b.excerpt, b.status, b.author_name, b.published_at, b.sort_order, b.slug, b.type] });
    console.log('Updated blog:', b.slug);
  } else {
    await sequelize.query('INSERT INTO contents (category_id, type, status, title, slug, content, excerpt, author_name, published_at, sort_order, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,NOW(),NOW())',
      { replacements: [catId, b.type, b.status, b.title, b.slug, b.content, b.excerpt, b.author_name, b.published_at, b.sort_order] });
    console.log('Created blog:', b.slug);
  }

  // Upsert notice
  const n = data.notice;
  const admin = await User.findOne({ where: { role: 'System Admin' } });
  if (!admin) { console.error('No System Admin on prod'); process.exit(1); }

  const existingNotice = await Notice.findOne({ where: { title: n.title, author_id: admin.id } });
  if (existingNotice) {
    await existingNotice.update({ content: n.content, category: n.category, priority: n.priority, status: n.status });
    console.log('Updated notice:', n.title);
  } else {
    const created = await Notice.create({
      title: n.title, content: n.content,
      author_id: admin.id, author_name: admin.full_name || admin.email,
      author_role: n.author_role, target_type: n.target_type,
      category: n.category, priority: n.priority, status: n.status
    });
    const recipients = [];
    const allRestaurants = await Restaurant.findAll({ where: { is_demo: false, is_test: false }, attributes: ['id'] });
    allRestaurants.forEach(r => recipients.push({ notice_id: created.id, restaurant_id: r.id }));
    const allRoleUsers = await User.findAll({
      where: { role: { [Op.in]: ['System Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner'] }, is_demo: false, is_test: false },
      attributes: ['id']
    });
    allRoleUsers.forEach(u => recipients.push({ notice_id: created.id, user_id: u.id }));
    if (recipients.length > 0) await NoticeRecipient.bulkCreate(recipients);
    console.log('Created notice:', n.title, 'with', recipients.length, 'recipients');
  }

  fs.unlinkSync('${tmpFile}');
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
`;

  fs.writeFileSync(localRemoteScriptPath, remoteCode);
  execSync(`scp -q ${localRemoteScriptPath} ${PROD_SERVER}:${remoteScriptPath}`, { stdio: 'inherit' });
  execSync(`ssh ${PROD_SERVER} "cd /var/www/production-backend && node ${remoteScriptPath} && rm ${remoteScriptPath}"`, { stdio: 'inherit' });
  fs.unlinkSync(localRemoteScriptPath);
  fs.unlinkSync(tmpFile);
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
