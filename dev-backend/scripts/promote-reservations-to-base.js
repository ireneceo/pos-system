// One-off: promote `reservations` AddonModule from `advanced` (paywall) to `basic`
// (base feature). Ensures all restaurant plan templates include it.
//
// Background: reservation sidebar previously hid behind hasModule('reservations'),
// which combined with restaurant.plan_type variance made the menu appear/disappear
// from operator's perspective. We split visibility: sidebar is always shown for
// RA/Staff; mobile customer-facing visibility is controlled by reservation_settings.enabled.
//
// Idempotent: re-running is safe.
//
// Usage: node scripts/promote-reservations-to-base.js

const AddonModule = require('../models/AddonModule');
const PlanTemplate = require('../models/PlanTemplate');

(async () => {
  console.log('[1/2] Promote reservations AddonModule category → basic');
  const mod = await AddonModule.findOne({ where: { module_code: 'reservations' } });
  if (!mod) {
    console.log('  ? reservations AddonModule not found — skipping');
  } else if (mod.category === 'basic') {
    console.log('  = reservations already basic');
  } else {
    const prev = mod.category;
    await mod.update({ category: 'basic' });
    console.log(`  + reservations: ${prev} → basic`);
  }

  console.log('[2/2] Ensure every restaurant plan template includes reservations');
  const plans = await PlanTemplate.findAll({ where: { plan_target: 'restaurant' } });
  for (const plan of plans) {
    const current = Array.isArray(plan.included_modules) ? plan.included_modules : [];
    if (current.includes('reservations')) {
      console.log(`  = ${plan.name}: already includes reservations`);
    } else {
      await plan.update({ included_modules: [...current, 'reservations'] });
      console.log(`  + ${plan.name}: added reservations`);
    }
  }

  console.log('Done.');
  process.exit(0);
})().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
