/**
 * Email Templates for PurpleHere POS
 * - welcomeEmail: Sent when a new restaurant is created with admin
 * - invoiceEmail: Sent when a POS subscription invoice is generated (system_admin)
 * - entityPlanInvoiceEmail: Sent when a brand/foodcourt plan invoice is generated
 *
 * Templates support issuer branding (logo, name, color) via issuerInfo parameter.
 */

/**
 * Base email layout with optional issuer branding
 * @param {string} bodyContent - HTML body content
 * @param {Object} [issuerInfo] - Optional issuer branding
 * @param {string} [issuerInfo.name] - Issuer display name
 * @param {string} [issuerInfo.logoUrl] - Issuer logo URL
 * @param {string} [issuerInfo.color] - Brand color (hex, default: #635BFF)
 */
function emailLayout(bodyContent, issuerInfo) {
  const brandName = issuerInfo?.name || 'PurpleHere';
  const brandColor = issuerInfo?.color || '#635BFF';
  const logoHtml = issuerInfo?.logoUrl
    ? `<img src="${issuerInfo.logoUrl}" alt="${brandName}" style="max-height:40px;max-width:200px;display:block;" />`
    : `<h1 style="margin:0;color:white;font-size:22px;font-weight:600;">${brandName}</h1>`;
  const footerText = issuerInfo?.companyName || 'PurpleHere POS System';
  const footerUrl = issuerInfo?.website || 'https://purplehere.com';
  const footerDomain = issuerInfo?.website ? issuerInfo.website.replace(/^https?:\/\//, '') : 'purplehere.com';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName}</title>
</head>
<body style="margin:0;padding:0;background:#F6F9FC;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F6F9FC;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <tr><td style="background:${brandColor};padding:24px 32px;">
          ${logoHtml}
        </td></tr>
        <tr><td style="padding:32px;">
          ${bodyContent}
        </td></tr>
        <tr><td style="background:#F8FAFC;padding:20px 32px;border-top:1px solid #E6EBF1;">
          <p style="margin:0;color:#6B7C93;font-size:12px;text-align:center;">
            ${footerText}<br>
            <a href="${footerUrl}" style="color:${brandColor};text-decoration:none;">${footerDomain}</a>
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

module.exports = { welcomeEmail, invoiceEmail, entityPlanInvoiceEmail };
