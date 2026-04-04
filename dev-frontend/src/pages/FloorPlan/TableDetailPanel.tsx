import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FloorTable, TableStatusInfo, ORDER_STATUS_COLORS } from './types';
import { formatCurrency } from '../../utils/currency';
import { formatPaymentDisplay } from '../../constants';
import { useStore } from '../../contexts/StoreContext';
import { printBillViaRawBT, printKitchenTicketViaRawBT, printTableQR } from '../../utils/billPrint';
import OptionModal from '../../components/POSTerminal/OptionModal';
import { Modal, ModalButton } from '../../components/UI';

// Helper: payment_proof 호환 — { current, history } 구조 또는 기존 단일 객체 모두 지원
const getProofCurrent = (proof: any): any => {
  if (!proof) return null;
  if (proof.hasOwnProperty('current')) return proof.current;
  return proof;
};
const getProofHistory = (proof: any): any[] => {
  if (!proof) return [];
  if (proof.hasOwnProperty('history')) return proof.history || [];
  return [];
};

interface TableDetailPanelProps {
  tableNumber: string;
  statusInfo: TableStatusInfo | undefined;
  tableInfo: FloorTable | undefined;
  currency: string;
  timezone?: string;
  restaurantId: number;
  onClose: () => void;
  onNewOrder: () => void;
  onStatusChange: (orderId: number, newStatus: string) => Promise<void>;
  onPayment: () => void;
  onNavigateToPOS: () => void;
  onOrderUpdated: () => void;
  onClearTable: (orderId: number) => Promise<void>;
  onClearAllCompleted?: () => Promise<void>;
  // Multi-order support
  orders?: TableStatusInfo[];
  selectedOrderIndex?: number;
  onOrderIndexChange?: (index: number) => void;
  // QR mode
  qrMode?: 'static' | 'session';
}

// ─── Styled Components ───

const Panel = styled.div`
  width: 380px;
  min-width: 380px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    position: absolute;
    inset: 0;
    z-index: 20;
  }
`;

const PanelHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`;

const TableTitle = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
`;

