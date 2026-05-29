import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import io, { Socket } from 'socket.io-client';
import { useAuth } from '../../contexts/AuthContext';
import { useMenu } from '../../contexts/MenuContext';
import { useStore } from '../../contexts/StoreContext';
import PageHeader from '../../components/Common/PageHeader';
import { formatTime } from '../../utils/timezone';
import { printKitchenTicketViaRawBT, getPrinterSettings as getBillPrinterSettings } from '../../utils/billPrint';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import KdsPinGate from './KdsPinGate';
import { useKdsStaff } from './useKdsStaff';
import OrderActionHistory from '../LiveOrders/OrderActionHistory';
// Helper function to format pickup time as range (e.g., "9:00 - 9:30 AM").
// Uses restaurant timezone so the time matches the kitchen's local clock
// regardless of where the browser is opened from.
const formatPickupTimeRange = (dateString: string, timeZone?: string): string => {
  const date = new Date(dateString);
  const endDate = new Date(date.getTime() + 30 * 60 * 1000);
  const opts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone };
  const startStr = date.toLocaleString('en-US', opts); // e.g. "9:00 AM"
  const endStr = endDate.toLocaleString('en-US', opts);
  const startParts = startStr.split(' ');
  const endParts = endStr.split(' ');
  if (startParts.length === 2 && endParts.length === 2 && startParts[1] === endParts[1]) {
    return `${startParts[0]} - ${endParts[0]} ${endParts[1]}`;
  }
  return `${startStr} - ${endStr}`;
};

// ─── Styled Components ────────────────────────────────────────

const Container = styled.div`
  background: #C7CED6;
  min-height: 100vh;
  color: #0A2540;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ContentArea = styled.div`
  padding: 16px 20px;
`;

const HeaderInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 8px;
  justify-content: flex-end;

  @media (max-width: 1180px) {
    gap: 10px;
  }
`;

const Clock = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #4B5563;
`;

const ConnectionStatus = styled.div<{ connected: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.connected ? '#059669' : '#DC2626'};
`;

