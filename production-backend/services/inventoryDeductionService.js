/**
 * Inventory Deduction Service
 * Handles automatic inventory deduction when orders are completed
 */

const { Op } = require('sequelize');
const database = require('../config/database');
const {
  Product,
  Recipe,
  RecipeIngredient,
  Ingredient,
  InventoryBatch,
  InventoryTransaction,
  StockAlert
} = require('../models');

/**
 * FIFO deduction from inventory batches
 */
async function deductStockFIFO(ingredientId, quantityToDeduct, transaction) {
  let remainingToDeduct = parseFloat(quantityToDeduct);
  const deductedBatches = [];

  const batches = await InventoryBatch.findAll({
    where: {
      ingredient_id: ingredientId,
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
      resolved: false
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
    await existingAlert.update({ resolved: true }, { transaction });
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
      const productId = item.product_id || item.id;
      const orderQty = item.quantity || 1;

      // Get recipe ingredients for this product
      const recipeIngredients = await getProductRecipeIngredients(productId);

      if (recipeIngredients.length === 0) {
        // No recipe linked - skip deduction
        results.warnings.push({
          product_id: productId,
          product_name: item.name,
          message: 'No recipe linked - inventory not deducted'
        });
        continue;
      }

      // Deduct each ingredient
      for (const ri of recipeIngredients) {
        const deductQty = ri.quantity * orderQty;
        const ingredient = ri.ingredient;

        if (!ingredient) {
          results.errors.push({
            ingredient_id: ri.ingredient_id,
            message: 'Ingredient not found'
          });
          continue;
        }

        const currentStock = parseFloat(ingredient.current_stock) || 0;

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
          // FIFO deduction from batches
          const fifoResult = await deductStockFIFO(ingredient.id, actualDeductQty, transaction);

          const newStock = currentStock - fifoResult.deducted_quantity;

          // Update ingredient stock
          await Ingredient.update(
            { current_stock: newStock },
            { where: { id: ingredient.id }, transaction }
          );

          // Create transaction record
          await InventoryTransaction.create({
            restaurant_id: restaurantId,
            ingredient_id: ingredient.id,
            transaction_type: 'order_deduct',
            quantity_change: -fifoResult.deducted_quantity,
            unit: ingredient.unit,
            stock_after: newStock,
            notes: `Order #${orderId} - ${item.name} x${orderQty}`,
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
async function calculateRequiredIngredients(orderItems) {
  const ingredientMap = new Map();

  for (const item of orderItems) {
    const productId = item.product_id || item.id;
    const orderQty = item.quantity || 1;

    const recipeIngredients = await getProductRecipeIngredients(productId);

    for (const ri of recipeIngredients) {
      const key = ri.ingredient_id;
      const requiredQty = ri.quantity * orderQty;

      if (ingredientMap.has(key)) {
        const existing = ingredientMap.get(key);
        existing.required_quantity += requiredQty;
      } else {
        ingredientMap.set(key, {
          ingredient_id: ri.ingredient_id,
          ingredient_name: ri.ingredient?.name,
          unit: ri.unit,
          required_quantity: requiredQty,
          current_stock: parseFloat(ri.ingredient?.current_stock) || 0
        });
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
