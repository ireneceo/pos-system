/**
 * Foodcourt Branch 마이그레이션
 *
 * 기존 foodcourt 각 레코드에 대해:
 *  1. Primary Branch 생성 (name = foodcourt.name, code = foodcourt.code 또는 'MAIN')
 *  2. 해당 foodcourt 의 모든 unit 에 branch_id 할당
 *
 * Idempotent: 이미 primary branch 가 있으면 건너뜀.
 */
require('dotenv').config();
const { Foodcourt, FoodcourtUnit } = require('../models');
const FoodcourtBranch = require('../models/FoodcourtBranch');
const { sequelize } = require('../config/database');

async function run() {
  const foodcourts = await Foodcourt.findAll();
  console.log(`Found ${foodcourts.length} foodcourt(s).`);

  let created = 0, skipped = 0, unitsUpdated = 0;

  for (const fc of foodcourts) {
    const existing = await FoodcourtBranch.findOne({ where: { foodcourt_id: fc.id, is_primary: true } });
    if (existing) {
      console.log(`  fc#${fc.id} "${fc.name}" — primary branch already exists (id=${existing.id}), skipped`);
      skipped++;
      // Still ensure units are assigned
      const [res] = await sequelize.query(
        'UPDATE foodcourt_units SET branch_id = :b WHERE foodcourt_id = :fc AND branch_id IS NULL',
        { replacements: { b: existing.id, fc: fc.id } }
      );
      if (res && res.affectedRows) {
        console.log(`    assigned ${res.affectedRows} orphan unit(s) to branch #${existing.id}`);
        unitsUpdated += res.affectedRows;
      }
      continue;
    }

    const t = await sequelize.transaction();
    try {
      // Determine code
      const baseCode = (fc.code || `FC${String(fc.id).padStart(3, '0')}`).toUpperCase().replace(/[^A-Z0-9\-]/g, '');
      const branch = await FoodcourtBranch.create({
        foodcourt_id: fc.id,
        name: fc.name,
        code: baseCode,
        is_primary: true,
        status: 'active',
        address: fc.address,
        city: fc.city,
        state: fc.state,
        postal_code: fc.postal_code,
        country: fc.country,
        phone: fc.phone,
        email: fc.email
      }, { transaction: t });

      // Assign existing units
      const [res] = await sequelize.query(
        'UPDATE foodcourt_units SET branch_id = :b WHERE foodcourt_id = :fc',
        { replacements: { b: branch.id, fc: fc.id }, transaction: t }
      );

      await t.commit();
      console.log(`  fc#${fc.id} "${fc.name}" — primary branch created (id=${branch.id}, code=${baseCode}), ${res?.affectedRows || 0} units assigned`);
      created++;
      unitsUpdated += res?.affectedRows || 0;
    } catch (e) {
      await t.rollback();
      console.error(`  fc#${fc.id} ERROR: ${e.message}`);
      throw e;
    }
  }

  console.log(`\n✓ Done. created=${created}, skipped=${skipped}, units updated=${unitsUpdated}`);
  process.exit(0);
}

run().catch(e => { console.error('FAIL:', e.message); process.exit(1); });
