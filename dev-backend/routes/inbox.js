/**
 * Unified Inbox API
 *
 * Aggregates Notice + SupportTicket + OperationTicket into a single chronological
 * stream so the user has one place to check what's happened that needs attention.
 *
 * Read-tracking strategy (v1):
 *   • Notice           — explicit `notice_recipients.read_at`
 *   • SupportTicket    — heuristic: status ∈ {open, in_progress, pending} = unread,
 *                          status ∈ {closed, resolved} = read.
 *   • OperationTicket  — same heuristic.
 *
 * Per-comment new-reply notifications are NOT in v1 — sidebar badge already
 * exposes that count, and unifying them needs a separate inbox_reads table
 * (deferred to v2).
 *
 * Endpoints:
 *   GET  /api/inbox?type=all|notice|support_ticket|operation_ticket
 *                  &unread_only=true|false&limit=20&before=<iso>
 *        → { success, data: InboxItem[], unread_count, has_more }
 *   GET  /api/inbox/unread-count
 *        → { success, total, by_type: { notice, support_ticket, operation_ticket } }
 *   POST /api/inbox/notice/:id/read
 *        → marks one NoticeRecipient row read (by user_id or any restaurant_id of caller)
 *   POST /api/inbox/mark-all-read?type=notice
 *        → marks every visible Notice for caller as read
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Notice, NoticeRecipient, SupportTicket, OperationTicket, RestaurantManager, User } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const TICKET_OPEN_STATUSES = ['open', 'in_progress', 'pending', 'awaiting_customer', 'awaiting_response'];
const TICKET_DONE_STATUSES = ['closed', 'resolved', 'cancelled'];

/**
 * Resolve which restaurant_ids and which user_id rows of NoticeRecipient apply
 * to the caller. We mirror the logic the existing notices controller uses so
 * the inbox doesn't show a different set than the Notices page.
 */
async function resolveNoticeContext(user) {
  const restaurantIds = new Set();
  if (user.restaurant_id) restaurantIds.add(user.restaurant_id);

  // Restaurant Owner: collect all restaurants they own (relationship_type='ownership').
  // Brand General/Foodcourt General receive notices via NoticeRecipient.user_id directly,
  // so we don't need to expand restaurant scope for them.
  if (user.role === 'Restaurant Owner') {
    const owned = await RestaurantManager.findAll({
      where: { manager_id: user.id, relationship_type: 'ownership' },
      attributes: ['restaurant_id']
    });
    owned.forEach(r => restaurantIds.add(r.restaurant_id));
  }

  return {
    userId: user.id,
    restaurantIds: Array.from(restaurantIds)
  };
}

function noticeSeverityFromPriority(priority) {
  switch (priority) {
    case 'urgent': return 'urgent';
    case 'important': return 'important';
    default: return 'normal';
  }
}

function ticketSeverityFromPriority(priority) {
  if (!priority) return 'normal';
  const p = String(priority).toLowerCase();
  if (p === 'urgent' || p === 'critical') return 'urgent';
  if (p === 'high' || p === 'important') return 'important';
  return 'normal';
}

function previewFromContent(text, max = 140) {
  if (!text) return '';
  const stripped = String(text).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return stripped.length > max ? stripped.slice(0, max) + '…' : stripped;
}

// ─── Fetch helpers per source ────────────────────────────────

async function fetchNotices({ user, ctx, unreadOnly, before }) {
  // Recipient rows that match the caller
  const recipientWhere = {
    [Op.or]: [
      { user_id: ctx.userId },
      ...(ctx.restaurantIds.length ? [{ restaurant_id: { [Op.in]: ctx.restaurantIds } }] : [])
    ]
  };
  if (unreadOnly) recipientWhere.read_at = null;

  const recipients = await NoticeRecipient.findAll({
    where: recipientWhere,
    include: [{
      model: Notice,
      as: 'notice',
      where: { status: 'published', ...(before ? { createdAt: { [Op.lt]: before } } : {}) },
      required: true
    }],
    order: [[{ model: Notice, as: 'notice' }, 'createdAt', 'DESC']],
    limit: 200  // cap per source; outer code merges + slices
  });

  return recipients.map(rec => {
    const n = rec.notice;
    return {
      id: `notice-${rec.id}`,
      type: 'notice',
      source: { type: 'notice', id: n.id, recipient_id: rec.id },
      title: n.title,
      preview: previewFromContent(n.content, 140),
      severity: noticeSeverityFromPriority(n.priority),
      category: n.category || 'general',
      author_name: n.author_name,
      timestamp: n.createdAt,
      read: !!rec.read_at,
      link: `/pos/notices/${n.id}`
    };
  });
}

async function fetchSupportTickets({ user, unreadOnly, before }) {
  const where = { customerId: String(user.id) };
  if (unreadOnly) where.status = { [Op.in]: TICKET_OPEN_STATUSES };
  if (before) where.createdAt = { [Op.lt]: before };

  const rows = await SupportTicket.findAll({
    where,
    order: [['updatedAt', 'DESC']],
    limit: 200
  });

  return rows.map(t => ({
    id: `support-${t.id}`,
    type: 'support_ticket',
    source: { type: 'support_ticket', id: t.id },
    title: t.subject || `Ticket ${t.ticketNumber}`,
    preview: previewFromContent(t.description, 140),
    severity: ticketSeverityFromPriority(t.priority),
    category: t.category || 'general',
    author_name: t.customerName,
    timestamp: t.updatedAt || t.createdAt,
    read: TICKET_DONE_STATUSES.includes(t.status),
    link: `/pos/support-tickets/${t.id}`
  }));
}

