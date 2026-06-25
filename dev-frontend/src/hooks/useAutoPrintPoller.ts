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
import { io, Socket } from 'socket.io-client';
import { getAuthToken } from '../utils/auth';

export function useAutoPrintPoller(opts: {
  restaurantId: number | string | null | undefined;
  enabled: boolean;
  getStoreInfo: () => any;
  intervalMs?: number;
}) {
  const { restaurantId, enabled, getStoreInfo, intervalMs = 5000 } = opts;
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
        // 2026-05-29 (Irene 승인): Emergency 모드에서도 poller 가 계속 돈다.
        // 이전엔 여기서 bail → 모바일/QR 주문(poller 가 유일한 인쇄 주체)이 비상시
        // 무인쇄였다. printKitchenTicketViaRawBT 가 emergencyMode 면 최상단에서 죽은
        // station 프린터를 건드리기 전에 cashier(bill) 프린터로 redirect 하므로, bail
        // 없이 정상 경로를 타면 모바일 주문도 cashier 로 안전하게 나간다.
        // (POS 직접경로와의 중복은 printed_at 히스토리 + __autoPrintInflight 로 방지)
        const activeBill = billPrintMod.getActiveBillPrinter();

        // 2026-06-23 (Irene): 다중 POS 매장 자동인쇄 중복 방지. 워크스테이션이 2개 이상이고
        // 이 단말의 워크스테이션 billPrinter.autoPrint 가 false 면, 이 단말은 "자동인쇄 주체"가
        // 아니다(예: POS2 = 주문입력 전용). 자동인쇄를 건너뛴다 → 자동인쇄 주체(autoPrint=true,
        // 보통 메인 POS1)만 인쇄해 같은 주문이 두 단말에서 두 번 찍히던 문제 제거(폰트 다른 2장).
        // 단일 POS/미구성 매장은 영향 없음(workstations<=1 이면 미적용). autoPrint=true 단말(POS1)
        // 은 이 게이트를 절대 안 타므로 동작 100% 무변경.
        // 2026-06-24 (Irene): 다른 디바이스 POS주문도 "모바일처럼" 메인 POS 가 인쇄하게.
        // 모바일이 되는 이유 = 넣은 기기가 자기 주문을 가로채지 않아서다. 프린터 없는 기기는
        // 워크스테이션 미선택(getActiveWorkstationId()=null)이라 getActiveBillPrinter() 가
        // workstations[0](=메인 POS) 를 폴백으로 물려받아 자기가 주문을 claim 후 인쇄 실패→분실시켰다.
        // 다중 POS 매장에서 워크스테이션 미선택 기기는 인쇄 큐를 안 만진다(메인 POS 가 전담). 인쇄
        // 방식 무변경 — "누가 집어가나" 조건만. 단일 POS/미구성 매장(workstations<=1)은 무영향.
        const _wsList = Array.isArray((printSettings as any).workstations) ? (printSettings as any).workstations : [];
        const _wsId = billPrintMod.getActiveWorkstationId();
        if (_wsList.length > 1 && (!_wsId || (activeBill && activeBill.autoPrint === false))) {
          return;
        }

        const path = locationRef.current || window.location.pathname;
        const isOnKDS = path.includes('/kitchen') || path.includes('/kds');

        // 2026-06-04 (Irene): backlog cutoff (docs/PRINT_RULES_MATRIX § 8.7).
        // 자동발행 OFF 동안 쌓인 needs_print 주문이 ON 으로 바꾼 순간 한꺼번에 폭주 인쇄되던
        // 문제. "자동발행 ON 은 켠 시각 이후 들어온 주문만 인쇄" 가 정의. enabledAt(=autoPrint
        // 가 처음 ON 으로 관측된 시각)을 localStorage 에 남기고(리로드 생존), 그보다 먼저 생성된
        // 주문은 자동인쇄 skip(needs_print 유지 → 오더티켓 버튼 수동 가능). OFF 면 enabledAt clear
        // → 다음 ON 때 새로 잡혀 그 이전 백로그는 자동 제외.
        const _kpAutoNow = !!(printSettings.kitchenPrinter && printSettings.kitchenPrinter.autoPrint);
        // 2026-06-25 (Irene "인쇄 폭주"): 백로그 컷오프는 실제 인쇄 게이트(_kitchenAuto =
        // kitchenPrinter.enabled && autoPrint, 마스터)와 동일 기준으로 "자동인쇄 켜짐"을 판정한다.
        // 이전엔 스테이션 autoPrint 까지 OR(_stAutoNow) 로 봐서, 마스터만 꺼지고 스테이션은 켜진
        // 상태(wipe 사고)에선 "한 번도 꺼진 적 없음"으로 오판 → 컷오프 미리셋 → 마스터 복구 시 아침
        // 백로그가 우르르 인쇄됐다. 게이트와 동일 기준으로 맞춰, 마스터 off→on 시 옛 백로그는 dismiss.
        const _kpEnabledNow = (printSettings.kitchenPrinter?.enabled !== false);
        const _anyAutoNow = _kpEnabledNow && _kpAutoNow;
        let _autoEnabledAt = parseInt(localStorage.getItem('kitchenAutoPrintEnabledAt') || '0', 10) || 0;
        if (_anyAutoNow && !_autoEnabledAt) { _autoEnabledAt = Date.now(); try { localStorage.setItem('kitchenAutoPrintEnabledAt', String(_autoEnabledAt)); } catch {} }
        if (!_anyAutoNow && _autoEnabledAt) { try { localStorage.removeItem('kitchenAutoPrintEnabledAt'); } catch {} _autoEnabledAt = 0; }

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
            // 2026-06-24: 아이템 void 재발행이면 backend 가 pending_reprint.data.items 에 "뺀 품목"만
            // 담아 보낸다 → 그 품목만 VOID 티켓으로 인쇄(나머지 품목은 그대로). 일반/이동/취소는 평소대로.
            const kitchenItemsRaw = (ord.pending_reprint && ord.pending_reprint.data && Array.isArray(ord.pending_reprint.data.items) && ord.pending_reprint.data.items.length > 0)
              ? ord.pending_reprint.data.items
              : (Array.isArray(ord.kitchen_items) ? ord.kitchen_items : items);
            const printStoreInfo = (typeof getStoreInfo === 'function') ? getStoreInfo() : {};
            const mapItem = (it: any) => ({
              menuItem: { name: it.menu_item_name || it.name || (it.menuItem && it.menuItem.name) || 'Item', price: parseFloat(it.price || (it.menuItem && it.menuItem.price) || '0') },
              quantity: it.quantity || 1,
              options: Array.isArray(it.options) ? it.options : [],
              kitchen_station_id: it.kitchen_station_id || null,
              added_at: it.added_at || null,
              order_group: it.order_group || 0,
              // 세트 구성품(+옵션) 을 영수증/주방 티켓이 표기·주방분배 할 수 있게 그대로 전달.
              // 이게 없으면 빌/주방에 "SET" 만 찍히고 구성품이 통째로 누락된다.
              is_set_menu: it.is_set_menu || false,
              set_components: Array.isArray(it.set_components) ? it.set_components : undefined,
              // 2026-05-31 (Irene): carry per-item special request to the kitchen ticket.
              special_instructions: it.special_instructions || it.specialInstructions || '',
              // 2026-05-28: stationName backend-enriched (single source).
              // print 함수가 item.stationName 으로 inline tag + station header.
              stationName: it.stationName || null
            });
            const printData: any = {
              // 2026-06-24: 테이블이동 재발행이면 "TABLE CHANGED" 안내 헤더(주방이 옛 티켓 버리게).
              // backend 가 pending_reprint.notice 에 담아 보낸다. 일반 신규주문은 notice 없음.
              ...(ord.pending_reprint && ord.pending_reprint.notice ? { noticeHeader: ord.pending_reprint.notice } : {}),
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
              // 2026-06-25 (Irene "빌에 카드타입 안 나옴"): 주문 card_type(snake) → 빌의 cardType(camel)
              // 으로 전달. billPrint.paymentMethodLabel 이 카드+타입을 라벨에 붙임(인쇄 로직 무변경).
              cardType: ord.card_type || null,
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
              const _kitchenAuto = _kpEnabled && _kpAuto;
              // Backlog cutoff (§8.7): don't auto-print orders created BEFORE this
              // autoPrint session began (prevents the OFF→ON flush flood). needs_print
              // stays → still printable via the manual Kitchen Ticket button.
              const _ordMs = ord.created_at ? new Date(ord.created_at).getTime()
                : (ord.createdAt ? new Date(ord.createdAt).getTime()
                : (ord.order_date ? new Date(ord.order_date).getTime() : 0));
              // 2026-06-24 (Irene): 취소/삭제/이동 안내 재발행(pending_reprint)은 backlog 로 보지
              // 않는다 — 오래된 주문을 "지금" 취소한 현재 동작이므로 dismiss 하면 취소표 분실.
              const _isBacklog = !!(_autoEnabledAt && _ordMs && _ordMs < _autoEnabledAt) && !ord.pending_reprint;
              if (_kitchenAuto && !_isBacklog) {
                // 2026-06-09 (Irene "새주문 2장"): ATOMIC CLAIM before printing.
                // A new order broadcasts an 'autoprint-poke' via localStorage, so EVERY
                // same-origin window/device polls at the SAME instant → two pollers
                // (this hook + MainLayout._printPollFn) both printed the kitchen ticket
                // before either marked it → 2 tickets. Table-move/cancel have NO poke, so
                // their staggered intervals let /printed win first → 1 ticket. The atomic
                // claim (needs_print true→false) lets only ONE caller win → 1 ticket,
                // identical to table-move. On print failure we /print-rearm so another
                // device or the next cycle retries (no permanent "claimed-but-unprinted"
                // block — the outage that made us drop pre-claim before).
                let _claimed = false;
                try {
                  const _cr = await fetch(`/api/orders/${ord.id}/print-claim`, { method: 'PATCH', headers: _h });
                  const _cj = await _cr.json().catch(() => null);
                  _claimed = !!(_cj && _cj.claimed);
                } catch (e: any) { _claimed = false; }
                if (_claimed) {
                  const kitchenPrintData = { ...printData, items: kitchenItemsRaw.map(mapItem) };
                  let ok: any = true;
                  try { ok = await billPrintMod.printKitchenTicketViaRawBT(kitchenPrintData, printStoreInfo); }
                  catch (e: any) { console.error('[autoPrint] kitchen failed:', e); ok = false; }
                  if (ok === false) {
                    // re-arm so another device / next cycle retries (no permanent block)
                    try { await fetch(`/api/orders/${ord.id}/print-rearm`, { method: 'PATCH', headers: _h }); } catch {}
                    // Rule 6: notify POS so the cashier knows the ticket didn't print.
                    try { window.dispatchEvent(new CustomEvent('autoprint-failed', { detail: { orderNumber: ord.order_number, scope: 'kitchen' } })); } catch {}
                  } else {
                    kitchenPrinted = true;
                  }
                }
                // not claimed → another device already owns this ticket, skip silently
              } else if (_isBacklog) {
                // 2026-06-22 (Irene): pre-enable backlog — clear needs_print so it
                // leaves the oldest-20 pending-print window. Otherwise stale backlog
                // rows permanently occupy the window and genuinely NEW orders fall
                // outside it → never auto-print ("주문 밀리면 자동인쇄 안 됨"). Manual
                // Kitchen Ticket button still works (it prints from order_items, not
                // needs_print). No printed_at stamped → not counted as printed.
                try { await fetch(`/api/orders/${ord.id}/print-dismiss`, { method: 'PATCH', headers: _h }); } catch {}
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

    setTimeout(pollFn, 800);
    timer = setInterval(pollFn, intervalMs);
    // 2026-06-04 (Irene): immediate trigger. The POS no longer prints kitchen
    // tickets directly from cart data (that ran a 2nd printer with divergent data
    // → duplicates). New orders print through THIS poller alone (backend-enriched,
    // single ticket per station + counter, like table-move). To keep the ticket
    // prompt instead of waiting up to one poll interval, POSTerminalPage dispatches
    // an 'autoprint-poke' right after creating/paying an order → run pollFn now.
    // De-dup is unchanged (__autoPrintInflight + needs_print/printed_at).
    const onPoke = () => { pollFn(); };
    window.addEventListener('autoprint-poke', onPoke);
    // 2026-06-04 (Irene "첫 티켓 늦게 나옴"): the device that CREATES an order is often a
    // DIFFERENT window/realm than the one that PRINTS — Floor Plan parent vs its POS
    // overlay iframe (overlay's poller is disabled), or a separate terminal. A window
    // CustomEvent can't cross realms, so the printer device only caught the order on its
    // next ~5s interval → late first ticket. A localStorage write fires a 'storage' event
    // in OTHER same-origin windows → the printing device runs pollFn immediately.
    const onStoragePoke = (e: StorageEvent) => { if (e.key === 'autoprint-poke') pollFn(); };
    window.addEventListener('storage', onStoragePoke);

    // 2026-06-25 (Irene "소켓 즉시화"): MainLayout 폴러(_printPollFn)엔 order-created 소켓
    // 트리거가 있지만(120ms 디바운스 → 즉시 폴링), 전체화면 페이지(POS Terminal/KDS/FloorPlan)는
    // MainLayout 이 미mount 라 이 hook 만 돈다. 여기엔 socket 이 없어 다른 기기(POS2)·모바일 주문을
    // 최대 intervalMs(5s) 기다려 느렸다(인쇄 전담 기기가 그 화면에 떠 있을 때 = thefire 케이스).
    // MainLayout 과 동일 패턴으로 order-created/items-added 소켓에 즉시 폴링을 건다.
    // ★ socket 은 "트리거만" — 인쇄 주체는 pollFn(폴러), 중복방지는 print-claim/__autoPrintInflight,
    //   안전망은 interval 폴링. 소켓 누락·단절 시에도 폴링이 fail-safe (분실 0 유지). 인쇄 방식 무변경.
    let socket: Socket | null = null;
    let socketPokeTimer: any = null;
    const socketPoke = () => { if (socketPokeTimer) return; socketPokeTimer = setTimeout(() => { socketPokeTimer = null; pollFn(); }, 120); };
    try {
      socket = io('/orders', { transports: ['websocket', 'polling'], auth: { token: getAuthToken() } });
      // 2026-06-25 (Irene "모바일 주문 인쇄 늦을 때 있음"): 소켓 재연결 직후 1회 폴링 — 끊긴 사이
      // 들어온 주문을 즉시 따라잡는다(이미 운영 반영·bless됨). 중복방지는 print-claim 으로 그대로.
      socket.on('connect', () => { try { socket?.emit('join-restaurant', restaurantId); } catch {} socketPoke(); });
      socket.on('order-created', socketPoke);
      socket.on('order-items-added', socketPoke);
      // 2026-06-25 (Irene "이동/아이템취소 인쇄 느림"): 테이블이동(table-moved)·아이템 void(item-voided)
      // 재발행도 needs_print 를 켜지만 이 두 이벤트를 구독 안 해 5초 폴링까지 늦게 나갔다. 신규주문과
      // 동일하게 즉시 트리거(120ms 디바운스). 인쇄 주체·중복방지(print-claim)는 그대로 — 트리거만 추가.
      socket.on('table-moved', socketPoke);
      socket.on('item-voided', socketPoke);
    } catch {}

    return () => { cancelled = true; if (timer) clearInterval(timer); if (socketPokeTimer) clearTimeout(socketPokeTimer); try { socket?.disconnect(); } catch {} window.removeEventListener('autoprint-poke', onPoke); window.removeEventListener('storage', onStoragePoke); };
  }, [restaurantId, enabled, intervalMs, getStoreInfo]);
}
