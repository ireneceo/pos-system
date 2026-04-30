const User = require('../models/User');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const emailService = require('./emailService');

/**
 * Resolve SMTP settings for a recipient user.
 * Priority: receiver's entity SMTP → platform (System Admin) SMTP fallback
 *
 * @param {object} user - User model instance
 * @returns {{ entityType: string, entityId: number } | null} - SMTP source, or null if no SMTP available
 */
async function resolveReceiverSmtp(user) {
  let entityType = null;
  let entityId = null;

  switch (user.role) {
    case 'Restaurant Admin':
    case 'Staff':
      entityType = 'restaurant';
      entityId = user.restaurant_id;
      break;
    case 'Brand General':
    case 'Brand Manager':
      entityType = 'brand';
      entityId = user.brand_id;
      break;
    case 'Foodcourt General':
    case 'Foodcourt Manager':
      entityType = 'foodcourt';
      entityId = user.foodcourt_id;
      break;
    case 'System Admin':
      entityType = 'admin';
      entityId = user.id;
      break;
    case 'Restaurant Owner':
      // Owner has no dedicated SMTP → always platform fallback
      entityType = null;
      break;
  }

  // Try receiver's entity SMTP
  if (entityType && entityId) {
    try {
      const settings = await emailService.getEmailSettings(entityType, entityId);
      if (settings) return { settings, source: 'entity' };
    } catch {
      // SMTP not configured for this entity - fall through to platform
    }
  }

  // Fallback: platform (System Admin) SMTP
  try {
    const settings = await emailService.getPlatformEmailSettings();
    if (settings) return { settings, source: 'platform' };
  } catch {
    // Platform SMTP not configured either
  }

  return null;
}

/**
 * Send a notification email to a specific user.
 * - Checks user preference for the category
 * - Resolves receiver-based SMTP (with platform fallback)
 * - Sends email (non-blocking, never throws)
 *
 * @param {number} recipientUserId - Target user ID
 * @param {string} category - Notification category key (e.g., 'invoice_created')
 * @param {object} mailOptions - { subject, html, text } (to is auto-set, from is auto-set)
 */
/**
 * 사용자의 entity 정보로부터 이메일 branding 을 결정.
 * - Restaurant Admin/Staff → restaurant branding
 * - Brand General/Manager → brand branding
 * - Foodcourt General/Manager → foodcourt branding
 * - Restaurant Owner → 첫 소유 restaurant branding (없으면 null → PurpleHere)
 * - System Admin → null (PurpleHere 기본)
 */
async function resolveReceiverBranding(user) {
  try {
    const { getEntityBranding } = require('./emailBranding');
    switch (user.role) {
      case 'Restaurant Admin':
      case 'Staff':
        return user.restaurant_id ? await getEntityBranding('restaurant', user.restaurant_id) : null;
      case 'Brand General':
      case 'Brand Manager':
        return user.brand_id ? await getEntityBranding('brand', user.brand_id) : null;
      case 'Foodcourt General':
      case 'Foodcourt Manager':
        return user.foodcourt_id ? await getEntityBranding('foodcourt', user.foodcourt_id) : null;
      case 'Restaurant Owner': {
        const row = await sequelize.query(
          `SELECT restaurant_id FROM restaurant_managers WHERE manager_id = :uid AND relationship_type = 'ownership' LIMIT 1`,
          { replacements: { uid: user.id }, type: QueryTypes.SELECT }
        );
        return row[0]?.restaurant_id ? await getEntityBranding('restaurant', row[0].restaurant_id) : null;
      }
      case 'System Admin':
      default:
        return null;
    }
  } catch (e) {
    console.error('[Notification] resolveReceiverBranding error:', e.message);
    return null;
  }
}

