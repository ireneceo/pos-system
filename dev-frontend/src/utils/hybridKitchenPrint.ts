/**
 * hybridKitchenPrint — POS 하이브리드(로컬 즉시) 주방 인쇄.
 *
 * 2026-06-25 (Irene): POS1 이 "자기 처리한 주문/동작"(신규·이동·취소·void)을 폴러 사이클을
 * 안 기다리고 **그 자리에서 즉시 로컬(QZ) 인쇄**. 핵심 안전장치:
 *   1) 데이터는 폴러와 동일한 **백엔드 enrich 응답**(set_components[].kitchen_station_id 등) 사용 →
 *      옛 "cart 데이터 직접인쇄"가 divergence 로 중복나던 사고(useAutoPrintPoller:262-268) 회피.
 *   2) **동일 atomic claim**(needs_print true→false) → 폴러/다른기기와 한쪽만 승리 = 중복 0.
 *   3) 실패 시 **print-rearm** → 폴러가 fallback 재시도(분실 0).
 *   4) 게이트: 다중POS 자동인쇄 주체(POS1)만. 미선택/autoPrint=false/마스터 OFF 면 안 함(폴러에 위임).
 * billPrint(인쇄 방식/라우팅) 무변경 — "언제/누가 찍나"만 즉시로. 폴러(useAutoPrintPoller)는 무수정 fallback.
 */
import { getAuthToken } from './auth';

