const { sequelize } = require('./config/database');
(async () => {
  try {
    const [brands] = await sequelize.query("SELECT id, name FROM brands WHERE name LIKE '%fire%' OR name LIKE '%Fire%'");
    console.log('BRANDS:', JSON.stringify(brands));
    if (!brands.length) { process.exit(0); }
    const brandIds = brands.map(b => b.id);
    const [menus] = await sequelize.query(
      `SELECT id, name, brand_id, version, is_set_menu, lock_set_items, scope_mode FROM brand_menus WHERE brand_id IN (${brandIds.join(',')}) AND (name LIKE '%6%' OR name LIKE '%녹차%' OR name LIKE '%green%' OR name LIKE '%tea%' OR is_set_menu=1) ORDER BY is_set_menu DESC`
    );
    console.log('\nMENUS (set or matching):');
    menus.forEach(m => console.log(JSON.stringify(m)));
  } catch (e) { console.error('ERR', e.message); }
  process.exit(0);
})();
