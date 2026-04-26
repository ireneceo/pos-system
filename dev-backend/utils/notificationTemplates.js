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

/**
 * Contract expiry reminder — 발행자(internal team) 대상
 */
function contractExpiryIssuerEmail(contract, daysRemaining, lang = 'en') {
  const { getEmailText } = require('./i18n');
  const t = (key, params) => getEmailText(lang, key, params);

  const isUrgent = daysRemaining <= 7;
  const endDate = new Date(contract.end_date).toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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
function contractExpiryApplicantEmail(contract, daysRemaining, issuerName, lang = 'en') {
  const { getEmailText } = require('./i18n');
  const t = (key, params) => getEmailText(lang, key, params);

  const endDate = new Date(contract.end_date).toLocaleDateString(lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });

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

function fmtDate(date, lang = 'en') {
  if (!date) return '—';
  try {
    const locale = lang === 'ko' ? 'ko-KR' : lang === 'zh' ? 'zh-CN' : lang === 'ms' ? 'ms-MY' : 'en-US';
    return new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return String(date);
  }
}

/**
 * Seller Order Received — sent to Seller (Supplier/Brand/Foodcourt) when buyer submits PO.
 */
function sellerOrderReceivedEmail({ buyerName, poNumber, total, currency, link }) {
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
 * Trade Invoice Created — sent to Buyer (Restaurant/Brand/Foodcourt) when supplier issues a trade invoice.
 */
function tradeInvoiceCreatedEmail({ sellerName, invoiceNumber, total, currency, dueDate, link }) {
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
      infoRow('Due Date', fmtDate(dueDate)) +
      infoRow('Status', '<span style="color:#F59E0B;font-weight:600;">Pending</span>')
    )}
    ${ctaButton('View Invoice', link || `${BASE_URL}/pos/purchase-invoices`)}`;

  return withRenderMeta({
    subject: `Trade Invoice ${safeInv} - ${fmtMoney(total, currency)}`,
    html: wrapTemplate(title, body, 'en'),
    text: `Trade invoice ${safeInv} from ${safeSeller}. Amount: ${fmtMoney(total, currency)}. Due: ${fmtDate(dueDate)}.`
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
function monthlySoaEmail({ sellerName, month, invoices = [], totalDue, currency, dueDate, link }) {
  const title = 'Monthly Statement of Account';
  const safeSeller = (sellerName || 'Your supplier').toString().slice(0, 120);
  const safeMonth = (month || '—').toString().slice(0, 40);

  const rowsHtml = (invoices || []).slice(0, 50).map(inv => `
    <tr>
      <td style="padding:8px 12px;font-size:13px;color:#111827;border-bottom:1px solid #E5E7EB;">${(inv.invoice_number || '—').toString().slice(0, 60)}</td>
      <td style="padding:8px 12px;font-size:13px;color:#6B7280;border-bottom:1px solid #E5E7EB;">${fmtDate(inv.created_at || inv.createdAt)}</td>
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
      infoRow('Due Date', fmtDate(dueDate))
    )}
    ${invoicesTable}
    ${ctaButton('View SOA & Pay', link || `${BASE_URL}/pos/purchase-invoices/soa`)}`;

  return withRenderMeta({
    subject: `Monthly SOA from ${safeSeller} - ${safeMonth} (${fmtMoney(totalDue, currency)})`,
    html: wrapTemplate(title, body, 'en'),
    text: `Monthly statement from ${safeSeller} for ${safeMonth}. Invoices: ${(invoices || []).length}. Total due: ${fmtMoney(totalDue, currency)}. Due: ${fmtDate(dueDate)}.`
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
  emailVerificationEmail,
  contractExpiryIssuerEmail,
  contractExpiryApplicantEmail,
  supplierContractRequestedEmail,
  supplierContractApprovedEmail,
  supplierContractRejectedEmail,
  supplierContractTerminatedEmail,
  // Sprint 4 — Supply Chain Order Lifecycle
  sellerOrderReceivedEmail,
  tradeInvoiceCreatedEmail,
  tradeInvoicePaidEmail,
  monthlySoaEmail
};
