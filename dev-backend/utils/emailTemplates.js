/**
 * Email Templates for PurpleHere POS
 * - welcomeEmail: Sent when a new restaurant is created with admin
 * - invoiceEmail: Sent when a POS subscription invoice is generated (system_admin)
 * - entityPlanInvoiceEmail: Sent when a brand/foodcourt plan invoice is generated
 *
 * Templates support issuer branding (logo, name, color) via issuerInfo parameter.
 */

// 로고: 모바일 이메일 클라이언트 호환을 위해 공개 URL 사용 (base64 인라인은 Gmail 모바일 등에서 차단됨)
const PLATFORM_LOGO_URL = (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com') + '/images/logo-email.png';

/**
 * Get logo attachment for CID embedding in emails (레거시 호환용 — URL 방식에서는 불필요)
 * @returns {Array} nodemailer attachments array
 */
function getLogoAttachment() {
  const path = require('path');
  const logoPath = path.join(__dirname, '..', 'assets', 'logo-email.png');
  try {
    require('fs').accessSync(logoPath);
    return [{
      filename: 'logo-email.png',
      path: logoPath,
      cid: 'purplehere-logo',
      contentDisposition: 'inline'
    }];
  } catch (e) {
    return [];
  }
}

/**
 * Base email layout with optional issuer branding
 * Clean, modern design: light header + color logo + accent on CTA only
 * @param {string} bodyContent - HTML body content
 * @param {Object} [issuerInfo] - Optional issuer branding
 * @param {string} [lang='en'] - Language code for footer text
 */
function emailLayout(bodyContent, issuerInfo, lang) {
  const { getEmailText } = require('./i18n');
  const emailLang = lang || 'en';
  const hasIssuer = !!(issuerInfo && issuerInfo.name);
  const brandName = issuerInfo?.name || 'PurpleHere';
  const brandColor = issuerInfo?.color || '#635BFF';
  const platformUrl = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

  // 로고 렌더 규칙:
  // - hasIssuer + logoUrl 있음 → pre-resized img, 링크 없음 (PurpleHere 노출 방지)
  // - hasIssuer + logoUrl 없음 → 브랜드 이름 텍스트, 링크 없음
  // - hasIssuer 없음 (PurpleHere 기본) → CID 로고 + purplehere.com 링크
  //
  // entity branding 에서는 PurpleHere 링크/도메인이 노출되지 않도록 전부 제거.
  // entity website 가 있으면 그 링크를 쓸 수도 있지만, 혼선 방지 위해 로고는 plain img.
  let logoHtml;
  if (hasIssuer) {
    if (issuerInfo.logoUrl) {
      const w = issuerInfo.logoWidth || 160;
      const h = issuerInfo.logoHeight || 40;
      logoHtml = `<img src="${issuerInfo.logoUrl}" alt="${brandName}" width="${w}" height="${h}" style="display:block;width:${w}px;height:${h}px;border:0;outline:none;" />`;
    } else {
      logoHtml = `<span style="display:inline-block;font-size:20px;font-weight:700;color:#0A2540;letter-spacing:-0.3px;">${brandName}</span>`;
    }
  } else {
    logoHtml = `<a href="${platformUrl}" style="text-decoration:none;"><img src="cid:purplehere-logo" alt="PurpleHere" height="32" style="display:block;height:32px;border:0;outline:none;text-decoration:none;" /></a>`;
  }

  const footerText = issuerInfo?.companyName || issuerInfo?.name || 'PurpleHere POS System';
  const footerUrl = issuerInfo?.website || platformUrl;
  const footerDomain = issuerInfo?.website ? issuerInfo.website.replace(/^https?:\/\//, '') : platformUrl.replace(/^https?:\/\//, '');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName}</title>
</head>
<body style="margin:0;padding:0;background:#F4F5F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F5F7;padding:40px 20px;">
    <tr><td align="center">
      <!-- Accent top bar -->
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="height:4px;background-color:${brandColor};border-radius:8px 8px 0 0;font-size:0;line-height:0;">&nbsp;</td></tr>
      </table>
      <!-- Main card -->
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:0 0 8px 8px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
        <!-- Logo header (항상 좌측 정렬) -->
        <tr><td align="left" style="padding:28px 32px 20px;border-bottom:1px solid #EEEEF0;text-align:left;">
          ${logoHtml}
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px;">
          ${bodyContent}
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 32px;border-top:1px solid #EEEEF0;">
          <p style="margin:0;color:#9CA3AF;font-size:12px;line-height:1.6;text-align:center;">
            ${getEmailText(emailLang, 'footer.automated', { company: footerText })}${hasIssuer ? '' : '<br><a href="' + platformUrl + '/notification-preferences" style="color:#6B7280;text-decoration:underline;">' + getEmailText(emailLang, 'footer.managePreferences') + '</a><br><a href="' + platformUrl + '" style="color:#6B7280;text-decoration:none;">' + platformUrl.replace(/^https?:\/\//, '') + '</a>'}${hasIssuer && issuerInfo.website ? '<br><a href="' + issuerInfo.website + '" style="color:#6B7280;text-decoration:none;">' + issuerInfo.website.replace(/^https?:\/\//, '') + '</a>' : ''}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * Welcome Email Template
 * @param {Object} data
 * @param {string} data.adminName
 * @param {string} data.restaurantName
 * @param {string} data.email
 * @param {string} data.username
 * @param {string|null} data.temporaryPassword
 * @param {string} data.planType
 * @param {string} data.dashboardUrl
 * @param {Object} [data.issuerInfo] - Optional issuer branding
 */
function welcomeEmail(data) {
  const { adminName, restaurantName, email, username, temporaryPassword, planType, dashboardUrl, issuerInfo } = data;
  const brandColor = issuerInfo?.color || '#635BFF';

  const credentialsBlock = temporaryPassword
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
        <tr><td style="background:#F0EDFF;border-radius:8px;padding:20px;">
          <p style="margin:0 0 8px;font-weight:600;color:#0A2540;">Your Login Credentials</p>
          <p style="margin:0;color:#4B5563;font-size:14px;">
            Email: <strong>${email}</strong><br>
            Username: <strong>${username}</strong><br>
            Temporary Password: <strong>${temporaryPassword}</strong>
          </p>
          <p style="margin:12px 0 0;color:#EF4444;font-size:13px;">Please change your password after your first login.</p>
        </td></tr>
      </table>`
    : `<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
        <tr><td style="background:#F0EDFF;border-radius:8px;padding:20px;">
          <p style="margin:0 0 8px;font-weight:600;color:#0A2540;">Your Account</p>
          <p style="margin:0;color:#4B5563;font-size:14px;">
            Email: <strong>${email}</strong><br>
            Username: <strong>${username}</strong>
          </p>
          <p style="margin:12px 0 0;color:#6B7C93;font-size:13px;">Use your existing password to log in.</p>
        </td></tr>
      </table>`;

  const bodyContent = `
    <h2 style="margin:0 0 8px;color:#0A2540;font-size:20px;">Welcome to ${issuerInfo?.name || 'PurpleHere'}!</h2>
    <p style="color:#4B5563;font-size:15px;line-height:1.6;">
      Hi ${adminName},
    </p>
    <p style="color:#4B5563;font-size:15px;line-height:1.6;">
      Your restaurant <strong>${restaurantName}</strong> has been set up${issuerInfo?.name ? ' on ' + issuerInfo.name : ''} with the <strong>${planType}</strong>.
    </p>
    ${credentialsBlock}
    <h3 style="margin:24px 0 12px;color:#0A2540;font-size:16px;">Getting Started</h3>
    <ol style="color:#4B5563;font-size:14px;line-height:1.8;padding-left:20px;">
      <li>Log in to your dashboard</li>
      <li>Set up your menu items and categories</li>
      <li>Configure your restaurant settings (payment methods, table numbers, operating hours)</li>
      <li>Add your staff accounts</li>
      <li>Start taking orders</li>
    </ol>
    <div style="text-align:center;margin:28px 0 12px;">
      <a href="${dashboardUrl}" style="display:inline-block;background:${brandColor};color:white;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">
        Go to Dashboard
      </a>
    </div>`;

  const subject = `Welcome to ${issuerInfo?.name || 'PurpleHere'} - ${restaurantName}`;

  const text = [
    `Welcome to ${issuerInfo?.name || 'PurpleHere'}!`,
    ``,
    `Hi ${adminName},`,
    ``,
    `Your restaurant "${restaurantName}" has been set up with the ${planType}.`,
    ``,
    temporaryPassword
      ? `Login Credentials:\nEmail: ${email}\nUsername: ${username}\nTemporary Password: ${temporaryPassword}\nPlease change your password after first login.`
      : `Your Account:\nEmail: ${email}\nUsername: ${username}\nUse your existing password to log in.`,
    ``,
    `Getting Started:`,
    `1. Log in to your dashboard: ${dashboardUrl}`,
    `2. Set up your menu items and categories`,
    `3. Configure restaurant settings`,
    `4. Add staff accounts`,
    `5. Start taking orders`
  ].join('\n');

  return { subject, html: emailLayout(bodyContent, issuerInfo), text };
}

/**
 * POS Subscription Invoice Email Template (system_admin issuer)
 * @param {Object} data
 * @param {string} data.adminName
 * @param {string} data.restaurantName
 * @param {string} data.invoiceNumber
 * @param {string} data.planType
 * @param {string} data.billingCycle
 * @param {number} data.subtotal
 * @param {number} data.taxRate
 * @param {number} data.taxAmount
 * @param {number} data.totalAmount
 * @param {string} data.currency
 * @param {string} data.billingPeriodStart
 * @param {string} data.billingPeriodEnd
 * @param {string} data.dueDate
 * @param {string} data.dashboardUrl
 * @param {Object} [data.issuerInfo] - Optional issuer branding
 */
function invoiceEmail(data) {
  const {
    adminName, restaurantName, invoiceNumber, planType, billingCycle,
    subtotal, taxRate, taxAmount, totalAmount, currency,
    billingPeriodStart, billingPeriodEnd, dueDate, dashboardUrl, issuerInfo
  } = data;

  const sym = (currency === 'MYR' || currency === 'RM') ? 'RM' : currency;
  const brandColor = issuerInfo?.color || '#635BFF';
  const issuerName = issuerInfo?.name || 'PurpleHere POS';

  const bodyContent = `
    <h2 style="margin:0 0 8px;color:#0A2540;font-size:20px;">Invoice for ${restaurantName}</h2>
    <p style="color:#4B5563;font-size:15px;line-height:1.6;">
      Hi ${adminName},
    </p>
    <p style="color:#4B5563;font-size:15px;line-height:1.6;">
      A new invoice has been generated for your ${issuerName} subscription.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:8px;margin:20px 0;border:1px solid #E6EBF1;">
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid #E6EBF1;">
          <span style="color:#6B7C93;font-size:13px;">Invoice Number</span><br>
          <strong style="color:#0A2540;font-size:15px;">${invoiceNumber}</strong>
        </td>
        <td style="padding:16px 20px;border-bottom:1px solid #E6EBF1;text-align:right;">
          <span style="color:#6B7C93;font-size:13px;">Due Date</span><br>
          <strong style="color:#0A2540;font-size:15px;">${dueDate}</strong>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:16px 20px;border-bottom:1px solid #E6EBF1;">
          <span style="color:#6B7C93;font-size:13px;">Billing Period</span><br>
          <strong style="color:#0A2540;font-size:14px;">${billingPeriodStart} - ${billingPeriodEnd}</strong>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 20px;">
          <span style="color:#4B5563;font-size:14px;">${planType} - ${billingCycle} Subscription</span>
        </td>
        <td style="padding:12px 20px;text-align:right;">
          <span style="color:#0A2540;font-size:14px;">${sym} ${subtotal.toFixed(2)}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 20px;">
          <span style="color:#6B7C93;font-size:13px;">Tax (${taxRate}%)</span>
        </td>
        <td style="padding:8px 20px;text-align:right;">
          <span style="color:#6B7C93;font-size:13px;">${sym} ${taxAmount.toFixed(2)}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px;border-top:2px solid ${brandColor};">
          <strong style="color:#0A2540;font-size:16px;">Total</strong>
        </td>
        <td style="padding:16px 20px;border-top:2px solid ${brandColor};text-align:right;">
          <strong style="color:${brandColor};font-size:18px;">${sym} ${totalAmount.toFixed(2)}</strong>
        </td>
      </tr>
    </table>
    <div style="text-align:center;margin:28px 0 12px;">
      <a href="${dashboardUrl}" style="display:inline-block;background:${brandColor};color:white;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">
        View Invoice
      </a>
    </div>`;

  const subject = `Invoice ${invoiceNumber} - ${issuerName}`;

  const text = [
    `Invoice for ${restaurantName}`,
    ``,
    `Hi ${adminName},`,
    ``,
    `A new invoice has been generated for your ${issuerName} subscription.`,
    ``,
    `Invoice Number: ${invoiceNumber}`,
    `Due Date: ${dueDate}`,
    `Billing Period: ${billingPeriodStart} - ${billingPeriodEnd}`,
    ``,
    `${planType} - ${billingCycle} Subscription: ${sym} ${subtotal.toFixed(2)}`,
    `Tax (${taxRate}%): ${sym} ${taxAmount.toFixed(2)}`,
    `Total: ${sym} ${totalAmount.toFixed(2)}`,
    ``,
    `View invoice: ${dashboardUrl}`
  ].join('\n');

  return { subject, html: emailLayout(bodyContent, issuerInfo), text };
}

/**
 * Entity Plan Invoice Email Template (brand/foodcourt issuer)
 * Supports multiple line items (subscription fee, royalty, rent)
 * @param {Object} data
 * @param {string} data.recipientName - Recipient name (Restaurant Admin)
 * @param {string} data.restaurantName
 * @param {string} data.invoiceNumber
 * @param {string} data.planName - Entity plan name
 * @param {Array} data.items - [{description, calculated_amount, tax_amount, total_amount}]
 * @param {number} data.subtotal
 * @param {number} data.taxAmount
 * @param {number} data.totalAmount
 * @param {string} data.currency
 * @param {string} data.billingPeriodStart
 * @param {string} data.billingPeriodEnd
 * @param {string} data.dueDate
 * @param {number} [data.revenue] - Restaurant revenue for the period
 * @param {string} data.dashboardUrl
 * @param {Object} [data.issuerInfo] - Issuer branding
 */
function entityPlanInvoiceEmail(data) {
  const {
    recipientName, restaurantName, invoiceNumber, planName,
    items, subtotal, taxAmount, totalAmount, currency,
    billingPeriodStart, billingPeriodEnd, dueDate, revenue,
    dashboardUrl, issuerInfo
  } = data;

  const sym = (currency === 'MYR' || currency === 'RM') ? 'RM' : currency;
  const brandColor = issuerInfo?.color || '#635BFF';
  const issuerName = issuerInfo?.name || 'PurpleHere';

  // Build items HTML rows
  const itemRows = (items || []).map(item => `
      <tr>
        <td style="padding:10px 20px;border-bottom:1px solid #F3F4F6;">
          <span style="color:#4B5563;font-size:14px;">${item.description}</span>
        </td>
        <td style="padding:10px 20px;border-bottom:1px solid #F3F4F6;text-align:right;">
          <span style="color:#0A2540;font-size:14px;">${sym} ${parseFloat(item.calculated_amount).toFixed(2)}</span>
        </td>
      </tr>`).join('');

  const revenueBlock = revenue !== undefined && revenue !== null
    ? `<tr>
        <td colspan="2" style="padding:12px 20px;border-bottom:1px solid #E6EBF1;background:#F0FDF4;">
          <span style="color:#059669;font-size:13px;">Period Revenue: <strong>${sym} ${parseFloat(revenue).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></span>
        </td>
      </tr>`
    : '';

  const bodyContent = `
    <h2 style="margin:0 0 8px;color:#0A2540;font-size:20px;">Invoice for ${restaurantName}</h2>
    <p style="color:#4B5563;font-size:15px;line-height:1.6;">
      Hi ${recipientName},
    </p>
    <p style="color:#4B5563;font-size:15px;line-height:1.6;">
      A new invoice has been generated by <strong>${issuerName}</strong> for the <strong>${planName}</strong> plan.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:8px;margin:20px 0;border:1px solid #E6EBF1;">
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid #E6EBF1;">
          <span style="color:#6B7C93;font-size:13px;">Invoice Number</span><br>
          <strong style="color:#0A2540;font-size:15px;">${invoiceNumber}</strong>
        </td>
        <td style="padding:16px 20px;border-bottom:1px solid #E6EBF1;text-align:right;">
          <span style="color:#6B7C93;font-size:13px;">Due Date</span><br>
          <strong style="color:#0A2540;font-size:15px;">${dueDate}</strong>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:16px 20px;border-bottom:1px solid #E6EBF1;">
          <span style="color:#6B7C93;font-size:13px;">Billing Period</span><br>
          <strong style="color:#0A2540;font-size:14px;">${billingPeriodStart} - ${billingPeriodEnd}</strong>
        </td>
      </tr>
      ${revenueBlock}
      ${itemRows}
      <tr>
        <td style="padding:8px 20px;">
          <span style="color:#6B7C93;font-size:13px;">Tax</span>
        </td>
        <td style="padding:8px 20px;text-align:right;">
          <span style="color:#6B7C93;font-size:13px;">${sym} ${taxAmount.toFixed(2)}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px;border-top:2px solid ${brandColor};">
          <strong style="color:#0A2540;font-size:16px;">Total</strong>
        </td>
        <td style="padding:16px 20px;border-top:2px solid ${brandColor};text-align:right;">
          <strong style="color:${brandColor};font-size:18px;">${sym} ${totalAmount.toFixed(2)}</strong>
        </td>
      </tr>
    </table>
    <div style="text-align:center;margin:28px 0 12px;">
      <a href="${dashboardUrl}" style="display:inline-block;background:${brandColor};color:white;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">
        View Invoice
      </a>
    </div>`;

  const subject = `Invoice ${invoiceNumber} - ${issuerName}`;

  // Build plain text items
  const itemsText = (items || []).map(item =>
    `${item.description}: ${sym} ${parseFloat(item.calculated_amount).toFixed(2)}`
  ).join('\n');

  const text = [
    `Invoice for ${restaurantName}`,
    ``,
    `Hi ${recipientName},`,
    ``,
    `A new invoice has been generated by ${issuerName} for the ${planName} plan.`,
    ``,
    `Invoice Number: ${invoiceNumber}`,
    `Due Date: ${dueDate}`,
    `Billing Period: ${billingPeriodStart} - ${billingPeriodEnd}`,
    revenue !== undefined ? `Period Revenue: ${sym} ${parseFloat(revenue).toFixed(2)}` : '',
    ``,
    itemsText,
    `Tax: ${sym} ${taxAmount.toFixed(2)}`,
    `Total: ${sym} ${totalAmount.toFixed(2)}`,
    ``,
    `View invoice: ${dashboardUrl}`
  ].filter(Boolean).join('\n');

  return { subject, html: emailLayout(bodyContent, issuerInfo), text };
}

/**
 * Signup Welcome Email Template
 * Sent when a user self-registers via /signup
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.email
 * @param {string} data.username
 * @param {string} data.role - Display role (e.g., 'Restaurant', 'Brand', 'Food Court', 'Owner')
 * @param {string} data.entityName - Restaurant/Brand/Foodcourt/Company name
 * @param {string} data.planName - Selected plan name
 * @param {string} data.billingCycle - 'monthly' or 'annual'
 * @param {number} data.trialDays - Trial period in days
 * @param {string} data.dashboardUrl
 */
function signupWelcomeEmail(data) {
  const {
    fullName, email, username, role, entityName,
    planName, billingCycle, trialDays, dashboardUrl
  } = data;

  const brandColor = '#635BFF';

  const bodyContent = `
    <h2 style="margin:0 0 8px;color:#0A2540;font-size:20px;">Welcome to PurpleHere!</h2>
    <p style="color:#4B5563;font-size:15px;line-height:1.6;">
      Hi ${fullName},
    </p>
    <p style="color:#4B5563;font-size:15px;line-height:1.6;">
      Your account has been created successfully. You're all set to get started!
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
      <tr><td style="background:#F0EDFF;border-radius:8px;padding:20px;">
        <p style="margin:0 0 12px;font-weight:600;color:#0A2540;font-size:15px;">Account Details</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:4px 0;color:#6B7C93;font-size:14px;width:120px;">Account Type</td>
            <td style="padding:4px 0;color:#0A2540;font-size:14px;font-weight:600;">${role}</td>
          </tr>
          ${entityName ? `<tr>
            <td style="padding:4px 0;color:#6B7C93;font-size:14px;">Business</td>
            <td style="padding:4px 0;color:#0A2540;font-size:14px;font-weight:600;">${entityName}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:4px 0;color:#6B7C93;font-size:14px;">Email</td>
            <td style="padding:4px 0;color:#0A2540;font-size:14px;font-weight:600;">${email}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6B7C93;font-size:14px;">Username</td>
            <td style="padding:4px 0;color:#0A2540;font-size:14px;font-weight:600;">${username}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6B7C93;font-size:14px;">Plan</td>
            <td style="padding:4px 0;color:#0A2540;font-size:14px;font-weight:600;">${planName} (${billingCycle})</td>
          </tr>
        </table>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
      <tr><td style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;padding:16px;text-align:center;">
        <p style="margin:0;color:#059669;font-size:14px;font-weight:600;">
          Your ${trialDays}-day free trial has started — no payment required now.
        </p>
      </td></tr>
    </table>
    <h3 style="margin:24px 0 12px;color:#0A2540;font-size:16px;">Getting Started</h3>
    <ol style="color:#4B5563;font-size:14px;line-height:1.8;padding-left:20px;">
      <li>Log in to your dashboard</li>
      <li>Complete your business profile</li>
      <li>Set up your menu items and categories</li>
      <li>Configure your settings</li>
      <li>Start using PurpleHere POS!</li>
    </ol>
    <div style="text-align:center;margin:28px 0 12px;">
      <a href="${dashboardUrl}" style="display:inline-block;background:${brandColor};color:white;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">
        Go to Dashboard
      </a>
    </div>`;

  const subject = `Welcome to PurpleHere - Your account is ready!`;

  const text = [
    `Welcome to PurpleHere!`,
    ``,
    `Hi ${fullName},`,
    ``,
    `Your account has been created successfully.`,
    ``,
    `Account Details:`,
    `Account Type: ${role}`,
    entityName ? `Business: ${entityName}` : '',
    `Email: ${email}`,
    `Username: ${username}`,
    `Plan: ${planName} (${billingCycle})`,
    ``,
    `Your ${trialDays}-day free trial has started.`,
    ``,
    `Getting Started:`,
    `1. Log in: ${dashboardUrl}`,
    `2. Complete your business profile`,
    `3. Set up menu items`,
    `4. Configure settings`,
    `5. Start using PurpleHere POS!`
  ].filter(Boolean).join('\n');

  return { subject, html: emailLayout(bodyContent), text };
}

/**
 * Password Reset Email Template
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.resetUrl - Full URL with token
 * @param {number} data.expiresInMinutes
 */
function passwordResetEmail(data) {
  const { fullName, resetUrl, expiresInMinutes } = data;
  const brandColor = '#635BFF';

  const bodyContent = `
    <h2 style="margin:0 0 8px;color:#0A2540;font-size:20px;">Reset Your Password</h2>
    <p style="color:#4B5563;font-size:15px;line-height:1.6;">
      Hi ${fullName || 'there'},
    </p>
    <p style="color:#4B5563;font-size:15px;line-height:1.6;">
      We received a request to reset your password. Click the button below to create a new password.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${resetUrl}" style="display:inline-block;background:${brandColor};color:white;padding:14px 40px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">
        Reset Password
      </a>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
      <tr><td style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:8px;padding:14px 18px;">
        <p style="margin:0;color:#92400E;font-size:13px;">
          This link expires in <strong>${expiresInMinutes} minutes</strong>. If you didn't request this, you can safely ignore this email.
        </p>
      </td></tr>
    </table>
    <p style="color:#9CA3AF;font-size:12px;margin-top:24px;">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="${resetUrl}" style="color:${brandColor};word-break:break-all;font-size:12px;">${resetUrl}</a>
    </p>`;

  const subject = `Reset your PurpleHere password`;

  const text = [
    `Reset Your Password`,
    ``,
    `Hi ${fullName || 'there'},`,
    ``,
    `We received a request to reset your password. Click the link below:`,
    `${resetUrl}`,
    ``,
    `This link expires in ${expiresInMinutes} minutes.`,
    `If you didn't request this, you can safely ignore this email.`
  ].join('\n');

  return { subject, html: emailLayout(bodyContent), text };
}

module.exports = { emailLayout, getLogoAttachment, welcomeEmail, invoiceEmail, entityPlanInvoiceEmail, signupWelcomeEmail, passwordResetEmail };
