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
    case 'Supplier Admin': {
      // Supplier Admin → 자기 supplier_company 의 entity SMTP 우선.
      // notification_settings.entity_type='supplier_company' 등록 시 동작. 없으면 platform fallback.
      try {
        const sup = await sequelize.query(
          `SELECT id FROM supplier_companies WHERE owner_id = :uid LIMIT 1`,
          { replacements: { uid: user.id }, type: QueryTypes.SELECT }
        );
        if (sup[0]?.id) {
          entityType = 'supplier_company';
          entityId = sup[0].id;
        } else {
          entityType = null;
        }
      } catch {
        entityType = null;
      }
      break;
    }
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

// 2026-05-31 invalid-recipient gates — added after operations noticed Gmail
// "delivery failure" retry notifications flooding the admin inbox for 47h.
// Root causes were (a) System Admin email left at the placeholder
// `admin@pos-system.com`, (b) demo / test restaurants with synthetic emails
// receiving real production notifications, (c) unverified emails getting
// notifications they never opted into. We skip outbound mail entirely in
// these cases. See `project_thefire_settings_wipe` & memory notes.
const PLACEHOLDER_EMAIL_DOMAINS = new Set([
  'pos-system.com', 'example.com', 'example.org', 'example.net',
  'test.com', 'test.local', 'localhost', 'invalid', 'mailinator.com',
  'placeholder.com', 'demo.com', 'sample.com', 'noreply.com'
]);

function _emailLooksValid(email) {
  if (!email || typeof email !== 'string') return false;
  const m = email.trim().toLowerCase().match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/);
  if (!m) return false;
  const domain = m[1];
  if (PLACEHOLDER_EMAIL_DOMAINS.has(domain)) return false;
  // Common "fake" suffixes
  if (/\.(test|local|invalid|example)$/.test(domain)) return false;
  return true;
}

async function _restaurantIsDemoOrTest(restaurantId) {
  if (!restaurantId) return false;
  try {
    const row = await sequelize.query(
      'SELECT is_demo, is_test FROM restaurants WHERE id = :id LIMIT 1',
      { replacements: { id: restaurantId }, type: QueryTypes.SELECT }
    );
    const r = row[0];
    if (!r) return false;
    return r.is_demo === true || r.is_demo === 1 || r.is_test === true || r.is_test === 1;
  } catch { return false; }
}

/**
 * 단일 수신자 발송.
 *
 * `mailOptions` 는 **완성된 객체**이거나 **`(user) => mailOptions` 팩토리**다(2026-08-30 추가).
 * 팩토리는 수신자별 렌더가 필요할 때 쓴다 — 예: 발주 메일이 수신자 `preferred_language` 로 본문·제목을 만든다.
 * 기존 21개 호출부는 객체를 그대로 넘기므로 **바이트 단위로 기존 경로**를 탄다(추가형).
 */
