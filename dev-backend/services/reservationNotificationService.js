/**
 * Reservation notification service (R1 MVP)
 *
 * 4 events:
 *   - notifyCreated         → push staff (reservation_new), email customer if confirmed
 *   - notifyStatusChanged   → push staff + customer email if status moved
 *   - notifyReminder        → email customer 24h / 2h before
 *   - notifyNoShow          → push staff
 *
 * Reuses existing infra:
 *   - services/pushService.js  (sendPushToRestaurant)
 *   - utils/notificationService.js (sendNotificationBatch)
 *   - utils/emailService.js (sendPlatformEmail) — fallback to customer email
 */
const pushService = require('./pushService');
const User = require('../models/User');
const Customer = require('../models/Customer');
const emailService = require('../utils/emailService');
const notificationService = require('../utils/notificationService');
const { emailLayout, getLogoAttachment } = require('../utils/emailTemplates');

function frontendUrl() {
  return process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production'
    ? 'https://purplehere.com'
    : 'https://dev.purplehere.com');
}

function fmtDateTime(d, timeZone) {
  return new Date(d).toLocaleString('en-MY', {
    timeZone: timeZone || 'Asia/Kuala_Lumpur',
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
}

function customerEmailHtml({ restaurant, reservation, kind, lang }) {
  const dateStr = fmtDateTime(reservation.reserved_at, restaurant.operation_settings?.timeZone);
  const partyLine = `${reservation.party_size} guest${reservation.party_size > 1 ? 's' : ''}`;
  const restaurantName = restaurant.name || 'Restaurant';
  const headlines = {
    confirmation: { title: 'Reservation Confirmed', intro: 'Your reservation is confirmed.' },
    pending:      { title: 'Reservation Received',  intro: 'Your reservation has been received and is awaiting confirmation.' },
    reminder_24h: { title: 'Reservation Reminder',   intro: 'This is a reminder for your reservation tomorrow.' },
    reminder_2h:  { title: 'Reservation Reminder',   intro: 'Your reservation is in 2 hours.' },
    cancelled:    { title: 'Reservation Cancelled',  intro: 'Your reservation has been cancelled.' },
    no_show:      { title: 'Marked as No-Show',      intro: 'Your reservation was marked as no-show.' }
  };
  const h = headlines[kind] || headlines.confirmation;
  const body = `
    <h1 style="color:#0A2540;font-size:22px;margin:0 0 12px;">${h.title}</h1>
    <p style="color:#3D4F66;margin:0 0 20px;">${h.intro}</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #E6EBF1;border-radius:8px;">
      <tr><td style="padding:14px 18px;border-bottom:1px solid #E6EBF1;width:30%;color:#6B7C93;">Restaurant</td><td style="padding:14px 18px;border-bottom:1px solid #E6EBF1;color:#0A2540;">${restaurantName}</td></tr>
      <tr><td style="padding:14px 18px;border-bottom:1px solid #E6EBF1;color:#6B7C93;">Date &amp; Time</td><td style="padding:14px 18px;border-bottom:1px solid #E6EBF1;color:#0A2540;">${dateStr}</td></tr>
      <tr><td style="padding:14px 18px;border-bottom:1px solid #E6EBF1;color:#6B7C93;">Party</td><td style="padding:14px 18px;border-bottom:1px solid #E6EBF1;color:#0A2540;">${partyLine}</td></tr>
      <tr><td style="padding:14px 18px;color:#6B7C93;">Reference</td><td style="padding:14px 18px;color:#0A2540;">#${reservation.id}</td></tr>
    </table>
    <p style="color:#6B7C93;font-size:13px;margin:24px 0 0;">View your reservation:
      <a href="${frontendUrl()}/m/reservations/${reservation.id}" style="color:#635BFF;">${frontendUrl()}/m/reservations/${reservation.id}</a>
    </p>
  `;
  return emailLayout(body);
}

async function notifyCreated(reservation, restaurant) {
  // 1) Staff push (reservation_new)
  try {
    await pushService.sendPushToRestaurant(restaurant.id, {
      title: 'New Reservation',
      body: `${reservation.guest_name} · ${reservation.party_size} pax · ${fmtDateTime(reservation.reserved_at, restaurant.operation_settings?.timeZone)}`,
      category: 'reservation_new',
      data: { type: 'reservation_new', reservation_id: reservation.id, url: `/pos/reservations` }
    });
  } catch (e) { console.error('[Reservation] staff push failed:', e.message); }

  // 2) Customer email (confirmation or pending)
  if (reservation.guest_email) {
    try {
      const kind = reservation.status === 'confirmed' ? 'confirmation' : 'pending';
      await emailService.sendPlatformEmail({
        to: reservation.guest_email,
        subject: kind === 'confirmation' ? 'Reservation Confirmed' : 'Reservation Received',
        html: customerEmailHtml({ restaurant, reservation, kind })
      });
    } catch (e) { console.error('[Reservation] customer email failed:', e.message); }
  }
}

async function notifyStatusChanged(reservation, restaurant, newStatus) {
  // staff push
  try {
    await pushService.sendPushToRestaurant(restaurant.id, {
      title: `Reservation ${newStatus}`,
      body: `${reservation.guest_name} · #${reservation.id}`,
      category: newStatus === 'no_show' ? 'reservation_no_show' : 'reservation_status_changed',
      data: { type: 'reservation_status_changed', reservation_id: reservation.id, url: `/pos/reservations` }
    });
  } catch (e) { console.error('[Reservation] status push failed:', e.message); }

  // customer email — only for major status changes
  const customerNotifyStatuses = ['confirmed', 'cancelled', 'no_show'];
  if (customerNotifyStatuses.includes(newStatus) && reservation.guest_email) {
    try {
      const kind = newStatus === 'confirmed' ? 'confirmation' :
                   newStatus === 'cancelled' ? 'cancelled' : 'no_show';
      await emailService.sendPlatformEmail({
        to: reservation.guest_email,
        subject: `Reservation ${newStatus}`,
        html: customerEmailHtml({ restaurant, reservation, kind })
      });
    } catch (e) { console.error('[Reservation] status email failed:', e.message); }
  }
}

async function notifyReminder(reservation, restaurant, kind /* '24h' | '2h' */) {
  if (!reservation.guest_email) return;
  try {
    await emailService.sendPlatformEmail({
      to: reservation.guest_email,
      subject: kind === '24h' ? 'Reminder: Reservation Tomorrow' : 'Reminder: Reservation in 2 Hours',
      html: customerEmailHtml({ restaurant, reservation, kind: kind === '24h' ? 'reminder_24h' : 'reminder_2h' })
    });
  } catch (e) { console.error('[Reservation] reminder email failed:', e.message); }
}

async function notifyNoShow(reservation, restaurant) {
  await notifyStatusChanged(reservation, restaurant, 'no_show');
}

module.exports = { notifyCreated, notifyStatusChanged, notifyReminder, notifyNoShow };
