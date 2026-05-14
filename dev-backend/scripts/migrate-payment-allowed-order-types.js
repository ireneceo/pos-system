/**
 * v3.31 Migration — backfill `allowed_order_types` on `payAtCounter` / `counter`.
 *
 * Context: `PaymentPage.tsx` previously hardcoded `delivery ≠ payAtCounter`. The new
 * design moves this to data so operators can configure other combinations and the
 * backend can enforce it server-side. To preserve existing behaviour, payAtCounter /
 * counter gets `["dine-in", "takeaway", "pickup"]` (the old whitelist minus delivery).
 *
 * All other methods are left untouched — missing `allowed_order_types` ≡ "all allowed".
 *
 * Idempotent: skips entries that already have a non-empty `allowed_order_types`.
 *
 * Usage:
 *   node scripts/migrate-payment-allowed-order-types.js [--dry-run]
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { sequelize } = require('../config/database');

const DRY = process.argv.includes('--dry-run');
const COUNTER_KEYS = ['payAtCounter', 'counter'];
const DEFAULT_NON_DELIVERY = ['dine-in', 'takeaway', 'pickup'];

(async () => {
  try {
    console.log(`=== Backfill payment_settings.*.allowed_order_types ${DRY ? '(dry-run)' : ''} ===`);
    const [rows] = await sequelize.query(
      `SELECT id, slug, payment_settings FROM restaurants WHERE payment_settings IS NOT NULL`
    );
    console.log(`Restaurants with payment_settings: ${rows.length}`);

    let touched = 0, skipped = 0;
    for (const r of rows) {
      let ps;
      try {
        ps = typeof r.payment_settings === 'string' ? JSON.parse(r.payment_settings) : r.payment_settings;
      } catch (e) {
        console.warn(`  [skip] restaurant#${r.id} payment_settings unparseable:`, e.message);
        skipped++;
        continue;
      }
      if (!ps || typeof ps !== 'object') { skipped++; continue; }

      let changed = false;
      for (const key of COUNTER_KEYS) {
        const m = ps[key];
        if (!m || typeof m !== 'object') continue;
        if (Array.isArray(m.allowed_order_types) && m.allowed_order_types.length > 0) continue;
        m.allowed_order_types = [...DEFAULT_NON_DELIVERY];
        changed = true;
      }
      if (!changed) { skipped++; continue; }

      if (DRY) {
        console.log(`  [dry] restaurant#${r.id} ${r.slug} — would set counter.allowed_order_types`);
      } else {
        await sequelize.query(
          `UPDATE restaurants SET payment_settings = ? WHERE id = ?`,
          { replacements: [JSON.stringify(ps), r.id] }
        );
        console.log(`  ✓ restaurant#${r.id} ${r.slug}`);
      }
      touched++;
    }
    console.log(`Done — touched ${touched}, skipped ${skipped}.`);
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error('Migration failed:', e);
    await sequelize.close();
    process.exit(1);
  }
})();
