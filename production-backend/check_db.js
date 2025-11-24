const { sequelize } = require('./config/database');

async function checkDB() {
  try {
    // Restaurant 5 정보
    const [restaurant] = await sequelize.query(`
      SELECT r.id, r.name, r.plan_type, r.brand_id, r.foodcourt_id
      FROM restaurants r
      WHERE r.id = 5
    `);
    
    console.log('\n=== Restaurant 5 ===');
    console.log(JSON.stringify(restaurant[0], null, 2));
    
    // addon_modules 테이블 확인
    const [modules] = await sequelize.query(`
      SELECT module_code, ui_routes, required_plan_types
      FROM addon_modules
      WHERE module_code = 'recipe_management'
    `);
    
    console.log('\n=== Recipe Management Module ===');
    console.log(JSON.stringify(modules[0], null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

setTimeout(checkDB, 2000);
