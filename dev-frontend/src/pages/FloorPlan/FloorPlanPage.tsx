import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FloorPlanData, DEFAULT_FLOOR_PLAN, TableStatusInfo, ORDER_STATUS_COLORS } from './types';
import { calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import FloorPlanCanvas from './FloorPlanCanvas';
import TableDetailPanel from './TableDetailPanel';
import FloorPlanStatsBar from './FloorPlanStatsBar';
import PaymentModal from '../../components/POSTerminal/PaymentModal';
import { Modal as CommonModal } from '../../components/UI';
import { getRestaurantTimezone } from '../../utils/timezone';
import DailySettlementPrint from '../Reports/DailySettlementPrint';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
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
  background: #FAFBFC;
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
  background: #E6EBF1;
  margin: 0 4px;
`;

const ZoneFilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #fff;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;

  @media (max-width: 768px) {
    padding: 10px 16px;
  }
`;
const ZoneChip = styled.button<{ active: boolean }>`
  background: ${p => p.active ? '#635BFF' : '#fff'};
  color: ${p => p.active ? '#fff' : '#6B7C93'};
  border: 1px solid ${p => p.active ? '#635BFF' : '#E6EBF1'};
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover { background: ${p => p.active ? '#514DD6' : '#F5F7FA'}; }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }
`;
const ZoneChipCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  opacity: 0.75;
`;

const Header = styled.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
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
  color: #0A2540;
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
  color: #6B7C93;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Clock = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`;

const EditBtn = styled.button`
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  background: white;
  color: #374151;

  &:hover {
    background: #F3F4F6;
    border-color: #D1D9E0;
  }
`;

const BackBtn = styled.button`
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  background: white;
  color: #374151;

  &:hover {
    background: #F3F4F6;
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
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const LoadingScreen = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`;

// POS Terminal fullscreen overlay (for New Order only)
const POSOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${p => p.$isOpen ? 'flex' : 'none'};
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: white;
  flex-direction: column;
`;

const POSOverlayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
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
  const { user } = useAuth();

  // Prefetch is intentionally disabled here. Initial implementation triggered
  // POS Terminal chunk download during Floor Plan idle, but the observed effect
  // was the opposite of what we wanted — concurrent download + parse while the
  // user was still interacting with Floor Plan slowed the perceived navigation
  // time. POS Terminal's own mount cost (16 API calls, ~4s) dominates, so
  // prefetching the chunk produces no measurable win and adds CPU pressure.
  // Future fix: deduplicate the POS Terminal mount fetches first, then revisit.

  const [floorPlan, setFloorPlan] = useState<FloorPlanData>(DEFAULT_FLOOR_PLAN);
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
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);

  // Payment modal (like LiveOrders)
  const [showPaymentModal, setShowPaymentModal] = useState(false);
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

  // Clock (restaurant timezone)
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit',
        timeZone: timezone
      }));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [timezone]);

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

  // Table click → toggle detail panel
  const handleTableClick = (tableNumber: string) => {
    setSelectedTable(prev => prev === tableNumber ? null : tableNumber);
    setSelectedOrderIndex(0);
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
  const handleNewOrder = (opts?: { takeaway?: boolean }) => {
    const params = new URLSearchParams();
    if (opts?.takeaway) {
      params.set('order_type', 'takeaway');
    } else {
      if (!selectedTable) return;
      params.set('table', selectedTable);
    }
    params.set('from', 'floor-plan-overlay');
    setPosUrl(`/restaurant/${restaurantId}/pos-terminal?${params.toString()}`);
    setShowPOS(true);
  };

  // Payment → PaymentModal (like LiveOrders)
  const handlePayment = () => {
    setShowPaymentModal(true);

    // Checkout Display에 주문 내역 전송
    if (checkoutSocketRef.current && selectedTable) {
      const statusInfo = tableStatuses[selectedTable];
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
      if (!selectedTable) return;
      const statusInfo = tableStatuses[selectedTable];
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
      const dineInStatusInfo = !paymentTakeawayOrderId && selectedTable ? tableStatuses[selectedTable] : null;
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
      }
    } catch (err) {
      console.error('Failed to process payment:', err);
    }
  };

  // Clear table — completed 주문의 table_number를 null로 설정하여 테이블 비움
  const handleClearTable = async (orderId: number) => {
    try {
      const token = getAuthToken();
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ table_number: null })
      });
      setSelectedTable(null);
      await fetchStatuses();
    } catch (err) {
      console.error('Failed to clear table:', err);
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
          body: JSON.stringify({ table_number: null })
        })
      ));
      setSelectedTable(null);
      await fetchStatuses();
    } catch (err) {
      console.error('Failed to clear table:', err);
    }
  };

  // Navigate to POS Terminal (full page)
  const handleNavigateToPOS = () => {
    if (selectedTable) {
      navigate(`/restaurant/${restaurantId}/pos-terminal?table=${selectedTable}&from=floor-plan`);
    }
  };

  // Close POS overlay
  const handleClosePOS = () => {
    setShowPOS(false);
    setPosUrl('');
    fetchStatuses();
  };

  // Derived data for detail panel — multi-order support
  const selectedTableData = selectedTable ? tableStatuses[selectedTable] : undefined;
  const selectedOrders = selectedTableData?.orders || (selectedTableData ? [selectedTableData] : []);
  // Clamp index to valid range
  const safeOrderIndex = Math.min(selectedOrderIndex, Math.max(selectedOrders.length - 1, 0));
  const selectedStatusInfo = selectedOrders.length > 0 ? selectedOrders[safeOrderIndex] : selectedTableData;
  const selectedTableInfo = selectedTable
    ? floorPlan.tables.find(t => t.tableNumber === selectedTable)
    : undefined;

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
    <PageContainer>
      {/* Items Added Alert — same as LiveOrders */}
      {itemsAddedAlert?.isVisible && (
        <div style={{
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
              setSelectedTable(itemsAddedAlert.tableNumber);
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
          <Clock>{clock}</Clock>
          <button
            type="button"
            onClick={async () => {
              const result = await openCustomerDisplay(restaurantId || '');
              if (result.title && result.message) {
                setCdInfoModal({ open: true, title: result.title, message: result.message });
              }
            }}
            title={isAutoOpenEnabled() ? 'Customer Display (auto-open enabled)' : 'Open Customer Display on secondary monitor'}
            style={{
              padding: '6px 12px', fontSize: 12, fontWeight: 500,
              border: '1px solid #E6EBF1', borderRadius: 6,
              background: isAutoOpenEnabled() ? '#F0EFFF' : '#F6F9FC',
              color: isAutoOpenEnabled() ? '#635BFF' : '#6B7C93',
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 4
            }}
          >
            {isAutoOpenEnabled() && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#635BFF', display: 'inline-block' }} />}
            Customer Display
          </button>
          <EditBtn onClick={() => setShowSettlement(true)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '14px', verticalAlign: 'middle', marginRight: '4px' }}>
              <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Daily Settlement
          </EditBtn>
          {user?.role === 'Restaurant Admin' && (
            <EditBtn onClick={() => navigate(`/restaurant/${restaurantId}/floor-plan-editor`)}>
              Edit Layout
            </EditBtn>
          )}
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
              setSelectedTable(null);
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
            style={{ color: '#635BFF', borderColor: '#635BFF' }}
          >
            {t('floorplan:floorPlanPage.takeawayWalkIn', '+ Walk-in')}
          </ZoneChip>
        </ZoneFilterBar>
      )}

      <MainContent>
        <CanvasWrapper>
          {activeView === 'floor' ? (
            <FloorPlanCanvas
              floorPlan={filteredFloorPlan}
              tableStatuses={tableStatuses}
              onTableClick={handleTableClick}
              selectedTableId={selectedTable ? floorPlan.tables.find(t => t.tableNumber === selectedTable)?.id : null}
              currency={currency}
            />
          ) : (
            // Takeaway view — card grid using the same look as table cards (white pill + status border).
            // Clicking a card sets selectedTakeawayOrderId, opening the right-side OrderDetailModal —
            // the same component LiveOrders uses, so all actions (status change, payment, cancel) work.
            <div style={{
              flex: 1, overflow: 'auto', padding: 20,
              background: '#FAFBFC', border: '1px solid #E6EBF1', borderRadius: 8
            }}>
              {takeawayLoading && takeawayOrders.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#6B7C93' }}>
                  {t('floorplan:floorPlanPage.loading', 'Loading takeaway orders...')}
                </div>
              ) : takeawayOrders.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#6B7C93' }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#0A2540', marginBottom: 6 }}>
                    {t('floorplan:floorPlanPage.noTakeaway', 'No active takeaway orders')}
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 16 }}>
                    {t('floorplan:floorPlanPage.noTakeawayHint', 'Start a walk-in takeaway order from the button above.')}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNewOrder({ takeaway: true })}
                    style={{
                      background: '#635BFF', color: 'white', border: 0, borderRadius: 6,
                      padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer'
                    }}
                  >
                    {t('floorplan:floorPlanPage.startTakeawayCta', '+ Start Takeaway Order')}
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid', gap: 12,
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))'
                }}>
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
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSelectedTakeawayOrderId(selectedTakeawayOrderId === id ? null : id)}
                        style={{
                          textAlign: 'left', background: palette.bg,
                          border: `2px solid ${isSelected ? '#635BFF' : palette.border}`,
                          borderRadius: 8, padding: '12px 14px', cursor: 'pointer',
                          boxShadow: isSelected ? '0 0 0 3px rgba(99,91,255,0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: palette.text }}>{orderNum}</div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: palette.text, textTransform: 'uppercase' }}>{status}</div>
                        </div>
                        <div style={{ marginTop: 6, fontSize: 12, color: palette.text, opacity: 0.85 }}>
                          {t('floorplan:floorPlanPage.itemsCount', { count: itemCount, defaultValue: '{{count}} items' })} · {currency}{total}
                        </div>
                        <div style={{ marginTop: 4, fontSize: 11, color: palette.text, opacity: 0.75 }}>
                          {paymentStatus === 'paid'
                            ? t('floorplan:floorPlanPage.paid', 'Paid')
                            : t('floorplan:floorPlanPage.unpaid', 'Awaiting payment')}
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
            onClose={() => setSelectedTable(null)}
            onNewOrder={handleNewOrder}
            onStatusChange={handleStatusChange}
            onPayment={handlePayment}
            onNavigateToPOS={handleNavigateToPOS}
            onOrderUpdated={fetchStatuses}
            onClearTable={handleClearTable}
            onClearAllCompleted={handleClearAllCompleted}
            orders={selectedOrders}
            selectedOrderIndex={safeOrderIndex}
            onOrderIndexChange={setSelectedOrderIndex}
            qrMode={qrMode}
            floorPlan={floorPlan}
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
          <div style={{ padding: 24, whiteSpace: 'pre-line', color: '#0A2540', lineHeight: 1.6 }}>
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

      {/* Payment Modal — same as LiveOrders + Split bill (Phase 2) */}
      {showPaymentModal && selectedStatusInfo && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          total={Number(selectedStatusInfo.totalAmount || 0)}
          subtotal={Number(selectedStatusInfo.subtotal || selectedStatusInfo.totalAmount || 0)}
          tax={Number(selectedStatusInfo.tax || 0)}
          serviceCharge={Number(selectedStatusInfo.serviceCharge || 0)}
          takeawayCharge={Number(selectedStatusInfo.takeawayCharge || 0)}
          discountAmount={Number(selectedStatusInfo.discount || 0)}
          couponDiscount={Number(selectedStatusInfo.couponDiscount || 0)}
          discountPolicyAmount={Number((selectedStatusInfo as any).discountPolicyAmount || 0)}
          pointDiscount={Number((selectedStatusInfo as any).pointDiscount || 0)}
          onConfirmPayment={handlePaymentConfirm}
          paymentMethods={paymentMethods}
          customerId={selectedStatusInfo.customerId || undefined}
          restaurantId={Number(restaurantId)}
          membershipSettings={membershipSettings}
          // Split bill (Phase 2)
          orderId={selectedStatusInfo.orderId ? Number(selectedStatusInfo.orderId) : undefined}
          orderItems={Array.isArray(selectedStatusInfo.orderItems) ? selectedStatusInfo.orderItems : []}
          existingAmountPaid={Number((selectedStatusInfo as any).amountPaid || 0)}
          onPartialPaymentComplete={(_p, remaining) => {
            if (remaining <= 0.005) {
              setShowPaymentModal(false);
            }
            // 새로 결제된 row 반영 — 다음 mergeable / table status refresh
            // (FloorPlan socket 으로 자동 — 별도 fetch 불필요)
          }}
        />
      )}

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
    </PageContainer>
  );
};

export default FloorPlanPage;
