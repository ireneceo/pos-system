import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FloorPlanData, DEFAULT_FLOOR_PLAN, TableStatusInfo } from './types';
import FloorPlanCanvas from './FloorPlanCanvas';
import TableDetailPanel from './TableDetailPanel';
import FloorPlanStatsBar from './FloorPlanStatsBar';
import PaymentModal from '../../components/POSTerminal/PaymentModal';
import { getRestaurantTimezone } from '../../utils/timezone';
import io from 'socket.io-client';

// ─── Styled Components ───

const PageContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [floorPlan, setFloorPlan] = useState<FloorPlanData>(DEFAULT_FLOOR_PLAN);
  const [tableStatuses, setTableStatuses] = useState<Record<string, TableStatusInfo>>({});
  const [connected, setConnected] = useState(false);
  const [clock, setClock] = useState('');
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('');
  const [timezone, setTimezone] = useState('Asia/Kuala_Lumpur');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef<any>(null);

  // Detail panel
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Payment modal (like LiveOrders)
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [membershipSettings, setMembershipSettings] = useState<any>(null);

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
      const token = localStorage.getItem('auth_token');
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

  const debouncedFetch = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchStatuses(), 2000);
  }, [fetchStatuses]);

  // Load floor plan + initial statuses + payment settings + membership settings
  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('auth_token');
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
        const token = localStorage.getItem('auth_token');
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
  };

  // Status change handler
  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('auth_token');
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

  // New order → POS iframe overlay
  const handleNewOrder = () => {
    if (!selectedTable) return;
    const params = new URLSearchParams();
    params.set('table', selectedTable);
    params.set('from', 'floor-plan-overlay');
    setPosUrl(`/restaurant/${restaurantId}/pos-terminal?${params.toString()}`);
    setShowPOS(true);
  };

  // Payment → PaymentModal (like LiveOrders)
  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  // Payment confirm (like LiveOrders handlePaymentConfirm)
  const handlePaymentConfirm = async (
    method: string,
    _amountReceived?: number,
    _change?: number,
    pointsUsed?: number,
    pointDiscount?: number
  ) => {
    if (!selectedTable) return;
    const statusInfo = tableStatuses[selectedTable];
    if (!statusInfo?.orderId) return;

    try {
      const token = localStorage.getItem('auth_token');
      const updatePayload: any = {
        payment_status: 'completed',
        payment_method: method
      };

      if (pointsUsed && pointsUsed > 0 && pointDiscount && pointDiscount > 0) {
        updatePayload.points_used = pointsUsed;
        updatePayload.point_discount = pointDiscount;
        updatePayload.total_amount = (statusInfo.totalAmount || 0) - pointDiscount;
      }

      const res = await fetch(`/api/orders/${statusInfo.orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload)
      });
      if (res.ok) {
        // LiveOrders와 동일: 결제 완료 후 상태 변경
        if (statusInfo.orderStatus === 'outstanding') {
          await fetch(`/api/orders/${statusInfo.orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ status: 'pending' })
          });
        } else if (statusInfo.orderStatus === 'served') {
          await fetch(`/api/orders/${statusInfo.orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ status: 'completed' })
          });
        }
        setShowPaymentModal(false);
        await fetchStatuses();
      }
    } catch (err) {
      console.error('Failed to process payment:', err);
    }
  };

  // Clear table — completed 주문의 table_number를 null로 설정하여 테이블 비움
  const handleClearTable = async (orderId: number) => {
    try {
      const token = localStorage.getItem('auth_token');
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

  // Derived data for detail panel
  const selectedStatusInfo = selectedTable ? tableStatuses[selectedTable] : undefined;
  const selectedTableInfo = selectedTable
    ? floorPlan.tables.find(t => t.tableNumber === selectedTable)
    : undefined;

  if (loading) {
    return (
      <PageContainer>
        <Header>
          <HeaderLeft><HeaderTitle>Floor Plan</HeaderTitle></HeaderLeft>
        </Header>
        <LoadingScreen>Loading floor plan...</LoadingScreen>
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
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#92400E' }}>New Items Added</div>
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
          }}>View Table</button>
        </div>
      )}

      <Header>
        <HeaderLeft>
          <BackBtn onClick={() => navigate(`/restaurant/${restaurantId}/dashboard`)}>
            &larr; Back
          </BackBtn>
          <HeaderTitle>Floor Plan</HeaderTitle>
          <ConnectionStatus>
            <ConnectionDot $connected={connected} />
            {connected ? 'Live' : 'Offline'}
          </ConnectionStatus>
        </HeaderLeft>
        <HeaderRight>
          <Clock>{clock}</Clock>
          {user?.role === 'Restaurant Admin' && (
            <EditBtn onClick={() => navigate(`/restaurant/${restaurantId}/floor-plan-editor`)}>
              Edit Layout
            </EditBtn>
          )}
        </HeaderRight>
      </Header>

      <MainContent>
        <CanvasWrapper>
          <FloorPlanCanvas
            floorPlan={floorPlan}
            tableStatuses={tableStatuses}
            onTableClick={handleTableClick}
            selectedTableId={selectedTable ? floorPlan.tables.find(t => t.tableNumber === selectedTable)?.id : null}
            currency={currency}
          />
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
          />
        )}
      </MainContent>

      <FloorPlanStatsBar
        tables={floorPlan.tables}
        tableStatuses={tableStatuses}
        currency={currency}
      />

      {/* Payment Modal — same as LiveOrders */}
      {showPaymentModal && selectedStatusInfo && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          total={Number(selectedStatusInfo.totalAmount || 0)}
          subtotal={Number(selectedStatusInfo.subtotal || selectedStatusInfo.totalAmount || 0)}
          tax={Number(selectedStatusInfo.tax || 0)}
          serviceCharge={Number(selectedStatusInfo.serviceCharge || 0)}
          discountAmount={Number(selectedStatusInfo.discount || 0)}
          couponDiscount={Number(selectedStatusInfo.couponDiscount || 0)}
          onConfirmPayment={handlePaymentConfirm}
          paymentMethods={paymentMethods}
          customerId={selectedStatusInfo.customerId || undefined}
          restaurantId={Number(restaurantId)}
          membershipSettings={membershipSettings}
        />
      )}

      {/* POS Terminal overlay — for New Order only */}
      <POSOverlay $isOpen={showPOS}>
        <POSOverlayHeader>
          <POSOverlayTitle>
            POS Terminal — Table {selectedTable}
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
    </PageContainer>
  );
};

export default FloorPlanPage;
