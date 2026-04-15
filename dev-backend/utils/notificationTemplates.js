/**
 * Notification Email Templates
 * Uses shared emailLayout from emailTemplates.js for consistent branding.
 */

const { emailLayout } = require('./emailTemplates');

const BRAND_COLOR = '#635BFF';
const BASE_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

function ctaButton(label, url) {
  if (!url) return '';
  return `<div style="text-align:center;margin:24px 0 8px;">
      <a href="${url}" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">${label}</a>
    </div>`;
}

function wrapTemplate(title, bodyContent, lang, branding) {
  const content = `
    <h2 style="color:#1A1A2E;font-size:20px;font-weight:600;margin:0 0 8px;">${title}</h2>
    ${bodyContent}`;
  return emailLayout(content, branding, lang);
}

/**
 * 템플릿 결과에 재렌더 메타데이터(_title/_body/_lang)를 포함.
 * notificationService 가 수신자별 branding 으로 재렌더할 수 있도록.
 *
 * non-enumerable 로 저장 → spread({...mail}) / JSON.stringify / nodemailer 직렬화에 노출되지 않음.
 * 직접 접근(mail._title)은 가능.
 */
function withRenderMeta(result, title, body, lang) {
  Object.defineProperty(result, '_title', { value: title, enumerable: false, writable: false, configurable: false });
  Object.defineProperty(result, '_body', { value: body, enumerable: false, writable: false, configurable: false });
  Object.defineProperty(result, '_lang', { value: lang, enumerable: false, writable: false, configurable: false });
  return result;
}

function infoRow(label, value) {
  return `
    <tr>
      <td style="padding: 10px 16px; font-size: 14px; color: #6B7280; border-bottom: 1px solid #E5E7EB; width: 35%;">${label}</td>
      <td style="padding: 10px 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #E5E7EB;">${value}</td>
    </tr>`;
}

function infoTable(rows) {
  return `<table style="width: 100%; border-collapse: collapse; margin: 0 0 24px; border: 1px solid #E5E7EB; border-radius: 8px;">${rows}</table>`;
}

/**
 * New notice received
 */
function noticeReceivedEmail(notice, authorName, lang = 'en') {
  const { getEmailText } = require('./i18n');
  const t = (key, params) => getEmailText(lang, key, params);

  const title = t('notice.heading');
  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      ${t('notice.body')}
    </p>
    ${infoTable(
      infoRow(t('notice.postedBy'), authorName || 'Unknown') +
      infoRow(t('notice.priority'), notice.priority || 'Normal') +
      infoRow(t('notice.date'), new Date(notice.created_at || notice.createdAt).toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }))
    )}
    <div style="color: #6B7280; font-size: 14px; margin: 0 0 24px; line-height: 1.6;">
      ${(notice.content || '').replace(/<[^>]*>/g, '').replace(/\n/g, '<br>').slice(0, 500)}${(notice.content || '').length > 500 ? '...' : ''}
    </div>
    ${ctaButton(t('notice.viewButton'), `${BASE_URL}/pos/notices`)}`;

  return withRenderMeta({
    subject: t('notice.subject', { title: (notice.title || 'Untitled').slice(0, 60) }),
    html: wrapTemplate(title, body, lang),
    text: `${title}: ${notice.title}\n${t('notice.postedBy')}: ${authorName}\n\n${(notice.content || '').replace(/<[^>]*>/g, '').slice(0, 500)}`
  }, title, body, lang);
}

/**
 * New comment on a notice or ticket
 */
function commentReceivedEmail(comment, entityTitle, commenterName, lang = 'en') {
  const { getEmailText } = require('./i18n');
  const t = (key, params) => getEmailText(lang, key, params);

  const title = t('comment.heading');
  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      ${t('comment.commentedOn', { name: `<strong>${commenterName || 'Someone'}</strong>`, title: `<strong>${entityTitle || 'an item'}</strong>` })}
    </p>
    <div style="background: #F9FAFB; border-left: 4px solid #635BFF; padding: 16px; margin: 0 0 24px; border-radius: 0 8px 8px 0;">
      <p style="color: #374151; font-size: 14px; margin: 0;">
        ${(comment.content || '').replace(/<[^>]*>/g, '').replace(/\n/g, '<br>').slice(0, 500)}
      </p>
    </div>
    ${ctaButton(t('comment.viewButton'), `${BASE_URL}/pos/dashboard`)}`;

  return withRenderMeta({
    subject: t('comment.subject', { title: (entityTitle || 'item').slice(0, 50) }),
    html: wrapTemplate(title, body, lang),
    text: `${commenterName} → "${entityTitle}":\n\n${(comment.content || '').replace(/<[^>]*>/g, '').slice(0, 500)}`
  }, title, body, lang);
}

