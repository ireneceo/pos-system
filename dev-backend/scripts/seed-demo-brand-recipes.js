/**
 * seed-demo-brand-recipes.js — Idempotent demo data top-up.
 *
 * Why this exists: the demo Brand General account (demo-brand@purplehere.com) owns the
 * "K-Taste Group" brand and a set of brand-level ProductIngredients, but had ZERO
 * brand-level ProductRecipes on its primary brand. Because the Brand Menu / recipe list
 * is brand-scoped (applyBrandFilter → single selected brand_id), the "Linked Recipe"
 * dropdown showed empty for the demo — while ingredients (owner_user_id scoped) still
 * appeared. That looked like a bug ("Linked Recipe 안불러옴") but was simply missing demo data.
 * (Fable 진단 2026-07-05)
 *
 * This script adds a few signature recipes on the demo brand, reusing the demo brand's
 * existing ProductIngredients. It is:
 *   - IDEMPOTENT: if the demo brand already has any ProductRecipe, it does nothing.
 *   - SELF-GUARDED: if the demo brand or its ingredients are missing, it logs and skips
 *     (never throws), so it is safe to chain in a deploy without blocking.
 *   - PRODUCTION-LOGIC-NEUTRAL: only inserts demo rows; changes no app code path.
 *
 * Run standalone:  node scripts/seed-demo-brand-recipes.js
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const Brand = require('../models/Brand');
const ProductRecipe = require('../models/ProductRecipe');
const ProductRecipeIngredient = require('../models/ProductRecipeIngredient');
const ProductIngredient = require('../models/ProductIngredient');

const DEMO_BRAND_CODE = 'DEMO-BRAND';

async function seedDemoBrandRecipes() {
  const brand = await Brand.findOne({ where: { code: DEMO_BRAND_CODE }, attributes: ['id', 'owner_id', 'name'] });
  if (!brand) {
    console.log('[demo-brand-recipes] Demo brand (DEMO-BRAND) not found — skip.');
    return { skipped: true };
  }

  const existing = await ProductRecipe.count({ where: { brand_id: brand.id } });
  if (existing > 0) {
    console.log(`[demo-brand-recipes] Brand ${brand.id} (${brand.name}) already has ${existing} recipe(s) — idempotent skip.`);
    return { skipped: true };
  }

  // Brand-level ingredients are scoped by owner_user_id (the brand owner), not brand_id.
  const ingredients = await ProductIngredient.findAll({
    where: { owner_user_id: brand.owner_id },
    attributes: ['id', 'name', 'code', 'unit']
  });
  const byCode = {};
  ingredients.forEach(i => { if (i.code) byCode[i.code] = i; });

  if (ingredients.length === 0) {
    console.log(`[demo-brand-recipes] Brand owner ${brand.owner_id} has no ProductIngredients — skip (nothing to link).`);
    return { skipped: true };
  }

  // Recipe blueprints reference ingredients by their demo code (PI-00x); any missing
  // code is simply dropped so the script still works on a partial ingredient set.
  const blueprints = [
    {
      code: 'PR-D01', name: 'Signature Brown Sugar Latte', emoji: '☕',
      description: 'House-blend espresso with condensed milk and brown sugar syrup over ice.',
      yield_unit: 'cup', suggested_price: 12.90,
      items: [
        { code: 'PI-003', quantity: 18, notes: 'Double shot, house blend' },
        { code: 'PI-004', quantity: 30 },
        { code: 'PI-006', quantity: 25 },
        { code: 'PI-007', quantity: 1 },
        { code: 'PI-008', quantity: 1 },
      ],
    },
    {
      code: 'PR-D02', name: 'Aloe Green Tea Cooler', emoji: '🍵',
      description: 'Whisked green tea with chewy aloe vera cubes and a touch of brown sugar.',
      yield_unit: 'cup', suggested_price: 11.50,
      items: [
        { code: 'PI-009', quantity: 5 },
        { code: 'PI-005', quantity: 40 },
        { code: 'PI-006', quantity: 15 },
        { code: 'PI-007', quantity: 1 },
        { code: 'PI-008', quantity: 1 },
      ],
    },
    {
      code: 'PR-D03', name: 'Honey Citron Yuja Tea', emoji: '🍯',
      description: 'Warm yuja marmalade tea finished with a fresh lemon slice.',
      yield_unit: 'cup', suggested_price: 10.90,
      items: [
        { code: 'PI-001', quantity: 45 },
        { code: 'PI-002', quantity: 1 },
      ],
    },
  ];

  let created = 0;
  await sequelize.transaction(async (t) => {
    for (const bp of blueprints) {
      const recipe = await ProductRecipe.create({
        brand_id: brand.id,
        code: bp.code,
        name: bp.name,
        emoji: bp.emoji,
        description: bp.description,
        yield_amount: 1,
        yield_unit: bp.yield_unit,
        suggested_price: bp.suggested_price,
        is_active: true,
      }, { transaction: t });

      let cost = 0;
      for (const it of bp.items) {
        const ing = byCode[it.code];
        if (!ing) continue; // ingredient not present on this DB — skip the line
        await ProductRecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: ing.id,
          quantity: it.quantity,
          unit: ing.unit,
          cost: 0,
          notes: it.notes || null,
        }, { transaction: t });
      }
      await recipe.update({ total_ingredient_cost: cost }, { transaction: t });
      created += 1;
    }
  });

  console.log(`[demo-brand-recipes] Created ${created} recipe(s) on brand ${brand.id} (${brand.name}).`);
  return { skipped: false, created };
}

module.exports = { seedDemoBrandRecipes };

if (require.main === module) {
  seedDemoBrandRecipes()
    .then(() => { console.log('[demo-brand-recipes] Done.'); process.exit(0); })
    .catch((e) => { console.error('[demo-brand-recipes] Error:', e.message); process.exit(1); });
}
