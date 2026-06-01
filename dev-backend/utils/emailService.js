const nodemailer = require('nodemailer');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { decrypt } = require('./encryption');
const { getLogoAttachment } = require('./emailTemplates');

/**
 * 바운스 처리: 발송 실패한 이메일의 bounce_count 증가
 * bounce_count >= 3이면 해당 이메일로는 발송 차단
 */
async function handleBounce(toEmail) {
  try {
    await sequelize.query(
      `UPDATE users SET email_bounce_count = COALESCE(email_bounce_count, 0) + 1 WHERE email = :email`,
      { replacements: { email: toEmail }, type: QueryTypes.UPDATE }
    );
  } catch (e) {
    console.error('Bounce count update failed:', e.message);
  }
}

/**
 * 발송 전 바운스 체크: bounce_count >= 3이면 발송 차단
 */
async function isEmailBlocked(toEmail) {
  try {
    const [result] = await sequelize.query(
      `SELECT email_bounce_count FROM users WHERE email = :email`,
      { replacements: { email: toEmail }, type: QueryTypes.SELECT }
    );
    return result && result.email_bounce_count >= 3;
  } catch (e) {
    return false;
  }
}

/**
 * Get email settings for a specific entity
 */
async function getEmailSettings(entityType, entityId) {
  try {
    const settings = await sequelize.query(
      `SELECT * FROM notification_settings
       WHERE entity_type = :entityType AND entity_id = :entityId AND email_enabled = 1`,
      {
        replacements: { entityType, entityId },
        type: QueryTypes.SELECT
      }
    );

    const setting = settings[0];

    if (setting && setting.smtp_host && setting.smtp_user && setting.smtp_password) {
      return setting;
    }

    const labels = { admin: 'the platform', brand: 'this brand', foodcourt: 'this foodcourt', restaurant: 'this restaurant', manager: 'this manager' };
    const entityLabel = labels[entityType] || entityType;
    throw new Error(`Email notifications are not configured for ${entityLabel}. Please configure SMTP settings in Notification Settings.`);
  } catch (error) {
    throw error;
  }
}

/**
 * Get platform-level email settings (entity_type='admin')
 */
async function getPlatformEmailSettings() {
  try {
    const settings = await sequelize.query(
      `SELECT * FROM notification_settings
       WHERE entity_type = 'admin' AND email_enabled = 1
       LIMIT 1`,
      { type: QueryTypes.SELECT }
    );

    const setting = settings[0];

    if (setting && setting.smtp_host && setting.smtp_user && setting.smtp_password) {
      return setting;
    }

    throw new Error('Platform email is not configured. Please configure SMTP settings in Admin > Notification Settings.');
  } catch (error) {
    throw error;
  }
}

/**
 * Create nodemailer transporter with SMTP settings
 */
