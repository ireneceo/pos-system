const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const Comment = require('../models/Comment');
const CommentRead = require('../models/CommentRead');
const User = require('../models/User');
const Notice = require('../models/Notice');
const { OperationTicket, SupportTicket } = require('../models');
const { sendNotification } = require('../utils/notificationService');
const { commentReceivedEmail, inquiryRepliedEmail } = require('../utils/notificationTemplates');

// POST /api/comments/mark-read - Mark comments as read for an entity
// MUST be before /:entityType/:entityId to avoid route collision
router.post('/mark-read', authenticateToken, async (req, res) => {
  try {
    const { entity_type, entity_id } = req.body;
    if (!entity_type || !entity_id) {
      return res.status(400).json({ success: false, message: 'entity_type and entity_id are required' });
    }

    const validTypes = ['notice', 'operation_ticket', 'support_ticket', 'hardware_quote'];
    if (!validTypes.includes(entity_type)) {
      return res.status(400).json({ success: false, message: 'Invalid entity type' });
    }

    await CommentRead.upsert({
      user_id: req.user.id,
      entity_type,
      entity_id: entity_id.toString(),
      last_read_at: new Date()
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error marking comments as read:', error);
    res.status(500).json({ success: false, message: 'Failed to mark as read' });
  }
});

// GET /api/comments/unread-counts - Get unread comment counts for multiple entities
// MUST be before /:entityType/:entityId to avoid route collision
router.get('/unread-counts', authenticateToken, async (req, res) => {
  try {
    const { entity_type, entity_ids } = req.query;
    if (!entity_type || !entity_ids) {
      return res.json({ success: true, data: [] });
    }

    const validTypes = ['notice', 'operation_ticket', 'support_ticket', 'hardware_quote'];
    if (!validTypes.includes(entity_type)) {
      return res.status(400).json({ success: false, message: 'Invalid entity type' });
    }

    const ids = entity_ids.split(',').filter(id => id.trim());
    if (ids.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const userId = req.user.id;
    const viewerRole = req.user.role;

    // Get total comment counts and unread counts per entity
    // Exclude internal comments that the viewer cannot see
    const [results] = await sequelize.query(`
      SELECT
        c.entity_id,
        COUNT(*) as total_comments,
        SUM(CASE
          WHEN c.author_id != :userId
            AND c.createdAt > COALESCE(cr.last_read_at, '1970-01-01')
          THEN 1 ELSE 0
        END) as unread_count
      FROM comments c
      LEFT JOIN comment_reads cr
        ON cr.user_id = :userId
        AND cr.entity_type = c.entity_type
        AND cr.entity_id = c.entity_id
      WHERE c.entity_type = :entityType
        AND c.entity_id IN (:entityIds)
        AND (c.is_internal = 0 OR c.is_internal IS NULL OR c.author_id = :userId)
      GROUP BY c.entity_id
    `, {
      replacements: { userId, entityType: entity_type, entityIds: ids }
    });

    // Note: The SQL filter above is a basic pass - it shows internal comments
    // from the author themselves. Full role-group filtering happens at the
    // GET endpoint level. For counts, this approximation is acceptable.

    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching unread counts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch unread counts' });
  }
});

// Helper: Check if user can see internal comments from a specific role
function canSeeInternal(viewerRole, commentAuthorRole) {
  // System Admin sees all internal notes
  if (viewerRole === 'System Admin') return true;

  // Same role can always see each other's internal notes
  if (viewerRole === commentAuthorRole) return true;

  // Role group mapping: General <-> Manager of same type
  const roleGroups = {
    'Brand General': ['Brand General', 'Brand Manager'],
    'Brand Manager': ['Brand General', 'Brand Manager'],
    'Foodcourt General': ['Foodcourt General', 'Foodcourt Manager'],
    'Foodcourt Manager': ['Foodcourt General', 'Foodcourt Manager'],
    'Restaurant Admin': ['Restaurant Admin', 'Staff'],
    'Staff': ['Restaurant Admin', 'Staff'],
    'Restaurant Owner': ['Restaurant Owner']
  };

  const group = roleGroups[viewerRole] || [viewerRole];
  return group.includes(commentAuthorRole);
}

// GET /api/comments/:entityType/:entityId - Get comments for an entity
router.get('/:entityType/:entityId', authenticateToken, async (req, res) => {
  try {
    const { entityType, entityId } = req.params;
    const validTypes = ['notice', 'operation_ticket', 'support_ticket', 'hardware_quote'];
    if (!validTypes.includes(entityType)) {
      return res.status(400).json({ success: false, message: 'Invalid entity type' });
    }

    const comments = await Comment.findAll({
      where: { entity_type: entityType, entity_id: entityId },
      include: [{ model: User, as: 'author', attributes: ['id', 'full_name', 'role'] }],
      order: [['createdAt', 'ASC']]
    });

    // Filter internal comments based on viewer's role
    const viewerRole = req.user.role;
    const filtered = comments.filter(c => {
      if (!c.is_internal) return true;
      return canSeeInternal(viewerRole, c.author_role);
    });

    res.json({ success: true, data: filtered });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch comments' });
  }
});

// POST /api/comments - Create a new comment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { entity_type, entity_id, content, attachments, is_internal } = req.body;

    if (!entity_type || !entity_id || (!content && (!attachments || attachments.length === 0))) {
      return res.status(400).json({ success: false, message: 'entity_type, entity_id, and content (or attachments) are required' });
    }

    const validTypes = ['notice', 'operation_ticket', 'support_ticket', 'hardware_quote'];
    if (!validTypes.includes(entity_type)) {
      return res.status(400).json({ success: false, message: 'Invalid entity type' });
    }

    const comment = await Comment.create({
      entity_type,
      entity_id,
      author_id: req.user.id,
      author_name: req.user.full_name,
      author_role: req.user.role,
      content: content || '',
      attachments: attachments || null,
      is_internal: is_internal || false
    });

    // Auto mark-read for the comment author (so your own comment doesn't show as unread)
    await CommentRead.upsert({
      user_id: req.user.id,
      entity_type,
      entity_id: entity_id.toString(),
      last_read_at: new Date()
    });

    const commentWithAuthor = await Comment.findByPk(comment.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'full_name', 'role'] }]
    });

    // Email notification (non-blocking)
    (async () => {
      try {
        let entityOwnerId = null;
        let entityTitle = '';

        if (entity_type === 'notice') {
          const notice = await Notice.findByPk(entity_id, { attributes: ['id', 'title', 'author_id'] });
          if (notice) { entityOwnerId = notice.author_id; entityTitle = notice.title; }
        } else if (entity_type === 'operation_ticket') {
          const ticket = await OperationTicket.findByPk(entity_id);
          if (ticket) {
            entityTitle = ticket.title || ticket.subject || `Ticket ${ticket.ticketNumber}`;
            // Notify the other party: if commenter is requester → notify manager, vice versa
            entityOwnerId = String(ticket.requesterId) === String(req.user.id) ? ticket.managerId : ticket.requesterId;
            // For ticket comments, use inquiry_replied category
            if (entityOwnerId && entityOwnerId !== req.user.id) {
              const mail = inquiryRepliedEmail({ title: entityTitle, subject: entityTitle }, comment, req.user.full_name);
              await sendNotification(entityOwnerId, 'inquiry_replied', mail);
            }
            return;
          }
        } else if (entity_type === 'support_ticket') {
          const ticket = await SupportTicket.findByPk(entity_id);
          if (ticket) {
            entityTitle = ticket.subject || `Ticket ${ticket.ticketNumber}`;
            entityOwnerId = String(ticket.customerId) === String(req.user.id) ? null : parseInt(ticket.customerId);
            // System Admin responding → notify customer
            if (!entityOwnerId && req.user.role === 'System Admin') {
              entityOwnerId = parseInt(ticket.customerId);
            }
            if (entityOwnerId && entityOwnerId !== req.user.id) {
              const mail = inquiryRepliedEmail({ title: entityTitle, subject: entityTitle }, comment, req.user.full_name);
              await sendNotification(entityOwnerId, 'inquiry_replied', mail);
            }
            return;
          }
        }

        if (entity_type === 'hardware_quote') {
          const { HardwareQuote } = require('../models');
          const quote = await HardwareQuote.findByPk(entity_id);
          if (quote) {
            entityTitle = `Hardware Quote ${quote.quote_number}`;
            // Notify assigned admin if different from commenter
            if (quote.assigned_to && quote.assigned_to !== req.user.id) {
              entityOwnerId = quote.assigned_to;
            }
          }
        }

        // For notices: notify entity owner if commenter is different
        if (entityOwnerId && entityOwnerId !== req.user.id) {
          const mail = commentReceivedEmail(comment, entityTitle, req.user.full_name);
          await sendNotification(entityOwnerId, 'comment_received', mail);
        }
      } catch (e) {
        console.error('[Comment notification error]', e.message);
      }
    })();

    res.status(201).json({ success: true, data: commentWithAuthor });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, message: 'Failed to create comment' });
  }
});

// DELETE /api/comments/:id - Delete a comment (author only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.author_id !== req.user.id && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this comment' });
    }

    await comment.destroy();
    res.json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ success: false, message: 'Failed to delete comment' });
  }
});

module.exports = router;
