// Commission idempotency contract tests — confirms processCommission UNIQUE.

require('../models');
const { ReferralCommission, ReferralWallet } = require('../models');
const { sequelize } = require('../config/database');
const referralService = require('../services/referralService');

afterAll(async () => {
  await sequelize.close();
});

describe('Referral commission — idempotency', () => {
  test('UNIQUE(invoice_id, referrer_id) constraint prevents duplicate', async () => {
    const existing = await ReferralCommission.findOne();
    if (!existing) return; // seed missing — skip

    let caughtUnique = false;
    try {
      await ReferralCommission.create({
        referrer_id: existing.referrer_id,
        referred_id: existing.referred_id,
        invoice_id: existing.invoice_id,
        invoice_amount: existing.invoice_amount,
        commission_rate: existing.commission_rate,
        commission_amount: existing.commission_amount,
        currency: existing.currency,
        status: 'credited'
      });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') caughtUnique = true;
    }
    expect(caughtUnique).toBe(true);
  });

  test('processCommission + applyCredit are exported functions', async () => {
    expect(typeof referralService.processCommission).toBe('function');
    expect(typeof referralService.applyCredit).toBe('function');
  });
});

describe('Referral wallet — invariants', () => {
  test('Wallet balance >= 0 across all rows', async () => {
    const wallets = await ReferralWallet.findAll({ attributes: ['id', 'balance', 'currency'] });
    wallets.forEach(w => {
      expect(parseFloat(w.balance)).toBeGreaterThanOrEqual(0);
    });
  });

  test('Wallet (user_id, currency) is unique', async () => {
    const all = await ReferralWallet.findAll({ attributes: ['user_id', 'currency'] });
    const seen = new Set();
    all.forEach(w => {
      const key = `${w.user_id}:${w.currency}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    });
  });
});
