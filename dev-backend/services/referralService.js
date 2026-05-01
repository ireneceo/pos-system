/**
 * Referral System service.
 *
 * Public surface (Phase 1A — service core):
 *   generateReferralCode()                   → random PURPLE-XXXX string
 *   getOrCreateReferralCode(userId, opts)    → ensure user has a referral_code, return it
 *   getOrCreateWallet(userId, currency, opts) → row-locked wallet for (user, currency)
 *   getSettings()                            → singleton ReferralSettings row (cached short-lived)
 *   resolvePayerUser(invoice, opts)          → User row representing the actual payer of an invoice
 *                                              (handles payer_type: brand_manager / foodcourt_manager /
 *                                               restaurant; falls back to restaurant.admin_id)
 *   processCommission(invoice, opts)         → idempotent: credit referrer's wallet for this paid invoice
 *   applyCredit(userId, invoiceId, amount, opts) → consume wallet balance to pay an invoice (Phase 2 wires it)
 *   requestPayout(userId, currency, amount, bank, opts) → create a payout request (debits wallet immediately)
 *
 * Concurrency / idempotency notes:
 *   - All wallet mutations require an explicit `transaction` so callers can compose them with the
 *     enclosing payment / cancel transaction. Wallet rows are locked with FOR UPDATE.
 *   - processCommission is idempotent via UNIQUE(invoice_id, referrer_id) on referral_commissions.
 *     A duplicate insert is swallowed silently (returns the existing commission).
 *   - SOA child invoices (parent_soa_invoice_id IS NOT NULL) are explicitly skipped — only top-level
 *     POS subscription invoices issued by system_admin generate commission.
 *   - Self-referral is blocked at signup time, so referrer_id !== referred_id is an invariant here.
 */

const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('../models/User');
const Invoice = require('../models/Invoice');
const Restaurant = require('../models/Restaurant');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const ReferralWallet = require('../models/ReferralWallet');
const ReferralCommission = require('../models/ReferralCommission');
const ReferralWalletTransaction = require('../models/ReferralWalletTransaction');
const ReferralPayout = require('../models/ReferralPayout');
const ReferralSettings = require('../models/ReferralSettings');

// PURPLE-XXXX — 4-char random suffix, ambiguous chars excluded
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // 31 chars
const CODE_LENGTH = 4;
const CODE_PREFIX = 'PURPLE-';
const CODE_MAX_RETRIES = 6;

function randomCodeSuffix() {
  let out = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    out += CODE_ALPHABET.charAt(Math.floor(Math.random() * CODE_ALPHABET.length));
  }
  return out;
}

function generateReferralCode() {
  return CODE_PREFIX + randomCodeSuffix();
}

async function getOrCreateReferralCode(userId, opts = {}) {
  const transaction = opts.transaction;
  const user = await User.findByPk(userId, { transaction });
  if (!user) throw new Error(`User ${userId} not found`);
  if (user.referral_code) return user.referral_code;
  for (let attempt = 0; attempt < CODE_MAX_RETRIES; attempt++) {
    const candidate = generateReferralCode();
    try {
      await user.update({ referral_code: candidate }, { transaction });
      return candidate;
    } catch (err) {
      const isUnique = err && (err.name === 'SequelizeUniqueConstraintError' || /Duplicate/i.test(err.message || ''));
      if (!isUnique) throw err;
      // collision — retry
    }
  }
  throw new Error(`Failed to allocate unique referral_code after ${CODE_MAX_RETRIES} attempts`);
}

let _settingsCache = null;
let _settingsCacheAt = 0;
const SETTINGS_TTL_MS = 30 * 1000; // 30s — admin tweaks settle within seconds

async function getSettings(opts = {}) {
  if (opts.fresh !== true && _settingsCache && Date.now() - _settingsCacheAt < SETTINGS_TTL_MS) {
    return _settingsCache;
  }
  let row = await ReferralSettings.findByPk(1);
  if (!row) {
    row = await ReferralSettings.create({
      id: 1,
      commission_rate: 15.0,
      first_month_discount: 20.0,
      min_payout_amounts: { MYR: 50, USD: 20, KRW: 50000, SGD: 30 },
      program_active: true
    });
  }
  _settingsCache = row;
  _settingsCacheAt = Date.now();
  return row;
}

