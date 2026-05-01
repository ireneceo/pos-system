/**
 * Referral System routes — public, partner self-service, and admin (Phase 2).
 *
 * Mount: /api/referrals
 *
 * Public endpoints:
 *   GET  /validate-code?code=PURPLE-XXXX
 *   POST /track-click            (referral_code, source)
 *
 * Authenticated (partner self-service):
 *   GET  /my-code                 — fetch or lazy-generate own referral_code
 *   GET  /dashboard               — KPI tiles + recent commissions
 *   GET  /referrals               — list users referred by me
 *   GET  /commissions             — paginated commission history
 *   GET  /wallet                  — balances per currency
 *   GET  /wallet/transactions     — paginated wallet ledger
 *   POST /payouts                 — request payout
 *   GET  /payouts                 — my payout history
 *   GET  /profile                 — name + phone + bank info
 *   PATCH /profile                — update name/phone/bank info (AutoSaveField)
 *
 * Admin endpoints are added in Phase 2 (separate file scope to keep this
 * router focused on the partner-facing surface).
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');
require('../models'); // ensure associations
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Invoice = require('../models/Invoice');
const ReferralWallet = require('../models/ReferralWallet');
const ReferralCommission = require('../models/ReferralCommission');
const ReferralWalletTransaction = require('../models/ReferralWalletTransaction');
const ReferralPayout = require('../models/ReferralPayout');
const ReferralClick = require('../models/ReferralClick');
const referralService = require('../services/referralService');

// Per-route limits in addition to the global apiLimiter (1000/15min).
// Public, unauth'd endpoints — narrow window so an abusive IP can't inflate
// click stats or probe codes faster than design §5-6 allows.
const validateCodeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many validation requests, please slow down.' }
});
const trackClickLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many click tracks from this IP.' }
});

// ─── helpers ──────────────────────────────────────────────────────────

function getClientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket?.remoteAddress
    || req.ip
    || null;
}

function maskInitial(fullName) {
  if (!fullName) return '';
  const trimmed = String(fullName).trim();
  if (!trimmed) return '';
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase() + '.';
  return parts.map(p => p.slice(0, 1).toUpperCase()).join('.') + '.';
}

// ─── Public: validate referral code ───────────────────────────────────
// Returns { valid, referrer_initial } so the public signup page can confirm
// the code without exposing the referrer's identity.
router.get('/validate-code', validateCodeLimiter, async (req, res) => {
  try {
    const code = String(req.query.code || '').trim().toUpperCase();
    if (!/^PURPLE-[A-Z2-9]{4}$/.test(code)) {
      return res.json({ success: true, data: { valid: false } });
    }
    const referrer = await User.findOne({
      where: { referral_code: code },
      attributes: ['id', 'full_name']
    });
    if (!referrer) {
      return res.json({ success: true, data: { valid: false } });
    }
    return res.json({ success: true, data: {
      valid: true,
      referrer_initial: maskInitial(referrer.full_name)
    }});
  } catch (err) {
    console.error('[GET /validate-code]', err);
    return res.status(500).json({ success: false, message: 'Validation failed' });
  }
});

// ─── Public: track link click ─────────────────────────────────────────
// Same IP × same code within 24h → not double-counted.
router.post('/track-click', trackClickLimiter, async (req, res) => {
  try {
    const code = String(req.body.referral_code || '').trim().toUpperCase();
    if (!/^PURPLE-[A-Z2-9]{4}$/.test(code)) {
      return res.json({ success: true, data: { tracked: false } });
    }
    const ip = getClientIp(req);
    const ua = (req.headers['user-agent'] || '').slice(0, 500);
    const source = (req.body.source || '').toString().slice(0, 50) || null;

    if (ip) {
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const recent = await ReferralClick.findOne({
        where: {
          referral_code: code,
          ip_address: ip,
          createdAt: { [Op.gte]: dayAgo }
        }
      });
      if (recent) {
        return res.json({ success: true, data: { tracked: false, reason: 'duplicate_ip_24h' } });
      }
    }

    await ReferralClick.create({
      referral_code: code,
      ip_address: ip,
      user_agent: ua,
      source,
      converted: false
    });

    return res.json({ success: true, data: { tracked: true } });
  } catch (err) {
    console.error('[POST /track-click]', err);
    return res.status(500).json({ success: false, message: 'Track failed' });
  }
});

// ─── My code (lazy-generate on first access) ─────────────────────────
router.get('/my-code', authenticateToken, async (req, res) => {
  try {
    const code = await referralService.getOrCreateReferralCode(req.user.id);
    res.json({ success: true, data: { referral_code: code } });
  } catch (err) {
    console.error('[GET /my-code]', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── Dashboard — KPI tiles + recent commissions ──────────────────────
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const code = await referralService.getOrCreateReferralCode(userId);

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const [wallets, commissionsTotal, commissionsMtd,
           clicksTotal, clicksMtd,
           signups, signupsMtd, recent] = await Promise.all([
      ReferralWallet.findAll({ where: { user_id: userId } }),
      ReferralCommission.findAll({
        where: { referrer_id: userId, status: 'credited' },
        attributes: [
          'currency',
          [sequelize.fn('SUM', sequelize.col('commission_amount')), 'total']
        ],
        group: ['currency']
      }),
      ReferralCommission.findAll({
        where: {
          referrer_id: userId, status: 'credited',
          createdAt: { [Op.gte]: monthStart }
        },
        attributes: [
          'currency',
          [sequelize.fn('SUM', sequelize.col('commission_amount')), 'total']
        ],
        group: ['currency']
      }),
      ReferralClick.count({ where: { referral_code: code } }),
      ReferralClick.count({ where: { referral_code: code, createdAt: { [Op.gte]: monthStart } } }),
      User.count({ where: { referred_by: userId } }),
      User.count({ where: { referred_by: userId, createdAt: { [Op.gte]: monthStart } } }),
      ReferralCommission.findAll({
        where: { referrer_id: userId, status: 'credited' },
        order: [['createdAt', 'DESC']],
        limit: 5,
        include: [
          { model: User, as: 'referred', attributes: ['id', 'full_name', 'email'] },
          { model: Invoice, as: 'invoice', attributes: ['id', 'invoice_number'] }
        ]
      })
    ]);

    const sumByCurrency = (rows) => {
      const map = {};
      rows.forEach(r => { map[r.currency] = parseFloat(r.get('total')) || 0; });
      return map;
    };

    res.json({ success: true, data: {
      referral_code: code,
      wallets: wallets.map(w => ({
        currency: w.currency,
        balance: parseFloat(w.balance),
        total_earned: parseFloat(w.total_earned),
        total_withdrawn: parseFloat(w.total_withdrawn),
        total_credited: parseFloat(w.total_credited)
      })),
      stats: {
        commissions_total: sumByCurrency(commissionsTotal),
        commissions_mtd: sumByCurrency(commissionsMtd),
        clicks_total: clicksTotal,
        clicks_mtd: clicksMtd,
        signups_total: signups,
        signups_mtd: signupsMtd
      },
      recent_commissions: recent.map(c => ({
        id: c.id,
        created_at: c.createdAt,
        amount: parseFloat(c.commission_amount),
        currency: c.currency,
        invoice_number: c.invoice?.invoice_number,
        referred_name: c.referred?.full_name || c.referred?.email
      }))
    }});
  } catch (err) {
    console.error('[GET /dashboard]', err);
    res.status(500).json({ success: false, message: 'Failed to load dashboard' });
  }
});

// ─── Referrals — list users I referred ───────────────────────────────
router.get('/referrals', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const offset = parseInt(req.query.offset) || 0;

    const { rows, count } = await User.findAndCountAll({
      where: { referred_by: userId },
      attributes: ['id', 'full_name', 'email', 'role', 'createdAt', 'subscription_status'],
      include: [
        {
          model: Restaurant, as: 'adminRestaurants',
          attributes: ['id', 'name', 'status'],
          required: false
        }
      ],
      order: [['createdAt', 'DESC']],
      limit, offset,
      distinct: true
    });

    // Per-referred-user commission totals (one query, grouped)
    const commTotals = await ReferralCommission.findAll({
      where: { referrer_id: userId, status: 'credited' },
      attributes: [
        'referred_id', 'currency',
        [sequelize.fn('SUM', sequelize.col('commission_amount')), 'total']
      ],
      group: ['referred_id', 'currency']
    });
    const totalsMap = {};
    commTotals.forEach(c => {
      const rid = c.referred_id;
      totalsMap[rid] = totalsMap[rid] || {};
      totalsMap[rid][c.currency] = parseFloat(c.get('total')) || 0;
    });

    res.json({ success: true, data: {
      total: count,
      referrals: rows.map(u => {
        const r = u.adminRestaurants?.[0];
        const isActive = (r && r.status === 'active') || u.subscription_status === 'active';
        return {
          id: u.id,
          name: u.full_name || u.email,
          role: u.role,
          business_name: r?.name || null,
          status: isActive ? 'Active' : 'Inactive',
          signed_up_at: u.createdAt,
          commissions: totalsMap[u.id] || {}
        };
      })
    }});
  } catch (err) {
    console.error('[GET /referrals]', err);
    res.status(500).json({ success: false, message: 'Failed to load referrals' });
  }
});

// ─── Commissions — paginated history ────────────────────────────────
router.get('/commissions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const offset = parseInt(req.query.offset) || 0;
    const status = req.query.status || null;

    const where = { referrer_id: userId };
    if (status) where.status = status;

    const { rows, count } = await ReferralCommission.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit, offset,
      include: [
        { model: User, as: 'referred', attributes: ['id', 'full_name', 'email'] },
        { model: Invoice, as: 'invoice', attributes: ['id', 'invoice_number'] }
      ]
    });

    res.json({ success: true, data: {
      total: count,
      commissions: rows.map(c => ({
        id: c.id,
        created_at: c.createdAt,
        currency: c.currency,
        amount: parseFloat(c.commission_amount),
        rate: parseFloat(c.commission_rate),
        invoice_amount: parseFloat(c.invoice_amount),
        invoice_number: c.invoice?.invoice_number,
        referred_name: c.referred?.full_name || c.referred?.email,
        status: c.status,
        cancelled_reason: c.cancelled_reason
      }))
    }});
  } catch (err) {
    console.error('[GET /commissions]', err);
    res.status(500).json({ success: false, message: 'Failed to load commissions' });
  }
});

// ─── Wallet — balances per currency ────────────────────────────────
router.get('/wallet', authenticateToken, async (req, res) => {
  try {
    const wallets = await ReferralWallet.findAll({ where: { user_id: req.user.id } });
    res.json({ success: true, data: wallets.map(w => ({
      currency: w.currency,
      balance: parseFloat(w.balance),
      total_earned: parseFloat(w.total_earned),
      total_withdrawn: parseFloat(w.total_withdrawn),
      total_credited: parseFloat(w.total_credited)
    })) });
  } catch (err) {
    console.error('[GET /wallet]', err);
    res.status(500).json({ success: false, message: 'Failed to load wallet' });
  }
});

// ─── Wallet transactions — paginated ledger ────────────────────────
router.get('/wallet/transactions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const offset = parseInt(req.query.offset) || 0;
    const type = req.query.type || null;
    const currency = req.query.currency || null;

    const walletWhere = { user_id: userId };
    if (currency) walletWhere.currency = currency;
    const wallets = await ReferralWallet.findAll({ where: walletWhere });
    if (wallets.length === 0) return res.json({ success: true, data: { total: 0, transactions: [] } });
    const walletIds = wallets.map(w => w.id);
    const walletCurrency = {};
    wallets.forEach(w => { walletCurrency[w.id] = w.currency; });

    const where = { wallet_id: { [Op.in]: walletIds } };
    if (type) where.type = type;

    const { rows, count } = await ReferralWalletTransaction.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit, offset
    });

    res.json({ success: true, data: {
      total: count,
      transactions: rows.map(t => ({
        id: t.id,
        created_at: t.createdAt,
        type: t.type,
        amount: parseFloat(t.amount),
        balance_after: parseFloat(t.balance_after),
        currency: walletCurrency[t.wallet_id],
        reference_type: t.reference_type,
        reference_id: t.reference_id,
        description: t.description
      }))
    }});
  } catch (err) {
    console.error('[GET /wallet/transactions]', err);
    res.status(500).json({ success: false, message: 'Failed to load transactions' });
  }
});

// ─── Payouts: request + history ────────────────────────────────────
router.post('/payouts', authenticateToken, async (req, res) => {
  try {
    const { currency, amount, bank_name, bank_account_number, bank_account_holder } = req.body;
    if (!currency || !(parseFloat(amount) > 0)) {
      return res.status(400).json({ success: false, message: 'Currency and positive amount are required' });
    }
    if (!bank_name || !bank_account_number || !bank_account_holder) {
      return res.status(400).json({ success: false, message: 'Bank info is incomplete' });
    }

    const payout = await sequelize.transaction(async (t) => {
      return await referralService.requestPayout(
        req.user.id, currency, parseFloat(amount),
        { bank_name, bank_account_number, bank_account_holder },
        { transaction: t }
      );
    });

    res.json({ success: true, data: {
      id: payout.id,
      currency: payout.currency,
      amount: parseFloat(payout.amount),
      status: payout.status,
      created_at: payout.createdAt
    }});
  } catch (err) {
    console.error('[POST /payouts]', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get('/payouts', authenticateToken, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const offset = parseInt(req.query.offset) || 0;
    const { rows, count } = await ReferralPayout.findAndCountAll({
      where: { user_id: req.user.id },
      order: [['createdAt', 'DESC']],
      limit, offset
    });
    res.json({ success: true, data: {
      total: count,
      payouts: rows.map(p => ({
        id: p.id,
        amount: parseFloat(p.amount),
        currency: p.currency,
        status: p.status,
        created_at: p.createdAt,
        reviewed_at: p.reviewed_at,
        paid_at: p.paid_at,
        reject_reason: p.reject_reason,
        bank_name: p.bank_name,
        bank_account_number: p.bank_account_number,
        bank_account_holder: p.bank_account_holder
      }))
    }});
  } catch (err) {
    console.error('[GET /payouts]', err);
    res.status(500).json({ success: false, message: 'Failed to load payouts' });
  }
});

// ─── Profile (RP) — name/phone/bank info ───────────────────────────
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const u = await User.findByPk(req.user.id, {
      attributes: ['id', 'full_name', 'email', 'phone', 'role',
                   'referral_code', 'bank_name', 'bank_account_number', 'bank_account_holder',
                   'restaurant_id', 'brand_id', 'foodcourt_id', 'supplier_company_id',
                   'subscription_status', 'plan_type']
    });
    if (!u) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: {
      id: u.id,
      full_name: u.full_name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      referral_code: u.referral_code,
      bank_name: u.bank_name,
      bank_account_number: u.bank_account_number,
      bank_account_holder: u.bank_account_holder,
      pos_account: {
        is_pos_user: !!(u.restaurant_id || u.brand_id || u.foodcourt_id || u.supplier_company_id || u.role !== 'Referral Partner'),
        role: u.role,
        subscription_status: u.subscription_status,
        plan_type: u.plan_type
      }
    }});
  } catch (err) {
    console.error('[GET /profile]', err);
    res.status(500).json({ success: false, message: 'Failed to load profile' });
  }
});

router.patch('/profile', authenticateToken, async (req, res) => {
  try {
    const allowed = ['full_name', 'phone', 'bank_name', 'bank_account_number', 'bank_account_holder'];
    const update = {};
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        update[key] = req.body[key] === '' ? null : req.body[key];
      }
    }
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ success: false, message: 'Nothing to update' });
    }
    await User.update(update, { where: { id: req.user.id } });
    const fresh = await User.findByPk(req.user.id, {
      attributes: Object.keys(update)
    });
    res.json({ success: true, data: fresh.toJSON() });
  } catch (err) {
    console.error('[PATCH /profile]', err);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

// ═══════════════════════════════════════════════════════════════════
// PHASE 2 — Apply Credit (partner pays own invoice with wallet balance)
// ═══════════════════════════════════════════════════════════════════

/**
 * POST /api/referrals/wallet/apply-credit
 * body: { invoice_id, amount }
 *
 * Partner uses their wallet balance to pay (or partially pay) an invoice they
 * own. The invoice must belong to the partner via their POS account
 * (admin_id on a restaurant they own, or payer_id matching their user.id for
 * BG/FG/Owner self-subscription invoices).
 *
 * Wraps everything in a transaction:
 *   - referralService.applyCredit (locks wallet, debits balance, ledger entry,
 *     bumps invoice.paid_amount)
 *   - if invoice.paid_amount >= total_amount → mark status='paid' + paid_at
 *   - on full payment → handleInvoicePaid runs subscription restore + commission
 *     hooks (called outside the txn since processCommission opens its own txn)
 */
