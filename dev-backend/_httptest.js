const jwt = require('jsonwebtoken');
const db = require('./models');
const { User } = db;
const BASE = 'http://localhost:3001/api';
(async () => {
  const u = await User.findOne({ where: { restaurant_id: 1, role: ['Restaurant Admin','Restaurant Owner'] } });
  if (!u) { console.log('NO RA USER'); await db.sequelize.close(); return; }
  const token = jwt.sign({ userId: u.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
  const H = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
  const cat = await db.Category.findOne({ where: { restaurant_id: 1 } });
  const comps = await db.Product.findAll({ where: { restaurant_id:1, is_set_menu:false, is_active:true }, attributes:['id'], limit:3 });
  const [m,c1,c2] = comps;

  // 1) 유효한 세트 저장 (POST)
  let r = await fetch(`${BASE}/menu/product`, { method:'POST', headers:H, body: JSON.stringify({
    name:'__HTTP TEST 세트__', category: cat.name, price: 20, is_set_menu:true,
    set_groups:[{id:'g1',label:'메인',type:'fixed',items:[{product_id:m.id,qty:1}]},
                {id:'g2',label:'택1',type:'choice',min:1,max:1,items:[{product_id:c1.id,upcharge:0},{product_id:c2.id,upcharge:3}]}]
  })});
  let j = await r.json(); const setId = j.data && j.data.id;
  console.log('POST valid set -> '+r.status+' id='+setId);

  // 2) 잘못된 세트 (choice max > items) -> 400 기대
  r = await fetch(`${BASE}/menu/product`, { method:'POST', headers:H, body: JSON.stringify({
    name:'__HTTP BAD__', category: cat.name, price:10, is_set_menu:true,
    set_groups:[{id:'x',label:'bad',type:'choice',min:1,max:5,items:[{product_id:c1.id}]}]
  })});
  console.log('POST invalid set -> '+r.status+' (400 기대) msg='+((await r.json()).message||'').slice(0,50));

  // 3) resolve (POS 단일상품)
  r = await fetch(`${BASE}/menu/product/${setId}?restaurantId=1`, { headers:H });
  j = await r.json();
  console.log('GET resolve -> '+r.status+' is_set='+j.data.is_set_menu+' groups='+(j.data.set_groups_resolved||[]).length+' available='+j.data.set_available);

  // 4) 삭제 (cleanup)
  r = await fetch(`${BASE}/menu/product/${setId}?restaurantId=1`, { method:'DELETE', headers:H });
  console.log('DELETE -> '+r.status);
  await db.sequelize.close();
})().catch(async e=>{console.error('ERR',e.message); try{await db.sequelize.close();}catch{}});
