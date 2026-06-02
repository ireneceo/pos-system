import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { PosDisplayThemeStyle, getPosTheme, setPosTheme, POS_THEME_MODES, PosThemeMode } from '../../styles/posDisplayTheme';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FloorPlanData, DEFAULT_FLOOR_PLAN, TableStatusInfo, ORDER_STATUS_COLORS } from './types';
import { calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import FloorPlanCanvas from './FloorPlanCanvas';
import TableDetailPanel from './TableDetailPanel';
import FloorPlanStatsBar from './FloorPlanStatsBar';
import PaymentModal from '../../components/POSTerminal/PaymentModal';
import { Modal as CommonModal } from '../../components/UI';
import KitchenTicketSendModal, { previewStationBuckets, KitchenTicketSendPrompt } from '../../components/Print/KitchenTicketSendModal';
import OverflowMenu, { OverflowMenuItem } from '../../components/UI/OverflowMenu';
import CashierPinModal from '../../components/POSTerminal/CashierPinModal';
// timezone.ts (POS·TableDetailPanel 과 동일): 2번째 인자 = operationSettings 객체.
// dateFormat.ts 는 2번째 인자가 timeZone "문자열" 이라, 객체를 넘기면 resolveTz 가
// 객체.trim() 호출로 크래시("e.trim is not a function") → 반드시 timezone 에서 import.
import { formatDateTime } from '../../utils/timezone';
import { getRestaurantTimezone } from '../../utils/timezone';
import DailySettlementPrint from '../Reports/DailySettlementPrint';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { useStore } from '../../contexts/StoreContext';
import { useAutoPrintPoller } from '../../hooks/useAutoPrintPoller';
import { openCustomerDisplay, isAutoOpenEnabled } from '../../utils/customerDisplay';

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
  transition: all 0.15s;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover { background: ${p => p.active ? '#514DD6' : 'var(--pos-surface-2, #F5F7FA)'}; }
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
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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

const CanvasWrapper = styled.div`
  flex: 1;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  /* 맵 주위 회색(페이지 배경 비침) 제거 — 캔버스와 같은 면색으로 */
  background: var(--pos-surface, #FFFFFF);

  @media (max-width: 768px) {
    padding: 6px 8px;
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
  const { user, switchUser, logout } = useAuth();
  const { getStoreInfo, operationSettings } = useStore();

  // 2026-05-28 매장 critical: backend-driven auto-print polling (fullscreen page,
  // MainLayout 안 mount). 매장 device 가 FloorPlan 켜둔 상태에서 모바일/POS
  // 주문 발생 시 polling 으로 catch + 인쇄 + PATCH.
  useAutoPrintPoller({ restaurantId: user?.restaurantId, enabled: !!user?.restaurantId, getStoreInfo });

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
  // 스탭 PIN 로그인 전환 (POS Terminal 과 동일 — switchUser/logout).
  const [showCashierPinModal, setShowCashierPinModal] = useState(false);
  // 좁은 화면(≤1280px, 10인치 단말)에서 Daily Settlement/Customer Display/Open Drawer 를
  // 설정(gear) 드롭다운으로 수납. CSS 미디어와 충돌 없게 JS 로 단일 판정.
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1280px)');
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
  const activeView: 'floor' | 'takeaway' = searchParams.get('view') === 'takeaway' ? 'takeaway' : 'floor';
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
  const setActiveView = useCallback((view: 'floor' | 'takeaway') => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (view === 'takeaway') next.set('view', 'takeaway');
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
  const [takeawayOrders, setTakeawayOrders] = useState<any[]>([]);
  const [takeawayLoading, setTakeawayLoading] = useState(false);

  // Filtered floor plan — tables restricted to selected zone.
  const filteredFloorPlan = useMemo<FloorPlanData>(() => {
    if (activeZoneFilter === 'all' || !floorPlan.zones || floorPlan.zones.length <= 1) return floorPlan;
    const groupIdsInZone = new Set((floorPlan.table_groups || []).filter(g => g.zone_id === activeZoneFilter).map(g => g.id));
    return {
      ...floorPlan,
      tables: floorPlan.tables.filter(t => t.group_id && groupIdsInZone.has(t.group_id))
    };
  }, [floorPlan, activeZoneFilter]);
  const [tableStatuses, setTableStatuses] = useState<Record<string, TableStatusInfo>>({});
  // 오늘 per-table 이력(완료 포함) — 우측 패널 탭 소스. 보드 점유(tableStatuses)와 분리.
  const [tableHistory, setTableHistory] = useState<Record<string, TableStatusInfo[]>>({});
  const [connected, setConnected] = useState(false);
  const [clock, setClock] = useState('');
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('');
  const [timezone, setTimezone] = useState('Asia/Kuala_Lumpur');
  const [qrMode, setQrMode] = useState<'static' | 'session'>('static');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef<any>(null);
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

  // Daily Settlement
  const [showSettlement, setShowSettlement] = useState(false);
  const [cdInfoModal, setCdInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });

  // POS overlay (for New Order only)
  const [showPOS, setShowPOS] = useState(false);
  const [posUrl, setPosUrl] = useState('');

  // Items added alert (like LiveOrders)
  const [itemsAddedAlert, setItemsAddedAlert] = useState<{
    isVisible: boolean;
    orderId: number | null;
    orderNumber: string;
    tableNumber: string | null;
    orderGroup: number;
    itemCount: number;
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

  // Fetch table statuses
  const fetchStatuses = useCallback(async () => {
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/restaurants/${restaurantId}/table-status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTableStatuses(data.data || {});
        setTableHistory(data.history || {});
      }
    } catch (err) {
      console.error('Failed to fetch table statuses:', err);
    }
  }, [restaurantId]);

  // Fetch active takeaway orders for the "Today" period — same boundary the dine-in canvas
  // uses (see backend /table-status which filters createdAt to today in restaurant timezone).
  // Floor Plan is an operational "today's work" screen, so takeaway must match that scope —
  // not all-time history. Older orders live in Live Orders with its date filter.
  const fetchTakeawayOrders = useCallback(async () => {
    if (!restaurantId) return;
    try {
      setTakeawayLoading(true);
      const token = getAuthToken();
      const range = calculatePeriodDateRange('today', timezone);
      const params = new URLSearchParams({
        page: '1', limit: '200', includeCompleted: 'true', order_type: 'takeaway'
      });
      if (range.start) params.append('startDate', range.start);
      if (range.end) params.append('endDate', range.end);
      const res = await fetch(`/api/orders/restaurant/${restaurantId}?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // API returns `data.data`. We belt-and-suspenders filter for `order_type=takeaway` in
        // case the server doesn't honour that param, and drop cancelled rows so the screen matches
        // the dine-in canvas behaviour (cancelled orders never count as active work).
        const list = Array.isArray(data.data) ? data.data : [];
        const taList = list.filter((o: any) => {
          const ot = (o.order_type || o.orderType || '').toString().replace(/[_\s]/g, '').toLowerCase();
          if (ot !== 'takeaway') return false;
          if ((o.status || '').toString() === 'cancelled') return false;
          return true;
        });
        setTakeawayOrders(taList);
      }
    } catch (err) {
      console.error('Failed to fetch takeaway orders:', err);
    } finally {
      setTakeawayLoading(false);
    }
  }, [restaurantId, timezone]);

  // Initial takeaway fetch + refresh when entering the view + light polling while the view is open.
  useEffect(() => {
    fetchTakeawayOrders();
  }, [fetchTakeawayOrders]);
  useEffect(() => {
    if (activeView !== 'takeaway') return;
    fetchTakeawayOrders();
    const id = setInterval(fetchTakeawayOrders, 15000);
    return () => clearInterval(id);
  }, [activeView, fetchTakeawayOrders]);

  const debouncedFetch = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchStatuses(), 2000);
  }, [fetchStatuses]);

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
        }
        if (restaurant.operation_settings) {
          const opSettings = typeof restaurant.operation_settings === 'string'
            ? JSON.parse(restaurant.operation_settings)
            : restaurant.operation_settings;
          setTimezone(getRestaurantTimezone(opSettings));
        }
        // Payment methods from restaurant settings (like LiveOrders)
        if (restaurant.payment_settings) {
          setPaymentMethods(restaurant.payment_settings);
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
    fetchStatuses();
  }, [restaurantId, fetchStatuses]);

  // Socket.IO for real-time updates
  useEffect(() => {
    if (!restaurantId) return;

    const socket = io('/orders', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10
    });

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join-restaurant', restaurantId);
      fetchStatuses();
    });

    socket.on('disconnect', () => setConnected(false));
    socket.on('order-updated', () => debouncedFetch());
    socket.on('order-created', () => debouncedFetch());
    socket.on('order-items-added', (data: {
      orderId: number;
      orderNumber: string;
      tableNumber: string | null;
      orderGroup: number;
      addedItems: any[];
      itemCount: number;
    }) => {
      debouncedFetch();
      setItemsAddedAlert({
        isVisible: true,
        orderId: data.orderId,
        orderNumber: data.orderNumber,
        tableNumber: data.tableNumber,
        orderGroup: data.orderGroup,
        itemCount: data.itemCount
      });
    });
    socket.on('new-order', () => debouncedFetch());

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [restaurantId, fetchStatuses, debouncedFetch]);

  // Checkout Display 소켓 (고객 화면 연동)
  useEffect(() => {
    if (!restaurantId) return;
    const cs = io('/checkout-display', { transports: ['websocket', 'polling'] });
    cs.on('connect', () => cs.emit('join-restaurant', restaurantId));
    cs.on('customer-checkin', (data: any) => {
      // 고객 체크인 수신 — 필요시 처리
    });
    checkoutSocketRef.current = cs;
    return () => { cs.disconnect(); checkoutSocketRef.current = null; };
  }, [restaurantId]);

  // Polling fallback (30s)
  useEffect(() => {
    const id = setInterval(() => fetchStatuses(), 30000);
    return () => clearInterval(id);
  }, [fetchStatuses]);

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
  }, [selectedTableId, selectedOrderIndex, tableStatuses, restaurantId, currency, floorPlan]);

  // Listen for POS complete message from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'pos-order-complete' || event.data?.type === 'pos-close') {
        setShowPOS(false);
        setPosUrl('');
        fetchStatuses();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [fetchStatuses]);

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

  // [POS Overlay pattern — SINGLE entry point for any POS launch from Floor Plan]
  // All POS Terminal launches from Floor Plan must go through this function and the <POSOverlay> iframe below.
  // Do NOT add `navigate('/pos-terminal?...')` direct routes from this page — the black bar header
  // (POSOverlayHeader with × Close) is the only close path, and Floor Plan state (zone filter, statuses,
  // socket subscription) is preserved by staying in this route.
  // Add new launch types here as new opts keys; do not split into separate functions.
  const handleNewOrder = (opts?: { takeaway?: boolean; mergeOrderId?: number }) => {
    const params = new URLSearchParams();
    // Add Items (#7) — 기존 주문에 머지(새 주문 생성 방지). POS 가 forceMergeIntoOrderId 로 합친다.
    if (opts?.mergeOrderId) params.set('mergeOrderId', String(opts.mergeOrderId));
    // 2026-05-27: takeaway from a selected table pins to that table's bill
    // (e.g. a guest at T20 wants a coffee to go — staff still wants it on the
    // T20 ticket). Walk-in takeaway (no selected table) stays counter-pickup.
    if (opts?.takeaway) {
      params.set('order_type', 'takeaway');
      if (selectedTable && selectedTableId) {
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
    cardType?: string
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
        card_type: method === 'card' ? (cardType || null) : null
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
            tableNumber: destTable || ord.table_number || undefined,
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
          // 확정 스펙 v2 (2026-06-02): 이동도 주방이 무조건 알아야 함 → 자동발행과 무관하게
          // 항상 재발행 + 알림형 팝업([재발송][닫기]). 묻지 않음.
          doReissue();
          setMovePrintPrompt({
            run: doReissue,
            ticketType: _moveNotice.title,
            description: onOccupied === 'merge' ? '머지 — 이전 티켓들 버리고 이 티켓 사용 (발송됨)' : '테이블 이동 — 이전 티켓 버리고 이 티켓 사용 (발송됨)',
            stations: previewStationBuckets(printed, printSettings),
          });
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
    ? (tableStatuses[selectedTableId] || (selectedTable ? tableStatuses[selectedTable] : undefined))
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
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#92400E' }}>{t('floorplan:floorPlanPage.newItemsAdded')}</div>
            <button onClick={() => setItemsAddedAlert(null)} style={{
              background: 'none', border: 'none', fontSize: '20px',
              cursor: 'pointer', color: '#92400E', padding: '0', lineHeight: 1
            }}>&times;</button>
          </div>
          <div style={{ color: '#78350F', fontSize: '14px', marginBottom: '12px' }}>
            <strong>Order {itemsAddedAlert.orderNumber}</strong>
            {itemsAddedAlert.tableNumber && ` (Table ${itemsAddedAlert.tableNumber})`}
            <br />
            <span style={{ background: '#FCD34D', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
              +Order {itemsAddedAlert.orderGroup}
            </span>
            {' '}{itemsAddedAlert.itemCount} item{itemsAddedAlert.itemCount > 1 ? 's' : ''} added
          </div>
          <button onClick={() => {
            if (itemsAddedAlert.tableNumber) {
              // socket payload only carries tableNumber today — best-effort
              // resolve to a Floor Plan v2 table id (first matching zone).
              const match = floorPlan?.tables.find(t => t.tableNumber === itemsAddedAlert.tableNumber);
              if (match) setSelectedTableId(match.id);
            }
            setItemsAddedAlert(null);
          }} style={{
            width: '100%', padding: '10px', background: '#F59E0B', color: 'white',
            border: 'none', borderRadius: '8px', fontWeight: 600,
            cursor: 'pointer', fontSize: '14px'
          }}>{t('floorplan:floorPlanPage.viewTable')}</button>
        </div>
      )}

      <Header>
        <HeaderLeft>
          <HeaderTitle>{t('floorplan:floorPlanPage.floorPlan')}</HeaderTitle>
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

          {/* 액션 버튼 순서: Daily Settlement(항상 인라인) · Customer Display · Open Drawer.
              좁은 화면(≤1280px, 10인치 단말)에선 Customer Display/Open Drawer 만 설정(gear)
              드롭다운으로 수납한다. Daily Settlement 은 마감 핵심 동작이라 좁은 화면에서도 인라인 유지(Irene). */}
          <BackBtn type="button" onClick={() => setShowSettlement(true)} title="Daily Settlement">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '15px', height: '15px' }}>
              <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Daily Settlement
          </BackBtn>
          {!isNarrow && (
            <>
              <BackBtn type="button"
                onClick={async () => {
                  const result = await openCustomerDisplay(restaurantId || '');
                  if (result.title && result.message) {
                    setCdInfoModal({ open: true, title: result.title, message: result.message });
                  }
                }}
                title={isAutoOpenEnabled() ? 'Customer Display (auto-open enabled)' : 'Open Customer Display on secondary monitor'}
              >
                {isAutoOpenEnabled() && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--pos-brand, #635BFF)', display: 'inline-block' }} />}
                Customer Display
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
                title={label}
                style={{
                  minWidth: 40, height: 30, padding: '0 10px', fontSize: 12, fontWeight: 600,
                  border: 'none', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap',
                  background: posTheme === m ? 'var(--pos-brand, var(--pos-brand, #635BFF))' : 'transparent',
                  color: posTheme === m ? '#FFFFFF' : 'var(--pos-text-muted, var(--pos-text-muted, #4B5563))',
                }}
              >{label}</button>
              );
            })}
          </div>

          {/* 설정(gear) — Edit Layout 의 단일 거처(메뉴 어디에도 없어 혼란이라 여기로 모음).
              좁은 화면에선 Customer Display/Open Drawer 두 개도 함께 수납(Daily Settlement 은 인라인 유지). */}
          {(() => {
            const gearItems: OverflowMenuItem[] = [];
            if (isNarrow) {
              // Daily Settlement 은 항상 인라인 → 드롭다운엔 Customer Display/Open Drawer 만 수납.
              gearItems.push({
                id: 'customer-display', label: 'Customer Display', indicator: isAutoOpenEnabled(),
                onClick: async () => {
                  const result = await openCustomerDisplay(restaurantId || '');
                  if (result.title && result.message) setCdInfoModal({ open: true, title: result.title, message: result.message });
                }
              });
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
          <ZoneChip
            type="button"
            active={activeView === 'floor' && activeZoneFilter === 'all'}
            onClick={() => setActiveZoneFilter('all')}
          >
            All Zones <ZoneChipCount>{floorPlan.tables.length}</ZoneChipCount>
          </ZoneChip>
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
          {/* Takeaway view chip + Walk-in CTA — same row, separator visually parts them from zone chips */}
          <ChipSeparator />
          <ZoneChip
            type="button"
            active={activeView === 'takeaway'}
            onClick={() => {
              setActiveView(activeView === 'takeaway' ? 'floor' : 'takeaway');
              setSelectedTableId(null);
            }}
            title={t('floorplan:floorPlanPage.takeawayViewHint', 'View active takeaway orders')}
          >
            {t('floorplan:floorPlanPage.takeawayView', 'Takeaway')}
            <ZoneChipCount>{takeawayOrders.length}</ZoneChipCount>
          </ZoneChip>
          <ZoneChip
            type="button"
            active={false}
            onClick={() => handleNewOrder({ takeaway: true })}
            title={t('floorplan:floorPlanPage.takeawayWalkInHint', 'Start a new walk-in takeaway order')}
            style={{ color: 'var(--pos-brand, #635BFF)', borderColor: 'var(--pos-brand, #635BFF)' }}
          >
            {t('floorplan:floorPlanPage.takeawayWalkIn', '+ Walk-in')}
          </ZoneChip>
        </ZoneFilterBar>
      )}

      {/* 범례는 Irene 가 직접 추가 예정 — 제거 (#3 점 기능은 TableNode 빨강 점으로 유지) */}

      <MainContent>
        <CanvasWrapper>
          {activeView === 'floor' ? (
            <FloorPlanCanvas
              floorPlan={filteredFloorPlan}
              tableStatuses={tableStatuses}
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
                  {takeawayOrders.map((o: any) => {
                    const id = o.id;
                    const isSelected = selectedTakeawayOrderId === id;
                    const status = (o.status || 'pending').toString();
                    const paymentStatus = (o.payment_status || o.paymentStatus || '').toString();
                    // Single source of status palette — same `ORDER_STATUS_COLORS` that TableNode uses
                    // on the floor canvas. Cards match table colors on the same screen so the user's
                    // mental model is consistent (pending=yellow, preparing=purple, ready=green, etc.).
                    const palette = ORDER_STATUS_COLORS[status] || ORDER_STATUS_COLORS.pending;
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
                          textAlign: 'left', width: '100%', background: isSelected ? 'var(--pos-brand-tint, #F0EFFF)' : 'var(--pos-surface, #FFFFFF)',
                          border: `1px solid ${isSelected ? 'var(--pos-brand, #635BFF)' : '#E6EBF1'}`,
                          borderLeft: `4px solid ${palette.border}`,
                          borderRadius: 8, padding: '8px 12px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.12s'
                        }}
                      >
                        {/* 주문번호 + 픽업 + 시각 */}
                        <div style={{ minWidth: 96, flexShrink: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--pos-text, #0A2540)' }}>{orderNum}{pickupNo ? ` · #${pickupNo}` : ''}</div>
                          {timeStr && <div style={{ fontSize: 11, color: 'var(--pos-text-muted, #8898AA)' }}>{timeStr}</div>}
                        </div>
                        {/* 상태 배지 */}
                        <div style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: palette.text, background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 999, padding: '2px 8px' }}>{status}</div>
                        {/* 고객 + 품목 미리보기 (가변) */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {customerName && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--pos-text, #0A2540)' }}>{customerName} · </span>}
                          <span style={{ fontSize: 12, color: 'var(--pos-text-muted, #4B5563)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{itemPreview || `${itemCount} items`}</span>
                        </div>
                        {/* 금액 + 결제 */}
                        <div style={{ flexShrink: 0, textAlign: 'right' }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--pos-text, #0A2540)' }}>{currency}{total}</div>
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
            tableInfo={selectedTableInfo}
            currency={currency}
            timezone={timezone}
            restaurantId={Number(restaurantId)}
            onClose={() => setSelectedTableId(null)}
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
          />
        )}

        {/* Takeaway order panel — reuses TableDetailPanel with tableNumber=null. Same component,
            same status-based action buttons (Confirm/Ready/Served/Payment/Cancel), same money breakdown.
            Adapter below maps a takeaway order to TableStatusInfo shape so the panel renders identically. */}
        {activeView === 'takeaway' && selectedTakeawayOrderId != null && (() => {
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
            notes: o.notes ?? null,
            orderType: 'takeaway',
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
              onClose={() => setSelectedTakeawayOrderId(null)}
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
            />
          );
        })()}

      </MainContent>

      <FloorPlanStatsBar
        tables={filteredFloorPlan.tables}
        tableStatuses={tableStatuses}
        currency={currency}
        restaurantId={Number(restaurantId)}
      />

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
                  .filter(tb => {
                    const q = moveSearch.trim().toLowerCase();
                    if (!q) return true;
                    return String(tb.label || '').toLowerCase().includes(q) || String(tb.tableNumber || '').toLowerCase().includes(q);
                  })
                  .map(tb => {
                    const st = tableStatuses[tb.id] || tableStatuses[tb.label] || tableStatuses[tb.tableNumber];
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

export default FloorPlanPage;
