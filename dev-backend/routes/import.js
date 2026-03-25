const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const { Readable } = require('stream');
const { authenticateToken } = require('../middleware/auth');
const Category = require('../models/Category');
const Product = require('../models/Product');
const OptionGroup = require('../models/OptionGroup');
const Option = require('../models/Option');
const Order = require('../models/Order');
const ImportHistory = require('../models/ImportHistory');
const { Op } = require('sequelize');

// Multer: CSV 파일만 허용, 메모리 저장 (5MB 제한)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  }
});

// ============================================
// 자동 매핑 로직
// ============================================

const COLUMN_ALIASES = {
  // 카테고리용
  name: ['product name', 'item name', 'menu item', 'item', 'product', 'menu', 'category name', 'category', 'name'],
  display_order: ['order', 'sort order', 'display order', 'position', 'sort'],
  description: ['desc', 'detail', 'details', 'note', 'notes', 'description'],

  // 메뉴용
  price: ['unit price', 'sell price', 'selling price', 'amount', 'menu price', 'price'],
  category: ['category name', 'group', 'type', 'menu category', 'section', 'category'],
  sku: ['item code', 'product code', 'barcode', 'code', 'sku'],

  // 옵션용
  menu_item: ['product', 'item', 'menu item', 'product name', 'menu'],
  group_name: ['option group', 'group name', 'group', 'modifier group', 'add on group'],
  option_name: ['option', 'option name', 'modifier', 'add on', 'choice'],
  option_price: ['option price', 'extra price', 'add on price', 'modifier price', 'extra'],

  // 주문용
  date: ['order date', 'transaction date', 'sale date', 'datetime', 'timestamp', 'date', 'created'],
  total_amount: ['total', 'amount', 'grand total', 'net amount', 'sale amount', 'total amount'],
  payment_method: ['payment', 'payment type', 'pay method', 'tender', 'payment method'],
  order_type: ['type', 'order type', 'service type', 'dining option'],
  item_name: ['product', 'item', 'menu item', 'product name', 'item name'],
  quantity: ['qty', 'count', 'units', 'no of items', 'quantity'],
  unit_price: ['price', 'item price', 'sell price', 'unit price']
};

/**
 * CSV 컬럼명을 정규화하여 DB 필드와 매칭
 */
function normalizeColumnName(col) {
  return col.toLowerCase().replace(/[\s_\-\.]+/g, '').trim();
}

function autoMapColumns(csvHeaders, targetFields) {
  const mapping = {};

  csvHeaders.forEach(header => {
    const normalized = normalizeColumnName(header);

    // 1. 정확히 일치
    if (targetFields.includes(normalized)) {
      mapping[header] = normalized;
      return;
    }

    // 2. 동의어 사전 매칭
    for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
      if (!targetFields.includes(field)) continue;
      const normalizedAliases = aliases.map(a => normalizeColumnName(a));
      if (normalizedAliases.includes(normalized)) {
        mapping[header] = field;
        return;
      }
      // 부분 매칭
      if (normalizedAliases.some(a => normalized.includes(a) || a.includes(normalized))) {
        if (!mapping[header]) mapping[header] = field;
      }
    }
  });

  return mapping;
}

/**
 * CSV 버퍼를 파싱하여 행 배열로 반환
 */
function parseCSV(buffer) {
  return new Promise((resolve, reject) => {
    const rows = [];
    const stream = Readable.from(buffer.toString('utf-8'));
    stream
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', reject);
  });
}

// ============================================
// API 엔드포인트
// ============================================

/**
 * POST /api/import/preview
 * CSV 파일을 파싱하고 자동 매핑 결과를 반환
 */
