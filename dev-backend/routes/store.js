const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const SystemSettings = require('../models/SystemSettings');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');
const {
  guardPrinterSettings,
  guardPaymentSettings,
  guardOperationSettings,
  guardShallowSettings,
} = require('../utils/settingsGuard');

// Get store settings
router.get('/settings', authenticateToken, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID is required', code: 'VALIDATION_ERROR' } });
    }

    // Get restaurant settings
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    // Parse settings
    let paymentSettings = {};
    let operationSettings = {};

    try {
      if (restaurant.payment_settings) {
        paymentSettings = typeof restaurant.payment_settings === 'string'
          ? JSON.parse(restaurant.payment_settings)
          : restaurant.payment_settings;
        // Normalize: sync enabled flag with availableIn for all methods
        Object.keys(paymentSettings).forEach(key => {
          if (key === '_order') return;
          const m = paymentSettings[key];
          if (m && typeof m === 'object' && 'enabled' in m && 'availableIn' in m) {
            m.enabled = Array.isArray(m.availableIn) && m.availableIn.length > 0;
          }
        });
      }
    } catch (e) {
      console.error('Error parsing payment_settings:', e);
    }

    try {
      if (restaurant.operation_settings) {
        operationSettings = typeof restaurant.operation_settings === 'string'
          ? JSON.parse(restaurant.operation_settings)
          : restaurant.operation_settings;
      }
    } catch (e) {
      console.error('Error parsing operation_settings:', e);
    }

    res.json({
      success: true,
      data: {
        id: restaurant.id,
        name: restaurant.name,
        branch_name: restaurant.branch_name || null,
        email: restaurant.email,
        phone: restaurant.phone,
        address: restaurant.address,
        address_line_2: restaurant.address_line_2,
        city: restaurant.city,
        state: restaurant.state,
        postal_code: restaurant.postal_code,
        country: restaurant.country,
        business_registration: restaurant.business_registration,
        tax_id: restaurant.tax_id,
        website: restaurant.website,
        logo_url: restaurant.logo_url,
        payment_settings: paymentSettings,
        operation_settings: operationSettings,
        currency: restaurant.currency,
        cash_rounding: restaurant.cash_rounding,
        rounding_apply_to: restaurant.rounding_apply_to,
        printer_settings: restaurant.printer_settings || null,
        mobile_settings: restaurant.mobile_settings || { show_featured: true, show_popular: true },
        table_settings: restaurant.table_settings || {},
        reservation_settings: restaurant.reservation_settings || { enabled: false },
        plan_type: restaurant.plan_type,
        status: restaurant.status
      }
    });
  } catch (error) {
    console.error('Error fetching store settings:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update store settings
router.put('/settings', authenticateToken, async (req, res) => {
  try {
    console.log('🔧 [STORE UPDATE] Starting settings update...');
    console.log('📋 Request Query:', req.query);
    console.log('👤 User Info:', { userId: req.user?.id, restaurantId: req.user?.restaurant_id });
    console.log('📦 Request Body Keys:', Object.keys(req.body));

    const restaurantId = req.query.restaurantId || req.user.restaurant_id;
    console.log('🎯 Target Restaurant ID:', restaurantId);

    if (!restaurantId) {
      console.error('✗ No restaurant ID provided');
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID is required', code: 'VALIDATION_ERROR' } });
    }

    // Access control: Only allow users to update their own restaurant
    // System Admin can update any restaurant
    if (req.user.role !== 'System Admin') {
      if (req.user.role === 'Restaurant Admin' || req.user.role === 'Staff') {
        if (parseInt(req.user.restaurant_id) !== parseInt(restaurantId)) {
          console.error('✗ Access denied: User restaurant_id does not match target');
          return res.status(403).json({ success: false, error: { message: 'Access denied to this restaurant', code: 'FORBIDDEN' } });
        }
      }
    }
    console.log('✓ Access control passed');

    // Validate currency against system-allowed currencies
    if (req.body.currency) {
      try {
        const supportedSetting = await SystemSettings.findOne({ where: { setting_key: 'supported_currencies' } });
        if (supportedSetting) {
          const raw = supportedSetting.setting_value;
          const supported = typeof raw === 'string' ? JSON.parse(raw) : raw;
          const normalizedCurrency = req.body.currency === 'RM' ? 'MYR' : req.body.currency;
          if (Array.isArray(supported) && supported.length > 0 && !supported.includes(normalizedCurrency)) {
            return res.status(400).json({
              success: false,
              error: `Currency ${req.body.currency} is not allowed. Supported currencies: ${supported.join(', ')}`
            });
          }
        }
      } catch (e) {
        console.error('Error checking supported currencies:', e);
      }
    }

    console.log('🔍 Finding restaurant with ID:', restaurantId);
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      console.error('✗ Restaurant not found:', restaurantId);
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    console.log('✓ Restaurant found:', restaurant.name);

    // Reservations is a base feature (no module gate). Toggle controls only mobile
    // customer-facing visibility; staff sidebar/management is always available.

    // Update allowed fields. address_line_2 is part of the canonical 6-field
    // address schema unified in v3.17 — Settings page now sends it via the
    // shared <AddressFields> component and we must accept it here.
    const allowedFields = [
      'name', 'email', 'phone', 'address', 'address_line_2', 'city', 'state',
      'postal_code', 'country', 'website', 'logo_url',
      'business_registration', 'tax_id',
      'payment_settings', 'operation_settings', 'table_settings', 'mobile_settings',
      'printer_settings', 'reservation_settings',
      'currency', 'cash_rounding', 'rounding_apply_to',
      'kitchen_item_merge'
    ];

    console.log('🔄 Updating fields...');
    // 2026-05-31 anti-wipe guard — see utils/settingsGuard.js. The Settings page
    // (this route's caller) was the 5/31 The Fire wipe path. Guard rejects null
    // / {} / parse-error / sparse payloads and deep-merges critical sub-objects
    // so a half-loaded client can't blank the live config.
    const SETTINGS_GUARDED = new Set([
      'printer_settings', 'payment_settings', 'operation_settings',
      'table_settings', 'mobile_settings', 'reservation_settings'
    ]);
    const guardMap = {
      printer_settings: guardPrinterSettings,
      payment_settings: guardPaymentSettings,
      operation_settings: guardOperationSettings,
      table_settings: (i, e, r) => guardShallowSettings('table_settings', i, e, r),
      mobile_settings: (i, e, r) => guardShallowSettings('mobile_settings', i, e, r),
      reservation_settings: (i, e, r) => guardShallowSettings('reservation_settings', i, e, r),
    };

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        console.log(`  ✏️  ${field}:`, field === 'payment_settings' || field === 'operation_settings'
          ? `[JSON ${typeof req.body[field]}]`
          : req.body[field]);

        if (field === 'payment_settings' || field === 'operation_settings' || field === 'table_settings' || field === 'mobile_settings' || field === 'printer_settings' || field === 'reservation_settings') {
          // 2026-05-31 anti-wipe guard FIRST — runs before any client-payload mutation
          // so that legacy migrations (e.g. auto-adding staffMeal) can't turn an
          // empty {} into a non-empty object that bypasses the empty-payload check.
          const guardFn = guardMap[field];
          const existingVal = restaurant.getDataValue(field);
          const result = guardFn(req.body[field], existingVal, restaurantId);
          if (result.action === 'reject') {
            console.warn(`  ⚠️  [anti-wipe] skipped ${field}: ${result.reason}`);
            return; // skip this field — DB value untouched
          }
          let valueToSave = result.value;
          if (result.action === 'merged') {
            console.warn(`  🛡️  [anti-wipe] merged ${field}: ${result.reason}`);
          }

          // Migrate legacy payment method keys on save (post-guard, on the
          // guard-approved value).
          if (field === 'payment_settings' && valueToSave && typeof valueToSave === 'object') {
            const ps = valueToSave;
            // qr/qrPayment → ewallet (merge qrImage)
            if (ps.qr || ps.qrPayment) {
              const qrData = ps.qrPayment || ps.qr;
              if (!ps.ewallet) {
                ps.ewallet = { enabled: true, label: 'E-Wallet', availableIn: ['pos', 'mobile'], qrImage: '' };
              }
              if (qrData.qrImage && !ps.ewallet.qrImage) {
                ps.ewallet.qrImage = qrData.qrImage;
              }
              delete ps.qr;
              delete ps.qrPayment;
            }
            // fpx → remove (absorbed into online)
            if (ps.fpx) {
              delete ps.fpx;
            }
            // Ensure staffMeal exists
            if (!ps.staffMeal) {
              ps.staffMeal = { enabled: false, label: 'Staff Meal', availableIn: [] };
            }
            // Clean ewallet legacy provider/config fields
            if (ps.ewallet) {
              delete ps.ewallet.provider;
              delete ps.ewallet.config;
              if (ps.ewallet.qrImage === undefined) ps.ewallet.qrImage = '';
            }
            // Clean card: POS-only, no PG config needed
            if (ps.card) {
              delete ps.card.provider;
              delete ps.card.config;
            }
            // Clean _order array: remove legacy keys, ensure staffMeal
            if (ps._order && Array.isArray(ps._order)) {
              ps._order = ps._order.filter(k => !['qr', 'qrPayment', 'fpx'].includes(k));
              if (!ps._order.includes('staffMeal')) {
                ps._order.push('staffMeal');
              }
            }
          }

          restaurant[field] = valueToSave;
        } else {
          restaurant[field] = req.body[field];
        }
      }
    });

    // Sync operation_settings with individual currency columns. We patch the
    // *guarded* operation_settings (set above) instead of the raw req.body to
    // avoid undoing the anti-wipe merge.
    if (req.body.operation_settings && (req.body.currency !== undefined || req.body.cash_rounding !== undefined || req.body.rounding_apply_to !== undefined)) {
      const opSettings = restaurant.operation_settings;
      if (opSettings && typeof opSettings === 'object') {
        if (req.body.currency !== undefined) opSettings.currency = req.body.currency;
        if (req.body.cash_rounding !== undefined) opSettings.cashRounding = req.body.cash_rounding;
        if (req.body.rounding_apply_to !== undefined) opSettings.roundingApplyTo = req.body.rounding_apply_to;
        restaurant.operation_settings = opSettings;
        console.log('✓ Synced currency settings in operation_settings:', {
          currency: opSettings.currency,
          cashRounding: opSettings.cashRounding,
          roundingApplyTo: opSettings.roundingApplyTo
        });
      }
    }

    console.log('💾 Saving to database...');
    await restaurant.save();
    console.log('✓ Settings saved successfully!');

    const changedFields = allowedFields.filter(f => req.body[f] !== undefined).join(', ');
    logActivity(req, {
      action_type: 'update',
      entity_type: 'settings',
      entity_id: restaurantId,
      entity_name: restaurant.name,
      description: `Updated store settings (${changedFields})`,
      restaurant_id: restaurantId
    });

    res.json({
      success: true,
      data: restaurant,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    console.error('✗ [STORE UPDATE ERROR]:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
