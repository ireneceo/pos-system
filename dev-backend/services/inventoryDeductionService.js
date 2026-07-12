/**
 * Inventory Deduction Service
 * Handles automatic inventory deduction when orders are completed
 */

const { Op } = require('sequelize');
const database = require('../config/database');
// 브랜드 공유 재료의 재고는 매장별 오버레이가 단일 소스 (docs/BRAND_STOCK_SHARING_DESIGN.md)
const { stockFor, applyStock } = require('../utils/brandStockAccess');
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
      errors: []
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
          // No recipe linked - skip deduction
          results.warnings.push({
            product_id: productId,
            product_name: tgt.name,
            message: 'No recipe linked - inventory not deducted'
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

            const newStock = currentStock - fifoResult.deducted_quantity;

            // 브랜드 공유 재료 → 매장 오버레이 / 매장 재료 → 재료 행
            await applyStock(ingredient, restaurantId, newStock, transaction);

            // Create transaction record
            await InventoryTransaction.create({
              restaurant_id: restaurantId,
              ingredient_id: ingredient.id,
              transaction_type: 'order_deduct',
              quantity_change: -fifoResult.deducted_quantity,
              unit: ingredient.unit,
              stock_after: newStock,
              notes: `Order #${orderId} - ${tgt.name} x${tgtQty}`,
              created_by: null // System action
            }, { transaction });

            // Check and create alerts
            await checkAndCreateAlert(
              restaurantId,
              ingredient.id,
              newStock,
              parseFloat(ingredient.min_stock) || 0,
              transaction
            );

            results.deductions.push({
              ingredient_id: ingredient.id,
              ingredient_name: ingredient.name,
              quantity_deducted: fifoResult.deducted_quantity,
              unit: ingredient.unit,
              new_stock: newStock,
              batches_affected: fifoResult.batches.length
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
            const oiNewStock = oiCurrentStock - oiFifo.deducted_quantity;

            await applyStock(oi.ingredient, restaurantId, oiNewStock, transaction);

            await InventoryTransaction.create({
              restaurant_id: restaurantId,
              ingredient_id: oi.ingredient.id,
              transaction_type: 'order_deduct',
              quantity_change: -oiFifo.deducted_quantity,
              unit: oi.ingredient.unit,
              stock_after: oiNewStock,
              notes: `Order #${orderId} - Option "${selOpt.name}" x${orderQty}`,
              created_by: null
            }, { transaction });

            await checkAndCreateAlert(restaurantId, oi.ingredient.id, oiNewStock, parseFloat(oi.ingredient.min_stock) || 0, transaction);

            results.deductions.push({
              ingredient_id: oi.ingredient.id,
              ingredient_name: oi.ingredient.name,
              quantity_deducted: oiFifo.deducted_quantity,
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