router.post('/preview', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'CSV file is required' });
    }

    const type = req.body.type; // 'categories', 'menu', 'options', 'orders'
    if (!['categories', 'menu', 'options', 'orders'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid import type' });
    }

    const rows = await parseCSV(req.file.buffer);
    if (rows.length === 0) {
      return res.status(400).json({ success: false, message: 'CSV file is empty' });
    }

    const headers = Object.keys(rows[0]);

    // 타입별 대상 필드
    const targetFieldsMap = {
      categories: ['name', 'display_order', 'description'],
      menu: ['name', 'price', 'category', 'description', 'sku'],
      options: ['menu_item', 'group_name', 'option_name', 'option_price'],
      orders: ['date', 'total_amount', 'payment_method', 'order_type', 'item_name', 'quantity', 'unit_price']
    };

    const autoMapping = autoMapColumns(headers, targetFieldsMap[type]);

    // 주문: 요약/상세 형식 자동 판별
    let format = null;
    if (type === 'orders') {
      const hasItemName = Object.values(autoMapping).includes('item_name');
      const hasQuantity = Object.values(autoMapping).includes('quantity');
      format = (hasItemName && hasQuantity) ? 'detail' : 'summary';
    }

    res.json({
      success: true,
      data: {
        headers,
        rows: rows.slice(0, 5),
        totalRows: rows.length,
        autoMapping,
        targetFields: targetFieldsMap[type],
        format
      }
    });
  } catch (error) {
    console.error('[Import] Preview error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/import/execute-categories
 */
router.post('/execute-categories', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const restaurantId = req.body.restaurant_id || req.user.restaurant_id;
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurant_id is required' });

    const mapping = JSON.parse(req.body.mapping || '{}');
    const duplicateAction = req.body.duplicate_action || 'skip'; // 'skip' | 'update'
    const rows = await parseCSV(req.file.buffer);

    let success = 0, failed = 0, skipped = 0;
    const errors = [];
    const importedIds = [];

    for (const row of rows) {
      try {
        const name = row[Object.keys(mapping).find(k => mapping[k] === 'name')]?.trim();
        if (!name) { failed++; errors.push(`Row missing name`); continue; }

        const displayOrder = parseInt(row[Object.keys(mapping).find(k => mapping[k] === 'display_order')]) || 0;
        const description = row[Object.keys(mapping).find(k => mapping[k] === 'description')]?.trim() || null;

        const existing = await Category.findOne({ where: { name, restaurant_id: restaurantId } });
        if (existing) {
          if (duplicateAction === 'update') {
            await existing.update({ display_order: displayOrder || existing.display_order, description: description || existing.description });
            importedIds.push(existing.id);
            success++;
          } else {
            skipped++;
          }
        } else {
          const created = await Category.create({ name, restaurant_id: restaurantId, display_order: displayOrder, description });
          importedIds.push(created.id);
          success++;
        }
      } catch (err) {
        failed++;
        errors.push(err.message);
      }
    }

    // Import history 기록
    const batchId = `cat-${Date.now().toString(36)}`;
    await ImportHistory.create({
      batch_id: batchId, restaurant_id: restaurantId, user_id: req.user.id,
      import_type: 'categories', file_name: req.file.originalname,
      total_rows: rows.length, success_count: success, skipped_count: skipped, failed_count: failed,
      imported_ids: JSON.stringify(importedIds)
    });

    res.json({ success: true, data: { success, failed, skipped, total: rows.length, batchId, errors: errors.slice(0, 10) } });
  } catch (error) {
    console.error('[Import] Categories error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/import/execute-menu
 */
router.post('/execute-menu', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const restaurantId = req.body.restaurant_id || req.user.restaurant_id;
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurant_id is required' });

    const mapping = JSON.parse(req.body.mapping || '{}');
    const duplicateAction = req.body.duplicate_action || 'skip';
    const rows = await parseCSV(req.file.buffer);

    // 카테고리 매핑 미리 로드
    const categories = await Category.findAll({ where: { restaurant_id: restaurantId }, attributes: ['id', 'name'] });
    const categoryMap = {};
    categories.forEach(c => { categoryMap[normalizeColumnName(c.name)] = c.id; });

    let success = 0, failed = 0, skipped = 0, categoriesCreated = 0;
    const errors = [];
    const importedIds = [];

    const getMappedValue = (row, field) => {
      const key = Object.keys(mapping).find(k => mapping[k] === field);
      return key ? row[key]?.trim() : null;
    };

    for (const row of rows) {
      try {
        const name = getMappedValue(row, 'name');
        const price = parseFloat(getMappedValue(row, 'price')) || 0;
        if (!name) { failed++; errors.push('Row missing name'); continue; }

        const categoryName = getMappedValue(row, 'category');
        let categoryId = null;
        if (categoryName) {
          const normalizedCat = normalizeColumnName(categoryName);
          categoryId = categoryMap[normalizedCat];
          if (!categoryId) {
            const newCat = await Category.create({ name: categoryName.trim(), restaurant_id: restaurantId });
            categoryId = newCat.id;
            categoryMap[normalizedCat] = categoryId;
            categoriesCreated++;
          }
        }

        const existing = await Product.findOne({ where: { name, restaurant_id: restaurantId } });
        if (existing) {
          if (duplicateAction === 'update') {
            await existing.update({
              price: price || existing.price,
              category_id: categoryId || existing.category_id,
              category: categoryName?.trim() || existing.category,
              description: getMappedValue(row, 'description') || existing.description,
              sku: getMappedValue(row, 'sku') || existing.sku
            });
            importedIds.push(existing.id);
            success++;
          } else {
            skipped++;
          }
        } else {
          const created = await Product.create({
            name,
            price,
            restaurant_id: restaurantId,
            category_id: categoryId,
            category: categoryName?.trim() || 'Uncategorized',
            description: getMappedValue(row, 'description') || null,
            sku: getMappedValue(row, 'sku') || null,
            status: 'available'
          });
          importedIds.push(created.id);
          success++;
        }
      } catch (err) {
        failed++;
        errors.push(err.message);
      }
    }

    const batchId = `menu-${Date.now().toString(36)}`;
    await ImportHistory.create({
      batch_id: batchId, restaurant_id: restaurantId, user_id: req.user.id,
      import_type: 'menu', file_name: req.file.originalname,
      total_rows: rows.length, success_count: success, skipped_count: skipped, failed_count: failed,
      imported_ids: JSON.stringify(importedIds)
    });

    res.json({ success: true, data: { success, failed, skipped, categoriesCreated, total: rows.length, batchId, errors: errors.slice(0, 10) } });
  } catch (error) {
    console.error('[Import] Menu error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/import/execute-options
 */
router.post('/execute-options', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const restaurantId = req.body.restaurant_id || req.user.restaurant_id;
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurant_id is required' });

    const mapping = JSON.parse(req.body.mapping || '{}');
    const rows = await parseCSV(req.file.buffer);

    // 메뉴 아이템 매핑 로드
    const products = await Product.findAll({ where: { restaurant_id: restaurantId }, attributes: ['id', 'name'] });
    const productMap = {};
    products.forEach(p => { productMap[normalizeColumnName(p.name)] = p.id; });

    let success = 0, failed = 0, skipped = 0;
    const errors = [];
    const groupCache = {}; // productId_groupName → group_id

    const getMappedValue = (row, field) => {
      const key = Object.keys(mapping).find(k => mapping[k] === field);
      return key ? row[key]?.trim() : null;
    };

    for (const row of rows) {
      try {
        const menuItemName = getMappedValue(row, 'menu_item');
        const groupName = getMappedValue(row, 'group_name');
        const optionName = getMappedValue(row, 'option_name');
        const optionPrice = parseFloat(getMappedValue(row, 'option_price')) || 0;

        if (!menuItemName || !groupName || !optionName) {
          failed++; errors.push('Row missing menu_item, group_name, or option_name'); continue;
        }

        const productId = productMap[normalizeColumnName(menuItemName)];
        if (!productId) {
          failed++; errors.push(`Menu item not found: ${menuItemName}`); continue;
        }

        // 옵션 그룹 찾기 또는 생성
        const cacheKey = `${productId}_${normalizeColumnName(groupName)}`;
        let groupId = groupCache[cacheKey];
        if (!groupId) {
          let group = await OptionGroup.findOne({
            where: { name: groupName, restaurant_id: restaurantId }
          });
          if (!group) {
            group = await OptionGroup.create({
              name: groupName,
              restaurant_id: restaurantId,
              is_required: false,
              max_selections: 0
            });
          }
          groupId = group.id;
          groupCache[cacheKey] = groupId;
        }

        // 옵션 생성
        const existingOption = await Option.findOne({
          where: { name: optionName, option_group_id: groupId }
        });
        if (existingOption) {
          skipped++;
        } else {
          await Option.create({
            name: optionName,
            option_group_id: groupId,
            price: optionPrice
          });
          success++;
        }
      } catch (err) {
        failed++;
        errors.push(err.message);
      }
    }

    const batchId = `opt-${Date.now().toString(36)}`;
    await ImportHistory.create({
      batch_id: batchId, restaurant_id: restaurantId, user_id: req.user.id,
      import_type: 'options', file_name: req.file.originalname,
      total_rows: rows.length, success_count: success, skipped_count: skipped, failed_count: failed,
      imported_ids: '[]'
    });

    res.json({ success: true, data: { success, failed, skipped, total: rows.length, batchId, errors: errors.slice(0, 10) } });
  } catch (error) {
    console.error('[Import] Options error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/import/execute-orders
 */
router.post('/execute-orders', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const restaurantId = req.body.restaurant_id || req.user.restaurant_id;
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurant_id is required' });

    const mapping = JSON.parse(req.body.mapping || '{}');
    const format = req.body.format || 'summary'; // 'summary' | 'detail'
    const rows = await parseCSV(req.file.buffer);

    // 메뉴 매핑 로드 (상세 형식용)
    const products = await Product.findAll({ where: { restaurant_id: restaurantId }, attributes: ['id', 'name', 'price'] });
    const productMap = {};
    products.forEach(p => { productMap[normalizeColumnName(p.name)] = p; });

    let success = 0, failed = 0, skipped = 0, matched = 0, unmatched = 0;
    const errors = [];
    const importedIds = [];
    const unmatchedNames = new Set();

    const getMappedValue = (row, field) => {
      const key = Object.keys(mapping).find(k => mapping[k] === field);
      return key ? row[key]?.trim() : null;
    };

    // 주문번호 생성 (유니크: 타임스탬프 + 인덱스)
    const importId = Date.now().toString(36);
    const generateOrderNumber = (index) => {
      return `IMP-${importId}-${String(index).padStart(4,'0')}`;
    };

    if (format === 'summary') {
      // 요약 형식: 1행 = 1주문
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        try {
          const dateStr = getMappedValue(row, 'date');
          const totalAmount = parseFloat(getMappedValue(row, 'total_amount')) || 0;
          if (!dateStr || totalAmount <= 0) { failed++; errors.push(`Row ${i+1}: invalid date or amount`); continue; }

          const orderDate = new Date(dateStr);
          if (isNaN(orderDate.getTime())) { failed++; errors.push(`Row ${i+1}: invalid date format`); continue; }

          const created = await Order.create({
            restaurant_id: restaurantId,
            order_number: generateOrderNumber(i + 1),
            total_amount: totalAmount,
            status: 'completed',
            payment_method: getMappedValue(row, 'payment_method') || 'cash',
            order_type: getMappedValue(row, 'order_type') || 'dine_in',
            source: 'pos',
            createdAt: orderDate,
            updatedAt: orderDate
          });
          importedIds.push(created.id);
          success++;
        } catch (err) {
          failed++;
          errors.push(`Row ${i+1}: ${err.message}`);
        }
      }
    } else {
      // 상세 형식: 여러 행이 1주문일 수 있음. 날짜+시간이 같으면 같은 주문으로 묶음
      const orderGroups = {};
      rows.forEach((row, i) => {
        const dateStr = getMappedValue(row, 'date') || '';
        const key = dateStr; // 같은 날짜/시간 = 같은 주문
        if (!orderGroups[key]) orderGroups[key] = [];
        orderGroups[key].push({ row, index: i });
      });

      let orderIndex = 0;
      for (const [dateStr, items] of Object.entries(orderGroups)) {
        try {
          const orderDate = new Date(dateStr);
          if (isNaN(orderDate.getTime())) { failed += items.length; continue; }

          orderIndex++;
          const orderItems = [];
          let totalAmount = 0;

          for (const { row } of items) {
            const itemName = getMappedValue(row, 'item_name') || 'Unknown Item';
            const qty = parseInt(getMappedValue(row, 'quantity')) || 1;
            const unitPrice = parseFloat(getMappedValue(row, 'unit_price')) || 0;

            const product = productMap[normalizeColumnName(itemName)];
            if (product) {
              matched++;
              orderItems.push({ name: product.name, product_id: product.id, quantity: qty, price: unitPrice || product.price });
            } else {
              unmatched++;
              unmatchedNames.add(itemName);
              orderItems.push({ name: itemName, product_id: null, quantity: qty, price: unitPrice });
            }
            totalAmount += (unitPrice || (product?.price || 0)) * qty;
          }

          const created = await Order.create({
            restaurant_id: restaurantId,
            order_number: generateOrderNumber(orderIndex),
            total_amount: totalAmount,
            order_items: JSON.stringify(orderItems),
            status: 'completed',
            payment_method: getMappedValue(items[0].row, 'payment_method') || 'cash',
            order_type: getMappedValue(items[0].row, 'order_type') || 'dine_in',
            source: 'pos',
            createdAt: orderDate,
            updatedAt: orderDate
          });
          importedIds.push(created.id);
          success++;
        } catch (err) {
          failed++;
          errors.push(err.message);
        }
      }
    }

    const batchId = `ord-${Date.now().toString(36)}`;
    await ImportHistory.create({
      batch_id: batchId, restaurant_id: restaurantId, user_id: req.user.id,
      import_type: 'orders', file_name: req.file.originalname,
      total_rows: rows.length, success_count: success, skipped_count: skipped, failed_count: failed,
      imported_ids: JSON.stringify(importedIds)
    });

    res.json({ success: true, data: { success, failed, matched, unmatched, unmatchedNames: [...unmatchedNames], total: rows.length, format, batchId, errors: errors.slice(0, 10) } });
  } catch (error) {
    console.error('[Import] Orders error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/import/apply-matching
 * Unmatched 아이템을 메뉴와 매칭 (order_items JSON 업데이트)
 */
router.post('/apply-matching', authenticateToken, async (req, res) => {
  try {
    const { batch_id, restaurant_id, matching } = req.body;
    // matching: { "Fried Rice": 42, "Ice Coffee": 15 } — CSV 이름 → product_id

    if (!batch_id || !matching || Object.keys(matching).length === 0) {
      return res.status(400).json({ success: false, message: 'batch_id and matching are required' });
    }

    const history = await ImportHistory.findOne({ where: { batch_id } });
    if (!history) return res.status(404).json({ success: false, message: 'Batch not found' });

    const ids = JSON.parse(history.imported_ids || '[]');
    if (ids.length === 0) return res.json({ success: true, data: { matchedCount: 0 } });

    // 매칭할 product 이름 조회
    const productIds = Object.values(matching).filter(v => v);
    const products = productIds.length > 0
      ? await Product.findAll({ where: { id: { [Op.in]: productIds } }, attributes: ['id', 'name'] })
      : [];
    const productNameMap = {};
    products.forEach(p => { productNameMap[p.id] = p.name; });

    let matchedCount = 0;
    const orders = await Order.findAll({ where: { id: { [Op.in]: ids } } });

    for (const order of orders) {
      let items = typeof order.order_items === 'string' ? JSON.parse(order.order_items || '[]') : (order.order_items || []);
      let updated = false;

      items = items.map(item => {
        if (!item.product_id && matching[item.name]) {
          const pid = matching[item.name];
          updated = true;
          matchedCount++;
          return { ...item, product_id: pid, name: productNameMap[pid] || item.name };
        }
        return item;
      });

      if (updated) {
        await order.update({ order_items: JSON.stringify(items) });
      }
    }

    res.json({ success: true, data: { matchedCount } });
  } catch (error) {
    console.error('[Import] Apply matching error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/import/history
 * Import 히스토리 조회
 */
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const restaurantId = req.query.restaurant_id || req.user.restaurant_id;
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurant_id is required' });

    const history = await ImportHistory.findAll({
      where: { restaurant_id: restaurantId },
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * DELETE /api/import/undo/:batchId
 * 특정 batch로 import된 데이터를 일괄 삭제 (undo)
 */
router.delete('/undo/:batchId', authenticateToken, async (req, res) => {
  try {
    const { batchId } = req.params;
    const history = await ImportHistory.findOne({ where: { batch_id: batchId } });
    if (!history) return res.status(404).json({ success: false, message: 'Import batch not found' });
    if (history.status === 'undone') return res.status(400).json({ success: false, message: 'Already undone' });

    const ids = JSON.parse(history.imported_ids || '[]');
    let deletedCount = 0;

    if (ids.length > 0) {
      const modelMap = {
        categories: Category,
        menu: Product,
        options: null, // 옵션은 ID 추적이 복잡 — 수동 삭제 안내
        orders: Order
      };

      const Model = modelMap[history.import_type];
      if (Model) {
        const result = await Model.destroy({ where: { id: { [Op.in]: ids } } });
        deletedCount = result;
      }
    }

    await history.update({ status: 'undone' });

    res.json({ success: true, data: { deletedCount, batchId } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/import/stats
 * 현재 DB의 카테고리/메뉴/주문 건수 조회
 */
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const restaurantId = req.query.restaurant_id || req.user.restaurant_id;
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurant_id is required' });

    const [categories, menuItems, options, orders] = await Promise.all([
      Category.count({ where: { restaurant_id: restaurantId } }),
      Product.count({ where: { restaurant_id: restaurantId } }),
      OptionGroup.count({ where: { restaurant_id: restaurantId } }),
      Order.count({ where: { restaurant_id: restaurantId } })
    ]);

    res.json({ success: true, data: { categories, menuItems, options, orders } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