function createTransporter(settings) {
  const transporter = nodemailer.createTransport({
    host: settings.smtp_host,
    port: settings.smtp_port || 587,
    secure: settings.smtp_secure || false,
    auth: {
      user: settings.smtp_user,
      pass: decrypt(settings.smtp_password)
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // 🔒 전송계층 가드 (단일 chokepoint) — 인증 안 됨/placeholder(example.com 등) 주소는
  // 어떤 발송 경로(sendEmail/sendPlatformEmail/sendIssuerEmail/sendTestEmail/인증메일/그 외)
  // 로도 SMTP 에 닿지 않는다. "인증 안 되는 메일은 안 보낸다"를 한 곳에서 강제.
  const _origSendMail = transporter.sendMail.bind(transporter);
  transporter.sendMail = async function (mailOptions) {
    try {
      const raw = mailOptions && mailOptions.to;
      const list = Array.isArray(raw) ? raw : (raw ? [raw] : []);
      // placeholder(example.com/pos-system.com 등)·형식오류 주소는 어떤 경로로도 발송 안 함.
      // (email_verified 강제는 인증메일이 신규주소에 못 가는 닭-달걀을 피하려 상위 플로우에서 처리.)
      const kept = list.filter(a => emailLooksValid(a));
      if (kept.length === 0) {
        console.log(`[email-guard:transport] 발송 차단 — placeholder/형식오류 수신자뿐. subject="${(mailOptions && mailOptions.subject) || ''}" to=${JSON.stringify(list)}`);
        return { skipped: true, accepted: [], rejected: list, reason: 'invalid-or-placeholder-recipient' };
      }
      if (mailOptions) mailOptions.to = Array.isArray(raw) ? kept : kept[0];
    } catch (e) { /* 가드 자체 실패 시 발송 흐름 유지 */ }
    return _origSendMail(mailOptions);
  };
  return transporter;
}

const isDev = process.env.NODE_ENV !== 'production';

// ============================================================
// 2026-06-01 발송 차단 가드 — 인증 안 된/유효하지 않은 주소로의 발송을
// 모든 메일 경로(sendPlatformEmail / sendIssuerEmail)에서 원천 중지.
// 그동안 가드는 notificationService.sendNotification 한 곳에만 있어서, 매장
// 가입 Welcome / 예약확인 / 비번재설정 등 sendPlatformEmail·sendIssuerEmail 직접
// 호출 경로(수십 곳)는 무방비였음 → 미인증 주소로 발송 시도 → 실패 → 바운스
// 알림이 관리자에게 쏟아짐. 공통 발송함수 2곳에 가드를 박아 전 경로 차단.
// ============================================================
const PLACEHOLDER_EMAIL_DOMAINS = new Set([
  'pos-system.com', 'example.com', 'example.org', 'example.net',
  'test.com', 'test.local', 'localhost', 'invalid', 'mailinator.com',
  'placeholder.com', 'demo.com', 'sample.com', 'noreply.com'
]);

function emailLooksValid(email) {
  if (!email || typeof email !== 'string') return false;
  const m = email.trim().toLowerCase().match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/);
  if (!m) return false;
  const domain = m[1];
  if (PLACEHOLDER_EMAIL_DOMAINS.has(domain)) return false;
  if (/\.(test|local|invalid|example)$/.test(domain)) return false;
  return true;
}

// 발송 직전 게이트. to 주소가 (1) 형식/placeholder 부적합 또는 (2) 그 주소를 가진
// 유저가 email_verified=false 면 발송 중지. 여러 수신자면 유효한 주소만 통과.
// 반환: { ok, to(필터된), reason }. 인증 여부 모르는 외부주소(유저 테이블에 없음)는
// verified 체크 통과(가입확인/초대 등 신규 주소 정상 발송 위해) — placeholder 만 거름.
async function screenRecipients(rawTo, opts = {}) {
  // allowUnverified: 인증메일 등 "미인증 주소에 닿아야 하는" 메일은 email_verified 체크를 건너뜀.
  // placeholder/형식오류 차단은 allowUnverified 여부와 무관하게 항상 적용(바운스 원천 차단).
  const allowUnverified = !!(opts && opts.allowUnverified);
  const list = Array.isArray(rawTo) ? rawTo : [rawTo];
  const kept = [];
  const dropped = [];
  for (const addr of list) {
    if (!emailLooksValid(addr)) { dropped.push({ addr, why: 'invalid/placeholder' }); continue; }
    if (allowUnverified) { kept.push(addr); continue; }
    // 유저 테이블에 있고 명시적으로 email_verified=false 면 차단.
    try {
      const rows = await sequelize.query(
        'SELECT email_verified FROM users WHERE email = :e LIMIT 1',
        { replacements: { e: addr }, type: QueryTypes.SELECT }
      );
      if (rows[0] && (rows[0].email_verified === false || rows[0].email_verified === 0)) {
        dropped.push({ addr, why: 'email_verified=false' });
        continue;
      }
    } catch (_e) { /* DB 조회 실패 시 막지 않음 — 발송 흐름 우선 */ }
    kept.push(addr);
  }
  return { ok: kept.length > 0, to: Array.isArray(rawTo) ? kept : kept[0], dropped };
}

/**
 * Send email for a specific entity
 */
async function sendEmail(entityType, entityId, mailOptions) {
  try {
    // 개발서버: 같은 dev-block 정책 적용. entity-level 이메일도 실수로 운영
    // 고객/레스토랑 메일함에 발송되지 않도록 SMTP 호출 자체를 skip.
    // DEV_SEND_ENTITY_EMAILS=true 인 경우에만 실제 발송 (이메일 흐름 디버깅용).
    if (isDev && process.env.DEV_SEND_ENTITY_EMAILS !== 'true') {
      const subj = mailOptions.subject || '(no subject)';
      const to = Array.isArray(mailOptions.to) ? mailOptions.to.join(', ') : mailOptions.to;
      console.log(`[dev-email-blocked] Entity email skipped (${entityType}/${entityId}): subject="${subj}" to="${to}". Set DEV_SEND_ENTITY_EMAILS=true to enable.`);
      return { success: true, skipped: true, reason: 'dev-environment' };
    }

    // 2026-06-01: 미인증/placeholder 주소 발송 차단 (entity 메일도 platform/issuer 와 동일 가드).
    // 이전엔 sendEmail 만 screenRecipients 를 안 타서 entity SMTP 경로로 잘못된 주소가 새어나갔음.
    const screenE = await screenRecipients(mailOptions.to, { allowUnverified: mailOptions.allowUnverified });
    if (!screenE.ok) {
      console.log(`[email-guard] Entity email NOT sent — no valid/verified recipient. ${entityType}/${entityId} subject="${mailOptions.subject || ''}" dropped=${JSON.stringify(screenE.dropped)}`);
      return { success: true, skipped: true, reason: 'unverified-or-invalid-recipient' };
    }
    mailOptions.to = screenE.to;

    if (mailOptions.to && await isEmailBlocked(mailOptions.to)) {
      console.log(`Email blocked (bounce count >= 3): ${mailOptions.to}`);
      return { success: false, blocked: true };
    }
    const settings = await getEmailSettings(entityType, entityId);
    const transporter = createTransporter(settings);

    const fromAddress = settings.from_email || settings.smtp_user;
    const fromFormatted = settings.from_name
      ? `"${settings.from_name}" <${fromAddress}>`
      : fromAddress;

    if (!mailOptions.from) {
      mailOptions.from = fromFormatted;
    }

    if (settings.reply_to_email && !mailOptions.replyTo) {
      mailOptions.replyTo = settings.reply_to_email;
    }

    // 개발서버: 제목에 [DEV] 표시
    if (isDev && mailOptions.subject) {
      mailOptions.subject = `[DEV] ${mailOptions.subject}`;
    }

    // 로고 CID 첨부 자동 추가
    if (mailOptions.html && mailOptions.html.includes('cid:purplehere-logo')) {
      mailOptions.attachments = [...(mailOptions.attachments || []), ...getLogoAttachment()];
    }

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error('Email sending error:', error);
    if (mailOptions.to) await handleBounce(mailOptions.to);
    throw error;
  }
}

/**
 * Send platform-level email (Welcome, Invoice, etc.)
 * Uses notification_settings with entity_type='admin'
 */
async function sendPlatformEmail(mailOptions) {
  try {
    // 개발서버: 운영 admin에게 실제 발송 차단 (test signup이 production admin 메일함을 폭격하는 것 방지).
    // 환경변수 DEV_SEND_PLATFORM_EMAILS=true 인 경우에만 실제 발송 (이메일 흐름 디버깅용).
    // 기본 동작: dev에서는 콘솔에 로그만 남기고 SMTP 호출 자체를 skip.
    if (isDev && process.env.DEV_SEND_PLATFORM_EMAILS !== 'true') {
      const subj = mailOptions.subject || '(no subject)';
      const to = Array.isArray(mailOptions.to) ? mailOptions.to.join(', ') : mailOptions.to;
      console.log(`[dev-email-blocked] Platform email skipped: subject="${subj}" to="${to}". Set DEV_SEND_PLATFORM_EMAILS=true to enable.`);
      return { success: true, skipped: true, reason: 'dev-environment' };
    }

    // 2026-06-01: 미인증/placeholder 주소 발송 차단 (모든 platform 메일 공통).
    const screenP = await screenRecipients(mailOptions.to, { allowUnverified: mailOptions.allowUnverified });
    if (!screenP.ok) {
      console.log(`[email-guard] Platform email NOT sent — no valid/verified recipient. subject="${mailOptions.subject || ''}" dropped=${JSON.stringify(screenP.dropped)}`);
      return { success: true, skipped: true, reason: 'unverified-or-invalid-recipient' };
    }
    mailOptions.to = screenP.to;
    if (screenP.dropped.length) {
      console.log(`[email-guard] Platform email dropped some recipients: ${JSON.stringify(screenP.dropped)}`);
    }

    // 바운스 체크: 3회 이상 실패한 이메일은 발송 차단
    if (mailOptions.to && await isEmailBlocked(mailOptions.to)) {
      console.log(`Email blocked (bounce count >= 3): ${mailOptions.to}`);
      return { success: false, blocked: true, message: 'Email address blocked due to repeated delivery failures' };
    }

    const settings = await getPlatformEmailSettings();
    const transporter = createTransporter(settings);

    const fromAddress = settings.from_email || settings.smtp_user;
    const fromFormatted = settings.from_name
      ? `"${settings.from_name}" <${fromAddress}>`
      : fromAddress;

    if (!mailOptions.from) {
      mailOptions.from = fromFormatted;
    }

    if (settings.reply_to_email && !mailOptions.replyTo) {
      mailOptions.replyTo = settings.reply_to_email;
    }

    // 개발서버: 제목에 [DEV] 표시
    if (isDev && mailOptions.subject) {
      mailOptions.subject = `[DEV] ${mailOptions.subject}`;
    }

    // 로고 CID 첨부 자동 추가
    if (mailOptions.html && mailOptions.html.includes('cid:purplehere-logo')) {
      mailOptions.attachments = [...(mailOptions.attachments || []), ...getLogoAttachment()];
    }

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error('Platform email sending error:', error);
    // 바운스 카운트 증가
    if (mailOptions.to) {
      await handleBounce(mailOptions.to);
    }
    throw error;
  }
}

/**
 * Send test email
 */
async function sendTestEmail(entityType, entityId, testEmail) {
  const { emailLayout } = require('./emailTemplates');

  const bodyContent = `
    <h2 style="color:#0A2540;font-size:20px;font-weight:600;margin:0 0 16px;">SMTP Configuration Test</h2>
    <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 20px;">This is a test email from your PurpleHere notification system.</p>
    <div style="background:#ECFDF5;padding:16px;border-radius:8px;margin:0 0 20px;border-left:4px solid #10B981;">
      <p style="color:#059669;font-size:14px;margin:0;font-weight:600;">SMTP configuration is working correctly!</p>
    </div>
    <p style="color:#9CA3AF;font-size:12px;margin:0;">Entity: ${entityType} / ID: ${entityId}</p>`;

  const mailOptions = {
    to: testEmail,
    subject: 'Test Email from PurpleHere',
    html: emailLayout(bodyContent),
    text: `SMTP Configuration Test\n\nThis is a test email from your PurpleHere notification system.\nSMTP configuration is working correctly!\n\nEntity: ${entityType} / ID: ${entityId}`
  };

  return await sendEmail(entityType, entityId, mailOptions);
}

/**
 * Get email settings for an invoice issuer
 * Maps issuer_type to the correct notification_settings entity_type
 * - system_admin → entity_type='admin' (any admin user)
 * - brand → entity_type='brand', entity_id=brandId
 * - foodcourt → entity_type='foodcourt', entity_id=foodcourtId
 */
async function getIssuerEmailSettings(issuerType, issuerId) {
  let entityType;
  let entityId;

  switch (issuerType) {
    case 'system_admin':
      entityType = 'admin';
      entityId = null;
      break;
    case 'brand':
      entityType = 'brand';
      entityId = issuerId;
      break;
    case 'foodcourt':
      entityType = 'foodcourt';
      entityId = issuerId;
      break;
    default:
      throw new Error(`Unknown issuer type: ${issuerType}`);
  }

  // For system_admin, find any admin setting (no specific entity_id)
  if (entityType === 'admin') {
    return await getPlatformEmailSettings();
  }

  return await getEmailSettings(entityType, entityId);
}

/**
 * Send email as a specific issuer (system_admin, brand, or foodcourt)
 * Automatically selects the correct SMTP settings based on issuer type
 *
 * @param {string} issuerType - 'system_admin', 'brand', or 'foodcourt'
 * @param {number|null} issuerId - Brand ID or Foodcourt ID (null for system_admin)
 * @param {object} mailOptions - nodemailer mail options (to, subject, html, text, etc.)
 */
async function sendIssuerEmail(issuerType, issuerId, mailOptions) {
  try {
    // 개발서버: 같은 dev-block 정책. issuer(brand/foodcourt) SMTP 통한
    // 고객 인보이스/주문 알림 메일이 운영 받는사람 메일함에 가는 것 방지.
    if (isDev && process.env.DEV_SEND_ENTITY_EMAILS !== 'true') {
      const subj = mailOptions.subject || '(no subject)';
      const to = Array.isArray(mailOptions.to) ? mailOptions.to.join(', ') : mailOptions.to;
      console.log(`[dev-email-blocked] Issuer email skipped (${issuerType}/${issuerId}): subject="${subj}" to="${to}". Set DEV_SEND_ENTITY_EMAILS=true to enable.`);
      return { success: true, skipped: true, reason: 'dev-environment' };
    }

    // 2026-06-01: 미인증/placeholder 주소 발송 차단 (모든 issuer 메일 공통).
    const screenI = await screenRecipients(mailOptions.to, { allowUnverified: mailOptions.allowUnverified });
    if (!screenI.ok) {
      console.log(`[email-guard] Issuer email NOT sent — no valid/verified recipient. subject="${mailOptions.subject || ''}" dropped=${JSON.stringify(screenI.dropped)}`);
      return { success: true, skipped: true, reason: 'unverified-or-invalid-recipient' };
    }
    mailOptions.to = screenI.to;
    if (screenI.dropped.length) {
      console.log(`[email-guard] Issuer email dropped some recipients: ${JSON.stringify(screenI.dropped)}`);
    }

    if (mailOptions.to && await isEmailBlocked(mailOptions.to)) {
      console.log(`Email blocked (bounce count >= 3): ${mailOptions.to}`);
      return { success: false, blocked: true };
    }
    const settings = await getIssuerEmailSettings(issuerType, issuerId);
    const transporter = createTransporter(settings);

    if (!mailOptions.from) {
      mailOptions.from = settings.from_name
        ? `"${settings.from_name}" <${settings.from_email}>`
        : settings.from_email;
    }

    if (settings.reply_to_email && !mailOptions.replyTo) {
      mailOptions.replyTo = settings.reply_to_email;
    }

    // 로고 CID 첨부 자동 추가
    if (mailOptions.html && mailOptions.html.includes('cid:purplehere-logo')) {
      mailOptions.attachments = [...(mailOptions.attachments || []), ...getLogoAttachment()];
    }

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error(`Issuer email sending error (${issuerType}/${issuerId}):`, error);
    if (mailOptions.to) await handleBounce(mailOptions.to);
    throw error;
  }
}

/**
 * Verify SMTP connection
 */
async function verifyConnection(settings) {
  try {
    const transporter = createTransporter(settings);
    await transporter.verify();
    return { success: true, message: 'SMTP connection verified successfully' };
  } catch (error) {
    console.error('SMTP verification error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Try entity SMTP first; on "not configured", transparently fall back to platform SMTP.
 * Other errors (network, auth failure, etc.) are re-thrown.
 *
 * 사용처 예: 고객 비밀번호 리셋 — 레스토랑 SMTP 있으면 그걸, 없으면 플랫폼 help@purplehere.com.
 *
 * @param {string} entityType - 'restaurant' | 'brand' | 'foodcourt' | ...
 * @param {number} entityId
 * @param {object} mailOptions - nodemailer options (to, subject, html, text, attachments)
 * @returns {Promise<{success, via:'entity'|'platform', ...}>}
 */
async function sendEntityOrPlatformEmail(entityType, entityId, mailOptions) {
  try {
    const result = await sendEmail(entityType, entityId, mailOptions);
    return { ...result, via: 'entity' };
  } catch (err) {
    const msg = String(err && err.message || '');
    const notConfigured = /not configured/i.test(msg);
    if (!notConfigured) {
      throw err;
    }
    console.log(`[EmailFallback] ${entityType}#${entityId} SMTP not configured → platform fallback`);
    const result = await sendPlatformEmail(mailOptions);
    return { ...result, via: 'platform' };
  }
}

module.exports = {
  getEmailSettings,
  getPlatformEmailSettings,
  getIssuerEmailSettings,
  createTransporter,
  sendEmail,
  sendPlatformEmail,
  sendEntityOrPlatformEmail,
  sendIssuerEmail,
  sendTestEmail,
  verifyConnection
};
