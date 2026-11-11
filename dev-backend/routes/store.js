const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const SystemSettings = require('../models/SystemSettings');
const { authenticateToken, checkRestaurantAccess, userCanAccessRestaurant } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');
const {
  guardPrinterSettings,
  guardPaymentSettings,
  guardOperationSettings,
  guardShallowSettings,
  normalizePaymentSettings,
} = require('../utils/settingsGuard');
const { isPoMasterLocked, applyPoMasterKeep } = require('../utils/poOwnerApproval');
const printerScope = require('../utils/printerSetupDevice');
const { applyPrinterWrite } = printerScope;
const KitchenStation = require('../models/KitchenStation');

// Get store settings
router.get('/settings', authenticateToken, checkRestaurantAccess, async (req, res) => {
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
      // 읽기 정규화 — 모든 매장이 고정 카탈로그(표준 7종) 구조로 응답. 옛 키 마이그 +
      // 누락 결제수단 백필(disabled) + label 보장. 값은 매장 것 보존. 이걸로 "매장마다
      // 결제수단 목록이 다른" 구조 어긋남이 응답 단계에서 영구 차단된다(신규/미래 포함).
      paymentSettings = normalizePaymentSettings(restaurant.payment_settings);
      // sync enabled flag with availableIn for all methods
      Object.keys(paymentSettings).forEach(key => {
        if (key === '_order') return;
        const m = paymentSettings[key];
        if (m && typeof m === 'object' && 'enabled' in m && 'availableIn' in m) {
          m.enabled = Array.isArray(m.availableIn) && m.availableIn.length > 0;
        }
      });
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

    const rawRestaurantId = req.query.restaurantId || req.user.restaurant_id;
    console.log('🎯 Target Restaurant ID:', rawRestaurantId);

    if (!rawRestaurantId) {
      console.error('✗ No restaurant ID provided');
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID is required', code: 'VALIDATION_ERROR' } });
    }

    // 🔴 id 정규화 (2026-07-25 Fable 적대검증 실증): `?restaurantId=1.16e2` 를 주면
    // 권한판정(parseInt → 1)과 실제 조회(MySQL float 캐스팅 → 116)가 **다른 매장**을 가리켜
    // 남의 매장 설정에 쓰기가 가능했다. 정규 10진수만 받고, 이후 전 구간에서 이 값만 쓴다.
    if (!/^\d+$/.test(String(rawRestaurantId))) {
      return res.status(400).json({ success: false, error: { message: 'Invalid restaurant id', code: 'VALIDATION_ERROR' } });
    }
    const restaurantId = String(parseInt(rawRestaurantId, 10));

    // Access control: Only allow users to update their own restaurant
    // System Admin can update any restaurant
    //
    // 2026-07-25 보안: 이전에는 Restaurant Admin·Staff 만 검사하고 그 외 역할(Supplier, Owner,
    // Brand/Foodcourt Manager 등)은 무검사로 통과해, 타 매장의 payment_settings·operation_settings
    // 를 덮어쓸 수 있었다. GET /store/settings 는 checkRestaurantAccess 로 막혀 있는데 쓰기만
    // 열려 있던 비대칭 게이트. 이제 비-SA 는 전부 userCanAccessRestaurant 로 통일한다
    // (RA/Staff 판정은 기존 restaurant_id 일치 검사와 동일 → 그쪽 동작 변화 0).
    if (req.user.role !== 'System Admin') {
      const allowed = await userCanAccessRestaurant(req.user, restaurantId);
      if (!allowed) {
        console.error('✗ Access denied: user has no access to target restaurant');
        return res.status(403).json({ success: false, error: { message: 'Access denied to this restaurant', code: 'FORBIDDEN' } });
      }
    }
    console.log('✓ Access control passed');

    // 2026-06-25 (Irene): printer_settings 는 레스토랑 관리자(또는 System Admin)만 변경 가능.
    // 매장 직원(Staff)·기타 역할이 다른 설정을 저장할 때 printer_settings 를 함께 덮어쓰지
    // 못하게 막는다 (thefire kitchenPrinter wipe 재발 방지의 한 축). 권한 없는 사용자의 저장에서는
    // printer_settings 필드를 통째로 건너뛰어 기존 DB 값을 보존한다.
    // → 판정은 utils/printerSetupDevice.applyPrinterWrite 한 곳(아래 필드 루프).
    // 발주 오너 승인 스위치 — 오너 연결 매장이면 오너·SA 만 바꾼다(2026-11-01 Irene «권고대로» · Fable §G-7-8 A안)
    const poMasterLocked = await isPoMasterLocked(req.user, restaurantId);


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

    let printerSettingsSkipped;
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        // printer_settings — 판정 한 곳(utils/printerSetupDevice · 2026-11-10 Fable 설계):
        //  · 관리자·SA 아님 → 비상 모드 두 칸만(2026-06-25 RA-only 자물쇠 그대로 옮김)
        //  · «프린터 설정 기기» 가 정해진 매장에서 다른 기기가 확인 없이 보낸 저장 → 비상 두 칸만 + 응답에 표시
        //  · 그 밖 → 기존 anti-wipe 가드 · 꼬리표(setupDevice)는 언제나 DB 값 유지
        if (field === 'printer_settings') {
          try {
            const r = applyPrinterWrite({
              user: req.user, body: req.body,
              existingRaw: restaurant.getDataValue('printer_settings'),
              guard: guardPrinterSettings, restaurantId,
            });
            if (r.skipped) printerSettingsSkipped = r.skipped;
            if (r.action === 'save') {
              restaurant.printer_settings = r.value;
              console.log(`  ✏️  printer_settings (${r.reason})`);
            } else {
              console.warn(`  🔒 printer_settings skipped (${r.reason}, role=${req.user.role})`);
            }
          } catch (e) {
            console.warn('  🔒 printer_settings skipped (parse error)', e.message);
          }
          return;
        }
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
          // 발주 오너 승인 스위치 — 오너 연결 매장이면 오너·SA 만 바꾼다(2026-11-01 §G-7-8 A · utils/poOwnerApproval)
          if (field === 'operation_settings' && poMasterLocked && applyPoMasterKeep(valueToSave, existingVal)) {
            console.warn(`  🔒 requirePoOwnerApproval kept (role=${req.user.role}) — Owner/SA only`);
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
      message: 'Settings updated successfully',
      ...(printerSettingsSkipped ? { printerSettingsSkipped } : {})
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

// ─────────────────────────────────────────────────────────────────────────────
// 프린터 설정 좁은 쓰기 길 3개 (2026-11-10 · Fable 설계 §3-2 · utils/printerSetupDevice)
// 통째 저장에 얹지 않고 DB 원본 JSON 을 읽어 «해당 칸만» 바꾼다. 응답 = 바뀐 뒤 printer_settings.
// ─────────────────────────────────────────────────────────────────────────────
async function loadRestaurantForPrinterWrite(req, res) {
  const raw = req.body && req.body.restaurantId != null ? req.body.restaurantId : req.user.restaurant_id;
  if (raw == null || !/^\d+$/.test(String(raw))) {
    res.status(400).json({ success: false, message: 'Invalid restaurant id' });
    return null;
  }
  const restaurantId = String(parseInt(raw, 10));
  if (req.user.role !== 'System Admin') {
    const allowed = await userCanAccessRestaurant(req.user, restaurantId);
    if (!allowed) {
      res.status(403).json({ success: false, message: 'Access denied to this restaurant' });
      return null;
    }
  }
  const restaurant = await Restaurant.findByPk(restaurantId);
  if (!restaurant) {
    res.status(404).json({ success: false, message: 'Restaurant not found' });
    return null;
  }
  return { restaurant, restaurantId };
}

// ① 이 기기를 «프린터 설정 기기» 로 — 관리자·SA 만. setupDevice 칸만 바꾼다.
router.post('/printer-setup-device', authenticateToken, async (req, res) => {
  try {
    if (!printerScope.canEditPrinterSettings(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Only the restaurant admin can change printer settings' });
    }
    const device = printerScope.normalizeDevice(req.body && req.body.device);
    if (!device) return res.status(400).json({ success: false, message: 'This device has no device id' });
    const ctx = await loadRestaurantForPrinterWrite(req, res);
    if (!ctx) return;
    const ps = { ...printerScope.parsePs(ctx.restaurant.getDataValue('printer_settings')) };
    ps.setupDevice = printerScope.makeSetupDevice(device, req.user);
    ctx.restaurant.printer_settings = ps;
    await ctx.restaurant.save();
    logActivity(req, {
      action_type: 'update', entity_type: 'settings', entity_id: ctx.restaurantId,
      entity_name: ctx.restaurant.name, restaurant_id: ctx.restaurantId,
      description: `Printer setup device set to "${device.name || device.kind}" (${device.kind})`,
    });
    res.json({ success: true, data: { printer_settings: ctx.restaurant.printer_settings } });
  } catch (error) {
    console.error('[printer-setup-device]', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ② 빠진 스테이션 칸만 채우기 — 관리자·SA. 더한 게 없으면 쓰지 않는다. 기기 잠금과 무관(더하기만).
//    (2026-05-28 사고 수리: 칸이 빠지면 그 스테이션 티켓이 첫 스테이션 프린터로 몰림)
router.post('/printer-station-seed', authenticateToken, async (req, res) => {
  try {
    if (!printerScope.canEditPrinterSettings(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Only the restaurant admin can change printer settings' });
    }
    const ctx = await loadRestaurantForPrinterWrite(req, res);
    if (!ctx) return;
    const stations = await KitchenStation.findAll({ where: { restaurant_id: ctx.restaurantId }, attributes: ['id', 'name'] });
    const { value, added } = printerScope.seedMissingStations(ctx.restaurant.getDataValue('printer_settings'), stations.map(s => s.get({ plain: true })));
    if (added > 0) {
      ctx.restaurant.printer_settings = value;
      await ctx.restaurant.save();
      console.log(`[printer-station-seed] restaurant ${ctx.restaurantId}: +${added} station entries`);
    }
    res.json({ success: true, data: { printer_settings: ctx.restaurant.printer_settings, added } });
  } catch (error) {
    console.error('[printer-station-seed]', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ③ 비상 모드 — 매장에 닿는 모든 역할(직원 포함 · 영업 중 프린터 고장 대응). 비상 두 칸만.
router.post('/printer-emergency', authenticateToken, async (req, res) => {
  try {
    if (typeof (req.body && req.body.on) !== 'boolean') {
      return res.status(400).json({ success: false, message: 'on must be true or false' });
    }
    const ctx = await loadRestaurantForPrinterWrite(req, res);
    if (!ctx) return;
    const { value, changed } = printerScope.mergeEmergencyOnly(ctx.restaurant.getDataValue('printer_settings'), { emergencyMode: req.body.on });
    if (changed) {
      ctx.restaurant.printer_settings = value;
      await ctx.restaurant.save();
      logActivity(req, {
        action_type: 'update', entity_type: 'settings', entity_id: ctx.restaurantId,
        entity_name: ctx.restaurant.name, restaurant_id: ctx.restaurantId,
        description: `Printer emergency mode ${req.body.on ? 'ON' : 'OFF'}`,
      });
    }
    res.json({ success: true, data: { printer_settings: ctx.restaurant.printer_settings } });
  } catch (error) {
    console.error('[printer-emergency]', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