router.post('/wallet/apply-credit', authenticateToken, async (req, res) => {
  const { invoice_id, amount } = req.body || {};
  if (!invoice_id || !(parseFloat(amount) > 0)) {
    return res.status(400).json({ success: false, message: 'invoice_id and positive amount are required' });
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      const inv = await Invoice.findByPk(invoice_id, { transaction: t });
      if (!inv) throw new Error('Invoice not found');

      // Ownership check — payer is either:
      //   (a) the user himself (BG/FG/Owner subscription invoices use payer_id=user.id)
      //   (b) the admin of the invoiced restaurant (Restaurant subscription invoices)
      let canPay = false;
      if (inv.payer_id && inv.payer_id === req.user.id) canPay = true;
      if (!canPay && inv.restaurant_id) {
        const rest = await Restaurant.findByPk(inv.restaurant_id, { transaction: t });
        if (rest && rest.admin_id === req.user.id) canPay = true;
      }
      if (!canPay) {
        const err = new Error('You do not have permission to pay this invoice');
        err.status = 403;
        throw err;
      }

      const applied = await referralService.applyCredit(req.user.id, invoice_id, parseFloat(amount), { transaction: t });

      let fullyPaid = false;
      const fresh = await Invoice.findByPk(invoice_id, { transaction: t });
      if (parseFloat(fresh.paid_amount) >= parseFloat(fresh.total_amount) - 0.01) {
        await fresh.update({ status: 'paid', paid_at: new Date() }, { transaction: t });
        fullyPaid = true;
      }

      return { applied: applied.applied, remaining: applied.remaining, invoice_id, fully_paid: fullyPaid };
    });

    // Run lifecycle hook outside the credit-application transaction so its own
    // commission transaction commits independently.
    if (result.fully_paid) {
      const { handleInvoicePaid } = require('../services/invoiceLifecycle');
      handleInvoicePaid(invoice_id).catch(e =>
        console.error('[apply-credit] handleInvoicePaid:', e.message)
      );
    }

    res.json({ success: true, data: result });
  } catch (err) {
    console.error('[POST /wallet/apply-credit]', err.message);
    const status = err.status || 400;
    res.status(status).json({ success: false, message: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════
// PHASE 2 — System Admin endpoints
// ═══════════════════════════════════════════════════════════════════

const adminGuard = [authenticateToken, requireRole('System Admin')];

// ── Overview ──────────────────────────────────────────────
router.get('/admin/overview', ...adminGuard, async (req, res) => {
  try {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    // Window for time-series — last 12 calendar months including current.
    const seriesStart = new Date(monthStart);
    seriesStart.setMonth(seriesStart.getMonth() - 11);

    const [
      totalPartners, activePartners, partnersMtd,
      totalReferrals, referralsMtd,
      commissionsTotal, commissionsMtd,
      payoutsTotal, payoutsPending, clicksTotal, clicksMtd, topPartners,
      monthlySignupRows, monthlyCommissionRows, paidReferredCount
    ] = await Promise.all([
      User.count({ where: { referral_code: { [Op.ne]: null } } }),
      User.count({ where: { role: 'Referral Partner' } }),
      User.count({ where: { role: 'Referral Partner', createdAt: { [Op.gte]: monthStart } } }),
      User.count({ where: { referred_by: { [Op.ne]: null } } }),
      User.count({ where: { referred_by: { [Op.ne]: null }, createdAt: { [Op.gte]: monthStart } } }),
      ReferralCommission.findAll({
        where: { status: 'credited' },
        attributes: ['currency', [sequelize.fn('SUM', sequelize.col('commission_amount')), 'total']],
        group: ['currency']
      }),
      ReferralCommission.findAll({
        where: { status: 'credited', createdAt: { [Op.gte]: monthStart } },
        attributes: ['currency', [sequelize.fn('SUM', sequelize.col('commission_amount')), 'total']],
        group: ['currency']
      }),
      ReferralPayout.findAll({
        where: { status: 'paid' },
        attributes: ['currency', [sequelize.fn('SUM', sequelize.col('amount')), 'total']],
        group: ['currency']
      }),
      ReferralPayout.count({ where: { status: { [Op.in]: ['requested', 'approved'] } } }),
      ReferralClick.count(),
      ReferralClick.count({ where: { createdAt: { [Op.gte]: monthStart } } }),
      sequelize.query(`
        SELECT u.id, u.full_name, u.email, u.referral_code,
               COALESCE(SUM(c.commission_amount), 0) AS total_earned,
               COUNT(DISTINCT c.referred_id) AS active_referrals
        FROM users u
        LEFT JOIN referral_commissions c
          ON c.referrer_id = u.id AND c.status = 'credited'
        WHERE u.referral_code IS NOT NULL
        GROUP BY u.id, u.full_name, u.email, u.referral_code
        HAVING total_earned > 0
        ORDER BY total_earned DESC
        LIMIT 10
      `, { type: sequelize.QueryTypes.SELECT }),

      // Monthly signups for the last 12 months. We split into:
      //   partners        — users joining via /referral/signup (role='Referral Partner')
      //   referred        — anyone signing up with referred_by set (POS or RP)
      sequelize.query(`
        SELECT DATE_FORMAT(createdAt, '%Y-%m') AS ym,
               SUM(CASE WHEN role = 'Referral Partner' THEN 1 ELSE 0 END) AS partners,
               SUM(CASE WHEN referred_by IS NOT NULL THEN 1 ELSE 0 END) AS referred
        FROM users
        WHERE createdAt >= :since
        GROUP BY ym
        ORDER BY ym ASC
      `, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { since: seriesStart }
      }),

      // Monthly commission credited (last 12 months), grouped by currency.
      sequelize.query(`
        SELECT DATE_FORMAT(createdAt, '%Y-%m') AS ym,
               currency,
               SUM(commission_amount) AS total
        FROM referral_commissions
        WHERE status = 'credited' AND createdAt >= :since
        GROUP BY ym, currency
        ORDER BY ym ASC, currency ASC
      `, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { since: seriesStart }
      }),

      // Funnel step 3 — referred users who actually paid (at least one credited commission).
      ReferralCommission.aggregate('referred_id', 'COUNT', {
        distinct: true,
        where: { status: 'credited' }
      })
    ]);

    const sumByCurrency = (rows) => {
      const out = {};
      rows.forEach(r => { out[r.currency] = parseFloat(r.get ? r.get('total') : r.total) || 0; });
      return out;
    };

    // Densify the 12-month axis so the chart never has gaps. Months without
    // any signup/commission collapse to zeros, otherwise the line chart
    // visually "skips" months which misreads as no activity.
    const months = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(seriesStart);
      d.setMonth(d.getMonth() + i);
      months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    }
    const signupMap = {};
    monthlySignupRows.forEach(r => { signupMap[r.ym] = { partners: parseInt(r.partners, 10) || 0, referred: parseInt(r.referred, 10) || 0 }; });
    const monthly_signups = months.map(ym => ({
      ym,
      partners: signupMap[ym]?.partners || 0,
      referred: signupMap[ym]?.referred || 0
    }));

    const commissionCurrencies = Array.from(new Set(monthlyCommissionRows.map(r => r.currency)));
    const commissionMap = {};
    monthlyCommissionRows.forEach(r => {
      commissionMap[r.ym] = commissionMap[r.ym] || {};
      commissionMap[r.ym][r.currency] = parseFloat(r.total) || 0;
    });
    const monthly_commissions = months.map(ym => {
      const row = { ym };
      commissionCurrencies.forEach(c => { row[c] = commissionMap[ym]?.[c] || 0; });
      return row;
    });

    res.json({ success: true, data: {
      partners: { total: totalPartners, active_partners: activePartners, new_this_month: partnersMtd },
      referrals: { total: totalReferrals, new_this_month: referralsMtd },
      commissions: {
        total: sumByCurrency(commissionsTotal),
        this_month: sumByCurrency(commissionsMtd)
      },
      payouts: {
        total_paid: sumByCurrency(payoutsTotal),
        pending_count: payoutsPending
      },
      clicks: { total: clicksTotal, this_month: clicksMtd },
      // Conversion funnel — clicks attempt → signups with referred_by → those who actually paid.
      conversion_funnel: {
        clicks: clicksTotal,
        signups: totalReferrals,
        paid: parseInt(paidReferredCount || 0, 10)
      },
      monthly_signups,
      monthly_commissions,
      commission_currencies: commissionCurrencies,
      top_partners: topPartners.map(p => ({
        id: p.id, name: p.full_name || p.email, code: p.referral_code,
        total_earned: parseFloat(p.total_earned), active_referrals: parseInt(p.active_referrals, 10)
      }))
    }});
  } catch (err) {
    console.error('[admin/overview]', err);
    res.status(500).json({ success: false, message: 'Failed to load overview' });
  }
});

