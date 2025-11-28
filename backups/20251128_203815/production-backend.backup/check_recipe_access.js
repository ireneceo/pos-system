const { sequelize } = require('./config/database');

async function checkAccess() {
  try {
    // Restaurant 5의 구독 플랜 확인
    const [restaurant] = await sequelize.query(`
      SELECT r.id, r.name, r.plan_type, 
             s.included_modules, s.addon_modules,
             b.name as brand_name
      FROM restaurants r
      LEFT JOIN subscription_plans s ON r.plan_type = s.plan_type
      LEFT JOIN brands b ON r.brand_id = b.id
      WHERE r.id = 5
    `);
    
    console.log('\n=== Restaurant 5 정보 ===');
    console.log(JSON.stringify(restaurant[0], null, 2));
    
    // recipe_management 모듈 정보
    const [module] = await sequelize.query(`
      SELECT module_code, ui_routes, required_plan_types
      FROM addon_modules
      WHERE module_code = 'recipe_management'
    `);
    
    console.log('\n=== Recipe Management 모듈 ===');
    console.log(JSON.stringify(module[0], null, 2));
    
    // 메뉴 관련 모듈들도 확인
    const [allModules] = await sequelize.query(`
      SELECT module_code, ui_routes, required_plan_types
      FROM addon_modules
      WHERE ui_routes LIKE '%recipe%' OR ui_routes LIKE '%ingredient%'
    `);
    
    console.log('\n=== 레시피/재료 관련 모듈들 ===');
    console.log(JSON.stringify(allModules, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

setTimeout(checkAccess, 2000);
