'use strict';
/**
 * Normalize legacy currency symbol 'RM' → ISO code 'MYR' across entities used in
 * purchase-order currency matching. RM is the Malaysian Ringgit display symbol;
 * MYR is its ISO code. Mixed storage ('RM' vs 'MYR') wrongly triggered
 * CURRENCY_MISMATCH on restaurant→brand purchase orders (with MIN Cafe, 2026-06-18).
 *
 * Idempotent: only rows still equal to 'RM' are updated. Safe to re-run.
 * Display stays "RM" via formatCurrency (MYR → RM symbol).
 *
 * Usage: node scripts/migrate-currency-rm-to-myr.js
 */
const { sequelize } = require('../config/database');

const TABLES = ['restaurants', 'brands', 'foodcourts', 'supplier_companies'];

(async () => {
  let total = 0;
  for (const t of TABLES) {
    try {
      // table may not exist in every environment; guard each.
      const [cols] = await sequelize.query(`SHOW COLUMNS FROM \`${t}\` LIKE 'currency'`);
      if (!cols.length) { console.log(`- ${t}: no currency column, skip`); continue; }
      const [[before]] = await sequelize.query(`SELECT COUNT(*) c FROM \`${t}\` WHERE currency = 'RM'`);
      const [res] = await sequelize.query(`UPDATE \`${t}\` SET currency = 'MYR' WHERE currency = 'RM'`);
      const n = res.affectedRows != null ? res.affectedRows : before.c;
      total += Number(before.c) || 0;
      console.log(`- ${t}: ${before.c} row(s) 'RM' → 'MYR'`);
    } catch (e) {
      console.log(`- ${t}: ERROR ${e.message}`);
    }
  }
  console.log(`\nDone. Normalized ${total} row(s).`);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