// ── Partners list ─────────────────────────────────────────
router.get('/admin/partners', ...adminGuard, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const offset = parseInt(req.query.offset) || 0;
    const search = (req.query.search || '').trim();

    const where = { referral_code: { [Op.ne]: null } };
    if (search) {
      where[Op.or] = [
        { full_name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { referral_code: { [Op.like]: `%${search}%` } }
      ];
    }

    const { rows, count } = await User.findAndCountAll({
      where,
      attributes: ['id', 'full_name', 'email', 'role', 'referral_code', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit, offset
    });

    // Aggregate per-partner stats
    const ids = rows.map(r => r.id);
    let earningsMap = {};
    let referralCountMap = {};
    if (ids.length) {
      const earnings = await ReferralCommission.findAll({
        where: { referrer_id: { [Op.in]: ids }, status: 'credited' },
        attributes: ['referrer_id', 'currency', [sequelize.fn('SUM', sequelize.col('commission_amount')), 'total']],
        group: ['referrer_id', 'currency']
      });
      earnings.forEach(e => {
        const r = e.referrer_id; earningsMap[r] = earningsMap[r] || {};
        earningsMap[r][e.currency] = parseFloat(e.get('total')) || 0;
      });
      const refCounts = await User.findAll({
        where: { referred_by: { [Op.in]: ids } },
        attributes: ['referred_by', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
        group: ['referred_by']
      });
      refCounts.forEach(c => { referralCountMap[c.referred_by] = parseInt(c.get('count'), 10); });
    }

    res.json({ success: true, data: {
      total: count,
      partners: rows.map(p => ({
        id: p.id,
        name: p.full_name || p.email,
        email: p.email,
        role: p.role,
        referral_code: p.referral_code,
        joined_at: p.createdAt,
        referral_count: referralCountMap[p.id] || 0,
        total_earned: earningsMap[p.id] || {}
      }))
    }});
  } catch (err) {
    console.error('[admin/partners]', err);
    res.status(500).json({ success: false, message: 'Failed to load partners' });
  }
});

// ── Partner detail ────────────────────────────────────────
router.get('/admin/partners/:id', ...adminGuard, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const partner = await User.findByPk(id, {
      attributes: ['id', 'full_name', 'email', 'phone', 'role', 'referral_code',
                   'bank_name', 'bank_account_number', 'bank_account_holder', 'createdAt']
    });
    if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });

    const [referrals, wallets, commissions, payouts] = await Promise.all([
      User.findAll({
        where: { referred_by: id },
        attributes: ['id', 'full_name', 'email', 'role', 'createdAt', 'subscription_status']
      }),
      ReferralWallet.findAll({ where: { user_id: id } }),
      ReferralCommission.findAll({
        where: { referrer_id: id }, order: [['createdAt', 'DESC']], limit: 100
      }),
      ReferralPayout.findAll({
        where: { user_id: id }, order: [['createdAt', 'DESC']], limit: 100
      })
    ]);

    res.json({ success: true, data: {
      partner: {
        id: partner.id, name: partner.full_name || partner.email, email: partner.email,
        phone: partner.phone, role: partner.role, referral_code: partner.referral_code,
        joined_at: partner.createdAt,
        bank: {
          bank_name: partner.bank_name,
          account_number: partner.bank_account_number,
          account_holder: partner.bank_account_holder
        }
      },
      referrals: referrals.map(r => ({
        id: r.id, name: r.full_name || r.email, role: r.role,
        signed_up_at: r.createdAt, subscription_status: r.subscription_status
      })),
      wallets: wallets.map(w => ({
        currency: w.currency, balance: parseFloat(w.balance),
        total_earned: parseFloat(w.total_earned),
        total_withdrawn: parseFloat(w.total_withdrawn),
        total_credited: parseFloat(w.total_credited)
      })),
      commissions: commissions.map(c => ({
        id: c.id, created_at: c.createdAt, currency: c.currency,
        amount: parseFloat(c.commission_amount), rate: parseFloat(c.commission_rate),
        invoice_id: c.invoice_id, status: c.status
      })),
      payouts: payouts.map(p => ({
        id: p.id, created_at: p.createdAt, amount: parseFloat(p.amount),
        currency: p.currency, status: p.status, paid_at: p.paid_at,
        reject_reason: p.reject_reason
      }))
    }});
  } catch (err) {
    console.error('[admin/partners/:id]', err);
    res.status(500).json({ success: false, message: 'Failed to load partner' });
  }
});

