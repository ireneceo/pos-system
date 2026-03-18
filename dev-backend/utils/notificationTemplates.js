/**
 * Notification Email Templates
 * Uses shared emailLayout from emailTemplates.js for consistent branding.
 */

const { emailLayout } = require('./emailTemplates');

const BRAND_COLOR = '#635BFF';

function ctaButton(label, url) {
  if (!url) return '';
  return `<div style="text-align:center;margin:24px 0 8px;">
      <a href="${url}" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">${label}</a>
    </div>`;
}

function wrapTemplate(title, bodyContent) {
  const content = `
    <h2 style="color:#1A1A2E;font-size:20px;font-weight:600;margin:0 0 8px;">${title}</h2>
    ${bodyContent}`;
  return emailLayout(content);
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
function noticeReceivedEmail(notice, authorName) {
  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      A new notice has been posted.
    </p>
    ${infoTable(
      infoRow('Title', notice.title || 'Untitled') +
      infoRow('Posted by', authorName || 'Unknown') +
      infoRow('Priority', notice.priority || 'Normal') +
      infoRow('Date', new Date(notice.created_at || notice.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }))
    )}
    <p style="color: #6B7280; font-size: 14px; margin: 0 0 24px;">
      ${(notice.content || '').replace(/<[^>]*>/g, '').slice(0, 300)}${(notice.content || '').length > 300 ? '...' : ''}
    </p>
    ${ctaButton('View Notice', 'https://purplehere.com/pos/notices')}`;

  return {
    subject: `New Notice: ${(notice.title || 'Untitled').slice(0, 60)}`,
    html: wrapTemplate('New Notice', body),
    text: `New Notice: ${notice.title}\nPosted by: ${authorName}\n\n${(notice.content || '').replace(/<[^>]*>/g, '').slice(0, 500)}`
  };
}

/**
 * New comment on a notice or ticket
 */
function commentReceivedEmail(comment, entityTitle, commenterName) {
  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      <strong>${commenterName || 'Someone'}</strong> commented on <strong>${entityTitle || 'an item'}</strong>.
    </p>
    <div style="background: #F9FAFB; border-left: 4px solid #635BFF; padding: 16px; margin: 0 0 24px; border-radius: 0 8px 8px 0;">
      <p style="color: #374151; font-size: 14px; margin: 0;">
        ${(comment.content || '').replace(/<[^>]*>/g, '').slice(0, 500)}
      </p>
    </div>
    ${ctaButton('View & Reply', 'https://purplehere.com/pos/dashboard')}`;

  return {
    subject: `New Comment on: ${(entityTitle || 'item').slice(0, 50)}`,
    html: wrapTemplate('New Comment', body),
    text: `${commenterName} commented on "${entityTitle}":\n\n${(comment.content || '').replace(/<[^>]*>/g, '').slice(0, 500)}`
  };
}

/**
 * New inquiry/ticket received (for managers)
 */
