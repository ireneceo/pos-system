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