function invalidateSettingsCache() {
  _settingsCache = null;
  _settingsCacheAt = 0;
}

async function getOrCreateWallet(userId, currency, opts = {}) {
  if (!userId || !currency) throw new Error('getOrCreateWallet requires userId and currency');
  const transaction = opts.transaction || null;
  const lockOpt = transaction ? { transaction, lock: transaction.LOCK.UPDATE } : {};
  let wallet = await ReferralWallet.findOne({
    where: { user_id: userId, currency },
    ...lockOpt
  });
  if (wallet) return wallet;
  // Create — UNIQUE(user_id, currency) protects against race
  try {
    wallet = await ReferralWallet.create({
      user_id: userId,
      currency,
      balance: 0,
      total_earned: 0,
      total_withdrawn: 0,
      total_credited: 0
    }, transaction ? { transaction } : {});
    if (transaction) {
      // Re-fetch with lock so caller can mutate safely
      wallet = await ReferralWallet.findByPk(wallet.id, { transaction, lock: transaction.LOCK.UPDATE });
    }
    return wallet;
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return await ReferralWallet.findOne({
        where: { user_id: userId, currency },
        ...lockOpt
      });
    }
    throw err;
  }
}

/**
 * Resolve which User row is the *payer* of the given invoice. Used to look up
 * referred_by. Handles all known invoice shapes:
 *
 *   payer_type='brand_manager'    → payer_id is the brand owner user.id
 *   payer_type='foodcourt_manager'→ payer_id is the foodcourt owner user.id
 *   payer_type='restaurant'       → payer_id is the restaurant.id (legacy);
 *                                   resolve via restaurant.admin_id → user
 *   payer_type='owner'            → payer_id is the user.id of the Owner
 *   else / null                   → fall back to restaurant.admin_id
 */
async function resolvePayerUser(invoice, opts = {}) {
  const transaction = opts.transaction;
  if (!invoice) return null;
  const ptype = invoice.payer_type || null;
  const pid = invoice.payer_id || null;

  if ((ptype === 'brand_manager' || ptype === 'foodcourt_manager' || ptype === 'owner') && pid) {
    return await User.findByPk(pid, { transaction });
  }
  // restaurant — payer_id usually points at the restaurant.id, not user.id.
  // Resolve via restaurant.admin_id.
  if (invoice.restaurant_id) {
    const r = await Restaurant.findByPk(invoice.restaurant_id, { transaction });
    if (r && r.admin_id) {
      const u = await User.findByPk(r.admin_id, { transaction });
      if (u) return u;
    }
  }
  // Last resort — payer_id may already be a user
  if (pid) {
    const u = await User.findByPk(pid, { transaction });
    if (u) return u;
  }
  return null;
}

/**
 * Idempotent commission processing for a single paid invoice.
 *
 * Skips when:
 *   - invoice is missing / not paid
 *   - issuer_type !== 'system_admin'  (only POS plan revenue is shared)
 *   - invoice_category !== 'subscription'
 *   - parent_soa_invoice_id IS NOT NULL (SOA child — already accounted for at parent level by design)
 *   - referrals program is disabled in settings
 *   - payer has no referred_by
 *   - commission for (invoice_id, referrer_id) already exists
 *
 * Returns the ReferralCommission row (existing or newly created) or null when skipped.
 *
 * MUST be called inside a transaction so wallet update + commission insert + ledger insert
 * are atomic with respect to the payment that triggered them.
 */