const ConnectionDot = styled.div<{ connected: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${props => props.connected ? '#059669' : '#DC2626'};
  animation: ${props => props.connected ? 'pulse 2s infinite' : 'none'};

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const KanbanBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: calc(100vh - 140px);

  /* Header wraps below 1180px (PageHeader breakpoint) — relax fixed height. */
  @media (max-width: 1180px) {
    height: calc(100vh - 180px);
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 12px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`;

const ColumnHeader = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: ${props => {
    switch (props.status) {
      case 'pending': return '#FFF7ED';
      case 'preparing': return '#EFF6FF';
      case 'ready': return '#ECFDF5';
      default: return '#F4F6F9';
    }
  }};
  border: 2px solid ${props => {
    switch (props.status) {
      case 'pending': return '#FBBF24';
      case 'preparing': return '#60A5FA';
      case 'ready': return '#34D399';
      default: return '#C7CED6';
    }
  }};
`;

const ColumnTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColumnTitle = styled.h2<{ status?: string }>`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${props => {
    switch (props.status) {
      case 'pending': return '#D97706';
      case 'preparing': return '#2563EB';
      case 'ready': return '#059669';
      default: return '#0A2540';
    }
  }};
`;

const ColumnCount = styled.div<{ color?: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.color || '#0A2540'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CountNumber = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const CountLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  opacity: 0.7;
`;

const OrdersContainer = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #6B7280;
    border-radius: 3px;
  }
`;

const OrderCard = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #C7D2FE;
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const OrderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const OrderNumber = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #4B5563;
`;

const OrderTypeBadge = styled.span<{ variant?: 'takeaway' | 'pickup' | 'delivery' }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => {
    switch (props.variant) {
      case 'pickup': return '#EDE9FE';
      case 'delivery': return '#D1FAE5';
      default: return '#FEF3C7';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'pickup': return '#7C3AED';
      case 'delivery': return '#059669';
      default: return '#D97706';
    }
  }};
`;

const OrderRight = styled.div`
  text-align: right;
  flex-shrink: 0;
`;

const OrderId = styled.div`
  font-size: 11px;
  color: #6B7280;
  font-weight: 500;
`;

const ElapsedTime = styled.div<{ urgent?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.urgent ? '#DC2626' : '#4B5563'};
`;

// ─── Progress Bar ─────────────────────────────────────────────

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: #F1F4F8;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percent: number; color: string }>`
  height: 100%;
  width: ${props => props.percent}%;
  background: ${props => props.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
`;

// ─── Item Styles ──────────────────────────────────────────────

const ItemRow = styled.div<{ done?: boolean }>`
  display: flex;
  align-items: center;
  padding: 5px 8px;
  margin: 0 -8px;
  border-bottom: 1px solid #F4F6F9;
  border-radius: 4px;
  background: ${props => props.done ? '#F1F4F8' : 'transparent'};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.div<{ done?: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.done ? '#6B7280' : '#0A2540'};
`;

const OptionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`;

const OptionTag = styled.span<{ done?: boolean }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.done ? '#C7CED6' : '#EDE9FE'};
  color: ${props => props.done ? '#6B7280' : '#6D28D9'};
`;

const SpecialTag = styled.span<{ done?: boolean }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: ${props => props.done ? '#C7CED6' : '#FEF2F2'};
  color: ${props => props.done ? '#6B7280' : '#DC2626'};
`;

const ItemQty = styled.span<{ highlight?: boolean; done?: boolean }>`
  font-weight: 700;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  ${props => props.highlight ? `
    padding: 1px 7px;
    border-radius: 4px;
    font-size: 14px;
    letter-spacing: 0.5px;
    ${props.done
      ? `background: #C7CED6; color: #6B7280;`
      : `background: #FEF2F2; color: #DC2626;`
    }
  ` : `
    color: inherit;
  `}
`;

const ItemActionButton = styled.button<{ done?: boolean; statusColor?: string }>`
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
  border: 1px solid ${props => props.done ? '#C7CED6' : (props.statusColor || '#10B981')};
  background: ${props => props.done ? '#F1F4F8' : (props.statusColor || '#10B981')};
  color: ${props => props.done ? '#6B7280' : 'white'};

  &:hover {
    ${props => !props.done && `
      opacity: 0.85;
    `}
  }
`;

const SetItemsWrap = styled.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #C7CED6;
`;

const SetItemRow = styled.div<{ done?: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  background: ${props => props.done ? '#F1F4F8' : 'transparent'};
`;

const SetItemName = styled.div<{ done?: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.done ? '#6B7280' : '#0A2540'};
  flex: 1;
`;

// ─── Action Buttons ───────────────────────────────────────────

const ActionRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`;

const solidMap: Record<string, { bg: string; hoverBg: string }> = {
  '#F59E0B': { bg: '#F59E0B', hoverBg: '#D97706' },
  '#3B82F6': { bg: '#3B82F6', hoverBg: '#2563EB' },
  '#10B981': { bg: '#10B981', hoverBg: '#059669' },
};

const pastelMap: Record<string, { bg: string; text: string; hoverBg: string }> = {
  '#F59E0B': { bg: '#FFF7ED', text: '#D97706', hoverBg: '#FEF3C7' },
  '#3B82F6': { bg: '#EFF6FF', text: '#1D4ED8', hoverBg: '#DBEAFE' },
  '#10B981': { bg: '#ECFDF5', text: '#047857', hoverBg: '#D1FAE5' },
};

const ActionBtn = styled.button<{ color: string; solid?: boolean }>`
  flex: 1;
  padding: 8px 12px;
  border: ${props => props.solid ? 'none' : `1px solid ${pastelMap[props.color]?.text || props.color}`};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.solid
    ? (solidMap[props.color]?.bg || props.color)
    : (pastelMap[props.color]?.bg || props.color)};
  color: ${props => props.solid ? '#FFFFFF' : (pastelMap[props.color]?.text || 'white')};

  &:hover {
    background: ${props => props.solid
      ? (solidMap[props.color]?.hoverBg || props.color)
      : (pastelMap[props.color]?.hoverBg || props.color)};
  }
`;

const RevertBtn = styled.button`
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: white;
  color: #4B5563;
  flex-shrink: 0;

  &:hover {
    background: #F4F6F9;
    border-color: #6B7280;
  }
`;

const ItemsContainer = styled.div`
  margin-bottom: 4px;
`;

// ─── Types ────────────────────────────────────────────────────

interface KitchenOrder {
  id: string;
  orderNumber: string;
  pickupNumber: string;
  pagerNumber?: string;
  items: Array<{
    id?: string;
    name: string;
    quantity: number;
    options?: string[];
    special_instructions?: string;
    status?: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
    is_set_menu?: boolean;
    set_items?: Array<{
      id?: string;
      name: string;
      quantity: number;
      status?: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
    }>;
  }>;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
  orderTime: Date;
  paymentStatus?: 'pending' | 'completed';
  customerName?: string;
  tableNumber?: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery' | 'pickup';
  source?: 'pos' | 'mobile' | 'kiosk';
  scheduledPickupTime?: string | null;
}

interface PreparingBatch {
  batchId: string;
  menuName: string;
  formattedName: string;
  itemIds: Set<string>;
}

// ─── View Toggle ─────────────────────────────────────────────

const ViewToggle = styled.div`
  display: flex;
  background: #F1F4F8;
  border-radius: 6px;
  padding: 2px;
`;

const ViewToggleBtn = styled.button<{ active: boolean }>`
  padding: 5px 14px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#0A2540' : '#4B5563'};
  box-shadow: ${props => props.active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'};
  flex-shrink: 0;
  white-space: nowrap;
`;

// ─── Item View Styles ────────────────────────────────────────

const GroupCard = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`;

const GroupMenuName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const GroupOrderList = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 4px;
  line-height: 1.4;
`;


// ─── Component ────────────────────────────────────────────────

// Live clock component (updates every second without triggering parent re-render)
const LiveClock: React.FC<{ operationSettings: any }> = React.memo(({ operationSettings }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <Clock>{formatTime(time, operationSettings)}</Clock>;
});

const KitchenDisplayPage: React.FC = () => {
  const { t } = useTranslation('kitchen');
  const { user } = useAuth();
  const { menuItems, categories } = useMenu();
  const { getStoreInfo, operationSettings: storeOpSettings } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [operationSettings, setOperationSettings] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'order' | 'item'>(() => {
    const saved = localStorage.getItem('kitchenDisplayViewMode');
    return saved === 'item' ? 'item' : 'order';
  });

  const [preparingBatches, setPreparingBatches] = useState<PreparingBatch[]>([]);

  // ─── Sound toggle ───
  const [audioEnabled, setAudioEnabled] = useState(() => localStorage.getItem('sound_enabled') !== 'false');

  // ─── Kitchen Station Filter ───
  const [kitchenStations, setKitchenStations] = useState<Array<{ id: number; name: string; alert_sound?: string }>>([]);
  const urlStationParam = searchParams.get('station');
  const [selectedStation, setSelectedStation] = useState<number | 'all'>('all');
  const urlStationApplied = useRef(false);

  // ─── Item Merge Settings ───
  const [itemMergeSettings, setItemMergeSettings] = useState<{ time_limit: number; max_count: number }>({ time_limit: 0, max_count: 0 });
  // menuName → station_id 매핑 (카테고리 or 프로덕트 기반, 프로덕트 오버라이드 우선)
  const [menuStationMap, setMenuStationMap] = useState<Map<string, number>>(new Map());

  // ─── Shared: raw order_items → KitchenOrder items 변환 ───
  const processRawOrderItems = (orderId: string | number, rawItems: any[]): KitchenOrder['items'] => {
    const items: any[] = [];
    rawItems.forEach((item: any, itemIndex: number) => {
      if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
        const setItems = item.set_items.map((si: any, setIndex: number) => ({
          ...si,
          id: `item-${orderId}-${itemIndex}-set-${setIndex}`,
          name: si.name,
          quantity: si.quantity * (item.quantity || 1),
          status: si.status || 'pending'
        }));
        items.push({
          ...item,
          id: `item-${orderId}-${itemIndex}`,
          name: item.name || item.menuItem?.name || 'Set Menu',
          quantity: item.quantity,
          options: item.options || [],
          special_instructions: item.special_instructions || item.specialInstructions || '',
          status: item.status || 'pending',
          is_set_menu: true,
          set_items: setItems
        });
      } else {
        items.push({
          ...item,
          id: `item-${orderId}-${itemIndex}`,
          name: item.name || item.menuItem?.name || 'Item',
          quantity: item.quantity,
          options: item.options || [],
          special_instructions: item.special_instructions || item.specialInstructions || '',
          status: item.status || 'pending',
          is_set_menu: false
        });
      }
    });
    return items;
  };

  const rawToKitchenOrder = (order: any): KitchenOrder => {
    let orderItems = order.order_items || [];
    if (typeof orderItems === 'string') {
      try { orderItems = JSON.parse(orderItems); } catch { orderItems = []; }
    }
    return {
      id: order.id.toString(),
      orderNumber: order.order_number,
      pickupNumber: (order.order_number || '').split('-')[1] || (order.order_number || '').slice(-3),
      pagerNumber: order.pager_number || undefined,
      items: processRawOrderItems(order.id, orderItems),
      status: order.status as KitchenOrder['status'],
      orderTime: new Date(order.createdAt || Date.now()),
      paymentStatus: order.payment_status,
      customerName: order.customer_name || undefined,
      tableNumber: order.table_number || undefined,
      orderType: (order.order_type || 'dine-in') as KitchenOrder['orderType'],
      source: order.source || 'pos',
      scheduledPickupTime: order.scheduled_pickup_time || null
    };
  };

  const isKitchenVisible = (order: any): boolean => {
    if (!['pending', 'preparing', 'ready'].includes(order.status)) return false;
    if (order.status === 'ready') {
      let items = order.order_items || [];
      if (typeof items === 'string') { try { items = JSON.parse(items); } catch { items = []; } }
      const allServed = items.length > 0 && items.every((item: any) => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          return item.set_items.every((si: any) => si.status === 'served' || si.status === 'completed');
        }
        return item.status === 'served' || item.status === 'completed';
      });
      if (allServed) return false;
    }
    return true;
  };

  // ─── KDS PIN Staff session (per-station staff login on top of RA JWT) ───
  const { staff: kdsStaff, login: kdsLogin, logout: kdsLogout } = useKdsStaff();

  // ─── Order History popover (floating panel anchored from KDS card) ───
  const [historyOrderId, setHistoryOrderId] = useState<number | null>(null);

  // ─── KDS PIN gate (opt-in, opened via "Switch staff" header button) ───
  const [showPinGate, setShowPinGate] = useState(false);

  // ─── API helper ───
  const apiHeaders = () => {
    const token = getAuthToken();
    return { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) };
  };

  // Helper to attach KDS staff identity to mutating requests.
  // If a per-station PIN staff is signed in, use that; otherwise fall back to the
  // current logged-in user (RA). Always tag source='kds' so the audit trail
  // can distinguish KDS actions from POS actions.
  const kdsBody = useCallback((extra: Record<string, any> = {}) => {
    if (kdsStaff) {
      return { ...extra, kds_staff_id: kdsStaff.id, kds_staff_name: kdsStaff.name, source: 'kds' };
    }
    return { ...extra, source: 'kds' };
  }, [kdsStaff]);

  // ─── Fetch all orders (source of truth) ───
  const fetchOrders = useCallback(async () => {
    if (!user?.restaurantId) return;
    try {
      // Only fetch today's orders based on restaurant timezone
      const tz = operationSettings?.timeZone || 'Asia/Kuala_Lumpur';
      const today = new Date().toLocaleDateString('en-CA', { timeZone: tz }); // YYYY-MM-DD
      const response = await fetch(`/api/orders/restaurant/${user.restaurantId}?startDate=${today}&endDate=${today}&status=pending,preparing,ready`, {
        credentials: 'include',
        headers: apiHeaders()
      });
      const result = await response.json();
      if (result.success && result.data) {
        const kitchenOrders: KitchenOrder[] = result.data
          .filter(isKitchenVisible)
          .map(rawToKitchenOrder);

        setOrders(prev => {
          const prevIds = new Set(prev.map(o => o.id));
          const newOrders = kitchenOrders.filter(o => !prevIds.has(o.id));
          if (newOrders.length > 0) playNotificationSoundRef.current();
          return kitchenOrders;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.restaurantId, operationSettings?.timeZone]);

  // Operation settings — StoreContext에서 가져오기 (별도 API 호출 제거)
  useEffect(() => {
    if (storeOpSettings) {
      setOperationSettings(storeOpSettings);
    }
  }, [storeOpSettings]);

  // Kitchen stations — API 1개만 호출, 메뉴 매핑은 MenuContext 데이터 재사용
  useEffect(() => {
    if (!user?.restaurantId) return;
    const loadStations = async () => {
      try {
        const res = await fetch(`/api/kitchen-stations?restaurant_id=${user.restaurantId}`, { headers: apiHeaders() });
        if (res.ok) {
          const data = await res.json();
          const stations = (data.data?.stations || []).filter((s: any) => s.is_active !== false);
          setKitchenStations(stations);
          // Cache id→name map so any device on any page (POS / Floor Plan)
          // can resolve a station name without re-fetching. tagTicketWithStations
          // (utils/billPrint.js) reads this as a fallback when the polling
          // backend payload's stationName is missing.
          try {
            const idMap: Record<string, string> = {};
            stations.forEach((s: any) => { if (s && s.id != null && s.name) idMap[String(s.id)] = s.name; });
            localStorage.setItem('kitchenStationsById', JSON.stringify(idMap));
          } catch { /* non-fatal */ }
        }
      } catch (e) {
        console.error('Failed to load kitchen stations:', e);
      }
    };
    loadStations();

    // Load item merge settings
    const loadMergeSettings = async () => {
      try {
        const res = await fetch(`/api/restaurants/${user.restaurantId}`, { headers: apiHeaders() });
        if (res.ok) {
          const data = await res.json();
          const restaurant = data.data || data;
          if (restaurant.kitchen_item_merge) {
            setItemMergeSettings(restaurant.kitchen_item_merge);
          }
        }
      } catch (e) {
        console.error('Failed to load item merge settings:', e);
      }
    };
    loadMergeSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.restaurantId]);

  // Apply URL station parameter after stations are loaded
  useEffect(() => {
    if (urlStationApplied.current || !urlStationParam || kitchenStations.length === 0) return;
    const target = parseInt(urlStationParam);
    if (isNaN(target)) return;
    // Prefer direct stationId match (stable across station re-ordering).
    // Fallback to 1-based index for legacy bookmarks created before this fix.
    const byId = kitchenStations.find(s => s.id === target);
    if (byId) {
      setSelectedStation(byId.id);
      urlStationApplied.current = true;
      return;
    }
    if (target >= 1 && target <= kitchenStations.length) {
      setSelectedStation(kitchenStations[target - 1].id);
      urlStationApplied.current = true;
    }
  }, [kitchenStations, urlStationParam]);

  // Menu→Station 매핑: MenuContext 데이터로 구축 (별도 /api/menu 호출 제거)
  useEffect(() => {
    if (!menuItems.length && !categories.length) return;

    const catStationMap = new Map<number, number>();
    categories.forEach((cat: any) => {
      if (cat.kitchen_station_id) catStationMap.set(Number(cat.id), cat.kitchen_station_id);
    });

    const map = new Map<string, number>();
    menuItems.forEach((item: any) => {
      const stationId = item.kitchen_station_id || catStationMap.get(Number(item.category));
      if (stationId) {
        // Map both plain name and "code name" format (POS saves orders as "A01 555")
        map.set(item.name, stationId);
        if (item.code) {
          map.set(`${item.code} ${item.name}`, stationId);
        }
      }
    });
    setMenuStationMap(map);

    if (map.size > 0) {
      localStorage.setItem('kitchenStationMenuMap', JSON.stringify(Object.fromEntries(map)));
    } else {
      localStorage.removeItem('kitchenStationMenuMap');
    }
  }, [menuItems, categories]);

  // Initial fetch + periodic refresh (소켓이 실시간 담당, 폴링은 fallback)
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // Socket.IO
  useEffect(() => {
    if (!user?.restaurantId) return;

    const newSocket = io('/orders', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: Infinity,
      timeout: 10000
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('join-restaurant', user.restaurantId);
      fetchOrders();
    });

    newSocket.on('disconnect', () => setIsConnected(false));
    newSocket.on('connect_error', () => setIsConnected(false));
    newSocket.on('reconnect', () => {
      setIsConnected(true);
      newSocket.emit('join-restaurant', user.restaurantId);
      fetchOrders();
    });

    newSocket.on('order-created', (order: any) => {
      if (order.restaurant_id !== user.restaurantId) return;

      let orderItems = order.order_items || [];
      if (typeof orderItems === 'string') {
        try { orderItems = JSON.parse(orderItems); } catch { orderItems = []; }
      }

      const expandedItems: any[] = [];
      orderItems.forEach((item: any, itemIndex: number) => {
        const specialInstructions = item.special_instructions || '';
        const setMenuMatch = specialInstructions.match(/^\[(.*?)\]/);

        if (setMenuMatch) {
          const setItemsText = setMenuMatch[1];
          const setItems = setItemsText.split(',').map((s: string) => s.trim());
          setItems.forEach((setItemText: string, setIndex: number) => {
            const match = setItemText.match(/^(.*?)\s+x(\d+)$/);
            if (match) {
              const [, itemName, itemQty] = match;
              expandedItems.push({
                id: `item-${order.id}-${itemIndex}-set-${setIndex}`,
                name: itemName.trim(),
                quantity: parseInt(itemQty) * item.quantity,
                options: [],
                status: item.status || 'pending',
                isSetItem: true,
                parentSetName: item.name
              });
            }
          });
          if (item.options && item.options.length > 0) {
            expandedItems.push({
              id: `item-${order.id}-${itemIndex}`,
              name: `${item.name} (Options)`,
              quantity: item.quantity,
              options: item.options,
              status: item.status || 'pending'
            });
          }
        } else {
          expandedItems.push({
            id: `item-${order.id}-${itemIndex}`,
            name: item.name || item.menuItem?.name || 'Item',
            quantity: item.quantity,
            options: item.options || [],
            status: item.status || 'pending'
          });
        }
      });

      const newOrder: KitchenOrder = {
        id: order.id.toString(),
        orderNumber: order.order_number,
        pickupNumber: order.order_number.split('-')[1] || order.order_number.slice(-3),
        items: expandedItems,
        status: order.status || 'pending',
        orderTime: new Date(order.createdAt || Date.now()),
        tableNumber: order.table_number,
        customerName: order.customer_name,
        orderType: order.order_type || 'dine-in',
        source: order.source || 'pos',
        scheduledPickupTime: order.scheduled_pickup_time || null
      };

      setOrders(prev => [newOrder, ...prev]);
      playNotificationSoundRef.current(orderItems);

      // ─── Auto-print kitchen ticket ───
      // Master gate (2026-05-28 revised — station-only mode正常化):
      //   master autoPrint OFF + station autoPrint OFF → absolute block.
      //   master autoPrint OFF + ANY station autoPrint ON → station-only mode,
      //     skip master kitchen printer but fire station printers normally.
      //   master autoPrint ON → fire both master + stations.
      // Previously a strict "master OFF = total block" cut shops that intentionally
      // run station-only off from auto-print entirely. The Fire 매장은 station 만
      // 쓰지만 master autoPrint OFF 라 모든 자동 인쇄 차단되던 보고.
      try {
        const printerSettings = getBillPrinterSettings();
        const kp: any = printerSettings.kitchenPrinter || {};
        const kpEnabled = kp.enabled !== false;
        const kpAuto = !!kp.autoPrint;
        const _stationAutoPrint = Object.values(printerSettings.kitchenStationPrinters || {}).some((s: any) => s?.autoPrint);
        if (kpEnabled && !kpAuto && !_stationAutoPrint) return; // both off → block
        // 2026-05-29: KDS auto-prints kitchen tickets to the station printers IT has.
        // The QZ-Tray printer-availability gate inside printKitchenTicketViaRawBT means
        // KDS only outputs to printers physically on the kitchen device and silently
        // skips the rest — so whether the kitchen printers are wired to the KDS box or
        // the counter POS, the device that HAS them prints, with no interception.
        const shouldAutoPrint = false; // 2026-05-29: KDS DISPLAY-ONLY — counter POS already prints; KDS printing caused duplicate tickets

        if (shouldAutoPrint) {
          // Share the inflight dedup pool with MainLayout polling so the same
          // order can't double-print on a single device when KDS socket and
          // polling both fire.
          const inflight = ((window as any).__autoPrintInflight = (window as any).__autoPrintInflight || {});
          if (inflight[order.id]) return;
          inflight[order.id] = true;
          const storeInfo = getStoreInfo();
          const printOrderData = {
            orderNumber: order.order_number,
            pickupNumber: order.order_number.split('-')[1],
            date: new Date(order.createdAt || Date.now()),
            orderType: order.order_type,
            orderSource: order.order_source || 'pos',
            tableNumber: order.table_number || null,
            pagerNumber: order.pager_number || null,
            customerName: order.customer_name || 'Walk-in Customer',
            items: orderItems.map((item: any) => {
              let itemOptions = item.options || [];
              if (typeof itemOptions === 'string') {
                try { itemOptions = JSON.parse(itemOptions); } catch { itemOptions = []; }
              }
              if (!Array.isArray(itemOptions)) itemOptions = [];
              return {
                menuItem: {
                  name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
                  price: parseFloat(item.price || '0'),
                  is_set_menu: item.is_set_menu || false,
                  set_items: item.set_items || []
                },
                quantity: item.quantity || 1,
                options: itemOptions,
                // Preserve backend-resolved station tagging so the printer
                // router (printKitchenTicketsByStation) can bucket each item
                // to its correct station printer. Dropping these fields was
                // why BARPR / KQ2 never received items when KDS handled the
                // socket directly.
                kitchen_station_id: item.kitchen_station_id || null,
                stationName: item.stationName || null
              };
            }),
            notes: order.notes || ''
          };

          // Print then mark (no pre-claim). printKitchenTicketViaRawBT only outputs
          // to the station printers THIS device has (availability gate); if it has
          // none, it returns false → we don't stamp → the device that DOES have them
          // prints. On success → PATCH /printed (stamp printed_at + clear needs_print).
          (async () => {
            const _h = { Authorization: `Bearer ${getAuthToken() || ''}` };
            try {
              const success = await printKitchenTicketViaRawBT(printOrderData, storeInfo);
              if (success !== false) {
                console.log('Kitchen ticket auto-printed for order', order.order_number);
                await fetch(`/api/orders/${order.id}/printed`, { method: 'PATCH', headers: _h }).catch(() => {});
              }
            } catch (err) {
              console.error('Auto-print failed:', err);
            } finally {
              delete (window as any).__autoPrintInflight[order.id];
            }
          })();
        }
      } catch (err) {
        console.error('Auto-print error:', err);
      }
    });

    // 2026-05-27: order-items-added — when an existing order gets new items
    // merged in (POS / mobile re-order on the same table), auto-print a
    // kitchen ticket for ONLY the newly added items. The original ticket
    // already printed when the order was first created; reprinting everything
    // would duplicate work. Honors the same shouldAutoPrint guard as
    // order-created so shops that disable auto-print stay opted-out.
    newSocket.on('order-items-added', (data: {
      orderId: number;
      orderNumber: string;
      tableNumber: string | null;
      orderGroup: number;
      addedItems: any[];
      itemCount: number;
    }) => {
      console.log('[KDS] order-items-added', data.orderId, `+Round ${data.orderGroup}`, data.addedItems?.length, 'items');
      playNotificationSoundRef.current(data.addedItems || []);

      try {
        const printerSettings = getBillPrinterSettings();
        // Mirror the master-gate policy from order-created (station-only mode 허용).
        const kp: any = printerSettings.kitchenPrinter || {};
        const kpEnabled = kp.enabled !== false;
        const kpAuto = !!kp.autoPrint;
        const _stationAutoPrint = Object.values(printerSettings.kitchenStationPrinters || {}).some((s: any) => s?.autoPrint);
        if (kpEnabled && !kpAuto && !_stationAutoPrint) return; // both off → block
        // +Round ticket: KDS prints to the station printers it has (availability gate).
        const shouldAutoPrint = false; // 2026-05-29: KDS DISPLAY-ONLY — counter POS already prints; KDS printing caused duplicate tickets
        if (!shouldAutoPrint) return;

        // Same inflight dedup as order-created handler
        const inflight = ((window as any).__autoPrintInflight = (window as any).__autoPrintInflight || {});
        if (inflight[data.orderId]) return;
        inflight[data.orderId] = true;

        const storeInfo = getStoreInfo();
        // Mark every addedItem with `added_at` so generateHTMLAdditionalItemsTicket
        // (billPrint.js) filters to just these and renders the "+ ROUND N" ticket.
        const now = new Date().toISOString();
        const printItems = (data.addedItems || []).map((item: any) => {
          let opts = item.options || [];
          if (typeof opts === 'string') { try { opts = JSON.parse(opts); } catch { opts = []; } }
          if (!Array.isArray(opts)) opts = [];
          return {
            menuItem: {
              name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
              price: parseFloat(item.price || '0'),
              is_set_menu: item.is_set_menu || false,
              set_items: item.set_items || []
            },
            quantity: item.quantity || 1,
            options: opts,
            added_at: item.added_at || now,
            order_group: item.order_group || data.orderGroup,
            // Preserve station tagging for additional-order ticket routing.
            // The backend now ALWAYS sets kitchen_station_id on merged items
            // (mergeItemsIntoOrder + mobile auto-merge both call
            // enrichItemsWithStation), so each +Round N ticket reaches the
            // correct station printer.
            kitchen_station_id: item.kitchen_station_id || null,
            stationName: item.stationName || null
          };
        });
        const printOrderData = {
          orderNumber: data.orderNumber,
          pickupNumber: (data.orderNumber || '').split('-')[1] || (data.orderNumber || '').slice(-3),
          date: new Date(),
          orderType: 'dine_in',
          orderSource: 'pos',
          tableNumber: data.tableNumber || null,
          pagerNumber: null,
          customerName: 'Walk-in Customer',
          groupLabel: `+Round ${data.orderGroup}`,
          items: printItems,
          notes: ''
        };
        // Print then mark — KDS outputs only to station printers it has (gate).
        (async () => {
          const _h = { Authorization: `Bearer ${getAuthToken() || ''}` };
          try {
            const ok = await printKitchenTicketViaRawBT(printOrderData as any, storeInfo);
            if (ok !== false) {
              console.log('[KDS] additional-items ticket auto-printed for', data.orderNumber, `+Round ${data.orderGroup}`);
              await fetch(`/api/orders/${data.orderId}/printed`, { method: 'PATCH', headers: _h }).catch(() => {});
            }
          } catch (err) {
            console.error('[KDS] additional-items auto-print failed:', err);
          } finally {
            delete (window as any).__autoPrintInflight[data.orderId];
          }
        })();
      } catch (err) {
        console.error('[KDS] order-items-added handler error:', err);
      }
    });

    newSocket.on('order-updated', (order: any) => {
      if (order.restaurant_id !== user.restaurantId) return;

      if (!isKitchenVisible(order)) {
        // 주문이 served/completed 되어 화면에서 제거
        setOrders(prev => prev.filter(o => o.id !== order.id.toString()));
        return;
      }

      const updated = rawToKitchenOrder(order);
      setOrders(prev => {
        const exists = prev.some(o => o.id === updated.id);
        if (exists) {
          return prev.map(o => o.id === updated.id ? updated : o);
        }
        return [updated, ...prev];
      });
    });

    newSocket.on('order-deleted', ({ id }: { id: number }) => {
      setOrders(prev => prev.filter(o => o.id !== id.toString()));
    });

    setSocket(newSocket);
    return () => { newSocket.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.restaurantId]);

  // Elapsed time update (every 10s is enough for minute-based display)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  const playNotificationSound = useCallback((orderItems?: any[]) => {
    if (!audioEnabled) return;
    import('../../utils/notificationSound').then(({ startRepeatingSound }) => {
      let preset: any = 'bell';

      if (selectedStation !== 'all') {
        const station = kitchenStations.find(s => s.id === selectedStation);
        if (station) {
          // Check if order has items for this station
          if (orderItems) {
            const hasStationItems = orderItems.some((item: any) => {
              const itemName = item.name || item.menuItem?.name || '';
              const stationId = menuStationMap.get(itemName);
              if (stationId === undefined) return true; // unassigned → all stations
              return stationId === selectedStation;
            });
            if (!hasStationItems) return;
          }
          preset = station.alert_sound || 'bell';
        }
      }

      startRepeatingSound(preset, 3000); // 3초마다 반복
    });
  }, [audioEnabled, selectedStation, kitchenStations, menuStationMap]);

  // Stop repeating sound when any order status changes (Pending → Preparing etc.)
  const stopSound = useCallback(() => {
    import('../../utils/notificationSound').then(({ stopRepeatingSound }) => {
      stopRepeatingSound();
    });
  }, []);

  // Stop sound when audio toggled off
  useEffect(() => {
    if (!audioEnabled) {
      import('../../utils/notificationSound').then(({ stopRepeatingSound }) => {
        stopRepeatingSound();
      });
    }
  }, [audioEnabled]);

  // Ref to avoid socket/fetchOrders dependency on playNotificationSound
  const playNotificationSoundRef = useRef(playNotificationSound);
  useEffect(() => {
    playNotificationSoundRef.current = playNotificationSound;
  }, [playNotificationSound]);

  const getItemCode = (itemName: string): string => {
    const menuItem = menuItems.find(m => m.name === itemName);
    return menuItem?.code || '';
  };

  const formatItemName = (itemName: string): string => {
    const code = getItemCode(itemName);
    return code ? `${code} ${itemName}` : itemName;
  };

  const getElapsedTime = (orderTime: Date) => {
    return Math.floor((currentTime.getTime() - orderTime.getTime()) / 1000 / 60);
  };

  // ─── Print Helper ───
  // Item View 그룹 프린트 — 카드에 보이는 대로: 메뉴명 x총수량 + 출처 라벨 + 옵션 상세
  const printGroupTicket = (group: MenuGroup) => {
    // 출처 라벨 (T002 x4, #001 등)
    const plainLabelMap = new Map<string, number>();
    group.plainSources.forEach(s => {
      plainLabelMap.set(s.label, (plainLabelMap.get(s.label) || 0) + s.quantity);
    });
    const labels = Array.from(plainLabelMap.entries())
      .map(([label, qty]) => qty > 1 ? `${label} x${qty}` : label);
    group.optionSources.forEach(s => labels.push(s.label));

    // 그룹을 하나의 아이템으로 만들어서 오더티켓 형식으로 전송
    // 옵션 아이템은 special_instructions로 표현
    const items: any[] = [];

    // Plain 아이템 (합산)
    if (group.plainQty > 0) {
      items.push({
        name: group.menuName,
        quantity: group.plainQty,
        options: [],
        special_instructions: ''
      });
    }

    // 옵션 아이템 (개별)
    group.optionSources.forEach(src => {
      items.push({
        name: group.menuName,
        quantity: src.quantity,
        options: src.options || [],
        special_instructions: src.special_instructions || ''
      });
    });

    const orderData = {
      orderNumber: labels.join(', '),
      date: group.earliestTime,
      items,
      skipFooterLocation: true  // 그룹 프린트는 하단 테이블/픽업번호 생략
    };

    printKitchenTicketViaRawBT(orderData, getStoreInfo());
  };

  const printOrderTicket = (order: KitchenOrder, itemsOverride?: any[]) => {
    const orderData = {
      orderNumber: order.orderNumber,
      date: order.orderTime,
      tableNumber: order.tableNumber,
      pagerNumber: order.pagerNumber,
      customerName: order.customerName || 'Walk-in Customer',
      orderSource: order.source || 'pos',
      items: (itemsOverride || order.items).map(item => ({
        name: item.name,
        quantity: item.quantity,
        options: item.options || [],
        special_instructions: item.special_instructions || '',
        is_set_menu: item.is_set_menu || false,
        set_items: item.set_items || []
      }))
    };
    printKitchenTicketViaRawBT(orderData, getStoreInfo());
  };

  const updateOrderStatus = async (orderId: string, newStatus: KitchenOrder['status']) => {
    // Stop repeating notification sound on any status change
    stopSound();
    // 즉시 UI 반영 (소켓 오면 덮어씌워짐)
    setOrders(prev => prev.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ).filter(o => {
      if (!['pending', 'preparing', 'ready'].includes(o.status)) return false;
      if (o.status === 'ready' && areAllItemsServed(o)) return false;
      return true;
    }));

    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: apiHeaders(),
        body: JSON.stringify(kdsBody({ status: newStatus }))
      });
      const result = await response.json();
      if (!result.success) fetchOrders();
    } catch {
      fetchOrders();
    }
  };

  // Get the next item status based on order status
  type ItemStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'completed';

  // ─── Station Filter Helper ───
  // 아이템이 선택된 Station에 속하는지 판별
  // 미배정 아이템 (어떤 Station에도 없음) → 모든 Station에 표시 (사라지면 안 됨)
  const isItemInSelectedStation = useCallback((itemName: string): boolean => {
    if (selectedStation === 'all') return true;
    const stationId = menuStationMap.get(itemName);
    if (stationId === undefined) return true; // 미배정 → 모든 Station에 표시
    return stationId === selectedStation;
  }, [selectedStation, menuStationMap]);

  // 주문에 선택된 Station의 아이템이 있는지 판별
  const orderHasStationItems = useCallback((order: KitchenOrder): boolean => {
    if (selectedStation === 'all') return true;
    return order.items.some(item => {
      if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
        return item.set_items.some(si => isItemInSelectedStation(si.name));
      }
      return isItemInSelectedStation(item.name);
    });
  }, [selectedStation, isItemInSelectedStation]);

  const getNextItemStatus = (orderStatus: string, currentItemStatus: string): ItemStatus => {
    // Each column: click toggles between the column's "done" state and "active" state
    const columnTarget: Record<string, string> = {
      pending: 'preparing',    // Pending column: Start → preparing
      preparing: 'ready',      // Preparing column: Done → ready
      ready: 'served',         // Ready column: Serve → served
    };
    const target = columnTarget[orderStatus] || 'completed';
    // Toggle: if already at target (or completed for backward compat), revert to base
    const isDone = currentItemStatus === target || (orderStatus === 'ready' && currentItemStatus === 'completed');
    return (isDone ? orderStatus : target) as ItemStatus;
  };

  // Check if all items in an order are fully served (should be removed from Kitchen Display)
  const areAllItemsServed = (order: KitchenOrder): boolean => {
    return order.items.every(item => {
      if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
        return item.set_items.every(si => si.status === 'served' || si.status === 'completed');
      }
      return item.status === 'served' || item.status === 'completed';
    });
  };

  // Check if item is "done" for its current column
  const isItemDoneForColumn = (orderStatus: string, itemStatus: string): boolean => {
    switch (orderStatus) {
      case 'pending': return itemStatus === 'preparing' || itemStatus === 'ready' || itemStatus === 'served' || itemStatus === 'completed';
      case 'preparing': return itemStatus === 'ready' || itemStatus === 'served' || itemStatus === 'completed';
      case 'ready': return itemStatus === 'served' || itemStatus === 'completed';
      default: return false;
    }
  };

  // Check if all items are done for the current column
  const areAllItemsDoneForColumn = (items: KitchenOrder['items'], orderStatus: string): boolean => {
    return items.every(item => {
      if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
        return item.set_items.every(si => isItemDoneForColumn(orderStatus, si.status || 'pending'));
      }
      return isItemDoneForColumn(orderStatus, item.status || 'pending');
    });
  };

  const updateItemStatus = async (orderId: string, itemId: string) => {
    stopSound();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedItems = order.items.map(item => {
      if (item.id === itemId) {
        return { ...item, status: getNextItemStatus(order.status, item.status || 'pending') };
      }
      return item;
    });

    // 즉시 UI 반영
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, items: updatedItems as any } : o));

    try {
      const response = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH',
        credentials: 'include',
        headers: apiHeaders(),
        body: JSON.stringify(kdsBody({ order_items: updatedItems }))
      });
      const result = await response.json();
      if (!result.success) { fetchOrders(); return; }

      if (areAllItemsDoneForColumn(updatedItems, order.status)) {
        const next = ({ pending: 'preparing', preparing: 'ready', ready: 'served' } as any)[order.status];
        if (next) await updateOrderStatus(orderId, next);
      }
    } catch {
      fetchOrders();
    }
  };

  const updateSetItemStatus = async (orderId: string, parentItemId: string, setItemId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedItems = order.items.map(item => {
      if (item.id === parentItemId && item.set_items) {
        const updatedSetItems = item.set_items.map(setItem => {
          if (setItem.id === setItemId) {
            return { ...setItem, status: getNextItemStatus(order.status, setItem.status || 'pending') };
          }
          return setItem;
        });
        const allSetDone = updatedSetItems.every(si => isItemDoneForColumn(order.status, si.status || 'pending'));
        const parentStatus: ItemStatus = allSetDone ? getNextItemStatus(order.status, order.status) : (order.status as ItemStatus);
        return { ...item, set_items: updatedSetItems, status: parentStatus };
      }
      return item;
    });

    // 즉시 UI 반영
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, items: updatedItems as any } : o));

    try {
      const response = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH',
        credentials: 'include',
        headers: apiHeaders(),
        body: JSON.stringify(kdsBody({ order_items: updatedItems }))
      });
      const result = await response.json();
      if (!result.success) { fetchOrders(); return; }

      if (areAllItemsDoneForColumn(updatedItems, order.status)) {
        const next = ({ pending: 'preparing', preparing: 'ready', ready: 'served' } as any)[order.status];
        if (next) await updateOrderStatus(orderId, next);
      }
    } catch {
      fetchOrders();
    }
  };

  const markAllItemsCompletedAndReady = async (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const statusOrder: Record<string, number> = { pending: 0, preparing: 1, ready: 2, served: 3, completed: 4 };
    const updatedItems = order.items.map(item => {
      const itemLevel = statusOrder[item.status || 'pending'] || 0;
      return {
        ...item, status: itemLevel < 2 ? 'ready' as const : (item.status || 'pending') as ItemStatus,
        set_items: item.set_items?.map(si => {
          const siLevel = statusOrder[si.status || 'pending'] || 0;
          return { ...si, status: siLevel < 2 ? 'ready' as const : (si.status || 'pending') as ItemStatus };
        })
      };
    });

    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, items: updatedItems as any } : o));
    try {
      const res = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH', credentials: 'include', headers: apiHeaders(),
        body: JSON.stringify(kdsBody({ order_items: updatedItems }))
      });
      const result = await res.json();
      if (!result.success) { fetchOrders(); return; }
      if (areAllItemsDoneForColumn(updatedItems, order.status)) {
        const next = ({ pending: 'preparing', preparing: 'ready', ready: 'served' } as any)[order.status];
        if (next) await updateOrderStatus(orderId, next);
      }
    } catch {
      fetchOrders();
    }
  };

  const markAllItemsAndMove = async (orderId: string, targetStatus: KitchenOrder['status']) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    // Only update items that haven't already reached or passed the target status
    const statusOrder: Record<string, number> = { pending: 0, preparing: 1, ready: 2, served: 3, completed: 4 };
    const targetLevel = statusOrder[targetStatus] || 0;
    const updatedItems = order.items.map(item => {
      const itemLevel = statusOrder[item.status || 'pending'] || 0;
      const newItemStatus = itemLevel < targetLevel ? targetStatus as ItemStatus : (item.status || 'pending') as ItemStatus;
      return {
        ...item,
        status: newItemStatus,
        set_items: item.set_items?.map(si => {
          const siLevel = statusOrder[si.status || 'pending'] || 0;
          return { ...si, status: siLevel < targetLevel ? targetStatus as ItemStatus : (si.status || 'pending') as ItemStatus };
        })
      };
    });

    // Update items first
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, items: updatedItems as any } : o));
    try {
      const res = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH', credentials: 'include', headers: apiHeaders(),
        body: JSON.stringify(kdsBody({ order_items: updatedItems }))
      });
      const result = await res.json();
      if (!result.success) { fetchOrders(); return; }
      // Only advance order status if ALL items are done for the current column
      if (areAllItemsDoneForColumn(updatedItems, order.status)) {
        const next = ({ pending: 'preparing', preparing: 'ready', ready: 'served' } as any)[order.status];
        if (next) await updateOrderStatus(orderId, next);
      }
    } catch {
      fetchOrders();
    }
  };

  const markAllServed = async (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const statusOrder: Record<string, number> = { pending: 0, preparing: 1, ready: 2, served: 3, completed: 4 };
    const updatedItems = order.items.map(item => {
      const itemLevel = statusOrder[item.status || 'pending'] || 0;
      return {
        ...item, status: itemLevel < 3 ? 'served' as const : (item.status || 'pending') as ItemStatus,
        set_items: item.set_items?.map(si => {
          const siLevel = statusOrder[si.status || 'pending'] || 0;
          return { ...si, status: siLevel < 3 ? 'served' as const : (si.status || 'pending') as ItemStatus };
        })
      };
    });

    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, items: updatedItems as any } : o));
    try {
      const res = await fetch(`/api/orders/${orderId}/items`, {
        method: 'PATCH', credentials: 'include', headers: apiHeaders(),
        body: JSON.stringify(kdsBody({ order_items: updatedItems }))
      });
      const result = await res.json();
      if (!result.success) { fetchOrders(); return; }
      if (areAllItemsDoneForColumn(updatedItems, order.status)) {
        const next = ({ pending: 'preparing', preparing: 'ready', ready: 'served' } as any)[order.status];
        if (next) await updateOrderStatus(orderId, next);
      }
    } catch {
      fetchOrders();
    }
  };

  // Memoized order lists by status (recalculates when orders or station filter changes).
  // Sort key: pickup orders sort by scheduled_pickup_time (so the next-due pickup
  // surfaces first regardless of when it was placed), everything else sorts by
  // orderTime ascending. ASAP pickups (no scheduled time) fall back to orderTime.
  const ordersByStatus = useMemo(() => {
    const sortKey = (o: KitchenOrder) =>
      (o.orderType === 'pickup' && o.scheduledPickupTime
        ? new Date(o.scheduledPickupTime).getTime()
        : o.orderTime.getTime());
    const sorted = (status: string) => orders
      .filter(order => order.status === status)
      .filter(orderHasStationItems)
      .sort((a, b) => sortKey(a) - sortKey(b));
    return {
      pending: sorted('pending'),
      preparing: sorted('preparing'),
      ready: sorted('ready')
    };
  }, [orders, orderHasStationItems]);

  const getOrdersByStatus = (status: KitchenOrder['status']) => {
    return ordersByStatus[status] || [];
  };

  const counts = useMemo(() => ({
    pending: ordersByStatus.pending.length,
    preparing: ordersByStatus.preparing.length,
    ready: ordersByStatus.ready.length
  }), [ordersByStatus]);

  // 주문단위: 총 아이템 수 (세트메뉴는 set_items 개별 카운트, Station 필터 적용)
  const orderItemCounts = useMemo(() => {
    const calc = (orderList: KitchenOrder[]) => orderList.reduce((sum, o) => {
      return sum + o.items.reduce((iSum, item) => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          if (selectedStation === 'all') return iSum + item.set_items.length;
          return iSum + item.set_items.filter(si => isItemInSelectedStation(si.name)).length;
        }
        if (selectedStation !== 'all' && !isItemInSelectedStation(item.name)) return iSum;
        return iSum + 1;
      }, 0);
    }, 0);
    return {
      pending: calc(ordersByStatus.pending),
      preparing: calc(ordersByStatus.preparing),
      ready: calc(ordersByStatus.ready)
    };
  }, [ordersByStatus, selectedStation, isItemInSelectedStation]);

  const getOrderItemCount = (status: KitchenOrder['status']): number => {
    return orderItemCounts[status] || 0;
  };

  // 아이템단위: 해당 item.status인 아이템 수 (Station 필터 적용)
  const itemStatusCounts = useMemo(() => {
    const calc = (status: string) => {
      const targetOrders = orders.filter(o => o.status === status);
      return targetOrders.reduce((sum, o) => {
        return sum + o.items.reduce((iSum, item) => {
          if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
            return iSum + item.set_items.filter(si => {
              if (selectedStation !== 'all' && !isItemInSelectedStation(si.name)) return false;
              return (si.status || 'pending') === status;
            }).length;
          }
          if (selectedStation !== 'all' && !isItemInSelectedStation(item.name)) return iSum;
          return iSum + ((item.status || 'pending') === status ? 1 : 0);
        }, 0);
      }, 0);
    };
    return { pending: calc('pending'), preparing: calc('preparing'), ready: calc('ready') };
  }, [orders, selectedStation, isItemInSelectedStation]);

  const getItemStatusCount = (status: string): number => {
    return (itemStatusCounts as any)[status] || 0;
  };

  // ─── Render helpers ─────────────────────────────────────────

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'preparing': return '#3B82F6';
      case 'ready': return '#10B981';
      default: return '#4B5563';
    }
  };

  const renderOrderCard = (order: KitchenOrder) => {
    const elapsedTime = getElapsedTime(order.orderTime);
    const isUrgent = elapsedTime > 15 && order.status === 'pending';

    // Station 필터: 선택된 Station 아이템만 표시
    const visibleItems = selectedStation === 'all' ? order.items : order.items.filter(item => {
      if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
        return item.set_items.some(si => isItemInSelectedStation(si.name));
      }
      return isItemInSelectedStation(item.name);
    });

    // Count set_items individually instead of parent set menu item
    let totalItems = 0;
    let completedItems = 0;
    visibleItems.forEach(item => {
      if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
        const stationSetItems = selectedStation === 'all' ? item.set_items : item.set_items.filter(si => isItemInSelectedStation(si.name));
        totalItems += stationSetItems.length;
        completedItems += stationSetItems.filter(si => isItemDoneForColumn(order.status, si.status || 'pending')).length;
      } else {
        totalItems += 1;
        if (isItemDoneForColumn(order.status, item.status || 'pending')) completedItems += 1;
      }
    });
    const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    const statusColor = getStatusColor(order.status);

    return (
      <OrderCard key={order.id}>
        {/* Header: Order identifier + elapsed time */}
        <OrderHeader>
          <OrderLeft>
            <OrderNumber>
              {order.tableNumber ? (/[A-Za-z]/.test(String(order.tableNumber)) ? String(order.tableNumber) : `T${String(order.tableNumber).replace(/^T/i, '')}`) :
               order.pagerNumber ? `P${order.pagerNumber}` : `#${order.pickupNumber}`}
            </OrderNumber>
            {order.orderType === 'takeaway' && (
              <OrderTypeBadge>{t('kitchen:kitchenDisplayPage.takeaway')}</OrderTypeBadge>
            )}
            {order.orderType === 'pickup' && (
              <OrderTypeBadge variant="pickup">
                PICKUP {order.scheduledPickupTime ? formatPickupTimeRange(order.scheduledPickupTime, operationSettings?.timeZone) : 'ASAP'}
              </OrderTypeBadge>
            )}
            {order.orderType === 'delivery' && (
              <OrderTypeBadge variant="delivery">{t('kitchen:kitchenDisplayPage.delivery')}</OrderTypeBadge>
            )}
          </OrderLeft>
          <OrderRight>
            <OrderId>{order.orderNumber}</OrderId>
            <ElapsedTime urgent={isUrgent}>{elapsedTime}m</ElapsedTime>
          </OrderRight>
        </OrderHeader>

        {/* Progress: visual bar + count */}
        {totalItems > 1 && <ProgressContainer>
          <ProgressBar>
            <ProgressFill percent={progressPercent} color={statusColor} />
          </ProgressBar>
          <ProgressText>{completedItems}/{totalItems}</ProgressText>
        </ProgressContainer>}

        {/* Items — grouped by order_group with a clear divider when a new
            "+ Round" of items is added to the same order. Lets cooks see at a
            glance which items came in later vs the original ticket so they
            don't accidentally cook the originals again. */}
        <ItemsContainer>
          {visibleItems.map((item, idx) => {
            const itemGroup = (item as any).order_group || 0;
            const prevGroup = idx > 0 ? ((visibleItems[idx - 1] as any).order_group || 0) : 0;
            const isGroupStart = itemGroup > 0 && itemGroup !== prevGroup;
            const addedAt = (item as any).added_at;
            const addedAtLabel = addedAt
              ? new Date(addedAt).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true })
              : null;
            return (
            <React.Fragment key={item.id}>
              {isGroupStart && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  margin: '8px 0 4px', padding: '4px 8px',
                  background: '#FEF3C7', border: '1px solid #FCD34D',
                  borderRadius: '6px', fontSize: '11px', fontWeight: 700,
                  color: '#92400E', letterSpacing: '0.3px'
                }}>
                  <span>+ ROUND {itemGroup}</span>
                  {addedAtLabel && <span style={{ fontWeight: 500, opacity: 0.8 }}>· added {addedAtLabel}</span>}
                </div>
              )}
              <ItemRow done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>
                <ItemInfo>
                  {item.is_set_menu ? (
                    <div style={{ fontSize: '12px', fontWeight: 500, color: '#4B5563' }}>
                      {formatItemName(item.name)} {item.quantity > 1 && <ItemQty highlight done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>x {item.quantity}</ItemQty>}
                    </div>
                  ) : (
                    <ItemName done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>
                      {formatItemName(item.name)} {item.quantity > 1 && <ItemQty highlight done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>x {item.quantity}</ItemQty>}
                    </ItemName>
                  )}
                  {(() => {
                    const regularOptions = item.options?.filter(opt => !/^.+\sx\d+$/.test(opt)) || [];
                    if (regularOptions.length === 0 && !item.special_instructions) return null;
                    return (
                      <OptionTags>
                        {regularOptions.map((option, idx) => (
                          <OptionTag key={idx} done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>{option}</OptionTag>
                        ))}
                        {item.special_instructions && (
                          <SpecialTag done={isItemDoneForColumn(order.status, item.status || 'pending') && order.status !== 'pending'}>{item.special_instructions}</SpecialTag>
                        )}
                      </OptionTags>
                    );
                  })()}
                </ItemInfo>
                {!item.is_set_menu && totalItems === 1 && order.status !== 'pending' && (
                  <RevertBtn
                    style={{ padding: '6px 10px', fontSize: '12px', marginRight: 4 }}
                    onClick={() => {
                      const prevStatus = order.status === 'preparing' ? 'pending' : order.status === 'ready' ? 'preparing' : null;
                      if (prevStatus) updateOrderStatus(order.id, prevStatus);
                    }}
                  >↺</RevertBtn>
                )}
                {!item.is_set_menu && totalItems === 1 && order.status === 'pending' && (
                  <RevertBtn
                    style={{ padding: '6px 8px', marginRight: 4 }}
                    onClick={() => {
                      // Honor the active station filter so the kitchen-only
                      // ticket prints just the items the user is looking at,
                      // not the entire order across all stations.
                      const visibleItems = selectedStation === 'all'
                        ? order.items
                        : order.items.filter(it => isItemInSelectedStation(it.name));
                      printOrderTicket(order, visibleItems);
                    }}
                    title="Print Kitchen Ticket"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                  </RevertBtn>
                )}
                {!item.is_set_menu && (
                  <ItemActionButton
                    done={isItemDoneForColumn(order.status, item.status || 'pending')}
                    statusColor={statusColor}
                    onClick={() => updateItemStatus(order.id, item.id!)}
                  >
                    {isItemDoneForColumn(order.status, item.status || 'pending')
                      ? (order.status === 'pending' ? 'Started' : order.status === 'preparing' ? 'Done ✓' : 'Served')
                      : (order.status === 'pending' ? 'Start' : order.status === 'preparing' ? 'Done' : 'Serve')
                    }
                  </ItemActionButton>
                )}
              </ItemRow>

              {item.is_set_menu && item.set_items && item.set_items.length > 0 && (
                <SetItemsWrap>
                  {(selectedStation === 'all' ? item.set_items : item.set_items.filter(si => isItemInSelectedStation(si.name))).map((setItem) => (
                    <SetItemRow key={setItem.id} done={isItemDoneForColumn(order.status, setItem.status || 'pending') && order.status !== 'pending'}>
                      <SetItemName done={isItemDoneForColumn(order.status, setItem.status || 'pending') && order.status !== 'pending'}>
                        {formatItemName(setItem.name)} {setItem.quantity > 1 && <ItemQty highlight done={isItemDoneForColumn(order.status, setItem.status || 'pending') && order.status !== 'pending'}>x {setItem.quantity}</ItemQty>}
                      </SetItemName>
                      <ItemActionButton
                        done={isItemDoneForColumn(order.status, setItem.status || 'pending')}
                        statusColor={statusColor}
                        onClick={() => updateSetItemStatus(order.id, item.id!, setItem.id!)}
                      >
                        {isItemDoneForColumn(order.status, setItem.status || 'pending')
                          ? (order.status === 'pending' ? 'Started' : order.status === 'preparing' ? 'Done ✓' : 'Served')
                          : (order.status === 'pending' ? 'Start' : order.status === 'preparing' ? 'Done' : 'Serve')
                        }
                      </ItemActionButton>
                    </SetItemRow>
                  ))}
                </SetItemsWrap>
              )}
            </React.Fragment>
          );
          })}
        </ItemsContainer>

        {/* Actions */}
        {order.status === 'pending' && totalItems > 1 && (
          <ActionRow>
            <RevertBtn style={{ flex: 'none', padding: '8px 10px' }} onClick={() => {
              const visibleItems = selectedStation === 'all'
                ? order.items
                : order.items.filter(it => isItemInSelectedStation(it.name));
              printOrderTicket(order, visibleItems);
            }} title="Print Kitchen Ticket">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </RevertBtn>
            <ActionBtn color="#F59E0B" onClick={() => markAllItemsAndMove(order.id, 'preparing')}>
              Start All
            </ActionBtn>
          </ActionRow>
        )}
        {order.status === 'preparing' && totalItems > 1 && (
          <ActionRow>
            <RevertBtn onClick={() => updateOrderStatus(order.id, 'pending')}>↺</RevertBtn>
            <ActionBtn color="#3B82F6" onClick={() => markAllItemsCompletedAndReady(order.id)}>
              Mark Ready
            </ActionBtn>
          </ActionRow>
        )}
        {order.status === 'ready' && totalItems > 1 && (
          <ActionRow>
            <RevertBtn onClick={() => updateOrderStatus(order.id, 'preparing')}>↺</RevertBtn>
            <ActionBtn color="#10B981" onClick={() => markAllServed(order.id)}>
              Serve All
            </ActionBtn>
          </ActionRow>
        )}
        <div style={{
          display: 'flex', justifyContent: 'flex-end',
          padding: '4px 12px 8px', fontSize: 11
        }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setHistoryOrderId(Number(order.id)); }}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: '#4B5563', fontSize: 11, padding: '2px 4px', fontWeight: 500
            }}
          >
            {t('history.viewLink', 'View history')}
          </button>
        </div>
      </OrderCard>
    );
  };

  // ─── Item View: Pending (메뉴 그룹핑) ───────────────────────

  interface ItemSource {
    orderId: string;
    itemId: string;
    label: string;
    orderNumber: string;
    quantity: number;
    options?: string[];
    special_instructions?: string;
    is_set_menu?: boolean;
  }

  interface MenuGroup {
    menuName: string;
    formattedName: string;
    plainQty: number;       // 옵션 없는 아이템 합산 수량
    plainSources: ItemSource[];
    optionSources: ItemSource[]; // 옵션/특별지시 있는 아이템 (개별 표시)
    earliestTime: Date;
  }

  // 아이템 뷰 Pending 그룹핑 — item.status === 'pending'인 모든 아이템 수집 (주문 상태 무관)
  const getItemViewPendingGroupsRaw = (): MenuGroup[] => {
    const groupMap = new Map<string, MenuGroup>();

    // pending/preparing 주문에서 item.status가 pending인 아이템 수집
    orders.filter(o => ['pending', 'preparing'].includes(o.status)).forEach(order => {
      const label = order.tableNumber
        ? (/[A-Za-z]/.test(String(order.tableNumber)) ? String(order.tableNumber) : `T${String(order.tableNumber).replace(/^T/i, '')}`)
        : order.pagerNumber
        ? `P${order.pagerNumber}`
        : `#${order.pickupNumber}`;

      order.items.forEach(item => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          item.set_items.forEach(setItem => {
            if ((setItem.status || 'pending') !== 'pending') return;
            if (!isItemInSelectedStation(setItem.name)) return;
            const key = setItem.name;
            if (!groupMap.has(key)) {
              groupMap.set(key, {
                menuName: setItem.name, formattedName: formatItemName(setItem.name),
                plainQty: 0, plainSources: [], optionSources: [],
                earliestTime: order.orderTime
              });
            }
            const group = groupMap.get(key)!;
            group.plainQty += setItem.quantity;
            if (order.orderTime < group.earliestTime) group.earliestTime = order.orderTime;
            group.plainSources.push({
              orderId: order.id, itemId: setItem.id!, label, orderNumber: order.orderNumber,
              quantity: setItem.quantity, is_set_menu: true
            });
          });
        } else {
          if ((item.status || 'pending') !== 'pending') return;
          if (!isItemInSelectedStation(item.name)) return;
          const key = item.name;
          if (!groupMap.has(key)) {
            groupMap.set(key, {
              menuName: item.name, formattedName: formatItemName(item.name),
              plainQty: 0, plainSources: [], optionSources: [],
              earliestTime: order.orderTime
            });
          }
          const group = groupMap.get(key)!;
          if (order.orderTime < group.earliestTime) group.earliestTime = order.orderTime;

          const regularOptions = item.options?.filter(opt => !/^.+\sx\d+$/.test(opt)) || [];
          const hasCustomization = regularOptions.length > 0 || !!item.special_instructions;

          if (hasCustomization) {
            group.optionSources.push({
              orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
              quantity: item.quantity,
              options: regularOptions,
              special_instructions: item.special_instructions
            });
          } else {
            group.plainQty += item.quantity;
            group.plainSources.push({
              orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
              quantity: item.quantity
            });
          }
        }
      });
    });

    return Array.from(groupMap.values()).sort((a, b) => a.earliestTime.getTime() - b.earliestTime.getTime());
  };

  // Apply item merge limits (time_limit, max_count) as post-processing
  // All sources (plain + option) count toward limits
  const applyMergeLimits = (groups: MenuGroup[]): MenuGroup[] => {
    const { time_limit, max_count } = itemMergeSettings;
    if (!time_limit && !max_count) return groups;

    const result: MenuGroup[] = [];

    for (const group of groups) {
      // Combine all sources with order time for unified time/count splitting
      const allSources = [
        ...group.plainSources.map(s => ({ ...s, isOption: false })),
        ...group.optionSources.map(s => ({ ...s, isOption: true }))
      ].map(s => {
        const order = orders.find(o => o.id === s.orderId);
        return { ...s, orderTime: order?.orderTime || group.earliestTime };
      }).sort((a, b) => a.orderTime.getTime() - b.orderTime.getTime());

      if (allSources.length === 0) continue;

      // Step 1: Time limit — split into time-based buckets
      type SourceWithTime = typeof allSources[number];
      let timeBuckets: { sources: SourceWithTime[]; earliestTime: Date }[] = [];

      if (time_limit > 0) {
        let currentBucket: SourceWithTime[] = [];
        let bucketStart = allSources[0].orderTime;

        for (const s of allSources) {
          const diffMin = (s.orderTime.getTime() - bucketStart.getTime()) / 60000;
          if (diffMin > time_limit && currentBucket.length > 0) {
            timeBuckets.push({ sources: currentBucket, earliestTime: bucketStart });
            currentBucket = [s];
            bucketStart = s.orderTime;
          } else {
            currentBucket.push(s);
          }
        }
        if (currentBucket.length > 0) {
          timeBuckets.push({ sources: currentBucket, earliestTime: bucketStart });
        }
      } else {
        timeBuckets = [{ sources: allSources, earliestTime: group.earliestTime }];
      }

      // Step 2: Max count — split each time bucket if total qty exceeds limit
      for (const bucket of timeBuckets) {
        const totalQty = bucket.sources.reduce((sum, s) => sum + s.quantity, 0);

        if (max_count > 0 && totalQty > max_count) {
          let remaining = [...bucket.sources];
          while (remaining.length > 0) {
            let qty = 0;
            const taken: SourceWithTime[] = [];
            const leftover: SourceWithTime[] = [];
            for (const s of remaining) {
              if (qty + s.quantity <= max_count) {
                taken.push(s);
                qty += s.quantity;
              } else if (qty < max_count) {
                const take = max_count - qty;
                taken.push({ ...s, quantity: take });
                leftover.push({ ...s, quantity: s.quantity - take });
                qty = max_count;
              } else {
                leftover.push(s);
              }
            }
            const plain = taken.filter(s => !s.isOption);
            const option = taken.filter(s => s.isOption);
            result.push({
              menuName: group.menuName,
              formattedName: group.formattedName,
              plainQty: plain.reduce((sum, s) => sum + s.quantity, 0),
              plainSources: plain,
              optionSources: option,
              earliestTime: bucket.earliestTime
            });
            remaining = leftover;
          }
        } else {
          const plain = bucket.sources.filter(s => !s.isOption);
          const option = bucket.sources.filter(s => s.isOption);
          result.push({
            menuName: group.menuName,
            formattedName: group.formattedName,
            plainQty: plain.reduce((sum, s) => sum + s.quantity, 0),
            plainSources: plain,
            optionSources: option,
            earliestTime: bucket.earliestTime
          });
        }
      }
    }

    return result.sort((a, b) => a.earliestTime.getTime() - b.earliestTime.getTime());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pendingGroupsRaw = useMemo(() => getItemViewPendingGroupsRaw(), [orders, selectedStation, menuStationMap]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pendingGroups = useMemo(() => applyMergeLimits(pendingGroupsRaw), [pendingGroupsRaw, itemMergeSettings, orders]);

  const getItemViewPendingGroups = () => pendingGroups;

  // 그룹 아이템들을 주문 단위로 모아서 한 번에 상태 변경 + 자동전진
  const handleGroupBatch = async (group: MenuGroup, direction: 'forward' | 'revert', column?: 'pending' | 'preparing') => {
    const allSources = [...group.plainSources, ...group.optionSources];

    // 주문별로 아이템 ID 모으기
    const orderItemMap = new Map<string, Set<string>>();
    allSources.forEach(s => {
      if (!orderItemMap.has(s.orderId)) orderItemMap.set(s.orderId, new Set());
      orderItemMap.get(s.orderId)!.add(s.itemId);
    });

    const token = getAuthToken();

    // 주문별 업데이트 데이터 준비
    const updates = Array.from(orderItemMap.entries()).map(([orderId, itemIds]) => {
      const order = orders.find(o => o.id === orderId);
      if (!order) return null;

      const updatedItems = order.items.map(item => {
        if (item.is_set_menu && item.set_items) {
          // column 기반 다음 상태: pending→preparing, preparing→ready
          const forwardTarget: Record<string, ItemStatus> = { pending: 'preparing', preparing: 'ready' };
          const revertTarget: Record<string, ItemStatus> = { preparing: 'pending', ready: 'preparing', served: 'ready' };
          const effectiveColumn = column || order.status;

          const updatedSetItems = item.set_items.map(si => {
            if (!itemIds.has(si.id!)) return si;
            if (direction === 'forward') {
              return { ...si, status: forwardTarget[effectiveColumn] || 'preparing' };
            } else {
              return { ...si, status: revertTarget[si.status || 'pending'] || si.status };
            }
          });
          // 세트 부모 상태: 모든 세트 아이템이 해당 컬럼 done이면 전진
          const allSetDone = updatedSetItems.every(si => isItemDoneForColumn(order.status, si.status || 'pending'));
          const parentStatus: ItemStatus = allSetDone ? (forwardTarget[order.status] || order.status as ItemStatus) : (order.status as ItemStatus);
          return { ...item, set_items: updatedSetItems, status: parentStatus };
        }
        if (!itemIds.has(item.id!)) return item;
        const forwardTarget: Record<string, ItemStatus> = { pending: 'preparing', preparing: 'ready' };
        const revertTarget: Record<string, ItemStatus> = { preparing: 'pending', ready: 'preparing', served: 'ready' };
        const effectiveColumn = column || order.status;
        if (direction === 'forward') {
          return { ...item, status: forwardTarget[effectiveColumn] || 'preparing' };
        } else {
          return { ...item, status: revertTarget[item.status || 'pending'] || item.status };
        }
      });

      return { orderId, order, updatedItems };
    }).filter(Boolean) as Array<{ orderId: string; order: KitchenOrder; updatedItems: any[] }>;

    // 즉시 UI 반영 (revert 시 주문 상태도 함께 변경)
    setOrders(prev => prev.map(o => {
      const update = updates.find(u => u.orderId === o.id);
      if (!update) return o;
      const updated = { ...o, items: update.updatedItems as any };

      // revert 시: 모든 아이템이 이전 상태이면 주문도 이전 상태로
      if (direction === 'revert') {
        const prevOrderStatus: Record<string, string> = { preparing: 'pending', ready: 'preparing' };
        const prevStatus = prevOrderStatus[o.status];
        if (prevStatus) {
          const allReverted = update.updatedItems.every((it: any) => {
            if (it.is_set_menu && it.set_items && it.set_items.length > 0) {
              return it.set_items.every((si: any) => (si.status || 'pending') === prevStatus);
            }
            return (it.status || 'pending') === prevStatus;
          });
          if (allReverted) updated.status = prevStatus as any;
        }
      }
      return updated;
    }).filter(o => {
      if (!['pending', 'preparing', 'ready'].includes(o.status)) return false;
      if (o.status === 'ready' && areAllItemsServed(o)) return false;
      return true;
    }));

    // Preparing 배치 관리 (UI-only state)
    const allItemIds = new Set(allSources.map(s => s.itemId));
    if (direction === 'forward' && column === 'pending') {
      const batchId = `batch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setPreparingBatches(prev => [...prev, {
        batchId,
        menuName: group.menuName,
        formattedName: group.formattedName,
        itemIds: allItemIds
      }]);
    } else if (direction === 'forward' && column === 'preparing') {
      setPreparingBatches(prev => prev
        .map(b => ({ ...b, itemIds: new Set(Array.from(b.itemIds).filter(id => !allItemIds.has(id))) }))
        .filter(b => b.itemIds.size > 0)
      );
    } else if (direction === 'revert' && column === 'preparing') {
      setPreparingBatches(prev => prev
        .map(b => ({ ...b, itemIds: new Set(Array.from(b.itemIds).filter(id => !allItemIds.has(id))) }))
        .filter(b => b.itemIds.size > 0)
      );
    }

    // API call (items 먼저 저장)
    try {
      const results = await Promise.all(updates.map(({ orderId, updatedItems }) =>
        fetch(`/api/orders/${orderId}/items`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify(kdsBody({ order_items: updatedItems.map(item => ({ ...item, status: item.status })) }))
        }).then(r => r.json())
      ));
      if (results.some(r => !r.success)) { fetchOrders(); return; }
    } catch {
      fetchOrders();
      return;
    }

    // 자동전진/롤백 (API 성공 후)
    const statusUpdates = updates.map(({ orderId, order, updatedItems }) => {
      if (direction === 'forward') {
        if (areAllItemsDoneForColumn(updatedItems, order.status)) {
          const nextOrderStatus: Record<string, KitchenOrder['status']> = {
            pending: 'preparing', preparing: 'ready', ready: 'served',
          };
          const next = nextOrderStatus[order.status];
          if (next) return updateOrderStatus(orderId, next);
        }
      } else {
        const prevOrderStatus: Record<string, KitchenOrder['status']> = {
          preparing: 'pending', ready: 'preparing', served: 'ready',
        };
        const prevStatus = prevOrderStatus[order.status];
        if (prevStatus) {
          const allReverted = updatedItems.every(it => {
            if (it.is_set_menu && it.set_items && it.set_items.length > 0) {
              return it.set_items.every((si: any) => (si.status || 'pending') === prevStatus);
            }
            return (it.status || 'pending') === prevStatus;
          });
          if (allReverted) return updateOrderStatus(orderId, prevStatus);
        }
      }
      return Promise.resolve();
    });
    await Promise.all(statusUpdates);
  };

  // Pending/Preparing 공통 그룹 카드 렌더링
  const renderGroupCard = (group: MenuGroup, idx: number, column: 'pending' | 'preparing') => {
    const totalQty = group.plainQty + group.optionSources.reduce((s, o) => s + o.quantity, 0);


    const plainLabelMap = new Map<string, number>();
    group.plainSources.forEach(s => {
      plainLabelMap.set(s.label, (plainLabelMap.get(s.label) || 0) + s.quantity);
    });
    const plainLabelText = Array.from(plainLabelMap.entries())
      .map(([label, qty]) => qty > 1 ? `${label} x${qty}` : label)
      .join(', ');

    const actionColor = column === 'pending' ? '#F59E0B' : '#3B82F6';
    const isSingle = totalQty <= 1;
    const actionLabel = column === 'pending'
      ? (isSingle ? 'Start' : 'Start All')
      : (isSingle ? 'Done' : 'Done All');
    return (
      <GroupCard key={`${column}-group-${idx}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <GroupMenuName>
            {group.formattedName}
            {totalQty > 1 && <ItemQty highlight>x {totalQty}</ItemQty>}
          </GroupMenuName>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {column === 'preparing' && (
              <RevertBtn style={{ padding: '10px 14px', fontSize: '14px' }}
                onClick={() => handleGroupBatch(group, 'revert', column)}>↺</RevertBtn>
            )}
            {column === 'pending' && (
              <RevertBtn style={{ padding: '10px 12px' }} title="Print Kitchen Ticket"
                onClick={() => printGroupTicket(group)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              </RevertBtn>
            )}
            <ActionBtn color={actionColor} solid={isSingle} style={{ flex: 'none', padding: '10px 20px', fontSize: '14px' }}
              onClick={() => handleGroupBatch(group, 'forward', column)}>
              {actionLabel}
            </ActionBtn>
          </div>
        </div>

        {group.plainQty > 0 && (
          <GroupOrderList>{plainLabelText}</GroupOrderList>
        )}

        {group.optionSources.length > 0 && (
          <div style={{
            marginTop: 8,
            paddingTop: group.plainQty > 0 ? 8 : 0,
            borderTop: group.plainQty > 0 ? '1px solid #C7CED6' : 'none'
          }}>
            {group.optionSources.map((src, si) => (
              <div key={`opt-${si}`} style={{
                padding: '6px 0',
                borderBottom: si < group.optionSources.length - 1 ? '1px dashed #C7CED6' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280' }}>{src.label}</span>
                  <span style={{ fontSize: 11, color: '#6B7280' }}>{src.orderNumber}</span>
                  {src.quantity > 1 && <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280' }}>x{src.quantity}</span>}
                </div>
                  <OptionTags>
                    {src.options?.map((opt, i) => <OptionTag key={i}>{opt}</OptionTag>)}
                    {src.special_instructions && <SpecialTag>{src.special_instructions}</SpecialTag>}
                  </OptionTags>
                </div>
              ))}
            </div>
          )}
        </GroupCard>
      );
  };

  const renderItemViewPending = () => {
    return getItemViewPendingGroups().map((group, idx) => renderGroupCard(group, idx, 'pending'));
  };

  const renderItemViewPreparing = () => {
    // Preparing: 배치 기반 — Pending에서 보낸 카드 그대로 유지
    // 배치에 등록된 아이템은 배치별 카드로, 미등록 아이템(페이지 새로고침 등)은 Pending과 동일 그룹핑
    const groups: MenuGroup[] = [];
    const batchedItemIds = new Set<string>();

    // 1) 배치별 카드 생성
    preparingBatches.forEach(batch => {
      const group: MenuGroup = {
        menuName: batch.menuName,
        formattedName: batch.formattedName,
        plainQty: 0, plainSources: [], optionSources: [],
        earliestTime: new Date()
      };
      let hasItems = false;

      orders.filter(o => ['preparing', 'pending'].includes(o.status)).forEach(order => {
        const label = order.tableNumber
          ? (/[A-Za-z]/.test(String(order.tableNumber)) ? String(order.tableNumber) : `T${String(order.tableNumber).replace(/^T/i, '')}`)
          : order.pagerNumber
          ? `P${order.pagerNumber}`
          : `#${order.pickupNumber}`;

        order.items.forEach(item => {
          if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
            item.set_items.forEach(setItem => {
              if (!batch.itemIds.has(setItem.id!)) return;
              if ((setItem.status || 'pending') !== 'preparing') return;
              if (!isItemInSelectedStation(setItem.name)) return;
              batchedItemIds.add(setItem.id!);
              hasItems = true;
              group.plainQty += setItem.quantity;
              group.plainSources.push({
                orderId: order.id, itemId: setItem.id!, label, orderNumber: order.orderNumber,
                quantity: setItem.quantity, is_set_menu: true
              });
              if (order.orderTime < group.earliestTime) group.earliestTime = order.orderTime;
            });
          } else {
            if (!batch.itemIds.has(item.id!)) return;
            if ((item.status || 'pending') !== 'preparing') return;
            if (!isItemInSelectedStation(item.name)) return;
            batchedItemIds.add(item.id!);
            hasItems = true;
            if (order.orderTime < group.earliestTime) group.earliestTime = order.orderTime;
            const regularOptions = item.options?.filter(opt => !/^.+\sx\d+$/.test(opt)) || [];
            const hasCustomization = regularOptions.length > 0 || !!item.special_instructions;
            if (hasCustomization) {
              group.optionSources.push({
                orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
                quantity: item.quantity, options: regularOptions,
                special_instructions: item.special_instructions
              });
            } else {
              group.plainQty += item.quantity;
              group.plainSources.push({
                orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
                quantity: item.quantity
              });
            }
          }
        });
      });

      if (hasItems) groups.push(group);
    });

    // 2) 배치에 없는 preparing 아이템 — 각각 개별 카드 (합치지 않음)
    orders.filter(o => o.status === 'preparing').forEach(order => {
      const label = order.tableNumber
        ? (/[A-Za-z]/.test(String(order.tableNumber)) ? String(order.tableNumber) : `T${String(order.tableNumber).replace(/^T/i, '')}`)
        : order.pagerNumber
        ? `P${order.pagerNumber}`
        : `#${order.pickupNumber}`;

      order.items.forEach(item => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          item.set_items.forEach(setItem => {
            if (batchedItemIds.has(setItem.id!)) return;
            if ((setItem.status || 'pending') !== 'preparing') return;
            if (!isItemInSelectedStation(setItem.name)) return;
            groups.push({
              menuName: setItem.name, formattedName: formatItemName(setItem.name),
              plainQty: setItem.quantity,
              plainSources: [{
                orderId: order.id, itemId: setItem.id!, label, orderNumber: order.orderNumber,
                quantity: setItem.quantity, is_set_menu: true
              }],
              optionSources: [],
              earliestTime: order.orderTime
            });
          });
        } else {
          if (batchedItemIds.has(item.id!)) return;
          if ((item.status || 'pending') !== 'preparing') return;
          if (!isItemInSelectedStation(item.name)) return;
          const regularOptions = item.options?.filter(opt => !/^.+\sx\d+$/.test(opt)) || [];
          const hasCustomization = regularOptions.length > 0 || !!item.special_instructions;
          groups.push({
            menuName: item.name, formattedName: formatItemName(item.name),
            plainQty: hasCustomization ? 0 : item.quantity,
            plainSources: hasCustomization ? [] : [{
              orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
              quantity: item.quantity
            }],
            optionSources: hasCustomization ? [{
              orderId: order.id, itemId: item.id!, label, orderNumber: order.orderNumber,
              quantity: item.quantity, options: regularOptions,
              special_instructions: item.special_instructions
            }] : [],
            earliestTime: order.orderTime
          });
        }
      });
    });

    groups.sort((a, b) => a.earliestTime.getTime() - b.earliestTime.getTime());
    return groups.map((group, idx) => renderGroupCard(group, idx, 'preparing'));
  };

  // ─── Item View: Ready (주문 단위, preparing 중 부분 ready 포함) ──

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readyOrdersMemo = useMemo(() => {
    return orders
      .filter(o => ['pending', 'preparing', 'ready'].includes(o.status))
      .filter(o => !areAllItemsServed(o))
      .filter(orderHasStationItems)
      .filter(o => {
        return o.items.some(item => {
          if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
            return item.set_items.some(si => si.status === 'ready' || si.status === 'served' || si.status === 'completed');
          }
          return item.status === 'ready' || item.status === 'served' || item.status === 'completed';
        });
      })
      .sort((a, b) => a.orderTime.getTime() - b.orderTime.getTime());
  }, [orders, orderHasStationItems]);

  const getItemViewReadyOrders = () => readyOrdersMemo;

  const renderItemViewReady = () => {
    const readyOrders = getItemViewReadyOrders();
    return readyOrders.map(order => {
      const elapsedTime = getElapsedTime(order.orderTime);
      const statusColor = '#10B981';

      // 전체 아이템/ready 아이템 카운트
      let totalItems = 0;
      let readyItems = 0;
      let servedItems = 0;
      const allFlatItems: Array<{
        id: string;
        parentId?: string;
        name: string;
        quantity: number;
        options?: string[];
        special_instructions?: string;
        status: string;
        isSetItem: boolean;
      }> = [];

      order.items.forEach(item => {
        if (item.is_set_menu && item.set_items && item.set_items.length > 0) {
          item.set_items.forEach(si => {
            // Station 필터: 선택된 Station 아이템만 포함
            if (selectedStation !== 'all' && !isItemInSelectedStation(si.name)) return;
            totalItems++;
            const st = si.status || 'pending';
            if (st === 'ready') readyItems++;
            if (st === 'served' || st === 'completed') servedItems++;
            allFlatItems.push({
              id: si.id!, parentId: item.id, name: si.name,
              quantity: si.quantity, status: st, isSetItem: true
            });
          });
        } else {
          // Station 필터: 선택된 Station 아이템만 포함
          if (selectedStation !== 'all' && !isItemInSelectedStation(item.name)) return;
          totalItems++;
          const st = item.status || 'pending';
          if (st === 'ready') readyItems++;
          if (st === 'served' || st === 'completed') servedItems++;
          allFlatItems.push({
            id: item.id!, name: item.name, quantity: item.quantity,
            options: item.options?.filter(opt => !/^.+\sx\d+$/.test(opt)),
            special_instructions: item.special_instructions,
            status: st, isSetItem: false
          });
        }
      });

      const waitingCount = totalItems - readyItems - servedItems;
      const progressPercent = totalItems > 0 ? (servedItems / totalItems) * 100 : 0;

      // ready/served 아이템만 표시 (preparing/pending은 "waiting"으로)
      const visibleItems = allFlatItems.filter(i => i.status === 'ready' || i.status === 'served' || i.status === 'completed');

      // ready/served 아이템이 하나도 없으면 카드 표시 안 함
      if (visibleItems.length === 0) return null;

      return (
        <OrderCard key={order.id}>
          <OrderHeader>
            <OrderLeft>
              <OrderNumber>
                {order.tableNumber ? (/[A-Za-z]/.test(String(order.tableNumber)) ? String(order.tableNumber) : `T${String(order.tableNumber).replace(/^T/i, '')}`) :
                 order.pagerNumber ? `P${order.pagerNumber}` : `#${order.pickupNumber}`}
              </OrderNumber>
              {order.orderType === 'takeaway' && <OrderTypeBadge>{t('kitchen:kitchenDisplayPage.takeaway')}</OrderTypeBadge>}
              {order.orderType === 'pickup' && (
                <OrderTypeBadge variant="pickup">
                  PICKUP {order.scheduledPickupTime ? formatPickupTimeRange(order.scheduledPickupTime, operationSettings?.timeZone) : 'ASAP'}
                </OrderTypeBadge>
              )}
              {order.orderType === 'delivery' && <OrderTypeBadge variant="delivery">{t('kitchen:kitchenDisplayPage.delivery')}</OrderTypeBadge>}
            </OrderLeft>
            <OrderRight>
              <OrderId>{order.orderNumber}</OrderId>
              <ElapsedTime>{elapsedTime}m</ElapsedTime>
            </OrderRight>
          </OrderHeader>

          {/* Progress - 아이템 2개 이상일 때만 */}
          {totalItems > 1 && (
            <ProgressContainer>
              <ProgressBar>
                <ProgressFill percent={progressPercent} color={statusColor} />
              </ProgressBar>
              <ProgressText>{servedItems}/{totalItems}</ProgressText>
            </ProgressContainer>
          )}

          {/* Ready/Served 아이템 */}
          <ItemsContainer>
            {visibleItems.map((fi, idx) => {
              const isServed = fi.status === 'served' || fi.status === 'completed';
              return (
                <ItemRow key={idx} done={isServed}>
                  <ItemInfo>
                    <ItemName done={isServed}>
                      {formatItemName(fi.name)} {fi.quantity > 1 && <ItemQty highlight done={isServed}>x {fi.quantity}</ItemQty>}
                    </ItemName>
                    {((fi.options && fi.options.length > 0) || fi.special_instructions) && (
                      <OptionTags>
                        {fi.options?.map((opt, i) => <OptionTag key={i} done={isServed}>{opt}</OptionTag>)}
                        {fi.special_instructions && <SpecialTag done={isServed}>{fi.special_instructions}</SpecialTag>}
                      </OptionTags>
                    )}
                  </ItemInfo>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {!isServed && (
                      <RevertBtn style={{ padding: '6px 10px', fontSize: '12px' }}
                        onClick={async () => {
                          const updatedItems = order.items.map(it => {
                            if (fi.isSetItem && fi.parentId && it.id === fi.parentId && it.set_items) {
                              return { ...it, set_items: it.set_items.map(si => si.id === fi.id ? { ...si, status: 'preparing' } : si) };
                            }
                            if (!fi.isSetItem && it.id === fi.id) {
                              return { ...it, status: 'preparing' };
                            }
                            return it;
                          });

                          // 즉시 UI 반영
                          setOrders(prev => prev.map(o => o.id === order.id ? { ...o, items: updatedItems as any } : o));

                          // 배치 등록 (Ready→Preparing 되돌린 아이템은 개별 카드로)
                          setPreparingBatches(prev => [...prev, {
                            batchId: `batch-revert-${Date.now()}`,
                            menuName: fi.name,
                            formattedName: formatItemName(fi.name),
                            itemIds: new Set([fi.id])
                          }]);

                          // API call: items 먼저, 필요시 order status
                          try {
                            const response = await fetch(`/api/orders/${order.id}/items`, {
                              method: 'PATCH', credentials: 'include',
                              headers: apiHeaders(),
                              body: JSON.stringify(kdsBody({ order_items: updatedItems }))
                            });
                            const result = await response.json();
                            if (!result.success) { fetchOrders(); return; }

                            // ready/served 아이템이 하나도 없으면 주문을 preparing으로
                            const hasReadyOrServed = updatedItems.some(it => {
                              if (it.is_set_menu && it.set_items && it.set_items.length > 0) {
                                return it.set_items.some(si => si.status === 'ready' || si.status === 'served' || si.status === 'completed');
                              }
                              return it.status === 'ready' || it.status === 'served' || it.status === 'completed';
                            });
                            if (!hasReadyOrServed && order.status === 'ready') {
                              await updateOrderStatus(order.id, 'preparing');
                            }
                          } catch { fetchOrders(); }
                        }}>↺</RevertBtn>
                    )}
                    <ItemActionButton
                      done={isServed}
                      statusColor={statusColor}
                      onClick={() => {
                        if (fi.isSetItem && fi.parentId) {
                          updateSetItemStatus(order.id, fi.parentId, fi.id);
                        } else {
                          updateItemStatus(order.id, fi.id);
                        }
                      }}
                    >
                      {isServed ? 'Served' : 'Serve'}
                    </ItemActionButton>
                  </div>
                </ItemRow>
              );
            })}
          </ItemsContainer>

          {/* Waiting 표시 */}
          {waitingCount > 0 && (
            <div style={{ marginTop: 8, padding: '6px 10px', background: '#FEF3C7', borderRadius: 4, fontSize: 12, fontWeight: 600, color: '#D97706', textAlign: 'center' }}>
              Waiting {waitingCount} item{waitingCount > 1 ? 's' : ''} from kitchen
            </div>
          )}

          {/* Serve All (아이템 2개 이상 + 모든 아이템 ready일 때만) */}
          {waitingCount === 0 && visibleItems.length > 1 && visibleItems.some(i => i.status === 'ready') && (
            <ActionRow>
              <ActionBtn color="#10B981" onClick={() => markAllServed(order.id)}>{t('kitchen:kitchenDisplayPage.serveAll')}</ActionBtn>
            </ActionRow>
          )}
        </OrderCard>
      );
    });
  };

  // Active KDS performer — uses the per-station PIN staff if signed in, otherwise
  // falls back to the currently logged-in user (RA). audit log uses this identity.
  const activePerformerName = kdsStaff?.name || user?.name || user?.full_name || user?.username || 'Staff';

  return (
    <Container>
      <PageHeader
        title="Kitchen Display"
        backHref={user?.restaurantId ? `/restaurant/${user.restaurantId}/dashboard` : undefined}
        settingsHref={user?.restaurantId ? `/restaurant/${user.restaurantId}/settings?tab=kitchenStations` : undefined}
        settingsLabel="Kitchen station settings"
      >
        <HeaderInfo>
          {/* 1) Merge meta — 가장 앞 (item view 전용, order view 에서는 자리 차지 X
                 → tab 위치 흔들림 방지를 위해 가장 앞으로 두어 다른 요소들이 흔들리지 않음) */}
          {viewMode === 'item' && (
            <a
              href={`/restaurant/${user?.restaurantId}/settings?tab=kitchenStations`}
              target="_blank"
              rel="noopener noreferrer"
              title={t('kitchen:mergeTooltip', 'Configure item merge settings')}
              style={{
                display: 'inline-flex', flexDirection: 'column',
                alignItems: 'flex-start', lineHeight: 1.2,
                padding: '4px 10px',
                background: '#F0F0FF', color: '#635BFF',
                borderRadius: 8, textDecoration: 'none', border: 'none'
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                {t('kitchen:mergeLabel', 'Merge')}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
                {(itemMergeSettings.time_limit > 0 || itemMergeSettings.max_count > 0)
                  ? `${itemMergeSettings.time_limit > 0 ? itemMergeSettings.time_limit + 'min' : ''}${itemMergeSettings.time_limit > 0 && itemMergeSettings.max_count > 0 ? ' · ' : ''}${itemMergeSettings.max_count > 0 ? 'max ' + itemMergeSettings.max_count : ''}`
                  : t('kitchen:mergeNoLimit', 'No limit')}
                {' ⚙'}
              </span>
            </a>
          )}

          {/* 2) View toggle (Order / Item) */}
          <ViewToggle>
            <ViewToggleBtn active={viewMode === 'order'} onClick={() => { setViewMode('order'); localStorage.setItem('kitchenDisplayViewMode', 'order'); }}>{t('kitchen:kitchenDisplayPage.order')}</ViewToggleBtn>
            <ViewToggleBtn active={viewMode === 'item'} onClick={() => { setViewMode('item'); localStorage.setItem('kitchenDisplayViewMode', 'item'); }}>{t('kitchen:kitchenDisplayPage.item')}</ViewToggleBtn>
          </ViewToggle>

          {/* 3) Station chips — many stations on small tablets: overflow-x scroll */}
          {kitchenStations.length > 0 && (
            <ViewToggle style={{
              maxWidth: 'min(440px, 36vw)',
              overflowX: 'auto',
              flexWrap: 'nowrap'
            }}>
              <ViewToggleBtn active={selectedStation === 'all'} onClick={() => { setSelectedStation('all'); setSearchParams({}); }}>{t('kitchen:kitchenDisplayPage.all')}</ViewToggleBtn>
              {kitchenStations.map((s) => (
                <ViewToggleBtn key={s.id} active={selectedStation === s.id} onClick={() => { setSelectedStation(s.id); setSearchParams({ station: String(s.id) }); }}>{s.name}</ViewToggleBtn>
              ))}
            </ViewToggle>
          )}

          {/* 4) Staff badge — 2 lines: name / Switch staff or Sign out */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            padding: '4px 12px',
            background: kdsStaff ? '#F0F4FF' : '#F1F4F8',
            borderRadius: 8,
            border: `1px solid ${kdsStaff ? '#DDD9FF' : '#C7CED6'}`,
            lineHeight: 1.2
          }}>
            <span style={{
              fontSize: 12, fontWeight: 600,
              color: kdsStaff ? '#3B30D9' : '#0A2540',
              whiteSpace: 'nowrap', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis'
            }}>
              {activePerformerName}
            </span>
            <button
              type="button"
              onClick={kdsStaff ? kdsLogout : () => setShowPinGate(true)}
              title={kdsStaff
                ? t('pin.logout', 'Sign out staff')
                : t('pin.switchStaffTitle', 'Sign in as a different kitchen staff for accurate audit logs')}
              style={{
                border: 'none', background: 'transparent', cursor: 'pointer',
                color: kdsStaff ? '#3B30D9' : '#4B5563',
                fontWeight: 500, fontSize: 10, padding: 0,
                marginTop: 2, textAlign: 'left', whiteSpace: 'nowrap'
              }}
            >
              {kdsStaff ? t('pin.logout', 'Sign out') : t('pin.switchStaff', 'Switch staff')}
            </button>
          </div>

          {/* 5) Sound toggle */}
          <button
            onClick={() => { setAudioEnabled(prev => { const next = !prev; localStorage.setItem('sound_enabled', String(next)); return next; }); }}
            title={audioEnabled ? 'Sound ON' : 'Sound OFF'}
            style={{
              width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
              background: audioEnabled ? '#635BFF' : '#C7CED6',
              transition: 'all 0.15s'
            }}
          >
            <img
              src={audioEnabled ? '/speaker-on.svg' : '/speaker-off.svg'}
              alt={audioEnabled ? 'Sound ON' : 'Sound OFF'}
              style={{
                width: 16, height: 16,
                filter: audioEnabled ? 'invert(1)' : 'opacity(0.4)'
              }}
            />
          </button>

          {/* 6) Live + Time — 끝쪽, Settings ⚙ 직전. 2줄 컴팩트. */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            lineHeight: 1.15, marginLeft: 4
          }}>
            <ConnectionStatus connected={isConnected} style={{ padding: '2px 8px', fontSize: 11 }}>
              <ConnectionDot connected={isConnected} />
              {isConnected ? 'Live' : 'Offline'}
            </ConnectionStatus>
            <div style={{ marginTop: 4 }}>
              <LiveClock operationSettings={operationSettings} />
            </div>
          </div>
        </HeaderInfo>
      </PageHeader>

      <ContentArea>
      <KanbanBoard>
        {/* Pending */}
        <Column>
          <ColumnHeader status="pending">
            <ColumnTitleGroup>
              <ColumnTitle status="pending">{t('kitchen:kitchenDisplayPage.pending')}</ColumnTitle>
            </ColumnTitleGroup>
            <ColumnCount color="#F59E0B">
              {viewMode === 'order'
                ? <><CountNumber>{counts.pending}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.orders')}</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getOrderItemCount('pending')}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.items')}</CountLabel></>
                : <><CountNumber>{getItemViewPendingGroups().length}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.menus')}</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getItemStatusCount('pending')}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.items')}</CountLabel></>
              }
            </ColumnCount>
          </ColumnHeader>
          <OrdersContainer>
            {viewMode === 'order'
              ? getOrdersByStatus('pending').map(renderOrderCard)
              : renderItemViewPending()
            }
          </OrdersContainer>
        </Column>

        {/* Preparing */}
        <Column>
          <ColumnHeader status="preparing">
            <ColumnTitleGroup>
              <ColumnTitle status="preparing">{t('kitchen:kitchenDisplayPage.preparing')}</ColumnTitle>
            </ColumnTitleGroup>
            <ColumnCount color="#3B82F6">
              {viewMode === 'order'
                ? <><CountNumber>{counts.preparing}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.orders')}</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getOrderItemCount('preparing')}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.items')}</CountLabel></>
                : <><CountNumber>{getItemStatusCount('preparing')}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.menus')}</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getItemStatusCount('preparing')}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.items')}</CountLabel></>
              }
            </ColumnCount>
          </ColumnHeader>
          <OrdersContainer>
            {viewMode === 'order'
              ? getOrdersByStatus('preparing').map(renderOrderCard)
              : renderItemViewPreparing()
            }
          </OrdersContainer>
        </Column>

        {/* Ready */}
        <Column>
          <ColumnHeader status="ready">
            <ColumnTitleGroup>
              <ColumnTitle status="ready">{t('kitchen:kitchenDisplayPage.ready')}</ColumnTitle>
            </ColumnTitleGroup>
            <ColumnCount color="#10B981">
              {viewMode === 'order'
                ? <><CountNumber>{counts.ready}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.orders')}</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getOrderItemCount('ready')}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.items')}</CountLabel></>
                : <><CountNumber>{getItemViewReadyOrders().length}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.orders')}</CountLabel><span style={{ margin: '0 2px', opacity: 0.4 }}>/</span><CountNumber>{getItemStatusCount('ready')}</CountNumber><CountLabel>{t('kitchen:kitchenDisplayPage.items')}</CountLabel></>
              }
            </ColumnCount>
          </ColumnHeader>
          <OrdersContainer>
            {viewMode === 'order'
              ? getOrdersByStatus('ready').map(renderOrderCard)
              : renderItemViewReady()
            }
          </OrdersContainer>
        </Column>
      </KanbanBoard>
      </ContentArea>

      {showPinGate && (
        <KdsPinGate
          onAuthenticated={(s) => { kdsLogin(s); setShowPinGate(false); }}
          onCancel={() => setShowPinGate(false)}
          stationName={selectedStation === 'all' ? undefined : kitchenStations.find(s => s.id === selectedStation)?.name}
        />
      )}

      {historyOrderId !== null && (
        <div
          onClick={() => setHistoryOrderId(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 12, padding: 24,
              width: 560, maxWidth: 'calc(100vw - 32px)',
              maxHeight: '80vh', overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0A2540' }}>
                {t('history.title', 'Order History')}
              </div>
              <button
                type="button"
                onClick={() => setHistoryOrderId(null)}
                style={{
                  border: 'none', background: '#C7CED6', color: '#0A2540',
                  borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer'
                }}
              >
                {t('history.close', 'Close')}
              </button>
            </div>
            <OrderActionHistory orderId={historyOrderId} timeZone={operationSettings?.timeZone} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default KitchenDisplayPage;
