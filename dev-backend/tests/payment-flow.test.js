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

  // 2026-09-24: 옛 결제 기록 경로는 무권한 뒷문이라 폐기(410) — 로그인해도, 청구서가 있든 없든 410.
  test('removed POST /api/invoices/:id/payment → 410 even when logged in', async () => {
    const r = await http('post', '/api/invoices/99999999/payment')
      .set('Authorization', `Bearer ${raToken}`)
      .send({ payment_method: 'cash' });
    expect(r.status).toBe(410);
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

// 2026-10-11 Fable 판정 F1·F3·F4 — 청구서 게이트웨이 결제 규칙 한 곳
describe('invoicePayable — 결제 가능 상태 목록', () => {
  const { PAYABLE_STATUSES, GATEWAY_PAID_FROM } = require('../utils/invoicePayable');
  test('연체 포함 · 죽은 값(rejected/sent) 없음', () => {
    expect(PAYABLE_STATUSES).toEqual(['pending_payment', 'overdue']);
    expect(GATEWAY_PAID_FROM).toEqual(['pending_payment', 'overdue', 'payment_submitted']);
    for (const dead of ['rejected', 'sent', 'draft', 'cancelled', 'credit', 'paid']) expect(PAYABLE_STATUSES).not.toContain(dead);
  });
});

describe('sameIssuerAccount — 웹훅 서명 계정 = 청구서 발행자 계정', () => {
  const { sameIssuerAccount } = require('../utils/issuerAccount');
  const { Brand } = require('../models');
  afterEach(() => jest.restoreAllMocks());
  test('system ↔ system_admin 일치 · 종류가 다르면 불일치', async () => {
    expect(await sameIssuerAccount({ type: 'system', id: null }, { issuer_type: 'system_admin', issuer_id: null })).toBe(true);
    expect(await sameIssuerAccount({ type: 'brand', id: 10 }, { issuer_type: 'system_admin', issuer_id: null })).toBe(false);
    expect(await sameIssuerAccount({ type: 'system', id: null }, { issuer_type: 'brand', issuer_id: 10 })).toBe(false);
  });
  test('같은 주인 형제 브랜드 일치 · 다른 주인/주인 없음 불일치', async () => {
    const spy = jest.spyOn(Brand, 'findAll');
    spy.mockResolvedValueOnce([{ id: 10, owner_id: 5 }, { id: 17, owner_id: 5 }]);
    expect(await sameIssuerAccount({ type: 'brand', id: 17 }, { issuer_type: 'brand', issuer_id: 10 })).toBe(true);
    spy.mockResolvedValueOnce([{ id: 10, owner_id: 5 }, { id: 11, owner_id: 6 }]);
    expect(await sameIssuerAccount({ type: 'brand', id: 11 }, { issuer_type: 'brand', issuer_id: 10 })).toBe(false);
    spy.mockResolvedValueOnce([{ id: 10, owner_id: null }, { id: 11, owner_id: null }]);
    expect(await sameIssuerAccount({ type: 'brand', id: 11 }, { issuer_type: 'brand', issuer_id: 10 })).toBe(false);
  });
});

describe('markInvoicePaidFromGateway — paid 전환 규칙', () => {
  const { markInvoicePaidFromGateway } = require('../services/invoiceLifecycle');
  const mk = (status, extra = {}) => {
    const inv = { id: 1, invoice_number: 'INV-T', status, total_amount: 100, currency: 'MYR', issuer_type: 'system_admin', issuer_id: null, updates: [], ...extra };
    inv.update = async (v) => { inv.updates.push(v); };
    return inv;
  };
  const ctx = { gateway: 'stripe', gatewayAmount: 100, gatewayCurrency: 'myr', paymentIntentId: 'pi_t', eventId: 'evt_t', verifiedIssuer: { type: 'system', id: null } };
  test('이미 paid → 건너뜀(쓰기 0)', async () => {
    const inv = mk('paid');
    expect(await markInvoicePaidFromGateway(inv, ctx)).toBe('skipped_already_paid');
    expect(inv.updates).toHaveLength(0);
  });
  test('취소·초안·크레딧 → Held, 상태 무변경', async () => {
    for (const st of ['cancelled', 'draft', 'credit']) {
      const inv = mk(st);
      expect(await markInvoicePaidFromGateway(inv, ctx)).toBe('held_status');
      expect(inv.updates.some(u => u.status)).toBe(false);
    }
  });
  test('다른 발행자 계정의 웹훅 → Held', async () => {
    const inv = mk('pending_payment');
    expect(await markInvoicePaidFromGateway(inv, { ...ctx, verifiedIssuer: { type: 'supplier', id: 3 } })).toBe('held_issuer');
    expect(inv.updates.some(u => u.status)).toBe(false);
  });
});
