/**
 * Notification Email Templates
 * Uses shared emailLayout from emailTemplates.js for consistent branding.
 */

const { emailLayout } = require('./emailTemplates');

const BRAND_COLOR = '#635BFF';
const BASE_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');
const DEFAULT_TZ = 'Asia/Kuala_Lumpur';

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
function noticeReceivedEmail(notice, authorName, lang = 'en', timezone = DEFAULT_TZ) {
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
      infoRow(t('notice.date'), new Date(notice.created_at || notice.createdAt).toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: timezone }))
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
  const tz = options.timezone || DEFAULT_TZ;
  const amount = `${invoice.currency} ${parseFloat(invoice.total_amount).toFixed(2)}`;
  const dueDate = new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: tz });
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
function invoiceOverdueEmail(invoice, restaurantName, options = {}) {
  const tz = options.timezone || DEFAULT_TZ;
  const amount = `${invoice.currency} ${parseFloat(invoice.total_amount).toFixed(2)}`;
  const dueDate = new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: tz });
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

/**
 * Contract expiry reminder — 발행자(internal team) 대상
 */
function contractExpiryIssuerEmail(contract, daysRemaining, lang = 'en', timezone = DEFAULT_TZ) {
  const { getEmailText } = require('./i18n');
  const t = (key, params) => getEmailText(lang, key, params);

  const isUrgent = daysRemaining <= 7;
  const endDate = new Date(contract.end_date).toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: timezone });
  const contractUrl = `${BASE_URL}/pos/${contract.entity_type === 'brand' ? 'brand/franchise' : 'foodcourt/tenancy'}?id=${contract.id}`;
  const renewUrl = `${contractUrl}&action=renew`;

  const renewalLabel = contract.renewal_type === 'auto'
    ? t('contractExpiry.renewalAuto')
    : contract.renewal_type === 'none'
      ? t('contractExpiry.renewalNone')
      : t('contractExpiry.renewalManual');

  const banner = isUrgent
    ? `<div style="background:#FEE2E2;border-left:4px solid #DC2626;padding:14px 16px;border-radius:6px;margin:16px 0;">
         <div style="color:#991B1B;font-weight:600;font-size:15px;">⚠ ${daysRemaining} ${t('contractExpiry.daysRemaining')}</div>
       </div>`
    : `<div style="background:#FEF3C7;border-left:4px solid #F59E0B;padding:14px 16px;border-radius:6px;margin:16px 0;">
         <div style="color:#92400E;font-weight:600;font-size:15px;">${daysRemaining} ${t('contractExpiry.daysRemaining')}</div>
       </div>`;

  const title = t('contractExpiry.issuerHeading');
  const body = `
    <p style="color:#374151;font-size:15px;margin:0 0 16px;line-height:1.6;">${t('contractExpiry.issuerIntro')}</p>
    ${banner}
    ${infoTable(
      infoRow(t('contractExpiry.contractNumber'), contract.contract_number || '—') +
      infoRow(t('contractExpiry.applicantCompany'), contract.applicant_company_name || contract.applicant_contact_person || '—') +
      infoRow(t('contractExpiry.endDate'), endDate) +
      infoRow(t('contractExpiry.daysRemaining'), daysRemaining) +
      infoRow(t('contractExpiry.renewalPolicy'), renewalLabel)
    )}
    <div style="text-align:center;margin:24px 0;">
      <a href="${renewUrl}" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;margin:0 4px;">${t('contractExpiry.renewButton')}</a>
      <a href="${contractUrl}" style="display:inline-block;background:transparent;color:${BRAND_COLOR};padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid ${BRAND_COLOR};margin:0 4px;">${t('contractExpiry.viewButton')}</a>
    </div>`;

  const subjectKey = isUrgent ? 'contractExpiry.issuerSubjectUrgent' : 'contractExpiry.issuerSubject';
  return withRenderMeta({
    subject: t(subjectKey, { number: contract.contract_number || contract.id, days: daysRemaining }),
    html: wrapTemplate(title, body, lang),
    text: `${title}\nContract ${contract.contract_number} expires on ${endDate} (${daysRemaining} days). ${contractUrl}`
  }, title, body, lang);
}

/**
 * Contract expiry reminder — 신청자(applicant) 대상
 */
