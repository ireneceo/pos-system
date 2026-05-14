/**
 * v3.31 Migration — Drop legacy `users.push_preferences` column.
 *
 * Context:
 *   v3.30 made `notification_preferences` the single source of truth for category
 *   toggles (covers both email + push). `push_preferences.categories` remained as a
 *   read-only fallback in `pushService.isCategoryEnabled` for back-compat.
 *
 *   Before dropping the column, copy any user-set false-toggles forward into
 *   `notification_preferences` so behavior is preserved.
 *
 * Idempotent — safe to re-run before/after the column drop:
 *   - If the column still exists: backfills + drops it.
 *   - If the column is already dropped: exits cleanly.
 *
 * Usage:
 *   node scripts/migrate-drop-push-preferences.js [--dry-run]
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { sequelize } = require('../config/database');

const DRY = process.argv.includes('--dry-run');

async function columnExists(table, column) {
  const [rows] = await sequelize.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    { replacements: [table, column] }
  );
  return rows.length > 0;
}

async function backfillFromPushPreferences() {
  const [rows] = await sequelize.query(
    `SELECT id, email, push_preferences, notification_preferences
     FROM users
     WHERE push_preferences IS NOT NULL`
  );
  console.log(`Found ${rows.length} user(s) with push_preferences set.`);
  let migrated = 0;
  for (const u of rows) {
    const pp = u.push_preferences && u.push_preferences.categories;
    if (!pp || typeof pp !== 'object') continue;
    // Only carry forward explicit false values; true = default ON anyway.
    const carry = Object.fromEntries(Object.entries(pp).filter(([, v]) => v === false));
    if (Object.keys(carry).length === 0) continue;

    const existing = u.notification_preferences || {};
    // notification_preferences wins where it already has a value (more recent UI source).
    const merged = { ...carry, ...existing };
    console.log(`  user#${u.id} ${u.email}: ${JSON.stringify(carry)} → notification_preferences`);
    if (!DRY) {
      await sequelize.query(
        `UPDATE users SET notification_preferences = ? WHERE id = ?`,
        { replacements: [JSON.stringify(merged), u.id] }
      );
    }
    migrated++;
  }
  console.log(`Backfilled ${migrated} user(s).`);
}

async function dropColumn() {
  const exists = await columnExists('users', 'push_preferences');
  if (!exists) {
    console.log('users.push_preferences already dropped — nothing to do.');
    return;
  }
  if (DRY) {
    console.log('[dry-run] Would: ALTER TABLE users DROP COLUMN push_preferences');
    return;
  }
  await sequelize.query(`ALTER TABLE users DROP COLUMN push_preferences`);
  console.log('Dropped users.push_preferences column.');
}

(async () => {
  try {
    console.log(`=== Drop push_preferences ${DRY ? '(dry-run)' : ''} ===`);
    const exists = await columnExists('users', 'push_preferences');
    if (exists) await backfillFromPushPreferences();
    await dropColumn();
    console.log('Done.');
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error('Migration failed:', e);
    await sequelize.close();
    process.exit(1);
  }
})();