async function fetchOperationTickets({ user, unreadOnly, before }) {
  // OperationTicket assigned to me (managerId) OR created by me (requesterId)
  const where = {
    [Op.or]: [
      { managerId: user.id },
      { requesterId: user.id }
    ]
  };
  if (unreadOnly) where.status = { [Op.in]: TICKET_OPEN_STATUSES };
  if (before) where.createdAt = { [Op.lt]: before };

  const rows = await OperationTicket.findAll({
    where,
    order: [['updatedAt', 'DESC']],
    limit: 200
  });

  return rows.map(t => ({
    id: `op-${t.id}`,
    type: 'operation_ticket',
    source: { type: 'operation_ticket', id: t.id },
    title: t.subject || `Ticket ${t.ticketNumber}`,
    preview: previewFromContent(t.description, 140),
    severity: ticketSeverityFromPriority(t.priority),
    category: t.category || 'general',
    author_name: t.requesterName,
    timestamp: t.updatedAt || t.createdAt,
    read: TICKET_DONE_STATUSES.includes(t.status),
    link: `/pos/operation-tickets/${t.id}`
  }));
}

// ─── GET /api/inbox ─────────────────────────────────────────

router.get('/', authenticateToken, async (req, res) => {
  try {
    const type = String(req.query.type || 'all').toLowerCase();
    const unreadOnly = String(req.query.unread_only || 'false') === 'true';
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const beforeRaw = req.query.before;
    const before = beforeRaw ? new Date(String(beforeRaw)) : null;

    const ctx = await resolveNoticeContext(req.user);
    const sources = [];
    if (type === 'all' || type === 'notice')           sources.push(fetchNotices({ user: req.user, ctx, unreadOnly, before }));
    if (type === 'all' || type === 'support_ticket')   sources.push(fetchSupportTickets({ user: req.user, unreadOnly, before }));
    if (type === 'all' || type === 'operation_ticket') sources.push(fetchOperationTickets({ user: req.user, unreadOnly, before }));

    const lists = await Promise.all(sources);
    const merged = [].concat(...lists)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const data = merged.slice(0, limit);
    const has_more = merged.length > limit;

    // Quick unread count for the same scope (separate from filter — gives the
    // header bell its global number even when the user is on a "Read" filter)
    const unread_count = await getUnreadTotal(req.user, ctx);

    res.json({ success: true, data, unread_count, has_more });
  } catch (error) {
    console.error('Inbox list error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch inbox' });
  }
});

async function getUnreadTotal(user, ctx) {
  ctx = ctx || (await resolveNoticeContext(user));
  const noticeWhere = {
    read_at: null,
    [Op.or]: [
      { user_id: ctx.userId },
      ...(ctx.restaurantIds.length ? [{ restaurant_id: { [Op.in]: ctx.restaurantIds } }] : [])
    ]
  };
  const [n, st, ot] = await Promise.all([
    NoticeRecipient.count({
      where: noticeWhere,
      include: [{ model: Notice, as: 'notice', where: { status: 'published' }, required: true }]
    }),
    SupportTicket.count({ where: { customerId: String(user.id), status: { [Op.in]: TICKET_OPEN_STATUSES } } }),
    OperationTicket.count({
      where: {
        status: { [Op.in]: TICKET_OPEN_STATUSES },
        [Op.or]: [{ managerId: user.id }, { requesterId: user.id }]
      }
    })
  ]);
  return { notice: n, support_ticket: st, operation_ticket: ot, total: n + st + ot };
}

// ─── GET /api/inbox/unread-count ────────────────────────────

router.get('/unread-count', authenticateToken, async (req, res) => {
  try {
    const counts = await getUnreadTotal(req.user);
    res.json({ success: true, ...counts });
  } catch (error) {
    console.error('Inbox unread-count error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch unread count' });
  }
});

// ─── POST /api/inbox/notice/:id/read ────────────────────────

router.post('/notice/:id/read', authenticateToken, async (req, res) => {
  try {
    const noticeId = parseInt(req.params.id);
    if (!noticeId) return res.status(400).json({ success: false, message: 'Invalid notice id' });

    const ctx = await resolveNoticeContext(req.user);
    const where = {
      notice_id: noticeId,
      read_at: null,
      [Op.or]: [
        { user_id: ctx.userId },
        ...(ctx.restaurantIds.length ? [{ restaurant_id: { [Op.in]: ctx.restaurantIds } }] : [])
      ]
    };
    const [updated] = await NoticeRecipient.update(
      { read_at: new Date(), read_by: req.user.id },
      { where }
    );
    res.json({ success: true, marked: updated });
  } catch (error) {
    console.error('Inbox mark-read error:', error);
    res.status(500).json({ success: false, message: 'Failed to mark notice as read' });
  }
});

// ─── POST /api/inbox/mark-all-read ──────────────────────────

router.post('/mark-all-read', authenticateToken, async (req, res) => {
  try {
    const type = String(req.query.type || req.body?.type || 'notice').toLowerCase();
    if (type !== 'notice') {
      // Tickets use status-based read state; their "read" is implicit when status closes.
      return res.json({ success: true, marked: 0, note: 'Only notices support explicit mark-all-read in v1' });
    }
    const ctx = await resolveNoticeContext(req.user);
    const where = {
      read_at: null,
      [Op.or]: [
        { user_id: ctx.userId },
        ...(ctx.restaurantIds.length ? [{ restaurant_id: { [Op.in]: ctx.restaurantIds } }] : [])
      ]
    };
    const [updated] = await NoticeRecipient.update(
      { read_at: new Date(), read_by: req.user.id },
      { where }
    );
    res.json({ success: true, marked: updated });
  } catch (error) {
    console.error('Inbox mark-all-read error:', error);
    res.status(500).json({ success: false, message: 'Failed to mark all as read' });
  }
});

module.exports = router;