function contractExpiryApplicantEmail(contract, daysRemaining, issuerName, lang = 'en', timezone = DEFAULT_TZ) {
  const { getEmailText } = require('./i18n');
  const t = (key, params) => getEmailText(lang, key, params);

  const endDate = new Date(contract.end_date).toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: timezone });

  const title = t('contractExpiry.applicantHeading');
  const body = `
    <p style="color:#374151;font-size:15px;margin:0 0 16px;line-height:1.6;">${t('contractExpiry.applicantIntro', { issuer: issuerName || '—', date: endDate })}</p>
    ${infoTable(
      infoRow(t('contractExpiry.contractNumber'), contract.contract_number || '—') +
      infoRow(t('contractExpiry.endDate'), endDate) +
      infoRow(t('contractExpiry.daysRemaining'), daysRemaining)
    )}
    <p style="color:#6B7280;font-size:14px;margin:16px 0 0;line-height:1.6;">${t('contractExpiry.contactBody')}</p>`;

  return withRenderMeta({
    subject: t('contractExpiry.applicantSubject', { issuer: issuerName || '—', date: endDate }),
    html: wrapTemplate(title, body, lang),
    text: `${title}\nContract ${contract.contract_number} with ${issuerName} expires on ${endDate} (${daysRemaining} days).`
  }, title, body, lang);
}

/**
 * Supplier Contract Requested — sent to Supplier Admin
 */
function supplierContractRequestedEmail({ buyerName, buyerType, message, link }) {
  const title = 'New Contract Request';
  const safeMessage = (message || '').replace(/<[^>]*>/g, '').slice(0, 600);
  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">
      <strong>${buyerName || 'A buyer'}</strong> (${buyerType || 'buyer'}) has requested a supply contract with your company.
    </p>
    ${safeMessage ? `<div style="background:#F9FAFB;border-left:4px solid ${BRAND_COLOR};padding:16px;margin:0 0 24px;border-radius:0 8px 8px 0;">
      <p style="color:#374151;font-size:14px;margin:0;">${safeMessage}</p>
    </div>` : ''}
    <p style="color:#6B7280;font-size:14px;margin:0 0 16px;line-height:1.6;">
      Review the request and approve or reject it. On approval, please define payment terms (terms, invoice cycle, credit limit, currency).
    </p>
    ${ctaButton('Review Request', link || `${BASE_URL}/supplier/contracts`)}`;

  return withRenderMeta({
    subject: `New Contract Request from ${buyerName || 'a buyer'}`,
    html: wrapTemplate(title, body, 'en'),
    text: `New contract request from ${buyerName || 'a buyer'} (${buyerType}). ${safeMessage ? '\n\n' + safeMessage : ''}`
  }, title, body, 'en');
}

/**
 * Supplier Contract Approved — sent to Buyer
 */
function supplierContractApprovedEmail({ supplierName, paymentTerms, link }) {
  const title = 'Contract Approved';
  const pt = paymentTerms || {};
  const ptRows =
    infoRow('Payment Terms', pt.terms || '—') +
    infoRow('Invoice Cycle', pt.invoice_cycle || '—') +
    (pt.payment_due_day !== undefined && pt.payment_due_day !== null
      ? infoRow('Payment Due Day', String(pt.payment_due_day))
      : '') +
    (pt.credit_limit !== undefined && pt.credit_limit !== null
      ? infoRow('Credit Limit', `${pt.currency || ''} ${pt.credit_limit}`.trim())
      : '') +
    (pt.currency ? infoRow('Currency', pt.currency) : '');

  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">
      Your contract request with <strong>${supplierName || 'the supplier'}</strong> has been approved.
    </p>
    ${infoTable(ptRows)}
    ${pt.notes ? `<div style="background:#F9FAFB;border-left:4px solid ${BRAND_COLOR};padding:16px;margin:0 0 24px;border-radius:0 8px 8px 0;">
      <p style="color:#374151;font-size:14px;margin:0;">${(pt.notes || '').replace(/<[^>]*>/g, '').slice(0, 500)}</p>
    </div>` : ''}
    ${ctaButton('View Contract', link || `${BASE_URL}/pos/supply/contracts`)}`;

  return withRenderMeta({
    subject: `Contract Approved by ${supplierName || 'Supplier'}`,
    html: wrapTemplate(title, body, 'en'),
    text: `Contract approved by ${supplierName || 'supplier'}. Terms: ${pt.terms || ''} / ${pt.invoice_cycle || ''}.`
  }, title, body, 'en');
}

/**
 * Supplier Contract Rejected — sent to Buyer
 */