async function sendNotification(recipientUserId, category, mailOptions) {
  try {
    // 1. Get recipient user
    const user = await User.findByPk(recipientUserId);
    if (!user || !user.email) {
      console.log(`[Notification] Skip: user ${recipientUserId} not found or no email`);
      return;
    }

    // 1-a0. Reject deactivated accounts. 수신자 해석 함수 5개와 자체 배열을 만드는
    //       호출부(notices/qz-tray/supplier 등) 전부가 이 함수로 수렴하므로, 관문을
    //       여기 하나만 두면 21개 호출부가 모두 덮인다(쿼리에 심으면 자체 배열 경로가 샌다).
    //       ⚠ null/undefined 는 **활성으로 취급**한다 — is_active 는 2026-06-16 신설 컬럼이라
    //       null 을 비활성으로 읽으면 그 이전 계정들의 알림이 통째로 침묵한다.
    if (user.is_active === false || user.is_active === 0) {
      console.log(`[Notification] Skip: user ${recipientUserId} inactive (${user.email})`);
      return;
    }

    // 1-a. Reject unverified emails. Marketing / system notifications shouldn't
    //      hit addresses the user never confirmed they own.
    if (user.email_verified === false || user.email_verified === 0) {
      console.log(`[Notification] Skip: user ${recipientUserId} email not verified (${user.email})`);
      return;
    }

    // 1-a2. Reject test / demo seed accounts. Their synthetic @purplehere.com
    //       addresses have no real mailbox → Gmail bounces flood the sender.
    //       The 1-c restaurant gate below only catches restaurant-bound users;
    //       Owner / Brand General / Foodcourt General / Supplier Admin accounts
    //       have restaurant_id = NULL so it never fires for them. The is_test
    //       flag is the reliable signal. Mirrors emailService.screenRecipients.
    if (user.is_test === true || user.is_test === 1) {
      console.log(`[Notification] Skip: user ${recipientUserId} is_test account (${user.email})`);
      return;
    }

    // 1-b. Reject syntactically bogus / placeholder-domain emails. Gmail will
    //      bounce these and we end up flooding the admin with retry warnings.
    if (!_emailLooksValid(user.email)) {
      console.log(`[Notification] Skip: user ${recipientUserId} email invalid/placeholder (${user.email})`);
      return;
    }

    // 1-c. Reject demo / test restaurant recipients. These accounts exist for
    //      QA only and their addresses are typically synthetic.
    if (user.restaurant_id && await _restaurantIsDemoOrTest(user.restaurant_id)) {
      console.log(`[Notification] Skip: user ${recipientUserId} belongs to demo/test restaurant ${user.restaurant_id}`);
      return;
    }

    // 2. Check preference
    const prefs = user.notification_preferences; // null = all enabled
    if (prefs && prefs[category] === false) {
      console.log(`[Notification] Skip: user ${recipientUserId} disabled '${category}'`);
      return;
    }

    // 2-b. 수신자별 렌더 (팩토리 전달 시).
    //   **관문을 다 통과한 뒤**에 부른다 — skip 될 수신자를 위해 렌더하지 않는다(비용·로그 오염 방지).
    //   팩토리가 던지면 **그 수신자만** 건너뛴다. 배치 전체를 죽이지 않는다(수신자별 격리).
    if (typeof mailOptions === 'function') {
      try {
        mailOptions = await mailOptions(user);
      } catch (e) {
        console.log(`[Notification] Skip: user ${recipientUserId} render failed (${e.message})`);
        return;
      }
      if (!mailOptions) {
        console.log(`[Notification] Skip: user ${recipientUserId} render returned empty`);
        return;
      }
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

    // 첨부 정책 — 깨진 로고("?") 방지를 위해 "실제 렌더된 html 이 참조하는 cid" 기준으로 첨부:
    //  - 브랜드 로고: html 이 branding 으로 재렌더된 경우(=_title/_body 메타 보유)만 첨부.
    //    재렌더 안 된 메일에 브랜드 로고를 붙이면 cid 불일치(unreferenced)로 하단에 떠버린다.
    //  - PurpleHere 로고: 최종 html 이 cid:purplehere-logo 를 참조하면 branding 유무와 무관하게
    //    항상 첨부. (PO 알림처럼 render-meta 없이 만든 메일은 branding 수신자라도 재렌더가 안 돼
    //    cid:purplehere-logo 가 남는데, 옛 `!branding` 가드가 이때 첨부를 건너뛰어 로고가 깨졌음.)
    //  - 기존 cleanOptions.attachments 는 그대로 유지 (caller 가 명시적으로 넣은 것)
    let finalAttachments = [...(cleanOptions.attachments || [])];
    const reRenderedWithBranding = !!(branding && _title && _body);
    if (reRenderedWithBranding && branding?.logoAttachment) {
      finalAttachments.push(...branding.logoAttachment);
    }
    if (renderedHtml && renderedHtml.includes('cid:purplehere-logo')
        && !finalAttachments.some(a => a && a.cid === 'purplehere-logo')) {
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
 * @param {object|function} mailOptions - { subject, html, text } 또는 (user) => 그 객체.
 *   몸통이 map 이라 팩토리도 그대로 각 수신자에게 전달된다(수정 불필요).
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
  // 축이 둘이다:
  //   ① users.brand_id — 그 브랜드에 배정된 관리자
  //   ② brands.owner_id — 그 브랜드의 소유자
  // 예전엔 ①만 봐서, **브랜드를 여러 개 가진 소유자가 첫 브랜드에서만 잡혔다.**
  // 실측(2026-08-30 dev): user 6 이 brands 1·2·4 를 소유하는데 users.brand_id=1 이라
  // brand 2 는 소유자 누락, brand 4·17·33 은 **수신자 0명**이었다.
  // 소유자 레그에 role 조건을 걸지 않는 이유 — 소유가 곧 수신 자격이고, 실제로
  // brand 33 소유자는 users.brand_id 가 null 이었다.
  const users = await sequelize.query(
    `SELECT DISTINCT u.id FROM users u
     WHERE u.email IS NOT NULL AND (
       (u.brand_id = :brandId AND u.role IN ('Brand General', 'Brand Manager'))
       OR u.id IN (SELECT owner_id FROM brands WHERE id = :brandId AND owner_id IS NOT NULL)
     )`,
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
