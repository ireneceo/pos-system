/**
 * Restaurant-Admin 1:1 매칭 데이터 마이그레이션 스크립트
 *
 * 기존 데이터 정합성 확인 및 동기화:
 * 1. restaurants.manager_id가 설정된 레스토랑 → 해당 User의 restaurant_id 동기화
 * 2. manager_id가 Brand/Foodcourt Manager인 경우 → RestaurantManager로 이동
 * 3. Restaurant Admin이 없는 레스토랑 목록 리포트
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function migrate() {
  const { sequelize } = require('../config/database');

  console.log('=== Restaurant-Admin 1:1 Migration Script ===\n');

  try {
    // 1. 현재 상태 리포트
    console.log('--- Step 1: Current State Report ---');

    const restaurants = await sequelize.query(`
      SELECT r.id, r.name, r.manager_id as rest_manager_id, r.manager_name,
             u.id as uid, u.username, u.email, u.role as user_role, u.restaurant_id as user_restaurant_id
      FROM restaurants r
      LEFT JOIN users u ON r.manager_id = u.id
      ORDER BY r.id
    `, { type: sequelize.QueryTypes.SELECT });

    console.log(`Total restaurants: ${restaurants.length}\n`);

    const noManager = restaurants.filter(r => !r.rest_manager_id);
    const withRestaurantAdmin = restaurants.filter(r => r.user_role === 'Restaurant Admin');
    const withBrandFoodcourt = restaurants.filter(r =>
      r.user_role && ['Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager'].includes(r.user_role)
    );
    const mismatched = restaurants.filter(r => r.uid && r.user_restaurant_id !== r.id);

    console.log(`  - Restaurant Admin assigned: ${withRestaurantAdmin.length}`);
    console.log(`  - Brand/Foodcourt Manager as manager_id: ${withBrandFoodcourt.length}`);
    console.log(`  - No manager_id set: ${noManager.length}`);
    console.log(`  - User.restaurant_id mismatch: ${mismatched.length}\n`);

    // 2. restaurant_id 동기화 (Restaurant Admin만)
    console.log('--- Step 2: Sync Restaurant Admin restaurant_id ---');

    let syncCount = 0;
    for (const r of withRestaurantAdmin) {
      if (r.user_restaurant_id !== r.id) {
        console.log(`  Syncing: User ${r.uid} (${r.username}) → restaurant_id = ${r.id} (${r.name})`);
        await sequelize.query(
          'UPDATE users SET restaurant_id = ? WHERE id = ?',
          { replacements: [r.id, r.uid] }
        );
        syncCount++;
      }
    }
    console.log(`  Synced ${syncCount} users\n`);

    // 3. Brand/Foodcourt Manager를 RestaurantManager 테이블로 이동
    console.log('--- Step 3: Move Brand/Foodcourt Managers to RestaurantManager ---');

    let movedCount = 0;
    for (const r of withBrandFoodcourt) {
      // Check if already in restaurant_managers (column is manager_id, not user_id)
      const existing = await sequelize.query(
        'SELECT id FROM restaurant_managers WHERE restaurant_id = ? AND manager_id = ?',
        { replacements: [r.id, r.uid], type: sequelize.QueryTypes.SELECT }
      );

      if (existing.length === 0) {
        console.log(`  Moving: User ${r.uid} (${r.username}, ${r.user_role}) from restaurant ${r.id} → restaurant_managers`);
        await sequelize.query(
          'INSERT INTO restaurant_managers (restaurant_id, manager_id, is_primary, createdAt, updatedAt) VALUES (?, ?, false, NOW(), NOW())',
          { replacements: [r.id, r.uid] }
        );
        movedCount++;
      } else {
        console.log(`  Already exists: User ${r.uid} (${r.username}) in restaurant_managers for restaurant ${r.id}`);
      }
    }
    console.log(`  Moved ${movedCount} managers\n`);

    // 4. Final report
    console.log('--- Step 4: Final Report ---');

    const noAdminRestaurants = restaurants.filter(r => r.user_role !== 'Restaurant Admin');
    if (noAdminRestaurants.length > 0) {
      console.log('\n  Restaurants WITHOUT a Restaurant Admin:');
      for (const r of noAdminRestaurants) {
        console.log(`    - ID ${r.id}: "${r.name}" (current manager: ${r.user_role || 'None'} - ${r.username || 'N/A'})`);
      }
      console.log('\n  These restaurants need a Restaurant Admin to be assigned.');
      console.log('  Use the Edit Restaurant modal to assign or create an admin.');
    } else {
      console.log('  All restaurants have a Restaurant Admin assigned!');
    }

    console.log('\n=== Migration Complete ===');

  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await sequelize.close();
  }
}

migrate();