function inquiryReceivedEmail(ticket, requesterName) {
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
    <p style="color: #6B7280; font-size: 14px; margin: 0 0 24px;">
      ${(ticket.description || ticket.content || '').replace(/<[^>]*>/g, '').slice(0, 300)}
    </p>
    ${ctaButton('Review Inquiry', 'https://purplehere.com/pos/dashboard')}`;

  return {
    subject: `New Inquiry: ${(ticket.title || ticket.subject || 'No subject').slice(0, 50)}`,
    html: wrapTemplate('New Inquiry', body),
    text: `New Inquiry from ${requesterName}\nSubject: ${ticket.title || ticket.subject}\nCategory: ${ticket.category}\n\n${(ticket.description || ticket.content || '').replace(/<[^>]*>/g, '').slice(0, 500)}`
  };
}

/**
 * Inquiry reply received (for the requester)
 */
function inquiryRepliedEmail(ticket, reply, replierName) {
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
        ${(reply.content || '').replace(/<[^>]*>/g, '').slice(0, 500)}
      </p>
    </div>
    ${ctaButton('View Conversation', 'https://purplehere.com/pos/dashboard')}`;

  return {
    subject: `Reply to: ${(ticket.title || ticket.subject || 'Your inquiry').slice(0, 50)}`,
    html: wrapTemplate('Inquiry Reply', body),
    text: `Reply to "${ticket.title || ticket.subject}" from ${replierName}:\n\n${(reply.content || '').replace(/<[^>]*>/g, '').slice(0, 500)}`
  };
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

  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      A ticket status has been updated.
    </p>
    ${infoTable(
      infoRow('Subject', ticket.title || ticket.subject || 'No subject') +
      infoRow('New Status', `<span style="display: inline-block; padding: 4px 12px; background: ${color}20; color: ${color}; border-radius: 12px; font-weight: 600; font-size: 13px;">${newStatus}</span>`)
    )}
    ${ctaButton('View Ticket', 'https://purplehere.com/pos/dashboard')}`;

  return {
    subject: `Ticket Update: ${(ticket.title || ticket.subject || 'Ticket').slice(0, 40)} - ${newStatus}`,
    html: wrapTemplate('Ticket Status Update', body),
    text: `Ticket "${ticket.title || ticket.subject}" status changed to: ${newStatus}`
  };
}

/**
 * Invoice created notification (for restaurant admin/owner)
 */
function invoiceCreatedEmail(invoice, restaurantName) {
  const amount = `${invoice.currency} ${parseFloat(invoice.total_amount).toFixed(2)}`;
  const dueDate = new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      A new invoice has been issued for <strong>${restaurantName}</strong>.
    </p>
    ${infoTable(
      infoRow('Invoice No.', invoice.invoice_number) +
      infoRow('Amount', `<span style="color: #635BFF; font-weight: 700; font-size: 16px;">${amount}</span>`) +
      infoRow('Due Date', dueDate) +
      infoRow('Status', 'Pending')
    )}
    ${ctaButton('View Invoice', 'https://purplehere.com/pos/invoices')}`;

  return {
    subject: `Invoice ${invoice.invoice_number} - ${amount} Due ${dueDate}`,
    html: wrapTemplate('New Invoice', body),
    text: `New Invoice ${invoice.invoice_number}\nAmount: ${amount}\nDue: ${dueDate}\nRestaurant: ${restaurantName}`
  };
}

/**
 * Invoice overdue reminder
 */
function invoiceOverdueEmail(invoice, restaurantName) {
  const amount = `${invoice.currency} ${parseFloat(invoice.total_amount).toFixed(2)}`;
  const dueDate = new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

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
    ${ctaButton('Pay Now', 'https://purplehere.com/pos/invoices')}`;

  return {
    subject: `OVERDUE: Invoice ${invoice.invoice_number} - ${amount}`,
    html: wrapTemplate('Invoice Overdue', body),
    text: `OVERDUE Invoice ${invoice.invoice_number}\nAmount: ${amount}\nDue: ${dueDate}\nRestaurant: ${restaurantName}`
  };
}

/**
 * Invoice payment confirmed (for the issuer)
 */
function invoicePaidEmail(invoice, restaurantName) {
  const amount = `${invoice.currency} ${parseFloat(invoice.total_amount).toFixed(2)}`;

  const body = `
    <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">
      Payment has been confirmed for an invoice from <strong>${restaurantName}</strong>.
    </p>
    ${infoTable(
      infoRow('Invoice No.', invoice.invoice_number) +
      infoRow('Amount', `<span style="color: #10B981; font-weight: 700; font-size: 16px;">${amount}</span>`) +
      infoRow('Status', '<span style="color: #10B981; font-weight: 600;">Paid</span>')
    )}
    ${ctaButton('View Details', 'https://purplehere.com/pos/invoices')}`;

  return {
    subject: `Payment Confirmed: Invoice ${invoice.invoice_number} - ${amount}`,
    html: wrapTemplate('Payment Confirmed', body),
    text: `Payment Confirmed for Invoice ${invoice.invoice_number}\nAmount: ${amount}\nRestaurant: ${restaurantName}`
  };
}

module.exports = {
  noticeReceivedEmail,
  commentReceivedEmail,
  inquiryReceivedEmail,
  inquiryRepliedEmail,
  ticketStatusChangedEmail,
  invoiceCreatedEmail,
  invoiceOverdueEmail,
  invoicePaidEmail
};
