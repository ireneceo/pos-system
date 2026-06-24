import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import PageHeader from '../../components/Common/PageHeader';
import { useAuth } from '../../contexts/AuthContext';
import { getTableLabel, FloorPlanLike } from '../../utils/tableLabel';
import PaymentModal from '../../components/POSTerminal/PaymentModal';
import OptionModal from '../../components/POSTerminal/OptionModal';
import VoidPinModal from '../../components/POSTerminal/VoidPinModal';
import { useStore } from '../../contexts/StoreContext';
import { OrdersRealtimeProvider, useOrdersRealtime } from '../../contexts/OrdersRealtimeContext';
import { formatCurrency } from '../../utils/currency';
import { formatPaymentDisplay } from '../../constants';
import {
  DataTable,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  DataTableEmpty,
  DataTableAmount,
  Modal as CommonModal
} from '../../components/UI';
import { printBillViaRawBT, printKitchenTicketViaRawBT, printCancellationTicket, printCancellationTicketsByStation } from '../../utils/billPrint';
import KitchenTicketSendModal, { previewStationBuckets, KitchenTicketSendPrompt } from '../../components/Print/KitchenTicketSendModal';
import { formatDateTime as formatDateTimeUtil } from '../../utils/timezone';
import ConfirmModal from '../../components/ConfirmModal';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import DailySettlementPrint from '../Reports/DailySettlementPrint';
import CashDrawerModal from '../../components/CashManagement/CashDrawerModal';
import FinalSettlementModal from '../../components/CashManagement/FinalSettlementModal';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

import { DbOrder, CompanyInfo } from './types';
import { formatPickupTimeRange, getFetchOptions, TimeAgoDisplay } from './helpers';
import { getServedDurationMin } from '../../utils/prepTimer';
import {
  Container, Content, AudioToggleButton, SelectModeButton, MergeButton,
  FilterToolbar, SearchInputContainer, SearchInput, ClearSearchButton,
  DownloadButton, SearchIcon, StatusTabs, StatusTab, TabBadge,
  StatisticsBar, StatItem, OrdersCard, OrderNumber, OrderTypeBadge,
  CustomerInfo, ItemsList, ItemWithOptions, ItemQuantity, ItemOptionsInline,
  StatusBadge, TimeInfo, PaymentMethod, ActionButton,
  IconButton, ActionButtonsGroup, IconSymbol,
  ToastContainer, ToastMessage, ToastCloseBtn,
  PrintStyles,
  PaginationContainer, PaginationInfo, PaginationControls, PageButton
} from './styles';
import OrderDetailModal from './OrderDetailModal';
import BillPrintPortal from './BillPrintPortal';
import PaymentVerificationModal from './PaymentVerificationModal';

// PeriodType imported from DatePeriodFilter component