/**
 * New inquiry/ticket received (for managers)
 */
function inquiryReceivedEmail(ticket, requesterName) {
  const title = 'New Inquiry';
  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      A new inquiry has been submitted.
    </p>
    ${infoTable(
      infoRow('Subject', ticket.title || ticket.subject || 'No subject') +
      infoRow('From', requesterName || 'Unknown') +
      infoRow('Category', ticket.category || 'General') +
      infoRow('Priority', ticket.priority || 'Normal')
    )}
    <div style="color: #6B7280; font-size: 14px; margin: 0 0 24px; line-height: 1.6;">
      ${(ticket.description || ticket.content || '').replace(/<[^>]*>/g, '').replace(/\n/g, '<br>').slice(0, 500)}
    </div>
    ${ctaButton('Review Inquiry', `${BASE_URL}/pos/dashboard`)}`;

  return withRenderMeta({
    subject: `New Inquiry: ${(ticket.title || ticket.subject || 'No subject').slice(0, 50)}`,
    html: wrapTemplate(title, body),
    text: `New Inquiry from ${requesterName}\nSubject: ${ticket.title || ticket.subject}\nCategory: ${ticket.category}\n\n${(ticket.description || ticket.content || '').replace(/<[^>]*>/g, '').slice(0, 500)}`
  }, title, body, 'en');
}

/**
 * Inquiry reply received (for the requester)
 */
function inquiryRepliedEmail(ticket, reply, replierName) {
  const title = 'Inquiry Reply';
  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      Your inquiry has received a reply.
    </p>
    ${infoTable(
      infoRow('Subject', ticket.title || ticket.subject || 'No subject') +
      infoRow('Replied by', replierName || 'Support')
    )}
    <div style="background: #F9FAFB; border-left: 4px solid #635BFF; padding: 16px; margin: 0 0 24px; border-radius: 0 8px 8px 0;">
      <p style="color: #374151; font-size: 14px; margin: 0;">
        ${(reply.content || '').replace(/<[^>]*>/g, '').replace(/\n/g, '<br>').slice(0, 500)}
      </p>
    </div>
    ${ctaButton('View Conversation', `${BASE_URL}/pos/dashboard`)}`;

  return withRenderMeta({
    subject: `Reply to: ${(ticket.title || ticket.subject || 'Your inquiry').slice(0, 50)}`,
    html: wrapTemplate(title, body),
    text: `Reply to "${ticket.title || ticket.subject}" from ${replierName}:\n\n${(reply.content || '').replace(/<[^>]*>/g, '').slice(0, 500)}`
  }, title, body, 'en');
}

/**
 * Ticket status changed
 */
function ticketStatusChangedEmail(ticket, newStatus) {
  const statusColors = {
    'open': '#3B82F6',
    'in_progress': '#F59E0B',
    'resolved': '#10B981',
    'closed': '#6B7280',
    'pending': '#F59E0B'
  };
  const color = statusColors[newStatus] || '#635BFF';
  const title = 'Ticket Status Update';

  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      A ticket status has been updated.
    </p>
    ${infoTable(
      infoRow('Subject', ticket.title || ticket.subject || 'No subject') +
      infoRow('New Status', `<span style="display: inline-block; padding: 4px 12px; background: ${color}20; color: ${color}; border-radius: 12px; font-weight: 600; font-size: 13px;">${newStatus}</span>`)
    )}
    ${ctaButton('View Ticket', `${BASE_URL}/pos/dashboard`)}`;

  return withRenderMeta({
    subject: `Ticket Update: ${(ticket.title || ticket.subject || 'Ticket').slice(0, 40)} - ${newStatus}`,
    html: wrapTemplate(title, body),
    text: `Ticket "${ticket.title || ticket.subject}" status changed to: ${newStatus}`
  }, title, body, 'en');
}

/**
 * Invoice created notification (for restaurant admin/owner)
 */
function invoiceCreatedEmail(invoice, restaurantName, options = {}) {
  const amount = `${invoice.currency} ${parseFloat(invoice.total_amount).toFixed(2)}`;
  const dueDate = new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const trialNotice = options.isTrial ? `
    <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px; margin: 0 0 20px;">
      <p style="color: #065F46; font-size: 14px; font-weight: 600; margin: 0 0 6px;">
        You're currently on a free trial
      </p>
      <p style="color: #047857; font-size: 13px; margin: 0; line-height: 1.6;">
        No payment is required during your trial period. This invoice will become active after your trial ends.
      </p>
    </div>` : '';

  const title = 'New Invoice';
  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      A new invoice has been issued for <strong>${restaurantName}</strong>.
    </p>
    ${trialNotice}
    ${infoTable(
      infoRow('Invoice No.', invoice.invoice_number) +
      infoRow('Amount', `<span style="color: #635BFF; font-weight: 700; font-size: 16px;">${amount}</span>`) +
      infoRow('Due Date', dueDate) +
      infoRow('Status', options.isTrial ? '<span style="color: #059669;">Trial Period</span>' : 'Pending')
    )}
    ${ctaButton('View Invoice', `${BASE_URL}/pos/invoices`)}`;

  return withRenderMeta({
    subject: `Invoice ${invoice.invoice_number} - ${amount} Due ${dueDate}`,
    html: wrapTemplate(title, body),
    text: `New Invoice ${invoice.invoice_number}\nAmount: ${amount}\nDue: ${dueDate}\nRestaurant: ${restaurantName}`
  }, title, body, 'en');
}

