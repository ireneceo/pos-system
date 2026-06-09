/**
 * useConsolidatedTicketPoller — independent poll loop for the optional
 * "Consolidated Order Ticket" (whole order on one ticket → a configurable
 * printer, e.g. a kitchen MAIN printer).
 *
 * ADDITIVE: this never touches the existing auto-print poller / QZ print path.
 * It has its OWN backend print-state (orders.consolidated_printed_at via
 * /api/consolidated-print) so it can never interfere with needs_print /
 * per-item printed_at that drives the station + bill printing.
 *
 * Safety mirrors the existing poller:
 *  - Session cutoff: only prints orders created AFTER this poller started, so
 *    turning the feature ON never floods the printer with historical orders.
 *  - In-flight dedup: an order being printed/acked is skipped by overlapping ticks.
 *  - Print THEN mark: consolidated_printed_at is stamped ONLY after a successful
 *    print (PATCH), so a failure simply retries next tick — exactly once on success.
 */
import { useEffect, useRef } from 'react';
import { getAuthToken } from '../utils/auth';
import { printConsolidatedTicket, getConsolidatedTicketConfig } from '../utils/consolidatedTicket';

interface Opts {
  restaurantId?: number | string | null;
  enabled?: boolean;
  getStoreInfo?: () => any;
  intervalMs?: number;
}

export function useConsolidatedTicketPoller({ restaurantId, enabled = true, getStoreInfo, intervalMs = 5000 }: Opts) {
  const inflight = useRef<Set<string>>(new Set());
  const sessionCutoffRef = useRef<number>(Date.now());
  const tickingRef = useRef(false);
  // Keep getStoreInfo in a ref so a new function identity each render does NOT
  // tear down and restart the poll loop (which would reset the session cutoff).
  const getStoreInfoRef = useRef(getStoreInfo);
  getStoreInfoRef.current = getStoreInfo;

  useEffect(() => {
    if (!enabled || !restaurantId) return;
    // New session start → reset cutoff so only orders from now on print.
    sessionCutoffRef.current = Date.now();
    let stopped = false;

    const mapItem = (it: any) => ({
      menuItem: { name: it.menu_item_name || it.name || (it.menuItem && it.menuItem.name) || 'Item', price: parseFloat(it.price || (it.menuItem && it.menuItem.price) || '0') },
      quantity: it.quantity || 1,
      options: Array.isArray(it.options) ? it.options : [],
      kitchen_station_id: it.kitchen_station_id || null,
      is_set_menu: it.is_set_menu || false,
      set_components: Array.isArray(it.set_components) ? it.set_components : undefined,
      special_instructions: it.special_instructions || it.specialInstructions || '',
      stationName: it.stationName || null,
    });

    const tick = async () => {
      if (tickingRef.current || stopped) return;
      // Only do work when the feature is actually enabled + set to auto-print.
      const cfg = getConsolidatedTicketConfig();
      if (!cfg || !cfg.enabled || !cfg.autoPrint) return;
      tickingRef.current = true;
      try {
        const tok = getAuthToken();
        if (!tok) return;
        const r = await fetch(`/api/consolidated-print/restaurant/${restaurantId}/pending`, {
          headers: { Authorization: `Bearer ${tok}` },
        });
        if (!r.ok) return;
        const j = await r.json();
        const orders: any[] = (j && j.data) || [];
        const gsi = getStoreInfoRef.current;
        const storeInfo = (typeof gsi === 'function') ? gsi() : {};

        for (const ord of orders) {
          if (stopped) break;
          const id = String(ord.id);
          if (inflight.current.has(id)) continue;
          // Session cutoff — skip anything created before this poller started.
          const ms = ord.created_at ? new Date(ord.created_at).getTime()
            : (ord.createdAt ? new Date(ord.createdAt).getTime()
            : (ord.order_date ? new Date(ord.order_date).getTime() : 0));
          if (ms && ms < sessionCutoffRef.current) continue;

          const items = Array.isArray(ord.order_items) ? ord.order_items : [];
          if (items.length === 0) continue;

          const printData: any = {
            orderNumber: ord.order_number,
            pickupNumber: ord.order_number ? String(ord.order_number).split('-')[1] : '',
            tableNumber: ord.table_number || undefined,
            pagerNumber: ord.pager_number || undefined,
            date: new Date(ord.order_date || ord.createdAt || Date.now()),
            orderType: ord.order_type === 'dine_in' ? 'dine-in' : (ord.order_type || 'takeaway'),
            orderSource: ord.source || 'mobile',
            items: items.map(mapItem),
            total: parseFloat(ord.total_amount || '0'),
          };

          inflight.current.add(id);
          try {
            const ok = await printConsolidatedTicket(printData, storeInfo);
            if (ok) {
              // Mark printed (print THEN mark — exactly once on success).
              await fetch(`/api/consolidated-print/${id}/printed`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
                body: '{}',
              });
            }
            // On failure: leave consolidated_printed_at NULL → retried next tick.
          } catch (e) {
            console.error('[consolidatedPoller] order', id, 'error:', e);
          } finally {
            inflight.current.delete(id);
          }
        }
      } catch {
        /* network/transient — try again next tick */
      } finally {
        tickingRef.current = false;
      }
    };

    const h = setInterval(tick, intervalMs);
    // Kick once shortly after mount.
    const t0 = setTimeout(tick, 1500);
    return () => { stopped = true; clearInterval(h); clearTimeout(t0); };
    // getStoreInfo intentionally excluded (read via ref) so the loop is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, enabled, intervalMs]);
}
