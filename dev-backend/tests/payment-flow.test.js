// Payment flow contract tests — confirms invoice paid path + side-effects shape.

const { http, login } = require('./_helpers');
require('../models');
const { Invoice } = require('../models');
const { sequelize } = require('../config/database');

let raToken;

beforeAll(async () => {
  const r = await login('irene-ref1@purplehere.com', 'Test1234!');
  raToken = r.body?.data?.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe('Payment flow — endpoint surface', () => {
  test('POST /api/invoices/:id/payment requires auth', async () => {
    const r = await http('post', '/api/invoices/1/payment').send({ payment_method: 'cash' });
    expect([401, 403]).toContain(r.status);
  });

  test('POST /api/invoices/:id/submit-payment requires auth', async () => {
    const r = await http('post', '/api/invoices/1/submit-payment').send({});
    expect([401, 403]).toContain(r.status);
  });

  test('POST /api/invoices/:id/confirm-payment requires auth', async () => {
    const r = await http('post', '/api/invoices/1/confirm-payment').send({});
    expect([401, 403]).toContain(r.status);
  });

  test('payment on non-existent invoice → 404 (or 403 if scope check first)', async () => {
    const r = await http('post', '/api/invoices/99999999/payment')
      .set('Authorization', `Bearer ${raToken}`)
      .send({ payment_method: 'cash' });
    expect([404, 403]).toContain(r.status);
  });
});

describe('Invoice — schema invariants', () => {
  test('Status enum values are within expected set', async () => {
    const allowed = new Set(['draft', 'pending_payment', 'payment_submitted', 'paid', 'overdue', 'cancelled', 'rejected']);
    const sample = await Invoice.findAll({ attributes: ['status'], limit: 50 });
    sample.forEach(inv => {
      expect(allowed.has(inv.status)).toBe(true);
    });
  });

  test('Paid invoices have paid_at set', async () => {
    const paid = await Invoice.findAll({ where: { status: 'paid' }, attributes: ['id', 'paid_at'], limit: 20 });
    paid.forEach(inv => {
      expect(inv.paid_at).toBeTruthy();
    });
  });
});

describe('P1-1 — invoice total never negative (recomputeInvoiceTotals cap)', () => {
  const { recomputeInvoiceTotals } = require('../utils/invoiceCalculation');

  test('fixed discount > subtotal caps discount at subtotal, total floored at 0', () => {
    const r = recomputeInvoiceTotals(
      { discount_type: 'fixed', discount_value: 500, additional_charges: [] },
      [{ calculated_amount: 100 }]
    );
    expect(r.header.discount_amount).toBe(100);
    expect(r.header.total_amount).toBe(0);
  });

  test('percentage > 100 caps discount at subtotal, total floored at 0', () => {
    const r = recomputeInvoiceTotals(
      { discount_type: 'percentage', discount_value: 150, additional_charges: [] },
      [{ calculated_amount: 80 }]
    );
    expect(r.header.discount_amount).toBe(80);
    expect(r.header.total_amount).toBe(0);
  });

  test('normal discount + charges unchanged (no regression)', () => {
    const r = recomputeInvoiceTotals(
      { discount_type: 'percentage', discount_value: 10, additional_charges: [{ name: 'SST', amount: 6 }] },
      [{ calculated_amount: 100 }]
    );
    expect(r.header.discount_amount).toBe(10);
    expect(r.header.total_amount).toBe(96);
  });
});

describe('P1-2 — webhook amount cross-check (passesAmountCrossCheck)', () => {
  const { passesAmountCrossCheck } = require('../routes/webhooks-payments');
  const mkInv = (total, currency) => ({ invoice_number: 'INV-T', total_amount: total, currency, async update() {} });

  test('exact / within-tolerance / overpayment → allow paid', async () => {
    expect(await passesAmountCrossCheck(mkInv(100, 'MYR'), 100, 'MYR', { gateway: 'stripe', eventId: 'e1' })).toBe(true);
    expect(await passesAmountCrossCheck(mkInv(100, 'MYR'), 99.995, 'MYR', { gateway: 'stripe', eventId: 'e2' })).toBe(true);
    expect(await passesAmountCrossCheck(mkInv(100, 'MYR'), 120, 'MYR', { gateway: 'paypal', eventId: 'e3' })).toBe(true);
  });

  test('clear underpayment → HOLD (do not mark paid)', async () => {
    expect(await passesAmountCrossCheck(mkInv(100, 'MYR'), 90, 'MYR', { gateway: 'stripe', eventId: 'e4' })).toBe(false);
  });

  test('currency mismatch → HOLD', async () => {
    expect(await passesAmountCrossCheck(mkInv(100, 'MYR'), 100, 'USD', { gateway: 'stripe', eventId: 'e5' })).toBe(false);
  });

  test('unreadable amount (null/0) → allow (best-effort, never block legit payments)', async () => {
    expect(await passesAmountCrossCheck(mkInv(100, 'MYR'), null, 'MYR', { gateway: 'stripe', eventId: 'e6' })).toBe(true);
    expect(await passesAmountCrossCheck(mkInv(100, 'MYR'), 0, 'MYR', { gateway: 'stripe', eventId: 'e7' })).toBe(true);
  });
});
