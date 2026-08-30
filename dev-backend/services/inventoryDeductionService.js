/**
 * Inventory Deduction Service
 * Handles automatic inventory deduction when orders are completed
 */

const { Op } = require('sequelize');
const database = require('../config/database');
// 브랜드 공유 재료의 재고는 매장별 오버레이가 단일 소스 (docs/BRAND_STOCK_SHARING_DESIGN.md)
const { stockFor, applyStock, effectiveMinStock } = require('../utils/brandStockAccess');
const {
  Product,
  Recipe,
  RecipeIngredient,
  Ingredient,
  InventoryBatch,
  InventoryTransaction,
  StockAlert,
  Option,
  OptionIngredient
} = require('../models');

/**
 * FIFO deduction from inventory batches
 */
async function deductStockFIFO(ingredientId, quantityToDeduct, transaction, restaurantId = null) {
  let remainingToDeduct = parseFloat(quantityToDeduct);
  const deductedBatches = [];

  const batches = await InventoryBatch.findAll({
    where: {
      ingredient_id: ingredientId,
      // 브랜드 공유 재료는 형제 매장이 같은 ingredient_id 로 배치를 만든다 → 매장 스코프 필수
      // (안 걸면 남의 매장 배치를 소진한다)
      ...(restaurantId ? { restaurant_id: restaurantId } : {}),
      status: 'active',
      remaining_quantity: { [Op.gt]: 0 }
    },
    order: [
      ['expiry_date', 'ASC'],
      ['received_date', 'ASC']
    ],
    transaction
  });

  for (const batch of batches) {
    if (remainingToDeduct <= 0) break;

    const batchRemaining = parseFloat(batch.remaining_quantity);
    const deductFromBatch = Math.min(batchRemaining, remainingToDeduct);

    const newRemaining = batchRemaining - deductFromBatch;
    const newStatus = newRemaining <= 0 ? 'depleted' : 'active';

    await InventoryBatch.update({
      remaining_quantity: newRemaining,
      status: newStatus
    }, {
      where: { id: batch.id },
      transaction
    });

    deductedBatches.push({
      batch_id: batch.id,
      batch_number: batch.batch_number,
      quantity_deducted: deductFromBatch,
      expiry_date: batch.expiry_date
    });

    remainingToDeduct -= deductFromBatch;
  }

  return {
    success: remainingToDeduct <= 0,
    deducted_quantity: parseFloat(quantityToDeduct) - remainingToDeduct,
    remaining_to_deduct: remainingToDeduct,
    batches: deductedBatches
  };
}

/**
 * Check and create stock alerts
 */
async function checkAndCreateAlert(restaurantId, ingredientId, currentStock, minStock, transaction) {
  const existingAlert = await StockAlert.findOne({
    where: {
      restaurant_id: restaurantId,
      ingredient_id: ingredientId,
      is_resolved: false   // 모델 필드명은 is_resolved (resolved 는 존재하지 않는 컬럼 → 차감 전체 실패하던 버그)
    },
    transaction
  });

  let alertType = null;
  if (currentStock <= 0) {
    alertType = 'out_of_stock';
  } else if (currentStock <= minStock) {
    alertType = 'low_stock';
  }

  if (alertType) {
    if (existingAlert) {
      await existingAlert.update({
        alert_type: alertType,
        current_stock: currentStock,
        min_stock: minStock
      }, { transaction });
    } else {
      await StockAlert.create({
        restaurant_id: restaurantId,
        ingredient_id: ingredientId,
        alert_type: alertType,
        current_stock: currentStock,
        min_stock: minStock
      }, { transaction });
    }
  } else if (existingAlert) {
    await existingAlert.update({ is_resolved: true, resolved_at: new Date() }, { transaction });
  }
}

/**
 * Get recipe ingredients for a product
 */
async function getProductRecipeIngredients(productId) {
  const product = await Product.findByPk(productId, {
    include: [{
      model: Recipe,
      as: 'recipe',
      include: [{
        model: RecipeIngredient,
        as: 'recipeIngredients',
        include: [{
          model: Ingredient,
          as: 'ingredient'
        }]
      }]
    }]
  });

  if (!product || !product.recipe || !product.recipe.recipeIngredients) {
    return [];
  }

  return product.recipe.recipeIngredients.map(ri => ({
    ingredient_id: ri.ingredient_id,
    ingredient: ri.ingredient,
    quantity: parseFloat(ri.quantity),
    unit: ri.unit
  }));
}

