/**
 * SA-only: Supplier Invitation management
 * Sprint 1 (Supply Chain Design 1)
 *
 * Endpoints:
 *   POST   /api/admin/supplier-invitations           — send invitation email
 *   GET    /api/admin/supplier-invitations           — list (filter by status)
 *   DELETE /api/admin/supplier-invitations/:id       — revoke
 */
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { sanitizeString } = require('../middleware/validation');
const { SupplierInvitation, PlanTemplate, User } = require('../models');
const emailService = require('../utils/emailService');
const { emailLayout } = require('../utils/emailTemplates');

const INVITATION_TTL_DAYS = 7;

function buildInvitationLink(token) {
  const base = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production'
    ? 'https://purplehere.com'
    : 'https://dev.purplehere.com');
  return `${base}/signup?invitation=${token}`;
}

// POST /api/admin/supplier-invitations — send
router.post('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { email, supplier_name, plan_id, message } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, message: 'email is required' });
    }
    if (plan_id) {
      const plan = await PlanTemplate.findOne({ where: { id: plan_id, plan_target: 'supplier' } });
      if (!plan) {
        return res.status(400).json({ success: false, message: 'Invalid plan_id (must target supplier)' });
      }
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + INVITATION_TTL_DAYS * 86400 * 1000);

    const invitation = await SupplierInvitation.create({
      token,
      email: sanitizeString(email),
      supplier_name: supplier_name ? sanitizeString(supplier_name) : null,
      plan_id: plan_id || null,
      message: message ? sanitizeString(message) : null,
      invited_by: req.user.id,
      expires_at: expiresAt,
      status: 'pending'
    });

    // Send email (non-blocking)
    const link = buildInvitationLink(token);
    const inviter = await User.findByPk(req.user.id, { attributes: ['full_name', 'email'] });
    const subject = `[PurpleHere] Supplier invitation from ${inviter?.full_name || 'PurpleHere'}`;
    const body = `
      <h2>You're invited to join PurpleHere as a Supplier</h2>
      <p>${inviter?.full_name || 'A PurpleHere admin'} invited you to register as a supplier on the PurpleHere platform.</p>
      ${supplier_name ? `<p><strong>Suggested company name:</strong> ${supplier_name}</p>` : ''}
      ${message ? `<blockquote style="border-left:3px solid #8B5CF6;padding-left:16px;margin:16px 0;color:#666">${message}</blockquote>` : ''}
      <p style="margin:24px 0">
        <a href="${link}" style="background:#8B5CF6;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600">Accept Invitation & Sign Up</a>
      </p>
      <p style="color:#888;font-size:13px">Link expires on ${expiresAt.toISOString().slice(0, 10)} (UTC). If you didn't expect this invitation, you can ignore this email.</p>
    `;
    emailService.sendPlatformEmail({ to: email, subject, html: emailLayout(body) }).catch(e => {
      console.error('[SupplierInvitation] email failed:', e.message);
    });

    res.json({
      success: true,
      data: {
        id: invitation.id,
        email: invitation.email,
        token: invitation.token,
        expires_at: invitation.expires_at,
        link
      }
    });
  } catch (e) {
    console.error('POST /admin/supplier-invitations:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

// GET /api/admin/supplier-invitations
router.get('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const where = {};
    if (req.query.status && ['pending', 'used', 'expired', 'revoked'].includes(req.query.status)) {
      where.status = req.query.status;
    }
    const list = await SupplierInvitation.findAll({
      where,
      include: [
        { model: User, as: 'inviter', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'usedBy', attributes: ['id', 'full_name', 'email'] },
        { model: PlanTemplate, as: 'plan', attributes: ['id', 'name', 'display_name'] }
      ],
      order: [['created_at', 'DESC']]
    });

    // Auto-mark expired (best-effort, doesn't block)
    const now = new Date();
    const expiredIds = list
      .filter(i => i.status === 'pending' && i.expires_at < now)
      .map(i => i.id);
    if (expiredIds.length) {
      SupplierInvitation.update({ status: 'expired' }, { where: { id: expiredIds } }).catch(() => {});
    }

    res.json({ success: true, data: list });
  } catch (e) {
    console.error('GET /admin/supplier-invitations:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

// DELETE /api/admin/supplier-invitations/:id — revoke
router.delete('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const invitation = await SupplierInvitation.findByPk(req.params.id);
    if (!invitation) return res.status(404).json({ success: false, message: 'Invitation not found' });
    if (invitation.status !== 'pending') {
      return res.status(400).json({ success: false, message: `Cannot revoke ${invitation.status} invitation` });
    }
    await invitation.update({ status: 'revoked' });
    res.json({ success: true });
  } catch (e) {
    console.error('DELETE /admin/supplier-invitations/:id:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
