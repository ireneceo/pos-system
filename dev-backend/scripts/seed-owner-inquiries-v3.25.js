/**
 * v3.25 — Link demo_owner to the first N restaurants + seed operation/system tickets
 *
 * IDs resolved at runtime. Override via env vars:
 *   DEMO_OWNER_EMAIL          (default: demo-owner@purplehere.com)
 *   DEMO_OWNER_RESTAURANT_COUNT (default: 3 — first N restaurants by id)
 *
 * Idempotent.
 */
const { OperationTicket, RestaurantManager, Restaurant, User } = require('../models');
const database = require('../config/database');

const DEMO_OWNER_EMAIL = process.env.DEMO_OWNER_EMAIL || 'demo-owner@purplehere.com';
const DEMO_OWNER_RESTAURANT_COUNT = parseInt(process.env.DEMO_OWNER_RESTAURANT_COUNT || '3');

async function resolveOwnerIds() {
  const owner = await User.findOne({ where: { email: DEMO_OWNER_EMAIL } });
  if (!owner) throw new Error(`Demo owner user not found: ${DEMO_OWNER_EMAIL}`);
  const rests = await Restaurant.findAll({ order: [['id', 'ASC']], limit: DEMO_OWNER_RESTAURANT_COUNT });
  if (rests.length === 0) throw new Error('No restaurants available to link.');
  return { DEMO_OWNER_ID: owner.id, TARGET_RESTAURANT_IDS: rests.map(r => r.id) };
}

(async () => {
  const { DEMO_OWNER_ID, TARGET_RESTAURANT_IDS } = await resolveOwnerIds();
  console.log(`Resolved IDs: demo_owner=${DEMO_OWNER_ID}, restaurants=[${TARGET_RESTAURANT_IDS.join(',')}]`);

  const t = await database.sequelize.transaction();
  try {
    // 1. Ensure ownership links
    let linked = 0, skippedLinks = 0;
    for (const rid of TARGET_RESTAURANT_IDS) {
      const existing = await RestaurantManager.findOne({
        where: { manager_id: DEMO_OWNER_ID, restaurant_id: rid, relationship_type: 'ownership' },
        transaction: t
      });
      if (existing) { skippedLinks++; continue; }
      await RestaurantManager.create({
        manager_id: DEMO_OWNER_ID,
        restaurant_id: rid,
        relationship_type: 'ownership'
      }, { transaction: t });
      linked++;
    }
    console.log(`Ownership: linked=${linked}, skipped=${skippedLinks}`);

    // 2. Resolve restaurant + admin info for ticket fields
    const restaurants = await Restaurant.findAll({ where: { id: TARGET_RESTAURANT_IDS }, transaction: t });
    const restMap = {};
    for (const r of restaurants) restMap[r.id] = r;

    // pick a Restaurant Admin per restaurant (any user with restaurant_id matches)
    const reqUsers = await User.findAll({
      where: { restaurant_id: TARGET_RESTAURANT_IDS, role: 'Restaurant Admin' },
      transaction: t
    });
    const reqByRest = {};
    for (const u of reqUsers) if (!reqByRest[u.restaurant_id]) reqByRest[u.restaurant_id] = u;

    // Operation Tickets — 5 tickets with varied status
    const opSpecs = [
      { rid: 1, subject: 'Inventory shortage on Saturday peak hours', description: 'Pork belly stock ran out by 8pm three Saturdays in a row. Need supplier reorder threshold review.', priority: 'high', category: 'inventory', status: 'open' },
      { rid: 1, subject: 'New staff onboarding training schedule', description: 'Hired 3 new staff this month. Need training calendar approved and printed.', priority: 'medium', category: 'staff', status: 'in-progress' },
      { rid: 2, subject: 'Pizza oven replacement quote needed', description: 'Backup oven from 2018 keeps overheating. Approved capex request? Need quote from Bukit Bintang vendor.', priority: 'urgent', category: 'other', status: 'open' },
      { rid: 2, subject: 'Customer complaint — wrong delivery address', description: 'Repeat delivery issues to Jalan Imbi area. Possible POS address validation gap.', priority: 'low', category: 'customer', status: 'resolved' },
      { rid: 3, subject: 'Sunday brunch menu refresh', description: 'Brunch sales down 12% MoM. Propose Mediterranean trio + premium coffee tier for Q2 review.', priority: 'medium', category: 'menu', status: 'in-progress' }
    ];

    let opCreated = 0, opSkipped = 0;
    for (const s of opSpecs) {
      const r = restMap[s.rid];
      if (!r) continue;
      const reqUser = reqByRest[s.rid];
      const ticketNumber = `OPS-${String(s.rid).padStart(3, '0')}-${String(opSpecs.indexOf(s) + 1).padStart(4, '0')}`;
      const exists = await OperationTicket.findOne({ where: { ticketNumber }, transaction: t });
      if (exists) { opSkipped++; continue; }
      await OperationTicket.create({
        ticketNumber,
        managerId: DEMO_OWNER_ID,
        managerName: 'demo_owner',
        requesterId: reqUser?.id || null,
        requesterName: reqUser?.full_name || reqUser?.username || `${r.name} Admin`,
        requesterEmail: reqUser?.email || `admin-${r.id}@example.com`,
        requesterRole: 'Restaurant Admin',
        restaurantId: r.id,
        restaurantName: r.name,
        subject: s.subject,
        description: s.description,
        status: s.status,
        priority: s.priority,
        category: s.category
      }, { transaction: t });
      opCreated++;
    }
    console.log(`Operation tickets: created=${opCreated}, skipped=${opSkipped}`);

    await t.commit();
    console.log('\nDone.');
  } catch (e) {
    await t.rollback().catch(() => {});
    console.error('FATAL:', e.message);
    if (e.errors) for (const er of e.errors) console.error('  -', er.message);
    process.exit(1);
  }
  process.exit(0);
})();