async function sendNotification(recipientUserId, category, mailOptions) {
  try {
    // 1. Get recipient user
    const user = await User.findByPk(recipientUserId);
    if (!user || !user.email) {
      console.log(`[Notification] Skip: user ${recipientUserId} not found or no email`);
      return;
    }

    // 2. Check preference
    const prefs = user.notification_preferences; // null = all enabled
    if (prefs && prefs[category] === false) {
      console.log(`[Notification] Skip: user ${recipientUserId} disabled '${category}'`);
      return;
    }

    // 3. Resolve SMTP
    const smtp = await resolveReceiverSmtp(user);
    if (!smtp) {
      console.log(`[Notification] Skip: no SMTP available for user ${recipientUserId}`);
      return;
    }

    // 4. Resolve recipient branding & re-render if template metadata available
    const branding = await resolveReceiverBranding(user);
    let renderedHtml = mailOptions.html;
    if (branding && mailOptions._title && mailOptions._body) {
      const { wrapTemplate } = require('./notificationTemplates');
      renderedHtml = wrapTemplate(mailOptions._title, mailOptions._body, mailOptions._lang, branding);
    }

    // 5. Send email — exclude metadata fields from nodemailer payload
    const { _title, _body, _lang, ...cleanOptions } = mailOptions;
    const transporter = emailService.createTransporter(smtp.settings);

    // 첨부 정책 (unreferenced attachment 가 본문 하단에 표시되는 문제 방지):
    //  - branding 있음 (entity) → entity 로고만, PurpleHere 로고 첨부 안 함
    //  - branding 없음 (PurpleHere 기본) + html 에 cid:purplehere-logo 참조 → 자동 첨부
    //  - 기존 cleanOptions.attachments 는 그대로 유지 (caller 가 명시적으로 넣은 것)
    let finalAttachments = [...(cleanOptions.attachments || [])];
    if (branding?.logoAttachment) {
      finalAttachments.push(...branding.logoAttachment);
    } else if (!branding && renderedHtml && renderedHtml.includes('cid:purplehere-logo')) {
      const { getLogoAttachment } = require('./emailTemplates');
      finalAttachments.push(...getLogoAttachment());
    }

    const finalOptions = {
      ...cleanOptions,
      html: renderedHtml,
      attachments: finalAttachments.length > 0 ? finalAttachments : undefined,
      to: user.email,
      from: smtp.settings.from_name
        ? `"${smtp.settings.from_name}" <${smtp.settings.from_email}>`
        : smtp.settings.from_email
    };

    if (smtp.settings.reply_to_email && !finalOptions.replyTo) {
      finalOptions.replyTo = smtp.settings.reply_to_email;
    }

    const info = await transporter.sendMail(finalOptions);
    console.log(`[Notification] Sent '${category}' to ${user.email} via ${smtp.source} SMTP, branding=${branding ? branding.name : 'PurpleHere'} (${info.messageId})`);
  } catch (error) {
    console.error(`[Notification] Error sending '${category}' to user ${recipientUserId}:`, error.message);
    // Never throw - notifications should not break the main flow
  }
}

/**
 * Send notification to multiple users (batch).
 * Uses Promise.allSettled to ensure partial failures don't block others.
 *
 * @param {number[]} userIds - Array of user IDs
 * @param {string} category - Notification category key
 * @param {object} mailOptions - { subject, html, text }
 */
async function sendNotificationBatch(userIds, category, mailOptions) {
  if (!userIds || userIds.length === 0) return;

  await Promise.allSettled(
    userIds.map(userId => sendNotification(userId, category, mailOptions))
  );
}

/**
 * Find all System Admin user IDs.
 */
async function getSystemAdminIds() {
  const admins = await sequelize.query(
    "SELECT id FROM users WHERE role = 'System Admin' AND email IS NOT NULL",
    { type: QueryTypes.SELECT }
  );
  return admins.map(a => a.id);
}

/**
 * Find Brand General/Manager user IDs for a brand.
 */
async function getBrandManagerIds(brandId) {
  const users = await sequelize.query(
    "SELECT id FROM users WHERE brand_id = :brandId AND role IN ('Brand General', 'Brand Manager') AND email IS NOT NULL",
    { replacements: { brandId }, type: QueryTypes.SELECT }
  );
  return users.map(u => u.id);
}

/**
 * Find Foodcourt General/Manager user IDs for a foodcourt.
 */
async function getFoodcourtManagerIds(foodcourtId) {
  const users = await sequelize.query(
    "SELECT id FROM users WHERE foodcourt_id = :foodcourtId AND role IN ('Foodcourt General', 'Foodcourt Manager') AND email IS NOT NULL",
    { replacements: { foodcourtId }, type: QueryTypes.SELECT }
  );
  return users.map(u => u.id);
}

/**
 * Find Restaurant Owner user IDs for a restaurant.
 */
async function getRestaurantOwnerIds(restaurantId) {
  const owners = await sequelize.query(
    `SELECT u.id FROM users u
     JOIN restaurant_managers rm ON rm.manager_id = u.id
     WHERE rm.restaurant_id = :restaurantId AND rm.relationship_type = 'ownership'
     AND u.role = 'Restaurant Owner' AND u.email IS NOT NULL`,
    { replacements: { restaurantId }, type: QueryTypes.SELECT }
  );
  return owners.map(o => o.id);
}

/**
 * Find Supplier Admin + Staff user IDs for a supplier company.
 * Includes:
 *   - SupplierCompany.owner_id (Supplier Admin)
 *   - users.supplier_company_id matches AND role IN (Supplier Admin, Supplier Staff)
 *     (Advanced module supplier_admin_staff)
 */
async function getSupplierAdminIds(supplierCompanyId) {
  const users = await sequelize.query(
    `SELECT DISTINCT u.id FROM users u
     LEFT JOIN supplier_companies sc ON sc.id = :scId
     WHERE u.email IS NOT NULL
       AND u.role IN ('Supplier Admin', 'Supplier Staff')
       AND (u.id = sc.owner_id OR u.supplier_company_id = :scId)`,
    { replacements: { scId: supplierCompanyId }, type: QueryTypes.SELECT }
  );
  return users.map(u => u.id);
}

module.exports = {
  sendNotification,
  sendNotificationBatch,
  resolveReceiverSmtp,
  resolveReceiverBranding,
  getSystemAdminIds,
  getBrandManagerIds,
  getFoodcourtManagerIds,
  getRestaurantOwnerIds,
  getSupplierAdminIds
};