function supplierContractRejectedEmail({ supplierName, reason, link }) {
  const title = 'Contract Request Rejected';
  const safeReason = (reason || '').replace(/<[^>]*>/g, '').slice(0, 600);
  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">
      Your contract request with <strong>${supplierName || 'the supplier'}</strong> has been rejected.
    </p>
    ${safeReason ? `<div style="background:#FEF2F2;border-left:4px solid #DC2626;padding:16px;margin:0 0 24px;border-radius:0 8px 8px 0;">
      <p style="color:#991B1B;font-size:13px;font-weight:600;margin:0 0 6px;">Reason</p>
      <p style="color:#374151;font-size:14px;margin:0;">${safeReason}</p>
    </div>` : ''}
    ${ctaButton('View Details', link || `${BASE_URL}/pos/supply/contracts`)}`;

  return withRenderMeta({
    subject: `Contract Request Rejected by ${supplierName || 'Supplier'}`,
    html: wrapTemplate(title, body, 'en'),
    text: `Your contract request with ${supplierName || 'supplier'} was rejected.${safeReason ? '\nReason: ' + safeReason : ''}`
  }, title, body, 'en');
}

/**
 * Supplier Contract Terminated — sent to opposite party
 */
function supplierContractTerminatedEmail({ otherPartyName, terminatedBy, reason, link }) {
  const title = 'Contract Terminated';
  const safeReason = (reason || '').replace(/<[^>]*>/g, '').slice(0, 600);
  const actor = terminatedBy === 'buyer' ? 'The buyer'
    : terminatedBy === 'supplier' ? 'The supplier'
    : 'The system';
  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">
      ${actor} has terminated the supply contract with <strong>${otherPartyName || 'the other party'}</strong>.
    </p>
    ${safeReason ? `<div style="background:#FEF3C7;border-left:4px solid #F59E0B;padding:16px;margin:0 0 24px;border-radius:0 8px 8px 0;">
      <p style="color:#92400E;font-size:13px;font-weight:600;margin:0 0 6px;">Reason</p>
      <p style="color:#374151;font-size:14px;margin:0;">${safeReason}</p>
    </div>` : ''}
    ${ctaButton('View Contract', link || `${BASE_URL}/pos/supply/contracts`)}`;

  return withRenderMeta({
    subject: `Contract Terminated — ${otherPartyName || 'Supply Contract'}`,
    html: wrapTemplate(title, body, 'en'),
    text: `${actor} terminated the supply contract with ${otherPartyName || 'the other party'}.${safeReason ? '\nReason: ' + safeReason : ''}`
  }, title, body, 'en');
}

/**
 * Sprint 4 — Supply Chain Order Lifecycle templates
 */

function fmtMoney(amount, currency) {
  const cur = currency || 'MYR';
  const n = Number(amount || 0);
  return `${cur} ${n.toFixed(2)}`;
}

function fmtDate(date, lang = 'en', timezone = DEFAULT_TZ) {
  if (!date) return '—';
  try {
    const locale = lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-US';
    return new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: timezone });
  } catch {
    return String(date);
  }
}


/**
 * 발주 품목 표 — 메일 본문에 내역을 싣는다.
 * 2026-08-28 Irene: "이메일에 내역이 다 나와야지. 굳이 들어가야만 보이면 불편하지."
 *   기존 발주 메일은 PO번호·구매자·총액·상태만 보내서, 받는 쪽이 화면에 들어가야 뭘 주문했는지 알 수 있었다.
 * ⚠ items 를 안 넘기면 **빈 문자열**을 반환한다 — 기존 호출부 계약 불변(안 넘기면 현행과 동일 출력).
 */
