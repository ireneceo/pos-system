import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { PosDisplayThemeStyle, getPosTheme, setPosTheme, POS_THEME_MODES, PosThemeMode, usePosThemeOnBody } from '../../styles/posDisplayTheme';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FloorPlanData, DEFAULT_FLOOR_PLAN, TableStatusInfo, ORDER_STATUS_COLORS, getOrderStatusColors, getTableNodeStatusColors, getOrderTypeColors } from './types';
import FloorPlanCanvas from './FloorPlanCanvas';
import TableDetailPanel from './TableDetailPanel';
import ItemListView from './ItemListView';
import MenuPhotoGallery from './MenuPhotoGallery';
import AIServeCameraOverlay from './AIServeCameraOverlay';
import { buildProductPhotoMaps, lookupProductPhoto, ProductPhotoMaps } from './productImageMap';
import { useAllowedRoutes } from '../../hooks/useAllowedRoutes';
import FloorPlanStatsBar from './FloorPlanStatsBar';
import PaymentModal from '../../components/POSTerminal/PaymentModal';
import { Modal as CommonModal } from '../../components/UI';
import KitchenTicketSendModal, { previewStationBuckets, KitchenTicketSendPrompt } from '../../components/Print/KitchenTicketSendModal';
import OverflowMenu, { OverflowMenuItem } from '../../components/UI/OverflowMenu';
import SearchableSelect from '../../components/Common/SearchableSelect';
import CashierPinModal from '../../components/POSTerminal/CashierPinModal';
// timezone.ts (POS·TableDetailPanel 과 동일): 2번째 인자 = operationSettings 객체.
// dateFormat.ts 는 2번째 인자가 timeZone "문자열" 이라, 객체를 넘기면 resolveTz 가
// 객체.trim() 호출로 크래시("e.trim is not a function") → 반드시 timezone 에서 import.
import { formatDateTime } from '../../utils/timezone';
import { getRestaurantTimezone } from '../../utils/timezone';
import DailySettlementPrint from '../Reports/DailySettlementPrint';
import SettlementMenu from '../../components/Settlement/SettlementMenu';
import CashDrawerModal from '../../components/CashManagement/CashDrawerModal';
import FinalReconcilePanel from '../Reports/FinalReconcilePanel';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { useStore } from '../../contexts/StoreContext';
import { OrdersRealtimeProvider, useOrdersRealtime } from '../../contexts/OrdersRealtimeContext';
import { deriveTableStatusMaps, deriveReservedTableMap, filterOffTableOrders } from '../../utils/orderStage';
import { useAutoPrintPoller } from '../../hooks/useAutoPrintPoller';
import { openCustomerDisplay, isAutoOpenEnabled } from '../../utils/customerDisplay';
// 오프라인 편집 배선(§15-5). 온라인 경로 무변경 — isOffline && isOfflineMainPos() 일 때만 로컬 op 기록.
import { useOffline } from '../../contexts/OfflineContext';
import { isOfflineMainPos } from '../../utils/offlineMainPos';
import { getPendingServerOps, overlayTableStatuses } from '../../utils/offlineOverlay';

// Prefetch POS Terminal chunk on Floor Plan mount — clicking a table to start
// a new order triggers an immediate navigate to /pos-terminal. Pulling the chunk
// down ahead of time saves the network round-trip on click.
const prefetchPosTerminal = () => {
  import('../POSTerminal/POSTerminalPage').catch(() => { /* no-op */ });
};

// ─── Styled Components ───

const PageContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--pos-app-bg, #F9FAFB);
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// Zone filter chip row — appears below header when restaurant has 2+ zones.
// Vertical divider that separates Zone chips from view-mode chips inside the same single-row chip bar.
const ChipSeparator = styled.div`
  width: 1px;
  height: 20px;
  background: var(--pos-border, #C7CED6);
  margin: 0 4px;
`;

