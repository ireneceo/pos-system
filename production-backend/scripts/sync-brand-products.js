const { BrandProduct, Brand, Ingredient } = require('../models');

async function syncAllProducts() {
  const products = await BrandProduct.findAll({
    include: [{ model: Brand, as: 'brands', through: { attributes: [] } }]
  });

  console.log('Found', products.length, 'products');

  for (const product of products) {
    if (!product.brands || product.brands.length === 0) {
      console.log('Product', product.id, product.name, 'has no brands');
      continue;
    }

    for (const brand of product.brands) {
      let ingredient = await Ingredient.findOne({
        where: { brand_product_id: product.id, brand_id: brand.id }
      });

      const data = {
        owner_type: 'brand',
        brand_id: brand.id,
        restaurant_id: null,
        brand_product_id: product.id,
        code: product.sku || null,
        name: product.name,
        image_url: product.image_url || null,
        category: 'other',
        unit: product.unit || 'piece',
        unit_cost: product.unit_price || 0,
        supplier_name: null,
        min_stock: 0,
        current_stock: 0,
        is_active: product.is_active
      };

      if (ingredient) {
        await ingredient.update(data);
        console.log('Updated ingredient for:', product.name, '-> brand', brand.id);
      } else {
        await Ingredient.create(data);
        console.log('Created ingredient for:', product.name, '-> brand', brand.id);
      }
    }
  }

  console.log('Done!');
  process.exit(0);
}

syncAllProducts().catch(e => { console.error(e); process.exit(1); });