/**
 * Deduct inventory for a completed order
 * @param {number} restaurantId - Restaurant ID
 * @param {Array} orderItems - Array of order items with product_id and quantity
 * @param {string} orderId - Order ID for reference
 * @returns {Object} Result of deduction
 */
async function deductInventoryForOrder(restaurantId, orderItems, orderId) {
  const transaction = await database.sequelize.transaction();

  try {
    const results = {
      success: true,
      deductions: [],
      warnings: [],
      errors: [],
      // "레시피가 없어서 아무것도 안 뺐다"는 경고 더미에 묻혀 보이지 않았다.
      // 운영 실측(2026-08-20): 상품 754개 중 레시피가 걸린 것은 1개뿐이라
      // 판매로 인한 차감이 전 기간 0건이었는데도 아무도 몰랐다. 세어서 드러낸다.
      skipped_no_recipe: 0
    };

    // Process each order item
    for (const item of orderItems) {
      const orderQty = item.quantity || 1;

      // 세트면 구성품별 레시피 차감(SET_MENU_REDESIGN §3 — 세트=단일차감 → 구성품 차감).
      // 아니면 상품 자체. 구성품 수량 = 구성품 qty × 주문 수량.
      const targets = (Array.isArray(item.set_components) && item.set_components.length > 0)
        ? item.set_components.map(c => ({ pid: c.product_id || c.id, qty: (parseInt(c.qty) || 1) * orderQty, name: c.name || item.name }))
        : [{ pid: item.product_id || item.id, qty: orderQty, name: item.name }];

      for (const tgt of targets) {
        const productId = tgt.pid;
        const tgtQty = tgt.qty;

        // Get recipe ingredients for this product (component or standalone)
        const recipeIngredients = await getProductRecipeIngredients(productId);

        if (recipeIngredients.length === 0) {
          // ── 레시피가 없는 상품은 **그 상품 자체가 재고 단위**다 ─────────────
          // 캔음료·병맥주·완제품처럼 그대로 파는 물건. `track_stock` 켠 상품만 깎는다.
          // ⛔ **확장 금지(레거시).** `products.current_stock` 는 재고아이템과 별도 저장소라
          //    이원화된다. 재료를 쓰는 메뉴는 레시피(또는 메뉴 폼의 직접 재료 입력)를 쓴다.
          // 캔음료·병맥주·완제품처럼 그대로 파는 물건은 레시피가 있을 수 없다.
          // 예전에는 여기서 그냥 건너뛰어, 팔려도 재고가 전혀 안 줄었다.
          // `track_stock` 을 켠 상품만 깎는다(안 켠 상품은 재고를 안 세기로 한 것).
          const prod = await Product.findByPk(productId, { transaction });
          if (prod && prod.track_stock) {
            const cur = parseFloat(prod.current_stock) || 0;
            const take = Math.min(tgtQty, cur);        // 음수 재고 금지(재료 차감과 같은 규칙)
            const short = Math.round((tgtQty - take) * 10000) / 10000;
            const next = Math.round((cur - take) * 10000) / 10000;
            await prod.update({ current_stock: next }, { transaction });
            await InventoryTransaction.create({
              restaurant_id: restaurantId,
              product_id: prod.id,
              transaction_type: 'order_deduct',
              quantity_change: -take,
              unit: prod.stock_unit || 'ea',
              stock_after: next,
              notes: `Order #${orderId} - ${tgt.name} x${tgtQty}`
                + (short > 0 ? ` [stock_shortfall ${short}]` : ''),
              created_by: null
            }, { transaction });
            results.deductions.push({
              product_id: prod.id,
              ingredient_name: prod.name,
              quantity_deducted: take,
              unit: prod.stock_unit || 'ea',
              new_stock: next,
              source: 'product_stock'
            });
            continue;
          }

          // 재고를 안 세기로 한 상품 — 건너뛰되 **몇 건인지 센다**(조용한 0 차감 방지)
          results.skipped_no_recipe += 1;
          results.warnings.push({
            product_id: productId,
            product_name: tgt.name,
            message: 'No recipe or stock link - inventory not deducted'
          });
          continue;
        }

        // Deduct each ingredient
        for (const ri of recipeIngredients) {
          const deductQty = ri.quantity * tgtQty;
          const ingredient = ri.ingredient;

          if (!ingredient) {
            results.errors.push({
              ingredient_id: ri.ingredient_id,
              message: 'Ingredient not found'
            });
            continue;
          }

          // 브랜드 공유 재료면 이 매장의 오버레이 재고가 기준
          const currentStock = await stockFor(ingredient, restaurantId, transaction);

          // Check if we have enough stock
          if (deductQty > currentStock) {
            results.warnings.push({
              ingredient_id: ingredient.id,
              ingredient_name: ingredient.name,
              required: deductQty,
              available: currentStock,
              message: 'Insufficient stock - partial deduction'
            });
          }

          // Deduct what we can (even if partial)
          const actualDeductQty = Math.min(deductQty, currentStock);

          if (actualDeductQty > 0) {
            // FIFO deduction from batches (매장 스코프)
            const fifoResult = await deductStockFIFO(ingredient.id, actualDeductQty, transaction, restaurantId);

            // ── 배치가 모자라도 재고는 실제 소비량만큼 줄인다 ──────────────────
            // 예전에는 `newStock = currentStock - fifoResult.deducted_quantity` 였다.
            // FIFO 는 **배치(입고 로트)** 에서만 빼는데, 배치가 없거나 부족한 매장에서는
            // deducted_quantity 가 0 이 되고, 그러면 팔았는데도 재고가 그대로 남았다.
            // 음식은 나갔다 — 장부만 안 줄어든 것이다. 실제 소비량(actualDeductQty)으로
            // 줄이고, 배치로 못 덮은 몫은 `batch_shortfall` 로 남겨 추적 가능하게 한다.
            const batchCovered = fifoResult.deducted_quantity || 0;
            const shortfall = Math.round((actualDeductQty - batchCovered) * 10000) / 10000;
            const newStock = Math.round((currentStock - actualDeductQty) * 10000) / 10000;

            // 브랜드 공유 재료 → 매장 오버레이 / 매장 재료 → 재료 행
            await applyStock(ingredient, restaurantId, newStock, transaction);

            // Create transaction record
            await InventoryTransaction.create({
              restaurant_id: restaurantId,
              ingredient_id: ingredient.id,
              transaction_type: 'order_deduct',
              quantity_change: -actualDeductQty,
              unit: ingredient.unit,
              stock_after: newStock,
              notes: `Order #${orderId} - ${tgt.name} x${tgtQty}`
                + (shortfall > 0 ? ` [batch_shortfall ${shortfall}]` : ''),
              created_by: null // System action
            }, { transaction });

            // Check and create alerts
            await checkAndCreateAlert(
              restaurantId,
              ingredient.id,
              newStock,
              // 임계치는 매장별 — 브랜드 재료면 이 매장의 오버라이드가 우선
              await effectiveMinStock(ingredient, restaurantId, transaction),
              transaction
            );

            results.deductions.push({
              ingredient_id: ingredient.id,
              ingredient_name: ingredient.name,
              quantity_deducted: actualDeductQty,
              batch_covered: batchCovered,
              batch_shortfall: shortfall > 0 ? shortfall : 0,
              unit: ingredient.unit,
              new_stock: newStock,
              batches_affected: fifoResult.batches.length,
              // 어느 분기가 발화했는지 로그에 남긴다 — 서열 검증의 단일 증거
              source: ri.__source || 'recipe'
            });
          }
        }
      }
      // Deduct option ingredients (if selectedOptions with option_id exist)
      const selectedOptions = item.selectedOptions || [];
      for (const selOpt of selectedOptions) {
        if (!selOpt.id) continue;
        const optionId = parseInt(selOpt.id);
        if (isNaN(optionId)) continue;

        const optIngredients = await OptionIngredient.findAll({
          where: { option_id: optionId },
          include: [{ model: Ingredient, as: 'ingredient' }]
        });

        for (const oi of optIngredients) {
          if (!oi.ingredient) continue;
          const oiDeductQty = parseFloat(oi.quantity) * orderQty;
          const oiCurrentStock = await stockFor(oi.ingredient, restaurantId, transaction);
          const oiActualDeduct = Math.min(oiDeductQty, oiCurrentStock);

          if (oiActualDeduct > 0) {
            const oiFifo = await deductStockFIFO(oi.ingredient.id, oiActualDeduct, transaction, restaurantId);
            // 레시피 재료와 동일 규칙 — 배치가 모자라도 실제 소비량만큼 줄인다(위 주석 참조).
            const oiCovered = oiFifo.deducted_quantity || 0;
            const oiShortfall = Math.round((oiActualDeduct - oiCovered) * 10000) / 10000;
            const oiNewStock = Math.round((oiCurrentStock - oiActualDeduct) * 10000) / 10000;

            await applyStock(oi.ingredient, restaurantId, oiNewStock, transaction);

            await InventoryTransaction.create({
              restaurant_id: restaurantId,
              ingredient_id: oi.ingredient.id,
              transaction_type: 'order_deduct',
              quantity_change: -oiActualDeduct,
              unit: oi.ingredient.unit,
              stock_after: oiNewStock,
              notes: `Order #${orderId} - Option "${selOpt.name}" x${orderQty}`
                + (oiShortfall > 0 ? ` [batch_shortfall ${oiShortfall}]` : ''),
              created_by: null
            }, { transaction });

            await checkAndCreateAlert(restaurantId, oi.ingredient.id, oiNewStock, await effectiveMinStock(oi.ingredient, restaurantId, transaction), transaction);

            results.deductions.push({
              ingredient_id: oi.ingredient.id,
              ingredient_name: oi.ingredient.name,
              quantity_deducted: oiActualDeduct,
              batch_covered: oiCovered,
              batch_shortfall: oiShortfall > 0 ? oiShortfall : 0,
              unit: oi.ingredient.unit,
              new_stock: oiNewStock,
              source: `option: ${selOpt.name}`
            });
          }
        }
      }
    }

    await transaction.commit();
    return results;

  } catch (error) {
    await transaction.rollback();
    console.error('Inventory deduction error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Calculate required ingredients for an order (preview without deducting)
 */
async function calculateRequiredIngredients(orderItems, restaurantId = null) {
  // restaurantId 를 주면 브랜드 공유 재료의 가용재고를 그 매장 오버레이로 본다.
  // (안 주면 재료 행 값 — 매장 소유 재료만 다루던 옛 호출 호환)
  const ingredientMap = new Map();

  for (const item of orderItems) {
    const orderQty = item.quantity || 1;
    // 세트면 구성품별, 아니면 상품 자체
    const targets = (Array.isArray(item.set_components) && item.set_components.length > 0)
      ? item.set_components.map(c => ({ pid: c.product_id || c.id, qty: (parseInt(c.qty) || 1) * orderQty }))
      : [{ pid: item.product_id || item.id, qty: orderQty }];

    for (const tgt of targets) {
      const recipeIngredients = await getProductRecipeIngredients(tgt.pid);

      for (const ri of recipeIngredients) {
        const key = ri.ingredient_id;
        const requiredQty = ri.quantity * tgt.qty;

        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key);
          existing.required_quantity += requiredQty;
        } else {
          ingredientMap.set(key, {
            ingredient_id: ri.ingredient_id,
            ingredient_name: ri.ingredient?.name,
            unit: ri.unit,
            required_quantity: requiredQty,
            current_stock: (restaurantId && ri.ingredient)
              ? await stockFor(ri.ingredient, restaurantId)
              : parseFloat(ri.ingredient?.current_stock) || 0
          });
        }
      }
    }
  }

  const ingredients = Array.from(ingredientMap.values());

  // Check availability
  ingredients.forEach(ing => {
    ing.available = ing.current_stock >= ing.required_quantity;
    ing.shortage = ing.available ? 0 : ing.required_quantity - ing.current_stock;
  });

  return ingredients;
}

module.exports = {
  deductInventoryForOrder,
  calculateRequiredIngredients,
  deductStockFIFO,
  checkAndCreateAlert
};
