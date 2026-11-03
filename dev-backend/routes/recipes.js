const express = require('express');
const { menuCategoryError } = require('../utils/menuCategoryTree');
const router = express.Router();
const { Recipe, Ingredient, RecipeIngredient, Restaurant, Product, RecipeCategory, Category, RestaurantIngredientCost } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { Op } = require('sequelize');

// 재료 해석·검증 헬퍼 5개는 services/recipeIngredientResolve.js 로 옮겼다(순수 이동, 2026-11-03 — CSV 업로드와 공용).
const {
  resolveStockItemsToMirrors,
  loadIngredientMap,
  loadRestaurantCostOverrides,
  withOverrideCost,
  findDisallowedIngredientIds
} = require('../services/recipeIngredientResolve');
const { canEditRecipe, isBrandManager } = require('../middleware/recipeAuth');
const { requireRestaurantModule } = require('../middleware/requireModule');
const { generateRecipeCode } = require('../utils/codeGenerator');
const { resolveLineCost, convertQuantity } = require('../utils/recipeCost');
const { processImage, deleteOldImages } = require('../utils/imageProcessor');

// Tier gate (P0-3, 2026-06-08): a restaurant managing its OWN recipes is an
// Advanced-tier feature (recipe_management module — Enterprise, or granted via
// brand/foodcourt plan). Scoped to the restaurant's own recipe paths only.
// NOT applied to /restaurants/:id/brand-recipes (read of HQ-pushed recipes) so a
// franchise branch can always see the brand's recipes regardless of its own tier.
// ── 레시피 «목록» GET 이 줄마다 싣는 재료 칸 (2026-11-03 Fable 판정 · docs/RECIPE_MANAGEMENT_SYSTEM.md «레시피 목록 속도») ──
//   예전엔 줄마다 재료 행 35칸을 통째로 실어(줄당 ~1.1KB) 운영 브랜드 목록이 무거웠다. 화면이 쓰는 칸만 내려준다.
//   칸 근거(사용 칸 합집합 — 칸을 빼기 전 다시 grep 할 것):
//     RecipesTab lineCost/resolveIng/상세 표/선택기 = id·name·unit·unit_cost·base_quantity (+ 서버가 붙이는 effective_cost·restaurant_cost)
//     services/storeCost.effectiveStoreCost = owner_type·restaurant_id·unit_cost · brand-recipes 줄 계산 = unit_cost·base_quantity·unit
//     선택기 거울 판정·꺼진 재료 = source_product_ingredient_id·source_brand_product_id·source_recipe_id·is_active
//     BrandMenusPage·MenuManagementPage 는 재료 칸을 읽지 않는다(레시피 이름·id 만).
//   ⚠ health-check [recipes] «목록 재료 칸 = 이 상수» 계약이 덜 와도·더 와도 막는다.
const RECIPE_LIST_INGREDIENT_ATTRS = ['id', 'name', 'unit', 'unit_cost', 'base_quantity', 'owner_type', 'restaurant_id', 'is_active',
  'source_product_ingredient_id', 'source_brand_product_id', 'source_recipe_id'];
// 카드·상세·표·CSV 가 쓰는 분류 칸 = name·emoji (+ id·is_active).
const RECIPE_LIST_CATEGORY_ATTRS = ['id', 'name', 'emoji', 'is_active'];

const recipeGate = requireRestaurantModule('recipe_management', 'restaurantId');
router.use('/restaurants/:restaurantId/recipes', authenticateToken, recipeGate);
router.use('/restaurants/:restaurantId/products/create-from-recipe', authenticateToken, recipeGate);

// ============================================
// 레시피 CSV 업로드 — 미리보기 · 확정 · 되돌리기 · 기록 (2026-11-03 Fable 설계)
//   docs/RECIPE_MANAGEMENT_SYSTEM.md «CSV 업로드 + 표 보기». 로직은 services/recipeImport.js 하나.
//   ⚠ `/recipes/:recipeId` 라우트보다 **위**에 둔다(import 가 recipeId 로 잡히지 않게).
//   매장 경로는 위 router.use 의 recipeGate(요금제 모듈)가 접두로 함께 걸린다.
// ============================================
const multer = require('multer');
const recipeImport = require('../services/recipeImport');
const recipeCsvUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || /\.csv$/i.test(file.originalname || '')) cb(null, true);
    else cb(new recipeImport.ImportError('Only CSV files are allowed'));
  }
});
const takeCsv = (req, res, next) => recipeCsvUpload.single('file')(req, res, (err) => {
  if (!err) return next();
  const msg = err.code === 'LIMIT_FILE_SIZE' ? 'File is larger than 2 MB' : (err.message || 'Upload failed');
  return res.status(400).json({ success: false, message: msg });
});
const brandScope = (req) => ({ kind: 'brand', brandId: parseInt(req.params.brandId, 10) });
const restaurantScope = (req) => ({ kind: 'restaurant', restaurantId: parseInt(req.params.restaurantId, 10) });
const importHandler = (fn) => async (req, res) => {
  try {
    const data = await fn(req);
    res.json({ success: true, data });
  } catch (e) {
    if (e instanceof recipeImport.ImportError) return res.status(e.status).json({ success: false, message: e.message });
    console.error('Recipe CSV import error:', e);
    res.status(500).json({ success: false, message: 'Recipe import failed' });
  }
};

router.post('/brands/:brandId/recipes/import/preview', authenticateToken, isBrandManager, takeCsv,
  importHandler((req) => recipeImport.preview(brandScope(req), req.file, req.body.matching)));