async function processCommission(invoice, opts = {}) {
  const transaction = opts.transaction;
  if (!invoice) return null;
  if (invoice.status !== 'paid') return null;
  if (invoice.issuer_type !== 'system_admin') return null;
  if (invoice.invoice_category !== 'subscription') return null;
  if (invoice.parent_soa_invoice_id) return null; // SOA child guard

  const settings = await getSettings();
  if (!settings.program_active) return null;

  const payer = await resolvePayerUser(invoice, { transaction });
  if (!payer || !payer.referred_by) return null;

  const referrer = await User.findByPk(payer.referred_by, { transaction });
  if (!referrer) return null;
  if (referrer.id === payer.id) return null; // defensive — self-referral cannot pay itself

  // Idempotency — pre-check by UNIQUE(invoice_id, referrer_id)
  const existing = await ReferralCommission.findOne({
    where: { invoice_id: invoice.id, referrer_id: referrer.id },
    transaction
  });
  if (existing) return existing;

  const rate = parseFloat(settings.commission_rate); // % e.g. 15.00
  // Commission base = invoice.paid_amount (full payment, including service charges
  // and taxes carried in additional_charges). Trade-off: aligns commission with
  // what the customer actually paid (transparent for both sides), but can drift
  // from the design-doc 1-2 illustration where commission is computed against
  // the post-discount plan-base (excluding charges). If the program needs to
  // pivot to plan-base, switch this to invoice.subtotal (post-discount,
  // pre-charges) — finalizeInvoice already keeps subtotal in that shape.
  const paidAmount = parseFloat(invoice.paid_amount || invoice.total_amount || 0);
  if (!(paidAmount > 0)) return null;
  const commissionAmount = Math.round(paidAmount * rate) / 100;
  const currency = invoice.currency || 'MYR';

  // Wallet — get/create with lock
  const wallet = await getOrCreateWallet(referrer.id, currency, { transaction });
  const newBalance = parseFloat(wallet.balance) + commissionAmount;
  const newTotalEarned = parseFloat(wallet.total_earned) + commissionAmount;

  await wallet.update({ balance: newBalance, total_earned: newTotalEarned }, { transaction });

  let commission;
  try {
    commission = await ReferralCommission.create({
      referrer_id: referrer.id,
      referred_id: payer.id,
      invoice_id: invoice.id,
      invoice_amount: paidAmount,
      commission_rate: rate,
      commission_amount: commissionAmount,
      currency,
      status: 'credited'
    }, { transaction });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      // Lost a race — undo the wallet bump we just did
      await wallet.update({
        balance: parseFloat(wallet.balance),       // already updated above; revert
        total_earned: parseFloat(wallet.total_earned)
      }, { transaction });
      // Refetch original
      return await ReferralCommission.findOne({
        where: { invoice_id: invoice.id, referrer_id: referrer.id },
        transaction
      });
    }
    throw err;
  }

  await ReferralWalletTransaction.create({
    wallet_id: wallet.id,
    type: 'commission',
    amount: commissionAmount,
    balance_after: newBalance,
    reference_type: 'commission',
    reference_id: commission.id,
    description: `Commission from invoice ${invoice.invoice_number || invoice.id}`
  }, { transaction });

  // Email referrer (fire-and-forget — never block payment processing)
  (async () => {
    try {
      const { sendNotification } = require('../utils/notificationService');
      const { commissionCreditedEmail } = require('../utils/notificationTemplates');
      // Best-effort lookup of referred business name (restaurant or user full_name)
      let businessName = payer.full_name || payer.email;
      if (invoice.restaurant_id) {
        const r = await Restaurant.findByPk(invoice.restaurant_id, { attributes: ['name'] });
        if (r?.name) businessName = r.name;
      }
      const mail = commissionCreditedEmail({
        referrerName: referrer.full_name || referrer.email,
        referredBusiness: businessName,
        amount: commissionAmount,
        currency,
        invoiceNumber: invoice.invoice_number
      });
      await sendNotification(referrer.id, 'referral_commission', mail);
    } catch (e) {
      console.error('[processCommission] commission email error:', e.message);
    }
  })();

  return commission;
}

/**
 * Cancel every credited commission tied to a single invoice. Idempotent — invoices
 * with no credited commissions return []. Used by handleInvoiceCancelled when
 * an invoice transitions out of 'paid' (refund, status reset, deletion).
 *
 * UNIQUE(invoice_id, referrer_id) means in practice this is at most one row,
 * but findAll keeps us safe if that constraint ever loosens.
 */
