/**
 * v3.25 — Brand buyer-side seed
 *
 * 대상: with MIN Cafe (restaurant_id=10, brand_id=4) — test_brand_general 의 brand
 *   - Active SupplierContract with Demo Supplier (id=20)
 *   - 3 PurchaseOrders (submitted / confirmed / received)
 *   - 1 Trade Invoice for received PO
 *
 * Idempotent.
 */
const {
  SupplierContract, SupplierProduct, IngredientSellerProduct, Ingredient,
  PurchaseOrder, PurchaseOrderItem, Invoice, InvoiceItem
} = require('../models');
const database = require('../config/database');

const SUPPLIER_COMPANY_ID = 20;
const SUPPLIER_OWNER_USER_ID = 227;
const BUYER_RESTAURANT_ID = 10;          // with MIN Cafe
const BUYER_USER_ID = 6;                  // test_brand_general (brand owner)

(async () => {
  const t = await database.sequelize.transaction();
  try {
    // 1. Active contract
    let contract = await SupplierContract.findOne({
      where: { supplier_company_id: SUPPLIER_COMPANY_ID, entity_type: 'restaurant', entity_id: BUYER_RESTAURANT_ID, status: 'active' },
      transaction: t
    });
    if (!contract) {
      contract = await SupplierContract.create({
        supplier_company_id: SUPPLIER_COMPANY_ID,
        entity_type: 'restaurant', entity_id: BUYER_RESTAURANT_ID,
        status: 'active',
        payment_terms: 'monthly_soa',
        requested_by_user_id: BUYER_USER_ID,
        request_message: 'Brand-level supply agreement',
        requested_at: new Date(Date.now() - 30 * 24 * 3600 * 1000),
        approved_by_user_id: SUPPLIER_OWNER_USER_ID,
        approved_at: new Date(Date.now() - 28 * 24 * 3600 * 1000)
      }, { transaction: t });
      console.log('✓ contract', contract.id);
    } else {
      console.log('= contract', contract.id, '(existing)');
    }

    // 2. Map supplier products to ingredients (best-effort — only if ingredient exists)
    const sps = await SupplierProduct.findAll({ where: { supplier_company_id: SUPPLIER_COMPANY_ID }, transaction: t });
    const productByName = {};
    for (const p of sps) productByName[p.name] = p;

    const ispMap = {};
    for (const m of [
      { name: 'Beef Brisket',  unit_price: 45.00 },
      { name: 'Chicken Thigh', unit_price: 18.00 },
      { name: 'Pork Belly',    unit_price: 35.00 }
    ]) {
      const p = productByName[m.name];
      if (!p) continue;
      const ing = await Ingredient.findOne({ where: { restaurant_id: BUYER_RESTAURANT_ID, name: m.name }, transaction: t });
      if (!ing) continue;
      const [row] = await IngredientSellerProduct.findOrCreate({
        where: { ingredient_id: ing.id, seller_type: 'supplier', seller_entity_id: SUPPLIER_COMPANY_ID, seller_product_id: p.id },
        defaults: {
          ingredient_id: ing.id, seller_type: 'supplier', seller_entity_id: SUPPLIER_COMPANY_ID,
          seller_product_id: p.id, unit_price: m.unit_price, unit_conversion: 1, min_order_quantity: 2, is_active: true
        },
        transaction: t
      });
      ispMap[m.name] = { ispId: row.id, ingredientId: ing.id, productId: p.id, unit_price: m.unit_price };
    }

    // 3. Purchase Orders (3 statuses)
    const poSpecs = [
      { po_number: 'PO-WMC-20260428-001', status: 'submitted', daysAgo: 5, items: [{ name: 'Beef Brisket',  qty: 4, price: 45.00 }] },
      { po_number: 'PO-WMC-20260425-002', status: 'confirmed', daysAgo: 8, items: [{ name: 'Chicken Thigh', qty: 8, price: 18.00 }] },
      { po_number: 'PO-WMC-20260418-003', status: 'received',  daysAgo: 15, items: [{ name: 'Pork Belly',    qty: 5, price: 35.00 }, { name: 'Beef Brisket', qty: 2, price: 45.00 }], createInvoice: true }
    ];

    const createdPOs = [];
    for (const spec of poSpecs) {
      let po = await PurchaseOrder.findOne({ where: { po_number: spec.po_number }, transaction: t });
      if (po) { console.log('= PO', spec.po_number, '(existing)'); createdPOs.push(po); continue; }

      const validItems = spec.items.filter(i => ispMap[i.name]);
      if (validItems.length === 0) {
        // Fallback — create item without ingredient mapping using SupplierProduct directly
        const subtotal = spec.items.reduce((s, it) => s + (it.qty * it.price), 0);
        const submittedAt = new Date(Date.now() - spec.daysAgo * 24 * 3600 * 1000);
        const confirmedAt = ['confirmed', 'received'].includes(spec.status) ? new Date(submittedAt.getTime() + 6 * 3600 * 1000) : null;
        const receivedAt  = spec.status === 'received' ? new Date(submittedAt.getTime() + 48 * 3600 * 1000) : null;

        po = await PurchaseOrder.create({
          po_number: spec.po_number,
          entity_type: 'restaurant', entity_id: BUYER_RESTAURANT_ID,
          seller_type: 'supplier', seller_entity_id: SUPPLIER_COMPANY_ID,
          contract_id: contract.id,
          status: spec.status,
          subtotal, tax_amount: 0, total_amount: subtotal,
          currency: 'MYR',
          created_by_user_id: BUYER_USER_ID,
          submitted_at: submittedAt, confirmed_at: confirmedAt, received_at: receivedAt
        }, { transaction: t });

        for (const it of spec.items) {
          const product = productByName[it.name];
          if (!product) continue;
          await PurchaseOrderItem.create({
            purchase_order_id: po.id,
            ingredient_seller_product_id: null,
            description: it.name,
            quantity_ordered: it.qty,
            quantity_received: spec.status === 'received' ? it.qty : 0,
            unit: 'kg', unit_price: it.price, line_total: it.qty * it.price, unit_conversion: 1
          }, { transaction: t });
        }
        createdPOs.push(po);
        console.log('✓ PO', spec.po_number, spec.status, 'total=' + subtotal, '(no ingredient mapping)');
        continue;
      }

      const subtotal = validItems.reduce((s, it) => s + (it.qty * it.price), 0);
      const submittedAt = new Date(Date.now() - spec.daysAgo * 24 * 3600 * 1000);
      const confirmedAt = ['confirmed', 'received'].includes(spec.status) ? new Date(submittedAt.getTime() + 6 * 3600 * 1000) : null;
      const receivedAt  = spec.status === 'received' ? new Date(submittedAt.getTime() + 48 * 3600 * 1000) : null;

      po = await PurchaseOrder.create({
        po_number: spec.po_number,
        entity_type: 'restaurant', entity_id: BUYER_RESTAURANT_ID,
        seller_type: 'supplier', seller_entity_id: SUPPLIER_COMPANY_ID,
        contract_id: contract.id,
        status: spec.status,
        subtotal, tax_amount: 0, total_amount: subtotal,
        currency: 'MYR',
        created_by_user_id: BUYER_USER_ID,
        submitted_at: submittedAt, confirmed_at: confirmedAt, received_at: receivedAt
      }, { transaction: t });

      for (const it of validItems) {
        const isp = ispMap[it.name];
        await PurchaseOrderItem.create({
          purchase_order_id: po.id,
          ingredient_id: isp.ingredientId,
          ingredient_seller_product_id: isp.ispId,
          description: it.name,
          quantity_ordered: it.qty,
          quantity_received: spec.status === 'received' ? it.qty : 0,
          unit: 'kg', unit_price: it.price, line_total: it.qty * it.price, unit_conversion: 1
        }, { transaction: t });
      }
      createdPOs.push(po);
      console.log('✓ PO', spec.po_number, spec.status, 'total=' + subtotal);
    }

    // 4. Trade invoice for received PO
    const receivedPO = createdPOs.find(po => po.status === 'received');
    if (receivedPO && !receivedPO.trade_invoice_id) {
      const invNumber = `TRD-SUP${SUPPLIER_COMPANY_ID}-WMC-20260418-001`;
      let inv = await Invoice.findOne({ where: { invoice_number: invNumber }, transaction: t });
      if (!inv) {
        const subtotal = parseFloat(receivedPO.total_amount);
        const issuedAt = receivedPO.received_at;
        const dueDate = new Date(issuedAt.getFullYear(), issuedAt.getMonth() + 1, 15);
        inv = await Invoice.create({
          invoice_number: invNumber,
          invoice_category: 'trade',
          issuer_type: 'supplier', issuer_id: SUPPLIER_COMPANY_ID,
          issued_by: SUPPLIER_OWNER_USER_ID,
          payer_type: 'restaurant', payer_id: BUYER_RESTAURANT_ID,
          contract_id: contract.id,
          subtotal, tax_amount: 0, total_amount: subtotal,
          currency: 'MYR', status: 'pending_payment',
          billing_period_start: issuedAt, billing_period_end: issuedAt,
          due_date: dueDate, issue_date: issuedAt
        }, { transaction: t });
        await receivedPO.update({ trade_invoice_id: inv.id }, { transaction: t });
        console.log('✓ trade invoice', invNumber);
      } else {
        console.log('= trade invoice', invNumber, '(existing)');
      }
    }

    await t.commit();
    console.log('\nDone.');
  } catch (e) {
    await t.rollback().catch(() => {});
    console.error('FATAL:', e.message);
    if (e.errors) for (const er of e.errors) console.error('  -', er.message);
    process.exit(1);
  }
  process.exit(0);
})();
