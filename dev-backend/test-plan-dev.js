require('dotenv').config();

(async () => {
  const loginRes = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@pos-system.com', password: 'Admin123!' })
  });
  const loginData = await loginRes.json();
  console.log('Login status:', loginRes.status, 'token:', loginData.token ? 'yes' : 'no');
  if (loginData.error) { console.log('Login error:', loginData.error); return; }

  const { Sequelize } = require('sequelize');
  const s = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, port: process.env.DB_PORT || 3306, dialect: 'mysql', logging: false
  });
  const [[before]] = await s.query('SELECT plan_type, plan_amount, admin_id FROM restaurants WHERE id = 5');
  console.log('DB BEFORE:', JSON.stringify(before));

  const putRes = await fetch('http://localhost:3001/api/restaurants/5', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loginData.token },
    body: JSON.stringify({ name: 'K-Dine Korean Restaurant', planType: 'Enterprise Plan', planAmount: '99.00' })
  });
  const result = await putRes.json();
  console.log('PUT status:', putRes.status);
  if (result.error) console.log('PUT error:', result.error);
  if (result.errors) console.log('PUT errors:', JSON.stringify(result.errors));
  console.log('PUT planType:', result.planType);

  const [[after]] = await s.query('SELECT plan_type, plan_amount FROM restaurants WHERE id = 5');
  console.log('DB AFTER:', JSON.stringify(after));
  await s.close();
})().catch(e => console.error(e));