const PO_ITEMS_MAX = 20;
function poItemsTable(items, currency, poTotal) {
  if (!Array.isArray(items) || items.length === 0) return '';
  const esc = (v) => String(v == null ? '' : v).replace(/[<>&"]/g, ch => (
    { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[ch]
  )).slice(0, 160);
  const shown = items.slice(0, PO_ITEMS_MAX);
  const rest = items.length - shown.length;
  const rows = shown.map(it => {
    const qty = Number(it.quantity_ordered ?? it.quantity ?? 0);
    const unit = Number(it.unit_price ?? 0);
    const line = it.line_total != null ? Number(it.line_total) : qty * unit;
    return `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;color:#374151;font-size:13px;">${esc(it.name)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;color:#374151;font-size:13px;text-align:right;white-space:nowrap;">${qty}${it.unit ? ' ' + esc(it.unit) : ''}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;color:#374151;font-size:13px;text-align:right;white-space:nowrap;">${fmtMoney(unit, currency)}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;color:#111827;font-size:13px;text-align:right;white-space:nowrap;font-weight:600;">${fmtMoney(line, currency)}</td>
      </tr>`;
  }).join('');
  const more = rest > 0
    ? `<tr><td colspan="4" style="padding:8px 10px;color:#6B7280;font-size:12px;">+ ${rest} more item(s) — see the full list in the order screen</td></tr>`
    : '';
  // 합계는 **발주서 총액(poTotal)** 을 우선한다 — 위 infoRow('Total') 과 어긋나면 받는 쪽이 혼란스럽다.
  // 상한(20줄)을 넘겨 일부만 보여줄 때도 합계는 전체 기준이어야 하므로 라인 합산은 폴백으로만 쓴다.
  const grand = (poTotal != null && !Number.isNaN(Number(poTotal)))
    ? Number(poTotal)
    : items.reduce((sum, it) => {
      const qty = Number(it.quantity_ordered ?? it.quantity ?? 0);
      const unit = Number(it.unit_price ?? 0);
      return sum + (it.line_total != null ? Number(it.line_total) : qty * unit);
    }, 0);
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 16px;border:1px solid #E5E7EB;border-radius:6px;">
      <thead>
        <tr style="background:#F9FAFB;">
          <th align="left"  style="padding:8px 10px;color:#6B7280;font-size:12px;font-weight:600;">Item</th>
          <th align="right" style="padding:8px 10px;color:#6B7280;font-size:12px;font-weight:600;">Qty</th>
          <th align="right" style="padding:8px 10px;color:#6B7280;font-size:12px;font-weight:600;">Unit</th>
          <th align="right" style="padding:8px 10px;color:#6B7280;font-size:12px;font-weight:600;">Amount</th>
        </tr>
      </thead>
      <tbody>${rows}${more}</tbody>
      <tfoot>
        <tr style="background:#F9FAFB;">
          <td colspan="3" align="right" style="padding:10px;color:#374151;font-size:13px;font-weight:600;">Total</td>
          <td align="right" style="padding:10px;color:${BRAND_COLOR};font-size:14px;font-weight:700;white-space:nowrap;">${fmtMoney(grand, currency)}</td>
        </tr>
      </tfoot>
    </table>`;
}

/**
 * Seller Order Received — sent to Seller (Supplier/Brand/Foodcourt) when buyer submits PO.
 */
function sellerOrderReceivedEmail({ buyerName, poNumber, total, currency, link, items }) {
  const title = 'New Purchase Order Received';
  const safeBuyer = (buyerName || 'A buyer').toString().slice(0, 120);
  const safePo = (poNumber || '—').toString().slice(0, 80);
  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">
      <strong>${safeBuyer}</strong> has submitted a new purchase order to your company.
    </p>
    ${infoTable(
      infoRow('PO Number', safePo) +
      infoRow('Buyer', safeBuyer) +
      infoRow('Total', `<span style="color:${BRAND_COLOR};font-weight:700;">${fmtMoney(total, currency)}</span>`) +
      infoRow('Status', '<span style="color:#F59E0B;font-weight:600;">Awaiting Confirmation</span>')
    )}
    ${poItemsTable(items, currency, total)}
    <p style="color:#6B7280;font-size:14px;margin:0 0 16px;line-height:1.6;">
      Please review the order and confirm or reject it. After confirmation you can mark it shipped with tracking info.
    </p>
    ${ctaButton('Review Order', link || `${BASE_URL}/pos/seller/orders`)}`;

  return withRenderMeta({
    subject: `New PO ${safePo} from ${safeBuyer}`,
    html: wrapTemplate(title, body, 'en'),
    text: `New purchase order ${safePo} from ${safeBuyer}. Total: ${fmtMoney(total, currency)}.`
  }, title, body, 'en');
}

/**
 * PO Approval Pending — sent to connected Owner when a restaurant PO awaits approval (2026-06-21).
 */
function poApprovalPendingEmail({ buyerName, poNumber, total, currency, link, items }) {
  const title = 'Purchase Order Awaiting Your Approval';
  const safeBuyer = (buyerName || 'Your restaurant').toString().slice(0, 120);
  const safePo = (poNumber || '—').toString().slice(0, 80);
  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">
      <strong>${safeBuyer}</strong> has created a purchase order that needs your approval before it is sent to the supplier.
    </p>
    ${infoTable(
      infoRow('PO Number', safePo) +
      infoRow('Restaurant', safeBuyer) +
      infoRow('Total', `<span style="color:${BRAND_COLOR};font-weight:700;">${fmtMoney(total, currency)}</span>`) +
      infoRow('Status', '<span style="color:#F59E0B;font-weight:600;">Awaiting Owner Approval</span>')
    )}
    ${poItemsTable(items, currency, total)}
    <p style="color:#6B7280;font-size:14px;margin:0 0 16px;line-height:1.6;">
      Please review and approve or reject this order. It will only be sent to the supplier after your approval.
    </p>
    ${ctaButton('Review Order', link || `${BASE_URL}/pos/owner/po-approvals`)}`;

  return withRenderMeta({
    subject: `PO ${safePo} needs your approval — ${safeBuyer}`,
    html: wrapTemplate(title, body, 'en'),
    text: `Purchase order ${safePo} from ${safeBuyer} (${fmtMoney(total, currency)}) is awaiting your approval.`
  }, title, body, 'en');
}

/**
 * PO Approval Result — sent to the PO creator when the Owner approves or rejects (2026-06-21).
 */
function poApprovalResultEmail({ poNumber, approved, reason, total, currency, link }) {
  const safePo = (poNumber || '—').toString().slice(0, 80);
  const title = approved ? 'Purchase Order Approved' : 'Purchase Order Rejected';
  const statusHtml = approved
    ? '<span style="color:#10B981;font-weight:600;">Approved — sent to supplier</span>'
    : '<span style="color:#FF6B6B;font-weight:600;">Rejected — returned to draft</span>';
  const reasonRow = (!approved && reason)
    ? infoRow('Reason', (reason || '').toString().slice(0, 300))
    : '';
  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">
      Your purchase order <strong>${safePo}</strong> has been
      <strong>${approved ? 'approved' : 'rejected'}</strong> by the Owner.
    </p>
    ${infoTable(
      infoRow('PO Number', safePo) +
      infoRow('Total', `<span style="color:${BRAND_COLOR};font-weight:700;">${fmtMoney(total, currency)}</span>`) +
      infoRow('Status', statusHtml) +
      reasonRow
    )}
    ${ctaButton('View Order', link || `${BASE_URL}/pos/purchase-orders/history`)}`;

  return withRenderMeta({
    subject: `${title} — ${safePo}`,
    html: wrapTemplate(title, body, 'en'),
    text: `Purchase order ${safePo} has been ${approved ? 'approved and sent to the supplier' : 'rejected' + (reason ? ` (${reason})` : '')}.`
  }, title, body, 'en');
}

/**
 * Trade Invoice Created — sent to Buyer (Restaurant/Brand/Foodcourt) when supplier issues a trade invoice.
 */
function tradeInvoiceCreatedEmail({ sellerName, invoiceNumber, total, currency, dueDate, link, timezone }) {
  const tz = timezone || DEFAULT_TZ;
  const title = 'New Trade Invoice';
  const safeSeller = (sellerName || 'Your supplier').toString().slice(0, 120);
  const safeInv = (invoiceNumber || '—').toString().slice(0, 80);
  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">
      <strong>${safeSeller}</strong> has issued a new trade invoice for your purchase.
    </p>
    ${infoTable(
      infoRow('Invoice No.', safeInv) +
      infoRow('Supplier', safeSeller) +
      infoRow('Amount', `<span style="color:${BRAND_COLOR};font-weight:700;">${fmtMoney(total, currency)}</span>`) +
      infoRow('Due Date', fmtDate(dueDate, 'en', tz)) +
      infoRow('Status', '<span style="color:#F59E0B;font-weight:600;">Pending</span>')
    )}
    ${ctaButton('View Invoice', link || `${BASE_URL}/pos/purchase-invoices`)}`;

  return withRenderMeta({
    subject: `Trade Invoice ${safeInv} - ${fmtMoney(total, currency)}`,
    html: wrapTemplate(title, body, 'en'),
    text: `Trade invoice ${safeInv} from ${safeSeller}. Amount: ${fmtMoney(total, currency)}. Due: ${fmtDate(dueDate, 'en', tz)}.`
  }, title, body, 'en');
}

/**
 * Trade Invoice Paid — sent to Seller when buyer settles a trade invoice.
 */
function tradeInvoicePaidEmail({ buyerName, invoiceNumber, total, currency, link }) {
  const title = 'Trade Invoice Paid';
  const safeBuyer = (buyerName || 'A buyer').toString().slice(0, 120);
  const safeInv = (invoiceNumber || '—').toString().slice(0, 80);
  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">
      <strong>${safeBuyer}</strong> has paid trade invoice <strong>${safeInv}</strong>.
    </p>
    ${infoTable(
      infoRow('Invoice No.', safeInv) +
      infoRow('Buyer', safeBuyer) +
      infoRow('Amount', `<span style="color:#10B981;font-weight:700;">${fmtMoney(total, currency)}</span>`) +
      infoRow('Status', '<span style="color:#10B981;font-weight:600;">Paid</span>')
    )}
    ${ctaButton('View Details', link || `${BASE_URL}/pos/seller/orders`)}`;

  return withRenderMeta({
    subject: `Payment Received: ${safeInv} - ${fmtMoney(total, currency)}`,
    html: wrapTemplate(title, body, 'en'),
    text: `${safeBuyer} paid trade invoice ${safeInv}. Amount: ${fmtMoney(total, currency)}.`
  }, title, body, 'en');
}

/**
 * Monthly SOA — sent to Buyer for monthly_soa contracts. Aggregates last month's invoices.
 */
function monthlySoaEmail({ sellerName, month, invoices = [], totalDue, currency, dueDate, link, timezone }) {
  const tz = timezone || DEFAULT_TZ;
  const title = 'Monthly Statement of Account';
  const safeSeller = (sellerName || 'Your supplier').toString().slice(0, 120);
  const safeMonth = (month || '—').toString().slice(0, 40);

  const rowsHtml = (invoices || []).slice(0, 50).map(inv => `
    <tr>
      <td style="padding:8px 12px;font-size:13px;color:#111827;border-bottom:1px solid #E5E7EB;">${(inv.invoice_number || '—').toString().slice(0, 60)}</td>
      <td style="padding:8px 12px;font-size:13px;color:#6B7280;border-bottom:1px solid #E5E7EB;">${fmtDate(inv.created_at || inv.createdAt, 'en', tz)}</td>
      <td style="padding:8px 12px;font-size:13px;color:#111827;border-bottom:1px solid #E5E7EB;text-align:right;">${fmtMoney(inv.total_amount, inv.currency || currency)}</td>
    </tr>`).join('');

  const invoicesTable = `
    <table style="width:100%;border-collapse:collapse;margin:0 0 24px;border:1px solid #E5E7EB;border-radius:8px;">
      <thead>
        <tr style="background:#F9FAFB;">
          <th style="padding:10px 12px;font-size:12px;color:#374151;text-align:left;border-bottom:1px solid #E5E7EB;">Invoice</th>
          <th style="padding:10px 12px;font-size:12px;color:#374151;text-align:left;border-bottom:1px solid #E5E7EB;">Date</th>
          <th style="padding:10px 12px;font-size:12px;color:#374151;text-align:right;border-bottom:1px solid #E5E7EB;">Amount</th>
        </tr>
      </thead>
      <tbody>${rowsHtml || `<tr><td colspan="3" style="padding:14px;color:#6B7280;text-align:center;font-size:13px;">No invoices in this period.</td></tr>`}</tbody>
    </table>`;

  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">
      Your monthly statement of account from <strong>${safeSeller}</strong> for <strong>${safeMonth}</strong> is ready.
    </p>
    ${infoTable(
      infoRow('Supplier', safeSeller) +
      infoRow('Period', safeMonth) +
      infoRow('Invoices', String((invoices || []).length)) +
      infoRow('Total Due', `<span style="color:${BRAND_COLOR};font-weight:700;font-size:16px;">${fmtMoney(totalDue, currency)}</span>`) +
      infoRow('Due Date', fmtDate(dueDate, 'en', tz))
    )}
    ${invoicesTable}
    ${ctaButton('View SOA & Pay', link || `${BASE_URL}/pos/purchase-invoices/soa`)}`;

  return withRenderMeta({
    subject: `Monthly SOA from ${safeSeller} - ${safeMonth} (${fmtMoney(totalDue, currency)})`,
    html: wrapTemplate(title, body, 'en'),
    text: `Monthly statement from ${safeSeller} for ${safeMonth}. Invoices: ${(invoices || []).length}. Total due: ${fmtMoney(totalDue, currency)}. Due: ${fmtDate(dueDate, 'en', tz)}.`
  }, title, body, 'en');
}

// ═══════════════════════════════════════════════════════════════
// Phase 3 — Referral Program emails (7 events)
// ═══════════════════════════════════════════════════════════════

function fmtRefMoney(amount, currency) {
  const a = parseFloat(amount) || 0;
  if (currency === 'KRW' || currency === 'JPY' || currency === 'VND') {
    return `${currency} ${Math.round(a).toLocaleString()}`;
  }
  return `${currency} ${a.toFixed(2)}`;
}

// 1. RP welcome — sent on referral-signup
function referralPartnerWelcomeEmail({ fullName, referralCode }) {
  const dashboardUrl = `${BASE_URL}/referral/dashboard`;
  const shareUrl = `${BASE_URL}/signup?ref=${referralCode}`;
  const title = 'Welcome to the Purple Referral Program';
  const body = `
    <p style="margin:0 0 12px;">Hi <strong>${fullName || 'there'}</strong>,</p>
    <p style="margin:0 0 16px;">You're now a Purple Referral Partner. Earn <strong>15% recurring commission</strong> on every Purple POS subscription you bring in — and your referral gets <strong>20% off their first month</strong>.</p>
    <div style="background:#F1F0FF;border-radius:8px;padding:18px;margin:0 0 20px;">
      <div style="font-size:11px;font-weight:600;color:#6B7C93;letter-spacing:0.4px;text-transform:uppercase;">Your code</div>
      <div style="font-family:'SFMono-Regular',Menlo,monospace;font-size:22px;font-weight:700;color:${BRAND_COLOR};margin:6px 0;">${referralCode}</div>
      <div style="font-size:13px;color:#0A2540;word-break:break-all;">${shareUrl}</div>
    </div>
    ${ctaButton('Open dashboard', dashboardUrl)}`;
  return withRenderMeta(
    { subject: title, html: wrapTemplate(title, body) },
    title, body, 'en'
  );
}

// 2. Referrer notified that someone signed up using their code
function referredSignupEmail({ referrerName, referredBusiness, referredRole }) {
  const dashboardUrl = `${BASE_URL}/referral/dashboard`;
  const title = `New referral: ${referredBusiness}`;
  const body = `
    <p style="margin:0 0 12px;">Hi <strong>${referrerName || 'there'}</strong>,</p>
    <p style="margin:0 0 16px;">Good news — <strong>${referredBusiness}</strong> just signed up using your referral code as a ${referredRole || 'Purple POS user'}.</p>
    <p style="margin:0 0 16px;color:#6B7C93;font-size:14px;">You'll start earning a 15% commission as soon as their first paid invoice clears.</p>
    ${ctaButton('See your referrals', dashboardUrl)}`;
  return withRenderMeta(
    { subject: title, html: wrapTemplate(title, body) },
    title, body, 'en'
  );
}

// 3. Commission credited — sent when referrer's wallet receives credit
function commissionCreditedEmail({ referrerName, referredBusiness, amount, currency, invoiceNumber }) {
  const walletUrl = `${BASE_URL}/referral/wallet`;
  const title = `+ ${fmtRefMoney(amount, currency)} commission credited`;
  const body = `
    <p style="margin:0 0 12px;">Hi <strong>${referrerName || 'there'}</strong>,</p>
    <p style="margin:0 0 16px;">${referredBusiness || 'Your referral'} paid an invoice — your commission has been credited.</p>
    ${infoTable(
      infoRow('Amount', `<span style="color:#10B981;font-weight:700;">+ ${fmtRefMoney(amount, currency)}</span>`) +
      (invoiceNumber ? infoRow('Invoice', invoiceNumber) : '') +
      (referredBusiness ? infoRow('From', referredBusiness) : '')
    )}
    <p style="margin:18px 0 0;color:#6B7C93;font-size:13px;">Apply your balance at checkout when paying any Purple POS invoice, or request a payout once you reach the minimum.</p>
    <div style="margin-top:16px;">${ctaButton('Open wallet', walletUrl)}</div>`;
  return withRenderMeta(
    { subject: title, html: wrapTemplate(title, body) },
    title, body, 'en'
  );
}

// 4. Admin notified — partner submitted a payout request
function payoutRequestedAdminEmail({ partnerName, amount, currency, bank }) {
  const adminUrl = `${BASE_URL}/pos/admin/referrals?tab=payouts`;
  const title = `Payout request: ${partnerName} — ${fmtRefMoney(amount, currency)}`;
  const body = `
    <p style="margin:0 0 16px;"><strong>${partnerName}</strong> has requested a payout.</p>
    ${infoTable(
      infoRow('Amount', `<strong>${fmtRefMoney(amount, currency)}</strong>`) +
      (bank?.bank_name ? infoRow('Bank', bank.bank_name) : '') +
      (bank?.bank_account_number ? infoRow('Account #', bank.bank_account_number) : '') +
      (bank?.bank_account_holder ? infoRow('Holder', bank.bank_account_holder) : '')
    )}
    <div style="margin-top:18px;">${ctaButton('Review in admin', adminUrl)}</div>`;
  return withRenderMeta(
    { subject: title, html: wrapTemplate(title, body) },
    title, body, 'en'
  );
}

// 5. Partner notified — payout approved
function payoutApprovedEmail({ partnerName, amount, currency }) {
  const url = `${BASE_URL}/referral/wallet`;
  const title = `Payout approved: ${fmtRefMoney(amount, currency)}`;
  const body = `
    <p style="margin:0 0 12px;">Hi <strong>${partnerName || 'there'}</strong>,</p>
    <p style="margin:0 0 16px;">Your payout request of <strong>${fmtRefMoney(amount, currency)}</strong> has been approved. Funds will be transferred to your bank account shortly.</p>
    ${ctaButton('Track in wallet', url)}`;
  return withRenderMeta(
    { subject: title, html: wrapTemplate(title, body) },
    title, body, 'en'
  );
}

// 6. Partner notified — payout marked paid
function payoutPaidEmail({ partnerName, amount, currency, transactionReference }) {
  const url = `${BASE_URL}/referral/wallet`;
  const title = `Payout sent: ${fmtRefMoney(amount, currency)}`;
  const body = `
    <p style="margin:0 0 12px;">Hi <strong>${partnerName || 'there'}</strong>,</p>
    <p style="margin:0 0 16px;">Your payout of <strong>${fmtRefMoney(amount, currency)}</strong> has been transferred. It should appear in your account within 1–3 business days.</p>
    ${transactionReference ? infoTable(infoRow('Transaction reference', transactionReference)) : ''}
    <div style="margin-top:18px;">${ctaButton('See payout history', url)}</div>`;
  return withRenderMeta(
    { subject: title, html: wrapTemplate(title, body) },
    title, body, 'en'
  );
}

// 7. Partner notified — payout rejected (wallet refunded)
function payoutRejectedEmail({ partnerName, amount, currency, reason }) {
  const url = `${BASE_URL}/referral/wallet`;
  const title = `Payout request not approved`;
  const body = `
    <p style="margin:0 0 12px;">Hi <strong>${partnerName || 'there'}</strong>,</p>
    <p style="margin:0 0 16px;">Your payout request of <strong>${fmtRefMoney(amount, currency)}</strong> was not approved. The amount has been returned to your wallet — you can request again with corrected details.</p>
    ${reason ? `<div style="background:#FEF2F2;border-left:4px solid #DC2626;padding:14px 16px;border-radius:0 8px 8px 0;margin:16px 0;font-size:14px;color:#0A2540;"><strong>Reason</strong><br>${reason}</div>` : ''}
    ${ctaButton('Open wallet', url)}`;
  return withRenderMeta(
    { subject: title, html: wrapTemplate(title, body) },
    title, body, 'en'
  );
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
  emailVerificationEmail,
  contractExpiryIssuerEmail,
  contractExpiryApplicantEmail,
  supplierContractRequestedEmail,
  supplierContractApprovedEmail,
  supplierContractRejectedEmail,
  supplierContractTerminatedEmail,
  // Sprint 4 — Supply Chain Order Lifecycle
  sellerOrderReceivedEmail,
  poApprovalPendingEmail,
  poApprovalResultEmail,
  tradeInvoiceCreatedEmail,
  tradeInvoicePaidEmail,
  monthlySoaEmail,
  // Phase 3 — Referral Program
  referralPartnerWelcomeEmail,
  referredSignupEmail,
  commissionCreditedEmail,
  payoutRequestedAdminEmail,
  payoutApprovedEmail,
  payoutPaidEmail,
  payoutRejectedEmail
};