// ── Payout queue ──────────────────────────────────────────
router.get('/admin/payouts', ...adminGuard, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const offset = parseInt(req.query.offset) || 0;
    const status = req.query.status || null;

    const where = {};
    if (status) where.status = status;

    const { rows, count } = await ReferralPayout.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit, offset,
      include: [
        { model: User, as: 'user', attributes: ['id', 'full_name', 'email', 'referral_code'] }
      ]
    });

    res.json({ success: true, data: {
      total: count,
      payouts: rows.map(p => ({
        id: p.id, created_at: p.createdAt,
        amount: parseFloat(p.amount), currency: p.currency,
        status: p.status,
        bank: {
          bank_name: p.bank_name,
          account_number: p.bank_account_number,
          account_holder: p.bank_account_holder
        },
        partner: {
          id: p.user?.id,
          name: p.user?.full_name || p.user?.email,
          email: p.user?.email,
          referral_code: p.user?.referral_code
        },
        reviewed_by: p.reviewed_by, reviewed_at: p.reviewed_at,
        paid_at: p.paid_at, reject_reason: p.reject_reason,
        transaction_reference: p.transaction_reference
      }))
    }});
  } catch (err) {
    console.error('[admin/payouts]', err);
    res.status(500).json({ success: false, message: 'Failed to load payouts' });
  }
});

