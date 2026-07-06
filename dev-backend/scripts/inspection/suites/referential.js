/**
 * suites/referential.js — 레시피·상품·재고 그래프 참조무결성.
 * 대롱거리는 FK(삭제된 레시피/재고를 가리키는 상품·구성)는 빈화면·"셀러정보 이상표시"·발주오류의
 * 근원. 판매(메뉴/판매품목)→레시피→재고 경로가 실제로 이어져 있는지 검사.
 */
module.exports = {
  name: 'referential',
  async run({ q }) {
    const checks = [];
    const add = (name, pass, detail) => checks.push({ name, pass, detail });
    const cnt = async (sql) => Number((await q(sql))[0].c);

    // S-REF-001: BrandProduct.product_recipe_id → 존재하는 ProductRecipe
    add('S-REF-001 판매품목 레시피 참조 유효',
      (await cnt(`SELECT COUNT(*) c FROM brand_products bp WHERE bp.product_recipe_id IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM product_recipes r WHERE r.id = bp.product_recipe_id)`)) === 0,
      '', );

    // S-REF-002: ProductRecipeIngredient.ingredient_id → 존재하는 ProductIngredient
    const r2 = await cnt(`SELECT COUNT(*) c FROM product_recipe_ingredients pri
      WHERE NOT EXISTS (SELECT 1 FROM product_ingredients pi WHERE pi.id = pri.ingredient_id)`);
    add('S-REF-002 BG 레시피구성 재고 참조 유효', r2 === 0, r2 ? `${r2}건 대롱` : '');

    // S-REF-003: RecipeIngredient.ingredient_id → 존재하는 Ingredient (레스토랑측)
    const r3 = await cnt(`SELECT COUNT(*) c FROM recipe_ingredients ri
      WHERE NOT EXISTS (SELECT 1 FROM ingredients i WHERE i.id = ri.ingredient_id)`);
    add('S-REF-003 레스토랑 레시피구성 재고 참조 유효', r3 === 0, r3 ? `${r3}건 대롱` : '');

    // S-REF-004: products.recipe_id → 존재하는 recipes (메뉴→레시피)
    const r4 = await cnt(`SELECT COUNT(*) c FROM products p WHERE p.recipe_id IS NOT NULL
      AND NOT EXISTS (SELECT 1 FROM recipes r WHERE r.id = p.recipe_id)`);
    add('S-REF-004 메뉴 레시피 참조 유효', r4 === 0, r4 ? `${r4}건 대롱` : '');

    // S-REF-005: Ingredient.brand_product_id(미러) → 존재하는 BrandProduct
    const r5 = await cnt(`SELECT COUNT(*) c FROM ingredients i WHERE i.brand_product_id IS NOT NULL
      AND NOT EXISTS (SELECT 1 FROM brand_products bp WHERE bp.id = i.brand_product_id)`);
    add('S-REF-005 재고 미러의 판매품목 참조 유효', r5 === 0, r5 ? `${r5}건 대롱 (삭제된 판매품목의 미러 잔존)` : '');

    return checks;
  },
};