async function cancelCommissionsForInvoice(invoiceId, reason, opts = {}) {
  const transaction = opts.transaction;
  if (!invoiceId) return [];
  const credited = await ReferralCommission.findAll({
    where: { invoice_id: invoiceId, status: 'credited' },
    transaction
  });
  const out = [];
  for (const row of credited) {
    const cancelled = await cancelCommission(row.id, reason, { transaction });
    if (cancelled) out.push(cancelled);
  }
  return out;
}

/**
 * Cancel a previously credited commission (e.g. when the underlying invoice is
 * cancelled or refunded). Idempotent — already-cancelled commissions are returned as-is.
 *
 * Reverses the wallet bump done by processCommission and writes an adjustment ledger entry.
 */
async function cancelCommission(commissionId, reason, opts = {}) {
  const transaction = opts.transaction;
  const commission = await ReferralCommission.findByPk(commissionId, { transaction });
  if (!commission) return null;
  if (commission.status === 'cancelled') return commission;

  const wallet = await getOrCreateWallet(commission.referrer_id, commission.currency, { transaction });
  const amount = parseFloat(commission.commission_amount);
  const newBalance = parseFloat(wallet.balance) - amount;
  const newTotalEarned = parseFloat(wallet.total_earned) - amount;
  await wallet.update({
    balance: newBalance,
    total_earned: newTotalEarned
  }, { transaction });

  await commission.update({
    status: 'cancelled',
    cancelled_reason: reason || null
  }, { transaction });

  await ReferralWalletTransaction.create({
    wallet_id: wallet.id,
    type: 'adjustment',
    amount: -amount,
    balance_after: newBalance,
    reference_type: 'commission',
    reference_id: commission.id,
    description: `Commission cancelled: ${reason || 'no reason'}`
  }, { transaction });

  return commission;
}

/**
 * Apply wallet credit to an invoice. Caller is responsible for the larger
 * payment workflow (calling handleInvoicePaid when remaining hits 0). Returns
 * { wallet, invoice, applied, remaining } where `remaining` is invoice's
 * outstanding amount AFTER this credit.
 */
async function applyCredit(userId, invoiceId, amount, opts = {}) {
  const transaction = opts.transaction;
  if (!(amount > 0)) throw new Error('applyCredit requires positive amount');

  const invoice = await Invoice.findByPk(invoiceId, { transaction, lock: transaction ? transaction.LOCK.UPDATE : undefined });
  if (!invoice) throw new Error('Invoice not found');
  if (!['pending_payment', 'overdue', 'rejected'].includes(invoice.status)) {
    throw new Error(`Invoice not in a payable state: ${invoice.status}`);
  }

  const total = parseFloat(invoice.total_amount);
  const already = parseFloat(invoice.paid_amount || 0);
  const outstanding = Math.max(0, total - already);
  if (outstanding <= 0) throw new Error('Invoice has nothing left to pay');

  const currency = invoice.currency || 'MYR';
  const wallet = await getOrCreateWallet(userId, currency, { transaction });
  const balance = parseFloat(wallet.balance);

  const apply = Math.min(amount, outstanding, balance);
  if (apply <= 0) throw new Error('Insufficient wallet balance for this invoice');

  const newBalance = balance - apply;
  const newTotalCredited = parseFloat(wallet.total_credited) + apply;
  await wallet.update({
    balance: newBalance,
    total_credited: newTotalCredited
  }, { transaction });

  const newPaid = already + apply;
  await invoice.update({ paid_amount: newPaid }, { transaction });

  await ReferralWalletTransaction.create({
    wallet_id: wallet.id,
    type: 'credit_used',
    amount: -apply,
    balance_after: newBalance,
    reference_type: 'invoice',
    reference_id: invoice.id,
    description: `Credit applied to invoice ${invoice.invoice_number || invoice.id}`
  }, { transaction });

  return {
    wallet,
    invoice,
    applied: apply,
    remaining: Math.max(0, total - newPaid)
  };
}

