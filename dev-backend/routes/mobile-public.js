// 모바일 공개 조회 라우트 (인증 불필요)
// 마운트: /api/mobile

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const Category = require('../models/Category');
const OptionGroup = require('../models/OptionGroup');
const Option = require('../models/Option');
const { Op } = require('sequelize');
const { parseImageData, getProductEmoji, TableQRSession } = require('./mobile-helpers');
const { buildSetResolved } = require('../utils/setMenu');
const { isWithinSchedule, offScheduleMode } = require('../utils/availabilitySchedule');
const { getOrderingState, getPickupSlots } = require('../utils/businessHours');

router.get('/verify-qr', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.json({ success: true, data: { valid: true, mode: 'static' } });
    }

    const session = await TableQRSession.findOne({
      where: { token },
      include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'slug'] }]
    });

    if (!session) {
      return res.json({ success: true, data: { valid: false, reason: 'invalid_token' } });
    }

    // Check time expiration
    if (new Date() > new Date(session.expires_at)) {
      if (session.status === 'active') {
        await session.update({ status: 'expired', expired_by: 'time' });
      }
      return res.json({ success: true, data: { valid: false, reason: 'expired', table_number: session.table_number } });
    }

    if (session.status === 'expired') {
      return res.json({ success: true, data: { valid: false, reason: 'expired', expired_by: session.expired_by, table_number: session.table_number } });
    }

    const remainingMs = new Date(session.expires_at).getTime() - Date.now();
    const remainingMinutes = Math.floor(remainingMs / 60000);

    res.json({
      success: true,
      data: {
        valid: true,
        mode: 'session',
        table_number: session.table_number,
        restaurant_id: session.restaurant_id,
        remaining_minutes: remainingMinutes,
        expires_at: session.expires_at
      }
    });
  } catch (error) {
    console.error('Verify QR token error:', error);
    res.status(500).json({ success: false, message: 'Failed to verify QR token' });
  }
});

