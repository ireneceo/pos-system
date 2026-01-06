/**
 * Code Generator Utility
 * Generates unique codes for various entities (recipes, ingredients, suppliers, etc.)
 */

/**
 * Generate a unique code for an entity
 * @param {Object} Model - Sequelize model to count existing entities
 * @param {string} prefix - Code prefix (e.g., 'RCP', 'ING', 'SUP')
 * @param {Object} options - Optional parameters
 * @param {string} options.ownerType - 'brand' or 'restaurant'
 * @param {number} options.ownerId - Owner ID (brand_id or restaurant_id)
 * @param {Object} options.whereClause - Custom where clause for counting
 * @param {number} options.padLength - Number of digits to pad (default: 3)
 * @returns {Promise<string>} Generated code
 */
async function generateCode(Model, prefix, options = {}) {
  const { ownerType, ownerId, whereClause, padLength = 3 } = options;

  let countWhere = whereClause || {};

  // Build where clause based on owner type if provided
  if (ownerType && ownerId) {
    if (ownerType === 'brand') {
      countWhere = { brand_id: ownerId, owner_type: 'brand' };
    } else if (ownerType === 'restaurant') {
      countWhere = { restaurant_id: ownerId, owner_type: 'restaurant' };
    }
  }

  const count = await Model.count({ where: countWhere });
  const nextNum = count + 1;

  return `${prefix}-${String(nextNum).padStart(padLength, '0')}`;
}

/**
 * Generate recipe code
 */
async function generateRecipeCode(Recipe, ownerType, ownerId) {
  return generateCode(Recipe, 'RCP', { ownerType, ownerId });
}

/**
 * Generate ingredient code
 */
async function generateIngredientCode(Ingredient, ownerType, ownerId) {
  return generateCode(Ingredient, 'ING', { ownerType, ownerId });
}

/**
 * Generate supplier code
 */
async function generateSupplierCode(Supplier) {
  return generateCode(Supplier, 'SUP');
}

/**
 * Generate general stock code
 */
async function generateGeneralStockCode(GeneralStock, restaurantId) {
  return generateCode(GeneralStock, 'GS', {
    whereClause: { restaurant_id: restaurantId }
  });
}

/**
 * Generate category code
 * @param {Object} CategoryModel - Category model
 * @param {string} prefix - Prefix (e.g., 'IC' for ingredient category)
 * @param {Object} options - Options with brand_id or restaurant_id
 */
async function generateCategoryCode(CategoryModel, prefix, options = {}) {
  const { brandId, restaurantId } = options;
  const whereClause = {};

  if (brandId) {
    whereClause.brand_id = brandId;
  }
  if (restaurantId) {
    whereClause.restaurant_id = restaurantId;
  }

  return generateCode(CategoryModel, prefix, { whereClause });
}

module.exports = {
  generateCode,
  generateRecipeCode,
  generateIngredientCode,
  generateSupplierCode,
  generateGeneralStockCode,
  generateCategoryCode
};