router.post('/brands/:brandId/recipes/import/execute', authenticateToken, isBrandManager, takeCsv,
  importHandler((req) => recipeImport.execute(brandScope(req), req.file, req.body.matching, req.user)));
router.post('/brands/:brandId/recipes/import/:batchId/undo', authenticateToken, isBrandManager,
  importHandler((req) => recipeImport.undo(brandScope(req), req.params.batchId)));
router.get('/brands/:brandId/recipes/import/history', authenticateToken, isBrandManager,
  importHandler((req) => recipeImport.history(brandScope(req))));

router.post('/restaurants/:restaurantId/recipes/import/preview', authenticateToken, checkRestaurantAccess, takeCsv,
  importHandler((req) => recipeImport.preview(restaurantScope(req), req.file, req.body.matching)));
router.post('/restaurants/:restaurantId/recipes/import/execute', authenticateToken, checkRestaurantAccess, takeCsv,
  importHandler((req) => recipeImport.execute(restaurantScope(req), req.file, req.body.matching, req.user)));
router.post('/restaurants/:restaurantId/recipes/import/:batchId/undo', authenticateToken, checkRestaurantAccess,
  importHandler((req) => recipeImport.undo(restaurantScope(req), req.params.batchId)));
router.get('/restaurants/:restaurantId/recipes/import/history', authenticateToken, checkRestaurantAccess,
  importHandler((req) => recipeImport.history(restaurantScope(req))));

// ============================================
// Brand Recipes (Brand General/Manager)
// ============================================

/**
 * GET /api/brands/:brandId/recipes
 * 브랜드 레시피 목록 조회
 */
