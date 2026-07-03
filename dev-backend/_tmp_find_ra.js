const { sequelize } = require('./config/database');
(async () => {
  const [b] = await sequelize.query(`SELECT id, name, owner_id FROM brands WHERE id IN (10,17);`);
  console.log(JSON.stringify(b));
  const [u23] = await sequelize.query(`SELECT id,email,role,is_demo,is_test,is_active FROM users WHERE id IN (22,23,369);`);
  console.log(JSON.stringify(u23));
  process.exit(0);
})();
