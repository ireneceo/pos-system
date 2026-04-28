/**
 * PO realtime helpers — Sprint 5 (2026-04-27).
 *
 * Centralizes:
 *  - Socket.IO emit to seller + buyer rooms in /orders namespace
 *  - tracking_info.events auto-append on status transitions
 *  - tracking_url generation from Carrier catalog
 */

const { Carrier } = require('../models');

const STATUS_NOTE = {
  submitted: 'Order placed by buyer',
  confirmed: 'Order confirmed by seller',
  shipped: 'Order shipped',
  partial_received: 'Order partially received',
  received: 'Order received',
  cancelled: 'Order cancelled'
};

/**
 * Append a status event to po.tracking_info.events.
 * Returns the new tracking_info object (caller must persist).
 */
function appendTrackingEvent(po, status, note, extra) {
  const base = (po.tracking_info && typeof po.tracking_info === 'object' && !Array.isArray(po.tracking_info))
    ? { ...po.tracking_info }
    : {};
  const events = Array.isArray(base.events) ? base.events.slice() : [];
  events.push({
    at: new Date().toISOString(),
    status,
    note: note || STATUS_NOTE[status] || ''
  });
  return { ...base, ...(extra || {}), events };
}

/**
 * Resolve carrier_name + tracking_url from carrier_code (if catalog hit).
 * Falls back to user-provided carrier_name.
 */
async function decorateCarrier(trackingInfo) {
  if (!trackingInfo || typeof trackingInfo !== 'object') return trackingInfo;
  const out = { ...trackingInfo };
  const code = trackingInfo.carrier_code;
  const trackingNumber = trackingInfo.tracking_number;

  if (code) {
    try {
      const carrier = await Carrier.findOne({ where: { code: String(code).toLowerCase(), is_active: true } });
      if (carrier) {
        // Sprint 6: when carrier_code is provided, always overwrite carrier_name from catalog
        // (so carrier swap via tracking edit replaces the previous name).
        out.carrier_name = carrier.name;
        if (carrier.tracking_url_template && trackingNumber) {
          out.tracking_url = carrier.tracking_url_template.replace('{tracking_number}', encodeURIComponent(trackingNumber));
        } else if (!trackingNumber) {
          delete out.tracking_url;
        }
      } else {
        // Unknown code → don't auto-derive tracking_url; preserve user-provided carrier_name
        delete out.tracking_url;
      }
    } catch (e) {
      console.error('[poRealtime] decorateCarrier error:', e.message);
    }
  }
  return out;
}

/**
 * Emit PO event to BOTH seller_${type}_${id} room and buyer_${type}_${id} room.
 * Non-blocking — caller doesn't need to await.
 */
function emitPoEvent(req, po, eventName) {
  try {
    const io = req?.app?.get('io');
    if (!io) return;

    const payload = {
      id: po.id,
      po_number: po.po_number,
      status: po.status,
      seller_type: po.seller_type,
      seller_entity_id: po.seller_entity_id,
      buyer_type: po.entity_type,
      buyer_id: po.entity_id,
      total_amount: po.total_amount,
      currency: po.currency,
      tracking_info: po.tracking_info || null,
      updated_at: new Date().toISOString()
    };

    // Buyer room: every PO has a concrete buyer entity, so this is always
    // unambiguous.
    const buyerRoom = `buyer_${po.entity_type}_${po.entity_id}`;
    io.of('/orders').to(buyerRoom).emit(eventName, payload);

    // Seller room: only emit when we have a concrete seller_entity_id.
    // 'system_admin' as seller has no entity_id (POS catalog itself is the
    // seller — no humans to notify on the seller side). Previously this
    // collapsed all such POs into a single `seller_system_admin_0` room,
    // mixing tenants. Skip the seller emit for these cases instead.
    if (po.seller_type !== 'system_admin' && po.seller_entity_id) {
      const sellerRoom = `seller_${po.seller_type}_${po.seller_entity_id}`;
      io.of('/orders').to(sellerRoom).emit(eventName, payload);
    } else if (po.seller_type !== 'system_admin' && !po.seller_entity_id) {
      // Data anomaly: non-system-admin seller without an entity id should not
      // happen — the `buyer-sellers.js` resolver requires it. Surface in logs
      // so we catch any future regression early.
      console.error(`[poRealtime] PO ${po.po_number} seller_type=${po.seller_type} but seller_entity_id is null — emit skipped`);
    }
  } catch (e) {
    console.error('[poRealtime] emitPoEvent error:', e.message);
  }
}

module.exports = { appendTrackingEvent, decorateCarrier, emitPoEvent, STATUS_NOTE };