/**
 * Invoice overdue reminder
 */
function invoiceOverdueEmail(invoice, restaurantName) {
  const amount = `${invoice.currency} ${parseFloat(invoice.total_amount).toFixed(2)}`;
  const dueDate = new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const title = 'Invoice Overdue';

  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      This is a reminder that the following invoice for <strong>${restaurantName}</strong> is overdue.
    </p>
    ${infoTable(
      infoRow('Invoice No.', invoice.invoice_number) +
      infoRow('Amount', `<span style="color: #EF4444; font-weight: 700; font-size: 16px;">${amount}</span>`) +
      infoRow('Due Date', `<span style="color: #EF4444;">${dueDate}</span>`) +
      infoRow('Status', '<span style="color: #EF4444; font-weight: 600;">Overdue</span>')
    )}
    ${ctaButton('Pay Now', `${BASE_URL}/pos/invoices`)}`;

  return withRenderMeta({
    subject: `OVERDUE: Invoice ${invoice.invoice_number} - ${amount}`,
    html: wrapTemplate(title, body),
    text: `OVERDUE Invoice ${invoice.invoice_number}\nAmount: ${amount}\nDue: ${dueDate}\nRestaurant: ${restaurantName}`
  }, title, body, 'en');
}

/**
 * Invoice payment confirmed (for the issuer)
 */
function invoicePaidEmail(invoice, restaurantName) {
  const amount = `${invoice.currency} ${parseFloat(invoice.total_amount).toFixed(2)}`;
  const title = 'Payment Confirmed';

  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      Payment has been confirmed for an invoice from <strong>${restaurantName}</strong>.
    </p>
    ${infoTable(
      infoRow('Invoice No.', invoice.invoice_number) +
      infoRow('Amount', `<span style="color: #10B981; font-weight: 700; font-size: 16px;">${amount}</span>`) +
      infoRow('Status', '<span style="color: #10B981; font-weight: 600;">Paid</span>')
    )}
    ${ctaButton('View Details', `${BASE_URL}/pos/invoices`)}`;

  return withRenderMeta({
    subject: `Payment Confirmed: Invoice ${invoice.invoice_number} - ${amount}`,
    html: wrapTemplate(title, body),
    text: `Payment Confirmed for Invoice ${invoice.invoice_number}\nAmount: ${amount}\nRestaurant: ${restaurantName}`
  }, title, body, 'en');
}

/**
 * Email Verification Email
 */
function emailVerificationEmail(fullName, verificationUrl) {
  const title = 'Email Verification';
  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      Hi ${fullName || 'there'},
    </p>
    <p style="color: #6B7280; font-size: 14px; margin: 0 0 24px; line-height: 1.6;">
      Please verify your email address to activate your account. Click the button below to complete verification.
    </p>
    ${ctaButton('Verify Email', verificationUrl)}
    <p style="color: #9CA3AF; font-size: 12px; margin: 24px 0 0; line-height: 1.6;">
      This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.
    </p>`;

  return withRenderMeta({
    subject: 'Verify your email - PurpleHere',
    html: wrapTemplate(title, body),
    text: `Hi ${fullName},\n\nPlease verify your email: ${verificationUrl}\n\nThis link expires in 24 hours.`
  }, title, body, 'en');
}

module.exports = {
  wrapTemplate,
  noticeReceivedEmail,
  commentReceivedEmail,
  inquiryReceivedEmail,
  inquiryRepliedEmail,
  ticketStatusChangedEmail,
  invoiceCreatedEmail,
  invoiceOverdueEmail,
  invoicePaidEmail,
  emailVerificationEmail
};