const TableMeta = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover { background: #F3F4F6; }
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`;

const StatusBadge = styled.span<{ $color: string; $bg: string }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${p => p.$color};
  background: ${p => p.$bg};
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

const Section = styled.div`
  padding: 14px 20px;
  border-bottom: 1px solid #F0F2F5;
`;

const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`;

const InfoItem = styled.div`
  font-size: 12px;
`;

const InfoLabel = styled.span`
  color: #9CA3AF;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #0A2540;
  font-weight: 600;
  margin-left: 4px;
`;

const GroupHeader = styled.div<{ $isAdded?: boolean }>`
  padding: 5px 0;
  font-size: 10px;
  font-weight: 600;
  color: ${p => p.$isAdded ? '#92400E' : '#6B7280'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemRow = styled.div<{ $completed?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 0;
  border-bottom: 1px solid #F8FAFC;
  opacity: ${p => p.$completed ? 0.5 : 1};

  &:last-child { border-bottom: none; }
`;

const ServedCheckbox = styled.button<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${p => p.$checked ? '#059669' : '#D1D5DB'};
  background: ${p => p.$checked ? '#059669' : 'white'};
  color: white;
  font-size: 11px;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  transition: all 0.15s;

  &:hover {
    border-color: ${p => p.$checked ? '#047857' : '#9CA3AF'};
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ItemName = styled.div<{ $completed?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${p => p.$completed ? 'line-through' : 'none'};
`;

const ItemOptions = styled.div`
  font-size: 10px;
  color: #6B7C93;
  margin-top: 1px;
`;

const ItemPrice = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`;

const ItemQty = styled.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`;

const DeleteItemBtn = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: #D1D5DB;
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;

  &:hover {
    color: #DC2626;
    background: #FEE2E2;
  }
`;

const SummaryRow = styled.div<{ $bold?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: ${p => p.$bold ? '14px' : '12px'};
  color: ${p => p.$bold ? '#0A2540' : '#6B7C93'};
  font-weight: ${p => p.$bold ? '700' : '500'};
  padding: 2px 0;
`;

const NotesBox = styled.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  color: #92400E;
  margin-top: 6px;
`;

const ActionGroup = styled.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
  border-top: 1px solid #E6EBF1;
`;

const ActionBtn = styled.button<{ $variant: 'primary' | 'secondary' | 'success' | 'danger' | 'link' }>`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${p => {
    switch (p.$variant) {
      case 'primary':
        return `background: #635BFF; color: white; &:hover { background: #5A51E6; }`;
      case 'success':
        return `background: #10B981; color: white; border: 1px solid #10B981; &:hover { background: #059669; }`;
      case 'secondary':
        return `background: #F6F9FC; color: #6B7C93; border: 1px solid #E6EBF1; &:hover { background: #E6EBF1; }`;
      case 'danger':
        return `background: white; color: #DC2626; border: 1px solid #FCA5A5; &:hover { background: #FEF2F2; }`;
      case 'link':
        return `background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }`;
    }
  }}
`;

const ActionRow = styled.div`
  display: flex;
  gap: 6px;
`;

const IconButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  padding-bottom: 4px;
`;

const IconButton = styled.button`
  padding: 6px 10px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 32px;
  font-size: 12px;
  color: #6B7C93;
  white-space: nowrap;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconSymbol = styled.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #9CA3AF;

  p {
    margin: 8px 0 0;
    font-size: 13px;
  }
`;

const RejectButton = styled(ModalButton)`
  && {
    background: #FEF2F2;
    border: 1px solid #EF4444;
    color: #EF4444;
  }
  &&:hover:not(:disabled) {
    background: #FEE2E2;
  }
`;

const ConfirmPayButton = styled(ModalButton)`
  && { background: #10B981; }
  &&:hover:not(:disabled) { background: #059669; }
`;

// ─── Confirm Modal ───

const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmBox = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

const ConfirmTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`;

const ConfirmMessage = styled.div`
  font-size: 14px;
  color: #6B7C93;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const ConfirmBtn = styled.button<{ $danger?: boolean }>`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${p => p.$danger
    ? `background: #FEF2F2; color: #EF4444; border: 1px solid #EF4444; &:hover { background: #FEE2E2; }`
    : `background: #F3F4F6; color: #374151; &:hover { background: #E5E7EB; }`
  }
`;

const QRStatusInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F9FAFB;
  border-radius: 8px;
  font-size: 13px;
  margin-top: 8px;
`;

// ─── Status helpers ───

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  preparing: 'Preparing',
  ready: 'Ready',
  served: 'Served',
  awaiting_payment: 'Awaiting Payment',
  outstanding: 'Outstanding',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

const SOURCE_LABELS: Record<string, string> = {
  pos: 'POS Terminal',
  mobile: 'Mobile Order',
  kiosk: 'Kiosk'
};

const getNextStatus = (current: string, paymentStatus?: string): { status: string; label: string } | null => {
  switch (current) {
    case 'outstanding': return (paymentStatus === 'payment_verification_pending' || paymentStatus === 'rejected') ? null : { status: 'pending', label: 'Proceed Without Payment' };
    case 'pending': return { status: 'preparing', label: 'Start Cooking' };
    case 'preparing': return { status: 'ready', label: 'Mark Ready' };
    case 'ready': return { status: 'served', label: 'Served' };
    case 'served': return paymentStatus === 'completed'
      ? { status: 'completed', label: 'Complete Order' }
      : null;
    default: return null;
  }
};

const getPreviousStatus = (current: string): string | null => {
  const reverseFlow: Record<string, string | null> = {
    preparing: 'pending',
    ready: 'preparing',
    served: 'ready',
    completed: 'served',
    pending: null,
    cancelled: null
  };
  return reverseFlow[current] || null;
};

// ─── Component ───

const TableDetailPanel: React.FC<TableDetailPanelProps> = ({
  tableNumber,
  statusInfo,
  tableInfo,
  currency,
  timezone,
  restaurantId,
  onClose,
  onNewOrder,
  onStatusChange,
  onPayment,
  onNavigateToPOS,
  onOrderUpdated,
  onClearTable,
  onClearAllCompleted,
  orders = [],
  selectedOrderIndex = 0,
  onOrderIndexChange,
  qrMode = 'static'
}) => {
  const [loading, setLoading] = useState(false);
  const { getStoreInfo, paymentSettings } = useStore();

  // ─── QR Session state ───
  const [qrSession, setQrSession] = useState<{ token: string; qr_url: string; remaining_minutes: number; expires_at: string; created_at: string } | null>(null);
  const [qrLoading, setQrLoading] = useState(false);

  // ─── QR Session: fetch status ───
  const fetchQRStatus = useCallback(async () => {
    if (!restaurantId || !tableNumber) return;
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/restaurants/${restaurantId}/tables/${tableNumber}/qr`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setQrSession(result.data);
        } else {
          setQrSession(null);
        }
      } else {
        setQrSession(null);
      }
    } catch {
      setQrSession(null);
    }
  }, [restaurantId, tableNumber]);

  useEffect(() => {
    fetchQRStatus();
  }, [fetchQRStatus]);

  // ─── Confirm modal state ───
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // ─── Add Items View state (like LiveOrders) ───
  const [showAddItemsView, setShowAddItemsView] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [addItemsCart, setAddItemsCart] = useState<any[]>([]);
  const [isAddingItems, setIsAddingItems] = useState(false);
  const [addItemsSearchQuery, setAddItemsSearchQuery] = useState('');
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedMenuItemForOption, setSelectedMenuItemForOption] = useState<any>(null);

  // ─── Add Items: fetch menu ───
  const fetchMenuForAddItems = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const token = localStorage.getItem('auth_token');
      const headers = { 'Authorization': `Bearer ${token}` };
      const itemRes = await fetch(`/api/menu?restaurantId=${restaurantId}`, { headers });
      if (itemRes.ok) {
        const itemResult = await itemRes.json();
        const items = itemResult.data?.items || itemResult.items || [];
        const normalizedItems = items.map((i: any) => {
          let optionGroups = i.optionGroups;
          if (typeof optionGroups === 'string') {
            try { optionGroups = JSON.parse(optionGroups); } catch { optionGroups = []; }
          }
          return { ...i, category_id: i.category_id || i.categoryId, optionGroups: Array.isArray(optionGroups) ? optionGroups : [] };
        });
        setMenuItems(normalizedItems.filter((i: any) => i.is_available !== false));
      }
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (showAddItemsView) {
      fetchMenuForAddItems();
    } else {
      setAddItemsCart([]);
      setAddItemsSearchQuery('');
    }
  }, [showAddItemsView, fetchMenuForAddItems]);

  const handleAddToItemsCart = (item: any, quantity: number = 1, selectedOptions: any[] = []) => {
    const optionsKey = selectedOptions.map((o: any) => o.id || o.name).sort().join(',');
    setAddItemsCart(prev => {
      if (selectedOptions.length === 0) {
        const existing = prev.find(i => i.menuItemId === item.id && (!i.selectedOptions || i.selectedOptions.length === 0));
        if (existing) return prev.map(i => i.cartId === existing.cartId ? { ...i, quantity: i.quantity + quantity } : i);
      } else {
        const existing = prev.find(i => i.menuItemId === item.id && i.selectedOptions?.map((o: any) => o.id || o.name).sort().join(',') === optionsKey);
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

  const handleSubmitAddItems = async () => {
    if (!statusInfo?.orderId || addItemsCart.length === 0) return;
    try {
      setIsAddingItems(true);
      const token = localStorage.getItem('auth_token');
      const mergeItems = addItemsCart.map(item => ({
        menu_item_id: item.menuItemId, menu_item_name: item.name, name: item.name,
        quantity: item.quantity, price: item.price, unitPrice: item.unitPrice || item.price,
        options: item.selectedOptions?.map((opt: any) => ({ name: opt.name, price: opt.price || 0 })) || [],
        is_set_menu: item.is_set_menu, set_items: item.set_items
      }));
      const res = await fetch(`/api/orders/${statusInfo.orderId}/merge-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items: mergeItems, source: 'floor_plan' })
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to add items');
      }
      setShowAddItemsView(false);
      setAddItemsCart([]);
      setAddItemsSearchQuery('');
      onOrderUpdated();
    } catch (err: any) {
      console.error('Add items error:', err);
    } finally {
      setIsAddingItems(false);
    }
  };

  const isOccupied = statusInfo && statusInfo.status !== 'available';
  const orderStatus = statusInfo?.orderStatus || '';
  const paymentStatus = statusInfo?.paymentStatus || 'pending';
  const nextAction = getNextStatus(orderStatus, paymentStatus);
  const items = statusInfo?.orderItems || [];
  // LiveOrders와 동일한 조건 패턴 사용
  const showServedCheckbox = ['preparing', 'ready', 'served'].includes(orderStatus);

  const statusColors = isOccupied && ORDER_STATUS_COLORS[orderStatus]
    ? ORDER_STATUS_COLORS[orderStatus]
    : { bg: '#F3F4F6', text: '#9CA3AF', border: '#D1D5DB' };

  const paymentStatusColors = (() => {
    switch (paymentStatus) {
      case 'completed': case 'paid': return { color: '#059669', bg: '#ECFDF5' };
      case 'failed': return { color: '#DC2626', bg: '#FEE2E2' };
      case 'rejected': return { color: '#DC2626', bg: '#FEE2E2' };
      case 'payment_verification_pending': return { color: '#D97706', bg: '#FEF3C7' };
      default: return { color: '#6B7280', bg: '#F3F4F6' };
    }
  })();

  // Group items by order_group
  const groupedItems: Record<number, typeof items> = {};
  items.forEach((item, idx) => {
    const group = item.order_group || 0;
    if (!groupedItems[group]) groupedItems[group] = [];
    groupedItems[group].push({ ...item, _originalIndex: idx } as any);
  });
  const groupKeys = Object.keys(groupedItems).map(Number).sort((a, b) => a - b);

  const formatDT = (dateStr?: string) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const tzOpts = timezone ? { timeZone: timezone } : {};
    return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', ...tzOpts })
      + ', ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', ...tzOpts });
  };

  // ─── Handlers ───

  const handleToggleItemServed = async (itemIndex: number) => {
    if (loading || !statusInfo?.orderId) return;
    setLoading(true);
    try {
      const updatedItems = items.map((item, idx) => {
        if (idx === itemIndex) {
          return { ...item, status: item.status === 'completed' ? 'pending' : 'completed' };
        }
        return item;
      });

      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/orders/${statusInfo.orderId}/items`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ order_items: updatedItems })
      });

      if (res.ok) {
        const allCompleted = updatedItems.every(i => i.status === 'completed');
        if (allCompleted && ['preparing', 'ready'].includes(orderStatus)) {
          await fetch(`/api/orders/${statusInfo.orderId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ status: 'served' })
          });
        }
        onOrderUpdated();
      }
    } catch (_) { /* silently fail */ }
    setLoading(false);
  };

  const handleDeleteItem = (itemIndex: number, itemName: string) => {
    if (!statusInfo?.orderId) return;
    setConfirmModal({
      title: 'Delete Item',
      message: `Delete "${itemName}" from this order?`,
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          const token = localStorage.getItem('auth_token');
          const res = await fetch(`/api/orders/${statusInfo.orderId}/items/${itemIndex}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) onOrderUpdated();
        } catch (_) { /* silently fail */ }
      }
    });
  };

  const handleCancelOrder = () => {
    if (!statusInfo?.orderId) return;
    setConfirmModal({
      title: 'Cancel Order',
      message: 'Are you sure you want to cancel this order? This action cannot be undone.',
      onConfirm: async () => {
        setConfirmModal(null);
        setLoading(true);
        try {
          const token = localStorage.getItem('auth_token');
          await fetch(`/api/orders/${statusInfo.orderId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ status: 'cancelled' })
          });
          onOrderUpdated();
        } catch (_) { /* silently fail */ }
        setLoading(false);
      }
    });
  };

  const handleRevertStatus = async () => {
    if (!statusInfo?.orderId || loading) return;
    // Special case: pending → outstanding (same as LiveOrders)
    const prevStatus = orderStatus === 'pending' ? 'outstanding' : getPreviousStatus(orderStatus);
    if (!prevStatus) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      await fetch(`/api/orders/${statusInfo.orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: prevStatus })
      });
      onOrderUpdated();
    } catch (_) { /* silently fail */ }
    setLoading(false);
  };

  // Payment verification modal state
  const [showPaymentProofModal, setShowPaymentProofModal] = useState<'verify' | 'view' | false>(false);

  const handleConfirmPaymentClick = () => {
    setShowPaymentProofModal('verify');
  };

  const handleConfirmPayment = async () => {
    if (!statusInfo?.orderId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      await fetch(`/api/orders/${statusInfo.orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ payment_status: 'completed' })
      });
      // 결제 완료 후 outstanding이면 pending으로 변경 (주방에 전송) — LiveOrders와 동일
      if (orderStatus === 'outstanding') {
        await fetch(`/api/orders/${statusInfo.orderId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ status: 'pending' })
        });
      }
      setShowPaymentProofModal(false);
      onOrderUpdated();
    } catch (_) { /* silently fail */ }
    setLoading(false);
  };

  const handleRejectPayment = async () => {
    if (!statusInfo?.orderId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      await fetch(`/api/orders/${statusInfo.orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ payment_status: 'rejected', status: 'outstanding' })
      });
      setShowPaymentProofModal(false);
      onOrderUpdated();
    } catch (_) { /* silently fail */ }
    setLoading(false);
  };

  const buildOrderDataForPrint = () => {
    if (!statusInfo) return null;
    return {
      orderNumber: statusInfo.orderNumber || '',
      pickupNumber: (statusInfo.orderNumber || '').split('-')[1] || '',
      tableNumber: tableNumber || null,
      pagerNumber: null,
      date: statusInfo.orderCreatedAt ? new Date(statusInfo.orderCreatedAt) : new Date(),
      items: items.map((item: any) => {
        let itemOptions = item.options || [];
        if (typeof itemOptions === 'string') {
          try { itemOptions = JSON.parse(itemOptions); } catch (_) { itemOptions = []; }
        }
        if (!Array.isArray(itemOptions)) itemOptions = [];
        return {
          menuItem: {
            name: item.name || 'Unknown Item',
            price: parseFloat(item.price || '0'),
            is_set_menu: item.is_set_menu || false,
            set_items: item.set_items || []
          },
          quantity: item.quantity || 1,
          options: itemOptions
        };
      }),
      subtotal: parseFloat(String(statusInfo.subtotal || 0)),
      discount: parseFloat(String(statusInfo.discount || 0)),
      coupon: statusInfo.couponCode ? {
        code: statusInfo.couponCode,
        discount: parseFloat(String(statusInfo.couponDiscount || 0))
      } : null,
      serviceCharge: parseFloat(String(statusInfo.serviceCharge || 0)),
      serviceChargeRate: parseFloat(String(statusInfo.serviceChargeRate || 10)),
      tax: parseFloat(String(statusInfo.tax || 0)),
      taxRate: parseFloat(String(statusInfo.taxRate || 6)),
      total: parseFloat(String(statusInfo.totalAmount || 0)),
      paymentMethod: statusInfo.paymentMethod || 'cash',
      amountReceived: 0,
      change: 0,
      cashierName: statusInfo.cashierName || null
    };
  };

  const buildKitchenDataForPrint = (printItems?: any[], groupLabel?: string) => {
    if (!statusInfo) return null;
    const itemsToPrint = printItems || items;
    return {
      orderNumber: statusInfo.orderNumber || '',
      pickupNumber: (statusInfo.orderNumber || '').split('-')[1] || '',
      date: statusInfo.orderCreatedAt ? new Date(statusInfo.orderCreatedAt) : new Date(),
      orderType: statusInfo.orderType || 'dine_in',
      orderSource: statusInfo.orderSource || 'pos',
      tableNumber: tableNumber || null,
      pagerNumber: null,
      customerName: statusInfo.customerName || 'Walk-in Customer',
      groupLabel: groupLabel,
      items: itemsToPrint.map((item: any) => {
        let itemOptions = item.options || [];
        if (typeof itemOptions === 'string') {
          try { itemOptions = JSON.parse(itemOptions); } catch (_) { itemOptions = []; }
        }
        if (!Array.isArray(itemOptions)) itemOptions = [];
        return {
          menuItem: {
            name: item.name || 'Unknown Item',
            price: parseFloat(item.price || '0'),
            is_set_menu: item.is_set_menu || false,
            set_items: item.set_items || []
          },
          quantity: item.quantity || 1,
          options: itemOptions
        };
      }),
      notes: statusInfo.notes || '',
      takeawayCharge: 0
    };
  };

  const handlePrintBill = async () => {
    const orderData = buildOrderDataForPrint();
    if (!orderData || items.length === 0) return;
    await printBillViaRawBT(orderData, getStoreInfo());
  };

  const handlePrintKitchenTicket = async () => {
    const orderData = buildKitchenDataForPrint();
    if (!orderData || items.length === 0) return;
    await printKitchenTicketViaRawBT(orderData, getStoreInfo());
  };

  const handlePrintLatestGroupTicket = async () => {
    if (items.length === 0) return;
    const groups = items.map((item: any) => item.order_group || 0);
    const latestGroup = Math.max(...groups);
    if (latestGroup === 0) {
      handlePrintKitchenTicket();
      return;
    }
    const latestGroupItems = items.filter((item: any) => (item.order_group || 0) === latestGroup);
    const orderData = buildKitchenDataForPrint(latestGroupItems, `+Order ${latestGroup}`);
    if (!orderData) return;
    await printKitchenTicketViaRawBT(orderData, getStoreInfo());
  };

  const handlePrintQR = async () => {
    if (qrLoading) return;
    setQrLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/restaurants/${restaurantId}/tables/${tableNumber}/qr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.data) {
          setQrSession(result.data);
          const storeInfo = getStoreInfo();
          const storeName = storeInfo?.name || 'Restaurant';
          // Create a temporary canvas with QR code for printing
          const QRCode = (await import('qrcode')).default;
          const canvas = document.createElement('canvas');
          await QRCode.toCanvas(canvas, result.data.qr_url, { width: 200, margin: 2 });
          await printTableQR(tableNumber, canvas, storeName);
        }
      }
    } catch (err) {
      console.error('Failed to print QR:', err);
    }
    setQrLoading(false);
  };

  const handleExpireQR = async () => {
    if (qrLoading) return;
    setQrLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      await fetch(`/api/restaurants/${restaurantId}/tables/${tableNumber}/qr`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setQrSession(null);
    } catch (err) {
      console.error('Failed to expire QR:', err);
    }
    setQrLoading(false);
  };

  const previousStatus = orderStatus === 'pending' ? 'outstanding' : getPreviousStatus(orderStatus);
  const hasAddedItems = items.some((item: any) => (item.order_group || 0) > 0);

  const rawProof = statusInfo?.paymentProof || (statusInfo as any)?.payment_proof || null;
  const paymentProof = getProofCurrent(rawProof);
  const proofHistory = getProofHistory(rawProof);

  return (
    <Panel>
      {/* Payment Proof Verification Modal */}
      <Modal
        isOpen={!!showPaymentProofModal}
        onClose={() => setShowPaymentProofModal(false)}
        title={showPaymentProofModal === 'verify' ? 'Payment Verification' : 'Customer Submitted Proof'}
        size="small"
        footer={showPaymentProofModal === 'verify' ? (
          <>
            <RejectButton variant="secondary" onClick={handleRejectPayment} disabled={loading}>Reject</RejectButton>
            <ConfirmPayButton variant="primary" onClick={handleConfirmPayment} disabled={loading}>Confirm Payment</ConfirmPayButton>
          </>
        ) : undefined}
      >
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', color: '#6B7C93', marginBottom: '6px' }}>Order: <strong style={{ color: '#0A2540' }}>#{statusInfo?.orderNumber}</strong></div>
          <div style={{ fontSize: '14px', color: '#6B7C93', marginBottom: '6px' }}>Amount: <strong style={{ color: '#0A2540' }}>{currency} {statusInfo?.totalAmount?.toFixed(2)}</strong></div>
          <div style={{ fontSize: '14px', color: '#6B7C93' }}>Method: <strong style={{ color: '#0A2540' }}>{statusInfo?.paymentMethod}</strong></div>
        </div>

        <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#0A2540', marginBottom: '12px' }}>Customer Submitted Proof</div>
          {paymentProof ? (
            <>
              {paymentProof.reference && (
                <div style={{ fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#6B7C93' }}>Reference: </span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#0A2540' }}>{paymentProof.reference}</span>
                </div>
              )}
              {paymentProof.file_name && (
                <div style={{ fontSize: '13px', marginBottom: '6px', color: '#6B7C93' }}>File: {paymentProof.file_name}</div>
              )}
              {paymentProof.uploaded_at && (
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '6px' }}>
                  Submitted: {new Date(paymentProof.uploaded_at).toLocaleString()}
                </div>
              )}
              {paymentProof.image && (
                <img
                  src={paymentProof.image}
                  alt="Payment proof"
                  style={{ width: '100%', borderRadius: '6px', marginTop: '8px', cursor: 'pointer' }}
                  onClick={() => window.open(paymentProof.image, '_blank')}
                />
              )}
            </>
          ) : (
            <div style={{ fontSize: '13px', color: '#9CA3AF' }}>
              {paymentStatus === 'rejected' ? 'Waiting for customer to resubmit.' : 'No payment proof submitted.'}
            </div>
          )}
        </div>

        {/* History Section */}
        {proofHistory.length > 0 && (
          <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px', marginTop: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#6B7C93', marginBottom: '10px' }}>
              Previous Attempts ({proofHistory.length})
            </div>
            {proofHistory.map((entry: any, idx: number) => (
              <div key={idx} style={{
                padding: '10px',
                background: '#F9FAFB',
                borderRadius: '6px',
                marginBottom: idx < proofHistory.length - 1 ? '8px' : 0,
                border: '1px solid #E5E7EB'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: 600 }}>Rejected #{entry.reject_count || idx + 1}</span>
                  {entry.rejected_at && (
                    <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{new Date(entry.rejected_at).toLocaleString()}</span>
                  )}
                </div>
                {entry.reference && (
                  <div style={{ fontSize: '12px', color: '#6B7C93' }}>
                    Ref: <span style={{ fontFamily: 'monospace' }}>{entry.reference}</span>
                  </div>
                )}
                {entry.image && (
                  <img
                    src={entry.image}
                    alt={`Previous proof #${idx + 1}`}
                    style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', borderRadius: '4px', marginTop: '6px', cursor: 'pointer' }}
                    onClick={() => window.open(entry.image, '_blank')}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </Modal>

      <PanelHeader>
        <TableTitle>
          <h3>Table {tableNumber}</h3>
          <TableMeta>
            {statusInfo?.guestCount ? (
              <span>{statusInfo.guestCount} guests</span>
            ) : tableInfo ? (
              <span>{tableInfo.seats} seats</span>
            ) : null}
            {isOccupied && <span>{statusInfo!.elapsedMinutes}min</span>}
          </TableMeta>
          {isOccupied && (
            <BadgeRow>
              <StatusBadge $color={statusColors.text} $bg={statusColors.bg}>
                {STATUS_LABELS[orderStatus] || statusInfo!.status}
              </StatusBadge>
              <StatusBadge $color={paymentStatusColors.color} $bg={paymentStatusColors.bg}>
                {paymentStatus === 'completed' || paymentStatus === 'paid' ? 'Paid' :
                 paymentStatus === 'rejected' ? 'Rejected' :
                 paymentStatus === 'payment_verification_pending' ? 'Verifying' : 'Unpaid'}
              </StatusBadge>
            </BadgeRow>
          )}
          {!isOccupied && (
            <BadgeRow>
              <StatusBadge $color={statusColors.text} $bg={statusColors.bg}>Available</StatusBadge>
            </BadgeRow>
          )}
        </TableTitle>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>
      </PanelHeader>

      {/* Multi-order tabs */}
      {orders.length > 1 && (
        <div style={{
          padding: '8px 20px',
          borderBottom: '1px solid #E6EBF1',
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap',
          background: '#F9FAFB'
        }}>
          {orders.map((order, idx) => (
            <button
              key={order.orderId || idx}
              onClick={() => onOrderIndexChange?.(idx)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: selectedOrderIndex === idx ? 600 : 400,
                border: selectedOrderIndex === idx ? '1.5px solid #635BFF' : '1px solid #D1D5DB',
                background: selectedOrderIndex === idx ? '#EDE9FE' : 'white',
                color: selectedOrderIndex === idx ? '#635BFF' : '#6B7280',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              #{order.orderNumber?.split('-')[1] || idx + 1}
              {order.paymentStatus === 'paid' || order.paymentStatus === 'completed'
                ? ' ✓'
                : ''}
            </button>
          ))}
          <span style={{ fontSize: '11px', color: '#9CA3AF', alignSelf: 'center', marginLeft: '4px' }}>
            {orders.length} orders
          </span>
        </div>
      )}

      {isOccupied ? (
        showAddItemsView ? (
          /* ─── Add Items View (like LiveOrders) ─── */
          <>
            <PanelBody style={{ padding: '16px 20px' }}>
              {/* Search Input */}
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={addItemsSearchQuery}
                  onChange={(e) => setAddItemsSearchQuery(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px',
                    border: '2px solid #E5E7EB', borderRadius: '8px',
                    fontSize: '14px', outline: 'none', transition: 'border-color 0.15s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#635BFF'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; }}
                  autoFocus
                />
              </div>

              {/* Search Results */}
              {addItemsSearchQuery.length > 0 && (
                <div style={{ marginBottom: '16px', maxHeight: '200px', overflowY: 'auto', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                  {menuItems
                    .filter((item: any) => {
                      if (!item || !item.name) return false;
                      const q = addItemsSearchQuery.toLowerCase();
                      return item.name.toLowerCase().includes(q) || (item.code && item.code.toLowerCase().includes(q));
                    })
                    .slice(0, 15)
                    .map((item: any) => {
                      const hasOptions = Array.isArray(item.optionGroups) && item.optionGroups.length > 0;
                      return (
                        <div key={item.id} style={{
                          padding: '10px 14px', display: 'flex', justifyContent: 'space-between',
                          alignItems: 'center', borderBottom: '1px solid #F3F4F6', cursor: 'pointer'
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#F9FAFB'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }} onClick={() => {
                            handleAddToItemsCart(item, 1, []);
                            setAddItemsSearchQuery('');
                          }}>
                            <span style={{ fontWeight: 500, fontSize: '13px' }}>
                              {item.code ? `${item.code} ` : ''}{item.name}
                            </span>
                            {item.is_set_menu && (
                              <span style={{ marginLeft: '6px', fontSize: '10px', background: '#EDE9FE', color: '#7C3AED', padding: '1px 5px', borderRadius: '3px' }}>SET</span>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                            <span style={{ color: '#635BFF', fontWeight: 500, fontSize: '13px' }}>
                              {formatCurrency(parseFloat(item.price) || 0, currency)}
                            </span>
                            {hasOptions && (
                              <button onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMenuItemForOption(item);
                                setShowOptionModal(true);
                              }} style={{
                                padding: '3px 8px', fontSize: '11px', background: '#FEF3C7',
                                color: '#D97706', border: '1px solid #FCD34D', borderRadius: '4px',
                                cursor: 'pointer', fontWeight: 500
                              }}>Options</button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  {menuItems.filter((item: any) => {
                    const q = addItemsSearchQuery.toLowerCase();
                    return item.name?.toLowerCase().includes(q) || (item.code && item.code.toLowerCase().includes(q));
                  }).length === 0 && (
                    <div style={{ padding: '14px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>No items found</div>
                  )}
                </div>
              )}

              {/* Cart — Items to Add */}
              <div>
                <SectionTitle style={{ marginBottom: '10px' }}>
                  Items to Add ({addItemsCart.reduce((sum: number, item: any) => sum + item.quantity, 0)})
                </SectionTitle>
                {addItemsCart.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF', background: '#F9FAFB', borderRadius: '8px', fontSize: '13px' }}>
                    Search and select items to add
                  </div>
                ) : (
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
                    {addItemsCart.map((item: any) => (
                      <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid #F3F4F6' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 500, fontSize: '13px' }}>{item.name}</div>
                          {item.selectedOptions && item.selectedOptions.length > 0 && (
                            <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '1px' }}>
                              {item.selectedOptions.map((opt: any) => opt.name).join(', ')}
                            </div>
                          )}
                          <div style={{ color: '#6B7280', fontSize: '12px' }}>
                            {formatCurrency(item.unitPrice || parseFloat(item.price), currency)} each
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <button onClick={() => handleRemoveFromItemsCart(item.cartId)}
                            style={{ width: '28px', height: '28px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '16px', fontWeight: 500 }}>-</button>
                          <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600, fontSize: '14px' }}>{item.quantity}</span>
                          <button onClick={() => handleIncreaseCartItem(item.cartId)}
                            style={{ width: '28px', height: '28px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '16px', fontWeight: 500 }}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PanelBody>

            {/* Add Items Footer */}
            <ActionGroup>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>
                  Total: {formatCurrency(
                    addItemsCart.reduce((sum: number, item: any) => sum + ((item.unitPrice || parseFloat(item.price)) * item.quantity), 0),
                    currency
                  )}
                </span>
              </div>
              <ActionBtn
                $variant="primary"
                onClick={handleSubmitAddItems}
                disabled={addItemsCart.length === 0 || isAddingItems}
              >
                {isAddingItems ? 'Adding...' : 'Add to Order'}
              </ActionBtn>
              <ActionBtn $variant="secondary" onClick={() => {
                setShowAddItemsView(false);
                setAddItemsCart([]);
                setAddItemsSearchQuery('');
              }}>
                Cancel
              </ActionBtn>
            </ActionGroup>
          </>
        ) : (
          /* ─── Normal Order Detail View ─── */
          <>
            <PanelBody>
              {/* Customer & Order Info */}
              <Section>
                <SectionTitle>
                  Order {statusInfo!.orderNumber || ''}
                  {statusInfo!.customerName && statusInfo!.customerName !== 'Walk-in Customer'
                    ? ` — ${statusInfo!.customerName}`
                    : ''}
                </SectionTitle>
                <InfoGrid>
                  <InfoItem>
                    <InfoLabel>Customer</InfoLabel>
                    <InfoValue>{statusInfo!.customerName || 'Walk-in'}</InfoValue>
                  </InfoItem>
                  {statusInfo!.customerPhone && (
                    <InfoItem>
                      <InfoLabel>Phone</InfoLabel>
                      <InfoValue>{statusInfo!.customerPhone}</InfoValue>
                    </InfoItem>
                  )}
                  <InfoItem>
                    <InfoLabel>Type</InfoLabel>
                    <InfoValue>{(statusInfo!.orderType || 'dine_in').replace(/_/g, ' ').toUpperCase()}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Source</InfoLabel>
                    <InfoValue>{SOURCE_LABELS[statusInfo!.orderSource || 'pos'] || statusInfo!.orderSource}</InfoValue>
                  </InfoItem>
                  <InfoItem>
                    <InfoLabel>Time</InfoLabel>
                    <InfoValue>{formatDT(statusInfo!.orderCreatedAt)}</InfoValue>
                  </InfoItem>
                  {statusInfo!.paymentMethod && (
                    <InfoItem>
                      <InfoLabel>Payment</InfoLabel>
                      <InfoValue>{formatPaymentDisplay(statusInfo!.paymentMethod, statusInfo!.cardType, paymentSettings || undefined)}</InfoValue>
                    </InfoItem>
                  )}
                  {paymentProof && (
                    <InfoItem>
                      <InfoLabel>Receipt</InfoLabel>
                      <InfoValue>
                        <span
                          onClick={() => setShowPaymentProofModal('view')}
                          style={{ color: '#635BFF', cursor: 'pointer', fontWeight: 500 }}
                        >
                          View →
                        </span>
                      </InfoValue>
                    </InfoItem>
                  )}
                  {statusInfo!.cashierName && (
                    <InfoItem>
                      <InfoLabel>Cashier</InfoLabel>
                      <InfoValue>{statusInfo!.cashierName}</InfoValue>
                    </InfoItem>
                  )}
                </InfoGrid>
              </Section>

              {/* Order Items with Served Checkbox */}
              <Section>
                <SectionTitle>
                  Items ({items.length})
                  {showServedCheckbox && items.length > 0 && ` — ${items.filter(i => i.status === 'completed').length}/${items.length} served`}
                </SectionTitle>

                {groupKeys.map(groupNum => {
                  const groupItems = groupedItems[groupNum];
                  const isAdded = groupNum > 0;
                  const firstItem = groupItems[0];

                  return (
                    <div key={groupNum}>
                      {(groupKeys.length > 1 || isAdded) && (
                        <GroupHeader $isAdded={isAdded}>
                          <span>{isAdded ? `+Added #${groupNum}` : 'Original Order'}</span>
                          {isAdded && firstItem?.added_at && (
                            <span style={{ fontSize: '9px', fontWeight: 400, color: '#9CA3AF' }}>
                              {formatDT(firstItem.added_at)}
                            </span>
                          )}
                        </GroupHeader>
                      )}
                      {groupItems.map((item: any) => {
                        const originalIndex = item._originalIndex as number;
                        const isCompleted = item.status === 'completed';
                        const optionsStr = Array.isArray(item.options)
                          ? item.options.map((o: any) => typeof o === 'string' ? o : o?.name || '').filter(Boolean).join(', ')
                          : '';

                        return (
                          <ItemRow key={originalIndex} $completed={isCompleted && showServedCheckbox}>
                            {showServedCheckbox && (
                              <ServedCheckbox
                                $checked={isCompleted}
                                onClick={() => handleToggleItemServed(originalIndex)}
                                disabled={loading}
                                title={isCompleted ? 'Mark as not served' : 'Mark as served'}
                              >
                                {isCompleted ? '\u2713' : ''}
                              </ServedCheckbox>
                            )}
                            <ItemInfo>
                              <ItemName $completed={isCompleted}>
                                {item.name} <ItemQty>x{item.quantity}</ItemQty>
                              </ItemName>
                              {optionsStr && <ItemOptions>{optionsStr}</ItemOptions>}
                            </ItemInfo>
                            <ItemPrice>
                              {formatCurrency(item.price * item.quantity, currency)}
                            </ItemPrice>
                            {paymentStatus !== 'completed' && items.length > 1 && (
                              <DeleteItemBtn
                                onClick={() => handleDeleteItem(originalIndex, item.name)}
                                title="Delete item"
                              >
                                &times;
                              </DeleteItemBtn>
                            )}
                          </ItemRow>
                        );
                      })}
                    </div>
                  );
                })}

                {items.length === 0 && (
                  <div style={{ fontSize: '13px', color: '#9CA3AF' }}>No items</div>
                )}
              </Section>

              {/* Payment Summary */}
              <Section style={{ borderBottom: 'none' }}>
                <SectionTitle>Summary</SectionTitle>
                <SummaryRow>
                  <span>Subtotal</span>
                  <span>{formatCurrency(statusInfo!.subtotal || 0, currency)}</span>
                </SummaryRow>

                {(statusInfo!.discountPolicyAmount || 0) > 0 && (
                  <SummaryRow>
                    <span>Discount{statusInfo!.discountPolicyName ? ` (${statusInfo!.discountPolicyName})` : ''}</span>
                    <span>-{formatCurrency(statusInfo!.discountPolicyAmount || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.couponDiscount || 0) > 0 && (
                  <SummaryRow>
                    <span>Coupon{statusInfo!.couponCode ? ` (${statusInfo!.couponCode})` : ''}</span>
                    <span>-{formatCurrency(statusInfo!.couponDiscount || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.pointDiscount || 0) > 0 && (
                  <SummaryRow>
                    <span>Points{statusInfo!.pointsUsed ? ` (${statusInfo!.pointsUsed} pts)` : ''}</span>
                    <span>-{formatCurrency(statusInfo!.pointDiscount || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.discount || 0) > 0 && !statusInfo!.couponDiscount && !statusInfo!.discountPolicyAmount && !statusInfo!.pointDiscount && (
                  <SummaryRow>
                    <span>Discount</span>
                    <span>-{formatCurrency(statusInfo!.discount || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.serviceCharge || 0) > 0 && (
                  <SummaryRow>
                    <span>Svc Charge{statusInfo!.serviceChargeRate ? ` (${statusInfo!.serviceChargeRate}%)` : ''}</span>
                    <span>{formatCurrency(statusInfo!.serviceCharge || 0, currency)}</span>
                  </SummaryRow>
                )}

                {(statusInfo!.tax || 0) > 0 && (
                  <SummaryRow>
                    <span>Tax{statusInfo!.taxRate ? ` (${statusInfo!.taxRate}%)` : ''}</span>
                    <span>{formatCurrency(statusInfo!.tax || 0, currency)}</span>
                  </SummaryRow>
                )}

                <SummaryRow $bold style={{ marginTop: '4px', paddingTop: '6px', borderTop: '1px solid #E6EBF1' }}>
                  <span>Total</span>
                  <span>{formatCurrency(statusInfo!.totalAmount, currency)}</span>
                </SummaryRow>

                {statusInfo!.notes && (
                  <NotesBox>{statusInfo!.notes}</NotesBox>
                )}
              </Section>
            </PanelBody>

            {/* Actions */}
            <ActionGroup>
              {/* Print & Revert row */}
              <IconButtonGroup>
                <IconButton onClick={handlePrintBill} title="Print Bill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6,9 6,2 18,2 18,9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                  Bill
                </IconButton>
                <IconButton onClick={handlePrintKitchenTicket} title="Print Order Ticket">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  Ticket
                </IconButton>
                {hasAddedItems && (
                  <IconButton onClick={handlePrintLatestGroupTicket} title="+Order Ticket" style={{ background: '#FEF3C7', color: '#92400E' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 4v16m8-8H4"/>
                    </svg>
                  </IconButton>
                )}
                {previousStatus && (
                  <IconButton onClick={handleRevertStatus} title={`Revert to ${STATUS_LABELS[previousStatus] || previousStatus}`}>
                    <IconSymbol>↺</IconSymbol>
                  </IconButton>
                )}
                {/* Quick Complete — LiveOrders 동일: 결제 확정된 주문만 아이콘 버튼 */}
                {orderStatus !== 'completed' && orderStatus !== 'cancelled' && paymentStatus !== 'pending' && paymentStatus !== 'payment_verification_pending' && statusInfo!.orderId && (
                  <IconButton
                    onClick={() => onStatusChange(statusInfo!.orderId!, 'completed')}
                    title="Mark as Completed"
                  >
                    <IconSymbol>✓</IconSymbol>
                  </IconButton>
                )}
              </IconButtonGroup>

              {/* Status progression — completed/cancelled 제외. Served에서는 Complete Order 표시 */}
              {nextAction && statusInfo!.orderId && orderStatus !== 'completed' && orderStatus !== 'cancelled' && (
                <ActionBtn
                  $variant="primary"
                  onClick={() => onStatusChange(statusInfo!.orderId!, nextAction.status)}
                  disabled={loading}
                  style={
                    orderStatus === 'outstanding' ? { background: '#F59E0B', borderColor: '#F59E0B', color: 'white' } :
                    orderStatus === 'ready' ? { background: '#10B981', borderColor: '#10B981', color: 'white' } :
                    nextAction.status === 'completed' ? { background: '#9CA3AF', borderColor: '#9CA3AF', color: 'white' } :
                    undefined
                  }
                >
                  {nextAction.label}
                </ActionBtn>
              )}

              {/* Confirm Payment — 증빙 확인 모달 열기 */}
              {paymentStatus === 'payment_verification_pending' && (
                <ActionBtn $variant="success" onClick={handleConfirmPaymentClick} disabled={loading}>
                  Confirm Payment
                </ActionBtn>
              )}

              <ActionRow>
                {/* Add Items — LiveOrders와 동일: payment_status=pending && status not served/completed/cancelled */}
                {paymentStatus === 'pending' && !['served', 'completed', 'cancelled'].includes(orderStatus) && (
                  <ActionBtn $variant="secondary" onClick={() => setShowAddItemsView(true)}>
                    Add Items
                  </ActionBtn>
                )}
                {/* Payment — LiveOrders와 동일: payment_status=pending */}
                {paymentStatus === 'pending' && (
                  <ActionBtn
                    $variant={orderStatus === 'served' ? 'success' : 'secondary'}
                    onClick={onPayment}
                  >
                    Payment
                  </ActionBtn>
                )}
              </ActionRow>
              {/* Cancel Order — LiveOrders와 동일: status not cancelled/completed */}
              {orderStatus !== 'cancelled' && orderStatus !== 'completed' && (
                <ActionBtn $variant="danger" onClick={handleCancelOrder} disabled={loading}>
                  Cancel Order
                </ActionBtn>
              )}
              {/* Leaved — completed 상태에서만: 테이블 비우기 */}
              {orderStatus === 'completed' && statusInfo!.orderId && (
                <ActionBtn
                  $variant="primary"
                  onClick={() => onClearTable(statusInfo!.orderId!)}
                  disabled={loading}
                >
                  Leaved
                </ActionBtn>
              )}
              {/* QR Session for occupied table */}
              {qrMode === 'session' && (
              <>
              <ActionRow>
                <ActionBtn $variant="secondary" onClick={handlePrintQR} disabled={qrLoading}>
                  {qrLoading ? 'Printing...' : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 4, verticalAlign: 'middle'}}><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>Reprint QR</>}
                </ActionBtn>
                {qrSession && (
                  <ActionBtn $variant="danger" onClick={handleExpireQR} disabled={qrLoading} style={{ flex: '0 0 auto', width: 'auto', padding: '9px 16px' }}>
                    Expire QR
                  </ActionBtn>
                )}
              </ActionRow>
              {qrSession ? (
                <QRStatusInfo>
                  <div>
                    <span style={{ color: '#059669' }}>● Active QR ({qrSession.remaining_minutes}min left)</span>
                    <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                      Printed: {new Date(qrSession.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      {' · '}Orders until {new Date(qrSession.expires_at).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </QRStatusInfo>
              ) : (
                <QRStatusInfo style={{ color: '#6B7280' }}>○ No active QR</QRStatusInfo>
              )}
              </>
              )}
              <ActionBtn $variant="link" onClick={onNavigateToPOS}>
                Open in POS Terminal &#x2197;
              </ActionBtn>
            </ActionGroup>
          </>
        )
      ) : (
        <>
          <EmptyState>
            <span style={{ fontSize: 40, opacity: 0.3 }}>&#x25CB;</span>
            <p>This table is available</p>
          </EmptyState>
          <ActionGroup>
            <ActionBtn $variant="primary" onClick={onNewOrder}>
              + New Order
            </ActionBtn>
            {qrMode === 'session' && (
            <>
            <ActionBtn $variant="secondary" onClick={handlePrintQR} disabled={qrLoading}>
              {qrLoading ? 'Printing...' : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 4, verticalAlign: 'middle'}}><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>Print QR</>}
            </ActionBtn>
            {qrSession ? (
              <QRStatusInfo>
                <div>
                  <span style={{ color: '#059669' }}>● Active QR ({qrSession.remaining_minutes}min left)</span>
                  <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                    Printed: {new Date(qrSession.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    {' · '}Orders accepted until {new Date(qrSession.expires_at).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <ActionBtn $variant="link" onClick={handleExpireQR} style={{ padding: '4px 8px', fontSize: '12px', width: 'auto' }}>
                  Expire
                </ActionBtn>
              </QRStatusInfo>
            ) : (
              <QRStatusInfo style={{ color: '#6B7280' }}>○ No active QR</QRStatusInfo>
            )}
            </>
            )}
            <ActionBtn $variant="link" onClick={onNavigateToPOS}>
              Open in POS Terminal &#x2197;
            </ActionBtn>
          </ActionGroup>
        </>
      )}

      {/* OptionModal for Add Items (reused from POS Terminal) */}
      {selectedMenuItemForOption && (
        <OptionModal
          isOpen={showOptionModal}
          onClose={() => { setShowOptionModal(false); setSelectedMenuItemForOption(null); }}
          menuItem={{
            id: selectedMenuItemForOption.id,
            name: selectedMenuItemForOption.name,
            price: parseFloat(selectedMenuItemForOption.price) || 0,
            emoji: selectedMenuItemForOption.emoji || '',
            image: selectedMenuItemForOption.image,
            optionGroups: selectedMenuItemForOption.optionGroups
          }}
          onConfirm={(quantity: number, _selectedOptions: any, selectedOptionsData: any) => {
            handleAddToItemsCart(selectedMenuItemForOption, quantity, selectedOptionsData);
            setShowOptionModal(false);
            setSelectedMenuItemForOption(null);
            setAddItemsSearchQuery('');
          }}
        />
      )}

      {/* Confirm Modal */}
      {confirmModal && (
        <ConfirmOverlay onClick={() => setConfirmModal(null)}>
          <ConfirmBox onClick={(e) => e.stopPropagation()}>
            <ConfirmTitle>{confirmModal.title}</ConfirmTitle>
            <ConfirmMessage>{confirmModal.message}</ConfirmMessage>
            <ConfirmActions>
              <ConfirmBtn onClick={() => setConfirmModal(null)}>Cancel</ConfirmBtn>
              <ConfirmBtn $danger onClick={confirmModal.onConfirm}>Confirm</ConfirmBtn>
            </ConfirmActions>
          </ConfirmBox>
        </ConfirmOverlay>
      )}
    </Panel>
  );
};

export default TableDetailPanel;
