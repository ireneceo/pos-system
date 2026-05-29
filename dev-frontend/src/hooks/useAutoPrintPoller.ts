/**
 * useAutoPrintPoller
 *
 * 2026-05-28 매장 critical: backend-driven 자동 인쇄. socket 의존 없이
 * 10초 polling 으로 backend 의 needs_print=true 주문 catch → 인쇄 → PATCH.
 *
 * Fullscreen pages (POSTerminal / FloorPlan / KDS) 도 이 hook 호출하면
 * MainLayout 안 mount 되어도 polling 동작. 매장 device 가 어떤 페이지에
 * 있든 인쇄 보장.
 *
 * Race-safe: PATCH /printed 가 unique transaction lock 으로 첫 device 가
 * 잡고 나머지는 PATCH fail → skip.
 */
import { useEffect, useRef } from 'react';
import { getAuthToken } from '../utils/auth';

export function useAutoPrintPoller(opts: {
  restaurantId: number | string | null | undefined;
  enabled: boolean;
  getStoreInfo: () => any;
  intervalMs?: number;
}) {
  const { restaurantId, enabled, getStoreInfo, intervalMs = 10000 } = opts;
  const locationRef = useRef<string>('');
  useEffect(() => {
    locationRef.current = window.location.pathname;
    const onPop = () => { locationRef.current = window.location.pathname; };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (!enabled || !restaurantId) return;
    let timer: any = null;
    let cancelled = false;

    const pollFn = async () => {
      if (cancelled) return;
      try {
        const tok = getAuthToken();
        if (!tok) return;
        const r = await fetch(`/api/orders/restaurant/${restaurantId}/pending-print`, { headers: { Authorization: `Bearer ${tok}` } });
        if (!r.ok) return;
        const j = await r.json().catch(() => null);
        const list: any[] = (j && j.data) || [];
        if (list.length === 0) return;

        const billPrintMod = await import('../utils/billPrint');
        const printSettings = billPrintMod.getPrinterSettings();
        if (printSettings.emergencyMode) return;
        const activeBill = billPrintMod.getActiveBillPrinter();
        const path = locationRef.current || window.location.pathname;
        const isOnKDS = path.includes('/kitchen') || path.includes('/kds');

        for (const ord of list) {
          try {
            // 2026-05-28: in-memory dedup (single device race) — 같은 orderId
            // 가 이미 인쇄 중이면 skip. 인쇄 성공 후에만 backend PATCH.
            if ((window as any).__autoPrintInflight && (window as any).__autoPrintInflight[ord.id]) continue;
            (window as any).__autoPrintInflight = (window as any).__autoPrintInflight || {};
            (window as any).__autoPrintInflight[ord.id] = true;

            const items = Array.isArray(ord.order_items) ? ord.order_items : (typeof ord.order_items === 'string' ? (() => { try { return JSON.parse(ord.order_items); } catch { return []; } })() : []);
            // 2026-05-29: kitchen ticket prints ONLY not-yet-printed items
            // (backend `kitchen_items`). On a +Round add this is just the new
            // rows, so previously-sent items never reprint. Falls back to the
            // full list for older backends that don't send kitchen_items.
            const kitchenItemsRaw = Array.isArray(ord.kitchen_items) ? ord.kitchen_items : items;
            const printStoreInfo = (typeof getStoreInfo === 'function') ? getStoreInfo() : {};
            const mapItem = (it: any) => ({
              menuItem: { name: it.menu_item_name || it.name || (it.menuItem && it.menuItem.name) || 'Item', price: parseFloat(it.price || (it.menuItem && it.menuItem.price) || '0') },
              quantity: it.quantity || 1,
              options: Array.isArray(it.options) ? it.options : [],
              kitchen_station_id: it.kitchen_station_id || null,
              added_at: it.added_at || null,
              order_group: it.order_group || 0,
              // 2026-05-28: stationName backend-enriched (single source).
              // print 함수가 item.stationName 으로 inline tag + station header.
              stationName: it.stationName || null
            });
            const printData: any = {
              orderNumber: ord.order_number,
              pickupNumber: ord.order_number ? String(ord.order_number).split('-')[1] : '',
              tableNumber: ord.table_number || undefined,
              pagerNumber: ord.pager_number || undefined,
              date: new Date(ord.order_date || ord.createdAt || Date.now()),
              orderType: ord.order_type === 'dine_in' ? 'dine-in' : (ord.order_type || 'takeaway'),
              orderSource: ord.source || 'mobile',
              items: items.map(mapItem),
              subtotal: parseFloat(ord.subtotal || '0'),
              tax: parseFloat(ord.tax || '0'),
              serviceCharge: parseFloat(ord.service_charge || '0'),
              serviceChargeRate: parseFloat(ord.service_charge_rate || '0'),
              takeawayCharge: parseFloat(ord.takeaway_charge || '0'),
              discount: parseFloat(ord.discount || '0'),
              total: parseFloat(ord.total_amount || '0'),
              paymentMethod: ord.payment_method || 'counter',
              cashierName: ord.source === 'mobile' ? 'Mobile Order' : 'POS'
            };

            // Bill — payment 완료된 주문만 polling 으로 인쇄 (모바일 QR 즉시
            // 결제 / staff 가 결제 버튼 누름 후 needs_bill set 등). counter
            // (나중 결제) = payment_status='pending' → bill 안 나옴.
            const _isPaid = ord.payment_status === 'completed' || ord.payment_status === 'partial';
            const _h = { Authorization: `Bearer ${tok}` };
            let billOk = true, billPrinted = false, kitchenPrinted = false;
            if (_isPaid && ord.needs_bill && activeBill?.enabled && activeBill?.autoPrint) {
              const copies = Math.max(1, Math.min(3, parseInt((printSettings.receiptSettings && printSettings.receiptSettings.copiesAfterPayment) || (JSON.parse(localStorage.getItem('receiptSettings') || '{}').copiesAfterPayment) || 1, 10) || 1));
              const autoOpenDrawer = (printSettings.receiptSettings && printSettings.receiptSettings.autoOpenDrawer) !== false && (JSON.parse(localStorage.getItem('receiptSettings') || '{}').autoOpenDrawer !== false);
              for (let i = 0; i < copies; i++) {
                const isLast = i === copies - 1;
                const dataForCopy = { ...printData, __drawerPulse: !!(autoOpenDrawer && isLast) };
                try { const ok = await billPrintMod.printBillViaRawBT(dataForCopy, printStoreInfo); if (ok === false) billOk = false; }
                catch (e: any) { console.error('[autoPrint] bill failed:', e); billOk = false; }
                if (i < copies - 1) await new Promise(r => setTimeout(r, 600));
              }
              billPrinted = billOk;
              if (!billOk) { try { window.dispatchEvent(new CustomEvent('autoprint-failed', { detail: { orderNumber: ord.order_number, scope: 'bill' } })); } catch {} }
            }

            // Kitchen ticket — PRINT THEN MARK (no pre-claim). Prints ONLY the
            // not-yet-printed items (kitchen_items) so +Round sends only new rows.
            // No pre-claim → a device can never "win then fail to print" and block
            // everyone (that caused the "nothing prints" outage). printed_at is
            // stamped ONLY on success. (KDS is display-only and doesn't run this.)
            if (ord.needs_print && !isOnKDS && kitchenItemsRaw.length > 0) {
              const _kp: any = printSettings.kitchenPrinter || {};
              const _kpEnabled = _kp.enabled !== false;
              const _kpAuto = !!_kp.autoPrint;
              const _stationAutoPrint = Object.values(printSettings.kitchenStationPrinters || {}).some((s: any) => s?.autoPrint);
              const _kitchenAuto = (_kpEnabled && !_kpAuto) ? false : (_kpAuto || _stationAutoPrint);
              if (_kitchenAuto) {
                const kitchenPrintData = { ...printData, items: kitchenItemsRaw.map(mapItem) };
                let ok: any = true;
                try { ok = await billPrintMod.printKitchenTicketViaRawBT(kitchenPrintData, printStoreInfo); }
                catch (e: any) { console.error('[autoPrint] kitchen failed:', e); ok = false; }
                if (ok === false) {
                  // Rule 6: notify POS, keep needs_print=true so next cycle retries.
                  try { window.dispatchEvent(new CustomEvent('autoprint-failed', { detail: { orderNumber: ord.order_number, scope: 'kitchen' } })); } catch {}
                } else {
                  kitchenPrinted = true;
                }
              }
            }

            // Mark printed ONLY after a successful kitchen print (post-print).
            if (kitchenPrinted) {
              try { await fetch(`/api/orders/${ord.id}/printed`, { method: 'PATCH', headers: _h }); } catch (e: any) { console.error('[autoPrint] PATCH printed failed:', e); }
              console.log('[autoPrint] ✓ kitchen order', ord.order_number);
            } else if (billPrinted) {
              // bill printed but no kitchen print this cycle — clear needs_bill only
              try { await fetch(`/api/orders/${ord.id}/bill-printed`, { method: 'PATCH', headers: _h }); } catch (e: any) { /* non-fatal */ }
            }
            delete (window as any).__autoPrintInflight[ord.id];
          } catch (e) {
            delete (window as any).__autoPrintInflight?.[ord.id];
            console.error('[autoPrint] per-order error:', e);
          }
        }
      } catch (e) { console.error('[autoPrint] cycle error:', e); }
    };

    setTimeout(pollFn, 2000);
    timer = setInterval(pollFn, intervalMs);
    return () => { cancelled = true; if (timer) clearInterval(timer); };
  }, [restaurantId, enabled, intervalMs, getStoreInfo]);
}
