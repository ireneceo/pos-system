import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FloorPlanData, DEFAULT_FLOOR_PLAN, TableStatusInfo } from './types';
import FloorPlanCanvas from './FloorPlanCanvas';
import TableDetailPanel from './TableDetailPanel';
import FloorPlanStatsBar from './FloorPlanStatsBar';
import PaymentModal from '../../components/POSTerminal/PaymentModal';
import OrderOverlay from './OrderOverlay';
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
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef<any>(null);

  // New state for detail panel + overlays
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showOrderOverlay, setShowOrderOverlay] = useState(false);
  const [orderMode, setOrderMode] = useState<'new' | 'add'>('new');

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

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

  // Load floor plan + initial statuses
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
      } catch (err) {
        console.error('Failed to load floor plan:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
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
    socket.on('order-items-added', () => debouncedFetch());
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

  // Table click → toggle detail panel (no more navigate)
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

  // New order from detail panel → OrderOverlay
  const handleNewOrder = () => {
    setOrderMode('new');
    setShowOrderOverlay(true);
  };

  // Add items from detail panel → OrderOverlay
  const handleAddItems = () => {
    setOrderMode('add');
    setShowOrderOverlay(true);
  };

  // Order overlay complete callback
  const handleOrderComplete = () => {
    setShowOrderOverlay(false);
    fetchStatuses();
  };

  // Payment from detail panel
  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  // Navigate to POS Terminal
  const handleNavigateToPOS = () => {
    if (selectedTable) {
      navigate(`/restaurant/${restaurantId}/pos-terminal?table=${selectedTable}&from=floor-plan`);
    }
  };

  // Payment confirm handler
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
      const res = await fetch(`/api/orders/${statusInfo.orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          payment_method: method,
          payment_status: 'completed',
          kitchen_ready: true,
          points_used: pointsUsed || 0,
          point_discount: pointDiscount || 0
        })
      });
      if (res.ok) {
        setShowPaymentModal(false);
        await fetchStatuses();
      }
    } catch (err) {
      console.error('Failed to process payment:', err);
    }
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
            onClose={() => setSelectedTable(null)}
            onNewOrder={handleNewOrder}
            onAddItems={handleAddItems}
            onStatusChange={handleStatusChange}
            onPayment={handlePayment}
            onNavigateToPOS={handleNavigateToPOS}
          />
        )}
      </MainContent>

      <FloorPlanStatsBar
        tables={floorPlan.tables}
        tableStatuses={tableStatuses}
        currency={currency}
      />

      {/* Payment Modal (reused from POS Terminal, no modification) */}
      {showPaymentModal && selectedStatusInfo && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          total={selectedStatusInfo.totalAmount || 0}
          subtotal={selectedStatusInfo.subtotal || 0}
          tax={selectedStatusInfo.tax || 0}
          serviceCharge={selectedStatusInfo.serviceCharge || 0}
          discountAmount={selectedStatusInfo.discount || 0}
          onConfirmPayment={handlePaymentConfirm}
          restaurantId={Number(restaurantId)}
          customerId={selectedStatusInfo.customerId || undefined}
        />
      )}

      {/* Order Overlay for new orders / add items */}
      {selectedTable && (
        <OrderOverlay
          isOpen={showOrderOverlay}
          onClose={() => setShowOrderOverlay(false)}
          tableNumber={selectedTable}
          tableInfo={selectedTableInfo}
          statusInfo={selectedStatusInfo}
          mode={orderMode}
          restaurantId={Number(restaurantId)}
          currency={currency}
          onOrderComplete={handleOrderComplete}
        />
      )}

    </PageContainer>
  );
};

export default FloorPlanPage;
