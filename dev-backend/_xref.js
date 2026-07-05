require('dotenv/config');
const { sequelize } = require('./config/database');
(async () => {
  const q = async (s) => (await sequelize.query(s))[0];
  const Q1 = `SELECT COUNT(*) c FROM restaurant_ingredient_costs ric
    JOIN restaurants r ON ric.restaurant_id=r.id
    JOIN ingredients i ON ric.ingredient_id=i.id
    WHERE i.owner_type='brand' AND i.brand_id IS NOT NULL
      AND (r.brand_id IS NULL OR i.brand_id<>r.brand_id)`;
  const Q2 = `SELECT COUNT(*) c FROM recipe_ingredients ri
    JOIN recipes rec ON ri.recipe_id=rec.id
    JOIN restaurants r ON rec.restaurant_id=r.id
    JOIN ingredients i ON ri.ingredient_id=i.id
    WHERE i.owner_type='brand' AND i.brand_id IS NOT NULL
      AND (r.brand_id IS NULL OR i.brand_id<>r.brand_id)`;
  console.log('Q1 cost-override → sibling-brand ingredient:', (await q(Q1))[0].c);
  console.log('Q2 restaurant-recipe → sibling-brand ingredient:', (await q(Q2))[0].c);
  await sequelize.close();
})();