const ZoneFilterBar = styled.div`
  /* 밀도 축소: 상단 탭 바 패딩 줄임 */
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 24px;
  background: var(--pos-surface, #FFFFFF);
  border-bottom: 1px solid var(--pos-border, #C7CED6);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;

  @media (max-width: 768px) {
    padding: 5px 16px;
  }
`;
const ZoneChip = styled.button<{ active: boolean }>`
  background: ${p => p.active ? 'var(--pos-brand, #635BFF)' : 'var(--pos-control, #FFFFFF)'};
  color: ${p => p.active ? '#fff' : 'var(--pos-text-muted, #4B5563)'};
  border: 1px solid ${p => p.active ? 'var(--pos-brand, #635BFF)' : 'var(--pos-border, #C7CED6)'};
  border-radius: 999px;
  min-height: 40px;
  padding: 8px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.08s ease, filter 0.12s ease, background 0.15s ease;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  /* hover 색변경은 마우스에서만 — 터치 탭 후 색 굳음 방지. */
  @media (hover: hover) {
    &:hover { background: ${p => p.active ? '#514DD6' : 'var(--pos-surface-2, #F5F7FA)'}; }
  }
  &:active { transform: scale(0.97); filter: brightness(0.95); }
  &:focus { outline: none; }
  &:focus-visible { outline: 2px solid var(--pos-brand, #635BFF); outline-offset: 2px; }
`;
const ZoneChipCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  opacity: 0.75;
`;

const Header = styled.div`
  background: var(--pos-surface, #FFFFFF);
  padding: 12px 24px;
  border-bottom: 1px solid var(--pos-border, #C7CED6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  /* 2026-06-28 (Irene): 10인치 등 좁은 화면에서 헤더가 가로로 넘쳐 "레이아웃 나가던" 문제 —
     줄바꿈 허용으로 화면 밖으로 밀리지 않게(넘치면 2줄). 자식도 줄어들 수 있게 min-width:0. */
  flex-wrap: wrap;
  gap: 8px 12px;
  & > * { min-width: 0; }
  @media (max-width: 1024px) {
    padding: 10px 14px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: var(--pos-text, #0A2540);
  margin: 0;
`;

const ConnectionDot = styled.div<{ $connected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.$connected ? '#059669' : '#DC2626'};
  flex-shrink: 0;
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--pos-text-muted, #4B5563);
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 1280px) {
    gap: 8px;
  }
`;

/* 헤더 액션은 넓은 화면에서만 인라인 렌더(JS isNarrow 판정), 좁으면 설정 gear 드롭다운으로
   수납한다 — 과거의 CSS 미디어 기반 DesktopActions/CompactActions 분기는 JS 판정으로 대체됨. */

const Clock = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--pos-text-muted, #4B5563);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 13px;
  }
`;

// 상단 헤더 액션 버튼 공용 — 흰 버튼 + 테두리 + hover (Dashboard/Customer Display/Open Drawer 통일).
const BackBtn = styled.button`
  height: 38px;
  box-sizing: border-box;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid var(--pos-border, #C7CED6);
  background: var(--pos-surface, #FFFFFF);
  color: var(--pos-text, #1F2937);
  white-space: nowrap;

  &:hover {
    border-color: var(--pos-brand, #635BFF);
    background: var(--pos-surface-2, #F1F4F8);
  }
`;

// 로그인 표시 — POS Terminal StaffInfo 와 동일: 박스(테두리/배경) 없이 아이콘+이름만.
// (액션 버튼 BackBtn 은 박스 유지, 로그인 표시만 boxless 로 통일.)
const StaffInfo = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--pos-text-muted, #4B5563);
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    background: var(--pos-surface-2, #F4F6F9);
    color: var(--pos-text, #0A2540);
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
  position: relative; /* anchor for absolute-positioned overlay panels (e.g. takeaway detail) */
`;

const CanvasWrapper = styled.div<{ $tight?: boolean }>`
  flex: 1;
  /* 2026-06-28 (table map): 테이블맵을 가장자리까지 더 크게(Irene "사방 여백없게").
     floor 뷰는 $tight 로 여백을 거의 0 까지 줄이고, items/takeaway 카드뷰는
     자체 내부여백이 있어 약간의 게터만 둔다. */
  padding: ${p => (p.$tight ? '4px 6px' : '8px 16px')};
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  /* 맵 주위 회색(페이지 배경 비침) 제거 — 캔버스와 같은 면색으로 */
  background: var(--pos-surface, #FFFFFF);

  @media (max-width: 768px) {
    padding: ${p => (p.$tight ? '2px 4px' : '6px 12px')};
  }
`;

const LoadingScreen = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pos-text-muted, #4B5563);
  font-size: 14px;
`;

// POS Terminal fullscreen overlay (for New Order only)
const POSOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${p => p.$isOpen ? 'flex' : 'none'};
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: var(--pos-surface, #FFFFFF);
  flex-direction: column;
`;

const POSOverlayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  /* 검정 바(× Close) — 테마 무관 고정. 다크에서 var(--pos-text) 가 밝아져 흰글씨가 안 보이던 회귀 수정. */
  background: #0A2540;
  flex-shrink: 0;
`;

const POSOverlayTitle = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const POSOverlayCloseBtn = styled.button`
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { background: rgba(255,255,255,0.25); }
`;

const POSIframe = styled.iframe`
  flex: 1;
  width: 100%;
  border: none;
`;

// ─── Main Component ───

const FloorPlanPage: React.FC = () => {
  const { t } = useTranslation('floorplan');
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { user, switchUser, logout, canOperatePOS, canTakePayment, canVoid } = useAuth();
  const { getStoreInfo, operationSettings } = useStore();

  // ── 공용 실시간 주문 스토어 (2026-06-12, 단일 소스) ─────────────────────────
  // table-status 엔드포인트 의존 제거 — 점유맵/이력/Takeout 모두 같은 오늘 주문
  // 배열에서 파생(utils/orderStage). 소켓 6종은 Provider 의 단일 reducer 가 in-place
  // 갱신하므로 이 화면은 debounce refetch 없이 즉시 반영된다.
  const {
    orders: rtOrders,
    ordersReady: rtOrdersReady,
    connected,
    refetch: refetchOrders,
    subscribe: subscribeOrders,
  } = useOrdersRealtime();
  // 오프라인 상태(§5, health 핑 기반 — navigator.onLine 단독 아님). 편집 핸들러의 오프라인 분기 게이트.
  const { isOffline } = useOffline();
  // 낙관적 오버레이용 pending 서버-주문 op(§15-5 적용지점②). op 0개·온라인이면 오버레이 경로가 죽어 위험 0.
  const [pendingOps, setPendingOps] = useState<any[]>([]);
  // 매장 설정 "결제 완료 시 테이블 비우기" — 점유맵 파생에 필요 (백엔드 table-status 와 동일 규칙)
  const [clearTableOnPayment, setClearTableOnPayment] = useState(false);
  // elapsedMinutes 표시 갱신용 30s tick (이전 폴링 주기와 동일)
  const [nowTick, setNowTick] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNowTick(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  // 2026-05-28 매장 critical: backend-driven auto-print polling (fullscreen page,
  // MainLayout 안 mount). 매장 device 가 FloorPlan 켜둔 상태에서 모바일/POS
  // 주문 발생 시 polling 으로 catch + 인쇄 + PATCH.
  useAutoPrintPoller({ restaurantId: user?.restaurantId || (user as any)?.restaurant_id, enabled: !!(user?.restaurantId || (user as any)?.restaurant_id), getStoreInfo });

  // Prefetch is intentionally disabled here. Initial implementation triggered
  // POS Terminal chunk download during Floor Plan idle, but the observed effect
  // was the opposite of what we wanted — concurrent download + parse while the
  // user was still interacting with Floor Plan slowed the perceived navigation
  // time. POS Terminal's own mount cost (16 API calls, ~4s) dominates, so
  // prefetching the chunk produces no measurable win and adds CPU pressure.
  // Future fix: deduplicate the POS Terminal mount fetches first, then revisit.

  const [floorPlan, setFloorPlan] = useState<FloorPlanData>(DEFAULT_FLOOR_PLAN);
  // 보기 색상 테마 (밝게/고대비/어둡게) — POS 와 동일 토글, 기기별 공유(localStorage).
  const [posTheme, setPosThemeState] = useState<PosThemeMode>(getPosTheme);
  const selectPosTheme = (m: PosThemeMode) => { setPosThemeState(m); setPosTheme(m); };
  // body-portal 모달도 같은 테마를 따라가게 (고대비/다크 팝업 일관성).
  usePosThemeOnBody(posTheme);
  // 스탭 PIN 로그인 전환 (POS Terminal 과 동일 — switchUser/logout).
  const [showCashierPinModal, setShowCashierPinModal] = useState(false);
  // 좁은 화면(≤1720px)에서 Cash Drawer/Open Drawer/Customer Display 를 설정(gear)
  // 드롭다운으로 수납. CSS 미디어와 충돌 없게 JS 로 단일 판정. (임계값 근거는 아래 useEffect.)
  const [isNarrow, setIsNarrow] = useState(false);
  // 2026-06-28 (5-1): Fullscreen mode for order-taking — hides the header action row
  // AND the bottom stats bar to maximize the table map (Irene: "주문받을 땐 헤더 불필요").
  // Replaces the older ▴ header-collapse arrow ("왜 안 없애"). Remembered per-device.
  // ZoneFilterBar stays so zones/views remain switchable; exit lives there in fullscreen.
  const [fullscreen, setFullscreen] = useState<boolean>(() => {
    try { return localStorage.getItem('floorplan_fullscreen') === '1'; } catch { return false; }
  });
  const toggleFullscreen = useCallback(() => {
    setFullscreen(prev => {
      const next = !prev;
      try { localStorage.setItem('floorplan_fullscreen', next ? '1' : '0'); } catch { /* ignore */ }
      return next;
    });
  }, []);
  // 2026-06-28 (FloorPlan): 테이블 상세를 큰 팝업으로 보기 토글(측면패널 ↔ 중앙 모달).
  const [detailExpanded, setDetailExpanded] = useState(false);
  useEffect(() => {
    // 2026-07-15 (Irene, 네이티브앱 헤더 2줄 수정): 임계값 1440 은 너무 낮았다. 실측 결과
    // 인라인 카운터 액션(Cash Drawer·Open Drawer·마감·Customer Display·테마·스피커·gear)은
    // ≥1680px 에서만 한 줄에 들어가, 1441~1679px(1600급 모니터·최대화 네이티브앱)에서 헤더가
    // 2줄로 접혔다. 액션이 실제로 맞는 폭까지는 gear 로 수납하도록 1720 으로 올림(i18n·로그인
    // 이름 길이 변동 여유 포함). 그 이상에서만 인라인.
    const mq = window.matchMedia('(max-width: 1720px)');
    const apply = () => setIsNarrow(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
  // Tab state mirrored to the URL so each tab/zone/order is a shareable bookmark:
  //   /floor-plan                          → All Zones, floor view
  //   /floor-plan?zone=z_main              → specific zone, floor view
  //   /floor-plan?view=takeaway            → takeaway view
  //   /floor-plan?view=takeaway&order=123  → takeaway view + specific order open
  // useSearchParams gives us bidirectional sync; we never mutate the params object directly.
  const [searchParams, setSearchParams] = useSearchParams();
  const activeZoneFilter = searchParams.get('zone') || 'all';
  const _viewParam = searchParams.get('view');
  // 'takeout' 이 정식 파라미터. 'takeaway' 는 옛 링크/북마크 하위호환으로 계속 인식.
  const activeView: 'floor' | 'takeaway' | 'items' =
    (_viewParam === 'takeout' || _viewParam === 'takeaway') ? 'takeaway' : (_viewParam === 'items' ? 'items' : 'floor');
  const selectedTakeawayOrderId = (() => {
    const q = searchParams.get('order');
    return q ? parseInt(q, 10) || null : null;
  })();
  const setActiveZoneFilter = useCallback((zone: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (zone === 'all') next.delete('zone'); else next.set('zone', zone);
      // Zone tabs imply floor view, so leaving takeaway view here is more intuitive.
      next.delete('view');
      next.delete('order');
      return next;
    }, { replace: true });
  }, [setSearchParams]);
  const setActiveView = useCallback((view: 'floor' | 'takeaway' | 'items') => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (view === 'takeaway') next.set('view', 'takeout');
      else if (view === 'items') { next.set('view', 'items'); next.delete('order'); }
      else { next.delete('view'); next.delete('order'); }
      return next;
    }, { replace: true });
  }, [setSearchParams]);
  const setSelectedTakeawayOrderId = useCallback((id: number | null) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (id == null) next.delete('order'); else next.set('order', String(id));
      return next;
    }, { replace: true });
  }, [setSearchParams]);
  // Off-table 주문 — 공용 스토어에서 파생 (별도 fetch/폴링 제거)
  const takeawayOrders = useMemo(() => filterOffTableOrders(rtOrders), [rtOrders]);
  const takeawayLoading = !rtOrdersReady;
  // Off-table 통합 뷰: 매장이 켠 주문타입 + 타입 필터(All/takeaway/pickup/delivery)
  const [restaurantOrderTypes, setRestaurantOrderTypes] = useState<{ takeaway: boolean; pickup: boolean; delivery: boolean }>({ takeaway: true, pickup: false, delivery: false });
  const [offTableFilter, setOffTableFilter] = useState<'all' | 'takeaway' | 'pickup' | 'delivery'>('all');
  const [offTableSearch, setOffTableSearch] = useState('');
  const [offTableSort, setOffTableSort] = useState<'time' | 'amount'>('time');

  // Filtered floor plan — tables restricted to selected zone.
  const filteredFloorPlan = useMemo<FloorPlanData>(() => {
    if (activeZoneFilter === 'all' || !floorPlan.zones || floorPlan.zones.length <= 1) return floorPlan;
    const groupIdsInZone = new Set((floorPlan.table_groups || []).filter(g => g.zone_id === activeZoneFilter).map(g => g.id));
    return {
      ...floorPlan,
      tables: floorPlan.tables.filter(t => t.group_id && groupIdsInZone.has(t.group_id))
    };
  }, [floorPlan, activeZoneFilter]);
  // 점유맵 + 오늘 per-table 이력(완료 포함) — 공용 스토어에서 파생 (백엔드 table-status
  // buildOrderInfo 와 1:1 동일 규칙, utils/orderStage.deriveTableStatusMaps).
  const { data: tableStatuses, history: tableHistory } = useMemo(
    () => deriveTableStatusMaps(rtOrders, { clearTableOnPayment, now: nowTick }),
    [rtOrders, clearTableOnPayment, nowTick]
  );
  // §15-5 적용지점② — tableStatuses 는 rtOrders 에서 파생되므로 OrdersRealtime 오버레이가 아직
  // 못 덮는다(현 시점 ① 미배선). 여기서 pending op 를 tableStatuses 위에 얹어(이동/취소/완납의
  // 점유 효과) 오프라인 편집을 보드에 즉시 반영한다. pending op 로드 = mount + 'offline-ops-changed'
  // 이벤트 + isOffline 전환 시 리로드. 온라인·op 0개면 overlayTableStatuses 가 입력 그대로 반환.
  useEffect(() => {
    let alive = true;
    const load = () => { getPendingServerOps().then(ops => { if (alive) setPendingOps(ops); }).catch(() => {}); };
    load();
    window.addEventListener('offline-ops-changed', load);
    return () => { alive = false; window.removeEventListener('offline-ops-changed', load); };
  }, [isOffline]);
  const effectiveTableStatuses = useMemo(
    () => (pendingOps.length ? overlayTableStatuses(tableStatuses, pendingOps, rtOrders) : tableStatuses),
    [tableStatuses, pendingOps, rtOrders]
  );
  // 예약↔플로어플랜 (P2-6) — 오늘 confirmed/arrived 예약 + 리드타임(설정).
  const [reservations, setReservations] = useState<any[]>([]);
  const [reservationLeadMinutes, setReservationLeadMinutes] = useState(120);
  // 예약 전 주문차단 리드타임(분) — 0=끔. 워크인 주문이 임박 예약 테이블에 들어올 때 경고(매니저 강행 허용).
  const [orderBlockLeadMinutes, setOrderBlockLeadMinutes] = useState(0);
  // 경고 모달: 예약 임박 테이블 워크인 주문 시 { reservation, opts } 보관 → '그래도 주문' 시 override 진행.
  const [reserveWarn, setReserveWarn] = useState<{ reservation: any; opts?: any } | null>(null);
  // '예약됨' 점유맵 — 임박 리드창 안 + 활성 주문 없는 테이블만 (점유 우선 병합은 아래).
  const reservedMap = useMemo(
    () => deriveReservedTableMap(reservations, {
      leadMinutes: reservationLeadMinutes,
      now: nowTick,
      // 오늘 예약만 표시 → 시간만(년/월/일 undefined 로 기본옵션 덮어 시간만 출력).
      formatTime: (iso: string) => formatDateTime(iso, operationSettings, { year: undefined, month: undefined, day: undefined, hour: '2-digit', minute: '2-digit' } as any),
      // 오늘 주문 이력(점유/완료/비움)이 있는 테이블키 → arrived 예약 유령 배지 억제
      suppressArrivedKeys: new Set(Object.keys(tableHistory || {}))
    }),
    [reservations, reservationLeadMinutes, nowTick, operationSettings, tableHistory]
  );
  // 캔버스/패널용 병합맵 — 점유(활성 주문)가 예약을 덮어쓴다(occupied 우선).
  const canvasTableStatuses = useMemo(
    () => ({ ...reservedMap, ...effectiveTableStatuses }),
    [reservedMap, effectiveTableStatuses]
  );

  // 서빙 토글 낙관적 override (orderId:itemIndex → {status, ts}) — stale poll 되돌림 방지.
  const [serveOverrides, setServeOverrides] = useState<Record<string, { status: string; ts: number }>>({});
  // Items 뷰 필터용 메타 — 카테고리(제품명→카테고리) + 주방 스테이션(id→이름).
  const [itemMeta, setItemMeta] = useState<{ catByName: Record<string, string>; stationById: Record<string, string>; categories: string[]; stations: { id: string; name: string }[] }>({ catByName: {}, stationById: {}, categories: [], stations: [] });
  // Track A: /api/menu 응답(이미 받던 것)에서 사진 lookup 을 만든다 — 신규 요청 0.
  const [photoMaps, setPhotoMaps] = useState<ProductPhotoMaps | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  // Track B: AI 카메라 서빙 — Enterprise 모듈 게이트(hasModule). 미포함 티어면 칩 자체 미렌더.
  const { hasModule } = useAllowedRoutes({ role: user?.role || '', restaurantId: restaurantId ? Number(restaurantId) : null });
  const [serveCamOpen, setServeCamOpen] = useState(false);
  const aiServeEnabled = hasModule('ai_serving');
  useEffect(() => {
    if (!restaurantId) return;
    let alive = true;
    (async () => {
      try {
        const token = getAuthToken();
        const h = { Authorization: `Bearer ${token}` } as any;
        const [pRes, sRes] = await Promise.all([
          fetch(`/api/menu?restaurant_id=${restaurantId}`, { headers: h }),
          fetch(`/api/kitchen-stations?restaurant_id=${restaurantId}`, { headers: h }),
        ]);
        const pj = await pRes.json().catch(() => ({})); const sj = await sRes.json().catch(() => ({}));
        // /api/menu → { success, data: { categories, items } }
        const products = (pj.data && Array.isArray(pj.data.items)) ? pj.data.items
          : (Array.isArray(pj.data) ? pj.data : (Array.isArray(pj.products) ? pj.products : []));
        const catByName: Record<string, string> = {}; const cats = new Set<string>();
        (Array.isArray(products) ? products : []).forEach((p: any) => { if (p.name && p.category) { catByName[p.name] = p.category; cats.add(p.category); } });
        if (pj.data && Array.isArray(pj.data.categories)) pj.data.categories.forEach((c: any) => { const n = typeof c === 'string' ? c : (c?.name || c?.category); if (n) cats.add(n); });
        // /api/kitchen-stations → { success, data: { assignment_mode, stations: [...] } }
        const stationsRaw = (sj.data && Array.isArray(sj.data.stations)) ? sj.data.stations
          : (Array.isArray(sj.data) ? sj.data : (Array.isArray(sj.stations) ? sj.stations : []));
        const stationById: Record<string, string> = {};
        const stations = (Array.isArray(stationsRaw) ? stationsRaw : []).map((s: any) => { stationById[String(s.id)] = s.name; return { id: String(s.id), name: s.name }; });
        if (alive) { setItemMeta({ catByName, stationById, categories: [...cats].sort(), stations }); setPhotoMaps(buildProductPhotoMaps(products)); }
      } catch { /* best-effort */ }
    })();
    return () => { alive = false; };
  }, [restaurantId]);
  // 품목 → 상품 사진 조회 (ItemListView·TableDetailPanel·시트 공용).
  const productLookup = useCallback((productId?: number | null, name?: string) => lookupProductPhoto(photoMaps, productId, name), [photoMaps]);
  // 갤러리 열 때 메뉴 1회 refetch(품절 최신화) — 신규 API 아님, 동일 엔드포인트.
  const refreshMenuPhotos = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/menu?restaurant_id=${restaurantId}`, { headers: { Authorization: `Bearer ${token}` } as any });
      const pj = await res.json().catch(() => ({}));
      const products = (pj.data && Array.isArray(pj.data.items)) ? pj.data.items
        : (Array.isArray(pj.data) ? pj.data : (Array.isArray(pj.products) ? pj.products : []));
      setPhotoMaps(buildProductPhotoMaps(products));
    } catch { /* best-effort */ }
  }, [restaurantId]);
  // connected — 공용 OrdersRealtimeProvider 의 소켓 연결 상태 사용 (위에서 구조분해)
  const [clock, setClock] = useState('');
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('');
  const [timezone, setTimezone] = useState('Asia/Kuala_Lumpur');
  const [qrMode, setQrMode] = useState<'static' | 'session'>('static');
  const checkoutSocketRef = useRef<any>(null);

  // Detail panel
  // 2026-05-27: state = `selectedTableId` (Floor Plan v2 tables[].id) so multiple
  // zones with the same tableNumber stay isolated. `selectedTable` (tableNumber)
  // and `selectedTableInfo` (FloorTable object) are derived below.
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  // -1 = 기본 화면(활성 주문/빈 테이블). 탭(완료 포함) 클릭 시에만 0+ 로.
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(-1);
  // 다른 테이블 선택 시 탭 선택 초기화 → 항상 기본(활성/빈) 화면부터.
  useEffect(() => { setSelectedOrderIndex(-1); }, [selectedTableId]);

  // 알림배너 → Floor Plan 테이블 열기 (#배너): ?openTable=테이블번호 로 진입 시 해당 테이블 자동 선택.
  useEffect(() => {
    const tn = searchParams.get('openTable');
    if (!tn || !floorPlan?.tables?.length) return;
    const match = floorPlan.tables.find(t => String(t.tableNumber) === String(tn) || String((t as any).label) === String(tn));
    if (match) setSelectedTableId(match.id);
    // 1회 처리 후 파라미터 제거(중복 선택 방지)
    setSearchParams(prev => { const n = new URLSearchParams(prev); n.delete('openTable'); return n; }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, floorPlan]);

  // Payment modal (like LiveOrders)
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // 결제 팝업용 풀 주문 객체 — Live Orders 와 동일 소스(GET /orders/:id). table-status
  // 객체는 서비스차지 값/세율/쿠폰·포인트 분리값이 없어 그 줄들이 숨었던 문제 통일 (2026-05-29).
  const [orderForPayment, setOrderForPayment] = useState<any>(null);
  // Takeaway payment target — when set, renders PaymentModal for that takeaway order (same UI as dine-in).
  const [paymentTakeawayOrderId, setPaymentTakeawayOrderId] = useState<number | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [membershipSettings, setMembershipSettings] = useState<any>(null);
  // 서빙 ready 알림음 on/off (기기별 기억, 기본 ON). ItemListView 가 이 값으로 게이트.
  const [readyAudio, setReadyAudio] = useState<boolean>(() => { try { return localStorage.getItem('fp_ready_audio') !== '0'; } catch { return true; } });
  // Floor Plan 알림음 설정(Settings) — 소켓 핸들러 closure 가 stale 안 되게 ref 로 최신 유지.
  const floorSoundRef = useRef<{ enabled?: boolean; type?: string } | undefined>(undefined);
  // 통합 새 주문음(newOrder), 레거시 floorPlan 폴백.
  floorSoundRef.current = (operationSettings as any)?.orderSounds?.newOrder || (operationSettings as any)?.orderSounds?.floorPlan;

  // Daily Settlement
  const [showSettlement, setShowSettlement] = useState(false);
  const [showCashDrawer, setShowCashDrawer] = useState(false);
  const [showFinalSettlement, setShowFinalSettlement] = useState(false);
  const [cdInfoModal, setCdInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });

  // POS overlay (for New Order only)
  const [showPOS, setShowPOS] = useState(false);
  // 2026-06-26 (Irene): 고객디스플레이를 "테이블 선택 후에" 열면 미러 effect 의존성이 안 바뀌어
  // 빈 화면 → 재탭해야 나오던 문제. CD 열 때 이 nonce 를 올려 현재 선택 카트를 강제 재emit한다.
  const [cdNonce, setCdNonce] = useState(0);
  const bumpCdMirror = useCallback(() => {
    setCdNonce(n => n + 1);                              // 이미 열린 CD 즉시 재동기화
    setTimeout(() => setCdNonce(n => n + 1), 1500);      // 새로 연 CD 가 소켓 연결된 뒤 재emit
  }, []);
  const [posUrl, setPosUrl] = useState('');

  // 2026-07-01 (Irene): 고객 디스플레이 self-healing 하트비트.
  // 미러는 소켓 one-shot emit(의존성 변할 때만 재emit)이라 소켓 blip·CD창 재연결·팝업으로 한 번
  // 놓치면 "재탭" 전까지 blank 였다(매장 보고: 자꾸 사라짐). 우측패널(테이블 선택)이 열려 있는 동안
  // 주기적으로 재emit(cdNonce bump)해 CD 가 항상 현재 주문을 반영·자동복구 → 재탭 불필요.
  // POS 오버레이(showPOS) 열렸을 땐 일시정지: 그땐 POS 카트가 미러 주체라 이중 emit 충돌 방지.
  useEffect(() => {
    if (!selectedTableId || showPOS) return;
    const iv = setInterval(() => setCdNonce(n => n + 1), 2500);
    return () => clearInterval(iv);
  }, [selectedTableId, showPOS]);

  // Items added alert (like LiveOrders)
  const [itemsAddedAlert, setItemsAddedAlert] = useState<{
    isVisible: boolean;
    orderId: number | null;
    orderNumber: string;
    tableNumber: string | null;
    orderGroup: number;
    itemCount: number;
    kind?: 'items' | 'order' | 'merge'; // 'order'=새 주문, 'items'=추가 품목, 'merge'=테이블이동 머지
    orderType?: string;              // off-table 라우팅용 (takeaway/pickup/delivery)
    mergedFromTable?: string | null;     // merge: 출발 테이블
    mergedFromOrderNumber?: string | null; // merge: 합쳐진(소멸) 주문번호
  } | null>(null);

  // Clock (restaurant timezone) — POS Terminal 과 동일 포맷, 단 년도 제외.
  // 예: "03 Jun  02:48:38 am". 초까지 표시하므로 1초 간격 tick.
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const dateStr = formatDateTime(now, operationSettings, {
        month: 'short', day: '2-digit', year: undefined,
        hour: undefined, minute: undefined, second: undefined
      });
      const time = formatDateTime(now, operationSettings, {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
        year: undefined, month: undefined, day: undefined
      });
      setClock(`${dateStr}  ${time}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // operationSettings.timeZone 변경 시 갱신
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationSettings?.timeZone]);

  // ── 단일 소스 전환 (2026-06-12) ──────────────────────────────────────────────
  // 기존 fetchStatuses(table-status 전체 refetch)/fetchTakeawayOrders(별도 fetch+15s 폴링)는
  // 공용 스토어 재동기화 한 가지로 통일. 점유맵/이력/Takeout 은 위의 useMemo 파생이라
  // 소켓 in-place 갱신만으로 즉시 따라온다. (액션 직후 보정용 best-effort 호출은 유지.)
  const fetchStatuses = useCallback(async () => { await refetchOrders(); }, [refetchOrders]);
  const fetchTakeawayOrders = fetchStatuses; // 동일 소스 — 호출부 계약 유지

  // Off-table 뷰: 켠 타입 목록 + 타입필터 적용된 표시 목록
  const normOffTableType = (o: any) => (o.order_type || o.orderType || '').toString().replace(/[_\s]/g, '').toLowerCase();
  const enabledOffTableTypes = useMemo<Array<'takeaway' | 'pickup' | 'delivery'>>(() => {
    const list: Array<'takeaway' | 'pickup' | 'delivery'> = [];
    if (restaurantOrderTypes.takeaway) list.push('takeaway');
    if (restaurantOrderTypes.pickup) list.push('pickup');
    if (restaurantOrderTypes.delivery) list.push('delivery');
    return list.length ? list : ['takeaway'];
  }, [restaurantOrderTypes]);
  const displayedOffTableOrders = useMemo(() => {
    const q = offTableSearch.trim().toLowerCase();
    const filtered = takeawayOrders.filter(o => {
      if (offTableFilter !== 'all' && normOffTableType(o) !== offTableFilter) return false;
      if (!q) return true;
      const hay = `${o.order_number || o.orderNumber || ''} ${o.customer_name || o.customerName || ''} ${o.customer_phone || ''} ${o.pickup_number || o.pickupNumber || ''}`.toLowerCase();
      const itemsHay = (o.order_items || o.orderItems || []).map((it: any) => it.name || it.menuItem?.name || '').join(' ').toLowerCase();
      return hay.includes(q) || itemsHay.includes(q);
    });
    const amt = (o: any) => Number(o.total_amount ?? o.total ?? 0) || 0;
    const ts = (o: any) => new Date(o.order_date || o.orderCreatedAt || o.createdAt || 0).getTime();
    return filtered.sort((a, b) => offTableSort === 'amount' ? amt(b) - amt(a) : ts(b) - ts(a));
  }, [takeawayOrders, offTableFilter, offTableSearch, offTableSort]);


  // Load floor plan + initial statuses + payment settings + membership settings
  useEffect(() => {
    const load = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/restaurants/${restaurantId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        const restaurant = data.data || data;

        if (restaurant.floor_plan) {
          setFloorPlan(restaurant.floor_plan);
        }
        if (restaurant.currency) {
          setCurrency(restaurant.currency);
        }
        if (restaurant.table_settings) {
          const ts = typeof restaurant.table_settings === 'string'
            ? JSON.parse(restaurant.table_settings)
            : restaurant.table_settings;
          if (ts.qrMode) setQrMode(ts.qrMode);
          // 점유맵 파생 규칙 — 백엔드 table-status 와 동일 (결제 완료 시 테이블 비우기)
          setClearTableOnPayment(ts.clearTableOnPayment === true);
        }
        if (restaurant.operation_settings) {
          const opSettings = typeof restaurant.operation_settings === 'string'
            ? JSON.parse(restaurant.operation_settings)
            : restaurant.operation_settings;
          setTimezone(getRestaurantTimezone(opSettings));
          // Off-table 뷰: 이 매장이 켠 주문타입(없으면 기본 dineIn+takeaway).
          const ot = opSettings.orderTypes || {};
          setRestaurantOrderTypes({
            takeaway: ot.takeaway !== false,
            pickup: !!ot.pickup,
            delivery: !!ot.delivery,
          });
        }
        // Payment methods from restaurant settings (like LiveOrders)
        if (restaurant.payment_settings) {
          setPaymentMethods(restaurant.payment_settings);
        }
        // 예약↔플로어플랜 (P2-6): 리드타임(설정) — 활성 주문 없는 테이블에 예약을 미리 띄우는 창.
        if (restaurant.reservation_settings) {
          const rs = typeof restaurant.reservation_settings === 'string'
            ? JSON.parse(restaurant.reservation_settings)
            : restaurant.reservation_settings;
          const lead = Number(rs?.slot?.floor_lead_minutes);
          if (Number.isFinite(lead) && lead >= 0) setReservationLeadMinutes(lead);
          const blk = Number(rs?.slot?.order_block_lead_minutes);
          if (Number.isFinite(blk) && blk >= 0) setOrderBlockLeadMinutes(blk);
        }
      } catch (err) {
        console.error('Failed to load floor plan:', err);
      } finally {
        setLoading(false);
      }
    };

    // Membership settings (like LiveOrders)
    const loadMembership = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/membership/settings/${restaurantId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success && result.data) {
          setMembershipSettings(result.data);
        }
      } catch (_) { /* optional */ }
    };

    load();
    loadMembership();
  }, [restaurantId]);

  // 예약↔플로어플랜 (P2-6) — 오늘 예약 로드 + 60초 주기 갱신. deriveReservedTableMap 이
  // confirmed/arrived + 리드창으로 거른다. 점유는 별도 소켓 스토어가 담당(여기는 예약만).
  const loadReservations = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/reservations/restaurant/${restaurantId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return;
      const j = await res.json();
      setReservations(Array.isArray(j?.data) ? j.data : []);
    } catch (_) { /* optional — 예약 표시는 비치명적 */ }
  }, [restaurantId]);

  useEffect(() => {
    loadReservations();
    const iv = setInterval(loadReservations, 60000);
    return () => clearInterval(iv);
  }, [loadReservations]);

  // 예약 체크인 수신 (P2-6) — ReservationsTimelinePage 의 arrived 네비
  // (?seatReservation&tableId&table&guests) 를 받아 해당 테이블 선택 + POS 자동 진입
  // (인원 prefill). 한 번만 처리하고 쿼리 정리(새로고침 재발 방지). TDZ 회피 위해
  // handleNewOrder 대신 POS URL 직접 구성.
  const checkinHandledRef = useRef<string | null>(null);
  useEffect(() => {
    const seatId = searchParams.get('seatReservation');
    const tableId = searchParams.get('tableId');
    if (!seatId || !tableId || !restaurantId) return;
    if (checkinHandledRef.current === seatId) return;  // 이 체크인은 이미 처리(연속 체크인은 seatId 가 달라 통과)
    if (!floorPlan || !(floorPlan.tables || []).some(t => t.id === tableId)) return; // 플로어플랜 로드 대기
    checkinHandledRef.current = seatId;

    const match = (floorPlan.tables || []).find(t => t.id === tableId);
    const tableLabel = searchParams.get('table') || (match ? (match.label || match.tableNumber) : '');
    const guests = Number(searchParams.get('guests')) || 0;

    setSelectedTableId(tableId);
    const params = new URLSearchParams();
    if (tableLabel) params.set('table', tableLabel);
    params.set('tableId', tableId);
    if (guests > 0) params.set('guests', String(guests));
    params.set('from', 'floor-plan-overlay');
    setPosUrl(`/restaurant/${restaurantId}/pos-terminal?${params.toString()}`);
    setShowPOS(true);

    // 쿼리 정리 — 새로고침 시 재트리거 방지
    const cleaned = new URLSearchParams(searchParams);
    ['seatReservation', 'tableId', 'table', 'guests'].forEach(k => cleaned.delete(k));
    setSearchParams(cleaned, { replace: true });
  }, [searchParams, floorPlan, restaurantId, setSearchParams]);

  // ── 배너/알림음 (2026-06-12, 표시 전용 구독) ─────────────────────────────────
  // 데이터 갱신은 공용 스토어의 단일 reducer 가 처리한다(소켓 6종 in-place — 기존에
  // 미구독이던 order-deleted/item-voided/table-moved 까지 포함). 여기서는 off-table
  // 새 주문 배너 + 추가주문 배너 + 알림음만 구독한다.
  useEffect(() => {
    const offCreated = subscribeOrders('order-created', (order: any) => {
      const ot = (order?.order_type || order?.orderType || '').toString().replace(/[_\s]/g, '').toLowerCase();
      // 새 주문 도착 알림음 — 2026-06-23 (Irene): 라이브오더처럼 "모든" 새 주문(테이블/오프테이블)에 울린다.
      // (이전엔 off-table 분기 안에만 있어 dine-in 테이블 주문엔 소리가 안 났음.) Settings on/off + 종류 + 기기 mute(fp_ready_audio).
      try {
        const cfg = floorSoundRef.current;
        let localOn = true; try { localOn = localStorage.getItem('fp_ready_audio') !== '0'; } catch { /* ignore */ }
        if ((cfg?.enabled !== false) && localOn) {
          import('../../utils/notificationSound').then(({ playPresetSound }) => playPresetSound((cfg?.type || 'bell') as any, 0.85)).catch(() => {});
        }
      } catch { /* ignore */ }
      // off-table 새 주문(테이크/픽업/배달)은 바닥에 안 떠서 놓치기 쉬움 → 배너로 알림.
      // 테이블 주문은 캔버스에 불이 들어오므로 배너만 생략(소리는 위에서 이미 울림).
      if (['takeaway', 'pickup', 'delivery'].includes(ot)) {
        const cnt = (order?.order_items || order?.orderItems || []).reduce((s: number, it: any) => s + (parseInt(it.quantity, 10) || 1), 0);
        setItemsAddedAlert({
          isVisible: true,
          orderId: order?.id ?? null,
          orderNumber: order?.order_number || order?.orderNumber || '',
          tableNumber: null,
          orderGroup: 0,
          itemCount: cnt || 1,
          kind: 'order',
          orderType: ot,
        });
      }
    });
    const offItemsAdded = subscribeOrders('order-items-added', (data: any) => {
      setItemsAddedAlert({
        isVisible: true,
        orderId: data.orderId,
        orderNumber: data.orderNumber,
        tableNumber: data.tableNumber,
        orderGroup: data.orderGroup,
        itemCount: data.itemCount,
        // 테이블이동 머지는 "추가주문"이 아니라 "주문 합침"으로 표기 (Irene 2026-06-12 —
        // 직원이 머지했는데 추가주문 안내가 떠서 혼동). 백엔드 viaTableMove 플래그 분기.
        kind: data.viaTableMove ? 'merge' : 'items',
        mergedFromTable: data.mergedFromTable || null,
        mergedFromOrderNumber: data.mergedFromOrderNumber || null,
      });
    });
    return () => { offCreated(); offItemsAdded(); };
  }, [subscribeOrders]);

  // Checkout Display 소켓 (고객 화면 연동)
  useEffect(() => {
    if (!restaurantId) return;
    const cs = io('/checkout-display', { transports: ['websocket', 'polling'], auth: { token: getAuthToken() } });
    cs.on('connect', () => cs.emit('join-restaurant', restaurantId));
    cs.on('customer-checkin', (data: any) => {
      // 고객 체크인 수신 — 필요시 처리
    });
    checkoutSocketRef.current = cs;
    return () => { cs.disconnect(); checkoutSocketRef.current = null; };
  }, [restaurantId]);

  // (30s 안전 폴링은 공용 OrdersRealtimeProvider 가 수행 — 페이지 자체 폴링 제거)

  // 2026-05-27: Mirror selected table → Customer Display in real time.
  // Lets the customer see their bill before they walk to the counter (table
  // service / post-pay flow).
  //
  // 2026-05-28: cart-clear 트리거 좁힘. 이전: selectedTableId===null 이면
  // 무조건 cart-clear → page mount/refresh 시도 fire → CD blank. 매장 보고
  // (영업 중 시간 지나면 자꾸 사라짐). 이제: 사용자가 명시적으로 다른 곳
  // 클릭해서 deselect 한 경우 (prev 가 값이 있었음) 만 cart-clear. 페이지
  // mount / refresh / 다른 탭으로 이동 후 복귀는 CD 표시 유지.
  // NOTE: derive selectedTable + status INSIDE the effect — referencing the
  // module-level `selectedTable` const here would TDZ-fault because that const
  // is declared further down in the render body (post-loading branch).
  const prevSelectedTableIdRef = useRef<typeof selectedTableId>(null);
  useEffect(() => {
    if (!checkoutSocketRef.current) return;
    const prevId = prevSelectedTableIdRef.current;
    prevSelectedTableIdRef.current = selectedTableId;
    if (!selectedTableId) {
      // Only emit cart-clear when the user EXPLICITLY deselected (had a value
      // before). Skip the mount-time null and the refresh-time null so the
      // CD keeps the last table info until the user does something.
      if (prevId) {
        checkoutSocketRef.current.emit('cart-clear', { restaurantId });
      }
      return;
    }
    const tInfo = (floorPlan?.tables || []).find(t => t.id === selectedTableId);
    const tNumber = tInfo?.tableNumber ?? null;
    const tLabel = (tInfo as any)?.label || tNumber;
    // Status lookup priority: floor_plan_table_id → label → tableNumber.
    // Backend keys grouping by (floor_plan_table_id || table_number); orders
    // typically save table_number as the *label* (e.g. "U-2") so plain numeric
    // tableNumber ("2") misses. Falling through label first restores the match.
    const tableStatus = tableStatuses[selectedTableId]
      || (tLabel ? tableStatuses[tLabel] : undefined)
      || (tNumber ? tableStatuses[tNumber] : undefined);
    if (!tableStatus) {
      // Table is selected but has no order yet (or polling hasn't fetched it).
      // Push a placeholder so the Customer Display shows "Table X — no order yet"
      // instead of staying blank — staff was confused that clicking a table did
      // nothing on the customer screen (2026-05-28).
      checkoutSocketRef.current.emit('cart-update', {
        restaurantId,
        tableNumber: tLabel,
        items: [],
        subtotal: 0, tax: 0, taxRate: 0,
        serviceCharge: 0, serviceChargeRate: 0,
        discount: 0, total: 0,
        currency: currency || 'MYR',
        source: 'floor-plan',
        orderInfo: {
          orderType: 'dine_in',
          sourceLabel: 'floor-plan',
          paymentStatus: 'pending',
          orderStatus: 'empty'
        },
        customer: null
      });
      return;
    }
    // Pick the order shown in the panel — supports multi-order tables.
    const orders = tableStatus.orders || (tableStatus ? [tableStatus] : []);
    const idx = Math.min(selectedOrderIndex, Math.max(orders.length - 1, 0));
    const order: any = orders[idx] || tableStatus;
    const items = (order.orderItems || []).map((item: any) => ({
      name: item.name || item.menu_item_name || 'Item',
      quantity: item.quantity || 1,
      price: parseFloat(item.price) || 0,
      options: item.options || []
    }));
    // 2026-05-27 enrich — mirror the right-side detail panel onto the Customer
    // Display so the guest sees order#, type, payment, cashier, member info
    // before checkout. Replaces the phone-keypad on the CD's left column when
    // a cart is active. Customer Display reverts to the keypad only on cart-clear.
    checkoutSocketRef.current.emit('cart-update', {
      restaurantId,
      tableNumber: tNumber,
      orderNumber: order.orderNumber,
      items,
      subtotal: parseFloat(order.subtotal) || 0,
      tax: parseFloat(order.tax) || 0,
      taxRate: parseFloat(order.taxRate) || 0,
      serviceCharge: parseFloat(order.serviceCharge) || 0,
      serviceChargeRate: parseFloat(order.serviceChargeRate) || 0,
      discount: parseFloat(order.discount) || 0,
      total: parseFloat(order.totalAmount) || 0,
      currency: currency || 'MYR',
      source: 'floor-plan',
      orderInfo: {
        orderNumber: order.orderNumber,
        orderType: order.orderType || 'dine_in',
        sourceLabel: order.orderSource || 'pos',
        createdAt: order.orderCreatedAt || null,
        paymentStatus: order.paymentStatus || 'pending',
        paymentMethod: order.paymentMethod || null,
        cashierName: order.cashierName || null,
        orderStatus: order.orderStatus || null,
        guestCount: order.guestCount || null
      },
      customer: order.customerId ? {
        id: order.customerId,
        name: order.customerName || 'Member',
        phone: order.customerPhone || ''
      } : (order.customerName && order.customerName !== 'Walk-in Customer' ? {
        name: order.customerName,
        phone: order.customerPhone || ''
      } : null)
    });
  }, [selectedTableId, selectedOrderIndex, tableStatuses, restaurantId, currency, floorPlan, cdNonce]);

  // Listen for POS complete message from iframe. 리스너는 단 한 번만 등록한다 —
  // fetchStatuses 가 자주 새로 만들어져(소켓/폴링) 리스너가 떼였다 붙는 사이에 닫힘 메시지가
  // 도착하면 오버레이가 안 닫히는(검정바 잔존) 창이 생겼다. ref 로 최신 함수를 가리켜 제거. (2026-06-24)
  const fetchStatusesRef = useRef(fetchStatuses);
  fetchStatusesRef.current = fetchStatuses;
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'pos-order-complete' || event.data?.type === 'pos-close') {
        setShowPOS(false);
        setPosUrl('');
        fetchStatusesRef.current();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Table click → toggle detail panel. Receives Floor Plan v2 tables[].id, so
  // multiple zones with the same tableNumber stay isolated.
  const handleTableClick = (tableId: string) => {
    // If a long-press just fired (bill printed), swallow the click so the panel
    // doesn't also toggle.
    if (longPressRef.current.fired) { longPressRef.current.fired = false; return; }
    setSelectedTableId(prev => prev === tableId ? null : tableId);
    setSelectedOrderIndex(0);
  };

  // ── Long-press a table box → print its bill (2026-05-31 Irene: POS bill print is
  // cumbersome and stores print bills often). Holding a table ~600ms prints that
  // table's current bill (1 copy, no drawer pulse). A normal tap still opens the panel.
  // Reuses the proven bill print path (printBillViaRawBT) — no print-method change.
  const longPressRef = useRef<{ timer: any; fired: boolean }>({ timer: null, fired: false });

  const printBillForTable = async (tableId: string) => {
    const info: any = (tableId && tableStatuses[tableId]) || null;
    const orderId = info?.orderId;
    if (!orderId) return; // empty table → nothing to print
    try {
      const token = getAuthToken();
      const billPrintMod = await import('../../utils/billPrint');
      const printStoreInfo = getStoreInfo();
      const oRes = await fetch(`/api/orders/${orderId}`, { headers: { 'Authorization': `Bearer ${token}` } });
      const oJson = await oRes.json();
      const o = oJson?.data || oJson;
      const items = Array.isArray(o.order_items) ? o.order_items
        : (typeof o.order_items === 'string' ? (() => { try { return JSON.parse(o.order_items); } catch { return []; } })() : []);
      const printData = {
        orderNumber: o.order_number,
        pickupNumber: o.pickup_number || (o.order_number ? String(o.order_number).split('-')[1] : ''),
        tableNumber: o.table_number || undefined,
        pagerNumber: o.pager_number || undefined,
        date: new Date(o.createdAt || Date.now()),
        orderType: o.order_type === 'dine_in' ? 'dine-in' : (o.order_type || 'dine-in'),
        orderSource: o.source || 'pos',
        items: items.map((it: any) => ({ menuItem: { name: it.menuItem?.name || it.name || 'Item', price: parseFloat(it.price || it.menuItem?.price || '0'), emoji: it.menuItem?.emoji }, quantity: it.quantity || 1, options: it.options || [] })),
        subtotal: parseFloat(o.subtotal || '0'),
        tax: parseFloat(o.tax || '0'),
        serviceCharge: parseFloat(o.service_charge || '0'),
        serviceChargeRate: parseFloat(o.service_charge_rate || '0'),
        takeawayCharge: parseFloat(o.takeaway_charge || '0'),
        discount: parseFloat(o.discount || '0'),
        total: parseFloat(o.total_amount || o.total || '0'),
        paymentMethod: o.payment_method || undefined,
        cardType: o.card_type || undefined,
        cashierName: null
      };
      await billPrintMod.printBillViaRawBT(printData, printStoreInfo);
    } catch (e) {
      console.error('Long-press bill print failed:', e);
    }
  };

  const startTablePress = (tableId: string) => {
    longPressRef.current.fired = false;
    if (longPressRef.current.timer) clearTimeout(longPressRef.current.timer);
    longPressRef.current.timer = setTimeout(() => {
      longPressRef.current.fired = true;
      printBillForTable(tableId);
    }, 600);
    const cancel = () => {
      if (longPressRef.current.timer) { clearTimeout(longPressRef.current.timer); longPressRef.current.timer = null; }
      window.removeEventListener('mouseup', cancel);
      window.removeEventListener('touchend', cancel);
      window.removeEventListener('touchmove', cancel);
    };
    window.addEventListener('mouseup', cancel);
    window.addEventListener('touchend', cancel);
    window.addEventListener('touchmove', cancel);
  };

  // Status change handler
  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      // ⑫ 오프라인 단계이동(§15-5) — 온라인 경로 무변경. 메인 POS 에서만 로컬 op 기록.
      if (isOffline && isOfflineMainPos()) {
        const { recordOfflineOp } = await import('../../utils/offlineOps');
        await recordOfflineOp('set_stage', { serverId: orderId }, { status: newStatus });
        setCdInfoModal({ open: true, title: 'Saved offline', message: 'Stage change saved on this main POS. It will sync automatically when you are back online.' });
        return;
      }
      const token = getAuthToken();
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        await fetchStatuses();
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  // ── 아이템별 리스트(서빙 뷰) 지원 ──
  // 활성(미서빙) 아이템 수 — Items 탭 배지용.
  const itemViewActiveCount = useMemo(() => {
    const isServed = (s: any) => ['served', 'completed'].includes(String(s || ''));
    let n = 0;
    const count = (orders: any[]) => orders.forEach((o: any) => {
      const st = String(o.orderStatus || o.status || '');
      if (st === 'cancelled' || st === 'completed') return;
      (o.orderItems || o.order_items || []).forEach((it: any) => { if (!isServed(it.status)) n++; });
    });
    count(Object.values(tableStatuses));
    count(takeawayOrders);
    return n;
  }, [tableStatuses, takeawayOrders]);

  // 아이템 서빙 완료 토글 — 해당 주문의 order_items[idx].status 갱신(PATCH /items). 카운터 권한 불필요.
  // 아이템/세트구성품 서빙 토글. compIndex=null → 일반 아이템, 숫자 → 세트 구성품.
  // 세트는 구성품 각각 status 보유(KDS 와 동일). 구성품 다 served → 부모 세트 status=served.
  // 모든 최상위 아이템이 served → 주문 status=served 롤업(패널과 동일).
  const handleServeItem = useCallback(async (orderId: number, itemIndex: number, compIndex: number | null, makeServed: boolean) => {
    // 한 테이블 여러 주문 대비 — orders[] 까지 펼쳐서 대상 주문 검색.
    const allDineIn = Object.values(tableStatuses).flatMap((o: any) => (Array.isArray(o.orders) && o.orders.length) ? o.orders : [o]);
    const fromTables = allDineIn.find((o: any) => o.orderId === orderId);
    const fromTakeaway = takeawayOrders.find((o: any) => (o.orderId || o.id) === orderId);
    const src: any = fromTables || fromTakeaway;
    const items = (src && (src.orderItems || src.order_items)) || [];
    if (!Array.isArray(items) || !items[itemIndex]) return;
    let newStatus = makeServed ? 'served' : 'ready';
    const updated = items.map((it: any, i: number) => {
      if (i !== itemIndex) return it;
      if (compIndex == null) {
        // 일반 아이템 — 서브 시 직전 상태 보존 + 서브시간 기록, 되돌릴 때 복원/시간제거
        if (makeServed) return { ...it, _servedFrom: it.status || 'ready', status: 'served', served_at: new Date().toISOString() };
        const { _servedFrom, served_at, ...rest } = it; newStatus = _servedFrom || 'ready';
        return { ...rest, status: newStatus };
      }
      // 세트 구성품 토글
      const fieldKey = Array.isArray(it.set_components) && it.set_components.length ? 'set_components' : 'set_items';
      const comps = (it[fieldKey] || []).map((c: any, ci: number) => {
        if (ci !== compIndex) return c;
        if (makeServed) return { ...c, _servedFrom: c.status || 'ready', status: 'served', served_at: new Date().toISOString() };
        const { _servedFrom, served_at, ...rest } = c; newStatus = _servedFrom || 'ready';
        return { ...rest, status: newStatus };
      });
      const allComps = comps.every((c: any) => ['served', 'completed'].includes(String(c.status)));
      const parentStatus = allComps ? 'served' : (it.status === 'served' ? 'ready' : it.status);
      return { ...it, [fieldKey]: comps, status: parentStatus };
    });
    // 🔴 낙관적 override — stale poll 이 방금 서브한 상태를 되돌리는 사고 방지(서버 따라잡으면/60s 해제).
    const key = `${orderId}:${itemIndex}:${compIndex ?? 'i'}`;
    setServeOverrides(prev => ({ ...prev, [key]: { status: newStatus, ts: Date.now() } }));
    // ⑬ 오프라인 서빙 토글(§15-5) — PATCH /items 와 동일 body 를 cancel_item op 로 기록(온라인 무변경).
    // 낙관적 serveOverride 는 위에서 이미 걸었으므로 화면 즉시 반영. base_updated_at=캐시 주문 버전(재생 시 STALE_WRITE 보호).
    if (isOffline && isOfflineMainPos()) {
      const { recordOfflineOp } = await import('../../utils/offlineOps');
      await recordOfflineOp('cancel_item', { serverId: orderId }, { order_items: updated, allowItemRevert: !makeServed, base_updated_at: src.updatedAt || src.updated_at });
      return;
    }
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        // 2026-06-26 (item 5): carry the version we last read so a stale serve
        // toggle can't clobber a concurrent qty/item edit (backend → 409 STALE_WRITE).
        body: JSON.stringify({ order_items: updated, allowItemRevert: !makeServed, base_updated_at: src.updatedAt || src.updated_at })
      });
      if (res.ok) {
        // 롤업은 백엔드 단일 단계 모델이 처리 (PATCH /items 가 아이템 min 단계로 주문
        // 단계를 같은 쓰기에서 파생 — 별도 /status 호출 제거로 이중 emit 레이스 차단).
        await fetchStatuses();
      } else {
        // 409 STALE_WRITE 포함 모든 실패: 낙관적 override 해제 후 서버 진실로 재동기화.
        setServeOverrides(prev => { const n = { ...prev }; delete n[key]; return n; });
        await fetchStatuses();
      }
    } catch (err) {
      console.error('Failed to toggle item served:', err);
      setServeOverrides(prev => { const n = { ...prev }; delete n[key]; return n; });
    }
  }, [tableStatuses, takeawayOrders, fetchStatuses, fetchTakeawayOrders, isOffline]);

  // 서버가 override 상태로 따라잡았거나(일치) 60s 지난 항목은 override 해제.
  useEffect(() => {
    setServeOverrides(prev => {
      if (!Object.keys(prev).length) return prev;
      const now = Date.now(); let changed = false; const next: typeof prev = {};
      const serverStatus = (oid: string, idx: number, comp: string): string | null => {
        const allDineIn = Object.values(tableStatuses).flatMap((x: any) => (Array.isArray(x.orders) && x.orders.length) ? x.orders : [x]);
        const o: any = allDineIn.find((x: any) => String(x.orderId) === oid)
          || takeawayOrders.find((x: any) => String(x.orderId || x.id) === oid);
        const its = o && (o.orderItems || o.order_items);
        const it = Array.isArray(its) ? its[idx] : null;
        if (!it) return null;
        if (comp === 'i') return String(it.status || '');
        const comps = it.set_components || it.set_items || [];
        return comps[+comp] ? String(comps[+comp].status || '') : null;
      };
      for (const [k, v] of Object.entries(prev)) {
        const [oid, idxStr, comp] = k.split(':');
        const srv = serverStatus(oid, parseInt(idxStr, 10), comp);
        const serverCaughtUp = srv != null && srv === v.status;
        if (serverCaughtUp || (now - v.ts > 60000)) { changed = true; continue; }
        next[k] = v;
      }
      return changed ? next : prev;
    });
  }, [tableStatuses, takeawayOrders]);

  // override 를 ItemListView 에 넘길 주문에 입힌다(아이템/세트구성품 status 덮어쓰기).
  const applyServeOverrides = useCallback((orders: any[]) => {
    if (!Object.keys(serveOverrides).length) return orders;
    return orders.map((o: any) => {
      const oid = o.orderId || o.id;
      const its = o.orderItems || o.order_items;
      if (!Array.isArray(its)) return o;
      let changed = false;
      const next = its.map((it: any, i: number) => {
        const itemOv = serveOverrides[`${oid}:${i}:i`];
        // 세트 구성품 override
        const fieldKey = Array.isArray(it.set_components) && it.set_components.length ? 'set_components'
          : (Array.isArray(it.set_items) && it.set_items.length ? 'set_items' : null);
        let nextIt = it;
        if (fieldKey) {
          let cChanged = false;
          const comps = it[fieldKey].map((c: any, ci: number) => {
            const ov = serveOverrides[`${oid}:${i}:${ci}`];
            if (ov && String(c.status) !== ov.status) { cChanged = true; return { ...c, status: ov.status }; }
            return c;
          });
          if (cChanged) { nextIt = { ...nextIt, [fieldKey]: comps }; changed = true; }
        }
        if (itemOv && String(nextIt.status) !== itemOv.status) { nextIt = { ...nextIt, status: itemOv.status }; changed = true; }
        return nextIt;
      });
      return changed ? { ...o, orderItems: next, order_items: next } : o;
    });
  }, [serveOverrides]);

  // 행의 "주문 전체보기" → 우측 패널 오픈(테이블/테이크웨이).
  // "주문 전체보기" → 뷰(items) 유지한 채 그 자리에서 우측 패널만 오픈. 페이지 이동 X.
  const handleOpenDineInFromItems = useCallback((tableNumber: string, _orderId: number) => {
    const tbl = (floorPlan?.tables || []).find((tt: any) =>
      String(tt.label ?? tt.tableNumber ?? tt.id) === String(tableNumber) || String(tt.tableNumber) === String(tableNumber));
    if (tbl) { setSelectedTakeawayOrderId(null); setSelectedTableId(tbl.id); }
  }, [floorPlan, setSelectedTakeawayOrderId]);

  const handleOpenTakeawayFromItems = useCallback((id: number) => {
    setSelectedTableId(null);
    setSelectedTakeawayOrderId(id);
  }, [setSelectedTakeawayOrderId]);

  // 서빙 전용 직원(canOperatePOS=false)은 아이템 리스트를 가장 많이 봄 → 진입 기본 뷰 = items.
  // 명시적 view 파라미터가 없을 때만 1회 적용(이후 사용자가 자유롭게 탭 전환).
  const defaultViewAppliedRef = useRef(false);
  useEffect(() => {
    if (defaultViewAppliedRef.current || !user) return;
    defaultViewAppliedRef.current = true;
    if (!canOperatePOS && !_viewParam) setActiveView('items');
  }, [user, canOperatePOS, _viewParam, setActiveView]);

  // [POS Overlay pattern — SINGLE entry point for any POS launch from Floor Plan]
  // All POS Terminal launches from Floor Plan must go through this function and the <POSOverlay> iframe below.
  // Do NOT add `navigate('/pos-terminal?...')` direct routes from this page — the black bar header
  // (POSOverlayHeader with × Close) is the only close path, and Floor Plan state (zone filter, statuses,
  // socket subscription) is preserved by staying in this route.
  // Add new launch types here as new opts keys; do not split into separate functions.
  // 예약 임박 테이블 워크인 주문 차단(경고+강행). 'confirmed'(미도착) 예약만 — 체크인(arrived) 손님은 통과.
  const findBlockingReservation = () => {
    if (!orderBlockLeadMinutes || orderBlockLeadMinutes <= 0) return null;
    if (!selectedTableId && !selectedTable) return null;
    const now = Date.now();
    const leadMs = orderBlockLeadMinutes * 60000;
    for (const r of (reservations || [])) {
      if (!r || r.status !== 'confirmed') continue;
      const key = r.floor_plan_table_id || r.table_number;
      if (key !== selectedTableId && key !== selectedTable) continue;
      const at = new Date(r.reserved_at).getTime();
      if (!at || Number.isNaN(at)) continue;
      const turnMs = (Number(r.turn_minutes) || 90) * 60000;
      if (now >= at - leadMs && now <= at + turnMs) return r;
    }
    return null;
  };

  const handleNewOrder = (opts?: { takeaway?: boolean; walkIn?: boolean; mergeOrderId?: number; guests?: number; override?: boolean; checkInReservationId?: number }) => {
    // 워크인(매장식사 신규)만 검사 — 포장/체크인/Add-items 머지는 제외.
    if (!opts?.takeaway && !opts?.mergeOrderId && !opts?.override) {
      const br = findBlockingReservation();
      if (br) { setReserveWarn({ reservation: br, opts }); return; }
    }
    // 예약 체크인 (P2-6) — "Check in (New Order)" 는 이 테이블 예약을 명시적으로 체크인하는
    // 동작이다. Reservations 화면의 "Arrived" 와 동일하게 예약을 confirmed→arrived 로 전환한다
    // (best-effort). 그러면 주문 생성 시 백엔드 linkArrivedReservationToOrder 가 arrived→seated
    // 로 seat + order.reservation_id 링크 → 세 화면 상태가 일치. 이미 arrived 면 400 무시(백엔드가
    // seat). 실패해도 주문 흐름은 그대로 진행(비치명적). 주문생성 코드(Fable 영역)는 무접촉.
    if (opts?.checkInReservationId) {
      (async () => {
        try {
          const token = getAuthToken();
          await fetch(`/api/reservations/${opts.checkInReservationId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status: 'arrived' })
          });
        } catch (_) { /* non-fatal — 체크인 실패가 주문을 막지 않음 */ }
        loadReservations();
      })();
    }
    const params = new URLSearchParams();
    // Add Items (#7) — 기존 주문에 머지(새 주문 생성 방지). POS 가 forceMergeIntoOrderId 로 합친다.
    if (opts?.mergeOrderId) params.set('mergeOrderId', String(opts.mergeOrderId));
    // 2026-05-27: takeaway from a selected table pins to that table's bill
    // (e.g. a guest at T20 wants a coffee to go — staff still wants it on the
    // T20 ticket). Walk-in takeaway (no selected table) stays counter-pickup.
    if (opts?.takeaway) {
      params.set('order_type', 'takeaway');
      // 2026-06-26 (Irene): "Walk-in" 포장은 항상 카운터 픽업(테이블 없음). 직전에 선택된 테이블이
      // 남아 있어도 walk-in 의도면 절대 테이블을 붙이지 않는다. (테이블 손님이 포장 요청 → 그 테이블
      // 빌에 유지하는 동작은 walkIn 플래그 없이 호출하는 별도 진입점 전용. 1216~ 주석 참고.)
      if (!opts.walkIn && selectedTable && selectedTableId) {
        params.set('table', selectedTable);
        params.set('tableId', selectedTableId);
      }
    } else {
      if (!selectedTable || !selectedTableId) return;
      // table = tableNumber (display) + tableId = Floor Plan v2 id (zone-isolated).
      // POSTerminal binds the order to floor_plan_table_id so different zones with
      // the same tableNumber don't collide.
      params.set('table', selectedTable);
      params.set('tableId', selectedTableId);
    }
    // 예약 체크인 (P2-6) — 인원 prefill. POSTerminal 이 guests 쿼리를 guest_count 로 적재.
    if (opts?.guests && opts.guests > 0) params.set('guests', String(opts.guests));
    params.set('from', 'floor-plan-overlay');
    setPosUrl(`/restaurant/${restaurantId}/pos-terminal?${params.toString()}`);
    setShowPOS(true);
  };

  // Payment → PaymentModal (like LiveOrders)
  const handlePayment = async () => {
    const statusInfo = (selectedTableId && tableStatuses[selectedTableId]) || (selectedTable ? tableStatuses[selectedTable] : undefined);

    // 통일(2026-05-29): Live Orders 와 동일하게 풀 주문 데이터로 팝업을 채운다.
    // table-status 객체는 서비스차지/세율/쿠폰·포인트 분리값이 없어 그 줄들이 숨었음.
    setOrderForPayment(null);
    const oid = (statusInfo as any)?.orderId;
    if (oid) {
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/orders/${oid}`, { headers: { Authorization: `Bearer ${token}` } });
        const j = await res.json();
        const full = j?.data || (j && j.id ? j : null);
        if (full) setOrderForPayment(full);
      } catch { /* fetch 실패 시 selectedStatusInfo 로 폴백 (아래 렌더) */ }
    }

    setShowPaymentModal(true);

    // Checkout Display 에 주문 내역 전송 — lookup by floor_plan_table_id first
    if (checkoutSocketRef.current && (selectedTableId || selectedTable)) {
      if (statusInfo) {
        const items = (statusInfo as any).items?.map((item: any) => ({
          name: item.name || item.menu_item_name || 'Item',
          quantity: item.quantity || 1,
          price: parseFloat(item.price) || 0,
          options: item.options || []
        })) || [];
        checkoutSocketRef.current.emit('cart-update', {
          restaurantId,
          items,
          subtotal: parseFloat((statusInfo as any).subtotal || (statusInfo as any).totalAmount) || 0,
          tax: parseFloat((statusInfo as any).tax) || 0,
          taxRate: 0,
          serviceCharge: parseFloat((statusInfo as any).serviceCharge) || 0,
          serviceChargeRate: 0,
          discount: parseFloat((statusInfo as any).discount) || 0,
          total: parseFloat((statusInfo as any).totalAmount) || 0,
          currency: 'MYR'
        });
      }
    }
  };

  // Trigger payment for a takeaway order (called from TableDetailPanel reused for takeaway).
  const handleTakeawayPayment = (o: any) => {
    setPaymentTakeawayOrderId(o.id);
  };

  // Payment confirm — shared by dine-in and takeaway. paymentTakeawayOrderId, when set,
  // overrides selectedTable lookup so we PATCH the correct order.
  const handlePaymentConfirm = async (
    method: string,
    _amountReceived?: number,
    _change?: number,
    pointsUsed?: number,
    pointDiscount?: number,
    cardType?: string,
    _staffNames?: string[][],
    ewalletType?: string
  ) => {
    // Two sources of truth — takeaway path uses the explicit order id; dine-in path looks up the
    // active order for the selected table.
    let orderId: number | undefined;
    let baseTotalAmount = 0;
    if (paymentTakeawayOrderId) {
      const o: any = takeawayOrders.find((x: any) => x.id === paymentTakeawayOrderId);
      if (!o) return;
      orderId = o.id;
      baseTotalAmount = parseFloat(o.final_price ?? o.total_amount ?? o.total) || 0;
    } else {
      if (!selectedTableId && !selectedTable) return;
      const statusInfo = (selectedTableId && tableStatuses[selectedTableId]) || (selectedTable ? tableStatuses[selectedTable] : undefined);
      if (!statusInfo?.orderId) return;
      orderId = statusInfo.orderId;
      baseTotalAmount = Number(statusInfo.totalAmount || 0);
    }

    try {
      const token = getAuthToken();
      const updatePayload: any = {
        payment_status: 'completed',
        payment_method: method,
        card_type: method === 'card' ? (cardType || null) : null,
        ewallet_type: method === 'ewallet' ? (ewalletType || null) : null
      };

      if (pointsUsed && pointsUsed > 0 && pointDiscount && pointDiscount > 0) {
        updatePayload.points_used = pointsUsed;
        updatePayload.point_discount = pointDiscount;
        updatePayload.total_amount = baseTotalAmount - pointDiscount;
      }

      // For takeaway path we don't have selectedStatusInfo's orderStatus here, so we re-fetch lightly
      // by reading the canonical row when needed. Dine-in keeps its existing optimization.
      const dineInStatusInfo = !paymentTakeawayOrderId
        ? ((selectedTableId && tableStatuses[selectedTableId]) || (selectedTable ? tableStatuses[selectedTable] : null))
        : null;
      const takeawayOrder: any = paymentTakeawayOrderId
        ? takeawayOrders.find((x: any) => x.id === paymentTakeawayOrderId)
        : null;
      const currentOrderStatus = paymentTakeawayOrderId
        ? takeawayOrder?.status
        : dineInStatusInfo?.orderStatus;
      const orderNumber = paymentTakeawayOrderId
        ? (takeawayOrder?.order_number || takeawayOrder?.orderNumber || '')
        : ((dineInStatusInfo as any)?.orderNumber || '');

      // ⑮ 오프라인 결제(§15-5, LiveOrders ⑦ 동형) — 온라인 경로 무변경. 메인 POS 에서만 pay op 기록.
      // 받은 금액은 실수령(총액-기결제) 그대로, settle_full 로 완납 마감. 포인트 사용은 오프라인 비활성(서버 검증 필요) → op 미포함.
      if (isOffline && isOfflineMainPos() && orderId) {
        const { recordOfflineOp } = await import('../../utils/offlineOps');
        const amountPaid = Number(paymentTakeawayOrderId ? (takeawayOrder?.amount_paid ?? 0) : ((dineInStatusInfo as any)?.amountPaid ?? 0)) || 0;
        const dueAmount = Math.max(0, baseTotalAmount - amountPaid);
        await recordOfflineOp('pay', { serverId: orderId }, {
          amount: dueAmount,
          payment_method: method,
          card_type: method === 'card' ? (cardType || null) : null,
          ewallet_type: method === 'ewallet' ? (ewalletType || null) : null,
          cashier_name: undefined,
          settle_full: true,
        });
        // 서빙완료 주문이면 완료 단계로(온라인 로직 미러 — set_stage op, seq 로 재생순서 보장).
        if (currentOrderStatus === 'served') {
          await recordOfflineOp('set_stage', { serverId: orderId }, { status: 'completed' });
        }
        if (paymentTakeawayOrderId) { setPaymentTakeawayOrderId(null); }
        else { setShowPaymentModal(false); setOrderForPayment(null); }
        setCdInfoModal({ open: true, title: 'Payment saved offline', message: 'Payment recorded on this main POS. It will sync automatically when you are back online.' });
        return;
      }

      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload)
      });
      if (res.ok) {
        // LiveOrders와 동일: 결제 완료 후 상태 변경
        if (currentOrderStatus === 'outstanding') {
          await fetch(`/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ status: 'pending' })
          });
        } else if (currentOrderStatus === 'served') {
          await fetch(`/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ status: 'completed' })
          });
        }
        if (paymentTakeawayOrderId) {
          setPaymentTakeawayOrderId(null);
          await fetchTakeawayOrders();
        } else {
          setShowPaymentModal(false);
          setOrderForPayment(null);
          await fetchStatuses();
        }

        // Checkout Display 에 결제 완료 전송 (dine-in 만 — takeaway 는 카운터 픽업)
        if (!paymentTakeawayOrderId && checkoutSocketRef.current && dineInStatusInfo) {
          checkoutSocketRef.current.emit('checkout-complete', {
            restaurantId,
            orderNumber,
            total: parseFloat((dineInStatusInfo as any).totalAmount) || 0,
            currency: 'MYR'
          });
        }

        // Auto-print bill + kitchen ticket (parity with POSTerminal:processPayment).
        // Floor Plan / LiveOrders 결제 흐름은 그동안 자동 트리거 코드가 없었음 —
        // POSTerminal 의 결제 흐름만 자동이라 매장이 Floor Plan 에서 결제하면
        // 빌/주방 자동 출력이 아예 안 됨. 같은 패턴으로 추가.
        try {
          const billPrintMod = await import('../../utils/billPrint');
          const printSettings = billPrintMod.getPrinterSettings();
          const activeBill = billPrintMod.getActiveBillPrinter();
          const printStoreInfo = getStoreInfo();
          // Fetch latest order snapshot for accurate printData (PaymentModal closed already)
          const oRes = await fetch(`/api/orders/${orderId}`, { headers: { 'Authorization': `Bearer ${token}` } });
          const oJson = await oRes.json();
          const o = oJson?.data || oJson;
          const items = Array.isArray(o.order_items)
            ? o.order_items
            : (typeof o.order_items === 'string' ? (() => { try { return JSON.parse(o.order_items); } catch { return []; } })() : []);
          const printData = {
            orderNumber: o.order_number || orderNumber,
            pickupNumber: o.pickup_number || (o.order_number ? String(o.order_number).split('-')[1] : ''),
            tableNumber: o.table_number || undefined,
            pagerNumber: o.pager_number || undefined,
            date: new Date(o.createdAt || Date.now()),
            orderType: o.order_type === 'dine_in' ? 'dine-in' : (o.order_type || 'dine-in'),
            orderSource: o.source || 'pos',
            items: items.map((it: any) => ({
              menuItem: { name: it.menuItem?.name || it.name || 'Item', price: parseFloat(it.price || it.menuItem?.price || '0'), emoji: it.menuItem?.emoji },
              quantity: it.quantity || 1,
              options: it.options || []
            })),
            subtotal: parseFloat(o.subtotal || '0'),
            tax: parseFloat(o.tax || '0'),
            serviceCharge: parseFloat(o.service_charge || '0'),
            serviceChargeRate: parseFloat(o.service_charge_rate || '0'),
            takeawayCharge: parseFloat(o.takeaway_charge || '0'),
            discount: parseFloat(o.discount || '0'),
            total: parseFloat(o.total_amount || o.total || '0'),
            paymentMethod: method,
            cashierName: null
          };

          // Bill auto-print (workstation-aware + copies)
          if (activeBill?.enabled && activeBill?.autoPrint) {
            const copies = Math.max(1, Math.min(3, parseInt(
              (printSettings.receiptSettings && printSettings.receiptSettings.copiesAfterPayment) ||
              (JSON.parse(localStorage.getItem('receiptSettings') || '{}').copiesAfterPayment) || 1, 10) || 1));
            const autoOpenDrawer = (printSettings.receiptSettings && printSettings.receiptSettings.autoOpenDrawer) !== false &&
              (JSON.parse(localStorage.getItem('receiptSettings') || '{}').autoOpenDrawer !== false);
            (async () => {
              await new Promise(r => setTimeout(r, 300));
              for (let i = 0; i < copies; i++) {
                const isLast = i === copies - 1;
                const dataForCopy = { ...printData, __drawerPulse: !!(autoOpenDrawer && isLast) };
                try { await billPrintMod.printBillViaRawBT(dataForCopy, printStoreInfo); }
                catch (e: any) { console.error('FloorPlan auto bill print failed (copy ' + (i + 1) + '):', e); }
                if (i < copies - 1) await new Promise(r => setTimeout(r, 600));
              }
            })();
          }

          // 2026-05-28: FloorPlan 결제는 항상 pre-existing 주문에 대한 결제 흐름
          // (테이블 자리잡음 → 주문 추가 시점에 kitchen ticket 인쇄됨). 결제 시점에
          // 다시 인쇄하면 같은 ticket 중복 → 매장 보고. kitchen ticket 은 주문이
          // 들어올 때만 인쇄.
        } catch (autoPrintErr) {
          console.error('FloorPlan auto-print skipped:', autoPrintErr);
        }
      }
    } catch (err) {
      console.error('Failed to process payment:', err);
    }
  };

  // Clear table — frees the table on the floor WITHOUT erasing table_number.
  // 2026-05-31 (Irene): previously this PATCHed { table_number: null }, which
  // destroyed the order's table history → completed orders showed "no table
  // assigned" in Live Orders. Now we set table_cleared=true: table-status drops
  // it from occupancy, but the order keeps its number for bill/reports/history.
  const handleClearTable = async (orderId: number) => {
    try {
      const token = getAuthToken();
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ table_cleared: true })
      });
      setSelectedTableId(null);
      await fetchStatuses();
    } catch (err) {
      console.error('Failed to clear table:', err);
    }
  };

  // ── Table Move ──────────────────────────────────────────────────────────
  // moveCtx holds the order being moved + its source table while the picker is open.
  const [moveCtx, setMoveCtx] = useState<{ orderId: number; sourceTableNumber: string | null } | null>(null);
  const [moveSearch, setMoveSearch] = useState('');
  const [moveBusy, setMoveBusy] = useState(false);
  // Occupied-destination prompt: server said the dest table already has an order.
  const [moveOccupied, setMoveOccupied] = useState<{ destTable: string; destFpti: string; dest: any } | null>(null);
  // 수동발행(자동발행 OFF) 시 이동 재발행 확인 프롬프트 (station별 미리보기 + 보내기/안보내기)
  const [movePrintPrompt, setMovePrintPrompt] = useState<KitchenTicketSendPrompt | null>(null);

  const handleOpenMove = (orderId: number, sourceTableNumber: string | null) => {
    setMoveSearch('');
    setMoveOccupied(null);
    setMoveCtx({ orderId, sourceTableNumber });
  };

  // Core move call. onOccupied 'block' first; if the server reports the dest is
  // occupied we surface the merge/cancel prompt instead of guessing.
  const doMove = async (destTable: string, destFpti: string, onOccupied: 'block' | 'merge') => {
    if (!moveCtx) return;
    setMoveBusy(true);
    try {
      // ⑭ 오프라인 테이블이동(§15-5) — 온라인 경로 무변경. 메인 POS 에서만.
      if (isOffline && isOfflineMainPos()) {
        // 오프라인 점유판정 = 오버레이 반영된 tableStatuses 로 클라 선차단(오프라인 머지 UI 금지 — 항상 block).
        const destStatus: any = effectiveTableStatuses[destFpti] || effectiveTableStatuses[destTable];
        if (destStatus && destStatus.status && destStatus.status !== 'available') {
          setCdInfoModal({ open: true, title: 'Table occupied', message: 'That table already has an order. Table moves to an occupied table are not available while offline.' });
          return;
        }
        // 대상 주문(캐시)에서 이미 주방에 발행된 품목이 있으면 TABLE CHANGED 안내표를 로컬 인쇄.
        const order: any = rtOrders.find((o: any) => Number(o.id) === Number(moveCtx.orderId));
        let oitems: any = order?.order_items;
        if (typeof oitems === 'string') { try { oitems = JSON.parse(oitems); } catch { oitems = []; } }
        if (!Array.isArray(oitems)) oitems = [];
        const { recordOfflineOp, printOfflineNoticeTicket } = await import('../../utils/offlineOps');
        const fromTable = moveCtx.sourceTableNumber || (order?.table_number ?? '');
        // 로컬 인쇄 먼저(성공 시 printed_offline 로 재생이 재발행 스킵 — I3). 발행품목 없으면 false.
        const printed = order
          ? await printOfflineNoticeTicket(
              order,
              { title: '** TABLE CHANGED **', fromTable, toTable: destTable, lines: ['Discard the previous ticket.', 'Use THIS ticket.'] },
              oitems
            ).catch(() => false)
          : false;
        await recordOfflineOp('move_table', { serverId: moveCtx.orderId }, {
          destinationTableNumber: destTable,
          destinationFloorPlanTableId: destFpti,
          onOccupied: 'block',
          printed_offline: printed === true,
        });
        setSelectedTableId(destFpti || null);
        setMoveCtx(null);
        setMoveOccupied(null);
        setCdInfoModal({ open: true, title: 'Table moved offline', message: 'Table change saved on this main POS. It will sync automatically when you are back online.' });
        return;
      }
      const token = getAuthToken();
      const res = await fetch(`/api/orders/${moveCtx.orderId}/move-table`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ destinationTableNumber: destTable, destinationFloorPlanTableId: destFpti, onOccupied })
      });
      const result = await res.json().catch(() => ({}));

      if (res.status === 409 && result?.code === 'DEST_OCCUPIED') {
        // Ask the user: merge into the destination's open order, or cancel.
        setMoveOccupied({ destTable, destFpti, dest: result.destination });
        return;
      }
      if (!res.ok || !result?.success) {
        console.error('[move-table] failed:', result?.message || res.status);
        return;
      }

      // 🔒 이동 후 주방 재발행 — "설정에 맞춘다"(Irene). 매장이 주방 자동발행 ON
      // 이면 새 테이블 번호로 오더티켓을 매장 설정 방식(USB/브라우저/QZ/RawBT) 그대로
      // 자동 재발행해서 주방이 바뀐 테이블을 알게 한다. 자동발행 OFF 면 인쇄 없이
      // KDS 팝업 안내만(KitchenDisplayPage 의 table-moved 핸들러). 정상 자동인쇄
      // 경로(useAutoPrintPoller)와 100% 동일한 printData 구조 — 특히 date:new Date
      // (빠지면 toLocaleTimeString 크래시) + 동일 게이트. printKitchenTicketViaRawBT
      // 가 방식을 내부 분기하므로 함수명과 무관하게 설정대로 나간다. 합치기(merge)는
      // 목적지 주문에 이미 붙은 거라 재발행 안 함.
      try {
        const printed = Array.isArray(result.printedItems) ? result.printedItems : [];
        if (printed.length > 0 && (result.moved || result.merged)) {   // 머지(R8)도 재발행 (MERGED 헤더)
          const billPrintMod = await import('../../utils/billPrint');
          const printSettings = billPrintMod.getPrinterSettings();
          const printStoreInfo = (typeof getStoreInfo === 'function') ? getStoreInfo() : {};
          const ord = result.data || {};
          const mapItem = (it: any) => ({
            menuItem: { name: it.name || (it.menuItem && it.menuItem.name) || 'Item', price: parseFloat(it.price || '0') },
            quantity: it.quantity || 1,
            options: Array.isArray(it.options) ? it.options : [],
            kitchen_station_id: it.kitchen_station_id || null,
            stationName: it.stationName || null,
            ...(it.is_set_menu ? { is_set_menu: true } : {}),
            ...(Array.isArray(it.set_components) ? { set_components: it.set_components } : {}),
            ...(Array.isArray(it.set_items) ? { set_items: it.set_items } : {}),
            special_instructions: it.special_instructions || ''
          });
          // R7/R8 — 이동 재발행 티켓 상단 안내 헤더(주방이 옛 티켓 버리게). merge=R8.
          const _moveNotice = onOccupied === 'merge'
            ? { title: '** TABLE CHANGED + MERGED **', lines: ['Discard previous tickets for these tables.', 'Use THIS ticket.'] }
            : { title: '** TABLE CHANGED **', lines: ['Discard the previous ticket.', 'Use THIS ticket.'] };
          const reprintData: any = {
            noticeHeader: _moveNotice,
            orderNumber: ord.order_number,
            pickupNumber: ord.order_number ? String(ord.order_number).split('-')[1] : '',
            // 2026-06-28 (R8, Irene): 머지 티켓은 "출발 + 목적지" 두 테이블 표시(소스+목적지),
            // 일반 이동은 목적지만. 헤더 ** TABLE CHANGED + MERGED ** 와 함께 주방이 양쪽 옛 티켓을 버림.
            tableNumber: (onOccupied === 'merge' && (result as any).sourceTableNumber && (destTable || ord.table_number))
              ? `${(result as any).sourceTableNumber} + ${destTable || ord.table_number}`
              : (destTable || ord.table_number || undefined),
            pagerNumber: ord.pager_number || undefined,
            date: new Date(ord.order_date || ord.createdAt || Date.now()),
            orderType: ord.order_type === 'dine_in' ? 'dine-in' : (ord.order_type || 'dine-in'),
            orderSource: ord.source || 'pos',
            items: printed.map(mapItem),
            subtotal: parseFloat(ord.subtotal || '0'),
            tax: parseFloat(ord.tax || '0'),
            total: parseFloat(ord.total_amount || '0'),
            paymentMethod: ord.payment_method || 'counter',
            cashierName: 'POS'
          };
          const doReissue = () => billPrintMod.printKitchenTicketViaRawBT(reprintData, printStoreInfo)
            .catch((e: any) => console.warn('[move-table] reprint failed (non-fatal):', e?.message));
          // 2026-06-04 (Irene 개정): 이동도 자동발행(autoPrint) 설정을 따른다.
          //   autoPrint ON  → 자동 발송 + 팝업 [Resend].
          //   autoPrint OFF → 자동 발송 안 함, 팝업 [Send] 로 수동 발송.
          // (이전 v2 스펙은 설정 무관 항상 발송이었으나, 매장이 자동발행을 끈 상태에서도
          //  나가는 건 맞지 않다고 Irene 확정 — 취소/이동 모두 설정대로.)
          const _kpMove: any = printSettings.kitchenPrinter;
          const _autoOnMove = !!(_kpMove && _kpMove.enabled && _kpMove.autoPrint);
          // 2026-06-24 (Irene): 평범한 테이블이동 재발행은 backend(needs_print + pending_reprint) → 인쇄
          // 전담 POS 폴러가 새 테이블로 처리한다. 누른 기기/계정 무관(자동인쇄 계정차이 제거), 중복
          // 방지를 위해 프론트 직접 재발행 제거. 머지(merge)는 아직 backend 미처리라 기존 직접 경로 유지.
          if (onOccupied === 'merge') {
            if (_autoOnMove) doReissue();
            setMovePrintPrompt({
              run: doReissue,
              autoSent: _autoOnMove,
              ticketType: _moveNotice.title,
              description: _autoOnMove ? '머지 — 이전 티켓들 버리고 이 티켓 사용 (발송됨)' : '머지 — [Send]를 눌러 주방에 전송',
              stations: previewStationBuckets(printed, printSettings),
            });
          } else if (result.data && result.data.pending_reprint) {
            // 2026-06-25 (Irene 하이브리드): 평범한 이동도 "인쇄 전담 POS(POS1)"면 폴러 안 기다리고
            // 즉시 로컬 재발행. result.data.pending_reprint(백엔드가 set 한 표준 ** TABLE CHANGED **
            // noticeHeader + fromTable/toTable)를 그대로 재사용 → billPrint 무변경/새 디자인 0,
            // 폴러가 찍을 것과 동일. POS2/서빙태블릿은 util 게이트로 false → POS1 폴러가 처리(크로스기기).
            // atomic claim 으로 폴러와 중복 0. 실패/게이트밖이면 poke(폴러 fallback).
            (async () => {
              try {
                const { printOrderKitchenNow } = await import('../../utils/hybridKitchenPrint');
                const _ok = await printOrderKitchenNow(result.data, getStoreInfo);
                if (_ok) return;
              } catch (_e) { /* fall through */ }
              try { window.dispatchEvent(new CustomEvent('autoprint-poke')); localStorage.setItem('autoprint-poke', String(Date.now())); } catch {}
            })();
          }
        }
      } catch (e: any) { console.warn('[move-table] reprint step skipped:', e?.message); }

      // Refresh both tables, jump selection to the destination, close picker.
      setSelectedTableId(destFpti || null);
      setMoveCtx(null);
      setMoveOccupied(null);
      await fetchStatuses();
    } catch (err) {
      console.error('Failed to move table:', err);
    } finally {
      setMoveBusy(false);
    }
  };

  // Clear all completed orders from table
  const handleClearAllCompleted = async () => {
    if (!selectedTable) return;
    try {
      const token = getAuthToken();
      const completedOrders = selectedOrders.filter(o => o.orderStatus === 'completed');
      await Promise.all(completedOrders.map(o =>
        fetch(`/api/orders/${o.orderId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ table_cleared: true })  // 2026-05-31: non-destructive — keep table_number
        })
      ));
      setSelectedTableId(null);
      await fetchStatuses();
    } catch (err) {
      console.error('Failed to clear table:', err);
    }
  };

  // Navigate to POS Terminal (full page)
  const handleNavigateToPOS = () => {
    if (selectedTable && selectedTableId) {
      navigate(`/restaurant/${restaurantId}/pos-terminal?table=${selectedTable}&tableId=${selectedTableId}&from=floor-plan`);
    }
  };

  // Close POS overlay
  const handleClosePOS = () => {
    setShowPOS(false);
    setPosUrl('');
    fetchStatuses();
  };

  // Derived selection — selectedTableId is the single source of truth.
  // selectedTableInfo = FloorTable object, selectedTable = tableNumber string.
  // tableStatuses lookup tries the unique id first, then falls back to tableNumber
  // for legacy orders (pre-floor_plan_table_id migration).
  const selectedTableInfo = selectedTableId
    ? floorPlan.tables.find(t => t.id === selectedTableId)
    : undefined;
  // 2026-05-27 hotfix: prefer label over tableNumber when sending `?table=` to
  // POS Terminal. Multi-zone shops (e.g. restaurant 16 — The Fire Korean) name
  // tables "A-20" / "T-20" via group prefix + tableNumber but `tableNumber` itself
  // is just "20" in both zones — so without label, two zones collapse into one
  // ordering bucket. Label carries the user-visible prefix so the order is
  // stored as "A-20" or "T-20" and the zones stay separated even when
  // floor_plan_table_id is missing (legacy POS-direct entries).
  const selectedTable: string | null = (selectedTableInfo?.label || selectedTableInfo?.tableNumber) ?? null;
  const selectedTableData = selectedTableId
    ? (effectiveTableStatuses[selectedTableId] || (selectedTable ? effectiveTableStatuses[selectedTable] : undefined))
    : undefined;
  // 우측 패널 탭 = 오늘 per-table 전체 이력(완료 포함). 빈 테이블을 눌러도 오늘 주문을 다 본다.
  // 보드 점유는 tableStatuses(=data)가 그대로 담당 — 여기 history 는 패널 탭 표시용.
  const selectedHistory = selectedTableId
    ? (tableHistory[selectedTableId] || (selectedTable ? tableHistory[selectedTable] : undefined))
    : undefined;
  const selectedOrders = (selectedHistory && selectedHistory.length > 0)
    ? selectedHistory
    : (selectedTableData?.orders || (selectedTableData ? [selectedTableData] : []));
  // 기본 화면 = 활성 주문(점유). 없으면 빈 테이블(available/새주문). 완료 주문은 탭(history)으로만 표시.
  // selectedOrderIndex === -1 → 기본(활성/빈). >=0 → 그 탭(완료 포함)을 명시적으로 선택해 본다.
  // 완료/cleared 로 비워진 테이블을 눌러도 기본은 "빈 테이블 새주문"이고, 상단 탭으로 오늘 완료 주문 조회.
  const safeOrderIndex = selectedOrderIndex < 0
    ? -1
    : Math.min(selectedOrderIndex, Math.max(selectedOrders.length - 1, 0));
  const selectedStatusInfo = (safeOrderIndex >= 0 && selectedOrders[safeOrderIndex])
    ? selectedOrders[safeOrderIndex]
    : selectedTableData;
  // 예약 배너 — 활성 주문이 없는(점유 아님) 테이블에 임박 예약이 있을 때만. 주문 로직 무영향.
  const selectedReservation = (selectedTableId && !selectedTableData)
    ? (reservedMap[selectedTableId] || (selectedTable ? reservedMap[selectedTable] : undefined))
    : undefined;
  // 탭을 보일지: 주문이 여러 개거나, 빈 테이블이라도 오늘 완료 이력이 있으면.
  const showOrderTabs = selectedOrders.length > 1 || (!selectedTableData && selectedOrders.length >= 1);

  if (loading) {
    return (
      <PageContainer>
        <Header>
          <HeaderLeft><HeaderTitle>{t('floorplan:floorPlanPage.floorPlan')}</HeaderTitle></HeaderLeft>
        </Header>
        <LoadingScreen>{t('floorplan:floorPlanPage.loadingFloorPlan')}</LoadingScreen>
      </PageContainer>
    );
  }

  return (
    <PageContainer data-pos-theme={posTheme}>
      <PosDisplayThemeStyle />
      {/* Items Added Alert — same as LiveOrders */}
      {itemsAddedAlert?.isVisible && (
        <div data-items-added-banner="" style={{
          position: 'fixed', top: '20px', right: '20px',
          background: '#FEF3C7', border: '2px solid #F59E0B',
          borderRadius: '12px', padding: '16px 20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          zIndex: 10000, maxWidth: '320px',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <style>{`@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#92400E' }}>{itemsAddedAlert.kind === 'order' ? t('floorplan:floorPlanPage.newOrderReceived', { defaultValue: 'New order received' }) : itemsAddedAlert.kind === 'merge' ? t('floorplan:floorPlanPage.ordersMerged', { defaultValue: 'Orders Merged' }) : t('floorplan:floorPlanPage.newItemsAdded')}</div>
            <button onClick={() => setItemsAddedAlert(null)} style={{
              background: 'none', border: 'none', fontSize: '20px',
              cursor: 'pointer', color: '#92400E', padding: '0', lineHeight: 1
            }}>&times;</button>
          </div>
          <div style={{ color: '#78350F', fontSize: '14px', marginBottom: '12px' }}>
            <strong>Order {itemsAddedAlert.orderNumber}</strong>
            {itemsAddedAlert.tableNumber
              ? ` (Table ${itemsAddedAlert.tableNumber})`
              : itemsAddedAlert.orderType ? ` (${t(`floorplan:floorPlanPage.type_${itemsAddedAlert.orderType}`, { defaultValue: itemsAddedAlert.orderType })})` : ''}
            <br />
            {itemsAddedAlert.kind === 'order' ? (
              <span>{itemsAddedAlert.itemCount} item{itemsAddedAlert.itemCount > 1 ? 's' : ''}</span>
            ) : itemsAddedAlert.kind === 'merge' ? (
              // 테이블이동 머지 — "+Order/added" 가 아니라 어디서 합쳐졌는지 명시 (혼동 방지)
              <>
                <span style={{ background: '#FCD34D', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  {itemsAddedAlert.mergedFromOrderNumber ? `Order ${itemsAddedAlert.mergedFromOrderNumber}` : 'Order'}
                  {itemsAddedAlert.mergedFromTable ? ` (Table ${itemsAddedAlert.mergedFromTable})` : ''}
                </span>
                {' '}{t('floorplan:floorPlanPage.mergedIntoThisOrder', { defaultValue: 'merged into this order' })}
                {' '}· {itemsAddedAlert.itemCount} item{itemsAddedAlert.itemCount > 1 ? 's' : ''}
              </>
            ) : (
              <>
                <span style={{ background: '#FCD34D', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  +Order {itemsAddedAlert.orderGroup}
                </span>
                {' '}{itemsAddedAlert.itemCount} item{itemsAddedAlert.itemCount > 1 ? 's' : ''} added
              </>
            )}
          </div>
          <button onClick={() => {
            const alert = itemsAddedAlert;
            if (alert.tableNumber) {
              // 테이블 주문 → 테이블 우측 패널
              const match = floorPlan?.tables.find(t => t.tableNumber === alert.tableNumber);
              if (match) setSelectedTableId(match.id);
            } else if (alert.orderId != null) {
              // off-table(테이크/픽업/배달) → off-table 뷰로 전환 + 그 주문 우측 패널
              setActiveView('takeaway');
              setOffTableFilter('all');
              setSelectedTakeawayOrderId(alert.orderId);
            }
            setItemsAddedAlert(null);
          }} style={{
            width: '100%', padding: '10px', background: '#F59E0B', color: 'white',
            border: 'none', borderRadius: '8px', fontWeight: 600,
            cursor: 'pointer', fontSize: '14px'
          }}>{itemsAddedAlert.tableNumber ? t('floorplan:floorPlanPage.viewTable') : t('floorplan:floorPlanPage.viewOrderBtn', { defaultValue: 'View order' })}</button>
        </div>
      )}

      {!fullscreen && (
      <Header>
        <HeaderLeft>
          <HeaderTitle>{t('floorplan:floorPlanPage.floorPlan')}</HeaderTitle>
          {/* 2026-06-28 (5-1): enter fullscreen — hides header + bottom stats bar to
              maximize the table map while taking orders. Exit via the zone-bar button. */}
          <BackBtn
            type="button"
            onClick={toggleFullscreen}
            title={t('floorplan:floorPlanPage.fullscreen', 'Fullscreen')}
            aria-label="Enter fullscreen"
            style={{ padding: '6px 10px' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/></svg>
          </BackBtn>
          <BackBtn onClick={() => navigate(`/restaurant/${restaurantId}/dashboard`)}>
            &larr; {t('nav.dashboard', 'Dashboard')}
          </BackBtn>
          <ConnectionStatus>
            <ConnectionDot $connected={connected} />
            {connected ? 'Live' : 'Offline'}
          </ConnectionStatus>
        </HeaderLeft>
        <HeaderRight>
          {/* 로그인 표시 = 사용자 아이콘 + 이름 (클릭 → PIN 전환). 역할 단정 "Cashier:" 라벨 없음
              — 로그인 주체가 관리자/오너일 수 있어 "Cashier" 가 부정확하던 문제. POS Terminal 과 동일. */}
          <StaffInfo type="button" onClick={() => setShowCashierPinModal(true)} title="Logged in — click to switch user">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {user?.name || 'Staff'}
            <span style={{ fontSize: '11px', color: 'var(--pos-text-muted, #8898AA)', marginLeft: '2px' }}>▼</span>
          </StaffInfo>
          <Clock>{clock}</Clock>

          {/* 액션 버튼 순서: [Today's Cash Drawer · Open Drawer](현금 동선 한 묶음) · Daily Settlement · Customer Display.
              2026-07-15 (Irene): 현금 두 버튼이 마감▾·Customer Display 에 밀려 떨어져 있던 걸 인접 배치로 묶음.
              좁은 화면(≤1720px)에선 Cash Drawer/Open Drawer/Customer Display 를 설정(gear) 드롭다운으로 수납한다.
              Daily Settlement 은 마감 핵심 동작이라 좁은 화면에서도 인라인 유지(Irene). */}
          {canOperatePOS && !isNarrow && (
          <>
          <BackBtn type="button" onClick={() => setShowCashDrawer(true)} title="Cash Drawer">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '15px', height: '15px' }}>
              <path d="M2 8h20M2 8l2-4h16l2 4M2 8v10a2 2 0 002 2h16a2 2 0 002-2V8M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t('cash:todayCashDrawer', { defaultValue: "Today's Cash Drawer" })}
          </BackBtn>
          <BackBtn type="button"
            onClick={async () => {
              try {
                const { openCashDrawer } = await import('../../utils/billPrint');
                const ok = await openCashDrawer();
                if (!ok) {
                  setCdInfoModal({ open: true, title: 'Drawer did not open', message: 'Cash drawer pulse needs QZ Tray or RawBT (not Browser print mode).\nCheck Settings → Workstations → Method.' });
                }
              } catch (e: any) {
                setCdInfoModal({ open: true, title: 'Drawer error', message: e?.message || 'Unknown error' });
              }
            }}
            title="Send open-drawer pulse to the active workstation's bill printer"
          >
            Open Drawer
          </BackBtn>
          </>
          )}
          {/* 2026-06-28 (Irene): Daily/Final 따로 였던 걸 "마감 ▾" 하나로 통합 + Staff Meal 추가.
              Daily/Final 은 이 화면의 기존 모달 재사용(시재 FinalSettlementModal 보존). */}
          {canOperatePOS && (
            <SettlementMenu onDaily={() => setShowSettlement(true)} onFinal={() => setShowFinalSettlement(true)} />
          )}
          {canOperatePOS && !isNarrow && (
              <BackBtn type="button"
                onClick={async () => {
                  const result = await openCustomerDisplay(restaurantId || '');
                  bumpCdMirror();
                  if (result.title && result.message) {
                    setCdInfoModal({ open: true, title: result.title, message: result.message });
                  }
                }}
                title={isAutoOpenEnabled() ? 'Customer Display (auto-open enabled)' : 'Open Customer Display on secondary monitor'}
              >
                {isAutoOpenEnabled() && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--pos-brand, #635BFF)', display: 'inline-block' }} />}
                Customer Display
              </BackBtn>
          )}

          {/* 보기 색상 토글 (밝게/고대비/어둡게) — 항상 표시, 기기별 기억. */}
          <div role="group" aria-label="Display theme" style={{
            display: 'inline-flex', gap: 2, borderRadius: 8, padding: 3,
            background: 'var(--pos-surface-2, var(--pos-surface-2, #EDF1F5))', border: '1px solid var(--pos-border, var(--pos-border, #C7CED6))'
          }}>
            {POS_THEME_MODES.map(m => {
              const label = t(`pos:terminal.theme${m.charAt(0).toUpperCase()}${m.slice(1)}`,
                { defaultValue: { light: 'Light', contrast: 'High Contrast', dark: 'Dark' }[m] });
              return (
              <button key={m} type="button"
                onClick={() => selectPosTheme(m)}
                aria-pressed={posTheme === m}
                title={label as string}
                style={{
                  minWidth: isNarrow ? 30 : 40, height: 30, padding: isNarrow ? '0 6px' : '0 10px', fontSize: 12, fontWeight: 600,
                  border: 'none', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap',
                  background: posTheme === m ? 'var(--pos-brand, var(--pos-brand, #635BFF))' : 'transparent',
                  color: posTheme === m ? '#FFFFFF' : 'var(--pos-text-muted, var(--pos-text-muted, #4B5563))',
                }}
              >{isNarrow ? (label as string).charAt(0) : label}</button>
              );
            })}
          </div>

          {/* 서빙 ready 알림음 토글(스피커) — 설정 기어 앞. 서빙(홀) 직원이 음식 준비완료를
              소리로 인지. 실제 소리는 아이템보기에서 access_serving 직원에게만 울린다(ItemListView). */}
          <button
            type="button"
            onClick={() => setReadyAudio(v => { const n = !v; try { localStorage.setItem('fp_ready_audio', n ? '1' : '0'); } catch {} return n; })}
            title={readyAudio ? 'Ready alert sound: ON' : 'Ready alert sound: OFF'}
            aria-label="Toggle ready alert sound"
            style={{ width: 38, height: 38, borderRadius: 8, border: '1px solid var(--pos-border, #C7CED6)', background: 'var(--pos-surface, #fff)', color: readyAudio ? 'var(--pos-brand, #635BFF)' : 'var(--pos-text-muted, #8898AA)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            {readyAudio ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            )}
          </button>

          {/* 설정(gear) — Edit Layout 의 단일 거처(메뉴 어디에도 없어 혼란이라 여기로 모음).
              좁은 화면에선 Customer Display/Open Drawer 두 개도 함께 수납(Daily Settlement 은 인라인 유지). */}
          {(() => {
            const gearItems: OverflowMenuItem[] = [];
            if (isNarrow && canOperatePOS) {
              // 좁은 화면(≤1720): Daily Settlement 만 인라인 유지(Irene), 나머지 카운터 액션은 gear 수납.
              // 현금 동선 한 묶음: Today's Cash Drawer 바로 뒤에 Open Drawer (2026-07-15 Irene).
              gearItems.push({ id: 'cash-drawer', label: t('cash:todayCashDrawer', { defaultValue: "Today's Cash Drawer" }) as string, onClick: () => setShowCashDrawer(true) });
              gearItems.push({
                id: 'open-drawer', label: 'Open Drawer',
                onClick: async () => {
                  try {
                    const { openCashDrawer } = await import('../../utils/billPrint');
                    const ok = await openCashDrawer();
                    if (!ok) setCdInfoModal({ open: true, title: 'Drawer did not open', message: 'Cash drawer pulse needs QZ Tray or RawBT (not Browser print mode).\nCheck Settings → Workstations → Method.' });
                  } catch (e: any) {
                    setCdInfoModal({ open: true, title: 'Drawer error', message: e?.message || 'Unknown error' });
                  }
                }
              });
              gearItems.push({ id: 'final-settlement', label: t('cash:finalSettlement', { defaultValue: 'Final Settlement' }) as string, onClick: () => setShowFinalSettlement(true) });
              gearItems.push({
                id: 'customer-display', label: 'Customer Display', indicator: isAutoOpenEnabled(),
                onClick: async () => {
                  const result = await openCustomerDisplay(restaurantId || '');
                  bumpCdMirror();
                  if (result.title && result.message) setCdInfoModal({ open: true, title: result.title, message: result.message });
                }
              });
            }
            if (user?.role === 'Restaurant Admin') {
              gearItems.push({
                id: 'edit-layout', label: 'Edit Layout',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                  </svg>
                ),
                onClick: () => navigate(`/restaurant/${restaurantId}/floor-plan-editor`)
              });
            }
            if (gearItems.length === 0) return null;
            return (
              <OverflowMenu
                ariaLabel="Floor plan settings"
                triggerTitle="Settings"
                triggerSize={38}
                triggerIcon={(
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                )}
                items={gearItems}
              />
            );
          })()}
        </HeaderRight>
      </Header>
      )}

      {/* Single chip bar — zones on the left, view-mode chips on the right.
          - Zone chips (existing) switch the floor canvas filter.
          - "Takeaway · N" chip switches the main view to a takeaway-orders card grid
            (no separate page — same layout slot as the floor canvas).
          - "+ Walk-in" chip is the quick action: navigates to POS Terminal in takeaway mode
            with `from=floor-plan` so its Back button returns here. */}
      {((floorPlan.zones || []).length > 1 || true) && (
        <ZoneFilterBar>
          {/* Zone chips highlight only while in floor view. In takeaway view the active chip is the
              Takeaway pill — having both lit simultaneously implies a filter that doesn't actually apply. */}
          {/* All Zones 칩 — 존이 2개 이상일 때만(존 1개면 그 존 칩 하나로 충분, 중복 제거). */}
          {(floorPlan.zones || []).length > 1 && (
          <ZoneChip
            type="button"
            active={activeView === 'floor' && activeZoneFilter === 'all'}
            onClick={() => setActiveZoneFilter('all')}
          >
            All Zones <ZoneChipCount>{floorPlan.tables.length}</ZoneChipCount>
          </ZoneChip>
          )}
          {(floorPlan.zones || []).slice().sort((a, b) => a.sort_order - b.sort_order).map(zone => {
            const groupIds = (floorPlan.table_groups || []).filter(g => g.zone_id === zone.id).map(g => g.id);
            const count = floorPlan.tables.filter(t => t.group_id && groupIds.includes(t.group_id)).length;
            return (
              <ZoneChip
                key={zone.id}
                type="button"
                active={activeView === 'floor' && activeZoneFilter === zone.id}
                onClick={() => setActiveZoneFilter(zone.id)}
              >
                {zone.name} <ZoneChipCount>{count}</ZoneChipCount>
              </ZoneChip>
            );
          })}
          {/* 뷰 칩 순서: 테이블맵(존) → Takeout(주문, 테이블맵과 연계) → Items → Walk-in. */}
          <ChipSeparator />
          {/* Takeout 뷰 — off-table 주문(테이크아웃/픽업/배달). 테이블맵 바로 뒤. */}
          <ZoneChip
            type="button"
            active={activeView === 'takeaway'}
            onClick={() => {
              setActiveView(activeView === 'takeaway' ? 'floor' : 'takeaway');
              setSelectedTableId(null);
            }}
            title={t('floorplan:floorPlanPage.offTableHint', { defaultValue: 'Takeaway / pickup / delivery orders' })}
          >
            {t('floorplan:floorPlanPage.offTableView', { defaultValue: 'Takeout' })}
            <ZoneChipCount>{takeawayOrders.length}</ZoneChipCount>
          </ZoneChip>
          {/* Items 뷰 — 아이템별 서빙 리스트(홀 직원) */}
          <ZoneChip
            type="button"
            active={activeView === 'items'}
            onClick={() => { setActiveView('items'); setSelectedTableId(null); }}
            title={t('floorplan:floorPlanPage.itemsViewHint', 'Item-by-item serving list')}
          >
            {t('floorplan:floorPlanPage.itemsView', 'Items')}
            <ZoneChipCount>{itemViewActiveCount}</ZoneChipCount>
          </ZoneChip>
          <ZoneChip
            type="button"
            active={false}
            onClick={() => handleNewOrder({ takeaway: true, walkIn: true })}
            title={t('floorplan:floorPlanPage.takeawayWalkInHint', 'Start a new walk-in takeaway order')}
            style={{ color: 'var(--pos-brand, #635BFF)', borderColor: 'var(--pos-brand, #635BFF)' }}
          >
            {t('floorplan:floorPlanPage.takeawayWalkIn', '+ Walk-in')}
          </ZoneChip>
          <ZoneChip
            type="button"
            active={false}
            onClick={() => { setGalleryOpen(true); refreshMenuPhotos(); }}
            title={t('floorplan:menuPhotos.openHint', 'Browse menu photos')}
          >
            {t('floorplan:menuPhotos.open', 'Menu Photos')}
          </ZoneChip>
          {aiServeEnabled && (
            <ZoneChip
              type="button"
              active={false}
              onClick={() => setServeCamOpen(true)}
              disabled={typeof navigator !== 'undefined' && navigator.onLine === false}
              title={t('floorplan:aiServe.openHint', 'AI camera serving')}
            >
              {t('floorplan:aiServe.open', 'Serve Cam')}
            </ZoneChip>
          )}
          {/* 2026-06-28 (5-1): exit-fullscreen lives in the zone bar (always visible) since the
              header — which holds the enter-fullscreen control — is hidden in fullscreen mode. */}
          {fullscreen && (
            <ZoneChip
              type="button"
              active={false}
              onClick={toggleFullscreen}
              title={t('floorplan:floorPlanPage.exitFullscreen', 'Exit fullscreen')}
              style={{ marginLeft: 'auto' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: 6 }}><path d="M4 14h6v6m10-10h-6V4M14 10l7-7M3 21l7-7"/></svg>
              {t('floorplan:floorPlanPage.exitFullscreen', 'Exit fullscreen')}
            </ZoneChip>
          )}
        </ZoneFilterBar>
      )}

      <MenuPhotoGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} maps={photoMaps} currency={currency}
        restaurantId={restaurantId ? Number(restaurantId) : null}
        canManageRefs={aiServeEnabled && (user?.role === 'Restaurant Admin' || user?.role === 'System Admin')} />

      {serveCamOpen && restaurantId && (
        <AIServeCameraOverlay
          open={serveCamOpen}
          onClose={() => setServeCamOpen(false)}
          restaurantId={Number(restaurantId)}
          productLookup={productLookup}
          onServe={handleServeItem}
        />
      )}

      {/* 범례는 Irene 가 직접 추가 예정 — 제거 (#3 점 기능은 TableNode 빨강 점으로 유지) */}

      <MainContent>
        {/* Items 뷰는 바닥 전체를 회색으로(흰 카드 또렷) — 박스가 아니라 풀 배경. */}
        <CanvasWrapper $tight={activeView === 'floor'} style={(activeView === 'items' || activeView === 'takeaway') ? { background: 'var(--pos-menu-bg, #E4E9EF)' } : undefined}>
          {activeView === 'items' ? (
            <ItemListView
              dineInOrders={applyServeOverrides(Object.entries(tableStatuses).flatMap(([fpti, o]: [string, any]) => {
                // 한 테이블에 주문 여러 개면 전부(orders[]) 펼쳐 표시 — KDS 와 동일 커버리지. 라벨(U-1)로 통일.
                const tbl = (floorPlan?.tables || []).find((tt: any) => tt.id === fpti);
                const label = tbl?.label;
                const list = (Array.isArray(o.orders) && o.orders.length) ? o.orders : [o];
                return list.map((ord: any) => (label ? { ...ord, tableLabel: label } : ord));
              }))}
              takeawayOrders={applyServeOverrides(takeawayOrders)}
              activeOrderId={selectedTakeawayOrderId ?? selectedStatusInfo?.orderId ?? null}
              categoryByName={itemMeta.catByName}
              stationById={itemMeta.stationById}
              categories={itemMeta.categories}
              stations={itemMeta.stations}
              timezone={timezone}
              prepMinutes={Number(operationSettings?.defaultPreparationTime) || 15}
              prepTracking={!!operationSettings?.prepTimeTracking}
              prepPerItem={Number(operationSettings?.defaultPreparationTimePerItem) || 10}
              prepThreshold={Number(operationSettings?.prepUrgentThreshold) || 80}
              audioEnabled={(((operationSettings as any)?.orderSounds?.itemReady?.enabled ?? (operationSettings as any)?.orderSounds?.floorPlanReady?.enabled) !== false) && readyAudio}
              soundType={(operationSettings as any)?.orderSounds?.itemReady?.type || (operationSettings as any)?.orderSounds?.floorPlanReady?.type || 'triple'}
              onServe={handleServeItem}
              onOpenDineIn={handleOpenDineInFromItems}
              onOpenTakeaway={handleOpenTakeawayFromItems}
              productLookup={productLookup}
            />
          ) : activeView === 'floor' ? (
            <FloorPlanCanvas
              floorPlan={filteredFloorPlan}
              tableStatuses={canvasTableStatuses}
              onTableClick={handleTableClick}
              onTableMouseDown={(_e, id) => startTablePress(id)}
              onTableTouchStart={(_e, id) => startTablePress(id)}
              selectedTableId={selectedTableId}
              currency={currency}
            />
          ) : (
            // Takeaway view — card grid using the same look as table cards (white pill + status border).
            // Clicking a card sets selectedTakeawayOrderId, opening the right-side OrderDetailModal —
            // the same component LiveOrders uses, so all actions (status change, payment, cancel) work.
            <div style={{
              flex: 1, overflow: 'auto', padding: '4px 0'
            }}>
              {/* 검색 + 필터 한 줄 — 아이템리스트와 동일. 검색(넓게) + 타입(2개 이상일 때) + 정렬. */}
              <div style={{ display: 'flex', gap: 8, padding: '0 2px 8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  type="text"
                  value={offTableSearch}
                  onChange={e => setOffTableSearch(e.target.value)}
                  placeholder={t('floorplan:floorPlanPage.offTableSearch', { defaultValue: 'Search order #, customer, item' })}
                  style={{
                    flex: '2 1 160px', minWidth: 140, height: 40, boxSizing: 'border-box', borderRadius: 8,
                    border: '1px solid var(--pos-border, #C7CED6)', background: 'var(--pos-surface, #fff)',
                    color: 'var(--pos-text, #0A2540)', fontSize: 14, padding: '0 14px', fontFamily: 'inherit'
                  }}
                />
                {enabledOffTableTypes.length > 1 && (
                  <div style={{ flex: '1 1 120px', minWidth: 110 }}>
                    <SearchableSelect
                      allowClear={false}
                      value={offTableFilter === 'all' ? null : offTableFilter}
                      onChange={v => setOffTableFilter((v as any) || 'all')}
                      placeholder={t('floorplan:floorPlanPage.type_all', { defaultValue: 'All types' })}
                      options={[
                        { value: 'all', label: t('floorplan:floorPlanPage.type_all', { defaultValue: 'All types' }) },
                        ...enabledOffTableTypes.map(ft => ({ value: ft, label: `${t(`floorplan:floorPlanPage.type_${ft}`, { defaultValue: ft })}${takeawayOrders.filter(o => normOffTableType(o) === ft).length ? ` (${takeawayOrders.filter(o => normOffTableType(o) === ft).length})` : ''}` }))
                      ]}
                    />
                  </div>
                )}
                <div style={{ flex: '1 1 120px', minWidth: 110 }}>
                  <SearchableSelect
                    allowClear={false}
                    value={offTableSort === 'time' ? null : offTableSort}
                    onChange={v => setOffTableSort((v as any) || 'time')}
                    placeholder={t('floorplan:floorPlanPage.sortTime', { defaultValue: 'Sort: Order time' })}
                    options={[
                      { value: 'time', label: t('floorplan:floorPlanPage.sortTime', { defaultValue: 'Sort: Order time' }) },
                      { value: 'amount', label: t('floorplan:floorPlanPage.sortAmount', { defaultValue: 'Sort: Amount' }) },
                    ]}
                  />
                </div>
              </div>
              {takeawayLoading && takeawayOrders.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--pos-text-muted, #4B5563)' }}>
                  {t('floorplan:floorPlanPage.loading', 'Loading takeaway orders...')}
                </div>
              ) : takeawayOrders.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: 'var(--pos-text-muted, #4B5563)' }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--pos-text, #0A2540)', marginBottom: 6 }}>
                    {t('floorplan:floorPlanPage.noTakeaway', 'No active takeaway orders')}
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 16 }}>
                    {t('floorplan:floorPlanPage.noTakeawayHint', 'Start a walk-in takeaway order from the button above.')}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNewOrder({ takeaway: true })}
                    style={{
                      background: 'var(--pos-brand, #635BFF)', color: 'white', border: 0, borderRadius: 6,
                      padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    {t('floorplan:floorPlanPage.startTakeawayCta', '+ Start Takeaway Order')}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {displayedOffTableOrders.length === 0 && (
                    <div style={{ padding: 24, textAlign: 'center', fontSize: 12, color: 'var(--pos-text-muted, #8898AA)' }}>
                      {t('floorplan:floorPlanPage.noTypeOrders', { defaultValue: 'No {{type}} orders right now', type: t(`floorplan:floorPlanPage.type_${offTableFilter}`, { defaultValue: offTableFilter }) })}
                    </div>
                  )}
                  {displayedOffTableOrders.map((o: any) => {
                    const id = o.id;
                    const isSelected = selectedTakeawayOrderId === id;
                    const oType = normOffTableType(o);
                    const tc = getOrderTypeColors(oType);
                    const typeMeta = { label: t(`floorplan:floorPlanPage.type_${oType}`, { defaultValue: oType }), bg: tc.bg, text: tc.text, border: tc.border };
                    const status = (o.status || 'pending').toString();
                    const paymentStatus = (o.payment_status || o.paymentStatus || '').toString();
                    // Single source of status palette — same `ORDER_STATUS_COLORS` that TableNode uses
                    // on the floor canvas. Cards match table colors on the same screen so the user's
                    // mental model is consistent (pending=yellow, preparing=purple, ready=green, etc.).
                    const palette = getTableNodeStatusColors(status); // 솔리드(amber/purple/green/gray)
                    const orderNum = o.order_number || o.orderNumber || `#${id}`;
                    const itemCount = (o.order_items || o.orderItems || []).reduce((s: number, it: any) => s + (parseInt(it.quantity, 10) || 1), 0);
                    const total = parseFloat(o.final_price || o.total_amount || o.total || 0).toFixed(2);
                    // 리스트에서 바로 파악할 핵심정보: 고객/픽업번호/시각/품목 미리보기
                    const customerName = o.customer_name || o.customerName || '';
                    const pickupNo = o.pickup_number || o.pickupNumber || '';
                    const _items = (o.order_items || o.orderItems || []);
                    const itemPreview = _items.slice(0, 3).map((it: any) => `${it.quantity || 1}×${it.name || it.menuItem?.name || ''}`.trim()).filter(Boolean).join(', ');
                    const _created = o.createdAt || o.order_date || o.created_at;
                    let timeStr = '';
                    try { timeStr = _created ? new Date(_created).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', timeZone }) : ''; } catch { timeStr = ''; }
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSelectedTakeawayOrderId(selectedTakeawayOrderId === id ? null : id)}
                        style={{
                          // 좌측 6px 솔리드 단계색 라인 = 항상(선택/해제 무관) 표시. border 단축속성과
                          // 충돌 안 나게 longhand 로 지정(좌측 라인 사라짐 방지).
                          // 선택 = 같은 솔리드색 '바깥' halo(2px) → 좌측 라인 안 가리고, 글자 밀림 0.
                          // 표면색 유지 → 고대비·다크 가독성.
                          textAlign: 'left', width: '100%', background: 'var(--pos-surface, #FFFFFF)',
                          borderTop: '1px solid var(--pos-border, #E6EBF1)',
                          borderRight: '1px solid var(--pos-border, #E6EBF1)',
                          borderBottom: '1px solid var(--pos-border, #E6EBF1)',
                          borderLeft: `6px solid ${palette.bg}`,
                          borderRadius: 8, padding: '14px 16px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 14, transition: 'box-shadow 0.12s',
                          // 선택 = '안쪽' inset 링(스크롤 컨테이너에 안 잘림). 좌측 라인 안 가리고 글자 밀림 0.
                          boxShadow: isSelected ? `inset 0 0 0 2px ${palette.bg}` : '0 1px 3px rgba(10,37,64,0.06)'
                        }}
                      >
                        {/* 주문번호 + 픽업 + 시각 */}
                        <div style={{ minWidth: 104, flexShrink: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--pos-text, #0A2540)' }}>{orderNum}{pickupNo ? ` · #${pickupNo}` : ''}</div>
                          {timeStr && <div style={{ fontSize: 11, color: 'var(--pos-text-muted, #8898AA)' }}>{timeStr}</div>}
                        </div>
                        {/* 주문타입 배지 (Takeaway/Pickup/Delivery) */}
                        <div style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3px', color: typeMeta.text, background: typeMeta.bg, border: `1px solid ${typeMeta.border}`, borderRadius: 6, padding: '2px 7px' }}>{typeMeta.label}</div>
                        {/* 테이블 번호 칩 — 테이블에 붙은 takeaway 는 그 테이블로 갖다줘야 하므로 번호 표시(2026-06-11 Irene) */}
                        {(o.table_number || o.tableNumber) && (
                          <div style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3px', color: 'var(--pos-text, #0A2540)', background: 'var(--pos-surface-alt, #EEF2F7)', border: '1px solid var(--pos-border, #D5DEE8)', borderRadius: 6, padding: '2px 7px' }}>
                            {t('floorplan:floorPlanPage.tableChip', { defaultValue: 'Table {{n}}', n: o.table_number || o.tableNumber })}
                          </div>
                        )}
                        {/* 상태 배지 */}
                        <div style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: palette.text, background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 999, padding: '2px 8px' }}>{status}</div>
                        {/* 고객 + 픽업시간/배달존 + 품목 미리보기 (가변) */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {customerName && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--pos-text, #0A2540)' }}>{customerName} · </span>}
                          {(() => {
                            if (oType === 'pickup' && o.scheduled_pickup_time) {
                              let pt = ''; try { pt = new Date(o.scheduled_pickup_time).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', timeZone }); } catch { pt = ''; }
                              return pt ? <span style={{ fontSize: 11, fontWeight: 700, color: '#2563EB' }}>{t('floorplan:floorPlanPage.pickupAt', { defaultValue: 'Pickup {{t}}', t: pt })} · </span> : null;
                            }
                            if (oType === 'delivery') {
                              let di: any = o.delivery_info; if (typeof di === 'string') { try { di = JSON.parse(di); } catch { di = null; } }
                              const where = di && (di.zone || di.address || di.city);
                              return where ? <span style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED' }}>{String(where).slice(0, 28)} · </span> : null;
                            }
                            return null;
                          })()}
                          <span style={{ fontSize: 12, color: 'var(--pos-text-muted, #4B5563)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{itemPreview || `${itemCount} items`}</span>
                        </div>
                        {/* 금액 + 결제 */}
                        <div style={{ flexShrink: 0, textAlign: 'right' }}>
                          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--pos-text, #0A2540)' }}>{currency}{total}</div>
                          <div style={{ fontSize: 10, fontWeight: 600, color: paymentStatus === 'paid' ? '#10B981' : '#F59E0B' }}>
                            {paymentStatus === 'paid' ? t('floorplan:floorPlanPage.paid', 'Paid') : t('floorplan:floorPlanPage.unpaid', 'Unpaid')}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </CanvasWrapper>

        {selectedTable && (
          <TableDetailPanel
            tableNumber={selectedTable}
            statusInfo={selectedStatusInfo}
            reservationInfo={selectedReservation}
            tableInfo={selectedTableInfo}
            currency={currency}
            timezone={timezone}
            restaurantId={Number(restaurantId)}
            productLookup={productLookup}
            expanded={detailExpanded}
            onToggleExpand={() => setDetailExpanded(v => !v)}
            onClose={() => { setSelectedTableId(null); setDetailExpanded(false); }}
            onNewOrder={handleNewOrder}
            onStatusChange={handleStatusChange}
            onPayment={handlePayment}
            onNavigateToPOS={handleNavigateToPOS}
            onOrderUpdated={fetchStatuses}
            onClearTable={handleClearTable}
            onClearAllCompleted={handleClearAllCompleted}
            onMoveTable={handleOpenMove}
            orders={selectedOrders}
            selectedOrderIndex={safeOrderIndex}
            onOrderIndexChange={setSelectedOrderIndex}
            showOrderTabs={showOrderTabs}
            tableFree={!selectedTableData}
            qrMode={qrMode}
            floorPlan={floorPlan}
            onKitchenTicketSent={setMovePrintPrompt}
            canOperatePOS={canOperatePOS}
            canTakePayment={canTakePayment}
            canVoid={canVoid}
          />
        )}

        {/* Takeaway order panel — reuses TableDetailPanel with tableNumber=null. Same component,
            same status-based action buttons (Confirm/Ready/Served/Payment/Cancel), same money breakdown.
            Adapter below maps a takeaway order to TableStatusInfo shape so the panel renders identically. */}
        {(activeView === 'takeaway' || activeView === 'items') && selectedTakeawayOrderId != null && (() => {
          const o: any = takeawayOrders.find((x: any) => x.id === selectedTakeawayOrderId);
          if (!o) return null;
          const num = (v: any) => parseFloat(v) || 0;
          const items: any[] = (() => {
            const raw = o.order_items || o.orderItems || [];
            try { return typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { return []; }
          })();
          const orderTime = o.createdAt || o.created_at;
          const elapsedMin = orderTime ? Math.max(0, Math.round((Date.now() - new Date(orderTime).getTime()) / 60000)) : 0;
          const adapted: any = {
            tableNumber: '',
            status: (o.status === 'cancelled' || o.status === 'completed') ? o.status : 'occupied',
            orderCount: 1,
            totalAmount: num(o.final_price ?? o.total_amount ?? o.total),
            elapsedMinutes: elapsedMin,
            orderId: o.id,
            orderNumber: o.order_number || o.orderNumber,
            customerName: o.customer_name,
            customerId: o.customer_id ?? null,
            paymentStatus: o.payment_status || o.paymentStatus,
            guestCount: null,
            orderItems: items,
            subtotal: num(o.subtotal),
            tax: num(o.tax),
            serviceCharge: num(o.service_charge),
            discount: num(o.discount) + num(o.coupon_discount) + num(o.discount_policy_amount) + num(o.point_discount),
            cashierName: o.cashier_name ?? null,
            orderStatus: o.status,
            couponCode: o.coupon_code ?? null,
            couponDiscount: num(o.coupon_discount),
            discountPolicyName: o.discount_policy_name ?? null,
            discountPolicyAmount: num(o.discount_policy_amount),
            pointDiscount: num(o.point_discount),
            pointsUsed: o.points_used ?? 0,
            paymentMethod: o.payment_method ?? null,
            cardType: o.card_type ?? null,
            orderSource: o.source,
            customerPhone: o.customer_phone ?? null,
            serviceChargeRate: num(o.service_charge_rate),
            taxRate: num(o.tax_rate),
            orderCreatedAt: orderTime,
            updatedAt: o.updatedAt || o.updated_at || null, // item 5 stale-write guard
            notes: o.notes ?? null,
            orderType: normOffTableType(o) || 'takeaway',
            scheduledPickupTime: o.scheduled_pickup_time ?? null,
            deliveryInfo: (() => { let di: any = o.delivery_info; if (typeof di === 'string') { try { di = JSON.parse(di); } catch { di = null; } } return di || null; })(),
            paymentProof: o.payment_proof ?? null,
          };
          return (
            <TableDetailPanel
              tableNumber={null}
              statusInfo={adapted}
              tableInfo={undefined}
              currency={currency}
              timezone={timezone}
              restaurantId={Number(restaurantId)}
              productLookup={productLookup}
              expanded={detailExpanded}
              onToggleExpand={() => setDetailExpanded(v => !v)}
              onClose={() => { setSelectedTakeawayOrderId(null); setDetailExpanded(false); }}
              onNewOrder={() => handleNewOrder({ takeaway: true })}
              onStatusChange={async (orderId, newStatus) => {
                await handleStatusChange(orderId, newStatus);
                fetchTakeawayOrders();
              }}
              onPayment={() => {
                // Pre-fill selected takeaway as the payment target — reuses table payment modal
                handleTakeawayPayment(o);
              }}
              onNavigateToPOS={() => navigate(`/restaurant/${restaurantId}/pos-terminal?order=${o.id}&from=floor-plan`)}
              onOrderUpdated={fetchTakeawayOrders}
              onClearTable={async () => { /* no-op for takeaway */ }}
              orders={[]}
              floorPlan={floorPlan}
              onKitchenTicketSent={setMovePrintPrompt}
            canOperatePOS={canOperatePOS}
            canTakePayment={canTakePayment}
            canVoid={canVoid}
            />
          );
        })()}

      </MainContent>

      {/* 2026-06-26 (item 10): serving-only staff (!canTakePayment) don't deal with
          revenue/occupancy stats — hide the bar so it doesn't eat ~2 rows of their
          table view. Payment-capable roles still see it. */}
      {canTakePayment && !fullscreen && (
        <FloorPlanStatsBar
          tables={filteredFloorPlan.tables}
          tableStatuses={effectiveTableStatuses}
          currency={currency}
          restaurantId={Number(restaurantId)}
        />
      )}

      {/* Customer Display 안내 모달 (POS Terminal 과 동일 패턴) */}
      {cdInfoModal.open && (
        <CommonModal
          isOpen={cdInfoModal.open}
          onClose={() => setCdInfoModal({ open: false, title: '', message: '' })}
          title={cdInfoModal.title}
        >
          <div style={{ padding: 24, whiteSpace: 'pre-line', color: 'var(--pos-text, #0A2540)', lineHeight: 1.6 }}>
            {cdInfoModal.message}
          </div>
        </CommonModal>
      )}

      {/* Payment Modal for takeaway — same UI as dine-in, just sourced from a takeaway order */}
      {paymentTakeawayOrderId && (() => {
        const o: any = takeawayOrders.find((x: any) => x.id === paymentTakeawayOrderId);
        if (!o) return null;
        const num = (v: any) => parseFloat(v) || 0;
        const items: any[] = (() => {
          const raw = o.order_items || o.orderItems || [];
          try { return typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { return []; }
        })();
        return (
          <PaymentModal
            isOpen={true}
            onClose={() => setPaymentTakeawayOrderId(null)}
            total={num(o.final_price ?? o.total_amount ?? o.total)}
            subtotal={num(o.subtotal)}
            tax={num(o.tax)}
            serviceCharge={num(o.service_charge)}
            takeawayCharge={num(o.takeaway_charge)}
            discountAmount={num(o.discount) + num(o.coupon_discount) + num(o.discount_policy_amount) + num(o.point_discount)}
            couponDiscount={num(o.coupon_discount)}
            discountPolicyAmount={num(o.discount_policy_amount)}
            pointDiscount={num(o.point_discount)}
            onConfirmPayment={handlePaymentConfirm}
            paymentMethods={paymentMethods}
            customerId={o.customer_id || undefined}
            restaurantId={Number(restaurantId)}
            membershipSettings={membershipSettings}
            orderId={Number(o.id)}
            orderItems={items}
            existingAmountPaid={num(o.amount_paid)}
            onPartialPaymentComplete={(_p, remaining) => {
              if (remaining <= 0.005) {
                setPaymentTakeawayOrderId(null);
                fetchTakeawayOrders();
              }
            }}
          />
        );
      })()}

      {/* Payment Modal — Live Orders 와 동일 컴포넌트 + 동일 데이터(풀 주문). 통일(2026-05-29):
          orderForPayment(GET /orders/:id, snake_case) 우선, fetch 실패 시 selectedStatusInfo(table-status) 폴백.
          이로써 서비스차지/세율/쿠폰/포인트/할인이 Live Orders 와 100% 동일하게 표시된다. */}
      {showPaymentModal && (selectedStatusInfo || orderForPayment) && (() => {
        const pf: any = orderForPayment;        // 풀 주문(snake_case) — 우선
        const si: any = selectedStatusInfo || {}; // table-status(camelCase) — 폴백
        const closeModal = () => { setShowPaymentModal(false); setOrderForPayment(null); };
        const pfItems = (() => {
          if (!pf) return Array.isArray(si.orderItems) ? si.orderItems : [];
          const raw = pf.order_items;
          if (Array.isArray(raw)) return raw;
          if (typeof raw === 'string') { try { return JSON.parse(raw); } catch { return []; } }
          return [];
        })();
        return (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={closeModal}
            total={pf ? Number(pf.total_amount || 0) : Number(si.totalAmount || 0)}
            subtotal={pf ? Number(pf.subtotal || pf.total_amount || 0) : Number(si.subtotal || si.totalAmount || 0)}
            tax={pf ? Number(pf.tax || 0) : Number(si.tax || 0)}
            serviceCharge={pf ? Number(pf.service_charge || 0) : Number(si.serviceCharge || 0)}
            serviceChargeRate={pf ? Number(pf.service_charge_rate || 10) : Number(si.serviceChargeRate || 10)}
            taxRate={pf ? Number(pf.tax_rate || 6) : Number(si.taxRate || 6)}
            takeawayCharge={pf ? Number(pf.takeaway_charge || 0) : Number(si.takeawayCharge || 0)}
            discountAmount={pf ? Number(pf.discount || 0) : Number(si.discount || 0)}
            couponDiscount={pf ? Number(pf.coupon_discount || 0) : Number(si.couponDiscount || 0)}
            discountPolicyAmount={pf ? Number(pf.discount_policy_amount || 0) : Number(si.discountPolicyAmount || 0)}
            pointDiscount={pf ? Number(pf.point_discount || 0) : Number(si.pointDiscount || 0)}
            onConfirmPayment={handlePaymentConfirm}
            paymentMethods={paymentMethods}
            customerId={(pf ? pf.customer_id : si.customerId) || undefined}
            restaurantId={Number(restaurantId)}
            membershipSettings={membershipSettings}
            // Split bill (Phase 2)
            orderId={(pf ? pf.id : si.orderId) ? Number(pf ? pf.id : si.orderId) : undefined}
            orderItems={pfItems}
            existingAmountPaid={pf ? Number(pf.amount_paid || 0) : Number(si.amountPaid || 0)}
            onPartialPaymentComplete={(_p, remaining) => {
              if (remaining <= 0.005) {
                closeModal();
              }
              // 새로 결제된 row 반영 — 다음 mergeable / table status refresh
              // (FloorPlan socket 으로 자동 — 별도 fetch 불필요)
            }}
          />
        );
      })()}

      {/* POS Terminal overlay — for New Order only */}
      <POSOverlay $isOpen={showPOS}>
        <POSOverlayHeader>
          <POSOverlayTitle>
            POS Terminal — {posUrl.includes('order_type=takeaway') ? 'Walk-in Takeaway' : `Table ${selectedTable}`}
          </POSOverlayTitle>
          <POSOverlayCloseBtn onClick={handleClosePOS}>
            &times; Close
          </POSOverlayCloseBtn>
        </POSOverlayHeader>
        {showPOS && posUrl && (
          <POSIframe
            src={posUrl}
            title="POS Terminal"
          />
        )}
      </POSOverlay>

      <DailySettlementPrint
        isOpen={showSettlement}
        onClose={() => setShowSettlement(false)}
      />
      <CashDrawerModal restaurantId={user?.restaurantId || restaurantId} isOpen={showCashDrawer} onClose={() => setShowCashDrawer(false)} />
      <FinalReconcilePanel isOpen={showFinalSettlement} onClose={() => setShowFinalSettlement(false)} />

      {/* 예약 임박 테이블 워크인 주문 경고 (매니저 강행 허용) */}
      {reserveWarn && (
        <CommonModal isOpen onClose={() => setReserveWarn(null)} title={t('floorplan:reserveWarn.title', { defaultValue: 'Table reserved soon' })} size="small">
          <div style={{ padding: 2 }}>
            <p style={{ margin: '0 0 14px', fontSize: 14, color: '#0A2540', lineHeight: 1.6 }}>
              {t('floorplan:reserveWarn.body', {
                defaultValue: 'This table has a reservation at {{time}} for {{guest}}. Start a walk-in order anyway?',
                time: (() => { try { return formatDateTime(reserveWarn.reservation.reserved_at, operationSettings, { hour: '2-digit', minute: '2-digit' }); } catch { return ''; } })(),
                guest: reserveWarn.reservation.guest_name || '-'
              })}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" onClick={() => setReserveWarn(null)}
                style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #E6EBF1', background: '#fff', color: '#6B7C93', fontWeight: 600, cursor: 'pointer' }}>
                {t('floorplan:reserveWarn.keep', { defaultValue: 'Keep reserved' })}
              </button>
              <button type="button" onClick={() => { const o = reserveWarn.opts; setReserveWarn(null); handleNewOrder({ ...(o || {}), override: true }); }}
                style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: '#F59E0B', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {t('floorplan:reserveWarn.proceed', { defaultValue: 'Order anyway' })}
              </button>
            </div>
          </div>
        </CommonModal>
      )}

      {/* ── Table Move picker ───────────────────────────────────────────────
          Pick a destination table for the order being moved. Occupied tables are
          marked; choosing one routes through doMove (which prompts merge/cancel
          if the server reports it's occupied). Touch-first: large tap targets. */}
      {moveCtx && (
        <CommonModal
          isOpen={!!moveCtx}
          onClose={() => { if (!moveBusy) { setMoveCtx(null); setMoveOccupied(null); } }}
          title={t('floorplan:moveTable.title', { defaultValue: 'Move Table' })}
          size="medium"
        >
          {moveOccupied ? (
            // Destination occupied → merge or cancel
            <div style={{ padding: '4px 2px' }}>
              {/* Amber warning box — destination is OCCUPIED. Combining is
                  irreversible, so make that unmistakable (Irene: prompt clearer). */}
              <div style={{ background: '#FFF7ED', border: '1px solid #F59E0B', borderRadius: 10, padding: '14px 16px', marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#B45309', marginBottom: 6 }}>
                  {t('floorplan:moveTable.occupiedTitle', { defaultValue: 'Table {{table}} is already in use', table: moveOccupied.destTable })}
                </div>
                <div style={{ fontSize: 13, color: 'var(--pos-text, #0A2540)', lineHeight: 1.6 }}>
                  {t('floorplan:moveTable.occupiedBody', {
                    defaultValue: 'It has an open order (#{{num}}) with {{count}} item(s), total {{total}}. Moving here will MERGE this order into that bill — the two cannot be separated afterwards.',
                    num: moveOccupied.dest?.orderNumber || moveOccupied.dest?.orderId,
                    count: moveOccupied.dest?.itemCount ?? 0,
                    total: `${currency || 'MYR'} ${Number(moveOccupied.dest?.total_amount || 0).toFixed(2)}`
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setMoveOccupied(null)}
                  disabled={moveBusy}
                  style={{ padding: '11px 18px', borderRadius: 8, border: '1px solid #E6EBF1', background: 'var(--pos-surface, #FFFFFF)', color: 'var(--pos-text, #0A2540)', fontWeight: 600, cursor: 'pointer', minHeight: 44 }}
                >
                  {t('floorplan:moveTable.pickAnother', { defaultValue: 'No, pick another table' })}
                </button>
                <button
                  type="button"
                  onClick={() => doMove(moveOccupied.destTable, moveOccupied.destFpti, 'merge')}
                  disabled={moveBusy}
                  style={{ padding: '11px 18px', borderRadius: 8, border: 'none', background: '#F59E0B', color: 'var(--pos-surface, #FFFFFF)', fontWeight: 700, cursor: 'pointer', minHeight: 44 }}
                >
                  {moveBusy ? '…' : t('floorplan:moveTable.combineConfirm', { defaultValue: 'Yes, merge into one bill' })}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding: '2px' }}>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: '#6B7C93' }}>
                {t('floorplan:moveTable.pickDestination', { defaultValue: 'Choose the table to move this order to.' })}
              </p>
              <input
                type="text"
                value={moveSearch}
                onChange={(e) => setMoveSearch(e.target.value)}
                placeholder={t('floorplan:moveTable.searchPlaceholder', { defaultValue: 'Search table…' })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #E6EBF1', fontSize: 14, marginBottom: 12 }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 8, maxHeight: 320, overflowY: 'auto' }}>
                {(floorPlan.tables || [])
                  .filter(tb => String(tb.id) !== String(selectedTableId))
                  // Only real tables are valid move destinations — exclude fixtures
                  // (counter / entrance / kitchen / wall / door …) which have a
                  // non-'table' tableType. A fixture is never an order destination.
                  .filter(tb => !tb.tableType || tb.tableType === 'table')
                  .filter(tb => {
                    const q = moveSearch.trim().toLowerCase();
                    if (!q) return true;
                    return String(tb.label || '').toLowerCase().includes(q) || String(tb.tableNumber || '').toLowerCase().includes(q);
                  })
                  .map(tb => {
                    const st = effectiveTableStatuses[tb.id] || effectiveTableStatuses[tb.label] || effectiveTableStatuses[tb.tableNumber];
                    const occupied = st && st.status && st.status !== 'available';
                    return (
                      <button
                        key={tb.id}
                        type="button"
                        disabled={moveBusy}
                        onClick={() => doMove(tb.label, tb.id, 'block')}
                        title={occupied ? t('floorplan:moveTable.occupied', { defaultValue: 'Occupied' }) : ''}
                        style={{
                          padding: '14px 6px', borderRadius: 8, cursor: 'pointer',
                          border: occupied ? '1px solid #F59E0B' : '1px solid #E6EBF1',
                          background: occupied ? '#FFF7ED' : 'var(--pos-surface, #FFFFFF)',
                          color: 'var(--pos-text, #0A2540)', fontWeight: 600, fontSize: 14, minHeight: 56,
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
                        }}
                      >
                        <span>{tb.label}</span>
                        {occupied && <span style={{ fontSize: 10, color: '#B45309', fontWeight: 500 }}>{t('floorplan:moveTable.occupied', { defaultValue: 'Occupied' })}</span>}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </CommonModal>
      )}

      {/* 수동발행 — 이동 재발행 station별 미리보기 + 보내기/안보내기 (자동발행 OFF일 때) */}
      <KitchenTicketSendModal prompt={movePrintPrompt} onClose={() => setMovePrintPrompt(null)} t={t} />

      {/* 스탭 PIN 로그인 전환 (POS Terminal 과 동일 동작) */}
      <CashierPinModal
        show={showCashierPinModal}
        onClose={() => setShowCashierPinModal(false)}
        onVerified={(result) => {
          if (result.token && result.user) {
            switchUser(result.token, result.user);
          }
          setShowCashierPinModal(false);
        }}
        onLogout={() => { logout(); }}
        currentCashierName={user?.name}
      />
    </PageContainer>
  );
};

// 공용 실시간 주문 스토어로 감싼 진입점 — 페이지 내부는 useOrdersRealtime() 으로 소비.
const FloorPlanPageWithRealtime: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  return (
    <OrdersRealtimeProvider restaurantId={restaurantId}>
      <FloorPlanPage />
    </OrdersRealtimeProvider>
  );
};

export default FloorPlanPageWithRealtime;
