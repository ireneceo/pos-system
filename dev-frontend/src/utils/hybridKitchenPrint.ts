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
      stationName: it.stationName || null,
      // 2026-06-27 (Irene): 아이템취소 품목별 줄긋기 플래그 보존.
      _voided: !!it._voided
    });
    // 2026-06-29 (Irene): 통합티켓 = "전체 주문 한 장"(재발행만). 스테이션은 라운드별 그대로, 통합만 전체.
    // 안내(noticeHeader)·라벨은 상황별 그대로. 취소줄은 품목별 _voided 로: 이동/머지=없음, 주문취소=전체,
    // 아이템취소=취소품목만(order_items 에서 제거됐으므로 data.items 의 취소품목을 줄긋기로 추가).
    let _fullOrderItems: any[] | undefined;
    if (ord.pending_reprint) {
      const _allCancel = ord.pending_reprint.type === 'cancel';
      _fullOrderItems = items.map((it: any) => mapItem({ ...it, _voided: _allCancel ? true : !!it._voided }));
      if (ord.pending_reprint.type === 'void' && ord.pending_reprint.data && Array.isArray(ord.pending_reprint.data.items)) {
        const _voidedOnly = ord.pending_reprint.data.items.filter((it: any) => it && it._voided);
        _fullOrderItems = [..._fullOrderItems, ..._voidedOnly.map((it: any) => mapItem({ ...it, _voided: true }))];
      }
    } else {
      // 2026-06-29 (Irene "2·3·4번째 추가주문 통합 안됨"): 신규/추가주문 통합티켓 = "이번에 찍는 전체 품목"
      // 합본 1장. 스테이션은 회차(order_group)별로 쪼개 발행하지만, 통합은 bi===0 한 번만 발행하므로 내용을
      // kitchenItemsRaw(이번에 안 찍힌 전체 = 신규는 주문 전체, 추가주문은 추가품목 전체)로 고정해야 회차
      // 쪼개짐과 무관하게 추가품목 전체가 통합에 나온다. (이게 없으면 bi===0 배치 = 가장 옛 회차만 보임)
      _fullOrderItems = kitchenItemsRaw.map(mapItem);
    }
    const printData: any = {
      ...(ord.pending_reprint && ord.pending_reprint.notice ? { noticeHeader: ord.pending_reprint.notice } : {}),
      ...(_fullOrderItems ? { fullOrderItems: _fullOrderItems } : {}),
      // 2026-06-27 (Irene): 취소선 복구 — 전체취소(type=cancel)면 모든 품목 줄긋기(voided), 아이템취소는 품목별 _voided.
      ...(ord.pending_reprint && ord.pending_reprint.type === 'cancel' ? { voided: true } : {}),
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
      cashierName: ord.source === 'mobile' ? 'Mobile Order' : 'POS',
      // 2026-06-27 (Irene): 통합티켓 "한 번만" 가드 신호 — 하이브리드(즉시) 발행분도 폴러 재실행과
      // 동일 클레임을 공유 → 통합 카피 라운드당 1회(중복 0). 수동/취소안내엔 없음(항상 발행).
      // 2026-06-29: 아래 ATOMIC 선점 결과(win/lose)에 따라 claim 직후 재설정한다(여기선 placeholder).
      __consolidatedClaim: { orderId: ord.id, token: tok }
    };

    // 같은 기기 폴러와 동시 인쇄 방지(폴러와 공유하는 in-memory 플래그).
    (window as any).__autoPrintInflight = (window as any).__autoPrintInflight || {};
    if ((window as any).__autoPrintInflight[ord.id]) return false;
    (window as any).__autoPrintInflight[ord.id] = true;
    const _h = { Authorization: `Bearer ${tok}` };
    let _hb: any = null;
    try {
      // ATOMIC CLAIM — 폴러/다른기기와 동일. 한쪽만 needs_print true→false 성공 → 중복 0.
      const _cr = await fetch(`/api/orders/${ord.id}/print-claim`, { method: 'PATCH', headers: _h });
      const _cj = await _cr.json().catch(() => null);
      if (!(_cj && _cj.claimed)) return false; // 이미 누가 claim → 즉시인쇄 skip(폴러가 처리했거나 중복방지)
      // 2026-06-29 (Irene "추가주문 통합 안나옴" 근본): 통합 claim 을 "미리 선점"하지 않는다. 미리 선점하면
      // claim 만 되고 발송이 끊겨 통합이 영영 안 나오는 orphan(claimed=true 인데 CLIENT 발송 없음 — 14819
      // 추적로그로 확정). 통합 claim 은 발송 직전 sendUnifiedTickets 에서 ATOMIC(NULL→now)으로 1명만 win →
      // claim+발송이 한 몸이라 orphan 0. 회차 여러 개면 통합은 아래 루프에서 bi===0 만 발행, 나머지 skip.
      // (preStamped/early-stamp 제거 — printData.__consolidatedClaim 은 {orderId,token} 그대로 발송시 검사.)
      // 2026-06-29 (Irene, thefire01 BAR 2장): 인쇄 진행 중 하트비트. BAR 프린터 첫 인쇄가 ~15초로 느려
      // 죽은-claim 복구(10초)가 인쇄 도중 재무장 → 폴러가 같은 BAR 또 찍어 2장. 인쇄 루프 동안 4초마다
      // print_claimed_at 을 NOW 로 갱신 → 그 동안 재무장 안 떠 폴러 재인쇄 0(중복 0). cap 40초: 진짜 끊긴
      // 기기는 그 후 갱신 끊겨 10초 뒤 정상 복구(2026-06-26 hang 인쇄 사고 = cap 없는 하트비트였음).
      const _hbStart = Date.now();
      _hb = setInterval(() => {
        if (Date.now() - _hbStart > 90000) { if (_hb) { clearInterval(_hb); _hb = null; } return; }
        fetch(`/api/orders/${ord.id}/print-heartbeat`, { method: 'PATCH', headers: _h }).catch(() => {});
      }, 4000);
      // 추가주문(+Round)은 회차(order_group)별 1장. 안내 재발행(pending_reprint)은 분할 안 함.
      // 신규 단일주문은 회차 1개=기존과 동일 1장. heartbeat 없음(분실 복구 안전망 보존 — 06:43 사고 교훈).
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
      for (let bi = 0; bi < _batches.length; bi++) {
        let r: any = true;
        try { r = await billPrintMod.printKitchenTicketViaRawBT({ ...printData, items: _batches[bi].map(mapItem),
          // 2026-06-29 (Irene "테이블이동 통합 3장"): 통합티켓 = 전체주문 1장(회차별로 안 나뉨). 회차가 여러 개여도
          // 통합은 첫 회차(bi===0)에서만 발행, 나머지 회차는 통합 억제(skip). 스테이션은 회차별 그대로 발행.
          // preStamped 가 배치마다 통합을 발행해 회차 수만큼 N장 나오던 근본수정. (단일회차=종전과 동일 1장)
          __consolidatedClaim: bi === 0 ? (printData as any).__consolidatedClaim : { skip: true },
          // 2026-06-27 (Irene): 추가주문 회차(order_group>0, 재발행 아님)면 +Added 표시.
          isAddedRound: !_isReprint && !!(_batches[bi][0] && Number(_batches[bi][0].order_group) > 0) }, printStoreInfo); }
        catch (e) { r = false; }
        if (r === false) ok = false;
        if (bi < _batches.length - 1) await new Promise(res => setTimeout(res, 700));
      }
      if (ok === false) {
        // 실패 → re-arm 해서 폴러(fallback)가 재시도(분실 0).
        try { await fetch(`/api/orders/${ord.id}/print-rearm`, { method: 'PATCH', headers: _h }); } catch {}
        try { window.dispatchEvent(new CustomEvent('autoprint-failed', { detail: { orderNumber: ord.order_number, scope: 'kitchen-hybrid' } })); } catch {}
        return false;
      }
      try { await fetch(`/api/orders/${ord.id}/printed`, { method: 'PATCH', headers: _h }); } catch {}
      return true;
    } finally {
      if (_hb) { clearInterval(_hb); _hb = null; }
      delete (window as any).__autoPrintInflight[ord.id];
    }
  } catch (e) {
    console.error('[hybridPrint] error:', e);
    return false;
  }
}