/**
 * Create a payout request. Debits wallet balance immediately to prevent double-spend
 * (Reject path will refund via cancelPayout).
 */
async function requestPayout(userId, currency, amount, bank, opts = {}) {
  const transaction = opts.transaction;
  if (!(amount > 0)) throw new Error('requestPayout requires positive amount');
  if (!bank || !bank.bank_name || !bank.bank_account_number || !bank.bank_account_holder) {
    throw new Error('requestPayout requires complete bank info');
  }

  const settings = await getSettings();
  const minMap = settings.min_payout_amounts || {};
  const min = parseFloat(minMap[currency] || 0);
  if (min > 0 && amount < min) {
    throw new Error(`Minimum payout for ${currency} is ${min}`);
  }

  // Block when an active request already exists in this currency
  const inflight = await ReferralPayout.findOne({
    where: {
      user_id: userId,
      currency,
      status: { [Op.in]: ['requested', 'approved'] }
    },
    transaction
  });
  if (inflight) throw new Error('You have a pending payout for this currency');

  const wallet = await getOrCreateWallet(userId, currency, { transaction });
  const balance = parseFloat(wallet.balance);
  if (balance < amount) throw new Error('Insufficient wallet balance');

  const newBalance = balance - amount;
  const newTotalWithdrawn = parseFloat(wallet.total_withdrawn) + amount;
  await wallet.update({ balance: newBalance, total_withdrawn: newTotalWithdrawn }, { transaction });

  const payout = await ReferralPayout.create({
    user_id: userId,
    amount,
    currency,
    bank_name: bank.bank_name,
    bank_account_number: bank.bank_account_number,
    bank_account_holder: bank.bank_account_holder,
    status: 'requested'
  }, { transaction });

  await ReferralWalletTransaction.create({
    wallet_id: wallet.id,
    type: 'payout',
    amount: -amount,
    balance_after: newBalance,
    reference_type: 'payout',
    reference_id: payout.id,
    description: `Payout requested (${currency} ${amount})`
  }, { transaction });

  // Persist last-used bank info on user for next time
  await User.update({
    bank_name: bank.bank_name,
    bank_account_number: bank.bank_account_number,
    bank_account_holder: bank.bank_account_holder
  }, { where: { id: userId }, transaction });

  // Notify System Admins (best-effort, outside the txn after caller commits — but
  // we fire-and-forget here; if the caller's txn rolls back, the admin email
  // becomes a stale request, which is acceptable noise vs. blocking).
  (async () => {
    try {
      const { sendNotificationBatch, getSystemAdminIds } = require('../utils/notificationService');
      const { payoutRequestedAdminEmail } = require('../utils/notificationTemplates');
      const partner = await User.findByPk(userId, { attributes: ['full_name', 'email'] });
      const adminIds = await getSystemAdminIds();
      if (adminIds.length) {
        const mail = payoutRequestedAdminEmail({
          partnerName: partner?.full_name || partner?.email || `User #${userId}`,
          amount, currency, bank
        });
        await sendNotificationBatch(adminIds, 'referral_payout', mail);
      }
    } catch (e) {
      console.error('[requestPayout] admin email error:', e.message);
    }
  })();

  return payout;
}

/**
 * Reject a payout — refunds wallet balance.
 */