const LiveOrdersPage: React.FC = () => {
  const { t } = useTranslation('orders');
  const { user, canTakePayment, canVoid } = useAuth();
  const { getStoreInfo, operationSettings, paymentSettings } = useStore();

  // ── 공용 실시간 주문 스토어 (2026-06-12, 단일 소스) ─────────────────────────
  // 오늘(라이브) 범위는 OrdersRealtimeProvider 가 단일 fetch + 소켓 단일 reducer 로
  // 유지한다. 이 화면은 탭/검색 필터링만. 과거 날짜 조회(히스토리)는 변하지 않는
  // 데이터라 기존 서버 fetch 경로(historicalOrders)를 유지한다.
  const {
    orders: rtOrders,
    connected: rtConnected,
    refetch: refetchOrders,
    applyOrder,
    removeOrder,
    subscribe: subscribeOrders,
  } = useOrdersRealtime();
  const [historicalOrders, setHistoricalOrders] = useState<DbOrder[]>([]); // 과거 기간 조회 전용
  const [orderCounts, setOrderCounts] = useState<{
    all: number; outstanding: number; pending: number; preparing: number;
    ready: number; served: number; completed: number; cancelled: number;
  }>({ all: 0, outstanding: 0, pending: 0, preparing: 0, ready: 0, served: 0, completed: 0, cancelled: 0 });
  const [serverStats, setServerStats] = useState<{
    totalSales: number; avgAmount: number; maxAmount: number; orderCount: number;
  }>({ totalSales: 0, avgAmount: 0, maxAmount: 0, orderCount: 0 });
  const [salesThreshold, setSalesThreshold] = useState(20);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<DbOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelOther, setCancelOther] = useState<string | null>(null); // 'Other' 선택 시 직접 입력 (null=미선택)
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
  const [showDeleteItemConfirm, setShowDeleteItemConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ index: number; name: string } | null>(null);
  // 손실방지 PIN 게이트 — requireVoidPin 매장에서 삭제/취소 전 권한 PIN 확인.
  // run(pin) = PIN 통과 후 실행할 실제 삭제/취소 동작. null = 모달 닫힘.
  const [voidGate, setVoidGate] = useState<{ run: (pin: string) => void } | null>(null);
  // S1 autoPrint OFF(수동) 매장: 취소/아이템취소 후 "주방에 취소 티켓 인쇄?" 확인 프롬프트.
  const [cancelPrintPrompt, setCancelPrintPrompt] = useState<KitchenTicketSendPrompt | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderForPayment, setOrderForPayment] = useState<DbOrder | null>(null);
  const [, ] = useState(false);
  const [, ] = useState<any>(null);
  const [showReceiptView, setShowReceiptView] = useState(false);
  const [showKitchenTicketView, setShowKitchenTicketView] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalCount, setTotalCount] = useState(0);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [receiptSettings, setReceiptSettings] = useState<{ receiptLogo: string; footerMessage: string; showMembership: boolean; customQrImage: string; customQrText: string; customQrPosition: string }>({ receiptLogo: '', footerMessage: '', showMembership: false, customQrImage: '', customQrText: '', customQrPosition: 'back' });
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [timeDisplayKey, setTimeDisplayKey] = useState(0); // Time display update key
  // 사운드: 기기별 mute 키는 Live Orders 전용(KDS 와 분리 — 더 이상 공유 안 함).
  // 종류·매장단위 on/off 는 Settings(operation_settings.orderSounds.newOrder — 통합 새 주문음).
  // 레거시(liveOrders) 폴백 유지. 기기별 mute 는 liveorders_sound_enabled.
  const [localSoundOn, setLocalSoundOn] = useState(() => localStorage.getItem('liveorders_sound_enabled') !== 'false');
  const _newOrderSound = operationSettings?.orderSounds?.newOrder || operationSettings?.orderSounds?.liveOrders;
  const liveSoundType = (_newOrderSound?.type || 'bell') as any;
  const audioEnabled = (_newOrderSound?.enabled !== false) && localSoundOn;

  // Membership settings (used by PaymentModal for membership info display)
  const [membershipSettings, setMembershipSettings] = useState<any>(null);

  // Date filter state (default to 'today')
  const [activePeriod, setActivePeriod] = useState<PeriodType>('today');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('today', operationSettings.timeZone));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettlement, setShowSettlement] = useState(false);
  const [showCashDrawer, setShowCashDrawer] = useState(false);
  const [showFinalSettlement, setShowFinalSettlement] = useState(false);

  // 라이브 스코프 = 오늘 + 커스텀 기간 아님 → 공용 실시간 스토어 사용 (소켓 in-place).
  // 과거/커스텀 기간 → historicalOrders (변하지 않는 데이터, 서버 fetch).
  const isLiveScope = activePeriod === 'today' && !isCustomDateRange;
  const orders = React.useMemo<DbOrder[]>(() => {
    const base = isLiveScope ? (rtOrders as DbOrder[]) : historicalOrders;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return base;
    // 서버 search 와 동일 필드(order_number/customer_name/customer_phone/table_number) 클라 필터
    return base.filter(o => [o.order_number, o.customer_name, o.customer_phone, o.table_number]
      .some(v => (v || '').toString().toLowerCase().includes(q)));
  }, [isLiveScope, rtOrders, historicalOrders, searchQuery]);

  // 낙관 갱신 — 라이브 스코프는 공용 스토어에, 히스토리는 로컬 state 에 반영.
  const patchOrderLocal = useCallback((orderId: number, patch: Partial<DbOrder>) => {
    const inRt = rtOrders.find((o: any) => o.id === orderId);
    if (inRt) applyOrder({ ...inRt, ...patch });
    setHistoricalOrders(prev => prev.map(o => o.id === orderId ? { ...o, ...patch } : o));
  }, [rtOrders, applyOrder]);

  // Payment Verification Modal (for Confirm button in table list)
  const [verifyOrder, setVerifyOrder] = useState<DbOrder | null>(null);

  // Select Mode for merging orders
  const [selectMode, setSelectMode] = useState(false);
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [mergeTargetOrderId, setMergeTargetOrderId] = useState<number | null>(null);

  // Add Items View state (inside order detail modal)
  const [showAddItemsView, setShowAddItemsView] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [, setMenuCategories] = useState<any[]>([]);
  const [, setAddItemsSelectedCategory] = useState<string | null>(null);
  const [addItemsCart, setAddItemsCart] = useState<any[]>([]);
  const [isAddingItems, setIsAddingItems] = useState(false);
  const [addItemsSearchQuery, setAddItemsSearchQuery] = useState('');
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedMenuItemForOption, setSelectedMenuItemForOption] = useState<any>(null);


  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // New items added notification (for merged orders)
  const [itemsAddedAlert, setItemsAddedAlert] = useState<{
    isVisible: boolean;
    orderId: number | null;
    orderNumber: string;
    tableNumber: string | null;
    orderGroup: number;
    itemCount: number;
    viaTableMove?: boolean;              // 테이블이동 머지 → "Orders Merged" 표기
    mergedFromTable?: string | null;
    mergedFromOrderNumber?: string | null;
  } | null>(null);


  // Show toast notification
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 4000);
  }, []);

  // Audio notification for new orders (repeats until status change)
  const playNotificationSound = useCallback(() => {
    if (!audioEnabled) return;
    import('../../utils/notificationSound').then(({ startRepeatingSound }) => {
      startRepeatingSound(liveSoundType, 3000);
    });
  }, [audioEnabled, liveSoundType]);

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

  // Update time display key every 10 seconds to trigger re-render of TimeAgoDisplay components
  useEffect(() => {
    // 즉시 한 번 업데이트
    setTimeDisplayKey(prev => prev + 1);

    // 10초마다 업데이트하여 모든 시간 표시를 갱신
    const timer = setInterval(() => {
      setTimeDisplayKey(prev => prev + 1);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // Fetch orders — 라이브 스코프(오늘)는 공용 스토어 재동기화로 위임, 과거/커스텀 기간만
  // 서버 fetch (변하지 않는 데이터). 호출부 계약(액션 실패 시 보정 등)은 그대로 유지.
  const fetchOrders = useCallback(async () => {
    if (!user?.restaurantId) return;

    if (isLiveScope) {
      await refetchOrders();
      setIsLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '1000',
        includeCompleted: 'true'
      });

      // Add status filter based on active tab (server-side filtering)
      if (activeTab !== 'all' && activeTab !== 'outstanding') {
        params.append('status', activeTab);
      }

      // Add date filter
      if (dateRange.start) params.append('startDate', dateRange.start);
      if (dateRange.end) params.append('endDate', dateRange.end);

      // Add search filter
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const response = await fetch(
        `/api/orders/restaurant/${user.restaurantId}?${params}`,
        getFetchOptions()
      );
      const result = await response.json();

      if (result.success && result.data) {
        setHistoricalOrders(result.data);
        if (result.pagination) {
          setCurrentPage(result.pagination.currentPage);
          setTotalPages(result.pagination.totalPages);
          setTotalCount(result.pagination.totalCount);
        }
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.restaurantId, dateRange.start, dateRange.end, searchQuery, activeTab, isLiveScope, refetchOrders]);

  // Fetch order counts for tab badges (optimized - no full data fetch)
  const fetchOrderCounts = useCallback(async () => {
    if (!user?.restaurantId) return;

    try {
      const params = new URLSearchParams();
      if (dateRange.start) params.append('startDate', dateRange.start);
      if (dateRange.end) params.append('endDate', dateRange.end);

      const response = await fetch(
        `/api/orders/restaurant/${user.restaurantId}/counts?${params}`,
        getFetchOptions()
      );
      const result = await response.json();

      if (result.success && result.data?.counts) {
        setOrderCounts(result.data.counts);
      }
      if (result.success && result.data?.statistics) {
        setServerStats(result.data.statistics);
      }
    } catch (error) {
      console.error('Failed to fetch order counts:', error);
    }
  }, [user?.restaurantId, dateRange.start, dateRange.end]);

  // Fetch membership settings
  const fetchMembershipSettings = useCallback(async () => {
    if (!user?.restaurantId) return;
    try {
      const response = await fetch(`/api/membership/settings/${user.restaurantId}`, getFetchOptions());
      const result = await response.json();
      if (result.success && result.data) {
        setMembershipSettings(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch membership settings:', error);
    }
  }, [user?.restaurantId]);


  // Checkout Display 소켓
  const checkoutSocketRef = useRef<any>(null);
  useEffect(() => {
    if (!user?.restaurantId) return;
    const cs = io('/checkout-display', { transports: ['websocket', 'polling'], auth: { token: getAuthToken() } });
    cs.on('connect', () => cs.emit('join-restaurant', user.restaurantId));
    checkoutSocketRef.current = cs;
    return () => { cs.disconnect(); };
  }, [user?.restaurantId]);

  // Store playNotificationSound in ref to avoid subscribe-effect churn on audio state changes
  const playNotificationSoundRef = useRef(playNotificationSound);
  const fetchOrderCountsRef = useRef(fetchOrderCounts);
  useEffect(() => {
    playNotificationSoundRef.current = playNotificationSound;
  }, [playNotificationSound]);
  useEffect(() => {
    fetchOrderCountsRef.current = fetchOrderCounts;
  }, [fetchOrderCounts]);
  // ── 실시간 갱신 (2026-06-12, 공용 스토어 전환) ───────────────────────────────
  // 주문 데이터 in-place 갱신·30s 안전 폴링·재연결 재동기화는 OrdersRealtimeProvider 가
  // 담당한다. 여기는 표시 전용 구독만: 알림음 / 탭 카운트 / 추가주문 배너.
  // (이전엔 order-items-added 가 배너만 띄우고 주문 데이터를 안 갱신해 추가 품목이
  //  리프레시 전까지 안 보였다 — 공용 reducer 가 동행 order-updated 로 즉시 갱신.)
  useEffect(() => {
    const offCreated = subscribeOrders('order-created', (order: any) => {
      setOrderCounts(prev => ({
        ...prev,
        all: prev.all + 1,
        [order.status]: (prev[order.status as keyof typeof prev] || 0) + 1
      }));
      playNotificationSoundRef.current();
      fetchOrderCountsRef.current(); // Refresh stats (Total Sales, Avg, Max)
      window.dispatchEvent(new Event('refreshBadgeCounts'));
    });
    const offUpdated = subscribeOrders('order-updated', () => {
      fetchOrderCountsRef.current(); // 탭 카운트/통계는 서버 집계로 재동기화
      window.dispatchEvent(new Event('refreshBadgeCounts'));
    });
    const offDeleted = subscribeOrders('order-deleted', () => {
      fetchOrderCountsRef.current();
      window.dispatchEvent(new Event('refreshBadgeCounts'));
    });
    const offItemsAdded = subscribeOrders('order-items-added', (data: any) => {
      playNotificationSoundRef.current();
      fetchOrderCountsRef.current(); // Refresh stats (amount changed)
      // Show alert notification (stays until manually dismissed or View Order clicked)
      setItemsAddedAlert({
        isVisible: true,
        orderId: data.orderId,
        orderNumber: data.orderNumber,
        tableNumber: data.tableNumber,
        orderGroup: data.orderGroup,
        itemCount: data.itemCount,
        // 테이블이동 머지는 "추가주문"이 아니라 "주문 합침"으로 표기 (Irene 2026-06-12)
        viaTableMove: !!data.viaTableMove,
        mergedFromTable: data.mergedFromTable || null,
        mergedFromOrderNumber: data.mergedFromOrderNumber || null
      });
    });
    return () => { offCreated(); offUpdated(); offDeleted(); offItemsAdded(); };
  }, [subscribeOrders]);

  // (재)연결 시 탭 카운트 재동기화 — 주문 리스트는 Provider 가 connect 시 자체 재동기화.
  useEffect(() => {
    if (rtConnected) fetchOrderCountsRef.current();
  }, [rtConnected]);

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Fetch order counts for tab badges
  useEffect(() => {
    fetchOrderCounts();
  }, [fetchOrderCounts]);

  // Reset page to 1 when tab or date filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, dateRange.start, dateRange.end, activePeriod]);

  // Handle period change
  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRange(calculatePeriodDateRange(period, operationSettings.timeZone));
  };

  // Get filtered orders - server-side filtering is now used, this returns the orders directly
  const getFilteredOrders = () => {
    return orders;
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRange({ start, end });
  };

  // CSV Download function
  const handleDownloadCSV = async () => {
    const filtered = getFilteredOrders();

    if (filtered.length === 0) {
      showToast('No orders to download', 'info');
      return;
    }

    // 메뉴 데이터 로드 (카테고리 매칭용)
    let menuCategoryMap: Record<string, string> = {};
    try {
      const token = getAuthToken();
      const menuRes = await fetch(`/api/menu?restaurant_id=${user?.restaurantId}&excludeImage=true`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (menuRes.ok) {
        const menuData = await menuRes.json();
        const items = menuData.data?.items || [];
        const categories = menuData.data?.categories || [];
        const catMap: Record<number, string> = {};
        categories.forEach((c: any) => { catMap[c.id] = c.name; });
        items.forEach((item: any) => {
          const catName = catMap[item.category_id] || item.category || '';
          if (item.name) menuCategoryMap[item.name.toLowerCase()] = catName;
        });
      }
    } catch { /* silent — category will be empty */ }

    // CSV Headers
    const headers = [
      'Order Number', 'Date & Time', 'Customer Name', 'Phone', 'Order Type',
      'Table Number', 'Status', 'Payment Method', 'Payment Status',
      'Subtotal', 'Service Charge', 'Tax', 'Discount', 'Total Amount', 'Items', 'Item Details'
    ];

    // CSV Rows
    const rows = filtered.map(order => {
      const orderDate = new Date(order.order_date || order.createdAt);
      const formattedDate = formatDateTimeUtil(orderDate, operationSettings, {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true
      });

      const items = order.order_items?.map((item: any) =>
        `${item.quantity}x ${item.menu_item_name || item.name || 'Unknown'}`
      ).join('; ') || '';

      const itemDetails = order.order_items?.map((item: any) => {
        const name = item.menu_item_name || item.name || 'Unknown';
        const qty = item.quantity || 1;
        const category = item.category || item.category_name || menuCategoryMap[(name || '').toLowerCase()] || '';
        const price = item.price ? ` ${item.price}` : '';

        let optionsStr = '';
        if (item.options && Array.isArray(item.options) && item.options.length > 0) {
          optionsStr = ' (' + item.options.map((opt: any) =>
            typeof opt === 'string' ? opt : `${opt.name || opt.option_name}${opt.price ? ':' + opt.price : ''}`
          ).join(', ') + ')';
        }
        if (!optionsStr && item.selectedOptions && Array.isArray(item.selectedOptions) && item.selectedOptions.length > 0) {
          optionsStr = ' (' + item.selectedOptions.map((opt: any) =>
            typeof opt === 'string' ? opt : `${opt.name || opt.optionName}${opt.price ? ':' + opt.price : ''}`
          ).join(', ') + ')';
        }

        const categoryStr = category ? ` [${category}]` : '';
        return `${qty}x ${name}${categoryStr}${price}${optionsStr}`;
      }).join('; ') || '';

      const orderAny = order as any;

      return [
        order.order_number || '', formattedDate, order.customer_name || 'Guest',
        order.customer_phone || '', (order.order_type || '').replace('_', ' ').toUpperCase(),
        order.table_number || '', order.status || '', order.payment_method || '',
        order.payment_status || 'completed',
        formatCurrency(orderAny.subtotal || order.total_amount || 0, operationSettings.currency),
        formatCurrency(orderAny.service_charge || 0, operationSettings.currency),
        formatCurrency(orderAny.tax || 0, operationSettings.currency),
        formatCurrency(orderAny.discount || 0, operationSettings.currency),
        formatCurrency(order.total_amount || 0, operationSettings.currency),
        items, itemDetails
      ];
    });

    // Generate CSV content with UTF-8 BOM for Excel compatibility
    const csvContent = '\uFEFF' + [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `live_orders_${dateRange.start}_to_${dateRange.end}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Floor plan (v2 zone/group) — table_number 의 풀라벨 매핑용
  const [floorPlan, setFloorPlan] = useState<FloorPlanLike | null>(null);
  // Whether this restaurant uses table numbers at all. When OFF (e.g. food courts
  // with seating but no numbered tables, no takeaway), a dine-in order with no table
  // is NORMAL — show a plain "Dine-in", NOT the "no table assigned" attention.
  const [tableNumbersEnabled, setTableNumbersEnabled] = useState(true);

  // Load company information for bill printing
  useEffect(() => {
    const loadCompanyInfo = async () => {
      if (!user?.restaurantId) return;

      try {
        const response = await fetch(`/api/restaurants/${user.restaurantId}`, getFetchOptions());
        const result = await response.json();

        if (result.success || response.ok) {
          const data = result.data || result;
          if (data.floor_plan) setFloorPlan(data.floor_plan);
          setCompanyInfo({
            companyName: data.name || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            postcode: data.postal_code || '',
            phone: data.phone || '',
            email: data.email || '',
            taxNo: data.tax_id || '',
            slug: data.slug || ''
          });

          const ps = data.printer_settings;
          if (ps?.receiptSettings) {
            setReceiptSettings(prev => ({ ...prev, ...ps.receiptSettings }));
          }

          if (data.payment_settings) {
            setPaymentMethods(data.payment_settings);
          }

          const opSettings = typeof data.operation_settings === 'string'
            ? JSON.parse(data.operation_settings)
            : data.operation_settings;
          if (opSettings?.salesThreshold) {
            setSalesThreshold(opSettings.salesThreshold);
          }

          // Table-numbers usage (table_settings primary, operation_settings legacy fallback).
          const tsRaw = typeof data.table_settings === 'string'
            ? (() => { try { return JSON.parse(data.table_settings); } catch { return {}; } })()
            : (data.table_settings || {});
          const enableTN = tsRaw.enableTableNumbers ?? opSettings?.enableTableNumbers;
          setTableNumbersEnabled(enableTN !== false);
        }
      } catch (error) {
        console.error('Failed to load company info:', error);
      }
    };

    loadCompanyInfo();
    fetchMembershipSettings();
  }, [user?.restaurantId, fetchMembershipSettings]);

  // Helper function to determine if order is Outstanding (not yet sent to kitchen)
  const isOutstanding = (order: DbOrder) => {
    return order.status === 'outstanding';
  };

  // Helper function to get display status
  const getDisplayStatus = (order: DbOrder): string => {
    if ((order.payment_status as any) === 'rejected') return 'rejected';
    if ((order.payment_status as any) === 'payment_verification_pending') return 'verifying';
    return order.status;
  };

  // Format status for display
  const formatStatusDisplay = (status: string): string => {
    if (status === 'rejected') return 'Payment Rejected';
    if (status === 'verifying') return 'Verifying Payment';
    if (status === 'outstanding') return 'Outstanding';
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getFilteredOrdersByTab = () => {
    const dateFiltered = getFilteredOrders();
    let filtered;
    if (activeTab === 'all') {
      filtered = dateFiltered;
    } else if (activeTab === 'outstanding') {
      filtered = dateFiltered.filter(order => isOutstanding(order));
    } else {
      filtered = dateFiltered.filter(order => order.status === activeTab);
    }
    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.order_date).getTime();
      const dateB = new Date(b.createdAt || b.order_date).getTime();
      return dateB - dateA;
    });
  };

  // Calculate statistics from filtered orders
  const calculateStatistics = () => {
    const ordersForStats = getFilteredOrdersByTab().filter(order => order.status !== 'cancelled');

    if (ordersForStats.length === 0) {
      return { totalSales: 0, avgOrderAmount: 0, maxOrderAmount: 0, ordersAbove20Percent: 0, avgServeTime: 0, maxServeTime: 0, minServeTime: 0 };
    }

    const totalSales = ordersForStats.reduce((sum, order) => sum + parseFloat(order.total_amount.toString()), 0);
    const avgOrderAmount = totalSales / ordersForStats.length;
    const maxOrderAmount = Math.max(...ordersForStats.map(o => parseFloat(o.total_amount.toString())));
    const ordersAbove20 = ordersForStats.filter(o => parseFloat(o.total_amount.toString()) >= salesThreshold).length;
    const ordersAbove20Percent = (ordersAbove20 / ordersForStats.length) * 100;

    const servedOrders = ordersForStats.filter(o => o.served_at && o.createdAt);
    let avgServeTime = 0, maxServeTime = 0, minServeTime = 0;

    if (servedOrders.length > 0) {
      const serveTimes = servedOrders.map(o => {
        const created = new Date(o.createdAt).getTime();
        const served = new Date(o.served_at!).getTime();
        return (served - created) / 1000 / 60;
      });
      avgServeTime = serveTimes.reduce((sum, time) => sum + time, 0) / serveTimes.length;
      maxServeTime = Math.max(...serveTimes);
      minServeTime = Math.min(...serveTimes);
    }

    return { totalSales, avgOrderAmount, maxOrderAmount, ordersAbove20Percent, avgServeTime, maxServeTime, minServeTime };
  };

  const getStatusCount = (status: string) => {
    return orderCounts[status as keyof typeof orderCounts] || 0;
  };

  const handleStatusChange = async (orderId: number, newStatus: DbOrder['status'], setKitchenReady: boolean = false) => {
    stopSound();
    const now = new Date().toISOString();
    const oldStatus = orders.find(o => o.id === orderId)?.status;

    // Optimistically update UI immediately (공용 스토어/히스토리 양쪽 반영)
    {
      const cur = orders.find(o => o.id === orderId);
      patchOrderLocal(orderId, {
        status: newStatus,
        ...(setKitchenReady && { kitchen_ready: true }),
        ...((newStatus === 'served' || newStatus === 'completed') && !cur?.served_at && { served_at: now })
      } as Partial<DbOrder>);
    }

    if (oldStatus && oldStatus !== newStatus) {
      setOrderCounts(prev => ({
        ...prev,
        [oldStatus]: Math.max(0, (prev[oldStatus as keyof typeof prev] || 0) - 1),
        [newStatus]: (prev[newStatus as keyof typeof prev] || 0) + 1
      }));
    }

    try {
      const updateData: any = { status: newStatus };
      if (setKitchenReady) updateData.kitchen_ready = true;
      const order = orders.find(o => o.id === orderId);
      if ((newStatus === 'served' || newStatus === 'completed') && !order?.served_at) {
        updateData.served_at = now;
      }

      const response = await fetch(`/api/orders/${orderId}/status`, getFetchOptions({
        method: 'PATCH', body: JSON.stringify(updateData)
      }));
      const result = await response.json();
      if (!result.success) {
        fetchOrders();
      } else {
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      fetchOrders();
    }
  };

  const getNextStatus = (currentStatus: DbOrder['status'], paymentStatus?: string): DbOrder['status'] | null => {
    const statusFlow: Record<string, DbOrder['status'] | null> = {
      outstanding: 'pending', pending: 'preparing', preparing: 'ready', ready: 'served',
      served: paymentStatus === 'completed' ? 'completed' : null, completed: null, cancelled: null
    };
    return statusFlow[currentStatus] || null;
  };

  const getActionLabel = (status: DbOrder['status'], _paymentStatus?: string, orderType?: string) => {
    if (orderType === 'delivery') {
      const deliveryLabels: Record<string, string> = {
        outstanding: 'Proceed Without Payment', pending: 'Start Preparing', preparing: 'Mark Ready',
        ready: 'Out for Delivery', served: 'Mark Delivered', completed: 'Completed', cancelled: 'Cancelled'
      };
      return deliveryLabels[status] || '';
    }
    const labels: Record<string, string> = {
      outstanding: 'Proceed Without Payment', pending: 'Start Cooking', preparing: 'Mark Ready',
      ready: 'Served', served: 'Complete Order', completed: 'Completed', cancelled: 'Cancelled'
    };
    return labels[status] || '';
  };

  const getPreviousStatus = (currentStatus: DbOrder['status']): DbOrder['status'] | null => {
    const reverseFlow: Record<string, DbOrder['status'] | null> = {
      preparing: 'pending', ready: 'preparing', served: 'ready', completed: 'served', pending: null, cancelled: null
    };
    return reverseFlow[currentStatus] || null;
  };

  // Select Mode handlers for merging orders
  const handleSelectOrder = (orderId: number) => {
    setSelectedOrderIds(prev => prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]);
  };

  const handleSelectAll = () => {
    const mergeableOrders = getFilteredOrdersByTab()
      .slice((currentPage - 1) * 50, currentPage * 50)
      .filter(order => (order.payment_status === 'pending' || order.payment_status === 'partial') && !['served', 'completed', 'cancelled'].includes(order.status));

    if (selectedOrderIds.length === mergeableOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(mergeableOrders.map(o => o.id));
    }
  };

  const toggleSelectMode = () => {
    if (selectMode) setSelectedOrderIds([]);
    setSelectMode(!selectMode);
  };

  const handleMergeOrders = async () => {
    if (selectedOrderIds.length < 2) {
      showToast('Please select at least 2 orders to merge', 'info');
      return;
    }
    const selectedOrders = orders.filter(o => selectedOrderIds.includes(o.id));
    const invalidOrders = selectedOrders.filter(o =>
      (o.payment_status !== 'pending' && o.payment_status !== 'partial') || ['served', 'completed', 'cancelled'].includes(o.status)
    );
    if (invalidOrders.length > 0) {
      showToast('Cannot merge orders that are already paid, served, completed, or cancelled.', 'error');
      return;
    }
    setShowMergeModal(true);
  };

  const executeMergeOrders = async (targetId: number) => {
    try {
      setIsMerging(true);
      setShowMergeModal(false);
      const response = await fetch('/api/orders/merge', getFetchOptions({
        method: 'POST',
        body: JSON.stringify({ orderIds: selectedOrderIds, targetOrderId: targetId })
      }));
      if (!response.ok) {
        let errorMessage = 'Failed to merge orders';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          if (response.status === 403) errorMessage = 'Session expired. Please refresh the page and try again.';
          else if (response.status === 401) errorMessage = 'Authentication required. Please log in again.';
        }
        throw new Error(errorMessage);
      }
      const result = await response.json();
      showToast(`Successfully merged ${selectedOrderIds.length} orders into ${result.data.order_number}`, 'success');
      setSelectMode(false);
      setSelectedOrderIds([]);
      setMergeTargetOrderId(null);
      fetchOrders();
    } catch (error: any) {
      console.error('Merge error:', error);
      showToast(error.message || 'Failed to merge orders', 'error');
    } finally {
      setIsMerging(false);
    }
  };

  const canOrderBeMerged = (order: DbOrder): boolean => {
    // 일부 결제 중 (partial) 도 머지 가능 — 같은 테이블 + 같은 손님 그룹일 수 있음
    return (order.payment_status === 'pending' || order.payment_status === 'partial')
      && !['served', 'completed', 'cancelled'].includes(order.status);
  };

  // Fetch menu items for Add Items modal
  const fetchMenuForAddItems = async () => {
    try {
      const restaurantId = selectedOrder?.restaurant_id || user?.restaurantId;
      if (!restaurantId) return;

      const [categoriesRes, itemsRes] = await Promise.all([
        fetch(`/api/menu/categories?restaurantId=${restaurantId}`, getFetchOptions()),
        fetch(`/api/menu?restaurantId=${restaurantId}`, getFetchOptions())
      ]);

      if (categoriesRes.ok && itemsRes.ok) {
        const categoriesResult = await categoriesRes.json();
        const itemsResult = await itemsRes.json();
        const categories = categoriesResult.data?.categories || categoriesResult.categories || [];
        const items = itemsResult.data?.items || itemsResult.items || [];

        setMenuCategories(categories.filter((c: any) => c.is_active !== false));
        const normalizedItems = items.map((i: any) => {
          let optionGroups = i.optionGroups;
          if (typeof optionGroups === 'string') {
            try { optionGroups = JSON.parse(optionGroups); } catch { optionGroups = []; }
          }
          return { ...i, category_id: i.category_id || i.categoryId, optionGroups: Array.isArray(optionGroups) ? optionGroups : [] };
        });
        // set_only = 세트 구성 전용 단품 — 추가주문(Add Items)에서도 단품 담기 불가 (2026-06-12)
        setMenuItems(normalizedItems.filter((i: any) => i.is_available !== false && !i.set_only));
        if (categories.length > 0) {
          setAddItemsSelectedCategory(String(categories[0].id));
        }
      }
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    }
  };


  // Add item to cart in Add Items modal (with options support)
  const handleAddToItemsCart = (item: any, quantity: number = 1, selectedOptions: any[] = []) => {
    const optionsKey = selectedOptions.map((o: any) => o.id || o.name).sort().join(',');

    setAddItemsCart(prev => {
      if (selectedOptions.length === 0) {
        const existing = prev.find(i => i.menuItemId === item.id && (!i.selectedOptions || i.selectedOptions.length === 0));
        if (existing) return prev.map(i => i.cartId === existing.cartId ? { ...i, quantity: i.quantity + quantity } : i);
      } else {
        const existing = prev.find(i =>
          i.menuItemId === item.id &&
          i.selectedOptions?.map((o: any) => o.id || o.name).sort().join(',') === optionsKey
        );
        if (existing) return prev.map(i => i.cartId === existing.cartId ? { ...i, quantity: i.quantity + quantity } : i);
      }

      const optionsTotalPrice = selectedOptions.reduce((sum: number, opt: any) => sum + (parseFloat(opt.price) || 0), 0);
      const unitPrice = parseFloat(item.price) + optionsTotalPrice;

      return [...prev, {
        cartId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        menuItemId: item.id, name: item.name, price: item.price, unitPrice,
        quantity, selectedOptions, is_set_menu: item.is_set_menu, set_items: item.set_items
      }];
    });
  };

  const handleRemoveFromItemsCart = (cartId: string) => {
    setAddItemsCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing && existing.quantity > 1) return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity - 1 } : i);
      return prev.filter(i => i.cartId !== cartId);
    });
  };

  const handleIncreaseCartItem = (cartId: string) => {
    setAddItemsCart(prev => prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i));
  };

  // Submit Add Items - uses mergeItemsIntoOrder API for order_group support
  const handleSubmitAddItems = async () => {
    if (!selectedOrder?.id || addItemsCart.length === 0) return;

    try {
      setIsAddingItems(true);
      const items = addItemsCart.map(item => ({
        menu_item_id: item.menuItemId, menu_item_name: item.name, name: item.name,
        quantity: item.quantity, price: item.price, unitPrice: item.unitPrice || item.price,
        options: item.selectedOptions?.map((opt: any) => ({ name: opt.name, price: opt.price || 0 })) || [],
        is_set_menu: item.is_set_menu, set_items: item.set_items
      }));

      const response = await fetch(`/api/orders/${selectedOrder?.id}/merge-items`, getFetchOptions({
        method: 'POST', body: JSON.stringify({ items, source: 'live_orders' })
      }));
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add items');
      }

      showToast('Items added successfully', 'success');
      setShowAddItemsView(false);
      setAddItemsCart([]);
      setAddItemsSearchQuery('');
      handleCloseModal();
      fetchOrders();
    } catch (error: any) {
      console.error('Add items error:', error);
      showToast(error.message || 'Failed to add items', 'error');
    } finally {
      setIsAddingItems(false);
    }
  };

  // Open Add Items modal effect
  useEffect(() => {
    if (showAddItemsView) {
      fetchMenuForAddItems();
    } else {
      setAddItemsCart([]);
      setAddItemsSelectedCategory(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddItemsView]);

  const handleOrderClick = (order: DbOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setShowReceiptView(false);
    setShowKitchenTicketView(false);
    setShowAddItemsView(false);
    setAddItemsCart([]);
  };

  const handlePrintReceipt = async () => {
    if (selectedOrder) {
      const storeInfo = getStoreInfo();
      const orderData = {
        orderNumber: selectedOrder.order_number,
        pickupNumber: selectedOrder.order_number.split('-')[1],
        tableNumber: selectedOrder.table_number || null,
        pagerNumber: (selectedOrder as any).pager_number || null,
        date: new Date(selectedOrder.order_date || selectedOrder.createdAt),
        items: selectedOrder.order_items.map((item: any) => ({
          menuItem: { name: item.menu_item_name, price: parseFloat(item.price) },
          quantity: item.quantity, options: item.options || []
        })),
        subtotal: parseFloat((selectedOrder as any).subtotal || '0'),
        discount: parseFloat((selectedOrder as any).discount || '0'),
        coupon: (selectedOrder as any).coupon_code ? {
          code: (selectedOrder as any).coupon_code, discount: parseFloat((selectedOrder as any).coupon_discount || '0')
        } : null,
        serviceCharge: parseFloat((selectedOrder as any).service_charge || '0'),
        serviceChargeRate: parseFloat((selectedOrder as any).service_charge_rate || '10'),
        tax: parseFloat((selectedOrder as any).tax || '0'),
        taxRate: parseFloat((selectedOrder as any).tax_rate || '6'),
        total: parseFloat((selectedOrder as any).final_price || selectedOrder.total_amount || '0'),
        paymentMethod: selectedOrder.payment_method || 'cash',
        amountReceived: parseFloat((selectedOrder as any).amount_received || '0'),
        change: parseFloat((selectedOrder as any).change || '0'),
        cashierName: (selectedOrder as any).cashier_name || null
      };
      await printBillViaRawBT(orderData, storeInfo);
    }
  };

  const handlePrintBill = async (order?: DbOrder) => {
    const orderToPrint = order || selectedOrder;
    if (orderToPrint) {
      const storeInfo = getStoreInfo();
      const orderItems = Array.isArray(orderToPrint.order_items) ? orderToPrint.order_items : [];
      if (orderItems.length === 0) {
        showToast('Cannot print: Order has no items.', 'error');
        return;
      }
      const orderData = {
        orderNumber: orderToPrint.order_number,
        pickupNumber: orderToPrint.order_number.split('-')[1],
        tableNumber: orderToPrint.table_number || null,
        pagerNumber: orderToPrint.pager_number || null,
        date: new Date(orderToPrint.order_date || orderToPrint.createdAt),
        items: orderItems.map((item: any) => {
          let itemOptions = item.options || [];
          if (typeof itemOptions === 'string') { try { itemOptions = JSON.parse(itemOptions); } catch { itemOptions = []; } }
          if (!Array.isArray(itemOptions)) itemOptions = [];
          return {
            menuItem: {
              name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
              price: parseFloat(item.price || (item.menuItem && item.menuItem.price) || '0')
            },
            quantity: item.quantity || 1, options: itemOptions
          };
        }),
        subtotal: parseFloat((orderToPrint as any).subtotal || '0'),
        discount: parseFloat((orderToPrint as any).discount || '0'),
        coupon: (orderToPrint as any).coupon_code ? {
          code: (orderToPrint as any).coupon_code, discount: parseFloat((orderToPrint as any).coupon_discount || '0')
        } : null,
        takeawayCharge: parseFloat((orderToPrint as any).takeaway_charge || '0'),
        serviceCharge: parseFloat((orderToPrint as any).service_charge || '0'),
        serviceChargeRate: parseFloat((orderToPrint as any).service_charge_rate || '10'),
        tax: parseFloat((orderToPrint as any).tax || '0'),
        taxRate: parseFloat((orderToPrint as any).tax_rate || '6'),
        total: parseFloat((orderToPrint as any).final_price || orderToPrint.total_amount || '0'),
        paymentMethod: orderToPrint.payment_method || 'cash',
        amountReceived: parseFloat((orderToPrint as any).amount_received || '0'),
        change: parseFloat((orderToPrint as any).change || '0'),
        cashierName: (orderToPrint as any).cashier_name || null
      };
      await printBillViaRawBT(orderData, storeInfo);
    }
  };

  const handlePrintKitchenTicket = async (order?: DbOrder) => {
    const orderToPrint = order || selectedOrder;
    if (orderToPrint) {
      const storeInfo = getStoreInfo();
      const orderItems = Array.isArray(orderToPrint.order_items) ? orderToPrint.order_items : [];
      if (orderItems.length === 0) {
        showToast('Cannot print: Order has no items.', 'error');
        return;
      }
      const orderData = {
        orderNumber: orderToPrint.order_number,
        pickupNumber: orderToPrint.order_number.split('-')[1],
        date: new Date(orderToPrint.order_date || orderToPrint.createdAt),
        orderType: orderToPrint.order_type,
        orderSource: (orderToPrint as any).order_source || 'pos',
        tableNumber: orderToPrint.table_number || null,
        pagerNumber: orderToPrint.pager_number || null,
        customerName: orderToPrint.customer_name || 'Walk-in Customer',
        items: orderItems.map((item: any) => {
          let itemOptions = item.options || [];
          if (typeof itemOptions === 'string') { try { itemOptions = JSON.parse(itemOptions); } catch { itemOptions = []; } }
          if (!Array.isArray(itemOptions)) itemOptions = [];
          return {
            menuItem: {
              name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
              price: parseFloat(item.price || (item.menuItem && item.menuItem.price) || '0'),
              is_set_menu: item.is_set_menu || false, set_items: item.set_items || []
            },
            quantity: item.quantity || 1, options: itemOptions,
            // 2026-06-04 (Irene): carry station + set components so the manual reprint
            // routes to EACH kitchen station and renders set components/options exactly
            // like the order-complete popup + auto-print (single content source).
            kitchen_station_id: item.kitchen_station_id ?? (item.menuItem && item.menuItem.kitchen_station_id) ?? null,
            stationName: item.stationName || item.station_name || undefined,
            set_components: item.set_components
          };
        }),
        notes: (orderToPrint as any).notes || '',
        takeawayCharge: parseFloat((orderToPrint as any).takeaway_charge || '0')
      };
      await printKitchenTicketViaRawBT(orderData, storeInfo);
    }
  };

  // Delete item from order (only before payment)
  const handleDeleteOrderItem = (itemIndex: number, itemName: string) => {
    if (!selectedOrder) return;
    setItemToDelete({ index: itemIndex, name: itemName });
    setShowDeleteItemConfirm(true);
  };

  // reason: a quick-pick reason string (품절/고객변심/주문실수/기타) printed on the
  // kitchen VOID ticket. The backend persists it in the audit log + item-voided event.
  const confirmDeleteItem = async (reason?: string, voidPin?: string | null) => {
    if (!selectedOrder || !itemToDelete) return;
    // Snapshot the order's status BEFORE delete to decide if the kitchen already
    // got this item (same wasInKitchen gate as whole-order cancel).
    const wasInKitchen = !['awaiting_payment', 'pending'].includes(String((selectedOrder as any).status || ''));
    try {
      const response = await fetch(`/api/orders/${selectedOrder.id}/items/${itemToDelete.index}`, {
        ...getFetchOptions({ method: 'DELETE', body: JSON.stringify({ reason: reason || null, void_pin: voidPin || undefined }) })
      });
      const result = await response.json();
      if (result.success) {
        showToast(`Item removed: ${itemToDelete.name}`, 'success');
        setSelectedOrder(result.data);
        fetchOrders();

        // 🔒 VOID kitchen ticket — only for an item that ALREADY reached the
        // kitchen (was_printed) AND the order had progressed past pending. Routes
        // to that item's station printer so only the right station gets the void.
        // Setting toggle / disabled printer are honored inside printCancellationTicket.
        try {
          const removed = result.removedItem || {};
          // 확정 스펙 v2 (2026-06-02): 취소는 주방이 무조건 알아야 함 → 설정/자동발행과
          // 무관하게 항상 발송. 발송 후 화면엔 알림형 팝업([재발송][닫기]).
          // 단, 주방에 안 갔던(미발행) 아이템은 주방이 알 필요 없음 → skip.
          // 2026-06-03: 트리거 = '주방에 인쇄됐던 아이템'(printed_at) 기준. 자동발행 ON 매장은
          // pending 상태에서 이미 주방에 인쇄되므로, 상태 기준(wasInKitchen) 으로 막으면 취소표가
          // 안 나갔다(Irene). printed_at 있으면 상태 무관하게 취소 대상.
          if (removed.was_printed || removed.printed_at) {
            const settings = (() => { try { return require('../../utils/billPrint').getPrinterSettings(); } catch { return {}; } })();
            const sid = removed.kitchen_station_id;
            const sp = (sid != null && settings?.kitchenStationPrinters?.[String(sid)]) || null;
            const stPrinter = (sp && sp.name) || undefined;
            const stAddr = (sp && sp.address) || undefined;   // QZ: 그 station 주소로 라우팅 (3a)
            const sInfo = (typeof getStoreInfo === 'function') ? getStoreInfo() : {};
            const printData: any = {
              orderNumber: (selectedOrder as any).order_number || (selectedOrder as any).orderNumber,
              order_number: (selectedOrder as any).order_number,
              tableNumber: (selectedOrder as any).table_number || (selectedOrder as any).tableNumber,
              orderType: (selectedOrder as any).order_type || (selectedOrder as any).orderType,
              cancelTitle: '*** ITEM CANCELLED ***',   // R9 헤더
              cancelFooter: '>> DO NOT PREPARE <<',
              // station명 — 저장된 item.stationName 이 없으면(POS 주문 등) 프린터 설정의 stationName 폴백.
              // 주문취소(printCancellationTicketsByStation)와 동일하게 → 안내문 아래 ** STATION ** 박스.
              stationLabel: removed.stationName || (sp && sp.stationName) || undefined,
              items: [{ name: removed.name || itemToDelete.name, quantity: removed.quantity || 1, kitchen_station_id: sid, stationName: removed.stationName || (sp && sp.stationName) || undefined, cancelReason: reason || undefined }]
            };
            const reasonLabel = reason ? `Item voided — ${reason}` : 'Item voided';
            const doPrint = () => printCancellationTicket(printData, sInfo, reasonLabel, stPrinter, stAddr)
              .catch(e => console.warn('Item void print failed:', e && e.message));
            // 자동발행(master) ON → 자동 발송 / OFF → 팝업으로 수동 발송 (Irene 2026-06-03).
            const _kp: any = (settings as any)?.kitchenPrinter;
            const _autoOn = !!(_kp && _kp.enabled && _kp.autoPrint);
            if (_autoOn) doPrint();
            setCancelPrintPrompt({ run: doPrint, autoSent: _autoOn, ticketType: '*** ITEM CANCELLED ***', description: _autoOn ? t('cancelledItem.sentToKitchen', 'Cancelled item — sent to its kitchen') : t('cancelledItem.pressSend', 'Cancelled item — press [Send] to dispatch to kitchen'), stations: previewStationBuckets(printData.items, settings) });
          }
        } catch (e: any) { console.warn('void-ticket step skipped:', e?.message); }
      } else {
        showToast(result.message || result.error || 'Failed to remove item', 'error');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      showToast('Failed to remove item', 'error');
    } finally {
      setShowDeleteItemConfirm(false);
      setItemToDelete(null);
    }
  };

  // 사유 선택 후 손실방지 게이트 통과 → 실제 삭제. requireVoidPin OFF 면 바로 삭제.
  const beginDeleteItemWithReason = (reason: string) => {
    setShowDeleteItemConfirm(false); // 사유 모달만 닫고 itemToDelete 는 유지 (confirmDeleteItem 이 사용 후 정리)
    if ((operationSettings as any)?.requireVoidPin) {
      setVoidGate({ run: (pin: string) => confirmDeleteItem(reason, pin) });
    } else {
      confirmDeleteItem(reason, null);
    }
  };

  // 품목별 서빙 토글 — Floor Plan TableDetailPanel 과 동일 동작.
  // 활성 주문이면 단계 무관하게 홀 직원이 Served 토글(주방 ready 체크 건너뜀).
  // 전 품목 served 가 되면 주문도 'served' 로 자동 승급. (KDS 표시전용 매장 지원)
  const handleToggleItemServed = async (itemIndex: number) => {
    if (!selectedOrder) return;
    const items: any[] = Array.isArray(selectedOrder.order_items) ? selectedOrder.order_items : [];
    const target = items[itemIndex];
    if (!target) return;
    if (!['pending', 'preparing', 'ready', 'served'].includes(selectedOrder.status)) return; // guard
    // Un-serving (served/completed → ready) is a manual revert → bypass backend
    // forward-only item guard. Marking served stays guarded.
    const _allowRevert = target.status === 'served' || target.status === 'completed';
    const updatedItems = items.map((it: any, idx: number) =>
      idx === itemIndex
        ? { ...it, status: (it.status === 'served' || it.status === 'completed') ? 'ready' : 'served' }
        : it
    );
    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}/items`, {
        ...getFetchOptions({ method: 'PATCH' }),
        body: JSON.stringify({ order_items: updatedItems, allowItemRevert: _allowRevert })
      });
      const result = await res.json();
      if (result.success) {
        // 주문 단계 롤업은 백엔드 단일 단계 모델이 처리 (PATCH /items 응답에 이미
        // 파생된 주문 단계 포함 — 별도 /status 호출 제거로 이중 emit 레이스 차단).
        if (result.data) setSelectedOrder(result.data);
        fetchOrders();
      } else {
        showToast(result.error || result.message || 'Failed to update item', 'error');
      }
    } catch (e) {
      showToast('Failed to update item', 'error');
    }
  };

  // Print kitchen ticket for a specific order group (merged orders)
  const handlePrintGroupTicket = async (groupNum: number, groupItems: any[]) => {
    if (!selectedOrder) return;
    const storeInfo = getStoreInfo();
    if (groupItems.length === 0) { showToast('No items in this group', 'error'); return; }

    const orderData = {
      orderNumber: selectedOrder.order_number,
      pickupNumber: selectedOrder.order_number.split('-')[1],
      date: groupItems[0]?.added_at ? new Date(groupItems[0].added_at) : new Date(selectedOrder.order_date || selectedOrder.createdAt),
      orderType: selectedOrder.order_type,
      orderSource: (selectedOrder as any).order_source || 'pos',
      tableNumber: selectedOrder.table_number || null,
      pagerNumber: selectedOrder.pager_number || null,
      customerName: selectedOrder.customer_name || 'Walk-in Customer',
      groupLabel: groupNum === 0 ? 'Original Order' : `+Order ${groupNum}`,
      items: groupItems.map((item: any) => {
        let itemOptions = item.options || [];
        if (typeof itemOptions === 'string') { try { itemOptions = JSON.parse(itemOptions); } catch { itemOptions = []; } }
        if (!Array.isArray(itemOptions)) itemOptions = [];
        return {
          menuItem: {
            name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
            price: parseFloat(item.price || (item.menuItem && item.menuItem.price) || '0'),
            is_set_menu: item.is_set_menu || false, set_items: item.set_items || []
          },
          quantity: item.quantity || 1, options: itemOptions
        };
      }),
      notes: (selectedOrder as any).notes || '',
      takeawayCharge: 0
    };

    const success = await printKitchenTicketViaRawBT(orderData, storeInfo);
    if (success) {
      showToast(`Kitchen ticket for ${groupNum === 0 ? 'Original Order' : `+Order ${groupNum}`} printed`, 'success');
    }
  };

  // Print kitchen ticket for the LATEST order group only (for merged orders)
  const handlePrintLatestGroupTicket = async (order: DbOrder) => {
    const storeInfo = getStoreInfo();
    const orderItems = Array.isArray(order.order_items) ? order.order_items : [];
    if (orderItems.length === 0) { showToast('No items in order', 'error'); return; }

    const groups = orderItems.map((item: any) => item.order_group || 0);
    const latestGroup = Math.max(...groups);
    if (latestGroup === 0) { handlePrintKitchenTicket(order); return; }

    const latestGroupItems = orderItems.filter((item: any) => (item.order_group || 0) === latestGroup);
    const orderData = {
      orderNumber: order.order_number,
      pickupNumber: order.order_number.split('-')[1],
      date: latestGroupItems[0]?.added_at ? new Date(latestGroupItems[0].added_at) : new Date(order.order_date || order.createdAt),
      orderType: order.order_type,
      orderSource: (order as any).order_source || 'pos',
      tableNumber: order.table_number || null,
      pagerNumber: order.pager_number || null,
      customerName: order.customer_name || 'Walk-in Customer',
      groupLabel: `+Order ${latestGroup}`,
      items: latestGroupItems.map((item: any) => {
        let itemOptions = item.options || [];
        if (typeof itemOptions === 'string') { try { itemOptions = JSON.parse(itemOptions); } catch { itemOptions = []; } }
        if (!Array.isArray(itemOptions)) itemOptions = [];
        return {
          menuItem: {
            name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
            price: parseFloat(item.price || (item.menuItem && item.menuItem.price) || '0'),
            is_set_menu: item.is_set_menu || false, set_items: item.set_items || []
          },
          quantity: item.quantity || 1, options: itemOptions
        };
      }),
      notes: '', takeawayCharge: 0
    };

    const success = await printKitchenTicketViaRawBT(orderData, storeInfo);
    if (success) { showToast(`Kitchen ticket for +Order ${latestGroup} printed`, 'success'); }
  };


  // Payment Verification Modal handlers
  const handleVerifyConfirm = async () => {
    if (!verifyOrder) return;
    setAudioEnabled(false);
    try {
      await fetch(`/api/orders/${verifyOrder.id}`, getFetchOptions({
        method: 'PATCH', body: JSON.stringify({ payment_status: 'completed' })
      }));
      if (verifyOrder.status === 'outstanding') {
        await fetch(`/api/orders/${verifyOrder.id}/status`, getFetchOptions({
          method: 'PATCH', body: JSON.stringify({ status: 'pending' })
        }));
      }
      setVerifyOrder(null);
      fetchOrders();
    } catch (error) { console.error('Error confirming payment:', error); }
  };

  const handleVerifyReject = async () => {
    if (!verifyOrder) return;
    try {
      await fetch(`/api/orders/${verifyOrder.id}`, getFetchOptions({
        method: 'PATCH', body: JSON.stringify({ payment_status: 'rejected', status: 'outstanding' })
      }));
      setVerifyOrder(null);
      fetchOrders();
    } catch (error) { console.error('Error rejecting payment:', error); }
  };

  const handleDeleteOrder = (orderId: number) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteOrder = async () => {
    if (orderToDelete) {
      const orderIdToDelete = orderToDelete;
      removeOrder(orderIdToDelete);
      setHistoricalOrders(prev => prev.filter(o => o.id !== orderIdToDelete));
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
      try {
        const response = await fetch(`/api/orders/${orderIdToDelete}`, getFetchOptions({ method: 'DELETE' }));
        const result = await response.json();
        if (!result.success) fetchOrders();
      } catch (error) { console.error('Failed to delete order:', error); fetchOrders(); }
    } else {
      setShowDeleteConfirm(false);
    }
  };

  const cancelDeleteOrder = () => { setOrderToDelete(null); setShowDeleteConfirm(false); };

  const handleCancelOrder = (orderId: number) => {
    setOrderToCancel(orderId);
    // 사유 먼저 받는다(아이템 보이드와 동일 흐름). requireVoidPin 매장은 사유 선택 후 PIN 게이트로 이어짐.
    setShowCancelConfirm(true);
  };

  const confirmCancelOrder = async (voidPin?: string | null, reason?: string | null) => {
    if (!orderToCancel) return;
    // Snapshot order BEFORE marking cancelled — used for cancellation ticket print.
    const orderSnapshot = orders.find(o => o.id === orderToCancel);
    patchOrderLocal(orderToCancel, { status: 'cancelled' as any });
    setShowCancelConfirm(false);
    if (selectedOrder?.id === orderToCancel) handleCloseModal();
    try {
      const response = await fetch(`/api/orders/${orderToCancel}/status`, getFetchOptions({
        method: 'PATCH', body: JSON.stringify({ status: 'cancelled', void_pin: voidPin || undefined, reason: reason || undefined })
      }));
      const result = await response.json();
      if (!result.success) {
        // 게이트 거부/실패 → 낙관적 취소 롤백(재조회) + 사유 안내.
        if (result.message) showToast(result.message, 'error');
        fetchOrders();
      } else if (orderSnapshot) {
        // Cancellation ticket — 키친 진입 가능성 있는 상태에서만 (pending/awaiting_payment 는 키친 미진입 추정).
        // Setting toggle (printCancellationTicket) OFF 또는 키친 프린터 disabled 면 함수 내부에서 skip.
        // 2026-06-03: 트리거 = '주방에 인쇄됐던 주문'(아이템 printed_at) 기준. 자동발행 ON 매장은
        // pending 상태에서 이미 주방에 인쇄되므로, 상태 기준으로 막으면 취소표가 안 나갔다(Irene).
        const _snapItems = ((orderSnapshot as any).items || (orderSnapshot as any).order_items || []);
        const _anyPrinted = Array.isArray(_snapItems) && _snapItems.some((it: any) => it && (it.printed_at || it.printed));
        if (_anyPrinted) {
          try {
            // R10 전체취소: 헤더 ORDER CANCELLED + 전 아이템 줄긋기 + station별 라우팅
            // (각 station 은 자기 아이템만). item 의 kitchen_station_id 보존해 버킷팅에 사용.
            const printData: any = {
              orderNumber: (orderSnapshot as any).order_number || (orderSnapshot as any).orderNumber,
              order_number: (orderSnapshot as any).order_number,
              tableNumber: (orderSnapshot as any).table_number || (orderSnapshot as any).tableNumber,
              orderType: (orderSnapshot as any).order_type || (orderSnapshot as any).orderType,
              cancelTitle: '*** ORDER CANCELLED ***',
              cancelFooter: '>> DO NOT PREPARE - ALL CANCELLED <<',
              items: ((orderSnapshot as any).items || (orderSnapshot as any).order_items || []).map((it: any) => ({
                quantity: it.quantity || 1,
                name: it.name || it.menu_item_name || (it.menuItem && it.menuItem.name) || '',
                kitchen_station_id: it.kitchen_station_id ?? it.kitchenStationId ?? (it.menuItem && it.menuItem.kitchen_station_id) ?? null,
                stationName: it.stationName || it.station_name,
                set_components: it.set_components
              }))
            };
            const sInfo = (typeof getStoreInfo === 'function') ? getStoreInfo() : {};
            // 확정 스펙 v2 (2026-06-02): 주문취소는 설정/자동발행과 무관하게 항상 발송.
            // 발송 후 화면엔 알림형 팝업([재발송][닫기]). station 별로 자기 아이템만 발행.
            const _ps: any = (() => { try { return require('../../utils/billPrint').getPrinterSettings(); } catch { return {}; } })();
            const doPrint = () => printCancellationTicketsByStation(printData, sInfo, 'Cancelled by staff')
              .catch(e => console.warn('Cancellation print failed:', e && e.message));
            // 자동발행(master) ON → 자동 발송 / OFF → 팝업 수동 발송 (Irene 2026-06-03).
            const _kpO: any = _ps?.kitchenPrinter;
            const _autoOnO = !!(_kpO && _kpO.enabled && _kpO.autoPrint);
            if (_autoOnO) doPrint();
            setCancelPrintPrompt({ run: doPrint, autoSent: _autoOnO, ticketType: '*** ORDER CANCELLED ***', description: _autoOnO ? t('orderCancel.sentToKitchen', 'Order {{orderNumber}} — sent to its kitchen', { orderNumber: printData.orderNumber }) : t('orderCancel.pressSend', 'Order {{orderNumber}} — press [Send] to dispatch to kitchen', { orderNumber: printData.orderNumber }), stations: previewStationBuckets(printData.items, _ps) });
          } catch (e) {
            console.warn('Cancellation ticket trigger error:', (e as any) && (e as any).message);
          }
        }
      }
    } catch (error) { console.error('Failed to cancel order:', error); fetchOrders(); }
    finally { setOrderToCancel(null); }
  };

  // 사유 선택 → requireVoidPin 매장은 PIN 게이트, 아니면 즉시 취소 (아이템 보이드 beginDeleteItemWithReason 과 동일).
  const beginCancelOrderWithReason = (reason: string) => {
    if ((operationSettings as any)?.requireVoidPin) {
      setShowCancelConfirm(false);
      setVoidGate({ run: (pin: string) => confirmCancelOrder(pin, reason) });
    } else {
      confirmCancelOrder(null, reason);
    }
  };
  const cancelCancelOrder = () => { setOrderToCancel(null); setShowCancelConfirm(false); setCancelOther(null); };

  const handlePaymentClick = (order: DbOrder, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOrderForPayment(order);
    setShowPaymentModal(true);

    if (checkoutSocketRef.current) {
      const items = (typeof order.order_items === 'string' ? JSON.parse(order.order_items) : order.order_items || []).map((item: any) => ({
        name: item.name || item.menu_item_name || 'Item', quantity: item.quantity || 1,
        price: parseFloat(item.price) || 0, options: item.options || []
      }));
      checkoutSocketRef.current.emit('cart-update', {
        restaurantId: user?.restaurantId, items,
        subtotal: parseFloat(String(order.total_amount)) || 0,
        tax: 0, taxRate: 0, serviceCharge: 0, serviceChargeRate: 0, discount: 0,
        total: parseFloat(String(order.total_amount)) || 0,
        currency: operationSettings.currency || 'MYR'
      });
    }
  };

  const handlePaymentConfirm = async (method: string, amountReceived?: number, change?: number, pointsUsed?: number, pointDiscount?: number, cardType?: string) => {
    if (!orderForPayment) return;
    stopSound();

    try {
      const updatePayload: any = {
        payment_status: 'completed', payment_method: method,
        card_type: method === 'card' ? (cardType || null) : null
      };

      if (pointsUsed && pointsUsed > 0 && pointDiscount && pointDiscount > 0) {
        updatePayload.points_used = pointsUsed;
        updatePayload.point_discount = pointDiscount;
        updatePayload.total_amount = Number(orderForPayment.total_amount) - pointDiscount;
      }

      const response = await fetch(`/api/orders/${orderForPayment.id}`, getFetchOptions({
        method: 'PATCH', body: JSON.stringify(updatePayload)
      }));
      if (!response.ok) throw new Error('Failed to confirm payment');

      if (orderForPayment.status === 'outstanding') {
        await fetch(`/api/orders/${orderForPayment.id}`, getFetchOptions({
          method: 'PATCH', body: JSON.stringify({ status: 'pending' })
        }));
      } else if (orderForPayment.status === 'served') {
        await fetch(`/api/orders/${orderForPayment.id}`, getFetchOptions({
          method: 'PATCH', body: JSON.stringify({ status: 'completed' })
        }));
      }

      if (checkoutSocketRef.current) {
        checkoutSocketRef.current.emit('checkout-complete', {
          restaurantId: user?.restaurantId,
          orderNumber: orderForPayment.order_number || '',
          total: parseFloat(String(orderForPayment.total_amount)) || 0,
          currency: operationSettings.currency || 'MYR'
        });
      }

      setShowPaymentModal(false);
      const paidOrderRef = orderForPayment;
      setOrderForPayment(null);
      await fetchOrders();

      if (isModalOpen) { setIsModalOpen(false); setSelectedOrder(null); }

      // Auto-print bill + kitchen ticket (parity with POSTerminal:processPayment).
      // LiveOrders payment flow had no auto-trigger — only manual print button.
      // Same workstation-aware logic so shops with multi-POS / station printers
      // fire correctly after confirming payment here too.
      try {
        const billPrintMod = await import('../../utils/billPrint');
        const printSettings = billPrintMod.getPrinterSettings();
        const activeBill = billPrintMod.getActiveBillPrinter();
        const printStoreInfo = getStoreInfo();
        const items = Array.isArray(paidOrderRef.order_items) ? paidOrderRef.order_items : [];
        const printData: any = {
          orderNumber: paidOrderRef.order_number,
          pickupNumber: paidOrderRef.order_number ? String(paidOrderRef.order_number).split('-')[1] : '',
          tableNumber: paidOrderRef.table_number || undefined,
          pagerNumber: (paidOrderRef as any).pager_number || undefined,
          date: new Date(paidOrderRef.order_date || paidOrderRef.createdAt),
          orderType: (paidOrderRef as any).order_type === 'dine_in' ? 'dine-in' : ((paidOrderRef as any).order_type || 'dine-in'),
          orderSource: (paidOrderRef as any).source || 'pos',
          items: items.map((it: any) => ({
            menuItem: { name: it.menu_item_name || it.name || (it.menuItem && it.menuItem.name) || 'Item', price: parseFloat(it.price || (it.menuItem && it.menuItem.price) || '0') },
            quantity: it.quantity || 1,
            options: Array.isArray(it.options) ? it.options : []
          })),
          subtotal: parseFloat((paidOrderRef as any).subtotal || '0'),
          tax: parseFloat((paidOrderRef as any).tax || '0'),
          serviceCharge: parseFloat((paidOrderRef as any).service_charge || '0'),
          serviceChargeRate: parseFloat((paidOrderRef as any).service_charge_rate || '0'),
          takeawayCharge: parseFloat((paidOrderRef as any).takeaway_charge || '0'),
          discount: parseFloat((paidOrderRef as any).discount || '0'),
          total: parseFloat((paidOrderRef as any).total_amount || '0'),
          paymentMethod: method,
          cashierName: (paidOrderRef as any).cashier_name || null,
          amountReceived: amountReceived,
          change: change
        };
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
              catch (e: any) { console.error('LiveOrders auto bill print failed (copy ' + (i + 1) + '):', e); }
              if (i < copies - 1) await new Promise(r => setTimeout(r, 600));
            }
          })();
        }
        // 2026-05-28: LiveOrders 결제는 항상 pre-existing 주문에 대한 결제
        // (주문 add 시점에 kitchen 이미 인쇄). 결제 시 중복 인쇄 금지.
        // kitchen ticket 은 주문이 들어올 때만 인쇄.
      } catch (autoPrintErr) {
        console.error('LiveOrders auto-print skipped:', autoPrintErr);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  // Format date/time with restaurant timezone
  const formatDateTime = (date?: Date | string) => {
    return formatDateTimeUtil(date, (companyInfo as any)?.operation_settings);
  };

  return (
    <>
      <PrintStyles />

      {/* Items Added Alert - for merged orders */}
      {itemsAddedAlert?.isVisible && (
        <div
          data-items-added-banner=""
          style={{
            position: 'fixed', top: '20px', right: '20px', background: '#FEF3C7',
            border: '2px solid #F59E0B', borderRadius: '12px', padding: '16px 20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 10000, maxWidth: '320px',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <style>{`
            @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `}</style>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#92400E' }}>{itemsAddedAlert.viaTableMove ? 'Orders Merged' : 'New Items Added'}</div>
            <button onClick={() => setItemsAddedAlert(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#92400E', padding: '0', lineHeight: 1 }}>×</button>
          </div>
          <div style={{ color: '#78350F', fontSize: '14px', marginBottom: '12px' }}>
            <strong>Order {itemsAddedAlert.orderNumber}</strong>
            {itemsAddedAlert.tableNumber && ` (Table ${itemsAddedAlert.tableNumber})`}
            <br />
            {itemsAddedAlert.viaTableMove ? (
              // 테이블이동 머지 — 어디서 합쳐졌는지 명시 ("+Order N added" 혼동 방지)
              <>
                <span style={{ background: '#FCD34D', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  {itemsAddedAlert.mergedFromOrderNumber ? `Order ${itemsAddedAlert.mergedFromOrderNumber}` : 'Order'}
                  {itemsAddedAlert.mergedFromTable ? ` (Table ${itemsAddedAlert.mergedFromTable})` : ''}
                </span>
                {' '}merged into this order · {itemsAddedAlert.itemCount} item{itemsAddedAlert.itemCount > 1 ? 's' : ''}
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
          <button
            onClick={() => {
              setSearchQuery(itemsAddedAlert.orderNumber);
              setActiveTab('all');
              setItemsAddedAlert(null);
            }}
            style={{
              width: '100%', padding: '10px', background: '#F59E0B', color: 'white',
              border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px'
            }}
          >
            View Order
          </button>
        </div>
      )}

      <Container className="no-print">
        <PageHeader
          title="Live Orders"
          settingsHref={user?.restaurantId ? `/restaurant/${user.restaurantId}/settings?tab=operations` : undefined}
          settingsLabel="Order settings"
        >
          {selectMode && (
            <>
              <MergeButton onClick={handleMergeOrders} disabled={selectedOrderIds.length < 2 || isMerging}>
                {isMerging ? 'Merging...' : `Merge (${selectedOrderIds.length})`}
              </MergeButton>
              <SelectModeButton active={false} onClick={toggleSelectMode}>Cancel</SelectModeButton>
            </>
          )}
          {!selectMode && (
            <SelectModeButton active={selectMode} onClick={toggleSelectMode}>Select to Merge</SelectModeButton>
          )}
          <AudioToggleButton
            enabled={audioEnabled}
            onClick={() => { setLocalSoundOn(prev => { const next = !prev; localStorage.setItem('liveorders_sound_enabled', String(next)); return next; }); }}
            title={audioEnabled ? 'Sound ON' : 'Sound OFF'}
          >
            <img src={audioEnabled ? '/speaker-on.svg' : '/speaker-off.svg'} alt={audioEnabled ? 'Sound ON' : 'Sound OFF'} />
          </AudioToggleButton>
        </PageHeader>

        <Content>
          <FilterToolbar>
            <div>
              <DatePeriodFilter
                activePeriod={activePeriod} dateRange={dateRange} isCustomDateRange={isCustomDateRange}
                onPeriodChange={handlePeriodChange} onCalendarRangeSelect={handleCalendarRangeSelect} includeToday
              />
            </div>
            <SearchInputContainer>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              {searchQuery && (<ClearSearchButton onClick={() => setSearchQuery('')} title="Clear search">×</ClearSearchButton>)}
            </SearchInputContainer>
            <DownloadButton onClick={handleDownloadCSV} title="Download CSV">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="download-label">{t('orders:liveOrdersPage.downloadCsv')}</span>
            </DownloadButton>
            <button
              onClick={() => setShowCashDrawer(true)} title="Cash Drawer"
              style={{
                marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', background: '#F4F6F9', color: '#0A2540',
                border: '1px solid #C7CED6', borderRadius: '6px', cursor: 'pointer',
                fontSize: '14px', fontWeight: 500, flexShrink: 0
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                <path d="M2 8h20M2 8l2-4h16l2 4M2 8v10a2 2 0 002 2h16a2 2 0 002-2V8M9 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('cash:todayCashDrawer', { defaultValue: "Today's Cash Drawer" })}
            </button>
            <button
              onClick={() => setShowSettlement(true)} title="Daily Settlement"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', background: '#F4F6F9', color: '#0A2540',
                border: '1px solid #C7CED6', borderRadius: '6px', cursor: 'pointer',
                fontSize: '14px', fontWeight: 500, flexShrink: 0
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Daily Settlement
            </button>
            <button
              onClick={() => setShowFinalSettlement(true)} title="Final Settlement"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', background: '#635BFF', color: '#fff',
                border: '1px solid #635BFF', borderRadius: '6px', cursor: 'pointer',
                fontSize: '14px', fontWeight: 600, flexShrink: 0
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('cash:finalSettlement', { defaultValue: 'Final Settlement' })}
            </button>
          </FilterToolbar>

          <StatusTabs>
            {(['all', 'outstanding', 'pending', 'preparing', 'ready', 'served', 'completed', 'cancelled'] as const).map(tab => (
              <StatusTab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
                {tab === 'all' ? 'All Orders' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                <TabBadge>{getStatusCount(tab)}</TabBadge>
              </StatusTab>
            ))}
          </StatusTabs>

          <StatisticsBar>
            {(() => {
              const localStats = calculateStatistics();
              return (
                <>
                  <StatItem>{t('orders:liveOrdersPage.totalSales')}<strong>RM{serverStats.totalSales.toFixed(2)}</strong></StatItem>
                  <StatItem>{t('orders:liveOrdersPage.avg')}<strong>RM{serverStats.avgAmount.toFixed(2)}</strong></StatItem>
                  <StatItem>{t('orders:liveOrdersPage.max')}<strong>RM{serverStats.maxAmount.toFixed(2)}</strong></StatItem>
                  <StatItem>≥RM<input type="number" value={salesThreshold} onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setSalesThreshold(val);
                    const token = getAuthToken();
                    fetch(`/api/restaurants/${user?.restaurantId}`, { headers: { Authorization: `Bearer ${token}` } })
                      .then(r => r.json()).then(data => {
                        const rest = data.data || data;
                        const ops = typeof rest.operation_settings === 'string' ? JSON.parse(rest.operation_settings) : (rest.operation_settings || {});
                        ops.salesThreshold = val;
                        fetch(`/api/restaurants/${user?.restaurantId}`, {
                          method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify({ operation_settings: ops })
                        });
                      });
                  }} min="0" style={{ width: '32px', border: 'none', borderBottom: '1px dashed #635BFF', background: 'transparent', fontSize: '13px', fontWeight: 700, color: '#0A2540', textAlign: 'center', padding: 0, outline: 'none' }} /> <strong>{localStats.ordersAbove20Percent.toFixed(1)}%</strong></StatItem>
                  <StatItem>{t('orders:liveOrdersPage.avgServe')}<strong>{localStats.avgServeTime.toFixed(1)}m</strong></StatItem>
                  <StatItem>{t('orders:liveOrdersPage.maxServe')}<strong>{localStats.maxServeTime.toFixed(1)}m</strong></StatItem>
                  <StatItem>{t('orders:liveOrdersPage.minServe')}<strong>{localStats.minServeTime.toFixed(1)}m</strong></StatItem>
                </>
              );
            })()}
          </StatisticsBar>

          <OrdersCard>
          {getFilteredOrdersByTab().length > 0 ? (
            <DataTable>
              <DataTableHead>
                <tr>
                  {selectMode && (
                    <DataTableHeaderCell align="center" width="50px">
                      <input type="checkbox"
                        checked={selectedOrderIds.length > 0 && selectedOrderIds.length === getFilteredOrdersByTab()
                          .slice((currentPage - 1) * 50, currentPage * 50)
                          .filter(o => canOrderBeMerged(o)).length}
                        onChange={handleSelectAll}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </DataTableHeaderCell>
                  )}
                  <DataTableHeaderCell>{t('orders:liveOrdersPage.order')}</DataTableHeaderCell>
                  <DataTableHeaderCell>{t('orders:liveOrdersPage.items')}</DataTableHeaderCell>
                  <DataTableHeaderCell>{t('orders:liveOrdersPage.status')}</DataTableHeaderCell>
                  <DataTableHeaderCell>{t('orders:liveOrdersPage.time')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('orders:liveOrdersPage.amount')}</DataTableHeaderCell>
                  <DataTableHeaderCell style={{ width: '20%', minWidth: '180px' }}>{t('orders:liveOrdersPage.action')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {getFilteredOrdersByTab()
                  .slice((currentPage - 1) * 50, currentPage * 50)
                  .map(order => (
                  <DataTableRow key={order.id} style={selectMode && selectedOrderIds.includes(order.id) ? { backgroundColor: '#EEF2FF' } : {}}>
                    {selectMode && (
                      <DataTableCell align="center" style={{ width: '50px' }}>
                        {canOrderBeMerged(order) ? (
                          <input type="checkbox" checked={selectedOrderIds.includes(order.id)}
                            onChange={() => handleSelectOrder(order.id)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                          />
                        ) : (<span style={{ color: '#6B7280', fontSize: '12px' }}>-</span>)}
                      </DataTableCell>
                    )}
                    <DataTableCell data-label="ORDER">
                      <OrderNumber onClick={() => handleOrderClick(order)}>
                        {order.order_number}
                        {order.order_type === 'takeaway' && (<OrderTypeBadge>{t('orders:liveOrdersPage.takeaway')}</OrderTypeBadge>)}
                        {order.order_type === 'pickup' && (<OrderTypeBadge style={{ background: '#EDE9FE', color: '#7C3AED' }}>{t('orders:liveOrdersPage.pickup')}</OrderTypeBadge>)}
                        {order.order_type === 'delivery' && (<OrderTypeBadge style={{ background: '#D1FAE5', color: '#059669' }}>{t('orders:liveOrdersPage.delivery')}</OrderTypeBadge>)}
                        {order.source === 'mobile' && (<OrderTypeBadge style={{ background: '#DBEAFE', color: '#2563EB' }}>{t('orders:liveOrdersPage.mobile')}</OrderTypeBadge>)}
                        {order.source === 'mobile' && (
                          order.customer_id
                            ? <OrderTypeBadge style={{ background: '#D1FAE5', color: '#059669' }}>{t('orders:liveOrdersPage.member')}</OrderTypeBadge>
                            : <OrderTypeBadge style={{ background: '#F1F4F8', color: '#4B5563' }}>{t('orders:liveOrdersPage.guest')}</OrderTypeBadge>
                        )}
                        {order.source === 'kiosk' && (<OrderTypeBadge style={{ background: '#FEF3C7', color: '#D97706' }}>{t('orders:liveOrdersPage.kiosk')}</OrderTypeBadge>)}
                        {order.payment_method === 'staffMeal' && (<OrderTypeBadge style={{ background: '#FEE2E2', color: '#DC2626' }}>{t('orders:liveOrdersPage.staffMeal')}</OrderTypeBadge>)}
                      </OrderNumber>
                      <CustomerInfo>
                        {order.customer_name || 'Guest'}
                        {order.customer_phone && <><br />{order.customer_phone}</>}
                        {order.table_number && (<><br /><span style={{ color: '#635BFF', fontWeight: 500 }}>Table: {getTableLabel(order.table_number, floorPlan).display}{order.guest_count ? ` (${order.guest_count}p)` : ''}</span></>)}
                        {/* Dine-in with no table → never read as "pickup". Flag it so staff can locate
                            the guest (table number got lost / never captured). order-type aware. */}
                        {!order.table_number && (order.order_type === 'dine_in' || order.order_type === 'dine-in') && (
                          tableNumbersEnabled
                            ? <><br /><span style={{ color: '#DC2626', fontWeight: 600 }}>{t('orders:liveOrdersPage.dineInNoTable')}</span></>
                            : <><br /><span style={{ color: '#635BFF', fontWeight: 500 }}>{t('orders:liveOrdersPage.dineIn')}</span></>
                        )}
                        {order.pager_number && (<><br />Pager: {order.pager_number}</>)}
                        {order.order_type === 'pickup' && (<><br /><span style={{ color: '#8B5CF6', fontWeight: 500 }}>Pickup: {order.scheduled_pickup_time ? formatPickupTimeRange(order.scheduled_pickup_time) : 'ASAP'}</span></>)}
                        {order.cashier_name && (<><br /><span style={{ color: '#8898AA', fontSize: '11px' }}>Cashier: {order.cashier_name}</span></>)}
                      </CustomerInfo>
                    </DataTableCell>
                    <DataTableCell data-label="ITEMS">
                      <ItemsList>
                        {order.order_items && Array.isArray(order.order_items) && order.order_items.map((item: any, index: number) => (
                          <ItemWithOptions key={index}>
                            <div><ItemQuantity>{item.quantity}x</ItemQuantity>{item.name || item.menuItem?.name || 'Item'}</div>
                            {item.options && item.options.length > 0 && (
                              <ItemOptionsInline>{Array.isArray(item.options) ? item.options.join(', ') : item.options}</ItemOptionsInline>
                            )}
                          </ItemWithOptions>
                        ))}
                      </ItemsList>
                    </DataTableCell>
                    <DataTableCell data-label="STATUS" align="center">
                      <StatusBadge status={getDisplayStatus(order)}>{formatStatusDisplay(getDisplayStatus(order))}</StatusBadge>
                    </DataTableCell>
                    <DataTableCell data-label="TIME" align="center">
                      <TimeInfo>
                        {formatDateTime(order.createdAt || order.order_date)}<br />
                        {!order.served_at && (
                          <TimeAgoDisplay key={`time-${order.id}-${timeDisplayKey}`} dateString={order.createdAt || order.order_date || ''} />
                        )}
                        {order.served_at && (
                          <span style={{ fontSize: '11px', color: '#0A2540' }}>
                            Served: {formatDateTime(order.served_at)}
                            {(() => {
                              // 서브까지 걸린 시간 — 공유 헬퍼 단일 소스 (utils/prepTimer). 인라인 계산 제거.
                              const dur = getServedDurationMin(order.createdAt || order.order_date, order.served_at);
                              return dur != null ? ` (${dur}min)` : '';
                            })()}
                          </span>
                        )}
                      </TimeInfo>
                    </DataTableCell>
                    <DataTableCell data-label="AMOUNT" align="right">
                      <div style={{ textAlign: 'right' }}>
                        <DataTableAmount highlight>{formatCurrency(Number(order.total_amount), operationSettings.currency)}</DataTableAmount>
                        {Number((order as any).points_used) > 0 && (
                          <div style={{ fontSize: '11px', color: '#10B981' }}>(-{Number((order as any).points_used).toLocaleString()}P)</div>
                        )}
                        {Number((order as any).coupon_discount) > 0 && (
                          <div style={{ fontSize: '11px', color: '#F59E0B' }}>(Coupon)</div>
                        )}
                        <PaymentMethod isPending={order.payment_status === 'pending' || order.payment_status === 'partial'} isVerificationPending={order.payment_status === 'payment_verification_pending'}>
                          {formatPaymentDisplay(order.payment_method, (order as any).card_type, paymentSettings || undefined)}
                          {order.payment_status === 'pending' && ' (Pending)'}
                          {order.payment_status === 'partial' && ` (Partial ${Number((order as any).amount_paid || 0).toFixed(2)} / ${Number(order.total_amount || 0).toFixed(2)})`}
                          {order.payment_status === 'payment_verification_pending' && ' (Verifying)'}
                        </PaymentMethod>
                      </div>
                    </DataTableCell>
                    <DataTableCell data-label="ACTION" mobileFullWidth>
                      <ActionButtonsGroup>
                        {order.status !== 'completed' && order.status !== 'cancelled' && (
                          <>
                            {isOutstanding(order) && (order.payment_status as any) !== 'payment_verification_pending' && (order.payment_status as any) !== 'rejected' && (
                              <ActionButton onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'pending'); }}
                                style={{ background: '#F59E0B', borderColor: '#F59E0B', color: 'white' }}>Proceed Without Payment</ActionButton>
                            )}
                            {!isOutstanding(order) && (
                              <ActionButton onClick={() => { const nextStatus = getNextStatus(order.status, order.payment_status); if (nextStatus) handleStatusChange(order.id, nextStatus); }}
                                style={order.status === 'ready' ? { background: '#10B981', borderColor: '#10B981', color: 'white' } : order.status === 'served' ? { background: '#6B7280', borderColor: '#6B7280', color: 'white' } : undefined}>
                                {getActionLabel(order.status, order.payment_status, order.order_type)}
                              </ActionButton>
                            )}
                          </>
                        )}
                        {order.status !== 'cancelled' && !isOutstanding(order) && (
                          <ActionButton variant="secondary" onClick={() => {
                            if (order.status === 'pending') handleStatusChange(order.id, 'outstanding');
                            else { const previousStatus = getPreviousStatus(order.status); if (previousStatus) handleStatusChange(order.id, previousStatus); }
                          }} title="Revert to previous status">↺</ActionButton>
                        )}
                        {canTakePayment && (order.payment_status === 'pending' || order.payment_status === 'partial') && (
                          <ActionButton onClick={(e) => handlePaymentClick(order, e)}
                            style={order.status === 'served' ? { background: '#10B981', borderColor: '#10B981', color: 'white' } : { background: '#F4F6F9', color: '#4B5563', border: '1px solid #C7CED6' }}>
                            {order.payment_status === 'partial' ? 'Continue Payment' : 'Payment'}
                          </ActionButton>
                        )}
                        {canTakePayment && (order.payment_status as any) === 'payment_verification_pending' && (
                          <ActionButton onClick={(e) => { e.stopPropagation(); setVerifyOrder(order); }}
                            style={{ background: '#10B981', borderColor: '#10B981', color: 'white' }}>Confirm Payment</ActionButton>
                        )}
                        {order.status !== 'completed' && order.status !== 'cancelled' && order.payment_status !== 'pending' && order.payment_status !== 'partial' && (order.payment_status as any) !== 'payment_verification_pending' && (
                          <IconButton onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'completed'); }} title="Mark as Completed">
                            <IconSymbol>✓</IconSymbol>
                          </IconButton>
                        )}
                        <IconButton onClick={(e) => { e.stopPropagation(); handleOrderClick(order); }} title="View Details"><IconSymbol>◉</IconSymbol></IconButton>
                        <IconButton onClick={(e) => { e.stopPropagation(); handlePrintBill(order); }} title="Print Bill">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
                          </svg>
                        </IconButton>
                        <IconButton onClick={(e) => { e.stopPropagation(); handlePrintKitchenTicket(order); }} title="Print Kitchen Ticket">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                          </svg>
                        </IconButton>
                        {(() => {
                          const items = Array.isArray(order.order_items) ? order.order_items : [];
                          const maxGroup = items.length > 0 ? Math.max(...items.map((item: any) => item.order_group || 0)) : 0;
                          return maxGroup > 0 ? (
                            <IconButton onClick={(e) => { e.stopPropagation(); handlePrintLatestGroupTicket(order); }}
                              title={`Print +Order ${maxGroup} Ticket`} style={{ background: '#FEF3C7', color: '#92400E' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4v16m8-8H4"/></svg>
                            </IconButton>
                          ) : null;
                        })()}
                        {canVoid && (
                          <IconButton onClick={(e) => { e.stopPropagation(); order.status === 'cancelled' ? handleDeleteOrder(order.id) : handleCancelOrder(order.id); }}
                            title={order.status === 'cancelled' ? "Remove Order" : "Cancel Order"}>
                            <IconSymbol>✕</IconSymbol>
                          </IconButton>
                        )}
                      </ActionButtonsGroup>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
          ) : (
            <DataTableEmpty>No orders found in this category</DataTableEmpty>
          )}
        </OrdersCard>

        {/* Order Detail Modal */}
        <OrderDetailModal
          selectedOrder={selectedOrder!}
          isModalOpen={isModalOpen}
          showAddItemsView={showAddItemsView}
          showReceiptView={showReceiptView}
          showKitchenTicketView={showKitchenTicketView}
          addItemsSearchQuery={addItemsSearchQuery}
          setAddItemsSearchQuery={setAddItemsSearchQuery}
          menuItems={menuItems}
          addItemsCart={addItemsCart}
          isAddingItems={isAddingItems}
          handleCloseModal={handleCloseModal}
          setShowReceiptView={setShowReceiptView}
          setShowKitchenTicketView={setShowKitchenTicketView}
          setShowAddItemsView={setShowAddItemsView}
          setAddItemsCart={setAddItemsCart}
          handleDeleteOrder={handleDeleteOrder}
          handleCancelOrder={handleCancelOrder}
          handleStatusChange={handleStatusChange}
          handlePaymentClick={handlePaymentClick}
          setVerifyOrder={setVerifyOrder}
          handlePrintReceipt={handlePrintReceipt}
          handleAddToItemsCart={handleAddToItemsCart}
          handleRemoveFromItemsCart={handleRemoveFromItemsCart}
          handleIncreaseCartItem={handleIncreaseCartItem}
          handleSubmitAddItems={handleSubmitAddItems}
          handleDeleteOrderItem={handleDeleteOrderItem}
          handleToggleItemServed={handleToggleItemServed}
          handlePrintGroupTicket={handlePrintGroupTicket}
          setShowOptionModal={setShowOptionModal}
          setSelectedMenuItemForOption={setSelectedMenuItemForOption}
          operationSettings={operationSettings}
          paymentSettings={paymentSettings}
          getStoreInfo={getStoreInfo}
          user={user}
          canTakePayment={canTakePayment}
          canVoid={canVoid}
          formatDateTime={formatDateTime}
          isOutstanding={isOutstanding}
          formatStatusDisplay={formatStatusDisplay}
        />

        {/* Bill Print Content - Portal to body */}
        {selectedOrder && (
          <BillPrintPortal
            selectedOrder={selectedOrder}
            companyInfo={companyInfo}
            receiptSettings={receiptSettings}
            operationSettings={operationSettings}
            paymentSettings={paymentSettings}
            formatDateTime={formatDateTime}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
        <CommonModal isOpen={true} onClose={cancelDeleteOrder} title="Delete Order" footer={<><ActionButton variant="secondary" onClick={cancelDeleteOrder}>{t('orders:liveOrdersPage.cancel')}</ActionButton><ActionButton onClick={confirmDeleteOrder} style={{ background: '#FF6B6B', borderColor: '#FF6B6B', color: 'white' }}>{t('orders:liveOrdersPage.deleteOrder')}</ActionButton></>}>
              <p>{t('orders:liveOrdersPage.areYouSureYouWantToDeleteThisOrderThisActionCannotBeUndone')}</p>
              <p style={{ color: '#FF6B6B', fontWeight: 500, marginTop: '16px' }}>
                Order #{orderToDelete && orders.find(o => o.id === orderToDelete)?.order_number}
              </p>
        </CommonModal>
        )}

        {/* S1 autoPrint OFF(수동) — 취소 티켓 주방 인쇄 확인 프롬프트 */}
        <KitchenTicketSendModal prompt={cancelPrintPrompt} onClose={() => setCancelPrintPrompt(null)} t={t} />

        {/* Cancel Order Confirmation Modal */}
        {/* Cancel Order — reason quick-pick (mirrors item void). Reason saves to the
            void & cancel log; requireVoidPin stores then go through the PIN gate. */}
        {showCancelConfirm && (() => {
          const mode = (operationSettings as any)?.requireCancelReason || 'required';
          return (
          <CommonModal isOpen={true} onClose={cancelCancelOrder} title={t('orders:orderCancel.title', { defaultValue: 'Cancel Order' })} size="small">
            <div style={{ padding: '2px' }}>
              <p style={{ margin: '0 0 14px', fontSize: 14, color: '#0A2540', lineHeight: 1.5 }}>
                {mode === 'off'
                  ? t('orders:orderCancel.confirmNoReason', { defaultValue: 'Cancel this order? The order history is kept.' })
                  : t('orders:orderCancel.confirm', { defaultValue: 'Cancel this order? Choose a reason — it is saved to the void & cancel log. The order history is kept.' })}
              </p>
              {mode !== 'off' && cancelOther === null && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                  {[
                    { key: 'soldOut', label: t('orders:voidItem.reasonSoldOut', { defaultValue: 'Sold out' }) },
                    { key: 'customerChange', label: t('orders:voidItem.reasonCustomer', { defaultValue: 'Customer changed mind' }) },
                    { key: 'orderMistake', label: t('orders:voidItem.reasonMistake', { defaultValue: 'Order mistake' }) },
                    { key: 'other', label: t('orders:voidItem.reasonOther', { defaultValue: 'Other' }) }
                  ].map(r => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => { if (r.key === 'other') { setCancelOther(''); } else { beginCancelOrderWithReason(r.label); } }}
                      style={{ padding: '14px 8px', borderRadius: 8, border: '1px solid #E6EBF1', background: '#fff', color: '#0A2540', fontWeight: 600, fontSize: 14, cursor: 'pointer', minHeight: 52 }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
              {mode !== 'off' && cancelOther !== null && (
                <div style={{ marginBottom: 14 }}>
                  <input
                    autoFocus
                    value={cancelOther}
                    onChange={e => setCancelOther(e.target.value)}
                    placeholder={t('orders:voidItem.otherReasonPlaceholder', { defaultValue: 'Type the reason' })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #E6EBF1', fontSize: 14, color: '#0A2540', background: '#fff', boxSizing: 'border-box' }}
                  />
                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <button type="button" onClick={() => setCancelOther(null)}
                      style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #E6EBF1', background: '#fff', color: '#6B7C93', fontWeight: 600, cursor: 'pointer' }}>
                      {t('common:back', { defaultValue: 'Back' })}
                    </button>
                    <button type="button" disabled={!cancelOther.trim()}
                      onClick={() => beginCancelOrderWithReason(cancelOther.trim())}
                      style={{ flex: 1, padding: '10px 16px', borderRadius: 8, border: 'none', background: cancelOther.trim() ? '#FF6B6B' : '#C7CED6', color: '#fff', fontWeight: 600, cursor: cancelOther.trim() ? 'pointer' : 'not-allowed' }}>
                      {t('orders:orderCancel.confirmBtn', { defaultValue: 'Cancel order' })}
                    </button>
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button
                  type="button"
                  onClick={cancelCancelOrder}
                  style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #E6EBF1', background: '#fff', color: '#6B7C93', fontWeight: 600, cursor: 'pointer' }}
                >
                  {t('orders:liveOrdersPage.noKeepOrder', { defaultValue: 'Keep order' })}
                </button>
                {(mode === 'off' || mode === 'optional') && (
                  <button
                    type="button"
                    onClick={() => beginCancelOrderWithReason('')}
                    style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #FF6B6B', background: '#FF6B6B', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                  >
                    {mode === 'off'
                      ? t('orders:orderCancel.confirmBtn', { defaultValue: 'Cancel order' })
                      : t('orders:orderCancel.skipReason', { defaultValue: 'Cancel without reason' })}
                  </button>
                )}
              </div>
            </div>
          </CommonModal>
          );
        })()}

        {/* 손실방지 PIN 게이트 — requireVoidPin 매장에서 삭제/취소 승인 (세션 무변경). */}
        {voidGate && (
          <VoidPinModal
            show={true}
            restaurantId={(user?.restaurantId as any) || ''}
            title={t('orders:voidPin.title', { defaultValue: 'Authorization required' })}
            subtitle={t('orders:voidPin.subtitle', { defaultValue: 'Enter a manager PIN to void or cancel' })}
            onClose={() => setVoidGate(null)}
            onApproved={(_by, pin) => { const g = voidGate; setVoidGate(null); g?.run(pin); }}
          />
        )}

        {/* Remove Item — reason quick-pick. The reason prints on the kitchen VOID
            ticket (if the item already reached the kitchen) and is saved to audit. */}
        {showDeleteItemConfirm && (() => {
          const mode = (operationSettings as any)?.requireCancelReason || 'required';
          return (
          <CommonModal
            isOpen={showDeleteItemConfirm}
            onClose={() => { setShowDeleteItemConfirm(false); setItemToDelete(null); }}
            title={t('orders:voidItem.title', { defaultValue: 'Remove Item' })}
            size="small"
          >
            <div style={{ padding: '2px' }}>
              <p style={{ margin: '0 0 14px', fontSize: 14, color: '#0A2540', lineHeight: 1.5 }}>
                {mode === 'off'
                  ? t('orders:voidItem.confirmNoReason', { defaultValue: 'Remove "{{name}}" from this order?', name: itemToDelete?.name || '' })
                  : t('orders:voidItem.confirm', { defaultValue: 'Remove "{{name}}"? Choose a reason — it prints on the kitchen void ticket.', name: itemToDelete?.name || '' })}
              </p>
              {mode !== 'off' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                  {[
                    { key: 'soldOut', label: t('orders:voidItem.reasonSoldOut', { defaultValue: 'Sold out' }) },
                    { key: 'customerChange', label: t('orders:voidItem.reasonCustomer', { defaultValue: 'Customer changed mind' }) },
                    { key: 'orderMistake', label: t('orders:voidItem.reasonMistake', { defaultValue: 'Order mistake' }) },
                    { key: 'other', label: t('orders:voidItem.reasonOther', { defaultValue: 'Other' }) }
                  ].map(r => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => beginDeleteItemWithReason(r.label)}
                      style={{ padding: '14px 8px', borderRadius: 8, border: '1px solid #E6EBF1', background: '#fff', color: '#0A2540', fontWeight: 600, fontSize: 14, cursor: 'pointer', minHeight: 52 }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => { setShowDeleteItemConfirm(false); setItemToDelete(null); }}
                  style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #E6EBF1', background: '#fff', color: '#6B7C93', fontWeight: 600, cursor: 'pointer' }}
                >
                  {t('common:cancel', { defaultValue: 'Cancel' })}
                </button>
                {(mode === 'off' || mode === 'optional') && (
                  <button
                    type="button"
                    onClick={() => beginDeleteItemWithReason('')}
                    style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #FF6B6B', background: '#FF6B6B', color: 'white', fontWeight: 600, cursor: 'pointer' }}
                  >
                    {mode === 'off'
                      ? t('orders:voidItem.removeBtn', { defaultValue: 'Remove' })
                      : t('orders:voidItem.skipReason', { defaultValue: 'Remove without reason' })}
                  </button>
                )}
              </div>
            </div>
          </CommonModal>
          );
        })()}

        {/* Payment Verification Modal */}
        <PaymentVerificationModal
          verifyOrder={verifyOrder}
          operationSettings={operationSettings}
          onClose={() => setVerifyOrder(null)}
          onConfirm={handleVerifyConfirm}
          onReject={handleVerifyReject}
        />

        {/* Payment Modal */}
        {showPaymentModal && orderForPayment && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => { setShowPaymentModal(false); setTimeout(() => { setOrderForPayment(null); }, 100); }}
            total={Number(orderForPayment.total_amount)}
            subtotal={Number((orderForPayment as any).subtotal || orderForPayment.total_amount || 0)}
            tax={Number((orderForPayment as any).tax || 0)}
            serviceCharge={Number((orderForPayment as any).service_charge || 0)}
            discountAmount={Number((orderForPayment as any).discount || 0)}
            couponDiscount={Number((orderForPayment as any).coupon_discount || 0)}
            discountPolicyAmount={Number((orderForPayment as any).discount_policy_amount || 0)}
            pointDiscount={Number((orderForPayment as any).point_discount || 0)}
            onConfirmPayment={handlePaymentConfirm}
            paymentMethods={paymentMethods}
            customerId={(orderForPayment as any).customer_id || undefined}
            restaurantId={user?.restaurantId ? Number(user.restaurantId) : undefined}
            membershipSettings={membershipSettings}
            // Phase 2 — Split bill: 기존 주문이라 orderId/items 전달 가능
            orderId={Number(orderForPayment.id)}
            orderItems={Array.isArray(orderForPayment.order_items)
              ? orderForPayment.order_items
              : (typeof orderForPayment.order_items === 'string'
                ? (() => { try { return JSON.parse(orderForPayment.order_items as any); } catch { return []; } })()
                : [])}
            takeawayCharge={Number((orderForPayment as any).takeaway_charge || 0)}
            taxRate={Number((orderForPayment as any).tax_rate || 6)}
            serviceChargeRate={Number((orderForPayment as any).service_charge_rate || 10)}
            existingAmountPaid={Number((orderForPayment as any).amount_paid || 0)}
            onPartialPaymentComplete={(_payment, remaining) => {
              if (remaining <= 0.005) {
                // Fully paid → close + refresh
                setShowPaymentModal(false);
                setTimeout(() => setOrderForPayment(null), 100);
                fetchOrders();
              } else {
                // Stay open for next partial — refresh order data
                fetchOrders();
              }
            }}
          />
        )}

        {/* Option Modal for Add Items */}
        {selectedMenuItemForOption && (
          <OptionModal
            isOpen={showOptionModal}
            onClose={() => { setShowOptionModal(false); setSelectedMenuItemForOption(null); }}
            menuItem={{
              id: selectedMenuItemForOption.id, name: selectedMenuItemForOption.name,
              price: parseFloat(selectedMenuItemForOption.price) || 0,
              emoji: selectedMenuItemForOption.emoji || '🍽️',
              image: selectedMenuItemForOption.image,
              optionGroups: selectedMenuItemForOption.optionGroups
            }}
            onConfirm={(quantity, selectedOptions, selectedOptionsData) => {
              handleAddToItemsCart(selectedMenuItemForOption, quantity, selectedOptionsData);
              setShowOptionModal(false);
              setSelectedMenuItemForOption(null);
              setAddItemsSearchQuery('');
            }}
          />
        )}

        {/* Merge Target Selection Modal */}
        {showMergeModal && (
        <CommonModal isOpen={true} onClose={() => setShowMergeModal(false)} title="Select Target Order" footer={<><ActionButton onClick={() => setShowMergeModal(false)} style={{ background: 'white', color: '#1F2937', border: '1px solid #C7CED6' }}>{t('orders:liveOrdersPage.cancel')}</ActionButton><ActionButton onClick={() => mergeTargetOrderId && executeMergeOrders(mergeTargetOrderId)} disabled={!mergeTargetOrderId || isMerging} style={{ background: mergeTargetOrderId ? '#635BFF' : '#C7CED6', color: mergeTargetOrderId ? 'white' : '#6B7280', cursor: mergeTargetOrderId ? 'pointer' : 'not-allowed' }}>{isMerging ? 'Merging...' : 'Merge Orders'}</ActionButton></>}>
            <div>
              <p style={{ marginBottom: '16px', color: '#4B5563', fontSize: '14px' }}>
                Select which order to merge INTO. The selected order's table/pager number will be kept.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {orders
                  .filter(o => selectedOrderIds.includes(o.id))
                  .sort((a, b) => new Date(a.createdAt || a.order_date).getTime() - new Date(b.createdAt || b.order_date).getTime())
                  .map(order => (
                    <div key={order.id} onClick={() => setMergeTargetOrderId(order.id)}
                      style={{ padding: '16px', border: `2px solid ${mergeTargetOrderId === order.id ? '#635BFF' : '#C7CED6'}`, borderRadius: '8px', cursor: 'pointer', background: mergeTargetOrderId === order.id ? '#F0EEFF' : 'white', transition: 'all 0.15s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '16px', color: '#0A2540' }}>{order.order_number}</div>
                          <div style={{ fontSize: '13px', color: '#4B5563', marginTop: '4px' }}>
                            {order.table_number ? `${getTableLabel(order.table_number, floorPlan).display}${order.guest_count ? ` (${order.guest_count}p)` : ''}` : ''}
                            {order.table_number && order.pager_number ? ' / ' : ''}
                            {order.pager_number ? `Pager ${order.pager_number}` : ''}
                            {!order.table_number && !order.pager_number && (order.order_type === 'dine_in' || order.order_type === 'dine-in') ? t(tableNumbersEnabled ? 'orders:liveOrdersPage.dineInNoTable' : 'orders:liveOrdersPage.dineIn') : ''}
                            {!order.table_number && !order.pager_number && !(order.order_type === 'dine_in' || order.order_type === 'dine-in') ? 'No Table/Pager' : ''}
                          </div>
                          {order.customer_name && order.customer_name !== 'Guest' && order.customer_name !== 'Mobile Guest' && (
                            <div style={{ fontSize: '12px', color: '#635BFF', marginTop: '2px', fontWeight: 500 }}>{order.customer_name}</div>
                          )}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14px', fontWeight: 500, color: '#0A2540' }}>{formatCurrency(order.total_amount, operationSettings.currency)}</div>
                          <div style={{ fontSize: '12px', color: '#4B5563' }}>{order.order_items?.length || 0} items</div>
                        </div>
                      </div>
                      {mergeTargetOrderId === order.id && (
                        <div style={{ marginTop: '8px', fontSize: '12px', color: '#635BFF', fontWeight: 500 }}>Other orders will be merged into this order</div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
        </CommonModal>
        )}
        </Content>

        {/* Pagination */}
        {(() => {
          const filteredOrdersCount = getFilteredOrdersByTab().length;
          const filteredTotalPages = Math.ceil(filteredOrdersCount / 50);
          return filteredTotalPages > 1 && (
          <PaginationContainer>
            <PaginationInfo>
              Showing {((currentPage - 1) * 50) + 1}-{Math.min(currentPage * 50, filteredOrdersCount)} of {filteredOrdersCount} orders
            </PaginationInfo>
            <PaginationControls>
              <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</PageButton>
              <PageButton onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>Previous</PageButton>
              {[...Array(Math.min(5, filteredTotalPages))].map((_, idx) => {
                let pageNum;
                if (filteredTotalPages <= 5) pageNum = idx + 1;
                else if (currentPage <= 3) pageNum = idx + 1;
                else if (currentPage >= filteredTotalPages - 2) pageNum = filteredTotalPages - 4 + idx;
                else pageNum = currentPage - 2 + idx;
                return (<PageButton key={pageNum} active={currentPage === pageNum} onClick={() => setCurrentPage(pageNum)}>{pageNum}</PageButton>);
              })}
              <PageButton onClick={() => setCurrentPage(prev => Math.min(filteredTotalPages, prev + 1))} disabled={currentPage === filteredTotalPages}>Next</PageButton>
              <PageButton onClick={() => setCurrentPage(filteredTotalPages)} disabled={currentPage === filteredTotalPages}>Last</PageButton>
            </PaginationControls>
          </PaginationContainer>
        );
        })()}
      </Container>

      {/* Toast Notification */}
      {ReactDOM.createPortal(
        <ToastContainer isVisible={toast.isVisible} type={toast.type}>
          <ToastMessage>{toast.message}</ToastMessage>
          <ToastCloseBtn onClick={() => setToast(prev => ({ ...prev, isVisible: false }))}>×</ToastCloseBtn>
        </ToastContainer>,
        document.body
      )}

      <DailySettlementPrint isOpen={showSettlement} onClose={() => setShowSettlement(false)} />
      <CashDrawerModal restaurantId={user?.restaurantId} isOpen={showCashDrawer} onClose={() => setShowCashDrawer(false)} />
      <FinalSettlementModal isOpen={showFinalSettlement} onClose={() => setShowFinalSettlement(false)} />
    </>
  );
};

// 공용 실시간 주문 스토어로 감싼 진입점 — 페이지 내부는 useOrdersRealtime() 으로 소비.
const LiveOrdersPageWithRealtime: React.FC = () => (
  <OrdersRealtimeProvider>
    <LiveOrdersPage />
  </OrdersRealtimeProvider>
);

export default LiveOrdersPageWithRealtime;
