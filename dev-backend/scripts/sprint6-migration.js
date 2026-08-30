/**
 * Sprint 6 migration:
 *  - PurchaseOrder.status enum: add 'delivered' between 'shipped' and 'partial_received'
 *  - Create purchase_order_returns table
 * Idempotent.
 */
const { sequelize } = require('../config/database');
const { PurchaseOrderReturn } = require('../models');
// ENUM 은 expand-only — 목록 하드코딩 금지. 2026-08-30 이전 이 파일의 하드코딩이
// migrate-po-status-pending-approval.js 가 넣은 'pending_approval' 을 매 배포마다 지웠다.
const { expandEnum } = require('./lib/enumExpand');

(async () => {
  try {
    // 1. purchase_orders.status — 이 마이그가 담당하는 값은 'delivered' 하나다.
    //    나머지 값은 각자의 마이그가 넣는다. 여기서 목록을 통째로 쓰면 남의 값을 지운다.
    {
      const r = await expandEnum(sequelize, 'purchase_orders', 'status', ['delivered']);
      console.log(r.added.length
        ? `✓ purchase_orders.status enum extended with ${r.added.join(', ')}`
        : '· purchase_orders.status enum already has "delivered"');
    }

    // 1b. invoices.status — 이 마이그가 담당하는 값은 'credit' 하나다 (Sprint 6 Credit Notes).
    {
      const r = await expandEnum(sequelize, 'invoices', 'status', ['credit']);
      console.log(r.added.length
        ? `✓ invoices.status enum extended with ${r.added.join(', ')}`
        : '· invoices.status enum already has "credit"');
    }

    // 2. Create returns table
    if (PurchaseOrderReturn) {
      await PurchaseOrderReturn.sync();
      console.log('✓ purchase_order_returns table synced');
    }

    console.log('✓ Sprint 6 migration done');
    process.exit(0);
  } catch (err) {
    console.error('FATAL', err);
    process.exit(1);
  }
})();
