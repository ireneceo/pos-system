const db = require('./models');
const { Product, OptionGroup, Category } = db;
(async () => {
  const RID = 1;
  const cat = await Category.findOne({ where: { restaurant_id: RID } });
  const prods = await Product.findAll({ where: { restaurant_id: RID, is_set_menu: false, is_active: true }, attributes: ['id','name','price','optionGroups','soldOut'], limit: 50 });
  const withOpts = prods.filter(p => { let o=p.optionGroups; try{ if(typeof o==='string')o=JSON.parse(o);}catch{} return Array.isArray(o)&&o.length>0; });
  const main = withOpts[0] || prods[0];
  const c1 = withOpts[1] || prods[1];
  const c2 = prods.find(p => p.id!==main.id && p.id!==c1.id) || prods[2];
  if (!cat||!main||!c1||!c2){ console.log('TESTSKIP'); await db.sequelize.close(); return; }
  const set_groups = [
    { id:'g1', label:'메인(고정)', type:'fixed', items:[{ product_id: main.id, qty:1 }] },
    { id:'g2', label:'택1', type:'choice', min:1, max:1, items:[{ product_id: c1.id, upcharge:0 }, { product_id: c2.id, upcharge:2 }] }
  ];
  const set = await Product.create({ restaurant_id: RID, name:'__TEST 세트__', category: cat.name, price: 19.9, is_set_menu:true, set_groups, is_active:true });
  console.log('TESTSET_ID='+set.id+' MAIN='+main.id+'('+main.name+') C1='+c1.id+' C2='+c2.id+' mainOpts='+JSON.stringify(main.optionGroups));
  await db.sequelize.close();
})().catch(async e=>{console.error('ERR',e.message); try{await db.sequelize.close();}catch{}});