async function rejectPayout(payoutId, reason, reviewerId, opts = {}) {
  const transaction = opts.transaction;
  const payout = await ReferralPayout.findByPk(payoutId, {
    transaction,
    lock: transaction ? transaction.LOCK.UPDATE : undefined
  });
  if (!payout) throw new Error('Payout not found');
  if (payout.status !== 'requested') throw new Error(`Cannot reject payout in status ${payout.status}`);

  const wallet = await getOrCreateWallet(payout.user_id, payout.currency, { transaction });
  const amount = parseFloat(payout.amount);
  const newBalance = parseFloat(wallet.balance) + amount;
  const newTotalWithdrawn = parseFloat(wallet.total_withdrawn) - amount;
  await wallet.update({
    balance: newBalance,
    total_withdrawn: newTotalWithdrawn
  }, { transaction });

  await payout.update({
    status: 'rejected',
    reject_reason: reason || null,
    reviewed_by: reviewerId || null,
    reviewed_at: new Date()
  }, { transaction });

  await ReferralWalletTransaction.create({
    wallet_id: wallet.id,
    type: 'adjustment',
    amount,
    balance_after: newBalance,
    reference_type: 'payout',
    reference_id: payout.id,
    description: `Payout rejected: ${reason || 'no reason'}`
  }, { transaction });

  // Email partner — wallet has been refunded
  (async () => {
    try {
      const { sendNotification } = require('../utils/notificationService');
      const { payoutRejectedEmail } = require('../utils/notificationTemplates');
      const partner = await User.findByPk(payout.user_id, { attributes: ['full_name', 'email'] });
      const mail = payoutRejectedEmail({
        partnerName: partner?.full_name || partner?.email,
        amount, currency: payout.currency, reason
      });
      await sendNotification(payout.user_id, 'referral_payout', mail);
    } catch (e) {
      console.error('[rejectPayout] email error:', e.message);
    }
  })();

  return payout;
}

/**
 * Apply the first-month referral discount to a freshly-created POS subscription
 * invoice. Idempotent: a referred user only ever gets the discount once
 * (`users.referral_discount_applied = true`).
 *
 * Implementation strategy: appends a single negative InvoiceItem so the
 * canonical finalizeInvoice() recomputation folds it naturally into subtotal
 * and total. This deliberately keeps `invoices.discount_value/discount_type`
 * free for the existing Admin manual-discount mechanism (restaurant.discount_*),
 * so the two discount sources never collide.
 *
 * Caller contract:
 *   - Caller has just created `invoice` and the InvoiceItem rows but has NOT
 *     yet called finalizeInvoice(). After this returns, caller MUST call
 *     finalizeInvoice() to recompute the totals.
 *   - planAmount is the pre-discount subscription line amount in `invoice.currency`.
 *
 * Returns: discount amount applied (positive number) or 0 when not eligible.
 */
async function applyFirstMonthDiscount(invoice, payerUser, planAmount, opts = {}) {
  const transaction = opts.transaction;
  if (!invoice || !payerUser) return 0;
  if (!payerUser.referred_by) return 0;
  if (payerUser.referral_discount_applied) return 0;

  // Eligibility — POS subscription invoices only
  if (invoice.issuer_type !== 'system_admin') return 0;
  if (invoice.invoice_category !== 'subscription') return 0;
  if (invoice.parent_soa_invoice_id) return 0; // never applies to SOA child rows

  const settings = await getSettings();
  if (!settings.program_active) return 0;

  const rate = parseFloat(settings.first_month_discount); // e.g. 20.00
  if (!(rate > 0)) return 0;
  const discountAmount = Math.round(parseFloat(planAmount) * rate) / 100;
  if (!(discountAmount > 0)) return 0;

  const referrer = await User.findByPk(payerUser.referred_by, { transaction });
  if (!referrer || referrer.id === payerUser.id) return 0;
  const code = referrer.referral_code || 'REFERRAL';

  const InvoiceItem = require('../models/InvoiceItem');
  await InvoiceItem.create({
    invoice_id: invoice.id,
    item_type: 'discount',
    description: `Referral 1st month discount (${code}, ${rate}% off)`,
    calculation_method: 'fixed',
    fixed_amount: -discountAmount,
    calculated_amount: -discountAmount,
    tax_rate: 0,
    tax_amount: 0,
    total_amount: -discountAmount
  }, transaction ? { transaction } : {});

  await User.update(
    { referral_discount_applied: true },
    { where: { id: payerUser.id }, transaction }
  );

  return discountAmount;
}

module.exports = {
  generateReferralCode,
  getOrCreateReferralCode,
  getOrCreateWallet,
  getSettings,
  invalidateSettingsCache,
  resolvePayerUser,
  processCommission,
  cancelCommission,
  cancelCommissionsForInvoice,
  applyCredit,
  applyFirstMonthDiscount,
  requestPayout,
  rejectPayout
};