// ── Payout actions: approve / mark-paid / reject ──────────
// Combined into a single PUT with `action` body field for simpler client wiring.
router.put('/admin/payouts/:id', ...adminGuard, async (req, res) => {
  const { action, reason, transaction_reference } = req.body || {};
  if (!['approve', 'mark_paid', 'reject'].includes(action)) {
    return res.status(400).json({ success: false, message: 'action must be approve | mark_paid | reject' });
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      const payout = await ReferralPayout.findByPk(req.params.id, {
        transaction: t, lock: t.LOCK.UPDATE
      });
      if (!payout) {
        const err = new Error('Payout not found'); err.status = 404; throw err;
      }

      if (action === 'approve') {
        if (payout.status !== 'requested') {
          const err = new Error(`Cannot approve payout in status ${payout.status}`); err.status = 400; throw err;
        }
        await payout.update({
          status: 'approved',
          reviewed_by: req.user.id,
          reviewed_at: new Date()
        }, { transaction: t });
      } else if (action === 'mark_paid') {
        if (!['requested', 'approved'].includes(payout.status)) {
          const err = new Error(`Cannot mark paid in status ${payout.status}`); err.status = 400; throw err;
        }
        await payout.update({
          status: 'paid',
          reviewed_by: payout.reviewed_by || req.user.id,
          reviewed_at: payout.reviewed_at || new Date(),
          paid_at: new Date(),
          transaction_reference: transaction_reference || null
        }, { transaction: t });
      } else if (action === 'reject') {
        // referralService.rejectPayout handles wallet refund + ledger entry + email
        await referralService.rejectPayout(payout.id, reason || null, req.user.id, { transaction: t });
      }

      return await ReferralPayout.findByPk(payout.id, { transaction: t });
    });

    // Email partner on approve / mark_paid (reject email handled inside service)
    if (action === 'approve' || action === 'mark_paid') {
      (async () => {
        try {
          const { sendNotification } = require('../utils/notificationService');
          const { payoutApprovedEmail, payoutPaidEmail } = require('../utils/notificationTemplates');
          const partner = await User.findByPk(result.user_id, { attributes: ['full_name', 'email'] });
          const partnerName = partner?.full_name || partner?.email;
          const mail = action === 'approve'
            ? payoutApprovedEmail({ partnerName, amount: parseFloat(result.amount), currency: result.currency })
            : payoutPaidEmail({
                partnerName, amount: parseFloat(result.amount), currency: result.currency,
                transactionReference: result.transaction_reference
              });
          await sendNotification(result.user_id, 'referral_payout', mail);
        } catch (e) {
          console.error('[admin/payouts] email error:', e.message);
        }
      })();
    }

    res.json({ success: true, data: {
      id: result.id, status: result.status, paid_at: result.paid_at,
      reviewed_at: result.reviewed_at, reject_reason: result.reject_reason
    }});
  } catch (err) {
    console.error('[admin/payouts/:id PUT]', err.message);
    const status = err.status || 500;
    res.status(status).json({ success: false, message: err.message });
  }
});

