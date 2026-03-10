/**
 * 기존 DB base64 이미지를 고정 파일로 마이그레이션
 * 실행: cd /var/www/dev-backend && node scripts/migrate-logos-to-files.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Sequelize } = require('sequelize');
const { saveImageToFile } = require('../utils/imageProcessor');

const seq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: false
});

async function migrate() {
  try {
    const [[settings]] = await seq.query('SELECT id, brand_logo, favicon_url FROM company_settings LIMIT 1');
    if (!settings) {
      console.log('No company_settings found.');
      return;
    }

    let updates = {};

    // brand_logo
    if (settings.brand_logo && settings.brand_logo.startsWith('data:image/')) {
      const url = await saveImageToFile(settings.brand_logo, 'brand-logo', { maxWidth: 400, maxHeight: 400 });
      if (url) {
        updates.brand_logo = url;
        console.log('brand_logo saved to', url);
      }
    } else if (settings.brand_logo) {
      console.log('brand_logo already a path:', settings.brand_logo.substring(0, 60));
    }

    // favicon_url
    if (settings.favicon_url && settings.favicon_url.startsWith('data:image/')) {
      const url = await saveImageToFile(settings.favicon_url, 'favicon', { maxWidth: 64, maxHeight: 64 });
      if (url) {
        updates.favicon_url = url;
        console.log('favicon_url saved to', url);
      }
    } else if (settings.favicon_url) {
      console.log('favicon_url already a path:', settings.favicon_url.substring(0, 60));
    }

    if (Object.keys(updates).length > 0) {
      const setClauses = Object.entries(updates).map(([k]) => `${k} = ?`).join(', ');
      const values = [...Object.values(updates), settings.id];
      await seq.query(`UPDATE company_settings SET ${setClauses} WHERE id = ?`, { replacements: values });
      console.log('DB updated successfully.');
    } else {
      console.log('Nothing to migrate.');
    }
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await seq.close();
  }
}

migrate();