// Store & Menu endpoints
router.get('/store/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Find restaurant by slug
    const restaurant = await Restaurant.findOne({
      where: { slug: slug }
    });

    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    // Get operation settings with defaults
    const operationSettings = restaurant.operation_settings || {};

    const store = {
      id: restaurant.id.toString(),
      slug: restaurant.slug,
      name: restaurant.name,
      branch_name: restaurant.branch_name || null,
      description: restaurant.trade_name || restaurant.name,
      logo: restaurant.logo_url || '/images/store-logo.png',
      isOpen: restaurant.status === 'active',
      address: restaurant.address,
      phone: restaurant.phone,
      openingTime: operationSettings.openingTime || '09:00',
      closingTime: operationSettings.closingTime || '22:00',
      timeZone: operationSettings.timeZone || 'Asia/Kuala_Lumpur',
      // Order type settings
      orderTypes: operationSettings.orderTypes || {
        dineIn: true,
        takeaway: true,
        pickup: false,
        delivery: false
      },
      // Break times
      breakTimes: operationSettings.breakTimes || [],
      // Takeaway pricing for charge calculation
      takeawayPricing: operationSettings.takeawayPricing || {
        enabled: false,
        pricingType: 'per-item',
        perItemCharge: 0.50
      },
      openingHours: operationSettings.hours || {
        monday: '10:00 - 22:00',
        tuesday: '10:00 - 22:00',
        wednesday: '10:00 - 22:00',
        thursday: '10:00 - 22:00',
        friday: '10:00 - 23:00',
        saturday: '10:00 - 23:00',
        sunday: '10:00 - 22:00'
      },
      // Reservation availability flag — used by mobile to show/hide "Reserve a Table"
      reservationsEnabled: !!(restaurant.reservation_settings && restaurant.reservation_settings.enabled),
      // Dine-in table requirement. When ON, a mobile dine-in order MUST carry a
      // table number — used by the menu flow to force a table pick when the
      // customer entered via the generic/representative QR (no ?table=).
      // Gated by enableTableNumbers (default true).
      tableNumberRequired: (() => {
        const ts = restaurant.table_settings || {};
        return ts.enableTableNumbers !== false && !!ts.tableNumberRequired;
      })(),
      // Floor Plan table labels for the in-app table picker. Selecting from this
      // list guarantees the order resolves to the right Floor Plan table
      // (orders-crud / mobile-orders match table_number against these labels).
      floorTables: (() => {
        const fp = restaurant.floor_plan || {};
        const tbls = Array.isArray(fp.tables) ? fp.tables : [];
        return tbls
          .map(tt => (tt && tt.label != null ? String(tt.label)
            : (tt && tt.tableNumber != null ? String(tt.tableNumber) : null)))
          .filter(Boolean);
      })(),
      // Pickup / Takeaway informational settings — shown as hints on the OrderTypePage
      pickupSettings: operationSettings.pickupSettings || { prepMinutes: 30, locationNote: '', confirmationRequired: true },
      takeawaySettings: operationSettings.takeawaySettings || { prepMinutes: 15, packagingNote: '' },
      // Temporary ordering pause — when enabled, mobile page shows the message instead of menu
      pauseOrdering: !!(restaurant.mobile_settings && restaurant.mobile_settings.pause_ordering),
      pauseMessage: (restaurant.mobile_settings && restaurant.mobile_settings.pause_message) || '',
      // Business-hours + last-order gate (single source = utils/businessHours).
      // enabled:false / absent → { enabled:false, canOrder:true } = legacy behaviour (no time gate).
      // Mobile uses `ordering.canOrder` to gate immediate orders (dine-in/takeaway/ASAP-pickup);
      // pickup pre-order time slots are constrained by businessHours on the PaymentPage instead.
      ordering: getOrderingState(operationSettings, new Date())
    };

    res.json({ success: true, data: store });
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Valid pre-order pickup time slots, constrained to business hours + last order.
// Single source = utils/businessHours.getPickupSlots (same logic as the order gate).
// Returns { enabled:false } when the gate is OFF → frontend falls back to legacy slots.
router.get('/pickup-slots/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const restaurant = await Restaurant.findOne({ where: { slug } });
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }
    const os = restaurant.operation_settings || {};
    const lead = (os.pickupSettings && Number(os.pickupSettings.prepMinutes)) || 30;
    const slots = getPickupSlots(os, new Date(), { days: 7, stepMin: 30, leadMin: lead });
    if (slots === null) {
      return res.json({ success: true, data: { enabled: false, slots: [] } });
    }
    res.json({ success: true, data: { enabled: true, leadMinutes: lead, slots } });
  } catch (error) {
    console.error('Error fetching pickup slots:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/menu/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { page = 1, limit = 20, categoryId } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Find restaurant by slug
    const restaurant = await Restaurant.findOne({
      where: { slug: slug }
    });

    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    const restaurantId = restaurant.id;

    // Get categories for this restaurant
    const dbCategories = await Category.findAll({
      where: { restaurant_id: restaurantId, isActive: true },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    // Filter categories by schedule (mobile_settings.category_schedules).
    // Each entry supports day-of-week, event date range, daily time window, and an
    // off-schedule display mode (hide vs show-disabled) — evaluated by the shared
    // availabilitySchedule helper in the restaurant's timezone.
    const mobileCfg = restaurant.mobile_settings || {};
    const schedules = mobileCfg.category_schedules || [];
    const now = new Date();
    const tz = restaurant.operation_settings?.timeZone || 'Asia/Kuala_Lumpur';

    // catId -> { mode:'hide'|'disable', sched } for categories currently OUT of schedule.
    const offSchedule = {};
    for (const sched of schedules) {
      const catId = sched.category_id?.toString();
      if (!catId) continue;
      if (!isWithinSchedule(sched, now, tz)) {
        offSchedule[catId] = { mode: offScheduleMode(sched), sched };
      }
    }

    // Products store `category` as either the id ("106") or the name ("SET MENU")
    // depending on source (brand sync uses name, native uses id), so each
    // off-schedule category contributes BOTH forms to the filter sets.
    const catNameById = {};
    dbCategories.forEach(c => { catNameById[c.id.toString()] = c.name; });
    const hiddenKeys = new Set();              // product.category values fully removed
    const disabledSchedByKey = new Map();      // product.category value -> sched (kept, greyed)
    for (const [catId, info] of Object.entries(offSchedule)) {
      const keys = [catId];
      if (catNameById[catId]) keys.push(catNameById[catId]);
      if (info.mode === 'disable') keys.forEach(k => disabledSchedByKey.set(k, info.sched));
      else keys.forEach(k => hiddenKeys.add(k));
    }

    // 'hide' categories drop out of the tab list; 'disable' categories stay (greyed).
    const visibleCategories = dbCategories.filter(cat => offSchedule[cat.id.toString()]?.mode !== 'hide');

    // Build product query with pagination
    const productWhere = {
      restaurant_id: restaurantId,
      soldOut: false,
      is_active: true,   // 2026-05-29: hide deactivated menu items from the customer mobile menu (was missing → disabled items stayed orderable)
      set_only: false,   // 2026-06-12: 세트 구성 전용 단품(단품 판매 안 함) — 고객 주문 화면 숨김 (세트 구성으로는 주문 가능)
      brand_scope_active: true  // 2026-06-15: BG가 적용범위에서 뺀 상품(retracted)은 고객 메뉴 숨김. §14
    };

    // Filter by category if specified.
    // Product.category 는 일관되지 않게 카테고리 ID("106") 또는 이름("SET MENU")으로 저장돼 있다.
    // (브랜드 동기화 ensureLocalCategory 가 이름을 쓰는 반면, 매장 native 상품은 ID를 쓴다.)
    // → 프론트가 보내는 categoryId(숫자)와 그 카테고리 이름을 둘 다 매칭해야 세트/브랜드푸시 상품이 누락되지 않는다.
    if (categoryId) {
      const catRow = dbCategories.find(c => c.id.toString() === categoryId.toString());
      productWhere.category = catRow
        ? { [Op.in]: [categoryId.toString(), catRow.name] }
        : categoryId;
    }

    // Exclude only HIDDEN categories from product results; 'disable' categories
    // stay in the list (their items are returned flagged + greyed on mobile).
    if (hiddenKeys.size > 0 && !categoryId) {
      productWhere.category = { [Op.notIn]: Array.from(hiddenKeys) };
    }

    // Get total count for pagination
    const totalCount = await Product.count({ where: productWhere });

    // Get products with pagination.
    // 관리자 지정 순서(display_order) 우선. 0=미설정은 뒤로(추가순 id ASC).
    const products = await Product.findAll({
      where: productWhere,
      limit: parseInt(limit),
      offset: offset,
      order: [
        [Product.sequelize.literal('display_order = 0'), 'ASC'],
        ['display_order', 'ASC'],
        ['id', 'ASC']
      ]
    });

    // Get option groups for this restaurant
    const optionGroups = await OptionGroup.findAll({
      where: { restaurant_id: restaurantId, isActive: true },
      include: [{
        model: Option,
        as: 'options',
        attributes: ['id', 'name', 'price', 'isActive', 'displayOrder', 'sold_out']
      }],
      order: [
        [{ model: Option, as: 'options' }, 'displayOrder', 'ASC']
      ]
    });

    // Shape the schedule window for the mobile client to render a localized
    // "available …" label on disabled categories/items.
    const scheduleInfo = (sched) => sched ? {
      start_time: sched.start_time || null,
      end_time: sched.end_time || null,
      days: Array.isArray(sched.days) ? sched.days : [],
      start_date: sched.start_date || null,
      end_date: sched.end_date || null
    } : null;

    // Create categories array for mobile app. 'disable' categories carry a flag +
    // schedule so the client greys them out instead of hiding.
    const categories = visibleCategories.map(cat => {
      const off = offSchedule[cat.id.toString()];
      const base = {
        id: cat.id.toString(),
        name: cat.name,
        emoji: cat.emoji || getProductEmoji(cat.name)  // Use DB emoji first, fallback to generated
      };
      if (off && off.mode === 'disable') {
        base.schedule_unavailable = true;
        base.schedule = scheduleInfo(off.sched);
      }
      return base;
    });

    // Create category map for quick lookup (use all categories for item mapping)
    const categoryMap = {};
    dbCategories.forEach(cat => {
      categoryMap[cat.id] = cat.name;
    });

    // Format items for mobile app
    const items = products.map(product => {
      // Parse optionGroups if it's a string (handle double-encoded JSON)
      let productOptionGroupIds = [];
      if (product.optionGroups) {
        try {
          let parsed = typeof product.optionGroups === 'string'
            ? JSON.parse(product.optionGroups)
            : product.optionGroups;
          // Handle double-encoded JSON string
          if (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
          }
          productOptionGroupIds = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          console.error('Failed to parse optionGroups for product', product.id, e);
          productOptionGroupIds = [];
        }
      }

      // Find option groups for this product - 메뉴에서 설정한 순서대로 정렬
      const productOptionGroups = productOptionGroupIds
        .map(groupId => {
          const og = optionGroups.find(g => g.id === groupId || g.id.toString() === groupId.toString());
          if (!og) return null;
          return {
            id: og.id.toString(),
            name: og.name,
            required: og.required,
            multiple: og.multiple,
            options: (og.options || [])
              .filter(opt => opt.isActive)
              .map(opt => ({
                id: opt.id.toString(),
                name: opt.name,
                price: parseFloat(opt.price || 0),
                sold_out: !!opt.sold_out // 2026-06-28 (2-1) 옵션 품절 — 모바일 주문화면 선택불가
              }))
          };
        })
        .filter(og => og !== null);

      // Find matching category by ID or name
      let categoryId = null;
      let categoryName = '';

      // Try to match by ID first (if category is a number)
      const categoryById = dbCategories.find(cat => cat.id.toString() === product.category);
      if (categoryById) {
        categoryId = categoryById.id.toString();
        categoryName = categoryById.name;
      } else {
        // Try to match by name (if category is a string)
        const categoryByName = dbCategories.find(cat =>
          cat.name.toLowerCase().replace(/\s+/g, '_') === product.category ||
          cat.name === product.category
        );
        if (categoryByName) {
          categoryId = categoryByName.id.toString();
          categoryName = categoryByName.name;
        } else {
          // Fallback: use the category value as-is
          categoryId = product.category || '';
          categoryName = '';
        }
      }

      // Parse image — list view: thumbnail URL only, skip base64
      const imageData = parseImageData(product.image, product.image_thumbnail, true);

      // Availability = category schedule AND item schedule (both must be open).
      // Category 'disable' (the category is off but shown greyed):
      const catOffSched = disabledSchedByKey.get(categoryId)
        || (categoryName && disabledSchedByKey.get(categoryName))
        || disabledSchedByKey.get(product.category)
        || null;
      // Per-item schedule (Product.availability) — events set per menu item:
      const itemSched = (product.availability && typeof product.availability === 'object') ? product.availability : null;
      const itemOff = itemSched ? !isWithinSchedule(itemSched, now, tz) : false;
      const itemHide = itemOff && offScheduleMode(itemSched) === 'hide';
      const itemDisable = itemOff && offScheduleMode(itemSched) === 'disable';
      // Effective off-schedule: item-level takes precedence (more specific), else category.
      const scheduleUnavailable = itemDisable || (!itemOff && !!catOffSched);
      const offSched = itemOff ? itemSched : catOffSched;

      return {
        id: product.id.toString(),
        categoryId: categoryId,
        categoryName: categoryName,
        name: product.name,
        price: parseFloat(product.price),
        description: product.description || '',
        emoji: product.emoji || getProductEmoji(categoryName),
        image: imageData?.thumbnail || undefined,
        isAvailable: !product.soldOut && !scheduleUnavailable,  // unavailable if sold out OR off-schedule(disable)
        schedule_unavailable: scheduleUnavailable || undefined,
        schedule: offSched ? scheduleInfo(offSched) : undefined,
        _hide: itemHide,  // item-level 'hide' schedule → stripped from the list below
        preparationTime: product.preparation_time || 15,
        calories: product.calories || 0,
        isPopular: product.isPopular || false,
        optionGroups: productOptionGroups,
        is_set_menu: product.is_set_menu || false,
        set_items: product.set_items || undefined,
        set_display_order: product.set_display_order || 0,
        is_featured: product.is_featured || false,
        takeaway_charge: product.takeaway_charge != null ? Number(product.takeaway_charge) : null
      };
    })
      // Item-level 'hide' schedule → drop from the menu entirely; strip the internal flag.
      .filter(it => !it._hide)
      .map(({ _hide, ...rest }) => rest);

    // Pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasMore = parseInt(page) < totalPages;

    // Mobile display settings
    const mobileSettings = restaurant.mobile_settings || { show_featured: true, show_popular: true };

    // 2026-06-12: 판매 가능한 단품이 하나도 없는 카테고리(전부 세트 전용 set_only)는 탭에서 숨김.
    // soldOut 은 기존 동작 유지(품절만 있는 카테고리는 지금처럼 빈 탭) — set_only 로 인한 빈 탭만 차단.
    const _sellableCatRows = await Product.findAll({
      where: { restaurant_id: restaurantId, is_active: true, set_only: false, brand_scope_active: true },
      attributes: ['category'], raw: true
    });
    const _sellableCatSet = new Set(_sellableCatRows.map(p => String(p.category)));
    const sellableCategories = categories.filter(c => _sellableCatSet.has(String(c.id)) || _sellableCatSet.has(String(c.name)));

    res.json({
      success: true,
      data: { categories: sellableCategories, items, mobile_settings: mobileSettings },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalItems: totalCount,
        totalPages,
        hasMore
      }
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/menu/item/:itemId', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.itemId);
    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
    }

    // Get option groups for this product from DB
    const optionGroups = await OptionGroup.findAll({
      where: { restaurant_id: product.restaurant_id, isActive: true },
      include: [{
        model: Option,
        as: 'options',
        attributes: ['id', 'name', 'price', 'isActive', 'displayOrder', 'sold_out']
      }],
      order: [
        [{ model: Option, as: 'options' }, 'displayOrder', 'ASC']
      ]
    });

    // Parse optionGroups if it's a string (handle double-encoded JSON)
    let productOptionGroupIds = [];
    if (product.optionGroups) {
      try {
        let parsed = typeof product.optionGroups === 'string'
          ? JSON.parse(product.optionGroups)
          : product.optionGroups;
        // Handle double-encoded JSON string
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        productOptionGroupIds = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error('Failed to parse optionGroups:', e);
        productOptionGroupIds = [];
      }
    }

    // Find option groups assigned to this product - 메뉴에서 설정한 순서대로 정렬
    const productOptionGroups = productOptionGroupIds
      .map(groupId => {
        const og = optionGroups.find(g => g.id === groupId || g.id.toString() === groupId.toString());
        if (!og) return null;
        return {
          id: og.id.toString(),
          name: og.name,
          required: og.required,
          multiple: og.multiple,
          options: (og.options || [])
            .filter(opt => opt.isActive)
            .map(opt => ({
              id: opt.id.toString(),
              name: opt.name,
              price: parseFloat(opt.price || 0)
            }))
        };
      })
      .filter(og => og !== null);

    // Parse image data for detail view (use medium size)
    const imageData = parseImageData(product.image, product.image_thumbnail);

    const item = {
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price),
      description: product.description || '',
      emoji: product.emoji || getProductEmoji(product.category),  // Use DB emoji first, fallback to generated
      image: imageData?.medium || imageData?.original || undefined,  // Use medium for detail view
      imageThumbnail: imageData?.thumbnail || undefined,
      imageOriginal: imageData?.original || undefined,
      isAvailable: true,
      preparationTime: product.preparation_time || 15,
      calories: Math.floor(Math.random() * 400) + 200,
      ingredients: ['Fresh ingredients', 'Made to order'],
      allergens: ['May contain gluten'],
      nutritionInfo: {
        calories: Math.floor(Math.random() * 400) + 200,
        protein: '20g',
        carbs: '30g',
        fat: '15g'
      },
      optionGroups: productOptionGroups,  // Use real DB option groups
      is_set_menu: product.is_set_menu || false,
      set_groups: product.set_groups || null
    };

    // 세트면 구성품(name/price/soldOut/상속옵션) + 품절계산 resolve 첨부
    if (product.is_set_menu) {
      try {
        const resolved = await buildSetResolved(product, product.restaurant_id);
        if (resolved) Object.assign(item, resolved);
      } catch (e) { console.error('set resolve(mobile) 실패:', e.message); }
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/payment/methods', async (req, res) => {
  try {
    const methods = [
      {
        id: 'card',
        name: 'Credit/Debit Card',
        icon: '💳',
        enabled: true
      },
      {
        id: 'fpx',
        name: 'FPX Online Banking',
        icon: '🏦',
        enabled: true
      },
      {
        id: 'ewallet',
        name: 'E-Wallet',
        icon: '📱',
        enabled: false,
        comingSoon: true
      }
    ];
    
    res.json({ success: true, data: methods });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post('/auth/guest', async (req, res) => {
  try {
    const guestToken = 'guest_' + Date.now() + '_' + Math.random().toString(36);
    
    res.json({ 
      success: true, 
      data: {
        token: guestToken,
        expiresIn: 3600
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/featured/:slug', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ where: { slug: req.params.slug } });
    if (!restaurant) return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });

    const products = await Product.findAll({
      where: { restaurant_id: restaurant.id, is_featured: true, soldOut: false, is_active: true, set_only: false, brand_scope_active: true },
      order: [['id', 'ASC']]
    });

    const items = products.map(p => {
      const imageData = parseImageData(p.image, p.image_thumbnail, true);
      return {
        id: p.id.toString(),
        name: p.name,
        price: parseFloat(p.price),
        emoji: p.emoji || '🍽️',
        image: imageData?.thumbnail || undefined,
        is_set_menu: p.is_set_menu || false,
        set_items: p.set_items || undefined,
        code: p.code || undefined
      };
    });

    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching featured items:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.get('/popular/:slug', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ where: { slug: req.params.slug } });
    if (!restaurant) return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });

    // Get orders from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurant.id,
        status: { [Op.notIn]: ['cancelled'] },
        createdAt: { [Op.gte]: thirtyDaysAgo }
      },
      attributes: ['order_items'],
      raw: true
    });

    // 주문 항목은 product_id 없이 이름만 저장되는 경우가 많다(모바일/POS 카트라인).
    // → 이름 기반 폴백 매칭으로 빈도를 센다(stationEnrichment 와 동일 전략).
    //   이 폴백이 없으면 인기메뉴가 항상 0개라 인기 탭이 영영 안 뜬다.
    const nameMatchProducts = await Product.findAll({
      where: { restaurant_id: restaurant.id },
      attributes: ['id', 'name'],
      raw: true
    });
    const nameToId = new Map();
    nameMatchProducts.forEach(p => { if (p.name) nameToId.set(p.name.trim().toLowerCase(), p.id); });

    // Count item frequency
    const itemCounts = {};
    orders.forEach(order => {
      let items = order.order_items;
      if (typeof items === 'string') {
        try { items = JSON.parse(items); } catch { items = []; }
      }
      if (!Array.isArray(items)) return;
      items.forEach(item => {
        let productId = item.product_id || item.productId || item.menuItem?.id;
        // product_id 없으면 이름으로 폴백 매칭
        if (!productId && item.name) {
          productId = nameToId.get(String(item.name).trim().toLowerCase());
        }
        if (!productId) return;
        const parsed = parseInt(productId);
        if (isNaN(parsed)) return;
        const key = parsed.toString();
        itemCounts[key] = (itemCounts[key] || 0) + (item.quantity || 1);
      });
    });

    // Sort by count, take top 8
    const topIds = Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([id]) => parseInt(id));

    if (topIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // Fetch product details
    const productWhere = { id: topIds, soldOut: false, is_active: true, set_only: false, brand_scope_active: true };

    // Exclude categories from popular (mobile_settings.popular_excluded_category_ids)
    const mobileSettings = restaurant.mobile_settings || {};
    const excludedIds = mobileSettings.popular_excluded_category_ids || [];
    if (excludedIds.length > 0) {
      // product.category stores category ID as string (e.g. "14") or category name (legacy)
      // Match both formats: ID as string + category names for legacy data
      const excludedStrIds = excludedIds.map(id => id.toString());
      const excludedCats = await Category.findAll({ where: { id: excludedIds }, attributes: ['id', 'name'] });
      const excludedNames = excludedCats.map(c => c.name);
      productWhere.category = { [Op.notIn]: [...excludedStrIds, ...excludedNames] };
    }

    const products = await Product.findAll({ where: productWhere });

    const items = topIds
      .map(id => {
        const p = products.find(prod => prod.id === id);
        if (!p) return null;
        const imageData = parseImageData(p.image, p.image_thumbnail, true);
        return {
          id: p.id.toString(),
          name: p.name,
          price: parseFloat(p.price),
          emoji: p.emoji || '🍽️',
          image: imageData?.thumbnail || undefined,
          is_set_menu: p.is_set_menu || false,
          set_items: p.set_items || undefined,
          code: p.code || undefined,
          orderCount: itemCounts[id.toString()] || 0
        };
      })
      .filter(Boolean);

    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching popular items:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// #11c 모바일 크로스셀 — 담은 상품에 대한 추천(공개, slug→restaurant 해석).
// 설계 §3.3/1.1: ①수동연결 → ②추천카테고리 → []. 활성·재고·자신제외, 최대 6.
router.get('/:slug/products/:productId/recommendations', async (req, res) => {
  try {
    const { slug } = req.params;
    const productId = parseInt(req.params.productId, 10);
    if (!Number.isFinite(productId)) {
      return res.status(400).json({ success: false, message: 'Invalid productId' });
    }
    const restaurant = await Restaurant.findOne({ where: { slug }, attributes: ['id', 'operation_settings'] });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    // 애드온(크로스셀) 마스터 토글 — 기본 OFF(2026-06-26 Irene): 관리자가 설정에서 명시적으로
    // 켰을 때(=== true)만 추천 노출. 미설정(undefined/null/false)=꺼짐 → 시트 자체가 안 뜸.
    let ops = restaurant.operation_settings || {};
    if (typeof ops === 'string') { try { ops = JSON.parse(ops); } catch { ops = {}; } }
    if (!ops || ops.crossSellEnabled !== true) {
      return res.json({ success: true, data: [] });
    }

    const { resolveRecommendations } = require('../utils/crossSell');
    const data = await resolveRecommendations(restaurant.id, productId, 6);
    // 이미지 URL 정규화 — 정상 메뉴 응답과 동일하게 "문자열 URL"만 추출(parseImageData 는 {thumbnail,medium,original}
    // 객체를 반환하므로 그대로 넣으면 카드가 url([object Object]) 로 깨진다). thumbnail 우선.
    const out = data.map(p => {
      const parsed = p.image ? parseImageData(p.image) : null;
      return { ...p, image: parsed ? (parsed.thumbnail || parsed.medium || parsed.original || null) : null };
    });
    res.json({ success: true, data: out });
  } catch (error) {
    console.error('GET mobile recommendations:', error.message);
    res.status(500).json({ success: false, message: 'Failed to load recommendations' });
  }
});

module.exports = router;
