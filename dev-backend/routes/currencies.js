const express = require('express');
const router = express.Router();
const { SystemSettings, PlanTemplate, PlanPrice, Brand, Ingredient, IngredientCost, Recipe, RecipeCost, RecipeIngredient } = require('../models');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');

// ============================================
// Currency Configuration Data
// ============================================
const CURRENCY_CONFIG = {
  USD: { symbol: '$', name: 'US Dollar', decimals: 2 },
  MYR: { symbol: 'RM', name: 'Malaysian Ringgit', decimals: 2 },
  KRW: { symbol: '₩', name: 'Korean Won', decimals: 0 },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', decimals: 2 },
  THB: { symbol: '฿', name: 'Thai Baht', decimals: 2 },
  JPY: { symbol: '¥', name: 'Japanese Yen', decimals: 0 },
  EUR: { symbol: '€', name: 'Euro', decimals: 2 },
  GBP: { symbol: '£', name: 'British Pound', decimals: 2 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', decimals: 2 },
  CNY: { symbol: '¥', name: 'Chinese Yuan', decimals: 2 },
  INR: { symbol: '₹', name: 'Indian Rupee', decimals: 2 },
  PHP: { symbol: '₱', name: 'Philippine Peso', decimals: 2 },
  VND: { symbol: '₫', name: 'Vietnamese Dong', decimals: 0 },
  IDR: { symbol: 'Rp', name: 'Indonesian Rupiah', decimals: 0 },
  TWD: { symbol: 'NT$', name: 'Taiwan Dollar', decimals: 0 },
  HKD: { symbol: 'HK$', name: 'Hong Kong Dollar', decimals: 2 }
};

// ============================================
// System Admin - Currency Management
// ============================================

/**
 * GET /api/currencies/config
 * Get all available currency configurations and default currency
 */
router.get('/config', async (req, res) => {
  try {
    // Get default currency from system settings
    const defaultSetting = await SystemSettings.findOne({
      where: { setting_key: 'default_currency' }
    });
    const defaultCurrency = defaultSetting?.setting_value || 'MYR';

    res.json({
      success: true,
      currencies: CURRENCY_CONFIG,
      defaultCurrency: defaultCurrency
    });
  } catch (error) {
    console.error('Get currency config error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to get currency config', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * GET /api/currencies/default
 * Get default currency
 */
router.get('/default', async (req, res) => {
  try {
    const setting = await SystemSettings.findOne({
      where: { setting_key: 'default_currency' }
    });
    const defaultCurrency = setting?.setting_value || 'MYR';

    res.json({ success: true, defaultCurrency });
  } catch (error) {
    console.error('Get default currency error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to get default currency', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/currencies/default
 * Update default currency (System Admin only)
 */
router.put('/default', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, error: { message: 'System Admin only', code: 'FORBIDDEN' } });
    }

    const { defaultCurrency } = req.body;

    if (!defaultCurrency || !CURRENCY_CONFIG[defaultCurrency]) {
      return res.status(400).json({ success: false, error: { message: 'Invalid currency code', code: 'VALIDATION_ERROR' } });
    }

    await SystemSettings.upsert({
      setting_key: 'default_currency',
      setting_value: defaultCurrency,
      description: 'Default currency for new subscriptions and invoices'
    });

    // Sync currency to all restaurants and subscription users
    const Restaurant = require('../models/Restaurant');
    const User = require('../models/User');
    await Restaurant.update({ currency: defaultCurrency }, { where: {} });
    await User.update({ currency: defaultCurrency }, {
      where: { role: { [Op.in]: ['Brand General', 'Foodcourt General', 'Restaurant Owner'] } }
    });

    res.json({ success: true, defaultCurrency });
  } catch (error) {
    console.error('Update default currency error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update default currency', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * GET /api/currencies/supported
 * Get system supported currencies
 */
router.get('/supported', async (req, res) => {
  try {
    const setting = await SystemSettings.findOne({
      where: { setting_key: 'supported_currencies' }
    });

    const currencies = setting ? setting.setting_value : ['USD', 'MYR', 'KRW'];
    const result = currencies.map(code => ({
      code,
      ...CURRENCY_CONFIG[code]
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Get supported currencies error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to get supported currencies', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/currencies/supported
 * Update system supported currencies (System Admin only)
 */
router.put('/supported', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, error: { message: 'System Admin only', code: 'FORBIDDEN' } });
    }

    const { currencies } = req.body;

    if (!Array.isArray(currencies) || currencies.length === 0) {
      return res.status(400).json({ success: false, error: { message: 'currencies must be a non-empty array', code: 'VALIDATION_ERROR' } });
    }

    // Validate all currencies exist in config
    const invalid = currencies.filter(c => !CURRENCY_CONFIG[c]);
    if (invalid.length > 0) {
      return res.status(400).json({ error: `Invalid currencies: ${invalid.join(', ')}` });
    }

    await SystemSettings.upsert({
      setting_key: 'supported_currencies',
      setting_value: currencies,
      description: 'List of supported currencies'
    });

    res.json({ success: true, data: currencies });
  } catch (error) {
    console.error('Update supported currencies error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update supported currencies', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Plan Prices Management
// ============================================

/**
 * GET /api/currencies/plans/:planId/prices
 * Get all currency prices for a plan
 */
router.get('/plans/:planId/prices', authenticateToken, async (req, res) => {
  try {
    const { planId } = req.params;

    const prices = await PlanPrice.findAll({
      where: { plan_id: planId },
      order: [['currency', 'ASC']]
    });

    res.json({ success: true, data: prices });
  } catch (error) {
    console.error('Get plan prices error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to get plan prices', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/currencies/plans/:planId/prices
 * Update all currency prices for a plan (System Admin only)
 */
router.put('/plans/:planId/prices', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, error: { message: 'System Admin only', code: 'FORBIDDEN' } });
    }

    const { planId } = req.params;
    const { prices } = req.body; // [{ currency, monthly_price, annual_price }]

    if (!Array.isArray(prices)) {
      return res.status(400).json({ success: false, error: { message: 'prices must be an array', code: 'VALIDATION_ERROR' } });
    }

    // Upsert each price
    for (const price of prices) {
      await PlanPrice.upsert({
        plan_id: planId,
        currency: price.currency,
        monthly_price: price.monthly_price,
        annual_price: price.annual_price,
        is_active: price.is_active !== false
      });
    }

    const updatedPrices = await PlanPrice.findAll({
      where: { plan_id: planId },
      order: [['currency', 'ASC']]
    });

    res.json({ success: true, data: updatedPrices });
  } catch (error) {
    console.error('Update plan prices error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update plan prices', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * DELETE /api/currencies/plans/:planId/prices/:currency
 * Delete a specific currency price for a plan
 */
router.delete('/plans/:planId/prices/:currency', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, error: { message: 'System Admin only', code: 'FORBIDDEN' } });
    }

    const { planId, currency } = req.params;

    await PlanPrice.destroy({
      where: { plan_id: planId, currency }
    });

    res.json({ success: true, message: 'Price deleted' });
  } catch (error) {
    console.error('Delete plan price error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete plan price', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Brand Currency Management
// ============================================

/**
 * GET /api/currencies/brands/:brandId
 * Get brand currency settings
 */
router.get('/brands/:brandId', authenticateToken, async (req, res) => {
  try {
    const { brandId } = req.params;

    const brand = await Brand.findByPk(brandId, {
      attributes: ['id', 'name', 'currency', 'supported_currencies']
    });

    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    res.json({ success: true, data: brand });
  } catch (error) {
    console.error('Get brand currencies error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to get brand currencies', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/currencies/brands/:brandId
 * Update brand currency settings
 */
router.put('/brands/:brandId', authenticateToken, async (req, res) => {
  try {
    const { brandId } = req.params;
    const { default_currency, supported_currencies } = req.body;

    const brand = await Brand.findByPk(brandId);
    if (!brand) {
      return res.status(404).json({ success: false, error: { message: 'Brand not found', code: 'NOT_FOUND' } });
    }

    // Check permission
    if (req.user.role !== 'System Admin' && req.user.role !== 'Brand General') {
      return res.status(403).json({ success: false, error: { message: 'Permission denied', code: 'FORBIDDEN' } });
    }

    await brand.update({
      currency: default_currency,
      supported_currencies
    });

    res.json({ success: true, data: brand });
  } catch (error) {
    console.error('Update brand currencies error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update brand currencies', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Ingredient Cost Management (Multi-currency)
// ============================================

/**
 * GET /api/currencies/ingredients/:ingredientId/costs
 * Get all currency costs for an ingredient
 */
router.get('/ingredients/:ingredientId/costs', authenticateToken, async (req, res) => {
  try {
    const { ingredientId } = req.params;

    const costs = await IngredientCost.findAll({
      where: { ingredient_id: ingredientId },
      order: [['currency', 'ASC']]
    });

    res.json({ success: true, data: costs });
  } catch (error) {
    console.error('Get ingredient costs error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to get ingredient costs', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/currencies/ingredients/:ingredientId/costs
 * Update all currency costs for an ingredient
 */
router.put('/ingredients/:ingredientId/costs', authenticateToken, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const { costs } = req.body; // [{ currency, unit_cost }]

    if (!Array.isArray(costs)) {
      return res.status(400).json({ success: false, error: { message: 'costs must be an array', code: 'VALIDATION_ERROR' } });
    }

    // Upsert each cost
    for (const cost of costs) {
      await IngredientCost.upsert({
        ingredient_id: ingredientId,
        currency: cost.currency,
        unit_cost: cost.unit_cost
      });
    }

    // Also update the default unit_cost in ingredients table with first currency
    if (costs.length > 0) {
      await Ingredient.update(
        { unit_cost: costs[0].unit_cost },
        { where: { id: ingredientId } }
      );
    }

    const updatedCosts = await IngredientCost.findAll({
      where: { ingredient_id: ingredientId },
      order: [['currency', 'ASC']]
    });

    res.json({ success: true, data: updatedCosts });
  } catch (error) {
    console.error('Update ingredient costs error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update ingredient costs', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Recipe Cost Management (Multi-currency)
// ============================================

/**
 * GET /api/currencies/recipes/:recipeId/costs
 * Get all currency costs for a recipe
 */
router.get('/recipes/:recipeId/costs', authenticateToken, async (req, res) => {
  try {
    const { recipeId } = req.params;

    const costs = await RecipeCost.findAll({
      where: { recipe_id: recipeId },
      order: [['currency', 'ASC']]
    });

    res.json({ success: true, data: costs });
  } catch (error) {
    console.error('Get recipe costs error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to get recipe costs', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/currencies/recipes/:recipeId/costs
 * Update recipe costs (suggested_price) - ingredient cost is auto-calculated
 */
router.put('/recipes/:recipeId/costs', authenticateToken, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { costs } = req.body; // [{ currency, suggested_price }]

    if (!Array.isArray(costs)) {
      return res.status(400).json({ success: false, error: { message: 'costs must be an array', code: 'VALIDATION_ERROR' } });
    }

    // Get recipe ingredients for cost calculation
    const recipeIngredients = await RecipeIngredient.findAll({
      where: { recipe_id: recipeId },
      include: [{
        model: Ingredient,
        as: 'ingredient',
        include: [{ model: IngredientCost, as: 'costs' }]
      }]
    });

    // Calculate and upsert each cost
    for (const cost of costs) {
      // Calculate total ingredient cost for this currency
      let totalIngredientCost = 0;

      for (const ri of recipeIngredients) {
        const ingredientCost = ri.ingredient.costs?.find(c => c.currency === cost.currency);
        if (ingredientCost) {
          totalIngredientCost += parseFloat(ri.quantity) * parseFloat(ingredientCost.unit_cost);
        }
      }

      await RecipeCost.upsert({
        recipe_id: recipeId,
        currency: cost.currency,
        total_ingredient_cost: totalIngredientCost,
        suggested_price: cost.suggested_price
      });
    }

    const updatedCosts = await RecipeCost.findAll({
      where: { recipe_id: recipeId },
      order: [['currency', 'ASC']]
    });

    res.json({ success: true, data: updatedCosts });
  } catch (error) {
    console.error('Update recipe costs error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update recipe costs', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/currencies/recipes/:recipeId/calculate
 * Recalculate recipe ingredient costs for all currencies
 */
router.post('/recipes/:recipeId/calculate', authenticateToken, async (req, res) => {
  try {
    const { recipeId } = req.params;

    // Get recipe ingredients
    const recipeIngredients = await RecipeIngredient.findAll({
      where: { recipe_id: recipeId },
      include: [{
        model: Ingredient,
        as: 'ingredient',
        include: [{ model: IngredientCost, as: 'costs' }]
      }]
    });

    // Get all existing recipe costs
    const existingCosts = await RecipeCost.findAll({
      where: { recipe_id: recipeId }
    });

    // Calculate for each currency
    const currencyTotals = {};

    for (const ri of recipeIngredients) {
      if (ri.ingredient.costs) {
        for (const ic of ri.ingredient.costs) {
          if (!currencyTotals[ic.currency]) {
            currencyTotals[ic.currency] = 0;
          }
          currencyTotals[ic.currency] += parseFloat(ri.quantity) * parseFloat(ic.unit_cost);
        }
      }
    }

    // Update recipe costs
    for (const [currency, total] of Object.entries(currencyTotals)) {
      const existing = existingCosts.find(c => c.currency === currency);
      await RecipeCost.upsert({
        recipe_id: recipeId,
        currency,
        total_ingredient_cost: total,
        suggested_price: existing ? existing.suggested_price : 0
      });
    }

    const updatedCosts = await RecipeCost.findAll({
      where: { recipe_id: recipeId },
      order: [['currency', 'ASC']]
    });

    res.json({ success: true, data: updatedCosts });
  } catch (error) {
    console.error('Calculate recipe costs error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to calculate recipe costs', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Country Configuration (same pattern as currencies)
// ============================================

const COUNTRY_CONFIG = {
  MY: { name: 'Malaysia', currency: 'MYR', flag: '🇲🇾' },
  SG: { name: 'Singapore', currency: 'SGD', flag: '🇸🇬' },
  KR: { name: 'South Korea', currency: 'KRW', flag: '🇰🇷' },
  JP: { name: 'Japan', currency: 'JPY', flag: '🇯🇵' },
  TH: { name: 'Thailand', currency: 'THB', flag: '🇹🇭' },
  VN: { name: 'Vietnam', currency: 'VND', flag: '🇻🇳' },
  PH: { name: 'Philippines', currency: 'PHP', flag: '🇵🇭' },
  ID: { name: 'Indonesia', currency: 'IDR', flag: '🇮🇩' },
  IN: { name: 'India', currency: 'INR', flag: '🇮🇳' },
  CN: { name: 'China', currency: 'CNY', flag: '🇨🇳' },
  TW: { name: 'Taiwan', currency: 'TWD', flag: '🇹🇼' },
  HK: { name: 'Hong Kong', currency: 'HKD', flag: '🇭🇰' },
  US: { name: 'United States', currency: 'USD', flag: '🇺🇸' },
  GB: { name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  AU: { name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
  DE: { name: 'Germany', currency: 'EUR', flag: '🇩🇪' },
  FR: { name: 'France', currency: 'EUR', flag: '🇫🇷' },
  CA: { name: 'Canada', currency: 'CAD', flag: '🇨🇦' }
};

/**
 * GET /api/currencies/countries/config
 * Get all available country configurations
 */
router.get('/countries/config', async (req, res) => {
  try {
    const countries = Object.entries(COUNTRY_CONFIG).map(([code, config]) => ({
      code,
      ...config
    }));
    res.json({ success: true, data: countries });
  } catch (error) {
    console.error('Get country config error:', error);
    res.status(500).json({ success: false, message: 'Failed to get country config' });
  }
});

/**
 * GET /api/currencies/countries/supported
 * Get system supported countries
 */
router.get('/countries/supported', async (req, res) => {
  try {
    const setting = await SystemSettings.findOne({
      where: { setting_key: 'supported_countries' }
    });

    const countries = setting ? setting.setting_value : ['MY'];
    const result = countries
      .filter(code => COUNTRY_CONFIG[code])
      .map(code => ({
        code,
        ...COUNTRY_CONFIG[code]
      }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Get supported countries error:', error);
    res.status(500).json({ success: false, message: 'Failed to get supported countries' });
  }
});

/**
 * PUT /api/currencies/countries/supported
 * Update system supported countries (System Admin only)
 */
router.put('/countries/supported', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'System Admin only' });
    }

    const { countries } = req.body;

    if (!Array.isArray(countries) || countries.length === 0) {
      return res.status(400).json({ success: false, message: 'countries must be a non-empty array' });
    }

    const invalid = countries.filter(c => !COUNTRY_CONFIG[c]);
    if (invalid.length > 0) {
      return res.status(400).json({ success: false, message: `Invalid countries: ${invalid.join(', ')}` });
    }

    await SystemSettings.upsert({
      setting_key: 'supported_countries',
      setting_value: countries,
      description: 'List of supported countries for product sales'
    });

    res.json({ success: true, data: countries });
  } catch (error) {
    console.error('Update supported countries error:', error);
    res.status(500).json({ success: false, message: 'Failed to update supported countries' });
  }
});

module.exports = router;
