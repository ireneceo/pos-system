const Restaurant = require('/var/www/dev-backend/models/Restaurant');
const User = require('/var/www/dev-backend/models/User');
(async () => {
  const r = await Restaurant.findByPk(5, {attributes:['id','slug','admin_id','is_demo']});
  console.log('R5:', JSON.stringify(r.toJSON()));
  const u = r.admin_id ? await User.findByPk(r.admin_id, {attributes:['id','email','role','is_demo','is_test']}) : null;
  console.log('R5 admin:', u ? JSON.stringify(u.toJSON()) : 'none');
  process.exit(0);
})();
