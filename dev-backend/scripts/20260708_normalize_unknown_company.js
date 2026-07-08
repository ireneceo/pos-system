/**
 * 20260708_normalize_unknown_company.js
 *
 * Normalize the literal sentinel `company_name = 'Unknown Company'` to NULL.
 *
 * Why: some production accounts (e.g. the gitconsulting Brand General) have the
 * literal string "Unknown Company" stored in users.company_name — a stale import
 * artifact, not a real company name. The frontend already treats "Unknown Company"
 * as a sentinel and falls back to brand_name / foodcourt_name / full_name
 * (Admin ManagersPage / InvoicesPage / InvoiceCreateModal), so NULL renders
 * identically and is the clean canonical value. Dev already has NULL here.
 *
 * Idempotent: the WHERE clause only matches the literal sentinel, so re-runs are
 * no-ops once normalized. Runs from the deploy SPRINT_MIG loop.
 */
'use strict';
require('dotenv').config({ quiet: true });
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

(async () => {
  try {
    let total = 0;
    // Only tables that actually have a company_name column are touched; unknown
    // tables are skipped silently so this never fails on a schema variant.
    for (const table of ['users', 'brands', 'foodcourts']) {
      try {
        const [res] = await sequelize.query(
          `UPDATE ${table} SET company_name = NULL WHERE company_name = 'Unknown Company'`,
          { type: QueryTypes.RAW }
        );
        const affected = (res && (res.affectedRows ?? res.changedRows)) || 0;
        if (affected) console.log(`  ${table}: normalized ${affected} row(s)`);
        total += affected;
      } catch (e) {
        // column/table absent on this schema → skip (not an error for this fix)
        if (!/Unknown column|doesn't exist|no such table/i.test(e.message || '')) {
          console.warn(`  ${table}: skipped (${e.message})`);
        }
      }
    }
    console.log(`✓ normalize_unknown_company complete — ${total} row(s) set to NULL.`);
    process.exit(0);
  } catch (e) {
    console.error('normalize_unknown_company failed:', e.message);
    process.exit(1);
  }
})();