// ── Settings ──────────────────────────────────────────────
router.get('/admin/settings', ...adminGuard, async (req, res) => {
  try {
    const s = await referralService.getSettings({ fresh: true });
    res.json({ success: true, data: {
      commission_rate: parseFloat(s.commission_rate),
      first_month_discount: parseFloat(s.first_month_discount),
      min_payout_amounts: s.min_payout_amounts,
      program_active: s.program_active
    }});
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/admin/settings', ...adminGuard, async (req, res) => {
  try {
    const { commission_rate, first_month_discount, min_payout_amounts, program_active } = req.body || {};
    const ReferralSettings = require('../models/ReferralSettings');
    const s = await ReferralSettings.findByPk(1);
    if (!s) return res.status(404).json({ success: false, message: 'Settings row missing' });

    const update = {};
    if (commission_rate !== undefined) {
      const v = parseFloat(commission_rate);
      if (!(v >= 0 && v <= 100)) return res.status(400).json({ success: false, message: 'commission_rate must be 0–100' });
      update.commission_rate = v;
    }
    if (first_month_discount !== undefined) {
      const v = parseFloat(first_month_discount);
      if (!(v >= 0 && v <= 100)) return res.status(400).json({ success: false, message: 'first_month_discount must be 0–100' });
      update.first_month_discount = v;
    }
    if (min_payout_amounts !== undefined) {
      if (typeof min_payout_amounts !== 'object' || Array.isArray(min_payout_amounts)) {
        return res.status(400).json({ success: false, message: 'min_payout_amounts must be an object {currency: amount}' });
      }
      // sanitise — number values only
      const cleaned = {};
      for (const [k, v] of Object.entries(min_payout_amounts)) {
        const n = parseFloat(v);
        if (!isNaN(n) && n >= 0) cleaned[k.toUpperCase()] = n;
      }
      update.min_payout_amounts = cleaned;
    }
    if (program_active !== undefined) update.program_active = !!program_active;

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ success: false, message: 'Nothing to update' });
    }
    await s.update(update);
    referralService.invalidateSettingsCache();

    res.json({ success: true, data: {
      commission_rate: parseFloat(s.commission_rate),
      first_month_discount: parseFloat(s.first_month_discount),
      min_payout_amounts: s.min_payout_amounts,
      program_active: s.program_active
    }});
  } catch (err) {
    console.error('[admin/settings PUT]', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
