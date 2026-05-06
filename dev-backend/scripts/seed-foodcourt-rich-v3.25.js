/**
 * v3.25 — Foodcourt rich seed
 *
 * 대상: foodcourt_id=7 ('Central Food Hall'), foodcourt_general@orderhere.center
 *   - Downtown Pizza (id=2) → admin 2 + staff 3
 *   - Sunset Cafe (id=3)    → admin 2 + staff 2
 *   - 2 추가 FoodcourtBranch (현재 1개 → 3개)
 *
 * Idempotent: 기존 시드 user (email 기준) 있으면 SKIP.
 */
const bcrypt = require('bcrypt');
const { User, Restaurant, FoodcourtBranch } = require('../models');
const database = require('../config/database');

const FOODCOURT_ID = 7;
const REST_DOWNTOWN = 2;
const REST_SUNSET = 3;

const ADMINS = [
  { username: 'fc_admin_pizza_1', email: 'fcadmin1@orderhere.center', full_name: 'Lily Tan',    restaurant_id: REST_DOWNTOWN, phone: '+60-12-100-0001' },
  { username: 'fc_admin_pizza_2', email: 'fcadmin2@orderhere.center', full_name: 'Aaron Wong',  restaurant_id: REST_DOWNTOWN, phone: '+60-12-100-0002' },
  { username: 'fc_admin_cafe_1',  email: 'fcadmin3@orderhere.center', full_name: 'Maya Lee',    restaurant_id: REST_SUNSET,   phone: '+60-12-100-0003' },
  { username: 'fc_admin_cafe_2',  email: 'fcadmin4@orderhere.center', full_name: 'Daniel Chua', restaurant_id: REST_SUNSET,   phone: '+60-12-100-0004' },
];
const STAFF = [
  { username: 'fc_staff_pizza_1', email: 'fcstaff1@orderhere.center', full_name: 'Sara Lim',  restaurant_id: REST_DOWNTOWN },
  { username: 'fc_staff_pizza_2', email: 'fcstaff2@orderhere.center', full_name: 'Ben Ho',    restaurant_id: REST_DOWNTOWN },
  { username: 'fc_staff_pizza_3', email: 'fcstaff3@orderhere.center', full_name: 'Cindy Goh', restaurant_id: REST_DOWNTOWN },
  { username: 'fc_staff_cafe_1',  email: 'fcstaff4@orderhere.center', full_name: 'Daniel Tan',  restaurant_id: REST_SUNSET },
  { username: 'fc_staff_cafe_2',  email: 'fcstaff5@orderhere.center', full_name: 'Ella Cheong', restaurant_id: REST_SUNSET },
];

const BRANCHES = [
  { foodcourt_id: FOODCOURT_ID, name: 'East Wing Hall',  code: 'EWH', is_primary: false, status: 'active', address: 'Bukit Bintang area',  city: 'Kuala Lumpur', state: 'KL', postal_code: '55100', country: 'MY', phone: '+60-12-345-7000', email: 'east@purplehere.test', unit_config: { units: 8 } },
  { foodcourt_id: FOODCOURT_ID, name: 'Riverside Food Court', code: 'RFC', is_primary: false, status: 'active', address: 'Bangsar South', city: 'Kuala Lumpur', state: 'KL', postal_code: '59200', country: 'MY', phone: '+60-12-345-7100', email: 'river@purplehere.test', unit_config: { units: 12 } }
];

async function ensureUser(spec, role) {
  const existing = await User.findOne({ where: { email: spec.email } });
  if (existing) {
    return { created: false, user: existing };
  }
  const password = await bcrypt.hash('SeededPass123', 10);
  const user = await User.create({
    username: spec.username,
    email: spec.email,
    full_name: spec.full_name,
    password,
    role,
    restaurant_id: spec.restaurant_id,
    phone: spec.phone || null,
    is_active: true,
    is_test: true
  });
  return { created: true, user };
}

(async () => {
  const t = await database.sequelize.transaction();
  try {
    let createdAdmins = 0, skippedAdmins = 0;
    for (const a of ADMINS) {
      const r = await ensureUser(a, 'Restaurant Admin');
      if (r.created) { createdAdmins++; console.log('✓ admin', a.username, '→ rest', a.restaurant_id); }
      else skippedAdmins++;
    }
    let createdStaff = 0, skippedStaff = 0;
    for (const s of STAFF) {
      const r = await ensureUser(s, 'Staff');
      if (r.created) { createdStaff++; console.log('✓ staff', s.username, '→ rest', s.restaurant_id); }
      else skippedStaff++;
    }
    let createdBranches = 0, skippedBranches = 0;
    for (const b of BRANCHES) {
      const exists = await FoodcourtBranch.findOne({ where: { foodcourt_id: b.foodcourt_id, code: b.code } });
      if (exists) { skippedBranches++; continue; }
      await FoodcourtBranch.create(b);
      createdBranches++;
      console.log('✓ branch', b.name);
    }
    await t.commit();
    console.log(`\nDone. admins=${createdAdmins}/${ADMINS.length} (skipped ${skippedAdmins}), staff=${createdStaff}/${STAFF.length} (skipped ${skippedStaff}), branches=${createdBranches}/${BRANCHES.length} (skipped ${skippedBranches})`);
  } catch (e) {
    await t.rollback().catch(() => {});
    console.error('FATAL:', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
