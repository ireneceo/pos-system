/**
 * v3.25 — Seed work_manuals across brand 4, restaurant 5, foodcourt 7
 *
 * Idempotent (skips if title already exists in scope).
 */
const { WorkManual, WorkManualCategory, User } = require('../models');
const database = require('../config/database');

const SEED = [
  // Brand 4 (test_brand_general 권장 author user_id=6)
  { scope: { brand_id: 4 }, title: 'Brand Standard — Recipe Compliance', author_role: 'Brand General', body: 'All franchise locations must follow the central recipe library. Quality audits run quarterly.' },
  { scope: { brand_id: 4 }, title: 'Brand Standard — Customer Service Tone', author_role: 'Brand General', body: 'Greet within 5 seconds. Use approved scripts in 4 languages.' },
  { scope: { brand_id: 4 }, title: 'Brand Standard — Logo Usage Guidelines', author_role: 'Brand Manager', body: 'Logo color: #635BFF. Do not modify or rotate. Minimum size 24px.' },
  { scope: { brand_id: 4 }, title: 'Brand Standard — Promotional Calendar 2026', author_role: 'Brand Manager', body: 'Q1 Lunar New Year, Q2 Ramadan, Q3 Merdeka, Q4 Christmas. See attached calendar.' },

  // Restaurant 5 (test_restaurant_admin user_id=9)
  { scope: { restaurant_id: 5 }, title: 'Daily Opening Checklist', author_role: 'Restaurant Admin', body: '1. Unlock 8:30am  2. Power on POS terminals  3. Print prep sheets  4. Check fridge temp ≤ 4°C' },
  { scope: { restaurant_id: 5 }, title: 'Closing Procedure — Cash Reconciliation', author_role: 'Restaurant Admin', body: 'Count drawer at 10pm. Match against POS report. Drop in safe with date sticker.' },
  { scope: { restaurant_id: 5 }, title: 'Customer Complaint Handling', author_role: 'Restaurant Owner', body: 'Acknowledge within 30 seconds. Offer remediation (free dessert / refund). Log in feedback book.' },
  { scope: { restaurant_id: 5 }, title: 'POS Terminal Reboot Steps', author_role: 'Restaurant Admin', body: 'Hold power 5s → Wait 30s → Boot → Login as kdine_admin → Open Live Orders.' },

  // Foodcourt 7 (foodcourt_general user_id=10)
  { scope: { foodcourt_id: 7 }, title: 'Tenant Onboarding — Day 1 Checklist', author_role: 'Foodcourt General', body: 'Issue access card, configure POS, walkthrough fire exits, hand over branding pack.' },
  { scope: { foodcourt_id: 7 }, title: 'Common Area Cleaning Schedule', author_role: 'Foodcourt General', body: 'Floor: 2hrs. Tables: continuous. Trash: 4hrs. Restrooms: 1hr cycle.' }
];

const ROLE_AUTHOR = {
  'Brand General':     { id: 6, name: 'Brand General', email: 'brand_general@orderhere.center' },
  'Brand Manager':     { id: 6, name: 'Brand General', email: 'brand_general@orderhere.center' },
  'Restaurant Admin':  { id: 9, name: 'kdine_admin', email: 'admin@kdine.com' },
  'Restaurant Owner':  { id: 9, name: 'kdine_admin', email: 'admin@kdine.com' },
  'Foodcourt General': { id: 10, name: 'foodcourt_general', email: 'foodcourt_general@orderhere.center' }
};

(async () => {
  const t = await database.sequelize.transaction();
  try {
    let created = 0, skipped = 0;
    for (const m of SEED) {
      const where = { title: m.title, ...m.scope };
      const existing = await WorkManual.findOne({ where, transaction: t });
      if (existing) { skipped++; continue; }
      const author = ROLE_AUTHOR[m.author_role];
      if (!author) { console.warn('No author mapping for', m.author_role); continue; }
      await WorkManual.create({
        title: m.title,
        content: m.body,
        author_id: author.id,
        author_name: author.name,
        author_role: m.author_role,
        ...m.scope,
        status: 'published'
      }, { transaction: t });
      created++;
      console.log('✓', m.title);
    }
    await t.commit();
    console.log(`\nDone. created=${created}, skipped=${skipped}`);
  } catch (e) {
    await t.rollback().catch(() => {});
    console.error('FATAL:', e.message);
    if (e.errors) for (const er of e.errors) console.error('  -', er.message);
    process.exit(1);
  }
  process.exit(0);
})();
