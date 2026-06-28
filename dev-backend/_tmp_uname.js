const Restaurant = require('./models/Restaurant');
const User = require('./models/User');
(async () => {
  for (const id of [5,16,24,25]) {
    const r = await Restaurant.findByPk(id, { attributes:['id','name'], raw:true });
    const us = await User.findAll({ where:{restaurant_id:id}, attributes:['id','username','role'], raw:true });
    console.log(`#${id} "${r.name}" users:`, us.map(u=>`${u.username}(${u.role})`).join(', '));
  }
  process.exit(0);
})();