router.get('/brands/:brandId/recipes', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용

    const recipes = await Recipe.findAll({
      where: { brand_id },
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient', attributes: RECIPE_LIST_INGREDIENT_ATTRS }]
        },
        {
          model: RecipeCategory,
          as: 'recipeCategory',
          attributes: RECIPE_LIST_CATEGORY_ATTRS
        }
      ],
      // 재료 줄은 **입력한 순서**로 고정한다 — 정렬이 없으면 DB 반환 순서라 화면과 다운로드가 달라질 수 있다
      order: [['created_at', 'DESC'], [{ model: RecipeIngredient, as: 'recipeIngredients' }, 'id', 'ASC']]
    });

    res.json({ success: true, data: await attachPrepFlag(recipes) });
  } catch (error) {
    console.error('Get brand recipes error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch recipes', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/brands/:brandId/recipes
 * 브랜드 레시피 생성
 */


/**
 * 목록 응답에 «준비 레시피인가» 를 붙인다 (2026-09-17 Fable 판정).
 *   스위치의 진실은 «그 레시피에서 나온 재료 행이 살아 있는가» 하나뿐이라, 여기서 한 번에 읽는다(N+1 방지).
 */
async function attachPrepFlag(recipes) {
  const ids = recipes.map(r => r.id).filter(Boolean);
  if (!ids.length) return recipes.map(r => (typeof r.toJSON === 'function' ? r.toJSON() : r));
  const rows = await Ingredient.findAll({
    where: { source_recipe_id: ids, is_active: true },
    attributes: ['id', 'name', 'unit', 'source_recipe_id']
  });
  const byRecipe = {};
  for (const i of rows) byRecipe[i.source_recipe_id] = { id: i.id, name: i.name, unit: i.unit };
  return recipes.map(r => {
    const plain = typeof r.toJSON === 'function' ? r.toJSON() : r;
    const ing = byRecipe[plain.id] || null;
    return { ...plain, is_prep_ingredient: !!ing, prep_ingredient: ing };
  });
}

// ── 준비된 재고(1차 가공) — 레시피 저장 뒤 재료 행을 맞춘다 (2026-09-17 Fable 판정) ──────────────
//   요청 body 의 `is_prep_ingredient` 가 스위치다. 없으면 현 상태 유지(이름·원가만 다시 맞춤).
//   스위치의 단일 진실은 «그 레시피에서 나온 재료 행이 살아 있는가» 하나 — Recipe 에 플래그를 두지 않는다.
async function applyPrepSwitch(res, recipe, body, { createdNow = false } = {}) {
  const { syncPrepIngredientForRecipe, PrepError, getPrepIngredient } = require('../services/prepIngredientSync');
  let wanted;
  if (body && Object.prototype.hasOwnProperty.call(body, 'is_prep_ingredient')) {
    wanted = body.is_prep_ingredient === true || body.is_prep_ingredient === 'true';
  }
  try {
    await syncPrepIngredientForRecipe(recipe, wanted);
    const ing = await getPrepIngredient(recipe.id);
    return {
      ok: true,
      is_prep_ingredient: !!ing,
      prep_ingredient: ing ? { id: ing.id, name: ing.name, unit: ing.unit, unit_cost: ing.unit_cost, current_stock: ing.current_stock } : null
    };
  } catch (e) {
    if (e instanceof PrepError) {
      // **새로 만드는 중이었다면 그 레시피는 없던 일로 한다.** 안 지우면 400 을 받고도 레시피만
      //   덩그러니 남아, 목록에 «준비 재료가 아닌 준비 레시피» 라는 애매한 줄이 생긴다.
      //   (2026-09-17 실호출에서 실제로 남았다 — yield_unit=portion 거부 케이스.)
      if (createdNow) {
        try {
          await RecipeIngredient.destroy({ where: { recipe_id: recipe.id }, force: true });
          await recipe.destroy({ force: true });
        } catch (cleanupErr) {
          console.error('[prep] 실패한 레시피 정리 실패:', cleanupErr.message);
        }
      }
      res.status(e.status).json({ success: false, error: { message: e.message, code: e.code }, message: e.message, detail: e.detail });
      return { ok: false };
    }
    throw e;
  }
}

// ── 준비 레시피 삭제 게이트 (2026-09-18 Fable 판정) ───────────────────────────────────────────
//   삭제는 스위치 OFF 보다 **강한 행위**인데, 예전엔 OFF 보다 **약한 방어**였다 —
//   OFF 는 재고가 남았거나 쓰는 레시피가 있으면 409 로 막는데, 삭제는 그냥 지워
//   준비 재료 행이 «사라진 레시피를 가리킨 채 활성» 으로 남았다(개발서버 재현 확인).
//   그 행은 선택기에 계속 나와 새 레시피에 쓰일 수 있고, 그러면 팔릴 때 차감은 되는데
//   보충할 «만들기» 레시피가 없어 재고·원가 장부가 어긋난다.
//   사실 관계(2026-09-18 실측): `recipes` 는 soft delete 가 **아니다**(paranoid 아님·deleted_at 없음).
//      그래서 FK `fk_ingredients_source_recipe`(ON DELETE SET NULL)가 실제로 발동해
//      삭제 뒤 준비 재료는 **비활성 + 출처 없음**이 된다 — 그게 설계된 최종 상태다(재고 0·배치·장부 보존).
//      게이트의 몫은 «거부(409) 와 비활성» 뿐이다.
//      SQL 로 레시피를 직접 지우는 우회는 브랜드 행이면 ING-UNI-002(출처 셋 다 NULL)가 잡고,
//      이 코드 경로의 회귀는 health-check 「준비 레시피 삭제 게이트」 계약이 받친다.
//   순서 고정: disable → Product 연결 해제 → destroy. 409 로 거부됐는데 메뉴 연결만
//   풀리는 부분 실행을 막는다(트랜잭션이 있어도 순서는 이렇게 둔다).
async function deleteRecipeWithPrepGate(res, recipe) {
  const { disablePrepIngredient, PrepError } = require('../services/prepIngredientSync');
  const sequelize = require('../config/database').sequelize;
  const t = await sequelize.transaction();
  try {
    await disablePrepIngredient(recipe.id, { transaction: t });   // 준비 레시피가 아니면 그냥 통과
    await Product.update({ recipe_id: null }, { where: { recipe_id: recipe.id }, transaction: t });
    await recipe.destroy({ transaction: t });
    await t.commit();
    return { ok: true };
  } catch (e) {
    await t.rollback();
    if (e instanceof PrepError) {
      // 프론트가 이미 아는 코드를 그대로 쓴다 — 새 에러 코드를 만들지 않는다.
      res.status(e.status).json({ success: false, error: { message: e.message, code: e.code }, message: e.message, detail: e.detail });
      return { ok: false };
    }
    throw e;
  }
}

router.post('/brands/:brandId/recipes', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const { name, description, category, recipe_category_id, emoji, image, option_groups, ingredients: rawIngredients, yield_amount, yield_unit, prep_time, cook_time, instructions, instructions_summary, instructions_detail, suggested_price } = req.body;
    // F4: 재료 선택기가 Stock Item 을 보냈으면 이 브랜드의 거울로 해석한다(없으면 공유를 켜고 만든다).
    const ingredients = await resolveStockItemsToMirrors(rawIngredients, parseInt(brandId, 10));

    // 필수 필드 검증
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Recipe name is required', code: 'VALIDATION_ERROR' } });
    }

    // 이미지 처리 (base64 → 파일 저장)
    let imageUrl = null;
    if (image && image.startsWith('data:image')) {
      const processed = await processImage(image);
      imageUrl = processed?.original || null;
    } else if (image) {
      imageUrl = image; // 이미 URL인 경우
    }

    // Auto-generate code if not provided
    const finalCode = req.body.code || await generateRecipeCode(Recipe, 'brand', brandId);

    // 재료 소유권 검증 — 이 브랜드 재료만 (타 브랜드/타 매장 재료 참조 차단)
    const badIng = await findDisallowedIngredientIds(ingredients, { brandId: brand_id });
    if (badIng.length) {
      return res.status(400).json({ success: false, message: `Ingredient not in this brand: ${badIng.join(', ')}` });
    }

    // 레시피 생성 (owner_type = 'brand')
    const recipe = await Recipe.create({
      owner_type: 'brand',
      brand_id,
      restaurant_id: null,
      code: finalCode,
      name: name.trim(),
      description: description || null,
      category: category || null,
      recipe_category_id: recipe_category_id || null,
      emoji: emoji || null,
      image: imageUrl,
      option_groups: option_groups || null,
      yield_amount: yield_amount || 1,
      yield_unit: yield_unit || 'portion',
      prep_time: prep_time ? parseInt(prep_time) : null,
      cook_time: cook_time ? parseInt(cook_time) : null,
      instructions: instructions || null,
      instructions_summary: instructions_summary || null,
      instructions_detail: instructions_detail || null,
      suggested_price: suggested_price ? parseFloat(suggested_price) : 0,
      total_ingredient_cost: 0
    });

    // 재료 추가 및 원가 계산 — **원가는 서버가 재료 단가에서 계산한다** (2026-09-09 Irene 지시).
    //   화면이 보낸 값을 그대로 믿던 탓에, 화면이 재료를 못 찾는 순간 0 이 DB 에 박혔다.
    //   단위 환산이 불가한 줄만 화면 값으로 폴백한다(utils/recipeCost.js).
    let totalCost = 0;
    if (ingredients && ingredients.length > 0) {
      const ingMap = await loadIngredientMap(ingredients);
      for (const item of ingredients) {
        const cost = resolveLineCost(ingMap.get(parseInt(item.ingredient_id, 10)), item, null);
        await RecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: item.ingredient_id,
          quantity: item.quantity,
          unit: item.unit,
          cost,
          notes: item.notes || null
        });
        totalCost += cost;
      }
    }

    // 총 원가 업데이트
    await recipe.update({ total_ingredient_cost: totalCost });

    // 재료 포함해서 다시 조회
    const createdRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        },
        {
          model: RecipeCategory,
          as: 'recipeCategory'
        }
      ]
    });

    const prep = await applyPrepSwitch(res, recipe, req.body, { createdNow: true });
    if (!prep.ok) return;
    res.json({ success: true, data: createdRecipe, ...prep });
  } catch (error) {
    console.error('Create brand recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create recipe', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/brands/:brandId/recipes/:recipeId
 * 브랜드 레시피 수정
 */
router.put('/brands/:brandId/recipes/:recipeId', authenticateToken, canEditRecipe, async (req, res) => {
  try {
    const { brandId, recipeId } = req.params;
    const recipe_id = recipeId; // DB 쿼리용
    const { name, description, category, recipe_category_id, emoji, image, option_groups, ingredients: rawIngredients, yield_amount, yield_unit, prep_time, cook_time, instructions, instructions_summary, instructions_detail, suggested_price } = req.body;
    // F4: 재료 선택기가 Stock Item 을 보냈으면 이 브랜드의 거울로 해석한다(없으면 공유를 켜고 만든다).
    const ingredients = await resolveStockItemsToMirrors(rawIngredients, parseInt(brandId, 10));

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
    }

    // 기본 정보 업데이트 (빈 문자열은 null로 처리)
    const updateData = {};
    if (name !== undefined) updateData.name = name || recipe.name;
    if (description !== undefined) updateData.description = description || null;
    if (category !== undefined) updateData.category = category || null;
    if (recipe_category_id !== undefined) updateData.recipe_category_id = recipe_category_id || null;
    if (emoji !== undefined) updateData.emoji = emoji || null;
    if (image !== undefined) {
      let newImageUrl = image || null;
      if (image && image.startsWith('data:image')) {
        const processed = await processImage(image);
        newImageUrl = processed?.original || null;
      }
      if (newImageUrl && recipe.image && newImageUrl !== recipe.image) {
        await deleteOldImages(recipe.image);
      }
      updateData.image = newImageUrl;
    }
    if (option_groups !== undefined) updateData.option_groups = option_groups || null;
    if (yield_amount !== undefined) updateData.yield_amount = yield_amount || 1;
    if (yield_unit !== undefined) updateData.yield_unit = yield_unit || 'portion';
    if (prep_time !== undefined) updateData.prep_time = prep_time ? parseInt(prep_time) : null;
    if (cook_time !== undefined) updateData.cook_time = cook_time ? parseInt(cook_time) : null;
    if (instructions !== undefined) updateData.instructions = instructions || null;
    if (instructions_summary !== undefined) updateData.instructions_summary = instructions_summary || null;
    if (instructions_detail !== undefined) updateData.instructions_detail = instructions_detail || null;
    if (suggested_price !== undefined) updateData.suggested_price = suggested_price ? parseFloat(suggested_price) : 0;

    // 재료 소유권 검증 — 이 브랜드 재료만 (타 브랜드/타 매장 재료 참조 차단)
    // 기준은 **레시피의 실제 소유 브랜드**(`recipe.brand_id`). URL 의 `:brandId` 를 쓰면 브랜드 X
    // 소유자가 `/brands/Y/recipes/<X의 레시피>` 로 불러 Y 재료를 붙일 수 있다 — 권한 판정
    // (`canEditRecipe`)도 `recipe.brand_id` 로 하므로 기준을 그것에 맞춘다.
    // 2026-07-12~09-03: 선언된 적 없는 `brand_id` 를 읽어 **모든 브랜드 레시피 수정이
    // ReferenceError(500)로 실패**했다 — 조건 없이 도는 줄이라 이름만 고쳐도 막혔다.
    const badIng = await findDisallowedIngredientIds(ingredients, { brandId: recipe.brand_id });
    if (badIng.length) {
      return res.status(400).json({ success: false, message: `Ingredient not in this brand: ${badIng.join(', ')}` });
    }

    await recipe.update(updateData);
    // 재료 업데이트 (기존 삭제 후 재생성)
    if (ingredients) {
      // 지우기 전에 저장돼 있던 원가를 들고 있는다 — 서버 계산도, 화면 값도 못 쓸 때
      // **있던 값을 지키기 위해서**다(0 으로 덮지 않는다).
      const prevRows = await RecipeIngredient.findAll({ where: { recipe_id } });
      const prevCostByIngredient = new Map(prevRows.map(r => [r.ingredient_id, r.cost]));
      await RecipeIngredient.destroy({ where: { recipe_id } });

      // 원가는 서버가 재료 단가에서 계산한다 (2026-09-09 Irene 지시, utils/recipeCost.js).
      const ingMap = await loadIngredientMap(ingredients);
      let totalCost = 0;
      for (const item of ingredients) {
        const ingId = parseInt(item.ingredient_id, 10);
        const cost = resolveLineCost(ingMap.get(ingId), item, prevCostByIngredient.get(ingId));
        await RecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: item.ingredient_id,
          quantity: item.quantity,
          unit: item.unit,
          cost,
          notes: item.notes || null
        });
        totalCost += cost;
      }

      await recipe.update({ total_ingredient_cost: totalCost });
    }

    // 재료 포함해서 다시 조회
    const updatedRecipe = await Recipe.findByPk(recipe_id, {
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        },
        {
          model: RecipeCategory,
          as: 'recipeCategory'
        }
      ]
    });

    const prep = await applyPrepSwitch(res, recipe, req.body);
    if (!prep.ok) return;
    res.json({ success: true, data: updatedRecipe, ...prep });
  } catch (error) {
    console.error('Update brand recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update recipe', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * DELETE /api/brands/:brandId/recipes/:recipeId
 * 브랜드 레시피 삭제
 */
router.delete('/brands/:brandId/recipes/:recipeId', authenticateToken, canEditRecipe, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe_id = recipeId; // DB 쿼리용

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
    }

    // 준비 재료 게이트 + 메뉴 연결 해제 + 삭제를 한 트랜잭션으로 (S-REF-004 하니스: 대롱거리는 FK 방지)
    const gate = await deleteRecipeWithPrepGate(res, recipe);
    if (!gate.ok) return;

    res.json({ success: true, message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete brand recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete recipe', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Restaurant Recipes (Restaurant Admin)
// ============================================

/**
 * GET /api/restaurants/:restaurantId/recipes
 * 레스토랑 자체 레시피만 조회 (owner_type = 'restaurant')
 * 브랜드 레시피는 별도 API로 조회
 */
router.get('/restaurants/:restaurantId/recipes', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    // 레스토랑 자체 레시피만 조회 (owner_type = 'restaurant')
    const recipes = await Recipe.findAll({
      where: {
        restaurant_id: restaurantId,
        owner_type: 'restaurant'
      },
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient', attributes: RECIPE_LIST_INGREDIENT_ATTRS }]
        },
        {
          model: RecipeCategory,
          as: 'recipeCategory',
          attributes: RECIPE_LIST_CATEGORY_ATTRS
        }
      ],
      // 재료 줄은 입력한 순서로 고정 (브랜드 레시피 GET 과 같은 규칙 — 한 화면·한 파일에 섞여 나온다)
      order: [['created_at', 'DESC'], [{ model: RecipeIngredient, as: 'recipeIngredients' }, 'id', 'ASC']]
    });

    // 매장이 보는 원가를 줄마다 붙인다 (2026-09-11 §8-4 D-5) — 화면 lineCost 가 `effective_cost ?? unit_cost` 로 읽는다.
    //   매장 소유 재료 = 재료 행 · 브랜드 공유 재료 = 매장 오버레이(없으면 브랜드 원가). brand-recipes GET 과 같은 규칙.
    const { loadOverlayMap, effectiveStoreCost } = require('../services/storeCost');
    const ingIds = recipes.flatMap((r) => (r.recipeIngredients || []).map((ri) => ri.ingredient_id));
    const overlay = await loadOverlayMap(restaurantId, ingIds);
    const data = recipes.map((r) => {
      const plain = r.toJSON();
      (plain.recipeIngredients || []).forEach((ri) => {
        if (ri.ingredient) {
          ri.ingredient.effective_cost = effectiveStoreCost(ri.ingredient, overlay.get(ri.ingredient_id), restaurantId);
        }
      });
      return plain;
    });

    res.json({ success: true, data: await attachPrepFlag(data) });
  } catch (error) {
    console.error('Get restaurant recipes error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch recipes', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * GET /api/restaurants/:restaurantId/brand-recipes
 * 레스토랑이 속한 브랜드의 레시피 조회 (읽기 전용)
 */
router.get('/restaurants/:restaurantId/brand-recipes', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    // 브랜드에 속하지 않은 레스토랑
    if (!restaurant.brand_id) {
      return res.json({ success: true, data: [] });
    }

    // 브랜드 레시피 조회 (owner_type = 'brand')
    const brandRecipes = await Recipe.findAll({
      where: {
        brand_id: restaurant.brand_id,
        owner_type: 'brand'
      },
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient', attributes: RECIPE_LIST_INGREDIENT_ATTRS }]
        },
        {
          model: RecipeCategory,
          as: 'recipeCategory',
          attributes: RECIPE_LIST_CATEGORY_ATTRS
        }
      ],
      // 재료 줄은 입력한 순서로 고정 (브랜드 쪽 GET 과 같은 규칙)
      order: [['created_at', 'DESC'], [{ model: RecipeIngredient, as: 'recipeIngredients' }, 'id', 'ASC']]
    });

    // 레스토랑 코스트 오버라이드 조회
    //   브랜드 공유 재료의 오버레이만 읽는다(§8-4 D-5 · services/storeCost.js 단일 소스).
    const overlayMap = await require('../services/storeCost').loadOverlayMap(restaurantId);
    const costMap = {};
    overlayMap.forEach((v, k) => { costMap[k] = v; });

    // 각 레시피에 restaurant 기준 원가 계산
    const enrichedRecipes = brandRecipes.map(recipe => {
      const plain = recipe.toJSON();
      let restaurantTotalCost = 0;
      let hasAnyOverride = false;

      if (plain.recipeIngredients) {
        plain.recipeIngredients = plain.recipeIngredients.map(ri => {
          const brandUnitCost = ri.ingredient ? parseFloat(ri.ingredient.unit_cost) : 0;
          const baseQty = ri.ingredient ? parseFloat(ri.ingredient.base_quantity) || 1 : 1;
          const override = costMap[ri.ingredient_id];
          const effectiveUnitCost = override !== undefined ? override : brandUnitCost;
          const effectiveCostPerBase = effectiveUnitCost / baseQty;
          // 레시피 단위 → 재료 단위 환산(저장 경로 utils/recipeCost 와 같은 규칙). 안 되는 조합이면 0 으로 센다.
          const unitIng = ri.ingredient ? ri.ingredient.unit : ri.unit;
          const qty = convertQuantity(ri.quantity, ri.unit || unitIng, unitIng) || 0;
          const effectiveCost = qty * effectiveCostPerBase;
          const brandCost = qty * (brandUnitCost / baseQty);

          if (override !== undefined) hasAnyOverride = true;
          restaurantTotalCost += effectiveCost;

          ri.brand_cost = brandCost;
          ri.effective_cost = effectiveCost;
          if (ri.ingredient) {
            ri.ingredient.restaurant_cost = override !== undefined ? override : null;
            ri.ingredient.effective_cost = effectiveUnitCost;
          }
          return ri;
        });
      }

      plain.restaurant_ingredient_cost = hasAnyOverride ? restaurantTotalCost : null;
      plain.effective_ingredient_cost = restaurantTotalCost;
      return plain;
    });

    res.json({ success: true, data: enrichedRecipes });
  } catch (error) {
    console.error('Get brand recipes for restaurant error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch brand recipes', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/restaurants/:restaurantId/recipes
 * 레스토랑 레시피 생성 (모든 레스토랑 가능)
 */
router.post('/restaurants/:restaurantId/recipes', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, category, recipe_category_id, emoji, image, option_groups, ingredients, yield_amount, yield_unit, prep_time, cook_time, instructions, instructions_summary, instructions_detail, suggested_price } = req.body;

    // 필수 필드 검증
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Recipe name is required', code: 'VALIDATION_ERROR' } });
    }

    // 이미지 처리 (base64 → 파일 저장)
    let imageUrl = null;
    if (image && image.startsWith('data:image')) {
      const processed = await processImage(image);
      imageUrl = processed?.original || null;
    } else if (image) {
      imageUrl = image;
    }

    // Auto-generate code if not provided
    const finalCode = req.body.code || await generateRecipeCode(Recipe, 'restaurant', restaurantId);

    // 재료 소유권 검증 — 자기 매장 재료 ∪ 부모 브랜드 재료 (타 브랜드 재료 참조 차단)
    const badIng = await findDisallowedIngredientIds(ingredients, { restaurantId: parseInt(restaurantId, 10) });
    if (badIng.length) {
      return res.status(400).json({ success: false, message: `Ingredient not available to this restaurant: ${badIng.join(', ')}` });
    }

    // 레시피 생성 (owner_type = 'restaurant')
    const recipe = await Recipe.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      code: finalCode,
      name: name.trim(),
      description: description || null,
      category: category || null,
      recipe_category_id: recipe_category_id || null,
      emoji: emoji || null,
      image: imageUrl,
      option_groups: option_groups || null,
      yield_amount: yield_amount || 1,
      yield_unit: yield_unit || 'portion',
      prep_time: prep_time ? parseInt(prep_time) : null,
      cook_time: cook_time ? parseInt(cook_time) : null,
      instructions: instructions || null,
      instructions_summary: instructions_summary || null,
      instructions_detail: instructions_detail || null,
      suggested_price: suggested_price ? parseFloat(suggested_price) : 0,
      total_ingredient_cost: 0
    });

    // 재료 추가 및 원가 계산 — **서버가 계산한다**(2026-09-09 Irene 지시).
    //   매장은 자기가 보는 단가를 쓴다: 오버라이드가 있으면 그 값, 없으면 재료 단가.
    let totalCost = 0;
    if (ingredients && ingredients.length > 0) {
      const ingMap = await loadIngredientMap(ingredients);
      const overrides = await loadRestaurantCostOverrides(restaurantId, ingredients);
      for (const item of ingredients) {
        const ingId = parseInt(item.ingredient_id, 10);
        const cost = resolveLineCost(withOverrideCost(ingMap.get(ingId), overrides.get(ingId)), item, null);
        await RecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: item.ingredient_id,
          quantity: item.quantity,
          unit: item.unit,
          cost,
          notes: item.notes || null
        });
        totalCost += cost;
      }
    }

    await recipe.update({ total_ingredient_cost: totalCost });

    const createdRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        }
      ]
    });

    const prep = await applyPrepSwitch(res, recipe, req.body, { createdNow: true });
    if (!prep.ok) return;
    res.json({ success: true, data: createdRecipe, ...prep });
  } catch (error) {
    console.error('Create restaurant recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create recipe', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/recipes/:recipeId
 * 레스토랑 레시피 수정 (자신의 레시피만)
 */
router.put('/restaurants/:restaurantId/recipes/:recipeId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, recipeId } = req.params;

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
    }

    // 자신의 레시피인지 확인 (owner_type이 'restaurant'이고 restaurant_id가 일치해야 함)
    if (recipe.owner_type !== 'restaurant' || recipe.restaurant_id !== parseInt(restaurantId)) {
      return res.status(403).json({ success: false, error: { message: 'You can only edit your own restaurant recipes', code: 'FORBIDDEN' } });
    }

    const { name, description, category, emoji, image, option_groups, ingredients, yield_amount, yield_unit, prep_time, cook_time, instructions, instructions_summary, instructions_detail, suggested_price } = req.body;

    // 이미지 처리 (base64 → 파일 저장)
    let newImageUrl = image;
    if (image && image.startsWith('data:image')) {
      const processed = await processImage(image);
      newImageUrl = processed?.original || null;
    }
    if (newImageUrl && recipe.image && newImageUrl !== recipe.image) {
      await deleteOldImages(recipe.image);
    }

    // 기본 정보 업데이트
    // 재료 소유권 검증 — 자기 매장 재료 ∪ 부모 브랜드 재료 (타 브랜드 재료 참조 차단)
    const badIng = await findDisallowedIngredientIds(ingredients, { restaurantId: parseInt(restaurantId, 10) });
    if (badIng.length) {
      return res.status(400).json({ success: false, message: `Ingredient not available to this restaurant: ${badIng.join(', ')}` });
    }

    await recipe.update({
      name,
      description,
      category,
      emoji,
      image: newImageUrl,
      option_groups,
      yield_amount: yield_amount || recipe.yield_amount,
      yield_unit: yield_unit || recipe.yield_unit,
      prep_time,
      cook_time,
      instructions,
      instructions_summary,
      instructions_detail,
      suggested_price
    });


    // 재료 업데이트 (기존 삭제 후 재생성)
    if (ingredients) {
      // 지우기 전에 저장돼 있던 원가를 들고 있는다 — 마지막 폴백(0 으로 덮지 않기).
      const prevRows = await RecipeIngredient.findAll({ where: { recipe_id: recipeId } });
      const prevCostByIngredient = new Map(prevRows.map(r => [r.ingredient_id, r.cost]));
      await RecipeIngredient.destroy({ where: { recipe_id: recipeId } });

      // 서버가 계산한다. 매장은 오버라이드 단가가 있으면 그것이 자기 원가다.
      const ingMap = await loadIngredientMap(ingredients);
      const overrides = await loadRestaurantCostOverrides(restaurantId, ingredients);
      let totalCost = 0;
      for (const item of ingredients) {
        const ingId = parseInt(item.ingredient_id, 10);
        const cost = resolveLineCost(
          withOverrideCost(ingMap.get(ingId), overrides.get(ingId)), item, prevCostByIngredient.get(ingId));
        await RecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: item.ingredient_id,
          quantity: item.quantity,
          unit: item.unit,
          cost,
          notes: item.notes || null
        });
        totalCost += cost;
      }

      await recipe.update({ total_ingredient_cost: totalCost });
    }

    // 재료 포함해서 다시 조회
    const updatedRecipe = await Recipe.findByPk(recipeId, {
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        }
      ]
    });

    const prep = await applyPrepSwitch(res, recipe, req.body);
    if (!prep.ok) return;
    res.json({ success: true, data: updatedRecipe, ...prep });
  } catch (error) {
    console.error('Update restaurant recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update recipe', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/recipes/:recipeId
 * 레스토랑 레시피 삭제 (자신의 레시피만)
 */
router.delete('/restaurants/:restaurantId/recipes/:recipeId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, recipeId } = req.params;

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
    }

    // 자신의 레시피인지 확인 (owner_type이 'restaurant'이고 restaurant_id가 일치해야 함)
    if (recipe.owner_type !== 'restaurant' || recipe.restaurant_id !== parseInt(restaurantId)) {
      return res.status(403).json({ success: false, error: { message: 'You can only delete your own restaurant recipes', code: 'FORBIDDEN' } });
    }

    // 준비 재료 게이트 + 메뉴 연결 해제 + 삭제를 한 트랜잭션으로 (S-REF-004 하니스: 대롱거리는 FK 방지)
    const gate = await deleteRecipeWithPrepGate(res, recipe);
    if (!gate.ok) return;

    res.json({ success: true, message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete restaurant recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete recipe', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/restaurants/:restaurantId/products/create-from-recipe
 * 레시피를 메뉴로 등록
 */
router.post('/restaurants/:restaurantId/products/create-from-recipe', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { recipe_id, price } = req.body;

    // 레시피와 카테고리 정보를 함께 조회
    const recipe = await Recipe.findByPk(recipe_id, {
      include: [{
        model: RecipeCategory,
        as: 'recipeCategory'
      }]
    });
    if (!recipe) {
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
    }

    // 레시피 카테고리가 있으면 메뉴 카테고리로 매핑
    let categoryName = recipe.category; // 기본값: 기존 category 문자열

    if (recipe.recipeCategory) {
      const recipeCategoryName = recipe.recipeCategory.name;

      // 해당 레스토랑에 동일한 이름의 카테고리가 있는지 확인
      let menuCategory = await Category.findOne({
        where: {
          restaurant_id: restaurantId,
          name: recipeCategoryName
        }
      });

      // 없으면 새로 생성
      if (!menuCategory) {
        menuCategory = await Category.create({
          restaurant_id: restaurantId,
          name: recipeCategoryName,
          description: recipe.recipeCategory.description,
          emoji: recipe.recipeCategory.emoji,
          displayOrder: recipe.recipeCategory.display_order,
          isActive: true
        });
        console.log(`📦 새 메뉴 카테고리 생성: ${recipeCategoryName} (restaurant: ${restaurantId})`);
      }

      categoryName = menuCategory.name;
    }

    // 하위가 있는 카테고리(묶음 칸)에는 메뉴를 직접 담지 않는다 — utils/menuCategoryTree
    const catErr = await menuCategoryError(restaurantId, categoryName);
    if (catErr) return res.status(400).json(catErr);

    // 레시피의 모든 정보를 Product로 복사
    const product = await Product.create({
      restaurant_id: restaurantId,
      recipe_id,
      code: recipe.code,
      name: recipe.name,
      price,
      category: categoryName,
      description: recipe.description,
      optionGroups: recipe.option_groups,
      image: recipe.image,
      emoji: recipe.emoji,
      soldOut: false,
      is_set_menu: recipe.is_set_menu,
      set_items: recipe.set_items,
      set_display_order: recipe.set_display_order
    });

    res.json({
      success: true,
      data: product,
      message: 'Recipe has been added to the menu',
      category_created: recipe.recipeCategory && !categoryName ? false : !!recipe.recipeCategory
    });
  } catch (error) {
    console.error('Create product from recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create product', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/brands/:brandId/recipes/:recipeId/copy
 * Copy a brand recipe (with ingredients) to another brand the BG owns.
 *
 * body: { target_brand_id: number, name?: string }
 *
 * - Source brand ownership is enforced by `isBrandManager` middleware.
 * - Target brand ownership re-checked inside handler.
 * - recipe_category_id is NOT carried — categories are brand-scoped, re-link in target.
 * - Image URL is reused as-is (uploaded files survive a reference copy).
 */
router.post('/brands/:brandId/recipes/:recipeId/copy', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const sourceBrandId = parseInt(req.params.brandId, 10);
    const sourceRecipeId = parseInt(req.params.recipeId, 10);
    const targetBrandId = parseInt(req.body.target_brand_id, 10);

    if (!Number.isFinite(targetBrandId) || targetBrandId === sourceBrandId) {
      return res.status(400).json({
        success: false,
        error: { message: 'Valid target_brand_id required (must differ from source)', code: 'VALIDATION_ERROR' }
      });
    }

    // Target brand ownership check — re-use Brand model
    const { Brand } = require('../models');
    const targetBrand = await Brand.findByPk(targetBrandId);
    if (!targetBrand) {
      return res.status(404).json({ success: false, error: { message: 'Target brand not found', code: 'NOT_FOUND' } });
    }
    // System Admin skips ownership; otherwise the BG must own the target brand too
    if (req.user.role !== 'System Admin' && targetBrand.owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: { message: 'Target brand not owned by you', code: 'FORBIDDEN' } });
    }

    // Source recipe (with ingredients)
    const source = await Recipe.findByPk(sourceRecipeId, {
      include: [{ model: RecipeIngredient, as: 'recipeIngredients' }]
    });
    if (!source || source.brand_id !== sourceBrandId) {
      return res.status(404).json({ success: false, error: { message: 'Source recipe not found', code: 'NOT_FOUND' } });
    }

    const newCode = await generateRecipeCode(Recipe, 'brand', targetBrandId);

    const copy = await Recipe.create({
      owner_type: 'brand',
      brand_id: targetBrandId,
      restaurant_id: null,
      code: newCode,
      name: req.body.name || `${source.name} (Copy)`,
      description: source.description,
      category: null,                // brand-scoped — drop
      recipe_category_id: null,      // brand-scoped — drop
      emoji: source.emoji,
      image: source.image,           // image URL is reusable
      option_groups: source.option_groups,
      yield_amount: source.yield_amount,
      yield_unit: source.yield_unit,
      prep_time: source.prep_time,
      cook_time: source.cook_time,
      instructions: source.instructions,
      instructions_summary: source.instructions_summary,
      instructions_detail: source.instructions_detail,
      suggested_price: source.suggested_price,
      total_ingredient_cost: source.total_ingredient_cost,
      is_active: source.is_active
    });

    // Copy ingredients — 줄 원가는 **서버가 다시 계산한다**(2026-09-10 Fable 판정).
    //   저장돼 있던 `ri.cost` 를 그대로 복사하면, 원본에 0 이 박혀 있을 때 사본에도 0 이 번진다.
    //   화면은 이미 재계산해서 보여주지만(v3.87) 복사 경로만 옛 값을 그대로 옮기고 있었다 —
    //   저장 경로 3개(브랜드 POST·PUT, 매장 POST)에 이어 **네 번째 경로**다.
    //   대상은 브랜드 레시피라 매장 오버라이드는 해당 없음. 계산 불가 줄만 저장돼 있던 값으로 폴백한다.
    const srcItems = source.recipeIngredients || [];
    const copyIngMap = await loadIngredientMap(srcItems.map(ri => ({ ingredient_id: ri.ingredient_id })));
    let totalCost = 0;
    for (const ri of srcItems) {
      const cost = resolveLineCost(
        copyIngMap.get(parseInt(ri.ingredient_id, 10)),
        { quantity: ri.quantity, unit: ri.unit, cost: ri.cost },
        ri.cost
      );
      await RecipeIngredient.create({
        recipe_id: copy.id,
        ingredient_id: ri.ingredient_id,
        quantity: ri.quantity,
        unit: ri.unit,
        cost,
        notes: ri.notes
      });
      totalCost += Number(cost || 0);
    }
    if (totalCost !== Number(source.total_ingredient_cost)) {
      await copy.update({ total_ingredient_cost: totalCost });
    }

    const result = await Recipe.findByPk(copy.id, {
      include: [
        { model: RecipeIngredient, as: 'recipeIngredients', include: [{ model: Ingredient, as: 'ingredient' }] }
      ]
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error('Copy brand recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to copy recipe', code: 'INTERNAL_ERROR' } });
  }
});

module.exports = router;
