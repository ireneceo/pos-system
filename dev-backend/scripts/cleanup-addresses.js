/**
 * Address Data Cleanup — Sanitize only
 * See docs/ADDRESS_STANDARDIZATION.md §5.2 (and §2 retrospective — R1/R2 removed)
 *
 * Operations:
 *   1. Strip newlines/tabs from address TEXT columns
 *   2. Report EntityPlanRestaurant cross-brand links (warn only, informational)
 *
 * Removed: brand_id/foodcourt_id auto-correction. Restaurant is source of truth for its
 * brand/foodcourt membership — it must not be overwritten from contract records. Contracts
 * are snapshots; restaurant attributes are live and user-managed.
 *
 * Usage:
 *   node scripts/cleanup-addresses.js             # dry-run
 *   node scripts/cleanup-addresses.js --apply     # execute
 *
 * Data preservation: original `address` text is NEVER overwritten with auto-parsed data.
 * Only trimming / newline-removal / whitespace-collapse is applied.
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { Restaurant, Brand, Foodcourt, FoodcourtBranch, EntityPlanRestaurant, EntityPlan, User, Supplier, HardwareQuote } = require('../models');
const CompanySettings = require('../models/CompanySettings');

const APPLY = process.argv.includes('--apply');
const VERBOSE = process.argv.includes('--verbose');

function clean(v) {
  if (v == null) return v;
  const s = String(v).replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  return s;
}

const counters = { sanitized: 0, planMismatch: 0 };

async function sanitizeAddressStrings() {
  console.log('\n-- Step 1: Sanitize address text columns --\n');

  const TABLES = [
    { model: Restaurant, columns: ['address', 'address_line_2'] },
    { model: Brand, columns: ['address', 'address_line_2'] },
    { model: Foodcourt, columns: ['address', 'address_line_2'] },
    { model: FoodcourtBranch, columns: ['address', 'address_line_2'] },
    { model: User, columns: ['address', 'address_line_2'] },
    { model: Supplier, columns: ['address', 'address_line_2'] },
    { model: CompanySettings, columns: ['address', 'address_line_2'] },
    { model: HardwareQuote, columns: ['company_address', 'address_line_2'] }
  ];

  for (const { model, columns } of TABLES) {
    const rows = await model.findAll({ attributes: ['id', ...columns] });
    let changed = 0;
    for (const row of rows) {
      const updates = {};
      for (const col of columns) {
        const v = row.getDataValue(col);
        if (v != null) {
          const c = clean(v);
          if (c !== v) updates[col] = c;
        }
      }
      if (Object.keys(updates).length > 0) {
        if (VERBOSE) console.log(`   ${model.name}#${row.id}:`, updates);
        if (APPLY) await row.update(updates);
        changed++;
      }
    }
    console.log(`✓ ${model.name}: ${changed}/${rows.length} rows sanitized`);
    counters.sanitized += changed;
  }
}

// Removed: enforceBrandIntegrity() / enforceFoodcourtIntegrity().
// Rationale: restaurant.brand_id and foodcourt_id are live user-managed attributes
// and must NOT be overwritten from stale contract snapshots. Contracts are historical
// records of agreements at a point in time, not authoritative for the restaurant's
// current identity.

async function reportPlanMismatches() {
  console.log('\n-- Step 4: Report EntityPlanRestaurant brand mismatches (warn only) --\n');

  const links = await EntityPlanRestaurant.findAll({ where: { is_active: true } });
  for (const l of links) {
    const plan = await EntityPlan.findByPk(l.entity_plan_id);
    const r = await Restaurant.findByPk(l.restaurant_id);
    if (!plan || !r) continue;

    if (plan.entity_type === 'brand') {
      if (Number(r.brand_id) !== Number(plan.entity_id)) {
        console.log(`⚠ EPR #${l.id}: restaurant ${l.restaurant_id} "${r.name}" brand_id=${r.brand_id} linked to BRAND ${plan.entity_id}'s plan "${plan.name}"`);
        counters.planMismatch++;
      }
    } else if (plan.entity_type === 'foodcourt') {
      if (Number(r.foodcourt_id) !== Number(plan.entity_id)) {
        console.log(`⚠ EPR #${l.id}: restaurant ${l.restaurant_id} "${r.name}" foodcourt_id=${r.foodcourt_id} linked to FOODCOURT ${plan.entity_id}'s plan "${plan.name}"`);
        counters.planMismatch++;
      }
    }
  }

  console.log(`✓ Plan mismatches found (informational): ${counters.planMismatch}`);
  console.log(`  (Not auto-fixed. EPR cross-brand links are allowed — plan assignments are billing records only.)`);
}

async function main() {
  console.log(`=== Address Cleanup ${APPLY ? '(APPLY)' : '(DRY-RUN)'} ===`);

  await sanitizeAddressStrings();
  await reportPlanMismatches();

  console.log('\n=== Summary ===');
  console.log(`  Sanitized rows: ${counters.sanitized}`);
  console.log(`  Plan-link cross-brand (informational): ${counters.planMismatch}`);
  if (!APPLY) console.log('\nRun with --apply to execute.');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
