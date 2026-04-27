/**
 * Demo data seed for demo-supplier@purplehere.com
 * - 3 categories, 6 products with stock
 * - Active SupplierContract with Restaurant#38 (MY)
 * - 4 IngredientSellerProduct mappings
 * - 4 PurchaseOrders (submitted / confirmed / shipped / received)
 * - 1 Trade Invoice from received PO
 */
const {
  SupplierProductCategory, SupplierProduct,
  SupplierContract, SupplierCompany,
  IngredientSellerProduct, Ingredient, Restaurant,
  PurchaseOrder, PurchaseOrderItem,
  Invoice, InvoiceItem
} = require('../models');
const { sequelize } = require('../db');

const SUPPLIER_COMPANY_ID = 20;
const SUPPLIER_OWNER_USER_ID = 227;
const RESTAURANT_ID = 38;
const RESTAURANT_OWNER_USER_ID = 23;

(async () => {
  const t = await sequelize.transaction();
  try {
    // 1. Categories
    const catSpecs = [
      { name: 'Vegetables', emoji: '🥬', sort_order: 1 },
      { name: 'Meat', emoji: '🥩', sort_order: 2 },
      { name: 'Pantry', emoji: '🧂', sort_order: 3 }
    ];
    const cats = {};
    for (const c of catSpecs) {
      const [row] = await SupplierProductCategory.findOrCreate({
        where: { supplier_company_id: SUPPLIER_COMPANY_ID, name: c.name },
        defaults: { ...c, supplier_company_id: SUPPLIER_COMPANY_ID, is_active: true },
        transaction: t
      });
      cats[c.name] = row.id;
    }
    console.log('1) Categories:', Object.keys(cats).map(k => `${k}#${cats[k]}`).join(', '));

    // 2. Products
    const prodSpecs = [
      { name: 'Premium Tomato',  cat: 'Vegetables', sku: 'VEG-TOM-001', unit: 'kg', unit_price: 8.00,  base_quantity: 1, min_order_quantity: 5, current_stock: 120, low_stock_threshold: 20, lead_time_days: 1, emoji: '🍅' },
      { name: 'Yellow Onion',    cat: 'Vegetables', sku: 'VEG-ONI-001', unit: 'kg', unit_price: 6.00,  base_quantity: 1, min_order_quantity: 5, current_stock: 80,  low_stock_threshold: 15, lead_time_days: 1, emoji: '🧅' },
      { name: 'Beef Brisket',    cat: 'Meat',       sku: 'MEAT-BEEF-001', unit: 'kg', unit_price: 45.00, base_quantity: 1, min_order_quantity: 2, current_stock: 45, low_stock_threshold: 10, lead_time_days: 2, emoji: '🥩' },
      { name: 'Chicken Thigh',   cat: 'Meat',       sku: 'MEAT-CHK-001', unit: 'kg', unit_price: 18.00, base_quantity: 1, min_order_quantity: 5, current_stock: 60, low_stock_threshold: 15, lead_time_days: 1, emoji: '🍗' },
      { name: 'Pork Belly',      cat: 'Meat',       sku: 'MEAT-PORK-001', unit: 'kg', unit_price: 35.00, base_quantity: 1, min_order_quantity: 3, current_stock: 8,  low_stock_threshold: 12, lead_time_days: 2, emoji: '🥓' },
      { name: 'Sea Salt',        cat: 'Pantry',     sku: 'PAN-SALT-001', unit: 'kg', unit_price: 12.00, base_quantity: 1, min_order_quantity: 1, current_stock: 30, low_stock_threshold: 5,  lead_time_days: 3, emoji: '🧂' }
    ];
    const prods = {};
    for (const p of prodSpecs) {
      const [row] = await SupplierProduct.findOrCreate({
        where: { supplier_company_id: SUPPLIER_COMPANY_ID, sku: p.sku },
        defaults: {
          supplier_company_id: SUPPLIER_COMPANY_ID,
          category_id: cats[p.cat],
          name: p.name, sku: p.sku, unit: p.unit, base_quantity: p.base_quantity,
          unit_price: p.unit_price, min_order_quantity: p.min_order_quantity,
          current_stock: p.current_stock, low_stock_threshold: p.low_stock_threshold,
          lead_time_days: p.lead_time_days, emoji: p.emoji, is_active: true
        },
        transaction: t
      });
      prods[p.name] = row.id;
    }
    console.log('2) Products:', Object.keys(prods).map(k => `${k}#${prods[k]}`).join(', '));

    // 3. Active contract Restaurant#38 ↔ Supplier#20
    let contract = await SupplierContract.findOne({
      where: { supplier_company_id: SUPPLIER_COMPANY_ID, entity_type: 'restaurant', entity_id: RESTAURANT_ID, status: 'active' },
      transaction: t
    });
    if (!contract) {
      contract = await SupplierContract.create({
        supplier_company_id: SUPPLIER_COMPANY_ID,
        entity_type: 'restaurant', entity_id: RESTAURANT_ID,
        status: 'active',
        payment_terms: 'monthly_soa',
        requested_by_user_id: RESTAURANT_OWNER_USER_ID,
        request_message: 'Initial demo contract',
        requested_at: new Date(Date.now() - 30 * 24 * 3600 * 1000),
        approved_by_user_id: SUPPLIER_OWNER_USER_ID,
        approved_at: new Date(Date.now() - 28 * 24 * 3600 * 1000)
      }, { transaction: t });
    }
    console.log('3) Contract#' + contract.id + ' status=' + contract.status + ' terms=' + contract.payment_terms);

    // 4. IngredientSellerProduct mapping (Restaurant#38 ingredients ↔ Supplier products)
    const ingMap = [
      { ingredientName: 'Beef Brisket',   productName: 'Beef Brisket',   unit_price: 45.00, unit_conversion: 1 },
      { ingredientName: 'Chicken Thigh',  productName: 'Chicken Thigh',  unit_price: 18.00, unit_conversion: 1 },
      { ingredientName: 'Pork Belly',     productName: 'Pork Belly',     unit_price: 35.00, unit_conversion: 1 }
    ];
    const ispMap = {};
    for (const m of ingMap) {
      const ing = await Ingredient.findOne({ where: { restaurant_id: RESTAURANT_ID, name: m.ingredientName }, transaction: t });
      if (!ing) { console.log('  skip (ingredient not found):', m.ingredientName); continue; }
      const [row] = await IngredientSellerProduct.findOrCreate({
        where: {
          ingredient_id: ing.id,
          seller_type: 'supplier', seller_entity_id: SUPPLIER_COMPANY_ID,
          seller_product_id: prods[m.productName]
        },
        defaults: {
          ingredient_id: ing.id,
          seller_type: 'supplier', seller_entity_id: SUPPLIER_COMPANY_ID,
          seller_product_id: prods[m.productName],
          unit_price: m.unit_price, unit_conversion: m.unit_conversion,
          min_order_quantity: 2, lead_time_days: 1, is_preferred: true, is_active: true
        },
        transaction: t
      });
      ispMap[m.ingredientName] = { ispId: row.id, ingredientId: ing.id, productId: prods[m.productName], unit_price: m.unit_price };
    }
    console.log('4) IngredientSellerProduct rows:', Object.keys(ispMap).length);

    // 5. Purchase Orders — different statuses
    const poSpecs = [
      {
        po_number: 'PO-DEMO-20260420-001', status: 'submitted', daysAgo: 7,
        items: [{ key: 'Beef Brisket', qty: 5,  price: 45.00 }]
      },
      {
        po_number: 'PO-DEMO-20260423-002', status: 'confirmed', daysAgo: 4,
        items: [{ key: 'Chicken Thigh', qty: 10, price: 18.00 }]
      },
      {
        po_number: 'PO-DEMO-20260425-003', status: 'shipped', daysAgo: 2,
        items: [{ key: 'Pork Belly', qty: 3,  price: 35.00 }]
      },
      {
        po_number: 'PO-DEMO-20260415-004', status: 'received', daysAgo: 12,
        items: [{ key: 'Beef Brisket', qty: 5, price: 45.00 }, { key: 'Chicken Thigh', qty: 10, price: 18.00 }],
        createInvoice: true
      }
    ];

    const createdPOs = [];
    for (const spec of poSpecs) {
      let po = await PurchaseOrder.findOne({ where: { po_number: spec.po_number }, transaction: t });
      if (po) { console.log('  PO existing:', spec.po_number); createdPOs.push(po); continue; }

      const subtotal = spec.items.reduce((s, it) => s + (it.qty * it.price), 0);
      const submittedAt = new Date(Date.now() - spec.daysAgo * 24 * 3600 * 1000);
      const confirmedAt = ['confirmed', 'shipped', 'received'].includes(spec.status) ? new Date(submittedAt.getTime() + 6 * 3600 * 1000) : null;
      const shippedAt   = ['shipped', 'received'].includes(spec.status) ? new Date(submittedAt.getTime() + 24 * 3600 * 1000) : null;
      const receivedAt  = spec.status === 'received' ? new Date(submittedAt.getTime() + 48 * 3600 * 1000) : null;

      po = await PurchaseOrder.create({
        po_number: spec.po_number,
        entity_type: 'restaurant', entity_id: RESTAURANT_ID,
        seller_type: 'supplier', seller_entity_id: SUPPLIER_COMPANY_ID,
        contract_id: contract.id,
        status: spec.status,
        subtotal, tax_amount: 0, total_amount: subtotal,
        currency: 'MYR',
        created_by_user_id: RESTAURANT_OWNER_USER_ID,
        submitted_at: submittedAt, confirmed_at: confirmedAt,
        shipped_at: shippedAt, received_at: receivedAt
      }, { transaction: t });

      for (const it of spec.items) {
        const isp = ispMap[it.key];
        await PurchaseOrderItem.create({
          purchase_order_id: po.id,
          ingredient_id: isp.ingredientId,
          ingredient_seller_product_id: isp.ispId,
          description: it.key,
          quantity_ordered: it.qty, quantity_received: spec.status === 'received' ? it.qty : 0,
          unit: 'kg', unit_price: it.price, line_total: it.qty * it.price, unit_conversion: 1
        }, { transaction: t });
      }
      createdPOs.push(po);
      console.log('  PO created:', spec.po_number, spec.status, 'total=' + subtotal);
    }

    // 6. Trade Invoice for received PO
    const receivedPO = createdPOs.find(po => po.status === 'received');
    if (receivedPO && !receivedPO.trade_invoice_id) {
      const invNumber = `TRD-SUP${SUPPLIER_COMPANY_ID}-20260415-001`;
      let inv = await Invoice.findOne({ where: { invoice_number: invNumber }, transaction: t });
      if (!inv) {
        const subtotal = parseFloat(receivedPO.total_amount);
        const issuedAt = receivedPO.received_at;
        // Monthly SOA: due_date = 15th of next month
        const dueDate = new Date(issuedAt.getFullYear(), issuedAt.getMonth() + 1, 15);

        inv = await Invoice.create({
          invoice_number: invNumber,
          invoice_category: 'trade',
          issuer_type: 'supplier', issuer_id: SUPPLIER_COMPANY_ID,
          issued_by: SUPPLIER_OWNER_USER_ID,
          payer_type: 'restaurant', payer_id: RESTAURANT_ID,
          contract_id: contract.id,
          subtotal, tax_amount: 0, total_amount: subtotal,
          currency: 'MYR',
          status: 'pending_payment',
          billing_period_start: issuedAt, billing_period_end: issuedAt,
          due_date: dueDate, issued_at: issuedAt
        }, { transaction: t });

        // Items
        const items = await PurchaseOrderItem.findAll({ where: { purchase_order_id: receivedPO.id }, transaction: t });
        for (const it of items) {
          const lineTotal = parseFloat(it.line_total);
          await InvoiceItem.create({
            invoice_id: inv.id,
            item_type: 'product',
            description: it.description,
            quantity: it.quantity_ordered,
            unit_price: it.unit_price,
            calculation_method: 'fixed',
            fixed_amount: lineTotal,
            calculated_amount: lineTotal,
            total_amount: lineTotal
          }, { transaction: t });
        }
        await receivedPO.update({ trade_invoice_id: inv.id }, { transaction: t });
        console.log('5) Trade Invoice created:', invNumber, 'total=' + subtotal, 'due=' + dueDate.toISOString().slice(0, 10));
      } else {
        console.log('5) Trade Invoice existing:', invNumber);
      }
    }

    await t.commit();
    console.log('\n✓ Demo data seed COMPLETE');
    process.exit(0);
  } catch (e) {
    await t.rollback();
    console.error('Error:', e.message);
    if (e.errors) e.errors.forEach(err => console.error(' -', err.path, err.message));
    process.exit(1);
  }
})();
