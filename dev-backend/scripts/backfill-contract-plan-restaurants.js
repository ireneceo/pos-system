/**
 * Phase 2-C backfill: create EntityPlanRestaurant rows for any open ContractPlan
 * whose contract has a restaurant_id set but no active EPR yet.
 *
 * Idempotent: safe to re-run. Emits a concise per-row report.
 *
 * Usage: node scripts/backfill-contract-plan-restaurants.js [--dry-run]
 */

const { ContractPlan, Contract, EntityPlanRestaurant, EntityPlan } = require('../models');

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  console.log(`[backfill-EPR] mode=${dryRun ? 'DRY-RUN' : 'APPLY'}`);

  const links = await ContractPlan.findAll({
    where: { end_at: null },
    include: [
      { model: Contract, as: 'contract', attributes: ['id', 'contract_number', 'restaurant_id', 'stage'] },
      { model: EntityPlan, as: 'entityPlan', attributes: ['id', 'name', 'is_active', 'auto_generate'] }
    ],
    order: [['contract_id', 'ASC']]
  });

  let created = 0, reactivated = 0, skippedNoRestaurant = 0, alreadyActive = 0, skippedInactivePlan = 0;

  for (const link of links) {
    const c = link.contract;
    const p = link.entityPlan;
    if (!c || !p) continue;

    if (!c.restaurant_id) {
      console.log(`  contract#${c.id} [${c.contract_number || 'no-number'}] stage=${c.stage} plan#${p.id} → SKIP (no restaurant_id)`);
      skippedNoRestaurant++;
      continue;
    }

    if (!p.is_active) {
      console.log(`  contract#${c.id} plan#${p.id} → SKIP (plan inactive)`);
      skippedInactivePlan++;
      continue;
    }

    const existing = await EntityPlanRestaurant.findOne({
      where: { entity_plan_id: p.id, restaurant_id: c.restaurant_id }
    });

    if (existing) {
      if (existing.is_active) {
        console.log(`  contract#${c.id} plan#${p.id} restaurant#${c.restaurant_id} → ALREADY ACTIVE`);
        alreadyActive++;
      } else {
        console.log(`  contract#${c.id} plan#${p.id} restaurant#${c.restaurant_id} → REACTIVATE`);
        if (!dryRun) await existing.update({ is_active: true, activation_date: new Date() });
        reactivated++;
      }
    } else {
      console.log(`  contract#${c.id} plan#${p.id} restaurant#${c.restaurant_id} → CREATE`);
      if (!dryRun) {
        await EntityPlanRestaurant.create({
          entity_plan_id: p.id,
          restaurant_id: c.restaurant_id,
          activation_date: new Date(),
          is_active: true
        });
      }
      created++;
    }
  }

  console.log('\n[backfill-EPR] Summary:');
  console.log(`  Open ContractPlan links scanned: ${links.length}`);
  console.log(`  CREATE:           ${created}`);
  console.log(`  REACTIVATE:       ${reactivated}`);
  console.log(`  ALREADY ACTIVE:   ${alreadyActive}`);
  console.log(`  SKIP (no rest.):  ${skippedNoRestaurant}`);
  console.log(`  SKIP (inactive):  ${skippedInactivePlan}`);
  if (dryRun) console.log('  (no rows were modified — re-run without --dry-run to apply)');
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