export async function printOrderKitchenNow(ord: any, getStoreInfo: () => any): Promise<boolean> {
  try {
    if (!ord || ord.id == null) return false;
    const tok = getAuthToken();
    if (!tok) return false;
    const billPrintMod: any = await import('./billPrint');
    const printSettings: any = billPrintMod.getPrinterSettings();

    // 자동인쇄 마스터 OFF면 즉시인쇄 안 함(수동 경로를 따름 — 폴러도 안 찍음).
    const _kp: any = printSettings.kitchenPrinter || {};
    if (_kp.enabled === false || !_kp.autoPrint) return false;

    // 게이트(폴러와 동일): 다중POS 에서 워크스테이션 미선택 or autoPrint=false 단말은 즉시인쇄 안 함
    // → 지정 POS(폴러)가 전담. 단일/미구성 매장(workstations<=1)은 무영향.
    const activeBill: any = billPrintMod.getActiveBillPrinter();
    const _wsList: any[] = Array.isArray(printSettings.workstations) ? printSettings.workstations : [];
    const _wsId = billPrintMod.getActiveWorkstationId();
    if (_wsList.length > 1 && (!_wsId || (activeBill && activeBill.autoPrint === false))) return false;

    // KDS 화면이면 즉시인쇄 안 함(표시 전용).
    const path = (typeof window !== 'undefined' && window.location && window.location.pathname) || '';
    if (path.includes('/kitchen') || path.includes('/kds')) return false;

    let items = ord.order_items;
    if (typeof items === 'string') { try { items = JSON.parse(items); } catch { items = []; } }
    items = Array.isArray(items) ? items : [];
    // void 재발행이면 backend 가 pending_reprint.data.items 에 "뺀 품목"만. 일반/이동/취소는 안 찍힌 품목.
    const kitchenItemsRaw = (ord.pending_reprint && ord.pending_reprint.data && Array.isArray(ord.pending_reprint.data.items) && ord.pending_reprint.data.items.length > 0)
      ? ord.pending_reprint.data.items
      : (Array.isArray(ord.kitchen_items) ? ord.kitchen_items : items.filter((it: any) => !it.printed_at));
    if (!ord.needs_print || !kitchenItemsRaw || kitchenItemsRaw.length === 0) return false;

    const printStoreInfo = (typeof getStoreInfo === 'function') ? getStoreInfo() : {};
    // 폴러(useAutoPrintPoller mapItem)와 동일 매핑 — 세트 구성품/옵션/스테이션/특별요청 보존.
    const mapItem = (it: any) => ({
      menuItem: { name: it.menu_item_name || it.name || (it.menuItem && it.menuItem.name) || 'Item', price: parseFloat(it.price || (it.menuItem && it.menuItem.price) || '0') },
      quantity: it.quantity || 1,
      options: Array.isArray(it.options) ? it.options : [],
      kitchen_station_id: it.kitchen_station_id || null,
      added_at: it.added_at || null,
      order_group: it.order_group || 0,
      is_set_menu: it.is_set_menu || false,
      set_components: Array.isArray(it.set_components) ? it.set_components : undefined,
      special_instructions: it.special_instructions || it.specialInstructions || '',
      stationName: it.stationName || null
    });
    const printData: any = {
      ...(ord.pending_reprint && ord.pending_reprint.notice ? { noticeHeader: ord.pending_reprint.notice } : {}),
      orderNumber: ord.order_number,
      pickupNumber: ord.order_number ? String(ord.order_number).split('-')[1] : '',
      tableNumber: ord.table_number || undefined,
      pagerNumber: ord.pager_number || undefined,
      date: new Date(ord.order_date || ord.createdAt || Date.now()),
      orderType: ord.order_type === 'dine_in' ? 'dine-in' : (ord.order_type || 'takeaway'),
      orderSource: ord.source || 'pos',
      items: kitchenItemsRaw.map(mapItem),
      subtotal: parseFloat(ord.subtotal || '0'),
      tax: parseFloat(ord.tax || '0'),
      serviceCharge: parseFloat(ord.service_charge || '0'),
      serviceChargeRate: parseFloat(ord.service_charge_rate || '0'),
      takeawayCharge: parseFloat(ord.takeaway_charge || '0'),
      discount: parseFloat(ord.discount || '0'),
      total: parseFloat(ord.total_amount || '0'),
      paymentMethod: ord.payment_method || 'counter',
      cardType: ord.card_type || null,
      cashierName: ord.source === 'mobile' ? 'Mobile Order' : 'POS'
    };

    // 같은 기기 폴러와 동시 인쇄 방지(폴러와 공유하는 in-memory 플래그).
    (window as any).__autoPrintInflight = (window as any).__autoPrintInflight || {};
    if ((window as any).__autoPrintInflight[ord.id]) return false;
    (window as any).__autoPrintInflight[ord.id] = true;
    const _h = { Authorization: `Bearer ${tok}` };
    try {
      // ATOMIC CLAIM — 폴러/다른기기와 동일. 한쪽만 needs_print true→false 성공 → 중복 0.
      const _cr = await fetch(`/api/orders/${ord.id}/print-claim`, { method: 'PATCH', headers: _h });
      const _cj = await _cr.json().catch(() => null);
      if (!(_cj && _cj.claimed)) return false; // 이미 누가 claim → 즉시인쇄 skip(폴러가 처리했거나 중복방지)
      // 2026-06-26 (Irene "추가주문 2번 / 같은 아이템 2-3번"): heartbeat — 인쇄 도는 동안
      // print_claimed_at 5초 갱신 → "살아서 인쇄 중" claim 이 stale 자동복구로 되살아나 폴러가
      // 또 찍는 중복 차단. 진짜 죽으면 박동 멈춰 10초 뒤 정상 복구(분실 방지 유지).
      let _hb: any = setInterval(() => { fetch(`/api/orders/${ord.id}/print-heartbeat`, { method: 'PATCH', headers: _h }).catch(() => {}); }, 5000);
      // 추가주문(+Round)은 "그 회차(order_group) 품목만" 따로 1장씩 — 미인쇄분이 여러 회차 쌓여
      // 있어도 회차별로 쪼개 발행(누적/전체뭉치 0, 분실 0). 안내 재발행(pending_reprint)은 분할 안 함.
      const _isReprint = !!(ord.pending_reprint && ord.pending_reprint.data && Array.isArray(ord.pending_reprint.data.items) && ord.pending_reprint.data.items.length > 0);
      let _batches: any[][];
      if (_isReprint) {
        _batches = [kitchenItemsRaw];
      } else {
        const _bg = new Map<any, any[]>();
        for (const it of kitchenItemsRaw) { const g = (it.order_group != null ? it.order_group : 0); if (!_bg.has(g)) _bg.set(g, []); _bg.get(g)!.push(it); }
        _batches = [..._bg.keys()].sort((a, b) => Number(a) - Number(b)).map(g => _bg.get(g)!);
      }
      let ok: any = true;
      try {
        for (let bi = 0; bi < _batches.length; bi++) {
          let r: any = true;
          try { r = await billPrintMod.printKitchenTicketViaRawBT({ ...printData, items: _batches[bi].map(mapItem) }, printStoreInfo); }
          catch (e) { r = false; }
          if (r === false) ok = false;
          if (bi < _batches.length - 1) await new Promise(res => setTimeout(res, 700));
        }
      } finally { if (_hb) { clearInterval(_hb); _hb = null; } }
      if (ok === false) {
        // 실패 → re-arm 해서 폴러(fallback)가 재시도(분실 0).
        try { await fetch(`/api/orders/${ord.id}/print-rearm`, { method: 'PATCH', headers: _h }); } catch {}
        try { window.dispatchEvent(new CustomEvent('autoprint-failed', { detail: { orderNumber: ord.order_number, scope: 'kitchen-hybrid' } })); } catch {}
        return false;
      }
      try { await fetch(`/api/orders/${ord.id}/printed`, { method: 'PATCH', headers: _h }); } catch {}
      return true;
    } finally {
      delete (window as any).__autoPrintInflight[ord.id];
    }
  } catch (e) {
    console.error('[hybridPrint] error:', e);
    return false;
  }
}
